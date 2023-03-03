"use strict";

const proc = "object" == typeof process && process ? process : {
  stdout: null,
  stderr: null
}, EE = require("events"), Stream = require("stream"), SD = require("string_decoder").StringDecoder, EOF = Symbol("EOF"), MAYBE_EMIT_END = Symbol("maybeEmitEnd"), EMITTED_END = Symbol("emittedEnd"), EMITTING_END = Symbol("emittingEnd"), EMITTED_ERROR = Symbol("emittedError"), CLOSED = Symbol("closed"), READ = Symbol("read"), FLUSH = Symbol("flush"), FLUSHCHUNK = Symbol("flushChunk"), ENCODING = Symbol("encoding"), DECODER = Symbol("decoder"), FLOWING = Symbol("flowing"), PAUSED = Symbol("paused"), RESUME = Symbol("resume"), BUFFERLENGTH = Symbol("bufferLength"), BUFFERPUSH = Symbol("bufferPush"), BUFFERSHIFT = Symbol("bufferShift"), OBJECTMODE = Symbol("objectMode"), DESTROYED = Symbol("destroyed"), EMITDATA = Symbol("emitData"), EMITEND = Symbol("emitEnd"), EMITEND2 = Symbol("emitEnd2"), ASYNC = Symbol("async"), defer = fn => Promise.resolve().then(fn), doIter = "1" !== global._MP_NO_ITERATOR_SYMBOLS_, ASYNCITERATOR = doIter && Symbol.asyncIterator || Symbol("asyncIterator not implemented"), ITERATOR = doIter && Symbol.iterator || Symbol("iterator not implemented"), isEndish = ev => "end" === ev || "finish" === ev || "prefinish" === ev, isArrayBuffer = b => b instanceof ArrayBuffer || "object" == typeof b && b.constructor && "ArrayBuffer" === b.constructor.name && b.byteLength >= 0, isArrayBufferView = b => !Buffer.isBuffer(b) && ArrayBuffer.isView(b);

class Pipe {
  constructor(src, dest, opts) {
    this.src = src, this.dest = dest, this.opts = opts, this.ondrain = () => src[RESUME](), 
    dest.on("drain", this.ondrain);
  }
  unpipe() {
    this.dest.removeListener("drain", this.ondrain);
  }
  proxyErrors() {}
  end() {
    this.unpipe(), this.opts.end && this.dest.end();
  }
}

class PipeProxyErrors extends Pipe {
  unpipe() {
    this.src.removeListener("error", this.proxyErrors), super.unpipe();
  }
  constructor(src, dest, opts) {
    super(src, dest, opts), this.proxyErrors = er => dest.emit("error", er), src.on("error", this.proxyErrors);
  }
}

