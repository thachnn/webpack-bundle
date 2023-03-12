module.exports = Long;

var wasm = null;

try {
  wasm = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([ 0, 97, 115, 109, 1, 0, 0, 0, 1, 13, 2, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 1, 127, 3, 7, 6, 0, 1, 1, 1, 1, 1, 6, 6, 1, 127, 1, 65, 0, 11, 7, 50, 6, 3, 109, 117, 108, 0, 1, 5, 100, 105, 118, 95, 115, 0, 2, 5, 100, 105, 118, 95, 117, 0, 3, 5, 114, 101, 109, 95, 115, 0, 4, 5, 114, 101, 109, 95, 117, 0, 5, 8, 103, 101, 116, 95, 104, 105, 103, 104, 0, 0, 10, 191, 1, 6, 4, 0, 35, 0, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 126, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 127, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 128, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 129, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11, 36, 1, 1, 126, 32, 0, 173, 32, 1, 173, 66, 32, 134, 132, 32, 2, 173, 32, 3, 173, 66, 32, 134, 132, 130, 34, 4, 66, 32, 135, 167, 36, 0, 32, 4, 167, 11 ])), {}).exports;
} catch (e) {}

function Long(low, high, unsigned) {
  this.low = 0 | low, this.high = 0 | high, this.unsigned = !!unsigned;
}

function isLong(obj) {
  return !0 === (obj && obj.__isLong__);
}

Long.prototype.__isLong__, Object.defineProperty(Long.prototype, "__isLong__", {
  value: !0
}), Long.isLong = isLong;

var INT_CACHE = {}, UINT_CACHE = {};

function fromInt(value, unsigned) {
  var obj, cachedObj, cache;
  return unsigned ? (cache = 0 <= (value >>>= 0) && value < 256) && (cachedObj = UINT_CACHE[value]) ? cachedObj : (obj = fromBits(value, (0 | value) < 0 ? -1 : 0, !0), 
  cache && (UINT_CACHE[value] = obj), obj) : (cache = -128 <= (value |= 0) && value < 128) && (cachedObj = INT_CACHE[value]) ? cachedObj : (obj = fromBits(value, value < 0 ? -1 : 0, !1), 
  cache && (INT_CACHE[value] = obj), obj);
}

function fromNumber(value, unsigned) {
  if (isNaN(value)) return unsigned ? UZERO : ZERO;
  if (unsigned) {
    if (value < 0) return UZERO;
    if (value >= TWO_PWR_64_DBL) return MAX_UNSIGNED_VALUE;
  } else {
    if (value <= -TWO_PWR_63_DBL) return MIN_VALUE;
    if (value + 1 >= TWO_PWR_63_DBL) return MAX_VALUE;
  }
  return value < 0 ? fromNumber(-value, unsigned).neg() : fromBits(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0, unsigned);
}

function fromBits(lowBits, highBits, unsigned) {
  return new Long(lowBits, highBits, unsigned);
}

Long.fromInt = fromInt, Long.fromNumber = fromNumber, Long.fromBits = fromBits;

var pow_dbl = Math.pow;

function fromString(str, unsigned, radix) {
  if (0 === str.length) throw Error("empty string");
  if ("NaN" === str || "Infinity" === str || "+Infinity" === str || "-Infinity" === str) return ZERO;
  if ("number" == typeof unsigned ? (radix = unsigned, unsigned = !1) : unsigned = !!unsigned, 
  (radix = radix || 10) < 2 || 36 < radix) throw RangeError("radix");
  var p;
  if ((p = str.indexOf("-")) > 0) throw Error("interior hyphen");
  if (0 === p) return fromString(str.substring(1), unsigned, radix).neg();
  for (var radixToPower = fromNumber(pow_dbl(radix, 8)), result = ZERO, i = 0; i < str.length; i += 8) {
    var size = Math.min(8, str.length - i), value = parseInt(str.substring(i, i + size), radix);
    if (size < 8) {
      var power = fromNumber(pow_dbl(radix, size));
      result = result.mul(power).add(fromNumber(value));
    } else result = (result = result.mul(radixToPower)).add(fromNumber(value));
  }
  return result.unsigned = unsigned, result;
}

