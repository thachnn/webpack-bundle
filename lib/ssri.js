"use strict";

const crypto = require("crypto"), MiniPass = require("../vendor/minipass"), SPEC_ALGORITHMS = [ "sha256", "sha384", "sha512" ], BASE64_REGEX = /^[a-z0-9+/]+(?:=?=?)$/i, SRI_REGEX = /^([a-z0-9]+)-([^?]+)([?\S*]*)$/, STRICT_SRI_REGEX = /^([a-z0-9]+)-([A-Za-z0-9+/=]{44,88})(\?[\x21-\x7E]*)?$/, VCHAR_REGEX = /^[\x21-\x7E]+$/, defaultOpts = {
  algorithms: [ "sha512" ],
  error: !1,
  options: [],
  pickAlgorithm: getPrioritizedHash,
  sep: " ",
  single: !1,
  strict: !1
}, ssriOpts = (opts = {}) => ({
  ...defaultOpts,
  ...opts
}), getOptString = options => options && options.length ? `?${options.join("?")}` : "", _onEnd = Symbol("_onEnd"), _getOptions = Symbol("_getOptions"), _emittedSize = Symbol("_emittedSize"), _emittedIntegrity = Symbol("_emittedIntegrity"), _emittedVerified = Symbol("_emittedVerified");

class IntegrityStream extends MiniPass {
  constructor(opts) {
    super(), this.size = 0, this.opts = opts, this[_getOptions]();
    const {algorithms = defaultOpts.algorithms} = opts;
    this.algorithms = Array.from(new Set(algorithms.concat(this.algorithm ? [ this.algorithm ] : []))), 
    this.hashes = this.algorithms.map(crypto.createHash);
  }
  [_getOptions]() {
    const {integrity, size, options} = {
      ...defaultOpts,
      ...this.opts
    };
    this.sri = integrity ? parse(integrity, this.opts) : null, this.expectedSize = size, 
    this.goodSri = !!this.sri && !!Object.keys(this.sri).length, this.algorithm = this.goodSri ? this.sri.pickAlgorithm(this.opts) : null, 
    this.digests = this.goodSri ? this.sri[this.algorithm] : null, this.optString = getOptString(options);
  }
  on(ev, handler) {
    return "size" === ev && this[_emittedSize] ? handler(this[_emittedSize]) : "integrity" === ev && this[_emittedIntegrity] ? handler(this[_emittedIntegrity]) : "verified" === ev && this[_emittedVerified] ? handler(this[_emittedVerified]) : super.on(ev, handler);
  }
  emit(ev, data) {
    return "end" === ev && this[_onEnd](), super.emit(ev, data);
  }
  write(data) {
    return this.size += data.length, this.hashes.forEach((h => h.update(data))), super.write(data);
  }
  [_onEnd]() {
    this.goodSri || this[_getOptions]();
    const newSri = parse(this.hashes.map(((h, i) => `${this.algorithms[i]}-${h.digest("base64")}${this.optString}`)).join(" "), this.opts), match = this.goodSri && newSri.match(this.sri, this.opts);
    if ("number" == typeof this.expectedSize && this.size !== this.expectedSize) {
      const err = new Error(`stream size mismatch when checking ${this.sri}.\n  Wanted: ${this.expectedSize}\n  Found: ${this.size}`);
      err.code = "EBADSIZE", err.found = this.size, err.expected = this.expectedSize, 
      err.sri = this.sri, this.emit("error", err);
    } else if (this.sri && !match) {
      const err = new Error(`${this.sri} integrity checksum failed when using ${this.algorithm}: wanted ${this.digests} but got ${newSri}. (${this.size} bytes)`);
      err.code = "EINTEGRITY", err.found = newSri, err.expected = this.digests, err.algorithm = this.algorithm, 
      err.sri = this.sri, this.emit("error", err);
    } else this[_emittedSize] = this.size, this.emit("size", this.size), this[_emittedIntegrity] = newSri, 
    this.emit("integrity", newSri), match && (this[_emittedVerified] = match, this.emit("verified", match));
  }
}

