(() => {
  var __webpack_modules__ = {
    63780: module => {
      "use strict";
      var gitHosts = module.exports = {
        github: {
          protocols: [ "git", "http", "git+ssh", "git+https", "ssh", "https" ],
          domain: "github.com",
          treepath: "tree",
          filetemplate: "https://{auth@}raw.githubusercontent.com/{user}/{project}/{committish}/{path}",
          bugstemplate: "https://{domain}/{user}/{project}/issues",
          gittemplate: "git://{auth@}{domain}/{user}/{project}.git{#committish}",
          tarballtemplate: "https://codeload.{domain}/{user}/{project}/tar.gz/{committish}"
        },
        bitbucket: {
          protocols: [ "git+ssh", "git+https", "ssh", "https" ],
          domain: "bitbucket.org",
          treepath: "src",
          tarballtemplate: "https://{domain}/{user}/{project}/get/{committish}.tar.gz"
        },
        gitlab: {
          protocols: [ "git+ssh", "git+https", "ssh", "https" ],
          domain: "gitlab.com",
          treepath: "tree",
          bugstemplate: "https://{domain}/{user}/{project}/issues",
          httpstemplate: "git+https://{auth@}{domain}/{user}/{projectPath}.git{#committish}",
          tarballtemplate: "https://{domain}/{user}/{project}/repository/archive.tar.gz?ref={committish}",
          pathmatch: /^[/]([^/]+)[/]((?!.*(\/-\/|\/repository\/archive\.tar\.gz\?=.*|\/repository\/[^/]+\/archive.tar.gz$)).*?)(?:[.]git|[/])?$/
        },
        gist: {
          protocols: [ "git", "git+ssh", "git+https", "ssh", "https" ],
          domain: "gist.github.com",
          pathmatch: /^[/](?:([^/]+)[/])?([a-z0-9]{32,})(?:[.]git)?$/,
          filetemplate: "https://gist.githubusercontent.com/{user}/{project}/raw{/committish}/{path}",
          bugstemplate: "https://{domain}/{project}",
          gittemplate: "git://{domain}/{project}.git{#committish}",
          sshtemplate: "git@{domain}:/{project}.git{#committish}",
          sshurltemplate: "git+ssh://git@{domain}/{project}.git{#committish}",
          browsetemplate: "https://{domain}/{project}{/committish}",
          browsefiletemplate: "https://{domain}/{project}{/committish}{#path}",
          docstemplate: "https://{domain}/{project}{/committish}",
          httpstemplate: "git+https://{domain}/{project}.git{#committish}",
          shortcuttemplate: "{type}:{project}{#committish}",
          pathtemplate: "{project}{#committish}",
          tarballtemplate: "https://codeload.github.com/gist/{project}/tar.gz/{committish}",
          hashformat: function(fragment) {
            return "file-" + formatHashFragment(fragment);
          }
        }
      }, gitHostDefaults = {
        sshtemplate: "git@{domain}:{user}/{project}.git{#committish}",
        sshurltemplate: "git+ssh://git@{domain}/{user}/{project}.git{#committish}",
        browsetemplate: "https://{domain}/{user}/{project}{/tree/committish}",
        browsefiletemplate: "https://{domain}/{user}/{project}/{treepath}/{committish}/{path}{#fragment}",
        docstemplate: "https://{domain}/{user}/{project}{/tree/committish}#readme",
        httpstemplate: "git+https://{auth@}{domain}/{user}/{project}.git{#committish}",
        filetemplate: "https://{domain}/{user}/{project}/raw/{committish}/{path}",
        shortcuttemplate: "{type}:{user}/{project}{#committish}",
        pathtemplate: "{user}/{project}{#committish}",
        pathmatch: /^[/]([^/]+)[/]([^/]+?)(?:[.]git|[/])?$/,
        hashformat: formatHashFragment
      };
      function formatHashFragment(fragment) {
        return fragment.toLowerCase().replace(/^\W+|\/|\W+$/g, "").replace(/\W+/g, "-");
      }
      Object.keys(gitHosts).forEach((function(name) {
        Object.keys(gitHostDefaults).forEach((function(key) {
          gitHosts[name][key] || (gitHosts[name][key] = gitHostDefaults[key]);
        })), gitHosts[name].protocols_re = RegExp("^(" + gitHosts[name].protocols.map((function(protocol) {
          return protocol.replace(/([\\+*{}()[\]$^|])/g, "\\$1");
        })).join("|") + "):$");
      }));
    },
    22787: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var gitHosts = __webpack_require__(63780), extend = Object.assign || function(target, source) {
        if (null === source || "object" != typeof source) return target;
        for (var keys = Object.keys(source), i = keys.length; i--; ) target[keys[i]] = source[keys[i]];
        return target;
      };
      function GitHost(type, user, auth, project, committish, defaultRepresentation, opts) {
        var gitHostInfo = this;
        gitHostInfo.type = type, Object.keys(gitHosts[type]).forEach((function(key) {
          gitHostInfo[key] = gitHosts[type][key];
        })), gitHostInfo.user = user, gitHostInfo.auth = auth, gitHostInfo.project = project, 
        gitHostInfo.committish = committish, gitHostInfo.default = defaultRepresentation, 
        gitHostInfo.opts = opts || {};
      }
      module.exports = GitHost, GitHost.prototype.hash = function() {
        return this.committish ? "#" + this.committish : "";
      }, GitHost.prototype._fill = function(template, opts) {
        if (template) {
          var vars = extend({}, opts);
          vars.path = vars.path ? vars.path.replace(/^[/]+/g, "") : "", opts = extend(extend({}, this.opts), opts);
          var self = this;
          Object.keys(this).forEach((function(key) {
            null != self[key] && null == vars[key] && (vars[key] = self[key]);
          }));
          var rawAuth = vars.auth, rawcommittish = vars.committish, rawFragment = vars.fragment, rawPath = vars.path, rawProject = vars.project;
          Object.keys(vars).forEach((function(key) {
            var value = vars[key];
            vars[key] = "path" !== key && "project" !== key || "string" != typeof value ? encodeURIComponent(value) : value.split("/").map((function(pathComponent) {
              return encodeURIComponent(pathComponent);
            })).join("/");
          })), vars["auth@"] = rawAuth ? rawAuth + "@" : "", vars["#fragment"] = rawFragment ? "#" + this.hashformat(rawFragment) : "", 
          vars.fragment = vars.fragment ? vars.fragment : "", vars["#path"] = rawPath ? "#" + this.hashformat(rawPath) : "", 
          vars["/path"] = vars.path ? "/" + vars.path : "", vars.projectPath = rawProject.split("/").map(encodeURIComponent).join("/"), 
          opts.noCommittish ? (vars["#committish"] = "", vars["/tree/committish"] = "", vars["/committish"] = "", 
          vars.committish = "") : (vars["#committish"] = rawcommittish ? "#" + rawcommittish : "", 
          vars["/tree/committish"] = vars.committish ? "/" + vars.treepath + "/" + vars.committish : "", 
          vars["/committish"] = vars.committish ? "/" + vars.committish : "", vars.committish = vars.committish || "master");
          var res = template;
          return Object.keys(vars).forEach((function(key) {
            res = res.replace(new RegExp("[{]" + key + "[}]", "g"), vars[key]);
          })), opts.noGitPlus ? res.replace(/^git[+]/, "") : res;
        }
      }, GitHost.prototype.ssh = function(opts) {
        return this._fill(this.sshtemplate, opts);
      }, GitHost.prototype.sshurl = function(opts) {
        return this._fill(this.sshurltemplate, opts);
      }, GitHost.prototype.browse = function(P, F, opts) {
        return "string" == typeof P ? ("string" != typeof F && (opts = F, F = null), this._fill(this.browsefiletemplate, extend({
          fragment: F,
          path: P
        }, opts))) : this._fill(this.browsetemplate, P);
      }, GitHost.prototype.docs = function(opts) {
        return this._fill(this.docstemplate, opts);
      }, GitHost.prototype.bugs = function(opts) {
        return this._fill(this.bugstemplate, opts);
      }, GitHost.prototype.https = function(opts) {
        return this._fill(this.httpstemplate, opts);
      }, GitHost.prototype.git = function(opts) {
        return this._fill(this.gittemplate, opts);
      }, GitHost.prototype.shortcut = function(opts) {
        return this._fill(this.shortcuttemplate, opts);
      }, GitHost.prototype.path = function(opts) {
        return this._fill(this.pathtemplate, opts);
      }, GitHost.prototype.tarball = function(opts_) {
        var opts = extend({}, opts_, {
          noCommittish: !1
        });
        return this._fill(this.tarballtemplate, opts);
      }, GitHost.prototype.file = function(P, opts) {
        return this._fill(this.filetemplate, extend({
          path: P
        }, opts));
      }, GitHost.prototype.getDefaultRepresentation = function() {
        return this.default;
      }, GitHost.prototype.toString = function(opts) {
        return this.default && "function" == typeof this[this.default] ? this[this.default](opts) : this.sshurl(opts);
      };
    },
    71438: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var url = __webpack_require__(57310), gitHosts = __webpack_require__(63780), GitHost = module.exports = __webpack_require__(22787), protocolToRepresentationMap = {
        "git+ssh:": "sshurl",
        "git+https:": "https",
        "ssh:": "sshurl",
        "git:": "git"
      };
      var authProtocols = {
        "git:": !0,
        "https:": !0,
        "git+https:": !0,
        "http:": !0,
        "git+http:": !0
      }, cache = {};
      function fixupUnqualifiedGist(giturl) {
        var parsed = url.parse(giturl);
        return "gist:" === parsed.protocol && parsed.host && !parsed.path ? parsed.protocol + "/" + parsed.host : giturl;
      }
      function parseGitUrl(giturl) {
        var matched = giturl.match(/^([^@]+)@([^:/]+):[/]?((?:[^/]+[/])?[^/]+?)(?:[.]git)?(#.*)?$/);
        if (!matched) {
          var legacy = url.parse(giturl);
          if (legacy.auth && "function" == typeof url.URL) {
            var authmatch = giturl.match(/[^@]+@[^:/]+/);
            if (authmatch) {
              var whatwg = new url.URL(authmatch[0]);
              legacy.auth = whatwg.username || "", whatwg.password && (legacy.auth += ":" + whatwg.password);
            }
          }
          return legacy;
        }
        return {
          protocol: "git+ssh:",
          slashes: !0,
          auth: matched[1],
          host: matched[2],
          port: null,
          hostname: matched[2],
          hash: matched[4],
          search: null,
          query: null,
          pathname: "/" + matched[3],
          path: "/" + matched[3],
          href: "git+ssh://" + matched[1] + "@" + matched[2] + "/" + matched[3] + (matched[4] || "")
        };
      }
      module.exports.fromUrl = function(giturl, opts) {
        if ("string" == typeof giturl) {
          var key = giturl + JSON.stringify(opts || {});
          return key in cache || (cache[key] = function(giturl, opts) {
            if (null == giturl || "" === giturl) return;
            var url = fixupUnqualifiedGist((arg = giturl, /^[^:@%/\s.-][^:@%/\s]*[/][^:@\s/%]+(?:#.*)?$/.test(arg) ? "github:" + giturl : giturl)), parsed = parseGitUrl(url), shortcutMatch = url.match(/^([^:]+):(?:[^@]+@)?(?:([^/]*)\/)?([^#]+)/), matches = Object.keys(gitHosts).map((function(gitHostName) {
              try {
                var gitHostInfo = gitHosts[gitHostName], auth = null;
                parsed.auth && authProtocols[parsed.protocol] && (auth = parsed.auth);
                var committish = parsed.hash ? decodeURIComponent(parsed.hash.substr(1)) : null, user = null, project = null, defaultRepresentation = null;
                if (shortcutMatch && shortcutMatch[1] === gitHostName) user = shortcutMatch[2] && decodeURIComponent(shortcutMatch[2]), 
                project = decodeURIComponent(shortcutMatch[3].replace(/\.git$/, "")), defaultRepresentation = "shortcut"; else {
                  if (parsed.host && parsed.host !== gitHostInfo.domain && parsed.host.replace(/^www[.]/, "") !== gitHostInfo.domain) return;
                  if (!gitHostInfo.protocols_re.test(parsed.protocol)) return;
                  if (!parsed.path) return;
                  var pathmatch = gitHostInfo.pathmatch, matched = parsed.path.match(pathmatch);
                  if (!matched) return;
                  null !== matched[1] && void 0 !== matched[1] && (user = decodeURIComponent(matched[1].replace(/^:/, ""))), 
                  project = decodeURIComponent(matched[2]), protocol = parsed.protocol, defaultRepresentation = protocolToRepresentationMap[protocol] || protocol.slice(0, -1);
                }
                return new GitHost(gitHostName, user, auth, project, committish, defaultRepresentation, opts);
              } catch (ex) {
                if (!(ex instanceof URIError)) throw ex;
              }
              var protocol;
            })).filter((function(gitHostInfo) {
              return gitHostInfo;
            }));
            var arg;
            if (1 !== matches.length) return;
            return matches[0];
          }(giturl, opts)), cache[key];
        }
      };
    },
    41208: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      let url, HostedGit, semver, path_, validatePackageName, osenv;
      function path() {
        return path_ || (path_ = __webpack_require__(71017)), path_;
      }
      module.exports = npa, module.exports.resolve = resolve, module.exports.Result = Result;
      const isWindows = "win32" === process.platform || global.FAKE_WINDOWS, hasSlashes = isWindows ? /\\|[/]/ : /[/]/, isURL = /^(?:git[+])?[a-z]+:/i, isFilename = /[.](?:tgz|tar.gz|tar)$/i;
      function npa(arg, where) {
        let name, spec;
        if ("object" == typeof arg) return arg instanceof Result && (!where || where === arg.where) ? arg : arg.name && arg.rawSpec ? npa.resolve(arg.name, arg.rawSpec, where || arg.where) : npa(arg.raw, where || arg.where);
        const nameEndsAt = "@" === arg[0] ? arg.slice(1).indexOf("@") + 1 : arg.indexOf("@"), namePart = nameEndsAt > 0 ? arg.slice(0, nameEndsAt) : arg;
        if (isURL.test(arg)) spec = arg; else if ("@" !== namePart[0] && (hasSlashes.test(namePart) || isFilename.test(namePart))) spec = arg; else if (nameEndsAt > 0) name = namePart, 
        spec = arg.slice(nameEndsAt + 1); else {
          validatePackageName || (validatePackageName = __webpack_require__(70630));
          validatePackageName(arg).validForOldPackages ? name = arg : spec = arg;
        }
        return resolve(name, spec, where, arg);
      }
      const isFilespec = isWindows ? /^(?:[.]|~[/]|[/\\]|[a-zA-Z]:)/ : /^(?:[.]|~[/]|[/]|[a-zA-Z]:)/;
      function resolve(name, spec, where, arg) {
        const res = new Result({
          raw: arg,
          name,
          rawSpec: spec,
          fromArgument: null != arg
        });
        if (name && res.setName(name), spec && (isFilespec.test(spec) || /^file:/i.test(spec))) return fromFile(res, where);
        if (spec && /^npm:/i.test(spec)) return function(res, where) {
          const subSpec = npa(res.rawSpec.substr(4), where);
          if ("alias" === subSpec.type) throw new Error("nested aliases not supported");
          if (!subSpec.registry) throw new Error("aliases only work for registry deps");
          return res.subSpec = subSpec, res.registry = !0, res.type = "alias", res.saveSpec = null, 
          res.fetchSpec = null, res;
        }(res, where);
        HostedGit || (HostedGit = __webpack_require__(71438));
        const hosted = HostedGit.fromUrl(spec, {
          noGitPlus: !0,
          noCommittish: !0
        });
        return hosted ? function(res, hosted) {
          return res.type = "git", res.hosted = hosted, res.saveSpec = hosted.toString({
            noGitPlus: !1,
            noCommittish: !1
          }), res.fetchSpec = "shortcut" === hosted.getDefaultRepresentation() ? null : hosted.toString(), 
          setGitCommittish(res, hosted.committish);
        }(res, hosted) : spec && isURL.test(spec) ? function(res) {
          url || (url = __webpack_require__(57310));
          const urlparse = url.parse(res.rawSpec);
          switch (res.saveSpec = res.rawSpec, urlparse.protocol) {
           case "git:":
           case "git+http:":
           case "git+https:":
           case "git+rsync:":
           case "git+ftp:":
           case "git+file:":
           case "git+ssh:":
            res.type = "git";
            const match = "git+ssh:" === urlparse.protocol && function(spec) {
              const matched = spec.match(/^git\+ssh:\/\/([^:#]+:[^#]+(?:\.git)?)(?:#(.*))?$/i);
              return matched && !matched[1].match(/:[0-9]+\/?.*$/i) && {
                fetchSpec: matched[1],
                gitCommittish: null == matched[2] ? null : matched[2]
              };
            }(res.rawSpec);
            match ? (setGitCommittish(res, match.gitCommittish), res.fetchSpec = match.fetchSpec) : (setGitCommittish(res, null != urlparse.hash ? urlparse.hash.slice(1) : ""), 
            urlparse.protocol = urlparse.protocol.replace(/^git[+]/, ""), "file:" === urlparse.protocol && /^git\+file:\/\/[a-z]:/i.test(res.rawSpec) && (urlparse.host += ":", 
            urlparse.hostname += ":"), delete urlparse.hash, res.fetchSpec = url.format(urlparse));
            break;

           case "http:":
           case "https:":
            res.type = "remote", res.fetchSpec = res.saveSpec;
            break;

           default:
            throw function(protocol, spec) {
              const err = new Error(`Unsupported URL Type "${protocol}": ${spec}`);
              return err.code = "EUNSUPPORTEDPROTOCOL", err;
            }(urlparse.protocol, res.rawSpec);
          }
          return res;
        }(res) : spec && (hasSlashes.test(spec) || isFilename.test(spec)) ? fromFile(res, where) : function(res) {
          res.registry = !0;
          const spec = "" === res.rawSpec ? "latest" : res.rawSpec;
          res.saveSpec = null, res.fetchSpec = spec, semver || (semver = __webpack_require__(73107));
          const version = semver.valid(spec, !0), range = semver.validRange(spec, !0);
          if (version) res.type = "version"; else if (range) res.type = "range"; else {
            if (encodeURIComponent(spec) !== spec) throw function(name) {
              const err = new Error(`Invalid tag name "${name}": Tags may not have any characters that encodeURIComponent encodes.`);
              return err.code = "EINVALIDTAGNAME", err;
            }(spec);
            res.type = "tag";
          }
          return res;
        }(res);
      }
      function Result(opts) {
        this.type = opts.type, this.registry = opts.registry, this.where = opts.where, null == opts.raw ? this.raw = opts.name ? opts.name + "@" + opts.rawSpec : opts.rawSpec : this.raw = opts.raw, 
        this.name = void 0, this.escapedName = void 0, this.scope = void 0, this.rawSpec = null == opts.rawSpec ? "" : opts.rawSpec, 
        this.saveSpec = opts.saveSpec, this.fetchSpec = opts.fetchSpec, opts.name && this.setName(opts.name), 
        this.gitRange = opts.gitRange, this.gitCommittish = opts.gitCommittish, this.hosted = opts.hosted;
      }
      function setGitCommittish(res, committish) {
        return null != committish && committish.length >= 7 && "semver:" === committish.slice(0, 7) ? (res.gitRange = decodeURIComponent(committish.slice(7)), 
        res.gitCommittish = null) : res.gitCommittish = "" === committish ? null : committish, 
        res;
      }
      Result.prototype.setName = function(name) {
        validatePackageName || (validatePackageName = __webpack_require__(70630));
        const valid = validatePackageName(name);
        if (!valid.validForOldPackages) throw function(name, valid) {
          const err = new Error(`Invalid package name "${name}": ${valid.errors.join("; ")}`);
          return err.code = "EINVALIDPACKAGENAME", err;
        }(name, valid);
        return this.name = name, this.scope = "@" === name[0] ? name.slice(0, name.indexOf("/")) : void 0, 
        this.escapedName = name.replace("/", "%2f"), this;
      }, Result.prototype.toString = function() {
        const full = [];
        null != this.name && "" !== this.name && full.push(this.name);
        const spec = this.saveSpec || this.fetchSpec || this.rawSpec;
        return null != spec && "" !== spec && full.push(spec), full.length ? full.join("@") : this.raw;
      }, Result.prototype.toJSON = function() {
        const result = Object.assign({}, this);
        return delete result.hosted, result;
      };
      const isAbsolutePath = /^[/]|^[A-Za-z]:/;
      function resolvePath(where, spec) {
        return isAbsolutePath.test(spec) ? spec : path().resolve(where, spec);
      }
      function fromFile(res, where) {
        where || (where = process.cwd()), res.type = isFilename.test(res.rawSpec) ? "file" : "directory", 
        res.where = where;
        const spec = res.rawSpec.replace(/\\/g, "/").replace(/^file:[/]*([A-Za-z]:)/, "$1").replace(/^file:(?:[/]*([~./]))?/, "$1");
        var dir;
        return /^~[/]/.test(spec) ? (osenv || (osenv = __webpack_require__(20396)), res.fetchSpec = resolvePath(osenv.home(), spec.slice(2)), 
        res.saveSpec = "file:" + spec) : (res.fetchSpec = resolvePath(where, spec), "/" === (dir = spec)[0] || /^[A-Za-z]:/.test(dir) ? res.saveSpec = "file:" + spec : res.saveSpec = "file:" + path().relative(where, res.fetchSpec)), 
        res;
      }
    },
    40107: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var os = __webpack_require__(22037);
      module.exports = "function" == typeof os.homedir ? os.homedir : function() {
        var env = process.env, home = env.HOME, user = env.LOGNAME || env.USER || env.LNAME || env.USERNAME;
        return "win32" === process.platform ? env.USERPROFILE || env.HOMEDRIVE + env.HOMEPATH || home || null : "darwin" === process.platform ? home || (user ? "/Users/" + user : null) : "linux" === process.platform ? home || (0 === process.getuid() ? "/root" : user ? "/home/" + user : null) : home || null;
      };
    },
    75848: module => {
      "use strict";
      var isWindows = "win32" === process.platform, trailingSlashRe = isWindows ? /[^:]\\$/ : /.\/$/;
      module.exports = function() {
        var path;
        return path = isWindows ? process.env.TEMP || process.env.TMP || (process.env.SystemRoot || process.env.windir) + "\\temp" : process.env.TMPDIR || process.env.TMP || process.env.TEMP || "/tmp", 
        trailingSlashRe.test(path) && (path = path.slice(0, -1)), path;
      };
    },
    20396: (__unused_webpack_module, exports, __webpack_require__) => {
      var isWindows = "win32" === process.platform, exec = (__webpack_require__(71017), 
      __webpack_require__(32081).exec), osTmpdir = __webpack_require__(75848), osHomedir = __webpack_require__(40107);
      function memo(key, lookup, fallback) {
        var fell = !1, falling = !1;
        exports[key] = function(cb) {
          var val = lookup();
          return val || fell || falling || !fallback || (fell = !0, falling = !0, exec(fallback, (function(er, output, stderr) {
            falling = !1, er || (val = output.trim());
          }))), exports[key] = function(cb) {
            return cb && process.nextTick(cb.bind(null, null, val)), val;
          }, cb && !falling && process.nextTick(cb.bind(null, null, val)), val;
        };
      }
      memo("user", (function() {
        return isWindows ? process.env.USERDOMAIN + "\\" + process.env.USERNAME : process.env.USER;
      }), "whoami"), memo("prompt", (function() {
        return isWindows ? process.env.PROMPT : process.env.PS1;
      })), memo("hostname", (function() {
        return isWindows ? process.env.COMPUTERNAME : process.env.HOSTNAME;
      }), "hostname"), memo("tmpdir", (function() {
        return osTmpdir();
      })), memo("home", (function() {
        return osHomedir();
      })), memo("path", (function() {
        return (process.env.PATH || process.env.Path || process.env.path).split(isWindows ? ";" : ":");
      })), memo("editor", (function() {
        return process.env.EDITOR || process.env.VISUAL || (isWindows ? "notepad.exe" : "vi");
      })), memo("shell", (function() {
        return isWindows ? process.env.ComSpec || "cmd" : process.env.SHELL || "bash";
      }));
    },
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
    32081: module => {
      "use strict";
      module.exports = require("child_process");
    },
    22037: module => {
      "use strict";
      module.exports = require("os");
    },
    71017: module => {
      "use strict";
      module.exports = require("path");
    },
    57310: module => {
      "use strict";
      module.exports = require("url");
    },
    43732: module => {
      "use strict";
      module.exports = JSON.parse('["assert","buffer","child_process","cluster","console","constants","crypto","dgram","dns","domain","events","fs","http","https","module","net","os","path","process","punycode","querystring","readline","repl","stream","string_decoder","timers","tls","tty","url","util","v8","vm","zlib"]');
    }
  }, __webpack_module_cache__ = {};
  var __webpack_exports__ = function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (void 0 !== cachedModule) return cachedModule.exports;
    var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    };
    return __webpack_modules__[moduleId](module, module.exports, __webpack_require__), 
    module.exports;
  }(41208);
  module.exports = __webpack_exports__;
})();