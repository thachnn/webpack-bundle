#!/usr/bin/env node
(() => {
  var __webpack_modules__ = {
    783: (module, exports, __webpack_require__) => {
      var EventEmitter = __webpack_require__(361).EventEmitter, spawn = __webpack_require__(81).spawn, readlink = __webpack_require__(334).P, path = __webpack_require__(17), dirname = path.dirname, basename = path.basename, fs = __webpack_require__(147);
      function Option(flags, description) {
        this.flags = flags, this.required = ~flags.indexOf("<"), this.optional = ~flags.indexOf("["), 
        this.bool = !~flags.indexOf("-no-"), (flags = flags.split(/[ ,|]+/)).length > 1 && !/^[[<]/.test(flags[1]) && (this.short = flags.shift()), 
        this.long = flags.shift(), this.description = description || "";
      }
      function Command(name) {
        this.commands = [], this.options = [], this._execs = {}, this._allowUnknownOption = !1, 
        this._args = [], this._name = name || "";
      }
      function camelcase(flag) {
        return flag.split("-").reduce((function(str, word) {
          return str + word[0].toUpperCase() + word.slice(1);
        }));
      }
      function pad(str, width) {
        var len = Math.max(0, width - str.length);
        return str + Array(len + 1).join(" ");
      }
      function outputHelpIfNecessary(cmd, options) {
        options = options || [];
        for (var i = 0; i < options.length; i++) "--help" != options[i] && "-h" != options[i] || (cmd.outputHelp(), 
        process.exit(0));
      }
      function humanReadableArgName(arg) {
        var nameOutput = arg.name + (!0 === arg.variadic ? "..." : "");
        return arg.required ? "<" + nameOutput + ">" : "[" + nameOutput + "]";
      }
      function exists(file) {
        try {
          if (fs.statSync(file).isFile()) return !0;
        } catch (e) {
          return !1;
        }
      }
      (exports = module.exports = new Command).Command = Command, exports.Option = Option, 
      Option.prototype.name = function() {
        return this.long.replace("--", "").replace("no-", "");
      }, Option.prototype.is = function(arg) {
        return arg == this.short || arg == this.long;
      }, Command.prototype.__proto__ = EventEmitter.prototype, Command.prototype.command = function(name, desc, opts) {
        opts = opts || {};
        var args = name.split(/ +/), cmd = new Command(args.shift());
        return desc && (cmd.description(desc), this.executables = !0, this._execs[cmd._name] = !0, 
        opts.isDefault && (this.defaultExecutable = cmd._name)), cmd._noHelp = !!opts.noHelp, 
        this.commands.push(cmd), cmd.parseExpectedArgs(args), cmd.parent = this, desc ? this : cmd;
      }, Command.prototype.arguments = function(desc) {
        return this.parseExpectedArgs(desc.split(/ +/));
      }, Command.prototype.addImplicitHelpCommand = function() {
        this.command("help [cmd]", "display help for [cmd]");
      }, Command.prototype.parseExpectedArgs = function(args) {
        if (args.length) {
          var self = this;
          return args.forEach((function(arg) {
            var argDetails = {
              required: !1,
              name: "",
              variadic: !1
            };
            switch (arg[0]) {
             case "<":
              argDetails.required = !0, argDetails.name = arg.slice(1, -1);
              break;

             case "[":
              argDetails.name = arg.slice(1, -1);
            }
            argDetails.name.length > 3 && "..." === argDetails.name.slice(-3) && (argDetails.variadic = !0, 
            argDetails.name = argDetails.name.slice(0, -3)), argDetails.name && self._args.push(argDetails);
          })), this;
        }
      }, Command.prototype.action = function(fn) {
        var self = this, listener = function(args, unknown) {
          args = args || [], unknown = unknown || [];
          var parsed = self.parseOptions(unknown);
          outputHelpIfNecessary(self, parsed.unknown), parsed.unknown.length > 0 && self.unknownOption(parsed.unknown[0]), 
          parsed.args.length && (args = parsed.args.concat(args)), self._args.forEach((function(arg, i) {
            arg.required && null == args[i] ? self.missingArgument(arg.name) : arg.variadic && (i !== self._args.length - 1 && self.variadicArgNotLast(arg.name), 
            args[i] = args.splice(i));
          })), self._args.length ? args[self._args.length] = self : args.push(self), fn.apply(self, args);
        }, parent = this.parent || this, name = parent === this ? "*" : this._name;
        return parent.on(name, listener), this._alias && parent.on(this._alias, listener), 
        this;
      }, Command.prototype.option = function(flags, description, fn, defaultValue) {
        var self = this, option = new Option(flags, description), oname = option.name(), name = camelcase(oname);
        if ("function" != typeof fn) if (fn instanceof RegExp) {
          var regex = fn;
          fn = function(val, def) {
            var m = regex.exec(val);
            return m ? m[0] : def;
          };
        } else defaultValue = fn, fn = null;
        return (0 == option.bool || option.optional || option.required) && (0 == option.bool && (defaultValue = !0), 
        void 0 !== defaultValue && (self[name] = defaultValue)), this.options.push(option), 
        this.on(oname, (function(val) {
          null !== val && fn && (val = fn(val, void 0 === self[name] ? defaultValue : self[name])), 
          "boolean" == typeof self[name] || void 0 === self[name] ? self[name] = null == val ? !!option.bool && (defaultValue || !0) : val : null !== val && (self[name] = val);
        })), this;
      }, Command.prototype.allowUnknownOption = function(arg) {
        return this._allowUnknownOption = 0 === arguments.length || arg, this;
      }, Command.prototype.parse = function(argv) {
        this.executables && this.addImplicitHelpCommand(), this.rawArgs = argv, this._name = this._name || basename(argv[1], ".js"), 
        this.executables && argv.length < 3 && !this.defaultExecutable && argv.push("--help");
        var parsed = this.parseOptions(this.normalize(argv.slice(2))), args = this.args = parsed.args, result = this.parseArgs(this.args, parsed.unknown), name = result.args[0], aliasCommand = null;
        return name && (aliasCommand = this.commands.filter((function(command) {
          return command.alias() === name;
        }))[0]), this._execs[name] && "function" != typeof this._execs[name] ? this.executeSubCommand(argv, args, parsed.unknown) : aliasCommand ? (args[0] = aliasCommand._name, 
        this.executeSubCommand(argv, args, parsed.unknown)) : this.defaultExecutable ? (args.unshift(this.defaultExecutable), 
        this.executeSubCommand(argv, args, parsed.unknown)) : result;
      }, Command.prototype.executeSubCommand = function(argv, args, unknown) {
        (args = args.concat(unknown)).length || this.help(), "help" == args[0] && 1 == args.length && this.help(), 
        "help" == args[0] && (args[0] = args[1], args[1] = "--help");
        var baseDir, f = argv[1], bin = basename(f, ".js") + "-" + args[0], link = readlink(f);
        link !== f && "/" !== link.charAt(0) && (link = path.join(dirname(f), link)), baseDir = dirname(link);
        var proc, localBin = path.join(baseDir, bin), isExplicitJS = !1;
        exists(localBin + ".js") ? (bin = localBin + ".js", isExplicitJS = !0) : exists(localBin) && (bin = localBin), 
        args = args.slice(1), "win32" !== process.platform ? isExplicitJS ? (args.unshift(bin), 
        args = (process.execArgv || []).concat(args), proc = spawn("node", args, {
          stdio: "inherit",
          customFds: [ 0, 1, 2 ]
        })) : proc = spawn(bin, args, {
          stdio: "inherit",
          customFds: [ 0, 1, 2 ]
        }) : (args.unshift(bin), proc = spawn(process.execPath, args, {
          stdio: "inherit"
        })), proc.on("close", process.exit.bind(process)), proc.on("error", (function(err) {
          "ENOENT" == err.code ? console.error("\n  %s(1) does not exist, try --help\n", bin) : "EACCES" == err.code && console.error("\n  %s(1) not executable. try chmod or run with root\n", bin), 
          process.exit(1);
        })), this.runningCommand = proc;
      }, Command.prototype.normalize = function(args) {
        for (var arg, lastOpt, index, ret = [], i = 0, len = args.length; i < len; ++i) {
          if (arg = args[i], i > 0 && (lastOpt = this.optionFor(args[i - 1])), "--" === arg) {
            ret = ret.concat(args.slice(i));
            break;
          }
          lastOpt && lastOpt.required ? ret.push(arg) : arg.length > 1 && "-" == arg[0] && "-" != arg[1] ? arg.slice(1).split("").forEach((function(c) {
            ret.push("-" + c);
          })) : /^--/.test(arg) && ~(index = arg.indexOf("=")) ? ret.push(arg.slice(0, index), arg.slice(index + 1)) : ret.push(arg);
        }
        return ret;
      }, Command.prototype.parseArgs = function(args, unknown) {
        var name;
        return args.length ? (name = args[0], this.listeners(name).length ? this.emit(args.shift(), args, unknown) : this.emit("*", args)) : (outputHelpIfNecessary(this, unknown), 
        unknown.length > 0 && this.unknownOption(unknown[0])), this;
      }, Command.prototype.optionFor = function(arg) {
        for (var i = 0, len = this.options.length; i < len; ++i) if (this.options[i].is(arg)) return this.options[i];
      }, Command.prototype.parseOptions = function(argv) {
        for (var literal, option, arg, args = [], len = argv.length, unknownOptions = [], i = 0; i < len; ++i) if (arg = argv[i], 
        literal) args.push(arg); else if ("--" != arg) if (option = this.optionFor(arg)) if (option.required) {
          if (null == (arg = argv[++i])) return this.optionMissingArgument(option);
          this.emit(option.name(), arg);
        } else option.optional ? (null == (arg = argv[i + 1]) || "-" == arg[0] && "-" != arg ? arg = null : ++i, 
        this.emit(option.name(), arg)) : this.emit(option.name()); else arg.length > 1 && "-" == arg[0] ? (unknownOptions.push(arg), 
        argv[i + 1] && "-" != argv[i + 1][0] && unknownOptions.push(argv[++i])) : args.push(arg); else literal = !0;
        return {
          args,
          unknown: unknownOptions
        };
      }, Command.prototype.opts = function() {
        for (var result = {}, len = this.options.length, i = 0; i < len; i++) {
          var key = camelcase(this.options[i].name());
          result[key] = "version" === key ? this._version : this[key];
        }
        return result;
      }, Command.prototype.missingArgument = function(name) {
        console.error(), console.error("  error: missing required argument `%s'", name), 
        console.error(), process.exit(1);
      }, Command.prototype.optionMissingArgument = function(option, flag) {
        console.error(), flag ? console.error("  error: option `%s' argument missing, got `%s'", option.flags, flag) : console.error("  error: option `%s' argument missing", option.flags), 
        console.error(), process.exit(1);
      }, Command.prototype.unknownOption = function(flag) {
        this._allowUnknownOption || (console.error(), console.error("  error: unknown option `%s'", flag), 
        console.error(), process.exit(1));
      }, Command.prototype.variadicArgNotLast = function(name) {
        console.error(), console.error("  error: variadic arguments must be last `%s'", name), 
        console.error(), process.exit(1);
      }, Command.prototype.version = function(str, flags) {
        return 0 == arguments.length ? this._version : (this._version = str, flags = flags || "-V, --version", 
        this.option(flags, "output the version number"), this.on("version", (function() {
          process.stdout.write(str + "\n"), process.exit(0);
        })), this);
      }, Command.prototype.description = function(str) {
        return 0 === arguments.length ? this._description : (this._description = str, this);
      }, Command.prototype.alias = function(alias) {
        var command = this;
        return 0 !== this.commands.length && (command = this.commands[this.commands.length - 1]), 
        0 === arguments.length ? command._alias : (command._alias = alias, this);
      }, Command.prototype.usage = function(str) {
        var args = this._args.map((function(arg) {
          return humanReadableArgName(arg);
        })), usage = "[options]" + (this.commands.length ? " [command]" : "") + (this._args.length ? " " + args.join(" ") : "");
        return 0 == arguments.length ? this._usage || usage : (this._usage = str, this);
      }, Command.prototype.name = function() {
        return this._name;
      }, Command.prototype.largestOptionLength = function() {
        return this.options.reduce((function(max, option) {
          return Math.max(max, option.flags.length);
        }), 0);
      }, Command.prototype.optionHelp = function() {
        var width = this.largestOptionLength();
        return [ pad("-h, --help", width) + "  output usage information" ].concat(this.options.map((function(option) {
          return pad(option.flags, width) + "  " + option.description;
        }))).join("\n");
      }, Command.prototype.commandHelp = function() {
        if (!this.commands.length) return "";
        var commands = this.commands.filter((function(cmd) {
          return !cmd._noHelp;
        })).map((function(cmd) {
          var args = cmd._args.map((function(arg) {
            return humanReadableArgName(arg);
          })).join(" ");
          return [ cmd._name + (cmd._alias ? "|" + cmd._alias : "") + (cmd.options.length ? " [options]" : "") + " " + args, cmd._description ];
        })), width = commands.reduce((function(max, command) {
          return Math.max(max, command[0].length);
        }), 0);
        return [ "", "  Commands:", "", commands.map((function(cmd) {
          var desc = cmd[1] ? "  " + cmd[1] : "";
          return pad(cmd[0], width) + desc;
        })).join("\n").replace(/^/gm, "    "), "" ].join("\n");
      }, Command.prototype.helpInformation = function() {
        var desc = [];
        this._description && (desc = [ "  " + this._description, "" ]);
        var cmdName = this._name;
        this._alias && (cmdName = cmdName + "|" + this._alias);
        var usage = [ "", "  Usage: " + cmdName + " " + this.usage(), "" ], cmds = [], commandHelp = this.commandHelp();
        commandHelp && (cmds = [ commandHelp ]);
        var options = [ "  Options:", "", "" + this.optionHelp().replace(/^/gm, "    "), "", "" ];
        return usage.concat(cmds).concat(desc).concat(options).join("\n");
      }, Command.prototype.outputHelp = function(cb) {
        cb || (cb = function(passthru) {
          return passthru;
        }), process.stdout.write(cb(this.helpInformation())), this.emit("--help");
      }, Command.prototype.help = function(cb) {
        this.outputHelp(cb), process.exit();
      };
    },
    334: (__unused_webpack_module, exports, __webpack_require__) => {
      var fs = __webpack_require__(147), lstat = fs.lstatSync;
      exports.P = function(p) {
        return lstat(p).isSymbolicLink() ? fs.readlinkSync(p) : p;
      };
    },
    956: module => {
      "use strict";
      module.exports = require("./index");
    },
    81: module => {
      "use strict";
      module.exports = require("child_process");
    },
    361: module => {
      "use strict";
      module.exports = require("events");
    },
    147: module => {
      "use strict";
      module.exports = require("fs");
    },
    37: module => {
      "use strict";
      module.exports = require("os");
    },
    17: module => {
      "use strict";
      module.exports = require("path");
    },
    756: module => {
      "use strict";
      module.exports = JSON.parse('{"name":"dts-bundle","version":"0.7.3","description":"Export TypeScript .d.ts files as an external module definition"}');
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
  (() => {
    var pkg = __webpack_require__(756), program = __webpack_require__(783), dts = __webpack_require__(956), path = __webpack_require__(17), os = __webpack_require__(37);
    program.version(pkg.version).option("--configJson <value>", "path to json config file. Load it first and override options with additional parameters").option("--name <value>", "name of module likein package.json *required").option("--main <value>", "path to entry-point (see documentation) *required").option("--baseDir [value]", "base directory to be used for discovering type declarations").option("--out [value]", "path of output file. Is relative from baseDir but you can use absolute paths. ").option("--externals", 'include typings outside of the "baseDir" (i.e. like node.d.ts)').option("--referenceExternals", 'reference external modules as <reference path="..." /> tags *** Experimental, TEST NEEDED').option("--removeSource", 'delete all source typings (i.e. "<baseDir>/**/*.d.ts")').option("--newline [style]", "newline style to use in output file => unix|windows|currentOsDefault", /^(unix|windows|currentOsDefault)$/i).option("--prefix [value]", "prefix for rewriting module names").option("--verbose", "enable verbose mode, prints detailed info about all references and includes/excludes").option("--emitOnIncludedFileNotFound", 'emit although included files not found. See readme "Files not found" section. ').option("--emitOnNoIncludedFileNotFound", 'emit although no included files not found. See readme "Files not found" section. ').option("--outputAsModuleFolder", 'output as module folder format (no declare module) . See readme "Module folders" section.').option("--headerPath [value]", "path to file that contains the header").parse(process.argv), 
    console.log("%s version %s\n%s\n", pkg.name, pkg.version, pkg.description);
    var options = function(argObj) {
      var result = argObj.configJson ? JSON.parse(__webpack_require__(147).readFileSync(path.resolve(argObj.configJson), "utf8")) : {};
      if ([ "main", "name", "baseDir", "out", "prefix", "externals", "removeSource", "verbose", "referenceExternals", "emitOnIncludedFileNotFound", "emitOnNoIncludedFileNotFound", "outputAsModuleFolder", "headerPath" ].forEach((function(optName) {
        argObj.hasOwnProperty(optName) && (result[optName] = argObj[optName]);
      }), this), argObj.hasOwnProperty("newline")) switch (argObj.newline) {
       case "unix":
        result.newline = "\n";
        break;

       case "windows":
        result.newline = "\r\n";
        break;

       case "currentOsDefault":
        result.newline = os.EOL;
      }
      return result;
    }(program), result = function(options) {
      return options.name && options.main || (console.log("'name' and 'main' parameters are required. --help for get option list."), 
      process.exit(1)), dts.bundle(options);
    }(options);
    result.emitted || (console.log("Result no emitted - use verbose to see details."), 
    process.exit(1));
  })();
})();