function fromValue(val, unsigned) {
  return "number" == typeof val ? fromNumber(val, unsigned) : "string" == typeof val ? fromString(val, unsigned) : fromBits(val.low, val.high, "boolean" == typeof unsigned ? unsigned : val.unsigned);
}

Long.fromString = fromString, Long.fromValue = fromValue;

var TWO_PWR_16_DBL = 65536, TWO_PWR_24_DBL = 1 << 24, TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL, TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL, TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2, TWO_PWR_24 = fromInt(TWO_PWR_24_DBL), ZERO = fromInt(0);

Long.ZERO = ZERO;

var UZERO = fromInt(0, !0);

Long.UZERO = UZERO;

var ONE = fromInt(1);

Long.ONE = ONE;

var UONE = fromInt(1, !0);

Long.UONE = UONE;

var NEG_ONE = fromInt(-1);

Long.NEG_ONE = NEG_ONE;

var MAX_VALUE = fromBits(-1, 2147483647, !1);

Long.MAX_VALUE = MAX_VALUE;

var MAX_UNSIGNED_VALUE = fromBits(-1, -1, !0);

Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;

var MIN_VALUE = fromBits(0, -2147483648, !1);

Long.MIN_VALUE = MIN_VALUE;

var LongPrototype = Long.prototype;

