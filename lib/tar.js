(() => {
  var __webpack_modules__ = {
    13159: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const fs = __webpack_require__(57147), path = __webpack_require__(71017), LCHOWN = fs.lchown ? "lchown" : "chown", LCHOWNSYNC = fs.lchownSync ? "lchownSync" : "chownSync", needEISDIRHandled = fs.lchown && !process.version.match(/v1[1-9]+\./) && !process.version.match(/v10\.[6-9]/), lchownSync = (path, uid, gid) => {
        try {
          return fs[LCHOWNSYNC](path, uid, gid);
        } catch (er) {
          if ("ENOENT" !== er.code) throw er;
        }
      }, handleEISDIR = needEISDIRHandled ? (path, uid, gid, cb) => er => {
        er && "EISDIR" === er.code ? fs.chown(path, uid, gid, cb) : cb(er);
      } : (_, __, ___, cb) => cb, handleEISDirSync = needEISDIRHandled ? (path, uid, gid) => {
        try {
          return lchownSync(path, uid, gid);
        } catch (er) {
          if ("EISDIR" !== er.code) throw er;
          ((path, uid, gid) => {
            try {
              fs.chownSync(path, uid, gid);
            } catch (er) {
              if ("ENOENT" !== er.code) throw er;
            }
          })(path, uid, gid);
        }
      } : (path, uid, gid) => lchownSync(path, uid, gid), nodeVersion = process.version;
      let readdir = (path, options, cb) => fs.readdir(path, options, cb);
      /^v4\./.test(nodeVersion) && (readdir = (path, options, cb) => fs.readdir(path, cb));
      const chown = (cpath, uid, gid, cb) => {
        fs[LCHOWN](cpath, uid, gid, handleEISDIR(cpath, uid, gid, (er => {
          cb(er && "ENOENT" !== er.code ? er : null);
        })));
      }, chownrKid = (p, child, uid, gid, cb) => {
        if ("string" == typeof child) return fs.lstat(path.resolve(p, child), ((er, stats) => {
          if (er) return cb("ENOENT" !== er.code ? er : null);
          stats.name = child, chownrKid(p, stats, uid, gid, cb);
        }));
        if (child.isDirectory()) chownr(path.resolve(p, child.name), uid, gid, (er => {
          if (er) return cb(er);
          const cpath = path.resolve(p, child.name);
          chown(cpath, uid, gid, cb);
        })); else {
          const cpath = path.resolve(p, child.name);
          chown(cpath, uid, gid, cb);
        }
      }, chownr = (p, uid, gid, cb) => {
        readdir(p, {
          withFileTypes: !0
        }, ((er, children) => {
          if (er) {
            if ("ENOENT" === er.code) return cb();
            if ("ENOTDIR" !== er.code && "ENOTSUP" !== er.code) return cb(er);
          }
          if (er || !children.length) return chown(p, uid, gid, cb);
          let len = children.length, errState = null;
          const then = er => {
            if (!errState) return er ? cb(errState = er) : 0 == --len ? chown(p, uid, gid, cb) : void 0;
          };
          children.forEach((child => chownrKid(p, child, uid, gid, then)));
        }));
      }, chownrSync = (p, uid, gid) => {
        let children;
        try {
          children = ((path, options) => fs.readdirSync(path, options))(p, {
            withFileTypes: !0
          });
        } catch (er) {
          if ("ENOENT" === er.code) return;
          if ("ENOTDIR" === er.code || "ENOTSUP" === er.code) return handleEISDirSync(p, uid, gid);
          throw er;
        }
        return children && children.length && children.forEach((child => ((p, child, uid, gid) => {
          if ("string" == typeof child) try {
            const stats = fs.lstatSync(path.resolve(p, child));
            stats.name = child, child = stats;
          } catch (er) {
            if ("ENOENT" === er.code) return;
            throw er;
          }
          child.isDirectory() && chownrSync(path.resolve(p, child.name), uid, gid), handleEISDirSync(path.resolve(p, child.name), uid, gid);
        })(p, child, uid, gid))), handleEISDirSync(p, uid, gid);
      };
      module.exports = chownr, chownr.sync = chownrSync;
    },
    33975: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      const MiniPass = __webpack_require__(45018), EE = __webpack_require__(82361).EventEmitter, fs = __webpack_require__(57147);
      let writev = fs.writev;
      if (!writev) {
        const binding = process.binding("fs"), FSReqWrap = binding.FSReqWrap || binding.FSReqCallback;
        writev = (fd, iovec, pos, cb) => {
          const req = new FSReqWrap;
          req.oncomplete = (er, bw) => cb(er, bw, iovec), binding.writeBuffers(fd, iovec, pos, req);
        };
      }
      const _autoClose = Symbol("_autoClose"), _close = Symbol("_close"), _ended = Symbol("_ended"), _fd = Symbol("_fd"), _finished = Symbol("_finished"), _flags = Symbol("_flags"), _flush = Symbol("_flush"), _handleChunk = Symbol("_handleChunk"), _makeBuf = Symbol("_makeBuf"), _mode = Symbol("_mode"), _needDrain = Symbol("_needDrain"), _onerror = Symbol("_onerror"), _onopen = Symbol("_onopen"), _onread = Symbol("_onread"), _onwrite = Symbol("_onwrite"), _open = Symbol("_open"), _path = Symbol("_path"), _pos = Symbol("_pos"), _queue = Symbol("_queue"), _read = Symbol("_read"), _readSize = Symbol("_readSize"), _reading = Symbol("_reading"), _remain = Symbol("_remain"), _size = Symbol("_size"), _write = Symbol("_write"), _writing = Symbol("_writing"), _defaultFlag = Symbol("_defaultFlag"), _errored = Symbol("_errored");
      class ReadStream extends MiniPass {
        constructor(path, opt) {
          if (super(opt = opt || {}), this.readable = !0, this.writable = !1, "string" != typeof path) throw new TypeError("path must be a string");
          this[_errored] = !1, this[_fd] = "number" == typeof opt.fd ? opt.fd : null, this[_path] = path, 
          this[_readSize] = opt.readSize || 16777216, this[_reading] = !1, this[_size] = "number" == typeof opt.size ? opt.size : 1 / 0, 
          this[_remain] = this[_size], this[_autoClose] = "boolean" != typeof opt.autoClose || opt.autoClose, 
          "number" == typeof this[_fd] ? this[_read]() : this[_open]();
        }
        get fd() {
          return this[_fd];
        }
        get path() {
          return this[_path];
        }
        write() {
          throw new TypeError("this is a readable stream");
        }
        end() {
          throw new TypeError("this is a readable stream");
        }
        [_open]() {
          fs.open(this[_path], "r", ((er, fd) => this[_onopen](er, fd)));
        }
        [_onopen](er, fd) {
          er ? this[_onerror](er) : (this[_fd] = fd, this.emit("open", fd), this[_read]());
        }
        [_makeBuf]() {
          return Buffer.allocUnsafe(Math.min(this[_readSize], this[_remain]));
        }
        [_read]() {
          if (!this[_reading]) {
            this[_reading] = !0;
            const buf = this[_makeBuf]();
            if (0 === buf.length) return process.nextTick((() => this[_onread](null, 0, buf)));
            fs.read(this[_fd], buf, 0, buf.length, null, ((er, br, buf) => this[_onread](er, br, buf)));
          }
        }
        [_onread](er, br, buf) {
          this[_reading] = !1, er ? this[_onerror](er) : this[_handleChunk](br, buf) && this[_read]();
        }
        [_close]() {
          if (this[_autoClose] && "number" == typeof this[_fd]) {
            const fd = this[_fd];
            this[_fd] = null, fs.close(fd, (er => er ? this.emit("error", er) : this.emit("close")));
          }
        }
        [_onerror](er) {
          this[_reading] = !0, this[_close](), this.emit("error", er);
        }
        [_handleChunk](br, buf) {
          let ret = !1;
          return this[_remain] -= br, br > 0 && (ret = super.write(br < buf.length ? buf.slice(0, br) : buf)), 
          (0 === br || this[_remain] <= 0) && (ret = !1, this[_close](), super.end()), ret;
        }
        emit(ev, data) {
          switch (ev) {
           case "prefinish":
           case "finish":
            break;

           case "drain":
            "number" == typeof this[_fd] && this[_read]();
            break;

           case "error":
            if (this[_errored]) return;
            return this[_errored] = !0, super.emit(ev, data);

           default:
            return super.emit(ev, data);
          }
        }
      }
      class WriteStream extends EE {
        constructor(path, opt) {
          super(opt = opt || {}), this.readable = !1, this.writable = !0, this[_errored] = !1, 
          this[_writing] = !1, this[_ended] = !1, this[_needDrain] = !1, this[_queue] = [], 
          this[_path] = path, this[_fd] = "number" == typeof opt.fd ? opt.fd : null, this[_mode] = void 0 === opt.mode ? 438 : opt.mode, 
          this[_pos] = "number" == typeof opt.start ? opt.start : null, this[_autoClose] = "boolean" != typeof opt.autoClose || opt.autoClose;
          const defaultFlag = null !== this[_pos] ? "r+" : "w";
          this[_defaultFlag] = void 0 === opt.flags, this[_flags] = this[_defaultFlag] ? defaultFlag : opt.flags, 
          null === this[_fd] && this[_open]();
        }
        emit(ev, data) {
          if ("error" === ev) {
            if (this[_errored]) return;
            this[_errored] = !0;
          }
          return super.emit(ev, data);
        }
        get fd() {
          return this[_fd];
        }
        get path() {
          return this[_path];
        }
        [_onerror](er) {
          this[_close](), this[_writing] = !0, this.emit("error", er);
        }
        [_open]() {
          fs.open(this[_path], this[_flags], this[_mode], ((er, fd) => this[_onopen](er, fd)));
        }
        [_onopen](er, fd) {
          this[_defaultFlag] && "r+" === this[_flags] && er && "ENOENT" === er.code ? (this[_flags] = "w", 
          this[_open]()) : er ? this[_onerror](er) : (this[_fd] = fd, this.emit("open", fd), 
          this[_flush]());
        }
        end(buf, enc) {
          return buf && this.write(buf, enc), this[_ended] = !0, this[_writing] || this[_queue].length || "number" != typeof this[_fd] || this[_onwrite](null, 0), 
          this;
        }
        write(buf, enc) {
          return "string" == typeof buf && (buf = Buffer.from(buf, enc)), this[_ended] ? (this.emit("error", new Error("write() after end()")), 
          !1) : null === this[_fd] || this[_writing] || this[_queue].length ? (this[_queue].push(buf), 
          this[_needDrain] = !0, !1) : (this[_writing] = !0, this[_write](buf), !0);
        }
        [_write](buf) {
          fs.write(this[_fd], buf, 0, buf.length, this[_pos], ((er, bw) => this[_onwrite](er, bw)));
        }
        [_onwrite](er, bw) {
          er ? this[_onerror](er) : (null !== this[_pos] && (this[_pos] += bw), this[_queue].length ? this[_flush]() : (this[_writing] = !1, 
          this[_ended] && !this[_finished] ? (this[_finished] = !0, this[_close](), this.emit("finish")) : this[_needDrain] && (this[_needDrain] = !1, 
          this.emit("drain"))));
        }
        [_flush]() {
          if (0 === this[_queue].length) this[_ended] && this[_onwrite](null, 0); else if (1 === this[_queue].length) this[_write](this[_queue].pop()); else {
            const iovec = this[_queue];
            this[_queue] = [], writev(this[_fd], iovec, this[_pos], ((er, bw) => this[_onwrite](er, bw)));
          }
        }
        [_close]() {
          if (this[_autoClose] && "number" == typeof this[_fd]) {
            const fd = this[_fd];
            this[_fd] = null, fs.close(fd, (er => er ? this.emit("error", er) : this.emit("close")));
          }
        }
      }
      exports.ReadStream = ReadStream, exports.ReadStreamSync = class extends ReadStream {
        [_open]() {
          let threw = !0;
          try {
            this[_onopen](null, fs.openSync(this[_path], "r")), threw = !1;
          } finally {
            threw && this[_close]();
          }
        }
        [_read]() {
          let threw = !0;
          try {
            if (!this[_reading]) {
              for (this[_reading] = !0; ;) {
                const buf = this[_makeBuf](), br = 0 === buf.length ? 0 : fs.readSync(this[_fd], buf, 0, buf.length, null);
                if (!this[_handleChunk](br, buf)) break;
              }
              this[_reading] = !1;
            }
            threw = !1;
          } finally {
            threw && this[_close]();
          }
        }
        [_close]() {
          if (this[_autoClose] && "number" == typeof this[_fd]) {
            const fd = this[_fd];
            this[_fd] = null, fs.closeSync(fd), this.emit("close");
          }
        }
      }, exports.WriteStream = WriteStream, exports.WriteStreamSync = class extends WriteStream {
        [_open]() {
          let fd;
          if (this[_defaultFlag] && "r+" === this[_flags]) try {
            fd = fs.openSync(this[_path], this[_flags], this[_mode]);
          } catch (er) {
            if ("ENOENT" === er.code) return this[_flags] = "w", this[_open]();
            throw er;
          } else fd = fs.openSync(this[_path], this[_flags], this[_mode]);
          this[_onopen](null, fd);
        }
        [_close]() {
          if (this[_autoClose] && "number" == typeof this[_fd]) {
            const fd = this[_fd];
            this[_fd] = null, fs.closeSync(fd), this.emit("close");
          }
        }
        [_write](buf) {
          let threw = !0;
          try {
            this[_onwrite](null, fs.writeSync(this[_fd], buf, 0, buf.length, this[_pos])), threw = !1;
          } finally {
            if (threw) try {
              this[_close]();
            } catch (_) {}
          }
        }
      };
    },
    40091: (module, __unused_webpack_exports, __webpack_require__) => {
      const realZlibConstants = __webpack_require__(59796).constants || {
        ZLIB_VERNUM: 4736
      };
      module.exports = Object.freeze(Object.assign(Object.create(null), {
        Z_NO_FLUSH: 0,
        Z_PARTIAL_FLUSH: 1,
        Z_SYNC_FLUSH: 2,
        Z_FULL_FLUSH: 3,
        Z_FINISH: 4,
        Z_BLOCK: 5,
        Z_OK: 0,
        Z_STREAM_END: 1,
        Z_NEED_DICT: 2,
        Z_ERRNO: -1,
        Z_STREAM_ERROR: -2,
        Z_DATA_ERROR: -3,
        Z_MEM_ERROR: -4,
        Z_BUF_ERROR: -5,
        Z_VERSION_ERROR: -6,
        Z_NO_COMPRESSION: 0,
        Z_BEST_SPEED: 1,
        Z_BEST_COMPRESSION: 9,
        Z_DEFAULT_COMPRESSION: -1,
        Z_FILTERED: 1,
        Z_HUFFMAN_ONLY: 2,
        Z_RLE: 3,
        Z_FIXED: 4,
        Z_DEFAULT_STRATEGY: 0,
        DEFLATE: 1,
        INFLATE: 2,
        GZIP: 3,
        GUNZIP: 4,
        DEFLATERAW: 5,
        INFLATERAW: 6,
        UNZIP: 7,
        BROTLI_DECODE: 8,
        BROTLI_ENCODE: 9,
        Z_MIN_WINDOWBITS: 8,
        Z_MAX_WINDOWBITS: 15,
        Z_DEFAULT_WINDOWBITS: 15,
        Z_MIN_CHUNK: 64,
        Z_MAX_CHUNK: 1 / 0,
        Z_DEFAULT_CHUNK: 16384,
        Z_MIN_MEMLEVEL: 1,
        Z_MAX_MEMLEVEL: 9,
        Z_DEFAULT_MEMLEVEL: 8,
        Z_MIN_LEVEL: -1,
        Z_MAX_LEVEL: 9,
        Z_DEFAULT_LEVEL: -1,
        BROTLI_OPERATION_PROCESS: 0,
        BROTLI_OPERATION_FLUSH: 1,
        BROTLI_OPERATION_FINISH: 2,
        BROTLI_OPERATION_EMIT_METADATA: 3,
        BROTLI_MODE_GENERIC: 0,
        BROTLI_MODE_TEXT: 1,
        BROTLI_MODE_FONT: 2,
        BROTLI_DEFAULT_MODE: 0,
        BROTLI_MIN_QUALITY: 0,
        BROTLI_MAX_QUALITY: 11,
        BROTLI_DEFAULT_QUALITY: 11,
        BROTLI_MIN_WINDOW_BITS: 10,
        BROTLI_MAX_WINDOW_BITS: 24,
        BROTLI_LARGE_MAX_WINDOW_BITS: 30,
        BROTLI_DEFAULT_WINDOW: 22,
        BROTLI_MIN_INPUT_BLOCK_BITS: 16,
        BROTLI_MAX_INPUT_BLOCK_BITS: 24,
        BROTLI_PARAM_MODE: 0,
        BROTLI_PARAM_QUALITY: 1,
        BROTLI_PARAM_LGWIN: 2,
        BROTLI_PARAM_LGBLOCK: 3,
        BROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING: 4,
        BROTLI_PARAM_SIZE_HINT: 5,
        BROTLI_PARAM_LARGE_WINDOW: 6,
        BROTLI_PARAM_NPOSTFIX: 7,
        BROTLI_PARAM_NDIRECT: 8,
        BROTLI_DECODER_RESULT_ERROR: 0,
        BROTLI_DECODER_RESULT_SUCCESS: 1,
        BROTLI_DECODER_RESULT_NEEDS_MORE_INPUT: 2,
        BROTLI_DECODER_RESULT_NEEDS_MORE_OUTPUT: 3,
        BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION: 0,
        BROTLI_DECODER_PARAM_LARGE_WINDOW: 1,
        BROTLI_DECODER_NO_ERROR: 0,
        BROTLI_DECODER_SUCCESS: 1,
        BROTLI_DECODER_NEEDS_MORE_INPUT: 2,
        BROTLI_DECODER_NEEDS_MORE_OUTPUT: 3,
        BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_NIBBLE: -1,
        BROTLI_DECODER_ERROR_FORMAT_RESERVED: -2,
        BROTLI_DECODER_ERROR_FORMAT_EXUBERANT_META_NIBBLE: -3,
        BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_ALPHABET: -4,
        BROTLI_DECODER_ERROR_FORMAT_SIMPLE_HUFFMAN_SAME: -5,
        BROTLI_DECODER_ERROR_FORMAT_CL_SPACE: -6,
        BROTLI_DECODER_ERROR_FORMAT_HUFFMAN_SPACE: -7,
        BROTLI_DECODER_ERROR_FORMAT_CONTEXT_MAP_REPEAT: -8,
        BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_1: -9,
        BROTLI_DECODER_ERROR_FORMAT_BLOCK_LENGTH_2: -10,
        BROTLI_DECODER_ERROR_FORMAT_TRANSFORM: -11,
        BROTLI_DECODER_ERROR_FORMAT_DICTIONARY: -12,
        BROTLI_DECODER_ERROR_FORMAT_WINDOW_BITS: -13,
        BROTLI_DECODER_ERROR_FORMAT_PADDING_1: -14,
        BROTLI_DECODER_ERROR_FORMAT_PADDING_2: -15,
        BROTLI_DECODER_ERROR_FORMAT_DISTANCE: -16,
        BROTLI_DECODER_ERROR_DICTIONARY_NOT_SET: -19,
        BROTLI_DECODER_ERROR_INVALID_ARGUMENTS: -20,
        BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MODES: -21,
        BROTLI_DECODER_ERROR_ALLOC_TREE_GROUPS: -22,
        BROTLI_DECODER_ERROR_ALLOC_CONTEXT_MAP: -25,
        BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_1: -26,
        BROTLI_DECODER_ERROR_ALLOC_RING_BUFFER_2: -27,
        BROTLI_DECODER_ERROR_ALLOC_BLOCK_TYPE_TREES: -30,
        BROTLI_DECODER_ERROR_UNREACHABLE: -31
      }, realZlibConstants));
    },
    13118: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      const assert = __webpack_require__(39491), Buffer = __webpack_require__(14300).Buffer, realZlib = __webpack_require__(59796), constants = exports.constants = __webpack_require__(40091), Minipass = __webpack_require__(45018), OriginalBufferConcat = Buffer.concat, _superWrite = Symbol("_superWrite");
      class ZlibError extends Error {
        constructor(err) {
          super("zlib: " + err.message), this.code = err.code, this.errno = err.errno, this.code || (this.code = "ZLIB_ERROR"), 
          this.message = "zlib: " + err.message, Error.captureStackTrace(this, this.constructor);
        }
        get name() {
          return "ZlibError";
        }
      }
      const _opts = Symbol("opts"), _flushFlag = Symbol("flushFlag"), _finishFlushFlag = Symbol("finishFlushFlag"), _fullFlushFlag = Symbol("fullFlushFlag"), _handle = Symbol("handle"), _onError = Symbol("onError"), _sawError = Symbol("sawError"), _level = Symbol("level"), _strategy = Symbol("strategy"), _ended = Symbol("ended");
      Symbol("_defaultFullFlush");
      class ZlibBase extends Minipass {
        constructor(opts, mode) {
          if (!opts || "object" != typeof opts) throw new TypeError("invalid options for ZlibBase constructor");
          super(opts), this[_sawError] = !1, this[_ended] = !1, this[_opts] = opts, this[_flushFlag] = opts.flush, 
          this[_finishFlushFlag] = opts.finishFlush;
          try {
            this[_handle] = new realZlib[mode](opts);
          } catch (er) {
            throw new ZlibError(er);
          }
          this[_onError] = err => {
            this[_sawError] || (this[_sawError] = !0, this.close(), this.emit("error", err));
          }, this[_handle].on("error", (er => this[_onError](new ZlibError(er)))), this.once("end", (() => this.close));
        }
        close() {
          this[_handle] && (this[_handle].close(), this[_handle] = null, this.emit("close"));
        }
        reset() {
          if (!this[_sawError]) return assert(this[_handle], "zlib binding closed"), this[_handle].reset();
        }
        flush(flushFlag) {
          this.ended || ("number" != typeof flushFlag && (flushFlag = this[_fullFlushFlag]), 
          this.write(Object.assign(Buffer.alloc(0), {
            [_flushFlag]: flushFlag
          })));
        }
        end(chunk, encoding, cb) {
          return chunk && this.write(chunk, encoding), this.flush(this[_finishFlushFlag]), 
          this[_ended] = !0, super.end(null, null, cb);
        }
        get ended() {
          return this[_ended];
        }
        write(chunk, encoding, cb) {
          if ("function" == typeof encoding && (cb = encoding, encoding = "utf8"), "string" == typeof chunk && (chunk = Buffer.from(chunk, encoding)), 
          this[_sawError]) return;
          assert(this[_handle], "zlib binding closed");
          const nativeHandle = this[_handle]._handle, originalNativeClose = nativeHandle.close;
          nativeHandle.close = () => {};
          const originalClose = this[_handle].close;
          let result, writeReturn;
          this[_handle].close = () => {}, Buffer.concat = args => args;
          try {
            const flushFlag = "number" == typeof chunk[_flushFlag] ? chunk[_flushFlag] : this[_flushFlag];
            result = this[_handle]._processChunk(chunk, flushFlag), Buffer.concat = OriginalBufferConcat;
          } catch (err) {
            Buffer.concat = OriginalBufferConcat, this[_onError](new ZlibError(err));
          } finally {
            this[_handle] && (this[_handle]._handle = nativeHandle, nativeHandle.close = originalNativeClose, 
            this[_handle].close = originalClose, this[_handle].removeAllListeners("error"));
          }
          if (this[_handle] && this[_handle].on("error", (er => this[_onError](new ZlibError(er)))), 
          result) if (Array.isArray(result) && result.length > 0) {
            writeReturn = this[_superWrite](Buffer.from(result[0]));
            for (let i = 1; i < result.length; i++) writeReturn = this[_superWrite](result[i]);
          } else writeReturn = this[_superWrite](Buffer.from(result));
          return cb && cb(), writeReturn;
        }
        [_superWrite](data) {
          return super.write(data);
        }
      }
      class Zlib extends ZlibBase {
        constructor(opts, mode) {
          (opts = opts || {}).flush = opts.flush || constants.Z_NO_FLUSH, opts.finishFlush = opts.finishFlush || constants.Z_FINISH, 
          super(opts, mode), this[_fullFlushFlag] = constants.Z_FULL_FLUSH, this[_level] = opts.level, 
          this[_strategy] = opts.strategy;
        }
        params(level, strategy) {
          if (!this[_sawError]) {
            if (!this[_handle]) throw new Error("cannot switch params when binding is closed");
            if (!this[_handle].params) throw new Error("not supported in this implementation");
            if (this[_level] !== level || this[_strategy] !== strategy) {
              this.flush(constants.Z_SYNC_FLUSH), assert(this[_handle], "zlib binding closed");
              const origFlush = this[_handle].flush;
              this[_handle].flush = (flushFlag, cb) => {
                this.flush(flushFlag), cb();
              };
              try {
                this[_handle].params(level, strategy);
              } finally {
                this[_handle].flush = origFlush;
              }
              this[_handle] && (this[_level] = level, this[_strategy] = strategy);
            }
          }
        }
      }
      const _portable = Symbol("_portable");
      class Brotli extends ZlibBase {
        constructor(opts, mode) {
          (opts = opts || {}).flush = opts.flush || constants.BROTLI_OPERATION_PROCESS, opts.finishFlush = opts.finishFlush || constants.BROTLI_OPERATION_FINISH, 
          super(opts, mode), this[_fullFlushFlag] = constants.BROTLI_OPERATION_FLUSH;
        }
      }
      class BrotliCompress extends Brotli {
        constructor(opts) {
          super(opts, "BrotliCompress");
        }
      }
      class BrotliDecompress extends Brotli {
        constructor(opts) {
          super(opts, "BrotliDecompress");
        }
      }
      exports.Deflate = class extends Zlib {
        constructor(opts) {
          super(opts, "Deflate");
        }
      }, exports.Inflate = class extends Zlib {
        constructor(opts) {
          super(opts, "Inflate");
        }
      }, exports.Gzip = class extends Zlib {
        constructor(opts) {
          super(opts, "Gzip"), this[_portable] = opts && !!opts.portable;
        }
        [_superWrite](data) {
          return this[_portable] ? (this[_portable] = !1, data[9] = 255, super[_superWrite](data)) : super[_superWrite](data);
        }
      }, exports.Gunzip = class extends Zlib {
        constructor(opts) {
          super(opts, "Gunzip");
        }
      }, exports.DeflateRaw = class extends Zlib {
        constructor(opts) {
          super(opts, "DeflateRaw");
        }
      }, exports.InflateRaw = class extends Zlib {
        constructor(opts) {
          super(opts, "InflateRaw");
        }
      }, exports.Unzip = class extends Zlib {
        constructor(opts) {
          super(opts, "Unzip");
        }
      }, "function" == typeof realZlib.BrotliCompress ? (exports.BrotliCompress = BrotliCompress, 
      exports.BrotliDecompress = BrotliDecompress) : exports.BrotliCompress = exports.BrotliDecompress = class {
        constructor() {
          throw new Error("Brotli is not supported in this version of Node.js");
        }
      };
    },
    41718: (module, __unused_webpack_exports, __webpack_require__) => {
      const optsArg = __webpack_require__(56627), pathArg = __webpack_require__(64315), {mkdirpNative, mkdirpNativeSync} = __webpack_require__(13653), {mkdirpManual, mkdirpManualSync} = __webpack_require__(43974), {useNative, useNativeSync} = __webpack_require__(93e3), mkdirp = (path, opts) => (path = pathArg(path), 
      opts = optsArg(opts), useNative(opts) ? mkdirpNative(path, opts) : mkdirpManual(path, opts));
      mkdirp.sync = (path, opts) => (path = pathArg(path), opts = optsArg(opts), useNativeSync(opts) ? mkdirpNativeSync(path, opts) : mkdirpManualSync(path, opts)), 
      mkdirp.native = (path, opts) => mkdirpNative(pathArg(path), optsArg(opts)), mkdirp.manual = (path, opts) => mkdirpManual(pathArg(path), optsArg(opts)), 
      mkdirp.nativeSync = (path, opts) => mkdirpNativeSync(pathArg(path), optsArg(opts)), 
      mkdirp.manualSync = (path, opts) => mkdirpManualSync(pathArg(path), optsArg(opts)), 
      module.exports = mkdirp;
    },
    33408: (module, __unused_webpack_exports, __webpack_require__) => {
      const {dirname} = __webpack_require__(71017), findMade = (opts, parent, path) => path === parent ? Promise.resolve() : opts.statAsync(parent).then((st => st.isDirectory() ? path : void 0), (er => "ENOENT" === er.code ? findMade(opts, dirname(parent), parent) : void 0)), findMadeSync = (opts, parent, path) => {
        if (path !== parent) try {
          return opts.statSync(parent).isDirectory() ? path : void 0;
        } catch (er) {
          return "ENOENT" === er.code ? findMadeSync(opts, dirname(parent), parent) : void 0;
        }
      };
      module.exports = {
        findMade,
        findMadeSync
      };
    },
    43974: (module, __unused_webpack_exports, __webpack_require__) => {
      const {dirname} = __webpack_require__(71017), mkdirpManual = (path, opts, made) => {
        opts.recursive = !1;
        const parent = dirname(path);
        return parent === path ? opts.mkdirAsync(path, opts).catch((er => {
          if ("EISDIR" !== er.code) throw er;
        })) : opts.mkdirAsync(path, opts).then((() => made || path), (er => {
          if ("ENOENT" === er.code) return mkdirpManual(parent, opts).then((made => mkdirpManual(path, opts, made)));
          if ("EEXIST" !== er.code && "EROFS" !== er.code) throw er;
          return opts.statAsync(path).then((st => {
            if (st.isDirectory()) return made;
            throw er;
          }), (() => {
            throw er;
          }));
        }));
      }, mkdirpManualSync = (path, opts, made) => {
        const parent = dirname(path);
        if (opts.recursive = !1, parent === path) try {
          return opts.mkdirSync(path, opts);
        } catch (er) {
          if ("EISDIR" !== er.code) throw er;
          return;
        }
        try {
          return opts.mkdirSync(path, opts), made || path;
        } catch (er) {
          if ("ENOENT" === er.code) return mkdirpManualSync(path, opts, mkdirpManualSync(parent, opts, made));
          if ("EEXIST" !== er.code && "EROFS" !== er.code) throw er;
          try {
            if (!opts.statSync(path).isDirectory()) throw er;
          } catch (_) {
            throw er;
          }
        }
      };
      module.exports = {
        mkdirpManual,
        mkdirpManualSync
      };
    },
    13653: (module, __unused_webpack_exports, __webpack_require__) => {
      const {dirname} = __webpack_require__(71017), {findMade, findMadeSync} = __webpack_require__(33408), {mkdirpManual, mkdirpManualSync} = __webpack_require__(43974);
      module.exports = {
        mkdirpNative: (path, opts) => {
          opts.recursive = !0;
          return dirname(path) === path ? opts.mkdirAsync(path, opts) : findMade(opts, path).then((made => opts.mkdirAsync(path, opts).then((() => made)).catch((er => {
            if ("ENOENT" === er.code) return mkdirpManual(path, opts);
            throw er;
          }))));
        },
        mkdirpNativeSync: (path, opts) => {
          opts.recursive = !0;
          if (dirname(path) === path) return opts.mkdirSync(path, opts);
          const made = findMadeSync(opts, path);
          try {
            return opts.mkdirSync(path, opts), made;
          } catch (er) {
            if ("ENOENT" === er.code) return mkdirpManualSync(path, opts);
            throw er;
          }
        }
      };
    },
    56627: (module, __unused_webpack_exports, __webpack_require__) => {
      const {promisify} = __webpack_require__(73837), fs = __webpack_require__(57147);
      module.exports = opts => {
        if (opts) if ("object" == typeof opts) opts = {
          mode: 511,
          fs,
          ...opts
        }; else if ("number" == typeof opts) opts = {
          mode: opts,
          fs
        }; else {
          if ("string" != typeof opts) throw new TypeError("invalid options argument");
          opts = {
            mode: parseInt(opts, 8),
            fs
          };
        } else opts = {
          mode: 511,
          fs
        };
        return opts.mkdir = opts.mkdir || opts.fs.mkdir || fs.mkdir, opts.mkdirAsync = promisify(opts.mkdir), 
        opts.stat = opts.stat || opts.fs.stat || fs.stat, opts.statAsync = promisify(opts.stat), 
        opts.statSync = opts.statSync || opts.fs.statSync || fs.statSync, opts.mkdirSync = opts.mkdirSync || opts.fs.mkdirSync || fs.mkdirSync, 
        opts;
      };
    },
    64315: (module, __unused_webpack_exports, __webpack_require__) => {
      const platform = process.env.__TESTING_MKDIRP_PLATFORM__ || process.platform, {resolve, parse} = __webpack_require__(71017);
      module.exports = path => {
        if (/\0/.test(path)) throw Object.assign(new TypeError("path must be a string without null bytes"), {
          path,
          code: "ERR_INVALID_ARG_VALUE"
        });
        if (path = resolve(path), "win32" === platform) {
          const badWinChars = /[*|"<>?:]/, {root} = parse(path);
          if (badWinChars.test(path.substr(root.length))) throw Object.assign(new Error("Illegal characters in path."), {
            path,
            code: "EINVAL"
          });
        }
        return path;
      };
    },
    93e3: (module, __unused_webpack_exports, __webpack_require__) => {
      const fs = __webpack_require__(57147), versArr = (process.env.__TESTING_MKDIRP_NODE_VERSION__ || process.version).replace(/^v/, "").split("."), hasNative = +versArr[0] > 10 || 10 == +versArr[0] && +versArr[1] >= 12, useNative = hasNative ? opts => opts.mkdir === fs.mkdir : () => !1, useNativeSync = hasNative ? opts => opts.mkdirSync === fs.mkdirSync : () => !1;
      module.exports = {
        useNative,
        useNativeSync
      };
    },
    35680: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const hlo = __webpack_require__(6022), Pack = __webpack_require__(52846), fsm = __webpack_require__(33975), t = __webpack_require__(50121), path = __webpack_require__(71017);
      module.exports = (opt_, files, cb) => {
        if ("function" == typeof files && (cb = files), Array.isArray(opt_) && (files = opt_, 
        opt_ = {}), !files || !Array.isArray(files) || !files.length) throw new TypeError("no files or directories specified");
        files = Array.from(files);
        const opt = hlo(opt_);
        if (opt.sync && "function" == typeof cb) throw new TypeError("callback not supported for sync tar functions");
        if (!opt.file && "function" == typeof cb) throw new TypeError("callback only supported with file option");
        return opt.file && opt.sync ? createFileSync(opt, files) : opt.file ? createFile(opt, files, cb) : opt.sync ? createSync(opt, files) : create(opt, files);
      };
      const createFileSync = (opt, files) => {
        const p = new Pack.Sync(opt), stream = new fsm.WriteStreamSync(opt.file, {
          mode: opt.mode || 438
        });
        p.pipe(stream), addFilesSync(p, files);
      }, createFile = (opt, files, cb) => {
        const p = new Pack(opt), stream = new fsm.WriteStream(opt.file, {
          mode: opt.mode || 438
        });
        p.pipe(stream);
        const promise = new Promise(((res, rej) => {
          stream.on("error", rej), stream.on("close", res), p.on("error", rej);
        }));
        return addFilesAsync(p, files), cb ? promise.then(cb, cb) : promise;
      }, addFilesSync = (p, files) => {
        files.forEach((file => {
          "@" === file.charAt(0) ? t({
            file: path.resolve(p.cwd, file.substr(1)),
            sync: !0,
            noResume: !0,
            onentry: entry => p.add(entry)
          }) : p.add(file);
        })), p.end();
      }, addFilesAsync = (p, files) => {
        for (;files.length; ) {
          const file = files.shift();
          if ("@" === file.charAt(0)) return t({
            file: path.resolve(p.cwd, file.substr(1)),
            noResume: !0,
            onentry: entry => p.add(entry)
          }).then((_ => addFilesAsync(p, files)));
          p.add(file);
        }
        p.end();
      }, createSync = (opt, files) => {
        const p = new Pack.Sync(opt);
        return addFilesSync(p, files), p;
      }, create = (opt, files) => {
        const p = new Pack(opt);
        return addFilesAsync(p, files), p;
      };
    },
    10825: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const hlo = __webpack_require__(6022), Unpack = __webpack_require__(46850), fs = __webpack_require__(57147), fsm = __webpack_require__(33975), path = __webpack_require__(71017), stripSlash = __webpack_require__(13341);
      module.exports = (opt_, files, cb) => {
        "function" == typeof opt_ ? (cb = opt_, files = null, opt_ = {}) : Array.isArray(opt_) && (files = opt_, 
        opt_ = {}), "function" == typeof files && (cb = files, files = null), files = files ? Array.from(files) : [];
        const opt = hlo(opt_);
        if (opt.sync && "function" == typeof cb) throw new TypeError("callback not supported for sync tar functions");
        if (!opt.file && "function" == typeof cb) throw new TypeError("callback only supported with file option");
        return files.length && filesFilter(opt, files), opt.file && opt.sync ? extractFileSync(opt) : opt.file ? extractFile(opt, cb) : opt.sync ? extractSync(opt) : extract(opt);
      };
      const filesFilter = (opt, files) => {
        const map = new Map(files.map((f => [ stripSlash(f), !0 ]))), filter = opt.filter, mapHas = (file, r) => {
          const root = r || path.parse(file).root || ".", ret = file !== root && (map.has(file) ? map.get(file) : mapHas(path.dirname(file), root));
          return map.set(file, ret), ret;
        };
        opt.filter = filter ? (file, entry) => filter(file, entry) && mapHas(stripSlash(file)) : file => mapHas(stripSlash(file));
      }, extractFileSync = opt => {
        const u = new Unpack.Sync(opt), file = opt.file, stat = fs.statSync(file), readSize = opt.maxReadSize || 16777216;
        new fsm.ReadStreamSync(file, {
          readSize,
          size: stat.size
        }).pipe(u);
      }, extractFile = (opt, cb) => {
        const u = new Unpack(opt), readSize = opt.maxReadSize || 16777216, file = opt.file, p = new Promise(((resolve, reject) => {
          u.on("error", reject), u.on("close", resolve), fs.stat(file, ((er, stat) => {
            if (er) reject(er); else {
              const stream = new fsm.ReadStream(file, {
                readSize,
                size: stat.size
              });
              stream.on("error", reject), stream.pipe(u);
            }
          }));
        }));
        return cb ? p.then(cb, cb) : p;
      }, extractSync = opt => new Unpack.Sync(opt), extract = opt => new Unpack(opt);
    },
    64696: (module, __unused_webpack_exports, __webpack_require__) => {
      const isWindows = "win32" === (process.env.__FAKE_PLATFORM__ || process.platform), fs = global.__FAKE_TESTING_FS__ || __webpack_require__(57147), {O_CREAT, O_TRUNC, O_WRONLY, UV_FS_O_FILEMAP = 0} = fs.constants, fMapEnabled = isWindows && !!UV_FS_O_FILEMAP, fMapFlag = UV_FS_O_FILEMAP | O_TRUNC | O_CREAT | O_WRONLY;
      module.exports = fMapEnabled ? size => size < 524288 ? fMapFlag : "w" : () => "w";
    },
    63389: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const types = __webpack_require__(15156), pathModule = __webpack_require__(71017).posix, large = __webpack_require__(35116), SLURP = Symbol("slurp"), TYPE = Symbol("type");
      const splitPrefix = (p, prefixSize) => {
        let ret, pp = p, prefix = "";
        const root = pathModule.parse(p).root || ".";
        if (Buffer.byteLength(pp) < 100) ret = [ pp, prefix, !1 ]; else {
          prefix = pathModule.dirname(pp), pp = pathModule.basename(pp);
          do {
            Buffer.byteLength(pp) <= 100 && Buffer.byteLength(prefix) <= prefixSize ? ret = [ pp, prefix, !1 ] : Buffer.byteLength(pp) > 100 && Buffer.byteLength(prefix) <= prefixSize ? ret = [ pp.substr(0, 99), prefix, !0 ] : (pp = pathModule.join(pathModule.basename(prefix), pp), 
            prefix = pathModule.dirname(prefix));
          } while (prefix !== root && !ret);
          ret || (ret = [ p.substr(0, 99), "", !0 ]);
        }
        return ret;
      }, decString = (buf, off, size) => buf.slice(off, off + size).toString("utf8").replace(/\0.*/, ""), decDate = (buf, off, size) => numToDate(decNumber(buf, off, size)), numToDate = num => null === num ? null : new Date(1e3 * num), decNumber = (buf, off, size) => 128 & buf[off] ? large.parse(buf.slice(off, off + size)) : decSmallNumber(buf, off, size), decSmallNumber = (buf, off, size) => {
        return value = parseInt(buf.slice(off, off + size).toString("utf8").replace(/\0.*$/, "").trim(), 8), 
        isNaN(value) ? null : value;
        var value;
      }, MAXNUM = {
        12: 8589934591,
        8: 2097151
      }, encNumber = (buf, off, size, number) => null !== number && (number > MAXNUM[size] || number < 0 ? (large.encode(number, buf.slice(off, off + size)), 
      !0) : (encSmallNumber(buf, off, size, number), !1)), encSmallNumber = (buf, off, size, number) => buf.write(octalString(number, size), off, size, "ascii"), octalString = (number, size) => padOctal(Math.floor(number).toString(8), size), padOctal = (string, size) => (string.length === size - 1 ? string : new Array(size - string.length - 1).join("0") + string + " ") + "\0", encDate = (buf, off, size, date) => null !== date && encNumber(buf, off, size, date.getTime() / 1e3), NULLS = new Array(156).join("\0"), encString = (buf, off, size, string) => null !== string && (buf.write(string + NULLS, off, size, "utf8"), 
      string.length !== Buffer.byteLength(string) || string.length > size);
      module.exports = class {
        constructor(data, off, ex, gex) {
          this.cksumValid = !1, this.needPax = !1, this.nullBlock = !1, this.block = null, 
          this.path = null, this.mode = null, this.uid = null, this.gid = null, this.size = null, 
          this.mtime = null, this.cksum = null, this[TYPE] = "0", this.linkpath = null, this.uname = null, 
          this.gname = null, this.devmaj = 0, this.devmin = 0, this.atime = null, this.ctime = null, 
          Buffer.isBuffer(data) ? this.decode(data, off || 0, ex, gex) : data && this.set(data);
        }
        decode(buf, off, ex, gex) {
          if (off || (off = 0), !(buf && buf.length >= off + 512)) throw new Error("need 512 bytes for header");
          if (this.path = decString(buf, off, 100), this.mode = decNumber(buf, off + 100, 8), 
          this.uid = decNumber(buf, off + 108, 8), this.gid = decNumber(buf, off + 116, 8), 
          this.size = decNumber(buf, off + 124, 12), this.mtime = decDate(buf, off + 136, 12), 
          this.cksum = decNumber(buf, off + 148, 12), this[SLURP](ex), this[SLURP](gex, !0), 
          this[TYPE] = decString(buf, off + 156, 1), "" === this[TYPE] && (this[TYPE] = "0"), 
          "0" === this[TYPE] && "/" === this.path.substr(-1) && (this[TYPE] = "5"), "5" === this[TYPE] && (this.size = 0), 
          this.linkpath = decString(buf, off + 157, 100), "ustar\x0000" === buf.slice(off + 257, off + 265).toString()) if (this.uname = decString(buf, off + 265, 32), 
          this.gname = decString(buf, off + 297, 32), this.devmaj = decNumber(buf, off + 329, 8), 
          this.devmin = decNumber(buf, off + 337, 8), 0 !== buf[off + 475]) {
            const prefix = decString(buf, off + 345, 155);
            this.path = prefix + "/" + this.path;
          } else {
            const prefix = decString(buf, off + 345, 130);
            prefix && (this.path = prefix + "/" + this.path), this.atime = decDate(buf, off + 476, 12), 
            this.ctime = decDate(buf, off + 488, 12);
          }
          let sum = 256;
          for (let i = off; i < off + 148; i++) sum += buf[i];
          for (let i = off + 156; i < off + 512; i++) sum += buf[i];
          this.cksumValid = sum === this.cksum, null === this.cksum && 256 === sum && (this.nullBlock = !0);
        }
        [SLURP](ex, global) {
          for (const k in ex) null === ex[k] || void 0 === ex[k] || global && "path" === k || (this[k] = ex[k]);
        }
        encode(buf, off) {
          if (buf || (buf = this.block = Buffer.alloc(512), off = 0), off || (off = 0), !(buf.length >= off + 512)) throw new Error("need 512 bytes for header");
          const prefixSize = this.ctime || this.atime ? 130 : 155, split = splitPrefix(this.path || "", prefixSize), path = split[0], prefix = split[1];
          this.needPax = split[2], this.needPax = encString(buf, off, 100, path) || this.needPax, 
          this.needPax = encNumber(buf, off + 100, 8, this.mode) || this.needPax, this.needPax = encNumber(buf, off + 108, 8, this.uid) || this.needPax, 
          this.needPax = encNumber(buf, off + 116, 8, this.gid) || this.needPax, this.needPax = encNumber(buf, off + 124, 12, this.size) || this.needPax, 
          this.needPax = encDate(buf, off + 136, 12, this.mtime) || this.needPax, buf[off + 156] = this[TYPE].charCodeAt(0), 
          this.needPax = encString(buf, off + 157, 100, this.linkpath) || this.needPax, buf.write("ustar\x0000", off + 257, 8), 
          this.needPax = encString(buf, off + 265, 32, this.uname) || this.needPax, this.needPax = encString(buf, off + 297, 32, this.gname) || this.needPax, 
          this.needPax = encNumber(buf, off + 329, 8, this.devmaj) || this.needPax, this.needPax = encNumber(buf, off + 337, 8, this.devmin) || this.needPax, 
          this.needPax = encString(buf, off + 345, prefixSize, prefix) || this.needPax, 0 !== buf[off + 475] ? this.needPax = encString(buf, off + 345, 155, prefix) || this.needPax : (this.needPax = encString(buf, off + 345, 130, prefix) || this.needPax, 
          this.needPax = encDate(buf, off + 476, 12, this.atime) || this.needPax, this.needPax = encDate(buf, off + 488, 12, this.ctime) || this.needPax);
          let sum = 256;
          for (let i = off; i < off + 148; i++) sum += buf[i];
          for (let i = off + 156; i < off + 512; i++) sum += buf[i];
          return this.cksum = sum, encNumber(buf, off + 148, 8, this.cksum), this.cksumValid = !0, 
          this.needPax;
        }
        set(data) {
          for (const i in data) null !== data[i] && void 0 !== data[i] && (this[i] = data[i]);
        }
        get type() {
          return types.name.get(this[TYPE]) || this[TYPE];
        }
        get typeKey() {
          return this[TYPE];
        }
        set type(type) {
          types.code.has(type) ? this[TYPE] = types.code.get(type) : this[TYPE] = type;
        }
      };
    },
    6022: module => {
      "use strict";
      const argmap = new Map([ [ "C", "cwd" ], [ "f", "file" ], [ "z", "gzip" ], [ "P", "preservePaths" ], [ "U", "unlink" ], [ "strip-components", "strip" ], [ "stripComponents", "strip" ], [ "keep-newer", "newer" ], [ "keepNewer", "newer" ], [ "keep-newer-files", "newer" ], [ "keepNewerFiles", "newer" ], [ "k", "keep" ], [ "keep-existing", "keep" ], [ "keepExisting", "keep" ], [ "m", "noMtime" ], [ "no-mtime", "noMtime" ], [ "p", "preserveOwner" ], [ "L", "follow" ], [ "h", "follow" ] ]);
      module.exports = opt => opt ? Object.keys(opt).map((k => [ argmap.has(k) ? argmap.get(k) : k, opt[k] ])).reduce(((set, kv) => (set[kv[0]] = kv[1], 
      set)), Object.create(null)) : {};
    },
    35116: module => {
      "use strict";
      const encodePositive = (num, buf) => {
        buf[0] = 128;
        for (var i = buf.length; i > 1; i--) buf[i - 1] = 255 & num, num = Math.floor(num / 256);
      }, encodeNegative = (num, buf) => {
        buf[0] = 255;
        var flipped = !1;
        num *= -1;
        for (var i = buf.length; i > 1; i--) {
          var byte = 255 & num;
          num = Math.floor(num / 256), flipped ? buf[i - 1] = onesComp(byte) : 0 === byte ? buf[i - 1] = 0 : (flipped = !0, 
          buf[i - 1] = twosComp(byte));
        }
      }, twos = buf => {
        for (var len = buf.length, sum = 0, flipped = !1, i = len - 1; i > -1; i--) {
          var f, byte = buf[i];
          flipped ? f = onesComp(byte) : 0 === byte ? f = byte : (flipped = !0, f = twosComp(byte)), 
          0 !== f && (sum -= f * Math.pow(256, len - i - 1));
        }
        return sum;
      }, pos = buf => {
        for (var len = buf.length, sum = 0, i = len - 1; i > -1; i--) {
          var byte = buf[i];
          0 !== byte && (sum += byte * Math.pow(256, len - i - 1));
        }
        return sum;
      }, onesComp = byte => 255 & (255 ^ byte), twosComp = byte => 1 + (255 ^ byte) & 255;
      module.exports = {
        encode: (num, buf) => {
          if (!Number.isSafeInteger(num)) throw Error("cannot encode number outside of javascript safe integer range");
          return num < 0 ? encodeNegative(num, buf) : encodePositive(num, buf), buf;
        },
        parse: buf => {
          const pre = buf[0], value = 128 === pre ? pos(buf.slice(1, buf.length)) : 255 === pre ? twos(buf) : null;
          if (null === value) throw Error("invalid base256 encoding");
          if (!Number.isSafeInteger(value)) throw Error("parsed number outside of javascript safe integer range");
          return value;
        }
      };
    },
    50121: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const hlo = __webpack_require__(6022), Parser = __webpack_require__(34075), fs = __webpack_require__(57147), fsm = __webpack_require__(33975), path = __webpack_require__(71017), stripSlash = __webpack_require__(13341);
      module.exports = (opt_, files, cb) => {
        "function" == typeof opt_ ? (cb = opt_, files = null, opt_ = {}) : Array.isArray(opt_) && (files = opt_, 
        opt_ = {}), "function" == typeof files && (cb = files, files = null), files = files ? Array.from(files) : [];
        const opt = hlo(opt_);
        if (opt.sync && "function" == typeof cb) throw new TypeError("callback not supported for sync tar functions");
        if (!opt.file && "function" == typeof cb) throw new TypeError("callback only supported with file option");
        return files.length && filesFilter(opt, files), opt.noResume || onentryFunction(opt), 
        opt.file && opt.sync ? listFileSync(opt) : opt.file ? listFile(opt, cb) : list(opt);
      };
      const onentryFunction = opt => {
        const onentry = opt.onentry;
        opt.onentry = onentry ? e => {
          onentry(e), e.resume();
        } : e => e.resume();
      }, filesFilter = (opt, files) => {
        const map = new Map(files.map((f => [ stripSlash(f), !0 ]))), filter = opt.filter, mapHas = (file, r) => {
          const root = r || path.parse(file).root || ".", ret = file !== root && (map.has(file) ? map.get(file) : mapHas(path.dirname(file), root));
          return map.set(file, ret), ret;
        };
        opt.filter = filter ? (file, entry) => filter(file, entry) && mapHas(stripSlash(file)) : file => mapHas(stripSlash(file));
      }, listFileSync = opt => {
        const p = list(opt), file = opt.file;
        let fd, threw = !0;
        try {
          const stat = fs.statSync(file), readSize = opt.maxReadSize || 16777216;
          if (stat.size < readSize) p.end(fs.readFileSync(file)); else {
            let pos = 0;
            const buf = Buffer.allocUnsafe(readSize);
            for (fd = fs.openSync(file, "r"); pos < stat.size; ) {
              const bytesRead = fs.readSync(fd, buf, 0, readSize, pos);
              pos += bytesRead, p.write(buf.slice(0, bytesRead));
            }
            p.end();
          }
          threw = !1;
        } finally {
          if (threw && fd) try {
            fs.closeSync(fd);
          } catch (er) {}
        }
      }, listFile = (opt, cb) => {
        const parse = new Parser(opt), readSize = opt.maxReadSize || 16777216, file = opt.file, p = new Promise(((resolve, reject) => {
          parse.on("error", reject), parse.on("end", resolve), fs.stat(file, ((er, stat) => {
            if (er) reject(er); else {
              const stream = new fsm.ReadStream(file, {
                readSize,
                size: stat.size
              });
              stream.on("error", reject), stream.pipe(parse);
            }
          }));
        }));
        return cb ? p.then(cb, cb) : p;
      }, list = opt => new Parser(opt);
    },
    55035: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const mkdirp = __webpack_require__(41718), fs = __webpack_require__(57147), path = __webpack_require__(71017), chownr = __webpack_require__(13159), normPath = __webpack_require__(24509);
      class SymlinkError extends Error {
        constructor(symlink, path) {
          super("Cannot extract through symbolic link"), this.path = path, this.symlink = symlink;
        }
        get name() {
          return "SylinkError";
        }
      }
      class CwdError extends Error {
        constructor(path, code) {
          super(code + ": Cannot cd into '" + path + "'"), this.path = path, this.code = code;
        }
        get name() {
          return "CwdError";
        }
      }
      const cGet = (cache, key) => cache.get(normPath(key)), cSet = (cache, key, val) => cache.set(normPath(key), val);
      module.exports = (dir, opt, cb) => {
        dir = normPath(dir);
        const umask = opt.umask, mode = 448 | opt.mode, needChmod = 0 != (mode & umask), uid = opt.uid, gid = opt.gid, doChown = "number" == typeof uid && "number" == typeof gid && (uid !== opt.processUid || gid !== opt.processGid), preserve = opt.preserve, unlink = opt.unlink, cache = opt.cache, cwd = normPath(opt.cwd), done = (er, created) => {
          er ? cb(er) : (cSet(cache, dir, !0), created && doChown ? chownr(created, uid, gid, (er => done(er))) : needChmod ? fs.chmod(dir, mode, cb) : cb());
        };
        if (cache && !0 === cGet(cache, dir)) return done();
        if (dir === cwd) return ((dir, cb) => {
          fs.stat(dir, ((er, st) => {
            !er && st.isDirectory() || (er = new CwdError(dir, er && er.code || "ENOTDIR")), 
            cb(er);
          }));
        })(dir, done);
        if (preserve) return mkdirp(dir, {
          mode
        }).then((made => done(null, made)), done);
        const parts = normPath(path.relative(cwd, dir)).split("/");
        mkdir_(cwd, parts, mode, cache, unlink, cwd, null, done);
      };
      const mkdir_ = (base, parts, mode, cache, unlink, cwd, created, cb) => {
        if (!parts.length) return cb(null, created);
        const p = parts.shift(), part = normPath(path.resolve(base + "/" + p));
        if (cGet(cache, part)) return mkdir_(part, parts, mode, cache, unlink, cwd, created, cb);
        fs.mkdir(part, mode, onmkdir(part, parts, mode, cache, unlink, cwd, created, cb));
      }, onmkdir = (part, parts, mode, cache, unlink, cwd, created, cb) => er => {
        er ? fs.lstat(part, ((statEr, st) => {
          if (statEr) statEr.path = statEr.path && normPath(statEr.path), cb(statEr); else if (st.isDirectory()) mkdir_(part, parts, mode, cache, unlink, cwd, created, cb); else if (unlink) fs.unlink(part, (er => {
            if (er) return cb(er);
            fs.mkdir(part, mode, onmkdir(part, parts, mode, cache, unlink, cwd, created, cb));
          })); else {
            if (st.isSymbolicLink()) return cb(new SymlinkError(part, part + "/" + parts.join("/")));
            cb(er);
          }
        })) : mkdir_(part, parts, mode, cache, unlink, cwd, created = created || part, cb);
      };
      module.exports.sync = (dir, opt) => {
        dir = normPath(dir);
        const umask = opt.umask, mode = 448 | opt.mode, needChmod = 0 != (mode & umask), uid = opt.uid, gid = opt.gid, doChown = "number" == typeof uid && "number" == typeof gid && (uid !== opt.processUid || gid !== opt.processGid), preserve = opt.preserve, unlink = opt.unlink, cache = opt.cache, cwd = normPath(opt.cwd), done = created => {
          cSet(cache, dir, !0), created && doChown && chownr.sync(created, uid, gid), needChmod && fs.chmodSync(dir, mode);
        };
        if (cache && !0 === cGet(cache, dir)) return done();
        if (dir === cwd) return (dir => {
          let ok = !1, code = "ENOTDIR";
          try {
            ok = fs.statSync(dir).isDirectory();
          } catch (er) {
            code = er.code;
          } finally {
            if (!ok) throw new CwdError(dir, code);
          }
        })(cwd), done();
        if (preserve) return done(mkdirp.sync(dir, mode));
        const parts = normPath(path.relative(cwd, dir)).split("/");
        let created = null;
        for (let p = parts.shift(), part = cwd; p && (part += "/" + p); p = parts.shift()) if (part = normPath(path.resolve(part)), 
        !cGet(cache, part)) try {
          fs.mkdirSync(part, mode), created = created || part, cSet(cache, part, !0);
        } catch (er) {
          const st = fs.lstatSync(part);
          if (st.isDirectory()) {
            cSet(cache, part, !0);
            continue;
          }
          if (unlink) {
            fs.unlinkSync(part), fs.mkdirSync(part, mode), created = created || part, cSet(cache, part, !0);
            continue;
          }
          if (st.isSymbolicLink()) return new SymlinkError(part, part + "/" + parts.join("/"));
        }
        return done(created);
      };
    },
    12735: module => {
      "use strict";
      module.exports = (mode, isDir, portable) => (mode &= 4095, portable && (mode = -19 & (384 | mode)), 
      isDir && (256 & mode && (mode |= 64), 32 & mode && (mode |= 8), 4 & mode && (mode |= 1)), 
      mode);
    },
    40661: module => {
      const normalizeCache = Object.create(null), {hasOwnProperty} = Object.prototype;
      module.exports = s => (hasOwnProperty.call(normalizeCache, s) || (normalizeCache[s] = s.normalize("NFKD")), 
      normalizeCache[s]);
    },
    24509: module => {
      const platform = process.env.TESTING_TAR_FAKE_PLATFORM || process.platform;
      module.exports = "win32" !== platform ? p => p : p => p && p.replace(/\\/g, "/");
    },
    52846: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      class PackJob {
        constructor(path, absolute) {
          this.path = path || "./", this.absolute = absolute, this.entry = null, this.stat = null, 
          this.readdir = null, this.pending = !1, this.ignore = !1, this.piped = !1;
        }
      }
      const MiniPass = __webpack_require__(45018), zlib = __webpack_require__(13118), ReadEntry = __webpack_require__(8646), WriteEntry = __webpack_require__(99411), WriteEntrySync = WriteEntry.Sync, WriteEntryTar = WriteEntry.Tar, Yallist = __webpack_require__(33836), EOF = Buffer.alloc(1024), ONSTAT = Symbol("onStat"), ENDED = Symbol("ended"), QUEUE = Symbol("queue"), CURRENT = Symbol("current"), PROCESS = Symbol("process"), PROCESSING = Symbol("processing"), PROCESSJOB = Symbol("processJob"), JOBS = Symbol("jobs"), JOBDONE = Symbol("jobDone"), ADDFSENTRY = Symbol("addFSEntry"), ADDTARENTRY = Symbol("addTarEntry"), STAT = Symbol("stat"), READDIR = Symbol("readdir"), ONREADDIR = Symbol("onreaddir"), PIPE = Symbol("pipe"), ENTRY = Symbol("entry"), ENTRYOPT = Symbol("entryOpt"), WRITEENTRYCLASS = Symbol("writeEntryClass"), WRITE = Symbol("write"), ONDRAIN = Symbol("ondrain"), fs = __webpack_require__(57147), path = __webpack_require__(71017), warner = __webpack_require__(48685), normPath = __webpack_require__(24509), Pack = warner(class extends MiniPass {
        constructor(opt) {
          super(opt), opt = opt || Object.create(null), this.opt = opt, this.file = opt.file || "", 
          this.cwd = opt.cwd || process.cwd(), this.maxReadSize = opt.maxReadSize, this.preservePaths = !!opt.preservePaths, 
          this.strict = !!opt.strict, this.noPax = !!opt.noPax, this.prefix = normPath(opt.prefix || ""), 
          this.linkCache = opt.linkCache || new Map, this.statCache = opt.statCache || new Map, 
          this.readdirCache = opt.readdirCache || new Map, this[WRITEENTRYCLASS] = WriteEntry, 
          "function" == typeof opt.onwarn && this.on("warn", opt.onwarn), this.portable = !!opt.portable, 
          this.zip = null, opt.gzip ? ("object" != typeof opt.gzip && (opt.gzip = {}), this.portable && (opt.gzip.portable = !0), 
          this.zip = new zlib.Gzip(opt.gzip), this.zip.on("data", (chunk => super.write(chunk))), 
          this.zip.on("end", (_ => super.end())), this.zip.on("drain", (_ => this[ONDRAIN]())), 
          this.on("resume", (_ => this.zip.resume()))) : this.on("drain", this[ONDRAIN]), 
          this.noDirRecurse = !!opt.noDirRecurse, this.follow = !!opt.follow, this.noMtime = !!opt.noMtime, 
          this.mtime = opt.mtime || null, this.filter = "function" == typeof opt.filter ? opt.filter : _ => !0, 
          this[QUEUE] = new Yallist, this[JOBS] = 0, this.jobs = +opt.jobs || 4, this[PROCESSING] = !1, 
          this[ENDED] = !1;
        }
        [WRITE](chunk) {
          return super.write(chunk);
        }
        add(path) {
          return this.write(path), this;
        }
        end(path) {
          return path && this.write(path), this[ENDED] = !0, this[PROCESS](), this;
        }
        write(path) {
          if (this[ENDED]) throw new Error("write after end");
          return path instanceof ReadEntry ? this[ADDTARENTRY](path) : this[ADDFSENTRY](path), 
          this.flowing;
        }
        [ADDTARENTRY](p) {
          const absolute = normPath(path.resolve(this.cwd, p.path));
          if (this.filter(p.path, p)) {
            const job = new PackJob(p.path, absolute, !1);
            job.entry = new WriteEntryTar(p, this[ENTRYOPT](job)), job.entry.on("end", (_ => this[JOBDONE](job))), 
            this[JOBS] += 1, this[QUEUE].push(job);
          } else p.resume();
          this[PROCESS]();
        }
        [ADDFSENTRY](p) {
          const absolute = normPath(path.resolve(this.cwd, p));
          this[QUEUE].push(new PackJob(p, absolute)), this[PROCESS]();
        }
        [STAT](job) {
          job.pending = !0, this[JOBS] += 1;
          const stat = this.follow ? "stat" : "lstat";
          fs[stat](job.absolute, ((er, stat) => {
            job.pending = !1, this[JOBS] -= 1, er ? this.emit("error", er) : this[ONSTAT](job, stat);
          }));
        }
        [ONSTAT](job, stat) {
          this.statCache.set(job.absolute, stat), job.stat = stat, this.filter(job.path, stat) || (job.ignore = !0), 
          this[PROCESS]();
        }
        [READDIR](job) {
          job.pending = !0, this[JOBS] += 1, fs.readdir(job.absolute, ((er, entries) => {
            if (job.pending = !1, this[JOBS] -= 1, er) return this.emit("error", er);
            this[ONREADDIR](job, entries);
          }));
        }
        [ONREADDIR](job, entries) {
          this.readdirCache.set(job.absolute, entries), job.readdir = entries, this[PROCESS]();
        }
        [PROCESS]() {
          if (!this[PROCESSING]) {
            this[PROCESSING] = !0;
            for (let w = this[QUEUE].head; null !== w && this[JOBS] < this.jobs; w = w.next) if (this[PROCESSJOB](w.value), 
            w.value.ignore) {
              const p = w.next;
              this[QUEUE].removeNode(w), w.next = p;
            }
            this[PROCESSING] = !1, this[ENDED] && !this[QUEUE].length && 0 === this[JOBS] && (this.zip ? this.zip.end(EOF) : (super.write(EOF), 
            super.end()));
          }
        }
        get [CURRENT]() {
          return this[QUEUE] && this[QUEUE].head && this[QUEUE].head.value;
        }
        [JOBDONE](job) {
          this[QUEUE].shift(), this[JOBS] -= 1, this[PROCESS]();
        }
        [PROCESSJOB](job) {
          job.pending || (job.entry ? job !== this[CURRENT] || job.piped || this[PIPE](job) : (job.stat || (this.statCache.has(job.absolute) ? this[ONSTAT](job, this.statCache.get(job.absolute)) : this[STAT](job)), 
          job.stat && (job.ignore || (this.noDirRecurse || !job.stat.isDirectory() || job.readdir || (this.readdirCache.has(job.absolute) ? this[ONREADDIR](job, this.readdirCache.get(job.absolute)) : this[READDIR](job), 
          job.readdir)) && (job.entry = this[ENTRY](job), job.entry ? job !== this[CURRENT] || job.piped || this[PIPE](job) : job.ignore = !0))));
        }
        [ENTRYOPT](job) {
          return {
            onwarn: (code, msg, data) => this.warn(code, msg, data),
            noPax: this.noPax,
            cwd: this.cwd,
            absolute: job.absolute,
            preservePaths: this.preservePaths,
            maxReadSize: this.maxReadSize,
            strict: this.strict,
            portable: this.portable,
            linkCache: this.linkCache,
            statCache: this.statCache,
            noMtime: this.noMtime,
            mtime: this.mtime,
            prefix: this.prefix
          };
        }
        [ENTRY](job) {
          this[JOBS] += 1;
          try {
            return new this[WRITEENTRYCLASS](job.path, this[ENTRYOPT](job)).on("end", (() => this[JOBDONE](job))).on("error", (er => this.emit("error", er)));
          } catch (er) {
            this.emit("error", er);
          }
        }
        [ONDRAIN]() {
          this[CURRENT] && this[CURRENT].entry && this[CURRENT].entry.resume();
        }
        [PIPE](job) {
          job.piped = !0, job.readdir && job.readdir.forEach((entry => {
            const p = job.path, base = "./" === p ? "" : p.replace(/\/*$/, "/");
            this[ADDFSENTRY](base + entry);
          }));
          const source = job.entry, zip = this.zip;
          zip ? source.on("data", (chunk => {
            zip.write(chunk) || source.pause();
          })) : source.on("data", (chunk => {
            super.write(chunk) || source.pause();
          }));
        }
        pause() {
          return this.zip && this.zip.pause(), super.pause();
        }
      });
      Pack.Sync = class extends Pack {
        constructor(opt) {
          super(opt), this[WRITEENTRYCLASS] = WriteEntrySync;
        }
        pause() {}
        resume() {}
        [STAT](job) {
          const stat = this.follow ? "statSync" : "lstatSync";
          this[ONSTAT](job, fs[stat](job.absolute));
        }
        [READDIR](job, stat) {
          this[ONREADDIR](job, fs.readdirSync(job.absolute));
        }
        [PIPE](job) {
          const source = job.entry, zip = this.zip;
          job.readdir && job.readdir.forEach((entry => {
            const p = job.path, base = "./" === p ? "" : p.replace(/\/*$/, "/");
            this[ADDFSENTRY](base + entry);
          })), zip ? source.on("data", (chunk => {
            zip.write(chunk);
          })) : source.on("data", (chunk => {
            super[WRITE](chunk);
          }));
        }
      }, module.exports = Pack;
    },
    34075: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const warner = __webpack_require__(48685), Header = __webpack_require__(63389), EE = __webpack_require__(82361), Yallist = __webpack_require__(33836), Entry = __webpack_require__(8646), Pax = __webpack_require__(53224), zlib = __webpack_require__(13118), gzipHeader = Buffer.from([ 31, 139 ]), STATE = Symbol("state"), WRITEENTRY = Symbol("writeEntry"), READENTRY = Symbol("readEntry"), NEXTENTRY = Symbol("nextEntry"), PROCESSENTRY = Symbol("processEntry"), EX = Symbol("extendedHeader"), GEX = Symbol("globalExtendedHeader"), META = Symbol("meta"), EMITMETA = Symbol("emitMeta"), BUFFER = Symbol("buffer"), QUEUE = Symbol("queue"), ENDED = Symbol("ended"), EMITTEDEND = Symbol("emittedEnd"), EMIT = Symbol("emit"), UNZIP = Symbol("unzip"), CONSUMECHUNK = Symbol("consumeChunk"), CONSUMECHUNKSUB = Symbol("consumeChunkSub"), CONSUMEBODY = Symbol("consumeBody"), CONSUMEMETA = Symbol("consumeMeta"), CONSUMEHEADER = Symbol("consumeHeader"), CONSUMING = Symbol("consuming"), BUFFERCONCAT = Symbol("bufferConcat"), MAYBEEND = Symbol("maybeEnd"), WRITING = Symbol("writing"), ABORTED = Symbol("aborted"), DONE = Symbol("onDone"), SAW_VALID_ENTRY = Symbol("sawValidEntry"), SAW_NULL_BLOCK = Symbol("sawNullBlock"), SAW_EOF = Symbol("sawEOF"), noop = _ => !0;
      module.exports = warner(class extends EE {
        constructor(opt) {
          super(opt = opt || {}), this.file = opt.file || "", this[SAW_VALID_ENTRY] = null, 
          this.on(DONE, (_ => {
            "begin" !== this[STATE] && !1 !== this[SAW_VALID_ENTRY] || this.warn("TAR_BAD_ARCHIVE", "Unrecognized archive format");
          })), opt.ondone ? this.on(DONE, opt.ondone) : this.on(DONE, (_ => {
            this.emit("prefinish"), this.emit("finish"), this.emit("end"), this.emit("close");
          })), this.strict = !!opt.strict, this.maxMetaEntrySize = opt.maxMetaEntrySize || 1048576, 
          this.filter = "function" == typeof opt.filter ? opt.filter : noop, this.writable = !0, 
          this.readable = !1, this[QUEUE] = new Yallist, this[BUFFER] = null, this[READENTRY] = null, 
          this[WRITEENTRY] = null, this[STATE] = "begin", this[META] = "", this[EX] = null, 
          this[GEX] = null, this[ENDED] = !1, this[UNZIP] = null, this[ABORTED] = !1, this[SAW_NULL_BLOCK] = !1, 
          this[SAW_EOF] = !1, "function" == typeof opt.onwarn && this.on("warn", opt.onwarn), 
          "function" == typeof opt.onentry && this.on("entry", opt.onentry);
        }
        [CONSUMEHEADER](chunk, position) {
          let header;
          null === this[SAW_VALID_ENTRY] && (this[SAW_VALID_ENTRY] = !1);
          try {
            header = new Header(chunk, position, this[EX], this[GEX]);
          } catch (er) {
            return this.warn("TAR_ENTRY_INVALID", er);
          }
          if (header.nullBlock) this[SAW_NULL_BLOCK] ? (this[SAW_EOF] = !0, "begin" === this[STATE] && (this[STATE] = "header"), 
          this[EMIT]("eof")) : (this[SAW_NULL_BLOCK] = !0, this[EMIT]("nullBlock")); else if (this[SAW_NULL_BLOCK] = !1, 
          header.cksumValid) if (header.path) {
            const type = header.type;
            if (/^(Symbolic)?Link$/.test(type) && !header.linkpath) this.warn("TAR_ENTRY_INVALID", "linkpath required", {
              header
            }); else if (!/^(Symbolic)?Link$/.test(type) && header.linkpath) this.warn("TAR_ENTRY_INVALID", "linkpath forbidden", {
              header
            }); else {
              const entry = this[WRITEENTRY] = new Entry(header, this[EX], this[GEX]);
              if (!this[SAW_VALID_ENTRY]) if (entry.remain) {
                const onend = () => {
                  entry.invalid || (this[SAW_VALID_ENTRY] = !0);
                };
                entry.on("end", onend);
              } else this[SAW_VALID_ENTRY] = !0;
              entry.meta ? entry.size > this.maxMetaEntrySize ? (entry.ignore = !0, this[EMIT]("ignoredEntry", entry), 
              this[STATE] = "ignore", entry.resume()) : entry.size > 0 && (this[META] = "", entry.on("data", (c => this[META] += c)), 
              this[STATE] = "meta") : (this[EX] = null, entry.ignore = entry.ignore || !this.filter(entry.path, entry), 
              entry.ignore ? (this[EMIT]("ignoredEntry", entry), this[STATE] = entry.remain ? "ignore" : "header", 
              entry.resume()) : (entry.remain ? this[STATE] = "body" : (this[STATE] = "header", 
              entry.end()), this[READENTRY] ? this[QUEUE].push(entry) : (this[QUEUE].push(entry), 
              this[NEXTENTRY]())));
            }
          } else this.warn("TAR_ENTRY_INVALID", "path is required", {
            header
          }); else this.warn("TAR_ENTRY_INVALID", "checksum failure", {
            header
          });
        }
        [PROCESSENTRY](entry) {
          let go = !0;
          return entry ? Array.isArray(entry) ? this.emit.apply(this, entry) : (this[READENTRY] = entry, 
          this.emit("entry", entry), entry.emittedEnd || (entry.on("end", (_ => this[NEXTENTRY]())), 
          go = !1)) : (this[READENTRY] = null, go = !1), go;
        }
        [NEXTENTRY]() {
          do {} while (this[PROCESSENTRY](this[QUEUE].shift()));
          if (!this[QUEUE].length) {
            const re = this[READENTRY];
            !re || re.flowing || re.size === re.remain ? this[WRITING] || this.emit("drain") : re.once("drain", (_ => this.emit("drain")));
          }
        }
        [CONSUMEBODY](chunk, position) {
          const entry = this[WRITEENTRY], br = entry.blockRemain, c = br >= chunk.length && 0 === position ? chunk : chunk.slice(position, position + br);
          return entry.write(c), entry.blockRemain || (this[STATE] = "header", this[WRITEENTRY] = null, 
          entry.end()), c.length;
        }
        [CONSUMEMETA](chunk, position) {
          const entry = this[WRITEENTRY], ret = this[CONSUMEBODY](chunk, position);
          return this[WRITEENTRY] || this[EMITMETA](entry), ret;
        }
        [EMIT](ev, data, extra) {
          this[QUEUE].length || this[READENTRY] ? this[QUEUE].push([ ev, data, extra ]) : this.emit(ev, data, extra);
        }
        [EMITMETA](entry) {
          switch (this[EMIT]("meta", this[META]), entry.type) {
           case "ExtendedHeader":
           case "OldExtendedHeader":
            this[EX] = Pax.parse(this[META], this[EX], !1);
            break;

           case "GlobalExtendedHeader":
            this[GEX] = Pax.parse(this[META], this[GEX], !0);
            break;

           case "NextFileHasLongPath":
           case "OldGnuLongPath":
            this[EX] = this[EX] || Object.create(null), this[EX].path = this[META].replace(/\0.*/, "");
            break;

           case "NextFileHasLongLinkpath":
            this[EX] = this[EX] || Object.create(null), this[EX].linkpath = this[META].replace(/\0.*/, "");
            break;

           default:
            throw new Error("unknown meta: " + entry.type);
          }
        }
        abort(error) {
          this[ABORTED] = !0, this.emit("abort", error), this.warn("TAR_ABORT", error, {
            recoverable: !1
          });
        }
        write(chunk) {
          if (this[ABORTED]) return;
          if (null === this[UNZIP] && chunk) {
            if (this[BUFFER] && (chunk = Buffer.concat([ this[BUFFER], chunk ]), this[BUFFER] = null), 
            chunk.length < gzipHeader.length) return this[BUFFER] = chunk, !0;
            for (let i = 0; null === this[UNZIP] && i < gzipHeader.length; i++) chunk[i] !== gzipHeader[i] && (this[UNZIP] = !1);
            if (null === this[UNZIP]) {
              const ended = this[ENDED];
              this[ENDED] = !1, this[UNZIP] = new zlib.Unzip, this[UNZIP].on("data", (chunk => this[CONSUMECHUNK](chunk))), 
              this[UNZIP].on("error", (er => this.abort(er))), this[UNZIP].on("end", (_ => {
                this[ENDED] = !0, this[CONSUMECHUNK]();
              })), this[WRITING] = !0;
              const ret = this[UNZIP][ended ? "end" : "write"](chunk);
              return this[WRITING] = !1, ret;
            }
          }
          this[WRITING] = !0, this[UNZIP] ? this[UNZIP].write(chunk) : this[CONSUMECHUNK](chunk), 
          this[WRITING] = !1;
          const ret = !this[QUEUE].length && (!this[READENTRY] || this[READENTRY].flowing);
          return ret || this[QUEUE].length || this[READENTRY].once("drain", (_ => this.emit("drain"))), 
          ret;
        }
        [BUFFERCONCAT](c) {
          c && !this[ABORTED] && (this[BUFFER] = this[BUFFER] ? Buffer.concat([ this[BUFFER], c ]) : c);
        }
        [MAYBEEND]() {
          if (this[ENDED] && !this[EMITTEDEND] && !this[ABORTED] && !this[CONSUMING]) {
            this[EMITTEDEND] = !0;
            const entry = this[WRITEENTRY];
            if (entry && entry.blockRemain) {
              const have = this[BUFFER] ? this[BUFFER].length : 0;
              this.warn("TAR_BAD_ARCHIVE", `Truncated input (needed ${entry.blockRemain} more bytes, only ${have} available)`, {
                entry
              }), this[BUFFER] && entry.write(this[BUFFER]), entry.end();
            }
            this[EMIT](DONE);
          }
        }
        [CONSUMECHUNK](chunk) {
          if (this[CONSUMING]) this[BUFFERCONCAT](chunk); else if (chunk || this[BUFFER]) {
            if (this[CONSUMING] = !0, this[BUFFER]) {
              this[BUFFERCONCAT](chunk);
              const c = this[BUFFER];
              this[BUFFER] = null, this[CONSUMECHUNKSUB](c);
            } else this[CONSUMECHUNKSUB](chunk);
            for (;this[BUFFER] && this[BUFFER].length >= 512 && !this[ABORTED] && !this[SAW_EOF]; ) {
              const c = this[BUFFER];
              this[BUFFER] = null, this[CONSUMECHUNKSUB](c);
            }
            this[CONSUMING] = !1;
          } else this[MAYBEEND]();
          this[BUFFER] && !this[ENDED] || this[MAYBEEND]();
        }
        [CONSUMECHUNKSUB](chunk) {
          let position = 0;
          const length = chunk.length;
          for (;position + 512 <= length && !this[ABORTED] && !this[SAW_EOF]; ) switch (this[STATE]) {
           case "begin":
           case "header":
            this[CONSUMEHEADER](chunk, position), position += 512;
            break;

           case "ignore":
           case "body":
            position += this[CONSUMEBODY](chunk, position);
            break;

           case "meta":
            position += this[CONSUMEMETA](chunk, position);
            break;

           default:
            throw new Error("invalid state: " + this[STATE]);
          }
          position < length && (this[BUFFER] ? this[BUFFER] = Buffer.concat([ chunk.slice(position), this[BUFFER] ]) : this[BUFFER] = chunk.slice(position));
        }
        end(chunk) {
          this[ABORTED] || (this[UNZIP] ? this[UNZIP].end(chunk) : (this[ENDED] = !0, this.write(chunk)));
        }
      });
    },
    99550: (module, __unused_webpack_exports, __webpack_require__) => {
      const assert = __webpack_require__(39491), normalize = __webpack_require__(40661), stripSlashes = __webpack_require__(13341), {join} = __webpack_require__(71017), isWindows = "win32" === (process.env.TESTING_TAR_FAKE_PLATFORM || process.platform);
      module.exports = () => {
        const queues = new Map, reservations = new Map, running = new Set, check = fn => {
          const {paths, dirs} = (fn => {
            const res = reservations.get(fn);
            if (!res) throw new Error("function does not have any path reservations");
            return {
              paths: res.paths.map((path => queues.get(path))),
              dirs: [ ...res.dirs ].map((path => queues.get(path)))
            };
          })(fn);
          return paths.every((q => q[0] === fn)) && dirs.every((q => q[0] instanceof Set && q[0].has(fn)));
        }, run = fn => !(running.has(fn) || !check(fn)) && (running.add(fn), fn((() => clear(fn))), 
        !0), clear = fn => {
          if (!running.has(fn)) return !1;
          const {paths, dirs} = reservations.get(fn), next = new Set;
          return paths.forEach((path => {
            const q = queues.get(path);
            assert.equal(q[0], fn), 1 === q.length ? queues.delete(path) : (q.shift(), "function" == typeof q[0] ? next.add(q[0]) : q[0].forEach((fn => next.add(fn))));
          })), dirs.forEach((dir => {
            const q = queues.get(dir);
            assert(q[0] instanceof Set), 1 === q[0].size && 1 === q.length ? queues.delete(dir) : 1 === q[0].size ? (q.shift(), 
            next.add(q[0])) : q[0].delete(fn);
          })), running.delete(fn), next.forEach((fn => run(fn))), !0;
        };
        return {
          check,
          reserve: (paths, fn) => {
            paths = isWindows ? [ "win32 parallelization disabled" ] : paths.map((p => normalize(stripSlashes(join(p))).toLowerCase()));
            const dirs = new Set(paths.map((path => (path => {
              const dirs = path.split("/").slice(0, -1).reduce(((set, path) => (set.length && (path = join(set[set.length - 1], path)), 
              set.push(path || "/"), set)), []);
              return dirs;
            })(path))).reduce(((a, b) => a.concat(b))));
            return reservations.set(fn, {
              dirs,
              paths
            }), paths.forEach((path => {
              const q = queues.get(path);
              q ? q.push(fn) : queues.set(path, [ fn ]);
            })), dirs.forEach((dir => {
              const q = queues.get(dir);
              q ? q[q.length - 1] instanceof Set ? q[q.length - 1].add(fn) : q.push(new Set([ fn ])) : queues.set(dir, [ new Set([ fn ]) ]);
            })), run(fn);
          }
        };
      };
    },
    53224: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const Header = __webpack_require__(63389), path = __webpack_require__(71017);
      class Pax {
        constructor(obj, global) {
          this.atime = obj.atime || null, this.charset = obj.charset || null, this.comment = obj.comment || null, 
          this.ctime = obj.ctime || null, this.gid = obj.gid || null, this.gname = obj.gname || null, 
          this.linkpath = obj.linkpath || null, this.mtime = obj.mtime || null, this.path = obj.path || null, 
          this.size = obj.size || null, this.uid = obj.uid || null, this.uname = obj.uname || null, 
          this.dev = obj.dev || null, this.ino = obj.ino || null, this.nlink = obj.nlink || null, 
          this.global = global || !1;
        }
        encode() {
          const body = this.encodeBody();
          if ("" === body) return null;
          const bodyLen = Buffer.byteLength(body), bufLen = 512 * Math.ceil(1 + bodyLen / 512), buf = Buffer.allocUnsafe(bufLen);
          for (let i = 0; i < 512; i++) buf[i] = 0;
          new Header({
            path: ("PaxHeader/" + path.basename(this.path)).slice(0, 99),
            mode: this.mode || 420,
            uid: this.uid || null,
            gid: this.gid || null,
            size: bodyLen,
            mtime: this.mtime || null,
            type: this.global ? "GlobalExtendedHeader" : "ExtendedHeader",
            linkpath: "",
            uname: this.uname || "",
            gname: this.gname || "",
            devmaj: 0,
            devmin: 0,
            atime: this.atime || null,
            ctime: this.ctime || null
          }).encode(buf), buf.write(body, 512, bodyLen, "utf8");
          for (let i = bodyLen + 512; i < buf.length; i++) buf[i] = 0;
          return buf;
        }
        encodeBody() {
          return this.encodeField("path") + this.encodeField("ctime") + this.encodeField("atime") + this.encodeField("dev") + this.encodeField("ino") + this.encodeField("nlink") + this.encodeField("charset") + this.encodeField("comment") + this.encodeField("gid") + this.encodeField("gname") + this.encodeField("linkpath") + this.encodeField("mtime") + this.encodeField("size") + this.encodeField("uid") + this.encodeField("uname");
        }
        encodeField(field) {
          if (null === this[field] || void 0 === this[field]) return "";
          const s = " " + ("dev" === field || "ino" === field || "nlink" === field ? "SCHILY." : "") + field + "=" + (this[field] instanceof Date ? this[field].getTime() / 1e3 : this[field]) + "\n", byteLen = Buffer.byteLength(s);
          let digits = Math.floor(Math.log(byteLen) / Math.log(10)) + 1;
          byteLen + digits >= Math.pow(10, digits) && (digits += 1);
          return digits + byteLen + s;
        }
      }
      Pax.parse = (string, ex, g) => new Pax(merge(parseKV(string), ex), g);
      const merge = (a, b) => b ? Object.keys(a).reduce(((s, k) => (s[k] = a[k], s)), b) : a, parseKV = string => string.replace(/\n$/, "").split("\n").reduce(parseKVLine, Object.create(null)), parseKVLine = (set, line) => {
        const n = parseInt(line, 10);
        if (n !== Buffer.byteLength(line) + 1) return set;
        const kv = (line = line.substr((n + " ").length)).split("="), k = kv.shift().replace(/^SCHILY\.(dev|ino|nlink)/, "$1");
        if (!k) return set;
        const v = kv.join("=");
        return set[k] = /^([A-Z]+\.)?([mac]|birth|creation)time$/.test(k) ? new Date(1e3 * v) : /^[0-9]+$/.test(v) ? +v : v, 
        set;
      };
      module.exports = Pax;
    },
    8646: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const MiniPass = __webpack_require__(45018), normPath = __webpack_require__(24509), SLURP = Symbol("slurp");
      module.exports = class extends MiniPass {
        constructor(header, ex, gex) {
          switch (super(), this.pause(), this.extended = ex, this.globalExtended = gex, this.header = header, 
          this.startBlockSize = 512 * Math.ceil(header.size / 512), this.blockRemain = this.startBlockSize, 
          this.remain = header.size, this.type = header.type, this.meta = !1, this.ignore = !1, 
          this.type) {
           case "File":
           case "OldFile":
           case "Link":
           case "SymbolicLink":
           case "CharacterDevice":
           case "BlockDevice":
           case "Directory":
           case "FIFO":
           case "ContiguousFile":
           case "GNUDumpDir":
            break;

           case "NextFileHasLongLinkpath":
           case "NextFileHasLongPath":
           case "OldGnuLongPath":
           case "GlobalExtendedHeader":
           case "ExtendedHeader":
           case "OldExtendedHeader":
            this.meta = !0;
            break;

           default:
            this.ignore = !0;
          }
          this.path = normPath(header.path), this.mode = header.mode, this.mode && (this.mode = 4095 & this.mode), 
          this.uid = header.uid, this.gid = header.gid, this.uname = header.uname, this.gname = header.gname, 
          this.size = header.size, this.mtime = header.mtime, this.atime = header.atime, this.ctime = header.ctime, 
          this.linkpath = normPath(header.linkpath), this.uname = header.uname, this.gname = header.gname, 
          ex && this[SLURP](ex), gex && this[SLURP](gex, !0);
        }
        write(data) {
          const writeLen = data.length;
          if (writeLen > this.blockRemain) throw new Error("writing more to entry than is appropriate");
          const r = this.remain, br = this.blockRemain;
          return this.remain = Math.max(0, r - writeLen), this.blockRemain = Math.max(0, br - writeLen), 
          !!this.ignore || (r >= writeLen ? super.write(data) : super.write(data.slice(0, r)));
        }
        [SLURP](ex, global) {
          for (const k in ex) null === ex[k] || void 0 === ex[k] || global && "path" === k || (this[k] = "path" === k || "linkpath" === k ? normPath(ex[k]) : ex[k]);
        }
      };
    },
    70417: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const hlo = __webpack_require__(6022), Pack = __webpack_require__(52846), fs = __webpack_require__(57147), fsm = __webpack_require__(33975), t = __webpack_require__(50121), path = __webpack_require__(71017), Header = __webpack_require__(63389);
      module.exports = (opt_, files, cb) => {
        const opt = hlo(opt_);
        if (!opt.file) throw new TypeError("file is required");
        if (opt.gzip) throw new TypeError("cannot append to compressed archives");
        if (!files || !Array.isArray(files) || !files.length) throw new TypeError("no files or directories specified");
        return files = Array.from(files), opt.sync ? replaceSync(opt, files) : replace(opt, files, cb);
      };
      const replaceSync = (opt, files) => {
        const p = new Pack.Sync(opt);
        let fd, position, threw = !0;
        try {
          try {
            fd = fs.openSync(opt.file, "r+");
          } catch (er) {
            if ("ENOENT" !== er.code) throw er;
            fd = fs.openSync(opt.file, "w+");
          }
          const st = fs.fstatSync(fd), headBuf = Buffer.alloc(512);
          POSITION: for (position = 0; position < st.size; position += 512) {
            for (let bufPos = 0, bytes = 0; bufPos < 512; bufPos += bytes) {
              if (bytes = fs.readSync(fd, headBuf, bufPos, headBuf.length - bufPos, position + bufPos), 
              0 === position && 31 === headBuf[0] && 139 === headBuf[1]) throw new Error("cannot append to compressed archives");
              if (!bytes) break POSITION;
            }
            const h = new Header(headBuf);
            if (!h.cksumValid) break;
            const entryBlockSize = 512 * Math.ceil(h.size / 512);
            if (position + entryBlockSize + 512 > st.size) break;
            position += entryBlockSize, opt.mtimeCache && opt.mtimeCache.set(h.path, h.mtime);
          }
          threw = !1, streamSync(opt, p, position, fd, files);
        } finally {
          if (threw) try {
            fs.closeSync(fd);
          } catch (er) {}
        }
      }, streamSync = (opt, p, position, fd, files) => {
        const stream = new fsm.WriteStreamSync(opt.file, {
          fd,
          start: position
        });
        p.pipe(stream), addFilesSync(p, files);
      }, replace = (opt, files, cb) => {
        files = Array.from(files);
        const p = new Pack(opt), promise = new Promise(((resolve, reject) => {
          p.on("error", reject);
          let flag = "r+";
          const onopen = (er, fd) => er && "ENOENT" === er.code && "r+" === flag ? (flag = "w+", 
          fs.open(opt.file, flag, onopen)) : er ? reject(er) : void fs.fstat(fd, ((er, st) => {
            if (er) return fs.close(fd, (() => reject(er)));
            ((fd, size, cb_) => {
              const cb = (er, pos) => {
                er ? fs.close(fd, (_ => cb_(er))) : cb_(null, pos);
              };
              let position = 0;
              if (0 === size) return cb(null, 0);
              let bufPos = 0;
              const headBuf = Buffer.alloc(512), onread = (er, bytes) => {
                if (er) return cb(er);
                if (bufPos += bytes, bufPos < 512 && bytes) return fs.read(fd, headBuf, bufPos, headBuf.length - bufPos, position + bufPos, onread);
                if (0 === position && 31 === headBuf[0] && 139 === headBuf[1]) return cb(new Error("cannot append to compressed archives"));
                if (bufPos < 512) return cb(null, position);
                const h = new Header(headBuf);
                if (!h.cksumValid) return cb(null, position);
                const entryBlockSize = 512 * Math.ceil(h.size / 512);
                return position + entryBlockSize + 512 > size ? cb(null, position) : (position += entryBlockSize + 512, 
                position >= size ? cb(null, position) : (opt.mtimeCache && opt.mtimeCache.set(h.path, h.mtime), 
                bufPos = 0, void fs.read(fd, headBuf, 0, 512, position, onread)));
              };
              fs.read(fd, headBuf, 0, 512, position, onread);
            })(fd, st.size, ((er, position) => {
              if (er) return reject(er);
              const stream = new fsm.WriteStream(opt.file, {
                fd,
                start: position
              });
              p.pipe(stream), stream.on("error", reject), stream.on("close", resolve), addFilesAsync(p, files);
            }));
          }));
          fs.open(opt.file, flag, onopen);
        }));
        return cb ? promise.then(cb, cb) : promise;
      }, addFilesSync = (p, files) => {
        files.forEach((file => {
          "@" === file.charAt(0) ? t({
            file: path.resolve(p.cwd, file.substr(1)),
            sync: !0,
            noResume: !0,
            onentry: entry => p.add(entry)
          }) : p.add(file);
        })), p.end();
      }, addFilesAsync = (p, files) => {
        for (;files.length; ) {
          const file = files.shift();
          if ("@" === file.charAt(0)) return t({
            file: path.resolve(p.cwd, file.substr(1)),
            noResume: !0,
            onentry: entry => p.add(entry)
          }).then((_ => addFilesAsync(p, files)));
          p.add(file);
        }
        p.end();
      };
    },
    34507: (module, __unused_webpack_exports, __webpack_require__) => {
      const {isAbsolute, parse} = __webpack_require__(71017).win32;
      module.exports = path => {
        let r = "", parsed = parse(path);
        for (;isAbsolute(path) || parsed.root; ) {
          const root = "/" === path.charAt(0) && "//?/" !== path.slice(0, 4) ? "/" : parsed.root;
          path = path.substr(root.length), r += root, parsed = parse(path);
        }
        return [ r, path ];
      };
    },
    13341: module => {
      module.exports = str => {
        let i = str.length - 1, slashesStart = -1;
        for (;i > -1 && "/" === str.charAt(i); ) slashesStart = i, i--;
        return -1 === slashesStart ? str : str.slice(0, slashesStart);
      };
    },
    15156: (__unused_webpack_module, exports) => {
      "use strict";
      exports.name = new Map([ [ "0", "File" ], [ "", "OldFile" ], [ "1", "Link" ], [ "2", "SymbolicLink" ], [ "3", "CharacterDevice" ], [ "4", "BlockDevice" ], [ "5", "Directory" ], [ "6", "FIFO" ], [ "7", "ContiguousFile" ], [ "g", "GlobalExtendedHeader" ], [ "x", "ExtendedHeader" ], [ "A", "SolarisACL" ], [ "D", "GNUDumpDir" ], [ "I", "Inode" ], [ "K", "NextFileHasLongLinkpath" ], [ "L", "NextFileHasLongPath" ], [ "M", "ContinuationFile" ], [ "N", "OldGnuLongPath" ], [ "S", "SparseFile" ], [ "V", "TapeVolumeHeader" ], [ "X", "OldExtendedHeader" ] ]), 
      exports.code = new Map(Array.from(exports.name).map((kv => [ kv[1], kv[0] ])));
    },
    46850: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const assert = __webpack_require__(39491), Parser = __webpack_require__(34075), fs = __webpack_require__(57147), fsm = __webpack_require__(33975), path = __webpack_require__(71017), mkdir = __webpack_require__(55035), wc = __webpack_require__(58002), pathReservations = __webpack_require__(99550), stripAbsolutePath = __webpack_require__(34507), normPath = __webpack_require__(24509), stripSlash = __webpack_require__(13341), normalize = __webpack_require__(40661), ONENTRY = Symbol("onEntry"), CHECKFS = Symbol("checkFs"), CHECKFS2 = Symbol("checkFs2"), PRUNECACHE = Symbol("pruneCache"), ISREUSABLE = Symbol("isReusable"), MAKEFS = Symbol("makeFs"), FILE = Symbol("file"), DIRECTORY = Symbol("directory"), LINK = Symbol("link"), SYMLINK = Symbol("symlink"), HARDLINK = Symbol("hardlink"), UNSUPPORTED = Symbol("unsupported"), CHECKPATH = Symbol("checkPath"), MKDIR = Symbol("mkdir"), ONERROR = Symbol("onError"), PENDING = Symbol("pending"), PEND = Symbol("pend"), UNPEND = Symbol("unpend"), ENDED = Symbol("ended"), MAYBECLOSE = Symbol("maybeClose"), SKIP = Symbol("skip"), DOCHOWN = Symbol("doChown"), UID = Symbol("uid"), GID = Symbol("gid"), CHECKED_CWD = Symbol("checkedCwd"), crypto = __webpack_require__(6113), getFlag = __webpack_require__(64696), isWindows = "win32" === (process.env.TESTING_TAR_FAKE_PLATFORM || process.platform), uint32 = (a, b, c) => a === a >>> 0 ? a : b === b >>> 0 ? b : c, cacheKeyNormalize = path => normalize(stripSlash(normPath(path))).toLowerCase();
      class Unpack extends Parser {
        constructor(opt) {
          if (opt || (opt = {}), opt.ondone = _ => {
            this[ENDED] = !0, this[MAYBECLOSE]();
          }, super(opt), this[CHECKED_CWD] = !1, this.reservations = pathReservations(), this.transform = "function" == typeof opt.transform ? opt.transform : null, 
          this.writable = !0, this.readable = !1, this[PENDING] = 0, this[ENDED] = !1, this.dirCache = opt.dirCache || new Map, 
          "number" == typeof opt.uid || "number" == typeof opt.gid) {
            if ("number" != typeof opt.uid || "number" != typeof opt.gid) throw new TypeError("cannot set owner without number uid and gid");
            if (opt.preserveOwner) throw new TypeError("cannot preserve owner in archive and also set owner explicitly");
            this.uid = opt.uid, this.gid = opt.gid, this.setOwner = !0;
          } else this.uid = null, this.gid = null, this.setOwner = !1;
          void 0 === opt.preserveOwner && "number" != typeof opt.uid ? this.preserveOwner = process.getuid && 0 === process.getuid() : this.preserveOwner = !!opt.preserveOwner, 
          this.processUid = (this.preserveOwner || this.setOwner) && process.getuid ? process.getuid() : null, 
          this.processGid = (this.preserveOwner || this.setOwner) && process.getgid ? process.getgid() : null, 
          this.forceChown = !0 === opt.forceChown, this.win32 = !!opt.win32 || isWindows, 
          this.newer = !!opt.newer, this.keep = !!opt.keep, this.noMtime = !!opt.noMtime, 
          this.preservePaths = !!opt.preservePaths, this.unlink = !!opt.unlink, this.cwd = normPath(path.resolve(opt.cwd || process.cwd())), 
          this.strip = +opt.strip || 0, this.processUmask = opt.noChmod ? 0 : process.umask(), 
          this.umask = "number" == typeof opt.umask ? opt.umask : this.processUmask, this.dmode = opt.dmode || 511 & ~this.umask, 
          this.fmode = opt.fmode || 438 & ~this.umask, this.on("entry", (entry => this[ONENTRY](entry)));
        }
        warn(code, msg, data = {}) {
          return "TAR_BAD_ARCHIVE" !== code && "TAR_ABORT" !== code || (data.recoverable = !1), 
          super.warn(code, msg, data);
        }
        [MAYBECLOSE]() {
          this[ENDED] && 0 === this[PENDING] && (this.emit("prefinish"), this.emit("finish"), 
          this.emit("end"), this.emit("close"));
        }
        [CHECKPATH](entry) {
          if (this.strip) {
            const parts = normPath(entry.path).split("/");
            if (parts.length < this.strip) return !1;
            if (entry.path = parts.slice(this.strip).join("/"), "Link" === entry.type) {
              const linkparts = normPath(entry.linkpath).split("/");
              if (!(linkparts.length >= this.strip)) return !1;
              entry.linkpath = linkparts.slice(this.strip).join("/");
            }
          }
          if (!this.preservePaths) {
            const p = normPath(entry.path), parts = p.split("/");
            if (parts.includes("..") || isWindows && /^[a-z]:\.\.$/i.test(parts[0])) return this.warn("TAR_ENTRY_ERROR", "path contains '..'", {
              entry,
              path: p
            }), !1;
            const [root, stripped] = stripAbsolutePath(p);
            root && (entry.path = stripped, this.warn("TAR_ENTRY_INFO", `stripping ${root} from absolute path`, {
              entry,
              path: p
            }));
          }
          if (path.isAbsolute(entry.path) ? entry.absolute = normPath(path.resolve(entry.path)) : entry.absolute = normPath(path.resolve(this.cwd, entry.path)), 
          !this.preservePaths && 0 !== entry.absolute.indexOf(this.cwd + "/") && entry.absolute !== this.cwd) return this.warn("TAR_ENTRY_ERROR", "path escaped extraction target", {
            entry,
            path: normPath(entry.path),
            resolvedPath: entry.absolute,
            cwd: this.cwd
          }), !1;
          if (entry.absolute === this.cwd && "Directory" !== entry.type && "GNUDumpDir" !== entry.type) return !1;
          if (this.win32) {
            const {root: aRoot} = path.win32.parse(entry.absolute);
            entry.absolute = aRoot + wc.encode(entry.absolute.substr(aRoot.length));
            const {root: pRoot} = path.win32.parse(entry.path);
            entry.path = pRoot + wc.encode(entry.path.substr(pRoot.length));
          }
          return !0;
        }
        [ONENTRY](entry) {
          if (!this[CHECKPATH](entry)) return entry.resume();
          switch (assert.equal(typeof entry.absolute, "string"), entry.type) {
           case "Directory":
           case "GNUDumpDir":
            entry.mode && (entry.mode = 448 | entry.mode);

           case "File":
           case "OldFile":
           case "ContiguousFile":
           case "Link":
           case "SymbolicLink":
            return this[CHECKFS](entry);

           default:
            return this[UNSUPPORTED](entry);
          }
        }
        [ONERROR](er, entry) {
          "CwdError" === er.name ? this.emit("error", er) : (this.warn("TAR_ENTRY_ERROR", er, {
            entry
          }), this[UNPEND](), entry.resume());
        }
        [MKDIR](dir, mode, cb) {
          mkdir(normPath(dir), {
            uid: this.uid,
            gid: this.gid,
            processUid: this.processUid,
            processGid: this.processGid,
            umask: this.processUmask,
            preserve: this.preservePaths,
            unlink: this.unlink,
            cache: this.dirCache,
            cwd: this.cwd,
            mode,
            noChmod: this.noChmod
          }, cb);
        }
        [DOCHOWN](entry) {
          return this.forceChown || this.preserveOwner && ("number" == typeof entry.uid && entry.uid !== this.processUid || "number" == typeof entry.gid && entry.gid !== this.processGid) || "number" == typeof this.uid && this.uid !== this.processUid || "number" == typeof this.gid && this.gid !== this.processGid;
        }
        [UID](entry) {
          return uint32(this.uid, entry.uid, this.processUid);
        }
        [GID](entry) {
          return uint32(this.gid, entry.gid, this.processGid);
        }
        [FILE](entry, fullyDone) {
          const mode = 4095 & entry.mode || this.fmode, stream = new fsm.WriteStream(entry.absolute, {
            flags: getFlag(entry.size),
            mode,
            autoClose: !1
          });
          stream.on("error", (er => {
            stream.fd && fs.close(stream.fd, (() => {})), stream.write = () => !0, this[ONERROR](er, entry), 
            fullyDone();
          }));
          let actions = 1;
          const done = er => {
            if (er) return stream.fd && fs.close(stream.fd, (() => {})), this[ONERROR](er, entry), 
            void fullyDone();
            0 == --actions && fs.close(stream.fd, (er => {
              er ? this[ONERROR](er, entry) : this[UNPEND](), fullyDone();
            }));
          };
          stream.on("finish", (_ => {
            const abs = entry.absolute, fd = stream.fd;
            if (entry.mtime && !this.noMtime) {
              actions++;
              const atime = entry.atime || new Date, mtime = entry.mtime;
              fs.futimes(fd, atime, mtime, (er => er ? fs.utimes(abs, atime, mtime, (er2 => done(er2 && er))) : done()));
            }
            if (this[DOCHOWN](entry)) {
              actions++;
              const uid = this[UID](entry), gid = this[GID](entry);
              fs.fchown(fd, uid, gid, (er => er ? fs.chown(abs, uid, gid, (er2 => done(er2 && er))) : done()));
            }
            done();
          }));
          const tx = this.transform && this.transform(entry) || entry;
          tx !== entry && (tx.on("error", (er => {
            this[ONERROR](er, entry), fullyDone();
          })), entry.pipe(tx)), tx.pipe(stream);
        }
        [DIRECTORY](entry, fullyDone) {
          const mode = 4095 & entry.mode || this.dmode;
          this[MKDIR](entry.absolute, mode, (er => {
            if (er) return this[ONERROR](er, entry), void fullyDone();
            let actions = 1;
            const done = _ => {
              0 == --actions && (fullyDone(), this[UNPEND](), entry.resume());
            };
            entry.mtime && !this.noMtime && (actions++, fs.utimes(entry.absolute, entry.atime || new Date, entry.mtime, done)), 
            this[DOCHOWN](entry) && (actions++, fs.chown(entry.absolute, this[UID](entry), this[GID](entry), done)), 
            done();
          }));
        }
        [UNSUPPORTED](entry) {
          entry.unsupported = !0, this.warn("TAR_ENTRY_UNSUPPORTED", `unsupported entry type: ${entry.type}`, {
            entry
          }), entry.resume();
        }
        [SYMLINK](entry, done) {
          this[LINK](entry, entry.linkpath, "symlink", done);
        }
        [HARDLINK](entry, done) {
          const linkpath = normPath(path.resolve(this.cwd, entry.linkpath));
          this[LINK](entry, linkpath, "link", done);
        }
        [PEND]() {
          this[PENDING]++;
        }
        [UNPEND]() {
          this[PENDING]--, this[MAYBECLOSE]();
        }
        [SKIP](entry) {
          this[UNPEND](), entry.resume();
        }
        [ISREUSABLE](entry, st) {
          return "File" === entry.type && !this.unlink && st.isFile() && st.nlink <= 1 && !isWindows;
        }
        [CHECKFS](entry) {
          this[PEND]();
          const paths = [ entry.path ];
          entry.linkpath && paths.push(entry.linkpath), this.reservations.reserve(paths, (done => this[CHECKFS2](entry, done)));
        }
        [PRUNECACHE](entry) {
          "SymbolicLink" === entry.type ? (cache => {
            for (const key of cache.keys()) cache.delete(key);
          })(this.dirCache) : "Directory" !== entry.type && ((cache, abs) => {
            abs = cacheKeyNormalize(abs);
            for (const path of cache.keys()) {
              const pnorm = cacheKeyNormalize(path);
              pnorm !== abs && 0 !== pnorm.indexOf(abs + "/") || cache.delete(path);
            }
          })(this.dirCache, entry.absolute);
        }
        [CHECKFS2](entry, fullyDone) {
          this[PRUNECACHE](entry);
          const done = er => {
            this[PRUNECACHE](entry), fullyDone(er);
          }, start = () => {
            if (entry.absolute !== this.cwd) {
              const parent = normPath(path.dirname(entry.absolute));
              if (parent !== this.cwd) return this[MKDIR](parent, this.dmode, (er => {
                if (er) return this[ONERROR](er, entry), void done();
                afterMakeParent();
              }));
            }
            afterMakeParent();
          }, afterMakeParent = () => {
            fs.lstat(entry.absolute, ((lstatEr, st) => {
              if (st && (this.keep || this.newer && st.mtime > entry.mtime)) return this[SKIP](entry), 
              void done();
              if (lstatEr || this[ISREUSABLE](entry, st)) return this[MAKEFS](null, entry, done);
              if (st.isDirectory()) {
                if ("Directory" === entry.type) {
                  const afterChmod = er => this[MAKEFS](er, entry, done);
                  return !this.noChmod && entry.mode && (4095 & st.mode) !== entry.mode ? fs.chmod(entry.absolute, entry.mode, afterChmod) : afterChmod();
                }
                if (entry.absolute !== this.cwd) return fs.rmdir(entry.absolute, (er => this[MAKEFS](er, entry, done)));
              }
              if (entry.absolute === this.cwd) return this[MAKEFS](null, entry, done);
              ((path, cb) => {
                if (!isWindows) return fs.unlink(path, cb);
                const name = path + ".DELETE." + crypto.randomBytes(16).toString("hex");
                fs.rename(path, name, (er => {
                  if (er) return cb(er);
                  fs.unlink(name, cb);
                }));
              })(entry.absolute, (er => this[MAKEFS](er, entry, done)));
            }));
          };
          this[CHECKED_CWD] ? start() : (() => {
            this[MKDIR](this.cwd, this.dmode, (er => {
              if (er) return this[ONERROR](er, entry), void done();
              this[CHECKED_CWD] = !0, start();
            }));
          })();
        }
        [MAKEFS](er, entry, done) {
          if (er) return this[ONERROR](er, entry), void done();
          switch (entry.type) {
           case "File":
           case "OldFile":
           case "ContiguousFile":
            return this[FILE](entry, done);

           case "Link":
            return this[HARDLINK](entry, done);

           case "SymbolicLink":
            return this[SYMLINK](entry, done);

           case "Directory":
           case "GNUDumpDir":
            return this[DIRECTORY](entry, done);
          }
        }
        [LINK](entry, linkpath, link, done) {
          fs[link](linkpath, entry.absolute, (er => {
            er ? this[ONERROR](er, entry) : (this[UNPEND](), entry.resume()), done();
          }));
        }
      }
      const callSync = fn => {
        try {
          return [ null, fn() ];
        } catch (er) {
          return [ er, null ];
        }
      };
      Unpack.Sync = class extends Unpack {
        [MAKEFS](er, entry) {
          return super[MAKEFS](er, entry, (() => {}));
        }
        [CHECKFS](entry) {
          if (this[PRUNECACHE](entry), !this[CHECKED_CWD]) {
            const er = this[MKDIR](this.cwd, this.dmode);
            if (er) return this[ONERROR](er, entry);
            this[CHECKED_CWD] = !0;
          }
          if (entry.absolute !== this.cwd) {
            const parent = normPath(path.dirname(entry.absolute));
            if (parent !== this.cwd) {
              const mkParent = this[MKDIR](parent, this.dmode);
              if (mkParent) return this[ONERROR](mkParent, entry);
            }
          }
          const [lstatEr, st] = callSync((() => fs.lstatSync(entry.absolute)));
          if (st && (this.keep || this.newer && st.mtime > entry.mtime)) return this[SKIP](entry);
          if (lstatEr || this[ISREUSABLE](entry, st)) return this[MAKEFS](null, entry);
          if (st.isDirectory()) {
            if ("Directory" === entry.type) {
              const needChmod = !this.noChmod && entry.mode && (4095 & st.mode) !== entry.mode, [er] = needChmod ? callSync((() => {
                fs.chmodSync(entry.absolute, entry.mode);
              })) : [];
              return this[MAKEFS](er, entry);
            }
            const [er] = callSync((() => fs.rmdirSync(entry.absolute)));
            this[MAKEFS](er, entry);
          }
          const [er] = entry.absolute === this.cwd ? [] : callSync((() => (path => {
            if (!isWindows) return fs.unlinkSync(path);
            const name = path + ".DELETE." + crypto.randomBytes(16).toString("hex");
            fs.renameSync(path, name), fs.unlinkSync(name);
          })(entry.absolute)));
          this[MAKEFS](er, entry);
        }
        [FILE](entry, done) {
          const mode = 4095 & entry.mode || this.fmode, oner = er => {
            let closeError;
            try {
              fs.closeSync(fd);
            } catch (e) {
              closeError = e;
            }
            (er || closeError) && this[ONERROR](er || closeError, entry), done();
          };
          let fd;
          try {
            fd = fs.openSync(entry.absolute, getFlag(entry.size), mode);
          } catch (er) {
            return oner(er);
          }
          const tx = this.transform && this.transform(entry) || entry;
          tx !== entry && (tx.on("error", (er => this[ONERROR](er, entry))), entry.pipe(tx)), 
          tx.on("data", (chunk => {
            try {
              fs.writeSync(fd, chunk, 0, chunk.length);
            } catch (er) {
              oner(er);
            }
          })), tx.on("end", (_ => {
            let er = null;
            if (entry.mtime && !this.noMtime) {
              const atime = entry.atime || new Date, mtime = entry.mtime;
              try {
                fs.futimesSync(fd, atime, mtime);
              } catch (futimeser) {
                try {
                  fs.utimesSync(entry.absolute, atime, mtime);
                } catch (utimeser) {
                  er = futimeser;
                }
              }
            }
            if (this[DOCHOWN](entry)) {
              const uid = this[UID](entry), gid = this[GID](entry);
              try {
                fs.fchownSync(fd, uid, gid);
              } catch (fchowner) {
                try {
                  fs.chownSync(entry.absolute, uid, gid);
                } catch (chowner) {
                  er = er || fchowner;
                }
              }
            }
            oner(er);
          }));
        }
        [DIRECTORY](entry, done) {
          const mode = 4095 & entry.mode || this.dmode, er = this[MKDIR](entry.absolute, mode);
          if (er) return this[ONERROR](er, entry), void done();
          if (entry.mtime && !this.noMtime) try {
            fs.utimesSync(entry.absolute, entry.atime || new Date, entry.mtime);
          } catch (er) {}
          if (this[DOCHOWN](entry)) try {
            fs.chownSync(entry.absolute, this[UID](entry), this[GID](entry));
          } catch (er) {}
          done(), entry.resume();
        }
        [MKDIR](dir, mode) {
          try {
            return mkdir.sync(normPath(dir), {
              uid: this.uid,
              gid: this.gid,
              processUid: this.processUid,
              processGid: this.processGid,
              umask: this.processUmask,
              preserve: this.preservePaths,
              unlink: this.unlink,
              cache: this.dirCache,
              cwd: this.cwd,
              mode
            });
          } catch (er) {
            return er;
          }
        }
        [LINK](entry, linkpath, link, done) {
          try {
            fs[link + "Sync"](linkpath, entry.absolute), done(), entry.resume();
          } catch (er) {
            return this[ONERROR](er, entry);
          }
        }
      }, module.exports = Unpack;
    },
    63088: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const hlo = __webpack_require__(6022), r = __webpack_require__(70417);
      module.exports = (opt_, files, cb) => {
        const opt = hlo(opt_);
        if (!opt.file) throw new TypeError("file is required");
        if (opt.gzip) throw new TypeError("cannot append to compressed archives");
        if (!files || !Array.isArray(files) || !files.length) throw new TypeError("no files or directories specified");
        return files = Array.from(files), mtimeFilter(opt), r(opt, files, cb);
      };
      const mtimeFilter = opt => {
        const filter = opt.filter;
        opt.mtimeCache || (opt.mtimeCache = new Map), opt.filter = filter ? (path, stat) => filter(path, stat) && !(opt.mtimeCache.get(path) > stat.mtime) : (path, stat) => !(opt.mtimeCache.get(path) > stat.mtime);
      };
    },
    48685: module => {
      "use strict";
      module.exports = Base => class extends Base {
        warn(code, message, data = {}) {
          this.file && (data.file = this.file), this.cwd && (data.cwd = this.cwd), data.code = message instanceof Error && message.code || code, 
          data.tarCode = code, this.strict || !1 === data.recoverable ? message instanceof Error ? this.emit("error", Object.assign(message, data)) : this.emit("error", Object.assign(new Error(`${code}: ${message}`), data)) : (message instanceof Error && (data = Object.assign(message, data), 
          message = message.message), this.emit("warn", data.tarCode, message, data));
        }
      };
    },
    58002: module => {
      "use strict";
      const raw = [ "|", "<", ">", "?", ":" ], win = raw.map((char => String.fromCharCode(61440 + char.charCodeAt(0)))), toWin = new Map(raw.map(((char, i) => [ char, win[i] ]))), toRaw = new Map(win.map(((char, i) => [ char, raw[i] ])));
      module.exports = {
        encode: s => raw.reduce(((s, c) => s.split(c).join(toWin.get(c))), s),
        decode: s => win.reduce(((s, c) => s.split(c).join(toRaw.get(c))), s)
      };
    },
    99411: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      const MiniPass = __webpack_require__(45018), Pax = __webpack_require__(53224), Header = __webpack_require__(63389), fs = __webpack_require__(57147), path = __webpack_require__(71017), normPath = __webpack_require__(24509), stripSlash = __webpack_require__(13341), prefixPath = (path, prefix) => prefix ? (path = normPath(path).replace(/^\.(\/|$)/, ""), 
      stripSlash(prefix) + "/" + path) : normPath(path), PROCESS = Symbol("process"), FILE = Symbol("file"), DIRECTORY = Symbol("directory"), SYMLINK = Symbol("symlink"), HARDLINK = Symbol("hardlink"), HEADER = Symbol("header"), READ = Symbol("read"), LSTAT = Symbol("lstat"), ONLSTAT = Symbol("onlstat"), ONREAD = Symbol("onread"), ONREADLINK = Symbol("onreadlink"), OPENFILE = Symbol("openfile"), ONOPENFILE = Symbol("onopenfile"), CLOSE = Symbol("close"), MODE = Symbol("mode"), AWAITDRAIN = Symbol("awaitDrain"), ONDRAIN = Symbol("ondrain"), PREFIX = Symbol("prefix"), HAD_ERROR = Symbol("hadError"), warner = __webpack_require__(48685), winchars = __webpack_require__(58002), stripAbsolutePath = __webpack_require__(34507), modeFix = __webpack_require__(12735), WriteEntry = warner(class extends MiniPass {
        constructor(p, opt) {
          if (super(opt = opt || {}), "string" != typeof p) throw new TypeError("path is required");
          this.path = normPath(p), this.portable = !!opt.portable, this.myuid = process.getuid && process.getuid() || 0, 
          this.myuser = process.env.USER || "", this.maxReadSize = opt.maxReadSize || 16777216, 
          this.linkCache = opt.linkCache || new Map, this.statCache = opt.statCache || new Map, 
          this.preservePaths = !!opt.preservePaths, this.cwd = normPath(opt.cwd || process.cwd()), 
          this.strict = !!opt.strict, this.noPax = !!opt.noPax, this.noMtime = !!opt.noMtime, 
          this.mtime = opt.mtime || null, this.prefix = opt.prefix ? normPath(opt.prefix) : null, 
          this.fd = null, this.blockLen = null, this.blockRemain = null, this.buf = null, 
          this.offset = null, this.length = null, this.pos = null, this.remain = null, "function" == typeof opt.onwarn && this.on("warn", opt.onwarn);
          let pathWarn = !1;
          if (!this.preservePaths) {
            const [root, stripped] = stripAbsolutePath(this.path);
            root && (this.path = stripped, pathWarn = root);
          }
          this.win32 = !!opt.win32 || "win32" === process.platform, this.win32 && (this.path = winchars.decode(this.path.replace(/\\/g, "/")), 
          p = p.replace(/\\/g, "/")), this.absolute = normPath(opt.absolute || path.resolve(this.cwd, p)), 
          "" === this.path && (this.path = "./"), pathWarn && this.warn("TAR_ENTRY_INFO", `stripping ${pathWarn} from absolute path`, {
            entry: this,
            path: pathWarn + this.path
          }), this.statCache.has(this.absolute) ? this[ONLSTAT](this.statCache.get(this.absolute)) : this[LSTAT]();
        }
        emit(ev, ...data) {
          return "error" === ev && (this[HAD_ERROR] = !0), super.emit(ev, ...data);
        }
        [LSTAT]() {
          fs.lstat(this.absolute, ((er, stat) => {
            if (er) return this.emit("error", er);
            this[ONLSTAT](stat);
          }));
        }
        [ONLSTAT](stat) {
          this.statCache.set(this.absolute, stat), this.stat = stat, stat.isFile() || (stat.size = 0), 
          this.type = getType(stat), this.emit("stat", stat), this[PROCESS]();
        }
        [PROCESS]() {
          switch (this.type) {
           case "File":
            return this[FILE]();

           case "Directory":
            return this[DIRECTORY]();

           case "SymbolicLink":
            return this[SYMLINK]();

           default:
            return this.end();
          }
        }
        [MODE](mode) {
          return modeFix(mode, "Directory" === this.type, this.portable);
        }
        [PREFIX](path) {
          return prefixPath(path, this.prefix);
        }
        [HEADER]() {
          "Directory" === this.type && this.portable && (this.noMtime = !0), this.header = new Header({
            path: this[PREFIX](this.path),
            linkpath: "Link" === this.type ? this[PREFIX](this.linkpath) : this.linkpath,
            mode: this[MODE](this.stat.mode),
            uid: this.portable ? null : this.stat.uid,
            gid: this.portable ? null : this.stat.gid,
            size: this.stat.size,
            mtime: this.noMtime ? null : this.mtime || this.stat.mtime,
            type: this.type,
            uname: this.portable ? null : this.stat.uid === this.myuid ? this.myuser : "",
            atime: this.portable ? null : this.stat.atime,
            ctime: this.portable ? null : this.stat.ctime
          }), this.header.encode() && !this.noPax && super.write(new Pax({
            atime: this.portable ? null : this.header.atime,
            ctime: this.portable ? null : this.header.ctime,
            gid: this.portable ? null : this.header.gid,
            mtime: this.noMtime ? null : this.mtime || this.header.mtime,
            path: this[PREFIX](this.path),
            linkpath: "Link" === this.type ? this[PREFIX](this.linkpath) : this.linkpath,
            size: this.header.size,
            uid: this.portable ? null : this.header.uid,
            uname: this.portable ? null : this.header.uname,
            dev: this.portable ? null : this.stat.dev,
            ino: this.portable ? null : this.stat.ino,
            nlink: this.portable ? null : this.stat.nlink
          }).encode()), super.write(this.header.block);
        }
        [DIRECTORY]() {
          "/" !== this.path.substr(-1) && (this.path += "/"), this.stat.size = 0, this[HEADER](), 
          this.end();
        }
        [SYMLINK]() {
          fs.readlink(this.absolute, ((er, linkpath) => {
            if (er) return this.emit("error", er);
            this[ONREADLINK](linkpath);
          }));
        }
        [ONREADLINK](linkpath) {
          this.linkpath = normPath(linkpath), this[HEADER](), this.end();
        }
        [HARDLINK](linkpath) {
          this.type = "Link", this.linkpath = normPath(path.relative(this.cwd, linkpath)), 
          this.stat.size = 0, this[HEADER](), this.end();
        }
        [FILE]() {
          if (this.stat.nlink > 1) {
            const linkKey = this.stat.dev + ":" + this.stat.ino;
            if (this.linkCache.has(linkKey)) {
              const linkpath = this.linkCache.get(linkKey);
              if (0 === linkpath.indexOf(this.cwd)) return this[HARDLINK](linkpath);
            }
            this.linkCache.set(linkKey, this.absolute);
          }
          if (this[HEADER](), 0 === this.stat.size) return this.end();
          this[OPENFILE]();
        }
        [OPENFILE]() {
          fs.open(this.absolute, "r", ((er, fd) => {
            if (er) return this.emit("error", er);
            this[ONOPENFILE](fd);
          }));
        }
        [ONOPENFILE](fd) {
          if (this.fd = fd, this[HAD_ERROR]) return this[CLOSE]();
          this.blockLen = 512 * Math.ceil(this.stat.size / 512), this.blockRemain = this.blockLen;
          const bufLen = Math.min(this.blockLen, this.maxReadSize);
          this.buf = Buffer.allocUnsafe(bufLen), this.offset = 0, this.pos = 0, this.remain = this.stat.size, 
          this.length = this.buf.length, this[READ]();
        }
        [READ]() {
          const {fd, buf, offset, length, pos} = this;
          fs.read(fd, buf, offset, length, pos, ((er, bytesRead) => {
            if (er) return this[CLOSE]((() => this.emit("error", er)));
            this[ONREAD](bytesRead);
          }));
        }
        [CLOSE](cb) {
          fs.close(this.fd, cb);
        }
        [ONREAD](bytesRead) {
          if (bytesRead <= 0 && this.remain > 0) {
            const er = new Error("encountered unexpected EOF");
            return er.path = this.absolute, er.syscall = "read", er.code = "EOF", this[CLOSE]((() => this.emit("error", er)));
          }
          if (bytesRead > this.remain) {
            const er = new Error("did not encounter expected EOF");
            return er.path = this.absolute, er.syscall = "read", er.code = "EOF", this[CLOSE]((() => this.emit("error", er)));
          }
          if (bytesRead === this.remain) for (let i = bytesRead; i < this.length && bytesRead < this.blockRemain; i++) this.buf[i + this.offset] = 0, 
          bytesRead++, this.remain++;
          const writeBuf = 0 === this.offset && bytesRead === this.buf.length ? this.buf : this.buf.slice(this.offset, this.offset + bytesRead);
          this.write(writeBuf) ? this[ONDRAIN]() : this[AWAITDRAIN]((() => this[ONDRAIN]()));
        }
        [AWAITDRAIN](cb) {
          this.once("drain", cb);
        }
        write(writeBuf) {
          if (this.blockRemain < writeBuf.length) {
            const er = new Error("writing more data than expected");
            return er.path = this.absolute, this.emit("error", er);
          }
          return this.remain -= writeBuf.length, this.blockRemain -= writeBuf.length, this.pos += writeBuf.length, 
          this.offset += writeBuf.length, super.write(writeBuf);
        }
        [ONDRAIN]() {
          if (!this.remain) return this.blockRemain && super.write(Buffer.alloc(this.blockRemain)), 
          this[CLOSE]((er => er ? this.emit("error", er) : this.end()));
          this.offset >= this.length && (this.buf = Buffer.allocUnsafe(Math.min(this.blockRemain, this.buf.length)), 
          this.offset = 0), this.length = this.buf.length - this.offset, this[READ]();
        }
      });
      const WriteEntryTar = warner(class extends MiniPass {
        constructor(readEntry, opt) {
          super(opt = opt || {}), this.preservePaths = !!opt.preservePaths, this.portable = !!opt.portable, 
          this.strict = !!opt.strict, this.noPax = !!opt.noPax, this.noMtime = !!opt.noMtime, 
          this.readEntry = readEntry, this.type = readEntry.type, "Directory" === this.type && this.portable && (this.noMtime = !0), 
          this.prefix = opt.prefix || null, this.path = normPath(readEntry.path), this.mode = this[MODE](readEntry.mode), 
          this.uid = this.portable ? null : readEntry.uid, this.gid = this.portable ? null : readEntry.gid, 
          this.uname = this.portable ? null : readEntry.uname, this.gname = this.portable ? null : readEntry.gname, 
          this.size = readEntry.size, this.mtime = this.noMtime ? null : opt.mtime || readEntry.mtime, 
          this.atime = this.portable ? null : readEntry.atime, this.ctime = this.portable ? null : readEntry.ctime, 
          this.linkpath = normPath(readEntry.linkpath), "function" == typeof opt.onwarn && this.on("warn", opt.onwarn);
          let pathWarn = !1;
          if (!this.preservePaths) {
            const [root, stripped] = stripAbsolutePath(this.path);
            root && (this.path = stripped, pathWarn = root);
          }
          this.remain = readEntry.size, this.blockRemain = readEntry.startBlockSize, this.header = new Header({
            path: this[PREFIX](this.path),
            linkpath: "Link" === this.type ? this[PREFIX](this.linkpath) : this.linkpath,
            mode: this.mode,
            uid: this.portable ? null : this.uid,
            gid: this.portable ? null : this.gid,
            size: this.size,
            mtime: this.noMtime ? null : this.mtime,
            type: this.type,
            uname: this.portable ? null : this.uname,
            atime: this.portable ? null : this.atime,
            ctime: this.portable ? null : this.ctime
          }), pathWarn && this.warn("TAR_ENTRY_INFO", `stripping ${pathWarn} from absolute path`, {
            entry: this,
            path: pathWarn + this.path
          }), this.header.encode() && !this.noPax && super.write(new Pax({
            atime: this.portable ? null : this.atime,
            ctime: this.portable ? null : this.ctime,
            gid: this.portable ? null : this.gid,
            mtime: this.noMtime ? null : this.mtime,
            path: this[PREFIX](this.path),
            linkpath: "Link" === this.type ? this[PREFIX](this.linkpath) : this.linkpath,
            size: this.size,
            uid: this.portable ? null : this.uid,
            uname: this.portable ? null : this.uname,
            dev: this.portable ? null : this.readEntry.dev,
            ino: this.portable ? null : this.readEntry.ino,
            nlink: this.portable ? null : this.readEntry.nlink
          }).encode()), super.write(this.header.block), readEntry.pipe(this);
        }
        [PREFIX](path) {
          return prefixPath(path, this.prefix);
        }
        [MODE](mode) {
          return modeFix(mode, "Directory" === this.type, this.portable);
        }
        write(data) {
          const writeLen = data.length;
          if (writeLen > this.blockRemain) throw new Error("writing more to entry than is appropriate");
          return this.blockRemain -= writeLen, super.write(data);
        }
        end() {
          return this.blockRemain && super.write(Buffer.alloc(this.blockRemain)), super.end();
        }
      });
      WriteEntry.Sync = class extends WriteEntry {
        [LSTAT]() {
          this[ONLSTAT](fs.lstatSync(this.absolute));
        }
        [SYMLINK]() {
          this[ONREADLINK](fs.readlinkSync(this.absolute));
        }
        [OPENFILE]() {
          this[ONOPENFILE](fs.openSync(this.absolute, "r"));
        }
        [READ]() {
          let threw = !0;
          try {
            const {fd, buf, offset, length, pos} = this, bytesRead = fs.readSync(fd, buf, offset, length, pos);
            this[ONREAD](bytesRead), threw = !1;
          } finally {
            if (threw) try {
              this[CLOSE]((() => {}));
            } catch (er) {}
          }
        }
        [AWAITDRAIN](cb) {
          cb();
        }
        [CLOSE](cb) {
          fs.closeSync(this.fd), cb();
        }
      }, WriteEntry.Tar = WriteEntryTar;
      const getType = stat => stat.isFile() ? "File" : stat.isDirectory() ? "Directory" : stat.isSymbolicLink() ? "SymbolicLink" : "Unsupported";
      module.exports = WriteEntry;
    },
    9220: module => {
      "use strict";
      module.exports = function(Yallist) {
        Yallist.prototype[Symbol.iterator] = function*() {
          for (let walker = this.head; walker; walker = walker.next) yield walker.value;
        };
      };
    },
    33836: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      function Yallist(list) {
        var self = this;
        if (self instanceof Yallist || (self = new Yallist), self.tail = null, self.head = null, 
        self.length = 0, list && "function" == typeof list.forEach) list.forEach((function(item) {
          self.push(item);
        })); else if (arguments.length > 0) for (var i = 0, l = arguments.length; i < l; i++) self.push(arguments[i]);
        return self;
      }
      function insert(self, node, value) {
        var inserted = node === self.head ? new Node(value, null, node, self) : new Node(value, node, node.next, self);
        return null === inserted.next && (self.tail = inserted), null === inserted.prev && (self.head = inserted), 
        self.length++, inserted;
      }
      function push(self, item) {
        self.tail = new Node(item, self.tail, null, self), self.head || (self.head = self.tail), 
        self.length++;
      }
      function unshift(self, item) {
        self.head = new Node(item, null, self.head, self), self.tail || (self.tail = self.head), 
        self.length++;
      }
      function Node(value, prev, next, list) {
        if (!(this instanceof Node)) return new Node(value, prev, next, list);
        this.list = list, this.value = value, prev ? (prev.next = this, this.prev = prev) : this.prev = null, 
        next ? (next.prev = this, this.next = next) : this.next = null;
      }
      module.exports = Yallist, Yallist.Node = Node, Yallist.create = Yallist, Yallist.prototype.removeNode = function(node) {
        if (node.list !== this) throw new Error("removing node which does not belong to this list");
        var next = node.next, prev = node.prev;
        return next && (next.prev = prev), prev && (prev.next = next), node === this.head && (this.head = next), 
        node === this.tail && (this.tail = prev), node.list.length--, node.next = null, 
        node.prev = null, node.list = null, next;
      }, Yallist.prototype.unshiftNode = function(node) {
        if (node !== this.head) {
          node.list && node.list.removeNode(node);
          var head = this.head;
          node.list = this, node.next = head, head && (head.prev = node), this.head = node, 
          this.tail || (this.tail = node), this.length++;
        }
      }, Yallist.prototype.pushNode = function(node) {
        if (node !== this.tail) {
          node.list && node.list.removeNode(node);
          var tail = this.tail;
          node.list = this, node.prev = tail, tail && (tail.next = node), this.tail = node, 
          this.head || (this.head = node), this.length++;
        }
      }, Yallist.prototype.push = function() {
        for (var i = 0, l = arguments.length; i < l; i++) push(this, arguments[i]);
        return this.length;
      }, Yallist.prototype.unshift = function() {
        for (var i = 0, l = arguments.length; i < l; i++) unshift(this, arguments[i]);
        return this.length;
      }, Yallist.prototype.pop = function() {
        if (this.tail) {
          var res = this.tail.value;
          return this.tail = this.tail.prev, this.tail ? this.tail.next = null : this.head = null, 
          this.length--, res;
        }
      }, Yallist.prototype.shift = function() {
        if (this.head) {
          var res = this.head.value;
          return this.head = this.head.next, this.head ? this.head.prev = null : this.tail = null, 
          this.length--, res;
        }
      }, Yallist.prototype.forEach = function(fn, thisp) {
        thisp = thisp || this;
        for (var walker = this.head, i = 0; null !== walker; i++) fn.call(thisp, walker.value, i, this), 
        walker = walker.next;
      }, Yallist.prototype.forEachReverse = function(fn, thisp) {
        thisp = thisp || this;
        for (var walker = this.tail, i = this.length - 1; null !== walker; i--) fn.call(thisp, walker.value, i, this), 
        walker = walker.prev;
      }, Yallist.prototype.get = function(n) {
        for (var i = 0, walker = this.head; null !== walker && i < n; i++) walker = walker.next;
        if (i === n && null !== walker) return walker.value;
      }, Yallist.prototype.getReverse = function(n) {
        for (var i = 0, walker = this.tail; null !== walker && i < n; i++) walker = walker.prev;
        if (i === n && null !== walker) return walker.value;
      }, Yallist.prototype.map = function(fn, thisp) {
        thisp = thisp || this;
        for (var res = new Yallist, walker = this.head; null !== walker; ) res.push(fn.call(thisp, walker.value, this)), 
        walker = walker.next;
        return res;
      }, Yallist.prototype.mapReverse = function(fn, thisp) {
        thisp = thisp || this;
        for (var res = new Yallist, walker = this.tail; null !== walker; ) res.push(fn.call(thisp, walker.value, this)), 
        walker = walker.prev;
        return res;
      }, Yallist.prototype.reduce = function(fn, initial) {
        var acc, walker = this.head;
        if (arguments.length > 1) acc = initial; else {
          if (!this.head) throw new TypeError("Reduce of empty list with no initial value");
          walker = this.head.next, acc = this.head.value;
        }
        for (var i = 0; null !== walker; i++) acc = fn(acc, walker.value, i), walker = walker.next;
        return acc;
      }, Yallist.prototype.reduceReverse = function(fn, initial) {
        var acc, walker = this.tail;
        if (arguments.length > 1) acc = initial; else {
          if (!this.tail) throw new TypeError("Reduce of empty list with no initial value");
          walker = this.tail.prev, acc = this.tail.value;
        }
        for (var i = this.length - 1; null !== walker; i--) acc = fn(acc, walker.value, i), 
        walker = walker.prev;
        return acc;
      }, Yallist.prototype.toArray = function() {
        for (var arr = new Array(this.length), i = 0, walker = this.head; null !== walker; i++) arr[i] = walker.value, 
        walker = walker.next;
        return arr;
      }, Yallist.prototype.toArrayReverse = function() {
        for (var arr = new Array(this.length), i = 0, walker = this.tail; null !== walker; i++) arr[i] = walker.value, 
        walker = walker.prev;
        return arr;
      }, Yallist.prototype.slice = function(from, to) {
        (to = to || this.length) < 0 && (to += this.length), (from = from || 0) < 0 && (from += this.length);
        var ret = new Yallist;
        if (to < from || to < 0) return ret;
        from < 0 && (from = 0), to > this.length && (to = this.length);
        for (var i = 0, walker = this.head; null !== walker && i < from; i++) walker = walker.next;
        for (;null !== walker && i < to; i++, walker = walker.next) ret.push(walker.value);
        return ret;
      }, Yallist.prototype.sliceReverse = function(from, to) {
        (to = to || this.length) < 0 && (to += this.length), (from = from || 0) < 0 && (from += this.length);
        var ret = new Yallist;
        if (to < from || to < 0) return ret;
        from < 0 && (from = 0), to > this.length && (to = this.length);
        for (var i = this.length, walker = this.tail; null !== walker && i > to; i--) walker = walker.prev;
        for (;null !== walker && i > from; i--, walker = walker.prev) ret.push(walker.value);
        return ret;
      }, Yallist.prototype.splice = function(start, deleteCount, ...nodes) {
        start > this.length && (start = this.length - 1), start < 0 && (start = this.length + start);
        for (var i = 0, walker = this.head; null !== walker && i < start; i++) walker = walker.next;
        var ret = [];
        for (i = 0; walker && i < deleteCount; i++) ret.push(walker.value), walker = this.removeNode(walker);
        null === walker && (walker = this.tail), walker !== this.head && walker !== this.tail && (walker = walker.prev);
        for (i = 0; i < nodes.length; i++) walker = insert(this, walker, nodes[i]);
        return ret;
      }, Yallist.prototype.reverse = function() {
        for (var head = this.head, tail = this.tail, walker = head; null !== walker; walker = walker.prev) {
          var p = walker.prev;
          walker.prev = walker.next, walker.next = p;
        }
        return this.head = tail, this.tail = head, this;
      };
      try {
        __webpack_require__(9220)(Yallist);
      } catch (er) {}
    },
    45018: module => {
      "use strict";
      module.exports = require("../vendor/minipass");
    },
    39491: module => {
      "use strict";
      module.exports = require("assert");
    },
    14300: module => {
      "use strict";
      module.exports = require("buffer");
    },
    6113: module => {
      "use strict";
      module.exports = require("crypto");
    },
    82361: module => {
      "use strict";
      module.exports = require("events");
    },
    57147: module => {
      "use strict";
      module.exports = require("fs");
    },
    71017: module => {
      "use strict";
      module.exports = require("path");
    },
    73837: module => {
      "use strict";
      module.exports = require("util");
    },
    59796: module => {
      "use strict";
      module.exports = require("zlib");
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
    "use strict";
    var exports = __webpack_exports__;
    exports.c = exports.create = __webpack_require__(35680), exports.r = exports.replace = __webpack_require__(70417), 
    exports.t = exports.list = __webpack_require__(50121), exports.u = exports.update = __webpack_require__(63088), 
    exports.x = exports.extract = __webpack_require__(10825), exports.Pack = __webpack_require__(52846), 
    exports.Unpack = __webpack_require__(46850), exports.Parse = __webpack_require__(34075), 
    exports.ReadEntry = __webpack_require__(8646), exports.WriteEntry = __webpack_require__(99411), 
    exports.Header = __webpack_require__(63389), exports.Pax = __webpack_require__(53224), 
    exports.types = __webpack_require__(15156);
  })();
  var __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
})();