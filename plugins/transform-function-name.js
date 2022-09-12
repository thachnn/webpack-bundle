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
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 519);
}({
  0: function(module, exports) {
    module.exports = require("../lib/types");
  },
  1: function(module, exports) {
    module.exports = require("../lib/plugin-utils");
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
  519: function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.default = void 0;
    var obj, _helperPluginUtils = __webpack_require__(1), _helperFunctionName = (obj = __webpack_require__(35)) && obj.__esModule ? obj : {
      default: obj
    };
    var _default = (0, _helperPluginUtils.declare)(api => (api.assertVersion(7), {
      name: "transform-function-name",
      visitor: {
        FunctionExpression: {
          exit(path) {
            if ("value" !== path.key && !path.parentPath.isObjectProperty()) {
              const replacement = (0, _helperFunctionName.default)(path);
              replacement && path.replaceWith(replacement);
            }
          }
        },
        ObjectProperty(path) {
          const value = path.get("value");
          if (value.isFunction()) {
            const newNode = (0, _helperFunctionName.default)(value);
            newNode && value.replaceWith(newNode);
          }
        }
      }
    }));
    exports.default = _default;
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