class Hash {
  get isHash() {
    return !0;
  }
  constructor(hash, opts) {
    const strict = !!(opts = ssriOpts(opts)).strict;
    this.source = hash.trim(), this.digest = "", this.algorithm = "", this.options = [];
    const match = this.source.match(strict ? STRICT_SRI_REGEX : SRI_REGEX);
    if (!match) return;
    if (strict && !SPEC_ALGORITHMS.some((a => a === match[1]))) return;
    this.algorithm = match[1], this.digest = match[2];
    const rawOpts = match[3];
    rawOpts && (this.options = rawOpts.slice(1).split("?"));
  }
  hexDigest() {
    return this.digest && Buffer.from(this.digest, "base64").toString("hex");
  }
  toJSON() {
    return this.toString();
  }
  toString(opts) {
    if ((opts = ssriOpts(opts)).strict && !(SPEC_ALGORITHMS.some((x => x === this.algorithm)) && this.digest.match(BASE64_REGEX) && this.options.every((opt => opt.match(VCHAR_REGEX))))) return "";
    const options = this.options && this.options.length ? `?${this.options.join("?")}` : "";
    return `${this.algorithm}-${this.digest}${options}`;
  }
}

class Integrity {
  get isIntegrity() {
    return !0;
  }
  toJSON() {
    return this.toString();
  }
  isEmpty() {
    return 0 === Object.keys(this).length;
  }
  toString(opts) {
    let sep = (opts = ssriOpts(opts)).sep || " ";
    return opts.strict && (sep = sep.replace(/\S+/g, " ")), Object.keys(this).map((k => this[k].map((hash => Hash.prototype.toString.call(hash, opts))).filter((x => x.length)).join(sep))).filter((x => x.length)).join(sep);
  }
  concat(integrity, opts) {
    opts = ssriOpts(opts);
    const other = "string" == typeof integrity ? integrity : stringify(integrity, opts);
    return parse(`${this.toString(opts)} ${other}`, opts);
  }
  hexDigest() {
    return parse(this, {
      single: !0
    }).hexDigest();
  }
  merge(integrity, opts) {
    const other = parse(integrity, opts = ssriOpts(opts));
    for (const algo in other) if (this[algo]) {
      if (!this[algo].find((hash => other[algo].find((otherhash => hash.digest === otherhash.digest))))) throw new Error("hashes do not match, cannot update integrity");
    } else this[algo] = other[algo];
  }
  match(integrity, opts) {
    const other = parse(integrity, opts = ssriOpts(opts)), algo = other.pickAlgorithm(opts);
    return this[algo] && other[algo] && this[algo].find((hash => other[algo].find((otherhash => hash.digest === otherhash.digest)))) || !1;
  }
  pickAlgorithm(opts) {
    const pickAlgorithm = (opts = ssriOpts(opts)).pickAlgorithm;
    return Object.keys(this).reduce(((acc, algo) => pickAlgorithm(acc, algo) || acc));
  }
}

function parse(sri, opts) {
  if (!sri) return null;
  if (opts = ssriOpts(opts), "string" == typeof sri) return _parse(sri, opts);
  if (sri.algorithm && sri.digest) {
    const fullSri = new Integrity;
    return fullSri[sri.algorithm] = [ sri ], _parse(stringify(fullSri, opts), opts);
  }
  return _parse(stringify(sri, opts), opts);
}

function _parse(integrity, opts) {
  if (opts.single) return new Hash(integrity, opts);
  const hashes = integrity.trim().split(/\s+/).reduce(((acc, string) => {
    const hash = new Hash(string, opts);
    if (hash.algorithm && hash.digest) {
      const algo = hash.algorithm;
      acc[algo] || (acc[algo] = []), acc[algo].push(hash);
    }
    return acc;
  }), new Integrity);
  return hashes.isEmpty() ? null : hashes;
}

function stringify(obj, opts) {
  return opts = ssriOpts(opts), obj.algorithm && obj.digest ? Hash.prototype.toString.call(obj, opts) : "string" == typeof obj ? stringify(parse(obj, opts), opts) : Integrity.prototype.toString.call(obj, opts);
}

function fromHex(hexDigest, algorithm, opts) {
  opts = ssriOpts(opts);
  const optString = getOptString(opts.options);
  return parse(`${algorithm}-${Buffer.from(hexDigest, "hex").toString("base64")}${optString}`, opts);
}

