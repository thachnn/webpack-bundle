!function() {
  var __webpack_modules__ = {
    870: function(__unused_webpack_module, exports, __webpack_require__) {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      var _createClass = function() {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
            "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
          }
        }
        return function(Constructor, protoProps, staticProps) {
          return protoProps && defineProperties(Constructor.prototype, protoProps), staticProps && defineProperties(Constructor, staticProps), 
          Constructor;
        };
      }(), _fs2 = _interopRequireDefault(__webpack_require__(147)), _path2 = _interopRequireDefault(__webpack_require__(17)), _requireResolve2 = _interopRequireDefault(__webpack_require__(693));
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }
      var BabelInlineImportHelper = function() {
        function BabelInlineImportHelper() {
          !function(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
          }(this, BabelInlineImportHelper);
        }
        return _createClass(BabelInlineImportHelper, null, [ {
          key: "shouldBeInlined",
          value: function(givenPath, extensions) {
            var accept = "string" == typeof extensions ? [ extensions ] : extensions || BabelInlineImportHelper.extensions, _iteratorNormalCompletion = !0, _didIteratorError = !1, _iteratorError = void 0;
            try {
              for (var _step, _iterator = accept[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = !0) {
                var extension = _step.value;
                if (givenPath.endsWith(extension)) return !0;
              }
            } catch (err) {
              _didIteratorError = !0, _iteratorError = err;
            } finally {
              try {
                !_iteratorNormalCompletion && _iterator.return && _iterator.return();
              } finally {
                if (_didIteratorError) throw _iteratorError;
              }
            }
            return !1;
          }
        }, {
          key: "getContents",
          value: function(givenPath, reference) {
            if (!reference) throw new Error('"reference" argument must be specified');
            var mod = (0, _requireResolve2.default)(givenPath, _path2.default.resolve(reference));
            if (!mod || !mod.src) throw new Error("Path '" + givenPath + "' could not be found for '" + reference + "'");
            return _fs2.default.readFileSync(mod.src).toString();
          }
        }, {
          key: "transformRelativeToRootPath",
          value: function(path, rootPathSuffix) {
            if (this.hasRoot(path)) {
              var withoutRoot = path.substring(1, path.length);
              return "" + BabelInlineImportHelper.root + (rootPathSuffix || "") + "/" + withoutRoot;
            }
            if ("string" == typeof path) return path;
            throw new Error("ERROR: No path passed");
          }
        }, {
          key: "hasRoot",
          value: function(string) {
            return "string" == typeof string && "/" === string.substring(0, 1);
          }
        } ]), BabelInlineImportHelper;
      }();
      BabelInlineImportHelper.extensions = [ ".raw", ".text", ".graphql" ], BabelInlineImportHelper.root = global.rootPath || process.cwd(), 
      exports.default = BabelInlineImportHelper;
    },
    9: function(module, __unused_webpack_exports, __webpack_require__) {
      var os = __webpack_require__(37), path = __webpack_require__(17), p = {};
      Object.keys(path).forEach((function(key) {
        p[key] = path[key];
      })), path = p;
      var ost = os.type().toLowerCase(), OSObj = null;
      if (0 === ost.indexOf("lin")) OSObj = new function() {
        this.tempdir = function() {
          return "/tmp";
        }, this.homedir = function() {
          return process.env.HOME;
        }, this.datadir = function(appname) {
          return this.homedir() + "/.config/" + appname;
        };
      }; else if (0 === ost.indexOf("darwin")) OSObj = new function() {
        this.tempdir = function() {
          return "/tmp";
        }, this.homedir = function() {
          return process.env.HOME;
        }, this.datadir = function(appname) {
          return this.homedir() + "/Library/Application Support/" + appname;
        };
      }; else if (0 === ost.indexOf("freebsd")) OSObj = new function() {
        this.tempdir = function() {
          return "/tmp";
        }, this.homedir = function() {
          return process.env.HOME;
        }, this.datadir = function(appname) {
          return this.homedir() + "/.config/" + appname;
        };
      }; else if (0 === ost.indexOf("win")) OSObj = new function() {
        this.tempdir = function() {
          return process.env.TEMP;
        }, this.homedir = function() {
          return process.env.USERPROFILE;
        }, this.datadir = function(appname) {
          return process.env.APPDATA + "\\" + appname;
        };
      }; else {
        if (0 !== ost.indexOf("sunos")) throw new Error("Unsupported OS: " + ost);
        OSObj = new function() {
          this.tempdir = function() {
            return "/tmp";
          }, this.homedir = function() {
            return process.env.HOME;
          }, this.datadir = function(appname) {
            return this.homedir() + "/.config/" + appname;
          };
        };
      }
      null == path.tempdir && (path.tempdir = OSObj.tempdir), null == path.homedir && (path.homedir = OSObj.homedir), 
      null == path.datadir && (path.datadir = OSObj.datadir), module.exports = path;
    },
    693: function(module, __unused_webpack_exports, __webpack_require__) {
      "use strict";
      var path = __webpack_require__(900), locate = __webpack_require__(830), getPkg = locate.getPkg, getModuleDir = locate.getModuleDir, EXTENSIONS = [ ".js", ".json" ];
      function resolveDir(dir) {
        var main, isDir, pkg = getPkg(dir);
        return isDir = "." === (main = pkg && pkg.root === dir && pkg.main || "index") || "./" === main || /(?:\/\.{0,2})$/.test(main), 
        resolveFile(path.resolve(dir, main, isDir ? "index" : ""));
      }
      function resolveFile(file) {
        var i, exts = [ "" ].concat(EXTENSIONS);
        for (i = 0; i < exts.length; i++) if (path.isFileSync(file + exts[i])) return file + exts[i];
        return null;
      }
      function resolve(filePath, isDir) {
        if (isDir) return resolveDir(filePath);
        var result = resolveFile(filePath);
        return result || (result = resolveDir(filePath)), result;
      }
      module.exports = function(requiredPath, refFile) {
        requiredPath = path.normalizePathSeparate(requiredPath, "/"), refFile = path.normalizePathSeparate(refFile || process.cwd(), "/");
        var result, isDir = /(?:\/\.{0,2})$/.test(requiredPath), refDir = path.dirname(refFile);
        if (path.isAbsolutePath(requiredPath)) result = resolve(requiredPath, isDir); else if (path.isRelativePath(requiredPath)) result = resolve(path.resolve(refDir, requiredPath), isDir); else {
          var moduleName, modulePath, moduleDir, parts = requiredPath.split("/");
          moduleName = parts.shift(), modulePath = parts.join("/"), (moduleDir = getModuleDir(refDir, moduleName)) && (result = resolve(path.join(moduleDir, modulePath), isDir));
        }
        return result ? {
          src: result,
          pkg: getPkg(path.dirname(result))
        } : null;
      };
    },
    830: function(__unused_webpack_module, exports, __webpack_require__) {
      var path = __webpack_require__(900), allCache = {};
      function directoryUp(dir, name, type, cb, disableCache) {
        var i, cache, dirs, filePath, result, group;
        for (dirs = dir.split("/").map((function(d, i, ref) {
          return ref.slice(0, i + 1).join("/");
        })), group = type + ":" + name, allCache.hasOwnProperty(group) || (allCache[group] = {}), 
        cache = allCache[group], type = /file/.test(type) ? "isFileSync" : "isDirectorySync", 
        i = dirs.length - 1; i >= 0; i--) {
          if (dir = dirs[i], filePath = path.join(dir, name), !disableCache && cache[dir]) {
            i++, result = cache[dir];
            break;
          }
          if (path[type](filePath) && (result = cb(filePath, dir, name))) break;
        }
        if (!disableCache && result) for (;i < dirs.length; ) cache[dir] = result, i++;
        return result || null;
      }
      exports.getPkg = function(dir) {
        return directoryUp(dir, "package.json", "file", (function(filePath, dir) {
          var pkg, result;
          try {
            pkg = require(filePath);
          } catch (e) {}
          return pkg && pkg.name && pkg.version && (result = {
            name: pkg.name,
            version: pkg.version,
            main: pkg.main,
            root: dir
          }), result;
        }));
      }, exports.getModuleDir = function(dir, moduleName) {
        return moduleName = moduleName || "", directoryUp(dir, "node_modules", "directory", (function(filePath) {
          if (filePath = path.join(filePath, moduleName), path.isDirectorySync(filePath)) return filePath;
        }), !0);
      };
    },
    900: function(module, __unused_webpack_exports, __webpack_require__) {
      "use strict";
      var path = __webpack_require__(9), fs = __webpack_require__(147);
      function statAsync(isType, filePath, cb) {
        fs.stat(filePath, (function(err, stat) {
          var exists;
          (err = err && [ "ENOENT", "ENOTDIR" ].indexOf(err.code) < 0 ? err : null) || (exists = !!stat && stat[isType]()), 
          cb(err, exists);
        }));
      }
      function statSync(isType, filePath, cb) {
        var stat;
        try {
          stat = fs.statSync(filePath);
        } catch (e) {
          if ([ "ENOENT", "ENOTDIR" ].indexOf(e.code) < 0) throw e;
          return !1;
        }
        return stat[isType]();
      }
      path.isAbsolutePath = function(filePath) {
        return "win32" === process.platform ? /[\w]:[\\\/]/.test(filePath) : "/" === filePath[0];
      }, path.isRelativePath = function(filePath) {
        return /^\.{1,2}[\\\/]/.test(filePath);
      }, path.isRootDirectory = function(filePath) {
        return "win32" === process.platform ? /^[\w]:[\\\/]?$/.test(filePath) : "/" === filePath;
      }, path.unifyPathSeparate = function(filePath) {
        return filePath.replace(/[\\\/]/g, path.sep);
      }, path.normalizePathSeparate = function(filePath, sep) {
        return filePath.replace(/[\\\/]/g, sep || "/");
      }, path.isDirectory = function(filePath, cb) {
        return statAsync("isDirectory", filePath, cb);
      }, path.isFile = function(filePath, cb) {
        return statAsync("isFile", filePath, cb);
      }, path.isDirectorySync = function(filePath, cb) {
        return statSync("isDirectory", filePath);
      }, path.isFileSync = function(filePath, cb) {
        return statSync("isFile", filePath);
      }, module.exports = path;
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
    var exports = __webpack_exports__;
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(_ref) {
      var t = _ref.types;
      return new function BabelInlineImport() {
        return function(instance, Constructor) {
          if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }(this, BabelInlineImport), {
          visitor: {
            ImportDeclaration: {
              exit: function(path, state) {
                var givenPath = path.node.source.value, reference = state && state.file && state.file.opts.filename, extensions = state && state.opts && state.opts.extensions;
                if (_helper2.default.shouldBeInlined(givenPath, extensions)) {
                  if (path.node.specifiers.length > 1) throw new Error("Destructuring inlined import is not allowed. Check the import statement for '" + givenPath + "'");
                  var id = path.node.specifiers[0].local.name, content = _helper2.default.getContents(givenPath, reference), variable = t.variableDeclarator(t.identifier(id), t.stringLiteral(content));
                  path.replaceWith({
                    type: "VariableDeclaration",
                    kind: "const",
                    declarations: [ variable ],
                    leadingComments: [ {
                      type: "CommentBlock",
                      value: " babel-plugin-inline-import '" + givenPath + "' "
                    } ]
                  });
                }
              }
            }
          }
        };
      };
    };
    var obj, _helper = __webpack_require__(870), _helper2 = (obj = _helper) && obj.__esModule ? obj : {
      default: obj
    };
  }();
  var __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
}();