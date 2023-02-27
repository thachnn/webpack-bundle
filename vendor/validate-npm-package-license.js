(() => {
  var __webpack_modules__ = {
    49557: (module, __unused_webpack_exports, __webpack_require__) => {
      var parse = __webpack_require__(79516), spdxLicenseIds = __webpack_require__(66316);
      function valid(string) {
        try {
          return parse(string), !0;
        } catch (error) {
          return !1;
        }
      }
      var transpositions = [ [ "APGL", "AGPL" ], [ "Gpl", "GPL" ], [ "GLP", "GPL" ], [ "APL", "Apache" ], [ "ISD", "ISC" ], [ "GLP", "GPL" ], [ "IST", "ISC" ], [ "Claude", "Clause" ], [ " or later", "+" ], [ " International", "" ], [ "GNU", "GPL" ], [ "GUN", "GPL" ], [ "+", "" ], [ "GNU GPL", "GPL" ], [ "GNU/GPL", "GPL" ], [ "GNU GLP", "GPL" ], [ "GNU General Public License", "GPL" ], [ "Gnu public license", "GPL" ], [ "GNU Public License", "GPL" ], [ "GNU GENERAL PUBLIC LICENSE", "GPL" ], [ "MTI", "MIT" ], [ "Mozilla Public License", "MPL" ], [ "WTH", "WTF" ], [ "-License", "" ] ], transforms = [ function(argument) {
        return argument.toUpperCase();
      }, function(argument) {
        return argument.trim();
      }, function(argument) {
        return argument.replace(/\./g, "");
      }, function(argument) {
        return argument.replace(/\s+/g, "");
      }, function(argument) {
        return argument.replace(/\s+/g, "-");
      }, function(argument) {
        return argument.replace("v", "-");
      }, function(argument) {
        return argument.replace(/,?\s*(\d)/, "-$1");
      }, function(argument) {
        return argument.replace(/,?\s*(\d)/, "-$1.0");
      }, function(argument) {
        return argument.replace(/,?\s*(V\.|v\.|V|v|Version|version)\s*(\d)/, "-$2");
      }, function(argument) {
        return argument.replace(/,?\s*(V\.|v\.|V|v|Version|version)\s*(\d)/, "-$2.0");
      }, function(argument) {
        return argument[0].toUpperCase() + argument.slice(1);
      }, function(argument) {
        return argument.replace("/", "-");
      }, function(argument) {
        return argument.replace(/\s*V\s*(\d)/, "-$1").replace(/(\d)$/, "$1.0");
      }, function(argument) {
        return -1 !== argument.indexOf("3.0") ? argument + "-or-later" : argument + "-only";
      }, function(argument) {
        return argument + "only";
      }, function(argument) {
        return argument.replace(/(\d)$/, "-$1.0");
      }, function(argument) {
        return argument.replace(/(-| )?(\d)$/, "-$2-Clause");
      }, function(argument) {
        return argument.replace(/(-| )clause(-| )(\d)/, "-$3-Clause");
      }, function(argument) {
        return "CC-" + argument;
      }, function(argument) {
        return "CC-" + argument + "-4.0";
      }, function(argument) {
        return argument.replace("Attribution", "BY").replace("NonCommercial", "NC").replace("NoDerivatives", "ND").replace(/ (\d)/, "-$1").replace(/ ?International/, "");
      }, function(argument) {
        return "CC-" + argument.replace("Attribution", "BY").replace("NonCommercial", "NC").replace("NoDerivatives", "ND").replace(/ (\d)/, "-$1").replace(/ ?International/, "") + "-4.0";
      } ], licensesWithVersions = spdxLicenseIds.map((function(id) {
        var match = /^(.*)-\d+\.\d+$/.exec(id);
        return match ? [ match[0], match[1] ] : [ id, null ];
      })).reduce((function(objectMap, item) {
        var key = item[1];
        return objectMap[key] = objectMap[key] || [], objectMap[key].push(item[0]), objectMap;
      }), {}), licensesWithOneVersion = Object.keys(licensesWithVersions).map((function(key) {
        return [ key, licensesWithVersions[key] ];
      })).filter((function(item) {
        return 1 === item[1].length && null !== item[0] && "APL" !== item[0];
      })).map((function(item) {
        return [ item[0], item[1][0] ];
      }));
      licensesWithVersions = void 0;
      var lastResorts = [ [ "UNLI", "Unlicense" ], [ "WTF", "WTFPL" ], [ "2 CLAUSE", "BSD-2-Clause" ], [ "2-CLAUSE", "BSD-2-Clause" ], [ "3 CLAUSE", "BSD-3-Clause" ], [ "3-CLAUSE", "BSD-3-Clause" ], [ "AFFERO", "AGPL-3.0-or-later" ], [ "AGPL", "AGPL-3.0-or-later" ], [ "APACHE", "Apache-2.0" ], [ "ARTISTIC", "Artistic-2.0" ], [ "Affero", "AGPL-3.0-or-later" ], [ "BEER", "Beerware" ], [ "BOOST", "BSL-1.0" ], [ "BSD", "BSD-2-Clause" ], [ "CDDL", "CDDL-1.1" ], [ "ECLIPSE", "EPL-1.0" ], [ "FUCK", "WTFPL" ], [ "GNU", "GPL-3.0-or-later" ], [ "LGPL", "LGPL-3.0-or-later" ], [ "GPLV1", "GPL-1.0-only" ], [ "GPLV2", "GPL-2.0-only" ], [ "GPL", "GPL-3.0-or-later" ], [ "MIT +NO-FALSE-ATTRIBS", "MITNFA" ], [ "MIT", "MIT" ], [ "MPL", "MPL-2.0" ], [ "X11", "X11" ], [ "ZLIB", "Zlib" ] ].concat(licensesWithOneVersion), validTransformation = function(identifier) {
        for (var i = 0; i < transforms.length; i++) {
          var transformed = transforms[i](identifier).trim();
          if (transformed !== identifier && valid(transformed)) return transformed;
        }
        return null;
      }, validLastResort = function(identifier) {
        for (var upperCased = identifier.toUpperCase(), i = 0; i < lastResorts.length; i++) {
          var lastResort = lastResorts[i];
          if (upperCased.indexOf(lastResort[0]) > -1) return lastResort[1];
        }
        return null;
      }, anyCorrection = function(identifier, check) {
        for (var i = 0; i < transpositions.length; i++) {
          var transposition = transpositions[i], transposed = transposition[0];
          if (identifier.indexOf(transposed) > -1) {
            var checked = check(identifier.replace(transposed, transposition[1]));
            if (null !== checked) return checked;
          }
        }
        return null;
      };
      function upgradeGPLs(value) {
        return -1 !== [ "GPL-1.0", "LGPL-1.0", "AGPL-1.0", "GPL-2.0", "LGPL-2.0", "AGPL-2.0", "LGPL-2.1" ].indexOf(value) ? value + "-only" : -1 !== [ "GPL-3.0", "LGPL-3.0", "AGPL-3.0" ].indexOf(value) ? value + "-or-later" : value;
      }
      module.exports = function(identifier) {
        if (!("string" == typeof identifier && 0 !== identifier.trim().length)) throw Error("Invalid argument. Expected non-empty string.");
        if (valid(identifier = identifier.replace(/\+$/, "").trim())) return upgradeGPLs(identifier);
        var transformed = validTransformation(identifier);
        return null !== transformed || null !== (transformed = anyCorrection(identifier, (function(argument) {
          return valid(argument) ? argument : validTransformation(argument);
        }))) || null !== (transformed = validLastResort(identifier)) || null !== (transformed = anyCorrection(identifier, validLastResort)) ? upgradeGPLs(transformed) : null;
      };
    },
    79516: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var scan = __webpack_require__(20500), parse = __webpack_require__(94698);
      module.exports = function(source) {
        return parse(scan(source));
      };
    },
    94698: module => {
      "use strict";
      module.exports = function(tokens) {
        var index = 0;
        function hasMore() {
          return index < tokens.length;
        }
        function token() {
          return hasMore() ? tokens[index] : null;
        }
        function next() {
          if (!hasMore()) throw new Error;
          index++;
        }
        function parseOperator(operator) {
          var t = token();
          if (t && "OPERATOR" === t.type && operator === t.string) return next(), t.string;
        }
        function parseLicense() {
          var t = token();
          if (t && "LICENSE" === t.type) {
            next();
            var node = {
              license: t.string
            };
            parseOperator("+") && (node.plus = !0);
            var exception = function() {
              if (parseOperator("WITH")) {
                var t = token();
                if (t && "EXCEPTION" === t.type) return next(), t.string;
                throw new Error("Expected exception after `WITH`");
              }
            }();
            return exception && (node.exception = exception), node;
          }
        }
        function makeBinaryOpParser(operator, nextParser) {
          return function parseBinaryOp() {
            var left = nextParser();
            if (left) {
              if (!parseOperator(operator)) return left;
              var right = parseBinaryOp();
              if (!right) throw new Error("Expected expression");
              return {
                left,
                conjunction: operator.toLowerCase(),
                right
              };
            }
          };
        }
        var parseAnd = makeBinaryOpParser("AND", (function() {
          return function() {
            if (parseOperator("(")) {
              var expr = parseExpression();
              if (!parseOperator(")")) throw new Error("Expected `)`");
              return expr;
            }
          }() || function() {
            var begin = index, string = "", t = token();
            if ("DOCUMENTREF" === t.type && (next(), string += "DocumentRef-" + t.string + ":", 
            !parseOperator(":"))) throw new Error("Expected `:` after `DocumentRef-...`");
            if ("LICENSEREF" === (t = token()).type) return next(), {
              license: string += "LicenseRef-" + t.string
            };
            index = begin;
          }() || parseLicense();
        })), parseExpression = makeBinaryOpParser("OR", parseAnd), node = parseExpression();
        if (!node || hasMore()) throw new Error("Syntax error");
        return node;
      };
    },
    20500: (module, __unused_webpack_exports, __webpack_require__) => {
      "use strict";
      var licenses = [].concat(__webpack_require__(66316)).concat(__webpack_require__(52908)), exceptions = __webpack_require__(52929);
      module.exports = function(source) {
        var index = 0;
        function hasMore() {
          return index < source.length;
        }
        function read(value) {
          if (value instanceof RegExp) {
            var match = source.slice(index).match(value);
            if (match) return index += match[0].length, match[0];
          } else if (source.indexOf(value, index) === index) return index += value.length, 
          value;
        }
        function idstring() {
          return read(/[A-Za-z0-9-.]+/);
        }
        function expectIdstring() {
          var string = idstring();
          if (!string) throw new Error("Expected idstring at offset " + index);
          return string;
        }
        function parseToken() {
          return function() {
            for (var string, possibilities = [ "WITH", "AND", "OR", "(", ")", ":", "+" ], i = 0; i < possibilities.length && !(string = read(possibilities[i])); i++) ;
            if ("+" === string && index > 1 && " " === source[index - 2]) throw new Error("Space before `+`");
            return string && {
              type: "OPERATOR",
              string
            };
          }() || function() {
            if (read("DocumentRef-")) return {
              type: "DOCUMENTREF",
              string: expectIdstring()
            };
          }() || function() {
            if (read("LicenseRef-")) return {
              type: "LICENSEREF",
              string: expectIdstring()
            };
          }() || (begin = index, string = idstring(), -1 !== licenses.indexOf(string) ? {
            type: "LICENSE",
            string
          } : -1 !== exceptions.indexOf(string) ? {
            type: "EXCEPTION",
            string
          } : void (index = begin));
          var begin, string;
        }
        for (var tokens = []; hasMore() && (read(/[ ]*/), hasMore()); ) {
          var token = parseToken();
          if (!token) throw new Error("Unexpected `" + source[index] + "` at offset " + index);
          tokens.push(token);
        }
        return tokens;
      };
    },
    85647: (module, __unused_webpack_exports, __webpack_require__) => {
      var parse = __webpack_require__(79516), correct = __webpack_require__(49557), genericWarning = 'license should be a valid SPDX license expression (without "LicenseRef"), "UNLICENSED", or "SEE LICENSE IN <filename>"', fileReferenceRE = /^SEE LICEN[CS]E IN (.+)$/;
      function startsWith(prefix, string) {
        return string.slice(0, prefix.length) === prefix;
      }
      function usesLicenseRef(ast) {
        if (ast.hasOwnProperty("license")) {
          var license = ast.license;
          return startsWith("LicenseRef", license) || startsWith("DocumentRef", license);
        }
        return usesLicenseRef(ast.left) || usesLicenseRef(ast.right);
      }
      module.exports = function(argument) {
        var ast;
        try {
          ast = parse(argument);
        } catch (e) {
          var match;
          if ("UNLICENSED" === argument || "UNLICENCED" === argument) return {
            validForOldPackages: !0,
            validForNewPackages: !0,
            unlicensed: !0
          };
          if (match = fileReferenceRE.exec(argument)) return {
            validForOldPackages: !0,
            validForNewPackages: !0,
            inFile: match[1]
          };
          var result = {
            validForOldPackages: !1,
            validForNewPackages: !1,
            warnings: [ genericWarning ]
          };
          if (0 !== argument.trim().length) {
            var corrected = correct(argument);
            corrected && result.warnings.push('license is similar to the valid expression "' + corrected + '"');
          }
          return result;
        }
        return usesLicenseRef(ast) ? {
          validForNewPackages: !1,
          validForOldPackages: !1,
          spdx: !0,
          warnings: [ genericWarning ]
        } : {
          validForNewPackages: !0,
          validForOldPackages: !0,
          spdx: !0
        };
      };
    },
    52929: module => {
      "use strict";
      module.exports = JSON.parse('["389-exception","Autoconf-exception-2.0","Autoconf-exception-3.0","Bison-exception-2.2","Bootloader-exception","CLISP-exception-2.0","Classpath-exception-2.0","DigiRule-FOSS-exception","FLTK-exception","Fawkes-Runtime-exception","Font-exception-2.0","GCC-exception-2.0","GCC-exception-3.1","LZMA-exception","Libtool-exception","Linux-syscall-note","Nokia-Qt-exception-1.1","OCCT-exception-1.0","Qwt-exception-1.0","WxWindows-exception-3.1","eCos-exception-2.0","freertos-exception-2.0","gnu-javamail-exception","i2p-gpl-java-exception","mif-exception","openvpn-openssl-exception","u-boot-exception-2.0"]');
    },
    52908: module => {
      "use strict";
      module.exports = JSON.parse('["AGPL-1.0","AGPL-3.0","GFDL-1.1","GFDL-1.2","GFDL-1.3","GPL-1.0","GPL-2.0","GPL-2.0-with-GCC-exception","GPL-2.0-with-autoconf-exception","GPL-2.0-with-bison-exception","GPL-2.0-with-classpath-exception","GPL-2.0-with-font-exception","GPL-3.0","GPL-3.0-with-GCC-exception","GPL-3.0-with-autoconf-exception","LGPL-2.0","LGPL-2.1","LGPL-3.0","Nunit","StandardML-NJ","eCos-2.0","wxWindows"]');
    },
    66316: module => {
      "use strict";
      module.exports = JSON.parse('["0BSD","AAL","ADSL","AFL-1.1","AFL-1.2","AFL-2.0","AFL-2.1","AFL-3.0","AGPL-1.0-only","AGPL-1.0-or-later","AGPL-3.0-only","AGPL-3.0-or-later","AMDPLPA","AML","AMPAS","ANTLR-PD","APAFML","APL-1.0","APSL-1.0","APSL-1.1","APSL-1.2","APSL-2.0","Abstyles","Adobe-2006","Adobe-Glyph","Afmparse","Aladdin","Apache-1.0","Apache-1.1","Apache-2.0","Artistic-1.0","Artistic-1.0-Perl","Artistic-1.0-cl8","Artistic-2.0","BSD-1-Clause","BSD-2-Clause","BSD-2-Clause-FreeBSD","BSD-2-Clause-NetBSD","BSD-2-Clause-Patent","BSD-3-Clause","BSD-3-Clause-Attribution","BSD-3-Clause-Clear","BSD-3-Clause-LBNL","BSD-3-Clause-No-Nuclear-License","BSD-3-Clause-No-Nuclear-License-2014","BSD-3-Clause-No-Nuclear-Warranty","BSD-3-Clause-Open-MPI","BSD-4-Clause","BSD-4-Clause-UC","BSD-Protection","BSD-Source-Code","BSL-1.0","Bahyph","Barr","Beerware","BitTorrent-1.0","BitTorrent-1.1","BlueOak-1.0.0","Borceux","CATOSL-1.1","CC-BY-1.0","CC-BY-2.0","CC-BY-2.5","CC-BY-3.0","CC-BY-4.0","CC-BY-NC-1.0","CC-BY-NC-2.0","CC-BY-NC-2.5","CC-BY-NC-3.0","CC-BY-NC-4.0","CC-BY-NC-ND-1.0","CC-BY-NC-ND-2.0","CC-BY-NC-ND-2.5","CC-BY-NC-ND-3.0","CC-BY-NC-ND-4.0","CC-BY-NC-SA-1.0","CC-BY-NC-SA-2.0","CC-BY-NC-SA-2.5","CC-BY-NC-SA-3.0","CC-BY-NC-SA-4.0","CC-BY-ND-1.0","CC-BY-ND-2.0","CC-BY-ND-2.5","CC-BY-ND-3.0","CC-BY-ND-4.0","CC-BY-SA-1.0","CC-BY-SA-2.0","CC-BY-SA-2.5","CC-BY-SA-3.0","CC-BY-SA-4.0","CC-PDDC","CC0-1.0","CDDL-1.0","CDDL-1.1","CDLA-Permissive-1.0","CDLA-Sharing-1.0","CECILL-1.0","CECILL-1.1","CECILL-2.0","CECILL-2.1","CECILL-B","CECILL-C","CERN-OHL-1.1","CERN-OHL-1.2","CNRI-Jython","CNRI-Python","CNRI-Python-GPL-Compatible","CPAL-1.0","CPL-1.0","CPOL-1.02","CUA-OPL-1.0","Caldera","ClArtistic","Condor-1.1","Crossword","CrystalStacker","Cube","D-FSL-1.0","DOC","DSDP","Dotseqn","ECL-1.0","ECL-2.0","EFL-1.0","EFL-2.0","EPL-1.0","EPL-2.0","EUDatagrid","EUPL-1.0","EUPL-1.1","EUPL-1.2","Entessa","ErlPL-1.1","Eurosym","FSFAP","FSFUL","FSFULLR","FTL","Fair","Frameworx-1.0","FreeImage","GFDL-1.1-only","GFDL-1.1-or-later","GFDL-1.2-only","GFDL-1.2-or-later","GFDL-1.3-only","GFDL-1.3-or-later","GL2PS","GPL-1.0-only","GPL-1.0-or-later","GPL-2.0-only","GPL-2.0-or-later","GPL-3.0-only","GPL-3.0-or-later","Giftware","Glide","Glulxe","HPND","HPND-sell-variant","HaskellReport","IBM-pibs","ICU","IJG","IPA","IPL-1.0","ISC","ImageMagick","Imlib2","Info-ZIP","Intel","Intel-ACPI","Interbase-1.0","JPNIC","JSON","JasPer-2.0","LAL-1.2","LAL-1.3","LGPL-2.0-only","LGPL-2.0-or-later","LGPL-2.1-only","LGPL-2.1-or-later","LGPL-3.0-only","LGPL-3.0-or-later","LGPLLR","LPL-1.0","LPL-1.02","LPPL-1.0","LPPL-1.1","LPPL-1.2","LPPL-1.3a","LPPL-1.3c","Latex2e","Leptonica","LiLiQ-P-1.1","LiLiQ-R-1.1","LiLiQ-Rplus-1.1","Libpng","Linux-OpenIB","MIT","MIT-0","MIT-CMU","MIT-advertising","MIT-enna","MIT-feh","MITNFA","MPL-1.0","MPL-1.1","MPL-2.0","MPL-2.0-no-copyleft-exception","MS-PL","MS-RL","MTLL","MakeIndex","MirOS","Motosoto","Multics","Mup","NASA-1.3","NBPL-1.0","NCSA","NGPL","NLOD-1.0","NLPL","NOSL","NPL-1.0","NPL-1.1","NPOSL-3.0","NRL","NTP","Naumen","Net-SNMP","NetCDF","Newsletr","Nokia","Noweb","OCCT-PL","OCLC-2.0","ODC-By-1.0","ODbL-1.0","OFL-1.0","OFL-1.1","OGL-UK-1.0","OGL-UK-2.0","OGL-UK-3.0","OGTSL","OLDAP-1.1","OLDAP-1.2","OLDAP-1.3","OLDAP-1.4","OLDAP-2.0","OLDAP-2.0.1","OLDAP-2.1","OLDAP-2.2","OLDAP-2.2.1","OLDAP-2.2.2","OLDAP-2.3","OLDAP-2.4","OLDAP-2.5","OLDAP-2.6","OLDAP-2.7","OLDAP-2.8","OML","OPL-1.0","OSET-PL-2.1","OSL-1.0","OSL-1.1","OSL-2.0","OSL-2.1","OSL-3.0","OpenSSL","PDDL-1.0","PHP-3.0","PHP-3.01","Parity-6.0.0","Plexus","PostgreSQL","Python-2.0","QPL-1.0","Qhull","RHeCos-1.1","RPL-1.1","RPL-1.5","RPSL-1.0","RSA-MD","RSCPL","Rdisc","Ruby","SAX-PD","SCEA","SGI-B-1.0","SGI-B-1.1","SGI-B-2.0","SHL-0.5","SHL-0.51","SISSL","SISSL-1.2","SMLNJ","SMPPL","SNIA","SPL-1.0","SSPL-1.0","SWL","Saxpath","Sendmail","Sendmail-8.23","SimPL-2.0","Sleepycat","Spencer-86","Spencer-94","Spencer-99","SugarCRM-1.1.3","TAPR-OHL-1.0","TCL","TCP-wrappers","TMate","TORQUE-1.1","TOSL","TU-Berlin-1.0","TU-Berlin-2.0","UPL-1.0","Unicode-DFS-2015","Unicode-DFS-2016","Unicode-TOU","Unlicense","VOSTROM","VSL-1.0","Vim","W3C","W3C-19980720","W3C-20150513","WTFPL","Watcom-1.0","Wsuipa","X11","XFree86-1.1","XSkat","Xerox","Xnet","YPL-1.0","YPL-1.1","ZPL-1.1","ZPL-2.0","ZPL-2.1","Zed","Zend-2.0","Zimbra-1.3","Zimbra-1.4","Zlib","blessing","bzip2-1.0.5","bzip2-1.0.6","copyleft-next-0.3.0","copyleft-next-0.3.1","curl","diffmark","dvipdfm","eGenix","gSOAP-1.3b","gnuplot","iMatix","libpng-2.0","libtiff","mpich2","psfrag","psutils","xinetd","xpp","zlib-acknowledgement"]');
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
  }(85647);
  module.exports = __webpack_exports__;
})();