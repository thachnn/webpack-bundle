(() => {
  var __webpack_modules__ = {
    19932: module => {
      "use strict";
      module.exports = require("./npm-package-arg");
    },
    5870: module => {
      "use strict";
      module.exports = require("./semver");
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
    var exports = __webpack_exports__, fs = __webpack_require__(57147), path = __webpack_require__(71017), validateLicense = __webpack_require__(41488), npa = __webpack_require__(19932), validateName = npa._validateName, semver = __webpack_require__(5870);
    function readDeps(test, excluded) {
      return function(cb) {
        fs.readdir("node_modules", (function(readdirErr, dir) {
          if (readdirErr) return cb();
          var deps = {}, n = dir.length;
          if (0 === n) return cb(null, deps);
          function next() {
            if (0 == --n) return cb(null, deps);
          }
          dir.forEach((function(d) {
            if (d.match(/^\./)) return next();
            if (test !== !!d.match(/^(expresso|mocha|tap|coffee-script|coco|streamline)$/) || excluded[d]) return next();
            var dp = path.join(dirname, "node_modules", d, "package.json");
            fs.readFile(dp, "utf8", (function(readFileErr, p) {
              if (readFileErr) return next();
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
    var spec, name = (package.name || basename).replace(/^node-|[.-]js$/g, "").replace(/\s+/g, " ").replace(/ /g, "-").toLowerCase();
    try {
      spec = npa(name);
    } catch (e) {
      spec = {};
    }
    var scope = config.get("scope");
    scope && ("@" !== scope.charAt(0) && (scope = "@" + scope), name = spec.scope ? scope + "/" + spec.name.split("/")[1] : scope + "/" + name), 
    exports.name = yes ? name : prompt("package name", name, (function(data) {
      var its = validateName(data);
      if (its.validForNewPackages) return data;
      var errors = (its.errors || []).concat(its.warnings || []), er = new Error("Sorry, " + errors.join(" and ") + ".");
      return er.notValid = !0, er;
    }));
    const defaultDottedInitVersion = config && config.defaults && config.defaults["init.version"], dottedInitVersion = config.get("init.version") !== defaultDottedInitVersion && config.get("init.version");
    var version = package.version || dottedInitVersion || config.get("init-version") || "1.0.0";
    exports.version = yes ? version : prompt("version", version, (function(promptedVersion) {
      if (semver.valid(promptedVersion)) return promptedVersion;
      var er = new Error('Invalid version: "' + promptedVersion + '"');
      return er.notValid = !0, er;
    })), package.description || (exports.description = yes ? "" : prompt("description")), 
    package.main || (exports.main = function(cb) {
      fs.readdir(dirname, (function(er, f) {
        er && (f = []);
        var index = (f = -1 !== (f = f.filter((function(filtered) {
          return filtered.match(/\.js$/);
        }))).indexOf("index.js") ? "index.js" : -1 !== f.indexOf("main.js") ? "main.js" : -1 !== f.indexOf(basename + ".js") ? basename + ".js" : f[0]) || "index.js";
        return cb(null, yes ? index : prompt("entry point", index));
      }));
    }), package.bin || (exports.bin = function(cb) {
      fs.readdir(path.resolve(dirname, "bin"), (function(er, d) {
        if (er) return cb();
        let r = d.find((f => f.match(/\.js$/)));
        return r && (r = `bin/${r}`), cb(null, r);
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
    }), package.keywords || (exports.keywords = yes ? "" : prompt("keywords", (function(promptedKeywords) {
      if (promptedKeywords) return Array.isArray(promptedKeywords) && (promptedKeywords = promptedKeywords.join(" ")), 
      "string" != typeof promptedKeywords ? promptedKeywords : promptedKeywords.split(/[\s,]+/);
    }))), package.author || (exports.author = config.get("init.author.name") || config.get("init-author-name") ? {
      name: config.get("init.author.name") || config.get("init-author-name"),
      email: config.get("init.author.email") || config.get("init-author-email"),
      url: config.get("init.author.url") || config.get("init-author-url")
    } : yes ? "" : prompt("author"));
    const defaultDottedInitLicense = config && config.defaults && config.defaults["init.license"], dottedInitLicense = config.get("init.license") !== defaultDottedInitLicense && config.get("init.license");
    var license = package.license || dottedInitLicense || config.get("init-license") || "ISC";
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