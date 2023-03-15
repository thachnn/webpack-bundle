(() => {
  "use strict";
  var __webpack_modules__ = {
    650: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
        Alternation: () => Alternation,
        Alternative: () => Alternative,
        CstParser: () => CstParser,
        EMPTY_ALT: () => EMPTY_ALT,
        EOF: () => EOF,
        EarlyExitException: () => EarlyExitException,
        EmbeddedActionsParser: () => EmbeddedActionsParser,
        GAstVisitor: () => GAstVisitor,
        Lexer: () => Lexer,
        LexerDefinitionErrorType: () => LexerDefinitionErrorType,
        MismatchedTokenException: () => MismatchedTokenException,
        NoViableAltException: () => NoViableAltException,
        NonTerminal: () => NonTerminal,
        NotAllInputParsedException: () => NotAllInputParsedException,
        Option: () => Option,
        Parser: () => api_Parser,
        ParserDefinitionErrorType: () => ParserDefinitionErrorType,
        Repetition: () => Repetition,
        RepetitionMandatory: () => RepetitionMandatory,
        RepetitionMandatoryWithSeparator: () => RepetitionMandatoryWithSeparator,
        RepetitionWithSeparator: () => RepetitionWithSeparator,
        Rule: () => Rule,
        Terminal: () => Terminal,
        VERSION: () => VERSION,
        assignOccurrenceIndices: () => assignOccurrenceIndices,
        clearCache: () => clearCache,
        createSyntaxDiagramsCode: () => createSyntaxDiagramsCode,
        createToken: () => createToken,
        createTokenInstance: () => createTokenInstance,
        defaultGrammarResolverErrorProvider: () => defaultGrammarResolverErrorProvider,
        defaultGrammarValidatorErrorProvider: () => defaultGrammarValidatorErrorProvider,
        defaultLexerErrorProvider: () => defaultLexerErrorProvider,
        defaultParserErrorProvider: () => defaultParserErrorProvider,
        generateParserFactory: () => generateParserFactory,
        generateParserModule: () => generateParserModule,
        isRecognitionException: () => isRecognitionException,
        resolveGrammar: () => gast_resolver_public_resolveGrammar,
        serializeGrammar: () => serializeGrammar,
        serializeProduction: () => serializeProduction,
        tokenLabel: () => tokenLabel,
        tokenMatcher: () => tokenMatcher,
        tokenName: () => tokenName,
        validateGrammar: () => gast_resolver_public_validateGrammar
      });
      var VERSION = "7.1.1", utils = __webpack_require__(465), regexp_to_ast = __webpack_require__(544), regExpAstCache = {}, regExpParser = new regexp_to_ast.RegExpParser;
      function getRegExpAst(regExp) {
        var regExpStr = regExp.toString();
        if (regExpAstCache.hasOwnProperty(regExpStr)) return regExpAstCache[regExpStr];
        var regExpAst = regExpParser.pattern(regExpStr);
        return regExpAstCache[regExpStr] = regExpAst, regExpAst;
      }
      var extendStatics, __extends = (extendStatics = function(d, b) {
        return extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        }, extendStatics(d, b);
      }, function(d, b) {
        function __() {
          this.constructor = d;
        }
        extendStatics(d, b), d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, 
        new __);
      }), failedOptimizationPrefixMsg = 'Unable to use "first char" lexer optimizations:\n';
      function getOptimizedStartCodesIndices(regExp, ensureOptimizations) {
        void 0 === ensureOptimizations && (ensureOptimizations = !1);
        try {
          var ast = getRegExpAst(regExp);
          return firstCharOptimizedIndices(ast.value, {}, ast.flags.ignoreCase);
        } catch (e) {
          if ("Complement Sets are not supported for first char optimization" === e.message) ensureOptimizations && (0, 
          utils.rr)(failedOptimizationPrefixMsg + "\tUnable to optimize: < " + regExp.toString() + " >\n\tComplement Sets cannot be automatically optimized.\n\tThis will disable the lexer's first char optimizations.\n\tSee: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details."); else {
            var msgSuffix = "";
            ensureOptimizations && (msgSuffix = "\n\tThis will disable the lexer's first char optimizations.\n\tSee: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details."), 
            (0, utils.WB)(failedOptimizationPrefixMsg + "\n\tFailed parsing: < " + regExp.toString() + " >\n\tUsing the regexp-to-ast library version: " + regexp_to_ast.VERSION + "\n\tPlease open an issue at: https://github.com/bd82/regexp-to-ast/issues" + msgSuffix);
          }
        }
        return [];
      }
      function firstCharOptimizedIndices(ast, result, ignoreCase) {
        switch (ast.type) {
         case "Disjunction":
          for (var i = 0; i < ast.value.length; i++) firstCharOptimizedIndices(ast.value[i], result, ignoreCase);
          break;

         case "Alternative":
          var terms = ast.value;
          for (i = 0; i < terms.length; i++) {
            var term = terms[i];
            switch (term.type) {
             case "EndAnchor":
             case "GroupBackReference":
             case "Lookahead":
             case "NegativeLookahead":
             case "StartAnchor":
             case "WordBoundary":
             case "NonWordBoundary":
              continue;
            }
            var atom = term;
            switch (atom.type) {
             case "Character":
              addOptimizedIdxToResult(atom.value, result, ignoreCase);
              break;

             case "Set":
              if (!0 === atom.complement) throw Error("Complement Sets are not supported for first char optimization");
              (0, utils.Ed)(atom.value, (function(code) {
                if ("number" == typeof code) addOptimizedIdxToResult(code, result, ignoreCase); else {
                  var range = code;
                  if (!0 === ignoreCase) for (var rangeCode = range.from; rangeCode <= range.to; rangeCode++) addOptimizedIdxToResult(rangeCode, result, ignoreCase); else {
                    for (rangeCode = range.from; rangeCode <= range.to && rangeCode < minOptimizationVal; rangeCode++) addOptimizedIdxToResult(rangeCode, result, ignoreCase);
                    if (range.to >= minOptimizationVal) for (var minUnOptVal = range.from >= minOptimizationVal ? range.from : minOptimizationVal, maxUnOptVal = range.to, minOptIdx = charCodeToOptimizedIndex(minUnOptVal), maxOptIdx = charCodeToOptimizedIndex(maxUnOptVal), currOptIdx = minOptIdx; currOptIdx <= maxOptIdx; currOptIdx++) result[currOptIdx] = currOptIdx;
                  }
                }
              }));
              break;

             case "Group":
              firstCharOptimizedIndices(atom.value, result, ignoreCase);
              break;

             default:
              throw Error("Non Exhaustive Match");
            }
            var isOptionalQuantifier = void 0 !== atom.quantifier && 0 === atom.quantifier.atLeast;
            if ("Group" === atom.type && !1 === isWholeOptional(atom) || "Group" !== atom.type && !1 === isOptionalQuantifier) break;
          }
          break;

         default:
          throw Error("non exhaustive match!");
        }
        return (0, utils.VO)(result);
      }
      function addOptimizedIdxToResult(code, result, ignoreCase) {
        var optimizedCharIdx = charCodeToOptimizedIndex(code);
        result[optimizedCharIdx] = optimizedCharIdx, !0 === ignoreCase && function(code, result) {
          var char = String.fromCharCode(code), upperChar = char.toUpperCase();
          if (upperChar !== char) {
            result[optimizedCharIdx = charCodeToOptimizedIndex(upperChar.charCodeAt(0))] = optimizedCharIdx;
          } else {
            var optimizedCharIdx, lowerChar = char.toLowerCase();
            if (lowerChar !== char) result[optimizedCharIdx = charCodeToOptimizedIndex(lowerChar.charCodeAt(0))] = optimizedCharIdx;
          }
        }(code, result);
      }
      function findCode(setNode, targetCharCodes) {
        return (0, utils.sE)(setNode.value, (function(codeOrRange) {
          if ("number" == typeof codeOrRange) return (0, utils.r3)(targetCharCodes, codeOrRange);
          var range_1 = codeOrRange;
          return void 0 !== (0, utils.sE)(targetCharCodes, (function(targetCode) {
            return range_1.from <= targetCode && targetCode <= range_1.to;
          }));
        }));
      }
      function isWholeOptional(ast) {
        return !(!ast.quantifier || 0 !== ast.quantifier.atLeast) || !!ast.value && ((0, 
        utils.kJ)(ast.value) ? (0, utils.yW)(ast.value, isWholeOptional) : isWholeOptional(ast.value));
      }
      var CharCodeFinder = function(_super) {
        function CharCodeFinder(targetCharCodes) {
          var _this = _super.call(this) || this;
          return _this.targetCharCodes = targetCharCodes, _this.found = !1, _this;
        }
        return __extends(CharCodeFinder, _super), CharCodeFinder.prototype.visitChildren = function(node) {
          if (!0 !== this.found) {
            switch (node.type) {
             case "Lookahead":
              return void this.visitLookahead(node);

             case "NegativeLookahead":
              return void this.visitNegativeLookahead(node);
            }
            _super.prototype.visitChildren.call(this, node);
          }
        }, CharCodeFinder.prototype.visitCharacter = function(node) {
          (0, utils.r3)(this.targetCharCodes, node.value) && (this.found = !0);
        }, CharCodeFinder.prototype.visitSet = function(node) {
          node.complement ? void 0 === findCode(node, this.targetCharCodes) && (this.found = !0) : void 0 !== findCode(node, this.targetCharCodes) && (this.found = !0);
        }, CharCodeFinder;
      }(regexp_to_ast.BaseRegExpVisitor);
      function canMatchCharCode(charCodes, pattern) {
        if (pattern instanceof RegExp) {
          var ast = getRegExpAst(pattern), charCodeFinder = new CharCodeFinder(charCodes);
          return charCodeFinder.visit(ast), charCodeFinder.found;
        }
        return void 0 !== (0, utils.sE)(pattern, (function(char) {
          return (0, utils.r3)(charCodes, char.charCodeAt(0));
        }));
      }
      var lexer_extends = function() {
        var extendStatics = function(d, b) {
          return extendStatics = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function(d, b) {
            d.__proto__ = b;
          } || function(d, b) {
            for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
          }, extendStatics(d, b);
        };
        return function(d, b) {
          function __() {
            this.constructor = d;
          }
          extendStatics(d, b), d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, 
          new __);
        };
      }(), PATTERN = "PATTERN", SUPPORT_STICKY = "boolean" == typeof new RegExp("(?:)").sticky;
      function analyzeTokenTypes(tokenTypes, options) {
        var onlyRelevantTypes, tracer = (options = (0, utils.ce)(options, {
          useSticky: SUPPORT_STICKY,
          debug: !1,
          safeMode: !1,
          positionTracking: "full",
          lineTerminatorCharacters: [ "\r", "\n" ],
          tracer: function(msg, action) {
            return action();
          }
        })).tracer;
        tracer("initCharCodeToOptimizedIndexMap", (function() {
          !function() {
            if ((0, utils.xb)(charCodeToOptimizedIdxMap)) {
              charCodeToOptimizedIdxMap = new Array(65536);
              for (var i = 0; i < 65536; i++) charCodeToOptimizedIdxMap[i] = i > 255 ? 255 + ~~(i / 255) : i;
            }
          }();
        })), tracer("Reject Lexer.NA", (function() {
          onlyRelevantTypes = (0, utils.d1)(tokenTypes, (function(currType) {
            return currType.PATTERN === Lexer.NA;
          }));
        }));
        var allTransformedPatterns, patternIdxToType, patternIdxToGroup, patternIdxToLongerAltIdx, patternIdxToPushMode, patternIdxToPopMode, patternIdxToCanLineTerminator, patternIdxToIsCustom, patternIdxToShort, emptyGroups, patternIdxToConfig, hasCustom = !1;
        tracer("Transform Patterns", (function() {
          hasCustom = !1, allTransformedPatterns = (0, utils.UI)(onlyRelevantTypes, (function(currType) {
            var currPattern = currType.PATTERN;
            if ((0, utils.Kj)(currPattern)) {
              var regExpSource = currPattern.source;
              return 1 !== regExpSource.length || "^" === regExpSource || "$" === regExpSource || "." === regExpSource || currPattern.ignoreCase ? 2 !== regExpSource.length || "\\" !== regExpSource[0] || (0, 
              utils.r3)([ "d", "D", "s", "S", "t", "r", "n", "t", "0", "c", "b", "B", "f", "v", "w", "W" ], regExpSource[1]) ? options.useSticky ? addStickyFlag(currPattern) : addStartOfInput(currPattern) : regExpSource[1] : regExpSource;
            }
            if ((0, utils.mf)(currPattern)) return hasCustom = !0, {
              exec: currPattern
            };
            if ((0, utils.e$)(currPattern, "exec")) return hasCustom = !0, currPattern;
            if ("string" == typeof currPattern) {
              if (1 === currPattern.length) return currPattern;
              var escapedRegExpString = currPattern.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&"), wrappedRegExp = new RegExp(escapedRegExpString);
              return options.useSticky ? addStickyFlag(wrappedRegExp) : addStartOfInput(wrappedRegExp);
            }
            throw Error("non exhaustive match");
          }));
        })), tracer("misc mapping", (function() {
          patternIdxToType = (0, utils.UI)(onlyRelevantTypes, (function(currType) {
            return currType.tokenTypeIdx;
          })), patternIdxToGroup = (0, utils.UI)(onlyRelevantTypes, (function(clazz) {
            var groupName = clazz.GROUP;
            if (groupName !== Lexer.SKIPPED) {
              if ((0, utils.HD)(groupName)) return groupName;
              if ((0, utils.o8)(groupName)) return !1;
              throw Error("non exhaustive match");
            }
          })), patternIdxToLongerAltIdx = (0, utils.UI)(onlyRelevantTypes, (function(clazz) {
            var longerAltType = clazz.LONGER_ALT;
            if (longerAltType) return (0, utils.cq)(onlyRelevantTypes, longerAltType);
          })), patternIdxToPushMode = (0, utils.UI)(onlyRelevantTypes, (function(clazz) {
            return clazz.PUSH_MODE;
          })), patternIdxToPopMode = (0, utils.UI)(onlyRelevantTypes, (function(clazz) {
            return (0, utils.e$)(clazz, "POP_MODE");
          }));
        })), tracer("Line Terminator Handling", (function() {
          var lineTerminatorCharCodes = getCharCodes(options.lineTerminatorCharacters);
          patternIdxToCanLineTerminator = (0, utils.UI)(onlyRelevantTypes, (function(tokType) {
            return !1;
          })), "onlyOffset" !== options.positionTracking && (patternIdxToCanLineTerminator = (0, 
          utils.UI)(onlyRelevantTypes, (function(tokType) {
            return (0, utils.e$)(tokType, "LINE_BREAKS") ? tokType.LINE_BREAKS : !1 === checkLineBreaksIssues(tokType, lineTerminatorCharCodes) ? canMatchCharCode(lineTerminatorCharCodes, tokType.PATTERN) : void 0;
          })));
        })), tracer("Misc Mapping #2", (function() {
          patternIdxToIsCustom = (0, utils.UI)(onlyRelevantTypes, isCustomPattern), patternIdxToShort = (0, 
          utils.UI)(allTransformedPatterns, isShortPattern), emptyGroups = (0, utils.u4)(onlyRelevantTypes, (function(acc, clazz) {
            var groupName = clazz.GROUP;
            return (0, utils.HD)(groupName) && groupName !== Lexer.SKIPPED && (acc[groupName] = []), 
            acc;
          }), {}), patternIdxToConfig = (0, utils.UI)(allTransformedPatterns, (function(x, idx) {
            return {
              pattern: allTransformedPatterns[idx],
              longerAlt: patternIdxToLongerAltIdx[idx],
              canLineTerminator: patternIdxToCanLineTerminator[idx],
              isCustom: patternIdxToIsCustom[idx],
              short: patternIdxToShort[idx],
              group: patternIdxToGroup[idx],
              push: patternIdxToPushMode[idx],
              pop: patternIdxToPopMode[idx],
              tokenTypeIdx: patternIdxToType[idx],
              tokenType: onlyRelevantTypes[idx]
            };
          }));
        }));
        var canBeOptimized = !0, charCodeToPatternIdxToConfig = [];
        return options.safeMode || tracer("First Char Optimization", (function() {
          charCodeToPatternIdxToConfig = (0, utils.u4)(onlyRelevantTypes, (function(result, currTokType, idx) {
            if ("string" == typeof currTokType.PATTERN) {
              var optimizedIdx = charCodeToOptimizedIndex(currTokType.PATTERN.charCodeAt(0));
              addToMapOfArrays(result, optimizedIdx, patternIdxToConfig[idx]);
            } else if ((0, utils.kJ)(currTokType.START_CHARS_HINT)) {
              var lastOptimizedIdx_1;
              (0, utils.Ed)(currTokType.START_CHARS_HINT, (function(charOrInt) {
                var currOptimizedIdx = charCodeToOptimizedIndex("string" == typeof charOrInt ? charOrInt.charCodeAt(0) : charOrInt);
                lastOptimizedIdx_1 !== currOptimizedIdx && (lastOptimizedIdx_1 = currOptimizedIdx, 
                addToMapOfArrays(result, currOptimizedIdx, patternIdxToConfig[idx]));
              }));
            } else if ((0, utils.Kj)(currTokType.PATTERN)) if (currTokType.PATTERN.unicode) canBeOptimized = !1, 
            options.ensureOptimizations && (0, utils.WB)(failedOptimizationPrefixMsg + "\tUnable to analyze < " + currTokType.PATTERN.toString() + " > pattern.\n\tThe regexp unicode flag is not currently supported by the regexp-to-ast library.\n\tThis will disable the lexer's first char optimizations.\n\tFor details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE"); else {
              var optimizedCodes = getOptimizedStartCodesIndices(currTokType.PATTERN, options.ensureOptimizations);
              (0, utils.xb)(optimizedCodes) && (canBeOptimized = !1), (0, utils.Ed)(optimizedCodes, (function(code) {
                addToMapOfArrays(result, code, patternIdxToConfig[idx]);
              }));
            } else options.ensureOptimizations && (0, utils.WB)(failedOptimizationPrefixMsg + "\tTokenType: <" + currTokType.name + "> is using a custom token pattern without providing <start_chars_hint> parameter.\n\tThis will disable the lexer's first char optimizations.\n\tFor details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE"), 
            canBeOptimized = !1;
            return result;
          }), []);
        })), tracer("ArrayPacking", (function() {
          charCodeToPatternIdxToConfig = (0, utils.X0)(charCodeToPatternIdxToConfig);
        })), {
          emptyGroups,
          patternIdxToConfig,
          charCodeToPatternIdxToConfig,
          hasCustom,
          canBeOptimized
        };
      }
      function validatePatterns(tokenTypes, validModesNames) {
        var errors = [], missingResult = function(tokenTypes) {
          var tokenTypesWithMissingPattern = (0, utils.hX)(tokenTypes, (function(currType) {
            return !(0, utils.e$)(currType, PATTERN);
          })), errors = (0, utils.UI)(tokenTypesWithMissingPattern, (function(currType) {
            return {
              message: "Token Type: ->" + currType.name + "<- missing static 'PATTERN' property",
              type: LexerDefinitionErrorType.MISSING_PATTERN,
              tokenTypes: [ currType ]
            };
          })), valid = (0, utils.e5)(tokenTypes, tokenTypesWithMissingPattern);
          return {
            errors,
            valid
          };
        }(tokenTypes);
        errors = errors.concat(missingResult.errors);
        var invalidResult = function(tokenTypes) {
          var tokenTypesWithInvalidPattern = (0, utils.hX)(tokenTypes, (function(currType) {
            var pattern = currType.PATTERN;
            return !((0, utils.Kj)(pattern) || (0, utils.mf)(pattern) || (0, utils.e$)(pattern, "exec") || (0, 
            utils.HD)(pattern));
          })), errors = (0, utils.UI)(tokenTypesWithInvalidPattern, (function(currType) {
            return {
              message: "Token Type: ->" + currType.name + "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.",
              type: LexerDefinitionErrorType.INVALID_PATTERN,
              tokenTypes: [ currType ]
            };
          })), valid = (0, utils.e5)(tokenTypes, tokenTypesWithInvalidPattern);
          return {
            errors,
            valid
          };
        }(missingResult.valid), validTokenTypes = invalidResult.valid;
        return errors = (errors = errors.concat(invalidResult.errors)).concat(function(tokenTypes) {
          var errors = [], withRegExpPatterns = (0, utils.hX)(tokenTypes, (function(currTokType) {
            return (0, utils.Kj)(currTokType.PATTERN);
          }));
          return errors = errors.concat(function(tokenTypes) {
            var EndAnchorFinder = function(_super) {
              function EndAnchorFinder() {
                var _this = null !== _super && _super.apply(this, arguments) || this;
                return _this.found = !1, _this;
              }
              return lexer_extends(EndAnchorFinder, _super), EndAnchorFinder.prototype.visitEndAnchor = function(node) {
                this.found = !0;
              }, EndAnchorFinder;
            }(regexp_to_ast.BaseRegExpVisitor), invalidRegex = (0, utils.hX)(tokenTypes, (function(currType) {
              var pattern = currType.PATTERN;
              try {
                var regexpAst = getRegExpAst(pattern), endAnchorVisitor = new EndAnchorFinder;
                return endAnchorVisitor.visit(regexpAst), endAnchorVisitor.found;
              } catch (e) {
                return end_of_input.test(pattern.source);
              }
            }));
            return (0, utils.UI)(invalidRegex, (function(currType) {
              return {
                message: "Unexpected RegExp Anchor Error:\n\tToken Type: ->" + currType.name + "<- static 'PATTERN' cannot contain end of input anchor '$'\n\tSee sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#ANCHORS\tfor details.",
                type: LexerDefinitionErrorType.EOI_ANCHOR_FOUND,
                tokenTypes: [ currType ]
              };
            }));
          }(withRegExpPatterns)), errors = errors.concat(function(tokenTypes) {
            var StartAnchorFinder = function(_super) {
              function StartAnchorFinder() {
                var _this = null !== _super && _super.apply(this, arguments) || this;
                return _this.found = !1, _this;
              }
              return lexer_extends(StartAnchorFinder, _super), StartAnchorFinder.prototype.visitStartAnchor = function(node) {
                this.found = !0;
              }, StartAnchorFinder;
            }(regexp_to_ast.BaseRegExpVisitor), invalidRegex = (0, utils.hX)(tokenTypes, (function(currType) {
              var pattern = currType.PATTERN;
              try {
                var regexpAst = getRegExpAst(pattern), startAnchorVisitor = new StartAnchorFinder;
                return startAnchorVisitor.visit(regexpAst), startAnchorVisitor.found;
              } catch (e) {
                return start_of_input.test(pattern.source);
              }
            }));
            return (0, utils.UI)(invalidRegex, (function(currType) {
              return {
                message: "Unexpected RegExp Anchor Error:\n\tToken Type: ->" + currType.name + "<- static 'PATTERN' cannot contain start of input anchor '^'\n\tSee https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#ANCHORS\tfor details.",
                type: LexerDefinitionErrorType.SOI_ANCHOR_FOUND,
                tokenTypes: [ currType ]
              };
            }));
          }(withRegExpPatterns)), errors = errors.concat(function(tokenTypes) {
            var invalidFlags = (0, utils.hX)(tokenTypes, (function(currType) {
              var pattern = currType.PATTERN;
              return pattern instanceof RegExp && (pattern.multiline || pattern.global);
            }));
            return (0, utils.UI)(invalidFlags, (function(currType) {
              return {
                message: "Token Type: ->" + currType.name + "<- static 'PATTERN' may NOT contain global('g') or multiline('m')",
                type: LexerDefinitionErrorType.UNSUPPORTED_FLAGS_FOUND,
                tokenTypes: [ currType ]
              };
            }));
          }(withRegExpPatterns)), errors = errors.concat(function(tokenTypes) {
            var found = [], identicalPatterns = (0, utils.UI)(tokenTypes, (function(outerType) {
              return (0, utils.u4)(tokenTypes, (function(result, innerType) {
                return outerType.PATTERN.source !== innerType.PATTERN.source || (0, utils.r3)(found, innerType) || innerType.PATTERN === Lexer.NA || (found.push(innerType), 
                result.push(innerType)), result;
              }), []);
            }));
            identicalPatterns = (0, utils.oA)(identicalPatterns);
            var duplicatePatterns = (0, utils.hX)(identicalPatterns, (function(currIdenticalSet) {
              return currIdenticalSet.length > 1;
            }));
            return (0, utils.UI)(duplicatePatterns, (function(setOfIdentical) {
              var tokenTypeNames = (0, utils.UI)(setOfIdentical, (function(currType) {
                return currType.name;
              }));
              return {
                message: "The same RegExp pattern ->" + (0, utils.Ps)(setOfIdentical).PATTERN + "<-has been used in all of the following Token Types: " + tokenTypeNames.join(", ") + " <-",
                type: LexerDefinitionErrorType.DUPLICATE_PATTERNS_FOUND,
                tokenTypes: setOfIdentical
              };
            }));
          }(withRegExpPatterns)), errors = errors.concat(function(tokenTypes) {
            var matchesEmptyString = (0, utils.hX)(tokenTypes, (function(currType) {
              return currType.PATTERN.test("");
            }));
            return (0, utils.UI)(matchesEmptyString, (function(currType) {
              return {
                message: "Token Type: ->" + currType.name + "<- static 'PATTERN' must not match an empty string",
                type: LexerDefinitionErrorType.EMPTY_MATCH_PATTERN,
                tokenTypes: [ currType ]
              };
            }));
          }(withRegExpPatterns)), errors;
        }(validTokenTypes)), errors = errors.concat(function(tokenTypes) {
          var invalidTypes = (0, utils.hX)(tokenTypes, (function(clazz) {
            if (!(0, utils.e$)(clazz, "GROUP")) return !1;
            var group = clazz.GROUP;
            return group !== Lexer.SKIPPED && group !== Lexer.NA && !(0, utils.HD)(group);
          }));
          return (0, utils.UI)(invalidTypes, (function(currType) {
            return {
              message: "Token Type: ->" + currType.name + "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String",
              type: LexerDefinitionErrorType.INVALID_GROUP_TYPE_FOUND,
              tokenTypes: [ currType ]
            };
          }));
        }(validTokenTypes)), errors = errors.concat(function(tokenTypes, validModes) {
          var invalidModes = (0, utils.hX)(tokenTypes, (function(clazz) {
            return void 0 !== clazz.PUSH_MODE && !(0, utils.r3)(validModes, clazz.PUSH_MODE);
          }));
          return (0, utils.UI)(invalidModes, (function(tokType) {
            return {
              message: "Token Type: ->" + tokType.name + "<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->" + tokType.PUSH_MODE + "<-which does not exist",
              type: LexerDefinitionErrorType.PUSH_MODE_DOES_NOT_EXIST,
              tokenTypes: [ tokType ]
            };
          }));
        }(validTokenTypes, validModesNames)), errors = errors.concat(function(tokenTypes) {
          var errors = [], canBeTested = (0, utils.u4)(tokenTypes, (function(result, tokType, idx) {
            var regExp, metaChars, pattern = tokType.PATTERN;
            return pattern === Lexer.NA || ((0, utils.HD)(pattern) ? result.push({
              str: pattern,
              idx,
              tokenType: tokType
            }) : (0, utils.Kj)(pattern) && (regExp = pattern, metaChars = [ ".", "\\", "[", "]", "|", "^", "$", "(", ")", "?", "*", "+", "{" ], 
            void 0 === (0, utils.sE)(metaChars, (function(char) {
              return -1 !== regExp.source.indexOf(char);
            }))) && result.push({
              str: pattern.source,
              idx,
              tokenType: tokType
            })), result;
          }), []);
          return (0, utils.Ed)(tokenTypes, (function(tokType, testIdx) {
            (0, utils.Ed)(canBeTested, (function(_a) {
              var str = _a.str, idx = _a.idx, tokenType = _a.tokenType;
              if (testIdx < idx && function(str, pattern) {
                if ((0, utils.Kj)(pattern)) {
                  var regExpArray = pattern.exec(str);
                  return null !== regExpArray && 0 === regExpArray.index;
                }
                if ((0, utils.mf)(pattern)) return pattern(str, 0, [], {});
                if ((0, utils.e$)(pattern, "exec")) return pattern.exec(str, 0, [], {});
                if ("string" == typeof pattern) return pattern === str;
                throw Error("non exhaustive match");
              }(str, tokType.PATTERN)) {
                var msg = "Token: ->" + tokenType.name + "<- can never be matched.\nBecause it appears AFTER the Token Type ->" + tokType.name + "<-in the lexer's definition.\nSee https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#UNREACHABLE";
                errors.push({
                  message: msg,
                  type: LexerDefinitionErrorType.UNREACHABLE_PATTERN,
                  tokenTypes: [ tokType, tokenType ]
                });
              }
            }));
          })), errors;
        }(validTokenTypes)), errors;
      }
      var end_of_input = /[^\\][\$]/;
      var start_of_input = /[^\\[][\^]|^\^/;
      function addStartOfInput(pattern) {
        var flags = pattern.ignoreCase ? "i" : "";
        return new RegExp("^(?:" + pattern.source + ")", flags);
      }
      function addStickyFlag(pattern) {
        var flags = pattern.ignoreCase ? "iy" : "y";
        return new RegExp("" + pattern.source, flags);
      }
      function performWarningRuntimeChecks(lexerDefinition, trackLines, lineTerminatorCharacters) {
        var warnings = [], hasAnyLineBreak = !1, allTokenTypes = (0, utils.oA)((0, utils.xH)((0, 
        utils.Q8)(lexerDefinition.modes, (function(tokTypes) {
          return tokTypes;
        })))), concreteTokenTypes = (0, utils.d1)(allTokenTypes, (function(currType) {
          return currType.PATTERN === Lexer.NA;
        })), terminatorCharCodes = getCharCodes(lineTerminatorCharacters);
        return trackLines && (0, utils.Ed)(concreteTokenTypes, (function(tokType) {
          var currIssue = checkLineBreaksIssues(tokType, terminatorCharCodes);
          if (!1 !== currIssue) {
            var message = function(tokType, details) {
              if (details.issue === LexerDefinitionErrorType.IDENTIFY_TERMINATOR) return "Warning: unable to identify line terminator usage in pattern.\n\tThe problem is in the <" + tokType.name + "> Token Type\n\t Root cause: " + details.errMsg + ".\n\tFor details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR";
              if (details.issue === LexerDefinitionErrorType.CUSTOM_LINE_BREAK) return "Warning: A Custom Token Pattern should specify the <line_breaks> option.\n\tThe problem is in the <" + tokType.name + "> Token Type\n\tFor details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK";
              throw Error("non exhaustive match");
            }(tokType, currIssue), warningDescriptor = {
              message,
              type: currIssue.issue,
              tokenType: tokType
            };
            warnings.push(warningDescriptor);
          } else (0, utils.e$)(tokType, "LINE_BREAKS") ? !0 === tokType.LINE_BREAKS && (hasAnyLineBreak = !0) : canMatchCharCode(terminatorCharCodes, tokType.PATTERN) && (hasAnyLineBreak = !0);
        })), trackLines && !hasAnyLineBreak && warnings.push({
          message: "Warning: No LINE_BREAKS Found.\n\tThis Lexer has been defined to track line and column information,\n\tBut none of the Token Types can be identified as matching a line terminator.\n\tSee https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#LINE_BREAKS \n\tfor details.",
          type: LexerDefinitionErrorType.NO_LINE_BREAKS_FLAGS
        }), warnings;
      }
      function isCustomPattern(tokenType) {
        var pattern = tokenType.PATTERN;
        if ((0, utils.Kj)(pattern)) return !1;
        if ((0, utils.mf)(pattern)) return !0;
        if ((0, utils.e$)(pattern, "exec")) return !0;
        if ((0, utils.HD)(pattern)) return !1;
        throw Error("non exhaustive match");
      }
      function isShortPattern(pattern) {
        return !(!(0, utils.HD)(pattern) || 1 !== pattern.length) && pattern.charCodeAt(0);
      }
      var LineTerminatorOptimizedTester = {
        test: function(text) {
          for (var len = text.length, i = this.lastIndex; i < len; i++) {
            var c = text.charCodeAt(i);
            if (10 === c) return this.lastIndex = i + 1, !0;
            if (13 === c) return 10 === text.charCodeAt(i + 1) ? this.lastIndex = i + 2 : this.lastIndex = i + 1, 
            !0;
          }
          return !1;
        },
        lastIndex: 0
      };
      function checkLineBreaksIssues(tokType, lineTerminatorCharCodes) {
        if ((0, utils.e$)(tokType, "LINE_BREAKS")) return !1;
        if ((0, utils.Kj)(tokType.PATTERN)) {
          try {
            canMatchCharCode(lineTerminatorCharCodes, tokType.PATTERN);
          } catch (e) {
            return {
              issue: LexerDefinitionErrorType.IDENTIFY_TERMINATOR,
              errMsg: e.message
            };
          }
          return !1;
        }
        if ((0, utils.HD)(tokType.PATTERN)) return !1;
        if (isCustomPattern(tokType)) return {
          issue: LexerDefinitionErrorType.CUSTOM_LINE_BREAK
        };
        throw Error("non exhaustive match");
      }
      function getCharCodes(charsOrCodes) {
        return (0, utils.UI)(charsOrCodes, (function(numOrString) {
          return (0, utils.HD)(numOrString) && numOrString.length > 0 ? numOrString.charCodeAt(0) : numOrString;
        }));
      }
      function addToMapOfArrays(map, key, value) {
        void 0 === map[key] ? map[key] = [ value ] : map[key].push(value);
      }
      var minOptimizationVal = 256;
      function charCodeToOptimizedIndex(charCode) {
        return charCode < minOptimizationVal ? charCode : charCodeToOptimizedIdxMap[charCode];
      }
      var charCodeToOptimizedIdxMap = [];
      function tokenStructuredMatcher(tokInstance, tokConstructor) {
        var instanceType = tokInstance.tokenTypeIdx;
        return instanceType === tokConstructor.tokenTypeIdx || !0 === tokConstructor.isParent && !0 === tokConstructor.categoryMatchesMap[instanceType];
      }
      function tokenStructuredMatcherNoCategories(token, tokType) {
        return token.tokenTypeIdx === tokType.tokenTypeIdx;
      }
      var tokenShortNameIdx = 1, tokenIdxToClass = {};
      function augmentTokenTypes(tokenTypes) {
        var tokenTypesAndParents = function(tokenTypes) {
          var result = (0, utils.Qw)(tokenTypes), categories = tokenTypes, searching = !0;
          for (;searching; ) {
            categories = (0, utils.oA)((0, utils.xH)((0, utils.UI)(categories, (function(currTokType) {
              return currTokType.CATEGORIES;
            }))));
            var newCategories = (0, utils.e5)(categories, result);
            result = result.concat(newCategories), (0, utils.xb)(newCategories) ? searching = !1 : categories = newCategories;
          }
          return result;
        }(tokenTypes);
        !function(tokenTypes) {
          (0, utils.Ed)(tokenTypes, (function(currTokType) {
            var tokType;
            hasShortKeyProperty(currTokType) || (tokenIdxToClass[tokenShortNameIdx] = currTokType, 
            currTokType.tokenTypeIdx = tokenShortNameIdx++), hasCategoriesProperty(currTokType) && !(0, 
            utils.kJ)(currTokType.CATEGORIES) && (currTokType.CATEGORIES = [ currTokType.CATEGORIES ]), 
            hasCategoriesProperty(currTokType) || (currTokType.CATEGORIES = []), tokType = currTokType, 
            (0, utils.e$)(tokType, "categoryMatches") || (currTokType.categoryMatches = []), 
            function(tokType) {
              return (0, utils.e$)(tokType, "categoryMatchesMap");
            }(currTokType) || (currTokType.categoryMatchesMap = {});
          }));
        }(tokenTypesAndParents), function(tokenTypes) {
          (0, utils.Ed)(tokenTypes, (function(currTokType) {
            singleAssignCategoriesToksMap([], currTokType);
          }));
        }(tokenTypesAndParents), function(tokenTypes) {
          (0, utils.Ed)(tokenTypes, (function(currTokType) {
            currTokType.categoryMatches = [], (0, utils.Ed)(currTokType.categoryMatchesMap, (function(val, key) {
              currTokType.categoryMatches.push(tokenIdxToClass[key].tokenTypeIdx);
            }));
          }));
        }(tokenTypesAndParents), (0, utils.Ed)(tokenTypesAndParents, (function(tokType) {
          tokType.isParent = tokType.categoryMatches.length > 0;
        }));
      }
      function singleAssignCategoriesToksMap(path, nextNode) {
        (0, utils.Ed)(path, (function(pathNode) {
          nextNode.categoryMatchesMap[pathNode.tokenTypeIdx] = !0;
        })), (0, utils.Ed)(nextNode.CATEGORIES, (function(nextCategory) {
          var newPath = path.concat(nextNode);
          (0, utils.r3)(newPath, nextCategory) || singleAssignCategoriesToksMap(newPath, nextCategory);
        }));
      }
      function hasShortKeyProperty(tokType) {
        return (0, utils.e$)(tokType, "tokenTypeIdx");
      }
      function hasCategoriesProperty(tokType) {
        return (0, utils.e$)(tokType, "CATEGORIES");
      }
      function isTokenType(tokType) {
        return (0, utils.e$)(tokType, "tokenTypeIdx");
      }
      var LexerDefinitionErrorType, defaultLexerErrorProvider = {
        buildUnableToPopLexerModeMessage: function(token) {
          return "Unable to pop Lexer Mode after encountering Token ->" + token.image + "<- The Mode Stack is empty";
        },
        buildUnexpectedCharactersMessage: function(fullText, startOffset, length, line, column) {
          return "unexpected character: ->" + fullText.charAt(startOffset) + "<- at offset: " + startOffset + ", skipped " + length + " characters.";
        }
      };
      !function(LexerDefinitionErrorType) {
        LexerDefinitionErrorType[LexerDefinitionErrorType.MISSING_PATTERN = 0] = "MISSING_PATTERN", 
        LexerDefinitionErrorType[LexerDefinitionErrorType.INVALID_PATTERN = 1] = "INVALID_PATTERN", 
        LexerDefinitionErrorType[LexerDefinitionErrorType.EOI_ANCHOR_FOUND = 2] = "EOI_ANCHOR_FOUND", 
        LexerDefinitionErrorType[LexerDefinitionErrorType.UNSUPPORTED_FLAGS_FOUND = 3] = "UNSUPPORTED_FLAGS_FOUND", 
        LexerDefinitionErrorType[LexerDefinitionErrorType.DUPLICATE_PATTERNS_FOUND = 4] = "DUPLICATE_PATTERNS_FOUND", 
        LexerDefinitionErrorType[LexerDefinitionErrorType.INVALID_GROUP_TYPE_FOUND = 5] = "INVALID_GROUP_TYPE_FOUND", 
        LexerDefinitionErrorType[LexerDefinitionErrorType.PUSH_MODE_DOES_NOT_EXIST = 6] = "PUSH_MODE_DOES_NOT_EXIST", 
        LexerDefinitionErrorType[LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE = 7] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE", 
        LexerDefinitionErrorType[LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY = 8] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY", 
        LexerDefinitionErrorType[LexerDefinitionErrorType.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST = 9] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST", 
        LexerDefinitionErrorType[LexerDefinitionErrorType.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED = 10] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED", 
        LexerDefinitionErrorType[LexerDefinitionErrorType.SOI_ANCHOR_FOUND = 11] = "SOI_ANCHOR_FOUND", 
        LexerDefinitionErrorType[LexerDefinitionErrorType.EMPTY_MATCH_PATTERN = 12] = "EMPTY_MATCH_PATTERN", 
        LexerDefinitionErrorType[LexerDefinitionErrorType.NO_LINE_BREAKS_FLAGS = 13] = "NO_LINE_BREAKS_FLAGS", 
        LexerDefinitionErrorType[LexerDefinitionErrorType.UNREACHABLE_PATTERN = 14] = "UNREACHABLE_PATTERN", 
        LexerDefinitionErrorType[LexerDefinitionErrorType.IDENTIFY_TERMINATOR = 15] = "IDENTIFY_TERMINATOR", 
        LexerDefinitionErrorType[LexerDefinitionErrorType.CUSTOM_LINE_BREAK = 16] = "CUSTOM_LINE_BREAK";
      }(LexerDefinitionErrorType || (LexerDefinitionErrorType = {}));
      var DEFAULT_LEXER_CONFIG = {
        deferDefinitionErrorsHandling: !1,
        positionTracking: "full",
        lineTerminatorsPattern: /\n|\r\n?/g,
        lineTerminatorCharacters: [ "\n", "\r" ],
        ensureOptimizations: !1,
        safeMode: !1,
        errorMessageProvider: defaultLexerErrorProvider,
        traceInitPerf: !1,
        skipValidations: !1
      };
      Object.freeze(DEFAULT_LEXER_CONFIG);
      var Lexer = function() {
        function Lexer(lexerDefinition, config) {
          var _this = this;
          if (void 0 === config && (config = DEFAULT_LEXER_CONFIG), this.lexerDefinition = lexerDefinition, 
          this.lexerDefinitionErrors = [], this.lexerDefinitionWarning = [], this.patternIdxToConfig = {}, 
          this.charCodeToPatternIdxToConfig = {}, this.modes = [], this.emptyGroups = {}, 
          this.config = void 0, this.trackStartLines = !0, this.trackEndLines = !0, this.hasCustom = !1, 
          this.canModeBeOptimized = {}, "boolean" == typeof config) throw Error("The second argument to the Lexer constructor is now an ILexerConfig Object.\na boolean 2nd argument is no longer supported");
          this.config = (0, utils.TS)(DEFAULT_LEXER_CONFIG, config);
          var traceInitVal = this.config.traceInitPerf;
          !0 === traceInitVal ? (this.traceInitMaxIdent = 1 / 0, this.traceInitPerf = !0) : "number" == typeof traceInitVal && (this.traceInitMaxIdent = traceInitVal, 
          this.traceInitPerf = !0), this.traceInitIndent = -1, this.TRACE_INIT("Lexer Constructor", (function() {
            var actualDefinition, hasOnlySingleMode = !0;
            _this.TRACE_INIT("Lexer Config handling", (function() {
              if (_this.config.lineTerminatorsPattern === DEFAULT_LEXER_CONFIG.lineTerminatorsPattern) _this.config.lineTerminatorsPattern = LineTerminatorOptimizedTester; else if (_this.config.lineTerminatorCharacters === DEFAULT_LEXER_CONFIG.lineTerminatorCharacters) throw Error("Error: Missing <lineTerminatorCharacters> property on the Lexer config.\n\tFor details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS");
              if (config.safeMode && config.ensureOptimizations) throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.');
              _this.trackStartLines = /full|onlyStart/i.test(_this.config.positionTracking), _this.trackEndLines = /full/i.test(_this.config.positionTracking), 
              (0, utils.kJ)(lexerDefinition) ? ((actualDefinition = {
                modes: {}
              }).modes.defaultMode = (0, utils.Qw)(lexerDefinition), actualDefinition.defaultMode = "defaultMode") : (hasOnlySingleMode = !1, 
              actualDefinition = (0, utils.Cl)(lexerDefinition));
            })), !1 === _this.config.skipValidations && (_this.TRACE_INIT("performRuntimeChecks", (function() {
              _this.lexerDefinitionErrors = _this.lexerDefinitionErrors.concat(function(lexerDefinition, trackLines, lineTerminatorCharacters) {
                var errors = [];
                return (0, utils.e$)(lexerDefinition, "defaultMode") || errors.push({
                  message: "A MultiMode Lexer cannot be initialized without a <defaultMode> property in its definition\n",
                  type: LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE
                }), (0, utils.e$)(lexerDefinition, "modes") || errors.push({
                  message: "A MultiMode Lexer cannot be initialized without a <modes> property in its definition\n",
                  type: LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY
                }), (0, utils.e$)(lexerDefinition, "modes") && (0, utils.e$)(lexerDefinition, "defaultMode") && !(0, 
                utils.e$)(lexerDefinition.modes, lexerDefinition.defaultMode) && errors.push({
                  message: "A MultiMode Lexer cannot be initialized with a defaultMode: <" + lexerDefinition.defaultMode + ">which does not exist\n",
                  type: LexerDefinitionErrorType.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST
                }), (0, utils.e$)(lexerDefinition, "modes") && (0, utils.Ed)(lexerDefinition.modes, (function(currModeValue, currModeName) {
                  (0, utils.Ed)(currModeValue, (function(currTokType, currIdx) {
                    (0, utils.o8)(currTokType) && errors.push({
                      message: "A Lexer cannot be initialized using an undefined Token Type. Mode:<" + currModeName + "> at index: <" + currIdx + ">\n",
                      type: LexerDefinitionErrorType.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED
                    });
                  }));
                })), errors;
              }(actualDefinition, _this.trackStartLines, _this.config.lineTerminatorCharacters));
            })), _this.TRACE_INIT("performWarningRuntimeChecks", (function() {
              _this.lexerDefinitionWarning = _this.lexerDefinitionWarning.concat(performWarningRuntimeChecks(actualDefinition, _this.trackStartLines, _this.config.lineTerminatorCharacters));
            }))), actualDefinition.modes = actualDefinition.modes ? actualDefinition.modes : {}, 
            (0, utils.Ed)(actualDefinition.modes, (function(currModeValue, currModeName) {
              actualDefinition.modes[currModeName] = (0, utils.d1)(currModeValue, (function(currTokType) {
                return (0, utils.o8)(currTokType);
              }));
            }));
            var allModeNames = (0, utils.XP)(actualDefinition.modes);
            if ((0, utils.Ed)(actualDefinition.modes, (function(currModDef, currModName) {
              _this.TRACE_INIT("Mode: <" + currModName + "> processing", (function() {
                var currAnalyzeResult_1;
                (_this.modes.push(currModName), !1 === _this.config.skipValidations && _this.TRACE_INIT("validatePatterns", (function() {
                  _this.lexerDefinitionErrors = _this.lexerDefinitionErrors.concat(validatePatterns(currModDef, allModeNames));
                })), (0, utils.xb)(_this.lexerDefinitionErrors)) && (augmentTokenTypes(currModDef), 
                _this.TRACE_INIT("analyzeTokenTypes", (function() {
                  currAnalyzeResult_1 = analyzeTokenTypes(currModDef, {
                    lineTerminatorCharacters: _this.config.lineTerminatorCharacters,
                    positionTracking: config.positionTracking,
                    ensureOptimizations: config.ensureOptimizations,
                    safeMode: config.safeMode,
                    tracer: _this.TRACE_INIT.bind(_this)
                  });
                })), _this.patternIdxToConfig[currModName] = currAnalyzeResult_1.patternIdxToConfig, 
                _this.charCodeToPatternIdxToConfig[currModName] = currAnalyzeResult_1.charCodeToPatternIdxToConfig, 
                _this.emptyGroups = (0, utils.TS)(_this.emptyGroups, currAnalyzeResult_1.emptyGroups), 
                _this.hasCustom = currAnalyzeResult_1.hasCustom || _this.hasCustom, _this.canModeBeOptimized[currModName] = currAnalyzeResult_1.canBeOptimized);
              }));
            })), _this.defaultMode = actualDefinition.defaultMode, !(0, utils.xb)(_this.lexerDefinitionErrors) && !_this.config.deferDefinitionErrorsHandling) {
              var allErrMessagesString = (0, utils.UI)(_this.lexerDefinitionErrors, (function(error) {
                return error.message;
              })).join("-----------------------\n");
              throw new Error("Errors detected in definition of Lexer:\n" + allErrMessagesString);
            }
            (0, utils.Ed)(_this.lexerDefinitionWarning, (function(warningDescriptor) {
              (0, utils.rr)(warningDescriptor.message);
            })), _this.TRACE_INIT("Choosing sub-methods implementations", (function() {
              if (SUPPORT_STICKY ? (_this.chopInput = utils.Wd, _this.match = _this.matchWithTest) : (_this.updateLastIndex = utils.dG, 
              _this.match = _this.matchWithExec), hasOnlySingleMode && (_this.handleModes = utils.dG), 
              !1 === _this.trackStartLines && (_this.computeNewColumn = utils.Wd), !1 === _this.trackEndLines && (_this.updateTokenEndLineColumnLocation = utils.dG), 
              /full/i.test(_this.config.positionTracking)) _this.createTokenInstance = _this.createFullToken; else if (/onlyStart/i.test(_this.config.positionTracking)) _this.createTokenInstance = _this.createStartOnlyToken; else {
                if (!/onlyOffset/i.test(_this.config.positionTracking)) throw Error('Invalid <positionTracking> config option: "' + _this.config.positionTracking + '"');
                _this.createTokenInstance = _this.createOffsetOnlyToken;
              }
              _this.hasCustom ? (_this.addToken = _this.addTokenUsingPush, _this.handlePayload = _this.handlePayloadWithCustom) : (_this.addToken = _this.addTokenUsingMemberAccess, 
              _this.handlePayload = _this.handlePayloadNoCustom);
            })), _this.TRACE_INIT("Failed Optimization Warnings", (function() {
              var unOptimizedModes = (0, utils.u4)(_this.canModeBeOptimized, (function(cannotBeOptimized, canBeOptimized, modeName) {
                return !1 === canBeOptimized && cannotBeOptimized.push(modeName), cannotBeOptimized;
              }), []);
              if (config.ensureOptimizations && !(0, utils.xb)(unOptimizedModes)) throw Error("Lexer Modes: < " + unOptimizedModes.join(", ") + ' > cannot be optimized.\n\t Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.\n\t Or inspect the console log for details on how to resolve these issues.');
            })), _this.TRACE_INIT("clearRegExpParserCache", (function() {
              regExpAstCache = {};
            })), _this.TRACE_INIT("toFastProperties", (function() {
              (0, utils.SV)(_this);
            }));
          }));
        }
        return Lexer.prototype.tokenize = function(text, initialMode) {
          if (void 0 === initialMode && (initialMode = this.defaultMode), !(0, utils.xb)(this.lexerDefinitionErrors)) {
            var allErrMessagesString = (0, utils.UI)(this.lexerDefinitionErrors, (function(error) {
              return error.message;
            })).join("-----------------------\n");
            throw new Error("Unable to Tokenize because Errors detected in definition of Lexer:\n" + allErrMessagesString);
          }
          return this.tokenizeInternal(text, initialMode);
        }, Lexer.prototype.tokenizeInternal = function(text, initialMode) {
          var i, j, matchAltImage, longerAltIdx, matchedImage, payload, altPayload, imageLength, group, tokType, newToken, errLength, msg, match, emptyGroups, clonedResult, groupKeys, _this = this, orgText = text, orgLength = orgText.length, offset = 0, matchedTokensIndex = 0, guessedNumberOfTokens = this.hasCustom ? 0 : Math.floor(text.length / 10), matchedTokens = new Array(guessedNumberOfTokens), errors = [], line = this.trackStartLines ? 1 : void 0, column = this.trackStartLines ? 1 : void 0, groups = (emptyGroups = this.emptyGroups, 
          clonedResult = {}, groupKeys = (0, utils.XP)(emptyGroups), (0, utils.Ed)(groupKeys, (function(currKey) {
            var currGroupValue = emptyGroups[currKey];
            if (!(0, utils.kJ)(currGroupValue)) throw Error("non exhaustive match");
            clonedResult[currKey] = [];
          })), clonedResult), trackLines = this.trackStartLines, lineTerminatorPattern = this.config.lineTerminatorsPattern, currModePatternsLength = 0, patternIdxToConfig = [], currCharCodeToPatternIdxToConfig = [], modeStack = [], emptyArray = [];
          Object.freeze(emptyArray);
          var getPossiblePatterns = void 0;
          function getPossiblePatternsSlow() {
            return patternIdxToConfig;
          }
          function getPossiblePatternsOptimized(charCode) {
            var optimizedCharIdx = charCodeToOptimizedIndex(charCode), possiblePatterns = currCharCodeToPatternIdxToConfig[optimizedCharIdx];
            return void 0 === possiblePatterns ? emptyArray : possiblePatterns;
          }
          var currConfig, pop_mode = function(popToken) {
            if (1 === modeStack.length && void 0 === popToken.tokenType.PUSH_MODE) {
              var msg_1 = _this.config.errorMessageProvider.buildUnableToPopLexerModeMessage(popToken);
              errors.push({
                offset: popToken.startOffset,
                line: void 0 !== popToken.startLine ? popToken.startLine : void 0,
                column: void 0 !== popToken.startColumn ? popToken.startColumn : void 0,
                length: popToken.image.length,
                message: msg_1
              });
            } else {
              modeStack.pop();
              var newMode = (0, utils.Z$)(modeStack);
              patternIdxToConfig = _this.patternIdxToConfig[newMode], currCharCodeToPatternIdxToConfig = _this.charCodeToPatternIdxToConfig[newMode], 
              currModePatternsLength = patternIdxToConfig.length;
              var modeCanBeOptimized = _this.canModeBeOptimized[newMode] && !1 === _this.config.safeMode;
              getPossiblePatterns = currCharCodeToPatternIdxToConfig && modeCanBeOptimized ? getPossiblePatternsOptimized : getPossiblePatternsSlow;
            }
          };
          function push_mode(newMode) {
            modeStack.push(newMode), currCharCodeToPatternIdxToConfig = this.charCodeToPatternIdxToConfig[newMode], 
            patternIdxToConfig = this.patternIdxToConfig[newMode], currModePatternsLength = patternIdxToConfig.length, 
            currModePatternsLength = patternIdxToConfig.length;
            var modeCanBeOptimized = this.canModeBeOptimized[newMode] && !1 === this.config.safeMode;
            getPossiblePatterns = currCharCodeToPatternIdxToConfig && modeCanBeOptimized ? getPossiblePatternsOptimized : getPossiblePatternsSlow;
          }
          for (push_mode.call(this, initialMode); offset < orgLength; ) {
            matchedImage = null;
            var nextCharCode = orgText.charCodeAt(offset), chosenPatternIdxToConfig = getPossiblePatterns(nextCharCode), chosenPatternsLength = chosenPatternIdxToConfig.length;
            for (i = 0; i < chosenPatternsLength; i++) {
              var currPattern = (currConfig = chosenPatternIdxToConfig[i]).pattern;
              if (payload = null, !1 !== (singleCharCode = currConfig.short) ? nextCharCode === singleCharCode && (matchedImage = currPattern) : !0 === currConfig.isCustom ? null !== (match = currPattern.exec(orgText, offset, matchedTokens, groups)) ? (matchedImage = match[0], 
              void 0 !== match.payload && (payload = match.payload)) : matchedImage = null : (this.updateLastIndex(currPattern, offset), 
              matchedImage = this.match(currPattern, text, offset)), null !== matchedImage) {
                if (void 0 !== (longerAltIdx = currConfig.longerAlt)) {
                  var longerAltConfig = patternIdxToConfig[longerAltIdx], longerAltPattern = longerAltConfig.pattern;
                  altPayload = null, !0 === longerAltConfig.isCustom ? null !== (match = longerAltPattern.exec(orgText, offset, matchedTokens, groups)) ? (matchAltImage = match[0], 
                  void 0 !== match.payload && (altPayload = match.payload)) : matchAltImage = null : (this.updateLastIndex(longerAltPattern, offset), 
                  matchAltImage = this.match(longerAltPattern, text, offset)), matchAltImage && matchAltImage.length > matchedImage.length && (matchedImage = matchAltImage, 
                  payload = altPayload, currConfig = longerAltConfig);
                }
                break;
              }
            }
            if (null !== matchedImage) {
              if (imageLength = matchedImage.length, void 0 !== (group = currConfig.group) && (tokType = currConfig.tokenTypeIdx, 
              newToken = this.createTokenInstance(matchedImage, offset, tokType, currConfig.tokenType, line, column, imageLength), 
              this.handlePayload(newToken, payload), !1 === group ? matchedTokensIndex = this.addToken(matchedTokens, matchedTokensIndex, newToken) : groups[group].push(newToken)), 
              text = this.chopInput(text, imageLength), offset += imageLength, column = this.computeNewColumn(column, imageLength), 
              !0 === trackLines && !0 === currConfig.canLineTerminator) {
                var numOfLTsInMatch = 0, foundTerminator = void 0, lastLTEndOffset = void 0;
                lineTerminatorPattern.lastIndex = 0;
                do {
                  !0 === (foundTerminator = lineTerminatorPattern.test(matchedImage)) && (lastLTEndOffset = lineTerminatorPattern.lastIndex - 1, 
                  numOfLTsInMatch++);
                } while (!0 === foundTerminator);
                0 !== numOfLTsInMatch && (line += numOfLTsInMatch, column = imageLength - lastLTEndOffset, 
                this.updateTokenEndLineColumnLocation(newToken, group, lastLTEndOffset, numOfLTsInMatch, line, column, imageLength));
              }
              this.handleModes(currConfig, pop_mode, push_mode, newToken);
            } else {
              for (var errorStartOffset = offset, errorLine = line, errorColumn = column, foundResyncPoint = !1; !foundResyncPoint && offset < orgLength; ) for (orgText.charCodeAt(offset), 
              text = this.chopInput(text, 1), offset++, j = 0; j < currModePatternsLength; j++) {
                var singleCharCode, currConfig_1 = patternIdxToConfig[j];
                currPattern = currConfig_1.pattern;
                if (!1 !== (singleCharCode = currConfig_1.short) ? orgText.charCodeAt(offset) === singleCharCode && (foundResyncPoint = !0) : !0 === currConfig_1.isCustom ? foundResyncPoint = null !== currPattern.exec(orgText, offset, matchedTokens, groups) : (this.updateLastIndex(currPattern, offset), 
                foundResyncPoint = null !== currPattern.exec(text)), !0 === foundResyncPoint) break;
              }
              errLength = offset - errorStartOffset, msg = this.config.errorMessageProvider.buildUnexpectedCharactersMessage(orgText, errorStartOffset, errLength, errorLine, errorColumn), 
              errors.push({
                offset: errorStartOffset,
                line: errorLine,
                column: errorColumn,
                length: errLength,
                message: msg
              });
            }
          }
          return this.hasCustom || (matchedTokens.length = matchedTokensIndex), {
            tokens: matchedTokens,
            groups,
            errors
          };
        }, Lexer.prototype.handleModes = function(config, pop_mode, push_mode, newToken) {
          if (!0 === config.pop) {
            var pushMode = config.push;
            pop_mode(newToken), void 0 !== pushMode && push_mode.call(this, pushMode);
          } else void 0 !== config.push && push_mode.call(this, config.push);
        }, Lexer.prototype.chopInput = function(text, length) {
          return text.substring(length);
        }, Lexer.prototype.updateLastIndex = function(regExp, newLastIndex) {
          regExp.lastIndex = newLastIndex;
        }, Lexer.prototype.updateTokenEndLineColumnLocation = function(newToken, group, lastLTIdx, numOfLTsInMatch, line, column, imageLength) {
          var lastCharIsLT, fixForEndingInLT;
          void 0 !== group && (fixForEndingInLT = (lastCharIsLT = lastLTIdx === imageLength - 1) ? -1 : 0, 
          1 === numOfLTsInMatch && !0 === lastCharIsLT || (newToken.endLine = line + fixForEndingInLT, 
          newToken.endColumn = column - 1 - fixForEndingInLT));
        }, Lexer.prototype.computeNewColumn = function(oldColumn, imageLength) {
          return oldColumn + imageLength;
        }, Lexer.prototype.createTokenInstance = function() {
          for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
          return null;
        }, Lexer.prototype.createOffsetOnlyToken = function(image, startOffset, tokenTypeIdx, tokenType) {
          return {
            image,
            startOffset,
            tokenTypeIdx,
            tokenType
          };
        }, Lexer.prototype.createStartOnlyToken = function(image, startOffset, tokenTypeIdx, tokenType, startLine, startColumn) {
          return {
            image,
            startOffset,
            startLine,
            startColumn,
            tokenTypeIdx,
            tokenType
          };
        }, Lexer.prototype.createFullToken = function(image, startOffset, tokenTypeIdx, tokenType, startLine, startColumn, imageLength) {
          return {
            image,
            startOffset,
            endOffset: startOffset + imageLength - 1,
            startLine,
            endLine: startLine,
            startColumn,
            endColumn: startColumn + imageLength - 1,
            tokenTypeIdx,
            tokenType
          };
        }, Lexer.prototype.addToken = function(tokenVector, index, tokenToAdd) {
          return 666;
        }, Lexer.prototype.addTokenUsingPush = function(tokenVector, index, tokenToAdd) {
          return tokenVector.push(tokenToAdd), index;
        }, Lexer.prototype.addTokenUsingMemberAccess = function(tokenVector, index, tokenToAdd) {
          return tokenVector[index] = tokenToAdd, ++index;
        }, Lexer.prototype.handlePayload = function(token, payload) {}, Lexer.prototype.handlePayloadNoCustom = function(token, payload) {}, 
        Lexer.prototype.handlePayloadWithCustom = function(token, payload) {
          null !== payload && (token.payload = payload);
        }, Lexer.prototype.match = function(pattern, text, offset) {
          return null;
        }, Lexer.prototype.matchWithTest = function(pattern, text, offset) {
          return !0 === pattern.test(text) ? text.substring(offset, pattern.lastIndex) : null;
        }, Lexer.prototype.matchWithExec = function(pattern, text) {
          var regExpArray = pattern.exec(text);
          return null !== regExpArray ? regExpArray[0] : regExpArray;
        }, Lexer.prototype.TRACE_INIT = function(phaseDesc, phaseImpl) {
          if (!0 === this.traceInitPerf) {
            this.traceInitIndent++;
            var indent = new Array(this.traceInitIndent + 1).join("\t");
            this.traceInitIndent < this.traceInitMaxIdent && console.log(indent + "--\x3e <" + phaseDesc + ">");
            var _a = (0, utils.HT)(phaseImpl), time = _a.time, value = _a.value, traceMethod = time > 10 ? console.warn : console.log;
            return this.traceInitIndent < this.traceInitMaxIdent && traceMethod(indent + "<-- <" + phaseDesc + "> time: " + time + "ms"), 
            this.traceInitIndent--, value;
          }
          return phaseImpl();
        }, Lexer.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.", 
        Lexer.NA = /NOT_APPLICABLE/, Lexer;
      }();
      function tokenLabel(tokType) {
        return hasTokenLabel(tokType) ? tokType.LABEL : tokType.name;
      }
      function tokenName(tokType) {
        return tokType.name;
      }
      function hasTokenLabel(obj) {
        return (0, utils.HD)(obj.LABEL) && "" !== obj.LABEL;
      }
      function createToken(config) {
        return function(config) {
          var pattern = config.pattern, tokenType = {};
          tokenType.name = config.name, (0, utils.o8)(pattern) || (tokenType.PATTERN = pattern);
          if ((0, utils.e$)(config, "parent")) throw "The parent property is no longer supported.\nSee: https://github.com/SAP/chevrotain/issues/564#issuecomment-349062346 for details.";
          (0, utils.e$)(config, "categories") && (tokenType.CATEGORIES = config.categories);
          augmentTokenTypes([ tokenType ]), (0, utils.e$)(config, "label") && (tokenType.LABEL = config.label);
          (0, utils.e$)(config, "group") && (tokenType.GROUP = config.group);
          (0, utils.e$)(config, "pop_mode") && (tokenType.POP_MODE = config.pop_mode);
          (0, utils.e$)(config, "push_mode") && (tokenType.PUSH_MODE = config.push_mode);
          (0, utils.e$)(config, "longer_alt") && (tokenType.LONGER_ALT = config.longer_alt);
          (0, utils.e$)(config, "line_breaks") && (tokenType.LINE_BREAKS = config.line_breaks);
          (0, utils.e$)(config, "start_chars_hint") && (tokenType.START_CHARS_HINT = config.start_chars_hint);
          return tokenType;
        }(config);
      }
      var EOF = createToken({
        name: "EOF",
        pattern: Lexer.NA
      });
      function createTokenInstance(tokType, image, startOffset, endOffset, startLine, endLine, startColumn, endColumn) {
        return {
          image,
          startOffset,
          endOffset,
          startLine,
          endLine,
          startColumn,
          endColumn,
          tokenTypeIdx: tokType.tokenTypeIdx,
          tokenType: tokType
        };
      }
      function tokenMatcher(token, tokType) {
        return tokenStructuredMatcher(token, tokType);
      }
      augmentTokenTypes([ EOF ]);
      var gast_public_extends = function() {
        var extendStatics = function(d, b) {
          return extendStatics = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function(d, b) {
            d.__proto__ = b;
          } || function(d, b) {
            for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
          }, extendStatics(d, b);
        };
        return function(d, b) {
          function __() {
            this.constructor = d;
          }
          extendStatics(d, b), d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, 
          new __);
        };
      }(), AbstractProduction = function() {
        function AbstractProduction(_definition) {
          this._definition = _definition;
        }
        return Object.defineProperty(AbstractProduction.prototype, "definition", {
          get: function() {
            return this._definition;
          },
          set: function(value) {
            this._definition = value;
          },
          enumerable: !1,
          configurable: !0
        }), AbstractProduction.prototype.accept = function(visitor) {
          visitor.visit(this), (0, utils.Ed)(this.definition, (function(prod) {
            prod.accept(visitor);
          }));
        }, AbstractProduction;
      }(), NonTerminal = function(_super) {
        function NonTerminal(options) {
          var _this = _super.call(this, []) || this;
          return _this.idx = 1, (0, utils.f0)(_this, (0, utils.ei)(options, (function(v) {
            return void 0 !== v;
          }))), _this;
        }
        return gast_public_extends(NonTerminal, _super), Object.defineProperty(NonTerminal.prototype, "definition", {
          get: function() {
            return void 0 !== this.referencedRule ? this.referencedRule.definition : [];
          },
          set: function(definition) {},
          enumerable: !1,
          configurable: !0
        }), NonTerminal.prototype.accept = function(visitor) {
          visitor.visit(this);
        }, NonTerminal;
      }(AbstractProduction), Rule = function(_super) {
        function Rule(options) {
          var _this = _super.call(this, options.definition) || this;
          return _this.orgText = "", (0, utils.f0)(_this, (0, utils.ei)(options, (function(v) {
            return void 0 !== v;
          }))), _this;
        }
        return gast_public_extends(Rule, _super), Rule;
      }(AbstractProduction), Alternative = function(_super) {
        function Alternative(options) {
          var _this = _super.call(this, options.definition) || this;
          return _this.ignoreAmbiguities = !1, (0, utils.f0)(_this, (0, utils.ei)(options, (function(v) {
            return void 0 !== v;
          }))), _this;
        }
        return gast_public_extends(Alternative, _super), Alternative;
      }(AbstractProduction), Option = function(_super) {
        function Option(options) {
          var _this = _super.call(this, options.definition) || this;
          return _this.idx = 1, (0, utils.f0)(_this, (0, utils.ei)(options, (function(v) {
            return void 0 !== v;
          }))), _this;
        }
        return gast_public_extends(Option, _super), Option;
      }(AbstractProduction), RepetitionMandatory = function(_super) {
        function RepetitionMandatory(options) {
          var _this = _super.call(this, options.definition) || this;
          return _this.idx = 1, (0, utils.f0)(_this, (0, utils.ei)(options, (function(v) {
            return void 0 !== v;
          }))), _this;
        }
        return gast_public_extends(RepetitionMandatory, _super), RepetitionMandatory;
      }(AbstractProduction), RepetitionMandatoryWithSeparator = function(_super) {
        function RepetitionMandatoryWithSeparator(options) {
          var _this = _super.call(this, options.definition) || this;
          return _this.idx = 1, (0, utils.f0)(_this, (0, utils.ei)(options, (function(v) {
            return void 0 !== v;
          }))), _this;
        }
        return gast_public_extends(RepetitionMandatoryWithSeparator, _super), RepetitionMandatoryWithSeparator;
      }(AbstractProduction), Repetition = function(_super) {
        function Repetition(options) {
          var _this = _super.call(this, options.definition) || this;
          return _this.idx = 1, (0, utils.f0)(_this, (0, utils.ei)(options, (function(v) {
            return void 0 !== v;
          }))), _this;
        }
        return gast_public_extends(Repetition, _super), Repetition;
      }(AbstractProduction), RepetitionWithSeparator = function(_super) {
        function RepetitionWithSeparator(options) {
          var _this = _super.call(this, options.definition) || this;
          return _this.idx = 1, (0, utils.f0)(_this, (0, utils.ei)(options, (function(v) {
            return void 0 !== v;
          }))), _this;
        }
        return gast_public_extends(RepetitionWithSeparator, _super), RepetitionWithSeparator;
      }(AbstractProduction), Alternation = function(_super) {
        function Alternation(options) {
          var _this = _super.call(this, options.definition) || this;
          return _this.idx = 1, _this.ignoreAmbiguities = !1, _this.hasPredicates = !1, (0, 
          utils.f0)(_this, (0, utils.ei)(options, (function(v) {
            return void 0 !== v;
          }))), _this;
        }
        return gast_public_extends(Alternation, _super), Object.defineProperty(Alternation.prototype, "definition", {
          get: function() {
            return this._definition;
          },
          set: function(value) {
            this._definition = value;
          },
          enumerable: !1,
          configurable: !0
        }), Alternation;
      }(AbstractProduction), Terminal = function() {
        function Terminal(options) {
          this.idx = 1, (0, utils.f0)(this, (0, utils.ei)(options, (function(v) {
            return void 0 !== v;
          })));
        }
        return Terminal.prototype.accept = function(visitor) {
          visitor.visit(this);
        }, Terminal;
      }();
      function serializeGrammar(topRules) {
        return (0, utils.UI)(topRules, serializeProduction);
      }
      function serializeProduction(node) {
        function convertDefinition(definition) {
          return (0, utils.UI)(definition, serializeProduction);
        }
        if (node instanceof NonTerminal) return {
          type: "NonTerminal",
          name: node.nonTerminalName,
          idx: node.idx
        };
        if (node instanceof Alternative) return {
          type: "Alternative",
          definition: convertDefinition(node.definition)
        };
        if (node instanceof Option) return {
          type: "Option",
          idx: node.idx,
          definition: convertDefinition(node.definition)
        };
        if (node instanceof RepetitionMandatory) return {
          type: "RepetitionMandatory",
          idx: node.idx,
          definition: convertDefinition(node.definition)
        };
        if (node instanceof RepetitionMandatoryWithSeparator) return {
          type: "RepetitionMandatoryWithSeparator",
          idx: node.idx,
          separator: serializeProduction(new Terminal({
            terminalType: node.separator
          })),
          definition: convertDefinition(node.definition)
        };
        if (node instanceof RepetitionWithSeparator) return {
          type: "RepetitionWithSeparator",
          idx: node.idx,
          separator: serializeProduction(new Terminal({
            terminalType: node.separator
          })),
          definition: convertDefinition(node.definition)
        };
        if (node instanceof Repetition) return {
          type: "Repetition",
          idx: node.idx,
          definition: convertDefinition(node.definition)
        };
        if (node instanceof Alternation) return {
          type: "Alternation",
          idx: node.idx,
          definition: convertDefinition(node.definition)
        };
        if (node instanceof Terminal) {
          var serializedTerminal = {
            type: "Terminal",
            name: node.terminalType.name,
            label: tokenLabel(node.terminalType),
            idx: node.idx
          }, pattern = node.terminalType.PATTERN;
          return node.terminalType.PATTERN && (serializedTerminal.pattern = (0, utils.Kj)(pattern) ? pattern.source : pattern), 
          serializedTerminal;
        }
        if (node instanceof Rule) return {
          type: "Rule",
          name: node.name,
          orgText: node.orgText,
          definition: convertDefinition(node.definition)
        };
        throw Error("non exhaustive match");
      }
      var RestWalker = function() {
        function RestWalker() {}
        return RestWalker.prototype.walk = function(prod, prevRest) {
          var _this = this;
          void 0 === prevRest && (prevRest = []), (0, utils.Ed)(prod.definition, (function(subProd, index) {
            var currRest = (0, utils.Cw)(prod.definition, index + 1);
            if (subProd instanceof NonTerminal) _this.walkProdRef(subProd, currRest, prevRest); else if (subProd instanceof Terminal) _this.walkTerminal(subProd, currRest, prevRest); else if (subProd instanceof Alternative) _this.walkFlat(subProd, currRest, prevRest); else if (subProd instanceof Option) _this.walkOption(subProd, currRest, prevRest); else if (subProd instanceof RepetitionMandatory) _this.walkAtLeastOne(subProd, currRest, prevRest); else if (subProd instanceof RepetitionMandatoryWithSeparator) _this.walkAtLeastOneSep(subProd, currRest, prevRest); else if (subProd instanceof RepetitionWithSeparator) _this.walkManySep(subProd, currRest, prevRest); else if (subProd instanceof Repetition) _this.walkMany(subProd, currRest, prevRest); else {
              if (!(subProd instanceof Alternation)) throw Error("non exhaustive match");
              _this.walkOr(subProd, currRest, prevRest);
            }
          }));
        }, RestWalker.prototype.walkTerminal = function(terminal, currRest, prevRest) {}, 
        RestWalker.prototype.walkProdRef = function(refProd, currRest, prevRest) {}, RestWalker.prototype.walkFlat = function(flatProd, currRest, prevRest) {
          var fullOrRest = currRest.concat(prevRest);
          this.walk(flatProd, fullOrRest);
        }, RestWalker.prototype.walkOption = function(optionProd, currRest, prevRest) {
          var fullOrRest = currRest.concat(prevRest);
          this.walk(optionProd, fullOrRest);
        }, RestWalker.prototype.walkAtLeastOne = function(atLeastOneProd, currRest, prevRest) {
          var fullAtLeastOneRest = [ new Option({
            definition: atLeastOneProd.definition
          }) ].concat(currRest, prevRest);
          this.walk(atLeastOneProd, fullAtLeastOneRest);
        }, RestWalker.prototype.walkAtLeastOneSep = function(atLeastOneSepProd, currRest, prevRest) {
          var fullAtLeastOneSepRest = restForRepetitionWithSeparator(atLeastOneSepProd, currRest, prevRest);
          this.walk(atLeastOneSepProd, fullAtLeastOneSepRest);
        }, RestWalker.prototype.walkMany = function(manyProd, currRest, prevRest) {
          var fullManyRest = [ new Option({
            definition: manyProd.definition
          }) ].concat(currRest, prevRest);
          this.walk(manyProd, fullManyRest);
        }, RestWalker.prototype.walkManySep = function(manySepProd, currRest, prevRest) {
          var fullManySepRest = restForRepetitionWithSeparator(manySepProd, currRest, prevRest);
          this.walk(manySepProd, fullManySepRest);
        }, RestWalker.prototype.walkOr = function(orProd, currRest, prevRest) {
          var _this = this, fullOrRest = currRest.concat(prevRest);
          (0, utils.Ed)(orProd.definition, (function(alt) {
            var prodWrapper = new Alternative({
              definition: [ alt ]
            });
            _this.walk(prodWrapper, fullOrRest);
          }));
        }, RestWalker;
      }();
      function restForRepetitionWithSeparator(repSepProd, currRest, prevRest) {
        return [ new Option({
          definition: [ new Terminal({
            terminalType: repSepProd.separator
          }) ].concat(repSepProd.definition)
        }) ].concat(currRest, prevRest);
      }
      var GAstVisitor = function() {
        function GAstVisitor() {}
        return GAstVisitor.prototype.visit = function(node) {
          var nodeAny = node;
          switch (nodeAny.constructor) {
           case NonTerminal:
            return this.visitNonTerminal(nodeAny);

           case Alternative:
            return this.visitAlternative(nodeAny);

           case Option:
            return this.visitOption(nodeAny);

           case RepetitionMandatory:
            return this.visitRepetitionMandatory(nodeAny);

           case RepetitionMandatoryWithSeparator:
            return this.visitRepetitionMandatoryWithSeparator(nodeAny);

           case RepetitionWithSeparator:
            return this.visitRepetitionWithSeparator(nodeAny);

           case Repetition:
            return this.visitRepetition(nodeAny);

           case Alternation:
            return this.visitAlternation(nodeAny);

           case Terminal:
            return this.visitTerminal(nodeAny);

           case Rule:
            return this.visitRule(nodeAny);

           default:
            throw Error("non exhaustive match");
          }
        }, GAstVisitor.prototype.visitNonTerminal = function(node) {}, GAstVisitor.prototype.visitAlternative = function(node) {}, 
        GAstVisitor.prototype.visitOption = function(node) {}, GAstVisitor.prototype.visitRepetition = function(node) {}, 
        GAstVisitor.prototype.visitRepetitionMandatory = function(node) {}, GAstVisitor.prototype.visitRepetitionMandatoryWithSeparator = function(node) {}, 
        GAstVisitor.prototype.visitRepetitionWithSeparator = function(node) {}, GAstVisitor.prototype.visitAlternation = function(node) {}, 
        GAstVisitor.prototype.visitTerminal = function(node) {}, GAstVisitor.prototype.visitRule = function(node) {}, 
        GAstVisitor;
      }(), gast_extends = function() {
        var extendStatics = function(d, b) {
          return extendStatics = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function(d, b) {
            d.__proto__ = b;
          } || function(d, b) {
            for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
          }, extendStatics(d, b);
        };
        return function(d, b) {
          function __() {
            this.constructor = d;
          }
          extendStatics(d, b), d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, 
          new __);
        };
      }();
      function isOptionalProd(prod, alreadyVisited) {
        return void 0 === alreadyVisited && (alreadyVisited = []), !!(prod instanceof Option || prod instanceof Repetition || prod instanceof RepetitionWithSeparator) || (prod instanceof Alternation ? (0, 
        utils.G)(prod.definition, (function(subProd) {
          return isOptionalProd(subProd, alreadyVisited);
        })) : !(prod instanceof NonTerminal && (0, utils.r3)(alreadyVisited, prod)) && (prod instanceof AbstractProduction && (prod instanceof NonTerminal && alreadyVisited.push(prod), 
        (0, utils.yW)(prod.definition, (function(subProd) {
          return isOptionalProd(subProd, alreadyVisited);
        })))));
      }
      function getProductionDslName(prod) {
        if (prod instanceof NonTerminal) return "SUBRULE";
        if (prod instanceof Option) return "OPTION";
        if (prod instanceof Alternation) return "OR";
        if (prod instanceof RepetitionMandatory) return "AT_LEAST_ONE";
        if (prod instanceof RepetitionMandatoryWithSeparator) return "AT_LEAST_ONE_SEP";
        if (prod instanceof RepetitionWithSeparator) return "MANY_SEP";
        if (prod instanceof Repetition) return "MANY";
        if (prod instanceof Terminal) return "CONSUME";
        throw Error("non exhaustive match");
      }
      var DslMethodsCollectorVisitor = function(_super) {
        function DslMethodsCollectorVisitor() {
          var _this = null !== _super && _super.apply(this, arguments) || this;
          return _this.separator = "-", _this.dslMethods = {
            option: [],
            alternation: [],
            repetition: [],
            repetitionWithSeparator: [],
            repetitionMandatory: [],
            repetitionMandatoryWithSeparator: []
          }, _this;
        }
        return gast_extends(DslMethodsCollectorVisitor, _super), DslMethodsCollectorVisitor.prototype.reset = function() {
          this.dslMethods = {
            option: [],
            alternation: [],
            repetition: [],
            repetitionWithSeparator: [],
            repetitionMandatory: [],
            repetitionMandatoryWithSeparator: []
          };
        }, DslMethodsCollectorVisitor.prototype.visitTerminal = function(terminal) {
          var key = terminal.terminalType.name + this.separator + "Terminal";
          (0, utils.e$)(this.dslMethods, key) || (this.dslMethods[key] = []), this.dslMethods[key].push(terminal);
        }, DslMethodsCollectorVisitor.prototype.visitNonTerminal = function(subrule) {
          var key = subrule.nonTerminalName + this.separator + "Terminal";
          (0, utils.e$)(this.dslMethods, key) || (this.dslMethods[key] = []), this.dslMethods[key].push(subrule);
        }, DslMethodsCollectorVisitor.prototype.visitOption = function(option) {
          this.dslMethods.option.push(option);
        }, DslMethodsCollectorVisitor.prototype.visitRepetitionWithSeparator = function(manySep) {
          this.dslMethods.repetitionWithSeparator.push(manySep);
        }, DslMethodsCollectorVisitor.prototype.visitRepetitionMandatory = function(atLeastOne) {
          this.dslMethods.repetitionMandatory.push(atLeastOne);
        }, DslMethodsCollectorVisitor.prototype.visitRepetitionMandatoryWithSeparator = function(atLeastOneSep) {
          this.dslMethods.repetitionMandatoryWithSeparator.push(atLeastOneSep);
        }, DslMethodsCollectorVisitor.prototype.visitRepetition = function(many) {
          this.dslMethods.repetition.push(many);
        }, DslMethodsCollectorVisitor.prototype.visitAlternation = function(or) {
          this.dslMethods.alternation.push(or);
        }, DslMethodsCollectorVisitor;
      }(GAstVisitor), collectorVisitor = new DslMethodsCollectorVisitor;
      function first(prod) {
        if (prod instanceof NonTerminal) return first(prod.referencedRule);
        if (prod instanceof Terminal) return [ prod.terminalType ];
        if (function(prod) {
          return prod instanceof Alternative || prod instanceof Option || prod instanceof Repetition || prod instanceof RepetitionMandatory || prod instanceof RepetitionMandatoryWithSeparator || prod instanceof RepetitionWithSeparator || prod instanceof Terminal || prod instanceof Rule;
        }(prod)) return function(prod) {
          var currSubProd, firstSet = [], seq = prod.definition, nextSubProdIdx = 0, hasInnerProdsRemaining = seq.length > nextSubProdIdx, isLastInnerProdOptional = !0;
          for (;hasInnerProdsRemaining && isLastInnerProdOptional; ) isLastInnerProdOptional = isOptionalProd(currSubProd = seq[nextSubProdIdx]), 
          firstSet = firstSet.concat(first(currSubProd)), nextSubProdIdx += 1, hasInnerProdsRemaining = seq.length > nextSubProdIdx;
          return (0, utils.jj)(firstSet);
        }(prod);
        if (function(prod) {
          return prod instanceof Alternation;
        }(prod)) return function(prod) {
          var allAlternativesFirsts = (0, utils.UI)(prod.definition, (function(innerProd) {
            return first(innerProd);
          }));
          return (0, utils.jj)((0, utils.xH)(allAlternativesFirsts));
        }(prod);
        throw Error("non exhaustive match");
      }
      var follow_extends = function() {
        var extendStatics = function(d, b) {
          return extendStatics = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function(d, b) {
            d.__proto__ = b;
          } || function(d, b) {
            for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
          }, extendStatics(d, b);
        };
        return function(d, b) {
          function __() {
            this.constructor = d;
          }
          extendStatics(d, b), d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, 
          new __);
        };
      }(), ResyncFollowsWalker = function(_super) {
        function ResyncFollowsWalker(topProd) {
          var _this = _super.call(this) || this;
          return _this.topProd = topProd, _this.follows = {}, _this;
        }
        return follow_extends(ResyncFollowsWalker, _super), ResyncFollowsWalker.prototype.startWalking = function() {
          return this.walk(this.topProd), this.follows;
        }, ResyncFollowsWalker.prototype.walkTerminal = function(terminal, currRest, prevRest) {}, 
        ResyncFollowsWalker.prototype.walkProdRef = function(refProd, currRest, prevRest) {
          var inner, occurenceInParent, followName = (inner = refProd.referencedRule, occurenceInParent = refProd.idx, 
          inner.name + occurenceInParent + "_~IN~_" + this.topProd.name), fullRest = currRest.concat(prevRest), t_in_topProd_follows = first(new Alternative({
            definition: fullRest
          }));
          this.follows[followName] = t_in_topProd_follows;
        }, ResyncFollowsWalker;
      }(RestWalker);
      var defaultParserErrorProvider = {
        buildMismatchTokenMessage: function(_a) {
          var expected = _a.expected, actual = _a.actual;
          _a.previous, _a.ruleName;
          return "Expecting " + (hasTokenLabel(expected) ? "--\x3e " + tokenLabel(expected) + " <--" : "token of type --\x3e " + expected.name + " <--") + " but found --\x3e '" + actual.image + "' <--";
        },
        buildNotAllInputParsedMessage: function(_a) {
          var firstRedundant = _a.firstRedundant;
          _a.ruleName;
          return "Redundant input, expecting EOF but found: " + firstRedundant.image;
        },
        buildNoViableAltMessage: function(_a) {
          var expectedPathsPerAlt = _a.expectedPathsPerAlt, actual = _a.actual, customUserDescription = (_a.previous, 
          _a.customUserDescription), errSuffix = (_a.ruleName, "\nbut found: '" + (0, utils.Ps)(actual).image + "'");
          if (customUserDescription) return "Expecting: " + customUserDescription + errSuffix;
          var allLookAheadPaths = (0, utils.u4)(expectedPathsPerAlt, (function(result, currAltPaths) {
            return result.concat(currAltPaths);
          }), []), nextValidTokenSequences = (0, utils.UI)(allLookAheadPaths, (function(currPath) {
            return "[" + (0, utils.UI)(currPath, (function(currTokenType) {
              return tokenLabel(currTokenType);
            })).join(", ") + "]";
          }));
          return "Expecting: " + ("one of these possible Token sequences:\n" + (0, utils.UI)(nextValidTokenSequences, (function(itemMsg, idx) {
            return "  " + (idx + 1) + ". " + itemMsg;
          })).join("\n")) + errSuffix;
        },
        buildEarlyExitMessage: function(_a) {
          var expectedIterationPaths = _a.expectedIterationPaths, actual = _a.actual, customUserDescription = _a.customUserDescription, errSuffix = (_a.ruleName, 
          "\nbut found: '" + (0, utils.Ps)(actual).image + "'");
          return customUserDescription ? "Expecting: " + customUserDescription + errSuffix : "Expecting: " + ("expecting at least one iteration which starts with one of these possible Token sequences::\n  <" + (0, 
          utils.UI)(expectedIterationPaths, (function(currPath) {
            return "[" + (0, utils.UI)(currPath, (function(currTokenType) {
              return tokenLabel(currTokenType);
            })).join(",") + "]";
          })).join(" ,") + ">") + errSuffix;
        }
      };
      Object.freeze(defaultParserErrorProvider);
      var defaultGrammarResolverErrorProvider = {
        buildRuleNotFoundError: function(topLevelRule, undefinedRule) {
          return "Invalid grammar, reference to a rule which is not defined: ->" + undefinedRule.nonTerminalName + "<-\ninside top level rule: ->" + topLevelRule.name + "<-";
        }
      }, defaultGrammarValidatorErrorProvider = {
        buildDuplicateFoundError: function(topLevelRule, duplicateProds) {
          var prod, topLevelName = topLevelRule.name, duplicateProd = (0, utils.Ps)(duplicateProds), index = duplicateProd.idx, dslName = getProductionDslName(duplicateProd), extraArgument = (prod = duplicateProd) instanceof Terminal ? prod.terminalType.name : prod instanceof NonTerminal ? prod.nonTerminalName : "", msg = "->" + dslName + (index > 0 ? index : "") + "<- " + (extraArgument ? "with argument: ->" + extraArgument + "<-" : "") + "\n                  appears more than once (" + duplicateProds.length + " times) in the top level rule: ->" + topLevelName + "<-.                  \n                  For further details see: https://sap.github.io/chevrotain/docs/FAQ.html#NUMERICAL_SUFFIXES \n                  ";
          return msg = (msg = msg.replace(/[ \t]+/g, " ")).replace(/\s\s+/g, "\n");
        },
        buildNamespaceConflictError: function(rule) {
          return "Namespace conflict found in grammar.\nThe grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <" + rule.name + ">.\nTo resolve this make sure each Terminal and Non-Terminal names are unique\nThis is easy to accomplish by using the convention that Terminal names start with an uppercase letter\nand Non-Terminal names start with a lower case letter.";
        },
        buildAlternationPrefixAmbiguityError: function(options) {
          var pathMsg = (0, utils.UI)(options.prefixPath, (function(currTok) {
            return tokenLabel(currTok);
          })).join(", "), occurrence = 0 === options.alternation.idx ? "" : options.alternation.idx;
          return "Ambiguous alternatives: <" + options.ambiguityIndices.join(" ,") + "> due to common lookahead prefix\nin <OR" + occurrence + "> inside <" + options.topLevelRule.name + "> Rule,\n<" + pathMsg + "> may appears as a prefix path in all these alternatives.\nSee: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX\nFor Further details.";
        },
        buildAlternationAmbiguityError: function(options) {
          var pathMsg = (0, utils.UI)(options.prefixPath, (function(currtok) {
            return tokenLabel(currtok);
          })).join(", "), occurrence = 0 === options.alternation.idx ? "" : options.alternation.idx, currMessage = "Ambiguous Alternatives Detected: <" + options.ambiguityIndices.join(" ,") + "> in <OR" + occurrence + "> inside <" + options.topLevelRule.name + "> Rule,\n<" + pathMsg + "> may appears as a prefix path in all these alternatives.\n";
          return currMessage += "See: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES\nFor Further details.";
        },
        buildEmptyRepetitionError: function(options) {
          var dslName = getProductionDslName(options.repetition);
          return 0 !== options.repetition.idx && (dslName += options.repetition.idx), "The repetition <" + dslName + "> within Rule <" + options.topLevelRule.name + "> can never consume any tokens.\nThis could lead to an infinite loop.";
        },
        buildTokenNameError: function(options) {
          return "deprecated";
        },
        buildEmptyAlternationError: function(options) {
          return "Ambiguous empty alternative: <" + (options.emptyChoiceIdx + 1) + "> in <OR" + options.alternation.idx + "> inside <" + options.topLevelRule.name + "> Rule.\nOnly the last alternative may be an empty alternative.";
        },
        buildTooManyAlternativesError: function(options) {
          return "An Alternation cannot have more than 256 alternatives:\n<OR" + options.alternation.idx + "> inside <" + options.topLevelRule.name + "> Rule.\n has " + (options.alternation.definition.length + 1) + " alternatives.";
        },
        buildLeftRecursionError: function(options) {
          var ruleName = options.topLevelRule.name;
          return "Left Recursion found in grammar.\nrule: <" + ruleName + "> can be invoked from itself (directly or indirectly)\nwithout consuming any Tokens. The grammar path that causes this is: \n " + (ruleName + " --\x3e " + utils.UI(options.leftRecursionPath, (function(currRule) {
            return currRule.name;
          })).concat([ ruleName ]).join(" --\x3e ")) + "\n To fix this refactor your grammar to remove the left recursion.\nsee: https://en.wikipedia.org/wiki/LL_parser#Left_Factoring.";
        },
        buildInvalidRuleNameError: function(options) {
          return "deprecated";
        },
        buildDuplicateRuleNameError: function(options) {
          return "Duplicate definition, rule: ->" + (options.topLevelRule instanceof Rule ? options.topLevelRule.name : options.topLevelRule) + "<- is already defined in the grammar: ->" + options.grammarName + "<-";
        }
      }, resolver_extends = function() {
        var extendStatics = function(d, b) {
          return extendStatics = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function(d, b) {
            d.__proto__ = b;
          } || function(d, b) {
            for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
          }, extendStatics(d, b);
        };
        return function(d, b) {
          function __() {
            this.constructor = d;
          }
          extendStatics(d, b), d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, 
          new __);
        };
      }();
      var GastRefResolverVisitor = function(_super) {
        function GastRefResolverVisitor(nameToTopRule, errMsgProvider) {
          var _this = _super.call(this) || this;
          return _this.nameToTopRule = nameToTopRule, _this.errMsgProvider = errMsgProvider, 
          _this.errors = [], _this;
        }
        return resolver_extends(GastRefResolverVisitor, _super), GastRefResolverVisitor.prototype.resolveRefs = function() {
          var _this = this;
          (0, utils.Ed)((0, utils.VO)(this.nameToTopRule), (function(prod) {
            _this.currTopLevel = prod, prod.accept(_this);
          }));
        }, GastRefResolverVisitor.prototype.visitNonTerminal = function(node) {
          var ref = this.nameToTopRule[node.nonTerminalName];
          if (ref) node.referencedRule = ref; else {
            var msg = this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel, node);
            this.errors.push({
              message: msg,
              type: ParserDefinitionErrorType.UNRESOLVED_SUBRULE_REF,
              ruleName: this.currTopLevel.name,
              unresolvedRefName: node.nonTerminalName
            });
          }
        }, GastRefResolverVisitor;
      }(GAstVisitor), interpreter_extends = function() {
        var extendStatics = function(d, b) {
          return extendStatics = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function(d, b) {
            d.__proto__ = b;
          } || function(d, b) {
            for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
          }, extendStatics(d, b);
        };
        return function(d, b) {
          function __() {
            this.constructor = d;
          }
          extendStatics(d, b), d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, 
          new __);
        };
      }(), NextAfterTokenWalker = function(_super) {
        function NextAfterTokenWalker(topProd, path) {
          var _this = _super.call(this, topProd, path) || this;
          return _this.path = path, _this.nextTerminalName = "", _this.nextTerminalOccurrence = 0, 
          _this.nextTerminalName = _this.path.lastTok.name, _this.nextTerminalOccurrence = _this.path.lastTokOccurrence, 
          _this;
        }
        return interpreter_extends(NextAfterTokenWalker, _super), NextAfterTokenWalker.prototype.walkTerminal = function(terminal, currRest, prevRest) {
          if (this.isAtEndOfPath && terminal.terminalType.name === this.nextTerminalName && terminal.idx === this.nextTerminalOccurrence && !this.found) {
            var fullRest = currRest.concat(prevRest), restProd = new Alternative({
              definition: fullRest
            });
            this.possibleTokTypes = first(restProd), this.found = !0;
          }
        }, NextAfterTokenWalker;
      }(function(_super) {
        function AbstractNextPossibleTokensWalker(topProd, path) {
          var _this = _super.call(this) || this;
          return _this.topProd = topProd, _this.path = path, _this.possibleTokTypes = [], 
          _this.nextProductionName = "", _this.nextProductionOccurrence = 0, _this.found = !1, 
          _this.isAtEndOfPath = !1, _this;
        }
        return interpreter_extends(AbstractNextPossibleTokensWalker, _super), AbstractNextPossibleTokensWalker.prototype.startWalking = function() {
          if (this.found = !1, this.path.ruleStack[0] !== this.topProd.name) throw Error("The path does not start with the walker's top Rule!");
          return this.ruleStack = (0, utils.Qw)(this.path.ruleStack).reverse(), this.occurrenceStack = (0, 
          utils.Qw)(this.path.occurrenceStack).reverse(), this.ruleStack.pop(), this.occurrenceStack.pop(), 
          this.updateExpectedNext(), this.walk(this.topProd), this.possibleTokTypes;
        }, AbstractNextPossibleTokensWalker.prototype.walk = function(prod, prevRest) {
          void 0 === prevRest && (prevRest = []), this.found || _super.prototype.walk.call(this, prod, prevRest);
        }, AbstractNextPossibleTokensWalker.prototype.walkProdRef = function(refProd, currRest, prevRest) {
          if (refProd.referencedRule.name === this.nextProductionName && refProd.idx === this.nextProductionOccurrence) {
            var fullRest = currRest.concat(prevRest);
            this.updateExpectedNext(), this.walk(refProd.referencedRule, fullRest);
          }
        }, AbstractNextPossibleTokensWalker.prototype.updateExpectedNext = function() {
          (0, utils.xb)(this.ruleStack) ? (this.nextProductionName = "", this.nextProductionOccurrence = 0, 
          this.isAtEndOfPath = !0) : (this.nextProductionName = this.ruleStack.pop(), this.nextProductionOccurrence = this.occurrenceStack.pop());
        }, AbstractNextPossibleTokensWalker;
      }(RestWalker)), AbstractNextTerminalAfterProductionWalker = function(_super) {
        function AbstractNextTerminalAfterProductionWalker(topRule, occurrence) {
          var _this = _super.call(this) || this;
          return _this.topRule = topRule, _this.occurrence = occurrence, _this.result = {
            token: void 0,
            occurrence: void 0,
            isEndOfRule: void 0
          }, _this;
        }
        return interpreter_extends(AbstractNextTerminalAfterProductionWalker, _super), AbstractNextTerminalAfterProductionWalker.prototype.startWalking = function() {
          return this.walk(this.topRule), this.result;
        }, AbstractNextTerminalAfterProductionWalker;
      }(RestWalker), NextTerminalAfterManyWalker = function(_super) {
        function NextTerminalAfterManyWalker() {
          return null !== _super && _super.apply(this, arguments) || this;
        }
        return interpreter_extends(NextTerminalAfterManyWalker, _super), NextTerminalAfterManyWalker.prototype.walkMany = function(manyProd, currRest, prevRest) {
          if (manyProd.idx === this.occurrence) {
            var firstAfterMany = (0, utils.Ps)(currRest.concat(prevRest));
            this.result.isEndOfRule = void 0 === firstAfterMany, firstAfterMany instanceof Terminal && (this.result.token = firstAfterMany.terminalType, 
            this.result.occurrence = firstAfterMany.idx);
          } else _super.prototype.walkMany.call(this, manyProd, currRest, prevRest);
        }, NextTerminalAfterManyWalker;
      }(AbstractNextTerminalAfterProductionWalker), NextTerminalAfterManySepWalker = function(_super) {
        function NextTerminalAfterManySepWalker() {
          return null !== _super && _super.apply(this, arguments) || this;
        }
        return interpreter_extends(NextTerminalAfterManySepWalker, _super), NextTerminalAfterManySepWalker.prototype.walkManySep = function(manySepProd, currRest, prevRest) {
          if (manySepProd.idx === this.occurrence) {
            var firstAfterManySep = (0, utils.Ps)(currRest.concat(prevRest));
            this.result.isEndOfRule = void 0 === firstAfterManySep, firstAfterManySep instanceof Terminal && (this.result.token = firstAfterManySep.terminalType, 
            this.result.occurrence = firstAfterManySep.idx);
          } else _super.prototype.walkManySep.call(this, manySepProd, currRest, prevRest);
        }, NextTerminalAfterManySepWalker;
      }(AbstractNextTerminalAfterProductionWalker), NextTerminalAfterAtLeastOneWalker = function(_super) {
        function NextTerminalAfterAtLeastOneWalker() {
          return null !== _super && _super.apply(this, arguments) || this;
        }
        return interpreter_extends(NextTerminalAfterAtLeastOneWalker, _super), NextTerminalAfterAtLeastOneWalker.prototype.walkAtLeastOne = function(atLeastOneProd, currRest, prevRest) {
          if (atLeastOneProd.idx === this.occurrence) {
            var firstAfterAtLeastOne = (0, utils.Ps)(currRest.concat(prevRest));
            this.result.isEndOfRule = void 0 === firstAfterAtLeastOne, firstAfterAtLeastOne instanceof Terminal && (this.result.token = firstAfterAtLeastOne.terminalType, 
            this.result.occurrence = firstAfterAtLeastOne.idx);
          } else _super.prototype.walkAtLeastOne.call(this, atLeastOneProd, currRest, prevRest);
        }, NextTerminalAfterAtLeastOneWalker;
      }(AbstractNextTerminalAfterProductionWalker), NextTerminalAfterAtLeastOneSepWalker = function(_super) {
        function NextTerminalAfterAtLeastOneSepWalker() {
          return null !== _super && _super.apply(this, arguments) || this;
        }
        return interpreter_extends(NextTerminalAfterAtLeastOneSepWalker, _super), NextTerminalAfterAtLeastOneSepWalker.prototype.walkAtLeastOneSep = function(atleastOneSepProd, currRest, prevRest) {
          if (atleastOneSepProd.idx === this.occurrence) {
            var firstAfterfirstAfterAtLeastOneSep = (0, utils.Ps)(currRest.concat(prevRest));
            this.result.isEndOfRule = void 0 === firstAfterfirstAfterAtLeastOneSep, firstAfterfirstAfterAtLeastOneSep instanceof Terminal && (this.result.token = firstAfterfirstAfterAtLeastOneSep.terminalType, 
            this.result.occurrence = firstAfterfirstAfterAtLeastOneSep.idx);
          } else _super.prototype.walkAtLeastOneSep.call(this, atleastOneSepProd, currRest, prevRest);
        }, NextTerminalAfterAtLeastOneSepWalker;
      }(AbstractNextTerminalAfterProductionWalker);
      function possiblePathsFrom(targetDef, maxLength, currPath) {
        void 0 === currPath && (currPath = []), currPath = (0, utils.Qw)(currPath);
        var result = [], i = 0;
        function getAlternativesForProd(definition) {
          var alternatives = possiblePathsFrom(definition.concat((0, utils.Cw)(targetDef, i + 1)), maxLength, currPath);
          return result.concat(alternatives);
        }
        for (;currPath.length < maxLength && i < targetDef.length; ) {
          var prod = targetDef[i];
          if (prod instanceof Alternative) return getAlternativesForProd(prod.definition);
          if (prod instanceof NonTerminal) return getAlternativesForProd(prod.definition);
          if (prod instanceof Option) result = getAlternativesForProd(prod.definition); else {
            if (prod instanceof RepetitionMandatory) return getAlternativesForProd(newDef = prod.definition.concat([ new Repetition({
              definition: prod.definition
            }) ]));
            if (prod instanceof RepetitionMandatoryWithSeparator) return getAlternativesForProd(newDef = [ new Alternative({
              definition: prod.definition
            }), new Repetition({
              definition: [ new Terminal({
                terminalType: prod.separator
              }) ].concat(prod.definition)
            }) ]);
            if (prod instanceof RepetitionWithSeparator) {
              var newDef = prod.definition.concat([ new Repetition({
                definition: [ new Terminal({
                  terminalType: prod.separator
                }) ].concat(prod.definition)
              }) ]);
              result = getAlternativesForProd(newDef);
            } else if (prod instanceof Repetition) {
              newDef = prod.definition.concat([ new Repetition({
                definition: prod.definition
              }) ]);
              result = getAlternativesForProd(newDef);
            } else {
              if (prod instanceof Alternation) return (0, utils.Ed)(prod.definition, (function(currAlt) {
                !1 === (0, utils.xb)(currAlt.definition) && (result = getAlternativesForProd(currAlt.definition));
              })), result;
              if (!(prod instanceof Terminal)) throw Error("non exhaustive match");
              currPath.push(prod.terminalType);
            }
          }
          i++;
        }
        return result.push({
          partialPath: currPath,
          suffixDef: (0, utils.Cw)(targetDef, i)
        }), result;
      }
      function nextPossibleTokensAfter(initialDef, tokenVector, tokMatcher, maxLookAhead) {
        var EXIT_NON_TERMINAL_ARR = [ "EXIT_NONE_TERMINAL" ], foundCompletePath = !1, tokenVectorLength = tokenVector.length, minimalAlternativesIndex = tokenVectorLength - maxLookAhead - 1, result = [], possiblePaths = [];
        for (possiblePaths.push({
          idx: -1,
          def: initialDef,
          ruleStack: [],
          occurrenceStack: []
        }); !(0, utils.xb)(possiblePaths); ) {
          var currPath = possiblePaths.pop();
          if ("EXIT_ALTERNATIVE" !== currPath) {
            var currDef = currPath.def, currIdx = currPath.idx, currRuleStack = currPath.ruleStack, currOccurrenceStack = currPath.occurrenceStack;
            if (!(0, utils.xb)(currDef)) {
              var prod = currDef[0];
              if ("EXIT_NONE_TERMINAL" === prod) {
                var nextPath = {
                  idx: currIdx,
                  def: (0, utils.Cw)(currDef),
                  ruleStack: (0, utils.j7)(currRuleStack),
                  occurrenceStack: (0, utils.j7)(currOccurrenceStack)
                };
                possiblePaths.push(nextPath);
              } else if (prod instanceof Terminal) if (currIdx < tokenVectorLength - 1) {
                var nextIdx = currIdx + 1;
                if (tokMatcher(tokenVector[nextIdx], prod.terminalType)) {
                  nextPath = {
                    idx: nextIdx,
                    def: (0, utils.Cw)(currDef),
                    ruleStack: currRuleStack,
                    occurrenceStack: currOccurrenceStack
                  };
                  possiblePaths.push(nextPath);
                }
              } else {
                if (currIdx !== tokenVectorLength - 1) throw Error("non exhaustive match");
                result.push({
                  nextTokenType: prod.terminalType,
                  nextTokenOccurrence: prod.idx,
                  ruleStack: currRuleStack,
                  occurrenceStack: currOccurrenceStack
                }), foundCompletePath = !0;
              } else if (prod instanceof NonTerminal) {
                var newRuleStack = (0, utils.Qw)(currRuleStack);
                newRuleStack.push(prod.nonTerminalName);
                var newOccurrenceStack = (0, utils.Qw)(currOccurrenceStack);
                newOccurrenceStack.push(prod.idx);
                nextPath = {
                  idx: currIdx,
                  def: prod.definition.concat(EXIT_NON_TERMINAL_ARR, (0, utils.Cw)(currDef)),
                  ruleStack: newRuleStack,
                  occurrenceStack: newOccurrenceStack
                };
                possiblePaths.push(nextPath);
              } else if (prod instanceof Option) {
                var nextPathWithout = {
                  idx: currIdx,
                  def: (0, utils.Cw)(currDef),
                  ruleStack: currRuleStack,
                  occurrenceStack: currOccurrenceStack
                };
                possiblePaths.push(nextPathWithout), possiblePaths.push("EXIT_ALTERNATIVE");
                var nextPathWith = {
                  idx: currIdx,
                  def: prod.definition.concat((0, utils.Cw)(currDef)),
                  ruleStack: currRuleStack,
                  occurrenceStack: currOccurrenceStack
                };
                possiblePaths.push(nextPathWith);
              } else if (prod instanceof RepetitionMandatory) {
                var secondIteration = new Repetition({
                  definition: prod.definition,
                  idx: prod.idx
                });
                nextPath = {
                  idx: currIdx,
                  def: prod.definition.concat([ secondIteration ], (0, utils.Cw)(currDef)),
                  ruleStack: currRuleStack,
                  occurrenceStack: currOccurrenceStack
                };
                possiblePaths.push(nextPath);
              } else if (prod instanceof RepetitionMandatoryWithSeparator) {
                var separatorGast = new Terminal({
                  terminalType: prod.separator
                });
                secondIteration = new Repetition({
                  definition: [ separatorGast ].concat(prod.definition),
                  idx: prod.idx
                }), nextPath = {
                  idx: currIdx,
                  def: prod.definition.concat([ secondIteration ], (0, utils.Cw)(currDef)),
                  ruleStack: currRuleStack,
                  occurrenceStack: currOccurrenceStack
                };
                possiblePaths.push(nextPath);
              } else if (prod instanceof RepetitionWithSeparator) {
                nextPathWithout = {
                  idx: currIdx,
                  def: (0, utils.Cw)(currDef),
                  ruleStack: currRuleStack,
                  occurrenceStack: currOccurrenceStack
                };
                possiblePaths.push(nextPathWithout), possiblePaths.push("EXIT_ALTERNATIVE");
                separatorGast = new Terminal({
                  terminalType: prod.separator
                });
                var nthRepetition = new Repetition({
                  definition: [ separatorGast ].concat(prod.definition),
                  idx: prod.idx
                });
                nextPathWith = {
                  idx: currIdx,
                  def: prod.definition.concat([ nthRepetition ], (0, utils.Cw)(currDef)),
                  ruleStack: currRuleStack,
                  occurrenceStack: currOccurrenceStack
                };
                possiblePaths.push(nextPathWith);
              } else if (prod instanceof Repetition) {
                nextPathWithout = {
                  idx: currIdx,
                  def: (0, utils.Cw)(currDef),
                  ruleStack: currRuleStack,
                  occurrenceStack: currOccurrenceStack
                };
                possiblePaths.push(nextPathWithout), possiblePaths.push("EXIT_ALTERNATIVE");
                nthRepetition = new Repetition({
                  definition: prod.definition,
                  idx: prod.idx
                }), nextPathWith = {
                  idx: currIdx,
                  def: prod.definition.concat([ nthRepetition ], (0, utils.Cw)(currDef)),
                  ruleStack: currRuleStack,
                  occurrenceStack: currOccurrenceStack
                };
                possiblePaths.push(nextPathWith);
              } else if (prod instanceof Alternation) for (var i = prod.definition.length - 1; i >= 0; i--) {
                var currAltPath = {
                  idx: currIdx,
                  def: prod.definition[i].definition.concat((0, utils.Cw)(currDef)),
                  ruleStack: currRuleStack,
                  occurrenceStack: currOccurrenceStack
                };
                possiblePaths.push(currAltPath), possiblePaths.push("EXIT_ALTERNATIVE");
              } else if (prod instanceof Alternative) possiblePaths.push({
                idx: currIdx,
                def: prod.definition.concat((0, utils.Cw)(currDef)),
                ruleStack: currRuleStack,
                occurrenceStack: currOccurrenceStack
              }); else {
                if (!(prod instanceof Rule)) throw Error("non exhaustive match");
                possiblePaths.push(expandTopLevelRule(prod, currIdx, currRuleStack, currOccurrenceStack));
              }
            }
          } else foundCompletePath && (0, utils.Z$)(possiblePaths).idx <= minimalAlternativesIndex && possiblePaths.pop();
        }
        return result;
      }
      function expandTopLevelRule(topRule, currIdx, currRuleStack, currOccurrenceStack) {
        var newRuleStack = (0, utils.Qw)(currRuleStack);
        newRuleStack.push(topRule.name);
        var newCurrOccurrenceStack = (0, utils.Qw)(currOccurrenceStack);
        return newCurrOccurrenceStack.push(1), {
          idx: currIdx,
          def: topRule.definition,
          ruleStack: newRuleStack,
          occurrenceStack: newCurrOccurrenceStack
        };
      }
      var PROD_TYPE, lookahead_extends = function() {
        var extendStatics = function(d, b) {
          return extendStatics = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function(d, b) {
            d.__proto__ = b;
          } || function(d, b) {
            for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
          }, extendStatics(d, b);
        };
        return function(d, b) {
          function __() {
            this.constructor = d;
          }
          extendStatics(d, b), d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, 
          new __);
        };
      }();
      !function(PROD_TYPE) {
        PROD_TYPE[PROD_TYPE.OPTION = 0] = "OPTION", PROD_TYPE[PROD_TYPE.REPETITION = 1] = "REPETITION", 
        PROD_TYPE[PROD_TYPE.REPETITION_MANDATORY = 2] = "REPETITION_MANDATORY", PROD_TYPE[PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR = 3] = "REPETITION_MANDATORY_WITH_SEPARATOR", 
        PROD_TYPE[PROD_TYPE.REPETITION_WITH_SEPARATOR = 4] = "REPETITION_WITH_SEPARATOR", 
        PROD_TYPE[PROD_TYPE.ALTERNATION = 5] = "ALTERNATION";
      }(PROD_TYPE || (PROD_TYPE = {}));
      var RestDefinitionFinderWalker = function(_super) {
        function RestDefinitionFinderWalker(topProd, targetOccurrence, targetProdType) {
          var _this = _super.call(this) || this;
          return _this.topProd = topProd, _this.targetOccurrence = targetOccurrence, _this.targetProdType = targetProdType, 
          _this;
        }
        return lookahead_extends(RestDefinitionFinderWalker, _super), RestDefinitionFinderWalker.prototype.startWalking = function() {
          return this.walk(this.topProd), this.restDef;
        }, RestDefinitionFinderWalker.prototype.checkIsTarget = function(node, expectedProdType, currRest, prevRest) {
          return node.idx === this.targetOccurrence && this.targetProdType === expectedProdType && (this.restDef = currRest.concat(prevRest), 
          !0);
        }, RestDefinitionFinderWalker.prototype.walkOption = function(optionProd, currRest, prevRest) {
          this.checkIsTarget(optionProd, PROD_TYPE.OPTION, currRest, prevRest) || _super.prototype.walkOption.call(this, optionProd, currRest, prevRest);
        }, RestDefinitionFinderWalker.prototype.walkAtLeastOne = function(atLeastOneProd, currRest, prevRest) {
          this.checkIsTarget(atLeastOneProd, PROD_TYPE.REPETITION_MANDATORY, currRest, prevRest) || _super.prototype.walkOption.call(this, atLeastOneProd, currRest, prevRest);
        }, RestDefinitionFinderWalker.prototype.walkAtLeastOneSep = function(atLeastOneSepProd, currRest, prevRest) {
          this.checkIsTarget(atLeastOneSepProd, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, currRest, prevRest) || _super.prototype.walkOption.call(this, atLeastOneSepProd, currRest, prevRest);
        }, RestDefinitionFinderWalker.prototype.walkMany = function(manyProd, currRest, prevRest) {
          this.checkIsTarget(manyProd, PROD_TYPE.REPETITION, currRest, prevRest) || _super.prototype.walkOption.call(this, manyProd, currRest, prevRest);
        }, RestDefinitionFinderWalker.prototype.walkManySep = function(manySepProd, currRest, prevRest) {
          this.checkIsTarget(manySepProd, PROD_TYPE.REPETITION_WITH_SEPARATOR, currRest, prevRest) || _super.prototype.walkOption.call(this, manySepProd, currRest, prevRest);
        }, RestDefinitionFinderWalker;
      }(RestWalker), InsideDefinitionFinderVisitor = function(_super) {
        function InsideDefinitionFinderVisitor(targetOccurrence, targetProdType, targetRef) {
          var _this = _super.call(this) || this;
          return _this.targetOccurrence = targetOccurrence, _this.targetProdType = targetProdType, 
          _this.targetRef = targetRef, _this.result = [], _this;
        }
        return lookahead_extends(InsideDefinitionFinderVisitor, _super), InsideDefinitionFinderVisitor.prototype.checkIsTarget = function(node, expectedProdName) {
          node.idx !== this.targetOccurrence || this.targetProdType !== expectedProdName || void 0 !== this.targetRef && node !== this.targetRef || (this.result = node.definition);
        }, InsideDefinitionFinderVisitor.prototype.visitOption = function(node) {
          this.checkIsTarget(node, PROD_TYPE.OPTION);
        }, InsideDefinitionFinderVisitor.prototype.visitRepetition = function(node) {
          this.checkIsTarget(node, PROD_TYPE.REPETITION);
        }, InsideDefinitionFinderVisitor.prototype.visitRepetitionMandatory = function(node) {
          this.checkIsTarget(node, PROD_TYPE.REPETITION_MANDATORY);
        }, InsideDefinitionFinderVisitor.prototype.visitRepetitionMandatoryWithSeparator = function(node) {
          this.checkIsTarget(node, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR);
        }, InsideDefinitionFinderVisitor.prototype.visitRepetitionWithSeparator = function(node) {
          this.checkIsTarget(node, PROD_TYPE.REPETITION_WITH_SEPARATOR);
        }, InsideDefinitionFinderVisitor.prototype.visitAlternation = function(node) {
          this.checkIsTarget(node, PROD_TYPE.ALTERNATION);
        }, InsideDefinitionFinderVisitor;
      }(GAstVisitor);
      function initializeArrayOfArrays(size) {
        for (var result = new Array(size), i = 0; i < size; i++) result[i] = [];
        return result;
      }
      function pathToHashKeys(path) {
        for (var keys = [ "" ], i = 0; i < path.length; i++) {
          for (var tokType = path[i], longerKeys = [], j = 0; j < keys.length; j++) {
            var currShorterKey = keys[j];
            longerKeys.push(currShorterKey + "_" + tokType.tokenTypeIdx);
            for (var t = 0; t < tokType.categoryMatches.length; t++) {
              var categoriesKeySuffix = "_" + tokType.categoryMatches[t];
              longerKeys.push(currShorterKey + categoriesKeySuffix);
            }
          }
          keys = longerKeys;
        }
        return keys;
      }
      function isUniquePrefixHash(altKnownPathsKeys, searchPathKeys, idx) {
        for (var currAltIdx = 0; currAltIdx < altKnownPathsKeys.length; currAltIdx++) if (currAltIdx !== idx) for (var otherAltKnownPathsKeys = altKnownPathsKeys[currAltIdx], searchIdx = 0; searchIdx < searchPathKeys.length; searchIdx++) {
          if (!0 === otherAltKnownPathsKeys[searchPathKeys[searchIdx]]) return !1;
        }
        return !0;
      }
      function lookAheadSequenceFromAlternatives(altsDefs, k) {
        for (var partialAlts = (0, utils.UI)(altsDefs, (function(currAlt) {
          return possiblePathsFrom([ currAlt ], 1);
        })), finalResult = initializeArrayOfArrays(partialAlts.length), altsHashes = (0, 
        utils.UI)(partialAlts, (function(currAltPaths) {
          var dict = {};
          return (0, utils.Ed)(currAltPaths, (function(item) {
            var keys = pathToHashKeys(item.partialPath);
            (0, utils.Ed)(keys, (function(currKey) {
              dict[currKey] = !0;
            }));
          })), dict;
        })), newData = partialAlts, pathLength = 1; pathLength <= k; pathLength++) {
          var currDataset = newData;
          newData = initializeArrayOfArrays(currDataset.length);
          for (var _loop_1 = function(altIdx) {
            for (var currAltPathsAndSuffixes = currDataset[altIdx], currPathIdx = 0; currPathIdx < currAltPathsAndSuffixes.length; currPathIdx++) {
              var currPathPrefix = currAltPathsAndSuffixes[currPathIdx].partialPath, suffixDef = currAltPathsAndSuffixes[currPathIdx].suffixDef, prefixKeys = pathToHashKeys(currPathPrefix);
              if (isUniquePrefixHash(altsHashes, prefixKeys, altIdx) || (0, utils.xb)(suffixDef) || currPathPrefix.length === k) {
                var currAltResult = finalResult[altIdx];
                if (!1 === containsPath(currAltResult, currPathPrefix)) {
                  currAltResult.push(currPathPrefix);
                  for (var j = 0; j < prefixKeys.length; j++) {
                    var currKey = prefixKeys[j];
                    altsHashes[altIdx][currKey] = !0;
                  }
                }
              } else {
                var newPartialPathsAndSuffixes = possiblePathsFrom(suffixDef, pathLength + 1, currPathPrefix);
                newData[altIdx] = newData[altIdx].concat(newPartialPathsAndSuffixes), (0, utils.Ed)(newPartialPathsAndSuffixes, (function(item) {
                  var prefixKeys = pathToHashKeys(item.partialPath);
                  (0, utils.Ed)(prefixKeys, (function(key) {
                    altsHashes[altIdx][key] = !0;
                  }));
                }));
              }
            }
          }, altIdx = 0; altIdx < currDataset.length; altIdx++) _loop_1(altIdx);
        }
        return finalResult;
      }
      function getLookaheadPathsForOr(occurrence, ruleGrammar, k, orProd) {
        var visitor = new InsideDefinitionFinderVisitor(occurrence, PROD_TYPE.ALTERNATION, orProd);
        return ruleGrammar.accept(visitor), lookAheadSequenceFromAlternatives(visitor.result, k);
      }
      function getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, k) {
        var insideDefVisitor = new InsideDefinitionFinderVisitor(occurrence, prodType);
        ruleGrammar.accept(insideDefVisitor);
        var insideDef = insideDefVisitor.result, afterDef = new RestDefinitionFinderWalker(ruleGrammar, occurrence, prodType).startWalking();
        return lookAheadSequenceFromAlternatives([ new Alternative({
          definition: insideDef
        }), new Alternative({
          definition: afterDef
        }) ], k);
      }
      function containsPath(alternative, searchPath) {
        compareOtherPath: for (var i = 0; i < alternative.length; i++) {
          var otherPath = alternative[i];
          if (otherPath.length === searchPath.length) {
            for (var j = 0; j < otherPath.length; j++) {
              var searchTok = searchPath[j], otherTok = otherPath[j];
              if (!1 === (searchTok === otherTok || void 0 !== otherTok.categoryMatchesMap[searchTok.tokenTypeIdx])) continue compareOtherPath;
            }
            return !0;
          }
        }
        return !1;
      }
      function areTokenCategoriesNotUsed(lookAheadPaths) {
        return (0, utils.yW)(lookAheadPaths, (function(singleAltPaths) {
          return (0, utils.yW)(singleAltPaths, (function(singlePath) {
            return (0, utils.yW)(singlePath, (function(token) {
              return (0, utils.xb)(token.categoryMatches);
            }));
          }));
        }));
      }
      var checks_extends = function() {
        var extendStatics = function(d, b) {
          return extendStatics = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function(d, b) {
            d.__proto__ = b;
          } || function(d, b) {
            for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
          }, extendStatics(d, b);
        };
        return function(d, b) {
          function __() {
            this.constructor = d;
          }
          extendStatics(d, b), d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, 
          new __);
        };
      }();
      function validateGrammar(topLevels, globalMaxLookahead, tokenTypes, errMsgProvider, grammarName) {
        var duplicateErrors = utils.UI(topLevels, (function(currTopLevel) {
          return function(topLevelRule, errMsgProvider) {
            var collectorVisitor = new OccurrenceValidationCollector;
            topLevelRule.accept(collectorVisitor);
            var allRuleProductions = collectorVisitor.allProductions, productionGroups = utils.vM(allRuleProductions, identifyProductionForDuplicates), duplicates = utils.ei(productionGroups, (function(currGroup) {
              return currGroup.length > 1;
            }));
            return utils.UI(utils.VO(duplicates), (function(currDuplicates) {
              var firstProd = utils.Ps(currDuplicates), msg = errMsgProvider.buildDuplicateFoundError(topLevelRule, currDuplicates), dslName = getProductionDslName(firstProd), defError = {
                message: msg,
                type: ParserDefinitionErrorType.DUPLICATE_PRODUCTIONS,
                ruleName: topLevelRule.name,
                dslName,
                occurrence: firstProd.idx
              }, param = getExtraProductionArgument(firstProd);
              return param && (defError.parameter = param), defError;
            }));
          }(currTopLevel, errMsgProvider);
        })), leftRecursionErrors = utils.UI(topLevels, (function(currTopRule) {
          return validateNoLeftRecursion(currTopRule, currTopRule, errMsgProvider);
        })), emptyAltErrors = [], ambiguousAltsErrors = [], emptyRepetitionErrors = [];
        (0, utils.yW)(leftRecursionErrors, utils.xb) && (emptyAltErrors = (0, utils.UI)(topLevels, (function(currTopRule) {
          return function(topLevelRule, errMsgProvider) {
            var orCollector = new OrCollector;
            topLevelRule.accept(orCollector);
            var ors = orCollector.alternations;
            return utils.u4(ors, (function(errors, currOr) {
              var exceptLast = utils.j7(currOr.definition), currErrors = utils.UI(exceptLast, (function(currAlternative, currAltIdx) {
                var possibleFirstInAlt = nextPossibleTokensAfter([ currAlternative ], [], null, 1);
                return utils.xb(possibleFirstInAlt) ? {
                  message: errMsgProvider.buildEmptyAlternationError({
                    topLevelRule,
                    alternation: currOr,
                    emptyChoiceIdx: currAltIdx
                  }),
                  type: ParserDefinitionErrorType.NONE_LAST_EMPTY_ALT,
                  ruleName: topLevelRule.name,
                  occurrence: currOr.idx,
                  alternative: currAltIdx + 1
                } : null;
              }));
              return errors.concat(utils.oA(currErrors));
            }), []);
          }(currTopRule, errMsgProvider);
        })), ambiguousAltsErrors = (0, utils.UI)(topLevels, (function(currTopRule) {
          return function(topLevelRule, globalMaxLookahead, errMsgProvider) {
            var orCollector = new OrCollector;
            topLevelRule.accept(orCollector);
            var ors = orCollector.alternations;
            return ors = (0, utils.d1)(ors, (function(currOr) {
              return !0 === currOr.ignoreAmbiguities;
            })), utils.u4(ors, (function(result, currOr) {
              var currOccurrence = currOr.idx, actualMaxLookahead = currOr.maxLookahead || globalMaxLookahead, alternatives = getLookaheadPathsForOr(currOccurrence, topLevelRule, actualMaxLookahead, currOr), altsAmbiguityErrors = function(alternatives, alternation, rule, errMsgProvider) {
                var foundAmbiguousPaths = [], identicalAmbiguities = (0, utils.u4)(alternatives, (function(result, currAlt, currAltIdx) {
                  return !0 === alternation.definition[currAltIdx].ignoreAmbiguities || (0, utils.Ed)(currAlt, (function(currPath) {
                    var altsCurrPathAppearsIn = [ currAltIdx ];
                    (0, utils.Ed)(alternatives, (function(currOtherAlt, currOtherAltIdx) {
                      currAltIdx !== currOtherAltIdx && containsPath(currOtherAlt, currPath) && !0 !== alternation.definition[currOtherAltIdx].ignoreAmbiguities && altsCurrPathAppearsIn.push(currOtherAltIdx);
                    })), altsCurrPathAppearsIn.length > 1 && !containsPath(foundAmbiguousPaths, currPath) && (foundAmbiguousPaths.push(currPath), 
                    result.push({
                      alts: altsCurrPathAppearsIn,
                      path: currPath
                    }));
                  })), result;
                }), []);
                return utils.UI(identicalAmbiguities, (function(currAmbDescriptor) {
                  var ambgIndices = (0, utils.UI)(currAmbDescriptor.alts, (function(currAltIdx) {
                    return currAltIdx + 1;
                  }));
                  return {
                    message: errMsgProvider.buildAlternationAmbiguityError({
                      topLevelRule: rule,
                      alternation,
                      ambiguityIndices: ambgIndices,
                      prefixPath: currAmbDescriptor.path
                    }),
                    type: ParserDefinitionErrorType.AMBIGUOUS_ALTS,
                    ruleName: rule.name,
                    occurrence: alternation.idx,
                    alternatives: [ currAmbDescriptor.alts ]
                  };
                }));
              }(alternatives, currOr, topLevelRule, errMsgProvider), altsPrefixAmbiguityErrors = function(alternatives, alternation, rule, errMsgProvider) {
                var errors = [], pathsAndIndices = (0, utils.u4)(alternatives, (function(result, currAlt, idx) {
                  var currPathsAndIdx = (0, utils.UI)(currAlt, (function(currPath) {
                    return {
                      idx,
                      path: currPath
                    };
                  }));
                  return result.concat(currPathsAndIdx);
                }), []);
                return (0, utils.Ed)(pathsAndIndices, (function(currPathAndIdx) {
                  if (!0 !== alternation.definition[currPathAndIdx.idx].ignoreAmbiguities) {
                    var targetIdx = currPathAndIdx.idx, targetPath = currPathAndIdx.path, prefixAmbiguitiesPathsAndIndices = (0, 
                    utils.Oq)(pathsAndIndices, (function(searchPathAndIdx) {
                      return !0 !== alternation.definition[searchPathAndIdx.idx].ignoreAmbiguities && searchPathAndIdx.idx < targetIdx && (prefix = searchPathAndIdx.path, 
                      other = targetPath, prefix.length < other.length && (0, utils.yW)(prefix, (function(tokType, idx) {
                        var otherTokType = other[idx];
                        return tokType === otherTokType || otherTokType.categoryMatchesMap[tokType.tokenTypeIdx];
                      })));
                      var prefix, other;
                    })), currPathPrefixErrors = (0, utils.UI)(prefixAmbiguitiesPathsAndIndices, (function(currAmbPathAndIdx) {
                      var ambgIndices = [ currAmbPathAndIdx.idx + 1, targetIdx + 1 ], occurrence = 0 === alternation.idx ? "" : alternation.idx;
                      return {
                        message: errMsgProvider.buildAlternationPrefixAmbiguityError({
                          topLevelRule: rule,
                          alternation,
                          ambiguityIndices: ambgIndices,
                          prefixPath: currAmbPathAndIdx.path
                        }),
                        type: ParserDefinitionErrorType.AMBIGUOUS_PREFIX_ALTS,
                        ruleName: rule.name,
                        occurrence,
                        alternatives: ambgIndices
                      };
                    }));
                    errors = errors.concat(currPathPrefixErrors);
                  }
                })), errors;
              }(alternatives, currOr, topLevelRule, errMsgProvider);
              return result.concat(altsAmbiguityErrors, altsPrefixAmbiguityErrors);
            }), []);
          }(currTopRule, globalMaxLookahead, errMsgProvider);
        })), emptyRepetitionErrors = function(topLevelRules, maxLookahead, errMsgProvider) {
          var errors = [];
          return (0, utils.Ed)(topLevelRules, (function(currTopRule) {
            var collectorVisitor = new RepetionCollector;
            currTopRule.accept(collectorVisitor);
            var allRuleProductions = collectorVisitor.allProductions;
            (0, utils.Ed)(allRuleProductions, (function(currProd) {
              var prodType = function(prod) {
                if (prod instanceof Option) return PROD_TYPE.OPTION;
                if (prod instanceof Repetition) return PROD_TYPE.REPETITION;
                if (prod instanceof RepetitionMandatory) return PROD_TYPE.REPETITION_MANDATORY;
                if (prod instanceof RepetitionMandatoryWithSeparator) return PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR;
                if (prod instanceof RepetitionWithSeparator) return PROD_TYPE.REPETITION_WITH_SEPARATOR;
                if (prod instanceof Alternation) return PROD_TYPE.ALTERNATION;
                throw Error("non exhaustive match");
              }(currProd), actualMaxLookahead = currProd.maxLookahead || maxLookahead, pathsInsideProduction = getLookaheadPathsForOptionalProd(currProd.idx, currTopRule, prodType, actualMaxLookahead)[0];
              if ((0, utils.xb)((0, utils.xH)(pathsInsideProduction))) {
                var errMsg = errMsgProvider.buildEmptyRepetitionError({
                  topLevelRule: currTopRule,
                  repetition: currProd
                });
                errors.push({
                  message: errMsg,
                  type: ParserDefinitionErrorType.NO_NON_EMPTY_LOOKAHEAD,
                  ruleName: currTopRule.name
                });
              }
            }));
          })), errors;
        }(topLevels, globalMaxLookahead, errMsgProvider));
        var termsNamespaceConflictErrors = function(topLevels, tokenTypes, errMsgProvider) {
          var errors = [], tokenNames = (0, utils.UI)(tokenTypes, (function(currToken) {
            return currToken.name;
          }));
          return (0, utils.Ed)(topLevels, (function(currRule) {
            var currRuleName = currRule.name;
            if ((0, utils.r3)(tokenNames, currRuleName)) {
              var errMsg = errMsgProvider.buildNamespaceConflictError(currRule);
              errors.push({
                message: errMsg,
                type: ParserDefinitionErrorType.CONFLICT_TOKENS_RULES_NAMESPACE,
                ruleName: currRuleName
              });
            }
          })), errors;
        }(topLevels, tokenTypes, errMsgProvider), tooManyAltsErrors = (0, utils.UI)(topLevels, (function(curRule) {
          return function(topLevelRule, errMsgProvider) {
            var orCollector = new OrCollector;
            topLevelRule.accept(orCollector);
            var ors = orCollector.alternations;
            return utils.u4(ors, (function(errors, currOr) {
              return currOr.definition.length > 255 && errors.push({
                message: errMsgProvider.buildTooManyAlternativesError({
                  topLevelRule,
                  alternation: currOr
                }),
                type: ParserDefinitionErrorType.TOO_MANY_ALTS,
                ruleName: topLevelRule.name,
                occurrence: currOr.idx
              }), errors;
            }), []);
          }(curRule, errMsgProvider);
        })), duplicateRulesError = (0, utils.UI)(topLevels, (function(curRule) {
          return function(rule, allRules, className, errMsgProvider) {
            var errors = [], occurrences = (0, utils.u4)(allRules, (function(result, curRule) {
              return curRule.name === rule.name ? result + 1 : result;
            }), 0);
            if (occurrences > 1) {
              var errMsg = errMsgProvider.buildDuplicateRuleNameError({
                topLevelRule: rule,
                grammarName: className
              });
              errors.push({
                message: errMsg,
                type: ParserDefinitionErrorType.DUPLICATE_RULE_NAME,
                ruleName: rule.name
              });
            }
            return errors;
          }(curRule, topLevels, grammarName, errMsgProvider);
        }));
        return utils.xH(duplicateErrors.concat(emptyRepetitionErrors, leftRecursionErrors, emptyAltErrors, ambiguousAltsErrors, termsNamespaceConflictErrors, tooManyAltsErrors, duplicateRulesError));
      }
      function identifyProductionForDuplicates(prod) {
        return getProductionDslName(prod) + "_#_" + prod.idx + "_#_" + getExtraProductionArgument(prod);
      }
      function getExtraProductionArgument(prod) {
        return prod instanceof Terminal ? prod.terminalType.name : prod instanceof NonTerminal ? prod.nonTerminalName : "";
      }
      var OccurrenceValidationCollector = function(_super) {
        function OccurrenceValidationCollector() {
          var _this = null !== _super && _super.apply(this, arguments) || this;
          return _this.allProductions = [], _this;
        }
        return checks_extends(OccurrenceValidationCollector, _super), OccurrenceValidationCollector.prototype.visitNonTerminal = function(subrule) {
          this.allProductions.push(subrule);
        }, OccurrenceValidationCollector.prototype.visitOption = function(option) {
          this.allProductions.push(option);
        }, OccurrenceValidationCollector.prototype.visitRepetitionWithSeparator = function(manySep) {
          this.allProductions.push(manySep);
        }, OccurrenceValidationCollector.prototype.visitRepetitionMandatory = function(atLeastOne) {
          this.allProductions.push(atLeastOne);
        }, OccurrenceValidationCollector.prototype.visitRepetitionMandatoryWithSeparator = function(atLeastOneSep) {
          this.allProductions.push(atLeastOneSep);
        }, OccurrenceValidationCollector.prototype.visitRepetition = function(many) {
          this.allProductions.push(many);
        }, OccurrenceValidationCollector.prototype.visitAlternation = function(or) {
          this.allProductions.push(or);
        }, OccurrenceValidationCollector.prototype.visitTerminal = function(terminal) {
          this.allProductions.push(terminal);
        }, OccurrenceValidationCollector;
      }(GAstVisitor);
      function validateNoLeftRecursion(topRule, currRule, errMsgProvider, path) {
        void 0 === path && (path = []);
        var errors = [], nextNonTerminals = getFirstNoneTerminal(currRule.definition);
        if (utils.xb(nextNonTerminals)) return [];
        var ruleName = topRule.name;
        utils.r3(nextNonTerminals, topRule) && errors.push({
          message: errMsgProvider.buildLeftRecursionError({
            topLevelRule: topRule,
            leftRecursionPath: path
          }),
          type: ParserDefinitionErrorType.LEFT_RECURSION,
          ruleName
        });
        var validNextSteps = utils.e5(nextNonTerminals, path.concat([ topRule ])), errorsFromNextSteps = utils.UI(validNextSteps, (function(currRefRule) {
          var newPath = utils.Qw(path);
          return newPath.push(currRefRule), validateNoLeftRecursion(topRule, currRefRule, errMsgProvider, newPath);
        }));
        return errors.concat(utils.xH(errorsFromNextSteps));
      }
      function getFirstNoneTerminal(definition) {
        var result = [];
        if (utils.xb(definition)) return result;
        var firstProd = utils.Ps(definition);
        if (firstProd instanceof NonTerminal) result.push(firstProd.referencedRule); else if (firstProd instanceof Alternative || firstProd instanceof Option || firstProd instanceof RepetitionMandatory || firstProd instanceof RepetitionMandatoryWithSeparator || firstProd instanceof RepetitionWithSeparator || firstProd instanceof Repetition) result = result.concat(getFirstNoneTerminal(firstProd.definition)); else if (firstProd instanceof Alternation) result = utils.xH(utils.UI(firstProd.definition, (function(currSubDef) {
          return getFirstNoneTerminal(currSubDef.definition);
        }))); else if (!(firstProd instanceof Terminal)) throw Error("non exhaustive match");
        var isFirstOptional = isOptionalProd(firstProd), hasMore = definition.length > 1;
        if (isFirstOptional && hasMore) {
          var rest = utils.Cw(definition);
          return result.concat(getFirstNoneTerminal(rest));
        }
        return result;
      }
      var OrCollector = function(_super) {
        function OrCollector() {
          var _this = null !== _super && _super.apply(this, arguments) || this;
          return _this.alternations = [], _this;
        }
        return checks_extends(OrCollector, _super), OrCollector.prototype.visitAlternation = function(node) {
          this.alternations.push(node);
        }, OrCollector;
      }(GAstVisitor);
      var RepetionCollector = function(_super) {
        function RepetionCollector() {
          var _this = null !== _super && _super.apply(this, arguments) || this;
          return _this.allProductions = [], _this;
        }
        return checks_extends(RepetionCollector, _super), RepetionCollector.prototype.visitRepetitionWithSeparator = function(manySep) {
          this.allProductions.push(manySep);
        }, RepetionCollector.prototype.visitRepetitionMandatory = function(atLeastOne) {
          this.allProductions.push(atLeastOne);
        }, RepetionCollector.prototype.visitRepetitionMandatoryWithSeparator = function(atLeastOneSep) {
          this.allProductions.push(atLeastOneSep);
        }, RepetionCollector.prototype.visitRepetition = function(many) {
          this.allProductions.push(many);
        }, RepetionCollector;
      }(GAstVisitor);
      function gast_resolver_public_resolveGrammar(options) {
        options = (0, utils.ce)(options, {
          errMsgProvider: defaultGrammarResolverErrorProvider
        });
        var topLevels, errMsgProvider, refResolver, topRulesTable = {};
        return (0, utils.Ed)(options.rules, (function(rule) {
          topRulesTable[rule.name] = rule;
        })), topLevels = topRulesTable, errMsgProvider = options.errMsgProvider, (refResolver = new GastRefResolverVisitor(topLevels, errMsgProvider)).resolveRefs(), 
        refResolver.errors;
      }
      function gast_resolver_public_validateGrammar(options) {
        return validateGrammar((options = (0, utils.ce)(options, {
          errMsgProvider: defaultGrammarValidatorErrorProvider
        })).rules, options.maxLookahead, options.tokenTypes, options.errMsgProvider, options.grammarName);
      }
      function assignOccurrenceIndices(options) {
        (0, utils.Ed)(options.rules, (function(currRule) {
          var methodsCollector = new DslMethodsCollectorVisitor;
          currRule.accept(methodsCollector), (0, utils.Ed)(methodsCollector.dslMethods, (function(methods) {
            (0, utils.Ed)(methods, (function(currMethod, arrIdx) {
              currMethod.idx = arrIdx + 1;
            }));
          }));
        }));
      }
      var exceptions_public_extends = function() {
        var extendStatics = function(d, b) {
          return extendStatics = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function(d, b) {
            d.__proto__ = b;
          } || function(d, b) {
            for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
          }, extendStatics(d, b);
        };
        return function(d, b) {
          function __() {
            this.constructor = d;
          }
          extendStatics(d, b), d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, 
          new __);
        };
      }(), RECOGNITION_EXCEPTION_NAMES = [ "MismatchedTokenException", "NoViableAltException", "EarlyExitException", "NotAllInputParsedException" ];
      function isRecognitionException(error) {
        return (0, utils.r3)(RECOGNITION_EXCEPTION_NAMES, error.name);
      }
      Object.freeze(RECOGNITION_EXCEPTION_NAMES);
      var RecognitionException = function(_super) {
        function RecognitionException(message, token) {
          var _newTarget = this.constructor, _this = _super.call(this, message) || this;
          return _this.token = token, _this.resyncedTokens = [], Object.setPrototypeOf(_this, _newTarget.prototype), 
          Error.captureStackTrace && Error.captureStackTrace(_this, _this.constructor), _this;
        }
        return exceptions_public_extends(RecognitionException, _super), RecognitionException;
      }(Error), MismatchedTokenException = function(_super) {
        function MismatchedTokenException(message, token, previousToken) {
          var _this = _super.call(this, message, token) || this;
          return _this.previousToken = previousToken, _this.name = "MismatchedTokenException", 
          _this;
        }
        return exceptions_public_extends(MismatchedTokenException, _super), MismatchedTokenException;
      }(RecognitionException), NoViableAltException = function(_super) {
        function NoViableAltException(message, token, previousToken) {
          var _this = _super.call(this, message, token) || this;
          return _this.previousToken = previousToken, _this.name = "NoViableAltException", 
          _this;
        }
        return exceptions_public_extends(NoViableAltException, _super), NoViableAltException;
      }(RecognitionException), NotAllInputParsedException = function(_super) {
        function NotAllInputParsedException(message, token) {
          var _this = _super.call(this, message, token) || this;
          return _this.name = "NotAllInputParsedException", _this;
        }
        return exceptions_public_extends(NotAllInputParsedException, _super), NotAllInputParsedException;
      }(RecognitionException), EarlyExitException = function(_super) {
        function EarlyExitException(message, token, previousToken) {
          var _this = _super.call(this, message, token) || this;
          return _this.previousToken = previousToken, _this.name = "EarlyExitException", _this;
        }
        return exceptions_public_extends(EarlyExitException, _super), EarlyExitException;
      }(RecognitionException), EOF_FOLLOW_KEY = {};
      function InRuleRecoveryException(message) {
        this.name = "InRuleRecoveryException", this.message = message;
      }
      InRuleRecoveryException.prototype = Error.prototype;
      var Recoverable = function() {
        function Recoverable() {}
        return Recoverable.prototype.initRecoverable = function(config) {
          this.firstAfterRepMap = {}, this.resyncFollows = {}, this.recoveryEnabled = (0, 
          utils.e$)(config, "recoveryEnabled") ? config.recoveryEnabled : DEFAULT_PARSER_CONFIG.recoveryEnabled, 
          this.recoveryEnabled && (this.attemptInRepetitionRecovery = attemptInRepetitionRecovery);
        }, Recoverable.prototype.getTokenToInsert = function(tokType) {
          var tokToInsert = createTokenInstance(tokType, "", NaN, NaN, NaN, NaN, NaN, NaN);
          return tokToInsert.isInsertedInRecovery = !0, tokToInsert;
        }, Recoverable.prototype.canTokenTypeBeInsertedInRecovery = function(tokType) {
          return !0;
        }, Recoverable.prototype.tryInRepetitionRecovery = function(grammarRule, grammarRuleArgs, lookAheadFunc, expectedTokType) {
          for (var _this = this, reSyncTokType = this.findReSyncTokenType(), savedLexerState = this.exportLexerState(), resyncedTokens = [], passedResyncPoint = !1, nextTokenWithoutResync = this.LA(1), currToken = this.LA(1), generateErrorMessage = function() {
            var previousToken = _this.LA(0), msg = _this.errorMessageProvider.buildMismatchTokenMessage({
              expected: expectedTokType,
              actual: nextTokenWithoutResync,
              previous: previousToken,
              ruleName: _this.getCurrRuleFullName()
            }), error = new MismatchedTokenException(msg, nextTokenWithoutResync, _this.LA(0));
            error.resyncedTokens = (0, utils.j7)(resyncedTokens), _this.SAVE_ERROR(error);
          }; !passedResyncPoint; ) {
            if (this.tokenMatcher(currToken, expectedTokType)) return void generateErrorMessage();
            if (lookAheadFunc.call(this)) return generateErrorMessage(), void grammarRule.apply(this, grammarRuleArgs);
            this.tokenMatcher(currToken, reSyncTokType) ? passedResyncPoint = !0 : (currToken = this.SKIP_TOKEN(), 
            this.addToResyncTokens(currToken, resyncedTokens));
          }
          this.importLexerState(savedLexerState);
        }, Recoverable.prototype.shouldInRepetitionRecoveryBeTried = function(expectTokAfterLastMatch, nextTokIdx, notStuck) {
          return !1 !== notStuck && (void 0 !== expectTokAfterLastMatch && void 0 !== nextTokIdx && (!this.tokenMatcher(this.LA(1), expectTokAfterLastMatch) && (!this.isBackTracking() && !this.canPerformInRuleRecovery(expectTokAfterLastMatch, this.getFollowsForInRuleRecovery(expectTokAfterLastMatch, nextTokIdx)))));
        }, Recoverable.prototype.getFollowsForInRuleRecovery = function(tokType, tokIdxInRule) {
          var grammarPath = this.getCurrentGrammarPath(tokType, tokIdxInRule);
          return this.getNextPossibleTokenTypes(grammarPath);
        }, Recoverable.prototype.tryInRuleRecovery = function(expectedTokType, follows) {
          if (this.canRecoverWithSingleTokenInsertion(expectedTokType, follows)) return this.getTokenToInsert(expectedTokType);
          if (this.canRecoverWithSingleTokenDeletion(expectedTokType)) {
            var nextTok = this.SKIP_TOKEN();
            return this.consumeToken(), nextTok;
          }
          throw new InRuleRecoveryException("sad sad panda");
        }, Recoverable.prototype.canPerformInRuleRecovery = function(expectedToken, follows) {
          return this.canRecoverWithSingleTokenInsertion(expectedToken, follows) || this.canRecoverWithSingleTokenDeletion(expectedToken);
        }, Recoverable.prototype.canRecoverWithSingleTokenInsertion = function(expectedTokType, follows) {
          var _this = this;
          if (!this.canTokenTypeBeInsertedInRecovery(expectedTokType)) return !1;
          if ((0, utils.xb)(follows)) return !1;
          var mismatchedTok = this.LA(1);
          return void 0 !== (0, utils.sE)(follows, (function(possibleFollowsTokType) {
            return _this.tokenMatcher(mismatchedTok, possibleFollowsTokType);
          }));
        }, Recoverable.prototype.canRecoverWithSingleTokenDeletion = function(expectedTokType) {
          return this.tokenMatcher(this.LA(2), expectedTokType);
        }, Recoverable.prototype.isInCurrentRuleReSyncSet = function(tokenTypeIdx) {
          var followKey = this.getCurrFollowKey(), currentRuleReSyncSet = this.getFollowSetFromFollowKey(followKey);
          return (0, utils.r3)(currentRuleReSyncSet, tokenTypeIdx);
        }, Recoverable.prototype.findReSyncTokenType = function() {
          for (var allPossibleReSyncTokTypes = this.flattenFollowSet(), nextToken = this.LA(1), k = 2; ;) {
            var nextTokenType = nextToken.tokenType;
            if ((0, utils.r3)(allPossibleReSyncTokTypes, nextTokenType)) return nextTokenType;
            nextToken = this.LA(k), k++;
          }
        }, Recoverable.prototype.getCurrFollowKey = function() {
          if (1 === this.RULE_STACK.length) return EOF_FOLLOW_KEY;
          var currRuleShortName = this.getLastExplicitRuleShortName(), currRuleIdx = this.getLastExplicitRuleOccurrenceIndex(), prevRuleShortName = this.getPreviousExplicitRuleShortName();
          return {
            ruleName: this.shortRuleNameToFullName(currRuleShortName),
            idxInCallingRule: currRuleIdx,
            inRule: this.shortRuleNameToFullName(prevRuleShortName)
          };
        }, Recoverable.prototype.buildFullFollowKeyStack = function() {
          var _this = this, explicitRuleStack = this.RULE_STACK, explicitOccurrenceStack = this.RULE_OCCURRENCE_STACK;
          return (0, utils.UI)(explicitRuleStack, (function(ruleName, idx) {
            return 0 === idx ? EOF_FOLLOW_KEY : {
              ruleName: _this.shortRuleNameToFullName(ruleName),
              idxInCallingRule: explicitOccurrenceStack[idx],
              inRule: _this.shortRuleNameToFullName(explicitRuleStack[idx - 1])
            };
          }));
        }, Recoverable.prototype.flattenFollowSet = function() {
          var _this = this, followStack = (0, utils.UI)(this.buildFullFollowKeyStack(), (function(currKey) {
            return _this.getFollowSetFromFollowKey(currKey);
          }));
          return (0, utils.xH)(followStack);
        }, Recoverable.prototype.getFollowSetFromFollowKey = function(followKey) {
          if (followKey === EOF_FOLLOW_KEY) return [ EOF ];
          var followName = followKey.ruleName + followKey.idxInCallingRule + "_~IN~_" + followKey.inRule;
          return this.resyncFollows[followName];
        }, Recoverable.prototype.addToResyncTokens = function(token, resyncTokens) {
          return this.tokenMatcher(token, EOF) || resyncTokens.push(token), resyncTokens;
        }, Recoverable.prototype.reSyncTo = function(tokType) {
          for (var resyncedTokens = [], nextTok = this.LA(1); !1 === this.tokenMatcher(nextTok, tokType); ) nextTok = this.SKIP_TOKEN(), 
          this.addToResyncTokens(nextTok, resyncedTokens);
          return (0, utils.j7)(resyncedTokens);
        }, Recoverable.prototype.attemptInRepetitionRecovery = function(prodFunc, args, lookaheadFunc, dslMethodIdx, prodOccurrence, nextToksWalker, notStuck) {}, 
        Recoverable.prototype.getCurrentGrammarPath = function(tokType, tokIdxInRule) {
          return {
            ruleStack: this.getHumanReadableRuleStack(),
            occurrenceStack: (0, utils.Qw)(this.RULE_OCCURRENCE_STACK),
            lastTok: tokType,
            lastTokOccurrence: tokIdxInRule
          };
        }, Recoverable.prototype.getHumanReadableRuleStack = function() {
          var _this = this;
          return (0, utils.UI)(this.RULE_STACK, (function(currShortName) {
            return _this.shortRuleNameToFullName(currShortName);
          }));
        }, Recoverable;
      }();
      function attemptInRepetitionRecovery(prodFunc, args, lookaheadFunc, dslMethodIdx, prodOccurrence, nextToksWalker, notStuck) {
        var key = this.getKeyForAutomaticLookahead(dslMethodIdx, prodOccurrence), firstAfterRepInfo = this.firstAfterRepMap[key];
        if (void 0 === firstAfterRepInfo) {
          var currRuleName = this.getCurrRuleFullName();
          firstAfterRepInfo = new nextToksWalker(this.getGAstProductions()[currRuleName], prodOccurrence).startWalking(), 
          this.firstAfterRepMap[key] = firstAfterRepInfo;
        }
        var expectTokAfterLastMatch = firstAfterRepInfo.token, nextTokIdx = firstAfterRepInfo.occurrence, isEndOfRule = firstAfterRepInfo.isEndOfRule;
        1 === this.RULE_STACK.length && isEndOfRule && void 0 === expectTokAfterLastMatch && (expectTokAfterLastMatch = EOF, 
        nextTokIdx = 1), this.shouldInRepetitionRecoveryBeTried(expectTokAfterLastMatch, nextTokIdx, notStuck) && this.tryInRepetitionRecovery(prodFunc, args, lookaheadFunc, expectTokAfterLastMatch);
      }
      function getKeyForAutomaticLookahead(ruleIdx, dslMethodIdx, occurrence) {
        return occurrence | dslMethodIdx | ruleIdx;
      }
      var LooksAhead = function() {
        function LooksAhead() {}
        return LooksAhead.prototype.initLooksAhead = function(config) {
          this.dynamicTokensEnabled = (0, utils.e$)(config, "dynamicTokensEnabled") ? config.dynamicTokensEnabled : DEFAULT_PARSER_CONFIG.dynamicTokensEnabled, 
          this.maxLookahead = (0, utils.e$)(config, "maxLookahead") ? config.maxLookahead : DEFAULT_PARSER_CONFIG.maxLookahead, 
          this.lookAheadFuncsCache = (0, utils.dU)() ? new Map : [], (0, utils.dU)() ? (this.getLaFuncFromCache = this.getLaFuncFromMap, 
          this.setLaFuncCache = this.setLaFuncCacheUsingMap) : (this.getLaFuncFromCache = this.getLaFuncFromObj, 
          this.setLaFuncCache = this.setLaFuncUsingObj);
        }, LooksAhead.prototype.preComputeLookaheadFunctions = function(rules) {
          var _this = this;
          (0, utils.Ed)(rules, (function(currRule) {
            _this.TRACE_INIT(currRule.name + " Rule Lookahead", (function() {
              var _a = function(rule) {
                collectorVisitor.reset(), rule.accept(collectorVisitor);
                var dslMethods = collectorVisitor.dslMethods;
                return collectorVisitor.reset(), dslMethods;
              }(currRule), alternation = _a.alternation, repetition = _a.repetition, option = _a.option, repetitionMandatory = _a.repetitionMandatory, repetitionMandatoryWithSeparator = _a.repetitionMandatoryWithSeparator, repetitionWithSeparator = _a.repetitionWithSeparator;
              (0, utils.Ed)(alternation, (function(currProd) {
                var prodIdx = 0 === currProd.idx ? "" : currProd.idx;
                _this.TRACE_INIT("" + getProductionDslName(currProd) + prodIdx, (function() {
                  var occurrence, ruleGrammar, maxLookahead, hasPredicates, dynamicTokensEnabled, laFuncBuilder, lookAheadPaths, laFunc = (occurrence = currProd.idx, 
                  ruleGrammar = currRule, maxLookahead = currProd.maxLookahead || _this.maxLookahead, 
                  hasPredicates = currProd.hasPredicates, dynamicTokensEnabled = _this.dynamicTokensEnabled, 
                  laFuncBuilder = _this.lookAheadBuilderForAlternatives, lookAheadPaths = getLookaheadPathsForOr(occurrence, ruleGrammar, maxLookahead), 
                  laFuncBuilder(lookAheadPaths, hasPredicates, areTokenCategoriesNotUsed(lookAheadPaths) ? tokenStructuredMatcherNoCategories : tokenStructuredMatcher, dynamicTokensEnabled)), key = getKeyForAutomaticLookahead(_this.fullRuleNameToShort[currRule.name], 256, currProd.idx);
                  _this.setLaFuncCache(key, laFunc);
                }));
              })), (0, utils.Ed)(repetition, (function(currProd) {
                _this.computeLookaheadFunc(currRule, currProd.idx, 768, PROD_TYPE.REPETITION, currProd.maxLookahead, getProductionDslName(currProd));
              })), (0, utils.Ed)(option, (function(currProd) {
                _this.computeLookaheadFunc(currRule, currProd.idx, 512, PROD_TYPE.OPTION, currProd.maxLookahead, getProductionDslName(currProd));
              })), (0, utils.Ed)(repetitionMandatory, (function(currProd) {
                _this.computeLookaheadFunc(currRule, currProd.idx, 1024, PROD_TYPE.REPETITION_MANDATORY, currProd.maxLookahead, getProductionDslName(currProd));
              })), (0, utils.Ed)(repetitionMandatoryWithSeparator, (function(currProd) {
                _this.computeLookaheadFunc(currRule, currProd.idx, 1536, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, currProd.maxLookahead, getProductionDslName(currProd));
              })), (0, utils.Ed)(repetitionWithSeparator, (function(currProd) {
                _this.computeLookaheadFunc(currRule, currProd.idx, 1280, PROD_TYPE.REPETITION_WITH_SEPARATOR, currProd.maxLookahead, getProductionDslName(currProd));
              }));
            }));
          }));
        }, LooksAhead.prototype.computeLookaheadFunc = function(rule, prodOccurrence, prodKey, prodType, prodMaxLookahead, dslMethodName) {
          var _this = this;
          this.TRACE_INIT("" + dslMethodName + (0 === prodOccurrence ? "" : prodOccurrence), (function() {
            var laFunc = function(occurrence, ruleGrammar, k, dynamicTokensEnabled, prodType, lookaheadBuilder) {
              var lookAheadPaths = getLookaheadPathsForOptionalProd(occurrence, ruleGrammar, prodType, k), tokenMatcher = areTokenCategoriesNotUsed(lookAheadPaths) ? tokenStructuredMatcherNoCategories : tokenStructuredMatcher;
              return lookaheadBuilder(lookAheadPaths[0], tokenMatcher, dynamicTokensEnabled);
            }(prodOccurrence, rule, prodMaxLookahead || _this.maxLookahead, _this.dynamicTokensEnabled, prodType, _this.lookAheadBuilderForOptional), key = getKeyForAutomaticLookahead(_this.fullRuleNameToShort[rule.name], prodKey, prodOccurrence);
            _this.setLaFuncCache(key, laFunc);
          }));
        }, LooksAhead.prototype.lookAheadBuilderForOptional = function(alt, tokenMatcher, dynamicTokensEnabled) {
          return function(alt, tokenMatcher, dynamicTokensEnabled) {
            var areAllOneTokenLookahead = (0, utils.yW)(alt, (function(currPath) {
              return 1 === currPath.length;
            })), numOfPaths = alt.length;
            if (areAllOneTokenLookahead && !dynamicTokensEnabled) {
              var singleTokensTypes = (0, utils.xH)(alt);
              if (1 === singleTokensTypes.length && (0, utils.xb)(singleTokensTypes[0].categoryMatches)) {
                var expectedTokenUniqueKey_1 = singleTokensTypes[0].tokenTypeIdx;
                return function() {
                  return this.LA(1).tokenTypeIdx === expectedTokenUniqueKey_1;
                };
              }
              var choiceToAlt_2 = (0, utils.u4)(singleTokensTypes, (function(result, currTokType, idx) {
                return result[currTokType.tokenTypeIdx] = !0, (0, utils.Ed)(currTokType.categoryMatches, (function(currExtendingType) {
                  result[currExtendingType] = !0;
                })), result;
              }), []);
              return function() {
                var nextToken = this.LA(1);
                return !0 === choiceToAlt_2[nextToken.tokenTypeIdx];
              };
            }
            return function() {
              nextPath: for (var j = 0; j < numOfPaths; j++) {
                for (var currPath = alt[j], currPathLength = currPath.length, i = 0; i < currPathLength; i++) {
                  var nextToken = this.LA(i + 1);
                  if (!1 === tokenMatcher(nextToken, currPath[i])) continue nextPath;
                }
                return !0;
              }
              return !1;
            };
          }(alt, tokenMatcher, dynamicTokensEnabled);
        }, LooksAhead.prototype.lookAheadBuilderForAlternatives = function(alts, hasPredicates, tokenMatcher, dynamicTokensEnabled) {
          return function(alts, hasPredicates, tokenMatcher, dynamicTokensEnabled) {
            var numOfAlts = alts.length, areAllOneTokenLookahead = (0, utils.yW)(alts, (function(currAlt) {
              return (0, utils.yW)(currAlt, (function(currPath) {
                return 1 === currPath.length;
              }));
            }));
            if (hasPredicates) return function(orAlts) {
              for (var predicates = (0, utils.UI)(orAlts, (function(currAlt) {
                return currAlt.GATE;
              })), t = 0; t < numOfAlts; t++) {
                var currAlt = alts[t], currNumOfPaths = currAlt.length, currPredicate = predicates[t];
                if (void 0 === currPredicate || !1 !== currPredicate.call(this)) nextPath: for (var j = 0; j < currNumOfPaths; j++) {
                  for (var currPath = currAlt[j], currPathLength = currPath.length, i = 0; i < currPathLength; i++) {
                    var nextToken = this.LA(i + 1);
                    if (!1 === tokenMatcher(nextToken, currPath[i])) continue nextPath;
                  }
                  return t;
                }
              }
            };
            if (areAllOneTokenLookahead && !dynamicTokensEnabled) {
              var singleTokenAlts = (0, utils.UI)(alts, (function(currAlt) {
                return (0, utils.xH)(currAlt);
              })), choiceToAlt_1 = (0, utils.u4)(singleTokenAlts, (function(result, currAlt, idx) {
                return (0, utils.Ed)(currAlt, (function(currTokType) {
                  (0, utils.e$)(result, currTokType.tokenTypeIdx) || (result[currTokType.tokenTypeIdx] = idx), 
                  (0, utils.Ed)(currTokType.categoryMatches, (function(currExtendingType) {
                    (0, utils.e$)(result, currExtendingType) || (result[currExtendingType] = idx);
                  }));
                })), result;
              }), []);
              return function() {
                var nextToken = this.LA(1);
                return choiceToAlt_1[nextToken.tokenTypeIdx];
              };
            }
            return function() {
              for (var t = 0; t < numOfAlts; t++) {
                var currAlt = alts[t], currNumOfPaths = currAlt.length;
                nextPath: for (var j = 0; j < currNumOfPaths; j++) {
                  for (var currPath = currAlt[j], currPathLength = currPath.length, i = 0; i < currPathLength; i++) {
                    var nextToken = this.LA(i + 1);
                    if (!1 === tokenMatcher(nextToken, currPath[i])) continue nextPath;
                  }
                  return t;
                }
              }
            };
          }(alts, hasPredicates, tokenMatcher, dynamicTokensEnabled);
        }, LooksAhead.prototype.getKeyForAutomaticLookahead = function(dslMethodIdx, occurrence) {
          return getKeyForAutomaticLookahead(this.getLastExplicitRuleShortName(), dslMethodIdx, occurrence);
        }, LooksAhead.prototype.getLaFuncFromCache = function(key) {}, LooksAhead.prototype.getLaFuncFromMap = function(key) {
          return this.lookAheadFuncsCache.get(key);
        }, LooksAhead.prototype.getLaFuncFromObj = function(key) {
          return this.lookAheadFuncsCache[key];
        }, LooksAhead.prototype.setLaFuncCache = function(key, value) {}, LooksAhead.prototype.setLaFuncCacheUsingMap = function(key, value) {
          this.lookAheadFuncsCache.set(key, value);
        }, LooksAhead.prototype.setLaFuncUsingObj = function(key, value) {
          this.lookAheadFuncsCache[key] = value;
        }, LooksAhead;
      }();
      function setNodeLocationOnlyOffset(currNodeLocation, newLocationInfo) {
        !0 === isNaN(currNodeLocation.startOffset) ? (currNodeLocation.startOffset = newLocationInfo.startOffset, 
        currNodeLocation.endOffset = newLocationInfo.endOffset) : currNodeLocation.endOffset < newLocationInfo.endOffset == !0 && (currNodeLocation.endOffset = newLocationInfo.endOffset);
      }
      function setNodeLocationFull(currNodeLocation, newLocationInfo) {
        !0 === isNaN(currNodeLocation.startOffset) ? (currNodeLocation.startOffset = newLocationInfo.startOffset, 
        currNodeLocation.startColumn = newLocationInfo.startColumn, currNodeLocation.startLine = newLocationInfo.startLine, 
        currNodeLocation.endOffset = newLocationInfo.endOffset, currNodeLocation.endColumn = newLocationInfo.endColumn, 
        currNodeLocation.endLine = newLocationInfo.endLine) : currNodeLocation.endOffset < newLocationInfo.endOffset == !0 && (currNodeLocation.endOffset = newLocationInfo.endOffset, 
        currNodeLocation.endColumn = newLocationInfo.endColumn, currNodeLocation.endLine = newLocationInfo.endLine);
      }
      var CstVisitorDefinitionError;
      function functionName(func) {
        var existingNameProp = func.name;
        return existingNameProp || "anonymous";
      }
      function defineNameProp(obj, nameValue) {
        var namePropDescriptor = Object.getOwnPropertyDescriptor(obj, "name");
        return !(!(0, utils.o8)(namePropDescriptor) && !namePropDescriptor.configurable) && (Object.defineProperty(obj, "name", {
          enumerable: !1,
          configurable: !0,
          writable: !1,
          value: nameValue
        }), !0);
      }
      function defaultVisit(ctx, param) {
        for (var childrenNames = (0, utils.XP)(ctx), childrenNamesLength = childrenNames.length, i = 0; i < childrenNamesLength; i++) for (var currChildArray = ctx[childrenNames[i]], currChildArrayLength = currChildArray.length, j = 0; j < currChildArrayLength; j++) {
          var currChild = currChildArray[j];
          void 0 === currChild.tokenTypeIdx && this[currChild.name](currChild.children, param);
        }
      }
      function createBaseSemanticVisitorConstructor(grammarName, ruleNames) {
        var derivedConstructor = function() {};
        defineNameProp(derivedConstructor, grammarName + "BaseSemantics");
        var semanticProto = {
          visit: function(cstNode, param) {
            if ((0, utils.kJ)(cstNode) && (cstNode = cstNode[0]), !(0, utils.o8)(cstNode)) return this[cstNode.name](cstNode.children, param);
          },
          validateVisitor: function() {
            var semanticDefinitionErrors = function(visitorInstance, ruleNames) {
              var missingErrors = function(visitorInstance, ruleNames) {
                var errors = (0, utils.UI)(ruleNames, (function(currRuleName) {
                  if (!(0, utils.mf)(visitorInstance[currRuleName])) return {
                    msg: "Missing visitor method: <" + currRuleName + "> on " + functionName(visitorInstance.constructor) + " CST Visitor.",
                    type: CstVisitorDefinitionError.MISSING_METHOD,
                    methodName: currRuleName
                  };
                }));
                return (0, utils.oA)(errors);
              }(visitorInstance, ruleNames), redundantErrors = function(visitorInstance, ruleNames) {
                var errors = [];
                for (var prop in visitorInstance) !(0, utils.mf)(visitorInstance[prop]) || (0, utils.r3)(VALID_PROP_NAMES, prop) || (0, 
                utils.r3)(ruleNames, prop) || errors.push({
                  msg: "Redundant visitor method: <" + prop + "> on " + functionName(visitorInstance.constructor) + " CST Visitor\nThere is no Grammar Rule corresponding to this method's name.\n",
                  type: CstVisitorDefinitionError.REDUNDANT_METHOD,
                  methodName: prop
                });
                return errors;
              }(visitorInstance, ruleNames);
              return missingErrors.concat(redundantErrors);
            }(this, ruleNames);
            if (!(0, utils.xb)(semanticDefinitionErrors)) {
              var errorMessages = (0, utils.UI)(semanticDefinitionErrors, (function(currDefError) {
                return currDefError.msg;
              }));
              throw Error("Errors Detected in CST Visitor <" + functionName(this.constructor) + ">:\n\t" + errorMessages.join("\n\n").replace(/\n/g, "\n\t"));
            }
          }
        };
        return (derivedConstructor.prototype = semanticProto).constructor = derivedConstructor, 
        derivedConstructor._RULE_NAMES = ruleNames, derivedConstructor;
      }
      !function(CstVisitorDefinitionError) {
        CstVisitorDefinitionError[CstVisitorDefinitionError.REDUNDANT_METHOD = 0] = "REDUNDANT_METHOD", 
        CstVisitorDefinitionError[CstVisitorDefinitionError.MISSING_METHOD = 1] = "MISSING_METHOD";
      }(CstVisitorDefinitionError || (CstVisitorDefinitionError = {}));
      var VALID_PROP_NAMES = [ "constructor", "visit", "validateVisitor" ];
      var TreeBuilder = function() {
        function TreeBuilder() {}
        return TreeBuilder.prototype.initTreeBuilder = function(config) {
          if (this.CST_STACK = [], this.outputCst = config.outputCst, this.nodeLocationTracking = (0, 
          utils.e$)(config, "nodeLocationTracking") ? config.nodeLocationTracking : DEFAULT_PARSER_CONFIG.nodeLocationTracking, 
          this.outputCst) if (/full/i.test(this.nodeLocationTracking)) this.recoveryEnabled ? (this.setNodeLocationFromToken = setNodeLocationFull, 
          this.setNodeLocationFromNode = setNodeLocationFull, this.cstPostRule = utils.dG, 
          this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery) : (this.setNodeLocationFromToken = utils.dG, 
          this.setNodeLocationFromNode = utils.dG, this.cstPostRule = this.cstPostRuleFull, 
          this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular); else if (/onlyOffset/i.test(this.nodeLocationTracking)) this.recoveryEnabled ? (this.setNodeLocationFromToken = setNodeLocationOnlyOffset, 
          this.setNodeLocationFromNode = setNodeLocationOnlyOffset, this.cstPostRule = utils.dG, 
          this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery) : (this.setNodeLocationFromToken = utils.dG, 
          this.setNodeLocationFromNode = utils.dG, this.cstPostRule = this.cstPostRuleOnlyOffset, 
          this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular); else {
            if (!/none/i.test(this.nodeLocationTracking)) throw Error('Invalid <nodeLocationTracking> config option: "' + config.nodeLocationTracking + '"');
            this.setNodeLocationFromToken = utils.dG, this.setNodeLocationFromNode = utils.dG, 
            this.cstPostRule = utils.dG, this.setInitialNodeLocation = utils.dG;
          } else this.cstInvocationStateUpdate = utils.dG, this.cstFinallyStateUpdate = utils.dG, 
          this.cstPostTerminal = utils.dG, this.cstPostNonTerminal = utils.dG, this.cstPostRule = utils.dG;
        }, TreeBuilder.prototype.setInitialNodeLocationOnlyOffsetRecovery = function(cstNode) {
          cstNode.location = {
            startOffset: NaN,
            endOffset: NaN
          };
        }, TreeBuilder.prototype.setInitialNodeLocationOnlyOffsetRegular = function(cstNode) {
          cstNode.location = {
            startOffset: this.LA(1).startOffset,
            endOffset: NaN
          };
        }, TreeBuilder.prototype.setInitialNodeLocationFullRecovery = function(cstNode) {
          cstNode.location = {
            startOffset: NaN,
            startLine: NaN,
            startColumn: NaN,
            endOffset: NaN,
            endLine: NaN,
            endColumn: NaN
          };
        }, TreeBuilder.prototype.setInitialNodeLocationFullRegular = function(cstNode) {
          var nextToken = this.LA(1);
          cstNode.location = {
            startOffset: nextToken.startOffset,
            startLine: nextToken.startLine,
            startColumn: nextToken.startColumn,
            endOffset: NaN,
            endLine: NaN,
            endColumn: NaN
          };
        }, TreeBuilder.prototype.cstInvocationStateUpdate = function(fullRuleName, shortName) {
          var cstNode = {
            name: fullRuleName,
            children: {}
          };
          this.setInitialNodeLocation(cstNode), this.CST_STACK.push(cstNode);
        }, TreeBuilder.prototype.cstFinallyStateUpdate = function() {
          this.CST_STACK.pop();
        }, TreeBuilder.prototype.cstPostRuleFull = function(ruleCstNode) {
          var prevToken = this.LA(0), loc = ruleCstNode.location;
          loc.startOffset <= prevToken.startOffset == !0 ? (loc.endOffset = prevToken.endOffset, 
          loc.endLine = prevToken.endLine, loc.endColumn = prevToken.endColumn) : (loc.startOffset = NaN, 
          loc.startLine = NaN, loc.startColumn = NaN);
        }, TreeBuilder.prototype.cstPostRuleOnlyOffset = function(ruleCstNode) {
          var prevToken = this.LA(0), loc = ruleCstNode.location;
          loc.startOffset <= prevToken.startOffset == !0 ? loc.endOffset = prevToken.endOffset : loc.startOffset = NaN;
        }, TreeBuilder.prototype.cstPostTerminal = function(key, consumedToken) {
          var node, token, tokenTypeName, rootCst = this.CST_STACK[this.CST_STACK.length - 1];
          token = consumedToken, tokenTypeName = key, void 0 === (node = rootCst).children[tokenTypeName] ? node.children[tokenTypeName] = [ token ] : node.children[tokenTypeName].push(token), 
          this.setNodeLocationFromToken(rootCst.location, consumedToken);
        }, TreeBuilder.prototype.cstPostNonTerminal = function(ruleCstResult, ruleName) {
          var preCstNode = this.CST_STACK[this.CST_STACK.length - 1];
          !function(node, ruleName, ruleResult) {
            void 0 === node.children[ruleName] ? node.children[ruleName] = [ ruleResult ] : node.children[ruleName].push(ruleResult);
          }(preCstNode, ruleName, ruleCstResult), this.setNodeLocationFromNode(preCstNode.location, ruleCstResult.location);
        }, TreeBuilder.prototype.getBaseCstVisitorConstructor = function() {
          if ((0, utils.o8)(this.baseCstVisitorConstructor)) {
            var newBaseCstVisitorConstructor = createBaseSemanticVisitorConstructor(this.className, (0, 
            utils.XP)(this.gastProductionsCache));
            return this.baseCstVisitorConstructor = newBaseCstVisitorConstructor, newBaseCstVisitorConstructor;
          }
          return this.baseCstVisitorConstructor;
        }, TreeBuilder.prototype.getBaseCstVisitorConstructorWithDefaults = function() {
          if ((0, utils.o8)(this.baseCstVisitorWithDefaultsConstructor)) {
            var newConstructor = function(grammarName, ruleNames, baseConstructor) {
              var derivedConstructor = function() {};
              defineNameProp(derivedConstructor, grammarName + "BaseSemanticsWithDefaults");
              var withDefaultsProto = Object.create(baseConstructor.prototype);
              return (0, utils.Ed)(ruleNames, (function(ruleName) {
                withDefaultsProto[ruleName] = defaultVisit;
              })), (derivedConstructor.prototype = withDefaultsProto).constructor = derivedConstructor, 
              derivedConstructor;
            }(this.className, (0, utils.XP)(this.gastProductionsCache), this.getBaseCstVisitorConstructor());
            return this.baseCstVisitorWithDefaultsConstructor = newConstructor, newConstructor;
          }
          return this.baseCstVisitorWithDefaultsConstructor;
        }, TreeBuilder.prototype.getLastExplicitRuleShortName = function() {
          var ruleStack = this.RULE_STACK;
          return ruleStack[ruleStack.length - 1];
        }, TreeBuilder.prototype.getPreviousExplicitRuleShortName = function() {
          var ruleStack = this.RULE_STACK;
          return ruleStack[ruleStack.length - 2];
        }, TreeBuilder.prototype.getLastExplicitRuleOccurrenceIndex = function() {
          var occurrenceStack = this.RULE_OCCURRENCE_STACK;
          return occurrenceStack[occurrenceStack.length - 1];
        }, TreeBuilder;
      }(), LexerAdapter = function() {
        function LexerAdapter() {}
        return LexerAdapter.prototype.initLexerAdapter = function() {
          this.tokVector = [], this.tokVectorLength = 0, this.currIdx = -1;
        }, Object.defineProperty(LexerAdapter.prototype, "input", {
          get: function() {
            return this.tokVector;
          },
          set: function(newInput) {
            if (!0 !== this.selfAnalysisDone) throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor.");
            this.reset(), this.tokVector = newInput, this.tokVectorLength = newInput.length;
          },
          enumerable: !1,
          configurable: !0
        }), LexerAdapter.prototype.SKIP_TOKEN = function() {
          return this.currIdx <= this.tokVector.length - 2 ? (this.consumeToken(), this.LA(1)) : END_OF_FILE;
        }, LexerAdapter.prototype.LA = function(howMuch) {
          var soughtIdx = this.currIdx + howMuch;
          return soughtIdx < 0 || this.tokVectorLength <= soughtIdx ? END_OF_FILE : this.tokVector[soughtIdx];
        }, LexerAdapter.prototype.consumeToken = function() {
          this.currIdx++;
        }, LexerAdapter.prototype.exportLexerState = function() {
          return this.currIdx;
        }, LexerAdapter.prototype.importLexerState = function(newState) {
          this.currIdx = newState;
        }, LexerAdapter.prototype.resetLexerState = function() {
          this.currIdx = -1;
        }, LexerAdapter.prototype.moveToTerminatedState = function() {
          this.currIdx = this.tokVector.length - 1;
        }, LexerAdapter.prototype.getLexerPosition = function() {
          return this.exportLexerState();
        }, LexerAdapter;
      }(), RecognizerApi = function() {
        function RecognizerApi() {}
        return RecognizerApi.prototype.ACTION = function(impl) {
          return impl.call(this);
        }, RecognizerApi.prototype.consume = function(idx, tokType, options) {
          return this.consumeInternal(tokType, idx, options);
        }, RecognizerApi.prototype.subrule = function(idx, ruleToCall, options) {
          return this.subruleInternal(ruleToCall, idx, options);
        }, RecognizerApi.prototype.option = function(idx, actionORMethodDef) {
          return this.optionInternal(actionORMethodDef, idx);
        }, RecognizerApi.prototype.or = function(idx, altsOrOpts) {
          return this.orInternal(altsOrOpts, idx);
        }, RecognizerApi.prototype.many = function(idx, actionORMethodDef) {
          return this.manyInternal(idx, actionORMethodDef);
        }, RecognizerApi.prototype.atLeastOne = function(idx, actionORMethodDef) {
          return this.atLeastOneInternal(idx, actionORMethodDef);
        }, RecognizerApi.prototype.CONSUME = function(tokType, options) {
          return this.consumeInternal(tokType, 0, options);
        }, RecognizerApi.prototype.CONSUME1 = function(tokType, options) {
          return this.consumeInternal(tokType, 1, options);
        }, RecognizerApi.prototype.CONSUME2 = function(tokType, options) {
          return this.consumeInternal(tokType, 2, options);
        }, RecognizerApi.prototype.CONSUME3 = function(tokType, options) {
          return this.consumeInternal(tokType, 3, options);
        }, RecognizerApi.prototype.CONSUME4 = function(tokType, options) {
          return this.consumeInternal(tokType, 4, options);
        }, RecognizerApi.prototype.CONSUME5 = function(tokType, options) {
          return this.consumeInternal(tokType, 5, options);
        }, RecognizerApi.prototype.CONSUME6 = function(tokType, options) {
          return this.consumeInternal(tokType, 6, options);
        }, RecognizerApi.prototype.CONSUME7 = function(tokType, options) {
          return this.consumeInternal(tokType, 7, options);
        }, RecognizerApi.prototype.CONSUME8 = function(tokType, options) {
          return this.consumeInternal(tokType, 8, options);
        }, RecognizerApi.prototype.CONSUME9 = function(tokType, options) {
          return this.consumeInternal(tokType, 9, options);
        }, RecognizerApi.prototype.SUBRULE = function(ruleToCall, options) {
          return this.subruleInternal(ruleToCall, 0, options);
        }, RecognizerApi.prototype.SUBRULE1 = function(ruleToCall, options) {
          return this.subruleInternal(ruleToCall, 1, options);
        }, RecognizerApi.prototype.SUBRULE2 = function(ruleToCall, options) {
          return this.subruleInternal(ruleToCall, 2, options);
        }, RecognizerApi.prototype.SUBRULE3 = function(ruleToCall, options) {
          return this.subruleInternal(ruleToCall, 3, options);
        }, RecognizerApi.prototype.SUBRULE4 = function(ruleToCall, options) {
          return this.subruleInternal(ruleToCall, 4, options);
        }, RecognizerApi.prototype.SUBRULE5 = function(ruleToCall, options) {
          return this.subruleInternal(ruleToCall, 5, options);
        }, RecognizerApi.prototype.SUBRULE6 = function(ruleToCall, options) {
          return this.subruleInternal(ruleToCall, 6, options);
        }, RecognizerApi.prototype.SUBRULE7 = function(ruleToCall, options) {
          return this.subruleInternal(ruleToCall, 7, options);
        }, RecognizerApi.prototype.SUBRULE8 = function(ruleToCall, options) {
          return this.subruleInternal(ruleToCall, 8, options);
        }, RecognizerApi.prototype.SUBRULE9 = function(ruleToCall, options) {
          return this.subruleInternal(ruleToCall, 9, options);
        }, RecognizerApi.prototype.OPTION = function(actionORMethodDef) {
          return this.optionInternal(actionORMethodDef, 0);
        }, RecognizerApi.prototype.OPTION1 = function(actionORMethodDef) {
          return this.optionInternal(actionORMethodDef, 1);
        }, RecognizerApi.prototype.OPTION2 = function(actionORMethodDef) {
          return this.optionInternal(actionORMethodDef, 2);
        }, RecognizerApi.prototype.OPTION3 = function(actionORMethodDef) {
          return this.optionInternal(actionORMethodDef, 3);
        }, RecognizerApi.prototype.OPTION4 = function(actionORMethodDef) {
          return this.optionInternal(actionORMethodDef, 4);
        }, RecognizerApi.prototype.OPTION5 = function(actionORMethodDef) {
          return this.optionInternal(actionORMethodDef, 5);
        }, RecognizerApi.prototype.OPTION6 = function(actionORMethodDef) {
          return this.optionInternal(actionORMethodDef, 6);
        }, RecognizerApi.prototype.OPTION7 = function(actionORMethodDef) {
          return this.optionInternal(actionORMethodDef, 7);
        }, RecognizerApi.prototype.OPTION8 = function(actionORMethodDef) {
          return this.optionInternal(actionORMethodDef, 8);
        }, RecognizerApi.prototype.OPTION9 = function(actionORMethodDef) {
          return this.optionInternal(actionORMethodDef, 9);
        }, RecognizerApi.prototype.OR = function(altsOrOpts) {
          return this.orInternal(altsOrOpts, 0);
        }, RecognizerApi.prototype.OR1 = function(altsOrOpts) {
          return this.orInternal(altsOrOpts, 1);
        }, RecognizerApi.prototype.OR2 = function(altsOrOpts) {
          return this.orInternal(altsOrOpts, 2);
        }, RecognizerApi.prototype.OR3 = function(altsOrOpts) {
          return this.orInternal(altsOrOpts, 3);
        }, RecognizerApi.prototype.OR4 = function(altsOrOpts) {
          return this.orInternal(altsOrOpts, 4);
        }, RecognizerApi.prototype.OR5 = function(altsOrOpts) {
          return this.orInternal(altsOrOpts, 5);
        }, RecognizerApi.prototype.OR6 = function(altsOrOpts) {
          return this.orInternal(altsOrOpts, 6);
        }, RecognizerApi.prototype.OR7 = function(altsOrOpts) {
          return this.orInternal(altsOrOpts, 7);
        }, RecognizerApi.prototype.OR8 = function(altsOrOpts) {
          return this.orInternal(altsOrOpts, 8);
        }, RecognizerApi.prototype.OR9 = function(altsOrOpts) {
          return this.orInternal(altsOrOpts, 9);
        }, RecognizerApi.prototype.MANY = function(actionORMethodDef) {
          this.manyInternal(0, actionORMethodDef);
        }, RecognizerApi.prototype.MANY1 = function(actionORMethodDef) {
          this.manyInternal(1, actionORMethodDef);
        }, RecognizerApi.prototype.MANY2 = function(actionORMethodDef) {
          this.manyInternal(2, actionORMethodDef);
        }, RecognizerApi.prototype.MANY3 = function(actionORMethodDef) {
          this.manyInternal(3, actionORMethodDef);
        }, RecognizerApi.prototype.MANY4 = function(actionORMethodDef) {
          this.manyInternal(4, actionORMethodDef);
        }, RecognizerApi.prototype.MANY5 = function(actionORMethodDef) {
          this.manyInternal(5, actionORMethodDef);
        }, RecognizerApi.prototype.MANY6 = function(actionORMethodDef) {
          this.manyInternal(6, actionORMethodDef);
        }, RecognizerApi.prototype.MANY7 = function(actionORMethodDef) {
          this.manyInternal(7, actionORMethodDef);
        }, RecognizerApi.prototype.MANY8 = function(actionORMethodDef) {
          this.manyInternal(8, actionORMethodDef);
        }, RecognizerApi.prototype.MANY9 = function(actionORMethodDef) {
          this.manyInternal(9, actionORMethodDef);
        }, RecognizerApi.prototype.MANY_SEP = function(options) {
          this.manySepFirstInternal(0, options);
        }, RecognizerApi.prototype.MANY_SEP1 = function(options) {
          this.manySepFirstInternal(1, options);
        }, RecognizerApi.prototype.MANY_SEP2 = function(options) {
          this.manySepFirstInternal(2, options);
        }, RecognizerApi.prototype.MANY_SEP3 = function(options) {
          this.manySepFirstInternal(3, options);
        }, RecognizerApi.prototype.MANY_SEP4 = function(options) {
          this.manySepFirstInternal(4, options);
        }, RecognizerApi.prototype.MANY_SEP5 = function(options) {
          this.manySepFirstInternal(5, options);
        }, RecognizerApi.prototype.MANY_SEP6 = function(options) {
          this.manySepFirstInternal(6, options);
        }, RecognizerApi.prototype.MANY_SEP7 = function(options) {
          this.manySepFirstInternal(7, options);
        }, RecognizerApi.prototype.MANY_SEP8 = function(options) {
          this.manySepFirstInternal(8, options);
        }, RecognizerApi.prototype.MANY_SEP9 = function(options) {
          this.manySepFirstInternal(9, options);
        }, RecognizerApi.prototype.AT_LEAST_ONE = function(actionORMethodDef) {
          this.atLeastOneInternal(0, actionORMethodDef);
        }, RecognizerApi.prototype.AT_LEAST_ONE1 = function(actionORMethodDef) {
          return this.atLeastOneInternal(1, actionORMethodDef);
        }, RecognizerApi.prototype.AT_LEAST_ONE2 = function(actionORMethodDef) {
          this.atLeastOneInternal(2, actionORMethodDef);
        }, RecognizerApi.prototype.AT_LEAST_ONE3 = function(actionORMethodDef) {
          this.atLeastOneInternal(3, actionORMethodDef);
        }, RecognizerApi.prototype.AT_LEAST_ONE4 = function(actionORMethodDef) {
          this.atLeastOneInternal(4, actionORMethodDef);
        }, RecognizerApi.prototype.AT_LEAST_ONE5 = function(actionORMethodDef) {
          this.atLeastOneInternal(5, actionORMethodDef);
        }, RecognizerApi.prototype.AT_LEAST_ONE6 = function(actionORMethodDef) {
          this.atLeastOneInternal(6, actionORMethodDef);
        }, RecognizerApi.prototype.AT_LEAST_ONE7 = function(actionORMethodDef) {
          this.atLeastOneInternal(7, actionORMethodDef);
        }, RecognizerApi.prototype.AT_LEAST_ONE8 = function(actionORMethodDef) {
          this.atLeastOneInternal(8, actionORMethodDef);
        }, RecognizerApi.prototype.AT_LEAST_ONE9 = function(actionORMethodDef) {
          this.atLeastOneInternal(9, actionORMethodDef);
        }, RecognizerApi.prototype.AT_LEAST_ONE_SEP = function(options) {
          this.atLeastOneSepFirstInternal(0, options);
        }, RecognizerApi.prototype.AT_LEAST_ONE_SEP1 = function(options) {
          this.atLeastOneSepFirstInternal(1, options);
        }, RecognizerApi.prototype.AT_LEAST_ONE_SEP2 = function(options) {
          this.atLeastOneSepFirstInternal(2, options);
        }, RecognizerApi.prototype.AT_LEAST_ONE_SEP3 = function(options) {
          this.atLeastOneSepFirstInternal(3, options);
        }, RecognizerApi.prototype.AT_LEAST_ONE_SEP4 = function(options) {
          this.atLeastOneSepFirstInternal(4, options);
        }, RecognizerApi.prototype.AT_LEAST_ONE_SEP5 = function(options) {
          this.atLeastOneSepFirstInternal(5, options);
        }, RecognizerApi.prototype.AT_LEAST_ONE_SEP6 = function(options) {
          this.atLeastOneSepFirstInternal(6, options);
        }, RecognizerApi.prototype.AT_LEAST_ONE_SEP7 = function(options) {
          this.atLeastOneSepFirstInternal(7, options);
        }, RecognizerApi.prototype.AT_LEAST_ONE_SEP8 = function(options) {
          this.atLeastOneSepFirstInternal(8, options);
        }, RecognizerApi.prototype.AT_LEAST_ONE_SEP9 = function(options) {
          this.atLeastOneSepFirstInternal(9, options);
        }, RecognizerApi.prototype.RULE = function(name, implementation, config) {
          if (void 0 === config && (config = DEFAULT_RULE_CONFIG), (0, utils.r3)(this.definedRulesNames, name)) {
            var error = {
              message: defaultGrammarValidatorErrorProvider.buildDuplicateRuleNameError({
                topLevelRule: name,
                grammarName: this.className
              }),
              type: ParserDefinitionErrorType.DUPLICATE_RULE_NAME,
              ruleName: name
            };
            this.definitionErrors.push(error);
          }
          this.definedRulesNames.push(name);
          var ruleImplementation = this.defineRule(name, implementation, config);
          return this[name] = ruleImplementation, ruleImplementation;
        }, RecognizerApi.prototype.OVERRIDE_RULE = function(name, impl, config) {
          void 0 === config && (config = DEFAULT_RULE_CONFIG);
          var ruleName, definedRulesNames, className, errMsg, errors, ruleErrors = [];
          ruleErrors = ruleErrors.concat((ruleName = name, definedRulesNames = this.definedRulesNames, 
          className = this.className, errors = [], utils.r3(definedRulesNames, ruleName) || (errMsg = "Invalid rule override, rule: ->" + ruleName + "<- cannot be overridden in the grammar: ->" + className + "<-as it is not defined in any of the super grammars ", 
          errors.push({
            message: errMsg,
            type: ParserDefinitionErrorType.INVALID_RULE_OVERRIDE,
            ruleName
          })), errors)), this.definitionErrors.push.apply(this.definitionErrors, ruleErrors);
          var ruleImplementation = this.defineRule(name, impl, config);
          return this[name] = ruleImplementation, ruleImplementation;
        }, RecognizerApi.prototype.BACKTRACK = function(grammarRule, args) {
          return function() {
            this.isBackTrackingStack.push(1);
            var orgState = this.saveRecogState();
            try {
              return grammarRule.apply(this, args), !0;
            } catch (e) {
              if (isRecognitionException(e)) return !1;
              throw e;
            } finally {
              this.reloadRecogState(orgState), this.isBackTrackingStack.pop();
            }
          };
        }, RecognizerApi.prototype.getGAstProductions = function() {
          return this.gastProductionsCache;
        }, RecognizerApi.prototype.getSerializedGastProductions = function() {
          return serializeGrammar((0, utils.VO)(this.gastProductionsCache));
        }, RecognizerApi;
      }(), RecognizerEngine = function() {
        function RecognizerEngine() {}
        return RecognizerEngine.prototype.initRecognizerEngine = function(tokenVocabulary, config) {
          if (this.className = functionName(this.constructor), this.shortRuleNameToFull = {}, 
          this.fullRuleNameToShort = {}, this.ruleShortNameIdx = 256, this.tokenMatcher = tokenStructuredMatcherNoCategories, 
          this.definedRulesNames = [], this.tokensMap = {}, this.isBackTrackingStack = [], 
          this.RULE_STACK = [], this.RULE_OCCURRENCE_STACK = [], this.gastProductionsCache = {}, 
          (0, utils.e$)(config, "serializedGrammar")) throw Error("The Parser's configuration can no longer contain a <serializedGrammar> property.\n\tSee: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_6-0-0\n\tFor Further details.");
          if ((0, utils.kJ)(tokenVocabulary)) {
            if ((0, utils.xb)(tokenVocabulary)) throw Error("A Token Vocabulary cannot be empty.\n\tNote that the first argument for the parser constructor\n\tis no longer a Token vector (since v4.0).");
            if ("number" == typeof tokenVocabulary[0].startOffset) throw Error("The Parser constructor no longer accepts a token vector as the first argument.\n\tSee: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_4-0-0\n\tFor Further details.");
          }
          if ((0, utils.kJ)(tokenVocabulary)) this.tokensMap = (0, utils.u4)(tokenVocabulary, (function(acc, tokType) {
            return acc[tokType.name] = tokType, acc;
          }), {}); else if ((0, utils.e$)(tokenVocabulary, "modes") && (0, utils.yW)((0, utils.xH)((0, 
          utils.VO)(tokenVocabulary.modes)), isTokenType)) {
            var allTokenTypes = (0, utils.xH)((0, utils.VO)(tokenVocabulary.modes)), uniqueTokens = (0, 
            utils.jj)(allTokenTypes);
            this.tokensMap = (0, utils.u4)(uniqueTokens, (function(acc, tokType) {
              return acc[tokType.name] = tokType, acc;
            }), {});
          } else {
            if (!(0, utils.Kn)(tokenVocabulary)) throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");
            this.tokensMap = (0, utils.Cl)(tokenVocabulary);
          }
          this.tokensMap.EOF = EOF;
          var noTokenCategoriesUsed = (0, utils.yW)((0, utils.VO)(tokenVocabulary), (function(tokenConstructor) {
            return (0, utils.xb)(tokenConstructor.categoryMatches);
          }));
          this.tokenMatcher = noTokenCategoriesUsed ? tokenStructuredMatcherNoCategories : tokenStructuredMatcher, 
          augmentTokenTypes((0, utils.VO)(this.tokensMap));
        }, RecognizerEngine.prototype.defineRule = function(ruleName, impl, config) {
          if (this.selfAnalysisDone) throw Error("Grammar rule <" + ruleName + "> may not be defined after the 'performSelfAnalysis' method has been called'\nMake sure that all grammar rule definitions are done before 'performSelfAnalysis' is called.");
          var wrappedGrammarRule, resyncEnabled = (0, utils.e$)(config, "resyncEnabled") ? config.resyncEnabled : DEFAULT_RULE_CONFIG.resyncEnabled, recoveryValueFunc = (0, 
          utils.e$)(config, "recoveryValueFunc") ? config.recoveryValueFunc : DEFAULT_RULE_CONFIG.recoveryValueFunc, shortName = this.ruleShortNameIdx << 12;
          function invokeRuleWithTry(args) {
            try {
              if (!0 === this.outputCst) {
                impl.apply(this, args);
                var cst = this.CST_STACK[this.CST_STACK.length - 1];
                return this.cstPostRule(cst), cst;
              }
              return impl.apply(this, args);
            } catch (e) {
              return this.invokeRuleCatch(e, resyncEnabled, recoveryValueFunc);
            } finally {
              this.ruleFinallyStateUpdate();
            }
          }
          this.ruleShortNameIdx++, this.shortRuleNameToFull[shortName] = ruleName, this.fullRuleNameToShort[ruleName] = shortName;
          return (wrappedGrammarRule = function(idxInCallingRule, args) {
            return void 0 === idxInCallingRule && (idxInCallingRule = 0), this.ruleInvocationStateUpdate(shortName, ruleName, idxInCallingRule), 
            invokeRuleWithTry.call(this, args);
          }).ruleName = ruleName, wrappedGrammarRule.originalGrammarAction = impl, wrappedGrammarRule;
        }, RecognizerEngine.prototype.invokeRuleCatch = function(e, resyncEnabledConfig, recoveryValueFunc) {
          var isFirstInvokedRule = 1 === this.RULE_STACK.length, reSyncEnabled = resyncEnabledConfig && !this.isBackTracking() && this.recoveryEnabled;
          if (isRecognitionException(e)) {
            var recogError = e;
            if (reSyncEnabled) {
              var partialCstResult, reSyncTokType = this.findReSyncTokenType();
              if (this.isInCurrentRuleReSyncSet(reSyncTokType)) return recogError.resyncedTokens = this.reSyncTo(reSyncTokType), 
              this.outputCst ? ((partialCstResult = this.CST_STACK[this.CST_STACK.length - 1]).recoveredNode = !0, 
              partialCstResult) : recoveryValueFunc();
              throw this.outputCst && ((partialCstResult = this.CST_STACK[this.CST_STACK.length - 1]).recoveredNode = !0, 
              recogError.partialCstResult = partialCstResult), recogError;
            }
            if (isFirstInvokedRule) return this.moveToTerminatedState(), recoveryValueFunc();
            throw recogError;
          }
          throw e;
        }, RecognizerEngine.prototype.optionInternal = function(actionORMethodDef, occurrence) {
          var key = this.getKeyForAutomaticLookahead(512, occurrence);
          return this.optionInternalLogic(actionORMethodDef, occurrence, key);
        }, RecognizerEngine.prototype.optionInternalLogic = function(actionORMethodDef, occurrence, key) {
          var action, predicate, _this = this, lookAheadFunc = this.getLaFuncFromCache(key);
          if (void 0 !== actionORMethodDef.DEF) {
            if (action = actionORMethodDef.DEF, void 0 !== (predicate = actionORMethodDef.GATE)) {
              var orgLookaheadFunction_1 = lookAheadFunc;
              lookAheadFunc = function() {
                return predicate.call(_this) && orgLookaheadFunction_1.call(_this);
              };
            }
          } else action = actionORMethodDef;
          if (!0 === lookAheadFunc.call(this)) return action.call(this);
        }, RecognizerEngine.prototype.atLeastOneInternal = function(prodOccurrence, actionORMethodDef) {
          var laKey = this.getKeyForAutomaticLookahead(1024, prodOccurrence);
          return this.atLeastOneInternalLogic(prodOccurrence, actionORMethodDef, laKey);
        }, RecognizerEngine.prototype.atLeastOneInternalLogic = function(prodOccurrence, actionORMethodDef, key) {
          var action, predicate, _this = this, lookAheadFunc = this.getLaFuncFromCache(key);
          if (void 0 !== actionORMethodDef.DEF) {
            if (action = actionORMethodDef.DEF, void 0 !== (predicate = actionORMethodDef.GATE)) {
              var orgLookaheadFunction_2 = lookAheadFunc;
              lookAheadFunc = function() {
                return predicate.call(_this) && orgLookaheadFunction_2.call(_this);
              };
            }
          } else action = actionORMethodDef;
          if (!0 !== lookAheadFunc.call(this)) throw this.raiseEarlyExitException(prodOccurrence, PROD_TYPE.REPETITION_MANDATORY, actionORMethodDef.ERR_MSG);
          for (var notStuck = this.doSingleRepetition(action); !0 === lookAheadFunc.call(this) && !0 === notStuck; ) notStuck = this.doSingleRepetition(action);
          this.attemptInRepetitionRecovery(this.atLeastOneInternal, [ prodOccurrence, actionORMethodDef ], lookAheadFunc, 1024, prodOccurrence, NextTerminalAfterAtLeastOneWalker);
        }, RecognizerEngine.prototype.atLeastOneSepFirstInternal = function(prodOccurrence, options) {
          var laKey = this.getKeyForAutomaticLookahead(1536, prodOccurrence);
          this.atLeastOneSepFirstInternalLogic(prodOccurrence, options, laKey);
        }, RecognizerEngine.prototype.atLeastOneSepFirstInternalLogic = function(prodOccurrence, options, key) {
          var _this = this, action = options.DEF, separator = options.SEP;
          if (!0 !== this.getLaFuncFromCache(key).call(this)) throw this.raiseEarlyExitException(prodOccurrence, PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, options.ERR_MSG);
          action.call(this);
          for (var separatorLookAheadFunc = function() {
            return _this.tokenMatcher(_this.LA(1), separator);
          }; !0 === this.tokenMatcher(this.LA(1), separator); ) this.CONSUME(separator), action.call(this);
          this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [ prodOccurrence, separator, separatorLookAheadFunc, action, NextTerminalAfterAtLeastOneSepWalker ], separatorLookAheadFunc, 1536, prodOccurrence, NextTerminalAfterAtLeastOneSepWalker);
        }, RecognizerEngine.prototype.manyInternal = function(prodOccurrence, actionORMethodDef) {
          var laKey = this.getKeyForAutomaticLookahead(768, prodOccurrence);
          return this.manyInternalLogic(prodOccurrence, actionORMethodDef, laKey);
        }, RecognizerEngine.prototype.manyInternalLogic = function(prodOccurrence, actionORMethodDef, key) {
          var action, predicate, _this = this, lookaheadFunction = this.getLaFuncFromCache(key);
          if (void 0 !== actionORMethodDef.DEF) {
            if (action = actionORMethodDef.DEF, void 0 !== (predicate = actionORMethodDef.GATE)) {
              var orgLookaheadFunction_3 = lookaheadFunction;
              lookaheadFunction = function() {
                return predicate.call(_this) && orgLookaheadFunction_3.call(_this);
              };
            }
          } else action = actionORMethodDef;
          for (var notStuck = !0; !0 === lookaheadFunction.call(this) && !0 === notStuck; ) notStuck = this.doSingleRepetition(action);
          this.attemptInRepetitionRecovery(this.manyInternal, [ prodOccurrence, actionORMethodDef ], lookaheadFunction, 768, prodOccurrence, NextTerminalAfterManyWalker, notStuck);
        }, RecognizerEngine.prototype.manySepFirstInternal = function(prodOccurrence, options) {
          var laKey = this.getKeyForAutomaticLookahead(1280, prodOccurrence);
          this.manySepFirstInternalLogic(prodOccurrence, options, laKey);
        }, RecognizerEngine.prototype.manySepFirstInternalLogic = function(prodOccurrence, options, key) {
          var _this = this, action = options.DEF, separator = options.SEP;
          if (!0 === this.getLaFuncFromCache(key).call(this)) {
            action.call(this);
            for (var separatorLookAheadFunc = function() {
              return _this.tokenMatcher(_this.LA(1), separator);
            }; !0 === this.tokenMatcher(this.LA(1), separator); ) this.CONSUME(separator), action.call(this);
            this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [ prodOccurrence, separator, separatorLookAheadFunc, action, NextTerminalAfterManySepWalker ], separatorLookAheadFunc, 1280, prodOccurrence, NextTerminalAfterManySepWalker);
          }
        }, RecognizerEngine.prototype.repetitionSepSecondInternal = function(prodOccurrence, separator, separatorLookAheadFunc, action, nextTerminalAfterWalker) {
          for (;separatorLookAheadFunc(); ) this.CONSUME(separator), action.call(this);
          this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [ prodOccurrence, separator, separatorLookAheadFunc, action, nextTerminalAfterWalker ], separatorLookAheadFunc, 1536, prodOccurrence, nextTerminalAfterWalker);
        }, RecognizerEngine.prototype.doSingleRepetition = function(action) {
          var beforeIteration = this.getLexerPosition();
          return action.call(this), this.getLexerPosition() > beforeIteration;
        }, RecognizerEngine.prototype.orInternal = function(altsOrOpts, occurrence) {
          var laKey = this.getKeyForAutomaticLookahead(256, occurrence), alts = (0, utils.kJ)(altsOrOpts) ? altsOrOpts : altsOrOpts.DEF, altIdxToTake = this.getLaFuncFromCache(laKey).call(this, alts);
          if (void 0 !== altIdxToTake) return alts[altIdxToTake].ALT.call(this);
          this.raiseNoAltException(occurrence, altsOrOpts.ERR_MSG);
        }, RecognizerEngine.prototype.ruleFinallyStateUpdate = function() {
          if (this.RULE_STACK.pop(), this.RULE_OCCURRENCE_STACK.pop(), this.cstFinallyStateUpdate(), 
          0 === this.RULE_STACK.length && !1 === this.isAtEndOfInput()) {
            var firstRedundantTok = this.LA(1), errMsg = this.errorMessageProvider.buildNotAllInputParsedMessage({
              firstRedundant: firstRedundantTok,
              ruleName: this.getCurrRuleFullName()
            });
            this.SAVE_ERROR(new NotAllInputParsedException(errMsg, firstRedundantTok));
          }
        }, RecognizerEngine.prototype.subruleInternal = function(ruleToCall, idx, options) {
          var ruleResult;
          try {
            var args = void 0 !== options ? options.ARGS : void 0;
            return ruleResult = ruleToCall.call(this, idx, args), this.cstPostNonTerminal(ruleResult, void 0 !== options && void 0 !== options.LABEL ? options.LABEL : ruleToCall.ruleName), 
            ruleResult;
          } catch (e) {
            this.subruleInternalError(e, options, ruleToCall.ruleName);
          }
        }, RecognizerEngine.prototype.subruleInternalError = function(e, options, ruleName) {
          throw isRecognitionException(e) && void 0 !== e.partialCstResult && (this.cstPostNonTerminal(e.partialCstResult, void 0 !== options && void 0 !== options.LABEL ? options.LABEL : ruleName), 
          delete e.partialCstResult), e;
        }, RecognizerEngine.prototype.consumeInternal = function(tokType, idx, options) {
          var consumedToken;
          try {
            var nextToken = this.LA(1);
            !0 === this.tokenMatcher(nextToken, tokType) ? (this.consumeToken(), consumedToken = nextToken) : this.consumeInternalError(tokType, nextToken, options);
          } catch (eFromConsumption) {
            consumedToken = this.consumeInternalRecovery(tokType, idx, eFromConsumption);
          }
          return this.cstPostTerminal(void 0 !== options && void 0 !== options.LABEL ? options.LABEL : tokType.name, consumedToken), 
          consumedToken;
        }, RecognizerEngine.prototype.consumeInternalError = function(tokType, nextToken, options) {
          var msg, previousToken = this.LA(0);
          throw msg = void 0 !== options && options.ERR_MSG ? options.ERR_MSG : this.errorMessageProvider.buildMismatchTokenMessage({
            expected: tokType,
            actual: nextToken,
            previous: previousToken,
            ruleName: this.getCurrRuleFullName()
          }), this.SAVE_ERROR(new MismatchedTokenException(msg, nextToken, previousToken));
        }, RecognizerEngine.prototype.consumeInternalRecovery = function(tokType, idx, eFromConsumption) {
          if (!this.recoveryEnabled || "MismatchedTokenException" !== eFromConsumption.name || this.isBackTracking()) throw eFromConsumption;
          var follows = this.getFollowsForInRuleRecovery(tokType, idx);
          try {
            return this.tryInRuleRecovery(tokType, follows);
          } catch (eFromInRuleRecovery) {
            throw "InRuleRecoveryException" === eFromInRuleRecovery.name ? eFromConsumption : eFromInRuleRecovery;
          }
        }, RecognizerEngine.prototype.saveRecogState = function() {
          var savedErrors = this.errors, savedRuleStack = (0, utils.Qw)(this.RULE_STACK);
          return {
            errors: savedErrors,
            lexerState: this.exportLexerState(),
            RULE_STACK: savedRuleStack,
            CST_STACK: this.CST_STACK
          };
        }, RecognizerEngine.prototype.reloadRecogState = function(newState) {
          this.errors = newState.errors, this.importLexerState(newState.lexerState), this.RULE_STACK = newState.RULE_STACK;
        }, RecognizerEngine.prototype.ruleInvocationStateUpdate = function(shortName, fullName, idxInCallingRule) {
          this.RULE_OCCURRENCE_STACK.push(idxInCallingRule), this.RULE_STACK.push(shortName), 
          this.cstInvocationStateUpdate(fullName, shortName);
        }, RecognizerEngine.prototype.isBackTracking = function() {
          return 0 !== this.isBackTrackingStack.length;
        }, RecognizerEngine.prototype.getCurrRuleFullName = function() {
          var shortName = this.getLastExplicitRuleShortName();
          return this.shortRuleNameToFull[shortName];
        }, RecognizerEngine.prototype.shortRuleNameToFullName = function(shortName) {
          return this.shortRuleNameToFull[shortName];
        }, RecognizerEngine.prototype.isAtEndOfInput = function() {
          return this.tokenMatcher(this.LA(1), EOF);
        }, RecognizerEngine.prototype.reset = function() {
          this.resetLexerState(), this.isBackTrackingStack = [], this.errors = [], this.RULE_STACK = [], 
          this.CST_STACK = [], this.RULE_OCCURRENCE_STACK = [];
        }, RecognizerEngine;
      }(), ErrorHandler = function() {
        function ErrorHandler() {}
        return ErrorHandler.prototype.initErrorHandler = function(config) {
          this._errors = [], this.errorMessageProvider = (0, utils.e$)(config, "errorMessageProvider") ? config.errorMessageProvider : DEFAULT_PARSER_CONFIG.errorMessageProvider;
        }, ErrorHandler.prototype.SAVE_ERROR = function(error) {
          if (isRecognitionException(error)) return error.context = {
            ruleStack: this.getHumanReadableRuleStack(),
            ruleOccurrenceStack: (0, utils.Qw)(this.RULE_OCCURRENCE_STACK)
          }, this._errors.push(error), error;
          throw Error("Trying to save an Error which is not a RecognitionException");
        }, Object.defineProperty(ErrorHandler.prototype, "errors", {
          get: function() {
            return (0, utils.Qw)(this._errors);
          },
          set: function(newErrors) {
            this._errors = newErrors;
          },
          enumerable: !1,
          configurable: !0
        }), ErrorHandler.prototype.raiseEarlyExitException = function(occurrence, prodType, userDefinedErrMsg) {
          for (var ruleName = this.getCurrRuleFullName(), insideProdPaths = getLookaheadPathsForOptionalProd(occurrence, this.getGAstProductions()[ruleName], prodType, this.maxLookahead)[0], actualTokens = [], i = 1; i <= this.maxLookahead; i++) actualTokens.push(this.LA(i));
          var msg = this.errorMessageProvider.buildEarlyExitMessage({
            expectedIterationPaths: insideProdPaths,
            actual: actualTokens,
            previous: this.LA(0),
            customUserDescription: userDefinedErrMsg,
            ruleName
          });
          throw this.SAVE_ERROR(new EarlyExitException(msg, this.LA(1), this.LA(0)));
        }, ErrorHandler.prototype.raiseNoAltException = function(occurrence, errMsgTypes) {
          for (var ruleName = this.getCurrRuleFullName(), lookAheadPathsPerAlternative = getLookaheadPathsForOr(occurrence, this.getGAstProductions()[ruleName], this.maxLookahead), actualTokens = [], i = 1; i <= this.maxLookahead; i++) actualTokens.push(this.LA(i));
          var previousToken = this.LA(0), errMsg = this.errorMessageProvider.buildNoViableAltMessage({
            expectedPathsPerAlt: lookAheadPathsPerAlternative,
            actual: actualTokens,
            previous: previousToken,
            customUserDescription: errMsgTypes,
            ruleName: this.getCurrRuleFullName()
          });
          throw this.SAVE_ERROR(new NoViableAltException(errMsg, this.LA(1), previousToken));
        }, ErrorHandler;
      }(), ContentAssist = function() {
        function ContentAssist() {}
        return ContentAssist.prototype.initContentAssist = function() {}, ContentAssist.prototype.computeContentAssist = function(startRuleName, precedingInput) {
          var startRuleGast = this.gastProductionsCache[startRuleName];
          if ((0, utils.o8)(startRuleGast)) throw Error("Rule ->" + startRuleName + "<- does not exist in this grammar.");
          return nextPossibleTokensAfter([ startRuleGast ], precedingInput, this.tokenMatcher, this.maxLookahead);
        }, ContentAssist.prototype.getNextPossibleTokenTypes = function(grammarPath) {
          var topRuleName = (0, utils.Ps)(grammarPath.ruleStack), topProduction = this.getGAstProductions()[topRuleName];
          return new NextAfterTokenWalker(topProduction, grammarPath).startWalking();
        }, ContentAssist;
      }(), RECORDING_NULL_OBJECT = {
        description: "This Object indicates the Parser is during Recording Phase"
      };
      Object.freeze(RECORDING_NULL_OBJECT);
      var MAX_METHOD_IDX = Math.pow(2, 8) - 1, RFT = createToken({
        name: "RECORDING_PHASE_TOKEN",
        pattern: Lexer.NA
      });
      augmentTokenTypes([ RFT ]);
      var RECORDING_PHASE_TOKEN = createTokenInstance(RFT, "This IToken indicates the Parser is in Recording Phase\n\tSee: https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording for details", -1, -1, -1, -1, -1, -1);
      Object.freeze(RECORDING_PHASE_TOKEN);
      var RECORDING_PHASE_CSTNODE = {
        name: "This CSTNode indicates the Parser is in Recording Phase\n\tSee: https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording for details",
        children: {}
      }, GastRecorder = function() {
        function GastRecorder() {}
        return GastRecorder.prototype.initGastRecorder = function(config) {
          this.recordingProdStack = [], this.RECORDING_PHASE = !1;
        }, GastRecorder.prototype.enableRecording = function() {
          var _this = this;
          this.RECORDING_PHASE = !0, this.TRACE_INIT("Enable Recording", (function() {
            for (var _loop_1 = function(i) {
              var idx = i > 0 ? i : "";
              _this["CONSUME" + idx] = function(arg1, arg2) {
                return this.consumeInternalRecord(arg1, i, arg2);
              }, _this["SUBRULE" + idx] = function(arg1, arg2) {
                return this.subruleInternalRecord(arg1, i, arg2);
              }, _this["OPTION" + idx] = function(arg1) {
                return this.optionInternalRecord(arg1, i);
              }, _this["OR" + idx] = function(arg1) {
                return this.orInternalRecord(arg1, i);
              }, _this["MANY" + idx] = function(arg1) {
                this.manyInternalRecord(i, arg1);
              }, _this["MANY_SEP" + idx] = function(arg1) {
                this.manySepFirstInternalRecord(i, arg1);
              }, _this["AT_LEAST_ONE" + idx] = function(arg1) {
                this.atLeastOneInternalRecord(i, arg1);
              }, _this["AT_LEAST_ONE_SEP" + idx] = function(arg1) {
                this.atLeastOneSepFirstInternalRecord(i, arg1);
              };
            }, i = 0; i < 10; i++) _loop_1(i);
            _this.consume = function(idx, arg1, arg2) {
              return this.consumeInternalRecord(arg1, idx, arg2);
            }, _this.subrule = function(idx, arg1, arg2) {
              return this.subruleInternalRecord(arg1, idx, arg2);
            }, _this.option = function(idx, arg1) {
              return this.optionInternalRecord(arg1, idx);
            }, _this.or = function(idx, arg1) {
              return this.orInternalRecord(arg1, idx);
            }, _this.many = function(idx, arg1) {
              this.manyInternalRecord(idx, arg1);
            }, _this.atLeastOne = function(idx, arg1) {
              this.atLeastOneInternalRecord(idx, arg1);
            }, _this.ACTION = _this.ACTION_RECORD, _this.BACKTRACK = _this.BACKTRACK_RECORD, 
            _this.LA = _this.LA_RECORD;
          }));
        }, GastRecorder.prototype.disableRecording = function() {
          var _this = this;
          this.RECORDING_PHASE = !1, this.TRACE_INIT("Deleting Recording methods", (function() {
            for (var i = 0; i < 10; i++) {
              var idx = i > 0 ? i : "";
              delete _this["CONSUME" + idx], delete _this["SUBRULE" + idx], delete _this["OPTION" + idx], 
              delete _this["OR" + idx], delete _this["MANY" + idx], delete _this["MANY_SEP" + idx], 
              delete _this["AT_LEAST_ONE" + idx], delete _this["AT_LEAST_ONE_SEP" + idx];
            }
            delete _this.consume, delete _this.subrule, delete _this.option, delete _this.or, 
            delete _this.many, delete _this.atLeastOne, delete _this.ACTION, delete _this.BACKTRACK, 
            delete _this.LA;
          }));
        }, GastRecorder.prototype.ACTION_RECORD = function(impl) {}, GastRecorder.prototype.BACKTRACK_RECORD = function(grammarRule, args) {
          return function() {
            return !0;
          };
        }, GastRecorder.prototype.LA_RECORD = function(howMuch) {
          return END_OF_FILE;
        }, GastRecorder.prototype.topLevelRuleRecord = function(name, def) {
          try {
            var newTopLevelRule = new Rule({
              definition: [],
              name
            });
            return newTopLevelRule.name = name, this.recordingProdStack.push(newTopLevelRule), 
            def.call(this), this.recordingProdStack.pop(), newTopLevelRule;
          } catch (originalError) {
            if (!0 !== originalError.KNOWN_RECORDER_ERROR) try {
              originalError.message = originalError.message + '\n\t This error was thrown during the "grammar recording phase" For more info see:\n\thttps://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording';
            } catch (mutabilityError) {
              throw originalError;
            }
            throw originalError;
          }
        }, GastRecorder.prototype.optionInternalRecord = function(actionORMethodDef, occurrence) {
          return recordProd.call(this, Option, actionORMethodDef, occurrence);
        }, GastRecorder.prototype.atLeastOneInternalRecord = function(occurrence, actionORMethodDef) {
          recordProd.call(this, RepetitionMandatory, actionORMethodDef, occurrence);
        }, GastRecorder.prototype.atLeastOneSepFirstInternalRecord = function(occurrence, options) {
          recordProd.call(this, RepetitionMandatoryWithSeparator, options, occurrence, true);
        }, GastRecorder.prototype.manyInternalRecord = function(occurrence, actionORMethodDef) {
          recordProd.call(this, Repetition, actionORMethodDef, occurrence);
        }, GastRecorder.prototype.manySepFirstInternalRecord = function(occurrence, options) {
          recordProd.call(this, RepetitionWithSeparator, options, occurrence, true);
        }, GastRecorder.prototype.orInternalRecord = function(altsOrOpts, occurrence) {
          return recordOrProd.call(this, altsOrOpts, occurrence);
        }, GastRecorder.prototype.subruleInternalRecord = function(ruleToCall, occurrence, options) {
          if (assertMethodIdxIsValid(occurrence), !ruleToCall || !1 === (0, utils.e$)(ruleToCall, "ruleName")) {
            var error = new Error("<SUBRULE" + getIdxSuffix(occurrence) + "> argument is invalid expecting a Parser method reference but got: <" + JSON.stringify(ruleToCall) + ">\n inside top level rule: <" + this.recordingProdStack[0].name + ">");
            throw error.KNOWN_RECORDER_ERROR = !0, error;
          }
          var prevProd = (0, utils.fj)(this.recordingProdStack), ruleName = ruleToCall.ruleName, newNoneTerminal = new NonTerminal({
            idx: occurrence,
            nonTerminalName: ruleName,
            referencedRule: void 0
          });
          return prevProd.definition.push(newNoneTerminal), this.outputCst ? RECORDING_PHASE_CSTNODE : RECORDING_NULL_OBJECT;
        }, GastRecorder.prototype.consumeInternalRecord = function(tokType, occurrence, options) {
          if (assertMethodIdxIsValid(occurrence), !hasShortKeyProperty(tokType)) {
            var error = new Error("<CONSUME" + getIdxSuffix(occurrence) + "> argument is invalid expecting a TokenType reference but got: <" + JSON.stringify(tokType) + ">\n inside top level rule: <" + this.recordingProdStack[0].name + ">");
            throw error.KNOWN_RECORDER_ERROR = !0, error;
          }
          var prevProd = (0, utils.fj)(this.recordingProdStack), newNoneTerminal = new Terminal({
            idx: occurrence,
            terminalType: tokType
          });
          return prevProd.definition.push(newNoneTerminal), RECORDING_PHASE_TOKEN;
        }, GastRecorder;
      }();
      function recordProd(prodConstructor, mainProdArg, occurrence, handleSep) {
        void 0 === handleSep && (handleSep = !1), assertMethodIdxIsValid(occurrence);
        var prevProd = (0, utils.fj)(this.recordingProdStack), grammarAction = (0, utils.mf)(mainProdArg) ? mainProdArg : mainProdArg.DEF, newProd = new prodConstructor({
          definition: [],
          idx: occurrence
        });
        return handleSep && (newProd.separator = mainProdArg.SEP), (0, utils.e$)(mainProdArg, "MAX_LOOKAHEAD") && (newProd.maxLookahead = mainProdArg.MAX_LOOKAHEAD), 
        this.recordingProdStack.push(newProd), grammarAction.call(this), prevProd.definition.push(newProd), 
        this.recordingProdStack.pop(), RECORDING_NULL_OBJECT;
      }
      function recordOrProd(mainProdArg, occurrence) {
        var _this = this;
        assertMethodIdxIsValid(occurrence);
        var prevProd = (0, utils.fj)(this.recordingProdStack), hasOptions = !1 === (0, utils.kJ)(mainProdArg), alts = !1 === hasOptions ? mainProdArg : mainProdArg.DEF, newOrProd = new Alternation({
          definition: [],
          idx: occurrence,
          ignoreAmbiguities: hasOptions && !0 === mainProdArg.IGNORE_AMBIGUITIES
        });
        (0, utils.e$)(mainProdArg, "MAX_LOOKAHEAD") && (newOrProd.maxLookahead = mainProdArg.MAX_LOOKAHEAD);
        var hasPredicates = (0, utils.G)(alts, (function(currAlt) {
          return (0, utils.mf)(currAlt.GATE);
        }));
        return newOrProd.hasPredicates = hasPredicates, prevProd.definition.push(newOrProd), 
        (0, utils.Ed)(alts, (function(currAlt) {
          var currAltFlat = new Alternative({
            definition: []
          });
          newOrProd.definition.push(currAltFlat), (0, utils.e$)(currAlt, "IGNORE_AMBIGUITIES") ? currAltFlat.ignoreAmbiguities = currAlt.IGNORE_AMBIGUITIES : (0, 
          utils.e$)(currAlt, "GATE") && (currAltFlat.ignoreAmbiguities = !0), _this.recordingProdStack.push(currAltFlat), 
          currAlt.ALT.call(_this), _this.recordingProdStack.pop();
        })), RECORDING_NULL_OBJECT;
      }
      function getIdxSuffix(idx) {
        return 0 === idx ? "" : "" + idx;
      }
      function assertMethodIdxIsValid(idx) {
        if (idx < 0 || idx > MAX_METHOD_IDX) {
          var error = new Error("Invalid DSL Method idx value: <" + idx + ">\n\tIdx value must be a none negative value smaller than " + (MAX_METHOD_IDX + 1));
          throw error.KNOWN_RECORDER_ERROR = !0, error;
        }
      }
      var PerformanceTracer = function() {
        function PerformanceTracer() {}
        return PerformanceTracer.prototype.initPerformanceTracer = function(config) {
          if ((0, utils.e$)(config, "traceInitPerf")) {
            var userTraceInitPerf = config.traceInitPerf, traceIsNumber = "number" == typeof userTraceInitPerf;
            this.traceInitMaxIdent = traceIsNumber ? userTraceInitPerf : 1 / 0, this.traceInitPerf = traceIsNumber ? userTraceInitPerf > 0 : userTraceInitPerf;
          } else this.traceInitMaxIdent = 0, this.traceInitPerf = DEFAULT_PARSER_CONFIG.traceInitPerf;
          this.traceInitIndent = -1;
        }, PerformanceTracer.prototype.TRACE_INIT = function(phaseDesc, phaseImpl) {
          if (!0 === this.traceInitPerf) {
            this.traceInitIndent++;
            var indent = new Array(this.traceInitIndent + 1).join("\t");
            this.traceInitIndent < this.traceInitMaxIdent && console.log(indent + "--\x3e <" + phaseDesc + ">");
            var _a = (0, utils.HT)(phaseImpl), time = _a.time, value = _a.value, traceMethod = time > 10 ? console.warn : console.log;
            return this.traceInitIndent < this.traceInitMaxIdent && traceMethod(indent + "<-- <" + phaseDesc + "> time: " + time + "ms"), 
            this.traceInitIndent--, value;
          }
          return phaseImpl();
        }, PerformanceTracer;
      }(), parser_extends = function() {
        var extendStatics = function(d, b) {
          return extendStatics = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function(d, b) {
            d.__proto__ = b;
          } || function(d, b) {
            for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
          }, extendStatics(d, b);
        };
        return function(d, b) {
          function __() {
            this.constructor = d;
          }
          extendStatics(d, b), d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, 
          new __);
        };
      }(), END_OF_FILE = createTokenInstance(EOF, "", NaN, NaN, NaN, NaN, NaN, NaN);
      Object.freeze(END_OF_FILE);
      var ParserDefinitionErrorType, DEFAULT_PARSER_CONFIG = Object.freeze({
        recoveryEnabled: !1,
        maxLookahead: 3,
        dynamicTokensEnabled: !1,
        outputCst: !0,
        errorMessageProvider: defaultParserErrorProvider,
        nodeLocationTracking: "none",
        traceInitPerf: !1,
        skipValidations: !1
      }), DEFAULT_RULE_CONFIG = Object.freeze({
        recoveryValueFunc: function() {},
        resyncEnabled: !0
      });
      function EMPTY_ALT(value) {
        return void 0 === value && (value = void 0), function() {
          return value;
        };
      }
      !function(ParserDefinitionErrorType) {
        ParserDefinitionErrorType[ParserDefinitionErrorType.INVALID_RULE_NAME = 0] = "INVALID_RULE_NAME", 
        ParserDefinitionErrorType[ParserDefinitionErrorType.DUPLICATE_RULE_NAME = 1] = "DUPLICATE_RULE_NAME", 
        ParserDefinitionErrorType[ParserDefinitionErrorType.INVALID_RULE_OVERRIDE = 2] = "INVALID_RULE_OVERRIDE", 
        ParserDefinitionErrorType[ParserDefinitionErrorType.DUPLICATE_PRODUCTIONS = 3] = "DUPLICATE_PRODUCTIONS", 
        ParserDefinitionErrorType[ParserDefinitionErrorType.UNRESOLVED_SUBRULE_REF = 4] = "UNRESOLVED_SUBRULE_REF", 
        ParserDefinitionErrorType[ParserDefinitionErrorType.LEFT_RECURSION = 5] = "LEFT_RECURSION", 
        ParserDefinitionErrorType[ParserDefinitionErrorType.NONE_LAST_EMPTY_ALT = 6] = "NONE_LAST_EMPTY_ALT", 
        ParserDefinitionErrorType[ParserDefinitionErrorType.AMBIGUOUS_ALTS = 7] = "AMBIGUOUS_ALTS", 
        ParserDefinitionErrorType[ParserDefinitionErrorType.CONFLICT_TOKENS_RULES_NAMESPACE = 8] = "CONFLICT_TOKENS_RULES_NAMESPACE", 
        ParserDefinitionErrorType[ParserDefinitionErrorType.INVALID_TOKEN_NAME = 9] = "INVALID_TOKEN_NAME", 
        ParserDefinitionErrorType[ParserDefinitionErrorType.NO_NON_EMPTY_LOOKAHEAD = 10] = "NO_NON_EMPTY_LOOKAHEAD", 
        ParserDefinitionErrorType[ParserDefinitionErrorType.AMBIGUOUS_PREFIX_ALTS = 11] = "AMBIGUOUS_PREFIX_ALTS", 
        ParserDefinitionErrorType[ParserDefinitionErrorType.TOO_MANY_ALTS = 12] = "TOO_MANY_ALTS";
      }(ParserDefinitionErrorType || (ParserDefinitionErrorType = {}));
      var Parser = function() {
        function Parser(tokenVocabulary, config) {
          this.definitionErrors = [], this.selfAnalysisDone = !1;
          if (this.initErrorHandler(config), this.initLexerAdapter(), this.initLooksAhead(config), 
          this.initRecognizerEngine(tokenVocabulary, config), this.initRecoverable(config), 
          this.initTreeBuilder(config), this.initContentAssist(), this.initGastRecorder(config), 
          this.initPerformanceTracer(config), (0, utils.e$)(config, "ignoredIssues")) throw new Error("The <ignoredIssues> IParserConfig property has been deprecated.\n\tPlease use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.\n\tSee: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES\n\tFor further details.");
          this.skipValidations = (0, utils.e$)(config, "skipValidations") ? config.skipValidations : DEFAULT_PARSER_CONFIG.skipValidations;
        }
        return Parser.performSelfAnalysis = function(parserInstance) {
          throw Error("The **static** `performSelfAnalysis` method has been deprecated.\t\nUse the **instance** method with the same name instead.");
        }, Parser.prototype.performSelfAnalysis = function() {
          var _this = this;
          this.TRACE_INIT("performSelfAnalysis", (function() {
            var defErrorsMsgs;
            _this.selfAnalysisDone = !0;
            var className = _this.className;
            _this.TRACE_INIT("toFastProps", (function() {
              (0, utils.SV)(_this);
            })), _this.TRACE_INIT("Grammar Recording", (function() {
              try {
                _this.enableRecording(), (0, utils.Ed)(_this.definedRulesNames, (function(currRuleName) {
                  var originalGrammarAction = _this[currRuleName].originalGrammarAction, recordedRuleGast = void 0;
                  _this.TRACE_INIT(currRuleName + " Rule", (function() {
                    recordedRuleGast = _this.topLevelRuleRecord(currRuleName, originalGrammarAction);
                  })), _this.gastProductionsCache[currRuleName] = recordedRuleGast;
                }));
              } finally {
                _this.disableRecording();
              }
            }));
            var resolverErrors = [];
            if (_this.TRACE_INIT("Grammar Resolving", (function() {
              resolverErrors = gast_resolver_public_resolveGrammar({
                rules: (0, utils.VO)(_this.gastProductionsCache)
              }), _this.definitionErrors.push.apply(_this.definitionErrors, resolverErrors);
            })), _this.TRACE_INIT("Grammar Validations", (function() {
              if ((0, utils.xb)(resolverErrors) && !1 === _this.skipValidations) {
                var validationErrors = gast_resolver_public_validateGrammar({
                  rules: (0, utils.VO)(_this.gastProductionsCache),
                  maxLookahead: _this.maxLookahead,
                  tokenTypes: (0, utils.VO)(_this.tokensMap),
                  errMsgProvider: defaultGrammarValidatorErrorProvider,
                  grammarName: className
                });
                _this.definitionErrors.push.apply(_this.definitionErrors, validationErrors);
              }
            })), (0, utils.xb)(_this.definitionErrors) && (_this.recoveryEnabled && _this.TRACE_INIT("computeAllProdsFollows", (function() {
              var topProductions, reSyncFollows, allFollows = (topProductions = (0, utils.VO)(_this.gastProductionsCache), 
              reSyncFollows = {}, (0, utils.Ed)(topProductions, (function(topProd) {
                var currRefsFollow = new ResyncFollowsWalker(topProd).startWalking();
                (0, utils.f0)(reSyncFollows, currRefsFollow);
              })), reSyncFollows);
              _this.resyncFollows = allFollows;
            })), _this.TRACE_INIT("ComputeLookaheadFunctions", (function() {
              _this.preComputeLookaheadFunctions((0, utils.VO)(_this.gastProductionsCache));
            }))), !Parser.DEFER_DEFINITION_ERRORS_HANDLING && !(0, utils.xb)(_this.definitionErrors)) throw defErrorsMsgs = (0, 
            utils.UI)(_this.definitionErrors, (function(defError) {
              return defError.message;
            })), new Error("Parser Definition Errors detected:\n " + defErrorsMsgs.join("\n-------------------------------\n"));
          }));
        }, Parser.DEFER_DEFINITION_ERRORS_HANDLING = !1, Parser;
      }();
      (0, utils.ef)(Parser, [ Recoverable, LooksAhead, TreeBuilder, LexerAdapter, RecognizerEngine, RecognizerApi, ErrorHandler, ContentAssist, GastRecorder, PerformanceTracer ]);
      var CstParser = function(_super) {
        function CstParser(tokenVocabulary, config) {
          void 0 === config && (config = DEFAULT_PARSER_CONFIG);
          var configClone = (0, utils.Cl)(config);
          return configClone.outputCst = !0, _super.call(this, tokenVocabulary, configClone) || this;
        }
        return parser_extends(CstParser, _super), CstParser;
      }(Parser), EmbeddedActionsParser = function(_super) {
        function EmbeddedActionsParser(tokenVocabulary, config) {
          void 0 === config && (config = DEFAULT_PARSER_CONFIG);
          var configClone = (0, utils.Cl)(config);
          return configClone.outputCst = !1, _super.call(this, tokenVocabulary, configClone) || this;
        }
        return parser_extends(EmbeddedActionsParser, _super), EmbeddedActionsParser;
      }(Parser);
      function createSyntaxDiagramsCode(grammar, _a) {
        var _b = void 0 === _a ? {} : _a, _c = _b.resourceBase, resourceBase = void 0 === _c ? "https://unpkg.com/chevrotain@" + VERSION + "/diagrams/" : _c, _d = _b.css;
        return '\n\x3c!-- This is a generated file --\x3e\n<!DOCTYPE html>\n<meta charset="utf-8">\n<style>\n  body {\n    background-color: hsl(30, 20%, 95%)\n  }\n</style>\n\n' + ("\n<link rel='stylesheet' href='" + (void 0 === _d ? "https://unpkg.com/chevrotain@" + VERSION + "/diagrams/diagrams.css" : _d) + "'>\n") + ("\n<script src='" + resourceBase + "vendor/railroad-diagrams.js'><\/script>\n<script src='" + resourceBase + "src/diagrams_builder.js'><\/script>\n<script src='" + resourceBase + "src/diagrams_behavior.js'><\/script>\n<script src='" + resourceBase + "src/main.js'><\/script>\n") + '\n<div id="diagrams" align="center"></div>    \n' + ("\n<script>\n    window.serializedGrammar = " + JSON.stringify(grammar, null, "  ") + ";\n<\/script>\n") + '\n<script>\n    var diagramsDiv = document.getElementById("diagrams");\n    main.drawDiagramsFromSerializedGrammar(serializedGrammar, diagramsDiv);\n<\/script>\n';
      }
      var NL = "\n";
      function genClass(options) {
        var rules;
        return "\nfunction " + options.name + "(tokenVocabulary, config) {\n    // invoke super constructor\n    // No support for embedded actions currently, so we can 'hardcode'\n    // The use of CstParser.\n    chevrotain.CstParser.call(this, tokenVocabulary, config)\n\n    const $ = this\n\n    " + (rules = options.rules, 
        (0, utils.UI)(rules, (function(currRule) {
          return function(prod, n) {
            var result = indent(n, '$.RULE("' + prod.name + '", function() {') + NL;
            return result += genDefinition(prod.definition, n + 1), result += indent(n + 1, "})") + NL;
          }(currRule, 1);
        })).join("\n") + "\n\n    // very important to call this after all the rules have been defined.\n    // otherwise the parser may not work correctly as it will lack information\n    // derived during the self analysis phase.\n    this.performSelfAnalysis(this)\n}\n\n// inheritance as implemented in javascript in the previous decade... :(\n") + options.name + ".prototype = Object.create(chevrotain.CstParser.prototype)\n" + options.name + ".prototype.constructor = " + options.name + "    \n    ";
      }
      function genAlternation(prod, n) {
        var result = indent(n, "$.OR" + prod.idx + "([") + NL, alts = (0, utils.UI)(prod.definition, (function(altDef) {
          return function(prod, n) {
            var result = indent(n, "{") + NL;
            return result += indent(n + 1, "ALT: function() {") + NL, result += genDefinition(prod.definition, n + 1), 
            result += indent(n + 1, "}") + NL, result += indent(n, "}");
          }(altDef, n + 1);
        }));
        return result += alts.join(",\n"), result += NL + indent(n, "])\n");
      }
      function genProd(prod, n) {
        if (prod instanceof NonTerminal) return function(prod, n) {
          return indent(n, "$.SUBRULE" + prod.idx + "($." + prod.nonTerminalName + ")" + NL);
        }(prod, n);
        if (prod instanceof Option) return genDSLRule("OPTION", prod, n);
        if (prod instanceof RepetitionMandatory) return genDSLRule("AT_LEAST_ONE", prod, n);
        if (prod instanceof RepetitionMandatoryWithSeparator) return genDSLRule("AT_LEAST_ONE_SEP", prod, n);
        if (prod instanceof RepetitionWithSeparator) return genDSLRule("MANY_SEP", prod, n);
        if (prod instanceof Repetition) return genDSLRule("MANY", prod, n);
        if (prod instanceof Alternation) return genAlternation(prod, n);
        if (prod instanceof Terminal) return function(prod, n) {
          var name = prod.terminalType.name;
          return indent(n, "$.CONSUME" + prod.idx + "(this.tokensMap." + name + ")" + NL);
        }(prod, n);
        if (prod instanceof Alternative) return genDefinition(prod.definition, n);
        throw Error("non exhaustive match");
      }
      function genDSLRule(dslName, prod, n) {
        var result = indent(n, "$." + (dslName + prod.idx) + "(");
        return prod.separator ? (result += "{\n", result += indent(n + 1, "SEP: this.tokensMap." + prod.separator.name) + "," + NL, 
        result += "DEF: " + genDefFunction(prod.definition, n + 2) + NL, result += indent(n, "}") + NL) : result += genDefFunction(prod.definition, n + 1), 
        result += indent(n, ")") + NL;
      }
      function genDefFunction(definition, n) {
        var def = "function() {\n";
        return def += genDefinition(definition, n), def += indent(n, "}") + NL;
      }
      function genDefinition(def, n) {
        var result = "";
        return (0, utils.Ed)(def, (function(prod) {
          result += genProd(prod, n + 1);
        })), result;
      }
      function indent(howMuch, text) {
        return Array(4 * howMuch + 1).join(" ") + text;
      }
      function generateParserFactory(options) {
        var wrapperText = function(options) {
          return "    \n" + genClass(options) + "\nreturn new " + options.name + "(tokenVocabulary, config)    \n";
        }({
          name: options.name,
          rules: options.rules
        }), constructorWrapper = new Function("tokenVocabulary", "config", "chevrotain", wrapperText);
        return function(config) {
          return constructorWrapper(options.tokenVocabulary, config, __webpack_require__(650));
        };
      }
      function generateParserModule(options) {
        return function(options) {
          return "\n(function (root, factory) {\n    if (typeof define === 'function' && define.amd) {\n        // AMD. Register as an anonymous module.\n        define(['chevrotain'], factory);\n    } else if (typeof module === 'object' && module.exports) {\n        // Node. Does not work with strict CommonJS, but\n        // only CommonJS-like environments that support module.exports,\n        // like Node.\n        module.exports = factory(require('chevrotain'));\n    } else {\n        // Browser globals (root is window)\n        root.returnExports = factory(root.b);\n    }\n}(typeof self !== 'undefined' ? self : this, function (chevrotain) {\n\n" + genClass(options) + "\n    \nreturn {\n    " + options.name + ": " + options.name + " \n}\n}));\n";
        }({
          name: options.name,
          rules: options.rules
        });
      }
      function clearCache() {
        console.warn("The clearCache function was 'soft' removed from the Chevrotain API.\n\t It performs no action other than printing this message.\n\t Please avoid using it as it will be completely removed in the future");
      }
      var api_Parser = function() {
        throw new Error("The Parser class has been deprecated, use CstParser or EmbeddedActionsParser instead.\t\nSee: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_7-0-0");
      };
    },
    465: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      function isEmpty(arr) {
        return arr && 0 === arr.length;
      }
      function keys(obj) {
        return null == obj ? [] : Object.keys(obj);
      }
      function values(obj) {
        for (var vals = [], keys = Object.keys(obj), i = 0; i < keys.length; i++) vals.push(obj[keys[i]]);
        return vals;
      }
      function mapValues(obj, callback) {
        for (var result = [], objKeys = keys(obj), idx = 0; idx < objKeys.length; idx++) {
          var currKey = objKeys[idx];
          result.push(callback.call(null, obj[currKey], currKey));
        }
        return result;
      }
      function map(arr, callback) {
        for (var result = [], idx = 0; idx < arr.length; idx++) result.push(callback.call(null, arr[idx], idx));
        return result;
      }
      function flatten(arr) {
        for (var result = [], idx = 0; idx < arr.length; idx++) {
          var currItem = arr[idx];
          Array.isArray(currItem) ? result = result.concat(flatten(currItem)) : result.push(currItem);
        }
        return result;
      }
      function first(arr) {
        return isEmpty(arr) ? void 0 : arr[0];
      }
      function last(arr) {
        var len = arr && arr.length;
        return len ? arr[len - 1] : void 0;
      }
      function forEach(collection, iteratorCallback) {
        if (Array.isArray(collection)) for (var i = 0; i < collection.length; i++) iteratorCallback.call(null, collection[i], i); else {
          if (!isObject(collection)) throw Error("non exhaustive match");
          var colKeys = keys(collection);
          for (i = 0; i < colKeys.length; i++) {
            var key = colKeys[i], value = collection[key];
            iteratorCallback.call(null, value, key);
          }
        }
      }
      function isString(item) {
        return "string" == typeof item;
      }
      function isUndefined(item) {
        return void 0 === item;
      }
      function isFunction(item) {
        return item instanceof Function;
      }
      function drop(arr, howMuch) {
        return void 0 === howMuch && (howMuch = 1), arr.slice(howMuch, arr.length);
      }
      function dropRight(arr, howMuch) {
        return void 0 === howMuch && (howMuch = 1), arr.slice(0, arr.length - howMuch);
      }
      function filter(arr, predicate) {
        var result = [];
        if (Array.isArray(arr)) for (var i = 0; i < arr.length; i++) {
          var item = arr[i];
          predicate.call(null, item) && result.push(item);
        }
        return result;
      }
      function reject(arr, predicate) {
        return filter(arr, (function(item) {
          return !predicate(item);
        }));
      }
      function pick(obj, predicate) {
        for (var keys = Object.keys(obj), result = {}, i = 0; i < keys.length; i++) {
          var currKey = keys[i], currItem = obj[currKey];
          predicate(currItem) && (result[currKey] = currItem);
        }
        return result;
      }
      function has(obj, prop) {
        return !!isObject(obj) && obj.hasOwnProperty(prop);
      }
      function contains(arr, item) {
        return void 0 !== find(arr, (function(currItem) {
          return currItem === item;
        }));
      }
      function cloneArr(arr) {
        for (var newArr = [], i = 0; i < arr.length; i++) newArr.push(arr[i]);
        return newArr;
      }
      function cloneObj(obj) {
        var clonedObj = {};
        for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (clonedObj[key] = obj[key]);
        return clonedObj;
      }
      function find(arr, predicate) {
        for (var i = 0; i < arr.length; i++) {
          var item = arr[i];
          if (predicate.call(null, item)) return item;
        }
      }
      function findAll(arr, predicate) {
        for (var found = [], i = 0; i < arr.length; i++) {
          var item = arr[i];
          predicate.call(null, item) && found.push(item);
        }
        return found;
      }
      function reduce(arrOrObj, iterator, initial) {
        for (var isArr = Array.isArray(arrOrObj), vals = isArr ? arrOrObj : values(arrOrObj), objKeys = isArr ? [] : keys(arrOrObj), accumulator = initial, i = 0; i < vals.length; i++) accumulator = iterator.call(null, accumulator, vals[i], isArr ? i : objKeys[i]);
        return accumulator;
      }
      function compact(arr) {
        return reject(arr, (function(item) {
          return null == item;
        }));
      }
      function uniq(arr, identity) {
        void 0 === identity && (identity = function(item) {
          return item;
        });
        var identities = [];
        return reduce(arr, (function(result, currItem) {
          var currIdentity = identity(currItem);
          return contains(identities, currIdentity) ? result : (identities.push(currIdentity), 
          result.concat(currItem));
        }), []);
      }
      function partial(func) {
        for (var restArgs = [], _i = 1; _i < arguments.length; _i++) restArgs[_i - 1] = arguments[_i];
        var firstArg = [ null ], allArgs = firstArg.concat(restArgs);
        return Function.bind.apply(func, allArgs);
      }
      function isArray(obj) {
        return Array.isArray(obj);
      }
      function isRegExp(obj) {
        return obj instanceof RegExp;
      }
      function isObject(obj) {
        return obj instanceof Object;
      }
      function every(arr, predicate) {
        for (var i = 0; i < arr.length; i++) if (!predicate(arr[i], i)) return !1;
        return !0;
      }
      function difference(arr, values) {
        return reject(arr, (function(item) {
          return contains(values, item);
        }));
      }
      function some(arr, predicate) {
        for (var i = 0; i < arr.length; i++) if (predicate(arr[i])) return !0;
        return !1;
      }
      function indexOf(arr, value) {
        for (var i = 0; i < arr.length; i++) if (arr[i] === value) return i;
        return -1;
      }
      function sortBy(arr, orderFunc) {
        var result = cloneArr(arr);
        return result.sort((function(a, b) {
          return orderFunc(a) - orderFunc(b);
        })), result;
      }
      function zipObject(keys, values) {
        if (keys.length !== values.length) throw Error("can't zipObject with different number of keys and values!");
        for (var result = {}, i = 0; i < keys.length; i++) result[keys[i]] = values[i];
        return result;
      }
      function assign(target) {
        for (var sources = [], _i = 1; _i < arguments.length; _i++) sources[_i - 1] = arguments[_i];
        for (var i = 0; i < sources.length; i++) for (var curSource = sources[i], currSourceKeys = keys(curSource), j = 0; j < currSourceKeys.length; j++) {
          var currKey = currSourceKeys[j];
          target[currKey] = curSource[currKey];
        }
        return target;
      }
      function assignNoOverwrite(target) {
        for (var sources = [], _i = 1; _i < arguments.length; _i++) sources[_i - 1] = arguments[_i];
        for (var i = 0; i < sources.length; i++) for (var curSource = sources[i], currSourceKeys = keys(curSource), j = 0; j < currSourceKeys.length; j++) {
          var currKey = currSourceKeys[j];
          has(target, currKey) || (target[currKey] = curSource[currKey]);
        }
        return target;
      }
      function defaults() {
        for (var sources = [], _i = 0; _i < arguments.length; _i++) sources[_i] = arguments[_i];
        return assignNoOverwrite.apply(null, [ {} ].concat(sources));
      }
      function groupBy(arr, groupKeyFunc) {
        var result = {};
        return forEach(arr, (function(item) {
          var currGroupKey = groupKeyFunc(item), currGroupArr = result[currGroupKey];
          currGroupArr ? currGroupArr.push(item) : result[currGroupKey] = [ item ];
        })), result;
      }
      function merge(obj1, obj2) {
        for (var result = cloneObj(obj1), keys2 = keys(obj2), i = 0; i < keys2.length; i++) {
          var key = keys2[i], value = obj2[key];
          result[key] = value;
        }
        return result;
      }
      function NOOP() {}
      function IDENTITY(item) {
        return item;
      }
      function packArray(holeyArr) {
        for (var result = [], i = 0; i < holeyArr.length; i++) {
          var orgValue = holeyArr[i];
          result.push(void 0 !== orgValue ? orgValue : void 0);
        }
        return result;
      }
      function PRINT_ERROR(msg) {
        console && console.error && console.error("Error: " + msg);
      }
      function PRINT_WARNING(msg) {
        console && console.warn && console.warn("Warning: " + msg);
      }
      function isES2015MapSupported() {
        return "function" == typeof Map;
      }
      function applyMixins(derivedCtor, baseCtors) {
        baseCtors.forEach((function(baseCtor) {
          var baseProto = baseCtor.prototype;
          Object.getOwnPropertyNames(baseProto).forEach((function(propName) {
            if ("constructor" !== propName) {
              var basePropDescriptor = Object.getOwnPropertyDescriptor(baseProto, propName);
              basePropDescriptor && (basePropDescriptor.get || basePropDescriptor.set) ? Object.defineProperty(derivedCtor.prototype, propName, basePropDescriptor) : derivedCtor.prototype[propName] = baseCtor.prototype[propName];
            }
          }));
        }));
      }
      function toFastProperties(toBecomeFast) {
        function FakeConstructor() {}
        FakeConstructor.prototype = toBecomeFast;
        var fakeInstance = new FakeConstructor;
        function fakeAccess() {
          return typeof fakeInstance.bar;
        }
        return fakeAccess(), fakeAccess(), toBecomeFast;
      }
      function peek(arr) {
        return arr[arr.length - 1];
      }
      function timer(func) {
        var start = (new Date).getTime(), val = func();
        return {
          time: (new Date).getTime() - start,
          value: val
        };
      }
      __webpack_require__.d(__webpack_exports__, {
        Cl: () => cloneObj,
        Cw: () => drop,
        Ed: () => forEach,
        G: () => some,
        HD: () => isString,
        HT: () => timer,
        Kj: () => isRegExp,
        Kn: () => isObject,
        Oq: () => findAll,
        Ps: () => first,
        Q8: () => mapValues,
        Qw: () => cloneArr,
        SV: () => toFastProperties,
        TS: () => merge,
        UI: () => map,
        VO: () => values,
        WB: () => PRINT_ERROR,
        Wd: () => IDENTITY,
        X0: () => packArray,
        XP: () => keys,
        Z$: () => last,
        ce: () => defaults,
        cq: () => indexOf,
        d1: () => reject,
        dG: () => NOOP,
        dU: () => isES2015MapSupported,
        e$: () => has,
        e5: () => difference,
        ef: () => applyMixins,
        ei: () => pick,
        f0: () => assign,
        fj: () => peek,
        hX: () => filter,
        j7: () => dropRight,
        jj: () => uniq,
        kJ: () => isArray,
        mf: () => isFunction,
        o8: () => isUndefined,
        oA: () => compact,
        r3: () => contains,
        rr: () => PRINT_WARNING,
        sE: () => find,
        u4: () => reduce,
        vM: () => groupBy,
        xH: () => flatten,
        xb: () => isEmpty,
        yW: () => every
      });
    },
    544: module => {
      function RegExpParser() {}
      RegExpParser.prototype.saveState = function() {
        return {
          idx: this.idx,
          input: this.input,
          groupIdx: this.groupIdx
        };
      }, RegExpParser.prototype.restoreState = function(newState) {
        this.idx = newState.idx, this.input = newState.input, this.groupIdx = newState.groupIdx;
      }, RegExpParser.prototype.pattern = function(input) {
        this.idx = 0, this.input = input, this.groupIdx = 0, this.consumeChar("/");
        var value = this.disjunction();
        this.consumeChar("/");
        for (var flags = {
          type: "Flags",
          loc: {
            begin: this.idx,
            end: input.length
          },
          global: !1,
          ignoreCase: !1,
          multiLine: !1,
          unicode: !1,
          sticky: !1
        }; this.isRegExpFlag(); ) switch (this.popChar()) {
         case "g":
          addFlag(flags, "global");
          break;

         case "i":
          addFlag(flags, "ignoreCase");
          break;

         case "m":
          addFlag(flags, "multiLine");
          break;

         case "u":
          addFlag(flags, "unicode");
          break;

         case "y":
          addFlag(flags, "sticky");
        }
        if (this.idx !== this.input.length) throw Error("Redundant input: " + this.input.substring(this.idx));
        return {
          type: "Pattern",
          flags,
          value,
          loc: this.loc(0)
        };
      }, RegExpParser.prototype.disjunction = function() {
        var alts = [], begin = this.idx;
        for (alts.push(this.alternative()); "|" === this.peekChar(); ) this.consumeChar("|"), 
        alts.push(this.alternative());
        return {
          type: "Disjunction",
          value: alts,
          loc: this.loc(begin)
        };
      }, RegExpParser.prototype.alternative = function() {
        for (var terms = [], begin = this.idx; this.isTerm(); ) terms.push(this.term());
        return {
          type: "Alternative",
          value: terms,
          loc: this.loc(begin)
        };
      }, RegExpParser.prototype.term = function() {
        return this.isAssertion() ? this.assertion() : this.atom();
      }, RegExpParser.prototype.assertion = function() {
        var begin = this.idx;
        switch (this.popChar()) {
         case "^":
          return {
            type: "StartAnchor",
            loc: this.loc(begin)
          };

         case "$":
          return {
            type: "EndAnchor",
            loc: this.loc(begin)
          };

         case "\\":
          switch (this.popChar()) {
           case "b":
            return {
              type: "WordBoundary",
              loc: this.loc(begin)
            };

           case "B":
            return {
              type: "NonWordBoundary",
              loc: this.loc(begin)
            };
          }
          throw Error("Invalid Assertion Escape");

         case "(":
          var type;
          switch (this.consumeChar("?"), this.popChar()) {
           case "=":
            type = "Lookahead";
            break;

           case "!":
            type = "NegativeLookahead";
          }
          ASSERT_EXISTS(type);
          var disjunction = this.disjunction();
          return this.consumeChar(")"), {
            type,
            value: disjunction,
            loc: this.loc(begin)
          };
        }
        !function() {
          throw Error("Internal Error - Should never get here!");
        }();
      }, RegExpParser.prototype.quantifier = function(isBacktracking) {
        var range, begin = this.idx;
        switch (this.popChar()) {
         case "*":
          range = {
            atLeast: 0,
            atMost: 1 / 0
          };
          break;

         case "+":
          range = {
            atLeast: 1,
            atMost: 1 / 0
          };
          break;

         case "?":
          range = {
            atLeast: 0,
            atMost: 1
          };
          break;

         case "{":
          var atLeast = this.integerIncludingZero();
          switch (this.popChar()) {
           case "}":
            range = {
              atLeast,
              atMost: atLeast
            };
            break;

           case ",":
            range = this.isDigit() ? {
              atLeast,
              atMost: this.integerIncludingZero()
            } : {
              atLeast,
              atMost: 1 / 0
            }, this.consumeChar("}");
          }
          if (!0 === isBacktracking && void 0 === range) return;
          ASSERT_EXISTS(range);
        }
        if (!0 !== isBacktracking || void 0 !== range) return ASSERT_EXISTS(range), "?" === this.peekChar(0) ? (this.consumeChar("?"), 
        range.greedy = !1) : range.greedy = !0, range.type = "Quantifier", range.loc = this.loc(begin), 
        range;
      }, RegExpParser.prototype.atom = function() {
        var atom, begin = this.idx;
        switch (this.peekChar()) {
         case ".":
          atom = this.dotAll();
          break;

         case "\\":
          atom = this.atomEscape();
          break;

         case "[":
          atom = this.characterClass();
          break;

         case "(":
          atom = this.group();
        }
        return void 0 === atom && this.isPatternCharacter() && (atom = this.patternCharacter()), 
        ASSERT_EXISTS(atom), atom.loc = this.loc(begin), this.isQuantifier() && (atom.quantifier = this.quantifier()), 
        atom;
      }, RegExpParser.prototype.dotAll = function() {
        return this.consumeChar("."), {
          type: "Set",
          complement: !0,
          value: [ cc("\n"), cc("\r"), cc("\u2028"), cc("\u2029") ]
        };
      }, RegExpParser.prototype.atomEscape = function() {
        switch (this.consumeChar("\\"), this.peekChar()) {
         case "1":
         case "2":
         case "3":
         case "4":
         case "5":
         case "6":
         case "7":
         case "8":
         case "9":
          return this.decimalEscapeAtom();

         case "d":
         case "D":
         case "s":
         case "S":
         case "w":
         case "W":
          return this.characterClassEscape();

         case "f":
         case "n":
         case "r":
         case "t":
         case "v":
          return this.controlEscapeAtom();

         case "c":
          return this.controlLetterEscapeAtom();

         case "0":
          return this.nulCharacterAtom();

         case "x":
          return this.hexEscapeSequenceAtom();

         case "u":
          return this.regExpUnicodeEscapeSequenceAtom();

         default:
          return this.identityEscapeAtom();
        }
      }, RegExpParser.prototype.decimalEscapeAtom = function() {
        return {
          type: "GroupBackReference",
          value: this.positiveInteger()
        };
      }, RegExpParser.prototype.characterClassEscape = function() {
        var set, complement = !1;
        switch (this.popChar()) {
         case "d":
          set = digitsCharCodes;
          break;

         case "D":
          set = digitsCharCodes, complement = !0;
          break;

         case "s":
          set = whitespaceCodes;
          break;

         case "S":
          set = whitespaceCodes, complement = !0;
          break;

         case "w":
          set = wordCharCodes;
          break;

         case "W":
          set = wordCharCodes, complement = !0;
        }
        return ASSERT_EXISTS(set), {
          type: "Set",
          value: set,
          complement
        };
      }, RegExpParser.prototype.controlEscapeAtom = function() {
        var escapeCode;
        switch (this.popChar()) {
         case "f":
          escapeCode = cc("\f");
          break;

         case "n":
          escapeCode = cc("\n");
          break;

         case "r":
          escapeCode = cc("\r");
          break;

         case "t":
          escapeCode = cc("\t");
          break;

         case "v":
          escapeCode = cc("\v");
        }
        return ASSERT_EXISTS(escapeCode), {
          type: "Character",
          value: escapeCode
        };
      }, RegExpParser.prototype.controlLetterEscapeAtom = function() {
        this.consumeChar("c");
        var letter = this.popChar();
        if (!1 === /[a-zA-Z]/.test(letter)) throw Error("Invalid ");
        return {
          type: "Character",
          value: letter.toUpperCase().charCodeAt(0) - 64
        };
      }, RegExpParser.prototype.nulCharacterAtom = function() {
        return this.consumeChar("0"), {
          type: "Character",
          value: cc("\0")
        };
      }, RegExpParser.prototype.hexEscapeSequenceAtom = function() {
        return this.consumeChar("x"), this.parseHexDigits(2);
      }, RegExpParser.prototype.regExpUnicodeEscapeSequenceAtom = function() {
        return this.consumeChar("u"), this.parseHexDigits(4);
      }, RegExpParser.prototype.identityEscapeAtom = function() {
        return {
          type: "Character",
          value: cc(this.popChar())
        };
      }, RegExpParser.prototype.classPatternCharacterAtom = function() {
        switch (this.peekChar()) {
         case "\n":
         case "\r":
         case "\u2028":
         case "\u2029":
         case "\\":
         case "]":
          throw Error("TBD");

         default:
          return {
            type: "Character",
            value: cc(this.popChar())
          };
        }
      }, RegExpParser.prototype.characterClass = function() {
        var set = [], complement = !1;
        for (this.consumeChar("["), "^" === this.peekChar(0) && (this.consumeChar("^"), 
        complement = !0); this.isClassAtom(); ) {
          var from = this.classAtom();
          if ("Character" === from.type && this.isRangeDash()) {
            this.consumeChar("-");
            var to = this.classAtom();
            if ("Character" === to.type) {
              if (to.value < from.value) throw Error("Range out of order in character class");
              set.push({
                from: from.value,
                to: to.value
              });
            } else insertToSet(from.value, set), set.push(cc("-")), insertToSet(to.value, set);
          } else insertToSet(from.value, set);
        }
        return this.consumeChar("]"), {
          type: "Set",
          complement,
          value: set
        };
      }, RegExpParser.prototype.classAtom = function() {
        switch (this.peekChar()) {
         case "]":
         case "\n":
         case "\r":
         case "\u2028":
         case "\u2029":
          throw Error("TBD");

         case "\\":
          return this.classEscape();

         default:
          return this.classPatternCharacterAtom();
        }
      }, RegExpParser.prototype.classEscape = function() {
        switch (this.consumeChar("\\"), this.peekChar()) {
         case "b":
          return this.consumeChar("b"), {
            type: "Character",
            value: cc("\b")
          };

         case "d":
         case "D":
         case "s":
         case "S":
         case "w":
         case "W":
          return this.characterClassEscape();

         case "f":
         case "n":
         case "r":
         case "t":
         case "v":
          return this.controlEscapeAtom();

         case "c":
          return this.controlLetterEscapeAtom();

         case "0":
          return this.nulCharacterAtom();

         case "x":
          return this.hexEscapeSequenceAtom();

         case "u":
          return this.regExpUnicodeEscapeSequenceAtom();

         default:
          return this.identityEscapeAtom();
        }
      }, RegExpParser.prototype.group = function() {
        var capturing = !0;
        if (this.consumeChar("("), "?" === this.peekChar(0)) this.consumeChar("?"), this.consumeChar(":"), 
        capturing = !1; else this.groupIdx++;
        var value = this.disjunction();
        this.consumeChar(")");
        var groupAst = {
          type: "Group",
          capturing,
          value
        };
        return capturing && (groupAst.idx = this.groupIdx), groupAst;
      }, RegExpParser.prototype.positiveInteger = function() {
        var number = this.popChar();
        if (!1 === decimalPatternNoZero.test(number)) throw Error("Expecting a positive integer");
        for (;decimalPattern.test(this.peekChar(0)); ) number += this.popChar();
        return parseInt(number, 10);
      }, RegExpParser.prototype.integerIncludingZero = function() {
        var number = this.popChar();
        if (!1 === decimalPattern.test(number)) throw Error("Expecting an integer");
        for (;decimalPattern.test(this.peekChar(0)); ) number += this.popChar();
        return parseInt(number, 10);
      }, RegExpParser.prototype.patternCharacter = function() {
        var nextChar = this.popChar();
        switch (nextChar) {
         case "\n":
         case "\r":
         case "\u2028":
         case "\u2029":
         case "^":
         case "$":
         case "\\":
         case ".":
         case "*":
         case "+":
         case "?":
         case "(":
         case ")":
         case "[":
         case "|":
          throw Error("TBD");

         default:
          return {
            type: "Character",
            value: cc(nextChar)
          };
        }
      }, RegExpParser.prototype.isRegExpFlag = function() {
        switch (this.peekChar(0)) {
         case "g":
         case "i":
         case "m":
         case "u":
         case "y":
          return !0;

         default:
          return !1;
        }
      }, RegExpParser.prototype.isRangeDash = function() {
        return "-" === this.peekChar() && this.isClassAtom(1);
      }, RegExpParser.prototype.isDigit = function() {
        return decimalPattern.test(this.peekChar(0));
      }, RegExpParser.prototype.isClassAtom = function(howMuch) {
        switch (void 0 === howMuch && (howMuch = 0), this.peekChar(howMuch)) {
         case "]":
         case "\n":
         case "\r":
         case "\u2028":
         case "\u2029":
          return !1;

         default:
          return !0;
        }
      }, RegExpParser.prototype.isTerm = function() {
        return this.isAtom() || this.isAssertion();
      }, RegExpParser.prototype.isAtom = function() {
        if (this.isPatternCharacter()) return !0;
        switch (this.peekChar(0)) {
         case ".":
         case "\\":
         case "[":
         case "(":
          return !0;

         default:
          return !1;
        }
      }, RegExpParser.prototype.isAssertion = function() {
        switch (this.peekChar(0)) {
         case "^":
         case "$":
          return !0;

         case "\\":
          switch (this.peekChar(1)) {
           case "b":
           case "B":
            return !0;

           default:
            return !1;
          }

         case "(":
          return "?" === this.peekChar(1) && ("=" === this.peekChar(2) || "!" === this.peekChar(2));

         default:
          return !1;
        }
      }, RegExpParser.prototype.isQuantifier = function() {
        var prevState = this.saveState();
        try {
          return void 0 !== this.quantifier(!0);
        } catch (e) {
          return !1;
        } finally {
          this.restoreState(prevState);
        }
      }, RegExpParser.prototype.isPatternCharacter = function() {
        switch (this.peekChar()) {
         case "^":
         case "$":
         case "\\":
         case ".":
         case "*":
         case "+":
         case "?":
         case "(":
         case ")":
         case "[":
         case "|":
         case "/":
         case "\n":
         case "\r":
         case "\u2028":
         case "\u2029":
          return !1;

         default:
          return !0;
        }
      }, RegExpParser.prototype.parseHexDigits = function(howMany) {
        for (var hexString = "", i = 0; i < howMany; i++) {
          var hexChar = this.popChar();
          if (!1 === hexDigitPattern.test(hexChar)) throw Error("Expecting a HexDecimal digits");
          hexString += hexChar;
        }
        return {
          type: "Character",
          value: parseInt(hexString, 16)
        };
      }, RegExpParser.prototype.peekChar = function(howMuch) {
        return void 0 === howMuch && (howMuch = 0), this.input[this.idx + howMuch];
      }, RegExpParser.prototype.popChar = function() {
        var nextChar = this.peekChar(0);
        return this.consumeChar(), nextChar;
      }, RegExpParser.prototype.consumeChar = function(char) {
        if (void 0 !== char && this.input[this.idx] !== char) throw Error("Expected: '" + char + "' but found: '" + this.input[this.idx] + "' at offset: " + this.idx);
        if (this.idx >= this.input.length) throw Error("Unexpected end of input");
        this.idx++;
      }, RegExpParser.prototype.loc = function(begin) {
        return {
          begin,
          end: this.idx
        };
      };
      var i, hexDigitPattern = /[0-9a-fA-F]/, decimalPattern = /[0-9]/, decimalPatternNoZero = /[1-9]/;
      function cc(char) {
        return char.charCodeAt(0);
      }
      function insertToSet(item, set) {
        void 0 !== item.length ? item.forEach((function(subItem) {
          set.push(subItem);
        })) : set.push(item);
      }
      function addFlag(flagObj, flagKey) {
        if (!0 === flagObj[flagKey]) throw "duplicate flag " + flagKey;
        flagObj[flagKey] = !0;
      }
      function ASSERT_EXISTS(obj) {
        if (void 0 === obj) throw Error("Internal Error - Should never get here!");
      }
      var digitsCharCodes = [];
      for (i = cc("0"); i <= cc("9"); i++) digitsCharCodes.push(i);
      var wordCharCodes = [ cc("_") ].concat(digitsCharCodes);
      for (i = cc("a"); i <= cc("z"); i++) wordCharCodes.push(i);
      for (i = cc("A"); i <= cc("Z"); i++) wordCharCodes.push(i);
      var whitespaceCodes = [ cc(" "), cc("\f"), cc("\n"), cc("\r"), cc("\t"), cc("\v"), cc("\t"), cc(" "), cc(" "), cc(" "), cc(" "), cc(" "), cc(" "), cc(" "), cc(" "), cc(" "), cc(" "), cc(" "), cc(" "), cc(" "), cc("\u2028"), cc("\u2029"), cc(" "), cc(" "), cc("　"), cc("\ufeff") ];
      function BaseRegExpVisitor() {}
      BaseRegExpVisitor.prototype.visitChildren = function(node) {
        for (var key in node) {
          var child = node[key];
          node.hasOwnProperty(key) && (void 0 !== child.type ? this.visit(child) : Array.isArray(child) && child.forEach((function(subChild) {
            this.visit(subChild);
          }), this));
        }
      }, BaseRegExpVisitor.prototype.visit = function(node) {
        switch (node.type) {
         case "Pattern":
          this.visitPattern(node);
          break;

         case "Flags":
          this.visitFlags(node);
          break;

         case "Disjunction":
          this.visitDisjunction(node);
          break;

         case "Alternative":
          this.visitAlternative(node);
          break;

         case "StartAnchor":
          this.visitStartAnchor(node);
          break;

         case "EndAnchor":
          this.visitEndAnchor(node);
          break;

         case "WordBoundary":
          this.visitWordBoundary(node);
          break;

         case "NonWordBoundary":
          this.visitNonWordBoundary(node);
          break;

         case "Lookahead":
          this.visitLookahead(node);
          break;

         case "NegativeLookahead":
          this.visitNegativeLookahead(node);
          break;

         case "Character":
          this.visitCharacter(node);
          break;

         case "Set":
          this.visitSet(node);
          break;

         case "Group":
          this.visitGroup(node);
          break;

         case "GroupBackReference":
          this.visitGroupBackReference(node);
          break;

         case "Quantifier":
          this.visitQuantifier(node);
        }
        this.visitChildren(node);
      }, BaseRegExpVisitor.prototype.visitPattern = function(node) {}, BaseRegExpVisitor.prototype.visitFlags = function(node) {}, 
      BaseRegExpVisitor.prototype.visitDisjunction = function(node) {}, BaseRegExpVisitor.prototype.visitAlternative = function(node) {}, 
      BaseRegExpVisitor.prototype.visitStartAnchor = function(node) {}, BaseRegExpVisitor.prototype.visitEndAnchor = function(node) {}, 
      BaseRegExpVisitor.prototype.visitWordBoundary = function(node) {}, BaseRegExpVisitor.prototype.visitNonWordBoundary = function(node) {}, 
      BaseRegExpVisitor.prototype.visitLookahead = function(node) {}, BaseRegExpVisitor.prototype.visitNegativeLookahead = function(node) {}, 
      BaseRegExpVisitor.prototype.visitCharacter = function(node) {}, BaseRegExpVisitor.prototype.visitSet = function(node) {}, 
      BaseRegExpVisitor.prototype.visitGroup = function(node) {}, BaseRegExpVisitor.prototype.visitGroupBackReference = function(node) {}, 
      BaseRegExpVisitor.prototype.visitQuantifier = function(node) {}, module.exports = {
        RegExpParser,
        BaseRegExpVisitor,
        VERSION: "0.5.0"
      };
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
  __webpack_require__.d = (exports, definition) => {
    for (var key in definition) __webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key) && Object.defineProperty(exports, key, {
      enumerable: !0,
      get: definition[key]
    });
  }, __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop), 
  __webpack_require__.r = exports => {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(exports, "__esModule", {
      value: !0
    });
  };
  var __webpack_exports__ = __webpack_require__(650);
  module.exports = __webpack_exports__;
})();