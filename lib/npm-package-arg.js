(() => {
  var __webpack_modules__ = {
    78874: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const semver = __webpack_require__(5870), permanentModules = [ "assert", "buffer", "child_process", "cluster", "console", "constants", "crypto", "dgram", "dns", "domain", "events", "fs", "http", "https", "module", "net", "os", "path", "punycode", "querystring", "readline", "repl", "stream", "string_decoder", "sys", "timers", "tls", "tty", "url", "util", "vm", "zlib" ], versionLockedModules = {
        freelist: "<6.0.0",
        v8: ">=1.0.0",
        process: ">=1.1.0",
        inspector: ">=8.0.0",
        async_hooks: ">=8.1.0",
        http2: ">=8.4.0",
        perf_hooks: ">=8.5.0",
        trace_events: ">=10.0.0",
        worker_threads: ">=12.0.0",
        "node:test": ">=18.0.0"
      }, experimentalModules = {
        worker_threads: ">=10.5.0",
        wasi: ">=12.16.0",
        diagnostics_channel: "^14.17.0 || >=15.1.0"
      };
      module.exports = ({version = process.version, experimental = !1} = {}) => {
        const builtins = [ ...permanentModules ];
        for (const [name, semverRange] of Object.entries(versionLockedModules)) ("*" === version || semver.satisfies(version, semverRange)) && builtins.push(name);
        if (experimental) for (const [name, semverRange] of Object.entries(experimentalModules)) builtins.includes(name) || "*" !== version && !semver.satisfies(version, semverRange) || builtins.push(name);
        return builtins;
      };
    },
    6437: module => {
      "use strict";
      const maybeJoin = (...args) => args.every((arg => arg)) ? args.join("") : "", maybeEncode = arg => arg ? encodeURIComponent(arg) : "", defaults = {
        sshtemplate: ({domain, user, project, committish}) => `git@${domain}:${user}/${project}.git${maybeJoin("#", committish)}`,
        sshurltemplate: ({domain, user, project, committish}) => `git+ssh://git@${domain}/${user}/${project}.git${maybeJoin("#", committish)}`,
        edittemplate: ({domain, user, project, committish, editpath, path}) => `https://${domain}/${user}/${project}${maybeJoin("/", editpath, "/", maybeEncode(committish || "master"), "/", path)}`,
        browsetemplate: ({domain, user, project, committish, treepath}) => `https://${domain}/${user}/${project}${maybeJoin("/", treepath, "/", maybeEncode(committish))}`,
        browsefiletemplate: ({domain, user, project, committish, treepath, path, fragment, hashformat}) => `https://${domain}/${user}/${project}/${treepath}/${maybeEncode(committish || "master")}/${path}${maybeJoin("#", hashformat(fragment || ""))}`,
        docstemplate: ({domain, user, project, treepath, committish}) => `https://${domain}/${user}/${project}${maybeJoin("/", treepath, "/", maybeEncode(committish))}#readme`,
        httpstemplate: ({auth, domain, user, project, committish}) => `git+https://${maybeJoin(auth, "@")}${domain}/${user}/${project}.git${maybeJoin("#", committish)}`,
        filetemplate: ({domain, user, project, committish, path}) => `https://${domain}/${user}/${project}/raw/${maybeEncode(committish) || "master"}/${path}`,
        shortcuttemplate: ({type, user, project, committish}) => `${type}:${user}/${project}${maybeJoin("#", committish)}`,
        pathtemplate: ({user, project, committish}) => `${user}/${project}${maybeJoin("#", committish)}`,
        bugstemplate: ({domain, user, project}) => `https://${domain}/${user}/${project}/issues`,
        hashformat: formatHashFragment
      }, gitHosts = {};
      gitHosts.github = Object.assign({}, defaults, {
        protocols: [ "git:", "http:", "git+ssh:", "git+https:", "ssh:", "https:" ],
        domain: "github.com",
        treepath: "tree",
        editpath: "edit",
        filetemplate: ({auth, user, project, committish, path}) => `https://${maybeJoin(auth, "@")}raw.githubusercontent.com/${user}/${project}/${maybeEncode(committish) || "master"}/${path}`,
        gittemplate: ({auth, domain, user, project, committish}) => `git://${maybeJoin(auth, "@")}${domain}/${user}/${project}.git${maybeJoin("#", committish)}`,
        tarballtemplate: ({domain, user, project, committish}) => `https://codeload.${domain}/${user}/${project}/tar.gz/${maybeEncode(committish) || "master"}`,
        extract: url => {
          let [, user, project, type, committish] = url.pathname.split("/", 5);
          if ((!type || "tree" === type) && (type || (committish = url.hash.slice(1)), project && project.endsWith(".git") && (project = project.slice(0, -4)), 
          user && project)) return {
            user,
            project,
            committish
          };
        }
      }), gitHosts.bitbucket = Object.assign({}, defaults, {
        protocols: [ "git+ssh:", "git+https:", "ssh:", "https:" ],
        domain: "bitbucket.org",
        treepath: "src",
        editpath: "?mode=edit",
        edittemplate: ({domain, user, project, committish, treepath, path, editpath}) => `https://${domain}/${user}/${project}${maybeJoin("/", treepath, "/", maybeEncode(committish || "master"), "/", path, editpath)}`,
        tarballtemplate: ({domain, user, project, committish}) => `https://${domain}/${user}/${project}/get/${maybeEncode(committish) || "master"}.tar.gz`,
        extract: url => {
          let [, user, project, aux] = url.pathname.split("/", 4);
          if (![ "get" ].includes(aux) && (project && project.endsWith(".git") && (project = project.slice(0, -4)), 
          user && project)) return {
            user,
            project,
            committish: url.hash.slice(1)
          };
        }
      }), gitHosts.gitlab = Object.assign({}, defaults, {
        protocols: [ "git+ssh:", "git+https:", "ssh:", "https:" ],
        domain: "gitlab.com",
        treepath: "tree",
        editpath: "-/edit",
        httpstemplate: ({auth, domain, user, project, committish}) => `git+https://${maybeJoin(auth, "@")}${domain}/${user}/${project}.git${maybeJoin("#", committish)}`,
        tarballtemplate: ({domain, user, project, committish}) => `https://${domain}/${user}/${project}/repository/archive.tar.gz?ref=${maybeEncode(committish) || "master"}`,
        extract: url => {
          const path = url.pathname.slice(1);
          if (path.includes("/-/") || path.includes("/archive.tar.gz")) return;
          const segments = path.split("/");
          let project = segments.pop();
          project.endsWith(".git") && (project = project.slice(0, -4));
          const user = segments.join("/");
          return user && project ? {
            user,
            project,
            committish: url.hash.slice(1)
          } : void 0;
        }
      }), gitHosts.gist = Object.assign({}, defaults, {
        protocols: [ "git:", "git+ssh:", "git+https:", "ssh:", "https:" ],
        domain: "gist.github.com",
        editpath: "edit",
        sshtemplate: ({domain, project, committish}) => `git@${domain}:${project}.git${maybeJoin("#", committish)}`,
        sshurltemplate: ({domain, project, committish}) => `git+ssh://git@${domain}/${project}.git${maybeJoin("#", committish)}`,
        edittemplate: ({domain, user, project, committish, editpath}) => `https://${domain}/${user}/${project}${maybeJoin("/", maybeEncode(committish))}/${editpath}`,
        browsetemplate: ({domain, project, committish}) => `https://${domain}/${project}${maybeJoin("/", maybeEncode(committish))}`,
        browsefiletemplate: ({domain, project, committish, path, hashformat}) => `https://${domain}/${project}${maybeJoin("/", maybeEncode(committish))}${maybeJoin("#", hashformat(path))}`,
        docstemplate: ({domain, project, committish}) => `https://${domain}/${project}${maybeJoin("/", maybeEncode(committish))}`,
        httpstemplate: ({domain, project, committish}) => `git+https://${domain}/${project}.git${maybeJoin("#", committish)}`,
        filetemplate: ({user, project, committish, path}) => `https://gist.githubusercontent.com/${user}/${project}/raw${maybeJoin("/", maybeEncode(committish))}/${path}`,
        shortcuttemplate: ({type, project, committish}) => `${type}:${project}${maybeJoin("#", committish)}`,
        pathtemplate: ({project, committish}) => `${project}${maybeJoin("#", committish)}`,
        bugstemplate: ({domain, project}) => `https://${domain}/${project}`,
        gittemplate: ({domain, project, committish}) => `git://${domain}/${project}.git${maybeJoin("#", committish)}`,
        tarballtemplate: ({project, committish}) => `https://codeload.github.com/gist/${project}/tar.gz/${maybeEncode(committish) || "master"}`,
        extract: url => {
          let [, user, project, aux] = url.pathname.split("/", 4);
          if ("raw" !== aux) {
            if (!project) {
              if (!user) return;
              project = user, user = null;
            }
            return project.endsWith(".git") && (project = project.slice(0, -4)), {
              user,
              project,
              committish: url.hash.slice(1)
            };
          }
        },
        hashformat: function(fragment) {
          return fragment && "file-" + formatHashFragment(fragment);
        }
      }), gitHosts.sourcehut = Object.assign({}, defaults, {
        protocols: [ "git+ssh:", "https:" ],
        domain: "git.sr.ht",
        treepath: "tree",
        browsefiletemplate: ({domain, user, project, committish, treepath, path, fragment, hashformat}) => `https://${domain}/${user}/${project}/${treepath}/${maybeEncode(committish || "main")}/${path}${maybeJoin("#", hashformat(fragment || ""))}`,
        filetemplate: ({domain, user, project, committish, path}) => `https://${domain}/${user}/${project}/blob/${maybeEncode(committish) || "main"}/${path}`,
        httpstemplate: ({domain, user, project, committish}) => `https://${domain}/${user}/${project}.git${maybeJoin("#", committish)}`,
        tarballtemplate: ({domain, user, project, committish}) => `https://${domain}/${user}/${project}/archive/${maybeEncode(committish) || "main"}.tar.gz`,
        bugstemplate: ({domain, user, project}) => `https://todo.sr.ht/${user}/${project}`,
        docstemplate: ({domain, user, project, treepath, committish}) => `https://${domain}/${user}/${project}${maybeJoin("/", treepath, "/", maybeEncode(committish))}#readme`,
        extract: url => {
          let [, user, project, aux] = url.pathname.split("/", 4);
          if (![ "archive" ].includes(aux) && (project && project.endsWith(".git") && (project = project.slice(0, -4)), 
          user && project)) return {
            user,
            project,
            committish: url.hash.slice(1)
          };
        }
      });
      const names = Object.keys(gitHosts);
      gitHosts.byShortcut = {}, gitHosts.byDomain = {};
      for (const name of names) gitHosts.byShortcut[`${name}:`] = name, gitHosts.byDomain[gitHosts[name].domain] = name;
      function formatHashFragment(fragment) {
        return fragment.toLowerCase().replace(/^\W+|\/|\W+$/g, "").replace(/\W+/g, "-");
      }
      module.exports = gitHosts;
    },
    14702: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const gitHosts = __webpack_require__(6437);
      module.exports = class {
        constructor(type, user, auth, project, committish, defaultRepresentation, opts = {}) {
          Object.assign(this, gitHosts[type]), this.type = type, this.user = user, this.auth = auth, 
          this.project = project, this.committish = committish, this.default = defaultRepresentation, 
          this.opts = opts;
        }
        hash() {
          return this.committish ? `#${this.committish}` : "";
        }
        ssh(opts) {
          return this._fill(this.sshtemplate, opts);
        }
        _fill(template, opts) {
          if ("function" == typeof template) {
            const options = {
              ...this,
              ...this.opts,
              ...opts
            };
            options.path || (options.path = ""), options.path.startsWith("/") && (options.path = options.path.slice(1)), 
            options.noCommittish && (options.committish = null);
            const result = template(options);
            return options.noGitPlus && result.startsWith("git+") ? result.slice(4) : result;
          }
          return null;
        }
        sshurl(opts) {
          return this._fill(this.sshurltemplate, opts);
        }
        browse(path, fragment, opts) {
          return "string" != typeof path ? this._fill(this.browsetemplate, path) : ("string" != typeof fragment && (opts = fragment, 
          fragment = null), this._fill(this.browsefiletemplate, {
            ...opts,
            fragment,
            path
          }));
        }
        docs(opts) {
          return this._fill(this.docstemplate, opts);
        }
        bugs(opts) {
          return this._fill(this.bugstemplate, opts);
        }
        https(opts) {
          return this._fill(this.httpstemplate, opts);
        }
        git(opts) {
          return this._fill(this.gittemplate, opts);
        }
        shortcut(opts) {
          return this._fill(this.shortcuttemplate, opts);
        }
        path(opts) {
          return this._fill(this.pathtemplate, opts);
        }
        tarball(opts) {
          return this._fill(this.tarballtemplate, {
            ...opts,
            noCommittish: !1
          });
        }
        file(path, opts) {
          return this._fill(this.filetemplate, {
            ...opts,
            path
          });
        }
        edit(path, opts) {
          return this._fill(this.edittemplate, {
            ...opts,
            path
          });
        }
        getDefaultRepresentation() {
          return this.default;
        }
        toString(opts) {
          return this.default && "function" == typeof this[this.default] ? this[this.default](opts) : this.sshurl(opts);
        }
      };
    },
    35037: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const gitHosts = __webpack_require__(6437), GitHost = module.exports = __webpack_require__(14702), LRU = __webpack_require__(71752), parseUrl = __webpack_require__(53957), cache = new LRU({
        max: 1e3
      }), protocols = {
        "git+ssh:": {
          name: "sshurl"
        },
        "ssh:": {
          name: "sshurl"
        },
        "git+https:": {
          name: "https",
          auth: !0
        },
        "git:": {
          auth: !0
        },
        "http:": {
          auth: !0
        },
        "https:": {
          auth: !0
        },
        "git+http:": {
          auth: !0
        },
        ...Object.keys(gitHosts.byShortcut).reduce(((acc, key) => (acc[key] = {
          name: gitHosts.byShortcut[key]
        }, acc)), {})
      };
      module.exports.fromUrl = function(giturl, opts) {
        if ("string" != typeof giturl) return;
        const key = giturl + JSON.stringify(opts || {});
        return cache.has(key) || cache.set(key, function(giturl, opts) {
          if (!giturl) return;
          const correctedUrl = isGitHubShorthand(giturl) ? `github:${giturl}` : giturl, parsed = parseUrl(correctedUrl, protocols);
          if (!parsed) return;
          const gitHostShortcut = gitHosts.byShortcut[parsed.protocol], gitHostDomain = gitHosts.byDomain[parsed.hostname.startsWith("www.") ? parsed.hostname.slice(4) : parsed.hostname], gitHostName = gitHostShortcut || gitHostDomain;
          if (!gitHostName) return;
          const gitHostInfo = gitHosts[gitHostShortcut || gitHostDomain];
          let auth = null;
          protocols[parsed.protocol] && protocols[parsed.protocol].auth && (parsed.username || parsed.password) && (auth = `${parsed.username}${parsed.password ? ":" + parsed.password : ""}`);
          let committish = null, user = null, project = null, defaultRepresentation = null;
          try {
            if (gitHostShortcut) {
              let pathname = parsed.pathname.startsWith("/") ? parsed.pathname.slice(1) : parsed.pathname;
              const firstAt = pathname.indexOf("@");
              firstAt > -1 && (pathname = pathname.slice(firstAt + 1));
              const lastSlash = pathname.lastIndexOf("/");
              lastSlash > -1 ? (user = decodeURIComponent(pathname.slice(0, lastSlash)), user || (user = null), 
              project = decodeURIComponent(pathname.slice(lastSlash + 1))) : project = decodeURIComponent(pathname), 
              project.endsWith(".git") && (project = project.slice(0, -4)), parsed.hash && (committish = decodeURIComponent(parsed.hash.slice(1))), 
              defaultRepresentation = "shortcut";
            } else {
              if (!gitHostInfo.protocols.includes(parsed.protocol)) return;
              const segments = gitHostInfo.extract(parsed);
              if (!segments) return;
              user = segments.user && decodeURIComponent(segments.user), project = decodeURIComponent(segments.project), 
              committish = decodeURIComponent(segments.committish), defaultRepresentation = protocols[parsed.protocol] && protocols[parsed.protocol].name || parsed.protocol.slice(0, -1);
            }
          } catch (err) {
            if (err instanceof URIError) return;
            throw err;
          }
          return new GitHost(gitHostName, user, auth, project, committish, defaultRepresentation, opts);
        }(giturl, opts)), cache.get(key);
      }, module.exports.parseUrl = parseUrl;
      const isGitHubShorthand = arg => {
        const firstHash = arg.indexOf("#"), firstSlash = arg.indexOf("/"), secondSlash = arg.indexOf("/", firstSlash + 1), firstColon = arg.indexOf(":"), firstSpace = /\s/.exec(arg), firstAt = arg.indexOf("@"), spaceOnlyAfterHash = !firstSpace || firstHash > -1 && firstSpace.index > firstHash, atOnlyAfterHash = -1 === firstAt || firstHash > -1 && firstAt > firstHash, colonOnlyAfterHash = -1 === firstColon || firstHash > -1 && firstColon > firstHash, secondSlashOnlyAfterHash = -1 === secondSlash || firstHash > -1 && secondSlash > firstHash, hasSlash = firstSlash > 0, doesNotEndWithSlash = firstHash > -1 ? "/" !== arg[firstHash - 1] : !arg.endsWith("/"), doesNotStartWithDot = !arg.startsWith(".");
        return spaceOnlyAfterHash && hasSlash && doesNotEndWithSlash && doesNotStartWithDot && atOnlyAfterHash && colonOnlyAfterHash && secondSlashOnlyAfterHash;
      };
    },
    53957: (module, __unused_webpack_exports, __webpack_require__) => {
      const url = __webpack_require__(57310), lastIndexOfBefore = (str, char, beforeChar) => {
        const startPosition = str.indexOf(beforeChar);
        return str.lastIndexOf(char, startPosition > -1 ? startPosition : 1 / 0);
      }, safeUrl = u => {
        try {
          return new url.URL(u);
        } catch {}
      };
      module.exports = (giturl, protocols) => {
        const withProtocol = protocols ? ((arg, protocols) => {
          const firstColon = arg.indexOf(":"), proto = arg.slice(0, firstColon + 1);
          if (Object.prototype.hasOwnProperty.call(protocols, proto)) return arg;
          const firstAt = arg.indexOf("@");
          return firstAt > -1 ? firstAt > firstColon ? `git+ssh://${arg}` : arg : arg.indexOf("//") === firstColon + 1 ? arg : `${arg.slice(0, firstColon + 1)}//${arg.slice(firstColon + 1)}`;
        })(giturl, protocols) : giturl;
        return safeUrl(withProtocol) || safeUrl((giturl => {
          const firstAt = lastIndexOfBefore(giturl, "@", "#"), lastColonBeforeHash = lastIndexOfBefore(giturl, ":", "#");
          return lastColonBeforeHash > firstAt && (giturl = giturl.slice(0, lastColonBeforeHash) + "/" + giturl.slice(lastColonBeforeHash + 1)), 
          -1 === lastIndexOfBefore(giturl, ":", "#") && -1 === giturl.indexOf("//") && (giturl = `git+ssh://${giturl}`), 
          giturl;
        })(withProtocol));
      };
    },
    46521: module => {
      const LEVELS = [ "notice", "error", "warn", "info", "verbose", "http", "silly", "pause", "resume" ], log = level => (...args) => process.emit("log", level, ...args), logger = {};
      for (const level of LEVELS) logger[level] = log(level);
      logger.LEVELS = LEVELS, module.exports = logger;
    },
    74980: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var scopedPackagePattern = new RegExp("^(?:@([^/]+?)[/])?([^/]+?)$"), builtins = __webpack_require__(78874), blacklist = [ "node_modules", "favicon.ico" ];
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
      module.exports = function(name) {
        var warnings = [], errors = [];
        if (null === name) return errors.push("name cannot be null"), done(warnings, errors);
        if (void 0 === name) return errors.push("name cannot be undefined"), done(warnings, errors);
        if ("string" != typeof name) return errors.push("name must be a string"), done(warnings, errors);
        if (name.length || errors.push("name length must be greater than zero"), name.match(/^\./) && errors.push("name cannot start with a period"), 
        name.match(/^_/) && errors.push("name cannot start with an underscore"), name.trim() !== name && errors.push("name cannot contain leading or trailing spaces"), 
        blacklist.forEach((function(blacklistedName) {
          name.toLowerCase() === blacklistedName && errors.push(blacklistedName + " is a blacklisted name");
        })), builtins({
          version: "*"
        }).forEach((function(builtin) {
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
      };
    },
    71962: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      module.exports = npa, module.exports.resolve = resolve, module.exports.Result = Result;
      const url = __webpack_require__(57310), HostedGit = __webpack_require__(35037), semver = __webpack_require__(5870), path = global.FAKE_WINDOWS ? __webpack_require__(71017).win32 : __webpack_require__(71017), validatePackageName = __webpack_require__(74980), {homedir} = __webpack_require__(22037), log = __webpack_require__(46521), isWindows = "win32" === process.platform || global.FAKE_WINDOWS, hasSlashes = isWindows ? /\\|[/]/ : /[/]/, isURL = /^(?:git[+])?[a-z]+:/i, isGit = /^[^@]+@[^:.]+\.[^:]+:.+$/i, isFilename = /[.](?:tgz|tar.gz|tar)$/i;
      function npa(arg, where) {
        let name, spec;
        if ("object" == typeof arg) return arg instanceof Result && (!where || where === arg.where) ? arg : arg.name && arg.rawSpec ? npa.resolve(arg.name, arg.rawSpec, where || arg.where) : npa(arg.raw, where || arg.where);
        const nameEndsAt = "@" === arg[0] ? arg.slice(1).indexOf("@") + 1 : arg.indexOf("@"), namePart = nameEndsAt > 0 ? arg.slice(0, nameEndsAt) : arg;
        if (isURL.test(arg)) spec = arg; else if (isGit.test(arg)) spec = `git+ssh://${arg}`; else if ("@" !== namePart[0] && (hasSlashes.test(namePart) || isFilename.test(namePart))) spec = arg; else if (nameEndsAt > 0) name = namePart, 
        spec = arg.slice(nameEndsAt + 1); else {
          validatePackageName(arg).validForOldPackages ? name = arg : spec = arg;
        }
        return resolve(name, spec, where, arg);
      }
      module.exports._validateName = validatePackageName, module.exports._hostedGit = HostedGit;
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
          const urlparse = url.parse(res.rawSpec);
          switch (res.saveSpec = res.rawSpec, urlparse.protocol) {
           case "git:":
           case "git+http:":
           case "git+https:":
           case "git+rsync:":
           case "git+ftp:":
           case "git+file:":
           case "git+ssh:":
            {
              res.type = "git";
              const match = "git+ssh:" === urlparse.protocol ? function(spec) {
                const matched = spec.match(/^git\+ssh:\/\/([^:#]+:[^#]+(?:\.git)?)(?:#(.*))?$/i);
                return matched && !matched[1].match(/:[0-9]+\/?.*$/i) && {
                  fetchSpec: matched[1],
                  gitCommittish: null == matched[2] ? null : matched[2]
                };
              }(res.rawSpec) : null;
              match ? (setGitCommittish(res, match.gitCommittish), res.fetchSpec = match.fetchSpec) : (setGitCommittish(res, null != urlparse.hash ? urlparse.hash.slice(1) : ""), 
              urlparse.protocol = urlparse.protocol.replace(/^git[+]/, ""), "file:" === urlparse.protocol && /^git\+file:\/\/[a-z]:/i.test(res.rawSpec) && (urlparse.host += ":", 
              urlparse.hostname += ":"), delete urlparse.hash, res.fetchSpec = url.format(urlparse));
              break;
            }

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
          const spec = "" === res.rawSpec ? "latest" : res.rawSpec.trim();
          res.saveSpec = null, res.fetchSpec = spec;
          const version = semver.valid(spec, !0), range = semver.validRange(spec, !0);
          if (version) res.type = "version"; else if (range) res.type = "range"; else {
            if (encodeURIComponent(spec) !== spec) throw function(name, raw) {
              const err = new Error(`Invalid tag name "${name}" of package "${raw}": Tags may not have any characters that encodeURIComponent encodes.`);
              return err.code = "EINVALIDTAGNAME", err;
            }(spec, res.raw);
            res.type = "tag";
          }
          return res;
        }(res);
      }
      function Result(opts) {
        this.type = opts.type, this.registry = opts.registry, this.where = opts.where, null == opts.raw ? this.raw = opts.name ? opts.name + "@" + opts.rawSpec : opts.rawSpec : this.raw = opts.raw, 
        this.name = void 0, this.escapedName = void 0, this.scope = void 0, this.rawSpec = null == opts.rawSpec ? "" : opts.rawSpec, 
        this.saveSpec = opts.saveSpec, this.fetchSpec = opts.fetchSpec, opts.name && this.setName(opts.name), 
        this.gitRange = opts.gitRange, this.gitCommittish = opts.gitCommittish, this.gitSubdir = opts.gitSubdir, 
        this.hosted = opts.hosted;
      }
      function setGitCommittish(res, committish) {
        if (!committish) return res.gitCommittish = null, res;
        for (const part of committish.split("::")) {
          if (!part.includes(":")) {
            if (res.gitRange) throw new Error("cannot override existing semver range with a committish");
            if (res.gitCommittish) throw new Error("cannot override existing committish with a second committish");
            res.gitCommittish = part;
            continue;
          }
          const [name, value] = part.split(":");
          if ("semver" !== name) if ("path" !== name) log.warn("npm-package-arg", `ignoring unknown key "${name}"`); else {
            if (res.gitSubdir) throw new Error("cannot override existing path with a second path");
            res.gitSubdir = `/${value}`;
          } else {
            if (res.gitCommittish) throw new Error("cannot override existing committish with a semver range");
            if (res.gitRange) throw new Error("cannot override existing semver range with a second semver range");
            res.gitRange = decodeURIComponent(value);
          }
        }
        return res;
      }
      function fromFile(res, where) {
        let specUrl, resolvedUrl;
        where || (where = process.cwd()), res.type = isFilename.test(res.rawSpec) ? "file" : "directory", 
        res.where = where;
        const rawWithPrefix = (/^file:/.test(res.rawSpec) ? "" : "file:") + res.rawSpec;
        let rawNoPrefix = rawWithPrefix.replace(/^file:/, "");
        try {
          resolvedUrl = new url.URL(rawWithPrefix, `file://${path.resolve(where)}/`), specUrl = new url.URL(rawWithPrefix);
        } catch (originalError) {
          const er = new Error("Invalid file: URL, must comply with RFC 8909");
          throw Object.assign(er, {
            raw: res.rawSpec,
            spec: res,
            where,
            originalError
          });
        }
        if ("1" !== process.env.NPM_PACKAGE_ARG_8909_STRICT) {
          if (resolvedUrl.host && "localhost" !== resolvedUrl.host) {
            const rawSpec = res.rawSpec.replace(/^file:\/\//, "file:///");
            resolvedUrl = new url.URL(rawSpec, `file://${path.resolve(where)}/`), specUrl = new url.URL(rawSpec), 
            rawNoPrefix = rawSpec.replace(/^file:/, "");
          }
          if (/^\/\.\.?(\/|$)/.test(rawNoPrefix)) {
            const rawSpec = res.rawSpec.replace(/^file:\//, "file:");
            resolvedUrl = new url.URL(rawSpec, `file://${path.resolve(where)}/`), specUrl = new url.URL(rawSpec), 
            rawNoPrefix = rawSpec.replace(/^file:/, "");
          }
        }
        if (resolvedUrl.host && "localhost" !== resolvedUrl.host) {
          const msg = "Invalid file: URL, must be absolute if // present";
          throw Object.assign(new Error(msg), {
            raw: res.rawSpec,
            parsed: resolvedUrl
          });
        }
        let specPath = decodeURIComponent(specUrl.pathname), resolvedPath = decodeURIComponent(resolvedUrl.pathname);
        return isWindows && (specPath = specPath.replace(/^\/+([a-z]:\/)/i, "$1"), resolvedPath = resolvedPath.replace(/^\/+([a-z]:\/)/i, "$1")), 
        /^\/~(\/|$)/.test(specPath) ? (res.saveSpec = `file:${specPath.substr(1)}`, resolvedPath = path.resolve(homedir(), specPath.substr(3))) : path.isAbsolute(rawNoPrefix) ? res.saveSpec = `file:${path.resolve(resolvedPath)}` : res.saveSpec = `file:${path.relative(where, resolvedPath)}`, 
        res.fetchSpec = path.resolve(where, resolvedPath), res;
      }
      Result.prototype.setName = function(name) {
        const valid = validatePackageName(name);
        if (!valid.validForOldPackages) throw function(name, valid, raw) {
          const err = new Error(`Invalid package name "${name}" of package "${raw}": ${valid.errors.join("; ")}.`);
          return err.code = "EINVALIDPACKAGENAME", err;
        }(name, valid, this.raw);
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
    },
    5870: module => {
      "use strict";
      module.exports = require("./semver");
    },
    71752: module => {
      "use strict";
      module.exports = require("../vendor/lru-cache");
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
  }(71962);
  module.exports = __webpack_exports__;
})();