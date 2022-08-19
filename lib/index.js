(() => {
  var __webpack_modules__ = {
    122: module => {
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
      var TWO_PWR_32_DBL = 4294967296, TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL, TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2, TWO_PWR_24 = fromInt(1 << 24), ZERO = fromInt(0);
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
  __webpack_require__.n = module => {
    var getter = module && module.__esModule ? () => module.default : () => module;
    return __webpack_require__.d(getter, {
      a: getter
    }), getter;
  }, __webpack_require__.d = (exports, definition) => {
    for (var key in definition) __webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key) && Object.defineProperty(exports, key, {
      enumerable: !0,
      get: definition[key]
    });
  }, __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop), 
  __webpack_require__.r = exports => {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(exports, "__esModule", {
      value: !0
    });
  };
  var __webpack_exports__ = {};
  (() => {
    "use strict";
    function _typeof(obj) {
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      }, _typeof(obj);
    }
    function isTypeOf(t) {
      return function(n) {
        return n.type === t;
      };
    }
    function assertTypeOf(t) {
      return function(n) {
        return function() {
          if (n.type !== t) throw new Error("n.type === t error: unknown");
        }();
      };
    }
    function nodes_module(id, fields, metadata) {
      if (null != id && "string" != typeof id) throw new Error('typeof id === "string" error: ' + ("Argument id must be of type string, given: " + _typeof(id) || 0));
      if ("object" !== _typeof(fields) || void 0 === fields.length) throw new Error('typeof fields === "object" && typeof fields.length !== "undefined" error: unknown');
      var node = {
        type: "Module",
        id,
        fields
      };
      return void 0 !== metadata && (node.metadata = metadata), node;
    }
    function moduleMetadata(sections, functionNames, localNames, producers) {
      if ("object" !== _typeof(sections) || void 0 === sections.length) throw new Error('typeof sections === "object" && typeof sections.length !== "undefined" error: unknown');
      if (null != functionNames && ("object" !== _typeof(functionNames) || void 0 === functionNames.length)) throw new Error('typeof functionNames === "object" && typeof functionNames.length !== "undefined" error: unknown');
      if (null != localNames && ("object" !== _typeof(localNames) || void 0 === localNames.length)) throw new Error('typeof localNames === "object" && typeof localNames.length !== "undefined" error: unknown');
      if (null != producers && ("object" !== _typeof(producers) || void 0 === producers.length)) throw new Error('typeof producers === "object" && typeof producers.length !== "undefined" error: unknown');
      var node = {
        type: "ModuleMetadata",
        sections
      };
      return void 0 !== functionNames && functionNames.length > 0 && (node.functionNames = functionNames), 
      void 0 !== localNames && localNames.length > 0 && (node.localNames = localNames), 
      void 0 !== producers && producers.length > 0 && (node.producers = producers), node;
    }
    function moduleNameMetadata(value) {
      if ("string" != typeof value) throw new Error('typeof value === "string" error: ' + ("Argument value must be of type string, given: " + _typeof(value) || 0));
      return {
        type: "ModuleNameMetadata",
        value
      };
    }
    function functionNameMetadata(value, index) {
      if ("string" != typeof value) throw new Error('typeof value === "string" error: ' + ("Argument value must be of type string, given: " + _typeof(value) || 0));
      if ("number" != typeof index) throw new Error('typeof index === "number" error: ' + ("Argument index must be of type number, given: " + _typeof(index) || 0));
      return {
        type: "FunctionNameMetadata",
        value,
        index
      };
    }
    function localNameMetadata(value, localIndex, functionIndex) {
      if ("string" != typeof value) throw new Error('typeof value === "string" error: ' + ("Argument value must be of type string, given: " + _typeof(value) || 0));
      if ("number" != typeof localIndex) throw new Error('typeof localIndex === "number" error: ' + ("Argument localIndex must be of type number, given: " + _typeof(localIndex) || 0));
      if ("number" != typeof functionIndex) throw new Error('typeof functionIndex === "number" error: ' + ("Argument functionIndex must be of type number, given: " + _typeof(functionIndex) || 0));
      return {
        type: "LocalNameMetadata",
        value,
        localIndex,
        functionIndex
      };
    }
    function binaryModule(id, blob) {
      if (null != id && "string" != typeof id) throw new Error('typeof id === "string" error: ' + ("Argument id must be of type string, given: " + _typeof(id) || 0));
      if ("object" !== _typeof(blob) || void 0 === blob.length) throw new Error('typeof blob === "object" && typeof blob.length !== "undefined" error: unknown');
      return {
        type: "BinaryModule",
        id,
        blob
      };
    }
    function quoteModule(id, string) {
      if (null != id && "string" != typeof id) throw new Error('typeof id === "string" error: ' + ("Argument id must be of type string, given: " + _typeof(id) || 0));
      if ("object" !== _typeof(string) || void 0 === string.length) throw new Error('typeof string === "object" && typeof string.length !== "undefined" error: unknown');
      return {
        type: "QuoteModule",
        id,
        string
      };
    }
    function sectionMetadata(section, startOffset, size, vectorOfSize) {
      if ("number" != typeof startOffset) throw new Error('typeof startOffset === "number" error: ' + ("Argument startOffset must be of type number, given: " + _typeof(startOffset) || 0));
      return {
        type: "SectionMetadata",
        section,
        startOffset,
        size,
        vectorOfSize
      };
    }
    function producersSectionMetadata(producers) {
      if ("object" !== _typeof(producers) || void 0 === producers.length) throw new Error('typeof producers === "object" && typeof producers.length !== "undefined" error: unknown');
      return {
        type: "ProducersSectionMetadata",
        producers
      };
    }
    function producerMetadata(language, processedBy, sdk) {
      if ("object" !== _typeof(language) || void 0 === language.length) throw new Error('typeof language === "object" && typeof language.length !== "undefined" error: unknown');
      if ("object" !== _typeof(processedBy) || void 0 === processedBy.length) throw new Error('typeof processedBy === "object" && typeof processedBy.length !== "undefined" error: unknown');
      if ("object" !== _typeof(sdk) || void 0 === sdk.length) throw new Error('typeof sdk === "object" && typeof sdk.length !== "undefined" error: unknown');
      return {
        type: "ProducerMetadata",
        language,
        processedBy,
        sdk
      };
    }
    function producerMetadataVersionedName(name, version) {
      if ("string" != typeof name) throw new Error('typeof name === "string" error: ' + ("Argument name must be of type string, given: " + _typeof(name) || 0));
      if ("string" != typeof version) throw new Error('typeof version === "string" error: ' + ("Argument version must be of type string, given: " + _typeof(version) || 0));
      return {
        type: "ProducerMetadataVersionedName",
        name,
        version
      };
    }
    function loopInstruction(label, resulttype, instr) {
      if ("object" !== _typeof(instr) || void 0 === instr.length) throw new Error('typeof instr === "object" && typeof instr.length !== "undefined" error: unknown');
      return {
        type: "LoopInstruction",
        id: "loop",
        label,
        resulttype,
        instr
      };
    }
    function instr(id, object, args, namedArgs) {
      if ("string" != typeof id) throw new Error('typeof id === "string" error: ' + ("Argument id must be of type string, given: " + _typeof(id) || 0));
      if ("object" !== _typeof(args) || void 0 === args.length) throw new Error('typeof args === "object" && typeof args.length !== "undefined" error: unknown');
      var node = {
        type: "Instr",
        id,
        args
      };
      return void 0 !== object && (node.object = object), void 0 !== namedArgs && 0 !== Object.keys(namedArgs).length && (node.namedArgs = namedArgs), 
      node;
    }
    function ifInstruction(testLabel, test, result, consequent, alternate) {
      if ("object" !== _typeof(test) || void 0 === test.length) throw new Error('typeof test === "object" && typeof test.length !== "undefined" error: unknown');
      if ("object" !== _typeof(consequent) || void 0 === consequent.length) throw new Error('typeof consequent === "object" && typeof consequent.length !== "undefined" error: unknown');
      if ("object" !== _typeof(alternate) || void 0 === alternate.length) throw new Error('typeof alternate === "object" && typeof alternate.length !== "undefined" error: unknown');
      return {
        type: "IfInstruction",
        id: "if",
        testLabel,
        test,
        result,
        consequent,
        alternate
      };
    }
    function stringLiteral(value) {
      if ("string" != typeof value) throw new Error('typeof value === "string" error: ' + ("Argument value must be of type string, given: " + _typeof(value) || 0));
      return {
        type: "StringLiteral",
        value
      };
    }
    function numberLiteral(value, raw) {
      if ("number" != typeof value) throw new Error('typeof value === "number" error: ' + ("Argument value must be of type number, given: " + _typeof(value) || 0));
      if ("string" != typeof raw) throw new Error('typeof raw === "string" error: ' + ("Argument raw must be of type string, given: " + _typeof(raw) || 0));
      return {
        type: "NumberLiteral",
        value,
        raw
      };
    }
    function longNumberLiteral(value, raw) {
      if ("string" != typeof raw) throw new Error('typeof raw === "string" error: ' + ("Argument raw must be of type string, given: " + _typeof(raw) || 0));
      return {
        type: "LongNumberLiteral",
        value,
        raw
      };
    }
    function floatLiteral(value, nan, inf, raw) {
      if ("number" != typeof value) throw new Error('typeof value === "number" error: ' + ("Argument value must be of type number, given: " + _typeof(value) || 0));
      if (null != nan && "boolean" != typeof nan) throw new Error('typeof nan === "boolean" error: ' + ("Argument nan must be of type boolean, given: " + _typeof(nan) || 0));
      if (null != inf && "boolean" != typeof inf) throw new Error('typeof inf === "boolean" error: ' + ("Argument inf must be of type boolean, given: " + _typeof(inf) || 0));
      if ("string" != typeof raw) throw new Error('typeof raw === "string" error: ' + ("Argument raw must be of type string, given: " + _typeof(raw) || 0));
      var node = {
        type: "FloatLiteral",
        value,
        raw
      };
      return !0 === nan && (node.nan = !0), !0 === inf && (node.inf = !0), node;
    }
    function elem(table, offset, funcs) {
      if ("object" !== _typeof(offset) || void 0 === offset.length) throw new Error('typeof offset === "object" && typeof offset.length !== "undefined" error: unknown');
      if ("object" !== _typeof(funcs) || void 0 === funcs.length) throw new Error('typeof funcs === "object" && typeof funcs.length !== "undefined" error: unknown');
      return {
        type: "Elem",
        table,
        offset,
        funcs
      };
    }
    function indexInFuncSection(index) {
      return {
        type: "IndexInFuncSection",
        index
      };
    }
    function valtypeLiteral(name) {
      return {
        type: "ValtypeLiteral",
        name
      };
    }
    function typeInstruction(id, functype) {
      return {
        type: "TypeInstruction",
        id,
        functype
      };
    }
    function start(index) {
      return {
        type: "Start",
        index
      };
    }
    function globalType(valtype, mutability) {
      return {
        type: "GlobalType",
        valtype,
        mutability
      };
    }
    function leadingComment(value) {
      if ("string" != typeof value) throw new Error('typeof value === "string" error: ' + ("Argument value must be of type string, given: " + _typeof(value) || 0));
      return {
        type: "LeadingComment",
        value
      };
    }
    function blockComment(value) {
      if ("string" != typeof value) throw new Error('typeof value === "string" error: ' + ("Argument value must be of type string, given: " + _typeof(value) || 0));
      return {
        type: "BlockComment",
        value
      };
    }
    function data(memoryIndex, offset, init) {
      return {
        type: "Data",
        memoryIndex,
        offset,
        init
      };
    }
    function global(globalType, init, name) {
      if ("object" !== _typeof(init) || void 0 === init.length) throw new Error('typeof init === "object" && typeof init.length !== "undefined" error: unknown');
      return {
        type: "Global",
        globalType,
        init,
        name
      };
    }
    function table(elementType, limits, name, elements) {
      if ("Limit" !== limits.type) throw new Error('limits.type === "Limit" error: ' + ("Argument limits must be of type Limit, given: " + limits.type || 0));
      if (null != elements && ("object" !== _typeof(elements) || void 0 === elements.length)) throw new Error('typeof elements === "object" && typeof elements.length !== "undefined" error: unknown');
      var node = {
        type: "Table",
        elementType,
        limits,
        name
      };
      return void 0 !== elements && elements.length > 0 && (node.elements = elements), 
      node;
    }
    function memory(limits, id) {
      return {
        type: "Memory",
        limits,
        id
      };
    }
    function funcImportDescr(id, signature) {
      return {
        type: "FuncImportDescr",
        id,
        signature
      };
    }
    function moduleImport(module, name, descr) {
      if ("string" != typeof module) throw new Error('typeof module === "string" error: ' + ("Argument module must be of type string, given: " + _typeof(module) || 0));
      if ("string" != typeof name) throw new Error('typeof name === "string" error: ' + ("Argument name must be of type string, given: " + _typeof(name) || 0));
      return {
        type: "ModuleImport",
        module,
        name,
        descr
      };
    }
    function moduleExportDescr(exportType, id) {
      return {
        type: "ModuleExportDescr",
        exportType,
        id
      };
    }
    function moduleExport(name, descr) {
      if ("string" != typeof name) throw new Error('typeof name === "string" error: ' + ("Argument name must be of type string, given: " + _typeof(name) || 0));
      return {
        type: "ModuleExport",
        name,
        descr
      };
    }
    function limit(min, max, shared) {
      if ("number" != typeof min) throw new Error('typeof min === "number" error: ' + ("Argument min must be of type number, given: " + _typeof(min) || 0));
      if (null != max && "number" != typeof max) throw new Error('typeof max === "number" error: ' + ("Argument max must be of type number, given: " + _typeof(max) || 0));
      if (null != shared && "boolean" != typeof shared) throw new Error('typeof shared === "boolean" error: ' + ("Argument shared must be of type boolean, given: " + _typeof(shared) || 0));
      var node = {
        type: "Limit",
        min
      };
      return void 0 !== max && (node.max = max), !0 === shared && (node.shared = !0), 
      node;
    }
    function signature(params, results) {
      if ("object" !== _typeof(params) || void 0 === params.length) throw new Error('typeof params === "object" && typeof params.length !== "undefined" error: unknown');
      if ("object" !== _typeof(results) || void 0 === results.length) throw new Error('typeof results === "object" && typeof results.length !== "undefined" error: unknown');
      return {
        type: "Signature",
        params,
        results
      };
    }
    function program(body) {
      if ("object" !== _typeof(body) || void 0 === body.length) throw new Error('typeof body === "object" && typeof body.length !== "undefined" error: unknown');
      return {
        type: "Program",
        body
      };
    }
    function identifier(value, raw) {
      if ("string" != typeof value) throw new Error('typeof value === "string" error: ' + ("Argument value must be of type string, given: " + _typeof(value) || 0));
      if (null != raw && "string" != typeof raw) throw new Error('typeof raw === "string" error: ' + ("Argument raw must be of type string, given: " + _typeof(raw) || 0));
      var node = {
        type: "Identifier",
        value
      };
      return void 0 !== raw && (node.raw = raw), node;
    }
    function blockInstruction(label, instr, result) {
      if ("object" !== _typeof(instr) || void 0 === instr.length) throw new Error('typeof instr === "object" && typeof instr.length !== "undefined" error: unknown');
      return {
        type: "BlockInstruction",
        id: "block",
        label,
        instr,
        result
      };
    }
    function callInstruction(index, instrArgs, numeric) {
      if (null != instrArgs && ("object" !== _typeof(instrArgs) || void 0 === instrArgs.length)) throw new Error('typeof instrArgs === "object" && typeof instrArgs.length !== "undefined" error: unknown');
      var node = {
        type: "CallInstruction",
        id: "call",
        index
      };
      return void 0 !== instrArgs && instrArgs.length > 0 && (node.instrArgs = instrArgs), 
      void 0 !== numeric && (node.numeric = numeric), node;
    }
    function callIndirectInstruction(signature, intrs) {
      if (null != intrs && ("object" !== _typeof(intrs) || void 0 === intrs.length)) throw new Error('typeof intrs === "object" && typeof intrs.length !== "undefined" error: unknown');
      var node = {
        type: "CallIndirectInstruction",
        id: "call_indirect",
        signature
      };
      return void 0 !== intrs && intrs.length > 0 && (node.intrs = intrs), node;
    }
    function byteArray(values) {
      if ("object" !== _typeof(values) || void 0 === values.length) throw new Error('typeof values === "object" && typeof values.length !== "undefined" error: unknown');
      return {
        type: "ByteArray",
        values
      };
    }
    function func(name, signature, body, isExternal, metadata) {
      if ("object" !== _typeof(body) || void 0 === body.length) throw new Error('typeof body === "object" && typeof body.length !== "undefined" error: unknown');
      if (null != isExternal && "boolean" != typeof isExternal) throw new Error('typeof isExternal === "boolean" error: ' + ("Argument isExternal must be of type boolean, given: " + _typeof(isExternal) || 0));
      var node = {
        type: "Func",
        name,
        signature,
        body
      };
      return !0 === isExternal && (node.isExternal = !0), void 0 !== metadata && (node.metadata = metadata), 
      node;
    }
    function internalBrUnless(target) {
      if ("number" != typeof target) throw new Error('typeof target === "number" error: ' + ("Argument target must be of type number, given: " + _typeof(target) || 0));
      return {
        type: "InternalBrUnless",
        target
      };
    }
    function internalGoto(target) {
      if ("number" != typeof target) throw new Error('typeof target === "number" error: ' + ("Argument target must be of type number, given: " + _typeof(target) || 0));
      return {
        type: "InternalGoto",
        target
      };
    }
    function internalCallExtern(target) {
      if ("number" != typeof target) throw new Error('typeof target === "number" error: ' + ("Argument target must be of type number, given: " + _typeof(target) || 0));
      return {
        type: "InternalCallExtern",
        target
      };
    }
    function internalEndAndReturn() {
      return {
        type: "InternalEndAndReturn"
      };
    }
    __webpack_require__.r(__webpack_exports__), __webpack_require__.d(__webpack_exports__, {
      assertBinaryModule: () => assertBinaryModule,
      assertBlockComment: () => assertBlockComment,
      assertBlockInstruction: () => assertBlockInstruction,
      assertByteArray: () => assertByteArray,
      assertCallIndirectInstruction: () => assertCallIndirectInstruction,
      assertCallInstruction: () => assertCallInstruction,
      assertData: () => assertData,
      assertElem: () => assertElem,
      assertFloatLiteral: () => assertFloatLiteral,
      assertFunc: () => assertFunc,
      assertFuncImportDescr: () => assertFuncImportDescr,
      assertFunctionNameMetadata: () => assertFunctionNameMetadata,
      assertGlobal: () => assertGlobal,
      assertGlobalType: () => assertGlobalType,
      assertHasLoc: () => assertHasLoc,
      assertIdentifier: () => assertIdentifier,
      assertIfInstruction: () => assertIfInstruction,
      assertIndexInFuncSection: () => assertIndexInFuncSection,
      assertInstr: () => assertInstr,
      assertInternalBrUnless: () => assertInternalBrUnless,
      assertInternalCallExtern: () => assertInternalCallExtern,
      assertInternalEndAndReturn: () => assertInternalEndAndReturn,
      assertInternalGoto: () => assertInternalGoto,
      assertLeadingComment: () => assertLeadingComment,
      assertLimit: () => assertLimit,
      assertLocalNameMetadata: () => assertLocalNameMetadata,
      assertLongNumberLiteral: () => assertLongNumberLiteral,
      assertLoopInstruction: () => assertLoopInstruction,
      assertMemory: () => assertMemory,
      assertModule: () => assertModule,
      assertModuleExport: () => assertModuleExport,
      assertModuleExportDescr: () => assertModuleExportDescr,
      assertModuleImport: () => assertModuleImport,
      assertModuleMetadata: () => assertModuleMetadata,
      assertModuleNameMetadata: () => assertModuleNameMetadata,
      assertNumberLiteral: () => assertNumberLiteral,
      assertProducerMetadata: () => assertProducerMetadata,
      assertProducerMetadataVersionedName: () => assertProducerMetadataVersionedName,
      assertProducersSectionMetadata: () => assertProducersSectionMetadata,
      assertProgram: () => assertProgram,
      assertQuoteModule: () => assertQuoteModule,
      assertSectionMetadata: () => assertSectionMetadata,
      assertSignature: () => assertSignature,
      assertStart: () => assertStart,
      assertStringLiteral: () => assertStringLiteral,
      assertTable: () => assertTable,
      assertTypeInstruction: () => assertTypeInstruction,
      assertValtypeLiteral: () => assertValtypeLiteral,
      binaryModule: () => binaryModule,
      blockComment: () => blockComment,
      blockInstruction: () => blockInstruction,
      byteArray: () => byteArray,
      callIndirectInstruction: () => callIndirectInstruction,
      callInstruction: () => callInstruction,
      cloneNode: () => cloneNode,
      data: () => data,
      elem: () => elem,
      floatLiteral: () => floatLiteral,
      func: () => func,
      funcImportDescr: () => funcImportDescr,
      funcParam: () => funcParam,
      functionNameMetadata: () => functionNameMetadata,
      getEndBlockByteOffset: () => getEndBlockByteOffset,
      getEndByteOffset: () => getEndByteOffset,
      getEndOfSection: () => getEndOfSection,
      getFunctionBeginingByteOffset: () => getFunctionBeginingByteOffset,
      getSectionMetadata: () => getSectionMetadata,
      getSectionMetadatas: () => getSectionMetadatas,
      getStartBlockByteOffset: () => getStartBlockByteOffset,
      getStartByteOffset: () => getStartByteOffset,
      getUniqueNameGenerator: () => getUniqueNameGenerator,
      global: () => global,
      globalType: () => globalType,
      identifier: () => identifier,
      ifInstruction: () => ifInstruction,
      indexInFuncSection: () => indexInFuncSection,
      indexLiteral: () => indexLiteral,
      instr: () => instr,
      instruction: () => instruction,
      internalBrUnless: () => internalBrUnless,
      internalCallExtern: () => internalCallExtern,
      internalEndAndReturn: () => internalEndAndReturn,
      internalGoto: () => internalGoto,
      isAnonymous: () => isAnonymous,
      isBinaryModule: () => isBinaryModule,
      isBlock: () => isBlock,
      isBlockComment: () => isBlockComment,
      isBlockInstruction: () => isBlockInstruction,
      isByteArray: () => isByteArray,
      isCallIndirectInstruction: () => isCallIndirectInstruction,
      isCallInstruction: () => isCallInstruction,
      isData: () => isData,
      isElem: () => isElem,
      isExpression: () => isExpression,
      isFloatLiteral: () => isFloatLiteral,
      isFunc: () => isFunc,
      isFuncImportDescr: () => isFuncImportDescr,
      isFunctionNameMetadata: () => isFunctionNameMetadata,
      isGlobal: () => isGlobal,
      isGlobalType: () => isGlobalType,
      isIdentifier: () => isIdentifier,
      isIfInstruction: () => isIfInstruction,
      isImportDescr: () => isImportDescr,
      isIndexInFuncSection: () => isIndexInFuncSection,
      isInstr: () => isInstr,
      isInstruction: () => isInstruction,
      isInternalBrUnless: () => isInternalBrUnless,
      isInternalCallExtern: () => isInternalCallExtern,
      isInternalEndAndReturn: () => isInternalEndAndReturn,
      isInternalGoto: () => isInternalGoto,
      isIntrinsic: () => isIntrinsic,
      isLeadingComment: () => isLeadingComment,
      isLimit: () => isLimit,
      isLocalNameMetadata: () => isLocalNameMetadata,
      isLongNumberLiteral: () => isLongNumberLiteral,
      isLoopInstruction: () => isLoopInstruction,
      isMemory: () => isMemory,
      isModule: () => isModule,
      isModuleExport: () => isModuleExport,
      isModuleExportDescr: () => isModuleExportDescr,
      isModuleImport: () => isModuleImport,
      isModuleMetadata: () => isModuleMetadata,
      isModuleNameMetadata: () => isModuleNameMetadata,
      isNode: () => isNode,
      isNumberLiteral: () => isNumberLiteral,
      isNumericLiteral: () => isNumericLiteral,
      isProducerMetadata: () => isProducerMetadata,
      isProducerMetadataVersionedName: () => isProducerMetadataVersionedName,
      isProducersSectionMetadata: () => isProducersSectionMetadata,
      isProgram: () => isProgram,
      isQuoteModule: () => isQuoteModule,
      isSectionMetadata: () => isSectionMetadata,
      isSignature: () => isSignature,
      isStart: () => isStart,
      isStringLiteral: () => isStringLiteral,
      isTable: () => isTable,
      isTypeInstruction: () => isTypeInstruction,
      isValtypeLiteral: () => isValtypeLiteral,
      leadingComment: () => leadingComment,
      limit: () => limit,
      localNameMetadata: () => localNameMetadata,
      longNumberLiteral: () => longNumberLiteral,
      loopInstruction: () => loopInstruction,
      memIndexLiteral: () => memIndexLiteral,
      memory: () => memory,
      module: () => nodes_module,
      moduleContextFromModuleAST: () => moduleContextFromModuleAST,
      moduleExport: () => moduleExport,
      moduleExportDescr: () => moduleExportDescr,
      moduleImport: () => moduleImport,
      moduleMetadata: () => moduleMetadata,
      moduleNameMetadata: () => moduleNameMetadata,
      nodeAndUnionTypes: () => nodeAndUnionTypes,
      numberLiteral: () => numberLiteral,
      numberLiteralFromRaw: () => numberLiteralFromRaw,
      objectInstruction: () => objectInstruction,
      orderedInsertNode: () => orderedInsertNode,
      producerMetadata: () => producerMetadata,
      producerMetadataVersionedName: () => producerMetadataVersionedName,
      producersSectionMetadata: () => producersSectionMetadata,
      program: () => program,
      quoteModule: () => quoteModule,
      sectionMetadata: () => sectionMetadata,
      shiftLoc: () => shiftLoc,
      shiftSection: () => shiftSection,
      signature: () => signature,
      signatureForOpcode: () => signatureForOpcode,
      signatures: () => signatures,
      sortSectionMetadata: () => sortSectionMetadata,
      start: () => start,
      stringLiteral: () => stringLiteral,
      table: () => table,
      traverse: () => traverse,
      typeInstruction: () => typeInstruction,
      unionTypesMap: () => unionTypesMap,
      valtypeLiteral: () => valtypeLiteral,
      withLoc: () => withLoc,
      withRaw: () => withRaw
    });
    var isModule = isTypeOf("Module"), isModuleMetadata = isTypeOf("ModuleMetadata"), isModuleNameMetadata = isTypeOf("ModuleNameMetadata"), isFunctionNameMetadata = isTypeOf("FunctionNameMetadata"), isLocalNameMetadata = isTypeOf("LocalNameMetadata"), isBinaryModule = isTypeOf("BinaryModule"), isQuoteModule = isTypeOf("QuoteModule"), isSectionMetadata = isTypeOf("SectionMetadata"), isProducersSectionMetadata = isTypeOf("ProducersSectionMetadata"), isProducerMetadata = isTypeOf("ProducerMetadata"), isProducerMetadataVersionedName = isTypeOf("ProducerMetadataVersionedName"), isLoopInstruction = isTypeOf("LoopInstruction"), isInstr = isTypeOf("Instr"), isIfInstruction = isTypeOf("IfInstruction"), isStringLiteral = isTypeOf("StringLiteral"), isNumberLiteral = isTypeOf("NumberLiteral"), isLongNumberLiteral = isTypeOf("LongNumberLiteral"), isFloatLiteral = isTypeOf("FloatLiteral"), isElem = isTypeOf("Elem"), isIndexInFuncSection = isTypeOf("IndexInFuncSection"), isValtypeLiteral = isTypeOf("ValtypeLiteral"), isTypeInstruction = isTypeOf("TypeInstruction"), isStart = isTypeOf("Start"), isGlobalType = isTypeOf("GlobalType"), isLeadingComment = isTypeOf("LeadingComment"), isBlockComment = isTypeOf("BlockComment"), isData = isTypeOf("Data"), isGlobal = isTypeOf("Global"), isTable = isTypeOf("Table"), isMemory = isTypeOf("Memory"), isFuncImportDescr = isTypeOf("FuncImportDescr"), isModuleImport = isTypeOf("ModuleImport"), isModuleExportDescr = isTypeOf("ModuleExportDescr"), isModuleExport = isTypeOf("ModuleExport"), isLimit = isTypeOf("Limit"), isSignature = isTypeOf("Signature"), isProgram = isTypeOf("Program"), isIdentifier = isTypeOf("Identifier"), isBlockInstruction = isTypeOf("BlockInstruction"), isCallInstruction = isTypeOf("CallInstruction"), isCallIndirectInstruction = isTypeOf("CallIndirectInstruction"), isByteArray = isTypeOf("ByteArray"), isFunc = isTypeOf("Func"), isInternalBrUnless = isTypeOf("InternalBrUnless"), isInternalGoto = isTypeOf("InternalGoto"), isInternalCallExtern = isTypeOf("InternalCallExtern"), isInternalEndAndReturn = isTypeOf("InternalEndAndReturn"), isNode = function(node) {
      return isModule(node) || isModuleMetadata(node) || isModuleNameMetadata(node) || isFunctionNameMetadata(node) || isLocalNameMetadata(node) || isBinaryModule(node) || isQuoteModule(node) || isSectionMetadata(node) || isProducersSectionMetadata(node) || isProducerMetadata(node) || isProducerMetadataVersionedName(node) || isLoopInstruction(node) || isInstr(node) || isIfInstruction(node) || isStringLiteral(node) || isNumberLiteral(node) || isLongNumberLiteral(node) || isFloatLiteral(node) || isElem(node) || isIndexInFuncSection(node) || isValtypeLiteral(node) || isTypeInstruction(node) || isStart(node) || isGlobalType(node) || isLeadingComment(node) || isBlockComment(node) || isData(node) || isGlobal(node) || isTable(node) || isMemory(node) || isFuncImportDescr(node) || isModuleImport(node) || isModuleExportDescr(node) || isModuleExport(node) || isLimit(node) || isSignature(node) || isProgram(node) || isIdentifier(node) || isBlockInstruction(node) || isCallInstruction(node) || isCallIndirectInstruction(node) || isByteArray(node) || isFunc(node) || isInternalBrUnless(node) || isInternalGoto(node) || isInternalCallExtern(node) || isInternalEndAndReturn(node);
    }, isBlock = function(node) {
      return isLoopInstruction(node) || isBlockInstruction(node) || isFunc(node);
    }, isInstruction = function(node) {
      return isLoopInstruction(node) || isInstr(node) || isIfInstruction(node) || isTypeInstruction(node) || isBlockInstruction(node) || isCallInstruction(node) || isCallIndirectInstruction(node);
    }, isExpression = function(node) {
      return isInstr(node) || isStringLiteral(node) || isNumberLiteral(node) || isLongNumberLiteral(node) || isFloatLiteral(node) || isValtypeLiteral(node) || isIdentifier(node);
    }, isNumericLiteral = function(node) {
      return isNumberLiteral(node) || isLongNumberLiteral(node) || isFloatLiteral(node);
    }, isImportDescr = function(node) {
      return isGlobalType(node) || isTable(node) || isMemory(node) || isFuncImportDescr(node);
    }, isIntrinsic = function(node) {
      return isInternalBrUnless(node) || isInternalGoto(node) || isInternalCallExtern(node) || isInternalEndAndReturn(node);
    }, assertModule = assertTypeOf("Module"), assertModuleMetadata = assertTypeOf("ModuleMetadata"), assertModuleNameMetadata = assertTypeOf("ModuleNameMetadata"), assertFunctionNameMetadata = assertTypeOf("FunctionNameMetadata"), assertLocalNameMetadata = assertTypeOf("LocalNameMetadata"), assertBinaryModule = assertTypeOf("BinaryModule"), assertQuoteModule = assertTypeOf("QuoteModule"), assertSectionMetadata = assertTypeOf("SectionMetadata"), assertProducersSectionMetadata = assertTypeOf("ProducersSectionMetadata"), assertProducerMetadata = assertTypeOf("ProducerMetadata"), assertProducerMetadataVersionedName = assertTypeOf("ProducerMetadataVersionedName"), assertLoopInstruction = assertTypeOf("LoopInstruction"), assertInstr = assertTypeOf("Instr"), assertIfInstruction = assertTypeOf("IfInstruction"), assertStringLiteral = assertTypeOf("StringLiteral"), assertNumberLiteral = assertTypeOf("NumberLiteral"), assertLongNumberLiteral = assertTypeOf("LongNumberLiteral"), assertFloatLiteral = assertTypeOf("FloatLiteral"), assertElem = assertTypeOf("Elem"), assertIndexInFuncSection = assertTypeOf("IndexInFuncSection"), assertValtypeLiteral = assertTypeOf("ValtypeLiteral"), assertTypeInstruction = assertTypeOf("TypeInstruction"), assertStart = assertTypeOf("Start"), assertGlobalType = assertTypeOf("GlobalType"), assertLeadingComment = assertTypeOf("LeadingComment"), assertBlockComment = assertTypeOf("BlockComment"), assertData = assertTypeOf("Data"), assertGlobal = assertTypeOf("Global"), assertTable = assertTypeOf("Table"), assertMemory = assertTypeOf("Memory"), assertFuncImportDescr = assertTypeOf("FuncImportDescr"), assertModuleImport = assertTypeOf("ModuleImport"), assertModuleExportDescr = assertTypeOf("ModuleExportDescr"), assertModuleExport = assertTypeOf("ModuleExport"), assertLimit = assertTypeOf("Limit"), assertSignature = assertTypeOf("Signature"), assertProgram = assertTypeOf("Program"), assertIdentifier = assertTypeOf("Identifier"), assertBlockInstruction = assertTypeOf("BlockInstruction"), assertCallInstruction = assertTypeOf("CallInstruction"), assertCallIndirectInstruction = assertTypeOf("CallIndirectInstruction"), assertByteArray = assertTypeOf("ByteArray"), assertFunc = assertTypeOf("Func"), assertInternalBrUnless = assertTypeOf("InternalBrUnless"), assertInternalGoto = assertTypeOf("InternalGoto"), assertInternalCallExtern = assertTypeOf("InternalCallExtern"), assertInternalEndAndReturn = assertTypeOf("InternalEndAndReturn"), unionTypesMap = {
      Module: [ "Node" ],
      ModuleMetadata: [ "Node" ],
      ModuleNameMetadata: [ "Node" ],
      FunctionNameMetadata: [ "Node" ],
      LocalNameMetadata: [ "Node" ],
      BinaryModule: [ "Node" ],
      QuoteModule: [ "Node" ],
      SectionMetadata: [ "Node" ],
      ProducersSectionMetadata: [ "Node" ],
      ProducerMetadata: [ "Node" ],
      ProducerMetadataVersionedName: [ "Node" ],
      LoopInstruction: [ "Node", "Block", "Instruction" ],
      Instr: [ "Node", "Expression", "Instruction" ],
      IfInstruction: [ "Node", "Instruction" ],
      StringLiteral: [ "Node", "Expression" ],
      NumberLiteral: [ "Node", "NumericLiteral", "Expression" ],
      LongNumberLiteral: [ "Node", "NumericLiteral", "Expression" ],
      FloatLiteral: [ "Node", "NumericLiteral", "Expression" ],
      Elem: [ "Node" ],
      IndexInFuncSection: [ "Node" ],
      ValtypeLiteral: [ "Node", "Expression" ],
      TypeInstruction: [ "Node", "Instruction" ],
      Start: [ "Node" ],
      GlobalType: [ "Node", "ImportDescr" ],
      LeadingComment: [ "Node" ],
      BlockComment: [ "Node" ],
      Data: [ "Node" ],
      Global: [ "Node" ],
      Table: [ "Node", "ImportDescr" ],
      Memory: [ "Node", "ImportDescr" ],
      FuncImportDescr: [ "Node", "ImportDescr" ],
      ModuleImport: [ "Node" ],
      ModuleExportDescr: [ "Node" ],
      ModuleExport: [ "Node" ],
      Limit: [ "Node" ],
      Signature: [ "Node" ],
      Program: [ "Node" ],
      Identifier: [ "Node", "Expression" ],
      BlockInstruction: [ "Node", "Block", "Instruction" ],
      CallInstruction: [ "Node", "Instruction" ],
      CallIndirectInstruction: [ "Node", "Instruction" ],
      ByteArray: [ "Node" ],
      Func: [ "Node", "Block" ],
      InternalBrUnless: [ "Node", "Intrinsic" ],
      InternalGoto: [ "Node", "Intrinsic" ],
      InternalCallExtern: [ "Node", "Intrinsic" ],
      InternalEndAndReturn: [ "Node", "Intrinsic" ]
    }, nodeAndUnionTypes = [ "Module", "ModuleMetadata", "ModuleNameMetadata", "FunctionNameMetadata", "LocalNameMetadata", "BinaryModule", "QuoteModule", "SectionMetadata", "ProducersSectionMetadata", "ProducerMetadata", "ProducerMetadataVersionedName", "LoopInstruction", "Instr", "IfInstruction", "StringLiteral", "NumberLiteral", "LongNumberLiteral", "FloatLiteral", "Elem", "IndexInFuncSection", "ValtypeLiteral", "TypeInstruction", "Start", "GlobalType", "LeadingComment", "BlockComment", "Data", "Global", "Table", "Memory", "FuncImportDescr", "ModuleImport", "ModuleExportDescr", "ModuleExport", "Limit", "Signature", "Program", "Identifier", "BlockInstruction", "CallInstruction", "CallIndirectInstruction", "ByteArray", "Func", "InternalBrUnless", "InternalGoto", "InternalCallExtern", "InternalEndAndReturn", "Node", "Block", "Instruction", "Expression", "NumericLiteral", "ImportDescr", "Intrinsic" ], src_long = __webpack_require__(122), long_default = __webpack_require__.n(src_long);
    function parse(input) {
      var mantissa, exponent, splitIndex = (input = input.toUpperCase()).indexOf("P");
      -1 !== splitIndex ? (mantissa = input.substring(0, splitIndex), exponent = parseInt(input.substring(splitIndex + 1))) : (mantissa = input, 
      exponent = 0);
      var dotIndex = mantissa.indexOf(".");
      if (-1 !== dotIndex) {
        var integerPart = parseInt(mantissa.substring(0, dotIndex), 16), sign = Math.sign(integerPart);
        integerPart *= sign;
        var fractionLength = mantissa.length - dotIndex - 1, fractionalPart = parseInt(mantissa.substring(dotIndex + 1), 16), fraction = fractionLength > 0 ? fractionalPart / Math.pow(16, fractionLength) : 0;
        mantissa = 0 === sign ? 0 === fraction ? sign : Object.is(sign, -0) ? -fraction : fraction : sign * (integerPart + fraction);
      } else mantissa = parseInt(mantissa, 16);
      return mantissa * (-1 !== splitIndex ? Math.pow(2, exponent) : 1);
    }
    function esm_typeof(obj) {
      return esm_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      }, esm_typeof(obj);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function _possibleConstructorReturn(self, call) {
      if (call && ("object" === esm_typeof(call) || "function" == typeof call)) return call;
      if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return self;
    }
    function _inherits(subClass, superClass) {
      if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      }), superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
    }
    var CompileError = function(_Error2) {
      function CompileError() {
        return _classCallCheck(this, CompileError), _possibleConstructorReturn(this, (CompileError.__proto__ || Object.getPrototypeOf(CompileError)).apply(this, arguments));
      }
      return _inherits(CompileError, Error), CompileError;
    }();
    function parse32F(sourceString) {
      return isHexLiteral(sourceString) ? parse(sourceString) : isInfLiteral(sourceString) ? "-" === sourceString[0] ? -1 : 1 : isNanLiteral(sourceString) ? ("-" === sourceString[0] ? -1 : 1) * (sourceString.includes(":") ? parseInt(sourceString.substring(sourceString.indexOf(":") + 1), 16) : 4194304) : parseFloat(sourceString);
    }
    function parse64F(sourceString) {
      return isHexLiteral(sourceString) ? parse(sourceString) : isInfLiteral(sourceString) ? "-" === sourceString[0] ? -1 : 1 : isNanLiteral(sourceString) ? ("-" === sourceString[0] ? -1 : 1) * (sourceString.includes(":") ? parseInt(sourceString.substring(sourceString.indexOf(":") + 1), 16) : 0x8000000000000) : isHexLiteral(sourceString) ? parse(sourceString) : parseFloat(sourceString);
    }
    function parse32I(sourceString) {
      var value = 0;
      if (isHexLiteral(sourceString)) value = ~~parseInt(sourceString, 16); else {
        if (isDecimalExponentLiteral(sourceString)) throw new Error("This number literal format is yet to be implemented.");
        value = parseInt(sourceString, 10);
      }
      return value;
    }
    function parseU32(sourceString) {
      var value = parse32I(sourceString);
      if (value < 0) throw new CompileError("Illegal value for u32: " + sourceString);
      return value;
    }
    function parse64I(sourceString) {
      var long;
      if (isHexLiteral(sourceString)) long = long_default().fromString(sourceString, !1, 16); else {
        if (isDecimalExponentLiteral(sourceString)) throw new Error("This number literal format is yet to be implemented.");
        long = long_default().fromString(sourceString);
      }
      return {
        high: long.high,
        low: long.low
      };
    }
    var NAN_WORD = /^\+?-?nan/, INF_WORD = /^\+?-?inf/;
    function isInfLiteral(sourceString) {
      return INF_WORD.test(sourceString.toLowerCase());
    }
    function isNanLiteral(sourceString) {
      return NAN_WORD.test(sourceString.toLowerCase());
    }
    function isDecimalExponentLiteral(sourceString) {
      return !isHexLiteral(sourceString) && sourceString.toUpperCase().includes("E");
    }
    function isHexLiteral(sourceString) {
      return "0X" === sourceString.substring(0, 2).toUpperCase() || "-0X" === sourceString.substring(0, 3).toUpperCase();
    }
    function numberLiteralFromRaw(rawValue) {
      var instructionType = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "i32", original = rawValue;
      if ("string" == typeof rawValue && (rawValue = rawValue.replace(/_/g, "")), "number" == typeof rawValue) return numberLiteral(rawValue, String(original));
      switch (instructionType) {
       case "i32":
        return numberLiteral(parse32I(rawValue), String(original));

       case "u32":
        return numberLiteral(parseU32(rawValue), String(original));

       case "i64":
        return longNumberLiteral(parse64I(rawValue), String(original));

       case "f32":
        return floatLiteral(parse32F(rawValue), isNanLiteral(rawValue), isInfLiteral(rawValue), String(original));

       default:
        return floatLiteral(parse64F(rawValue), isNanLiteral(rawValue), isInfLiteral(rawValue), String(original));
      }
    }
    function instruction(id) {
      var args = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], namedArgs = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
      return instr(id, void 0, args, namedArgs);
    }
    function objectInstruction(id, object) {
      var args = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [], namedArgs = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
      return instr(id, object, args, namedArgs);
    }
    function withLoc(n, end, start) {
      var loc = {
        start,
        end
      };
      return n.loc = loc, n;
    }
    function withRaw(n, raw) {
      return n.raw = raw, n;
    }
    function funcParam(valtype, id) {
      return {
        id,
        valtype
      };
    }
    function indexLiteral(value) {
      return numberLiteralFromRaw(value, "u32");
    }
    function memIndexLiteral(value) {
      return numberLiteralFromRaw(value, "u32");
    }
    function _extends() {
      return _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
        }
        return target;
      }, _extends.apply(this, arguments);
    }
    function findParent(_ref, cb) {
      var parentPath = _ref.parentPath;
      if (null == parentPath) throw new Error("node is root");
      for (var currentPath = parentPath; !1 !== cb(currentPath); ) {
        if (null == currentPath.parentPath) return null;
        currentPath = currentPath.parentPath;
      }
      return currentPath.node;
    }
    function insertBefore(context, newNode) {
      return insert(context, newNode);
    }
    function insertAfter(context, newNode) {
      return insert(context, newNode, 1);
    }
    function insert(_ref2, newNode) {
      var node = _ref2.node, inList = _ref2.inList, parentPath = _ref2.parentPath, parentKey = _ref2.parentKey, indexOffset = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
      if (!inList) throw new Error("inList error: insert can only be used for nodes that are within lists");
      if (null == parentPath) throw new Error("parentPath != null error: Can not remove root node");
      var parentList = parentPath.node[parentKey], indexInList = parentList.findIndex((function(n) {
        return n === node;
      }));
      parentList.splice(indexInList + indexOffset, 0, newNode);
    }
    function remove(_ref3) {
      var node = _ref3.node, parentKey = _ref3.parentKey, parentPath = _ref3.parentPath;
      if (null == parentPath) throw new Error("parentPath != null error: Can not remove root node");
      var parentNode = parentPath.node, parentProperty = parentNode[parentKey];
      Array.isArray(parentProperty) ? parentNode[parentKey] = parentProperty.filter((function(n) {
        return n !== node;
      })) : delete parentNode[parentKey], node._deleted = !0;
    }
    function stop(context) {
      context.shouldStop = !0;
    }
    function replaceWith(context, newNode) {
      var parentNode = context.parentPath.node, parentProperty = parentNode[context.parentKey];
      if (Array.isArray(parentProperty)) {
        var indexInList = parentProperty.findIndex((function(n) {
          return n === context.node;
        }));
        parentProperty.splice(indexInList, 1, newNode);
      } else parentNode[context.parentKey] = newNode;
      context.node._deleted = !0, context.node = newNode;
    }
    function createPathOperations(context) {
      return function(operations, context) {
        var keys = Object.keys(operations), boundOperations = {};
        return keys.forEach((function(key) {
          boundOperations[key] = operations[key].bind(null, context);
        })), boundOperations;
      }({
        findParent,
        replaceWith,
        remove,
        insertBefore,
        insertAfter,
        stop
      }, context);
    }
    function walk(context, callback) {
      var stop = !1;
      !function innerWalk(context, callback) {
        if (!stop) {
          var node = context.node;
          if (void 0 !== node) {
            if (!0 !== node._deleted) {
              var path = function(context) {
                var path = _extends({}, context);
                return Object.assign(path, createPathOperations(path)), path;
              }(context);
              callback(node.type, path), path.shouldStop ? stop = !0 : Object.keys(node).forEach((function(prop) {
                var value = node[prop];
                null != value && (Array.isArray(value) ? value : [ value ]).forEach((function(childNode) {
                  "string" == typeof childNode.type && innerWalk({
                    node: childNode,
                    parentKey: prop,
                    parentPath: path,
                    shouldStop: !1,
                    inList: Array.isArray(value)
                  }, callback);
                }));
              }));
            }
          } else console.warn("traversing with an empty context");
        }
      }(context, callback);
    }
    var noop = function() {};
    function traverse(node, visitors) {
      var before = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : noop, after = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : noop;
      Object.keys(visitors).forEach((function(visitor) {
        if (!nodeAndUnionTypes.includes(visitor)) throw new Error("Unexpected visitor ".concat(visitor));
      }));
      var context = {
        node,
        inList: !1,
        shouldStop: !1,
        parentPath: null,
        parentKey: null
      };
      walk(context, (function(type, path) {
        "function" == typeof visitors[type] && (before(type, path), visitors[type](path), 
        after(type, path));
        var unionTypes = unionTypesMap[type];
        if (!unionTypes) throw new Error("Unexpected node type ".concat(type));
        unionTypes.forEach((function(unionType) {
          "function" == typeof visitors[unionType] && (before(unionType, path), visitors[unionType](path), 
          after(unionType, path));
        }));
      }));
    }
    function sign(input, output) {
      return [ input, output ];
    }
    var t, vecType, u32 = "u32", i32 = "i32", i64 = "i64", f32 = "f32", f64 = "f64", controlInstructions = {
      unreachable: sign([], []),
      nop: sign([], []),
      br: sign([ u32 ], []),
      br_if: sign([ u32 ], []),
      br_table: sign((t = u32, vecType = [ t ], vecType.vector = !0, vecType), []),
      return: sign([], []),
      call: sign([ u32 ], []),
      call_indirect: sign([ u32 ], [])
    }, parametricInstructions = {
      drop: sign([], []),
      select: sign([], [])
    }, variableInstructions = {
      get_local: sign([ u32 ], []),
      set_local: sign([ u32 ], []),
      tee_local: sign([ u32 ], []),
      get_global: sign([ u32 ], []),
      set_global: sign([ u32 ], [])
    }, memoryInstructions = {
      "i32.load": sign([ u32, u32 ], [ i32 ]),
      "i64.load": sign([ u32, u32 ], []),
      "f32.load": sign([ u32, u32 ], []),
      "f64.load": sign([ u32, u32 ], []),
      "i32.load8_s": sign([ u32, u32 ], [ i32 ]),
      "i32.load8_u": sign([ u32, u32 ], [ i32 ]),
      "i32.load16_s": sign([ u32, u32 ], [ i32 ]),
      "i32.load16_u": sign([ u32, u32 ], [ i32 ]),
      "i64.load8_s": sign([ u32, u32 ], [ i64 ]),
      "i64.load8_u": sign([ u32, u32 ], [ i64 ]),
      "i64.load16_s": sign([ u32, u32 ], [ i64 ]),
      "i64.load16_u": sign([ u32, u32 ], [ i64 ]),
      "i64.load32_s": sign([ u32, u32 ], [ i64 ]),
      "i64.load32_u": sign([ u32, u32 ], [ i64 ]),
      "i32.store": sign([ u32, u32 ], []),
      "i64.store": sign([ u32, u32 ], []),
      "f32.store": sign([ u32, u32 ], []),
      "f64.store": sign([ u32, u32 ], []),
      "i32.store8": sign([ u32, u32 ], []),
      "i32.store16": sign([ u32, u32 ], []),
      "i64.store8": sign([ u32, u32 ], []),
      "i64.store16": sign([ u32, u32 ], []),
      "i64.store32": sign([ u32, u32 ], []),
      current_memory: sign([], []),
      grow_memory: sign([], [])
    }, numericInstructions = {
      "i32.const": sign([ i32 ], [ i32 ]),
      "i64.const": sign([ i64 ], [ i64 ]),
      "f32.const": sign([ f32 ], [ f32 ]),
      "f64.const": sign([ f64 ], [ f64 ]),
      "i32.eqz": sign([ i32 ], [ i32 ]),
      "i32.eq": sign([ i32, i32 ], [ i32 ]),
      "i32.ne": sign([ i32, i32 ], [ i32 ]),
      "i32.lt_s": sign([ i32, i32 ], [ i32 ]),
      "i32.lt_u": sign([ i32, i32 ], [ i32 ]),
      "i32.gt_s": sign([ i32, i32 ], [ i32 ]),
      "i32.gt_u": sign([ i32, i32 ], [ i32 ]),
      "i32.le_s": sign([ i32, i32 ], [ i32 ]),
      "i32.le_u": sign([ i32, i32 ], [ i32 ]),
      "i32.ge_s": sign([ i32, i32 ], [ i32 ]),
      "i32.ge_u": sign([ i32, i32 ], [ i32 ]),
      "i64.eqz": sign([ i64 ], [ i64 ]),
      "i64.eq": sign([ i64, i64 ], [ i32 ]),
      "i64.ne": sign([ i64, i64 ], [ i32 ]),
      "i64.lt_s": sign([ i64, i64 ], [ i32 ]),
      "i64.lt_u": sign([ i64, i64 ], [ i32 ]),
      "i64.gt_s": sign([ i64, i64 ], [ i32 ]),
      "i64.gt_u": sign([ i64, i64 ], [ i32 ]),
      "i64.le_s": sign([ i64, i64 ], [ i32 ]),
      "i64.le_u": sign([ i64, i64 ], [ i32 ]),
      "i64.ge_s": sign([ i64, i64 ], [ i32 ]),
      "i64.ge_u": sign([ i64, i64 ], [ i32 ]),
      "f32.eq": sign([ f32, f32 ], [ i32 ]),
      "f32.ne": sign([ f32, f32 ], [ i32 ]),
      "f32.lt": sign([ f32, f32 ], [ i32 ]),
      "f32.gt": sign([ f32, f32 ], [ i32 ]),
      "f32.le": sign([ f32, f32 ], [ i32 ]),
      "f32.ge": sign([ f32, f32 ], [ i32 ]),
      "f64.eq": sign([ f64, f64 ], [ i32 ]),
      "f64.ne": sign([ f64, f64 ], [ i32 ]),
      "f64.lt": sign([ f64, f64 ], [ i32 ]),
      "f64.gt": sign([ f64, f64 ], [ i32 ]),
      "f64.le": sign([ f64, f64 ], [ i32 ]),
      "f64.ge": sign([ f64, f64 ], [ i32 ]),
      "i32.clz": sign([ i32 ], [ i32 ]),
      "i32.ctz": sign([ i32 ], [ i32 ]),
      "i32.popcnt": sign([ i32 ], [ i32 ]),
      "i32.add": sign([ i32, i32 ], [ i32 ]),
      "i32.sub": sign([ i32, i32 ], [ i32 ]),
      "i32.mul": sign([ i32, i32 ], [ i32 ]),
      "i32.div_s": sign([ i32, i32 ], [ i32 ]),
      "i32.div_u": sign([ i32, i32 ], [ i32 ]),
      "i32.rem_s": sign([ i32, i32 ], [ i32 ]),
      "i32.rem_u": sign([ i32, i32 ], [ i32 ]),
      "i32.and": sign([ i32, i32 ], [ i32 ]),
      "i32.or": sign([ i32, i32 ], [ i32 ]),
      "i32.xor": sign([ i32, i32 ], [ i32 ]),
      "i32.shl": sign([ i32, i32 ], [ i32 ]),
      "i32.shr_s": sign([ i32, i32 ], [ i32 ]),
      "i32.shr_u": sign([ i32, i32 ], [ i32 ]),
      "i32.rotl": sign([ i32, i32 ], [ i32 ]),
      "i32.rotr": sign([ i32, i32 ], [ i32 ]),
      "i64.clz": sign([ i64 ], [ i64 ]),
      "i64.ctz": sign([ i64 ], [ i64 ]),
      "i64.popcnt": sign([ i64 ], [ i64 ]),
      "i64.add": sign([ i64, i64 ], [ i64 ]),
      "i64.sub": sign([ i64, i64 ], [ i64 ]),
      "i64.mul": sign([ i64, i64 ], [ i64 ]),
      "i64.div_s": sign([ i64, i64 ], [ i64 ]),
      "i64.div_u": sign([ i64, i64 ], [ i64 ]),
      "i64.rem_s": sign([ i64, i64 ], [ i64 ]),
      "i64.rem_u": sign([ i64, i64 ], [ i64 ]),
      "i64.and": sign([ i64, i64 ], [ i64 ]),
      "i64.or": sign([ i64, i64 ], [ i64 ]),
      "i64.xor": sign([ i64, i64 ], [ i64 ]),
      "i64.shl": sign([ i64, i64 ], [ i64 ]),
      "i64.shr_s": sign([ i64, i64 ], [ i64 ]),
      "i64.shr_u": sign([ i64, i64 ], [ i64 ]),
      "i64.rotl": sign([ i64, i64 ], [ i64 ]),
      "i64.rotr": sign([ i64, i64 ], [ i64 ]),
      "f32.abs": sign([ f32 ], [ f32 ]),
      "f32.neg": sign([ f32 ], [ f32 ]),
      "f32.ceil": sign([ f32 ], [ f32 ]),
      "f32.floor": sign([ f32 ], [ f32 ]),
      "f32.trunc": sign([ f32 ], [ f32 ]),
      "f32.nearest": sign([ f32 ], [ f32 ]),
      "f32.sqrt": sign([ f32 ], [ f32 ]),
      "f32.add": sign([ f32, f32 ], [ f32 ]),
      "f32.sub": sign([ f32, f32 ], [ f32 ]),
      "f32.mul": sign([ f32, f32 ], [ f32 ]),
      "f32.div": sign([ f32, f32 ], [ f32 ]),
      "f32.min": sign([ f32, f32 ], [ f32 ]),
      "f32.max": sign([ f32, f32 ], [ f32 ]),
      "f32.copysign": sign([ f32, f32 ], [ f32 ]),
      "f64.abs": sign([ f64 ], [ f64 ]),
      "f64.neg": sign([ f64 ], [ f64 ]),
      "f64.ceil": sign([ f64 ], [ f64 ]),
      "f64.floor": sign([ f64 ], [ f64 ]),
      "f64.trunc": sign([ f64 ], [ f64 ]),
      "f64.nearest": sign([ f64 ], [ f64 ]),
      "f64.sqrt": sign([ f64 ], [ f64 ]),
      "f64.add": sign([ f64, f64 ], [ f64 ]),
      "f64.sub": sign([ f64, f64 ], [ f64 ]),
      "f64.mul": sign([ f64, f64 ], [ f64 ]),
      "f64.div": sign([ f64, f64 ], [ f64 ]),
      "f64.min": sign([ f64, f64 ], [ f64 ]),
      "f64.max": sign([ f64, f64 ], [ f64 ]),
      "f64.copysign": sign([ f64, f64 ], [ f64 ]),
      "i32.wrap/i64": sign([ i64 ], [ i32 ]),
      "i32.trunc_s/f32": sign([ f32 ], [ i32 ]),
      "i32.trunc_u/f32": sign([ f32 ], [ i32 ]),
      "i32.trunc_s/f64": sign([ f32 ], [ i32 ]),
      "i32.trunc_u/f64": sign([ f64 ], [ i32 ]),
      "i64.extend_s/i32": sign([ i32 ], [ i64 ]),
      "i64.extend_u/i32": sign([ i32 ], [ i64 ]),
      "i64.trunc_s/f32": sign([ f32 ], [ i64 ]),
      "i64.trunc_u/f32": sign([ f32 ], [ i64 ]),
      "i64.trunc_s/f64": sign([ f64 ], [ i64 ]),
      "i64.trunc_u/f64": sign([ f64 ], [ i64 ]),
      "f32.convert_s/i32": sign([ i32 ], [ f32 ]),
      "f32.convert_u/i32": sign([ i32 ], [ f32 ]),
      "f32.convert_s/i64": sign([ i64 ], [ f32 ]),
      "f32.convert_u/i64": sign([ i64 ], [ f32 ]),
      "f32.demote/f64": sign([ f64 ], [ f32 ]),
      "f64.convert_s/i32": sign([ i32 ], [ f64 ]),
      "f64.convert_u/i32": sign([ i32 ], [ f64 ]),
      "f64.convert_s/i64": sign([ i64 ], [ f64 ]),
      "f64.convert_u/i64": sign([ i64 ], [ f64 ]),
      "f64.promote/f32": sign([ f32 ], [ f64 ]),
      "i32.reinterpret/f32": sign([ f32 ], [ i32 ]),
      "i64.reinterpret/f64": sign([ f64 ], [ i64 ]),
      "f32.reinterpret/i32": sign([ i32 ], [ f32 ]),
      "f64.reinterpret/i64": sign([ i64 ], [ f64 ])
    }, signatures = Object.assign({}, controlInstructions, parametricInstructions, variableInstructions, memoryInstructions, numericInstructions);
    function invertMap(obj) {
      for (var keyModifierFn = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function(k) {
        return k;
      }, result = {}, keys = Object.keys(obj), i = 0, length = keys.length; i < length; i++) result[keyModifierFn(obj[keys[i]])] = keys[i];
      return result;
    }
    function createSymbolObject(name, object) {
      var numberOfArgs = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
      return {
        name,
        object,
        numberOfArgs
      };
    }
    function createSymbol(name) {
      var numberOfArgs = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      return {
        name,
        numberOfArgs
      };
    }
    var exportTypes = {
      0: "Func",
      1: "Table",
      2: "Mem",
      3: "Global"
    }, exportTypesByName = invertMap(exportTypes), valtypes = {
      127: "i32",
      126: "i64",
      125: "f32",
      124: "f64",
      123: "v128"
    }, valtypesByString = invertMap(valtypes), blockTypes = Object.assign({}, valtypes, {
      64: null,
      127: "i32",
      126: "i64",
      125: "f32",
      124: "f64"
    }), globalTypes = {
      0: "const",
      1: "var"
    }, globalTypesByString = invertMap(globalTypes), symbolsByByte = {
      0: createSymbol("unreachable"),
      1: createSymbol("nop"),
      2: createSymbol("block"),
      3: createSymbol("loop"),
      4: createSymbol("if"),
      5: createSymbol("else"),
      6: "illegal",
      7: "illegal",
      8: "illegal",
      9: "illegal",
      10: "illegal",
      11: createSymbol("end"),
      12: createSymbol("br", 1),
      13: createSymbol("br_if", 1),
      14: createSymbol("br_table"),
      15: createSymbol("return"),
      16: createSymbol("call", 1),
      17: createSymbol("call_indirect", 2),
      18: "illegal",
      19: "illegal",
      20: "illegal",
      21: "illegal",
      22: "illegal",
      23: "illegal",
      24: "illegal",
      25: "illegal",
      26: createSymbol("drop"),
      27: createSymbol("select"),
      28: "illegal",
      29: "illegal",
      30: "illegal",
      31: "illegal",
      32: createSymbol("get_local", 1),
      33: createSymbol("set_local", 1),
      34: createSymbol("tee_local", 1),
      35: createSymbol("get_global", 1),
      36: createSymbol("set_global", 1),
      37: "illegal",
      38: "illegal",
      39: "illegal",
      40: createSymbolObject("load", "u32", 1),
      41: createSymbolObject("load", "u64", 1),
      42: createSymbolObject("load", "f32", 1),
      43: createSymbolObject("load", "f64", 1),
      44: createSymbolObject("load8_s", "u32", 1),
      45: createSymbolObject("load8_u", "u32", 1),
      46: createSymbolObject("load16_s", "u32", 1),
      47: createSymbolObject("load16_u", "u32", 1),
      48: createSymbolObject("load8_s", "u64", 1),
      49: createSymbolObject("load8_u", "u64", 1),
      50: createSymbolObject("load16_s", "u64", 1),
      51: createSymbolObject("load16_u", "u64", 1),
      52: createSymbolObject("load32_s", "u64", 1),
      53: createSymbolObject("load32_u", "u64", 1),
      54: createSymbolObject("store", "u32", 1),
      55: createSymbolObject("store", "u64", 1),
      56: createSymbolObject("store", "f32", 1),
      57: createSymbolObject("store", "f64", 1),
      58: createSymbolObject("store8", "u32", 1),
      59: createSymbolObject("store16", "u32", 1),
      60: createSymbolObject("store8", "u64", 1),
      61: createSymbolObject("store16", "u64", 1),
      62: createSymbolObject("store32", "u64", 1),
      63: createSymbolObject("current_memory"),
      64: createSymbolObject("grow_memory"),
      65: createSymbolObject("const", "i32", 1),
      66: createSymbolObject("const", "i64", 1),
      67: createSymbolObject("const", "f32", 1),
      68: createSymbolObject("const", "f64", 1),
      69: createSymbolObject("eqz", "i32"),
      70: createSymbolObject("eq", "i32"),
      71: createSymbolObject("ne", "i32"),
      72: createSymbolObject("lt_s", "i32"),
      73: createSymbolObject("lt_u", "i32"),
      74: createSymbolObject("gt_s", "i32"),
      75: createSymbolObject("gt_u", "i32"),
      76: createSymbolObject("le_s", "i32"),
      77: createSymbolObject("le_u", "i32"),
      78: createSymbolObject("ge_s", "i32"),
      79: createSymbolObject("ge_u", "i32"),
      80: createSymbolObject("eqz", "i64"),
      81: createSymbolObject("eq", "i64"),
      82: createSymbolObject("ne", "i64"),
      83: createSymbolObject("lt_s", "i64"),
      84: createSymbolObject("lt_u", "i64"),
      85: createSymbolObject("gt_s", "i64"),
      86: createSymbolObject("gt_u", "i64"),
      87: createSymbolObject("le_s", "i64"),
      88: createSymbolObject("le_u", "i64"),
      89: createSymbolObject("ge_s", "i64"),
      90: createSymbolObject("ge_u", "i64"),
      91: createSymbolObject("eq", "f32"),
      92: createSymbolObject("ne", "f32"),
      93: createSymbolObject("lt", "f32"),
      94: createSymbolObject("gt", "f32"),
      95: createSymbolObject("le", "f32"),
      96: createSymbolObject("ge", "f32"),
      97: createSymbolObject("eq", "f64"),
      98: createSymbolObject("ne", "f64"),
      99: createSymbolObject("lt", "f64"),
      100: createSymbolObject("gt", "f64"),
      101: createSymbolObject("le", "f64"),
      102: createSymbolObject("ge", "f64"),
      103: createSymbolObject("clz", "i32"),
      104: createSymbolObject("ctz", "i32"),
      105: createSymbolObject("popcnt", "i32"),
      106: createSymbolObject("add", "i32"),
      107: createSymbolObject("sub", "i32"),
      108: createSymbolObject("mul", "i32"),
      109: createSymbolObject("div_s", "i32"),
      110: createSymbolObject("div_u", "i32"),
      111: createSymbolObject("rem_s", "i32"),
      112: createSymbolObject("rem_u", "i32"),
      113: createSymbolObject("and", "i32"),
      114: createSymbolObject("or", "i32"),
      115: createSymbolObject("xor", "i32"),
      116: createSymbolObject("shl", "i32"),
      117: createSymbolObject("shr_s", "i32"),
      118: createSymbolObject("shr_u", "i32"),
      119: createSymbolObject("rotl", "i32"),
      120: createSymbolObject("rotr", "i32"),
      121: createSymbolObject("clz", "i64"),
      122: createSymbolObject("ctz", "i64"),
      123: createSymbolObject("popcnt", "i64"),
      124: createSymbolObject("add", "i64"),
      125: createSymbolObject("sub", "i64"),
      126: createSymbolObject("mul", "i64"),
      127: createSymbolObject("div_s", "i64"),
      128: createSymbolObject("div_u", "i64"),
      129: createSymbolObject("rem_s", "i64"),
      130: createSymbolObject("rem_u", "i64"),
      131: createSymbolObject("and", "i64"),
      132: createSymbolObject("or", "i64"),
      133: createSymbolObject("xor", "i64"),
      134: createSymbolObject("shl", "i64"),
      135: createSymbolObject("shr_s", "i64"),
      136: createSymbolObject("shr_u", "i64"),
      137: createSymbolObject("rotl", "i64"),
      138: createSymbolObject("rotr", "i64"),
      139: createSymbolObject("abs", "f32"),
      140: createSymbolObject("neg", "f32"),
      141: createSymbolObject("ceil", "f32"),
      142: createSymbolObject("floor", "f32"),
      143: createSymbolObject("trunc", "f32"),
      144: createSymbolObject("nearest", "f32"),
      145: createSymbolObject("sqrt", "f32"),
      146: createSymbolObject("add", "f32"),
      147: createSymbolObject("sub", "f32"),
      148: createSymbolObject("mul", "f32"),
      149: createSymbolObject("div", "f32"),
      150: createSymbolObject("min", "f32"),
      151: createSymbolObject("max", "f32"),
      152: createSymbolObject("copysign", "f32"),
      153: createSymbolObject("abs", "f64"),
      154: createSymbolObject("neg", "f64"),
      155: createSymbolObject("ceil", "f64"),
      156: createSymbolObject("floor", "f64"),
      157: createSymbolObject("trunc", "f64"),
      158: createSymbolObject("nearest", "f64"),
      159: createSymbolObject("sqrt", "f64"),
      160: createSymbolObject("add", "f64"),
      161: createSymbolObject("sub", "f64"),
      162: createSymbolObject("mul", "f64"),
      163: createSymbolObject("div", "f64"),
      164: createSymbolObject("min", "f64"),
      165: createSymbolObject("max", "f64"),
      166: createSymbolObject("copysign", "f64"),
      167: createSymbolObject("wrap/i64", "i32"),
      168: createSymbolObject("trunc_s/f32", "i32"),
      169: createSymbolObject("trunc_u/f32", "i32"),
      170: createSymbolObject("trunc_s/f64", "i32"),
      171: createSymbolObject("trunc_u/f64", "i32"),
      172: createSymbolObject("extend_s/i32", "i64"),
      173: createSymbolObject("extend_u/i32", "i64"),
      174: createSymbolObject("trunc_s/f32", "i64"),
      175: createSymbolObject("trunc_u/f32", "i64"),
      176: createSymbolObject("trunc_s/f64", "i64"),
      177: createSymbolObject("trunc_u/f64", "i64"),
      178: createSymbolObject("convert_s/i32", "f32"),
      179: createSymbolObject("convert_u/i32", "f32"),
      180: createSymbolObject("convert_s/i64", "f32"),
      181: createSymbolObject("convert_u/i64", "f32"),
      182: createSymbolObject("demote/f64", "f32"),
      183: createSymbolObject("convert_s/i32", "f64"),
      184: createSymbolObject("convert_u/i32", "f64"),
      185: createSymbolObject("convert_s/i64", "f64"),
      186: createSymbolObject("convert_u/i64", "f64"),
      187: createSymbolObject("promote/f32", "f64"),
      188: createSymbolObject("reinterpret/f32", "i32"),
      189: createSymbolObject("reinterpret/f64", "i64"),
      190: createSymbolObject("reinterpret/i32", "f32"),
      191: createSymbolObject("reinterpret/i64", "f64"),
      65024: createSymbol("memory.atomic.notify", 1),
      65025: createSymbol("memory.atomic.wait32", 1),
      65026: createSymbol("memory.atomic.wait64", 1),
      65040: createSymbolObject("atomic.load", "i32", 1),
      65041: createSymbolObject("atomic.load", "i64", 1),
      65042: createSymbolObject("atomic.load8_u", "i32", 1),
      65043: createSymbolObject("atomic.load16_u", "i32", 1),
      65044: createSymbolObject("atomic.load8_u", "i64", 1),
      65045: createSymbolObject("atomic.load16_u", "i64", 1),
      65046: createSymbolObject("atomic.load32_u", "i64", 1),
      65047: createSymbolObject("atomic.store", "i32", 1),
      65048: createSymbolObject("atomic.store", "i64", 1),
      65049: createSymbolObject("atomic.store8_u", "i32", 1),
      65050: createSymbolObject("atomic.store16_u", "i32", 1),
      65051: createSymbolObject("atomic.store8_u", "i64", 1),
      65052: createSymbolObject("atomic.store16_u", "i64", 1),
      65053: createSymbolObject("atomic.store32_u", "i64", 1),
      65054: createSymbolObject("atomic.rmw.add", "i32", 1),
      65055: createSymbolObject("atomic.rmw.add", "i64", 1),
      65056: createSymbolObject("atomic.rmw8_u.add_u", "i32", 1),
      65057: createSymbolObject("atomic.rmw16_u.add_u", "i32", 1),
      65058: createSymbolObject("atomic.rmw8_u.add_u", "i64", 1),
      65059: createSymbolObject("atomic.rmw16_u.add_u", "i64", 1),
      65060: createSymbolObject("atomic.rmw32_u.add_u", "i64", 1),
      65061: createSymbolObject("atomic.rmw.sub", "i32", 1),
      65062: createSymbolObject("atomic.rmw.sub", "i64", 1),
      65063: createSymbolObject("atomic.rmw8_u.sub_u", "i32", 1),
      65064: createSymbolObject("atomic.rmw16_u.sub_u", "i32", 1),
      65065: createSymbolObject("atomic.rmw8_u.sub_u", "i64", 1),
      65066: createSymbolObject("atomic.rmw16_u.sub_u", "i64", 1),
      65067: createSymbolObject("atomic.rmw32_u.sub_u", "i64", 1),
      65068: createSymbolObject("atomic.rmw.and", "i32", 1),
      65069: createSymbolObject("atomic.rmw.and", "i64", 1),
      65070: createSymbolObject("atomic.rmw8_u.and_u", "i32", 1),
      65071: createSymbolObject("atomic.rmw16_u.and_u", "i32", 1),
      65072: createSymbolObject("atomic.rmw8_u.and_u", "i64", 1),
      65073: createSymbolObject("atomic.rmw16_u.and_u", "i64", 1),
      65074: createSymbolObject("atomic.rmw32_u.and_u", "i64", 1),
      65075: createSymbolObject("atomic.rmw.or", "i32", 1),
      65076: createSymbolObject("atomic.rmw.or", "i64", 1),
      65077: createSymbolObject("atomic.rmw8_u.or_u", "i32", 1),
      65078: createSymbolObject("atomic.rmw16_u.or_u", "i32", 1),
      65079: createSymbolObject("atomic.rmw8_u.or_u", "i64", 1),
      65080: createSymbolObject("atomic.rmw16_u.or_u", "i64", 1),
      65081: createSymbolObject("atomic.rmw32_u.or_u", "i64", 1),
      65082: createSymbolObject("atomic.rmw.xor", "i32", 1),
      65083: createSymbolObject("atomic.rmw.xor", "i64", 1),
      65084: createSymbolObject("atomic.rmw8_u.xor_u", "i32", 1),
      65085: createSymbolObject("atomic.rmw16_u.xor_u", "i32", 1),
      65086: createSymbolObject("atomic.rmw8_u.xor_u", "i64", 1),
      65087: createSymbolObject("atomic.rmw16_u.xor_u", "i64", 1),
      65088: createSymbolObject("atomic.rmw32_u.xor_u", "i64", 1),
      65089: createSymbolObject("atomic.rmw.xchg", "i32", 1),
      65090: createSymbolObject("atomic.rmw.xchg", "i64", 1),
      65091: createSymbolObject("atomic.rmw8_u.xchg_u", "i32", 1),
      65092: createSymbolObject("atomic.rmw16_u.xchg_u", "i32", 1),
      65093: createSymbolObject("atomic.rmw8_u.xchg_u", "i64", 1),
      65094: createSymbolObject("atomic.rmw16_u.xchg_u", "i64", 1),
      65095: createSymbolObject("atomic.rmw32_u.xchg_u", "i64", 1),
      65096: createSymbolObject("atomic.rmw.cmpxchg", "i32", 1),
      65097: createSymbolObject("atomic.rmw.cmpxchg", "i64", 1),
      65098: createSymbolObject("atomic.rmw8_u.cmpxchg_u", "i32", 1),
      65099: createSymbolObject("atomic.rmw16_u.cmpxchg_u", "i32", 1),
      65100: createSymbolObject("atomic.rmw8_u.cmpxchg_u", "i64", 1),
      65101: createSymbolObject("atomic.rmw16_u.cmpxchg_u", "i64", 1),
      65102: createSymbolObject("atomic.rmw32_u.cmpxchg_u", "i64", 1)
    };
    const esm = {
      symbolsByByte,
      sections: {
        custom: 0,
        type: 1,
        import: 2,
        func: 3,
        table: 4,
        memory: 5,
        global: 6,
        export: 7,
        start: 8,
        element: 9,
        code: 10,
        data: 11
      },
      magicModuleHeader: [ 0, 97, 115, 109 ],
      moduleVersion: [ 1, 0, 0, 0 ],
      types: {
        func: 96,
        result: 64
      },
      valtypes,
      exportTypes,
      blockTypes,
      tableTypes: {
        112: "anyfunc"
      },
      globalTypes,
      importTypes: {
        0: "func",
        1: "table",
        2: "mem",
        3: "global"
      },
      valtypesByString,
      globalTypesByString,
      exportTypesByName,
      symbolsByName: invertMap(symbolsByByte, (function(obj) {
        return "string" == typeof obj.object ? "".concat(obj.object, ".").concat(obj.name) : obj.name;
      }))
    };
    function _slicedToArray(arr, i) {
      if (Array.isArray(arr)) return arr;
      if (Symbol.iterator in Object(arr)) return function(arr, i) {
        var _arr = [], _n = !0, _d = !1, _e = void 0;
        try {
          for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), 
          !i || _arr.length !== i); _n = !0) ;
        } catch (err) {
          _d = !0, _e = err;
        } finally {
          try {
            _n || null == _i.return || _i.return();
          } finally {
            if (_d) throw _e;
          }
        }
        return _arr;
      }(arr, i);
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
    function utils_typeof(obj) {
      return utils_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      }, utils_typeof(obj);
    }
    function isAnonymous(ident) {
      return "" === ident.raw;
    }
    function getSectionMetadata(ast, name) {
      var section;
      return traverse(ast, {
        SectionMetadata: function(_SectionMetadata) {
          function SectionMetadata(_x) {
            return _SectionMetadata.apply(this, arguments);
          }
          return SectionMetadata.toString = function() {
            return _SectionMetadata.toString();
          }, SectionMetadata;
        }((function(_ref) {
          var node = _ref.node;
          node.section === name && (section = node);
        }))
      }), section;
    }
    function getSectionMetadatas(ast, name) {
      var sections = [];
      return traverse(ast, {
        SectionMetadata: function(_SectionMetadata2) {
          function SectionMetadata(_x2) {
            return _SectionMetadata2.apply(this, arguments);
          }
          return SectionMetadata.toString = function() {
            return _SectionMetadata2.toString();
          }, SectionMetadata;
        }((function(_ref2) {
          var node = _ref2.node;
          node.section === name && sections.push(node);
        }))
      }), sections;
    }
    function sortSectionMetadata(m) {
      null != m.metadata ? m.metadata.sections.sort((function(a, b) {
        var aId = esm.sections[a.section], bId = esm.sections[b.section];
        if ("number" != typeof aId || "number" != typeof bId) throw new Error("Section id not found");
        return aId - bId;
      })) : console.warn("sortSectionMetadata: no metadata to sort");
    }
    function orderedInsertNode(m, n) {
      assertHasLoc(n);
      var didInsert = !1;
      "ModuleExport" !== n.type ? (m.fields = m.fields.reduce((function(acc, field) {
        var fieldEndCol = 1 / 0;
        return null != field.loc && (fieldEndCol = field.loc.end.column), !1 === didInsert && n.loc.start.column < fieldEndCol && (didInsert = !0, 
        acc.push(n)), acc.push(field), acc;
      }), []), !1 === didInsert && m.fields.push(n)) : m.fields.push(n);
    }
    function assertHasLoc(n) {
      if (null == n.loc || null == n.loc.start || null == n.loc.end) throw new Error("Internal failure: node (".concat(JSON.stringify(n.type), ") has no location information"));
    }
    function getEndOfSection(s) {
      return assertHasLoc(s.size), s.startOffset + s.size.value + (s.size.loc.end.column - s.size.loc.start.column);
    }
    function shiftLoc(node, delta) {
      node.loc.start.column += delta, node.loc.end.column += delta;
    }
    function shiftSection(ast, node, delta) {
      if ("SectionMetadata" !== node.type) throw new Error("Can not shift node " + JSON.stringify(node.type));
      node.startOffset += delta, "object" === utils_typeof(node.size.loc) && shiftLoc(node.size, delta), 
      "object" === utils_typeof(node.vectorOfSize) && "object" === utils_typeof(node.vectorOfSize.loc) && shiftLoc(node.vectorOfSize, delta);
      var sectionName = node.section;
      traverse(ast, {
        Node: function(_ref3) {
          var node = _ref3.node;
          (function(n) {
            switch (n.type) {
             case "ModuleImport":
              return "import";

             case "CallInstruction":
             case "CallIndirectInstruction":
             case "Func":
             case "Instr":
              return "code";

             case "ModuleExport":
              return "export";

             case "Start":
              return "start";

             case "TypeInstruction":
              return "type";

             case "IndexInFuncSection":
              return "func";

             case "Global":
              return "global";

             default:
              return;
            }
          })(node) === sectionName && "object" === utils_typeof(node.loc) && shiftLoc(node, delta);
        }
      });
    }
    function signatureForOpcode(object, name) {
      var opcodeName = name;
      void 0 !== object && "" !== object && (opcodeName = object + "." + name);
      var sign = signatures[opcodeName];
      return null == sign ? [ object, object ] : sign[0];
    }
    function getUniqueNameGenerator() {
      var inc = {};
      return function() {
        var prefix = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "temp";
        return inc[prefix] = prefix in inc ? inc[prefix] + 1 : 0, prefix + "_" + inc[prefix];
      };
    }
    function getStartByteOffset(n) {
      if (void 0 === n.loc || void 0 === n.loc.start) throw new Error("Can not get byte offset without loc informations, node: " + String(n.id));
      return n.loc.start.column;
    }
    function getEndByteOffset(n) {
      if (void 0 === n.loc || void 0 === n.loc.end) throw new Error("Can not get byte offset without loc informations, node: " + n.type);
      return n.loc.end.column;
    }
    function getFunctionBeginingByteOffset(n) {
      if (!(n.body.length > 0)) throw new Error("n.body.length > 0 error: unknown");
      return getStartByteOffset(_slicedToArray(n.body, 1)[0]);
    }
    function getEndBlockByteOffset(n) {
      if (!(n.instr.length > 0 || n.body.length > 0)) throw new Error("n.instr.length > 0 || n.body.length > 0 error: unknown");
      var lastInstruction;
      if (n.instr && (lastInstruction = n.instr[n.instr.length - 1]), n.body && (lastInstruction = n.body[n.body.length - 1]), 
      "object" !== utils_typeof(lastInstruction)) throw new Error('typeof lastInstruction === "object" error: unknown');
      return getStartByteOffset(lastInstruction);
    }
    function getStartBlockByteOffset(n) {
      if (!(n.instr.length > 0 || n.body.length > 0)) throw new Error("n.instr.length > 0 || n.body.length > 0 error: unknown");
      var fistInstruction;
      n.instr && (fistInstruction = _slicedToArray(n.instr, 1)[0]);
      n.body && (fistInstruction = _slicedToArray(n.body, 1)[0]);
      if ("object" !== utils_typeof(fistInstruction)) throw new Error('typeof fistInstruction === "object" error: unknown');
      return getStartByteOffset(fistInstruction);
    }
    function cloneNode(n) {
      return Object.assign({}, n);
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || !1, descriptor.configurable = !0, 
        "value" in descriptor && (descriptor.writable = !0), Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
    function moduleContextFromModuleAST(m) {
      var moduleContext = new ModuleContext;
      if ("Module" !== m.type) throw new Error('m.type === "Module" error: unknown');
      return m.fields.forEach((function(field) {
        switch (field.type) {
         case "Start":
          moduleContext.setStart(field.index);
          break;

         case "TypeInstruction":
          moduleContext.addType(field);
          break;

         case "Func":
          moduleContext.addFunction(field);
          break;

         case "Global":
          moduleContext.defineGlobal(field);
          break;

         case "ModuleImport":
          switch (field.descr.type) {
           case "GlobalType":
            moduleContext.importGlobal(field.descr.valtype, field.descr.mutability);
            break;

           case "Memory":
            moduleContext.addMemory(field.descr.limits.min, field.descr.limits.max);
            break;

           case "FuncImportDescr":
            moduleContext.importFunction(field.descr);
            break;

           case "Table":
            break;

           default:
            throw new Error("Unsupported ModuleImport of type " + JSON.stringify(field.descr.type));
          }
          break;

         case "Memory":
          moduleContext.addMemory(field.limits.min, field.limits.max);
        }
      })), moduleContext;
    }
    var ModuleContext = function() {
      function ModuleContext() {
        !function(instance, Constructor) {
          if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }(this, ModuleContext), this.funcs = [], this.funcsOffsetByIdentifier = [], this.types = [], 
        this.globals = [], this.globalsOffsetByIdentifier = [], this.mems = [], this.locals = [], 
        this.labels = [], this.return = [], this.debugName = "unknown", this.start = null;
      }
      var Constructor, protoProps, staticProps;
      return Constructor = ModuleContext, protoProps = [ {
        key: "setStart",
        value: function(index) {
          this.start = index.value;
        }
      }, {
        key: "getStart",
        value: function() {
          return this.start;
        }
      }, {
        key: "newContext",
        value: function(debugName, expectedResult) {
          this.locals = [], this.labels = [ expectedResult ], this.return = expectedResult, 
          this.debugName = debugName;
        }
      }, {
        key: "addFunction",
        value: function(func) {
          var _ref = func.signature || {}, _ref$params = _ref.params, args = void 0 === _ref$params ? [] : _ref$params, _ref$results = _ref.results, result = void 0 === _ref$results ? [] : _ref$results;
          args = args.map((function(arg) {
            return arg.valtype;
          })), this.funcs.push({
            args,
            result
          }), void 0 !== func.name && (this.funcsOffsetByIdentifier[func.name.value] = this.funcs.length - 1);
        }
      }, {
        key: "importFunction",
        value: function(funcimport) {
          if (isSignature(funcimport.signature)) {
            var _funcimport$signature = funcimport.signature, args = _funcimport$signature.params, result = _funcimport$signature.results;
            args = args.map((function(arg) {
              return arg.valtype;
            })), this.funcs.push({
              args,
              result
            });
          } else {
            if (!isNumberLiteral(funcimport.signature)) throw new Error("isNumberLiteral(funcimport.signature) error: unknown");
            var typeId = funcimport.signature.value;
            if (!this.hasType(typeId)) throw new Error("this.hasType(typeId) error: unknown");
            var signature = this.getType(typeId);
            this.funcs.push({
              args: signature.params.map((function(arg) {
                return arg.valtype;
              })),
              result: signature.results
            });
          }
          void 0 !== funcimport.id && (this.funcsOffsetByIdentifier[funcimport.id.value] = this.funcs.length - 1);
        }
      }, {
        key: "hasFunction",
        value: function(index) {
          return void 0 !== this.getFunction(index);
        }
      }, {
        key: "getFunction",
        value: function(index) {
          if ("number" != typeof index) throw new Error("getFunction only supported for number index");
          return this.funcs[index];
        }
      }, {
        key: "getFunctionOffsetByIdentifier",
        value: function(name) {
          if ("string" != typeof name) throw new Error('typeof name === "string" error: unknown');
          return this.funcsOffsetByIdentifier[name];
        }
      }, {
        key: "addLabel",
        value: function(result) {
          this.labels.unshift(result);
        }
      }, {
        key: "hasLabel",
        value: function(index) {
          return this.labels.length > index && index >= 0;
        }
      }, {
        key: "getLabel",
        value: function(index) {
          return this.labels[index];
        }
      }, {
        key: "popLabel",
        value: function() {
          this.labels.shift();
        }
      }, {
        key: "hasLocal",
        value: function(index) {
          return void 0 !== this.getLocal(index);
        }
      }, {
        key: "getLocal",
        value: function(index) {
          return this.locals[index];
        }
      }, {
        key: "addLocal",
        value: function(type) {
          this.locals.push(type);
        }
      }, {
        key: "addType",
        value: function(type) {
          if ("Signature" !== type.functype.type) throw new Error('type.functype.type === "Signature" error: unknown');
          this.types.push(type.functype);
        }
      }, {
        key: "hasType",
        value: function(index) {
          return void 0 !== this.types[index];
        }
      }, {
        key: "getType",
        value: function(index) {
          return this.types[index];
        }
      }, {
        key: "hasGlobal",
        value: function(index) {
          return this.globals.length > index && index >= 0;
        }
      }, {
        key: "getGlobal",
        value: function(index) {
          return this.globals[index].type;
        }
      }, {
        key: "getGlobalOffsetByIdentifier",
        value: function(name) {
          if ("string" != typeof name) throw new Error('typeof name === "string" error: unknown');
          return this.globalsOffsetByIdentifier[name];
        }
      }, {
        key: "defineGlobal",
        value: function(global) {
          var type = global.globalType.valtype, mutability = global.globalType.mutability;
          this.globals.push({
            type,
            mutability
          }), void 0 !== global.name && (this.globalsOffsetByIdentifier[global.name.value] = this.globals.length - 1);
        }
      }, {
        key: "importGlobal",
        value: function(type, mutability) {
          this.globals.push({
            type,
            mutability
          });
        }
      }, {
        key: "isMutableGlobal",
        value: function(index) {
          return "var" === this.globals[index].mutability;
        }
      }, {
        key: "isImmutableGlobal",
        value: function(index) {
          return "const" === this.globals[index].mutability;
        }
      }, {
        key: "hasMemory",
        value: function(index) {
          return this.mems.length > index && index >= 0;
        }
      }, {
        key: "addMemory",
        value: function(min, max) {
          this.mems.push({
            min,
            max
          });
        }
      }, {
        key: "getMemory",
        value: function(index) {
          return this.mems[index];
        }
      } ], protoProps && _defineProperties(Constructor.prototype, protoProps), staticProps && _defineProperties(Constructor, staticProps), 
      ModuleContext;
    }();
  })();
  var __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
})();