const perf = "object" == typeof performance && performance && "function" == typeof performance.now ? performance : Date, hasAbortController = "function" == typeof AbortController, AC = hasAbortController ? AbortController : class {
  constructor() {
    this.signal = new AS;
  }
  abort() {
    this.signal.dispatchEvent("abort");
  }
}, hasAbortSignal = "function" == typeof AbortSignal, hasACAbortSignal = "function" == typeof AC.AbortSignal, AS = hasAbortSignal ? AbortSignal : hasACAbortSignal ? AC.AbortController : class {
  constructor() {
    this.aborted = !1, this._listeners = [];
  }
  dispatchEvent(type) {
    if ("abort" === type) {
      this.aborted = !0;
      const e = {
        type,
        target: this
      };
      this.onabort(e), this._listeners.forEach((f => f(e)), this);
    }
  }
  onabort() {}
  addEventListener(ev, fn) {
    "abort" === ev && this._listeners.push(fn);
  }
  removeEventListener(ev, fn) {
    "abort" === ev && (this._listeners = this._listeners.filter((f => f !== fn)));
  }
}, warned = new Set, deprecatedOption = (opt, instead) => {
  const code = `LRU_CACHE_OPTION_${opt}`;
  shouldWarn(code) && warn(code, `${opt} option`, `options.${instead}`, LRUCache);
}, deprecatedMethod = (method, instead) => {
  const code = `LRU_CACHE_METHOD_${method}`;
  if (shouldWarn(code)) {
    const {prototype} = LRUCache, {get} = Object.getOwnPropertyDescriptor(prototype, method);
    warn(code, `${method} method`, `cache.${instead}()`, get);
  }
}, deprecatedProperty = (field, instead) => {
  const code = `LRU_CACHE_PROPERTY_${field}`;
  if (shouldWarn(code)) {
    const {prototype} = LRUCache, {get} = Object.getOwnPropertyDescriptor(prototype, field);
    warn(code, `${field} property`, `cache.${instead}`, get);
  }
}, emitWarning = (...a) => {
  "object" == typeof process && process && "function" == typeof process.emitWarning ? process.emitWarning(...a) : console.error(...a);
}, shouldWarn = code => !warned.has(code), warn = (code, what, instead, fn) => {
  warned.add(code);
  emitWarning(`The ${what} is deprecated. Please use ${instead} instead.`, "DeprecationWarning", code, fn);
}, isPosInt = n => n && n === Math.floor(n) && n > 0 && isFinite(n), getUintArray = max => isPosInt(max) ? max <= Math.pow(2, 8) ? Uint8Array : max <= Math.pow(2, 16) ? Uint16Array : max <= Math.pow(2, 32) ? Uint32Array : max <= Number.MAX_SAFE_INTEGER ? ZeroArray : null : null;

class ZeroArray extends Array {
  constructor(size) {
    super(size), this.fill(0);
  }
}

class Stack {
  constructor(max) {
    if (0 === max) return [];
    const UintArray = getUintArray(max);
    this.heap = new UintArray(max), this.length = 0;
  }
  push(n) {
    this.heap[this.length++] = n;
  }
  pop() {
    return this.heap[--this.length];
  }
}

