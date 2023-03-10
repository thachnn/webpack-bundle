const EventEmitter = require("events").EventEmitter, childProcess = require("child_process"), path = require("path"), fs = require("fs");

class Help {
  constructor() {
    this.helpWidth = void 0, this.sortSubcommands = !1, this.sortOptions = !1;
  }
  visibleCommands(cmd) {
    const visibleCommands = cmd.commands.filter((cmd => !cmd._hidden));
    if (cmd._hasImplicitHelpCommand()) {
      const args = cmd._helpCommandnameAndArgs.split(/ +/), helpCommand = cmd.createCommand(args.shift()).helpOption(!1);
      helpCommand.description(cmd._helpCommandDescription), helpCommand._parseExpectedArgs(args), 
      visibleCommands.push(helpCommand);
    }
    return this.sortSubcommands && visibleCommands.sort(((a, b) => a.name().localeCompare(b.name()))), 
    visibleCommands;
  }
  visibleOptions(cmd) {
    const visibleOptions = cmd.options.filter((option => !option.hidden)), showShortHelpFlag = cmd._hasHelpOption && cmd._helpShortFlag && !cmd._findOption(cmd._helpShortFlag), showLongHelpFlag = cmd._hasHelpOption && !cmd._findOption(cmd._helpLongFlag);
    if (showShortHelpFlag || showLongHelpFlag) {
      let helpOption;
      helpOption = showShortHelpFlag ? showLongHelpFlag ? cmd.createOption(cmd._helpFlags, cmd._helpDescription) : cmd.createOption(cmd._helpShortFlag, cmd._helpDescription) : cmd.createOption(cmd._helpLongFlag, cmd._helpDescription), 
      visibleOptions.push(helpOption);
    }
    if (this.sortOptions) {
      const getSortKey = option => option.short ? option.short.replace(/^-/, "") : option.long.replace(/^--/, "");
      visibleOptions.sort(((a, b) => getSortKey(a).localeCompare(getSortKey(b))));
    }
    return visibleOptions;
  }
  visibleArguments(cmd) {
    return cmd._argsDescription && cmd._args.length ? cmd._args.map((argument => ({
      term: argument.name,
      description: cmd._argsDescription[argument.name] || ""
    })), 0) : [];
  }
  subcommandTerm(cmd) {
    const args = cmd._args.map((arg => humanReadableArgName(arg))).join(" ");
    return cmd._name + (cmd._aliases[0] ? "|" + cmd._aliases[0] : "") + (cmd.options.length ? " [options]" : "") + (args ? " " + args : "");
  }
  optionTerm(option) {
    return option.flags;
  }
  longestSubcommandTermLength(cmd, helper) {
    return helper.visibleCommands(cmd).reduce(((max, command) => Math.max(max, helper.subcommandTerm(command).length)), 0);
  }
  longestOptionTermLength(cmd, helper) {
    return helper.visibleOptions(cmd).reduce(((max, option) => Math.max(max, helper.optionTerm(option).length)), 0);
  }
  longestArgumentTermLength(cmd, helper) {
    return helper.visibleArguments(cmd).reduce(((max, argument) => Math.max(max, argument.term.length)), 0);
  }
  commandUsage(cmd) {
    let cmdName = cmd._name;
    cmd._aliases[0] && (cmdName = cmdName + "|" + cmd._aliases[0]);
    let parentCmdNames = "";
    for (let parentCmd = cmd.parent; parentCmd; parentCmd = parentCmd.parent) parentCmdNames = parentCmd.name() + " " + parentCmdNames;
    return parentCmdNames + cmdName + " " + cmd.usage();
  }
  commandDescription(cmd) {
    return cmd.description();
  }
  subcommandDescription(cmd) {
    return cmd.description();
  }
  optionDescription(option) {
    if (option.negate) return option.description;
    const extraInfo = [];
    return option.argChoices && extraInfo.push(`choices: ${option.argChoices.map((choice => JSON.stringify(choice))).join(", ")}`), 
    void 0 !== option.defaultValue && extraInfo.push(`default: ${option.defaultValueDescription || JSON.stringify(option.defaultValue)}`), 
    extraInfo.length > 0 ? `${option.description} (${extraInfo.join(", ")})` : option.description;
  }
  formatHelp(cmd, helper) {
    const termWidth = helper.padWidth(cmd, helper), helpWidth = helper.helpWidth || 80;
    function formatItem(term, description) {
      if (description) {
        const fullText = `${term.padEnd(termWidth + 2)}${description}`;
        return helper.wrap(fullText, helpWidth - 2, termWidth + 2);
      }
      return term;
    }
    function formatList(textArray) {
      return textArray.join("\n").replace(/^/gm, " ".repeat(2));
    }
    let output = [ `Usage: ${helper.commandUsage(cmd)}`, "" ];
    const commandDescription = helper.commandDescription(cmd);
    commandDescription.length > 0 && (output = output.concat([ commandDescription, "" ]));
    const argumentList = helper.visibleArguments(cmd).map((argument => formatItem(argument.term, argument.description)));
    argumentList.length > 0 && (output = output.concat([ "Arguments:", formatList(argumentList), "" ]));
    const optionList = helper.visibleOptions(cmd).map((option => formatItem(helper.optionTerm(option), helper.optionDescription(option))));
    optionList.length > 0 && (output = output.concat([ "Options:", formatList(optionList), "" ]));
    const commandList = helper.visibleCommands(cmd).map((cmd => formatItem(helper.subcommandTerm(cmd), helper.subcommandDescription(cmd))));
    return commandList.length > 0 && (output = output.concat([ "Commands:", formatList(commandList), "" ])), 
    output.join("\n");
  }
  padWidth(cmd, helper) {
    return Math.max(helper.longestOptionTermLength(cmd, helper), helper.longestSubcommandTermLength(cmd, helper), helper.longestArgumentTermLength(cmd, helper));
  }
  wrap(str, width, indent, minColumnWidth = 40) {
    if (str.match(/[\n]\s+/)) return str;
    const columnWidth = width - indent;
    if (columnWidth < minColumnWidth) return str;
    const leadingStr = str.substr(0, indent), columnText = str.substr(indent), indentString = " ".repeat(indent), regex = new RegExp(".{1," + (columnWidth - 1) + "}([\\s​]|$)|[^\\s​]+?([\\s​]|$)", "g");
    return leadingStr + (columnText.match(regex) || []).map(((line, i) => ("\n" === line.slice(-1) && (line = line.slice(0, line.length - 1)), 
    (i > 0 ? indentString : "") + line.trimRight()))).join("\n");
  }
}

