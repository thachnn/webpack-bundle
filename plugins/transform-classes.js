module.exports = function(modules) {
  var installedModules = {};
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) return installedModules[moduleId].exports;
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: !1,
      exports: {}
    };
    return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
    module.l = !0, module.exports;
  }
  return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
  __webpack_require__.d = function(exports, name, getter) {
    __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
      enumerable: !0,
      get: getter
    });
  }, __webpack_require__.r = function(exports) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(exports, "__esModule", {
      value: !0
    });
  }, __webpack_require__.t = function(value, mode) {
    if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
    if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
    var ns = Object.create(null);
    if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
      enumerable: !0,
      value: value
    }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
      return value[key];
    }.bind(null, key));
    return ns;
  }, __webpack_require__.n = function(module) {
    var getter = module && module.__esModule ? function() {
      return module.default;
    } : function() {
      return module;
    };
    return __webpack_require__.d(getter, "a", getter), getter;
  }, __webpack_require__.o = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 495);
}({
  0: function(module, exports) {
    module.exports = require("../lib/types");
  },
  1: function(module, exports) {
    module.exports = require("../lib/plugin-utils");
  },
  106: function(module, exports, __webpack_require__) {
    var listCacheClear = __webpack_require__(150), listCacheDelete = __webpack_require__(151), listCacheGet = __webpack_require__(152), listCacheHas = __webpack_require__(153), listCacheSet = __webpack_require__(154);
    function ListCache(entries) {
      var index = -1, length = null == entries ? 0 : entries.length;
      for (this.clear(); ++index < length; ) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    ListCache.prototype.clear = listCacheClear, ListCache.prototype.delete = listCacheDelete, 
    ListCache.prototype.get = listCacheGet, ListCache.prototype.has = listCacheHas, 
    ListCache.prototype.set = listCacheSet, module.exports = ListCache;
  },
  11: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = exports.program = exports.expression = exports.statements = exports.statement = exports.smart = void 0;
    var obj, formatters = function(obj) {
      if (obj && obj.__esModule) return obj;
      if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
        default: obj
      };
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) return cache.get(obj);
      var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
      }
      newObj.default = obj, cache && cache.set(obj, newObj);
      return newObj;
    }(__webpack_require__(26)), _builder = (obj = __webpack_require__(27)) && obj.__esModule ? obj : {
      default: obj
    };
    function _getRequireWildcardCache() {
      if ("function" != typeof WeakMap) return null;
      var cache = new WeakMap;
      return _getRequireWildcardCache = function() {
        return cache;
      }, cache;
    }
    const smart = (0, _builder.default)(formatters.smart);
    exports.smart = smart;
    const statement = (0, _builder.default)(formatters.statement);
    exports.statement = statement;
    const statements = (0, _builder.default)(formatters.statements);
    exports.statements = statements;
    const expression = (0, _builder.default)(formatters.expression);
    exports.expression = expression;
    const program = (0, _builder.default)(formatters.program);
    exports.program = program;
    var _default = Object.assign(smart.bind(void 0), {
      smart: smart,
      statement: statement,
      statements: statements,
      expression: expression,
      program: program,
      ast: smart.ast
    });
    exports.default = _default;
  },
  111: function(module, exports, __webpack_require__) {
    var Map = __webpack_require__(20)(__webpack_require__(5), "Map");
    module.exports = Map;
  },
  112: function(module, exports, __webpack_require__) {
    var baseIsArguments = __webpack_require__(113), isObjectLike = __webpack_require__(17), objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty, propertyIsEnumerable = objectProto.propertyIsEnumerable, isArguments = baseIsArguments(function() {
      return arguments;
    }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    module.exports = isArguments;
  },
  113: function(module, exports, __webpack_require__) {
    var baseGetTag = __webpack_require__(7), isObjectLike = __webpack_require__(17);
    module.exports = function(value) {
      return isObjectLike(value) && "[object Arguments]" == baseGetTag(value);
    };
  },
  12: function(module, exports, __webpack_require__) {
    var baseGetTag = __webpack_require__(7), isObject = __webpack_require__(3);
    module.exports = function(value) {
      if (!isObject(value)) return !1;
      var tag = baseGetTag(value);
      return "[object Function]" == tag || "[object GeneratorFunction]" == tag || "[object AsyncFunction]" == tag || "[object Proxy]" == tag;
    };
  },
  13: function(module, exports) {
    var freeGlobal = "object" == typeof global && global && global.Object === Object && global;
    module.exports = freeGlobal;
  },
  14: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), Object.defineProperty(exports, "isIdentifierName", {
      enumerable: !0,
      get: function() {
        return _identifier.isIdentifierName;
      }
    }), Object.defineProperty(exports, "isIdentifierChar", {
      enumerable: !0,
      get: function() {
        return _identifier.isIdentifierChar;
      }
    }), Object.defineProperty(exports, "isIdentifierStart", {
      enumerable: !0,
      get: function() {
        return _identifier.isIdentifierStart;
      }
    }), Object.defineProperty(exports, "isReservedWord", {
      enumerable: !0,
      get: function() {
        return _keyword.isReservedWord;
      }
    }), Object.defineProperty(exports, "isStrictBindOnlyReservedWord", {
      enumerable: !0,
      get: function() {
        return _keyword.isStrictBindOnlyReservedWord;
      }
    }), Object.defineProperty(exports, "isStrictBindReservedWord", {
      enumerable: !0,
      get: function() {
        return _keyword.isStrictBindReservedWord;
      }
    }), Object.defineProperty(exports, "isStrictReservedWord", {
      enumerable: !0,
      get: function() {
        return _keyword.isStrictReservedWord;
      }
    }), Object.defineProperty(exports, "isKeyword", {
      enumerable: !0,
      get: function() {
        return _keyword.isKeyword;
      }
    });
    var _identifier = __webpack_require__(18), _keyword = __webpack_require__(19);
  },
  15: function(module, exports, __webpack_require__) {
    var Symbol = __webpack_require__(6), objectProto = Object.prototype, hasOwnProperty = objectProto.hasOwnProperty, nativeObjectToString = objectProto.toString, symToStringTag = Symbol ? Symbol.toStringTag : void 0;
    module.exports = function(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = !0;
      } catch (e) {}
      var result = nativeObjectToString.call(value);
      return unmasked && (isOwn ? value[symToStringTag] = tag : delete value[symToStringTag]), 
      result;
    };
  },
  150: function(module, exports) {
    module.exports = function() {
      this.__data__ = [], this.size = 0;
    };
  },
  151: function(module, exports, __webpack_require__) {
    var assocIndexOf = __webpack_require__(69), splice = Array.prototype.splice;
    module.exports = function(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return !(index < 0) && (index == data.length - 1 ? data.pop() : splice.call(data, index, 1), 
      --this.size, !0);
    };
  },
  152: function(module, exports, __webpack_require__) {
    var assocIndexOf = __webpack_require__(69);
    module.exports = function(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    };
  },
  153: function(module, exports, __webpack_require__) {
    var assocIndexOf = __webpack_require__(69);
    module.exports = function(key) {
      return assocIndexOf(this.__data__, key) > -1;
    };
  },
  154: function(module, exports, __webpack_require__) {
    var assocIndexOf = __webpack_require__(69);
    module.exports = function(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? (++this.size, data.push([ key, value ])) : data[index][1] = value, 
      this;
    };
  },
  155: function(module, exports, __webpack_require__) {
    var mapCacheClear = __webpack_require__(156), mapCacheDelete = __webpack_require__(163), mapCacheGet = __webpack_require__(165), mapCacheHas = __webpack_require__(166), mapCacheSet = __webpack_require__(167);
    function MapCache(entries) {
      var index = -1, length = null == entries ? 0 : entries.length;
      for (this.clear(); ++index < length; ) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    MapCache.prototype.clear = mapCacheClear, MapCache.prototype.delete = mapCacheDelete, 
    MapCache.prototype.get = mapCacheGet, MapCache.prototype.has = mapCacheHas, MapCache.prototype.set = mapCacheSet, 
    module.exports = MapCache;
  },
  156: function(module, exports, __webpack_require__) {
    var Hash = __webpack_require__(157), ListCache = __webpack_require__(106), Map = __webpack_require__(111);
    module.exports = function() {
      this.size = 0, this.__data__ = {
        hash: new Hash,
        map: new (Map || ListCache),
        string: new Hash
      };
    };
  },
  157: function(module, exports, __webpack_require__) {
    var hashClear = __webpack_require__(158), hashDelete = __webpack_require__(159), hashGet = __webpack_require__(160), hashHas = __webpack_require__(161), hashSet = __webpack_require__(162);
    function Hash(entries) {
      var index = -1, length = null == entries ? 0 : entries.length;
      for (this.clear(); ++index < length; ) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    Hash.prototype.clear = hashClear, Hash.prototype.delete = hashDelete, Hash.prototype.get = hashGet, 
    Hash.prototype.has = hashHas, Hash.prototype.set = hashSet, module.exports = Hash;
  },
  158: function(module, exports, __webpack_require__) {
    var nativeCreate = __webpack_require__(70);
    module.exports = function() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {}, this.size = 0;
    };
  },
  159: function(module, exports) {
    module.exports = function(key) {
      var result = this.has(key) && delete this.__data__[key];
      return this.size -= result ? 1 : 0, result;
    };
  },
  16: function(module, exports) {
    var nativeObjectToString = Object.prototype.toString;
    module.exports = function(value) {
      return nativeObjectToString.call(value);
    };
  },
  160: function(module, exports, __webpack_require__) {
    var nativeCreate = __webpack_require__(70), hasOwnProperty = Object.prototype.hasOwnProperty;
    module.exports = function(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return "__lodash_hash_undefined__" === result ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    };
  },
  161: function(module, exports, __webpack_require__) {
    var nativeCreate = __webpack_require__(70), hasOwnProperty = Object.prototype.hasOwnProperty;
    module.exports = function(key) {
      var data = this.__data__;
      return nativeCreate ? void 0 !== data[key] : hasOwnProperty.call(data, key);
    };
  },
  162: function(module, exports, __webpack_require__) {
    var nativeCreate = __webpack_require__(70);
    module.exports = function(key, value) {
      var data = this.__data__;
      return this.size += this.has(key) ? 0 : 1, data[key] = nativeCreate && void 0 === value ? "__lodash_hash_undefined__" : value, 
      this;
    };
  },
  163: function(module, exports, __webpack_require__) {
    var getMapData = __webpack_require__(71);
    module.exports = function(key) {
      var result = getMapData(this, key).delete(key);
      return this.size -= result ? 1 : 0, result;
    };
  },
  164: function(module, exports) {
    module.exports = function(value) {
      var type = typeof value;
      return "string" == type || "number" == type || "symbol" == type || "boolean" == type ? "__proto__" !== value : null === value;
    };
  },
  165: function(module, exports, __webpack_require__) {
    var getMapData = __webpack_require__(71);
    module.exports = function(key) {
      return getMapData(this, key).get(key);
    };
  },
  166: function(module, exports, __webpack_require__) {
    var getMapData = __webpack_require__(71);
    module.exports = function(key) {
      return getMapData(this, key).has(key);
    };
  },
  167: function(module, exports, __webpack_require__) {
    var getMapData = __webpack_require__(71);
    module.exports = function(key, value) {
      var data = getMapData(this, key), size = data.size;
      return data.set(key, value), this.size += data.size == size ? 0 : 1, this;
    };
  },
  17: function(module, exports) {
    module.exports = function(value) {
      return null != value && "object" == typeof value;
    };
  },
  18: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.isIdentifierStart = isIdentifierStart, exports.isIdentifierChar = isIdentifierChar, 
    exports.isIdentifierName = function(name) {
      let isFirst = !0;
      for (let _i = 0, _Array$from = Array.from(name); _i < _Array$from.length; _i++) {
        const cp = _Array$from[_i].codePointAt(0);
        if (isFirst) {
          if (!isIdentifierStart(cp)) return !1;
          isFirst = !1;
        } else if (!isIdentifierChar(cp)) return !1;
      }
      return !isFirst;
    };
    let nonASCIIidentifierStartChars = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࢠ-ࢴࢶ-ࣇऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-鿼ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞿꟂ-ꟊꟵ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", nonASCIIidentifierChars = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࣓-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜔ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠐-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿᫀᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷹᷻-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿";
    const nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]"), nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
    nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;
    const astralIdentifierStartCodes = [ 0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 157, 310, 10, 21, 11, 7, 153, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 107, 20, 28, 22, 13, 52, 76, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 230, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 35, 56, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 190, 0, 80, 921, 103, 110, 18, 195, 2749, 1070, 4050, 582, 8634, 568, 8, 30, 114, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8952, 286, 50, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 2357, 44, 11, 6, 17, 0, 370, 43, 1301, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42717, 35, 4148, 12, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938 ], astralIdentifierCodes = [ 509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 154, 10, 176, 2, 54, 14, 32, 9, 16, 3, 46, 10, 54, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 135, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 5319, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 419, 13, 1495, 6, 110, 6, 6, 9, 4759, 9, 787719, 239 ];
    function isInAstralSet(code, set) {
      let pos = 65536;
      for (let i = 0, length = set.length; i < length; i += 2) {
        if (pos += set[i], pos > code) return !1;
        if (pos += set[i + 1], pos >= code) return !0;
      }
      return !1;
    }
    function isIdentifierStart(code) {
      return code < 65 ? 36 === code : code <= 90 || (code < 97 ? 95 === code : code <= 122 || (code <= 65535 ? code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code)) : isInAstralSet(code, astralIdentifierStartCodes)));
    }
    function isIdentifierChar(code) {
      return code < 48 ? 36 === code : code < 58 || !(code < 65) && (code <= 90 || (code < 97 ? 95 === code : code <= 122 || (code <= 65535 ? code >= 170 && nonASCIIidentifier.test(String.fromCharCode(code)) : isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes))));
    }
  },
  184: function(module, exports, __webpack_require__) {
    "use strict";
    module.exports = __webpack_require__(185);
  },
  185: function(module) {
    module.exports = JSON.parse('{"builtin":{"Array":false,"ArrayBuffer":false,"Atomics":false,"BigInt":false,"BigInt64Array":false,"BigUint64Array":false,"Boolean":false,"constructor":false,"DataView":false,"Date":false,"decodeURI":false,"decodeURIComponent":false,"encodeURI":false,"encodeURIComponent":false,"Error":false,"escape":false,"eval":false,"EvalError":false,"Float32Array":false,"Float64Array":false,"Function":false,"globalThis":false,"hasOwnProperty":false,"Infinity":false,"Int16Array":false,"Int32Array":false,"Int8Array":false,"isFinite":false,"isNaN":false,"isPrototypeOf":false,"JSON":false,"Map":false,"Math":false,"NaN":false,"Number":false,"Object":false,"parseFloat":false,"parseInt":false,"Promise":false,"propertyIsEnumerable":false,"Proxy":false,"RangeError":false,"ReferenceError":false,"Reflect":false,"RegExp":false,"Set":false,"SharedArrayBuffer":false,"String":false,"Symbol":false,"SyntaxError":false,"toLocaleString":false,"toString":false,"TypeError":false,"Uint16Array":false,"Uint32Array":false,"Uint8Array":false,"Uint8ClampedArray":false,"undefined":false,"unescape":false,"URIError":false,"valueOf":false,"WeakMap":false,"WeakSet":false},"es5":{"Array":false,"Boolean":false,"constructor":false,"Date":false,"decodeURI":false,"decodeURIComponent":false,"encodeURI":false,"encodeURIComponent":false,"Error":false,"escape":false,"eval":false,"EvalError":false,"Function":false,"hasOwnProperty":false,"Infinity":false,"isFinite":false,"isNaN":false,"isPrototypeOf":false,"JSON":false,"Math":false,"NaN":false,"Number":false,"Object":false,"parseFloat":false,"parseInt":false,"propertyIsEnumerable":false,"RangeError":false,"ReferenceError":false,"RegExp":false,"String":false,"SyntaxError":false,"toLocaleString":false,"toString":false,"TypeError":false,"undefined":false,"unescape":false,"URIError":false,"valueOf":false},"es2015":{"Array":false,"ArrayBuffer":false,"Boolean":false,"constructor":false,"DataView":false,"Date":false,"decodeURI":false,"decodeURIComponent":false,"encodeURI":false,"encodeURIComponent":false,"Error":false,"escape":false,"eval":false,"EvalError":false,"Float32Array":false,"Float64Array":false,"Function":false,"hasOwnProperty":false,"Infinity":false,"Int16Array":false,"Int32Array":false,"Int8Array":false,"isFinite":false,"isNaN":false,"isPrototypeOf":false,"JSON":false,"Map":false,"Math":false,"NaN":false,"Number":false,"Object":false,"parseFloat":false,"parseInt":false,"Promise":false,"propertyIsEnumerable":false,"Proxy":false,"RangeError":false,"ReferenceError":false,"Reflect":false,"RegExp":false,"Set":false,"String":false,"Symbol":false,"SyntaxError":false,"toLocaleString":false,"toString":false,"TypeError":false,"Uint16Array":false,"Uint32Array":false,"Uint8Array":false,"Uint8ClampedArray":false,"undefined":false,"unescape":false,"URIError":false,"valueOf":false,"WeakMap":false,"WeakSet":false},"es2017":{"Array":false,"ArrayBuffer":false,"Atomics":false,"Boolean":false,"constructor":false,"DataView":false,"Date":false,"decodeURI":false,"decodeURIComponent":false,"encodeURI":false,"encodeURIComponent":false,"Error":false,"escape":false,"eval":false,"EvalError":false,"Float32Array":false,"Float64Array":false,"Function":false,"hasOwnProperty":false,"Infinity":false,"Int16Array":false,"Int32Array":false,"Int8Array":false,"isFinite":false,"isNaN":false,"isPrototypeOf":false,"JSON":false,"Map":false,"Math":false,"NaN":false,"Number":false,"Object":false,"parseFloat":false,"parseInt":false,"Promise":false,"propertyIsEnumerable":false,"Proxy":false,"RangeError":false,"ReferenceError":false,"Reflect":false,"RegExp":false,"Set":false,"SharedArrayBuffer":false,"String":false,"Symbol":false,"SyntaxError":false,"toLocaleString":false,"toString":false,"TypeError":false,"Uint16Array":false,"Uint32Array":false,"Uint8Array":false,"Uint8ClampedArray":false,"undefined":false,"unescape":false,"URIError":false,"valueOf":false,"WeakMap":false,"WeakSet":false},"browser":{"AbortController":false,"AbortSignal":false,"addEventListener":false,"alert":false,"AnalyserNode":false,"Animation":false,"AnimationEffectReadOnly":false,"AnimationEffectTiming":false,"AnimationEffectTimingReadOnly":false,"AnimationEvent":false,"AnimationPlaybackEvent":false,"AnimationTimeline":false,"applicationCache":false,"ApplicationCache":false,"ApplicationCacheErrorEvent":false,"atob":false,"Attr":false,"Audio":false,"AudioBuffer":false,"AudioBufferSourceNode":false,"AudioContext":false,"AudioDestinationNode":false,"AudioListener":false,"AudioNode":false,"AudioParam":false,"AudioProcessingEvent":false,"AudioScheduledSourceNode":false,"AudioWorkletGlobalScope ":false,"AudioWorkletNode":false,"AudioWorkletProcessor":false,"BarProp":false,"BaseAudioContext":false,"BatteryManager":false,"BeforeUnloadEvent":false,"BiquadFilterNode":false,"Blob":false,"BlobEvent":false,"blur":false,"BroadcastChannel":false,"btoa":false,"BudgetService":false,"ByteLengthQueuingStrategy":false,"Cache":false,"caches":false,"CacheStorage":false,"cancelAnimationFrame":false,"cancelIdleCallback":false,"CanvasCaptureMediaStreamTrack":false,"CanvasGradient":false,"CanvasPattern":false,"CanvasRenderingContext2D":false,"ChannelMergerNode":false,"ChannelSplitterNode":false,"CharacterData":false,"clearInterval":false,"clearTimeout":false,"clientInformation":false,"ClipboardEvent":false,"close":false,"closed":false,"CloseEvent":false,"Comment":false,"CompositionEvent":false,"confirm":false,"console":false,"ConstantSourceNode":false,"ConvolverNode":false,"CountQueuingStrategy":false,"createImageBitmap":false,"Credential":false,"CredentialsContainer":false,"crypto":false,"Crypto":false,"CryptoKey":false,"CSS":false,"CSSConditionRule":false,"CSSFontFaceRule":false,"CSSGroupingRule":false,"CSSImportRule":false,"CSSKeyframeRule":false,"CSSKeyframesRule":false,"CSSMediaRule":false,"CSSNamespaceRule":false,"CSSPageRule":false,"CSSRule":false,"CSSRuleList":false,"CSSStyleDeclaration":false,"CSSStyleRule":false,"CSSStyleSheet":false,"CSSSupportsRule":false,"CustomElementRegistry":false,"customElements":false,"CustomEvent":false,"DataTransfer":false,"DataTransferItem":false,"DataTransferItemList":false,"defaultstatus":false,"defaultStatus":false,"DelayNode":false,"DeviceMotionEvent":false,"DeviceOrientationEvent":false,"devicePixelRatio":false,"dispatchEvent":false,"document":false,"Document":false,"DocumentFragment":false,"DocumentType":false,"DOMError":false,"DOMException":false,"DOMImplementation":false,"DOMMatrix":false,"DOMMatrixReadOnly":false,"DOMParser":false,"DOMPoint":false,"DOMPointReadOnly":false,"DOMQuad":false,"DOMRect":false,"DOMRectReadOnly":false,"DOMStringList":false,"DOMStringMap":false,"DOMTokenList":false,"DragEvent":false,"DynamicsCompressorNode":false,"Element":false,"ErrorEvent":false,"event":false,"Event":false,"EventSource":false,"EventTarget":false,"external":false,"fetch":false,"File":false,"FileList":false,"FileReader":false,"find":false,"focus":false,"FocusEvent":false,"FontFace":false,"FontFaceSetLoadEvent":false,"FormData":false,"frameElement":false,"frames":false,"GainNode":false,"Gamepad":false,"GamepadButton":false,"GamepadEvent":false,"getComputedStyle":false,"getSelection":false,"HashChangeEvent":false,"Headers":false,"history":false,"History":false,"HTMLAllCollection":false,"HTMLAnchorElement":false,"HTMLAreaElement":false,"HTMLAudioElement":false,"HTMLBaseElement":false,"HTMLBodyElement":false,"HTMLBRElement":false,"HTMLButtonElement":false,"HTMLCanvasElement":false,"HTMLCollection":false,"HTMLContentElement":false,"HTMLDataElement":false,"HTMLDataListElement":false,"HTMLDetailsElement":false,"HTMLDialogElement":false,"HTMLDirectoryElement":false,"HTMLDivElement":false,"HTMLDListElement":false,"HTMLDocument":false,"HTMLElement":false,"HTMLEmbedElement":false,"HTMLFieldSetElement":false,"HTMLFontElement":false,"HTMLFormControlsCollection":false,"HTMLFormElement":false,"HTMLFrameElement":false,"HTMLFrameSetElement":false,"HTMLHeadElement":false,"HTMLHeadingElement":false,"HTMLHRElement":false,"HTMLHtmlElement":false,"HTMLIFrameElement":false,"HTMLImageElement":false,"HTMLInputElement":false,"HTMLLabelElement":false,"HTMLLegendElement":false,"HTMLLIElement":false,"HTMLLinkElement":false,"HTMLMapElement":false,"HTMLMarqueeElement":false,"HTMLMediaElement":false,"HTMLMenuElement":false,"HTMLMetaElement":false,"HTMLMeterElement":false,"HTMLModElement":false,"HTMLObjectElement":false,"HTMLOListElement":false,"HTMLOptGroupElement":false,"HTMLOptionElement":false,"HTMLOptionsCollection":false,"HTMLOutputElement":false,"HTMLParagraphElement":false,"HTMLParamElement":false,"HTMLPictureElement":false,"HTMLPreElement":false,"HTMLProgressElement":false,"HTMLQuoteElement":false,"HTMLScriptElement":false,"HTMLSelectElement":false,"HTMLShadowElement":false,"HTMLSlotElement":false,"HTMLSourceElement":false,"HTMLSpanElement":false,"HTMLStyleElement":false,"HTMLTableCaptionElement":false,"HTMLTableCellElement":false,"HTMLTableColElement":false,"HTMLTableElement":false,"HTMLTableRowElement":false,"HTMLTableSectionElement":false,"HTMLTemplateElement":false,"HTMLTextAreaElement":false,"HTMLTimeElement":false,"HTMLTitleElement":false,"HTMLTrackElement":false,"HTMLUListElement":false,"HTMLUnknownElement":false,"HTMLVideoElement":false,"IDBCursor":false,"IDBCursorWithValue":false,"IDBDatabase":false,"IDBFactory":false,"IDBIndex":false,"IDBKeyRange":false,"IDBObjectStore":false,"IDBOpenDBRequest":false,"IDBRequest":false,"IDBTransaction":false,"IDBVersionChangeEvent":false,"IdleDeadline":false,"IIRFilterNode":false,"Image":false,"ImageBitmap":false,"ImageBitmapRenderingContext":false,"ImageCapture":false,"ImageData":false,"indexedDB":false,"innerHeight":false,"innerWidth":false,"InputEvent":false,"IntersectionObserver":false,"IntersectionObserverEntry":false,"Intl":false,"isSecureContext":false,"KeyboardEvent":false,"KeyframeEffect":false,"KeyframeEffectReadOnly":false,"length":false,"localStorage":false,"location":true,"Location":false,"locationbar":false,"matchMedia":false,"MediaDeviceInfo":false,"MediaDevices":false,"MediaElementAudioSourceNode":false,"MediaEncryptedEvent":false,"MediaError":false,"MediaKeyMessageEvent":false,"MediaKeySession":false,"MediaKeyStatusMap":false,"MediaKeySystemAccess":false,"MediaList":false,"MediaQueryList":false,"MediaQueryListEvent":false,"MediaRecorder":false,"MediaSettingsRange":false,"MediaSource":false,"MediaStream":false,"MediaStreamAudioDestinationNode":false,"MediaStreamAudioSourceNode":false,"MediaStreamEvent":false,"MediaStreamTrack":false,"MediaStreamTrackEvent":false,"menubar":false,"MessageChannel":false,"MessageEvent":false,"MessagePort":false,"MIDIAccess":false,"MIDIConnectionEvent":false,"MIDIInput":false,"MIDIInputMap":false,"MIDIMessageEvent":false,"MIDIOutput":false,"MIDIOutputMap":false,"MIDIPort":false,"MimeType":false,"MimeTypeArray":false,"MouseEvent":false,"moveBy":false,"moveTo":false,"MutationEvent":false,"MutationObserver":false,"MutationRecord":false,"name":false,"NamedNodeMap":false,"NavigationPreloadManager":false,"navigator":false,"Navigator":false,"NetworkInformation":false,"Node":false,"NodeFilter":false,"NodeIterator":false,"NodeList":false,"Notification":false,"OfflineAudioCompletionEvent":false,"OfflineAudioContext":false,"offscreenBuffering":false,"OffscreenCanvas":true,"onabort":true,"onafterprint":true,"onanimationend":true,"onanimationiteration":true,"onanimationstart":true,"onappinstalled":true,"onauxclick":true,"onbeforeinstallprompt":true,"onbeforeprint":true,"onbeforeunload":true,"onblur":true,"oncancel":true,"oncanplay":true,"oncanplaythrough":true,"onchange":true,"onclick":true,"onclose":true,"oncontextmenu":true,"oncuechange":true,"ondblclick":true,"ondevicemotion":true,"ondeviceorientation":true,"ondeviceorientationabsolute":true,"ondrag":true,"ondragend":true,"ondragenter":true,"ondragleave":true,"ondragover":true,"ondragstart":true,"ondrop":true,"ondurationchange":true,"onemptied":true,"onended":true,"onerror":true,"onfocus":true,"ongotpointercapture":true,"onhashchange":true,"oninput":true,"oninvalid":true,"onkeydown":true,"onkeypress":true,"onkeyup":true,"onlanguagechange":true,"onload":true,"onloadeddata":true,"onloadedmetadata":true,"onloadstart":true,"onlostpointercapture":true,"onmessage":true,"onmessageerror":true,"onmousedown":true,"onmouseenter":true,"onmouseleave":true,"onmousemove":true,"onmouseout":true,"onmouseover":true,"onmouseup":true,"onmousewheel":true,"onoffline":true,"ononline":true,"onpagehide":true,"onpageshow":true,"onpause":true,"onplay":true,"onplaying":true,"onpointercancel":true,"onpointerdown":true,"onpointerenter":true,"onpointerleave":true,"onpointermove":true,"onpointerout":true,"onpointerover":true,"onpointerup":true,"onpopstate":true,"onprogress":true,"onratechange":true,"onrejectionhandled":true,"onreset":true,"onresize":true,"onscroll":true,"onsearch":true,"onseeked":true,"onseeking":true,"onselect":true,"onstalled":true,"onstorage":true,"onsubmit":true,"onsuspend":true,"ontimeupdate":true,"ontoggle":true,"ontransitionend":true,"onunhandledrejection":true,"onunload":true,"onvolumechange":true,"onwaiting":true,"onwheel":true,"open":false,"openDatabase":false,"opener":false,"Option":false,"origin":false,"OscillatorNode":false,"outerHeight":false,"outerWidth":false,"PageTransitionEvent":false,"pageXOffset":false,"pageYOffset":false,"PannerNode":false,"parent":false,"Path2D":false,"PaymentAddress":false,"PaymentRequest":false,"PaymentRequestUpdateEvent":false,"PaymentResponse":false,"performance":false,"Performance":false,"PerformanceEntry":false,"PerformanceLongTaskTiming":false,"PerformanceMark":false,"PerformanceMeasure":false,"PerformanceNavigation":false,"PerformanceNavigationTiming":false,"PerformanceObserver":false,"PerformanceObserverEntryList":false,"PerformancePaintTiming":false,"PerformanceResourceTiming":false,"PerformanceTiming":false,"PeriodicWave":false,"Permissions":false,"PermissionStatus":false,"personalbar":false,"PhotoCapabilities":false,"Plugin":false,"PluginArray":false,"PointerEvent":false,"PopStateEvent":false,"postMessage":false,"Presentation":false,"PresentationAvailability":false,"PresentationConnection":false,"PresentationConnectionAvailableEvent":false,"PresentationConnectionCloseEvent":false,"PresentationConnectionList":false,"PresentationReceiver":false,"PresentationRequest":false,"print":false,"ProcessingInstruction":false,"ProgressEvent":false,"PromiseRejectionEvent":false,"prompt":false,"PushManager":false,"PushSubscription":false,"PushSubscriptionOptions":false,"queueMicrotask":false,"RadioNodeList":false,"Range":false,"ReadableStream":false,"registerProcessor":false,"RemotePlayback":false,"removeEventListener":false,"Request":false,"requestAnimationFrame":false,"requestIdleCallback":false,"resizeBy":false,"ResizeObserver":false,"ResizeObserverEntry":false,"resizeTo":false,"Response":false,"RTCCertificate":false,"RTCDataChannel":false,"RTCDataChannelEvent":false,"RTCDtlsTransport":false,"RTCIceCandidate":false,"RTCIceGatherer":false,"RTCIceTransport":false,"RTCPeerConnection":false,"RTCPeerConnectionIceEvent":false,"RTCRtpContributingSource":false,"RTCRtpReceiver":false,"RTCRtpSender":false,"RTCSctpTransport":false,"RTCSessionDescription":false,"RTCStatsReport":false,"RTCTrackEvent":false,"screen":false,"Screen":false,"screenLeft":false,"ScreenOrientation":false,"screenTop":false,"screenX":false,"screenY":false,"ScriptProcessorNode":false,"scroll":false,"scrollbars":false,"scrollBy":false,"scrollTo":false,"scrollX":false,"scrollY":false,"SecurityPolicyViolationEvent":false,"Selection":false,"self":false,"ServiceWorker":false,"ServiceWorkerContainer":false,"ServiceWorkerRegistration":false,"sessionStorage":false,"setInterval":false,"setTimeout":false,"ShadowRoot":false,"SharedWorker":false,"SourceBuffer":false,"SourceBufferList":false,"speechSynthesis":false,"SpeechSynthesisEvent":false,"SpeechSynthesisUtterance":false,"StaticRange":false,"status":false,"statusbar":false,"StereoPannerNode":false,"stop":false,"Storage":false,"StorageEvent":false,"StorageManager":false,"styleMedia":false,"StyleSheet":false,"StyleSheetList":false,"SubtleCrypto":false,"SVGAElement":false,"SVGAngle":false,"SVGAnimatedAngle":false,"SVGAnimatedBoolean":false,"SVGAnimatedEnumeration":false,"SVGAnimatedInteger":false,"SVGAnimatedLength":false,"SVGAnimatedLengthList":false,"SVGAnimatedNumber":false,"SVGAnimatedNumberList":false,"SVGAnimatedPreserveAspectRatio":false,"SVGAnimatedRect":false,"SVGAnimatedString":false,"SVGAnimatedTransformList":false,"SVGAnimateElement":false,"SVGAnimateMotionElement":false,"SVGAnimateTransformElement":false,"SVGAnimationElement":false,"SVGCircleElement":false,"SVGClipPathElement":false,"SVGComponentTransferFunctionElement":false,"SVGDefsElement":false,"SVGDescElement":false,"SVGDiscardElement":false,"SVGElement":false,"SVGEllipseElement":false,"SVGFEBlendElement":false,"SVGFEColorMatrixElement":false,"SVGFEComponentTransferElement":false,"SVGFECompositeElement":false,"SVGFEConvolveMatrixElement":false,"SVGFEDiffuseLightingElement":false,"SVGFEDisplacementMapElement":false,"SVGFEDistantLightElement":false,"SVGFEDropShadowElement":false,"SVGFEFloodElement":false,"SVGFEFuncAElement":false,"SVGFEFuncBElement":false,"SVGFEFuncGElement":false,"SVGFEFuncRElement":false,"SVGFEGaussianBlurElement":false,"SVGFEImageElement":false,"SVGFEMergeElement":false,"SVGFEMergeNodeElement":false,"SVGFEMorphologyElement":false,"SVGFEOffsetElement":false,"SVGFEPointLightElement":false,"SVGFESpecularLightingElement":false,"SVGFESpotLightElement":false,"SVGFETileElement":false,"SVGFETurbulenceElement":false,"SVGFilterElement":false,"SVGForeignObjectElement":false,"SVGGElement":false,"SVGGeometryElement":false,"SVGGradientElement":false,"SVGGraphicsElement":false,"SVGImageElement":false,"SVGLength":false,"SVGLengthList":false,"SVGLinearGradientElement":false,"SVGLineElement":false,"SVGMarkerElement":false,"SVGMaskElement":false,"SVGMatrix":false,"SVGMetadataElement":false,"SVGMPathElement":false,"SVGNumber":false,"SVGNumberList":false,"SVGPathElement":false,"SVGPatternElement":false,"SVGPoint":false,"SVGPointList":false,"SVGPolygonElement":false,"SVGPolylineElement":false,"SVGPreserveAspectRatio":false,"SVGRadialGradientElement":false,"SVGRect":false,"SVGRectElement":false,"SVGScriptElement":false,"SVGSetElement":false,"SVGStopElement":false,"SVGStringList":false,"SVGStyleElement":false,"SVGSVGElement":false,"SVGSwitchElement":false,"SVGSymbolElement":false,"SVGTextContentElement":false,"SVGTextElement":false,"SVGTextPathElement":false,"SVGTextPositioningElement":false,"SVGTitleElement":false,"SVGTransform":false,"SVGTransformList":false,"SVGTSpanElement":false,"SVGUnitTypes":false,"SVGUseElement":false,"SVGViewElement":false,"TaskAttributionTiming":false,"Text":false,"TextDecoder":false,"TextEncoder":false,"TextEvent":false,"TextMetrics":false,"TextTrack":false,"TextTrackCue":false,"TextTrackCueList":false,"TextTrackList":false,"TimeRanges":false,"toolbar":false,"top":false,"Touch":false,"TouchEvent":false,"TouchList":false,"TrackEvent":false,"TransitionEvent":false,"TreeWalker":false,"UIEvent":false,"URL":false,"URLSearchParams":false,"ValidityState":false,"visualViewport":false,"VisualViewport":false,"VTTCue":false,"WaveShaperNode":false,"WebAssembly":false,"WebGL2RenderingContext":false,"WebGLActiveInfo":false,"WebGLBuffer":false,"WebGLContextEvent":false,"WebGLFramebuffer":false,"WebGLProgram":false,"WebGLQuery":false,"WebGLRenderbuffer":false,"WebGLRenderingContext":false,"WebGLSampler":false,"WebGLShader":false,"WebGLShaderPrecisionFormat":false,"WebGLSync":false,"WebGLTexture":false,"WebGLTransformFeedback":false,"WebGLUniformLocation":false,"WebGLVertexArrayObject":false,"WebSocket":false,"WheelEvent":false,"window":false,"Window":false,"Worker":false,"WritableStream":false,"XMLDocument":false,"XMLHttpRequest":false,"XMLHttpRequestEventTarget":false,"XMLHttpRequestUpload":false,"XMLSerializer":false,"XPathEvaluator":false,"XPathExpression":false,"XPathResult":false,"XSLTProcessor":false},"worker":{"addEventListener":false,"applicationCache":false,"atob":false,"Blob":false,"BroadcastChannel":false,"btoa":false,"Cache":false,"caches":false,"clearInterval":false,"clearTimeout":false,"close":true,"console":false,"fetch":false,"FileReaderSync":false,"FormData":false,"Headers":false,"IDBCursor":false,"IDBCursorWithValue":false,"IDBDatabase":false,"IDBFactory":false,"IDBIndex":false,"IDBKeyRange":false,"IDBObjectStore":false,"IDBOpenDBRequest":false,"IDBRequest":false,"IDBTransaction":false,"IDBVersionChangeEvent":false,"ImageData":false,"importScripts":true,"indexedDB":false,"location":false,"MessageChannel":false,"MessagePort":false,"name":false,"navigator":false,"Notification":false,"onclose":true,"onconnect":true,"onerror":true,"onlanguagechange":true,"onmessage":true,"onoffline":true,"ononline":true,"onrejectionhandled":true,"onunhandledrejection":true,"performance":false,"Performance":false,"PerformanceEntry":false,"PerformanceMark":false,"PerformanceMeasure":false,"PerformanceNavigation":false,"PerformanceResourceTiming":false,"PerformanceTiming":false,"postMessage":true,"Promise":false,"queueMicrotask":false,"removeEventListener":false,"Request":false,"Response":false,"self":true,"ServiceWorkerRegistration":false,"setInterval":false,"setTimeout":false,"TextDecoder":false,"TextEncoder":false,"URL":false,"URLSearchParams":false,"WebSocket":false,"Worker":false,"WorkerGlobalScope":false,"XMLHttpRequest":false},"node":{"__dirname":false,"__filename":false,"Buffer":false,"clearImmediate":false,"clearInterval":false,"clearTimeout":false,"console":false,"exports":true,"global":false,"Intl":false,"module":false,"process":false,"queueMicrotask":false,"require":false,"setImmediate":false,"setInterval":false,"setTimeout":false,"TextDecoder":false,"TextEncoder":false,"URL":false,"URLSearchParams":false},"commonjs":{"exports":true,"global":false,"module":false,"require":false},"amd":{"define":false,"require":false},"mocha":{"after":false,"afterEach":false,"before":false,"beforeEach":false,"context":false,"describe":false,"it":false,"mocha":false,"run":false,"setup":false,"specify":false,"suite":false,"suiteSetup":false,"suiteTeardown":false,"teardown":false,"test":false,"xcontext":false,"xdescribe":false,"xit":false,"xspecify":false},"jasmine":{"afterAll":false,"afterEach":false,"beforeAll":false,"beforeEach":false,"describe":false,"expect":false,"fail":false,"fdescribe":false,"fit":false,"it":false,"jasmine":false,"pending":false,"runs":false,"spyOn":false,"spyOnProperty":false,"waits":false,"waitsFor":false,"xdescribe":false,"xit":false},"jest":{"afterAll":false,"afterEach":false,"beforeAll":false,"beforeEach":false,"describe":false,"expect":false,"fdescribe":false,"fit":false,"it":false,"jest":false,"pit":false,"require":false,"test":false,"xdescribe":false,"xit":false,"xtest":false},"qunit":{"asyncTest":false,"deepEqual":false,"equal":false,"expect":false,"module":false,"notDeepEqual":false,"notEqual":false,"notOk":false,"notPropEqual":false,"notStrictEqual":false,"ok":false,"propEqual":false,"QUnit":false,"raises":false,"start":false,"stop":false,"strictEqual":false,"test":false,"throws":false},"phantomjs":{"console":true,"exports":true,"phantom":true,"require":true,"WebPage":true},"couch":{"emit":false,"exports":false,"getRow":false,"log":false,"module":false,"provides":false,"require":false,"respond":false,"send":false,"start":false,"sum":false},"rhino":{"defineClass":false,"deserialize":false,"gc":false,"help":false,"importClass":false,"importPackage":false,"java":false,"load":false,"loadClass":false,"Packages":false,"print":false,"quit":false,"readFile":false,"readUrl":false,"runCommand":false,"seal":false,"serialize":false,"spawn":false,"sync":false,"toint32":false,"version":false},"nashorn":{"__DIR__":false,"__FILE__":false,"__LINE__":false,"com":false,"edu":false,"exit":false,"java":false,"Java":false,"javafx":false,"JavaImporter":false,"javax":false,"JSAdapter":false,"load":false,"loadWithNewGlobal":false,"org":false,"Packages":false,"print":false,"quit":false},"wsh":{"ActiveXObject":true,"Enumerator":true,"GetObject":true,"ScriptEngine":true,"ScriptEngineBuildVersion":true,"ScriptEngineMajorVersion":true,"ScriptEngineMinorVersion":true,"VBArray":true,"WScript":true,"WSH":true,"XDomainRequest":true},"jquery":{"$":false,"jQuery":false},"yui":{"YAHOO":false,"YAHOO_config":false,"YUI":false,"YUI_config":false},"shelljs":{"cat":false,"cd":false,"chmod":false,"config":false,"cp":false,"dirs":false,"echo":false,"env":false,"error":false,"exec":false,"exit":false,"find":false,"grep":false,"ln":false,"ls":false,"mkdir":false,"mv":false,"popd":false,"pushd":false,"pwd":false,"rm":false,"sed":false,"set":false,"target":false,"tempdir":false,"test":false,"touch":false,"which":false},"prototypejs":{"$":false,"$$":false,"$A":false,"$break":false,"$continue":false,"$F":false,"$H":false,"$R":false,"$w":false,"Abstract":false,"Ajax":false,"Autocompleter":false,"Builder":false,"Class":false,"Control":false,"Draggable":false,"Draggables":false,"Droppables":false,"Effect":false,"Element":false,"Enumerable":false,"Event":false,"Field":false,"Form":false,"Hash":false,"Insertion":false,"ObjectRange":false,"PeriodicalExecuter":false,"Position":false,"Prototype":false,"Scriptaculous":false,"Selector":false,"Sortable":false,"SortableObserver":false,"Sound":false,"Template":false,"Toggle":false,"Try":false},"meteor":{"_":false,"$":false,"Accounts":false,"AccountsClient":false,"AccountsCommon":false,"AccountsServer":false,"App":false,"Assets":false,"Blaze":false,"check":false,"Cordova":false,"DDP":false,"DDPRateLimiter":false,"DDPServer":false,"Deps":false,"EJSON":false,"Email":false,"HTTP":false,"Log":false,"Match":false,"Meteor":false,"Mongo":false,"MongoInternals":false,"Npm":false,"Package":false,"Plugin":false,"process":false,"Random":false,"ReactiveDict":false,"ReactiveVar":false,"Router":false,"ServiceConfiguration":false,"Session":false,"share":false,"Spacebars":false,"Template":false,"Tinytest":false,"Tracker":false,"UI":false,"Utils":false,"WebApp":false,"WebAppInternals":false},"mongo":{"_isWindows":false,"_rand":false,"BulkWriteResult":false,"cat":false,"cd":false,"connect":false,"db":false,"getHostName":false,"getMemInfo":false,"hostname":false,"ISODate":false,"listFiles":false,"load":false,"ls":false,"md5sumFile":false,"mkdir":false,"Mongo":false,"NumberInt":false,"NumberLong":false,"ObjectId":false,"PlanCache":false,"print":false,"printjson":false,"pwd":false,"quit":false,"removeFile":false,"rs":false,"sh":false,"UUID":false,"version":false,"WriteResult":false},"applescript":{"$":false,"Application":false,"Automation":false,"console":false,"delay":false,"Library":false,"ObjC":false,"ObjectSpecifier":false,"Path":false,"Progress":false,"Ref":false},"serviceworker":{"addEventListener":false,"applicationCache":false,"atob":false,"Blob":false,"BroadcastChannel":false,"btoa":false,"Cache":false,"caches":false,"CacheStorage":false,"clearInterval":false,"clearTimeout":false,"Client":false,"clients":false,"Clients":false,"close":true,"console":false,"ExtendableEvent":false,"ExtendableMessageEvent":false,"fetch":false,"FetchEvent":false,"FileReaderSync":false,"FormData":false,"Headers":false,"IDBCursor":false,"IDBCursorWithValue":false,"IDBDatabase":false,"IDBFactory":false,"IDBIndex":false,"IDBKeyRange":false,"IDBObjectStore":false,"IDBOpenDBRequest":false,"IDBRequest":false,"IDBTransaction":false,"IDBVersionChangeEvent":false,"ImageData":false,"importScripts":false,"indexedDB":false,"location":false,"MessageChannel":false,"MessagePort":false,"name":false,"navigator":false,"Notification":false,"onclose":true,"onconnect":true,"onerror":true,"onfetch":true,"oninstall":true,"onlanguagechange":true,"onmessage":true,"onmessageerror":true,"onnotificationclick":true,"onnotificationclose":true,"onoffline":true,"ononline":true,"onpush":true,"onpushsubscriptionchange":true,"onrejectionhandled":true,"onsync":true,"onunhandledrejection":true,"performance":false,"Performance":false,"PerformanceEntry":false,"PerformanceMark":false,"PerformanceMeasure":false,"PerformanceNavigation":false,"PerformanceResourceTiming":false,"PerformanceTiming":false,"postMessage":true,"Promise":false,"queueMicrotask":false,"registration":false,"removeEventListener":false,"Request":false,"Response":false,"self":false,"ServiceWorker":false,"ServiceWorkerContainer":false,"ServiceWorkerGlobalScope":false,"ServiceWorkerMessageEvent":false,"ServiceWorkerRegistration":false,"setInterval":false,"setTimeout":false,"skipWaiting":false,"TextDecoder":false,"TextEncoder":false,"URL":false,"URLSearchParams":false,"WebSocket":false,"WindowClient":false,"Worker":false,"WorkerGlobalScope":false,"XMLHttpRequest":false},"atomtest":{"advanceClock":false,"fakeClearInterval":false,"fakeClearTimeout":false,"fakeSetInterval":false,"fakeSetTimeout":false,"resetTimeouts":false,"waitsForPromise":false},"embertest":{"andThen":false,"click":false,"currentPath":false,"currentRouteName":false,"currentURL":false,"fillIn":false,"find":false,"findAll":false,"findWithAssert":false,"keyEvent":false,"pauseTest":false,"resumeTest":false,"triggerEvent":false,"visit":false,"wait":false},"protractor":{"$":false,"$$":false,"browser":false,"by":false,"By":false,"DartObject":false,"element":false,"protractor":false},"shared-node-browser":{"clearInterval":false,"clearTimeout":false,"console":false,"setInterval":false,"setTimeout":false,"URL":false,"URLSearchParams":false},"webextensions":{"browser":false,"chrome":false,"opr":false},"greasemonkey":{"cloneInto":false,"createObjectIn":false,"exportFunction":false,"GM":false,"GM_addStyle":false,"GM_deleteValue":false,"GM_getResourceText":false,"GM_getResourceURL":false,"GM_getValue":false,"GM_info":false,"GM_listValues":false,"GM_log":false,"GM_openInTab":false,"GM_registerMenuCommand":false,"GM_setClipboard":false,"GM_setValue":false,"GM_xmlhttpRequest":false,"unsafeWindow":false},"devtools":{"$":false,"$_":false,"$$":false,"$0":false,"$1":false,"$2":false,"$3":false,"$4":false,"$x":false,"chrome":false,"clear":false,"copy":false,"debug":false,"dir":false,"dirxml":false,"getEventListeners":false,"inspect":false,"keys":false,"monitor":false,"monitorEvents":false,"profile":false,"profileEnd":false,"queryObjects":false,"table":false,"undebug":false,"unmonitor":false,"unmonitorEvents":false,"values":false}}');
  },
  19: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.isReservedWord = isReservedWord, exports.isStrictReservedWord = isStrictReservedWord, 
    exports.isStrictBindOnlyReservedWord = isStrictBindOnlyReservedWord, exports.isStrictBindReservedWord = function(word, inModule) {
      return isStrictReservedWord(word, inModule) || isStrictBindOnlyReservedWord(word);
    }, exports.isKeyword = function(word) {
      return keywords.has(word);
    };
    const reservedWords_strict = [ "implements", "interface", "let", "package", "private", "protected", "public", "static", "yield" ], reservedWords_strictBind = [ "eval", "arguments" ], keywords = new Set([ "break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete" ]), reservedWordsStrictSet = new Set(reservedWords_strict), reservedWordsStrictBindSet = new Set(reservedWords_strictBind);
    function isReservedWord(word, inModule) {
      return inModule && "await" === word || "enum" === word;
    }
    function isStrictReservedWord(word, inModule) {
      return isReservedWord(word, inModule) || reservedWordsStrictSet.has(word);
    }
    function isStrictBindOnlyReservedWord(word) {
      return reservedWordsStrictBindSet.has(word);
    }
  },
  2: function(module, exports) {
    module.exports = require("@babel/core");
  },
  20: function(module, exports, __webpack_require__) {
    var baseIsNative = __webpack_require__(40), getValue = __webpack_require__(43);
    module.exports = function(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    };
  },
  21: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.codeFrameColumns = codeFrameColumns, exports.default = function(rawLines, lineNumber, colNumber, opts = {}) {
      if (!deprecationWarningShown) {
        deprecationWarningShown = !0;
        const message = "Passing lineNumber and colNumber is deprecated to @babel/code-frame. Please use `codeFrameColumns`.";
        if (process.emitWarning) process.emitWarning(message, "DeprecationWarning"); else {
          new Error(message).name = "DeprecationWarning", console.warn(new Error(message));
        }
      }
      colNumber = Math.max(colNumber, 0);
      return codeFrameColumns(rawLines, {
        start: {
          column: colNumber,
          line: lineNumber
        }
      }, opts);
    };
    var _highlight = function(obj) {
      if (obj && obj.__esModule) return obj;
      if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
        default: obj
      };
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) return cache.get(obj);
      var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
      }
      newObj.default = obj, cache && cache.set(obj, newObj);
      return newObj;
    }(__webpack_require__(23));
    function _getRequireWildcardCache() {
      if ("function" != typeof WeakMap) return null;
      var cache = new WeakMap;
      return _getRequireWildcardCache = function() {
        return cache;
      }, cache;
    }
    let deprecationWarningShown = !1;
    const NEWLINE = /\r\n|[\n\r\u2028\u2029]/;
    function codeFrameColumns(rawLines, loc, opts = {}) {
      const highlighted = (opts.highlightCode || opts.forceColor) && (0, _highlight.shouldHighlight)(opts), chalk = (0, 
      _highlight.getChalk)(opts), defs = function(chalk) {
        return {
          gutter: chalk.grey,
          marker: chalk.red.bold,
          message: chalk.red.bold
        };
      }(chalk), maybeHighlight = (chalkFn, string) => highlighted ? chalkFn(string) : string, lines = rawLines.split(NEWLINE), {start: start, end: end, markerLines: markerLines} = function(loc, source, opts) {
        const startLoc = Object.assign({
          column: 0,
          line: -1
        }, loc.start), endLoc = Object.assign({}, startLoc, loc.end), {linesAbove: linesAbove = 2, linesBelow: linesBelow = 3} = opts || {}, startLine = startLoc.line, startColumn = startLoc.column, endLine = endLoc.line, endColumn = endLoc.column;
        let start = Math.max(startLine - (linesAbove + 1), 0), end = Math.min(source.length, endLine + linesBelow);
        -1 === startLine && (start = 0), -1 === endLine && (end = source.length);
        const lineDiff = endLine - startLine, markerLines = {};
        if (lineDiff) for (let i = 0; i <= lineDiff; i++) {
          const lineNumber = i + startLine;
          if (startColumn) if (0 === i) {
            const sourceLength = source[lineNumber - 1].length;
            markerLines[lineNumber] = [ startColumn, sourceLength - startColumn + 1 ];
          } else if (i === lineDiff) markerLines[lineNumber] = [ 0, endColumn ]; else {
            const sourceLength = source[lineNumber - i].length;
            markerLines[lineNumber] = [ 0, sourceLength ];
          } else markerLines[lineNumber] = !0;
        } else markerLines[startLine] = startColumn === endColumn ? !startColumn || [ startColumn, 0 ] : [ startColumn, endColumn - startColumn ];
        return {
          start: start,
          end: end,
          markerLines: markerLines
        };
      }(loc, lines, opts), hasColumns = loc.start && "number" == typeof loc.start.column, numberMaxWidth = String(end).length;
      let frame = (highlighted ? (0, _highlight.default)(rawLines, opts) : rawLines).split(NEWLINE).slice(start, end).map((line, index) => {
        const number = start + 1 + index, gutter = ` ${(" " + number).slice(-numberMaxWidth)} | `, hasMarker = markerLines[number], lastMarkerLine = !markerLines[number + 1];
        if (hasMarker) {
          let markerLine = "";
          if (Array.isArray(hasMarker)) {
            const markerSpacing = line.slice(0, Math.max(hasMarker[0] - 1, 0)).replace(/[^\t]/g, " "), numberOfMarkers = hasMarker[1] || 1;
            markerLine = [ "\n ", maybeHighlight(defs.gutter, gutter.replace(/\d/g, " ")), markerSpacing, maybeHighlight(defs.marker, "^").repeat(numberOfMarkers) ].join(""), 
            lastMarkerLine && opts.message && (markerLine += " " + maybeHighlight(defs.message, opts.message));
          }
          return [ maybeHighlight(defs.marker, ">"), maybeHighlight(defs.gutter, gutter), line, markerLine ].join("");
        }
        return ` ${maybeHighlight(defs.gutter, gutter)}${line}`;
      }).join("\n");
      return opts.message && !hasColumns && (frame = `${" ".repeat(numberMaxWidth + 1)}${opts.message}\n${frame}`), 
      highlighted ? chalk.reset(frame) : frame;
    }
  },
  22: function(module, exports) {
    module.exports = require("../lib/parser");
  },
  23: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.shouldHighlight = shouldHighlight, exports.getChalk = getChalk, exports.default = function(code, options = {}) {
      if (shouldHighlight(options)) {
        const chalk = getChalk(options);
        return function(defs, text) {
          return text.replace(_jsTokens.default, (function(...args) {
            const type = function(match) {
              const [offset, text] = match.slice(-2), token = (0, _jsTokens.matchToToken)(match);
              if ("name" === token.type) {
                if ((0, _helperValidatorIdentifier.isKeyword)(token.value) || (0, _helperValidatorIdentifier.isReservedWord)(token.value)) return "keyword";
                if (JSX_TAG.test(token.value) && ("<" === text[offset - 1] || "</" == text.substr(offset - 2, 2))) return "jsx_tag";
                if (token.value[0] !== token.value[0].toLowerCase()) return "capitalized";
              }
              if ("punctuator" === token.type && BRACKET.test(token.value)) return "bracket";
              if ("invalid" === token.type && ("@" === token.value || "#" === token.value)) return "punctuator";
              return token.type;
            }(args), colorize = defs[type];
            return colorize ? args[0].split(NEWLINE).map(str => colorize(str)).join("\n") : args[0];
          }));
        }(function(chalk) {
          return {
            keyword: chalk.cyan,
            capitalized: chalk.yellow,
            jsx_tag: chalk.yellow,
            punctuator: chalk.yellow,
            number: chalk.magenta,
            string: chalk.green,
            regex: chalk.magenta,
            comment: chalk.grey,
            invalid: chalk.white.bgRed.bold
          };
        }(chalk), code);
      }
      return code;
    };
    var obj, _jsTokens = function(obj) {
      if (obj && obj.__esModule) return obj;
      if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
        default: obj
      };
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) return cache.get(obj);
      var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
      }
      newObj.default = obj, cache && cache.set(obj, newObj);
      return newObj;
    }(__webpack_require__(24)), _helperValidatorIdentifier = __webpack_require__(14), _chalk = (obj = __webpack_require__(25)) && obj.__esModule ? obj : {
      default: obj
    };
    function _getRequireWildcardCache() {
      if ("function" != typeof WeakMap) return null;
      var cache = new WeakMap;
      return _getRequireWildcardCache = function() {
        return cache;
      }, cache;
    }
    const NEWLINE = /\r\n|[\n\r\u2028\u2029]/, JSX_TAG = /^[a-z][\w-]*$/i, BRACKET = /^[()[\]{}]$/;
    function shouldHighlight(options) {
      return _chalk.default.supportsColor || options.forceColor;
    }
    function getChalk(options) {
      let chalk = _chalk.default;
      return options.forceColor && (chalk = new _chalk.default.constructor({
        enabled: !0,
        level: 1
      })), chalk;
    }
  },
  24: function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = /((['"])(?:(?!\2|\\).|\\(?:\r\n|[\s\S]))*(\2)?|`(?:[^`\\$]|\\[\s\S]|\$(?!\{)|\$\{(?:[^{}]|\{[^}]*\}?)*\}?)*(`)?)|(\/\/.*)|(\/\*(?:[^*]|\*(?!\/))*(\*\/)?)|(\/(?!\*)(?:\[(?:(?![\]\\]).|\\.)*\]|(?![\/\]\\]).|\\.)+\/(?:(?!\s*(?:\b|[\u0080-\uFFFF$\\'"~({]|[+\-!](?!=)|\.?\d))|[gmiyus]{1,6}\b(?![\u0080-\uFFFF$\\]|\s*(?:[+\-*%&|^<>!=?({]|\/(?![\/*])))))|(0[xX][\da-fA-F]+|0[oO][0-7]+|0[bB][01]+|(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?)|((?!\d)(?:(?!\s)[$\w\u0080-\uFFFF]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+)|(--|\+\+|&&|\|\||=>|\.{3}|(?:[+\-\/%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2})=?|[?~.,:;[\](){}])|(\s+)|(^$|[\s\S])/g, 
    exports.matchToToken = function(match) {
      var token = {
        type: "invalid",
        value: match[0],
        closed: void 0
      };
      return match[1] ? (token.type = "string", token.closed = !(!match[3] && !match[4])) : match[5] ? token.type = "comment" : match[6] ? (token.type = "comment", 
      token.closed = !!match[7]) : match[8] ? token.type = "regex" : match[9] ? token.type = "number" : match[10] ? token.type = "name" : match[11] ? token.type = "punctuator" : match[12] && (token.type = "whitespace"), 
      token;
    };
  },
  25: function(module, exports) {
    module.exports = require("chalk");
  },
  26: function(module, exports, __webpack_require__) {
    "use strict";
    function makeStatementFormatter(fn) {
      return {
        code: str => "/* @babel/template */;\n" + str,
        validate: () => {},
        unwrap: ast => fn(ast.program.body.slice(1))
      };
    }
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.program = exports.expression = exports.statement = exports.statements = exports.smart = void 0;
    const smart = makeStatementFormatter(body => body.length > 1 ? body : body[0]);
    exports.smart = smart;
    const statements = makeStatementFormatter(body => body);
    exports.statements = statements;
    const statement = makeStatementFormatter(body => {
      if (0 === body.length) throw new Error("Found nothing to return.");
      if (body.length > 1) throw new Error("Found multiple statements but wanted one");
      return body[0];
    });
    exports.statement = statement;
    const expression = {
      code: str => `(\n${str}\n)`,
      validate: ({program: program}) => {
        if (program.body.length > 1) throw new Error("Found multiple statements but wanted one");
        if (0 === program.body[0].expression.start) throw new Error("Parse result included parens.");
      },
      unwrap: ast => ast.program.body[0].expression
    };
    exports.expression = expression;
    exports.program = {
      code: str => str,
      validate: () => {},
      unwrap: ast => ast.program
    };
  },
  27: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function createTemplateBuilder(formatter, defaultOpts) {
      const templateFnCache = new WeakMap, templateAstCache = new WeakMap, cachedOpts = defaultOpts || (0, 
      _options.validate)(null);
      return Object.assign((tpl, ...args) => {
        if ("string" == typeof tpl) {
          if (args.length > 1) throw new Error("Unexpected extra params.");
          return extendedTrace((0, _string.default)(formatter, tpl, (0, _options.merge)(cachedOpts, (0, 
          _options.validate)(args[0]))));
        }
        if (Array.isArray(tpl)) {
          let builder = templateFnCache.get(tpl);
          return builder || (builder = (0, _literal.default)(formatter, tpl, cachedOpts), 
          templateFnCache.set(tpl, builder)), extendedTrace(builder(args));
        }
        if ("object" == typeof tpl && tpl) {
          if (args.length > 0) throw new Error("Unexpected extra params.");
          return createTemplateBuilder(formatter, (0, _options.merge)(cachedOpts, (0, _options.validate)(tpl)));
        }
        throw new Error("Unexpected template param " + typeof tpl);
      }, {
        ast: (tpl, ...args) => {
          if ("string" == typeof tpl) {
            if (args.length > 1) throw new Error("Unexpected extra params.");
            return (0, _string.default)(formatter, tpl, (0, _options.merge)((0, _options.merge)(cachedOpts, (0, 
            _options.validate)(args[0])), NO_PLACEHOLDER))();
          }
          if (Array.isArray(tpl)) {
            let builder = templateAstCache.get(tpl);
            return builder || (builder = (0, _literal.default)(formatter, tpl, (0, _options.merge)(cachedOpts, NO_PLACEHOLDER)), 
            templateAstCache.set(tpl, builder)), builder(args)();
          }
          throw new Error("Unexpected template param " + typeof tpl);
        }
      });
    };
    var _options = __webpack_require__(4), _string = _interopRequireDefault(__webpack_require__(28)), _literal = _interopRequireDefault(__webpack_require__(29));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    const NO_PLACEHOLDER = (0, _options.validate)({
      placeholderPattern: !1
    });
    function extendedTrace(fn) {
      let rootStack = "";
      try {
        throw new Error;
      } catch (error) {
        error.stack && (rootStack = error.stack.split("\n").slice(3).join("\n"));
      }
      return arg => {
        try {
          return fn(arg);
        } catch (err) {
          throw err.stack += "\n    =============\n" + rootStack, err;
        }
      };
    }
  },
  28: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(formatter, code, opts) {
      let metadata;
      return code = formatter.code(code), arg => {
        const replacements = (0, _options.normalizeReplacements)(arg);
        return metadata || (metadata = (0, _parse.default)(formatter, code, opts)), formatter.unwrap((0, 
        _populate.default)(metadata, replacements));
      };
    };
    var _options = __webpack_require__(4), _parse = _interopRequireDefault(__webpack_require__(8)), _populate = _interopRequireDefault(__webpack_require__(9));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
  },
  29: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(formatter, tpl, opts) {
      const {metadata: metadata, names: names} = function(formatter, tpl, opts) {
        let names, nameSet, metadata, prefix = "";
        do {
          prefix += "$";
          const result = buildTemplateCode(tpl, prefix);
          names = result.names, nameSet = new Set(names), metadata = (0, _parse.default)(formatter, formatter.code(result.code), {
            parser: opts.parser,
            placeholderWhitelist: new Set(result.names.concat(opts.placeholderWhitelist ? Array.from(opts.placeholderWhitelist) : [])),
            placeholderPattern: opts.placeholderPattern,
            preserveComments: opts.preserveComments,
            syntacticPlaceholders: opts.syntacticPlaceholders
          });
        } while (metadata.placeholders.some(placeholder => placeholder.isDuplicate && nameSet.has(placeholder.name)));
        return {
          metadata: metadata,
          names: names
        };
      }(formatter, tpl, opts);
      return arg => {
        const defaultReplacements = arg.reduce((acc, replacement, i) => (acc[names[i]] = replacement, 
        acc), {});
        return arg => {
          const replacements = (0, _options.normalizeReplacements)(arg);
          return replacements && Object.keys(replacements).forEach(key => {
            if (Object.prototype.hasOwnProperty.call(defaultReplacements, key)) throw new Error("Unexpected replacement overlap.");
          }), formatter.unwrap((0, _populate.default)(metadata, replacements ? Object.assign(replacements, defaultReplacements) : defaultReplacements));
        };
      };
    };
    var _options = __webpack_require__(4), _parse = _interopRequireDefault(__webpack_require__(8)), _populate = _interopRequireDefault(__webpack_require__(9));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function buildTemplateCode(tpl, prefix) {
      const names = [];
      let code = tpl[0];
      for (let i = 1; i < tpl.length; i++) {
        const value = `${prefix}${i - 1}`;
        names.push(value), code += value + tpl[i];
      }
      return {
        names: names,
        code: code
      };
    }
  },
  3: function(module, exports) {
    module.exports = function(value) {
      var type = typeof value;
      return null != value && ("object" == type || "function" == type);
    };
  },
  30: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.skipAllButComputedKey = skipAllButComputedKey, exports.default = exports.environmentVisitor = void 0;
    var _traverse = _interopRequireDefault(__webpack_require__(46)), _helperMemberExpressionToFunctions = _interopRequireDefault(__webpack_require__(36)), _helperOptimiseCallExpression = _interopRequireDefault(__webpack_require__(32)), t = function(obj) {
      if (obj && obj.__esModule) return obj;
      if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
        default: obj
      };
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) return cache.get(obj);
      var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
      }
      newObj.default = obj, cache && cache.set(obj, newObj);
      return newObj;
    }(__webpack_require__(0));
    function _getRequireWildcardCache() {
      if ("function" != typeof WeakMap) return null;
      var cache = new WeakMap;
      return _getRequireWildcardCache = function() {
        return cache;
      }, cache;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function getPrototypeOfExpression(objectRef, isStatic, file, isPrivateMethod) {
      objectRef = t.cloneNode(objectRef);
      const targetRef = isStatic || isPrivateMethod ? objectRef : t.memberExpression(objectRef, t.identifier("prototype"));
      return t.callExpression(file.addHelper("getPrototypeOf"), [ targetRef ]);
    }
    function skipAllButComputedKey(path) {
      if (!path.node.computed) return void path.skip();
      const keys = t.VISITOR_KEYS[path.type];
      for (const key of keys) "key" !== key && path.skipKey(key);
    }
    const environmentVisitor = {
      TypeAnnotation(path) {
        path.skip();
      },
      Function(path) {
        path.isMethod() || path.isArrowFunctionExpression() || path.skip();
      },
      "Method|ClassProperty|ClassPrivateProperty"(path) {
        skipAllButComputedKey(path);
      }
    };
    exports.environmentVisitor = environmentVisitor;
    const visitor = _traverse.default.visitors.merge([ environmentVisitor, {
      Super(path, state) {
        const {node: node, parentPath: parentPath} = path;
        parentPath.isMemberExpression({
          object: node
        }) && state.handle(parentPath);
      }
    } ]), specHandlers = {
      memoise(superMember, count) {
        const {scope: scope, node: node} = superMember, {computed: computed, property: property} = node;
        if (!computed) return;
        const memo = scope.maybeGenerateMemoised(property);
        memo && this.memoiser.set(property, memo, count);
      },
      prop(superMember) {
        const {computed: computed, property: property} = superMember.node;
        return this.memoiser.has(property) ? t.cloneNode(this.memoiser.get(property)) : computed ? t.cloneNode(property) : t.stringLiteral(property.name);
      },
      get(superMember) {
        return this._get(superMember, this._getThisRefs());
      },
      _get(superMember, thisRefs) {
        const proto = getPrototypeOfExpression(this.getObjectRef(), this.isStatic, this.file, this.isPrivateMethod);
        return t.callExpression(this.file.addHelper("get"), [ thisRefs.memo ? t.sequenceExpression([ thisRefs.memo, proto ]) : proto, this.prop(superMember), thisRefs.this ]);
      },
      _getThisRefs() {
        if (!this.isDerivedConstructor) return {
          this: t.thisExpression()
        };
        const thisRef = this.scope.generateDeclaredUidIdentifier("thisSuper");
        return {
          memo: t.assignmentExpression("=", thisRef, t.thisExpression()),
          this: t.cloneNode(thisRef)
        };
      },
      set(superMember, value) {
        const thisRefs = this._getThisRefs(), proto = getPrototypeOfExpression(this.getObjectRef(), this.isStatic, this.file, this.isPrivateMethod);
        return t.callExpression(this.file.addHelper("set"), [ thisRefs.memo ? t.sequenceExpression([ thisRefs.memo, proto ]) : proto, this.prop(superMember), value, thisRefs.this, t.booleanLiteral(superMember.isInStrictMode()) ]);
      },
      destructureSet(superMember) {
        throw superMember.buildCodeFrameError("Destructuring to a super field is not supported yet.");
      },
      call(superMember, args) {
        const thisRefs = this._getThisRefs();
        return (0, _helperOptimiseCallExpression.default)(this._get(superMember, thisRefs), t.cloneNode(thisRefs.this), args, !1);
      }
    }, looseHandlers = Object.assign({}, specHandlers, {
      prop(superMember) {
        const {property: property} = superMember.node;
        return this.memoiser.has(property) ? t.cloneNode(this.memoiser.get(property)) : t.cloneNode(property);
      },
      get(superMember) {
        const {isStatic: isStatic, superRef: superRef} = this, {computed: computed} = superMember.node, prop = this.prop(superMember);
        let object;
        return object = isStatic ? superRef ? t.cloneNode(superRef) : t.memberExpression(t.identifier("Function"), t.identifier("prototype")) : superRef ? t.memberExpression(t.cloneNode(superRef), t.identifier("prototype")) : t.memberExpression(t.identifier("Object"), t.identifier("prototype")), 
        t.memberExpression(object, prop, computed);
      },
      set(superMember, value) {
        const {computed: computed} = superMember.node, prop = this.prop(superMember);
        return t.assignmentExpression("=", t.memberExpression(t.thisExpression(), prop, computed), value);
      },
      destructureSet(superMember) {
        const {computed: computed} = superMember.node, prop = this.prop(superMember);
        return t.memberExpression(t.thisExpression(), prop, computed);
      },
      call(superMember, args) {
        return (0, _helperOptimiseCallExpression.default)(this.get(superMember), t.thisExpression(), args, !1);
      }
    });
    exports.default = class {
      constructor(opts) {
        const path = opts.methodPath;
        this.methodPath = path, this.isDerivedConstructor = path.isClassMethod({
          kind: "constructor"
        }) && !!opts.superRef, this.isStatic = path.isObjectMethod() || path.node.static, 
        this.isPrivateMethod = path.isPrivate() && path.isMethod(), this.file = opts.file, 
        this.superRef = opts.superRef, this.isLoose = opts.isLoose, this.opts = opts;
      }
      getObjectRef() {
        return t.cloneNode(this.opts.objectRef || this.opts.getObjectRef());
      }
      replace() {
        const handler = this.isLoose ? looseHandlers : specHandlers;
        (0, _helperMemberExpressionToFunctions.default)(this.methodPath, visitor, Object.assign({
          file: this.file,
          scope: this.methodPath.scope,
          isDerivedConstructor: this.isDerivedConstructor,
          isStatic: this.isStatic,
          isPrivateMethod: this.isPrivateMethod,
          getObjectRef: this.getObjectRef.bind(this),
          superRef: this.superRef
        }, handler));
      }
    };
  },
  32: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(callee, thisNode, args, optional) {
      return 1 === args.length && t.isSpreadElement(args[0]) && t.isIdentifier(args[0].argument, {
        name: "arguments"
      }) ? t.callExpression(t.memberExpression(callee, t.identifier("apply")), [ thisNode, args[0].argument ]) : optional ? t.optionalCallExpression(t.optionalMemberExpression(callee, t.identifier("call"), !1, !0), [ thisNode, ...args ], !1) : t.callExpression(t.memberExpression(callee, t.identifier("call")), [ thisNode, ...args ]);
    };
    var t = function(obj) {
      if (obj && obj.__esModule) return obj;
      if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
        default: obj
      };
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) return cache.get(obj);
      var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
      }
      newObj.default = obj, cache && cache.set(obj, newObj);
      return newObj;
    }(__webpack_require__(0));
    function _getRequireWildcardCache() {
      if ("function" != typeof WeakMap) return null;
      var cache = new WeakMap;
      return _getRequireWildcardCache = function() {
        return cache;
      }, cache;
    }
  },
  35: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function({node: node, parent: parent, scope: scope, id: id}, localBinding = !1) {
      if (node.id) return;
      if (!t.isObjectProperty(parent) && !t.isObjectMethod(parent, {
        kind: "method"
      }) || parent.computed && !t.isLiteral(parent.key)) {
        if (t.isVariableDeclarator(parent)) {
          if (id = parent.id, t.isIdentifier(id) && !localBinding) {
            const binding = scope.parent.getBinding(id.name);
            if (binding && binding.constant && scope.getBinding(id.name) === binding) return node.id = t.cloneNode(id), 
            void (node.id[t.NOT_LOCAL_BINDING] = !0);
          }
        } else if (t.isAssignmentExpression(parent, {
          operator: "="
        })) id = parent.left; else if (!id) return;
      } else id = parent.key;
      let name;
      id && t.isLiteral(id) ? name = function(id) {
        if (t.isNullLiteral(id)) return "null";
        if (t.isRegExpLiteral(id)) return `_${id.pattern}_${id.flags}`;
        if (t.isTemplateLiteral(id)) return id.quasis.map(quasi => quasi.value.raw).join("");
        if (void 0 !== id.value) return id.value + "";
        return "";
      }(id) : id && t.isIdentifier(id) && (name = id.name);
      if (void 0 === name) return;
      name = t.toBindingIdentifierName(name), (id = t.identifier(name))[t.NOT_LOCAL_BINDING] = !0;
      return function(state, method, id, scope) {
        if (state.selfReference) {
          if (!scope.hasBinding(id.name) || scope.hasGlobal(id.name)) {
            if (!t.isFunction(method)) return;
            let build = buildPropertyMethodAssignmentWrapper;
            method.generator && (build = buildGeneratorPropertyMethodAssignmentWrapper);
            const template = build({
              FUNCTION: method,
              FUNCTION_ID: id,
              FUNCTION_KEY: scope.generateUidIdentifier(id.name)
            }).expression, params = template.callee.body.body[0].params;
            for (let i = 0, len = (0, _helperGetFunctionArity.default)(method); i < len; i++) params.push(scope.generateUidIdentifier("x"));
            return template;
          }
          scope.rename(id.name);
        }
        method.id = id, scope.getProgramParent().references[id.name] = !0;
      }(function(node, name, scope) {
        const state = {
          selfAssignment: !1,
          selfReference: !1,
          outerDeclar: scope.getBindingIdentifier(name),
          references: [],
          name: name
        }, binding = scope.getOwnBinding(name);
        binding ? "param" === binding.kind && (state.selfReference = !0) : (state.outerDeclar || scope.hasGlobal(name)) && scope.traverse(node, visitor, state);
        return state;
      }(node, name, scope), node, id, scope) || node;
    };
    var _helperGetFunctionArity = _interopRequireDefault(__webpack_require__(51)), _template = _interopRequireDefault(__webpack_require__(11)), t = function(obj) {
      if (obj && obj.__esModule) return obj;
      if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
        default: obj
      };
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) return cache.get(obj);
      var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
      }
      newObj.default = obj, cache && cache.set(obj, newObj);
      return newObj;
    }(__webpack_require__(0));
    function _getRequireWildcardCache() {
      if ("function" != typeof WeakMap) return null;
      var cache = new WeakMap;
      return _getRequireWildcardCache = function() {
        return cache;
      }, cache;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    const buildPropertyMethodAssignmentWrapper = (0, _template.default)("\n  (function (FUNCTION_KEY) {\n    function FUNCTION_ID() {\n      return FUNCTION_KEY.apply(this, arguments);\n    }\n\n    FUNCTION_ID.toString = function () {\n      return FUNCTION_KEY.toString();\n    }\n\n    return FUNCTION_ID;\n  })(FUNCTION)\n"), buildGeneratorPropertyMethodAssignmentWrapper = (0, 
    _template.default)("\n  (function (FUNCTION_KEY) {\n    function* FUNCTION_ID() {\n      return yield* FUNCTION_KEY.apply(this, arguments);\n    }\n\n    FUNCTION_ID.toString = function () {\n      return FUNCTION_KEY.toString();\n    };\n\n    return FUNCTION_ID;\n  })(FUNCTION)\n"), visitor = {
      "ReferencedIdentifier|BindingIdentifier"(path, state) {
        if (path.node.name !== state.name) return;
        path.scope.getBindingIdentifier(state.name) === state.outerDeclar && (state.selfReference = !0, 
        path.stop());
      }
    };
  },
  36: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(path, visitor, state) {
      path.traverse(visitor, Object.assign({}, handle, state, {
        memoiser: new AssignmentMemoiser
      }));
    };
    var t = function(obj) {
      if (obj && obj.__esModule) return obj;
      if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
        default: obj
      };
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) return cache.get(obj);
      var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
      }
      newObj.default = obj, cache && cache.set(obj, newObj);
      return newObj;
    }(__webpack_require__(0));
    function _getRequireWildcardCache() {
      if ("function" != typeof WeakMap) return null;
      var cache = new WeakMap;
      return _getRequireWildcardCache = function() {
        return cache;
      }, cache;
    }
    class AssignmentMemoiser {
      constructor() {
        this._map = new WeakMap;
      }
      has(key) {
        return this._map.has(key);
      }
      get(key) {
        if (!this.has(key)) return;
        const record = this._map.get(key), {value: value} = record;
        return record.count--, 0 === record.count ? t.assignmentExpression("=", value, key) : value;
      }
      set(key, value, count) {
        return this._map.set(key, {
          count: count,
          value: value
        });
      }
    }
    function toNonOptional(path, base) {
      const {node: node} = path;
      if (path.isOptionalMemberExpression()) return t.memberExpression(base, node.property, node.computed);
      if (path.isOptionalCallExpression()) {
        const callee = path.get("callee");
        if (path.node.optional && callee.isOptionalMemberExpression()) {
          const {object: object} = callee.node, context = path.scope.maybeGenerateMemoised(object) || object;
          return callee.get("object").replaceWith(t.assignmentExpression("=", context, object)), 
          t.callExpression(t.memberExpression(base, t.identifier("call")), [ context, ...node.arguments ]);
        }
        return t.callExpression(base, node.arguments);
      }
      return path.node;
    }
    const handle = {
      memoise() {},
      handle(member) {
        const {node: node, parent: parent, parentPath: parentPath} = member;
        if (member.isOptionalMemberExpression()) {
          if (function(path) {
            for (;path && !path.isProgram(); ) {
              const {parentPath: parentPath, container: container, listKey: listKey} = path, parentNode = parentPath.node;
              if (listKey) {
                if (container !== parentNode[listKey]) return !0;
              } else if (container !== parentNode) return !0;
              path = parentPath;
            }
            return !1;
          }(member)) return;
          const endPath = member.find(({node: node, parent: parent, parentPath: parentPath}) => parentPath.isOptionalMemberExpression() ? parent.optional || parent.object !== node : !parentPath.isOptionalCallExpression() || (node !== member.node && parent.optional || parent.callee !== node)), rootParentPath = endPath.parentPath;
          if (rootParentPath.isUpdateExpression({
            argument: node
          }) || rootParentPath.isAssignmentExpression({
            left: node
          })) throw member.buildCodeFrameError("can't handle assignment");
          const isDeleteOperation = rootParentPath.isUnaryExpression({
            operator: "delete"
          });
          if (isDeleteOperation && endPath.isOptionalMemberExpression() && endPath.get("property").isPrivateName()) throw member.buildCodeFrameError("can't delete a private class element");
          let startingOptional = member;
          for (;;) if (startingOptional.isOptionalMemberExpression()) {
            if (startingOptional.node.optional) break;
            startingOptional = startingOptional.get("object");
          } else {
            if (!startingOptional.isOptionalCallExpression()) throw new Error("Internal error: unexpected " + startingOptional.node.type);
            if (startingOptional.node.optional) break;
            startingOptional = startingOptional.get("callee");
          }
          const {scope: scope} = member, startingProp = startingOptional.isOptionalMemberExpression() ? "object" : "callee", startingNode = startingOptional.node[startingProp], baseNeedsMemoised = scope.maybeGenerateMemoised(startingNode), baseRef = null != baseNeedsMemoised ? baseNeedsMemoised : startingNode, parentIsOptionalCall = parentPath.isOptionalCallExpression({
            callee: node
          }), parentIsCall = parentPath.isCallExpression({
            callee: node
          });
          startingOptional.replaceWith(toNonOptional(startingOptional, baseRef)), parentIsOptionalCall ? parent.optional ? parentPath.replaceWith(this.optionalCall(member, parent.arguments)) : parentPath.replaceWith(this.call(member, parent.arguments)) : parentIsCall ? member.replaceWith(this.boundGet(member)) : member.replaceWith(this.get(member));
          let context, regular = member.node;
          for (let current = member; current !== endPath; ) {
            const {parentPath: parentPath} = current;
            if (parentPath === endPath && parentIsOptionalCall && parent.optional) {
              regular = parentPath.node;
              break;
            }
            regular = toNonOptional(parentPath, regular), current = parentPath;
          }
          const endParentPath = endPath.parentPath;
          if (t.isMemberExpression(regular) && endParentPath.isOptionalCallExpression({
            callee: endPath.node,
            optional: !0
          })) {
            const {object: object} = regular;
            context = member.scope.maybeGenerateMemoised(object), context && (regular.object = t.assignmentExpression("=", context, object));
          }
          let replacementPath = endPath;
          if (isDeleteOperation && (replacementPath = endParentPath, regular = endParentPath.node), 
          replacementPath.replaceWith(t.conditionalExpression(t.logicalExpression("||", t.binaryExpression("===", baseNeedsMemoised ? t.assignmentExpression("=", t.cloneNode(baseRef), t.cloneNode(startingNode)) : t.cloneNode(baseRef), t.nullLiteral()), t.binaryExpression("===", t.cloneNode(baseRef), scope.buildUndefinedNode())), isDeleteOperation ? t.booleanLiteral(!0) : scope.buildUndefinedNode(), regular)), 
          context) {
            const endParent = endParentPath.node;
            endParentPath.replaceWith(t.optionalCallExpression(t.optionalMemberExpression(endParent.callee, t.identifier("call"), !1, !0), [ t.cloneNode(context), ...endParent.arguments ], !1));
          }
        } else if (parentPath.isUpdateExpression({
          argument: node
        })) {
          if (this.simpleSet) return void member.replaceWith(this.simpleSet(member));
          const {operator: operator, prefix: prefix} = parent;
          this.memoise(member, 2);
          const value = t.binaryExpression(operator[0], t.unaryExpression("+", this.get(member)), t.numericLiteral(1));
          if (prefix) parentPath.replaceWith(this.set(member, value)); else {
            const {scope: scope} = member, ref = scope.generateUidIdentifierBasedOnNode(node);
            scope.push({
              id: ref
            }), value.left = t.assignmentExpression("=", t.cloneNode(ref), value.left), parentPath.replaceWith(t.sequenceExpression([ this.set(member, value), t.cloneNode(ref) ]));
          }
        } else {
          if (parentPath.isAssignmentExpression({
            left: node
          })) {
            if (this.simpleSet) return void member.replaceWith(this.simpleSet(member));
            const {operator: operator, right: right} = parent;
            let value = right;
            return "=" !== operator && (this.memoise(member, 2), value = t.binaryExpression(operator.slice(0, -1), this.get(member), value)), 
            void parentPath.replaceWith(this.set(member, value));
          }
          parentPath.isCallExpression({
            callee: node
          }) ? parentPath.replaceWith(this.call(member, parent.arguments)) : parentPath.isOptionalCallExpression({
            callee: node
          }) ? parentPath.replaceWith(this.optionalCall(member, parent.arguments)) : parentPath.isForXStatement({
            left: node
          }) || parentPath.isObjectProperty({
            value: node
          }) && parentPath.parentPath.isObjectPattern() || parentPath.isAssignmentPattern({
            left: node
          }) && parentPath.parentPath.isObjectProperty({
            value: parent
          }) && parentPath.parentPath.parentPath.isObjectPattern() || parentPath.isArrayPattern() || parentPath.isAssignmentPattern({
            left: node
          }) && parentPath.parentPath.isArrayPattern() || parentPath.isRestElement() ? member.replaceWith(this.destructureSet(member)) : member.replaceWith(this.get(member));
        }
      }
    };
  },
  37: function(module, exports) {
    var funcToString = Function.prototype.toString;
    module.exports = function(func) {
      if (null != func) {
        try {
          return funcToString.call(func);
        } catch (e) {}
        try {
          return func + "";
        } catch (e) {}
      }
      return "";
    };
  },
  39: function(module, exports) {
    module.exports = function(value, other) {
      return value === other || value != value && other != other;
    };
  },
  4: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.merge = function(a, b) {
      const {placeholderWhitelist: placeholderWhitelist = a.placeholderWhitelist, placeholderPattern: placeholderPattern = a.placeholderPattern, preserveComments: preserveComments = a.preserveComments, syntacticPlaceholders: syntacticPlaceholders = a.syntacticPlaceholders} = b;
      return {
        parser: Object.assign({}, a.parser, b.parser),
        placeholderWhitelist: placeholderWhitelist,
        placeholderPattern: placeholderPattern,
        preserveComments: preserveComments,
        syntacticPlaceholders: syntacticPlaceholders
      };
    }, exports.validate = function(opts) {
      if (null != opts && "object" != typeof opts) throw new Error("Unknown template options.");
      const _ref = opts || {}, {placeholderWhitelist: placeholderWhitelist, placeholderPattern: placeholderPattern, preserveComments: preserveComments, syntacticPlaceholders: syntacticPlaceholders} = _ref, parser = function(source, excluded) {
        if (null == source) return {};
        var key, i, target = {}, sourceKeys = Object.keys(source);
        for (i = 0; i < sourceKeys.length; i++) key = sourceKeys[i], excluded.indexOf(key) >= 0 || (target[key] = source[key]);
        return target;
      }(_ref, [ "placeholderWhitelist", "placeholderPattern", "preserveComments", "syntacticPlaceholders" ]);
      if (null != placeholderWhitelist && !(placeholderWhitelist instanceof Set)) throw new Error("'.placeholderWhitelist' must be a Set, null, or undefined");
      if (null != placeholderPattern && !(placeholderPattern instanceof RegExp) && !1 !== placeholderPattern) throw new Error("'.placeholderPattern' must be a RegExp, false, null, or undefined");
      if (null != preserveComments && "boolean" != typeof preserveComments) throw new Error("'.preserveComments' must be a boolean, null, or undefined");
      if (null != syntacticPlaceholders && "boolean" != typeof syntacticPlaceholders) throw new Error("'.syntacticPlaceholders' must be a boolean, null, or undefined");
      if (!0 === syntacticPlaceholders && (null != placeholderWhitelist || null != placeholderPattern)) throw new Error("'.placeholderWhitelist' and '.placeholderPattern' aren't compatible with '.syntacticPlaceholders: true'");
      return {
        parser: parser,
        placeholderWhitelist: placeholderWhitelist || void 0,
        placeholderPattern: null == placeholderPattern ? void 0 : placeholderPattern,
        preserveComments: null == preserveComments ? void 0 : preserveComments,
        syntacticPlaceholders: null == syntacticPlaceholders ? void 0 : syntacticPlaceholders
      };
    }, exports.normalizeReplacements = function(replacements) {
      if (Array.isArray(replacements)) return replacements.reduce((acc, replacement, i) => (acc["$" + i] = replacement, 
      acc), {});
      if ("object" == typeof replacements || null == replacements) return replacements || void 0;
      throw new Error("Template replacements must be an array, object, null, or undefined");
    };
  },
  40: function(module, exports, __webpack_require__) {
    var isFunction = __webpack_require__(12), isMasked = __webpack_require__(41), isObject = __webpack_require__(3), toSource = __webpack_require__(37), reIsHostCtor = /^\[object .+?Constructor\]$/, funcProto = Function.prototype, objectProto = Object.prototype, funcToString = funcProto.toString, hasOwnProperty = objectProto.hasOwnProperty, reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
    module.exports = function(value) {
      return !(!isObject(value) || isMasked(value)) && (isFunction(value) ? reIsNative : reIsHostCtor).test(toSource(value));
    };
  },
  41: function(module, exports, __webpack_require__) {
    var uid, coreJsData = __webpack_require__(42), maskSrcKey = (uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "")) ? "Symbol(src)_1." + uid : "";
    module.exports = function(func) {
      return !!maskSrcKey && maskSrcKey in func;
    };
  },
  42: function(module, exports, __webpack_require__) {
    var coreJsData = __webpack_require__(5)["__core-js_shared__"];
    module.exports = coreJsData;
  },
  43: function(module, exports) {
    module.exports = function(object, key) {
      return null == object ? void 0 : object[key];
    };
  },
  44: function(module, exports) {
    module.exports = function(value) {
      return "number" == typeof value && value > -1 && value % 1 == 0 && value <= 9007199254740991;
    };
  },
  45: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(exportDeclaration) {
      if (!exportDeclaration.isExportDeclaration()) throw new Error("Only export declarations can be splitted.");
      const isDefault = exportDeclaration.isExportDefaultDeclaration(), declaration = exportDeclaration.get("declaration"), isClassDeclaration = declaration.isClassDeclaration();
      if (isDefault) {
        const standaloneDeclaration = declaration.isFunctionDeclaration() || isClassDeclaration, scope = declaration.isScope() ? declaration.scope.parent : declaration.scope;
        let id = declaration.node.id, needBindingRegistration = !1;
        id || (needBindingRegistration = !0, id = scope.generateUidIdentifier("default"), 
        (standaloneDeclaration || declaration.isFunctionExpression() || declaration.isClassExpression()) && (declaration.node.id = t.cloneNode(id)));
        const updatedDeclaration = standaloneDeclaration ? declaration : t.variableDeclaration("var", [ t.variableDeclarator(t.cloneNode(id), declaration.node) ]), updatedExportDeclaration = t.exportNamedDeclaration(null, [ t.exportSpecifier(t.cloneNode(id), t.identifier("default")) ]);
        return exportDeclaration.insertAfter(updatedExportDeclaration), exportDeclaration.replaceWith(updatedDeclaration), 
        needBindingRegistration && scope.registerDeclaration(exportDeclaration), exportDeclaration;
      }
      if (exportDeclaration.get("specifiers").length > 0) throw new Error("It doesn't make sense to split exported specifiers.");
      const bindingIdentifiers = declaration.getOuterBindingIdentifiers(), specifiers = Object.keys(bindingIdentifiers).map(name => t.exportSpecifier(t.identifier(name), t.identifier(name))), aliasDeclar = t.exportNamedDeclaration(null, specifiers);
      return exportDeclaration.insertAfter(aliasDeclar), exportDeclaration.replaceWith(declaration.node), 
      exportDeclaration;
    };
    var t = function(obj) {
      if (obj && obj.__esModule) return obj;
      if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
        default: obj
      };
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) return cache.get(obj);
      var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
      }
      newObj.default = obj, cache && cache.set(obj, newObj);
      return newObj;
    }(__webpack_require__(0));
    function _getRequireWildcardCache() {
      if ("function" != typeof WeakMap) return null;
      var cache = new WeakMap;
      return _getRequireWildcardCache = function() {
        return cache;
      }, cache;
    }
  },
  46: function(module, exports) {
    module.exports = require("../lib/traverse");
  },
  47: function(module, exports) {
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    module.exports = function(value, length) {
      var type = typeof value;
      return !!(length = null == length ? 9007199254740991 : length) && ("number" == type || "symbol" != type && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
    };
  },
  48: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(pathOrNode) {
      const node = pathOrNode.node || pathOrNode;
      if ((({leadingComments: leadingComments}) => !!leadingComments && leadingComments.some(comment => /[@#]__PURE__/.test(comment.value)))(node)) return;
      t.addComment(node, "leading", "#__PURE__");
    };
    var t = function(obj) {
      if (obj && obj.__esModule) return obj;
      if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
        default: obj
      };
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) return cache.get(obj);
      var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
      }
      newObj.default = obj, cache && cache.set(obj, newObj);
      return newObj;
    }(__webpack_require__(0));
    function _getRequireWildcardCache() {
      if ("function" != typeof WeakMap) return null;
      var cache = new WeakMap;
      return _getRequireWildcardCache = function() {
        return cache;
      }, cache;
    }
  },
  495: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var _helperPluginUtils = __webpack_require__(1), _helperAnnotateAsPure = _interopRequireDefault(__webpack_require__(48)), _helperFunctionName = _interopRequireDefault(__webpack_require__(35)), _helperSplitExportDeclaration = _interopRequireDefault(__webpack_require__(45)), _core = __webpack_require__(2), _globals = _interopRequireDefault(__webpack_require__(184)), _transformClass = _interopRequireDefault(__webpack_require__(496));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    const getBuiltinClasses = category => Object.keys(_globals.default[category]).filter(name => /^[A-Z]/.test(name)), builtinClasses = new Set([ ...getBuiltinClasses("builtin"), ...getBuiltinClasses("browser") ]);
    var _default = (0, _helperPluginUtils.declare)((api, options) => {
      api.assertVersion(7);
      const {loose: loose} = options, VISITED = Symbol();
      return {
        name: "transform-classes",
        visitor: {
          ExportDefaultDeclaration(path) {
            path.get("declaration").isClassDeclaration() && (0, _helperSplitExportDeclaration.default)(path);
          },
          ClassDeclaration(path) {
            const {node: node} = path, ref = node.id || path.scope.generateUidIdentifier("class");
            path.replaceWith(_core.types.variableDeclaration("let", [ _core.types.variableDeclarator(ref, _core.types.toExpression(node)) ]));
          },
          ClassExpression(path, state) {
            const {node: node} = path;
            if (node[VISITED]) return;
            const inferred = (0, _helperFunctionName.default)(path);
            inferred && inferred !== node ? path.replaceWith(inferred) : (node[VISITED] = !0, 
            path.replaceWith((0, _transformClass.default)(path, state.file, builtinClasses, loose)), 
            path.isCallExpression() && ((0, _helperAnnotateAsPure.default)(path), path.get("callee").isArrowFunctionExpression() && path.get("callee").arrowFunctionToExpression()));
          }
        }
      };
    });
    exports.default = _default;
  },
  496: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(path, file, builtinClasses, isLoose) {
      const classState = {
        parent: void 0,
        scope: void 0,
        node: void 0,
        path: void 0,
        file: void 0,
        classId: void 0,
        classRef: void 0,
        superFnId: void 0,
        superName: void 0,
        superReturns: [],
        isDerived: !1,
        extendsNative: !1,
        construct: void 0,
        constructorBody: void 0,
        userConstructor: void 0,
        userConstructorPath: void 0,
        hasConstructor: !1,
        instancePropBody: [],
        instancePropRefs: {},
        staticPropBody: [],
        body: [],
        superThises: [],
        pushedConstructor: !1,
        pushedInherits: !1,
        protoAlias: null,
        isLoose: !1,
        hasInstanceDescriptors: !1,
        hasStaticDescriptors: !1,
        instanceMutatorMap: {},
        staticMutatorMap: {}
      }, setState = newState => {
        Object.assign(classState, newState);
      }, findThisesVisitor = _core.traverse.visitors.merge([ _helperReplaceSupers.environmentVisitor, {
        ThisExpression(path) {
          classState.superThises.push(path);
        }
      } ]);
      function buildBody() {
        if (function() {
          let hasConstructor = !1;
          const paths = classState.path.get("body.body");
          for (const path of paths) if (hasConstructor = path.equals("kind", "constructor"), 
          hasConstructor) break;
          if (hasConstructor) return;
          let params, body;
          if (classState.isDerived) {
            const constructor = _core.template.expression.ast`
        (function () {
          super(...arguments);
        })
      `;
            params = constructor.params, body = constructor.body;
          } else params = [], body = _core.types.blockStatement([]);
          classState.path.get("body").unshiftContainer("body", _core.types.classMethod("constructor", _core.types.identifier("constructor"), params, body));
        }(), function() {
          const classBodyPaths = classState.path.get("body.body");
          for (const path of classBodyPaths) {
            const node = path.node;
            if (path.isClassProperty()) throw path.buildCodeFrameError("Missing class properties transform.");
            if (node.decorators) throw path.buildCodeFrameError("Method has decorators, put the decorator plugin before the classes one.");
            if (_core.types.isClassMethod(node)) {
              const isConstructor = "constructor" === node.kind;
              new _helperReplaceSupers.default({
                methodPath: path,
                objectRef: classState.classRef,
                superRef: classState.superName,
                isLoose: classState.isLoose,
                file: classState.file
              }).replace();
              const superReturns = [];
              path.traverse(_core.traverse.visitors.merge([ _helperReplaceSupers.environmentVisitor, {
                ReturnStatement(path) {
                  path.getFunctionParent().isArrowFunctionExpression() || superReturns.push(path);
                }
              } ])), isConstructor ? pushConstructor(superReturns, node, path) : pushMethod(node, path);
            }
          }
        }(), function() {
          if (!classState.isDerived) return;
          const path = classState.userConstructorPath, body = path.get("body");
          path.traverse(findThisesVisitor);
          let thisRef = function() {
            const ref = path.scope.generateDeclaredUidIdentifier("this");
            return thisRef = () => _core.types.cloneNode(ref), ref;
          };
          for (const thisPath of classState.superThises) {
            const {node: node, parentPath: parentPath} = thisPath;
            parentPath.isMemberExpression({
              object: node
            }) ? thisPath.replaceWith(thisRef()) : thisPath.replaceWith(_core.types.callExpression(classState.file.addHelper("assertThisInitialized"), [ thisRef() ]));
          }
          const bareSupers = new Set;
          path.traverse(_core.traverse.visitors.merge([ _helperReplaceSupers.environmentVisitor, {
            Super(path) {
              const {node: node, parentPath: parentPath} = path;
              parentPath.isCallExpression({
                callee: node
              }) && bareSupers.add(parentPath);
            }
          } ]));
          let wrapReturn, guaranteedSuperBeforeFinish = !!bareSupers.size;
          for (const bareSuper of bareSupers) wrapSuperCall(bareSuper, classState.superName, thisRef, body), 
          guaranteedSuperBeforeFinish && bareSuper.find((function(parentPath) {
            return parentPath === path || (parentPath.isLoop() || parentPath.isConditional() || parentPath.isArrowFunctionExpression() ? (guaranteedSuperBeforeFinish = !1, 
            !0) : void 0);
          }));
          wrapReturn = classState.isLoose ? returnArg => {
            const thisExpr = _core.types.callExpression(classState.file.addHelper("assertThisInitialized"), [ thisRef() ]);
            return returnArg ? _core.types.logicalExpression("||", returnArg, thisExpr) : thisExpr;
          } : returnArg => _core.types.callExpression(classState.file.addHelper("possibleConstructorReturn"), [ thisRef() ].concat(returnArg || []));
          const bodyPaths = body.get("body");
          bodyPaths.length && bodyPaths.pop().isReturnStatement() || body.pushContainer("body", _core.types.returnStatement(guaranteedSuperBeforeFinish ? thisRef() : wrapReturn()));
          for (const returnPath of classState.superReturns) returnPath.get("argument").replaceWith(wrapReturn(returnPath.node.argument));
        }(), classState.userConstructor) {
          const {constructorBody: constructorBody, userConstructor: userConstructor, construct: construct} = classState;
          constructorBody.body = constructorBody.body.concat(userConstructor.body.body), _core.types.inherits(construct, userConstructor), 
          _core.types.inherits(constructorBody, userConstructor.body);
        }
        pushDescriptors();
      }
      function pushDescriptors() {
        pushInheritsToBody();
        const {body: body} = classState;
        let instanceProps, staticProps;
        if (classState.hasInstanceDescriptors && (instanceProps = defineMap.toClassObject(classState.instanceMutatorMap)), 
        classState.hasStaticDescriptors && (staticProps = defineMap.toClassObject(classState.staticMutatorMap)), 
        instanceProps || staticProps) {
          instanceProps && (instanceProps = defineMap.toComputedObjectFromClass(instanceProps)), 
          staticProps && (staticProps = defineMap.toComputedObjectFromClass(staticProps));
          let args = [ _core.types.cloneNode(classState.classRef), _core.types.nullLiteral(), _core.types.nullLiteral() ];
          instanceProps && (args[1] = instanceProps), staticProps && (args[2] = staticProps);
          let lastNonNullIndex = 0;
          for (let i = 0; i < args.length; i++) _core.types.isNullLiteral(args[i]) || (lastNonNullIndex = i);
          args = args.slice(0, lastNonNullIndex + 1), body.push(_core.types.expressionStatement(_core.types.callExpression(classState.file.addHelper("createClass"), args)));
        }
        setState({
          hasInstanceDescriptors: !1,
          hasStaticDescriptors: !1,
          instanceMutatorMap: {},
          staticMutatorMap: {}
        });
      }
      function wrapSuperCall(bareSuper, superRef, thisRef, body) {
        const bareSuperNode = bareSuper.node;
        let call;
        classState.isLoose ? (bareSuperNode.arguments.unshift(_core.types.thisExpression()), 
        2 === bareSuperNode.arguments.length && _core.types.isSpreadElement(bareSuperNode.arguments[1]) && _core.types.isIdentifier(bareSuperNode.arguments[1].argument, {
          name: "arguments"
        }) ? (bareSuperNode.arguments[1] = bareSuperNode.arguments[1].argument, bareSuperNode.callee = _core.types.memberExpression(_core.types.cloneNode(superRef), _core.types.identifier("apply"))) : bareSuperNode.callee = _core.types.memberExpression(_core.types.cloneNode(superRef), _core.types.identifier("call")), 
        call = _core.types.logicalExpression("||", bareSuperNode, _core.types.thisExpression())) : call = (0, 
        _helperOptimiseCallExpression.default)(_core.types.cloneNode(classState.superFnId), _core.types.thisExpression(), bareSuperNode.arguments), 
        bareSuper.parentPath.isExpressionStatement() && bareSuper.parentPath.container === body.node.body && body.node.body.length - 1 === bareSuper.parentPath.key ? (classState.superThises.length && (call = _core.types.assignmentExpression("=", thisRef(), call)), 
        bareSuper.parentPath.replaceWith(_core.types.returnStatement(call))) : bareSuper.replaceWith(_core.types.assignmentExpression("=", thisRef(), call));
      }
      function pushMethod(node, path) {
        const scope = path ? path.scope : classState.scope;
        "method" === node.kind && function(node, scope) {
          if (classState.isLoose && !node.decorators) {
            let {classRef: classRef} = classState;
            node.static || (!function() {
              if (null === classState.protoAlias) {
                setState({
                  protoAlias: classState.scope.generateUidIdentifier("proto")
                });
                const classProto = _core.types.memberExpression(classState.classRef, _core.types.identifier("prototype")), protoDeclaration = _core.types.variableDeclaration("var", [ _core.types.variableDeclarator(classState.protoAlias, classProto) ]);
                classState.body.push(protoDeclaration);
              }
            }(), classRef = classState.protoAlias);
            const methodName = _core.types.memberExpression(_core.types.cloneNode(classRef), node.key, node.computed || _core.types.isLiteral(node.key));
            let func = _core.types.functionExpression(null, node.params, node.body, node.generator, node.async);
            _core.types.inherits(func, node);
            const key = _core.types.toComputedKey(node, node.key);
            _core.types.isStringLiteral(key) && (func = (0, _helperFunctionName.default)({
              node: func,
              id: key,
              scope: scope
            }));
            const expr = _core.types.expressionStatement(_core.types.assignmentExpression("=", methodName, func));
            return _core.types.inheritsComments(expr, node), classState.body.push(expr), !0;
          }
          return !1;
        }(node, scope) || function(node, enumerable, kind = "value", scope) {
          let mutatorMap;
          node.static ? (setState({
            hasStaticDescriptors: !0
          }), mutatorMap = classState.staticMutatorMap) : (setState({
            hasInstanceDescriptors: !0
          }), mutatorMap = classState.instanceMutatorMap);
          const map = defineMap.push(mutatorMap, node, kind, classState.file, scope);
          enumerable && (map.enumerable = _core.types.booleanLiteral(!0));
        }(node, !1, null, scope);
      }
      function pushConstructor(superReturns, method, path) {
        path.scope.hasOwnBinding(classState.classRef.name) && path.scope.rename(classState.classRef.name), 
        setState({
          userConstructorPath: path,
          userConstructor: method,
          hasConstructor: !0,
          superReturns: superReturns
        });
        const {construct: construct} = classState;
        _core.types.inheritsComments(construct, method), construct.params = method.params, 
        _core.types.inherits(construct.body, method.body), construct.body.directives = method.body.directives, 
        function() {
          if (classState.pushedConstructor) return;
          classState.pushedConstructor = !0, (classState.hasInstanceDescriptors || classState.hasStaticDescriptors) && pushDescriptors();
          classState.body.push(classState.construct), pushInheritsToBody();
        }();
      }
      function pushInheritsToBody() {
        if (!classState.isDerived || classState.pushedInherits) return;
        const superFnId = path.scope.generateUidIdentifier("super");
        setState({
          pushedInherits: !0,
          superFnId: superFnId
        }), classState.isLoose || classState.body.unshift(_core.types.variableDeclaration("var", [ _core.types.variableDeclarator(superFnId, _core.types.callExpression((0, 
        _inlineCreateSuperHelpers.default)(classState.file), [ _core.types.cloneNode(classState.classRef) ])) ])), 
        classState.body.unshift(_core.types.expressionStatement(_core.types.callExpression(classState.file.addHelper(classState.isLoose ? "inheritsLoose" : "inherits"), [ _core.types.cloneNode(classState.classRef), _core.types.cloneNode(classState.superName) ])));
      }
      return function(path, file, builtinClasses, isLoose) {
        setState({
          parent: path.parent,
          scope: path.scope,
          node: path.node,
          path: path,
          file: file,
          isLoose: isLoose
        }), setState({
          classId: classState.node.id,
          classRef: classState.node.id ? _core.types.identifier(classState.node.id.name) : classState.scope.generateUidIdentifier("class"),
          superName: classState.node.superClass,
          isDerived: !!classState.node.superClass,
          constructorBody: _core.types.blockStatement([])
        }), setState({
          extendsNative: classState.isDerived && builtinClasses.has(classState.superName.name) && !classState.scope.hasBinding(classState.superName.name, !0)
        });
        const {classRef: classRef, node: node, constructorBody: constructorBody} = classState;
        setState({
          construct: buildConstructor(classRef, constructorBody, node)
        });
        let {body: body} = classState;
        const {closureParams: closureParams, closureArgs: closureArgs} = function() {
          const {superName: superName} = classState, closureParams = [], closureArgs = [];
          if (classState.isDerived) {
            let arg = _core.types.cloneNode(superName);
            classState.extendsNative && (arg = _core.types.callExpression(classState.file.addHelper("wrapNativeSuper"), [ arg ]), 
            (0, _helperAnnotateAsPure.default)(arg));
            const param = classState.scope.generateUidIdentifierBasedOnNode(superName);
            closureParams.push(param), closureArgs.push(arg), setState({
              superName: _core.types.cloneNode(param)
            });
          }
          return {
            closureParams: closureParams,
            closureArgs: closureArgs
          };
        }();
        buildBody(), classState.isLoose || constructorBody.body.unshift(_core.types.expressionStatement(_core.types.callExpression(classState.file.addHelper("classCallCheck"), [ _core.types.thisExpression(), _core.types.cloneNode(classState.classRef) ]))), 
        body = body.concat(classState.staticPropBody.map(fn => fn(_core.types.cloneNode(classState.classRef))));
        const isStrict = path.isInStrictMode();
        let constructorOnly = classState.classId && 1 === body.length;
        if (constructorOnly && !isStrict) for (const param of classState.construct.params) if (!_core.types.isIdentifier(param)) {
          constructorOnly = !1;
          break;
        }
        const directives = constructorOnly ? body[0].body.directives : [];
        if (isStrict || directives.push(_core.types.directive(_core.types.directiveLiteral("use strict"))), 
        constructorOnly) return _core.types.toExpression(body[0]);
        body.push(_core.types.returnStatement(_core.types.cloneNode(classState.classRef)));
        const container = _core.types.arrowFunctionExpression(closureParams, _core.types.blockStatement(body, directives));
        return _core.types.callExpression(container, closureArgs);
      }(path, file, builtinClasses, isLoose);
    };
    var _helperFunctionName = _interopRequireDefault(__webpack_require__(35)), _helperReplaceSupers = _interopRequireWildcard(__webpack_require__(30)), _helperOptimiseCallExpression = _interopRequireDefault(__webpack_require__(32)), defineMap = _interopRequireWildcard(__webpack_require__(497)), _core = __webpack_require__(2), _helperAnnotateAsPure = _interopRequireDefault(__webpack_require__(48)), _inlineCreateSuperHelpers = _interopRequireDefault(__webpack_require__(509));
    function _getRequireWildcardCache() {
      if ("function" != typeof WeakMap) return null;
      var cache = new WeakMap;
      return _getRequireWildcardCache = function() {
        return cache;
      }, cache;
    }
    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) return obj;
      if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
        default: obj
      };
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) return cache.get(obj);
      var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
      }
      return newObj.default = obj, cache && cache.set(obj, newObj), newObj;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function buildConstructor(classRef, constructorBody, node) {
      const func = _core.types.functionDeclaration(_core.types.cloneNode(classRef), [], constructorBody);
      return _core.types.inherits(func, node), func;
    }
  },
  497: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.push = function(mutatorMap, node, kind, file, scope) {
      const alias = t.toKeyAlias(node);
      let key, value, map = {};
      (0, _has.default)(mutatorMap, alias) && (map = mutatorMap[alias]);
      mutatorMap[alias] = map, map._inherits = map._inherits || [], map._inherits.push(node), 
      map._key = node.key, node.computed && (map._computed = !0);
      if (node.decorators) {
        const decorators = map.decorators = map.decorators || t.arrayExpression([]);
        decorators.elements = decorators.elements.concat(node.decorators.map(dec => dec.expression).reverse());
      }
      if (map.value || map.initializer) throw file.buildCodeFrameError(node, "Key conflict with sibling node");
      (t.isObjectProperty(node) || t.isObjectMethod(node) || t.isClassMethod(node)) && (key = t.toComputedKey(node, node.key));
      t.isProperty(node) ? value = node.value : (t.isObjectMethod(node) || t.isClassMethod(node)) && (value = t.functionExpression(null, node.params, node.body, node.generator, node.async), 
      value.returnType = node.returnType);
      const inheritedKind = function(node) {
        if ((t.isClassMethod(node) || t.isObjectMethod(node)) && ("get" === node.kind || "set" === node.kind)) return node.kind;
        return "value";
      }(node);
      kind && "value" === inheritedKind || (kind = inheritedKind);
      scope && t.isStringLiteral(key) && ("value" === kind || "initializer" === kind) && t.isFunctionExpression(value) && (value = (0, 
      _helperFunctionName.default)({
        id: key,
        node: value,
        scope: scope
      }));
      value && (t.inheritsComments(value, node), map[kind] = value);
      return map;
    }, exports.hasComputed = function(mutatorMap) {
      for (const key of Object.keys(mutatorMap)) if (mutatorMap[key]._computed) return !0;
      return !1;
    }, exports.toComputedObjectFromClass = function(obj) {
      const objExpr = t.arrayExpression([]);
      for (let i = 0; i < obj.properties.length; i++) {
        const prop = obj.properties[i], val = prop.value;
        val.properties.unshift(t.objectProperty(t.identifier("key"), t.toComputedKey(prop))), 
        objExpr.elements.push(val);
      }
      return objExpr;
    }, exports.toClassObject = toClassObject, exports.toDefineObject = function(mutatorMap) {
      return Object.keys(mutatorMap).forEach((function(key) {
        const map = mutatorMap[key];
        map.value && (map.writable = t.booleanLiteral(!0)), map.configurable = t.booleanLiteral(!0), 
        map.enumerable = t.booleanLiteral(!0);
      })), toClassObject(mutatorMap);
    };
    var _helperFunctionName = _interopRequireDefault(__webpack_require__(35)), _has = _interopRequireDefault(__webpack_require__(498)), t = function(obj) {
      if (obj && obj.__esModule) return obj;
      if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
        default: obj
      };
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) return cache.get(obj);
      var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
      }
      newObj.default = obj, cache && cache.set(obj, newObj);
      return newObj;
    }(__webpack_require__(0));
    function _getRequireWildcardCache() {
      if ("function" != typeof WeakMap) return null;
      var cache = new WeakMap;
      return _getRequireWildcardCache = function() {
        return cache;
      }, cache;
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function toClassObject(mutatorMap) {
      const objExpr = t.objectExpression([]);
      return Object.keys(mutatorMap).forEach((function(mutatorMapKey) {
        const map = mutatorMap[mutatorMapKey], mapNode = t.objectExpression([]), propNode = t.objectProperty(map._key, mapNode, map._computed);
        Object.keys(map).forEach((function(key) {
          const node = map[key];
          if ("_" === key[0]) return;
          const prop = t.objectProperty(t.identifier(key), node);
          t.inheritsComments(prop, node), t.removeComments(node), mapNode.properties.push(prop);
        })), objExpr.properties.push(propNode);
      })), objExpr;
    }
  },
  498: function(module, exports, __webpack_require__) {
    var baseHas = __webpack_require__(499), hasPath = __webpack_require__(500);
    module.exports = function(object, path) {
      return null != object && hasPath(object, path, baseHas);
    };
  },
  499: function(module, exports) {
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    module.exports = function(object, key) {
      return null != object && hasOwnProperty.call(object, key);
    };
  },
  5: function(module, exports, __webpack_require__) {
    var freeGlobal = __webpack_require__(13), freeSelf = "object" == typeof self && self && self.Object === Object && self, root = freeGlobal || freeSelf || Function("return this")();
    module.exports = root;
  },
  500: function(module, exports, __webpack_require__) {
    var castPath = __webpack_require__(501), isArguments = __webpack_require__(112), isArray = __webpack_require__(68), isIndex = __webpack_require__(47), isLength = __webpack_require__(44), toKey = __webpack_require__(508);
    module.exports = function(object, path, hasFunc) {
      for (var index = -1, length = (path = castPath(path, object)).length, result = !1; ++index < length; ) {
        var key = toKey(path[index]);
        if (!(result = null != object && hasFunc(object, key))) break;
        object = object[key];
      }
      return result || ++index != length ? result : !!(length = null == object ? 0 : object.length) && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
    };
  },
  501: function(module, exports, __webpack_require__) {
    var isArray = __webpack_require__(68), isKey = __webpack_require__(502), stringToPath = __webpack_require__(503), toString = __webpack_require__(506);
    module.exports = function(value, object) {
      return isArray(value) ? value : isKey(value, object) ? [ value ] : stringToPath(toString(value));
    };
  },
  502: function(module, exports, __webpack_require__) {
    var isArray = __webpack_require__(68), isSymbol = __webpack_require__(67), reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
    module.exports = function(value, object) {
      if (isArray(value)) return !1;
      var type = typeof value;
      return !("number" != type && "symbol" != type && "boolean" != type && null != value && !isSymbol(value)) || (reIsPlainProp.test(value) || !reIsDeepProp.test(value) || null != object && value in Object(object));
    };
  },
  503: function(module, exports, __webpack_require__) {
    var memoizeCapped = __webpack_require__(504), rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, reEscapeChar = /\\(\\)?/g, stringToPath = memoizeCapped((function(string) {
      var result = [];
      return 46 === string.charCodeAt(0) && result.push(""), string.replace(rePropName, (function(match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
      })), result;
    }));
    module.exports = stringToPath;
  },
  504: function(module, exports, __webpack_require__) {
    var memoize = __webpack_require__(505);
    module.exports = function(func) {
      var result = memoize(func, (function(key) {
        return 500 === cache.size && cache.clear(), key;
      })), cache = result.cache;
      return result;
    };
  },
  505: function(module, exports, __webpack_require__) {
    var MapCache = __webpack_require__(155);
    function memoize(func, resolver) {
      if ("function" != typeof func || null != resolver && "function" != typeof resolver) throw new TypeError("Expected a function");
      var memoized = function() {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key)) return cache.get(key);
        var result = func.apply(this, args);
        return memoized.cache = cache.set(key, result) || cache, result;
      };
      return memoized.cache = new (memoize.Cache || MapCache), memoized;
    }
    memoize.Cache = MapCache, module.exports = memoize;
  },
  506: function(module, exports, __webpack_require__) {
    var baseToString = __webpack_require__(507);
    module.exports = function(value) {
      return null == value ? "" : baseToString(value);
    };
  },
  507: function(module, exports, __webpack_require__) {
    var Symbol = __webpack_require__(6), arrayMap = __webpack_require__(66), isArray = __webpack_require__(68), isSymbol = __webpack_require__(67), symbolProto = Symbol ? Symbol.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
    module.exports = function baseToString(value) {
      if ("string" == typeof value) return value;
      if (isArray(value)) return arrayMap(value, baseToString) + "";
      if (isSymbol(value)) return symbolToString ? symbolToString.call(value) : "";
      var result = value + "";
      return "0" == result && 1 / value == -1 / 0 ? "-0" : result;
    };
  },
  508: function(module, exports, __webpack_require__) {
    var isSymbol = __webpack_require__(67);
    module.exports = function(value) {
      if ("string" == typeof value || isSymbol(value)) return value;
      var result = value + "";
      return "0" == result && 1 / value == -1 / 0 ? "-0" : result;
    };
  },
  509: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(file) {
      if (helperIDs.has(file)) return (_core.types.cloneNode || _core.types.clone)(helperIDs.get(file));
      try {
        return file.addHelper("createSuper");
      } catch (_unused) {}
      const id = file.scope.generateUidIdentifier("createSuper");
      helperIDs.set(file, id);
      const fn = helper({
        CREATE_SUPER: id,
        GET_PROTOTYPE_OF: file.addHelper("getPrototypeOf"),
        POSSIBLE_CONSTRUCTOR_RETURN: file.addHelper("possibleConstructorReturn")
      });
      return file.path.unshiftContainer("body", [ fn ]), file.scope.registerDeclaration(file.path.get("body.0")), 
      _core.types.cloneNode(id);
    };
    var _core = __webpack_require__(2);
    const helperIDs = new WeakMap;
    const helper = _core.template.statement`
  function CREATE_SUPER(Derived) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;

      // core-js@3
      if (Reflect.construct.sham) return false;

      // Proxy can't be polyfilled. Every browser implemented
      // proxies before or at the same time as Reflect.construct,
      // so if they support Proxy they also support Reflect.construct.
      if (typeof Proxy === "function") return true;

      // Since Reflect.construct can't be properly polyfilled, some
      // implementations (e.g. core-js@2) don't set the correct internal slots.
      // Those polyfills don't allow us to subclass built-ins, so we need to
      // use our fallback implementation.
      try {
        // If the internal slots aren't set, this throws an error similar to
        //   TypeError: this is not a Date object.
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    return function () {
      var Super = GET_PROTOTYPE_OF(Derived), result;
      if (isNativeReflectConstruct()) {
        // NOTE: This doesn't work if this.__proto__.constructor has been modified.
        var NewTarget = GET_PROTOTYPE_OF(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return POSSIBLE_CONSTRUCTOR_RETURN(this, result);
    }
  }
`;
  },
  51: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(node) {
      const params = node.params;
      for (let i = 0; i < params.length; i++) {
        const param = params[i];
        if (t.isAssignmentPattern(param) || t.isRestElement(param)) return i;
      }
      return params.length;
    };
    var t = function(obj) {
      if (obj && obj.__esModule) return obj;
      if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
        default: obj
      };
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) return cache.get(obj);
      var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
      }
      newObj.default = obj, cache && cache.set(obj, newObj);
      return newObj;
    }(__webpack_require__(0));
    function _getRequireWildcardCache() {
      if ("function" != typeof WeakMap) return null;
      var cache = new WeakMap;
      return _getRequireWildcardCache = function() {
        return cache;
      }, cache;
    }
  },
  6: function(module, exports, __webpack_require__) {
    var Symbol = __webpack_require__(5).Symbol;
    module.exports = Symbol;
  },
  66: function(module, exports) {
    module.exports = function(array, iteratee) {
      for (var index = -1, length = null == array ? 0 : array.length, result = Array(length); ++index < length; ) result[index] = iteratee(array[index], index, array);
      return result;
    };
  },
  67: function(module, exports, __webpack_require__) {
    var baseGetTag = __webpack_require__(7), isObjectLike = __webpack_require__(17);
    module.exports = function(value) {
      return "symbol" == typeof value || isObjectLike(value) && "[object Symbol]" == baseGetTag(value);
    };
  },
  68: function(module, exports) {
    var isArray = Array.isArray;
    module.exports = isArray;
  },
  69: function(module, exports, __webpack_require__) {
    var eq = __webpack_require__(39);
    module.exports = function(array, key) {
      for (var length = array.length; length--; ) if (eq(array[length][0], key)) return length;
      return -1;
    };
  },
  7: function(module, exports, __webpack_require__) {
    var Symbol = __webpack_require__(6), getRawTag = __webpack_require__(15), objectToString = __webpack_require__(16), symToStringTag = Symbol ? Symbol.toStringTag : void 0;
    module.exports = function(value) {
      return null == value ? void 0 === value ? "[object Undefined]" : "[object Null]" : symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    };
  },
  70: function(module, exports, __webpack_require__) {
    var nativeCreate = __webpack_require__(20)(Object, "create");
    module.exports = nativeCreate;
  },
  71: function(module, exports, __webpack_require__) {
    var isKeyable = __webpack_require__(164);
    module.exports = function(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data["string" == typeof key ? "string" : "hash"] : data.map;
    };
  },
  8: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(formatter, code, opts) {
      const {placeholderWhitelist: placeholderWhitelist, placeholderPattern: placeholderPattern, preserveComments: preserveComments, syntacticPlaceholders: syntacticPlaceholders} = opts, ast = function(code, parserOpts, syntacticPlaceholders) {
        const plugins = (parserOpts.plugins || []).slice();
        !1 !== syntacticPlaceholders && plugins.push("placeholders");
        parserOpts = Object.assign({
          allowReturnOutsideFunction: !0,
          allowSuperOutsideMethod: !0,
          sourceType: "module"
        }, parserOpts, {
          plugins: plugins
        });
        try {
          return (0, _parser.parse)(code, parserOpts);
        } catch (err) {
          const loc = err.loc;
          throw loc && (err.message += "\n" + (0, _codeFrame.codeFrameColumns)(code, {
            start: loc
          }), err.code = "BABEL_TEMPLATE_PARSE_ERROR"), err;
        }
      }(code, opts.parser, syntacticPlaceholders);
      t.removePropertiesDeep(ast, {
        preserveComments: preserveComments
      }), formatter.validate(ast);
      const syntactic = {
        placeholders: [],
        placeholderNames: new Set
      }, legacy = {
        placeholders: [],
        placeholderNames: new Set
      }, isLegacyRef = {
        value: void 0
      };
      return t.traverse(ast, placeholderVisitorHandler, {
        syntactic: syntactic,
        legacy: legacy,
        isLegacyRef: isLegacyRef,
        placeholderWhitelist: placeholderWhitelist,
        placeholderPattern: placeholderPattern,
        syntacticPlaceholders: syntacticPlaceholders
      }), Object.assign({
        ast: ast
      }, isLegacyRef.value ? legacy : syntactic);
    };
    var t = function(obj) {
      if (obj && obj.__esModule) return obj;
      if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
        default: obj
      };
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) return cache.get(obj);
      var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
      }
      newObj.default = obj, cache && cache.set(obj, newObj);
      return newObj;
    }(__webpack_require__(0)), _parser = __webpack_require__(22), _codeFrame = __webpack_require__(21);
    function _getRequireWildcardCache() {
      if ("function" != typeof WeakMap) return null;
      var cache = new WeakMap;
      return _getRequireWildcardCache = function() {
        return cache;
      }, cache;
    }
    const PATTERN = /^[_$A-Z0-9]+$/;
    function placeholderVisitorHandler(node, ancestors, state) {
      var _state$placeholderWhi;
      let name;
      if (t.isPlaceholder(node)) {
        if (!1 === state.syntacticPlaceholders) throw new Error("%%foo%%-style placeholders can't be used when '.syntacticPlaceholders' is false.");
        name = node.name.name, state.isLegacyRef.value = !1;
      } else {
        if (!1 === state.isLegacyRef.value || state.syntacticPlaceholders) return;
        if (t.isIdentifier(node) || t.isJSXIdentifier(node)) name = node.name, state.isLegacyRef.value = !0; else {
          if (!t.isStringLiteral(node)) return;
          name = node.value, state.isLegacyRef.value = !0;
        }
      }
      if (!state.isLegacyRef.value && (null != state.placeholderPattern || null != state.placeholderWhitelist)) throw new Error("'.placeholderWhitelist' and '.placeholderPattern' aren't compatible with '.syntacticPlaceholders: true'");
      if (state.isLegacyRef.value && (!1 === state.placeholderPattern || !(state.placeholderPattern || PATTERN).test(name)) && !(null == (_state$placeholderWhi = state.placeholderWhitelist) ? void 0 : _state$placeholderWhi.has(name))) return;
      ancestors = ancestors.slice();
      const {node: parent, key: key} = ancestors[ancestors.length - 1];
      let type;
      t.isStringLiteral(node) || t.isPlaceholder(node, {
        expectedNode: "StringLiteral"
      }) ? type = "string" : t.isNewExpression(parent) && "arguments" === key || t.isCallExpression(parent) && "arguments" === key || t.isFunction(parent) && "params" === key ? type = "param" : t.isExpressionStatement(parent) && !t.isPlaceholder(node) ? (type = "statement", 
      ancestors = ancestors.slice(0, -1)) : type = t.isStatement(node) && t.isPlaceholder(node) ? "statement" : "other";
      const {placeholders: placeholders, placeholderNames: placeholderNames} = state.isLegacyRef.value ? state.legacy : state.syntactic;
      placeholders.push({
        name: name,
        type: type,
        resolve: ast => function(ast, ancestors) {
          let parent = ast;
          for (let i = 0; i < ancestors.length - 1; i++) {
            const {key: key, index: index} = ancestors[i];
            parent = void 0 === index ? parent[key] : parent[key][index];
          }
          const {key: key, index: index} = ancestors[ancestors.length - 1];
          return {
            parent: parent,
            key: key,
            index: index
          };
        }(ast, ancestors),
        isDuplicate: placeholderNames.has(name)
      }), placeholderNames.add(name);
    }
  },
  9: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = function(metadata, replacements) {
      const ast = t.cloneNode(metadata.ast);
      replacements && (metadata.placeholders.forEach(placeholder => {
        if (!Object.prototype.hasOwnProperty.call(replacements, placeholder.name)) {
          const placeholderName = placeholder.name;
          throw new Error(`Error: No substitution given for "${placeholderName}". If this is not meant to be a\n            placeholder you may want to consider passing one of the following options to @babel/template:\n            - { placeholderPattern: false, placeholderWhitelist: new Set(['${placeholderName}'])}\n            - { placeholderPattern: /^${placeholderName}$/ }`);
        }
      }), Object.keys(replacements).forEach(key => {
        if (!metadata.placeholderNames.has(key)) throw new Error(`Unknown substitution "${key}" given`);
      }));
      return metadata.placeholders.slice().reverse().forEach(placeholder => {
        try {
          !function(placeholder, ast, replacement) {
            placeholder.isDuplicate && (Array.isArray(replacement) ? replacement = replacement.map(node => t.cloneNode(node)) : "object" == typeof replacement && (replacement = t.cloneNode(replacement)));
            const {parent: parent, key: key, index: index} = placeholder.resolve(ast);
            if ("string" === placeholder.type) {
              if ("string" == typeof replacement && (replacement = t.stringLiteral(replacement)), 
              !replacement || !t.isStringLiteral(replacement)) throw new Error("Expected string substitution");
            } else if ("statement" === placeholder.type) void 0 === index ? replacement ? Array.isArray(replacement) ? replacement = t.blockStatement(replacement) : "string" == typeof replacement ? replacement = t.expressionStatement(t.identifier(replacement)) : t.isStatement(replacement) || (replacement = t.expressionStatement(replacement)) : replacement = t.emptyStatement() : replacement && !Array.isArray(replacement) && ("string" == typeof replacement && (replacement = t.identifier(replacement)), 
            t.isStatement(replacement) || (replacement = t.expressionStatement(replacement))); else if ("param" === placeholder.type) {
              if ("string" == typeof replacement && (replacement = t.identifier(replacement)), 
              void 0 === index) throw new Error("Assertion failure.");
            } else if ("string" == typeof replacement && (replacement = t.identifier(replacement)), 
            Array.isArray(replacement)) throw new Error("Cannot replace single expression with an array.");
            if (void 0 === index) t.validate(parent, key, replacement), parent[key] = replacement; else {
              const items = parent[key].slice();
              "statement" === placeholder.type || "param" === placeholder.type ? null == replacement ? items.splice(index, 1) : Array.isArray(replacement) ? items.splice(index, 1, ...replacement) : items[index] = replacement : items[index] = replacement, 
              t.validate(parent, key, items), parent[key] = items;
            }
          }(placeholder, ast, replacements && replacements[placeholder.name] || null);
        } catch (e) {
          throw e.message = `@babel/template placeholder "${placeholder.name}": ${e.message}`, 
          e;
        }
      }), ast;
    };
    var t = function(obj) {
      if (obj && obj.__esModule) return obj;
      if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
        default: obj
      };
      var cache = _getRequireWildcardCache();
      if (cache && cache.has(obj)) return cache.get(obj);
      var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
      }
      newObj.default = obj, cache && cache.set(obj, newObj);
      return newObj;
    }(__webpack_require__(0));
    function _getRequireWildcardCache() {
      if ("function" != typeof WeakMap) return null;
      var cache = new WeakMap;
      return _getRequireWildcardCache = function() {
        return cache;
      }, cache;
    }
  }
});