module.exports = class Minipass extends Stream {
  constructor(options) {
    super(), this[FLOWING] = !1, this[PAUSED] = !1, this.pipes = [], this.buffer = [], 
    this[OBJECTMODE] = options && options.objectMode || !1, this[OBJECTMODE] ? this[ENCODING] = null : this[ENCODING] = options && options.encoding || null, 
    "buffer" === this[ENCODING] && (this[ENCODING] = null), this[ASYNC] = options && !!options.async || !1, 
    this[DECODER] = this[ENCODING] ? new SD(this[ENCODING]) : null, this[EOF] = !1, 
    this[EMITTED_END] = !1, this[EMITTING_END] = !1, this[CLOSED] = !1, this[EMITTED_ERROR] = null, 
    this.writable = !0, this.readable = !0, this[BUFFERLENGTH] = 0, this[DESTROYED] = !1;
  }
  get bufferLength() {
    return this[BUFFERLENGTH];
  }
  get encoding() {
    return this[ENCODING];
  }
  set encoding(enc) {
    if (this[OBJECTMODE]) throw new Error("cannot set encoding in objectMode");
    if (this[ENCODING] && enc !== this[ENCODING] && (this[DECODER] && this[DECODER].lastNeed || this[BUFFERLENGTH])) throw new Error("cannot change encoding");
    this[ENCODING] !== enc && (this[DECODER] = enc ? new SD(enc) : null, this.buffer.length && (this.buffer = this.buffer.map((chunk => this[DECODER].write(chunk))))), 
    this[ENCODING] = enc;
  }
  setEncoding(enc) {
    this.encoding = enc;
  }
  get objectMode() {
    return this[OBJECTMODE];
  }
  set objectMode(om) {
    this[OBJECTMODE] = this[OBJECTMODE] || !!om;
  }
  get async() {
    return this[ASYNC];
  }
  set async(a) {
    this[ASYNC] = this[ASYNC] || !!a;
  }
  write(chunk, encoding, cb) {
    if (this[EOF]) throw new Error("write after end");
    if (this[DESTROYED]) return this.emit("error", Object.assign(new Error("Cannot call write after a stream was destroyed"), {
      code: "ERR_STREAM_DESTROYED"
    })), !0;
    "function" == typeof encoding && (cb = encoding, encoding = "utf8"), encoding || (encoding = "utf8");
    const fn = this[ASYNC] ? defer : f => f();
    var b;
    return this[OBJECTMODE] || Buffer.isBuffer(chunk) || (b = chunk, !Buffer.isBuffer(b) && ArrayBuffer.isView(b) ? chunk = Buffer.from(chunk.buffer, chunk.byteOffset, chunk.byteLength) : isArrayBuffer(chunk) ? chunk = Buffer.from(chunk) : "string" != typeof chunk && (this.objectMode = !0)), 
    this[OBJECTMODE] ? (this.flowing && 0 !== this[BUFFERLENGTH] && this[FLUSH](!0), 
    this.flowing ? this.emit("data", chunk) : this[BUFFERPUSH](chunk), 0 !== this[BUFFERLENGTH] && this.emit("readable"), 
    cb && fn(cb), this.flowing) : chunk.length ? ("string" != typeof chunk || encoding === this[ENCODING] && !this[DECODER].lastNeed || (chunk = Buffer.from(chunk, encoding)), 
    Buffer.isBuffer(chunk) && this[ENCODING] && (chunk = this[DECODER].write(chunk)), 
    this.flowing && 0 !== this[BUFFERLENGTH] && this[FLUSH](!0), this.flowing ? this.emit("data", chunk) : this[BUFFERPUSH](chunk), 
    0 !== this[BUFFERLENGTH] && this.emit("readable"), cb && fn(cb), this.flowing) : (0 !== this[BUFFERLENGTH] && this.emit("readable"), 
    cb && fn(cb), this.flowing);
  }
  read(n) {
    if (this[DESTROYED]) return null;
    if (0 === this[BUFFERLENGTH] || 0 === n || n > this[BUFFERLENGTH]) return this[MAYBE_EMIT_END](), 
    null;
    this[OBJECTMODE] && (n = null), this.buffer.length > 1 && !this[OBJECTMODE] && (this.encoding ? this.buffer = [ this.buffer.join("") ] : this.buffer = [ Buffer.concat(this.buffer, this[BUFFERLENGTH]) ]);
    const ret = this[READ](n || null, this.buffer[0]);
    return this[MAYBE_EMIT_END](), ret;
  }
  [READ](n, chunk) {
    return n === chunk.length || null === n ? this[BUFFERSHIFT]() : (this.buffer[0] = chunk.slice(n), 
    chunk = chunk.slice(0, n), this[BUFFERLENGTH] -= n), this.emit("data", chunk), this.buffer.length || this[EOF] || this.emit("drain"), 
    chunk;
  }
  end(chunk, encoding, cb) {
    return "function" == typeof chunk && (cb = chunk, chunk = null), "function" == typeof encoding && (cb = encoding, 
    encoding = "utf8"), chunk && this.write(chunk, encoding), cb && this.once("end", cb), 
    this[EOF] = !0, this.writable = !1, !this.flowing && this[PAUSED] || this[MAYBE_EMIT_END](), 
    this;
  }
  [RESUME]() {
    this[DESTROYED] || (this[PAUSED] = !1, this[FLOWING] = !0, this.emit("resume"), 
    this.buffer.length ? this[FLUSH]() : this[EOF] ? this[MAYBE_EMIT_END]() : this.emit("drain"));
  }
  resume() {
    return this[RESUME]();
  }
  pause() {
    this[FLOWING] = !1, this[PAUSED] = !0;
  }
  get destroyed() {
    return this[DESTROYED];
  }
  get flowing() {
    return this[FLOWING];
  }
  get paused() {
    return this[PAUSED];
  }
  [BUFFERPUSH](chunk) {
    this[OBJECTMODE] ? this[BUFFERLENGTH] += 1 : this[BUFFERLENGTH] += chunk.length, 
    this.buffer.push(chunk);
  }
  [BUFFERSHIFT]() {
    return this.buffer.length && (this[OBJECTMODE] ? this[BUFFERLENGTH] -= 1 : this[BUFFERLENGTH] -= this.buffer[0].length), 
    this.buffer.shift();
  }
  [FLUSH](noDrain) {
    do {} while (this[FLUSHCHUNK](this[BUFFERSHIFT]()));
    noDrain || this.buffer.length || this[EOF] || this.emit("drain");
  }
  [FLUSHCHUNK](chunk) {
    return !!chunk && (this.emit("data", chunk), this.flowing);
  }
  pipe(dest, opts) {
    if (this[DESTROYED]) return;
    const ended = this[EMITTED_END];
    return opts = opts || {}, dest === proc.stdout || dest === proc.stderr ? opts.end = !1 : opts.end = !1 !== opts.end, 
    opts.proxyErrors = !!opts.proxyErrors, ended ? opts.end && dest.end() : (this.pipes.push(opts.proxyErrors ? new PipeProxyErrors(this, dest, opts) : new Pipe(this, dest, opts)), 
    this[ASYNC] ? defer((() => this[RESUME]())) : this[RESUME]()), dest;
  }
  unpipe(dest) {
    const p = this.pipes.find((p => p.dest === dest));
    p && (this.pipes.splice(this.pipes.indexOf(p), 1), p.unpipe());
  }
  addListener(ev, fn) {
    return this.on(ev, fn);
  }
  on(ev, fn) {
    const ret = super.on(ev, fn);
    return "data" !== ev || this.pipes.length || this.flowing ? "readable" === ev && 0 !== this[BUFFERLENGTH] ? super.emit("readable") : isEndish(ev) && this[EMITTED_END] ? (super.emit(ev), 
    this.removeAllListeners(ev)) : "error" === ev && this[EMITTED_ERROR] && (this[ASYNC] ? defer((() => fn.call(this, this[EMITTED_ERROR]))) : fn.call(this, this[EMITTED_ERROR])) : this[RESUME](), 
    ret;
  }
  get emittedEnd() {
    return this[EMITTED_END];
  }
  [MAYBE_EMIT_END]() {
    this[EMITTING_END] || this[EMITTED_END] || this[DESTROYED] || 0 !== this.buffer.length || !this[EOF] || (this[EMITTING_END] = !0, 
    this.emit("end"), this.emit("prefinish"), this.emit("finish"), this[CLOSED] && this.emit("close"), 
    this[EMITTING_END] = !1);
  }
  emit(ev, data, ...extra) {
    if ("error" !== ev && "close" !== ev && ev !== DESTROYED && this[DESTROYED]) return;
    if ("data" === ev) return !!data && (this[ASYNC] ? defer((() => this[EMITDATA](data))) : this[EMITDATA](data));
    if ("end" === ev) return this[EMITEND]();
    if ("close" === ev) {
      if (this[CLOSED] = !0, !this[EMITTED_END] && !this[DESTROYED]) return;
      const ret = super.emit("close");
      return this.removeAllListeners("close"), ret;
    }
    if ("error" === ev) {
      this[EMITTED_ERROR] = data;
      const ret = super.emit("error", data);
      return this[MAYBE_EMIT_END](), ret;
    }
    if ("resume" === ev) {
      const ret = super.emit("resume");
      return this[MAYBE_EMIT_END](), ret;
    }
    if ("finish" === ev || "prefinish" === ev) {
      const ret = super.emit(ev);
      return this.removeAllListeners(ev), ret;
    }
    const ret = super.emit(ev, data, ...extra);
    return this[MAYBE_EMIT_END](), ret;
  }
  [EMITDATA](data) {
    for (const p of this.pipes) !1 === p.dest.write(data) && this.pause();
    const ret = super.emit("data", data);
    return this[MAYBE_EMIT_END](), ret;
  }
  [EMITEND]() {
    this[EMITTED_END] || (this[EMITTED_END] = !0, this.readable = !1, this[ASYNC] ? defer((() => this[EMITEND2]())) : this[EMITEND2]());
  }
  [EMITEND2]() {
    if (this[DECODER]) {
      const data = this[DECODER].end();
      if (data) {
        for (const p of this.pipes) p.dest.write(data);
        super.emit("data", data);
      }
    }
    for (const p of this.pipes) p.end();
    const ret = super.emit("end");
    return this.removeAllListeners("end"), ret;
  }
  collect() {
    const buf = [];
    this[OBJECTMODE] || (buf.dataLength = 0);
    const p = this.promise();
    return this.on("data", (c => {
      buf.push(c), this[OBJECTMODE] || (buf.dataLength += c.length);
    })), p.then((() => buf));
  }
  concat() {
    return this[OBJECTMODE] ? Promise.reject(new Error("cannot concat in objectMode")) : this.collect().then((buf => this[OBJECTMODE] ? Promise.reject(new Error("cannot concat in objectMode")) : this[ENCODING] ? buf.join("") : Buffer.concat(buf, buf.dataLength)));
  }
  promise() {
    return new Promise(((resolve, reject) => {
      this.on(DESTROYED, (() => reject(new Error("stream destroyed")))), this.on("error", (er => reject(er))), 
      this.on("end", (() => resolve()));
    }));
  }
  [ASYNCITERATOR]() {
    return {
      next: () => {
        const res = this.read();
        if (null !== res) return Promise.resolve({
          done: !1,
          value: res
        });
        if (this[EOF]) return Promise.resolve({
          done: !0
        });
        let resolve = null, reject = null;
        const onerr = er => {
          this.removeListener("data", ondata), this.removeListener("end", onend), reject(er);
        }, ondata = value => {
          this.removeListener("error", onerr), this.removeListener("end", onend), this.pause(), 
          resolve({
            value,
            done: !!this[EOF]
          });
        }, onend = () => {
          this.removeListener("error", onerr), this.removeListener("data", ondata), resolve({
            done: !0
          });
        }, ondestroy = () => onerr(new Error("stream destroyed"));
        return new Promise(((res, rej) => {
          reject = rej, resolve = res, this.once(DESTROYED, ondestroy), this.once("error", onerr), 
          this.once("end", onend), this.once("data", ondata);
        }));
      }
    };
  }
  [ITERATOR]() {
    return {
      next: () => {
        const value = this.read();
        return {
          value,
          done: null === value
        };
      }
    };
  }
  destroy(er) {
    return this[DESTROYED] ? (er ? this.emit("error", er) : this.emit(DESTROYED), this) : (this[DESTROYED] = !0, 
    this.buffer.length = 0, this[BUFFERLENGTH] = 0, "function" != typeof this.close || this[CLOSED] || this.close(), 
    er ? this.emit("error", er) : this.emit(DESTROYED), this);
  }
  static isStream(s) {
    return !!s && (s instanceof Minipass || s instanceof Stream || s instanceof EE && ("function" == typeof s.pipe || "function" == typeof s.write && "function" == typeof s.end));
  }
};