class Option {
  constructor(flags, description) {
    this.flags = flags, this.description = description || "", this.required = flags.includes("<"), 
    this.optional = flags.includes("["), this.variadic = /\w\.\.\.[>\]]$/.test(flags), 
    this.mandatory = !1;
    const optionFlags = _parseOptionFlags(flags);
    this.short = optionFlags.shortFlag, this.long = optionFlags.longFlag, this.negate = !1, 
    this.long && (this.negate = this.long.startsWith("--no-")), this.defaultValue = void 0, 
    this.defaultValueDescription = void 0, this.parseArg = void 0, this.hidden = !1, 
    this.argChoices = void 0;
  }
  default(value, description) {
    return this.defaultValue = value, this.defaultValueDescription = description, this;
  }
  argParser(fn) {
    return this.parseArg = fn, this;
  }
  makeOptionMandatory(mandatory = !0) {
    return this.mandatory = !!mandatory, this;
  }
  hideHelp(hide = !0) {
    return this.hidden = !!hide, this;
  }
  _concatValue(value, previous) {
    return previous !== this.defaultValue && Array.isArray(previous) ? previous.concat(value) : [ value ];
  }
  choices(values) {
    return this.argChoices = values, this.parseArg = (arg, previous) => {
      if (!values.includes(arg)) throw new InvalidOptionArgumentError(`Allowed choices are ${values.join(", ")}.`);
      return this.variadic ? this._concatValue(arg, previous) : arg;
    }, this;
  }
  name() {
    return this.long ? this.long.replace(/^--/, "") : this.short.replace(/^-/, "");
  }
  attributeName() {
    return camelcase(this.name().replace(/^no-/, ""));
  }
  is(arg) {
    return this.short === arg || this.long === arg;
  }
}

class CommanderError extends Error {
  constructor(exitCode, code, message) {
    super(message), Error.captureStackTrace(this, this.constructor), this.name = this.constructor.name, 
    this.code = code, this.exitCode = exitCode, this.nestedError = void 0;
  }
}

class InvalidOptionArgumentError extends CommanderError {
  constructor(message) {
    super(1, "commander.invalidOptionArgument", message), Error.captureStackTrace(this, this.constructor), 
    this.name = this.constructor.name;
  }
}