class LRUCache {
  constructor(options = {}) {
    const {max = 0, ttl, ttlResolution = 1, ttlAutopurge, updateAgeOnGet, updateAgeOnHas, allowStale, dispose, disposeAfter, noDisposeOnSet, noUpdateTTL, maxSize = 0, sizeCalculation, fetchMethod, fetchContext, noDeleteOnFetchRejection, noDeleteOnStaleGet} = options, {length, maxAge, stale} = options instanceof LRUCache ? {} : options;
    if (0 !== max && !isPosInt(max)) throw new TypeError("max option must be a nonnegative integer");
    const UintArray = max ? getUintArray(max) : Array;
    if (!UintArray) throw new Error("invalid max value: " + max);
    if (this.max = max, this.maxSize = maxSize, this.sizeCalculation = sizeCalculation || length, 
    this.sizeCalculation) {
      if (!this.maxSize) throw new TypeError("cannot set sizeCalculation without setting maxSize");
      if ("function" != typeof this.sizeCalculation) throw new TypeError("sizeCalculation set to non-function");
    }
    if (this.fetchMethod = fetchMethod || null, this.fetchMethod && "function" != typeof this.fetchMethod) throw new TypeError("fetchMethod must be a function if specified");
    if (this.fetchContext = fetchContext, !this.fetchMethod && void 0 !== fetchContext) throw new TypeError("cannot set fetchContext without fetchMethod");
    if (this.keyMap = new Map, this.keyList = new Array(max).fill(null), this.valList = new Array(max).fill(null), 
    this.next = new UintArray(max), this.prev = new UintArray(max), this.head = 0, this.tail = 0, 
    this.free = new Stack(max), this.initialFill = 1, this.size = 0, "function" == typeof dispose && (this.dispose = dispose), 
    "function" == typeof disposeAfter ? (this.disposeAfter = disposeAfter, this.disposed = []) : (this.disposeAfter = null, 
    this.disposed = null), this.noDisposeOnSet = !!noDisposeOnSet, this.noUpdateTTL = !!noUpdateTTL, 
    this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection, 0 !== this.maxSize) {
      if (!isPosInt(this.maxSize)) throw new TypeError("maxSize must be a positive integer if specified");
      this.initializeSizeTracking();
    }
    if (this.allowStale = !!allowStale || !!stale, this.noDeleteOnStaleGet = !!noDeleteOnStaleGet, 
    this.updateAgeOnGet = !!updateAgeOnGet, this.updateAgeOnHas = !!updateAgeOnHas, 
    this.ttlResolution = isPosInt(ttlResolution) || 0 === ttlResolution ? ttlResolution : 1, 
    this.ttlAutopurge = !!ttlAutopurge, this.ttl = ttl || maxAge || 0, this.ttl) {
      if (!isPosInt(this.ttl)) throw new TypeError("ttl must be a positive integer if specified");
      this.initializeTTLTracking();
    }
    if (0 === this.max && 0 === this.ttl && 0 === this.maxSize) throw new TypeError("At least one of max, maxSize, or ttl is required");
    if (!this.ttlAutopurge && !this.max && !this.maxSize) {
      const code = "LRU_CACHE_UNBOUNDED";
      if (shouldWarn(code)) {
        warned.add(code);
        emitWarning("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.", "UnboundedCacheWarning", code, LRUCache);
      }
    }
    stale && deprecatedOption("stale", "allowStale"), maxAge && deprecatedOption("maxAge", "ttl"), 
    length && deprecatedOption("length", "sizeCalculation");
  }
  getRemainingTTL(key) {
    return this.has(key, {
      updateAgeOnHas: !1
    }) ? 1 / 0 : 0;
  }
  initializeTTLTracking() {
    this.ttls = new ZeroArray(this.max), this.starts = new ZeroArray(this.max), this.setItemTTL = (index, ttl, start = perf.now()) => {
      if (this.starts[index] = 0 !== ttl ? start : 0, this.ttls[index] = ttl, 0 !== ttl && this.ttlAutopurge) {
        const t = setTimeout((() => {
          this.isStale(index) && this.delete(this.keyList[index]);
        }), ttl + 1);
        t.unref && t.unref();
      }
    }, this.updateItemAge = index => {
      this.starts[index] = 0 !== this.ttls[index] ? perf.now() : 0;
    };
    let cachedNow = 0;
    const getNow = () => {
      const n = perf.now();
      if (this.ttlResolution > 0) {
        cachedNow = n;
        const t = setTimeout((() => cachedNow = 0), this.ttlResolution);
        t.unref && t.unref();
      }
      return n;
    };
    this.getRemainingTTL = key => {
      const index = this.keyMap.get(key);
      return void 0 === index ? 0 : 0 === this.ttls[index] || 0 === this.starts[index] ? 1 / 0 : this.starts[index] + this.ttls[index] - (cachedNow || getNow());
    }, this.isStale = index => 0 !== this.ttls[index] && 0 !== this.starts[index] && (cachedNow || getNow()) - this.starts[index] > this.ttls[index];
  }
  updateItemAge(index) {}
  setItemTTL(index, ttl, start) {}
  isStale(index) {
    return !1;
  }
  initializeSizeTracking() {
    this.calculatedSize = 0, this.sizes = new ZeroArray(this.max), this.removeItemSize = index => {
      this.calculatedSize -= this.sizes[index], this.sizes[index] = 0;
    }, this.requireSize = (k, v, size, sizeCalculation) => {
      if (!isPosInt(size)) {
        if (!sizeCalculation) throw new TypeError("invalid size value (must be positive integer)");
        if ("function" != typeof sizeCalculation) throw new TypeError("sizeCalculation must be a function");
        if (size = sizeCalculation(v, k), !isPosInt(size)) throw new TypeError("sizeCalculation return invalid (expect positive integer)");
      }
      return size;
    }, this.addItemSize = (index, size) => {
      this.sizes[index] = size;
      const maxSize = this.maxSize - this.sizes[index];
      for (;this.calculatedSize > maxSize; ) this.evict(!0);
      this.calculatedSize += this.sizes[index];
    };
  }
  removeItemSize(index) {}
  addItemSize(index, size) {}
  requireSize(k, v, size, sizeCalculation) {
    if (size || sizeCalculation) throw new TypeError("cannot set size without setting maxSize on cache");
  }
  * indexes({allowStale = this.allowStale} = {}) {
    if (this.size) for (let i = this.tail; this.isValidIndex(i) && (!allowStale && this.isStale(i) || (yield i), 
    i !== this.head); ) i = this.prev[i];
  }
  * rindexes({allowStale = this.allowStale} = {}) {
    if (this.size) for (let i = this.head; this.isValidIndex(i) && (!allowStale && this.isStale(i) || (yield i), 
    i !== this.tail); ) i = this.next[i];
  }
  isValidIndex(index) {
    return this.keyMap.get(this.keyList[index]) === index;
  }
  * entries() {
    for (const i of this.indexes()) yield [ this.keyList[i], this.valList[i] ];
  }
  * rentries() {
    for (const i of this.rindexes()) yield [ this.keyList[i], this.valList[i] ];
  }
  * keys() {
    for (const i of this.indexes()) yield this.keyList[i];
  }
  * rkeys() {
    for (const i of this.rindexes()) yield this.keyList[i];
  }
  * values() {
    for (const i of this.indexes()) yield this.valList[i];
  }
  * rvalues() {
    for (const i of this.rindexes()) yield this.valList[i];
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  find(fn, getOptions = {}) {
    for (const i of this.indexes()) if (fn(this.valList[i], this.keyList[i], this)) return this.get(this.keyList[i], getOptions);
  }
  forEach(fn, thisp = this) {
    for (const i of this.indexes()) fn.call(thisp, this.valList[i], this.keyList[i], this);
  }
  rforEach(fn, thisp = this) {
    for (const i of this.rindexes()) fn.call(thisp, this.valList[i], this.keyList[i], this);
  }
  get prune() {
    return deprecatedMethod("prune", "purgeStale"), this.purgeStale;
  }
  purgeStale() {
    let deleted = !1;
    for (const i of this.rindexes({
      allowStale: !0
    })) this.isStale(i) && (this.delete(this.keyList[i]), deleted = !0);
    return deleted;
  }
  dump() {
    const arr = [];
    for (const i of this.indexes({
      allowStale: !0
    })) {
      const key = this.keyList[i], v = this.valList[i], entry = {
        value: this.isBackgroundFetch(v) ? v.__staleWhileFetching : v
      };
      if (this.ttls) {
        entry.ttl = this.ttls[i];
        const age = perf.now() - this.starts[i];
        entry.start = Math.floor(Date.now() - age);
      }
      this.sizes && (entry.size = this.sizes[i]), arr.unshift([ key, entry ]);
    }
    return arr;
  }
  load(arr) {
    this.clear();
    for (const [key, entry] of arr) {
      if (entry.start) {
        const age = Date.now() - entry.start;
        entry.start = perf.now() - age;
      }
      this.set(key, entry.value, entry);
    }
  }
  dispose(v, k, reason) {}
  set(k, v, {ttl = this.ttl, start, noDisposeOnSet = this.noDisposeOnSet, size = 0, sizeCalculation = this.sizeCalculation, noUpdateTTL = this.noUpdateTTL} = {}) {
    if (size = this.requireSize(k, v, size, sizeCalculation), this.maxSize && size > this.maxSize) return this;
    let index = 0 === this.size ? void 0 : this.keyMap.get(k);
    if (void 0 === index) index = this.newIndex(), this.keyList[index] = k, this.valList[index] = v, 
    this.keyMap.set(k, index), this.next[this.tail] = index, this.prev[index] = this.tail, 
    this.tail = index, this.size++, this.addItemSize(index, size), noUpdateTTL = !1; else {
      const oldVal = this.valList[index];
      v !== oldVal && (this.isBackgroundFetch(oldVal) ? oldVal.__abortController.abort() : noDisposeOnSet || (this.dispose(oldVal, k, "set"), 
      this.disposeAfter && this.disposed.push([ oldVal, k, "set" ])), this.removeItemSize(index), 
      this.valList[index] = v, this.addItemSize(index, size)), this.moveToTail(index);
    }
    if (0 === ttl || 0 !== this.ttl || this.ttls || this.initializeTTLTracking(), noUpdateTTL || this.setItemTTL(index, ttl, start), 
    this.disposeAfter) for (;this.disposed.length; ) this.disposeAfter(...this.disposed.shift());
    return this;
  }
  newIndex() {
    return 0 === this.size ? this.tail : this.size === this.max && 0 !== this.max ? this.evict(!1) : 0 !== this.free.length ? this.free.pop() : this.initialFill++;
  }
  pop() {
    if (this.size) {
      const val = this.valList[this.head];
      return this.evict(!0), val;
    }
  }
  evict(free) {
    const head = this.head, k = this.keyList[head], v = this.valList[head];
    return this.isBackgroundFetch(v) ? v.__abortController.abort() : (this.dispose(v, k, "evict"), 
    this.disposeAfter && this.disposed.push([ v, k, "evict" ])), this.removeItemSize(head), 
    free && (this.keyList[head] = null, this.valList[head] = null, this.free.push(head)), 
    this.head = this.next[head], this.keyMap.delete(k), this.size--, head;
  }
  has(k, {updateAgeOnHas = this.updateAgeOnHas} = {}) {
    const index = this.keyMap.get(k);
    return void 0 !== index && !this.isStale(index) && (updateAgeOnHas && this.updateItemAge(index), 
    !0);
  }
  peek(k, {allowStale = this.allowStale} = {}) {
    const index = this.keyMap.get(k);
    if (void 0 !== index && (allowStale || !this.isStale(index))) {
      const v = this.valList[index];
      return this.isBackgroundFetch(v) ? v.__staleWhileFetching : v;
    }
  }
  backgroundFetch(k, index, options, context) {
    const v = void 0 === index ? void 0 : this.valList[index];
    if (this.isBackgroundFetch(v)) return v;
    const ac = new AC, fetchOpts = {
      signal: ac.signal,
      options,
      context
    }, p = new Promise((res => res(this.fetchMethod(k, v, fetchOpts)))).then((v => (ac.signal.aborted || this.set(k, v, fetchOpts.options), 
    v)), (er => {
      if (this.valList[index] === p) {
        !options.noDeleteOnFetchRejection || void 0 === p.__staleWhileFetching ? this.delete(k) : this.valList[index] = p.__staleWhileFetching;
      }
      if (p.__returned === p) throw er;
    }));
    return p.__abortController = ac, p.__staleWhileFetching = v, p.__returned = null, 
    void 0 === index ? (this.set(k, p, fetchOpts.options), index = this.keyMap.get(k)) : this.valList[index] = p, 
    p;
  }
  isBackgroundFetch(p) {
    return p && "object" == typeof p && "function" == typeof p.then && Object.prototype.hasOwnProperty.call(p, "__staleWhileFetching") && Object.prototype.hasOwnProperty.call(p, "__returned") && (p.__returned === p || null === p.__returned);
  }
  async fetch(k, {allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, ttl = this.ttl, noDisposeOnSet = this.noDisposeOnSet, size = 0, sizeCalculation = this.sizeCalculation, noUpdateTTL = this.noUpdateTTL, noDeleteOnFetchRejection = this.noDeleteOnFetchRejection, fetchContext = this.fetchContext, forceRefresh = !1} = {}) {
    if (!this.fetchMethod) return this.get(k, {
      allowStale,
      updateAgeOnGet,
      noDeleteOnStaleGet
    });
    const options = {
      allowStale,
      updateAgeOnGet,
      noDeleteOnStaleGet,
      ttl,
      noDisposeOnSet,
      size,
      sizeCalculation,
      noUpdateTTL,
      noDeleteOnFetchRejection
    };
    let index = this.keyMap.get(k);
    if (void 0 === index) {
      const p = this.backgroundFetch(k, index, options, fetchContext);
      return p.__returned = p;
    }
    {
      const v = this.valList[index];
      if (this.isBackgroundFetch(v)) return allowStale && void 0 !== v.__staleWhileFetching ? v.__staleWhileFetching : v.__returned = v;
      if (!forceRefresh && !this.isStale(index)) return this.moveToTail(index), updateAgeOnGet && this.updateItemAge(index), 
      v;
      const p = this.backgroundFetch(k, index, options, fetchContext);
      return allowStale && void 0 !== p.__staleWhileFetching ? p.__staleWhileFetching : p.__returned = p;
    }
  }
  get(k, {allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet} = {}) {
    const index = this.keyMap.get(k);
    if (void 0 !== index) {
      const value = this.valList[index], fetching = this.isBackgroundFetch(value);
      if (this.isStale(index)) return fetching ? allowStale ? value.__staleWhileFetching : void 0 : (noDeleteOnStaleGet || this.delete(k), 
      allowStale ? value : void 0);
      if (fetching) return;
      return this.moveToTail(index), updateAgeOnGet && this.updateItemAge(index), value;
    }
  }
  connect(p, n) {
    this.prev[n] = p, this.next[p] = n;
  }
  moveToTail(index) {
    index !== this.tail && (index === this.head ? this.head = this.next[index] : this.connect(this.prev[index], this.next[index]), 
    this.connect(this.tail, index), this.tail = index);
  }
  get del() {
    return deprecatedMethod("del", "delete"), this.delete;
  }
  delete(k) {
    let deleted = !1;
    if (0 !== this.size) {
      const index = this.keyMap.get(k);
      if (void 0 !== index) if (deleted = !0, 1 === this.size) this.clear(); else {
        this.removeItemSize(index);
        const v = this.valList[index];
        this.isBackgroundFetch(v) ? v.__abortController.abort() : (this.dispose(v, k, "delete"), 
        this.disposeAfter && this.disposed.push([ v, k, "delete" ])), this.keyMap.delete(k), 
        this.keyList[index] = null, this.valList[index] = null, index === this.tail ? this.tail = this.prev[index] : index === this.head ? this.head = this.next[index] : (this.next[this.prev[index]] = this.next[index], 
        this.prev[this.next[index]] = this.prev[index]), this.size--, this.free.push(index);
      }
    }
    if (this.disposed) for (;this.disposed.length; ) this.disposeAfter(...this.disposed.shift());
    return deleted;
  }
  clear() {
    for (const index of this.rindexes({
      allowStale: !0
    })) {
      const v = this.valList[index];
      if (this.isBackgroundFetch(v)) v.__abortController.abort(); else {
        const k = this.keyList[index];
        this.dispose(v, k, "delete"), this.disposeAfter && this.disposed.push([ v, k, "delete" ]);
      }
    }
    if (this.keyMap.clear(), this.valList.fill(null), this.keyList.fill(null), this.ttls && (this.ttls.fill(0), 
    this.starts.fill(0)), this.sizes && this.sizes.fill(0), this.head = 0, this.tail = 0, 
    this.initialFill = 1, this.free.length = 0, this.calculatedSize = 0, this.size = 0, 
    this.disposed) for (;this.disposed.length; ) this.disposeAfter(...this.disposed.shift());
  }
  get reset() {
    return deprecatedMethod("reset", "clear"), this.clear;
  }
  get length() {
    return deprecatedProperty("length", "size"), this.size;
  }
  static get AbortController() {
    return AC;
  }
  static get AbortSignal() {
    return AS;
  }
}

module.exports = LRUCache;