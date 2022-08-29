(() => {
  var __webpack_modules__ = {
    1365: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = {
        version: __webpack_require__(5027),
        stringifyInfo: __webpack_require__(3295),
        stringifyStream: __webpack_require__(549),
        parseChunked: __webpack_require__(2259)
      };
    },
    2259: (module, __unused_webpack_exports, __webpack_require__) => {
      const {isReadableStream} = __webpack_require__(7374), TextDecoder = __webpack_require__(5602), decoder = new TextDecoder;
      function isObject(value) {
        return null !== value && "object" == typeof value;
      }
      function adjustPosition(error, parser) {
        return "SyntaxError" === error.name && parser.jsonParseOffset && (error.message = error.message.replace(/at position (\d+)/, ((_, pos) => "at position " + (Number(pos) + parser.jsonParseOffset)))), 
        error;
      }
      module.exports = function(chunkEmitter) {
        let parser = new ChunkParser;
        if (isObject(chunkEmitter) && isReadableStream(chunkEmitter)) return new Promise(((resolve, reject) => {
          chunkEmitter.on("data", (chunk => {
            try {
              parser.push(chunk);
            } catch (e) {
              reject(adjustPosition(e, parser)), parser = null;
            }
          })).on("error", (e => {
            parser = null, reject(e);
          })).on("end", (() => {
            try {
              resolve(parser.finish());
            } catch (e) {
              reject(adjustPosition(e, parser));
            } finally {
              parser = null;
            }
          }));
        }));
        if ("function" == typeof chunkEmitter) {
          const iterator = chunkEmitter();
          if (isObject(iterator) && (Symbol.iterator in iterator || Symbol.asyncIterator in iterator)) return new Promise((async (resolve, reject) => {
            try {
              for await (const chunk of iterator) parser.push(chunk);
              resolve(parser.finish());
            } catch (e) {
              reject(adjustPosition(e, parser));
            } finally {
              parser = null;
            }
          }));
        }
        throw new Error("Chunk emitter should be readable stream, generator, async generator or function returning an iterable object");
      };
      class ChunkParser {
        constructor() {
          this.value = void 0, this.valueStack = null, this.stack = new Array(100), this.lastFlushDepth = 0, 
          this.flushDepth = 0, this.stateString = !1, this.stateStringEscape = !1, this.pendingByteSeq = null, 
          this.pendingChunk = null, this.chunkOffset = 0, this.jsonParseOffset = 0;
        }
        parseAndAppend(fragment, wrap) {
          1 === this.stack[this.lastFlushDepth - 1] ? (wrap && (this.jsonParseOffset--, fragment = "{" + fragment + "}"), 
          Object.assign(this.valueStack.value, JSON.parse(fragment))) : (wrap && (this.jsonParseOffset--, 
          fragment = "[" + fragment + "]"), function(array, elements) {
            const initialLength = array.length;
            array.length += elements.length;
            for (let i = 0; i < elements.length; i++) array[initialLength + i] = elements[i];
          }(this.valueStack.value, JSON.parse(fragment)));
        }
        prepareAddition(fragment) {
          const {value} = this.valueStack;
          if (Array.isArray(value) ? 0 !== value.length : 0 !== Object.keys(value).length) {
            if ("," === fragment[0]) return this.jsonParseOffset++, fragment.slice(1);
            if ("}" !== fragment[0] && "]" !== fragment[0]) return this.jsonParseOffset -= 3, 
            "[[]" + fragment;
          }
          return fragment;
        }
        flush(chunk, start, end) {
          let fragment = chunk.slice(start, end);
          if (this.jsonParseOffset = this.chunkOffset + start, null !== this.pendingChunk && (fragment = this.pendingChunk + fragment, 
          this.jsonParseOffset -= this.pendingChunk.length, this.pendingChunk = null), this.flushDepth === this.lastFlushDepth) this.flushDepth > 0 ? this.parseAndAppend(this.prepareAddition(fragment), !0) : (this.value = JSON.parse(fragment), 
          this.valueStack = {
            value: this.value,
            prev: null
          }); else if (this.flushDepth > this.lastFlushDepth) {
            for (let i = this.flushDepth - 1; i >= this.lastFlushDepth; i--) fragment += 1 === this.stack[i] ? "}" : "]";
            0 === this.lastFlushDepth ? (this.value = JSON.parse(fragment), this.valueStack = {
              value: this.value,
              prev: null
            }) : this.parseAndAppend(this.prepareAddition(fragment), !0);
            for (let i = this.lastFlushDepth || 1; i < this.flushDepth; i++) {
              let value = this.valueStack.value;
              if (1 === this.stack[i - 1]) {
                let key;
                for (key in value) ;
                value = value[key];
              } else value = value[value.length - 1];
              this.valueStack = {
                value,
                prev: this.valueStack
              };
            }
          } else {
            fragment = this.prepareAddition(fragment);
            for (let i = this.lastFlushDepth - 1; i >= this.flushDepth; i--) this.jsonParseOffset--, 
            fragment = (1 === this.stack[i] ? "{" : "[") + fragment;
            this.parseAndAppend(fragment, !1);
            for (let i = this.lastFlushDepth - 1; i >= this.flushDepth; i--) this.valueStack = this.valueStack.prev;
          }
          this.lastFlushDepth = this.flushDepth;
        }
        push(chunk) {
          if ("string" != typeof chunk) {
            if (null !== this.pendingByteSeq) {
              const origRawChunk = chunk;
              (chunk = new Uint8Array(this.pendingByteSeq.length + origRawChunk.length)).set(this.pendingByteSeq), 
              chunk.set(origRawChunk, this.pendingByteSeq.length), this.pendingByteSeq = null;
            }
            if (chunk[chunk.length - 1] > 127) for (let seqLength = 0; seqLength < chunk.length; seqLength++) {
              const byte = chunk[chunk.length - 1 - seqLength];
              if (byte >> 6 == 3) {
                seqLength++, (4 !== seqLength && byte >> 3 == 30 || 3 !== seqLength && byte >> 4 == 14 || 2 !== seqLength && byte >> 5 == 6) && (this.pendingByteSeq = chunk.slice(chunk.length - seqLength), 
                chunk = chunk.slice(0, -seqLength));
                break;
              }
            }
            chunk = decoder.decode(chunk);
          }
          const chunkLength = chunk.length;
          let lastFlushPoint = 0, flushPoint = 0;
          scan: for (let i = 0; i < chunkLength; i++) {
            if (this.stateString) {
              for (;i < chunkLength; i++) if (this.stateStringEscape) this.stateStringEscape = !1; else switch (chunk.charCodeAt(i)) {
               case 34:
                this.stateString = !1;
                continue scan;

               case 92:
                this.stateStringEscape = !0;
              }
              break;
            }
            switch (chunk.charCodeAt(i)) {
             case 34:
              this.stateString = !0, this.stateStringEscape = !1;
              break;

             case 44:
              flushPoint = i;
              break;

             case 123:
              flushPoint = i + 1, this.stack[this.flushDepth++] = 1;
              break;

             case 91:
              flushPoint = i + 1, this.stack[this.flushDepth++] = 2;
              break;

             case 93:
             case 125:
              flushPoint = i + 1, this.flushDepth--, this.flushDepth < this.lastFlushDepth && (this.flush(chunk, lastFlushPoint, flushPoint), 
              lastFlushPoint = flushPoint);
              break;

             case 9:
             case 10:
             case 13:
             case 32:
              lastFlushPoint === i && lastFlushPoint++, flushPoint === i && flushPoint++;
            }
          }
          flushPoint > lastFlushPoint && this.flush(chunk, lastFlushPoint, flushPoint), flushPoint < chunkLength && (null !== this.pendingChunk ? this.pendingChunk += chunk : this.pendingChunk = chunk.slice(flushPoint, chunkLength)), 
          this.chunkOffset += chunkLength;
        }
        finish() {
          return null !== this.pendingChunk && (this.flush("", 0, 0), this.pendingChunk = null), 
          this.value;
        }
      }
    },
    3295: (module, __unused_webpack_exports, __webpack_require__) => {
      const {normalizeReplacer, normalizeSpace, replaceValue, getTypeNative, getTypeAsync, isLeadingSurrogate, isTrailingSurrogate, escapableCharCodeSubstitution, type: {PRIMITIVE, OBJECT, ARRAY, PROMISE, STRING_STREAM, OBJECT_STREAM}} = __webpack_require__(7374), charLength2048 = Array.from({
        length: 2048
      }).map(((_, code) => escapableCharCodeSubstitution.hasOwnProperty(code) ? 2 : code < 32 ? 6 : code < 128 ? 1 : 2));
      function stringLength(str) {
        let len = 0, prevLeadingSurrogate = !1;
        for (let i = 0; i < str.length; i++) {
          const code = str.charCodeAt(i);
          if (code < 2048) len += charLength2048[code]; else {
            if (isLeadingSurrogate(code)) {
              len += 6, prevLeadingSurrogate = !0;
              continue;
            }
            isTrailingSurrogate(code) ? len = prevLeadingSurrogate ? len - 2 : len + 6 : len += 3;
          }
          prevLeadingSurrogate = !1;
        }
        return len + 2;
      }
      module.exports = function(value, replacer, space, options) {
        let allowlist = null;
        replacer = normalizeReplacer(replacer), Array.isArray(replacer) && (allowlist = new Set(replacer), 
        replacer = null), space = function(space) {
          return "string" == typeof (space = normalizeSpace(space)) ? space.length : 0;
        }(space), options = options || {};
        const visited = new Map, stack = new Set, duplicate = new Set, circular = new Set, async = new Set, getType = options.async ? getTypeAsync : getTypeNative, root = {
          "": value
        };
        let stop = !1, length = 0;
        return function walk(holder, key, value) {
          if (stop) return;
          value = replaceValue(holder, key, value, replacer);
          let type = getType(value);
          if (type !== PRIMITIVE && stack.has(value)) return circular.add(value), length += 4, 
          void (options.continueOnCircular || (stop = !0));
          switch (type) {
           case PRIMITIVE:
            void 0 !== value || Array.isArray(holder) ? length += function(value) {
              switch (typeof value) {
               case "string":
                return stringLength(value);

               case "number":
                return Number.isFinite(value) ? String(value).length : 4;

               case "boolean":
                return value ? 4 : 5;

               case "undefined":
               case "object":
                return 4;

               default:
                return 0;
              }
            }(value) : holder === root && (length += 9);
            break;

           case OBJECT:
            {
              if (visited.has(value)) {
                duplicate.add(value), length += visited.get(value);
                break;
              }
              const valueLength = length;
              let entries = 0;
              length += 2, stack.add(value);
              for (const key in value) if (hasOwnProperty.call(value, key) && (null === allowlist || allowlist.has(key))) {
                const prevLength = length;
                walk(value, key, value[key]), prevLength !== length && (length += stringLength(key) + 1, 
                entries++);
              }
              entries > 1 && (length += entries - 1), stack.delete(value), space > 0 && entries > 0 && (length += (1 + (stack.size + 1) * space + 1) * entries, 
              length += 1 + stack.size * space), visited.set(value, length - valueLength);
              break;
            }

           case ARRAY:
            {
              if (visited.has(value)) {
                duplicate.add(value), length += visited.get(value);
                break;
              }
              const valueLength = length;
              length += 2, stack.add(value);
              for (let i = 0; i < value.length; i++) walk(value, i, value[i]);
              value.length > 1 && (length += value.length - 1), stack.delete(value), space > 0 && value.length > 0 && (length += (1 + (stack.size + 1) * space) * value.length, 
              length += 1 + stack.size * space), visited.set(value, length - valueLength);
              break;
            }

           case PROMISE:
           case STRING_STREAM:
            async.add(value);
            break;

           case OBJECT_STREAM:
            length += 2, async.add(value);
          }
        }(root, "", value), {
          minLength: isNaN(length) ? 1 / 0 : length,
          circular: [ ...circular ],
          duplicate: [ ...duplicate ],
          async: [ ...async ]
        };
      };
    },
    549: (module, __unused_webpack_exports, __webpack_require__) => {
      const {Readable} = __webpack_require__(2781), {normalizeReplacer, normalizeSpace, replaceValue, getTypeAsync, type: {PRIMITIVE, OBJECT, ARRAY, PROMISE, STRING_STREAM, OBJECT_STREAM}} = __webpack_require__(7374), noop = () => {}, hasOwnProperty = Object.prototype.hasOwnProperty, wellformedStringStringify = '"\\ud800"' === JSON.stringify("\ud800") ? JSON.stringify : s => JSON.stringify(s).replace(/\p{Surrogate}/gu, (m => `\\u${m.charCodeAt(0).toString(16)}`));
      function push() {
        this.push(this._stack.value), this.popStack();
      }
      function pushPrimitive(value) {
        switch (typeof value) {
         case "string":
          this.push(this.encodeString(value));
          break;

         case "number":
          this.push(Number.isFinite(value) ? this.encodeNumber(value) : "null");
          break;

         case "boolean":
          this.push(value ? "true" : "false");
          break;

         case "undefined":
         case "object":
          this.push("null");
          break;

         default:
          this.destroy(new TypeError(`Do not know how to serialize a ${value.constructor && value.constructor.name || typeof value}`));
        }
      }
      function processObjectEntry(key) {
        const current = this._stack;
        current.first ? this.push(",") : current.first = !0, this.space ? this.push(`\n${this.space.repeat(this._depth)}${this.encodeString(key)}: `) : this.push(this.encodeString(key) + ":");
      }
      function processObject() {
        const current = this._stack;
        if (current.index === current.keys.length) return this.space && current.first ? this.push(`\n${this.space.repeat(this._depth - 1)}}`) : this.push("}"), 
        void this.popStack();
        const key = current.keys[current.index];
        this.processValue(current.value, key, current.value[key], processObjectEntry), current.index++;
      }
      function processArrayItem(index) {
        0 !== index && this.push(","), this.space && this.push(`\n${this.space.repeat(this._depth)}`);
      }
      function processArray() {
        const current = this._stack;
        if (current.index === current.value.length) return this.space && current.index > 0 ? this.push(`\n${this.space.repeat(this._depth - 1)}]`) : this.push("]"), 
        void this.popStack();
        this.processValue(current.value, current.index, current.value[current.index], processArrayItem), 
        current.index++;
      }
      function createStreamReader(fn) {
        return function() {
          const current = this._stack, data = current.value.read(this._readSize);
          null !== data ? (current.first = !1, fn.call(this, data, current)) : current.first && !current.value._readableState.reading || current.ended ? this.popStack() : (current.first = !0, 
          current.awaiting = !0);
        };
      }
      const processReadableObject = createStreamReader((function(data, current) {
        this.processValue(current.value, current.index, data, processArrayItem), current.index++;
      })), processReadableString = createStreamReader((function(data) {
        this.push(data);
      }));
      class JsonStringifyStream extends Readable {
        constructor(value, replacer, space) {
          if (super({
            autoDestroy: !0
          }), this.getKeys = Object.keys, this.replacer = normalizeReplacer(replacer), Array.isArray(this.replacer)) {
            const allowlist = this.replacer;
            this.getKeys = value => allowlist.filter((key => hasOwnProperty.call(value, key))), 
            this.replacer = null;
          }
          this.space = normalizeSpace(space), this._depth = 0, this.error = null, this._processing = !1, 
          this._ended = !1, this._readSize = 0, this._buffer = "", this._stack = null, this._visited = new WeakSet, 
          this.pushStack({
            handler: () => {
              this.popStack(), this.processValue({
                "": value
              }, "", value, noop);
            }
          });
        }
        encodeString(value) {
          return /[^\x20-\uD799]|[\x22\x5c]/.test(value) ? wellformedStringStringify(value) : '"' + value + '"';
        }
        encodeNumber(value) {
          return value;
        }
        processValue(holder, key, value, callback) {
          value = replaceValue(holder, key, value, this.replacer);
          let type = getTypeAsync(value);
          switch (type) {
           case PRIMITIVE:
            callback === processObjectEntry && void 0 === value || (callback.call(this, key), 
            pushPrimitive.call(this, value));
            break;

           case OBJECT:
            if (callback.call(this, key), this._visited.has(value)) return this.destroy(new TypeError("Converting circular structure to JSON"));
            this._visited.add(value), this._depth++, this.push("{"), this.pushStack({
              handler: processObject,
              value,
              index: 0,
              first: !1,
              keys: this.getKeys(value)
            });
            break;

           case ARRAY:
            if (callback.call(this, key), this._visited.has(value)) return this.destroy(new TypeError("Converting circular structure to JSON"));
            this._visited.add(value), this.push("["), this.pushStack({
              handler: processArray,
              value,
              index: 0
            }), this._depth++;
            break;

           case PROMISE:
            this.pushStack({
              handler: noop,
              awaiting: !0
            }), Promise.resolve(value).then((resolved => {
              this.popStack(), this.processValue(holder, key, resolved, callback), this.processStack();
            })).catch((error => {
              this.destroy(error);
            }));
            break;

           case STRING_STREAM:
           case OBJECT_STREAM:
            if (callback.call(this, key), value.readableEnded || value._readableState.endEmitted) return this.destroy(new Error("Readable Stream has ended before it was serialized. All stream data have been lost"));
            if (value.readableFlowing) return this.destroy(new Error("Readable Stream is in flowing mode, data may have been lost. Trying to pause stream."));
            type === OBJECT_STREAM && (this.push("["), this.pushStack({
              handler: push,
              value: this.space ? "\n" + this.space.repeat(this._depth) + "]" : "]"
            }), this._depth++);
            const self = this.pushStack({
              handler: type === OBJECT_STREAM ? processReadableObject : processReadableString,
              value,
              index: 0,
              first: !1,
              ended: !1,
              awaiting: !value.readable || 0 === value.readableLength
            }), continueProcessing = () => {
              self.awaiting && (self.awaiting = !1, this.processStack());
            };
            value.once("error", (error => this.destroy(error))), value.once("end", (() => {
              self.ended = !0, continueProcessing();
            })), value.on("readable", continueProcessing);
          }
        }
        pushStack(node) {
          return node.prev = this._stack, this._stack = node;
        }
        popStack() {
          const {handler, value} = this._stack;
          handler !== processObject && handler !== processArray && handler !== processReadableObject || (this._visited.delete(value), 
          this._depth--), this._stack = this._stack.prev;
        }
        processStack() {
          if (!this._processing && !this._ended) {
            try {
              for (this._processing = !0; null !== this._stack && !this._stack.awaiting; ) if (this._stack.handler.call(this), 
              !this._processing) return;
              this._processing = !1;
            } catch (error) {
              return void this.destroy(error);
            }
            null !== this._stack || this._ended || (this._finish(), this.push(null));
          }
        }
        push(data) {
          if (null !== data) {
            if (this._buffer += data, this._buffer.length < this._readSize) return;
            data = this._buffer, this._buffer = "", this._processing = !1;
          }
          super.push(data);
        }
        _read(size) {
          this._readSize = size || this.readableHighWaterMark, this.processStack();
        }
        _finish() {
          this._ended = !0, this._processing = !1, this._stack = null, this._visited = null, 
          this._buffer && this._buffer.length && super.push(this._buffer), this._buffer = "";
        }
        _destroy(error, cb) {
          this.error = this.error || error, this._finish(), cb(error);
        }
      }
      module.exports = function(value, replacer, space) {
        return new JsonStringifyStream(value, replacer, space);
      };
    },
    5602: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = __webpack_require__(3837).TextDecoder;
    },
    7374: module => {
      function isReadableStream(value) {
        return "function" == typeof value.pipe && "function" == typeof value._read && "object" == typeof value._readableState && null !== value._readableState;
      }
      module.exports = {
        escapableCharCodeSubstitution: {
          8: "\\b",
          9: "\\t",
          10: "\\n",
          12: "\\f",
          13: "\\r",
          34: '\\"',
          92: "\\\\"
        },
        isLeadingSurrogate: function(code) {
          return code >= 55296 && code <= 56319;
        },
        isTrailingSurrogate: function(code) {
          return code >= 56320 && code <= 57343;
        },
        type: {
          PRIMITIVE: 1,
          PROMISE: 4,
          ARRAY: 3,
          OBJECT: 2,
          STRING_STREAM: 5,
          OBJECT_STREAM: 6
        },
        isReadableStream,
        replaceValue: function(holder, key, value, replacer) {
          switch (value && "function" == typeof value.toJSON && (value = value.toJSON()), 
          null !== replacer && (value = replacer.call(holder, String(key), value)), typeof value) {
           case "function":
           case "symbol":
            value = void 0;
            break;

           case "object":
            if (null !== value) {
              const cls = value.constructor;
              cls !== String && cls !== Number && cls !== Boolean || (value = value.valueOf());
            }
          }
          return value;
        },
        getTypeNative: function(value) {
          return null === value || "object" != typeof value ? 1 : Array.isArray(value) ? 3 : 2;
        },
        getTypeAsync: function(value) {
          return null === value || "object" != typeof value ? 1 : "function" == typeof value.then ? 4 : isReadableStream(value) ? value._readableState.objectMode ? 6 : 5 : Array.isArray(value) ? 3 : 2;
        },
        normalizeReplacer: function(replacer) {
          if ("function" == typeof replacer) return replacer;
          if (Array.isArray(replacer)) {
            return [ ...new Set(replacer.map((item => {
              const cls = item && item.constructor;
              return cls === String || cls === Number ? String(item) : null;
            })).filter((item => "string" == typeof item))) ];
          }
          return null;
        },
        normalizeSpace: function(space) {
          return "number" == typeof space ? !(!Number.isFinite(space) || space < 1) && " ".repeat(Math.min(space, 10)) : "string" == typeof space && space.slice(0, 10) || !1;
        }
      };
    },
    5027: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = __webpack_require__(8385).version;
    },
    4745: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const WEBPACK_PACKAGE = process.env.WEBPACK_PACKAGE || "webpack";
      exports.default = class {
        async apply(cli) {
          await cli.makeCommand({
            name: "configtest [config-path]",
            alias: "t",
            description: "Validate a webpack configuration.",
            pkg: "@webpack-cli/configtest",
            dependencies: [ WEBPACK_PACKAGE ]
          }, [], (async configPath => {
            cli.webpack = await cli.loadWebpack();
            const config = await cli.loadConfig(configPath ? {
              config: [ configPath ]
            } : {}), configPaths = new Set;
            Array.isArray(config.options) ? config.options.forEach((options => {
              config.path.get(options) && configPaths.add(config.path.get(options));
            })) : config.path.get(config.options) && configPaths.add(config.path.get(config.options)), 
            0 === configPaths.size && (cli.logger.error("No configuration found."), process.exit(2)), 
            cli.logger.info(`Validate '${Array.from(configPaths).join(" ,")}'.`);
            try {
              const error = cli.webpack.validate(config.options);
              if (error && error.length > 0) throw new cli.webpack.WebpackOptionsValidationError(error);
            } catch (error) {
              cli.isValidationError(error) ? cli.logger.error(error.message) : cli.logger.error(error), 
              process.exit(2);
            }
            cli.logger.success("There are no validation errors in the given webpack configuration.");
          }));
        }
      };
    },
    545: function(__unused_webpack_module, exports, __webpack_require__) {
      "use strict";
      var __importDefault = this && this.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : {
          default: mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const envinfo_1 = __importDefault(__webpack_require__(361));
      exports.default = class {
        async apply(cli) {
          await cli.makeCommand({
            name: "info",
            alias: "i",
            description: "Outputs information about your system.",
            usage: "[options]",
            pkg: "@webpack-cli/info"
          }, [ {
            name: "output",
            alias: "o",
            configs: [ {
              type: "string"
            } ],
            description: "To get the output in a specified format ( accept json or markdown )"
          }, {
            name: "additional-package",
            alias: "a",
            configs: [ {
              type: "string"
            } ],
            multiple: !0,
            description: "Adds additional packages to the output"
          } ], (async options => {
            let {output} = options;
            const envinfoConfig = {};
            if (output) switch (output = output.replace(/['"]+/g, ""), output) {
             case "markdown":
              envinfoConfig.markdown = !0;
              break;

             case "json":
              envinfoConfig.json = !0;
              break;

             default:
              cli.logger.error(`'${output}' is not a valid value for output`), process.exit(2);
            }
            const defaultInformation = {
              Binaries: [ "Node", "Yarn", "npm" ],
              Browsers: [ "Brave Browser", "Chrome", "Chrome Canary", "Edge", "Firefox", "Firefox Developer Edition", "Firefox Nightly", "Internet Explorer", "Safari", "Safari Technology Preview" ],
              Monorepos: [ "Yarn Workspaces", "Lerna" ],
              System: [ "OS", "CPU", "Memory" ],
              npmGlobalPackages: [ "webpack", "webpack-cli", "webpack-dev-server" ],
              npmPackages: "{*webpack*,*loader*}"
            };
            let defaultPackages = [ "webpack", "loader" ];
            void 0 !== options.additionalPackage && (defaultPackages = [ ...defaultPackages, ...options.additionalPackage ]), 
            defaultInformation.npmPackages = `{${defaultPackages.map((item => `*${item}*`)).join(",")}}`;
            let info = await envinfo_1.default.run(defaultInformation, envinfoConfig);
            info = info.replace(/npmPackages/g, "Packages"), info = info.replace(/npmGlobalPackages/g, "Global Packages"), 
            cli.logger.raw(info);
          }));
        }
      };
    },
    5803: (module, __unused_webpack_exports, __webpack_require__) => {
      var map = {
        "./configtest/lib": 4745,
        "./info/lib": 545,
        "./serve/lib": 3063
      };
      function webpackContext(req) {
        var id = webpackContextResolve(req);
        return __webpack_require__(id);
      }
      function webpackContextResolve(req) {
        if (!__webpack_require__.o(map, req)) {
          var e = new Error("Cannot find module '" + req + "'");
          throw e.code = "MODULE_NOT_FOUND", e;
        }
        return map[req];
      }
      webpackContext.keys = function() {
        return Object.keys(map);
      }, webpackContext.resolve = webpackContextResolve, module.exports = webpackContext, 
      webpackContext.id = 5803;
    },
    1005: (module, __unused_webpack_exports, __webpack_require__) => {
      var map = {
        "./configtest/package.json": 7558,
        "./info/package.json": 3255,
        "./serve/package.json": 2623
      };
      function webpackContext(req) {
        var id = webpackContextResolve(req);
        return __webpack_require__(id);
      }
      function webpackContextResolve(req) {
        if (!__webpack_require__.o(map, req)) {
          var e = new Error("Cannot find module '" + req + "'");
          throw e.code = "MODULE_NOT_FOUND", e;
        }
        return map[req];
      }
      webpackContext.keys = function() {
        return Object.keys(map);
      }, webpackContext.resolve = webpackContextResolve, module.exports = webpackContext, 
      webpackContext.id = 1005;
    },
    738: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const clone = __webpack_require__(3341), typeOf = __webpack_require__(6401), isPlainObject = __webpack_require__(5299);
      function cloneDeep(val, instanceClone) {
        switch (typeOf(val)) {
         case "object":
          return function(val, instanceClone) {
            if ("function" == typeof instanceClone) return instanceClone(val);
            if (instanceClone || isPlainObject(val)) {
              const res = new val.constructor;
              for (let key in val) res[key] = cloneDeep(val[key], instanceClone);
              return res;
            }
            return val;
          }(val, instanceClone);

         case "array":
          return function(val, instanceClone) {
            const res = new val.constructor(val.length);
            for (let i = 0; i < val.length; i++) res[i] = cloneDeep(val[i], instanceClone);
            return res;
          }(val, instanceClone);

         default:
          return clone(val);
        }
      }
      module.exports = cloneDeep;
    },
    8309: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const cp = __webpack_require__(2081), parse = __webpack_require__(4605), enoent = __webpack_require__(3743);
      function spawn(command, args, options) {
        const parsed = parse(command, args, options), spawned = cp.spawn(parsed.command, parsed.args, parsed.options);
        return enoent.hookChildProcess(spawned, parsed), spawned;
      }
      module.exports = spawn, module.exports.spawn = spawn, module.exports.sync = function(command, args, options) {
        const parsed = parse(command, args, options), result = cp.spawnSync(parsed.command, parsed.args, parsed.options);
        return result.error = result.error || enoent.verifyENOENTSync(result.status, parsed), 
        result;
      }, module.exports._parse = parse, module.exports._enoent = enoent;
    },
    3743: module => {
      "use strict";
      const isWin = "win32" === process.platform;
      function notFoundError(original, syscall) {
        return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
          code: "ENOENT",
          errno: "ENOENT",
          syscall: `${syscall} ${original.command}`,
          path: original.command,
          spawnargs: original.args
        });
      }
      function verifyENOENT(status, parsed) {
        return isWin && 1 === status && !parsed.file ? notFoundError(parsed.original, "spawn") : null;
      }
      module.exports = {
        hookChildProcess: function(cp, parsed) {
          if (!isWin) return;
          const originalEmit = cp.emit;
          cp.emit = function(name, arg1) {
            if ("exit" === name) {
              const err = verifyENOENT(arg1, parsed);
              if (err) return originalEmit.call(cp, "error", err);
            }
            return originalEmit.apply(cp, arguments);
          };
        },
        verifyENOENT,
        verifyENOENTSync: function(status, parsed) {
          return isWin && 1 === status && !parsed.file ? notFoundError(parsed.original, "spawnSync") : null;
        },
        notFoundError
      };
    },
    4605: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const path = __webpack_require__(1017), resolveCommand = __webpack_require__(2202), escape = __webpack_require__(5081), readShebang = __webpack_require__(7550), isWin = "win32" === process.platform, isExecutableRegExp = /\.(?:com|exe)$/i, isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
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
    5081: module => {
      "use strict";
      const metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;
      module.exports.command = function(arg) {
        return arg = arg.replace(metaCharsRegExp, "^$1");
      }, module.exports.argument = function(arg, doubleEscapeMetaChars) {
        return arg = (arg = `"${arg = (arg = (arg = `${arg}`).replace(/(\\*)"/g, '$1$1\\"')).replace(/(\\*)$/, "$1$1")}"`).replace(metaCharsRegExp, "^$1"), 
        doubleEscapeMetaChars && (arg = arg.replace(metaCharsRegExp, "^$1")), arg;
      };
    },
    7550: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const fs = __webpack_require__(7147), shebangCommand = __webpack_require__(2063);
      module.exports = function(command) {
        const buffer = Buffer.alloc(150);
        let fd;
        try {
          fd = fs.openSync(command, "r"), fs.readSync(fd, buffer, 0, 150, 0), fs.closeSync(fd);
        } catch (e) {}
        return shebangCommand(buffer.toString());
      };
    },
    2202: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const path = __webpack_require__(1017), which = __webpack_require__(2806), getPathKey = __webpack_require__(3024);
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
    361: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = function(e) {
        var t = {};
        function n(r) {
          if (t[r]) return t[r].exports;
          var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
          };
          return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
        }
        return n.m = e, n.c = t, n.d = function(e, t, r) {
          n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
          });
        }, n.r = function(e) {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
          }), Object.defineProperty(e, "__esModule", {
            value: !0
          });
        }, n.t = function(e, t) {
          if (1 & t && (e = n(e)), 8 & t) return e;
          if (4 & t && "object" == typeof e && e && e.__esModule) return e;
          var r = Object.create(null);
          if (n.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
          }), 2 & t && "string" != typeof e) for (var o in e) n.d(r, o, function(t) {
            return e[t];
          }.bind(null, o));
          return r;
        }, n.n = function(e) {
          var t = e && e.__esModule ? function() {
            return e.default;
          } : function() {
            return e;
          };
          return n.d(t, "a", t), t;
        }, n.o = function(e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        }, n.p = "", n(n.s = 78);
      }([ function(e, t) {
        e.exports = __webpack_require__(1017);
      }, function(e, t, n) {
        "use strict";
        n(22), n(101), n(21), n(103), n(114), n(16), n(27), n(74), n(116), n(2);
        var r = n(0), o = n(5), i = n(17), s = n(49), a = n(76), c = n(45), u = n(121), l = function(e) {
          var t = (arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}).unify, n = void 0 !== t && t;
          return new Promise((function(t) {
            s.exec(e, {
              stdio: [ 0, "pipe", "ignore" ]
            }, (function(e, r, o) {
              var i;
              i = n ? r.toString() + o.toString() : r.toString(), t((e ? "" : i).trim());
            }));
          }));
        }, f = function(e) {
          var t = Object.values(Array.prototype.slice.call(arguments).slice(1));
          (process.env.ENVINFO_DEBUG || "").toLowerCase() === e && console.log(e, JSON.stringify(t));
        }, p = function(e) {
          return new Promise((function(t) {
            o.readFile(e, "utf8", (function(e, n) {
              return t(n || null);
            }));
          }));
        }, h = function(e) {
          return p(e).then((function(e) {
            return e ? JSON.parse(e) : null;
          }));
        }, d = /\d+\.[\d+|.]+/g, m = function(e) {
          f("trace", "findDarwinApplication", e);
          var t = `mdfind "kMDItemCFBundleIdentifier=='${e}'"`;
          return f("trace", t), l(t).then((function(e) {
            return e.replace(/(\s)/g, "\\ ");
          }));
        }, g = function(e, t) {
          var n = (t || [ "CFBundleShortVersionString" ]).map((function(e) {
            return "-c Print:" + e;
          }));
          return [ "/usr/libexec/PlistBuddy" ].concat(n).concat([ e ]).join(" ");
        }, v = function(e, t) {
          for (var n = [], r = null; null !== (r = e.exec(t)); ) n.push(r);
          return n;
        };
        e.exports = {
          run: l,
          log: f,
          fileExists: function(e) {
            return new Promise((function(t) {
              o.stat(e, (function(n) {
                return t(n ? null : e);
              }));
            }));
          },
          readFile: p,
          requireJson: h,
          versionRegex: d,
          findDarwinApplication: m,
          generatePlistBuddyCommand: g,
          matchAll: v,
          parseSDKManagerOutput: function(e) {
            var t = e.split("Available")[0];
            return {
              apiLevels: v(u.androidAPILevels, t).map((function(e) {
                return e[1];
              })),
              buildTools: v(u.androidBuildTools, t).map((function(e) {
                return e[1];
              })),
              systemImages: v(u.androidSystemImages, t).map((function(e) {
                return e[1].split("|").map((function(e) {
                  return e.trim();
                }));
              })).map((function(e) {
                return e[0].split(";")[0] + " | " + e[2].split(" System Image")[0];
              }))
            };
          },
          isLinux: "linux" === process.platform,
          isMacOS: "darwin" === process.platform,
          NA: "N/A",
          NotFound: "Not Found",
          isWindows: process.platform.startsWith("win"),
          isObject: function(e) {
            return "object" == typeof e && !Array.isArray(e);
          },
          noop: function(e) {
            return e;
          },
          pipe: function(e) {
            return function(t) {
              return e.reduce((function(e, t) {
                return t(e);
              }), t);
            };
          },
          browserBundleIdentifiers: {
            "Brave Browser": "com.brave.Browser",
            Chrome: "com.google.Chrome",
            "Chrome Canary": "com.google.Chrome.canary",
            Firefox: "org.mozilla.firefox",
            "Firefox Developer Edition": "org.mozilla.firefoxdeveloperedition",
            "Firefox Nightly": "org.mozilla.nightly",
            "Microsoft Edge": "com.microsoft.edgemac",
            Safari: "com.apple.Safari",
            "Safari Technology Preview": "com.apple.SafariTechnologyPreview"
          },
          ideBundleIdentifiers: {
            Atom: "com.github.atom",
            IntelliJ: "com.jetbrains.intellij",
            PhpStorm: "com.jetbrains.PhpStorm",
            "Sublime Text": "com.sublimetext.3",
            WebStorm: "com.jetbrains.WebStorm"
          },
          runSync: function(e) {
            return (s.execSync(e, {
              stdio: [ 0, "pipe", "ignore" ]
            }).toString() || "").trim();
          },
          which: function(e) {
            return new Promise((function(t) {
              return a(e, (function(e, n) {
                return t(n);
              }));
            }));
          },
          getDarwinApplicationVersion: function(e) {
            var t;
            return f("trace", "getDarwinApplicationVersion", e), t = "darwin" !== process.platform ? "N/A" : m(e).then((function(e) {
              return l(g(r.join(e, "Contents", "Info.plist"), [ "CFBundleShortVersionString" ]));
            })), Promise.resolve(t);
          },
          uniq: function(e) {
            return Array.from(new Set(e));
          },
          toReadableBytes: function(e) {
            var t = Math.floor(Math.log(e) / Math.log(1024));
            return e ? (e / Math.pow(1024, t)).toFixed(2) + " " + [ "B", "KB", "MB", "GB", "TB", "PB" ][t] : "0 Bytes";
          },
          omit: function(e, t) {
            return Object.keys(e).filter((function(e) {
              return t.indexOf(e) < 0;
            })).reduce((function(t, n) {
              return Object.assign(t, {
                [n]: e[n]
              });
            }), {});
          },
          pick: function(e, t) {
            return Object.keys(e).filter((function(e) {
              return t.indexOf(e) >= 0;
            })).reduce((function(t, n) {
              return Object.assign(t, {
                [n]: e[n]
              });
            }), {});
          },
          getPackageJsonByName: function(e) {
            return h(r.join(process.cwd(), "node_modules", e, "package.json"));
          },
          getPackageJsonByPath: function(e) {
            return h(r.join(process.cwd(), e));
          },
          getPackageJsonByFullPath: function(e) {
            return f("trace", "getPackageJsonByFullPath", e), h(e);
          },
          getAllPackageJsonPaths: function(e) {
            return f("trace", "getAllPackageJsonPaths", e), new Promise((function(t) {
              return c(e ? r.join("node_modules", e, "package.json") : r.join("node_modules", "**", "package.json"), (function(e, n) {
                return t(n.map(r.normalize) || []);
              }));
            }));
          },
          sortObject: function(e) {
            return Object.keys(e).sort().reduce((function(t, n) {
              return t[n] = e[n], t;
            }), {});
          },
          findVersion: function(e, t, n) {
            f("trace", "findVersion", e, t, n);
            var r = n || 0, o = t || d, i = e.match(o);
            return i ? i[r] : e;
          },
          condensePath: function(e) {
            return (e || "").replace(i.homedir(), "~");
          },
          determineFound: function(e, t, n) {
            return f("trace", "determineFound", e, t, n), "N/A" === t ? Promise.resolve([ e, "N/A" ]) : t && 0 !== Object.keys(t).length ? n ? Promise.resolve([ e, t, n ]) : Promise.resolve([ e, t ]) : Promise.resolve([ e, "Not Found" ]);
          }
        };
      }, function(e, t, n) {
        "use strict";
        var r, o, i, s, a = n(36), c = n(4), u = n(12), l = n(56), f = n(8), p = n(6), h = n(19), d = n(37), m = n(38), g = n(81), v = n(60).set, y = n(83)(), b = n(62), w = n(84), x = n(85), S = n(86), P = c.TypeError, O = c.process, j = O && O.versions, E = j && j.v8 || "", I = c.Promise, _ = "process" == l(O), A = function() {}, k = o = b.f, N = !!function() {
          try {
            var e = I.resolve(1), t = (e.constructor = {})[n(3)("species")] = function(e) {
              e(A, A);
            };
            return (_ || "function" == typeof PromiseRejectionEvent) && e.then(A) instanceof t && 0 !== E.indexOf("6.6") && -1 === x.indexOf("Chrome/66");
          } catch (e) {}
        }(), F = function(e) {
          var t;
          return !(!p(e) || "function" != typeof (t = e.then)) && t;
        }, C = function(e, t) {
          if (!e._n) {
            e._n = !0;
            var n = e._c;
            y((function() {
              for (var r = e._v, o = 1 == e._s, i = 0, s = function(t) {
                var n, i, s, a = o ? t.ok : t.fail, c = t.resolve, u = t.reject, l = t.domain;
                try {
                  a ? (o || (2 == e._h && V(e), e._h = 1), !0 === a ? n = r : (l && l.enter(), n = a(r), 
                  l && (l.exit(), s = !0)), n === t.promise ? u(P("Promise-chain cycle")) : (i = F(n)) ? i.call(n, c, u) : c(n)) : u(r);
                } catch (e) {
                  l && !s && l.exit(), u(e);
                }
              }; n.length > i; ) s(n[i++]);
              e._c = [], e._n = !1, t && !e._h && M(e);
            }));
          }
        }, M = function(e) {
          v.call(c, (function() {
            var t, n, r, o = e._v, i = T(e);
            if (i && (t = w((function() {
              _ ? O.emit("unhandledRejection", o, e) : (n = c.onunhandledrejection) ? n({
                promise: e,
                reason: o
              }) : (r = c.console) && r.error && r.error("Unhandled promise rejection", o);
            })), e._h = _ || T(e) ? 2 : 1), e._a = void 0, i && t.e) throw t.v;
          }));
        }, T = function(e) {
          return 1 !== e._h && 0 === (e._a || e._c).length;
        }, V = function(e) {
          v.call(c, (function() {
            var t;
            _ ? O.emit("rejectionHandled", e) : (t = c.onrejectionhandled) && t({
              promise: e,
              reason: e._v
            });
          }));
        }, D = function(e) {
          var t = this;
          t._d || (t._d = !0, (t = t._w || t)._v = e, t._s = 2, t._a || (t._a = t._c.slice()), 
          C(t, !0));
        }, B = function(e) {
          var t, n = this;
          if (!n._d) {
            n._d = !0, n = n._w || n;
            try {
              if (n === e) throw P("Promise can't be resolved itself");
              (t = F(e)) ? y((function() {
                var r = {
                  _w: n,
                  _d: !1
                };
                try {
                  t.call(e, u(B, r, 1), u(D, r, 1));
                } catch (e) {
                  D.call(r, e);
                }
              })) : (n._v = e, n._s = 1, C(n, !1));
            } catch (e) {
              D.call({
                _w: n,
                _d: !1
              }, e);
            }
          }
        };
        N || (I = function(e) {
          d(this, I, "Promise", "_h"), h(e), r.call(this);
          try {
            e(u(B, this, 1), u(D, this, 1));
          } catch (e) {
            D.call(this, e);
          }
        }, (r = function(e) {
          this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, 
          this._n = !1;
        }).prototype = n(40)(I.prototype, {
          then: function(e, t) {
            var n = k(g(this, I));
            return n.ok = "function" != typeof e || e, n.fail = "function" == typeof t && t, 
            n.domain = _ ? O.domain : void 0, this._c.push(n), this._a && this._a.push(n), this._s && C(this, !1), 
            n.promise;
          },
          catch: function(e) {
            return this.then(void 0, e);
          }
        }), i = function() {
          var e = new r;
          this.promise = e, this.resolve = u(B, e, 1), this.reject = u(D, e, 1);
        }, b.f = k = function(e) {
          return e === I || e === s ? new i(e) : o(e);
        }), f(f.G + f.W + f.F * !N, {
          Promise: I
        }), n(26)(I, "Promise"), n(63)("Promise"), s = n(18).Promise, f(f.S + f.F * !N, "Promise", {
          reject: function(e) {
            var t = k(this);
            return (0, t.reject)(e), t.promise;
          }
        }), f(f.S + f.F * (a || !N), "Promise", {
          resolve: function(e) {
            return S(a && this === s ? I : this, e);
          }
        }), f(f.S + f.F * !(N && n(41)((function(e) {
          I.all(e).catch(A);
        }))), "Promise", {
          all: function(e) {
            var t = this, n = k(t), r = n.resolve, o = n.reject, i = w((function() {
              var n = [], i = 0, s = 1;
              m(e, !1, (function(e) {
                var a = i++, c = !1;
                n.push(void 0), s++, t.resolve(e).then((function(e) {
                  c || (c = !0, n[a] = e, --s || r(n));
                }), o);
              })), --s || r(n);
            }));
            return i.e && o(i.v), n.promise;
          },
          race: function(e) {
            var t = this, n = k(t), r = n.reject, o = w((function() {
              m(e, !1, (function(e) {
                t.resolve(e).then(n.resolve, r);
              }));
            }));
            return o.e && r(o.v), n.promise;
          }
        });
      }, function(e, t, n) {
        var r = n(55)("wks"), o = n(24), i = n(4).Symbol, s = "function" == typeof i;
        (e.exports = function(e) {
          return r[e] || (r[e] = s && i[e] || (s ? i : o)("Symbol." + e));
        }).store = r;
      }, function(e, t) {
        var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = n);
      }, function(e, t) {
        e.exports = __webpack_require__(7147);
      }, function(e, t) {
        e.exports = function(e) {
          return "object" == typeof e ? null !== e : "function" == typeof e;
        };
      }, function(e, t, n) {
        var r = n(6);
        e.exports = function(e) {
          if (!r(e)) throw TypeError(e + " is not an object!");
          return e;
        };
      }, function(e, t, n) {
        var r = n(4), o = n(18), i = n(13), s = n(14), a = n(12), c = function(e, t, n) {
          var u, l, f, p, h = e & c.F, d = e & c.G, m = e & c.S, g = e & c.P, v = e & c.B, y = d ? r : m ? r[t] || (r[t] = {}) : (r[t] || {}).prototype, b = d ? o : o[t] || (o[t] = {}), w = b.prototype || (b.prototype = {});
          for (u in d && (n = t), n) f = ((l = !h && y && void 0 !== y[u]) ? y : n)[u], p = v && l ? a(f, r) : g && "function" == typeof f ? a(Function.call, f) : f, 
          y && s(y, u, f, e & c.U), b[u] != f && i(b, u, p), g && w[u] != f && (w[u] = f);
        };
        r.core = o, c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, 
        e.exports = c;
      }, function(e, t, n) {
        e.exports = !n(10)((function() {
          return 7 != Object.defineProperty({}, "a", {
            get: function() {
              return 7;
            }
          }).a;
        }));
      }, function(e, t) {
        e.exports = function(e) {
          try {
            return !!e();
          } catch (e) {
            return !0;
          }
        };
      }, function(e, t, n) {
        var r = n(7), o = n(50), i = n(51), s = Object.defineProperty;
        t.f = n(9) ? Object.defineProperty : function(e, t, n) {
          if (r(e), t = i(t, !0), r(n), o) try {
            return s(e, t, n);
          } catch (e) {}
          if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
          return "value" in n && (e[t] = n.value), e;
        };
      }, function(e, t, n) {
        var r = n(19);
        e.exports = function(e, t, n) {
          if (r(e), void 0 === t) return e;
          switch (n) {
           case 1:
            return function(n) {
              return e.call(t, n);
            };

           case 2:
            return function(n, r) {
              return e.call(t, n, r);
            };

           case 3:
            return function(n, r, o) {
              return e.call(t, n, r, o);
            };
          }
          return function() {
            return e.apply(t, arguments);
          };
        };
      }, function(e, t, n) {
        var r = n(11), o = n(23);
        e.exports = n(9) ? function(e, t, n) {
          return r.f(e, t, o(1, n));
        } : function(e, t, n) {
          return e[t] = n, e;
        };
      }, function(e, t, n) {
        var r = n(4), o = n(13), i = n(15), s = n(24)("src"), a = Function.toString, c = ("" + a).split("toString");
        n(18).inspectSource = function(e) {
          return a.call(e);
        }, (e.exports = function(e, t, n, a) {
          var u = "function" == typeof n;
          u && (i(n, "name") || o(n, "name", t)), e[t] !== n && (u && (i(n, s) || o(n, s, e[t] ? "" + e[t] : c.join(String(t)))), 
          e === r ? e[t] = n : a ? e[t] ? e[t] = n : o(e, t, n) : (delete e[t], o(e, t, n)));
        })(Function.prototype, "toString", (function() {
          return "function" == typeof this && this[s] || a.call(this);
        }));
      }, function(e, t) {
        var n = {}.hasOwnProperty;
        e.exports = function(e, t) {
          return n.call(e, t);
        };
      }, function(e, t, n) {
        n(28)("split", 2, (function(e, t, r) {
          "use strict";
          var o = n(92), i = r, s = [].push;
          if ("c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1).length || 2 != "ab".split(/(?:ab)*/).length || 4 != ".".split(/(.?)(.?)/).length || ".".split(/()()/).length > 1 || "".split(/.?/).length) {
            var a = void 0 === /()??/.exec("")[1];
            r = function(e, t) {
              var n = String(this);
              if (void 0 === e && 0 === t) return [];
              if (!o(e)) return i.call(n, e, t);
              var r, c, u, l, f, p = [], h = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.unicode ? "u" : "") + (e.sticky ? "y" : ""), d = 0, m = void 0 === t ? 4294967295 : t >>> 0, g = new RegExp(e.source, h + "g");
              for (a || (r = new RegExp("^" + g.source + "$(?!\\s)", h)); (c = g.exec(n)) && !((u = c.index + c[0].length) > d && (p.push(n.slice(d, c.index)), 
              !a && c.length > 1 && c[0].replace(r, (function() {
                for (f = 1; f < arguments.length - 2; f++) void 0 === arguments[f] && (c[f] = void 0);
              })), c.length > 1 && c.index < n.length && s.apply(p, c.slice(1)), l = c[0].length, 
              d = u, p.length >= m)); ) g.lastIndex === c.index && g.lastIndex++;
              return d === n.length ? !l && g.test("") || p.push("") : p.push(n.slice(d)), p.length > m ? p.slice(0, m) : p;
            };
          } else "0".split(void 0, 0).length && (r = function(e, t) {
            return void 0 === e && 0 === t ? [] : i.call(this, e, t);
          });
          return [ function(n, o) {
            var i = e(this), s = null == n ? void 0 : n[t];
            return void 0 !== s ? s.call(n, i, o) : r.call(String(i), n, o);
          }, r ];
        }));
      }, function(e, t) {
        e.exports = __webpack_require__(2037);
      }, function(e, t) {
        var n = e.exports = {
          version: "2.5.7"
        };
        "number" == typeof __e && (__e = n);
      }, function(e, t) {
        e.exports = function(e) {
          if ("function" != typeof e) throw TypeError(e + " is not a function!");
          return e;
        };
      }, function(e, t) {
        var n = {}.toString;
        e.exports = function(e) {
          return n.call(e).slice(8, -1);
        };
      }, function(e, t, n) {
        var r = n(8);
        r(r.S + r.F, "Object", {
          assign: n(88)
        });
      }, function(e, t, n) {
        n(28)("match", 1, (function(e, t, n) {
          return [ function(n) {
            "use strict";
            var r = e(this), o = null == n ? void 0 : n[t];
            return void 0 !== o ? o.call(n, r) : new RegExp(n)[t](String(r));
          }, n ];
        }));
      }, function(e, t) {
        e.exports = function(e, t) {
          return {
            enumerable: !(1 & e),
            configurable: !(2 & e),
            writable: !(4 & e),
            value: t
          };
        };
      }, function(e, t) {
        var n = 0, r = Math.random();
        e.exports = function(e) {
          return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + r).toString(36));
        };
      }, function(e, t, n) {
        var r = n(53), o = n(34);
        e.exports = function(e) {
          return r(o(e));
        };
      }, function(e, t, n) {
        var r = n(11).f, o = n(15), i = n(3)("toStringTag");
        e.exports = function(e, t, n) {
          e && !o(e = n ? e : e.prototype, i) && r(e, i, {
            configurable: !0,
            value: t
          });
        };
      }, function(e, t, n) {
        n(28)("replace", 2, (function(e, t, n) {
          return [ function(r, o) {
            "use strict";
            var i = e(this), s = null == r ? void 0 : r[t];
            return void 0 !== s ? s.call(r, i, o) : n.call(String(i), r, o);
          }, n ];
        }));
      }, function(e, t, n) {
        "use strict";
        var r = n(13), o = n(14), i = n(10), s = n(34), a = n(3);
        e.exports = function(e, t, n) {
          var c = a(e), u = n(s, c, ""[e]), l = u[0], f = u[1];
          i((function() {
            var t = {};
            return t[c] = function() {
              return 7;
            }, 7 != ""[e](t);
          })) && (o(String.prototype, e, l), r(RegExp.prototype, c, 2 == t ? function(e, t) {
            return f.call(e, this, t);
          } : function(e) {
            return f.call(e, this);
          }));
        };
      }, function(e, t, n) {
        var r = n(34);
        e.exports = function(e) {
          return Object(r(e));
        };
      }, function(e, t) {
        e.exports = __webpack_require__(3837);
      }, function(e, t, n) {
        var r = n(70);
        function o(e) {
          var t = function() {
            return t.called ? t.value : (t.called = !0, t.value = e.apply(this, arguments));
          };
          return t.called = !1, t;
        }
        function i(e) {
          var t = function() {
            if (t.called) throw new Error(t.onceError);
            return t.called = !0, t.value = e.apply(this, arguments);
          }, n = e.name || "Function wrapped with `once`";
          return t.onceError = n + " shouldn't be called more than once", t.called = !1, t;
        }
        e.exports = r(o), e.exports.strict = r(i), o.proto = o((function() {
          Object.defineProperty(Function.prototype, "once", {
            value: function() {
              return o(this);
            },
            configurable: !0
          }), Object.defineProperty(Function.prototype, "onceStrict", {
            value: function() {
              return i(this);
            },
            configurable: !0
          });
        }));
      }, function(e, t, n) {
        "use strict";
        var r = n(8), o = n(52)(!0);
        r(r.P, "Array", {
          includes: function(e) {
            return o(this, e, arguments.length > 1 ? arguments[1] : void 0);
          }
        }), n(80)("includes");
      }, function(e, t, n) {
        var r = n(6), o = n(4).document, i = r(o) && r(o.createElement);
        e.exports = function(e) {
          return i ? o.createElement(e) : {};
        };
      }, function(e, t) {
        e.exports = function(e) {
          if (null == e) throw TypeError("Can't call method on  " + e);
          return e;
        };
      }, function(e, t, n) {
        var r = n(54), o = Math.min;
        e.exports = function(e) {
          return e > 0 ? o(r(e), 9007199254740991) : 0;
        };
      }, function(e, t) {
        e.exports = !1;
      }, function(e, t) {
        e.exports = function(e, t, n, r) {
          if (!(e instanceof t) || void 0 !== r && r in e) throw TypeError(n + ": incorrect invocation!");
          return e;
        };
      }, function(e, t, n) {
        var r = n(12), o = n(57), i = n(58), s = n(7), a = n(35), c = n(59), u = {}, l = {};
        (t = e.exports = function(e, t, n, f, p) {
          var h, d, m, g, v = p ? function() {
            return e;
          } : c(e), y = r(n, f, t ? 2 : 1), b = 0;
          if ("function" != typeof v) throw TypeError(e + " is not iterable!");
          if (i(v)) {
            for (h = a(e.length); h > b; b++) if ((g = t ? y(s(d = e[b])[0], d[1]) : y(e[b])) === u || g === l) return g;
          } else for (m = v.call(e); !(d = m.next()).done; ) if ((g = o(m, y, d.value, t)) === u || g === l) return g;
        }).BREAK = u, t.RETURN = l;
      }, function(e, t) {
        e.exports = {};
      }, function(e, t, n) {
        var r = n(14);
        e.exports = function(e, t, n) {
          for (var o in t) r(e, o, t[o], n);
          return e;
        };
      }, function(e, t, n) {
        var r = n(3)("iterator"), o = !1;
        try {
          var i = [ 7 ][r]();
          i.return = function() {
            o = !0;
          }, Array.from(i, (function() {
            throw 2;
          }));
        } catch (e) {}
        e.exports = function(e, t) {
          if (!t && !o) return !1;
          var n = !1;
          try {
            var i = [ 7 ], s = i[r]();
            s.next = function() {
              return {
                done: n = !0
              };
            }, i[r] = function() {
              return s;
            }, e(i);
          } catch (e) {}
          return n;
        };
      }, function(e, t, n) {
        var r = n(87), o = n(66);
        e.exports = Object.keys || function(e) {
          return r(e, o);
        };
      }, function(e, t, n) {
        var r = n(55)("keys"), o = n(24);
        e.exports = function(e) {
          return r[e] || (r[e] = o(e));
        };
      }, function(e, t) {
        t.f = {}.propertyIsEnumerable;
      }, function(e, t, n) {
        e.exports = b;
        var r = n(5), o = n(67), i = n(46), s = (i.Minimatch, n(97)), a = n(68).EventEmitter, c = n(0), u = n(47), l = n(48), f = n(99), p = n(69), h = (p.alphasort, 
        p.alphasorti, p.setopts), d = p.ownProp, m = n(100), g = (n(30), p.childrenIgnored), v = p.isIgnored, y = n(31);
        function b(e, t, n) {
          if ("function" == typeof t && (n = t, t = {}), t || (t = {}), t.sync) {
            if (n) throw new TypeError("callback provided to sync glob");
            return f(e, t);
          }
          return new x(e, t, n);
        }
        b.sync = f;
        var w = b.GlobSync = f.GlobSync;
        function x(e, t, n) {
          if ("function" == typeof t && (n = t, t = null), t && t.sync) {
            if (n) throw new TypeError("callback provided to sync glob");
            return new w(e, t);
          }
          if (!(this instanceof x)) return new x(e, t, n);
          h(this, e, t), this._didRealPath = !1;
          var r = this.minimatch.set.length;
          this.matches = new Array(r), "function" == typeof n && (n = y(n), this.on("error", n), 
          this.on("end", (function(e) {
            n(null, e);
          })));
          var o = this;
          if (this._processing = 0, this._emitQueue = [], this._processQueue = [], this.paused = !1, 
          this.noprocess) return this;
          if (0 === r) return a();
          for (var i = !0, s = 0; s < r; s++) this._process(this.minimatch.set[s], s, !1, a);
          function a() {
            --o._processing, o._processing <= 0 && (i ? process.nextTick((function() {
              o._finish();
            })) : o._finish());
          }
          i = !1;
        }
        b.glob = b, b.hasMagic = function(e, t) {
          var n = function(e, t) {
            if (null === t || "object" != typeof t) return e;
            for (var n = Object.keys(t), r = n.length; r--; ) e[n[r]] = t[n[r]];
            return e;
          }({}, t);
          n.noprocess = !0;
          var r = new x(e, n).minimatch.set;
          if (!e) return !1;
          if (r.length > 1) return !0;
          for (var o = 0; o < r[0].length; o++) if ("string" != typeof r[0][o]) return !0;
          return !1;
        }, b.Glob = x, s(x, a), x.prototype._finish = function() {
          if (u(this instanceof x), !this.aborted) {
            if (this.realpath && !this._didRealpath) return this._realpath();
            p.finish(this), this.emit("end", this.found);
          }
        }, x.prototype._realpath = function() {
          if (!this._didRealpath) {
            this._didRealpath = !0;
            var e = this.matches.length;
            if (0 === e) return this._finish();
            for (var t = this, n = 0; n < this.matches.length; n++) this._realpathSet(n, r);
          }
          function r() {
            0 == --e && t._finish();
          }
        }, x.prototype._realpathSet = function(e, t) {
          var n = this.matches[e];
          if (!n) return t();
          var r = Object.keys(n), i = this, s = r.length;
          if (0 === s) return t();
          var a = this.matches[e] = Object.create(null);
          r.forEach((function(n, r) {
            n = i._makeAbs(n), o.realpath(n, i.realpathCache, (function(r, o) {
              r ? "stat" === r.syscall ? a[n] = !0 : i.emit("error", r) : a[o] = !0, 0 == --s && (i.matches[e] = a, 
              t());
            }));
          }));
        }, x.prototype._mark = function(e) {
          return p.mark(this, e);
        }, x.prototype._makeAbs = function(e) {
          return p.makeAbs(this, e);
        }, x.prototype.abort = function() {
          this.aborted = !0, this.emit("abort");
        }, x.prototype.pause = function() {
          this.paused || (this.paused = !0, this.emit("pause"));
        }, x.prototype.resume = function() {
          if (this.paused) {
            if (this.emit("resume"), this.paused = !1, this._emitQueue.length) {
              var e = this._emitQueue.slice(0);
              this._emitQueue.length = 0;
              for (var t = 0; t < e.length; t++) {
                var n = e[t];
                this._emitMatch(n[0], n[1]);
              }
            }
            if (this._processQueue.length) {
              var r = this._processQueue.slice(0);
              for (this._processQueue.length = 0, t = 0; t < r.length; t++) {
                var o = r[t];
                this._processing--, this._process(o[0], o[1], o[2], o[3]);
              }
            }
          }
        }, x.prototype._process = function(e, t, n, r) {
          if (u(this instanceof x), u("function" == typeof r), !this.aborted) if (this._processing++, 
          this.paused) this._processQueue.push([ e, t, n, r ]); else {
            for (var o, s = 0; "string" == typeof e[s]; ) s++;
            switch (s) {
             case e.length:
              return void this._processSimple(e.join("/"), t, r);

             case 0:
              o = null;
              break;

             default:
              o = e.slice(0, s).join("/");
            }
            var a, c = e.slice(s);
            null === o ? a = "." : l(o) || l(e.join("/")) ? (o && l(o) || (o = "/" + o), a = o) : a = o;
            var f = this._makeAbs(a);
            if (g(this, a)) return r();
            c[0] === i.GLOBSTAR ? this._processGlobStar(o, a, f, c, t, n, r) : this._processReaddir(o, a, f, c, t, n, r);
          }
        }, x.prototype._processReaddir = function(e, t, n, r, o, i, s) {
          var a = this;
          this._readdir(n, i, (function(c, u) {
            return a._processReaddir2(e, t, n, r, o, i, u, s);
          }));
        }, x.prototype._processReaddir2 = function(e, t, n, r, o, i, s, a) {
          if (!s) return a();
          for (var u = r[0], l = !!this.minimatch.negate, f = u._glob, p = this.dot || "." === f.charAt(0), h = [], d = 0; d < s.length; d++) ("." !== (g = s[d]).charAt(0) || p) && (l && !e ? !g.match(u) : g.match(u)) && h.push(g);
          var m = h.length;
          if (0 === m) return a();
          if (1 === r.length && !this.mark && !this.stat) {
            for (this.matches[o] || (this.matches[o] = Object.create(null)), d = 0; d < m; d++) {
              var g = h[d];
              e && (g = "/" !== e ? e + "/" + g : e + g), "/" !== g.charAt(0) || this.nomount || (g = c.join(this.root, g)), 
              this._emitMatch(o, g);
            }
            return a();
          }
          for (r.shift(), d = 0; d < m; d++) g = h[d], e && (g = "/" !== e ? e + "/" + g : e + g), 
          this._process([ g ].concat(r), o, i, a);
          a();
        }, x.prototype._emitMatch = function(e, t) {
          if (!this.aborted && !v(this, t)) if (this.paused) this._emitQueue.push([ e, t ]); else {
            var n = l(t) ? t : this._makeAbs(t);
            if (this.mark && (t = this._mark(t)), this.absolute && (t = n), !this.matches[e][t]) {
              if (this.nodir) {
                var r = this.cache[n];
                if ("DIR" === r || Array.isArray(r)) return;
              }
              this.matches[e][t] = !0;
              var o = this.statCache[n];
              o && this.emit("stat", t, o), this.emit("match", t);
            }
          }
        }, x.prototype._readdirInGlobStar = function(e, t) {
          if (!this.aborted) {
            if (this.follow) return this._readdir(e, !1, t);
            var n = this, o = m("lstat\0" + e, (function(r, o) {
              if (r && "ENOENT" === r.code) return t();
              var i = o && o.isSymbolicLink();
              n.symlinks[e] = i, i || !o || o.isDirectory() ? n._readdir(e, !1, t) : (n.cache[e] = "FILE", 
              t());
            }));
            o && r.lstat(e, o);
          }
        }, x.prototype._readdir = function(e, t, n) {
          if (!this.aborted && (n = m("readdir\0" + e + "\0" + t, n))) {
            if (t && !d(this.symlinks, e)) return this._readdirInGlobStar(e, n);
            if (d(this.cache, e)) {
              var o = this.cache[e];
              if (!o || "FILE" === o) return n();
              if (Array.isArray(o)) return n(null, o);
            }
            r.readdir(e, function(e, t, n) {
              return function(r, o) {
                r ? e._readdirError(t, r, n) : e._readdirEntries(t, o, n);
              };
            }(this, e, n));
          }
        }, x.prototype._readdirEntries = function(e, t, n) {
          if (!this.aborted) {
            if (!this.mark && !this.stat) for (var r = 0; r < t.length; r++) {
              var o = t[r];
              o = "/" === e ? e + o : e + "/" + o, this.cache[o] = !0;
            }
            return this.cache[e] = t, n(null, t);
          }
        }, x.prototype._readdirError = function(e, t, n) {
          if (!this.aborted) {
            switch (t.code) {
             case "ENOTSUP":
             case "ENOTDIR":
              var r = this._makeAbs(e);
              if (this.cache[r] = "FILE", r === this.cwdAbs) {
                var o = new Error(t.code + " invalid cwd " + this.cwd);
                o.path = this.cwd, o.code = t.code, this.emit("error", o), this.abort();
              }
              break;

             case "ENOENT":
             case "ELOOP":
             case "ENAMETOOLONG":
             case "UNKNOWN":
              this.cache[this._makeAbs(e)] = !1;
              break;

             default:
              this.cache[this._makeAbs(e)] = !1, this.strict && (this.emit("error", t), this.abort()), 
              this.silent || console.error("glob error", t);
            }
            return n();
          }
        }, x.prototype._processGlobStar = function(e, t, n, r, o, i, s) {
          var a = this;
          this._readdir(n, i, (function(c, u) {
            a._processGlobStar2(e, t, n, r, o, i, u, s);
          }));
        }, x.prototype._processGlobStar2 = function(e, t, n, r, o, i, s, a) {
          if (!s) return a();
          var c = r.slice(1), u = e ? [ e ] : [], l = u.concat(c);
          this._process(l, o, !1, a);
          var f = this.symlinks[n], p = s.length;
          if (f && i) return a();
          for (var h = 0; h < p; h++) if ("." !== s[h].charAt(0) || this.dot) {
            var d = u.concat(s[h], c);
            this._process(d, o, !0, a);
            var m = u.concat(s[h], r);
            this._process(m, o, !0, a);
          }
          a();
        }, x.prototype._processSimple = function(e, t, n) {
          var r = this;
          this._stat(e, (function(o, i) {
            r._processSimple2(e, t, o, i, n);
          }));
        }, x.prototype._processSimple2 = function(e, t, n, r, o) {
          if (this.matches[t] || (this.matches[t] = Object.create(null)), !r) return o();
          if (e && l(e) && !this.nomount) {
            var i = /[\/\\]$/.test(e);
            "/" === e.charAt(0) ? e = c.join(this.root, e) : (e = c.resolve(this.root, e), i && (e += "/"));
          }
          "win32" === process.platform && (e = e.replace(/\\/g, "/")), this._emitMatch(t, e), 
          o();
        }, x.prototype._stat = function(e, t) {
          var n = this._makeAbs(e), o = "/" === e.slice(-1);
          if (e.length > this.maxLength) return t();
          if (!this.stat && d(this.cache, n)) {
            var i = this.cache[n];
            if (Array.isArray(i) && (i = "DIR"), !o || "DIR" === i) return t(null, i);
            if (o && "FILE" === i) return t();
          }
          var s = this.statCache[n];
          if (void 0 !== s) {
            if (!1 === s) return t(null, s);
            var a = s.isDirectory() ? "DIR" : "FILE";
            return o && "FILE" === a ? t() : t(null, a, s);
          }
          var c = this, u = m("stat\0" + n, (function(o, i) {
            if (i && i.isSymbolicLink()) return r.stat(n, (function(r, o) {
              r ? c._stat2(e, n, null, i, t) : c._stat2(e, n, r, o, t);
            }));
            c._stat2(e, n, o, i, t);
          }));
          u && r.lstat(n, u);
        }, x.prototype._stat2 = function(e, t, n, r, o) {
          if (n && ("ENOENT" === n.code || "ENOTDIR" === n.code)) return this.statCache[t] = !1, 
          o();
          var i = "/" === e.slice(-1);
          if (this.statCache[t] = r, "/" === t.slice(-1) && r && !r.isDirectory()) return o(null, !1, r);
          var s = !0;
          return r && (s = r.isDirectory() ? "DIR" : "FILE"), this.cache[t] = this.cache[t] || s, 
          i && "FILE" === s ? o() : o(null, s, r);
        };
      }, function(e, t, n) {
        e.exports = d, d.Minimatch = m;
        var r = {
          sep: "/"
        };
        try {
          r = n(0);
        } catch (e) {}
        var o = d.GLOBSTAR = m.GLOBSTAR = {}, i = n(94), s = {
          "!": {
            open: "(?:(?!(?:",
            close: "))[^/]*?)"
          },
          "?": {
            open: "(?:",
            close: ")?"
          },
          "+": {
            open: "(?:",
            close: ")+"
          },
          "*": {
            open: "(?:",
            close: ")*"
          },
          "@": {
            open: "(?:",
            close: ")"
          }
        }, a = "[^/]", c = a + "*?", f = "().*{}+?[]^$\\!".split("").reduce((function(e, t) {
          return e[t] = !0, e;
        }), {}), p = /\/+/;
        function h(e, t) {
          e = e || {}, t = t || {};
          var n = {};
          return Object.keys(t).forEach((function(e) {
            n[e] = t[e];
          })), Object.keys(e).forEach((function(t) {
            n[t] = e[t];
          })), n;
        }
        function d(e, t, n) {
          if ("string" != typeof t) throw new TypeError("glob pattern string required");
          return n || (n = {}), !(!n.nocomment && "#" === t.charAt(0)) && ("" === t.trim() ? "" === e : new m(t, n).match(e));
        }
        function m(e, t) {
          if (!(this instanceof m)) return new m(e, t);
          if ("string" != typeof e) throw new TypeError("glob pattern string required");
          t || (t = {}), e = e.trim(), "/" !== r.sep && (e = e.split(r.sep).join("/")), this.options = t, 
          this.set = [], this.pattern = e, this.regexp = null, this.negate = !1, this.comment = !1, 
          this.empty = !1, this.make();
        }
        function g(e, t) {
          if (t || (t = this instanceof m ? this.options : {}), void 0 === (e = void 0 === e ? this.pattern : e)) throw new TypeError("undefined pattern");
          return t.nobrace || !e.match(/\{.*\}/) ? [ e ] : i(e);
        }
        d.filter = function(e, t) {
          return t = t || {}, function(n, r, o) {
            return d(n, e, t);
          };
        }, d.defaults = function(e) {
          if (!e || !Object.keys(e).length) return d;
          var t = d, n = function(n, r, o) {
            return t.minimatch(n, r, h(e, o));
          };
          return n.Minimatch = function(n, r) {
            return new t.Minimatch(n, h(e, r));
          }, n;
        }, m.defaults = function(e) {
          return e && Object.keys(e).length ? d.defaults(e).Minimatch : m;
        }, m.prototype.debug = function() {}, m.prototype.make = function() {
          if (!this._made) {
            var e = this.pattern, t = this.options;
            if (t.nocomment || "#" !== e.charAt(0)) if (e) {
              this.parseNegate();
              var n = this.globSet = this.braceExpand();
              t.debug && (this.debug = console.error), this.debug(this.pattern, n), n = this.globParts = n.map((function(e) {
                return e.split(p);
              })), this.debug(this.pattern, n), n = n.map((function(e, t, n) {
                return e.map(this.parse, this);
              }), this), this.debug(this.pattern, n), n = n.filter((function(e) {
                return -1 === e.indexOf(!1);
              })), this.debug(this.pattern, n), this.set = n;
            } else this.empty = !0; else this.comment = !0;
          }
        }, m.prototype.parseNegate = function() {
          var e = this.pattern, t = !1, r = 0;
          if (!this.options.nonegate) {
            for (var o = 0, i = e.length; o < i && "!" === e.charAt(o); o++) t = !t, r++;
            r && (this.pattern = e.substr(r)), this.negate = t;
          }
        }, d.braceExpand = function(e, t) {
          return g(e, t);
        }, m.prototype.braceExpand = g, m.prototype.parse = function(e, t) {
          if (e.length > 65536) throw new TypeError("pattern is too long");
          var n = this.options;
          if (!n.noglobstar && "**" === e) return o;
          if ("" === e) return "";
          var r, i = "", u = !!n.nocase, l = !1, p = [], h = [], d = !1, m = -1, g = -1, y = "." === e.charAt(0) ? "" : n.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)", b = this;
          function w() {
            if (r) {
              switch (r) {
               case "*":
                i += c, u = !0;
                break;

               case "?":
                i += a, u = !0;
                break;

               default:
                i += "\\" + r;
              }
              b.debug("clearStateChar %j %j", r, i), r = !1;
            }
          }
          for (var x, S = 0, P = e.length; S < P && (x = e.charAt(S)); S++) if (this.debug("%s\t%s %s %j", e, S, i, x), 
          l && f[x]) i += "\\" + x, l = !1; else switch (x) {
           case "/":
            return !1;

           case "\\":
            w(), l = !0;
            continue;

           case "?":
           case "*":
           case "+":
           case "@":
           case "!":
            if (this.debug("%s\t%s %s %j <-- stateChar", e, S, i, x), d) {
              this.debug("  in class"), "!" === x && S === g + 1 && (x = "^"), i += x;
              continue;
            }
            b.debug("call clearStateChar %j", r), w(), r = x, n.noext && w();
            continue;

           case "(":
            if (d) {
              i += "(";
              continue;
            }
            if (!r) {
              i += "\\(";
              continue;
            }
            p.push({
              type: r,
              start: S - 1,
              reStart: i.length,
              open: s[r].open,
              close: s[r].close
            }), i += "!" === r ? "(?:(?!(?:" : "(?:", this.debug("plType %j %j", r, i), r = !1;
            continue;

           case ")":
            if (d || !p.length) {
              i += "\\)";
              continue;
            }
            w(), u = !0;
            var O = p.pop();
            i += O.close, "!" === O.type && h.push(O), O.reEnd = i.length;
            continue;

           case "|":
            if (d || !p.length || l) {
              i += "\\|", l = !1;
              continue;
            }
            w(), i += "|";
            continue;

           case "[":
            if (w(), d) {
              i += "\\" + x;
              continue;
            }
            d = !0, g = S, m = i.length, i += x;
            continue;

           case "]":
            if (S === g + 1 || !d) {
              i += "\\" + x, l = !1;
              continue;
            }
            if (d) {
              var j = e.substring(g + 1, S);
              try {
                RegExp("[" + j + "]");
              } catch (e) {
                var E = this.parse(j, v);
                i = i.substr(0, m) + "\\[" + E[0] + "\\]", u = u || E[1], d = !1;
                continue;
              }
            }
            u = !0, d = !1, i += x;
            continue;

           default:
            w(), l ? l = !1 : !f[x] || "^" === x && d || (i += "\\"), i += x;
          }
          for (d && (j = e.substr(g + 1), E = this.parse(j, v), i = i.substr(0, m) + "\\[" + E[0], 
          u = u || E[1]), O = p.pop(); O; O = p.pop()) {
            var I = i.slice(O.reStart + O.open.length);
            this.debug("setting tail", i, O), I = I.replace(/((?:\\{2}){0,64})(\\?)\|/g, (function(e, t, n) {
              return n || (n = "\\"), t + t + n + "|";
            })), this.debug("tail=%j\n   %s", I, I, O, i);
            var _ = "*" === O.type ? c : "?" === O.type ? a : "\\" + O.type;
            u = !0, i = i.slice(0, O.reStart) + _ + "\\(" + I;
          }
          w(), l && (i += "\\\\");
          var A = !1;
          switch (i.charAt(0)) {
           case ".":
           case "[":
           case "(":
            A = !0;
          }
          for (var k = h.length - 1; k > -1; k--) {
            var N = h[k], F = i.slice(0, N.reStart), C = i.slice(N.reStart, N.reEnd - 8), M = i.slice(N.reEnd - 8, N.reEnd), T = i.slice(N.reEnd);
            M += T;
            var V = F.split("(").length - 1, D = T;
            for (S = 0; S < V; S++) D = D.replace(/\)[+*?]?/, "");
            var B = "";
            "" === (T = D) && t !== v && (B = "$"), i = F + C + T + B + M;
          }
          if ("" !== i && u && (i = "(?=.)" + i), A && (i = y + i), t === v) return [ i, u ];
          if (!u) return e.replace(/\\(.)/g, "$1");
          var $ = n.nocase ? "i" : "";
          try {
            var R = new RegExp("^" + i + "$", $);
          } catch (e) {
            return new RegExp("$.");
          }
          return R._glob = e, R._src = i, R;
        };
        var v = {};
        d.makeRe = function(e, t) {
          return new m(e, t || {}).makeRe();
        }, m.prototype.makeRe = function() {
          if (this.regexp || !1 === this.regexp) return this.regexp;
          var e = this.set;
          if (!e.length) return this.regexp = !1, this.regexp;
          var t = this.options, n = t.noglobstar ? c : t.dot ? "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?" : "(?:(?!(?:\\/|^)\\.).)*?", r = t.nocase ? "i" : "", i = e.map((function(e) {
            return e.map((function(e) {
              return e === o ? n : "string" == typeof e ? e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") : e._src;
            })).join("\\/");
          })).join("|");
          i = "^(?:" + i + ")$", this.negate && (i = "^(?!" + i + ").*$");
          try {
            this.regexp = new RegExp(i, r);
          } catch (e) {
            this.regexp = !1;
          }
          return this.regexp;
        }, d.match = function(e, t, n) {
          var r = new m(t, n = n || {});
          return e = e.filter((function(e) {
            return r.match(e);
          })), r.options.nonull && !e.length && e.push(t), e;
        }, m.prototype.match = function(e, t) {
          if (this.debug("match", e, this.pattern), this.comment) return !1;
          if (this.empty) return "" === e;
          if ("/" === e && t) return !0;
          var n = this.options;
          "/" !== r.sep && (e = e.split(r.sep).join("/")), e = e.split(p), this.debug(this.pattern, "split", e);
          var o, i, s = this.set;
          for (this.debug(this.pattern, "set", s), i = e.length - 1; i >= 0 && !(o = e[i]); i--) ;
          for (i = 0; i < s.length; i++) {
            var a = s[i], c = e;
            if (n.matchBase && 1 === a.length && (c = [ o ]), this.matchOne(c, a, t)) return !!n.flipNegate || !this.negate;
          }
          return !n.flipNegate && this.negate;
        }, m.prototype.matchOne = function(e, t, n) {
          var r = this.options;
          this.debug("matchOne", {
            this: this,
            file: e,
            pattern: t
          }), this.debug("matchOne", e.length, t.length);
          for (var i = 0, s = 0, a = e.length, c = t.length; i < a && s < c; i++, s++) {
            this.debug("matchOne loop");
            var u, l = t[s], f = e[i];
            if (this.debug(t, l, f), !1 === l) return !1;
            if (l === o) {
              this.debug("GLOBSTAR", [ t, l, f ]);
              var p = i, h = s + 1;
              if (h === c) {
                for (this.debug("** at the end"); i < a; i++) if ("." === e[i] || ".." === e[i] || !r.dot && "." === e[i].charAt(0)) return !1;
                return !0;
              }
              for (;p < a; ) {
                var d = e[p];
                if (this.debug("\nglobstar while", e, p, t, h, d), this.matchOne(e.slice(p), t.slice(h), n)) return this.debug("globstar found match!", p, a, d), 
                !0;
                if ("." === d || ".." === d || !r.dot && "." === d.charAt(0)) {
                  this.debug("dot detected!", e, p, t, h);
                  break;
                }
                this.debug("globstar swallow a segment, and continue"), p++;
              }
              return !(!n || (this.debug("\n>>> no match, partial?", e, p, t, h), p !== a));
            }
            if ("string" == typeof l ? (u = r.nocase ? f.toLowerCase() === l.toLowerCase() : f === l, 
            this.debug("string match", l, f, u)) : (u = f.match(l), this.debug("pattern match", l, f, u)), 
            !u) return !1;
          }
          if (i === a && s === c) return !0;
          if (i === a) return n;
          if (s === c) return i === a - 1 && "" === e[i];
          throw new Error("wtf?");
        };
      }, function(e, t) {
        e.exports = __webpack_require__(9491);
      }, function(e, t, n) {
        "use strict";
        function r(e) {
          return "/" === e.charAt(0);
        }
        function o(e) {
          var t = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/.exec(e), n = t[1] || "", r = Boolean(n && ":" !== n.charAt(1));
          return Boolean(t[2] || r);
        }
        e.exports = "win32" === process.platform ? o : r, e.exports.posix = r, e.exports.win32 = o;
      }, function(e, t) {
        e.exports = __webpack_require__(2081);
      }, function(e, t, n) {
        e.exports = !n(9) && !n(10)((function() {
          return 7 != Object.defineProperty(n(33)("div"), "a", {
            get: function() {
              return 7;
            }
          }).a;
        }));
      }, function(e, t, n) {
        var r = n(6);
        e.exports = function(e, t) {
          if (!r(e)) return e;
          var n, o;
          if (t && "function" == typeof (n = e.toString) && !r(o = n.call(e))) return o;
          if ("function" == typeof (n = e.valueOf) && !r(o = n.call(e))) return o;
          if (!t && "function" == typeof (n = e.toString) && !r(o = n.call(e))) return o;
          throw TypeError("Can't convert object to primitive value");
        };
      }, function(e, t, n) {
        var r = n(25), o = n(35), i = n(79);
        e.exports = function(e) {
          return function(t, n, s) {
            var a, c = r(t), u = o(c.length), l = i(s, u);
            if (e && n != n) {
              for (;u > l; ) if ((a = c[l++]) != a) return !0;
            } else for (;u > l; l++) if ((e || l in c) && c[l] === n) return e || l || 0;
            return !e && -1;
          };
        };
      }, function(e, t, n) {
        var r = n(20);
        e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
          return "String" == r(e) ? e.split("") : Object(e);
        };
      }, function(e, t) {
        var n = Math.ceil, r = Math.floor;
        e.exports = function(e) {
          return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e);
        };
      }, function(e, t, n) {
        var r = n(18), o = n(4), i = o["__core-js_shared__"] || (o["__core-js_shared__"] = {});
        (e.exports = function(e, t) {
          return i[e] || (i[e] = void 0 !== t ? t : {});
        })("versions", []).push({
          version: r.version,
          mode: n(36) ? "pure" : "global",
          copyright: "© 2018 Denis Pushkarev (zloirock.ru)"
        });
      }, function(e, t, n) {
        var r = n(20), o = n(3)("toStringTag"), i = "Arguments" == r(function() {
          return arguments;
        }());
        e.exports = function(e) {
          var t, n, s;
          return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (n = function(e, t) {
            try {
              return e[t];
            } catch (e) {}
          }(t = Object(e), o)) ? n : i ? r(t) : "Object" == (s = r(t)) && "function" == typeof t.callee ? "Arguments" : s;
        };
      }, function(e, t, n) {
        var r = n(7);
        e.exports = function(e, t, n, o) {
          try {
            return o ? t(r(n)[0], n[1]) : t(n);
          } catch (t) {
            var i = e.return;
            throw void 0 !== i && r(i.call(e)), t;
          }
        };
      }, function(e, t, n) {
        var r = n(39), o = n(3)("iterator"), i = Array.prototype;
        e.exports = function(e) {
          return void 0 !== e && (r.Array === e || i[o] === e);
        };
      }, function(e, t, n) {
        var r = n(56), o = n(3)("iterator"), i = n(39);
        e.exports = n(18).getIteratorMethod = function(e) {
          if (null != e) return e[o] || e["@@iterator"] || i[r(e)];
        };
      }, function(e, t, n) {
        var r, o, i, s = n(12), a = n(82), c = n(61), u = n(33), l = n(4), f = l.process, p = l.setImmediate, h = l.clearImmediate, d = l.MessageChannel, m = l.Dispatch, g = 0, v = {}, y = function() {
          var e = +this;
          if (v.hasOwnProperty(e)) {
            var t = v[e];
            delete v[e], t();
          }
        }, b = function(e) {
          y.call(e.data);
        };
        p && h || (p = function(e) {
          for (var t = [], n = 1; arguments.length > n; ) t.push(arguments[n++]);
          return v[++g] = function() {
            a("function" == typeof e ? e : Function(e), t);
          }, r(g), g;
        }, h = function(e) {
          delete v[e];
        }, "process" == n(20)(f) ? r = function(e) {
          f.nextTick(s(y, e, 1));
        } : m && m.now ? r = function(e) {
          m.now(s(y, e, 1));
        } : d ? (i = (o = new d).port2, o.port1.onmessage = b, r = s(i.postMessage, i, 1)) : l.addEventListener && "function" == typeof postMessage && !l.importScripts ? (r = function(e) {
          l.postMessage(e + "", "*");
        }, l.addEventListener("message", b, !1)) : r = "onreadystatechange" in u("script") ? function(e) {
          c.appendChild(u("script")).onreadystatechange = function() {
            c.removeChild(this), y.call(e);
          };
        } : function(e) {
          setTimeout(s(y, e, 1), 0);
        }), e.exports = {
          set: p,
          clear: h
        };
      }, function(e, t, n) {
        var r = n(4).document;
        e.exports = r && r.documentElement;
      }, function(e, t, n) {
        "use strict";
        var r = n(19);
        function o(e) {
          var t, n;
          this.promise = new e((function(e, r) {
            if (void 0 !== t || void 0 !== n) throw TypeError("Bad Promise constructor");
            t = e, n = r;
          })), this.resolve = r(t), this.reject = r(n);
        }
        e.exports.f = function(e) {
          return new o(e);
        };
      }, function(e, t, n) {
        "use strict";
        var r = n(4), o = n(11), i = n(9), s = n(3)("species");
        e.exports = function(e) {
          var t = r[e];
          i && t && !t[s] && o.f(t, s, {
            configurable: !0,
            get: function() {
              return this;
            }
          });
        };
      }, function(e, t, n) {
        var r = n(8), o = n(65)(!0);
        r(r.S, "Object", {
          entries: function(e) {
            return o(e);
          }
        });
      }, function(e, t, n) {
        var r = n(42), o = n(25), i = n(44).f;
        e.exports = function(e) {
          return function(t) {
            for (var n, s = o(t), a = r(s), c = a.length, u = 0, l = []; c > u; ) i.call(s, n = a[u++]) && l.push(e ? [ n, s[n] ] : s[n]);
            return l;
          };
        };
      }, function(e, t) {
        e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
      }, function(e, t, n) {
        e.exports = l, l.realpath = l, l.sync = f, l.realpathSync = f, l.monkeypatch = function() {
          r.realpath = l, r.realpathSync = f;
        }, l.unmonkeypatch = function() {
          r.realpath = o, r.realpathSync = i;
        };
        var r = n(5), o = r.realpath, i = r.realpathSync, s = process.version, a = /^v[0-5]\./.test(s), c = n(93);
        function u(e) {
          return e && "realpath" === e.syscall && ("ELOOP" === e.code || "ENOMEM" === e.code || "ENAMETOOLONG" === e.code);
        }
        function l(e, t, n) {
          if (a) return o(e, t, n);
          "function" == typeof t && (n = t, t = null), o(e, t, (function(r, o) {
            u(r) ? c.realpath(e, t, n) : n(r, o);
          }));
        }
        function f(e, t) {
          if (a) return i(e, t);
          try {
            return i(e, t);
          } catch (n) {
            if (u(n)) return c.realpathSync(e, t);
            throw n;
          }
        }
      }, function(e, t) {
        e.exports = __webpack_require__(2361);
      }, function(e, t, n) {
        function r(e, t) {
          return Object.prototype.hasOwnProperty.call(e, t);
        }
        t.alphasort = u, t.alphasorti = c, t.setopts = function(e, t, n) {
          if (n || (n = {}), n.matchBase && -1 === t.indexOf("/")) {
            if (n.noglobstar) throw new Error("base matching requires globstar");
            t = "**/" + t;
          }
          e.silent = !!n.silent, e.pattern = t, e.strict = !1 !== n.strict, e.realpath = !!n.realpath, 
          e.realpathCache = n.realpathCache || Object.create(null), e.follow = !!n.follow, 
          e.dot = !!n.dot, e.mark = !!n.mark, e.nodir = !!n.nodir, e.nodir && (e.mark = !0), 
          e.sync = !!n.sync, e.nounique = !!n.nounique, e.nonull = !!n.nonull, e.nosort = !!n.nosort, 
          e.nocase = !!n.nocase, e.stat = !!n.stat, e.noprocess = !!n.noprocess, e.absolute = !!n.absolute, 
          e.maxLength = n.maxLength || 1 / 0, e.cache = n.cache || Object.create(null), e.statCache = n.statCache || Object.create(null), 
          e.symlinks = n.symlinks || Object.create(null), function(e, t) {
            e.ignore = t.ignore || [], Array.isArray(e.ignore) || (e.ignore = [ e.ignore ]), 
            e.ignore.length && (e.ignore = e.ignore.map(l));
          }(e, n), e.changedCwd = !1;
          var i = process.cwd();
          r(n, "cwd") ? (e.cwd = o.resolve(n.cwd), e.changedCwd = e.cwd !== i) : e.cwd = i, 
          e.root = n.root || o.resolve(e.cwd, "/"), e.root = o.resolve(e.root), "win32" === process.platform && (e.root = e.root.replace(/\\/g, "/")), 
          e.cwdAbs = s(e.cwd) ? e.cwd : f(e, e.cwd), "win32" === process.platform && (e.cwdAbs = e.cwdAbs.replace(/\\/g, "/")), 
          e.nomount = !!n.nomount, n.nonegate = !0, n.nocomment = !0, e.minimatch = new a(t, n), 
          e.options = e.minimatch.options;
        }, t.ownProp = r, t.makeAbs = f, t.finish = function(e) {
          for (var t = e.nounique, n = t ? [] : Object.create(null), r = 0, o = e.matches.length; r < o; r++) {
            var i = e.matches[r];
            if (i && 0 !== Object.keys(i).length) {
              var s = Object.keys(i);
              t ? n.push.apply(n, s) : s.forEach((function(e) {
                n[e] = !0;
              }));
            } else if (e.nonull) {
              var a = e.minimatch.globSet[r];
              t ? n.push(a) : n[a] = !0;
            }
          }
          if (t || (n = Object.keys(n)), e.nosort || (n = n.sort(e.nocase ? c : u)), e.mark) {
            for (r = 0; r < n.length; r++) n[r] = e._mark(n[r]);
            e.nodir && (n = n.filter((function(t) {
              var n = !/\/$/.test(t), r = e.cache[t] || e.cache[f(e, t)];
              return n && r && (n = "DIR" !== r && !Array.isArray(r)), n;
            })));
          }
          e.ignore.length && (n = n.filter((function(t) {
            return !p(e, t);
          }))), e.found = n;
        }, t.mark = function(e, t) {
          var n = f(e, t), r = e.cache[n], o = t;
          if (r) {
            var i = "DIR" === r || Array.isArray(r), s = "/" === t.slice(-1);
            if (i && !s ? o += "/" : !i && s && (o = o.slice(0, -1)), o !== t) {
              var a = f(e, o);
              e.statCache[a] = e.statCache[n], e.cache[a] = e.cache[n];
            }
          }
          return o;
        }, t.isIgnored = p, t.childrenIgnored = function(e, t) {
          return !!e.ignore.length && e.ignore.some((function(e) {
            return !(!e.gmatcher || !e.gmatcher.match(t));
          }));
        };
        var o = n(0), i = n(46), s = n(48), a = i.Minimatch;
        function c(e, t) {
          return e.toLowerCase().localeCompare(t.toLowerCase());
        }
        function u(e, t) {
          return e.localeCompare(t);
        }
        function l(e) {
          var t = null;
          if ("/**" === e.slice(-3)) {
            var n = e.replace(/(\/\*\*)+$/, "");
            t = new a(n, {
              dot: !0
            });
          }
          return {
            matcher: new a(e, {
              dot: !0
            }),
            gmatcher: t
          };
        }
        function f(e, t) {
          var n = t;
          return n = "/" === t.charAt(0) ? o.join(e.root, t) : s(t) || "" === t ? t : e.changedCwd ? o.resolve(e.cwd, t) : o.resolve(t), 
          "win32" === process.platform && (n = n.replace(/\\/g, "/")), n;
        }
        function p(e, t) {
          return !!e.ignore.length && e.ignore.some((function(e) {
            return e.matcher.match(t) || !(!e.gmatcher || !e.gmatcher.match(t));
          }));
        }
      }, function(e, t) {
        e.exports = function e(t, n) {
          if (t && n) return e(t)(n);
          if ("function" != typeof t) throw new TypeError("need wrapper function");
          return Object.keys(t).forEach((function(e) {
            r[e] = t[e];
          })), r;
          function r() {
            for (var e = new Array(arguments.length), n = 0; n < e.length; n++) e[n] = arguments[n];
            var r = t.apply(this, e), o = e[e.length - 1];
            return "function" == typeof r && r !== o && Object.keys(o).forEach((function(e) {
              r[e] = o[e];
            })), r;
          }
        };
      }, function(e, t, n) {
        var r = n(7), o = n(105), i = n(66), s = n(43)("IE_PROTO"), a = function() {}, c = function() {
          var e, t = n(33)("iframe"), r = i.length;
          for (t.style.display = "none", n(61).appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), 
          e.write("<script>document.F=Object<\/script>"), e.close(), c = e.F; r--; ) delete c.prototype[i[r]];
          return c();
        };
        e.exports = Object.create || function(e, t) {
          var n;
          return null !== e ? (a.prototype = r(e), n = new a, a.prototype = null, n[s] = e) : n = c(), 
          void 0 === t ? n : o(n, t);
        };
      }, function(e, t, n) {
        var r = n(24)("meta"), o = n(6), i = n(15), s = n(11).f, a = 0, c = Object.isExtensible || function() {
          return !0;
        }, u = !n(10)((function() {
          return c(Object.preventExtensions({}));
        })), l = function(e) {
          s(e, r, {
            value: {
              i: "O" + ++a,
              w: {}
            }
          });
        }, f = e.exports = {
          KEY: r,
          NEED: !1,
          fastKey: function(e, t) {
            if (!o(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
            if (!i(e, r)) {
              if (!c(e)) return "F";
              if (!t) return "E";
              l(e);
            }
            return e[r].i;
          },
          getWeak: function(e, t) {
            if (!i(e, r)) {
              if (!c(e)) return !0;
              if (!t) return !1;
              l(e);
            }
            return e[r].w;
          },
          onFreeze: function(e) {
            return u && f.NEED && c(e) && !i(e, r) && l(e), e;
          }
        };
      }, function(e, t, n) {
        var r = n(6);
        e.exports = function(e, t) {
          if (!r(e) || e._t !== t) throw TypeError("Incompatible receiver, " + t + " required!");
          return e;
        };
      }, function(e, t, n) {
        var r = n(8), o = n(65)(!1);
        r(r.S, "Object", {
          values: function(e) {
            return o(e);
          }
        });
      }, function(e, t, n) {
        "use strict";
        var r = n(7);
        e.exports = function() {
          var e = r(this), t = "";
          return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), 
          e.unicode && (t += "u"), e.sticky && (t += "y"), t;
        };
      }, function(e, t, n) {
        e.exports = u, u.sync = function(e, t) {
          for (var n = c(e, t = t || {}), r = n.env, i = n.ext, u = n.extExe, l = [], f = 0, p = r.length; f < p; f++) {
            var h = r[f];
            '"' === h.charAt(0) && '"' === h.slice(-1) && (h = h.slice(1, -1));
            var d = o.join(h, e);
            !h && /^\.[\\\/]/.test(e) && (d = e.slice(0, 2) + d);
            for (var m = 0, g = i.length; m < g; m++) {
              var v = d + i[m];
              try {
                if (s.sync(v, {
                  pathExt: u
                })) {
                  if (!t.all) return v;
                  l.push(v);
                }
              } catch (e) {}
            }
          }
          if (t.all && l.length) return l;
          if (t.nothrow) return null;
          throw a(e);
        };
        var r = "win32" === process.platform || "cygwin" === process.env.OSTYPE || "msys" === process.env.OSTYPE, o = n(0), i = r ? ";" : ":", s = n(118);
        function a(e) {
          var t = new Error("not found: " + e);
          return t.code = "ENOENT", t;
        }
        function c(e, t) {
          var n = t.colon || i, o = t.path || process.env.PATH || "", s = [ "" ];
          o = o.split(n);
          var a = "";
          return r && (o.unshift(process.cwd()), s = (a = t.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM").split(n), 
          -1 !== e.indexOf(".") && "" !== s[0] && s.unshift("")), (e.match(/\//) || r && e.match(/\\/)) && (o = [ "" ]), 
          {
            env: o,
            ext: s,
            extExe: a
          };
        }
        function u(e, t, n) {
          "function" == typeof t && (n = t, t = {});
          var r = c(e, t), i = r.env, u = r.ext, l = r.extExe, f = [];
          !function r(c, p) {
            if (c === p) return t.all && f.length ? n(null, f) : n(a(e));
            var h = i[c];
            '"' === h.charAt(0) && '"' === h.slice(-1) && (h = h.slice(1, -1));
            var d = o.join(h, e);
            !h && /^\.[\\\/]/.test(e) && (d = e.slice(0, 2) + d), function e(o, i) {
              if (o === i) return r(c + 1, p);
              var a = u[o];
              s(d + a, {
                pathExt: l
              }, (function(r, s) {
                if (!r && s) {
                  if (!t.all) return n(null, d + a);
                  f.push(d + a);
                }
                return e(o + 1, i);
              }));
            }(0, u.length);
          }(0, i.length);
        }
      }, function(e, t, n) {
        "use strict";
        e.exports = e => {
          const t = (e = e || {}).env || process.env;
          return "win32" !== (e.platform || process.platform) ? "PATH" : Object.keys(t).find((e => "PATH" === e.toUpperCase())) || "Path";
        };
      }, function(e, t, n) {
        "use strict";
        n(32), n(2), n(27), n(64), n(21);
        var r = n(90), o = n(161), i = n(170), s = n(1);
        function a(e, t) {
          (t = t || {}).clipboard && console.log("\n*** Clipboard option removed - use clipboardy or clipboard-cli directly ***\n");
          var n = Object.keys(e).length > 0 ? e : i.defaults, s = Object.entries(n).reduce((function(e, n) {
            var o = n[0], i = n[1], s = r[`get${o}`];
            return s ? (i && e.push(s(i, t)), e) : e = e.concat((i || []).map((function(e) {
              var t = r[`get${e.replace(/\s/g, "")}Info`];
              return t ? t() : Promise.resolve([ "Unknown" ]);
            })));
          }), []);
          return Promise.all(s).then((function(e) {
            var n = e.reduce((function(e, t) {
              return t && t[0] && Object.assign(e, {
                [t[0]]: t
              }), e;
            }), {});
            return function(e, t) {
              var n = t.json ? o.json : t.markdown ? o.markdown : o.yaml;
              if (t.console) {
                var r = !1;
                process.stdout.isTTY && (r = !0), console.log(n(e, Object.assign({}, t, {
                  console: r
                })));
              }
              return n(e, Object.assign({}, t, {
                console: !1
              }));
            }(Object.entries(i.defaults).reduce((function(e, t) {
              var r = t[0], o = t[1];
              return n[r] ? Object.assign(e, {
                [r]: n[r][1]
              }) : Object.assign(e, {
                [r]: (o || []).reduce((function(e, t) {
                  return n[t] ? (n[t].shift(), 1 === n[t].length ? Object.assign(e, {
                    [t]: n[t][0]
                  }) : Object.assign(e, {
                    [t]: {
                      version: n[t][0],
                      path: n[t][1]
                    }
                  })) : e;
                }), {})
              });
            }), {}), t);
          }));
        }
        e.exports = {
          cli: function(e) {
            if (e.all) return a(Object.assign({}, i.defaults, {
              npmPackages: !0,
              npmGlobalPackages: !0
            }), e);
            if (e.raw) return a(JSON.parse(e.raw), e);
            if (e.helper) {
              var t = r[`get${e.helper}`] || r[`get${e.helper}Info`] || r[e.helper];
              return t ? t().then(console.log) : console.error("Not Found");
            }
            var n = function(e, t) {
              return e.toLowerCase().includes(t.toLowerCase());
            }, o = Object.keys(e).filter((function(e) {
              return Object.keys(i.defaults).some((function(t) {
                return n(t, e);
              }));
            })), c = Object.entries(i.defaults).reduce((function(t, r) {
              return o.some((function(e) {
                return n(e, r[0]);
              })) ? Object.assign(t, {
                [r[0]]: r[1] || e[r[0]]
              }) : t;
            }), {});
            return e.preset ? i[e.preset] ? a(Object.assign({}, s.omit(i[e.preset], [ "options" ]), c), Object.assign({}, i[e.preset].options, s.pick(e, [ "duplicates", "fullTree", "json", "markdown", "console" ]))) : console.error(`\nNo "${e.preset}" preset found.`) : a(c, e);
          },
          helpers: r,
          main: a,
          run: function(e, t) {
            return "string" == typeof e.preset ? a(i[e.preset], t) : a(e, t);
          }
        };
      }, function(e, t, n) {
        var r = n(54), o = Math.max, i = Math.min;
        e.exports = function(e, t) {
          return (e = r(e)) < 0 ? o(e + t, 0) : i(e, t);
        };
      }, function(e, t, n) {
        var r = n(3)("unscopables"), o = Array.prototype;
        null == o[r] && n(13)(o, r, {}), e.exports = function(e) {
          o[r][e] = !0;
        };
      }, function(e, t, n) {
        var r = n(7), o = n(19), i = n(3)("species");
        e.exports = function(e, t) {
          var n, s = r(e).constructor;
          return void 0 === s || null == (n = r(s)[i]) ? t : o(n);
        };
      }, function(e, t) {
        e.exports = function(e, t, n) {
          var r = void 0 === n;
          switch (t.length) {
           case 0:
            return r ? e() : e.call(n);

           case 1:
            return r ? e(t[0]) : e.call(n, t[0]);

           case 2:
            return r ? e(t[0], t[1]) : e.call(n, t[0], t[1]);

           case 3:
            return r ? e(t[0], t[1], t[2]) : e.call(n, t[0], t[1], t[2]);

           case 4:
            return r ? e(t[0], t[1], t[2], t[3]) : e.call(n, t[0], t[1], t[2], t[3]);
          }
          return e.apply(n, t);
        };
      }, function(e, t, n) {
        var r = n(4), o = n(60).set, i = r.MutationObserver || r.WebKitMutationObserver, s = r.process, a = r.Promise, c = "process" == n(20)(s);
        e.exports = function() {
          var e, t, n, u = function() {
            var r, o;
            for (c && (r = s.domain) && r.exit(); e; ) {
              o = e.fn, e = e.next;
              try {
                o();
              } catch (r) {
                throw e ? n() : t = void 0, r;
              }
            }
            t = void 0, r && r.enter();
          };
          if (c) n = function() {
            s.nextTick(u);
          }; else if (!i || r.navigator && r.navigator.standalone) if (a && a.resolve) {
            var l = a.resolve(void 0);
            n = function() {
              l.then(u);
            };
          } else n = function() {
            o.call(r, u);
          }; else {
            var f = !0, p = document.createTextNode("");
            new i(u).observe(p, {
              characterData: !0
            }), n = function() {
              p.data = f = !f;
            };
          }
          return function(r) {
            var o = {
              fn: r,
              next: void 0
            };
            t && (t.next = o), e || (e = o, n()), t = o;
          };
        };
      }, function(e, t) {
        e.exports = function(e) {
          try {
            return {
              e: !1,
              v: e()
            };
          } catch (e) {
            return {
              e: !0,
              v: e
            };
          }
        };
      }, function(e, t, n) {
        var r = n(4).navigator;
        e.exports = r && r.userAgent || "";
      }, function(e, t, n) {
        var r = n(7), o = n(6), i = n(62);
        e.exports = function(e, t) {
          if (r(e), o(t) && t.constructor === e) return t;
          var n = i.f(e);
          return (0, n.resolve)(t), n.promise;
        };
      }, function(e, t, n) {
        var r = n(15), o = n(25), i = n(52)(!1), s = n(43)("IE_PROTO");
        e.exports = function(e, t) {
          var n, a = o(e), c = 0, u = [];
          for (n in a) n != s && r(a, n) && u.push(n);
          for (;t.length > c; ) r(a, n = t[c++]) && (~i(u, n) || u.push(n));
          return u;
        };
      }, function(e, t, n) {
        "use strict";
        var r = n(42), o = n(89), i = n(44), s = n(29), a = n(53), c = Object.assign;
        e.exports = !c || n(10)((function() {
          var e = {}, t = {}, n = Symbol(), r = "abcdefghijklmnopqrst";
          return e[n] = 7, r.split("").forEach((function(e) {
            t[e] = e;
          })), 7 != c({}, e)[n] || Object.keys(c({}, t)).join("") != r;
        })) ? function(e, t) {
          for (var n = s(e), c = arguments.length, u = 1, l = o.f, f = i.f; c > u; ) for (var p, h = a(arguments[u++]), d = l ? r(h).concat(l(h)) : r(h), m = d.length, g = 0; m > g; ) f.call(h, p = d[g++]) && (n[p] = h[p]);
          return n;
        } : c;
      }, function(e, t) {
        t.f = Object.getOwnPropertySymbols;
      }, function(e, t, n) {
        "use strict";
        function r(e, t, n) {
          return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }) : e[t] = n, e;
        }
        n(21);
        var o = n(91), i = n(1), s = n(122), a = n(123), c = n(124), u = n(125), l = n(126), f = n(127), p = n(128), h = n(129), d = n(130), m = n(131), g = n(159), v = n(160);
        e.exports = Object.assign({}, i, o, function(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {}, o = Object.keys(n);
            "function" == typeof Object.getOwnPropertySymbols && (o = o.concat(Object.getOwnPropertySymbols(n).filter((function(e) {
              return Object.getOwnPropertyDescriptor(n, e).enumerable;
            })))), o.forEach((function(t) {
              r(e, t, n[t]);
            }));
          }
          return e;
        }({}, s, a, c, u, l, f, p, h, d, m, g, v));
      }, function(e, t, n) {
        "use strict";
        n(22), n(21), n(2), n(32), n(16);
        var r = n(45), o = n(0), i = n(1), s = function(e) {
          var t = e.split("node_modules" + o.sep), n = t[t.length - 1];
          return "@" === n.charAt(0) ? [ n.split(o.sep)[0], n.split(o.sep)[1] ].join("/") : n.split(o.sep)[0];
        };
        e.exports = {
          getnpmPackages: function(e, t) {
            i.log("trace", "getnpmPackages"), t || (t = {});
            var n = null, r = null;
            return "string" == typeof e && (e.includes("*") || e.includes("?") || e.includes("+") || e.includes("!") ? n = e : e = e.split(",")), 
            Promise.all([ "npmPackages", i.getPackageJsonByPath("package.json").then((function(e) {
              return Object.assign({}, (e || {}).devDependencies || {}, (e || {}).dependencies || {});
            })).then((function(e) {
              return r = e, t.fullTree || t.duplicates || n ? i.getAllPackageJsonPaths(n) : Promise.resolve(Object.keys(e || []).map((function(e) {
                return o.join("node_modules", e, "package.json");
              })));
            })).then((function(o) {
              return !n && "boolean" != typeof e || t.fullTree ? Array.isArray(e) ? Promise.resolve((o || []).filter((function(t) {
                return e.includes(s(t));
              }))) : Promise.resolve(o) : Promise.resolve((o || []).filter((function(e) {
                return Object.keys(r || []).includes(s(e));
              })));
            })).then((function(e) {
              return Promise.all([ e, Promise.all(e.map((function(e) {
                return i.getPackageJsonByPath(e);
              }))) ]);
            })).then((function(e) {
              var n = e[0], o = e[1].reduce((function(e, r, o) {
                return r && r.name ? (e[r.name] || (e[r.name] = {}), t.duplicates && (e[r.name].duplicates = i.uniq((e[r.name].duplicates || []).concat(r.version))), 
                1 === (n[o].match(/node_modules/g) || []).length && (e[r.name].installed = r.version), 
                e) : e;
              }), {});
              return Object.keys(o).forEach((function(e) {
                o[e].duplicates && o[e].installed && (o[e].duplicates = o[e].duplicates.filter((function(t) {
                  return t !== o[e].installed;
                }))), r[e] && (o[e].wanted = r[e]);
              })), o;
            })).then((function(n) {
              return t.showNotFound && Array.isArray(e) && e.forEach((function(e) {
                n[e] || (n[e] = "Not Found");
              })), n;
            })).then((function(e) {
              return i.sortObject(e);
            })) ]);
          },
          getnpmGlobalPackages: function(e, t) {
            i.log("trace", "getnpmGlobalPackages", e);
            var n = null;
            return "string" == typeof e ? e.includes("*") || e.includes("?") || e.includes("+") || e.includes("!") ? n = e : e = e.split(",") : Array.isArray(e) || (e = !0), 
            Promise.all([ "npmGlobalPackages", i.run("npm get prefix --global").then((function(e) {
              return new Promise((function(t, s) {
                return r(o.join(e, i.isWindows ? "" : "lib", "node_modules", n || "{*,@*/*}", "package.json"), (function(e, n) {
                  e || t(n), s(e);
                }));
              }));
            })).then((function(t) {
              return Promise.all(t.filter((function(t) {
                return "boolean" == typeof e || null !== n || e.includes(s(t));
              })).map((function(e) {
                return i.getPackageJsonByFullPath(e);
              })));
            })).then((function(e) {
              return e.reduce((function(e, t) {
                return t ? Object.assign(e, {
                  [t.name]: t.version
                }) : e;
              }), {});
            })).then((function(n) {
              return t.showNotFound && Array.isArray(e) && e.forEach((function(e) {
                n[e] || (n[e] = "Not Found");
              })), n;
            })) ]);
          }
        };
      }, function(e, t, n) {
        var r = n(6), o = n(20), i = n(3)("match");
        e.exports = function(e) {
          var t;
          return r(e) && (void 0 !== (t = e[i]) ? !!t : "RegExp" == o(e));
        };
      }, function(e, t, n) {
        var r = n(0), o = "win32" === process.platform, i = n(5), s = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);
        function a(e) {
          return "function" == typeof e ? e : function() {
            var e;
            if (s) {
              var t = new Error;
              e = function(e) {
                e && (t.message = e.message, n(e = t));
              };
            } else e = n;
            return e;
            function n(e) {
              if (e) {
                if (process.throwDeprecation) throw e;
                if (!process.noDeprecation) {
                  var t = "fs: missing callback " + (e.stack || e.message);
                  process.traceDeprecation ? console.trace(t) : console.error(t);
                }
              }
            }
          }();
        }
        if (r.normalize, o) var c = /(.*?)(?:[\/\\]+|$)/g; else c = /(.*?)(?:[\/]+|$)/g;
        if (o) var u = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/; else u = /^[\/]*/;
        t.realpathSync = function(e, t) {
          if (e = r.resolve(e), t && Object.prototype.hasOwnProperty.call(t, e)) return t[e];
          var n, s, a, l, f = e, p = {}, h = {};
          function d() {
            var t = u.exec(e);
            n = t[0].length, s = t[0], a = t[0], l = "", o && !h[a] && (i.lstatSync(a), h[a] = !0);
          }
          for (d(); n < e.length; ) {
            c.lastIndex = n;
            var m = c.exec(e);
            if (l = s, s += m[0], a = l + m[1], n = c.lastIndex, !(h[a] || t && t[a] === a)) {
              var g;
              if (t && Object.prototype.hasOwnProperty.call(t, a)) g = t[a]; else {
                var v = i.lstatSync(a);
                if (!v.isSymbolicLink()) {
                  h[a] = !0, t && (t[a] = a);
                  continue;
                }
                var y = null;
                if (!o) {
                  var b = v.dev.toString(32) + ":" + v.ino.toString(32);
                  p.hasOwnProperty(b) && (y = p[b]);
                }
                null === y && (i.statSync(a), y = i.readlinkSync(a)), g = r.resolve(l, y), t && (t[a] = g), 
                o || (p[b] = y);
              }
              e = r.resolve(g, e.slice(n)), d();
            }
          }
          return t && (t[f] = e), e;
        }, t.realpath = function(e, t, n) {
          if ("function" != typeof n && (n = a(t), t = null), e = r.resolve(e), t && Object.prototype.hasOwnProperty.call(t, e)) return process.nextTick(n.bind(null, null, t[e]));
          var s, l, f, p, h = e, d = {}, m = {};
          function g() {
            var t = u.exec(e);
            s = t[0].length, l = t[0], f = t[0], p = "", o && !m[f] ? i.lstat(f, (function(e) {
              if (e) return n(e);
              m[f] = !0, v();
            })) : process.nextTick(v);
          }
          function v() {
            if (s >= e.length) return t && (t[h] = e), n(null, e);
            c.lastIndex = s;
            var r = c.exec(e);
            return p = l, l += r[0], f = p + r[1], s = c.lastIndex, m[f] || t && t[f] === f ? process.nextTick(v) : t && Object.prototype.hasOwnProperty.call(t, f) ? w(t[f]) : i.lstat(f, y);
          }
          function y(e, r) {
            if (e) return n(e);
            if (!r.isSymbolicLink()) return m[f] = !0, t && (t[f] = f), process.nextTick(v);
            if (!o) {
              var s = r.dev.toString(32) + ":" + r.ino.toString(32);
              if (d.hasOwnProperty(s)) return b(null, d[s], f);
            }
            i.stat(f, (function(e) {
              if (e) return n(e);
              i.readlink(f, (function(e, t) {
                o || (d[s] = t), b(e, t);
              }));
            }));
          }
          function b(e, o, i) {
            if (e) return n(e);
            var s = r.resolve(p, o);
            t && (t[i] = s), w(s);
          }
          function w(t) {
            e = r.resolve(t, e.slice(s)), g();
          }
          g();
        };
      }, function(e, t, n) {
        var r = n(95), o = n(96);
        e.exports = function(e) {
          return e ? ("{}" === e.substr(0, 2) && (e = "\\{\\}" + e.substr(2)), function e(t, n) {
            var i = [], s = o("{", "}", t);
            if (!s || /\$$/.test(s.pre)) return [ t ];
            var v, c = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(s.body), u = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(s.body), f = c || u, g = s.body.indexOf(",") >= 0;
            if (!f && !g) return s.post.match(/,.*\}/) ? (t = s.pre + "{" + s.body + a + s.post, 
            e(t)) : [ t ];
            if (f) v = s.body.split(/\.\./); else if (1 === (v = function e(t) {
              if (!t) return [ "" ];
              var n = [], r = o("{", "}", t);
              if (!r) return t.split(",");
              var i = r.pre, s = r.body, a = r.post, c = i.split(",");
              c[c.length - 1] += "{" + s + "}";
              var u = e(a);
              return a.length && (c[c.length - 1] += u.shift(), c.push.apply(c, u)), n.push.apply(n, c), 
              n;
            }(s.body)).length && 1 === (v = e(v[0], !1).map(p)).length) {
              return (y = s.post.length ? e(s.post, !1) : [ "" ]).map((function(e) {
                return s.pre + v[0] + e;
              }));
            }
            var w, b = s.pre, y = s.post.length ? e(s.post, !1) : [ "" ];
            if (f) {
              var x = l(v[0]), S = l(v[1]), P = Math.max(v[0].length, v[1].length), O = 3 == v.length ? Math.abs(l(v[2])) : 1, j = d;
              S < x && (O *= -1, j = m);
              var I = v.some(h);
              w = [];
              for (var _ = x; j(_, S); _ += O) {
                var A;
                if (u) "\\" === (A = String.fromCharCode(_)) && (A = ""); else if (A = String(_), 
                I) {
                  var k = P - A.length;
                  if (k > 0) {
                    var N = new Array(k + 1).join("0");
                    A = _ < 0 ? "-" + N + A.slice(1) : N + A;
                  }
                }
                w.push(A);
              }
            } else w = r(v, (function(t) {
              return e(t, !1);
            }));
            for (var F = 0; F < w.length; F++) for (var C = 0; C < y.length; C++) {
              var M = b + w[F] + y[C];
              (!n || f || M) && i.push(M);
            }
            return i;
          }(function(e) {
            return e.split("\\\\").join(i).split("\\{").join(s).split("\\}").join(a).split("\\,").join(c).split("\\.").join(u);
          }(e), !0).map(f)) : [];
        };
        var i = "\0SLASH" + Math.random() + "\0", s = "\0OPEN" + Math.random() + "\0", a = "\0CLOSE" + Math.random() + "\0", c = "\0COMMA" + Math.random() + "\0", u = "\0PERIOD" + Math.random() + "\0";
        function l(e) {
          return parseInt(e, 10) == e ? parseInt(e, 10) : e.charCodeAt(0);
        }
        function f(e) {
          return e.split(i).join("\\").split(s).join("{").split(a).join("}").split(c).join(",").split(u).join(".");
        }
        function p(e) {
          return "{" + e + "}";
        }
        function h(e) {
          return /^-?0\d/.test(e);
        }
        function d(e, t) {
          return e <= t;
        }
        function m(e, t) {
          return e >= t;
        }
      }, function(e, t) {
        e.exports = function(e, t) {
          for (var r = [], o = 0; o < e.length; o++) {
            var i = t(e[o], o);
            n(i) ? r.push.apply(r, i) : r.push(i);
          }
          return r;
        };
        var n = Array.isArray || function(e) {
          return "[object Array]" === Object.prototype.toString.call(e);
        };
      }, function(e, t, n) {
        "use strict";
        function r(e, t, n) {
          e instanceof RegExp && (e = o(e, n)), t instanceof RegExp && (t = o(t, n));
          var r = i(e, t, n);
          return r && {
            start: r[0],
            end: r[1],
            pre: n.slice(0, r[0]),
            body: n.slice(r[0] + e.length, r[1]),
            post: n.slice(r[1] + t.length)
          };
        }
        function o(e, t) {
          var n = t.match(e);
          return n ? n[0] : null;
        }
        function i(e, t, n) {
          var r, o, i, s, a, c = n.indexOf(e), u = n.indexOf(t, c + 1), l = c;
          if (c >= 0 && u > 0) {
            for (r = [], i = n.length; l >= 0 && !a; ) l == c ? (r.push(l), c = n.indexOf(e, l + 1)) : 1 == r.length ? a = [ r.pop(), u ] : ((o = r.pop()) < i && (i = o, 
            s = u), u = n.indexOf(t, l + 1)), l = c < u && c >= 0 ? c : u;
            r.length && (a = [ i, s ]);
          }
          return a;
        }
        e.exports = r, r.range = i;
      }, function(e, t, n) {
        try {
          var r = n(30);
          if ("function" != typeof r.inherits) throw "";
          e.exports = r.inherits;
        } catch (t) {
          e.exports = n(98);
        }
      }, function(e, t) {
        "function" == typeof Object.create ? e.exports = function(e, t) {
          e.super_ = t, e.prototype = Object.create(t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          });
        } : e.exports = function(e, t) {
          e.super_ = t;
          var n = function() {};
          n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e;
        };
      }, function(e, t, n) {
        e.exports = d, d.GlobSync = m;
        var r = n(5), o = n(67), i = n(46), s = (i.Minimatch, n(45).Glob, n(30), n(0)), a = n(47), c = n(48), u = n(69), l = (u.alphasort, 
        u.alphasorti, u.setopts), f = u.ownProp, p = u.childrenIgnored, h = u.isIgnored;
        function d(e, t) {
          if ("function" == typeof t || 3 === arguments.length) throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
          return new m(e, t).found;
        }
        function m(e, t) {
          if (!e) throw new Error("must provide pattern");
          if ("function" == typeof t || 3 === arguments.length) throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
          if (!(this instanceof m)) return new m(e, t);
          if (l(this, e, t), this.noprocess) return this;
          var n = this.minimatch.set.length;
          this.matches = new Array(n);
          for (var r = 0; r < n; r++) this._process(this.minimatch.set[r], r, !1);
          this._finish();
        }
        m.prototype._finish = function() {
          if (a(this instanceof m), this.realpath) {
            var e = this;
            this.matches.forEach((function(t, n) {
              var r = e.matches[n] = Object.create(null);
              for (var i in t) try {
                i = e._makeAbs(i), r[o.realpathSync(i, e.realpathCache)] = !0;
              } catch (t) {
                if ("stat" !== t.syscall) throw t;
                r[e._makeAbs(i)] = !0;
              }
            }));
          }
          u.finish(this);
        }, m.prototype._process = function(e, t, n) {
          a(this instanceof m);
          for (var r, o = 0; "string" == typeof e[o]; ) o++;
          switch (o) {
           case e.length:
            return void this._processSimple(e.join("/"), t);

           case 0:
            r = null;
            break;

           default:
            r = e.slice(0, o).join("/");
          }
          var s, u = e.slice(o);
          null === r ? s = "." : c(r) || c(e.join("/")) ? (r && c(r) || (r = "/" + r), s = r) : s = r;
          var l = this._makeAbs(s);
          p(this, s) || (u[0] === i.GLOBSTAR ? this._processGlobStar(r, s, l, u, t, n) : this._processReaddir(r, s, l, u, t, n));
        }, m.prototype._processReaddir = function(e, t, n, r, o, i) {
          var a = this._readdir(n, i);
          if (a) {
            for (var c = r[0], u = !!this.minimatch.negate, l = c._glob, f = this.dot || "." === l.charAt(0), p = [], h = 0; h < a.length; h++) ("." !== (g = a[h]).charAt(0) || f) && (u && !e ? !g.match(c) : g.match(c)) && p.push(g);
            var d = p.length;
            if (0 !== d) if (1 !== r.length || this.mark || this.stat) for (r.shift(), h = 0; h < d; h++) {
              var m;
              g = p[h], m = e ? [ e, g ] : [ g ], this._process(m.concat(r), o, i);
            } else {
              this.matches[o] || (this.matches[o] = Object.create(null));
              for (h = 0; h < d; h++) {
                var g = p[h];
                e && (g = "/" !== e.slice(-1) ? e + "/" + g : e + g), "/" !== g.charAt(0) || this.nomount || (g = s.join(this.root, g)), 
                this._emitMatch(o, g);
              }
            }
          }
        }, m.prototype._emitMatch = function(e, t) {
          if (!h(this, t)) {
            var n = this._makeAbs(t);
            if (this.mark && (t = this._mark(t)), this.absolute && (t = n), !this.matches[e][t]) {
              if (this.nodir) {
                var r = this.cache[n];
                if ("DIR" === r || Array.isArray(r)) return;
              }
              this.matches[e][t] = !0, this.stat && this._stat(t);
            }
          }
        }, m.prototype._readdirInGlobStar = function(e) {
          if (this.follow) return this._readdir(e, !1);
          var t, n;
          try {
            n = r.lstatSync(e);
          } catch (e) {
            if ("ENOENT" === e.code) return null;
          }
          var o = n && n.isSymbolicLink();
          return this.symlinks[e] = o, o || !n || n.isDirectory() ? t = this._readdir(e, !1) : this.cache[e] = "FILE", 
          t;
        }, m.prototype._readdir = function(e, t) {
          if (t && !f(this.symlinks, e)) return this._readdirInGlobStar(e);
          if (f(this.cache, e)) {
            var n = this.cache[e];
            if (!n || "FILE" === n) return null;
            if (Array.isArray(n)) return n;
          }
          try {
            return this._readdirEntries(e, r.readdirSync(e));
          } catch (t) {
            return this._readdirError(e, t), null;
          }
        }, m.prototype._readdirEntries = function(e, t) {
          if (!this.mark && !this.stat) for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r = "/" === e ? e + r : e + "/" + r, this.cache[r] = !0;
          }
          return this.cache[e] = t, t;
        }, m.prototype._readdirError = function(e, t) {
          switch (t.code) {
           case "ENOTSUP":
           case "ENOTDIR":
            var n = this._makeAbs(e);
            if (this.cache[n] = "FILE", n === this.cwdAbs) {
              var r = new Error(t.code + " invalid cwd " + this.cwd);
              throw r.path = this.cwd, r.code = t.code, r;
            }
            break;

           case "ENOENT":
           case "ELOOP":
           case "ENAMETOOLONG":
           case "UNKNOWN":
            this.cache[this._makeAbs(e)] = !1;
            break;

           default:
            if (this.cache[this._makeAbs(e)] = !1, this.strict) throw t;
            this.silent || console.error("glob error", t);
          }
        }, m.prototype._processGlobStar = function(e, t, n, r, o, i) {
          var s = this._readdir(n, i);
          if (s) {
            var a = r.slice(1), c = e ? [ e ] : [], u = c.concat(a);
            this._process(u, o, !1);
            var l = s.length;
            if (!this.symlinks[n] || !i) for (var f = 0; f < l; f++) if ("." !== s[f].charAt(0) || this.dot) {
              var p = c.concat(s[f], a);
              this._process(p, o, !0);
              var h = c.concat(s[f], r);
              this._process(h, o, !0);
            }
          }
        }, m.prototype._processSimple = function(e, t) {
          var n = this._stat(e);
          if (this.matches[t] || (this.matches[t] = Object.create(null)), n) {
            if (e && c(e) && !this.nomount) {
              var r = /[\/\\]$/.test(e);
              "/" === e.charAt(0) ? e = s.join(this.root, e) : (e = s.resolve(this.root, e), r && (e += "/"));
            }
            "win32" === process.platform && (e = e.replace(/\\/g, "/")), this._emitMatch(t, e);
          }
        }, m.prototype._stat = function(e) {
          var t = this._makeAbs(e), n = "/" === e.slice(-1);
          if (e.length > this.maxLength) return !1;
          if (!this.stat && f(this.cache, t)) {
            var o = this.cache[t];
            if (Array.isArray(o) && (o = "DIR"), !n || "DIR" === o) return o;
            if (n && "FILE" === o) return !1;
          }
          var i = this.statCache[t];
          if (!i) {
            var s;
            try {
              s = r.lstatSync(t);
            } catch (e) {
              if (e && ("ENOENT" === e.code || "ENOTDIR" === e.code)) return this.statCache[t] = !1, 
              !1;
            }
            if (s && s.isSymbolicLink()) try {
              i = r.statSync(t);
            } catch (e) {
              i = s;
            } else i = s;
          }
          return this.statCache[t] = i, o = !0, i && (o = i.isDirectory() ? "DIR" : "FILE"), 
          this.cache[t] = this.cache[t] || o, (!n || "FILE" !== o) && o;
        }, m.prototype._mark = function(e) {
          return u.mark(this, e);
        }, m.prototype._makeAbs = function(e) {
          return u.makeAbs(this, e);
        };
      }, function(e, t, n) {
        var r = n(70), o = Object.create(null), i = n(31);
        e.exports = r((function(e, t) {
          return o[e] ? (o[e].push(t), null) : (o[e] = [ t ], function(e) {
            return i((function t() {
              var n = o[e], r = n.length, i = function(e) {
                for (var t = e.length, n = [], r = 0; r < t; r++) n[r] = e[r];
                return n;
              }(arguments);
              try {
                for (var s = 0; s < r; s++) n[s].apply(null, i);
              } finally {
                n.length > r ? (n.splice(0, r), process.nextTick((function() {
                  t.apply(null, i);
                }))) : delete o[e];
              }
            }));
          }(e));
        }));
      }, function(e, t, n) {
        "use strict";
        var r = n(8), o = n(19), i = n(29), s = n(10), a = [].sort, c = [ 1, 2, 3 ];
        r(r.P + r.F * (s((function() {
          c.sort(void 0);
        })) || !s((function() {
          c.sort(null);
        })) || !n(102)(a)), "Array", {
          sort: function(e) {
            return void 0 === e ? a.call(i(this)) : a.call(i(this), o(e));
          }
        });
      }, function(e, t, n) {
        "use strict";
        var r = n(10);
        e.exports = function(e, t) {
          return !!e && r((function() {
            t ? e.call(null, (function() {}), 1) : e.call(null);
          }));
        };
      }, function(e, t, n) {
        "use strict";
        var r = n(104), o = n(73);
        e.exports = n(110)("Set", (function(e) {
          return function() {
            return e(this, arguments.length > 0 ? arguments[0] : void 0);
          };
        }), {
          add: function(e) {
            return r.def(o(this, "Set"), e = 0 === e ? 0 : e, e);
          }
        }, r);
      }, function(e, t, n) {
        "use strict";
        var r = n(11).f, o = n(71), i = n(40), s = n(12), a = n(37), c = n(38), u = n(106), l = n(109), f = n(63), p = n(9), h = n(72).fastKey, d = n(73), m = p ? "_s" : "size", g = function(e, t) {
          var n, r = h(t);
          if ("F" !== r) return e._i[r];
          for (n = e._f; n; n = n.n) if (n.k == t) return n;
        };
        e.exports = {
          getConstructor: function(e, t, n, u) {
            var l = e((function(e, r) {
              a(e, l, t, "_i"), e._t = t, e._i = o(null), e._f = void 0, e._l = void 0, e[m] = 0, 
              null != r && c(r, n, e[u], e);
            }));
            return i(l.prototype, {
              clear: function() {
                for (var e = d(this, t), n = e._i, r = e._f; r; r = r.n) r.r = !0, r.p && (r.p = r.p.n = void 0), 
                delete n[r.i];
                e._f = e._l = void 0, e[m] = 0;
              },
              delete: function(e) {
                var n = d(this, t), r = g(n, e);
                if (r) {
                  var o = r.n, i = r.p;
                  delete n._i[r.i], r.r = !0, i && (i.n = o), o && (o.p = i), n._f == r && (n._f = o), 
                  n._l == r && (n._l = i), n[m]--;
                }
                return !!r;
              },
              forEach: function(e) {
                d(this, t);
                for (var n, r = s(e, arguments.length > 1 ? arguments[1] : void 0, 3); n = n ? n.n : this._f; ) for (r(n.v, n.k, this); n && n.r; ) n = n.p;
              },
              has: function(e) {
                return !!g(d(this, t), e);
              }
            }), p && r(l.prototype, "size", {
              get: function() {
                return d(this, t)[m];
              }
            }), l;
          },
          def: function(e, t, n) {
            var r, o, i = g(e, t);
            return i ? i.v = n : (e._l = i = {
              i: o = h(t, !0),
              k: t,
              v: n,
              p: r = e._l,
              n: void 0,
              r: !1
            }, e._f || (e._f = i), r && (r.n = i), e[m]++, "F" !== o && (e._i[o] = i)), e;
          },
          getEntry: g,
          setStrong: function(e, t, n) {
            u(e, t, (function(e, n) {
              this._t = d(e, t), this._k = n, this._l = void 0;
            }), (function() {
              for (var e = this._k, t = this._l; t && t.r; ) t = t.p;
              return this._t && (this._l = t = t ? t.n : this._t._f) ? l(0, "keys" == e ? t.k : "values" == e ? t.v : [ t.k, t.v ]) : (this._t = void 0, 
              l(1));
            }), n ? "entries" : "values", !n, !0), f(t);
          }
        };
      }, function(e, t, n) {
        var r = n(11), o = n(7), i = n(42);
        e.exports = n(9) ? Object.defineProperties : function(e, t) {
          o(e);
          for (var n, s = i(t), a = s.length, c = 0; a > c; ) r.f(e, n = s[c++], t[n]);
          return e;
        };
      }, function(e, t, n) {
        "use strict";
        var r = n(36), o = n(8), i = n(14), s = n(13), a = n(39), c = n(107), u = n(26), l = n(108), f = n(3)("iterator"), p = !([].keys && "next" in [].keys()), h = function() {
          return this;
        };
        e.exports = function(e, t, n, d, m, g, v) {
          c(n, t, d);
          var y, b, w, x = function(e) {
            if (!p && e in j) return j[e];
            switch (e) {
             case "keys":
             case "values":
              return function() {
                return new n(this, e);
              };
            }
            return function() {
              return new n(this, e);
            };
          }, S = t + " Iterator", P = "values" == m, O = !1, j = e.prototype, E = j[f] || j["@@iterator"] || m && j[m], I = E || x(m), _ = m ? P ? x("entries") : I : void 0, A = "Array" == t && j.entries || E;
          if (A && (w = l(A.call(new e))) !== Object.prototype && w.next && (u(w, S, !0), 
          r || "function" == typeof w[f] || s(w, f, h)), P && E && "values" !== E.name && (O = !0, 
          I = function() {
            return E.call(this);
          }), r && !v || !p && !O && j[f] || s(j, f, I), a[t] = I, a[S] = h, m) if (y = {
            values: P ? I : x("values"),
            keys: g ? I : x("keys"),
            entries: _
          }, v) for (b in y) b in j || i(j, b, y[b]); else o(o.P + o.F * (p || O), t, y);
          return y;
        };
      }, function(e, t, n) {
        "use strict";
        var r = n(71), o = n(23), i = n(26), s = {};
        n(13)(s, n(3)("iterator"), (function() {
          return this;
        })), e.exports = function(e, t, n) {
          e.prototype = r(s, {
            next: o(1, n)
          }), i(e, t + " Iterator");
        };
      }, function(e, t, n) {
        var r = n(15), o = n(29), i = n(43)("IE_PROTO"), s = Object.prototype;
        e.exports = Object.getPrototypeOf || function(e) {
          return e = o(e), r(e, i) ? e[i] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? s : null;
        };
      }, function(e, t) {
        e.exports = function(e, t) {
          return {
            value: t,
            done: !!e
          };
        };
      }, function(e, t, n) {
        "use strict";
        var r = n(4), o = n(8), i = n(14), s = n(40), a = n(72), c = n(38), u = n(37), l = n(6), f = n(10), p = n(41), h = n(26), d = n(111);
        e.exports = function(e, t, n, m, g, v) {
          var y = r[e], b = y, w = g ? "set" : "add", x = b && b.prototype, S = {}, P = function(e) {
            var t = x[e];
            i(x, e, "delete" == e || "has" == e ? function(e) {
              return !(v && !l(e)) && t.call(this, 0 === e ? 0 : e);
            } : "get" == e ? function(e) {
              return v && !l(e) ? void 0 : t.call(this, 0 === e ? 0 : e);
            } : "add" == e ? function(e) {
              return t.call(this, 0 === e ? 0 : e), this;
            } : function(e, n) {
              return t.call(this, 0 === e ? 0 : e, n), this;
            });
          };
          if ("function" == typeof b && (v || x.forEach && !f((function() {
            (new b).entries().next();
          })))) {
            var O = new b, j = O[w](v ? {} : -0, 1) != O, E = f((function() {
              O.has(1);
            })), I = p((function(e) {
              new b(e);
            })), _ = !v && f((function() {
              for (var e = new b, t = 5; t--; ) e[w](t, t);
              return !e.has(-0);
            }));
            I || ((b = t((function(t, n) {
              u(t, b, e);
              var r = d(new y, t, b);
              return null != n && c(n, g, r[w], r), r;
            }))).prototype = x, x.constructor = b), (E || _) && (P("delete"), P("has"), g && P("get")), 
            (_ || j) && P(w), v && x.clear && delete x.clear;
          } else b = m.getConstructor(t, e, g, w), s(b.prototype, n), a.NEED = !0;
          return h(b, e), S[e] = b, o(o.G + o.W + o.F * (b != y), S), v || m.setStrong(b, e, g), 
          b;
        };
      }, function(e, t, n) {
        var r = n(6), o = n(112).set;
        e.exports = function(e, t, n) {
          var i, s = t.constructor;
          return s !== n && "function" == typeof s && (i = s.prototype) !== n.prototype && r(i) && o && o(e, i), 
          e;
        };
      }, function(e, t, n) {
        var r = n(6), o = n(7), i = function(e, t) {
          if (o(e), !r(t) && null !== t) throw TypeError(t + ": can't set as prototype!");
        };
        e.exports = {
          set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t, r) {
            try {
              (r = n(12)(Function.call, n(113).f(Object.prototype, "__proto__").set, 2))(e, []), 
              t = !(e instanceof Array);
            } catch (e) {
              t = !0;
            }
            return function(e, n) {
              return i(e, n), t ? e.__proto__ = n : r(e, n), e;
            };
          }({}, !1) : void 0),
          check: i
        };
      }, function(e, t, n) {
        var r = n(44), o = n(23), i = n(25), s = n(51), a = n(15), c = n(50), u = Object.getOwnPropertyDescriptor;
        t.f = n(9) ? u : function(e, t) {
          if (e = i(e), t = s(t, !0), c) try {
            return u(e, t);
          } catch (e) {}
          if (a(e, t)) return o(!r.f.call(e, t), e[t]);
        };
      }, function(e, t, n) {
        "use strict";
        var r = n(12), o = n(8), i = n(29), s = n(57), a = n(58), c = n(35), u = n(115), l = n(59);
        o(o.S + o.F * !n(41)((function(e) {
          Array.from(e);
        })), "Array", {
          from: function(e) {
            var t, n, o, f, p = i(e), h = "function" == typeof this ? this : Array, d = arguments.length, m = d > 1 ? arguments[1] : void 0, g = void 0 !== m, v = 0, y = l(p);
            if (g && (m = r(m, d > 2 ? arguments[2] : void 0, 2)), null == y || h == Array && a(y)) for (n = new h(t = c(p.length)); t > v; v++) u(n, v, g ? m(p[v], v) : p[v]); else for (f = y.call(p), 
            n = new h; !(o = f.next()).done; v++) u(n, v, g ? s(f, m, [ o.value, v ], !0) : o.value);
            return n.length = v, n;
          }
        });
      }, function(e, t, n) {
        "use strict";
        var r = n(11), o = n(23);
        e.exports = function(e, t, n) {
          t in e ? r.f(e, t, o(0, n)) : e[t] = n;
        };
      }, function(e, t, n) {
        "use strict";
        n(117);
        var r = n(7), o = n(75), i = n(9), s = /./.toString, a = function(e) {
          n(14)(RegExp.prototype, "toString", e, !0);
        };
        n(10)((function() {
          return "/a/b" != s.call({
            source: "a",
            flags: "b"
          });
        })) ? a((function() {
          var e = r(this);
          return "/".concat(e.source, "/", "flags" in e ? e.flags : !i && e instanceof RegExp ? o.call(e) : void 0);
        })) : "toString" != s.name && a((function() {
          return s.call(this);
        }));
      }, function(e, t, n) {
        n(9) && "g" != /./g.flags && n(11).f(RegExp.prototype, "flags", {
          configurable: !0,
          get: n(75)
        });
      }, function(e, t, n) {
        var r;
        function o(e, t, n) {
          if ("function" == typeof t && (n = t, t = {}), !n) {
            if ("function" != typeof Promise) throw new TypeError("callback not provided");
            return new Promise((function(n, r) {
              o(e, t || {}, (function(e, t) {
                e ? r(e) : n(t);
              }));
            }));
          }
          r(e, t || {}, (function(e, r) {
            e && ("EACCES" === e.code || t && t.ignoreErrors) && (e = null, r = !1), n(e, r);
          }));
        }
        n(5), r = "win32" === process.platform || global.TESTING_WINDOWS ? n(119) : n(120), 
        e.exports = o, o.sync = function(e, t) {
          try {
            return r.sync(e, t || {});
          } catch (e) {
            if (t && t.ignoreErrors || "EACCES" === e.code) return !1;
            throw e;
          }
        };
      }, function(e, t, n) {
        e.exports = i, i.sync = function(e, t) {
          return o(r.statSync(e), e, t);
        };
        var r = n(5);
        function o(e, t, n) {
          return !(!e.isSymbolicLink() && !e.isFile()) && function(e, t) {
            var n = void 0 !== t.pathExt ? t.pathExt : process.env.PATHEXT;
            if (!n) return !0;
            if (-1 !== (n = n.split(";")).indexOf("")) return !0;
            for (var r = 0; r < n.length; r++) {
              var o = n[r].toLowerCase();
              if (o && e.substr(-o.length).toLowerCase() === o) return !0;
            }
            return !1;
          }(t, n);
        }
        function i(e, t, n) {
          r.stat(e, (function(r, i) {
            n(r, !r && o(i, e, t));
          }));
        }
      }, function(e, t, n) {
        e.exports = o, o.sync = function(e, t) {
          return i(r.statSync(e), t);
        };
        var r = n(5);
        function o(e, t, n) {
          r.stat(e, (function(e, r) {
            n(e, !e && i(r, t));
          }));
        }
        function i(e, t) {
          return e.isFile() && function(e, t) {
            var n = e.mode, r = e.uid, o = e.gid, i = void 0 !== t.uid ? t.uid : process.getuid && process.getuid(), s = void 0 !== t.gid ? t.gid : process.getgid && process.getgid(), a = parseInt("100", 8), c = parseInt("010", 8);
            return n & parseInt("001", 8) || n & c && o === s || n & a && r === i || n & (a | c) && 0 === i;
          }(e, t);
        }
      }, function(e, t, n) {
        "use strict";
        e.exports = {
          androidSystemImages: /system-images;([\S \t]+)/g,
          androidAPILevels: /platforms;android-(\d+)[\S\s]/g,
          androidBuildTools: /build-tools;([\d|.]+)[\S\s]/g
        };
      }, function(e, t, n) {
        "use strict";
        n(2);
        var r = n(1);
        e.exports = {
          getNodeInfo: function() {
            return r.log("trace", "getNodeInfo"), Promise.all([ r.isWindows ? r.run("node -v").then(r.findVersion) : r.which("node").then((function(e) {
              return e ? r.run(e + " -v") : Promise.resolve("");
            })).then(r.findVersion), r.which("node").then(r.condensePath) ]).then((function(e) {
              return r.determineFound("Node", e[0], e[1]);
            }));
          },
          getnpmInfo: function() {
            return r.log("trace", "getnpmInfo"), Promise.all([ r.run("npm -v"), r.which("npm").then(r.condensePath) ]).then((function(e) {
              return r.determineFound("npm", e[0], e[1]);
            }));
          },
          getWatchmanInfo: function() {
            return r.log("trace", "getWatchmanInfo"), Promise.all([ r.which("watchman").then((function(e) {
              return e ? r.run(e + " -v") : void 0;
            })), r.which("watchman") ]).then((function(e) {
              return r.determineFound("Watchman", e[0], e[1]);
            }));
          },
          getYarnInfo: function() {
            return r.log("trace", "getYarnInfo"), Promise.all([ r.run("yarn -v"), r.which("yarn").then(r.condensePath) ]).then((function(e) {
              return r.determineFound("Yarn", e[0], e[1]);
            }));
          }
        };
      }, function(e, t, n) {
        "use strict";
        n(16), n(2), n(27);
        var r = n(5), o = n(17), i = n(1), s = n(0);
        e.exports = {
          getBraveBrowserInfo: function() {
            return i.log("trace", "getBraveBrowser"), (i.isLinux ? i.run("brave --version || brave-browser --version").then((function(e) {
              return e.replace(/^.* ([^ ]*)/g, "$1");
            })) : i.isMacOS ? i.getDarwinApplicationVersion(i.browserBundleIdentifiers["Brave Browser"]).then(i.findVersion) : Promise.resolve("N/A")).then((function(e) {
              return i.determineFound("Brave Browser", e, "N/A");
            }));
          },
          getChromeInfo: function() {
            var e;
            if (i.log("trace", "getChromeInfo"), i.isLinux) e = i.run("google-chrome --version").then((function(e) {
              return e.replace(" dev", "").replace(/^.* ([^ ]*)/g, "$1");
            })); else if (i.isMacOS) e = i.getDarwinApplicationVersion(i.browserBundleIdentifiers.Chrome).then(i.findVersion); else if (i.isWindows) {
              var t;
              try {
                t = i.findVersion(r.readdirSync(s.join(process.env["ProgramFiles(x86)"], "Google/Chrome/Application")).join("\n"));
              } catch (e) {
                t = i.NotFound;
              }
              e = Promise.resolve(t);
            } else e = Promise.resolve("N/A");
            return e.then((function(e) {
              return i.determineFound("Chrome", e, "N/A");
            }));
          },
          getChromeCanaryInfo: function() {
            return i.log("trace", "getChromeCanaryInfo"), i.getDarwinApplicationVersion(i.browserBundleIdentifiers["Chrome Canary"]).then((function(e) {
              return i.determineFound("Chrome Canary", e, "N/A");
            }));
          },
          getChromiumInfo: function() {
            return i.log("trace", "getChromiumInfo"), (i.isLinux ? i.run("chromium --version").then(i.findVersion) : Promise.resolve("N/A")).then((function(e) {
              return i.determineFound("Chromium", e, "N/A");
            }));
          },
          getEdgeInfo: function() {
            var e;
            if (i.log("trace", "getEdgeInfo"), i.isWindows && "10" === o.release().split(".")[0]) {
              var t = {
                Spartan: "Microsoft.MicrosoftEdge",
                Chromium: "Microsoft.MicrosoftEdge.Stable",
                ChromiumDev: "Microsoft.MicrosoftEdge.Dev"
              };
              e = Promise.all(Object.keys(t).map((function(e) {
                return function(e, t) {
                  return i.run(`powershell get-appxpackage ${e}`).then((function(e) {
                    if ("" !== i.findVersion(e)) return `${t} (${i.findVersion(e)})`;
                  }));
                }(t[e], e);
              })).filter((function(e) {
                return void 0 !== e;
              })));
            } else {
              if (!i.isMacOS) return Promise.resolve("N/A");
              e = i.getDarwinApplicationVersion(i.browserBundleIdentifiers["Microsoft Edge"]);
            }
            return e.then((function(e) {
              return i.determineFound("Edge", Array.isArray(e) ? e.filter((function(e) {
                return void 0 !== e;
              })) : e, i.NA);
            }));
          },
          getFirefoxInfo: function() {
            return i.log("trace", "getFirefoxInfo"), (i.isLinux ? i.run("firefox --version").then((function(e) {
              return e.replace(/^.* ([^ ]*)/g, "$1");
            })) : i.isMacOS ? i.getDarwinApplicationVersion(i.browserBundleIdentifiers.Firefox) : Promise.resolve("N/A")).then((function(e) {
              return i.determineFound("Firefox", e, "N/A");
            }));
          },
          getFirefoxDeveloperEditionInfo: function() {
            return i.log("trace", "getFirefoxDeveloperEditionInfo"), i.getDarwinApplicationVersion(i.browserBundleIdentifiers["Firefox Developer Edition"]).then((function(e) {
              return i.determineFound("Firefox Developer Edition", e, "N/A");
            }));
          },
          getFirefoxNightlyInfo: function() {
            return i.log("trace", "getFirefoxNightlyInfo"), (i.isLinux ? i.run("firefox-trunk --version").then((function(e) {
              return e.replace(/^.* ([^ ]*)/g, "$1");
            })) : i.isMacOS ? i.getDarwinApplicationVersion(i.browserBundleIdentifiers["Firefox Nightly"]) : Promise.resolve("N/A")).then((function(e) {
              return i.determineFound("Firefox Nightly", e, "N/A");
            }));
          },
          getInternetExplorerInfo: function() {
            var e;
            if (i.log("trace", "getInternetExplorerInfo"), i.isWindows) {
              var t = [ process.env.SYSTEMDRIVE || "C:", "Program Files", "Internet Explorer", "iexplore.exe" ].join("\\\\");
              e = i.run(`wmic datafile where "name='${t}'" get Version`).then(i.findVersion);
            } else e = Promise.resolve("N/A");
            return e.then((function(e) {
              return i.determineFound("Internet Explorer", e, "N/A");
            }));
          },
          getSafariTechnologyPreviewInfo: function() {
            return i.log("trace", "getSafariTechnologyPreviewInfo"), i.getDarwinApplicationVersion(i.browserBundleIdentifiers["Safari Technology Preview"]).then((function(e) {
              return i.determineFound("Safari Technology Preview", e, "N/A");
            }));
          },
          getSafariInfo: function() {
            return i.log("trace", "getSafariInfo"), i.getDarwinApplicationVersion(i.browserBundleIdentifiers.Safari).then((function(e) {
              return i.determineFound("Safari", e, "N/A");
            }));
          }
        };
      }, function(e, t, n) {
        "use strict";
        n(32), n(2);
        var r = n(1);
        e.exports = {
          getMongoDBInfo: function() {
            return r.log("trace", "getMongoDBInfo"), Promise.all([ r.run("mongo --version").then(r.findVersion), r.which("mongo") ]).then((function(e) {
              return r.determineFound("MongoDB", e[0], e[1]);
            }));
          },
          getMySQLInfo: function() {
            return r.log("trace", "getMySQLInfo"), Promise.all([ r.run("mysql --version").then((function(e) {
              return `${r.findVersion(e, null, 1)}${e.includes("MariaDB") ? " (MariaDB)" : ""}`;
            })), r.which("mysql") ]).then((function(e) {
              return r.determineFound("MySQL", e[0], e[1]);
            }));
          },
          getPostgreSQLInfo: function() {
            return r.log("trace", "getPostgreSQLInfo"), Promise.all([ r.run("postgres --version").then(r.findVersion), r.which("postgres") ]).then((function(e) {
              return r.determineFound("PostgreSQL", e[0], e[1]);
            }));
          },
          getSQLiteInfo: function() {
            return r.log("trace", "getSQLiteInfo"), Promise.all([ r.run("sqlite3 --version").then(r.findVersion), r.which("sqlite3") ]).then((function(e) {
              return r.determineFound("SQLite", e[0], e[1]);
            }));
          }
        };
      }, function(e, t, n) {
        "use strict";
        n(27), n(16), n(2);
        var r = n(0), o = n(1);
        e.exports = {
          getAndroidStudioInfo: function() {
            var e = Promise.resolve("N/A");
            return o.isMacOS ? e = o.run(o.generatePlistBuddyCommand(r.join("/", "Applications", "Android\\ Studio.app", "Contents", "Info.plist"), [ "CFBundleShortVersionString", "CFBundleVersion" ])).then((function(e) {
              return e || o.run(o.generatePlistBuddyCommand(r.join("~", "Applications", "JetBrains\\ Toolbox", "Android\\ Studio.app", "Contents", "Info.plist"), [ "CFBundleShortVersionString", "CFBundleVersion" ]));
            })).then((function(e) {
              return e.split("\n").join(" ");
            })) : o.isLinux ? e = Promise.all([ o.run('cat /opt/android-studio/bin/studio.sh | grep "$Home/.AndroidStudio" | head -1').then(o.findVersion), o.run("cat /opt/android-studio/build.txt") ]).then((function(e) {
              return `${e[0]} ${e[1]}`.trim() || o.NotFound;
            })) : o.isWindows && (e = Promise.all([ o.run('wmic datafile where name="C:\\\\Program Files\\\\Android\\\\Android Studio\\\\bin\\\\studio.exe" get Version').then((function(e) {
              return e.replace(/(\r\n|\n|\r)/gm, "");
            })), o.run('type "C:\\\\Program Files\\\\Android\\\\Android Studio\\\\build.txt"').then((function(e) {
              return e.replace(/(\r\n|\n|\r)/gm, "");
            })) ]).then((function(e) {
              return `${e[0]} ${e[1]}`.trim() || o.NotFound;
            }))), e.then((function(e) {
              return o.determineFound("Android Studio", e);
            }));
          },
          getAtomInfo: function() {
            return o.log("trace", "getAtomInfo"), Promise.all([ o.getDarwinApplicationVersion(o.ideBundleIdentifiers.Atom), "N/A" ]).then((function(e) {
              return o.determineFound("Atom", e[0], e[1]);
            }));
          },
          getEmacsInfo: function() {
            return o.log("trace", "getEmacsInfo"), o.isMacOS || o.isLinux ? Promise.all([ o.run("emacs --version").then(o.findVersion), o.run("which emacs") ]).then((function(e) {
              return o.determineFound("Emacs", e[0], e[1]);
            })) : Promise.resolve([ "Emacs", "N/A" ]);
          },
          getIntelliJInfo: function() {
            return o.log("trace", "getIntelliJInfo"), o.getDarwinApplicationVersion(o.ideBundleIdentifiers.IntelliJ).then((function(e) {
              return o.determineFound("IntelliJ", e);
            }));
          },
          getNanoInfo: function() {
            return o.log("trace", "getNanoInfo"), o.isMacOS || o.isLinux ? Promise.all([ o.run("nano --version").then(o.findVersion), o.run("which nano") ]).then((function(e) {
              return o.determineFound("Nano", e[0], e[1]);
            })) : Promise.resolve([ "Nano", "N/A" ]);
          },
          getNvimInfo: function() {
            return o.log("trace", "getNvimInfo"), o.isMacOS || o.isLinux ? Promise.all([ o.run("nvim --version").then(o.findVersion), o.run("which nvim") ]).then((function(e) {
              return o.determineFound("Nvim", e[0], e[1]);
            })) : Promise.resolve([ "Vim", "N/A" ]);
          },
          getPhpStormInfo: function() {
            return o.log("trace", "getPhpStormInfo"), o.getDarwinApplicationVersion(o.ideBundleIdentifiers.PhpStorm).then((function(e) {
              return o.determineFound("PhpStorm", e);
            }));
          },
          getSublimeTextInfo: function() {
            return o.log("trace", "getSublimeTextInfo"), Promise.all([ o.run("subl --version").then((function(e) {
              return o.findVersion(e, /\d+/);
            })), o.which("subl") ]).then((function(e) {
              return "" === e[0] && o.isMacOS ? (o.log("trace", "getSublimeTextInfo using plist"), 
              Promise.all([ o.getDarwinApplicationVersion(o.ideBundleIdentifiers["Sublime Text"]), "N/A" ])) : e;
            })).then((function(e) {
              return o.determineFound("Sublime Text", e[0], e[1]);
            }));
          },
          getVimInfo: function() {
            return o.log("trace", "getVimInfo"), o.isMacOS || o.isLinux ? Promise.all([ o.run("vim --version").then(o.findVersion), o.run("which vim") ]).then((function(e) {
              return o.determineFound("Vim", e[0], e[1]);
            })) : Promise.resolve([ "Vim", "N/A" ]);
          },
          getVSCodeInfo: function() {
            return o.log("trace", "getVSCodeInfo"), Promise.all([ o.run("code --version").then(o.findVersion), o.which("code") ]).then((function(e) {
              return o.determineFound("VSCode", e[0], e[1]);
            }));
          },
          getVisualStudioInfo: function() {
            return o.log("trace", "getVisualStudioInfo"), o.isWindows ? o.run(`"${process.env["ProgramFiles(x86)"]}/Microsoft Visual Studio/Installer/vswhere.exe" -format json -prerelease`).then((function(e) {
              var t = JSON.parse(e).map((function(e) {
                return {
                  Version: e.installationVersion,
                  DisplayName: e.displayName
                };
              }));
              return o.determineFound("Visual Studio", t.map((function(e) {
                return `${e.Version} (${e.DisplayName})`;
              })));
            })).catch((function() {
              return Promise.resolve([ "Visual Studio", o.NotFound ]);
            })) : Promise.resolve([ "Visual Studio", o.NA ]);
          },
          getWebStormInfo: function() {
            return o.log("trace", "getWebStormInfo"), o.getDarwinApplicationVersion(o.ideBundleIdentifiers.WebStorm).then((function(e) {
              return o.determineFound("WebStorm", e);
            }));
          },
          getXcodeInfo: function() {
            return o.log("trace", "getXcodeInfo"), o.isMacOS ? Promise.all([ o.which("xcodebuild").then((function(e) {
              return o.run(e + " -version");
            })).then((function(e) {
              return `${o.findVersion(e)}/${e.split("Build version ")[1]}`;
            })), o.which("xcodebuild") ]).then((function(e) {
              return o.determineFound("Xcode", e[0], e[1]);
            })) : Promise.resolve([ "Xcode", "N/A" ]);
          }
        };
      }, function(e, t, n) {
        "use strict";
        n(2);
        var r = n(1);
        e.exports = {
          getBashInfo: function() {
            return r.log("trace", "getBashInfo"), Promise.all([ r.run("bash --version").then(r.findVersion), r.which("bash") ]).then((function(e) {
              return r.determineFound("Bash", e[0], e[1]);
            }));
          },
          getElixirInfo: function() {
            return r.log("trace", "getElixirInfo"), Promise.all([ r.run("elixir --version").then((function(e) {
              return r.findVersion(e, /[Elixir]+\s([\d+.[\d+|.]+)/, 1);
            })), r.which("elixir") ]).then((function(e) {
              return Promise.resolve(r.determineFound("Elixir", e[0], e[1]));
            }));
          },
          getErlangInfo: function() {
            return r.log("trace", "getErlangInfo"), Promise.all([ r.run("erl -eval \"{ok, Version} = file:read_file(filename:join([code:root_dir(), 'releases', erlang:system_info(otp_release), 'OTP_VERSION'])), io:fwrite(Version), halt().\" -noshell").then(r.findVersion), r.which("erl") ]).then((function(e) {
              return Promise.resolve(r.determineFound("Erlang", e[0], e[1]));
            }));
          },
          getGoInfo: function() {
            return r.log("trace", "getGoInfo"), Promise.all([ r.run("go version").then(r.findVersion), r.which("go") ]).then((function(e) {
              return r.determineFound("Go", e[0], e[1]);
            }));
          },
          getJavaInfo: function() {
            return r.log("trace", "getJavaInfo"), Promise.all([ r.run("javac -version", {
              unify: !0
            }).then((function(e) {
              return r.findVersion(e, /\d+\.[\w+|.|_|-]+/);
            })), r.run("which javac") ]).then((function(e) {
              return r.determineFound("Java", e[0], e[1]);
            }));
          },
          getPerlInfo: function() {
            return r.log("trace", "getPerlInfo"), Promise.all([ r.run("perl -v").then(r.findVersion), r.which("perl") ]).then((function(e) {
              return r.determineFound("Perl", e[0], e[1]);
            }));
          },
          getPHPInfo: function() {
            return r.log("trace", "getPHPInfo"), Promise.all([ r.run("php -v").then(r.findVersion), r.which("php") ]).then((function(e) {
              return r.determineFound("PHP", e[0], e[1]);
            }));
          },
          getProtocInfo: function() {
            return r.log("trace", "getProtocInfo"), Promise.all([ r.run("protoc --version").then(r.findVersion), r.run("which protoc") ]).then((function(e) {
              return r.determineFound("Protoc", e[0], e[1]);
            }));
          },
          getPythonInfo: function() {
            return r.log("trace", "getPythonInfo"), Promise.all([ r.run("python -V 2>&1").then(r.findVersion), r.run("which python") ]).then((function(e) {
              return r.determineFound("Python", e[0], e[1]);
            }));
          },
          getPython3Info: function() {
            return r.log("trace", "getPython3Info"), Promise.all([ r.run("python3 -V 2>&1").then(r.findVersion), r.run("which python3") ]).then((function(e) {
              return r.determineFound("Python3", e[0], e[1]);
            }));
          },
          getRInfo: function() {
            return r.log("trace", "getRInfo"), Promise.all([ r.run("R --version", {
              unify: !0
            }).then(r.findVersion), r.which("R") ]).then((function(e) {
              return r.determineFound("R", e[0], e[1]);
            }));
          },
          getRubyInfo: function() {
            return r.log("trace", "getRubyInfo"), Promise.all([ r.run("ruby -v").then(r.findVersion), r.which("ruby") ]).then((function(e) {
              return r.determineFound("Ruby", e[0], e[1]);
            }));
          },
          getRustInfo: function() {
            return r.log("trace", "getRustInfo"), Promise.all([ r.run("rustc --version").then(r.findVersion), r.run("which rustc") ]).then((function(e) {
              return r.determineFound("Rust", e[0], e[1]);
            }));
          },
          getScalaInfo: function() {
            return r.log("trace", "getScalaInfo"), r.isMacOS || r.isLinux ? Promise.all([ r.run("scalac -version").then(r.findVersion), r.run("which scalac") ]).then((function(e) {
              return r.determineFound("Scala", e[0], e[1]);
            })) : Promise.resolve([ "Scala", "N/A" ]);
          }
        };
      }, function(e, t, n) {
        "use strict";
        n(2);
        var r = n(1);
        e.exports = {
          getAptInfo: function() {
            return r.log("trace", "getAptInfo"), r.isLinux ? Promise.all([ r.run("apt --version").then(r.findVersion), r.which("apt") ]).then((function(e) {
              return r.determineFound("Apt", e[0], e[1]);
            })) : Promise.all([ "Apt", "N/A" ]);
          },
          getCargoInfo: function() {
            return r.log("trace", "getCargoInfo"), Promise.all([ r.run("cargo --version").then(r.findVersion), r.which("cargo").then(r.condensePath) ]).then((function(e) {
              return r.determineFound("Cargo", e[0], e[1]);
            }));
          },
          getCocoaPodsInfo: function() {
            return r.log("trace", "getCocoaPodsInfo"), r.isMacOS ? Promise.all([ r.run("pod --version").then(r.findVersion), r.which("pod") ]).then((function(e) {
              return r.determineFound("CocoaPods", e[0], e[1]);
            })) : Promise.all([ "CocoaPods", "N/A" ]);
          },
          getComposerInfo: function() {
            return r.log("trace", "getComposerInfo"), Promise.all([ r.run("composer --version").then(r.findVersion), r.which("composer").then(r.condensePath) ]).then((function(e) {
              return r.determineFound("Composer", e[0], e[1]);
            }));
          },
          getGradleInfo: function() {
            return r.log("trace", "getGradleInfo"), Promise.all([ r.run("gradle --version").then(r.findVersion), r.which("gradle").then(r.condensePath) ]).then((function(e) {
              return r.determineFound("Gradle", e[0], e[1]);
            }));
          },
          getHomebrewInfo: function() {
            return r.log("trace", "getHomebrewInfo"), r.isMacOS ? Promise.all([ r.run("brew --version").then(r.findVersion), r.which("brew") ]).then((function(e) {
              return r.determineFound("Homebrew", e[0], e[1]);
            })) : Promise.all([ "Homebrew", "N/A" ]);
          },
          getMavenInfo: function() {
            return r.log("trace", "getMavenInfo"), Promise.all([ r.run("mvn --version").then(r.findVersion), r.which("mvn").then(r.condensePath) ]).then((function(e) {
              return r.determineFound("Maven", e[0], e[1]);
            }));
          },
          getpip2Info: function() {
            return r.log("trace", "getpip2Info"), Promise.all([ r.run("pip2 --version").then(r.findVersion), r.which("pip2").then(r.condensePath) ]).then((function(e) {
              return r.determineFound("pip2", e[0], e[1]);
            }));
          },
          getpip3Info: function() {
            return r.log("trace", "getpip3Info"), Promise.all([ r.run("pip3 --version").then(r.findVersion), r.which("pip3").then(r.condensePath) ]).then((function(e) {
              return r.determineFound("pip3", e[0], e[1]);
            }));
          },
          getRubyGemsInfo: function() {
            return r.log("trace", "getRubyGemsInfo"), Promise.all([ r.run("gem --version").then(r.findVersion), r.which("gem") ]).then((function(e) {
              return r.determineFound("RubyGems", e[0], e[1]);
            }));
          },
          getYumInfo: function() {
            return r.log("trace", "getYumInfo"), r.isLinux ? Promise.all([ r.run("yum --version").then(r.findVersion), r.which("yum") ]).then((function(e) {
              return r.determineFound("Yum", e[0], e[1]);
            })) : Promise.all([ "Yum", "N/A" ]);
          }
        };
      }, function(e, t, n) {
        "use strict";
        n(2);
        var r = n(1), o = n(0);
        e.exports = {
          getYarnWorkspacesInfo: function() {
            return r.log("trace", "getYarnWorkspacesInfo"), Promise.all([ r.run("yarn -v"), r.getPackageJsonByPath("package.json").then((function(e) {
              return e && "workspaces" in e;
            })) ]).then((function(e) {
              var t = "Yarn Workspaces";
              return e[0] && e[1] ? Promise.resolve([ t, e[0] ]) : Promise.resolve([ t, "Not Found" ]);
            }));
          },
          getLernaInfo: function() {
            return r.log("trace", "getLernaInfo"), Promise.all([ r.getPackageJsonByName("lerna").then((function(e) {
              return e && e.version;
            })), r.fileExists(o.join(process.cwd(), "lerna.json")) ]).then((function(e) {
              return e[0] && e[1] ? Promise.resolve([ "Lerna", e[0] ]) : Promise.resolve([ "Lerna", "Not Found" ]);
            }));
          }
        };
      }, function(e, t, n) {
        "use strict";
        n(22), n(2), n(16);
        var r = n(5), o = n(0), i = n(1);
        e.exports = {
          getAndroidSDKInfo: function() {
            return i.run("sdkmanager --list").then((function(e) {
              return !e && process.env.ANDROID_HOME ? i.run(`${process.env.ANDROID_HOME}/tools/bin/sdkmanager --list`) : e;
            })).then((function(e) {
              return !e && process.env.ANDROID_HOME ? i.run(`${process.env.ANDROID_HOME}/cmdline-tools/latest/bin/sdkmanager --list`) : e;
            })).then((function(e) {
              return !e && i.isMacOS ? i.run("~/Library/Android/sdk/tools/bin/sdkmanager --list") : e;
            })).then((function(e) {
              var t = i.parseSDKManagerOutput(e), n = function(e) {
                var t, n = o.join(e, "source.properties");
                try {
                  t = r.readFileSync(n, "utf8");
                } catch (e) {
                  if ("ENOENT" === e.code) return;
                  throw e;
                }
                for (var i = t.split("\n"), s = 0; s < i.length; s += 1) {
                  var a = i[s].split("=");
                  if (2 === a.length && "Pkg.Revision" === a[0].trim()) return a[1].trim();
                }
              }, s = process.env.ANDROID_NDK ? n(process.env.ANDROID_NDK) : process.env.ANDROID_NDK_HOME ? n(process.env.ANDROID_NDK_HOME) : process.env.ANDROID_HOME ? n(o.join(process.env.ANDROID_HOME, "ndk-bundle")) : void 0;
              return t.buildTools.length || t.apiLevels.length || t.systemImages.length || s ? Promise.resolve([ "Android SDK", {
                "API Levels": t.apiLevels || i.NotFound,
                "Build Tools": t.buildTools || i.NotFound,
                "System Images": t.systemImages || i.NotFound,
                "Android NDK": s || i.NotFound
              } ]) : Promise.resolve([ "Android SDK", i.NotFound ]);
            }));
          },
          getiOSSDKInfo: function() {
            return i.isMacOS ? i.run("xcodebuild -showsdks").then((function(e) {
              return e.match(/[\w]+\s[\d|.]+/g);
            })).then(i.uniq).then((function(e) {
              return e.length ? [ "iOS SDK", {
                Platforms: e
              } ] : [ "iOS SDK", i.NotFound ];
            })) : Promise.resolve([ "iOS SDK", "N/A" ]);
          },
          getWindowsSDKInfo: function() {
            if (i.log("trace", "getWindowsSDKInfo"), i.isWindows) {
              var e = i.NotFound;
              return i.run("reg query HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\AppModelUnlock").then((function(t) {
                e = t.split(/[\r\n]/g).slice(1).filter((function(e) {
                  return "" !== e;
                })).reduce((function(e, t) {
                  var n = t.match(/[^\s]+/g);
                  return "0x0" !== n[2] && "0x1" !== n[2] || (n[2] = "0x1" === n[2] ? "Enabled" : "Disabled"), 
                  e[n[0]] = n[2], e;
                }), {}), 0 === Object.keys(e).length && (e = i.NotFound);
                try {
                  var n = r.readdirSync(`${process.env["ProgramFiles(x86)"]}/Windows Kits/10/Platforms/UAP`);
                  e.Versions = n;
                } catch (e) {}
                return Promise.resolve([ "Windows SDK", e ]);
              }));
            }
            return Promise.resolve([ "Windows SDK", i.NA ]);
          }
        };
      }, function(e, t, n) {
        "use strict";
        n(2);
        var r = n(1);
        e.exports = {
          getApacheInfo: function() {
            return r.log("trace", "getApacheInfo"), r.isMacOS || r.isLinux ? Promise.all([ r.run("apachectl -v").then(r.findVersion), r.run("which apachectl") ]).then((function(e) {
              return r.determineFound("Apache", e[0], e[1]);
            })) : Promise.resolve([ "Apache", "N/A" ]);
          },
          getNginxInfo: function() {
            return r.log("trace", "getNginxInfo"), r.isMacOS || r.isLinux ? Promise.all([ r.run("nginx -v 2>&1").then(r.findVersion), r.run("which nginx") ]).then((function(e) {
              return r.determineFound("Nginx", e[0], e[1]);
            })) : Promise.resolve([ "Nginx", "N/A" ]);
          }
        };
      }, function(e, t, n) {
        "use strict";
        n(22), n(2);
        var r = n(132), o = n(1), i = n(17);
        e.exports = {
          getContainerInfo: function() {
            return o.log("trace", "getContainerInfo"), o.isLinux ? Promise.all([ o.fileExists("/.dockerenv"), o.readFile("/proc/self/cgroup") ]).then((function(e) {
              return o.log("trace", "getContainerInfoThen", e), Promise.resolve([ "Container", e[0] || e[1] ? "Yes" : "N/A" ]);
            })).catch((function(e) {
              return o.log("trace", "getContainerInfoCatch", e);
            })) : Promise.resolve([ "Container", "N/A" ]);
          },
          getCPUInfo: function() {
            var e;
            o.log("trace", "getCPUInfo");
            try {
              var t = i.cpus();
              e = "(" + t.length + ") " + i.arch() + " " + t[0].model;
            } catch (t) {
              e = "Unknown";
            }
            return Promise.all([ "CPU", e ]);
          },
          getMemoryInfo: function() {
            return o.log("trace", "getMemoryInfo"), Promise.all([ "Memory", `${o.toReadableBytes(i.freemem())} / ${o.toReadableBytes(i.totalmem())}` ]);
          },
          getOSInfo: function() {
            return o.log("trace", "getOSInfo"), (o.isMacOS ? o.run("sw_vers -productVersion ") : o.isLinux ? o.run("cat /etc/os-release").then((function(e) {
              var t = (e || "").match(/NAME="(.+)"/) || "", n = (e || "").match(/VERSION="(.+)"/) || [ "", "" ], r = null !== n ? n[1] : "";
              return `${t[1]} ${r}`.trim() || "";
            })) : o.isWindows ? Promise.resolve(i.release()) : Promise.resolve()).then((function(e) {
              var t = r(i.platform(), i.release());
              return e && (t += ` ${e}`), [ "OS", t ];
            }));
          },
          getShellInfo: function() {
            if (o.log("trace", "getShellInfo", process.env), o.isMacOS || o.isLinux) {
              var e = process.env.SHELL || o.runSync("getent passwd $LOGNAME | cut -d: -f7 | head -1"), t = `${e} --version 2>&1`;
              return e.match("/bin/ash") && (t = `${e} --help 2>&1`), Promise.all([ o.run(t).then(o.findVersion), o.which(e) ]).then((function(e) {
                return o.determineFound("Shell", e[0] || "Unknown", e[1]);
              }));
            }
            return Promise.resolve([ "Shell", "N/A" ]);
          },
          getGLibcInfo: function() {
            return o.log("trace", "getGLibc"), o.isLinux ? Promise.all([ o.run("ldd --version").then(o.findVersion) ]).then((function(e) {
              return o.determineFound("GLibc", e[0] || "Unknown");
            })) : Promise.resolve([ "GLibc", "N/A" ]);
          }
        };
      }, function(e, t, n) {
        "use strict";
        const r = n(17), o = n(133), i = n(134);
        e.exports = (e, t) => {
          if (!e && t) throw new Error("You can't specify a `release` without specifying `platform`");
          let n;
          return "darwin" === (e = e || r.platform()) ? (t || "darwin" !== r.platform() || (t = r.release()), 
          (t ? Number(t.split(".")[0]) > 15 ? "macOS" : "OS X" : "macOS") + ((n = t ? o(t).name : "") ? " " + n : "")) : "linux" === e ? (t || "linux" !== r.platform() || (t = r.release()), 
          "Linux" + ((n = t ? t.replace(/^(\d+\.\d+).*/, "$1") : "") ? " " + n : "")) : "win32" === e ? (t || "win32" !== r.platform() || (t = r.release()), 
          "Windows" + ((n = t ? i(t) : "") ? " " + n : "")) : e;
        };
      }, function(e, t, n) {
        "use strict";
        const r = n(17), o = new Map([ [ 18, "Mojave" ], [ 17, "High Sierra" ], [ 16, "Sierra" ], [ 15, "El Capitan" ], [ 14, "Yosemite" ], [ 13, "Mavericks" ], [ 12, "Mountain Lion" ], [ 11, "Lion" ], [ 10, "Snow Leopard" ], [ 9, "Leopard" ], [ 8, "Tiger" ], [ 7, "Panther" ], [ 6, "Jaguar" ], [ 5, "Puma" ] ]), i = e => (e = Number((e || r.release()).split(".")[0]), 
        {
          name: o.get(e),
          version: "10." + (e - 4)
        });
        e.exports = i, e.exports.default = i;
      }, function(e, t, n) {
        "use strict";
        const r = n(17), o = n(135), i = new Map([ [ "10.0", "10" ], [ "6.3", "8.1" ], [ "6.2", "8" ], [ "6.1", "7" ], [ "6.0", "Vista" ], [ "5.2", "Server 2003" ], [ "5.1", "XP" ], [ "5.0", "2000" ], [ "4.9", "ME" ], [ "4.1", "98" ], [ "4.0", "95" ] ]);
        e.exports = e => {
          const t = /\d+\.\d/.exec(e || r.release());
          if (e && !t) throw new Error("`release` argument doesn't match `n.n`");
          const n = (t || [])[0];
          if ((!e || e === r.release()) && [ "6.1", "6.2", "6.3", "10.0" ].includes(n)) {
            const e = ((o.sync("wmic", [ "os", "get", "Caption" ]).stdout || "").match(/2008|2012|2016/) || [])[0];
            if (e) return `Server ${e}`;
          }
          return i.get(n);
        };
      }, function(e, t, n) {
        "use strict";
        const r = n(0), o = n(49), i = n(136), s = n(146), a = n(147), c = n(148), u = n(149), l = n(154), f = n(155), p = n(157), h = n(158);
        function m(e, t, n) {
          let o;
          return (n = Object.assign({
            extendEnv: !0,
            env: {}
          }, n)).extendEnv && (n.env = Object.assign({}, process.env, n.env)), !0 === n.__winShell ? (delete n.__winShell, 
          o = {
            command: e,
            args: t,
            options: n,
            file: e,
            original: {
              cmd: e,
              args: t
            }
          }) : o = i._parse(e, t, n), (n = Object.assign({
            maxBuffer: 1e7,
            buffer: !0,
            stripEof: !0,
            preferLocal: !0,
            localDir: o.options.cwd || process.cwd(),
            encoding: "utf8",
            reject: !0,
            cleanup: !0
          }, o.options)).stdio = h(n), n.preferLocal && (n.env = a.env(Object.assign({}, n, {
            cwd: n.localDir
          }))), n.detached && (n.cleanup = !1), "win32" === process.platform && "cmd.exe" === r.basename(o.command) && o.args.unshift("/q"), 
          {
            cmd: o.command,
            args: o.args,
            opts: n,
            parsed: o
          };
        }
        function g(e, t) {
          return t && e.stripEof && (t = s(t)), t;
        }
        function v(e, t, n) {
          let r = "/bin/sh", o = [ "-c", t ];
          return n = Object.assign({}, n), "win32" === process.platform && (n.__winShell = !0, 
          r = process.env.comspec || "cmd.exe", o = [ "/s", "/c", `"${t}"` ], n.windowsVerbatimArguments = !0), 
          n.shell && (r = n.shell, delete n.shell), e(r, o, n);
        }
        function y(e, t, {encoding: n, buffer: r, maxBuffer: o}) {
          if (!e[t]) return null;
          let i;
          return (i = r ? n ? u(e[t], {
            encoding: n,
            maxBuffer: o
          }) : u.buffer(e[t], {
            maxBuffer: o
          }) : new Promise(((n, r) => {
            e[t].once("end", n).once("error", r);
          }))).catch((e => {
            throw e.stream = t, e.message = `${t} ${e.message}`, e;
          }));
        }
        function b(e, t) {
          const {stdout: n, stderr: r} = e;
          let o = e.error;
          const {code: i, signal: s} = e, {parsed: a, joinedCmd: c} = t, u = t.timedOut || !1;
          if (!o) {
            let e = "";
            Array.isArray(a.opts.stdio) ? ("inherit" !== a.opts.stdio[2] && (e += e.length > 0 ? r : `\n${r}`), 
            "inherit" !== a.opts.stdio[1] && (e += `\n${n}`)) : "inherit" !== a.opts.stdio && (e = `\n${r}${n}`), 
            (o = new Error(`Command failed: ${c}${e}`)).code = i < 0 ? p(i) : i;
          }
          return o.stdout = n, o.stderr = r, o.failed = !0, o.signal = s || null, o.cmd = c, 
          o.timedOut = u, o;
        }
        function w(e, t) {
          let n = e;
          return Array.isArray(t) && t.length > 0 && (n += " " + t.join(" ")), n;
        }
        e.exports = (e, t, n) => {
          const r = m(e, t, n), {encoding: s, buffer: a, maxBuffer: u} = r.opts, p = w(e, t);
          let h, d;
          try {
            h = o.spawn(r.cmd, r.args, r.opts);
          } catch (e) {
            return Promise.reject(e);
          }
          r.opts.cleanup && (d = f((() => {
            h.kill();
          })));
          let v = null, x = !1;
          const S = () => {
            v && (clearTimeout(v), v = null), d && d();
          };
          r.opts.timeout > 0 && (v = setTimeout((() => {
            v = null, x = !0, h.kill(r.opts.killSignal);
          }), r.opts.timeout));
          const P = new Promise((e => {
            h.on("exit", ((t, n) => {
              S(), e({
                code: t,
                signal: n
              });
            })), h.on("error", (t => {
              S(), e({
                error: t
              });
            })), h.stdin && h.stdin.on("error", (t => {
              S(), e({
                error: t
              });
            }));
          }));
          function O() {
            h.stdout && h.stdout.destroy(), h.stderr && h.stderr.destroy();
          }
          const j = () => l(Promise.all([ P, y(h, "stdout", {
            encoding: s,
            buffer: a,
            maxBuffer: u
          }), y(h, "stderr", {
            encoding: s,
            buffer: a,
            maxBuffer: u
          }) ]).then((e => {
            const t = e[0];
            if (t.stdout = e[1], t.stderr = e[2], t.error || 0 !== t.code || null !== t.signal) {
              const e = b(t, {
                joinedCmd: p,
                parsed: r,
                timedOut: x
              });
              if (e.killed = e.killed || h.killed, !r.opts.reject) return e;
              throw e;
            }
            return {
              stdout: g(r.opts, t.stdout),
              stderr: g(r.opts, t.stderr),
              code: 0,
              failed: !1,
              killed: !1,
              signal: null,
              cmd: p,
              timedOut: !1
            };
          })), O);
          return i._enoent.hookChildProcess(h, r.parsed), function(e, t) {
            null != t && (c(t) ? t.pipe(e.stdin) : e.stdin.end(t));
          }(h, r.opts.input), h.then = (e, t) => j().then(e, t), h.catch = e => j().catch(e), 
          h;
        }, e.exports.stdout = (...t) => e.exports(...t).then((e => e.stdout)), e.exports.stderr = (...t) => e.exports(...t).then((e => e.stderr)), 
        e.exports.shell = (t, n) => v(e.exports, t, n), e.exports.sync = (e, t, n) => {
          const r = m(e, t, n), i = w(e, t);
          if (c(r.opts.input)) throw new TypeError("The `input` option cannot be a stream in sync mode");
          const s = o.spawnSync(r.cmd, r.args, r.opts);
          if (s.code = s.status, s.error || 0 !== s.status || null !== s.signal) {
            const e = b(s, {
              joinedCmd: i,
              parsed: r
            });
            if (!r.opts.reject) return e;
            throw e;
          }
          return {
            stdout: g(r.opts, s.stdout),
            stderr: g(r.opts, s.stderr),
            code: 0,
            failed: !1,
            signal: null,
            cmd: i,
            timedOut: !1
          };
        }, e.exports.shellSync = (t, n) => v(e.exports.sync, t, n);
      }, function(e, t, n) {
        "use strict";
        const r = n(49), o = n(137), i = n(145);
        function s(e, t, n) {
          const s = o(e, t, n), a = r.spawn(s.command, s.args, s.options);
          return i.hookChildProcess(a, s), a;
        }
        e.exports = s, e.exports.spawn = s, e.exports.sync = function(e, t, n) {
          const s = o(e, t, n), a = r.spawnSync(s.command, s.args, s.options);
          return a.error = a.error || i.verifyENOENTSync(a.status, s), a;
        }, e.exports._parse = o, e.exports._enoent = i;
      }, function(e, t, n) {
        "use strict";
        const r = n(0), o = n(138), i = n(139), s = n(140), a = n(141), c = n(144), u = "win32" === process.platform, l = /\.(?:com|exe)$/i, f = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i, p = o((() => c.satisfies(process.version, "^4.8.0 || ^5.7.0 || >= 6.0.0", !0))) || !1;
        function h(e) {
          if (!u) return e;
          const t = function(e) {
            e.file = i(e);
            const t = e.file && a(e.file);
            return t ? (e.args.unshift(e.file), e.command = t, i(e)) : e.file;
          }(e), n = !l.test(t);
          if (e.options.forceShell || n) {
            const n = f.test(t);
            e.command = r.normalize(e.command), e.command = s.command(e.command), e.args = e.args.map((e => s.argument(e, n)));
            const o = [ e.command ].concat(e.args).join(" ");
            e.args = [ "/d", "/s", "/c", `"${o}"` ], e.command = process.env.comspec || "cmd.exe", 
            e.options.windowsVerbatimArguments = !0;
          }
          return e;
        }
        e.exports = function(e, t, n) {
          t && !Array.isArray(t) && (n = t, t = null);
          const r = {
            command: e,
            args: t = t ? t.slice(0) : [],
            options: n = Object.assign({}, n),
            file: void 0,
            original: {
              command: e,
              args: t
            }
          };
          return n.shell ? function(e) {
            if (p) return e;
            const t = [ e.command ].concat(e.args).join(" ");
            return u ? (e.command = "string" == typeof e.options.shell ? e.options.shell : process.env.comspec || "cmd.exe", 
            e.args = [ "/d", "/s", "/c", `"${t}"` ], e.options.windowsVerbatimArguments = !0) : ("string" == typeof e.options.shell ? e.command = e.options.shell : "android" === process.platform ? e.command = "/system/bin/sh" : e.command = "/bin/sh", 
            e.args = [ "-c", t ]), e;
          }(r) : h(r);
        };
      }, function(e, t, n) {
        "use strict";
        e.exports = function(e) {
          try {
            return e();
          } catch (e) {}
        };
      }, function(e, t, n) {
        "use strict";
        const r = n(0), o = n(76), i = n(77)();
        function s(e, t) {
          const n = process.cwd(), s = null != e.options.cwd;
          if (s) try {
            process.chdir(e.options.cwd);
          } catch (e) {}
          let a;
          try {
            a = o.sync(e.command, {
              path: (e.options.env || process.env)[i],
              pathExt: t ? r.delimiter : void 0
            });
          } catch (e) {} finally {
            process.chdir(n);
          }
          return a && (a = r.resolve(s ? e.options.cwd : "", a)), a;
        }
        e.exports = function(e) {
          return s(e) || s(e, !0);
        };
      }, function(e, t, n) {
        "use strict";
        const r = /([()\][%!^"`<>&|;, *?])/g;
        e.exports.command = function(e) {
          return e.replace(r, "^$1");
        }, e.exports.argument = function(e, t) {
          return e = (e = `"${e = (e = (e = `${e}`).replace(/(\\*)"/g, '$1$1\\"')).replace(/(\\*)$/, "$1$1")}"`).replace(r, "^$1"), 
          t && (e = e.replace(r, "^$1")), e;
        };
      }, function(e, t, n) {
        "use strict";
        const r = n(5), o = n(142);
        e.exports = function(e) {
          let t, n;
          Buffer.alloc ? t = Buffer.alloc(150) : (t = new Buffer(150)).fill(0);
          try {
            n = r.openSync(e, "r"), r.readSync(n, t, 0, 150, 0), r.closeSync(n);
          } catch (e) {}
          return o(t.toString());
        };
      }, function(e, t, n) {
        "use strict";
        var r = n(143);
        e.exports = function(e) {
          var t = e.match(r);
          if (!t) return null;
          var n = t[0].replace(/#! ?/, "").split(" "), o = n[0].split("/").pop(), i = n[1];
          return "env" === o ? i : o + (i ? " " + i : "");
        };
      }, function(e, t, n) {
        "use strict";
        e.exports = /^#!.*/;
      }, function(e, t) {
        var n;
        t = e.exports = Y, n = "object" == typeof process && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? function() {
          var e = Array.prototype.slice.call(arguments, 0);
          e.unshift("SEMVER"), console.log.apply(console, e);
        } : function() {}, t.SEMVER_SPEC_VERSION = "2.0.0";
        var o = Number.MAX_SAFE_INTEGER || 9007199254740991, i = t.re = [], s = t.src = [], a = 0, c = a++;
        s[c] = "0|[1-9]\\d*";
        var u = a++;
        s[u] = "[0-9]+";
        var l = a++;
        s[l] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
        var f = a++;
        s[f] = "(" + s[c] + ")\\.(" + s[c] + ")\\.(" + s[c] + ")";
        var p = a++;
        s[p] = "(" + s[u] + ")\\.(" + s[u] + ")\\.(" + s[u] + ")";
        var h = a++;
        s[h] = "(?:" + s[c] + "|" + s[l] + ")";
        var d = a++;
        s[d] = "(?:" + s[u] + "|" + s[l] + ")";
        var m = a++;
        s[m] = "(?:-(" + s[h] + "(?:\\." + s[h] + ")*))";
        var g = a++;
        s[g] = "(?:-?(" + s[d] + "(?:\\." + s[d] + ")*))";
        var v = a++;
        s[v] = "[0-9A-Za-z-]+";
        var y = a++;
        s[y] = "(?:\\+(" + s[v] + "(?:\\." + s[v] + ")*))";
        var b = a++, w = "v?" + s[f] + s[m] + "?" + s[y] + "?";
        s[b] = "^" + w + "$";
        var x = "[v=\\s]*" + s[p] + s[g] + "?" + s[y] + "?", S = a++;
        s[S] = "^" + x + "$";
        var P = a++;
        s[P] = "((?:<|>)?=?)";
        var O = a++;
        s[O] = s[u] + "|x|X|\\*";
        var j = a++;
        s[j] = s[c] + "|x|X|\\*";
        var E = a++;
        s[E] = "[v=\\s]*(" + s[j] + ")(?:\\.(" + s[j] + ")(?:\\.(" + s[j] + ")(?:" + s[m] + ")?" + s[y] + "?)?)?";
        var I = a++;
        s[I] = "[v=\\s]*(" + s[O] + ")(?:\\.(" + s[O] + ")(?:\\.(" + s[O] + ")(?:" + s[g] + ")?" + s[y] + "?)?)?";
        var _ = a++;
        s[_] = "^" + s[P] + "\\s*" + s[E] + "$";
        var A = a++;
        s[A] = "^" + s[P] + "\\s*" + s[I] + "$";
        var k = a++;
        s[k] = "(?:^|[^\\d])(\\d{1,16})(?:\\.(\\d{1,16}))?(?:\\.(\\d{1,16}))?(?:$|[^\\d])";
        var N = a++;
        s[N] = "(?:~>?)";
        var F = a++;
        s[F] = "(\\s*)" + s[N] + "\\s+", i[F] = new RegExp(s[F], "g");
        var C = a++;
        s[C] = "^" + s[N] + s[E] + "$";
        var M = a++;
        s[M] = "^" + s[N] + s[I] + "$";
        var T = a++;
        s[T] = "(?:\\^)";
        var V = a++;
        s[V] = "(\\s*)" + s[T] + "\\s+", i[V] = new RegExp(s[V], "g");
        var D = a++;
        s[D] = "^" + s[T] + s[E] + "$";
        var B = a++;
        s[B] = "^" + s[T] + s[I] + "$";
        var L = a++;
        s[L] = "^" + s[P] + "\\s*(" + x + ")$|^$";
        var $ = a++;
        s[$] = "^" + s[P] + "\\s*(" + w + ")$|^$";
        var R = a++;
        s[R] = "(\\s*)" + s[P] + "\\s*(" + x + "|" + s[E] + ")", i[R] = new RegExp(s[R], "g");
        var G = a++;
        s[G] = "^\\s*(" + s[E] + ")\\s+-\\s+(" + s[E] + ")\\s*$";
        var W = a++;
        s[W] = "^\\s*(" + s[I] + ")\\s+-\\s+(" + s[I] + ")\\s*$";
        var U = a++;
        s[U] = "(<|>)?=?\\s*\\*";
        for (var q = 0; q < 35; q++) n(q, s[q]), i[q] || (i[q] = new RegExp(s[q]));
        function K(e, t) {
          if (t && "object" == typeof t || (t = {
            loose: !!t,
            includePrerelease: !1
          }), e instanceof Y) return e;
          if ("string" != typeof e) return null;
          if (e.length > 256) return null;
          if (!(t.loose ? i[S] : i[b]).test(e)) return null;
          try {
            return new Y(e, t);
          } catch (e) {
            return null;
          }
        }
        function Y(e, t) {
          if (t && "object" == typeof t || (t = {
            loose: !!t,
            includePrerelease: !1
          }), e instanceof Y) {
            if (e.loose === t.loose) return e;
            e = e.version;
          } else if ("string" != typeof e) throw new TypeError("Invalid Version: " + e);
          if (e.length > 256) throw new TypeError("version is longer than 256 characters");
          if (!(this instanceof Y)) return new Y(e, t);
          n("SemVer", e, t), this.options = t, this.loose = !!t.loose;
          var s = e.trim().match(t.loose ? i[S] : i[b]);
          if (!s) throw new TypeError("Invalid Version: " + e);
          if (this.raw = e, this.major = +s[1], this.minor = +s[2], this.patch = +s[3], this.major > o || this.major < 0) throw new TypeError("Invalid major version");
          if (this.minor > o || this.minor < 0) throw new TypeError("Invalid minor version");
          if (this.patch > o || this.patch < 0) throw new TypeError("Invalid patch version");
          s[4] ? this.prerelease = s[4].split(".").map((function(e) {
            if (/^[0-9]+$/.test(e)) {
              var t = +e;
              if (t >= 0 && t < o) return t;
            }
            return e;
          })) : this.prerelease = [], this.build = s[5] ? s[5].split(".") : [], this.format();
        }
        t.parse = K, t.valid = function(e, t) {
          var n = K(e, t);
          return n ? n.version : null;
        }, t.clean = function(e, t) {
          var n = K(e.trim().replace(/^[=v]+/, ""), t);
          return n ? n.version : null;
        }, t.SemVer = Y, Y.prototype.format = function() {
          return this.version = this.major + "." + this.minor + "." + this.patch, this.prerelease.length && (this.version += "-" + this.prerelease.join(".")), 
          this.version;
        }, Y.prototype.toString = function() {
          return this.version;
        }, Y.prototype.compare = function(e) {
          return n("SemVer.compare", this.version, this.options, e), e instanceof Y || (e = new Y(e, this.options)), 
          this.compareMain(e) || this.comparePre(e);
        }, Y.prototype.compareMain = function(e) {
          return e instanceof Y || (e = new Y(e, this.options)), J(this.major, e.major) || J(this.minor, e.minor) || J(this.patch, e.patch);
        }, Y.prototype.comparePre = function(e) {
          if (e instanceof Y || (e = new Y(e, this.options)), this.prerelease.length && !e.prerelease.length) return -1;
          if (!this.prerelease.length && e.prerelease.length) return 1;
          if (!this.prerelease.length && !e.prerelease.length) return 0;
          var t = 0;
          do {
            var r = this.prerelease[t], o = e.prerelease[t];
            if (n("prerelease compare", t, r, o), void 0 === r && void 0 === o) return 0;
            if (void 0 === o) return 1;
            if (void 0 === r) return -1;
            if (r !== o) return J(r, o);
          } while (++t);
        }, Y.prototype.inc = function(e, t) {
          switch (e) {
           case "premajor":
            this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", t);
            break;

           case "preminor":
            this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", t);
            break;

           case "prepatch":
            this.prerelease.length = 0, this.inc("patch", t), this.inc("pre", t);
            break;

           case "prerelease":
            0 === this.prerelease.length && this.inc("patch", t), this.inc("pre", t);
            break;

           case "major":
            0 === this.minor && 0 === this.patch && 0 !== this.prerelease.length || this.major++, 
            this.minor = 0, this.patch = 0, this.prerelease = [];
            break;

           case "minor":
            0 === this.patch && 0 !== this.prerelease.length || this.minor++, this.patch = 0, 
            this.prerelease = [];
            break;

           case "patch":
            0 === this.prerelease.length && this.patch++, this.prerelease = [];
            break;

           case "pre":
            if (0 === this.prerelease.length) this.prerelease = [ 0 ]; else {
              for (var n = this.prerelease.length; --n >= 0; ) "number" == typeof this.prerelease[n] && (this.prerelease[n]++, 
              n = -2);
              -1 === n && this.prerelease.push(0);
            }
            t && (this.prerelease[0] === t ? isNaN(this.prerelease[1]) && (this.prerelease = [ t, 0 ]) : this.prerelease = [ t, 0 ]);
            break;

           default:
            throw new Error("invalid increment argument: " + e);
          }
          return this.format(), this.raw = this.version, this;
        }, t.inc = function(e, t, n, r) {
          "string" == typeof n && (r = n, n = void 0);
          try {
            return new Y(e, n).inc(t, r).version;
          } catch (e) {
            return null;
          }
        }, t.diff = function(e, t) {
          if (Z(e, t)) return null;
          var n = K(e), r = K(t);
          if (n.prerelease.length || r.prerelease.length) {
            for (var o in n) if (("major" === o || "minor" === o || "patch" === o) && n[o] !== r[o]) return "pre" + o;
            return "prerelease";
          }
          for (var o in n) if (("major" === o || "minor" === o || "patch" === o) && n[o] !== r[o]) return o;
        }, t.compareIdentifiers = J;
        var H = /^[0-9]+$/;
        function J(e, t) {
          var n = H.test(e), r = H.test(t);
          return n && r && (e = +e, t = +t), n && !r ? -1 : r && !n ? 1 : e < t ? -1 : e > t ? 1 : 0;
        }
        function z(e, t, n) {
          return new Y(e, n).compare(new Y(t, n));
        }
        function Q(e, t, n) {
          return z(e, t, n) > 0;
        }
        function X(e, t, n) {
          return z(e, t, n) < 0;
        }
        function Z(e, t, n) {
          return 0 === z(e, t, n);
        }
        function ee(e, t, n) {
          return 0 !== z(e, t, n);
        }
        function te(e, t, n) {
          return z(e, t, n) >= 0;
        }
        function ne(e, t, n) {
          return z(e, t, n) <= 0;
        }
        function re(e, t, n, r) {
          var o;
          switch (t) {
           case "===":
            "object" == typeof e && (e = e.version), "object" == typeof n && (n = n.version), 
            o = e === n;
            break;

           case "!==":
            "object" == typeof e && (e = e.version), "object" == typeof n && (n = n.version), 
            o = e !== n;
            break;

           case "":
           case "=":
           case "==":
            o = Z(e, n, r);
            break;

           case "!=":
            o = ee(e, n, r);
            break;

           case ">":
            o = Q(e, n, r);
            break;

           case ">=":
            o = te(e, n, r);
            break;

           case "<":
            o = X(e, n, r);
            break;

           case "<=":
            o = ne(e, n, r);
            break;

           default:
            throw new TypeError("Invalid operator: " + t);
          }
          return o;
        }
        function oe(e, t) {
          if (t && "object" == typeof t || (t = {
            loose: !!t,
            includePrerelease: !1
          }), e instanceof oe) {
            if (e.loose === !!t.loose) return e;
            e = e.value;
          }
          if (!(this instanceof oe)) return new oe(e, t);
          n("comparator", e, t), this.options = t, this.loose = !!t.loose, this.parse(e), 
          this.semver === ie ? this.value = "" : this.value = this.operator + this.semver.version, 
          n("comp", this);
        }
        t.rcompareIdentifiers = function(e, t) {
          return J(t, e);
        }, t.major = function(e, t) {
          return new Y(e, t).major;
        }, t.minor = function(e, t) {
          return new Y(e, t).minor;
        }, t.patch = function(e, t) {
          return new Y(e, t).patch;
        }, t.compare = z, t.compareLoose = function(e, t) {
          return z(e, t, !0);
        }, t.rcompare = function(e, t, n) {
          return z(t, e, n);
        }, t.sort = function(e, n) {
          return e.sort((function(e, r) {
            return t.compare(e, r, n);
          }));
        }, t.rsort = function(e, n) {
          return e.sort((function(e, r) {
            return t.rcompare(e, r, n);
          }));
        }, t.gt = Q, t.lt = X, t.eq = Z, t.neq = ee, t.gte = te, t.lte = ne, t.cmp = re, 
        t.Comparator = oe;
        var ie = {};
        function se(e, t) {
          if (t && "object" == typeof t || (t = {
            loose: !!t,
            includePrerelease: !1
          }), e instanceof se) return e.loose === !!t.loose && e.includePrerelease === !!t.includePrerelease ? e : new se(e.raw, t);
          if (e instanceof oe) return new se(e.value, t);
          if (!(this instanceof se)) return new se(e, t);
          if (this.options = t, this.loose = !!t.loose, this.includePrerelease = !!t.includePrerelease, 
          this.raw = e, this.set = e.split(/\s*\|\|\s*/).map((function(e) {
            return this.parseRange(e.trim());
          }), this).filter((function(e) {
            return e.length;
          })), !this.set.length) throw new TypeError("Invalid SemVer Range: " + e);
          this.format();
        }
        function ae(e) {
          return !e || "x" === e.toLowerCase() || "*" === e;
        }
        function ce(e, t, n, r, o, i, s, a, c, u, l, f, p) {
          return ((t = ae(n) ? "" : ae(r) ? ">=" + n + ".0.0" : ae(o) ? ">=" + n + "." + r + ".0" : ">=" + t) + " " + (a = ae(c) ? "" : ae(u) ? "<" + (+c + 1) + ".0.0" : ae(l) ? "<" + c + "." + (+u + 1) + ".0" : f ? "<=" + c + "." + u + "." + l + "-" + f : "<=" + a)).trim();
        }
        function ue(e, t, r) {
          for (var o = 0; o < e.length; o++) if (!e[o].test(t)) return !1;
          if (r || (r = {}), t.prerelease.length && !r.includePrerelease) {
            for (o = 0; o < e.length; o++) if (n(e[o].semver), e[o].semver !== ie && e[o].semver.prerelease.length > 0) {
              var i = e[o].semver;
              if (i.major === t.major && i.minor === t.minor && i.patch === t.patch) return !0;
            }
            return !1;
          }
          return !0;
        }
        function le(e, t, n) {
          try {
            t = new se(t, n);
          } catch (e) {
            return !1;
          }
          return t.test(e);
        }
        function fe(e, t, n, r) {
          var o, i, s, a, c;
          switch (e = new Y(e, r), t = new se(t, r), n) {
           case ">":
            o = Q, i = ne, s = X, a = ">", c = ">=";
            break;

           case "<":
            o = X, i = te, s = Q, a = "<", c = "<=";
            break;

           default:
            throw new TypeError('Must provide a hilo val of "<" or ">"');
          }
          if (le(e, t, r)) return !1;
          for (var u = 0; u < t.set.length; ++u) {
            var l = t.set[u], f = null, p = null;
            if (l.forEach((function(e) {
              e.semver === ie && (e = new oe(">=0.0.0")), f = f || e, p = p || e, o(e.semver, f.semver, r) ? f = e : s(e.semver, p.semver, r) && (p = e);
            })), f.operator === a || f.operator === c) return !1;
            if ((!p.operator || p.operator === a) && i(e, p.semver)) return !1;
            if (p.operator === c && s(e, p.semver)) return !1;
          }
          return !0;
        }
        oe.prototype.parse = function(e) {
          var t = this.options.loose ? i[L] : i[$], n = e.match(t);
          if (!n) throw new TypeError("Invalid comparator: " + e);
          this.operator = n[1], "=" === this.operator && (this.operator = ""), n[2] ? this.semver = new Y(n[2], this.options.loose) : this.semver = ie;
        }, oe.prototype.toString = function() {
          return this.value;
        }, oe.prototype.test = function(e) {
          return n("Comparator.test", e, this.options.loose), this.semver === ie || ("string" == typeof e && (e = new Y(e, this.options)), 
          re(e, this.operator, this.semver, this.options));
        }, oe.prototype.intersects = function(e, t) {
          if (!(e instanceof oe)) throw new TypeError("a Comparator is required");
          var n;
          if (t && "object" == typeof t || (t = {
            loose: !!t,
            includePrerelease: !1
          }), "" === this.operator) return n = new se(e.value, t), le(this.value, n, t);
          if ("" === e.operator) return n = new se(this.value, t), le(e.semver, n, t);
          var r = !(">=" !== this.operator && ">" !== this.operator || ">=" !== e.operator && ">" !== e.operator), o = !("<=" !== this.operator && "<" !== this.operator || "<=" !== e.operator && "<" !== e.operator), i = this.semver.version === e.semver.version, s = !(">=" !== this.operator && "<=" !== this.operator || ">=" !== e.operator && "<=" !== e.operator), a = re(this.semver, "<", e.semver, t) && (">=" === this.operator || ">" === this.operator) && ("<=" === e.operator || "<" === e.operator), c = re(this.semver, ">", e.semver, t) && ("<=" === this.operator || "<" === this.operator) && (">=" === e.operator || ">" === e.operator);
          return r || o || i && s || a || c;
        }, t.Range = se, se.prototype.format = function() {
          return this.range = this.set.map((function(e) {
            return e.join(" ").trim();
          })).join("||").trim(), this.range;
        }, se.prototype.toString = function() {
          return this.range;
        }, se.prototype.parseRange = function(e) {
          var t = this.options.loose;
          e = e.trim();
          var r = t ? i[W] : i[G];
          e = e.replace(r, ce), n("hyphen replace", e), e = e.replace(i[R], "$1$2$3"), n("comparator trim", e, i[R]), 
          e = (e = (e = e.replace(i[F], "$1~")).replace(i[V], "$1^")).split(/\s+/).join(" ");
          var o = t ? i[L] : i[$], s = e.split(" ").map((function(e) {
            return function(e, t) {
              return n("comp", e, t), e = function(e, t) {
                return e.trim().split(/\s+/).map((function(e) {
                  return function(e, t) {
                    n("caret", e, t), t && "object" == typeof t || (t = {
                      loose: !!t,
                      includePrerelease: !1
                    });
                    var r = t.loose ? i[B] : i[D];
                    return e.replace(r, (function(t, r, o, i, s) {
                      var a;
                      return n("caret", e, t, r, o, i, s), ae(r) ? a = "" : ae(o) ? a = ">=" + r + ".0.0 <" + (+r + 1) + ".0.0" : ae(i) ? a = "0" === r ? ">=" + r + "." + o + ".0 <" + r + "." + (+o + 1) + ".0" : ">=" + r + "." + o + ".0 <" + (+r + 1) + ".0.0" : s ? (n("replaceCaret pr", s), 
                      "-" !== s.charAt(0) && (s = "-" + s), a = "0" === r ? "0" === o ? ">=" + r + "." + o + "." + i + s + " <" + r + "." + o + "." + (+i + 1) : ">=" + r + "." + o + "." + i + s + " <" + r + "." + (+o + 1) + ".0" : ">=" + r + "." + o + "." + i + s + " <" + (+r + 1) + ".0.0") : (n("no pr"), 
                      a = "0" === r ? "0" === o ? ">=" + r + "." + o + "." + i + " <" + r + "." + o + "." + (+i + 1) : ">=" + r + "." + o + "." + i + " <" + r + "." + (+o + 1) + ".0" : ">=" + r + "." + o + "." + i + " <" + (+r + 1) + ".0.0"), 
                      n("caret return", a), a;
                    }));
                  }(e, t);
                })).join(" ");
              }(e, t), n("caret", e), e = function(e, t) {
                return e.trim().split(/\s+/).map((function(e) {
                  return function(e, t) {
                    t && "object" == typeof t || (t = {
                      loose: !!t,
                      includePrerelease: !1
                    });
                    var r = t.loose ? i[M] : i[C];
                    return e.replace(r, (function(t, r, o, i, s) {
                      var a;
                      return n("tilde", e, t, r, o, i, s), ae(r) ? a = "" : ae(o) ? a = ">=" + r + ".0.0 <" + (+r + 1) + ".0.0" : ae(i) ? a = ">=" + r + "." + o + ".0 <" + r + "." + (+o + 1) + ".0" : s ? (n("replaceTilde pr", s), 
                      "-" !== s.charAt(0) && (s = "-" + s), a = ">=" + r + "." + o + "." + i + s + " <" + r + "." + (+o + 1) + ".0") : a = ">=" + r + "." + o + "." + i + " <" + r + "." + (+o + 1) + ".0", 
                      n("tilde return", a), a;
                    }));
                  }(e, t);
                })).join(" ");
              }(e, t), n("tildes", e), e = function(e, t) {
                return n("replaceXRanges", e, t), e.split(/\s+/).map((function(e) {
                  return function(e, t) {
                    e = e.trim(), t && "object" == typeof t || (t = {
                      loose: !!t,
                      includePrerelease: !1
                    });
                    var r = t.loose ? i[A] : i[_];
                    return e.replace(r, (function(t, r, o, i, s, a) {
                      n("xRange", e, t, r, o, i, s, a);
                      var c = ae(o), u = c || ae(i), l = u || ae(s);
                      return "=" === r && l && (r = ""), c ? t = ">" === r || "<" === r ? "<0.0.0" : "*" : r && l ? (u && (i = 0), 
                      l && (s = 0), ">" === r ? (r = ">=", u ? (o = +o + 1, i = 0, s = 0) : l && (i = +i + 1, 
                      s = 0)) : "<=" === r && (r = "<", u ? o = +o + 1 : i = +i + 1), t = r + o + "." + i + "." + s) : u ? t = ">=" + o + ".0.0 <" + (+o + 1) + ".0.0" : l && (t = ">=" + o + "." + i + ".0 <" + o + "." + (+i + 1) + ".0"), 
                      n("xRange return", t), t;
                    }));
                  }(e, t);
                })).join(" ");
              }(e, t), n("xrange", e), e = function(e, t) {
                return n("replaceStars", e, t), e.trim().replace(i[U], "");
              }(e, t), n("stars", e), e;
            }(e, this.options);
          }), this).join(" ").split(/\s+/);
          return this.options.loose && (s = s.filter((function(e) {
            return !!e.match(o);
          }))), s.map((function(e) {
            return new oe(e, this.options);
          }), this);
        }, se.prototype.intersects = function(e, t) {
          if (!(e instanceof se)) throw new TypeError("a Range is required");
          return this.set.some((function(n) {
            return n.every((function(n) {
              return e.set.some((function(e) {
                return e.every((function(e) {
                  return n.intersects(e, t);
                }));
              }));
            }));
          }));
        }, t.toComparators = function(e, t) {
          return new se(e, t).set.map((function(e) {
            return e.map((function(e) {
              return e.value;
            })).join(" ").trim().split(" ");
          }));
        }, se.prototype.test = function(e) {
          if (!e) return !1;
          "string" == typeof e && (e = new Y(e, this.options));
          for (var t = 0; t < this.set.length; t++) if (ue(this.set[t], e, this.options)) return !0;
          return !1;
        }, t.satisfies = le, t.maxSatisfying = function(e, t, n) {
          var r = null, o = null;
          try {
            var i = new se(t, n);
          } catch (e) {
            return null;
          }
          return e.forEach((function(e) {
            i.test(e) && (r && -1 !== o.compare(e) || (o = new Y(r = e, n)));
          })), r;
        }, t.minSatisfying = function(e, t, n) {
          var r = null, o = null;
          try {
            var i = new se(t, n);
          } catch (e) {
            return null;
          }
          return e.forEach((function(e) {
            i.test(e) && (r && 1 !== o.compare(e) || (o = new Y(r = e, n)));
          })), r;
        }, t.validRange = function(e, t) {
          try {
            return new se(e, t).range || "*";
          } catch (e) {
            return null;
          }
        }, t.ltr = function(e, t, n) {
          return fe(e, t, "<", n);
        }, t.gtr = function(e, t, n) {
          return fe(e, t, ">", n);
        }, t.outside = fe, t.prerelease = function(e, t) {
          var n = K(e, t);
          return n && n.prerelease.length ? n.prerelease : null;
        }, t.intersects = function(e, t, n) {
          return e = new se(e, n), t = new se(t, n), e.intersects(t);
        }, t.coerce = function(e) {
          if (e instanceof Y) return e;
          if ("string" != typeof e) return null;
          var t = e.match(i[k]);
          return null == t ? null : K((t[1] || "0") + "." + (t[2] || "0") + "." + (t[3] || "0"));
        };
      }, function(e, t, n) {
        "use strict";
        const r = "win32" === process.platform;
        function o(e, t) {
          return Object.assign(new Error(`${t} ${e.command} ENOENT`), {
            code: "ENOENT",
            errno: "ENOENT",
            syscall: `${t} ${e.command}`,
            path: e.command,
            spawnargs: e.args
          });
        }
        function i(e, t) {
          return r && 1 === e && !t.file ? o(t.original, "spawn") : null;
        }
        e.exports = {
          hookChildProcess: function(e, t) {
            if (!r) return;
            const n = e.emit;
            e.emit = function(r, o) {
              if ("exit" === r) {
                const r = i(o, t);
                if (r) return n.call(e, "error", r);
              }
              return n.apply(e, arguments);
            };
          },
          verifyENOENT: i,
          verifyENOENTSync: function(e, t) {
            return r && 1 === e && !t.file ? o(t.original, "spawnSync") : null;
          },
          notFoundError: o
        };
      }, function(e, t, n) {
        "use strict";
        e.exports = function(e) {
          var t = "string" == typeof e ? "\n" : "\n".charCodeAt(), n = "string" == typeof e ? "\r" : "\r".charCodeAt();
          return e[e.length - 1] === t && (e = e.slice(0, e.length - 1)), e[e.length - 1] === n && (e = e.slice(0, e.length - 1)), 
          e;
        };
      }, function(e, t, n) {
        "use strict";
        const r = n(0), o = n(77);
        e.exports = e => {
          let t;
          e = Object.assign({
            cwd: process.cwd(),
            path: process.env[o()]
          }, e);
          let n = r.resolve(e.cwd);
          const i = [];
          for (;t !== n; ) i.push(r.join(n, "node_modules/.bin")), t = n, n = r.resolve(n, "..");
          return i.push(r.dirname(process.execPath)), i.concat(e.path).join(r.delimiter);
        }, e.exports.env = t => {
          t = Object.assign({
            env: process.env
          }, t);
          const n = Object.assign({}, t.env), r = o({
            env: n
          });
          return t.path = n[r], n[r] = e.exports(t), n;
        };
      }, function(e, t, n) {
        "use strict";
        var r = e.exports = function(e) {
          return null !== e && "object" == typeof e && "function" == typeof e.pipe;
        };
        r.writable = function(e) {
          return r(e) && !1 !== e.writable && "function" == typeof e._write && "object" == typeof e._writableState;
        }, r.readable = function(e) {
          return r(e) && !1 !== e.readable && "function" == typeof e._read && "object" == typeof e._readableState;
        }, r.duplex = function(e) {
          return r.writable(e) && r.readable(e);
        }, r.transform = function(e) {
          return r.duplex(e) && "function" == typeof e._transform && "object" == typeof e._transformState;
        };
      }, function(e, t, n) {
        "use strict";
        const r = n(150), o = n(152);
        class i extends Error {
          constructor() {
            super("maxBuffer exceeded"), this.name = "MaxBufferError";
          }
        }
        function s(e, t) {
          if (!e) return Promise.reject(new Error("Expected a stream"));
          t = Object.assign({
            maxBuffer: 1 / 0
          }, t);
          const {maxBuffer: n} = t;
          let s;
          return new Promise(((a, c) => {
            const u = e => {
              e && (e.bufferedData = s.getBufferedValue()), c(e);
            };
            (s = r(e, o(t), (e => {
              e ? u(e) : a();
            }))).on("data", (() => {
              s.getBufferedLength() > n && u(new i);
            }));
          })).then((() => s.getBufferedValue()));
        }
        e.exports = s, e.exports.buffer = (e, t) => s(e, Object.assign({}, t, {
          encoding: "buffer"
        })), e.exports.array = (e, t) => s(e, Object.assign({}, t, {
          array: !0
        })), e.exports.MaxBufferError = i;
      }, function(e, t, n) {
        var r = n(31), o = n(151), i = n(5), s = function() {}, a = /^v?\.0/.test(process.version), c = function(e) {
          return "function" == typeof e;
        }, u = function(e, t, n, u) {
          u = r(u);
          var l = !1;
          e.on("close", (function() {
            l = !0;
          })), o(e, {
            readable: t,
            writable: n
          }, (function(e) {
            if (e) return u(e);
            l = !0, u();
          }));
          var f = !1;
          return function(t) {
            if (!l && !f) return f = !0, function(e) {
              return !!a && !!i && (e instanceof (i.ReadStream || s) || e instanceof (i.WriteStream || s)) && c(e.close);
            }(e) ? e.close(s) : function(e) {
              return e.setHeader && c(e.abort);
            }(e) ? e.abort() : c(e.destroy) ? e.destroy() : void u(t || new Error("stream was destroyed"));
          };
        }, l = function(e) {
          e();
        }, f = function(e, t) {
          return e.pipe(t);
        };
        e.exports = function() {
          var e, t = Array.prototype.slice.call(arguments), n = c(t[t.length - 1] || s) && t.pop() || s;
          if (Array.isArray(t[0]) && (t = t[0]), t.length < 2) throw new Error("pump requires two streams per minimum");
          var r = t.map((function(o, i) {
            var s = i < t.length - 1;
            return u(o, s, i > 0, (function(t) {
              e || (e = t), t && r.forEach(l), s || (r.forEach(l), n(e));
            }));
          }));
          return t.reduce(f);
        };
      }, function(e, t, n) {
        var r = n(31), o = function() {}, i = function(e, t, n) {
          if ("function" == typeof t) return i(e, null, t);
          t || (t = {}), n = r(n || o);
          var s = e._writableState, a = e._readableState, c = t.readable || !1 !== t.readable && e.readable, u = t.writable || !1 !== t.writable && e.writable, l = function() {
            e.writable || f();
          }, f = function() {
            u = !1, c || n.call(e);
          }, p = function() {
            c = !1, u || n.call(e);
          }, h = function(t) {
            n.call(e, t ? new Error("exited with error code: " + t) : null);
          }, d = function(t) {
            n.call(e, t);
          }, m = function() {
            return (!c || a && a.ended) && (!u || s && s.ended) ? void 0 : n.call(e, new Error("premature close"));
          }, g = function() {
            e.req.on("finish", f);
          };
          return function(e) {
            return e.setHeader && "function" == typeof e.abort;
          }(e) ? (e.on("complete", f), e.on("abort", m), e.req ? g() : e.on("request", g)) : u && !s && (e.on("end", l), 
          e.on("close", l)), function(e) {
            return e.stdio && Array.isArray(e.stdio) && 3 === e.stdio.length;
          }(e) && e.on("exit", h), e.on("end", p), e.on("finish", f), !1 !== t.error && e.on("error", d), 
          e.on("close", m), function() {
            e.removeListener("complete", f), e.removeListener("abort", m), e.removeListener("request", g), 
            e.req && e.req.removeListener("finish", f), e.removeListener("end", l), e.removeListener("close", l), 
            e.removeListener("finish", f), e.removeListener("exit", h), e.removeListener("end", p), 
            e.removeListener("error", d), e.removeListener("close", m);
          };
        };
        e.exports = i;
      }, function(e, t, n) {
        "use strict";
        const {PassThrough: r} = n(153);
        e.exports = e => {
          e = Object.assign({}, e);
          const {array: t} = e;
          let {encoding: n} = e;
          const o = "buffer" === n;
          let i = !1;
          t ? i = !(n || o) : n = n || "utf8", o && (n = null);
          let s = 0;
          const a = [], c = new r({
            objectMode: i
          });
          return n && c.setEncoding(n), c.on("data", (e => {
            a.push(e), i ? s = a.length : s += e.length;
          })), c.getBufferedValue = () => t ? a : o ? Buffer.concat(a, s) : a.join(""), c.getBufferedLength = () => s, 
          c;
        };
      }, function(e, t) {
        e.exports = __webpack_require__(2781);
      }, function(e, t, n) {
        "use strict";
        e.exports = (e, t) => (t = t || (() => {}), e.then((e => new Promise((e => {
          e(t());
        })).then((() => e))), (e => new Promise((e => {
          e(t());
        })).then((() => {
          throw e;
        })))));
      }, function(e, t, n) {
        var r, o = n(47), i = n(156), s = n(68);
        function a() {
          l && (l = !1, i.forEach((function(e) {
            try {
              process.removeListener(e, u[e]);
            } catch (e) {}
          })), process.emit = d, process.reallyExit = p, r.count -= 1);
        }
        function c(e, t, n) {
          r.emitted[e] || (r.emitted[e] = !0, r.emit(e, t, n));
        }
        "function" != typeof s && (s = s.EventEmitter), process.__signal_exit_emitter__ ? r = process.__signal_exit_emitter__ : ((r = process.__signal_exit_emitter__ = new s).count = 0, 
        r.emitted = {}), r.infinite || (r.setMaxListeners(1 / 0), r.infinite = !0), e.exports = function(e, t) {
          o.equal(typeof e, "function", "a callback must be provided for exit handler"), !1 === l && f();
          var n = "exit";
          return t && t.alwaysLast && (n = "afterexit"), r.on(n, e), function() {
            r.removeListener(n, e), 0 === r.listeners("exit").length && 0 === r.listeners("afterexit").length && a();
          };
        }, e.exports.unload = a;
        var u = {};
        i.forEach((function(e) {
          u[e] = function() {
            process.listeners(e).length === r.count && (a(), c("exit", null, e), c("afterexit", null, e), 
            process.kill(process.pid, e));
          };
        })), e.exports.signals = function() {
          return i;
        }, e.exports.load = f;
        var l = !1;
        function f() {
          l || (l = !0, r.count += 1, i = i.filter((function(e) {
            try {
              return process.on(e, u[e]), !0;
            } catch (e) {
              return !1;
            }
          })), process.emit = m, process.reallyExit = h);
        }
        var p = process.reallyExit;
        function h(e) {
          process.exitCode = e || 0, c("exit", process.exitCode, null), c("afterexit", process.exitCode, null), 
          p.call(process, process.exitCode);
        }
        var d = process.emit;
        function m(e, t) {
          if ("exit" === e) {
            void 0 !== t && (process.exitCode = t);
            var n = d.apply(this, arguments);
            return c("exit", process.exitCode, null), c("afterexit", process.exitCode, null), 
            n;
          }
          return d.apply(this, arguments);
        }
      }, function(e, t) {
        e.exports = [ "SIGABRT", "SIGALRM", "SIGHUP", "SIGINT", "SIGTERM" ], "win32" !== process.platform && e.exports.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT"), 
        "linux" === process.platform && e.exports.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
      }, function(e, t, n) {
        "use strict";
        const r = n(30);
        let o;
        if ("function" == typeof r.getSystemErrorName) e.exports = r.getSystemErrorName; else {
          try {
            if ("function" != typeof (o = process.binding("uv")).errname) throw new TypeError("uv.errname is not a function");
          } catch (e) {
            console.error("execa/lib/errname: unable to establish process.binding('uv')", e), 
            o = null;
          }
          e.exports = e => i(o, e);
        }
        function i(e, t) {
          if (e) return e.errname(t);
          if (!(t < 0)) throw new Error("err >= 0");
          return `Unknown system error ${t}`;
        }
        e.exports.__test__ = i;
      }, function(e, t, n) {
        "use strict";
        const r = [ "stdin", "stdout", "stderr" ];
        e.exports = e => {
          if (!e) return null;
          if (e.stdio && (e => r.some((t => Boolean(e[t]))))(e)) throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${r.map((e => `\`${e}\``)).join(", ")}`);
          if ("string" == typeof e.stdio) return e.stdio;
          const t = e.stdio || [];
          if (!Array.isArray(t)) throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``);
          const n = [], o = Math.max(t.length, r.length);
          for (let i = 0; i < o; i++) {
            let o = null;
            void 0 !== t[i] ? o = t[i] : void 0 !== e[r[i]] && (o = e[r[i]]), n[i] = o;
          }
          return n;
        };
      }, function(e, t, n) {
        "use strict";
        n(2);
        var r = n(1);
        e.exports = {
          getBazelInfo: function() {
            return r.log("trace", "getBazelInfo"), Promise.all([ r.run("bazel --version").then(r.findVersion), r.run("which bazel") ]).then((function(e) {
              return r.determineFound("Bazel", e[0], e[1]);
            }));
          },
          getCMakeInfo: function() {
            return r.log("trace", "getCMakeInfo"), Promise.all([ r.run("cmake --version").then(r.findVersion), r.run("which cmake") ]).then((function(e) {
              return r.determineFound("CMake", e[0], e[1]);
            }));
          },
          getGCCInfo: function() {
            return r.log("trace", "getGCCInfo"), r.isMacOS || r.isLinux ? Promise.all([ r.run("gcc -v 2>&1").then(r.findVersion), r.run("which gcc") ]).then((function(e) {
              return r.determineFound("GCC", e[0], e[1]);
            })) : Promise.resolve([ "GCC", "N/A" ]);
          },
          getClangInfo: function() {
            return r.log("trace", "getClangInfo"), Promise.all([ r.run("clang --version").then(r.findVersion), r.which("clang") ]).then((function(e) {
              return r.determineFound("Clang", e[0], e[1]);
            }));
          },
          getGitInfo: function() {
            return r.log("trace", "getGitInfo"), Promise.all([ r.run("git --version").then(r.findVersion), r.run("which git") ]).then((function(e) {
              return r.determineFound("Git", e[0], e[1]);
            }));
          },
          getMakeInfo: function() {
            return r.log("trace", "getMakeInfo"), r.isMacOS || r.isLinux ? Promise.all([ r.run("make --version").then(r.findVersion), r.run("which make") ]).then((function(e) {
              return r.determineFound("Make", e[0], e[1]);
            })) : Promise.resolve([ "Make", "N/A" ]);
          },
          getNinjaInfo: function() {
            return r.log("trace", "getNinjaInfo"), Promise.all([ r.run("ninja --version").then(r.findVersion), r.run("which ninja") ]).then((function(e) {
              return r.determineFound("Ninja", e[0], e[1]);
            }));
          },
          getMercurialInfo: function() {
            return r.log("trace", "getMercurialInfo"), r.isMacOS || r.isLinux ? Promise.all([ r.run("hg --version").then(r.findVersion), r.run("which hg") ]).then((function(e) {
              return r.determineFound("Mercurial", e[0], e[1]);
            })) : Promise.resolve([ "Mercurial", "N/A" ]);
          },
          getSubversionInfo: function() {
            return r.log("trace", "getSubversionInfo"), r.isMacOS || r.isLinux ? Promise.all([ r.run("svn --version").then(r.findVersion), r.run("which svn") ]).then((function(e) {
              return r.determineFound("Subversion", e[0], e[1]);
            })) : Promise.resolve([ "Subversion", "N/A" ]);
          },
          getFFmpegInfo: function() {
            return r.log("trace", "getFFmpegInfo"), Promise.all([ r.run("ffmpeg -version").then(r.findVersion), r.which("ffmpeg") ]).then((function(e) {
              return r.determineFound("FFmpeg", e[0], e[1]);
            }));
          }
        };
      }, function(e, t, n) {
        "use strict";
        n(2);
        var r = n(1);
        e.exports = {
          getDockerInfo: function() {
            return r.log("trace", "getDockerInfo"), Promise.all([ r.run("docker --version").then(r.findVersion), r.which("docker") ]).then((function(e) {
              return r.determineFound("Docker", e[0], e[1]);
            }));
          },
          getParallelsInfo: function() {
            return r.log("trace", "getParallelsInfo"), Promise.all([ r.run("prlctl --version").then(r.findVersion), r.which("prlctl") ]).then((function(e) {
              return r.determineFound("Parallels", e[0], e[1]);
            }));
          },
          getVirtualBoxInfo: function() {
            return r.log("trace", "getVirtualBoxInfo"), Promise.all([ r.run("vboxmanage --version").then(r.findVersion), r.which("vboxmanage") ]).then((function(e) {
              return r.determineFound("VirtualBox", e[0], e[1]);
            }));
          },
          getVMwareFusionInfo: function() {
            return r.log("trace", "getVMwareFusionInfo"), r.getDarwinApplicationVersion("com.vmware.fusion").then((function(e) {
              return r.determineFound("VMWare Fusion", e, "N/A");
            }));
          }
        };
      }, function(e, t, n) {
        "use strict";
        n(162), n(64), n(22), n(16), n(21), n(74);
        var r = n(163), o = n(1);
        function i(e, t) {
          return o.log("trace", "clean", e), Object.keys(e).reduce((function(n, r) {
            return !t.showNotFound && "Not Found" === e[r] || "N/A" === e[r] || void 0 === e[r] || 0 === Object.keys(e[r]).length ? n : o.isObject(e[r]) ? Object.values(e[r]).every((function(e) {
              return "N/A" === e || !t.showNotFound && "Not Found" === e;
            })) ? n : Object.assign(n, {
              [r]: i(e[r], t)
            }) : Object.assign(n, {
              [r]: e[r]
            });
          }), {});
        }
        function s(e, t) {
          o.log("trace", "formatHeaders"), t || (t = {
            type: "underline"
          });
          var n = {
            underline: [ "[4m", "[0m" ]
          };
          return e.slice().split("\n").map((function(e) {
            if (":" === e.slice("-1")) {
              var r = e.match(/^[\s]*/g)[0];
              return `${r}${n[t.type][0]}${e.slice(r.length)}${n[t.type][1]}`;
            }
            return e;
          })).join("\n");
        }
        function a(e) {
          return o.log("trace", "formatPackages"), e.npmPackages ? Object.assign(e, {
            npmPackages: Object.entries(e.npmPackages || {}).reduce((function(e, t) {
              var n = t[0], r = t[1];
              if ("Not Found" === r) return Object.assign(e, {
                [n]: r
              });
              var o = r.wanted ? `${r.wanted} =>` : "", i = Array.isArray(r.installed) ? r.installed.join(", ") : r.installed, s = r.duplicates ? `(${r.duplicates.join(", ")})` : "";
              return Object.assign(e, {
                [n]: `${o} ${i} ${s}`
              });
            }), {})
          }) : e;
        }
        function c(e, t, n) {
          return n || (n = {
            emptyMessage: "None"
          }), Array.isArray(t) && (t = t.length > 0 ? t.join(", ") : n.emptyMessage), {
            [e]: t
          };
        }
        function u(e) {
          return o.log("trace", "serializeArrays"), function e(t, n) {
            return Object.entries(t).reduce((function(t, r) {
              var i = r[0], s = r[1];
              return o.isObject(s) ? Object.assign(t, {
                [i]: e(s, n)
              }) : Object.assign(t, n(i, s));
            }), {});
          }(e, c);
        }
        function l(e) {
          return o.log("trace", "serializeVersionsAndPaths"), Object.entries(e).reduce((function(e, t) {
            return Object.assign(e, {
              [t[0]]: Object.entries(t[1]).reduce((function(e, t) {
                var n = t[0], r = t[1];
                return r.version ? Object.assign(e, {
                  [n]: [ r.version, r.path ].filter(Boolean).join(" - ")
                }) : Object.assign(e, {
                  [n]: [ r ][0]
                });
              }), {})
            }, {});
          }), {});
        }
        function f(e) {
          return r(e, {
            indent: "  ",
            prefix: "\n",
            postfix: "\n"
          });
        }
        function p(e) {
          return e.slice().split("\n").map((function(e) {
            if ("" !== e) {
              var t = ":" === e.slice("-1"), n = e.search(/\S|$/);
              return t ? `${"#".repeat(n / 2 + 1)} ` + e.slice(n) : " - " + e.slice(n);
            }
            return "";
          })).join("\n");
        }
        function h(e, t) {
          return t || (t = {
            indent: "  "
          }), JSON.stringify(e, null, t.indent);
        }
        e.exports = {
          json: function(e, t) {
            return o.log("trace", "formatToJson"), t || (t = {}), e = o.pipe([ function() {
              return i(e, t);
            }, t.title ? function(e) {
              return {
                [t.title]: e
              };
            } : o.noop, h ])(e), e = t.console ? `\n${e}\n` : e;
          },
          markdown: function(e, t) {
            return o.log("trace", "formatToMarkdown"), o.pipe([ function() {
              return i(e, t);
            }, a, u, l, f, p, t.title ? function(e) {
              return `\n# ${t.title}${e}`;
            } : o.noop ])(e, t);
          },
          yaml: function(e, t) {
            return o.log("trace", "formatToYaml", t), o.pipe([ function() {
              return i(e, t);
            }, a, u, l, t.title ? function(e) {
              return {
                [t.title]: e
              };
            } : o.noop, f, t.console ? s : o.noop ])(e, t);
          }
        };
      }, function(e, t, n) {
        n(28)("search", 1, (function(e, t, n) {
          return [ function(n) {
            "use strict";
            var r = e(this), o = null == n ? void 0 : n[t];
            return void 0 !== o ? o.call(n, r) : new RegExp(n)[t](String(r));
          }, n ];
        }));
      }, function(e, t, n) {
        "use strict";
        var r = n(164), o = n(165), i = n(169), s = [ "object", "array" ];
        e.exports = function(e, t) {
          var n = o(t), a = n.colors, c = n.prefix, u = n.postfix, l = n.dateToString, f = n.errorToString, p = n.indent, h = new Map;
          function d(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
            if (0 === Object.keys(e).length) return " {}";
            var o = "\n", a = i(t, p);
            return Object.keys(e).forEach((function(c) {
              var u = e[c], l = r(u), f = i(n, "  "), p = -1 !== s.indexOf(l) ? "" : " ", h = v(u) ? " [Circular]" : g(l, u, t + 1, n);
              o += `${f}${a}${c}:${p}${h}\n`;
            })), o.substring(0, o.length - 1);
          }
          function m(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
            if (0 === e.length) return " []";
            var o = "\n", s = i(t, p);
            return e.forEach((function(e) {
              var a = r(e), c = i(n, "  "), u = v(e) ? "[Circular]" : g(a, e, t, n + 1).toString().trimLeft();
              o += `${c}${s}- ${u}\n`;
            })), o.substring(0, o.length - 1);
          }
          function g(e, t, n, r) {
            switch (e) {
             case "array":
              return m(t, n, r);

             case "object":
              return d(t, n, r);

             case "string":
              return a.string(t);

             case "symbol":
              return a.symbol(t.toString());

             case "number":
              return a.number(t);

             case "boolean":
              return a.boolean(t);

             case "null":
              return a.null("null");

             case "undefined":
              return a.undefined("undefined");

             case "date":
              return a.date(l(t));

             case "error":
              return a.error(f(t));

             default:
              return t && t.toString ? t.toString() : Object.prototype.toString.call(t);
            }
          }
          function v(e) {
            return !(-1 === [ "object", "array" ].indexOf(r(e)) || !h.has(e) && (h.set(e), 1));
          }
          var y = "";
          return h.set(e), "object" === r(e) && Object.keys(e).length > 0 ? y = d(e) : "array" === r(e) && e.length > 0 && (y = m(e)), 
          0 === y.length ? "" : `${c}${y.slice(1)}${u}`;
        };
      }, function(e, t, n) {
        "use strict";
        e.exports = function(e) {
          return Array.isArray(e) ? "array" : e instanceof Date ? "date" : e instanceof Error ? "error" : null === e ? "null" : "object" == typeof e && "[object Object]" === Object.prototype.toString.call(e) ? "object" : typeof e;
        };
      }, function(e, t, n) {
        "use strict";
        var r = n(166), o = n(167), i = n(168);
        function u(e, t) {
          return void 0 === e ? t : e;
        }
        e.exports = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return {
            indent: u(e.indent, " "),
            prefix: u(e.prefix, "\n"),
            postfix: u(e.postfix, ""),
            errorToString: e.errorToString || r,
            dateToString: e.dateToString || o,
            colors: Object.assign({}, i, e.colors)
          };
        };
      }, function(e, t, n) {
        "use strict";
        e.exports = function(e) {
          return Error.prototype.toString.call(e);
        };
      }, function(e, t, n) {
        "use strict";
        e.exports = function(e) {
          return `new Date(${Date.prototype.toISOString.call(e)})`;
        };
      }, function(e, t, n) {
        "use strict";
        function r(e) {
          return e;
        }
        e.exports = {
          date: r,
          error: r,
          symbol: r,
          string: r,
          number: r,
          boolean: r,
          null: r,
          undefined: r
        };
      }, function(e, t, n) {
        "use strict";
        e.exports = function() {
          for (var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1, t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "  ", n = "", r = 0; r < e; r += 1) n += t;
          return n;
        };
      }, function(e, t, n) {
        "use strict";
        e.exports = {
          defaults: {
            System: [ "OS", "CPU", "Memory", "Container", "Shell" ],
            Binaries: [ "Node", "Yarn", "npm", "Watchman" ],
            Managers: [ "Apt", "Cargo", "CocoaPods", "Composer", "Gradle", "Homebrew", "Maven", "pip2", "pip3", "RubyGems", "Yum" ],
            Utilities: [ "Bazel", "CMake", "Make", "GCC", "Git", "Clang", "Ninja", "Mercurial", "Subversion", "FFmpeg" ],
            Servers: [ "Apache", "Nginx" ],
            Virtualization: [ "Docker", "Parallels", "VirtualBox", "VMware Fusion" ],
            SDKs: [ "iOS SDK", "Android SDK", "Windows SDK" ],
            IDEs: [ "Android Studio", "Atom", "Emacs", "IntelliJ", "NVim", "Nano", "PhpStorm", "Sublime Text", "VSCode", "Visual Studio", "Vim", "WebStorm", "Xcode" ],
            Languages: [ "Bash", "Go", "Elixir", "Erlang", "Java", "Perl", "PHP", "Protoc", "Python", "Python3", "R", "Ruby", "Rust", "Scala" ],
            Databases: [ "MongoDB", "MySQL", "PostgreSQL", "SQLite" ],
            Browsers: [ "Brave Browser", "Chrome", "Chrome Canary", "Chromium", "Edge", "Firefox", "Firefox Developer Edition", "Firefox Nightly", "Internet Explorer", "Safari", "Safari Technology Preview" ],
            Monorepos: [ "Yarn Workspaces", "Lerna" ],
            npmPackages: null,
            npmGlobalPackages: null
          },
          jest: {
            System: [ "OS", "CPU" ],
            Binaries: [ "Node", "Yarn", "npm" ],
            npmPackages: [ "jest" ]
          },
          "react-native": {
            System: [ "OS", "CPU" ],
            Binaries: [ "Node", "Yarn", "npm", "Watchman" ],
            SDKs: [ "iOS SDK", "Android SDK", "Windows SDK" ],
            IDEs: [ "Android Studio", "Xcode", "Visual Studio" ],
            npmPackages: [ "react", "react-native" ],
            npmGlobalPackages: [ "react-native-cli" ]
          },
          nyc: {
            System: [ "OS", "CPU", "Memory" ],
            Binaries: [ "Node", "Yarn", "npm" ],
            npmPackages: "/**/{*babel*,@babel/*/,*istanbul*,nyc,source-map-support,typescript,ts-node}"
          },
          webpack: {
            System: [ "OS", "CPU" ],
            Binaries: [ "Node", "Yarn", "npm" ],
            npmPackages: "*webpack*",
            npmGlobalPackages: [ "webpack", "webpack-cli" ]
          },
          "styled-components": {
            System: [ "OS", "CPU" ],
            Binaries: [ "Node", "Yarn", "npm" ],
            Browsers: [ "Chrome", "Firefox", "Safari" ],
            npmPackages: "*styled-components*"
          },
          "create-react-app": {
            System: [ "OS", "CPU" ],
            Binaries: [ "Node", "npm", "Yarn" ],
            Browsers: [ "Chrome", "Edge", "Internet Explorer", "Firefox", "Safari" ],
            npmPackages: [ "react", "react-dom", "react-scripts" ],
            npmGlobalPackages: [ "create-react-app" ],
            options: {
              duplicates: !0,
              showNotFound: !0
            }
          },
          apollo: {
            System: [ "OS" ],
            Binaries: [ "Node", "npm", "Yarn" ],
            Browsers: [ "Chrome", "Edge", "Firefox", "Safari" ],
            npmPackages: "{*apollo*,@apollo/*}",
            npmGlobalPackages: "{*apollo*,@apollo/*}"
          },
          "react-native-web": {
            System: [ "OS", "CPU" ],
            Binaries: [ "Node", "npm", "Yarn" ],
            Browsers: [ "Chrome", "Edge", "Internet Explorer", "Firefox", "Safari" ],
            npmPackages: [ "react", "react-native-web" ],
            options: {
              showNotFound: !0
            }
          },
          babel: {
            System: [ "OS" ],
            Binaries: [ "Node", "npm", "Yarn" ],
            Monorepos: [ "Yarn Workspaces", "Lerna" ],
            npmPackages: "{*babel*,@babel/*,eslint,webpack,create-react-app,react-native,lerna,jest}"
          },
          playwright: {
            System: [ "OS", "Memory", "Container" ],
            Binaries: [ "Node", "Yarn", "npm" ],
            Languages: [ "Bash" ],
            npmPackages: "playwright*"
          }
        };
      } ]);
    },
    5538: module => {
      "use strict";
      const peq = new Uint32Array(65536), distance = (a, b) => {
        if (a.length > b.length) {
          const tmp = b;
          b = a, a = tmp;
        }
        return 0 === a.length ? b.length : a.length <= 32 ? ((a, b) => {
          const n = a.length, m = b.length, lst = 1 << n - 1;
          let pv = -1, mv = 0, sc = n, i = n;
          for (;i--; ) peq[a.charCodeAt(i)] |= 1 << i;
          for (i = 0; i < m; i++) {
            let eq = peq[b.charCodeAt(i)];
            const xv = eq | mv;
            eq |= (eq & pv) + pv ^ pv, mv |= ~(eq | pv), pv &= eq, mv & lst && sc++, pv & lst && sc--, 
            mv = mv << 1 | 1, pv = pv << 1 | ~(xv | mv), mv &= xv;
          }
          for (i = n; i--; ) peq[a.charCodeAt(i)] = 0;
          return sc;
        })(a, b) : ((a, b) => {
          const n = a.length, m = b.length, mhc = [], phc = [], hsize = Math.ceil(n / 32), vsize = Math.ceil(m / 32);
          let score = m;
          for (let i = 0; i < hsize; i++) phc[i] = -1, mhc[i] = 0;
          let j = 0;
          for (;j < vsize - 1; j++) {
            let mv = 0, pv = -1;
            const start = 32 * j, end = Math.min(32, m) + start;
            for (let k = start; k < end; k++) peq[b.charCodeAt(k)] |= 1 << k;
            score = m;
            for (let i = 0; i < n; i++) {
              const eq = peq[a.charCodeAt(i)], pb = phc[i / 32 | 0] >>> i & 1, mb = mhc[i / 32 | 0] >>> i & 1, xv = eq | mv, xh = ((eq | mb) & pv) + pv ^ pv | eq | mb;
              let ph = mv | ~(xh | pv), mh = pv & xh;
              ph >>> 31 ^ pb && (phc[i / 32 | 0] ^= 1 << i), mh >>> 31 ^ mb && (mhc[i / 32 | 0] ^= 1 << i), 
              ph = ph << 1 | pb, mh = mh << 1 | mb, pv = mh | ~(xv | ph), mv = ph & xv;
            }
            for (let k = start; k < end; k++) peq[b.charCodeAt(k)] = 0;
          }
          let mv = 0, pv = -1;
          const start = 32 * j, end = Math.min(32, m - start) + start;
          for (let k = start; k < end; k++) peq[b.charCodeAt(k)] |= 1 << k;
          score = m;
          for (let i = 0; i < n; i++) {
            const eq = peq[a.charCodeAt(i)], pb = phc[i / 32 | 0] >>> i & 1, mb = mhc[i / 32 | 0] >>> i & 1, xv = eq | mv, xh = ((eq | mb) & pv) + pv ^ pv | eq | mb;
            let ph = mv | ~(xh | pv), mh = pv & xh;
            score += ph >>> m - 1 & 1, score -= mh >>> m - 1 & 1, ph >>> 31 ^ pb && (phc[i / 32 | 0] ^= 1 << i), 
            mh >>> 31 ^ mb && (mhc[i / 32 | 0] ^= 1 << i), ph = ph << 1 | pb, mh = mh << 1 | mb, 
            pv = mh | ~(xv | ph), mv = ph & xv;
          }
          for (let k = start; k < end; k++) peq[b.charCodeAt(k)] = 0;
          return score;
        })(a, b);
      };
      module.exports = {
        closest: (str, arr) => {
          let min_distance = 1 / 0, min_index = 0;
          for (let i = 0; i < arr.length; i++) {
            const dist = distance(str, arr[i]);
            dist < min_distance && (min_distance = dist, min_index = i);
          }
          return arr[min_index];
        },
        distance
      };
    },
    7648: module => {
      "use strict";
      var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ", slice = Array.prototype.slice, toStr = Object.prototype.toString;
      module.exports = function(that) {
        var target = this;
        if ("function" != typeof target || "[object Function]" !== toStr.call(target)) throw new TypeError(ERROR_MESSAGE + target);
        for (var bound, args = slice.call(arguments, 1), binder = function() {
          if (this instanceof bound) {
            var result = target.apply(this, args.concat(slice.call(arguments)));
            return Object(result) === result ? result : this;
          }
          return target.apply(that, args.concat(slice.call(arguments)));
        }, boundLength = Math.max(0, target.length - args.length), boundArgs = [], i = 0; i < boundLength; i++) boundArgs.push("$" + i);
        if (bound = Function("binder", "return function (" + boundArgs.join(",") + "){ return binder.apply(this,arguments); }")(binder), 
        target.prototype) {
          var Empty = function() {};
          Empty.prototype = target.prototype, bound.prototype = new Empty, Empty.prototype = null;
        }
        return bound;
      };
    },
    8612: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var implementation = __webpack_require__(7648);
      module.exports = Function.prototype.bind || implementation;
    },
    7642: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var bind = __webpack_require__(8612);
      module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);
    },
    8295: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var has = __webpack_require__(7642);
      function specifierIncluded(current, specifier) {
        for (var nodeParts = current.split("."), parts = specifier.split(" "), op = parts.length > 1 ? parts[0] : "=", versionParts = (parts.length > 1 ? parts[1] : parts[0]).split("."), i = 0; i < 3; ++i) {
          var cur = parseInt(nodeParts[i] || 0, 10), ver = parseInt(versionParts[i] || 0, 10);
          if (cur !== ver) return "<" === op ? cur < ver : ">=" === op && cur >= ver;
        }
        return ">=" === op;
      }
      function matchesRange(current, range) {
        var specifiers = range.split(/ ?&& ?/);
        if (0 === specifiers.length) return !1;
        for (var i = 0; i < specifiers.length; ++i) if (!specifierIncluded(current, specifiers[i])) return !1;
        return !0;
      }
      var data = __webpack_require__(6151);
      module.exports = function(x, nodeVersion) {
        return has(data, x) && function(nodeVersion, specifierValue) {
          if ("boolean" == typeof specifierValue) return specifierValue;
          var current = void 0 === nodeVersion ? process.versions && process.versions.node : nodeVersion;
          if ("string" != typeof current) throw new TypeError(void 0 === nodeVersion ? "Unable to determine current node version" : "If provided, a valid node version is required");
          if (specifierValue && "object" == typeof specifierValue) {
            for (var i = 0; i < specifierValue.length; ++i) if (matchesRange(current, specifierValue[i])) return !0;
            return !1;
          }
          return matchesRange(current, specifierValue);
        }(nodeVersion, data[x]);
      };
    },
    5299: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var isObject = __webpack_require__(7798);
      function isObjectObject(o) {
        return !0 === isObject(o) && "[object Object]" === Object.prototype.toString.call(o);
      }
      module.exports = function(o) {
        var ctor, prot;
        return !1 !== isObjectObject(o) && ("function" == typeof (ctor = o.constructor) && (!1 !== isObjectObject(prot = ctor.prototype) && !1 !== prot.hasOwnProperty("isPrototypeOf")));
      };
    },
    1959: (module, __unused_webpack_exports, __webpack_require__) => {
      var core;
      __webpack_require__(7147);
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
      core = "win32" === process.platform || global.TESTING_WINDOWS ? __webpack_require__(1429) : __webpack_require__(4601), 
      module.exports = isexe, isexe.sync = function(path, options) {
        try {
          return core.sync(path, options || {});
        } catch (er) {
          if (options && options.ignoreErrors || "EACCES" === er.code) return !1;
          throw er;
        }
      };
    },
    4601: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = isexe, isexe.sync = function(path, options) {
        return checkStat(fs.statSync(path), options);
      };
      var fs = __webpack_require__(7147);
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
    1429: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = isexe, isexe.sync = function(path, options) {
        return checkStat(fs.statSync(path), path, options);
      };
      var fs = __webpack_require__(7147);
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
    7798: module => {
      "use strict";
      module.exports = function(val) {
        return null != val && "object" == typeof val && !1 === Array.isArray(val);
      };
    },
    6401: module => {
      var toString = Object.prototype.toString;
      function ctorName(val) {
        return "function" == typeof val.constructor ? val.constructor.name : null;
      }
      module.exports = function(val) {
        if (void 0 === val) return "undefined";
        if (null === val) return "null";
        var name, type = typeof val;
        if ("boolean" === type) return "boolean";
        if ("string" === type) return "string";
        if ("number" === type) return "number";
        if ("symbol" === type) return "symbol";
        if ("function" === type) return name = val, "GeneratorFunction" === ctorName(name) ? "generatorfunction" : "function";
        if (function(val) {
          return Array.isArray ? Array.isArray(val) : val instanceof Array;
        }(val)) return "array";
        if (function(val) {
          if (val.constructor && "function" == typeof val.constructor.isBuffer) return val.constructor.isBuffer(val);
          return !1;
        }(val)) return "buffer";
        if (function(val) {
          try {
            if ("number" == typeof val.length && "function" == typeof val.callee) return !0;
          } catch (err) {
            if (-1 !== err.message.indexOf("callee")) return !0;
          }
          return !1;
        }(val)) return "arguments";
        if (function(val) {
          return val instanceof Date || "function" == typeof val.toDateString && "function" == typeof val.getDate && "function" == typeof val.setDate;
        }(val)) return "date";
        if (function(val) {
          return val instanceof Error || "string" == typeof val.message && val.constructor && "number" == typeof val.constructor.stackTraceLimit;
        }(val)) return "error";
        if (function(val) {
          return val instanceof RegExp || "string" == typeof val.flags && "boolean" == typeof val.ignoreCase && "boolean" == typeof val.multiline && "boolean" == typeof val.global;
        }(val)) return "regexp";
        switch (ctorName(val)) {
         case "Symbol":
          return "symbol";

         case "Promise":
          return "promise";

         case "WeakMap":
          return "weakmap";

         case "WeakSet":
          return "weakset";

         case "Map":
          return "map";

         case "Set":
          return "set";

         case "Int8Array":
          return "int8array";

         case "Uint8Array":
          return "uint8array";

         case "Uint8ClampedArray":
          return "uint8clampedarray";

         case "Int16Array":
          return "int16array";

         case "Uint16Array":
          return "uint16array";

         case "Int32Array":
          return "int32array";

         case "Uint32Array":
          return "uint32array";

         case "Float32Array":
          return "float32array";

         case "Float64Array":
          return "float64array";
        }
        if (function(val) {
          return "function" == typeof val.throw && "function" == typeof val.return && "function" == typeof val.next;
        }(val)) return "generator";
        switch (type = toString.call(val)) {
         case "[object Object]":
          return "object";

         case "[object Map Iterator]":
          return "mapiterator";

         case "[object Set Iterator]":
          return "setiterator";

         case "[object String Iterator]":
          return "stringiterator";

         case "[object Array Iterator]":
          return "arrayiterator";
        }
        return type.slice(8, -1).toLowerCase().replace(/\s/g, "");
      };
    },
    3024: module => {
      "use strict";
      const pathKey = (options = {}) => {
        const environment = options.env || process.env;
        return "win32" !== (options.platform || process.platform) ? "PATH" : Object.keys(environment).reverse().find((key => "PATH" === key.toUpperCase())) || "Path";
      };
      module.exports = pathKey, module.exports.default = pathKey;
    },
    762: module => {
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
    3616: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var path = __webpack_require__(1017);
      module.exports = function(input) {
        var longExtension = function(basename) {
          if ("." === basename[basename.length - 1]) return null;
          var startIndex = "." === basename[0] ? 1 : 0, dotIndex = basename.indexOf(".", startIndex);
          return dotIndex <= startIndex ? null : basename.slice(dotIndex);
        }(path.basename(input));
        if (longExtension) return function(longExtension) {
          for (var arr = [ longExtension ], len = longExtension.length, startIndex = 1; startIndex < len; ) {
            var dotIndex = longExtension.indexOf(".", startIndex);
            if (dotIndex < 0) break;
            arr.push(longExtension.slice(dotIndex)), startIndex = dotIndex + 1;
          }
          return arr;
        }(longExtension);
      };
    },
    2317: module => {
      function normalizer(config) {
        return "string" == typeof config ? {
          module: config
        } : config;
      }
      module.exports = function(config) {
        return Array.isArray(config) ? config.map(normalizer) : normalizer(config);
      };
    },
    6313: (module, __unused_webpack_exports, __webpack_require__) => {
      var async = __webpack_require__(8821);
      async.core = __webpack_require__(6092), async.isCore = __webpack_require__(206), 
      async.sync = __webpack_require__(6406), module.exports = async;
    },
    8821: (module, __unused_webpack_exports, __webpack_require__) => {
      var fs = __webpack_require__(7147), getHomedir = __webpack_require__(2543), path = __webpack_require__(1017), caller = __webpack_require__(6628), nodeModulesPaths = __webpack_require__(6015), normalizeOptions = __webpack_require__(5031), isCore = __webpack_require__(8295), realpathFS = "win32" !== process.platform && fs.realpath && "function" == typeof fs.realpath.native ? fs.realpath.native : fs.realpath, homedir = getHomedir(), defaultIsFile = function(file, cb) {
        fs.stat(file, (function(err, stat) {
          return err ? "ENOENT" === err.code || "ENOTDIR" === err.code ? cb(null, !1) : cb(err) : cb(null, stat.isFile() || stat.isFIFO());
        }));
      }, defaultIsDir = function(dir, cb) {
        fs.stat(dir, (function(err, stat) {
          return err ? "ENOENT" === err.code || "ENOTDIR" === err.code ? cb(null, !1) : cb(err) : cb(null, stat.isDirectory());
        }));
      }, defaultRealpath = function(x, cb) {
        realpathFS(x, (function(realpathErr, realPath) {
          realpathErr && "ENOENT" !== realpathErr.code ? cb(realpathErr) : cb(null, realpathErr ? x : realPath);
        }));
      }, maybeRealpath = function(realpath, x, opts, cb) {
        opts && !1 === opts.preserveSymlinks ? realpath(x, cb) : cb(null, x);
      }, defaultReadPackage = function(readFile, pkgfile, cb) {
        readFile(pkgfile, (function(readFileErr, body) {
          if (readFileErr) cb(readFileErr); else try {
            var pkg = JSON.parse(body);
            cb(null, pkg);
          } catch (jsonErr) {
            cb(null);
          }
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
        var isFile = (opts = normalizeOptions(x, opts)).isFile || defaultIsFile, isDirectory = opts.isDirectory || defaultIsDir, readFile = opts.readFile || fs.readFile, realpath = opts.realpath || defaultRealpath, readPackage = opts.readPackage || defaultReadPackage;
        if (opts.readFile && opts.readPackage) {
          var conflictErr = new TypeError("`readFile` and `readPackage` are mutually exclusive.");
          return process.nextTick((function() {
            cb(conflictErr);
          }));
        }
        var packageIterator = opts.packageIterator, extensions = opts.extensions || [ ".js" ], includeCoreModules = !1 !== opts.includeCoreModules, basedir = opts.basedir || path.dirname(caller()), parent = opts.filename || basedir;
        opts.paths = opts.paths || [ path.join(homedir, ".node_modules"), path.join(homedir, ".node_libraries") ];
        var res, absoluteStart = path.resolve(basedir);
        function onfile(err, m, pkg) {
          err ? cb(err) : m ? cb(null, m, pkg) : loadAsDirectory(res, (function(err, d, pkg) {
            if (err) cb(err); else if (d) maybeRealpath(realpath, d, opts, (function(err, realD) {
              err ? cb(err) : cb(null, realD, pkg);
            })); else {
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
          return "" === dir || "/" === dir || "win32" === process.platform && /^\w:[/\\]*$/.test(dir) || /[/\\]node_modules[/\\]*$/.test(dir) ? cb(null) : void maybeRealpath(realpath, dir, opts, (function(unwrapErr, pkgdir) {
            if (unwrapErr) return loadpkg(path.dirname(dir), cb);
            var pkgfile = path.join(pkgdir, "package.json");
            isFile(pkgfile, (function(err, ex) {
              if (!ex) return loadpkg(path.dirname(dir), cb);
              readPackage(readFile, pkgfile, (function(err, pkgParam) {
                err && cb(err);
                var pkg = pkgParam;
                pkg && opts.packageFilter && (pkg = opts.packageFilter(pkg, pkgfile)), cb(null, pkg, dir);
              }));
            }));
          }));
        }
        function loadAsDirectory(x, loadAsDirectoryPackage, callback) {
          var cb = callback, fpkg = loadAsDirectoryPackage;
          "function" == typeof fpkg && (cb = fpkg, fpkg = opts.package), maybeRealpath(realpath, x, opts, (function(unwrapErr, pkgdir) {
            if (unwrapErr) return cb(unwrapErr);
            var pkgfile = path.join(pkgdir, "package.json");
            isFile(pkgfile, (function(err, ex) {
              return err ? cb(err) : ex ? void readPackage(readFile, pkgfile, (function(err, pkgParam) {
                if (err) return cb(err);
                var pkg = pkgParam;
                if (pkg && opts.packageFilter && (pkg = opts.packageFilter(pkg, pkgfile)), pkg && pkg.main) {
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
          }));
        }
        function processDirs(cb, dirs) {
          if (0 === dirs.length) return cb(null, void 0);
          var dir = dirs[0];
          function onfile(err, m, pkg) {
            return err ? cb(err) : m ? cb(null, m, pkg) : void loadAsDirectory(dir, opts.package, ondir);
          }
          function ondir(err, n, pkg) {
            return err ? cb(err) : n ? cb(null, n, pkg) : void processDirs(cb, dirs.slice(1));
          }
          isDirectory(path.dirname(dir), (function(err, isdir) {
            if (err) return cb(err);
            if (!isdir) return processDirs(cb, dirs.slice(1));
            loadAsFile(dir, opts.package, onfile);
          }));
        }
        maybeRealpath(realpath, absoluteStart, opts, (function(err, realStart) {
          err ? cb(err) : function(basedir) {
            if (/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/.test(x)) res = path.resolve(basedir, x), 
            "." !== x && ".." !== x && "/" !== x.slice(-1) || (res += "/"), /\/$/.test(x) && res === basedir ? loadAsDirectory(res, opts.package, onfile) : loadAsFile(res, opts.package, onfile); else {
              if (includeCoreModules && isCore(x)) return cb(null, x);
              !function(x, start, cb) {
                var thunk = function() {
                  return function(x, start, opts) {
                    for (var dirs = nodeModulesPaths(start, opts, x), i = 0; i < dirs.length; i++) dirs[i] = path.join(dirs[i], x);
                    return dirs;
                  }(x, start, opts);
                };
                processDirs(cb, packageIterator ? packageIterator(x, start, thunk, opts) : thunk());
              }(x, basedir, (function(err, n, pkg) {
                if (err) cb(err); else {
                  if (n) return maybeRealpath(realpath, n, opts, (function(err, realN) {
                    err ? cb(err) : cb(null, realN, pkg);
                  }));
                  var moduleError = new Error("Cannot find module '" + x + "' from '" + parent + "'");
                  moduleError.code = "MODULE_NOT_FOUND", cb(moduleError);
                }
              }));
            }
          }(realStart);
        }));
      };
    },
    6628: module => {
      module.exports = function() {
        var origPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = function(_, stack) {
          return stack;
        };
        var stack = (new Error).stack;
        return Error.prepareStackTrace = origPrepareStackTrace, stack[2].getFileName();
      };
    },
    2543: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var os = __webpack_require__(2037);
      module.exports = os.homedir || function() {
        var home = process.env.HOME, user = process.env.LOGNAME || process.env.USER || process.env.LNAME || process.env.USERNAME;
        return "win32" === process.platform ? process.env.USERPROFILE || process.env.HOMEDRIVE + process.env.HOMEPATH || home || null : "darwin" === process.platform ? home || (user ? "/Users/" + user : null) : "linux" === process.platform ? home || (0 === process.getuid() ? "/root" : user ? "/home/" + user : null) : home || null;
      };
    },
    206: (module, __unused_webpack_exports, __webpack_require__) => {
      var isCoreModule = __webpack_require__(8295);
      module.exports = function(x) {
        return isCoreModule(x);
      };
    },
    6015: (module, __unused_webpack_exports, __webpack_require__) => {
      var path = __webpack_require__(1017), parse = path.parse || __webpack_require__(762), getNodeModulesDirs = function(absoluteStart, modules) {
        var prefix = "/";
        /^([A-Za-z]:)/.test(absoluteStart) ? prefix = "" : /^\\\\/.test(absoluteStart) && (prefix = "\\\\");
        for (var paths = [ absoluteStart ], parsed = parse(absoluteStart); parsed.dir !== paths[paths.length - 1]; ) paths.push(parsed.dir), 
        parsed = parse(parsed.dir);
        return paths.reduce((function(dirs, aPath) {
          return dirs.concat(modules.map((function(moduleDir) {
            return path.resolve(prefix, aPath, moduleDir);
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
    5031: module => {
      module.exports = function(x, opts) {
        return opts || {};
      };
    },
    6406: (module, __unused_webpack_exports, __webpack_require__) => {
      var isCore = __webpack_require__(8295), fs = __webpack_require__(7147), path = __webpack_require__(1017), getHomedir = __webpack_require__(2543), caller = __webpack_require__(6628), nodeModulesPaths = __webpack_require__(6015), normalizeOptions = __webpack_require__(5031), realpathFS = "win32" !== process.platform && fs.realpathSync && "function" == typeof fs.realpathSync.native ? fs.realpathSync.native : fs.realpathSync, homedir = getHomedir(), defaultIsFile = function(file) {
        try {
          var stat = fs.statSync(file, {
            throwIfNoEntry: !1
          });
        } catch (e) {
          if (e && ("ENOENT" === e.code || "ENOTDIR" === e.code)) return !1;
          throw e;
        }
        return !!stat && (stat.isFile() || stat.isFIFO());
      }, defaultIsDir = function(dir) {
        try {
          var stat = fs.statSync(dir, {
            throwIfNoEntry: !1
          });
        } catch (e) {
          if (e && ("ENOENT" === e.code || "ENOTDIR" === e.code)) return !1;
          throw e;
        }
        return !!stat && stat.isDirectory();
      }, defaultRealpathSync = function(x) {
        try {
          return realpathFS(x);
        } catch (realpathErr) {
          if ("ENOENT" !== realpathErr.code) throw realpathErr;
        }
        return x;
      }, maybeRealpathSync = function(realpathSync, x, opts) {
        return opts && !1 === opts.preserveSymlinks ? realpathSync(x) : x;
      }, defaultReadPackageSync = function(readFileSync, pkgfile) {
        var body = readFileSync(pkgfile);
        try {
          return JSON.parse(body);
        } catch (jsonErr) {}
      };
      module.exports = function(x, options) {
        if ("string" != typeof x) throw new TypeError("Path must be a string.");
        var opts = normalizeOptions(x, options), isFile = opts.isFile || defaultIsFile, readFileSync = opts.readFileSync || fs.readFileSync, isDirectory = opts.isDirectory || defaultIsDir, realpathSync = opts.realpathSync || defaultRealpathSync, readPackageSync = opts.readPackageSync || defaultReadPackageSync;
        if (opts.readFileSync && opts.readPackageSync) throw new TypeError("`readFileSync` and `readPackageSync` are mutually exclusive.");
        var packageIterator = opts.packageIterator, extensions = opts.extensions || [ ".js" ], includeCoreModules = !1 !== opts.includeCoreModules, basedir = opts.basedir || path.dirname(caller()), parent = opts.filename || basedir;
        opts.paths = opts.paths || [ path.join(homedir, ".node_modules"), path.join(homedir, ".node_libraries") ];
        var absoluteStart = maybeRealpathSync(realpathSync, path.resolve(basedir), opts);
        if (/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/.test(x)) {
          var res = path.resolve(absoluteStart, x);
          "." !== x && ".." !== x && "/" !== x.slice(-1) || (res += "/");
          var m = loadAsFileSync(res) || loadAsDirectorySync(res);
          if (m) return maybeRealpathSync(realpathSync, m, opts);
        } else {
          if (includeCoreModules && isCore(x)) return x;
          var n = function(x, start) {
            for (var thunk = function() {
              return function(x, start, opts) {
                for (var dirs = nodeModulesPaths(start, opts, x), i = 0; i < dirs.length; i++) dirs[i] = path.join(dirs[i], x);
                return dirs;
              }(x, start, opts);
            }, dirs = packageIterator ? packageIterator(x, start, thunk, opts) : thunk(), i = 0; i < dirs.length; i++) {
              var dir = dirs[i];
              if (isDirectory(path.dirname(dir))) {
                var m = loadAsFileSync(dir);
                if (m) return m;
                var n = loadAsDirectorySync(dir);
                if (n) return n;
              }
            }
          }(x, absoluteStart);
          if (n) return maybeRealpathSync(realpathSync, n, opts);
        }
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
            var pkgfile = path.join(maybeRealpathSync(realpathSync, dir, opts), "package.json");
            if (!isFile(pkgfile)) return loadpkg(path.dirname(dir));
            var pkg = readPackageSync(readFileSync, pkgfile);
            return pkg && opts.packageFilter && (pkg = opts.packageFilter(pkg, dir)), {
              pkg,
              dir
            };
          }
        }
        function loadAsDirectorySync(x) {
          var pkgfile = path.join(maybeRealpathSync(realpathSync, x, opts), "/package.json");
          if (isFile(pkgfile)) {
            try {
              var pkg = readPackageSync(readFileSync, pkgfile);
            } catch (e) {}
            if (pkg && opts.packageFilter && (pkg = opts.packageFilter(pkg, x)), pkg && pkg.main) {
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
    3341: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const valueOf = Symbol.prototype.valueOf, typeOf = __webpack_require__(6401);
      module.exports = function(val, deep) {
        switch (typeOf(val)) {
         case "array":
          return val.slice();

         case "object":
          return Object.assign({}, val);

         case "date":
          return new val.constructor(Number(val));

         case "map":
          return new Map(val);

         case "set":
          return new Set(val);

         case "buffer":
          return function(val) {
            const len = val.length, buf = Buffer.allocUnsafe ? Buffer.allocUnsafe(len) : Buffer.from(len);
            return val.copy(buf), buf;
          }(val);

         case "symbol":
          return function(val) {
            return valueOf ? Object(valueOf.call(val)) : {};
          }(val);

         case "arraybuffer":
          return function(val) {
            const res = new val.constructor(val.byteLength);
            return new Uint8Array(res).set(new Uint8Array(val)), res;
          }(val);

         case "float32array":
         case "float64array":
         case "int16array":
         case "int32array":
         case "int8array":
         case "uint16array":
         case "uint32array":
         case "uint8clampedarray":
         case "uint8array":
          return function(val, deep) {
            return new val.constructor(val.buffer, val.byteOffset, val.length);
          }(val);

         case "regexp":
          return function(val) {
            const flags = void 0 !== val.flags ? val.flags : /\w+$/.exec(val) || void 0, re = new val.constructor(val.source, flags);
            return re.lastIndex = val.lastIndex, re;
          }(val);

         case "error":
          return Object.create(val);

         default:
          return val;
        }
      };
    },
    2063: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const shebangRegex = __webpack_require__(9395);
      module.exports = (string = "") => {
        const match = string.match(shebangRegex);
        if (!match) return null;
        const [path, argument] = match[0].replace(/#! ?/, "").split(" "), binary = path.split("/").pop();
        return "env" === binary ? argument : argument ? `${binary} ${argument}` : binary;
      };
    },
    9395: module => {
      "use strict";
      module.exports = /^#!(.*)/;
    },
    4366: (module, __unused_webpack_exports, __webpack_require__) => {
      module = __webpack_require__.nmd(module);
      var path = __webpack_require__(1017), endsInBabelJs = /\.babel\.[jt]s(x)$/;
      function ignoreNonBabelAndNodeModules(file) {
        return !endsInBabelJs.test(file) && path.relative(process.cwd(), file).split(path.sep).indexOf("node_modules") >= 0;
      }
      var extensions = {
        ".babel.js": [ {
          module: "@babel/register",
          register: function(hook) {
            hook({
              extensions: ".js",
              rootMode: "upward-optional",
              ignore: [ ignoreNonBabelAndNodeModules ]
            });
          }
        }, {
          module: "babel-register",
          register: function(hook) {
            hook({
              extensions: ".js",
              ignore: ignoreNonBabelAndNodeModules
            });
          }
        }, {
          module: "babel-core/register",
          register: function(hook) {
            hook({
              extensions: ".js",
              ignore: ignoreNonBabelAndNodeModules
            });
          }
        }, {
          module: "babel/register",
          register: function(hook) {
            hook({
              extensions: ".js",
              ignore: ignoreNonBabelAndNodeModules
            });
          }
        } ],
        ".babel.ts": [ {
          module: "@babel/register",
          register: function(hook) {
            hook({
              extensions: ".ts",
              rootMode: "upward-optional",
              ignore: [ ignoreNonBabelAndNodeModules ]
            });
          }
        } ],
        ".buble.js": "buble/register",
        ".cirru": "cirru-script/lib/register",
        ".cjsx": "node-cjsx/register",
        ".co": "coco",
        ".coffee": [ "coffeescript/register", "coffee-script/register", "coffeescript", "coffee-script" ],
        ".coffee.md": [ "coffeescript/register", "coffee-script/register", "coffeescript", "coffee-script" ],
        ".csv": "require-csv",
        ".eg": "earlgrey/register",
        ".esm.js": {
          module: "esm",
          register: function(hook) {
            var esmLoader = hook(module);
            __webpack_require__(5965).extensions[".js"] = esmLoader("module")._extensions[".js"];
          }
        },
        ".iced": [ "iced-coffee-script/register", "iced-coffee-script" ],
        ".iced.md": "iced-coffee-script/register",
        ".ini": "require-ini",
        ".js": null,
        ".json": null,
        ".json5": [ "json5/lib/register", "json5/lib/require" ],
        ".jsx": [ {
          module: "@babel/register",
          register: function(hook) {
            hook({
              extensions: ".jsx",
              rootMode: "upward-optional",
              ignore: [ ignoreNonBabelAndNodeModules ]
            });
          }
        }, {
          module: "babel-register",
          register: function(hook) {
            hook({
              extensions: ".jsx",
              ignore: ignoreNonBabelAndNodeModules
            });
          }
        }, {
          module: "babel-core/register",
          register: function(hook) {
            hook({
              extensions: ".jsx",
              ignore: ignoreNonBabelAndNodeModules
            });
          }
        }, {
          module: "babel/register",
          register: function(hook) {
            hook({
              extensions: ".jsx",
              ignore: ignoreNonBabelAndNodeModules
            });
          }
        }, {
          module: "node-jsx",
          register: function(hook) {
            hook.install({
              extension: ".jsx",
              harmony: !0
            });
          }
        } ],
        ".litcoffee": [ "coffeescript/register", "coffee-script/register", "coffeescript", "coffee-script" ],
        ".liticed": "iced-coffee-script/register",
        ".ls": [ "livescript", "LiveScript" ],
        ".mjs": path.join(__dirname, "mjs-stub"),
        ".node": null,
        ".toml": {
          module: "toml-require",
          register: function(hook) {
            hook.install();
          }
        },
        ".ts": [ "ts-node/register", "typescript-node/register", "typescript-register", "typescript-require", "sucrase/register/ts", {
          module: "@babel/register",
          register: function(hook) {
            hook({
              extensions: ".ts",
              rootMode: "upward-optional",
              ignore: [ ignoreNonBabelAndNodeModules ]
            });
          }
        } ],
        ".tsx": [ "ts-node/register", "typescript-node/register", "sucrase/register", {
          module: "@babel/register",
          register: function(hook) {
            hook({
              extensions: ".tsx",
              rootMode: "upward-optional",
              ignore: [ ignoreNonBabelAndNodeModules ]
            });
          }
        } ],
        ".wisp": "wisp/engine/node",
        ".xml": "require-xml",
        ".yaml": "require-yaml",
        ".yml": "require-yaml"
      };
      module.exports = {
        extensions,
        jsVariants: [ ".js", ".babel.js", ".babel.ts", ".buble.js", ".cirru", ".cjsx", ".co", ".coffee", ".coffee.md", ".eg", ".esm.js", ".iced", ".iced.md", ".jsx", ".litcoffee", ".liticed", ".ls", ".mjs", ".ts", ".tsx", ".wisp" ].reduce((function(result, ext) {
          return result[ext] = extensions[ext], result;
        }), {})
      };
    },
    3752: (__unused_webpack_module, exports, __webpack_require__) => {
      var path = __webpack_require__(1017), extension = __webpack_require__(3616), normalize = __webpack_require__(2317), register = __webpack_require__(9276);
      exports.prepare = function(extensions, filepath, cwd, nothrow) {
        var config, usedExtension, err, option, attempt, error, attempts = [], onlyErrors = !0, exts = extension(filepath);
        if (exts && exts.some((function(ext) {
          return usedExtension = ext, !!(config = normalize(extensions[ext]));
        })), -1 !== Object.keys(__webpack_require__(5965).extensions).indexOf(usedExtension)) return !0;
        if (!config) {
          if (nothrow) return;
          throw new Error('No module loader found for "' + usedExtension + '".');
        }
        for (var i in cwd || (cwd = path.dirname(path.resolve(filepath))), Array.isArray(config) || (config = [ config ]), 
        config) if (option = config[i], (error = (attempt = register(cwd, option.module, option.register)) instanceof Error ? attempt : null) && (attempt = null), 
        attempts.push({
          moduleName: option.module,
          module: attempt,
          error
        }), !error) {
          onlyErrors = !1;
          break;
        }
        if (onlyErrors) {
          if ((err = new Error('Unable to use specified module loaders for "' + usedExtension + '".')).failures = attempts, 
          nothrow) return err;
          throw err;
        }
        return attempts;
      };
    },
    9276: (module, __unused_webpack_exports, __webpack_require__) => {
      var resolve = __webpack_require__(6313);
      module.exports = function(cwd, moduleName, register) {
        var result;
        try {
          var modulePath = resolve.sync(moduleName, {
            basedir: cwd
          });
          result = __webpack_require__(5965)(modulePath), "function" == typeof register && register(result);
        } catch (e) {
          result = e;
        }
        return result;
      };
    },
    6092: (module, __unused_webpack_exports, __webpack_require__) => {
      var current = process.versions && process.versions.node && process.versions.node.split(".") || [];
      function specifierIncluded(specifier) {
        for (var parts = specifier.split(" "), op = parts.length > 1 ? parts[0] : "=", versionParts = (parts.length > 1 ? parts[1] : parts[0]).split("."), i = 0; i < 3; ++i) {
          var cur = parseInt(current[i] || 0, 10), ver = parseInt(versionParts[i] || 0, 10);
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
      var data = __webpack_require__(6151), core = {};
      for (var mod in data) Object.prototype.hasOwnProperty.call(data, mod) && (core[mod] = versionIncluded(data[mod]));
      module.exports = core;
    },
    9311: (module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const fs = __webpack_require__(7147), path = __webpack_require__(1017), {pathToFileURL} = __webpack_require__(7310), util = __webpack_require__(3837), {program, Option} = __webpack_require__(7461), WEBPACK_PACKAGE = process.env.WEBPACK_PACKAGE || "webpack", WEBPACK_DEV_SERVER_PACKAGE = process.env.WEBPACK_DEV_SERVER_PACKAGE || "webpack-dev-server";
      module.exports = class {
        constructor() {
          this.colors = this.createColors(), this.logger = this.getLogger(), this.program = program, 
          this.program.name("webpack"), this.program.configureOutput({
            writeErr: this.logger.error,
            outputError: (str, write) => write(`Error: ${this.capitalizeFirstLetter(str.replace(/^error:/, "").trim())}`)
          });
        }
        isMultipleCompiler(compiler) {
          return compiler.compilers;
        }
        isPromise(value) {
          return "function" == typeof value.then;
        }
        isFunction(value) {
          return "function" == typeof value;
        }
        capitalizeFirstLetter(str) {
          return "string" != typeof str ? "" : str.charAt(0).toUpperCase() + str.slice(1);
        }
        toKebabCase(str) {
          return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
        }
        createColors(useColor) {
          const {createColors, isColorSupported} = __webpack_require__(9485);
          let shouldUseColor;
          return shouldUseColor = useColor || isColorSupported, Object.assign(Object.assign({}, createColors({
            useColor: shouldUseColor
          })), {
            isColorSupported: shouldUseColor
          });
        }
        getLogger() {
          return {
            error: val => console.error(`[webpack-cli] ${this.colors.red(util.format(val))}`),
            warn: val => console.warn(`[webpack-cli] ${this.colors.yellow(val)}`),
            info: val => console.info(`[webpack-cli] ${this.colors.cyan(val)}`),
            success: val => console.log(`[webpack-cli] ${this.colors.green(val)}`),
            log: val => console.log(`[webpack-cli] ${val}`),
            raw: val => console.log(val)
          };
        }
        checkPackageExists(packageName) {
          if (process.versions.pnp || /@webpack-cli\/(serve|info|configtest)$/i.test(packageName)) return !0;
          let dir = __dirname;
          do {
            try {
              if (fs.statSync(path.join(dir, "node_modules", packageName)).isDirectory()) return !0;
            } catch (_error) {}
          } while (dir !== (dir = path.dirname(dir)));
          return !1;
        }
        getAvailablePackageManagers() {
          const {sync} = __webpack_require__(8309), availableInstallers = [ "npm", "yarn", "pnpm" ].filter((installer => (packageManager => {
            try {
              return sync(packageManager, [ "--version" ]), packageManager;
            } catch (err) {
              return !1;
            }
          })(installer)));
          return availableInstallers.length || (this.logger.error("No package manager found."), 
          process.exit(2)), availableInstallers;
        }
        getDefaultPackageManager() {
          const {sync} = __webpack_require__(8309);
          if (fs.existsSync(path.resolve(process.cwd(), "package-lock.json"))) return "npm";
          if (fs.existsSync(path.resolve(process.cwd(), "yarn.lock"))) return "yarn";
          if (fs.existsSync(path.resolve(process.cwd(), "pnpm-lock.yaml"))) return "pnpm";
          try {
            if (sync("npm", [ "--version" ])) return "npm";
          } catch (e) {}
          try {
            if (sync("yarn", [ "--version" ])) return "yarn";
          } catch (e) {}
          try {
            if (sync("pnpm", [ "--version" ])) return "pnpm";
          } catch (e) {
            this.logger.error("No package manager found."), process.exit(2);
          }
        }
        async doInstall(packageName, options = {}) {
          const packageManager = this.getDefaultPackageManager();
          packageManager || (this.logger.error("Can't find package manager"), process.exit(2)), 
          options.preMessage && options.preMessage();
          const commandArguments = [ "yarn" === packageManager ? "add" : "install", "-D", packageName ], commandToBeRun = `${packageManager} ${commandArguments.join(" ")}`;
          let needInstall;
          try {
            needInstall = await (({message, defaultResponse, stream}) => {
              const rl = __webpack_require__(4521).createInterface({
                input: process.stdin,
                output: stream
              });
              return new Promise((resolve => {
                rl.question(`${message} `, (answer => {
                  rl.close();
                  const response = (answer || defaultResponse).toLowerCase();
                  resolve("y" === response || "yes" === response);
                }));
              }));
            })({
              message: `[webpack-cli] Would you like to install '${this.colors.green(packageName)}' package? (That will run '${this.colors.green(commandToBeRun)}') (${this.colors.yellow("Y/n")})`,
              defaultResponse: "Y",
              stream: process.stderr
            });
          } catch (error) {
            this.logger.error(error), process.exit(error);
          }
          if (needInstall) {
            const {sync} = __webpack_require__(8309);
            try {
              sync(packageManager, commandArguments, {
                stdio: "inherit"
              });
            } catch (error) {
              this.logger.error(error), process.exit(2);
            }
            return packageName;
          }
          process.exit(2);
        }
        async tryRequireThenImport(module, handleError = !0) {
          let result;
          try {
            const m = /@webpack-cli\/(serve|info|configtest)$/i.exec(module);
            result = m ? __webpack_require__(5803)(`./${m[1]}/lib`) : __webpack_require__(5965)(module);
          } catch (error) {
            const dynamicImportLoader = __webpack_require__(2871)();
            if (("ERR_REQUIRE_ESM" === error.code || process.env.WEBPACK_CLI_FORCE_LOAD_ESM_CONFIG) && pathToFileURL && dynamicImportLoader) {
              const urlForConfig = pathToFileURL(module);
              return result = await dynamicImportLoader(urlForConfig), result = result.default, 
              result;
            }
            if (!handleError) throw error;
            this.logger.error(error), process.exit(2);
          }
          return result && "object" == typeof result && "default" in result && (result = result.default || {}), 
          result || {};
        }
        loadJSONFile(pathToFile, handleError = !0) {
          let result;
          try {
            const m = /@webpack-cli\/(serve|info|configtest)\/package\.json$/i.exec(pathToFile);
            result = m ? __webpack_require__(1005)(`./${m[1]}/package.json`) : __webpack_require__(5965)(pathToFile);
          } catch (error) {
            if (!handleError) throw error;
            this.logger.error(error), process.exit(2);
          }
          return result;
        }
        async makeCommand(commandOptions, options, action) {
          const alreadyLoaded = this.program.commands.find((command => command.name() === commandOptions.name.split(" ")[0] || command.aliases().includes(commandOptions.alias)));
          if (alreadyLoaded) return;
          const command = this.program.command(commandOptions.name, {
            noHelp: commandOptions.noHelp,
            hidden: commandOptions.hidden,
            isDefault: commandOptions.isDefault
          });
          commandOptions.description && command.description(commandOptions.description, commandOptions.argsDescription), 
          commandOptions.usage && command.usage(commandOptions.usage), Array.isArray(commandOptions.alias) ? command.aliases(commandOptions.alias) : command.alias(commandOptions.alias), 
          commandOptions.pkg ? command.pkg = commandOptions.pkg : command.pkg = "webpack-cli";
          const {forHelp} = this.program;
          let allDependenciesInstalled = !0;
          if (commandOptions.dependencies && commandOptions.dependencies.length > 0) for (const dependency of commandOptions.dependencies) {
            const isPkgExist = this.checkPackageExists(dependency);
            if (isPkgExist) continue;
            if (!isPkgExist && forHelp) {
              allDependenciesInstalled = !1;
              continue;
            }
            let skipInstallation = !1;
            dependency === WEBPACK_PACKAGE && fs.existsSync(WEBPACK_PACKAGE) && (skipInstallation = !0), 
            dependency === WEBPACK_DEV_SERVER_PACKAGE && fs.existsSync(WEBPACK_PACKAGE) && (skipInstallation = !0), 
            skipInstallation || await this.doInstall(dependency, {
              preMessage: () => {
                this.logger.error(`For using '${this.colors.green(commandOptions.name.split(" ")[0])}' command you need to install: '${this.colors.green(dependency)}' package.`);
              }
            });
          }
          return options && ("function" == typeof options && (forHelp && !allDependenciesInstalled && commandOptions.dependencies ? (command.description(`${commandOptions.description} To see all available options you need to install ${commandOptions.dependencies.map((dependency => `'${dependency}'`)).join(", ")}.`), 
          options = []) : options = await options()), options.forEach((optionForCommand => {
            this.makeOption(command, optionForCommand);
          }))), command.action(action), command;
        }
        makeOption(command, option) {
          let mainOption, negativeOption;
          if (option.configs) {
            let negatedDescription, needNegativeOption = !1;
            const mainOptionType = new Set;
            option.configs.forEach((config => {
              switch (config.type) {
               case "reset":
                mainOptionType.add(Boolean);
                break;

               case "boolean":
                needNegativeOption || (needNegativeOption = !0, negatedDescription = config.negatedDescription), 
                mainOptionType.add(Boolean);
                break;

               case "number":
                mainOptionType.add(Number);
                break;

               case "string":
               case "path":
               case "RegExp":
                mainOptionType.add(String);
                break;

               case "enum":
                {
                  let hasFalseEnum = !1;
                  const enumTypes = (config.values || []).map((value => {
                    switch (typeof value) {
                     case "string":
                      mainOptionType.add(String);
                      break;

                     case "number":
                      mainOptionType.add(Number);
                      break;

                     case "boolean":
                      if (!hasFalseEnum && !1 === value) {
                        hasFalseEnum = !0;
                        break;
                      }
                      mainOptionType.add(Boolean);
                    }
                  }));
                  return needNegativeOption || (needNegativeOption = hasFalseEnum, negatedDescription = config.negatedDescription), 
                  enumTypes;
                }
              }
            })), mainOption = {
              flags: option.alias ? `-${option.alias}, --${option.name}` : `--${option.name}`,
              description: option.description || "",
              type: mainOptionType,
              multiple: option.multiple,
              defaultValue: option.defaultValue
            }, needNegativeOption && (negativeOption = {
              flags: `--no-${option.name}`,
              description: negatedDescription || option.negatedDescription || `Negative '${option.name}' option.`
            });
          } else mainOption = {
            flags: option.alias ? `-${option.alias}, --${option.name}` : `--${option.name}`,
            description: option.description || option.describe || "",
            type: option.type ? new Set(Array.isArray(option.type) ? option.type : [ option.type ]) : new Set([ Boolean ]),
            multiple: option.multiple,
            defaultValue: option.defaultValue
          }, option.negative && (negativeOption = {
            flags: `--no-${option.name}`,
            description: option.negatedDescription ? option.negatedDescription : `Negative '${option.name}' option.`
          });
          if (mainOption.type.size > 1 && mainOption.type.has(Boolean) ? mainOption.flags = `${mainOption.flags} [value${mainOption.multiple ? "..." : ""}]` : mainOption.type.size > 0 && !mainOption.type.has(Boolean) && (mainOption.flags = `${mainOption.flags} <value${mainOption.multiple ? "..." : ""}>`), 
          1 === mainOption.type.size) if (mainOption.type.has(Number)) {
            let skipDefault = !0;
            const optionForCommand = new Option(mainOption.flags, mainOption.description).argParser(((value, prev = []) => (mainOption.defaultValue && mainOption.multiple && skipDefault && (prev = [], 
            skipDefault = !1), mainOption.multiple ? [].concat(prev).concat(Number(value)) : Number(value)))).default(mainOption.defaultValue);
            optionForCommand.helpLevel = option.helpLevel, command.addOption(optionForCommand);
          } else if (mainOption.type.has(String)) {
            let skipDefault = !0;
            const optionForCommand = new Option(mainOption.flags, mainOption.description).argParser(((value, prev = []) => (mainOption.defaultValue && mainOption.multiple && skipDefault && (prev = [], 
            skipDefault = !1), mainOption.multiple ? [].concat(prev).concat(value) : value))).default(mainOption.defaultValue);
            optionForCommand.helpLevel = option.helpLevel, command.addOption(optionForCommand);
          } else if (mainOption.type.has(Boolean)) {
            const optionForCommand = new Option(mainOption.flags, mainOption.description).default(mainOption.defaultValue);
            optionForCommand.helpLevel = option.helpLevel, command.addOption(optionForCommand);
          } else {
            const optionForCommand = new Option(mainOption.flags, mainOption.description).argParser(Array.from(mainOption.type)[0]).default(mainOption.defaultValue);
            optionForCommand.helpLevel = option.helpLevel, command.addOption(optionForCommand);
          } else if (mainOption.type.size > 1) {
            let skipDefault = !0;
            const optionForCommand = new Option(mainOption.flags, mainOption.description, mainOption.defaultValue).argParser(((value, prev = []) => {
              if (mainOption.defaultValue && mainOption.multiple && skipDefault && (prev = [], 
              skipDefault = !1), mainOption.type.has(Number)) {
                const numberValue = Number(value);
                if (!isNaN(numberValue)) return mainOption.multiple ? [].concat(prev).concat(numberValue) : numberValue;
              }
              return mainOption.type.has(String) && mainOption.multiple ? [].concat(prev).concat(value) : value;
            })).default(mainOption.defaultValue);
            optionForCommand.helpLevel = option.helpLevel, command.addOption(optionForCommand);
          } else if (0 === mainOption.type.size && negativeOption) {
            const optionForCommand = new Option(mainOption.flags, mainOption.description);
            optionForCommand.hideHelp(), optionForCommand.helpLevel = option.helpLevel, command.addOption(optionForCommand);
          }
          if (negativeOption) {
            const optionForCommand = new Option(negativeOption.flags, negativeOption.description);
            optionForCommand.helpLevel = option.helpLevel, command.addOption(optionForCommand);
          }
        }
        getBuiltInOptions() {
          if (this.builtInOptionsCache) return this.builtInOptionsCache;
          const minimumHelpFlags = [ "config", "config-name", "merge", "env", "mode", "watch", "watch-options-stdin", "stats", "devtool", "entry", "target", "progress", "json", "name", "output-path", "node-env" ], builtInFlags = [ {
            name: "config",
            alias: "c",
            configs: [ {
              type: "string"
            } ],
            multiple: !0,
            description: "Provide path to a webpack configuration file e.g. ./webpack.config.js."
          }, {
            name: "config-name",
            configs: [ {
              type: "string"
            } ],
            multiple: !0,
            description: "Name of the configuration to use."
          }, {
            name: "merge",
            alias: "m",
            configs: [ {
              type: "enum",
              values: [ !0 ]
            } ],
            description: "Merge two or more configurations using 'webpack-merge'."
          }, {
            name: "env",
            type: (value, previous = {}) => {
              const [allKeys, val] = value.split(/=(.+)/, 2), splitKeys = allKeys.split(/\.(?!$)/);
              let prevRef = previous;
              return splitKeys.forEach(((someKey, index) => {
                if (someKey.endsWith("=")) return someKey = someKey.slice(0, -1), void (prevRef[someKey] = void 0);
                prevRef[someKey] || (prevRef[someKey] = {}), "string" == typeof prevRef[someKey] && (prevRef[someKey] = {}), 
                index === splitKeys.length - 1 && (prevRef[someKey] = "string" != typeof val || val), 
                prevRef = prevRef[someKey];
              })), previous;
            },
            multiple: !0,
            description: "Environment passed to the configuration when it is a function."
          }, {
            name: "node-env",
            configs: [ {
              type: "string"
            } ],
            multiple: !1,
            description: "Sets process.env.NODE_ENV to the specified value."
          }, {
            name: "hot",
            alias: "h",
            configs: [ {
              type: "string"
            }, {
              type: "boolean"
            } ],
            negative: !0,
            description: "Enables Hot Module Replacement",
            negatedDescription: "Disables Hot Module Replacement."
          }, {
            name: "analyze",
            configs: [ {
              type: "enum",
              values: [ !0 ]
            } ],
            multiple: !1,
            description: "It invokes webpack-bundle-analyzer plugin to get bundle information."
          }, {
            name: "progress",
            configs: [ {
              type: "string"
            }, {
              type: "enum",
              values: [ !0 ]
            } ],
            description: "Print compilation progress during build."
          }, {
            name: "prefetch",
            configs: [ {
              type: "string"
            } ],
            description: "Prefetch this request."
          }, {
            name: "json",
            configs: [ {
              type: "string"
            }, {
              type: "enum",
              values: [ !0 ]
            } ],
            alias: "j",
            description: "Prints result as JSON or store it in a file."
          }, {
            name: "entry",
            configs: [ {
              type: "string"
            } ],
            multiple: !0,
            description: "The entry point(s) of your application e.g. ./src/main.js."
          }, {
            name: "output-path",
            alias: "o",
            configs: [ {
              type: "string"
            } ],
            description: "Output location of the file generated by webpack e.g. ./dist/."
          }, {
            name: "target",
            alias: "t",
            configs: [ {
              type: "string"
            } ],
            multiple: void 0 !== this.webpack.cli,
            description: "Sets the build target e.g. node."
          }, {
            name: "devtool",
            configs: [ {
              type: "string"
            }, {
              type: "enum",
              values: [ !1 ]
            } ],
            negative: !0,
            alias: "d",
            description: "Determine source maps to use.",
            negatedDescription: "Do not generate source maps."
          }, {
            name: "mode",
            configs: [ {
              type: "string"
            } ],
            description: "Defines the mode to pass to webpack."
          }, {
            name: "name",
            configs: [ {
              type: "string"
            } ],
            description: "Name of the configuration. Used when loading multiple configurations."
          }, {
            name: "stats",
            configs: [ {
              type: "string"
            }, {
              type: "boolean"
            } ],
            negative: !0,
            description: "It instructs webpack on how to treat the stats e.g. verbose.",
            negatedDescription: "Disable stats output."
          }, {
            name: "watch",
            configs: [ {
              type: "boolean"
            } ],
            negative: !0,
            alias: "w",
            description: "Watch for files changes.",
            negatedDescription: "Do not watch for file changes."
          }, {
            name: "watch-options-stdin",
            configs: [ {
              type: "boolean"
            } ],
            negative: !0,
            description: "Stop watching when stdin stream has ended.",
            negatedDescription: "Do not stop watching when stdin stream has ended."
          } ], coreFlags = this.webpack.cli ? Object.entries(this.webpack.cli.getArguments()).map((([flag, meta]) => {
            const inBuiltIn = builtInFlags.find((builtInFlag => builtInFlag.name === flag));
            return inBuiltIn ? Object.assign(Object.assign(Object.assign(Object.assign({}, meta), {
              name: flag,
              group: "core"
            }), inBuiltIn), {
              configs: meta.configs || []
            }) : Object.assign(Object.assign({}, meta), {
              name: flag,
              group: "core"
            });
          })) : [], options = [].concat(builtInFlags.filter((builtInFlag => !coreFlags.find((coreFlag => builtInFlag.name === coreFlag.name))))).concat(coreFlags).map((option => (option.helpLevel = minimumHelpFlags.includes(option.name) ? "minimum" : "verbose", 
          option)));
          return this.builtInOptionsCache = options, options;
        }
        async loadWebpack(handleError = !0) {
          return this.tryRequireThenImport(WEBPACK_PACKAGE, handleError);
        }
        async run(args, parseOptions) {
          const buildCommandOptions = {
            name: "build [entries...]",
            alias: [ "bundle", "b" ],
            description: "Run webpack (default command, can be omitted).",
            usage: "[entries...] [options]",
            dependencies: [ WEBPACK_PACKAGE ]
          }, watchCommandOptions = {
            name: "watch [entries...]",
            alias: "w",
            description: "Run webpack and watch for files changes.",
            usage: "[entries...] [options]",
            dependencies: [ WEBPACK_PACKAGE ]
          }, versionCommandOptions = {
            name: "version [commands...]",
            alias: "v",
            description: "Output the version number of 'webpack', 'webpack-cli' and 'webpack-dev-server' and commands."
          }, helpCommandOptions = {
            name: "help [command] [option]",
            alias: "h",
            description: "Display help for commands and options."
          }, externalBuiltInCommandsInfo = [ {
            name: "serve [entries...]",
            alias: [ "server", "s" ],
            pkg: "@webpack-cli/serve"
          }, {
            name: "info",
            alias: "i",
            pkg: "@webpack-cli/info"
          }, {
            name: "init",
            alias: [ "create", "new", "c", "n" ],
            pkg: "@webpack-cli/generators"
          }, {
            name: "loader",
            alias: "l",
            pkg: "@webpack-cli/generators"
          }, {
            name: "plugin",
            alias: "p",
            pkg: "@webpack-cli/generators"
          }, {
            name: "migrate",
            alias: "m",
            pkg: "@webpack-cli/migrate"
          }, {
            name: "configtest [config-path]",
            alias: "t",
            pkg: "@webpack-cli/configtest"
          } ], knownCommands = [ buildCommandOptions, watchCommandOptions, versionCommandOptions, helpCommandOptions, ...externalBuiltInCommandsInfo ], getCommandName = name => name.split(" ")[0], isCommand = (input, commandOptions) => input === getCommandName(commandOptions.name) || !!commandOptions.alias && (Array.isArray(commandOptions.alias) ? commandOptions.alias.includes(input) : commandOptions.alias === input), findCommandByName = name => this.program.commands.find((command => name === command.name() || command.aliases().includes(name))), isOption = value => value.startsWith("-"), loadCommandByName = async (commandName, allowToInstall = !1) => {
            const isBuildCommandUsed = isCommand(commandName, buildCommandOptions), isWatchCommandUsed = isCommand(commandName, watchCommandOptions);
            if (isBuildCommandUsed || isWatchCommandUsed) await this.makeCommand(isBuildCommandUsed ? buildCommandOptions : watchCommandOptions, (async () => (this.webpack = await this.loadWebpack(), 
            isWatchCommandUsed ? this.getBuiltInOptions().filter((option => "watch" !== option.name)) : this.getBuiltInOptions())), (async (entries, options) => {
              entries.length > 0 && (options.entry = [ ...entries, ...options.entry || [] ]), 
              await this.runWebpack(options, isWatchCommandUsed);
            })); else if (isCommand(commandName, helpCommandOptions)) this.makeCommand(helpCommandOptions, [], (() => {})); else if (isCommand(commandName, versionCommandOptions)) this.makeCommand(versionCommandOptions, [], (() => {})); else {
              const builtInExternalCommandInfo = externalBuiltInCommandsInfo.find((externalBuiltInCommandInfo => getCommandName(externalBuiltInCommandInfo.name) === commandName || (Array.isArray(externalBuiltInCommandInfo.alias) ? externalBuiltInCommandInfo.alias.includes(commandName) : externalBuiltInCommandInfo.alias === commandName)));
              let pkg, loadedCommand, command;
              if (builtInExternalCommandInfo ? ({pkg} = builtInExternalCommandInfo) : pkg = commandName, 
              "webpack-cli" !== pkg && !this.checkPackageExists(pkg)) {
                if (!allowToInstall) return;
                pkg = await this.doInstall(pkg, {
                  preMessage: () => {
                    this.logger.error(`For using this command you need to install: '${this.colors.green(pkg)}' package.`);
                  }
                });
              }
              try {
                loadedCommand = await this.tryRequireThenImport(pkg, !1);
              } catch (error) {
                return;
              }
              try {
                command = new loadedCommand, await command.apply(this);
              } catch (error) {
                this.logger.error(`Unable to load '${pkg}' command`), this.logger.error(error), 
                process.exit(2);
              }
            }
          };
          this.program.exitOverride((async error => {
            if (0 === error.exitCode && process.exit(0), "executeSubCommandAsync" === error.code && process.exit(2), 
            "commander.help" === error.code && process.exit(0), "commander.unknownOption" === error.code) {
              let name = error.message.match(/'(.+)'/);
              if (name) {
                name = name[1].slice(2), name.includes("=") && (name = name.split("=")[0]);
                const {operands} = this.program.parseOptions(this.program.args), operand = void 0 !== operands[0] ? operands[0] : getCommandName(buildCommandOptions.name);
                if (operand) {
                  const command = findCommandByName(operand);
                  command || (this.logger.error(`Can't find and load command '${operand}'`), this.logger.error("Run 'webpack --help' to see available commands and options"), 
                  process.exit(2));
                  const levenshtein = __webpack_require__(5538);
                  command.options.forEach((option => {
                    var _a;
                    !option.hidden && levenshtein.distance(name, null === (_a = option.long) || void 0 === _a ? void 0 : _a.slice(2)) < 3 && this.logger.error(`Did you mean '--${option.name()}'?`);
                  }));
                }
              }
            }
            this.logger.error("Run 'webpack --help' to see available commands and options"), 
            process.exit(2);
          }));
          const cli = this;
          this.program.option("--color", "Enable colors on console."), this.program.on("option:color", (function() {
            const {color} = this.opts();
            cli.isColorSupportChanged = color, cli.colors = cli.createColors(color);
          })), this.program.option("--no-color", "Disable colors on console."), this.program.on("option:no-color", (function() {
            const {color} = this.opts();
            cli.isColorSupportChanged = color, cli.colors = cli.createColors(color);
          }));
          const outputVersion = async options => {
            const possibleCommandNames = options.filter((option => !(isCommand(option, buildCommandOptions) || isCommand(option, watchCommandOptions) || isCommand(option, versionCommandOptions) || isCommand(option, helpCommandOptions))));
            if (possibleCommandNames.forEach((possibleCommandName => {
              isOption(possibleCommandName) && (this.logger.error(`Unknown option '${possibleCommandName}'`), 
              this.logger.error("Run 'webpack --help' to see available commands and options"), 
              process.exit(2));
            })), possibleCommandNames.length > 0) {
              await Promise.all(possibleCommandNames.map((possibleCommand => loadCommandByName(possibleCommand))));
              for (const possibleCommandName of possibleCommandNames) {
                const foundCommand = findCommandByName(possibleCommandName);
                foundCommand || (this.logger.error(`Unknown command '${possibleCommandName}'`), 
                this.logger.error("Run 'webpack --help' to see available commands and options"), 
                process.exit(2));
                try {
                  const {name, version} = this.loadJSONFile(`${foundCommand.pkg}/package.json`);
                  this.logger.raw(`${name} ${version}`);
                } catch (e) {
                  this.logger.error(`Error: External package '${foundCommand.pkg}' not found`), process.exit(2);
                }
              }
            }
            let webpack;
            try {
              webpack = await this.loadWebpack(!1);
            } catch (_error) {}
            this.logger.raw(`webpack: ${webpack ? webpack.version : "not installed"}`);
            const pkgVersion = __webpack_require__(8114).i8;
            let devServer;
            this.logger.raw(`webpack-cli: ${pkgVersion}`);
            try {
              devServer = this.loadJSONFile("webpack-dev-server/package.json", !1);
            } catch (_error) {}
            this.logger.raw(`webpack-dev-server ${devServer ? devServer.version : "not installed"}`), 
            process.exit(0);
          };
          this.program.option("-v, --version", "Output the version number of 'webpack', 'webpack-cli' and 'webpack-dev-server' and commands.");
          const outputHelp = async (options, isVerbose, isHelpCommandSyntax, program) => {
            const {bold} = this.colors, outputIncorrectUsageOfHelp = () => {
              this.logger.error("Incorrect use of help"), this.logger.error("Please use: 'webpack help [command] [option]' | 'webpack [command] --help'"), 
              this.logger.error("Run 'webpack --help' to see available commands and options"), 
              process.exit(2);
            }, isGlobalHelp = 0 === options.length, isCommandHelp = 1 === options.length && !isOption(options[0]);
            if (isGlobalHelp || isCommandHelp) if (program.configureHelp({
              sortSubcommands: !0,
              commandUsage: command => {
                let parentCmdNames = "";
                for (let parentCmd = command.parent; parentCmd; parentCmd = parentCmd.parent) parentCmdNames = `${parentCmd.name()} ${parentCmdNames}`;
                return isGlobalHelp ? `${parentCmdNames}${command.usage()}\n${bold("Alternative usage to run commands:")} ${parentCmdNames}[command] [options]` : `${parentCmdNames}${command.name()}|${command.aliases().join("|")} ${command.usage()}`;
              },
              subcommandTerm: command => {
                const args = command._args.map((arg => (argument => {
                  const nameOutput = argument.name + (!0 === argument.variadic ? "..." : "");
                  return argument.required ? "<" + nameOutput + ">" : "[" + nameOutput + "]";
                })(arg))).join(" ");
                return `${command.name()}|${command.aliases().join("|")}${args ? ` ${args}` : ""}${command.options.length > 0 ? " [options]" : ""}`;
              },
              visibleOptions: function(command) {
                return command.options.filter((option => !option.hidden && ("verbose" !== option.helpLevel || isVerbose)));
              },
              padWidth: (command, helper) => Math.max(helper.longestArgumentTermLength(command, helper), helper.longestOptionTermLength(command, helper), helper.longestOptionTermLength(program, helper), helper.longestSubcommandTermLength(isGlobalHelp ? program : command, helper)),
              formatHelp: (command, helper) => {
                const termWidth = helper.padWidth(command, helper), helpWidth = helper.helpWidth || process.env.WEBPACK_CLI_HELP_WIDTH || 80, formatItem = (term, description) => {
                  if (description) {
                    const fullText = `${term.padEnd(termWidth + 2)}${description}`;
                    return helper.wrap(fullText, helpWidth - 2, termWidth + 2);
                  }
                  return term;
                }, formatList = textArray => textArray.join("\n").replace(/^/gm, " ".repeat(2));
                let output = [ `${bold("Usage:")} ${helper.commandUsage(command)}`, "" ];
                const commandDescription = isGlobalHelp ? "The build tool for modern web applications." : helper.commandDescription(command);
                commandDescription.length > 0 && (output = output.concat([ commandDescription, "" ]));
                const argumentList = helper.visibleArguments(command).map((argument => formatItem(argument.term, argument.description)));
                argumentList.length > 0 && (output = output.concat([ bold("Arguments:"), formatList(argumentList), "" ]));
                const optionList = helper.visibleOptions(command).map((option => formatItem(helper.optionTerm(option), helper.optionDescription(option))));
                optionList.length > 0 && (output = output.concat([ bold("Options:"), formatList(optionList), "" ]));
                const globalOptionList = program.options.map((option => formatItem(helper.optionTerm(option), helper.optionDescription(option))));
                globalOptionList.length > 0 && (output = output.concat([ bold("Global options:"), formatList(globalOptionList), "" ]));
                const commandList = helper.visibleCommands(isGlobalHelp ? program : command).map((command => formatItem(helper.subcommandTerm(command), helper.subcommandDescription(command))));
                return commandList.length > 0 && (output = output.concat([ bold("Commands:"), formatList(commandList), "" ])), 
                output.join("\n");
              }
            }), isGlobalHelp) {
              await Promise.all(knownCommands.map((knownCommand => loadCommandByName(getCommandName(knownCommand.name)))));
              const buildCommand = findCommandByName(getCommandName(buildCommandOptions.name));
              buildCommand && this.logger.raw(buildCommand.helpInformation());
            } else {
              const name = options[0];
              await loadCommandByName(name);
              const command = findCommandByName(name);
              if (!command) {
                const builtInCommandUsed = externalBuiltInCommandsInfo.find((command => command.name.includes(name) || name === command.alias));
                void 0 !== builtInCommandUsed ? this.logger.error(`For using '${name}' command you need to install '${builtInCommandUsed.pkg}' package.`) : (this.logger.error(`Can't find and load command '${name}'`), 
                this.logger.error("Run 'webpack --help' to see available commands and options.")), 
                process.exit(2);
              }
              this.logger.raw(command.helpInformation());
            } else if (isHelpCommandSyntax) {
              let isCommandSpecified = !1, commandName = getCommandName(buildCommandOptions.name), optionName = "";
              1 === options.length ? optionName = options[0] : 2 === options.length ? (isCommandSpecified = !0, 
              commandName = options[0], optionName = options[1], isOption(commandName) && outputIncorrectUsageOfHelp()) : outputIncorrectUsageOfHelp(), 
              await loadCommandByName(commandName);
              const command = (value => "--color" === value || "--no-color" === value || "-v" === value || "--version" === value || "-h" === value || "--help" === value)(optionName) ? program : findCommandByName(commandName);
              command || (this.logger.error(`Can't find and load command '${commandName}'`), this.logger.error("Run 'webpack --help' to see available commands and options"), 
              process.exit(2));
              const option = command.options.find((option => option.short === optionName || option.long === optionName));
              option || (this.logger.error(`Unknown option '${optionName}'`), this.logger.error("Run 'webpack --help' to see available commands and options"), 
              process.exit(2));
              const nameOutput = option.flags.replace(/^.+[[<]/, "").replace(/(\.\.\.)?[\]>].*$/, "") + (!0 === option.variadic ? "..." : ""), value = option.required ? "<" + nameOutput + ">" : option.optional ? "[" + nameOutput + "]" : "";
              this.logger.raw(`${bold("Usage")}: webpack${isCommandSpecified ? ` ${commandName}` : ""} ${option.long}${value ? ` ${value}` : ""}`), 
              option.short && this.logger.raw(`${bold("Short:")} webpack${isCommandSpecified ? ` ${commandName}` : ""} ${option.short}${value ? ` ${value}` : ""}`), 
              option.description && this.logger.raw(`${bold("Description:")} ${option.description}`), 
              !option.negate && option.defaultValue && this.logger.raw(`${bold("Default value:")} ${JSON.stringify(option.defaultValue)}`);
              const flag = this.getBuiltInOptions().find((flag => option.long === `--${flag.name}`));
              if (flag && flag.configs) {
                const possibleValues = flag.configs.reduce(((accumulator, currentValue) => currentValue.values ? accumulator.concat(currentValue.values) : accumulator), []);
                possibleValues.length > 0 && this.logger.raw(`${bold("Possible values:")} ${JSON.stringify(possibleValues.join(" | "))}`);
              }
              this.logger.raw("");
            } else outputIncorrectUsageOfHelp();
            this.logger.raw("To see list of all supported commands and options run 'webpack --help=verbose'.\n"), 
            this.logger.raw(`${bold("Webpack documentation:")} https://webpack.js.org/.`), this.logger.raw(`${bold("CLI documentation:")} https://webpack.js.org/api/cli/.`), 
            this.logger.raw(`${bold("Made with ♥ by the webpack team")}.`), process.exit(0);
          };
          this.program.helpOption(!1), this.program.addHelpCommand(!1), this.program.option("-h, --help [verbose]", "Display help for commands and options.");
          let isInternalActionCalled = !1;
          this.program.usage("[options]"), this.program.allowUnknownOption(!0), this.program.action((async (options, program) => {
            isInternalActionCalled ? (this.logger.error("No commands found to run"), process.exit(2)) : isInternalActionCalled = !0;
            const {operands, unknown} = this.program.parseOptions(program.args), defaultCommandToRun = getCommandName(buildCommandOptions.name), hasOperand = void 0 !== operands[0], operand = hasOperand ? operands[0] : defaultCommandToRun, isHelpOption = void 0 !== options.help, isHelpCommandSyntax = isCommand(operand, helpCommandOptions);
            if (isHelpOption || isHelpCommandSyntax) {
              let isVerbose = !1;
              isHelpOption && "string" == typeof options.help && ("verbose" !== options.help && (this.logger.error("Unknown value for '--help' option, please use '--help=verbose'"), 
              process.exit(2)), isVerbose = !0), this.program.forHelp = !0;
              const optionsForHelp = [].concat(isHelpOption && hasOperand ? [ operand ] : []).concat(operands.slice(1)).concat(unknown).concat(isHelpCommandSyntax && void 0 !== options.color ? [ options.color ? "--color" : "--no-color" ] : []).concat(isHelpCommandSyntax && void 0 !== options.version ? [ "--version" ] : []);
              await outputHelp(optionsForHelp, isVerbose, isHelpCommandSyntax, program);
            }
            const isVersionOption = void 0 !== options.version, isVersionCommandSyntax = isCommand(operand, versionCommandOptions);
            if (isVersionOption || isVersionCommandSyntax) {
              const optionsForVersion = [].concat(isVersionOption ? [ operand ] : []).concat(operands.slice(1)).concat(unknown);
              await outputVersion(optionsForVersion);
            }
            let commandToRun = operand, commandOperands = operands.slice(1);
            if (name = commandToRun, knownCommands.find((command => getCommandName(command.name) === name || (Array.isArray(command.alias) ? command.alias.includes(name) : command.alias === name)))) await loadCommandByName(commandToRun, !0); else {
              if (fs.existsSync(operand)) commandToRun = defaultCommandToRun, commandOperands = operands, 
              await loadCommandByName(commandToRun); else {
                this.logger.error(`Unknown command or entry '${operand}'`);
                const levenshtein = __webpack_require__(5538), found = knownCommands.find((commandOptions => levenshtein.distance(operand, getCommandName(commandOptions.name)) < 3));
                found && this.logger.error(`Did you mean '${getCommandName(found.name)}' (alias '${Array.isArray(found.alias) ? found.alias.join(", ") : found.alias}')?`), 
                this.logger.error("Run 'webpack --help' to see available commands and options"), 
                process.exit(2);
              }
            }
            var name;
            await this.program.parseAsync([ commandToRun, ...commandOperands, ...unknown ], {
              from: "user"
            });
          })), await this.program.parseAsync(args, parseOptions);
        }
        async loadConfig(options) {
          const interpret = __webpack_require__(4366), loadConfigByPath = async (configPath, argv = {}) => {
            const ext = path.extname(configPath);
            if (Object.keys(interpret.jsVariants).find((variant => variant === ext))) {
              const rechoir = __webpack_require__(3752);
              try {
                rechoir.prepare(interpret.extensions, configPath);
              } catch (error) {
                (null == error ? void 0 : error.failures) && (this.logger.error(`Unable load '${configPath}'`), 
                this.logger.error(error.message), error.failures.forEach((failure => {
                  this.logger.error(failure.error.message);
                })), this.logger.error("Please install one of them"), process.exit(2)), this.logger.error(error), 
                process.exit(2);
              }
            }
            let options;
            try {
              options = await this.tryRequireThenImport(configPath, !1);
            } catch (error) {
              this.logger.error(`Failed to load '${configPath}' config`), this.isValidationError(error) ? this.logger.error(error.message) : this.logger.error(error), 
              process.exit(2);
            }
            if (Array.isArray(options)) {
              const optionsArray = options;
              await Promise.all(optionsArray.map((async (_, i) => {
                this.isPromise(optionsArray[i]) && (optionsArray[i] = await optionsArray[i]), this.isFunction(optionsArray[i]) && (optionsArray[i] = await optionsArray[i](argv.env, argv));
              }))), options = optionsArray;
            } else this.isPromise(options) && (options = await options), this.isFunction(options) && (options = await options(argv.env, argv));
            var value;
            return "object" == typeof (value = options) && null !== value || Array.isArray(options) || (this.logger.error(`Invalid configuration in '${configPath}'`), 
            process.exit(2)), {
              options,
              path: configPath
            };
          }, config = {
            options: {},
            path: new WeakMap
          };
          if (options.config && options.config.length > 0) {
            const loadedConfigs = await Promise.all(options.config.map((configPath => loadConfigByPath(path.resolve(configPath), options.argv))));
            config.options = [], loadedConfigs.forEach((loadedConfig => {
              const isArray = Array.isArray(loadedConfig.options);
              0 === config.options.length ? config.options = loadedConfig.options : (Array.isArray(config.options) || (config.options = [ config.options ]), 
              isArray ? loadedConfig.options.forEach((item => {
                config.options.push(item);
              })) : config.options.push(loadedConfig.options)), isArray ? loadedConfig.options.forEach((options => {
                config.path.set(options, loadedConfig.path);
              })) : config.path.set(loadedConfig.options, loadedConfig.path);
            })), config.options = 1 === config.options.length ? config.options[0] : config.options;
          } else {
            const defaultConfigFiles = [ "webpack.config", ".webpack/webpack.config", ".webpack/webpackfile" ].map((filename => [ ...Object.keys(interpret.extensions), ".cjs" ].map((ext => ({
              path: path.resolve(filename + ext),
              ext,
              module: interpret.extensions[ext]
            }))))).reduce(((accumulator, currentValue) => accumulator.concat(currentValue)), []);
            let foundDefaultConfigFile;
            for (const defaultConfigFile of defaultConfigFiles) if (fs.existsSync(defaultConfigFile.path)) {
              foundDefaultConfigFile = defaultConfigFile;
              break;
            }
            if (foundDefaultConfigFile) {
              const loadedConfig = await loadConfigByPath(foundDefaultConfigFile.path, options.argv);
              config.options = loadedConfig.options, Array.isArray(config.options) ? config.options.forEach((item => {
                config.path.set(item, loadedConfig.path);
              })) : config.path.set(loadedConfig.options, loadedConfig.path);
            }
          }
          if (options.configName) {
            const notFoundConfigNames = [];
            config.options = options.configName.map((configName => {
              let found;
              return found = Array.isArray(config.options) ? config.options.find((options => options.name === configName)) : config.options.name === configName ? config.options : void 0, 
              found || notFoundConfigNames.push(configName), found;
            })), notFoundConfigNames.length > 0 && (this.logger.error(notFoundConfigNames.map((configName => `Configuration with the name "${configName}" was not found.`)).join(" ")), 
            process.exit(2));
          }
          if (options.merge) {
            const merge = __webpack_require__(4561);
            (!Array.isArray(config.options) || config.options.length <= 1) && (this.logger.error("At least two configurations are required for merge."), 
            process.exit(2));
            const mergedConfigPaths = [];
            config.options = config.options.reduce(((accumulator, options) => {
              const configPath = config.path.get(options), mergedOptions = merge(accumulator, options);
              return mergedConfigPaths.push(configPath), mergedOptions;
            }), {}), config.path.set(config.options, mergedConfigPaths);
          }
          return config;
        }
        async buildConfig(config, options) {
          options.analyze && (this.checkPackageExists("webpack-bundle-analyzer") || (await this.doInstall("webpack-bundle-analyzer", {
            preMessage: () => {
              this.logger.error(`It looks like ${this.colors.yellow("webpack-bundle-analyzer")} is not installed.`);
            }
          }), this.logger.success(`${this.colors.yellow("webpack-bundle-analyzer")} was installed successfully.`))), 
          "string" == typeof options.progress && "profile" !== options.progress && (this.logger.error(`'${options.progress}' is an invalid value for the --progress option. Only 'profile' is allowed.`), 
          process.exit(2)), "string" == typeof options.hot && "only" !== options.hot && (this.logger.error(`'${options.hot}' is an invalid value for the --hot option. Use 'only' instead.`), 
          process.exit(2));
          const CLIPlugin = __webpack_require__(7911);
          return ((options, fn) => {
            if (Array.isArray(options)) for (let item of options) item = fn(item); else options = fn(options);
          })(config.options, (item => {
            if (item.watch && options.argv && options.argv.env && (options.argv.env.WEBPACK_WATCH || options.argv.env.WEBPACK_SERVE) && (this.logger.warn(`No need to use the '${options.argv.env.WEBPACK_WATCH ? "watch" : "serve"}' command together with '{ watch: true }' configuration, it does not make sense.`), 
            options.argv.env.WEBPACK_SERVE && (item.watch = !1)), this.webpack.cli) {
              const args = this.getBuiltInOptions().filter((flag => "core" === flag.group)).reduce(((accumulator, flag) => (accumulator[flag.name] = flag, 
              accumulator)), {}), values = Object.keys(options).reduce(((accumulator, name) => {
                if ("argv" === name) return accumulator;
                const kebabName = this.toKebabCase(name);
                return args[kebabName] && (accumulator[kebabName] = options[name]), accumulator;
              }), {}), problems = this.webpack.cli.processArguments(args, item, values);
              if (problems) {
                const problemsByPath = ((xs, key) => xs.reduce(((rv, x) => ((rv[x[key]] = rv[x[key]] || []).push(x), 
                rv)), {}))(problems, "path");
                for (const path in problemsByPath) {
                  problemsByPath[path].forEach((problem => {
                    this.logger.error(`${this.capitalizeFirstLetter(problem.type.replace(/-/g, " "))}${problem.value ? ` '${problem.value}'` : ""} for the '--${problem.argument}' option${problem.index ? ` by index '${problem.index}'` : ""}`), 
                    problem.expected && this.logger.error(`Expected: '${problem.expected}'`);
                  }));
                }
                process.exit(2);
              }
              const isFileSystemCacheOptions = config => Boolean(config.cache) && "filesystem" === config.cache.type;
              if (isFileSystemCacheOptions(item)) {
                const configPath = config.path.get(item);
                configPath && (item.cache.buildDependencies || (item.cache.buildDependencies = {}), 
                item.cache.buildDependencies.defaultConfig || (item.cache.buildDependencies.defaultConfig = []), 
                Array.isArray(configPath) ? configPath.forEach((oneOfConfigPath => {
                  item.cache.buildDependencies.defaultConfig.push(oneOfConfigPath);
                })) : item.cache.buildDependencies.defaultConfig.push(configPath));
              }
            }
            options.entry && (item.entry = options.entry), options.outputPath && (item.output = Object.assign(Object.assign({}, item.output), {
              path: path.resolve(options.outputPath)
            })), options.target && (item.target = options.target), void 0 !== options.devtool && (item.devtool = options.devtool), 
            options.name && (item.name = options.name), void 0 !== options.stats && (item.stats = options.stats), 
            void 0 !== options.watch && (item.watch = options.watch), void 0 !== options.watchOptionsStdin && (item.watchOptions = Object.assign(Object.assign({}, item.watchOptions), {
              stdin: options.watchOptionsStdin
            })), options.mode && (item.mode = options.mode), item.mode || !process.env || !process.env.NODE_ENV || "development" !== process.env.NODE_ENV && "production" !== process.env.NODE_ENV && "none" !== process.env.NODE_ENV || (item.mode = process.env.NODE_ENV);
            let colors;
            return this.webpack.Stats && this.webpack.Stats.presetToOptions ? void 0 === item.stats ? item.stats = {} : "boolean" == typeof item.stats ? item.stats = this.webpack.Stats.presetToOptions(item.stats) : "string" != typeof item.stats || "none" !== item.stats && "verbose" !== item.stats && "detailed" !== item.stats && "normal" !== item.stats && "minimal" !== item.stats && "errors-only" !== item.stats && "errors-warnings" !== item.stats || (item.stats = this.webpack.Stats.presetToOptions(item.stats)) : void 0 === item.stats ? item.stats = {
              preset: "normal"
            } : "boolean" == typeof item.stats ? item.stats = item.stats ? {
              preset: "normal"
            } : {
              preset: "none"
            } : "string" == typeof item.stats && (item.stats = {
              preset: item.stats
            }), colors = void 0 !== this.isColorSupportChanged ? Boolean(this.isColorSupportChanged) : void 0 !== item.stats.colors ? item.stats.colors : Boolean(this.colors.isColorSupported), 
            "object" == typeof item.stats && null !== item.stats && (item.stats.colors = colors), 
            item.plugins || (item.plugins = []), item.plugins.unshift(new CLIPlugin({
              configPath: config.path.get(item),
              helpfulOutput: !options.json,
              hot: options.hot,
              progress: options.progress,
              prefetch: options.prefetch,
              analyze: options.analyze
            })), options;
          })), config;
        }
        isValidationError(error) {
          return error instanceof (this.webpack.ValidationError || this.webpack.WebpackOptionsValidationError) || "ValidationError" === error.name;
        }
        async createCompiler(options, callback) {
          "string" == typeof options.nodeEnv && (process.env.NODE_ENV = options.nodeEnv);
          let compiler, config = await this.loadConfig(options);
          config = await this.buildConfig(config, options);
          try {
            compiler = this.webpack(config.options, callback ? (error, stats) => {
              error && this.isValidationError(error) && (this.logger.error(error.message), process.exit(2)), 
              callback(error, stats);
            } : callback);
          } catch (error) {
            this.isValidationError(error) ? this.logger.error(error.message) : this.logger.error(error), 
            process.exit(2);
          }
          return compiler && compiler.compiler && (compiler = compiler.compiler), compiler;
        }
        needWatchStdin(compiler) {
          return this.isMultipleCompiler(compiler) ? Boolean(compiler.compilers.some((compiler => compiler.options.watchOptions && compiler.options.watchOptions.stdin))) : Boolean(compiler.options.watchOptions && compiler.options.watchOptions.stdin);
        }
        async runWebpack(options, isWatchCommand) {
          let compiler, createJsonStringifyStream;
          if (options.json) {
            const jsonExt = __webpack_require__(1365);
            createJsonStringifyStream = jsonExt.stringifyStream;
          }
          const env = isWatchCommand || options.watch ? Object.assign({
            WEBPACK_WATCH: !0
          }, options.env) : Object.assign({
            WEBPACK_BUNDLE: !0,
            WEBPACK_BUILD: !0
          }, options.env);
          if (options.argv = Object.assign(Object.assign({}, options), {
            env
          }), isWatchCommand && (options.watch = !0), compiler = await this.createCompiler(options, ((error, stats) => {
            if (error && (this.logger.error(error), process.exit(2)), stats && stats.hasErrors() && (process.exitCode = 1), 
            !compiler || !stats) return;
            const statsOptions = this.isMultipleCompiler(compiler) ? {
              children: compiler.compilers.map((compiler => compiler.options ? compiler.options.stats : void 0))
            } : compiler.options ? compiler.options.stats : void 0, statsForWebpack4 = this.webpack.Stats && this.webpack.Stats.presetToOptions;
            if (this.isMultipleCompiler(compiler) && statsForWebpack4 && (statsOptions.colors = statsOptions.children.some((child => child.colors))), 
            options.json && createJsonStringifyStream) {
              const handleWriteError = error => {
                this.logger.error(error), process.exit(2);
              };
              !0 === options.json ? createJsonStringifyStream(stats.toJson(statsOptions)).on("error", handleWriteError).pipe(process.stdout).on("error", handleWriteError).on("close", (() => process.stdout.write("\n"))) : createJsonStringifyStream(stats.toJson(statsOptions)).on("error", handleWriteError).pipe(fs.createWriteStream(options.json)).on("error", handleWriteError).on("close", (() => {
                process.stderr.write(`[webpack-cli] ${this.colors.green(`stats are successfully stored as json to ${options.json}`)}\n`);
              }));
            } else {
              const printedStats = stats.toString(statsOptions);
              printedStats && this.logger.raw(printedStats);
            }
          })), !compiler) return;
          (compiler => Boolean(this.isMultipleCompiler(compiler) ? compiler.compilers.some((compiler => compiler.options.watch)) : compiler.options.watch))(compiler) && this.needWatchStdin(compiler) && (process.stdin.on("end", (() => {
            process.exit(0);
          })), process.stdin.resume());
        }
      };
    },
    3063: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const WEBPACK_PACKAGE = process.env.WEBPACK_PACKAGE || "webpack", WEBPACK_DEV_SERVER_PACKAGE = process.env.WEBPACK_DEV_SERVER_PACKAGE || "webpack-dev-server";
      exports.default = class {
        async apply(cli) {
          const loadDevServerOptions = () => {
            const devServer = __webpack_require__(5965)(WEBPACK_DEV_SERVER_PACKAGE), isNewDevServerCLIAPI = void 0 !== devServer.schema;
            let options = {};
            return options = isNewDevServerCLIAPI ? cli.webpack.cli && "function" == typeof cli.webpack.cli.getArguments ? cli.webpack.cli.getArguments(devServer.schema) : devServer.cli.getArguments() : __webpack_require__(5965)(`${WEBPACK_DEV_SERVER_PACKAGE}/bin/cli-flags`), 
            options.devServer ? options.devServer : Object.keys(options).map((key => (options[key].name = key, 
            options[key])));
          };
          await cli.makeCommand({
            name: "serve [entries...]",
            alias: [ "server", "s" ],
            description: "Run the webpack dev server.",
            usage: "[entries...] [options]",
            pkg: "@webpack-cli/serve",
            dependencies: [ WEBPACK_PACKAGE, WEBPACK_DEV_SERVER_PACKAGE ]
          }, (async () => {
            let devServerFlags = [];
            cli.webpack = await cli.loadWebpack();
            try {
              devServerFlags = loadDevServerOptions();
            } catch (error) {
              cli.logger.error(`You need to install 'webpack-dev-server' for running 'webpack serve'.\n${error}`), 
              process.exit(2);
            }
            return [ ...cli.getBuiltInOptions().filter((option => "watch" !== option.name)), ...devServerFlags ];
          }), (async (entries, options) => {
            const builtInOptions = cli.getBuiltInOptions();
            let devServerFlags = [];
            try {
              devServerFlags = loadDevServerOptions();
            } catch (error) {}
            const webpackCLIOptions = {}, devServerCLIOptions = {}, processors = [];
            for (const optionName in options) {
              const kebabedOption = cli.toKebabCase(optionName);
              if ("hot" !== kebabedOption && builtInOptions.find((builtInOption => builtInOption.name === kebabedOption))) webpackCLIOptions[optionName] = options[optionName]; else {
                const needToProcess = devServerFlags.find((devServerOption => devServerOption.name === kebabedOption && devServerOption.processor));
                needToProcess && processors.push(needToProcess.processor), devServerCLIOptions[optionName] = options[optionName];
              }
            }
            for (const processor of processors) processor(devServerCLIOptions);
            entries.length > 0 && (webpackCLIOptions.entry = [ ...entries, ...webpackCLIOptions.entry || [] ]), 
            webpackCLIOptions.argv = Object.assign(Object.assign({}, options), {
              env: Object.assign({
                WEBPACK_SERVE: !0
              }, options.env)
            });
            const compiler = await cli.createCompiler(webpackCLIOptions);
            if (!compiler) return;
            const servers = [];
            (cli.needWatchStdin(compiler) || devServerCLIOptions.stdin) && (devServerCLIOptions.stdin && delete devServerCLIOptions.stdin, 
            process.stdin.on("end", (() => {
              Promise.all(servers.map((server => "function" == typeof server.stop ? server.stop() : new Promise((resolve => {
                server.close((() => {
                  resolve();
                }));
              }))))).then((() => {
                process.exit(0);
              }));
            })), process.stdin.resume());
            const DevServer = __webpack_require__(5965)(WEBPACK_DEV_SERVER_PACKAGE), isNewDevServerCLIAPI = void 0 !== DevServer.schema;
            let devServerVersion;
            try {
              devServerVersion = __webpack_require__(5965)(`${WEBPACK_DEV_SERVER_PACKAGE}/package.json`).version;
            } catch (err) {
              cli.logger.error(`You need to install 'webpack-dev-server' for running 'webpack serve'.\n${err}`), 
              process.exit(2);
            }
            const compilers = cli.isMultipleCompiler(compiler) ? compiler.compilers : [ compiler ], possibleCompilers = compilers.filter((compiler => compiler.options.devServer)), compilersForDevServer = possibleCompilers.length > 0 ? possibleCompilers : [ compilers[0] ], isDevServer4 = devServerVersion.startsWith("4"), usedPorts = [];
            for (const compilerForDevServer of compilersForDevServer) {
              let devServerOptions;
              if (isNewDevServerCLIAPI) {
                const args = devServerFlags.reduce(((accumulator, flag) => (accumulator[flag.name] = flag, 
                accumulator)), {}), values = Object.keys(devServerCLIOptions).reduce(((accumulator, name) => {
                  const kebabName = cli.toKebabCase(name);
                  return args[kebabName] && (accumulator[kebabName] = options[name]), accumulator;
                }), {}), result = Object.assign({}, compilerForDevServer.options.devServer || {}), problems = (cli.webpack.cli && "function" == typeof cli.webpack.cli.processArguments ? cli.webpack.cli : DevServer.cli).processArguments(args, result, values);
                if (problems) {
                  const problemsByPath = ((xs, key) => xs.reduce(((rv, x) => ((rv[x[key]] = rv[x[key]] || []).push(x), 
                  rv)), {}))(problems, "path");
                  for (const path in problemsByPath) {
                    problemsByPath[path].forEach((problem => {
                      cli.logger.error(`${cli.capitalizeFirstLetter(problem.type.replace(/-/g, " "))}${problem.value ? ` '${problem.value}'` : ""} for the '--${problem.argument}' option${problem.index ? ` by index '${problem.index}'` : ""}`), 
                      problem.expected && cli.logger.error(`Expected: '${problem.expected}'`);
                    }));
                  }
                  process.exit(2);
                }
                devServerOptions = result;
              } else {
                const mergeOptions = (devServerOptions, devServerCliOptions) => {
                  const options = Object.assign(Object.assign({}, devServerOptions), devServerCliOptions);
                  return devServerOptions.client && devServerCliOptions.client && "object" == typeof devServerOptions.client && "object" == typeof devServerCliOptions.client && (options.client = Object.assign(Object.assign({}, devServerOptions.client), devServerCliOptions.client)), 
                  options;
                };
                devServerOptions = mergeOptions(compilerForDevServer.options.devServer || {}, devServerCLIOptions);
              }
              if (!isDevServer4) {
                const getPublicPathOption = () => {
                  const normalizePublicPath = publicPath => void 0 === publicPath || "auto" === publicPath ? "/" : publicPath;
                  return options.outputPublicPath ? normalizePublicPath(compilerForDevServer.options.output.publicPath) : devServerOptions.publicPath ? normalizePublicPath(devServerOptions.publicPath) : normalizePublicPath(compilerForDevServer.options.output.publicPath);
                }, getStatsOption = () => options.stats ? options.stats : devServerOptions.stats ? devServerOptions.stats : compilerForDevServer.options.stats;
                devServerOptions.host = devServerOptions.host || "localhost", devServerOptions.port = void 0 !== devServerOptions.port ? devServerOptions.port : 8080, 
                devServerOptions.stats = getStatsOption(), devServerOptions.publicPath = getPublicPathOption();
              }
              if (devServerOptions.port) {
                const portNumber = Number(devServerOptions.port);
                if (usedPorts.find((port => portNumber === port))) throw new Error("Unique ports must be specified for each devServer option in your webpack configuration. Alternatively, run only 1 devServer config using the --config-name flag to specify your desired config.");
                usedPorts.push(portNumber);
              }
              try {
                let server;
                server = isDevServer4 ? new DevServer(devServerOptions, compiler) : new DevServer(compiler, devServerOptions), 
                "function" == typeof server.start ? await server.start() : server.listen(devServerOptions.port, devServerOptions.host, (error => {
                  if (error) throw error;
                })), servers.push(server);
              } catch (error) {
                cli.isValidationError(error) ? cli.logger.error(error.message) : cli.logger.error(error), 
                process.exit(2);
              }
            }
          }));
        }
      };
    },
    7911: (module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.CLIPlugin = void 0;
      class CLIPlugin {
        constructor(options) {
          this.options = options;
        }
        setupHotPlugin(compiler) {
          const {HotModuleReplacementPlugin} = compiler.webpack || __webpack_require__(2750);
          Boolean(compiler.options.plugins.find((plugin => plugin instanceof HotModuleReplacementPlugin))) || (new HotModuleReplacementPlugin).apply(compiler);
        }
        setupPrefetchPlugin(compiler) {
          const {PrefetchPlugin} = compiler.webpack || __webpack_require__(2750);
          new PrefetchPlugin(null, this.options.prefetch).apply(compiler);
        }
        async setupBundleAnalyzerPlugin(compiler) {
          const {BundleAnalyzerPlugin} = __webpack_require__(9260);
          Boolean(compiler.options.plugins.find((plugin => plugin instanceof BundleAnalyzerPlugin))) || (new BundleAnalyzerPlugin).apply(compiler);
        }
        setupProgressPlugin(compiler) {
          const {ProgressPlugin} = compiler.webpack || __webpack_require__(2750);
          Boolean(compiler.options.plugins.find((plugin => plugin instanceof ProgressPlugin))) || new ProgressPlugin({
            profile: "profile" === this.options.progress
          }).apply(compiler);
        }
        setupHelpfulOutput(compiler) {
          const getCompilationName = () => compiler.name ? `'${compiler.name}'` : "", logCompilation = message => {
            process.env.WEBPACK_CLI_START_FINISH_FORCE_LOG ? process.stderr.write(message) : this.logger.log(message);
          }, {configPath} = this.options;
          compiler.hooks.run.tap("webpack-cli", (() => {
            const name = getCompilationName();
            logCompilation(`Compiler${name ? ` ${name}` : ""} starting... `), configPath && this.logger.log(`Compiler${name ? ` ${name}` : ""} is using config: '${configPath}'`);
          })), compiler.hooks.watchRun.tap("webpack-cli", (compiler => {
            const {bail, watch} = compiler.options;
            bail && watch && this.logger.warn('You are using "bail" with "watch". "bail" will still exit webpack when the first error is found.');
            const name = getCompilationName();
            logCompilation(`Compiler${name ? ` ${name}` : ""} starting... `), configPath && this.logger.log(`Compiler${name ? ` ${name}` : ""} is using config: '${configPath}'`);
          })), compiler.hooks.invalid.tap("webpack-cli", ((filename, changeTime) => {
            const date = new Date(changeTime);
            this.logger.log(`File '${filename}' was modified`), this.logger.log(`Changed time is ${date} (timestamp is ${changeTime})`);
          })), (compiler.webpack ? compiler.hooks.afterDone : compiler.hooks.done).tap("webpack-cli", (() => {
            const name = getCompilationName();
            logCompilation(`Compiler${name ? ` ${name}` : ""} finished`), process.nextTick((() => {
              compiler.watchMode && this.logger.log(`Compiler${name ? `${name}` : ""} is watching files for updates...`);
            }));
          }));
        }
        apply(compiler) {
          this.logger = compiler.getInfrastructureLogger("webpack-cli"), this.options.progress && this.setupProgressPlugin(compiler), 
          this.options.hot && this.setupHotPlugin(compiler), this.options.prefetch && this.setupPrefetchPlugin(compiler), 
          this.options.analyze && this.setupBundleAnalyzerPlugin(compiler), this.setupHelpfulOutput(compiler);
        }
      }
      exports.CLIPlugin = CLIPlugin, module.exports = CLIPlugin;
    },
    2871: (module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), module.exports = function() {
        let importESM;
        try {
          importESM = new Function("id", "return import(id);");
        } catch (e) {
          importESM = null;
        }
        return importESM;
      };
    },
    4561: function(__unused_webpack_module, exports, __webpack_require__) {
      "use strict";
      var __assign = this && this.__assign || function() {
        return __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) for (var p in s = arguments[i]) Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
          return t;
        }, __assign.apply(this, arguments);
      }, __read = this && this.__read || function(o, n) {
        var m = "function" == typeof Symbol && o[Symbol.iterator];
        if (!m) return o;
        var r, e, i = m.call(o), ar = [];
        try {
          for (;(void 0 === n || n-- > 0) && !(r = i.next()).done; ) ar.push(r.value);
        } catch (error) {
          e = {
            error
          };
        } finally {
          try {
            r && !r.done && (m = i.return) && m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      }, __spreadArray = this && this.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];
        return to;
      }, __importDefault = this && this.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : {
          default: mod
        };
      };
      exports.__esModule = !0, exports.unique = exports.mergeWithRules = exports.mergeWithCustomize = exports.default = exports.merge = exports.CustomizeRule = exports.customizeObject = exports.customizeArray = void 0;
      var wildcard_1 = __importDefault(__webpack_require__(1196)), merge_with_1 = __importDefault(__webpack_require__(703)), join_arrays_1 = __importDefault(__webpack_require__(8145)), unique_1 = __importDefault(__webpack_require__(9937));
      exports.unique = unique_1.default;
      var types_1 = __webpack_require__(4302);
      exports.CustomizeRule = types_1.CustomizeRule;
      var utils_1 = __webpack_require__(6736);
      function merge(firstConfiguration) {
        for (var configurations = [], _i = 1; _i < arguments.length; _i++) configurations[_i - 1] = arguments[_i];
        return mergeWithCustomize({}).apply(void 0, __spreadArray([ firstConfiguration ], __read(configurations)));
      }
      function mergeWithCustomize(options) {
        return function(firstConfiguration) {
          for (var configurations = [], _i = 1; _i < arguments.length; _i++) configurations[_i - 1] = arguments[_i];
          if (utils_1.isUndefined(firstConfiguration) || configurations.some(utils_1.isUndefined)) throw new TypeError("Merging undefined is not supported");
          if (firstConfiguration.then) throw new TypeError("Promises are not supported");
          if (!firstConfiguration) return {};
          if (0 === configurations.length) {
            if (Array.isArray(firstConfiguration)) {
              if (0 === firstConfiguration.length) return {};
              if (firstConfiguration.some(utils_1.isUndefined)) throw new TypeError("Merging undefined is not supported");
              if (firstConfiguration[0].then) throw new TypeError("Promises are not supported");
              return merge_with_1.default(firstConfiguration, join_arrays_1.default(options));
            }
            return firstConfiguration;
          }
          return merge_with_1.default([ firstConfiguration ].concat(configurations), join_arrays_1.default(options));
        };
      }
      exports.merge = merge, exports.default = merge, exports.mergeWithCustomize = mergeWithCustomize, 
      exports.customizeArray = function(rules) {
        return function(a, b, key) {
          var matchedRule = Object.keys(rules).find((function(rule) {
            return wildcard_1.default(rule, key);
          })) || "";
          if (matchedRule) switch (rules[matchedRule]) {
           case types_1.CustomizeRule.Prepend:
            return __spreadArray(__spreadArray([], __read(b)), __read(a));

           case types_1.CustomizeRule.Replace:
            return b;

           case types_1.CustomizeRule.Append:
           default:
            return __spreadArray(__spreadArray([], __read(a)), __read(b));
          }
        };
      }, exports.mergeWithRules = function(rules) {
        return mergeWithCustomize({
          customizeArray: function(a, b, key) {
            var currentRule = rules;
            return key.split(".").forEach((function(k) {
              currentRule && (currentRule = currentRule[k]);
            })), utils_1.isPlainObject(currentRule) ? mergeWithRule({
              currentRule,
              a,
              b
            }) : "string" == typeof currentRule ? function(_a) {
              var currentRule = _a.currentRule, a = _a.a, b = _a.b;
              switch (currentRule) {
               case types_1.CustomizeRule.Append:
                return a.concat(b);

               case types_1.CustomizeRule.Prepend:
                return b.concat(a);

               case types_1.CustomizeRule.Replace:
                return b;
              }
              return a;
            }({
              currentRule,
              a,
              b
            }) : void 0;
          }
        });
      };
      var isArray = Array.isArray;
      function mergeWithRule(_a) {
        var currentRule = _a.currentRule, a = _a.a, b = _a.b;
        if (!isArray(a)) return a;
        var bAllMatches = [], ret = a.map((function(ao) {
          if (!utils_1.isPlainObject(currentRule)) return ao;
          var ret = {}, rulesToMatch = [], operations = {};
          Object.entries(currentRule).forEach((function(_a) {
            var _b = __read(_a, 2), k = _b[0], v = _b[1];
            v === types_1.CustomizeRule.Match ? rulesToMatch.push(k) : operations[k] = v;
          }));
          var bMatches = b.filter((function(o) {
            var matches = rulesToMatch.every((function(rule) {
              var _a, _b;
              return (null === (_a = ao[rule]) || void 0 === _a ? void 0 : _a.toString()) === (null === (_b = o[rule]) || void 0 === _b ? void 0 : _b.toString());
            }));
            return matches && bAllMatches.push(o), matches;
          }));
          return utils_1.isPlainObject(ao) ? (Object.entries(ao).forEach((function(_a) {
            var _b = __read(_a, 2), k = _b[0], v = _b[1], rule = currentRule;
            switch (currentRule[k]) {
             case types_1.CustomizeRule.Match:
              ret[k] = v, Object.entries(rule).forEach((function(_a) {
                var _b = __read(_a, 2), k = _b[0];
                if (_b[1] === types_1.CustomizeRule.Replace && bMatches.length > 0) {
                  var val = last(bMatches)[k];
                  void 0 !== val && (ret[k] = val);
                }
              }));
              break;

             case types_1.CustomizeRule.Append:
              if (!bMatches.length) {
                ret[k] = v;
                break;
              }
              var appendValue = last(bMatches)[k];
              if (!isArray(v) || !isArray(appendValue)) throw new TypeError("Trying to append non-arrays");
              ret[k] = v.concat(appendValue);
              break;

             case types_1.CustomizeRule.Merge:
              if (!bMatches.length) {
                ret[k] = v;
                break;
              }
              var lastValue = last(bMatches)[k];
              if (!utils_1.isPlainObject(v) || !utils_1.isPlainObject(lastValue)) throw new TypeError("Trying to merge non-objects");
              ret[k] = __assign(__assign({}, v), lastValue);
              break;

             case types_1.CustomizeRule.Prepend:
              if (!bMatches.length) {
                ret[k] = v;
                break;
              }
              var prependValue = last(bMatches)[k];
              if (!isArray(v) || !isArray(prependValue)) throw new TypeError("Trying to prepend non-arrays");
              ret[k] = prependValue.concat(v);
              break;

             case types_1.CustomizeRule.Replace:
              ret[k] = bMatches.length > 0 ? last(bMatches)[k] : v;
              break;

             default:
              var currentRule_1 = operations[k], b_1 = bMatches.map((function(o) {
                return o[k];
              })).reduce((function(acc, val) {
                return isArray(acc) && isArray(val) ? __spreadArray(__spreadArray([], __read(acc)), __read(val)) : acc;
              }), []);
              ret[k] = mergeWithRule({
                currentRule: currentRule_1,
                a: v,
                b: b_1
              });
            }
          })), ret) : ao;
        }));
        return ret.concat(b.filter((function(o) {
          return !bAllMatches.includes(o);
        })));
      }
      function last(arr) {
        return arr[arr.length - 1];
      }
      exports.customizeObject = function(rules) {
        return function(a, b, key) {
          switch (rules[key]) {
           case types_1.CustomizeRule.Prepend:
            return merge_with_1.default([ b, a ], join_arrays_1.default());

           case types_1.CustomizeRule.Replace:
            return b;

           case types_1.CustomizeRule.Append:
            return merge_with_1.default([ a, b ], join_arrays_1.default());
          }
        };
      };
    },
    8145: function(__unused_webpack_module, exports, __webpack_require__) {
      "use strict";
      var __read = this && this.__read || function(o, n) {
        var m = "function" == typeof Symbol && o[Symbol.iterator];
        if (!m) return o;
        var r, e, i = m.call(o), ar = [];
        try {
          for (;(void 0 === n || n-- > 0) && !(r = i.next()).done; ) ar.push(r.value);
        } catch (error) {
          e = {
            error
          };
        } finally {
          try {
            r && !r.done && (m = i.return) && m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      }, __spreadArray = this && this.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];
        return to;
      }, __importDefault = this && this.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : {
          default: mod
        };
      };
      exports.__esModule = !0;
      var clone_deep_1 = __importDefault(__webpack_require__(738)), merge_with_1 = __importDefault(__webpack_require__(703)), utils_1 = __webpack_require__(6736), isArray = Array.isArray;
      exports.default = function joinArrays(_a) {
        var _b = void 0 === _a ? {} : _a, customizeArray = _b.customizeArray, customizeObject = _b.customizeObject, key = _b.key;
        return function _joinArrays(a, b, k) {
          var newKey = key ? key + "." + k : k;
          return utils_1.isFunction(a) && utils_1.isFunction(b) ? function() {
            for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
            return _joinArrays(a.apply(void 0, __spreadArray([], __read(args))), b.apply(void 0, __spreadArray([], __read(args))), k);
          } : isArray(a) && isArray(b) ? customizeArray && customizeArray(a, b, newKey) || __spreadArray(__spreadArray([], __read(a)), __read(b)) : utils_1.isRegex(b) ? b : utils_1.isPlainObject(a) && utils_1.isPlainObject(b) ? customizeObject && customizeObject(a, b, newKey) || merge_with_1.default([ a, b ], joinArrays({
            customizeArray,
            customizeObject,
            key: newKey
          })) : utils_1.isPlainObject(b) ? clone_deep_1.default(b) : isArray(b) ? __spreadArray([], __read(b)) : b;
        };
      };
    },
    703: function(__unused_webpack_module, exports) {
      "use strict";
      var __read = this && this.__read || function(o, n) {
        var m = "function" == typeof Symbol && o[Symbol.iterator];
        if (!m) return o;
        var r, e, i = m.call(o), ar = [];
        try {
          for (;(void 0 === n || n-- > 0) && !(r = i.next()).done; ) ar.push(r.value);
        } catch (error) {
          e = {
            error
          };
        } finally {
          try {
            r && !r.done && (m = i.return) && m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      };
      exports.__esModule = !0, exports.default = function(objects, customizer) {
        var _a = __read(objects), first = _a[0], rest = _a.slice(1), ret = first;
        return rest.forEach((function(a) {
          ret = function(a, b, customizer) {
            var ret = {};
            return Object.keys(a).concat(Object.keys(b)).forEach((function(k) {
              var v = customizer(a[k], b[k], k);
              ret[k] = void 0 === v ? a[k] : v;
            })), ret;
          }(ret, a, customizer);
        })), ret;
      };
    },
    4302: (__unused_webpack_module, exports) => {
      "use strict";
      exports.__esModule = !0, exports.CustomizeRule = void 0, function(CustomizeRule) {
        CustomizeRule.Match = "match", CustomizeRule.Merge = "merge", CustomizeRule.Append = "append", 
        CustomizeRule.Prepend = "prepend", CustomizeRule.Replace = "replace";
      }(exports.CustomizeRule || (exports.CustomizeRule = {}));
    },
    9937: function(__unused_webpack_module, exports) {
      "use strict";
      var __read = this && this.__read || function(o, n) {
        var m = "function" == typeof Symbol && o[Symbol.iterator];
        if (!m) return o;
        var r, e, i = m.call(o), ar = [];
        try {
          for (;(void 0 === n || n-- > 0) && !(r = i.next()).done; ) ar.push(r.value);
        } catch (error) {
          e = {
            error
          };
        } finally {
          try {
            r && !r.done && (m = i.return) && m.call(i);
          } finally {
            if (e) throw e.error;
          }
        }
        return ar;
      }, __spreadArray = this && this.__spreadArray || function(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];
        return to;
      };
      exports.__esModule = !0, exports.default = function(key, uniques, getter) {
        var uniquesSet = new Set(uniques);
        return function(a, b, k) {
          return k === key && Array.from(__spreadArray(__spreadArray([], __read(a)), __read(b)).map((function(it) {
            return {
              key: getter(it),
              value: it
            };
          })).map((function(_a) {
            var key = _a.key, value = _a.value;
            return {
              key: uniquesSet.has(key) ? key : value,
              value
            };
          })).reduce((function(m, _a) {
            var key = _a.key, value = _a.value;
            return m.delete(key), m.set(key, value);
          }), new Map).values());
        };
      };
    },
    6736: (__unused_webpack_module, exports) => {
      "use strict";
      exports.__esModule = !0, exports.isUndefined = exports.isPlainObject = exports.isFunction = exports.isRegex = void 0, 
      exports.isRegex = function(o) {
        return o instanceof RegExp;
      }, exports.isFunction = function(functionToCheck) {
        return functionToCheck && "[object Function]" === {}.toString.call(functionToCheck);
      }, exports.isPlainObject = function(a) {
        return null !== a && !Array.isArray(a) && "object" == typeof a;
      }, exports.isUndefined = function(a) {
        return void 0 === a;
      };
    },
    2806: (module, __unused_webpack_exports, __webpack_require__) => {
      const isWindows = "win32" === process.platform || "cygwin" === process.env.OSTYPE || "msys" === process.env.OSTYPE, path = __webpack_require__(1017), COLON = isWindows ? ";" : ":", isexe = __webpack_require__(1959), getNotFoundError = cmd => Object.assign(new Error(`not found: ${cmd}`), {
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
    1196: module => {
      "use strict";
      var REGEXP_PARTS = /(\*|\?)/g;
      function WildcardMatcher(text, separator) {
        this.text = text = text || "", this.hasWild = text.indexOf("*") >= 0, this.separator = separator, 
        this.parts = text.split(separator).map(this.classifyPart.bind(this));
      }
      WildcardMatcher.prototype.match = function(input) {
        var ii, testParts, matches = !0, parts = this.parts, partsCount = parts.length;
        if ("string" == typeof input || input instanceof String) if (this.hasWild || this.text == input) {
          for (testParts = (input || "").split(this.separator), ii = 0; matches && ii < partsCount; ii++) "*" !== parts[ii] && (matches = ii < testParts.length && (parts[ii] instanceof RegExp ? parts[ii].test(testParts[ii]) : parts[ii] === testParts[ii]));
          matches = matches && testParts;
        } else matches = !1; else if ("function" == typeof input.splice) for (matches = [], 
        ii = input.length; ii--; ) this.match(input[ii]) && (matches[matches.length] = input[ii]); else if ("object" == typeof input) for (var key in matches = {}, 
        input) this.match(key) && (matches[key] = input[key]);
        return matches;
      }, WildcardMatcher.prototype.classifyPart = function(part) {
        return "*" === part ? part : part.indexOf("*") >= 0 || part.indexOf("?") >= 0 ? new RegExp(part.replace(REGEXP_PARTS, ".$1")) : part;
      }, module.exports = function(text, test, separator) {
        var matcher = new WildcardMatcher(text, separator || /[\/\.]/);
        return void 0 !== test ? matcher.match(test) : matcher;
      };
    },
    5965: module => {
      "use strict";
      module.exports = require;
    },
    2750: module => {
      "use strict";
      module.exports = require("webpack");
    },
    9260: module => {
      "use strict";
      module.exports = require("webpack-bundle-analyzer");
    },
    9491: module => {
      "use strict";
      module.exports = require("assert");
    },
    2081: module => {
      "use strict";
      module.exports = require("child_process");
    },
    2361: module => {
      "use strict";
      module.exports = require("events");
    },
    7147: module => {
      "use strict";
      module.exports = require("fs");
    },
    2037: module => {
      "use strict";
      module.exports = require("os");
    },
    1017: module => {
      "use strict";
      module.exports = require("path");
    },
    4521: module => {
      "use strict";
      module.exports = require("readline");
    },
    2781: module => {
      "use strict";
      module.exports = require("stream");
    },
    6224: module => {
      "use strict";
      module.exports = require("tty");
    },
    7310: module => {
      "use strict";
      module.exports = require("url");
    },
    3837: module => {
      "use strict";
      module.exports = require("util");
    },
    9485: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        return e && Object.keys(e).forEach((function(k) {
          if ("default" !== k) {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: !0,
              get: function() {
                return e[k];
              }
            });
          }
        })), n.default = e, Object.freeze(n);
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      var tty__namespace = _interopNamespace(__webpack_require__(6224));
      const {env = {}, argv = [], platform = ""} = "undefined" == typeof process ? {} : process, isDisabled = "NO_COLOR" in env || argv.includes("--no-color"), isForced = "FORCE_COLOR" in env || argv.includes("--color"), isWindows = "win32" === platform, isDumbTerminal = "dumb" === env.TERM, isCompatibleTerminal = tty__namespace && tty__namespace.isatty && tty__namespace.isatty(1) && env.TERM && !isDumbTerminal, isColorSupported = !isDisabled && (isForced || isWindows && !isDumbTerminal || isCompatibleTerminal || "CI" in env && ("GITHUB_ACTIONS" in env || "GITLAB_CI" in env || "CIRCLECI" in env)), replaceClose = (index, string, close, replace, head = string.substring(0, index) + replace, tail = string.substring(index + close.length), next = tail.indexOf(close)) => head + (next < 0 ? tail : replaceClose(next, tail, close, replace)), filterEmpty = (open, close, replace = open, at = open.length + 1) => string => string || "" !== string && void 0 !== string ? ((index, string, open, close, replace) => index < 0 ? open + string + close : open + replaceClose(index, string, close, replace) + close)(("" + string).indexOf(close, at), string, open, close, replace) : "", init = (open, close, replace) => filterEmpty(`[${open}m`, `[${close}m`, replace), colors = {
        reset: init(0, 0),
        bold: init(1, 22, "[22m[1m"),
        dim: init(2, 22, "[22m[2m"),
        italic: init(3, 23),
        underline: init(4, 24),
        inverse: init(7, 27),
        hidden: init(8, 28),
        strikethrough: init(9, 29),
        black: init(30, 39),
        red: init(31, 39),
        green: init(32, 39),
        yellow: init(33, 39),
        blue: init(34, 39),
        magenta: init(35, 39),
        cyan: init(36, 39),
        white: init(37, 39),
        gray: init(90, 39),
        bgBlack: init(40, 49),
        bgRed: init(41, 49),
        bgGreen: init(42, 49),
        bgYellow: init(43, 49),
        bgBlue: init(44, 49),
        bgMagenta: init(45, 49),
        bgCyan: init(46, 49),
        bgWhite: init(47, 49),
        blackBright: init(90, 39),
        redBright: init(91, 39),
        greenBright: init(92, 39),
        yellowBright: init(93, 39),
        blueBright: init(94, 39),
        magentaBright: init(95, 39),
        cyanBright: init(96, 39),
        whiteBright: init(97, 39),
        bgBlackBright: init(100, 49),
        bgRedBright: init(101, 49),
        bgGreenBright: init(102, 49),
        bgYellowBright: init(103, 49),
        bgBlueBright: init(104, 49),
        bgMagentaBright: init(105, 49),
        bgCyanBright: init(106, 49),
        bgWhiteBright: init(107, 49)
      }, createColors = ({useColor = isColorSupported} = {}) => useColor ? colors : Object.keys(colors).reduce(((colors, key) => ({
        ...colors,
        [key]: String
      })), {}), {reset, bold, dim, italic, underline, inverse, hidden, strikethrough, black, red, green, yellow, blue, magenta, cyan, white, gray, bgBlack, bgRed, bgGreen, bgYellow, bgBlue, bgMagenta, bgCyan, bgWhite, blackBright, redBright, greenBright, yellowBright, blueBright, magentaBright, cyanBright, whiteBright, bgBlackBright, bgRedBright, bgGreenBright, bgYellowBright, bgBlueBright, bgMagentaBright, bgCyanBright, bgWhiteBright} = createColors();
      exports.bgBlack = bgBlack, exports.bgBlackBright = bgBlackBright, exports.bgBlue = bgBlue, 
      exports.bgBlueBright = bgBlueBright, exports.bgCyan = bgCyan, exports.bgCyanBright = bgCyanBright, 
      exports.bgGreen = bgGreen, exports.bgGreenBright = bgGreenBright, exports.bgMagenta = bgMagenta, 
      exports.bgMagentaBright = bgMagentaBright, exports.bgRed = bgRed, exports.bgRedBright = bgRedBright, 
      exports.bgWhite = bgWhite, exports.bgWhiteBright = bgWhiteBright, exports.bgYellow = bgYellow, 
      exports.bgYellowBright = bgYellowBright, exports.black = black, exports.blackBright = blackBright, 
      exports.blue = blue, exports.blueBright = blueBright, exports.bold = bold, exports.createColors = createColors, 
      exports.cyan = cyan, exports.cyanBright = cyanBright, exports.dim = dim, exports.gray = gray, 
      exports.green = green, exports.greenBright = greenBright, exports.hidden = hidden, 
      exports.inverse = inverse, exports.isColorSupported = isColorSupported, exports.italic = italic, 
      exports.magenta = magenta, exports.magentaBright = magentaBright, exports.red = red, 
      exports.redBright = redBright, exports.reset = reset, exports.strikethrough = strikethrough, 
      exports.underline = underline, exports.white = white, exports.whiteBright = whiteBright, 
      exports.yellow = yellow, exports.yellowBright = yellowBright;
    },
    7461: (module, exports, __webpack_require__) => {
      const EventEmitter = __webpack_require__(2361).EventEmitter, childProcess = __webpack_require__(2081), path = __webpack_require__(1017), fs = __webpack_require__(7147);
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
          return this.name().replace(/^no-/, "").split("-").reduce(((str, word) => str + word[0].toUpperCase() + word.slice(1)));
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
          return !this._scriptPath && __webpack_require__.c[__webpack_require__.s] && (this._scriptPath = __webpack_require__.c[__webpack_require__.s].filename), 
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
          !scriptPath && __webpack_require__.c[__webpack_require__.s] && (scriptPath = __webpack_require__.c[__webpack_require__.s].filename);
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
      (exports = module.exports = new Command).program = exports, exports.Command = Command, 
      exports.Option = Option, exports.CommanderError = CommanderError, exports.InvalidOptionArgumentError = InvalidOptionArgumentError, 
      exports.Help = Help;
    },
    8385: module => {
      "use strict";
      module.exports = {
        version: "0.5.7"
      };
    },
    6151: module => {
      "use strict";
      module.exports = JSON.parse('{"assert":true,"node:assert":[">= 14.18 && < 15",">= 16"],"assert/strict":">= 15","node:assert/strict":">= 16","async_hooks":">= 8","node:async_hooks":[">= 14.18 && < 15",">= 16"],"buffer_ieee754":">= 0.5 && < 0.9.7","buffer":true,"node:buffer":[">= 14.18 && < 15",">= 16"],"child_process":true,"node:child_process":[">= 14.18 && < 15",">= 16"],"cluster":">= 0.5","node:cluster":[">= 14.18 && < 15",">= 16"],"console":true,"node:console":[">= 14.18 && < 15",">= 16"],"constants":true,"node:constants":[">= 14.18 && < 15",">= 16"],"crypto":true,"node:crypto":[">= 14.18 && < 15",">= 16"],"_debug_agent":">= 1 && < 8","_debugger":"< 8","dgram":true,"node:dgram":[">= 14.18 && < 15",">= 16"],"diagnostics_channel":[">= 14.17 && < 15",">= 15.1"],"node:diagnostics_channel":[">= 14.18 && < 15",">= 16"],"dns":true,"node:dns":[">= 14.18 && < 15",">= 16"],"dns/promises":">= 15","node:dns/promises":">= 16","domain":">= 0.7.12","node:domain":[">= 14.18 && < 15",">= 16"],"events":true,"node:events":[">= 14.18 && < 15",">= 16"],"freelist":"< 6","fs":true,"node:fs":[">= 14.18 && < 15",">= 16"],"fs/promises":[">= 10 && < 10.1",">= 14"],"node:fs/promises":[">= 14.18 && < 15",">= 16"],"_http_agent":">= 0.11.1","node:_http_agent":[">= 14.18 && < 15",">= 16"],"_http_client":">= 0.11.1","node:_http_client":[">= 14.18 && < 15",">= 16"],"_http_common":">= 0.11.1","node:_http_common":[">= 14.18 && < 15",">= 16"],"_http_incoming":">= 0.11.1","node:_http_incoming":[">= 14.18 && < 15",">= 16"],"_http_outgoing":">= 0.11.1","node:_http_outgoing":[">= 14.18 && < 15",">= 16"],"_http_server":">= 0.11.1","node:_http_server":[">= 14.18 && < 15",">= 16"],"http":true,"node:http":[">= 14.18 && < 15",">= 16"],"http2":">= 8.8","node:http2":[">= 14.18 && < 15",">= 16"],"https":true,"node:https":[">= 14.18 && < 15",">= 16"],"inspector":">= 8","node:inspector":[">= 14.18 && < 15",">= 16"],"_linklist":"< 8","module":true,"node:module":[">= 14.18 && < 15",">= 16"],"net":true,"node:net":[">= 14.18 && < 15",">= 16"],"node-inspect/lib/_inspect":">= 7.6 && < 12","node-inspect/lib/internal/inspect_client":">= 7.6 && < 12","node-inspect/lib/internal/inspect_repl":">= 7.6 && < 12","os":true,"node:os":[">= 14.18 && < 15",">= 16"],"path":true,"node:path":[">= 14.18 && < 15",">= 16"],"path/posix":">= 15.3","node:path/posix":">= 16","path/win32":">= 15.3","node:path/win32":">= 16","perf_hooks":">= 8.5","node:perf_hooks":[">= 14.18 && < 15",">= 16"],"process":">= 1","node:process":[">= 14.18 && < 15",">= 16"],"punycode":">= 0.5","node:punycode":[">= 14.18 && < 15",">= 16"],"querystring":true,"node:querystring":[">= 14.18 && < 15",">= 16"],"readline":true,"node:readline":[">= 14.18 && < 15",">= 16"],"readline/promises":">= 17","node:readline/promises":">= 17","repl":true,"node:repl":[">= 14.18 && < 15",">= 16"],"smalloc":">= 0.11.5 && < 3","_stream_duplex":">= 0.9.4","node:_stream_duplex":[">= 14.18 && < 15",">= 16"],"_stream_transform":">= 0.9.4","node:_stream_transform":[">= 14.18 && < 15",">= 16"],"_stream_wrap":">= 1.4.1","node:_stream_wrap":[">= 14.18 && < 15",">= 16"],"_stream_passthrough":">= 0.9.4","node:_stream_passthrough":[">= 14.18 && < 15",">= 16"],"_stream_readable":">= 0.9.4","node:_stream_readable":[">= 14.18 && < 15",">= 16"],"_stream_writable":">= 0.9.4","node:_stream_writable":[">= 14.18 && < 15",">= 16"],"stream":true,"node:stream":[">= 14.18 && < 15",">= 16"],"stream/consumers":">= 16.7","node:stream/consumers":">= 16.7","stream/promises":">= 15","node:stream/promises":">= 16","stream/web":">= 16.5","node:stream/web":">= 16.5","string_decoder":true,"node:string_decoder":[">= 14.18 && < 15",">= 16"],"sys":[">= 0.4 && < 0.7",">= 0.8"],"node:sys":[">= 14.18 && < 15",">= 16"],"node:test":">= 18","timers":true,"node:timers":[">= 14.18 && < 15",">= 16"],"timers/promises":">= 15","node:timers/promises":">= 16","_tls_common":">= 0.11.13","node:_tls_common":[">= 14.18 && < 15",">= 16"],"_tls_legacy":">= 0.11.3 && < 10","_tls_wrap":">= 0.11.3","node:_tls_wrap":[">= 14.18 && < 15",">= 16"],"tls":true,"node:tls":[">= 14.18 && < 15",">= 16"],"trace_events":">= 10","node:trace_events":[">= 14.18 && < 15",">= 16"],"tty":true,"node:tty":[">= 14.18 && < 15",">= 16"],"url":true,"node:url":[">= 14.18 && < 15",">= 16"],"util":true,"node:util":[">= 14.18 && < 15",">= 16"],"util/types":">= 15.3","node:util/types":">= 16","v8/tools/arguments":">= 10 && < 12","v8/tools/codemap":[">= 4.4 && < 5",">= 5.2 && < 12"],"v8/tools/consarray":[">= 4.4 && < 5",">= 5.2 && < 12"],"v8/tools/csvparser":[">= 4.4 && < 5",">= 5.2 && < 12"],"v8/tools/logreader":[">= 4.4 && < 5",">= 5.2 && < 12"],"v8/tools/profile_view":[">= 4.4 && < 5",">= 5.2 && < 12"],"v8/tools/splaytree":[">= 4.4 && < 5",">= 5.2 && < 12"],"v8":">= 1","node:v8":[">= 14.18 && < 15",">= 16"],"vm":true,"node:vm":[">= 14.18 && < 15",">= 16"],"wasi":">= 13.4 && < 13.5","worker_threads":">= 11.7","node:worker_threads":[">= 14.18 && < 15",">= 16"],"zlib":">= 0.5","node:zlib":[">= 14.18 && < 15",">= 16"]}');
    },
    7558: module => {
      "use strict";
      module.exports = JSON.parse('{"name":"@webpack-cli/configtest","version":"1.2.0","description":"Validate a webpack configuration."}');
    },
    3255: module => {
      "use strict";
      module.exports = JSON.parse('{"name":"@webpack-cli/info","version":"1.5.0","description":"Outputs info about system and webpack config"}');
    },
    2623: module => {
      "use strict";
      module.exports = JSON.parse('{"name":"@webpack-cli/serve","version":"1.7.0"}');
    },
    8114: module => {
      "use strict";
      module.exports = {
        i8: "4.10.0"
      };
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
    return __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
    module.loaded = !0, module.exports;
  }
  __webpack_require__.c = __webpack_module_cache__, __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop), 
  __webpack_require__.nmd = module => (module.paths = [], module.children || (module.children = []), 
  module);
  var __webpack_exports__ = __webpack_require__(__webpack_require__.s = 9311);
  module.exports = __webpack_exports__;
})();