function fromData(data, opts) {
  const algorithms = (opts = ssriOpts(opts)).algorithms, optString = getOptString(opts.options);
  return algorithms.reduce(((acc, algo) => {
    const digest = crypto.createHash(algo).update(data).digest("base64"), hash = new Hash(`${algo}-${digest}${optString}`, opts);
    if (hash.algorithm && hash.digest) {
      const hashAlgo = hash.algorithm;
      acc[hashAlgo] || (acc[hashAlgo] = []), acc[hashAlgo].push(hash);
    }
    return acc;
  }), new Integrity);
}

function fromStream(stream, opts) {
  const istream = integrityStream(opts = ssriOpts(opts));
  return new Promise(((resolve, reject) => {
    let sri;
    stream.pipe(istream), stream.on("error", reject), istream.on("error", reject), istream.on("integrity", (s => {
      sri = s;
    })), istream.on("end", (() => resolve(sri))), istream.on("data", (() => {}));
  }));
}

function checkData(data, sri, opts) {
  if (!(sri = parse(sri, opts = ssriOpts(opts))) || !Object.keys(sri).length) {
    if (opts.error) throw Object.assign(new Error("No valid integrity hashes to check against"), {
      code: "EINTEGRITY"
    });
    return !1;
  }
  const algorithm = sri.pickAlgorithm(opts), newSri = parse({
    algorithm,
    digest: crypto.createHash(algorithm).update(data).digest("base64")
  }), match = newSri.match(sri, opts);
  if (match || !opts.error) return match;
  if ("number" == typeof opts.size && data.length !== opts.size) {
    const err = new Error(`data size mismatch when checking ${sri}.\n  Wanted: ${opts.size}\n  Found: ${data.length}`);
    throw err.code = "EBADSIZE", err.found = data.length, err.expected = opts.size, 
    err.sri = sri, err;
  }
  {
    const err = new Error(`Integrity checksum failed when using ${algorithm}: Wanted ${sri}, but got ${newSri}. (${data.length} bytes)`);
    throw err.code = "EINTEGRITY", err.found = newSri, err.expected = sri, err.algorithm = algorithm, 
    err.sri = sri, err;
  }
}

function checkStream(stream, sri, opts) {
  if ((opts = ssriOpts(opts)).integrity = sri, !(sri = parse(sri, opts)) || !Object.keys(sri).length) return Promise.reject(Object.assign(new Error("No valid integrity hashes to check against"), {
    code: "EINTEGRITY"
  }));
  const checker = integrityStream(opts);
  return new Promise(((resolve, reject) => {
    let verified;
    stream.pipe(checker), stream.on("error", reject), checker.on("error", reject), checker.on("verified", (s => {
      verified = s;
    })), checker.on("end", (() => resolve(verified))), checker.on("data", (() => {}));
  }));
}

function integrityStream(opts = {}) {
  return new IntegrityStream(opts);
}

function createIntegrity(opts) {
  const algorithms = (opts = ssriOpts(opts)).algorithms, optString = getOptString(opts.options), hashes = algorithms.map(crypto.createHash);
  return {
    update: function(chunk, enc) {
      return hashes.forEach((h => h.update(chunk, enc))), this;
    },
    digest: function(enc) {
      return algorithms.reduce(((acc, algo) => {
        const digest = hashes.shift().digest("base64"), hash = new Hash(`${algo}-${digest}${optString}`, opts);
        if (hash.algorithm && hash.digest) {
          const hashAlgo = hash.algorithm;
          acc[hashAlgo] || (acc[hashAlgo] = []), acc[hashAlgo].push(hash);
        }
        return acc;
      }), new Integrity);
    }
  };
}

module.exports.parse = parse, module.exports.stringify = stringify, module.exports.fromHex = fromHex, 
module.exports.fromData = fromData, module.exports.fromStream = fromStream, module.exports.checkData = checkData, 
module.exports.checkStream = checkStream, module.exports.integrityStream = integrityStream, 
module.exports.create = createIntegrity;

const NODE_HASHES = new Set(crypto.getHashes()), DEFAULT_PRIORITY = [ "md5", "whirlpool", "sha1", "sha224", "sha256", "sha384", "sha512", "sha3", "sha3-256", "sha3-384", "sha3-512", "sha3_256", "sha3_384", "sha3_512" ].filter((algo => NODE_HASHES.has(algo)));

function getPrioritizedHash(algo1, algo2) {
  return DEFAULT_PRIORITY.indexOf(algo1.toLowerCase()) >= DEFAULT_PRIORITY.indexOf(algo2.toLowerCase()) ? algo1 : algo2;
}