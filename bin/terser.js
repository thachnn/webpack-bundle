#!/usr/bin/env node
(() => {
  var __webpack_modules__ = {
    420: module => {
      var toString = Object.prototype.toString, isModern = "undefined" != typeof Buffer && "function" == typeof Buffer.alloc && "function" == typeof Buffer.allocUnsafe && "function" == typeof Buffer.from;
      module.exports = function(value, encodingOrOffset, length) {
        if ("number" == typeof value) throw new TypeError('"value" argument must not be a number');
        return input = value, "ArrayBuffer" === toString.call(input).slice(8, -1) ? function(obj, byteOffset, length) {
          byteOffset >>>= 0;
          var maxLength = obj.byteLength - byteOffset;
          if (maxLength < 0) throw new RangeError("'offset' is out of bounds");
          if (void 0 === length) length = maxLength; else if ((length >>>= 0) > maxLength) throw new RangeError("'length' is out of bounds");
          return isModern ? Buffer.from(obj.slice(byteOffset, byteOffset + length)) : new Buffer(new Uint8Array(obj.slice(byteOffset, byteOffset + length)));
        }(value, encodingOrOffset, length) : "string" == typeof value ? function(string, encoding) {
          if ("string" == typeof encoding && "" !== encoding || (encoding = "utf8"), !Buffer.isEncoding(encoding)) throw new TypeError('"encoding" must be a valid string encoding');
          return isModern ? Buffer.from(string, encoding) : new Buffer(string, encoding);
        }(value, encodingOrOffset) : isModern ? Buffer.from(value) : new Buffer(value);
        var input;
      };
    },
    783: (module, exports, __webpack_require__) => {
      var EventEmitter = __webpack_require__(361).EventEmitter, spawn = __webpack_require__(81).spawn, path = __webpack_require__(17), dirname = path.dirname, basename = path.basename, fs = __webpack_require__(147);
      function Option(flags, description) {
        this.flags = flags, this.required = flags.indexOf("<") >= 0, this.optional = flags.indexOf("[") >= 0, 
        this.bool = -1 === flags.indexOf("-no-"), (flags = flags.split(/[ ,|]+/)).length > 1 && !/^[[<]/.test(flags[1]) && (this.short = flags.shift()), 
        this.long = flags.shift(), this.description = description || "";
      }
      function Command(name) {
        this.commands = [], this.options = [], this._execs = {}, this._allowUnknownOption = !1, 
        this._args = [], this._name = name || "";
      }
      function pad(str, width) {
        var len = Math.max(0, width - str.length);
        return str + Array(len + 1).join(" ");
      }
      function outputHelpIfNecessary(cmd, options) {
        options = options || [];
        for (var i = 0; i < options.length; i++) "--help" !== options[i] && "-h" !== options[i] || (cmd.outputHelp(), 
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
      __webpack_require__(837).inherits(Command, EventEmitter), (exports = module.exports = new Command).Command = Command, 
      exports.Option = Option, Option.prototype.name = function() {
        return this.long.replace("--", "").replace("no-", "");
      }, Option.prototype.attributeName = function() {
        return this.name().split("-").reduce((function(str, word) {
          return str + word[0].toUpperCase() + word.slice(1);
        }));
      }, Option.prototype.is = function(arg) {
        return this.short === arg || this.long === arg;
      }, Command.prototype.command = function(name, desc, opts) {
        "object" == typeof desc && null !== desc && (opts = desc, desc = null), opts = opts || {};
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
        return parent.on("command:" + name, listener), this._alias && parent.on("command:" + this._alias, listener), 
        this;
      }, Command.prototype.option = function(flags, description, fn, defaultValue) {
        var self = this, option = new Option(flags, description), oname = option.name(), name = option.attributeName();
        if ("function" != typeof fn) if (fn instanceof RegExp) {
          var regex = fn;
          fn = function(val, def) {
            var m = regex.exec(val);
            return m ? m[0] : def;
          };
        } else defaultValue = fn, fn = null;
        return (!option.bool || option.optional || option.required) && (option.bool || (defaultValue = !0), 
        void 0 !== defaultValue && (self[name] = defaultValue, option.defaultValue = defaultValue)), 
        this.options.push(option), this.on("option:" + oname, (function(val) {
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
        }))[0]), !0 === this._execs[name] ? this.executeSubCommand(argv, args, parsed.unknown) : aliasCommand ? (args[0] = aliasCommand._name, 
        this.executeSubCommand(argv, args, parsed.unknown)) : this.defaultExecutable ? (args.unshift(this.defaultExecutable), 
        this.executeSubCommand(argv, args, parsed.unknown)) : result;
      }, Command.prototype.executeSubCommand = function(argv, args, unknown) {
        (args = args.concat(unknown)).length || this.help(), "help" === args[0] && 1 === args.length && this.help(), 
        "help" === args[0] && (args[0] = args[1], args[1] = "--help");
        var baseDir, f = argv[1], bin = basename(f, path.extname(f)) + "-" + args[0], resolvedLink = fs.realpathSync(f);
        baseDir = dirname(resolvedLink);
        var proc, localBin = path.join(baseDir, bin), isExplicitJS = !1;
        exists(localBin + ".js") ? (bin = localBin + ".js", isExplicitJS = !0) : exists(localBin + ".ts") ? (bin = localBin + ".ts", 
        isExplicitJS = !0) : exists(localBin) && (bin = localBin), args = args.slice(1), 
        "win32" !== process.platform ? isExplicitJS ? (args.unshift(bin), args = (process.execArgv || []).concat(args), 
        proc = spawn(process.argv[0], args, {
          stdio: "inherit",
          customFds: [ 0, 1, 2 ]
        })) : proc = spawn(bin, args, {
          stdio: "inherit",
          customFds: [ 0, 1, 2 ]
        }) : (args.unshift(bin), proc = spawn(process.execPath, args, {
          stdio: "inherit"
        }));
        [ "SIGUSR1", "SIGUSR2", "SIGTERM", "SIGINT", "SIGHUP" ].forEach((function(signal) {
          process.on(signal, (function() {
            !1 === proc.killed && null === proc.exitCode && proc.kill(signal);
          }));
        })), proc.on("close", process.exit.bind(process)), proc.on("error", (function(err) {
          "ENOENT" === err.code ? console.error("error: %s(1) does not exist, try --help", bin) : "EACCES" === err.code && console.error("error: %s(1) not executable. try chmod or run with root", bin), 
          process.exit(1);
        })), this.runningCommand = proc;
      }, Command.prototype.normalize = function(args) {
        for (var arg, lastOpt, index, ret = [], i = 0, len = args.length; i < len; ++i) {
          if (arg = args[i], i > 0 && (lastOpt = this.optionFor(args[i - 1])), "--" === arg) {
            ret = ret.concat(args.slice(i));
            break;
          }
          lastOpt && lastOpt.required ? ret.push(arg) : arg.length > 1 && "-" === arg[0] && "-" !== arg[1] ? arg.slice(1).split("").forEach((function(c) {
            ret.push("-" + c);
          })) : /^--/.test(arg) && ~(index = arg.indexOf("=")) ? ret.push(arg.slice(0, index), arg.slice(index + 1)) : ret.push(arg);
        }
        return ret;
      }, Command.prototype.parseArgs = function(args, unknown) {
        var name;
        return args.length ? (name = args[0], this.listeners("command:" + name).length ? this.emit("command:" + args.shift(), args, unknown) : this.emit("command:*", args)) : (outputHelpIfNecessary(this, unknown), 
        unknown.length > 0 && this.unknownOption(unknown[0]), 0 === this.commands.length && 0 === this._args.filter((function(a) {
          return a.required;
        })).length && this.emit("command:*")), this;
      }, Command.prototype.optionFor = function(arg) {
        for (var i = 0, len = this.options.length; i < len; ++i) if (this.options[i].is(arg)) return this.options[i];
      }, Command.prototype.parseOptions = function(argv) {
        for (var literal, option, arg, args = [], len = argv.length, unknownOptions = [], i = 0; i < len; ++i) if (arg = argv[i], 
        literal) args.push(arg); else if ("--" !== arg) if (option = this.optionFor(arg)) if (option.required) {
          if (null == (arg = argv[++i])) return this.optionMissingArgument(option);
          this.emit("option:" + option.name(), arg);
        } else option.optional ? (null == (arg = argv[i + 1]) || "-" === arg[0] && "-" !== arg ? arg = null : ++i, 
        this.emit("option:" + option.name(), arg)) : this.emit("option:" + option.name()); else arg.length > 1 && "-" === arg[0] ? (unknownOptions.push(arg), 
        i + 1 < argv.length && "-" !== argv[i + 1][0] && unknownOptions.push(argv[++i])) : args.push(arg); else literal = !0;
        return {
          args,
          unknown: unknownOptions
        };
      }, Command.prototype.opts = function() {
        for (var result = {}, len = this.options.length, i = 0; i < len; i++) {
          var key = this.options[i].attributeName();
          result[key] = key === this._versionOptionName ? this._version : this[key];
        }
        return result;
      }, Command.prototype.missingArgument = function(name) {
        console.error("error: missing required argument `%s'", name), process.exit(1);
      }, Command.prototype.optionMissingArgument = function(option, flag) {
        flag ? console.error("error: option `%s' argument missing, got `%s'", option.flags, flag) : console.error("error: option `%s' argument missing", option.flags), 
        process.exit(1);
      }, Command.prototype.unknownOption = function(flag) {
        this._allowUnknownOption || (console.error("error: unknown option `%s'", flag), 
        process.exit(1));
      }, Command.prototype.variadicArgNotLast = function(name) {
        console.error("error: variadic arguments must be last `%s'", name), process.exit(1);
      }, Command.prototype.version = function(str, flags) {
        if (0 === arguments.length) return this._version;
        this._version = str;
        var versionOption = new Option(flags = flags || "-V, --version", "output the version number");
        return this._versionOptionName = versionOption.long.substr(2) || "version", this.options.push(versionOption), 
        this.on("option:" + this._versionOptionName, (function() {
          process.stdout.write(str + "\n"), process.exit(0);
        })), this;
      }, Command.prototype.description = function(str, argsDescription) {
        return 0 === arguments.length ? this._description : (this._description = str, this._argsDescription = argsDescription, 
        this);
      }, Command.prototype.alias = function(alias) {
        var command = this;
        if (0 !== this.commands.length && (command = this.commands[this.commands.length - 1]), 
        0 === arguments.length) return command._alias;
        if (alias === command._name) throw new Error("Command alias can't be the same as its name");
        return command._alias = alias, this;
      }, Command.prototype.usage = function(str) {
        var args = this._args.map((function(arg) {
          return humanReadableArgName(arg);
        })), usage = "[options]" + (this.commands.length ? " [command]" : "") + (this._args.length ? " " + args.join(" ") : "");
        return 0 === arguments.length ? this._usage || usage : (this._usage = str, this);
      }, Command.prototype.name = function(str) {
        return 0 === arguments.length ? this._name : (this._name = str, this);
      }, Command.prototype.prepareCommands = function() {
        return this.commands.filter((function(cmd) {
          return !cmd._noHelp;
        })).map((function(cmd) {
          var args = cmd._args.map((function(arg) {
            return humanReadableArgName(arg);
          })).join(" ");
          return [ cmd._name + (cmd._alias ? "|" + cmd._alias : "") + (cmd.options.length ? " [options]" : "") + (args ? " " + args : ""), cmd._description ];
        }));
      }, Command.prototype.largestCommandLength = function() {
        return this.prepareCommands().reduce((function(max, command) {
          return Math.max(max, command[0].length);
        }), 0);
      }, Command.prototype.largestOptionLength = function() {
        var options = [].slice.call(this.options);
        return options.push({
          flags: "-h, --help"
        }), options.reduce((function(max, option) {
          return Math.max(max, option.flags.length);
        }), 0);
      }, Command.prototype.largestArgLength = function() {
        return this._args.reduce((function(max, arg) {
          return Math.max(max, arg.name.length);
        }), 0);
      }, Command.prototype.padWidth = function() {
        var width = this.largestOptionLength();
        return this._argsDescription && this._args.length && this.largestArgLength() > width && (width = this.largestArgLength()), 
        this.commands && this.commands.length && this.largestCommandLength() > width && (width = this.largestCommandLength()), 
        width;
      }, Command.prototype.optionHelp = function() {
        var width = this.padWidth();
        return this.options.map((function(option) {
          return pad(option.flags, width) + "  " + option.description + (option.bool && void 0 !== option.defaultValue ? " (default: " + JSON.stringify(option.defaultValue) + ")" : "");
        })).concat([ pad("-h, --help", width) + "  output usage information" ]).join("\n");
      }, Command.prototype.commandHelp = function() {
        if (!this.commands.length) return "";
        var commands = this.prepareCommands(), width = this.padWidth();
        return [ "Commands:", commands.map((function(cmd) {
          var desc = cmd[1] ? "  " + cmd[1] : "";
          return (desc ? pad(cmd[0], width) : cmd[0]) + desc;
        })).join("\n").replace(/^/gm, "  "), "" ].join("\n");
      }, Command.prototype.helpInformation = function() {
        var desc = [];
        if (this._description) {
          desc = [ this._description, "" ];
          var argsDescription = this._argsDescription;
          if (argsDescription && this._args.length) {
            var width = this.padWidth();
            desc.push("Arguments:"), desc.push(""), this._args.forEach((function(arg) {
              desc.push("  " + pad(arg.name, width) + "  " + argsDescription[arg.name]);
            })), desc.push("");
          }
        }
        var cmdName = this._name;
        this._alias && (cmdName = cmdName + "|" + this._alias);
        var usage = [ "Usage: " + cmdName + " " + this.usage(), "" ], cmds = [], commandHelp = this.commandHelp();
        commandHelp && (cmds = [ commandHelp ]);
        var options = [ "Options:", "" + this.optionHelp().replace(/^/gm, "  "), "" ];
        return usage.concat(desc).concat(options).concat(cmds).join("\n");
      }, Command.prototype.outputHelp = function(cb) {
        cb || (cb = function(passthru) {
          return passthru;
        }), process.stdout.write(cb(this.helpInformation())), this.emit("--help");
      }, Command.prototype.help = function(cb) {
        this.outputHelp(cb), process.exit();
      };
    },
    213: (__unused_webpack_module, exports, __webpack_require__) => {
      var util = __webpack_require__(728), has = Object.prototype.hasOwnProperty, hasNativeMap = "undefined" != typeof Map;
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
      }, exports.I = ArraySet;
    },
    400: (__unused_webpack_module, exports, __webpack_require__) => {
      var base64 = __webpack_require__(923);
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
    },
    923: (__unused_webpack_module, exports) => {
      var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
      exports.encode = function(number) {
        if (0 <= number && number < intToCharMap.length) return intToCharMap[number];
        throw new TypeError("Must be between 0 and 63: " + number);
      }, exports.decode = function(charCode) {
        return 65 <= charCode && charCode <= 90 ? charCode - 65 : 97 <= charCode && charCode <= 122 ? charCode - 97 + 26 : 48 <= charCode && charCode <= 57 ? charCode - 48 + 52 : 43 == charCode ? 62 : 47 == charCode ? 63 : -1;
      };
    },
    216: (__unused_webpack_module, exports) => {
      function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
        var mid = Math.floor((aHigh - aLow) / 2) + aLow, cmp = aCompare(aNeedle, aHaystack[mid], !0);
        return 0 === cmp ? mid : cmp > 0 ? aHigh - mid > 1 ? recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias) : aBias == exports.LEAST_UPPER_BOUND ? aHigh < aHaystack.length ? aHigh : -1 : mid : mid - aLow > 1 ? recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias) : aBias == exports.LEAST_UPPER_BOUND ? mid : aLow < 0 ? -1 : aLow;
      }
      exports.GREATEST_LOWER_BOUND = 1, exports.LEAST_UPPER_BOUND = 2, exports.search = function(aNeedle, aHaystack, aCompare, aBias) {
        if (0 === aHaystack.length) return -1;
        var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare, aBias || exports.GREATEST_LOWER_BOUND);
        if (index < 0) return -1;
        for (;index - 1 >= 0 && 0 === aCompare(aHaystack[index], aHaystack[index - 1], !0); ) --index;
        return index;
      };
    },
    826: (__unused_webpack_module, exports) => {
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
      exports.U = function(ary, comparator) {
        doQuickSort(ary, comparator, 0, ary.length - 1);
      };
    },
    771: (__unused_webpack_module, exports, __webpack_require__) => {
      var util = __webpack_require__(728), binarySearch = __webpack_require__(216), ArraySet = __webpack_require__(213).I, base64VLQ = __webpack_require__(400), quickSort = __webpack_require__(826).U;
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
      }, exports.gi = SourceMapConsumer, BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype), 
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
              source,
              line: util.getArg(mapping, "originalLine", null),
              column: util.getArg(mapping, "originalColumn", null),
              name
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
          source,
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
      }, IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype), 
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
            source,
            generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
            generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0),
            originalLine: mapping.originalLine,
            originalColumn: mapping.originalColumn,
            name
          };
          this.__generatedMappings.push(adjustedMapping), "number" == typeof adjustedMapping.originalLine && this.__originalMappings.push(adjustedMapping);
        }
        quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated), quickSort(this.__originalMappings, util.compareByOriginalPositions);
      };
    },
    728: (__unused_webpack_module, exports) => {
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
    },
    763: (module, exports, __webpack_require__) => {
      module = __webpack_require__.nmd(module);
      var fs, SourceMapConsumer = __webpack_require__(771).gi, path = __webpack_require__(17);
      try {
        (fs = __webpack_require__(147)).existsSync && fs.readFileSync || (fs = null);
      } catch (err) {}
      var bufferFrom = __webpack_require__(420);
      function dynamicRequire(mod, request) {
        return mod.require(request);
      }
      var errorFormatterInstalled = !1, uncaughtShimInstalled = !1, emptyCacheBetweenOperations = !1, environment = "auto", fileContentsCache = {}, sourceMapCache = {}, reSourceMap = /^data:application\/json[^,]+base64,/, retrieveFileHandlers = [], retrieveMapHandlers = [];
      function isInBrowser() {
        return "browser" === environment || "node" !== environment && ("undefined" != typeof window && "function" == typeof XMLHttpRequest && !(window.require && window.module && window.process && "renderer" === window.process.type));
      }
      function handlerExec(list) {
        return function(arg) {
          for (var i = 0; i < list.length; i++) {
            var ret = list[i](arg);
            if (ret) return ret;
          }
          return null;
        };
      }
      var retrieveFile = handlerExec(retrieveFileHandlers);
      function supportRelativeURL(file, url) {
        if (!file) return url;
        var dir = path.dirname(file), match = /^\w+:\/\/[^\/]*/.exec(dir), protocol = match ? match[0] : "", startPath = dir.slice(protocol.length);
        return protocol && /^\/\w\:/.test(startPath) ? (protocol += "/") + path.resolve(dir.slice(protocol.length), url).replace(/\\/g, "/") : protocol + path.resolve(dir.slice(protocol.length), url);
      }
      retrieveFileHandlers.push((function(path) {
        if (path = path.trim(), /^file:/.test(path) && (path = path.replace(/file:\/\/\/(\w:)?/, (function(protocol, drive) {
          return drive ? "" : "/";
        }))), path in fileContentsCache) return fileContentsCache[path];
        var contents = "";
        try {
          if (fs) fs.existsSync(path) && (contents = fs.readFileSync(path, "utf8")); else {
            var xhr = new XMLHttpRequest;
            xhr.open("GET", path, !1), xhr.send(null), 4 === xhr.readyState && 200 === xhr.status && (contents = xhr.responseText);
          }
        } catch (er) {}
        return fileContentsCache[path] = contents;
      }));
      var retrieveSourceMap = handlerExec(retrieveMapHandlers);
      function mapSourcePosition(position) {
        var sourceMap = sourceMapCache[position.source];
        if (!sourceMap) {
          var urlAndMap = retrieveSourceMap(position.source);
          urlAndMap ? (sourceMap = sourceMapCache[position.source] = {
            url: urlAndMap.url,
            map: new SourceMapConsumer(urlAndMap.map)
          }).map.sourcesContent && sourceMap.map.sources.forEach((function(source, i) {
            var contents = sourceMap.map.sourcesContent[i];
            if (contents) {
              var url = supportRelativeURL(sourceMap.url, source);
              fileContentsCache[url] = contents;
            }
          })) : sourceMap = sourceMapCache[position.source] = {
            url: null,
            map: null
          };
        }
        if (sourceMap && sourceMap.map && "function" == typeof sourceMap.map.originalPositionFor) {
          var originalPosition = sourceMap.map.originalPositionFor(position);
          if (null !== originalPosition.source) return originalPosition.source = supportRelativeURL(sourceMap.url, originalPosition.source), 
          originalPosition;
        }
        return position;
      }
      function mapEvalOrigin(origin) {
        var match = /^eval at ([^(]+) \((.+):(\d+):(\d+)\)$/.exec(origin);
        if (match) {
          var position = mapSourcePosition({
            source: match[2],
            line: +match[3],
            column: match[4] - 1
          });
          return "eval at " + match[1] + " (" + position.source + ":" + position.line + ":" + (position.column + 1) + ")";
        }
        return (match = /^eval at ([^(]+) \((.+)\)$/.exec(origin)) ? "eval at " + match[1] + " (" + mapEvalOrigin(match[2]) + ")" : origin;
      }
      function CallSiteToString() {
        var fileName, fileLocation = "";
        if (this.isNative()) fileLocation = "native"; else {
          !(fileName = this.getScriptNameOrSourceURL()) && this.isEval() && (fileLocation = this.getEvalOrigin(), 
          fileLocation += ", "), fileLocation += fileName || "<anonymous>";
          var lineNumber = this.getLineNumber();
          if (null != lineNumber) {
            fileLocation += ":" + lineNumber;
            var columnNumber = this.getColumnNumber();
            columnNumber && (fileLocation += ":" + columnNumber);
          }
        }
        var line = "", functionName = this.getFunctionName(), addSuffix = !0, isConstructor = this.isConstructor();
        if (!(this.isToplevel() || isConstructor)) {
          var typeName = this.getTypeName();
          "[object Object]" === typeName && (typeName = "null");
          var methodName = this.getMethodName();
          functionName ? (typeName && 0 != functionName.indexOf(typeName) && (line += typeName + "."), 
          line += functionName, methodName && functionName.indexOf("." + methodName) != functionName.length - methodName.length - 1 && (line += " [as " + methodName + "]")) : line += typeName + "." + (methodName || "<anonymous>");
        } else isConstructor ? line += "new " + (functionName || "<anonymous>") : functionName ? line += functionName : (line += fileLocation, 
        addSuffix = !1);
        return addSuffix && (line += " (" + fileLocation + ")"), line;
      }
      function cloneCallSite(frame) {
        var object = {};
        return Object.getOwnPropertyNames(Object.getPrototypeOf(frame)).forEach((function(name) {
          object[name] = /^(?:is|get)/.test(name) ? function() {
            return frame[name].call(frame);
          } : frame[name];
        })), object.toString = CallSiteToString, object;
      }
      function wrapCallSite(frame, state) {
        if (void 0 === state && (state = {
          nextPosition: null,
          curPosition: null
        }), frame.isNative()) return state.curPosition = null, frame;
        var source = frame.getFileName() || frame.getScriptNameOrSourceURL();
        if (source) {
          var line = frame.getLineNumber(), column = frame.getColumnNumber() - 1, headerLength = /^v(10\.1[6-9]|10\.[2-9][0-9]|10\.[0-9]{3,}|1[2-9]\d*|[2-9]\d|\d{3,}|11\.11)/.test("object" == typeof process && null !== process ? process.version : "") ? 0 : 62;
          1 === line && column > headerLength && !isInBrowser() && !frame.isEval() && (column -= headerLength);
          var position = mapSourcePosition({
            source,
            line,
            column
          });
          state.curPosition = position;
          var originalFunctionName = (frame = cloneCallSite(frame)).getFunctionName;
          return frame.getFunctionName = function() {
            return null == state.nextPosition ? originalFunctionName() : state.nextPosition.name || originalFunctionName();
          }, frame.getFileName = function() {
            return position.source;
          }, frame.getLineNumber = function() {
            return position.line;
          }, frame.getColumnNumber = function() {
            return position.column + 1;
          }, frame.getScriptNameOrSourceURL = function() {
            return position.source;
          }, frame;
        }
        var origin = frame.isEval() && frame.getEvalOrigin();
        return origin ? (origin = mapEvalOrigin(origin), (frame = cloneCallSite(frame)).getEvalOrigin = function() {
          return origin;
        }, frame) : frame;
      }
      function prepareStackTrace(error, stack) {
        emptyCacheBetweenOperations && (fileContentsCache = {}, sourceMapCache = {});
        for (var errorString = (error.name || "Error") + ": " + (error.message || ""), state = {
          nextPosition: null,
          curPosition: null
        }, processedStack = [], i = stack.length - 1; i >= 0; i--) processedStack.push("\n    at " + wrapCallSite(stack[i], state)), 
        state.nextPosition = state.curPosition;
        return state.curPosition = state.nextPosition = null, errorString + processedStack.reverse().join("");
      }
      function getErrorSource(error) {
        var match = /\n    at [^(]+ \((.*):(\d+):(\d+)\)/.exec(error.stack);
        if (match) {
          var source = match[1], line = +match[2], column = +match[3], contents = fileContentsCache[source];
          if (!contents && fs && fs.existsSync(source)) try {
            contents = fs.readFileSync(source, "utf8");
          } catch (er) {
            contents = "";
          }
          if (contents) {
            var code = contents.split(/(?:\r\n|\r|\n)/)[line - 1];
            if (code) return source + ":" + line + "\n" + code + "\n" + new Array(column).join(" ") + "^";
          }
        }
        return null;
      }
      function printErrorAndExit(error) {
        var source = getErrorSource(error), stderr = function() {
          if ("object" == typeof process && null !== process) return process.stderr;
        }();
        stderr && stderr._handle && stderr._handle.setBlocking && stderr._handle.setBlocking(!0), 
        source && (console.error(), console.error(source)), console.error(error.stack), 
        function(code) {
          if ("object" == typeof process && null !== process && "function" == typeof process.exit) process.exit(code);
        }(1);
      }
      retrieveMapHandlers.push((function(source) {
        var sourceMapData, sourceMappingURL = function(source) {
          var fileData;
          if (isInBrowser()) try {
            var xhr = new XMLHttpRequest;
            xhr.open("GET", source, !1), xhr.send(null), fileData = 4 === xhr.readyState ? xhr.responseText : null;
            var sourceMapHeader = xhr.getResponseHeader("SourceMap") || xhr.getResponseHeader("X-SourceMap");
            if (sourceMapHeader) return sourceMapHeader;
          } catch (e) {}
          fileData = retrieveFile(source);
          for (var lastMatch, match, re = /(?:\/\/[@#][\s]*sourceMappingURL=([^\s'"]+)[\s]*$)|(?:\/\*[@#][\s]*sourceMappingURL=([^\s*'"]+)[\s]*(?:\*\/)[\s]*$)/gm; match = re.exec(fileData); ) lastMatch = match;
          return lastMatch ? lastMatch[1] : null;
        }(source);
        if (!sourceMappingURL) return null;
        if (reSourceMap.test(sourceMappingURL)) {
          var rawData = sourceMappingURL.slice(sourceMappingURL.indexOf(",") + 1);
          sourceMapData = bufferFrom(rawData, "base64").toString(), sourceMappingURL = source;
        } else sourceMappingURL = supportRelativeURL(source, sourceMappingURL), sourceMapData = retrieveFile(sourceMappingURL);
        return sourceMapData ? {
          url: sourceMappingURL,
          map: sourceMapData
        } : null;
      }));
      var originalRetrieveFileHandlers = retrieveFileHandlers.slice(0), originalRetrieveMapHandlers = retrieveMapHandlers.slice(0);
      exports.wrapCallSite = wrapCallSite, exports.getErrorSource = getErrorSource, exports.mapSourcePosition = mapSourcePosition, 
      exports.retrieveSourceMap = retrieveSourceMap, exports.install = function(options) {
        if ((options = options || {}).environment && (environment = options.environment, 
        -1 === [ "node", "browser", "auto" ].indexOf(environment))) throw new Error("environment " + environment + " was unknown. Available options are {auto, browser, node}");
        if (options.retrieveFile && (options.overrideRetrieveFile && (retrieveFileHandlers.length = 0), 
        retrieveFileHandlers.unshift(options.retrieveFile)), options.retrieveSourceMap && (options.overrideRetrieveSourceMap && (retrieveMapHandlers.length = 0), 
        retrieveMapHandlers.unshift(options.retrieveSourceMap)), options.hookRequire && !isInBrowser()) {
          var Module = dynamicRequire(module, "module"), $compile = Module.prototype._compile;
          $compile.__sourceMapSupport || (Module.prototype._compile = function(content, filename) {
            return fileContentsCache[filename] = content, sourceMapCache[filename] = void 0, 
            $compile.call(this, content, filename);
          }, Module.prototype._compile.__sourceMapSupport = !0);
        }
        if (emptyCacheBetweenOperations || (emptyCacheBetweenOperations = "emptyCacheBetweenOperations" in options && options.emptyCacheBetweenOperations), 
        errorFormatterInstalled || (errorFormatterInstalled = !0, Error.prepareStackTrace = prepareStackTrace), 
        !uncaughtShimInstalled) {
          var installHandler = !("handleUncaughtExceptions" in options) || options.handleUncaughtExceptions;
          try {
            !1 === dynamicRequire(module, "worker_threads").isMainThread && (installHandler = !1);
          } catch (e) {}
          installHandler && "object" == typeof process && null !== process && "function" == typeof process.on && (uncaughtShimInstalled = !0, 
          origEmit = process.emit, process.emit = function(type) {
            if ("uncaughtException" === type) {
              var hasStack = arguments[1] && arguments[1].stack, hasListeners = this.listeners(type).length > 0;
              if (hasStack && !hasListeners) return printErrorAndExit(arguments[1]);
            }
            return origEmit.apply(this, arguments);
          });
        }
        var origEmit;
      }, exports.resetRetrieveHandlers = function() {
        retrieveFileHandlers.length = 0, retrieveMapHandlers.length = 0, retrieveFileHandlers = originalRetrieveFileHandlers.slice(0), 
        retrieveMapHandlers = originalRetrieveMapHandlers.slice(0), retrieveSourceMap = handlerExec(retrieveMapHandlers), 
        retrieveFile = handlerExec(retrieveFileHandlers);
      };
    },
    773: module => {
      "use strict";
      module.exports = require("../vendor/terser");
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
    17: module => {
      "use strict";
      module.exports = require("path");
    },
    837: module => {
      "use strict";
      module.exports = require("util");
    },
    432: () => {
      [ process.stdout, process.stderr ].forEach((s => {
        s && s.isTTY && s._handle && s._handle.setBlocking && s._handle.setBlocking(!0);
      }));
    },
    389: module => {
      "use strict";
      module.exports = JSON.parse('{"name":"terser","description":"JavaScript parser, mangler/compressor and beautifier toolkit for ES6+","homepage":"https://terser.org","author":"Mihai Bazon <mihai.bazon@gmail.com> (http://lisperator.net/)","license":"BSD-2-Clause","version":"5.12.1"}');
    }
  }, __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (void 0 !== cachedModule) return cachedModule.exports;
    var module = __webpack_module_cache__[moduleId] = {
      id: moduleId,
      loaded: !1,
      exports: {}
    };
    return __webpack_modules__[moduleId](module, module.exports, __webpack_require__), 
    module.loaded = !0, module.exports;
  }
  __webpack_require__.nmd = module => (module.paths = [], module.children || (module.children = []), 
  module), (() => {
    "use strict";
    __webpack_require__(432);
    try {
      __webpack_require__(763).install();
    } catch (err) {}
    const fs = __webpack_require__(147), path = __webpack_require__(17), program = __webpack_require__(783), packageJson = __webpack_require__(389), {_run_cli: run_cli} = __webpack_require__(773);
    run_cli({
      program,
      packageJson,
      fs,
      path
    }).catch((error => {
      console.error(error), process.exitCode = 1;
    }));
  })();
})();