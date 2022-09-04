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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 10);
}([ function(module, exports) {
  exports.getArg = function(aArgs, aName, aDefaultValue) {
    if (aName in aArgs) return aArgs[aName];
    if (3 === arguments.length) return aDefaultValue;
    throw new Error('"' + aName + '" is a required argument.');
  };
  var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/, dataUrlRegexp = /^data:.+\,.+$/;
  function urlParse(aUrl) {
    var match = aUrl.match(urlRegexp);
    return match ? {
      scheme: match[1],
      auth: match[2],
      host: match[3],
      port: match[4],
      path: match[5]
    } : null;
  }
  function urlGenerate(aParsedUrl) {
    var url = "";
    return aParsedUrl.scheme && (url += aParsedUrl.scheme + ":"), url += "//", aParsedUrl.auth && (url += aParsedUrl.auth + "@"), 
    aParsedUrl.host && (url += aParsedUrl.host), aParsedUrl.port && (url += ":" + aParsedUrl.port), 
    aParsedUrl.path && (url += aParsedUrl.path), url;
  }
  function normalize(aPath) {
    var path = aPath, url = urlParse(aPath);
    if (url) {
      if (!url.path) return aPath;
      path = url.path;
    }
    for (var part, isAbsolute = exports.isAbsolute(path), parts = path.split(/\/+/), up = 0, i = parts.length - 1; i >= 0; i--) "." === (part = parts[i]) ? parts.splice(i, 1) : ".." === part ? up++ : up > 0 && ("" === part ? (parts.splice(i + 1, up), 
    up = 0) : (parts.splice(i, 2), up--));
    return "" === (path = parts.join("/")) && (path = isAbsolute ? "/" : "."), url ? (url.path = path, 
    urlGenerate(url)) : path;
  }
  function join(aRoot, aPath) {
    "" === aRoot && (aRoot = "."), "" === aPath && (aPath = ".");
    var aPathUrl = urlParse(aPath), aRootUrl = urlParse(aRoot);
    if (aRootUrl && (aRoot = aRootUrl.path || "/"), aPathUrl && !aPathUrl.scheme) return aRootUrl && (aPathUrl.scheme = aRootUrl.scheme), 
    urlGenerate(aPathUrl);
    if (aPathUrl || aPath.match(dataUrlRegexp)) return aPath;
    if (aRootUrl && !aRootUrl.host && !aRootUrl.path) return aRootUrl.host = aPath, 
    urlGenerate(aRootUrl);
    var joined = "/" === aPath.charAt(0) ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
    return aRootUrl ? (aRootUrl.path = joined, urlGenerate(aRootUrl)) : joined;
  }
  exports.urlParse = urlParse, exports.urlGenerate = urlGenerate, exports.normalize = normalize, 
  exports.join = join, exports.isAbsolute = function(aPath) {
    return "/" === aPath.charAt(0) || urlRegexp.test(aPath);
  }, exports.relative = function(aRoot, aPath) {
    "" === aRoot && (aRoot = "."), aRoot = aRoot.replace(/\/$/, "");
    for (var level = 0; 0 !== aPath.indexOf(aRoot + "/"); ) {
      var index = aRoot.lastIndexOf("/");
      if (index < 0) return aPath;
      if ((aRoot = aRoot.slice(0, index)).match(/^([^\/]+:\/)?\/*$/)) return aPath;
      ++level;
    }
    return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
  };
  var supportsNullProto = !("__proto__" in Object.create(null));
  function identity(s) {
    return s;
  }
  function isProtoString(s) {
    if (!s) return !1;
    var length = s.length;
    if (length < 9) return !1;
    if (95 !== s.charCodeAt(length - 1) || 95 !== s.charCodeAt(length - 2) || 111 !== s.charCodeAt(length - 3) || 116 !== s.charCodeAt(length - 4) || 111 !== s.charCodeAt(length - 5) || 114 !== s.charCodeAt(length - 6) || 112 !== s.charCodeAt(length - 7) || 95 !== s.charCodeAt(length - 8) || 95 !== s.charCodeAt(length - 9)) return !1;
    for (var i = length - 10; i >= 0; i--) if (36 !== s.charCodeAt(i)) return !1;
    return !0;
  }
  function strcmp(aStr1, aStr2) {
    return aStr1 === aStr2 ? 0 : null === aStr1 ? 1 : null === aStr2 ? -1 : aStr1 > aStr2 ? 1 : -1;
  }
  exports.toSetString = supportsNullProto ? identity : function(aStr) {
    return isProtoString(aStr) ? "$" + aStr : aStr;
  }, exports.fromSetString = supportsNullProto ? identity : function(aStr) {
    return isProtoString(aStr) ? aStr.slice(1) : aStr;
  }, exports.compareByOriginalPositions = function(mappingA, mappingB, onlyCompareOriginal) {
    var cmp = strcmp(mappingA.source, mappingB.source);
    return 0 !== cmp || 0 !== (cmp = mappingA.originalLine - mappingB.originalLine) || 0 !== (cmp = mappingA.originalColumn - mappingB.originalColumn) || onlyCompareOriginal || 0 !== (cmp = mappingA.generatedColumn - mappingB.generatedColumn) || 0 !== (cmp = mappingA.generatedLine - mappingB.generatedLine) ? cmp : strcmp(mappingA.name, mappingB.name);
  }, exports.compareByGeneratedPositionsDeflated = function(mappingA, mappingB, onlyCompareGenerated) {
    var cmp = mappingA.generatedLine - mappingB.generatedLine;
    return 0 !== cmp || 0 !== (cmp = mappingA.generatedColumn - mappingB.generatedColumn) || onlyCompareGenerated || 0 !== (cmp = strcmp(mappingA.source, mappingB.source)) || 0 !== (cmp = mappingA.originalLine - mappingB.originalLine) || 0 !== (cmp = mappingA.originalColumn - mappingB.originalColumn) ? cmp : strcmp(mappingA.name, mappingB.name);
  }, exports.compareByGeneratedPositionsInflated = function(mappingA, mappingB) {
    var cmp = mappingA.generatedLine - mappingB.generatedLine;
    return 0 !== cmp || 0 !== (cmp = mappingA.generatedColumn - mappingB.generatedColumn) || 0 !== (cmp = strcmp(mappingA.source, mappingB.source)) || 0 !== (cmp = mappingA.originalLine - mappingB.originalLine) || 0 !== (cmp = mappingA.originalColumn - mappingB.originalColumn) ? cmp : strcmp(mappingA.name, mappingB.name);
  }, exports.parseSourceMapInput = function(str) {
    return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
  }, exports.computeSourceURL = function(sourceRoot, sourceURL, sourceMapURL) {
    if (sourceURL = sourceURL || "", sourceRoot && ("/" !== sourceRoot[sourceRoot.length - 1] && "/" !== sourceURL[0] && (sourceRoot += "/"), 
    sourceURL = sourceRoot + sourceURL), sourceMapURL) {
      var parsed = urlParse(sourceMapURL);
      if (!parsed) throw new Error("sourceMapURL could not be parsed");
      if (parsed.path) {
        var index = parsed.path.lastIndexOf("/");
        index >= 0 && (parsed.path = parsed.path.substring(0, index + 1));
      }
      sourceURL = join(urlGenerate(parsed), sourceURL);
    }
    return normalize(sourceURL);
  };
}, function(module, exports) {
  module.exports = require("path");
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  var _terser = __webpack_require__(3);
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter((function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      }))), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach((function(key) {
        _defineProperty(target, key, source[key]);
      })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach((function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      }));
    }
    return target;
  }
  function _defineProperty(obj, key, value) {
    return key in obj ? Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : obj[key] = value, obj;
  }
  var _default = options => {
    const {file: file, input: input, inputSourceMap: inputSourceMap, extractComments: extractComments, minify: minifyFn} = options;
    if (minifyFn) return minifyFn({
      [file]: input
    }, inputSourceMap);
    const terserOptions = (({ecma: ecma, warnings: warnings, parse: parse = {}, compress: compress = {}, mangle: mangle, module: module, output: output, toplevel: toplevel, nameCache: nameCache, ie8: ie8, keep_classnames: keep_classnames, keep_fnames: keep_fnames, safari10: safari10} = {}) => ({
      ecma: ecma,
      warnings: warnings,
      parse: _objectSpread({}, parse),
      compress: "boolean" == typeof compress ? compress : _objectSpread({}, compress),
      mangle: null == mangle || ("boolean" == typeof mangle ? mangle : _objectSpread({}, mangle)),
      output: _objectSpread({
        shebang: !0,
        comments: !1,
        beautify: !1,
        semicolons: !0
      }, output),
      module: module,
      sourceMap: null,
      toplevel: toplevel,
      nameCache: nameCache,
      ie8: ie8,
      keep_classnames: keep_classnames,
      keep_fnames: keep_fnames,
      safari10: safari10
    }))(options.terserOptions);
    inputSourceMap && (terserOptions.sourceMap = !0);
    const extractedComments = [];
    extractComments && (terserOptions.output.comments = ((options, terserOptions, extractedComments) => {
      const condition = {}, commentsOpts = terserOptions.output.comments;
      return "boolean" == typeof options.extractComments ? (condition.preserve = commentsOpts, 
      condition.extract = /^\**!|@preserve|@license|@cc_on/i) : "string" == typeof options.extractComments || options.extractComments instanceof RegExp || "function" == typeof options.extractComments ? (condition.preserve = commentsOpts, 
      condition.extract = options.extractComments) : Object.prototype.hasOwnProperty.call(options.extractComments, "condition") ? (condition.preserve = commentsOpts, 
      condition.extract = options.extractComments.condition) : (condition.preserve = !1, 
      condition.extract = commentsOpts), [ "preserve", "extract" ].forEach(key => {
        let regexStr, regex;
        switch (typeof condition[key]) {
         case "boolean":
          condition[key] = condition[key] ? () => !0 : () => !1;
          break;

         case "function":
          break;

         case "string":
          if ("all" === condition[key]) {
            condition[key] = () => !0;
            break;
          }
          if ("some" === condition[key]) {
            condition[key] = (astNode, comment) => "comment2" === comment.type && /^\**!|@preserve|@license|@cc_on/i.test(comment.value);
            break;
          }
          regexStr = condition[key], condition[key] = (astNode, comment) => new RegExp(regexStr).test(comment.value);
          break;

         default:
          regex = condition[key], condition[key] = (astNode, comment) => regex.test(comment.value);
        }
      }), (astNode, comment) => {
        if (condition.extract(astNode, comment)) {
          const commentText = "comment2" === comment.type ? `/*${comment.value}*/` : "//" + comment.value;
          extractedComments.includes(commentText) || extractedComments.push(commentText);
        }
        return condition.preserve(astNode, comment);
      };
    })(options, terserOptions, extractedComments));
    const {error: error, map: map, code: code, warnings: warnings} = (0, _terser.minify)({
      [file]: input
    }, terserOptions);
    return {
      error: error,
      map: map,
      code: code,
      warnings: warnings,
      extractedComments: extractedComments
    };
  };
  exports.default = _default;
}, function(module, exports) {
  module.exports = require("../vendor/terser");
}, function(module, exports) {
  module.exports = require("crypto");
}, function(module, exports, __webpack_require__) {
  var base64VLQ = __webpack_require__(6), util = __webpack_require__(0), ArraySet = __webpack_require__(7).ArraySet, MappingList = __webpack_require__(14).MappingList;
  function SourceMapGenerator(aArgs) {
    aArgs || (aArgs = {}), this._file = util.getArg(aArgs, "file", null), this._sourceRoot = util.getArg(aArgs, "sourceRoot", null), 
    this._skipValidation = util.getArg(aArgs, "skipValidation", !1), this._sources = new ArraySet, 
    this._names = new ArraySet, this._mappings = new MappingList, this._sourcesContents = null;
  }
  SourceMapGenerator.prototype._version = 3, SourceMapGenerator.fromSourceMap = function(aSourceMapConsumer) {
    var sourceRoot = aSourceMapConsumer.sourceRoot, generator = new SourceMapGenerator({
      file: aSourceMapConsumer.file,
      sourceRoot: sourceRoot
    });
    return aSourceMapConsumer.eachMapping((function(mapping) {
      var newMapping = {
        generated: {
          line: mapping.generatedLine,
          column: mapping.generatedColumn
        }
      };
      null != mapping.source && (newMapping.source = mapping.source, null != sourceRoot && (newMapping.source = util.relative(sourceRoot, newMapping.source)), 
      newMapping.original = {
        line: mapping.originalLine,
        column: mapping.originalColumn
      }, null != mapping.name && (newMapping.name = mapping.name)), generator.addMapping(newMapping);
    })), aSourceMapConsumer.sources.forEach((function(sourceFile) {
      var sourceRelative = sourceFile;
      null !== sourceRoot && (sourceRelative = util.relative(sourceRoot, sourceFile)), 
      generator._sources.has(sourceRelative) || generator._sources.add(sourceRelative);
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      null != content && generator.setSourceContent(sourceFile, content);
    })), generator;
  }, SourceMapGenerator.prototype.addMapping = function(aArgs) {
    var generated = util.getArg(aArgs, "generated"), original = util.getArg(aArgs, "original", null), source = util.getArg(aArgs, "source", null), name = util.getArg(aArgs, "name", null);
    this._skipValidation || this._validateMapping(generated, original, source, name), 
    null != source && (source = String(source), this._sources.has(source) || this._sources.add(source)), 
    null != name && (name = String(name), this._names.has(name) || this._names.add(name)), 
    this._mappings.add({
      generatedLine: generated.line,
      generatedColumn: generated.column,
      originalLine: null != original && original.line,
      originalColumn: null != original && original.column,
      source: source,
      name: name
    });
  }, SourceMapGenerator.prototype.setSourceContent = function(aSourceFile, aSourceContent) {
    var source = aSourceFile;
    null != this._sourceRoot && (source = util.relative(this._sourceRoot, source)), 
    null != aSourceContent ? (this._sourcesContents || (this._sourcesContents = Object.create(null)), 
    this._sourcesContents[util.toSetString(source)] = aSourceContent) : this._sourcesContents && (delete this._sourcesContents[util.toSetString(source)], 
    0 === Object.keys(this._sourcesContents).length && (this._sourcesContents = null));
  }, SourceMapGenerator.prototype.applySourceMap = function(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    var sourceFile = aSourceFile;
    if (null == aSourceFile) {
      if (null == aSourceMapConsumer.file) throw new Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map\'s "file" property. Both were omitted.');
      sourceFile = aSourceMapConsumer.file;
    }
    var sourceRoot = this._sourceRoot;
    null != sourceRoot && (sourceFile = util.relative(sourceRoot, sourceFile));
    var newSources = new ArraySet, newNames = new ArraySet;
    this._mappings.unsortedForEach((function(mapping) {
      if (mapping.source === sourceFile && null != mapping.originalLine) {
        var original = aSourceMapConsumer.originalPositionFor({
          line: mapping.originalLine,
          column: mapping.originalColumn
        });
        null != original.source && (mapping.source = original.source, null != aSourceMapPath && (mapping.source = util.join(aSourceMapPath, mapping.source)), 
        null != sourceRoot && (mapping.source = util.relative(sourceRoot, mapping.source)), 
        mapping.originalLine = original.line, mapping.originalColumn = original.column, 
        null != original.name && (mapping.name = original.name));
      }
      var source = mapping.source;
      null == source || newSources.has(source) || newSources.add(source);
      var name = mapping.name;
      null == name || newNames.has(name) || newNames.add(name);
    }), this), this._sources = newSources, this._names = newNames, aSourceMapConsumer.sources.forEach((function(sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      null != content && (null != aSourceMapPath && (sourceFile = util.join(aSourceMapPath, sourceFile)), 
      null != sourceRoot && (sourceFile = util.relative(sourceRoot, sourceFile)), this.setSourceContent(sourceFile, content));
    }), this);
  }, SourceMapGenerator.prototype._validateMapping = function(aGenerated, aOriginal, aSource, aName) {
    if (aOriginal && "number" != typeof aOriginal.line && "number" != typeof aOriginal.column) throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");
    if ((!(aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0) || aOriginal || aSource || aName) && !(aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource)) throw new Error("Invalid mapping: " + JSON.stringify({
      generated: aGenerated,
      source: aSource,
      original: aOriginal,
      name: aName
    }));
  }, SourceMapGenerator.prototype._serializeMappings = function() {
    for (var next, mapping, nameIdx, sourceIdx, previousGeneratedColumn = 0, previousGeneratedLine = 1, previousOriginalColumn = 0, previousOriginalLine = 0, previousName = 0, previousSource = 0, result = "", mappings = this._mappings.toArray(), i = 0, len = mappings.length; i < len; i++) {
      if (next = "", (mapping = mappings[i]).generatedLine !== previousGeneratedLine) for (previousGeneratedColumn = 0; mapping.generatedLine !== previousGeneratedLine; ) next += ";", 
      previousGeneratedLine++; else if (i > 0) {
        if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) continue;
        next += ",";
      }
      next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn), previousGeneratedColumn = mapping.generatedColumn, 
      null != mapping.source && (sourceIdx = this._sources.indexOf(mapping.source), next += base64VLQ.encode(sourceIdx - previousSource), 
      previousSource = sourceIdx, next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine), 
      previousOriginalLine = mapping.originalLine - 1, next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn), 
      previousOriginalColumn = mapping.originalColumn, null != mapping.name && (nameIdx = this._names.indexOf(mapping.name), 
      next += base64VLQ.encode(nameIdx - previousName), previousName = nameIdx)), result += next;
    }
    return result;
  }, SourceMapGenerator.prototype._generateSourcesContent = function(aSources, aSourceRoot) {
    return aSources.map((function(source) {
      if (!this._sourcesContents) return null;
      null != aSourceRoot && (source = util.relative(aSourceRoot, source));
      var key = util.toSetString(source);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
    }), this);
  }, SourceMapGenerator.prototype.toJSON = function() {
    var map = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    return null != this._file && (map.file = this._file), null != this._sourceRoot && (map.sourceRoot = this._sourceRoot), 
    this._sourcesContents && (map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot)), 
    map;
  }, SourceMapGenerator.prototype.toString = function() {
    return JSON.stringify(this.toJSON());
  }, exports.SourceMapGenerator = SourceMapGenerator;
}, function(module, exports, __webpack_require__) {
  var base64 = __webpack_require__(13);
  exports.encode = function(aValue) {
    var digit, encoded = "", vlq = function(aValue) {
      return aValue < 0 ? 1 + (-aValue << 1) : 0 + (aValue << 1);
    }(aValue);
    do {
      digit = 31 & vlq, (vlq >>>= 5) > 0 && (digit |= 32), encoded += base64.encode(digit);
    } while (vlq > 0);
    return encoded;
  }, exports.decode = function(aStr, aIndex, aOutParam) {
    var continuation, digit, aValue, shifted, strLen = aStr.length, result = 0, shift = 0;
    do {
      if (aIndex >= strLen) throw new Error("Expected more digits in base 64 VLQ value.");
      if (-1 === (digit = base64.decode(aStr.charCodeAt(aIndex++)))) throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
      continuation = !!(32 & digit), result += (digit &= 31) << shift, shift += 5;
    } while (continuation);
    aOutParam.value = (shifted = (aValue = result) >> 1, 1 == (1 & aValue) ? -shifted : shifted), 
    aOutParam.rest = aIndex;
  };
}, function(module, exports, __webpack_require__) {
  var util = __webpack_require__(0), has = Object.prototype.hasOwnProperty, hasNativeMap = "undefined" != typeof Map;
  function ArraySet() {
    this._array = [], this._set = hasNativeMap ? new Map : Object.create(null);
  }
  ArraySet.fromArray = function(aArray, aAllowDuplicates) {
    for (var set = new ArraySet, i = 0, len = aArray.length; i < len; i++) set.add(aArray[i], aAllowDuplicates);
    return set;
  }, ArraySet.prototype.size = function() {
    return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
  }, ArraySet.prototype.add = function(aStr, aAllowDuplicates) {
    var sStr = hasNativeMap ? aStr : util.toSetString(aStr), isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr), idx = this._array.length;
    isDuplicate && !aAllowDuplicates || this._array.push(aStr), isDuplicate || (hasNativeMap ? this._set.set(aStr, idx) : this._set[sStr] = idx);
  }, ArraySet.prototype.has = function(aStr) {
    if (hasNativeMap) return this._set.has(aStr);
    var sStr = util.toSetString(aStr);
    return has.call(this._set, sStr);
  }, ArraySet.prototype.indexOf = function(aStr) {
    if (hasNativeMap) {
      var idx = this._set.get(aStr);
      if (idx >= 0) return idx;
    } else {
      var sStr = util.toSetString(aStr);
      if (has.call(this._set, sStr)) return this._set[sStr];
    }
    throw new Error('"' + aStr + '" is not in the set.');
  }, ArraySet.prototype.at = function(aIdx) {
    if (aIdx >= 0 && aIdx < this._array.length) return this._array[aIdx];
    throw new Error("No element indexed by " + aIdx);
  }, ArraySet.prototype.toArray = function() {
    return this._array.slice();
  }, exports.ArraySet = ArraySet;
}, function(module, exports, __webpack_require__) {
  "use strict";
  var UID = Math.floor(1099511627776 * Math.random()).toString(16), PLACE_HOLDER_REGEXP = new RegExp('"@__(F|R|D|M|S|U)-' + UID + '-(\\d+)__@"', "g"), IS_NATIVE_CODE_REGEXP = /\{\s*\[native code\]\s*\}/g, IS_PURE_FUNCTION = /function.*?\(/, IS_ARROW_FUNCTION = /.*?=>.*?/, UNSAFE_CHARS_REGEXP = /[<>\/\u2028\u2029]/g, RESERVED_SYMBOLS = [ "*", "async" ], ESCAPED_CHARS = {
    "<": "\\u003C",
    ">": "\\u003E",
    "/": "\\u002F",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029"
  };
  function escapeUnsafeChars(unsafeChar) {
    return ESCAPED_CHARS[unsafeChar];
  }
  module.exports = function serialize(obj, options) {
    options || (options = {}), "number" != typeof options && "string" != typeof options || (options = {
      space: options
    });
    var str, functions = [], regexps = [], dates = [], maps = [], sets = [], undefs = [];
    return options.ignoreFunction && "function" == typeof obj && (obj = void 0), void 0 === obj ? String(obj) : "string" != typeof (str = options.isJSON && !options.space ? JSON.stringify(obj) : JSON.stringify(obj, options.isJSON ? null : function(key, value) {
      if (options.ignoreFunction && function(obj) {
        var functionKeys = [];
        for (var key in obj) "function" == typeof obj[key] && functionKeys.push(key);
        for (var i = 0; i < functionKeys.length; i++) delete obj[functionKeys[i]];
      }(value), !value && void 0 !== value) return value;
      var origValue = this[key], type = typeof origValue;
      if ("object" === type) {
        if (origValue instanceof RegExp) return "@__R-" + UID + "-" + (regexps.push(origValue) - 1) + "__@";
        if (origValue instanceof Date) return "@__D-" + UID + "-" + (dates.push(origValue) - 1) + "__@";
        if (origValue instanceof Map) return "@__M-" + UID + "-" + (maps.push(origValue) - 1) + "__@";
        if (origValue instanceof Set) return "@__S-" + UID + "-" + (sets.push(origValue) - 1) + "__@";
      }
      return "function" === type ? "@__F-" + UID + "-" + (functions.push(origValue) - 1) + "__@" : "undefined" === type ? "@__U-" + UID + "-" + (undefs.push(origValue) - 1) + "__@" : value;
    }, options.space)) ? String(str) : (!0 !== options.unsafe && (str = str.replace(UNSAFE_CHARS_REGEXP, escapeUnsafeChars)), 
    0 === functions.length && 0 === regexps.length && 0 === dates.length && 0 === maps.length && 0 === sets.length && 0 === undefs.length ? str : str.replace(PLACE_HOLDER_REGEXP, (function(match, type, valueIndex) {
      return "D" === type ? 'new Date("' + dates[valueIndex].toISOString() + '")' : "R" === type ? "new RegExp(" + serialize(regexps[valueIndex].source) + ', "' + regexps[valueIndex].flags + '")' : "M" === type ? "new Map(" + serialize(Array.from(maps[valueIndex].entries()), options) + ")" : "S" === type ? "new Set(" + serialize(Array.from(sets[valueIndex].values()), options) + ")" : "U" === type ? "undefined" : function(fn) {
        var serializedFn = fn.toString();
        if (IS_NATIVE_CODE_REGEXP.test(serializedFn)) throw new TypeError("Serializing native function: " + fn.name);
        if (IS_PURE_FUNCTION.test(serializedFn)) return serializedFn;
        if (IS_ARROW_FUNCTION.test(serializedFn)) return serializedFn;
        var argsStartsAt = serializedFn.indexOf("("), def = serializedFn.substr(0, argsStartsAt).trim().split(" ").filter((function(val) {
          return val.length > 0;
        }));
        return def.filter((function(val) {
          return -1 === RESERVED_SYMBOLS.indexOf(val);
        })).length > 0 ? (def.indexOf("async") > -1 ? "async " : "") + "function" + (def.join("").indexOf("*") > -1 ? "*" : "") + serializedFn.substr(argsStartsAt) : serializedFn;
      }(functions[valueIndex]);
    })));
  };
}, function(module, exports) {
  module.exports = require("os");
}, function(module, exports, __webpack_require__) {
  "use strict";
  const plugin = __webpack_require__(11);
  module.exports = plugin.default;
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  var _crypto = _interopRequireDefault(__webpack_require__(4)), _path = _interopRequireDefault(__webpack_require__(1)), _sourceMap = __webpack_require__(12), _webpackSources = __webpack_require__(19), _RequestShortener = _interopRequireDefault(__webpack_require__(20)), _ModuleFilenameHelpers = _interopRequireDefault(__webpack_require__(21)), _schemaUtils = _interopRequireDefault(__webpack_require__(26)), _serializeJavascript = _interopRequireDefault(__webpack_require__(8)), _package = _interopRequireDefault(__webpack_require__(27)), _options = _interopRequireDefault(__webpack_require__(28)), _TaskRunner = _interopRequireDefault(__webpack_require__(29));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter((function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      }))), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), !0).forEach((function(key) {
        _defineProperty(target, key, source[key]);
      })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach((function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      }));
    }
    return target;
  }
  function _defineProperty(obj, key, value) {
    return key in obj ? Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : obj[key] = value, obj;
  }
  const warningRegex = /\[.+:([0-9]+),([0-9]+)\]/;
  class TerserPlugin {
    constructor(options = {}) {
      (0, _schemaUtils.default)(_options.default, options, "Terser Plugin");
      const {minify: minify, terserOptions: terserOptions = {}, test: test = /\.m?js(\?.*)?$/i, chunkFilter: chunkFilter = (() => !0), warningsFilter: warningsFilter = (() => !0), extractComments: extractComments = !1, sourceMap: sourceMap = !1, cache: cache = !1, cacheKeys: cacheKeys = (defaultCacheKeys => defaultCacheKeys), parallel: parallel = !1, include: include, exclude: exclude} = options;
      this.options = {
        test: test,
        chunkFilter: chunkFilter,
        warningsFilter: warningsFilter,
        extractComments: extractComments,
        sourceMap: sourceMap,
        cache: cache,
        cacheKeys: cacheKeys,
        parallel: parallel,
        include: include,
        exclude: exclude,
        minify: minify,
        terserOptions: _objectSpread({
          output: {
            comments: !extractComments && /^\**!|@preserve|@license|@cc_on/i
          }
        }, terserOptions)
      };
    }
    static isSourceMap(input) {
      return Boolean(input && input.version && input.sources && Array.isArray(input.sources) && "string" == typeof input.mappings);
    }
    static buildSourceMap(inputSourceMap) {
      return inputSourceMap && TerserPlugin.isSourceMap(inputSourceMap) ? new _sourceMap.SourceMapConsumer(inputSourceMap) : null;
    }
    static buildError(err, file, sourceMap, requestShortener) {
      if (err.line) {
        const original = sourceMap && sourceMap.originalPositionFor({
          line: err.line,
          column: err.col
        });
        return original && original.source && requestShortener ? new Error(`${file} from Terser\n${err.message} [${requestShortener.shorten(original.source)}:${original.line},${original.column}][${file}:${err.line},${err.col}]`) : new Error(`${file} from Terser\n${err.message} [${file}:${err.line},${err.col}]`);
      }
      return err.stack ? new Error(`${file} from Terser\n${err.stack}`) : new Error(`${file} from Terser\n${err.message}`);
    }
    static buildWarning(warning, file, sourceMap, requestShortener, warningsFilter) {
      let warningMessage = warning, locationMessage = "", source = null;
      if (sourceMap) {
        const match = warningRegex.exec(warning);
        if (match) {
          const line = +match[1], column = +match[2], original = sourceMap.originalPositionFor({
            line: line,
            column: column
          });
          original && original.source && original.source !== file && requestShortener && (({source: source} = original), 
          warningMessage = "" + warningMessage.replace(warningRegex, ""), locationMessage = `[${requestShortener.shorten(original.source)}:${original.line},${original.column}]`);
        }
      }
      return warningsFilter && !warningsFilter(warning, source) ? null : `Terser Plugin: ${warningMessage}${locationMessage}`;
    }
    apply(compiler) {
      const buildModuleFn = moduleArg => {
        moduleArg.useSourceMap = !0;
      }, optimizeFn = (compilation, chunks, callback) => {
        const taskRunner = new _TaskRunner.default({
          cache: this.options.cache,
          parallel: this.options.parallel
        }), processedAssets = new WeakSet, tasks = [], {chunkFilter: chunkFilter} = this.options;
        Array.from(chunks).filter(chunk => chunkFilter && chunkFilter(chunk)).reduce((acc, chunk) => acc.concat(chunk.files || []), []).concat(compilation.additionalChunkAssets || []).filter(_ModuleFilenameHelpers.default.matchObject.bind(null, this.options)).forEach(file => {
          let inputSourceMap;
          const asset = compilation.assets[file];
          if (!processedAssets.has(asset)) try {
            let input;
            if (this.options.sourceMap && asset.sourceAndMap) {
              const {source: source, map: map} = asset.sourceAndMap();
              input = source, TerserPlugin.isSourceMap(map) ? inputSourceMap = map : (inputSourceMap = map, 
              compilation.warnings.push(new Error(file + " contains invalid source map")));
            } else input = asset.source(), inputSourceMap = null;
            let commentsFile = !1;
            this.options.extractComments && (commentsFile = this.options.extractComments.filename || file + ".LICENSE", 
            "function" == typeof commentsFile && (commentsFile = commentsFile(file)));
            const task = {
              file: file,
              input: input,
              inputSourceMap: inputSourceMap,
              commentsFile: commentsFile,
              extractComments: this.options.extractComments,
              terserOptions: this.options.terserOptions,
              minify: this.options.minify
            };
            if (this.options.cache) {
              const defaultCacheKeys = {
                terser: _package.default.version,
                node_version: process.version,
                "terser-webpack-plugin": __webpack_require__(35).version,
                "terser-webpack-plugin-options": this.options,
                hash: _crypto.default.createHash("md4").update(input).digest("hex")
              };
              task.cacheKeys = this.options.cacheKeys(defaultCacheKeys, file);
            }
            tasks.push(task);
          } catch (error) {
            compilation.errors.push(TerserPlugin.buildError(error, file, TerserPlugin.buildSourceMap(inputSourceMap), new _RequestShortener.default(compiler.context)));
          }
        }), taskRunner.run(tasks, (tasksError, results) => {
          tasksError ? compilation.errors.push(tasksError) : (results.forEach((data, index) => {
            const {file: file, input: input, inputSourceMap: inputSourceMap, commentsFile: commentsFile} = tasks[index], {error: error, map: map, code: code, warnings: warnings} = data;
            let outputSource, {extractedComments: extractedComments} = data, sourceMap = null;
            if ((error || warnings && warnings.length > 0) && (sourceMap = TerserPlugin.buildSourceMap(inputSourceMap)), 
            error) compilation.errors.push(TerserPlugin.buildError(error, file, sourceMap, new _RequestShortener.default(compiler.context))); else {
              if (outputSource = map ? new _webpackSources.SourceMapSource(code, file, JSON.parse(map), input, inputSourceMap, !0) : new _webpackSources.RawSource(code), 
              commentsFile && extractedComments && extractedComments.length > 0) {
                if (commentsFile in compilation.assets) {
                  const commentsFileSource = compilation.assets[commentsFile].source();
                  extractedComments = extractedComments.filter(comment => !commentsFileSource.includes(comment));
                }
                if (extractedComments.length > 0) {
                  if (!1 !== this.options.extractComments.banner) {
                    let banner = this.options.extractComments.banner || "For license information please see " + _path.default.posix.basename(commentsFile);
                    "function" == typeof banner && (banner = banner(commentsFile)), banner && (outputSource = new _webpackSources.ConcatSource(`/*! ${banner} */\n`, outputSource));
                  }
                  const commentsSource = new _webpackSources.RawSource(extractedComments.join("\n\n") + "\n");
                  commentsFile in compilation.assets ? compilation.assets[commentsFile] instanceof _webpackSources.ConcatSource ? (compilation.assets[commentsFile].add("\n"), 
                  compilation.assets[commentsFile].add(commentsSource)) : compilation.assets[commentsFile] = new _webpackSources.ConcatSource(compilation.assets[commentsFile], "\n", commentsSource) : compilation.assets[commentsFile] = commentsSource;
                }
              }
              processedAssets.add(compilation.assets[file] = outputSource), warnings && warnings.length > 0 && warnings.forEach(warning => {
                const builtWarning = TerserPlugin.buildWarning(warning, file, sourceMap, new _RequestShortener.default(compiler.context), this.options.warningsFilter);
                builtWarning && compilation.warnings.push(builtWarning);
              });
            }
          }), taskRunner.exit(), callback());
        });
      }, plugin = {
        name: this.constructor.name
      };
      compiler.hooks.compilation.tap(plugin, compilation => {
        this.options.sourceMap && compilation.hooks.buildModule.tap(plugin, buildModuleFn);
        const {mainTemplate: mainTemplate, chunkTemplate: chunkTemplate} = compilation;
        for (const template of [ mainTemplate, chunkTemplate ]) template.hooks.hashForChunk.tap(plugin, hash => {
          const data = (0, _serializeJavascript.default)({
            terser: _package.default.version,
            terserOptions: this.options.terserOptions
          });
          hash.update("TerserPlugin"), hash.update(data);
        });
        compilation.hooks.optimizeChunkAssets.tapAsync(plugin, optimizeFn.bind(this, compilation));
      });
    }
  }
  var _default = TerserPlugin;
  exports.default = _default;
}, function(module, exports, __webpack_require__) {
  exports.SourceMapGenerator = __webpack_require__(5).SourceMapGenerator, exports.SourceMapConsumer = __webpack_require__(15).SourceMapConsumer, 
  exports.SourceNode = __webpack_require__(18).SourceNode;
}, function(module, exports) {
  var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
  exports.encode = function(number) {
    if (0 <= number && number < intToCharMap.length) return intToCharMap[number];
    throw new TypeError("Must be between 0 and 63: " + number);
  }, exports.decode = function(charCode) {
    return 65 <= charCode && charCode <= 90 ? charCode - 65 : 97 <= charCode && charCode <= 122 ? charCode - 97 + 26 : 48 <= charCode && charCode <= 57 ? charCode - 48 + 52 : 43 == charCode ? 62 : 47 == charCode ? 63 : -1;
  };
}, function(module, exports, __webpack_require__) {
  var util = __webpack_require__(0);
  function MappingList() {
    this._array = [], this._sorted = !0, this._last = {
      generatedLine: -1,
      generatedColumn: 0
    };
  }
  MappingList.prototype.unsortedForEach = function(aCallback, aThisArg) {
    this._array.forEach(aCallback, aThisArg);
  }, MappingList.prototype.add = function(aMapping) {
    var mappingA, mappingB, lineA, lineB, columnA, columnB;
    mappingA = this._last, mappingB = aMapping, lineA = mappingA.generatedLine, lineB = mappingB.generatedLine, 
    columnA = mappingA.generatedColumn, columnB = mappingB.generatedColumn, lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0 ? (this._last = aMapping, 
    this._array.push(aMapping)) : (this._sorted = !1, this._array.push(aMapping));
  }, MappingList.prototype.toArray = function() {
    return this._sorted || (this._array.sort(util.compareByGeneratedPositionsInflated), 
    this._sorted = !0), this._array;
  }, exports.MappingList = MappingList;
}, function(module, exports, __webpack_require__) {
  var util = __webpack_require__(0), binarySearch = __webpack_require__(16), ArraySet = __webpack_require__(7).ArraySet, base64VLQ = __webpack_require__(6), quickSort = __webpack_require__(17).quickSort;
  function SourceMapConsumer(aSourceMap, aSourceMapURL) {
    var sourceMap = aSourceMap;
    return "string" == typeof aSourceMap && (sourceMap = util.parseSourceMapInput(aSourceMap)), 
    null != sourceMap.sections ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL) : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
  }
  function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
    var sourceMap = aSourceMap;
    "string" == typeof aSourceMap && (sourceMap = util.parseSourceMapInput(aSourceMap));
    var version = util.getArg(sourceMap, "version"), sources = util.getArg(sourceMap, "sources"), names = util.getArg(sourceMap, "names", []), sourceRoot = util.getArg(sourceMap, "sourceRoot", null), sourcesContent = util.getArg(sourceMap, "sourcesContent", null), mappings = util.getArg(sourceMap, "mappings"), file = util.getArg(sourceMap, "file", null);
    if (version != this._version) throw new Error("Unsupported version: " + version);
    sourceRoot && (sourceRoot = util.normalize(sourceRoot)), sources = sources.map(String).map(util.normalize).map((function(source) {
      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
    })), this._names = ArraySet.fromArray(names.map(String), !0), this._sources = ArraySet.fromArray(sources, !0), 
    this._absoluteSources = this._sources.toArray().map((function(s) {
      return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
    })), this.sourceRoot = sourceRoot, this.sourcesContent = sourcesContent, this._mappings = mappings, 
    this._sourceMapURL = aSourceMapURL, this.file = file;
  }
  function Mapping() {
    this.generatedLine = 0, this.generatedColumn = 0, this.source = null, this.originalLine = null, 
    this.originalColumn = null, this.name = null;
  }
  function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
    var sourceMap = aSourceMap;
    "string" == typeof aSourceMap && (sourceMap = util.parseSourceMapInput(aSourceMap));
    var version = util.getArg(sourceMap, "version"), sections = util.getArg(sourceMap, "sections");
    if (version != this._version) throw new Error("Unsupported version: " + version);
    this._sources = new ArraySet, this._names = new ArraySet;
    var lastOffset = {
      line: -1,
      column: 0
    };
    this._sections = sections.map((function(s) {
      if (s.url) throw new Error("Support for url field in sections not implemented.");
      var offset = util.getArg(s, "offset"), offsetLine = util.getArg(offset, "line"), offsetColumn = util.getArg(offset, "column");
      if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column) throw new Error("Section offsets must be ordered and non-overlapping.");
      return lastOffset = offset, {
        generatedOffset: {
          generatedLine: offsetLine + 1,
          generatedColumn: offsetColumn + 1
        },
        consumer: new SourceMapConsumer(util.getArg(s, "map"), aSourceMapURL)
      };
    }));
  }
  SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
    return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
  }, SourceMapConsumer.prototype._version = 3, SourceMapConsumer.prototype.__generatedMappings = null, 
  Object.defineProperty(SourceMapConsumer.prototype, "_generatedMappings", {
    configurable: !0,
    enumerable: !0,
    get: function() {
      return this.__generatedMappings || this._parseMappings(this._mappings, this.sourceRoot), 
      this.__generatedMappings;
    }
  }), SourceMapConsumer.prototype.__originalMappings = null, Object.defineProperty(SourceMapConsumer.prototype, "_originalMappings", {
    configurable: !0,
    enumerable: !0,
    get: function() {
      return this.__originalMappings || this._parseMappings(this._mappings, this.sourceRoot), 
      this.__originalMappings;
    }
  }), SourceMapConsumer.prototype._charIsMappingSeparator = function(aStr, index) {
    var c = aStr.charAt(index);
    return ";" === c || "," === c;
  }, SourceMapConsumer.prototype._parseMappings = function(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
  }, SourceMapConsumer.GENERATED_ORDER = 1, SourceMapConsumer.ORIGINAL_ORDER = 2, 
  SourceMapConsumer.GREATEST_LOWER_BOUND = 1, SourceMapConsumer.LEAST_UPPER_BOUND = 2, 
  SourceMapConsumer.prototype.eachMapping = function(aCallback, aContext, aOrder) {
    var mappings, context = aContext || null;
    switch (aOrder || SourceMapConsumer.GENERATED_ORDER) {
     case SourceMapConsumer.GENERATED_ORDER:
      mappings = this._generatedMappings;
      break;

     case SourceMapConsumer.ORIGINAL_ORDER:
      mappings = this._originalMappings;
      break;

     default:
      throw new Error("Unknown order of iteration.");
    }
    var sourceRoot = this.sourceRoot;
    mappings.map((function(mapping) {
      var source = null === mapping.source ? null : this._sources.at(mapping.source);
      return {
        source: source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL),
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: null === mapping.name ? null : this._names.at(mapping.name)
      };
    }), this).forEach(aCallback, context);
  }, SourceMapConsumer.prototype.allGeneratedPositionsFor = function(aArgs) {
    var line = util.getArg(aArgs, "line"), needle = {
      source: util.getArg(aArgs, "source"),
      originalLine: line,
      originalColumn: util.getArg(aArgs, "column", 0)
    };
    if (needle.source = this._findSourceIndex(needle.source), needle.source < 0) return [];
    var mappings = [], index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, binarySearch.LEAST_UPPER_BOUND);
    if (index >= 0) {
      var mapping = this._originalMappings[index];
      if (void 0 === aArgs.column) for (var originalLine = mapping.originalLine; mapping && mapping.originalLine === originalLine; ) mappings.push({
        line: util.getArg(mapping, "generatedLine", null),
        column: util.getArg(mapping, "generatedColumn", null),
        lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
      }), mapping = this._originalMappings[++index]; else for (var originalColumn = mapping.originalColumn; mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn; ) mappings.push({
        line: util.getArg(mapping, "generatedLine", null),
        column: util.getArg(mapping, "generatedColumn", null),
        lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
      }), mapping = this._originalMappings[++index];
    }
    return mappings;
  }, exports.SourceMapConsumer = SourceMapConsumer, BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype), 
  BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer, BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
    var i, relativeSource = aSource;
    if (null != this.sourceRoot && (relativeSource = util.relative(this.sourceRoot, relativeSource)), 
    this._sources.has(relativeSource)) return this._sources.indexOf(relativeSource);
    for (i = 0; i < this._absoluteSources.length; ++i) if (this._absoluteSources[i] == aSource) return i;
    return -1;
  }, BasicSourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
    var smc = Object.create(BasicSourceMapConsumer.prototype), names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), !0), sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), !0);
    smc.sourceRoot = aSourceMap._sourceRoot, smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(), smc.sourceRoot), 
    smc.file = aSourceMap._file, smc._sourceMapURL = aSourceMapURL, smc._absoluteSources = smc._sources.toArray().map((function(s) {
      return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
    }));
    for (var generatedMappings = aSourceMap._mappings.toArray().slice(), destGeneratedMappings = smc.__generatedMappings = [], destOriginalMappings = smc.__originalMappings = [], i = 0, length = generatedMappings.length; i < length; i++) {
      var srcMapping = generatedMappings[i], destMapping = new Mapping;
      destMapping.generatedLine = srcMapping.generatedLine, destMapping.generatedColumn = srcMapping.generatedColumn, 
      srcMapping.source && (destMapping.source = sources.indexOf(srcMapping.source), destMapping.originalLine = srcMapping.originalLine, 
      destMapping.originalColumn = srcMapping.originalColumn, srcMapping.name && (destMapping.name = names.indexOf(srcMapping.name)), 
      destOriginalMappings.push(destMapping)), destGeneratedMappings.push(destMapping);
    }
    return quickSort(smc.__originalMappings, util.compareByOriginalPositions), smc;
  }, BasicSourceMapConsumer.prototype._version = 3, Object.defineProperty(BasicSourceMapConsumer.prototype, "sources", {
    get: function() {
      return this._absoluteSources.slice();
    }
  }), BasicSourceMapConsumer.prototype._parseMappings = function(aStr, aSourceRoot) {
    for (var mapping, str, segment, end, value, generatedLine = 1, previousGeneratedColumn = 0, previousOriginalLine = 0, previousOriginalColumn = 0, previousSource = 0, previousName = 0, length = aStr.length, index = 0, cachedSegments = {}, temp = {}, originalMappings = [], generatedMappings = []; index < length; ) if (";" === aStr.charAt(index)) generatedLine++, 
    index++, previousGeneratedColumn = 0; else if ("," === aStr.charAt(index)) index++; else {
      for ((mapping = new Mapping).generatedLine = generatedLine, end = index; end < length && !this._charIsMappingSeparator(aStr, end); end++) ;
      if (segment = cachedSegments[str = aStr.slice(index, end)]) index += str.length; else {
        for (segment = []; index < end; ) base64VLQ.decode(aStr, index, temp), value = temp.value, 
        index = temp.rest, segment.push(value);
        if (2 === segment.length) throw new Error("Found a source, but no line and column");
        if (3 === segment.length) throw new Error("Found a source and line, but no column");
        cachedSegments[str] = segment;
      }
      mapping.generatedColumn = previousGeneratedColumn + segment[0], previousGeneratedColumn = mapping.generatedColumn, 
      segment.length > 1 && (mapping.source = previousSource + segment[1], previousSource += segment[1], 
      mapping.originalLine = previousOriginalLine + segment[2], previousOriginalLine = mapping.originalLine, 
      mapping.originalLine += 1, mapping.originalColumn = previousOriginalColumn + segment[3], 
      previousOriginalColumn = mapping.originalColumn, segment.length > 4 && (mapping.name = previousName + segment[4], 
      previousName += segment[4])), generatedMappings.push(mapping), "number" == typeof mapping.originalLine && originalMappings.push(mapping);
    }
    quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated), this.__generatedMappings = generatedMappings, 
    quickSort(originalMappings, util.compareByOriginalPositions), this.__originalMappings = originalMappings;
  }, BasicSourceMapConsumer.prototype._findMapping = function(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
    if (aNeedle[aLineName] <= 0) throw new TypeError("Line must be greater than or equal to 1, got " + aNeedle[aLineName]);
    if (aNeedle[aColumnName] < 0) throw new TypeError("Column must be greater than or equal to 0, got " + aNeedle[aColumnName]);
    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
  }, BasicSourceMapConsumer.prototype.computeColumnSpans = function() {
    for (var index = 0; index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];
        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }
      mapping.lastGeneratedColumn = 1 / 0;
    }
  }, BasicSourceMapConsumer.prototype.originalPositionFor = function(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, "line"),
      generatedColumn: util.getArg(aArgs, "column")
    }, index = this._findMapping(needle, this._generatedMappings, "generatedLine", "generatedColumn", util.compareByGeneratedPositionsDeflated, util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
    if (index >= 0) {
      var mapping = this._generatedMappings[index];
      if (mapping.generatedLine === needle.generatedLine) {
        var source = util.getArg(mapping, "source", null);
        null !== source && (source = this._sources.at(source), source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL));
        var name = util.getArg(mapping, "name", null);
        return null !== name && (name = this._names.at(name)), {
          source: source,
          line: util.getArg(mapping, "originalLine", null),
          column: util.getArg(mapping, "originalColumn", null),
          name: name
        };
      }
    }
    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  }, BasicSourceMapConsumer.prototype.hasContentsOfAllSources = function() {
    return !!this.sourcesContent && (this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some((function(sc) {
      return null == sc;
    })));
  }, BasicSourceMapConsumer.prototype.sourceContentFor = function(aSource, nullOnMissing) {
    if (!this.sourcesContent) return null;
    var index = this._findSourceIndex(aSource);
    if (index >= 0) return this.sourcesContent[index];
    var url, relativeSource = aSource;
    if (null != this.sourceRoot && (relativeSource = util.relative(this.sourceRoot, relativeSource)), 
    null != this.sourceRoot && (url = util.urlParse(this.sourceRoot))) {
      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
      if ("file" == url.scheme && this._sources.has(fileUriAbsPath)) return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
      if ((!url.path || "/" == url.path) && this._sources.has("/" + relativeSource)) return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
    }
    if (nullOnMissing) return null;
    throw new Error('"' + relativeSource + '" is not in the SourceMap.');
  }, BasicSourceMapConsumer.prototype.generatedPositionFor = function(aArgs) {
    var source = util.getArg(aArgs, "source");
    if ((source = this._findSourceIndex(source)) < 0) return {
      line: null,
      column: null,
      lastColumn: null
    };
    var needle = {
      source: source,
      originalLine: util.getArg(aArgs, "line"),
      originalColumn: util.getArg(aArgs, "column")
    }, index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, util.getArg(aArgs, "bias", SourceMapConsumer.GREATEST_LOWER_BOUND));
    if (index >= 0) {
      var mapping = this._originalMappings[index];
      if (mapping.source === needle.source) return {
        line: util.getArg(mapping, "generatedLine", null),
        column: util.getArg(mapping, "generatedColumn", null),
        lastColumn: util.getArg(mapping, "lastGeneratedColumn", null)
      };
    }
    return {
      line: null,
      column: null,
      lastColumn: null
    };
  }, exports.BasicSourceMapConsumer = BasicSourceMapConsumer, IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype), 
  IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer, IndexedSourceMapConsumer.prototype._version = 3, 
  Object.defineProperty(IndexedSourceMapConsumer.prototype, "sources", {
    get: function() {
      for (var sources = [], i = 0; i < this._sections.length; i++) for (var j = 0; j < this._sections[i].consumer.sources.length; j++) sources.push(this._sections[i].consumer.sources[j]);
      return sources;
    }
  }), IndexedSourceMapConsumer.prototype.originalPositionFor = function(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, "line"),
      generatedColumn: util.getArg(aArgs, "column")
    }, sectionIndex = binarySearch.search(needle, this._sections, (function(needle, section) {
      var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
      return cmp || needle.generatedColumn - section.generatedOffset.generatedColumn;
    })), section = this._sections[sectionIndex];
    return section ? section.consumer.originalPositionFor({
      line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
      column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
      bias: aArgs.bias
    }) : {
      source: null,
      line: null,
      column: null,
      name: null
    };
  }, IndexedSourceMapConsumer.prototype.hasContentsOfAllSources = function() {
    return this._sections.every((function(s) {
      return s.consumer.hasContentsOfAllSources();
    }));
  }, IndexedSourceMapConsumer.prototype.sourceContentFor = function(aSource, nullOnMissing) {
    for (var i = 0; i < this._sections.length; i++) {
      var content = this._sections[i].consumer.sourceContentFor(aSource, !0);
      if (content) return content;
    }
    if (nullOnMissing) return null;
    throw new Error('"' + aSource + '" is not in the SourceMap.');
  }, IndexedSourceMapConsumer.prototype.generatedPositionFor = function(aArgs) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      if (-1 !== section.consumer._findSourceIndex(util.getArg(aArgs, "source"))) {
        var generatedPosition = section.consumer.generatedPositionFor(aArgs);
        if (generatedPosition) return {
          line: generatedPosition.line + (section.generatedOffset.generatedLine - 1),
          column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)
        };
      }
    }
    return {
      line: null,
      column: null
    };
  }, IndexedSourceMapConsumer.prototype._parseMappings = function(aStr, aSourceRoot) {
    this.__generatedMappings = [], this.__originalMappings = [];
    for (var i = 0; i < this._sections.length; i++) for (var section = this._sections[i], sectionMappings = section.consumer._generatedMappings, j = 0; j < sectionMappings.length; j++) {
      var mapping = sectionMappings[j], source = section.consumer._sources.at(mapping.source);
      source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL), 
      this._sources.add(source), source = this._sources.indexOf(source);
      var name = null;
      mapping.name && (name = section.consumer._names.at(mapping.name), this._names.add(name), 
      name = this._names.indexOf(name));
      var adjustedMapping = {
        source: source,
        generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
        generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: name
      };
      this.__generatedMappings.push(adjustedMapping), "number" == typeof adjustedMapping.originalLine && this.__originalMappings.push(adjustedMapping);
    }
    quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated), quickSort(this.__originalMappings, util.compareByOriginalPositions);
  }, exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
}, function(module, exports) {
  exports.GREATEST_LOWER_BOUND = 1, exports.LEAST_UPPER_BOUND = 2, exports.search = function(aNeedle, aHaystack, aCompare, aBias) {
    if (0 === aHaystack.length) return -1;
    var index = function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
      var mid = Math.floor((aHigh - aLow) / 2) + aLow, cmp = aCompare(aNeedle, aHaystack[mid], !0);
      return 0 === cmp ? mid : cmp > 0 ? aHigh - mid > 1 ? recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias) : aBias == exports.LEAST_UPPER_BOUND ? aHigh < aHaystack.length ? aHigh : -1 : mid : mid - aLow > 1 ? recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias) : aBias == exports.LEAST_UPPER_BOUND ? mid : aLow < 0 ? -1 : aLow;
    }(-1, aHaystack.length, aNeedle, aHaystack, aCompare, aBias || exports.GREATEST_LOWER_BOUND);
    if (index < 0) return -1;
    for (;index - 1 >= 0 && 0 === aCompare(aHaystack[index], aHaystack[index - 1], !0); ) --index;
    return index;
  };
}, function(module, exports) {
  function swap(ary, x, y) {
    var temp = ary[x];
    ary[x] = ary[y], ary[y] = temp;
  }
  function doQuickSort(ary, comparator, p, r) {
    if (p < r) {
      var i = p - 1;
      swap(ary, (low = p, high = r, Math.round(low + Math.random() * (high - low))), r);
      for (var pivot = ary[r], j = p; j < r; j++) comparator(ary[j], pivot) <= 0 && swap(ary, i += 1, j);
      swap(ary, i + 1, j);
      var q = i + 1;
      doQuickSort(ary, comparator, p, q - 1), doQuickSort(ary, comparator, q + 1, r);
    }
    var low, high;
  }
  exports.quickSort = function(ary, comparator) {
    doQuickSort(ary, comparator, 0, ary.length - 1);
  };
}, function(module, exports, __webpack_require__) {
  var SourceMapGenerator = __webpack_require__(5).SourceMapGenerator, util = __webpack_require__(0), REGEX_NEWLINE = /(\r?\n)/, isSourceNode = "$$$isSourceNode$$$";
  function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
    this.children = [], this.sourceContents = {}, this.line = null == aLine ? null : aLine, 
    this.column = null == aColumn ? null : aColumn, this.source = null == aSource ? null : aSource, 
    this.name = null == aName ? null : aName, this[isSourceNode] = !0, null != aChunks && this.add(aChunks);
  }
  SourceNode.fromStringWithSourceMap = function(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
    var node = new SourceNode, remainingLines = aGeneratedCode.split(REGEX_NEWLINE), remainingLinesIndex = 0, shiftNextLine = function() {
      return getNextLine() + (getNextLine() || "");
      function getNextLine() {
        return remainingLinesIndex < remainingLines.length ? remainingLines[remainingLinesIndex++] : void 0;
      }
    }, lastGeneratedLine = 1, lastGeneratedColumn = 0, lastMapping = null;
    return aSourceMapConsumer.eachMapping((function(mapping) {
      if (null !== lastMapping) {
        if (!(lastGeneratedLine < mapping.generatedLine)) {
          var code = (nextLine = remainingLines[remainingLinesIndex] || "").substr(0, mapping.generatedColumn - lastGeneratedColumn);
          return remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn), 
          lastGeneratedColumn = mapping.generatedColumn, addMappingWithCode(lastMapping, code), 
          void (lastMapping = mapping);
        }
        addMappingWithCode(lastMapping, shiftNextLine()), lastGeneratedLine++, lastGeneratedColumn = 0;
      }
      for (;lastGeneratedLine < mapping.generatedLine; ) node.add(shiftNextLine()), lastGeneratedLine++;
      if (lastGeneratedColumn < mapping.generatedColumn) {
        var nextLine = remainingLines[remainingLinesIndex] || "";
        node.add(nextLine.substr(0, mapping.generatedColumn)), remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn), 
        lastGeneratedColumn = mapping.generatedColumn;
      }
      lastMapping = mapping;
    }), this), remainingLinesIndex < remainingLines.length && (lastMapping && addMappingWithCode(lastMapping, shiftNextLine()), 
    node.add(remainingLines.splice(remainingLinesIndex).join(""))), aSourceMapConsumer.sources.forEach((function(sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      null != content && (null != aRelativePath && (sourceFile = util.join(aRelativePath, sourceFile)), 
      node.setSourceContent(sourceFile, content));
    })), node;
    function addMappingWithCode(mapping, code) {
      if (null === mapping || void 0 === mapping.source) node.add(code); else {
        var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
        node.add(new SourceNode(mapping.originalLine, mapping.originalColumn, source, code, mapping.name));
      }
    }
  }, SourceNode.prototype.add = function(aChunk) {
    if (Array.isArray(aChunk)) aChunk.forEach((function(chunk) {
      this.add(chunk);
    }), this); else {
      if (!aChunk[isSourceNode] && "string" != typeof aChunk) throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
      aChunk && this.children.push(aChunk);
    }
    return this;
  }, SourceNode.prototype.prepend = function(aChunk) {
    if (Array.isArray(aChunk)) for (var i = aChunk.length - 1; i >= 0; i--) this.prepend(aChunk[i]); else {
      if (!aChunk[isSourceNode] && "string" != typeof aChunk) throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
      this.children.unshift(aChunk);
    }
    return this;
  }, SourceNode.prototype.walk = function(aFn) {
    for (var chunk, i = 0, len = this.children.length; i < len; i++) (chunk = this.children[i])[isSourceNode] ? chunk.walk(aFn) : "" !== chunk && aFn(chunk, {
      source: this.source,
      line: this.line,
      column: this.column,
      name: this.name
    });
  }, SourceNode.prototype.join = function(aSep) {
    var newChildren, i, len = this.children.length;
    if (len > 0) {
      for (newChildren = [], i = 0; i < len - 1; i++) newChildren.push(this.children[i]), 
      newChildren.push(aSep);
      newChildren.push(this.children[i]), this.children = newChildren;
    }
    return this;
  }, SourceNode.prototype.replaceRight = function(aPattern, aReplacement) {
    var lastChild = this.children[this.children.length - 1];
    return lastChild[isSourceNode] ? lastChild.replaceRight(aPattern, aReplacement) : "string" == typeof lastChild ? this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement) : this.children.push("".replace(aPattern, aReplacement)), 
    this;
  }, SourceNode.prototype.setSourceContent = function(aSourceFile, aSourceContent) {
    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
  }, SourceNode.prototype.walkSourceContents = function(aFn) {
    for (var i = 0, len = this.children.length; i < len; i++) this.children[i][isSourceNode] && this.children[i].walkSourceContents(aFn);
    var sources = Object.keys(this.sourceContents);
    for (i = 0, len = sources.length; i < len; i++) aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
  }, SourceNode.prototype.toString = function() {
    var str = "";
    return this.walk((function(chunk) {
      str += chunk;
    })), str;
  }, SourceNode.prototype.toStringWithSourceMap = function(aArgs) {
    var generated = {
      code: "",
      line: 1,
      column: 0
    }, map = new SourceMapGenerator(aArgs), sourceMappingActive = !1, lastOriginalSource = null, lastOriginalLine = null, lastOriginalColumn = null, lastOriginalName = null;
    return this.walk((function(chunk, original) {
      generated.code += chunk, null !== original.source && null !== original.line && null !== original.column ? (lastOriginalSource === original.source && lastOriginalLine === original.line && lastOriginalColumn === original.column && lastOriginalName === original.name || map.addMapping({
        source: original.source,
        original: {
          line: original.line,
          column: original.column
        },
        generated: {
          line: generated.line,
          column: generated.column
        },
        name: original.name
      }), lastOriginalSource = original.source, lastOriginalLine = original.line, lastOriginalColumn = original.column, 
      lastOriginalName = original.name, sourceMappingActive = !0) : sourceMappingActive && (map.addMapping({
        generated: {
          line: generated.line,
          column: generated.column
        }
      }), lastOriginalSource = null, sourceMappingActive = !1);
      for (var idx = 0, length = chunk.length; idx < length; idx++) 10 === chunk.charCodeAt(idx) ? (generated.line++, 
      generated.column = 0, idx + 1 === length ? (lastOriginalSource = null, sourceMappingActive = !1) : sourceMappingActive && map.addMapping({
        source: original.source,
        original: {
          line: original.line,
          column: original.column
        },
        generated: {
          line: generated.line,
          column: generated.column
        },
        name: original.name
      })) : generated.column++;
    })), this.walkSourceContents((function(sourceFile, sourceContent) {
      map.setSourceContent(sourceFile, sourceContent);
    })), {
      code: generated.code,
      map: map
    };
  }, exports.SourceNode = SourceNode;
}, function(module, exports) {
  module.exports = require("./webpack-sources");
}, function(module, exports, __webpack_require__) {
  "use strict";
  const path = __webpack_require__(1), NORMALIZE_SLASH_DIRECTION_REGEXP = /\\/g, PATH_CHARS_REGEXP = /[-[\]{}()*+?.,\\^$|#\s]/g, SEPARATOR_REGEXP = /[/\\]$/, FRONT_OR_BACK_BANG_REGEXP = /^!|!$/g, INDEX_JS_REGEXP = /\/index.js(!|\?|\(query\))/g, MATCH_RESOURCE_REGEXP = /!=!/, normalizeBackSlashDirection = request => request.replace(NORMALIZE_SLASH_DIRECTION_REGEXP, "/"), createRegExpForPath = path => {
    const regexpTypePartial = path.replace(PATH_CHARS_REGEXP, "\\$&");
    return new RegExp("(^|!)" + regexpTypePartial, "g");
  };
  module.exports = class {
    constructor(directory) {
      directory = normalizeBackSlashDirection(directory), SEPARATOR_REGEXP.test(directory) && (directory = directory.substr(0, directory.length - 1)), 
      directory && (this.currentDirectoryRegExp = createRegExpForPath(directory));
      const dirname = path.dirname(directory), parentDirectory = SEPARATOR_REGEXP.test(dirname) ? dirname.substr(0, dirname.length - 1) : dirname;
      if (parentDirectory && parentDirectory !== directory && (this.parentDirectoryRegExp = createRegExpForPath(parentDirectory + "/")), 
      __dirname.length >= 2) {
        const buildins = normalizeBackSlashDirection(path.join(__dirname, "..")), buildinsAsModule = this.currentDirectoryRegExp && this.currentDirectoryRegExp.test(buildins);
        this.buildinsAsModule = buildinsAsModule, this.buildinsRegExp = createRegExpForPath(buildins);
      }
      this.cache = new Map;
    }
    shorten(request) {
      if (!request) return request;
      const cacheEntry = this.cache.get(request);
      if (void 0 !== cacheEntry) return cacheEntry;
      let result = normalizeBackSlashDirection(request);
      return this.buildinsAsModule && this.buildinsRegExp && (result = result.replace(this.buildinsRegExp, "!(webpack)")), 
      this.currentDirectoryRegExp && (result = result.replace(this.currentDirectoryRegExp, "!.")), 
      this.parentDirectoryRegExp && (result = result.replace(this.parentDirectoryRegExp, "!../")), 
      !this.buildinsAsModule && this.buildinsRegExp && (result = result.replace(this.buildinsRegExp, "!(webpack)")), 
      result = result.replace(INDEX_JS_REGEXP, "$1"), result = result.replace(FRONT_OR_BACK_BANG_REGEXP, ""), 
      result = result.replace(MATCH_RESOURCE_REGEXP, " = "), this.cache.set(request, result), 
      result;
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const createHash = __webpack_require__(22), ModuleFilenameHelpers = exports;
  ModuleFilenameHelpers.ALL_LOADERS_RESOURCE = "[all-loaders][resource]", ModuleFilenameHelpers.REGEXP_ALL_LOADERS_RESOURCE = /\[all-?loaders\]\[resource\]/gi, 
  ModuleFilenameHelpers.LOADERS_RESOURCE = "[loaders][resource]", ModuleFilenameHelpers.REGEXP_LOADERS_RESOURCE = /\[loaders\]\[resource\]/gi, 
  ModuleFilenameHelpers.RESOURCE = "[resource]", ModuleFilenameHelpers.REGEXP_RESOURCE = /\[resource\]/gi, 
  ModuleFilenameHelpers.ABSOLUTE_RESOURCE_PATH = "[absolute-resource-path]", ModuleFilenameHelpers.REGEXP_ABSOLUTE_RESOURCE_PATH = /\[abs(olute)?-?resource-?path\]/gi, 
  ModuleFilenameHelpers.RESOURCE_PATH = "[resource-path]", ModuleFilenameHelpers.REGEXP_RESOURCE_PATH = /\[resource-?path\]/gi, 
  ModuleFilenameHelpers.ALL_LOADERS = "[all-loaders]", ModuleFilenameHelpers.REGEXP_ALL_LOADERS = /\[all-?loaders\]/gi, 
  ModuleFilenameHelpers.LOADERS = "[loaders]", ModuleFilenameHelpers.REGEXP_LOADERS = /\[loaders\]/gi, 
  ModuleFilenameHelpers.QUERY = "[query]", ModuleFilenameHelpers.REGEXP_QUERY = /\[query\]/gi, 
  ModuleFilenameHelpers.ID = "[id]", ModuleFilenameHelpers.REGEXP_ID = /\[id\]/gi, 
  ModuleFilenameHelpers.HASH = "[hash]", ModuleFilenameHelpers.REGEXP_HASH = /\[hash\]/gi, 
  ModuleFilenameHelpers.NAMESPACE = "[namespace]", ModuleFilenameHelpers.REGEXP_NAMESPACE = /\[namespace\]/gi;
  const getBefore = (str, token) => {
    const idx = str.lastIndexOf(token);
    return idx < 0 ? "" : str.substr(0, idx);
  }, getHash = str => {
    const hash = createHash("md4");
    hash.update(str);
    return hash.digest("hex").substr(0, 4);
  }, asRegExp = test => ("string" == typeof test && (test = new RegExp("^" + test.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"))), 
  test);
  ModuleFilenameHelpers.createFilename = (module, options, requestShortener) => {
    const opts = Object.assign({
      namespace: "",
      moduleFilenameTemplate: ""
    }, "object" == typeof options ? options : {
      moduleFilenameTemplate: options
    });
    let absoluteResourcePath, hash, identifier, moduleId, shortIdentifier;
    void 0 === module && (module = ""), "string" == typeof module ? (shortIdentifier = requestShortener.shorten(module), 
    identifier = shortIdentifier, moduleId = "", absoluteResourcePath = module.split("!").pop(), 
    hash = getHash(identifier)) : (shortIdentifier = module.readableIdentifier(requestShortener), 
    identifier = requestShortener.shorten(module.identifier()), moduleId = module.id, 
    absoluteResourcePath = module.identifier().split("!").pop(), hash = getHash(identifier));
    const resource = shortIdentifier.split("!").pop(), loaders = getBefore(shortIdentifier, "!"), allLoaders = getBefore(identifier, "!"), query = ((str, token) => {
      const idx = str.indexOf(token);
      return idx < 0 ? "" : str.substr(idx);
    })(resource, "?"), resourcePath = resource.substr(0, resource.length - query.length);
    return "function" == typeof opts.moduleFilenameTemplate ? opts.moduleFilenameTemplate({
      identifier: identifier,
      shortIdentifier: shortIdentifier,
      resource: resource,
      resourcePath: resourcePath,
      absoluteResourcePath: absoluteResourcePath,
      allLoaders: allLoaders,
      query: query,
      moduleId: moduleId,
      hash: hash,
      namespace: opts.namespace
    }) : opts.moduleFilenameTemplate.replace(ModuleFilenameHelpers.REGEXP_ALL_LOADERS_RESOURCE, identifier).replace(ModuleFilenameHelpers.REGEXP_LOADERS_RESOURCE, shortIdentifier).replace(ModuleFilenameHelpers.REGEXP_RESOURCE, resource).replace(ModuleFilenameHelpers.REGEXP_RESOURCE_PATH, resourcePath).replace(ModuleFilenameHelpers.REGEXP_ABSOLUTE_RESOURCE_PATH, absoluteResourcePath).replace(ModuleFilenameHelpers.REGEXP_ALL_LOADERS, allLoaders).replace(ModuleFilenameHelpers.REGEXP_LOADERS, loaders).replace(ModuleFilenameHelpers.REGEXP_QUERY, query).replace(ModuleFilenameHelpers.REGEXP_ID, moduleId).replace(ModuleFilenameHelpers.REGEXP_HASH, hash).replace(ModuleFilenameHelpers.REGEXP_NAMESPACE, opts.namespace);
  }, ModuleFilenameHelpers.replaceDuplicates = (array, fn, comparator) => {
    const countMap = Object.create(null), posMap = Object.create(null);
    return array.forEach((item, idx) => {
      countMap[item] = countMap[item] || [], countMap[item].push(idx), posMap[item] = 0;
    }), comparator && Object.keys(countMap).forEach(item => {
      countMap[item].sort(comparator);
    }), array.map((item, i) => countMap[item].length > 1 ? comparator && countMap[item][0] === i ? item : fn(item, i, posMap[item]++) : item);
  }, ModuleFilenameHelpers.matchPart = (str, test) => !test || (test = asRegExp(test), 
  Array.isArray(test) ? test.map(asRegExp).some(regExp => regExp.test(str)) : test.test(str)), 
  ModuleFilenameHelpers.matchObject = (obj, str) => !(obj.test && !ModuleFilenameHelpers.matchPart(str, obj.test)) && (!(obj.include && !ModuleFilenameHelpers.matchPart(str, obj.include)) && (!obj.exclude || !ModuleFilenameHelpers.matchPart(str, obj.exclude)));
}, function(module, exports, __webpack_require__) {
  "use strict";
  const AbstractMethodError = __webpack_require__(23);
  class Hash {
    update(data, inputEncoding) {
      throw new AbstractMethodError;
    }
    digest(encoding) {
      throw new AbstractMethodError;
    }
  }
  exports.Hash = Hash;
  class BulkUpdateDecorator extends Hash {
    constructor(hash) {
      super(), this.hash = hash, this.buffer = "";
    }
    update(data, inputEncoding) {
      return void 0 !== inputEncoding || "string" != typeof data || data.length > 1e3 ? (this.buffer.length > 0 && (this.hash.update(this.buffer), 
      this.buffer = ""), this.hash.update(data, inputEncoding)) : (this.buffer += data, 
      this.buffer.length > 1e3 && (this.hash.update(this.buffer), this.buffer = "")), 
      this;
    }
    digest(encoding) {
      this.buffer.length > 0 && this.hash.update(this.buffer);
      var digestResult = this.hash.digest(encoding);
      return "string" == typeof digestResult ? digestResult : digestResult.toString();
    }
  }
  class DebugHash extends Hash {
    constructor() {
      super(), this.string = "";
    }
    update(data, inputEncoding) {
      return "string" != typeof data && (data = data.toString("utf-8")), this.string += data, 
      this;
    }
    digest(encoding) {
      return this.string.replace(/[^a-z0-9]+/gi, m => Buffer.from(m).toString("hex"));
    }
  }
  module.exports = algorithm => {
    if ("function" == typeof algorithm) return new BulkUpdateDecorator(new algorithm);
    switch (algorithm) {
     case "debug":
      return new DebugHash;

     default:
      return new BulkUpdateDecorator(__webpack_require__(4).createHash(algorithm));
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const WebpackError = __webpack_require__(24), CURRENT_METHOD_REGEXP = /at ([a-zA-Z0-9_.]*)/;
  function createMessage(method) {
    return `Abstract method${method ? " " + method : ""}. Must be overridden.`;
  }
  function Message() {
    this.stack = void 0, Error.captureStackTrace(this);
    const match = this.stack.split("\n")[3].match(CURRENT_METHOD_REGEXP);
    this.message = match && match[1] ? createMessage(match[1]) : createMessage();
  }
  module.exports = class extends WebpackError {
    constructor() {
      super((new Message).message), this.name = "AbstractMethodError";
    }
  };
}, function(module, exports, __webpack_require__) {
  "use strict";
  const inspect = __webpack_require__(25).inspect.custom;
  class WebpackError extends Error {
    constructor(message) {
      super(message), this.details = void 0, this.missing = void 0, this.origin = void 0, 
      this.dependencies = void 0, this.module = void 0, Error.captureStackTrace(this, this.constructor);
    }
    [inspect]() {
      return this.stack + (this.details ? "\n" + this.details : "");
    }
  }
  module.exports = WebpackError;
}, function(module, exports) {
  module.exports = require("util");
}, function(module, exports) {
  module.exports = require("./schema-utils");
}, function(module) {
  module.exports = JSON.parse('{"name":"terser","description":"JavaScript parser, mangler/compressor and beautifier toolkit for ES6+","homepage":"https://terser.org","author":"Mihai Bazon <mihai.bazon@gmail.com> (http://lisperator.net/)","license":"BSD-2-Clause","version":"4.8.1"}');
}, function(module) {
  module.exports = JSON.parse('{"additionalProperties":false,"definitions":{"file-conditions":{"anyOf":[{"instanceof":"RegExp"},{"type":"string"}]}},"properties":{"test":{"anyOf":[{"$ref":"#/definitions/file-conditions"},{"items":{"anyOf":[{"$ref":"#/definitions/file-conditions"}]},"type":"array"}]},"include":{"anyOf":[{"$ref":"#/definitions/file-conditions"},{"items":{"anyOf":[{"$ref":"#/definitions/file-conditions"}]},"type":"array"}]},"exclude":{"anyOf":[{"$ref":"#/definitions/file-conditions"},{"items":{"anyOf":[{"$ref":"#/definitions/file-conditions"}]},"type":"array"}]},"chunkFilter":{"instanceof":"Function"},"cache":{"anyOf":[{"type":"boolean"},{"type":"string"}]},"cacheKeys":{"instanceof":"Function"},"parallel":{"anyOf":[{"type":"boolean"},{"type":"integer"}]},"sourceMap":{"type":"boolean"},"minify":{"instanceof":"Function"},"terserOptions":{"additionalProperties":true,"type":"object"},"extractComments":{"anyOf":[{"type":"boolean"},{"type":"string"},{"instanceof":"RegExp"},{"instanceof":"Function"},{"additionalProperties":false,"properties":{"condition":{"anyOf":[{"type":"boolean"},{"type":"string"},{"instanceof":"RegExp"},{"instanceof":"Function"}]},"filename":{"anyOf":[{"type":"string"},{"instanceof":"Function"}]},"banner":{"anyOf":[{"type":"boolean"},{"type":"string"},{"instanceof":"Function"}]}},"type":"object"}]},"warningsFilter":{"instanceof":"Function"}},"type":"object"}');
}, function(module, exports, __webpack_require__) {
  "use strict";
  Object.defineProperty(exports, "__esModule", {
    value: !0
  }), exports.default = void 0;
  var _os = _interopRequireDefault(__webpack_require__(9)), _cacache = _interopRequireDefault(__webpack_require__(30)), _findCacheDir = _interopRequireDefault(__webpack_require__(31)), _workerFarm = _interopRequireDefault(__webpack_require__(32)), _serializeJavascript = _interopRequireDefault(__webpack_require__(8)), _isWsl = _interopRequireDefault(__webpack_require__(33)), _minify = _interopRequireDefault(__webpack_require__(2));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  const worker = __webpack_require__(1).resolve(__dirname, "./terser-worker.js");
  exports.default = class {
    constructor(options = {}) {
      const {cache: cache, parallel: parallel} = options;
      this.cacheDir = !0 === cache ? (0, _findCacheDir.default)({
        name: "terser-webpack-plugin"
      }) || _os.default.tmpdir() : cache;
      const cpus = _os.default.cpus() || {
        length: 1
      };
      this.maxConcurrentWorkers = _isWsl.default ? 1 : !0 === parallel ? cpus.length - 1 : Math.min(Number(parallel) || 0, cpus.length - 1);
    }
    run(tasks, callback) {
      if (!tasks.length) return void callback(null, []);
      if (this.maxConcurrentWorkers > 1) {
        const workerOptions = "win32" === process.platform ? {
          maxConcurrentWorkers: this.maxConcurrentWorkers,
          maxConcurrentCallsPerWorker: 1
        } : {
          maxConcurrentWorkers: this.maxConcurrentWorkers
        };
        this.workers = (0, _workerFarm.default)(workerOptions, worker), this.boundWorkers = (options, cb) => {
          try {
            this.workers((0, _serializeJavascript.default)(options), cb);
          } catch (error) {
            cb(error);
          }
        };
      } else this.boundWorkers = (options, cb) => {
        try {
          cb(null, (0, _minify.default)(options));
        } catch (error) {
          cb(error);
        }
      };
      let toRun = tasks.length;
      const results = [], step = (index, data) => {
        toRun -= 1, results[index] = data, toRun || callback(null, results);
      };
      tasks.forEach((task, index) => {
        const enqueue = () => {
          this.boundWorkers(task, (error, data) => {
            const result = error ? {
              error: error
            } : data, done = () => step(index, result);
            this.cacheDir && !result.error ? _cacache.default.put(this.cacheDir, (0, _serializeJavascript.default)(task.cacheKeys), JSON.stringify(data)).then(done, done) : done();
          });
        };
        this.cacheDir ? _cacache.default.get(this.cacheDir, (0, _serializeJavascript.default)(task.cacheKeys)).then(({data: data}) => step(index, JSON.parse(data)), enqueue) : enqueue();
      });
    }
    exit() {
      this.workers && _workerFarm.default.end(this.workers);
    }
  };
}, function(module, exports) {
  module.exports = require("../vendor/cacache");
}, function(module, exports) {
  module.exports = require("../vendor/find-cache-dir");
}, function(module, exports) {
  module.exports = require("../vendor/worker-farm");
}, function(module, exports, __webpack_require__) {
  "use strict";
  const os = __webpack_require__(9), fs = __webpack_require__(34), isWsl = () => {
    if ("linux" !== process.platform) return !1;
    if (os.release().includes("Microsoft")) return !0;
    try {
      return fs.readFileSync("/proc/version", "utf8").includes("Microsoft");
    } catch (err) {
      return !1;
    }
  };
  process.env.__IS_WSL_TEST__ ? module.exports = isWsl : module.exports = isWsl();
}, function(module, exports) {
  module.exports = require("fs");
}, function(module) {
  module.exports = JSON.parse('{"name":"terser-webpack-plugin","version":"1.4.3","description":"Terser plugin for webpack","license":"MIT"}');
} ]);