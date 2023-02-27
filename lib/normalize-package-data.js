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
    55626: module => {
      module.exports = function(d) {
        if (!d) return;
        if ("ERROR: No README data found!" === d) return;
        d = d.trim().split("\n");
        for (var s = 0; d[s] && d[s].trim().match(/^(#|$)/); s++) ;
        for (var l = d.length, e = s + 1; e < l && d[e].trim(); e++) ;
        return d.slice(s, e).join(" ").trim();
      };
    },
    68206: (module, __unused_webpack_exports, __webpack_require__) => {
      var semver = __webpack_require__(73107), validateLicense = __webpack_require__(41488), hostedGitInfo = __webpack_require__(71438), isBuiltinModule = __webpack_require__(43975).isCore, depTypes = [ "dependencies", "devDependencies", "optionalDependencies" ], extractDescription = __webpack_require__(55626), url = __webpack_require__(57310), typos = __webpack_require__(93884);
      module.exports = {
        warn: function() {},
        fixRepositoryField: function(data) {
          if (data.repositories && (this.warn("repositories"), data.repository = data.repositories[0]), 
          !data.repository) return this.warn("missingRepository");
          "string" == typeof data.repository && (data.repository = {
            type: "git",
            url: data.repository
          });
          var r = data.repository.url || "";
          if (r) {
            var hosted = hostedGitInfo.fromUrl(r);
            hosted && (r = data.repository.url = "shortcut" == hosted.getDefaultRepresentation() ? hosted.https() : hosted.toString());
          }
          r.match(/github.com\/[^\/]+\/[^\/]+\.git\.git$/) && this.warn("brokenGitUrl", r);
        },
        fixTypos: function(data) {
          Object.keys(typos.topLevel).forEach((function(d) {
            data.hasOwnProperty(d) && this.warn("typo", d, typos.topLevel[d]);
          }), this);
        },
        fixScriptsField: function(data) {
          if (data.scripts) return "object" != typeof data.scripts ? (this.warn("nonObjectScripts"), 
          void delete data.scripts) : void Object.keys(data.scripts).forEach((function(k) {
            "string" != typeof data.scripts[k] ? (this.warn("nonStringScript"), delete data.scripts[k]) : typos.script[k] && !data.scripts[typos.script[k]] && this.warn("typo", k, typos.script[k], "scripts");
          }), this);
        },
        fixFilesField: function(data) {
          var files = data.files;
          files && !Array.isArray(files) ? (this.warn("nonArrayFiles"), delete data.files) : data.files && (data.files = data.files.filter((function(file) {
            return !(!file || "string" != typeof file) || (this.warn("invalidFilename", file), 
            !1);
          }), this));
        },
        fixBinField: function(data) {
          if (data.bin && "string" == typeof data.bin) {
            var match, b = {};
            (match = data.name.match(/^@[^/]+[/](.*)$/)) ? b[match[1]] = data.bin : b[data.name] = data.bin, 
            data.bin = b;
          }
        },
        fixManField: function(data) {
          data.man && "string" == typeof data.man && (data.man = [ data.man ]);
        },
        fixBundleDependenciesField: function(data) {
          var bdd = "bundledDependencies", bd = "bundleDependencies";
          data[bdd] && !data[bd] && (data[bd] = data[bdd], delete data[bdd]), data[bd] && !Array.isArray(data[bd]) ? (this.warn("nonArrayBundleDependencies"), 
          delete data[bd]) : data[bd] && (data[bd] = data[bd].filter((function(bd) {
            return bd && "string" == typeof bd ? (data.dependencies || (data.dependencies = {}), 
            data.dependencies.hasOwnProperty(bd) || (this.warn("nonDependencyBundleDependency", bd), 
            data.dependencies[bd] = "*"), !0) : (this.warn("nonStringBundleDependency", bd), 
            !1);
          }), this));
        },
        fixDependencies: function(data, strict) {
          !function(data, warn) {
            depTypes.forEach((function(type) {
              data[type] && (data[type] = function(deps, type, warn) {
                if (!deps) return {};
                "string" == typeof deps && (deps = deps.trim().split(/[\n\r\s\t ,]+/));
                if (!Array.isArray(deps)) return deps;
                warn("deprecatedArrayDependencies", type);
                var o = {};
                return deps.filter((function(d) {
                  return "string" == typeof d;
                })).forEach((function(d) {
                  var dn = (d = d.trim().split(/(:?[@\s><=])/)).shift(), dv = d.join("");
                  dv = (dv = dv.trim()).replace(/^@/, ""), o[dn] = dv;
                })), o;
              }(data[type], type, warn));
            }));
          }(data, this.warn), function(data, warn) {
            var o = data.optionalDependencies;
            if (!o) return;
            var d = data.dependencies || {};
            Object.keys(o).forEach((function(k) {
              d[k] = o[k];
            })), data.dependencies = d;
          }(data, this.warn), this.fixBundleDependenciesField(data), [ "dependencies", "devDependencies" ].forEach((function(deps) {
            if (deps in data) return data[deps] && "object" == typeof data[deps] ? void Object.keys(data[deps]).forEach((function(d) {
              var r = data[deps][d];
              "string" != typeof r && (this.warn("nonStringDependency", d, JSON.stringify(r)), 
              delete data[deps][d]);
              var hosted = hostedGitInfo.fromUrl(data[deps][d]);
              hosted && (data[deps][d] = hosted.toString());
            }), this) : (this.warn("nonObjectDependencies", deps), void delete data[deps]);
          }), this);
        },
        fixModulesField: function(data) {
          data.modules && (this.warn("deprecatedModules"), delete data.modules);
        },
        fixKeywordsField: function(data) {
          "string" == typeof data.keywords && (data.keywords = data.keywords.split(/,\s+/)), 
          data.keywords && !Array.isArray(data.keywords) ? (delete data.keywords, this.warn("nonArrayKeywords")) : data.keywords && (data.keywords = data.keywords.filter((function(kw) {
            return !("string" != typeof kw || !kw) || (this.warn("nonStringKeyword"), !1);
          }), this));
        },
        fixVersionField: function(data, strict) {
          var loose = !strict;
          if (!data.version) return data.version = "", !0;
          if (!semver.valid(data.version, loose)) throw new Error('Invalid version: "' + data.version + '"');
          return data.version = semver.clean(data.version, loose), !0;
        },
        fixPeople: function(data) {
          modifyPeople(data, unParsePerson), modifyPeople(data, parsePerson);
        },
        fixNameField: function(data, options) {
          "boolean" == typeof options ? options = {
            strict: options
          } : void 0 === options && (options = {});
          var strict = options.strict;
          if (data.name || strict) {
            if ("string" != typeof data.name) throw new Error("name field must be a string.");
            strict || (data.name = data.name.trim()), function(name, strict, allowLegacyCase) {
              if ("." === name.charAt(0) || !function(spec) {
                if ("@" !== spec.charAt(0)) return !1;
                var rest = spec.slice(1).split("/");
                return 2 === rest.length && (rest[0] && rest[1] && rest[0] === encodeURIComponent(rest[0]) && rest[1] === encodeURIComponent(rest[1]));
              }(name) && (spec = name, spec.match(/[\/@\s\+%:]/) || spec !== encodeURIComponent(spec)) || strict && !allowLegacyCase && name !== name.toLowerCase() || "node_modules" === name.toLowerCase() || "favicon.ico" === name.toLowerCase()) throw new Error("Invalid name: " + JSON.stringify(name));
              var spec;
            }(data.name, strict, options.allowLegacyCase), isBuiltinModule(data.name) && this.warn("conflictingName", data.name);
          } else data.name = "";
        },
        fixDescriptionField: function(data) {
          data.description && "string" != typeof data.description && (this.warn("nonStringDescription"), 
          delete data.description), data.readme && !data.description && (data.description = extractDescription(data.readme)), 
          void 0 === data.description && delete data.description, data.description || this.warn("missingDescription");
        },
        fixReadmeField: function(data) {
          data.readme || (this.warn("missingReadme"), data.readme = "ERROR: No README data found!");
        },
        fixBugsField: function(data) {
          if (!data.bugs && data.repository && data.repository.url) {
            var hosted = hostedGitInfo.fromUrl(data.repository.url);
            hosted && hosted.bugs() && (data.bugs = {
              url: hosted.bugs()
            });
          } else if (data.bugs) {
            var emailRe = /^.+@.*\..+$/;
            if ("string" == typeof data.bugs) emailRe.test(data.bugs) ? data.bugs = {
              email: data.bugs
            } : url.parse(data.bugs).protocol ? data.bugs = {
              url: data.bugs
            } : this.warn("nonEmailUrlBugsString"); else {
              !function(bugs, warn) {
                if (!bugs) return;
                Object.keys(bugs).forEach((function(k) {
                  typos.bugs[k] && (warn("typo", k, typos.bugs[k], "bugs"), bugs[typos.bugs[k]] = bugs[k], 
                  delete bugs[k]);
                }));
              }(data.bugs, this.warn);
              var oldBugs = data.bugs;
              data.bugs = {}, oldBugs.url && ("string" == typeof oldBugs.url && url.parse(oldBugs.url).protocol ? data.bugs.url = oldBugs.url : this.warn("nonUrlBugsUrlField")), 
              oldBugs.email && ("string" == typeof oldBugs.email && emailRe.test(oldBugs.email) ? data.bugs.email = oldBugs.email : this.warn("nonEmailBugsEmailField"));
            }
            data.bugs.email || data.bugs.url || (delete data.bugs, this.warn("emptyNormalizedBugs"));
          }
        },
        fixHomepageField: function(data) {
          if (!data.homepage && data.repository && data.repository.url) {
            var hosted = hostedGitInfo.fromUrl(data.repository.url);
            hosted && hosted.docs() && (data.homepage = hosted.docs());
          }
          if (data.homepage) return "string" != typeof data.homepage ? (this.warn("nonUrlHomepage"), 
          delete data.homepage) : void (url.parse(data.homepage).protocol || (data.homepage = "http://" + data.homepage));
        },
        fixLicenseField: function(data) {
          if (!data.license) return this.warn("missingLicense");
          "string" != typeof data.license || data.license.length < 1 || "" === data.license.trim() ? this.warn("invalidLicense") : validateLicense(data.license).validForNewPackages || this.warn("invalidLicense");
        }
      };
      function modifyPeople(data, fn) {
        return data.author && (data.author = fn(data.author)), [ "maintainers", "contributors" ].forEach((function(set) {
          Array.isArray(data[set]) && (data[set] = data[set].map(fn));
        })), data;
      }
      function unParsePerson(person) {
        if ("string" == typeof person) return person;
        var name = person.name || "", u = person.url || person.web, url = u ? " (" + u + ")" : "", e = person.email || person.mail;
        return name + (e ? " <" + e + ">" : "") + url;
      }
      function parsePerson(person) {
        if ("string" != typeof person) return person;
        var name = person.match(/^([^\(<]+)/), url = person.match(/\(([^\)]+)\)/), email = person.match(/<([^>]+)>/), obj = {};
        return name && name[0].trim() && (obj.name = name[0].trim()), email && (obj.email = email[1]), 
        url && (obj.url = url[1]), obj;
      }
    },
    69269: (module, __unused_webpack_exports, __webpack_require__) => {
      var util = __webpack_require__(73837), messages = __webpack_require__(92358);
      function makeTypoWarning(providedName, probableName, field) {
        return field && (providedName = field + "['" + providedName + "']", probableName = field + "['" + probableName + "']"), 
        util.format(messages.typo, providedName, probableName);
      }
      module.exports = function() {
        var args = Array.prototype.slice.call(arguments, 0), warningName = args.shift();
        if ("typo" == warningName) return makeTypoWarning.apply(null, args);
        var msgTemplate = messages[warningName] ? messages[warningName] : warningName + ": '%s'";
        return args.unshift(msgTemplate), util.format.apply(null, args);
      };
    },
    27323: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = normalize;
      var fixer = __webpack_require__(68206);
      normalize.fixer = fixer;
      var makeWarning = __webpack_require__(69269), thingsToFix = [ "name", "version", "description", "repository", "modules", "scripts", "files", "bin", "man", "bugs", "keywords", "readme", "homepage", "license" ].map((function(fieldName) {
        return ucFirst(fieldName) + "Field";
      }));
      function normalize(data, warn, strict) {
        !0 === warn && (warn = null, strict = !0), strict || (strict = !1), warn && !data.private || (warn = function(msg) {}), 
        data.scripts && "node-gyp rebuild" === data.scripts.install && !data.scripts.preinstall && (data.gypfile = !0), 
        fixer.warn = function() {
          warn(makeWarning.apply(null, arguments));
        }, thingsToFix.forEach((function(thingName) {
          fixer["fix" + ucFirst(thingName)](data, strict);
        })), data._id = data.name + "@" + data.version;
      }
      function ucFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      thingsToFix = thingsToFix.concat([ "dependencies", "people", "typos" ]);
    },
    79185: module => {
      "use strict";
      var isWindows = "win32" === process.platform, splitWindowsRe = /^(((?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?[\\\/]?)(?:[^\\\/]*[\\\/])*)((\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))[\\\/]*$/, win32 = {};
      win32.parse = function(pathString) {
        if ("string" != typeof pathString) throw new TypeError("Parameter 'pathString' must be a string, not " + typeof pathString);
        var filename, allParts = (filename = pathString, splitWindowsRe.exec(filename).slice(1));
        if (!allParts || 5 !== allParts.length) throw new TypeError("Invalid path '" + pathString + "'");
        return {
          root: allParts[1],
          dir: allParts[0] === allParts[1] ? allParts[0] : allParts[0].slice(0, -1),
          base: allParts[2],
          ext: allParts[4],
          name: allParts[3]
        };
      };
      var splitPathRe = /^((\/?)(?:[^\/]*\/)*)((\.{1,2}|[^\/]+?|)(\.[^.\/]*|))[\/]*$/, posix = {};
      posix.parse = function(pathString) {
        if ("string" != typeof pathString) throw new TypeError("Parameter 'pathString' must be a string, not " + typeof pathString);
        var filename, allParts = (filename = pathString, splitPathRe.exec(filename).slice(1));
        if (!allParts || 5 !== allParts.length) throw new TypeError("Invalid path '" + pathString + "'");
        return {
          root: allParts[1],
          dir: allParts[0].slice(0, -1),
          base: allParts[2],
          ext: allParts[4],
          name: allParts[3]
        };
      }, module.exports = isWindows ? win32.parse : posix.parse, module.exports.posix = posix.parse, 
      module.exports.win32 = win32.parse;
    },
    43975: (module, exports, __webpack_require__) => {
      var core = __webpack_require__(15236), async = __webpack_require__(53115);
      async.core = core, async.isCore = function(x) {
        return core[x];
      }, async.sync = __webpack_require__(29290), module.exports = async;
    },
    53115: (module, __unused_webpack_exports, __webpack_require__) => {
      var core = __webpack_require__(15236), fs = __webpack_require__(57147), path = __webpack_require__(71017), caller = __webpack_require__(41914), nodeModulesPaths = __webpack_require__(96703), normalizeOptions = __webpack_require__(47260), defaultIsFile = function(file, cb) {
        fs.stat(file, (function(err, stat) {
          return err ? "ENOENT" === err.code || "ENOTDIR" === err.code ? cb(null, !1) : cb(err) : cb(null, stat.isFile() || stat.isFIFO());
        }));
      };
      module.exports = function(x, options, callback) {
        var cb = callback, opts = options;
        if ("function" == typeof options && (cb = opts, opts = {}), "string" != typeof x) {
          var err = new TypeError("Path must be a string.");
          return process.nextTick((function() {
            cb(err);
          }));
        }
        var isFile = (opts = normalizeOptions(x, opts)).isFile || defaultIsFile, readFile = opts.readFile || fs.readFile, extensions = opts.extensions || [ ".js" ], basedir = opts.basedir || path.dirname(caller()), parent = opts.filename || basedir;
        opts.paths = opts.paths || [];
        var res, absoluteStart = path.resolve(basedir);
        function init(basedir) {
          /^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/.test(x) ? (res = path.resolve(basedir, x), 
          ".." !== x && "/" !== x.slice(-1) || (res += "/"), /\/$/.test(x) && res === basedir ? loadAsDirectory(res, opts.package, onfile) : loadAsFile(res, opts.package, onfile)) : function(x, start, cb) {
            processDirs(cb, nodeModulesPaths(start, opts, x));
          }(x, basedir, (function(err, n, pkg) {
            if (err) cb(err); else if (n) cb(null, n, pkg); else {
              if (core[x]) return cb(null, x);
              var moduleError = new Error("Cannot find module '" + x + "' from '" + parent + "'");
              moduleError.code = "MODULE_NOT_FOUND", cb(moduleError);
            }
          }));
        }
        function onfile(err, m, pkg) {
          err ? cb(err) : m ? cb(null, m, pkg) : loadAsDirectory(res, (function(err, d, pkg) {
            if (err) cb(err); else if (d) cb(null, d, pkg); else {
              var moduleError = new Error("Cannot find module '" + x + "' from '" + parent + "'");
              moduleError.code = "MODULE_NOT_FOUND", cb(moduleError);
            }
          }));
        }
        function loadAsFile(x, thePackage, callback) {
          var loadAsFilePackage = thePackage, cb = callback;
          "function" == typeof loadAsFilePackage && (cb = loadAsFilePackage, loadAsFilePackage = void 0), 
          function load(exts, x, loadPackage) {
            if (0 === exts.length) return cb(null, void 0, loadPackage);
            var file = x + exts[0], pkg = loadPackage;
            pkg ? onpkg(null, pkg) : loadpkg(path.dirname(file), onpkg);
            function onpkg(err, pkg_, dir) {
              if (pkg = pkg_, err) return cb(err);
              if (dir && pkg && opts.pathFilter) {
                var rfile = path.relative(dir, file), rel = rfile.slice(0, rfile.length - exts[0].length), r = opts.pathFilter(pkg, x, rel);
                if (r) return load([ "" ].concat(extensions.slice()), path.resolve(dir, r), pkg);
              }
              isFile(file, onex);
            }
            function onex(err, ex) {
              return err ? cb(err) : ex ? cb(null, file, pkg) : void load(exts.slice(1), x, pkg);
            }
          }([ "" ].concat(extensions), x, loadAsFilePackage);
        }
        function loadpkg(dir, cb) {
          if ("" === dir || "/" === dir) return cb(null);
          if ("win32" === process.platform && /^\w:[/\\]*$/.test(dir)) return cb(null);
          if (/[/\\]node_modules[/\\]*$/.test(dir)) return cb(null);
          var pkgfile = path.join(dir, "package.json");
          isFile(pkgfile, (function(err, ex) {
            if (!ex) return loadpkg(path.dirname(dir), cb);
            readFile(pkgfile, (function(err, body) {
              err && cb(err);
              try {
                var pkg = JSON.parse(body);
              } catch (jsonErr) {}
              pkg && opts.packageFilter && (pkg = opts.packageFilter(pkg, pkgfile)), cb(null, pkg, dir);
            }));
          }));
        }
        function loadAsDirectory(x, loadAsDirectoryPackage, callback) {
          var cb = callback, fpkg = loadAsDirectoryPackage;
          "function" == typeof fpkg && (cb = fpkg, fpkg = opts.package);
          var pkgfile = path.join(x, "package.json");
          isFile(pkgfile, (function(err, ex) {
            return err ? cb(err) : ex ? void readFile(pkgfile, (function(err, body) {
              if (err) return cb(err);
              try {
                var pkg = JSON.parse(body);
              } catch (jsonErr) {}
              if (opts.packageFilter && (pkg = opts.packageFilter(pkg, pkgfile)), pkg.main) {
                if ("string" != typeof pkg.main) {
                  var mainError = new TypeError("package “" + pkg.name + "” `main` must be a string");
                  return mainError.code = "INVALID_PACKAGE_MAIN", cb(mainError);
                }
                return "." !== pkg.main && "./" !== pkg.main || (pkg.main = "index"), void loadAsFile(path.resolve(x, pkg.main), pkg, (function(err, m, pkg) {
                  return err ? cb(err) : m ? cb(null, m, pkg) : pkg ? void loadAsDirectory(path.resolve(x, pkg.main), pkg, (function(err, n, pkg) {
                    return err ? cb(err) : n ? cb(null, n, pkg) : void loadAsFile(path.join(x, "index"), pkg, cb);
                  })) : loadAsFile(path.join(x, "index"), pkg, cb);
                }));
              }
              loadAsFile(path.join(x, "/index"), pkg, cb);
            })) : loadAsFile(path.join(x, "index"), fpkg, cb);
          }));
        }
        function processDirs(cb, dirs) {
          if (0 === dirs.length) return cb(null, void 0);
          var dir = dirs[0];
          function ondir(err, n, pkg) {
            return err ? cb(err) : n ? cb(null, n, pkg) : void processDirs(cb, dirs.slice(1));
          }
          loadAsFile(path.join(dir, x), opts.package, (function(err, m, pkg) {
            if (err) return cb(err);
            if (m) return cb(null, m, pkg);
            loadAsDirectory(path.join(dir, x), opts.package, ondir);
          }));
        }
        !1 === opts.preserveSymlinks ? fs.realpath(absoluteStart, (function(realPathErr, realStart) {
          realPathErr && "ENOENT" !== realPathErr.code ? cb(err) : init(realPathErr ? absoluteStart : realStart);
        })) : init(absoluteStart);
      };
    },
    41914: module => {
      module.exports = function() {
        var origPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = function(_, stack) {
          return stack;
        };
        var stack = (new Error).stack;
        return Error.prepareStackTrace = origPrepareStackTrace, stack[2].getFileName();
      };
    },
    15236: (module, __unused_webpack_exports, __webpack_require__) => {
      var current = process.versions && process.versions.node && process.versions.node.split(".") || [];
      function specifierIncluded(specifier) {
        for (var parts = specifier.split(" "), op = parts.length > 1 ? parts[0] : "=", versionParts = (parts.length > 1 ? parts[1] : parts[0]).split("."), i = 0; i < 3; ++i) {
          var cur = Number(current[i] || 0), ver = Number(versionParts[i] || 0);
          if (cur !== ver) return "<" === op ? cur < ver : ">=" === op && cur >= ver;
        }
        return ">=" === op;
      }
      function matchesRange(range) {
        var specifiers = range.split(/ ?&& ?/);
        if (0 === specifiers.length) return !1;
        for (var i = 0; i < specifiers.length; ++i) if (!specifierIncluded(specifiers[i])) return !1;
        return !0;
      }
      function versionIncluded(specifierValue) {
        if ("boolean" == typeof specifierValue) return specifierValue;
        if (specifierValue && "object" == typeof specifierValue) {
          for (var i = 0; i < specifierValue.length; ++i) if (matchesRange(specifierValue[i])) return !0;
          return !1;
        }
        return matchesRange(specifierValue);
      }
      var data = __webpack_require__(14261), core = {};
      for (var mod in data) Object.prototype.hasOwnProperty.call(data, mod) && (core[mod] = versionIncluded(data[mod]));
      module.exports = core;
    },
    96703: (module, __unused_webpack_exports, __webpack_require__) => {
      var path = __webpack_require__(71017), parse = path.parse || __webpack_require__(79185), getNodeModulesDirs = function(absoluteStart, modules) {
        var prefix = "/";
        /^([A-Za-z]:)/.test(absoluteStart) ? prefix = "" : /^\\\\/.test(absoluteStart) && (prefix = "\\\\");
        for (var paths = [ absoluteStart ], parsed = parse(absoluteStart); parsed.dir !== paths[paths.length - 1]; ) paths.push(parsed.dir), 
        parsed = parse(parsed.dir);
        return paths.reduce((function(dirs, aPath) {
          return dirs.concat(modules.map((function(moduleDir) {
            return path.join(prefix, aPath, moduleDir);
          })));
        }), []);
      };
      module.exports = function(start, opts, request) {
        var modules = opts && opts.moduleDirectory ? [].concat(opts.moduleDirectory) : [ "node_modules" ];
        if (opts && "function" == typeof opts.paths) return opts.paths(request, start, (function() {
          return getNodeModulesDirs(start, modules);
        }), opts);
        var dirs = getNodeModulesDirs(start, modules);
        return opts && opts.paths ? dirs.concat(opts.paths) : dirs;
      };
    },
    47260: module => {
      module.exports = function(x, opts) {
        return opts || {};
      };
    },
    29290: (module, __unused_webpack_exports, __webpack_require__) => {
      var core = __webpack_require__(15236), fs = __webpack_require__(57147), path = __webpack_require__(71017), caller = __webpack_require__(41914), nodeModulesPaths = __webpack_require__(96703), normalizeOptions = __webpack_require__(47260), defaultIsFile = function(file) {
        try {
          var stat = fs.statSync(file);
        } catch (e) {
          if (e && ("ENOENT" === e.code || "ENOTDIR" === e.code)) return !1;
          throw e;
        }
        return stat.isFile() || stat.isFIFO();
      };
      module.exports = function(x, options) {
        if ("string" != typeof x) throw new TypeError("Path must be a string.");
        var opts = normalizeOptions(x, options), isFile = opts.isFile || defaultIsFile, readFileSync = opts.readFileSync || fs.readFileSync, extensions = opts.extensions || [ ".js" ], basedir = opts.basedir || path.dirname(caller()), parent = opts.filename || basedir;
        opts.paths = opts.paths || [];
        var absoluteStart = path.resolve(basedir);
        if (!1 === opts.preserveSymlinks) try {
          absoluteStart = fs.realpathSync(absoluteStart);
        } catch (realPathErr) {
          if ("ENOENT" !== realPathErr.code) throw realPathErr;
        }
        if (/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/.test(x)) {
          var res = path.resolve(absoluteStart, x);
          ".." !== x && "/" !== x.slice(-1) || (res += "/");
          var m = loadAsFileSync(res) || loadAsDirectorySync(res);
          if (m) return m;
        } else {
          var n = function(x, start) {
            for (var dirs = nodeModulesPaths(start, opts, x), i = 0; i < dirs.length; i++) {
              var dir = dirs[i], m = loadAsFileSync(path.join(dir, "/", x));
              if (m) return m;
              var n = loadAsDirectorySync(path.join(dir, "/", x));
              if (n) return n;
            }
          }(x, absoluteStart);
          if (n) return n;
        }
        if (core[x]) return x;
        var err = new Error("Cannot find module '" + x + "' from '" + parent + "'");
        throw err.code = "MODULE_NOT_FOUND", err;
        function loadAsFileSync(x) {
          var pkg = loadpkg(path.dirname(x));
          if (pkg && pkg.dir && pkg.pkg && opts.pathFilter) {
            var rfile = path.relative(pkg.dir, x), r = opts.pathFilter(pkg.pkg, x, rfile);
            r && (x = path.resolve(pkg.dir, r));
          }
          if (isFile(x)) return x;
          for (var i = 0; i < extensions.length; i++) {
            var file = x + extensions[i];
            if (isFile(file)) return file;
          }
        }
        function loadpkg(dir) {
          if ("" !== dir && "/" !== dir && !("win32" === process.platform && /^\w:[/\\]*$/.test(dir) || /[/\\]node_modules[/\\]*$/.test(dir))) {
            var pkgfile = path.join(dir, "package.json");
            if (!isFile(pkgfile)) return loadpkg(path.dirname(dir));
            var body = readFileSync(pkgfile);
            try {
              var pkg = JSON.parse(body);
            } catch (jsonErr) {}
            return pkg && opts.packageFilter && (pkg = opts.packageFilter(pkg, dir)), {
              pkg,
              dir
            };
          }
        }
        function loadAsDirectorySync(x) {
          var pkgfile = path.join(x, "/package.json");
          if (isFile(pkgfile)) {
            try {
              var body = readFileSync(pkgfile, "UTF8"), pkg = JSON.parse(body);
            } catch (e) {}
            if (opts.packageFilter && (pkg = opts.packageFilter(pkg, x)), pkg.main) {
              if ("string" != typeof pkg.main) {
                var mainError = new TypeError("package “" + pkg.name + "” `main` must be a string");
                throw mainError.code = "INVALID_PACKAGE_MAIN", mainError;
              }
              "." !== pkg.main && "./" !== pkg.main || (pkg.main = "index");
              try {
                var m = loadAsFileSync(path.resolve(x, pkg.main));
                if (m) return m;
                var n = loadAsDirectorySync(path.resolve(x, pkg.main));
                if (n) return n;
              } catch (e) {}
            }
          }
          return loadAsFileSync(path.join(x, "/index"));
        }
      };
    },
    73107: module => {
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
    },
    57310: module => {
      "use strict";
      module.exports = require("url");
    },
    73837: module => {
      "use strict";
      module.exports = require("util");
    },
    93884: module => {
      "use strict";
      module.exports = JSON.parse('{"topLevel":{"dependancies":"dependencies","dependecies":"dependencies","depdenencies":"dependencies","devEependencies":"devDependencies","depends":"dependencies","dev-dependencies":"devDependencies","devDependences":"devDependencies","devDepenencies":"devDependencies","devdependencies":"devDependencies","repostitory":"repository","repo":"repository","prefereGlobal":"preferGlobal","hompage":"homepage","hampage":"homepage","autohr":"author","autor":"author","contributers":"contributors","publicationConfig":"publishConfig","script":"scripts"},"bugs":{"web":"url","name":"url"},"script":{"server":"start","tests":"test"}}');
    },
    92358: module => {
      "use strict";
      module.exports = JSON.parse('{"repositories":"\'repositories\' (plural) Not supported. Please pick one as the \'repository\' field","missingRepository":"No repository field.","brokenGitUrl":"Probably broken git url: %s","nonObjectScripts":"scripts must be an object","nonStringScript":"script values must be string commands","nonArrayFiles":"Invalid \'files\' member","invalidFilename":"Invalid filename in \'files\' list: %s","nonArrayBundleDependencies":"Invalid \'bundleDependencies\' list. Must be array of package names","nonStringBundleDependency":"Invalid bundleDependencies member: %s","nonDependencyBundleDependency":"Non-dependency in bundleDependencies: %s","nonObjectDependencies":"%s field must be an object","nonStringDependency":"Invalid dependency: %s %s","deprecatedArrayDependencies":"specifying %s as array is deprecated","deprecatedModules":"modules field is deprecated","nonArrayKeywords":"keywords should be an array of strings","nonStringKeyword":"keywords should be an array of strings","conflictingName":"%s is also the name of a node core module.","nonStringDescription":"\'description\' field should be a string","missingDescription":"No description","missingReadme":"No README data","missingLicense":"No license field.","nonEmailUrlBugsString":"Bug string field must be url, email, or {email,url}","nonUrlBugsUrlField":"bugs.url field must be a string url. Deleted.","nonEmailBugsEmailField":"bugs.email field must be a string email. Deleted.","emptyNormalizedBugs":"Normalized value of bugs field is an empty object. Deleted.","nonUrlHomepage":"homepage field must be a string url. Deleted.","invalidLicense":"license should be a valid SPDX license expression","typo":"%s should probably be %s."}');
    },
    14261: module => {
      "use strict";
      module.exports = JSON.parse('{"assert":true,"async_hooks":">= 8","buffer_ieee754":"< 0.9.7","buffer":true,"child_process":true,"cluster":true,"console":true,"constants":true,"crypto":true,"_debugger":"< 8","dgram":true,"dns":true,"domain":true,"events":true,"freelist":"< 6","fs":true,"fs/promises":">= 10 && < 10.1","_http_agent":">= 0.11.1","_http_client":">= 0.11.1","_http_common":">= 0.11.1","_http_incoming":">= 0.11.1","_http_outgoing":">= 0.11.1","_http_server":">= 0.11.1","http":true,"http2":">= 8.8","https":true,"inspector":">= 8.0.0","_linklist":"< 8","module":true,"net":true,"node-inspect/lib/_inspect":">= 7.6.0","node-inspect/lib/internal/inspect_client":">= 7.6.0","node-inspect/lib/internal/inspect_repl":">= 7.6.0","os":true,"path":true,"perf_hooks":">= 8.5","process":">= 1","punycode":true,"querystring":true,"readline":true,"repl":true,"smalloc":">= 0.11.5 && < 3","_stream_duplex":">= 0.9.4","_stream_transform":">= 0.9.4","_stream_wrap":">= 1.4.1","_stream_passthrough":">= 0.9.4","_stream_readable":">= 0.9.4","_stream_writable":">= 0.9.4","stream":true,"string_decoder":true,"sys":true,"timers":true,"_tls_common":">= 0.11.13","_tls_legacy":">= 0.11.3 && < 10","_tls_wrap":">= 0.11.3","tls":true,"trace_events":">= 10","tty":true,"url":true,"util":true,"v8/tools/arguments":">= 10","v8/tools/codemap":[">= 4.4.0 && < 5",">= 5.2.0"],"v8/tools/consarray":[">= 4.4.0 && < 5",">= 5.2.0"],"v8/tools/csvparser":[">= 4.4.0 && < 5",">= 5.2.0"],"v8/tools/logreader":[">= 4.4.0 && < 5",">= 5.2.0"],"v8/tools/profile_view":[">= 4.4.0 && < 5",">= 5.2.0"],"v8/tools/splaytree":[">= 4.4.0 && < 5",">= 5.2.0"],"v8":">= 1","vm":true,"worker_threads":">= 11.7","zlib":true}');
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
  }(27323);
  module.exports = __webpack_exports__;
})();