class Command extends EventEmitter {
  constructor(name) {
    super(), this.commands = [], this.options = [], this.parent = null, this._allowUnknownOption = !1, 
    this._allowExcessArguments = !0, this._args = [], this.rawArgs = null, this._scriptPath = null, 
    this._name = name || "", this._optionValues = {}, this._storeOptionsAsProperties = !1, 
    this._actionResults = [], this._actionHandler = null, this._executableHandler = !1, 
    this._executableFile = null, this._defaultCommandName = null, this._exitCallback = null, 
    this._aliases = [], this._combineFlagAndOptionalValue = !0, this._description = "", 
    this._argsDescription = void 0, this._enablePositionalOptions = !1, this._passThroughOptions = !1, 
    this._outputConfiguration = {
      writeOut: str => process.stdout.write(str),
      writeErr: str => process.stderr.write(str),
      getOutHelpWidth: () => process.stdout.isTTY ? process.stdout.columns : void 0,
      getErrHelpWidth: () => process.stderr.isTTY ? process.stderr.columns : void 0,
      outputError: (str, write) => write(str)
    }, this._hidden = !1, this._hasHelpOption = !0, this._helpFlags = "-h, --help", 
    this._helpDescription = "display help for command", this._helpShortFlag = "-h", 
    this._helpLongFlag = "--help", this._addImplicitHelpCommand = void 0, this._helpCommandName = "help", 
    this._helpCommandnameAndArgs = "help [command]", this._helpCommandDescription = "display help for command", 
    this._helpConfiguration = {};
  }
  command(nameAndArgs, actionOptsOrExecDesc, execOpts) {
    let desc = actionOptsOrExecDesc, opts = execOpts;
    "object" == typeof desc && null !== desc && (opts = desc, desc = null), opts = opts || {};
    const args = nameAndArgs.split(/ +/), cmd = this.createCommand(args.shift());
    return desc && (cmd.description(desc), cmd._executableHandler = !0), opts.isDefault && (this._defaultCommandName = cmd._name), 
    cmd._outputConfiguration = this._outputConfiguration, cmd._hidden = !(!opts.noHelp && !opts.hidden), 
    cmd._hasHelpOption = this._hasHelpOption, cmd._helpFlags = this._helpFlags, cmd._helpDescription = this._helpDescription, 
    cmd._helpShortFlag = this._helpShortFlag, cmd._helpLongFlag = this._helpLongFlag, 
    cmd._helpCommandName = this._helpCommandName, cmd._helpCommandnameAndArgs = this._helpCommandnameAndArgs, 
    cmd._helpCommandDescription = this._helpCommandDescription, cmd._helpConfiguration = this._helpConfiguration, 
    cmd._exitCallback = this._exitCallback, cmd._storeOptionsAsProperties = this._storeOptionsAsProperties, 
    cmd._combineFlagAndOptionalValue = this._combineFlagAndOptionalValue, cmd._allowExcessArguments = this._allowExcessArguments, 
    cmd._enablePositionalOptions = this._enablePositionalOptions, cmd._executableFile = opts.executableFile || null, 
    this.commands.push(cmd), cmd._parseExpectedArgs(args), cmd.parent = this, desc ? this : cmd;
  }
  createCommand(name) {
    return new Command(name);
  }
  createHelp() {
    return Object.assign(new Help, this.configureHelp());
  }
  configureHelp(configuration) {
    return void 0 === configuration ? this._helpConfiguration : (this._helpConfiguration = configuration, 
    this);
  }
  configureOutput(configuration) {
    return void 0 === configuration ? this._outputConfiguration : (Object.assign(this._outputConfiguration, configuration), 
    this);
  }
  addCommand(cmd, opts) {
    if (!cmd._name) throw new Error("Command passed to .addCommand() must have a name");
    return function checkExplicitNames(commandArray) {
      commandArray.forEach((cmd => {
        if (cmd._executableHandler && !cmd._executableFile) throw new Error(`Must specify executableFile for deeply nested executable: ${cmd.name()}`);
        checkExplicitNames(cmd.commands);
      }));
    }(cmd.commands), (opts = opts || {}).isDefault && (this._defaultCommandName = cmd._name), 
    (opts.noHelp || opts.hidden) && (cmd._hidden = !0), this.commands.push(cmd), cmd.parent = this, 
    this;
  }
  arguments(desc) {
    return this._parseExpectedArgs(desc.split(/ +/));
  }
  addHelpCommand(enableOrNameAndArgs, description) {
    return !1 === enableOrNameAndArgs ? this._addImplicitHelpCommand = !1 : (this._addImplicitHelpCommand = !0, 
    "string" == typeof enableOrNameAndArgs && (this._helpCommandName = enableOrNameAndArgs.split(" ")[0], 
    this._helpCommandnameAndArgs = enableOrNameAndArgs), this._helpCommandDescription = description || this._helpCommandDescription), 
    this;
  }
  _hasImplicitHelpCommand() {
    return void 0 === this._addImplicitHelpCommand ? this.commands.length && !this._actionHandler && !this._findCommand("help") : this._addImplicitHelpCommand;
  }
  _parseExpectedArgs(args) {
    if (args.length) return args.forEach((arg => {
      const argDetails = {
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
      argDetails.name = argDetails.name.slice(0, -3)), argDetails.name && this._args.push(argDetails);
    })), this._args.forEach(((arg, i) => {
      if (arg.variadic && i < this._args.length - 1) throw new Error(`only the last argument can be variadic '${arg.name}'`);
    })), this;
  }
  exitOverride(fn) {
    return this._exitCallback = fn || (err => {
      if ("commander.executeSubCommandAsync" !== err.code) throw err;
    }), this;
  }
  _exit(exitCode, code, message) {
    this._exitCallback && this._exitCallback(new CommanderError(exitCode, code, message)), 
    process.exit(exitCode);
  }
  action(fn) {
    return this._actionHandler = args => {
      const expectedArgsCount = this._args.length, actionArgs = args.slice(0, expectedArgsCount);
      this._storeOptionsAsProperties ? actionArgs[expectedArgsCount] = this : actionArgs[expectedArgsCount] = this.opts(), 
      actionArgs.push(this);
      const actionResult = fn.apply(this, actionArgs);
      let rootCommand = this;
      for (;rootCommand.parent; ) rootCommand = rootCommand.parent;
      rootCommand._actionResults.push(actionResult);
    }, this;
  }
  createOption(flags, description) {
    return new Option(flags, description);
  }
  addOption(option) {
    const oname = option.name(), name = option.attributeName();
    let defaultValue = option.defaultValue;
    if (option.negate || option.optional || option.required || "boolean" == typeof defaultValue) {
      if (option.negate) {
        const positiveLongFlag = option.long.replace(/^--no-/, "--");
        defaultValue = !this._findOption(positiveLongFlag) || this._getOptionValue(name);
      }
      void 0 !== defaultValue && this._setOptionValue(name, defaultValue);
    }
    return this.options.push(option), this.on("option:" + oname, (val => {
      const oldValue = this._getOptionValue(name);
      if (null !== val && option.parseArg) try {
        val = option.parseArg(val, void 0 === oldValue ? defaultValue : oldValue);
      } catch (err) {
        if ("commander.invalidOptionArgument" === err.code) {
          const message = `error: option '${option.flags}' argument '${val}' is invalid. ${err.message}`;
          this._displayError(err.exitCode, err.code, message);
        }
        throw err;
      } else null !== val && option.variadic && (val = option._concatValue(val, oldValue));
      "boolean" == typeof oldValue || void 0 === oldValue ? null == val ? this._setOptionValue(name, !option.negate && (defaultValue || !0)) : this._setOptionValue(name, val) : null !== val && this._setOptionValue(name, !option.negate && val);
    })), this;
  }
  _optionEx(config, flags, description, fn, defaultValue) {
    const option = this.createOption(flags, description);
    if (option.makeOptionMandatory(!!config.mandatory), "function" == typeof fn) option.default(defaultValue).argParser(fn); else if (fn instanceof RegExp) {
      const regex = fn;
      fn = (val, def) => {
        const m = regex.exec(val);
        return m ? m[0] : def;
      }, option.default(defaultValue).argParser(fn);
    } else option.default(fn);
    return this.addOption(option);
  }
  option(flags, description, fn, defaultValue) {
    return this._optionEx({}, flags, description, fn, defaultValue);
  }
  requiredOption(flags, description, fn, defaultValue) {
    return this._optionEx({
      mandatory: !0
    }, flags, description, fn, defaultValue);
  }
  combineFlagAndOptionalValue(combine = !0) {
    return this._combineFlagAndOptionalValue = !!combine, this;
  }
  allowUnknownOption(allowUnknown = !0) {
    return this._allowUnknownOption = !!allowUnknown, this;
  }
  allowExcessArguments(allowExcess = !0) {
    return this._allowExcessArguments = !!allowExcess, this;
  }
  enablePositionalOptions(positional = !0) {
    return this._enablePositionalOptions = !!positional, this;
  }
  passThroughOptions(passThrough = !0) {
    if (this._passThroughOptions = !!passThrough, this.parent && passThrough && !this.parent._enablePositionalOptions) throw new Error("passThroughOptions can not be used without turning on enablePositionalOptions for parent command(s)");
    return this;
  }
  storeOptionsAsProperties(storeAsProperties = !0) {
    if (this._storeOptionsAsProperties = !!storeAsProperties, this.options.length) throw new Error("call .storeOptionsAsProperties() before adding options");
    return this;
  }
  _setOptionValue(key, value) {
    this._storeOptionsAsProperties ? this[key] = value : this._optionValues[key] = value;
  }
  _getOptionValue(key) {
    return this._storeOptionsAsProperties ? this[key] : this._optionValues[key];
  }
  parse(argv, parseOptions) {
    if (void 0 !== argv && !Array.isArray(argv)) throw new Error("first parameter to parse must be array or undefined");
    let userArgs;
    switch (parseOptions = parseOptions || {}, void 0 === argv && (argv = process.argv, 
    process.versions && process.versions.electron && (parseOptions.from = "electron")), 
    this.rawArgs = argv.slice(), parseOptions.from) {
     case void 0:
     case "node":
      this._scriptPath = argv[1], userArgs = argv.slice(2);
      break;

     case "electron":
      process.defaultApp ? (this._scriptPath = argv[1], userArgs = argv.slice(2)) : userArgs = argv.slice(1);
      break;

     case "user":
      userArgs = argv.slice(0);
      break;

     default:
      throw new Error(`unexpected parse option { from: '${parseOptions.from}' }`);
    }
    return !this._scriptPath && require.main && (this._scriptPath = require.main.filename), 
    this._name = this._name || this._scriptPath && path.basename(this._scriptPath, path.extname(this._scriptPath)), 
    this._parseCommand([], userArgs), this;
  }
  parseAsync(argv, parseOptions) {
    return this.parse(argv, parseOptions), Promise.all(this._actionResults).then((() => this));
  }
  _executeSubCommand(subcommand, args) {
    args = args.slice();
    let launchWithNode = !1;
    const sourceExt = [ ".js", ".ts", ".tsx", ".mjs", ".cjs" ];
    this._checkForMissingMandatoryOptions();
    let baseDir, scriptPath = this._scriptPath;
    !scriptPath && require.main && (scriptPath = require.main.filename);
    try {
      const resolvedLink = fs.realpathSync(scriptPath);
      baseDir = path.dirname(resolvedLink);
    } catch (e) {
      baseDir = ".";
    }
    let bin = path.basename(scriptPath, path.extname(scriptPath)) + "-" + subcommand._name;
    subcommand._executableFile && (bin = subcommand._executableFile);
    const localBin = path.join(baseDir, bin);
    let proc;
    fs.existsSync(localBin) ? bin = localBin : sourceExt.forEach((ext => {
      fs.existsSync(`${localBin}${ext}`) && (bin = `${localBin}${ext}`);
    })), launchWithNode = sourceExt.includes(path.extname(bin)), "win32" !== process.platform ? launchWithNode ? (args.unshift(bin), 
    args = incrementNodeInspectorPort(process.execArgv).concat(args), proc = childProcess.spawn(process.argv[0], args, {
      stdio: "inherit"
    })) : proc = childProcess.spawn(bin, args, {
      stdio: "inherit"
    }) : (args.unshift(bin), args = incrementNodeInspectorPort(process.execArgv).concat(args), 
    proc = childProcess.spawn(process.execPath, args, {
      stdio: "inherit"
    }));
    [ "SIGUSR1", "SIGUSR2", "SIGTERM", "SIGINT", "SIGHUP" ].forEach((signal => {
      process.on(signal, (() => {
        !1 === proc.killed && null === proc.exitCode && proc.kill(signal);
      }));
    }));
    const exitCallback = this._exitCallback;
    exitCallback ? proc.on("close", (() => {
      exitCallback(new CommanderError(process.exitCode || 0, "commander.executeSubCommandAsync", "(close)"));
    })) : proc.on("close", process.exit.bind(process)), proc.on("error", (err => {
      if ("ENOENT" === err.code) {
        const executableMissing = `'${bin}' does not exist\n - if '${subcommand._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead\n - if the default executable name is not suitable, use the executableFile option to supply a custom name`;
        throw new Error(executableMissing);
      }
      if ("EACCES" === err.code) throw new Error(`'${bin}' not executable`);
      if (exitCallback) {
        const wrappedError = new CommanderError(1, "commander.executeSubCommandAsync", "(error)");
        wrappedError.nestedError = err, exitCallback(wrappedError);
      } else process.exit(1);
    })), this.runningCommand = proc;
  }
  _dispatchSubcommand(commandName, operands, unknown) {
    const subCommand = this._findCommand(commandName);
    subCommand || this.help({
      error: !0
    }), subCommand._executableHandler ? this._executeSubCommand(subCommand, operands.concat(unknown)) : subCommand._parseCommand(operands, unknown);
  }
  _parseCommand(operands, unknown) {
    const parsed = this.parseOptions(unknown);
    if (operands = operands.concat(parsed.operands), unknown = parsed.unknown, this.args = operands.concat(unknown), 
    operands && this._findCommand(operands[0])) this._dispatchSubcommand(operands[0], operands.slice(1), unknown); else if (this._hasImplicitHelpCommand() && operands[0] === this._helpCommandName) 1 === operands.length ? this.help() : this._dispatchSubcommand(operands[1], [], [ this._helpLongFlag ]); else if (this._defaultCommandName) outputHelpIfRequested(this, unknown), 
    this._dispatchSubcommand(this._defaultCommandName, operands, unknown); else {
      !this.commands.length || 0 !== this.args.length || this._actionHandler || this._defaultCommandName || this.help({
        error: !0
      }), outputHelpIfRequested(this, parsed.unknown), this._checkForMissingMandatoryOptions();
      const checkForUnknownOptions = () => {
        parsed.unknown.length > 0 && this.unknownOption(parsed.unknown[0]);
      }, commandEvent = `command:${this.name()}`;
      if (this._actionHandler) {
        checkForUnknownOptions();
        const args = this.args.slice();
        this._args.forEach(((arg, i) => {
          arg.required && null == args[i] ? this.missingArgument(arg.name) : arg.variadic && (args[i] = args.splice(i), 
          args.length = Math.min(i + 1, args.length));
        })), args.length > this._args.length && this._excessArguments(args), this._actionHandler(args), 
        this.parent && this.parent.emit(commandEvent, operands, unknown);
      } else this.parent && this.parent.listenerCount(commandEvent) ? (checkForUnknownOptions(), 
      this.parent.emit(commandEvent, operands, unknown)) : operands.length ? this._findCommand("*") ? this._dispatchSubcommand("*", operands, unknown) : this.listenerCount("command:*") ? this.emit("command:*", operands, unknown) : this.commands.length ? this.unknownCommand() : checkForUnknownOptions() : this.commands.length ? this.help({
        error: !0
      }) : checkForUnknownOptions();
    }
  }
  _findCommand(name) {
    if (name) return this.commands.find((cmd => cmd._name === name || cmd._aliases.includes(name)));
  }
  _findOption(arg) {
    return this.options.find((option => option.is(arg)));
  }
  _checkForMissingMandatoryOptions() {
    for (let cmd = this; cmd; cmd = cmd.parent) cmd.options.forEach((anOption => {
      anOption.mandatory && void 0 === cmd._getOptionValue(anOption.attributeName()) && cmd.missingMandatoryOptionValue(anOption);
    }));
  }
  parseOptions(argv) {
    const operands = [], unknown = [];
    let dest = operands;
    const args = argv.slice();
    function maybeOption(arg) {
      return arg.length > 1 && "-" === arg[0];
    }
    let activeVariadicOption = null;
    for (;args.length; ) {
      const arg = args.shift();
      if ("--" === arg) {
        dest === unknown && dest.push(arg), dest.push(...args);
        break;
      }
      if (!activeVariadicOption || maybeOption(arg)) {
        if (activeVariadicOption = null, maybeOption(arg)) {
          const option = this._findOption(arg);
          if (option) {
            if (option.required) {
              const value = args.shift();
              void 0 === value && this.optionMissingArgument(option), this.emit(`option:${option.name()}`, value);
            } else if (option.optional) {
              let value = null;
              args.length > 0 && !maybeOption(args[0]) && (value = args.shift()), this.emit(`option:${option.name()}`, value);
            } else this.emit(`option:${option.name()}`);
            activeVariadicOption = option.variadic ? option : null;
            continue;
          }
        }
        if (arg.length > 2 && "-" === arg[0] && "-" !== arg[1]) {
          const option = this._findOption(`-${arg[1]}`);
          if (option) {
            option.required || option.optional && this._combineFlagAndOptionalValue ? this.emit(`option:${option.name()}`, arg.slice(2)) : (this.emit(`option:${option.name()}`), 
            args.unshift(`-${arg.slice(2)}`));
            continue;
          }
        }
        if (/^--[^=]+=/.test(arg)) {
          const index = arg.indexOf("="), option = this._findOption(arg.slice(0, index));
          if (option && (option.required || option.optional)) {
            this.emit(`option:${option.name()}`, arg.slice(index + 1));
            continue;
          }
        }
        if (maybeOption(arg) && (dest = unknown), (this._enablePositionalOptions || this._passThroughOptions) && 0 === operands.length && 0 === unknown.length) {
          if (this._findCommand(arg)) {
            operands.push(arg), args.length > 0 && unknown.push(...args);
            break;
          }
          if (arg === this._helpCommandName && this._hasImplicitHelpCommand()) {
            operands.push(arg), args.length > 0 && operands.push(...args);
            break;
          }
          if (this._defaultCommandName) {
            unknown.push(arg), args.length > 0 && unknown.push(...args);
            break;
          }
        }
        if (this._passThroughOptions) {
          dest.push(arg), args.length > 0 && dest.push(...args);
          break;
        }
        dest.push(arg);
      } else this.emit(`option:${activeVariadicOption.name()}`, arg);
    }
    return {
      operands,
      unknown
    };
  }
  opts() {
    if (this._storeOptionsAsProperties) {
      const result = {}, len = this.options.length;
      for (let i = 0; i < len; i++) {
        const key = this.options[i].attributeName();
        result[key] = key === this._versionOptionName ? this._version : this[key];
      }
      return result;
    }
    return this._optionValues;
  }
  _displayError(exitCode, code, message) {
    this._outputConfiguration.outputError(`${message}\n`, this._outputConfiguration.writeErr), 
    this._exit(exitCode, code, message);
  }
  missingArgument(name) {
    const message = `error: missing required argument '${name}'`;
    this._displayError(1, "commander.missingArgument", message);
  }
  optionMissingArgument(option) {
    const message = `error: option '${option.flags}' argument missing`;
    this._displayError(1, "commander.optionMissingArgument", message);
  }
  missingMandatoryOptionValue(option) {
    const message = `error: required option '${option.flags}' not specified`;
    this._displayError(1, "commander.missingMandatoryOptionValue", message);
  }
  unknownOption(flag) {
    if (this._allowUnknownOption) return;
    const message = `error: unknown option '${flag}'`;
    this._displayError(1, "commander.unknownOption", message);
  }
  _excessArguments(receivedArgs) {
    if (this._allowExcessArguments) return;
    const expected = this._args.length, s = 1 === expected ? "" : "s", message = `error: too many arguments${this.parent ? ` for '${this.name()}'` : ""}. Expected ${expected} argument${s} but got ${receivedArgs.length}.`;
    this._displayError(1, "commander.excessArguments", message);
  }
  unknownCommand() {
    const partCommands = [ this.name() ];
    for (let parentCmd = this.parent; parentCmd; parentCmd = parentCmd.parent) partCommands.unshift(parentCmd.name());
    const fullCommand = partCommands.join(" "), message = `error: unknown command '${this.args[0]}'.` + (this._hasHelpOption ? ` See '${fullCommand} ${this._helpLongFlag}'.` : "");
    this._displayError(1, "commander.unknownCommand", message);
  }
  version(str, flags, description) {
    if (void 0 === str) return this._version;
    this._version = str, flags = flags || "-V, --version", description = description || "output the version number";
    const versionOption = this.createOption(flags, description);
    return this._versionOptionName = versionOption.attributeName(), this.options.push(versionOption), 
    this.on("option:" + versionOption.name(), (() => {
      this._outputConfiguration.writeOut(`${str}\n`), this._exit(0, "commander.version", str);
    })), this;
  }
  description(str, argsDescription) {
    return void 0 === str && void 0 === argsDescription ? this._description : (this._description = str, 
    this._argsDescription = argsDescription, this);
  }
  alias(alias) {
    if (void 0 === alias) return this._aliases[0];
    let command = this;
    if (0 !== this.commands.length && this.commands[this.commands.length - 1]._executableHandler && (command = this.commands[this.commands.length - 1]), 
    alias === command._name) throw new Error("Command alias can't be the same as its name");
    return command._aliases.push(alias), this;
  }
  aliases(aliases) {
    return void 0 === aliases ? this._aliases : (aliases.forEach((alias => this.alias(alias))), 
    this);
  }
  usage(str) {
    if (void 0 === str) {
      if (this._usage) return this._usage;
      const args = this._args.map((arg => humanReadableArgName(arg)));
      return [].concat(this.options.length || this._hasHelpOption ? "[options]" : [], this.commands.length ? "[command]" : [], this._args.length ? args : []).join(" ");
    }
    return this._usage = str, this;
  }
  name(str) {
    return void 0 === str ? this._name : (this._name = str, this);
  }
  helpInformation(contextOptions) {
    const helper = this.createHelp();
    return void 0 === helper.helpWidth && (helper.helpWidth = contextOptions && contextOptions.error ? this._outputConfiguration.getErrHelpWidth() : this._outputConfiguration.getOutHelpWidth()), 
    helper.formatHelp(this, helper);
  }
  _getHelpContext(contextOptions) {
    const context = {
      error: !!(contextOptions = contextOptions || {}).error
    };
    let write;
    return write = context.error ? arg => this._outputConfiguration.writeErr(arg) : arg => this._outputConfiguration.writeOut(arg), 
    context.write = contextOptions.write || write, context.command = this, context;
  }
  outputHelp(contextOptions) {
    let deprecatedCallback;
    "function" == typeof contextOptions && (deprecatedCallback = contextOptions, contextOptions = void 0);
    const context = this._getHelpContext(contextOptions), groupListeners = [];
    let command = this;
    for (;command; ) groupListeners.push(command), command = command.parent;
    groupListeners.slice().reverse().forEach((command => command.emit("beforeAllHelp", context))), 
    this.emit("beforeHelp", context);
    let helpInformation = this.helpInformation(context);
    if (deprecatedCallback && (helpInformation = deprecatedCallback(helpInformation), 
    "string" != typeof helpInformation && !Buffer.isBuffer(helpInformation))) throw new Error("outputHelp callback must return a string or a Buffer");
    context.write(helpInformation), this.emit(this._helpLongFlag), this.emit("afterHelp", context), 
    groupListeners.forEach((command => command.emit("afterAllHelp", context)));
  }
  helpOption(flags, description) {
    if ("boolean" == typeof flags) return this._hasHelpOption = flags, this;
    this._helpFlags = flags || this._helpFlags, this._helpDescription = description || this._helpDescription;
    const helpFlags = _parseOptionFlags(this._helpFlags);
    return this._helpShortFlag = helpFlags.shortFlag, this._helpLongFlag = helpFlags.longFlag, 
    this;
  }
  help(contextOptions) {
    this.outputHelp(contextOptions);
    let exitCode = process.exitCode || 0;
    0 === exitCode && contextOptions && "function" != typeof contextOptions && contextOptions.error && (exitCode = 1), 
    this._exit(exitCode, "commander.help", "(outputHelp)");
  }
  addHelpText(position, text) {
    const allowedValues = [ "beforeAll", "before", "after", "afterAll" ];
    if (!allowedValues.includes(position)) throw new Error(`Unexpected value for position to addHelpText.\nExpecting one of '${allowedValues.join("', '")}'`);
    const helpEvent = `${position}Help`;
    return this.on(helpEvent, (context => {
      let helpStr;
      helpStr = "function" == typeof text ? text({
        error: context.error,
        command: context.command
      }) : text, helpStr && context.write(`${helpStr}\n`);
    })), this;
  }
}

