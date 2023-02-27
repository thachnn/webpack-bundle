(() => {
  var __webpack_modules__ = {
    65379: module => {
      module.exports = {
        newInvalidAsn1Error: function(msg) {
          var e = new Error;
          return e.name = "InvalidAsn1Error", e.message = msg || "", e;
        }
      };
    },
    1487: (module, __unused_webpack_exports, __webpack_require__) => {
      var errors = __webpack_require__(65379), types = __webpack_require__(24043), Reader = __webpack_require__(31816), Writer = __webpack_require__(7054);
      for (var t in module.exports = {
        Reader,
        Writer
      }, types) types.hasOwnProperty(t) && (module.exports[t] = types[t]);
      for (var e in errors) errors.hasOwnProperty(e) && (module.exports[e] = errors[e]);
    },
    31816: (module, __unused_webpack_exports, __webpack_require__) => {
      var assert = __webpack_require__(39491), Buffer = __webpack_require__(12237).Buffer, ASN1 = __webpack_require__(24043), newInvalidAsn1Error = __webpack_require__(65379).newInvalidAsn1Error;
      function Reader(data) {
        if (!data || !Buffer.isBuffer(data)) throw new TypeError("data must be a node Buffer");
        this._buf = data, this._size = data.length, this._len = 0, this._offset = 0;
      }
      Object.defineProperty(Reader.prototype, "length", {
        enumerable: !0,
        get: function() {
          return this._len;
        }
      }), Object.defineProperty(Reader.prototype, "offset", {
        enumerable: !0,
        get: function() {
          return this._offset;
        }
      }), Object.defineProperty(Reader.prototype, "remain", {
        get: function() {
          return this._size - this._offset;
        }
      }), Object.defineProperty(Reader.prototype, "buffer", {
        get: function() {
          return this._buf.slice(this._offset);
        }
      }), Reader.prototype.readByte = function(peek) {
        if (this._size - this._offset < 1) return null;
        var b = 255 & this._buf[this._offset];
        return peek || (this._offset += 1), b;
      }, Reader.prototype.peek = function() {
        return this.readByte(!0);
      }, Reader.prototype.readLength = function(offset) {
        if (void 0 === offset && (offset = this._offset), offset >= this._size) return null;
        var lenB = 255 & this._buf[offset++];
        if (null === lenB) return null;
        if (128 == (128 & lenB)) {
          if (0 === (lenB &= 127)) throw newInvalidAsn1Error("Indefinite length not supported");
          if (lenB > 4) throw newInvalidAsn1Error("encoding too long");
          if (this._size - offset < lenB) return null;
          this._len = 0;
          for (var i = 0; i < lenB; i++) this._len = (this._len << 8) + (255 & this._buf[offset++]);
        } else this._len = lenB;
        return offset;
      }, Reader.prototype.readSequence = function(tag) {
        var seq = this.peek();
        if (null === seq) return null;
        if (void 0 !== tag && tag !== seq) throw newInvalidAsn1Error("Expected 0x" + tag.toString(16) + ": got 0x" + seq.toString(16));
        var o = this.readLength(this._offset + 1);
        return null === o ? null : (this._offset = o, seq);
      }, Reader.prototype.readInt = function() {
        return this._readTag(ASN1.Integer);
      }, Reader.prototype.readBoolean = function() {
        return 0 !== this._readTag(ASN1.Boolean);
      }, Reader.prototype.readEnumeration = function() {
        return this._readTag(ASN1.Enumeration);
      }, Reader.prototype.readString = function(tag, retbuf) {
        tag || (tag = ASN1.OctetString);
        var b = this.peek();
        if (null === b) return null;
        if (b !== tag) throw newInvalidAsn1Error("Expected 0x" + tag.toString(16) + ": got 0x" + b.toString(16));
        var o = this.readLength(this._offset + 1);
        if (null === o) return null;
        if (this.length > this._size - o) return null;
        if (this._offset = o, 0 === this.length) return retbuf ? Buffer.alloc(0) : "";
        var str = this._buf.slice(this._offset, this._offset + this.length);
        return this._offset += this.length, retbuf ? str : str.toString("utf8");
      }, Reader.prototype.readOID = function(tag) {
        tag || (tag = ASN1.OID);
        var b = this.readString(tag, !0);
        if (null === b) return null;
        for (var values = [], value = 0, i = 0; i < b.length; i++) {
          var byte = 255 & b[i];
          value <<= 7, value += 127 & byte, 0 == (128 & byte) && (values.push(value), value = 0);
        }
        return value = values.shift(), values.unshift(value % 40), values.unshift(value / 40 >> 0), 
        values.join(".");
      }, Reader.prototype._readTag = function(tag) {
        assert.ok(void 0 !== tag);
        var b = this.peek();
        if (null === b) return null;
        if (b !== tag) throw newInvalidAsn1Error("Expected 0x" + tag.toString(16) + ": got 0x" + b.toString(16));
        var o = this.readLength(this._offset + 1);
        if (null === o) return null;
        if (this.length > 4) throw newInvalidAsn1Error("Integer too long: " + this.length);
        if (this.length > this._size - o) return null;
        this._offset = o;
        for (var fb = this._buf[this._offset], value = 0, i = 0; i < this.length; i++) value <<= 8, 
        value |= 255 & this._buf[this._offset++];
        return 128 == (128 & fb) && 4 !== i && (value -= 1 << 8 * i), value >> 0;
      }, module.exports = Reader;
    },
    24043: module => {
      module.exports = {
        EOC: 0,
        Boolean: 1,
        Integer: 2,
        BitString: 3,
        OctetString: 4,
        Null: 5,
        OID: 6,
        ObjectDescriptor: 7,
        External: 8,
        Real: 9,
        Enumeration: 10,
        PDV: 11,
        Utf8String: 12,
        RelativeOID: 13,
        Sequence: 16,
        Set: 17,
        NumericString: 18,
        PrintableString: 19,
        T61String: 20,
        VideotexString: 21,
        IA5String: 22,
        UTCTime: 23,
        GeneralizedTime: 24,
        GraphicString: 25,
        VisibleString: 26,
        GeneralString: 28,
        UniversalString: 29,
        CharacterString: 30,
        BMPString: 31,
        Constructor: 32,
        Context: 128
      };
    },
    7054: (module, __unused_webpack_exports, __webpack_require__) => {
      var assert = __webpack_require__(39491), Buffer = __webpack_require__(12237).Buffer, ASN1 = __webpack_require__(24043), newInvalidAsn1Error = __webpack_require__(65379).newInvalidAsn1Error, DEFAULT_OPTS = {
        size: 1024,
        growthFactor: 8
      };
      function Writer(options) {
        var from, to;
        from = DEFAULT_OPTS, to = options || {}, assert.ok(from), assert.equal(typeof from, "object"), 
        assert.ok(to), assert.equal(typeof to, "object"), Object.getOwnPropertyNames(from).forEach((function(key) {
          if (!to[key]) {
            var value = Object.getOwnPropertyDescriptor(from, key);
            Object.defineProperty(to, key, value);
          }
        })), options = to, this._buf = Buffer.alloc(options.size || 1024), this._size = this._buf.length, 
        this._offset = 0, this._options = options, this._seq = [];
      }
      Object.defineProperty(Writer.prototype, "buffer", {
        get: function() {
          if (this._seq.length) throw newInvalidAsn1Error(this._seq.length + " unended sequence(s)");
          return this._buf.slice(0, this._offset);
        }
      }), Writer.prototype.writeByte = function(b) {
        if ("number" != typeof b) throw new TypeError("argument must be a Number");
        this._ensure(1), this._buf[this._offset++] = b;
      }, Writer.prototype.writeInt = function(i, tag) {
        if ("number" != typeof i) throw new TypeError("argument must be a Number");
        "number" != typeof tag && (tag = ASN1.Integer);
        for (var sz = 4; (0 == (4286578688 & i) || -8388608 == (4286578688 & i)) && sz > 1; ) sz--, 
        i <<= 8;
        if (sz > 4) throw newInvalidAsn1Error("BER ints cannot be > 0xffffffff");
        for (this._ensure(2 + sz), this._buf[this._offset++] = tag, this._buf[this._offset++] = sz; sz-- > 0; ) this._buf[this._offset++] = (4278190080 & i) >>> 24, 
        i <<= 8;
      }, Writer.prototype.writeNull = function() {
        this.writeByte(ASN1.Null), this.writeByte(0);
      }, Writer.prototype.writeEnumeration = function(i, tag) {
        if ("number" != typeof i) throw new TypeError("argument must be a Number");
        return "number" != typeof tag && (tag = ASN1.Enumeration), this.writeInt(i, tag);
      }, Writer.prototype.writeBoolean = function(b, tag) {
        if ("boolean" != typeof b) throw new TypeError("argument must be a Boolean");
        "number" != typeof tag && (tag = ASN1.Boolean), this._ensure(3), this._buf[this._offset++] = tag, 
        this._buf[this._offset++] = 1, this._buf[this._offset++] = b ? 255 : 0;
      }, Writer.prototype.writeString = function(s, tag) {
        if ("string" != typeof s) throw new TypeError("argument must be a string (was: " + typeof s + ")");
        "number" != typeof tag && (tag = ASN1.OctetString);
        var len = Buffer.byteLength(s);
        this.writeByte(tag), this.writeLength(len), len && (this._ensure(len), this._buf.write(s, this._offset), 
        this._offset += len);
      }, Writer.prototype.writeBuffer = function(buf, tag) {
        if ("number" != typeof tag) throw new TypeError("tag must be a number");
        if (!Buffer.isBuffer(buf)) throw new TypeError("argument must be a buffer");
        this.writeByte(tag), this.writeLength(buf.length), this._ensure(buf.length), buf.copy(this._buf, this._offset, 0, buf.length), 
        this._offset += buf.length;
      }, Writer.prototype.writeStringArray = function(strings) {
        if (!strings instanceof Array) throw new TypeError("argument must be an Array[String]");
        var self = this;
        strings.forEach((function(s) {
          self.writeString(s);
        }));
      }, Writer.prototype.writeOID = function(s, tag) {
        if ("string" != typeof s) throw new TypeError("argument must be a string");
        if ("number" != typeof tag && (tag = ASN1.OID), !/^([0-9]+\.){3,}[0-9]+$/.test(s)) throw new Error("argument is not a valid OID string");
        var tmp = s.split("."), bytes = [];
        bytes.push(40 * parseInt(tmp[0], 10) + parseInt(tmp[1], 10)), tmp.slice(2).forEach((function(b) {
          !function(bytes, octet) {
            octet < 128 ? bytes.push(octet) : octet < 16384 ? (bytes.push(octet >>> 7 | 128), 
            bytes.push(127 & octet)) : octet < 2097152 ? (bytes.push(octet >>> 14 | 128), bytes.push(255 & (octet >>> 7 | 128)), 
            bytes.push(127 & octet)) : octet < 268435456 ? (bytes.push(octet >>> 21 | 128), 
            bytes.push(255 & (octet >>> 14 | 128)), bytes.push(255 & (octet >>> 7 | 128)), bytes.push(127 & octet)) : (bytes.push(255 & (octet >>> 28 | 128)), 
            bytes.push(255 & (octet >>> 21 | 128)), bytes.push(255 & (octet >>> 14 | 128)), 
            bytes.push(255 & (octet >>> 7 | 128)), bytes.push(127 & octet));
          }(bytes, parseInt(b, 10));
        }));
        var self = this;
        this._ensure(2 + bytes.length), this.writeByte(tag), this.writeLength(bytes.length), 
        bytes.forEach((function(b) {
          self.writeByte(b);
        }));
      }, Writer.prototype.writeLength = function(len) {
        if ("number" != typeof len) throw new TypeError("argument must be a Number");
        if (this._ensure(4), len <= 127) this._buf[this._offset++] = len; else if (len <= 255) this._buf[this._offset++] = 129, 
        this._buf[this._offset++] = len; else if (len <= 65535) this._buf[this._offset++] = 130, 
        this._buf[this._offset++] = len >> 8, this._buf[this._offset++] = len; else {
          if (!(len <= 16777215)) throw newInvalidAsn1Error("Length too long (> 4 bytes)");
          this._buf[this._offset++] = 131, this._buf[this._offset++] = len >> 16, this._buf[this._offset++] = len >> 8, 
          this._buf[this._offset++] = len;
        }
      }, Writer.prototype.startSequence = function(tag) {
        "number" != typeof tag && (tag = ASN1.Sequence | ASN1.Constructor), this.writeByte(tag), 
        this._seq.push(this._offset), this._ensure(3), this._offset += 3;
      }, Writer.prototype.endSequence = function() {
        var seq = this._seq.pop(), start = seq + 3, len = this._offset - start;
        if (len <= 127) this._shift(start, len, -2), this._buf[seq] = len; else if (len <= 255) this._shift(start, len, -1), 
        this._buf[seq] = 129, this._buf[seq + 1] = len; else if (len <= 65535) this._buf[seq] = 130, 
        this._buf[seq + 1] = len >> 8, this._buf[seq + 2] = len; else {
          if (!(len <= 16777215)) throw newInvalidAsn1Error("Sequence too long");
          this._shift(start, len, 1), this._buf[seq] = 131, this._buf[seq + 1] = len >> 16, 
          this._buf[seq + 2] = len >> 8, this._buf[seq + 3] = len;
        }
      }, Writer.prototype._shift = function(start, len, shift) {
        assert.ok(void 0 !== start), assert.ok(void 0 !== len), assert.ok(shift), this._buf.copy(this._buf, start + shift, start, start + len), 
        this._offset += shift;
      }, Writer.prototype._ensure = function(len) {
        if (assert.ok(len), this._size - this._offset < len) {
          var sz = this._size * this._options.growthFactor;
          sz - this._offset < len && (sz += len);
          var buf = Buffer.alloc(sz);
          this._buf.copy(buf, 0, 0, this._offset), this._buf = buf, this._size = sz;
        }
      }, module.exports = Writer;
    },
    58814: (module, __unused_webpack_exports, __webpack_require__) => {
      var Ber = __webpack_require__(1487);
      module.exports = {
        Ber,
        BerReader: Ber.Reader,
        BerWriter: Ber.Writer
      };
    },
    2675: (module, __unused_webpack_exports, __webpack_require__) => {
      var assert = __webpack_require__(39491), Stream = __webpack_require__(12781).Stream, util = __webpack_require__(73837), UUID_REGEXP = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
      function _capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
      function _toss(name, expected, oper, arg, actual) {
        throw new assert.AssertionError({
          message: util.format("%s (%s) is required", name, expected),
          actual: void 0 === actual ? typeof arg : actual(arg),
          expected,
          operator: oper || "===",
          stackStartFunction: _toss.caller
        });
      }
      function _getClass(arg) {
        return Object.prototype.toString.call(arg).slice(8, -1);
      }
      function noop() {}
      var types = {
        bool: {
          check: function(arg) {
            return "boolean" == typeof arg;
          }
        },
        func: {
          check: function(arg) {
            return "function" == typeof arg;
          }
        },
        string: {
          check: function(arg) {
            return "string" == typeof arg;
          }
        },
        object: {
          check: function(arg) {
            return "object" == typeof arg && null !== arg;
          }
        },
        number: {
          check: function(arg) {
            return "number" == typeof arg && !isNaN(arg);
          }
        },
        finite: {
          check: function(arg) {
            return "number" == typeof arg && !isNaN(arg) && isFinite(arg);
          }
        },
        buffer: {
          check: function(arg) {
            return Buffer.isBuffer(arg);
          },
          operator: "Buffer.isBuffer"
        },
        array: {
          check: function(arg) {
            return Array.isArray(arg);
          },
          operator: "Array.isArray"
        },
        stream: {
          check: function(arg) {
            return arg instanceof Stream;
          },
          operator: "instanceof",
          actual: _getClass
        },
        date: {
          check: function(arg) {
            return arg instanceof Date;
          },
          operator: "instanceof",
          actual: _getClass
        },
        regexp: {
          check: function(arg) {
            return arg instanceof RegExp;
          },
          operator: "instanceof",
          actual: _getClass
        },
        uuid: {
          check: function(arg) {
            return "string" == typeof arg && UUID_REGEXP.test(arg);
          },
          operator: "isUUID"
        }
      };
      module.exports = function _setExports(ndebug) {
        var out, keys = Object.keys(types);
        return out = process.env.NODE_NDEBUG ? noop : function(arg, msg) {
          arg || _toss(msg, "true", arg);
        }, keys.forEach((function(k) {
          if (ndebug) out[k] = noop; else {
            var type = types[k];
            out[k] = function(arg, msg) {
              type.check(arg) || _toss(msg, k, type.operator, arg, type.actual);
            };
          }
        })), keys.forEach((function(k) {
          var name = "optional" + _capitalize(k);
          if (ndebug) out[name] = noop; else {
            var type = types[k];
            out[name] = function(arg, msg) {
              null != arg && (type.check(arg) || _toss(msg, k, type.operator, arg, type.actual));
            };
          }
        })), keys.forEach((function(k) {
          var name = "arrayOf" + _capitalize(k);
          if (ndebug) out[name] = noop; else {
            var type = types[k], expected = "[" + k + "]";
            out[name] = function(arg, msg) {
              var i;
              for (Array.isArray(arg) || _toss(msg, expected, type.operator, arg, type.actual), 
              i = 0; i < arg.length; i++) type.check(arg[i]) || _toss(msg, expected, type.operator, arg, type.actual);
            };
          }
        })), keys.forEach((function(k) {
          var name = "optionalArrayOf" + _capitalize(k);
          if (ndebug) out[name] = noop; else {
            var type = types[k], expected = "[" + k + "]";
            out[name] = function(arg, msg) {
              var i;
              if (null != arg) for (Array.isArray(arg) || _toss(msg, expected, type.operator, arg, type.actual), 
              i = 0; i < arg.length; i++) type.check(arg[i]) || _toss(msg, expected, type.operator, arg, type.actual);
            };
          }
        })), Object.keys(assert).forEach((function(k) {
          out[k] = "AssertionError" !== k && ndebug ? noop : assert[k];
        })), out._setExports = _setExports, out;
      }(process.env.NODE_NDEBUG);
    },
    12958: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var crypto_hash_sha512 = __webpack_require__(36046).lowlevel.crypto_hash, BLF_J = 0, Blowfish = function() {
        this.S = [ new Uint32Array([ 3509652390, 2564797868, 805139163, 3491422135, 3101798381, 1780907670, 3128725573, 4046225305, 614570311, 3012652279, 134345442, 2240740374, 1667834072, 1901547113, 2757295779, 4103290238, 227898511, 1921955416, 1904987480, 2182433518, 2069144605, 3260701109, 2620446009, 720527379, 3318853667, 677414384, 3393288472, 3101374703, 2390351024, 1614419982, 1822297739, 2954791486, 3608508353, 3174124327, 2024746970, 1432378464, 3864339955, 2857741204, 1464375394, 1676153920, 1439316330, 715854006, 3033291828, 289532110, 2706671279, 2087905683, 3018724369, 1668267050, 732546397, 1947742710, 3462151702, 2609353502, 2950085171, 1814351708, 2050118529, 680887927, 999245976, 1800124847, 3300911131, 1713906067, 1641548236, 4213287313, 1216130144, 1575780402, 4018429277, 3917837745, 3693486850, 3949271944, 596196993, 3549867205, 258830323, 2213823033, 772490370, 2760122372, 1774776394, 2652871518, 566650946, 4142492826, 1728879713, 2882767088, 1783734482, 3629395816, 2517608232, 2874225571, 1861159788, 326777828, 3124490320, 2130389656, 2716951837, 967770486, 1724537150, 2185432712, 2364442137, 1164943284, 2105845187, 998989502, 3765401048, 2244026483, 1075463327, 1455516326, 1322494562, 910128902, 469688178, 1117454909, 936433444, 3490320968, 3675253459, 1240580251, 122909385, 2157517691, 634681816, 4142456567, 3825094682, 3061402683, 2540495037, 79693498, 3249098678, 1084186820, 1583128258, 426386531, 1761308591, 1047286709, 322548459, 995290223, 1845252383, 2603652396, 3431023940, 2942221577, 3202600964, 3727903485, 1712269319, 422464435, 3234572375, 1170764815, 3523960633, 3117677531, 1434042557, 442511882, 3600875718, 1076654713, 1738483198, 4213154764, 2393238008, 3677496056, 1014306527, 4251020053, 793779912, 2902807211, 842905082, 4246964064, 1395751752, 1040244610, 2656851899, 3396308128, 445077038, 3742853595, 3577915638, 679411651, 2892444358, 2354009459, 1767581616, 3150600392, 3791627101, 3102740896, 284835224, 4246832056, 1258075500, 768725851, 2589189241, 3069724005, 3532540348, 1274779536, 3789419226, 2764799539, 1660621633, 3471099624, 4011903706, 913787905, 3497959166, 737222580, 2514213453, 2928710040, 3937242737, 1804850592, 3499020752, 2949064160, 2386320175, 2390070455, 2415321851, 4061277028, 2290661394, 2416832540, 1336762016, 1754252060, 3520065937, 3014181293, 791618072, 3188594551, 3933548030, 2332172193, 3852520463, 3043980520, 413987798, 3465142937, 3030929376, 4245938359, 2093235073, 3534596313, 375366246, 2157278981, 2479649556, 555357303, 3870105701, 2008414854, 3344188149, 4221384143, 3956125452, 2067696032, 3594591187, 2921233993, 2428461, 544322398, 577241275, 1471733935, 610547355, 4027169054, 1432588573, 1507829418, 2025931657, 3646575487, 545086370, 48609733, 2200306550, 1653985193, 298326376, 1316178497, 3007786442, 2064951626, 458293330, 2589141269, 3591329599, 3164325604, 727753846, 2179363840, 146436021, 1461446943, 4069977195, 705550613, 3059967265, 3887724982, 4281599278, 3313849956, 1404054877, 2845806497, 146425753, 1854211946 ]), new Uint32Array([ 1266315497, 3048417604, 3681880366, 3289982499, 290971e4, 1235738493, 2632868024, 2414719590, 3970600049, 1771706367, 1449415276, 3266420449, 422970021, 1963543593, 2690192192, 3826793022, 1062508698, 1531092325, 1804592342, 2583117782, 2714934279, 4024971509, 1294809318, 4028980673, 1289560198, 2221992742, 1669523910, 35572830, 157838143, 1052438473, 1016535060, 1802137761, 1753167236, 1386275462, 3080475397, 2857371447, 1040679964, 2145300060, 2390574316, 1461121720, 2956646967, 4031777805, 4028374788, 33600511, 2920084762, 1018524850, 629373528, 3691585981, 3515945977, 2091462646, 2486323059, 586499841, 988145025, 935516892, 3367335476, 2599673255, 2839830854, 265290510, 3972581182, 2759138881, 3795373465, 1005194799, 847297441, 406762289, 1314163512, 1332590856, 1866599683, 4127851711, 750260880, 613907577, 1450815602, 3165620655, 3734664991, 3650291728, 3012275730, 3704569646, 1427272223, 778793252, 1343938022, 2676280711, 2052605720, 1946737175, 3164576444, 3914038668, 3967478842, 3682934266, 1661551462, 3294938066, 4011595847, 840292616, 3712170807, 616741398, 312560963, 711312465, 1351876610, 322626781, 1910503582, 271666773, 2175563734, 1594956187, 70604529, 3617834859, 1007753275, 1495573769, 4069517037, 2549218298, 2663038764, 504708206, 2263041392, 3941167025, 2249088522, 1514023603, 1998579484, 1312622330, 694541497, 2582060303, 2151582166, 1382467621, 776784248, 2618340202, 3323268794, 2497899128, 2784771155, 503983604, 4076293799, 907881277, 423175695, 432175456, 1378068232, 4145222326, 3954048622, 3938656102, 3820766613, 2793130115, 2977904593, 26017576, 3274890735, 3194772133, 1700274565, 1756076034, 4006520079, 3677328699, 720338349, 1533947780, 354530856, 688349552, 3973924725, 1637815568, 332179504, 3949051286, 53804574, 2852348879, 3044236432, 1282449977, 3583942155, 3416972820, 4006381244, 1617046695, 2628476075, 3002303598, 1686838959, 431878346, 2686675385, 1700445008, 1080580658, 1009431731, 832498133, 3223435511, 2605976345, 2271191193, 2516031870, 1648197032, 4164389018, 2548247927, 300782431, 375919233, 238389289, 3353747414, 2531188641, 2019080857, 1475708069, 455242339, 2609103871, 448939670, 3451063019, 1395535956, 2413381860, 1841049896, 1491858159, 885456874, 4264095073, 4001119347, 1565136089, 3898914787, 1108368660, 540939232, 1173283510, 2745871338, 3681308437, 4207628240, 3343053890, 4016749493, 1699691293, 1103962373, 3625875870, 2256883143, 3830138730, 1031889488, 3479347698, 1535977030, 4236805024, 3251091107, 2132092099, 1774941330, 1199868427, 1452454533, 157007616, 2904115357, 342012276, 595725824, 1480756522, 206960106, 497939518, 591360097, 863170706, 2375253569, 3596610801, 1814182875, 2094937945, 3421402208, 1082520231, 3463918190, 2785509508, 435703966, 3908032597, 1641649973, 2842273706, 3305899714, 1510255612, 2148256476, 2655287854, 3276092548, 4258621189, 236887753, 3681803219, 274041037, 1734335097, 3815195456, 3317970021, 1899903192, 1026095262, 4050517792, 356393447, 2410691914, 3873677099, 3682840055 ]), new Uint32Array([ 3913112168, 2491498743, 4132185628, 2489919796, 1091903735, 1979897079, 3170134830, 3567386728, 3557303409, 857797738, 1136121015, 1342202287, 507115054, 2535736646, 337727348, 3213592640, 1301675037, 2528481711, 1895095763, 1721773893, 3216771564, 62756741, 2142006736, 835421444, 2531993523, 1442658625, 3659876326, 2882144922, 676362277, 1392781812, 170690266, 3921047035, 1759253602, 3611846912, 1745797284, 664899054, 1329594018, 3901205900, 3045908486, 2062866102, 2865634940, 3543621612, 3464012697, 1080764994, 553557557, 3656615353, 3996768171, 991055499, 499776247, 1265440854, 648242737, 3940784050, 980351604, 3713745714, 1749149687, 3396870395, 4211799374, 3640570775, 1161844396, 3125318951, 1431517754, 545492359, 4268468663, 3499529547, 1437099964, 2702547544, 3433638243, 2581715763, 2787789398, 1060185593, 1593081372, 2418618748, 4260947970, 69676912, 2159744348, 86519011, 2512459080, 3838209314, 1220612927, 3339683548, 133810670, 1090789135, 1078426020, 1569222167, 845107691, 3583754449, 4072456591, 1091646820, 628848692, 1613405280, 3757631651, 526609435, 236106946, 48312990, 2942717905, 3402727701, 1797494240, 859738849, 992217954, 4005476642, 2243076622, 3870952857, 3732016268, 765654824, 3490871365, 2511836413, 1685915746, 3888969200, 1414112111, 2273134842, 3281911079, 4080962846, 172450625, 2569994100, 980381355, 4109958455, 2819808352, 2716589560, 2568741196, 3681446669, 3329971472, 1835478071, 660984891, 3704678404, 4045999559, 3422617507, 3040415634, 1762651403, 1719377915, 3470491036, 2693910283, 3642056355, 3138596744, 1364962596, 2073328063, 1983633131, 926494387, 3423689081, 2150032023, 4096667949, 1749200295, 3328846651, 309677260, 2016342300, 1779581495, 3079819751, 111262694, 1274766160, 443224088, 298511866, 1025883608, 3806446537, 1145181785, 168956806, 3641502830, 3584813610, 1689216846, 3666258015, 3200248200, 1692713982, 2646376535, 4042768518, 1618508792, 1610833997, 3523052358, 4130873264, 2001055236, 3610705100, 2202168115, 4028541809, 2961195399, 1006657119, 2006996926, 3186142756, 1430667929, 3210227297, 1314452623, 4074634658, 4101304120, 2273951170, 1399257539, 3367210612, 3027628629, 1190975929, 2062231137, 2333990788, 2221543033, 2438960610, 1181637006, 548689776, 2362791313, 3372408396, 3104550113, 3145860560, 296247880, 1970579870, 3078560182, 3769228297, 1714227617, 3291629107, 3898220290, 166772364, 1251581989, 493813264, 448347421, 195405023, 2709975567, 677966185, 3703036547, 1463355134, 2715995803, 1338867538, 1343315457, 2802222074, 2684532164, 233230375, 2599980071, 2000651841, 3277868038, 1638401717, 4028070440, 3237316320, 6314154, 819756386, 300326615, 590932579, 1405279636, 3267499572, 3150704214, 2428286686, 3959192993, 3461946742, 1862657033, 1266418056, 963775037, 2089974820, 2263052895, 1917689273, 448879540, 3550394620, 3981727096, 150775221, 3627908307, 1303187396, 508620638, 2975983352, 2726630617, 1817252668, 1876281319, 1457606340, 908771278, 3720792119, 3617206836, 2455994898, 1729034894, 1080033504 ]), new Uint32Array([ 976866871, 3556439503, 2881648439, 1522871579, 1555064734, 1336096578, 3548522304, 2579274686, 3574697629, 3205460757, 3593280638, 3338716283, 3079412587, 564236357, 2993598910, 1781952180, 1464380207, 3163844217, 3332601554, 1699332808, 1393555694, 1183702653, 3581086237, 1288719814, 691649499, 2847557200, 2895455976, 3193889540, 2717570544, 1781354906, 1676643554, 2592534050, 3230253752, 1126444790, 2770207658, 2633158820, 2210423226, 2615765581, 2414155088, 3127139286, 673620729, 2805611233, 1269405062, 4015350505, 3341807571, 4149409754, 1057255273, 2012875353, 2162469141, 2276492801, 2601117357, 993977747, 3918593370, 2654263191, 753973209, 36408145, 2530585658, 25011837, 3520020182, 2088578344, 530523599, 2918365339, 1524020338, 1518925132, 3760827505, 3759777254, 1202760957, 3985898139, 3906192525, 674977740, 4174734889, 2031300136, 2019492241, 3983892565, 4153806404, 3822280332, 352677332, 2297720250, 60907813, 90501309, 3286998549, 1016092578, 2535922412, 2839152426, 457141659, 509813237, 4120667899, 652014361, 1966332200, 2975202805, 55981186, 2327461051, 676427537, 3255491064, 2882294119, 3433927263, 1307055953, 942726286, 933058658, 2468411793, 3933900994, 4215176142, 1361170020, 2001714738, 2830558078, 3274259782, 1222529897, 1679025792, 2729314320, 3714953764, 1770335741, 151462246, 3013232138, 1682292957, 1483529935, 471910574, 1539241949, 458788160, 3436315007, 1807016891, 3718408830, 978976581, 1043663428, 3165965781, 1927990952, 4200891579, 2372276910, 3208408903, 3533431907, 1412390302, 2931980059, 4132332400, 1947078029, 3881505623, 4168226417, 2941484381, 1077988104, 1320477388, 886195818, 18198404, 3786409e3, 2509781533, 112762804, 3463356488, 1866414978, 891333506, 18488651, 661792760, 1628790961, 3885187036, 3141171499, 876946877, 2693282273, 1372485963, 791857591, 2686433993, 3759982718, 3167212022, 3472953795, 2716379847, 445679433, 3561995674, 3504004811, 3574258232, 54117162, 3331405415, 2381918588, 3769707343, 4154350007, 1140177722, 4074052095, 668550556, 3214352940, 367459370, 261225585, 2610173221, 4209349473, 3468074219, 3265815641, 314222801, 3066103646, 3808782860, 282218597, 3406013506, 3773591054, 379116347, 1285071038, 846784868, 2669647154, 3771962079, 3550491691, 2305946142, 453669953, 1268987020, 3317592352, 3279303384, 3744833421, 2610507566, 3859509063, 266596637, 3847019092, 517658769, 3462560207, 3443424879, 370717030, 4247526661, 2224018117, 4143653529, 4112773975, 2788324899, 2477274417, 1456262402, 2901442914, 1517677493, 1846949527, 2295493580, 3734397586, 2176403920, 1280348187, 1908823572, 3871786941, 846861322, 1172426758, 3287448474, 3383383037, 1655181056, 3139813346, 901632758, 1897031941, 2986607138, 3066810236, 3447102507, 1393639104, 373351379, 950779232, 625454576, 3124240540, 4148612726, 2007998917, 544563296, 2244738638, 2330496472, 2058025392, 1291430526, 424198748, 50039436, 29584100, 3605783033, 2429876329, 2791104160, 1057563949, 3255363231, 3075367218, 3463963227, 1469046755, 985887462 ]) ], 
        this.P = new Uint32Array([ 608135816, 2242054355, 320440878, 57701188, 2752067618, 698298832, 137296536, 3964562569, 1160258022, 953160567, 3193202383, 887688300, 3232508343, 3380367581, 1065670069, 3041331479, 2450970073, 2306472731 ]);
      };
      function F(S, x8, i) {
        return (S[0][x8[i + 3]] + S[1][x8[i + 2]] ^ S[2][x8[i + 1]]) + S[3][x8[i]];
      }
      function stream2word(data, databytes) {
        var i, temp = 0;
        for (i = 0; i < 4; i++, BLF_J++) BLF_J >= databytes && (BLF_J = 0), temp = temp << 8 | data[BLF_J];
        return temp;
      }
      Blowfish.prototype.encipher = function(x, x8) {
        void 0 === x8 && (x8 = new Uint8Array(x.buffer), 0 !== x.byteOffset && (x8 = x8.subarray(x.byteOffset))), 
        x[0] ^= this.P[0];
        for (var i = 1; i < 16; i += 2) x[1] ^= F(this.S, x8, 0) ^ this.P[i], x[0] ^= F(this.S, x8, 4) ^ this.P[i + 1];
        var t = x[0];
        x[0] = x[1] ^ this.P[17], x[1] = t;
      }, Blowfish.prototype.decipher = function(x) {
        var x8 = new Uint8Array(x.buffer);
        0 !== x.byteOffset && (x8 = x8.subarray(x.byteOffset)), x[0] ^= this.P[17];
        for (var i = 16; i > 0; i -= 2) x[1] ^= F(this.S, x8, 0) ^ this.P[i], x[0] ^= F(this.S, x8, 4) ^ this.P[i - 1];
        var t = x[0];
        x[0] = x[1] ^ this.P[0], x[1] = t;
      }, Blowfish.prototype.expand0state = function(key, keybytes) {
        var i, k, d = new Uint32Array(2), d8 = new Uint8Array(d.buffer);
        for (i = 0, BLF_J = 0; i < 18; i++) this.P[i] ^= stream2word(key, keybytes);
        for (BLF_J = 0, i = 0; i < 18; i += 2) this.encipher(d, d8), this.P[i] = d[0], this.P[i + 1] = d[1];
        for (i = 0; i < 4; i++) for (k = 0; k < 256; k += 2) this.encipher(d, d8), this.S[i][k] = d[0], 
        this.S[i][k + 1] = d[1];
      }, Blowfish.prototype.expandstate = function(data, databytes, key, keybytes) {
        var i, k, d = new Uint32Array(2);
        for (i = 0, BLF_J = 0; i < 18; i++) this.P[i] ^= stream2word(key, keybytes);
        for (i = 0, BLF_J = 0; i < 18; i += 2) d[0] ^= stream2word(data, databytes), d[1] ^= stream2word(data, databytes), 
        this.encipher(d), this.P[i] = d[0], this.P[i + 1] = d[1];
        for (i = 0; i < 4; i++) for (k = 0; k < 256; k += 2) d[0] ^= stream2word(data, databytes), 
        d[1] ^= stream2word(data, databytes), this.encipher(d), this.S[i][k] = d[0], this.S[i][k + 1] = d[1];
        BLF_J = 0;
      }, Blowfish.prototype.enc = function(data, blocks) {
        for (var i = 0; i < blocks; i++) this.encipher(data.subarray(2 * i));
      }, Blowfish.prototype.dec = function(data, blocks) {
        for (var i = 0; i < blocks; i++) this.decipher(data.subarray(2 * i));
      };
      function bcrypt_hash(sha2pass, sha2salt, out) {
        var i, state = new Blowfish, cdata = new Uint32Array(8), ciphertext = new Uint8Array([ 79, 120, 121, 99, 104, 114, 111, 109, 97, 116, 105, 99, 66, 108, 111, 119, 102, 105, 115, 104, 83, 119, 97, 116, 68, 121, 110, 97, 109, 105, 116, 101 ]);
        for (state.expandstate(sha2salt, 64, sha2pass, 64), i = 0; i < 64; i++) state.expand0state(sha2salt, 64), 
        state.expand0state(sha2pass, 64);
        for (i = 0; i < 8; i++) cdata[i] = stream2word(ciphertext, ciphertext.byteLength);
        for (i = 0; i < 64; i++) state.enc(cdata, cdata.byteLength / 8);
        for (i = 0; i < 8; i++) out[4 * i + 3] = cdata[i] >>> 24, out[4 * i + 2] = cdata[i] >>> 16, 
        out[4 * i + 1] = cdata[i] >>> 8, out[4 * i + 0] = cdata[i];
      }
      module.exports = {
        BLOCKS: 8,
        HASHSIZE: 32,
        hash: bcrypt_hash,
        pbkdf: function(pass, passlen, salt, saltlen, key, keylen, rounds) {
          var i, j, amt, stride, dest, count, sha2pass = new Uint8Array(64), sha2salt = new Uint8Array(64), out = new Uint8Array(32), tmpout = new Uint8Array(32), countsalt = new Uint8Array(saltlen + 4), origkeylen = keylen;
          if (rounds < 1) return -1;
          if (0 === passlen || 0 === saltlen || 0 === keylen || keylen > out.byteLength * out.byteLength || saltlen > 1 << 20) return -1;
          for (stride = Math.floor((keylen + out.byteLength - 1) / out.byteLength), amt = Math.floor((keylen + stride - 1) / stride), 
          i = 0; i < saltlen; i++) countsalt[i] = salt[i];
          for (crypto_hash_sha512(sha2pass, pass, passlen), count = 1; keylen > 0; count++) {
            for (countsalt[saltlen + 0] = count >>> 24, countsalt[saltlen + 1] = count >>> 16, 
            countsalt[saltlen + 2] = count >>> 8, countsalt[saltlen + 3] = count, crypto_hash_sha512(sha2salt, countsalt, saltlen + 4), 
            bcrypt_hash(sha2pass, sha2salt, tmpout), i = out.byteLength; i--; ) out[i] = tmpout[i];
            for (i = 1; i < rounds; i++) for (crypto_hash_sha512(sha2salt, tmpout, tmpout.byteLength), 
            bcrypt_hash(sha2pass, sha2salt, tmpout), j = 0; j < out.byteLength; j++) out[j] ^= tmpout[j];
            for (amt = Math.min(amt, keylen), i = 0; i < amt && !((dest = i * stride + (count - 1)) >= origkeylen); i++) key[dest] = out[i];
            keylen -= i;
          }
          return 0;
        }
      };
    },
    97660: (module, __unused_webpack_exports, __webpack_require__) => {
      var BigInteger = __webpack_require__(32630).BigInteger, Barrett = BigInteger.prototype.Barrett;
      function ECFieldElementFp(q, x) {
        this.x = x, this.q = q;
      }
      function ECPointFp(curve, x, y, z) {
        this.curve = curve, this.x = x, this.y = y, this.z = null == z ? BigInteger.ONE : z, 
        this.zinv = null;
      }
      function ECCurveFp(q, a, b) {
        this.q = q, this.a = this.fromBigInteger(a), this.b = this.fromBigInteger(b), this.infinity = new ECPointFp(this, null, null), 
        this.reducer = new Barrett(this.q);
      }
      ECFieldElementFp.prototype.equals = function(other) {
        return other == this || this.q.equals(other.q) && this.x.equals(other.x);
      }, ECFieldElementFp.prototype.toBigInteger = function() {
        return this.x;
      }, ECFieldElementFp.prototype.negate = function() {
        return new ECFieldElementFp(this.q, this.x.negate().mod(this.q));
      }, ECFieldElementFp.prototype.add = function(b) {
        return new ECFieldElementFp(this.q, this.x.add(b.toBigInteger()).mod(this.q));
      }, ECFieldElementFp.prototype.subtract = function(b) {
        return new ECFieldElementFp(this.q, this.x.subtract(b.toBigInteger()).mod(this.q));
      }, ECFieldElementFp.prototype.multiply = function(b) {
        return new ECFieldElementFp(this.q, this.x.multiply(b.toBigInteger()).mod(this.q));
      }, ECFieldElementFp.prototype.square = function() {
        return new ECFieldElementFp(this.q, this.x.square().mod(this.q));
      }, ECFieldElementFp.prototype.divide = function(b) {
        return new ECFieldElementFp(this.q, this.x.multiply(b.toBigInteger().modInverse(this.q)).mod(this.q));
      }, ECPointFp.prototype.getX = function() {
        null == this.zinv && (this.zinv = this.z.modInverse(this.curve.q));
        var r = this.x.toBigInteger().multiply(this.zinv);
        return this.curve.reduce(r), this.curve.fromBigInteger(r);
      }, ECPointFp.prototype.getY = function() {
        null == this.zinv && (this.zinv = this.z.modInverse(this.curve.q));
        var r = this.y.toBigInteger().multiply(this.zinv);
        return this.curve.reduce(r), this.curve.fromBigInteger(r);
      }, ECPointFp.prototype.equals = function(other) {
        return other == this || (this.isInfinity() ? other.isInfinity() : other.isInfinity() ? this.isInfinity() : !!other.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(other.z)).mod(this.curve.q).equals(BigInteger.ZERO) && other.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(other.z)).mod(this.curve.q).equals(BigInteger.ZERO));
      }, ECPointFp.prototype.isInfinity = function() {
        return null == this.x && null == this.y || this.z.equals(BigInteger.ZERO) && !this.y.toBigInteger().equals(BigInteger.ZERO);
      }, ECPointFp.prototype.negate = function() {
        return new ECPointFp(this.curve, this.x, this.y.negate(), this.z);
      }, ECPointFp.prototype.add = function(b) {
        if (this.isInfinity()) return b;
        if (b.isInfinity()) return this;
        var u = b.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(b.z)).mod(this.curve.q), v = b.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(b.z)).mod(this.curve.q);
        if (BigInteger.ZERO.equals(v)) return BigInteger.ZERO.equals(u) ? this.twice() : this.curve.getInfinity();
        var THREE = new BigInteger("3"), x1 = this.x.toBigInteger(), y1 = this.y.toBigInteger(), v2 = (b.x.toBigInteger(), 
        b.y.toBigInteger(), v.square()), v3 = v2.multiply(v), x1v2 = x1.multiply(v2), zu2 = u.square().multiply(this.z), x3 = zu2.subtract(x1v2.shiftLeft(1)).multiply(b.z).subtract(v3).multiply(v).mod(this.curve.q), y3 = x1v2.multiply(THREE).multiply(u).subtract(y1.multiply(v3)).subtract(zu2.multiply(u)).multiply(b.z).add(u.multiply(v3)).mod(this.curve.q), z3 = v3.multiply(this.z).multiply(b.z).mod(this.curve.q);
        return new ECPointFp(this.curve, this.curve.fromBigInteger(x3), this.curve.fromBigInteger(y3), z3);
      }, ECPointFp.prototype.twice = function() {
        if (this.isInfinity()) return this;
        if (0 == this.y.toBigInteger().signum()) return this.curve.getInfinity();
        var THREE = new BigInteger("3"), x1 = this.x.toBigInteger(), y1 = this.y.toBigInteger(), y1z1 = y1.multiply(this.z), y1sqz1 = y1z1.multiply(y1).mod(this.curve.q), a = this.curve.a.toBigInteger(), w = x1.square().multiply(THREE);
        BigInteger.ZERO.equals(a) || (w = w.add(this.z.square().multiply(a)));
        var x3 = (w = w.mod(this.curve.q)).square().subtract(x1.shiftLeft(3).multiply(y1sqz1)).shiftLeft(1).multiply(y1z1).mod(this.curve.q), y3 = w.multiply(THREE).multiply(x1).subtract(y1sqz1.shiftLeft(1)).shiftLeft(2).multiply(y1sqz1).subtract(w.square().multiply(w)).mod(this.curve.q), z3 = y1z1.square().multiply(y1z1).shiftLeft(3).mod(this.curve.q);
        return new ECPointFp(this.curve, this.curve.fromBigInteger(x3), this.curve.fromBigInteger(y3), z3);
      }, ECPointFp.prototype.multiply = function(k) {
        if (this.isInfinity()) return this;
        if (0 == k.signum()) return this.curve.getInfinity();
        var i, e = k, h = e.multiply(new BigInteger("3")), neg = this.negate(), R = this;
        for (i = h.bitLength() - 2; i > 0; --i) {
          R = R.twice();
          var hBit = h.testBit(i);
          hBit != e.testBit(i) && (R = R.add(hBit ? this : neg));
        }
        return R;
      }, ECPointFp.prototype.multiplyTwo = function(j, x, k) {
        var i;
        i = j.bitLength() > k.bitLength() ? j.bitLength() - 1 : k.bitLength() - 1;
        for (var R = this.curve.getInfinity(), both = this.add(x); i >= 0; ) R = R.twice(), 
        j.testBit(i) ? R = k.testBit(i) ? R.add(both) : R.add(this) : k.testBit(i) && (R = R.add(x)), 
        --i;
        return R;
      }, ECCurveFp.prototype.getQ = function() {
        return this.q;
      }, ECCurveFp.prototype.getA = function() {
        return this.a;
      }, ECCurveFp.prototype.getB = function() {
        return this.b;
      }, ECCurveFp.prototype.equals = function(other) {
        return other == this || this.q.equals(other.q) && this.a.equals(other.a) && this.b.equals(other.b);
      }, ECCurveFp.prototype.getInfinity = function() {
        return this.infinity;
      }, ECCurveFp.prototype.fromBigInteger = function(x) {
        return new ECFieldElementFp(this.q, x);
      }, ECCurveFp.prototype.reduce = function(x) {
        this.reducer.reduce(x);
      }, ECCurveFp.prototype.encodePointHex = function(p) {
        if (p.isInfinity()) return "00";
        var xHex = p.getX().toBigInteger().toString(16), yHex = p.getY().toBigInteger().toString(16), oLen = this.getQ().toString(16).length;
        for (oLen % 2 != 0 && oLen++; xHex.length < oLen; ) xHex = "0" + xHex;
        for (;yHex.length < oLen; ) yHex = "0" + yHex;
        return "04" + xHex + yHex;
      }, ECCurveFp.prototype.decodePointHex = function(s) {
        var yIsEven;
        switch (parseInt(s.substr(0, 2), 16)) {
         case 0:
          return this.infinity;

         case 2:
          yIsEven = !1;

         case 3:
          null == yIsEven && (yIsEven = !0);
          var len = s.length - 2, xHex = s.substr(2, len), x = this.fromBigInteger(new BigInteger(xHex, 16)), beta = x.multiply(x.square().add(this.getA())).add(this.getB()).sqrt();
          if (null == beta) throw "Invalid point compression";
          var betaValue = beta.toBigInteger();
          return betaValue.testBit(0) != yIsEven && (beta = this.fromBigInteger(this.getQ().subtract(betaValue))), 
          new ECPointFp(this, x, beta);

         case 4:
         case 6:
         case 7:
          len = (s.length - 2) / 2, xHex = s.substr(2, len);
          var yHex = s.substr(len + 2, len);
          return new ECPointFp(this, this.fromBigInteger(new BigInteger(xHex, 16)), this.fromBigInteger(new BigInteger(yHex, 16)));

         default:
          return null;
        }
      }, ECCurveFp.prototype.encodeCompressedPointHex = function(p) {
        if (p.isInfinity()) return "00";
        var xHex = p.getX().toBigInteger().toString(16), oLen = this.getQ().toString(16).length;
        for (oLen % 2 != 0 && oLen++; xHex.length < oLen; ) xHex = "0" + xHex;
        return (p.getY().toBigInteger().isEven() ? "02" : "03") + xHex;
      }, ECFieldElementFp.prototype.getR = function() {
        if (null != this.r) return this.r;
        this.r = null;
        var bitLength = this.q.bitLength();
        bitLength > 128 && (-1 == this.q.shiftRight(bitLength - 64).intValue() && (this.r = BigInteger.ONE.shiftLeft(bitLength).subtract(this.q)));
        return this.r;
      }, ECFieldElementFp.prototype.modMult = function(x1, x2) {
        return this.modReduce(x1.multiply(x2));
      }, ECFieldElementFp.prototype.modReduce = function(x) {
        if (null != this.getR()) {
          for (var qLen = q.bitLength(); x.bitLength() > qLen + 1; ) {
            var u = x.shiftRight(qLen), v = x.subtract(u.shiftLeft(qLen));
            this.getR().equals(BigInteger.ONE) || (u = u.multiply(this.getR())), x = u.add(v);
          }
          for (;x.compareTo(q) >= 0; ) x = x.subtract(q);
        } else x = x.mod(q);
        return x;
      }, ECFieldElementFp.prototype.sqrt = function() {
        if (!this.q.testBit(0)) throw "unsupported";
        if (this.q.testBit(1)) {
          var z = new ECFieldElementFp(this.q, this.x.modPow(this.q.shiftRight(2).add(BigInteger.ONE), this.q));
          return z.square().equals(this) ? z : null;
        }
        var qMinusOne = this.q.subtract(BigInteger.ONE), legendreExponent = qMinusOne.shiftRight(1);
        if (!this.x.modPow(legendreExponent, this.q).equals(BigInteger.ONE)) return null;
        var U, V, k = qMinusOne.shiftRight(2).shiftLeft(1).add(BigInteger.ONE), Q = this.x, fourQ = modDouble(modDouble(Q));
        do {
          var P;
          do {
            P = new BigInteger(this.q.bitLength(), new SecureRandom);
          } while (P.compareTo(this.q) >= 0 || !P.multiply(P).subtract(fourQ).modPow(legendreExponent, this.q).equals(qMinusOne));
          var result = this.lucasSequence(P, Q, k);
          if (U = result[0], V = result[1], this.modMult(V, V).equals(fourQ)) return V.testBit(0) && (V = V.add(q)), 
          V = V.shiftRight(1), new ECFieldElementFp(q, V);
        } while (U.equals(BigInteger.ONE) || U.equals(qMinusOne));
        return null;
      }, ECFieldElementFp.prototype.lucasSequence = function(P, Q, k) {
        for (var n = k.bitLength(), s = k.getLowestSetBit(), Uh = BigInteger.ONE, Vl = BigInteger.TWO, Vh = P, Ql = BigInteger.ONE, Qh = BigInteger.ONE, j = n - 1; j >= s + 1; --j) Ql = this.modMult(Ql, Qh), 
        k.testBit(j) ? (Qh = this.modMult(Ql, Q), Uh = this.modMult(Uh, Vh), Vl = this.modReduce(Vh.multiply(Vl).subtract(P.multiply(Ql))), 
        Vh = this.modReduce(Vh.multiply(Vh).subtract(Qh.shiftLeft(1)))) : (Qh = Ql, Uh = this.modReduce(Uh.multiply(Vl).subtract(Ql)), 
        Vh = this.modReduce(Vh.multiply(Vl).subtract(P.multiply(Ql))), Vl = this.modReduce(Vl.multiply(Vl).subtract(Ql.shiftLeft(1))));
        Ql = this.modMult(Ql, Qh), Qh = this.modMult(Ql, Q), Uh = this.modReduce(Uh.multiply(Vl).subtract(Ql)), 
        Vl = this.modReduce(Vh.multiply(Vl).subtract(P.multiply(Ql))), Ql = this.modMult(Ql, Qh);
        for (j = 1; j <= s; ++j) Uh = this.modMult(Uh, Vl), Vl = this.modReduce(Vl.multiply(Vl).subtract(Ql.shiftLeft(1))), 
        Ql = this.modMult(Ql, Ql);
        return [ Uh, Vl ];
      };
      var exports = {
        ECCurveFp,
        ECPointFp,
        ECFieldElementFp
      };
      module.exports = exports;
    },
    6226: (module, __unused_webpack_exports, __webpack_require__) => {
      var BigInteger = __webpack_require__(32630).BigInteger, ECCurveFp = __webpack_require__(97660).ECCurveFp;
      function X9ECParameters(curve, g, n, h) {
        this.curve = curve, this.g = g, this.n = n, this.h = h;
      }
      function fromHex(s) {
        return new BigInteger(s, 16);
      }
      function secp128r1() {
        var p = fromHex("FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFF"), a = fromHex("FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFC"), b = fromHex("E87579C11079F43DD824993C2CEE5ED3"), n = fromHex("FFFFFFFE0000000075A30D1B9038A115"), h = BigInteger.ONE, curve = new ECCurveFp(p, a, b), G = curve.decodePointHex("04161FF7528B899B2D0C28607CA52C5B86CF5AC8395BAFEB13C02DA292DDED7A83");
        return new X9ECParameters(curve, G, n, h);
      }
      function secp160k1() {
        var p = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFAC73"), a = BigInteger.ZERO, b = fromHex("7"), n = fromHex("0100000000000000000001B8FA16DFAB9ACA16B6B3"), h = BigInteger.ONE, curve = new ECCurveFp(p, a, b), G = curve.decodePointHex("043B4C382CE37AA192A4019E763036F4F5DD4D7EBB938CF935318FDCED6BC28286531733C3F03C4FEE");
        return new X9ECParameters(curve, G, n, h);
      }
      function secp160r1() {
        var p = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFF"), a = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFC"), b = fromHex("1C97BEFC54BD7A8B65ACF89F81D4D4ADC565FA45"), n = fromHex("0100000000000000000001F4C8F927AED3CA752257"), h = BigInteger.ONE, curve = new ECCurveFp(p, a, b), G = curve.decodePointHex("044A96B5688EF573284664698968C38BB913CBFC8223A628553168947D59DCC912042351377AC5FB32");
        return new X9ECParameters(curve, G, n, h);
      }
      function secp192k1() {
        var p = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFEE37"), a = BigInteger.ZERO, b = fromHex("3"), n = fromHex("FFFFFFFFFFFFFFFFFFFFFFFE26F2FC170F69466A74DEFD8D"), h = BigInteger.ONE, curve = new ECCurveFp(p, a, b), G = curve.decodePointHex("04DB4FF10EC057E9AE26B07D0280B7F4341DA5D1B1EAE06C7D9B2F2F6D9C5628A7844163D015BE86344082AA88D95E2F9D");
        return new X9ECParameters(curve, G, n, h);
      }
      function secp192r1() {
        var p = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFF"), a = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFC"), b = fromHex("64210519E59C80E70FA7E9AB72243049FEB8DEECC146B9B1"), n = fromHex("FFFFFFFFFFFFFFFFFFFFFFFF99DEF836146BC9B1B4D22831"), h = BigInteger.ONE, curve = new ECCurveFp(p, a, b), G = curve.decodePointHex("04188DA80EB03090F67CBF20EB43A18800F4FF0AFD82FF101207192B95FFC8DA78631011ED6B24CDD573F977A11E794811");
        return new X9ECParameters(curve, G, n, h);
      }
      function secp224r1() {
        var p = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000001"), a = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFE"), b = fromHex("B4050A850C04B3ABF54132565044B0B7D7BFD8BA270B39432355FFB4"), n = fromHex("FFFFFFFFFFFFFFFFFFFFFFFFFFFF16A2E0B8F03E13DD29455C5C2A3D"), h = BigInteger.ONE, curve = new ECCurveFp(p, a, b), G = curve.decodePointHex("04B70E0CBD6BB4BF7F321390B94A03C1D356C21122343280D6115C1D21BD376388B5F723FB4C22DFE6CD4375A05A07476444D5819985007E34");
        return new X9ECParameters(curve, G, n, h);
      }
      function secp256r1() {
        var p = fromHex("FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF"), a = fromHex("FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC"), b = fromHex("5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B"), n = fromHex("FFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551"), h = BigInteger.ONE, curve = new ECCurveFp(p, a, b), G = curve.decodePointHex("046B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C2964FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5");
        return new X9ECParameters(curve, G, n, h);
      }
      X9ECParameters.prototype.getCurve = function() {
        return this.curve;
      }, X9ECParameters.prototype.getG = function() {
        return this.g;
      }, X9ECParameters.prototype.getN = function() {
        return this.n;
      }, X9ECParameters.prototype.getH = function() {
        return this.h;
      }, module.exports = {
        secp128r1,
        secp160k1,
        secp160r1,
        secp192k1,
        secp192r1,
        secp224r1,
        secp256r1
      };
    },
    32630: function(module, exports) {
      (function() {
        var dbits;
        function BigInteger(a, b, c) {
          null != a && ("number" == typeof a ? this.fromNumber(a, b, c) : null == b && "string" != typeof a ? this.fromString(a, 256) : this.fromString(a, b));
        }
        function nbi() {
          return new BigInteger(null);
        }
        var inBrowser = "undefined" != typeof navigator;
        inBrowser && "Microsoft Internet Explorer" == navigator.appName ? (BigInteger.prototype.am = function(i, x, w, j, c, n) {
          for (var xl = 32767 & x, xh = x >> 15; --n >= 0; ) {
            var l = 32767 & this[i], h = this[i++] >> 15, m = xh * l + h * xl;
            c = ((l = xl * l + ((32767 & m) << 15) + w[j] + (1073741823 & c)) >>> 30) + (m >>> 15) + xh * h + (c >>> 30), 
            w[j++] = 1073741823 & l;
          }
          return c;
        }, dbits = 30) : inBrowser && "Netscape" != navigator.appName ? (BigInteger.prototype.am = function(i, x, w, j, c, n) {
          for (;--n >= 0; ) {
            var v = x * this[i++] + w[j] + c;
            c = Math.floor(v / 67108864), w[j++] = 67108863 & v;
          }
          return c;
        }, dbits = 26) : (BigInteger.prototype.am = function(i, x, w, j, c, n) {
          for (var xl = 16383 & x, xh = x >> 14; --n >= 0; ) {
            var l = 16383 & this[i], h = this[i++] >> 14, m = xh * l + h * xl;
            c = ((l = xl * l + ((16383 & m) << 14) + w[j] + c) >> 28) + (m >> 14) + xh * h, 
            w[j++] = 268435455 & l;
          }
          return c;
        }, dbits = 28), BigInteger.prototype.DB = dbits, BigInteger.prototype.DM = (1 << dbits) - 1, 
        BigInteger.prototype.DV = 1 << dbits;
        BigInteger.prototype.FV = Math.pow(2, 52), BigInteger.prototype.F1 = 52 - dbits, 
        BigInteger.prototype.F2 = 2 * dbits - 52;
        var rr, vv, BI_RC = new Array;
        for (rr = "0".charCodeAt(0), vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
        for (rr = "a".charCodeAt(0), vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
        for (rr = "A".charCodeAt(0), vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
        function int2char(n) {
          return "0123456789abcdefghijklmnopqrstuvwxyz".charAt(n);
        }
        function intAt(s, i) {
          var c = BI_RC[s.charCodeAt(i)];
          return null == c ? -1 : c;
        }
        function nbv(i) {
          var r = nbi();
          return r.fromInt(i), r;
        }
        function nbits(x) {
          var t, r = 1;
          return 0 != (t = x >>> 16) && (x = t, r += 16), 0 != (t = x >> 8) && (x = t, r += 8), 
          0 != (t = x >> 4) && (x = t, r += 4), 0 != (t = x >> 2) && (x = t, r += 2), 0 != (t = x >> 1) && (x = t, 
          r += 1), r;
        }
        function Classic(m) {
          this.m = m;
        }
        function Montgomery(m) {
          this.m = m, this.mp = m.invDigit(), this.mpl = 32767 & this.mp, this.mph = this.mp >> 15, 
          this.um = (1 << m.DB - 15) - 1, this.mt2 = 2 * m.t;
        }
        function op_and(x, y) {
          return x & y;
        }
        function op_or(x, y) {
          return x | y;
        }
        function op_xor(x, y) {
          return x ^ y;
        }
        function op_andnot(x, y) {
          return x & ~y;
        }
        function lbit(x) {
          if (0 == x) return -1;
          var r = 0;
          return 0 == (65535 & x) && (x >>= 16, r += 16), 0 == (255 & x) && (x >>= 8, r += 8), 
          0 == (15 & x) && (x >>= 4, r += 4), 0 == (3 & x) && (x >>= 2, r += 2), 0 == (1 & x) && ++r, 
          r;
        }
        function cbit(x) {
          for (var r = 0; 0 != x; ) x &= x - 1, ++r;
          return r;
        }
        function NullExp() {}
        function nNop(x) {
          return x;
        }
        function Barrett(m) {
          this.r2 = nbi(), this.q3 = nbi(), BigInteger.ONE.dlShiftTo(2 * m.t, this.r2), this.mu = this.r2.divide(m), 
          this.m = m;
        }
        Classic.prototype.convert = function(x) {
          return x.s < 0 || x.compareTo(this.m) >= 0 ? x.mod(this.m) : x;
        }, Classic.prototype.revert = function(x) {
          return x;
        }, Classic.prototype.reduce = function(x) {
          x.divRemTo(this.m, null, x);
        }, Classic.prototype.mulTo = function(x, y, r) {
          x.multiplyTo(y, r), this.reduce(r);
        }, Classic.prototype.sqrTo = function(x, r) {
          x.squareTo(r), this.reduce(r);
        }, Montgomery.prototype.convert = function(x) {
          var r = nbi();
          return x.abs().dlShiftTo(this.m.t, r), r.divRemTo(this.m, null, r), x.s < 0 && r.compareTo(BigInteger.ZERO) > 0 && this.m.subTo(r, r), 
          r;
        }, Montgomery.prototype.revert = function(x) {
          var r = nbi();
          return x.copyTo(r), this.reduce(r), r;
        }, Montgomery.prototype.reduce = function(x) {
          for (;x.t <= this.mt2; ) x[x.t++] = 0;
          for (var i = 0; i < this.m.t; ++i) {
            var j = 32767 & x[i], u0 = j * this.mpl + ((j * this.mph + (x[i] >> 15) * this.mpl & this.um) << 15) & x.DM;
            for (x[j = i + this.m.t] += this.m.am(0, u0, x, i, 0, this.m.t); x[j] >= x.DV; ) x[j] -= x.DV, 
            x[++j]++;
          }
          x.clamp(), x.drShiftTo(this.m.t, x), x.compareTo(this.m) >= 0 && x.subTo(this.m, x);
        }, Montgomery.prototype.mulTo = function(x, y, r) {
          x.multiplyTo(y, r), this.reduce(r);
        }, Montgomery.prototype.sqrTo = function(x, r) {
          x.squareTo(r), this.reduce(r);
        }, BigInteger.prototype.copyTo = function(r) {
          for (var i = this.t - 1; i >= 0; --i) r[i] = this[i];
          r.t = this.t, r.s = this.s;
        }, BigInteger.prototype.fromInt = function(x) {
          this.t = 1, this.s = x < 0 ? -1 : 0, x > 0 ? this[0] = x : x < -1 ? this[0] = x + this.DV : this.t = 0;
        }, BigInteger.prototype.fromString = function(s, b) {
          var k;
          if (16 == b) k = 4; else if (8 == b) k = 3; else if (256 == b) k = 8; else if (2 == b) k = 1; else if (32 == b) k = 5; else {
            if (4 != b) return void this.fromRadix(s, b);
            k = 2;
          }
          this.t = 0, this.s = 0;
          for (var i = s.length, mi = !1, sh = 0; --i >= 0; ) {
            var x = 8 == k ? 255 & s[i] : intAt(s, i);
            x < 0 ? "-" == s.charAt(i) && (mi = !0) : (mi = !1, 0 == sh ? this[this.t++] = x : sh + k > this.DB ? (this[this.t - 1] |= (x & (1 << this.DB - sh) - 1) << sh, 
            this[this.t++] = x >> this.DB - sh) : this[this.t - 1] |= x << sh, (sh += k) >= this.DB && (sh -= this.DB));
          }
          8 == k && 0 != (128 & s[0]) && (this.s = -1, sh > 0 && (this[this.t - 1] |= (1 << this.DB - sh) - 1 << sh)), 
          this.clamp(), mi && BigInteger.ZERO.subTo(this, this);
        }, BigInteger.prototype.clamp = function() {
          for (var c = this.s & this.DM; this.t > 0 && this[this.t - 1] == c; ) --this.t;
        }, BigInteger.prototype.dlShiftTo = function(n, r) {
          var i;
          for (i = this.t - 1; i >= 0; --i) r[i + n] = this[i];
          for (i = n - 1; i >= 0; --i) r[i] = 0;
          r.t = this.t + n, r.s = this.s;
        }, BigInteger.prototype.drShiftTo = function(n, r) {
          for (var i = n; i < this.t; ++i) r[i - n] = this[i];
          r.t = Math.max(this.t - n, 0), r.s = this.s;
        }, BigInteger.prototype.lShiftTo = function(n, r) {
          var i, bs = n % this.DB, cbs = this.DB - bs, bm = (1 << cbs) - 1, ds = Math.floor(n / this.DB), c = this.s << bs & this.DM;
          for (i = this.t - 1; i >= 0; --i) r[i + ds + 1] = this[i] >> cbs | c, c = (this[i] & bm) << bs;
          for (i = ds - 1; i >= 0; --i) r[i] = 0;
          r[ds] = c, r.t = this.t + ds + 1, r.s = this.s, r.clamp();
        }, BigInteger.prototype.rShiftTo = function(n, r) {
          r.s = this.s;
          var ds = Math.floor(n / this.DB);
          if (ds >= this.t) r.t = 0; else {
            var bs = n % this.DB, cbs = this.DB - bs, bm = (1 << bs) - 1;
            r[0] = this[ds] >> bs;
            for (var i = ds + 1; i < this.t; ++i) r[i - ds - 1] |= (this[i] & bm) << cbs, r[i - ds] = this[i] >> bs;
            bs > 0 && (r[this.t - ds - 1] |= (this.s & bm) << cbs), r.t = this.t - ds, r.clamp();
          }
        }, BigInteger.prototype.subTo = function(a, r) {
          for (var i = 0, c = 0, m = Math.min(a.t, this.t); i < m; ) c += this[i] - a[i], 
          r[i++] = c & this.DM, c >>= this.DB;
          if (a.t < this.t) {
            for (c -= a.s; i < this.t; ) c += this[i], r[i++] = c & this.DM, c >>= this.DB;
            c += this.s;
          } else {
            for (c += this.s; i < a.t; ) c -= a[i], r[i++] = c & this.DM, c >>= this.DB;
            c -= a.s;
          }
          r.s = c < 0 ? -1 : 0, c < -1 ? r[i++] = this.DV + c : c > 0 && (r[i++] = c), r.t = i, 
          r.clamp();
        }, BigInteger.prototype.multiplyTo = function(a, r) {
          var x = this.abs(), y = a.abs(), i = x.t;
          for (r.t = i + y.t; --i >= 0; ) r[i] = 0;
          for (i = 0; i < y.t; ++i) r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
          r.s = 0, r.clamp(), this.s != a.s && BigInteger.ZERO.subTo(r, r);
        }, BigInteger.prototype.squareTo = function(r) {
          for (var x = this.abs(), i = r.t = 2 * x.t; --i >= 0; ) r[i] = 0;
          for (i = 0; i < x.t - 1; ++i) {
            var c = x.am(i, x[i], r, 2 * i, 0, 1);
            (r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV && (r[i + x.t] -= x.DV, 
            r[i + x.t + 1] = 1);
          }
          r.t > 0 && (r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1)), r.s = 0, r.clamp();
        }, BigInteger.prototype.divRemTo = function(m, q, r) {
          var pm = m.abs();
          if (!(pm.t <= 0)) {
            var pt = this.abs();
            if (pt.t < pm.t) return null != q && q.fromInt(0), void (null != r && this.copyTo(r));
            null == r && (r = nbi());
            var y = nbi(), ts = this.s, ms = m.s, nsh = this.DB - nbits(pm[pm.t - 1]);
            nsh > 0 ? (pm.lShiftTo(nsh, y), pt.lShiftTo(nsh, r)) : (pm.copyTo(y), pt.copyTo(r));
            var ys = y.t, y0 = y[ys - 1];
            if (0 != y0) {
              var yt = y0 * (1 << this.F1) + (ys > 1 ? y[ys - 2] >> this.F2 : 0), d1 = this.FV / yt, d2 = (1 << this.F1) / yt, e = 1 << this.F2, i = r.t, j = i - ys, t = null == q ? nbi() : q;
              for (y.dlShiftTo(j, t), r.compareTo(t) >= 0 && (r[r.t++] = 1, r.subTo(t, r)), BigInteger.ONE.dlShiftTo(ys, t), 
              t.subTo(y, y); y.t < ys; ) y[y.t++] = 0;
              for (;--j >= 0; ) {
                var qd = r[--i] == y0 ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
                if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) for (y.dlShiftTo(j, t), r.subTo(t, r); r[i] < --qd; ) r.subTo(t, r);
              }
              null != q && (r.drShiftTo(ys, q), ts != ms && BigInteger.ZERO.subTo(q, q)), r.t = ys, 
              r.clamp(), nsh > 0 && r.rShiftTo(nsh, r), ts < 0 && BigInteger.ZERO.subTo(r, r);
            }
          }
        }, BigInteger.prototype.invDigit = function() {
          if (this.t < 1) return 0;
          var x = this[0];
          if (0 == (1 & x)) return 0;
          var y = 3 & x;
          return (y = (y = (y = (y = y * (2 - (15 & x) * y) & 15) * (2 - (255 & x) * y) & 255) * (2 - ((65535 & x) * y & 65535)) & 65535) * (2 - x * y % this.DV) % this.DV) > 0 ? this.DV - y : -y;
        }, BigInteger.prototype.isEven = function() {
          return 0 == (this.t > 0 ? 1 & this[0] : this.s);
        }, BigInteger.prototype.exp = function(e, z) {
          if (e > 4294967295 || e < 1) return BigInteger.ONE;
          var r = nbi(), r2 = nbi(), g = z.convert(this), i = nbits(e) - 1;
          for (g.copyTo(r); --i >= 0; ) if (z.sqrTo(r, r2), (e & 1 << i) > 0) z.mulTo(r2, g, r); else {
            var t = r;
            r = r2, r2 = t;
          }
          return z.revert(r);
        }, BigInteger.prototype.toString = function(b) {
          if (this.s < 0) return "-" + this.negate().toString(b);
          var k;
          if (16 == b) k = 4; else if (8 == b) k = 3; else if (2 == b) k = 1; else if (32 == b) k = 5; else {
            if (4 != b) return this.toRadix(b);
            k = 2;
          }
          var d, km = (1 << k) - 1, m = !1, r = "", i = this.t, p = this.DB - i * this.DB % k;
          if (i-- > 0) for (p < this.DB && (d = this[i] >> p) > 0 && (m = !0, r = int2char(d)); i >= 0; ) p < k ? (d = (this[i] & (1 << p) - 1) << k - p, 
          d |= this[--i] >> (p += this.DB - k)) : (d = this[i] >> (p -= k) & km, p <= 0 && (p += this.DB, 
          --i)), d > 0 && (m = !0), m && (r += int2char(d));
          return m ? r : "0";
        }, BigInteger.prototype.negate = function() {
          var r = nbi();
          return BigInteger.ZERO.subTo(this, r), r;
        }, BigInteger.prototype.abs = function() {
          return this.s < 0 ? this.negate() : this;
        }, BigInteger.prototype.compareTo = function(a) {
          var r = this.s - a.s;
          if (0 != r) return r;
          var i = this.t;
          if (0 != (r = i - a.t)) return this.s < 0 ? -r : r;
          for (;--i >= 0; ) if (0 != (r = this[i] - a[i])) return r;
          return 0;
        }, BigInteger.prototype.bitLength = function() {
          return this.t <= 0 ? 0 : this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
        }, BigInteger.prototype.mod = function(a) {
          var r = nbi();
          return this.abs().divRemTo(a, null, r), this.s < 0 && r.compareTo(BigInteger.ZERO) > 0 && a.subTo(r, r), 
          r;
        }, BigInteger.prototype.modPowInt = function(e, m) {
          var z;
          return z = e < 256 || m.isEven() ? new Classic(m) : new Montgomery(m), this.exp(e, z);
        }, BigInteger.ZERO = nbv(0), BigInteger.ONE = nbv(1), NullExp.prototype.convert = nNop, 
        NullExp.prototype.revert = nNop, NullExp.prototype.mulTo = function(x, y, r) {
          x.multiplyTo(y, r);
        }, NullExp.prototype.sqrTo = function(x, r) {
          x.squareTo(r);
        }, Barrett.prototype.convert = function(x) {
          if (x.s < 0 || x.t > 2 * this.m.t) return x.mod(this.m);
          if (x.compareTo(this.m) < 0) return x;
          var r = nbi();
          return x.copyTo(r), this.reduce(r), r;
        }, Barrett.prototype.revert = function(x) {
          return x;
        }, Barrett.prototype.reduce = function(x) {
          for (x.drShiftTo(this.m.t - 1, this.r2), x.t > this.m.t + 1 && (x.t = this.m.t + 1, 
          x.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); x.compareTo(this.r2) < 0; ) x.dAddOffset(1, this.m.t + 1);
          for (x.subTo(this.r2, x); x.compareTo(this.m) >= 0; ) x.subTo(this.m, x);
        }, Barrett.prototype.mulTo = function(x, y, r) {
          x.multiplyTo(y, r), this.reduce(r);
        }, Barrett.prototype.sqrTo = function(x, r) {
          x.squareTo(r), this.reduce(r);
        };
        var rng_state, rng_pool, rng_pptr, lowprimes = [ 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997 ], lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
        function rng_seed_time() {
          var x;
          x = (new Date).getTime(), rng_pool[rng_pptr++] ^= 255 & x, rng_pool[rng_pptr++] ^= x >> 8 & 255, 
          rng_pool[rng_pptr++] ^= x >> 16 & 255, rng_pool[rng_pptr++] ^= x >> 24 & 255, rng_pptr >= rng_psize && (rng_pptr -= rng_psize);
        }
        if (BigInteger.prototype.chunkSize = function(r) {
          return Math.floor(Math.LN2 * this.DB / Math.log(r));
        }, BigInteger.prototype.toRadix = function(b) {
          if (null == b && (b = 10), 0 == this.signum() || b < 2 || b > 36) return "0";
          var cs = this.chunkSize(b), a = Math.pow(b, cs), d = nbv(a), y = nbi(), z = nbi(), r = "";
          for (this.divRemTo(d, y, z); y.signum() > 0; ) r = (a + z.intValue()).toString(b).substr(1) + r, 
          y.divRemTo(d, y, z);
          return z.intValue().toString(b) + r;
        }, BigInteger.prototype.fromRadix = function(s, b) {
          this.fromInt(0), null == b && (b = 10);
          for (var cs = this.chunkSize(b), d = Math.pow(b, cs), mi = !1, j = 0, w = 0, i = 0; i < s.length; ++i) {
            var x = intAt(s, i);
            x < 0 ? "-" == s.charAt(i) && 0 == this.signum() && (mi = !0) : (w = b * w + x, 
            ++j >= cs && (this.dMultiply(d), this.dAddOffset(w, 0), j = 0, w = 0));
          }
          j > 0 && (this.dMultiply(Math.pow(b, j)), this.dAddOffset(w, 0)), mi && BigInteger.ZERO.subTo(this, this);
        }, BigInteger.prototype.fromNumber = function(a, b, c) {
          if ("number" == typeof b) if (a < 2) this.fromInt(1); else for (this.fromNumber(a, c), 
          this.testBit(a - 1) || this.bitwiseTo(BigInteger.ONE.shiftLeft(a - 1), op_or, this), 
          this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(b); ) this.dAddOffset(2, 0), 
          this.bitLength() > a && this.subTo(BigInteger.ONE.shiftLeft(a - 1), this); else {
            var x = new Array, t = 7 & a;
            x.length = 1 + (a >> 3), b.nextBytes(x), t > 0 ? x[0] &= (1 << t) - 1 : x[0] = 0, 
            this.fromString(x, 256);
          }
        }, BigInteger.prototype.bitwiseTo = function(a, op, r) {
          var i, f, m = Math.min(a.t, this.t);
          for (i = 0; i < m; ++i) r[i] = op(this[i], a[i]);
          if (a.t < this.t) {
            for (f = a.s & this.DM, i = m; i < this.t; ++i) r[i] = op(this[i], f);
            r.t = this.t;
          } else {
            for (f = this.s & this.DM, i = m; i < a.t; ++i) r[i] = op(f, a[i]);
            r.t = a.t;
          }
          r.s = op(this.s, a.s), r.clamp();
        }, BigInteger.prototype.changeBit = function(n, op) {
          var r = BigInteger.ONE.shiftLeft(n);
          return this.bitwiseTo(r, op, r), r;
        }, BigInteger.prototype.addTo = function(a, r) {
          for (var i = 0, c = 0, m = Math.min(a.t, this.t); i < m; ) c += this[i] + a[i], 
          r[i++] = c & this.DM, c >>= this.DB;
          if (a.t < this.t) {
            for (c += a.s; i < this.t; ) c += this[i], r[i++] = c & this.DM, c >>= this.DB;
            c += this.s;
          } else {
            for (c += this.s; i < a.t; ) c += a[i], r[i++] = c & this.DM, c >>= this.DB;
            c += a.s;
          }
          r.s = c < 0 ? -1 : 0, c > 0 ? r[i++] = c : c < -1 && (r[i++] = this.DV + c), r.t = i, 
          r.clamp();
        }, BigInteger.prototype.dMultiply = function(n) {
          this[this.t] = this.am(0, n - 1, this, 0, 0, this.t), ++this.t, this.clamp();
        }, BigInteger.prototype.dAddOffset = function(n, w) {
          if (0 != n) {
            for (;this.t <= w; ) this[this.t++] = 0;
            for (this[w] += n; this[w] >= this.DV; ) this[w] -= this.DV, ++w >= this.t && (this[this.t++] = 0), 
            ++this[w];
          }
        }, BigInteger.prototype.multiplyLowerTo = function(a, n, r) {
          var j, i = Math.min(this.t + a.t, n);
          for (r.s = 0, r.t = i; i > 0; ) r[--i] = 0;
          for (j = r.t - this.t; i < j; ++i) r[i + this.t] = this.am(0, a[i], r, i, 0, this.t);
          for (j = Math.min(a.t, n); i < j; ++i) this.am(0, a[i], r, i, 0, n - i);
          r.clamp();
        }, BigInteger.prototype.multiplyUpperTo = function(a, n, r) {
          --n;
          var i = r.t = this.t + a.t - n;
          for (r.s = 0; --i >= 0; ) r[i] = 0;
          for (i = Math.max(n - this.t, 0); i < a.t; ++i) r[this.t + i - n] = this.am(n - i, a[i], r, 0, 0, this.t + i - n);
          r.clamp(), r.drShiftTo(1, r);
        }, BigInteger.prototype.modInt = function(n) {
          if (n <= 0) return 0;
          var d = this.DV % n, r = this.s < 0 ? n - 1 : 0;
          if (this.t > 0) if (0 == d) r = this[0] % n; else for (var i = this.t - 1; i >= 0; --i) r = (d * r + this[i]) % n;
          return r;
        }, BigInteger.prototype.millerRabin = function(t) {
          var n1 = this.subtract(BigInteger.ONE), k = n1.getLowestSetBit();
          if (k <= 0) return !1;
          var r = n1.shiftRight(k);
          (t = t + 1 >> 1) > lowprimes.length && (t = lowprimes.length);
          for (var a = nbi(), i = 0; i < t; ++i) {
            a.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
            var y = a.modPow(r, this);
            if (0 != y.compareTo(BigInteger.ONE) && 0 != y.compareTo(n1)) {
              for (var j = 1; j++ < k && 0 != y.compareTo(n1); ) if (0 == (y = y.modPowInt(2, this)).compareTo(BigInteger.ONE)) return !1;
              if (0 != y.compareTo(n1)) return !1;
            }
          }
          return !0;
        }, BigInteger.prototype.clone = function() {
          var r = nbi();
          return this.copyTo(r), r;
        }, BigInteger.prototype.intValue = function() {
          if (this.s < 0) {
            if (1 == this.t) return this[0] - this.DV;
            if (0 == this.t) return -1;
          } else {
            if (1 == this.t) return this[0];
            if (0 == this.t) return 0;
          }
          return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
        }, BigInteger.prototype.byteValue = function() {
          return 0 == this.t ? this.s : this[0] << 24 >> 24;
        }, BigInteger.prototype.shortValue = function() {
          return 0 == this.t ? this.s : this[0] << 16 >> 16;
        }, BigInteger.prototype.signum = function() {
          return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1;
        }, BigInteger.prototype.toByteArray = function() {
          var i = this.t, r = new Array;
          r[0] = this.s;
          var d, p = this.DB - i * this.DB % 8, k = 0;
          if (i-- > 0) for (p < this.DB && (d = this[i] >> p) != (this.s & this.DM) >> p && (r[k++] = d | this.s << this.DB - p); i >= 0; ) p < 8 ? (d = (this[i] & (1 << p) - 1) << 8 - p, 
          d |= this[--i] >> (p += this.DB - 8)) : (d = this[i] >> (p -= 8) & 255, p <= 0 && (p += this.DB, 
          --i)), 0 != (128 & d) && (d |= -256), 0 == k && (128 & this.s) != (128 & d) && ++k, 
          (k > 0 || d != this.s) && (r[k++] = d);
          return r;
        }, BigInteger.prototype.equals = function(a) {
          return 0 == this.compareTo(a);
        }, BigInteger.prototype.min = function(a) {
          return this.compareTo(a) < 0 ? this : a;
        }, BigInteger.prototype.max = function(a) {
          return this.compareTo(a) > 0 ? this : a;
        }, BigInteger.prototype.and = function(a) {
          var r = nbi();
          return this.bitwiseTo(a, op_and, r), r;
        }, BigInteger.prototype.or = function(a) {
          var r = nbi();
          return this.bitwiseTo(a, op_or, r), r;
        }, BigInteger.prototype.xor = function(a) {
          var r = nbi();
          return this.bitwiseTo(a, op_xor, r), r;
        }, BigInteger.prototype.andNot = function(a) {
          var r = nbi();
          return this.bitwiseTo(a, op_andnot, r), r;
        }, BigInteger.prototype.not = function() {
          for (var r = nbi(), i = 0; i < this.t; ++i) r[i] = this.DM & ~this[i];
          return r.t = this.t, r.s = ~this.s, r;
        }, BigInteger.prototype.shiftLeft = function(n) {
          var r = nbi();
          return n < 0 ? this.rShiftTo(-n, r) : this.lShiftTo(n, r), r;
        }, BigInteger.prototype.shiftRight = function(n) {
          var r = nbi();
          return n < 0 ? this.lShiftTo(-n, r) : this.rShiftTo(n, r), r;
        }, BigInteger.prototype.getLowestSetBit = function() {
          for (var i = 0; i < this.t; ++i) if (0 != this[i]) return i * this.DB + lbit(this[i]);
          return this.s < 0 ? this.t * this.DB : -1;
        }, BigInteger.prototype.bitCount = function() {
          for (var r = 0, x = this.s & this.DM, i = 0; i < this.t; ++i) r += cbit(this[i] ^ x);
          return r;
        }, BigInteger.prototype.testBit = function(n) {
          var j = Math.floor(n / this.DB);
          return j >= this.t ? 0 != this.s : 0 != (this[j] & 1 << n % this.DB);
        }, BigInteger.prototype.setBit = function(n) {
          return this.changeBit(n, op_or);
        }, BigInteger.prototype.clearBit = function(n) {
          return this.changeBit(n, op_andnot);
        }, BigInteger.prototype.flipBit = function(n) {
          return this.changeBit(n, op_xor);
        }, BigInteger.prototype.add = function(a) {
          var r = nbi();
          return this.addTo(a, r), r;
        }, BigInteger.prototype.subtract = function(a) {
          var r = nbi();
          return this.subTo(a, r), r;
        }, BigInteger.prototype.multiply = function(a) {
          var r = nbi();
          return this.multiplyTo(a, r), r;
        }, BigInteger.prototype.divide = function(a) {
          var r = nbi();
          return this.divRemTo(a, r, null), r;
        }, BigInteger.prototype.remainder = function(a) {
          var r = nbi();
          return this.divRemTo(a, null, r), r;
        }, BigInteger.prototype.divideAndRemainder = function(a) {
          var q = nbi(), r = nbi();
          return this.divRemTo(a, q, r), new Array(q, r);
        }, BigInteger.prototype.modPow = function(e, m) {
          var k, z, i = e.bitLength(), r = nbv(1);
          if (i <= 0) return r;
          k = i < 18 ? 1 : i < 48 ? 3 : i < 144 ? 4 : i < 768 ? 5 : 6, z = i < 8 ? new Classic(m) : m.isEven() ? new Barrett(m) : new Montgomery(m);
          var g = new Array, n = 3, k1 = k - 1, km = (1 << k) - 1;
          if (g[1] = z.convert(this), k > 1) {
            var g2 = nbi();
            for (z.sqrTo(g[1], g2); n <= km; ) g[n] = nbi(), z.mulTo(g2, g[n - 2], g[n]), n += 2;
          }
          var w, t, j = e.t - 1, is1 = !0, r2 = nbi();
          for (i = nbits(e[j]) - 1; j >= 0; ) {
            for (i >= k1 ? w = e[j] >> i - k1 & km : (w = (e[j] & (1 << i + 1) - 1) << k1 - i, 
            j > 0 && (w |= e[j - 1] >> this.DB + i - k1)), n = k; 0 == (1 & w); ) w >>= 1, --n;
            if ((i -= n) < 0 && (i += this.DB, --j), is1) g[w].copyTo(r), is1 = !1; else {
              for (;n > 1; ) z.sqrTo(r, r2), z.sqrTo(r2, r), n -= 2;
              n > 0 ? z.sqrTo(r, r2) : (t = r, r = r2, r2 = t), z.mulTo(r2, g[w], r);
            }
            for (;j >= 0 && 0 == (e[j] & 1 << i); ) z.sqrTo(r, r2), t = r, r = r2, r2 = t, --i < 0 && (i = this.DB - 1, 
            --j);
          }
          return z.revert(r);
        }, BigInteger.prototype.modInverse = function(m) {
          var ac = m.isEven();
          if (this.isEven() && ac || 0 == m.signum()) return BigInteger.ZERO;
          for (var u = m.clone(), v = this.clone(), a = nbv(1), b = nbv(0), c = nbv(0), d = nbv(1); 0 != u.signum(); ) {
            for (;u.isEven(); ) u.rShiftTo(1, u), ac ? (a.isEven() && b.isEven() || (a.addTo(this, a), 
            b.subTo(m, b)), a.rShiftTo(1, a)) : b.isEven() || b.subTo(m, b), b.rShiftTo(1, b);
            for (;v.isEven(); ) v.rShiftTo(1, v), ac ? (c.isEven() && d.isEven() || (c.addTo(this, c), 
            d.subTo(m, d)), c.rShiftTo(1, c)) : d.isEven() || d.subTo(m, d), d.rShiftTo(1, d);
            u.compareTo(v) >= 0 ? (u.subTo(v, u), ac && a.subTo(c, a), b.subTo(d, b)) : (v.subTo(u, v), 
            ac && c.subTo(a, c), d.subTo(b, d));
          }
          return 0 != v.compareTo(BigInteger.ONE) ? BigInteger.ZERO : d.compareTo(m) >= 0 ? d.subtract(m) : d.signum() < 0 ? (d.addTo(m, d), 
          d.signum() < 0 ? d.add(m) : d) : d;
        }, BigInteger.prototype.pow = function(e) {
          return this.exp(e, new NullExp);
        }, BigInteger.prototype.gcd = function(a) {
          var x = this.s < 0 ? this.negate() : this.clone(), y = a.s < 0 ? a.negate() : a.clone();
          if (x.compareTo(y) < 0) {
            var t = x;
            x = y, y = t;
          }
          var i = x.getLowestSetBit(), g = y.getLowestSetBit();
          if (g < 0) return x;
          for (i < g && (g = i), g > 0 && (x.rShiftTo(g, x), y.rShiftTo(g, y)); x.signum() > 0; ) (i = x.getLowestSetBit()) > 0 && x.rShiftTo(i, x), 
          (i = y.getLowestSetBit()) > 0 && y.rShiftTo(i, y), x.compareTo(y) >= 0 ? (x.subTo(y, x), 
          x.rShiftTo(1, x)) : (y.subTo(x, y), y.rShiftTo(1, y));
          return g > 0 && y.lShiftTo(g, y), y;
        }, BigInteger.prototype.isProbablePrime = function(t) {
          var i, x = this.abs();
          if (1 == x.t && x[0] <= lowprimes[lowprimes.length - 1]) {
            for (i = 0; i < lowprimes.length; ++i) if (x[0] == lowprimes[i]) return !0;
            return !1;
          }
          if (x.isEven()) return !1;
          for (i = 1; i < lowprimes.length; ) {
            for (var m = lowprimes[i], j = i + 1; j < lowprimes.length && m < lplim; ) m *= lowprimes[j++];
            for (m = x.modInt(m); i < j; ) if (m % lowprimes[i++] == 0) return !1;
          }
          return x.millerRabin(t);
        }, BigInteger.prototype.square = function() {
          var r = nbi();
          return this.squareTo(r), r;
        }, BigInteger.prototype.Barrett = Barrett, null == rng_pool) {
          var t;
          if (rng_pool = new Array, rng_pptr = 0, "undefined" != typeof window && window.crypto) if (window.crypto.getRandomValues) {
            var ua = new Uint8Array(32);
            for (window.crypto.getRandomValues(ua), t = 0; t < 32; ++t) rng_pool[rng_pptr++] = ua[t];
          } else if ("Netscape" == navigator.appName && navigator.appVersion < "5") {
            var z = window.crypto.random(32);
            for (t = 0; t < z.length; ++t) rng_pool[rng_pptr++] = 255 & z.charCodeAt(t);
          }
          for (;rng_pptr < rng_psize; ) t = Math.floor(65536 * Math.random()), rng_pool[rng_pptr++] = t >>> 8, 
          rng_pool[rng_pptr++] = 255 & t;
          rng_pptr = 0, rng_seed_time();
        }
        function rng_get_byte() {
          if (null == rng_state) {
            for (rng_seed_time(), (rng_state = new Arcfour).init(rng_pool), rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr) rng_pool[rng_pptr] = 0;
            rng_pptr = 0;
          }
          return rng_state.next();
        }
        function SecureRandom() {}
        function Arcfour() {
          this.i = 0, this.j = 0, this.S = new Array;
        }
        SecureRandom.prototype.nextBytes = function(ba) {
          var i;
          for (i = 0; i < ba.length; ++i) ba[i] = rng_get_byte();
        }, Arcfour.prototype.init = function(key) {
          var i, j, t;
          for (i = 0; i < 256; ++i) this.S[i] = i;
          for (j = 0, i = 0; i < 256; ++i) j = j + this.S[i] + key[i % key.length] & 255, 
          t = this.S[i], this.S[i] = this.S[j], this.S[j] = t;
          this.i = 0, this.j = 0;
        }, Arcfour.prototype.next = function() {
          var t;
          return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, t = this.S[this.i], 
          this.S[this.i] = this.S[this.j], this.S[this.j] = t, this.S[t + this.S[this.i] & 255];
        };
        var rng_psize = 256;
        BigInteger.SecureRandom = SecureRandom, BigInteger.BigInteger = BigInteger, module.exports = BigInteger;
      }).call(this);
    },
    12237: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var key, buffer = __webpack_require__(14300), Buffer = buffer.Buffer, safer = {};
      for (key in buffer) buffer.hasOwnProperty(key) && "SlowBuffer" !== key && "Buffer" !== key && (safer[key] = buffer[key]);
      var Safer = safer.Buffer = {};
      for (key in Buffer) Buffer.hasOwnProperty(key) && "allocUnsafe" !== key && "allocUnsafeSlow" !== key && (Safer[key] = Buffer[key]);
      if (safer.Buffer.prototype = Buffer.prototype, Safer.from && Safer.from !== Uint8Array.from || (Safer.from = function(value, encodingOrOffset, length) {
        if ("number" == typeof value) throw new TypeError('The "value" argument must not be of type number. Received type ' + typeof value);
        if (value && void 0 === value.length) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
        return Buffer(value, encodingOrOffset, length);
      }), Safer.alloc || (Safer.alloc = function(size, fill, encoding) {
        if ("number" != typeof size) throw new TypeError('The "size" argument must be of type number. Received type ' + typeof size);
        if (size < 0 || size >= 2 * (1 << 30)) throw new RangeError('The value "' + size + '" is invalid for option "size"');
        var buf = Buffer(size);
        return fill && 0 !== fill.length ? "string" == typeof encoding ? buf.fill(fill, encoding) : buf.fill(fill) : buf.fill(0), 
        buf;
      }), !safer.kStringMaxLength) try {
        safer.kStringMaxLength = process.binding("buffer").kStringMaxLength;
      } catch (e) {}
      safer.constants || (safer.constants = {
        MAX_LENGTH: safer.kMaxLength
      }, safer.kStringMaxLength && (safer.constants.MAX_STRING_LENGTH = safer.kStringMaxLength)), 
      module.exports = safer;
    },
    95878: (module, __unused_webpack_exports, __webpack_require__) => {
      var Buffer = __webpack_require__(12237).Buffer, algInfo = {
        dsa: {
          parts: [ "p", "q", "g", "y" ],
          sizePart: "p"
        },
        rsa: {
          parts: [ "e", "n" ],
          sizePart: "n"
        },
        ecdsa: {
          parts: [ "curve", "Q" ],
          sizePart: "Q"
        },
        ed25519: {
          parts: [ "A" ],
          sizePart: "A"
        }
      };
      algInfo.curve25519 = algInfo.ed25519;
      var algPrivInfo = {
        dsa: {
          parts: [ "p", "q", "g", "y", "x" ]
        },
        rsa: {
          parts: [ "n", "e", "d", "iqmp", "p", "q" ]
        },
        ecdsa: {
          parts: [ "curve", "Q", "d" ]
        },
        ed25519: {
          parts: [ "A", "k" ]
        }
      };
      algPrivInfo.curve25519 = algPrivInfo.ed25519;
      var curves = {
        nistp256: {
          size: 256,
          pkcs8oid: "1.2.840.10045.3.1.7",
          p: Buffer.from("00ffffffff 00000001 00000000 0000000000000000 ffffffff ffffffff ffffffff".replace(/ /g, ""), "hex"),
          a: Buffer.from("00FFFFFFFF 00000001 00000000 0000000000000000 FFFFFFFF FFFFFFFF FFFFFFFC".replace(/ /g, ""), "hex"),
          b: Buffer.from("5ac635d8 aa3a93e7 b3ebbd55 769886bc651d06b0 cc53b0f6 3bce3c3e 27d2604b".replace(/ /g, ""), "hex"),
          s: Buffer.from("00c49d3608 86e70493 6a6678e1 139d26b7819f7e90".replace(/ /g, ""), "hex"),
          n: Buffer.from("00ffffffff 00000000 ffffffff ffffffffbce6faad a7179e84 f3b9cac2 fc632551".replace(/ /g, ""), "hex"),
          G: Buffer.from("046b17d1f2 e12c4247 f8bce6e5 63a440f277037d81 2deb33a0 f4a13945 d898c2964fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e162bce3357 6b315ece cbb64068 37bf51f5".replace(/ /g, ""), "hex")
        },
        nistp384: {
          size: 384,
          pkcs8oid: "1.3.132.0.34",
          p: Buffer.from("00ffffffff ffffffff ffffffff ffffffffffffffff ffffffff ffffffff fffffffeffffffff 00000000 00000000 ffffffff".replace(/ /g, ""), "hex"),
          a: Buffer.from("00FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFFFFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFEFFFFFFFF 00000000 00000000 FFFFFFFC".replace(/ /g, ""), "hex"),
          b: Buffer.from("b3312fa7 e23ee7e4 988e056b e3f82d19181d9c6e fe814112 0314088f 5013875ac656398d 8a2ed19d 2a85c8ed d3ec2aef".replace(/ /g, ""), "hex"),
          s: Buffer.from("00a335926a a319a27a 1d00896a 6773a4827acdac73".replace(/ /g, ""), "hex"),
          n: Buffer.from("00ffffffff ffffffff ffffffff ffffffffffffffff ffffffff c7634d81 f4372ddf581a0db2 48b0a77a ecec196a ccc52973".replace(/ /g, ""), "hex"),
          G: Buffer.from("04aa87ca22 be8b0537 8eb1c71e f320ad746e1d3b62 8ba79b98 59f741e0 82542a385502f25d bf55296c 3a545e38 72760ab73617de4a 96262c6f 5d9e98bf 9292dc29f8f41dbd 289a147c e9da3113 b5f0b8c00a60b1ce 1d7e819d 7a431d7c 90ea0e5f".replace(/ /g, ""), "hex")
        },
        nistp521: {
          size: 521,
          pkcs8oid: "1.3.132.0.35",
          p: Buffer.from("01ffffff ffffffff ffffffff ffffffffffffffff ffffffff ffffffff ffffffffffffffff ffffffff ffffffff ffffffffffffffff ffffffff ffffffff ffffffffffff".replace(/ /g, ""), "hex"),
          a: Buffer.from("01FFFFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFFFFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFFFFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFFFFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFC".replace(/ /g, ""), "hex"),
          b: Buffer.from("51953eb961 8e1c9a1f 929a21a0 b68540eea2da725b 99b315f3 b8b48991 8ef109e156193951 ec7e937b 1652c0bd 3bb1bf073573df88 3d2c34f1 ef451fd4 6b503f00".replace(/ /g, ""), "hex"),
          s: Buffer.from("00d09e8800 291cb853 96cc6717 393284aaa0da64ba".replace(/ /g, ""), "hex"),
          n: Buffer.from("01ffffffffff ffffffff ffffffff ffffffffffffffff ffffffff ffffffff fffffffa51868783 bf2f966b 7fcc0148 f709a5d03bb5c9b8 899c47ae bb6fb71e 91386409".replace(/ /g, ""), "hex"),
          G: Buffer.from("0400c6 858e06b7 0404e9cd 9e3ecb66 2395b4429c648139 053fb521 f828af60 6b4d3dbaa14b5e77 efe75928 fe1dc127 a2ffa8de3348b3c1 856a429b f97e7e31 c2e5bd660118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd998f54449 579b4468 17afbd17 273e662c97ee7299 5ef42640 c550b901 3fad0761353c7086 a272c240 88be9476 9fd16650".replace(/ /g, ""), "hex")
        }
      };
      module.exports = {
        info: algInfo,
        privInfo: algPrivInfo,
        hashAlgs: {
          md5: !0,
          sha1: !0,
          sha256: !0,
          sha384: !0,
          sha512: !0
        },
        curves
      };
    },
    45734: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = Certificate;
      var assert = __webpack_require__(2675), Buffer = __webpack_require__(12237).Buffer, algs = __webpack_require__(95878), crypto = __webpack_require__(6113), Fingerprint = __webpack_require__(97862), errs = (__webpack_require__(56519), 
      __webpack_require__(45638)), utils = (__webpack_require__(73837), __webpack_require__(25742)), Key = __webpack_require__(7710), PrivateKey = __webpack_require__(53799), Identity = __webpack_require__(46e3), formats = {};
      formats.openssh = __webpack_require__(27478), formats.x509 = __webpack_require__(7579), 
      formats.pem = __webpack_require__(75468);
      var CertificateParseError = errs.CertificateParseError, InvalidAlgorithmError = errs.InvalidAlgorithmError;
      function Certificate(opts) {
        assert.object(opts, "options"), assert.arrayOfObject(opts.subjects, "options.subjects"), 
        utils.assertCompatible(opts.subjects[0], Identity, [ 1, 0 ], "options.subjects"), 
        utils.assertCompatible(opts.subjectKey, Key, [ 1, 0 ], "options.subjectKey"), utils.assertCompatible(opts.issuer, Identity, [ 1, 0 ], "options.issuer"), 
        void 0 !== opts.issuerKey && utils.assertCompatible(opts.issuerKey, Key, [ 1, 0 ], "options.issuerKey"), 
        assert.object(opts.signatures, "options.signatures"), assert.buffer(opts.serial, "options.serial"), 
        assert.date(opts.validFrom, "options.validFrom"), assert.date(opts.validUntil, "optons.validUntil"), 
        assert.optionalArrayOfString(opts.purposes, "options.purposes"), this._hashCache = {}, 
        this.subjects = opts.subjects, this.issuer = opts.issuer, this.subjectKey = opts.subjectKey, 
        this.issuerKey = opts.issuerKey, this.signatures = opts.signatures, this.serial = opts.serial, 
        this.validFrom = opts.validFrom, this.validUntil = opts.validUntil, this.purposes = opts.purposes;
      }
      Certificate.formats = formats, Certificate.prototype.toBuffer = function(format, options) {
        return void 0 === format && (format = "x509"), assert.string(format, "format"), 
        assert.object(formats[format], "formats[format]"), assert.optionalObject(options, "options"), 
        formats[format].write(this, options);
      }, Certificate.prototype.toString = function(format, options) {
        return void 0 === format && (format = "pem"), this.toBuffer(format, options).toString();
      }, Certificate.prototype.fingerprint = function(algo) {
        void 0 === algo && (algo = "sha256"), assert.string(algo, "algorithm");
        var opts = {
          type: "certificate",
          hash: this.hash(algo),
          algorithm: algo
        };
        return new Fingerprint(opts);
      }, Certificate.prototype.hash = function(algo) {
        if (assert.string(algo, "algorithm"), algo = algo.toLowerCase(), void 0 === algs.hashAlgs[algo]) throw new InvalidAlgorithmError(algo);
        if (this._hashCache[algo]) return this._hashCache[algo];
        var hash = crypto.createHash(algo).update(this.toBuffer("x509")).digest();
        return this._hashCache[algo] = hash, hash;
      }, Certificate.prototype.isExpired = function(when) {
        return void 0 === when && (when = new Date), !(when.getTime() >= this.validFrom.getTime() && when.getTime() < this.validUntil.getTime());
      }, Certificate.prototype.isSignedBy = function(issuerCert) {
        return utils.assertCompatible(issuerCert, Certificate, [ 1, 0 ], "issuer"), !!this.issuer.equals(issuerCert.subjects[0]) && (!(this.issuer.purposes && this.issuer.purposes.length > 0 && -1 === this.issuer.purposes.indexOf("ca")) && this.isSignedByKey(issuerCert.subjectKey));
      }, Certificate.prototype.getExtension = function(keyOrOid) {
        return assert.string(keyOrOid, "keyOrOid"), this.getExtensions().filter((function(maybeExt) {
          return "x509" === maybeExt.format ? maybeExt.oid === keyOrOid : "openssh" === maybeExt.format && maybeExt.name === keyOrOid;
        }))[0];
      }, Certificate.prototype.getExtensions = function() {
        var exts = [], x509 = this.signatures.x509;
        x509 && x509.extras && x509.extras.exts && x509.extras.exts.forEach((function(ext) {
          ext.format = "x509", exts.push(ext);
        }));
        var openssh = this.signatures.openssh;
        return openssh && openssh.exts && openssh.exts.forEach((function(ext) {
          ext.format = "openssh", exts.push(ext);
        })), exts;
      }, Certificate.prototype.isSignedByKey = function(issuerKey) {
        if (utils.assertCompatible(issuerKey, Key, [ 1, 2 ], "issuerKey"), void 0 !== this.issuerKey) return this.issuerKey.fingerprint("sha512").matches(issuerKey);
        var fmt = Object.keys(this.signatures)[0], valid = formats[fmt].verify(this, issuerKey);
        return valid && (this.issuerKey = issuerKey), valid;
      }, Certificate.prototype.signWith = function(key) {
        utils.assertCompatible(key, PrivateKey, [ 1, 2 ], "key");
        for (var fmts = Object.keys(formats), didOne = !1, i = 0; i < fmts.length; ++i) {
          if ("pem" !== fmts[i]) !0 === formats[fmts[i]].sign(this, key) && (didOne = !0);
        }
        if (!didOne) throw new Error("Failed to sign the certificate for any available certificate formats");
      }, Certificate.createSelfSigned = function(subjectOrSubjects, key, options) {
        var subjects;
        subjects = Array.isArray(subjectOrSubjects) ? subjectOrSubjects : [ subjectOrSubjects ], 
        assert.arrayOfObject(subjects), subjects.forEach((function(subject) {
          utils.assertCompatible(subject, Identity, [ 1, 0 ], "subject");
        })), utils.assertCompatible(key, PrivateKey, [ 1, 2 ], "private key"), assert.optionalObject(options, "options"), 
        void 0 === options && (options = {}), assert.optionalObject(options.validFrom, "options.validFrom"), 
        assert.optionalObject(options.validUntil, "options.validUntil");
        var validFrom = options.validFrom, validUntil = options.validUntil;
        if (void 0 === validFrom && (validFrom = new Date), void 0 === validUntil) {
          assert.optionalNumber(options.lifetime, "options.lifetime");
          var lifetime = options.lifetime;
          void 0 === lifetime && (lifetime = 31536e4), (validUntil = new Date).setTime(validUntil.getTime() + 1e3 * lifetime);
        }
        assert.optionalBuffer(options.serial, "options.serial");
        var serial = options.serial;
        void 0 === serial && (serial = Buffer.from("0000000000000001", "hex"));
        var purposes = options.purposes;
        if (void 0 === purposes && (purposes = []), -1 === purposes.indexOf("signature") && purposes.push("signature"), 
        -1 === purposes.indexOf("ca") && purposes.push("ca"), -1 === purposes.indexOf("crl") && purposes.push("crl"), 
        purposes.length <= 3) {
          var hostSubjects = subjects.filter((function(subject) {
            return "host" === subject.type;
          })), userSubjects = subjects.filter((function(subject) {
            return "user" === subject.type;
          }));
          hostSubjects.length > 0 && -1 === purposes.indexOf("serverAuth") && purposes.push("serverAuth"), 
          userSubjects.length > 0 && -1 === purposes.indexOf("clientAuth") && purposes.push("clientAuth"), 
          (userSubjects.length > 0 || hostSubjects.length > 0) && (-1 === purposes.indexOf("keyAgreement") && purposes.push("keyAgreement"), 
          "rsa" === key.type && -1 === purposes.indexOf("encryption") && purposes.push("encryption"));
        }
        var cert = new Certificate({
          subjects,
          issuer: subjects[0],
          subjectKey: key.toPublic(),
          issuerKey: key.toPublic(),
          signatures: {},
          serial,
          validFrom,
          validUntil,
          purposes
        });
        return cert.signWith(key), cert;
      }, Certificate.create = function(subjectOrSubjects, key, issuer, issuerKey, options) {
        var subjects;
        subjects = Array.isArray(subjectOrSubjects) ? subjectOrSubjects : [ subjectOrSubjects ], 
        assert.arrayOfObject(subjects), subjects.forEach((function(subject) {
          utils.assertCompatible(subject, Identity, [ 1, 0 ], "subject");
        })), utils.assertCompatible(key, Key, [ 1, 0 ], "key"), PrivateKey.isPrivateKey(key) && (key = key.toPublic()), 
        utils.assertCompatible(issuer, Identity, [ 1, 0 ], "issuer"), utils.assertCompatible(issuerKey, PrivateKey, [ 1, 2 ], "issuer key"), 
        assert.optionalObject(options, "options"), void 0 === options && (options = {}), 
        assert.optionalObject(options.validFrom, "options.validFrom"), assert.optionalObject(options.validUntil, "options.validUntil");
        var validFrom = options.validFrom, validUntil = options.validUntil;
        if (void 0 === validFrom && (validFrom = new Date), void 0 === validUntil) {
          assert.optionalNumber(options.lifetime, "options.lifetime");
          var lifetime = options.lifetime;
          void 0 === lifetime && (lifetime = 31536e4), (validUntil = new Date).setTime(validUntil.getTime() + 1e3 * lifetime);
        }
        assert.optionalBuffer(options.serial, "options.serial");
        var serial = options.serial;
        void 0 === serial && (serial = Buffer.from("0000000000000001", "hex"));
        var purposes = options.purposes;
        void 0 === purposes && (purposes = []), -1 === purposes.indexOf("signature") && purposes.push("signature"), 
        !0 === options.ca && (-1 === purposes.indexOf("ca") && purposes.push("ca"), -1 === purposes.indexOf("crl") && purposes.push("crl"));
        var hostSubjects = subjects.filter((function(subject) {
          return "host" === subject.type;
        })), userSubjects = subjects.filter((function(subject) {
          return "user" === subject.type;
        }));
        hostSubjects.length > 0 && -1 === purposes.indexOf("serverAuth") && purposes.push("serverAuth"), 
        userSubjects.length > 0 && -1 === purposes.indexOf("clientAuth") && purposes.push("clientAuth"), 
        (userSubjects.length > 0 || hostSubjects.length > 0) && (-1 === purposes.indexOf("keyAgreement") && purposes.push("keyAgreement"), 
        "rsa" === key.type && -1 === purposes.indexOf("encryption") && purposes.push("encryption"));
        var cert = new Certificate({
          subjects,
          issuer,
          subjectKey: key,
          issuerKey: issuerKey.toPublic(),
          signatures: {},
          serial,
          validFrom,
          validUntil,
          purposes
        });
        return cert.signWith(issuerKey), cert;
      }, Certificate.parse = function(data, format, options) {
        "string" != typeof data && assert.buffer(data, "data"), void 0 === format && (format = "auto"), 
        assert.string(format, "format"), "string" == typeof options && (options = {
          filename: options
        }), assert.optionalObject(options, "options"), void 0 === options && (options = {}), 
        assert.optionalString(options.filename, "options.filename"), void 0 === options.filename && (options.filename = "(unnamed)"), 
        assert.object(formats[format], "formats[format]");
        try {
          return formats[format].read(data, options);
        } catch (e) {
          throw new CertificateParseError(options.filename, format, e);
        }
      }, Certificate.isCertificate = function(obj, ver) {
        return utils.isCompatible(obj, Certificate, ver);
      }, Certificate.prototype._sshpkApiVersion = [ 1, 1 ], Certificate._oldVersionDetect = function(obj) {
        return [ 1, 0 ];
      };
    },
    18857: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = {
        DiffieHellman,
        generateECDSA: function(curve) {
          var parts = [];
          if (CRYPTO_HAVE_ECDH) {
            var osCurve = {
              nistp256: "prime256v1",
              nistp384: "secp384r1",
              nistp521: "secp521r1"
            }[curve], dh = crypto.createECDH(osCurve);
            return dh.generateKeys(), parts.push({
              name: "curve",
              data: Buffer.from(curve)
            }), parts.push({
              name: "Q",
              data: dh.getPublicKey()
            }), parts.push({
              name: "d",
              data: dh.getPrivateKey()
            }), new PrivateKey({
              type: "ecdsa",
              curve,
              parts
            });
          }
          var ecParams = new X9ECParameters(curve), n = ecParams.getN(), cByteLen = Math.ceil((n.bitLength() + 64) / 8), c = new jsbn(crypto.randomBytes(cByteLen)), n1 = n.subtract(jsbn.ONE), priv = c.mod(n1).add(jsbn.ONE), pub = ecParams.getG().multiply(priv);
          return priv = Buffer.from(priv.toByteArray()), pub = Buffer.from(ecParams.getCurve().encodePointHex(pub), "hex"), 
          parts.push({
            name: "curve",
            data: Buffer.from(curve)
          }), parts.push({
            name: "Q",
            data: pub
          }), parts.push({
            name: "d",
            data: priv
          }), new PrivateKey({
            type: "ecdsa",
            curve,
            parts
          });
        },
        generateED25519: function() {
          var pair = nacl.sign.keyPair(), priv = Buffer.from(pair.secretKey), pub = Buffer.from(pair.publicKey);
          assert.strictEqual(priv.length, 64), assert.strictEqual(pub.length, 32);
          var parts = [];
          return parts.push({
            name: "A",
            data: pub
          }), parts.push({
            name: "k",
            data: priv.slice(0, 32)
          }), new PrivateKey({
            type: "ed25519",
            parts
          });
        }
      };
      var assert = __webpack_require__(2675), crypto = __webpack_require__(6113), Buffer = __webpack_require__(12237).Buffer, algs = __webpack_require__(95878), utils = __webpack_require__(25742), nacl = __webpack_require__(36046), Key = __webpack_require__(7710), PrivateKey = __webpack_require__(53799), CRYPTO_HAVE_ECDH = void 0 !== crypto.createECDH, ec = (__webpack_require__(26375), 
      __webpack_require__(97660)), jsbn = __webpack_require__(32630).BigInteger;
      function DiffieHellman(key) {
        if (utils.assertCompatible(key, Key, [ 1, 4 ], "key"), this._isPriv = PrivateKey.isPrivateKey(key, [ 1, 3 ]), 
        this._algo = key.type, this._curve = key.curve, this._key = key, "dsa" === key.type) {
          if (!CRYPTO_HAVE_ECDH) throw new Error("Due to bugs in the node 0.10 crypto API, node 0.12.x or later is required to use DH");
          this._dh = crypto.createDiffieHellman(key.part.p.data, void 0, key.part.g.data, void 0), 
          this._p = key.part.p, this._g = key.part.g, this._isPriv && this._dh.setPrivateKey(key.part.x.data), 
          this._dh.setPublicKey(key.part.y.data);
        } else if ("ecdsa" === key.type) {
          if (!CRYPTO_HAVE_ECDH) return this._ecParams = new X9ECParameters(this._curve), 
          void (this._isPriv && (this._priv = new ECPrivate(this._ecParams, key.part.d.data)));
          var curve = {
            nistp256: "prime256v1",
            nistp384: "secp384r1",
            nistp521: "secp521r1"
          }[key.curve];
          if (this._dh = crypto.createECDH(curve), "object" != typeof this._dh || "function" != typeof this._dh.setPrivateKey) return CRYPTO_HAVE_ECDH = !1, 
          void DiffieHellman.call(this, key);
          this._isPriv && this._dh.setPrivateKey(key.part.d.data), this._dh.setPublicKey(key.part.Q.data);
        } else {
          if ("curve25519" !== key.type) throw new Error("DH not supported for " + key.type + " keys");
          this._isPriv && (utils.assertCompatible(key, PrivateKey, [ 1, 5 ], "key"), this._priv = key.part.k.data);
        }
      }
      function X9ECParameters(name) {
        var params = algs.curves[name];
        assert.object(params);
        var p = new jsbn(params.p), a = new jsbn(params.a), b = new jsbn(params.b), n = new jsbn(params.n), h = jsbn.ONE, curve = new ec.ECCurveFp(p, a, b), G = curve.decodePointHex(params.G.toString("hex"));
        this.curve = curve, this.g = G, this.n = n, this.h = h;
      }
      function ECPublic(params, buffer) {
        this._params = params, 0 === buffer[0] && (buffer = buffer.slice(1)), this._pub = params.getCurve().decodePointHex(buffer.toString("hex"));
      }
      function ECPrivate(params, buffer) {
        this._params = params, this._priv = new jsbn(utils.mpNormalize(buffer));
      }
      DiffieHellman.prototype.getPublicKey = function() {
        return this._isPriv ? this._key.toPublic() : this._key;
      }, DiffieHellman.prototype.getPrivateKey = function() {
        return this._isPriv ? this._key : void 0;
      }, DiffieHellman.prototype.getKey = DiffieHellman.prototype.getPrivateKey, DiffieHellman.prototype._keyCheck = function(pk, isPub) {
        if (assert.object(pk, "key"), isPub || utils.assertCompatible(pk, PrivateKey, [ 1, 3 ], "key"), 
        utils.assertCompatible(pk, Key, [ 1, 4 ], "key"), pk.type !== this._algo) throw new Error("A " + pk.type + " key cannot be used in " + this._algo + " Diffie-Hellman");
        if (pk.curve !== this._curve) throw new Error("A key from the " + pk.curve + " curve cannot be used with a " + this._curve + " Diffie-Hellman");
        "dsa" === pk.type && (assert.deepEqual(pk.part.p, this._p, "DSA key prime does not match"), 
        assert.deepEqual(pk.part.g, this._g, "DSA key generator does not match"));
      }, DiffieHellman.prototype.setKey = function(pk) {
        if (this._keyCheck(pk), "dsa" === pk.type) this._dh.setPrivateKey(pk.part.x.data), 
        this._dh.setPublicKey(pk.part.y.data); else if ("ecdsa" === pk.type) CRYPTO_HAVE_ECDH ? (this._dh.setPrivateKey(pk.part.d.data), 
        this._dh.setPublicKey(pk.part.Q.data)) : this._priv = new ECPrivate(this._ecParams, pk.part.d.data); else if ("curve25519" === pk.type) {
          var k = pk.part.k;
          pk.part.k || (k = pk.part.r), this._priv = k.data, 0 === this._priv[0] && (this._priv = this._priv.slice(1)), 
          this._priv = this._priv.slice(0, 32);
        }
        this._key = pk, this._isPriv = !0;
      }, DiffieHellman.prototype.setPrivateKey = DiffieHellman.prototype.setKey, DiffieHellman.prototype.computeSecret = function(otherpk) {
        if (this._keyCheck(otherpk, !0), !this._isPriv) throw new Error("DH exchange has not been initialized with a private key yet");
        var pub;
        if ("dsa" === this._algo) return this._dh.computeSecret(otherpk.part.y.data);
        if ("ecdsa" === this._algo) return CRYPTO_HAVE_ECDH ? this._dh.computeSecret(otherpk.part.Q.data) : (pub = new ECPublic(this._ecParams, otherpk.part.Q.data), 
        this._priv.deriveSharedSecret(pub));
        if ("curve25519" === this._algo) {
          for (pub = otherpk.part.A.data; 0 === pub[0] && pub.length > 32; ) pub = pub.slice(1);
          var priv = this._priv;
          assert.strictEqual(pub.length, 32), assert.strictEqual(priv.length, 32);
          var secret = nacl.box.before(new Uint8Array(pub), new Uint8Array(priv));
          return Buffer.from(secret);
        }
        throw new Error("Invalid algorithm: " + this._algo);
      }, DiffieHellman.prototype.generateKey = function() {
        var priv, pub, parts = [];
        if ("dsa" === this._algo) return this._dh.generateKeys(), parts.push({
          name: "p",
          data: this._p.data
        }), parts.push({
          name: "q",
          data: this._key.part.q.data
        }), parts.push({
          name: "g",
          data: this._g.data
        }), parts.push({
          name: "y",
          data: this._dh.getPublicKey()
        }), parts.push({
          name: "x",
          data: this._dh.getPrivateKey()
        }), this._key = new PrivateKey({
          type: "dsa",
          parts
        }), this._isPriv = !0, this._key;
        if ("ecdsa" === this._algo) {
          if (CRYPTO_HAVE_ECDH) return this._dh.generateKeys(), parts.push({
            name: "curve",
            data: Buffer.from(this._curve)
          }), parts.push({
            name: "Q",
            data: this._dh.getPublicKey()
          }), parts.push({
            name: "d",
            data: this._dh.getPrivateKey()
          }), this._key = new PrivateKey({
            type: "ecdsa",
            curve: this._curve,
            parts
          }), this._isPriv = !0, this._key;
          var n = this._ecParams.getN(), r = new jsbn(crypto.randomBytes(n.bitLength())), n1 = n.subtract(jsbn.ONE);
          return priv = r.mod(n1).add(jsbn.ONE), pub = this._ecParams.getG().multiply(priv), 
          priv = Buffer.from(priv.toByteArray()), pub = Buffer.from(this._ecParams.getCurve().encodePointHex(pub), "hex"), 
          this._priv = new ECPrivate(this._ecParams, priv), parts.push({
            name: "curve",
            data: Buffer.from(this._curve)
          }), parts.push({
            name: "Q",
            data: pub
          }), parts.push({
            name: "d",
            data: priv
          }), this._key = new PrivateKey({
            type: "ecdsa",
            curve: this._curve,
            parts
          }), this._isPriv = !0, this._key;
        }
        if ("curve25519" === this._algo) {
          var pair = nacl.box.keyPair();
          return priv = Buffer.from(pair.secretKey), pub = Buffer.from(pair.publicKey), priv = Buffer.concat([ priv, pub ]), 
          assert.strictEqual(priv.length, 64), assert.strictEqual(pub.length, 32), parts.push({
            name: "A",
            data: pub
          }), parts.push({
            name: "k",
            data: priv
          }), this._key = new PrivateKey({
            type: "curve25519",
            parts
          }), this._isPriv = !0, this._key;
        }
        throw new Error("Invalid algorithm: " + this._algo);
      }, DiffieHellman.prototype.generateKeys = DiffieHellman.prototype.generateKey, X9ECParameters.prototype.getCurve = function() {
        return this.curve;
      }, X9ECParameters.prototype.getG = function() {
        return this.g;
      }, X9ECParameters.prototype.getN = function() {
        return this.n;
      }, X9ECParameters.prototype.getH = function() {
        return this.h;
      }, ECPrivate.prototype.deriveSharedSecret = function(pubKey) {
        assert.ok(pubKey instanceof ECPublic);
        var S = pubKey._pub.multiply(this._priv);
        return Buffer.from(S.getX().toBigInteger().toByteArray());
      };
    },
    99683: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = {
        Verifier,
        Signer
      };
      var nacl = __webpack_require__(36046), stream = __webpack_require__(12781), util = __webpack_require__(73837), assert = __webpack_require__(2675), Buffer = __webpack_require__(12237).Buffer, Signature = __webpack_require__(56519);
      function Verifier(key, hashAlgo) {
        if ("sha512" !== hashAlgo.toLowerCase()) throw new Error("ED25519 only supports the use of SHA-512 hashes");
        this.key = key, this.chunks = [], stream.Writable.call(this, {});
      }
      function Signer(key, hashAlgo) {
        if ("sha512" !== hashAlgo.toLowerCase()) throw new Error("ED25519 only supports the use of SHA-512 hashes");
        this.key = key, this.chunks = [], stream.Writable.call(this, {});
      }
      util.inherits(Verifier, stream.Writable), Verifier.prototype._write = function(chunk, enc, cb) {
        this.chunks.push(chunk), cb();
      }, Verifier.prototype.update = function(chunk) {
        "string" == typeof chunk && (chunk = Buffer.from(chunk, "binary")), this.chunks.push(chunk);
      }, Verifier.prototype.verify = function(signature, fmt) {
        var sig;
        if (Signature.isSignature(signature, [ 2, 0 ])) {
          if ("ed25519" !== signature.type) return !1;
          sig = signature.toBuffer("raw");
        } else if ("string" == typeof signature) sig = Buffer.from(signature, "base64"); else if (Signature.isSignature(signature, [ 1, 0 ])) throw new Error("signature was created by too old a version of sshpk and cannot be verified");
        return assert.buffer(sig), nacl.sign.detached.verify(new Uint8Array(Buffer.concat(this.chunks)), new Uint8Array(sig), new Uint8Array(this.key.part.A.data));
      }, util.inherits(Signer, stream.Writable), Signer.prototype._write = function(chunk, enc, cb) {
        this.chunks.push(chunk), cb();
      }, Signer.prototype.update = function(chunk) {
        "string" == typeof chunk && (chunk = Buffer.from(chunk, "binary")), this.chunks.push(chunk);
      }, Signer.prototype.sign = function() {
        var sig = nacl.sign.detached(new Uint8Array(Buffer.concat(this.chunks)), new Uint8Array(Buffer.concat([ this.key.part.k.data, this.key.part.A.data ]))), sigBuf = Buffer.from(sig), sigObj = Signature.parse(sigBuf, "ed25519", "raw");
        return sigObj.hashAlgorithm = "sha512", sigObj;
      };
    },
    45638: (module, __unused_webpack_exports, __webpack_require__) => {
      __webpack_require__(2675);
      var util = __webpack_require__(73837);
      function FingerprintFormatError(fp, format) {
        Error.captureStackTrace && Error.captureStackTrace(this, FingerprintFormatError), 
        this.name = "FingerprintFormatError", this.fingerprint = fp, this.format = format, 
        this.message = "Fingerprint format is not supported, or is invalid: ", void 0 !== fp && (this.message += " fingerprint = " + fp), 
        void 0 !== format && (this.message += " format = " + format);
      }
      function InvalidAlgorithmError(alg) {
        Error.captureStackTrace && Error.captureStackTrace(this, InvalidAlgorithmError), 
        this.name = "InvalidAlgorithmError", this.algorithm = alg, this.message = 'Algorithm "' + alg + '" is not supported';
      }
      function KeyParseError(name, format, innerErr) {
        Error.captureStackTrace && Error.captureStackTrace(this, KeyParseError), this.name = "KeyParseError", 
        this.format = format, this.keyName = name, this.innerErr = innerErr, this.message = "Failed to parse " + name + " as a valid " + format + " format key: " + innerErr.message;
      }
      function SignatureParseError(type, format, innerErr) {
        Error.captureStackTrace && Error.captureStackTrace(this, SignatureParseError), this.name = "SignatureParseError", 
        this.type = type, this.format = format, this.innerErr = innerErr, this.message = "Failed to parse the given data as a " + type + " signature in " + format + " format: " + innerErr.message;
      }
      function CertificateParseError(name, format, innerErr) {
        Error.captureStackTrace && Error.captureStackTrace(this, CertificateParseError), 
        this.name = "CertificateParseError", this.format = format, this.certName = name, 
        this.innerErr = innerErr, this.message = "Failed to parse " + name + " as a valid " + format + " format certificate: " + innerErr.message;
      }
      function KeyEncryptedError(name, format) {
        Error.captureStackTrace && Error.captureStackTrace(this, KeyEncryptedError), this.name = "KeyEncryptedError", 
        this.format = format, this.keyName = name, this.message = "The " + format + " format key " + name + " is encrypted (password-protected), and no passphrase was provided in `options`";
      }
      util.inherits(FingerprintFormatError, Error), util.inherits(InvalidAlgorithmError, Error), 
      util.inherits(KeyParseError, Error), util.inherits(SignatureParseError, Error), 
      util.inherits(CertificateParseError, Error), util.inherits(KeyEncryptedError, Error), 
      module.exports = {
        FingerprintFormatError,
        InvalidAlgorithmError,
        KeyParseError,
        SignatureParseError,
        KeyEncryptedError,
        CertificateParseError
      };
    },
    97862: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = Fingerprint;
      var assert = __webpack_require__(2675), Buffer = __webpack_require__(12237).Buffer, algs = __webpack_require__(95878), crypto = __webpack_require__(6113), errs = __webpack_require__(45638), Key = __webpack_require__(7710), PrivateKey = __webpack_require__(53799), Certificate = __webpack_require__(45734), utils = __webpack_require__(25742), FingerprintFormatError = errs.FingerprintFormatError, InvalidAlgorithmError = errs.InvalidAlgorithmError;
      function Fingerprint(opts) {
        if (assert.object(opts, "options"), assert.string(opts.type, "options.type"), assert.buffer(opts.hash, "options.hash"), 
        assert.string(opts.algorithm, "options.algorithm"), this.algorithm = opts.algorithm.toLowerCase(), 
        !0 !== algs.hashAlgs[this.algorithm]) throw new InvalidAlgorithmError(this.algorithm);
        this.hash = opts.hash, this.type = opts.type, this.hashType = opts.hashType;
      }
      Fingerprint.prototype.toString = function(format) {
        switch (void 0 === format && (format = "md5" === this.algorithm || "spki" === this.hashType ? "hex" : "base64"), 
        assert.string(format), format) {
         case "hex":
          return "spki" === this.hashType ? this.hash.toString("hex") : this.hash.toString("hex").replace(/(.{2})(?=.)/g, "$1:");

         case "base64":
          return "spki" === this.hashType ? this.hash.toString("base64") : (alg = this.algorithm, 
          h = this.hash.toString("base64"), alg.toUpperCase() + ":" + function(s) {
            return s.replace(/=*$/, "");
          }(h));

         default:
          throw new FingerprintFormatError(void 0, format);
        }
        var alg, h;
      }, Fingerprint.prototype.matches = function(other) {
        assert.object(other, "key or certificate"), "key" === this.type && "ssh" !== this.hashType ? (utils.assertCompatible(other, Key, [ 1, 7 ], "key with spki"), 
        PrivateKey.isPrivateKey(other) && utils.assertCompatible(other, PrivateKey, [ 1, 6 ], "privatekey with spki support")) : "key" === this.type ? utils.assertCompatible(other, Key, [ 1, 0 ], "key") : utils.assertCompatible(other, Certificate, [ 1, 0 ], "certificate");
        var theirHash = other.hash(this.algorithm, this.hashType), theirHash2 = crypto.createHash(this.algorithm).update(theirHash).digest("base64");
        return void 0 === this.hash2 && (this.hash2 = crypto.createHash(this.algorithm).update(this.hash).digest("base64")), 
        this.hash2 === theirHash2;
      };
      var base64RE = /^[A-Za-z0-9+\/=]+$/, hexRE = /^[a-fA-F0-9]+$/;
      Fingerprint.parse = function(fp, options) {
        var alg, hash, enAlgs;
        assert.string(fp, "fingerprint"), Array.isArray(options) && (enAlgs = options, options = {}), 
        assert.optionalObject(options, "options"), void 0 === options && (options = {}), 
        void 0 !== options.enAlgs && (enAlgs = options.enAlgs), void 0 !== options.algorithms && (enAlgs = options.algorithms), 
        assert.optionalArrayOfString(enAlgs, "algorithms");
        var hashType = "ssh";
        void 0 !== options.hashType && (hashType = options.hashType), assert.string(hashType, "options.hashType");
        var parts = fp.split(":");
        if (2 == parts.length) {
          if (alg = parts[0].toLowerCase(), !base64RE.test(parts[1])) throw new FingerprintFormatError(fp);
          try {
            hash = Buffer.from(parts[1], "base64");
          } catch (e) {
            throw new FingerprintFormatError(fp);
          }
        } else if (parts.length > 2) {
          if (alg = "md5", "md5" === parts[0].toLowerCase() && (parts = parts.slice(1)), parts = (parts = parts.map((function(p) {
            for (;p.length < 2; ) p = "0" + p;
            if (p.length > 2) throw new FingerprintFormatError(fp);
            return p;
          }))).join(""), !hexRE.test(parts) || parts.length % 2 != 0) throw new FingerprintFormatError(fp);
          try {
            hash = Buffer.from(parts, "hex");
          } catch (e) {
            throw new FingerprintFormatError(fp);
          }
        } else {
          if (hexRE.test(fp)) hash = Buffer.from(fp, "hex"); else {
            if (!base64RE.test(fp)) throw new FingerprintFormatError(fp);
            hash = Buffer.from(fp, "base64");
          }
          switch (hash.length) {
           case 32:
            alg = "sha256";
            break;

           case 16:
            alg = "md5";
            break;

           case 20:
            alg = "sha1";
            break;

           case 64:
            alg = "sha512";
            break;

           default:
            throw new FingerprintFormatError(fp);
          }
          void 0 === options.hashType && (hashType = "spki");
        }
        if (void 0 === alg) throw new FingerprintFormatError(fp);
        if (void 0 === algs.hashAlgs[alg]) throw new InvalidAlgorithmError(alg);
        if (void 0 !== enAlgs && -1 === (enAlgs = enAlgs.map((function(a) {
          return a.toLowerCase();
        }))).indexOf(alg)) throw new InvalidAlgorithmError(alg);
        return new Fingerprint({
          algorithm: alg,
          hash,
          type: options.type || "key",
          hashType
        });
      }, Fingerprint.isFingerprint = function(obj, ver) {
        return utils.isCompatible(obj, Fingerprint, ver);
      }, Fingerprint.prototype._sshpkApiVersion = [ 1, 2 ], Fingerprint._oldVersionDetect = function(obj) {
        return assert.func(obj.toString), assert.func(obj.matches), [ 1, 0 ];
      };
    },
    80519: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = {
        read: function(buf, options) {
          if ("string" == typeof buf) {
            if (buf.trim().match(/^[-]+[ ]*BEGIN/)) return pem.read(buf, options);
            if (buf.match(/^\s*ssh-[a-z]/)) return ssh.read(buf, options);
            if (buf.match(/^\s*ecdsa-/)) return ssh.read(buf, options);
            if (buf.match(/^putty-user-key-file-2:/i)) return putty.read(buf, options);
            if (findDNSSECHeader(buf)) return dnssec.read(buf, options);
            buf = Buffer.from(buf, "binary");
          } else {
            if (assert.buffer(buf), function(buf) {
              var offset = 0;
              for (;offset < buf.length && (32 === buf[offset] || 10 === buf[offset]); ) ++offset;
              if (45 !== buf[offset]) return !1;
              for (;offset < buf.length && 45 === buf[offset]; ) ++offset;
              for (;offset < buf.length && 32 === buf[offset]; ) ++offset;
              return !(offset + 5 > buf.length || "BEGIN" !== buf.slice(offset, offset + 5).toString("ascii"));
            }(buf)) return pem.read(buf, options);
            if (function(buf) {
              var offset = 0;
              for (;offset < buf.length && (32 === buf[offset] || 10 === buf[offset] || 9 === buf[offset]); ) ++offset;
              return offset + 4 <= buf.length && "ssh-" === buf.slice(offset, offset + 4).toString("ascii") || offset + 6 <= buf.length && "ecdsa-" === buf.slice(offset, offset + 6).toString("ascii");
            }(buf)) return ssh.read(buf, options);
            if (function(buf) {
              var offset = 0;
              for (;offset < buf.length && (32 === buf[offset] || 10 === buf[offset] || 9 === buf[offset]); ) ++offset;
              return offset + 22 <= buf.length && "putty-user-key-file-2:" === buf.slice(offset, offset + 22).toString("ascii").toLowerCase();
            }(buf)) return putty.read(buf, options);
            if (findDNSSECHeader(buf)) return dnssec.read(buf, options);
          }
          if (buf.readUInt32BE(0) < buf.length) return rfc4253.read(buf, options);
          throw new Error("Failed to auto-detect format of key");
        },
        write: function(key, options) {
          throw new Error('"auto" format cannot be used for writing');
        }
      };
      var assert = __webpack_require__(2675), Buffer = __webpack_require__(12237).Buffer, pem = (__webpack_require__(25742), 
      __webpack_require__(7710), __webpack_require__(53799), __webpack_require__(42834)), ssh = __webpack_require__(98916), rfc4253 = __webpack_require__(40594), dnssec = __webpack_require__(12646), putty = __webpack_require__(34820);
      function findDNSSECHeader(buf) {
        if (buf.length <= "Private-key-format: v1".length) return !1;
        if ("Private-key-format: v1" === buf.slice(0, "Private-key-format: v1".length).toString("ascii")) return !0;
        "string" != typeof buf && (buf = buf.toString("ascii"));
        for (var lines = buf.split("\n"), line = 0; lines[line].match(/^\;/); ) line++;
        return !!lines[line].toString("ascii").match(/\. IN KEY /) || !!lines[line].toString("ascii").match(/\. IN DNSKEY /);
      }
    },
    12646: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = {
        read: function(buf, options) {
          "string" != typeof buf && (assert.buffer(buf, "buf"), buf = buf.toString("ascii"));
          var lines = buf.split("\n");
          if (lines[0].match(/^Private-key-format\: v1/)) {
            var algElems = lines[1].split(" "), algoNum = parseInt(algElems[1], 10), algoName = algElems[2];
            if (!supportedAlgosById[algoNum]) throw new Error("Unsupported algorithm: " + algoName);
            return function(alg, elements) {
              if (supportedAlgosById[alg].match(/^RSA-/)) return function(elements) {
                var rsaParams = {};
                elements.forEach((function(element) {
                  "Modulus:" === element.split(" ")[0] ? rsaParams.n = elementToBuf(element) : "PublicExponent:" === element.split(" ")[0] ? rsaParams.e = elementToBuf(element) : "PrivateExponent:" === element.split(" ")[0] ? rsaParams.d = elementToBuf(element) : "Prime1:" === element.split(" ")[0] ? rsaParams.p = elementToBuf(element) : "Prime2:" === element.split(" ")[0] ? rsaParams.q = elementToBuf(element) : "Exponent1:" === element.split(" ")[0] ? rsaParams.dmodp = elementToBuf(element) : "Exponent2:" === element.split(" ")[0] ? rsaParams.dmodq = elementToBuf(element) : "Coefficient:" === element.split(" ")[0] && (rsaParams.iqmp = elementToBuf(element));
                }));
                var key = {
                  type: "rsa",
                  parts: [ {
                    name: "e",
                    data: utils.mpNormalize(rsaParams.e)
                  }, {
                    name: "n",
                    data: utils.mpNormalize(rsaParams.n)
                  }, {
                    name: "d",
                    data: utils.mpNormalize(rsaParams.d)
                  }, {
                    name: "p",
                    data: utils.mpNormalize(rsaParams.p)
                  }, {
                    name: "q",
                    data: utils.mpNormalize(rsaParams.q)
                  }, {
                    name: "dmodp",
                    data: utils.mpNormalize(rsaParams.dmodp)
                  }, {
                    name: "dmodq",
                    data: utils.mpNormalize(rsaParams.dmodq)
                  }, {
                    name: "iqmp",
                    data: utils.mpNormalize(rsaParams.iqmp)
                  } ]
                };
                return new PrivateKey(key);
              }(elements);
              if ("ECDSA-P384-SHA384" === supportedAlgosById[alg] || "ECDSA-P256-SHA256" === supportedAlgosById[alg]) {
                var d = Buffer.from(elements[0].split(" ")[1], "base64"), curve = "nistp384", size = 384;
                "ECDSA-P256-SHA256" === supportedAlgosById[alg] && (curve = "nistp256", size = 256);
                var Q = utils.publicFromPrivateECDSA(curve, d).part.Q.data, ecdsaKey = {
                  type: "ecdsa",
                  curve,
                  size,
                  parts: [ {
                    name: "curve",
                    data: Buffer.from(curve)
                  }, {
                    name: "d",
                    data: d
                  }, {
                    name: "Q",
                    data: Q
                  } ]
                };
                return new PrivateKey(ecdsaKey);
              }
              throw new Error("Unsupported algorithm: " + supportedAlgosById[alg]);
            }(algoNum, lines.slice(2));
          }
          var line = 0;
          for (;lines[line].match(/^\;/); ) line++;
          if ((lines[line].match(/\. IN KEY /) || lines[line].match(/\. IN DNSKEY /)) && 0 === lines[line + 1].length) return function(keyString) {
            var elems = keyString.split(" "), algorithm = parseInt(elems[5], 10);
            if (!supportedAlgosById[algorithm]) throw new Error("Unsupported algorithm: " + algorithm);
            var base64key = elems.slice(6, elems.length).join(), keyBuffer = Buffer.from(base64key, "base64");
            if (supportedAlgosById[algorithm].match(/^RSA-/)) {
              var publicExponentLen = keyBuffer.readUInt8(0);
              if (3 != publicExponentLen && 1 != publicExponentLen) throw new Error("Cannot parse dnssec key: unsupported exponent length");
              var publicExponent = keyBuffer.slice(1, publicExponentLen + 1);
              publicExponent = utils.mpNormalize(publicExponent);
              var modulus = keyBuffer.slice(1 + publicExponentLen);
              modulus = utils.mpNormalize(modulus);
              var rsaKey = {
                type: "rsa",
                parts: []
              };
              return rsaKey.parts.push({
                name: "e",
                data: publicExponent
              }), rsaKey.parts.push({
                name: "n",
                data: modulus
              }), new Key(rsaKey);
            }
            if ("ECDSA-P384-SHA384" === supportedAlgosById[algorithm] || "ECDSA-P256-SHA256" === supportedAlgosById[algorithm]) {
              var curve = "nistp384", size = 384;
              supportedAlgosById[algorithm].match(/^ECDSA-P256-SHA256/) && (curve = "nistp256", 
              size = 256);
              var ecdsaKey = {
                type: "ecdsa",
                curve,
                size,
                parts: [ {
                  name: "curve",
                  data: Buffer.from(curve)
                }, {
                  name: "Q",
                  data: utils.ecNormalize(keyBuffer)
                } ]
              };
              return new Key(ecdsaKey);
            }
            throw new Error("Unsupported algorithm: " + supportedAlgosById[algorithm]);
          }(lines[line]);
          throw new Error("Cannot parse dnssec key");
        },
        write: function(key, options) {
          if (PrivateKey.isPrivateKey(key)) {
            if ("rsa" === key.type) return function(key, options) {
              key.part.dmodp && key.part.dmodq || utils.addRSAMissing(key);
              var out = "";
              out += "Private-key-format: v1.3\n", out += "Algorithm: " + function(opts) {
                if (opts && opts.hashAlgo && "sha1" !== opts.hashAlgo) {
                  if ("sha256" === opts.hashAlgo) return "8 (RSASHA256)";
                  if ("sha512" === opts.hashAlgo) return "10 (RSASHA512)";
                  throw new Error("Unknown or unsupported hash: " + opts.hashAlgo);
                }
                return "5 (RSASHA1)";
              }(options) + "\n";
              var n = utils.mpDenormalize(key.part.n.data);
              out += "Modulus: " + n.toString("base64") + "\n";
              var e = utils.mpDenormalize(key.part.e.data);
              out += "PublicExponent: " + e.toString("base64") + "\n";
              var d = utils.mpDenormalize(key.part.d.data);
              out += "PrivateExponent: " + d.toString("base64") + "\n";
              var p = utils.mpDenormalize(key.part.p.data);
              out += "Prime1: " + p.toString("base64") + "\n";
              var q = utils.mpDenormalize(key.part.q.data);
              out += "Prime2: " + q.toString("base64") + "\n";
              var dmodp = utils.mpDenormalize(key.part.dmodp.data);
              out += "Exponent1: " + dmodp.toString("base64") + "\n";
              var dmodq = utils.mpDenormalize(key.part.dmodq.data);
              out += "Exponent2: " + dmodq.toString("base64") + "\n";
              var iqmp = utils.mpDenormalize(key.part.iqmp.data);
              out += "Coefficient: " + iqmp.toString("base64") + "\n";
              var timestamp = new Date;
              return out += "Created: " + dnssecTimestamp(timestamp) + "\n", out += "Publish: " + dnssecTimestamp(timestamp) + "\n", 
              out += "Activate: " + dnssecTimestamp(timestamp) + "\n", Buffer.from(out, "ascii");
            }(key, options);
            if ("ecdsa" === key.type) return function(key, options) {
              var out = "";
              if (out += "Private-key-format: v1.3\n", "nistp256" === key.curve) out += "Algorithm: 13 (ECDSAP256SHA256)\n"; else {
                if ("nistp384" !== key.curve) throw new Error("Unsupported curve");
                out += "Algorithm: 14 (ECDSAP384SHA384)\n";
              }
              var base64Key = key.part.d.data.toString("base64");
              out += "PrivateKey: " + base64Key + "\n";
              var timestamp = new Date;
              return out += "Created: " + dnssecTimestamp(timestamp) + "\n", out += "Publish: " + dnssecTimestamp(timestamp) + "\n", 
              out += "Activate: " + dnssecTimestamp(timestamp) + "\n", Buffer.from(out, "ascii");
            }(key);
            throw new Error("Unsupported algorithm: " + key.type);
          }
          throw Key.isKey(key) ? new Error('Format "dnssec" only supports writing private keys') : new Error("key is not a Key or PrivateKey");
        }
      };
      var assert = __webpack_require__(2675), Buffer = __webpack_require__(12237).Buffer, Key = __webpack_require__(7710), PrivateKey = __webpack_require__(53799), utils = __webpack_require__(25742), supportedAlgos = (__webpack_require__(14685), 
      __webpack_require__(18857), {
        "rsa-sha1": 5,
        "rsa-sha256": 8,
        "rsa-sha512": 10,
        "ecdsa-p256-sha256": 13,
        "ecdsa-p384-sha384": 14
      }), supportedAlgosById = {};
      function elementToBuf(e) {
        return Buffer.from(e.split(" ")[1], "base64");
      }
      function dnssecTimestamp(date) {
        var timestampStr = date.getFullYear() + "" + (date.getMonth() + 1) + date.getUTCDate();
        return timestampStr += "" + date.getUTCHours() + date.getUTCMinutes(), timestampStr += date.getUTCSeconds();
      }
      Object.keys(supportedAlgos).forEach((function(k) {
        supportedAlgosById[supportedAlgos[k]] = k.toUpperCase();
      }));
    },
    27478: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = {
        read: function(buf, options) {
          Buffer.isBuffer(buf) && (buf = buf.toString("ascii"));
          var parts = buf.trim().split(/[ \t\n]+/g);
          if (parts.length < 2 || parts.length > 3) throw new Error("Not a valid SSH certificate line");
          var algo = parts[0], data = parts[1];
          return fromBuffer(data = Buffer.from(data, "base64"), algo);
        },
        verify: function(cert, key) {
          return !1;
        },
        sign: function(cert, key) {
          void 0 === cert.signatures.openssh && (cert.signatures.openssh = {});
          try {
            var blob = toBuffer(cert, !0);
          } catch (e) {
            return delete cert.signatures.openssh, !1;
          }
          var sig = cert.signatures.openssh, hashAlgo = void 0;
          "rsa" !== key.type && "dsa" !== key.type || (hashAlgo = "sha1");
          var signer = key.createSign(hashAlgo);
          return signer.write(blob), sig.signature = signer.sign(), !0;
        },
        signAsync: function(cert, signer, done) {
          void 0 === cert.signatures.openssh && (cert.signatures.openssh = {});
          try {
            var blob = toBuffer(cert, !0);
          } catch (e) {
            return delete cert.signatures.openssh, void done(e);
          }
          var sig = cert.signatures.openssh;
          signer(blob, (function(err, signature) {
            if (err) done(err); else {
              try {
                signature.toBuffer("ssh");
              } catch (e) {
                return void done(e);
              }
              sig.signature = signature, done();
            }
          }));
        },
        write: function(cert, options) {
          void 0 === options && (options = {});
          var blob = toBuffer(cert), out = getCertType(cert.subjectKey) + " " + blob.toString("base64");
          options.comment && (out = out + " " + options.comment);
          return out;
        },
        fromBuffer,
        toBuffer
      };
      var assert = __webpack_require__(2675), SSHBuffer = __webpack_require__(14685), crypto = __webpack_require__(6113), Buffer = __webpack_require__(12237).Buffer, algs = __webpack_require__(95878), Key = __webpack_require__(7710), Identity = (__webpack_require__(53799), 
      __webpack_require__(46e3)), rfc4253 = __webpack_require__(40594), Signature = __webpack_require__(56519), utils = __webpack_require__(25742), Certificate = __webpack_require__(45734);
      var TYPES = {
        user: 1,
        host: 2
      };
      Object.keys(TYPES).forEach((function(k) {
        TYPES[TYPES[k]] = k;
      }));
      var ECDSA_ALGO = /^ecdsa-sha2-([^@-]+)-cert-v01@openssh.com$/;
      function fromBuffer(data, algo, partial) {
        var sshbuf = new SSHBuffer({
          buffer: data
        }), innerAlgo = sshbuf.readString();
        if (void 0 !== algo && innerAlgo !== algo) throw new Error("SSH certificate algorithm mismatch");
        void 0 === algo && (algo = innerAlgo);
        var cert = {
          signatures: {}
        };
        cert.signatures.openssh = {}, cert.signatures.openssh.nonce = sshbuf.readBuffer();
        var key = {}, parts = key.parts = [];
        key.type = function(certType) {
          if ("ssh-rsa-cert-v01@openssh.com" === certType) return "rsa";
          if ("ssh-dss-cert-v01@openssh.com" === certType) return "dsa";
          if (certType.match(ECDSA_ALGO)) return "ecdsa";
          if ("ssh-ed25519-cert-v01@openssh.com" === certType) return "ed25519";
          throw new Error("Unsupported cert type " + certType);
        }(algo);
        for (var partCount = algs.info[key.type].parts.length; parts.length < partCount; ) parts.push(sshbuf.readPart());
        assert.ok(parts.length >= 1, "key must have at least one part");
        var algInfo = algs.info[key.type];
        if ("ecdsa" === key.type) {
          var res = ECDSA_ALGO.exec(algo);
          assert.ok(null !== res), assert.strictEqual(res[1], parts[0].data.toString());
        }
        for (var i = 0; i < algInfo.parts.length; ++i) if (parts[i].name = algInfo.parts[i], 
        "curve" !== parts[i].name && !1 !== algInfo.normalize) {
          var p = parts[i];
          p.data = utils.mpNormalize(p.data);
        }
        cert.subjectKey = new Key(key), cert.serial = sshbuf.readInt64();
        var type = TYPES[sshbuf.readInt()];
        assert.string(type, "valid cert type"), cert.signatures.openssh.keyId = sshbuf.readString();
        for (var principals = [], pbuf = sshbuf.readBuffer(), psshbuf = new SSHBuffer({
          buffer: pbuf
        }); !psshbuf.atEnd(); ) principals.push(psshbuf.readString());
        0 === principals.length && (principals = [ "*" ]), cert.subjects = principals.map((function(pr) {
          if ("user" === type) return Identity.forUser(pr);
          if ("host" === type) return Identity.forHost(pr);
          throw new Error("Unknown identity type " + type);
        })), cert.validFrom = int64ToDate(sshbuf.readInt64()), cert.validUntil = int64ToDate(sshbuf.readInt64());
        for (var ext, exts = [], extbuf = new SSHBuffer({
          buffer: sshbuf.readBuffer()
        }); !extbuf.atEnd(); ) (ext = {
          critical: !0
        }).name = extbuf.readString(), ext.data = extbuf.readBuffer(), exts.push(ext);
        for (extbuf = new SSHBuffer({
          buffer: sshbuf.readBuffer()
        }); !extbuf.atEnd(); ) (ext = {
          critical: !1
        }).name = extbuf.readString(), ext.data = extbuf.readBuffer(), exts.push(ext);
        cert.signatures.openssh.exts = exts, sshbuf.readBuffer();
        var signingKeyBuf = sshbuf.readBuffer();
        cert.issuerKey = rfc4253.read(signingKeyBuf), cert.issuer = Identity.forHost("**");
        var sigBuf = sshbuf.readBuffer();
        return cert.signatures.openssh.signature = Signature.parse(sigBuf, cert.issuerKey.type, "ssh"), 
        void 0 !== partial && (partial.remainder = sshbuf.remainder(), partial.consumed = sshbuf._offset), 
        new Certificate(cert);
      }
      function int64ToDate(buf) {
        var i = 4294967296 * buf.readUInt32BE(0);
        i += buf.readUInt32BE(4);
        var d = new Date;
        return d.setTime(1e3 * i), d.sourceInt64 = buf, d;
      }
      function dateToInt64(date) {
        if (void 0 !== date.sourceInt64) return date.sourceInt64;
        var i = Math.round(date.getTime() / 1e3), upper = Math.floor(i / 4294967296), lower = Math.floor(i % 4294967296), buf = Buffer.alloc(8);
        return buf.writeUInt32BE(upper, 0), buf.writeUInt32BE(lower, 4), buf;
      }
      function toBuffer(cert, noSig) {
        assert.object(cert.signatures.openssh, "signature for openssh format");
        var sig = cert.signatures.openssh;
        void 0 === sig.nonce && (sig.nonce = crypto.randomBytes(16));
        var buf = new SSHBuffer({});
        buf.writeString(getCertType(cert.subjectKey)), buf.writeBuffer(sig.nonce);
        var key = cert.subjectKey;
        algs.info[key.type].parts.forEach((function(part) {
          buf.writePart(key.part[part]);
        })), buf.writeInt64(cert.serial);
        var type = cert.subjects[0].type;
        assert.notStrictEqual(type, "unknown"), cert.subjects.forEach((function(id) {
          assert.strictEqual(id.type, type);
        })), type = TYPES[type], buf.writeInt(type), void 0 === sig.keyId && (sig.keyId = cert.subjects[0].type + "_" + (cert.subjects[0].uid || cert.subjects[0].hostname)), 
        buf.writeString(sig.keyId);
        var sub = new SSHBuffer({});
        cert.subjects.forEach((function(id) {
          type === TYPES.host ? sub.writeString(id.hostname) : type === TYPES.user && sub.writeString(id.uid);
        })), buf.writeBuffer(sub.toBuffer()), buf.writeInt64(dateToInt64(cert.validFrom)), 
        buf.writeInt64(dateToInt64(cert.validUntil));
        var exts = sig.exts;
        void 0 === exts && (exts = []);
        var extbuf = new SSHBuffer({});
        return exts.forEach((function(ext) {
          !0 === ext.critical && (extbuf.writeString(ext.name), extbuf.writeBuffer(ext.data));
        })), buf.writeBuffer(extbuf.toBuffer()), extbuf = new SSHBuffer({}), exts.forEach((function(ext) {
          !0 !== ext.critical && (extbuf.writeString(ext.name), extbuf.writeBuffer(ext.data));
        })), buf.writeBuffer(extbuf.toBuffer()), buf.writeBuffer(Buffer.alloc(0)), sub = rfc4253.write(cert.issuerKey), 
        buf.writeBuffer(sub), noSig || buf.writeBuffer(sig.signature.toBuffer("ssh")), buf.toBuffer();
      }
      function getCertType(key) {
        if ("rsa" === key.type) return "ssh-rsa-cert-v01@openssh.com";
        if ("dsa" === key.type) return "ssh-dss-cert-v01@openssh.com";
        if ("ecdsa" === key.type) return "ecdsa-sha2-" + key.curve + "-cert-v01@openssh.com";
        if ("ed25519" === key.type) return "ssh-ed25519-cert-v01@openssh.com";
        throw new Error("Unsupported key type " + key.type);
      }
    },
    42834: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = {
        read: function(buf, options, forceType) {
          var input = buf;
          "string" != typeof buf && (assert.buffer(buf, "buf"), buf = buf.toString("ascii"));
          var m, m2, lines = buf.trim().split(/[\r\n]+/g), si = -1;
          for (;!m && si < lines.length; ) m = lines[++si].match(/[-]+[ ]*BEGIN ([A-Z0-9][A-Za-z0-9]+ )?(PUBLIC|PRIVATE) KEY[ ]*[-]+/);
          assert.ok(m, "invalid PEM header");
          var ei = lines.length;
          for (;!m2 && ei > 0; ) m2 = lines[--ei].match(/[-]+[ ]*END ([A-Z0-9][A-Za-z0-9]+ )?(PUBLIC|PRIVATE) KEY[ ]*[-]+/);
          assert.ok(m2, "invalid PEM footer"), assert.equal(m[2], m2[2]);
          var alg, type = m[2].toLowerCase();
          m[1] && (assert.equal(m[1], m2[1], "PEM header and footer mismatch"), alg = m[1].trim());
          lines = lines.slice(si, ei + 1);
          var cipher, key, iv, headers = {};
          for (;lines = lines.slice(1), m = lines[0].match(/^([A-Za-z0-9-]+): (.+)$/); ) headers[m[1].toLowerCase()] = m[2];
          if (lines = lines.slice(0, -1).join(""), buf = Buffer.from(lines, "base64"), headers["proc-type"]) {
            var parts = headers["proc-type"].split(",");
            if ("4" === parts[0] && "ENCRYPTED" === parts[1]) {
              if ("string" == typeof options.passphrase && (options.passphrase = Buffer.from(options.passphrase, "utf-8")), 
              !Buffer.isBuffer(options.passphrase)) throw new errors.KeyEncryptedError(options.filename, "PEM");
              parts = headers["dek-info"].split(","), assert.ok(2 === parts.length), cipher = parts[0].toLowerCase(), 
              iv = Buffer.from(parts[1], "hex"), key = utils.opensslKeyDeriv(cipher, iv, options.passphrase, 1).key;
            }
          }
          if (alg && "encrypted" === alg.toLowerCase()) {
            var pbesEnd, eder = new asn1.BerReader(buf);
            eder.readSequence(), eder.readSequence(), pbesEnd = eder.offset + eder.length;
            var method = eder.readOID();
            if ("1.2.840.113549.1.5.13" !== method) throw new Error("Unsupported PEM/PKCS8 encryption scheme: " + method);
            eder.readSequence(), eder.readSequence();
            var kdfEnd = eder.offset + eder.length, kdfOid = eder.readOID();
            if ("1.2.840.113549.1.5.12" !== kdfOid) throw new Error("Unsupported PBES2 KDF: " + kdfOid);
            eder.readSequence();
            var salt = eder.readString(asn1.Ber.OctetString, !0), iterations = eder.readInt(), hashAlg = "sha1";
            if (eder.offset < kdfEnd) {
              eder.readSequence();
              var hashAlgOid = eder.readOID();
              if (void 0 === (hashAlg = OID_TO_HASH[hashAlgOid])) throw new Error("Unsupported PBKDF2 hash: " + hashAlgOid);
            }
            eder._offset = kdfEnd, eder.readSequence();
            var cipherOid = eder.readOID();
            if (void 0 === (cipher = OID_TO_CIPHER[cipherOid])) throw new Error("Unsupported PBES2 cipher: " + cipherOid);
            if (iv = eder.readString(asn1.Ber.OctetString, !0), eder._offset = pbesEnd, buf = eder.readString(asn1.Ber.OctetString, !0), 
            "string" == typeof options.passphrase && (options.passphrase = Buffer.from(options.passphrase, "utf-8")), 
            !Buffer.isBuffer(options.passphrase)) throw new errors.KeyEncryptedError(options.filename, "PEM");
            var cinfo = utils.opensshCipherInfo(cipher);
            cipher = cinfo.opensslName, key = utils.pbkdf2(hashAlg, salt, iterations, cinfo.keySize, options.passphrase), 
            alg = void 0;
          }
          if (cipher && key && iv) {
            var chunk, cipherStream = crypto.createDecipheriv(cipher, key, iv), chunks = [];
            for (cipherStream.once("error", (function(e) {
              if (-1 !== e.toString().indexOf("bad decrypt")) throw new Error("Incorrect passphrase supplied, could not decrypt key");
              throw e;
            })), cipherStream.write(buf), cipherStream.end(); null !== (chunk = cipherStream.read()); ) chunks.push(chunk);
            buf = Buffer.concat(chunks);
          }
          if (alg && "openssh" === alg.toLowerCase()) return sshpriv.readSSHPrivate(type, buf, options);
          if (alg && "ssh2" === alg.toLowerCase()) return rfc4253.readType(type, buf, options);
          var der = new asn1.BerReader(buf);
          return der.originalInput = input, der.readSequence(), alg ? (forceType && assert.strictEqual(forceType, "pkcs1"), 
          pkcs1.readPkcs1(alg, type, der)) : (forceType && assert.strictEqual(forceType, "pkcs8"), 
          pkcs8.readPkcs8(alg, type, der));
        },
        write: function(key, options, type) {
          assert.object(key);
          var header, alg = {
            ecdsa: "EC",
            rsa: "RSA",
            dsa: "DSA",
            ed25519: "EdDSA"
          }[key.type], der = new asn1.BerWriter;
          if (PrivateKey.isPrivateKey(key)) type && "pkcs8" === type ? (header = "PRIVATE KEY", 
          pkcs8.writePkcs8(der, key)) : (type && assert.strictEqual(type, "pkcs1"), header = alg + " PRIVATE KEY", 
          pkcs1.writePkcs1(der, key)); else {
            if (!Key.isKey(key)) throw new Error("key is not a Key or PrivateKey");
            type && "pkcs1" === type ? (header = alg + " PUBLIC KEY", pkcs1.writePkcs1(der, key)) : (type && assert.strictEqual(type, "pkcs8"), 
            header = "PUBLIC KEY", pkcs8.writePkcs8(der, key));
          }
          var tmp = der.buffer.toString("base64"), len = tmp.length + tmp.length / 64 + 18 + 16 + 2 * header.length + 10, buf = Buffer.alloc(len), o = 0;
          o += buf.write("-----BEGIN " + header + "-----\n", o);
          for (var i = 0; i < tmp.length; ) {
            var limit = i + 64;
            limit > tmp.length && (limit = tmp.length), o += buf.write(tmp.slice(i, limit), o), 
            buf[o++] = 10, i = limit;
          }
          return o += buf.write("-----END " + header + "-----\n", o), buf.slice(0, o);
        }
      };
      var assert = __webpack_require__(2675), asn1 = __webpack_require__(58814), crypto = __webpack_require__(6113), Buffer = __webpack_require__(12237).Buffer, utils = (__webpack_require__(95878), 
      __webpack_require__(25742)), Key = __webpack_require__(7710), PrivateKey = __webpack_require__(53799), pkcs1 = __webpack_require__(43808), pkcs8 = __webpack_require__(10071), sshpriv = __webpack_require__(14650), rfc4253 = __webpack_require__(40594), errors = __webpack_require__(45638), OID_TO_CIPHER = {
        "1.2.840.113549.3.7": "3des-cbc",
        "2.16.840.1.101.3.4.1.2": "aes128-cbc",
        "2.16.840.1.101.3.4.1.42": "aes256-cbc"
      }, CIPHER_TO_OID = {};
      Object.keys(OID_TO_CIPHER).forEach((function(k) {
        CIPHER_TO_OID[OID_TO_CIPHER[k]] = k;
      }));
      var OID_TO_HASH = {
        "1.2.840.113549.2.7": "sha1",
        "1.2.840.113549.2.9": "sha256",
        "1.2.840.113549.2.11": "sha512"
      }, HASH_TO_OID = {};
      Object.keys(OID_TO_HASH).forEach((function(k) {
        HASH_TO_OID[OID_TO_HASH[k]] = k;
      }));
    },
    43808: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = {
        read: function(buf, options) {
          return pem.read(buf, options, "pkcs1");
        },
        readPkcs1: function(alg, type, der) {
          switch (alg) {
           case "RSA":
            if ("public" === type) return function(der) {
              var n = readMPInt(der, "modulus"), e = readMPInt(der, "exponent");
              return new Key({
                type: "rsa",
                parts: [ {
                  name: "e",
                  data: e
                }, {
                  name: "n",
                  data: n
                } ]
              });
            }(der);
            if ("private" === type) return function(der) {
              var version = readMPInt(der, "version");
              assert.strictEqual(version[0], 0);
              var n = readMPInt(der, "modulus"), e = readMPInt(der, "public exponent"), d = readMPInt(der, "private exponent"), p = readMPInt(der, "prime1"), q = readMPInt(der, "prime2"), dmodp = readMPInt(der, "exponent1"), dmodq = readMPInt(der, "exponent2"), iqmp = readMPInt(der, "iqmp");
              return new PrivateKey({
                type: "rsa",
                parts: [ {
                  name: "n",
                  data: n
                }, {
                  name: "e",
                  data: e
                }, {
                  name: "d",
                  data: d
                }, {
                  name: "iqmp",
                  data: iqmp
                }, {
                  name: "p",
                  data: p
                }, {
                  name: "q",
                  data: q
                }, {
                  name: "dmodp",
                  data: dmodp
                }, {
                  name: "dmodq",
                  data: dmodq
                } ]
              });
            }(der);
            throw new Error("Unknown key type: " + type);

           case "DSA":
            if ("public" === type) return function(der) {
              var y = readMPInt(der, "y"), p = readMPInt(der, "p"), q = readMPInt(der, "q"), g = readMPInt(der, "g");
              return new Key({
                type: "dsa",
                parts: [ {
                  name: "y",
                  data: y
                }, {
                  name: "p",
                  data: p
                }, {
                  name: "q",
                  data: q
                }, {
                  name: "g",
                  data: g
                } ]
              });
            }(der);
            if ("private" === type) return function(der) {
              var version = readMPInt(der, "version");
              assert.strictEqual(version.readUInt8(0), 0);
              var p = readMPInt(der, "p"), q = readMPInt(der, "q"), g = readMPInt(der, "g"), y = readMPInt(der, "y"), x = readMPInt(der, "x");
              return new PrivateKey({
                type: "dsa",
                parts: [ {
                  name: "p",
                  data: p
                }, {
                  name: "q",
                  data: q
                }, {
                  name: "g",
                  data: g
                }, {
                  name: "y",
                  data: y
                }, {
                  name: "x",
                  data: x
                } ]
              });
            }(der);
            throw new Error("Unknown key type: " + type);

           case "EC":
           case "ECDSA":
            if ("private" === type) return function(der) {
              var version = readMPInt(der, "version");
              assert.strictEqual(version.readUInt8(0), 1);
              var d = der.readString(asn1.Ber.OctetString, !0);
              der.readSequence(160);
              var curve = readECDSACurve(der);
              assert.string(curve, "a known elliptic curve"), der.readSequence(161);
              var Q = der.readString(asn1.Ber.BitString, !0);
              Q = utils.ecNormalize(Q);
              var key = {
                type: "ecdsa",
                parts: [ {
                  name: "curve",
                  data: Buffer.from(curve)
                }, {
                  name: "Q",
                  data: Q
                }, {
                  name: "d",
                  data: d
                } ]
              };
              return new PrivateKey(key);
            }(der);
            if ("public" === type) return function(der) {
              der.readSequence();
              var oid = der.readOID();
              assert.strictEqual(oid, "1.2.840.10045.2.1", "must be ecPublicKey");
              for (var curve, curveOid = der.readOID(), curves = Object.keys(algs.curves), j = 0; j < curves.length; ++j) {
                var c = curves[j];
                if (algs.curves[c].pkcs8oid === curveOid) {
                  curve = c;
                  break;
                }
              }
              assert.string(curve, "a known ECDSA named curve");
              var Q = der.readString(asn1.Ber.BitString, !0);
              Q = utils.ecNormalize(Q);
              var key = {
                type: "ecdsa",
                parts: [ {
                  name: "curve",
                  data: Buffer.from(curve)
                }, {
                  name: "Q",
                  data: Q
                } ]
              };
              return new Key(key);
            }(der);
            throw new Error("Unknown key type: " + type);

           case "EDDSA":
           case "EdDSA":
            if ("private" === type) return function(der) {
              var version = readMPInt(der, "version");
              assert.strictEqual(version.readUInt8(0), 1);
              var k = der.readString(asn1.Ber.OctetString, !0);
              der.readSequence(160);
              var oid = der.readOID();
              assert.strictEqual(oid, "1.3.101.112", "the ed25519 curve identifier"), der.readSequence(161);
              var A = utils.readBitString(der), key = {
                type: "ed25519",
                parts: [ {
                  name: "A",
                  data: utils.zeroPadToLength(A, 32)
                }, {
                  name: "k",
                  data: k
                } ]
              };
              return new PrivateKey(key);
            }(der);
            throw new Error(type + " keys not supported with EdDSA");

           default:
            throw new Error("Unknown key algo: " + alg);
          }
        },
        write: function(key, options) {
          return pem.write(key, options, "pkcs1");
        },
        writePkcs1: function(der, key) {
          switch (der.startSequence(), key.type) {
           case "rsa":
            PrivateKey.isPrivateKey(key) ? function(der, key) {
              var ver = Buffer.from([ 0 ]);
              der.writeBuffer(ver, asn1.Ber.Integer), der.writeBuffer(key.part.n.data, asn1.Ber.Integer), 
              der.writeBuffer(key.part.e.data, asn1.Ber.Integer), der.writeBuffer(key.part.d.data, asn1.Ber.Integer), 
              der.writeBuffer(key.part.p.data, asn1.Ber.Integer), der.writeBuffer(key.part.q.data, asn1.Ber.Integer), 
              key.part.dmodp && key.part.dmodq || utils.addRSAMissing(key);
              der.writeBuffer(key.part.dmodp.data, asn1.Ber.Integer), der.writeBuffer(key.part.dmodq.data, asn1.Ber.Integer), 
              der.writeBuffer(key.part.iqmp.data, asn1.Ber.Integer);
            }(der, key) : function(der, key) {
              der.writeBuffer(key.part.n.data, asn1.Ber.Integer), der.writeBuffer(key.part.e.data, asn1.Ber.Integer);
            }(der, key);
            break;

           case "dsa":
            PrivateKey.isPrivateKey(key) ? function(der, key) {
              var ver = Buffer.from([ 0 ]);
              der.writeBuffer(ver, asn1.Ber.Integer), der.writeBuffer(key.part.p.data, asn1.Ber.Integer), 
              der.writeBuffer(key.part.q.data, asn1.Ber.Integer), der.writeBuffer(key.part.g.data, asn1.Ber.Integer), 
              der.writeBuffer(key.part.y.data, asn1.Ber.Integer), der.writeBuffer(key.part.x.data, asn1.Ber.Integer);
            }(der, key) : function(der, key) {
              der.writeBuffer(key.part.y.data, asn1.Ber.Integer), der.writeBuffer(key.part.p.data, asn1.Ber.Integer), 
              der.writeBuffer(key.part.q.data, asn1.Ber.Integer), der.writeBuffer(key.part.g.data, asn1.Ber.Integer);
            }(der, key);
            break;

           case "ecdsa":
            PrivateKey.isPrivateKey(key) ? function(der, key) {
              var ver = Buffer.from([ 1 ]);
              der.writeBuffer(ver, asn1.Ber.Integer), der.writeBuffer(key.part.d.data, asn1.Ber.OctetString), 
              der.startSequence(160);
              var curve = key.part.curve.data.toString(), curveOid = algs.curves[curve].pkcs8oid;
              assert.string(curveOid, "a known ECDSA named curve"), der.writeOID(curveOid), der.endSequence(), 
              der.startSequence(161);
              var Q = utils.ecNormalize(key.part.Q.data, !0);
              der.writeBuffer(Q, asn1.Ber.BitString), der.endSequence();
            }(der, key) : function(der, key) {
              der.startSequence(), der.writeOID("1.2.840.10045.2.1");
              var curve = key.part.curve.data.toString(), curveOid = algs.curves[curve].pkcs8oid;
              assert.string(curveOid, "a known ECDSA named curve"), der.writeOID(curveOid), der.endSequence();
              var Q = utils.ecNormalize(key.part.Q.data, !0);
              der.writeBuffer(Q, asn1.Ber.BitString);
            }(der, key);
            break;

           case "ed25519":
            PrivateKey.isPrivateKey(key) ? function(der, key) {
              var ver = Buffer.from([ 1 ]);
              der.writeBuffer(ver, asn1.Ber.Integer), der.writeBuffer(key.part.k.data, asn1.Ber.OctetString), 
              der.startSequence(160), der.writeOID("1.3.101.112"), der.endSequence(), der.startSequence(161), 
              utils.writeBitString(der, key.part.A.data), der.endSequence();
            }(der, key) : function(der, key) {
              throw new Error("Public keys are not supported for EdDSA PKCS#1");
            }();
            break;

           default:
            throw new Error("Unknown key algo: " + key.type);
          }
          der.endSequence();
        }
      };
      var assert = __webpack_require__(2675), asn1 = __webpack_require__(58814), Buffer = __webpack_require__(12237).Buffer, algs = __webpack_require__(95878), utils = __webpack_require__(25742), Key = __webpack_require__(7710), PrivateKey = __webpack_require__(53799), pem = __webpack_require__(42834), readECDSACurve = __webpack_require__(10071).readECDSACurve;
      function readMPInt(der, nm) {
        return assert.strictEqual(der.peek(), asn1.Ber.Integer, nm + " is not an Integer"), 
        utils.mpNormalize(der.readString(asn1.Ber.Integer, !0));
      }
    },
    10071: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = {
        read: function(buf, options) {
          return pem.read(buf, options, "pkcs8");
        },
        readPkcs8: function(alg, type, der) {
          der.peek() === asn1.Ber.Integer && (assert.strictEqual(type, "private", "unexpected Integer at start of public key"), 
          der.readString(asn1.Ber.Integer, !0));
          der.readSequence();
          var next = der.offset + der.length, oid = der.readOID();
          switch (oid) {
           case "1.2.840.113549.1.1.1":
            return der._offset = next, "public" === type ? function(der) {
              der.readSequence(asn1.Ber.BitString), der.readByte(), der.readSequence();
              var n = readMPInt(der, "modulus"), e = readMPInt(der, "exponent"), key = {
                type: "rsa",
                source: der.originalInput,
                parts: [ {
                  name: "e",
                  data: e
                }, {
                  name: "n",
                  data: n
                } ]
              };
              return new Key(key);
            }(der) : function(der) {
              der.readSequence(asn1.Ber.OctetString), der.readSequence();
              var ver = readMPInt(der, "version");
              assert.equal(ver[0], 0, "unknown RSA private key version");
              var n = readMPInt(der, "modulus"), e = readMPInt(der, "public exponent"), d = readMPInt(der, "private exponent"), p = readMPInt(der, "prime1"), q = readMPInt(der, "prime2"), dmodp = readMPInt(der, "exponent1"), dmodq = readMPInt(der, "exponent2"), iqmp = readMPInt(der, "iqmp");
              return new PrivateKey({
                type: "rsa",
                parts: [ {
                  name: "n",
                  data: n
                }, {
                  name: "e",
                  data: e
                }, {
                  name: "d",
                  data: d
                }, {
                  name: "iqmp",
                  data: iqmp
                }, {
                  name: "p",
                  data: p
                }, {
                  name: "q",
                  data: q
                }, {
                  name: "dmodp",
                  data: dmodp
                }, {
                  name: "dmodq",
                  data: dmodq
                } ]
              });
            }(der);

           case "1.2.840.10040.4.1":
            return "public" === type ? function(der) {
              der.readSequence();
              var p = readMPInt(der, "p"), q = readMPInt(der, "q"), g = readMPInt(der, "g");
              der.readSequence(asn1.Ber.BitString), der.readByte();
              var y = readMPInt(der, "y");
              return new Key({
                type: "dsa",
                parts: [ {
                  name: "p",
                  data: p
                }, {
                  name: "q",
                  data: q
                }, {
                  name: "g",
                  data: g
                }, {
                  name: "y",
                  data: y
                } ]
              });
            }(der) : function(der) {
              der.readSequence();
              var p = readMPInt(der, "p"), q = readMPInt(der, "q"), g = readMPInt(der, "g");
              der.readSequence(asn1.Ber.OctetString);
              var x = readMPInt(der, "x"), y = utils.calculateDSAPublic(g, p, x);
              return new PrivateKey({
                type: "dsa",
                parts: [ {
                  name: "p",
                  data: p
                }, {
                  name: "q",
                  data: q
                }, {
                  name: "g",
                  data: g
                }, {
                  name: "y",
                  data: y
                }, {
                  name: "x",
                  data: x
                } ]
              });
            }(der);

           case "1.2.840.10045.2.1":
            return "public" === type ? function(der) {
              var curveName = readECDSACurve(der);
              assert.string(curveName, "a known elliptic curve");
              var Q = der.readString(asn1.Ber.BitString, !0);
              Q = utils.ecNormalize(Q);
              var key = {
                type: "ecdsa",
                parts: [ {
                  name: "curve",
                  data: Buffer.from(curveName)
                }, {
                  name: "Q",
                  data: Q
                } ]
              };
              return new Key(key);
            }(der) : function(der) {
              var curveName = readECDSACurve(der);
              assert.string(curveName, "a known elliptic curve"), der.readSequence(asn1.Ber.OctetString), 
              der.readSequence();
              var version = readMPInt(der, "version");
              assert.equal(version[0], 1, "unknown version of ECDSA key");
              var Q, d = der.readString(asn1.Ber.OctetString, !0);
              160 == der.peek() && (der.readSequence(160), der._offset += der.length);
              161 == der.peek() && (der.readSequence(161), Q = der.readString(asn1.Ber.BitString, !0), 
              Q = utils.ecNormalize(Q));
              if (void 0 === Q) {
                Q = utils.publicFromPrivateECDSA(curveName, d).part.Q.data;
              }
              var key = {
                type: "ecdsa",
                parts: [ {
                  name: "curve",
                  data: Buffer.from(curveName)
                }, {
                  name: "Q",
                  data: Q
                }, {
                  name: "d",
                  data: d
                } ]
              };
              return new PrivateKey(key);
            }(der);

           case "1.3.101.112":
            return "public" === type ? function(der) {
              0 === der.peek() && der.readByte();
              var A = utils.readBitString(der), key = {
                type: "ed25519",
                parts: [ {
                  name: "A",
                  data: utils.zeroPadToLength(A, 32)
                } ]
              };
              return new Key(key);
            }(der) : function(der) {
              0 === der.peek() && der.readByte();
              der.readSequence(asn1.Ber.OctetString);
              var A, k = der.readString(asn1.Ber.OctetString, !0);
              k = utils.zeroPadToLength(k, 32), der.peek() === asn1.Ber.BitString ? (A = utils.readBitString(der), 
              A = utils.zeroPadToLength(A, 32)) : A = utils.calculateED25519Public(k);
              var key = {
                type: "ed25519",
                parts: [ {
                  name: "A",
                  data: utils.zeroPadToLength(A, 32)
                }, {
                  name: "k",
                  data: utils.zeroPadToLength(k, 32)
                } ]
              };
              return new PrivateKey(key);
            }(der);

           case "1.3.101.110":
            return "public" === type ? function(der) {
              var A = utils.readBitString(der), key = {
                type: "curve25519",
                parts: [ {
                  name: "A",
                  data: utils.zeroPadToLength(A, 32)
                } ]
              };
              return new Key(key);
            }(der) : function(der) {
              0 === der.peek() && der.readByte();
              der.readSequence(asn1.Ber.OctetString);
              var k = der.readString(asn1.Ber.OctetString, !0);
              k = utils.zeroPadToLength(k, 32);
              var A = utils.calculateX25519Public(k), key = {
                type: "curve25519",
                parts: [ {
                  name: "A",
                  data: utils.zeroPadToLength(A, 32)
                }, {
                  name: "k",
                  data: utils.zeroPadToLength(k, 32)
                } ]
              };
              return new PrivateKey(key);
            }(der);

           default:
            throw new Error("Unknown key type OID " + oid);
          }
        },
        write: function(key, options) {
          return pem.write(key, options, "pkcs8");
        },
        writePkcs8,
        pkcs8ToBuffer: function(key) {
          var der = new asn1.BerWriter;
          return writePkcs8(der, key), der.buffer;
        },
        readECDSACurve,
        writeECDSACurve
      };
      var assert = __webpack_require__(2675), asn1 = __webpack_require__(58814), Buffer = __webpack_require__(12237).Buffer, algs = __webpack_require__(95878), utils = __webpack_require__(25742), Key = __webpack_require__(7710), PrivateKey = __webpack_require__(53799), pem = __webpack_require__(42834);
      function readMPInt(der, nm) {
        return assert.strictEqual(der.peek(), asn1.Ber.Integer, nm + " is not an Integer"), 
        utils.mpNormalize(der.readString(asn1.Ber.Integer, !0));
      }
      function readECDSACurve(der) {
        var curveName, curveNames, j, c, cd;
        if (der.peek() === asn1.Ber.OID) {
          var oid = der.readOID();
          for (curveNames = Object.keys(algs.curves), j = 0; j < curveNames.length; ++j) if (c = curveNames[j], 
          (cd = algs.curves[c]).pkcs8oid === oid) {
            curveName = c;
            break;
          }
        } else {
          der.readSequence();
          var version = der.readString(asn1.Ber.Integer, !0);
          assert.strictEqual(version[0], 1, "ECDSA key not version 1");
          var curve = {};
          der.readSequence();
          var fieldTypeOid = der.readOID();
          assert.strictEqual(fieldTypeOid, "1.2.840.10045.1.1", "ECDSA key is not from a prime-field");
          var p = curve.p = utils.mpNormalize(der.readString(asn1.Ber.Integer, !0));
          curve.size = 8 * p.length - utils.countZeros(p), der.readSequence(), curve.a = utils.mpNormalize(der.readString(asn1.Ber.OctetString, !0)), 
          curve.b = utils.mpNormalize(der.readString(asn1.Ber.OctetString, !0)), der.peek() === asn1.Ber.BitString && (curve.s = der.readString(asn1.Ber.BitString, !0)), 
          curve.G = der.readString(asn1.Ber.OctetString, !0), assert.strictEqual(curve.G[0], 4, "uncompressed G is required"), 
          curve.n = utils.mpNormalize(der.readString(asn1.Ber.Integer, !0)), curve.h = utils.mpNormalize(der.readString(asn1.Ber.Integer, !0)), 
          assert.strictEqual(curve.h[0], 1, "a cofactor=1 curve is required"), curveNames = Object.keys(algs.curves);
          var ks = Object.keys(curve);
          for (j = 0; j < curveNames.length; ++j) {
            c = curveNames[j], cd = algs.curves[c];
            for (var equal = !0, i = 0; i < ks.length; ++i) {
              var k = ks[i];
              if (void 0 !== cd[k]) if ("object" == typeof cd[k] && void 0 !== cd[k].equals) {
                if (!cd[k].equals(curve[k])) {
                  equal = !1;
                  break;
                }
              } else if (Buffer.isBuffer(cd[k])) {
                if (cd[k].toString("binary") !== curve[k].toString("binary")) {
                  equal = !1;
                  break;
                }
              } else if (cd[k] !== curve[k]) {
                equal = !1;
                break;
              }
            }
            if (equal) {
              curveName = c;
              break;
            }
          }
        }
        return curveName;
      }
      function writePkcs8(der, key) {
        if (der.startSequence(), PrivateKey.isPrivateKey(key)) {
          var sillyInt = Buffer.from([ 0 ]);
          der.writeBuffer(sillyInt, asn1.Ber.Integer);
        }
        switch (der.startSequence(), key.type) {
         case "rsa":
          der.writeOID("1.2.840.113549.1.1.1"), PrivateKey.isPrivateKey(key) ? function(key, der) {
            der.writeNull(), der.endSequence(), der.startSequence(asn1.Ber.OctetString), der.startSequence();
            var version = Buffer.from([ 0 ]);
            der.writeBuffer(version, asn1.Ber.Integer), der.writeBuffer(key.part.n.data, asn1.Ber.Integer), 
            der.writeBuffer(key.part.e.data, asn1.Ber.Integer), der.writeBuffer(key.part.d.data, asn1.Ber.Integer), 
            der.writeBuffer(key.part.p.data, asn1.Ber.Integer), der.writeBuffer(key.part.q.data, asn1.Ber.Integer), 
            key.part.dmodp && key.part.dmodq || utils.addRSAMissing(key);
            der.writeBuffer(key.part.dmodp.data, asn1.Ber.Integer), der.writeBuffer(key.part.dmodq.data, asn1.Ber.Integer), 
            der.writeBuffer(key.part.iqmp.data, asn1.Ber.Integer), der.endSequence(), der.endSequence();
          }(key, der) : function(key, der) {
            der.writeNull(), der.endSequence(), der.startSequence(asn1.Ber.BitString), der.writeByte(0), 
            der.startSequence(), der.writeBuffer(key.part.n.data, asn1.Ber.Integer), der.writeBuffer(key.part.e.data, asn1.Ber.Integer), 
            der.endSequence(), der.endSequence();
          }(key, der);
          break;

         case "dsa":
          der.writeOID("1.2.840.10040.4.1"), PrivateKey.isPrivateKey(key) ? function(key, der) {
            der.startSequence(), der.writeBuffer(key.part.p.data, asn1.Ber.Integer), der.writeBuffer(key.part.q.data, asn1.Ber.Integer), 
            der.writeBuffer(key.part.g.data, asn1.Ber.Integer), der.endSequence(), der.endSequence(), 
            der.startSequence(asn1.Ber.OctetString), der.writeBuffer(key.part.x.data, asn1.Ber.Integer), 
            der.endSequence();
          }(key, der) : function(key, der) {
            der.startSequence(), der.writeBuffer(key.part.p.data, asn1.Ber.Integer), der.writeBuffer(key.part.q.data, asn1.Ber.Integer), 
            der.writeBuffer(key.part.g.data, asn1.Ber.Integer), der.endSequence(), der.endSequence(), 
            der.startSequence(asn1.Ber.BitString), der.writeByte(0), der.writeBuffer(key.part.y.data, asn1.Ber.Integer), 
            der.endSequence();
          }(key, der);
          break;

         case "ecdsa":
          der.writeOID("1.2.840.10045.2.1"), PrivateKey.isPrivateKey(key) ? function(key, der) {
            writeECDSACurve(key, der), der.endSequence(), der.startSequence(asn1.Ber.OctetString), 
            der.startSequence();
            var version = Buffer.from([ 1 ]);
            der.writeBuffer(version, asn1.Ber.Integer), der.writeBuffer(key.part.d.data, asn1.Ber.OctetString), 
            der.startSequence(161);
            var Q = utils.ecNormalize(key.part.Q.data, !0);
            der.writeBuffer(Q, asn1.Ber.BitString), der.endSequence(), der.endSequence(), der.endSequence();
          }(key, der) : function(key, der) {
            writeECDSACurve(key, der), der.endSequence();
            var Q = utils.ecNormalize(key.part.Q.data, !0);
            der.writeBuffer(Q, asn1.Ber.BitString);
          }(key, der);
          break;

         case "ed25519":
          if (der.writeOID("1.3.101.112"), PrivateKey.isPrivateKey(key)) throw new Error("Ed25519 private keys in pkcs8 format are not supported");
          !function(key, der) {
            der.endSequence(), utils.writeBitString(der, key.part.A.data);
          }(key, der);
          break;

         default:
          throw new Error("Unsupported key type: " + key.type);
        }
        der.endSequence();
      }
      function writeECDSACurve(key, der) {
        var curve = algs.curves[key.curve];
        if (curve.pkcs8oid) der.writeOID(curve.pkcs8oid); else {
          der.startSequence();
          var version = Buffer.from([ 1 ]);
          der.writeBuffer(version, asn1.Ber.Integer), der.startSequence(), der.writeOID("1.2.840.10045.1.1"), 
          der.writeBuffer(curve.p, asn1.Ber.Integer), der.endSequence(), der.startSequence();
          var a = curve.p;
          0 === a[0] && (a = a.slice(1)), der.writeBuffer(a, asn1.Ber.OctetString), der.writeBuffer(curve.b, asn1.Ber.OctetString), 
          der.writeBuffer(curve.s, asn1.Ber.BitString), der.endSequence(), der.writeBuffer(curve.G, asn1.Ber.OctetString), 
          der.writeBuffer(curve.n, asn1.Ber.Integer);
          var h = curve.h;
          h || (h = Buffer.from([ 1 ])), der.writeBuffer(h, asn1.Ber.Integer), der.endSequence();
        }
      }
    },
    34820: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = {
        read: function(buf, options) {
          var parts, formatVersion, lines = buf.toString("ascii").split(/[\r\n]+/), found = !1, si = 0;
          for (;si < lines.length; ) if ((parts = splitHeader(lines[si++])) && (formatVersion = {
            "putty-user-key-file-2": 2,
            "putty-user-key-file-3": 3
          }[parts[0].toLowerCase()])) {
            found = !0;
            break;
          }
          if (!found) throw new Error("No PuTTY format first line found");
          var alg = parts[1];
          parts = splitHeader(lines[si++]), assert.equal(parts[0].toLowerCase(), "encryption");
          var encryption = parts[1];
          parts = splitHeader(lines[si++]), assert.equal(parts[0].toLowerCase(), "comment");
          var comment = parts[1];
          parts = splitHeader(lines[si++]), assert.equal(parts[0].toLowerCase(), "public-lines");
          var publicLines = parseInt(parts[1], 10);
          if (!isFinite(publicLines) || publicLines < 0 || publicLines > lines.length) throw new Error("Invalid public-lines count");
          var publicBuf = Buffer.from(lines.slice(si, si + publicLines).join(""), "base64"), keyType = rfc4253.algToKeyType(alg), key = rfc4253.read(publicBuf);
          if (key.type !== keyType) throw new Error("Outer key algorithm mismatch");
          if (lines[si += publicLines]) {
            parts = splitHeader(lines[si++]), assert.equal(parts[0].toLowerCase(), "private-lines");
            var privateLines = parseInt(parts[1], 10);
            if (!isFinite(privateLines) || privateLines < 0 || privateLines > lines.length) throw new Error("Invalid private-lines count");
            var privateBuf = Buffer.from(lines.slice(si, si + privateLines).join(""), "base64");
            if ("none" !== encryption && 3 === formatVersion) throw new Error("Encrypted keys arenot supported for PuTTY format version 3");
            if ("aes256-cbc" === encryption) {
              if (!options.passphrase) throw new errors.KeyEncryptedError(options.filename, "PEM");
              var iv = Buffer.alloc(16, 0), decipher = crypto.createDecipheriv("aes-256-cbc", (passphrase = options.passphrase, 
              hash1 = crypto.createHash("sha1").update(Buffer.concat([ Buffer.from([ 0, 0, 0, 0 ]), Buffer.from(passphrase) ])).digest(), 
              hash2 = crypto.createHash("sha1").update(Buffer.concat([ Buffer.from([ 0, 0, 0, 1 ]), Buffer.from(passphrase) ])).digest(), 
              Buffer.concat([ hash1, hash2 ]).slice(0, 32)), iv);
              decipher.setAutoPadding(!1), privateBuf = Buffer.concat([ decipher.update(privateBuf), decipher.final() ]);
            }
            if ((key = new PrivateKey(key)).type !== keyType) throw new Error("Outer key algorithm mismatch");
            var privateKeyParts, sshbuf = new SSHBuffer({
              buffer: privateBuf
            });
            if ("ssh-dss" === alg) privateKeyParts = [ {
              name: "x",
              data: sshbuf.readBuffer()
            } ]; else if ("ssh-rsa" === alg) privateKeyParts = [ {
              name: "d",
              data: sshbuf.readBuffer()
            }, {
              name: "p",
              data: sshbuf.readBuffer()
            }, {
              name: "q",
              data: sshbuf.readBuffer()
            }, {
              name: "iqmp",
              data: sshbuf.readBuffer()
            } ]; else if (alg.match(/^ecdsa-sha2-nistp/)) privateKeyParts = [ {
              name: "d",
              data: sshbuf.readBuffer()
            } ]; else {
              if ("ssh-ed25519" !== alg) throw new Error("Unsupported PPK key type: " + alg);
              privateKeyParts = [ {
                name: "k",
                data: sshbuf.readBuffer()
              } ];
            }
            key = new PrivateKey({
              type: key.type,
              parts: key.parts.concat(privateKeyParts)
            });
          }
          var passphrase, hash1, hash2;
          return key.comment = comment, key;
        },
        write: function(key, options) {
          if (assert.object(key), !Key.isKey(key)) throw new Error("Must be a public key");
          var alg = rfc4253.keyTypeToAlg(key), buf = rfc4253.write(key), comment = key.comment || "", lines = function(txt, len) {
            var lines = [], pos = 0;
            for (;pos < txt.length; ) lines.push(txt.slice(pos, pos + 64)), pos += 64;
            return lines;
          }(buf.toString("base64"));
          return lines.unshift("Public-Lines: " + lines.length), lines.unshift("Comment: " + comment), 
          lines.unshift("Encryption: none"), lines.unshift("PuTTY-User-Key-File-2: " + alg), 
          Buffer.from(lines.join("\n") + "\n");
        }
      };
      var assert = __webpack_require__(2675), Buffer = __webpack_require__(12237).Buffer, rfc4253 = __webpack_require__(40594), Key = __webpack_require__(7710), SSHBuffer = __webpack_require__(14685), crypto = __webpack_require__(6113), PrivateKey = __webpack_require__(53799), errors = __webpack_require__(45638);
      function splitHeader(line) {
        var idx = line.indexOf(":");
        if (-1 === idx) return null;
        var header = line.slice(0, idx);
        for (++idx; " " === line[idx]; ) ++idx;
        return [ header, line.slice(idx) ];
      }
    },
    40594: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = {
        read: read.bind(void 0, !1, void 0),
        readType: read.bind(void 0, !1),
        write: function(key, options) {
          assert.object(key);
          var i, alg = keyTypeToAlg(key), algInfo = algs.info[key.type];
          PrivateKey.isPrivateKey(key) && (algInfo = algs.privInfo[key.type]);
          var parts = algInfo.parts, buf = new SSHBuffer({});
          for (buf.writeString(alg), i = 0; i < parts.length; ++i) {
            var data = key.part[parts[i]].data;
            !1 !== algInfo.normalize && (data = "ed25519" === key.type ? utils.zeroPadToLength(data, 32) : utils.mpNormalize(data)), 
            "ed25519" === key.type && "k" === parts[i] && (data = Buffer.concat([ data, key.part.A.data ])), 
            buf.writeBuffer(data);
          }
          return buf.toBuffer();
        },
        readPartial: read.bind(void 0, !0),
        readInternal: read,
        keyTypeToAlg,
        algToKeyType
      };
      var assert = __webpack_require__(2675), Buffer = __webpack_require__(12237).Buffer, algs = __webpack_require__(95878), utils = __webpack_require__(25742), Key = __webpack_require__(7710), PrivateKey = __webpack_require__(53799), SSHBuffer = __webpack_require__(14685);
      function algToKeyType(alg) {
        if (assert.string(alg), "ssh-dss" === alg) return "dsa";
        if ("ssh-rsa" === alg) return "rsa";
        if ("ssh-ed25519" === alg) return "ed25519";
        if ("ssh-curve25519" === alg) return "curve25519";
        if (alg.match(/^ecdsa-sha2-/)) return "ecdsa";
        throw new Error("Unknown algorithm " + alg);
      }
      function keyTypeToAlg(key) {
        if (assert.object(key), "dsa" === key.type) return "ssh-dss";
        if ("rsa" === key.type) return "ssh-rsa";
        if ("ed25519" === key.type) return "ssh-ed25519";
        if ("curve25519" === key.type) return "ssh-curve25519";
        if ("ecdsa" === key.type) return "ecdsa-sha2-" + key.part.curve.data.toString();
        throw new Error("Unknown key type " + key.type);
      }
      function read(partial, type, buf, options) {
        "string" == typeof buf && (buf = Buffer.from(buf)), assert.buffer(buf, "buf");
        var key = {}, parts = key.parts = [], sshbuf = new SSHBuffer({
          buffer: buf
        }), alg = sshbuf.readString();
        assert.ok(!sshbuf.atEnd(), "key must have at least one part"), key.type = algToKeyType(alg);
        var partCount = algs.info[key.type].parts.length;
        for (type && "private" === type && (partCount = algs.privInfo[key.type].parts.length); !sshbuf.atEnd() && parts.length < partCount; ) parts.push(sshbuf.readPart());
        for (;!partial && !sshbuf.atEnd(); ) parts.push(sshbuf.readPart());
        assert.ok(parts.length >= 1, "key must have at least one part"), assert.ok(partial || sshbuf.atEnd(), "leftover bytes at end of key");
        var Constructor = Key, algInfo = algs.info[key.type];
        if ("private" !== type && algInfo.parts.length === parts.length || (algInfo = algs.privInfo[key.type], 
        Constructor = PrivateKey), assert.strictEqual(algInfo.parts.length, parts.length), 
        "ecdsa" === key.type) {
          var res = /^ecdsa-sha2-(.+)$/.exec(alg);
          assert.ok(null !== res), assert.strictEqual(res[1], parts[0].data.toString());
        }
        for (var normalized = !0, i = 0; i < algInfo.parts.length; ++i) {
          var nd, p = parts[i];
          if (p.name = algInfo.parts[i], "ed25519" === key.type && "k" === p.name && (p.data = p.data.slice(0, 32)), 
          "curve" !== p.name && !1 !== algInfo.normalize) (nd = "ed25519" === key.type ? utils.zeroPadToLength(p.data, 32) : utils.mpNormalize(p.data)).toString("binary") !== p.data.toString("binary") && (p.data = nd, 
          normalized = !1);
        }
        return normalized && (key._rfc4253Cache = sshbuf.toBuffer()), partial && "object" == typeof partial && (partial.remainder = sshbuf.remainder(), 
        partial.consumed = sshbuf._offset), new Constructor(key);
      }
    },
    14650: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = {
        read: function(buf, options) {
          return pem.read(buf, options);
        },
        readSSHPrivate: function(type, buf, options) {
          var magic = (buf = new SSHBuffer({
            buffer: buf
          })).readCString();
          assert.strictEqual(magic, "openssh-key-v1", "bad magic string");
          var cipher = buf.readString(), kdf = buf.readString(), kdfOpts = buf.readBuffer();
          if (1 !== buf.readInt()) throw new Error("OpenSSH-format key file contains multiple keys: this is unsupported.");
          var pubKey = buf.readBuffer();
          if ("public" === type) return assert.ok(buf.atEnd(), "excess bytes left after key"), 
          rfc4253.read(pubKey);
          var privKeyBlob = buf.readBuffer();
          assert.ok(buf.atEnd(), "excess bytes left after key");
          var kdfOptsBuf = new SSHBuffer({
            buffer: kdfOpts
          });
          switch (kdf) {
           case "none":
            if ("none" !== cipher) throw new Error('OpenSSH-format key uses KDF "none" but specifies a cipher other than "none"');
            break;

           case "bcrypt":
            var salt = kdfOptsBuf.readBuffer(), rounds = kdfOptsBuf.readInt(), cinf = utils.opensshCipherInfo(cipher);
            if (void 0 === bcrypt && (bcrypt = __webpack_require__(12958)), "string" == typeof options.passphrase && (options.passphrase = Buffer.from(options.passphrase, "utf-8")), 
            !Buffer.isBuffer(options.passphrase)) throw new errors.KeyEncryptedError(options.filename, "OpenSSH");
            var pass = new Uint8Array(options.passphrase), salti = new Uint8Array(salt), out = new Uint8Array(cinf.keySize + cinf.blockSize);
            if (0 !== bcrypt.pbkdf(pass, pass.length, salti, salti.length, out, out.length, rounds)) throw new Error("bcrypt_pbkdf function returned failure, parameters invalid");
            var ckey = (out = Buffer.from(out)).slice(0, cinf.keySize), iv = out.slice(cinf.keySize, cinf.keySize + cinf.blockSize), cipherStream = crypto.createDecipheriv(cinf.opensslName, ckey, iv);
            cipherStream.setAutoPadding(!1);
            var chunk, chunks = [];
            for (cipherStream.once("error", (function(e) {
              if (-1 !== e.toString().indexOf("bad decrypt")) throw new Error("Incorrect passphrase supplied, could not decrypt key");
              throw e;
            })), cipherStream.write(privKeyBlob), cipherStream.end(); null !== (chunk = cipherStream.read()); ) chunks.push(chunk);
            privKeyBlob = Buffer.concat(chunks);
            break;

           default:
            throw new Error('OpenSSH-format key uses unknown KDF "' + kdf + '"');
          }
          var checkInt1 = (buf = new SSHBuffer({
            buffer: privKeyBlob
          })).readInt(), checkInt2 = buf.readInt();
          if (checkInt1 !== checkInt2) throw new Error("Incorrect passphrase supplied, could not decrypt key");
          var ret = {}, key = rfc4253.readInternal(ret, "private", buf.remainder());
          buf.skip(ret.consumed);
          var comment = buf.readString();
          return key.comment = comment, key;
        },
        write: function(key, options) {
          var pubKey;
          pubKey = PrivateKey.isPrivateKey(key) ? key.toPublic() : key;
          var passphrase, privBuf, cipher = "none", kdf = "none", kdfopts = Buffer.alloc(0), cinf = {
            blockSize: 8
          };
          void 0 !== options && ("string" == typeof (passphrase = options.passphrase) && (passphrase = Buffer.from(passphrase, "utf-8")), 
          void 0 !== passphrase && (assert.buffer(passphrase, "options.passphrase"), assert.optionalString(options.cipher, "options.cipher"), 
          void 0 === (cipher = options.cipher) && (cipher = "aes128-ctr"), cinf = utils.opensshCipherInfo(cipher), 
          kdf = "bcrypt"));
          if (PrivateKey.isPrivateKey(key)) {
            privBuf = new SSHBuffer({});
            var checkInt = crypto.randomBytes(4).readUInt32BE(0);
            privBuf.writeInt(checkInt), privBuf.writeInt(checkInt), privBuf.write(key.toBuffer("rfc4253")), 
            privBuf.writeString(key.comment || "");
            for (var n = 1; privBuf._offset % cinf.blockSize != 0; ) privBuf.writeChar(n++);
            privBuf = privBuf.toBuffer();
          }
          switch (kdf) {
           case "none":
            break;

           case "bcrypt":
            var salt = crypto.randomBytes(16), kdfssh = new SSHBuffer({});
            kdfssh.writeBuffer(salt), kdfssh.writeInt(16), kdfopts = kdfssh.toBuffer(), void 0 === bcrypt && (bcrypt = __webpack_require__(12958));
            var pass = new Uint8Array(passphrase), salti = new Uint8Array(salt), out = new Uint8Array(cinf.keySize + cinf.blockSize);
            if (0 !== bcrypt.pbkdf(pass, pass.length, salti, salti.length, out, out.length, 16)) throw new Error("bcrypt_pbkdf function returned failure, parameters invalid");
            var ckey = (out = Buffer.from(out)).slice(0, cinf.keySize), iv = out.slice(cinf.keySize, cinf.keySize + cinf.blockSize), cipherStream = crypto.createCipheriv(cinf.opensslName, ckey, iv);
            cipherStream.setAutoPadding(!1);
            var chunk, chunks = [];
            for (cipherStream.once("error", (function(e) {
              throw e;
            })), cipherStream.write(privBuf), cipherStream.end(); null !== (chunk = cipherStream.read()); ) chunks.push(chunk);
            privBuf = Buffer.concat(chunks);
            break;

           default:
            throw new Error("Unsupported kdf " + kdf);
          }
          var header, buf = new SSHBuffer({});
          buf.writeCString("openssh-key-v1"), buf.writeString(cipher), buf.writeString(kdf), 
          buf.writeBuffer(kdfopts), buf.writeInt(1), buf.writeBuffer(pubKey.toBuffer("rfc4253")), 
          privBuf && buf.writeBuffer(privBuf);
          buf = buf.toBuffer(), header = PrivateKey.isPrivateKey(key) ? "OPENSSH PRIVATE KEY" : "OPENSSH PUBLIC KEY";
          var tmp = buf.toString("base64"), len = tmp.length + tmp.length / 70 + 18 + 16 + 2 * header.length + 10;
          buf = Buffer.alloc(len);
          var o = 0;
          o += buf.write("-----BEGIN " + header + "-----\n", o);
          for (var i = 0; i < tmp.length; ) {
            var limit = i + 70;
            limit > tmp.length && (limit = tmp.length), o += buf.write(tmp.slice(i, limit), o), 
            buf[o++] = 10, i = limit;
          }
          return o += buf.write("-----END " + header + "-----\n", o), buf.slice(0, o);
        }
      };
      var bcrypt, assert = __webpack_require__(2675), Buffer = (__webpack_require__(58814), 
      __webpack_require__(12237).Buffer), utils = (__webpack_require__(95878), __webpack_require__(25742)), crypto = __webpack_require__(6113), PrivateKey = (__webpack_require__(7710), 
      __webpack_require__(53799)), pem = __webpack_require__(42834), rfc4253 = __webpack_require__(40594), SSHBuffer = __webpack_require__(14685), errors = __webpack_require__(45638);
    },
    98916: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = {
        read: function(buf, options) {
          "string" != typeof buf && (assert.buffer(buf, "buf"), buf = buf.toString("ascii"));
          var trimmed = buf.trim().replace(/[\\\r]/g, ""), m = trimmed.match(SSHKEY_RE);
          m || (m = trimmed.match(SSHKEY_RE2));
          assert.ok(m, "key must match regex");
          var key, type = rfc4253.algToKeyType(m[1]), kbuf = Buffer.from(m[2], "base64"), ret = {};
          if (m[4]) try {
            key = rfc4253.read(kbuf);
          } catch (e) {
            m = trimmed.match(SSHKEY_RE2), assert.ok(m, "key must match regex"), kbuf = Buffer.from(m[2], "base64"), 
            key = rfc4253.readInternal(ret, "public", kbuf);
          } else key = rfc4253.readInternal(ret, "public", kbuf);
          if (assert.strictEqual(type, key.type), m[4] && m[4].length > 0) key.comment = m[4]; else if (ret.consumed) {
            var data = m[2] + (m[3] ? m[3] : ""), realOffset = 4 * Math.ceil(ret.consumed / 3);
            for (data = data.slice(0, realOffset - 2).replace(/[^a-zA-Z0-9+\/=]/g, "") + data.slice(realOffset - 2), 
            ret.consumed % 3 > 0 && "=" !== data.slice(realOffset - 1, realOffset) && realOffset--; "=" === data.slice(realOffset, realOffset + 1); ) realOffset++;
            var trailer = data.slice(realOffset);
            (trailer = trailer.replace(/[\r\n]/g, " ").replace(/^\s+/, "")).match(/^[a-zA-Z0-9]/) && (key.comment = trailer);
          }
          return key;
        },
        write: function(key, options) {
          if (assert.object(key), !Key.isKey(key)) throw new Error("Must be a public key");
          var parts = [], alg = rfc4253.keyTypeToAlg(key);
          parts.push(alg);
          var buf = rfc4253.write(key);
          parts.push(buf.toString("base64")), key.comment && parts.push(key.comment);
          return Buffer.from(parts.join(" "));
        }
      };
      var assert = __webpack_require__(2675), Buffer = __webpack_require__(12237).Buffer, rfc4253 = __webpack_require__(40594), Key = (__webpack_require__(25742), 
      __webpack_require__(7710)), SSHKEY_RE = (__webpack_require__(53799), __webpack_require__(14650), 
      /^([a-z0-9-]+)[ \t]+([a-zA-Z0-9+\/]+[=]*)([ \t]+([^ \t][^\n]*[\n]*)?)?$/), SSHKEY_RE2 = /^([a-z0-9-]+)[ \t\n]+([a-zA-Z0-9+\/][a-zA-Z0-9+\/ \t\n=]*)([^a-zA-Z0-9+\/ \t\n=].*)?$/;
    },
    75468: (module, __unused_webpack_exports, __webpack_require__) => {
      var x509 = __webpack_require__(7579);
      module.exports = {
        read: function(buf, options) {
          "string" != typeof buf && (assert.buffer(buf, "buf"), buf = buf.toString("ascii"));
          var m, m2, lines = buf.trim().split(/[\r\n]+/g), si = -1;
          for (;!m && si < lines.length; ) m = lines[++si].match(/[-]+[ ]*BEGIN CERTIFICATE[ ]*[-]+/);
          assert.ok(m, "invalid PEM header");
          var ei = lines.length;
          for (;!m2 && ei > 0; ) m2 = lines[--ei].match(/[-]+[ ]*END CERTIFICATE[ ]*[-]+/);
          assert.ok(m2, "invalid PEM footer"), lines = lines.slice(si, ei + 1);
          var headers = {};
          for (;lines = lines.slice(1), m = lines[0].match(/^([A-Za-z0-9-]+): (.+)$/); ) headers[m[1].toLowerCase()] = m[2];
          return lines = lines.slice(0, -1).join(""), buf = Buffer.from(lines, "base64"), 
          x509.read(buf, options);
        },
        verify: x509.verify,
        sign: x509.sign,
        write: function(cert, options) {
          var dbuf = x509.write(cert, options), tmp = dbuf.toString("base64"), len = tmp.length + tmp.length / 64 + 18 + 16 + 2 * "CERTIFICATE".length + 10, buf = Buffer.alloc(len), o = 0;
          o += buf.write("-----BEGIN CERTIFICATE-----\n", o);
          for (var i = 0; i < tmp.length; ) {
            var limit = i + 64;
            limit > tmp.length && (limit = tmp.length), o += buf.write(tmp.slice(i, limit), o), 
            buf[o++] = 10, i = limit;
          }
          return o += buf.write("-----END CERTIFICATE-----\n", o), buf.slice(0, o);
        }
      };
      var assert = __webpack_require__(2675), Buffer = (__webpack_require__(58814), __webpack_require__(12237).Buffer);
      __webpack_require__(95878), __webpack_require__(25742), __webpack_require__(7710), 
      __webpack_require__(53799), __webpack_require__(42834), __webpack_require__(46e3), 
      __webpack_require__(56519), __webpack_require__(45734);
    },
    7579: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = {
        read: function(buf, options) {
          "string" == typeof buf && (buf = Buffer.from(buf, "binary"));
          assert.buffer(buf, "buf");
          var der = new asn1.BerReader(buf);
          if (der.readSequence(), Math.abs(der.length - der.remain) > 1) throw new Error("DER sequence does not contain whole byte stream");
          var tbsStart = der.offset;
          der.readSequence();
          var sigOffset = der.offset + der.length, tbsEnd = sigOffset;
          if (der.peek() === Local(0)) {
            der.readSequence(Local(0));
            var version = der.readInt();
            assert.ok(version <= 3, "only x.509 versions up to v3 supported");
          }
          var cert = {
            signatures: {}
          }, sig = cert.signatures.x509 = {};
          sig.extras = {}, cert.serial = function(der, nm) {
            return assert.strictEqual(der.peek(), asn1.Ber.Integer, nm + " is not an Integer"), 
            utils.mpNormalize(der.readString(asn1.Ber.Integer, !0));
          }(der, "serial"), der.readSequence();
          var after = der.offset + der.length, certAlgOid = der.readOID();
          if (void 0 === SIGN_ALGS[certAlgOid]) throw new Error("unknown signature algorithm " + certAlgOid);
          der._offset = after, cert.issuer = Identity.parseAsn1(der), der.readSequence(), 
          cert.validFrom = readDate(der), cert.validUntil = readDate(der), cert.subjects = [ Identity.parseAsn1(der) ], 
          der.readSequence(), after = der.offset + der.length, cert.subjectKey = pkcs8.readPkcs8(void 0, "public", der), 
          der._offset = after, der.peek() === Local(1) && (der.readSequence(Local(1)), sig.extras.issuerUniqueID = buf.slice(der.offset, der.offset + der.length), 
          der._offset += der.length);
          der.peek() === Local(2) && (der.readSequence(Local(2)), sig.extras.subjectUniqueID = buf.slice(der.offset, der.offset + der.length), 
          der._offset += der.length);
          if (der.peek() === Local(3)) {
            der.readSequence(Local(3));
            var extEnd = der.offset + der.length;
            for (der.readSequence(); der.offset < extEnd; ) readExtension(cert, buf, der);
            assert.strictEqual(der.offset, extEnd);
          }
          assert.strictEqual(der.offset, sigOffset), der.readSequence(), after = der.offset + der.length;
          var sigAlgOid = der.readOID(), sigAlg = SIGN_ALGS[sigAlgOid];
          if (void 0 === sigAlg) throw new Error("unknown signature algorithm " + sigAlgOid);
          der._offset = after;
          var sigData = der.readString(asn1.Ber.BitString, !0);
          0 === sigData[0] && (sigData = sigData.slice(1));
          var algParts = sigAlg.split("-");
          return sig.signature = Signature.parse(sigData, algParts[0], "asn1"), sig.signature.hashAlgorithm = algParts[1], 
          sig.algo = sigAlg, sig.cache = buf.slice(tbsStart, tbsEnd), new Certificate(cert);
        },
        verify: function(cert, key) {
          var sig = cert.signatures.x509;
          assert.object(sig, "x509 signature");
          var algParts = sig.algo.split("-");
          if (algParts[0] !== key.type) return !1;
          var blob = sig.cache;
          if (void 0 === blob) {
            var der = new asn1.BerWriter;
            writeTBSCert(cert, der), blob = der.buffer;
          }
          var verifier = key.createVerify(algParts[1]);
          return verifier.write(blob), verifier.verify(sig.signature);
        },
        sign: function(cert, key) {
          void 0 === cert.signatures.x509 && (cert.signatures.x509 = {});
          var sig = cert.signatures.x509;
          if (sig.algo = key.type + "-" + key.defaultHashAlgorithm(), void 0 === SIGN_ALGS[sig.algo]) return !1;
          var der = new asn1.BerWriter;
          writeTBSCert(cert, der);
          var blob = der.buffer;
          sig.cache = blob;
          var signer = key.createSign();
          return signer.write(blob), cert.signatures.x509.signature = signer.sign(), !0;
        },
        signAsync: function(cert, signer, done) {
          void 0 === cert.signatures.x509 && (cert.signatures.x509 = {});
          var sig = cert.signatures.x509, der = new asn1.BerWriter;
          writeTBSCert(cert, der);
          var blob = der.buffer;
          sig.cache = blob, signer(blob, (function(err, signature) {
            err ? done(err) : (sig.algo = signature.type + "-" + signature.hashAlgorithm, void 0 !== SIGN_ALGS[sig.algo] ? (sig.signature = signature, 
            done()) : done(new Error('Invalid signing algorithm "' + sig.algo + '"')));
          }));
        },
        write: function(cert, options) {
          var sig = cert.signatures.x509;
          assert.object(sig, "x509 signature");
          var der = new asn1.BerWriter;
          der.startSequence(), sig.cache ? (der._ensure(sig.cache.length), sig.cache.copy(der._buf, der._offset), 
          der._offset += sig.cache.length) : writeTBSCert(cert, der);
          der.startSequence(), der.writeOID(SIGN_ALGS[sig.algo]), sig.algo.match(/^rsa-/) && der.writeNull();
          der.endSequence();
          var sigData = sig.signature.toBuffer("asn1"), data = Buffer.alloc(sigData.length + 1);
          return data[0] = 0, sigData.copy(data, 1), der.writeBuffer(data, asn1.Ber.BitString), 
          der.endSequence(), der.buffer;
        }
      };
      var assert = __webpack_require__(2675), asn1 = __webpack_require__(58814), Buffer = __webpack_require__(12237).Buffer, utils = (__webpack_require__(95878), 
      __webpack_require__(25742)), Identity = (__webpack_require__(7710), __webpack_require__(53799), 
      __webpack_require__(42834), __webpack_require__(46e3)), Signature = __webpack_require__(56519), Certificate = __webpack_require__(45734), pkcs8 = __webpack_require__(10071);
      function Local(i) {
        return asn1.Ber.Context | asn1.Ber.Constructor | i;
      }
      function Context(i) {
        return asn1.Ber.Context | i;
      }
      var SIGN_ALGS = {
        "rsa-md5": "1.2.840.113549.1.1.4",
        "rsa-sha1": "1.2.840.113549.1.1.5",
        "rsa-sha256": "1.2.840.113549.1.1.11",
        "rsa-sha384": "1.2.840.113549.1.1.12",
        "rsa-sha512": "1.2.840.113549.1.1.13",
        "dsa-sha1": "1.2.840.10040.4.3",
        "dsa-sha256": "2.16.840.1.101.3.4.3.2",
        "ecdsa-sha1": "1.2.840.10045.4.1",
        "ecdsa-sha256": "1.2.840.10045.4.3.2",
        "ecdsa-sha384": "1.2.840.10045.4.3.3",
        "ecdsa-sha512": "1.2.840.10045.4.3.4",
        "ed25519-sha512": "1.3.101.112"
      };
      Object.keys(SIGN_ALGS).forEach((function(k) {
        SIGN_ALGS[SIGN_ALGS[k]] = k;
      })), SIGN_ALGS["1.3.14.3.2.3"] = "rsa-md5", SIGN_ALGS["1.3.14.3.2.29"] = "rsa-sha1";
      var EXTS_altName = "2.5.29.17", EXTS_basicConstraints = "2.5.29.19", EXTS_keyUsage = "2.5.29.15", EXTS_extKeyUsage = "2.5.29.37";
      function readDate(der) {
        if (der.peek() === asn1.Ber.UTCTime) return function(t) {
          var m = t.match(UTCTIME_RE);
          assert.ok(m, "timestamps must be in UTC");
          var d = new Date, thisYear = d.getUTCFullYear(), century = 100 * Math.floor(thisYear / 100), year = parseInt(m[1], 10);
          year += thisYear % 100 < 50 && year >= 60 ? century - 1 : century;
          d.setUTCFullYear(year, parseInt(m[2], 10) - 1, parseInt(m[3], 10)), d.setUTCHours(parseInt(m[4], 10), parseInt(m[5], 10)), 
          m[6] && m[6].length > 0 && d.setUTCSeconds(parseInt(m[6], 10));
          return d;
        }(der.readString(asn1.Ber.UTCTime));
        if (der.peek() === asn1.Ber.GeneralizedTime) return function(t) {
          var m = t.match(GTIME_RE);
          assert.ok(m);
          var d = new Date;
          d.setUTCFullYear(parseInt(m[1], 10), parseInt(m[2], 10) - 1, parseInt(m[3], 10)), 
          d.setUTCHours(parseInt(m[4], 10), parseInt(m[5], 10)), m[6] && m[6].length > 0 && d.setUTCSeconds(parseInt(m[6], 10));
          return d;
        }(der.readString(asn1.Ber.GeneralizedTime));
        throw new Error("Unsupported date format");
      }
      function writeDate(der, date) {
        var d, s;
        date.getUTCFullYear() >= 2050 || date.getUTCFullYear() < 1950 ? der.writeString((s = "", 
        s += zeroPad((d = date).getUTCFullYear(), 4), s += zeroPad(d.getUTCMonth() + 1), 
        s += zeroPad(d.getUTCDate()), s += zeroPad(d.getUTCHours()), s += zeroPad(d.getUTCMinutes()), 
        s += zeroPad(d.getUTCSeconds()), s += "Z"), asn1.Ber.GeneralizedTime) : der.writeString(function(d) {
          var s = "";
          return s += zeroPad(d.getUTCFullYear() % 100), s += zeroPad(d.getUTCMonth() + 1), 
          s += zeroPad(d.getUTCDate()), s += zeroPad(d.getUTCHours()), s += zeroPad(d.getUTCMinutes()), 
          s += zeroPad(d.getUTCSeconds()), s += "Z";
        }(date), asn1.Ber.UTCTime);
      }
      var ALTNAME = {
        OtherName: Local(0),
        RFC822Name: Context(1),
        DNSName: Context(2),
        X400Address: Local(3),
        DirectoryName: Local(4),
        EDIPartyName: Local(5),
        URI: Context(6),
        IPAddress: Context(7),
        OID: Context(8)
      }, EXTPURPOSE = {
        serverAuth: "1.3.6.1.5.5.7.3.1",
        clientAuth: "1.3.6.1.5.5.7.3.2",
        codeSigning: "1.3.6.1.5.5.7.3.3",
        joyentDocker: "1.3.6.1.4.1.38678.1.4.1",
        joyentCmon: "1.3.6.1.4.1.38678.1.4.2"
      }, EXTPURPOSE_REV = {};
      Object.keys(EXTPURPOSE).forEach((function(k) {
        EXTPURPOSE_REV[EXTPURPOSE[k]] = k;
      }));
      var KEYUSEBITS = [ "signature", "identity", "keyEncryption", "encryption", "keyAgreement", "ca", "crl" ];
      function readExtension(cert, buf, der) {
        der.readSequence();
        var id, critical, after = der.offset + der.length, extId = der.readOID(), sig = cert.signatures.x509;
        switch (sig.extras.exts || (sig.extras.exts = []), der.peek() === asn1.Ber.Boolean && (critical = der.readBoolean()), 
        extId) {
         case EXTS_basicConstraints:
          der.readSequence(asn1.Ber.OctetString), der.readSequence();
          var bcEnd = der.offset + der.length, ca = !1;
          der.peek() === asn1.Ber.Boolean && (ca = der.readBoolean()), void 0 === cert.purposes && (cert.purposes = []), 
          !0 === ca && cert.purposes.push("ca");
          var bc = {
            oid: extId,
            critical
          };
          der.offset < bcEnd && der.peek() === asn1.Ber.Integer && (bc.pathLen = der.readInt()), 
          sig.extras.exts.push(bc);
          break;

         case EXTS_extKeyUsage:
          der.readSequence(asn1.Ber.OctetString), der.readSequence(), void 0 === cert.purposes && (cert.purposes = []);
          for (var ekEnd = der.offset + der.length; der.offset < ekEnd; ) {
            var oid = der.readOID();
            cert.purposes.push(EXTPURPOSE_REV[oid] || oid);
          }
          -1 !== cert.purposes.indexOf("serverAuth") && -1 === cert.purposes.indexOf("clientAuth") ? cert.subjects.forEach((function(ide) {
            "host" !== ide.type && (ide.type = "host", ide.hostname = ide.uid || ide.email || ide.components[0].value);
          })) : -1 !== cert.purposes.indexOf("clientAuth") && -1 === cert.purposes.indexOf("serverAuth") && cert.subjects.forEach((function(ide) {
            "user" !== ide.type && (ide.type = "user", ide.uid = ide.hostname || ide.email || ide.components[0].value);
          })), sig.extras.exts.push({
            oid: extId,
            critical
          });
          break;

         case EXTS_keyUsage:
          der.readSequence(asn1.Ber.OctetString);
          var bits = der.readString(asn1.Ber.BitString, !0), setBits = function(bits, bitIndex) {
            for (var bitLen = 8 * (bits.length - 1) - bits[0], setBits = {}, i = 0; i < bitLen; ++i) {
              var mask = 1 << 7 - i % 8, bitVal = 0 != (bits[1 + Math.floor(i / 8)] & mask), name = bitIndex[i];
              bitVal && "string" == typeof name && (setBits[name] = !0);
            }
            return Object.keys(setBits);
          }(bits, KEYUSEBITS);
          setBits.forEach((function(bit) {
            void 0 === cert.purposes && (cert.purposes = []), -1 === cert.purposes.indexOf(bit) && cert.purposes.push(bit);
          })), sig.extras.exts.push({
            oid: extId,
            critical,
            bits
          });
          break;

         case EXTS_altName:
          der.readSequence(asn1.Ber.OctetString), der.readSequence();
          for (var aeEnd = der.offset + der.length; der.offset < aeEnd; ) switch (der.peek()) {
           case ALTNAME.OtherName:
           case ALTNAME.EDIPartyName:
            der.readSequence(), der._offset += der.length;
            break;

           case ALTNAME.OID:
            der.readOID(ALTNAME.OID);
            break;

           case ALTNAME.RFC822Name:
            var email = der.readString(ALTNAME.RFC822Name);
            id = Identity.forEmail(email), cert.subjects[0].equals(id) || cert.subjects.push(id);
            break;

           case ALTNAME.DirectoryName:
            der.readSequence(ALTNAME.DirectoryName), id = Identity.parseAsn1(der), cert.subjects[0].equals(id) || cert.subjects.push(id);
            break;

           case ALTNAME.DNSName:
            var host = der.readString(ALTNAME.DNSName);
            id = Identity.forHost(host), cert.subjects[0].equals(id) || cert.subjects.push(id);
            break;

           default:
            der.readString(der.peek());
          }
          sig.extras.exts.push({
            oid: extId,
            critical
          });
          break;

         default:
          sig.extras.exts.push({
            oid: extId,
            critical,
            data: der.readString(asn1.Ber.OctetString, !0)
          });
        }
        der._offset = after;
      }
      var UTCTIME_RE = /^([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})?Z$/;
      var GTIME_RE = /^([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})?Z$/;
      function zeroPad(n, m) {
        void 0 === m && (m = 2);
        for (var s = "" + n; s.length < m; ) s = "0" + s;
        return s;
      }
      function writeTBSCert(cert, der) {
        var sig = cert.signatures.x509;
        assert.object(sig, "x509 signature"), der.startSequence(), der.startSequence(Local(0)), 
        der.writeInt(2), der.endSequence(), der.writeBuffer(utils.mpNormalize(cert.serial), asn1.Ber.Integer), 
        der.startSequence(), der.writeOID(SIGN_ALGS[sig.algo]), sig.algo.match(/^rsa-/) && der.writeNull(), 
        der.endSequence(), cert.issuer.toAsn1(der), der.startSequence(), writeDate(der, cert.validFrom), 
        writeDate(der, cert.validUntil), der.endSequence();
        var subject = cert.subjects[0], altNames = cert.subjects.slice(1);
        if (subject.toAsn1(der), pkcs8.writePkcs8(der, cert.subjectKey), sig.extras && sig.extras.issuerUniqueID && der.writeBuffer(sig.extras.issuerUniqueID, Local(1)), 
        sig.extras && sig.extras.subjectUniqueID && der.writeBuffer(sig.extras.subjectUniqueID, Local(2)), 
        altNames.length > 0 || "host" === subject.type || void 0 !== cert.purposes && cert.purposes.length > 0 || sig.extras && sig.extras.exts) {
          der.startSequence(Local(3)), der.startSequence();
          var exts = [];
          void 0 !== cert.purposes && cert.purposes.length > 0 && (exts.push({
            oid: EXTS_basicConstraints,
            critical: !0
          }), exts.push({
            oid: EXTS_keyUsage,
            critical: !0
          }), exts.push({
            oid: EXTS_extKeyUsage,
            critical: !0
          })), exts.push({
            oid: EXTS_altName
          }), sig.extras && sig.extras.exts && (exts = sig.extras.exts);
          for (var i = 0; i < exts.length; ++i) {
            if (der.startSequence(), der.writeOID(exts[i].oid), void 0 !== exts[i].critical && der.writeBoolean(exts[i].critical), 
            exts[i].oid === EXTS_altName) {
              der.startSequence(asn1.Ber.OctetString), der.startSequence(), "host" === subject.type && der.writeString(subject.hostname, Context(2));
              for (var j = 0; j < altNames.length; ++j) "host" === altNames[j].type ? der.writeString(altNames[j].hostname, ALTNAME.DNSName) : "email" === altNames[j].type ? der.writeString(altNames[j].email, ALTNAME.RFC822Name) : (der.startSequence(ALTNAME.DirectoryName), 
              altNames[j].toAsn1(der), der.endSequence());
              der.endSequence(), der.endSequence();
            } else if (exts[i].oid === EXTS_basicConstraints) {
              der.startSequence(asn1.Ber.OctetString), der.startSequence();
              var ca = -1 !== cert.purposes.indexOf("ca"), pathLen = exts[i].pathLen;
              der.writeBoolean(ca), void 0 !== pathLen && der.writeInt(pathLen), der.endSequence(), 
              der.endSequence();
            } else if (exts[i].oid === EXTS_extKeyUsage) der.startSequence(asn1.Ber.OctetString), 
            der.startSequence(), cert.purposes.forEach((function(purpose) {
              if ("ca" !== purpose && -1 === KEYUSEBITS.indexOf(purpose)) {
                var oid = purpose;
                void 0 !== EXTPURPOSE[purpose] && (oid = EXTPURPOSE[purpose]), der.writeOID(oid);
              }
            })), der.endSequence(), der.endSequence(); else if (exts[i].oid === EXTS_keyUsage) {
              if (der.startSequence(asn1.Ber.OctetString), void 0 !== exts[i].bits) der.writeBuffer(exts[i].bits, asn1.Ber.BitString); else {
                var bits = writeBitField(cert.purposes, KEYUSEBITS);
                der.writeBuffer(bits, asn1.Ber.BitString);
              }
              der.endSequence();
            } else der.writeBuffer(exts[i].data, asn1.Ber.OctetString);
            der.endSequence();
          }
          der.endSequence(), der.endSequence();
        }
        der.endSequence();
      }
      function writeBitField(setBits, bitIndex) {
        var bitLen = bitIndex.length, blen = Math.ceil(bitLen / 8), unused = 8 * blen - bitLen, bits = Buffer.alloc(1 + blen);
        bits[0] = unused;
        for (var i = 0; i < bitLen; ++i) {
          var byteN = 1 + Math.floor(i / 8), mask = 1 << 7 - i % 8, name = bitIndex[i];
          if (void 0 !== name) -1 !== setBits.indexOf(name) && (bits[byteN] |= mask);
        }
        return bits;
      }
    },
    46e3: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = Identity;
      var assert = __webpack_require__(2675), utils = (__webpack_require__(95878), __webpack_require__(6113), 
      __webpack_require__(97862), __webpack_require__(56519), __webpack_require__(45638), 
      __webpack_require__(73837), __webpack_require__(25742)), asn1 = __webpack_require__(58814), Buffer = __webpack_require__(12237).Buffer, DNS_NAME_RE = /^([*]|[a-z0-9][a-z0-9\-]{0,62})(?:\.([*]|[a-z0-9][a-z0-9\-]{0,62}))*$/i, oids = {
        cn: "2.5.4.3",
        o: "2.5.4.10",
        ou: "2.5.4.11",
        l: "2.5.4.7",
        s: "2.5.4.8",
        c: "2.5.4.6",
        sn: "2.5.4.4",
        postalCode: "2.5.4.17",
        serialNumber: "2.5.4.5",
        street: "2.5.4.9",
        x500UniqueIdentifier: "2.5.4.45",
        role: "2.5.4.72",
        telephoneNumber: "2.5.4.20",
        description: "2.5.4.13",
        dc: "0.9.2342.19200300.100.1.25",
        uid: "0.9.2342.19200300.100.1.1",
        mail: "0.9.2342.19200300.100.1.3",
        title: "2.5.4.12",
        gn: "2.5.4.42",
        initials: "2.5.4.43",
        pseudonym: "2.5.4.65",
        emailAddress: "1.2.840.113549.1.9.1"
      }, unoids = {};
      function Identity(opts) {
        var self = this;
        if (assert.object(opts, "options"), assert.arrayOfObject(opts.components, "options.components"), 
        this.components = opts.components, this.componentLookup = {}, this.components.forEach((function(c) {
          c.name && !c.oid && (c.oid = oids[c.name]), c.oid && !c.name && (c.name = unoids[c.oid]), 
          void 0 === self.componentLookup[c.name] && (self.componentLookup[c.name] = []), 
          self.componentLookup[c.name].push(c);
        })), this.componentLookup.cn && this.componentLookup.cn.length > 0 && (this.cn = this.componentLookup.cn[0].value), 
        assert.optionalString(opts.type, "options.type"), void 0 === opts.type) 1 === this.components.length && this.componentLookup.cn && 1 === this.componentLookup.cn.length && this.componentLookup.cn[0].value.match(DNS_NAME_RE) ? (this.type = "host", 
        this.hostname = this.componentLookup.cn[0].value) : this.componentLookup.dc && this.components.length === this.componentLookup.dc.length ? (this.type = "host", 
        this.hostname = this.componentLookup.dc.map((function(c) {
          return c.value;
        })).join(".")) : this.componentLookup.uid && this.components.length === this.componentLookup.uid.length ? (this.type = "user", 
        this.uid = this.componentLookup.uid[0].value) : this.componentLookup.cn && 1 === this.componentLookup.cn.length && this.componentLookup.cn[0].value.match(DNS_NAME_RE) ? (this.type = "host", 
        this.hostname = this.componentLookup.cn[0].value) : this.componentLookup.uid && 1 === this.componentLookup.uid.length ? (this.type = "user", 
        this.uid = this.componentLookup.uid[0].value) : this.componentLookup.mail && 1 === this.componentLookup.mail.length ? (this.type = "email", 
        this.email = this.componentLookup.mail[0].value) : this.componentLookup.cn && 1 === this.componentLookup.cn.length ? (this.type = "user", 
        this.uid = this.componentLookup.cn[0].value) : this.type = "unknown"; else if (this.type = opts.type, 
        "host" === this.type) this.hostname = opts.hostname; else if ("user" === this.type) this.uid = opts.uid; else {
          if ("email" !== this.type) throw new Error("Unknown type " + this.type);
          this.email = opts.email;
        }
      }
      Object.keys(oids).forEach((function(k) {
        unoids[oids[k]] = k;
      })), Identity.prototype.toString = function() {
        return this.components.map((function(c) {
          var n = c.name.toUpperCase();
          n = n.replace(/=/g, "\\=");
          var v = c.value;
          return n + "=" + (v = v.replace(/,/g, "\\,"));
        })).join(", ");
      }, Identity.prototype.get = function(name, asArray) {
        assert.string(name, "name");
        var arr = this.componentLookup[name];
        if (void 0 !== arr && 0 !== arr.length) {
          if (!asArray && arr.length > 1) throw new Error("Multiple values for attribute " + name);
          return asArray ? arr.map((function(c) {
            return c.value;
          })) : arr[0].value;
        }
      }, Identity.prototype.toArray = function(idx) {
        return this.components.map((function(c) {
          return {
            name: c.name,
            value: c.value
          };
        }));
      };
      var NOT_PRINTABLE = /[^a-zA-Z0-9 '(),+.\/:=?-]/, NOT_IA5 = /[^\x00-\x7f]/;
      function globMatch(a, b) {
        if ("**" === a || "**" === b) return !0;
        var aParts = a.split("."), bParts = b.split(".");
        if (aParts.length !== bParts.length) return !1;
        for (var i = 0; i < aParts.length; ++i) if ("*" !== aParts[i] && "*" !== bParts[i] && aParts[i] !== bParts[i]) return !1;
        return !0;
      }
      Identity.prototype.toAsn1 = function(der, tag) {
        der.startSequence(tag), this.components.forEach((function(c) {
          if (der.startSequence(asn1.Ber.Constructor | asn1.Ber.Set), der.startSequence(), 
          der.writeOID(c.oid), c.asn1type === asn1.Ber.Utf8String || c.value.match(NOT_IA5)) {
            var v = Buffer.from(c.value, "utf8");
            der.writeBuffer(v, asn1.Ber.Utf8String);
          } else if (c.asn1type === asn1.Ber.IA5String || c.value.match(NOT_PRINTABLE)) der.writeString(c.value, asn1.Ber.IA5String); else {
            var type = asn1.Ber.PrintableString;
            void 0 !== c.asn1type && (type = c.asn1type), der.writeString(c.value, type);
          }
          der.endSequence(), der.endSequence();
        })), der.endSequence();
      }, Identity.prototype.equals = function(other) {
        if (!Identity.isIdentity(other, [ 1, 0 ])) return !1;
        if (other.components.length !== this.components.length) return !1;
        for (var i = 0; i < this.components.length; ++i) {
          if (this.components[i].oid !== other.components[i].oid) return !1;
          if (!globMatch(this.components[i].value, other.components[i].value)) return !1;
        }
        return !0;
      }, Identity.forHost = function(hostname) {
        return assert.string(hostname, "hostname"), new Identity({
          type: "host",
          hostname,
          components: [ {
            name: "cn",
            value: hostname
          } ]
        });
      }, Identity.forUser = function(uid) {
        return assert.string(uid, "uid"), new Identity({
          type: "user",
          uid,
          components: [ {
            name: "uid",
            value: uid
          } ]
        });
      }, Identity.forEmail = function(email) {
        return assert.string(email, "email"), new Identity({
          type: "email",
          email,
          components: [ {
            name: "mail",
            value: email
          } ]
        });
      }, Identity.parseDN = function(dn) {
        assert.string(dn, "dn");
        for (var parts = [ "" ], idx = 0, rem = dn; rem.length > 0; ) {
          var m;
          if (null !== (m = /^,/.exec(rem))) parts[++idx] = "", rem = rem.slice(m[0].length); else if (null !== (m = /^\\,/.exec(rem))) parts[idx] += ",", 
          rem = rem.slice(m[0].length); else if (null !== (m = /^\\./.exec(rem))) parts[idx] += m[0], 
          rem = rem.slice(m[0].length); else {
            if (null === (m = /^[^\\,]+/.exec(rem))) throw new Error("Failed to parse DN");
            parts[idx] += m[0], rem = rem.slice(m[0].length);
          }
        }
        return new Identity({
          components: parts.map((function(c) {
            for (var eqPos = (c = c.trim()).indexOf("="); eqPos > 0 && "\\" === c.charAt(eqPos - 1); ) eqPos = c.indexOf("=", eqPos + 1);
            if (-1 === eqPos) throw new Error("Failed to parse DN");
            return {
              name: c.slice(0, eqPos).toLowerCase().replace(/\\=/g, "="),
              value: c.slice(eqPos + 1)
            };
          }))
        });
      }, Identity.fromArray = function(components) {
        return assert.arrayOfObject(components, "components"), components.forEach((function(cmp) {
          if (assert.object(cmp, "component"), assert.string(cmp.name, "component.name"), 
          !Buffer.isBuffer(cmp.value) && "string" != typeof cmp.value) throw new Error("Invalid component value");
        })), new Identity({
          components
        });
      }, Identity.parseAsn1 = function(der, top) {
        var components = [];
        der.readSequence(top);
        for (var end = der.offset + der.length; der.offset < end; ) {
          der.readSequence(asn1.Ber.Constructor | asn1.Ber.Set);
          var after = der.offset + der.length;
          der.readSequence();
          var value, oid = der.readOID(), type = der.peek();
          switch (type) {
           case asn1.Ber.PrintableString:
           case asn1.Ber.IA5String:
           case asn1.Ber.OctetString:
           case asn1.Ber.T61String:
            value = der.readString(type);
            break;

           case asn1.Ber.Utf8String:
            value = (value = der.readString(type, !0)).toString("utf8");
            break;

           case asn1.Ber.CharacterString:
           case asn1.Ber.BMPString:
            value = (value = der.readString(type, !0)).toString("utf16le");
            break;

           default:
            throw new Error("Unknown asn1 type " + type);
          }
          components.push({
            oid,
            asn1type: type,
            value
          }), der._offset = after;
        }
        return der._offset = end, new Identity({
          components
        });
      }, Identity.isIdentity = function(obj, ver) {
        return utils.isCompatible(obj, Identity, ver);
      }, Identity.prototype._sshpkApiVersion = [ 1, 0 ], Identity._oldVersionDetect = function(obj) {
        return [ 1, 0 ];
      };
    },
    83054: (module, __unused_webpack_exports, __webpack_require__) => {
      var Key = __webpack_require__(7710), Fingerprint = __webpack_require__(97862), Signature = __webpack_require__(56519), PrivateKey = __webpack_require__(53799), Certificate = __webpack_require__(45734), Identity = __webpack_require__(46e3), errs = __webpack_require__(45638);
      module.exports = {
        Key,
        parseKey: Key.parse,
        Fingerprint,
        parseFingerprint: Fingerprint.parse,
        Signature,
        parseSignature: Signature.parse,
        PrivateKey,
        parsePrivateKey: PrivateKey.parse,
        generatePrivateKey: PrivateKey.generate,
        Certificate,
        parseCertificate: Certificate.parse,
        createSelfSignedCertificate: Certificate.createSelfSigned,
        createCertificate: Certificate.create,
        Identity,
        identityFromDN: Identity.parseDN,
        identityForHost: Identity.forHost,
        identityForUser: Identity.forUser,
        identityForEmail: Identity.forEmail,
        identityFromArray: Identity.fromArray,
        FingerprintFormatError: errs.FingerprintFormatError,
        InvalidAlgorithmError: errs.InvalidAlgorithmError,
        KeyParseError: errs.KeyParseError,
        SignatureParseError: errs.SignatureParseError,
        KeyEncryptedError: errs.KeyEncryptedError,
        CertificateParseError: errs.CertificateParseError
      };
    },
    7710: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = Key;
      var edCompat, assert = __webpack_require__(2675), algs = __webpack_require__(95878), crypto = __webpack_require__(6113), Fingerprint = __webpack_require__(97862), Signature = __webpack_require__(56519), DiffieHellman = __webpack_require__(18857).DiffieHellman, errs = __webpack_require__(45638), utils = __webpack_require__(25742), PrivateKey = __webpack_require__(53799);
      try {
        edCompat = __webpack_require__(99683);
      } catch (e) {}
      var InvalidAlgorithmError = errs.InvalidAlgorithmError, KeyParseError = errs.KeyParseError, formats = {};
      function Key(opts) {
        assert.object(opts, "options"), assert.arrayOfObject(opts.parts, "options.parts"), 
        assert.string(opts.type, "options.type"), assert.optionalString(opts.comment, "options.comment");
        var algInfo = algs.info[opts.type];
        if ("object" != typeof algInfo) throw new InvalidAlgorithmError(opts.type);
        for (var sz, partLookup = {}, i = 0; i < opts.parts.length; ++i) {
          var part = opts.parts[i];
          partLookup[part.name] = part;
        }
        if (this.type = opts.type, this.parts = opts.parts, this.part = partLookup, this.comment = void 0, 
        this.source = opts.source, this._rfc4253Cache = opts._rfc4253Cache, this._hashCache = {}, 
        this.curve = void 0, "ecdsa" === this.type) {
          var curve = this.part.curve.data.toString();
          this.curve = curve, sz = algs.curves[curve].size;
        } else if ("ed25519" === this.type || "curve25519" === this.type) sz = 256, this.curve = "curve25519"; else {
          var szPart = this.part[algInfo.sizePart];
          sz = 8 * (sz = szPart.data.length) - utils.countZeros(szPart.data);
        }
        this.size = sz;
      }
      formats.auto = __webpack_require__(80519), formats.pem = __webpack_require__(42834), 
      formats.pkcs1 = __webpack_require__(43808), formats.pkcs8 = __webpack_require__(10071), 
      formats.rfc4253 = __webpack_require__(40594), formats.ssh = __webpack_require__(98916), 
      formats["ssh-private"] = __webpack_require__(14650), formats.openssh = formats["ssh-private"], 
      formats.dnssec = __webpack_require__(12646), formats.putty = __webpack_require__(34820), 
      formats.ppk = formats.putty, Key.formats = formats, Key.prototype.toBuffer = function(format, options) {
        return void 0 === format && (format = "ssh"), assert.string(format, "format"), assert.object(formats[format], "formats[format]"), 
        assert.optionalObject(options, "options"), "rfc4253" === format ? (void 0 === this._rfc4253Cache && (this._rfc4253Cache = formats.rfc4253.write(this)), 
        this._rfc4253Cache) : formats[format].write(this, options);
      }, Key.prototype.toString = function(format, options) {
        return this.toBuffer(format, options).toString();
      }, Key.prototype.hash = function(algo, type) {
        if (assert.string(algo, "algorithm"), assert.optionalString(type, "type"), void 0 === type && (type = "ssh"), 
        algo = algo.toLowerCase(), void 0 === algs.hashAlgs[algo]) throw new InvalidAlgorithmError(algo);
        var buf, cacheKey = algo + "||" + type;
        if (this._hashCache[cacheKey]) return this._hashCache[cacheKey];
        if ("ssh" === type) buf = this.toBuffer("rfc4253"); else {
          if ("spki" !== type) throw new Error("Hash type " + type + " not supported");
          buf = formats.pkcs8.pkcs8ToBuffer(this);
        }
        var hash = crypto.createHash(algo).update(buf).digest();
        return this._hashCache[cacheKey] = hash, hash;
      }, Key.prototype.fingerprint = function(algo, type) {
        void 0 === algo && (algo = "sha256"), void 0 === type && (type = "ssh"), assert.string(algo, "algorithm"), 
        assert.string(type, "type");
        var opts = {
          type: "key",
          hash: this.hash(algo, type),
          algorithm: algo,
          hashType: type
        };
        return new Fingerprint(opts);
      }, Key.prototype.defaultHashAlgorithm = function() {
        var hashAlgo = "sha1";
        return "rsa" === this.type && (hashAlgo = "sha256"), "dsa" === this.type && this.size > 1024 && (hashAlgo = "sha256"), 
        "ed25519" === this.type && (hashAlgo = "sha512"), "ecdsa" === this.type && (hashAlgo = this.size <= 256 ? "sha256" : this.size <= 384 ? "sha384" : "sha512"), 
        hashAlgo;
      }, Key.prototype.createVerify = function(hashAlgo) {
        if (void 0 === hashAlgo && (hashAlgo = this.defaultHashAlgorithm()), assert.string(hashAlgo, "hash algorithm"), 
        "ed25519" === this.type && void 0 !== edCompat) return new edCompat.Verifier(this, hashAlgo);
        if ("curve25519" === this.type) throw new Error("Curve25519 keys are not suitable for signing or verification");
        var v, nm, err;
        try {
          nm = hashAlgo.toUpperCase(), v = crypto.createVerify(nm);
        } catch (e) {
          err = e;
        }
        (void 0 === v || err instanceof Error && err.message.match(/Unknown message digest/)) && (nm = "RSA-", 
        nm += hashAlgo.toUpperCase(), v = crypto.createVerify(nm)), assert.ok(v, "failed to create verifier");
        var oldVerify = v.verify.bind(v), key = this.toBuffer("pkcs8"), curve = this.curve, self = this;
        return v.verify = function(signature, fmt) {
          if (Signature.isSignature(signature, [ 2, 0 ])) return signature.type === self.type && ((!signature.hashAlgorithm || signature.hashAlgorithm === hashAlgo) && ((!signature.curve || "ecdsa" !== self.type || signature.curve === curve) && oldVerify(key, signature.toBuffer("asn1"))));
          if ("string" == typeof signature || Buffer.isBuffer(signature)) return oldVerify(key, signature, fmt);
          throw Signature.isSignature(signature, [ 1, 0 ]) ? new Error("signature was created by too old a version of sshpk and cannot be verified") : new TypeError("signature must be a string, Buffer, or Signature object");
        }, v;
      }, Key.prototype.createDiffieHellman = function() {
        if ("rsa" === this.type) throw new Error("RSA keys do not support Diffie-Hellman");
        return new DiffieHellman(this);
      }, Key.prototype.createDH = Key.prototype.createDiffieHellman, Key.parse = function(data, format, options) {
        "string" != typeof data && assert.buffer(data, "data"), void 0 === format && (format = "auto"), 
        assert.string(format, "format"), "string" == typeof options && (options = {
          filename: options
        }), assert.optionalObject(options, "options"), void 0 === options && (options = {}), 
        assert.optionalString(options.filename, "options.filename"), void 0 === options.filename && (options.filename = "(unnamed)"), 
        assert.object(formats[format], "formats[format]");
        try {
          var k = formats[format].read(data, options);
          return k instanceof PrivateKey && (k = k.toPublic()), k.comment || (k.comment = options.filename), 
          k;
        } catch (e) {
          if ("KeyEncryptedError" === e.name) throw e;
          throw new KeyParseError(options.filename, format, e);
        }
      }, Key.isKey = function(obj, ver) {
        return utils.isCompatible(obj, Key, ver);
      }, Key.prototype._sshpkApiVersion = [ 1, 7 ], Key._oldVersionDetect = function(obj) {
        return assert.func(obj.toBuffer), assert.func(obj.fingerprint), obj.createDH ? [ 1, 4 ] : obj.defaultHashAlgorithm ? [ 1, 3 ] : obj.formats.auto ? [ 1, 2 ] : obj.formats.pkcs1 ? [ 1, 1 ] : [ 1, 0 ];
      };
    },
    53799: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = PrivateKey;
      var assert = __webpack_require__(2675), Buffer = __webpack_require__(12237).Buffer, algs = __webpack_require__(95878), crypto = __webpack_require__(6113), Signature = (__webpack_require__(97862), 
      __webpack_require__(56519)), errs = __webpack_require__(45638), util = __webpack_require__(73837), utils = __webpack_require__(25742), dhe = __webpack_require__(18857), generateECDSA = dhe.generateECDSA, generateED25519 = dhe.generateED25519, edCompat = __webpack_require__(99683), nacl = __webpack_require__(36046), Key = __webpack_require__(7710), KeyParseError = (errs.InvalidAlgorithmError, 
      errs.KeyParseError), formats = (errs.KeyEncryptedError, {});
      function PrivateKey(opts) {
        assert.object(opts, "options"), Key.call(this, opts), this._pubCache = void 0;
      }
      formats.auto = __webpack_require__(80519), formats.pem = __webpack_require__(42834), 
      formats.pkcs1 = __webpack_require__(43808), formats.pkcs8 = __webpack_require__(10071), 
      formats.rfc4253 = __webpack_require__(40594), formats["ssh-private"] = __webpack_require__(14650), 
      formats.openssh = formats["ssh-private"], formats.ssh = formats["ssh-private"], 
      formats.dnssec = __webpack_require__(12646), formats.putty = __webpack_require__(34820), 
      util.inherits(PrivateKey, Key), PrivateKey.formats = formats, PrivateKey.prototype.toBuffer = function(format, options) {
        return void 0 === format && (format = "pkcs1"), assert.string(format, "format"), 
        assert.object(formats[format], "formats[format]"), assert.optionalObject(options, "options"), 
        formats[format].write(this, options);
      }, PrivateKey.prototype.hash = function(algo, type) {
        return this.toPublic().hash(algo, type);
      }, PrivateKey.prototype.fingerprint = function(algo, type) {
        return this.toPublic().fingerprint(algo, type);
      }, PrivateKey.prototype.toPublic = function() {
        if (this._pubCache) return this._pubCache;
        for (var algInfo = algs.info[this.type], pubParts = [], i = 0; i < algInfo.parts.length; ++i) {
          var p = algInfo.parts[i];
          pubParts.push(this.part[p]);
        }
        return this._pubCache = new Key({
          type: this.type,
          source: this,
          parts: pubParts
        }), this.comment && (this._pubCache.comment = this.comment), this._pubCache;
      }, PrivateKey.prototype.derive = function(newType) {
        var priv, pub, pair;
        if (assert.string(newType, "type"), "ed25519" === this.type && "curve25519" === newType) return 0 === (priv = this.part.k.data)[0] && (priv = priv.slice(1)), 
        pair = nacl.box.keyPair.fromSecretKey(new Uint8Array(priv)), pub = Buffer.from(pair.publicKey), 
        new PrivateKey({
          type: "curve25519",
          parts: [ {
            name: "A",
            data: utils.mpNormalize(pub)
          }, {
            name: "k",
            data: utils.mpNormalize(priv)
          } ]
        });
        if ("curve25519" === this.type && "ed25519" === newType) return 0 === (priv = this.part.k.data)[0] && (priv = priv.slice(1)), 
        pair = nacl.sign.keyPair.fromSeed(new Uint8Array(priv)), pub = Buffer.from(pair.publicKey), 
        new PrivateKey({
          type: "ed25519",
          parts: [ {
            name: "A",
            data: utils.mpNormalize(pub)
          }, {
            name: "k",
            data: utils.mpNormalize(priv)
          } ]
        });
        throw new Error("Key derivation not supported from " + this.type + " to " + newType);
      }, PrivateKey.prototype.createVerify = function(hashAlgo) {
        return this.toPublic().createVerify(hashAlgo);
      }, PrivateKey.prototype.createSign = function(hashAlgo) {
        if (void 0 === hashAlgo && (hashAlgo = this.defaultHashAlgorithm()), assert.string(hashAlgo, "hash algorithm"), 
        "ed25519" === this.type && void 0 !== edCompat) return new edCompat.Signer(this, hashAlgo);
        if ("curve25519" === this.type) throw new Error("Curve25519 keys are not suitable for signing or verification");
        var v, nm, err;
        try {
          nm = hashAlgo.toUpperCase(), v = crypto.createSign(nm);
        } catch (e) {
          err = e;
        }
        (void 0 === v || err instanceof Error && err.message.match(/Unknown message digest/)) && (nm = "RSA-", 
        nm += hashAlgo.toUpperCase(), v = crypto.createSign(nm)), assert.ok(v, "failed to create verifier");
        var oldSign = v.sign.bind(v), key = this.toBuffer("pkcs1"), type = this.type, curve = this.curve;
        return v.sign = function() {
          var sig = oldSign(key);
          return "string" == typeof sig && (sig = Buffer.from(sig, "binary")), (sig = Signature.parse(sig, type, "asn1")).hashAlgorithm = hashAlgo, 
          sig.curve = curve, sig;
        }, v;
      }, PrivateKey.parse = function(data, format, options) {
        "string" != typeof data && assert.buffer(data, "data"), void 0 === format && (format = "auto"), 
        assert.string(format, "format"), "string" == typeof options && (options = {
          filename: options
        }), assert.optionalObject(options, "options"), void 0 === options && (options = {}), 
        assert.optionalString(options.filename, "options.filename"), void 0 === options.filename && (options.filename = "(unnamed)"), 
        assert.object(formats[format], "formats[format]");
        try {
          var k = formats[format].read(data, options);
          return assert.ok(k instanceof PrivateKey, "key is not a private key"), k.comment || (k.comment = options.filename), 
          k;
        } catch (e) {
          if ("KeyEncryptedError" === e.name) throw e;
          throw new KeyParseError(options.filename, format, e);
        }
      }, PrivateKey.isPrivateKey = function(obj, ver) {
        return utils.isCompatible(obj, PrivateKey, ver);
      }, PrivateKey.generate = function(type, options) {
        switch (void 0 === options && (options = {}), assert.object(options, "options"), 
        type) {
         case "ecdsa":
          return void 0 === options.curve && (options.curve = "nistp256"), assert.string(options.curve, "options.curve"), 
          generateECDSA(options.curve);

         case "ed25519":
          return generateED25519();

         default:
          throw new Error('Key generation not supported with key type "' + type + '"');
        }
      }, PrivateKey.prototype._sshpkApiVersion = [ 1, 6 ], PrivateKey._oldVersionDetect = function(obj) {
        return assert.func(obj.toPublic), assert.func(obj.createSign), obj.derive ? [ 1, 3 ] : obj.defaultHashAlgorithm ? [ 1, 2 ] : obj.formats.auto ? [ 1, 1 ] : [ 1, 0 ];
      };
    },
    56519: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = Signature;
      var assert = __webpack_require__(2675), Buffer = __webpack_require__(12237).Buffer, errs = (__webpack_require__(95878), 
      __webpack_require__(6113), __webpack_require__(45638)), utils = __webpack_require__(25742), asn1 = __webpack_require__(58814), SSHBuffer = __webpack_require__(14685), InvalidAlgorithmError = errs.InvalidAlgorithmError, SignatureParseError = errs.SignatureParseError;
      function Signature(opts) {
        assert.object(opts, "options"), assert.arrayOfObject(opts.parts, "options.parts"), 
        assert.string(opts.type, "options.type");
        for (var partLookup = {}, i = 0; i < opts.parts.length; ++i) {
          var part = opts.parts[i];
          partLookup[part.name] = part;
        }
        this.type = opts.type, this.hashAlgorithm = opts.hashAlgo, this.curve = opts.curve, 
        this.parts = opts.parts, this.part = partLookup;
      }
      function parseOneNum(data, type, format, opts) {
        if ("ssh" === format) {
          try {
            var buf = new SSHBuffer({
              buffer: data
            }), head = buf.readString();
          } catch (e) {}
          if (void 0 !== buf) {
            var msg = "SSH signature does not match expected type (expected " + type + ", got " + head + ")";
            switch (head) {
             case "ssh-rsa":
              assert.strictEqual(type, "rsa", msg), opts.hashAlgo = "sha1";
              break;

             case "rsa-sha2-256":
              assert.strictEqual(type, "rsa", msg), opts.hashAlgo = "sha256";
              break;

             case "rsa-sha2-512":
              assert.strictEqual(type, "rsa", msg), opts.hashAlgo = "sha512";
              break;

             case "ssh-ed25519":
              assert.strictEqual(type, "ed25519", msg), opts.hashAlgo = "sha512";
              break;

             default:
              throw new Error("Unknown SSH signature type: " + head);
            }
            var sig = buf.readPart();
            return assert.ok(buf.atEnd(), "extra trailing bytes"), sig.name = "sig", opts.parts.push(sig), 
            new Signature(opts);
          }
        }
        return opts.parts.push({
          name: "sig",
          data
        }), new Signature(opts);
      }
      Signature.prototype.toBuffer = function(format) {
        var buf;
        void 0 === format && (format = "asn1"), assert.string(format, "format");
        var stype = "ssh-" + this.type;
        switch (this.type) {
         case "rsa":
          switch (this.hashAlgorithm) {
           case "sha256":
            stype = "rsa-sha2-256";
            break;

           case "sha512":
            stype = "rsa-sha2-512";
            break;

           case "sha1":
           case void 0:
            break;

           default:
            throw new Error("SSH signature format does not support hash algorithm " + this.hashAlgorithm);
          }
          return "ssh" === format ? ((buf = new SSHBuffer({})).writeString(stype), buf.writePart(this.part.sig), 
          buf.toBuffer()) : this.part.sig.data;

         case "ed25519":
          return "ssh" === format ? ((buf = new SSHBuffer({})).writeString(stype), buf.writePart(this.part.sig), 
          buf.toBuffer()) : this.part.sig.data;

         case "dsa":
         case "ecdsa":
          var r, s;
          if ("asn1" === format) {
            var der = new asn1.BerWriter;
            return der.startSequence(), r = utils.mpNormalize(this.part.r.data), s = utils.mpNormalize(this.part.s.data), 
            der.writeBuffer(r, asn1.Ber.Integer), der.writeBuffer(s, asn1.Ber.Integer), der.endSequence(), 
            der.buffer;
          }
          if ("ssh" === format && "dsa" === this.type) {
            if ((buf = new SSHBuffer({})).writeString("ssh-dss"), (r = this.part.r.data).length > 20 && 0 === r[0] && (r = r.slice(1)), 
            (s = this.part.s.data).length > 20 && 0 === s[0] && (s = s.slice(1)), this.hashAlgorithm && "sha1" !== this.hashAlgorithm || r.length + s.length !== 40) throw new Error("OpenSSH only supports DSA signatures with SHA1 hash");
            return buf.writeBuffer(Buffer.concat([ r, s ])), buf.toBuffer();
          }
          if ("ssh" === format && "ecdsa" === this.type) {
            var curve, inner = new SSHBuffer({});
            r = this.part.r.data, inner.writeBuffer(r), inner.writePart(this.part.s), buf = new SSHBuffer({}), 
            0 === r[0] && (r = r.slice(1));
            var sz = 8 * r.length;
            return 256 === sz ? curve = "nistp256" : 384 === sz ? curve = "nistp384" : 528 === sz && (curve = "nistp521"), 
            buf.writeString("ecdsa-sha2-" + curve), buf.writeBuffer(inner.toBuffer()), buf.toBuffer();
          }
          throw new Error("Invalid signature format");

         default:
          throw new Error("Invalid signature data");
        }
      }, Signature.prototype.toString = function(format) {
        return assert.optionalString(format, "format"), this.toBuffer(format).toString("base64");
      }, Signature.parse = function(data, type, format) {
        "string" == typeof data && (data = Buffer.from(data, "base64")), assert.buffer(data, "data"), 
        assert.string(format, "format"), assert.string(type, "type");
        var opts = {};
        opts.type = type.toLowerCase(), opts.parts = [];
        try {
          switch (assert.ok(data.length > 0, "signature must not be empty"), opts.type) {
           case "rsa":
           case "ed25519":
            return parseOneNum(data, type, format, opts);

           case "dsa":
           case "ecdsa":
            return "asn1" === format ? function(data, type, format, opts) {
              var der = new asn1.BerReader(data);
              der.readSequence();
              var r = der.readString(asn1.Ber.Integer, !0), s = der.readString(asn1.Ber.Integer, !0);
              return opts.parts.push({
                name: "r",
                data: utils.mpNormalize(r)
              }), opts.parts.push({
                name: "s",
                data: utils.mpNormalize(s)
              }), new Signature(opts);
            }(data, 0, 0, opts) : "dsa" === opts.type ? function(data, type, format, opts) {
              if (40 != data.length) {
                var buf = new SSHBuffer({
                  buffer: data
                }), d = buf.readBuffer();
                "ssh-dss" === d.toString("ascii") && (d = buf.readBuffer()), assert.ok(buf.atEnd(), "extra trailing bytes"), 
                assert.strictEqual(d.length, 40, "invalid inner length"), data = d;
              }
              return opts.parts.push({
                name: "r",
                data: data.slice(0, 20)
              }), opts.parts.push({
                name: "s",
                data: data.slice(20, 40)
              }), new Signature(opts);
            }(data, 0, 0, opts) : function(data, type, format, opts) {
              var r, s, buf = new SSHBuffer({
                buffer: data
              }), inner = buf.readBuffer(), stype = inner.toString("ascii");
              if ("ecdsa-" === stype.slice(0, 6)) {
                var parts = stype.split("-");
                switch (assert.strictEqual(parts[0], "ecdsa"), assert.strictEqual(parts[1], "sha2"), 
                opts.curve = parts[2], opts.curve) {
                 case "nistp256":
                  opts.hashAlgo = "sha256";
                  break;

                 case "nistp384":
                  opts.hashAlgo = "sha384";
                  break;

                 case "nistp521":
                  opts.hashAlgo = "sha512";
                  break;

                 default:
                  throw new Error("Unsupported ECDSA curve: " + opts.curve);
                }
                inner = buf.readBuffer(), assert.ok(buf.atEnd(), "extra trailing bytes on outer"), 
                r = (buf = new SSHBuffer({
                  buffer: inner
                })).readPart();
              } else r = {
                data: inner
              };
              return s = buf.readPart(), assert.ok(buf.atEnd(), "extra trailing bytes"), r.name = "r", 
              s.name = "s", opts.parts.push(r), opts.parts.push(s), new Signature(opts);
            }(data, 0, 0, opts);

           default:
            throw new InvalidAlgorithmError(type);
          }
        } catch (e) {
          if (e instanceof InvalidAlgorithmError) throw e;
          throw new SignatureParseError(type, format, e);
        }
      }, Signature.isSignature = function(obj, ver) {
        return utils.isCompatible(obj, Signature, ver);
      }, Signature.prototype._sshpkApiVersion = [ 2, 1 ], Signature._oldVersionDetect = function(obj) {
        return assert.func(obj.toBuffer), obj.hasOwnProperty("hashAlgorithm") ? [ 2, 0 ] : [ 1, 0 ];
      };
    },
    14685: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = SSHBuffer;
      var assert = __webpack_require__(2675), Buffer = __webpack_require__(12237).Buffer;
      function SSHBuffer(opts) {
        assert.object(opts, "options"), void 0 !== opts.buffer && assert.buffer(opts.buffer, "options.buffer"), 
        this._size = opts.buffer ? opts.buffer.length : 1024, this._buffer = opts.buffer || Buffer.alloc(this._size), 
        this._offset = 0;
      }
      SSHBuffer.prototype.toBuffer = function() {
        return this._buffer.slice(0, this._offset);
      }, SSHBuffer.prototype.atEnd = function() {
        return this._offset >= this._buffer.length;
      }, SSHBuffer.prototype.remainder = function() {
        return this._buffer.slice(this._offset);
      }, SSHBuffer.prototype.skip = function(n) {
        this._offset += n;
      }, SSHBuffer.prototype.expand = function() {
        this._size *= 2;
        var buf = Buffer.alloc(this._size);
        this._buffer.copy(buf, 0), this._buffer = buf;
      }, SSHBuffer.prototype.readPart = function() {
        return {
          data: this.readBuffer()
        };
      }, SSHBuffer.prototype.readBuffer = function() {
        var len = this._buffer.readUInt32BE(this._offset);
        this._offset += 4, assert.ok(this._offset + len <= this._buffer.length, "length out of bounds at +0x" + this._offset.toString(16) + " (data truncated?)");
        var buf = this._buffer.slice(this._offset, this._offset + len);
        return this._offset += len, buf;
      }, SSHBuffer.prototype.readString = function() {
        return this.readBuffer().toString();
      }, SSHBuffer.prototype.readCString = function() {
        for (var offset = this._offset; offset < this._buffer.length && 0 !== this._buffer[offset]; ) offset++;
        assert.ok(offset < this._buffer.length, "c string does not terminate");
        var str = this._buffer.slice(this._offset, offset).toString();
        return this._offset = offset + 1, str;
      }, SSHBuffer.prototype.readInt = function() {
        var v = this._buffer.readUInt32BE(this._offset);
        return this._offset += 4, v;
      }, SSHBuffer.prototype.readInt64 = function() {
        assert.ok(this._offset + 8 < this._buffer.length, "buffer not long enough to read Int64");
        var v = this._buffer.slice(this._offset, this._offset + 8);
        return this._offset += 8, v;
      }, SSHBuffer.prototype.readChar = function() {
        return this._buffer[this._offset++];
      }, SSHBuffer.prototype.writeBuffer = function(buf) {
        for (;this._offset + 4 + buf.length > this._size; ) this.expand();
        this._buffer.writeUInt32BE(buf.length, this._offset), this._offset += 4, buf.copy(this._buffer, this._offset), 
        this._offset += buf.length;
      }, SSHBuffer.prototype.writeString = function(str) {
        this.writeBuffer(Buffer.from(str, "utf8"));
      }, SSHBuffer.prototype.writeCString = function(str) {
        for (;this._offset + 1 + str.length > this._size; ) this.expand();
        this._buffer.write(str, this._offset), this._offset += str.length, this._buffer[this._offset++] = 0;
      }, SSHBuffer.prototype.writeInt = function(v) {
        for (;this._offset + 4 > this._size; ) this.expand();
        this._buffer.writeUInt32BE(v, this._offset), this._offset += 4;
      }, SSHBuffer.prototype.writeInt64 = function(v) {
        if (assert.buffer(v, "value"), v.length > 8) {
          for (var lead = v.slice(0, v.length - 8), i = 0; i < lead.length; ++i) assert.strictEqual(lead[i], 0, "must fit in 64 bits of precision");
          v = v.slice(v.length - 8, v.length);
        }
        for (;this._offset + 8 > this._size; ) this.expand();
        v.copy(this._buffer, this._offset), this._offset += 8;
      }, SSHBuffer.prototype.writeChar = function(v) {
        for (;this._offset + 1 > this._size; ) this.expand();
        this._buffer[this._offset++] = v;
      }, SSHBuffer.prototype.writePart = function(p) {
        this.writeBuffer(p.data);
      }, SSHBuffer.prototype.write = function(buf) {
        for (;this._offset + buf.length > this._size; ) this.expand();
        buf.copy(this._buffer, this._offset), this._offset += buf.length;
      };
    },
    25742: (module, __unused_webpack_exports, __webpack_require__) => {
      module.exports = {
        bufferSplit: function(buf, chr) {
          assert.buffer(buf), assert.string(chr);
          for (var parts = [], lastPart = 0, matches = 0, i = 0; i < buf.length; ++i) if (buf[i] === chr.charCodeAt(matches) ? ++matches : matches = buf[i] === chr.charCodeAt(0) ? 1 : 0, 
          matches >= chr.length) {
            var newPart = i + 1;
            parts.push(buf.slice(lastPart, newPart - matches)), lastPart = newPart, matches = 0;
          }
          lastPart <= buf.length && parts.push(buf.slice(lastPart, buf.length));
          return parts;
        },
        addRSAMissing: function(key) {
          assert.object(key), assertCompatible(key, PrivateKey, [ 1, 1 ]);
          var buf, d = new jsbn(key.part.d.data);
          if (!key.part.dmodp) {
            var p = new jsbn(key.part.p.data), dmodp = d.mod(p.subtract(1));
            buf = bigintToMpBuf(dmodp), key.part.dmodp = {
              name: "dmodp",
              data: buf
            }, key.parts.push(key.part.dmodp);
          }
          if (!key.part.dmodq) {
            var q = new jsbn(key.part.q.data), dmodq = d.mod(q.subtract(1));
            buf = bigintToMpBuf(dmodq), key.part.dmodq = {
              name: "dmodq",
              data: buf
            }, key.parts.push(key.part.dmodq);
          }
        },
        calculateDSAPublic: function(g, p, x) {
          return assert.buffer(g), assert.buffer(p), assert.buffer(x), g = new jsbn(g), p = new jsbn(p), 
          x = new jsbn(x), bigintToMpBuf(g.modPow(x, p));
        },
        calculateED25519Public: function(k) {
          assert.buffer(k);
          var kp = nacl.sign.keyPair.fromSeed(new Uint8Array(k));
          return Buffer.from(kp.publicKey);
        },
        calculateX25519Public: function(k) {
          assert.buffer(k);
          var kp = nacl.box.keyPair.fromSeed(new Uint8Array(k));
          return Buffer.from(kp.publicKey);
        },
        mpNormalize,
        mpDenormalize: function(buf) {
          assert.buffer(buf);
          for (;buf.length > 1 && 0 === buf[0]; ) buf = buf.slice(1);
          return buf;
        },
        ecNormalize: function(buf, addZero) {
          if (assert.buffer(buf), 0 === buf[0] && 4 === buf[1]) return addZero ? buf : buf.slice(1);
          if (4 === buf[0]) {
            if (!addZero) return buf;
          } else {
            for (;0 === buf[0]; ) buf = buf.slice(1);
            if (2 === buf[0] || 3 === buf[0]) throw new Error("Compressed elliptic curve points are not supported");
            if (4 !== buf[0]) throw new Error("Not a valid elliptic curve point");
            if (!addZero) return buf;
          }
          var b = Buffer.alloc(buf.length + 1);
          return b[0] = 0, buf.copy(b, 1), b;
        },
        countZeros: function(buf) {
          var o = 0, obit = 8;
          for (;o < buf.length; ) {
            var mask = 1 << obit;
            if ((buf[o] & mask) === mask) break;
            --obit < 0 && (o++, obit = 8);
          }
          return 8 * o + (8 - obit) - 1;
        },
        assertCompatible,
        isCompatible: function(obj, klass, needVer) {
          if (null === obj || "object" != typeof obj) return !1;
          void 0 === needVer && (needVer = klass.prototype._sshpkApiVersion);
          if (obj instanceof klass && klass.prototype._sshpkApiVersion[0] == needVer[0]) return !0;
          var proto = Object.getPrototypeOf(obj), depth = 0;
          for (;proto.constructor.name !== klass.name; ) if (!(proto = Object.getPrototypeOf(proto)) || ++depth > 3) return !1;
          if (proto.constructor.name !== klass.name) return !1;
          var ver = proto._sshpkApiVersion;
          void 0 === ver && (ver = klass._oldVersionDetect(obj));
          return !(ver[0] != needVer[0] || ver[1] < needVer[1]);
        },
        opensslKeyDeriv: function(cipher, salt, passphrase, count) {
          assert.buffer(salt, "salt"), assert.buffer(passphrase, "passphrase"), assert.number(count, "iteration count");
          var D, D_prev, bufs, clen = CIPHER_LEN[cipher];
          assert.object(clen, "supported cipher"), salt = salt.slice(0, 8);
          var material = Buffer.alloc(0);
          for (;material.length < clen.key + clen.iv; ) {
            bufs = [], D_prev && bufs.push(D_prev), bufs.push(passphrase), bufs.push(salt), 
            D = Buffer.concat(bufs);
            for (var j = 0; j < count; ++j) D = crypto.createHash("md5").update(D).digest();
            material = Buffer.concat([ material, D ]), D_prev = D;
          }
          return {
            key: material.slice(0, clen.key),
            iv: material.slice(clen.key, clen.key + clen.iv)
          };
        },
        opensshCipherInfo: function(cipher) {
          var inf = {};
          switch (cipher) {
           case "3des-cbc":
            inf.keySize = 24, inf.blockSize = 8, inf.opensslName = "des-ede3-cbc";
            break;

           case "blowfish-cbc":
            inf.keySize = 16, inf.blockSize = 8, inf.opensslName = "bf-cbc";
            break;

           case "aes128-cbc":
           case "aes128-ctr":
           case "aes128-gcm@openssh.com":
            inf.keySize = 16, inf.blockSize = 16, inf.opensslName = "aes-128-" + cipher.slice(7, 10);
            break;

           case "aes192-cbc":
           case "aes192-ctr":
           case "aes192-gcm@openssh.com":
            inf.keySize = 24, inf.blockSize = 16, inf.opensslName = "aes-192-" + cipher.slice(7, 10);
            break;

           case "aes256-cbc":
           case "aes256-ctr":
           case "aes256-gcm@openssh.com":
            inf.keySize = 32, inf.blockSize = 16, inf.opensslName = "aes-256-" + cipher.slice(7, 10);
            break;

           default:
            throw new Error('Unsupported openssl cipher "' + cipher + '"');
          }
          return inf;
        },
        publicFromPrivateECDSA: function(curveName, priv) {
          assert.string(curveName, "curveName"), assert.buffer(priv);
          var params = algs.curves[curveName], p = new jsbn(params.p), a = new jsbn(params.a), b = new jsbn(params.b), curve = new ec.ECCurveFp(p, a, b), G = curve.decodePointHex(params.G.toString("hex")), d = new jsbn(mpNormalize(priv)), pub = G.multiply(d);
          pub = Buffer.from(curve.encodePointHex(pub), "hex");
          var parts = [];
          return parts.push({
            name: "curve",
            data: Buffer.from(curveName)
          }), parts.push({
            name: "Q",
            data: pub
          }), new Key({
            type: "ecdsa",
            curve,
            parts
          });
        },
        zeroPadToLength: function(buf, len) {
          assert.buffer(buf), assert.number(len);
          for (;buf.length > len; ) assert.equal(buf[0], 0), buf = buf.slice(1);
          for (;buf.length < len; ) {
            var b = Buffer.alloc(buf.length + 1);
            b[0] = 0, buf.copy(b, 1), buf = b;
          }
          return buf;
        },
        writeBitString: function(der, buf, tag) {
          void 0 === tag && (tag = asn1.Ber.BitString);
          var b = Buffer.alloc(buf.length + 1);
          b[0] = 0, buf.copy(b, 1), der.writeBuffer(b, tag);
        },
        readBitString: function(der, tag) {
          void 0 === tag && (tag = asn1.Ber.BitString);
          var buf = der.readString(tag, !0);
          return assert.strictEqual(buf[0], 0, "bit strings with unused bits are not supported (0x" + buf[0].toString(16) + ")"), 
          buf.slice(1);
        },
        pbkdf2: function(hashAlg, salt, iterations, size, passphrase) {
          var hkey = Buffer.alloc(salt.length + 4);
          salt.copy(hkey);
          var gen = 0, ts = [], i = 1;
          for (;gen < size; ) {
            var t = T(i++);
            gen += t.length, ts.push(t);
          }
          return Buffer.concat(ts).slice(0, size);
          function T(I) {
            hkey.writeUInt32BE(I, hkey.length - 4);
            var hmac = crypto.createHmac(hashAlg, passphrase);
            hmac.update(hkey);
            for (var Ti = hmac.digest(), Uc = Ti, c = 1; c++ < iterations; ) {
              (hmac = crypto.createHmac(hashAlg, passphrase)).update(Uc), Uc = hmac.digest();
              for (var x = 0; x < Ti.length; ++x) Ti[x] ^= Uc[x];
            }
            return Ti;
          }
        }
      };
      var assert = __webpack_require__(2675), Buffer = __webpack_require__(12237).Buffer, PrivateKey = __webpack_require__(53799), Key = __webpack_require__(7710), crypto = __webpack_require__(6113), algs = __webpack_require__(95878), asn1 = __webpack_require__(58814), ec = __webpack_require__(97660), jsbn = __webpack_require__(32630).BigInteger, nacl = __webpack_require__(36046);
      function assertCompatible(obj, klass, needVer, name) {
        if (void 0 === name && (name = "object"), assert.ok(obj, name + " must not be null"), 
        assert.object(obj, name + " must be an object"), void 0 === needVer && (needVer = klass.prototype._sshpkApiVersion), 
        !(obj instanceof klass && klass.prototype._sshpkApiVersion[0] == needVer[0])) {
          for (var proto = Object.getPrototypeOf(obj), depth = 0; proto.constructor.name !== klass.name; ) proto = Object.getPrototypeOf(proto), 
          assert.ok(proto && ++depth <= 3, name + " must be a " + klass.name + " instance");
          assert.strictEqual(proto.constructor.name, klass.name, name + " must be a " + klass.name + " instance");
          var ver = proto._sshpkApiVersion;
          void 0 === ver && (ver = klass._oldVersionDetect(obj)), assert.ok(ver[0] == needVer[0] && ver[1] >= needVer[1], name + " must be compatible with " + klass.name + " klass version " + needVer[0] + "." + needVer[1]);
        }
      }
      var CIPHER_LEN = {
        "des-ede3-cbc": {
          key: 24,
          iv: 8
        },
        "aes-128-cbc": {
          key: 16,
          iv: 16
        },
        "aes-256-cbc": {
          key: 32,
          iv: 16
        }
      };
      function mpNormalize(buf) {
        for (assert.buffer(buf); buf.length > 1 && 0 === buf[0] && 0 == (128 & buf[1]); ) buf = buf.slice(1);
        if (128 == (128 & buf[0])) {
          var b = Buffer.alloc(buf.length + 1);
          b[0] = 0, buf.copy(b, 1), buf = b;
        }
        return buf;
      }
      function bigintToMpBuf(bigint) {
        var buf = Buffer.from(bigint.toByteArray());
        return buf = mpNormalize(buf);
      }
    },
    36046: (module, __unused_webpack_exports, __webpack_require__) => {
      !function(nacl) {
        "use strict";
        var gf = function(init) {
          var i, r = new Float64Array(16);
          if (init) for (i = 0; i < init.length; i++) r[i] = init[i];
          return r;
        }, randombytes = function() {
          throw new Error("no PRNG");
        }, _0 = new Uint8Array(16), _9 = new Uint8Array(32);
        _9[0] = 9;
        var gf0 = gf(), gf1 = gf([ 1 ]), _121665 = gf([ 56129, 1 ]), D = gf([ 30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995 ]), D2 = gf([ 61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222 ]), X = gf([ 54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553 ]), Y = gf([ 26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214 ]), I = gf([ 41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139 ]);
        function ts64(x, i, h, l) {
          x[i] = h >> 24 & 255, x[i + 1] = h >> 16 & 255, x[i + 2] = h >> 8 & 255, x[i + 3] = 255 & h, 
          x[i + 4] = l >> 24 & 255, x[i + 5] = l >> 16 & 255, x[i + 6] = l >> 8 & 255, x[i + 7] = 255 & l;
        }
        function vn(x, xi, y, yi, n) {
          var i, d = 0;
          for (i = 0; i < n; i++) d |= x[xi + i] ^ y[yi + i];
          return (1 & d - 1 >>> 8) - 1;
        }
        function crypto_verify_16(x, xi, y, yi) {
          return vn(x, xi, y, yi, 16);
        }
        function crypto_verify_32(x, xi, y, yi) {
          return vn(x, xi, y, yi, 32);
        }
        function crypto_core_salsa20(out, inp, k, c) {
          !function(o, p, k, c) {
            for (var u, j0 = 255 & c[0] | (255 & c[1]) << 8 | (255 & c[2]) << 16 | (255 & c[3]) << 24, j1 = 255 & k[0] | (255 & k[1]) << 8 | (255 & k[2]) << 16 | (255 & k[3]) << 24, j2 = 255 & k[4] | (255 & k[5]) << 8 | (255 & k[6]) << 16 | (255 & k[7]) << 24, j3 = 255 & k[8] | (255 & k[9]) << 8 | (255 & k[10]) << 16 | (255 & k[11]) << 24, j4 = 255 & k[12] | (255 & k[13]) << 8 | (255 & k[14]) << 16 | (255 & k[15]) << 24, j5 = 255 & c[4] | (255 & c[5]) << 8 | (255 & c[6]) << 16 | (255 & c[7]) << 24, j6 = 255 & p[0] | (255 & p[1]) << 8 | (255 & p[2]) << 16 | (255 & p[3]) << 24, j7 = 255 & p[4] | (255 & p[5]) << 8 | (255 & p[6]) << 16 | (255 & p[7]) << 24, j8 = 255 & p[8] | (255 & p[9]) << 8 | (255 & p[10]) << 16 | (255 & p[11]) << 24, j9 = 255 & p[12] | (255 & p[13]) << 8 | (255 & p[14]) << 16 | (255 & p[15]) << 24, j10 = 255 & c[8] | (255 & c[9]) << 8 | (255 & c[10]) << 16 | (255 & c[11]) << 24, j11 = 255 & k[16] | (255 & k[17]) << 8 | (255 & k[18]) << 16 | (255 & k[19]) << 24, j12 = 255 & k[20] | (255 & k[21]) << 8 | (255 & k[22]) << 16 | (255 & k[23]) << 24, j13 = 255 & k[24] | (255 & k[25]) << 8 | (255 & k[26]) << 16 | (255 & k[27]) << 24, j14 = 255 & k[28] | (255 & k[29]) << 8 | (255 & k[30]) << 16 | (255 & k[31]) << 24, j15 = 255 & c[12] | (255 & c[13]) << 8 | (255 & c[14]) << 16 | (255 & c[15]) << 24, x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7, x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14, x15 = j15, i = 0; i < 20; i += 2) x0 ^= (u = (x12 ^= (u = (x8 ^= (u = (x4 ^= (u = x0 + x12 | 0) << 7 | u >>> 25) + x0 | 0) << 9 | u >>> 23) + x4 | 0) << 13 | u >>> 19) + x8 | 0) << 18 | u >>> 14, 
            x5 ^= (u = (x1 ^= (u = (x13 ^= (u = (x9 ^= (u = x5 + x1 | 0) << 7 | u >>> 25) + x5 | 0) << 9 | u >>> 23) + x9 | 0) << 13 | u >>> 19) + x13 | 0) << 18 | u >>> 14, 
            x10 ^= (u = (x6 ^= (u = (x2 ^= (u = (x14 ^= (u = x10 + x6 | 0) << 7 | u >>> 25) + x10 | 0) << 9 | u >>> 23) + x14 | 0) << 13 | u >>> 19) + x2 | 0) << 18 | u >>> 14, 
            x15 ^= (u = (x11 ^= (u = (x7 ^= (u = (x3 ^= (u = x15 + x11 | 0) << 7 | u >>> 25) + x15 | 0) << 9 | u >>> 23) + x3 | 0) << 13 | u >>> 19) + x7 | 0) << 18 | u >>> 14, 
            x0 ^= (u = (x3 ^= (u = (x2 ^= (u = (x1 ^= (u = x0 + x3 | 0) << 7 | u >>> 25) + x0 | 0) << 9 | u >>> 23) + x1 | 0) << 13 | u >>> 19) + x2 | 0) << 18 | u >>> 14, 
            x5 ^= (u = (x4 ^= (u = (x7 ^= (u = (x6 ^= (u = x5 + x4 | 0) << 7 | u >>> 25) + x5 | 0) << 9 | u >>> 23) + x6 | 0) << 13 | u >>> 19) + x7 | 0) << 18 | u >>> 14, 
            x10 ^= (u = (x9 ^= (u = (x8 ^= (u = (x11 ^= (u = x10 + x9 | 0) << 7 | u >>> 25) + x10 | 0) << 9 | u >>> 23) + x11 | 0) << 13 | u >>> 19) + x8 | 0) << 18 | u >>> 14, 
            x15 ^= (u = (x14 ^= (u = (x13 ^= (u = (x12 ^= (u = x15 + x14 | 0) << 7 | u >>> 25) + x15 | 0) << 9 | u >>> 23) + x12 | 0) << 13 | u >>> 19) + x13 | 0) << 18 | u >>> 14;
            x0 = x0 + j0 | 0, x1 = x1 + j1 | 0, x2 = x2 + j2 | 0, x3 = x3 + j3 | 0, x4 = x4 + j4 | 0, 
            x5 = x5 + j5 | 0, x6 = x6 + j6 | 0, x7 = x7 + j7 | 0, x8 = x8 + j8 | 0, x9 = x9 + j9 | 0, 
            x10 = x10 + j10 | 0, x11 = x11 + j11 | 0, x12 = x12 + j12 | 0, x13 = x13 + j13 | 0, 
            x14 = x14 + j14 | 0, x15 = x15 + j15 | 0, o[0] = x0 >>> 0 & 255, o[1] = x0 >>> 8 & 255, 
            o[2] = x0 >>> 16 & 255, o[3] = x0 >>> 24 & 255, o[4] = x1 >>> 0 & 255, o[5] = x1 >>> 8 & 255, 
            o[6] = x1 >>> 16 & 255, o[7] = x1 >>> 24 & 255, o[8] = x2 >>> 0 & 255, o[9] = x2 >>> 8 & 255, 
            o[10] = x2 >>> 16 & 255, o[11] = x2 >>> 24 & 255, o[12] = x3 >>> 0 & 255, o[13] = x3 >>> 8 & 255, 
            o[14] = x3 >>> 16 & 255, o[15] = x3 >>> 24 & 255, o[16] = x4 >>> 0 & 255, o[17] = x4 >>> 8 & 255, 
            o[18] = x4 >>> 16 & 255, o[19] = x4 >>> 24 & 255, o[20] = x5 >>> 0 & 255, o[21] = x5 >>> 8 & 255, 
            o[22] = x5 >>> 16 & 255, o[23] = x5 >>> 24 & 255, o[24] = x6 >>> 0 & 255, o[25] = x6 >>> 8 & 255, 
            o[26] = x6 >>> 16 & 255, o[27] = x6 >>> 24 & 255, o[28] = x7 >>> 0 & 255, o[29] = x7 >>> 8 & 255, 
            o[30] = x7 >>> 16 & 255, o[31] = x7 >>> 24 & 255, o[32] = x8 >>> 0 & 255, o[33] = x8 >>> 8 & 255, 
            o[34] = x8 >>> 16 & 255, o[35] = x8 >>> 24 & 255, o[36] = x9 >>> 0 & 255, o[37] = x9 >>> 8 & 255, 
            o[38] = x9 >>> 16 & 255, o[39] = x9 >>> 24 & 255, o[40] = x10 >>> 0 & 255, o[41] = x10 >>> 8 & 255, 
            o[42] = x10 >>> 16 & 255, o[43] = x10 >>> 24 & 255, o[44] = x11 >>> 0 & 255, o[45] = x11 >>> 8 & 255, 
            o[46] = x11 >>> 16 & 255, o[47] = x11 >>> 24 & 255, o[48] = x12 >>> 0 & 255, o[49] = x12 >>> 8 & 255, 
            o[50] = x12 >>> 16 & 255, o[51] = x12 >>> 24 & 255, o[52] = x13 >>> 0 & 255, o[53] = x13 >>> 8 & 255, 
            o[54] = x13 >>> 16 & 255, o[55] = x13 >>> 24 & 255, o[56] = x14 >>> 0 & 255, o[57] = x14 >>> 8 & 255, 
            o[58] = x14 >>> 16 & 255, o[59] = x14 >>> 24 & 255, o[60] = x15 >>> 0 & 255, o[61] = x15 >>> 8 & 255, 
            o[62] = x15 >>> 16 & 255, o[63] = x15 >>> 24 & 255;
          }(out, inp, k, c);
        }
        function crypto_core_hsalsa20(out, inp, k, c) {
          !function(o, p, k, c) {
            for (var u, x0 = 255 & c[0] | (255 & c[1]) << 8 | (255 & c[2]) << 16 | (255 & c[3]) << 24, x1 = 255 & k[0] | (255 & k[1]) << 8 | (255 & k[2]) << 16 | (255 & k[3]) << 24, x2 = 255 & k[4] | (255 & k[5]) << 8 | (255 & k[6]) << 16 | (255 & k[7]) << 24, x3 = 255 & k[8] | (255 & k[9]) << 8 | (255 & k[10]) << 16 | (255 & k[11]) << 24, x4 = 255 & k[12] | (255 & k[13]) << 8 | (255 & k[14]) << 16 | (255 & k[15]) << 24, x5 = 255 & c[4] | (255 & c[5]) << 8 | (255 & c[6]) << 16 | (255 & c[7]) << 24, x6 = 255 & p[0] | (255 & p[1]) << 8 | (255 & p[2]) << 16 | (255 & p[3]) << 24, x7 = 255 & p[4] | (255 & p[5]) << 8 | (255 & p[6]) << 16 | (255 & p[7]) << 24, x8 = 255 & p[8] | (255 & p[9]) << 8 | (255 & p[10]) << 16 | (255 & p[11]) << 24, x9 = 255 & p[12] | (255 & p[13]) << 8 | (255 & p[14]) << 16 | (255 & p[15]) << 24, x10 = 255 & c[8] | (255 & c[9]) << 8 | (255 & c[10]) << 16 | (255 & c[11]) << 24, x11 = 255 & k[16] | (255 & k[17]) << 8 | (255 & k[18]) << 16 | (255 & k[19]) << 24, x12 = 255 & k[20] | (255 & k[21]) << 8 | (255 & k[22]) << 16 | (255 & k[23]) << 24, x13 = 255 & k[24] | (255 & k[25]) << 8 | (255 & k[26]) << 16 | (255 & k[27]) << 24, x14 = 255 & k[28] | (255 & k[29]) << 8 | (255 & k[30]) << 16 | (255 & k[31]) << 24, x15 = 255 & c[12] | (255 & c[13]) << 8 | (255 & c[14]) << 16 | (255 & c[15]) << 24, i = 0; i < 20; i += 2) x0 ^= (u = (x12 ^= (u = (x8 ^= (u = (x4 ^= (u = x0 + x12 | 0) << 7 | u >>> 25) + x0 | 0) << 9 | u >>> 23) + x4 | 0) << 13 | u >>> 19) + x8 | 0) << 18 | u >>> 14, 
            x5 ^= (u = (x1 ^= (u = (x13 ^= (u = (x9 ^= (u = x5 + x1 | 0) << 7 | u >>> 25) + x5 | 0) << 9 | u >>> 23) + x9 | 0) << 13 | u >>> 19) + x13 | 0) << 18 | u >>> 14, 
            x10 ^= (u = (x6 ^= (u = (x2 ^= (u = (x14 ^= (u = x10 + x6 | 0) << 7 | u >>> 25) + x10 | 0) << 9 | u >>> 23) + x14 | 0) << 13 | u >>> 19) + x2 | 0) << 18 | u >>> 14, 
            x15 ^= (u = (x11 ^= (u = (x7 ^= (u = (x3 ^= (u = x15 + x11 | 0) << 7 | u >>> 25) + x15 | 0) << 9 | u >>> 23) + x3 | 0) << 13 | u >>> 19) + x7 | 0) << 18 | u >>> 14, 
            x0 ^= (u = (x3 ^= (u = (x2 ^= (u = (x1 ^= (u = x0 + x3 | 0) << 7 | u >>> 25) + x0 | 0) << 9 | u >>> 23) + x1 | 0) << 13 | u >>> 19) + x2 | 0) << 18 | u >>> 14, 
            x5 ^= (u = (x4 ^= (u = (x7 ^= (u = (x6 ^= (u = x5 + x4 | 0) << 7 | u >>> 25) + x5 | 0) << 9 | u >>> 23) + x6 | 0) << 13 | u >>> 19) + x7 | 0) << 18 | u >>> 14, 
            x10 ^= (u = (x9 ^= (u = (x8 ^= (u = (x11 ^= (u = x10 + x9 | 0) << 7 | u >>> 25) + x10 | 0) << 9 | u >>> 23) + x11 | 0) << 13 | u >>> 19) + x8 | 0) << 18 | u >>> 14, 
            x15 ^= (u = (x14 ^= (u = (x13 ^= (u = (x12 ^= (u = x15 + x14 | 0) << 7 | u >>> 25) + x15 | 0) << 9 | u >>> 23) + x12 | 0) << 13 | u >>> 19) + x13 | 0) << 18 | u >>> 14;
            o[0] = x0 >>> 0 & 255, o[1] = x0 >>> 8 & 255, o[2] = x0 >>> 16 & 255, o[3] = x0 >>> 24 & 255, 
            o[4] = x5 >>> 0 & 255, o[5] = x5 >>> 8 & 255, o[6] = x5 >>> 16 & 255, o[7] = x5 >>> 24 & 255, 
            o[8] = x10 >>> 0 & 255, o[9] = x10 >>> 8 & 255, o[10] = x10 >>> 16 & 255, o[11] = x10 >>> 24 & 255, 
            o[12] = x15 >>> 0 & 255, o[13] = x15 >>> 8 & 255, o[14] = x15 >>> 16 & 255, o[15] = x15 >>> 24 & 255, 
            o[16] = x6 >>> 0 & 255, o[17] = x6 >>> 8 & 255, o[18] = x6 >>> 16 & 255, o[19] = x6 >>> 24 & 255, 
            o[20] = x7 >>> 0 & 255, o[21] = x7 >>> 8 & 255, o[22] = x7 >>> 16 & 255, o[23] = x7 >>> 24 & 255, 
            o[24] = x8 >>> 0 & 255, o[25] = x8 >>> 8 & 255, o[26] = x8 >>> 16 & 255, o[27] = x8 >>> 24 & 255, 
            o[28] = x9 >>> 0 & 255, o[29] = x9 >>> 8 & 255, o[30] = x9 >>> 16 & 255, o[31] = x9 >>> 24 & 255;
          }(out, inp, k, c);
        }
        var sigma = new Uint8Array([ 101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107 ]);
        function crypto_stream_salsa20_xor(c, cpos, m, mpos, b, n, k) {
          var u, i, z = new Uint8Array(16), x = new Uint8Array(64);
          for (i = 0; i < 16; i++) z[i] = 0;
          for (i = 0; i < 8; i++) z[i] = n[i];
          for (;b >= 64; ) {
            for (crypto_core_salsa20(x, z, k, sigma), i = 0; i < 64; i++) c[cpos + i] = m[mpos + i] ^ x[i];
            for (u = 1, i = 8; i < 16; i++) u = u + (255 & z[i]) | 0, z[i] = 255 & u, u >>>= 8;
            b -= 64, cpos += 64, mpos += 64;
          }
          if (b > 0) for (crypto_core_salsa20(x, z, k, sigma), i = 0; i < b; i++) c[cpos + i] = m[mpos + i] ^ x[i];
          return 0;
        }
        function crypto_stream_salsa20(c, cpos, b, n, k) {
          var u, i, z = new Uint8Array(16), x = new Uint8Array(64);
          for (i = 0; i < 16; i++) z[i] = 0;
          for (i = 0; i < 8; i++) z[i] = n[i];
          for (;b >= 64; ) {
            for (crypto_core_salsa20(x, z, k, sigma), i = 0; i < 64; i++) c[cpos + i] = x[i];
            for (u = 1, i = 8; i < 16; i++) u = u + (255 & z[i]) | 0, z[i] = 255 & u, u >>>= 8;
            b -= 64, cpos += 64;
          }
          if (b > 0) for (crypto_core_salsa20(x, z, k, sigma), i = 0; i < b; i++) c[cpos + i] = x[i];
          return 0;
        }
        function crypto_stream(c, cpos, d, n, k) {
          var s = new Uint8Array(32);
          crypto_core_hsalsa20(s, n, k, sigma);
          for (var sn = new Uint8Array(8), i = 0; i < 8; i++) sn[i] = n[i + 16];
          return crypto_stream_salsa20(c, cpos, d, sn, s);
        }
        function crypto_stream_xor(c, cpos, m, mpos, d, n, k) {
          var s = new Uint8Array(32);
          crypto_core_hsalsa20(s, n, k, sigma);
          for (var sn = new Uint8Array(8), i = 0; i < 8; i++) sn[i] = n[i + 16];
          return crypto_stream_salsa20_xor(c, cpos, m, mpos, d, sn, s);
        }
        var poly1305 = function(key) {
          var t0, t1, t2, t3, t4, t5, t6, t7;
          this.buffer = new Uint8Array(16), this.r = new Uint16Array(10), this.h = new Uint16Array(10), 
          this.pad = new Uint16Array(8), this.leftover = 0, this.fin = 0, t0 = 255 & key[0] | (255 & key[1]) << 8, 
          this.r[0] = 8191 & t0, t1 = 255 & key[2] | (255 & key[3]) << 8, this.r[1] = 8191 & (t0 >>> 13 | t1 << 3), 
          t2 = 255 & key[4] | (255 & key[5]) << 8, this.r[2] = 7939 & (t1 >>> 10 | t2 << 6), 
          t3 = 255 & key[6] | (255 & key[7]) << 8, this.r[3] = 8191 & (t2 >>> 7 | t3 << 9), 
          t4 = 255 & key[8] | (255 & key[9]) << 8, this.r[4] = 255 & (t3 >>> 4 | t4 << 12), 
          this.r[5] = t4 >>> 1 & 8190, t5 = 255 & key[10] | (255 & key[11]) << 8, this.r[6] = 8191 & (t4 >>> 14 | t5 << 2), 
          t6 = 255 & key[12] | (255 & key[13]) << 8, this.r[7] = 8065 & (t5 >>> 11 | t6 << 5), 
          t7 = 255 & key[14] | (255 & key[15]) << 8, this.r[8] = 8191 & (t6 >>> 8 | t7 << 8), 
          this.r[9] = t7 >>> 5 & 127, this.pad[0] = 255 & key[16] | (255 & key[17]) << 8, 
          this.pad[1] = 255 & key[18] | (255 & key[19]) << 8, this.pad[2] = 255 & key[20] | (255 & key[21]) << 8, 
          this.pad[3] = 255 & key[22] | (255 & key[23]) << 8, this.pad[4] = 255 & key[24] | (255 & key[25]) << 8, 
          this.pad[5] = 255 & key[26] | (255 & key[27]) << 8, this.pad[6] = 255 & key[28] | (255 & key[29]) << 8, 
          this.pad[7] = 255 & key[30] | (255 & key[31]) << 8;
        };
        function crypto_onetimeauth(out, outpos, m, mpos, n, k) {
          var s = new poly1305(k);
          return s.update(m, mpos, n), s.finish(out, outpos), 0;
        }
        function crypto_onetimeauth_verify(h, hpos, m, mpos, n, k) {
          var x = new Uint8Array(16);
          return crypto_onetimeauth(x, 0, m, mpos, n, k), crypto_verify_16(h, hpos, x, 0);
        }
        function crypto_secretbox(c, m, d, n, k) {
          var i;
          if (d < 32) return -1;
          for (crypto_stream_xor(c, 0, m, 0, d, n, k), crypto_onetimeauth(c, 16, c, 32, d - 32, c), 
          i = 0; i < 16; i++) c[i] = 0;
          return 0;
        }
        function crypto_secretbox_open(m, c, d, n, k) {
          var i, x = new Uint8Array(32);
          if (d < 32) return -1;
          if (crypto_stream(x, 0, 32, n, k), 0 !== crypto_onetimeauth_verify(c, 16, c, 32, d - 32, x)) return -1;
          for (crypto_stream_xor(m, 0, c, 0, d, n, k), i = 0; i < 32; i++) m[i] = 0;
          return 0;
        }
        function set25519(r, a) {
          var i;
          for (i = 0; i < 16; i++) r[i] = 0 | a[i];
        }
        function car25519(o) {
          var i, v, c = 1;
          for (i = 0; i < 16; i++) v = o[i] + c + 65535, c = Math.floor(v / 65536), o[i] = v - 65536 * c;
          o[0] += c - 1 + 37 * (c - 1);
        }
        function sel25519(p, q, b) {
          for (var t, c = ~(b - 1), i = 0; i < 16; i++) t = c & (p[i] ^ q[i]), p[i] ^= t, 
          q[i] ^= t;
        }
        function pack25519(o, n) {
          var i, j, b, m = gf(), t = gf();
          for (i = 0; i < 16; i++) t[i] = n[i];
          for (car25519(t), car25519(t), car25519(t), j = 0; j < 2; j++) {
            for (m[0] = t[0] - 65517, i = 1; i < 15; i++) m[i] = t[i] - 65535 - (m[i - 1] >> 16 & 1), 
            m[i - 1] &= 65535;
            m[15] = t[15] - 32767 - (m[14] >> 16 & 1), b = m[15] >> 16 & 1, m[14] &= 65535, 
            sel25519(t, m, 1 - b);
          }
          for (i = 0; i < 16; i++) o[2 * i] = 255 & t[i], o[2 * i + 1] = t[i] >> 8;
        }
        function neq25519(a, b) {
          var c = new Uint8Array(32), d = new Uint8Array(32);
          return pack25519(c, a), pack25519(d, b), crypto_verify_32(c, 0, d, 0);
        }
        function par25519(a) {
          var d = new Uint8Array(32);
          return pack25519(d, a), 1 & d[0];
        }
        function unpack25519(o, n) {
          var i;
          for (i = 0; i < 16; i++) o[i] = n[2 * i] + (n[2 * i + 1] << 8);
          o[15] &= 32767;
        }
        function A(o, a, b) {
          for (var i = 0; i < 16; i++) o[i] = a[i] + b[i];
        }
        function Z(o, a, b) {
          for (var i = 0; i < 16; i++) o[i] = a[i] - b[i];
        }
        function M(o, a, b) {
          var v, c, t0 = 0, t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0, t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0, t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0, b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11], b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
          t0 += (v = a[0]) * b0, t1 += v * b1, t2 += v * b2, t3 += v * b3, t4 += v * b4, t5 += v * b5, 
          t6 += v * b6, t7 += v * b7, t8 += v * b8, t9 += v * b9, t10 += v * b10, t11 += v * b11, 
          t12 += v * b12, t13 += v * b13, t14 += v * b14, t15 += v * b15, t1 += (v = a[1]) * b0, 
          t2 += v * b1, t3 += v * b2, t4 += v * b3, t5 += v * b4, t6 += v * b5, t7 += v * b6, 
          t8 += v * b7, t9 += v * b8, t10 += v * b9, t11 += v * b10, t12 += v * b11, t13 += v * b12, 
          t14 += v * b13, t15 += v * b14, t16 += v * b15, t2 += (v = a[2]) * b0, t3 += v * b1, 
          t4 += v * b2, t5 += v * b3, t6 += v * b4, t7 += v * b5, t8 += v * b6, t9 += v * b7, 
          t10 += v * b8, t11 += v * b9, t12 += v * b10, t13 += v * b11, t14 += v * b12, t15 += v * b13, 
          t16 += v * b14, t17 += v * b15, t3 += (v = a[3]) * b0, t4 += v * b1, t5 += v * b2, 
          t6 += v * b3, t7 += v * b4, t8 += v * b5, t9 += v * b6, t10 += v * b7, t11 += v * b8, 
          t12 += v * b9, t13 += v * b10, t14 += v * b11, t15 += v * b12, t16 += v * b13, t17 += v * b14, 
          t18 += v * b15, t4 += (v = a[4]) * b0, t5 += v * b1, t6 += v * b2, t7 += v * b3, 
          t8 += v * b4, t9 += v * b5, t10 += v * b6, t11 += v * b7, t12 += v * b8, t13 += v * b9, 
          t14 += v * b10, t15 += v * b11, t16 += v * b12, t17 += v * b13, t18 += v * b14, 
          t19 += v * b15, t5 += (v = a[5]) * b0, t6 += v * b1, t7 += v * b2, t8 += v * b3, 
          t9 += v * b4, t10 += v * b5, t11 += v * b6, t12 += v * b7, t13 += v * b8, t14 += v * b9, 
          t15 += v * b10, t16 += v * b11, t17 += v * b12, t18 += v * b13, t19 += v * b14, 
          t20 += v * b15, t6 += (v = a[6]) * b0, t7 += v * b1, t8 += v * b2, t9 += v * b3, 
          t10 += v * b4, t11 += v * b5, t12 += v * b6, t13 += v * b7, t14 += v * b8, t15 += v * b9, 
          t16 += v * b10, t17 += v * b11, t18 += v * b12, t19 += v * b13, t20 += v * b14, 
          t21 += v * b15, t7 += (v = a[7]) * b0, t8 += v * b1, t9 += v * b2, t10 += v * b3, 
          t11 += v * b4, t12 += v * b5, t13 += v * b6, t14 += v * b7, t15 += v * b8, t16 += v * b9, 
          t17 += v * b10, t18 += v * b11, t19 += v * b12, t20 += v * b13, t21 += v * b14, 
          t22 += v * b15, t8 += (v = a[8]) * b0, t9 += v * b1, t10 += v * b2, t11 += v * b3, 
          t12 += v * b4, t13 += v * b5, t14 += v * b6, t15 += v * b7, t16 += v * b8, t17 += v * b9, 
          t18 += v * b10, t19 += v * b11, t20 += v * b12, t21 += v * b13, t22 += v * b14, 
          t23 += v * b15, t9 += (v = a[9]) * b0, t10 += v * b1, t11 += v * b2, t12 += v * b3, 
          t13 += v * b4, t14 += v * b5, t15 += v * b6, t16 += v * b7, t17 += v * b8, t18 += v * b9, 
          t19 += v * b10, t20 += v * b11, t21 += v * b12, t22 += v * b13, t23 += v * b14, 
          t24 += v * b15, t10 += (v = a[10]) * b0, t11 += v * b1, t12 += v * b2, t13 += v * b3, 
          t14 += v * b4, t15 += v * b5, t16 += v * b6, t17 += v * b7, t18 += v * b8, t19 += v * b9, 
          t20 += v * b10, t21 += v * b11, t22 += v * b12, t23 += v * b13, t24 += v * b14, 
          t25 += v * b15, t11 += (v = a[11]) * b0, t12 += v * b1, t13 += v * b2, t14 += v * b3, 
          t15 += v * b4, t16 += v * b5, t17 += v * b6, t18 += v * b7, t19 += v * b8, t20 += v * b9, 
          t21 += v * b10, t22 += v * b11, t23 += v * b12, t24 += v * b13, t25 += v * b14, 
          t26 += v * b15, t12 += (v = a[12]) * b0, t13 += v * b1, t14 += v * b2, t15 += v * b3, 
          t16 += v * b4, t17 += v * b5, t18 += v * b6, t19 += v * b7, t20 += v * b8, t21 += v * b9, 
          t22 += v * b10, t23 += v * b11, t24 += v * b12, t25 += v * b13, t26 += v * b14, 
          t27 += v * b15, t13 += (v = a[13]) * b0, t14 += v * b1, t15 += v * b2, t16 += v * b3, 
          t17 += v * b4, t18 += v * b5, t19 += v * b6, t20 += v * b7, t21 += v * b8, t22 += v * b9, 
          t23 += v * b10, t24 += v * b11, t25 += v * b12, t26 += v * b13, t27 += v * b14, 
          t28 += v * b15, t14 += (v = a[14]) * b0, t15 += v * b1, t16 += v * b2, t17 += v * b3, 
          t18 += v * b4, t19 += v * b5, t20 += v * b6, t21 += v * b7, t22 += v * b8, t23 += v * b9, 
          t24 += v * b10, t25 += v * b11, t26 += v * b12, t27 += v * b13, t28 += v * b14, 
          t29 += v * b15, t15 += (v = a[15]) * b0, t1 += 38 * (t17 += v * b2), t2 += 38 * (t18 += v * b3), 
          t3 += 38 * (t19 += v * b4), t4 += 38 * (t20 += v * b5), t5 += 38 * (t21 += v * b6), 
          t6 += 38 * (t22 += v * b7), t7 += 38 * (t23 += v * b8), t8 += 38 * (t24 += v * b9), 
          t9 += 38 * (t25 += v * b10), t10 += 38 * (t26 += v * b11), t11 += 38 * (t27 += v * b12), 
          t12 += 38 * (t28 += v * b13), t13 += 38 * (t29 += v * b14), t14 += 38 * (t30 += v * b15), 
          t0 = (v = (t0 += 38 * (t16 += v * b1)) + (c = 1) + 65535) - 65536 * (c = Math.floor(v / 65536)), 
          t1 = (v = t1 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), t2 = (v = t2 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), 
          t3 = (v = t3 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), t4 = (v = t4 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), 
          t5 = (v = t5 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), t6 = (v = t6 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), 
          t7 = (v = t7 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), t8 = (v = t8 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), 
          t9 = (v = t9 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), t10 = (v = t10 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), 
          t11 = (v = t11 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), t12 = (v = t12 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), 
          t13 = (v = t13 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), t14 = (v = t14 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), 
          t15 = (v = t15 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), t0 = (v = (t0 += c - 1 + 37 * (c - 1)) + (c = 1) + 65535) - 65536 * (c = Math.floor(v / 65536)), 
          t1 = (v = t1 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), t2 = (v = t2 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), 
          t3 = (v = t3 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), t4 = (v = t4 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), 
          t5 = (v = t5 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), t6 = (v = t6 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), 
          t7 = (v = t7 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), t8 = (v = t8 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), 
          t9 = (v = t9 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), t10 = (v = t10 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), 
          t11 = (v = t11 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), t12 = (v = t12 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), 
          t13 = (v = t13 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), t14 = (v = t14 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), 
          t15 = (v = t15 + c + 65535) - 65536 * (c = Math.floor(v / 65536)), t0 += c - 1 + 37 * (c - 1), 
          o[0] = t0, o[1] = t1, o[2] = t2, o[3] = t3, o[4] = t4, o[5] = t5, o[6] = t6, o[7] = t7, 
          o[8] = t8, o[9] = t9, o[10] = t10, o[11] = t11, o[12] = t12, o[13] = t13, o[14] = t14, 
          o[15] = t15;
        }
        function S(o, a) {
          M(o, a, a);
        }
        function inv25519(o, i) {
          var a, c = gf();
          for (a = 0; a < 16; a++) c[a] = i[a];
          for (a = 253; a >= 0; a--) S(c, c), 2 !== a && 4 !== a && M(c, c, i);
          for (a = 0; a < 16; a++) o[a] = c[a];
        }
        function crypto_scalarmult(q, n, p) {
          var r, i, z = new Uint8Array(32), x = new Float64Array(80), a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f = gf();
          for (i = 0; i < 31; i++) z[i] = n[i];
          for (z[31] = 127 & n[31] | 64, z[0] &= 248, unpack25519(x, p), i = 0; i < 16; i++) b[i] = x[i], 
          d[i] = a[i] = c[i] = 0;
          for (a[0] = d[0] = 1, i = 254; i >= 0; --i) sel25519(a, b, r = z[i >>> 3] >>> (7 & i) & 1), 
          sel25519(c, d, r), A(e, a, c), Z(a, a, c), A(c, b, d), Z(b, b, d), S(d, e), S(f, a), 
          M(a, c, a), M(c, b, e), A(e, a, c), Z(a, a, c), S(b, a), Z(c, d, f), M(a, c, _121665), 
          A(a, a, d), M(c, c, a), M(a, d, f), M(d, b, x), S(b, e), sel25519(a, b, r), sel25519(c, d, r);
          for (i = 0; i < 16; i++) x[i + 16] = a[i], x[i + 32] = c[i], x[i + 48] = b[i], x[i + 64] = d[i];
          var x32 = x.subarray(32), x16 = x.subarray(16);
          return inv25519(x32, x32), M(x16, x16, x32), pack25519(q, x16), 0;
        }
        function crypto_scalarmult_base(q, n) {
          return crypto_scalarmult(q, n, _9);
        }
        function crypto_box_keypair(y, x) {
          return randombytes(x, 32), crypto_scalarmult_base(y, x);
        }
        function crypto_box_beforenm(k, y, x) {
          var s = new Uint8Array(32);
          return crypto_scalarmult(s, x, y), crypto_core_hsalsa20(k, _0, s, sigma);
        }
        poly1305.prototype.blocks = function(m, mpos, bytes) {
          for (var t0, t1, t2, t3, t4, t5, t6, t7, c, d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, hibit = this.fin ? 0 : 2048, h0 = this.h[0], h1 = this.h[1], h2 = this.h[2], h3 = this.h[3], h4 = this.h[4], h5 = this.h[5], h6 = this.h[6], h7 = this.h[7], h8 = this.h[8], h9 = this.h[9], r0 = this.r[0], r1 = this.r[1], r2 = this.r[2], r3 = this.r[3], r4 = this.r[4], r5 = this.r[5], r6 = this.r[6], r7 = this.r[7], r8 = this.r[8], r9 = this.r[9]; bytes >= 16; ) d0 = c = 0, 
          d0 += (h0 += 8191 & (t0 = 255 & m[mpos + 0] | (255 & m[mpos + 1]) << 8)) * r0, d0 += (h1 += 8191 & (t0 >>> 13 | (t1 = 255 & m[mpos + 2] | (255 & m[mpos + 3]) << 8) << 3)) * (5 * r9), 
          d0 += (h2 += 8191 & (t1 >>> 10 | (t2 = 255 & m[mpos + 4] | (255 & m[mpos + 5]) << 8) << 6)) * (5 * r8), 
          d0 += (h3 += 8191 & (t2 >>> 7 | (t3 = 255 & m[mpos + 6] | (255 & m[mpos + 7]) << 8) << 9)) * (5 * r7), 
          c = (d0 += (h4 += 8191 & (t3 >>> 4 | (t4 = 255 & m[mpos + 8] | (255 & m[mpos + 9]) << 8) << 12)) * (5 * r6)) >>> 13, 
          d0 &= 8191, d0 += (h5 += t4 >>> 1 & 8191) * (5 * r5), d0 += (h6 += 8191 & (t4 >>> 14 | (t5 = 255 & m[mpos + 10] | (255 & m[mpos + 11]) << 8) << 2)) * (5 * r4), 
          d0 += (h7 += 8191 & (t5 >>> 11 | (t6 = 255 & m[mpos + 12] | (255 & m[mpos + 13]) << 8) << 5)) * (5 * r3), 
          d0 += (h8 += 8191 & (t6 >>> 8 | (t7 = 255 & m[mpos + 14] | (255 & m[mpos + 15]) << 8) << 8)) * (5 * r2), 
          d1 = c += (d0 += (h9 += t7 >>> 5 | hibit) * (5 * r1)) >>> 13, d1 += h0 * r1, d1 += h1 * r0, 
          d1 += h2 * (5 * r9), d1 += h3 * (5 * r8), c = (d1 += h4 * (5 * r7)) >>> 13, d1 &= 8191, 
          d1 += h5 * (5 * r6), d1 += h6 * (5 * r5), d1 += h7 * (5 * r4), d1 += h8 * (5 * r3), 
          c += (d1 += h9 * (5 * r2)) >>> 13, d1 &= 8191, d2 = c, d2 += h0 * r2, d2 += h1 * r1, 
          d2 += h2 * r0, d2 += h3 * (5 * r9), c = (d2 += h4 * (5 * r8)) >>> 13, d2 &= 8191, 
          d2 += h5 * (5 * r7), d2 += h6 * (5 * r6), d2 += h7 * (5 * r5), d2 += h8 * (5 * r4), 
          d3 = c += (d2 += h9 * (5 * r3)) >>> 13, d3 += h0 * r3, d3 += h1 * r2, d3 += h2 * r1, 
          d3 += h3 * r0, c = (d3 += h4 * (5 * r9)) >>> 13, d3 &= 8191, d3 += h5 * (5 * r8), 
          d3 += h6 * (5 * r7), d3 += h7 * (5 * r6), d3 += h8 * (5 * r5), d4 = c += (d3 += h9 * (5 * r4)) >>> 13, 
          d4 += h0 * r4, d4 += h1 * r3, d4 += h2 * r2, d4 += h3 * r1, c = (d4 += h4 * r0) >>> 13, 
          d4 &= 8191, d4 += h5 * (5 * r9), d4 += h6 * (5 * r8), d4 += h7 * (5 * r7), d4 += h8 * (5 * r6), 
          d5 = c += (d4 += h9 * (5 * r5)) >>> 13, d5 += h0 * r5, d5 += h1 * r4, d5 += h2 * r3, 
          d5 += h3 * r2, c = (d5 += h4 * r1) >>> 13, d5 &= 8191, d5 += h5 * r0, d5 += h6 * (5 * r9), 
          d5 += h7 * (5 * r8), d5 += h8 * (5 * r7), d6 = c += (d5 += h9 * (5 * r6)) >>> 13, 
          d6 += h0 * r6, d6 += h1 * r5, d6 += h2 * r4, d6 += h3 * r3, c = (d6 += h4 * r2) >>> 13, 
          d6 &= 8191, d6 += h5 * r1, d6 += h6 * r0, d6 += h7 * (5 * r9), d6 += h8 * (5 * r8), 
          d7 = c += (d6 += h9 * (5 * r7)) >>> 13, d7 += h0 * r7, d7 += h1 * r6, d7 += h2 * r5, 
          d7 += h3 * r4, c = (d7 += h4 * r3) >>> 13, d7 &= 8191, d7 += h5 * r2, d7 += h6 * r1, 
          d7 += h7 * r0, d7 += h8 * (5 * r9), d8 = c += (d7 += h9 * (5 * r8)) >>> 13, d8 += h0 * r8, 
          d8 += h1 * r7, d8 += h2 * r6, d8 += h3 * r5, c = (d8 += h4 * r4) >>> 13, d8 &= 8191, 
          d8 += h5 * r3, d8 += h6 * r2, d8 += h7 * r1, d8 += h8 * r0, d9 = c += (d8 += h9 * (5 * r9)) >>> 13, 
          d9 += h0 * r9, d9 += h1 * r8, d9 += h2 * r7, d9 += h3 * r6, c = (d9 += h4 * r5) >>> 13, 
          d9 &= 8191, d9 += h5 * r4, d9 += h6 * r3, d9 += h7 * r2, d9 += h8 * r1, h0 = d0 = 8191 & (c = (c = ((c += (d9 += h9 * r0) >>> 13) << 2) + c | 0) + (d0 &= 8191) | 0), 
          h1 = d1 += c >>>= 13, h2 = d2 &= 8191, h3 = d3 &= 8191, h4 = d4 &= 8191, h5 = d5 &= 8191, 
          h6 = d6 &= 8191, h7 = d7 &= 8191, h8 = d8 &= 8191, h9 = d9 &= 8191, mpos += 16, 
          bytes -= 16;
          this.h[0] = h0, this.h[1] = h1, this.h[2] = h2, this.h[3] = h3, this.h[4] = h4, 
          this.h[5] = h5, this.h[6] = h6, this.h[7] = h7, this.h[8] = h8, this.h[9] = h9;
        }, poly1305.prototype.finish = function(mac, macpos) {
          var c, mask, f, i, g = new Uint16Array(10);
          if (this.leftover) {
            for (i = this.leftover, this.buffer[i++] = 1; i < 16; i++) this.buffer[i] = 0;
            this.fin = 1, this.blocks(this.buffer, 0, 16);
          }
          for (c = this.h[1] >>> 13, this.h[1] &= 8191, i = 2; i < 10; i++) this.h[i] += c, 
          c = this.h[i] >>> 13, this.h[i] &= 8191;
          for (this.h[0] += 5 * c, c = this.h[0] >>> 13, this.h[0] &= 8191, this.h[1] += c, 
          c = this.h[1] >>> 13, this.h[1] &= 8191, this.h[2] += c, g[0] = this.h[0] + 5, c = g[0] >>> 13, 
          g[0] &= 8191, i = 1; i < 10; i++) g[i] = this.h[i] + c, c = g[i] >>> 13, g[i] &= 8191;
          for (g[9] -= 8192, mask = (1 ^ c) - 1, i = 0; i < 10; i++) g[i] &= mask;
          for (mask = ~mask, i = 0; i < 10; i++) this.h[i] = this.h[i] & mask | g[i];
          for (this.h[0] = 65535 & (this.h[0] | this.h[1] << 13), this.h[1] = 65535 & (this.h[1] >>> 3 | this.h[2] << 10), 
          this.h[2] = 65535 & (this.h[2] >>> 6 | this.h[3] << 7), this.h[3] = 65535 & (this.h[3] >>> 9 | this.h[4] << 4), 
          this.h[4] = 65535 & (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14), this.h[5] = 65535 & (this.h[6] >>> 2 | this.h[7] << 11), 
          this.h[6] = 65535 & (this.h[7] >>> 5 | this.h[8] << 8), this.h[7] = 65535 & (this.h[8] >>> 8 | this.h[9] << 5), 
          f = this.h[0] + this.pad[0], this.h[0] = 65535 & f, i = 1; i < 8; i++) f = (this.h[i] + this.pad[i] | 0) + (f >>> 16) | 0, 
          this.h[i] = 65535 & f;
          mac[macpos + 0] = this.h[0] >>> 0 & 255, mac[macpos + 1] = this.h[0] >>> 8 & 255, 
          mac[macpos + 2] = this.h[1] >>> 0 & 255, mac[macpos + 3] = this.h[1] >>> 8 & 255, 
          mac[macpos + 4] = this.h[2] >>> 0 & 255, mac[macpos + 5] = this.h[2] >>> 8 & 255, 
          mac[macpos + 6] = this.h[3] >>> 0 & 255, mac[macpos + 7] = this.h[3] >>> 8 & 255, 
          mac[macpos + 8] = this.h[4] >>> 0 & 255, mac[macpos + 9] = this.h[4] >>> 8 & 255, 
          mac[macpos + 10] = this.h[5] >>> 0 & 255, mac[macpos + 11] = this.h[5] >>> 8 & 255, 
          mac[macpos + 12] = this.h[6] >>> 0 & 255, mac[macpos + 13] = this.h[6] >>> 8 & 255, 
          mac[macpos + 14] = this.h[7] >>> 0 & 255, mac[macpos + 15] = this.h[7] >>> 8 & 255;
        }, poly1305.prototype.update = function(m, mpos, bytes) {
          var i, want;
          if (this.leftover) {
            for ((want = 16 - this.leftover) > bytes && (want = bytes), i = 0; i < want; i++) this.buffer[this.leftover + i] = m[mpos + i];
            if (bytes -= want, mpos += want, this.leftover += want, this.leftover < 16) return;
            this.blocks(this.buffer, 0, 16), this.leftover = 0;
          }
          if (bytes >= 16 && (want = bytes - bytes % 16, this.blocks(m, mpos, want), mpos += want, 
          bytes -= want), bytes) {
            for (i = 0; i < bytes; i++) this.buffer[this.leftover + i] = m[mpos + i];
            this.leftover += bytes;
          }
        };
        var crypto_box_afternm = crypto_secretbox, crypto_box_open_afternm = crypto_secretbox_open;
        var K = [ 1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591 ];
        function crypto_hashblocks_hl(hh, hl, m, n) {
          for (var bh0, bh1, bh2, bh3, bh4, bh5, bh6, bh7, bl0, bl1, bl2, bl3, bl4, bl5, bl6, bl7, th, tl, i, j, h, l, a, b, c, d, wh = new Int32Array(16), wl = new Int32Array(16), ah0 = hh[0], ah1 = hh[1], ah2 = hh[2], ah3 = hh[3], ah4 = hh[4], ah5 = hh[5], ah6 = hh[6], ah7 = hh[7], al0 = hl[0], al1 = hl[1], al2 = hl[2], al3 = hl[3], al4 = hl[4], al5 = hl[5], al6 = hl[6], al7 = hl[7], pos = 0; n >= 128; ) {
            for (i = 0; i < 16; i++) j = 8 * i + pos, wh[i] = m[j + 0] << 24 | m[j + 1] << 16 | m[j + 2] << 8 | m[j + 3], 
            wl[i] = m[j + 4] << 24 | m[j + 5] << 16 | m[j + 6] << 8 | m[j + 7];
            for (i = 0; i < 80; i++) if (bh0 = ah0, bh1 = ah1, bh2 = ah2, bh3 = ah3, bh4 = ah4, 
            bh5 = ah5, bh6 = ah6, ah7, bl0 = al0, bl1 = al1, bl2 = al2, bl3 = al3, bl4 = al4, 
            bl5 = al5, bl6 = al6, al7, a = 65535 & (l = al7), b = l >>> 16, c = 65535 & (h = ah7), 
            d = h >>> 16, a += 65535 & (l = (al4 >>> 14 | ah4 << 18) ^ (al4 >>> 18 | ah4 << 14) ^ (ah4 >>> 9 | al4 << 23)), 
            b += l >>> 16, c += 65535 & (h = (ah4 >>> 14 | al4 << 18) ^ (ah4 >>> 18 | al4 << 14) ^ (al4 >>> 9 | ah4 << 23)), 
            d += h >>> 16, a += 65535 & (l = al4 & al5 ^ ~al4 & al6), b += l >>> 16, c += 65535 & (h = ah4 & ah5 ^ ~ah4 & ah6), 
            d += h >>> 16, a += 65535 & (l = K[2 * i + 1]), b += l >>> 16, c += 65535 & (h = K[2 * i]), 
            d += h >>> 16, h = wh[i % 16], b += (l = wl[i % 16]) >>> 16, c += 65535 & h, d += h >>> 16, 
            c += (b += (a += 65535 & l) >>> 16) >>> 16, a = 65535 & (l = tl = 65535 & a | b << 16), 
            b = l >>> 16, c = 65535 & (h = th = 65535 & c | (d += c >>> 16) << 16), d = h >>> 16, 
            a += 65535 & (l = (al0 >>> 28 | ah0 << 4) ^ (ah0 >>> 2 | al0 << 30) ^ (ah0 >>> 7 | al0 << 25)), 
            b += l >>> 16, c += 65535 & (h = (ah0 >>> 28 | al0 << 4) ^ (al0 >>> 2 | ah0 << 30) ^ (al0 >>> 7 | ah0 << 25)), 
            d += h >>> 16, b += (l = al0 & al1 ^ al0 & al2 ^ al1 & al2) >>> 16, c += 65535 & (h = ah0 & ah1 ^ ah0 & ah2 ^ ah1 & ah2), 
            d += h >>> 16, bh7 = 65535 & (c += (b += (a += 65535 & l) >>> 16) >>> 16) | (d += c >>> 16) << 16, 
            bl7 = 65535 & a | b << 16, a = 65535 & (l = bl3), b = l >>> 16, c = 65535 & (h = bh3), 
            d = h >>> 16, b += (l = tl) >>> 16, c += 65535 & (h = th), d += h >>> 16, ah1 = bh0, 
            ah2 = bh1, ah3 = bh2, ah4 = bh3 = 65535 & (c += (b += (a += 65535 & l) >>> 16) >>> 16) | (d += c >>> 16) << 16, 
            ah5 = bh4, ah6 = bh5, ah7 = bh6, ah0 = bh7, al1 = bl0, al2 = bl1, al3 = bl2, al4 = bl3 = 65535 & a | b << 16, 
            al5 = bl4, al6 = bl5, al7 = bl6, al0 = bl7, i % 16 == 15) for (j = 0; j < 16; j++) h = wh[j], 
            a = 65535 & (l = wl[j]), b = l >>> 16, c = 65535 & h, d = h >>> 16, h = wh[(j + 9) % 16], 
            a += 65535 & (l = wl[(j + 9) % 16]), b += l >>> 16, c += 65535 & h, d += h >>> 16, 
            th = wh[(j + 1) % 16], a += 65535 & (l = ((tl = wl[(j + 1) % 16]) >>> 1 | th << 31) ^ (tl >>> 8 | th << 24) ^ (tl >>> 7 | th << 25)), 
            b += l >>> 16, c += 65535 & (h = (th >>> 1 | tl << 31) ^ (th >>> 8 | tl << 24) ^ th >>> 7), 
            d += h >>> 16, th = wh[(j + 14) % 16], b += (l = ((tl = wl[(j + 14) % 16]) >>> 19 | th << 13) ^ (th >>> 29 | tl << 3) ^ (tl >>> 6 | th << 26)) >>> 16, 
            c += 65535 & (h = (th >>> 19 | tl << 13) ^ (tl >>> 29 | th << 3) ^ th >>> 6), d += h >>> 16, 
            d += (c += (b += (a += 65535 & l) >>> 16) >>> 16) >>> 16, wh[j] = 65535 & c | d << 16, 
            wl[j] = 65535 & a | b << 16;
            a = 65535 & (l = al0), b = l >>> 16, c = 65535 & (h = ah0), d = h >>> 16, h = hh[0], 
            b += (l = hl[0]) >>> 16, c += 65535 & h, d += h >>> 16, d += (c += (b += (a += 65535 & l) >>> 16) >>> 16) >>> 16, 
            hh[0] = ah0 = 65535 & c | d << 16, hl[0] = al0 = 65535 & a | b << 16, a = 65535 & (l = al1), 
            b = l >>> 16, c = 65535 & (h = ah1), d = h >>> 16, h = hh[1], b += (l = hl[1]) >>> 16, 
            c += 65535 & h, d += h >>> 16, d += (c += (b += (a += 65535 & l) >>> 16) >>> 16) >>> 16, 
            hh[1] = ah1 = 65535 & c | d << 16, hl[1] = al1 = 65535 & a | b << 16, a = 65535 & (l = al2), 
            b = l >>> 16, c = 65535 & (h = ah2), d = h >>> 16, h = hh[2], b += (l = hl[2]) >>> 16, 
            c += 65535 & h, d += h >>> 16, d += (c += (b += (a += 65535 & l) >>> 16) >>> 16) >>> 16, 
            hh[2] = ah2 = 65535 & c | d << 16, hl[2] = al2 = 65535 & a | b << 16, a = 65535 & (l = al3), 
            b = l >>> 16, c = 65535 & (h = ah3), d = h >>> 16, h = hh[3], b += (l = hl[3]) >>> 16, 
            c += 65535 & h, d += h >>> 16, d += (c += (b += (a += 65535 & l) >>> 16) >>> 16) >>> 16, 
            hh[3] = ah3 = 65535 & c | d << 16, hl[3] = al3 = 65535 & a | b << 16, a = 65535 & (l = al4), 
            b = l >>> 16, c = 65535 & (h = ah4), d = h >>> 16, h = hh[4], b += (l = hl[4]) >>> 16, 
            c += 65535 & h, d += h >>> 16, d += (c += (b += (a += 65535 & l) >>> 16) >>> 16) >>> 16, 
            hh[4] = ah4 = 65535 & c | d << 16, hl[4] = al4 = 65535 & a | b << 16, a = 65535 & (l = al5), 
            b = l >>> 16, c = 65535 & (h = ah5), d = h >>> 16, h = hh[5], b += (l = hl[5]) >>> 16, 
            c += 65535 & h, d += h >>> 16, d += (c += (b += (a += 65535 & l) >>> 16) >>> 16) >>> 16, 
            hh[5] = ah5 = 65535 & c | d << 16, hl[5] = al5 = 65535 & a | b << 16, a = 65535 & (l = al6), 
            b = l >>> 16, c = 65535 & (h = ah6), d = h >>> 16, h = hh[6], b += (l = hl[6]) >>> 16, 
            c += 65535 & h, d += h >>> 16, d += (c += (b += (a += 65535 & l) >>> 16) >>> 16) >>> 16, 
            hh[6] = ah6 = 65535 & c | d << 16, hl[6] = al6 = 65535 & a | b << 16, a = 65535 & (l = al7), 
            b = l >>> 16, c = 65535 & (h = ah7), d = h >>> 16, h = hh[7], b += (l = hl[7]) >>> 16, 
            c += 65535 & h, d += h >>> 16, d += (c += (b += (a += 65535 & l) >>> 16) >>> 16) >>> 16, 
            hh[7] = ah7 = 65535 & c | d << 16, hl[7] = al7 = 65535 & a | b << 16, pos += 128, 
            n -= 128;
          }
          return n;
        }
        function crypto_hash(out, m, n) {
          var i, hh = new Int32Array(8), hl = new Int32Array(8), x = new Uint8Array(256), b = n;
          for (hh[0] = 1779033703, hh[1] = 3144134277, hh[2] = 1013904242, hh[3] = 2773480762, 
          hh[4] = 1359893119, hh[5] = 2600822924, hh[6] = 528734635, hh[7] = 1541459225, hl[0] = 4089235720, 
          hl[1] = 2227873595, hl[2] = 4271175723, hl[3] = 1595750129, hl[4] = 2917565137, 
          hl[5] = 725511199, hl[6] = 4215389547, hl[7] = 327033209, crypto_hashblocks_hl(hh, hl, m, n), 
          n %= 128, i = 0; i < n; i++) x[i] = m[b - n + i];
          for (x[n] = 128, x[(n = 256 - 128 * (n < 112 ? 1 : 0)) - 9] = 0, ts64(x, n - 8, b / 536870912 | 0, b << 3), 
          crypto_hashblocks_hl(hh, hl, x, n), i = 0; i < 8; i++) ts64(out, 8 * i, hh[i], hl[i]);
          return 0;
        }
        function add(p, q) {
          var a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f = gf(), g = gf(), h = gf(), t = gf();
          Z(a, p[1], p[0]), Z(t, q[1], q[0]), M(a, a, t), A(b, p[0], p[1]), A(t, q[0], q[1]), 
          M(b, b, t), M(c, p[3], q[3]), M(c, c, D2), M(d, p[2], q[2]), A(d, d, d), Z(e, b, a), 
          Z(f, d, c), A(g, d, c), A(h, b, a), M(p[0], e, f), M(p[1], h, g), M(p[2], g, f), 
          M(p[3], e, h);
        }
        function cswap(p, q, b) {
          var i;
          for (i = 0; i < 4; i++) sel25519(p[i], q[i], b);
        }
        function pack(r, p) {
          var tx = gf(), ty = gf(), zi = gf();
          inv25519(zi, p[2]), M(tx, p[0], zi), M(ty, p[1], zi), pack25519(r, ty), r[31] ^= par25519(tx) << 7;
        }
        function scalarmult(p, q, s) {
          var b, i;
          for (set25519(p[0], gf0), set25519(p[1], gf1), set25519(p[2], gf1), set25519(p[3], gf0), 
          i = 255; i >= 0; --i) cswap(p, q, b = s[i / 8 | 0] >> (7 & i) & 1), add(q, p), add(p, p), 
          cswap(p, q, b);
        }
        function scalarbase(p, s) {
          var q = [ gf(), gf(), gf(), gf() ];
          set25519(q[0], X), set25519(q[1], Y), set25519(q[2], gf1), M(q[3], X, Y), scalarmult(p, q, s);
        }
        function crypto_sign_keypair(pk, sk, seeded) {
          var i, d = new Uint8Array(64), p = [ gf(), gf(), gf(), gf() ];
          for (seeded || randombytes(sk, 32), crypto_hash(d, sk, 32), d[0] &= 248, d[31] &= 127, 
          d[31] |= 64, scalarbase(p, d), pack(pk, p), i = 0; i < 32; i++) sk[i + 32] = pk[i];
          return 0;
        }
        var L = new Float64Array([ 237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16 ]);
        function modL(r, x) {
          var carry, i, j, k;
          for (i = 63; i >= 32; --i) {
            for (carry = 0, j = i - 32, k = i - 12; j < k; ++j) x[j] += carry - 16 * x[i] * L[j - (i - 32)], 
            carry = x[j] + 128 >> 8, x[j] -= 256 * carry;
            x[j] += carry, x[i] = 0;
          }
          for (carry = 0, j = 0; j < 32; j++) x[j] += carry - (x[31] >> 4) * L[j], carry = x[j] >> 8, 
          x[j] &= 255;
          for (j = 0; j < 32; j++) x[j] -= carry * L[j];
          for (i = 0; i < 32; i++) x[i + 1] += x[i] >> 8, r[i] = 255 & x[i];
        }
        function reduce(r) {
          var i, x = new Float64Array(64);
          for (i = 0; i < 64; i++) x[i] = r[i];
          for (i = 0; i < 64; i++) r[i] = 0;
          modL(r, x);
        }
        function crypto_sign(sm, m, n, sk) {
          var i, j, d = new Uint8Array(64), h = new Uint8Array(64), r = new Uint8Array(64), x = new Float64Array(64), p = [ gf(), gf(), gf(), gf() ];
          crypto_hash(d, sk, 32), d[0] &= 248, d[31] &= 127, d[31] |= 64;
          var smlen = n + 64;
          for (i = 0; i < n; i++) sm[64 + i] = m[i];
          for (i = 0; i < 32; i++) sm[32 + i] = d[32 + i];
          for (crypto_hash(r, sm.subarray(32), n + 32), reduce(r), scalarbase(p, r), pack(sm, p), 
          i = 32; i < 64; i++) sm[i] = sk[i];
          for (crypto_hash(h, sm, n + 64), reduce(h), i = 0; i < 64; i++) x[i] = 0;
          for (i = 0; i < 32; i++) x[i] = r[i];
          for (i = 0; i < 32; i++) for (j = 0; j < 32; j++) x[i + j] += h[i] * d[j];
          return modL(sm.subarray(32), x), smlen;
        }
        function unpackneg(r, p) {
          var t = gf(), chk = gf(), num = gf(), den = gf(), den2 = gf(), den4 = gf(), den6 = gf();
          return set25519(r[2], gf1), unpack25519(r[1], p), S(num, r[1]), M(den, num, D), 
          Z(num, num, r[2]), A(den, r[2], den), S(den2, den), S(den4, den2), M(den6, den4, den2), 
          M(t, den6, num), M(t, t, den), function(o, i) {
            var a, c = gf();
            for (a = 0; a < 16; a++) c[a] = i[a];
            for (a = 250; a >= 0; a--) S(c, c), 1 !== a && M(c, c, i);
            for (a = 0; a < 16; a++) o[a] = c[a];
          }(t, t), M(t, t, num), M(t, t, den), M(t, t, den), M(r[0], t, den), S(chk, r[0]), 
          M(chk, chk, den), neq25519(chk, num) && M(r[0], r[0], I), S(chk, r[0]), M(chk, chk, den), 
          neq25519(chk, num) ? -1 : (par25519(r[0]) === p[31] >> 7 && Z(r[0], gf0, r[0]), 
          M(r[3], r[0], r[1]), 0);
        }
        function crypto_sign_open(m, sm, n, pk) {
          var i, t = new Uint8Array(32), h = new Uint8Array(64), p = [ gf(), gf(), gf(), gf() ], q = [ gf(), gf(), gf(), gf() ];
          if (-1, n < 64) return -1;
          if (unpackneg(q, pk)) return -1;
          for (i = 0; i < n; i++) m[i] = sm[i];
          for (i = 0; i < 32; i++) m[i + 32] = pk[i];
          if (crypto_hash(h, m, n), reduce(h), scalarmult(p, q, h), scalarbase(q, sm.subarray(32)), 
          add(p, q), pack(t, p), n -= 64, crypto_verify_32(sm, 0, t, 0)) {
            for (i = 0; i < n; i++) m[i] = 0;
            return -1;
          }
          for (i = 0; i < n; i++) m[i] = sm[i + 64];
          return n;
        }
        function checkLengths(k, n) {
          if (32 !== k.length) throw new Error("bad key size");
          if (24 !== n.length) throw new Error("bad nonce size");
        }
        function checkArrayTypes() {
          var t, i;
          for (i = 0; i < arguments.length; i++) if ("[object Uint8Array]" !== (t = Object.prototype.toString.call(arguments[i]))) throw new TypeError("unexpected type " + t + ", use Uint8Array");
        }
        function cleanup(arr) {
          for (var i = 0; i < arr.length; i++) arr[i] = 0;
        }
        nacl.lowlevel = {
          crypto_core_hsalsa20,
          crypto_stream_xor,
          crypto_stream,
          crypto_stream_salsa20_xor,
          crypto_stream_salsa20,
          crypto_onetimeauth,
          crypto_onetimeauth_verify,
          crypto_verify_16,
          crypto_verify_32,
          crypto_secretbox,
          crypto_secretbox_open,
          crypto_scalarmult,
          crypto_scalarmult_base,
          crypto_box_beforenm,
          crypto_box_afternm,
          crypto_box: function(c, m, d, n, y, x) {
            var k = new Uint8Array(32);
            return crypto_box_beforenm(k, y, x), crypto_box_afternm(c, m, d, n, k);
          },
          crypto_box_open: function(m, c, d, n, y, x) {
            var k = new Uint8Array(32);
            return crypto_box_beforenm(k, y, x), crypto_box_open_afternm(m, c, d, n, k);
          },
          crypto_box_keypair,
          crypto_hash,
          crypto_sign,
          crypto_sign_keypair,
          crypto_sign_open,
          crypto_secretbox_KEYBYTES: 32,
          crypto_secretbox_NONCEBYTES: 24,
          crypto_secretbox_ZEROBYTES: 32,
          crypto_secretbox_BOXZEROBYTES: 16,
          crypto_scalarmult_BYTES: 32,
          crypto_scalarmult_SCALARBYTES: 32,
          crypto_box_PUBLICKEYBYTES: 32,
          crypto_box_SECRETKEYBYTES: 32,
          crypto_box_BEFORENMBYTES: 32,
          crypto_box_NONCEBYTES: 24,
          crypto_box_ZEROBYTES: 32,
          crypto_box_BOXZEROBYTES: 16,
          crypto_sign_BYTES: 64,
          crypto_sign_PUBLICKEYBYTES: 32,
          crypto_sign_SECRETKEYBYTES: 64,
          crypto_sign_SEEDBYTES: 32,
          crypto_hash_BYTES: 64
        }, nacl.util || (nacl.util = {}, nacl.util.decodeUTF8 = nacl.util.encodeUTF8 = nacl.util.encodeBase64 = nacl.util.decodeBase64 = function() {
          throw new Error("nacl.util moved into separate package: https://github.com/dchest/tweetnacl-util-js");
        }), nacl.randomBytes = function(n) {
          var b = new Uint8Array(n);
          return randombytes(b, n), b;
        }, nacl.secretbox = function(msg, nonce, key) {
          checkArrayTypes(msg, nonce, key), checkLengths(key, nonce);
          for (var m = new Uint8Array(32 + msg.length), c = new Uint8Array(m.length), i = 0; i < msg.length; i++) m[i + 32] = msg[i];
          return crypto_secretbox(c, m, m.length, nonce, key), c.subarray(16);
        }, nacl.secretbox.open = function(box, nonce, key) {
          checkArrayTypes(box, nonce, key), checkLengths(key, nonce);
          for (var c = new Uint8Array(16 + box.length), m = new Uint8Array(c.length), i = 0; i < box.length; i++) c[i + 16] = box[i];
          return !(c.length < 32) && (0 === crypto_secretbox_open(m, c, c.length, nonce, key) && m.subarray(32));
        }, nacl.secretbox.keyLength = 32, nacl.secretbox.nonceLength = 24, nacl.secretbox.overheadLength = 16, 
        nacl.scalarMult = function(n, p) {
          if (checkArrayTypes(n, p), 32 !== n.length) throw new Error("bad n size");
          if (32 !== p.length) throw new Error("bad p size");
          var q = new Uint8Array(32);
          return crypto_scalarmult(q, n, p), q;
        }, nacl.scalarMult.base = function(n) {
          if (checkArrayTypes(n), 32 !== n.length) throw new Error("bad n size");
          var q = new Uint8Array(32);
          return crypto_scalarmult_base(q, n), q;
        }, nacl.scalarMult.scalarLength = 32, nacl.scalarMult.groupElementLength = 32, nacl.box = function(msg, nonce, publicKey, secretKey) {
          var k = nacl.box.before(publicKey, secretKey);
          return nacl.secretbox(msg, nonce, k);
        }, nacl.box.before = function(publicKey, secretKey) {
          checkArrayTypes(publicKey, secretKey), function(pk, sk) {
            if (32 !== pk.length) throw new Error("bad public key size");
            if (32 !== sk.length) throw new Error("bad secret key size");
          }(publicKey, secretKey);
          var k = new Uint8Array(32);
          return crypto_box_beforenm(k, publicKey, secretKey), k;
        }, nacl.box.after = nacl.secretbox, nacl.box.open = function(msg, nonce, publicKey, secretKey) {
          var k = nacl.box.before(publicKey, secretKey);
          return nacl.secretbox.open(msg, nonce, k);
        }, nacl.box.open.after = nacl.secretbox.open, nacl.box.keyPair = function() {
          var pk = new Uint8Array(32), sk = new Uint8Array(32);
          return crypto_box_keypair(pk, sk), {
            publicKey: pk,
            secretKey: sk
          };
        }, nacl.box.keyPair.fromSecretKey = function(secretKey) {
          if (checkArrayTypes(secretKey), 32 !== secretKey.length) throw new Error("bad secret key size");
          var pk = new Uint8Array(32);
          return crypto_scalarmult_base(pk, secretKey), {
            publicKey: pk,
            secretKey: new Uint8Array(secretKey)
          };
        }, nacl.box.publicKeyLength = 32, nacl.box.secretKeyLength = 32, nacl.box.sharedKeyLength = 32, 
        nacl.box.nonceLength = 24, nacl.box.overheadLength = nacl.secretbox.overheadLength, 
        nacl.sign = function(msg, secretKey) {
          if (checkArrayTypes(msg, secretKey), 64 !== secretKey.length) throw new Error("bad secret key size");
          var signedMsg = new Uint8Array(64 + msg.length);
          return crypto_sign(signedMsg, msg, msg.length, secretKey), signedMsg;
        }, nacl.sign.open = function(signedMsg, publicKey) {
          if (2 !== arguments.length) throw new Error("nacl.sign.open accepts 2 arguments; did you mean to use nacl.sign.detached.verify?");
          if (checkArrayTypes(signedMsg, publicKey), 32 !== publicKey.length) throw new Error("bad public key size");
          var tmp = new Uint8Array(signedMsg.length), mlen = crypto_sign_open(tmp, signedMsg, signedMsg.length, publicKey);
          if (mlen < 0) return null;
          for (var m = new Uint8Array(mlen), i = 0; i < m.length; i++) m[i] = tmp[i];
          return m;
        }, nacl.sign.detached = function(msg, secretKey) {
          for (var signedMsg = nacl.sign(msg, secretKey), sig = new Uint8Array(64), i = 0; i < sig.length; i++) sig[i] = signedMsg[i];
          return sig;
        }, nacl.sign.detached.verify = function(msg, sig, publicKey) {
          if (checkArrayTypes(msg, sig, publicKey), 64 !== sig.length) throw new Error("bad signature size");
          if (32 !== publicKey.length) throw new Error("bad public key size");
          var i, sm = new Uint8Array(64 + msg.length), m = new Uint8Array(64 + msg.length);
          for (i = 0; i < 64; i++) sm[i] = sig[i];
          for (i = 0; i < msg.length; i++) sm[i + 64] = msg[i];
          return crypto_sign_open(m, sm, sm.length, publicKey) >= 0;
        }, nacl.sign.keyPair = function() {
          var pk = new Uint8Array(32), sk = new Uint8Array(64);
          return crypto_sign_keypair(pk, sk), {
            publicKey: pk,
            secretKey: sk
          };
        }, nacl.sign.keyPair.fromSecretKey = function(secretKey) {
          if (checkArrayTypes(secretKey), 64 !== secretKey.length) throw new Error("bad secret key size");
          for (var pk = new Uint8Array(32), i = 0; i < pk.length; i++) pk[i] = secretKey[32 + i];
          return {
            publicKey: pk,
            secretKey: new Uint8Array(secretKey)
          };
        }, nacl.sign.keyPair.fromSeed = function(seed) {
          if (checkArrayTypes(seed), 32 !== seed.length) throw new Error("bad seed size");
          for (var pk = new Uint8Array(32), sk = new Uint8Array(64), i = 0; i < 32; i++) sk[i] = seed[i];
          return crypto_sign_keypair(pk, sk, !0), {
            publicKey: pk,
            secretKey: sk
          };
        }, nacl.sign.publicKeyLength = 32, nacl.sign.secretKeyLength = 64, nacl.sign.seedLength = 32, 
        nacl.sign.signatureLength = 64, nacl.hash = function(msg) {
          checkArrayTypes(msg);
          var h = new Uint8Array(64);
          return crypto_hash(h, msg, msg.length), h;
        }, nacl.hash.hashLength = 64, nacl.verify = function(x, y) {
          return checkArrayTypes(x, y), 0 !== x.length && 0 !== y.length && (x.length === y.length && 0 === vn(x, 0, y, 0, x.length));
        }, nacl.setPRNG = function(fn) {
          randombytes = fn;
        }, function() {
          var crypto = "undefined" != typeof self ? self.crypto || self.msCrypto : null;
          if (crypto && crypto.getRandomValues) {
            nacl.setPRNG((function(x, n) {
              var i, v = new Uint8Array(n);
              for (i = 0; i < n; i += 65536) crypto.getRandomValues(v.subarray(i, i + Math.min(n - i, 65536)));
              for (i = 0; i < n; i++) x[i] = v[i];
              cleanup(v);
            }));
          } else (crypto = __webpack_require__(6113)) && crypto.randomBytes && nacl.setPRNG((function(x, n) {
            var i, v = crypto.randomBytes(n);
            for (i = 0; i < n; i++) x[i] = v[i];
            cleanup(v);
          }));
        }();
      }(module.exports ? module.exports : self.nacl = self.nacl || {});
    },
    26375: (__unused_webpack_module, exports, __webpack_require__) => {
      var crypto = __webpack_require__(6113), BigInteger = __webpack_require__(32630).BigInteger, Buffer = __webpack_require__(12237).Buffer;
      function unstupid(hex, len) {
        return hex.length >= len ? hex : unstupid("0" + hex, len);
      }
      exports.ECCurves = __webpack_require__(6226), exports.ECKey = function(curve, key, isPublic) {
        var priv, c = curve(), n = c.getN(), bytes = Math.floor(n.bitLength() / 8);
        if (key) if (isPublic) {
          curve = c.getCurve();
          this.P = curve.decodePointHex(key.toString("hex"));
        } else {
          if (key.length != bytes) return !1;
          priv = new BigInteger(key.toString("hex"), 16);
        } else {
          var n1 = n.subtract(BigInteger.ONE), r = new BigInteger(crypto.randomBytes(n.bitLength()));
          priv = r.mod(n1).add(BigInteger.ONE), this.P = c.getG().multiply(priv);
        }
        this.P && (this.PublicKey = Buffer.from(c.getCurve().encodeCompressedPointHex(this.P), "hex")), 
        priv && (this.PrivateKey = Buffer.from(unstupid(priv.toString(16), 2 * bytes), "hex"), 
        this.deriveSharedSecret = function(key) {
          if (!key || !key.P) return !1;
          var S = key.P.multiply(priv);
          return Buffer.from(unstupid(S.getX().toBigInteger().toString(16), 2 * bytes), "hex");
        });
      };
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
    12781: module => {
      "use strict";
      module.exports = require("stream");
    },
    73837: module => {
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
    return __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
    module.exports;
  }(83054);
  module.exports = __webpack_exports__;
})();