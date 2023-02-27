(() => {
  var __webpack_modules__ = {
    70630: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var scopedPackagePattern = new RegExp("^(?:@([^/]+?)[/])?([^/]+?)$"), builtins = __webpack_require__(43732), blacklist = [ "node_modules", "favicon.ico" ];
      (module.exports = function(name) {
        var warnings = [], errors = [];
        if (null === name) return errors.push("name cannot be null"), done(warnings, errors);
        if (void 0 === name) return errors.push("name cannot be undefined"), done(warnings, errors);
        if ("string" != typeof name) return errors.push("name must be a string"), done(warnings, errors);
        if (name.length || errors.push("name length must be greater than zero"), name.match(/^\./) && errors.push("name cannot start with a period"), 
        name.match(/^_/) && errors.push("name cannot start with an underscore"), name.trim() !== name && errors.push("name cannot contain leading or trailing spaces"), 
        blacklist.forEach((function(blacklistedName) {
          name.toLowerCase() === blacklistedName && errors.push(blacklistedName + " is a blacklisted name");
        })), builtins.forEach((function(builtin) {
          name.toLowerCase() === builtin && warnings.push(builtin + " is a core module name");
        })), name.length > 214 && warnings.push("name can no longer contain more than 214 characters"), 
        name.toLowerCase() !== name && warnings.push("name can no longer contain capital letters"), 
        /[~'!()*]/.test(name.split("/").slice(-1)[0]) && warnings.push('name can no longer contain special characters ("~\'!()*")'), 
        encodeURIComponent(name) !== name) {
          var nameMatch = name.match(scopedPackagePattern);
          if (nameMatch) {
            var user = nameMatch[1], pkg = nameMatch[2];
            if (encodeURIComponent(user) === user && encodeURIComponent(pkg) === pkg) return done(warnings, errors);
          }
          errors.push("name can only contain URL-friendly characters");
        }
        return done(warnings, errors);
      }).scopedPackagePattern = scopedPackagePattern;
      var done = function(warnings, errors) {
        var result = {
          validForNewPackages: 0 === errors.length && 0 === warnings.length,
          validForOldPackages: 0 === errors.length,
          warnings,
          errors
        };
        return result.warnings.length || delete result.warnings, result.errors.length || delete result.errors, 
        result;
      };
    },
    73107: module => {
      "use strict";
      module.exports = require("./semver");
    },
    19932: module => {
      "use strict";
      module.exports = require("./npm-package-arg");
    },
    34436: module => {
      "use strict";
      module.exports = require("../vendor/glob");
    },
    41488: module => {
      "use strict";
      module.exports = require("../vendor/validate-npm-package-license");
    },
    57147: module => {
      "use strict";
      module.exports = require("fs");
    },
    71017: module => {
      "use strict";
      module.exports = require("path");
    },
    43732: module => {
      "use strict";
      module.exports = JSON.parse('["assert","buffer","child_process","cluster","console","constants","crypto","dgram","dns","domain","events","fs","http","https","module","net","os","path","process","punycode","querystring","readline","repl","stream","string_decoder","timers","tls","tty","url","util","v8","vm","zlib"]');
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
    var exports = __webpack_exports__, fs = __webpack_require__(57147), path = (__webpack_require__(34436), 
    __webpack_require__(71017)), validateLicense = __webpack_require__(41488), validateName = __webpack_require__(70630), npa = __webpack_require__(19932), semver = __webpack_require__(73107);
    function readDeps(test, excluded) {
      return function(cb) {
        fs.readdir("node_modules", (function(er, dir) {
          if (er) return cb();
          var deps = {}, n = dir.length;
          if (0 === n) return cb(null, deps);
          function next() {
            if (0 == --n) return cb(null, deps);
          }
          dir.forEach((function(d) {
            if (d.match(/^\./)) return next();
            if (test !== !!d.match(/^(expresso|mocha|tap|coffee-script|coco|streamline)$/) || excluded[d]) return next();
            var dp = path.join(dirname, "node_modules", d, "package.json");
            fs.readFile(dp, "utf8", (function(er, p) {
              if (er) return next();
              try {
                p = JSON.parse(p);
              } catch (e) {
                return next();
              }
              return p.version ? (p._requiredBy && !p._requiredBy.some((function(req) {
                return "#USER" === req;
              })) || (deps[d] = config.get("save-exact") ? p.version : config.get("save-prefix") + p.version), 
              next()) : next();
            }));
          }));
        }));
      };
    }
    var spec, name = package.name || basename;
    try {
      spec = npa(name);
    } catch (e) {
      spec = {};
    }
    var scope = config.get("scope");
    scope && ("@" !== scope.charAt(0) && (scope = "@" + scope), name = spec.scope ? scope + "/" + spec.name.split("/")[1] : scope + "/" + name), 
    exports.name = yes ? name : prompt("package name", name.replace(/^node-|[.-]js$/g, "").replace(" ", "-").toLowerCase(), (function(data) {
      var its = validateName(data);
      if (its.validForNewPackages) return data;
      var errors = (its.errors || []).concat(its.warnings || []), er = new Error("Sorry, " + errors.join(" and ") + ".");
      return er.notValid = !0, er;
    }));
    var version = package.version || config.get("init.version") || config.get("init-version") || "1.0.0";
    exports.version = yes ? version : prompt("version", version, (function(version) {
      if (semver.valid(version)) return version;
      var er = new Error('Invalid version: "' + version + '"');
      return er.notValid = !0, er;
    })), package.description || (exports.description = yes ? "" : prompt("description")), 
    package.main || (exports.main = function(cb) {
      fs.readdir(dirname, (function(er, f) {
        er && (f = []);
        var index = (f = -1 !== (f = f.filter((function(f) {
          return f.match(/\.js$/);
        }))).indexOf("index.js") ? "index.js" : -1 !== f.indexOf("main.js") ? "main.js" : -1 !== f.indexOf(basename + ".js") ? basename + ".js" : f[0]) || "index.js";
        return cb(null, yes ? index : prompt("entry point", index));
      }));
    }), package.bin || (exports.bin = function(cb) {
      fs.readdir(path.resolve(dirname, "bin"), (function(er, d) {
        return er ? cb() : cb(null, d.filter((function(f) {
          return f.match(/\.js$/);
        }))[0]);
      }));
    }), exports.directories = function(cb) {
      fs.readdir(dirname, (function(er, dirs) {
        if (er) return cb(er);
        var res = {};
        return dirs.forEach((function(d) {
          switch (d) {
           case "example":
           case "examples":
            return res.example = d;

           case "test":
           case "tests":
            return res.test = d;

           case "doc":
           case "docs":
            return res.doc = d;

           case "man":
            return res.man = d;

           case "lib":
            return res.lib = d;
          }
        })), 0 === Object.keys(res).length && (res = void 0), cb(null, res);
      }));
    }, package.dependencies || (exports.dependencies = readDeps(!1, package.devDependencies || {})), 
    package.devDependencies || (exports.devDependencies = readDeps(!0, package.dependencies || {}));
    var s = package.scripts || {}, notest = 'echo "Error: no test specified" && exit 1';
    package.scripts || (exports.scripts = function(cb) {
      fs.readdir(path.join(dirname, "node_modules"), (function(er, d) {
        !function(d, cb) {
          function tx(test) {
            return test || notest;
          }
          if (!s.test || s.test === notest) {
            var command, commands = {
              tap: "tap test/*.js",
              expresso: "expresso test",
              mocha: "mocha"
            };
            Object.keys(commands).forEach((function(k) {
              -1 !== d.indexOf(k) && (command = commands[k]);
            }));
            var ps = "test command";
            yes ? s.test = command || notest : s.test = command ? prompt(ps, command, tx) : prompt(ps, tx);
          }
          cb(null, s);
        }(d || [], cb);
      }));
    }), package.repository || (exports.repository = function(cb) {
      fs.readFile(".git/config", "utf8", (function(er, gconf) {
        if (er || !gconf) return cb(null, yes ? "" : prompt("git repository"));
        var i = (gconf = gconf.split(/\r?\n/)).indexOf('[remote "origin"]');
        if (-1 !== i) {
          var u = gconf[i + 1];
          u.match(/^\s*url =/) || (u = gconf[i + 2]), u = u.match(/^\s*url =/) ? u.replace(/^\s*url = /, "") : null;
        }
        return u && u.match(/^git@github.com:/) && (u = u.replace(/^git@github.com:/, "https://github.com/")), 
        cb(null, yes ? u : prompt("git repository", u));
      }));
    }), package.keywords || (exports.keywords = yes ? "" : prompt("keywords", (function(s) {
      if (s) return Array.isArray(s) && (s = s.join(" ")), "string" != typeof s ? s : s.split(/[\s,]+/);
    }))), package.author || (exports.author = config.get("init.author.name") || config.get("init-author-name") ? {
      name: config.get("init.author.name") || config.get("init-author-name"),
      email: config.get("init.author.email") || config.get("init-author-email"),
      url: config.get("init.author.url") || config.get("init-author-url")
    } : yes ? "" : prompt("author"));
    var license = package.license || config.get("init.license") || config.get("init-license") || "ISC";
    exports.license = yes ? license : prompt("license", license, (function(data) {
      var its = validateLicense(data);
      if (its.validForNewPackages) return data;
      var errors = (its.errors || []).concat(its.warnings || []), er = new Error("Sorry, " + errors.join(" and ") + ".");
      return er.notValid = !0, er;
    }));
  })();
  var __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
})();