function camelcase(flag) {
  return flag.split("-").reduce(((str, word) => str + word[0].toUpperCase() + word.slice(1)));
}

function outputHelpIfRequested(cmd, args) {
  cmd._hasHelpOption && args.find((arg => arg === cmd._helpLongFlag || arg === cmd._helpShortFlag)) && (cmd.outputHelp(), 
  cmd._exit(0, "commander.helpDisplayed", "(outputHelp)"));
}

function humanReadableArgName(arg) {
  const nameOutput = arg.name + (!0 === arg.variadic ? "..." : "");
  return arg.required ? "<" + nameOutput + ">" : "[" + nameOutput + "]";
}

function _parseOptionFlags(flags) {
  let shortFlag, longFlag;
  const flagParts = flags.split(/[ |,]+/);
  return flagParts.length > 1 && !/^[[<]/.test(flagParts[1]) && (shortFlag = flagParts.shift()), 
  longFlag = flagParts.shift(), !shortFlag && /^-[^-]$/.test(longFlag) && (shortFlag = longFlag, 
  longFlag = void 0), {
    shortFlag,
    longFlag
  };
}

function incrementNodeInspectorPort(args) {
  return args.map((arg => {
    if (!arg.startsWith("--inspect")) return arg;
    let debugOption, match, debugHost = "127.0.0.1", debugPort = "9229";
    return null !== (match = arg.match(/^(--inspect(-brk)?)$/)) ? debugOption = match[1] : null !== (match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) ? (debugOption = match[1], 
    /^\d+$/.test(match[3]) ? debugPort = match[3] : debugHost = match[3]) : null !== (match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) && (debugOption = match[1], 
    debugHost = match[3], debugPort = match[4]), debugOption && "0" !== debugPort ? `${debugOption}=${debugHost}:${parseInt(debugPort) + 1}` : arg;
  }));
}

exports = module.exports = new Command, exports.program = exports, exports.Command = Command, 
exports.Option = Option, exports.CommanderError = CommanderError, exports.InvalidOptionArgumentError = InvalidOptionArgumentError, 
exports.Help = Help;