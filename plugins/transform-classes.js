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
    4321: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(pathOrNode) {
        const node = pathOrNode.node || pathOrNode;
        if ((({leadingComments}) => !!leadingComments && leadingComments.some((comment => /[@#]__PURE__/.test(comment.value))))(node)) return;
        addComment(node, "leading", "#__PURE__");
      };
      var _t = __webpack_require__(8459);
      const {addComment} = _t;
    },
    1692: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0, exports.skipAllButComputedKey = skipAllButComputedKey;
      var _t = __webpack_require__(8459);
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
      var _template = __webpack_require__(4847), _t = __webpack_require__(8459);
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
    9693: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        return e && Object.keys(e).forEach((function(k) {
          if ("default" !== k) {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: !0,
              get: function() {
                return e[k];
              }
            });
          }
        })), n.default = e, Object.freeze(n);
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      var _t__namespace = _interopNamespace(__webpack_require__(8459));
      function willPathCastToBoolean(path) {
        const maybeWrapped = path, {node, parentPath} = maybeWrapped;
        if (parentPath.isLogicalExpression()) {
          const {operator, right} = parentPath.node;
          if ("&&" === operator || "||" === operator || "??" === operator && node === right) return willPathCastToBoolean(parentPath);
        }
        if (parentPath.isSequenceExpression()) {
          const {expressions} = parentPath.node;
          return expressions[expressions.length - 1] !== node || willPathCastToBoolean(parentPath);
        }
        return parentPath.isConditional({
          test: node
        }) || parentPath.isUnaryExpression({
          operator: "!"
        }) || parentPath.isLoop({
          test: node
        });
      }
      const {LOGICAL_OPERATORS, arrowFunctionExpression, assignmentExpression, binaryExpression, booleanLiteral, callExpression, cloneNode, conditionalExpression, identifier, isMemberExpression, isOptionalCallExpression, isOptionalMemberExpression, isUpdateExpression, logicalExpression, memberExpression, nullLiteral, optionalCallExpression, optionalMemberExpression, sequenceExpression, updateExpression} = _t__namespace;
      class AssignmentMemoiser {
        constructor() {
          this._map = void 0, this._map = new WeakMap;
        }
        has(key) {
          return this._map.has(key);
        }
        get(key) {
          if (!this.has(key)) return;
          const record = this._map.get(key), {value} = record;
          return record.count--, 0 === record.count ? assignmentExpression("=", value, key) : value;
        }
        set(key, value, count) {
          return this._map.set(key, {
            count,
            value
          });
        }
      }
      function toNonOptional(path, base) {
        const {node} = path;
        if (isOptionalMemberExpression(node)) return memberExpression(base, node.property, node.computed);
        if (path.isOptionalCallExpression()) {
          const callee = path.get("callee");
          if (path.node.optional && callee.isOptionalMemberExpression()) {
            const {object} = callee.node, context = path.scope.maybeGenerateMemoised(object) || object;
            return callee.get("object").replaceWith(assignmentExpression("=", context, object)), 
            callExpression(memberExpression(base, identifier("call")), [ context, ...path.node.arguments ]);
          }
          return callExpression(base, path.node.arguments);
        }
        return path.node;
      }
      const handle = {
        memoise() {},
        handle(member, noDocumentAll) {
          const {node, parent, parentPath, scope} = member;
          if (member.isOptionalMemberExpression()) {
            if (function(path) {
              for (;path && !path.isProgram(); ) {
                const {parentPath, container, listKey} = path, parentNode = parentPath.node;
                if (listKey) {
                  if (container !== parentNode[listKey]) return !0;
                } else if (container !== parentNode) return !0;
                path = parentPath;
              }
              return !1;
            }(member)) return;
            const endPath = member.find((({node, parent}) => isOptionalMemberExpression(parent) ? parent.optional || parent.object !== node : !isOptionalCallExpression(parent) || (node !== member.node && parent.optional || parent.callee !== node)));
            if (scope.path.isPattern()) return void endPath.replaceWith(callExpression(arrowFunctionExpression([], endPath.node), []));
            const willEndPathCastToBoolean = willPathCastToBoolean(endPath), rootParentPath = endPath.parentPath;
            if (rootParentPath.isUpdateExpression({
              argument: node
            }) || rootParentPath.isAssignmentExpression({
              left: node
            })) throw member.buildCodeFrameError("can't handle assignment");
            const isDeleteOperation = rootParentPath.isUnaryExpression({
              operator: "delete"
            });
            if (isDeleteOperation && endPath.isOptionalMemberExpression() && endPath.get("property").isPrivateName()) throw member.buildCodeFrameError("can't delete a private class element");
            let startingOptional = member;
            for (;;) if (startingOptional.isOptionalMemberExpression()) {
              if (startingOptional.node.optional) break;
              startingOptional = startingOptional.get("object");
            } else {
              if (!startingOptional.isOptionalCallExpression()) throw new Error(`Internal error: unexpected ${startingOptional.node.type}`);
              if (startingOptional.node.optional) break;
              startingOptional = startingOptional.get("callee");
            }
            const startingProp = startingOptional.isOptionalMemberExpression() ? "object" : "callee", startingNode = startingOptional.node[startingProp], baseNeedsMemoised = scope.maybeGenerateMemoised(startingNode), baseRef = null != baseNeedsMemoised ? baseNeedsMemoised : startingNode, parentIsOptionalCall = parentPath.isOptionalCallExpression({
              callee: node
            }), isOptionalCall = parent => parentIsOptionalCall, parentIsCall = parentPath.isCallExpression({
              callee: node
            });
            startingOptional.replaceWith(toNonOptional(startingOptional, baseRef)), isOptionalCall() ? parent.optional ? parentPath.replaceWith(this.optionalCall(member, parent.arguments)) : parentPath.replaceWith(this.call(member, parent.arguments)) : parentIsCall ? member.replaceWith(this.boundGet(member)) : member.replaceWith(this.get(member));
            let context, regular = member.node;
            for (let current = member; current !== endPath; ) {
              const parentPath = current.parentPath;
              if (parentPath === endPath && isOptionalCall() && parent.optional) {
                regular = parentPath.node;
                break;
              }
              regular = toNonOptional(parentPath, regular), current = parentPath;
            }
            const endParentPath = endPath.parentPath;
            if (isMemberExpression(regular) && endParentPath.isOptionalCallExpression({
              callee: endPath.node,
              optional: !0
            })) {
              const {object} = regular;
              context = member.scope.maybeGenerateMemoised(object), context && (regular.object = assignmentExpression("=", context, object));
            }
            let replacementPath = endPath;
            isDeleteOperation && (replacementPath = endParentPath, regular = endParentPath.node);
            const baseMemoised = baseNeedsMemoised ? assignmentExpression("=", cloneNode(baseRef), cloneNode(startingNode)) : cloneNode(baseRef);
            if (willEndPathCastToBoolean) {
              let nonNullishCheck;
              nonNullishCheck = noDocumentAll ? binaryExpression("!=", baseMemoised, nullLiteral()) : logicalExpression("&&", binaryExpression("!==", baseMemoised, nullLiteral()), binaryExpression("!==", cloneNode(baseRef), scope.buildUndefinedNode())), 
              replacementPath.replaceWith(logicalExpression("&&", nonNullishCheck, regular));
            } else {
              let nullishCheck;
              nullishCheck = noDocumentAll ? binaryExpression("==", baseMemoised, nullLiteral()) : logicalExpression("||", binaryExpression("===", baseMemoised, nullLiteral()), binaryExpression("===", cloneNode(baseRef), scope.buildUndefinedNode())), 
              replacementPath.replaceWith(conditionalExpression(nullishCheck, isDeleteOperation ? booleanLiteral(!0) : scope.buildUndefinedNode(), regular));
            }
            if (context) {
              const endParent = endParentPath.node;
              endParentPath.replaceWith(optionalCallExpression(optionalMemberExpression(endParent.callee, identifier("call"), !1, !0), [ cloneNode(context), ...endParent.arguments ], !1));
            }
          } else {
            if (isUpdateExpression(parent, {
              argument: node
            })) {
              if (this.simpleSet) return void member.replaceWith(this.simpleSet(member));
              const {operator, prefix} = parent;
              this.memoise(member, 2);
              const ref = scope.generateUidIdentifierBasedOnNode(node);
              scope.push({
                id: ref
              });
              const seq = [ assignmentExpression("=", cloneNode(ref), this.get(member)) ];
              if (prefix) {
                seq.push(updateExpression(operator, cloneNode(ref), prefix));
                const value = sequenceExpression(seq);
                return void parentPath.replaceWith(this.set(member, value));
              }
              {
                const ref2 = scope.generateUidIdentifierBasedOnNode(node);
                scope.push({
                  id: ref2
                }), seq.push(assignmentExpression("=", cloneNode(ref2), updateExpression(operator, cloneNode(ref), prefix)), cloneNode(ref));
                const value = sequenceExpression(seq);
                return void parentPath.replaceWith(sequenceExpression([ this.set(member, value), cloneNode(ref2) ]));
              }
            }
            if (parentPath.isAssignmentExpression({
              left: node
            })) {
              if (this.simpleSet) return void member.replaceWith(this.simpleSet(member));
              const {operator, right: value} = parentPath.node;
              if ("=" === operator) parentPath.replaceWith(this.set(member, value)); else {
                const operatorTrunc = operator.slice(0, -1);
                LOGICAL_OPERATORS.includes(operatorTrunc) ? (this.memoise(member, 1), parentPath.replaceWith(logicalExpression(operatorTrunc, this.get(member), this.set(member, value)))) : (this.memoise(member, 2), 
                parentPath.replaceWith(this.set(member, binaryExpression(operatorTrunc, this.get(member), value))));
              }
            } else {
              if (!parentPath.isCallExpression({
                callee: node
              })) return parentPath.isOptionalCallExpression({
                callee: node
              }) ? scope.path.isPattern() ? void parentPath.replaceWith(callExpression(arrowFunctionExpression([], parentPath.node), [])) : void parentPath.replaceWith(this.optionalCall(member, parentPath.node.arguments)) : void (parentPath.isForXStatement({
                left: node
              }) || parentPath.isObjectProperty({
                value: node
              }) && parentPath.parentPath.isObjectPattern() || parentPath.isAssignmentPattern({
                left: node
              }) && parentPath.parentPath.isObjectProperty({
                value: parent
              }) && parentPath.parentPath.parentPath.isObjectPattern() || parentPath.isArrayPattern() || parentPath.isAssignmentPattern({
                left: node
              }) && parentPath.parentPath.isArrayPattern() || parentPath.isRestElement() ? member.replaceWith(this.destructureSet(member)) : parentPath.isTaggedTemplateExpression() ? member.replaceWith(this.boundGet(member)) : member.replaceWith(this.get(member)));
              parentPath.replaceWith(this.call(member, parentPath.node.arguments));
            }
          }
        }
      };
      exports.default = function(path, visitor, state) {
        path.traverse(visitor, Object.assign({}, handle, state, {
          memoiser: new AssignmentMemoiser
        }));
      };
    },
    3934: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(callee, thisNode, args, optional) {
        return 1 === args.length && isSpreadElement(args[0]) && isIdentifier(args[0].argument, {
          name: "arguments"
        }) ? optional ? optionalCallExpression(optionalMemberExpression(callee, identifier("apply"), !1, !0), [ thisNode, args[0].argument ], !1) : callExpression(memberExpression(callee, identifier("apply")), [ thisNode, args[0].argument ]) : optional ? optionalCallExpression(optionalMemberExpression(callee, identifier("call"), !1, !0), [ thisNode, ...args ], !1) : callExpression(memberExpression(callee, identifier("call")), [ thisNode, ...args ]);
      };
      var _t = __webpack_require__(8459);
      const {callExpression, identifier, isIdentifier, isSpreadElement, memberExpression, optionalCallExpression, optionalMemberExpression} = _t;
    },
    4149: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0, Object.defineProperty(exports, "environmentVisitor", {
        enumerable: !0,
        get: function() {
          return _helperEnvironmentVisitor.default;
        }
      }), Object.defineProperty(exports, "skipAllButComputedKey", {
        enumerable: !0,
        get: function() {
          return _helperEnvironmentVisitor.skipAllButComputedKey;
        }
      });
      var _traverse = __webpack_require__(7098), _helperMemberExpressionToFunctions = __webpack_require__(9693), _helperOptimiseCallExpression = __webpack_require__(3934), _helperEnvironmentVisitor = __webpack_require__(1692), _t = __webpack_require__(8459);
      const {assignmentExpression, booleanLiteral, callExpression, cloneNode, identifier, memberExpression, sequenceExpression, stringLiteral, thisExpression} = _t;
      function getPrototypeOfExpression(objectRef, isStatic, file, isPrivateMethod) {
        objectRef = cloneNode(objectRef);
        const targetRef = isStatic || isPrivateMethod ? objectRef : memberExpression(objectRef, identifier("prototype"));
        return callExpression(file.addHelper("getPrototypeOf"), [ targetRef ]);
      }
      const visitor = _traverse.default.visitors.merge([ _helperEnvironmentVisitor.default, {
        Super(path, state) {
          const {node, parentPath} = path;
          parentPath.isMemberExpression({
            object: node
          }) && state.handle(parentPath);
        }
      } ]), unshadowSuperBindingVisitor = _traverse.default.visitors.merge([ _helperEnvironmentVisitor.default, {
        Scopable(path, {refName}) {
          const binding = path.scope.getOwnBinding(refName);
          binding && binding.identifier.name === refName && path.scope.rename(refName);
        }
      } ]), specHandlers = {
        memoise(superMember, count) {
          const {scope, node} = superMember, {computed, property} = node;
          if (!computed) return;
          const memo = scope.maybeGenerateMemoised(property);
          memo && this.memoiser.set(property, memo, count);
        },
        prop(superMember) {
          const {computed, property} = superMember.node;
          return this.memoiser.has(property) ? cloneNode(this.memoiser.get(property)) : computed ? cloneNode(property) : stringLiteral(property.name);
        },
        get(superMember) {
          return this._get(superMember, this._getThisRefs());
        },
        _get(superMember, thisRefs) {
          const proto = getPrototypeOfExpression(this.getObjectRef(), this.isStatic, this.file, this.isPrivateMethod);
          return callExpression(this.file.addHelper("get"), [ thisRefs.memo ? sequenceExpression([ thisRefs.memo, proto ]) : proto, this.prop(superMember), thisRefs.this ]);
        },
        _getThisRefs() {
          if (!this.isDerivedConstructor) return {
            this: thisExpression()
          };
          const thisRef = this.scope.generateDeclaredUidIdentifier("thisSuper");
          return {
            memo: assignmentExpression("=", thisRef, thisExpression()),
            this: cloneNode(thisRef)
          };
        },
        set(superMember, value) {
          const thisRefs = this._getThisRefs(), proto = getPrototypeOfExpression(this.getObjectRef(), this.isStatic, this.file, this.isPrivateMethod);
          return callExpression(this.file.addHelper("set"), [ thisRefs.memo ? sequenceExpression([ thisRefs.memo, proto ]) : proto, this.prop(superMember), value, thisRefs.this, booleanLiteral(superMember.isInStrictMode()) ]);
        },
        destructureSet(superMember) {
          throw superMember.buildCodeFrameError("Destructuring to a super field is not supported yet.");
        },
        call(superMember, args) {
          const thisRefs = this._getThisRefs();
          return (0, _helperOptimiseCallExpression.default)(this._get(superMember, thisRefs), cloneNode(thisRefs.this), args, !1);
        },
        optionalCall(superMember, args) {
          const thisRefs = this._getThisRefs();
          return (0, _helperOptimiseCallExpression.default)(this._get(superMember, thisRefs), cloneNode(thisRefs.this), args, !0);
        }
      }, looseHandlers = Object.assign({}, specHandlers, {
        prop(superMember) {
          const {property} = superMember.node;
          return this.memoiser.has(property) ? cloneNode(this.memoiser.get(property)) : cloneNode(property);
        },
        get(superMember) {
          const {isStatic, getSuperRef} = this, {computed} = superMember.node, prop = this.prop(superMember);
          let object;
          var _getSuperRef, _getSuperRef2;
          isStatic ? object = null != (_getSuperRef = getSuperRef()) ? _getSuperRef : memberExpression(identifier("Function"), identifier("prototype")) : object = memberExpression(null != (_getSuperRef2 = getSuperRef()) ? _getSuperRef2 : identifier("Object"), identifier("prototype"));
          return memberExpression(object, prop, computed);
        },
        set(superMember, value) {
          const {computed} = superMember.node, prop = this.prop(superMember);
          return assignmentExpression("=", memberExpression(thisExpression(), prop, computed), value);
        },
        destructureSet(superMember) {
          const {computed} = superMember.node, prop = this.prop(superMember);
          return memberExpression(thisExpression(), prop, computed);
        },
        call(superMember, args) {
          return (0, _helperOptimiseCallExpression.default)(this.get(superMember), thisExpression(), args, !1);
        },
        optionalCall(superMember, args) {
          return (0, _helperOptimiseCallExpression.default)(this.get(superMember), thisExpression(), args, !0);
        }
      });
      exports.default = class {
        constructor(opts) {
          var _opts$constantSuper;
          const path = opts.methodPath;
          this.methodPath = path, this.isDerivedConstructor = path.isClassMethod({
            kind: "constructor"
          }) && !!opts.superRef, this.isStatic = path.isObjectMethod() || path.node.static || (null == path.isStaticBlock ? void 0 : path.isStaticBlock()), 
          this.isPrivateMethod = path.isPrivate() && path.isMethod(), this.file = opts.file, 
          this.constantSuper = null != (_opts$constantSuper = opts.constantSuper) ? _opts$constantSuper : opts.isLoose, 
          this.opts = opts;
        }
        getObjectRef() {
          return cloneNode(this.opts.objectRef || this.opts.getObjectRef());
        }
        getSuperRef() {
          return this.opts.superRef ? cloneNode(this.opts.superRef) : this.opts.getSuperRef ? cloneNode(this.opts.getSuperRef()) : void 0;
        }
        replace() {
          this.opts.refToPreserve && this.methodPath.traverse(unshadowSuperBindingVisitor, {
            refName: this.opts.refToPreserve.name
          });
          const handler = this.constantSuper ? looseHandlers : specHandlers;
          (0, _helperMemberExpressionToFunctions.default)(this.methodPath, visitor, Object.assign({
            file: this.file,
            scope: this.methodPath.scope,
            isDerivedConstructor: this.isDerivedConstructor,
            isStatic: this.isStatic,
            isPrivateMethod: this.isPrivateMethod,
            getObjectRef: this.getObjectRef.bind(this),
            getSuperRef: this.getSuperRef.bind(this),
            boundGet: handler.get
          }, handler));
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
      var _t = __webpack_require__(8459);
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
      var _jsTokens = __webpack_require__(6188), _helperValidatorIdentifier = __webpack_require__(720), _chalk = __webpack_require__(7215);
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
    8610: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(file) {
        if (helperIDs.has(file)) return (_core.types.cloneNode || _core.types.clone)(helperIDs.get(file));
        try {
          return file.addHelper("createSuper");
        } catch (_unused) {}
        const id = file.scope.generateUidIdentifier("createSuper");
        helperIDs.set(file, id);
        const fn = helper({
          CREATE_SUPER: id,
          GET_PROTOTYPE_OF: file.addHelper("getPrototypeOf"),
          POSSIBLE_CONSTRUCTOR_RETURN: file.addHelper("possibleConstructorReturn")
        });
        return file.path.unshiftContainer("body", [ fn ]), file.scope.registerDeclaration(file.path.get("body.0")), 
        _core.types.cloneNode(id);
      };
      var _core = __webpack_require__(4629);
      const helperIDs = new WeakMap;
      const helper = _core.template.statement`
  function CREATE_SUPER(Derived) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;

      // core-js@3
      if (Reflect.construct.sham) return false;

      // Proxy can't be polyfilled. Every browser implemented
      // proxies before or at the same time as Reflect.construct,
      // so if they support Proxy they also support Reflect.construct.
      if (typeof Proxy === "function") return true;

      // Since Reflect.construct can't be properly polyfilled, some
      // implementations (e.g. core-js@2) don't set the correct internal slots.
      // Those polyfills don't allow us to subclass built-ins, so we need to
      // use our fallback implementation.
      try {
        // If the internal slots aren't set, this throws an error similar to
        //   TypeError: this is not a Date object.
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    return function () {
      var Super = GET_PROTOTYPE_OF(Derived), result;
      if (isNativeReflectConstruct()) {
        // NOTE: This doesn't work if this.__proto__.constructor has been modified.
        var NewTarget = GET_PROTOTYPE_OF(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return POSSIBLE_CONSTRUCTOR_RETURN(this, result);
    }
  }
`;
    },
    8342: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(path, file, builtinClasses, isLoose, assumptions) {
        const classState = {
          parent: void 0,
          scope: void 0,
          node: void 0,
          path: void 0,
          file: void 0,
          classId: void 0,
          classRef: void 0,
          superFnId: void 0,
          superName: void 0,
          superReturns: [],
          isDerived: !1,
          extendsNative: !1,
          construct: void 0,
          constructorBody: void 0,
          userConstructor: void 0,
          userConstructorPath: void 0,
          hasConstructor: !1,
          staticPropBody: [],
          body: [],
          superThises: [],
          pushedConstructor: !1,
          pushedInherits: !1,
          pushedCreateClass: !1,
          protoAlias: null,
          isLoose: !1,
          dynamicKeys: new Map,
          methods: {
            instance: {
              hasComputed: !1,
              list: [],
              map: new Map
            },
            static: {
              hasComputed: !1,
              list: [],
              map: new Map
            }
          }
        }, setState = newState => {
          Object.assign(classState, newState);
        }, findThisesVisitor = _core.traverse.visitors.merge([ _helperEnvironmentVisitor.default, {
          ThisExpression(path) {
            classState.superThises.push(path);
          }
        } ]);
        function createClassHelper(args) {
          return _core.types.callExpression(classState.file.addHelper("createClass"), args);
        }
        function buildBody() {
          if (function() {
            let hasConstructor = !1;
            const paths = classState.path.get("body.body");
            for (const path of paths) if (hasConstructor = path.equals("kind", "constructor"), 
            hasConstructor) break;
            if (hasConstructor) return;
            let params, body;
            if (classState.isDerived) {
              const constructor = _core.template.expression.ast`
        (function () {
          super(...arguments);
        })
      `;
              params = constructor.params, body = constructor.body;
            } else params = [], body = _core.types.blockStatement([]);
            classState.path.get("body").unshiftContainer("body", _core.types.classMethod("constructor", _core.types.identifier("constructor"), params, body));
          }(), function() {
            const classBodyPaths = classState.path.get("body.body");
            for (const path of classBodyPaths) {
              const node = path.node;
              if (path.isClassProperty()) throw path.buildCodeFrameError("Missing class properties transform.");
              if (node.decorators) throw path.buildCodeFrameError("Method has decorators, put the decorator plugin before the classes one.");
              if (_core.types.isClassMethod(node)) {
                const isConstructor = "constructor" === node.kind;
                new _helperReplaceSupers.default({
                  methodPath: path,
                  objectRef: classState.classRef,
                  superRef: classState.superName,
                  constantSuper: assumptions.constantSuper,
                  file: classState.file,
                  refToPreserve: classState.classRef
                }).replace();
                const superReturns = [];
                path.traverse(_core.traverse.visitors.merge([ _helperEnvironmentVisitor.default, {
                  ReturnStatement(path) {
                    path.getFunctionParent().isArrowFunctionExpression() || superReturns.push(path);
                  }
                } ])), isConstructor ? pushConstructor(superReturns, node, path) : pushMethod(node, path);
              }
            }
          }(), function() {
            if (!classState.isDerived) return;
            const path = classState.userConstructorPath, body = path.get("body");
            path.traverse(findThisesVisitor);
            let thisRef = function() {
              const ref = path.scope.generateDeclaredUidIdentifier("this");
              return thisRef = () => _core.types.cloneNode(ref), ref;
            };
            for (const thisPath of classState.superThises) {
              const {node, parentPath} = thisPath;
              parentPath.isMemberExpression({
                object: node
              }) ? thisPath.replaceWith(thisRef()) : thisPath.replaceWith(_core.types.callExpression(classState.file.addHelper("assertThisInitialized"), [ thisRef() ]));
            }
            const bareSupers = new Set;
            path.traverse(_core.traverse.visitors.merge([ _helperEnvironmentVisitor.default, {
              Super(path) {
                const {node, parentPath} = path;
                parentPath.isCallExpression({
                  callee: node
                }) && bareSupers.add(parentPath);
              }
            } ]));
            let wrapReturn, guaranteedSuperBeforeFinish = !!bareSupers.size;
            for (const bareSuper of bareSupers) wrapSuperCall(bareSuper, classState.superName, thisRef, body), 
            guaranteedSuperBeforeFinish && bareSuper.find((function(parentPath) {
              return parentPath === path || (parentPath.isLoop() || parentPath.isConditional() || parentPath.isArrowFunctionExpression() ? (guaranteedSuperBeforeFinish = !1, 
              !0) : void 0);
            }));
            wrapReturn = classState.isLoose ? returnArg => {
              const thisExpr = _core.types.callExpression(classState.file.addHelper("assertThisInitialized"), [ thisRef() ]);
              return returnArg ? _core.types.logicalExpression("||", returnArg, thisExpr) : thisExpr;
            } : returnArg => _core.types.callExpression(classState.file.addHelper("possibleConstructorReturn"), [ thisRef() ].concat(returnArg || []));
            const bodyPaths = body.get("body");
            bodyPaths.length && bodyPaths.pop().isReturnStatement() || body.pushContainer("body", _core.types.returnStatement(guaranteedSuperBeforeFinish ? thisRef() : wrapReturn()));
            for (const returnPath of classState.superReturns) returnPath.get("argument").replaceWith(wrapReturn(returnPath.node.argument));
          }(), classState.userConstructor) {
            const {constructorBody, userConstructor, construct} = classState;
            constructorBody.body.push(...userConstructor.body.body), _core.types.inherits(construct, userConstructor), 
            _core.types.inherits(constructorBody, userConstructor.body);
          }
          pushDescriptors();
        }
        function pushDescriptors() {
          pushInheritsToBody();
          const {body} = classState, props = {
            instance: null,
            static: null
          };
          for (const placement of [ "static", "instance" ]) classState.methods[placement].list.length && (props[placement] = classState.methods[placement].list.map((desc => {
            const obj = _core.types.objectExpression([ _core.types.objectProperty(_core.types.identifier("key"), desc.key) ]);
            for (const kind of [ "get", "set", "value" ]) null != desc[kind] && obj.properties.push(_core.types.objectProperty(_core.types.identifier(kind), desc[kind]));
            return obj;
          })));
          if (props.instance || props.static) {
            let args = [ _core.types.cloneNode(classState.classRef), props.instance ? _core.types.arrayExpression(props.instance) : _core.types.nullLiteral(), props.static ? _core.types.arrayExpression(props.static) : _core.types.nullLiteral() ], lastNonNullIndex = 0;
            for (let i = 0; i < args.length; i++) _core.types.isNullLiteral(args[i]) || (lastNonNullIndex = i);
            args = args.slice(0, lastNonNullIndex + 1), body.push(_core.types.expressionStatement(createClassHelper(args))), 
            classState.pushedCreateClass = !0;
          }
        }
        function wrapSuperCall(bareSuper, superRef, thisRef, body) {
          const bareSuperNode = bareSuper.node;
          let call;
          assumptions.superIsCallableConstructor ? (bareSuperNode.arguments.unshift(_core.types.thisExpression()), 
          2 === bareSuperNode.arguments.length && _core.types.isSpreadElement(bareSuperNode.arguments[1]) && _core.types.isIdentifier(bareSuperNode.arguments[1].argument, {
            name: "arguments"
          }) ? (bareSuperNode.arguments[1] = bareSuperNode.arguments[1].argument, bareSuperNode.callee = _core.types.memberExpression(_core.types.cloneNode(superRef), _core.types.identifier("apply"))) : bareSuperNode.callee = _core.types.memberExpression(_core.types.cloneNode(superRef), _core.types.identifier("call")), 
          call = _core.types.logicalExpression("||", bareSuperNode, _core.types.thisExpression())) : call = (0, 
          _helperOptimiseCallExpression.default)(_core.types.cloneNode(classState.superFnId), _core.types.thisExpression(), bareSuperNode.arguments, !1), 
          bareSuper.parentPath.isExpressionStatement() && bareSuper.parentPath.container === body.node.body && body.node.body.length - 1 === bareSuper.parentPath.key ? (classState.superThises.length && (call = _core.types.assignmentExpression("=", thisRef(), call)), 
          bareSuper.parentPath.replaceWith(_core.types.returnStatement(call))) : bareSuper.replaceWith(_core.types.assignmentExpression("=", thisRef(), call));
        }
        function pushMethod(node, path) {
          const scope = path ? path.scope : classState.scope;
          if ("method" === node.kind && function(node, scope) {
            if (assumptions.setClassMethods && !node.decorators) {
              let {classRef} = classState;
              node.static || (!function() {
                if (null === classState.protoAlias) {
                  setState({
                    protoAlias: classState.scope.generateUidIdentifier("proto")
                  });
                  const classProto = _core.types.memberExpression(classState.classRef, _core.types.identifier("prototype")), protoDeclaration = _core.types.variableDeclaration("var", [ _core.types.variableDeclarator(classState.protoAlias, classProto) ]);
                  classState.body.push(protoDeclaration);
                }
              }(), classRef = classState.protoAlias);
              const methodName = _core.types.memberExpression(_core.types.cloneNode(classRef), node.key, node.computed || _core.types.isLiteral(node.key));
              let func = _core.types.functionExpression(null, node.params, node.body, node.generator, node.async);
              _core.types.inherits(func, node);
              const key = _core.types.toComputedKey(node, node.key);
              _core.types.isStringLiteral(key) && (func = (0, _helperFunctionName.default)({
                node: func,
                id: key,
                scope
              }));
              const expr = _core.types.expressionStatement(_core.types.assignmentExpression("=", methodName, func));
              return _core.types.inheritsComments(expr, node), classState.body.push(expr), !0;
            }
            return !1;
          }(node, scope)) return;
          const placement = node.static ? "static" : "instance", methods = classState.methods[placement], descKey = "method" === node.kind ? "value" : node.kind, key = _core.types.isNumericLiteral(node.key) || _core.types.isBigIntLiteral(node.key) ? _core.types.stringLiteral(String(node.key.value)) : _core.types.toComputedKey(node);
          let descriptor, fn = _core.types.toExpression(node);
          _core.types.isStringLiteral(key) ? "method" === node.kind && (fn = (0, _helperFunctionName.default)({
            id: key,
            node,
            scope
          })) : methods.hasComputed = !0, !methods.hasComputed && methods.map.has(key.value) ? (descriptor = methods.map.get(key.value), 
          descriptor[descKey] = fn, "value" === descKey ? (descriptor.get = null, descriptor.set = null) : descriptor.value = null) : (descriptor = {
            key,
            [descKey]: fn
          }, methods.list.push(descriptor), methods.hasComputed || methods.map.set(key.value, descriptor));
        }
        function pushConstructor(superReturns, method, path) {
          setState({
            userConstructorPath: path,
            userConstructor: method,
            hasConstructor: !0,
            superReturns
          });
          const {construct} = classState;
          _core.types.inheritsComments(construct, method), construct.params = method.params, 
          _core.types.inherits(construct.body, method.body), construct.body.directives = method.body.directives, 
          function() {
            if (classState.pushedConstructor) return;
            classState.pushedConstructor = !0, (classState.hasInstanceDescriptors || classState.hasStaticDescriptors) && pushDescriptors();
            classState.body.push(classState.construct), pushInheritsToBody();
          }();
        }
        function pushInheritsToBody() {
          if (!classState.isDerived || classState.pushedInherits) return;
          const superFnId = path.scope.generateUidIdentifier("super");
          setState({
            pushedInherits: !0,
            superFnId
          }), assumptions.superIsCallableConstructor || classState.body.unshift(_core.types.variableDeclaration("var", [ _core.types.variableDeclarator(superFnId, _core.types.callExpression((0, 
          _inlineCreateSuperHelpers.default)(classState.file), [ _core.types.cloneNode(classState.classRef) ])) ])), 
          classState.body.unshift(_core.types.expressionStatement(_core.types.callExpression(classState.file.addHelper(classState.isLoose ? "inheritsLoose" : "inherits"), [ _core.types.cloneNode(classState.classRef), _core.types.cloneNode(classState.superName) ])));
        }
        return function(path, file, builtinClasses, isLoose) {
          setState({
            parent: path.parent,
            scope: path.scope,
            node: path.node,
            path,
            file,
            isLoose
          }), setState({
            classId: classState.node.id,
            classRef: classState.node.id ? _core.types.identifier(classState.node.id.name) : classState.scope.generateUidIdentifier("class"),
            superName: classState.node.superClass,
            isDerived: !!classState.node.superClass,
            constructorBody: _core.types.blockStatement([])
          }), setState({
            extendsNative: classState.isDerived && builtinClasses.has(classState.superName.name) && !classState.scope.hasBinding(classState.superName.name, !0)
          });
          const {classRef, node, constructorBody} = classState;
          setState({
            construct: buildConstructor(classRef, constructorBody, node)
          }), function() {
            const {dynamicKeys, node, scope} = classState;
            for (const elem of node.body.body) {
              if (!_core.types.isClassMethod(elem) || !elem.computed) continue;
              if (scope.isPure(elem.key, !0)) continue;
              const id = scope.generateUidIdentifierBasedOnNode(elem.key);
              dynamicKeys.set(id.name, elem.key), elem.key = id;
            }
          }();
          const {body} = classState, {closureParams, closureArgs} = function() {
            const {superName, dynamicKeys} = classState, closureParams = [], closureArgs = [];
            if (classState.isDerived) {
              let arg = _core.types.cloneNode(superName);
              classState.extendsNative && (arg = _core.types.callExpression(classState.file.addHelper("wrapNativeSuper"), [ arg ]), 
              (0, _helperAnnotateAsPure.default)(arg));
              const param = classState.scope.generateUidIdentifierBasedOnNode(superName);
              closureParams.push(param), closureArgs.push(arg), setState({
                superName: _core.types.cloneNode(param)
              });
            }
            for (const [name, value] of dynamicKeys) closureParams.push(_core.types.identifier(name)), 
            closureArgs.push(value);
            return {
              closureParams,
              closureArgs
            };
          }();
          buildBody(), assumptions.noClassCalls || constructorBody.body.unshift(_core.types.expressionStatement(_core.types.callExpression(classState.file.addHelper("classCallCheck"), [ _core.types.thisExpression(), _core.types.cloneNode(classState.classRef) ]))), 
          body.push(...classState.staticPropBody.map((fn => fn(_core.types.cloneNode(classState.classRef)))));
          const isStrict = path.isInStrictMode();
          let constructorOnly = classState.classId && 1 === body.length;
          if (constructorOnly && !isStrict) for (const param of classState.construct.params) if (!_core.types.isIdentifier(param)) {
            constructorOnly = !1;
            break;
          }
          const directives = constructorOnly ? body[0].body.directives : [];
          if (isStrict || directives.push(_core.types.directive(_core.types.directiveLiteral("use strict"))), 
          constructorOnly) {
            const expr = _core.types.toExpression(body[0]);
            return classState.isLoose ? expr : createClassHelper([ expr ]);
          }
          let returnArg = _core.types.cloneNode(classState.classRef);
          classState.pushedCreateClass || classState.isLoose || (returnArg = createClassHelper([ returnArg ])), 
          body.push(_core.types.returnStatement(returnArg));
          const container = _core.types.arrowFunctionExpression(closureParams, _core.types.blockStatement(body, directives));
          return _core.types.callExpression(container, closureArgs);
        }(path, file, builtinClasses, isLoose);
      };
      var _helperFunctionName = __webpack_require__(1485), _helperReplaceSupers = __webpack_require__(4149), _helperEnvironmentVisitor = __webpack_require__(1692), _helperOptimiseCallExpression = __webpack_require__(3934), _core = __webpack_require__(4629), _helperAnnotateAsPure = __webpack_require__(4321), _inlineCreateSuperHelpers = __webpack_require__(8610);
      function buildConstructor(classRef, constructorBody, node) {
        const func = _core.types.functionDeclaration(_core.types.cloneNode(classRef), [], constructorBody);
        return _core.types.inherits(func, node), func;
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
      var _t = __webpack_require__(8459);
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
      var _t = __webpack_require__(8459), _parser = __webpack_require__(2545), _codeFrame = __webpack_require__(4709);
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
      var _t = __webpack_require__(8459);
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
    5488: module => {
      "use strict";
      module.exports = require("../lib/helper-plugin-utils");
    },
    2545: module => {
      "use strict";
      module.exports = require("../lib/parser");
    },
    7098: module => {
      "use strict";
      module.exports = require("../lib/traverse");
    },
    8459: module => {
      "use strict";
      module.exports = require("../lib/types");
    },
    4629: module => {
      "use strict";
      module.exports = require("@babel/core");
    },
    7215: module => {
      "use strict";
      module.exports = require("../lib/chalk");
    },
    1130: module => {
      "use strict";
      module.exports = require("../lib/globals.json");
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
    "use strict";
    var exports = __webpack_exports__;
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var _helperPluginUtils = __webpack_require__(5488), _helperAnnotateAsPure = __webpack_require__(4321), _helperFunctionName = __webpack_require__(1485), _helperSplitExportDeclaration = __webpack_require__(4170), _core = __webpack_require__(4629), _globals = __webpack_require__(1130), _transformClass = __webpack_require__(8342);
    const getBuiltinClasses = category => Object.keys(_globals[category]).filter((name => /^[A-Z]/.test(name))), builtinClasses = new Set([ ...getBuiltinClasses("builtin"), ...getBuiltinClasses("browser") ]);
    var _default = (0, _helperPluginUtils.declare)(((api, options) => {
      var _api$assumption, _api$assumption2, _api$assumption3, _api$assumption4;
      api.assertVersion(7);
      const {loose} = options, setClassMethods = null != (_api$assumption = api.assumption("setClassMethods")) ? _api$assumption : options.loose, constantSuper = null != (_api$assumption2 = api.assumption("constantSuper")) ? _api$assumption2 : options.loose, superIsCallableConstructor = null != (_api$assumption3 = api.assumption("superIsCallableConstructor")) ? _api$assumption3 : options.loose, noClassCalls = null != (_api$assumption4 = api.assumption("noClassCalls")) ? _api$assumption4 : options.loose, VISITED = Symbol();
      return {
        name: "transform-classes",
        visitor: {
          ExportDefaultDeclaration(path) {
            path.get("declaration").isClassDeclaration() && (0, _helperSplitExportDeclaration.default)(path);
          },
          ClassDeclaration(path) {
            const {node} = path, ref = node.id || path.scope.generateUidIdentifier("class");
            path.replaceWith(_core.types.variableDeclaration("let", [ _core.types.variableDeclarator(ref, _core.types.toExpression(node)) ]));
          },
          ClassExpression(path, state) {
            const {node} = path;
            if (node[VISITED]) return;
            const inferred = (0, _helperFunctionName.default)(path);
            if (inferred && inferred !== node) path.replaceWith(inferred); else if (node[VISITED] = !0, 
            path.replaceWith((0, _transformClass.default)(path, state.file, builtinClasses, loose, {
              setClassMethods,
              constantSuper,
              superIsCallableConstructor,
              noClassCalls
            })), path.isCallExpression()) {
              (0, _helperAnnotateAsPure.default)(path);
              const callee = path.get("callee");
              callee.isArrowFunctionExpression() && callee.arrowFunctionToExpression();
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