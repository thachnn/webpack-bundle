(() => {
  var __webpack_modules__ = {
    605: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const path = __webpack_require__(17), resolveCommand = __webpack_require__(202), escape = __webpack_require__(748), readShebang = __webpack_require__(550), isWin = "win32" === process.platform, isExecutableRegExp = /\.(?:com|exe)$/i, isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
      function parseNonShell(parsed) {
        if (!isWin) return parsed;
        const commandFile = function(parsed) {
          parsed.file = resolveCommand(parsed);
          const shebang = parsed.file && readShebang(parsed.file);
          return shebang ? (parsed.args.unshift(parsed.file), parsed.command = shebang, resolveCommand(parsed)) : parsed.file;
        }(parsed), needsShell = !isExecutableRegExp.test(commandFile);
        if (parsed.options.forceShell || needsShell) {
          const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);
          parsed.command = path.normalize(parsed.command), parsed.command = escape.command(parsed.command), 
          parsed.args = parsed.args.map((arg => escape.argument(arg, needsDoubleEscapeMetaChars)));
          const shellCommand = [ parsed.command ].concat(parsed.args).join(" ");
          parsed.args = [ "/d", "/s", "/c", `"${shellCommand}"` ], parsed.command = process.env.comspec || "cmd.exe", 
          parsed.options.windowsVerbatimArguments = !0;
        }
        return parsed;
      }
      module.exports = function(command, args, options) {
        args && !Array.isArray(args) && (options = args, args = null);
        const parsed = {
          command,
          args: args = args ? args.slice(0) : [],
          options: options = Object.assign({}, options),
          file: void 0,
          original: {
            command,
            args
          }
        };
        return options.shell ? parsed : parseNonShell(parsed);
      };
    },
    748: module => {
      "use strict";
      const metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
      module.exports.command = function(arg) {
        return arg = arg.replace(metaCharsRegExp, "^$1");
      }, module.exports.argument = function(arg, doubleEscapeMetaChars) {
        return arg = (arg = `"${arg = (arg = (arg = `${arg}`).replace(/(\\*)"/g, '$1$1\\"')).replace(/(\\*)$/, "$1$1")}"`).replace(metaCharsRegExp, "^$1"), 
        doubleEscapeMetaChars && (arg = arg.replace(metaCharsRegExp, "^$1")), arg;
      };
    },
    550: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const fs = __webpack_require__(147), shebangCommand = __webpack_require__(63);
      module.exports = function(command) {
        const buffer = Buffer.alloc(150);
        let fd;
        try {
          fd = fs.openSync(command, "r"), fs.readSync(fd, buffer, 0, 150, 0), fs.closeSync(fd);
        } catch (e) {}
        return shebangCommand(buffer.toString());
      };
    },
    202: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const path = __webpack_require__(17), which = __webpack_require__(806), getPathKey = __webpack_require__(24);
      function resolveCommandAttempt(parsed, withoutPathExt) {
        const env = parsed.options.env || process.env, cwd = process.cwd(), hasCustomCwd = null != parsed.options.cwd, shouldSwitchCwd = hasCustomCwd && void 0 !== process.chdir && !process.chdir.disabled;
        if (shouldSwitchCwd) try {
          process.chdir(parsed.options.cwd);
        } catch (err) {}
        let resolved;
        try {
          resolved = which.sync(parsed.command, {
            path: env[getPathKey({
              env
            })],
            pathExt: withoutPathExt ? path.delimiter : void 0
          });
        } catch (e) {} finally {
          shouldSwitchCwd && process.chdir(cwd);
        }
        return resolved && (resolved = path.resolve(hasCustomCwd ? parsed.options.cwd : "", resolved)), 
        resolved;
      }
      module.exports = function(parsed) {
        return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, !0);
      };
    },
    77: module => {
      "use strict";
      const normalizeArgs = (file, args = []) => Array.isArray(args) ? [ file, ...args ] : [ file ], NO_ESCAPE_REGEXP = /^[\w.-]+$/, DOUBLE_QUOTES_REGEXP = /"/g, SPACES_REGEXP = / +/g;
      module.exports = {
        joinCommand: (file, args) => normalizeArgs(file, args).join(" "),
        getEscapedCommand: (file, args) => normalizeArgs(file, args).map((arg => (arg => "string" != typeof arg || NO_ESCAPE_REGEXP.test(arg) ? arg : `"${arg.replace(DOUBLE_QUOTES_REGEXP, '\\"')}"`)(arg))).join(" "),
        parseCommand: command => {
          const tokens = [];
          for (const token of command.trim().split(SPACES_REGEXP)) {
            const previousToken = tokens[tokens.length - 1];
            previousToken && previousToken.endsWith("\\") ? tokens[tokens.length - 1] = `${previousToken.slice(0, -1)} ${token}` : tokens.push(token);
          }
          return tokens;
        }
      };
    },
    353: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const {signalsByName} = __webpack_require__(787);
      module.exports = ({stdout, stderr, all, error, signal, exitCode, command, escapedCommand, timedOut, isCanceled, killed, parsed: {options: {timeout}}}) => {
        exitCode = null === exitCode ? void 0 : exitCode;
        const signalDescription = void 0 === (signal = null === signal ? void 0 : signal) ? void 0 : signalsByName[signal].description, prefix = (({timedOut, timeout, errorCode, signal, signalDescription, exitCode, isCanceled}) => timedOut ? `timed out after ${timeout} milliseconds` : isCanceled ? "was canceled" : void 0 !== errorCode ? `failed with ${errorCode}` : void 0 !== signal ? `was killed with ${signal} (${signalDescription})` : void 0 !== exitCode ? `failed with exit code ${exitCode}` : "failed")({
          timedOut,
          timeout,
          errorCode: error && error.code,
          signal,
          signalDescription,
          exitCode,
          isCanceled
        }), execaMessage = `Command ${prefix}: ${command}`, isError = "[object Error]" === Object.prototype.toString.call(error), shortMessage = isError ? `${execaMessage}\n${error.message}` : execaMessage, message = [ shortMessage, stderr, stdout ].filter(Boolean).join("\n");
        return isError ? (error.originalMessage = error.message, error.message = message) : error = new Error(message), 
        error.shortMessage = shortMessage, error.command = command, error.escapedCommand = escapedCommand, 
        error.exitCode = exitCode, error.signal = signal, error.signalDescription = signalDescription, 
        error.stdout = stdout, error.stderr = stderr, void 0 !== all && (error.all = all), 
        "bufferedData" in error && delete error.bufferedData, error.failed = !0, error.timedOut = Boolean(timedOut), 
        error.isCanceled = isCanceled, error.killed = killed && !timedOut, error;
      };
    },
    820: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const os = __webpack_require__(37), onExit = __webpack_require__(908), setKillTimeout = (kill, signal, options, killResult) => {
        if (!shouldForceKill(signal, options, killResult)) return;
        const timeout = getForceKillAfterTimeout(options), t = setTimeout((() => {
          kill("SIGKILL");
        }), timeout);
        t.unref && t.unref();
      }, shouldForceKill = (signal, {forceKillAfterTimeout}, killResult) => isSigterm(signal) && !1 !== forceKillAfterTimeout && killResult, isSigterm = signal => signal === os.constants.signals.SIGTERM || "string" == typeof signal && "SIGTERM" === signal.toUpperCase(), getForceKillAfterTimeout = ({forceKillAfterTimeout = !0}) => {
        if (!0 === forceKillAfterTimeout) return 5e3;
        if (!Number.isFinite(forceKillAfterTimeout) || forceKillAfterTimeout < 0) throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${forceKillAfterTimeout}\` (${typeof forceKillAfterTimeout})`);
        return forceKillAfterTimeout;
      };
      module.exports = {
        spawnedKill: (kill, signal = "SIGTERM", options = {}) => {
          const killResult = kill(signal);
          return setKillTimeout(kill, signal, options, killResult), killResult;
        },
        spawnedCancel: (spawned, context) => {
          spawned.kill() && (context.isCanceled = !0);
        },
        setupTimeout: (spawned, {timeout, killSignal = "SIGTERM"}, spawnedPromise) => {
          if (0 === timeout || void 0 === timeout) return spawnedPromise;
          let timeoutId;
          const timeoutPromise = new Promise(((resolve, reject) => {
            timeoutId = setTimeout((() => {
              ((spawned, signal, reject) => {
                spawned.kill(signal), reject(Object.assign(new Error("Timed out"), {
                  timedOut: !0,
                  signal
                }));
              })(spawned, killSignal, reject);
            }), timeout);
          })), safeSpawnedPromise = spawnedPromise.finally((() => {
            clearTimeout(timeoutId);
          }));
          return Promise.race([ timeoutPromise, safeSpawnedPromise ]);
        },
        validateTimeout: ({timeout}) => {
          if (void 0 !== timeout && (!Number.isFinite(timeout) || timeout < 0)) throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${timeout}\` (${typeof timeout})`);
        },
        setExitHandler: async (spawned, {cleanup, detached}, timedPromise) => {
          if (!cleanup || detached) return timedPromise;
          const removeExitHandler = onExit((() => {
            spawned.kill();
          }));
          return timedPromise.finally((() => {
            removeExitHandler();
          }));
        }
      };
    },
    708: module => {
      "use strict";
      const nativePromisePrototype = (async () => {})().constructor.prototype, descriptors = [ "then", "catch", "finally" ].map((property => [ property, Reflect.getOwnPropertyDescriptor(nativePromisePrototype, property) ]));
      module.exports = {
        mergePromise: (spawned, promise) => {
          for (const [property, descriptor] of descriptors) {
            const value = "function" == typeof promise ? (...args) => Reflect.apply(descriptor.value, promise(), args) : descriptor.value.bind(promise);
            Reflect.defineProperty(spawned, property, {
              ...descriptor,
              value
            });
          }
          return spawned;
        },
        getSpawnedPromise: spawned => new Promise(((resolve, reject) => {
          spawned.on("exit", ((exitCode, signal) => {
            resolve({
              exitCode,
              signal
            });
          })), spawned.on("error", (error => {
            reject(error);
          })), spawned.stdin && spawned.stdin.on("error", (error => {
            reject(error);
          }));
        }))
      };
    },
    111: module => {
      "use strict";
      const aliases = [ "stdin", "stdout", "stderr" ], normalizeStdio = options => {
        if (!options) return;
        const {stdio} = options;
        if (void 0 === stdio) return aliases.map((alias => options[alias]));
        if ((options => aliases.some((alias => void 0 !== options[alias])))(options)) throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${aliases.map((alias => `\`${alias}\``)).join(", ")}`);
        if ("string" == typeof stdio) return stdio;
        if (!Array.isArray(stdio)) throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``);
        const length = Math.max(stdio.length, aliases.length);
        return Array.from({
          length
        }, ((value, index) => stdio[index]));
      };
      module.exports = normalizeStdio, module.exports.node = options => {
        const stdio = normalizeStdio(options);
        return "ipc" === stdio ? "ipc" : void 0 === stdio || "string" == typeof stdio ? [ stdio, stdio, stdio, "ipc" ] : stdio.includes("ipc") ? stdio : [ ...stdio, "ipc" ];
      };
    },
    994: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const isStream = __webpack_require__(970), getStream = __webpack_require__(31), mergeStream = __webpack_require__(34), getBufferedData = async (stream, streamPromise) => {
        if (stream) {
          stream.destroy();
          try {
            return await streamPromise;
          } catch (error) {
            return error.bufferedData;
          }
        }
      }, getStreamPromise = (stream, {encoding, buffer, maxBuffer}) => {
        if (stream && buffer) return encoding ? getStream(stream, {
          encoding,
          maxBuffer
        }) : getStream.buffer(stream, {
          maxBuffer
        });
      };
      module.exports = {
        handleInput: (spawned, input) => {
          void 0 !== input && void 0 !== spawned.stdin && (isStream(input) ? input.pipe(spawned.stdin) : spawned.stdin.end(input));
        },
        makeAllStream: (spawned, {all}) => {
          if (!all || !spawned.stdout && !spawned.stderr) return;
          const mixed = mergeStream();
          return spawned.stdout && mixed.add(spawned.stdout), spawned.stderr && mixed.add(spawned.stderr), 
          mixed;
        },
        getSpawnedResult: async ({stdout, stderr, all}, {encoding, buffer, maxBuffer}, processDone) => {
          const stdoutPromise = getStreamPromise(stdout, {
            encoding,
            buffer,
            maxBuffer
          }), stderrPromise = getStreamPromise(stderr, {
            encoding,
            buffer,
            maxBuffer
          }), allPromise = getStreamPromise(all, {
            encoding,
            buffer,
            maxBuffer: 2 * maxBuffer
          });
          try {
            return await Promise.all([ processDone, stdoutPromise, stderrPromise, allPromise ]);
          } catch (error) {
            return Promise.all([ {
              error,
              signal: error.signal,
              timedOut: error.timedOut
            }, getBufferedData(stdout, stdoutPromise), getBufferedData(stderr, stderrPromise), getBufferedData(all, allPromise) ]);
          }
        },
        validateInputSync: ({input}) => {
          if (isStream(input)) throw new TypeError("The `input` option cannot be a stream in sync mode");
        }
      };
    },
    105: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const {PassThrough: PassThroughStream} = __webpack_require__(781);
      module.exports = options => {
        options = {
          ...options
        };
        const {array} = options;
        let {encoding} = options;
        const isBuffer = "buffer" === encoding;
        let objectMode = !1;
        array ? objectMode = !(encoding || isBuffer) : encoding = encoding || "utf8", isBuffer && (encoding = null);
        const stream = new PassThroughStream({
          objectMode
        });
        encoding && stream.setEncoding(encoding);
        let length = 0;
        const chunks = [];
        return stream.on("data", (chunk => {
          chunks.push(chunk), objectMode ? length = chunks.length : length += chunk.length;
        })), stream.getBufferedValue = () => array ? chunks : isBuffer ? Buffer.concat(chunks, length) : chunks.join(""), 
        stream.getBufferedLength = () => length, stream;
      };
    },
    31: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const {constants: BufferConstants} = __webpack_require__(300), stream = __webpack_require__(781), {promisify} = __webpack_require__(837), bufferStream = __webpack_require__(105), streamPipelinePromisified = promisify(stream.pipeline);
      class MaxBufferError extends Error {
        constructor() {
          super("maxBuffer exceeded"), this.name = "MaxBufferError";
        }
      }
      async function getStream(inputStream, options) {
        if (!inputStream) throw new Error("Expected a stream");
        options = {
          maxBuffer: 1 / 0,
          ...options
        };
        const {maxBuffer} = options, stream = bufferStream(options);
        return await new Promise(((resolve, reject) => {
          const rejectPromise = error => {
            error && stream.getBufferedLength() <= BufferConstants.MAX_LENGTH && (error.bufferedData = stream.getBufferedValue()), 
            reject(error);
          };
          (async () => {
            try {
              await streamPipelinePromisified(inputStream, stream), resolve();
            } catch (error) {
              rejectPromise(error);
            }
          })(), stream.on("data", (() => {
            stream.getBufferedLength() > maxBuffer && rejectPromise(new MaxBufferError);
          }));
        })), stream.getBufferedValue();
      }
      module.exports = getStream, module.exports.buffer = (stream, options) => getStream(stream, {
        ...options,
        encoding: "buffer"
      }), module.exports.array = (stream, options) => getStream(stream, {
        ...options,
        array: !0
      }), module.exports.MaxBufferError = MaxBufferError;
    },
    7: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.SIGNALS = void 0;
      exports.SIGNALS = [ {
        name: "SIGHUP",
        number: 1,
        action: "terminate",
        description: "Terminal closed",
        standard: "posix"
      }, {
        name: "SIGINT",
        number: 2,
        action: "terminate",
        description: "User interruption with CTRL-C",
        standard: "ansi"
      }, {
        name: "SIGQUIT",
        number: 3,
        action: "core",
        description: "User interruption with CTRL-\\",
        standard: "posix"
      }, {
        name: "SIGILL",
        number: 4,
        action: "core",
        description: "Invalid machine instruction",
        standard: "ansi"
      }, {
        name: "SIGTRAP",
        number: 5,
        action: "core",
        description: "Debugger breakpoint",
        standard: "posix"
      }, {
        name: "SIGABRT",
        number: 6,
        action: "core",
        description: "Aborted",
        standard: "ansi"
      }, {
        name: "SIGIOT",
        number: 6,
        action: "core",
        description: "Aborted",
        standard: "bsd"
      }, {
        name: "SIGBUS",
        number: 7,
        action: "core",
        description: "Bus error due to misaligned, non-existing address or paging error",
        standard: "bsd"
      }, {
        name: "SIGEMT",
        number: 7,
        action: "terminate",
        description: "Command should be emulated but is not implemented",
        standard: "other"
      }, {
        name: "SIGFPE",
        number: 8,
        action: "core",
        description: "Floating point arithmetic error",
        standard: "ansi"
      }, {
        name: "SIGKILL",
        number: 9,
        action: "terminate",
        description: "Forced termination",
        standard: "posix",
        forced: !0
      }, {
        name: "SIGUSR1",
        number: 10,
        action: "terminate",
        description: "Application-specific signal",
        standard: "posix"
      }, {
        name: "SIGSEGV",
        number: 11,
        action: "core",
        description: "Segmentation fault",
        standard: "ansi"
      }, {
        name: "SIGUSR2",
        number: 12,
        action: "terminate",
        description: "Application-specific signal",
        standard: "posix"
      }, {
        name: "SIGPIPE",
        number: 13,
        action: "terminate",
        description: "Broken pipe or socket",
        standard: "posix"
      }, {
        name: "SIGALRM",
        number: 14,
        action: "terminate",
        description: "Timeout or timer",
        standard: "posix"
      }, {
        name: "SIGTERM",
        number: 15,
        action: "terminate",
        description: "Termination",
        standard: "ansi"
      }, {
        name: "SIGSTKFLT",
        number: 16,
        action: "terminate",
        description: "Stack is empty or overflowed",
        standard: "other"
      }, {
        name: "SIGCHLD",
        number: 17,
        action: "ignore",
        description: "Child process terminated, paused or unpaused",
        standard: "posix"
      }, {
        name: "SIGCLD",
        number: 17,
        action: "ignore",
        description: "Child process terminated, paused or unpaused",
        standard: "other"
      }, {
        name: "SIGCONT",
        number: 18,
        action: "unpause",
        description: "Unpaused",
        standard: "posix",
        forced: !0
      }, {
        name: "SIGSTOP",
        number: 19,
        action: "pause",
        description: "Paused",
        standard: "posix",
        forced: !0
      }, {
        name: "SIGTSTP",
        number: 20,
        action: "pause",
        description: 'Paused using CTRL-Z or "suspend"',
        standard: "posix"
      }, {
        name: "SIGTTIN",
        number: 21,
        action: "pause",
        description: "Background process cannot read terminal input",
        standard: "posix"
      }, {
        name: "SIGBREAK",
        number: 21,
        action: "terminate",
        description: "User interruption with CTRL-BREAK",
        standard: "other"
      }, {
        name: "SIGTTOU",
        number: 22,
        action: "pause",
        description: "Background process cannot write to terminal output",
        standard: "posix"
      }, {
        name: "SIGURG",
        number: 23,
        action: "ignore",
        description: "Socket received out-of-band data",
        standard: "bsd"
      }, {
        name: "SIGXCPU",
        number: 24,
        action: "core",
        description: "Process timed out",
        standard: "bsd"
      }, {
        name: "SIGXFSZ",
        number: 25,
        action: "core",
        description: "File too big",
        standard: "bsd"
      }, {
        name: "SIGVTALRM",
        number: 26,
        action: "terminate",
        description: "Timeout or timer",
        standard: "bsd"
      }, {
        name: "SIGPROF",
        number: 27,
        action: "terminate",
        description: "Timeout or timer",
        standard: "bsd"
      }, {
        name: "SIGWINCH",
        number: 28,
        action: "ignore",
        description: "Terminal window size changed",
        standard: "bsd"
      }, {
        name: "SIGIO",
        number: 29,
        action: "terminate",
        description: "I/O is available",
        standard: "other"
      }, {
        name: "SIGPOLL",
        number: 29,
        action: "terminate",
        description: "Watched event",
        standard: "other"
      }, {
        name: "SIGINFO",
        number: 29,
        action: "ignore",
        description: "Request for process information",
        standard: "other"
      }, {
        name: "SIGPWR",
        number: 30,
        action: "terminate",
        description: "Device running out of power",
        standard: "systemv"
      }, {
        name: "SIGSYS",
        number: 31,
        action: "core",
        description: "Invalid system call",
        standard: "other"
      }, {
        name: "SIGUNUSED",
        number: 31,
        action: "terminate",
        description: "Invalid system call",
        standard: "other"
      } ];
    },
    787: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.signalsByNumber = exports.signalsByName = void 0;
      var _os = __webpack_require__(37), _signals = __webpack_require__(699), _realtime = __webpack_require__(603);
      const getSignalByName = function(signalByNameMemo, {name, number, description, supported, action, forced, standard}) {
        return {
          ...signalByNameMemo,
          [name]: {
            name,
            number,
            description,
            supported,
            action,
            forced,
            standard
          }
        };
      }, signalsByName = (0, _signals.getSignals)().reduce(getSignalByName, {});
      exports.signalsByName = signalsByName;
      const getSignalByNumber = function(number, signals) {
        const signal = findSignalByNumber(number, signals);
        if (void 0 === signal) return {};
        const {name, description, supported, action, forced, standard} = signal;
        return {
          [number]: {
            name,
            number,
            description,
            supported,
            action,
            forced,
            standard
          }
        };
      }, findSignalByNumber = function(number, signals) {
        const signal = signals.find((({name}) => _os.constants.signals[name] === number));
        return void 0 !== signal ? signal : signals.find((signalA => signalA.number === number));
      }, signalsByNumber = function() {
        const signals = (0, _signals.getSignals)(), length = _realtime.SIGRTMAX + 1, signalsA = Array.from({
          length
        }, ((value, number) => getSignalByNumber(number, signals)));
        return Object.assign({}, ...signalsA);
      }();
      exports.signalsByNumber = signalsByNumber;
    },
    603: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.SIGRTMAX = exports.getRealtimeSignals = void 0;
      exports.getRealtimeSignals = function() {
        const length = SIGRTMAX - SIGRTMIN + 1;
        return Array.from({
          length
        }, getRealtimeSignal);
      };
      const getRealtimeSignal = function(value, index) {
        return {
          name: `SIGRT${index + 1}`,
          number: SIGRTMIN + index,
          action: "terminate",
          description: "Application-specific signal (realtime)",
          standard: "posix"
        };
      }, SIGRTMIN = 34, SIGRTMAX = 64;
      exports.SIGRTMAX = SIGRTMAX;
    },
    699: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.getSignals = void 0;
      var _os = __webpack_require__(37), _core = __webpack_require__(7), _realtime = __webpack_require__(603);
      exports.getSignals = function() {
        const realtimeSignals = (0, _realtime.getRealtimeSignals)();
        return [ ..._core.SIGNALS, ...realtimeSignals ].map(normalizeSignal);
      };
      const normalizeSignal = function({name, number: defaultNumber, description, action, forced = !1, standard}) {
        const {signals: {[name]: constantSignal}} = _os.constants, supported = void 0 !== constantSignal;
        return {
          name,
          number: supported ? constantSignal : defaultNumber,
          description,
          supported,
          action,
          forced,
          standard
        };
      };
    },
    970: module => {
      "use strict";
      const isStream = stream => null !== stream && "object" == typeof stream && "function" == typeof stream.pipe;
      isStream.writable = stream => isStream(stream) && !1 !== stream.writable && "function" == typeof stream._write && "object" == typeof stream._writableState, 
      isStream.readable = stream => isStream(stream) && !1 !== stream.readable && "function" == typeof stream._read && "object" == typeof stream._readableState, 
      isStream.duplex = stream => isStream.writable(stream) && isStream.readable(stream), 
      isStream.transform = stream => isStream.duplex(stream) && "function" == typeof stream._transform, 
      module.exports = isStream;
    },
    601: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = isexe, isexe.sync = function(path, options) {
        return checkStat(fs.statSync(path), options);
      };
      var fs = __webpack_require__(147);
      function isexe(path, options, cb) {
        fs.stat(path, (function(er, stat) {
          cb(er, !er && checkStat(stat, options));
        }));
      }
      function checkStat(stat, options) {
        return stat.isFile() && function(stat, options) {
          var mod = stat.mode, uid = stat.uid, gid = stat.gid, myUid = void 0 !== options.uid ? options.uid : process.getuid && process.getuid(), myGid = void 0 !== options.gid ? options.gid : process.getgid && process.getgid(), u = parseInt("100", 8), g = parseInt("010", 8), o = parseInt("001", 8), ug = u | g;
          return mod & o || mod & g && gid === myGid || mod & u && uid === myUid || mod & ug && 0 === myUid;
        }(stat, options);
      }
    },
    429: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = isexe, isexe.sync = function(path, options) {
        return checkStat(fs.statSync(path), path, options);
      };
      var fs = __webpack_require__(147);
      function checkStat(stat, path, options) {
        return !(!stat.isSymbolicLink() && !stat.isFile()) && function(path, options) {
          var pathext = void 0 !== options.pathExt ? options.pathExt : process.env.PATHEXT;
          if (!pathext) return !0;
          if (-1 !== (pathext = pathext.split(";")).indexOf("")) return !0;
          for (var i = 0; i < pathext.length; i++) {
            var p = pathext[i].toLowerCase();
            if (p && path.substr(-p.length).toLowerCase() === p) return !0;
          }
          return !1;
        }(path, options);
      }
      function isexe(path, options, cb) {
        fs.stat(path, (function(er, stat) {
          cb(er, !er && checkStat(stat, path, options));
        }));
      }
    },
    34: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const {PassThrough} = __webpack_require__(781);
      module.exports = function() {
        var sources = [], output = new PassThrough({
          objectMode: !0
        });
        return output.setMaxListeners(0), output.add = add, output.isEmpty = isEmpty, output.on("unpipe", remove), 
        Array.prototype.slice.call(arguments).forEach(add), output;
        function add(source) {
          return Array.isArray(source) ? (source.forEach(add), this) : (sources.push(source), 
          source.once("end", remove.bind(null, source)), source.once("error", output.emit.bind(output, "error")), 
          source.pipe(output, {
            end: !1
          }), this);
        }
        function isEmpty() {
          return 0 == sources.length;
        }
        function remove(source) {
          !(sources = sources.filter((function(it) {
            return it !== source;
          }))).length && output.readable && output.end();
        }
      };
    },
    341: module => {
      "use strict";
      const mimicFn = (to, from) => {
        for (const prop of Reflect.ownKeys(from)) Object.defineProperty(to, prop, Object.getOwnPropertyDescriptor(from, prop));
        return to;
      };
      module.exports = mimicFn, module.exports.default = mimicFn;
    },
    662: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const path = __webpack_require__(17), pathKey = __webpack_require__(24), npmRunPath = options => {
        let previous;
        options = {
          cwd: process.cwd(),
          path: process.env[pathKey()],
          execPath: process.execPath,
          ...options
        };
        let cwdPath = path.resolve(options.cwd);
        const result = [];
        for (;previous !== cwdPath; ) result.push(path.join(cwdPath, "node_modules/.bin")), 
        previous = cwdPath, cwdPath = path.resolve(cwdPath, "..");
        const execPathDir = path.resolve(options.cwd, options.execPath, "..");
        return result.push(execPathDir), result.concat(options.path).join(path.delimiter);
      };
      module.exports = npmRunPath, module.exports.default = npmRunPath, module.exports.env = options => {
        const env = {
          ...(options = {
            env: process.env,
            ...options
          }).env
        }, path = pathKey({
          env
        });
        return options.path = env[path], env[path] = module.exports(options), env;
      };
    },
    678: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const mimicFn = __webpack_require__(341), calledFunctions = new WeakMap, onetime = (function_, options = {}) => {
        if ("function" != typeof function_) throw new TypeError("Expected a function");
        let returnValue, callCount = 0;
        const functionName = function_.displayName || function_.name || "<anonymous>", onetime = function(...arguments_) {
          if (calledFunctions.set(onetime, ++callCount), 1 === callCount) returnValue = function_.apply(this, arguments_), 
          function_ = null; else if (!0 === options.throw) throw new Error(`Function \`${functionName}\` can only be called once`);
          return returnValue;
        };
        return mimicFn(onetime, function_), calledFunctions.set(onetime, callCount), onetime;
      };
      module.exports = onetime, module.exports.default = onetime, module.exports.callCount = function_ => {
        if (!calledFunctions.has(function_)) throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
        return calledFunctions.get(function_);
      };
    },
    24: module => {
      "use strict";
      const pathKey = (options = {}) => {
        const environment = options.env || process.env;
        return "win32" !== (options.platform || process.platform) ? "PATH" : Object.keys(environment).reverse().find((key => "PATH" === key.toUpperCase())) || "Path";
      };
      module.exports = pathKey, module.exports.default = pathKey;
    },
    63: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const shebangRegex = __webpack_require__(395);
      module.exports = (string = "") => {
        const match = string.match(shebangRegex);
        if (!match) return null;
        const [path, argument] = match[0].replace(/#! ?/, "").split(" "), binary = path.split("/").pop();
        return "env" === binary ? argument : argument ? `${binary} ${argument}` : binary;
      };
    },
    395: module => {
      "use strict";
      module.exports = /^#!(.*)/;
    },
    908: (module, __unused_webpack_exports, __webpack_require__) => {
      var emitter, assert = __webpack_require__(491), signals = __webpack_require__(397), isWin = /^win/i.test(process.platform), EE = __webpack_require__(361);
      function unload() {
        loaded && (loaded = !1, signals.forEach((function(sig) {
          try {
            process.removeListener(sig, sigListeners[sig]);
          } catch (er) {}
        })), process.emit = originalProcessEmit, process.reallyExit = originalProcessReallyExit, 
        emitter.count -= 1);
      }
      function emit(event, code, signal) {
        emitter.emitted[event] || (emitter.emitted[event] = !0, emitter.emit(event, code, signal));
      }
      "function" != typeof EE && (EE = EE.EventEmitter), process.__signal_exit_emitter__ ? emitter = process.__signal_exit_emitter__ : ((emitter = process.__signal_exit_emitter__ = new EE).count = 0, 
      emitter.emitted = {}), emitter.infinite || (emitter.setMaxListeners(1 / 0), emitter.infinite = !0), 
      module.exports = function(cb, opts) {
        assert.equal(typeof cb, "function", "a callback must be provided for exit handler"), 
        !1 === loaded && load();
        var ev = "exit";
        opts && opts.alwaysLast && (ev = "afterexit");
        return emitter.on(ev, cb), function() {
          emitter.removeListener(ev, cb), 0 === emitter.listeners("exit").length && 0 === emitter.listeners("afterexit").length && unload();
        };
      }, module.exports.unload = unload;
      var sigListeners = {};
      signals.forEach((function(sig) {
        sigListeners[sig] = function() {
          process.listeners(sig).length === emitter.count && (unload(), emit("exit", null, sig), 
          emit("afterexit", null, sig), isWin && "SIGHUP" === sig && (sig = "SIGINT"), process.kill(process.pid, sig));
        };
      })), module.exports.signals = function() {
        return signals;
      }, module.exports.load = load;
      var loaded = !1;
      function load() {
        loaded || (loaded = !0, emitter.count += 1, signals = signals.filter((function(sig) {
          try {
            return process.on(sig, sigListeners[sig]), !0;
          } catch (er) {
            return !1;
          }
        })), process.emit = processEmit, process.reallyExit = processReallyExit);
      }
      var originalProcessReallyExit = process.reallyExit;
      function processReallyExit(code) {
        process.exitCode = code || 0, emit("exit", process.exitCode, null), emit("afterexit", process.exitCode, null), 
        originalProcessReallyExit.call(process, process.exitCode);
      }
      var originalProcessEmit = process.emit;
      function processEmit(ev, arg) {
        if ("exit" === ev) {
          void 0 !== arg && (process.exitCode = arg);
          var ret = originalProcessEmit.apply(this, arguments);
          return emit("exit", process.exitCode, null), emit("afterexit", process.exitCode, null), 
          ret;
        }
        return originalProcessEmit.apply(this, arguments);
      }
    },
    397: module => {
      module.exports = [ "SIGABRT", "SIGALRM", "SIGHUP", "SIGINT", "SIGTERM" ], "win32" !== process.platform && module.exports.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT"), 
      "linux" === process.platform && module.exports.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
    },
    150: module => {
      "use strict";
      module.exports = input => {
        const LF = "string" == typeof input ? "\n" : "\n".charCodeAt(), CR = "string" == typeof input ? "\r" : "\r".charCodeAt();
        return input[input.length - 1] === LF && (input = input.slice(0, input.length - 1)), 
        input[input.length - 1] === CR && (input = input.slice(0, input.length - 1)), input;
      };
    },
    508: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const path = __webpack_require__(17), childProcess = __webpack_require__(81), crossSpawn = {
        _parse: __webpack_require__(605)
      }, stripFinalNewline = __webpack_require__(150), npmRunPath = __webpack_require__(662), onetime = __webpack_require__(678), makeError = __webpack_require__(353), normalizeStdio = __webpack_require__(111), {spawnedKill, spawnedCancel, setupTimeout, validateTimeout, setExitHandler} = __webpack_require__(820), {handleInput, getSpawnedResult, makeAllStream, validateInputSync} = __webpack_require__(994), {mergePromise, getSpawnedPromise} = __webpack_require__(708), {joinCommand, parseCommand, getEscapedCommand} = __webpack_require__(77), handleArguments = (file, args, options = {}) => {
        const parsed = crossSpawn._parse(file, args, options);
        return file = parsed.command, args = parsed.args, (options = {
          maxBuffer: 1e8,
          buffer: !0,
          stripFinalNewline: !0,
          extendEnv: !0,
          preferLocal: !1,
          localDir: (options = parsed.options).cwd || process.cwd(),
          execPath: process.execPath,
          encoding: "utf8",
          reject: !0,
          cleanup: !0,
          all: !1,
          windowsHide: !0,
          ...options
        }).env = (({env: envOption, extendEnv, preferLocal, localDir, execPath}) => {
          const env = extendEnv ? {
            ...process.env,
            ...envOption
          } : envOption;
          return preferLocal ? npmRunPath.env({
            env,
            cwd: localDir,
            execPath
          }) : env;
        })(options), options.stdio = normalizeStdio(options), "win32" === process.platform && "cmd" === path.basename(file, ".exe") && args.unshift("/q"), 
        {
          file,
          args,
          options,
          parsed
        };
      }, handleOutput = (options, value, error) => "string" == typeof value || Buffer.isBuffer(value) ? options.stripFinalNewline ? stripFinalNewline(value) : value : void 0 === error ? void 0 : "", execa = (file, args, options) => {
        const parsed = handleArguments(file, args, options), command = joinCommand(file, args), escapedCommand = getEscapedCommand(file, args);
        let spawned;
        validateTimeout(parsed.options);
        try {
          spawned = childProcess.spawn(parsed.file, parsed.args, parsed.options);
        } catch (error) {
          const dummySpawned = new childProcess.ChildProcess, errorPromise = Promise.reject(makeError({
            error,
            stdout: "",
            stderr: "",
            all: "",
            command,
            escapedCommand,
            parsed,
            timedOut: !1,
            isCanceled: !1,
            killed: !1
          }));
          return mergePromise(dummySpawned, errorPromise);
        }
        const spawnedPromise = getSpawnedPromise(spawned), timedPromise = setupTimeout(spawned, parsed.options, spawnedPromise), processDone = setExitHandler(spawned, parsed.options, timedPromise), context = {
          isCanceled: !1
        };
        spawned.kill = spawnedKill.bind(null, spawned.kill.bind(spawned)), spawned.cancel = spawnedCancel.bind(null, spawned, context);
        const handlePromiseOnce = onetime((async () => {
          const [{error, exitCode, signal, timedOut}, stdoutResult, stderrResult, allResult] = await getSpawnedResult(spawned, parsed.options, processDone), stdout = handleOutput(parsed.options, stdoutResult), stderr = handleOutput(parsed.options, stderrResult), all = handleOutput(parsed.options, allResult);
          if (error || 0 !== exitCode || null !== signal) {
            const returnedError = makeError({
              error,
              exitCode,
              signal,
              stdout,
              stderr,
              all,
              command,
              escapedCommand,
              parsed,
              timedOut,
              isCanceled: context.isCanceled,
              killed: spawned.killed
            });
            if (!parsed.options.reject) return returnedError;
            throw returnedError;
          }
          return {
            command,
            escapedCommand,
            exitCode: 0,
            stdout,
            stderr,
            all,
            failed: !1,
            timedOut: !1,
            isCanceled: !1,
            killed: !1
          };
        }));
        return handleInput(spawned, parsed.options.input), spawned.all = makeAllStream(spawned, parsed.options), 
        mergePromise(spawned, handlePromiseOnce);
      };
      module.exports = execa, module.exports.sync = (file, args, options) => {
        const parsed = handleArguments(file, args, options), command = joinCommand(file, args), escapedCommand = getEscapedCommand(file, args);
        let result;
        validateInputSync(parsed.options);
        try {
          result = childProcess.spawnSync(parsed.file, parsed.args, parsed.options);
        } catch (error) {
          throw makeError({
            error,
            stdout: "",
            stderr: "",
            all: "",
            command,
            escapedCommand,
            parsed,
            timedOut: !1,
            isCanceled: !1,
            killed: !1
          });
        }
        const stdout = handleOutput(parsed.options, result.stdout, result.error), stderr = handleOutput(parsed.options, result.stderr, result.error);
        if (result.error || 0 !== result.status || null !== result.signal) {
          const error = makeError({
            stdout,
            stderr,
            error: result.error,
            signal: result.signal,
            exitCode: result.status,
            command,
            escapedCommand,
            parsed,
            timedOut: result.error && "ETIMEDOUT" === result.error.code,
            isCanceled: !1,
            killed: null !== result.signal
          });
          if (!parsed.options.reject) return error;
          throw error;
        }
        return {
          command,
          escapedCommand,
          exitCode: 0,
          stdout,
          stderr,
          failed: !1,
          timedOut: !1,
          isCanceled: !1,
          killed: !1
        };
      }, module.exports.command = (command, options) => {
        const [file, ...args] = parseCommand(command);
        return execa(file, args, options);
      }, module.exports.commandSync = (command, options) => {
        const [file, ...args] = parseCommand(command);
        return execa.sync(file, args, options);
      }, module.exports.node = (scriptPath, args, options = {}) => {
        args && !Array.isArray(args) && "object" == typeof args && (options = args, args = []);
        const stdio = normalizeStdio.node(options), defaultExecArgv = process.execArgv.filter((arg => !arg.startsWith("--inspect"))), {nodePath = process.execPath, nodeOptions = defaultExecArgv} = options;
        return execa(nodePath, [ ...nodeOptions, scriptPath, ...Array.isArray(args) ? args : [] ], {
          ...options,
          stdin: void 0,
          stdout: void 0,
          stderr: void 0,
          stdio,
          shell: !1
        });
      };
    },
    567: (module, __unused_webpack_exports, __webpack_require__) => {
      var core;
      function isexe(path, options, cb) {
        if ("function" == typeof options && (cb = options, options = {}), !cb) {
          if ("function" != typeof Promise) throw new TypeError("callback not provided");
          return new Promise((function(resolve, reject) {
            isexe(path, options || {}, (function(er, is) {
              er ? reject(er) : resolve(is);
            }));
          }));
        }
        core(path, options || {}, (function(er, is) {
          er && ("EACCES" === er.code || options && options.ignoreErrors) && (er = null, is = !1), 
          cb(er, is);
        }));
      }
      core = "win32" === process.platform || global.TESTING_WINDOWS ? __webpack_require__(429) : __webpack_require__(601), 
      module.exports = isexe, isexe.sync = function(path, options) {
        try {
          return core.sync(path, options || {});
        } catch (er) {
          if (options && options.ignoreErrors || "EACCES" === er.code) return !1;
          throw er;
        }
      };
    },
    806: (module, __unused_webpack_exports, __webpack_require__) => {
      const isWindows = "win32" === process.platform || "cygwin" === process.env.OSTYPE || "msys" === process.env.OSTYPE, path = __webpack_require__(17), COLON = isWindows ? ";" : ":", isexe = __webpack_require__(567), getNotFoundError = cmd => Object.assign(new Error(`not found: ${cmd}`), {
        code: "ENOENT"
      }), getPathInfo = (cmd, opt) => {
        const colon = opt.colon || COLON, pathEnv = cmd.match(/\//) || isWindows && cmd.match(/\\/) ? [ "" ] : [ ...isWindows ? [ process.cwd() ] : [], ...(opt.path || process.env.PATH || "").split(colon) ], pathExtExe = isWindows ? opt.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "", pathExt = isWindows ? pathExtExe.split(colon) : [ "" ];
        return isWindows && -1 !== cmd.indexOf(".") && "" !== pathExt[0] && pathExt.unshift(""), 
        {
          pathEnv,
          pathExt,
          pathExtExe
        };
      }, which = (cmd, opt, cb) => {
        "function" == typeof opt && (cb = opt, opt = {}), opt || (opt = {});
        const {pathEnv, pathExt, pathExtExe} = getPathInfo(cmd, opt), found = [], step = i => new Promise(((resolve, reject) => {
          if (i === pathEnv.length) return opt.all && found.length ? resolve(found) : reject(getNotFoundError(cmd));
          const ppRaw = pathEnv[i], pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw, pCmd = path.join(pathPart, cmd), p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
          resolve(subStep(p, i, 0));
        })), subStep = (p, i, ii) => new Promise(((resolve, reject) => {
          if (ii === pathExt.length) return resolve(step(i + 1));
          const ext = pathExt[ii];
          isexe(p + ext, {
            pathExt: pathExtExe
          }, ((er, is) => {
            if (!er && is) {
              if (!opt.all) return resolve(p + ext);
              found.push(p + ext);
            }
            return resolve(subStep(p, i, ii + 1));
          }));
        }));
        return cb ? step(0).then((res => cb(null, res)), cb) : step(0);
      };
      module.exports = which, which.sync = (cmd, opt) => {
        opt = opt || {};
        const {pathEnv, pathExt, pathExtExe} = getPathInfo(cmd, opt), found = [];
        for (let i = 0; i < pathEnv.length; i++) {
          const ppRaw = pathEnv[i], pathPart = /^".*"$/.test(ppRaw) ? ppRaw.slice(1, -1) : ppRaw, pCmd = path.join(pathPart, cmd), p = !pathPart && /^\.[\\\/]/.test(cmd) ? cmd.slice(0, 2) + pCmd : pCmd;
          for (let j = 0; j < pathExt.length; j++) {
            const cur = p + pathExt[j];
            try {
              if (isexe.sync(cur, {
                pathExt: pathExtExe
              })) {
                if (!opt.all) return cur;
                found.push(cur);
              }
            } catch (ex) {}
          }
        }
        if (opt.all && found.length) return found;
        if (opt.nothrow) return null;
        throw getNotFoundError(cmd);
      };
    },
    491: module => {
      "use strict";
      module.exports = require("assert");
    },
    300: module => {
      "use strict";
      module.exports = require("buffer");
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
    781: module => {
      "use strict";
      module.exports = require("stream");
    },
    837: module => {
      "use strict";
      module.exports = require("util");
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
  }(508);
  module.exports = __webpack_exports__;
})();