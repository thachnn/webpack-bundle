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
      const {isReadableStream} = __webpack_require__(7374), TextDecoder = __webpack_require__(9767), decoder = new TextDecoder;
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
    9767: (module, __unused_webpack_exports, __webpack_require__) => {
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
      const envinfo_1 = __importDefault(__webpack_require__(2971));
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
        "./serve/lib": 1403
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
        "./configtest/package.json": 1855,
        "./info/package.json": 4629,
        "./serve/package.json": 1404
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
      var isCore = __webpack_require__(5183), fs = __webpack_require__(7147), path = __webpack_require__(1017), getHomedir = __webpack_require__(2543), caller = __webpack_require__(6628), nodeModulesPaths = __webpack_require__(6015), normalizeOptions = __webpack_require__(5031), realpathFS = "win32" !== process.platform && fs.realpathSync && "function" == typeof fs.realpathSync.native ? fs.realpathSync.native : fs.realpathSync, homedir = getHomedir(), defaultIsFile = function(file) {
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
    7806: (__unused_webpack_module, exports, __webpack_require__) => {
      var path = __webpack_require__(1017), extension = __webpack_require__(3616), normalize = __webpack_require__(2317), register = __webpack_require__(5576);
      exports.prepare = function(extensions, filepath, cwd, nothrow) {
        var config, usedExtension, err, option, attempt, error, attempts = [], onlyErrors = !0, exts = extension(filepath);
        if (exts && exts.some((function(ext) {
          return usedExtension = ext, !!(config = normalize(extensions[ext]));
        })), -1 !== Object.keys(require.extensions).indexOf(usedExtension)) return !0;
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
    3784: (module, __unused_webpack_exports, __webpack_require__) => {
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
            require.extensions[".js"] = esmLoader("module")._extensions[".js"];
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
        ".mjs": {
          module: "interpret/mjs-stub",
          register: function(hook) {
            require.extensions[".mjs"] = null;
          }
        },
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
    5576: (module, __unused_webpack_exports, __webpack_require__) => {
      var resolve = {
        sync: __webpack_require__(6406)
      };
      module.exports = function(cwd, moduleName, register) {
        var result;
        try {
          var modulePath = resolve.sync(moduleName, {
            basedir: cwd
          });
          result = require(modulePath), "function" == typeof register && register(result);
        } catch (e) {
          result = e;
        }
        return result;
      };
    },
    1403: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const WEBPACK_PACKAGE = process.env.WEBPACK_PACKAGE || "webpack", WEBPACK_DEV_SERVER_PACKAGE = process.env.WEBPACK_DEV_SERVER_PACKAGE || "webpack-dev-server";
      exports.default = class {
        async apply(cli) {
          const loadDevServerOptions = () => {
            const devServer = require(WEBPACK_DEV_SERVER_PACKAGE), isNewDevServerCLIAPI = void 0 !== devServer.schema;
            let options = {};
            return options = isNewDevServerCLIAPI ? cli.webpack.cli && "function" == typeof cli.webpack.cli.getArguments ? cli.webpack.cli.getArguments(devServer.schema) : devServer.cli.getArguments() : require(`${WEBPACK_DEV_SERVER_PACKAGE}/bin/cli-flags`), 
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
            const DevServer = require(WEBPACK_DEV_SERVER_PACKAGE), isNewDevServerCLIAPI = void 0 !== DevServer.schema;
            let devServerVersion;
            try {
              devServerVersion = require(`${WEBPACK_DEV_SERVER_PACKAGE}/package.json`).version;
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
    3940: (module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      const fs = __webpack_require__(7147), path = __webpack_require__(1017), {pathToFileURL} = __webpack_require__(7310), util = __webpack_require__(3837), {program, Option} = __webpack_require__(47), WEBPACK_PACKAGE = process.env.WEBPACK_PACKAGE || "webpack", WEBPACK_DEV_SERVER_PACKAGE = process.env.WEBPACK_DEV_SERVER_PACKAGE || "webpack-dev-server";
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
            result = m ? __webpack_require__(5803)(`./${m[1]}/lib`) : require(module);
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
            result = m ? __webpack_require__(1005)(`./${m[1]}/package.json`) : require(pathToFile);
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
            const pkgJSON_version = __webpack_require__(8114).i8;
            let devServer;
            this.logger.raw(`webpack-cli: ${pkgJSON_version}`);
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
          const interpret = __webpack_require__(3784), loadConfigByPath = async (configPath, argv = {}) => {
            const ext = path.extname(configPath);
            if (Object.keys(interpret.jsVariants).find((variant => variant === ext))) {
              const rechoir = __webpack_require__(7806);
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
    5602: (module, __unused_webpack_exports, __webpack_require__) => {
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
    5183: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
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
        return Object.prototype.hasOwnProperty.call(data, x) && function(nodeVersion, specifierValue) {
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
    2806: (module, __unused_webpack_exports, __webpack_require__) => {
      const isWindows = "win32" === process.platform || "cygwin" === process.env.OSTYPE || "msys" === process.env.OSTYPE, path = __webpack_require__(1017), COLON = isWindows ? ";" : ":", isexe = __webpack_require__(5602), getNotFoundError = cmd => Object.assign(new Error(`not found: ${cmd}`), {
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
    47: module => {
      "use strict";
      module.exports = require("./commander");
    },
    2971: module => {
      "use strict";
      module.exports = require("./envinfo");
    },
    2750: module => {
      "use strict";
      module.exports = require("webpack");
    },
    9260: module => {
      "use strict";
      module.exports = require("webpack-bundle-analyzer");
    },
    2081: module => {
      "use strict";
      module.exports = require("child_process");
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
    8114: module => {
      "use strict";
      module.exports = {
        i8: "4.10.0"
      };
    },
    1855: module => {
      "use strict";
      module.exports = JSON.parse('{"name":"@webpack-cli/configtest","version":"1.2.0","description":"Validate a webpack configuration."}');
    },
    4629: module => {
      "use strict";
      module.exports = JSON.parse('{"name":"@webpack-cli/info","version":"1.5.0","description":"Outputs info about system and webpack config"}');
    },
    1404: module => {
      "use strict";
      module.exports = JSON.parse('{"name":"@webpack-cli/serve","version":"1.7.0"}');
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
  __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop), 
  __webpack_require__.nmd = module => (module.paths = [], module.children || (module.children = []), 
  module);
  var __webpack_exports__ = __webpack_require__(3940);
  module.exports = __webpack_exports__;
})();