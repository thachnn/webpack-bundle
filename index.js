!function() {
  var __webpack_modules__ = {
    983: function(module) {
      "use strict";
      var RE_MULTILINE_COMMENTS = /\/\*[\S\s]*?\*\//, RE_EMPTY_LINE = /^\s*$/, RE_LEADING_WHITESPACE = /^[ \t]+/;
      function gcd(a, b) {
        return b ? gcd(b, a % b) : a;
      }
      module.exports = function(str) {
        if ("string" != typeof str) throw new TypeError("Expected a string");
        for (var lines = str.replace(RE_MULTILINE_COMMENTS, "").split(/\r?\n/), tabs = 0, spaces = [], i = 0; i < lines.length; i++) {
          var line = lines[i];
          if (!RE_EMPTY_LINE.test(line)) {
            var matches = line.match(RE_LEADING_WHITESPACE);
            if (matches) {
              var whitespace = matches[0], len = whitespace.length;
              -1 !== whitespace.indexOf("\t") && tabs++, len % 2 == 1 && (len += 1), -1 !== whitespace.indexOf(" ") && spaces.push(len);
            }
          }
        }
        if (tabs > spaces.length) return "\t";
        if (0 === spaces.length) return null;
        var indentSize = spaces.reduce(gcd);
        return indentSize > 0 ? new Array(indentSize + 1).join(" ") : null;
      };
    },
    890: function(module, __unused_webpack_exports, __webpack_require__) {
      var path = __webpack_require__(17), fs = __webpack_require__(147), _0777 = parseInt("0777", 8);
      function mkdirP(p, opts, f, made) {
        "function" == typeof opts ? (f = opts, opts = {}) : opts && "object" == typeof opts || (opts = {
          mode: opts
        });
        var mode = opts.mode, xfs = opts.fs || fs;
        void 0 === mode && (mode = _0777 & ~process.umask()), made || (made = null);
        var cb = f || function() {};
        p = path.resolve(p), xfs.mkdir(p, mode, (function(er) {
          if (!er) return cb(null, made = made || p);
          if ("ENOENT" === er.code) mkdirP(path.dirname(p), opts, (function(er, made) {
            er ? cb(er, made) : mkdirP(p, opts, cb, made);
          })); else xfs.stat(p, (function(er2, stat) {
            er2 || !stat.isDirectory() ? cb(er, made) : cb(null, made);
          }));
        }));
      }
      module.exports = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP, mkdirP.sync = function sync(p, opts, made) {
        opts && "object" == typeof opts || (opts = {
          mode: opts
        });
        var mode = opts.mode, xfs = opts.fs || fs;
        void 0 === mode && (mode = _0777 & ~process.umask()), made || (made = null), p = path.resolve(p);
        try {
          xfs.mkdirSync(p, mode), made = made || p;
        } catch (err0) {
          if ("ENOENT" === err0.code) made = sync(path.dirname(p), opts, made), sync(p, opts, made); else {
            var stat;
            try {
              stat = xfs.statSync(p);
            } catch (err1) {
              throw err0;
            }
            if (!stat.isDirectory()) throw err0;
          }
        }
        return made;
      };
    },
    598: function(module) {
      "use strict";
      module.exports = require("./lib/glob");
    },
    491: function(module) {
      "use strict";
      module.exports = require("assert");
    },
    147: function(module) {
      "use strict";
      module.exports = require("fs");
    },
    37: function(module) {
      "use strict";
      module.exports = require("os");
    },
    17: function(module) {
      "use strict";
      module.exports = require("path");
    },
    837: function(module) {
      "use strict";
      module.exports = require("util");
    },
    634: function(module) {
      "use strict";
      module.exports = {
        version: "0.7.3"
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
  var __webpack_exports__ = {};
  !function() {
    "use strict";
    var exports = __webpack_exports__;
    Object.defineProperty(exports, "__esModule", {
      value: !0
    });
    var os = __webpack_require__(37), fs = __webpack_require__(147), path = __webpack_require__(17), util = __webpack_require__(837), assert = __webpack_require__(491), glob = __webpack_require__(598), mkdirp = __webpack_require__(890), detectIndent = __webpack_require__(983), pkg_version = __webpack_require__(634).version, dtsExp = /\.d\.ts$/, bomOptExp = /^\uFEFF?/, externalExp = /^([ \t]*declare module )(['"])(.+?)(\2[ \t]*{?.*)$/, importExp = /^([ \t]*(?:export )?(?:import .+? )= require\()(['"])(.+?)(\2\);.*)$/, importEs6Exp = /^([ \t]*(?:export|import) ?(?:(?:\* (?:as [^ ,]+)?)|.*)?,? ?(?:[^ ,]+ ?,?)(?:\{(?:[^ ,]+ ?,?)*\})? ?from )(['"])([^ ,]+)(\2;.*)$/, referenceTagExp = /^[ \t]*\/\/\/[ \t]*<reference[ \t]+path=(["'])(.*?)\1?[ \t]*\/>.*$/, identifierExp = /^\w+(?:[\.-]\w+)*$/, fileExp = /^([\./].*|.:.*)$/, privateExp = /^[ \t]*(?:static )?private (?:static )?/, publicExp = /^([ \t]*)(static |)(public |)(static |)(.*)/;
    function pushUnique(arr, value) {
      return arr.indexOf(value) < 0 && arr.push(value), arr;
    }
    function pushUniqueArr(arr) {
      for (var values = [], _i = 1; _i < arguments.length; _i++) values[_i - 1] = arguments[_i];
      return values.forEach((function(vs) {
        return vs.forEach((function(v) {
          return pushUnique(arr, v);
        }));
      })), arr;
    }
    function getIndenter(actual, use) {
      return actual !== use && actual ? function(line) {
        return (line.modified || line.original).replace(new RegExp("^" + actual + "+", "g"), (function(match) {
          return match.split(actual).join(use);
        }));
      } : function(line) {
        return line.modified || line.original;
      };
    }
    function optValue(passed, def) {
      return void 0 === passed ? def : passed;
    }
    exports.bundle = function(options) {
      assert("object" == typeof options && options, "options must be an object");
      var str, suffix, allFiles = (str = options.main, suffix = "**/*.d.ts", -1 !== str.indexOf(suffix, str.length - suffix.length)), main = allFiles ? "*.d.ts" : options.main, exportName = options.name, _baseDir = function() {
        var baseDir = optValue(options.baseDir, path.dirname(options.main));
        return allFiles && (baseDir = baseDir.substr(0, baseDir.length - 2)), baseDir;
      }(), out = optValue(options.out, exportName + ".d.ts").replace(/\//g, path.sep), newline = optValue(options.newline, os.EOL), indent = optValue(options.indent, "    "), outputAsModuleFolder = optValue(options.outputAsModuleFolder, !1), prefix = optValue(options.prefix, ""), separator = optValue(options.separator, "/"), externals = optValue(options.externals, !1), exclude = optValue(options.exclude, null), removeSource = optValue(options.removeSource, !1), referenceExternals = optValue(options.referenceExternals, !1), emitOnIncludedFileNotFound = optValue(options.emitOnIncludedFileNotFound, !1), emitOnNoIncludedFileNotFound = optValue(options.emitOnNoIncludedFileNotFound, !1), _headerPath = optValue(options.headerPath, null), headerText = optValue(options.headerText, ""), verbose = optValue(options.verbose, !1);
      assert.ok(main, 'option "main" must be defined'), assert.ok(exportName, 'option "name" must be defined'), 
      assert("string" == typeof newline, 'option "newline" must be a string'), assert("string" == typeof indent, 'option "indent" must be a string'), 
      assert("string" == typeof prefix, 'option "prefix" must be a string'), assert(separator.length > 0, 'option "separator" must have non-zero length');
      var obj, isExclude, baseDir = path.resolve(_baseDir), mainFile = allFiles ? path.resolve(baseDir, "**/*.d.ts") : path.resolve(main.replace(/\//g, path.sep)), outFile = function(out, baseDir) {
        var result = path.resolve(baseDir, out);
        (function(str, prefix) {
          return str.slice(0, prefix.length) == prefix;
        })(out, "~" + path.sep) && (result = path.resolve(".", out.substr(2)));
        return result;
      }(out, baseDir), headerData = "// Generated by dts-bundle v" + pkg_version + newline, headerPath = _headerPath && "none" !== _headerPath ? path.resolve(_headerPath.replace(/\//g, path.sep)) : _headerPath;
      trace("### settings object passed ###"), obj = options, verbose && console.log(obj), 
      trace("### settings ###"), trace("main:         %s", main), trace("name:         %s", exportName), 
      trace("out:          %s", out), trace("baseDir:      %s", baseDir), trace("mainFile:     %s", mainFile), 
      trace("outFile:      %s", outFile), trace("externals:    %s", externals ? "yes" : "no"), 
      trace("exclude:      %s", exclude), trace("removeSource: %s", removeSource ? "yes" : "no"), 
      trace("comments:     %s", "no"), trace("emitOnIncludedFileNotFound:   %s", emitOnIncludedFileNotFound ? "yes" : "no"), 
      trace("emitOnNoIncludedFileNotFound: %s", emitOnNoIncludedFileNotFound ? "yes" : "no"), 
      trace("headerPath    %s", headerPath), trace("headerText    %s", headerText), allFiles || assert(fs.existsSync(mainFile), "main does not exist: " + mainFile), 
      headerPath ? "none" === headerPath ? headerData = "" : (assert(fs.existsSync(headerPath), "header does not exist: " + headerPath), 
      headerData = fs.readFileSync(headerPath, "utf8") + headerData) : headerText && (headerData = "/*" + headerText + "*/\n"), 
      isExclude = "function" == typeof exclude ? exclude : exclude instanceof RegExp ? function(file) {
        return exclude.test(file);
      } : function() {
        return !1;
      };
      var sourceTypings = glob.sync("**/*.d.ts", {
        cwd: baseDir
      }).map((function(file) {
        return path.resolve(baseDir, file);
      }));
      if (allFiles) {
        var mainFileContent_1 = "";
        trace("## temporally main file ##"), sourceTypings.forEach((function(file) {
          var generatedLine = "export * from './" + path.relative(baseDir, file.substr(0, file.length - 5)).replace(path.sep, "/") + "';";
          trace(generatedLine), mainFileContent_1 += generatedLine + "\n";
        })), mainFile = path.resolve(baseDir, "dts-bundle.tmp." + exportName + ".d.ts"), 
        fs.writeFileSync(mainFile, mainFileContent_1, "utf8");
      }
      trace("\n### find typings ###");
      var inSourceTypings = function(file) {
        return -1 !== sourceTypings.indexOf(file) || -1 !== sourceTypings.indexOf(path.join(file, "index.d.ts"));
      };
      trace("source typings (will be included in output if actually used)"), sourceTypings.forEach((function(file) {
        return trace(" - %s ", file);
      })), trace("excluded typings (will always be excluded from output)");
      var mainParse, fileMap = Object.create(null), globalExternalImports = [], externalTypings = [];
      trace("\n### parse files ###");
      for (var queue = [ mainFile ], queueSeen = Object.create(null); queue.length > 0; ) {
        var target = queue.shift();
        if (!queueSeen[target]) {
          queueSeen[target] = !0;
          var parse = parseFile(target);
          mainParse || (mainParse = parse), fileMap[parse.file] = parse, pushUniqueArr(queue, parse.refs, parse.relativeImports);
        }
      }
      trace("\n### map exports ###");
      var exportMap = Object.create(null);
      Object.keys(fileMap).forEach((function(file) {
        var parse = fileMap[file];
        parse.exports.forEach((function(name) {
          assert(!(name in exportMap), "already got export for: " + name), exportMap[name] = parse, 
          trace("- %s -> %s", name, parse.file);
        }));
      })), trace("\n### determine typings to include ###");
      var excludedTypings = [], usedTypings = [], externalDependencies = [], queue_1 = [ mainParse ];
      for (queueSeen = Object.create(null), trace("queue"), trace(queue_1); queue_1.length > 0; ) {
        queueSeen[(parse = queue_1.shift()).file] || (queueSeen[parse.file] = !0, trace("%s (%s)", parse.name, parse.file), 
        usedTypings.push(parse), parse.externalImports.forEach((function(name) {
          var p = exportMap[name];
          return externals ? isExclude(path.relative(baseDir, p.file), !0) ? (trace(" - exclude external filter %s", name), 
          void pushUnique(excludedTypings, p.file)) : (trace(" - include external %s", name), 
          assert(p, name), void queue_1.push(p)) : (trace(" - exclude external %s", name), 
          void pushUnique(externalDependencies, p ? p.file : name));
        })), parse.relativeImports.forEach((function(file) {
          var p = fileMap[file];
          if (isExclude(path.relative(baseDir, p.file), !1)) return trace(" - exclude internal filter %s", file), 
          void pushUnique(excludedTypings, p.file);
          trace(" - import relative %s", file), assert(p, file), queue_1.push(p);
        })));
      }
      trace("\n### rewrite global external modules ###"), usedTypings.forEach((function(parse) {
        trace(parse.name), parse.relativeRef.forEach((function(line, i) {
          line.modified = function(line, replacer) {
            var match = line.match(externalExp);
            if (match) {
              match[0];
              var declareModule = match[1], beforeIndent = match[2], moduleName = match[3], afterIdent = match[4];
              if (assert(afterIdent), identifierExp.test(moduleName)) return declareModule + beforeIndent + replacer(moduleName) + afterIdent;
            }
            return line;
          }(line.original, getLibName), trace(" - %s  ==>  %s", line.original, line.modified);
        })), parse.importLineRef.forEach((function(line, i) {
          if (outputAsModuleFolder) return trace(" - %s was skipped.", line.original), void (line.skip = !0);
          importExp.test(line.original) ? line.modified = function(line, replacer) {
            var match = line.match(importExp);
            if (match && (assert(match[4]), identifierExp.test(match[3]))) return match[1] + match[2] + replacer(match[3]) + match[4];
            return line;
          }(line.original, getLibName) : line.modified = function(line, replacer) {
            if (line.indexOf("from") < 0) return line;
            var match = line.match(importEs6Exp);
            if (match && (assert(match[4]), identifierExp.test(match[3]))) return match[1] + match[2] + replacer(match[3]) + match[4];
            return line;
          }(line.original, getLibName), trace(" - %s  ==>  %s", line.original, line.modified);
        }));
      })), trace("\n### build output ###");
      var content = headerData;
      externalDependencies.length > 0 && (content += "// Dependencies for this module:" + newline, 
      externalDependencies.forEach((function(file) {
        content += referenceExternals ? function(file) {
          return '/// <reference path="' + file.replace(/\\/g, "/") + '" />';
        }(path.relative(baseDir, file).replace(/\\/g, "/")) + newline : "//   " + path.relative(baseDir, file).replace(/\\/g, "/") + newline;
      }))), globalExternalImports.length > 0 && (content += newline, content += globalExternalImports.join(newline) + newline), 
      content += newline, content += usedTypings.filter((function(parse) {
        return parse.lines = parse.lines.filter((function(line) {
          return !0 !== line.skip;
        })), parse.lines.length > 0;
      })).map((function(parse) {
        return inSourceTypings(parse.file) ? function(file, lines) {
          var out = "";
          if (outputAsModuleFolder) return mergeModulesLines(lines);
          return out += "declare module '" + getExpName(file) + "' {" + newline, out += mergeModulesLines(lines), 
          out += "}" + newline;
        }(parse.file, parse.lines.map((function(line) {
          return getIndenter(parse.indent, indent)(line);
        }))) : parse.lines.map((function(line) {
          return getIndenter(parse.indent, indent)(line);
        })).join(newline) + newline;
      })).join(newline) + newline, removeSource && (trace("\n### remove source typings ###"), 
      sourceTypings.forEach((function(p) {
        p !== outFile && dtsExp.test(p) && fs.statSync(p).isFile() && (trace(" - %s", p), 
        fs.unlinkSync(p));
      })));
      var inUsed = function(file) {
        return 0 !== usedTypings.filter((function(parse) {
          return parse.file === file;
        })).length;
      }, bundleResult = {
        fileMap: fileMap,
        includeFilesNotFound: [],
        noIncludeFilesNotFound: [],
        options: options
      };
      for (var p in trace("## files not found ##"), fileMap) {
        (parse = fileMap[p]).fileExists || (inUsed(parse.file) ? (bundleResult.includeFilesNotFound.push(parse.file), 
        warning(" X Included file NOT FOUND %s ", parse.file)) : (bundleResult.noIncludeFilesNotFound.push(parse.file), 
        trace(" X Not used file not found %s", parse.file)));
      }
      if (trace("\n### write output ###"), (0 == bundleResult.includeFilesNotFound.length || bundleResult.includeFilesNotFound.length > 0 && emitOnIncludedFileNotFound) && (0 == bundleResult.noIncludeFilesNotFound.length || bundleResult.noIncludeFilesNotFound.length > 0 && emitOnNoIncludedFileNotFound)) {
        trace(outFile);
        var outDir = path.dirname(outFile);
        fs.existsSync(outDir) || mkdirp.sync(outDir), fs.writeFileSync(outFile, content, "utf8"), 
        bundleResult.emitted = !0;
      } else warning(" XXX Not emit due to exist files not found."), trace("See documentation for emitOnIncludedFileNotFound and emitOnNoIncludedFileNotFound options."), 
      bundleResult.emitted = !1;
      return verbose && (trace("\n### statistics ###"), trace("used sourceTypings"), sourceTypings.forEach((function(p) {
        inUsed(p) && trace(" - %s", p);
      })), trace("unused sourceTypings"), sourceTypings.forEach((function(p) {
        inUsed(p) || trace(" - %s", p);
      })), trace("excludedTypings"), excludedTypings.forEach((function(p) {
        trace(" - %s", p);
      })), trace("used external typings"), externalTypings.forEach((function(p) {
        inUsed(p) && trace(" - %s", p);
      })), trace("unused external typings"), externalTypings.forEach((function(p) {
        inUsed(p) || trace(" - %s", p);
      })), trace("external dependencies"), externalDependencies.forEach((function(p) {
        trace(" - %s", p);
      }))), trace("\n### done ###\n"), allFiles && fs.unlinkSync(mainFile), bundleResult;
      function trace() {
        for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        verbose && console.log(util.format.apply(null, args));
      }
      function warning() {
        for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        console.log(util.format.apply(null, args));
      }
      function getModName(file) {
        return path.relative(baseDir, path.dirname(file) + path.sep + path.basename(file).replace(/\.d\.ts$/, ""));
      }
      function getExpName(file) {
        return file === mainFile ? exportName : getExpNameRaw(file);
      }
      function getExpNameRaw(file) {
        return prefix + exportName + separator + getModName(file).replace(/\.\./g, "--").replace(/[\\\/]/g, separator);
      }
      function getLibName(ref) {
        return getExpNameRaw(mainFile) + separator + prefix + separator + ref;
      }
      function mergeModulesLines(lines) {
        var i = outputAsModuleFolder ? "" : indent;
        return (0 === lines.length ? "" : i + lines.join(newline + i)) + newline;
      }
      function parseFile(file) {
        var name = getModName(file);
        trace("%s (%s)", name, file);
        var res = {
          file: file,
          name: name,
          indent: indent,
          exp: getExpName(file),
          refs: [],
          externalImports: [],
          relativeImports: [],
          exports: [],
          lines: [],
          fileExists: !0,
          importLineRef: [],
          relativeRef: []
        };
        if (!fs.existsSync(file)) return trace(" X - File not found: %s", file), res.fileExists = !1, 
        res;
        fs.lstatSync(file).isDirectory() && (file = path.join(file, "index.d.ts"));
        var code = fs.readFileSync(file, "utf8").replace(bomOptExp, "").replace(/\s*$/, "");
        res.indent = detectIndent(code) || indent;
        var queuedJSDoc, multiComment = [], inBlockComment = !1, popBlock = function() {
          multiComment.length > 0 && (/^[ \t]*\/\*\*/.test(multiComment[0]) && (queuedJSDoc = multiComment), 
          multiComment = []), inBlockComment = !1;
        };
        return code.split(/\r?\n/g).forEach((function(line) {
          var match;
          if (/^[((=====)(=*)) \t]*\*+\//.test(line)) return multiComment.push(line), void popBlock();
          if (/^[ \t]*\/\*/.test(line)) return multiComment.push(line), inBlockComment = !0, 
          void (/\*+\/[ \t]*$/.test(line) && popBlock());
          if (inBlockComment) multiComment.push(line); else if (/^\s*$/.test(line)) res.lines.push({
            original: ""
          }); else {
            if (/^\/\/\//.test(line)) {
              var ref = function(tag) {
                var match = tag.match(referenceTagExp);
                if (match) return match[2];
                return null;
              }(line);
              if (ref) {
                var refPath = path.resolve(path.dirname(file), ref);
                if (inSourceTypings(refPath)) trace(" - reference source typing %s (%s)", ref, refPath); else trace(" - reference external typing %s (%s) (relative: %s)", ref, refPath, path.relative(baseDir, refPath).replace(/\\/g, "/")), 
                function(file) {
                  return -1 !== externalTypings.indexOf(file);
                }(refPath) || externalTypings.push(refPath);
                return void pushUnique(res.refs, refPath);
              }
            }
            if (!/^\/\//.test(line)) if (privateExp.test(line)) queuedJSDoc = null; else if (queuedJSDoc && (queuedJSDoc.forEach((function(line) {
              var match = line.match(/^([ \t]*)(\*.*)/);
              match ? res.lines.push({
                original: match[1] + " " + match[2]
              }) : res.lines.push({
                original: line
              });
            })), queuedJSDoc = null), line.indexOf("from") >= 0 && (match = line.match(importEs6Exp)) || line.indexOf("require") >= 0 && (match = line.match(importExp))) {
              match[0];
              var lead = match[1], quote = match[2], moduleName = match[3], trail = match[4];
              assert(moduleName);
              var impPath = path.resolve(path.dirname(file), moduleName);
              if (fileExp.test(moduleName)) {
                var modLine = {
                  original: lead + quote + getExpName(impPath) + trail
                };
                res.lines.push(modLine);
                var full = path.resolve(path.dirname(file), impPath);
                !fs.existsSync(full) || fs.existsSync(full + ".d.ts") ? full += ".d.ts" : fs.lstatSync(full).isDirectory() && (full = path.join(full, "index.d.ts")), 
                trace(" - import relative %s (%s)", moduleName, full), pushUnique(res.relativeImports, full), 
                res.importLineRef.push(modLine);
              } else {
                modLine = {
                  original: line
                };
                trace(" - import external %s", moduleName), pushUnique(res.externalImports, moduleName), 
                externals && res.importLineRef.push(modLine), outputAsModuleFolder ? pushUnique(globalExternalImports, line) : res.lines.push(modLine);
              }
            } else if (match = line.match(externalExp)) {
              match[0], match[1], lead = match[2], moduleName = match[3], trail = match[4];
              assert(moduleName), trace(" - declare %s", moduleName), pushUnique(res.exports, moduleName);
              modLine = {
                original: line
              };
              res.relativeRef.push(modLine), res.lines.push(modLine);
            } else {
              if (match = line.match(publicExp)) {
                match[0];
                var sp = match[1], static1 = match[2];
                match[3];
                line = sp + static1 + match[4] + match[5];
              }
              inSourceTypings(file) ? res.lines.push({
                original: line.replace(/^(export )?declare /g, "$1")
              }) : res.lines.push({
                original: line
              });
            }
          }
        })), res;
      }
    };
  }();
  var __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
}();