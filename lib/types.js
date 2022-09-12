(() => {
  var __webpack_modules__ = {
    3306: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.isIdentifierChar = isIdentifierChar, exports.isIdentifierName = function(name) {
        let isFirst = !0;
        for (let i = 0; i < name.length; i++) {
          let cp = name.charCodeAt(i);
          if (55296 == (64512 & cp) && i + 1 < name.length) {
            const trail = name.charCodeAt(++i);
            56320 == (64512 & trail) && (cp = 65536 + ((1023 & cp) << 10) + (1023 & trail));
          }
          if (isFirst) {
            if (isFirst = !1, !isIdentifierStart(cp)) return !1;
          } else if (!isIdentifierChar(cp)) return !1;
        }
        return !isFirst;
      }, exports.isIdentifierStart = isIdentifierStart;
      let nonASCIIidentifierStartChars = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-ࢎࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೝೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꟊꟐꟑꟓꟕ-ꟙꟲ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", nonASCIIidentifierChars = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࢘-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-ᫎᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿";
      const nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]"), nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
      nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;
      const astralIdentifierStartCodes = [ 0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 190, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1070, 4050, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 46, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 482, 44, 11, 6, 17, 0, 322, 29, 19, 43, 1269, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4152, 8, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938 ], astralIdentifierCodes = [ 509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 154, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 357, 0, 62, 13, 1495, 6, 110, 6, 6, 9, 4759, 9, 787719, 239 ];
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
    720: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), Object.defineProperty(exports, "isIdentifierChar", {
        enumerable: !0,
        get: function() {
          return _identifier.isIdentifierChar;
        }
      }), Object.defineProperty(exports, "isIdentifierName", {
        enumerable: !0,
        get: function() {
          return _identifier.isIdentifierName;
        }
      }), Object.defineProperty(exports, "isIdentifierStart", {
        enumerable: !0,
        get: function() {
          return _identifier.isIdentifierStart;
        }
      }), Object.defineProperty(exports, "isKeyword", {
        enumerable: !0,
        get: function() {
          return _keyword.isKeyword;
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
      });
      var _identifier = __webpack_require__(3306), _keyword = __webpack_require__(2887);
    },
    2887: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.isKeyword = function(word) {
        return keywords.has(word);
      }, exports.isReservedWord = isReservedWord, exports.isStrictBindOnlyReservedWord = isStrictBindOnlyReservedWord, 
      exports.isStrictBindReservedWord = function(word, inModule) {
        return isStrictReservedWord(word, inModule) || isStrictBindOnlyReservedWord(word);
      }, exports.isStrictReservedWord = isStrictReservedWord;
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
    245: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(node) {
        if (!(0, _isNode.default)(node)) {
          var _node$type;
          const type = null != (_node$type = null == node ? void 0 : node.type) ? _node$type : JSON.stringify(node);
          throw new TypeError(`Not a valid node of type "${type}"`);
        }
      };
      var _isNode = __webpack_require__(8523);
    },
    7133: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.assertAccessor = function(node, opts) {
        assert("Accessor", node, opts);
      }, exports.assertAnyTypeAnnotation = function(node, opts) {
        assert("AnyTypeAnnotation", node, opts);
      }, exports.assertArgumentPlaceholder = function(node, opts) {
        assert("ArgumentPlaceholder", node, opts);
      }, exports.assertArrayExpression = function(node, opts) {
        assert("ArrayExpression", node, opts);
      }, exports.assertArrayPattern = function(node, opts) {
        assert("ArrayPattern", node, opts);
      }, exports.assertArrayTypeAnnotation = function(node, opts) {
        assert("ArrayTypeAnnotation", node, opts);
      }, exports.assertArrowFunctionExpression = function(node, opts) {
        assert("ArrowFunctionExpression", node, opts);
      }, exports.assertAssignmentExpression = function(node, opts) {
        assert("AssignmentExpression", node, opts);
      }, exports.assertAssignmentPattern = function(node, opts) {
        assert("AssignmentPattern", node, opts);
      }, exports.assertAwaitExpression = function(node, opts) {
        assert("AwaitExpression", node, opts);
      }, exports.assertBigIntLiteral = function(node, opts) {
        assert("BigIntLiteral", node, opts);
      }, exports.assertBinary = function(node, opts) {
        assert("Binary", node, opts);
      }, exports.assertBinaryExpression = function(node, opts) {
        assert("BinaryExpression", node, opts);
      }, exports.assertBindExpression = function(node, opts) {
        assert("BindExpression", node, opts);
      }, exports.assertBlock = function(node, opts) {
        assert("Block", node, opts);
      }, exports.assertBlockParent = function(node, opts) {
        assert("BlockParent", node, opts);
      }, exports.assertBlockStatement = function(node, opts) {
        assert("BlockStatement", node, opts);
      }, exports.assertBooleanLiteral = function(node, opts) {
        assert("BooleanLiteral", node, opts);
      }, exports.assertBooleanLiteralTypeAnnotation = function(node, opts) {
        assert("BooleanLiteralTypeAnnotation", node, opts);
      }, exports.assertBooleanTypeAnnotation = function(node, opts) {
        assert("BooleanTypeAnnotation", node, opts);
      }, exports.assertBreakStatement = function(node, opts) {
        assert("BreakStatement", node, opts);
      }, exports.assertCallExpression = function(node, opts) {
        assert("CallExpression", node, opts);
      }, exports.assertCatchClause = function(node, opts) {
        assert("CatchClause", node, opts);
      }, exports.assertClass = function(node, opts) {
        assert("Class", node, opts);
      }, exports.assertClassAccessorProperty = function(node, opts) {
        assert("ClassAccessorProperty", node, opts);
      }, exports.assertClassBody = function(node, opts) {
        assert("ClassBody", node, opts);
      }, exports.assertClassDeclaration = function(node, opts) {
        assert("ClassDeclaration", node, opts);
      }, exports.assertClassExpression = function(node, opts) {
        assert("ClassExpression", node, opts);
      }, exports.assertClassImplements = function(node, opts) {
        assert("ClassImplements", node, opts);
      }, exports.assertClassMethod = function(node, opts) {
        assert("ClassMethod", node, opts);
      }, exports.assertClassPrivateMethod = function(node, opts) {
        assert("ClassPrivateMethod", node, opts);
      }, exports.assertClassPrivateProperty = function(node, opts) {
        assert("ClassPrivateProperty", node, opts);
      }, exports.assertClassProperty = function(node, opts) {
        assert("ClassProperty", node, opts);
      }, exports.assertCompletionStatement = function(node, opts) {
        assert("CompletionStatement", node, opts);
      }, exports.assertConditional = function(node, opts) {
        assert("Conditional", node, opts);
      }, exports.assertConditionalExpression = function(node, opts) {
        assert("ConditionalExpression", node, opts);
      }, exports.assertContinueStatement = function(node, opts) {
        assert("ContinueStatement", node, opts);
      }, exports.assertDebuggerStatement = function(node, opts) {
        assert("DebuggerStatement", node, opts);
      }, exports.assertDecimalLiteral = function(node, opts) {
        assert("DecimalLiteral", node, opts);
      }, exports.assertDeclaration = function(node, opts) {
        assert("Declaration", node, opts);
      }, exports.assertDeclareClass = function(node, opts) {
        assert("DeclareClass", node, opts);
      }, exports.assertDeclareExportAllDeclaration = function(node, opts) {
        assert("DeclareExportAllDeclaration", node, opts);
      }, exports.assertDeclareExportDeclaration = function(node, opts) {
        assert("DeclareExportDeclaration", node, opts);
      }, exports.assertDeclareFunction = function(node, opts) {
        assert("DeclareFunction", node, opts);
      }, exports.assertDeclareInterface = function(node, opts) {
        assert("DeclareInterface", node, opts);
      }, exports.assertDeclareModule = function(node, opts) {
        assert("DeclareModule", node, opts);
      }, exports.assertDeclareModuleExports = function(node, opts) {
        assert("DeclareModuleExports", node, opts);
      }, exports.assertDeclareOpaqueType = function(node, opts) {
        assert("DeclareOpaqueType", node, opts);
      }, exports.assertDeclareTypeAlias = function(node, opts) {
        assert("DeclareTypeAlias", node, opts);
      }, exports.assertDeclareVariable = function(node, opts) {
        assert("DeclareVariable", node, opts);
      }, exports.assertDeclaredPredicate = function(node, opts) {
        assert("DeclaredPredicate", node, opts);
      }, exports.assertDecorator = function(node, opts) {
        assert("Decorator", node, opts);
      }, exports.assertDirective = function(node, opts) {
        assert("Directive", node, opts);
      }, exports.assertDirectiveLiteral = function(node, opts) {
        assert("DirectiveLiteral", node, opts);
      }, exports.assertDoExpression = function(node, opts) {
        assert("DoExpression", node, opts);
      }, exports.assertDoWhileStatement = function(node, opts) {
        assert("DoWhileStatement", node, opts);
      }, exports.assertEmptyStatement = function(node, opts) {
        assert("EmptyStatement", node, opts);
      }, exports.assertEmptyTypeAnnotation = function(node, opts) {
        assert("EmptyTypeAnnotation", node, opts);
      }, exports.assertEnumBody = function(node, opts) {
        assert("EnumBody", node, opts);
      }, exports.assertEnumBooleanBody = function(node, opts) {
        assert("EnumBooleanBody", node, opts);
      }, exports.assertEnumBooleanMember = function(node, opts) {
        assert("EnumBooleanMember", node, opts);
      }, exports.assertEnumDeclaration = function(node, opts) {
        assert("EnumDeclaration", node, opts);
      }, exports.assertEnumDefaultedMember = function(node, opts) {
        assert("EnumDefaultedMember", node, opts);
      }, exports.assertEnumMember = function(node, opts) {
        assert("EnumMember", node, opts);
      }, exports.assertEnumNumberBody = function(node, opts) {
        assert("EnumNumberBody", node, opts);
      }, exports.assertEnumNumberMember = function(node, opts) {
        assert("EnumNumberMember", node, opts);
      }, exports.assertEnumStringBody = function(node, opts) {
        assert("EnumStringBody", node, opts);
      }, exports.assertEnumStringMember = function(node, opts) {
        assert("EnumStringMember", node, opts);
      }, exports.assertEnumSymbolBody = function(node, opts) {
        assert("EnumSymbolBody", node, opts);
      }, exports.assertExistsTypeAnnotation = function(node, opts) {
        assert("ExistsTypeAnnotation", node, opts);
      }, exports.assertExportAllDeclaration = function(node, opts) {
        assert("ExportAllDeclaration", node, opts);
      }, exports.assertExportDeclaration = function(node, opts) {
        assert("ExportDeclaration", node, opts);
      }, exports.assertExportDefaultDeclaration = function(node, opts) {
        assert("ExportDefaultDeclaration", node, opts);
      }, exports.assertExportDefaultSpecifier = function(node, opts) {
        assert("ExportDefaultSpecifier", node, opts);
      }, exports.assertExportNamedDeclaration = function(node, opts) {
        assert("ExportNamedDeclaration", node, opts);
      }, exports.assertExportNamespaceSpecifier = function(node, opts) {
        assert("ExportNamespaceSpecifier", node, opts);
      }, exports.assertExportSpecifier = function(node, opts) {
        assert("ExportSpecifier", node, opts);
      }, exports.assertExpression = function(node, opts) {
        assert("Expression", node, opts);
      }, exports.assertExpressionStatement = function(node, opts) {
        assert("ExpressionStatement", node, opts);
      }, exports.assertExpressionWrapper = function(node, opts) {
        assert("ExpressionWrapper", node, opts);
      }, exports.assertFile = function(node, opts) {
        assert("File", node, opts);
      }, exports.assertFlow = function(node, opts) {
        assert("Flow", node, opts);
      }, exports.assertFlowBaseAnnotation = function(node, opts) {
        assert("FlowBaseAnnotation", node, opts);
      }, exports.assertFlowDeclaration = function(node, opts) {
        assert("FlowDeclaration", node, opts);
      }, exports.assertFlowPredicate = function(node, opts) {
        assert("FlowPredicate", node, opts);
      }, exports.assertFlowType = function(node, opts) {
        assert("FlowType", node, opts);
      }, exports.assertFor = function(node, opts) {
        assert("For", node, opts);
      }, exports.assertForInStatement = function(node, opts) {
        assert("ForInStatement", node, opts);
      }, exports.assertForOfStatement = function(node, opts) {
        assert("ForOfStatement", node, opts);
      }, exports.assertForStatement = function(node, opts) {
        assert("ForStatement", node, opts);
      }, exports.assertForXStatement = function(node, opts) {
        assert("ForXStatement", node, opts);
      }, exports.assertFunction = function(node, opts) {
        assert("Function", node, opts);
      }, exports.assertFunctionDeclaration = function(node, opts) {
        assert("FunctionDeclaration", node, opts);
      }, exports.assertFunctionExpression = function(node, opts) {
        assert("FunctionExpression", node, opts);
      }, exports.assertFunctionParent = function(node, opts) {
        assert("FunctionParent", node, opts);
      }, exports.assertFunctionTypeAnnotation = function(node, opts) {
        assert("FunctionTypeAnnotation", node, opts);
      }, exports.assertFunctionTypeParam = function(node, opts) {
        assert("FunctionTypeParam", node, opts);
      }, exports.assertGenericTypeAnnotation = function(node, opts) {
        assert("GenericTypeAnnotation", node, opts);
      }, exports.assertIdentifier = function(node, opts) {
        assert("Identifier", node, opts);
      }, exports.assertIfStatement = function(node, opts) {
        assert("IfStatement", node, opts);
      }, exports.assertImmutable = function(node, opts) {
        assert("Immutable", node, opts);
      }, exports.assertImport = function(node, opts) {
        assert("Import", node, opts);
      }, exports.assertImportAttribute = function(node, opts) {
        assert("ImportAttribute", node, opts);
      }, exports.assertImportDeclaration = function(node, opts) {
        assert("ImportDeclaration", node, opts);
      }, exports.assertImportDefaultSpecifier = function(node, opts) {
        assert("ImportDefaultSpecifier", node, opts);
      }, exports.assertImportNamespaceSpecifier = function(node, opts) {
        assert("ImportNamespaceSpecifier", node, opts);
      }, exports.assertImportSpecifier = function(node, opts) {
        assert("ImportSpecifier", node, opts);
      }, exports.assertIndexedAccessType = function(node, opts) {
        assert("IndexedAccessType", node, opts);
      }, exports.assertInferredPredicate = function(node, opts) {
        assert("InferredPredicate", node, opts);
      }, exports.assertInterfaceDeclaration = function(node, opts) {
        assert("InterfaceDeclaration", node, opts);
      }, exports.assertInterfaceExtends = function(node, opts) {
        assert("InterfaceExtends", node, opts);
      }, exports.assertInterfaceTypeAnnotation = function(node, opts) {
        assert("InterfaceTypeAnnotation", node, opts);
      }, exports.assertInterpreterDirective = function(node, opts) {
        assert("InterpreterDirective", node, opts);
      }, exports.assertIntersectionTypeAnnotation = function(node, opts) {
        assert("IntersectionTypeAnnotation", node, opts);
      }, exports.assertJSX = function(node, opts) {
        assert("JSX", node, opts);
      }, exports.assertJSXAttribute = function(node, opts) {
        assert("JSXAttribute", node, opts);
      }, exports.assertJSXClosingElement = function(node, opts) {
        assert("JSXClosingElement", node, opts);
      }, exports.assertJSXClosingFragment = function(node, opts) {
        assert("JSXClosingFragment", node, opts);
      }, exports.assertJSXElement = function(node, opts) {
        assert("JSXElement", node, opts);
      }, exports.assertJSXEmptyExpression = function(node, opts) {
        assert("JSXEmptyExpression", node, opts);
      }, exports.assertJSXExpressionContainer = function(node, opts) {
        assert("JSXExpressionContainer", node, opts);
      }, exports.assertJSXFragment = function(node, opts) {
        assert("JSXFragment", node, opts);
      }, exports.assertJSXIdentifier = function(node, opts) {
        assert("JSXIdentifier", node, opts);
      }, exports.assertJSXMemberExpression = function(node, opts) {
        assert("JSXMemberExpression", node, opts);
      }, exports.assertJSXNamespacedName = function(node, opts) {
        assert("JSXNamespacedName", node, opts);
      }, exports.assertJSXOpeningElement = function(node, opts) {
        assert("JSXOpeningElement", node, opts);
      }, exports.assertJSXOpeningFragment = function(node, opts) {
        assert("JSXOpeningFragment", node, opts);
      }, exports.assertJSXSpreadAttribute = function(node, opts) {
        assert("JSXSpreadAttribute", node, opts);
      }, exports.assertJSXSpreadChild = function(node, opts) {
        assert("JSXSpreadChild", node, opts);
      }, exports.assertJSXText = function(node, opts) {
        assert("JSXText", node, opts);
      }, exports.assertLVal = function(node, opts) {
        assert("LVal", node, opts);
      }, exports.assertLabeledStatement = function(node, opts) {
        assert("LabeledStatement", node, opts);
      }, exports.assertLiteral = function(node, opts) {
        assert("Literal", node, opts);
      }, exports.assertLogicalExpression = function(node, opts) {
        assert("LogicalExpression", node, opts);
      }, exports.assertLoop = function(node, opts) {
        assert("Loop", node, opts);
      }, exports.assertMemberExpression = function(node, opts) {
        assert("MemberExpression", node, opts);
      }, exports.assertMetaProperty = function(node, opts) {
        assert("MetaProperty", node, opts);
      }, exports.assertMethod = function(node, opts) {
        assert("Method", node, opts);
      }, exports.assertMiscellaneous = function(node, opts) {
        assert("Miscellaneous", node, opts);
      }, exports.assertMixedTypeAnnotation = function(node, opts) {
        assert("MixedTypeAnnotation", node, opts);
      }, exports.assertModuleDeclaration = function(node, opts) {
        assert("ModuleDeclaration", node, opts);
      }, exports.assertModuleExpression = function(node, opts) {
        assert("ModuleExpression", node, opts);
      }, exports.assertModuleSpecifier = function(node, opts) {
        assert("ModuleSpecifier", node, opts);
      }, exports.assertNewExpression = function(node, opts) {
        assert("NewExpression", node, opts);
      }, exports.assertNoop = function(node, opts) {
        assert("Noop", node, opts);
      }, exports.assertNullLiteral = function(node, opts) {
        assert("NullLiteral", node, opts);
      }, exports.assertNullLiteralTypeAnnotation = function(node, opts) {
        assert("NullLiteralTypeAnnotation", node, opts);
      }, exports.assertNullableTypeAnnotation = function(node, opts) {
        assert("NullableTypeAnnotation", node, opts);
      }, exports.assertNumberLiteral = function(node, opts) {
        console.trace("The node type NumberLiteral has been renamed to NumericLiteral"), 
        assert("NumberLiteral", node, opts);
      }, exports.assertNumberLiteralTypeAnnotation = function(node, opts) {
        assert("NumberLiteralTypeAnnotation", node, opts);
      }, exports.assertNumberTypeAnnotation = function(node, opts) {
        assert("NumberTypeAnnotation", node, opts);
      }, exports.assertNumericLiteral = function(node, opts) {
        assert("NumericLiteral", node, opts);
      }, exports.assertObjectExpression = function(node, opts) {
        assert("ObjectExpression", node, opts);
      }, exports.assertObjectMember = function(node, opts) {
        assert("ObjectMember", node, opts);
      }, exports.assertObjectMethod = function(node, opts) {
        assert("ObjectMethod", node, opts);
      }, exports.assertObjectPattern = function(node, opts) {
        assert("ObjectPattern", node, opts);
      }, exports.assertObjectProperty = function(node, opts) {
        assert("ObjectProperty", node, opts);
      }, exports.assertObjectTypeAnnotation = function(node, opts) {
        assert("ObjectTypeAnnotation", node, opts);
      }, exports.assertObjectTypeCallProperty = function(node, opts) {
        assert("ObjectTypeCallProperty", node, opts);
      }, exports.assertObjectTypeIndexer = function(node, opts) {
        assert("ObjectTypeIndexer", node, opts);
      }, exports.assertObjectTypeInternalSlot = function(node, opts) {
        assert("ObjectTypeInternalSlot", node, opts);
      }, exports.assertObjectTypeProperty = function(node, opts) {
        assert("ObjectTypeProperty", node, opts);
      }, exports.assertObjectTypeSpreadProperty = function(node, opts) {
        assert("ObjectTypeSpreadProperty", node, opts);
      }, exports.assertOpaqueType = function(node, opts) {
        assert("OpaqueType", node, opts);
      }, exports.assertOptionalCallExpression = function(node, opts) {
        assert("OptionalCallExpression", node, opts);
      }, exports.assertOptionalIndexedAccessType = function(node, opts) {
        assert("OptionalIndexedAccessType", node, opts);
      }, exports.assertOptionalMemberExpression = function(node, opts) {
        assert("OptionalMemberExpression", node, opts);
      }, exports.assertParenthesizedExpression = function(node, opts) {
        assert("ParenthesizedExpression", node, opts);
      }, exports.assertPattern = function(node, opts) {
        assert("Pattern", node, opts);
      }, exports.assertPatternLike = function(node, opts) {
        assert("PatternLike", node, opts);
      }, exports.assertPipelineBareFunction = function(node, opts) {
        assert("PipelineBareFunction", node, opts);
      }, exports.assertPipelinePrimaryTopicReference = function(node, opts) {
        assert("PipelinePrimaryTopicReference", node, opts);
      }, exports.assertPipelineTopicExpression = function(node, opts) {
        assert("PipelineTopicExpression", node, opts);
      }, exports.assertPlaceholder = function(node, opts) {
        assert("Placeholder", node, opts);
      }, exports.assertPrivate = function(node, opts) {
        assert("Private", node, opts);
      }, exports.assertPrivateName = function(node, opts) {
        assert("PrivateName", node, opts);
      }, exports.assertProgram = function(node, opts) {
        assert("Program", node, opts);
      }, exports.assertProperty = function(node, opts) {
        assert("Property", node, opts);
      }, exports.assertPureish = function(node, opts) {
        assert("Pureish", node, opts);
      }, exports.assertQualifiedTypeIdentifier = function(node, opts) {
        assert("QualifiedTypeIdentifier", node, opts);
      }, exports.assertRecordExpression = function(node, opts) {
        assert("RecordExpression", node, opts);
      }, exports.assertRegExpLiteral = function(node, opts) {
        assert("RegExpLiteral", node, opts);
      }, exports.assertRegexLiteral = function(node, opts) {
        console.trace("The node type RegexLiteral has been renamed to RegExpLiteral"), assert("RegexLiteral", node, opts);
      }, exports.assertRestElement = function(node, opts) {
        assert("RestElement", node, opts);
      }, exports.assertRestProperty = function(node, opts) {
        console.trace("The node type RestProperty has been renamed to RestElement"), assert("RestProperty", node, opts);
      }, exports.assertReturnStatement = function(node, opts) {
        assert("ReturnStatement", node, opts);
      }, exports.assertScopable = function(node, opts) {
        assert("Scopable", node, opts);
      }, exports.assertSequenceExpression = function(node, opts) {
        assert("SequenceExpression", node, opts);
      }, exports.assertSpreadElement = function(node, opts) {
        assert("SpreadElement", node, opts);
      }, exports.assertSpreadProperty = function(node, opts) {
        console.trace("The node type SpreadProperty has been renamed to SpreadElement"), 
        assert("SpreadProperty", node, opts);
      }, exports.assertStandardized = function(node, opts) {
        assert("Standardized", node, opts);
      }, exports.assertStatement = function(node, opts) {
        assert("Statement", node, opts);
      }, exports.assertStaticBlock = function(node, opts) {
        assert("StaticBlock", node, opts);
      }, exports.assertStringLiteral = function(node, opts) {
        assert("StringLiteral", node, opts);
      }, exports.assertStringLiteralTypeAnnotation = function(node, opts) {
        assert("StringLiteralTypeAnnotation", node, opts);
      }, exports.assertStringTypeAnnotation = function(node, opts) {
        assert("StringTypeAnnotation", node, opts);
      }, exports.assertSuper = function(node, opts) {
        assert("Super", node, opts);
      }, exports.assertSwitchCase = function(node, opts) {
        assert("SwitchCase", node, opts);
      }, exports.assertSwitchStatement = function(node, opts) {
        assert("SwitchStatement", node, opts);
      }, exports.assertSymbolTypeAnnotation = function(node, opts) {
        assert("SymbolTypeAnnotation", node, opts);
      }, exports.assertTSAnyKeyword = function(node, opts) {
        assert("TSAnyKeyword", node, opts);
      }, exports.assertTSArrayType = function(node, opts) {
        assert("TSArrayType", node, opts);
      }, exports.assertTSAsExpression = function(node, opts) {
        assert("TSAsExpression", node, opts);
      }, exports.assertTSBaseType = function(node, opts) {
        assert("TSBaseType", node, opts);
      }, exports.assertTSBigIntKeyword = function(node, opts) {
        assert("TSBigIntKeyword", node, opts);
      }, exports.assertTSBooleanKeyword = function(node, opts) {
        assert("TSBooleanKeyword", node, opts);
      }, exports.assertTSCallSignatureDeclaration = function(node, opts) {
        assert("TSCallSignatureDeclaration", node, opts);
      }, exports.assertTSConditionalType = function(node, opts) {
        assert("TSConditionalType", node, opts);
      }, exports.assertTSConstructSignatureDeclaration = function(node, opts) {
        assert("TSConstructSignatureDeclaration", node, opts);
      }, exports.assertTSConstructorType = function(node, opts) {
        assert("TSConstructorType", node, opts);
      }, exports.assertTSDeclareFunction = function(node, opts) {
        assert("TSDeclareFunction", node, opts);
      }, exports.assertTSDeclareMethod = function(node, opts) {
        assert("TSDeclareMethod", node, opts);
      }, exports.assertTSEntityName = function(node, opts) {
        assert("TSEntityName", node, opts);
      }, exports.assertTSEnumDeclaration = function(node, opts) {
        assert("TSEnumDeclaration", node, opts);
      }, exports.assertTSEnumMember = function(node, opts) {
        assert("TSEnumMember", node, opts);
      }, exports.assertTSExportAssignment = function(node, opts) {
        assert("TSExportAssignment", node, opts);
      }, exports.assertTSExpressionWithTypeArguments = function(node, opts) {
        assert("TSExpressionWithTypeArguments", node, opts);
      }, exports.assertTSExternalModuleReference = function(node, opts) {
        assert("TSExternalModuleReference", node, opts);
      }, exports.assertTSFunctionType = function(node, opts) {
        assert("TSFunctionType", node, opts);
      }, exports.assertTSImportEqualsDeclaration = function(node, opts) {
        assert("TSImportEqualsDeclaration", node, opts);
      }, exports.assertTSImportType = function(node, opts) {
        assert("TSImportType", node, opts);
      }, exports.assertTSIndexSignature = function(node, opts) {
        assert("TSIndexSignature", node, opts);
      }, exports.assertTSIndexedAccessType = function(node, opts) {
        assert("TSIndexedAccessType", node, opts);
      }, exports.assertTSInferType = function(node, opts) {
        assert("TSInferType", node, opts);
      }, exports.assertTSInterfaceBody = function(node, opts) {
        assert("TSInterfaceBody", node, opts);
      }, exports.assertTSInterfaceDeclaration = function(node, opts) {
        assert("TSInterfaceDeclaration", node, opts);
      }, exports.assertTSIntersectionType = function(node, opts) {
        assert("TSIntersectionType", node, opts);
      }, exports.assertTSIntrinsicKeyword = function(node, opts) {
        assert("TSIntrinsicKeyword", node, opts);
      }, exports.assertTSLiteralType = function(node, opts) {
        assert("TSLiteralType", node, opts);
      }, exports.assertTSMappedType = function(node, opts) {
        assert("TSMappedType", node, opts);
      }, exports.assertTSMethodSignature = function(node, opts) {
        assert("TSMethodSignature", node, opts);
      }, exports.assertTSModuleBlock = function(node, opts) {
        assert("TSModuleBlock", node, opts);
      }, exports.assertTSModuleDeclaration = function(node, opts) {
        assert("TSModuleDeclaration", node, opts);
      }, exports.assertTSNamedTupleMember = function(node, opts) {
        assert("TSNamedTupleMember", node, opts);
      }, exports.assertTSNamespaceExportDeclaration = function(node, opts) {
        assert("TSNamespaceExportDeclaration", node, opts);
      }, exports.assertTSNeverKeyword = function(node, opts) {
        assert("TSNeverKeyword", node, opts);
      }, exports.assertTSNonNullExpression = function(node, opts) {
        assert("TSNonNullExpression", node, opts);
      }, exports.assertTSNullKeyword = function(node, opts) {
        assert("TSNullKeyword", node, opts);
      }, exports.assertTSNumberKeyword = function(node, opts) {
        assert("TSNumberKeyword", node, opts);
      }, exports.assertTSObjectKeyword = function(node, opts) {
        assert("TSObjectKeyword", node, opts);
      }, exports.assertTSOptionalType = function(node, opts) {
        assert("TSOptionalType", node, opts);
      }, exports.assertTSParameterProperty = function(node, opts) {
        assert("TSParameterProperty", node, opts);
      }, exports.assertTSParenthesizedType = function(node, opts) {
        assert("TSParenthesizedType", node, opts);
      }, exports.assertTSPropertySignature = function(node, opts) {
        assert("TSPropertySignature", node, opts);
      }, exports.assertTSQualifiedName = function(node, opts) {
        assert("TSQualifiedName", node, opts);
      }, exports.assertTSRestType = function(node, opts) {
        assert("TSRestType", node, opts);
      }, exports.assertTSStringKeyword = function(node, opts) {
        assert("TSStringKeyword", node, opts);
      }, exports.assertTSSymbolKeyword = function(node, opts) {
        assert("TSSymbolKeyword", node, opts);
      }, exports.assertTSThisType = function(node, opts) {
        assert("TSThisType", node, opts);
      }, exports.assertTSTupleType = function(node, opts) {
        assert("TSTupleType", node, opts);
      }, exports.assertTSType = function(node, opts) {
        assert("TSType", node, opts);
      }, exports.assertTSTypeAliasDeclaration = function(node, opts) {
        assert("TSTypeAliasDeclaration", node, opts);
      }, exports.assertTSTypeAnnotation = function(node, opts) {
        assert("TSTypeAnnotation", node, opts);
      }, exports.assertTSTypeAssertion = function(node, opts) {
        assert("TSTypeAssertion", node, opts);
      }, exports.assertTSTypeElement = function(node, opts) {
        assert("TSTypeElement", node, opts);
      }, exports.assertTSTypeLiteral = function(node, opts) {
        assert("TSTypeLiteral", node, opts);
      }, exports.assertTSTypeOperator = function(node, opts) {
        assert("TSTypeOperator", node, opts);
      }, exports.assertTSTypeParameter = function(node, opts) {
        assert("TSTypeParameter", node, opts);
      }, exports.assertTSTypeParameterDeclaration = function(node, opts) {
        assert("TSTypeParameterDeclaration", node, opts);
      }, exports.assertTSTypeParameterInstantiation = function(node, opts) {
        assert("TSTypeParameterInstantiation", node, opts);
      }, exports.assertTSTypePredicate = function(node, opts) {
        assert("TSTypePredicate", node, opts);
      }, exports.assertTSTypeQuery = function(node, opts) {
        assert("TSTypeQuery", node, opts);
      }, exports.assertTSTypeReference = function(node, opts) {
        assert("TSTypeReference", node, opts);
      }, exports.assertTSUndefinedKeyword = function(node, opts) {
        assert("TSUndefinedKeyword", node, opts);
      }, exports.assertTSUnionType = function(node, opts) {
        assert("TSUnionType", node, opts);
      }, exports.assertTSUnknownKeyword = function(node, opts) {
        assert("TSUnknownKeyword", node, opts);
      }, exports.assertTSVoidKeyword = function(node, opts) {
        assert("TSVoidKeyword", node, opts);
      }, exports.assertTaggedTemplateExpression = function(node, opts) {
        assert("TaggedTemplateExpression", node, opts);
      }, exports.assertTemplateElement = function(node, opts) {
        assert("TemplateElement", node, opts);
      }, exports.assertTemplateLiteral = function(node, opts) {
        assert("TemplateLiteral", node, opts);
      }, exports.assertTerminatorless = function(node, opts) {
        assert("Terminatorless", node, opts);
      }, exports.assertThisExpression = function(node, opts) {
        assert("ThisExpression", node, opts);
      }, exports.assertThisTypeAnnotation = function(node, opts) {
        assert("ThisTypeAnnotation", node, opts);
      }, exports.assertThrowStatement = function(node, opts) {
        assert("ThrowStatement", node, opts);
      }, exports.assertTopicReference = function(node, opts) {
        assert("TopicReference", node, opts);
      }, exports.assertTryStatement = function(node, opts) {
        assert("TryStatement", node, opts);
      }, exports.assertTupleExpression = function(node, opts) {
        assert("TupleExpression", node, opts);
      }, exports.assertTupleTypeAnnotation = function(node, opts) {
        assert("TupleTypeAnnotation", node, opts);
      }, exports.assertTypeAlias = function(node, opts) {
        assert("TypeAlias", node, opts);
      }, exports.assertTypeAnnotation = function(node, opts) {
        assert("TypeAnnotation", node, opts);
      }, exports.assertTypeCastExpression = function(node, opts) {
        assert("TypeCastExpression", node, opts);
      }, exports.assertTypeParameter = function(node, opts) {
        assert("TypeParameter", node, opts);
      }, exports.assertTypeParameterDeclaration = function(node, opts) {
        assert("TypeParameterDeclaration", node, opts);
      }, exports.assertTypeParameterInstantiation = function(node, opts) {
        assert("TypeParameterInstantiation", node, opts);
      }, exports.assertTypeScript = function(node, opts) {
        assert("TypeScript", node, opts);
      }, exports.assertTypeofTypeAnnotation = function(node, opts) {
        assert("TypeofTypeAnnotation", node, opts);
      }, exports.assertUnaryExpression = function(node, opts) {
        assert("UnaryExpression", node, opts);
      }, exports.assertUnaryLike = function(node, opts) {
        assert("UnaryLike", node, opts);
      }, exports.assertUnionTypeAnnotation = function(node, opts) {
        assert("UnionTypeAnnotation", node, opts);
      }, exports.assertUpdateExpression = function(node, opts) {
        assert("UpdateExpression", node, opts);
      }, exports.assertUserWhitespacable = function(node, opts) {
        assert("UserWhitespacable", node, opts);
      }, exports.assertV8IntrinsicIdentifier = function(node, opts) {
        assert("V8IntrinsicIdentifier", node, opts);
      }, exports.assertVariableDeclaration = function(node, opts) {
        assert("VariableDeclaration", node, opts);
      }, exports.assertVariableDeclarator = function(node, opts) {
        assert("VariableDeclarator", node, opts);
      }, exports.assertVariance = function(node, opts) {
        assert("Variance", node, opts);
      }, exports.assertVoidTypeAnnotation = function(node, opts) {
        assert("VoidTypeAnnotation", node, opts);
      }, exports.assertWhile = function(node, opts) {
        assert("While", node, opts);
      }, exports.assertWhileStatement = function(node, opts) {
        assert("WhileStatement", node, opts);
      }, exports.assertWithStatement = function(node, opts) {
        assert("WithStatement", node, opts);
      }, exports.assertYieldExpression = function(node, opts) {
        assert("YieldExpression", node, opts);
      };
      var _is = __webpack_require__(7275);
      function assert(type, node, opts) {
        if (!(0, _is.default)(type, node, opts)) throw new Error(`Expected type "${type}" with option ${JSON.stringify(opts)}, but instead got "${node.type}".`);
      }
    },
    1585: () => {},
    4745: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function() {
        const type = this, keys = _definitions.BUILDER_KEYS[type], countArgs = arguments.length;
        if (countArgs > keys.length) throw new Error(`${type}: Too many arguments passed. Received ${countArgs} but can receive no more than ${keys.length}`);
        const node = {
          type
        };
        for (let i = 0; i < keys.length; ++i) {
          const key = keys[i], field = _definitions.NODE_FIELDS[type][key];
          let arg;
          i < countArgs && (arg = arguments[i]), void 0 === arg && (arg = Array.isArray(field.default) ? [] : field.default), 
          node[key] = arg;
        }
        for (const key in node) (0, _validate.default)(node, key, node[key]);
        return node;
      };
      var _definitions = __webpack_require__(6507), _validate = __webpack_require__(3804);
    },
    9983: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(types) {
        const flattened = (0, _removeTypeDuplicates.default)(types);
        return 1 === flattened.length ? flattened[0] : (0, _generated.unionTypeAnnotation)(flattened);
      };
      var _generated = __webpack_require__(4391), _removeTypeDuplicates = __webpack_require__(7321);
    },
    949: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      var _generated = __webpack_require__(4391), _default = function(type) {
        switch (type) {
         case "string":
          return (0, _generated.stringTypeAnnotation)();

         case "number":
          return (0, _generated.numberTypeAnnotation)();

         case "undefined":
          return (0, _generated.voidTypeAnnotation)();

         case "boolean":
          return (0, _generated.booleanTypeAnnotation)();

         case "function":
          return (0, _generated.genericTypeAnnotation)((0, _generated.identifier)("Function"));

         case "object":
          return (0, _generated.genericTypeAnnotation)((0, _generated.identifier)("Object"));

         case "symbol":
          return (0, _generated.genericTypeAnnotation)((0, _generated.identifier)("Symbol"));

         case "bigint":
          return (0, _generated.anyTypeAnnotation)();
        }
        throw new Error("Invalid typeof value: " + type);
      };
      exports.default = _default;
    },
    4391: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.anyTypeAnnotation = function() {
        return _builder.default.apply("AnyTypeAnnotation", arguments);
      }, exports.argumentPlaceholder = function() {
        return _builder.default.apply("ArgumentPlaceholder", arguments);
      }, exports.arrayExpression = function(elements) {
        return _builder.default.apply("ArrayExpression", arguments);
      }, exports.arrayPattern = function(elements) {
        return _builder.default.apply("ArrayPattern", arguments);
      }, exports.arrayTypeAnnotation = function(elementType) {
        return _builder.default.apply("ArrayTypeAnnotation", arguments);
      }, exports.arrowFunctionExpression = function(params, body, async) {
        return _builder.default.apply("ArrowFunctionExpression", arguments);
      }, exports.assignmentExpression = function(operator, left, right) {
        return _builder.default.apply("AssignmentExpression", arguments);
      }, exports.assignmentPattern = function(left, right) {
        return _builder.default.apply("AssignmentPattern", arguments);
      }, exports.awaitExpression = function(argument) {
        return _builder.default.apply("AwaitExpression", arguments);
      }, exports.bigIntLiteral = function(value) {
        return _builder.default.apply("BigIntLiteral", arguments);
      }, exports.binaryExpression = function(operator, left, right) {
        return _builder.default.apply("BinaryExpression", arguments);
      }, exports.bindExpression = function(object, callee) {
        return _builder.default.apply("BindExpression", arguments);
      }, exports.blockStatement = function(body, directives) {
        return _builder.default.apply("BlockStatement", arguments);
      }, exports.booleanLiteral = function(value) {
        return _builder.default.apply("BooleanLiteral", arguments);
      }, exports.booleanLiteralTypeAnnotation = function(value) {
        return _builder.default.apply("BooleanLiteralTypeAnnotation", arguments);
      }, exports.booleanTypeAnnotation = function() {
        return _builder.default.apply("BooleanTypeAnnotation", arguments);
      }, exports.breakStatement = function(label) {
        return _builder.default.apply("BreakStatement", arguments);
      }, exports.callExpression = function(callee, _arguments) {
        return _builder.default.apply("CallExpression", arguments);
      }, exports.catchClause = function(param, body) {
        return _builder.default.apply("CatchClause", arguments);
      }, exports.classAccessorProperty = function(key, value, typeAnnotation, decorators, computed, _static) {
        return _builder.default.apply("ClassAccessorProperty", arguments);
      }, exports.classBody = function(body) {
        return _builder.default.apply("ClassBody", arguments);
      }, exports.classDeclaration = function(id, superClass, body, decorators) {
        return _builder.default.apply("ClassDeclaration", arguments);
      }, exports.classExpression = function(id, superClass, body, decorators) {
        return _builder.default.apply("ClassExpression", arguments);
      }, exports.classImplements = function(id, typeParameters) {
        return _builder.default.apply("ClassImplements", arguments);
      }, exports.classMethod = function(kind, key, params, body, computed, _static, generator, async) {
        return _builder.default.apply("ClassMethod", arguments);
      }, exports.classPrivateMethod = function(kind, key, params, body, _static) {
        return _builder.default.apply("ClassPrivateMethod", arguments);
      }, exports.classPrivateProperty = function(key, value, decorators, _static) {
        return _builder.default.apply("ClassPrivateProperty", arguments);
      }, exports.classProperty = function(key, value, typeAnnotation, decorators, computed, _static) {
        return _builder.default.apply("ClassProperty", arguments);
      }, exports.conditionalExpression = function(test, consequent, alternate) {
        return _builder.default.apply("ConditionalExpression", arguments);
      }, exports.continueStatement = function(label) {
        return _builder.default.apply("ContinueStatement", arguments);
      }, exports.debuggerStatement = function() {
        return _builder.default.apply("DebuggerStatement", arguments);
      }, exports.decimalLiteral = function(value) {
        return _builder.default.apply("DecimalLiteral", arguments);
      }, exports.declareClass = function(id, typeParameters, _extends, body) {
        return _builder.default.apply("DeclareClass", arguments);
      }, exports.declareExportAllDeclaration = function(source) {
        return _builder.default.apply("DeclareExportAllDeclaration", arguments);
      }, exports.declareExportDeclaration = function(declaration, specifiers, source) {
        return _builder.default.apply("DeclareExportDeclaration", arguments);
      }, exports.declareFunction = function(id) {
        return _builder.default.apply("DeclareFunction", arguments);
      }, exports.declareInterface = function(id, typeParameters, _extends, body) {
        return _builder.default.apply("DeclareInterface", arguments);
      }, exports.declareModule = function(id, body, kind) {
        return _builder.default.apply("DeclareModule", arguments);
      }, exports.declareModuleExports = function(typeAnnotation) {
        return _builder.default.apply("DeclareModuleExports", arguments);
      }, exports.declareOpaqueType = function(id, typeParameters, supertype) {
        return _builder.default.apply("DeclareOpaqueType", arguments);
      }, exports.declareTypeAlias = function(id, typeParameters, right) {
        return _builder.default.apply("DeclareTypeAlias", arguments);
      }, exports.declareVariable = function(id) {
        return _builder.default.apply("DeclareVariable", arguments);
      }, exports.declaredPredicate = function(value) {
        return _builder.default.apply("DeclaredPredicate", arguments);
      }, exports.decorator = function(expression) {
        return _builder.default.apply("Decorator", arguments);
      }, exports.directive = function(value) {
        return _builder.default.apply("Directive", arguments);
      }, exports.directiveLiteral = function(value) {
        return _builder.default.apply("DirectiveLiteral", arguments);
      }, exports.doExpression = function(body, async) {
        return _builder.default.apply("DoExpression", arguments);
      }, exports.doWhileStatement = function(test, body) {
        return _builder.default.apply("DoWhileStatement", arguments);
      }, exports.emptyStatement = function() {
        return _builder.default.apply("EmptyStatement", arguments);
      }, exports.emptyTypeAnnotation = function() {
        return _builder.default.apply("EmptyTypeAnnotation", arguments);
      }, exports.enumBooleanBody = function(members) {
        return _builder.default.apply("EnumBooleanBody", arguments);
      }, exports.enumBooleanMember = function(id) {
        return _builder.default.apply("EnumBooleanMember", arguments);
      }, exports.enumDeclaration = function(id, body) {
        return _builder.default.apply("EnumDeclaration", arguments);
      }, exports.enumDefaultedMember = function(id) {
        return _builder.default.apply("EnumDefaultedMember", arguments);
      }, exports.enumNumberBody = function(members) {
        return _builder.default.apply("EnumNumberBody", arguments);
      }, exports.enumNumberMember = function(id, init) {
        return _builder.default.apply("EnumNumberMember", arguments);
      }, exports.enumStringBody = function(members) {
        return _builder.default.apply("EnumStringBody", arguments);
      }, exports.enumStringMember = function(id, init) {
        return _builder.default.apply("EnumStringMember", arguments);
      }, exports.enumSymbolBody = function(members) {
        return _builder.default.apply("EnumSymbolBody", arguments);
      }, exports.existsTypeAnnotation = function() {
        return _builder.default.apply("ExistsTypeAnnotation", arguments);
      }, exports.exportAllDeclaration = function(source) {
        return _builder.default.apply("ExportAllDeclaration", arguments);
      }, exports.exportDefaultDeclaration = function(declaration) {
        return _builder.default.apply("ExportDefaultDeclaration", arguments);
      }, exports.exportDefaultSpecifier = function(exported) {
        return _builder.default.apply("ExportDefaultSpecifier", arguments);
      }, exports.exportNamedDeclaration = function(declaration, specifiers, source) {
        return _builder.default.apply("ExportNamedDeclaration", arguments);
      }, exports.exportNamespaceSpecifier = function(exported) {
        return _builder.default.apply("ExportNamespaceSpecifier", arguments);
      }, exports.exportSpecifier = function(local, exported) {
        return _builder.default.apply("ExportSpecifier", arguments);
      }, exports.expressionStatement = function(expression) {
        return _builder.default.apply("ExpressionStatement", arguments);
      }, exports.file = function(program, comments, tokens) {
        return _builder.default.apply("File", arguments);
      }, exports.forInStatement = function(left, right, body) {
        return _builder.default.apply("ForInStatement", arguments);
      }, exports.forOfStatement = function(left, right, body, _await) {
        return _builder.default.apply("ForOfStatement", arguments);
      }, exports.forStatement = function(init, test, update, body) {
        return _builder.default.apply("ForStatement", arguments);
      }, exports.functionDeclaration = function(id, params, body, generator, async) {
        return _builder.default.apply("FunctionDeclaration", arguments);
      }, exports.functionExpression = function(id, params, body, generator, async) {
        return _builder.default.apply("FunctionExpression", arguments);
      }, exports.functionTypeAnnotation = function(typeParameters, params, rest, returnType) {
        return _builder.default.apply("FunctionTypeAnnotation", arguments);
      }, exports.functionTypeParam = function(name, typeAnnotation) {
        return _builder.default.apply("FunctionTypeParam", arguments);
      }, exports.genericTypeAnnotation = function(id, typeParameters) {
        return _builder.default.apply("GenericTypeAnnotation", arguments);
      }, exports.identifier = function(name) {
        return _builder.default.apply("Identifier", arguments);
      }, exports.ifStatement = function(test, consequent, alternate) {
        return _builder.default.apply("IfStatement", arguments);
      }, exports.import = function() {
        return _builder.default.apply("Import", arguments);
      }, exports.importAttribute = function(key, value) {
        return _builder.default.apply("ImportAttribute", arguments);
      }, exports.importDeclaration = function(specifiers, source) {
        return _builder.default.apply("ImportDeclaration", arguments);
      }, exports.importDefaultSpecifier = function(local) {
        return _builder.default.apply("ImportDefaultSpecifier", arguments);
      }, exports.importNamespaceSpecifier = function(local) {
        return _builder.default.apply("ImportNamespaceSpecifier", arguments);
      }, exports.importSpecifier = function(local, imported) {
        return _builder.default.apply("ImportSpecifier", arguments);
      }, exports.indexedAccessType = function(objectType, indexType) {
        return _builder.default.apply("IndexedAccessType", arguments);
      }, exports.inferredPredicate = function() {
        return _builder.default.apply("InferredPredicate", arguments);
      }, exports.interfaceDeclaration = function(id, typeParameters, _extends, body) {
        return _builder.default.apply("InterfaceDeclaration", arguments);
      }, exports.interfaceExtends = function(id, typeParameters) {
        return _builder.default.apply("InterfaceExtends", arguments);
      }, exports.interfaceTypeAnnotation = function(_extends, body) {
        return _builder.default.apply("InterfaceTypeAnnotation", arguments);
      }, exports.interpreterDirective = function(value) {
        return _builder.default.apply("InterpreterDirective", arguments);
      }, exports.intersectionTypeAnnotation = function(types) {
        return _builder.default.apply("IntersectionTypeAnnotation", arguments);
      }, exports.jSXAttribute = exports.jsxAttribute = function(name, value) {
        return _builder.default.apply("JSXAttribute", arguments);
      }, exports.jSXClosingElement = exports.jsxClosingElement = function(name) {
        return _builder.default.apply("JSXClosingElement", arguments);
      }, exports.jSXClosingFragment = exports.jsxClosingFragment = function() {
        return _builder.default.apply("JSXClosingFragment", arguments);
      }, exports.jSXElement = exports.jsxElement = function(openingElement, closingElement, children, selfClosing) {
        return _builder.default.apply("JSXElement", arguments);
      }, exports.jSXEmptyExpression = exports.jsxEmptyExpression = function() {
        return _builder.default.apply("JSXEmptyExpression", arguments);
      }, exports.jSXExpressionContainer = exports.jsxExpressionContainer = function(expression) {
        return _builder.default.apply("JSXExpressionContainer", arguments);
      }, exports.jSXFragment = exports.jsxFragment = function(openingFragment, closingFragment, children) {
        return _builder.default.apply("JSXFragment", arguments);
      }, exports.jSXIdentifier = exports.jsxIdentifier = function(name) {
        return _builder.default.apply("JSXIdentifier", arguments);
      }, exports.jSXMemberExpression = exports.jsxMemberExpression = function(object, property) {
        return _builder.default.apply("JSXMemberExpression", arguments);
      }, exports.jSXNamespacedName = exports.jsxNamespacedName = function(namespace, name) {
        return _builder.default.apply("JSXNamespacedName", arguments);
      }, exports.jSXOpeningElement = exports.jsxOpeningElement = function(name, attributes, selfClosing) {
        return _builder.default.apply("JSXOpeningElement", arguments);
      }, exports.jSXOpeningFragment = exports.jsxOpeningFragment = function() {
        return _builder.default.apply("JSXOpeningFragment", arguments);
      }, exports.jSXSpreadAttribute = exports.jsxSpreadAttribute = function(argument) {
        return _builder.default.apply("JSXSpreadAttribute", arguments);
      }, exports.jSXSpreadChild = exports.jsxSpreadChild = function(expression) {
        return _builder.default.apply("JSXSpreadChild", arguments);
      }, exports.jSXText = exports.jsxText = function(value) {
        return _builder.default.apply("JSXText", arguments);
      }, exports.labeledStatement = function(label, body) {
        return _builder.default.apply("LabeledStatement", arguments);
      }, exports.logicalExpression = function(operator, left, right) {
        return _builder.default.apply("LogicalExpression", arguments);
      }, exports.memberExpression = function(object, property, computed, optional) {
        return _builder.default.apply("MemberExpression", arguments);
      }, exports.metaProperty = function(meta, property) {
        return _builder.default.apply("MetaProperty", arguments);
      }, exports.mixedTypeAnnotation = function() {
        return _builder.default.apply("MixedTypeAnnotation", arguments);
      }, exports.moduleExpression = function(body) {
        return _builder.default.apply("ModuleExpression", arguments);
      }, exports.newExpression = function(callee, _arguments) {
        return _builder.default.apply("NewExpression", arguments);
      }, exports.noop = function() {
        return _builder.default.apply("Noop", arguments);
      }, exports.nullLiteral = function() {
        return _builder.default.apply("NullLiteral", arguments);
      }, exports.nullLiteralTypeAnnotation = function() {
        return _builder.default.apply("NullLiteralTypeAnnotation", arguments);
      }, exports.nullableTypeAnnotation = function(typeAnnotation) {
        return _builder.default.apply("NullableTypeAnnotation", arguments);
      }, exports.numberLiteral = function(value) {
        return console.trace("The node type NumberLiteral has been renamed to NumericLiteral"), 
        _builder.default.apply("NumberLiteral", arguments);
      }, exports.numberLiteralTypeAnnotation = function(value) {
        return _builder.default.apply("NumberLiteralTypeAnnotation", arguments);
      }, exports.numberTypeAnnotation = function() {
        return _builder.default.apply("NumberTypeAnnotation", arguments);
      }, exports.numericLiteral = function(value) {
        return _builder.default.apply("NumericLiteral", arguments);
      }, exports.objectExpression = function(properties) {
        return _builder.default.apply("ObjectExpression", arguments);
      }, exports.objectMethod = function(kind, key, params, body, computed, generator, async) {
        return _builder.default.apply("ObjectMethod", arguments);
      }, exports.objectPattern = function(properties) {
        return _builder.default.apply("ObjectPattern", arguments);
      }, exports.objectProperty = function(key, value, computed, shorthand, decorators) {
        return _builder.default.apply("ObjectProperty", arguments);
      }, exports.objectTypeAnnotation = function(properties, indexers, callProperties, internalSlots, exact) {
        return _builder.default.apply("ObjectTypeAnnotation", arguments);
      }, exports.objectTypeCallProperty = function(value) {
        return _builder.default.apply("ObjectTypeCallProperty", arguments);
      }, exports.objectTypeIndexer = function(id, key, value, variance) {
        return _builder.default.apply("ObjectTypeIndexer", arguments);
      }, exports.objectTypeInternalSlot = function(id, value, optional, _static, method) {
        return _builder.default.apply("ObjectTypeInternalSlot", arguments);
      }, exports.objectTypeProperty = function(key, value, variance) {
        return _builder.default.apply("ObjectTypeProperty", arguments);
      }, exports.objectTypeSpreadProperty = function(argument) {
        return _builder.default.apply("ObjectTypeSpreadProperty", arguments);
      }, exports.opaqueType = function(id, typeParameters, supertype, impltype) {
        return _builder.default.apply("OpaqueType", arguments);
      }, exports.optionalCallExpression = function(callee, _arguments, optional) {
        return _builder.default.apply("OptionalCallExpression", arguments);
      }, exports.optionalIndexedAccessType = function(objectType, indexType) {
        return _builder.default.apply("OptionalIndexedAccessType", arguments);
      }, exports.optionalMemberExpression = function(object, property, computed, optional) {
        return _builder.default.apply("OptionalMemberExpression", arguments);
      }, exports.parenthesizedExpression = function(expression) {
        return _builder.default.apply("ParenthesizedExpression", arguments);
      }, exports.pipelineBareFunction = function(callee) {
        return _builder.default.apply("PipelineBareFunction", arguments);
      }, exports.pipelinePrimaryTopicReference = function() {
        return _builder.default.apply("PipelinePrimaryTopicReference", arguments);
      }, exports.pipelineTopicExpression = function(expression) {
        return _builder.default.apply("PipelineTopicExpression", arguments);
      }, exports.placeholder = function(expectedNode, name) {
        return _builder.default.apply("Placeholder", arguments);
      }, exports.privateName = function(id) {
        return _builder.default.apply("PrivateName", arguments);
      }, exports.program = function(body, directives, sourceType, interpreter) {
        return _builder.default.apply("Program", arguments);
      }, exports.qualifiedTypeIdentifier = function(id, qualification) {
        return _builder.default.apply("QualifiedTypeIdentifier", arguments);
      }, exports.recordExpression = function(properties) {
        return _builder.default.apply("RecordExpression", arguments);
      }, exports.regExpLiteral = function(pattern, flags) {
        return _builder.default.apply("RegExpLiteral", arguments);
      }, exports.regexLiteral = function(pattern, flags) {
        return console.trace("The node type RegexLiteral has been renamed to RegExpLiteral"), 
        _builder.default.apply("RegexLiteral", arguments);
      }, exports.restElement = function(argument) {
        return _builder.default.apply("RestElement", arguments);
      }, exports.restProperty = function(argument) {
        return console.trace("The node type RestProperty has been renamed to RestElement"), 
        _builder.default.apply("RestProperty", arguments);
      }, exports.returnStatement = function(argument) {
        return _builder.default.apply("ReturnStatement", arguments);
      }, exports.sequenceExpression = function(expressions) {
        return _builder.default.apply("SequenceExpression", arguments);
      }, exports.spreadElement = function(argument) {
        return _builder.default.apply("SpreadElement", arguments);
      }, exports.spreadProperty = function(argument) {
        return console.trace("The node type SpreadProperty has been renamed to SpreadElement"), 
        _builder.default.apply("SpreadProperty", arguments);
      }, exports.staticBlock = function(body) {
        return _builder.default.apply("StaticBlock", arguments);
      }, exports.stringLiteral = function(value) {
        return _builder.default.apply("StringLiteral", arguments);
      }, exports.stringLiteralTypeAnnotation = function(value) {
        return _builder.default.apply("StringLiteralTypeAnnotation", arguments);
      }, exports.stringTypeAnnotation = function() {
        return _builder.default.apply("StringTypeAnnotation", arguments);
      }, exports.super = function() {
        return _builder.default.apply("Super", arguments);
      }, exports.switchCase = function(test, consequent) {
        return _builder.default.apply("SwitchCase", arguments);
      }, exports.switchStatement = function(discriminant, cases) {
        return _builder.default.apply("SwitchStatement", arguments);
      }, exports.symbolTypeAnnotation = function() {
        return _builder.default.apply("SymbolTypeAnnotation", arguments);
      }, exports.taggedTemplateExpression = function(tag, quasi) {
        return _builder.default.apply("TaggedTemplateExpression", arguments);
      }, exports.templateElement = function(value, tail) {
        return _builder.default.apply("TemplateElement", arguments);
      }, exports.templateLiteral = function(quasis, expressions) {
        return _builder.default.apply("TemplateLiteral", arguments);
      }, exports.thisExpression = function() {
        return _builder.default.apply("ThisExpression", arguments);
      }, exports.thisTypeAnnotation = function() {
        return _builder.default.apply("ThisTypeAnnotation", arguments);
      }, exports.throwStatement = function(argument) {
        return _builder.default.apply("ThrowStatement", arguments);
      }, exports.topicReference = function() {
        return _builder.default.apply("TopicReference", arguments);
      }, exports.tryStatement = function(block, handler, finalizer) {
        return _builder.default.apply("TryStatement", arguments);
      }, exports.tSAnyKeyword = exports.tsAnyKeyword = function() {
        return _builder.default.apply("TSAnyKeyword", arguments);
      }, exports.tSArrayType = exports.tsArrayType = function(elementType) {
        return _builder.default.apply("TSArrayType", arguments);
      }, exports.tSAsExpression = exports.tsAsExpression = function(expression, typeAnnotation) {
        return _builder.default.apply("TSAsExpression", arguments);
      }, exports.tSBigIntKeyword = exports.tsBigIntKeyword = function() {
        return _builder.default.apply("TSBigIntKeyword", arguments);
      }, exports.tSBooleanKeyword = exports.tsBooleanKeyword = function() {
        return _builder.default.apply("TSBooleanKeyword", arguments);
      }, exports.tSCallSignatureDeclaration = exports.tsCallSignatureDeclaration = function(typeParameters, parameters, typeAnnotation) {
        return _builder.default.apply("TSCallSignatureDeclaration", arguments);
      }, exports.tSConditionalType = exports.tsConditionalType = function(checkType, extendsType, trueType, falseType) {
        return _builder.default.apply("TSConditionalType", arguments);
      }, exports.tSConstructSignatureDeclaration = exports.tsConstructSignatureDeclaration = function(typeParameters, parameters, typeAnnotation) {
        return _builder.default.apply("TSConstructSignatureDeclaration", arguments);
      }, exports.tSConstructorType = exports.tsConstructorType = function(typeParameters, parameters, typeAnnotation) {
        return _builder.default.apply("TSConstructorType", arguments);
      }, exports.tSDeclareFunction = exports.tsDeclareFunction = function(id, typeParameters, params, returnType) {
        return _builder.default.apply("TSDeclareFunction", arguments);
      }, exports.tSDeclareMethod = exports.tsDeclareMethod = function(decorators, key, typeParameters, params, returnType) {
        return _builder.default.apply("TSDeclareMethod", arguments);
      }, exports.tSEnumDeclaration = exports.tsEnumDeclaration = function(id, members) {
        return _builder.default.apply("TSEnumDeclaration", arguments);
      }, exports.tSEnumMember = exports.tsEnumMember = function(id, initializer) {
        return _builder.default.apply("TSEnumMember", arguments);
      }, exports.tSExportAssignment = exports.tsExportAssignment = function(expression) {
        return _builder.default.apply("TSExportAssignment", arguments);
      }, exports.tSExpressionWithTypeArguments = exports.tsExpressionWithTypeArguments = function(expression, typeParameters) {
        return _builder.default.apply("TSExpressionWithTypeArguments", arguments);
      }, exports.tSExternalModuleReference = exports.tsExternalModuleReference = function(expression) {
        return _builder.default.apply("TSExternalModuleReference", arguments);
      }, exports.tSFunctionType = exports.tsFunctionType = function(typeParameters, parameters, typeAnnotation) {
        return _builder.default.apply("TSFunctionType", arguments);
      }, exports.tSImportEqualsDeclaration = exports.tsImportEqualsDeclaration = function(id, moduleReference) {
        return _builder.default.apply("TSImportEqualsDeclaration", arguments);
      }, exports.tSImportType = exports.tsImportType = function(argument, qualifier, typeParameters) {
        return _builder.default.apply("TSImportType", arguments);
      }, exports.tSIndexSignature = exports.tsIndexSignature = function(parameters, typeAnnotation) {
        return _builder.default.apply("TSIndexSignature", arguments);
      }, exports.tSIndexedAccessType = exports.tsIndexedAccessType = function(objectType, indexType) {
        return _builder.default.apply("TSIndexedAccessType", arguments);
      }, exports.tSInferType = exports.tsInferType = function(typeParameter) {
        return _builder.default.apply("TSInferType", arguments);
      }, exports.tSInterfaceBody = exports.tsInterfaceBody = function(body) {
        return _builder.default.apply("TSInterfaceBody", arguments);
      }, exports.tSInterfaceDeclaration = exports.tsInterfaceDeclaration = function(id, typeParameters, _extends, body) {
        return _builder.default.apply("TSInterfaceDeclaration", arguments);
      }, exports.tSIntersectionType = exports.tsIntersectionType = function(types) {
        return _builder.default.apply("TSIntersectionType", arguments);
      }, exports.tSIntrinsicKeyword = exports.tsIntrinsicKeyword = function() {
        return _builder.default.apply("TSIntrinsicKeyword", arguments);
      }, exports.tSLiteralType = exports.tsLiteralType = function(literal) {
        return _builder.default.apply("TSLiteralType", arguments);
      }, exports.tSMappedType = exports.tsMappedType = function(typeParameter, typeAnnotation, nameType) {
        return _builder.default.apply("TSMappedType", arguments);
      }, exports.tSMethodSignature = exports.tsMethodSignature = function(key, typeParameters, parameters, typeAnnotation) {
        return _builder.default.apply("TSMethodSignature", arguments);
      }, exports.tSModuleBlock = exports.tsModuleBlock = function(body) {
        return _builder.default.apply("TSModuleBlock", arguments);
      }, exports.tSModuleDeclaration = exports.tsModuleDeclaration = function(id, body) {
        return _builder.default.apply("TSModuleDeclaration", arguments);
      }, exports.tSNamedTupleMember = exports.tsNamedTupleMember = function(label, elementType, optional) {
        return _builder.default.apply("TSNamedTupleMember", arguments);
      }, exports.tSNamespaceExportDeclaration = exports.tsNamespaceExportDeclaration = function(id) {
        return _builder.default.apply("TSNamespaceExportDeclaration", arguments);
      }, exports.tSNeverKeyword = exports.tsNeverKeyword = function() {
        return _builder.default.apply("TSNeverKeyword", arguments);
      }, exports.tSNonNullExpression = exports.tsNonNullExpression = function(expression) {
        return _builder.default.apply("TSNonNullExpression", arguments);
      }, exports.tSNullKeyword = exports.tsNullKeyword = function() {
        return _builder.default.apply("TSNullKeyword", arguments);
      }, exports.tSNumberKeyword = exports.tsNumberKeyword = function() {
        return _builder.default.apply("TSNumberKeyword", arguments);
      }, exports.tSObjectKeyword = exports.tsObjectKeyword = function() {
        return _builder.default.apply("TSObjectKeyword", arguments);
      }, exports.tSOptionalType = exports.tsOptionalType = function(typeAnnotation) {
        return _builder.default.apply("TSOptionalType", arguments);
      }, exports.tSParameterProperty = exports.tsParameterProperty = function(parameter) {
        return _builder.default.apply("TSParameterProperty", arguments);
      }, exports.tSParenthesizedType = exports.tsParenthesizedType = function(typeAnnotation) {
        return _builder.default.apply("TSParenthesizedType", arguments);
      }, exports.tSPropertySignature = exports.tsPropertySignature = function(key, typeAnnotation, initializer) {
        return _builder.default.apply("TSPropertySignature", arguments);
      }, exports.tSQualifiedName = exports.tsQualifiedName = function(left, right) {
        return _builder.default.apply("TSQualifiedName", arguments);
      }, exports.tSRestType = exports.tsRestType = function(typeAnnotation) {
        return _builder.default.apply("TSRestType", arguments);
      }, exports.tSStringKeyword = exports.tsStringKeyword = function() {
        return _builder.default.apply("TSStringKeyword", arguments);
      }, exports.tSSymbolKeyword = exports.tsSymbolKeyword = function() {
        return _builder.default.apply("TSSymbolKeyword", arguments);
      }, exports.tSThisType = exports.tsThisType = function() {
        return _builder.default.apply("TSThisType", arguments);
      }, exports.tSTupleType = exports.tsTupleType = function(elementTypes) {
        return _builder.default.apply("TSTupleType", arguments);
      }, exports.tSTypeAliasDeclaration = exports.tsTypeAliasDeclaration = function(id, typeParameters, typeAnnotation) {
        return _builder.default.apply("TSTypeAliasDeclaration", arguments);
      }, exports.tSTypeAnnotation = exports.tsTypeAnnotation = function(typeAnnotation) {
        return _builder.default.apply("TSTypeAnnotation", arguments);
      }, exports.tSTypeAssertion = exports.tsTypeAssertion = function(typeAnnotation, expression) {
        return _builder.default.apply("TSTypeAssertion", arguments);
      }, exports.tSTypeLiteral = exports.tsTypeLiteral = function(members) {
        return _builder.default.apply("TSTypeLiteral", arguments);
      }, exports.tSTypeOperator = exports.tsTypeOperator = function(typeAnnotation) {
        return _builder.default.apply("TSTypeOperator", arguments);
      }, exports.tSTypeParameter = exports.tsTypeParameter = function(constraint, _default, name) {
        return _builder.default.apply("TSTypeParameter", arguments);
      }, exports.tSTypeParameterDeclaration = exports.tsTypeParameterDeclaration = function(params) {
        return _builder.default.apply("TSTypeParameterDeclaration", arguments);
      }, exports.tSTypeParameterInstantiation = exports.tsTypeParameterInstantiation = function(params) {
        return _builder.default.apply("TSTypeParameterInstantiation", arguments);
      }, exports.tSTypePredicate = exports.tsTypePredicate = function(parameterName, typeAnnotation, asserts) {
        return _builder.default.apply("TSTypePredicate", arguments);
      }, exports.tSTypeQuery = exports.tsTypeQuery = function(exprName) {
        return _builder.default.apply("TSTypeQuery", arguments);
      }, exports.tSTypeReference = exports.tsTypeReference = function(typeName, typeParameters) {
        return _builder.default.apply("TSTypeReference", arguments);
      }, exports.tSUndefinedKeyword = exports.tsUndefinedKeyword = function() {
        return _builder.default.apply("TSUndefinedKeyword", arguments);
      }, exports.tSUnionType = exports.tsUnionType = function(types) {
        return _builder.default.apply("TSUnionType", arguments);
      }, exports.tSUnknownKeyword = exports.tsUnknownKeyword = function() {
        return _builder.default.apply("TSUnknownKeyword", arguments);
      }, exports.tSVoidKeyword = exports.tsVoidKeyword = function() {
        return _builder.default.apply("TSVoidKeyword", arguments);
      }, exports.tupleExpression = function(elements) {
        return _builder.default.apply("TupleExpression", arguments);
      }, exports.tupleTypeAnnotation = function(types) {
        return _builder.default.apply("TupleTypeAnnotation", arguments);
      }, exports.typeAlias = function(id, typeParameters, right) {
        return _builder.default.apply("TypeAlias", arguments);
      }, exports.typeAnnotation = function(typeAnnotation) {
        return _builder.default.apply("TypeAnnotation", arguments);
      }, exports.typeCastExpression = function(expression, typeAnnotation) {
        return _builder.default.apply("TypeCastExpression", arguments);
      }, exports.typeParameter = function(bound, _default, variance) {
        return _builder.default.apply("TypeParameter", arguments);
      }, exports.typeParameterDeclaration = function(params) {
        return _builder.default.apply("TypeParameterDeclaration", arguments);
      }, exports.typeParameterInstantiation = function(params) {
        return _builder.default.apply("TypeParameterInstantiation", arguments);
      }, exports.typeofTypeAnnotation = function(argument) {
        return _builder.default.apply("TypeofTypeAnnotation", arguments);
      }, exports.unaryExpression = function(operator, argument, prefix) {
        return _builder.default.apply("UnaryExpression", arguments);
      }, exports.unionTypeAnnotation = function(types) {
        return _builder.default.apply("UnionTypeAnnotation", arguments);
      }, exports.updateExpression = function(operator, argument, prefix) {
        return _builder.default.apply("UpdateExpression", arguments);
      }, exports.v8IntrinsicIdentifier = function(name) {
        return _builder.default.apply("V8IntrinsicIdentifier", arguments);
      }, exports.variableDeclaration = function(kind, declarations) {
        return _builder.default.apply("VariableDeclaration", arguments);
      }, exports.variableDeclarator = function(id, init) {
        return _builder.default.apply("VariableDeclarator", arguments);
      }, exports.variance = function(kind) {
        return _builder.default.apply("Variance", arguments);
      }, exports.voidTypeAnnotation = function() {
        return _builder.default.apply("VoidTypeAnnotation", arguments);
      }, exports.whileStatement = function(test, body) {
        return _builder.default.apply("WhileStatement", arguments);
      }, exports.withStatement = function(object, body) {
        return _builder.default.apply("WithStatement", arguments);
      }, exports.yieldExpression = function(argument, delegate) {
        return _builder.default.apply("YieldExpression", arguments);
      };
      var _builder = __webpack_require__(4745);
    },
    6104: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), Object.defineProperty(exports, "AnyTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _index.anyTypeAnnotation;
        }
      }), Object.defineProperty(exports, "ArgumentPlaceholder", {
        enumerable: !0,
        get: function() {
          return _index.argumentPlaceholder;
        }
      }), Object.defineProperty(exports, "ArrayExpression", {
        enumerable: !0,
        get: function() {
          return _index.arrayExpression;
        }
      }), Object.defineProperty(exports, "ArrayPattern", {
        enumerable: !0,
        get: function() {
          return _index.arrayPattern;
        }
      }), Object.defineProperty(exports, "ArrayTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _index.arrayTypeAnnotation;
        }
      }), Object.defineProperty(exports, "ArrowFunctionExpression", {
        enumerable: !0,
        get: function() {
          return _index.arrowFunctionExpression;
        }
      }), Object.defineProperty(exports, "AssignmentExpression", {
        enumerable: !0,
        get: function() {
          return _index.assignmentExpression;
        }
      }), Object.defineProperty(exports, "AssignmentPattern", {
        enumerable: !0,
        get: function() {
          return _index.assignmentPattern;
        }
      }), Object.defineProperty(exports, "AwaitExpression", {
        enumerable: !0,
        get: function() {
          return _index.awaitExpression;
        }
      }), Object.defineProperty(exports, "BigIntLiteral", {
        enumerable: !0,
        get: function() {
          return _index.bigIntLiteral;
        }
      }), Object.defineProperty(exports, "BinaryExpression", {
        enumerable: !0,
        get: function() {
          return _index.binaryExpression;
        }
      }), Object.defineProperty(exports, "BindExpression", {
        enumerable: !0,
        get: function() {
          return _index.bindExpression;
        }
      }), Object.defineProperty(exports, "BlockStatement", {
        enumerable: !0,
        get: function() {
          return _index.blockStatement;
        }
      }), Object.defineProperty(exports, "BooleanLiteral", {
        enumerable: !0,
        get: function() {
          return _index.booleanLiteral;
        }
      }), Object.defineProperty(exports, "BooleanLiteralTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _index.booleanLiteralTypeAnnotation;
        }
      }), Object.defineProperty(exports, "BooleanTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _index.booleanTypeAnnotation;
        }
      }), Object.defineProperty(exports, "BreakStatement", {
        enumerable: !0,
        get: function() {
          return _index.breakStatement;
        }
      }), Object.defineProperty(exports, "CallExpression", {
        enumerable: !0,
        get: function() {
          return _index.callExpression;
        }
      }), Object.defineProperty(exports, "CatchClause", {
        enumerable: !0,
        get: function() {
          return _index.catchClause;
        }
      }), Object.defineProperty(exports, "ClassAccessorProperty", {
        enumerable: !0,
        get: function() {
          return _index.classAccessorProperty;
        }
      }), Object.defineProperty(exports, "ClassBody", {
        enumerable: !0,
        get: function() {
          return _index.classBody;
        }
      }), Object.defineProperty(exports, "ClassDeclaration", {
        enumerable: !0,
        get: function() {
          return _index.classDeclaration;
        }
      }), Object.defineProperty(exports, "ClassExpression", {
        enumerable: !0,
        get: function() {
          return _index.classExpression;
        }
      }), Object.defineProperty(exports, "ClassImplements", {
        enumerable: !0,
        get: function() {
          return _index.classImplements;
        }
      }), Object.defineProperty(exports, "ClassMethod", {
        enumerable: !0,
        get: function() {
          return _index.classMethod;
        }
      }), Object.defineProperty(exports, "ClassPrivateMethod", {
        enumerable: !0,
        get: function() {
          return _index.classPrivateMethod;
        }
      }), Object.defineProperty(exports, "ClassPrivateProperty", {
        enumerable: !0,
        get: function() {
          return _index.classPrivateProperty;
        }
      }), Object.defineProperty(exports, "ClassProperty", {
        enumerable: !0,
        get: function() {
          return _index.classProperty;
        }
      }), Object.defineProperty(exports, "ConditionalExpression", {
        enumerable: !0,
        get: function() {
          return _index.conditionalExpression;
        }
      }), Object.defineProperty(exports, "ContinueStatement", {
        enumerable: !0,
        get: function() {
          return _index.continueStatement;
        }
      }), Object.defineProperty(exports, "DebuggerStatement", {
        enumerable: !0,
        get: function() {
          return _index.debuggerStatement;
        }
      }), Object.defineProperty(exports, "DecimalLiteral", {
        enumerable: !0,
        get: function() {
          return _index.decimalLiteral;
        }
      }), Object.defineProperty(exports, "DeclareClass", {
        enumerable: !0,
        get: function() {
          return _index.declareClass;
        }
      }), Object.defineProperty(exports, "DeclareExportAllDeclaration", {
        enumerable: !0,
        get: function() {
          return _index.declareExportAllDeclaration;
        }
      }), Object.defineProperty(exports, "DeclareExportDeclaration", {
        enumerable: !0,
        get: function() {
          return _index.declareExportDeclaration;
        }
      }), Object.defineProperty(exports, "DeclareFunction", {
        enumerable: !0,
        get: function() {
          return _index.declareFunction;
        }
      }), Object.defineProperty(exports, "DeclareInterface", {
        enumerable: !0,
        get: function() {
          return _index.declareInterface;
        }
      }), Object.defineProperty(exports, "DeclareModule", {
        enumerable: !0,
        get: function() {
          return _index.declareModule;
        }
      }), Object.defineProperty(exports, "DeclareModuleExports", {
        enumerable: !0,
        get: function() {
          return _index.declareModuleExports;
        }
      }), Object.defineProperty(exports, "DeclareOpaqueType", {
        enumerable: !0,
        get: function() {
          return _index.declareOpaqueType;
        }
      }), Object.defineProperty(exports, "DeclareTypeAlias", {
        enumerable: !0,
        get: function() {
          return _index.declareTypeAlias;
        }
      }), Object.defineProperty(exports, "DeclareVariable", {
        enumerable: !0,
        get: function() {
          return _index.declareVariable;
        }
      }), Object.defineProperty(exports, "DeclaredPredicate", {
        enumerable: !0,
        get: function() {
          return _index.declaredPredicate;
        }
      }), Object.defineProperty(exports, "Decorator", {
        enumerable: !0,
        get: function() {
          return _index.decorator;
        }
      }), Object.defineProperty(exports, "Directive", {
        enumerable: !0,
        get: function() {
          return _index.directive;
        }
      }), Object.defineProperty(exports, "DirectiveLiteral", {
        enumerable: !0,
        get: function() {
          return _index.directiveLiteral;
        }
      }), Object.defineProperty(exports, "DoExpression", {
        enumerable: !0,
        get: function() {
          return _index.doExpression;
        }
      }), Object.defineProperty(exports, "DoWhileStatement", {
        enumerable: !0,
        get: function() {
          return _index.doWhileStatement;
        }
      }), Object.defineProperty(exports, "EmptyStatement", {
        enumerable: !0,
        get: function() {
          return _index.emptyStatement;
        }
      }), Object.defineProperty(exports, "EmptyTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _index.emptyTypeAnnotation;
        }
      }), Object.defineProperty(exports, "EnumBooleanBody", {
        enumerable: !0,
        get: function() {
          return _index.enumBooleanBody;
        }
      }), Object.defineProperty(exports, "EnumBooleanMember", {
        enumerable: !0,
        get: function() {
          return _index.enumBooleanMember;
        }
      }), Object.defineProperty(exports, "EnumDeclaration", {
        enumerable: !0,
        get: function() {
          return _index.enumDeclaration;
        }
      }), Object.defineProperty(exports, "EnumDefaultedMember", {
        enumerable: !0,
        get: function() {
          return _index.enumDefaultedMember;
        }
      }), Object.defineProperty(exports, "EnumNumberBody", {
        enumerable: !0,
        get: function() {
          return _index.enumNumberBody;
        }
      }), Object.defineProperty(exports, "EnumNumberMember", {
        enumerable: !0,
        get: function() {
          return _index.enumNumberMember;
        }
      }), Object.defineProperty(exports, "EnumStringBody", {
        enumerable: !0,
        get: function() {
          return _index.enumStringBody;
        }
      }), Object.defineProperty(exports, "EnumStringMember", {
        enumerable: !0,
        get: function() {
          return _index.enumStringMember;
        }
      }), Object.defineProperty(exports, "EnumSymbolBody", {
        enumerable: !0,
        get: function() {
          return _index.enumSymbolBody;
        }
      }), Object.defineProperty(exports, "ExistsTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _index.existsTypeAnnotation;
        }
      }), Object.defineProperty(exports, "ExportAllDeclaration", {
        enumerable: !0,
        get: function() {
          return _index.exportAllDeclaration;
        }
      }), Object.defineProperty(exports, "ExportDefaultDeclaration", {
        enumerable: !0,
        get: function() {
          return _index.exportDefaultDeclaration;
        }
      }), Object.defineProperty(exports, "ExportDefaultSpecifier", {
        enumerable: !0,
        get: function() {
          return _index.exportDefaultSpecifier;
        }
      }), Object.defineProperty(exports, "ExportNamedDeclaration", {
        enumerable: !0,
        get: function() {
          return _index.exportNamedDeclaration;
        }
      }), Object.defineProperty(exports, "ExportNamespaceSpecifier", {
        enumerable: !0,
        get: function() {
          return _index.exportNamespaceSpecifier;
        }
      }), Object.defineProperty(exports, "ExportSpecifier", {
        enumerable: !0,
        get: function() {
          return _index.exportSpecifier;
        }
      }), Object.defineProperty(exports, "ExpressionStatement", {
        enumerable: !0,
        get: function() {
          return _index.expressionStatement;
        }
      }), Object.defineProperty(exports, "File", {
        enumerable: !0,
        get: function() {
          return _index.file;
        }
      }), Object.defineProperty(exports, "ForInStatement", {
        enumerable: !0,
        get: function() {
          return _index.forInStatement;
        }
      }), Object.defineProperty(exports, "ForOfStatement", {
        enumerable: !0,
        get: function() {
          return _index.forOfStatement;
        }
      }), Object.defineProperty(exports, "ForStatement", {
        enumerable: !0,
        get: function() {
          return _index.forStatement;
        }
      }), Object.defineProperty(exports, "FunctionDeclaration", {
        enumerable: !0,
        get: function() {
          return _index.functionDeclaration;
        }
      }), Object.defineProperty(exports, "FunctionExpression", {
        enumerable: !0,
        get: function() {
          return _index.functionExpression;
        }
      }), Object.defineProperty(exports, "FunctionTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _index.functionTypeAnnotation;
        }
      }), Object.defineProperty(exports, "FunctionTypeParam", {
        enumerable: !0,
        get: function() {
          return _index.functionTypeParam;
        }
      }), Object.defineProperty(exports, "GenericTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _index.genericTypeAnnotation;
        }
      }), Object.defineProperty(exports, "Identifier", {
        enumerable: !0,
        get: function() {
          return _index.identifier;
        }
      }), Object.defineProperty(exports, "IfStatement", {
        enumerable: !0,
        get: function() {
          return _index.ifStatement;
        }
      }), Object.defineProperty(exports, "Import", {
        enumerable: !0,
        get: function() {
          return _index.import;
        }
      }), Object.defineProperty(exports, "ImportAttribute", {
        enumerable: !0,
        get: function() {
          return _index.importAttribute;
        }
      }), Object.defineProperty(exports, "ImportDeclaration", {
        enumerable: !0,
        get: function() {
          return _index.importDeclaration;
        }
      }), Object.defineProperty(exports, "ImportDefaultSpecifier", {
        enumerable: !0,
        get: function() {
          return _index.importDefaultSpecifier;
        }
      }), Object.defineProperty(exports, "ImportNamespaceSpecifier", {
        enumerable: !0,
        get: function() {
          return _index.importNamespaceSpecifier;
        }
      }), Object.defineProperty(exports, "ImportSpecifier", {
        enumerable: !0,
        get: function() {
          return _index.importSpecifier;
        }
      }), Object.defineProperty(exports, "IndexedAccessType", {
        enumerable: !0,
        get: function() {
          return _index.indexedAccessType;
        }
      }), Object.defineProperty(exports, "InferredPredicate", {
        enumerable: !0,
        get: function() {
          return _index.inferredPredicate;
        }
      }), Object.defineProperty(exports, "InterfaceDeclaration", {
        enumerable: !0,
        get: function() {
          return _index.interfaceDeclaration;
        }
      }), Object.defineProperty(exports, "InterfaceExtends", {
        enumerable: !0,
        get: function() {
          return _index.interfaceExtends;
        }
      }), Object.defineProperty(exports, "InterfaceTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _index.interfaceTypeAnnotation;
        }
      }), Object.defineProperty(exports, "InterpreterDirective", {
        enumerable: !0,
        get: function() {
          return _index.interpreterDirective;
        }
      }), Object.defineProperty(exports, "IntersectionTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _index.intersectionTypeAnnotation;
        }
      }), Object.defineProperty(exports, "JSXAttribute", {
        enumerable: !0,
        get: function() {
          return _index.jsxAttribute;
        }
      }), Object.defineProperty(exports, "JSXClosingElement", {
        enumerable: !0,
        get: function() {
          return _index.jsxClosingElement;
        }
      }), Object.defineProperty(exports, "JSXClosingFragment", {
        enumerable: !0,
        get: function() {
          return _index.jsxClosingFragment;
        }
      }), Object.defineProperty(exports, "JSXElement", {
        enumerable: !0,
        get: function() {
          return _index.jsxElement;
        }
      }), Object.defineProperty(exports, "JSXEmptyExpression", {
        enumerable: !0,
        get: function() {
          return _index.jsxEmptyExpression;
        }
      }), Object.defineProperty(exports, "JSXExpressionContainer", {
        enumerable: !0,
        get: function() {
          return _index.jsxExpressionContainer;
        }
      }), Object.defineProperty(exports, "JSXFragment", {
        enumerable: !0,
        get: function() {
          return _index.jsxFragment;
        }
      }), Object.defineProperty(exports, "JSXIdentifier", {
        enumerable: !0,
        get: function() {
          return _index.jsxIdentifier;
        }
      }), Object.defineProperty(exports, "JSXMemberExpression", {
        enumerable: !0,
        get: function() {
          return _index.jsxMemberExpression;
        }
      }), Object.defineProperty(exports, "JSXNamespacedName", {
        enumerable: !0,
        get: function() {
          return _index.jsxNamespacedName;
        }
      }), Object.defineProperty(exports, "JSXOpeningElement", {
        enumerable: !0,
        get: function() {
          return _index.jsxOpeningElement;
        }
      }), Object.defineProperty(exports, "JSXOpeningFragment", {
        enumerable: !0,
        get: function() {
          return _index.jsxOpeningFragment;
        }
      }), Object.defineProperty(exports, "JSXSpreadAttribute", {
        enumerable: !0,
        get: function() {
          return _index.jsxSpreadAttribute;
        }
      }), Object.defineProperty(exports, "JSXSpreadChild", {
        enumerable: !0,
        get: function() {
          return _index.jsxSpreadChild;
        }
      }), Object.defineProperty(exports, "JSXText", {
        enumerable: !0,
        get: function() {
          return _index.jsxText;
        }
      }), Object.defineProperty(exports, "LabeledStatement", {
        enumerable: !0,
        get: function() {
          return _index.labeledStatement;
        }
      }), Object.defineProperty(exports, "LogicalExpression", {
        enumerable: !0,
        get: function() {
          return _index.logicalExpression;
        }
      }), Object.defineProperty(exports, "MemberExpression", {
        enumerable: !0,
        get: function() {
          return _index.memberExpression;
        }
      }), Object.defineProperty(exports, "MetaProperty", {
        enumerable: !0,
        get: function() {
          return _index.metaProperty;
        }
      }), Object.defineProperty(exports, "MixedTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _index.mixedTypeAnnotation;
        }
      }), Object.defineProperty(exports, "ModuleExpression", {
        enumerable: !0,
        get: function() {
          return _index.moduleExpression;
        }
      }), Object.defineProperty(exports, "NewExpression", {
        enumerable: !0,
        get: function() {
          return _index.newExpression;
        }
      }), Object.defineProperty(exports, "Noop", {
        enumerable: !0,
        get: function() {
          return _index.noop;
        }
      }), Object.defineProperty(exports, "NullLiteral", {
        enumerable: !0,
        get: function() {
          return _index.nullLiteral;
        }
      }), Object.defineProperty(exports, "NullLiteralTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _index.nullLiteralTypeAnnotation;
        }
      }), Object.defineProperty(exports, "NullableTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _index.nullableTypeAnnotation;
        }
      }), Object.defineProperty(exports, "NumberLiteral", {
        enumerable: !0,
        get: function() {
          return _index.numberLiteral;
        }
      }), Object.defineProperty(exports, "NumberLiteralTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _index.numberLiteralTypeAnnotation;
        }
      }), Object.defineProperty(exports, "NumberTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _index.numberTypeAnnotation;
        }
      }), Object.defineProperty(exports, "NumericLiteral", {
        enumerable: !0,
        get: function() {
          return _index.numericLiteral;
        }
      }), Object.defineProperty(exports, "ObjectExpression", {
        enumerable: !0,
        get: function() {
          return _index.objectExpression;
        }
      }), Object.defineProperty(exports, "ObjectMethod", {
        enumerable: !0,
        get: function() {
          return _index.objectMethod;
        }
      }), Object.defineProperty(exports, "ObjectPattern", {
        enumerable: !0,
        get: function() {
          return _index.objectPattern;
        }
      }), Object.defineProperty(exports, "ObjectProperty", {
        enumerable: !0,
        get: function() {
          return _index.objectProperty;
        }
      }), Object.defineProperty(exports, "ObjectTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _index.objectTypeAnnotation;
        }
      }), Object.defineProperty(exports, "ObjectTypeCallProperty", {
        enumerable: !0,
        get: function() {
          return _index.objectTypeCallProperty;
        }
      }), Object.defineProperty(exports, "ObjectTypeIndexer", {
        enumerable: !0,
        get: function() {
          return _index.objectTypeIndexer;
        }
      }), Object.defineProperty(exports, "ObjectTypeInternalSlot", {
        enumerable: !0,
        get: function() {
          return _index.objectTypeInternalSlot;
        }
      }), Object.defineProperty(exports, "ObjectTypeProperty", {
        enumerable: !0,
        get: function() {
          return _index.objectTypeProperty;
        }
      }), Object.defineProperty(exports, "ObjectTypeSpreadProperty", {
        enumerable: !0,
        get: function() {
          return _index.objectTypeSpreadProperty;
        }
      }), Object.defineProperty(exports, "OpaqueType", {
        enumerable: !0,
        get: function() {
          return _index.opaqueType;
        }
      }), Object.defineProperty(exports, "OptionalCallExpression", {
        enumerable: !0,
        get: function() {
          return _index.optionalCallExpression;
        }
      }), Object.defineProperty(exports, "OptionalIndexedAccessType", {
        enumerable: !0,
        get: function() {
          return _index.optionalIndexedAccessType;
        }
      }), Object.defineProperty(exports, "OptionalMemberExpression", {
        enumerable: !0,
        get: function() {
          return _index.optionalMemberExpression;
        }
      }), Object.defineProperty(exports, "ParenthesizedExpression", {
        enumerable: !0,
        get: function() {
          return _index.parenthesizedExpression;
        }
      }), Object.defineProperty(exports, "PipelineBareFunction", {
        enumerable: !0,
        get: function() {
          return _index.pipelineBareFunction;
        }
      }), Object.defineProperty(exports, "PipelinePrimaryTopicReference", {
        enumerable: !0,
        get: function() {
          return _index.pipelinePrimaryTopicReference;
        }
      }), Object.defineProperty(exports, "PipelineTopicExpression", {
        enumerable: !0,
        get: function() {
          return _index.pipelineTopicExpression;
        }
      }), Object.defineProperty(exports, "Placeholder", {
        enumerable: !0,
        get: function() {
          return _index.placeholder;
        }
      }), Object.defineProperty(exports, "PrivateName", {
        enumerable: !0,
        get: function() {
          return _index.privateName;
        }
      }), Object.defineProperty(exports, "Program", {
        enumerable: !0,
        get: function() {
          return _index.program;
        }
      }), Object.defineProperty(exports, "QualifiedTypeIdentifier", {
        enumerable: !0,
        get: function() {
          return _index.qualifiedTypeIdentifier;
        }
      }), Object.defineProperty(exports, "RecordExpression", {
        enumerable: !0,
        get: function() {
          return _index.recordExpression;
        }
      }), Object.defineProperty(exports, "RegExpLiteral", {
        enumerable: !0,
        get: function() {
          return _index.regExpLiteral;
        }
      }), Object.defineProperty(exports, "RegexLiteral", {
        enumerable: !0,
        get: function() {
          return _index.regexLiteral;
        }
      }), Object.defineProperty(exports, "RestElement", {
        enumerable: !0,
        get: function() {
          return _index.restElement;
        }
      }), Object.defineProperty(exports, "RestProperty", {
        enumerable: !0,
        get: function() {
          return _index.restProperty;
        }
      }), Object.defineProperty(exports, "ReturnStatement", {
        enumerable: !0,
        get: function() {
          return _index.returnStatement;
        }
      }), Object.defineProperty(exports, "SequenceExpression", {
        enumerable: !0,
        get: function() {
          return _index.sequenceExpression;
        }
      }), Object.defineProperty(exports, "SpreadElement", {
        enumerable: !0,
        get: function() {
          return _index.spreadElement;
        }
      }), Object.defineProperty(exports, "SpreadProperty", {
        enumerable: !0,
        get: function() {
          return _index.spreadProperty;
        }
      }), Object.defineProperty(exports, "StaticBlock", {
        enumerable: !0,
        get: function() {
          return _index.staticBlock;
        }
      }), Object.defineProperty(exports, "StringLiteral", {
        enumerable: !0,
        get: function() {
          return _index.stringLiteral;
        }
      }), Object.defineProperty(exports, "StringLiteralTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _index.stringLiteralTypeAnnotation;
        }
      }), Object.defineProperty(exports, "StringTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _index.stringTypeAnnotation;
        }
      }), Object.defineProperty(exports, "Super", {
        enumerable: !0,
        get: function() {
          return _index.super;
        }
      }), Object.defineProperty(exports, "SwitchCase", {
        enumerable: !0,
        get: function() {
          return _index.switchCase;
        }
      }), Object.defineProperty(exports, "SwitchStatement", {
        enumerable: !0,
        get: function() {
          return _index.switchStatement;
        }
      }), Object.defineProperty(exports, "SymbolTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _index.symbolTypeAnnotation;
        }
      }), Object.defineProperty(exports, "TSAnyKeyword", {
        enumerable: !0,
        get: function() {
          return _index.tsAnyKeyword;
        }
      }), Object.defineProperty(exports, "TSArrayType", {
        enumerable: !0,
        get: function() {
          return _index.tsArrayType;
        }
      }), Object.defineProperty(exports, "TSAsExpression", {
        enumerable: !0,
        get: function() {
          return _index.tsAsExpression;
        }
      }), Object.defineProperty(exports, "TSBigIntKeyword", {
        enumerable: !0,
        get: function() {
          return _index.tsBigIntKeyword;
        }
      }), Object.defineProperty(exports, "TSBooleanKeyword", {
        enumerable: !0,
        get: function() {
          return _index.tsBooleanKeyword;
        }
      }), Object.defineProperty(exports, "TSCallSignatureDeclaration", {
        enumerable: !0,
        get: function() {
          return _index.tsCallSignatureDeclaration;
        }
      }), Object.defineProperty(exports, "TSConditionalType", {
        enumerable: !0,
        get: function() {
          return _index.tsConditionalType;
        }
      }), Object.defineProperty(exports, "TSConstructSignatureDeclaration", {
        enumerable: !0,
        get: function() {
          return _index.tsConstructSignatureDeclaration;
        }
      }), Object.defineProperty(exports, "TSConstructorType", {
        enumerable: !0,
        get: function() {
          return _index.tsConstructorType;
        }
      }), Object.defineProperty(exports, "TSDeclareFunction", {
        enumerable: !0,
        get: function() {
          return _index.tsDeclareFunction;
        }
      }), Object.defineProperty(exports, "TSDeclareMethod", {
        enumerable: !0,
        get: function() {
          return _index.tsDeclareMethod;
        }
      }), Object.defineProperty(exports, "TSEnumDeclaration", {
        enumerable: !0,
        get: function() {
          return _index.tsEnumDeclaration;
        }
      }), Object.defineProperty(exports, "TSEnumMember", {
        enumerable: !0,
        get: function() {
          return _index.tsEnumMember;
        }
      }), Object.defineProperty(exports, "TSExportAssignment", {
        enumerable: !0,
        get: function() {
          return _index.tsExportAssignment;
        }
      }), Object.defineProperty(exports, "TSExpressionWithTypeArguments", {
        enumerable: !0,
        get: function() {
          return _index.tsExpressionWithTypeArguments;
        }
      }), Object.defineProperty(exports, "TSExternalModuleReference", {
        enumerable: !0,
        get: function() {
          return _index.tsExternalModuleReference;
        }
      }), Object.defineProperty(exports, "TSFunctionType", {
        enumerable: !0,
        get: function() {
          return _index.tsFunctionType;
        }
      }), Object.defineProperty(exports, "TSImportEqualsDeclaration", {
        enumerable: !0,
        get: function() {
          return _index.tsImportEqualsDeclaration;
        }
      }), Object.defineProperty(exports, "TSImportType", {
        enumerable: !0,
        get: function() {
          return _index.tsImportType;
        }
      }), Object.defineProperty(exports, "TSIndexSignature", {
        enumerable: !0,
        get: function() {
          return _index.tsIndexSignature;
        }
      }), Object.defineProperty(exports, "TSIndexedAccessType", {
        enumerable: !0,
        get: function() {
          return _index.tsIndexedAccessType;
        }
      }), Object.defineProperty(exports, "TSInferType", {
        enumerable: !0,
        get: function() {
          return _index.tsInferType;
        }
      }), Object.defineProperty(exports, "TSInterfaceBody", {
        enumerable: !0,
        get: function() {
          return _index.tsInterfaceBody;
        }
      }), Object.defineProperty(exports, "TSInterfaceDeclaration", {
        enumerable: !0,
        get: function() {
          return _index.tsInterfaceDeclaration;
        }
      }), Object.defineProperty(exports, "TSIntersectionType", {
        enumerable: !0,
        get: function() {
          return _index.tsIntersectionType;
        }
      }), Object.defineProperty(exports, "TSIntrinsicKeyword", {
        enumerable: !0,
        get: function() {
          return _index.tsIntrinsicKeyword;
        }
      }), Object.defineProperty(exports, "TSLiteralType", {
        enumerable: !0,
        get: function() {
          return _index.tsLiteralType;
        }
      }), Object.defineProperty(exports, "TSMappedType", {
        enumerable: !0,
        get: function() {
          return _index.tsMappedType;
        }
      }), Object.defineProperty(exports, "TSMethodSignature", {
        enumerable: !0,
        get: function() {
          return _index.tsMethodSignature;
        }
      }), Object.defineProperty(exports, "TSModuleBlock", {
        enumerable: !0,
        get: function() {
          return _index.tsModuleBlock;
        }
      }), Object.defineProperty(exports, "TSModuleDeclaration", {
        enumerable: !0,
        get: function() {
          return _index.tsModuleDeclaration;
        }
      }), Object.defineProperty(exports, "TSNamedTupleMember", {
        enumerable: !0,
        get: function() {
          return _index.tsNamedTupleMember;
        }
      }), Object.defineProperty(exports, "TSNamespaceExportDeclaration", {
        enumerable: !0,
        get: function() {
          return _index.tsNamespaceExportDeclaration;
        }
      }), Object.defineProperty(exports, "TSNeverKeyword", {
        enumerable: !0,
        get: function() {
          return _index.tsNeverKeyword;
        }
      }), Object.defineProperty(exports, "TSNonNullExpression", {
        enumerable: !0,
        get: function() {
          return _index.tsNonNullExpression;
        }
      }), Object.defineProperty(exports, "TSNullKeyword", {
        enumerable: !0,
        get: function() {
          return _index.tsNullKeyword;
        }
      }), Object.defineProperty(exports, "TSNumberKeyword", {
        enumerable: !0,
        get: function() {
          return _index.tsNumberKeyword;
        }
      }), Object.defineProperty(exports, "TSObjectKeyword", {
        enumerable: !0,
        get: function() {
          return _index.tsObjectKeyword;
        }
      }), Object.defineProperty(exports, "TSOptionalType", {
        enumerable: !0,
        get: function() {
          return _index.tsOptionalType;
        }
      }), Object.defineProperty(exports, "TSParameterProperty", {
        enumerable: !0,
        get: function() {
          return _index.tsParameterProperty;
        }
      }), Object.defineProperty(exports, "TSParenthesizedType", {
        enumerable: !0,
        get: function() {
          return _index.tsParenthesizedType;
        }
      }), Object.defineProperty(exports, "TSPropertySignature", {
        enumerable: !0,
        get: function() {
          return _index.tsPropertySignature;
        }
      }), Object.defineProperty(exports, "TSQualifiedName", {
        enumerable: !0,
        get: function() {
          return _index.tsQualifiedName;
        }
      }), Object.defineProperty(exports, "TSRestType", {
        enumerable: !0,
        get: function() {
          return _index.tsRestType;
        }
      }), Object.defineProperty(exports, "TSStringKeyword", {
        enumerable: !0,
        get: function() {
          return _index.tsStringKeyword;
        }
      }), Object.defineProperty(exports, "TSSymbolKeyword", {
        enumerable: !0,
        get: function() {
          return _index.tsSymbolKeyword;
        }
      }), Object.defineProperty(exports, "TSThisType", {
        enumerable: !0,
        get: function() {
          return _index.tsThisType;
        }
      }), Object.defineProperty(exports, "TSTupleType", {
        enumerable: !0,
        get: function() {
          return _index.tsTupleType;
        }
      }), Object.defineProperty(exports, "TSTypeAliasDeclaration", {
        enumerable: !0,
        get: function() {
          return _index.tsTypeAliasDeclaration;
        }
      }), Object.defineProperty(exports, "TSTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _index.tsTypeAnnotation;
        }
      }), Object.defineProperty(exports, "TSTypeAssertion", {
        enumerable: !0,
        get: function() {
          return _index.tsTypeAssertion;
        }
      }), Object.defineProperty(exports, "TSTypeLiteral", {
        enumerable: !0,
        get: function() {
          return _index.tsTypeLiteral;
        }
      }), Object.defineProperty(exports, "TSTypeOperator", {
        enumerable: !0,
        get: function() {
          return _index.tsTypeOperator;
        }
      }), Object.defineProperty(exports, "TSTypeParameter", {
        enumerable: !0,
        get: function() {
          return _index.tsTypeParameter;
        }
      }), Object.defineProperty(exports, "TSTypeParameterDeclaration", {
        enumerable: !0,
        get: function() {
          return _index.tsTypeParameterDeclaration;
        }
      }), Object.defineProperty(exports, "TSTypeParameterInstantiation", {
        enumerable: !0,
        get: function() {
          return _index.tsTypeParameterInstantiation;
        }
      }), Object.defineProperty(exports, "TSTypePredicate", {
        enumerable: !0,
        get: function() {
          return _index.tsTypePredicate;
        }
      }), Object.defineProperty(exports, "TSTypeQuery", {
        enumerable: !0,
        get: function() {
          return _index.tsTypeQuery;
        }
      }), Object.defineProperty(exports, "TSTypeReference", {
        enumerable: !0,
        get: function() {
          return _index.tsTypeReference;
        }
      }), Object.defineProperty(exports, "TSUndefinedKeyword", {
        enumerable: !0,
        get: function() {
          return _index.tsUndefinedKeyword;
        }
      }), Object.defineProperty(exports, "TSUnionType", {
        enumerable: !0,
        get: function() {
          return _index.tsUnionType;
        }
      }), Object.defineProperty(exports, "TSUnknownKeyword", {
        enumerable: !0,
        get: function() {
          return _index.tsUnknownKeyword;
        }
      }), Object.defineProperty(exports, "TSVoidKeyword", {
        enumerable: !0,
        get: function() {
          return _index.tsVoidKeyword;
        }
      }), Object.defineProperty(exports, "TaggedTemplateExpression", {
        enumerable: !0,
        get: function() {
          return _index.taggedTemplateExpression;
        }
      }), Object.defineProperty(exports, "TemplateElement", {
        enumerable: !0,
        get: function() {
          return _index.templateElement;
        }
      }), Object.defineProperty(exports, "TemplateLiteral", {
        enumerable: !0,
        get: function() {
          return _index.templateLiteral;
        }
      }), Object.defineProperty(exports, "ThisExpression", {
        enumerable: !0,
        get: function() {
          return _index.thisExpression;
        }
      }), Object.defineProperty(exports, "ThisTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _index.thisTypeAnnotation;
        }
      }), Object.defineProperty(exports, "ThrowStatement", {
        enumerable: !0,
        get: function() {
          return _index.throwStatement;
        }
      }), Object.defineProperty(exports, "TopicReference", {
        enumerable: !0,
        get: function() {
          return _index.topicReference;
        }
      }), Object.defineProperty(exports, "TryStatement", {
        enumerable: !0,
        get: function() {
          return _index.tryStatement;
        }
      }), Object.defineProperty(exports, "TupleExpression", {
        enumerable: !0,
        get: function() {
          return _index.tupleExpression;
        }
      }), Object.defineProperty(exports, "TupleTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _index.tupleTypeAnnotation;
        }
      }), Object.defineProperty(exports, "TypeAlias", {
        enumerable: !0,
        get: function() {
          return _index.typeAlias;
        }
      }), Object.defineProperty(exports, "TypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _index.typeAnnotation;
        }
      }), Object.defineProperty(exports, "TypeCastExpression", {
        enumerable: !0,
        get: function() {
          return _index.typeCastExpression;
        }
      }), Object.defineProperty(exports, "TypeParameter", {
        enumerable: !0,
        get: function() {
          return _index.typeParameter;
        }
      }), Object.defineProperty(exports, "TypeParameterDeclaration", {
        enumerable: !0,
        get: function() {
          return _index.typeParameterDeclaration;
        }
      }), Object.defineProperty(exports, "TypeParameterInstantiation", {
        enumerable: !0,
        get: function() {
          return _index.typeParameterInstantiation;
        }
      }), Object.defineProperty(exports, "TypeofTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _index.typeofTypeAnnotation;
        }
      }), Object.defineProperty(exports, "UnaryExpression", {
        enumerable: !0,
        get: function() {
          return _index.unaryExpression;
        }
      }), Object.defineProperty(exports, "UnionTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _index.unionTypeAnnotation;
        }
      }), Object.defineProperty(exports, "UpdateExpression", {
        enumerable: !0,
        get: function() {
          return _index.updateExpression;
        }
      }), Object.defineProperty(exports, "V8IntrinsicIdentifier", {
        enumerable: !0,
        get: function() {
          return _index.v8IntrinsicIdentifier;
        }
      }), Object.defineProperty(exports, "VariableDeclaration", {
        enumerable: !0,
        get: function() {
          return _index.variableDeclaration;
        }
      }), Object.defineProperty(exports, "VariableDeclarator", {
        enumerable: !0,
        get: function() {
          return _index.variableDeclarator;
        }
      }), Object.defineProperty(exports, "Variance", {
        enumerable: !0,
        get: function() {
          return _index.variance;
        }
      }), Object.defineProperty(exports, "VoidTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _index.voidTypeAnnotation;
        }
      }), Object.defineProperty(exports, "WhileStatement", {
        enumerable: !0,
        get: function() {
          return _index.whileStatement;
        }
      }), Object.defineProperty(exports, "WithStatement", {
        enumerable: !0,
        get: function() {
          return _index.withStatement;
        }
      }), Object.defineProperty(exports, "YieldExpression", {
        enumerable: !0,
        get: function() {
          return _index.yieldExpression;
        }
      });
      var _index = __webpack_require__(4391);
    },
    8478: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(node) {
        const elements = [];
        for (let i = 0; i < node.children.length; i++) {
          let child = node.children[i];
          (0, _generated.isJSXText)(child) ? (0, _cleanJSXElementLiteralChild.default)(child, elements) : ((0, 
          _generated.isJSXExpressionContainer)(child) && (child = child.expression), (0, _generated.isJSXEmptyExpression)(child) || elements.push(child));
        }
        return elements;
      };
      var _generated = __webpack_require__(4746), _cleanJSXElementLiteralChild = __webpack_require__(5835);
    },
    4571: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(typeAnnotations) {
        const types = typeAnnotations.map((type => type.typeAnnotation)), flattened = (0, 
        _removeTypeDuplicates.default)(types);
        return 1 === flattened.length ? flattened[0] : (0, _generated.tsUnionType)(flattened);
      };
      var _generated = __webpack_require__(4391), _removeTypeDuplicates = __webpack_require__(1954);
    },
    2363: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(node) {
        return (0, _cloneNode.default)(node, !1);
      };
      var _cloneNode = __webpack_require__(6209);
    },
    6953: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(node) {
        return (0, _cloneNode.default)(node);
      };
      var _cloneNode = __webpack_require__(6209);
    },
    863: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(node) {
        return (0, _cloneNode.default)(node, !0, !0);
      };
      var _cloneNode = __webpack_require__(6209);
    },
    6209: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = cloneNode;
      var _definitions = __webpack_require__(6507), _generated = __webpack_require__(4746);
      const has = Function.call.bind(Object.prototype.hasOwnProperty);
      function cloneIfNode(obj, deep, withoutLoc) {
        return obj && "string" == typeof obj.type ? cloneNode(obj, deep, withoutLoc) : obj;
      }
      function cloneIfNodeOrArray(obj, deep, withoutLoc) {
        return Array.isArray(obj) ? obj.map((node => cloneIfNode(node, deep, withoutLoc))) : cloneIfNode(obj, deep, withoutLoc);
      }
      function cloneNode(node, deep = !0, withoutLoc = !1) {
        if (!node) return node;
        const {type} = node, newNode = {
          type: node.type
        };
        if ((0, _generated.isIdentifier)(node)) newNode.name = node.name, has(node, "optional") && "boolean" == typeof node.optional && (newNode.optional = node.optional), 
        has(node, "typeAnnotation") && (newNode.typeAnnotation = deep ? cloneIfNodeOrArray(node.typeAnnotation, !0, withoutLoc) : node.typeAnnotation); else {
          if (!has(_definitions.NODE_FIELDS, type)) throw new Error(`Unknown node type: "${type}"`);
          for (const field of Object.keys(_definitions.NODE_FIELDS[type])) has(node, field) && (newNode[field] = deep ? (0, 
          _generated.isFile)(node) && "comments" === field ? maybeCloneComments(node.comments, deep, withoutLoc) : cloneIfNodeOrArray(node[field], !0, withoutLoc) : node[field]);
        }
        return has(node, "loc") && (newNode.loc = withoutLoc ? null : node.loc), has(node, "leadingComments") && (newNode.leadingComments = maybeCloneComments(node.leadingComments, deep, withoutLoc)), 
        has(node, "innerComments") && (newNode.innerComments = maybeCloneComments(node.innerComments, deep, withoutLoc)), 
        has(node, "trailingComments") && (newNode.trailingComments = maybeCloneComments(node.trailingComments, deep, withoutLoc)), 
        has(node, "extra") && (newNode.extra = Object.assign({}, node.extra)), newNode;
      }
      function maybeCloneComments(comments, deep, withoutLoc) {
        return comments && deep ? comments.map((({type, value, loc}) => withoutLoc ? {
          type,
          value,
          loc: null
        } : {
          type,
          value,
          loc
        })) : comments;
      }
    },
    748: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(node) {
        return (0, _cloneNode.default)(node, !1, !0);
      };
      var _cloneNode = __webpack_require__(6209);
    },
    9529: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(node, type, content, line) {
        return (0, _addComments.default)(node, type, [ {
          type: line ? "CommentLine" : "CommentBlock",
          value: content
        } ]);
      };
      var _addComments = __webpack_require__(6182);
    },
    6182: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(node, type, comments) {
        if (!comments || !node) return node;
        const key = `${type}Comments`;
        node[key] ? "leading" === type ? node[key] = comments.concat(node[key]) : node[key].push(...comments) : node[key] = comments;
        return node;
      };
    },
    6455: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(child, parent) {
        (0, _inherit.default)("innerComments", child, parent);
      };
      var _inherit = __webpack_require__(8834);
    },
    1835: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(child, parent) {
        (0, _inherit.default)("leadingComments", child, parent);
      };
      var _inherit = __webpack_require__(8834);
    },
    9653: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(child, parent) {
        (0, _inherit.default)("trailingComments", child, parent);
      };
      var _inherit = __webpack_require__(8834);
    },
    9564: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(child, parent) {
        return (0, _inheritTrailingComments.default)(child, parent), (0, _inheritLeadingComments.default)(child, parent), 
        (0, _inheritInnerComments.default)(child, parent), child;
      };
      var _inheritTrailingComments = __webpack_require__(9653), _inheritLeadingComments = __webpack_require__(1835), _inheritInnerComments = __webpack_require__(6455);
    },
    659: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(node) {
        return _constants.COMMENT_KEYS.forEach((key => {
          node[key] = null;
        })), node;
      };
      var _constants = __webpack_require__(6325);
    },
    8267: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.WHILE_TYPES = exports.USERWHITESPACABLE_TYPES = exports.UNARYLIKE_TYPES = exports.TYPESCRIPT_TYPES = exports.TSTYPE_TYPES = exports.TSTYPEELEMENT_TYPES = exports.TSENTITYNAME_TYPES = exports.TSBASETYPE_TYPES = exports.TERMINATORLESS_TYPES = exports.STATEMENT_TYPES = exports.STANDARDIZED_TYPES = exports.SCOPABLE_TYPES = exports.PUREISH_TYPES = exports.PROPERTY_TYPES = exports.PRIVATE_TYPES = exports.PATTERN_TYPES = exports.PATTERNLIKE_TYPES = exports.OBJECTMEMBER_TYPES = exports.MODULESPECIFIER_TYPES = exports.MODULEDECLARATION_TYPES = exports.MISCELLANEOUS_TYPES = exports.METHOD_TYPES = exports.LVAL_TYPES = exports.LOOP_TYPES = exports.LITERAL_TYPES = exports.JSX_TYPES = exports.IMMUTABLE_TYPES = exports.FUNCTION_TYPES = exports.FUNCTIONPARENT_TYPES = exports.FOR_TYPES = exports.FORXSTATEMENT_TYPES = exports.FLOW_TYPES = exports.FLOWTYPE_TYPES = exports.FLOWPREDICATE_TYPES = exports.FLOWDECLARATION_TYPES = exports.FLOWBASEANNOTATION_TYPES = exports.EXPRESSION_TYPES = exports.EXPRESSIONWRAPPER_TYPES = exports.EXPORTDECLARATION_TYPES = exports.ENUMMEMBER_TYPES = exports.ENUMBODY_TYPES = exports.DECLARATION_TYPES = exports.CONDITIONAL_TYPES = exports.COMPLETIONSTATEMENT_TYPES = exports.CLASS_TYPES = exports.BLOCK_TYPES = exports.BLOCKPARENT_TYPES = exports.BINARY_TYPES = exports.ACCESSOR_TYPES = void 0;
      var _definitions = __webpack_require__(6507);
      const STANDARDIZED_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Standardized;
      exports.STANDARDIZED_TYPES = STANDARDIZED_TYPES;
      const EXPRESSION_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Expression;
      exports.EXPRESSION_TYPES = EXPRESSION_TYPES;
      const BINARY_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Binary;
      exports.BINARY_TYPES = BINARY_TYPES;
      const SCOPABLE_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Scopable;
      exports.SCOPABLE_TYPES = SCOPABLE_TYPES;
      const BLOCKPARENT_TYPES = _definitions.FLIPPED_ALIAS_KEYS.BlockParent;
      exports.BLOCKPARENT_TYPES = BLOCKPARENT_TYPES;
      const BLOCK_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Block;
      exports.BLOCK_TYPES = BLOCK_TYPES;
      const STATEMENT_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Statement;
      exports.STATEMENT_TYPES = STATEMENT_TYPES;
      const TERMINATORLESS_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Terminatorless;
      exports.TERMINATORLESS_TYPES = TERMINATORLESS_TYPES;
      const COMPLETIONSTATEMENT_TYPES = _definitions.FLIPPED_ALIAS_KEYS.CompletionStatement;
      exports.COMPLETIONSTATEMENT_TYPES = COMPLETIONSTATEMENT_TYPES;
      const CONDITIONAL_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Conditional;
      exports.CONDITIONAL_TYPES = CONDITIONAL_TYPES;
      const LOOP_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Loop;
      exports.LOOP_TYPES = LOOP_TYPES;
      const WHILE_TYPES = _definitions.FLIPPED_ALIAS_KEYS.While;
      exports.WHILE_TYPES = WHILE_TYPES;
      const EXPRESSIONWRAPPER_TYPES = _definitions.FLIPPED_ALIAS_KEYS.ExpressionWrapper;
      exports.EXPRESSIONWRAPPER_TYPES = EXPRESSIONWRAPPER_TYPES;
      const FOR_TYPES = _definitions.FLIPPED_ALIAS_KEYS.For;
      exports.FOR_TYPES = FOR_TYPES;
      const FORXSTATEMENT_TYPES = _definitions.FLIPPED_ALIAS_KEYS.ForXStatement;
      exports.FORXSTATEMENT_TYPES = FORXSTATEMENT_TYPES;
      const FUNCTION_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Function;
      exports.FUNCTION_TYPES = FUNCTION_TYPES;
      const FUNCTIONPARENT_TYPES = _definitions.FLIPPED_ALIAS_KEYS.FunctionParent;
      exports.FUNCTIONPARENT_TYPES = FUNCTIONPARENT_TYPES;
      const PUREISH_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Pureish;
      exports.PUREISH_TYPES = PUREISH_TYPES;
      const DECLARATION_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Declaration;
      exports.DECLARATION_TYPES = DECLARATION_TYPES;
      const PATTERNLIKE_TYPES = _definitions.FLIPPED_ALIAS_KEYS.PatternLike;
      exports.PATTERNLIKE_TYPES = PATTERNLIKE_TYPES;
      const LVAL_TYPES = _definitions.FLIPPED_ALIAS_KEYS.LVal;
      exports.LVAL_TYPES = LVAL_TYPES;
      const TSENTITYNAME_TYPES = _definitions.FLIPPED_ALIAS_KEYS.TSEntityName;
      exports.TSENTITYNAME_TYPES = TSENTITYNAME_TYPES;
      const LITERAL_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Literal;
      exports.LITERAL_TYPES = LITERAL_TYPES;
      const IMMUTABLE_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Immutable;
      exports.IMMUTABLE_TYPES = IMMUTABLE_TYPES;
      const USERWHITESPACABLE_TYPES = _definitions.FLIPPED_ALIAS_KEYS.UserWhitespacable;
      exports.USERWHITESPACABLE_TYPES = USERWHITESPACABLE_TYPES;
      const METHOD_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Method;
      exports.METHOD_TYPES = METHOD_TYPES;
      const OBJECTMEMBER_TYPES = _definitions.FLIPPED_ALIAS_KEYS.ObjectMember;
      exports.OBJECTMEMBER_TYPES = OBJECTMEMBER_TYPES;
      const PROPERTY_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Property;
      exports.PROPERTY_TYPES = PROPERTY_TYPES;
      const UNARYLIKE_TYPES = _definitions.FLIPPED_ALIAS_KEYS.UnaryLike;
      exports.UNARYLIKE_TYPES = UNARYLIKE_TYPES;
      const PATTERN_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Pattern;
      exports.PATTERN_TYPES = PATTERN_TYPES;
      const CLASS_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Class;
      exports.CLASS_TYPES = CLASS_TYPES;
      const MODULEDECLARATION_TYPES = _definitions.FLIPPED_ALIAS_KEYS.ModuleDeclaration;
      exports.MODULEDECLARATION_TYPES = MODULEDECLARATION_TYPES;
      const EXPORTDECLARATION_TYPES = _definitions.FLIPPED_ALIAS_KEYS.ExportDeclaration;
      exports.EXPORTDECLARATION_TYPES = EXPORTDECLARATION_TYPES;
      const MODULESPECIFIER_TYPES = _definitions.FLIPPED_ALIAS_KEYS.ModuleSpecifier;
      exports.MODULESPECIFIER_TYPES = MODULESPECIFIER_TYPES;
      const ACCESSOR_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Accessor;
      exports.ACCESSOR_TYPES = ACCESSOR_TYPES;
      const PRIVATE_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Private;
      exports.PRIVATE_TYPES = PRIVATE_TYPES;
      const FLOW_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Flow;
      exports.FLOW_TYPES = FLOW_TYPES;
      const FLOWTYPE_TYPES = _definitions.FLIPPED_ALIAS_KEYS.FlowType;
      exports.FLOWTYPE_TYPES = FLOWTYPE_TYPES;
      const FLOWBASEANNOTATION_TYPES = _definitions.FLIPPED_ALIAS_KEYS.FlowBaseAnnotation;
      exports.FLOWBASEANNOTATION_TYPES = FLOWBASEANNOTATION_TYPES;
      const FLOWDECLARATION_TYPES = _definitions.FLIPPED_ALIAS_KEYS.FlowDeclaration;
      exports.FLOWDECLARATION_TYPES = FLOWDECLARATION_TYPES;
      const FLOWPREDICATE_TYPES = _definitions.FLIPPED_ALIAS_KEYS.FlowPredicate;
      exports.FLOWPREDICATE_TYPES = FLOWPREDICATE_TYPES;
      const ENUMBODY_TYPES = _definitions.FLIPPED_ALIAS_KEYS.EnumBody;
      exports.ENUMBODY_TYPES = ENUMBODY_TYPES;
      const ENUMMEMBER_TYPES = _definitions.FLIPPED_ALIAS_KEYS.EnumMember;
      exports.ENUMMEMBER_TYPES = ENUMMEMBER_TYPES;
      const JSX_TYPES = _definitions.FLIPPED_ALIAS_KEYS.JSX;
      exports.JSX_TYPES = JSX_TYPES;
      const MISCELLANEOUS_TYPES = _definitions.FLIPPED_ALIAS_KEYS.Miscellaneous;
      exports.MISCELLANEOUS_TYPES = MISCELLANEOUS_TYPES;
      const TYPESCRIPT_TYPES = _definitions.FLIPPED_ALIAS_KEYS.TypeScript;
      exports.TYPESCRIPT_TYPES = TYPESCRIPT_TYPES;
      const TSTYPEELEMENT_TYPES = _definitions.FLIPPED_ALIAS_KEYS.TSTypeElement;
      exports.TSTYPEELEMENT_TYPES = TSTYPEELEMENT_TYPES;
      const TSTYPE_TYPES = _definitions.FLIPPED_ALIAS_KEYS.TSType;
      exports.TSTYPE_TYPES = TSTYPE_TYPES;
      const TSBASETYPE_TYPES = _definitions.FLIPPED_ALIAS_KEYS.TSBaseType;
      exports.TSBASETYPE_TYPES = TSBASETYPE_TYPES;
    },
    6325: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.UPDATE_OPERATORS = exports.UNARY_OPERATORS = exports.STRING_UNARY_OPERATORS = exports.STATEMENT_OR_BLOCK_KEYS = exports.NUMBER_UNARY_OPERATORS = exports.NUMBER_BINARY_OPERATORS = exports.NOT_LOCAL_BINDING = exports.LOGICAL_OPERATORS = exports.INHERIT_KEYS = exports.FOR_INIT_KEYS = exports.FLATTENABLE_KEYS = exports.EQUALITY_BINARY_OPERATORS = exports.COMPARISON_BINARY_OPERATORS = exports.COMMENT_KEYS = exports.BOOLEAN_UNARY_OPERATORS = exports.BOOLEAN_NUMBER_BINARY_OPERATORS = exports.BOOLEAN_BINARY_OPERATORS = exports.BLOCK_SCOPED_SYMBOL = exports.BINARY_OPERATORS = exports.ASSIGNMENT_OPERATORS = void 0;
      exports.STATEMENT_OR_BLOCK_KEYS = [ "consequent", "body", "alternate" ];
      exports.FLATTENABLE_KEYS = [ "body", "expressions" ];
      exports.FOR_INIT_KEYS = [ "left", "init" ];
      exports.COMMENT_KEYS = [ "leadingComments", "trailingComments", "innerComments" ];
      const LOGICAL_OPERATORS = [ "||", "&&", "??" ];
      exports.LOGICAL_OPERATORS = LOGICAL_OPERATORS;
      exports.UPDATE_OPERATORS = [ "++", "--" ];
      const BOOLEAN_NUMBER_BINARY_OPERATORS = [ ">", "<", ">=", "<=" ];
      exports.BOOLEAN_NUMBER_BINARY_OPERATORS = BOOLEAN_NUMBER_BINARY_OPERATORS;
      const EQUALITY_BINARY_OPERATORS = [ "==", "===", "!=", "!==" ];
      exports.EQUALITY_BINARY_OPERATORS = EQUALITY_BINARY_OPERATORS;
      const COMPARISON_BINARY_OPERATORS = [ ...EQUALITY_BINARY_OPERATORS, "in", "instanceof" ];
      exports.COMPARISON_BINARY_OPERATORS = COMPARISON_BINARY_OPERATORS;
      const BOOLEAN_BINARY_OPERATORS = [ ...COMPARISON_BINARY_OPERATORS, ...BOOLEAN_NUMBER_BINARY_OPERATORS ];
      exports.BOOLEAN_BINARY_OPERATORS = BOOLEAN_BINARY_OPERATORS;
      const NUMBER_BINARY_OPERATORS = [ "-", "/", "%", "*", "**", "&", "|", ">>", ">>>", "<<", "^" ];
      exports.NUMBER_BINARY_OPERATORS = NUMBER_BINARY_OPERATORS;
      const BINARY_OPERATORS = [ "+", ...NUMBER_BINARY_OPERATORS, ...BOOLEAN_BINARY_OPERATORS ];
      exports.BINARY_OPERATORS = BINARY_OPERATORS;
      const ASSIGNMENT_OPERATORS = [ "=", "+=", ...NUMBER_BINARY_OPERATORS.map((op => op + "=")), ...LOGICAL_OPERATORS.map((op => op + "=")) ];
      exports.ASSIGNMENT_OPERATORS = ASSIGNMENT_OPERATORS;
      const BOOLEAN_UNARY_OPERATORS = [ "delete", "!" ];
      exports.BOOLEAN_UNARY_OPERATORS = BOOLEAN_UNARY_OPERATORS;
      const NUMBER_UNARY_OPERATORS = [ "+", "-", "~" ];
      exports.NUMBER_UNARY_OPERATORS = NUMBER_UNARY_OPERATORS;
      const STRING_UNARY_OPERATORS = [ "typeof" ];
      exports.STRING_UNARY_OPERATORS = STRING_UNARY_OPERATORS;
      const UNARY_OPERATORS = [ "void", "throw", ...BOOLEAN_UNARY_OPERATORS, ...NUMBER_UNARY_OPERATORS, ...STRING_UNARY_OPERATORS ];
      exports.UNARY_OPERATORS = UNARY_OPERATORS;
      exports.INHERIT_KEYS = {
        optional: [ "typeAnnotation", "typeParameters", "returnType" ],
        force: [ "start", "loc", "end" ]
      };
      const BLOCK_SCOPED_SYMBOL = Symbol.for("var used to be block scoped");
      exports.BLOCK_SCOPED_SYMBOL = BLOCK_SCOPED_SYMBOL;
      const NOT_LOCAL_BINDING = Symbol.for("should not be considered a local binding");
      exports.NOT_LOCAL_BINDING = NOT_LOCAL_BINDING;
    },
    4315: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(node, key = "body") {
        return node[key] = (0, _toBlock.default)(node[key], node);
      };
      var _toBlock = __webpack_require__(9276);
    },
    696: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function gatherSequenceExpressions(nodes, scope, declars) {
        const exprs = [];
        let ensureLastUndefined = !0;
        for (const node of nodes) if ((0, _generated.isEmptyStatement)(node) || (ensureLastUndefined = !1), 
        (0, _generated.isExpression)(node)) exprs.push(node); else if ((0, _generated.isExpressionStatement)(node)) exprs.push(node.expression); else if ((0, 
        _generated.isVariableDeclaration)(node)) {
          if ("var" !== node.kind) return;
          for (const declar of node.declarations) {
            const bindings = (0, _getBindingIdentifiers.default)(declar);
            for (const key of Object.keys(bindings)) declars.push({
              kind: node.kind,
              id: (0, _cloneNode.default)(bindings[key])
            });
            declar.init && exprs.push((0, _generated2.assignmentExpression)("=", declar.id, declar.init));
          }
          ensureLastUndefined = !0;
        } else if ((0, _generated.isIfStatement)(node)) {
          const consequent = node.consequent ? gatherSequenceExpressions([ node.consequent ], scope, declars) : scope.buildUndefinedNode(), alternate = node.alternate ? gatherSequenceExpressions([ node.alternate ], scope, declars) : scope.buildUndefinedNode();
          if (!consequent || !alternate) return;
          exprs.push((0, _generated2.conditionalExpression)(node.test, consequent, alternate));
        } else if ((0, _generated.isBlockStatement)(node)) {
          const body = gatherSequenceExpressions(node.body, scope, declars);
          if (!body) return;
          exprs.push(body);
        } else {
          if (!(0, _generated.isEmptyStatement)(node)) return;
          0 === nodes.indexOf(node) && (ensureLastUndefined = !0);
        }
        ensureLastUndefined && exprs.push(scope.buildUndefinedNode());
        return 1 === exprs.length ? exprs[0] : (0, _generated2.sequenceExpression)(exprs);
      };
      var _getBindingIdentifiers = __webpack_require__(1477), _generated = __webpack_require__(4746), _generated2 = __webpack_require__(4391), _cloneNode = __webpack_require__(6209);
    },
    8316: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(name) {
        "eval" !== (name = (0, _toIdentifier.default)(name)) && "arguments" !== name || (name = "_" + name);
        return name;
      };
      var _toIdentifier = __webpack_require__(1309);
    },
    9276: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(node, parent) {
        if ((0, _generated.isBlockStatement)(node)) return node;
        let blockNodes = [];
        (0, _generated.isEmptyStatement)(node) ? blockNodes = [] : ((0, _generated.isStatement)(node) || (node = (0, 
        _generated.isFunction)(parent) ? (0, _generated2.returnStatement)(node) : (0, _generated2.expressionStatement)(node)), 
        blockNodes = [ node ]);
        return (0, _generated2.blockStatement)(blockNodes);
      };
      var _generated = __webpack_require__(4746), _generated2 = __webpack_require__(4391);
    },
    9434: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(node, key = node.key || node.property) {
        !node.computed && (0, _generated.isIdentifier)(key) && (key = (0, _generated2.stringLiteral)(key.name));
        return key;
      };
      var _generated = __webpack_require__(4746), _generated2 = __webpack_require__(4391);
    },
    3348: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      var _generated = __webpack_require__(4746), _default = function(node) {
        (0, _generated.isExpressionStatement)(node) && (node = node.expression);
        if ((0, _generated.isExpression)(node)) return node;
        (0, _generated.isClass)(node) ? node.type = "ClassExpression" : (0, _generated.isFunction)(node) && (node.type = "FunctionExpression");
        if (!(0, _generated.isExpression)(node)) throw new Error(`cannot turn ${node.type} to an expression`);
        return node;
      };
      exports.default = _default;
    },
    1309: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(input) {
        input += "";
        let name = "";
        for (const c of input) name += (0, _helperValidatorIdentifier.isIdentifierChar)(c.codePointAt(0)) ? c : "-";
        name = name.replace(/^[-0-9]+/, ""), name = name.replace(/[-\s]+(.)?/g, (function(match, c) {
          return c ? c.toUpperCase() : "";
        })), (0, _isValidIdentifier.default)(name) || (name = `_${name}`);
        return name || "_";
      };
      var _isValidIdentifier = __webpack_require__(3045), _helperValidatorIdentifier = __webpack_require__(720);
    },
    510: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = toKeyAlias;
      var _generated = __webpack_require__(4746), _cloneNode = __webpack_require__(6209), _removePropertiesDeep = __webpack_require__(4936);
      function toKeyAlias(node, key = node.key) {
        let alias;
        return "method" === node.kind ? toKeyAlias.increment() + "" : (alias = (0, _generated.isIdentifier)(key) ? key.name : (0, 
        _generated.isStringLiteral)(key) ? JSON.stringify(key.value) : JSON.stringify((0, 
        _removePropertiesDeep.default)((0, _cloneNode.default)(key))), node.computed && (alias = `[${alias}]`), 
        node.static && (alias = `static:${alias}`), alias);
      }
      toKeyAlias.uid = 0, toKeyAlias.increment = function() {
        return toKeyAlias.uid >= Number.MAX_SAFE_INTEGER ? toKeyAlias.uid = 0 : toKeyAlias.uid++;
      };
    },
    1435: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(nodes, scope) {
        if (null == nodes || !nodes.length) return;
        const declars = [], result = (0, _gatherSequenceExpressions.default)(nodes, scope, declars);
        if (!result) return;
        for (const declar of declars) scope.push(declar);
        return result;
      };
      var _gatherSequenceExpressions = __webpack_require__(696);
    },
    2307: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      var _generated = __webpack_require__(4746), _generated2 = __webpack_require__(4391), _default = function(node, ignore) {
        if ((0, _generated.isStatement)(node)) return node;
        let newType, mustHaveId = !1;
        if ((0, _generated.isClass)(node)) mustHaveId = !0, newType = "ClassDeclaration"; else if ((0, 
        _generated.isFunction)(node)) mustHaveId = !0, newType = "FunctionDeclaration"; else if ((0, 
        _generated.isAssignmentExpression)(node)) return (0, _generated2.expressionStatement)(node);
        mustHaveId && !node.id && (newType = !1);
        if (!newType) {
          if (ignore) return !1;
          throw new Error(`cannot turn ${node.type} to a statement`);
        }
        return node.type = newType, node;
      };
      exports.default = _default;
    },
    6794: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      var _isValidIdentifier = __webpack_require__(3045), _generated = __webpack_require__(4391), _default = function valueToNode(value) {
        if (void 0 === value) return (0, _generated.identifier)("undefined");
        if (!0 === value || !1 === value) return (0, _generated.booleanLiteral)(value);
        if (null === value) return (0, _generated.nullLiteral)();
        if ("string" == typeof value) return (0, _generated.stringLiteral)(value);
        if ("number" == typeof value) {
          let result;
          if (Number.isFinite(value)) result = (0, _generated.numericLiteral)(Math.abs(value)); else {
            let numerator;
            numerator = Number.isNaN(value) ? (0, _generated.numericLiteral)(0) : (0, _generated.numericLiteral)(1), 
            result = (0, _generated.binaryExpression)("/", numerator, (0, _generated.numericLiteral)(0));
          }
          return (value < 0 || Object.is(value, -0)) && (result = (0, _generated.unaryExpression)("-", result)), 
          result;
        }
        if (function(value) {
          return "[object RegExp]" === objectToString(value);
        }(value)) {
          const pattern = value.source, flags = value.toString().match(/\/([a-z]+|)$/)[1];
          return (0, _generated.regExpLiteral)(pattern, flags);
        }
        if (Array.isArray(value)) return (0, _generated.arrayExpression)(value.map(valueToNode));
        if (function(value) {
          if ("object" != typeof value || null === value || "[object Object]" !== Object.prototype.toString.call(value)) return !1;
          const proto = Object.getPrototypeOf(value);
          return null === proto || null === Object.getPrototypeOf(proto);
        }(value)) {
          const props = [];
          for (const key of Object.keys(value)) {
            let nodeKey;
            nodeKey = (0, _isValidIdentifier.default)(key) ? (0, _generated.identifier)(key) : (0, 
            _generated.stringLiteral)(key), props.push((0, _generated.objectProperty)(nodeKey, valueToNode(value[key])));
          }
          return (0, _generated.objectExpression)(props);
        }
        throw new Error("don't know how to turn this value into a node");
      };
      exports.default = _default;
      const objectToString = Function.call.bind(Object.prototype.toString);
    },
    4457: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.patternLikeCommon = exports.functionTypeAnnotationCommon = exports.functionDeclarationCommon = exports.functionCommon = exports.classMethodOrPropertyCommon = exports.classMethodOrDeclareMethodCommon = void 0;
      var _is = __webpack_require__(7275), _isValidIdentifier = __webpack_require__(3045), _helperValidatorIdentifier = __webpack_require__(720), _constants = __webpack_require__(6325), _utils = __webpack_require__(4913);
      const defineType = (0, _utils.defineAliasedType)("Standardized");
      defineType("ArrayExpression", {
        fields: {
          elements: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeOrValueType)("null", "Expression", "SpreadElement"))),
            default: process.env.BABEL_TYPES_8_BREAKING ? void 0 : []
          }
        },
        visitor: [ "elements" ],
        aliases: [ "Expression" ]
      }), defineType("AssignmentExpression", {
        fields: {
          operator: {
            validate: function() {
              if (!process.env.BABEL_TYPES_8_BREAKING) return (0, _utils.assertValueType)("string");
              const identifier = (0, _utils.assertOneOf)(..._constants.ASSIGNMENT_OPERATORS), pattern = (0, 
              _utils.assertOneOf)("=");
              return function(node, key, val) {
                ((0, _is.default)("Pattern", node.left) ? pattern : identifier)(node, key, val);
              };
            }()
          },
          left: {
            validate: process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertNodeType)("Identifier", "MemberExpression", "ArrayPattern", "ObjectPattern") : (0, 
            _utils.assertNodeType)("LVal")
          },
          right: {
            validate: (0, _utils.assertNodeType)("Expression")
          }
        },
        builder: [ "operator", "left", "right" ],
        visitor: [ "left", "right" ],
        aliases: [ "Expression" ]
      }), defineType("BinaryExpression", {
        builder: [ "operator", "left", "right" ],
        fields: {
          operator: {
            validate: (0, _utils.assertOneOf)(..._constants.BINARY_OPERATORS)
          },
          left: {
            validate: function() {
              const expression = (0, _utils.assertNodeType)("Expression"), inOp = (0, _utils.assertNodeType)("Expression", "PrivateName"), validator = function(node, key, val) {
                ("in" === node.operator ? inOp : expression)(node, key, val);
              };
              return validator.oneOfNodeTypes = [ "Expression", "PrivateName" ], validator;
            }()
          },
          right: {
            validate: (0, _utils.assertNodeType)("Expression")
          }
        },
        visitor: [ "left", "right" ],
        aliases: [ "Binary", "Expression" ]
      }), defineType("InterpreterDirective", {
        builder: [ "value" ],
        fields: {
          value: {
            validate: (0, _utils.assertValueType)("string")
          }
        }
      }), defineType("Directive", {
        visitor: [ "value" ],
        fields: {
          value: {
            validate: (0, _utils.assertNodeType)("DirectiveLiteral")
          }
        }
      }), defineType("DirectiveLiteral", {
        builder: [ "value" ],
        fields: {
          value: {
            validate: (0, _utils.assertValueType)("string")
          }
        }
      }), defineType("BlockStatement", {
        builder: [ "body", "directives" ],
        visitor: [ "directives", "body" ],
        fields: {
          directives: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("Directive"))),
            default: []
          },
          body: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("Statement")))
          }
        },
        aliases: [ "Scopable", "BlockParent", "Block", "Statement" ]
      }), defineType("BreakStatement", {
        visitor: [ "label" ],
        fields: {
          label: {
            validate: (0, _utils.assertNodeType)("Identifier"),
            optional: !0
          }
        },
        aliases: [ "Statement", "Terminatorless", "CompletionStatement" ]
      }), defineType("CallExpression", {
        visitor: [ "callee", "arguments", "typeParameters", "typeArguments" ],
        builder: [ "callee", "arguments" ],
        aliases: [ "Expression" ],
        fields: Object.assign({
          callee: {
            validate: (0, _utils.assertNodeType)("Expression", "V8IntrinsicIdentifier")
          },
          arguments: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("Expression", "SpreadElement", "JSXNamespacedName", "ArgumentPlaceholder")))
          }
        }, process.env.BABEL_TYPES_8_BREAKING ? {} : {
          optional: {
            validate: (0, _utils.assertOneOf)(!0, !1),
            optional: !0
          }
        }, {
          typeArguments: {
            validate: (0, _utils.assertNodeType)("TypeParameterInstantiation"),
            optional: !0
          },
          typeParameters: {
            validate: (0, _utils.assertNodeType)("TSTypeParameterInstantiation"),
            optional: !0
          }
        })
      }), defineType("CatchClause", {
        visitor: [ "param", "body" ],
        fields: {
          param: {
            validate: (0, _utils.assertNodeType)("Identifier", "ArrayPattern", "ObjectPattern"),
            optional: !0
          },
          body: {
            validate: (0, _utils.assertNodeType)("BlockStatement")
          }
        },
        aliases: [ "Scopable", "BlockParent" ]
      }), defineType("ConditionalExpression", {
        visitor: [ "test", "consequent", "alternate" ],
        fields: {
          test: {
            validate: (0, _utils.assertNodeType)("Expression")
          },
          consequent: {
            validate: (0, _utils.assertNodeType)("Expression")
          },
          alternate: {
            validate: (0, _utils.assertNodeType)("Expression")
          }
        },
        aliases: [ "Expression", "Conditional" ]
      }), defineType("ContinueStatement", {
        visitor: [ "label" ],
        fields: {
          label: {
            validate: (0, _utils.assertNodeType)("Identifier"),
            optional: !0
          }
        },
        aliases: [ "Statement", "Terminatorless", "CompletionStatement" ]
      }), defineType("DebuggerStatement", {
        aliases: [ "Statement" ]
      }), defineType("DoWhileStatement", {
        visitor: [ "test", "body" ],
        fields: {
          test: {
            validate: (0, _utils.assertNodeType)("Expression")
          },
          body: {
            validate: (0, _utils.assertNodeType)("Statement")
          }
        },
        aliases: [ "Statement", "BlockParent", "Loop", "While", "Scopable" ]
      }), defineType("EmptyStatement", {
        aliases: [ "Statement" ]
      }), defineType("ExpressionStatement", {
        visitor: [ "expression" ],
        fields: {
          expression: {
            validate: (0, _utils.assertNodeType)("Expression")
          }
        },
        aliases: [ "Statement", "ExpressionWrapper" ]
      }), defineType("File", {
        builder: [ "program", "comments", "tokens" ],
        visitor: [ "program" ],
        fields: {
          program: {
            validate: (0, _utils.assertNodeType)("Program")
          },
          comments: {
            validate: process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertEach)((0, _utils.assertNodeType)("CommentBlock", "CommentLine")) : Object.assign((() => {}), {
              each: {
                oneOfNodeTypes: [ "CommentBlock", "CommentLine" ]
              }
            }),
            optional: !0
          },
          tokens: {
            validate: (0, _utils.assertEach)(Object.assign((() => {}), {
              type: "any"
            })),
            optional: !0
          }
        }
      }), defineType("ForInStatement", {
        visitor: [ "left", "right", "body" ],
        aliases: [ "Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement" ],
        fields: {
          left: {
            validate: process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertNodeType)("VariableDeclaration", "Identifier", "MemberExpression", "ArrayPattern", "ObjectPattern") : (0, 
            _utils.assertNodeType)("VariableDeclaration", "LVal")
          },
          right: {
            validate: (0, _utils.assertNodeType)("Expression")
          },
          body: {
            validate: (0, _utils.assertNodeType)("Statement")
          }
        }
      }), defineType("ForStatement", {
        visitor: [ "init", "test", "update", "body" ],
        aliases: [ "Scopable", "Statement", "For", "BlockParent", "Loop" ],
        fields: {
          init: {
            validate: (0, _utils.assertNodeType)("VariableDeclaration", "Expression"),
            optional: !0
          },
          test: {
            validate: (0, _utils.assertNodeType)("Expression"),
            optional: !0
          },
          update: {
            validate: (0, _utils.assertNodeType)("Expression"),
            optional: !0
          },
          body: {
            validate: (0, _utils.assertNodeType)("Statement")
          }
        }
      });
      const functionCommon = {
        params: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
          _utils.assertNodeType)("Identifier", "Pattern", "RestElement")))
        },
        generator: {
          default: !1
        },
        async: {
          default: !1
        }
      };
      exports.functionCommon = functionCommon;
      const functionTypeAnnotationCommon = {
        returnType: {
          validate: (0, _utils.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
          optional: !0
        },
        typeParameters: {
          validate: (0, _utils.assertNodeType)("TypeParameterDeclaration", "TSTypeParameterDeclaration", "Noop"),
          optional: !0
        }
      };
      exports.functionTypeAnnotationCommon = functionTypeAnnotationCommon;
      const functionDeclarationCommon = Object.assign({}, functionCommon, {
        declare: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: !0
        },
        id: {
          validate: (0, _utils.assertNodeType)("Identifier"),
          optional: !0
        }
      });
      exports.functionDeclarationCommon = functionDeclarationCommon, defineType("FunctionDeclaration", {
        builder: [ "id", "params", "body", "generator", "async" ],
        visitor: [ "id", "params", "body", "returnType", "typeParameters" ],
        fields: Object.assign({}, functionDeclarationCommon, functionTypeAnnotationCommon, {
          body: {
            validate: (0, _utils.assertNodeType)("BlockStatement")
          }
        }),
        aliases: [ "Scopable", "Function", "BlockParent", "FunctionParent", "Statement", "Pureish", "Declaration" ],
        validate: function() {
          if (!process.env.BABEL_TYPES_8_BREAKING) return () => {};
          const identifier = (0, _utils.assertNodeType)("Identifier");
          return function(parent, key, node) {
            (0, _is.default)("ExportDefaultDeclaration", parent) || identifier(node, "id", node.id);
          };
        }()
      }), defineType("FunctionExpression", {
        inherits: "FunctionDeclaration",
        aliases: [ "Scopable", "Function", "BlockParent", "FunctionParent", "Expression", "Pureish" ],
        fields: Object.assign({}, functionCommon, functionTypeAnnotationCommon, {
          id: {
            validate: (0, _utils.assertNodeType)("Identifier"),
            optional: !0
          },
          body: {
            validate: (0, _utils.assertNodeType)("BlockStatement")
          }
        })
      });
      const patternLikeCommon = {
        typeAnnotation: {
          validate: (0, _utils.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
          optional: !0
        },
        decorators: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
          _utils.assertNodeType)("Decorator")))
        }
      };
      exports.patternLikeCommon = patternLikeCommon, defineType("Identifier", {
        builder: [ "name" ],
        visitor: [ "typeAnnotation", "decorators" ],
        aliases: [ "Expression", "PatternLike", "LVal", "TSEntityName" ],
        fields: Object.assign({}, patternLikeCommon, {
          name: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("string"), Object.assign((function(node, key, val) {
              if (process.env.BABEL_TYPES_8_BREAKING && !(0, _isValidIdentifier.default)(val, !1)) throw new TypeError(`"${val}" is not a valid identifier name`);
            }), {
              type: "string"
            }))
          },
          optional: {
            validate: (0, _utils.assertValueType)("boolean"),
            optional: !0
          }
        }),
        validate(parent, key, node) {
          if (!process.env.BABEL_TYPES_8_BREAKING) return;
          const match = /\.(\w+)$/.exec(key);
          if (!match) return;
          const [, parentKey] = match, nonComp = {
            computed: !1
          };
          if ("property" === parentKey) {
            if ((0, _is.default)("MemberExpression", parent, nonComp)) return;
            if ((0, _is.default)("OptionalMemberExpression", parent, nonComp)) return;
          } else if ("key" === parentKey) {
            if ((0, _is.default)("Property", parent, nonComp)) return;
            if ((0, _is.default)("Method", parent, nonComp)) return;
          } else if ("exported" === parentKey) {
            if ((0, _is.default)("ExportSpecifier", parent)) return;
          } else if ("imported" === parentKey) {
            if ((0, _is.default)("ImportSpecifier", parent, {
              imported: node
            })) return;
          } else if ("meta" === parentKey && (0, _is.default)("MetaProperty", parent, {
            meta: node
          })) return;
          if (((0, _helperValidatorIdentifier.isKeyword)(node.name) || (0, _helperValidatorIdentifier.isReservedWord)(node.name, !1)) && "this" !== node.name) throw new TypeError(`"${node.name}" is not a valid identifier`);
        }
      }), defineType("IfStatement", {
        visitor: [ "test", "consequent", "alternate" ],
        aliases: [ "Statement", "Conditional" ],
        fields: {
          test: {
            validate: (0, _utils.assertNodeType)("Expression")
          },
          consequent: {
            validate: (0, _utils.assertNodeType)("Statement")
          },
          alternate: {
            optional: !0,
            validate: (0, _utils.assertNodeType)("Statement")
          }
        }
      }), defineType("LabeledStatement", {
        visitor: [ "label", "body" ],
        aliases: [ "Statement" ],
        fields: {
          label: {
            validate: (0, _utils.assertNodeType)("Identifier")
          },
          body: {
            validate: (0, _utils.assertNodeType)("Statement")
          }
        }
      }), defineType("StringLiteral", {
        builder: [ "value" ],
        fields: {
          value: {
            validate: (0, _utils.assertValueType)("string")
          }
        },
        aliases: [ "Expression", "Pureish", "Literal", "Immutable" ]
      }), defineType("NumericLiteral", {
        builder: [ "value" ],
        deprecatedAlias: "NumberLiteral",
        fields: {
          value: {
            validate: (0, _utils.assertValueType)("number")
          }
        },
        aliases: [ "Expression", "Pureish", "Literal", "Immutable" ]
      }), defineType("NullLiteral", {
        aliases: [ "Expression", "Pureish", "Literal", "Immutable" ]
      }), defineType("BooleanLiteral", {
        builder: [ "value" ],
        fields: {
          value: {
            validate: (0, _utils.assertValueType)("boolean")
          }
        },
        aliases: [ "Expression", "Pureish", "Literal", "Immutable" ]
      }), defineType("RegExpLiteral", {
        builder: [ "pattern", "flags" ],
        deprecatedAlias: "RegexLiteral",
        aliases: [ "Expression", "Pureish", "Literal" ],
        fields: {
          pattern: {
            validate: (0, _utils.assertValueType)("string")
          },
          flags: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("string"), Object.assign((function(node, key, val) {
              if (!process.env.BABEL_TYPES_8_BREAKING) return;
              const invalid = /[^gimsuy]/.exec(val);
              if (invalid) throw new TypeError(`"${invalid[0]}" is not a valid RegExp flag`);
            }), {
              type: "string"
            })),
            default: ""
          }
        }
      }), defineType("LogicalExpression", {
        builder: [ "operator", "left", "right" ],
        visitor: [ "left", "right" ],
        aliases: [ "Binary", "Expression" ],
        fields: {
          operator: {
            validate: (0, _utils.assertOneOf)(..._constants.LOGICAL_OPERATORS)
          },
          left: {
            validate: (0, _utils.assertNodeType)("Expression")
          },
          right: {
            validate: (0, _utils.assertNodeType)("Expression")
          }
        }
      }), defineType("MemberExpression", {
        builder: [ "object", "property", "computed", ...process.env.BABEL_TYPES_8_BREAKING ? [] : [ "optional" ] ],
        visitor: [ "object", "property" ],
        aliases: [ "Expression", "LVal" ],
        fields: Object.assign({
          object: {
            validate: (0, _utils.assertNodeType)("Expression")
          },
          property: {
            validate: function() {
              const normal = (0, _utils.assertNodeType)("Identifier", "PrivateName"), computed = (0, 
              _utils.assertNodeType)("Expression"), validator = function(node, key, val) {
                (node.computed ? computed : normal)(node, key, val);
              };
              return validator.oneOfNodeTypes = [ "Expression", "Identifier", "PrivateName" ], 
              validator;
            }()
          },
          computed: {
            default: !1
          }
        }, process.env.BABEL_TYPES_8_BREAKING ? {} : {
          optional: {
            validate: (0, _utils.assertOneOf)(!0, !1),
            optional: !0
          }
        })
      }), defineType("NewExpression", {
        inherits: "CallExpression"
      }), defineType("Program", {
        visitor: [ "directives", "body" ],
        builder: [ "body", "directives", "sourceType", "interpreter" ],
        fields: {
          sourceFile: {
            validate: (0, _utils.assertValueType)("string")
          },
          sourceType: {
            validate: (0, _utils.assertOneOf)("script", "module"),
            default: "script"
          },
          interpreter: {
            validate: (0, _utils.assertNodeType)("InterpreterDirective"),
            default: null,
            optional: !0
          },
          directives: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("Directive"))),
            default: []
          },
          body: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("Statement")))
          }
        },
        aliases: [ "Scopable", "BlockParent", "Block" ]
      }), defineType("ObjectExpression", {
        visitor: [ "properties" ],
        aliases: [ "Expression" ],
        fields: {
          properties: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("ObjectMethod", "ObjectProperty", "SpreadElement")))
          }
        }
      }), defineType("ObjectMethod", {
        builder: [ "kind", "key", "params", "body", "computed", "generator", "async" ],
        fields: Object.assign({}, functionCommon, functionTypeAnnotationCommon, {
          kind: Object.assign({
            validate: (0, _utils.assertOneOf)("method", "get", "set")
          }, process.env.BABEL_TYPES_8_BREAKING ? {} : {
            default: "method"
          }),
          computed: {
            default: !1
          },
          key: {
            validate: function() {
              const normal = (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral"), computed = (0, 
              _utils.assertNodeType)("Expression"), validator = function(node, key, val) {
                (node.computed ? computed : normal)(node, key, val);
              };
              return validator.oneOfNodeTypes = [ "Expression", "Identifier", "StringLiteral", "NumericLiteral" ], 
              validator;
            }()
          },
          decorators: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("Decorator"))),
            optional: !0
          },
          body: {
            validate: (0, _utils.assertNodeType)("BlockStatement")
          }
        }),
        visitor: [ "key", "params", "body", "decorators", "returnType", "typeParameters" ],
        aliases: [ "UserWhitespacable", "Function", "Scopable", "BlockParent", "FunctionParent", "Method", "ObjectMember" ]
      }), defineType("ObjectProperty", {
        builder: [ "key", "value", "computed", "shorthand", ...process.env.BABEL_TYPES_8_BREAKING ? [] : [ "decorators" ] ],
        fields: {
          computed: {
            default: !1
          },
          key: {
            validate: function() {
              const normal = (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral"), computed = (0, 
              _utils.assertNodeType)("Expression"), validator = function(node, key, val) {
                (node.computed ? computed : normal)(node, key, val);
              };
              return validator.oneOfNodeTypes = [ "Expression", "Identifier", "StringLiteral", "NumericLiteral" ], 
              validator;
            }()
          },
          value: {
            validate: (0, _utils.assertNodeType)("Expression", "PatternLike")
          },
          shorthand: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("boolean"), Object.assign((function(node, key, val) {
              if (process.env.BABEL_TYPES_8_BREAKING && val && node.computed) throw new TypeError("Property shorthand of ObjectProperty cannot be true if computed is true");
            }), {
              type: "boolean"
            }), (function(node, key, val) {
              if (process.env.BABEL_TYPES_8_BREAKING && val && !(0, _is.default)("Identifier", node.key)) throw new TypeError("Property shorthand of ObjectProperty cannot be true if key is not an Identifier");
            })),
            default: !1
          },
          decorators: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("Decorator"))),
            optional: !0
          }
        },
        visitor: [ "key", "value", "decorators" ],
        aliases: [ "UserWhitespacable", "Property", "ObjectMember" ],
        validate: function() {
          const pattern = (0, _utils.assertNodeType)("Identifier", "Pattern"), expression = (0, 
          _utils.assertNodeType)("Expression");
          return function(parent, key, node) {
            if (!process.env.BABEL_TYPES_8_BREAKING) return;
            ((0, _is.default)("ObjectPattern", parent) ? pattern : expression)(node, "value", node.value);
          };
        }()
      }), defineType("RestElement", {
        visitor: [ "argument", "typeAnnotation" ],
        builder: [ "argument" ],
        aliases: [ "LVal", "PatternLike" ],
        deprecatedAlias: "RestProperty",
        fields: Object.assign({}, patternLikeCommon, {
          argument: {
            validate: process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertNodeType)("Identifier", "ArrayPattern", "ObjectPattern", "MemberExpression") : (0, 
            _utils.assertNodeType)("LVal")
          },
          optional: {
            validate: (0, _utils.assertValueType)("boolean"),
            optional: !0
          }
        }),
        validate(parent, key) {
          if (!process.env.BABEL_TYPES_8_BREAKING) return;
          const match = /(\w+)\[(\d+)\]/.exec(key);
          if (!match) throw new Error("Internal Babel error: malformed key.");
          const [, listKey, index] = match;
          if (parent[listKey].length > index + 1) throw new TypeError(`RestElement must be last element of ${listKey}`);
        }
      }), defineType("ReturnStatement", {
        visitor: [ "argument" ],
        aliases: [ "Statement", "Terminatorless", "CompletionStatement" ],
        fields: {
          argument: {
            validate: (0, _utils.assertNodeType)("Expression"),
            optional: !0
          }
        }
      }), defineType("SequenceExpression", {
        visitor: [ "expressions" ],
        fields: {
          expressions: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("Expression")))
          }
        },
        aliases: [ "Expression" ]
      }), defineType("ParenthesizedExpression", {
        visitor: [ "expression" ],
        aliases: [ "Expression", "ExpressionWrapper" ],
        fields: {
          expression: {
            validate: (0, _utils.assertNodeType)("Expression")
          }
        }
      }), defineType("SwitchCase", {
        visitor: [ "test", "consequent" ],
        fields: {
          test: {
            validate: (0, _utils.assertNodeType)("Expression"),
            optional: !0
          },
          consequent: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("Statement")))
          }
        }
      }), defineType("SwitchStatement", {
        visitor: [ "discriminant", "cases" ],
        aliases: [ "Statement", "BlockParent", "Scopable" ],
        fields: {
          discriminant: {
            validate: (0, _utils.assertNodeType)("Expression")
          },
          cases: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("SwitchCase")))
          }
        }
      }), defineType("ThisExpression", {
        aliases: [ "Expression" ]
      }), defineType("ThrowStatement", {
        visitor: [ "argument" ],
        aliases: [ "Statement", "Terminatorless", "CompletionStatement" ],
        fields: {
          argument: {
            validate: (0, _utils.assertNodeType)("Expression")
          }
        }
      }), defineType("TryStatement", {
        visitor: [ "block", "handler", "finalizer" ],
        aliases: [ "Statement" ],
        fields: {
          block: {
            validate: (0, _utils.chain)((0, _utils.assertNodeType)("BlockStatement"), Object.assign((function(node) {
              if (process.env.BABEL_TYPES_8_BREAKING && !node.handler && !node.finalizer) throw new TypeError("TryStatement expects either a handler or finalizer, or both");
            }), {
              oneOfNodeTypes: [ "BlockStatement" ]
            }))
          },
          handler: {
            optional: !0,
            validate: (0, _utils.assertNodeType)("CatchClause")
          },
          finalizer: {
            optional: !0,
            validate: (0, _utils.assertNodeType)("BlockStatement")
          }
        }
      }), defineType("UnaryExpression", {
        builder: [ "operator", "argument", "prefix" ],
        fields: {
          prefix: {
            default: !0
          },
          argument: {
            validate: (0, _utils.assertNodeType)("Expression")
          },
          operator: {
            validate: (0, _utils.assertOneOf)(..._constants.UNARY_OPERATORS)
          }
        },
        visitor: [ "argument" ],
        aliases: [ "UnaryLike", "Expression" ]
      }), defineType("UpdateExpression", {
        builder: [ "operator", "argument", "prefix" ],
        fields: {
          prefix: {
            default: !1
          },
          argument: {
            validate: process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.assertNodeType)("Identifier", "MemberExpression") : (0, 
            _utils.assertNodeType)("Expression")
          },
          operator: {
            validate: (0, _utils.assertOneOf)(..._constants.UPDATE_OPERATORS)
          }
        },
        visitor: [ "argument" ],
        aliases: [ "Expression" ]
      }), defineType("VariableDeclaration", {
        builder: [ "kind", "declarations" ],
        visitor: [ "declarations" ],
        aliases: [ "Statement", "Declaration" ],
        fields: {
          declare: {
            validate: (0, _utils.assertValueType)("boolean"),
            optional: !0
          },
          kind: {
            validate: (0, _utils.assertOneOf)("var", "let", "const")
          },
          declarations: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("VariableDeclarator")))
          }
        },
        validate(parent, key, node) {
          if (process.env.BABEL_TYPES_8_BREAKING && (0, _is.default)("ForXStatement", parent, {
            left: node
          }) && 1 !== node.declarations.length) throw new TypeError(`Exactly one VariableDeclarator is required in the VariableDeclaration of a ${parent.type}`);
        }
      }), defineType("VariableDeclarator", {
        visitor: [ "id", "init" ],
        fields: {
          id: {
            validate: function() {
              if (!process.env.BABEL_TYPES_8_BREAKING) return (0, _utils.assertNodeType)("LVal");
              const normal = (0, _utils.assertNodeType)("Identifier", "ArrayPattern", "ObjectPattern"), without = (0, 
              _utils.assertNodeType)("Identifier");
              return function(node, key, val) {
                (node.init ? normal : without)(node, key, val);
              };
            }()
          },
          definite: {
            optional: !0,
            validate: (0, _utils.assertValueType)("boolean")
          },
          init: {
            optional: !0,
            validate: (0, _utils.assertNodeType)("Expression")
          }
        }
      }), defineType("WhileStatement", {
        visitor: [ "test", "body" ],
        aliases: [ "Statement", "BlockParent", "Loop", "While", "Scopable" ],
        fields: {
          test: {
            validate: (0, _utils.assertNodeType)("Expression")
          },
          body: {
            validate: (0, _utils.assertNodeType)("Statement")
          }
        }
      }), defineType("WithStatement", {
        visitor: [ "object", "body" ],
        aliases: [ "Statement" ],
        fields: {
          object: {
            validate: (0, _utils.assertNodeType)("Expression")
          },
          body: {
            validate: (0, _utils.assertNodeType)("Statement")
          }
        }
      }), defineType("AssignmentPattern", {
        visitor: [ "left", "right", "decorators" ],
        builder: [ "left", "right" ],
        aliases: [ "Pattern", "PatternLike", "LVal" ],
        fields: Object.assign({}, patternLikeCommon, {
          left: {
            validate: (0, _utils.assertNodeType)("Identifier", "ObjectPattern", "ArrayPattern", "MemberExpression")
          },
          right: {
            validate: (0, _utils.assertNodeType)("Expression")
          },
          decorators: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("Decorator"))),
            optional: !0
          }
        })
      }), defineType("ArrayPattern", {
        visitor: [ "elements", "typeAnnotation" ],
        builder: [ "elements" ],
        aliases: [ "Pattern", "PatternLike", "LVal" ],
        fields: Object.assign({}, patternLikeCommon, {
          elements: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeOrValueType)("null", "PatternLike")))
          },
          decorators: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("Decorator"))),
            optional: !0
          },
          optional: {
            validate: (0, _utils.assertValueType)("boolean"),
            optional: !0
          }
        })
      }), defineType("ArrowFunctionExpression", {
        builder: [ "params", "body", "async" ],
        visitor: [ "params", "body", "returnType", "typeParameters" ],
        aliases: [ "Scopable", "Function", "BlockParent", "FunctionParent", "Expression", "Pureish" ],
        fields: Object.assign({}, functionCommon, functionTypeAnnotationCommon, {
          expression: {
            validate: (0, _utils.assertValueType)("boolean")
          },
          body: {
            validate: (0, _utils.assertNodeType)("BlockStatement", "Expression")
          }
        })
      }), defineType("ClassBody", {
        visitor: [ "body" ],
        fields: {
          body: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("ClassMethod", "ClassPrivateMethod", "ClassProperty", "ClassPrivateProperty", "ClassAccessorProperty", "TSDeclareMethod", "TSIndexSignature", "StaticBlock")))
          }
        }
      }), defineType("ClassExpression", {
        builder: [ "id", "superClass", "body", "decorators" ],
        visitor: [ "id", "body", "superClass", "mixins", "typeParameters", "superTypeParameters", "implements", "decorators" ],
        aliases: [ "Scopable", "Class", "Expression" ],
        fields: {
          id: {
            validate: (0, _utils.assertNodeType)("Identifier"),
            optional: !0
          },
          typeParameters: {
            validate: (0, _utils.assertNodeType)("TypeParameterDeclaration", "TSTypeParameterDeclaration", "Noop"),
            optional: !0
          },
          body: {
            validate: (0, _utils.assertNodeType)("ClassBody")
          },
          superClass: {
            optional: !0,
            validate: (0, _utils.assertNodeType)("Expression")
          },
          superTypeParameters: {
            validate: (0, _utils.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
            optional: !0
          },
          implements: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("TSExpressionWithTypeArguments", "ClassImplements"))),
            optional: !0
          },
          decorators: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("Decorator"))),
            optional: !0
          },
          mixins: {
            validate: (0, _utils.assertNodeType)("InterfaceExtends"),
            optional: !0
          }
        }
      }), defineType("ClassDeclaration", {
        inherits: "ClassExpression",
        aliases: [ "Scopable", "Class", "Statement", "Declaration" ],
        fields: {
          id: {
            validate: (0, _utils.assertNodeType)("Identifier")
          },
          typeParameters: {
            validate: (0, _utils.assertNodeType)("TypeParameterDeclaration", "TSTypeParameterDeclaration", "Noop"),
            optional: !0
          },
          body: {
            validate: (0, _utils.assertNodeType)("ClassBody")
          },
          superClass: {
            optional: !0,
            validate: (0, _utils.assertNodeType)("Expression")
          },
          superTypeParameters: {
            validate: (0, _utils.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
            optional: !0
          },
          implements: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("TSExpressionWithTypeArguments", "ClassImplements"))),
            optional: !0
          },
          decorators: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("Decorator"))),
            optional: !0
          },
          mixins: {
            validate: (0, _utils.assertNodeType)("InterfaceExtends"),
            optional: !0
          },
          declare: {
            validate: (0, _utils.assertValueType)("boolean"),
            optional: !0
          },
          abstract: {
            validate: (0, _utils.assertValueType)("boolean"),
            optional: !0
          }
        },
        validate: function() {
          const identifier = (0, _utils.assertNodeType)("Identifier");
          return function(parent, key, node) {
            process.env.BABEL_TYPES_8_BREAKING && ((0, _is.default)("ExportDefaultDeclaration", parent) || identifier(node, "id", node.id));
          };
        }()
      }), defineType("ExportAllDeclaration", {
        visitor: [ "source" ],
        aliases: [ "Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration" ],
        fields: {
          source: {
            validate: (0, _utils.assertNodeType)("StringLiteral")
          },
          exportKind: (0, _utils.validateOptional)((0, _utils.assertOneOf)("type", "value")),
          assertions: {
            optional: !0,
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("ImportAttribute")))
          }
        }
      }), defineType("ExportDefaultDeclaration", {
        visitor: [ "declaration" ],
        aliases: [ "Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration" ],
        fields: {
          declaration: {
            validate: (0, _utils.assertNodeType)("FunctionDeclaration", "TSDeclareFunction", "ClassDeclaration", "Expression")
          },
          exportKind: (0, _utils.validateOptional)((0, _utils.assertOneOf)("value"))
        }
      }), defineType("ExportNamedDeclaration", {
        visitor: [ "declaration", "specifiers", "source" ],
        aliases: [ "Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration" ],
        fields: {
          declaration: {
            optional: !0,
            validate: (0, _utils.chain)((0, _utils.assertNodeType)("Declaration"), Object.assign((function(node, key, val) {
              if (process.env.BABEL_TYPES_8_BREAKING && val && node.specifiers.length) throw new TypeError("Only declaration or specifiers is allowed on ExportNamedDeclaration");
            }), {
              oneOfNodeTypes: [ "Declaration" ]
            }), (function(node, key, val) {
              if (process.env.BABEL_TYPES_8_BREAKING && val && node.source) throw new TypeError("Cannot export a declaration from a source");
            }))
          },
          assertions: {
            optional: !0,
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("ImportAttribute")))
          },
          specifiers: {
            default: [],
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)(function() {
              const sourced = (0, _utils.assertNodeType)("ExportSpecifier", "ExportDefaultSpecifier", "ExportNamespaceSpecifier"), sourceless = (0, 
              _utils.assertNodeType)("ExportSpecifier");
              return process.env.BABEL_TYPES_8_BREAKING ? function(node, key, val) {
                (node.source ? sourced : sourceless)(node, key, val);
              } : sourced;
            }()))
          },
          source: {
            validate: (0, _utils.assertNodeType)("StringLiteral"),
            optional: !0
          },
          exportKind: (0, _utils.validateOptional)((0, _utils.assertOneOf)("type", "value"))
        }
      }), defineType("ExportSpecifier", {
        visitor: [ "local", "exported" ],
        aliases: [ "ModuleSpecifier" ],
        fields: {
          local: {
            validate: (0, _utils.assertNodeType)("Identifier")
          },
          exported: {
            validate: (0, _utils.assertNodeType)("Identifier", "StringLiteral")
          },
          exportKind: {
            validate: (0, _utils.assertOneOf)("type", "value"),
            optional: !0
          }
        }
      }), defineType("ForOfStatement", {
        visitor: [ "left", "right", "body" ],
        builder: [ "left", "right", "body", "await" ],
        aliases: [ "Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement" ],
        fields: {
          left: {
            validate: function() {
              if (!process.env.BABEL_TYPES_8_BREAKING) return (0, _utils.assertNodeType)("VariableDeclaration", "LVal");
              const declaration = (0, _utils.assertNodeType)("VariableDeclaration"), lval = (0, 
              _utils.assertNodeType)("Identifier", "MemberExpression", "ArrayPattern", "ObjectPattern");
              return function(node, key, val) {
                (0, _is.default)("VariableDeclaration", val) ? declaration(node, key, val) : lval(node, key, val);
              };
            }()
          },
          right: {
            validate: (0, _utils.assertNodeType)("Expression")
          },
          body: {
            validate: (0, _utils.assertNodeType)("Statement")
          },
          await: {
            default: !1
          }
        }
      }), defineType("ImportDeclaration", {
        visitor: [ "specifiers", "source" ],
        aliases: [ "Statement", "Declaration", "ModuleDeclaration" ],
        fields: {
          assertions: {
            optional: !0,
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("ImportAttribute")))
          },
          specifiers: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("ImportSpecifier", "ImportDefaultSpecifier", "ImportNamespaceSpecifier")))
          },
          source: {
            validate: (0, _utils.assertNodeType)("StringLiteral")
          },
          importKind: {
            validate: (0, _utils.assertOneOf)("type", "typeof", "value"),
            optional: !0
          }
        }
      }), defineType("ImportDefaultSpecifier", {
        visitor: [ "local" ],
        aliases: [ "ModuleSpecifier" ],
        fields: {
          local: {
            validate: (0, _utils.assertNodeType)("Identifier")
          }
        }
      }), defineType("ImportNamespaceSpecifier", {
        visitor: [ "local" ],
        aliases: [ "ModuleSpecifier" ],
        fields: {
          local: {
            validate: (0, _utils.assertNodeType)("Identifier")
          }
        }
      }), defineType("ImportSpecifier", {
        visitor: [ "local", "imported" ],
        aliases: [ "ModuleSpecifier" ],
        fields: {
          local: {
            validate: (0, _utils.assertNodeType)("Identifier")
          },
          imported: {
            validate: (0, _utils.assertNodeType)("Identifier", "StringLiteral")
          },
          importKind: {
            validate: (0, _utils.assertOneOf)("type", "typeof", "value"),
            optional: !0
          }
        }
      }), defineType("MetaProperty", {
        visitor: [ "meta", "property" ],
        aliases: [ "Expression" ],
        fields: {
          meta: {
            validate: (0, _utils.chain)((0, _utils.assertNodeType)("Identifier"), Object.assign((function(node, key, val) {
              if (!process.env.BABEL_TYPES_8_BREAKING) return;
              let property;
              switch (val.name) {
               case "function":
                property = "sent";
                break;

               case "new":
                property = "target";
                break;

               case "import":
                property = "meta";
              }
              if (!(0, _is.default)("Identifier", node.property, {
                name: property
              })) throw new TypeError("Unrecognised MetaProperty");
            }), {
              oneOfNodeTypes: [ "Identifier" ]
            }))
          },
          property: {
            validate: (0, _utils.assertNodeType)("Identifier")
          }
        }
      });
      const classMethodOrPropertyCommon = {
        abstract: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: !0
        },
        accessibility: {
          validate: (0, _utils.assertOneOf)("public", "private", "protected"),
          optional: !0
        },
        static: {
          default: !1
        },
        override: {
          default: !1
        },
        computed: {
          default: !1
        },
        optional: {
          validate: (0, _utils.assertValueType)("boolean"),
          optional: !0
        },
        key: {
          validate: (0, _utils.chain)(function() {
            const normal = (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral"), computed = (0, 
            _utils.assertNodeType)("Expression");
            return function(node, key, val) {
              (node.computed ? computed : normal)(node, key, val);
            };
          }(), (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "Expression"))
        }
      };
      exports.classMethodOrPropertyCommon = classMethodOrPropertyCommon;
      const classMethodOrDeclareMethodCommon = Object.assign({}, functionCommon, classMethodOrPropertyCommon, {
        params: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
          _utils.assertNodeType)("Identifier", "Pattern", "RestElement", "TSParameterProperty")))
        },
        kind: {
          validate: (0, _utils.assertOneOf)("get", "set", "method", "constructor"),
          default: "method"
        },
        access: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("string"), (0, _utils.assertOneOf)("public", "private", "protected")),
          optional: !0
        },
        decorators: {
          validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
          _utils.assertNodeType)("Decorator"))),
          optional: !0
        }
      });
      exports.classMethodOrDeclareMethodCommon = classMethodOrDeclareMethodCommon, defineType("ClassMethod", {
        aliases: [ "Function", "Scopable", "BlockParent", "FunctionParent", "Method" ],
        builder: [ "kind", "key", "params", "body", "computed", "static", "generator", "async" ],
        visitor: [ "key", "params", "body", "decorators", "returnType", "typeParameters" ],
        fields: Object.assign({}, classMethodOrDeclareMethodCommon, functionTypeAnnotationCommon, {
          body: {
            validate: (0, _utils.assertNodeType)("BlockStatement")
          }
        })
      }), defineType("ObjectPattern", {
        visitor: [ "properties", "typeAnnotation", "decorators" ],
        builder: [ "properties" ],
        aliases: [ "Pattern", "PatternLike", "LVal" ],
        fields: Object.assign({}, patternLikeCommon, {
          properties: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("RestElement", "ObjectProperty")))
          }
        })
      }), defineType("SpreadElement", {
        visitor: [ "argument" ],
        aliases: [ "UnaryLike" ],
        deprecatedAlias: "SpreadProperty",
        fields: {
          argument: {
            validate: (0, _utils.assertNodeType)("Expression")
          }
        }
      }), defineType("Super", {
        aliases: [ "Expression" ]
      }), defineType("TaggedTemplateExpression", {
        visitor: [ "tag", "quasi", "typeParameters" ],
        builder: [ "tag", "quasi" ],
        aliases: [ "Expression" ],
        fields: {
          tag: {
            validate: (0, _utils.assertNodeType)("Expression")
          },
          quasi: {
            validate: (0, _utils.assertNodeType)("TemplateLiteral")
          },
          typeParameters: {
            validate: (0, _utils.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
            optional: !0
          }
        }
      }), defineType("TemplateElement", {
        builder: [ "value", "tail" ],
        fields: {
          value: {
            validate: (0, _utils.assertShape)({
              raw: {
                validate: (0, _utils.assertValueType)("string")
              },
              cooked: {
                validate: (0, _utils.assertValueType)("string"),
                optional: !0
              }
            })
          },
          tail: {
            default: !1
          }
        }
      }), defineType("TemplateLiteral", {
        visitor: [ "quasis", "expressions" ],
        aliases: [ "Expression", "Literal" ],
        fields: {
          quasis: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("TemplateElement")))
          },
          expressions: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("Expression", "TSType")), (function(node, key, val) {
              if (node.quasis.length !== val.length + 1) throw new TypeError(`Number of ${node.type} quasis should be exactly one more than the number of expressions.\nExpected ${val.length + 1} quasis but got ${node.quasis.length}`);
            }))
          }
        }
      }), defineType("YieldExpression", {
        builder: [ "argument", "delegate" ],
        visitor: [ "argument" ],
        aliases: [ "Expression", "Terminatorless" ],
        fields: {
          delegate: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("boolean"), Object.assign((function(node, key, val) {
              if (process.env.BABEL_TYPES_8_BREAKING && val && !node.argument) throw new TypeError("Property delegate of YieldExpression cannot be true if there is no argument");
            }), {
              type: "boolean"
            })),
            default: !1
          },
          argument: {
            optional: !0,
            validate: (0, _utils.assertNodeType)("Expression")
          }
        }
      }), defineType("AwaitExpression", {
        builder: [ "argument" ],
        visitor: [ "argument" ],
        aliases: [ "Expression", "Terminatorless" ],
        fields: {
          argument: {
            validate: (0, _utils.assertNodeType)("Expression")
          }
        }
      }), defineType("Import", {
        aliases: [ "Expression" ]
      }), defineType("BigIntLiteral", {
        builder: [ "value" ],
        fields: {
          value: {
            validate: (0, _utils.assertValueType)("string")
          }
        },
        aliases: [ "Expression", "Pureish", "Literal", "Immutable" ]
      }), defineType("ExportNamespaceSpecifier", {
        visitor: [ "exported" ],
        aliases: [ "ModuleSpecifier" ],
        fields: {
          exported: {
            validate: (0, _utils.assertNodeType)("Identifier")
          }
        }
      }), defineType("OptionalMemberExpression", {
        builder: [ "object", "property", "computed", "optional" ],
        visitor: [ "object", "property" ],
        aliases: [ "Expression" ],
        fields: {
          object: {
            validate: (0, _utils.assertNodeType)("Expression")
          },
          property: {
            validate: function() {
              const normal = (0, _utils.assertNodeType)("Identifier"), computed = (0, _utils.assertNodeType)("Expression"), validator = function(node, key, val) {
                (node.computed ? computed : normal)(node, key, val);
              };
              return validator.oneOfNodeTypes = [ "Expression", "Identifier" ], validator;
            }()
          },
          computed: {
            default: !1
          },
          optional: {
            validate: process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.chain)((0, _utils.assertValueType)("boolean"), (0, 
            _utils.assertOptionalChainStart)()) : (0, _utils.assertValueType)("boolean")
          }
        }
      }), defineType("OptionalCallExpression", {
        visitor: [ "callee", "arguments", "typeParameters", "typeArguments" ],
        builder: [ "callee", "arguments", "optional" ],
        aliases: [ "Expression" ],
        fields: {
          callee: {
            validate: (0, _utils.assertNodeType)("Expression")
          },
          arguments: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("Expression", "SpreadElement", "JSXNamespacedName", "ArgumentPlaceholder")))
          },
          optional: {
            validate: process.env.BABEL_TYPES_8_BREAKING ? (0, _utils.chain)((0, _utils.assertValueType)("boolean"), (0, 
            _utils.assertOptionalChainStart)()) : (0, _utils.assertValueType)("boolean")
          },
          typeArguments: {
            validate: (0, _utils.assertNodeType)("TypeParameterInstantiation"),
            optional: !0
          },
          typeParameters: {
            validate: (0, _utils.assertNodeType)("TSTypeParameterInstantiation"),
            optional: !0
          }
        }
      }), defineType("ClassProperty", {
        visitor: [ "key", "value", "typeAnnotation", "decorators" ],
        builder: [ "key", "value", "typeAnnotation", "decorators", "computed", "static" ],
        aliases: [ "Property" ],
        fields: Object.assign({}, classMethodOrPropertyCommon, {
          value: {
            validate: (0, _utils.assertNodeType)("Expression"),
            optional: !0
          },
          definite: {
            validate: (0, _utils.assertValueType)("boolean"),
            optional: !0
          },
          typeAnnotation: {
            validate: (0, _utils.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
            optional: !0
          },
          decorators: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("Decorator"))),
            optional: !0
          },
          readonly: {
            validate: (0, _utils.assertValueType)("boolean"),
            optional: !0
          },
          declare: {
            validate: (0, _utils.assertValueType)("boolean"),
            optional: !0
          },
          variance: {
            validate: (0, _utils.assertNodeType)("Variance"),
            optional: !0
          }
        })
      }), defineType("ClassAccessorProperty", {
        visitor: [ "key", "value", "typeAnnotation", "decorators" ],
        builder: [ "key", "value", "typeAnnotation", "decorators", "computed", "static" ],
        aliases: [ "Property", "Accessor" ],
        fields: Object.assign({}, classMethodOrPropertyCommon, {
          key: {
            validate: (0, _utils.chain)(function() {
              const normal = (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "PrivateName"), computed = (0, 
              _utils.assertNodeType)("Expression");
              return function(node, key, val) {
                (node.computed ? computed : normal)(node, key, val);
              };
            }(), (0, _utils.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "Expression", "PrivateName"))
          },
          value: {
            validate: (0, _utils.assertNodeType)("Expression"),
            optional: !0
          },
          definite: {
            validate: (0, _utils.assertValueType)("boolean"),
            optional: !0
          },
          typeAnnotation: {
            validate: (0, _utils.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
            optional: !0
          },
          decorators: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("Decorator"))),
            optional: !0
          },
          readonly: {
            validate: (0, _utils.assertValueType)("boolean"),
            optional: !0
          },
          declare: {
            validate: (0, _utils.assertValueType)("boolean"),
            optional: !0
          },
          variance: {
            validate: (0, _utils.assertNodeType)("Variance"),
            optional: !0
          }
        })
      }), defineType("ClassPrivateProperty", {
        visitor: [ "key", "value", "decorators", "typeAnnotation" ],
        builder: [ "key", "value", "decorators", "static" ],
        aliases: [ "Property", "Private" ],
        fields: {
          key: {
            validate: (0, _utils.assertNodeType)("PrivateName")
          },
          value: {
            validate: (0, _utils.assertNodeType)("Expression"),
            optional: !0
          },
          typeAnnotation: {
            validate: (0, _utils.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
            optional: !0
          },
          decorators: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("Decorator"))),
            optional: !0
          },
          readonly: {
            validate: (0, _utils.assertValueType)("boolean"),
            optional: !0
          },
          definite: {
            validate: (0, _utils.assertValueType)("boolean"),
            optional: !0
          },
          variance: {
            validate: (0, _utils.assertNodeType)("Variance"),
            optional: !0
          }
        }
      }), defineType("ClassPrivateMethod", {
        builder: [ "kind", "key", "params", "body", "static" ],
        visitor: [ "key", "params", "body", "decorators", "returnType", "typeParameters" ],
        aliases: [ "Function", "Scopable", "BlockParent", "FunctionParent", "Method", "Private" ],
        fields: Object.assign({}, classMethodOrDeclareMethodCommon, functionTypeAnnotationCommon, {
          key: {
            validate: (0, _utils.assertNodeType)("PrivateName")
          },
          body: {
            validate: (0, _utils.assertNodeType)("BlockStatement")
          }
        })
      }), defineType("PrivateName", {
        visitor: [ "id" ],
        aliases: [ "Private" ],
        fields: {
          id: {
            validate: (0, _utils.assertNodeType)("Identifier")
          }
        }
      }), defineType("StaticBlock", {
        visitor: [ "body" ],
        fields: {
          body: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("Statement")))
          }
        },
        aliases: [ "Scopable", "BlockParent", "FunctionParent" ]
      });
    },
    1456: (__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var _utils = __webpack_require__(4913);
      (0, _utils.default)("ArgumentPlaceholder", {}), (0, _utils.default)("BindExpression", {
        visitor: [ "object", "callee" ],
        aliases: [ "Expression" ],
        fields: process.env.BABEL_TYPES_8_BREAKING ? {
          object: {
            validate: (0, _utils.assertNodeType)("Expression")
          },
          callee: {
            validate: (0, _utils.assertNodeType)("Expression")
          }
        } : {
          object: {
            validate: Object.assign((() => {}), {
              oneOfNodeTypes: [ "Expression" ]
            })
          },
          callee: {
            validate: Object.assign((() => {}), {
              oneOfNodeTypes: [ "Expression" ]
            })
          }
        }
      }), (0, _utils.default)("ImportAttribute", {
        visitor: [ "key", "value" ],
        fields: {
          key: {
            validate: (0, _utils.assertNodeType)("Identifier", "StringLiteral")
          },
          value: {
            validate: (0, _utils.assertNodeType)("StringLiteral")
          }
        }
      }), (0, _utils.default)("Decorator", {
        visitor: [ "expression" ],
        fields: {
          expression: {
            validate: (0, _utils.assertNodeType)("Expression")
          }
        }
      }), (0, _utils.default)("DoExpression", {
        visitor: [ "body" ],
        builder: [ "body", "async" ],
        aliases: [ "Expression" ],
        fields: {
          body: {
            validate: (0, _utils.assertNodeType)("BlockStatement")
          },
          async: {
            validate: (0, _utils.assertValueType)("boolean"),
            default: !1
          }
        }
      }), (0, _utils.default)("ExportDefaultSpecifier", {
        visitor: [ "exported" ],
        aliases: [ "ModuleSpecifier" ],
        fields: {
          exported: {
            validate: (0, _utils.assertNodeType)("Identifier")
          }
        }
      }), (0, _utils.default)("RecordExpression", {
        visitor: [ "properties" ],
        aliases: [ "Expression" ],
        fields: {
          properties: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("ObjectProperty", "SpreadElement")))
          }
        }
      }), (0, _utils.default)("TupleExpression", {
        fields: {
          elements: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("Expression", "SpreadElement"))),
            default: []
          }
        },
        visitor: [ "elements" ],
        aliases: [ "Expression" ]
      }), (0, _utils.default)("DecimalLiteral", {
        builder: [ "value" ],
        fields: {
          value: {
            validate: (0, _utils.assertValueType)("string")
          }
        },
        aliases: [ "Expression", "Pureish", "Literal", "Immutable" ]
      }), (0, _utils.default)("ModuleExpression", {
        visitor: [ "body" ],
        fields: {
          body: {
            validate: (0, _utils.assertNodeType)("Program")
          }
        },
        aliases: [ "Expression" ]
      }), (0, _utils.default)("TopicReference", {
        aliases: [ "Expression" ]
      }), (0, _utils.default)("PipelineTopicExpression", {
        builder: [ "expression" ],
        visitor: [ "expression" ],
        fields: {
          expression: {
            validate: (0, _utils.assertNodeType)("Expression")
          }
        },
        aliases: [ "Expression" ]
      }), (0, _utils.default)("PipelineBareFunction", {
        builder: [ "callee" ],
        visitor: [ "callee" ],
        fields: {
          callee: {
            validate: (0, _utils.assertNodeType)("Expression")
          }
        },
        aliases: [ "Expression" ]
      }), (0, _utils.default)("PipelinePrimaryTopicReference", {
        aliases: [ "Expression" ]
      });
    },
    5391: (__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var _utils = __webpack_require__(4913);
      const defineType = (0, _utils.defineAliasedType)("Flow"), defineInterfaceishType = (name, typeParameterType = "TypeParameterDeclaration") => {
        defineType(name, {
          builder: [ "id", "typeParameters", "extends", "body" ],
          visitor: [ "id", "typeParameters", "extends", "mixins", "implements", "body" ],
          aliases: [ "FlowDeclaration", "Statement", "Declaration" ],
          fields: {
            id: (0, _utils.validateType)("Identifier"),
            typeParameters: (0, _utils.validateOptionalType)(typeParameterType),
            extends: (0, _utils.validateOptional)((0, _utils.arrayOfType)("InterfaceExtends")),
            mixins: (0, _utils.validateOptional)((0, _utils.arrayOfType)("InterfaceExtends")),
            implements: (0, _utils.validateOptional)((0, _utils.arrayOfType)("ClassImplements")),
            body: (0, _utils.validateType)("ObjectTypeAnnotation")
          }
        });
      };
      defineType("AnyTypeAnnotation", {
        aliases: [ "FlowType", "FlowBaseAnnotation" ]
      }), defineType("ArrayTypeAnnotation", {
        visitor: [ "elementType" ],
        aliases: [ "FlowType" ],
        fields: {
          elementType: (0, _utils.validateType)("FlowType")
        }
      }), defineType("BooleanTypeAnnotation", {
        aliases: [ "FlowType", "FlowBaseAnnotation" ]
      }), defineType("BooleanLiteralTypeAnnotation", {
        builder: [ "value" ],
        aliases: [ "FlowType" ],
        fields: {
          value: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
        }
      }), defineType("NullLiteralTypeAnnotation", {
        aliases: [ "FlowType", "FlowBaseAnnotation" ]
      }), defineType("ClassImplements", {
        visitor: [ "id", "typeParameters" ],
        fields: {
          id: (0, _utils.validateType)("Identifier"),
          typeParameters: (0, _utils.validateOptionalType)("TypeParameterInstantiation")
        }
      }), defineInterfaceishType("DeclareClass"), defineType("DeclareFunction", {
        visitor: [ "id" ],
        aliases: [ "FlowDeclaration", "Statement", "Declaration" ],
        fields: {
          id: (0, _utils.validateType)("Identifier"),
          predicate: (0, _utils.validateOptionalType)("DeclaredPredicate")
        }
      }), defineInterfaceishType("DeclareInterface"), defineType("DeclareModule", {
        builder: [ "id", "body", "kind" ],
        visitor: [ "id", "body" ],
        aliases: [ "FlowDeclaration", "Statement", "Declaration" ],
        fields: {
          id: (0, _utils.validateType)([ "Identifier", "StringLiteral" ]),
          body: (0, _utils.validateType)("BlockStatement"),
          kind: (0, _utils.validateOptional)((0, _utils.assertOneOf)("CommonJS", "ES"))
        }
      }), defineType("DeclareModuleExports", {
        visitor: [ "typeAnnotation" ],
        aliases: [ "FlowDeclaration", "Statement", "Declaration" ],
        fields: {
          typeAnnotation: (0, _utils.validateType)("TypeAnnotation")
        }
      }), defineType("DeclareTypeAlias", {
        visitor: [ "id", "typeParameters", "right" ],
        aliases: [ "FlowDeclaration", "Statement", "Declaration" ],
        fields: {
          id: (0, _utils.validateType)("Identifier"),
          typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
          right: (0, _utils.validateType)("FlowType")
        }
      }), defineType("DeclareOpaqueType", {
        visitor: [ "id", "typeParameters", "supertype" ],
        aliases: [ "FlowDeclaration", "Statement", "Declaration" ],
        fields: {
          id: (0, _utils.validateType)("Identifier"),
          typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
          supertype: (0, _utils.validateOptionalType)("FlowType"),
          impltype: (0, _utils.validateOptionalType)("FlowType")
        }
      }), defineType("DeclareVariable", {
        visitor: [ "id" ],
        aliases: [ "FlowDeclaration", "Statement", "Declaration" ],
        fields: {
          id: (0, _utils.validateType)("Identifier")
        }
      }), defineType("DeclareExportDeclaration", {
        visitor: [ "declaration", "specifiers", "source" ],
        aliases: [ "FlowDeclaration", "Statement", "Declaration" ],
        fields: {
          declaration: (0, _utils.validateOptionalType)("Flow"),
          specifiers: (0, _utils.validateOptional)((0, _utils.arrayOfType)([ "ExportSpecifier", "ExportNamespaceSpecifier" ])),
          source: (0, _utils.validateOptionalType)("StringLiteral"),
          default: (0, _utils.validateOptional)((0, _utils.assertValueType)("boolean"))
        }
      }), defineType("DeclareExportAllDeclaration", {
        visitor: [ "source" ],
        aliases: [ "FlowDeclaration", "Statement", "Declaration" ],
        fields: {
          source: (0, _utils.validateType)("StringLiteral"),
          exportKind: (0, _utils.validateOptional)((0, _utils.assertOneOf)("type", "value"))
        }
      }), defineType("DeclaredPredicate", {
        visitor: [ "value" ],
        aliases: [ "FlowPredicate" ],
        fields: {
          value: (0, _utils.validateType)("Flow")
        }
      }), defineType("ExistsTypeAnnotation", {
        aliases: [ "FlowType" ]
      }), defineType("FunctionTypeAnnotation", {
        visitor: [ "typeParameters", "params", "rest", "returnType" ],
        aliases: [ "FlowType" ],
        fields: {
          typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
          params: (0, _utils.validate)((0, _utils.arrayOfType)("FunctionTypeParam")),
          rest: (0, _utils.validateOptionalType)("FunctionTypeParam"),
          this: (0, _utils.validateOptionalType)("FunctionTypeParam"),
          returnType: (0, _utils.validateType)("FlowType")
        }
      }), defineType("FunctionTypeParam", {
        visitor: [ "name", "typeAnnotation" ],
        fields: {
          name: (0, _utils.validateOptionalType)("Identifier"),
          typeAnnotation: (0, _utils.validateType)("FlowType"),
          optional: (0, _utils.validateOptional)((0, _utils.assertValueType)("boolean"))
        }
      }), defineType("GenericTypeAnnotation", {
        visitor: [ "id", "typeParameters" ],
        aliases: [ "FlowType" ],
        fields: {
          id: (0, _utils.validateType)([ "Identifier", "QualifiedTypeIdentifier" ]),
          typeParameters: (0, _utils.validateOptionalType)("TypeParameterInstantiation")
        }
      }), defineType("InferredPredicate", {
        aliases: [ "FlowPredicate" ]
      }), defineType("InterfaceExtends", {
        visitor: [ "id", "typeParameters" ],
        fields: {
          id: (0, _utils.validateType)([ "Identifier", "QualifiedTypeIdentifier" ]),
          typeParameters: (0, _utils.validateOptionalType)("TypeParameterInstantiation")
        }
      }), defineInterfaceishType("InterfaceDeclaration"), defineType("InterfaceTypeAnnotation", {
        visitor: [ "extends", "body" ],
        aliases: [ "FlowType" ],
        fields: {
          extends: (0, _utils.validateOptional)((0, _utils.arrayOfType)("InterfaceExtends")),
          body: (0, _utils.validateType)("ObjectTypeAnnotation")
        }
      }), defineType("IntersectionTypeAnnotation", {
        visitor: [ "types" ],
        aliases: [ "FlowType" ],
        fields: {
          types: (0, _utils.validate)((0, _utils.arrayOfType)("FlowType"))
        }
      }), defineType("MixedTypeAnnotation", {
        aliases: [ "FlowType", "FlowBaseAnnotation" ]
      }), defineType("EmptyTypeAnnotation", {
        aliases: [ "FlowType", "FlowBaseAnnotation" ]
      }), defineType("NullableTypeAnnotation", {
        visitor: [ "typeAnnotation" ],
        aliases: [ "FlowType" ],
        fields: {
          typeAnnotation: (0, _utils.validateType)("FlowType")
        }
      }), defineType("NumberLiteralTypeAnnotation", {
        builder: [ "value" ],
        aliases: [ "FlowType" ],
        fields: {
          value: (0, _utils.validate)((0, _utils.assertValueType)("number"))
        }
      }), defineType("NumberTypeAnnotation", {
        aliases: [ "FlowType", "FlowBaseAnnotation" ]
      }), defineType("ObjectTypeAnnotation", {
        visitor: [ "properties", "indexers", "callProperties", "internalSlots" ],
        aliases: [ "FlowType" ],
        builder: [ "properties", "indexers", "callProperties", "internalSlots", "exact" ],
        fields: {
          properties: (0, _utils.validate)((0, _utils.arrayOfType)([ "ObjectTypeProperty", "ObjectTypeSpreadProperty" ])),
          indexers: {
            validate: (0, _utils.arrayOfType)("ObjectTypeIndexer"),
            optional: !0,
            default: void 0
          },
          callProperties: {
            validate: (0, _utils.arrayOfType)("ObjectTypeCallProperty"),
            optional: !0,
            default: void 0
          },
          internalSlots: {
            validate: (0, _utils.arrayOfType)("ObjectTypeInternalSlot"),
            optional: !0,
            default: void 0
          },
          exact: {
            validate: (0, _utils.assertValueType)("boolean"),
            default: !1
          },
          inexact: (0, _utils.validateOptional)((0, _utils.assertValueType)("boolean"))
        }
      }), defineType("ObjectTypeInternalSlot", {
        visitor: [ "id", "value", "optional", "static", "method" ],
        aliases: [ "UserWhitespacable" ],
        fields: {
          id: (0, _utils.validateType)("Identifier"),
          value: (0, _utils.validateType)("FlowType"),
          optional: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
          static: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
          method: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
        }
      }), defineType("ObjectTypeCallProperty", {
        visitor: [ "value" ],
        aliases: [ "UserWhitespacable" ],
        fields: {
          value: (0, _utils.validateType)("FlowType"),
          static: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
        }
      }), defineType("ObjectTypeIndexer", {
        visitor: [ "id", "key", "value", "variance" ],
        aliases: [ "UserWhitespacable" ],
        fields: {
          id: (0, _utils.validateOptionalType)("Identifier"),
          key: (0, _utils.validateType)("FlowType"),
          value: (0, _utils.validateType)("FlowType"),
          static: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
          variance: (0, _utils.validateOptionalType)("Variance")
        }
      }), defineType("ObjectTypeProperty", {
        visitor: [ "key", "value", "variance" ],
        aliases: [ "UserWhitespacable" ],
        fields: {
          key: (0, _utils.validateType)([ "Identifier", "StringLiteral" ]),
          value: (0, _utils.validateType)("FlowType"),
          kind: (0, _utils.validate)((0, _utils.assertOneOf)("init", "get", "set")),
          static: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
          proto: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
          optional: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
          variance: (0, _utils.validateOptionalType)("Variance"),
          method: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
        }
      }), defineType("ObjectTypeSpreadProperty", {
        visitor: [ "argument" ],
        aliases: [ "UserWhitespacable" ],
        fields: {
          argument: (0, _utils.validateType)("FlowType")
        }
      }), defineType("OpaqueType", {
        visitor: [ "id", "typeParameters", "supertype", "impltype" ],
        aliases: [ "FlowDeclaration", "Statement", "Declaration" ],
        fields: {
          id: (0, _utils.validateType)("Identifier"),
          typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
          supertype: (0, _utils.validateOptionalType)("FlowType"),
          impltype: (0, _utils.validateType)("FlowType")
        }
      }), defineType("QualifiedTypeIdentifier", {
        visitor: [ "id", "qualification" ],
        fields: {
          id: (0, _utils.validateType)("Identifier"),
          qualification: (0, _utils.validateType)([ "Identifier", "QualifiedTypeIdentifier" ])
        }
      }), defineType("StringLiteralTypeAnnotation", {
        builder: [ "value" ],
        aliases: [ "FlowType" ],
        fields: {
          value: (0, _utils.validate)((0, _utils.assertValueType)("string"))
        }
      }), defineType("StringTypeAnnotation", {
        aliases: [ "FlowType", "FlowBaseAnnotation" ]
      }), defineType("SymbolTypeAnnotation", {
        aliases: [ "FlowType", "FlowBaseAnnotation" ]
      }), defineType("ThisTypeAnnotation", {
        aliases: [ "FlowType", "FlowBaseAnnotation" ]
      }), defineType("TupleTypeAnnotation", {
        visitor: [ "types" ],
        aliases: [ "FlowType" ],
        fields: {
          types: (0, _utils.validate)((0, _utils.arrayOfType)("FlowType"))
        }
      }), defineType("TypeofTypeAnnotation", {
        visitor: [ "argument" ],
        aliases: [ "FlowType" ],
        fields: {
          argument: (0, _utils.validateType)("FlowType")
        }
      }), defineType("TypeAlias", {
        visitor: [ "id", "typeParameters", "right" ],
        aliases: [ "FlowDeclaration", "Statement", "Declaration" ],
        fields: {
          id: (0, _utils.validateType)("Identifier"),
          typeParameters: (0, _utils.validateOptionalType)("TypeParameterDeclaration"),
          right: (0, _utils.validateType)("FlowType")
        }
      }), defineType("TypeAnnotation", {
        visitor: [ "typeAnnotation" ],
        fields: {
          typeAnnotation: (0, _utils.validateType)("FlowType")
        }
      }), defineType("TypeCastExpression", {
        visitor: [ "expression", "typeAnnotation" ],
        aliases: [ "ExpressionWrapper", "Expression" ],
        fields: {
          expression: (0, _utils.validateType)("Expression"),
          typeAnnotation: (0, _utils.validateType)("TypeAnnotation")
        }
      }), defineType("TypeParameter", {
        visitor: [ "bound", "default", "variance" ],
        fields: {
          name: (0, _utils.validate)((0, _utils.assertValueType)("string")),
          bound: (0, _utils.validateOptionalType)("TypeAnnotation"),
          default: (0, _utils.validateOptionalType)("FlowType"),
          variance: (0, _utils.validateOptionalType)("Variance")
        }
      }), defineType("TypeParameterDeclaration", {
        visitor: [ "params" ],
        fields: {
          params: (0, _utils.validate)((0, _utils.arrayOfType)("TypeParameter"))
        }
      }), defineType("TypeParameterInstantiation", {
        visitor: [ "params" ],
        fields: {
          params: (0, _utils.validate)((0, _utils.arrayOfType)("FlowType"))
        }
      }), defineType("UnionTypeAnnotation", {
        visitor: [ "types" ],
        aliases: [ "FlowType" ],
        fields: {
          types: (0, _utils.validate)((0, _utils.arrayOfType)("FlowType"))
        }
      }), defineType("Variance", {
        builder: [ "kind" ],
        fields: {
          kind: (0, _utils.validate)((0, _utils.assertOneOf)("minus", "plus"))
        }
      }), defineType("VoidTypeAnnotation", {
        aliases: [ "FlowType", "FlowBaseAnnotation" ]
      }), defineType("EnumDeclaration", {
        aliases: [ "Statement", "Declaration" ],
        visitor: [ "id", "body" ],
        fields: {
          id: (0, _utils.validateType)("Identifier"),
          body: (0, _utils.validateType)([ "EnumBooleanBody", "EnumNumberBody", "EnumStringBody", "EnumSymbolBody" ])
        }
      }), defineType("EnumBooleanBody", {
        aliases: [ "EnumBody" ],
        visitor: [ "members" ],
        fields: {
          explicitType: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
          members: (0, _utils.validateArrayOfType)("EnumBooleanMember"),
          hasUnknownMembers: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
        }
      }), defineType("EnumNumberBody", {
        aliases: [ "EnumBody" ],
        visitor: [ "members" ],
        fields: {
          explicitType: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
          members: (0, _utils.validateArrayOfType)("EnumNumberMember"),
          hasUnknownMembers: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
        }
      }), defineType("EnumStringBody", {
        aliases: [ "EnumBody" ],
        visitor: [ "members" ],
        fields: {
          explicitType: (0, _utils.validate)((0, _utils.assertValueType)("boolean")),
          members: (0, _utils.validateArrayOfType)([ "EnumStringMember", "EnumDefaultedMember" ]),
          hasUnknownMembers: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
        }
      }), defineType("EnumSymbolBody", {
        aliases: [ "EnumBody" ],
        visitor: [ "members" ],
        fields: {
          members: (0, _utils.validateArrayOfType)("EnumDefaultedMember"),
          hasUnknownMembers: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
        }
      }), defineType("EnumBooleanMember", {
        aliases: [ "EnumMember" ],
        visitor: [ "id" ],
        fields: {
          id: (0, _utils.validateType)("Identifier"),
          init: (0, _utils.validateType)("BooleanLiteral")
        }
      }), defineType("EnumNumberMember", {
        aliases: [ "EnumMember" ],
        visitor: [ "id", "init" ],
        fields: {
          id: (0, _utils.validateType)("Identifier"),
          init: (0, _utils.validateType)("NumericLiteral")
        }
      }), defineType("EnumStringMember", {
        aliases: [ "EnumMember" ],
        visitor: [ "id", "init" ],
        fields: {
          id: (0, _utils.validateType)("Identifier"),
          init: (0, _utils.validateType)("StringLiteral")
        }
      }), defineType("EnumDefaultedMember", {
        aliases: [ "EnumMember" ],
        visitor: [ "id" ],
        fields: {
          id: (0, _utils.validateType)("Identifier")
        }
      }), defineType("IndexedAccessType", {
        visitor: [ "objectType", "indexType" ],
        aliases: [ "FlowType" ],
        fields: {
          objectType: (0, _utils.validateType)("FlowType"),
          indexType: (0, _utils.validateType)("FlowType")
        }
      }), defineType("OptionalIndexedAccessType", {
        visitor: [ "objectType", "indexType" ],
        aliases: [ "FlowType" ],
        fields: {
          objectType: (0, _utils.validateType)("FlowType"),
          indexType: (0, _utils.validateType)("FlowType"),
          optional: (0, _utils.validate)((0, _utils.assertValueType)("boolean"))
        }
      });
    },
    6507: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), Object.defineProperty(exports, "ALIAS_KEYS", {
        enumerable: !0,
        get: function() {
          return _utils.ALIAS_KEYS;
        }
      }), Object.defineProperty(exports, "BUILDER_KEYS", {
        enumerable: !0,
        get: function() {
          return _utils.BUILDER_KEYS;
        }
      }), Object.defineProperty(exports, "DEPRECATED_KEYS", {
        enumerable: !0,
        get: function() {
          return _utils.DEPRECATED_KEYS;
        }
      }), Object.defineProperty(exports, "FLIPPED_ALIAS_KEYS", {
        enumerable: !0,
        get: function() {
          return _utils.FLIPPED_ALIAS_KEYS;
        }
      }), Object.defineProperty(exports, "NODE_FIELDS", {
        enumerable: !0,
        get: function() {
          return _utils.NODE_FIELDS;
        }
      }), Object.defineProperty(exports, "NODE_PARENT_VALIDATIONS", {
        enumerable: !0,
        get: function() {
          return _utils.NODE_PARENT_VALIDATIONS;
        }
      }), Object.defineProperty(exports, "PLACEHOLDERS", {
        enumerable: !0,
        get: function() {
          return _placeholders.PLACEHOLDERS;
        }
      }), Object.defineProperty(exports, "PLACEHOLDERS_ALIAS", {
        enumerable: !0,
        get: function() {
          return _placeholders.PLACEHOLDERS_ALIAS;
        }
      }), Object.defineProperty(exports, "PLACEHOLDERS_FLIPPED_ALIAS", {
        enumerable: !0,
        get: function() {
          return _placeholders.PLACEHOLDERS_FLIPPED_ALIAS;
        }
      }), exports.TYPES = void 0, Object.defineProperty(exports, "VISITOR_KEYS", {
        enumerable: !0,
        get: function() {
          return _utils.VISITOR_KEYS;
        }
      });
      var _toFastProperties = __webpack_require__(3164);
      __webpack_require__(4457), __webpack_require__(5391), __webpack_require__(8565), 
      __webpack_require__(5030), __webpack_require__(1456), __webpack_require__(361);
      var _utils = __webpack_require__(4913), _placeholders = __webpack_require__(9488);
      _toFastProperties(_utils.VISITOR_KEYS), _toFastProperties(_utils.ALIAS_KEYS), _toFastProperties(_utils.FLIPPED_ALIAS_KEYS), 
      _toFastProperties(_utils.NODE_FIELDS), _toFastProperties(_utils.BUILDER_KEYS), _toFastProperties(_utils.DEPRECATED_KEYS), 
      _toFastProperties(_placeholders.PLACEHOLDERS_ALIAS), _toFastProperties(_placeholders.PLACEHOLDERS_FLIPPED_ALIAS);
      const TYPES = [].concat(Object.keys(_utils.VISITOR_KEYS), Object.keys(_utils.FLIPPED_ALIAS_KEYS), Object.keys(_utils.DEPRECATED_KEYS));
      exports.TYPES = TYPES;
    },
    8565: (__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var _utils = __webpack_require__(4913);
      const defineType = (0, _utils.defineAliasedType)("JSX");
      defineType("JSXAttribute", {
        visitor: [ "name", "value" ],
        aliases: [ "Immutable" ],
        fields: {
          name: {
            validate: (0, _utils.assertNodeType)("JSXIdentifier", "JSXNamespacedName")
          },
          value: {
            optional: !0,
            validate: (0, _utils.assertNodeType)("JSXElement", "JSXFragment", "StringLiteral", "JSXExpressionContainer")
          }
        }
      }), defineType("JSXClosingElement", {
        visitor: [ "name" ],
        aliases: [ "Immutable" ],
        fields: {
          name: {
            validate: (0, _utils.assertNodeType)("JSXIdentifier", "JSXMemberExpression", "JSXNamespacedName")
          }
        }
      }), defineType("JSXElement", {
        builder: [ "openingElement", "closingElement", "children", "selfClosing" ],
        visitor: [ "openingElement", "children", "closingElement" ],
        aliases: [ "Immutable", "Expression" ],
        fields: Object.assign({
          openingElement: {
            validate: (0, _utils.assertNodeType)("JSXOpeningElement")
          },
          closingElement: {
            optional: !0,
            validate: (0, _utils.assertNodeType)("JSXClosingElement")
          },
          children: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("JSXText", "JSXExpressionContainer", "JSXSpreadChild", "JSXElement", "JSXFragment")))
          }
        }, {
          selfClosing: {
            validate: (0, _utils.assertValueType)("boolean"),
            optional: !0
          }
        })
      }), defineType("JSXEmptyExpression", {}), defineType("JSXExpressionContainer", {
        visitor: [ "expression" ],
        aliases: [ "Immutable" ],
        fields: {
          expression: {
            validate: (0, _utils.assertNodeType)("Expression", "JSXEmptyExpression")
          }
        }
      }), defineType("JSXSpreadChild", {
        visitor: [ "expression" ],
        aliases: [ "Immutable" ],
        fields: {
          expression: {
            validate: (0, _utils.assertNodeType)("Expression")
          }
        }
      }), defineType("JSXIdentifier", {
        builder: [ "name" ],
        fields: {
          name: {
            validate: (0, _utils.assertValueType)("string")
          }
        }
      }), defineType("JSXMemberExpression", {
        visitor: [ "object", "property" ],
        fields: {
          object: {
            validate: (0, _utils.assertNodeType)("JSXMemberExpression", "JSXIdentifier")
          },
          property: {
            validate: (0, _utils.assertNodeType)("JSXIdentifier")
          }
        }
      }), defineType("JSXNamespacedName", {
        visitor: [ "namespace", "name" ],
        fields: {
          namespace: {
            validate: (0, _utils.assertNodeType)("JSXIdentifier")
          },
          name: {
            validate: (0, _utils.assertNodeType)("JSXIdentifier")
          }
        }
      }), defineType("JSXOpeningElement", {
        builder: [ "name", "attributes", "selfClosing" ],
        visitor: [ "name", "attributes" ],
        aliases: [ "Immutable" ],
        fields: {
          name: {
            validate: (0, _utils.assertNodeType)("JSXIdentifier", "JSXMemberExpression", "JSXNamespacedName")
          },
          selfClosing: {
            default: !1
          },
          attributes: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("JSXAttribute", "JSXSpreadAttribute")))
          },
          typeParameters: {
            validate: (0, _utils.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
            optional: !0
          }
        }
      }), defineType("JSXSpreadAttribute", {
        visitor: [ "argument" ],
        fields: {
          argument: {
            validate: (0, _utils.assertNodeType)("Expression")
          }
        }
      }), defineType("JSXText", {
        aliases: [ "Immutable" ],
        builder: [ "value" ],
        fields: {
          value: {
            validate: (0, _utils.assertValueType)("string")
          }
        }
      }), defineType("JSXFragment", {
        builder: [ "openingFragment", "closingFragment", "children" ],
        visitor: [ "openingFragment", "children", "closingFragment" ],
        aliases: [ "Immutable", "Expression" ],
        fields: {
          openingFragment: {
            validate: (0, _utils.assertNodeType)("JSXOpeningFragment")
          },
          closingFragment: {
            validate: (0, _utils.assertNodeType)("JSXClosingFragment")
          },
          children: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("JSXText", "JSXExpressionContainer", "JSXSpreadChild", "JSXElement", "JSXFragment")))
          }
        }
      }), defineType("JSXOpeningFragment", {
        aliases: [ "Immutable" ]
      }), defineType("JSXClosingFragment", {
        aliases: [ "Immutable" ]
      });
    },
    5030: (__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var _utils = __webpack_require__(4913), _placeholders = __webpack_require__(9488);
      const defineType = (0, _utils.defineAliasedType)("Miscellaneous");
      defineType("Noop", {
        visitor: []
      }), defineType("Placeholder", {
        visitor: [],
        builder: [ "expectedNode", "name" ],
        fields: {
          name: {
            validate: (0, _utils.assertNodeType)("Identifier")
          },
          expectedNode: {
            validate: (0, _utils.assertOneOf)(..._placeholders.PLACEHOLDERS)
          }
        }
      }), defineType("V8IntrinsicIdentifier", {
        builder: [ "name" ],
        fields: {
          name: {
            validate: (0, _utils.assertValueType)("string")
          }
        }
      });
    },
    9488: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.PLACEHOLDERS_FLIPPED_ALIAS = exports.PLACEHOLDERS_ALIAS = exports.PLACEHOLDERS = void 0;
      var _utils = __webpack_require__(4913);
      const PLACEHOLDERS = [ "Identifier", "StringLiteral", "Expression", "Statement", "Declaration", "BlockStatement", "ClassBody", "Pattern" ];
      exports.PLACEHOLDERS = PLACEHOLDERS;
      const PLACEHOLDERS_ALIAS = {
        Declaration: [ "Statement" ],
        Pattern: [ "PatternLike", "LVal" ]
      };
      exports.PLACEHOLDERS_ALIAS = PLACEHOLDERS_ALIAS;
      for (const type of PLACEHOLDERS) {
        const alias = _utils.ALIAS_KEYS[type];
        null != alias && alias.length && (PLACEHOLDERS_ALIAS[type] = alias);
      }
      const PLACEHOLDERS_FLIPPED_ALIAS = {};
      exports.PLACEHOLDERS_FLIPPED_ALIAS = PLACEHOLDERS_FLIPPED_ALIAS, Object.keys(PLACEHOLDERS_ALIAS).forEach((type => {
        PLACEHOLDERS_ALIAS[type].forEach((alias => {
          Object.hasOwnProperty.call(PLACEHOLDERS_FLIPPED_ALIAS, alias) || (PLACEHOLDERS_FLIPPED_ALIAS[alias] = []), 
          PLACEHOLDERS_FLIPPED_ALIAS[alias].push(type);
        }));
      }));
    },
    361: (__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var _utils = __webpack_require__(4913), _core = __webpack_require__(4457), _is = __webpack_require__(7275);
      const defineType = (0, _utils.defineAliasedType)("TypeScript"), bool = (0, _utils.assertValueType)("boolean"), tSFunctionTypeAnnotationCommon = {
        returnType: {
          validate: (0, _utils.assertNodeType)("TSTypeAnnotation", "Noop"),
          optional: !0
        },
        typeParameters: {
          validate: (0, _utils.assertNodeType)("TSTypeParameterDeclaration", "Noop"),
          optional: !0
        }
      };
      defineType("TSParameterProperty", {
        aliases: [ "LVal" ],
        visitor: [ "parameter" ],
        fields: {
          accessibility: {
            validate: (0, _utils.assertOneOf)("public", "private", "protected"),
            optional: !0
          },
          readonly: {
            validate: (0, _utils.assertValueType)("boolean"),
            optional: !0
          },
          parameter: {
            validate: (0, _utils.assertNodeType)("Identifier", "AssignmentPattern")
          },
          override: {
            validate: (0, _utils.assertValueType)("boolean"),
            optional: !0
          },
          decorators: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("Decorator"))),
            optional: !0
          }
        }
      }), defineType("TSDeclareFunction", {
        aliases: [ "Statement", "Declaration" ],
        visitor: [ "id", "typeParameters", "params", "returnType" ],
        fields: Object.assign({}, _core.functionDeclarationCommon, tSFunctionTypeAnnotationCommon)
      }), defineType("TSDeclareMethod", {
        visitor: [ "decorators", "key", "typeParameters", "params", "returnType" ],
        fields: Object.assign({}, _core.classMethodOrDeclareMethodCommon, tSFunctionTypeAnnotationCommon)
      }), defineType("TSQualifiedName", {
        aliases: [ "TSEntityName" ],
        visitor: [ "left", "right" ],
        fields: {
          left: (0, _utils.validateType)("TSEntityName"),
          right: (0, _utils.validateType)("Identifier")
        }
      });
      const signatureDeclarationCommon = {
        typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterDeclaration"),
        parameters: (0, _utils.validateArrayOfType)([ "Identifier", "RestElement" ]),
        typeAnnotation: (0, _utils.validateOptionalType)("TSTypeAnnotation")
      }, callConstructSignatureDeclaration = {
        aliases: [ "TSTypeElement" ],
        visitor: [ "typeParameters", "parameters", "typeAnnotation" ],
        fields: signatureDeclarationCommon
      };
      defineType("TSCallSignatureDeclaration", callConstructSignatureDeclaration), defineType("TSConstructSignatureDeclaration", callConstructSignatureDeclaration);
      const namedTypeElementCommon = {
        key: (0, _utils.validateType)("Expression"),
        computed: (0, _utils.validate)(bool),
        optional: (0, _utils.validateOptional)(bool)
      };
      defineType("TSPropertySignature", {
        aliases: [ "TSTypeElement" ],
        visitor: [ "key", "typeAnnotation", "initializer" ],
        fields: Object.assign({}, namedTypeElementCommon, {
          readonly: (0, _utils.validateOptional)(bool),
          typeAnnotation: (0, _utils.validateOptionalType)("TSTypeAnnotation"),
          initializer: (0, _utils.validateOptionalType)("Expression"),
          kind: {
            validate: (0, _utils.assertOneOf)("get", "set")
          }
        })
      }), defineType("TSMethodSignature", {
        aliases: [ "TSTypeElement" ],
        visitor: [ "key", "typeParameters", "parameters", "typeAnnotation" ],
        fields: Object.assign({}, signatureDeclarationCommon, namedTypeElementCommon, {
          kind: {
            validate: (0, _utils.assertOneOf)("method", "get", "set")
          }
        })
      }), defineType("TSIndexSignature", {
        aliases: [ "TSTypeElement" ],
        visitor: [ "parameters", "typeAnnotation" ],
        fields: {
          readonly: (0, _utils.validateOptional)(bool),
          static: (0, _utils.validateOptional)(bool),
          parameters: (0, _utils.validateArrayOfType)("Identifier"),
          typeAnnotation: (0, _utils.validateOptionalType)("TSTypeAnnotation")
        }
      });
      const tsKeywordTypes = [ "TSAnyKeyword", "TSBooleanKeyword", "TSBigIntKeyword", "TSIntrinsicKeyword", "TSNeverKeyword", "TSNullKeyword", "TSNumberKeyword", "TSObjectKeyword", "TSStringKeyword", "TSSymbolKeyword", "TSUndefinedKeyword", "TSUnknownKeyword", "TSVoidKeyword" ];
      for (const type of tsKeywordTypes) defineType(type, {
        aliases: [ "TSType", "TSBaseType" ],
        visitor: [],
        fields: {}
      });
      defineType("TSThisType", {
        aliases: [ "TSType", "TSBaseType" ],
        visitor: [],
        fields: {}
      });
      const fnOrCtrBase = {
        aliases: [ "TSType" ],
        visitor: [ "typeParameters", "parameters", "typeAnnotation" ]
      };
      defineType("TSFunctionType", Object.assign({}, fnOrCtrBase, {
        fields: signatureDeclarationCommon
      })), defineType("TSConstructorType", Object.assign({}, fnOrCtrBase, {
        fields: Object.assign({}, signatureDeclarationCommon, {
          abstract: (0, _utils.validateOptional)(bool)
        })
      })), defineType("TSTypeReference", {
        aliases: [ "TSType" ],
        visitor: [ "typeName", "typeParameters" ],
        fields: {
          typeName: (0, _utils.validateType)("TSEntityName"),
          typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
        }
      }), defineType("TSTypePredicate", {
        aliases: [ "TSType" ],
        visitor: [ "parameterName", "typeAnnotation" ],
        builder: [ "parameterName", "typeAnnotation", "asserts" ],
        fields: {
          parameterName: (0, _utils.validateType)([ "Identifier", "TSThisType" ]),
          typeAnnotation: (0, _utils.validateOptionalType)("TSTypeAnnotation"),
          asserts: (0, _utils.validateOptional)(bool)
        }
      }), defineType("TSTypeQuery", {
        aliases: [ "TSType" ],
        visitor: [ "exprName" ],
        fields: {
          exprName: (0, _utils.validateType)([ "TSEntityName", "TSImportType" ])
        }
      }), defineType("TSTypeLiteral", {
        aliases: [ "TSType" ],
        visitor: [ "members" ],
        fields: {
          members: (0, _utils.validateArrayOfType)("TSTypeElement")
        }
      }), defineType("TSArrayType", {
        aliases: [ "TSType" ],
        visitor: [ "elementType" ],
        fields: {
          elementType: (0, _utils.validateType)("TSType")
        }
      }), defineType("TSTupleType", {
        aliases: [ "TSType" ],
        visitor: [ "elementTypes" ],
        fields: {
          elementTypes: (0, _utils.validateArrayOfType)([ "TSType", "TSNamedTupleMember" ])
        }
      }), defineType("TSOptionalType", {
        aliases: [ "TSType" ],
        visitor: [ "typeAnnotation" ],
        fields: {
          typeAnnotation: (0, _utils.validateType)("TSType")
        }
      }), defineType("TSRestType", {
        aliases: [ "TSType" ],
        visitor: [ "typeAnnotation" ],
        fields: {
          typeAnnotation: (0, _utils.validateType)("TSType")
        }
      }), defineType("TSNamedTupleMember", {
        visitor: [ "label", "elementType" ],
        builder: [ "label", "elementType", "optional" ],
        fields: {
          label: (0, _utils.validateType)("Identifier"),
          optional: {
            validate: bool,
            default: !1
          },
          elementType: (0, _utils.validateType)("TSType")
        }
      });
      const unionOrIntersection = {
        aliases: [ "TSType" ],
        visitor: [ "types" ],
        fields: {
          types: (0, _utils.validateArrayOfType)("TSType")
        }
      };
      defineType("TSUnionType", unionOrIntersection), defineType("TSIntersectionType", unionOrIntersection), 
      defineType("TSConditionalType", {
        aliases: [ "TSType" ],
        visitor: [ "checkType", "extendsType", "trueType", "falseType" ],
        fields: {
          checkType: (0, _utils.validateType)("TSType"),
          extendsType: (0, _utils.validateType)("TSType"),
          trueType: (0, _utils.validateType)("TSType"),
          falseType: (0, _utils.validateType)("TSType")
        }
      }), defineType("TSInferType", {
        aliases: [ "TSType" ],
        visitor: [ "typeParameter" ],
        fields: {
          typeParameter: (0, _utils.validateType)("TSTypeParameter")
        }
      }), defineType("TSParenthesizedType", {
        aliases: [ "TSType" ],
        visitor: [ "typeAnnotation" ],
        fields: {
          typeAnnotation: (0, _utils.validateType)("TSType")
        }
      }), defineType("TSTypeOperator", {
        aliases: [ "TSType" ],
        visitor: [ "typeAnnotation" ],
        fields: {
          operator: (0, _utils.validate)((0, _utils.assertValueType)("string")),
          typeAnnotation: (0, _utils.validateType)("TSType")
        }
      }), defineType("TSIndexedAccessType", {
        aliases: [ "TSType" ],
        visitor: [ "objectType", "indexType" ],
        fields: {
          objectType: (0, _utils.validateType)("TSType"),
          indexType: (0, _utils.validateType)("TSType")
        }
      }), defineType("TSMappedType", {
        aliases: [ "TSType" ],
        visitor: [ "typeParameter", "typeAnnotation", "nameType" ],
        fields: {
          readonly: (0, _utils.validateOptional)(bool),
          typeParameter: (0, _utils.validateType)("TSTypeParameter"),
          optional: (0, _utils.validateOptional)(bool),
          typeAnnotation: (0, _utils.validateOptionalType)("TSType"),
          nameType: (0, _utils.validateOptionalType)("TSType")
        }
      }), defineType("TSLiteralType", {
        aliases: [ "TSType", "TSBaseType" ],
        visitor: [ "literal" ],
        fields: {
          literal: {
            validate: function() {
              const unaryExpression = (0, _utils.assertNodeType)("NumericLiteral", "BigIntLiteral"), unaryOperator = (0, 
              _utils.assertOneOf)("-"), literal = (0, _utils.assertNodeType)("NumericLiteral", "StringLiteral", "BooleanLiteral", "BigIntLiteral");
              function validator(parent, key, node) {
                (0, _is.default)("UnaryExpression", node) ? (unaryOperator(node, "operator", node.operator), 
                unaryExpression(node, "argument", node.argument)) : literal(parent, key, node);
              }
              return validator.oneOfNodeTypes = [ "NumericLiteral", "StringLiteral", "BooleanLiteral", "BigIntLiteral", "UnaryExpression" ], 
              validator;
            }()
          }
        }
      }), defineType("TSExpressionWithTypeArguments", {
        aliases: [ "TSType" ],
        visitor: [ "expression", "typeParameters" ],
        fields: {
          expression: (0, _utils.validateType)("TSEntityName"),
          typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
        }
      }), defineType("TSInterfaceDeclaration", {
        aliases: [ "Statement", "Declaration" ],
        visitor: [ "id", "typeParameters", "extends", "body" ],
        fields: {
          declare: (0, _utils.validateOptional)(bool),
          id: (0, _utils.validateType)("Identifier"),
          typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterDeclaration"),
          extends: (0, _utils.validateOptional)((0, _utils.arrayOfType)("TSExpressionWithTypeArguments")),
          body: (0, _utils.validateType)("TSInterfaceBody")
        }
      }), defineType("TSInterfaceBody", {
        visitor: [ "body" ],
        fields: {
          body: (0, _utils.validateArrayOfType)("TSTypeElement")
        }
      }), defineType("TSTypeAliasDeclaration", {
        aliases: [ "Statement", "Declaration" ],
        visitor: [ "id", "typeParameters", "typeAnnotation" ],
        fields: {
          declare: (0, _utils.validateOptional)(bool),
          id: (0, _utils.validateType)("Identifier"),
          typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterDeclaration"),
          typeAnnotation: (0, _utils.validateType)("TSType")
        }
      }), defineType("TSAsExpression", {
        aliases: [ "Expression" ],
        visitor: [ "expression", "typeAnnotation" ],
        fields: {
          expression: (0, _utils.validateType)("Expression"),
          typeAnnotation: (0, _utils.validateType)("TSType")
        }
      }), defineType("TSTypeAssertion", {
        aliases: [ "Expression" ],
        visitor: [ "typeAnnotation", "expression" ],
        fields: {
          typeAnnotation: (0, _utils.validateType)("TSType"),
          expression: (0, _utils.validateType)("Expression")
        }
      }), defineType("TSEnumDeclaration", {
        aliases: [ "Statement", "Declaration" ],
        visitor: [ "id", "members" ],
        fields: {
          declare: (0, _utils.validateOptional)(bool),
          const: (0, _utils.validateOptional)(bool),
          id: (0, _utils.validateType)("Identifier"),
          members: (0, _utils.validateArrayOfType)("TSEnumMember"),
          initializer: (0, _utils.validateOptionalType)("Expression")
        }
      }), defineType("TSEnumMember", {
        visitor: [ "id", "initializer" ],
        fields: {
          id: (0, _utils.validateType)([ "Identifier", "StringLiteral" ]),
          initializer: (0, _utils.validateOptionalType)("Expression")
        }
      }), defineType("TSModuleDeclaration", {
        aliases: [ "Statement", "Declaration" ],
        visitor: [ "id", "body" ],
        fields: {
          declare: (0, _utils.validateOptional)(bool),
          global: (0, _utils.validateOptional)(bool),
          id: (0, _utils.validateType)([ "Identifier", "StringLiteral" ]),
          body: (0, _utils.validateType)([ "TSModuleBlock", "TSModuleDeclaration" ])
        }
      }), defineType("TSModuleBlock", {
        aliases: [ "Scopable", "Block", "BlockParent" ],
        visitor: [ "body" ],
        fields: {
          body: (0, _utils.validateArrayOfType)("Statement")
        }
      }), defineType("TSImportType", {
        aliases: [ "TSType" ],
        visitor: [ "argument", "qualifier", "typeParameters" ],
        fields: {
          argument: (0, _utils.validateType)("StringLiteral"),
          qualifier: (0, _utils.validateOptionalType)("TSEntityName"),
          typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
        }
      }), defineType("TSImportEqualsDeclaration", {
        aliases: [ "Statement" ],
        visitor: [ "id", "moduleReference" ],
        fields: {
          isExport: (0, _utils.validate)(bool),
          id: (0, _utils.validateType)("Identifier"),
          moduleReference: (0, _utils.validateType)([ "TSEntityName", "TSExternalModuleReference" ]),
          importKind: {
            validate: (0, _utils.assertOneOf)("type", "value"),
            optional: !0
          }
        }
      }), defineType("TSExternalModuleReference", {
        visitor: [ "expression" ],
        fields: {
          expression: (0, _utils.validateType)("StringLiteral")
        }
      }), defineType("TSNonNullExpression", {
        aliases: [ "Expression" ],
        visitor: [ "expression" ],
        fields: {
          expression: (0, _utils.validateType)("Expression")
        }
      }), defineType("TSExportAssignment", {
        aliases: [ "Statement" ],
        visitor: [ "expression" ],
        fields: {
          expression: (0, _utils.validateType)("Expression")
        }
      }), defineType("TSNamespaceExportDeclaration", {
        aliases: [ "Statement" ],
        visitor: [ "id" ],
        fields: {
          id: (0, _utils.validateType)("Identifier")
        }
      }), defineType("TSTypeAnnotation", {
        visitor: [ "typeAnnotation" ],
        fields: {
          typeAnnotation: {
            validate: (0, _utils.assertNodeType)("TSType")
          }
        }
      }), defineType("TSTypeParameterInstantiation", {
        visitor: [ "params" ],
        fields: {
          params: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("TSType")))
          }
        }
      }), defineType("TSTypeParameterDeclaration", {
        visitor: [ "params" ],
        fields: {
          params: {
            validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, 
            _utils.assertNodeType)("TSTypeParameter")))
          }
        }
      }), defineType("TSTypeParameter", {
        builder: [ "constraint", "default", "name" ],
        visitor: [ "constraint", "default" ],
        fields: {
          name: {
            validate: (0, _utils.assertValueType)("string")
          },
          constraint: {
            validate: (0, _utils.assertNodeType)("TSType"),
            optional: !0
          },
          default: {
            validate: (0, _utils.assertNodeType)("TSType"),
            optional: !0
          }
        }
      });
    },
    4913: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.VISITOR_KEYS = exports.NODE_PARENT_VALIDATIONS = exports.NODE_FIELDS = exports.FLIPPED_ALIAS_KEYS = exports.DEPRECATED_KEYS = exports.BUILDER_KEYS = exports.ALIAS_KEYS = void 0, 
      exports.arrayOf = arrayOf, exports.arrayOfType = arrayOfType, exports.assertEach = assertEach, 
      exports.assertNodeOrValueType = function(...types) {
        function validate(node, key, val) {
          for (const type of types) if (getType(val) === type || (0, _is.default)(type, val)) return void (0, 
          _validate.validateChild)(node, key, val);
          throw new TypeError(`Property ${key} of ${node.type} expected node to be of a type ${JSON.stringify(types)} but instead got ${JSON.stringify(null == val ? void 0 : val.type)}`);
        }
        return validate.oneOfNodeOrValueTypes = types, validate;
      }, exports.assertNodeType = assertNodeType, exports.assertOneOf = function(...values) {
        function validate(node, key, val) {
          if (values.indexOf(val) < 0) throw new TypeError(`Property ${key} expected value to be one of ${JSON.stringify(values)} but got ${JSON.stringify(val)}`);
        }
        return validate.oneOf = values, validate;
      }, exports.assertOptionalChainStart = function() {
        return function(node) {
          var _current;
          let current = node;
          for (;node; ) {
            const {type} = current;
            if ("OptionalCallExpression" !== type) {
              if ("OptionalMemberExpression" !== type) break;
              if (current.optional) return;
              current = current.object;
            } else {
              if (current.optional) return;
              current = current.callee;
            }
          }
          throw new TypeError(`Non-optional ${node.type} must chain from an optional OptionalMemberExpression or OptionalCallExpression. Found chain from ${null == (_current = current) ? void 0 : _current.type}`);
        };
      }, exports.assertShape = function(shape) {
        function validate(node, key, val) {
          const errors = [];
          for (const property of Object.keys(shape)) try {
            (0, _validate.validateField)(node, property, val[property], shape[property]);
          } catch (error) {
            if (error instanceof TypeError) {
              errors.push(error.message);
              continue;
            }
            throw error;
          }
          if (errors.length) throw new TypeError(`Property ${key} of ${node.type} expected to have the following:\n${errors.join("\n")}`);
        }
        return validate.shapeOf = shape, validate;
      }, exports.assertValueType = assertValueType, exports.chain = chain, exports.default = defineType, 
      exports.defineAliasedType = function(...aliases) {
        return (type, opts = {}) => {
          let defined = opts.aliases;
          var _store$opts$inherits$;
          defined || (opts.inherits && (defined = null == (_store$opts$inherits$ = store[opts.inherits].aliases) ? void 0 : _store$opts$inherits$.slice()), 
          null != defined || (defined = []), opts.aliases = defined);
          const additional = aliases.filter((a => !defined.includes(a)));
          return defined.unshift(...additional), defineType(type, opts);
        };
      }, exports.typeIs = typeIs, exports.validate = validate, exports.validateArrayOfType = function(typeName) {
        return validate(arrayOfType(typeName));
      }, exports.validateOptional = function(validate) {
        return {
          validate,
          optional: !0
        };
      }, exports.validateOptionalType = function(typeName) {
        return {
          validate: typeIs(typeName),
          optional: !0
        };
      }, exports.validateType = function(typeName) {
        return validate(typeIs(typeName));
      };
      var _is = __webpack_require__(7275), _validate = __webpack_require__(3804);
      const VISITOR_KEYS = {};
      exports.VISITOR_KEYS = VISITOR_KEYS;
      const ALIAS_KEYS = {};
      exports.ALIAS_KEYS = ALIAS_KEYS;
      const FLIPPED_ALIAS_KEYS = {};
      exports.FLIPPED_ALIAS_KEYS = FLIPPED_ALIAS_KEYS;
      const NODE_FIELDS = {};
      exports.NODE_FIELDS = NODE_FIELDS;
      const BUILDER_KEYS = {};
      exports.BUILDER_KEYS = BUILDER_KEYS;
      const DEPRECATED_KEYS = {};
      exports.DEPRECATED_KEYS = DEPRECATED_KEYS;
      const NODE_PARENT_VALIDATIONS = {};
      function getType(val) {
        return Array.isArray(val) ? "array" : null === val ? "null" : typeof val;
      }
      function validate(validate) {
        return {
          validate
        };
      }
      function typeIs(typeName) {
        return "string" == typeof typeName ? assertNodeType(typeName) : assertNodeType(...typeName);
      }
      function arrayOf(elementType) {
        return chain(assertValueType("array"), assertEach(elementType));
      }
      function arrayOfType(typeName) {
        return arrayOf(typeIs(typeName));
      }
      function assertEach(callback) {
        function validator(node, key, val) {
          if (Array.isArray(val)) for (let i = 0; i < val.length; i++) {
            const subkey = `${key}[${i}]`, v = val[i];
            callback(node, subkey, v), process.env.BABEL_TYPES_8_BREAKING && (0, _validate.validateChild)(node, subkey, v);
          }
        }
        return validator.each = callback, validator;
      }
      function assertNodeType(...types) {
        function validate(node, key, val) {
          for (const type of types) if ((0, _is.default)(type, val)) return void (0, _validate.validateChild)(node, key, val);
          throw new TypeError(`Property ${key} of ${node.type} expected node to be of a type ${JSON.stringify(types)} but instead got ${JSON.stringify(null == val ? void 0 : val.type)}`);
        }
        return validate.oneOfNodeTypes = types, validate;
      }
      function assertValueType(type) {
        function validate(node, key, val) {
          if (!(getType(val) === type)) throw new TypeError(`Property ${key} expected type of ${type} but got ${getType(val)}`);
        }
        return validate.type = type, validate;
      }
      function chain(...fns) {
        function validate(...args) {
          for (const fn of fns) fn(...args);
        }
        if (validate.chainOf = fns, fns.length >= 2 && "type" in fns[0] && "array" === fns[0].type && !("each" in fns[1])) throw new Error('An assertValueType("array") validator can only be followed by an assertEach(...) validator.');
        return validate;
      }
      exports.NODE_PARENT_VALIDATIONS = NODE_PARENT_VALIDATIONS;
      const validTypeOpts = [ "aliases", "builder", "deprecatedAlias", "fields", "inherits", "visitor", "validate" ], validFieldKeys = [ "default", "optional", "validate" ];
      function defineType(type, opts = {}) {
        const inherits = opts.inherits && store[opts.inherits] || {};
        let fields = opts.fields;
        if (!fields && (fields = {}, inherits.fields)) {
          const keys = Object.getOwnPropertyNames(inherits.fields);
          for (const key of keys) {
            const field = inherits.fields[key], def = field.default;
            if (Array.isArray(def) ? def.length > 0 : def && "object" == typeof def) throw new Error("field defaults can only be primitives or empty arrays currently");
            fields[key] = {
              default: Array.isArray(def) ? [] : def,
              optional: field.optional,
              validate: field.validate
            };
          }
        }
        const visitor = opts.visitor || inherits.visitor || [], aliases = opts.aliases || inherits.aliases || [], builder = opts.builder || inherits.builder || opts.visitor || [];
        for (const k of Object.keys(opts)) if (-1 === validTypeOpts.indexOf(k)) throw new Error(`Unknown type option "${k}" on ${type}`);
        opts.deprecatedAlias && (DEPRECATED_KEYS[opts.deprecatedAlias] = type);
        for (const key of visitor.concat(builder)) fields[key] = fields[key] || {};
        for (const key of Object.keys(fields)) {
          const field = fields[key];
          void 0 !== field.default && -1 === builder.indexOf(key) && (field.optional = !0), 
          void 0 === field.default ? field.default = null : field.validate || null == field.default || (field.validate = assertValueType(getType(field.default)));
          for (const k of Object.keys(field)) if (-1 === validFieldKeys.indexOf(k)) throw new Error(`Unknown field key "${k}" on ${type}.${key}`);
        }
        VISITOR_KEYS[type] = opts.visitor = visitor, BUILDER_KEYS[type] = opts.builder = builder, 
        NODE_FIELDS[type] = opts.fields = fields, ALIAS_KEYS[type] = opts.aliases = aliases, 
        aliases.forEach((alias => {
          FLIPPED_ALIAS_KEYS[alias] = FLIPPED_ALIAS_KEYS[alias] || [], FLIPPED_ALIAS_KEYS[alias].push(type);
        })), opts.validate && (NODE_PARENT_VALIDATIONS[type] = opts.validate), store[type] = opts;
      }
      const store = {};
    },
    8218: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      });
      var _exportNames = {
        react: !0,
        assertNode: !0,
        createTypeAnnotationBasedOnTypeof: !0,
        createUnionTypeAnnotation: !0,
        createFlowUnionType: !0,
        createTSUnionType: !0,
        cloneNode: !0,
        clone: !0,
        cloneDeep: !0,
        cloneDeepWithoutLoc: !0,
        cloneWithoutLoc: !0,
        addComment: !0,
        addComments: !0,
        inheritInnerComments: !0,
        inheritLeadingComments: !0,
        inheritsComments: !0,
        inheritTrailingComments: !0,
        removeComments: !0,
        ensureBlock: !0,
        toBindingIdentifierName: !0,
        toBlock: !0,
        toComputedKey: !0,
        toExpression: !0,
        toIdentifier: !0,
        toKeyAlias: !0,
        toSequenceExpression: !0,
        toStatement: !0,
        valueToNode: !0,
        appendToMemberExpression: !0,
        inherits: !0,
        prependToMemberExpression: !0,
        removeProperties: !0,
        removePropertiesDeep: !0,
        removeTypeDuplicates: !0,
        getBindingIdentifiers: !0,
        getOuterBindingIdentifiers: !0,
        traverse: !0,
        traverseFast: !0,
        shallowEqual: !0,
        is: !0,
        isBinding: !0,
        isBlockScoped: !0,
        isImmutable: !0,
        isLet: !0,
        isNode: !0,
        isNodesEquivalent: !0,
        isPlaceholderType: !0,
        isReferenced: !0,
        isScope: !0,
        isSpecifierDefault: !0,
        isType: !0,
        isValidES3Identifier: !0,
        isValidIdentifier: !0,
        isVar: !0,
        matchesPattern: !0,
        validate: !0,
        buildMatchMemberExpression: !0
      };
      Object.defineProperty(exports, "addComment", {
        enumerable: !0,
        get: function() {
          return _addComment.default;
        }
      }), Object.defineProperty(exports, "addComments", {
        enumerable: !0,
        get: function() {
          return _addComments.default;
        }
      }), Object.defineProperty(exports, "appendToMemberExpression", {
        enumerable: !0,
        get: function() {
          return _appendToMemberExpression.default;
        }
      }), Object.defineProperty(exports, "assertNode", {
        enumerable: !0,
        get: function() {
          return _assertNode.default;
        }
      }), Object.defineProperty(exports, "buildMatchMemberExpression", {
        enumerable: !0,
        get: function() {
          return _buildMatchMemberExpression.default;
        }
      }), Object.defineProperty(exports, "clone", {
        enumerable: !0,
        get: function() {
          return _clone.default;
        }
      }), Object.defineProperty(exports, "cloneDeep", {
        enumerable: !0,
        get: function() {
          return _cloneDeep.default;
        }
      }), Object.defineProperty(exports, "cloneDeepWithoutLoc", {
        enumerable: !0,
        get: function() {
          return _cloneDeepWithoutLoc.default;
        }
      }), Object.defineProperty(exports, "cloneNode", {
        enumerable: !0,
        get: function() {
          return _cloneNode.default;
        }
      }), Object.defineProperty(exports, "cloneWithoutLoc", {
        enumerable: !0,
        get: function() {
          return _cloneWithoutLoc.default;
        }
      }), Object.defineProperty(exports, "createFlowUnionType", {
        enumerable: !0,
        get: function() {
          return _createFlowUnionType.default;
        }
      }), Object.defineProperty(exports, "createTSUnionType", {
        enumerable: !0,
        get: function() {
          return _createTSUnionType.default;
        }
      }), Object.defineProperty(exports, "createTypeAnnotationBasedOnTypeof", {
        enumerable: !0,
        get: function() {
          return _createTypeAnnotationBasedOnTypeof.default;
        }
      }), Object.defineProperty(exports, "createUnionTypeAnnotation", {
        enumerable: !0,
        get: function() {
          return _createFlowUnionType.default;
        }
      }), Object.defineProperty(exports, "ensureBlock", {
        enumerable: !0,
        get: function() {
          return _ensureBlock.default;
        }
      }), Object.defineProperty(exports, "getBindingIdentifiers", {
        enumerable: !0,
        get: function() {
          return _getBindingIdentifiers.default;
        }
      }), Object.defineProperty(exports, "getOuterBindingIdentifiers", {
        enumerable: !0,
        get: function() {
          return _getOuterBindingIdentifiers.default;
        }
      }), Object.defineProperty(exports, "inheritInnerComments", {
        enumerable: !0,
        get: function() {
          return _inheritInnerComments.default;
        }
      }), Object.defineProperty(exports, "inheritLeadingComments", {
        enumerable: !0,
        get: function() {
          return _inheritLeadingComments.default;
        }
      }), Object.defineProperty(exports, "inheritTrailingComments", {
        enumerable: !0,
        get: function() {
          return _inheritTrailingComments.default;
        }
      }), Object.defineProperty(exports, "inherits", {
        enumerable: !0,
        get: function() {
          return _inherits.default;
        }
      }), Object.defineProperty(exports, "inheritsComments", {
        enumerable: !0,
        get: function() {
          return _inheritsComments.default;
        }
      }), Object.defineProperty(exports, "is", {
        enumerable: !0,
        get: function() {
          return _is.default;
        }
      }), Object.defineProperty(exports, "isBinding", {
        enumerable: !0,
        get: function() {
          return _isBinding.default;
        }
      }), Object.defineProperty(exports, "isBlockScoped", {
        enumerable: !0,
        get: function() {
          return _isBlockScoped.default;
        }
      }), Object.defineProperty(exports, "isImmutable", {
        enumerable: !0,
        get: function() {
          return _isImmutable.default;
        }
      }), Object.defineProperty(exports, "isLet", {
        enumerable: !0,
        get: function() {
          return _isLet.default;
        }
      }), Object.defineProperty(exports, "isNode", {
        enumerable: !0,
        get: function() {
          return _isNode.default;
        }
      }), Object.defineProperty(exports, "isNodesEquivalent", {
        enumerable: !0,
        get: function() {
          return _isNodesEquivalent.default;
        }
      }), Object.defineProperty(exports, "isPlaceholderType", {
        enumerable: !0,
        get: function() {
          return _isPlaceholderType.default;
        }
      }), Object.defineProperty(exports, "isReferenced", {
        enumerable: !0,
        get: function() {
          return _isReferenced.default;
        }
      }), Object.defineProperty(exports, "isScope", {
        enumerable: !0,
        get: function() {
          return _isScope.default;
        }
      }), Object.defineProperty(exports, "isSpecifierDefault", {
        enumerable: !0,
        get: function() {
          return _isSpecifierDefault.default;
        }
      }), Object.defineProperty(exports, "isType", {
        enumerable: !0,
        get: function() {
          return _isType.default;
        }
      }), Object.defineProperty(exports, "isValidES3Identifier", {
        enumerable: !0,
        get: function() {
          return _isValidES3Identifier.default;
        }
      }), Object.defineProperty(exports, "isValidIdentifier", {
        enumerable: !0,
        get: function() {
          return _isValidIdentifier.default;
        }
      }), Object.defineProperty(exports, "isVar", {
        enumerable: !0,
        get: function() {
          return _isVar.default;
        }
      }), Object.defineProperty(exports, "matchesPattern", {
        enumerable: !0,
        get: function() {
          return _matchesPattern.default;
        }
      }), Object.defineProperty(exports, "prependToMemberExpression", {
        enumerable: !0,
        get: function() {
          return _prependToMemberExpression.default;
        }
      }), exports.react = void 0, Object.defineProperty(exports, "removeComments", {
        enumerable: !0,
        get: function() {
          return _removeComments.default;
        }
      }), Object.defineProperty(exports, "removeProperties", {
        enumerable: !0,
        get: function() {
          return _removeProperties.default;
        }
      }), Object.defineProperty(exports, "removePropertiesDeep", {
        enumerable: !0,
        get: function() {
          return _removePropertiesDeep.default;
        }
      }), Object.defineProperty(exports, "removeTypeDuplicates", {
        enumerable: !0,
        get: function() {
          return _removeTypeDuplicates.default;
        }
      }), Object.defineProperty(exports, "shallowEqual", {
        enumerable: !0,
        get: function() {
          return _shallowEqual.default;
        }
      }), Object.defineProperty(exports, "toBindingIdentifierName", {
        enumerable: !0,
        get: function() {
          return _toBindingIdentifierName.default;
        }
      }), Object.defineProperty(exports, "toBlock", {
        enumerable: !0,
        get: function() {
          return _toBlock.default;
        }
      }), Object.defineProperty(exports, "toComputedKey", {
        enumerable: !0,
        get: function() {
          return _toComputedKey.default;
        }
      }), Object.defineProperty(exports, "toExpression", {
        enumerable: !0,
        get: function() {
          return _toExpression.default;
        }
      }), Object.defineProperty(exports, "toIdentifier", {
        enumerable: !0,
        get: function() {
          return _toIdentifier.default;
        }
      }), Object.defineProperty(exports, "toKeyAlias", {
        enumerable: !0,
        get: function() {
          return _toKeyAlias.default;
        }
      }), Object.defineProperty(exports, "toSequenceExpression", {
        enumerable: !0,
        get: function() {
          return _toSequenceExpression.default;
        }
      }), Object.defineProperty(exports, "toStatement", {
        enumerable: !0,
        get: function() {
          return _toStatement.default;
        }
      }), Object.defineProperty(exports, "traverse", {
        enumerable: !0,
        get: function() {
          return _traverse.default;
        }
      }), Object.defineProperty(exports, "traverseFast", {
        enumerable: !0,
        get: function() {
          return _traverseFast.default;
        }
      }), Object.defineProperty(exports, "validate", {
        enumerable: !0,
        get: function() {
          return _validate.default;
        }
      }), Object.defineProperty(exports, "valueToNode", {
        enumerable: !0,
        get: function() {
          return _valueToNode.default;
        }
      });
      var _isReactComponent = __webpack_require__(6035), _isCompatTag = __webpack_require__(3193), _buildChildren = __webpack_require__(8478), _assertNode = __webpack_require__(245), _generated = __webpack_require__(7133);
      Object.keys(_generated).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (Object.prototype.hasOwnProperty.call(_exportNames, key) || key in exports && exports[key] === _generated[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _generated[key];
          }
        }));
      }));
      var _createTypeAnnotationBasedOnTypeof = __webpack_require__(949), _createFlowUnionType = __webpack_require__(9983), _createTSUnionType = __webpack_require__(4571), _generated2 = __webpack_require__(4391);
      Object.keys(_generated2).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (Object.prototype.hasOwnProperty.call(_exportNames, key) || key in exports && exports[key] === _generated2[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _generated2[key];
          }
        }));
      }));
      var _uppercase = __webpack_require__(6104);
      Object.keys(_uppercase).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (Object.prototype.hasOwnProperty.call(_exportNames, key) || key in exports && exports[key] === _uppercase[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _uppercase[key];
          }
        }));
      }));
      var _cloneNode = __webpack_require__(6209), _clone = __webpack_require__(2363), _cloneDeep = __webpack_require__(6953), _cloneDeepWithoutLoc = __webpack_require__(863), _cloneWithoutLoc = __webpack_require__(748), _addComment = __webpack_require__(9529), _addComments = __webpack_require__(6182), _inheritInnerComments = __webpack_require__(6455), _inheritLeadingComments = __webpack_require__(1835), _inheritsComments = __webpack_require__(9564), _inheritTrailingComments = __webpack_require__(9653), _removeComments = __webpack_require__(659), _generated3 = __webpack_require__(8267);
      Object.keys(_generated3).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (Object.prototype.hasOwnProperty.call(_exportNames, key) || key in exports && exports[key] === _generated3[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _generated3[key];
          }
        }));
      }));
      var _constants = __webpack_require__(6325);
      Object.keys(_constants).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (Object.prototype.hasOwnProperty.call(_exportNames, key) || key in exports && exports[key] === _constants[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _constants[key];
          }
        }));
      }));
      var _ensureBlock = __webpack_require__(4315), _toBindingIdentifierName = __webpack_require__(8316), _toBlock = __webpack_require__(9276), _toComputedKey = __webpack_require__(9434), _toExpression = __webpack_require__(3348), _toIdentifier = __webpack_require__(1309), _toKeyAlias = __webpack_require__(510), _toSequenceExpression = __webpack_require__(1435), _toStatement = __webpack_require__(2307), _valueToNode = __webpack_require__(6794), _definitions = __webpack_require__(6507);
      Object.keys(_definitions).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (Object.prototype.hasOwnProperty.call(_exportNames, key) || key in exports && exports[key] === _definitions[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _definitions[key];
          }
        }));
      }));
      var _appendToMemberExpression = __webpack_require__(7899), _inherits = __webpack_require__(3633), _prependToMemberExpression = __webpack_require__(3094), _removeProperties = __webpack_require__(2714), _removePropertiesDeep = __webpack_require__(4936), _removeTypeDuplicates = __webpack_require__(7321), _getBindingIdentifiers = __webpack_require__(1477), _getOuterBindingIdentifiers = __webpack_require__(2812), _traverse = __webpack_require__(8880);
      Object.keys(_traverse).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (Object.prototype.hasOwnProperty.call(_exportNames, key) || key in exports && exports[key] === _traverse[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _traverse[key];
          }
        }));
      }));
      var _traverseFast = __webpack_require__(2862), _shallowEqual = __webpack_require__(7610), _is = __webpack_require__(7275), _isBinding = __webpack_require__(6971), _isBlockScoped = __webpack_require__(443), _isImmutable = __webpack_require__(9268), _isLet = __webpack_require__(7182), _isNode = __webpack_require__(8523), _isNodesEquivalent = __webpack_require__(4635), _isPlaceholderType = __webpack_require__(15), _isReferenced = __webpack_require__(4837), _isScope = __webpack_require__(6400), _isSpecifierDefault = __webpack_require__(2800), _isType = __webpack_require__(1452), _isValidES3Identifier = __webpack_require__(8917), _isValidIdentifier = __webpack_require__(3045), _isVar = __webpack_require__(830), _matchesPattern = __webpack_require__(2205), _validate = __webpack_require__(3804), _buildMatchMemberExpression = __webpack_require__(8847), _generated4 = __webpack_require__(4746);
      Object.keys(_generated4).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (Object.prototype.hasOwnProperty.call(_exportNames, key) || key in exports && exports[key] === _generated4[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _generated4[key];
          }
        }));
      }));
      var _generated5 = __webpack_require__(1585);
      Object.keys(_generated5).forEach((function(key) {
        "default" !== key && "__esModule" !== key && (Object.prototype.hasOwnProperty.call(_exportNames, key) || key in exports && exports[key] === _generated5[key] || Object.defineProperty(exports, key, {
          enumerable: !0,
          get: function() {
            return _generated5[key];
          }
        }));
      }));
      const react = {
        isReactComponent: _isReactComponent.default,
        isCompatTag: _isCompatTag.default,
        buildChildren: _buildChildren.default
      };
      exports.react = react;
    },
    7899: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(member, append, computed = !1) {
        return member.object = (0, _generated.memberExpression)(member.object, member.property, member.computed), 
        member.property = append, member.computed = !!computed, member;
      };
      var _generated = __webpack_require__(4391);
    },
    7321: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function removeTypeDuplicates(nodes) {
        const generics = {}, bases = {}, typeGroups = new Set, types = [];
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          if (node && !(types.indexOf(node) >= 0)) {
            if ((0, _generated.isAnyTypeAnnotation)(node)) return [ node ];
            if ((0, _generated.isFlowBaseAnnotation)(node)) bases[node.type] = node; else if ((0, 
            _generated.isUnionTypeAnnotation)(node)) typeGroups.has(node.types) || (nodes = nodes.concat(node.types), 
            typeGroups.add(node.types)); else if ((0, _generated.isGenericTypeAnnotation)(node)) {
              const name = getQualifiedName(node.id);
              if (generics[name]) {
                let existing = generics[name];
                existing.typeParameters ? node.typeParameters && (existing.typeParameters.params = removeTypeDuplicates(existing.typeParameters.params.concat(node.typeParameters.params))) : existing = node.typeParameters;
              } else generics[name] = node;
            } else types.push(node);
          }
        }
        for (const type of Object.keys(bases)) types.push(bases[type]);
        for (const name of Object.keys(generics)) types.push(generics[name]);
        return types;
      };
      var _generated = __webpack_require__(4746);
      function getQualifiedName(node) {
        return (0, _generated.isIdentifier)(node) ? node.name : `${node.id.name}.${getQualifiedName(node.qualification)}`;
      }
    },
    3633: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(child, parent) {
        if (!child || !parent) return child;
        for (const key of _constants.INHERIT_KEYS.optional) null == child[key] && (child[key] = parent[key]);
        for (const key of Object.keys(parent)) "_" === key[0] && "__clone" !== key && (child[key] = parent[key]);
        for (const key of _constants.INHERIT_KEYS.force) child[key] = parent[key];
        return (0, _inheritsComments.default)(child, parent), child;
      };
      var _constants = __webpack_require__(6325), _inheritsComments = __webpack_require__(9564);
    },
    3094: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(member, prepend) {
        return member.object = (0, _generated.memberExpression)(prepend, member.object), 
        member;
      };
      var _generated = __webpack_require__(4391);
    },
    2714: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(node, opts = {}) {
        const map = opts.preserveComments ? CLEAR_KEYS : CLEAR_KEYS_PLUS_COMMENTS;
        for (const key of map) null != node[key] && (node[key] = void 0);
        for (const key of Object.keys(node)) "_" === key[0] && null != node[key] && (node[key] = void 0);
        const symbols = Object.getOwnPropertySymbols(node);
        for (const sym of symbols) node[sym] = null;
      };
      var _constants = __webpack_require__(6325);
      const CLEAR_KEYS = [ "tokens", "start", "end", "loc", "raw", "rawValue" ], CLEAR_KEYS_PLUS_COMMENTS = _constants.COMMENT_KEYS.concat([ "comments" ]).concat(CLEAR_KEYS);
    },
    4936: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(tree, opts) {
        return (0, _traverseFast.default)(tree, _removeProperties.default, opts), tree;
      };
      var _traverseFast = __webpack_require__(2862), _removeProperties = __webpack_require__(2714);
    },
    1954: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(nodes) {
        const generics = {}, bases = {}, typeGroups = new Set, types = [];
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          if (node && !(types.indexOf(node) >= 0)) {
            if ((0, _generated.isTSAnyKeyword)(node)) return [ node ];
            (0, _generated.isTSBaseType)(node) ? bases[node.type] = node : (0, _generated.isTSUnionType)(node) ? typeGroups.has(node.types) || (nodes.push(...node.types), 
            typeGroups.add(node.types)) : types.push(node);
          }
        }
        for (const type of Object.keys(bases)) types.push(bases[type]);
        for (const name of Object.keys(generics)) types.push(generics[name]);
        return types;
      };
      var _generated = __webpack_require__(4746);
    },
    1477: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = getBindingIdentifiers;
      var _generated = __webpack_require__(4746);
      function getBindingIdentifiers(node, duplicates, outerOnly) {
        let search = [].concat(node);
        const ids = Object.create(null);
        for (;search.length; ) {
          const id = search.shift();
          if (!id) continue;
          const keys = getBindingIdentifiers.keys[id.type];
          if ((0, _generated.isIdentifier)(id)) if (duplicates) {
            (ids[id.name] = ids[id.name] || []).push(id);
          } else ids[id.name] = id; else if (!(0, _generated.isExportDeclaration)(id) || (0, 
          _generated.isExportAllDeclaration)(id)) {
            if (outerOnly) {
              if ((0, _generated.isFunctionDeclaration)(id)) {
                search.push(id.id);
                continue;
              }
              if ((0, _generated.isFunctionExpression)(id)) continue;
            }
            if (keys) for (let i = 0; i < keys.length; i++) {
              const key = keys[i];
              id[key] && (search = search.concat(id[key]));
            }
          } else (0, _generated.isDeclaration)(id.declaration) && search.push(id.declaration);
        }
        return ids;
      }
      getBindingIdentifiers.keys = {
        DeclareClass: [ "id" ],
        DeclareFunction: [ "id" ],
        DeclareModule: [ "id" ],
        DeclareVariable: [ "id" ],
        DeclareInterface: [ "id" ],
        DeclareTypeAlias: [ "id" ],
        DeclareOpaqueType: [ "id" ],
        InterfaceDeclaration: [ "id" ],
        TypeAlias: [ "id" ],
        OpaqueType: [ "id" ],
        CatchClause: [ "param" ],
        LabeledStatement: [ "label" ],
        UnaryExpression: [ "argument" ],
        AssignmentExpression: [ "left" ],
        ImportSpecifier: [ "local" ],
        ImportNamespaceSpecifier: [ "local" ],
        ImportDefaultSpecifier: [ "local" ],
        ImportDeclaration: [ "specifiers" ],
        ExportSpecifier: [ "exported" ],
        ExportNamespaceSpecifier: [ "exported" ],
        ExportDefaultSpecifier: [ "exported" ],
        FunctionDeclaration: [ "id", "params" ],
        FunctionExpression: [ "id", "params" ],
        ArrowFunctionExpression: [ "params" ],
        ObjectMethod: [ "params" ],
        ClassMethod: [ "params" ],
        ClassPrivateMethod: [ "params" ],
        ForInStatement: [ "left" ],
        ForOfStatement: [ "left" ],
        ClassDeclaration: [ "id" ],
        ClassExpression: [ "id" ],
        RestElement: [ "argument" ],
        UpdateExpression: [ "argument" ],
        ObjectProperty: [ "value" ],
        AssignmentPattern: [ "left" ],
        ArrayPattern: [ "elements" ],
        ObjectPattern: [ "properties" ],
        VariableDeclaration: [ "declarations" ],
        VariableDeclarator: [ "id" ]
      };
    },
    2812: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      var _getBindingIdentifiers = __webpack_require__(1477), _default = function(node, duplicates) {
        return (0, _getBindingIdentifiers.default)(node, duplicates, !0);
      };
      exports.default = _default;
    },
    8880: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(node, handlers, state) {
        "function" == typeof handlers && (handlers = {
          enter: handlers
        });
        const {enter, exit} = handlers;
        traverseSimpleImpl(node, enter, exit, state, []);
      };
      var _definitions = __webpack_require__(6507);
      function traverseSimpleImpl(node, enter, exit, state, ancestors) {
        const keys = _definitions.VISITOR_KEYS[node.type];
        if (keys) {
          enter && enter(node, ancestors, state);
          for (const key of keys) {
            const subNode = node[key];
            if (Array.isArray(subNode)) for (let i = 0; i < subNode.length; i++) {
              const child = subNode[i];
              child && (ancestors.push({
                node,
                key,
                index: i
              }), traverseSimpleImpl(child, enter, exit, state, ancestors), ancestors.pop());
            } else subNode && (ancestors.push({
              node,
              key
            }), traverseSimpleImpl(subNode, enter, exit, state, ancestors), ancestors.pop());
          }
          exit && exit(node, ancestors, state);
        }
      }
    },
    2862: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function traverseFast(node, enter, opts) {
        if (!node) return;
        const keys = _definitions.VISITOR_KEYS[node.type];
        if (!keys) return;
        enter(node, opts = opts || {});
        for (const key of keys) {
          const subNode = node[key];
          if (Array.isArray(subNode)) for (const node of subNode) traverseFast(node, enter, opts); else traverseFast(subNode, enter, opts);
        }
      };
      var _definitions = __webpack_require__(6507);
    },
    8834: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(key, child, parent) {
        child && parent && (child[key] = Array.from(new Set([].concat(child[key], parent[key]).filter(Boolean))));
      };
    },
    5835: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(child, args) {
        const lines = child.value.split(/\r\n|\n|\r/);
        let lastNonEmptyLine = 0;
        for (let i = 0; i < lines.length; i++) lines[i].match(/[^ \t]/) && (lastNonEmptyLine = i);
        let str = "";
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i], isFirstLine = 0 === i, isLastLine = i === lines.length - 1, isLastNonEmptyLine = i === lastNonEmptyLine;
          let trimmedLine = line.replace(/\t/g, " ");
          isFirstLine || (trimmedLine = trimmedLine.replace(/^[ ]+/, "")), isLastLine || (trimmedLine = trimmedLine.replace(/[ ]+$/, "")), 
          trimmedLine && (isLastNonEmptyLine || (trimmedLine += " "), str += trimmedLine);
        }
        str && args.push((0, _generated.stringLiteral)(str));
      };
      var _generated = __webpack_require__(4391);
    },
    7610: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(actual, expected) {
        const keys = Object.keys(expected);
        for (const key of keys) if (actual[key] !== expected[key]) return !1;
        return !0;
      };
    },
    8847: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(match, allowPartial) {
        const parts = match.split(".");
        return member => (0, _matchesPattern.default)(member, parts, allowPartial);
      };
      var _matchesPattern = __webpack_require__(2205);
    },
    4746: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.isAccessor = function(node, opts) {
        if (!node) return !1;
        if ("ClassAccessorProperty" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isAnyTypeAnnotation = function(node, opts) {
        if (!node) return !1;
        if ("AnyTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isArgumentPlaceholder = function(node, opts) {
        if (!node) return !1;
        if ("ArgumentPlaceholder" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isArrayExpression = function(node, opts) {
        if (!node) return !1;
        if ("ArrayExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isArrayPattern = function(node, opts) {
        if (!node) return !1;
        if ("ArrayPattern" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isArrayTypeAnnotation = function(node, opts) {
        if (!node) return !1;
        if ("ArrayTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isArrowFunctionExpression = function(node, opts) {
        if (!node) return !1;
        if ("ArrowFunctionExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isAssignmentExpression = function(node, opts) {
        if (!node) return !1;
        if ("AssignmentExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isAssignmentPattern = function(node, opts) {
        if (!node) return !1;
        if ("AssignmentPattern" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isAwaitExpression = function(node, opts) {
        if (!node) return !1;
        if ("AwaitExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isBigIntLiteral = function(node, opts) {
        if (!node) return !1;
        if ("BigIntLiteral" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isBinary = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("BinaryExpression" === nodeType || "LogicalExpression" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isBinaryExpression = function(node, opts) {
        if (!node) return !1;
        if ("BinaryExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isBindExpression = function(node, opts) {
        if (!node) return !1;
        if ("BindExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isBlock = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("BlockStatement" === nodeType || "Program" === nodeType || "TSModuleBlock" === nodeType || "Placeholder" === nodeType && "BlockStatement" === node.expectedNode) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isBlockParent = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("BlockStatement" === nodeType || "CatchClause" === nodeType || "DoWhileStatement" === nodeType || "ForInStatement" === nodeType || "ForStatement" === nodeType || "FunctionDeclaration" === nodeType || "FunctionExpression" === nodeType || "Program" === nodeType || "ObjectMethod" === nodeType || "SwitchStatement" === nodeType || "WhileStatement" === nodeType || "ArrowFunctionExpression" === nodeType || "ForOfStatement" === nodeType || "ClassMethod" === nodeType || "ClassPrivateMethod" === nodeType || "StaticBlock" === nodeType || "TSModuleBlock" === nodeType || "Placeholder" === nodeType && "BlockStatement" === node.expectedNode) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isBlockStatement = function(node, opts) {
        if (!node) return !1;
        if ("BlockStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isBooleanLiteral = function(node, opts) {
        if (!node) return !1;
        if ("BooleanLiteral" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isBooleanLiteralTypeAnnotation = function(node, opts) {
        if (!node) return !1;
        if ("BooleanLiteralTypeAnnotation" === node.type) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isBooleanTypeAnnotation = function(node, opts) {
        if (!node) return !1;
        if ("BooleanTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isBreakStatement = function(node, opts) {
        if (!node) return !1;
        if ("BreakStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isCallExpression = function(node, opts) {
        if (!node) return !1;
        if ("CallExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isCatchClause = function(node, opts) {
        if (!node) return !1;
        if ("CatchClause" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isClass = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("ClassExpression" === nodeType || "ClassDeclaration" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isClassAccessorProperty = function(node, opts) {
        if (!node) return !1;
        if ("ClassAccessorProperty" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isClassBody = function(node, opts) {
        if (!node) return !1;
        if ("ClassBody" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isClassDeclaration = function(node, opts) {
        if (!node) return !1;
        if ("ClassDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isClassExpression = function(node, opts) {
        if (!node) return !1;
        if ("ClassExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isClassImplements = function(node, opts) {
        if (!node) return !1;
        if ("ClassImplements" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isClassMethod = function(node, opts) {
        if (!node) return !1;
        if ("ClassMethod" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isClassPrivateMethod = function(node, opts) {
        if (!node) return !1;
        if ("ClassPrivateMethod" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isClassPrivateProperty = function(node, opts) {
        if (!node) return !1;
        if ("ClassPrivateProperty" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isClassProperty = function(node, opts) {
        if (!node) return !1;
        if ("ClassProperty" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isCompletionStatement = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("BreakStatement" === nodeType || "ContinueStatement" === nodeType || "ReturnStatement" === nodeType || "ThrowStatement" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isConditional = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("ConditionalExpression" === nodeType || "IfStatement" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isConditionalExpression = function(node, opts) {
        if (!node) return !1;
        if ("ConditionalExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isContinueStatement = function(node, opts) {
        if (!node) return !1;
        if ("ContinueStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isDebuggerStatement = function(node, opts) {
        if (!node) return !1;
        if ("DebuggerStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isDecimalLiteral = function(node, opts) {
        if (!node) return !1;
        if ("DecimalLiteral" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isDeclaration = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("FunctionDeclaration" === nodeType || "VariableDeclaration" === nodeType || "ClassDeclaration" === nodeType || "ExportAllDeclaration" === nodeType || "ExportDefaultDeclaration" === nodeType || "ExportNamedDeclaration" === nodeType || "ImportDeclaration" === nodeType || "DeclareClass" === nodeType || "DeclareFunction" === nodeType || "DeclareInterface" === nodeType || "DeclareModule" === nodeType || "DeclareModuleExports" === nodeType || "DeclareTypeAlias" === nodeType || "DeclareOpaqueType" === nodeType || "DeclareVariable" === nodeType || "DeclareExportDeclaration" === nodeType || "DeclareExportAllDeclaration" === nodeType || "InterfaceDeclaration" === nodeType || "OpaqueType" === nodeType || "TypeAlias" === nodeType || "EnumDeclaration" === nodeType || "TSDeclareFunction" === nodeType || "TSInterfaceDeclaration" === nodeType || "TSTypeAliasDeclaration" === nodeType || "TSEnumDeclaration" === nodeType || "TSModuleDeclaration" === nodeType || "Placeholder" === nodeType && "Declaration" === node.expectedNode) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isDeclareClass = function(node, opts) {
        if (!node) return !1;
        if ("DeclareClass" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isDeclareExportAllDeclaration = function(node, opts) {
        if (!node) return !1;
        if ("DeclareExportAllDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isDeclareExportDeclaration = function(node, opts) {
        if (!node) return !1;
        if ("DeclareExportDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isDeclareFunction = function(node, opts) {
        if (!node) return !1;
        if ("DeclareFunction" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isDeclareInterface = function(node, opts) {
        if (!node) return !1;
        if ("DeclareInterface" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isDeclareModule = function(node, opts) {
        if (!node) return !1;
        if ("DeclareModule" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isDeclareModuleExports = function(node, opts) {
        if (!node) return !1;
        if ("DeclareModuleExports" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isDeclareOpaqueType = function(node, opts) {
        if (!node) return !1;
        if ("DeclareOpaqueType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isDeclareTypeAlias = function(node, opts) {
        if (!node) return !1;
        if ("DeclareTypeAlias" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isDeclareVariable = function(node, opts) {
        if (!node) return !1;
        if ("DeclareVariable" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isDeclaredPredicate = function(node, opts) {
        if (!node) return !1;
        if ("DeclaredPredicate" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isDecorator = function(node, opts) {
        if (!node) return !1;
        if ("Decorator" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isDirective = function(node, opts) {
        if (!node) return !1;
        if ("Directive" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isDirectiveLiteral = function(node, opts) {
        if (!node) return !1;
        if ("DirectiveLiteral" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isDoExpression = function(node, opts) {
        if (!node) return !1;
        if ("DoExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isDoWhileStatement = function(node, opts) {
        if (!node) return !1;
        if ("DoWhileStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isEmptyStatement = function(node, opts) {
        if (!node) return !1;
        if ("EmptyStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isEmptyTypeAnnotation = function(node, opts) {
        if (!node) return !1;
        if ("EmptyTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isEnumBody = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("EnumBooleanBody" === nodeType || "EnumNumberBody" === nodeType || "EnumStringBody" === nodeType || "EnumSymbolBody" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isEnumBooleanBody = function(node, opts) {
        if (!node) return !1;
        if ("EnumBooleanBody" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isEnumBooleanMember = function(node, opts) {
        if (!node) return !1;
        if ("EnumBooleanMember" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isEnumDeclaration = function(node, opts) {
        if (!node) return !1;
        if ("EnumDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isEnumDefaultedMember = function(node, opts) {
        if (!node) return !1;
        if ("EnumDefaultedMember" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isEnumMember = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("EnumBooleanMember" === nodeType || "EnumNumberMember" === nodeType || "EnumStringMember" === nodeType || "EnumDefaultedMember" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isEnumNumberBody = function(node, opts) {
        if (!node) return !1;
        if ("EnumNumberBody" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isEnumNumberMember = function(node, opts) {
        if (!node) return !1;
        if ("EnumNumberMember" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isEnumStringBody = function(node, opts) {
        if (!node) return !1;
        if ("EnumStringBody" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isEnumStringMember = function(node, opts) {
        if (!node) return !1;
        if ("EnumStringMember" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isEnumSymbolBody = function(node, opts) {
        if (!node) return !1;
        if ("EnumSymbolBody" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isExistsTypeAnnotation = function(node, opts) {
        if (!node) return !1;
        if ("ExistsTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isExportAllDeclaration = function(node, opts) {
        if (!node) return !1;
        if ("ExportAllDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isExportDeclaration = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("ExportAllDeclaration" === nodeType || "ExportDefaultDeclaration" === nodeType || "ExportNamedDeclaration" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isExportDefaultDeclaration = function(node, opts) {
        if (!node) return !1;
        if ("ExportDefaultDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isExportDefaultSpecifier = function(node, opts) {
        if (!node) return !1;
        if ("ExportDefaultSpecifier" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isExportNamedDeclaration = function(node, opts) {
        if (!node) return !1;
        if ("ExportNamedDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isExportNamespaceSpecifier = function(node, opts) {
        if (!node) return !1;
        if ("ExportNamespaceSpecifier" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isExportSpecifier = function(node, opts) {
        if (!node) return !1;
        if ("ExportSpecifier" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isExpression = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("ArrayExpression" === nodeType || "AssignmentExpression" === nodeType || "BinaryExpression" === nodeType || "CallExpression" === nodeType || "ConditionalExpression" === nodeType || "FunctionExpression" === nodeType || "Identifier" === nodeType || "StringLiteral" === nodeType || "NumericLiteral" === nodeType || "NullLiteral" === nodeType || "BooleanLiteral" === nodeType || "RegExpLiteral" === nodeType || "LogicalExpression" === nodeType || "MemberExpression" === nodeType || "NewExpression" === nodeType || "ObjectExpression" === nodeType || "SequenceExpression" === nodeType || "ParenthesizedExpression" === nodeType || "ThisExpression" === nodeType || "UnaryExpression" === nodeType || "UpdateExpression" === nodeType || "ArrowFunctionExpression" === nodeType || "ClassExpression" === nodeType || "MetaProperty" === nodeType || "Super" === nodeType || "TaggedTemplateExpression" === nodeType || "TemplateLiteral" === nodeType || "YieldExpression" === nodeType || "AwaitExpression" === nodeType || "Import" === nodeType || "BigIntLiteral" === nodeType || "OptionalMemberExpression" === nodeType || "OptionalCallExpression" === nodeType || "TypeCastExpression" === nodeType || "JSXElement" === nodeType || "JSXFragment" === nodeType || "BindExpression" === nodeType || "DoExpression" === nodeType || "RecordExpression" === nodeType || "TupleExpression" === nodeType || "DecimalLiteral" === nodeType || "ModuleExpression" === nodeType || "TopicReference" === nodeType || "PipelineTopicExpression" === nodeType || "PipelineBareFunction" === nodeType || "PipelinePrimaryTopicReference" === nodeType || "TSAsExpression" === nodeType || "TSTypeAssertion" === nodeType || "TSNonNullExpression" === nodeType || "Placeholder" === nodeType && ("Expression" === node.expectedNode || "Identifier" === node.expectedNode || "StringLiteral" === node.expectedNode)) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isExpressionStatement = function(node, opts) {
        if (!node) return !1;
        if ("ExpressionStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isExpressionWrapper = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("ExpressionStatement" === nodeType || "ParenthesizedExpression" === nodeType || "TypeCastExpression" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isFile = function(node, opts) {
        if (!node) return !1;
        if ("File" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isFlow = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("AnyTypeAnnotation" === nodeType || "ArrayTypeAnnotation" === nodeType || "BooleanTypeAnnotation" === nodeType || "BooleanLiteralTypeAnnotation" === nodeType || "NullLiteralTypeAnnotation" === nodeType || "ClassImplements" === nodeType || "DeclareClass" === nodeType || "DeclareFunction" === nodeType || "DeclareInterface" === nodeType || "DeclareModule" === nodeType || "DeclareModuleExports" === nodeType || "DeclareTypeAlias" === nodeType || "DeclareOpaqueType" === nodeType || "DeclareVariable" === nodeType || "DeclareExportDeclaration" === nodeType || "DeclareExportAllDeclaration" === nodeType || "DeclaredPredicate" === nodeType || "ExistsTypeAnnotation" === nodeType || "FunctionTypeAnnotation" === nodeType || "FunctionTypeParam" === nodeType || "GenericTypeAnnotation" === nodeType || "InferredPredicate" === nodeType || "InterfaceExtends" === nodeType || "InterfaceDeclaration" === nodeType || "InterfaceTypeAnnotation" === nodeType || "IntersectionTypeAnnotation" === nodeType || "MixedTypeAnnotation" === nodeType || "EmptyTypeAnnotation" === nodeType || "NullableTypeAnnotation" === nodeType || "NumberLiteralTypeAnnotation" === nodeType || "NumberTypeAnnotation" === nodeType || "ObjectTypeAnnotation" === nodeType || "ObjectTypeInternalSlot" === nodeType || "ObjectTypeCallProperty" === nodeType || "ObjectTypeIndexer" === nodeType || "ObjectTypeProperty" === nodeType || "ObjectTypeSpreadProperty" === nodeType || "OpaqueType" === nodeType || "QualifiedTypeIdentifier" === nodeType || "StringLiteralTypeAnnotation" === nodeType || "StringTypeAnnotation" === nodeType || "SymbolTypeAnnotation" === nodeType || "ThisTypeAnnotation" === nodeType || "TupleTypeAnnotation" === nodeType || "TypeofTypeAnnotation" === nodeType || "TypeAlias" === nodeType || "TypeAnnotation" === nodeType || "TypeCastExpression" === nodeType || "TypeParameter" === nodeType || "TypeParameterDeclaration" === nodeType || "TypeParameterInstantiation" === nodeType || "UnionTypeAnnotation" === nodeType || "Variance" === nodeType || "VoidTypeAnnotation" === nodeType || "EnumDeclaration" === nodeType || "EnumBooleanBody" === nodeType || "EnumNumberBody" === nodeType || "EnumStringBody" === nodeType || "EnumSymbolBody" === nodeType || "EnumBooleanMember" === nodeType || "EnumNumberMember" === nodeType || "EnumStringMember" === nodeType || "EnumDefaultedMember" === nodeType || "IndexedAccessType" === nodeType || "OptionalIndexedAccessType" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isFlowBaseAnnotation = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("AnyTypeAnnotation" === nodeType || "BooleanTypeAnnotation" === nodeType || "NullLiteralTypeAnnotation" === nodeType || "MixedTypeAnnotation" === nodeType || "EmptyTypeAnnotation" === nodeType || "NumberTypeAnnotation" === nodeType || "StringTypeAnnotation" === nodeType || "SymbolTypeAnnotation" === nodeType || "ThisTypeAnnotation" === nodeType || "VoidTypeAnnotation" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isFlowDeclaration = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("DeclareClass" === nodeType || "DeclareFunction" === nodeType || "DeclareInterface" === nodeType || "DeclareModule" === nodeType || "DeclareModuleExports" === nodeType || "DeclareTypeAlias" === nodeType || "DeclareOpaqueType" === nodeType || "DeclareVariable" === nodeType || "DeclareExportDeclaration" === nodeType || "DeclareExportAllDeclaration" === nodeType || "InterfaceDeclaration" === nodeType || "OpaqueType" === nodeType || "TypeAlias" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isFlowPredicate = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("DeclaredPredicate" === nodeType || "InferredPredicate" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isFlowType = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("AnyTypeAnnotation" === nodeType || "ArrayTypeAnnotation" === nodeType || "BooleanTypeAnnotation" === nodeType || "BooleanLiteralTypeAnnotation" === nodeType || "NullLiteralTypeAnnotation" === nodeType || "ExistsTypeAnnotation" === nodeType || "FunctionTypeAnnotation" === nodeType || "GenericTypeAnnotation" === nodeType || "InterfaceTypeAnnotation" === nodeType || "IntersectionTypeAnnotation" === nodeType || "MixedTypeAnnotation" === nodeType || "EmptyTypeAnnotation" === nodeType || "NullableTypeAnnotation" === nodeType || "NumberLiteralTypeAnnotation" === nodeType || "NumberTypeAnnotation" === nodeType || "ObjectTypeAnnotation" === nodeType || "StringLiteralTypeAnnotation" === nodeType || "StringTypeAnnotation" === nodeType || "SymbolTypeAnnotation" === nodeType || "ThisTypeAnnotation" === nodeType || "TupleTypeAnnotation" === nodeType || "TypeofTypeAnnotation" === nodeType || "UnionTypeAnnotation" === nodeType || "VoidTypeAnnotation" === nodeType || "IndexedAccessType" === nodeType || "OptionalIndexedAccessType" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isFor = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("ForInStatement" === nodeType || "ForStatement" === nodeType || "ForOfStatement" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isForInStatement = function(node, opts) {
        if (!node) return !1;
        if ("ForInStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isForOfStatement = function(node, opts) {
        if (!node) return !1;
        if ("ForOfStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isForStatement = function(node, opts) {
        if (!node) return !1;
        if ("ForStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isForXStatement = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("ForInStatement" === nodeType || "ForOfStatement" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isFunction = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("FunctionDeclaration" === nodeType || "FunctionExpression" === nodeType || "ObjectMethod" === nodeType || "ArrowFunctionExpression" === nodeType || "ClassMethod" === nodeType || "ClassPrivateMethod" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isFunctionDeclaration = function(node, opts) {
        if (!node) return !1;
        if ("FunctionDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isFunctionExpression = function(node, opts) {
        if (!node) return !1;
        if ("FunctionExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isFunctionParent = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("FunctionDeclaration" === nodeType || "FunctionExpression" === nodeType || "ObjectMethod" === nodeType || "ArrowFunctionExpression" === nodeType || "ClassMethod" === nodeType || "ClassPrivateMethod" === nodeType || "StaticBlock" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isFunctionTypeAnnotation = function(node, opts) {
        if (!node) return !1;
        if ("FunctionTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isFunctionTypeParam = function(node, opts) {
        if (!node) return !1;
        if ("FunctionTypeParam" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isGenericTypeAnnotation = function(node, opts) {
        if (!node) return !1;
        if ("GenericTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isIdentifier = function(node, opts) {
        if (!node) return !1;
        if ("Identifier" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isIfStatement = function(node, opts) {
        if (!node) return !1;
        if ("IfStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isImmutable = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("StringLiteral" === nodeType || "NumericLiteral" === nodeType || "NullLiteral" === nodeType || "BooleanLiteral" === nodeType || "BigIntLiteral" === nodeType || "JSXAttribute" === nodeType || "JSXClosingElement" === nodeType || "JSXElement" === nodeType || "JSXExpressionContainer" === nodeType || "JSXSpreadChild" === nodeType || "JSXOpeningElement" === nodeType || "JSXText" === nodeType || "JSXFragment" === nodeType || "JSXOpeningFragment" === nodeType || "JSXClosingFragment" === nodeType || "DecimalLiteral" === nodeType || "Placeholder" === nodeType && "StringLiteral" === node.expectedNode) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isImport = function(node, opts) {
        if (!node) return !1;
        if ("Import" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isImportAttribute = function(node, opts) {
        if (!node) return !1;
        if ("ImportAttribute" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isImportDeclaration = function(node, opts) {
        if (!node) return !1;
        if ("ImportDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isImportDefaultSpecifier = function(node, opts) {
        if (!node) return !1;
        if ("ImportDefaultSpecifier" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isImportNamespaceSpecifier = function(node, opts) {
        if (!node) return !1;
        if ("ImportNamespaceSpecifier" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isImportSpecifier = function(node, opts) {
        if (!node) return !1;
        if ("ImportSpecifier" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isIndexedAccessType = function(node, opts) {
        if (!node) return !1;
        if ("IndexedAccessType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isInferredPredicate = function(node, opts) {
        if (!node) return !1;
        if ("InferredPredicate" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isInterfaceDeclaration = function(node, opts) {
        if (!node) return !1;
        if ("InterfaceDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isInterfaceExtends = function(node, opts) {
        if (!node) return !1;
        if ("InterfaceExtends" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isInterfaceTypeAnnotation = function(node, opts) {
        if (!node) return !1;
        if ("InterfaceTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isInterpreterDirective = function(node, opts) {
        if (!node) return !1;
        if ("InterpreterDirective" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isIntersectionTypeAnnotation = function(node, opts) {
        if (!node) return !1;
        if ("IntersectionTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isJSX = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("JSXAttribute" === nodeType || "JSXClosingElement" === nodeType || "JSXElement" === nodeType || "JSXEmptyExpression" === nodeType || "JSXExpressionContainer" === nodeType || "JSXSpreadChild" === nodeType || "JSXIdentifier" === nodeType || "JSXMemberExpression" === nodeType || "JSXNamespacedName" === nodeType || "JSXOpeningElement" === nodeType || "JSXSpreadAttribute" === nodeType || "JSXText" === nodeType || "JSXFragment" === nodeType || "JSXOpeningFragment" === nodeType || "JSXClosingFragment" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isJSXAttribute = function(node, opts) {
        if (!node) return !1;
        if ("JSXAttribute" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isJSXClosingElement = function(node, opts) {
        if (!node) return !1;
        if ("JSXClosingElement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isJSXClosingFragment = function(node, opts) {
        if (!node) return !1;
        if ("JSXClosingFragment" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isJSXElement = function(node, opts) {
        if (!node) return !1;
        if ("JSXElement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isJSXEmptyExpression = function(node, opts) {
        if (!node) return !1;
        if ("JSXEmptyExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isJSXExpressionContainer = function(node, opts) {
        if (!node) return !1;
        if ("JSXExpressionContainer" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isJSXFragment = function(node, opts) {
        if (!node) return !1;
        if ("JSXFragment" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isJSXIdentifier = function(node, opts) {
        if (!node) return !1;
        if ("JSXIdentifier" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isJSXMemberExpression = function(node, opts) {
        if (!node) return !1;
        if ("JSXMemberExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isJSXNamespacedName = function(node, opts) {
        if (!node) return !1;
        if ("JSXNamespacedName" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isJSXOpeningElement = function(node, opts) {
        if (!node) return !1;
        if ("JSXOpeningElement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isJSXOpeningFragment = function(node, opts) {
        if (!node) return !1;
        if ("JSXOpeningFragment" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isJSXSpreadAttribute = function(node, opts) {
        if (!node) return !1;
        if ("JSXSpreadAttribute" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isJSXSpreadChild = function(node, opts) {
        if (!node) return !1;
        if ("JSXSpreadChild" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isJSXText = function(node, opts) {
        if (!node) return !1;
        if ("JSXText" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isLVal = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("Identifier" === nodeType || "MemberExpression" === nodeType || "RestElement" === nodeType || "AssignmentPattern" === nodeType || "ArrayPattern" === nodeType || "ObjectPattern" === nodeType || "TSParameterProperty" === nodeType || "Placeholder" === nodeType && ("Pattern" === node.expectedNode || "Identifier" === node.expectedNode)) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isLabeledStatement = function(node, opts) {
        if (!node) return !1;
        if ("LabeledStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isLiteral = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("StringLiteral" === nodeType || "NumericLiteral" === nodeType || "NullLiteral" === nodeType || "BooleanLiteral" === nodeType || "RegExpLiteral" === nodeType || "TemplateLiteral" === nodeType || "BigIntLiteral" === nodeType || "DecimalLiteral" === nodeType || "Placeholder" === nodeType && "StringLiteral" === node.expectedNode) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isLogicalExpression = function(node, opts) {
        if (!node) return !1;
        if ("LogicalExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isLoop = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("DoWhileStatement" === nodeType || "ForInStatement" === nodeType || "ForStatement" === nodeType || "WhileStatement" === nodeType || "ForOfStatement" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isMemberExpression = function(node, opts) {
        if (!node) return !1;
        if ("MemberExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isMetaProperty = function(node, opts) {
        if (!node) return !1;
        if ("MetaProperty" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isMethod = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("ObjectMethod" === nodeType || "ClassMethod" === nodeType || "ClassPrivateMethod" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isMiscellaneous = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("Noop" === nodeType || "Placeholder" === nodeType || "V8IntrinsicIdentifier" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isMixedTypeAnnotation = function(node, opts) {
        if (!node) return !1;
        if ("MixedTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isModuleDeclaration = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("ExportAllDeclaration" === nodeType || "ExportDefaultDeclaration" === nodeType || "ExportNamedDeclaration" === nodeType || "ImportDeclaration" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isModuleExpression = function(node, opts) {
        if (!node) return !1;
        if ("ModuleExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isModuleSpecifier = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("ExportSpecifier" === nodeType || "ImportDefaultSpecifier" === nodeType || "ImportNamespaceSpecifier" === nodeType || "ImportSpecifier" === nodeType || "ExportNamespaceSpecifier" === nodeType || "ExportDefaultSpecifier" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isNewExpression = function(node, opts) {
        if (!node) return !1;
        if ("NewExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isNoop = function(node, opts) {
        if (!node) return !1;
        if ("Noop" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isNullLiteral = function(node, opts) {
        if (!node) return !1;
        if ("NullLiteral" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isNullLiteralTypeAnnotation = function(node, opts) {
        if (!node) return !1;
        if ("NullLiteralTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isNullableTypeAnnotation = function(node, opts) {
        if (!node) return !1;
        if ("NullableTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isNumberLiteral = function(node, opts) {
        if (console.trace("The node type NumberLiteral has been renamed to NumericLiteral"), 
        !node) return !1;
        if ("NumberLiteral" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isNumberLiteralTypeAnnotation = function(node, opts) {
        if (!node) return !1;
        if ("NumberLiteralTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isNumberTypeAnnotation = function(node, opts) {
        if (!node) return !1;
        if ("NumberTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isNumericLiteral = function(node, opts) {
        if (!node) return !1;
        if ("NumericLiteral" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isObjectExpression = function(node, opts) {
        if (!node) return !1;
        if ("ObjectExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isObjectMember = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("ObjectMethod" === nodeType || "ObjectProperty" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isObjectMethod = function(node, opts) {
        if (!node) return !1;
        if ("ObjectMethod" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isObjectPattern = function(node, opts) {
        if (!node) return !1;
        if ("ObjectPattern" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isObjectProperty = function(node, opts) {
        if (!node) return !1;
        if ("ObjectProperty" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isObjectTypeAnnotation = function(node, opts) {
        if (!node) return !1;
        if ("ObjectTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isObjectTypeCallProperty = function(node, opts) {
        if (!node) return !1;
        if ("ObjectTypeCallProperty" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isObjectTypeIndexer = function(node, opts) {
        if (!node) return !1;
        if ("ObjectTypeIndexer" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isObjectTypeInternalSlot = function(node, opts) {
        if (!node) return !1;
        if ("ObjectTypeInternalSlot" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isObjectTypeProperty = function(node, opts) {
        if (!node) return !1;
        if ("ObjectTypeProperty" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isObjectTypeSpreadProperty = function(node, opts) {
        if (!node) return !1;
        if ("ObjectTypeSpreadProperty" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isOpaqueType = function(node, opts) {
        if (!node) return !1;
        if ("OpaqueType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isOptionalCallExpression = function(node, opts) {
        if (!node) return !1;
        if ("OptionalCallExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isOptionalIndexedAccessType = function(node, opts) {
        if (!node) return !1;
        if ("OptionalIndexedAccessType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isOptionalMemberExpression = function(node, opts) {
        if (!node) return !1;
        if ("OptionalMemberExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isParenthesizedExpression = function(node, opts) {
        if (!node) return !1;
        if ("ParenthesizedExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isPattern = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("AssignmentPattern" === nodeType || "ArrayPattern" === nodeType || "ObjectPattern" === nodeType || "Placeholder" === nodeType && "Pattern" === node.expectedNode) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isPatternLike = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("Identifier" === nodeType || "RestElement" === nodeType || "AssignmentPattern" === nodeType || "ArrayPattern" === nodeType || "ObjectPattern" === nodeType || "Placeholder" === nodeType && ("Pattern" === node.expectedNode || "Identifier" === node.expectedNode)) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isPipelineBareFunction = function(node, opts) {
        if (!node) return !1;
        if ("PipelineBareFunction" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isPipelinePrimaryTopicReference = function(node, opts) {
        if (!node) return !1;
        if ("PipelinePrimaryTopicReference" === node.type) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isPipelineTopicExpression = function(node, opts) {
        if (!node) return !1;
        if ("PipelineTopicExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isPlaceholder = function(node, opts) {
        if (!node) return !1;
        if ("Placeholder" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isPrivate = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("ClassPrivateProperty" === nodeType || "ClassPrivateMethod" === nodeType || "PrivateName" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isPrivateName = function(node, opts) {
        if (!node) return !1;
        if ("PrivateName" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isProgram = function(node, opts) {
        if (!node) return !1;
        if ("Program" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isProperty = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("ObjectProperty" === nodeType || "ClassProperty" === nodeType || "ClassAccessorProperty" === nodeType || "ClassPrivateProperty" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isPureish = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("FunctionDeclaration" === nodeType || "FunctionExpression" === nodeType || "StringLiteral" === nodeType || "NumericLiteral" === nodeType || "NullLiteral" === nodeType || "BooleanLiteral" === nodeType || "RegExpLiteral" === nodeType || "ArrowFunctionExpression" === nodeType || "BigIntLiteral" === nodeType || "DecimalLiteral" === nodeType || "Placeholder" === nodeType && "StringLiteral" === node.expectedNode) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isQualifiedTypeIdentifier = function(node, opts) {
        if (!node) return !1;
        if ("QualifiedTypeIdentifier" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isRecordExpression = function(node, opts) {
        if (!node) return !1;
        if ("RecordExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isRegExpLiteral = function(node, opts) {
        if (!node) return !1;
        if ("RegExpLiteral" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isRegexLiteral = function(node, opts) {
        if (console.trace("The node type RegexLiteral has been renamed to RegExpLiteral"), 
        !node) return !1;
        if ("RegexLiteral" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isRestElement = function(node, opts) {
        if (!node) return !1;
        if ("RestElement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isRestProperty = function(node, opts) {
        if (console.trace("The node type RestProperty has been renamed to RestElement"), 
        !node) return !1;
        if ("RestProperty" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isReturnStatement = function(node, opts) {
        if (!node) return !1;
        if ("ReturnStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isScopable = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("BlockStatement" === nodeType || "CatchClause" === nodeType || "DoWhileStatement" === nodeType || "ForInStatement" === nodeType || "ForStatement" === nodeType || "FunctionDeclaration" === nodeType || "FunctionExpression" === nodeType || "Program" === nodeType || "ObjectMethod" === nodeType || "SwitchStatement" === nodeType || "WhileStatement" === nodeType || "ArrowFunctionExpression" === nodeType || "ClassExpression" === nodeType || "ClassDeclaration" === nodeType || "ForOfStatement" === nodeType || "ClassMethod" === nodeType || "ClassPrivateMethod" === nodeType || "StaticBlock" === nodeType || "TSModuleBlock" === nodeType || "Placeholder" === nodeType && "BlockStatement" === node.expectedNode) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isSequenceExpression = function(node, opts) {
        if (!node) return !1;
        if ("SequenceExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isSpreadElement = function(node, opts) {
        if (!node) return !1;
        if ("SpreadElement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isSpreadProperty = function(node, opts) {
        if (console.trace("The node type SpreadProperty has been renamed to SpreadElement"), 
        !node) return !1;
        if ("SpreadProperty" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isStandardized = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("ArrayExpression" === nodeType || "AssignmentExpression" === nodeType || "BinaryExpression" === nodeType || "InterpreterDirective" === nodeType || "Directive" === nodeType || "DirectiveLiteral" === nodeType || "BlockStatement" === nodeType || "BreakStatement" === nodeType || "CallExpression" === nodeType || "CatchClause" === nodeType || "ConditionalExpression" === nodeType || "ContinueStatement" === nodeType || "DebuggerStatement" === nodeType || "DoWhileStatement" === nodeType || "EmptyStatement" === nodeType || "ExpressionStatement" === nodeType || "File" === nodeType || "ForInStatement" === nodeType || "ForStatement" === nodeType || "FunctionDeclaration" === nodeType || "FunctionExpression" === nodeType || "Identifier" === nodeType || "IfStatement" === nodeType || "LabeledStatement" === nodeType || "StringLiteral" === nodeType || "NumericLiteral" === nodeType || "NullLiteral" === nodeType || "BooleanLiteral" === nodeType || "RegExpLiteral" === nodeType || "LogicalExpression" === nodeType || "MemberExpression" === nodeType || "NewExpression" === nodeType || "Program" === nodeType || "ObjectExpression" === nodeType || "ObjectMethod" === nodeType || "ObjectProperty" === nodeType || "RestElement" === nodeType || "ReturnStatement" === nodeType || "SequenceExpression" === nodeType || "ParenthesizedExpression" === nodeType || "SwitchCase" === nodeType || "SwitchStatement" === nodeType || "ThisExpression" === nodeType || "ThrowStatement" === nodeType || "TryStatement" === nodeType || "UnaryExpression" === nodeType || "UpdateExpression" === nodeType || "VariableDeclaration" === nodeType || "VariableDeclarator" === nodeType || "WhileStatement" === nodeType || "WithStatement" === nodeType || "AssignmentPattern" === nodeType || "ArrayPattern" === nodeType || "ArrowFunctionExpression" === nodeType || "ClassBody" === nodeType || "ClassExpression" === nodeType || "ClassDeclaration" === nodeType || "ExportAllDeclaration" === nodeType || "ExportDefaultDeclaration" === nodeType || "ExportNamedDeclaration" === nodeType || "ExportSpecifier" === nodeType || "ForOfStatement" === nodeType || "ImportDeclaration" === nodeType || "ImportDefaultSpecifier" === nodeType || "ImportNamespaceSpecifier" === nodeType || "ImportSpecifier" === nodeType || "MetaProperty" === nodeType || "ClassMethod" === nodeType || "ObjectPattern" === nodeType || "SpreadElement" === nodeType || "Super" === nodeType || "TaggedTemplateExpression" === nodeType || "TemplateElement" === nodeType || "TemplateLiteral" === nodeType || "YieldExpression" === nodeType || "AwaitExpression" === nodeType || "Import" === nodeType || "BigIntLiteral" === nodeType || "ExportNamespaceSpecifier" === nodeType || "OptionalMemberExpression" === nodeType || "OptionalCallExpression" === nodeType || "ClassProperty" === nodeType || "ClassAccessorProperty" === nodeType || "ClassPrivateProperty" === nodeType || "ClassPrivateMethod" === nodeType || "PrivateName" === nodeType || "StaticBlock" === nodeType || "Placeholder" === nodeType && ("Identifier" === node.expectedNode || "StringLiteral" === node.expectedNode || "BlockStatement" === node.expectedNode || "ClassBody" === node.expectedNode)) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isStatement = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("BlockStatement" === nodeType || "BreakStatement" === nodeType || "ContinueStatement" === nodeType || "DebuggerStatement" === nodeType || "DoWhileStatement" === nodeType || "EmptyStatement" === nodeType || "ExpressionStatement" === nodeType || "ForInStatement" === nodeType || "ForStatement" === nodeType || "FunctionDeclaration" === nodeType || "IfStatement" === nodeType || "LabeledStatement" === nodeType || "ReturnStatement" === nodeType || "SwitchStatement" === nodeType || "ThrowStatement" === nodeType || "TryStatement" === nodeType || "VariableDeclaration" === nodeType || "WhileStatement" === nodeType || "WithStatement" === nodeType || "ClassDeclaration" === nodeType || "ExportAllDeclaration" === nodeType || "ExportDefaultDeclaration" === nodeType || "ExportNamedDeclaration" === nodeType || "ForOfStatement" === nodeType || "ImportDeclaration" === nodeType || "DeclareClass" === nodeType || "DeclareFunction" === nodeType || "DeclareInterface" === nodeType || "DeclareModule" === nodeType || "DeclareModuleExports" === nodeType || "DeclareTypeAlias" === nodeType || "DeclareOpaqueType" === nodeType || "DeclareVariable" === nodeType || "DeclareExportDeclaration" === nodeType || "DeclareExportAllDeclaration" === nodeType || "InterfaceDeclaration" === nodeType || "OpaqueType" === nodeType || "TypeAlias" === nodeType || "EnumDeclaration" === nodeType || "TSDeclareFunction" === nodeType || "TSInterfaceDeclaration" === nodeType || "TSTypeAliasDeclaration" === nodeType || "TSEnumDeclaration" === nodeType || "TSModuleDeclaration" === nodeType || "TSImportEqualsDeclaration" === nodeType || "TSExportAssignment" === nodeType || "TSNamespaceExportDeclaration" === nodeType || "Placeholder" === nodeType && ("Statement" === node.expectedNode || "Declaration" === node.expectedNode || "BlockStatement" === node.expectedNode)) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isStaticBlock = function(node, opts) {
        if (!node) return !1;
        if ("StaticBlock" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isStringLiteral = function(node, opts) {
        if (!node) return !1;
        if ("StringLiteral" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isStringLiteralTypeAnnotation = function(node, opts) {
        if (!node) return !1;
        if ("StringLiteralTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isStringTypeAnnotation = function(node, opts) {
        if (!node) return !1;
        if ("StringTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isSuper = function(node, opts) {
        if (!node) return !1;
        if ("Super" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isSwitchCase = function(node, opts) {
        if (!node) return !1;
        if ("SwitchCase" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isSwitchStatement = function(node, opts) {
        if (!node) return !1;
        if ("SwitchStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isSymbolTypeAnnotation = function(node, opts) {
        if (!node) return !1;
        if ("SymbolTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSAnyKeyword = function(node, opts) {
        if (!node) return !1;
        if ("TSAnyKeyword" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSArrayType = function(node, opts) {
        if (!node) return !1;
        if ("TSArrayType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSAsExpression = function(node, opts) {
        if (!node) return !1;
        if ("TSAsExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSBaseType = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("TSAnyKeyword" === nodeType || "TSBooleanKeyword" === nodeType || "TSBigIntKeyword" === nodeType || "TSIntrinsicKeyword" === nodeType || "TSNeverKeyword" === nodeType || "TSNullKeyword" === nodeType || "TSNumberKeyword" === nodeType || "TSObjectKeyword" === nodeType || "TSStringKeyword" === nodeType || "TSSymbolKeyword" === nodeType || "TSUndefinedKeyword" === nodeType || "TSUnknownKeyword" === nodeType || "TSVoidKeyword" === nodeType || "TSThisType" === nodeType || "TSLiteralType" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSBigIntKeyword = function(node, opts) {
        if (!node) return !1;
        if ("TSBigIntKeyword" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSBooleanKeyword = function(node, opts) {
        if (!node) return !1;
        if ("TSBooleanKeyword" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSCallSignatureDeclaration = function(node, opts) {
        if (!node) return !1;
        if ("TSCallSignatureDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSConditionalType = function(node, opts) {
        if (!node) return !1;
        if ("TSConditionalType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSConstructSignatureDeclaration = function(node, opts) {
        if (!node) return !1;
        if ("TSConstructSignatureDeclaration" === node.type) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSConstructorType = function(node, opts) {
        if (!node) return !1;
        if ("TSConstructorType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSDeclareFunction = function(node, opts) {
        if (!node) return !1;
        if ("TSDeclareFunction" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSDeclareMethod = function(node, opts) {
        if (!node) return !1;
        if ("TSDeclareMethod" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSEntityName = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("Identifier" === nodeType || "TSQualifiedName" === nodeType || "Placeholder" === nodeType && "Identifier" === node.expectedNode) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSEnumDeclaration = function(node, opts) {
        if (!node) return !1;
        if ("TSEnumDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSEnumMember = function(node, opts) {
        if (!node) return !1;
        if ("TSEnumMember" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSExportAssignment = function(node, opts) {
        if (!node) return !1;
        if ("TSExportAssignment" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSExpressionWithTypeArguments = function(node, opts) {
        if (!node) return !1;
        if ("TSExpressionWithTypeArguments" === node.type) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSExternalModuleReference = function(node, opts) {
        if (!node) return !1;
        if ("TSExternalModuleReference" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSFunctionType = function(node, opts) {
        if (!node) return !1;
        if ("TSFunctionType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSImportEqualsDeclaration = function(node, opts) {
        if (!node) return !1;
        if ("TSImportEqualsDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSImportType = function(node, opts) {
        if (!node) return !1;
        if ("TSImportType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSIndexSignature = function(node, opts) {
        if (!node) return !1;
        if ("TSIndexSignature" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSIndexedAccessType = function(node, opts) {
        if (!node) return !1;
        if ("TSIndexedAccessType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSInferType = function(node, opts) {
        if (!node) return !1;
        if ("TSInferType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSInterfaceBody = function(node, opts) {
        if (!node) return !1;
        if ("TSInterfaceBody" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSInterfaceDeclaration = function(node, opts) {
        if (!node) return !1;
        if ("TSInterfaceDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSIntersectionType = function(node, opts) {
        if (!node) return !1;
        if ("TSIntersectionType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSIntrinsicKeyword = function(node, opts) {
        if (!node) return !1;
        if ("TSIntrinsicKeyword" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSLiteralType = function(node, opts) {
        if (!node) return !1;
        if ("TSLiteralType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSMappedType = function(node, opts) {
        if (!node) return !1;
        if ("TSMappedType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSMethodSignature = function(node, opts) {
        if (!node) return !1;
        if ("TSMethodSignature" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSModuleBlock = function(node, opts) {
        if (!node) return !1;
        if ("TSModuleBlock" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSModuleDeclaration = function(node, opts) {
        if (!node) return !1;
        if ("TSModuleDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSNamedTupleMember = function(node, opts) {
        if (!node) return !1;
        if ("TSNamedTupleMember" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSNamespaceExportDeclaration = function(node, opts) {
        if (!node) return !1;
        if ("TSNamespaceExportDeclaration" === node.type) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSNeverKeyword = function(node, opts) {
        if (!node) return !1;
        if ("TSNeverKeyword" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSNonNullExpression = function(node, opts) {
        if (!node) return !1;
        if ("TSNonNullExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSNullKeyword = function(node, opts) {
        if (!node) return !1;
        if ("TSNullKeyword" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSNumberKeyword = function(node, opts) {
        if (!node) return !1;
        if ("TSNumberKeyword" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSObjectKeyword = function(node, opts) {
        if (!node) return !1;
        if ("TSObjectKeyword" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSOptionalType = function(node, opts) {
        if (!node) return !1;
        if ("TSOptionalType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSParameterProperty = function(node, opts) {
        if (!node) return !1;
        if ("TSParameterProperty" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSParenthesizedType = function(node, opts) {
        if (!node) return !1;
        if ("TSParenthesizedType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSPropertySignature = function(node, opts) {
        if (!node) return !1;
        if ("TSPropertySignature" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSQualifiedName = function(node, opts) {
        if (!node) return !1;
        if ("TSQualifiedName" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSRestType = function(node, opts) {
        if (!node) return !1;
        if ("TSRestType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSStringKeyword = function(node, opts) {
        if (!node) return !1;
        if ("TSStringKeyword" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSSymbolKeyword = function(node, opts) {
        if (!node) return !1;
        if ("TSSymbolKeyword" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSThisType = function(node, opts) {
        if (!node) return !1;
        if ("TSThisType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSTupleType = function(node, opts) {
        if (!node) return !1;
        if ("TSTupleType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSType = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("TSAnyKeyword" === nodeType || "TSBooleanKeyword" === nodeType || "TSBigIntKeyword" === nodeType || "TSIntrinsicKeyword" === nodeType || "TSNeverKeyword" === nodeType || "TSNullKeyword" === nodeType || "TSNumberKeyword" === nodeType || "TSObjectKeyword" === nodeType || "TSStringKeyword" === nodeType || "TSSymbolKeyword" === nodeType || "TSUndefinedKeyword" === nodeType || "TSUnknownKeyword" === nodeType || "TSVoidKeyword" === nodeType || "TSThisType" === nodeType || "TSFunctionType" === nodeType || "TSConstructorType" === nodeType || "TSTypeReference" === nodeType || "TSTypePredicate" === nodeType || "TSTypeQuery" === nodeType || "TSTypeLiteral" === nodeType || "TSArrayType" === nodeType || "TSTupleType" === nodeType || "TSOptionalType" === nodeType || "TSRestType" === nodeType || "TSUnionType" === nodeType || "TSIntersectionType" === nodeType || "TSConditionalType" === nodeType || "TSInferType" === nodeType || "TSParenthesizedType" === nodeType || "TSTypeOperator" === nodeType || "TSIndexedAccessType" === nodeType || "TSMappedType" === nodeType || "TSLiteralType" === nodeType || "TSExpressionWithTypeArguments" === nodeType || "TSImportType" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSTypeAliasDeclaration = function(node, opts) {
        if (!node) return !1;
        if ("TSTypeAliasDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSTypeAnnotation = function(node, opts) {
        if (!node) return !1;
        if ("TSTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSTypeAssertion = function(node, opts) {
        if (!node) return !1;
        if ("TSTypeAssertion" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSTypeElement = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("TSCallSignatureDeclaration" === nodeType || "TSConstructSignatureDeclaration" === nodeType || "TSPropertySignature" === nodeType || "TSMethodSignature" === nodeType || "TSIndexSignature" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSTypeLiteral = function(node, opts) {
        if (!node) return !1;
        if ("TSTypeLiteral" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSTypeOperator = function(node, opts) {
        if (!node) return !1;
        if ("TSTypeOperator" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSTypeParameter = function(node, opts) {
        if (!node) return !1;
        if ("TSTypeParameter" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSTypeParameterDeclaration = function(node, opts) {
        if (!node) return !1;
        if ("TSTypeParameterDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSTypeParameterInstantiation = function(node, opts) {
        if (!node) return !1;
        if ("TSTypeParameterInstantiation" === node.type) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSTypePredicate = function(node, opts) {
        if (!node) return !1;
        if ("TSTypePredicate" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSTypeQuery = function(node, opts) {
        if (!node) return !1;
        if ("TSTypeQuery" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSTypeReference = function(node, opts) {
        if (!node) return !1;
        if ("TSTypeReference" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSUndefinedKeyword = function(node, opts) {
        if (!node) return !1;
        if ("TSUndefinedKeyword" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSUnionType = function(node, opts) {
        if (!node) return !1;
        if ("TSUnionType" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSUnknownKeyword = function(node, opts) {
        if (!node) return !1;
        if ("TSUnknownKeyword" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTSVoidKeyword = function(node, opts) {
        if (!node) return !1;
        if ("TSVoidKeyword" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTaggedTemplateExpression = function(node, opts) {
        if (!node) return !1;
        if ("TaggedTemplateExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTemplateElement = function(node, opts) {
        if (!node) return !1;
        if ("TemplateElement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTemplateLiteral = function(node, opts) {
        if (!node) return !1;
        if ("TemplateLiteral" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTerminatorless = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("BreakStatement" === nodeType || "ContinueStatement" === nodeType || "ReturnStatement" === nodeType || "ThrowStatement" === nodeType || "YieldExpression" === nodeType || "AwaitExpression" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isThisExpression = function(node, opts) {
        if (!node) return !1;
        if ("ThisExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isThisTypeAnnotation = function(node, opts) {
        if (!node) return !1;
        if ("ThisTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isThrowStatement = function(node, opts) {
        if (!node) return !1;
        if ("ThrowStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTopicReference = function(node, opts) {
        if (!node) return !1;
        if ("TopicReference" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTryStatement = function(node, opts) {
        if (!node) return !1;
        if ("TryStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTupleExpression = function(node, opts) {
        if (!node) return !1;
        if ("TupleExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTupleTypeAnnotation = function(node, opts) {
        if (!node) return !1;
        if ("TupleTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTypeAlias = function(node, opts) {
        if (!node) return !1;
        if ("TypeAlias" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTypeAnnotation = function(node, opts) {
        if (!node) return !1;
        if ("TypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTypeCastExpression = function(node, opts) {
        if (!node) return !1;
        if ("TypeCastExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTypeParameter = function(node, opts) {
        if (!node) return !1;
        if ("TypeParameter" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTypeParameterDeclaration = function(node, opts) {
        if (!node) return !1;
        if ("TypeParameterDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTypeParameterInstantiation = function(node, opts) {
        if (!node) return !1;
        if ("TypeParameterInstantiation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTypeScript = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("TSParameterProperty" === nodeType || "TSDeclareFunction" === nodeType || "TSDeclareMethod" === nodeType || "TSQualifiedName" === nodeType || "TSCallSignatureDeclaration" === nodeType || "TSConstructSignatureDeclaration" === nodeType || "TSPropertySignature" === nodeType || "TSMethodSignature" === nodeType || "TSIndexSignature" === nodeType || "TSAnyKeyword" === nodeType || "TSBooleanKeyword" === nodeType || "TSBigIntKeyword" === nodeType || "TSIntrinsicKeyword" === nodeType || "TSNeverKeyword" === nodeType || "TSNullKeyword" === nodeType || "TSNumberKeyword" === nodeType || "TSObjectKeyword" === nodeType || "TSStringKeyword" === nodeType || "TSSymbolKeyword" === nodeType || "TSUndefinedKeyword" === nodeType || "TSUnknownKeyword" === nodeType || "TSVoidKeyword" === nodeType || "TSThisType" === nodeType || "TSFunctionType" === nodeType || "TSConstructorType" === nodeType || "TSTypeReference" === nodeType || "TSTypePredicate" === nodeType || "TSTypeQuery" === nodeType || "TSTypeLiteral" === nodeType || "TSArrayType" === nodeType || "TSTupleType" === nodeType || "TSOptionalType" === nodeType || "TSRestType" === nodeType || "TSNamedTupleMember" === nodeType || "TSUnionType" === nodeType || "TSIntersectionType" === nodeType || "TSConditionalType" === nodeType || "TSInferType" === nodeType || "TSParenthesizedType" === nodeType || "TSTypeOperator" === nodeType || "TSIndexedAccessType" === nodeType || "TSMappedType" === nodeType || "TSLiteralType" === nodeType || "TSExpressionWithTypeArguments" === nodeType || "TSInterfaceDeclaration" === nodeType || "TSInterfaceBody" === nodeType || "TSTypeAliasDeclaration" === nodeType || "TSAsExpression" === nodeType || "TSTypeAssertion" === nodeType || "TSEnumDeclaration" === nodeType || "TSEnumMember" === nodeType || "TSModuleDeclaration" === nodeType || "TSModuleBlock" === nodeType || "TSImportType" === nodeType || "TSImportEqualsDeclaration" === nodeType || "TSExternalModuleReference" === nodeType || "TSNonNullExpression" === nodeType || "TSExportAssignment" === nodeType || "TSNamespaceExportDeclaration" === nodeType || "TSTypeAnnotation" === nodeType || "TSTypeParameterInstantiation" === nodeType || "TSTypeParameterDeclaration" === nodeType || "TSTypeParameter" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isTypeofTypeAnnotation = function(node, opts) {
        if (!node) return !1;
        if ("TypeofTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isUnaryExpression = function(node, opts) {
        if (!node) return !1;
        if ("UnaryExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isUnaryLike = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("UnaryExpression" === nodeType || "SpreadElement" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isUnionTypeAnnotation = function(node, opts) {
        if (!node) return !1;
        if ("UnionTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isUpdateExpression = function(node, opts) {
        if (!node) return !1;
        if ("UpdateExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isUserWhitespacable = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("ObjectMethod" === nodeType || "ObjectProperty" === nodeType || "ObjectTypeInternalSlot" === nodeType || "ObjectTypeCallProperty" === nodeType || "ObjectTypeIndexer" === nodeType || "ObjectTypeProperty" === nodeType || "ObjectTypeSpreadProperty" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isV8IntrinsicIdentifier = function(node, opts) {
        if (!node) return !1;
        if ("V8IntrinsicIdentifier" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isVariableDeclaration = function(node, opts) {
        if (!node) return !1;
        if ("VariableDeclaration" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isVariableDeclarator = function(node, opts) {
        if (!node) return !1;
        if ("VariableDeclarator" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isVariance = function(node, opts) {
        if (!node) return !1;
        if ("Variance" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isVoidTypeAnnotation = function(node, opts) {
        if (!node) return !1;
        if ("VoidTypeAnnotation" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isWhile = function(node, opts) {
        if (!node) return !1;
        const nodeType = node.type;
        if ("DoWhileStatement" === nodeType || "WhileStatement" === nodeType) return void 0 === opts || (0, 
        _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isWhileStatement = function(node, opts) {
        if (!node) return !1;
        if ("WhileStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isWithStatement = function(node, opts) {
        if (!node) return !1;
        if ("WithStatement" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      }, exports.isYieldExpression = function(node, opts) {
        if (!node) return !1;
        if ("YieldExpression" === node.type) return void 0 === opts || (0, _shallowEqual.default)(node, opts);
        return !1;
      };
      var _shallowEqual = __webpack_require__(7610);
    },
    7275: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(type, node, opts) {
        if (!node) return !1;
        if (!(0, _isType.default)(node.type, type)) return !opts && "Placeholder" === node.type && type in _definitions.FLIPPED_ALIAS_KEYS && (0, 
        _isPlaceholderType.default)(node.expectedNode, type);
        return void 0 === opts || (0, _shallowEqual.default)(node, opts);
      };
      var _shallowEqual = __webpack_require__(7610), _isType = __webpack_require__(1452), _isPlaceholderType = __webpack_require__(15), _definitions = __webpack_require__(6507);
    },
    6971: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(node, parent, grandparent) {
        if (grandparent && "Identifier" === node.type && "ObjectProperty" === parent.type && "ObjectExpression" === grandparent.type) return !1;
        const keys = _getBindingIdentifiers.default.keys[parent.type];
        if (keys) for (let i = 0; i < keys.length; i++) {
          const key = keys[i], val = parent[key];
          if (Array.isArray(val)) {
            if (val.indexOf(node) >= 0) return !0;
          } else if (val === node) return !0;
        }
        return !1;
      };
      var _getBindingIdentifiers = __webpack_require__(1477);
    },
    443: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(node) {
        return (0, _generated.isFunctionDeclaration)(node) || (0, _generated.isClassDeclaration)(node) || (0, 
        _isLet.default)(node);
      };
      var _generated = __webpack_require__(4746), _isLet = __webpack_require__(7182);
    },
    9268: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(node) {
        if ((0, _isType.default)(node.type, "Immutable")) return !0;
        if ((0, _generated.isIdentifier)(node)) return "undefined" === node.name;
        return !1;
      };
      var _isType = __webpack_require__(1452), _generated = __webpack_require__(4746);
    },
    7182: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(node) {
        return (0, _generated.isVariableDeclaration)(node) && ("var" !== node.kind || node[_constants.BLOCK_SCOPED_SYMBOL]);
      };
      var _generated = __webpack_require__(4746), _constants = __webpack_require__(6325);
    },
    8523: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(node) {
        return !(!node || !_definitions.VISITOR_KEYS[node.type]);
      };
      var _definitions = __webpack_require__(6507);
    },
    4635: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function isNodesEquivalent(a, b) {
        if ("object" != typeof a || "object" != typeof b || null == a || null == b) return a === b;
        if (a.type !== b.type) return !1;
        const fields = Object.keys(_definitions.NODE_FIELDS[a.type] || a.type), visitorKeys = _definitions.VISITOR_KEYS[a.type];
        for (const field of fields) {
          if (typeof a[field] != typeof b[field]) return !1;
          if (null != a[field] || null != b[field]) {
            if (null == a[field] || null == b[field]) return !1;
            if (Array.isArray(a[field])) {
              if (!Array.isArray(b[field])) return !1;
              if (a[field].length !== b[field].length) return !1;
              for (let i = 0; i < a[field].length; i++) if (!isNodesEquivalent(a[field][i], b[field][i])) return !1;
            } else if ("object" != typeof a[field] || null != visitorKeys && visitorKeys.includes(field)) {
              if (!isNodesEquivalent(a[field], b[field])) return !1;
            } else for (const key of Object.keys(a[field])) if (a[field][key] !== b[field][key]) return !1;
          }
        }
        return !0;
      };
      var _definitions = __webpack_require__(6507);
    },
    15: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(placeholderType, targetType) {
        if (placeholderType === targetType) return !0;
        const aliases = _definitions.PLACEHOLDERS_ALIAS[placeholderType];
        if (aliases) for (const alias of aliases) if (targetType === alias) return !0;
        return !1;
      };
      var _definitions = __webpack_require__(6507);
    },
    4837: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(node, parent, grandparent) {
        switch (parent.type) {
         case "MemberExpression":
         case "OptionalMemberExpression":
          return parent.property === node ? !!parent.computed : parent.object === node;

         case "JSXMemberExpression":
          return parent.object === node;

         case "VariableDeclarator":
          return parent.init === node;

         case "ArrowFunctionExpression":
          return parent.body === node;

         case "PrivateName":
         case "LabeledStatement":
         case "CatchClause":
         case "RestElement":
         case "BreakStatement":
         case "ContinueStatement":
         case "FunctionDeclaration":
         case "FunctionExpression":
         case "ExportNamespaceSpecifier":
         case "ExportDefaultSpecifier":
         case "ImportDefaultSpecifier":
         case "ImportNamespaceSpecifier":
         case "ImportSpecifier":
         case "ImportAttribute":
         case "JSXAttribute":
         case "ObjectPattern":
         case "ArrayPattern":
         case "MetaProperty":
          return !1;

         case "ClassMethod":
         case "ClassPrivateMethod":
         case "ObjectMethod":
          return parent.key === node && !!parent.computed;

         case "ObjectProperty":
          return parent.key === node ? !!parent.computed : !grandparent || "ObjectPattern" !== grandparent.type;

         case "ClassProperty":
         case "ClassAccessorProperty":
         case "TSPropertySignature":
          return parent.key !== node || !!parent.computed;

         case "ClassPrivateProperty":
         case "ObjectTypeProperty":
          return parent.key !== node;

         case "ClassDeclaration":
         case "ClassExpression":
          return parent.superClass === node;

         case "AssignmentExpression":
         case "AssignmentPattern":
          return parent.right === node;

         case "ExportSpecifier":
          return (null == grandparent || !grandparent.source) && parent.local === node;

         case "TSEnumMember":
          return parent.id !== node;
        }
        return !0;
      };
    },
    6400: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(node, parent) {
        if ((0, _generated.isBlockStatement)(node) && ((0, _generated.isFunction)(parent) || (0, 
        _generated.isCatchClause)(parent))) return !1;
        if ((0, _generated.isPattern)(node) && ((0, _generated.isFunction)(parent) || (0, 
        _generated.isCatchClause)(parent))) return !0;
        return (0, _generated.isScopable)(node);
      };
      var _generated = __webpack_require__(4746);
    },
    2800: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(specifier) {
        return (0, _generated.isImportDefaultSpecifier)(specifier) || (0, _generated.isIdentifier)(specifier.imported || specifier.exported, {
          name: "default"
        });
      };
      var _generated = __webpack_require__(4746);
    },
    1452: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(nodeType, targetType) {
        if (nodeType === targetType) return !0;
        if (_definitions.ALIAS_KEYS[targetType]) return !1;
        const aliases = _definitions.FLIPPED_ALIAS_KEYS[targetType];
        if (aliases) {
          if (aliases[0] === nodeType) return !0;
          for (const alias of aliases) if (nodeType === alias) return !0;
        }
        return !1;
      };
      var _definitions = __webpack_require__(6507);
    },
    8917: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(name) {
        return (0, _isValidIdentifier.default)(name) && !RESERVED_WORDS_ES3_ONLY.has(name);
      };
      var _isValidIdentifier = __webpack_require__(3045);
      const RESERVED_WORDS_ES3_ONLY = new Set([ "abstract", "boolean", "byte", "char", "double", "enum", "final", "float", "goto", "implements", "int", "interface", "long", "native", "package", "private", "protected", "public", "short", "static", "synchronized", "throws", "transient", "volatile" ]);
    },
    3045: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(name, reserved = !0) {
        if ("string" != typeof name) return !1;
        if (reserved && ((0, _helperValidatorIdentifier.isKeyword)(name) || (0, _helperValidatorIdentifier.isStrictReservedWord)(name, !0))) return !1;
        return (0, _helperValidatorIdentifier.isIdentifierName)(name);
      };
      var _helperValidatorIdentifier = __webpack_require__(720);
    },
    830: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(node) {
        return (0, _generated.isVariableDeclaration)(node, {
          kind: "var"
        }) && !node[_constants.BLOCK_SCOPED_SYMBOL];
      };
      var _generated = __webpack_require__(4746), _constants = __webpack_require__(6325);
    },
    2205: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(member, match, allowPartial) {
        if (!(0, _generated.isMemberExpression)(member)) return !1;
        const parts = Array.isArray(match) ? match : match.split("."), nodes = [];
        let node;
        for (node = member; (0, _generated.isMemberExpression)(node); node = node.object) nodes.push(node.property);
        if (nodes.push(node), nodes.length < parts.length) return !1;
        if (!allowPartial && nodes.length > parts.length) return !1;
        for (let i = 0, j = nodes.length - 1; i < parts.length; i++, j--) {
          const node = nodes[j];
          let value;
          if ((0, _generated.isIdentifier)(node)) value = node.name; else if ((0, _generated.isStringLiteral)(node)) value = node.value; else {
            if (!(0, _generated.isThisExpression)(node)) return !1;
            value = "this";
          }
          if (parts[i] !== value) return !1;
        }
        return !0;
      };
      var _generated = __webpack_require__(4746);
    },
    3193: (__unused_webpack_module, exports) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(tagName) {
        return !!tagName && /^[a-z]/.test(tagName);
      };
    },
    6035: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      var _default = (0, __webpack_require__(8847).default)("React.Component");
      exports.default = _default;
    },
    3804: (__unused_webpack_module, exports, __webpack_require__) => {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(node, key, val) {
        if (!node) return;
        const fields = _definitions.NODE_FIELDS[node.type];
        if (!fields) return;
        const field = fields[key];
        validateField(node, key, val, field), validateChild(node, key, val);
      }, exports.validateChild = validateChild, exports.validateField = validateField;
      var _definitions = __webpack_require__(6507);
      function validateField(node, key, val, field) {
        null != field && field.validate && (field.optional && null == val || field.validate(node, key, val));
      }
      function validateChild(node, key, val) {
        if (null == val) return;
        const validate = _definitions.NODE_PARENT_VALIDATIONS[val.type];
        validate && validate(node, key, val);
      }
    },
    3164: module => {
      "use strict";
      let fastProto = null;
      function FastObject(o) {
        if (null !== fastProto && (fastProto.property, 1)) {
          const result = fastProto;
          return fastProto = FastObject.prototype = null, result;
        }
        return fastProto = FastObject.prototype = null == o ? Object.create(null) : o, new FastObject;
      }
      FastObject(), module.exports = function(o) {
        return FastObject(o);
      };
    }
  }, __webpack_module_cache__ = {};
  var __webpack_exports__ = function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (void 0 !== cachedModule) return cachedModule.exports;
    var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    };
    return __webpack_modules__[moduleId](module, module.exports, __webpack_require__), 
    module.exports;
  }(8218), __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
})();