LongPrototype.toInt = function() {
  return this.unsigned ? this.low >>> 0 : this.low;
}, LongPrototype.toNumber = function() {
  return this.unsigned ? (this.high >>> 0) * TWO_PWR_32_DBL + (this.low >>> 0) : this.high * TWO_PWR_32_DBL + (this.low >>> 0);
}, LongPrototype.toString = function(radix) {
  if ((radix = radix || 10) < 2 || 36 < radix) throw RangeError("radix");
  if (this.isZero()) return "0";
  if (this.isNegative()) {
    if (this.eq(MIN_VALUE)) {
      var radixLong = fromNumber(radix), div = this.div(radixLong), rem1 = div.mul(radixLong).sub(this);
      return div.toString(radix) + rem1.toInt().toString(radix);
    }
    return "-" + this.neg().toString(radix);
  }
  for (var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned), rem = this, result = ""; ;) {
    var remDiv = rem.div(radixToPower), digits = (rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0).toString(radix);
    if ((rem = remDiv).isZero()) return digits + result;
    for (;digits.length < 6; ) digits = "0" + digits;
    result = "" + digits + result;
  }
}, LongPrototype.getHighBits = function() {
  return this.high;
}, LongPrototype.getHighBitsUnsigned = function() {
  return this.high >>> 0;
}, LongPrototype.getLowBits = function() {
  return this.low;
}, LongPrototype.getLowBitsUnsigned = function() {
  return this.low >>> 0;
}, LongPrototype.getNumBitsAbs = function() {
  if (this.isNegative()) return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
  for (var val = 0 != this.high ? this.high : this.low, bit = 31; bit > 0 && 0 == (val & 1 << bit); bit--) ;
  return 0 != this.high ? bit + 33 : bit + 1;
}, LongPrototype.isZero = function() {
  return 0 === this.high && 0 === this.low;
}, LongPrototype.eqz = LongPrototype.isZero, LongPrototype.isNegative = function() {
  return !this.unsigned && this.high < 0;
}, LongPrototype.isPositive = function() {
  return this.unsigned || this.high >= 0;
}, LongPrototype.isOdd = function() {
  return 1 == (1 & this.low);
}, LongPrototype.isEven = function() {
  return 0 == (1 & this.low);
}, LongPrototype.equals = function(other) {
  return isLong(other) || (other = fromValue(other)), (this.unsigned === other.unsigned || this.high >>> 31 != 1 || other.high >>> 31 != 1) && (this.high === other.high && this.low === other.low);
}, LongPrototype.eq = LongPrototype.equals, LongPrototype.notEquals = function(other) {
  return !this.eq(other);
}, LongPrototype.neq = LongPrototype.notEquals, LongPrototype.ne = LongPrototype.notEquals, 
LongPrototype.lessThan = function(other) {
  return this.comp(other) < 0;
}, LongPrototype.lt = LongPrototype.lessThan, LongPrototype.lessThanOrEqual = function(other) {
  return this.comp(other) <= 0;
}, LongPrototype.lte = LongPrototype.lessThanOrEqual, LongPrototype.le = LongPrototype.lessThanOrEqual, 
LongPrototype.greaterThan = function(other) {
  return this.comp(other) > 0;
}, LongPrototype.gt = LongPrototype.greaterThan, LongPrototype.greaterThanOrEqual = function(other) {
  return this.comp(other) >= 0;
}, LongPrototype.gte = LongPrototype.greaterThanOrEqual, LongPrototype.ge = LongPrototype.greaterThanOrEqual, 
LongPrototype.compare = function(other) {
  if (isLong(other) || (other = fromValue(other)), this.eq(other)) return 0;
  var thisNeg = this.isNegative(), otherNeg = other.isNegative();
  return thisNeg && !otherNeg ? -1 : !thisNeg && otherNeg ? 1 : this.unsigned ? other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(other).isNegative() ? -1 : 1;
}, LongPrototype.comp = LongPrototype.compare, LongPrototype.negate = function() {
  return !this.unsigned && this.eq(MIN_VALUE) ? MIN_VALUE : this.not().add(ONE);
}, LongPrototype.neg = LongPrototype.negate, LongPrototype.add = function(addend) {
  isLong(addend) || (addend = fromValue(addend));
  var a48 = this.high >>> 16, a32 = 65535 & this.high, a16 = this.low >>> 16, a00 = 65535 & this.low, b48 = addend.high >>> 16, b32 = 65535 & addend.high, b16 = addend.low >>> 16, c48 = 0, c32 = 0, c16 = 0, c00 = 0;
  return c16 += (c00 += a00 + (65535 & addend.low)) >>> 16, c32 += (c16 += a16 + b16) >>> 16, 
  c48 += (c32 += a32 + b32) >>> 16, c48 += a48 + b48, fromBits((c16 &= 65535) << 16 | (c00 &= 65535), (c48 &= 65535) << 16 | (c32 &= 65535), this.unsigned);
}, LongPrototype.subtract = function(subtrahend) {
  return isLong(subtrahend) || (subtrahend = fromValue(subtrahend)), this.add(subtrahend.neg());
}, LongPrototype.sub = LongPrototype.subtract, LongPrototype.multiply = function(multiplier) {
  if (this.isZero()) return ZERO;
  if (isLong(multiplier) || (multiplier = fromValue(multiplier)), wasm) return fromBits(wasm.mul(this.low, this.high, multiplier.low, multiplier.high), wasm.get_high(), this.unsigned);
  if (multiplier.isZero()) return ZERO;
  if (this.eq(MIN_VALUE)) return multiplier.isOdd() ? MIN_VALUE : ZERO;
  if (multiplier.eq(MIN_VALUE)) return this.isOdd() ? MIN_VALUE : ZERO;
  if (this.isNegative()) return multiplier.isNegative() ? this.neg().mul(multiplier.neg()) : this.neg().mul(multiplier).neg();
  if (multiplier.isNegative()) return this.mul(multiplier.neg()).neg();
  if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24)) return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);
  var a48 = this.high >>> 16, a32 = 65535 & this.high, a16 = this.low >>> 16, a00 = 65535 & this.low, b48 = multiplier.high >>> 16, b32 = 65535 & multiplier.high, b16 = multiplier.low >>> 16, b00 = 65535 & multiplier.low, c48 = 0, c32 = 0, c16 = 0, c00 = 0;
  return c16 += (c00 += a00 * b00) >>> 16, c32 += (c16 += a16 * b00) >>> 16, c16 &= 65535, 
  c32 += (c16 += a00 * b16) >>> 16, c48 += (c32 += a32 * b00) >>> 16, c32 &= 65535, 
  c48 += (c32 += a16 * b16) >>> 16, c32 &= 65535, c48 += (c32 += a00 * b32) >>> 16, 
  c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48, fromBits((c16 &= 65535) << 16 | (c00 &= 65535), (c48 &= 65535) << 16 | (c32 &= 65535), this.unsigned);
}, LongPrototype.mul = LongPrototype.multiply, LongPrototype.divide = function(divisor) {
  if (isLong(divisor) || (divisor = fromValue(divisor)), divisor.isZero()) throw Error("division by zero");
  var approx, rem, res;
  if (wasm) return this.unsigned || -2147483648 !== this.high || -1 !== divisor.low || -1 !== divisor.high ? fromBits((this.unsigned ? wasm.div_u : wasm.div_s)(this.low, this.high, divisor.low, divisor.high), wasm.get_high(), this.unsigned) : this;
  if (this.isZero()) return this.unsigned ? UZERO : ZERO;
  if (this.unsigned) {
    if (divisor.unsigned || (divisor = divisor.toUnsigned()), divisor.gt(this)) return UZERO;
    if (divisor.gt(this.shru(1))) return UONE;
    res = UZERO;
  } else {
    if (this.eq(MIN_VALUE)) return divisor.eq(ONE) || divisor.eq(NEG_ONE) ? MIN_VALUE : divisor.eq(MIN_VALUE) ? ONE : (approx = this.shr(1).div(divisor).shl(1)).eq(ZERO) ? divisor.isNegative() ? ONE : NEG_ONE : (rem = this.sub(divisor.mul(approx)), 
    res = approx.add(rem.div(divisor)));
    if (divisor.eq(MIN_VALUE)) return this.unsigned ? UZERO : ZERO;
    if (this.isNegative()) return divisor.isNegative() ? this.neg().div(divisor.neg()) : this.neg().div(divisor).neg();
    if (divisor.isNegative()) return this.div(divisor.neg()).neg();
    res = ZERO;
  }
  for (rem = this; rem.gte(divisor); ) {
    approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));
    for (var log2 = Math.ceil(Math.log(approx) / Math.LN2), delta = log2 <= 48 ? 1 : pow_dbl(2, log2 - 48), approxRes = fromNumber(approx), approxRem = approxRes.mul(divisor); approxRem.isNegative() || approxRem.gt(rem); ) approxRem = (approxRes = fromNumber(approx -= delta, this.unsigned)).mul(divisor);
    approxRes.isZero() && (approxRes = ONE), res = res.add(approxRes), rem = rem.sub(approxRem);
  }
  return res;
}, LongPrototype.div = LongPrototype.divide, LongPrototype.modulo = function(divisor) {
  return isLong(divisor) || (divisor = fromValue(divisor)), wasm ? fromBits((this.unsigned ? wasm.rem_u : wasm.rem_s)(this.low, this.high, divisor.low, divisor.high), wasm.get_high(), this.unsigned) : this.sub(this.div(divisor).mul(divisor));
}, LongPrototype.mod = LongPrototype.modulo, LongPrototype.rem = LongPrototype.modulo, 
LongPrototype.not = function() {
  return fromBits(~this.low, ~this.high, this.unsigned);
}, LongPrototype.and = function(other) {
  return isLong(other) || (other = fromValue(other)), fromBits(this.low & other.low, this.high & other.high, this.unsigned);
}, LongPrototype.or = function(other) {
  return isLong(other) || (other = fromValue(other)), fromBits(this.low | other.low, this.high | other.high, this.unsigned);
}, LongPrototype.xor = function(other) {
  return isLong(other) || (other = fromValue(other)), fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
}, LongPrototype.shiftLeft = function(numBits) {
  return isLong(numBits) && (numBits = numBits.toInt()), 0 == (numBits &= 63) ? this : numBits < 32 ? fromBits(this.low << numBits, this.high << numBits | this.low >>> 32 - numBits, this.unsigned) : fromBits(0, this.low << numBits - 32, this.unsigned);
}, LongPrototype.shl = LongPrototype.shiftLeft, LongPrototype.shiftRight = function(numBits) {
  return isLong(numBits) && (numBits = numBits.toInt()), 0 == (numBits &= 63) ? this : numBits < 32 ? fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >> numBits, this.unsigned) : fromBits(this.high >> numBits - 32, this.high >= 0 ? 0 : -1, this.unsigned);
}, LongPrototype.shr = LongPrototype.shiftRight, LongPrototype.shiftRightUnsigned = function(numBits) {
  return isLong(numBits) && (numBits = numBits.toInt()), 0 == (numBits &= 63) ? this : numBits < 32 ? fromBits(this.low >>> numBits | this.high << 32 - numBits, this.high >>> numBits, this.unsigned) : fromBits(32 === numBits ? this.high : this.high >>> numBits - 32, 0, this.unsigned);
}, LongPrototype.shru = LongPrototype.shiftRightUnsigned, LongPrototype.shr_u = LongPrototype.shiftRightUnsigned, 
LongPrototype.rotateLeft = function(numBits) {
  var b;
  return isLong(numBits) && (numBits = numBits.toInt()), 0 == (numBits &= 63) ? this : 32 === numBits ? fromBits(this.high, this.low, this.unsigned) : numBits < 32 ? (b = 32 - numBits, 
  fromBits(this.low << numBits | this.high >>> b, this.high << numBits | this.low >>> b, this.unsigned)) : (b = 32 - (numBits -= 32), 
  fromBits(this.high << numBits | this.low >>> b, this.low << numBits | this.high >>> b, this.unsigned));
}, LongPrototype.rotl = LongPrototype.rotateLeft, LongPrototype.rotateRight = function(numBits) {
  var b;
  return isLong(numBits) && (numBits = numBits.toInt()), 0 == (numBits &= 63) ? this : 32 === numBits ? fromBits(this.high, this.low, this.unsigned) : numBits < 32 ? (b = 32 - numBits, 
  fromBits(this.high << b | this.low >>> numBits, this.low << b | this.high >>> numBits, this.unsigned)) : (b = 32 - (numBits -= 32), 
  fromBits(this.low << b | this.high >>> numBits, this.high << b | this.low >>> numBits, this.unsigned));
}, LongPrototype.rotr = LongPrototype.rotateRight, LongPrototype.toSigned = function() {
  return this.unsigned ? fromBits(this.low, this.high, !1) : this;
}, LongPrototype.toUnsigned = function() {
  return this.unsigned ? this : fromBits(this.low, this.high, !0);
}, LongPrototype.toBytes = function(le) {
  return le ? this.toBytesLE() : this.toBytesBE();
}, LongPrototype.toBytesLE = function() {
  var hi = this.high, lo = this.low;
  return [ 255 & lo, lo >>> 8 & 255, lo >>> 16 & 255, lo >>> 24, 255 & hi, hi >>> 8 & 255, hi >>> 16 & 255, hi >>> 24 ];
}, LongPrototype.toBytesBE = function() {
  var hi = this.high, lo = this.low;
  return [ hi >>> 24, hi >>> 16 & 255, hi >>> 8 & 255, 255 & hi, lo >>> 24, lo >>> 16 & 255, lo >>> 8 & 255, 255 & lo ];
}, Long.fromBytes = function(bytes, unsigned, le) {
  return le ? Long.fromBytesLE(bytes, unsigned) : Long.fromBytesBE(bytes, unsigned);
}, Long.fromBytesLE = function(bytes, unsigned) {
  return new Long(bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24, bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24, unsigned);
}, Long.fromBytesBE = function(bytes, unsigned) {
  return new Long(bytes[4] << 24 | bytes[5] << 16 | bytes[6] << 8 | bytes[7], bytes[0] << 24 | bytes[1] << 16 | bytes[2] << 8 | bytes[3], unsigned);
};