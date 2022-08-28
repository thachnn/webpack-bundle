(() => {
var __webpack_modules__ = {
9667: module => {
function BrowserslistError(message) {
this.name = "BrowserslistError", this.message = message, this.browserslist = !0, 
Error.captureStackTrace && Error.captureStackTrace(this, BrowserslistError);
}
BrowserslistError.prototype = Error.prototype, module.exports = BrowserslistError;
},
31e3: (module, __unused_webpack_exports, __webpack_require__) => {
var jsReleases = __webpack_require__(76052), agents = __webpack_require__(95459).D, jsEOL = __webpack_require__(78864), path = __webpack_require__(71017), e2c = __webpack_require__(76250), BrowserslistError = __webpack_require__(9667), env = __webpack_require__(30466);
function isVersionsMatch(versionA, versionB) {
return 0 === (versionA + ".").indexOf(versionB + ".");
}
function normalize(versions) {
return versions.filter((function(version) {
return "string" == typeof version;
}));
}
function normalizeElectron(version) {
var versionToUse = version;
return 3 === version.split(".").length && (versionToUse = version.split(".").slice(0, -1).join(".")), 
versionToUse;
}
function nameMapper(name) {
return function(version) {
return name + " " + version;
};
}
function getMajor(version) {
return parseInt(version.split(".")[0]);
}
function getMajorVersions(released, number) {
if (0 === released.length) return [];
var majorVersions = uniq(released.map(getMajor)), minimum = majorVersions[majorVersions.length - number];
if (!minimum) return released;
for (var selected = [], i = released.length - 1; i >= 0 && !(minimum > getMajor(released[i])); i--) selected.unshift(released[i]);
return selected;
}
function uniq(array) {
for (var filtered = [], i = 0; i < array.length; i++) -1 === filtered.indexOf(array[i]) && filtered.push(array[i]);
return filtered;
}
function fillUsage(result, name, data) {
for (var i in data) result[name + " " + i] = data[i];
}
function generateFilter(sign, version) {
return version = parseFloat(version), ">" === sign ? function(v) {
return parseFloat(v) > version;
} : ">=" === sign ? function(v) {
return parseFloat(v) >= version;
} : "<" === sign ? function(v) {
return parseFloat(v) < version;
} : function(v) {
return parseFloat(v) <= version;
};
}
function parseSimpleInt(x) {
return parseInt(x);
}
function compare(a, b) {
return a < b ? -1 : a > b ? 1 : 0;
}
function compareSemver(a, b) {
return compare(parseInt(a[0]), parseInt(b[0])) || compare(parseInt(a[1] || "0"), parseInt(b[1] || "0")) || compare(parseInt(a[2] || "0"), parseInt(b[2] || "0"));
}
function semverFilterLoose(operator, range) {
return void 0 === (range = range.split(".").map(parseSimpleInt))[1] && (range[1] = "x"), 
"<=" === operator ? function(version) {
return compareSemverLoose(version = version.split(".").map(parseSimpleInt), range) <= 0;
} : function(version) {
return compareSemverLoose(version = version.split(".").map(parseSimpleInt), range) >= 0;
};
}
function compareSemverLoose(version, range) {
return version[0] !== range[0] ? version[0] < range[0] ? -1 : 1 : "x" === range[1] ? 0 : version[1] !== range[1] ? version[1] < range[1] ? -1 : 1 : 0;
}
function normalizeVersion(data, version) {
var resolved = function(data, version) {
return -1 !== data.versions.indexOf(version) ? version : !!browserslist.versionAliases[data.name][version] && browserslist.versionAliases[data.name][version];
}(data, version);
return resolved || 1 === data.versions.length && data.versions[0];
}
function filterByYear(since, context) {
return since /= 1e3, Object.keys(agents).reduce((function(selected, name) {
var data = byName(name, context);
if (!data) return selected;
var versions = Object.keys(data.releaseDate).filter((function(v) {
var date = data.releaseDate[v];
return null !== date && date >= since;
}));
return selected.concat(versions.map(nameMapper(data.name)));
}), []);
}
function cloneData(data) {
return {
name: data.name,
versions: data.versions,
released: data.released,
releaseDate: data.releaseDate
};
}
function byName(name, context) {
if (name = name.toLowerCase(), name = browserslist.aliases[name] || name, context.mobileToDesktop && browserslist.desktopNames[name]) {
var desktop = browserslist.data[browserslist.desktopNames[name]];
if ("android" === name) return android = cloneData(browserslist.data[name]), chrome = desktop, 
android.released = normalizeAndroidVersions(android.released, chrome.released), 
android.versions = normalizeAndroidVersions(android.versions, chrome.versions), 
android;
var cloned = cloneData(desktop);
return cloned.name = name, "op_mob" === name && (cloned = function(data, map) {
data.versions = data.versions.map((function(i) {
return map[i] || i;
})), data.released = data.released.map((function(i) {
return map[i] || i;
}));
var fixedDate = {};
for (var i in data.releaseDate) fixedDate[map[i] || i] = data.releaseDate[i];
return data.releaseDate = fixedDate, data;
}(cloned, {
"10.0-10.1": "10"
})), cloned;
}
var android, chrome;
return browserslist.data[name];
}
function normalizeAndroidVersions(androidVersions, chromeVersions) {
var last = chromeVersions[chromeVersions.length - 1];
return androidVersions.filter((function(version) {
return /^(?:[2-4]\.|[34]$)/.test(version);
})).concat(chromeVersions.slice(37 - last - 1));
}
function checkName(name, context) {
var data = byName(name, context);
if (!data) throw new BrowserslistError("Unknown browser " + name);
return data;
}
function unknownQuery(query) {
return new BrowserslistError("Unknown browser query `" + query + "`. Maybe you are using old Browserslist or made typo in query.");
}
function filterAndroid(list, versions, context) {
if (context.mobileToDesktop) return list;
var released = browserslist.data.android.released, diff = released[released.length - 1] - 37 - versions;
return diff > 0 ? list.slice(-1) : list.slice(diff - 1);
}
function resolve(queries, context) {
return (queries = Array.isArray(queries) ? flatten(queries.map(parse)) : parse(queries)).reduce((function(result, query, index) {
var selection = query.queryString, isExclude = 0 === selection.indexOf("not ");
if (isExclude) {
if (0 === index) throw new BrowserslistError("Write any browsers query (for instance, `defaults`) before `" + selection + "`");
selection = selection.slice(4);
}
for (var i = 0; i < QUERIES.length; i++) {
var type = QUERIES[i], match = selection.match(type.regexp);
if (match) {
var args = [ context ].concat(match.slice(1)), array = type.select.apply(browserslist, args).map((function(j) {
var parts = j.split(" ");
return "0" === parts[1] ? parts[0] + " " + byName(parts[0], context).versions[0] : j;
}));
if (2 === query.type) return isExclude ? result.filter((function(j) {
return -1 === array.indexOf(j);
})) : result.filter((function(j) {
return -1 !== array.indexOf(j);
}));
if (isExclude) {
var filter = {};
return array.forEach((function(j) {
filter[j] = !0;
})), result.filter((function(j) {
return !filter[j];
}));
}
return result.concat(array);
}
}
throw unknownQuery(selection);
}), []);
}
var cache = {};
function browserslist(queries, opts) {
if (void 0 === opts && (opts = {}), void 0 === opts.path && (opts.path = path.resolve ? path.resolve(".") : "."), 
null == queries) {
var config = browserslist.loadConfig(opts);
queries = config || browserslist.defaults;
}
if ("string" != typeof queries && !Array.isArray(queries)) throw new BrowserslistError("Browser queries must be an array or string. Got " + typeof queries + ".");
var context = {
ignoreUnknownVersions: opts.ignoreUnknownVersions,
dangerousExtend: opts.dangerousExtend,
mobileToDesktop: opts.mobileToDesktop,
path: opts.path,
env: opts.env
};
env.oldDataWarning(browserslist.data);
var stats = env.getStat(opts, browserslist.data);
if (stats) for (var browser in context.customUsage = {}, stats) fillUsage(context.customUsage, browser, stats[browser]);
var cacheKey = JSON.stringify([ queries, context ]);
if (cache[cacheKey]) return cache[cacheKey];
var result = uniq(resolve(queries, context)).sort((function(name1, name2) {
if (name1 = name1.split(" "), name2 = name2.split(" "), name1[0] === name2[0]) {
var version1 = name1[1].split("-")[0];
return compareSemver(name2[1].split("-")[0].split("."), version1.split("."));
}
return compare(name1[0], name2[0]);
}));
return process.env.BROWSERSLIST_DISABLE_CACHE || (cache[cacheKey] = result), result;
}
function parse(queries) {
var qs = [];
do {
queries = doMatch(queries, qs);
} while (queries);
return qs;
}
function doMatch(string, qs) {
var or = /^(?:,\s*|\s+or\s+)(.*)/i, and = /^\s+and\s+(.*)/i;
return function(string, predicate) {
for (var n = 1, max = string.length; n <= max; n++) {
if (predicate(string.substr(-n, n), n, max)) return string.slice(0, -n);
}
return "";
}(string, (function(parsed, n, max) {
return and.test(parsed) ? (qs.unshift({
type: 2,
queryString: parsed.match(and)[1]
}), !0) : or.test(parsed) ? (qs.unshift({
type: 1,
queryString: parsed.match(or)[1]
}), !0) : n === max && (qs.unshift({
type: 1,
queryString: parsed.trim()
}), !0);
}));
}
function flatten(array) {
return Array.isArray(array) ? array.reduce((function(a, b) {
return a.concat(flatten(b));
}), []) : [ array ];
}
function nodeQuery(context, version) {
var matched = browserslist.nodeVersions.filter((function(i) {
return isVersionsMatch(i, version);
}));
if (0 === matched.length) {
if (context.ignoreUnknownVersions) return [];
throw new BrowserslistError("Unknown version " + version + " of Node.js");
}
return [ "node " + matched[matched.length - 1] ];
}
function sinceQuery(context, year, month, date) {
return year = parseInt(year), month = parseInt(month || "01") - 1, date = parseInt(date || "01"), 
filterByYear(Date.UTC(year, month, date, 0, 0, 0), context);
}
function coverQuery(context, coverage, statMode) {
coverage = parseFloat(coverage);
var usage = browserslist.usage.global;
if (statMode) if (statMode.match(/^my\s+stats$/i)) {
if (!context.customUsage) throw new BrowserslistError("Custom usage statistics was not provided");
usage = context.customUsage;
} else {
var place;
place = 2 === statMode.length ? statMode.toUpperCase() : statMode.toLowerCase(), 
env.loadCountry(browserslist.usage, place, browserslist.data), usage = browserslist.usage[place];
}
for (var version, versions = Object.keys(usage).sort((function(a, b) {
return usage[b] - usage[a];
})), coveraged = 0, result = [], i = 0; i < versions.length && (version = versions[i], 
0 !== usage[version]) && (coveraged += usage[version], result.push(version), !(coveraged >= coverage)); i++) ;
return result;
}
browserslist.cache = {}, browserslist.data = {}, browserslist.usage = {
global: {},
custom: null
}, browserslist.defaults = [ "> 0.5%", "last 2 versions", "Firefox ESR", "not dead" ], 
browserslist.aliases = {
fx: "firefox",
ff: "firefox",
ios: "ios_saf",
explorer: "ie",
blackberry: "bb",
explorermobile: "ie_mob",
operamini: "op_mini",
operamobile: "op_mob",
chromeandroid: "and_chr",
firefoxandroid: "and_ff",
ucandroid: "and_uc",
qqandroid: "and_qq"
}, browserslist.desktopNames = {
and_chr: "chrome",
and_ff: "firefox",
ie_mob: "ie",
op_mob: "opera",
android: "chrome"
}, browserslist.versionAliases = {}, browserslist.clearCaches = env.clearCaches, 
browserslist.parseConfig = env.parseConfig, browserslist.readConfig = env.readConfig, 
browserslist.findConfig = env.findConfig, browserslist.loadConfig = env.loadConfig, 
browserslist.coverage = function(browsers, stats) {
var data;
if (void 0 === stats) data = browserslist.usage.global; else if ("my stats" === stats) {
var opts = {};
opts.path = path.resolve ? path.resolve(".") : ".";
var customStats = env.getStat(opts);
if (!customStats) throw new BrowserslistError("Custom usage statistics was not provided");
for (var browser in data = {}, customStats) fillUsage(data, browser, customStats[browser]);
} else if ("string" == typeof stats) stats = stats.length > 2 ? stats.toLowerCase() : stats.toUpperCase(), 
env.loadCountry(browserslist.usage, stats, browserslist.data), data = browserslist.usage[stats]; else for (var name in "dataByBrowser" in stats && (stats = stats.dataByBrowser), 
data = {}, stats) for (var version in stats[name]) data[name + " " + version] = stats[name][version];
return browsers.reduce((function(all, i) {
var usage = data[i];
return void 0 === usage && (usage = data[i.replace(/ \S+$/, " 0")]), all + (usage || 0);
}), 0);
};
var QUERIES = [ {
regexp: /^last\s+(\d+)\s+major\s+versions?$/i,
select: function(context, versions) {
return Object.keys(agents).reduce((function(selected, name) {
var data = byName(name, context);
if (!data) return selected;
var list = getMajorVersions(data.released, versions);
return list = list.map(nameMapper(data.name)), "android" === data.name && (list = filterAndroid(list, versions, context)), 
selected.concat(list);
}), []);
}
}, {
regexp: /^last\s+(\d+)\s+versions?$/i,
select: function(context, versions) {
return Object.keys(agents).reduce((function(selected, name) {
var data = byName(name, context);
if (!data) return selected;
var list = data.released.slice(-versions);
return list = list.map(nameMapper(data.name)), "android" === data.name && (list = filterAndroid(list, versions, context)), 
selected.concat(list);
}), []);
}
}, {
regexp: /^last\s+(\d+)\s+electron\s+major\s+versions?$/i,
select: function(context, versions) {
return getMajorVersions(Object.keys(e2c), versions).map((function(i) {
return "chrome " + e2c[i];
}));
}
}, {
regexp: /^last\s+(\d+)\s+node\s+major\s+versions?$/i,
select: function(context, versions) {
return getMajorVersions(browserslist.nodeVersions, versions).map((function(version) {
return "node " + version;
}));
}
}, {
regexp: /^last\s+(\d+)\s+(\w+)\s+major\s+versions?$/i,
select: function(context, versions, name) {
var data = checkName(name, context), list = getMajorVersions(data.released, versions).map(nameMapper(data.name));
return "android" === data.name && (list = filterAndroid(list, versions, context)), 
list;
}
}, {
regexp: /^last\s+(\d+)\s+electron\s+versions?$/i,
select: function(context, versions) {
return Object.keys(e2c).slice(-versions).map((function(i) {
return "chrome " + e2c[i];
}));
}
}, {
regexp: /^last\s+(\d+)\s+node\s+versions?$/i,
select: function(context, versions) {
return browserslist.nodeVersions.slice(-versions).map((function(version) {
return "node " + version;
}));
}
}, {
regexp: /^last\s+(\d+)\s+(\w+)\s+versions?$/i,
select: function(context, versions, name) {
var data = checkName(name, context), list = data.released.slice(-versions).map(nameMapper(data.name));
return "android" === data.name && (list = filterAndroid(list, versions, context)), 
list;
}
}, {
regexp: /^unreleased\s+versions$/i,
select: function(context) {
return Object.keys(agents).reduce((function(selected, name) {
var data = byName(name, context);
if (!data) return selected;
var list = data.versions.filter((function(v) {
return -1 === data.released.indexOf(v);
}));
return list = list.map(nameMapper(data.name)), selected.concat(list);
}), []);
}
}, {
regexp: /^unreleased\s+electron\s+versions?$/i,
select: function() {
return [];
}
}, {
regexp: /^unreleased\s+(\w+)\s+versions?$/i,
select: function(context, name) {
var data = checkName(name, context);
return data.versions.filter((function(v) {
return -1 === data.released.indexOf(v);
})).map(nameMapper(data.name));
}
}, {
regexp: /^last\s+(\d*.?\d+)\s+years?$/i,
select: function(context, years) {
return filterByYear(Date.now() - 31558432982.4 * years, context);
}
}, {
regexp: /^since (\d+)$/i,
select: sinceQuery
}, {
regexp: /^since (\d+)-(\d+)$/i,
select: sinceQuery
}, {
regexp: /^since (\d+)-(\d+)-(\d+)$/i,
select: sinceQuery
}, {
regexp: /^(>=?|<=?)\s*(\d+|\d+\.\d+|\.\d+)%$/,
select: function(context, sign, popularity) {
popularity = parseFloat(popularity);
var usage = browserslist.usage.global;
return Object.keys(usage).reduce((function(result, version) {
return ">" === sign ? usage[version] > popularity && result.push(version) : "<" === sign ? usage[version] < popularity && result.push(version) : "<=" === sign ? usage[version] <= popularity && result.push(version) : usage[version] >= popularity && result.push(version), 
result;
}), []);
}
}, {
regexp: /^(>=?|<=?)\s*(\d+|\d+\.\d+|\.\d+)%\s+in\s+my\s+stats$/,
select: function(context, sign, popularity) {
if (popularity = parseFloat(popularity), !context.customUsage) throw new BrowserslistError("Custom usage statistics was not provided");
var usage = context.customUsage;
return Object.keys(usage).reduce((function(result, version) {
var percentage = usage[version];
return null == percentage || (">" === sign ? percentage > popularity && result.push(version) : "<" === sign ? percentage < popularity && result.push(version) : "<=" === sign ? percentage <= popularity && result.push(version) : percentage >= popularity && result.push(version)), 
result;
}), []);
}
}, {
regexp: /^(>=?|<=?)\s*(\d+|\d+\.\d+|\.\d+)%\s+in\s+(\S+)\s+stats$/,
select: function(context, sign, popularity, name) {
popularity = parseFloat(popularity);
var stats = env.loadStat(context, name, browserslist.data);
if (stats) for (var browser in context.customUsage = {}, stats) fillUsage(context.customUsage, browser, stats[browser]);
if (!context.customUsage) throw new BrowserslistError("Custom usage statistics was not provided");
var usage = context.customUsage;
return Object.keys(usage).reduce((function(result, version) {
var percentage = usage[version];
return null == percentage || (">" === sign ? percentage > popularity && result.push(version) : "<" === sign ? percentage < popularity && result.push(version) : "<=" === sign ? percentage <= popularity && result.push(version) : percentage >= popularity && result.push(version)), 
result;
}), []);
}
}, {
regexp: /^(>=?|<=?)\s*(\d+|\d+\.\d+|\.\d+)%\s+in\s+((alt-)?\w\w)$/,
select: function(context, sign, popularity, place) {
popularity = parseFloat(popularity), place = 2 === place.length ? place.toUpperCase() : place.toLowerCase(), 
env.loadCountry(browserslist.usage, place, browserslist.data);
var usage = browserslist.usage[place];
return Object.keys(usage).reduce((function(result, version) {
var percentage = usage[version];
return null == percentage || (">" === sign ? percentage > popularity && result.push(version) : "<" === sign ? percentage < popularity && result.push(version) : "<=" === sign ? percentage <= popularity && result.push(version) : percentage >= popularity && result.push(version)), 
result;
}), []);
}
}, {
regexp: /^cover\s+(\d+|\d+\.\d+|\.\d+)%$/i,
select: coverQuery
}, {
regexp: /^cover\s+(\d+|\d+\.\d+|\.\d+)%\s+in\s+(my\s+stats|(alt-)?\w\w)$/i,
select: coverQuery
}, {
regexp: /^supports\s+([\w-]+)$/,
select: function(context, feature) {
env.loadFeature(browserslist.cache, feature);
var features = browserslist.cache[feature];
return Object.keys(features).reduce((function(result, version) {
var flags = features[version];
return (flags.indexOf("y") >= 0 || flags.indexOf("a") >= 0) && result.push(version), 
result;
}), []);
}
}, {
regexp: /^electron\s+([\d.]+)\s*-\s*([\d.]+)$/i,
select: function(context, from, to) {
var fromToUse = normalizeElectron(from), toToUse = normalizeElectron(to);
if (!e2c[fromToUse]) throw new BrowserslistError("Unknown version " + from + " of electron");
if (!e2c[toToUse]) throw new BrowserslistError("Unknown version " + to + " of electron");
return from = parseFloat(from), to = parseFloat(to), Object.keys(e2c).filter((function(i) {
var parsed = parseFloat(i);
return parsed >= from && parsed <= to;
})).map((function(i) {
return "chrome " + e2c[i];
}));
}
}, {
regexp: /^node\s+([\d.]+)\s*-\s*([\d.]+)$/i,
select: function(context, from, to) {
return browserslist.nodeVersions.filter(semverFilterLoose(">=", from)).filter(semverFilterLoose("<=", to)).map((function(v) {
return "node " + v;
}));
}
}, {
regexp: /^(\w+)\s+([\d.]+)\s*-\s*([\d.]+)$/i,
select: function(context, name, from, to) {
var data = checkName(name, context);
return from = parseFloat(normalizeVersion(data, from) || from), to = parseFloat(normalizeVersion(data, to) || to), 
data.released.filter((function(v) {
var parsed = parseFloat(v);
return parsed >= from && parsed <= to;
})).map(nameMapper(data.name));
}
}, {
regexp: /^electron\s*(>=?|<=?)\s*([\d.]+)$/i,
select: function(context, sign, version) {
var versionToUse = normalizeElectron(version);
return Object.keys(e2c).filter(generateFilter(sign, versionToUse)).map((function(i) {
return "chrome " + e2c[i];
}));
}
}, {
regexp: /^node\s*(>=?|<=?)\s*([\d.]+)$/i,
select: function(context, sign, version) {
return browserslist.nodeVersions.filter(function(sign, version) {
return (version = version.split(".").map(parseSimpleInt))[1] = version[1] || 0, 
version[2] = version[2] || 0, ">" === sign ? function(v) {
return compareSemver(v = v.split(".").map(parseSimpleInt), version) > 0;
} : ">=" === sign ? function(v) {
return compareSemver(v = v.split(".").map(parseSimpleInt), version) >= 0;
} : "<" === sign ? function(v) {
return v = v.split(".").map(parseSimpleInt), compareSemver(version, v) > 0;
} : function(v) {
return v = v.split(".").map(parseSimpleInt), compareSemver(version, v) >= 0;
};
}(sign, version)).map((function(v) {
return "node " + v;
}));
}
}, {
regexp: /^(\w+)\s*(>=?|<=?)\s*([\d.]+)$/,
select: function(context, name, sign, version) {
var data = checkName(name, context), alias = browserslist.versionAliases[data.name][version];
return alias && (version = alias), data.released.filter(generateFilter(sign, version)).map((function(v) {
return data.name + " " + v;
}));
}
}, {
regexp: /^(firefox|ff|fx)\s+esr$/i,
select: function() {
return [ "firefox 91" ];
}
}, {
regexp: /(operamini|op_mini)\s+all/i,
select: function() {
return [ "op_mini all" ];
}
}, {
regexp: /^electron\s+([\d.]+)$/i,
select: function(context, version) {
var versionToUse = normalizeElectron(version), chrome = e2c[versionToUse];
if (!chrome) throw new BrowserslistError("Unknown version " + version + " of electron");
return [ "chrome " + chrome ];
}
}, {
regexp: /^node\s+(\d+)$/i,
select: nodeQuery
}, {
regexp: /^node\s+(\d+\.\d+)$/i,
select: nodeQuery
}, {
regexp: /^node\s+(\d+\.\d+\.\d+)$/i,
select: nodeQuery
}, {
regexp: /^current\s+node$/i,
select: function(context) {
return [ env.currentNode(resolve, context) ];
}
}, {
regexp: /^maintained\s+node\s+versions$/i,
select: function(context) {
var now = Date.now();
return resolve(Object.keys(jsEOL).filter((function(key) {
return now < Date.parse(jsEOL[key].end) && now > Date.parse(jsEOL[key].start) && (version = key.slice(1), 
browserslist.nodeVersions.some((function(i) {
return isVersionsMatch(i, version);
})));
var version;
})).map((function(key) {
return "node " + key.slice(1);
})), context);
}
}, {
regexp: /^phantomjs\s+1.9$/i,
select: function() {
return [ "safari 5" ];
}
}, {
regexp: /^phantomjs\s+2.1$/i,
select: function() {
return [ "safari 6" ];
}
}, {
regexp: /^(\w+)\s+(tp|[\d.]+)$/i,
select: function(context, name, version) {
/^tp$/i.test(version) && (version = "TP");
var data = checkName(name, context), alias = normalizeVersion(data, version);
if (alias) version = alias; else {
if (!(alias = normalizeVersion(data, alias = -1 === version.indexOf(".") ? version + ".0" : version.replace(/\.0$/, "")))) {
if (context.ignoreUnknownVersions) return [];
throw new BrowserslistError("Unknown version " + version + " of " + name);
}
version = alias;
}
return [ data.name + " " + version ];
}
}, {
regexp: /^browserslist config$/i,
select: function(context) {
return browserslist(void 0, context);
}
}, {
regexp: /^extends (.+)$/i,
select: function(context, name) {
return resolve(env.loadQueries(context, name), context);
}
}, {
regexp: /^defaults$/i,
select: function(context) {
return resolve(browserslist.defaults, context);
}
}, {
regexp: /^dead$/i,
select: function(context) {
return resolve([ "Baidu >= 0", "ie <= 10", "ie_mob <= 11", "bb <= 10", "op_mob <= 12.1", "samsung 4" ], context);
}
}, {
regexp: /^(\w+)$/i,
select: function(context, name) {
throw byName(name, context) ? new BrowserslistError("Specify versions in Browserslist query for browser " + name) : unknownQuery(name);
}
} ];
!function() {
for (var name in agents) {
var browser = agents[name];
browserslist.data[name] = {
name,
versions: normalize(agents[name].versions),
released: normalize(agents[name].versions.slice(0, -3)),
releaseDate: agents[name].release_date
}, fillUsage(browserslist.usage.global, name, browser.usage_global), browserslist.versionAliases[name] = {};
for (var i = 0; i < browser.versions.length; i++) {
var full = browser.versions[i];
if (full && -1 !== full.indexOf("-")) for (var interval = full.split("-"), j = 0; j < interval.length; j++) browserslist.versionAliases[name][interval[j]] = full;
}
}
browserslist.versionAliases.op_mob[59] = "58", browserslist.nodeVersions = jsReleases.map((function(release) {
return release.version;
}));
}(), module.exports = browserslist;
},
66954: module => {
module.exports = {
A: {
A: {
J: .0131217,
D: .00621152,
E: .022212,
F: .059232,
A: .00556471,
B: .466452,
zB: .009298
},
B: "ms",
C: [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "zB", "J", "D", "E", "F", "A", "B", "", "", "" ],
E: "IE",
F: {
zB: 962323200,
J: 998870400,
D: 1161129600,
E: 1237420800,
F: 1300060800,
A: 1346716800,
B: 1381968e3
}
},
B: {
A: {
C: .003702,
K: .004267,
L: .004268,
G: .007404,
M: .003702,
N: .007404,
O: .022212,
P: 0,
Q: .004298,
R: .00944,
S: .004043,
T: .003702,
U: .003702,
V: .003801,
W: .007404,
X: .004318,
Y: .003702,
Z: .004118,
c: .003939,
d: .007404,
e: .004118,
f: .003939,
g: .003801,
h: .007404,
i: .007404,
j: .007404,
k: .011106,
l: .014808,
a: .066636,
m: .12957,
H: 3.72421
},
B: "webkit",
C: [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "C", "K", "L", "G", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "a", "m", "H", "", "", "" ],
E: "Edge",
F: {
C: 1438128e3,
K: 1447286400,
L: 1470096e3,
G: 1491868800,
M: 1508198400,
N: 1525046400,
O: 1542067200,
P: 1579046400,
Q: 1581033600,
R: 1586736e3,
S: 1590019200,
T: 1594857600,
U: 1598486400,
V: 1602201600,
W: 1605830400,
X: 161136e4,
Y: 1614816e3,
Z: 1618358400,
c: 1622073600,
d: 1626912e3,
e: 1630627200,
f: 1632441600,
g: 1634774400,
h: 1637539200,
i: 1641427200,
j: 1643932800,
k: 1646265600,
l: 1649635200,
a: 1651190400,
m: 1653955200,
H: 1655942400
},
D: {
C: "ms",
K: "ms",
L: "ms",
G: "ms",
M: "ms",
N: "ms",
O: "ms"
}
},
C: {
A: {
0: .008928,
1: .004471,
2: .009284,
3: .004707,
4: .009076,
5: .007404,
6: .004783,
7: .004271,
8: .004783,
9: .00487,
"0B": .004118,
mB: .004271,
I: .01851,
n: .004879,
J: .020136,
D: .005725,
E: .004525,
F: .00533,
A: .004283,
B: .007404,
C: .004471,
K: .004486,
L: .00453,
G: .008322,
M: .004417,
N: .004425,
O: .004161,
o: .004443,
p: .004283,
q: .008322,
r: .013698,
s: .004161,
t: .008786,
u: .004118,
v: .004317,
w: .004393,
x: .004418,
y: .008834,
z: .008322,
AB: .005029,
BB: .0047,
CB: .09255,
DB: .007404,
EB: .003867,
FB: .004525,
GB: .004293,
HB: .003702,
IB: .004538,
JB: .008282,
KB: .011601,
LB: .059232,
MB: .011601,
NB: .007602,
OB: .003801,
PB: .007404,
QB: .011601,
RB: .003939,
nB: .003702,
SB: .003801,
oB: .004356,
TB: .004425,
UB: .008322,
b: .00415,
VB: .004267,
WB: .003801,
XB: .004267,
YB: .007404,
ZB: .00415,
aB: .004293,
bB: .004425,
cB: .003702,
dB: .00415,
eB: .00415,
fB: .004318,
gB: .004356,
hB: .003702,
iB: .03702,
P: .003702,
Q: .003702,
R: .014808,
pB: .003702,
S: .003702,
T: .003702,
U: .004268,
V: .003801,
W: .007404,
X: .011106,
Y: .007404,
Z: .007404,
c: .085146,
d: .003801,
e: .003702,
f: .022212,
g: .011106,
h: .007404,
i: .007404,
j: .007404,
k: .022212,
l: .029616,
a: .12957,
m: 2.01019,
H: .248034,
qB: 0,
rB: 0,
"1B": .008786,
"2B": .00487
},
B: "moz",
C: [ "0B", "mB", "1B", "2B", "I", "n", "J", "D", "E", "F", "A", "B", "C", "K", "L", "G", "M", "N", "O", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "AB", "BB", "CB", "DB", "EB", "FB", "GB", "HB", "IB", "JB", "KB", "LB", "MB", "NB", "OB", "PB", "QB", "RB", "nB", "SB", "oB", "TB", "UB", "b", "VB", "WB", "XB", "YB", "ZB", "aB", "bB", "cB", "dB", "eB", "fB", "gB", "hB", "iB", "P", "Q", "R", "pB", "S", "T", "U", "V", "W", "X", "Y", "Z", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "a", "m", "H", "qB", "rB", "" ],
E: "Firefox",
F: {
0: 1405987200,
1: 1409616e3,
2: 1413244800,
3: 1417392e3,
4: 1421107200,
5: 1424736e3,
6: 1428278400,
7: 1431475200,
8: 1435881600,
9: 1439251200,
"0B": 1161648e3,
mB: 1213660800,
"1B": 124632e4,
"2B": 1264032e3,
I: 1300752e3,
n: 1308614400,
J: 1313452800,
D: 1317081600,
E: 1317081600,
F: 1320710400,
A: 1324339200,
B: 1327968e3,
C: 1331596800,
K: 1335225600,
L: 1338854400,
G: 1342483200,
M: 1346112e3,
N: 1349740800,
O: 1353628800,
o: 1357603200,
p: 1361232e3,
q: 1364860800,
r: 1368489600,
s: 1372118400,
t: 1375747200,
u: 1379376e3,
v: 1386633600,
w: 1391472e3,
x: 1395100800,
y: 1398729600,
z: 1402358400,
AB: 144288e4,
BB: 1446508800,
CB: 1450137600,
DB: 1453852800,
EB: 1457395200,
FB: 1461628800,
GB: 1465257600,
HB: 1470096e3,
IB: 1474329600,
JB: 1479168e3,
KB: 1485216e3,
LB: 1488844800,
MB: 149256e4,
NB: 1497312e3,
OB: 1502150400,
PB: 1506556800,
QB: 1510617600,
RB: 1516665600,
nB: 1520985600,
SB: 1525824e3,
oB: 1529971200,
TB: 1536105600,
UB: 1540252800,
b: 1544486400,
VB: 154872e4,
WB: 1552953600,
XB: 1558396800,
YB: 1562630400,
ZB: 1567468800,
aB: 1571788800,
bB: 1575331200,
cB: 1578355200,
dB: 1581379200,
eB: 1583798400,
fB: 1586304e3,
gB: 1588636800,
hB: 1591056e3,
iB: 1593475200,
P: 1595894400,
Q: 1598313600,
R: 1600732800,
pB: 1603152e3,
S: 1605571200,
T: 1607990400,
U: 1611619200,
V: 1614038400,
W: 1616457600,
X: 1618790400,
Y: 1622505600,
Z: 1626134400,
c: 1628553600,
d: 1630972800,
e: 1633392e3,
f: 1635811200,
g: 1638835200,
h: 1641859200,
i: 1644364800,
j: 1646697600,
k: 1649116800,
l: 1651536e3,
a: 1653955200,
m: 1656374400,
H: 1658793600,
qB: null,
rB: null
}
},
D: {
A: {
0: .008596,
1: .004566,
2: .004118,
3: .007404,
4: .003702,
5: .004335,
6: .004464,
7: .01851,
8: .003867,
9: .014808,
I: .004706,
n: .004879,
J: .004879,
D: .005591,
E: .005591,
F: .005591,
A: .004534,
B: .004464,
C: .010424,
K: .0083,
L: .004706,
G: .015087,
M: .004393,
N: .004393,
O: .008652,
o: .008322,
p: .004393,
q: .004317,
r: .007404,
s: .008786,
t: .003939,
u: .004461,
v: .004141,
w: .004326,
x: .0047,
y: .004538,
z: .008322,
AB: .003702,
BB: .007734,
CB: .003702,
DB: .003867,
EB: .003867,
FB: .003867,
GB: .011106,
HB: .01851,
IB: .051828,
JB: .003867,
KB: .003801,
LB: .007404,
MB: .011106,
NB: .003867,
OB: .003702,
PB: .033318,
QB: .003702,
RB: .003702,
nB: .003702,
SB: .011106,
oB: .011106,
TB: .007404,
UB: .011106,
b: .003702,
VB: .011106,
WB: .025914,
XB: .011106,
YB: .007404,
ZB: .066636,
aB: .033318,
bB: .014808,
cB: .022212,
dB: .007404,
eB: .040722,
fB: .048126,
gB: .05553,
hB: .014808,
iB: .033318,
P: .173994,
Q: .051828,
R: .03702,
S: .096252,
T: .044424,
U: .07404,
V: .066636,
W: .085146,
X: .022212,
Y: .044424,
Z: .029616,
c: .059232,
d: .059232,
e: .044424,
f: .048126,
g: .029616,
h: .085146,
i: .088848,
j: .103656,
k: .103656,
l: .16659,
a: .25914,
m: 1.23647,
H: 18.8913,
qB: .022212,
rB: .01851,
"3B": .007404,
"4B": 0
},
B: "webkit",
C: [ "", "", "", "", "I", "n", "J", "D", "E", "F", "A", "B", "C", "K", "L", "G", "M", "N", "O", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "AB", "BB", "CB", "DB", "EB", "FB", "GB", "HB", "IB", "JB", "KB", "LB", "MB", "NB", "OB", "PB", "QB", "RB", "nB", "SB", "oB", "TB", "UB", "b", "VB", "WB", "XB", "YB", "ZB", "aB", "bB", "cB", "dB", "eB", "fB", "gB", "hB", "iB", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "a", "m", "H", "qB", "rB", "3B", "4B" ],
E: "Chrome",
F: {
0: 1384214400,
1: 1389657600,
2: 1392940800,
3: 1397001600,
4: 1400544e3,
5: 1405468800,
6: 1409011200,
7: 141264e4,
8: 1416268800,
9: 1421798400,
I: 1264377600,
n: 1274745600,
J: 1283385600,
D: 1287619200,
E: 1291248e3,
F: 1296777600,
A: 1299542400,
B: 1303862400,
C: 1307404800,
K: 1312243200,
L: 1316131200,
G: 1316131200,
M: 1319500800,
N: 1323734400,
O: 1328659200,
o: 1332892800,
p: 133704e4,
q: 1340668800,
r: 1343692800,
s: 1348531200,
t: 1352246400,
u: 1357862400,
v: 1361404800,
w: 1364428800,
x: 1369094400,
y: 1374105600,
z: 1376956800,
AB: 1425513600,
BB: 1429401600,
CB: 143208e4,
DB: 1437523200,
EB: 1441152e3,
FB: 1444780800,
GB: 1449014400,
HB: 1453248e3,
IB: 1456963200,
JB: 1460592e3,
KB: 1464134400,
LB: 1469059200,
MB: 1472601600,
NB: 1476230400,
OB: 1480550400,
PB: 1485302400,
QB: 1489017600,
RB: 149256e4,
nB: 1496707200,
SB: 1500940800,
oB: 1504569600,
TB: 1508198400,
UB: 1512518400,
b: 1516752e3,
VB: 1520294400,
WB: 1523923200,
XB: 1527552e3,
YB: 1532390400,
ZB: 1536019200,
aB: 1539648e3,
bB: 1543968e3,
cB: 154872e4,
dB: 1552348800,
eB: 1555977600,
fB: 1559606400,
gB: 1564444800,
hB: 1568073600,
iB: 1571702400,
P: 1575936e3,
Q: 1580860800,
R: 1586304e3,
S: 1589846400,
T: 1594684800,
U: 1598313600,
V: 1601942400,
W: 1605571200,
X: 1611014400,
Y: 1614556800,
Z: 1618272e3,
c: 1621987200,
d: 1626739200,
e: 1630368e3,
f: 1632268800,
g: 1634601600,
h: 1637020800,
i: 1641340800,
j: 1643673600,
k: 1646092800,
l: 1648512e3,
a: 1650931200,
m: 1653350400,
H: 1655769600,
qB: 1659398400,
rB: null,
"3B": null,
"4B": null
}
},
E: {
A: {
I: 0,
n: .008322,
J: .004656,
D: .004465,
E: .004356,
F: .004891,
A: .004425,
B: .004318,
C: .003801,
K: .029616,
L: .125868,
G: .03702,
"5B": 0,
sB: .008692,
"6B": .007404,
"7B": .00456,
"8B": .004283,
"9B": .014808,
tB: .007404,
jB: .022212,
kB: .040722,
AC: .251736,
BC: .359094,
CC: .066636,
uB: .066636,
vB: .251736,
wB: 1.77696,
DC: .077742,
lB: .011106,
EC: 0
},
B: "webkit",
C: [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "5B", "sB", "I", "n", "6B", "J", "7B", "D", "8B", "E", "F", "9B", "A", "tB", "B", "jB", "C", "kB", "K", "AC", "L", "BC", "G", "CC", "uB", "vB", "wB", "DC", "lB", "EC", "" ],
E: "Safari",
F: {
"5B": 1205798400,
sB: 1226534400,
I: 1244419200,
n: 1275868800,
"6B": 131112e4,
J: 1343174400,
"7B": 13824e5,
D: 13824e5,
"8B": 1410998400,
E: 1413417600,
F: 1443657600,
"9B": 1458518400,
A: 1474329600,
tB: 1490572800,
B: 1505779200,
jB: 1522281600,
C: 1537142400,
kB: 1553472e3,
K: 1568851200,
AC: 1585008e3,
L: 1600214400,
BC: 1619395200,
G: 1632096e3,
CC: 1635292800,
uB: 1639353600,
vB: 1647216e3,
wB: 1652745600,
DC: 1658275200,
lB: null,
EC: null
}
},
F: {
A: {
0: .003702,
1: .005152,
2: .005014,
3: .009758,
4: .004879,
5: .003702,
6: .004283,
7: .004367,
8: .004534,
9: .007404,
F: .0082,
B: .016581,
C: .004317,
G: .00685,
M: .00685,
N: .00685,
O: .005014,
o: .006015,
p: .004879,
q: .006597,
r: .006597,
s: .013434,
t: .006702,
u: .006015,
v: .005595,
w: .004393,
x: .007404,
y: .004879,
z: .004879,
AB: .004227,
BB: .004418,
CB: .004161,
DB: .004227,
EB: .004725,
FB: .011106,
GB: .008942,
HB: .004707,
IB: .004827,
JB: .004707,
KB: .004707,
LB: .004326,
MB: .008922,
NB: .014349,
OB: .004425,
PB: .00472,
QB: .004425,
RB: .004425,
SB: .00472,
TB: .004532,
UB: .004566,
b: .02283,
VB: .00867,
WB: .004656,
XB: .004642,
YB: .003867,
ZB: .00944,
aB: .004293,
bB: .003867,
cB: .004298,
dB: .096692,
eB: .004201,
fB: .004141,
gB: .004257,
hB: .003939,
iB: .008236,
P: .003702,
Q: .003939,
R: .008514,
pB: .003939,
S: .003939,
T: .003702,
U: .025914,
V: .011106,
W: .029616,
X: .681168,
Y: .266544,
Z: 0,
FC: .00685,
GC: 0,
HC: .008392,
IC: .004706,
jB: .006229,
xB: .004879,
JC: .008786,
kB: .00472
},
B: "webkit",
C: [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "F", "FC", "GC", "HC", "IC", "B", "jB", "xB", "JC", "C", "kB", "G", "M", "N", "O", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "AB", "BB", "CB", "DB", "EB", "FB", "GB", "HB", "IB", "JB", "KB", "LB", "MB", "NB", "OB", "PB", "QB", "RB", "SB", "TB", "UB", "b", "VB", "WB", "XB", "YB", "ZB", "aB", "bB", "cB", "dB", "eB", "fB", "gB", "hB", "iB", "P", "Q", "R", "pB", "S", "T", "U", "V", "W", "X", "Y", "Z", "", "" ],
E: "Opera",
F: {
0: 1438646400,
1: 1442448e3,
2: 1445904e3,
3: 1449100800,
4: 1454371200,
5: 1457308800,
6: 146232e4,
7: 1465344e3,
8: 1470096e3,
9: 1474329600,
F: 1150761600,
FC: 1223424e3,
GC: 1251763200,
HC: 1267488e3,
IC: 1277942400,
B: 1292457600,
jB: 1302566400,
xB: 1309219200,
JC: 1323129600,
C: 1323129600,
kB: 1352073600,
G: 1372723200,
M: 1377561600,
N: 1381104e3,
O: 1386288e3,
o: 1390867200,
p: 1393891200,
q: 1399334400,
r: 1401753600,
s: 1405987200,
t: 1409616e3,
u: 1413331200,
v: 1417132800,
w: 1422316800,
x: 1425945600,
y: 1430179200,
z: 1433808e3,
AB: 1477267200,
BB: 1481587200,
CB: 1486425600,
DB: 1490054400,
EB: 1494374400,
FB: 1498003200,
GB: 1502236800,
HB: 1506470400,
IB: 1510099200,
JB: 1515024e3,
KB: 1517961600,
LB: 1521676800,
MB: 1525910400,
NB: 1530144e3,
OB: 1534982400,
PB: 1537833600,
QB: 1543363200,
RB: 1548201600,
SB: 1554768e3,
TB: 1561593600,
UB: 1566259200,
b: 1570406400,
VB: 1573689600,
WB: 1578441600,
XB: 1583971200,
YB: 1587513600,
ZB: 1592956800,
aB: 1595894400,
bB: 1600128e3,
cB: 1603238400,
dB: 161352e4,
eB: 1612224e3,
fB: 1616544e3,
gB: 1619568e3,
hB: 1623715200,
iB: 1627948800,
P: 1631577600,
Q: 1633392e3,
R: 1635984e3,
pB: 1638403200,
S: 1642550400,
T: 1644969600,
U: 1647993600,
V: 1650412800,
W: 1652745600,
X: 1654646400,
Y: 1657152e3,
Z: null
},
D: {
F: "o",
B: "o",
C: "o",
FC: "o",
GC: "o",
HC: "o",
IC: "o",
jB: "o",
xB: "o",
JC: "o",
kB: "o"
}
},
G: {
A: {
E: 0,
sB: 0,
KC: 0,
yB: .00311971,
LC: .00467956,
MC: .00467956,
NC: .0140387,
OC: .00623942,
PC: .0187183,
QC: .074873,
RC: .00779927,
SC: .0873518,
TC: .0421161,
UC: .0311971,
VC: .0296372,
WC: .547509,
XC: .0233978,
YC: .0124788,
ZC: .0545949,
aC: .180943,
bC: .508512,
cC: 1.15273,
dC: .355647,
uB: .608343,
vB: 1.01079,
wB: 10.4105,
lB: .0701934
},
B: "webkit",
C: [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "sB", "KC", "yB", "LC", "MC", "NC", "E", "OC", "PC", "QC", "RC", "SC", "TC", "UC", "VC", "WC", "XC", "YC", "ZC", "aC", "bC", "cC", "dC", "uB", "vB", "wB", "lB", "", "" ],
E: "Safari on iOS",
F: {
sB: 1270252800,
KC: 1283904e3,
yB: 1299628800,
LC: 1331078400,
MC: 1359331200,
NC: 1394409600,
E: 1410912e3,
OC: 1413763200,
PC: 1442361600,
QC: 1458518400,
RC: 1473724800,
SC: 1490572800,
TC: 1505779200,
UC: 1522281600,
VC: 1537142400,
WC: 1553472e3,
XC: 1568851200,
YC: 1572220800,
ZC: 1580169600,
aC: 1585008e3,
bC: 1600214400,
cC: 1619395200,
dC: 1632096e3,
uB: 1639353600,
vB: 1647216e3,
wB: 1652659200,
lB: null
}
},
H: {
A: {
eC: .954006
},
B: "o",
C: [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "eC", "", "", "" ],
E: "Opera Mini",
F: {
eC: 1426464e3
}
},
I: {
A: {
mB: 0,
I: .0241567,
H: 0,
fC: 0,
gC: 0,
hC: 0,
iC: .0362351,
yB: .066431,
jC: 0,
kC: .314037
},
B: "webkit",
C: [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "fC", "gC", "hC", "mB", "I", "iC", "yB", "jC", "kC", "H", "", "", "" ],
E: "Android Browser",
F: {
fC: 1256515200,
gC: 1274313600,
hC: 1291593600,
mB: 1298332800,
I: 1318896e3,
iC: 1341792e3,
yB: 1374624e3,
jC: 1386547200,
kC: 1401667200,
H: 1655856e3
}
},
J: {
A: {
D: 0,
A: 0
},
B: "webkit",
C: [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "D", "A", "", "", "" ],
E: "Blackberry Browser",
F: {
D: 1325376e3,
A: 1359504e3
}
},
K: {
A: {
A: 0,
B: 0,
C: 0,
b: .0111391,
jB: 0,
xB: 0,
kB: 0
},
B: "o",
C: [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "A", "B", "jB", "xB", "C", "kB", "b", "", "", "" ],
E: "Opera Mobile",
F: {
A: 1287100800,
B: 1300752e3,
jB: 1314835200,
xB: 1318291200,
C: 1330300800,
kB: 1349740800,
b: 1613433600
},
D: {
b: "webkit"
}
},
L: {
A: {
H: 42.8703
},
B: "webkit",
C: [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "H", "", "", "" ],
E: "Chrome for Android",
F: {
H: 1655769600
}
},
M: {
A: {
a: .3149
},
B: "moz",
C: [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "a", "", "", "" ],
E: "Firefox for Android",
F: {
a: 1653955200
}
},
N: {
A: {
A: .0115934,
B: .022664
},
B: "ms",
C: [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "A", "B", "", "", "" ],
E: "IE Mobile",
F: {
A: 1340150400,
B: 1353456e3
}
},
O: {
A: {
lC: 1.01398
},
B: "webkit",
C: [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "lC", "", "", "" ],
E: "UC Browser for Android",
F: {
lC: 1471392e3
},
D: {
lC: "webkit"
}
},
P: {
A: {
I: .20822,
mC: .0103543,
nC: .010304,
oC: .0728769,
pC: .0103584,
qC: .010411,
tB: .0105043,
rC: .0416439,
sC: .020822,
tC: .0832878,
uC: .0728769,
vC: .0832878,
lB: .166576,
wC: 2.30083
},
B: "webkit",
C: [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "I", "mC", "nC", "oC", "pC", "qC", "tB", "rC", "sC", "tC", "uC", "vC", "lB", "wC", "", "", "" ],
E: "Samsung Internet",
F: {
I: 1461024e3,
mC: 1481846400,
nC: 1509408e3,
oC: 1528329600,
pC: 1546128e3,
qC: 1554163200,
tB: 1567900800,
rC: 1582588800,
sC: 1593475200,
tC: 1605657600,
uC: 1618531200,
vC: 1629072e3,
lB: 1640736e3,
wC: 1651708800
}
},
Q: {
A: {
xC: .239324
},
B: "webkit",
C: [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "xC", "", "", "" ],
E: "QQ Browser",
F: {
xC: 1589846400
}
},
R: {
A: {
yC: 0
},
B: "webkit",
C: [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "yC", "", "", "" ],
E: "Baidu Browser",
F: {
yC: 1491004800
}
},
S: {
A: {
zC: .03149
},
B: "moz",
C: [ "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "zC", "", "", "" ],
E: "KaiOS Browser",
F: {
zC: 1527811200
}
}
};
},
6974: module => {
module.exports = {
0: "31",
1: "32",
2: "33",
3: "34",
4: "35",
5: "36",
6: "37",
7: "38",
8: "39",
9: "40",
A: "10",
B: "11",
C: "12",
D: "7",
E: "8",
F: "9",
G: "15",
H: "103",
I: "4",
J: "6",
K: "13",
L: "14",
M: "16",
N: "17",
O: "18",
P: "79",
Q: "80",
R: "81",
S: "83",
T: "84",
U: "85",
V: "86",
W: "87",
X: "88",
Y: "89",
Z: "90",
a: "101",
b: "64",
c: "91",
d: "92",
e: "93",
f: "94",
g: "95",
h: "96",
i: "97",
j: "98",
k: "99",
l: "100",
m: "102",
n: "5",
o: "19",
p: "20",
q: "21",
r: "22",
s: "23",
t: "24",
u: "25",
v: "26",
w: "27",
x: "28",
y: "29",
z: "30",
AB: "41",
BB: "42",
CB: "43",
DB: "44",
EB: "45",
FB: "46",
GB: "47",
HB: "48",
IB: "49",
JB: "50",
KB: "51",
LB: "52",
MB: "53",
NB: "54",
OB: "55",
PB: "56",
QB: "57",
RB: "58",
SB: "60",
TB: "62",
UB: "63",
VB: "65",
WB: "66",
XB: "67",
YB: "68",
ZB: "69",
aB: "70",
bB: "71",
cB: "72",
dB: "73",
eB: "74",
fB: "75",
gB: "76",
hB: "77",
iB: "78",
jB: "11.1",
kB: "12.1",
lB: "16.0",
mB: "3",
nB: "59",
oB: "61",
pB: "82",
qB: "104",
rB: "105",
sB: "3.2",
tB: "10.1",
uB: "15.2-15.3",
vB: "15.4",
wB: "15.5",
xB: "11.5",
yB: "4.2-4.3",
zB: "5.5",
"0B": "2",
"1B": "3.5",
"2B": "3.6",
"3B": "106",
"4B": "107",
"5B": "3.1",
"6B": "5.1",
"7B": "6.1",
"8B": "7.1",
"9B": "9.1",
AC: "13.1",
BC: "14.1",
CC: "15.1",
DC: "15.6",
EC: "TP",
FC: "9.5-9.6",
GC: "10.0-10.1",
HC: "10.5",
IC: "10.6",
JC: "11.6",
KC: "4.0-4.1",
LC: "5.0-5.1",
MC: "6.0-6.1",
NC: "7.0-7.1",
OC: "8.1-8.4",
PC: "9.0-9.2",
QC: "9.3",
RC: "10.0-10.2",
SC: "10.3",
TC: "11.0-11.2",
UC: "11.3-11.4",
VC: "12.0-12.1",
WC: "12.2-12.5",
XC: "13.0-13.1",
YC: "13.2",
ZC: "13.3",
aC: "13.4-13.7",
bC: "14.0-14.4",
cC: "14.5-14.8",
dC: "15.0-15.1",
eC: "all",
fC: "2.1",
gC: "2.2",
hC: "2.3",
iC: "4.1",
jC: "4.4",
kC: "4.4.3-4.4.4",
lC: "12.12",
mC: "5.0-5.4",
nC: "6.2-6.4",
oC: "7.2-7.4",
pC: "8.2",
qC: "9.2",
rC: "11.1-11.2",
sC: "12.0",
tC: "13.0",
uC: "14.0",
vC: "15.0",
wC: "17.0",
xC: "10.4",
yC: "7.12",
zC: "2.5"
};
},
12757: module => {
module.exports = {
A: "ie",
B: "edge",
C: "firefox",
D: "chrome",
E: "safari",
F: "opera",
G: "ios_saf",
H: "op_mini",
I: "android",
J: "bb",
K: "op_mob",
L: "and_chr",
M: "and_ff",
N: "ie_mob",
O: "and_uc",
P: "samsung",
Q: "and_qq",
R: "baidu",
S: "kaios"
};
},
67015: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0B mB I n J D E F A B C K L G M N O o p q 1B 2B",
132: "0 1 2 3 4 5 6 7 8 9 r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F",
16: "A B"
},
E: {
1: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB"
},
H: {
2: "eC"
},
I: {
1: "mB I H iC yB jC kC",
2: "fC gC hC"
},
J: {
1: "A",
2: "D"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
132: "a"
},
N: {
1: "A",
2: "B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
132: "zC"
}
},
B: 6,
C: "AAC audio file format"
};
},
36414: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G"
},
C: {
1: "QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB 1B 2B"
},
D: {
1: "WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB"
},
E: {
1: "K L G kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A B 5B sB 6B 7B 8B 9B tB",
130: "C jB"
},
F: {
1: "MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB FC GC HC IC jB xB JC kB"
},
G: {
1: "UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "qC tB rC sC tC uC vC lB wC",
2: "I mC nC oC pC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 1,
C: "AbortController & AbortSignal"
};
},
70426: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "C K L G M N O",
2: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC",
132: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D",
132: "A"
},
K: {
2: "A B C b jB xB",
132: "kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
132: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "AC-3 (Dolby Digital) and EC-3 (Dolby Digital Plus) codecs"
};
},
41304: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB",
194: "RB nB SB oB TB UB b VB WB"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 4,
C: "Accelerometer"
};
},
57733: module => {
module.exports = {
A: {
A: {
1: "F A B",
130: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
257: "0B mB I n J 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "EventTarget.addEventListener()"
};
},
86768: module => {
module.exports = {
A: {
A: {
1: "E F A B",
2: "J D zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "F B C FC GC HC IC jB xB JC kB",
16: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
16: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
16: "D A"
},
K: {
2: "b",
16: "A B C jB xB kB"
},
L: {
16: "H"
},
M: {
16: "a"
},
N: {
16: "A B"
},
O: {
16: "lC"
},
P: {
16: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
16: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Alternate stylesheet"
};
},
89380: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K",
132: "L G M N O",
322: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0B mB I n J D E F A B C K L G M N O o p q 1B 2B",
132: "0 1 2 3 4 5 6 7 8 9 r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB",
194: "SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB",
322: "RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB FC GC HC IC jB xB JC kB",
322: "dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
132: "zC"
}
},
B: 4,
C: "Ambient Light Sensor"
};
},
97098: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
2: "0B"
},
D: {
1: "nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB"
},
E: {
1: "E F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D 5B sB 6B 7B 8B"
},
F: {
1: "B C FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
2: "0 1 2 3 4 5 6 7 8 9 F G M N O o p q r s t u v w x y z AB BB CB DB EB"
},
G: {
1: "E OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC NC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "oC pC qC tB rC sC tC uC vC lB wC",
2: "I mC nC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 7,
C: "Animated PNG (APNG)"
};
},
1435: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t 1B 2B"
},
D: {
1: "EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB"
},
E: {
1: "E F A B C K L G 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D 5B sB 6B 7B"
},
F: {
1: "1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB"
},
G: {
1: "E OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC NC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D",
16: "A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "Array.prototype.findIndex"
};
},
81672: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
16: "C K L"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t 1B 2B"
},
D: {
1: "EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB"
},
E: {
1: "E F A B C K L G 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D 5B sB 6B 7B"
},
F: {
1: "1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB"
},
G: {
1: "E OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC NC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D",
16: "A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "Array.prototype.find"
};
},
95439: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB 1B 2B"
},
D: {
1: "ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB"
},
E: {
1: "C K L G kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A B 5B sB 6B 7B 8B 9B tB jB"
},
F: {
1: "PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB FC GC HC IC jB xB JC kB"
},
G: {
1: "VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "tB rC sC tC uC vC lB wC",
2: "I mC nC oC pC qC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "flat & flatMap array methods"
};
},
58867: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K"
},
C: {
1: "CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB 1B 2B"
},
D: {
1: "GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB"
},
E: {
1: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E 5B sB 6B 7B 8B"
},
F: {
1: "3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB"
},
G: {
1: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "Array.prototype.includes"
};
},
36562: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q 1B 2B"
},
D: {
1: "EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B 9B"
},
F: {
1: "1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "Arrow functions"
};
},
10627: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "K L G M N O",
132: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
322: "C"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q 1B 2B"
},
D: {
2: "I n J D E F A B C K L G M N O o p q r s t u v w",
132: "0 1 2 3 4 5 6 7 8 9 x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "F B C FC GC HC IC jB xB JC kB",
132: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I fC gC hC iC yB jC kC",
132: "H"
},
J: {
2: "D A"
},
K: {
2: "A B C jB xB kB",
132: "b"
},
L: {
132: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I",
132: "mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
132: "xC"
},
R: {
132: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "asm.js"
};
},
23480: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB 1B 2B",
132: "UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
1: "TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB",
66: "RB nB SB oB"
},
E: {
1: "L G AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A B C K 5B sB 6B 7B 8B 9B tB jB kB"
},
F: {
1: "IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC",
260: "bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I fC gC hC iC yB jC kC",
260: "H"
},
J: {
2: "D A"
},
K: {
2: "A B C jB xB kB",
260: "b"
},
L: {
1: "H"
},
M: {
132: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC",
260: "qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "Asynchronous Clipboard API"
};
},
48079: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K",
194: "L"
},
C: {
1: "LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB 1B 2B"
},
D: {
1: "OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB"
},
E: {
1: "B C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B",
514: "tB"
},
F: {
1: "BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB FC GC HC IC jB xB JC kB"
},
G: {
1: "TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC",
514: "SC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I mC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "Async functions"
};
},
98137: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z IC jB xB JC kB",
2: "F FC GC",
16: "HC"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "B C b jB xB kB",
16: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Base64 encoding and decoding"
};
},
94546: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t 1B 2B"
},
D: {
1: "3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K",
33: "0 1 2 L G M N O o p q r s t u v w x y z"
},
E: {
1: "G BC CC uB vB wB DC lB EC",
2: "I n 5B sB 6B",
33: "J D E F A B C K L 7B 8B 9B tB jB kB AC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB",
33: "G M N O o p q"
},
G: {
1: "cC dC uB vB wB lB",
2: "sB KC yB LC",
33: "E MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "Web Audio API"
};
},
46141: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB",
132: "I n J D E F A B C K L G M N O o 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z HC IC jB xB JC kB",
2: "F",
4: "FC GC"
},
G: {
1: "E KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB"
},
H: {
2: "eC"
},
I: {
1: "mB I H hC iC yB jC kC",
2: "fC gC"
},
J: {
1: "D A"
},
K: {
1: "B C b jB xB kB",
2: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Audio element"
};
},
24330: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O",
322: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B",
194: "2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB",
322: "EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J 5B sB 6B"
},
F: {
2: "0 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
322: "1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
322: "H"
},
M: {
2: "a"
},
N: {
1: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
194: "zC"
}
},
B: 1,
C: "Audio Tracks"
};
},
35316: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I"
},
E: {
1: "n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
2: "F"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "mB I H iC yB jC kC",
2: "fC gC hC"
},
J: {
1: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
2: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 1,
C: "Autofocus attribute"
};
},
6433: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB 1B 2B",
129: "MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
1: "OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "Auxclick"
};
},
19739: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N",
194: "O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB 1B 2B",
66: "OB PB QB RB nB SB oB TB UB b",
260: "VB",
516: "WB"
},
D: {
1: "aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB",
66: "XB YB ZB"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1090: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "sC tC uC vC lB wC",
2: "I mC nC oC pC qC tB rC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "AV1 video format"
};
},
8514: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB 1B 2B",
194: "hB iB P Q R pB S T U V W X Y Z c d",
257: "e f g h i j k l a m H qB rB"
},
D: {
1: "U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC",
516: "lB EC"
},
F: {
1: "bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB FC GC HC IC jB xB JC kB"
},
G: {
1: "lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "uC vC lB wC",
2: "I mC nC oC pC qC tB rC sC tC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "AVIF image format"
};
},
4576: module => {
module.exports = {
A: {
A: {
1: "F A B",
132: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
132: "0B mB I n J D E F A B C K L G M N O o p q r s t 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "n J D E F A B C 6B 7B 8B 9B tB jB kB",
132: "I K 5B sB AC",
2050: "L G BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z HC IC jB xB JC kB",
132: "F FC GC"
},
G: {
2: "sB KC yB",
772: "E LC MC NC OC PC QC RC SC TC UC VC WC",
2050: "XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC jC kC",
132: "iC yB"
},
J: {
260: "D A"
},
K: {
1: "B C jB xB kB",
2: "b",
132: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
2: "I",
1028: "mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1028: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS background-attachment"
};
},
49631: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "G M N O",
33: "C K L P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB 1B 2B"
},
D: {
33: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "L G BC CC uB vB wB DC lB EC",
16: "5B sB",
33: "I n J D E F A B C K 6B 7B 8B 9B tB jB kB AC"
},
F: {
2: "F B C FC GC HC IC jB xB JC kB",
33: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
1: "bC cC dC uB vB wB lB",
16: "sB KC yB LC",
33: "E MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC"
},
H: {
2: "eC"
},
I: {
16: "mB fC gC hC",
33: "I H iC yB jC kC"
},
J: {
33: "D A"
},
K: {
16: "A B C jB xB kB",
33: "b"
},
L: {
33: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
33: "lC"
},
P: {
33: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
33: "xC"
},
R: {
33: "yC"
},
S: {
1: "zC"
}
},
B: 7,
C: "Background-clip: text"
};
},
27964: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B",
36: "2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
516: "I n J D E F A B C K L"
},
E: {
1: "D E F A B C K L G 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
772: "I n J 5B sB 6B 7B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z HC IC jB xB JC kB",
2: "F FC",
36: "GC"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
4: "sB KC yB MC",
516: "LC"
},
H: {
132: "eC"
},
I: {
1: "H jC kC",
36: "fC",
516: "mB I iC yB",
548: "gC hC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS3 Background-image options"
};
},
68042: module => {
module.exports = {
A: {
A: {
1: "J D E F A B zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "background-position-x & background-position-y"
};
},
93033: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E zB",
132: "F"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB 1B 2B"
},
D: {
1: "1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "D E F A B C K L G 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J 5B sB 6B 7B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z HC IC jB xB JC kB",
2: "F G M N O FC GC"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC"
},
H: {
1: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
1: "A",
2: "D"
},
K: {
1: "B C b jB xB kB",
2: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 4,
C: "CSS background-repeat round and space"
};
},
14215: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H 1B 2B",
16: "qB rB"
},
D: {
1: "IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "Background Sync API"
};
},
42900: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "CB DB EB FB GB HB IB JB KB",
2: "0B mB I n J D E F LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
132: "0 1 2 3 4 5 6 7 8 9 M N O o p q r s t u v w x y z AB BB",
164: "A B C K L G"
},
D: {
1: "7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 I n J D E F A B C K L G M N O o p q r s t u v w x y z",
66: "6"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s t FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "Battery Status API"
};
},
26639: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B"
},
D: {
1: "8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A B 5B sB 6B 7B 8B 9B tB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s t u FC GC HC IC jB xB JC kB"
},
G: {
1: "UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "Beacon API"
};
},
14128: module => {
module.exports = {
A: {
A: {
1: "J D E F A B",
16: "zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n 1B 2B"
},
D: {
1: "UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB"
},
E: {
1: "K L G AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A B C 5B sB 6B 7B 8B 9B tB jB kB"
},
F: {
1: "JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB FC GC HC IC jB xB JC kB"
},
G: {
1: "XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
16: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
16: "A B"
},
O: {
16: "lC"
},
P: {
2: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
16: "I"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Printing Events"
};
},
91158: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b 1B 2B",
194: "VB WB XB"
},
D: {
1: "XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB"
},
E: {
1: "L G BC CC uB vB wB DC lB EC",
2: "I n J D E F A B C K 5B sB 6B 7B 8B 9B tB jB kB AC"
},
F: {
1: "NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB FC GC HC IC jB xB JC kB"
},
G: {
1: "bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "qC tB rC sC tC uC vC lB wC",
2: "I mC nC oC pC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "BigInt"
};
},
31014: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n 1B 2B",
36: "J D E F A B C"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D",
36: "E F A B C K L G M N O o"
},
E: {
1: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
2: "F B C FC GC HC IC jB xB JC"
},
G: {
1: "E MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "fC gC hC",
36: "mB I iC yB jC kC"
},
J: {
1: "A",
2: "D"
},
K: {
1: "b kB",
2: "A B C jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "Blob constructing"
};
},
15587: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
129: "A B"
},
B: {
1: "G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
129: "C K L"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D",
33: "E F A B C K L G M N O o p q r"
},
E: {
1: "D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB 6B",
33: "J"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC",
33: "MC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB fC gC hC",
33: "I iC yB"
},
J: {
1: "A",
2: "D"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "B",
2: "A"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "Blob URLs"
};
},
78861: module => {
module.exports = {
A: {
A: {
1: "B",
2: "J D E F A zB"
},
B: {
1: "L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
129: "C K"
},
C: {
1: "JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB",
260: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB",
804: "I n J D E F A B C K L 1B 2B"
},
D: {
1: "PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
260: "KB LB MB NB OB",
388: "0 1 2 3 4 5 6 7 8 9 z AB BB CB DB EB FB GB HB IB JB",
1412: "G M N O o p q r s t u v w x y",
1956: "I n J D E F A B C K L"
},
E: {
1: "vB wB DC lB EC",
129: "A B C K L G 9B tB jB kB AC BC CC uB",
1412: "J D E F 7B 8B",
1956: "I n 5B sB 6B"
},
F: {
1: "CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F FC GC",
260: "7 8 9 AB BB",
388: "0 1 2 3 4 5 6 G M N O o p q r s t u v w x y z",
1796: "HC IC",
1828: "B C jB xB JC kB"
},
G: {
1: "vB wB lB",
129: "QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB",
1412: "E MC NC OC PC",
1956: "sB KC yB LC"
},
H: {
1828: "eC"
},
I: {
1: "H",
388: "jC kC",
1956: "mB I fC gC hC iC yB"
},
J: {
1412: "A",
1924: "D"
},
K: {
1: "b",
2: "A",
1828: "B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "B",
2: "A"
},
O: {
388: "lC"
},
P: {
1: "oC pC qC tB rC sC tC uC vC lB wC",
260: "mC nC",
388: "I"
},
Q: {
260: "xC"
},
R: {
260: "yC"
},
S: {
260: "zC"
}
},
B: 4,
C: "CSS3 Border images"
};
},
40893: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
257: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB",
289: "mB 1B 2B",
292: "0B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
33: "I"
},
E: {
1: "n D E F A B C K L G 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
33: "I 5B sB",
129: "J 6B 7B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z HC IC jB xB JC kB",
2: "F FC GC"
},
G: {
1: "E KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
33: "sB"
},
H: {
2: "eC"
},
I: {
1: "mB I H gC hC iC yB jC kC",
33: "fC"
},
J: {
1: "D A"
},
K: {
1: "B C b jB xB kB",
2: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
257: "zC"
}
},
B: 4,
C: "CSS3 Border-radius (rounded corners)"
};
},
7174: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B"
},
D: {
1: "NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB"
},
E: {
1: "vB wB DC lB EC",
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB"
},
F: {
1: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB"
},
G: {
1: "vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "oC pC qC tB rC sC tC uC vC lB wC",
2: "I mC nC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "BroadcastChannel"
};
},
23375: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L"
},
C: {
1: "DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB 1B 2B"
},
D: {
1: "KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB",
194: "IB",
257: "JB"
},
E: {
1: "K L G AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B tB",
513: "B C jB kB"
},
F: {
1: "7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
194: "5 6"
},
G: {
1: "TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "Brotli Accept-Encoding/Content-Encoding"
};
},
42955: module => {
module.exports = {
A: {
A: {
2: "J D E zB",
260: "F",
516: "A B"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B",
33: "I n J D E F A B C K L G"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O",
33: "o p q r s t u"
},
E: {
1: "D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB 6B",
33: "J"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC",
33: "MC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB",
132: "jC kC"
},
J: {
1: "A",
2: "D"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "calc() as CSS unit value"
};
},
91726: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p q r s t u v w x y"
},
E: {
1: "D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J 5B sB 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M FC GC HC IC jB xB JC kB"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "Canvas blend modes"
};
},
32485: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "zB",
8: "J D E"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
8: "0B mB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
8: "5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z HC IC jB xB JC kB",
8: "F FC GC"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "B C b jB xB kB",
8: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Text API for Canvas"
};
},
22483: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "zB",
8: "J D E"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 2B",
132: "0B mB 1B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
132: "5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
260: "eC"
},
I: {
1: "mB I H iC yB jC kC",
132: "fC gC hC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Canvas (basic support)"
};
},
51250: module => {
module.exports = {
A: {
A: {
2: "J D E zB",
132: "F A B"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p q r s t u v"
},
E: {
1: "D E F A B C K L G 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J 5B sB 6B 7B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
1: "A",
2: "D"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "ch (character) unit"
};
},
68914: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB 1B 2B"
},
D: {
1: "IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 I n J D E F A B C K L G M N O o p q r s t u v w x y z",
129: "2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB"
},
E: {
1: "C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A B 5B sB 6B 7B 8B 9B tB"
},
F: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB"
},
G: {
1: "TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC",
16: "kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "ChaCha20-Poly1305 cipher suites for TLS"
};
},
10302: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u 1B 2B",
194: "0 1 2 3 4 5 6 7 8 9 v w x y z"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z IC jB xB JC kB",
2: "F FC GC",
16: "HC"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
1: "D A"
},
K: {
1: "B C b jB xB kB",
2: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Channel messaging"
};
},
57426: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
16: "C"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p q r s"
},
E: {
1: "D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB 6B",
16: "J"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
1: "A",
2: "D"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "ChildNode.remove()"
};
},
62317: module => {
module.exports = {
A: {
A: {
8: "J D E F zB",
1924: "A B"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
8: "0B mB 1B",
516: "t u",
772: "I n J D E F A B C K L G M N O o p q r s 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
8: "I n J D",
516: "t u v w",
772: "s",
900: "E F A B C K L G M N O o p q r"
},
E: {
1: "D E F A B C K L G 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
8: "I n 5B sB",
900: "J 6B 7B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
8: "F B FC GC HC IC jB",
900: "C xB JC kB"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
8: "sB KC yB",
900: "LC MC"
},
H: {
900: "eC"
},
I: {
1: "H jC kC",
8: "fC gC hC",
900: "mB I iC yB"
},
J: {
1: "A",
900: "D"
},
K: {
1: "b",
8: "A B",
900: "C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
900: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "classList (DOMTokenList)"
};
},
41691: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
2: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "Client Hints: DPR, Width, Viewport-Width"
};
},
12114: module => {
module.exports = {
A: {
A: {
2436: "J D E F A B zB"
},
B: {
260: "N O",
2436: "C K L G M",
8196: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0B mB I n J D E F A B C K L G M N O o p q 1B 2B",
772: "0 1 2 3 4 5 6 7 8 9 r s t u v w x y z",
4100: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
2: "I n J D E F A B C",
2564: "0 1 2 3 4 5 6 7 8 9 K L G M N O o p q r s t u v w x y z AB BB",
8196: "RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
10244: "CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB"
},
E: {
1: "C K L G kB AC BC CC uB vB wB DC lB EC",
16: "5B sB",
2308: "A B tB jB",
2820: "I n J D E F 6B 7B 8B 9B"
},
F: {
2: "F B FC GC HC IC jB xB JC",
16: "C",
516: "kB",
2564: "G M N O o p q r s t u v w x y",
8196: "EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
10244: "0 1 2 3 4 5 6 7 8 9 z AB BB CB DB"
},
G: {
1: "VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB",
2820: "E LC MC NC OC PC QC RC SC TC UC"
},
H: {
2: "eC"
},
I: {
2: "mB I fC gC hC iC yB",
260: "H",
2308: "jC kC"
},
J: {
2: "D",
2308: "A"
},
K: {
2: "A B C jB xB",
16: "kB",
260: "b"
},
L: {
8196: "H"
},
M: {
1028: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2052: "mC nC",
2308: "I",
8196: "oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
10244: "xC"
},
R: {
2052: "yC"
},
S: {
4100: "zC"
}
},
B: 5,
C: "Synchronous Clipboard API"
};
},
65753: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "j k l a m H",
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i 1B 2B",
258: "j k l a m H qB rB"
},
D: {
1: "j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y",
194: "Z c d e f g h i"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
16: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
16: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "COLR/CPAL(v1) Font Formats"
};
},
4781: module => {
module.exports = {
A: {
A: {
2: "J D E zB",
257: "F A B"
},
B: {
1: "C K L G M N O",
513: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB",
513: "bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "L G BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B tB",
129: "B C K jB kB AC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB FC GC HC IC jB xB JC kB",
513: "RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
1: "TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
16: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
16: "A B"
},
O: {
1: "lC"
},
P: {
1: "tB rC sC tC uC vC lB wC",
2: "I mC nC oC pC qC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "COLR/CPAL(v0) Font Formats"
};
},
98802: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
16: "0B mB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J D E F A B C K L",
132: "G M N O o p q r s t u v w x y"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
16: "I n J 5B sB",
132: "D E F 7B 8B 9B",
260: "6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z JC kB",
16: "F B FC GC HC IC jB xB",
132: "G M"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB",
132: "E KC yB LC MC NC OC PC QC"
},
H: {
1: "eC"
},
I: {
1: "H jC kC",
16: "fC gC",
132: "mB I hC iC yB"
},
J: {
132: "D A"
},
K: {
1: "C b kB",
16: "A B jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Node.compareDocumentPosition()"
};
},
22846: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D zB",
132: "E F"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z jB xB JC kB",
2: "F FC GC HC IC"
},
G: {
1: "sB KC yB LC",
513: "E MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
4097: "eC"
},
I: {
1025: "mB I H fC gC hC iC yB jC kC"
},
J: {
258: "D A"
},
K: {
2: "A",
258: "B C jB xB kB",
1025: "b"
},
L: {
1025: "H"
},
M: {
2049: "a"
},
N: {
258: "A B"
},
O: {
258: "lC"
},
P: {
1025: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1025: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Basic console logging functions"
};
},
59634: module => {
module.exports = {
A: {
A: {
1: "B",
2: "J D E F A zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z jB xB JC kB",
2: "F FC GC HC IC",
16: "B"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "b",
16: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "B",
2: "A"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "console.time and console.timeEnd"
};
},
27929: module => {
module.exports = {
A: {
A: {
2: "J D E F A zB",
2052: "B"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
132: "0B mB I n J D E F A B C 1B 2B",
260: "0 1 2 3 4 K L G M N O o p q r s t u v w x y z"
},
D: {
1: "IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
260: "I n J D E F A B C K L G M N O o p",
772: "0 1 2 3 4 5 6 7 8 9 q r s t u v w x y z",
1028: "AB BB CB DB EB FB GB HB"
},
E: {
1: "B C K L G jB kB AC BC CC uB vB wB DC lB EC",
260: "I n A 5B sB tB",
772: "J D E F 6B 7B 8B 9B"
},
F: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F FC",
132: "B GC HC IC jB xB",
644: "C JC kB",
772: "G M N O o p q r s t u v w",
1028: "0 1 2 3 4 x y z"
},
G: {
1: "TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
260: "sB KC yB RC SC",
772: "E LC MC NC OC PC QC"
},
H: {
644: "eC"
},
I: {
1: "H",
16: "fC gC",
260: "hC",
772: "mB I iC yB jC kC"
},
J: {
772: "D A"
},
K: {
1: "b",
132: "A B jB xB",
644: "C kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "B",
2: "A"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
1028: "I"
},
Q: {
1: "xC"
},
R: {
1028: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "const"
};
},
45850: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
900: "A B"
},
B: {
1: "N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
388: "L G M",
900: "C K"
},
C: {
1: "KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B",
260: "IB JB",
388: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB DB EB FB GB HB",
900: "I n J D E F A B C K L G M N O o p q r s t u v w x"
},
D: {
1: "9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J D E F A B C K L",
388: "0 1 2 3 4 5 6 7 8 u v w x y z",
900: "G M N O o p q r s t"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
16: "I n 5B sB",
388: "E F 8B 9B",
900: "J D 6B 7B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
16: "F B FC GC HC IC jB xB",
388: "G M N O o p q r s t u v",
900: "C JC kB"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB KC yB",
388: "E NC OC PC QC",
900: "LC MC"
},
H: {
2: "eC"
},
I: {
1: "H",
16: "mB fC gC hC",
388: "jC kC",
900: "I iC yB"
},
J: {
16: "D",
388: "A"
},
K: {
1: "b",
16: "A B jB xB",
900: "C kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
900: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
388: "zC"
}
},
B: 1,
C: "Constraint Validation API"
};
},
93214: module => {
module.exports = {
A: {
A: {
1: "J D E F A B zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
2: "0B",
4: "mB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB"
},
H: {
2: "eC"
},
I: {
1: "mB I H iC yB jC kC",
2: "fC gC hC"
},
J: {
1: "D A"
},
K: {
1: "b kB",
2: "A B C jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "contenteditable attribute (basic support)"
};
},
43846: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
132: "A B"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B",
129: "I n J D E F A B C K L G M N O o p q r"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K",
257: "L G M N O o p q r s t"
},
E: {
1: "D E F A B C K L G 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB",
257: "J 7B",
260: "6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB",
257: "MC",
260: "LC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
2: "D",
257: "A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
132: "A B"
},
O: {
257: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "Content Security Policy 1.0"
};
},
15420: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L",
4100: "G M N O"
},
C: {
1: "EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B",
132: "0 1 2 3",
260: "4",
516: "5 6 7 8 9 AB BB CB DB"
},
D: {
1: "9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 I n J D E F A B C K L G M N O o p q r s t u v w x y z",
1028: "5 6 7",
2052: "8"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B 9B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r FC GC HC IC jB xB JC kB",
1028: "s t u",
2052: "v"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "Content Security Policy Level 2"
};
},
34175: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O",
194: "P Q R S T U V"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB",
194: "b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB FC GC HC IC jB xB JC kB",
194: "KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "uC vC lB wC",
2: "I mC nC oC pC qC tB rC sC tC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "Cookie Store API"
};
},
92025: module => {
module.exports = {
A: {
A: {
1: "B",
2: "J D zB",
132: "A",
260: "E F"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
2: "0B mB",
1025: "oB TB UB b VB WB XB YB ZB aB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
132: "I n J D E F A B C"
},
E: {
2: "5B sB",
513: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
644: "I n 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
2: "F B FC GC HC IC jB xB JC"
},
G: {
513: "E MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
644: "sB KC yB LC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
132: "mB I fC gC hC iC yB"
},
J: {
1: "A",
132: "D"
},
K: {
1: "C b kB",
2: "A B jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "B",
132: "A"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Cross-Origin Resource Sharing"
};
},
44864: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB 1B 2B",
1028: "e f g h i j k l a m H qB rB",
3076: "BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d"
},
D: {
1: "nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB",
132: "JB KB",
260: "LB MB",
516: "NB OB PB QB RB"
},
E: {
2: "I n J D E F A B C K L 5B sB 6B 7B 8B 9B tB jB kB AC BC",
4100: "G CC uB vB wB DC lB EC"
},
F: {
1: "FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
132: "6 7",
260: "8 9",
516: "AB BB CB DB EB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC",
4100: "dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
3076: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "nC oC pC qC tB rC sC tC uC vC lB wC",
16: "I mC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
3076: "zC"
}
},
B: 1,
C: "createImageBitmap"
};
},
43589: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB",
66: "HB IB JB",
129: "KB LB MB NB OB PB"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB FC GC HC IC jB xB JC kB"
},
G: {
1: "bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "oC pC qC tB rC sC tC uC vC lB wC",
2: "I mC nC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "Credential Management API"
};
},
11314: module => {
module.exports = {
A: {
A: {
2: "zB",
8: "J D E F A",
164: "B"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
513: "C K L G M N O"
},
C: {
1: "3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
8: "0 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B",
66: "1 2"
},
D: {
1: "6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
8: "0 1 2 3 4 5 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "B C K L G jB kB AC BC CC uB vB wB DC lB EC",
8: "I n J D 5B sB 6B 7B",
289: "E F A 8B 9B tB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
8: "F B C G M N O o p q r s FC GC HC IC jB xB JC kB"
},
G: {
1: "TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
8: "sB KC yB LC MC NC",
289: "E OC PC QC RC SC"
},
H: {
2: "eC"
},
I: {
1: "H",
8: "mB I fC gC hC iC yB jC kC"
},
J: {
8: "D A"
},
K: {
1: "b",
8: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
8: "A",
164: "B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "Web Cryptography"
};
},
90687: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u v 1B 2B"
},
D: {
1: "6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s FC GC HC IC jB xB JC kB"
},
G: {
1: "QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC"
},
H: {
2: "eC"
},
I: {
1: "H kC",
2: "mB I fC gC hC iC yB jC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS all property"
};
},
79066: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I 1B 2B",
33: "n J D E F A B C K L G"
},
D: {
1: "CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
33: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB"
},
E: {
1: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "5B sB",
33: "J D E 6B 7B 8B",
292: "I n"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
2: "F B FC GC HC IC jB xB JC",
33: "C G M N O o p q r s t u v w x y"
},
G: {
1: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
33: "E MC NC OC",
164: "sB KC yB LC"
},
H: {
2: "eC"
},
I: {
1: "H",
33: "I iC yB jC kC",
164: "mB fC gC hC"
},
J: {
33: "D A"
},
K: {
1: "b kB",
2: "A B C jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
33: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "CSS Animation"
};
},
85475: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
16: "0B",
33: "0 1 2 3 4 5 6 7 8 9 mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB 1B 2B"
},
D: {
1: "VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J D E F A B C K L",
33: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b"
},
E: {
1: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
16: "I n J 5B sB 6B",
33: "D E 7B 8B"
},
F: {
1: "LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB",
33: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB"
},
G: {
1: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB KC yB LC",
33: "E MC NC OC"
},
H: {
2: "eC"
},
I: {
1: "H",
16: "mB I fC gC hC iC yB",
33: "jC kC"
},
J: {
16: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
33: "lC"
},
P: {
1: "qC tB rC sC tC uC vC lB wC",
16: "I",
33: "mC nC oC pC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
33: "zC"
}
},
B: 5,
C: "CSS :any-link selector"
};
},
40855: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "T U V W X Y Z c d e f g h i j k l a m H",
33: "S",
164: "P Q R",
388: "C K L G M N O"
},
C: {
1: "Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
164: "4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P",
676: "0 1 2 3 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B"
},
D: {
1: "T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
33: "S",
164: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R"
},
E: {
1: "vB wB DC lB EC",
164: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB"
},
F: {
1: "dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB",
33: "aB bB cB",
164: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB"
},
G: {
1: "vB wB lB",
164: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB"
},
H: {
2: "eC"
},
I: {
1: "H",
164: "mB I fC gC hC iC yB jC kC"
},
J: {
164: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A",
388: "B"
},
O: {
164: "lC"
},
P: {
164: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
164: "xC"
},
R: {
164: "yC"
},
S: {
164: "zC"
}
},
B: 5,
C: "CSS Appearance"
};
},
52424: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z",
132: "c d e f g h i j k l a m H"
},
C: {
2: "0 1 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B",
132: "2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z",
132: "c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB FC GC HC IC jB xB JC kB",
132: "hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I fC gC hC iC yB jC kC",
132: "H"
},
J: {
2: "D A"
},
K: {
2: "A B C jB xB kB",
132: "b"
},
L: {
132: "H"
},
M: {
132: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC",
132: "lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
132: "zC"
}
},
B: 4,
C: "CSS Counter Styles"
};
},
24707: module => {
module.exports = {
A: {
D: {
33: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
L: {
33: "H"
},
B: {
2: "C K L G M N O",
33: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U 1B 2B"
},
M: {
1: "a"
},
A: {
2: "J D E F A B zB"
},
F: {
2: "F B C FC GC HC IC jB xB JC kB",
33: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
K: {
2: "A B C jB xB kB",
33: "b"
},
E: {
1: "G CC uB vB wB DC lB",
2: "EC",
33: "I n J D E F A B C K L 5B sB 6B 7B 8B 9B tB jB kB AC BC"
},
G: {
1: "dC uB vB wB lB",
33: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC"
},
P: {
33: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
I: {
2: "mB I fC gC hC iC yB",
33: "H jC kC"
}
},
B: 6,
C: ":autofill CSS pseudo-class"
};
},
38013: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M",
257: "N O"
},
C: {
1: "H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB 1B 2B",
578: "aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m"
},
D: {
1: "gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB",
194: "GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB"
},
E: {
2: "I n J D E 5B sB 6B 7B 8B",
33: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
194: "3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB"
},
G: {
2: "E sB KC yB LC MC NC OC",
33: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
578: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "sC tC uC vC lB wC",
2: "I",
194: "mC nC oC pC qC tB rC"
},
Q: {
194: "xC"
},
R: {
194: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "CSS Backdrop Filter"
};
},
69083: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p q r s t"
},
E: {
1: "D E F A B C K L G 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J 5B sB 6B 7B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z HC IC jB xB JC kB",
2: "F FC GC"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC"
},
H: {
1: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
1: "A",
2: "D"
},
K: {
1: "B C b jB xB kB",
2: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS background-position edge offsets"
};
},
67380: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y 1B 2B"
},
D: {
1: "4 5 6 7 8 9 AB BB CB DB EB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 I n J D E F A B C K L G M N O o p q r s t u v w x y z",
260: "FB"
},
E: {
1: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D 5B sB 6B 7B",
132: "E F A 8B 9B"
},
F: {
1: "0 1 3 4 5 6 7 8 9 r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q FC GC HC IC jB xB JC kB",
260: "2"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC NC",
132: "E OC PC QC RC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS background-blend-mode"
};
},
69307: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O",
164: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B"
},
D: {
2: "I n J D E F A B C K L G M N O o p q",
164: "0 1 2 3 4 5 6 7 8 9 r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J 5B sB 6B",
164: "D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "F FC GC HC IC",
129: "B C jB xB JC kB",
164: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "sB KC yB LC MC",
164: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
132: "eC"
},
I: {
2: "mB I fC gC hC iC yB",
164: "H jC kC"
},
J: {
2: "D",
164: "A"
},
K: {
2: "A",
129: "B C jB xB kB",
164: "b"
},
L: {
164: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
164: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
164: "xC"
},
R: {
164: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "CSS box-decoration-break"
};
},
52307: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB",
33: "1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
33: "I n J D E F"
},
E: {
1: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
33: "n",
164: "I 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z HC IC jB xB JC kB",
2: "F FC GC"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
33: "KC yB",
164: "sB"
},
H: {
2: "eC"
},
I: {
1: "I H iC yB jC kC",
164: "mB fC gC hC"
},
J: {
1: "A",
33: "D"
},
K: {
1: "B C b jB xB kB",
2: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS3 Box-shadow"
};
},
45884: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
33: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB"
},
E: {
2: "5B sB",
33: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "4 5 6 7 8 9 F B C AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
33: "0 1 2 3 G M N O o p q r s t u v w x y z"
},
G: {
33: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "H",
33: "mB I fC gC hC iC yB jC kC"
},
J: {
33: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
33: "I"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "CSS Canvas Drawings"
};
},
1066: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB 1B 2B"
},
D: {
1: "QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB"
},
E: {
1: "C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A B 5B sB 6B 7B 8B 9B tB"
},
F: {
1: "DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB FC GC HC IC jB xB JC kB"
},
G: {
1: "UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "oC pC qC tB rC sC tC uC vC lB wC",
2: "I mC nC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 4,
C: "CSS caret-color"
};
},
12368: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "k l a m H",
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g",
322: "h i j"
},
C: {
1: "i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e 1B 2B",
194: "f g h"
},
D: {
1: "k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g",
322: "h i j"
},
E: {
1: "vB wB DC lB EC",
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB"
},
F: {
1: "V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U FC GC HC IC jB xB JC kB"
},
G: {
1: "vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS Cascade Layers"
};
},
99362: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB 1B 2B"
},
D: {
1: "IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB"
},
E: {
1: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E 5B sB 6B 7B 8B"
},
F: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB"
},
G: {
1: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "Case-insensitive CSS attribute selectors"
};
},
66208: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N",
260: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
3138: "O"
},
C: {
1: "NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB",
132: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB 1B 2B",
644: "GB HB IB JB KB LB MB"
},
D: {
2: "I n J D E F A B C K L G M N O o p q r s",
260: "OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
292: "0 1 2 3 4 5 6 7 8 9 t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB"
},
E: {
2: "I n J 5B sB 6B 7B",
260: "L G AC BC CC uB vB wB DC lB EC",
292: "D E F A B C K 8B 9B tB jB kB"
},
F: {
2: "F B C FC GC HC IC jB xB JC kB",
260: "BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
292: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB"
},
G: {
2: "sB KC yB LC MC",
260: "XC YC ZC aC bC cC dC uB vB wB lB",
292: "E NC OC PC QC RC SC TC UC VC WC"
},
H: {
2: "eC"
},
I: {
2: "mB I fC gC hC iC yB",
260: "H",
292: "jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C jB xB kB",
260: "b"
},
L: {
260: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
292: "lC"
},
P: {
292: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
292: "xC"
},
R: {
260: "yC"
},
S: {
644: "zC"
}
},
B: 4,
C: "CSS clip-path property (for HTML)"
};
},
95475: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O",
33: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB 1B 2B"
},
D: {
16: "I n J D E F A B C K L G M N O",
33: "0 1 2 3 4 5 6 7 8 9 o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n 5B sB 6B",
33: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "F B C FC GC HC IC jB xB JC kB",
33: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
16: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
16: "mB I fC gC hC iC yB jC kC",
33: "H"
},
J: {
16: "D A"
},
K: {
2: "A B C jB xB kB",
33: "b"
},
L: {
16: "H"
},
M: {
1: "a"
},
N: {
16: "A B"
},
O: {
16: "lC"
},
P: {
16: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
33: "xC"
},
R: {
16: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "CSS color-adjust"
};
},
22239: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "G CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B",
132: "B C K L tB jB kB AC BC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC",
132: "SC TC UC VC WC XC YC ZC aC bC cC"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS color() function"
};
},
45911: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB 1B 2B",
578: "fB gB hB iB P Q R pB"
},
D: {
1: "ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB",
194: "nB SB oB TB UB b VB WB XB YB"
},
E: {
1: "K L G kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A B C 5B sB 6B 7B 8B 9B tB jB"
},
F: {
1: "b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FC GC HC IC jB xB JC kB",
194: "FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB"
},
G: {
1: "WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "tB rC sC tC uC vC lB wC",
2: "I mC nC oC pC qC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS Conical Gradients"
};
},
38686: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c",
194: "e f g h i j k l a m H qB",
450: "d",
516: "rB"
},
E: {
1: "lB EC",
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB FC GC HC IC jB xB JC kB",
194: "P Q R pB S T U V W X Y Z"
},
G: {
1: "lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS Container Queries (Size)"
};
},
56656: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d",
194: "a m H qB",
450: "e f g h i j k l"
},
E: {
1: "lB EC",
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB FC GC HC IC jB xB JC kB",
194: "P Q R pB S T U V W X Y Z"
},
G: {
1: "lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS Container Query Units"
};
},
31072: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B",
194: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB"
},
D: {
1: "LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB",
66: "KB"
},
E: {
1: "vB wB DC lB EC",
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB"
},
F: {
1: "9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
66: "7 8"
},
G: {
1: "vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I mC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
194: "zC"
}
},
B: 2,
C: "CSS Containment"
};
},
52666: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O P Q R S T"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "uC vC lB wC",
2: "I mC nC oC pC qC tB rC sC tC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS content-visibility"
};
},
2172: module => {
module.exports = {
A: {
A: {
1: "E F A B",
2: "J D zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "CSS Counters"
};
},
14810: module => {
module.exports = {
A: {
A: {
2: "J zB",
2340: "D E F A B"
},
B: {
2: "C K L G M N O",
1025: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "e f g h i j k l a m H qB rB",
2: "0B mB 1B",
513: "VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d",
545: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z",
1025: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB 6B",
164: "J",
4644: "D E F 7B 8B 9B"
},
F: {
2: "F B G M N O o p q r s t u v w FC GC HC IC jB xB",
545: "C JC kB",
1025: "0 1 2 3 4 5 6 7 8 9 x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB",
4260: "LC MC",
4644: "E NC OC PC QC"
},
H: {
2: "eC"
},
I: {
2: "mB I fC gC hC iC yB jC kC",
1025: "H"
},
J: {
2: "D",
4260: "A"
},
K: {
2: "A B jB xB",
545: "C kB",
1025: "b"
},
L: {
1025: "H"
},
M: {
545: "a"
},
N: {
2340: "A B"
},
O: {
1: "lC"
},
P: {
1025: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1025: "xC"
},
R: {
1025: "yC"
},
S: {
4097: "zC"
}
},
B: 7,
C: "Crisp edges/pixelated images"
};
},
65910: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O",
33: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "I n J D E F A B C K L G M",
33: "0 1 2 3 4 5 6 7 8 9 N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB",
33: "J D E F 6B 7B 8B 9B"
},
F: {
2: "F B C FC GC HC IC jB xB JC kB",
33: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB",
33: "E LC MC NC OC PC QC"
},
H: {
2: "eC"
},
I: {
2: "mB I fC gC hC iC yB",
33: "H jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C jB xB kB",
33: "b"
},
L: {
33: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
33: "lC"
},
P: {
33: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
33: "xC"
},
R: {
33: "yC"
},
S: {
2: "zC"
}
},
B: 4,
C: "CSS Cross-Fade Function"
};
},
8375: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
16: "0B mB 1B 2B"
},
D: {
1: "KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J D E F A B C K L",
132: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB"
},
E: {
1: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
16: "I n 5B sB",
132: "J D E F A 6B 7B 8B 9B"
},
F: {
1: "7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
16: "F B FC GC HC IC jB xB",
132: "0 1 2 3 4 5 6 G M N O o p q r s t u v w x y z",
260: "C JC kB"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB KC yB LC MC",
132: "E NC OC PC QC RC"
},
H: {
260: "eC"
},
I: {
1: "H",
16: "mB fC gC hC",
132: "I iC yB jC kC"
},
J: {
16: "D",
132: "A"
},
K: {
1: "b",
16: "A B C jB xB",
260: "kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
132: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
132: "I"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 7,
C: ":default CSS pseudo-class"
};
},
8182: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O Q R S T U V W X Y Z c d e f g h i j k l a m H",
16: "P"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "B",
2: "I n J D E F A C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "Explicit descendant combinator >>"
};
},
38482: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
164: "A B"
},
B: {
66: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
164: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "I n J D E F A B C K L G M N O o p q r s t u v w x",
66: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
66: "9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
292: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A b",
292: "B C jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
164: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
66: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS Device Adaptation"
};
},
73555: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M 1B 2B",
33: "0 1 2 3 4 5 6 7 8 9 N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z",
194: "c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
33: "zC"
}
},
B: 5,
C: ":dir() CSS pseudo-class"
};
},
25963: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "Y Z c d e f g h i j k l a m H",
2: "C K L G M N O",
260: "P Q R S T U V W X"
},
C: {
1: "TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B",
260: "6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB"
},
D: {
1: "Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB",
194: "RB nB SB oB TB UB b",
260: "VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X"
},
E: {
1: "lB EC",
2: "I n J D E F A B 5B sB 6B 7B 8B 9B tB",
260: "L G AC BC CC uB vB wB DC",
772: "C K jB kB"
},
F: {
1: "gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB FC GC HC IC jB xB JC kB",
260: "LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB"
},
G: {
1: "lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC",
260: "aC bC cC dC uB vB wB",
772: "UC VC WC XC YC ZC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "vC lB wC",
2: "I mC nC oC pC",
260: "qC tB rC sC tC uC"
},
Q: {
260: "xC"
},
R: {
2: "yC"
},
S: {
260: "zC"
}
},
B: 5,
C: "CSS display: contents"
};
},
17710: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
33: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
164: "0B mB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
33: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
33: "zC"
}
},
B: 5,
C: "CSS element() function"
};
},
15967: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b 1B 2B"
},
D: {
1: "ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB"
},
E: {
1: "C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B tB",
132: "B"
},
F: {
1: "PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB FC GC HC IC jB xB JC kB"
},
G: {
1: "UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC",
132: "TC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "tB rC sC tC uC vC lB wC",
2: "I mC nC oC pC qC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "CSS Environment Variables env()"
};
},
18261: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
33: "A B"
},
B: {
2: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
33: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
33: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS Exclusions Level 1"
};
},
96951: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p q r s t u v w"
},
E: {
1: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E 5B sB 6B 7B 8B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
2: "F B C FC GC HC IC jB xB JC"
},
G: {
1: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC"
},
H: {
1: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS Feature Queries"
};
},
30431: module => {
module.exports = {
A: {
D: {
1: "Y Z c d e f g h i j k l a m H qB rB 3B 4B",
33: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X"
},
L: {
1: "H"
},
B: {
1: "Y Z c d e f g h i j k l a m H",
33: "C K L G M N O P Q R S T U V W X"
},
C: {
1: "pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R 1B 2B"
},
M: {
1: "a"
},
A: {
2: "J D E F zB",
33: "A B"
},
F: {
1: "fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB",
33: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
E: {
1: "G BC CC uB vB wB DC lB",
2: "EC",
33: "I n J D E F A B C K L 5B sB 6B 7B 8B 9B tB jB kB AC"
},
G: {
1: "cC dC uB vB wB lB",
33: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC"
},
P: {
1: "vC lB wC",
33: "I mC nC oC pC qC tB rC sC tC uC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB",
33: "jC kC"
}
},
B: 6,
C: "::file-selector-button CSS pseudo-element"
};
},
25374: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E 5B sB 6B 7B 8B",
33: "F"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC",
33: "PC QC"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS filter() function"
};
},
94762: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
1028: "K L G M N O",
1346: "C"
},
C: {
1: "4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B",
196: "3",
516: "0 1 2 I n J D E F A B C K L G M N O o p q r s t u v w x y z 2B"
},
D: {
1: "MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N",
33: "0 1 2 3 4 5 6 7 8 9 O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB"
},
E: {
1: "A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB 6B",
33: "J D E F 7B 8B"
},
F: {
1: "9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB",
33: "0 1 2 3 4 5 6 7 8 G M N O o p q r s t u v w x y z"
},
G: {
1: "QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC",
33: "E MC NC OC PC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB",
33: "jC kC"
},
J: {
2: "D",
33: "A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "oC pC qC tB rC sC tC uC vC lB wC",
33: "I mC nC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "CSS Filter Effects"
};
},
18774: module => {
module.exports = {
A: {
A: {
1: "F A B",
16: "zB",
516: "E",
1540: "J D"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
132: "mB",
260: "0B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "n J D E",
132: "I"
},
E: {
1: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
16: "n 5B",
132: "I sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z JC kB",
16: "F FC",
260: "B GC HC IC jB xB"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB KC yB"
},
H: {
1: "eC"
},
I: {
1: "mB I H iC yB jC kC",
16: "fC gC",
132: "hC"
},
J: {
1: "D A"
},
K: {
1: "C b kB",
260: "A B jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "::first-letter CSS pseudo-element selector"
};
},
48954: module => {
module.exports = {
A: {
A: {
1: "F A B",
132: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "CSS first-line pseudo-element"
};
},
38613: module => {
module.exports = {
A: {
A: {
1: "D E F A B",
2: "zB",
8: "J"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B tB jB kB AC BC CC uB vB wB DC lB EC",
1025: "9B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB",
132: "LC MC NC"
},
H: {
2: "eC"
},
I: {
1: "mB H jC kC",
260: "fC gC hC",
513: "I iC yB"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "CSS position:fixed"
};
},
48403: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O",
328: "P Q R S T U"
},
C: {
1: "U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B",
161: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T"
},
D: {
1: "V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB",
328: "XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U"
},
E: {
1: "vB wB DC lB EC",
2: "I n J D E F A B C K L 5B sB 6B 7B 8B 9B tB jB kB AC BC",
578: "G CC uB"
},
F: {
1: "cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB FC GC HC IC jB xB JC kB",
328: "WB XB YB ZB aB bB"
},
G: {
1: "vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC",
578: "dC uB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "uC vC lB wC",
2: "I mC nC oC pC qC tB rC sC tC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
161: "zC"
}
},
B: 7,
C: ":focus-visible CSS pseudo-class"
};
},
26570: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB 1B 2B"
},
D: {
1: "SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB",
194: "nB"
},
E: {
1: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B"
},
F: {
1: "GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FC GC HC IC jB xB JC kB",
194: "FB"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "pC qC tB rC sC tC uC vC lB wC",
2: "I mC nC oC"
},
Q: {
1: "xC"
},
R: {
16: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: ":focus-within CSS pseudo-class"
};
},
66613: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l"
},
E: {
1: "vB wB DC lB EC",
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB"
},
F: {
1: "W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V FC GC HC IC jB xB JC kB"
},
G: {
1: "vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS font-palette"
};
},
68329: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB 1B 2B",
194: "FB GB HB IB JB KB LB MB NB OB PB QB"
},
D: {
1: "SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB",
66: "IB JB KB LB MB NB OB PB QB RB nB"
},
E: {
1: "C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A B 5B sB 6B 7B 8B 9B tB"
},
F: {
1: "GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
66: "5 6 7 8 9 AB BB CB DB EB FB"
},
G: {
1: "UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "pC qC tB rC sC tC uC vC lB wC",
2: "I",
66: "mC nC oC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
194: "zC"
}
},
B: 5,
C: "CSS font-display"
};
},
28513: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E 1B 2B"
},
D: {
1: "HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB"
},
E: {
1: "B C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B tB"
},
F: {
1: "4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS font-stretch"
};
},
92637: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D zB",
132: "E"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "CSS Generated content for pseudo-elements"
};
},
26470: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B",
260: "0 1 2 3 4 M N O o p q r s t u v w x y z",
292: "I n J D E F A B C K L G 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
33: "A B C K L G M N O o p q r s t u",
548: "I n J D E F"
},
E: {
1: "vB wB DC lB EC",
2: "5B sB",
260: "D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB",
292: "J 6B",
804: "I n"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
2: "F B FC GC HC IC",
33: "C JC",
164: "jB xB"
},
G: {
1: "vB wB lB",
260: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB",
292: "LC MC",
804: "sB KC yB"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
33: "I iC yB",
548: "mB fC gC hC"
},
J: {
1: "A",
548: "D"
},
K: {
1: "b kB",
2: "A B",
33: "C",
164: "jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS Gradients"
};
},
53085: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "lB EC",
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 4,
C: "CSS Grid animation"
};
},
26769: module => {
module.exports = {
A: {
A: {
2: "J D E zB",
8: "F",
292: "A B"
},
B: {
1: "M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
292: "C K L G"
},
C: {
1: "NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O 1B 2B",
8: "0 1 2 3 4 5 6 7 8 o p q r s t u v w x y z",
584: "9 AB BB CB DB EB FB GB HB IB JB KB",
1025: "LB MB"
},
D: {
1: "RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p q r s t",
8: "u v w x",
200: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB",
1025: "QB"
},
E: {
1: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB 6B",
8: "J D E F A 7B 8B 9B"
},
F: {
1: "DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s t u v w FC GC HC IC jB xB JC kB",
200: "0 1 2 3 4 5 6 7 8 9 x y z AB BB CB"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC",
8: "E MC NC OC PC QC RC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC",
8: "yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
292: "A B"
},
O: {
1: "lC"
},
P: {
1: "nC oC pC qC tB rC sC tC uC vC lB wC",
2: "mC",
8: "I"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS Grid Layout (level 1)"
};
},
67010: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B 9B"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS hanging-punctuation"
};
},
71024: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l",
194: "a m H qB"
},
E: {
1: "vB wB DC lB EC",
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: ":has() CSS relational pseudo-class"
};
},
37722: module => {
module.exports = {
A: {
A: {
16: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
16: "C K L G M N O"
},
C: {
16: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB"
},
E: {
16: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
16: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
16: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
16: "eC"
},
I: {
16: "mB I H fC gC hC iC yB jC kC"
},
J: {
16: "D A"
},
K: {
16: "A B C b jB xB kB"
},
L: {
16: "H"
},
M: {
16: "a"
},
N: {
16: "A B"
},
O: {
16: "lC"
},
P: {
16: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
16: "xC"
},
R: {
16: "yC"
},
S: {
16: "zC"
}
},
B: 5,
C: "CSS4 Hyphenation"
};
},
95570: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
33: "A B"
},
B: {
33: "C K L G M N O",
132: "P Q R S T U V W",
260: "X Y Z c d e f g h i j k l a m H"
},
C: {
1: "CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n 1B 2B",
33: "0 1 2 3 4 5 6 7 8 9 J D E F A B C K L G M N O o p q r s t u v w x y z AB BB"
},
D: {
1: "X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB",
132: "OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W"
},
E: {
2: "I n 5B sB",
33: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB FC GC HC IC jB xB JC kB",
132: "BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "sB KC",
33: "E yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
4: "lC"
},
P: {
1: "nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I",
132: "mC"
},
Q: {
2: "xC"
},
R: {
132: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "CSS Hyphenation"
};
},
48802: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "Y Z c d e f g h i j k l a m H",
2: "C K L G M N O P Q",
257: "R S T U V W X"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u 1B 2B"
},
D: {
1: "Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q",
257: "R S T U V W X"
},
E: {
1: "L G AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A B C K 5B sB 6B 7B 8B 9B tB jB kB"
},
F: {
1: "YB ZB aB bB cB",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB FC GC HC IC jB xB JC kB",
257: "dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
1: "bC cC dC uB vB wB lB",
132: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "tC uC vC lB wC",
2: "I mC nC oC pC qC tB rC sC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS3 image-orientation"
};
},
14273: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O",
164: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U 1B 2B",
66: "V W",
257: "Y Z c d e f g h i j k l a m H qB rB",
772: "X"
},
D: {
2: "I n J D E F A B C K L G M N O o p",
164: "0 1 2 3 4 5 6 7 8 9 q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n 5B sB 6B",
132: "A B C K tB jB kB AC",
164: "J D E F 7B 8B 9B",
516: "L G BC CC uB vB wB DC lB EC"
},
F: {
2: "F B C FC GC HC IC jB xB JC kB",
164: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "sB KC yB LC",
132: "RC SC TC UC VC WC XC YC ZC aC",
164: "E MC NC OC PC QC",
516: "bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I fC gC hC iC yB",
164: "H jC kC"
},
J: {
2: "D",
164: "A"
},
K: {
2: "A B C jB xB kB",
164: "b"
},
L: {
164: "H"
},
M: {
257: "a"
},
N: {
2: "A B"
},
O: {
164: "lC"
},
P: {
164: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
164: "xC"
},
R: {
164: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS image-set"
};
},
29804: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C",
260: "K L G M N O"
},
C: {
1: "JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u v w x 1B 2B",
516: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB DB EB FB GB HB IB"
},
D: {
1: "MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I",
16: "n J D E F A B C K L",
260: "LB",
772: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB"
},
E: {
1: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB",
16: "n",
772: "J D E F A 6B 7B 8B 9B"
},
F: {
1: "9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
16: "F FC",
260: "8 B C GC HC IC jB xB JC kB",
772: "0 1 2 3 4 5 6 7 G M N O o p q r s t u v w x y z"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB",
772: "E LC MC NC OC PC QC RC"
},
H: {
132: "eC"
},
I: {
1: "H",
2: "mB fC gC hC",
260: "I iC yB jC kC"
},
J: {
2: "D",
260: "A"
},
K: {
1: "b",
260: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
260: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
516: "zC"
}
},
B: 5,
C: ":in-range and :out-of-range CSS pseudo-classes"
};
},
90283: module => {
module.exports = {
A: {
A: {
2: "J D E zB",
132: "A B",
388: "F"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
132: "C K L G M N O"
},
C: {
1: "KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
16: "0B mB 1B 2B",
132: "0 1 2 3 4 5 6 7 8 9 J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB",
388: "I n"
},
D: {
1: "8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J D E F A B C K L",
132: "0 1 2 3 4 5 6 7 G M N O o p q r s t u v w x y z"
},
E: {
1: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
16: "I n J 5B sB",
132: "D E F A 7B 8B 9B",
388: "6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
16: "F B FC GC HC IC jB xB",
132: "G M N O o p q r s t u",
516: "C JC kB"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB KC yB LC MC",
132: "E NC OC PC QC RC"
},
H: {
516: "eC"
},
I: {
1: "H",
16: "mB fC gC hC kC",
132: "jC",
388: "I iC yB"
},
J: {
16: "D",
132: "A"
},
K: {
1: "b",
16: "A B C jB xB",
516: "kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
132: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
132: "zC"
}
},
B: 7,
C: ":indeterminate CSS pseudo-class"
};
},
97834: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E 5B sB 6B 7B 8B",
4: "F",
164: "A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC",
164: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS Initial Letter"
};
},
15146: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
33: "I n J D E F A B C K L G M N O 1B 2B",
164: "0B mB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
16: "5B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB"
},
H: {
2: "eC"
},
I: {
1: "mB I H hC iC yB jC kC",
16: "fC gC"
},
J: {
1: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS initial value"
};
},
26177: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "G CC uB vB wB DC lB EC",
2: "I n J D E F A B C K L 5B sB 6B 7B 8B 9B tB jB kB AC BC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 4,
C: "LCH and Lab color values"
};
},
59478: module => {
module.exports = {
A: {
A: {
1: "F A B",
16: "zB",
132: "J D E"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
132: "I n J D E F A B C K L G M N O o p q r s t u v w x y"
},
E: {
1: "D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
16: "5B",
132: "I n J sB 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
16: "F FC",
132: "B C G M GC HC IC jB xB JC kB"
},
G: {
1: "E KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
16: "fC gC",
132: "mB I hC iC yB"
},
J: {
132: "D A"
},
K: {
1: "b",
132: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "letter-spacing CSS property"
};
},
70498: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M",
33: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
129: "N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB 1B 2B",
33: "YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
16: "I n J D E F A B C K",
33: "0 1 2 3 4 5 6 7 8 9 L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I 5B sB",
33: "n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "F B C FC GC HC IC jB xB JC kB",
33: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "sB KC yB",
33: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
16: "fC gC",
33: "mB I H hC iC yB jC kC"
},
J: {
33: "D A"
},
K: {
2: "A B C jB xB kB",
33: "b"
},
L: {
33: "H"
},
M: {
33: "a"
},
N: {
2: "A B"
},
O: {
33: "lC"
},
P: {
33: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
33: "xC"
},
R: {
33: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS line-clamp"
};
},
27e3: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "Y Z c d e f g h i j k l a m H",
2: "C K L G M N O",
1028: "W X",
1540: "P Q R S T U V"
},
C: {
1: "WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B",
164: "0 1 2 3 4 5 6 7 8 9 mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B",
1540: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB"
},
D: {
1: "Y Z c d e f g h i j k l a m H qB rB 3B 4B",
292: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB",
1028: "W X",
1540: "ZB aB bB cB dB eB fB gB hB iB P Q R S T U V"
},
E: {
1: "G CC uB vB wB DC lB EC",
292: "I n J D E F A B C 5B sB 6B 7B 8B 9B tB jB",
1028: "BC",
1540: "K L kB AC"
},
F: {
1: "gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB",
292: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB",
1028: "eB fB",
1540: "PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB"
},
G: {
1: "dC uB vB wB lB",
292: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC",
1028: "cC",
1540: "WC XC YC ZC aC bC"
},
H: {
2: "eC"
},
I: {
1: "H",
292: "mB I fC gC hC iC yB jC kC"
},
J: {
292: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
292: "lC"
},
P: {
1: "vC lB wC",
292: "I mC nC oC pC qC",
1540: "tB rC sC tC uC"
},
Q: {
1540: "xC"
},
R: {
1540: "yC"
},
S: {
1540: "zC"
}
},
B: 5,
C: "CSS Logical Properties"
};
},
65628: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O P Q R S T U"
},
C: {
1: "YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB 1B 2B"
},
D: {
1: "V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U"
},
E: {
1: "EC",
2: "I n J D E F A B 5B sB 6B 7B 8B 9B tB",
129: "C K L G jB kB AC BC CC uB vB wB DC lB"
},
F: {
1: "cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB FC GC HC IC jB xB JC kB"
},
G: {
1: "UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "uC vC lB wC",
2: "I mC nC oC pC qC tB rC sC tC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS ::marker pseudo-element"
};
},
4082: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M",
164: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
3138: "N",
12292: "O"
},
C: {
1: "MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB",
260: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB 1B 2B"
},
D: {
164: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "vB wB DC lB EC",
2: "5B sB",
164: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB"
},
F: {
2: "F B C FC GC HC IC jB xB JC kB",
164: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
1: "vB wB lB",
164: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB"
},
H: {
2: "eC"
},
I: {
164: "H jC kC",
676: "mB I fC gC hC iC yB"
},
J: {
164: "D A"
},
K: {
2: "A B C jB xB kB",
164: "b"
},
L: {
164: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
164: "lC"
},
P: {
164: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
164: "xC"
},
R: {
164: "yC"
},
S: {
260: "zC"
}
},
B: 4,
C: "CSS Masks"
};
},
36209: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O",
1220: "P Q R S T U V W"
},
C: {
1: "iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
16: "0B mB 1B 2B",
548: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB"
},
D: {
1: "X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J D E F A B C K L",
164: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b",
196: "VB WB XB",
1220: "YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W"
},
E: {
1: "L G BC CC uB vB wB DC lB EC",
2: "I 5B sB",
16: "n",
164: "J D E 6B 7B 8B",
260: "F A B C K 9B tB jB kB AC"
},
F: {
1: "fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB",
164: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB",
196: "LB MB NB",
1220: "OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB"
},
G: {
1: "bC cC dC uB vB wB lB",
16: "sB KC yB LC MC",
164: "E NC OC",
260: "PC QC RC SC TC UC VC WC XC YC ZC aC"
},
H: {
2: "eC"
},
I: {
1: "H",
16: "mB fC gC hC",
164: "I iC yB jC kC"
},
J: {
16: "D",
164: "A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
164: "lC"
},
P: {
1: "vC lB wC",
164: "I mC nC oC pC qC tB rC sC tC uC"
},
Q: {
1220: "xC"
},
R: {
164: "yC"
},
S: {
548: "zC"
}
},
B: 5,
C: ":is() CSS pseudo-class"
};
},
18346: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB 1B 2B"
},
D: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB"
},
E: {
1: "L G AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A B 5B sB 6B 7B 8B 9B tB",
132: "C K jB kB"
},
F: {
1: "WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB FC GC HC IC jB xB JC kB"
},
G: {
1: "aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC",
132: "UC VC WC XC YC ZC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "sC tC uC vC lB wC",
2: "I mC nC oC pC qC tB rC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS math functions min(), max() and clamp()"
};
},
89345: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB 1B 2B"
},
D: {
1: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E 5B sB 6B 7B 8B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s t u v w FC GC HC IC jB xB JC kB"
},
G: {
1: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "Media Queries: interaction media features"
};
},
94097: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB 1B 2B"
},
D: {
1: "qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 4,
C: "Media Queries: Range Syntax"
};
},
73138: module => {
module.exports = {
A: {
A: {
2: "J D E zB",
132: "F A B"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
1028: "C K L G M N O"
},
C: {
1: "TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB",
260: "I n J D E F A B C K L G 1B 2B",
1028: "0 1 2 3 4 5 6 7 8 9 M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB"
},
D: {
1: "YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
548: "I n J D E F A B C K L G M N O o p q r s t u v w x",
1028: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB"
},
E: {
1: "lB EC",
2: "5B sB",
548: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC"
},
F: {
1: "OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
2: "F",
548: "B C FC GC HC IC jB xB JC",
1028: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB"
},
G: {
1: "lB",
16: "sB",
548: "E KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB"
},
H: {
132: "eC"
},
I: {
1: "H",
16: "fC gC",
548: "mB I hC iC yB",
1028: "jC kC"
},
J: {
548: "D A"
},
K: {
1: "b kB",
548: "A B C jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
132: "A B"
},
O: {
1: "lC"
},
P: {
1: "tB rC sC tC uC vC lB wC",
1028: "I mC nC oC pC qC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "Media Queries: resolution feature"
};
},
69255: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
16: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB 1B 2B",
16: "LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB",
16: "rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "Media Queries: scripting media feature"
};
},
64114: module => {
module.exports = {
A: {
A: {
8: "J D E zB",
129: "F A B"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
2: "0B mB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
129: "I n J D E F A B C K L G M N O o p q r s t u"
},
E: {
1: "D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
129: "I n J 6B",
388: "5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
2: "F"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
129: "sB KC yB LC MC"
},
H: {
1: "eC"
},
I: {
1: "H jC kC",
129: "mB I fC gC hC iC yB"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
129: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "CSS3 Media Queries"
};
},
20741: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B"
},
D: {
1: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p q r s t u v w x",
194: "0 1 2 3 4 5 6 7 8 9 y z"
},
E: {
2: "I n J D 5B sB 6B 7B",
260: "E F A B C K L G 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s t u v w x FC GC HC IC jB xB JC kB"
},
G: {
2: "sB KC yB LC MC NC",
260: "E OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "Blending of HTML/SVG elements"
};
},
56859: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB 1B 2B"
},
D: {
1: "FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB",
194: "CB DB EB"
},
E: {
1: "lB EC",
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC"
},
F: {
1: "2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s t u v w x y FC GC HC IC jB xB JC kB",
194: "0 1 z"
},
G: {
1: "lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS Motion Path"
};
},
67502: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
16: "5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB KC"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "CSS namespaces"
};
},
15660: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS Nesting"
};
},
36445: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O Q R S T U V W",
16: "P"
},
C: {
1: "T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S 1B 2B"
},
D: {
1: "X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W"
},
E: {
1: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E 5B sB 6B 7B 8B"
},
F: {
1: "fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB FC GC HC IC jB xB JC kB"
},
G: {
1: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "vC lB wC",
2: "I mC nC oC pC qC tB rC sC tC uC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "selector list argument of :not()"
};
},
93354: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E 5B sB 6B 7B 8B"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "selector list argument of :nth-child and :nth-last-child CSS pseudo-classes"
};
},
78807: module => {
module.exports = {
A: {
A: {
1: "F A B",
4: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "CSS3 Opacity"
};
},
7557: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J D E F A B C K L"
},
E: {
1: "n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
16: "F FC",
132: "B C GC HC IC jB xB JC kB"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB"
},
H: {
132: "eC"
},
I: {
1: "mB I H hC iC yB jC kC",
16: "fC gC"
},
J: {
1: "D A"
},
K: {
1: "b",
132: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 7,
C: ":optional CSS pseudo-class"
};
},
44133: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB 1B 2B"
},
D: {
1: "PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
2: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS overflow-anchor (Scroll Anchoring)"
};
},
87217: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J D E F A B C K L"
},
E: {
1: "I n J D E F A B 6B 7B 8B 9B tB jB",
16: "5B sB",
130: "C K L G kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E KC yB LC MC NC OC PC QC RC SC TC UC",
16: "sB",
130: "VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
16: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "CSS overflow: overlay"
};
},
80710: module => {
module.exports = {
A: {
A: {
388: "J D E F A B zB"
},
B: {
1: "Z c d e f g h i j k l a m H",
260: "P Q R S T U V W X Y",
388: "C K L G M N O"
},
C: {
1: "R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
260: "oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q",
388: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB 1B 2B"
},
D: {
1: "Z c d e f g h i j k l a m H qB rB 3B 4B",
260: "YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y",
388: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB"
},
E: {
1: "lB EC",
260: "L G AC BC CC uB vB wB DC",
388: "I n J D E F A B C K 5B sB 6B 7B 8B 9B tB jB kB"
},
F: {
1: "gB hB iB P Q R pB S T U V W X Y Z",
260: "OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB",
388: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB FC GC HC IC jB xB JC kB"
},
G: {
1: "lB",
260: "aC bC cC dC uB vB wB",
388: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC"
},
H: {
388: "eC"
},
I: {
1: "H",
388: "mB I fC gC hC iC yB jC kC"
},
J: {
388: "D A"
},
K: {
1: "b",
388: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
388: "A B"
},
O: {
388: "lC"
},
P: {
1: "vC lB wC",
388: "I mC nC oC pC qC tB rC sC tC uC"
},
Q: {
388: "xC"
},
R: {
388: "yC"
},
S: {
388: "zC"
}
},
B: 5,
C: "CSS overflow property"
};
},
59399: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
132: "A B"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
132: "C K L G M N",
516: "O"
},
C: {
1: "nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB 1B 2B"
},
D: {
1: "VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB",
260: "UB b"
},
E: {
1: "lB EC",
2: "I n J D E F A B C K L 5B sB 6B 7B 8B 9B tB jB kB AC",
1090: "G BC CC uB vB wB DC"
},
F: {
1: "LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB FC GC HC IC jB xB JC kB",
260: "JB KB"
},
G: {
1: "lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC",
1090: "cC dC uB vB wB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
132: "A B"
},
O: {
2: "lC"
},
P: {
1: "pC qC tB rC sC tC uC vC lB wC",
2: "I mC nC oC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS overscroll-behavior"
};
},
71975: module => {
module.exports = {
A: {
A: {
388: "A B",
900: "J D E F zB"
},
B: {
388: "C K L G M N O",
900: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
772: "VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
900: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b 1B 2B"
},
D: {
900: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
772: "A",
900: "I n J D E F B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
16: "F FC",
129: "B C GC HC IC jB xB JC kB",
900: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
900: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
129: "eC"
},
I: {
900: "mB I H fC gC hC iC yB jC kC"
},
J: {
900: "D A"
},
K: {
129: "A B C jB xB kB",
900: "b"
},
L: {
900: "H"
},
M: {
900: "a"
},
N: {
388: "A B"
},
O: {
900: "lC"
},
P: {
900: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
900: "xC"
},
R: {
900: "yC"
},
S: {
900: "zC"
}
},
B: 2,
C: "CSS page-break properties"
};
},
91239: module => {
module.exports = {
A: {
A: {
2: "J D zB",
132: "E F A B"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
132: "C K L G M N O"
},
C: {
2: "0B mB I n J D E F A B C K L G M N O 1B 2B",
132: "0 1 2 3 4 5 6 7 8 9 o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J D E F A B C K L"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
132: "F B C FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
16: "eC"
},
I: {
16: "mB I H fC gC hC iC yB jC kC"
},
J: {
16: "D A"
},
K: {
16: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
132: "a"
},
N: {
258: "A B"
},
O: {
258: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
132: "zC"
}
},
B: 5,
C: "CSS Paged Media (@page)"
};
},
62241: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b"
},
E: {
2: "I n J D E F A B C 5B sB 6B 7B 8B 9B tB jB",
194: "K L G kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS Paint API"
};
},
35770: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
292: "A B"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B",
164: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB"
},
D: {
1: "GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB"
},
E: {
1: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E 5B sB 6B 7B 8B"
},
F: {
1: "3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB"
},
G: {
1: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
164: "zC"
}
},
B: 5,
C: ":placeholder-shown CSS pseudo-class"
};
},
2125: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
36: "C K L G M N O"
},
C: {
1: "KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O 1B 2B",
33: "0 1 2 3 4 5 6 7 8 9 o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB"
},
D: {
1: "QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
36: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB"
},
E: {
1: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB",
36: "n J D E F A 6B 7B 8B 9B"
},
F: {
1: "DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB",
36: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC",
36: "E yB LC MC NC OC PC QC RC"
},
H: {
2: "eC"
},
I: {
1: "H",
36: "mB I fC gC hC iC yB jC kC"
},
J: {
36: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
36: "A B"
},
O: {
1: "lC"
},
P: {
1: "oC pC qC tB rC sC tC uC vC lB wC",
36: "I mC nC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
33: "zC"
}
},
B: 5,
C: "::placeholder CSS pseudo-element"
};
},
78426: module => {
module.exports = {
A: {
D: {
2: "I n J D E F A B C K L G M",
33: "0 1 2 3 4 5 6 7 8 9 N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
L: {
33: "H"
},
B: {
2: "C K L G M N O",
33: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB 1B 2B",
33: "HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h"
},
M: {
1: "a"
},
A: {
2: "J D E F A B zB"
},
F: {
2: "F B C FC GC HC IC jB xB JC kB",
33: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
K: {
2: "A B C jB xB kB",
33: "b"
},
E: {
1: "vB wB DC lB",
2: "I n 5B sB 6B EC",
33: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB"
},
G: {
1: "vB wB lB",
2: "sB KC yB LC",
33: "E MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB"
},
P: {
33: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
I: {
2: "mB I fC gC hC iC yB",
33: "H jC kC"
}
},
B: 6,
C: "print-color-adjust property"
};
},
26004: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C"
},
C: {
1: "iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
16: "0B",
33: "0 1 2 3 4 5 6 7 8 9 mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB 1B 2B"
},
D: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J D E F A B C K L",
132: "0 1 2 3 4 G M N O o p q r s t u v w x y z"
},
E: {
1: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
16: "5B sB",
132: "I n J D E 6B 7B 8B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
16: "F B FC GC HC IC jB",
132: "C G M N O o p q r xB JC kB"
},
G: {
1: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB KC",
132: "E yB LC MC NC OC"
},
H: {
2: "eC"
},
I: {
1: "H",
16: "fC gC",
132: "mB I hC iC yB jC kC"
},
J: {
1: "A",
132: "D"
},
K: {
1: "b",
2: "A B jB",
132: "C xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
33: "zC"
}
},
B: 1,
C: "CSS :read-only and :read-write selectors"
};
},
20348: module => {
module.exports = {
A: {
A: {
2: "J D E F A zB",
132: "B"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B"
},
D: {
1: "7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "D E F A B C K L G 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J 5B sB 6B",
16: "7B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s t FC GC HC IC jB xB JC kB"
},
G: {
1: "E OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC NC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "Rebeccapurple color"
};
},
87605: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O",
33: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
33: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "5B sB",
33: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "F B C FC GC HC IC jB xB JC kB",
33: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
33: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
33: "mB I H fC gC hC iC yB jC kC"
},
J: {
33: "D A"
},
K: {
2: "A B C jB xB kB",
33: "b"
},
L: {
33: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
33: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
33: "xC"
},
R: {
33: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "CSS Reflections"
};
},
73087: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
420: "A B"
},
B: {
2: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
420: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "4 5 6 7 8 9 I n J D E F A B C K L AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
36: "G M N O",
66: "0 1 2 3 o p q r s t u v w x y z"
},
E: {
2: "I n J C K L G 5B sB 6B jB kB AC BC CC uB vB wB DC lB EC",
33: "D E F A B 7B 8B 9B tB"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "sB KC yB LC MC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
33: "E NC OC PC QC RC SC TC"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
420: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS Regions"
};
},
88199: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B",
33: "I n J D E F A B C K L G 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F",
33: "A B C K L G M N O o p q r s t u"
},
E: {
1: "D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB",
33: "J 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
2: "F B FC GC HC IC",
33: "C JC",
36: "jB xB"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB",
33: "LC MC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB fC gC hC",
33: "I iC yB"
},
J: {
1: "A",
2: "D"
},
K: {
1: "b kB",
2: "A B",
33: "C",
36: "jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS Repeating Gradients"
};
},
45413: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B",
33: "I"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC",
132: "kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 4,
C: "CSS resize property"
};
},
73038: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O P Q R S"
},
C: {
1: "XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB 1B 2B"
},
D: {
1: "T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S"
},
E: {
1: "A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B"
},
F: {
1: "dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB FC GC HC IC jB xB JC kB"
},
G: {
1: "QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "uC vC lB wC",
2: "I mC nC oC pC qC tB rC sC tC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS revert value"
};
},
3004: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB 1B 2B"
},
D: {
1: "TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB",
194: "LB MB NB OB PB QB RB nB SB oB"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B 9B"
},
F: {
1: "LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
194: "8 9 AB BB CB DB EB FB GB HB IB JB KB"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "pC qC tB rC sC tC uC vC lB wC",
2: "I",
194: "mC nC oC"
},
Q: {
2: "xC"
},
R: {
194: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "#rrggbbaa hex color notation"
};
},
11044: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O",
129: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z",
129: "oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
450: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB"
},
E: {
1: "vB wB DC lB EC",
2: "I n J D E F A B C K 5B sB 6B 7B 8B 9B tB jB kB AC",
578: "L G BC CC uB"
},
F: {
2: "F B C G M N O o p q r s t u v w FC GC HC IC jB xB JC kB",
129: "HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
450: "0 1 2 3 4 5 6 7 8 9 x y z AB BB CB DB EB FB GB"
},
G: {
1: "vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC",
578: "cC dC uB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
129: "lC"
},
P: {
1: "pC qC tB rC sC tC uC vC lB wC",
2: "I mC nC oC"
},
Q: {
129: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS Scroll-behavior"
};
},
40612: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y",
194: "Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T",
194: "X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
322: "U V W"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB FC GC HC IC jB xB JC kB",
194: "fB gB hB iB P Q R pB S T U V W X Y Z",
322: "dB eB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "CSS @scroll-timeline"
};
},
15046: module => {
module.exports = {
A: {
A: {
132: "J D E F A B zB"
},
B: {
2: "C K L G M N O",
292: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB 1B 2B",
3074: "UB",
4100: "b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
292: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
16: "I n 5B sB",
292: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "F B C FC GC HC IC jB xB JC kB",
292: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "bC cC dC uB vB wB lB",
16: "sB KC yB LC MC",
292: "NC",
804: "E OC PC QC RC SC TC UC VC WC XC YC ZC aC"
},
H: {
2: "eC"
},
I: {
16: "fC gC",
292: "mB I H hC iC yB jC kC"
},
J: {
292: "D A"
},
K: {
2: "A B C jB xB kB",
292: "b"
},
L: {
292: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
292: "lC"
},
P: {
292: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
292: "xC"
},
R: {
292: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "CSS scrollbar styling"
};
},
27986: module => {
module.exports = {
A: {
A: {
1: "D E F A B",
2: "zB",
8: "J"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "CSS 2.1 selectors"
};
},
97925: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "zB",
8: "J",
132: "D E"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
2: "0B mB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "5B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
2: "F"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "CSS3 selectors"
};
},
16385: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
33: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
2: "F"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
1: "A",
2: "D"
},
K: {
1: "C b xB kB",
16: "A B jB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
33: "zC"
}
},
B: 5,
C: "::selection CSS pseudo-element"
};
},
75326: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB 1B 2B",
322: "KB LB MB NB OB PB QB RB nB SB oB"
},
D: {
1: "6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 I n J D E F A B C K L G M N O o p q r s t u v w x y z",
194: "3 4 5"
},
E: {
1: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D 5B sB 6B 7B",
33: "E F A 8B 9B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s FC GC HC IC jB xB JC kB"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC NC",
33: "E OC PC QC RC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 4,
C: "CSS Shapes Level 1"
};
},
35569: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
6308: "A",
6436: "B"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
6436: "C K L G M N O"
},
C: {
1: "YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B",
2052: "8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB"
},
D: {
1: "ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB",
8258: "WB XB YB"
},
E: {
1: "B C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E 5B sB 6B 7B 8B",
3108: "F A 9B tB"
},
F: {
1: "b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB FC GC HC IC jB xB JC kB",
8258: "NB OB PB QB RB SB TB UB"
},
G: {
1: "TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC",
3108: "PC QC RC SC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "tB rC sC tC uC vC lB wC",
2: "I mC nC oC pC qC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2052: "zC"
}
},
B: 4,
C: "CSS Scroll Snap"
};
},
51105: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "c d e f g h i j k l a m H",
2: "C K L G",
1028: "P Q R S T U V W X Y Z",
4100: "M N O"
},
C: {
1: "nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u 1B 2B",
194: "0 v w x y z",
516: "1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB"
},
D: {
1: "c d e f g h i j k l a m H qB rB 3B 4B",
2: "6 7 8 9 I n J D E F A B C K L G M N O o p q r AB BB CB DB EB FB GB HB IB JB KB",
322: "0 1 2 3 4 5 s t u v w x y z LB MB NB OB",
1028: "PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z"
},
E: {
1: "K L G AC BC CC uB vB wB DC lB EC",
2: "I n J 5B sB 6B",
33: "E F A B C 8B 9B tB jB kB",
2084: "D 7B"
},
F: {
1: "iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
322: "8 9 AB",
1028: "BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB"
},
G: {
1: "XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC",
33: "E OC PC QC RC SC TC UC VC WC",
2084: "MC NC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1028: "lC"
},
P: {
1: "nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I mC"
},
Q: {
1028: "xC"
},
R: {
2: "yC"
},
S: {
516: "zC"
}
},
B: 5,
C: "CSS position:sticky"
};
},
56988: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "lB EC",
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS Subgrid"
};
},
96409: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
260: "C K L G M N O"
},
C: {
1: "OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o 1B 2B",
66: "p q",
260: "0 1 2 3 4 5 6 7 8 9 r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB"
},
D: {
1: "oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p q r s t u v w",
260: "0 1 2 3 4 5 6 7 8 9 x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB"
},
E: {
1: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E 5B sB 6B 7B 8B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC",
132: "kB"
},
G: {
1: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC"
},
H: {
132: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB",
132: "kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS.supports() API"
};
},
25235: module => {
module.exports = {
A: {
A: {
1: "E F A B",
2: "J D zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
132: "0B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "CSS Table display"
};
},
48644: module => {
module.exports = {
A: {
A: {
132: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
4: "C K L G M N O"
},
C: {
1: "IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B 1B 2B",
33: "0 1 2 3 4 5 6 7 8 9 C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB"
},
D: {
1: "GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 I n J D E F A B C K L G M N O o p q r s t u v w x y z",
322: "4 5 6 7 8 9 AB BB CB DB EB FB"
},
E: {
1: "lB EC",
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC"
},
F: {
1: "3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q FC GC HC IC jB xB JC kB",
578: "0 1 2 r s t u v w x y z"
},
G: {
1: "lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
132: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
2: "xC"
},
R: {
1: "yC"
},
S: {
33: "zC"
}
},
B: 5,
C: "CSS3 text-align-last"
};
},
81803: module => {
module.exports = {
A: {
A: {
132: "J D E F A B zB"
},
B: {
132: "C K L G M N O",
388: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
132: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
132: "0 1 2 3 4 5 6 I n J D E F A B C K L G M N O o p q r s t u v w x y z",
388: "7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "lB EC",
132: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC"
},
F: {
132: "F B C G M N O o p q r s t FC GC HC IC jB xB JC kB",
388: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
1: "lB",
132: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB"
},
H: {
132: "eC"
},
I: {
132: "mB I fC gC hC iC yB jC kC",
388: "H"
},
J: {
132: "D A"
},
K: {
132: "A B C jB xB kB",
388: "b"
},
L: {
388: "H"
},
M: {
132: "a"
},
N: {
132: "A B"
},
O: {
132: "lC"
},
P: {
132: "I",
388: "mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
388: "xC"
},
R: {
388: "yC"
},
S: {
132: "zC"
}
},
B: 5,
C: "CSS text-indent"
};
},
18170: module => {
module.exports = {
A: {
A: {
16: "J D zB",
132: "E F A B"
},
B: {
132: "C K L G M N O",
322: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB 1B 2B",
1025: "OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
1602: "NB"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB",
322: "CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "F B C G M N O o p q r s t u v w x y FC GC HC IC jB xB JC kB",
322: "0 1 2 3 4 5 6 7 8 9 z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I fC gC hC iC yB jC kC",
322: "H"
},
J: {
2: "D A"
},
K: {
2: "A B C jB xB kB",
322: "b"
},
L: {
322: "H"
},
M: {
1025: "a"
},
N: {
132: "A B"
},
O: {
2: "lC"
},
P: {
2: "I",
322: "mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
322: "xC"
},
R: {
322: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS text-justify"
};
},
75430: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B",
194: "7 8 9"
},
D: {
1: "HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB"
},
E: {
1: "L G BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B 9B",
16: "A",
33: "B C K tB jB kB AC"
},
F: {
1: "4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS text-orientation"
};
},
21547: module => {
module.exports = {
A: {
A: {
2: "J D zB",
161: "E F A B"
},
B: {
2: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
161: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
16: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS Text 4 text-spacing"
};
},
20408: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
129: "A B"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
129: "C K L G M N O"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
2: "0B mB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
260: "5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
2: "F"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
4: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "A",
4: "D"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
129: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS3 Text-shadow"
};
},
90327: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
132: "B",
164: "A"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
132: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB",
260: "OB"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB FC GC HC IC jB xB JC kB",
260: "BB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
132: "B",
164: "A"
},
O: {
2: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
16: "I"
},
Q: {
2: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS touch-action level 2 values"
};
},
1576: module => {
module.exports = {
A: {
A: {
1: "B",
2: "J D E F zB",
289: "A"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u v w x 1B 2B",
194: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB DB EB FB GB HB IB JB KB",
1025: "LB MB NB OB PB"
},
D: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r FC GC HC IC jB xB JC kB"
},
G: {
1: "XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC",
516: "QC RC SC TC UC VC WC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "B",
289: "A"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
194: "zC"
}
},
B: 2,
C: "CSS touch-action property"
};
},
9331: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B",
33: "n J D E F A B C K L G",
164: "I"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
33: "I n J D E F A B C K L G M N O o p q r s t u"
},
E: {
1: "D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
33: "J 6B",
164: "I n 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
2: "F FC GC",
33: "C",
164: "B HC IC jB xB JC"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
33: "MC",
164: "sB KC yB LC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
33: "mB I fC gC hC iC yB"
},
J: {
1: "A",
33: "D"
},
K: {
1: "b kB",
33: "C",
164: "A B jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "CSS3 Transitions"
};
},
71731: module => {
module.exports = {
A: {
A: {
132: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
132: "C K L G M N O"
},
C: {
1: "JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
33: "0 1 2 3 4 5 6 7 8 9 N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB",
132: "0B mB I n J D E F 1B 2B",
292: "A B C K L G M"
},
D: {
1: "HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
132: "I n J D E F A B C K L G M",
548: "0 1 2 3 4 5 6 7 8 9 N O o p q r s t u v w x y z AB BB CB DB EB FB GB"
},
E: {
132: "I n J D E 5B sB 6B 7B 8B",
548: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
132: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
132: "E sB KC yB LC MC NC OC",
548: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
16: "eC"
},
I: {
1: "H",
16: "mB I fC gC hC iC yB jC kC"
},
J: {
16: "D A"
},
K: {
1: "b",
16: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
132: "A B"
},
O: {
16: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
16: "I"
},
Q: {
16: "xC"
},
R: {
16: "yC"
},
S: {
33: "zC"
}
},
B: 4,
C: "CSS unicode-bidi property"
};
},
78277: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u v 1B 2B"
},
D: {
1: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s t u v w FC GC HC IC jB xB JC kB"
},
G: {
1: "QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS unset value"
};
},
21696: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L",
260: "G"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B"
},
D: {
1: "IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB",
194: "HB"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B",
260: "9B"
},
F: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
194: "4"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC",
260: "QC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS Variables (Custom Properties)"
};
},
79873: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "CSS @when / @else conditional rules"
};
},
94245: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D zB",
129: "E F"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p q r s t"
},
E: {
1: "D E F A B C K L G 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J 5B sB 6B 7B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
129: "F B FC GC HC IC jB xB JC"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC"
},
H: {
1: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
2: "D A"
},
K: {
1: "b kB",
2: "A B C jB xB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 2,
C: "CSS widows & orphans"
};
},
86344: module => {
module.exports = {
A: {
D: {
2: "I n J D E F A B C K L G M N O o p q",
33: "0 1 2 3 4 5 6 7 8 9 r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
L: {
33: "H"
},
B: {
2: "C K L G M N O",
33: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0B",
33: "0 1 2 3 4 5 6 7 8 9 mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
M: {
33: "a"
},
A: {
2: "J D E F A B zB"
},
F: {
2: "F B C FC GC HC IC jB xB JC kB",
33: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
K: {
2: "A B C jB xB kB",
33: "b"
},
E: {
2: "I n J 5B sB 6B 7B EC",
33: "D E F A B C K L G 8B 9B tB jB kB AC BC CC uB vB wB DC lB"
},
G: {
2: "sB KC yB LC MC",
33: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
P: {
2: "I",
33: "mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
I: {
2: "mB I fC gC hC iC yB",
33: "H jC kC"
}
},
B: 6,
C: "width: stretch property"
};
},
75143: module => {
module.exports = {
A: {
A: {
132: "J D E F A B zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B",
322: "5 6 7 8 9"
},
D: {
1: "HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J",
16: "D",
33: "0 1 2 3 4 5 6 7 8 9 E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB"
},
E: {
1: "B C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB",
16: "n",
33: "J D E F A 6B 7B 8B 9B tB"
},
F: {
1: "4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB",
33: "0 1 2 3 G M N O o p q r s t u v w x y z"
},
G: {
1: "TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB KC yB",
33: "E LC MC NC OC PC QC RC SC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "fC gC hC",
33: "mB I iC yB jC kC"
},
J: {
33: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
36: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
33: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS writing-mode property"
};
},
82789: module => {
module.exports = {
A: {
A: {
1: "J D zB",
129: "E F A B"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB"
},
H: {
2: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
129: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "CSS zoom"
};
},
57416: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "CSS3 attr() function for all properties"
};
},
74318: module => {
module.exports = {
A: {
A: {
1: "E F A B",
8: "J D zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
33: "0B mB I n J D E F A B C K L G M N O o p q r s t u v w x 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
33: "I n J D E F"
},
E: {
1: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
33: "I n 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
2: "F"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
33: "sB KC yB"
},
H: {
1: "eC"
},
I: {
1: "I H iC yB jC kC",
33: "mB fC gC hC"
},
J: {
1: "A",
33: "D"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "CSS3 Box-sizing"
};
},
25591: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
4: "0B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z GC HC IC jB xB JC kB",
2: "F",
4: "FC"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "CSS3 Colors"
};
},
64771: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
33: "0B mB I n J D E F A B C K L G M N O o p q r s t u v 1B 2B"
},
D: {
1: "YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
33: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB"
},
E: {
1: "B C K L G jB kB AC BC CC uB vB wB DC lB EC",
33: "I n J D E F A 5B sB 6B 7B 8B 9B tB"
},
F: {
1: "C OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z JC kB",
2: "F B FC GC HC IC jB xB",
33: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
33: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
33: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 3,
C: "CSS grab & grabbing cursors"
};
},
5619: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
33: "0B mB I n J D E F A B C K L G M N O o p q r s 1B 2B"
},
D: {
1: "6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
33: "0 1 2 3 4 5 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
33: "I n J D E 5B sB 6B 7B 8B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z JC kB",
2: "F B FC GC HC IC jB xB",
33: "G M N O o p q r s"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
33: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 4,
C: "CSS3 Cursors: zoom-in & zoom-out"
};
},
68865: module => {
module.exports = {
A: {
A: {
1: "F A B",
132: "J D E zB"
},
B: {
1: "L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
260: "C K"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
4: "0B mB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
4: "I"
},
E: {
1: "n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
4: "I 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
260: "F B C FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D",
16: "A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 4,
C: "CSS3 Cursors (original values)"
};
},
77239: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B",
33: "MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
164: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB"
},
D: {
1: "BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p",
132: "0 1 2 3 4 5 6 7 8 9 q r s t u v w x y z AB"
},
E: {
1: "L G AC BC CC uB vB wB DC lB EC",
2: "I n J 5B sB 6B",
132: "D E F A B C K 7B 8B 9B tB jB kB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F FC GC HC",
132: "G M N O o p q r s t u v w x",
164: "B C IC jB xB JC kB"
},
G: {
1: "aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC",
132: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC"
},
H: {
164: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB",
132: "jC kC"
},
J: {
132: "D A"
},
K: {
1: "b",
2: "A",
164: "B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
164: "zC"
}
},
B: 4,
C: "CSS3 tab-size"
};
},
63047: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
2: "F"
},
G: {
1: "E KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "CSS currentColor value"
};
},
8407: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
8: "A B"
},
B: {
1: "P",
2: "Q R S T U V W X Y Z c d e f g h i j k l a m H",
8: "C K L G M N O"
},
C: {
2: "0B mB I n J D E F A B C K L G M N O o p q r nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
66: "s t u v w x y",
72: "0 1 2 3 4 5 6 7 8 9 z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB"
},
D: {
1: "2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P",
2: "I n J D E F A B C K L G M N O o p q r s t u v Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
66: "0 1 w x y z"
},
E: {
2: "I n 5B sB 6B",
8: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB",
2: "F B C XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
66: "G M N O o"
},
G: {
2: "sB KC yB LC MC",
8: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "kC",
2: "mB I H fC gC hC iC yB jC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC",
2: "tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
72: "zC"
}
},
B: 7,
C: "Custom Elements (deprecated V0 spec)"
};
},
77551: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
8: "A B"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
8: "C K L G M N O"
},
C: {
1: "UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y 1B 2B",
8: "0 1 2 3 4 5 6 7 8 9 z AB BB CB DB EB FB GB HB IB",
456: "JB KB LB MB NB OB PB QB RB",
712: "nB SB oB TB"
},
D: {
1: "XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB",
8: "LB MB",
132: "NB OB PB QB RB nB SB oB TB UB b VB WB"
},
E: {
2: "I n J D 5B sB 6B 7B 8B",
8: "E F A 9B",
132: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
132: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC",
132: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I",
132: "mC"
},
Q: {
132: "xC"
},
R: {
132: "yC"
},
S: {
8: "zC"
}
},
B: 1,
C: "Custom Elements (V1)"
};
},
72560: module => {
module.exports = {
A: {
A: {
2: "J D E zB",
132: "F A B"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n 1B 2B",
132: "J D E F A"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I",
16: "n J D E K L",
388: "F A B C"
},
E: {
1: "D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB",
16: "n J",
388: "6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z JC kB",
2: "F FC GC HC IC",
132: "B jB xB"
},
G: {
1: "E MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "KC",
16: "sB yB",
388: "LC"
},
H: {
1: "eC"
},
I: {
1: "H jC kC",
2: "fC gC hC",
388: "mB I iC yB"
},
J: {
1: "A",
388: "D"
},
K: {
1: "C b kB",
2: "A",
132: "B jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
132: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "CustomEvent"
};
},
54101: module => {
module.exports = {
A: {
A: {
2: "zB",
8: "J D E F",
260: "A B"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
260: "C K L G",
1284: "M N O"
},
C: {
8: "0B mB 1B 2B",
516: "m H qB rB",
4612: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a"
},
D: {
1: "ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
8: "I n J D E F A B C K L G M N O o",
132: "0 1 2 3 4 5 6 7 8 9 p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB"
},
E: {
1: "K L G kB AC BC CC uB vB wB DC lB EC",
8: "I n J D E F A B C 5B sB 6B 7B 8B 9B tB jB"
},
F: {
1: "F B C b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
132: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB"
},
G: {
8: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC",
2049: "WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H kC",
8: "mB I fC gC hC iC yB jC"
},
J: {
1: "A",
8: "D"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
516: "a"
},
N: {
8: "A B"
},
O: {
8: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
132: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 1,
C: "Datalist element"
};
},
2014: module => {
module.exports = {
A: {
A: {
1: "B",
4: "J D E F A zB"
},
B: {
1: "C K L G M",
129: "N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB",
4: "0B mB I n 1B 2B",
129: "KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
1: "EB FB GB HB IB JB KB LB MB NB",
4: "I n J",
129: "0 1 2 3 4 5 6 7 8 9 D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
4: "I n 5B sB",
129: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "1 2 3 4 5 6 7 8 9 C AB jB xB JC kB",
4: "F B FC GC HC IC",
129: "0 G M N O o p q r s t u v w x y z BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
4: "sB KC yB",
129: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
4: "eC"
},
I: {
4: "fC gC hC",
129: "mB I H iC yB jC kC"
},
J: {
129: "D A"
},
K: {
1: "C jB xB kB",
4: "A B",
129: "b"
},
L: {
129: "H"
},
M: {
129: "a"
},
N: {
1: "B",
4: "A"
},
O: {
129: "lC"
},
P: {
129: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
129: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "dataset & data-* attributes"
};
},
25029: module => {
module.exports = {
A: {
A: {
2: "J D zB",
132: "E",
260: "F A B"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
260: "C K G M N O",
772: "L"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
260: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "Data URIs"
};
},
28167: module => {
module.exports = {
A: {
A: {
16: "zB",
132: "J D E F A B"
},
B: {
1: "O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
132: "C K L G M N"
},
C: {
1: "PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
132: "0B mB I n J D E F A B C K L G M N O o p q r s t u v w x 1B 2B",
260: "LB MB NB OB",
772: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB DB EB FB GB HB IB JB KB"
},
D: {
1: "aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
132: "I n J D E F A B C K L G M N O o p q r s",
260: "7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB",
772: "0 1 2 3 4 5 6 t u v w x y z"
},
E: {
1: "C K L G kB AC BC CC uB vB wB DC lB EC",
16: "I n 5B sB",
132: "J D E F A 6B 7B 8B 9B",
260: "B tB jB"
},
F: {
1: "QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
16: "F B C FC GC HC IC jB xB JC",
132: "kB",
260: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB",
772: "G M N O o p q r s t"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB KC yB LC",
132: "E MC NC OC PC QC RC"
},
H: {
132: "eC"
},
I: {
1: "H",
16: "mB fC gC hC",
132: "I iC yB",
772: "jC kC"
},
J: {
132: "D A"
},
K: {
1: "b",
16: "A B C jB xB",
132: "kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
132: "A B"
},
O: {
260: "lC"
},
P: {
1: "qC tB rC sC tC uC vC lB wC",
260: "I mC nC oC pC"
},
Q: {
260: "xC"
},
R: {
132: "yC"
},
S: {
132: "zC"
}
},
B: 6,
C: "Date.prototype.toLocaleDateString"
};
},
19178: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "Z c d e f g h i j k l a m H",
2: "C K L G M N O P Q R S T U V W X Y"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T",
66: "U V W X Y"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB",
16: "EC"
},
F: {
1: "hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "vC lB wC",
2: "I mC nC oC pC qC tB rC sC tC uC"
},
Q: {
16: "xC"
},
R: {
16: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "Declarative Shadow DOM"
};
},
96563: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "Decorators"
};
},
93672: module => {
module.exports = {
A: {
A: {
2: "F A B zB",
8: "J D E"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B",
8: "0 1 2 3 4 5 6 7 8 9 mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB 1B 2B",
194: "GB HB"
},
D: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
8: "I n J D E F A B",
257: "0 1 2 3 4 o p q r s t u v w x y z",
769: "C K L G M N O"
},
E: {
1: "C K L G kB AC BC CC uB vB wB DC lB EC",
8: "I n 5B sB 6B",
257: "J D E F A 7B 8B 9B",
1025: "B tB jB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "C jB xB JC kB",
8: "F B FC GC HC IC"
},
G: {
1: "E MC NC OC PC QC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
8: "sB KC yB LC",
1025: "RC SC TC"
},
H: {
8: "eC"
},
I: {
1: "I H iC yB jC kC",
8: "mB fC gC hC"
},
J: {
1: "A",
8: "D"
},
K: {
1: "b",
8: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
769: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Details & Summary elements"
};
},
12506: module => {
module.exports = {
A: {
A: {
2: "J D E F A zB",
132: "B"
},
B: {
1: "C K L G M N O",
4: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0B mB 1B",
4: "0 1 2 3 4 5 6 7 8 9 J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
8: "I n 2B"
},
D: {
2: "I n J",
4: "0 1 2 3 4 5 6 7 8 9 D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "F B C FC GC HC IC jB xB JC kB",
4: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "sB KC",
4: "E yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "fC gC hC",
4: "mB I H iC yB jC kC"
},
J: {
2: "D",
4: "A"
},
K: {
1: "C kB",
2: "A B jB xB",
4: "b"
},
L: {
4: "H"
},
M: {
4: "a"
},
N: {
1: "B",
2: "A"
},
O: {
4: "lC"
},
P: {
4: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
4: "xC"
},
R: {
4: "yC"
},
S: {
4: "zC"
}
},
B: 4,
C: "DeviceOrientation & DeviceMotion events"
};
},
87937: module => {
module.exports = {
A: {
A: {
1: "B",
2: "J D E F A zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z JC kB",
2: "F B FC GC HC IC jB xB"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "C b kB",
2: "A B jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "B",
2: "A"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "Window.devicePixelRatio"
};
},
5217: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB 1B 2B",
194: "MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P",
1218: "Q R pB S T U V W X Y Z c d e f g h i"
},
D: {
1: "6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 I n J D E F A B C K L G M N O o p q r s t u v w x y z",
322: "1 2 3 4 5"
},
E: {
1: "vB wB DC lB EC",
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O FC GC HC IC jB xB JC kB",
578: "o p q r s"
},
G: {
1: "vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 1,
C: "Dialog element"
};
},
97555: module => {
module.exports = {
A: {
A: {
1: "B",
16: "zB",
129: "F A",
130: "J D E"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
16: "5B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
16: "F"
},
G: {
1: "E KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB"
},
H: {
1: "eC"
},
I: {
1: "mB I H hC iC yB jC kC",
16: "fC gC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "B",
129: "A"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "EventTarget.dispatchEvent"
};
},
8877: module => {
module.exports = {
A: {
A: {
132: "J D E F A B zB"
},
B: {
132: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
132: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
132: "0 1 2 3 4 5 6 7 8 9 I n AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
388: "J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
132: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
132: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
132: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
132: "eC"
},
I: {
132: "mB I H fC gC hC iC yB jC kC"
},
J: {
132: "D A"
},
K: {
132: "A B C b jB xB kB"
},
L: {
132: "H"
},
M: {
132: "a"
},
N: {
132: "A B"
},
O: {
132: "lC"
},
P: {
132: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
132: "xC"
},
R: {
132: "yC"
},
S: {
132: "zC"
}
},
B: 6,
C: "DNSSEC and DANE"
};
},
54670: module => {
module.exports = {
A: {
A: {
2: "J D E zB",
164: "F A",
260: "B"
},
B: {
1: "N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
260: "C K L G M"
},
C: {
1: "1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E 1B 2B",
516: "0 F A B C K L G M N O o p q r s t u v w x y z"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p q r"
},
E: {
1: "J A B C 6B 9B tB jB",
2: "I n K L G 5B sB kB AC BC CC uB vB wB DC lB EC",
1028: "D E F 7B 8B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
2: "F B FC GC HC IC jB xB JC"
},
G: {
1: "PC QC RC SC TC UC VC",
2: "sB KC yB LC MC WC XC YC ZC aC bC cC dC uB vB wB lB",
1028: "E NC OC"
},
H: {
1: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
16: "D",
1028: "A"
},
K: {
1: "b kB",
16: "A B C jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
164: "A",
260: "B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "Do Not Track API"
};
},
97181: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p q r s t u v w x"
},
E: {
1: "E F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D 5B sB 6B 7B 8B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G FC GC HC IC jB xB JC kB"
},
G: {
1: "E OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC NC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "document.currentScript"
};
},
10427: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
16: "0B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
16: "F"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 7,
C: "document.evaluate & XPath"
};
},
69211: module => {
module.exports = {
A: {
A: {
1: "J D E F A B zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
16: "I n 5B sB 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z GC HC IC jB xB JC kB",
16: "F FC"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC",
16: "yB LC MC"
},
H: {
2: "eC"
},
I: {
1: "H iC yB jC kC",
2: "mB I fC gC hC"
},
J: {
1: "A",
2: "D"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "B",
2: "A"
},
O: {
2: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 7,
C: "Document.execCommand()"
};
},
69151: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T",
132: "U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T",
132: "U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB FC GC HC IC jB xB JC kB",
132: "bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I fC gC hC iC yB jC kC",
132: "H"
},
J: {
2: "D A"
},
K: {
2: "A B C jB xB kB",
132: "b"
},
L: {
132: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "Document Policy"
};
},
10529: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
16: "C K"
},
C: {
1: "HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB 1B 2B"
},
D: {
1: "DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB"
},
E: {
1: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E 5B sB 6B 7B 8B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB"
},
G: {
1: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "document.scrollingElement"
};
},
29709: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB",
16: "n"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z jB xB JC kB",
2: "F FC GC HC IC"
},
G: {
1: "E KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB"
},
H: {
1: "eC"
},
I: {
1: "mB I H hC iC yB jC kC",
16: "fC gC"
},
J: {
1: "D A"
},
K: {
1: "B C b jB xB kB",
2: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "document.head"
};
},
97801: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M"
},
C: {
1: "IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB 1B 2B"
},
D: {
1: "NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB",
194: "LB MB"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B 9B"
},
F: {
1: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
194: "9"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I mC"
},
Q: {
194: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 1,
C: "DOM manipulation convenience methods"
};
},
22729: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "zB",
8: "J D E"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Document Object Model Range"
};
},
31071: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "DOMContentLoaded"
};
},
46139: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J D E F A B C K L G M N O o p q r s t u"
},
E: {
1: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB",
16: "n"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z JC kB",
16: "F B FC GC HC IC jB xB"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB KC yB LC MC"
},
H: {
16: "eC"
},
I: {
1: "I H iC yB jC kC",
16: "mB fC gC hC"
},
J: {
16: "D A"
},
K: {
1: "b",
16: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
16: "A B"
},
O: {
16: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "DOMFocusIn & DOMFocusOut events"
};
},
81533: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
132: "A B"
},
B: {
132: "C K L G M N O",
1028: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B",
1028: "ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2564: "2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB",
3076: "IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB"
},
D: {
16: "I n J D",
132: "0 1 2 3 4 5 6 7 8 9 F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB",
388: "E",
1028: "oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
16: "I 5B sB",
132: "n J D E F A 6B 7B 8B 9B tB",
1028: "B C K L G jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "F B C FC GC HC IC jB xB JC kB",
132: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB",
1028: "HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
16: "sB KC yB",
132: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
132: "I iC yB jC kC",
292: "mB fC gC hC",
1028: "H"
},
J: {
16: "D",
132: "A"
},
K: {
2: "A B C jB xB kB",
1028: "b"
},
L: {
1028: "H"
},
M: {
1028: "a"
},
N: {
132: "A B"
},
O: {
132: "lC"
},
P: {
132: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
132: "xC"
},
R: {
132: "yC"
},
S: {
2564: "zC"
}
},
B: 4,
C: "DOMMatrix"
};
},
76777: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K"
},
E: {
1: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
1: "A",
2: "D"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Download attribute"
};
},
37541: module => {
module.exports = {
A: {
A: {
644: "J D E F zB",
772: "A B"
},
B: {
1: "O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
260: "C K L G M N"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
8: "0B mB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
8: "F B FC GC HC IC jB xB JC"
},
G: {
1: "dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC"
},
H: {
2: "eC"
},
I: {
2: "mB I fC gC hC iC yB jC kC",
1025: "H"
},
J: {
2: "D A"
},
K: {
1: "kB",
8: "A B C jB xB",
1025: "b"
},
L: {
1025: "H"
},
M: {
2: "a"
},
N: {
1: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 1,
C: "Drag and Drop"
};
},
68634: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L"
},
C: {
1: "4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B"
},
D: {
1: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E 5B sB 6B 7B 8B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s t u v w FC GC HC IC jB xB JC kB"
},
G: {
1: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
2: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Element.closest()"
};
},
80051: module => {
module.exports = {
A: {
A: {
1: "J D E F A B",
16: "zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
16: "0B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J D E F A B C K L"
},
E: {
1: "n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
16: "I 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z jB xB JC kB",
16: "F FC GC HC IC"
},
G: {
1: "E KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB"
},
H: {
1: "eC"
},
I: {
1: "mB I H hC iC yB jC kC",
16: "fC gC"
},
J: {
1: "D A"
},
K: {
1: "C b kB",
16: "A B jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "document.elementFromPoint()"
};
},
22268: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B"
},
D: {
1: "oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB"
},
E: {
1: "L G BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B 9B",
132: "A B C K tB jB kB AC"
},
F: {
1: "HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB FC GC HC IC jB xB JC kB"
},
G: {
1: "cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC",
132: "RC SC TC UC VC WC XC YC ZC aC bC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "pC qC tB rC sC tC uC vC lB wC",
2: "I mC nC oC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "Scroll methods on elements (scroll, scrollTo, scrollBy)"
};
},
48244: module => {
module.exports = {
A: {
A: {
2: "J D E F A zB",
164: "B"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B"
},
D: {
1: "BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 I n J D E F A B C K L G M N O o p q r s t u v w x y z",
132: "4 5 6 7 8 9 AB"
},
E: {
1: "C K L G kB AC BC CC uB vB wB DC lB EC",
2: "I n J 5B sB 6B 7B",
164: "D E F A B 8B 9B tB jB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q FC GC HC IC jB xB JC kB",
132: "r s t u v w x"
},
G: {
1: "UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
16: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "Encrypted Media Extensions"
};
},
61245: module => {
module.exports = {
A: {
A: {
1: "J D E F A B",
2: "zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "EOT - Embedded OpenType fonts"
};
},
86980: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D zB",
260: "F",
1026: "E"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
4: "0B mB 1B 2B",
132: "I n J D E F A B C K L G M N O o p"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
4: "I n J D E F A B C K L G M N O",
132: "o p q r"
},
E: {
1: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
4: "I n 5B sB 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
4: "F B C FC GC HC IC jB xB JC",
132: "kB"
},
G: {
1: "E MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
4: "sB KC yB LC"
},
H: {
132: "eC"
},
I: {
1: "H jC kC",
4: "mB fC gC hC",
132: "iC yB",
900: "I"
},
J: {
1: "A",
4: "D"
},
K: {
1: "b",
4: "A B C jB xB",
132: "kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "ECMAScript 5"
};
},
29725: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C"
},
C: {
1: "EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB 1B 2B"
},
D: {
1: "IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB",
132: "BB CB DB EB FB GB HB"
},
E: {
1: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E 5B sB 6B 7B 8B"
},
F: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s t u v w x FC GC HC IC jB xB JC kB",
132: "0 1 2 3 4 y z"
},
G: {
1: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "ES6 classes"
};
},
21619: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u 1B 2B"
},
D: {
1: "8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B 9B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s t u FC GC HC IC jB xB JC kB"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "ES6 Generators"
};
},
89414: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB 1B 2B",
194: "WB"
},
D: {
1: "UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB"
},
E: {
1: "C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A B 5B sB 6B 7B 8B 9B tB"
},
F: {
1: "JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB FC GC HC IC jB xB JC kB"
},
G: {
1: "TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "pC qC tB rC sC tC uC vC lB wC",
2: "I mC nC oC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "JavaScript modules: dynamic import()"
};
},
94355: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L",
4097: "M N O",
4290: "G"
},
C: {
1: "SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB 1B 2B",
322: "NB OB PB QB RB nB"
},
D: {
1: "oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB",
194: "SB"
},
E: {
1: "B C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B",
3076: "tB"
},
F: {
1: "HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB FC GC HC IC jB xB JC kB",
194: "GB"
},
G: {
1: "TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC",
3076: "SC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "pC qC tB rC sC tC uC vC lB wC",
2: "I mC nC oC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 1,
C: "JavaScript modules via script tag"
};
},
45885: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G 1B 2B",
132: "M N O o p q r s t",
260: "u v w x y z",
516: "0"
},
D: {
1: "3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O",
1028: "0 1 2 o p q r s t u v w x y z"
},
E: {
1: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E 5B sB 6B 7B 8B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB",
1028: "G M N O o p"
},
G: {
1: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC",
1028: "iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "ES6 Number"
};
},
50818: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B"
},
D: {
1: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E 5B sB 6B 7B 8B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s t u v w FC GC HC IC jB xB JC kB"
},
G: {
1: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "String.prototype.includes"
};
},
24949: module => {
module.exports = {
A: {
A: {
2: "J D E F A zB",
388: "B"
},
B: {
257: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
260: "C K L",
769: "G M N O"
},
C: {
2: "0B mB I n 1B 2B",
4: "0 1 2 3 4 5 6 7 8 9 J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB",
257: "NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
2: "I n J D E F A B C K L G M N O o p",
4: "0 1 2 3 4 5 6 7 8 9 q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB",
257: "KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D 5B sB 6B 7B",
4: "E F 8B 9B"
},
F: {
2: "F B C FC GC HC IC jB xB JC kB",
4: "0 1 2 3 4 5 6 G M N O o p q r s t u v w x y z",
257: "7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC",
4: "E NC OC PC QC"
},
H: {
2: "eC"
},
I: {
2: "mB I fC gC hC iC yB",
4: "jC kC",
257: "H"
},
J: {
2: "D",
4: "A"
},
K: {
2: "A B C jB xB kB",
257: "b"
},
L: {
257: "H"
},
M: {
257: "a"
},
N: {
2: "A",
388: "B"
},
O: {
257: "lC"
},
P: {
4: "I",
257: "mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
257: "xC"
},
R: {
4: "yC"
},
S: {
4: "zC"
}
},
B: 6,
C: "ECMAScript 2015 (ES6)"
};
},
54961: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n"
},
E: {
1: "n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z jB xB JC kB",
4: "F FC GC HC IC"
},
G: {
1: "E KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
1: "D A"
},
K: {
1: "C b jB xB kB",
4: "A B"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Server-sent events"
};
},
61448: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "L G AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A B C K 5B sB 6B 7B 8B 9B tB jB kB"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "ui-serif, ui-sans-serif, ui-monospace and ui-rounded values for font-family"
};
},
45085: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W",
2: "C K L G M N O",
1025: "X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB 1B 2B",
260: "eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
1: "eB fB gB hB iB P Q R S T U V W",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB",
132: "SB oB TB UB b VB WB XB YB ZB aB bB cB dB",
1025: "X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B 5B sB 6B 7B 8B 9B tB",
772: "C K L G jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "TB UB b VB WB XB YB ZB aB bB cB dB eB",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB FC GC HC IC jB xB JC kB",
132: "GB HB IB JB KB LB MB NB OB PB QB RB SB",
1025: "fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC",
772: "UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1025: "H"
},
M: {
260: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "rC sC tC uC vC lB wC",
2: "I mC nC oC",
132: "pC qC tB"
},
Q: {
132: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "Feature Policy"
};
},
21760: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K"
},
C: {
1: "9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B",
1025: "8",
1218: "3 4 5 6 7"
},
D: {
1: "BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 I n J D E F A B C K L G M N O o p q r s t u v w x y z",
260: "9",
772: "AB"
},
E: {
1: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s t u v FC GC HC IC jB xB JC kB",
260: "w",
772: "x"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Fetch"
};
},
48341: module => {
module.exports = {
A: {
A: {
16: "zB",
132: "E F",
388: "J D A B"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G",
16: "M N O o"
},
E: {
1: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z GC HC IC jB xB JC kB",
16: "F FC"
},
G: {
1: "E MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC"
},
H: {
388: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
1: "A",
2: "D"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A",
260: "B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "disabled attribute of the fieldset element"
};
},
61287: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
260: "A B"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
260: "C K L G M N O"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B",
260: "I n J D E F A B C K L G M N O o p q r s t u v w 2B"
},
D: {
1: "7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n",
260: "0 1 2 3 4 5 6 K L G M N O o p q r s t u v w x y z",
388: "J D E F A B C"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB",
260: "J D E F 7B 8B 9B",
388: "6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B FC GC HC IC",
260: "C G M N O o p q r s t jB xB JC kB"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC",
260: "E MC NC OC PC QC"
},
H: {
2: "eC"
},
I: {
1: "H kC",
2: "fC gC hC",
260: "jC",
388: "mB I iC yB"
},
J: {
260: "A",
388: "D"
},
K: {
1: "b",
2: "A B",
260: "C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A",
260: "B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "File API"
};
},
12789: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
132: "A B"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 2B",
2: "0B mB 1B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n"
},
E: {
1: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z jB xB JC kB",
2: "F B FC GC HC IC"
},
G: {
1: "E MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC"
},
H: {
2: "eC"
},
I: {
1: "mB I H iC yB jC kC",
2: "fC gC hC"
},
J: {
1: "A",
2: "D"
},
K: {
1: "C b jB xB kB",
2: "A B"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "FileReader API"
};
},
86229: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J D E F A B C K L"
},
E: {
1: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z JC kB",
2: "F FC GC",
16: "B HC IC jB xB"
},
G: {
1: "E MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
1: "A",
2: "D"
},
K: {
1: "C b xB kB",
2: "A",
16: "B jB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "FileReaderSync"
};
},
39434: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O",
33: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "I n J D",
33: "0 1 2 3 4 5 6 7 8 9 K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
36: "E F A B C"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "F B C FC GC HC IC jB xB JC kB",
33: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D",
33: "A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
33: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I",
33: "mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "Filesystem & FileWriter API"
};
},
86959: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G"
},
C: {
1: "KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB 1B 2B"
},
D: {
1: "PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB",
16: "DB EB FB",
388: "GB HB IB JB KB LB MB NB OB"
},
E: {
1: "K L G AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B tB",
516: "B C jB kB"
},
F: {
1: "BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB FC GC HC IC jB xB JC kB"
},
G: {
1: "TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "fC gC hC",
16: "mB I iC yB jC kC"
},
J: {
1: "A",
2: "D"
},
K: {
1: "b kB",
16: "A B C jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
129: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "FLAC audio format"
};
},
85734: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O P Q R S"
},
C: {
1: "UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB 1B 2B"
},
D: {
1: "T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S"
},
E: {
1: "G BC CC uB vB wB DC lB EC",
2: "I n J D E F A B C K L 5B sB 6B 7B 8B 9B tB jB kB AC"
},
F: {
1: "aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB FC GC HC IC jB xB JC kB"
},
G: {
1: "cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "uC vC lB wC",
2: "I mC nC oC pC qC tB rC sC tC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "gap property for Flexbox"
};
},
17662: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
1028: "B",
1316: "A"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
164: "0B mB I n J D E F A B C K L G M N O o p q 1B 2B",
516: "r s t u v w"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
33: "q r s t u v w x",
164: "I n J D E F A B C K L G M N O o p"
},
E: {
1: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
33: "D E 7B 8B",
164: "I n J 5B sB 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
2: "F B C FC GC HC IC jB xB JC",
33: "G M"
},
G: {
1: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
33: "E NC OC",
164: "sB KC yB LC MC"
},
H: {
1: "eC"
},
I: {
1: "H jC kC",
164: "mB I fC gC hC iC yB"
},
J: {
1: "A",
164: "D"
},
K: {
1: "b kB",
2: "A B C jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "B",
292: "A"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS Flexible Box Layout Module"
};
},
49729: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB 1B 2B"
},
D: {
1: "RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB"
},
E: {
1: "K L G AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A B C 5B sB 6B 7B 8B 9B tB jB kB"
},
F: {
1: "EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB FC GC HC IC jB xB JC kB"
},
G: {
1: "XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "oC pC qC tB rC sC tC uC vC lB wC",
2: "I mC nC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "display: flow-root"
};
},
75298: module => {
module.exports = {
A: {
A: {
1: "J D E F A B",
2: "zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J D E F A B C K L"
},
E: {
1: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
16: "I n 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z JC kB",
2: "F FC GC HC IC",
16: "B jB xB"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB"
},
H: {
2: "eC"
},
I: {
1: "I H iC yB jC kC",
2: "fC gC hC",
16: "mB"
},
J: {
1: "D A"
},
K: {
1: "C b kB",
2: "A",
16: "B jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "focusin & focusout events"
};
},
49394: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M",
132: "N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 1,
C: "preventScroll support in focus"
};
},
45246: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB 1B 2B",
132: "CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c"
},
D: {
1: "PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB",
260: "MB NB OB"
},
E: {
1: "B C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E 5B sB 6B 7B 8B",
16: "F",
132: "A 9B tB"
},
F: {
1: "CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB FC GC HC IC jB xB JC kB"
},
G: {
1: "TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC",
132: "PC QC RC SC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I mC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
132: "zC"
}
},
B: 5,
C: "system-ui value for font-family"
};
},
40678: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B",
33: "0 1 2 G M N O o p q r s t u v w x y z",
164: "I n J D E F A B C K L"
},
D: {
1: "HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G",
33: "0 1 2 3 4 5 6 7 8 9 q r s t u v w x y z AB BB CB DB EB FB GB",
292: "M N O o p"
},
E: {
1: "A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "D E F 5B sB 7B 8B",
4: "I n J 6B"
},
F: {
1: "4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB",
33: "0 1 2 3 G M N O o p q r s t u v w x y z"
},
G: {
1: "QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E NC OC PC",
4: "sB KC yB LC MC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB",
33: "jC kC"
},
J: {
2: "D",
33: "A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
33: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS font-feature-settings"
};
},
43001: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s 1B 2B",
194: "0 1 2 t u v w x y z"
},
D: {
1: "2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p q r s t u v w x",
33: "0 1 y z"
},
E: {
1: "A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J 5B sB 6B 7B",
33: "D E F 8B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G FC GC HC IC jB xB JC kB",
33: "M N O o"
},
G: {
1: "VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC NC",
33: "E OC PC QC RC SC TC UC"
},
H: {
2: "eC"
},
I: {
1: "H kC",
2: "mB I fC gC hC iC yB",
33: "jC"
},
J: {
2: "D",
33: "A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS3 font-kerning"
};
},
46102: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B",
194: "4 5 6 7 8 9"
},
D: {
1: "4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B 9B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q FC GC HC IC jB xB JC kB"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "CSS Font Loading"
};
},
53991: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U",
194: "V"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "@font-face metrics overrides"
};
},
49197: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O",
194: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
2: "0B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB",
194: "CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "F B C G M N O o p q r s t u v w x y FC GC HC IC jB xB JC kB",
194: "0 1 2 3 4 5 6 7 8 9 z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
258: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
194: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 4,
C: "CSS font-size-adjust"
};
},
89145: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O",
676: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0B mB I n J D E F A B C K L G M N O o p q r s t 1B 2B",
804: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
2: "I",
676: "0 1 2 3 4 5 6 7 8 9 n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "5B sB",
676: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "F B C FC GC HC IC jB xB JC kB",
676: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
804: "zC"
}
},
B: 7,
C: "CSS font-smooth"
};
},
75033: module => {
module.exports = {
A: {
A: {
2: "J D E zB",
4: "F A B"
},
B: {
1: "N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
4: "C K L G M"
},
C: {
1: "DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B",
194: "5 6 7 8 9 AB BB CB"
},
D: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
4: "0 1 2 3 4 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
4: "I n J D E F 5B sB 6B 7B 8B 9B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB",
4: "G M N O o p q r"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
4: "E sB KC yB LC MC NC OC PC QC"
},
H: {
2: "eC"
},
I: {
1: "H",
4: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D",
4: "A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
4: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
4: "I"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "Font unicode-range subsetting"
};
},
90974: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
130: "A B"
},
B: {
130: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B",
130: "I n J D E F A B C K L G M N O o p q r s",
322: "0 1 2 t u v w x y z"
},
D: {
2: "I n J D E F A B C K L G",
130: "0 1 2 3 4 5 6 7 8 9 M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "D E F 5B sB 7B 8B",
130: "I n J 6B"
},
F: {
2: "F B C FC GC HC IC jB xB JC kB",
130: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
1: "QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB NC OC PC",
130: "KC yB LC MC"
},
H: {
2: "eC"
},
I: {
2: "mB I fC gC hC iC yB",
130: "H jC kC"
},
J: {
2: "D",
130: "A"
},
K: {
2: "A B C jB xB kB",
130: "b"
},
L: {
130: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
130: "lC"
},
P: {
130: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
130: "xC"
},
R: {
130: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "CSS font-variant-alternates"
};
},
27169: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B"
},
D: {
1: "LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB"
},
E: {
1: "A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B"
},
F: {
1: "8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB"
},
G: {
1: "QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D",
16: "A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I mC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "CSS font-variant-numeric"
};
},
32879: module => {
module.exports = {
A: {
A: {
1: "F A B",
132: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
2: "0B mB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "5B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z GC HC IC jB xB JC kB",
2: "F FC"
},
G: {
1: "E yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
260: "sB KC"
},
H: {
2: "eC"
},
I: {
1: "I H iC yB jC kC",
2: "fC",
4: "mB gC hC"
},
J: {
1: "A",
4: "D"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "@font-face Web fonts"
};
},
76806: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F"
},
E: {
1: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB",
16: "n"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
2: "F"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB"
},
H: {
1: "eC"
},
I: {
1: "mB I H iC yB jC kC",
2: "fC gC hC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Form attribute"
};
},
33732: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J D E F A B C K L"
},
E: {
1: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z IC jB xB JC kB",
2: "F FC",
16: "GC HC"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB"
},
H: {
1: "eC"
},
I: {
1: "I H iC yB jC kC",
2: "fC gC hC",
16: "mB"
},
J: {
1: "A",
2: "D"
},
K: {
1: "B C b jB xB kB",
16: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Attributes for form submission"
};
},
70697: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F"
},
E: {
1: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB",
132: "n J D E F A 6B 7B 8B 9B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z GC HC IC jB xB JC kB",
2: "F FC"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB",
132: "E KC yB LC MC NC OC PC QC RC"
},
H: {
516: "eC"
},
I: {
1: "H kC",
2: "mB fC gC hC",
132: "I iC yB jC"
},
J: {
1: "A",
132: "D"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
260: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
132: "zC"
}
},
B: 1,
C: "Form validation"
};
},
21964: module => {
module.exports = {
A: {
A: {
2: "zB",
4: "A B",
8: "J D E F"
},
B: {
1: "M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
4: "C K L G"
},
C: {
4: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
8: "0B mB 1B 2B"
},
D: {
1: "oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
4: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB"
},
E: {
4: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
8: "5B sB"
},
F: {
1: "F B C LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
4: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB"
},
G: {
2: "sB",
4: "E KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB",
4: "jC kC"
},
J: {
2: "D",
4: "A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
4: "a"
},
N: {
4: "A B"
},
O: {
1: "lC"
},
P: {
1: "pC qC tB rC sC tC uC vC lB wC",
4: "I mC nC oC"
},
Q: {
1: "xC"
},
R: {
4: "yC"
},
S: {
4: "zC"
}
},
B: 1,
C: "HTML5 form features"
};
},
25424: module => {
module.exports = {
A: {
A: {
2: "J D E F A zB",
548: "B"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
516: "C K L G M N O"
},
C: {
1: "b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F 1B 2B",
676: "0 1 2 3 4 5 6 7 8 9 A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB",
1700: "GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB"
},
D: {
1: "bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L",
676: "G M N O o",
804: "0 1 2 3 4 5 6 7 8 9 p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB"
},
E: {
2: "I n 5B sB",
548: "vB wB DC lB EC",
676: "6B",
804: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB"
},
F: {
1: "b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
2: "F B C FC GC HC IC jB xB JC",
804: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC",
2052: "VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D",
292: "A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A",
548: "B"
},
O: {
804: "lC"
},
P: {
1: "tB rC sC tC uC vC lB wC",
804: "I mC nC oC pC qC"
},
Q: {
804: "xC"
},
R: {
804: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Full Screen API"
};
},
79145: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u v w x 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p",
33: "q r s t"
},
E: {
1: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s FC GC HC IC jB xB JC kB"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "Gamepad API"
};
},
13541: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "zB",
8: "J D E"
},
B: {
1: "C K L G M N O",
129: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB 1B 2B",
8: "0B mB",
129: "OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB",
4: "I",
129: "JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "n J D E F B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
8: "I 5B sB",
129: "A"
},
F: {
1: "0 1 2 3 4 5 6 7 B C M N O o p q r s t u v w x y z IC jB xB JC kB",
2: "F G FC",
8: "GC HC",
129: "8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC",
129: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "mB I fC gC hC iC yB jC kC",
129: "H"
},
J: {
1: "D A"
},
K: {
1: "B C jB xB kB",
8: "A",
129: "b"
},
L: {
129: "H"
},
M: {
129: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I",
129: "mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
129: "xC"
},
R: {
129: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "Geolocation"
};
},
48535: module => {
module.exports = {
A: {
A: {
644: "J D zB",
2049: "F A B",
2692: "E"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2049: "C K L G M N O"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B",
260: "I n J D E F A B",
1156: "mB",
1284: "1B",
1796: "2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
16: "5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z IC jB xB JC kB",
16: "F FC",
132: "GC HC"
},
G: {
1: "E KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB"
},
H: {
1: "eC"
},
I: {
1: "mB I H hC iC yB jC kC",
16: "fC gC"
},
J: {
1: "D A"
},
K: {
1: "B C b jB xB kB",
132: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2049: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "Element.getBoundingClientRect()"
};
},
65590: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B",
132: "mB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
260: "I n J D E F A"
},
E: {
1: "n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
260: "I 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z IC jB xB JC kB",
260: "F FC GC HC"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
260: "sB KC yB"
},
H: {
260: "eC"
},
I: {
1: "I H iC yB jC kC",
260: "mB fC gC hC"
},
J: {
1: "A",
260: "D"
},
K: {
1: "B C b jB xB kB",
260: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "getComputedStyle"
};
},
50730: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "zB",
8: "J D E"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
8: "0B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
2: "F"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "getElementsByClassName"
};
},
74634: module => {
module.exports = {
A: {
A: {
2: "J D E F A zB",
33: "B"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A"
},
E: {
1: "D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J 5B sB 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
1: "A",
2: "D"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A",
33: "B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "crypto.getRandomValues()"
};
},
23735: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB",
194: "RB nB SB oB TB UB b VB WB"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 4,
C: "Gyroscope"
};
},
47627: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L"
},
C: {
1: "HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB 1B 2B"
},
D: {
1: "6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
2: "I n J D 5B sB 6B 7B 8B",
129: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
194: "E F A 9B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s FC GC HC IC jB xB JC kB"
},
G: {
2: "sB KC yB LC MC NC",
129: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
194: "E OC PC QC RC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "navigator.hardwareConcurrency"
};
},
5807: module => {
module.exports = {
A: {
A: {
1: "E F A B",
8: "J D zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 2B",
8: "0B mB 1B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
8: "I"
},
E: {
1: "n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
8: "I 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z IC jB xB JC kB",
8: "F FC GC HC"
},
G: {
1: "E KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB"
},
H: {
2: "eC"
},
I: {
1: "mB I H gC hC iC yB jC kC",
2: "fC"
},
J: {
1: "D A"
},
K: {
1: "B C b jB xB kB",
8: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Hashchange event"
};
},
37961: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A 5B sB 6B 7B 8B 9B tB",
130: "B C K L G jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC",
130: "TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "HEIF/ISO Base Media File Format"
};
},
37216: module => {
module.exports = {
A: {
A: {
2: "J D E F A zB",
132: "B"
},
B: {
132: "C K L G M N O",
1028: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "K L G AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B tB",
516: "B C jB kB"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC"
},
H: {
2: "eC"
},
I: {
2: "mB I fC gC hC iC yB jC kC",
258: "H"
},
J: {
2: "D A"
},
K: {
2: "A B C jB xB kB",
258: "b"
},
L: {
258: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I",
258: "mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "HEVC/H.265 video format"
};
},
91899: module => {
module.exports = {
A: {
A: {
1: "B",
2: "J D E F A zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n"
},
E: {
1: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z jB xB JC kB",
2: "F B FC GC HC IC"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB"
},
H: {
1: "eC"
},
I: {
1: "I H iC yB jC kC",
2: "mB fC gC hC"
},
J: {
1: "A",
2: "D"
},
K: {
1: "C b jB xB kB",
2: "A B"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "B",
2: "A"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "hidden attribute"
};
},
141: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o",
33: "p q r s"
},
E: {
1: "E F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D 5B sB 6B 7B 8B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC NC OC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
1: "A",
2: "D"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "High Resolution Time API"
};
},
79433: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I"
},
E: {
1: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB",
4: "n 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z xB JC kB",
2: "F B FC GC HC IC jB"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC",
4: "yB"
},
H: {
2: "eC"
},
I: {
1: "H gC hC yB jC kC",
2: "mB I fC iC"
},
J: {
1: "D A"
},
K: {
1: "C b jB xB kB",
2: "A B"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Session history management"
};
},
67160: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "sB KC yB LC",
129: "E MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "mB I H iC yB jC kC",
2: "fC",
257: "gC hC"
},
J: {
1: "A",
16: "D"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
516: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
16: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 4,
C: "HTML Media Capture"
};
},
94764: module => {
module.exports = {
A: {
A: {
2: "zB",
8: "J D E",
260: "F A B"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B",
132: "mB 1B 2B",
260: "I n J D E F A B C K L G M N O o p"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
132: "I n",
260: "J D E F A B C K L G M N O o p q r s t u"
},
E: {
1: "D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
132: "I 5B sB",
260: "n J 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
132: "F B FC GC HC IC",
260: "C jB xB JC kB"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
132: "sB",
260: "KC yB LC MC"
},
H: {
132: "eC"
},
I: {
1: "H jC kC",
132: "fC",
260: "mB I gC hC iC yB"
},
J: {
260: "D A"
},
K: {
1: "b",
132: "A",
260: "B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
260: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "HTML5 semantic elements"
};
},
13343: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "C K L G M N O",
2: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB 6B"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "mB I H iC yB jC kC",
2: "fC gC hC"
},
J: {
1: "A",
2: "D"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "HTTP Live Streaming (HLS)"
};
},
50977: module => {
module.exports = {
A: {
A: {
2: "J D E F A zB",
132: "B"
},
B: {
1: "C K L G M N O",
513: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB",
2: "0 1 2 3 4 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B",
513: "MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
1: "AB BB CB DB EB FB GB HB IB JB",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z",
513: "KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "B C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E 5B sB 6B 7B 8B",
260: "F A 9B tB"
},
F: {
1: "0 1 2 3 4 5 6 x y z",
2: "F B C G M N O o p q r s t u v w FC GC HC IC jB xB JC kB",
513: "7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
1: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC"
},
H: {
2: "eC"
},
I: {
2: "mB I fC gC hC iC yB jC kC",
513: "H"
},
J: {
2: "D A"
},
K: {
2: "A B C jB xB kB",
513: "b"
},
L: {
513: "H"
},
M: {
513: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I",
513: "mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
513: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "HTTP/2 protocol"
};
},
40523: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O",
322: "P Q R S T",
578: "U V"
},
C: {
1: "X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB 1B 2B",
194: "cB dB eB fB gB hB iB P Q R pB S T U V W"
},
D: {
1: "W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB",
322: "P Q R S T",
578: "U V"
},
E: {
2: "I n J D E F A B C K 5B sB 6B 7B 8B 9B tB jB kB AC",
1090: "L G BC CC uB vB wB DC lB EC"
},
F: {
1: "eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB FC GC HC IC jB xB JC kB",
578: "dB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC",
66: "bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
194: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "uC vC lB wC",
2: "I mC nC oC pC qC tB rC sC tC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "HTTP/3 protocol"
};
},
62868: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M 1B 2B",
4: "N O o p q r s t u v w"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC"
},
H: {
2: "eC"
},
I: {
1: "mB I H gC hC iC yB jC kC",
2: "fC"
},
J: {
1: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "sandbox attribute for iframes"
};
},
46501: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
66: "p q r s t u v"
},
E: {
2: "I n J E F A B C K L G 5B sB 6B 7B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
130: "D 8B"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
130: "NC"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "seamless attribute for iframes"
};
},
33043: module => {
module.exports = {
A: {
A: {
2: "zB",
8: "J D E F A B"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
8: "C K L G M N O"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B",
8: "mB I n J D E F A B C K L G M N O o p q r s t 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K",
8: "L G M N O o"
},
E: {
1: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "5B sB",
8: "I n 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B FC GC HC IC",
8: "C jB xB JC kB"
},
G: {
1: "E MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB",
8: "KC yB LC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
8: "mB I fC gC hC iC yB"
},
J: {
1: "A",
8: "D"
},
K: {
1: "b",
2: "A B",
8: "C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
8: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "srcdoc attribute for iframes"
};
},
58280: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O",
322: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B",
194: "4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB",
322: "MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
322: "9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
322: "xC"
},
R: {
1: "yC"
},
S: {
194: "zC"
}
},
B: 5,
C: "ImageCapture API"
};
},
91620: module => {
module.exports = {
A: {
A: {
2: "J D E F A zB",
161: "B"
},
B: {
2: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
161: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A",
161: "B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "Input Method Editor API"
};
},
24417: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "naturalWidth & naturalHeight image properties"
};
},
65027: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "Y Z c d e f g h i j k l a m H",
2: "C K L G M N O",
194: "P Q R S T U V W X"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a 1B 2B",
322: "m H qB rB"
},
D: {
1: "Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB",
194: "eB fB gB hB iB P Q R S T U V W X"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB FC GC HC IC jB xB JC kB",
194: "TB UB b VB WB XB YB ZB aB bB cB dB eB fB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "vC lB wC",
2: "I mC nC oC pC qC tB rC sC tC uC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "Import maps"
};
},
43658: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
8: "A B"
},
B: {
1: "P",
2: "Q R S T U V W X Y Z c d e f g h i j k l a m H",
8: "C K L G M N O"
},
C: {
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y 1B 2B",
8: "0 z PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
72: "1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB"
},
D: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P",
2: "I n J D E F A B C K L G M N O o p q r s t u v w x y Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
66: "0 1 2 3 z",
72: "4"
},
E: {
2: "I n 5B sB 6B",
8: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB",
2: "F B C G M XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
66: "N O o p q",
72: "r"
},
G: {
2: "sB KC yB LC MC",
8: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
8: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC",
2: "tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "HTML Imports"
};
},
40535: module => {
module.exports = {
A: {
A: {
1: "J D E F A B",
16: "zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 2B",
2: "0B mB",
16: "1B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p q r s t u v w"
},
E: {
1: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z JC kB",
2: "F B FC GC HC IC jB xB"
},
G: {
1: "WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
2: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "indeterminate checkbox"
};
},
77072: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
132: "A B"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
132: "C K L G M N O"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B",
33: "A B C K L G",
36: "I n J D E F"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "A",
8: "I n J D E F",
33: "s",
36: "B C K L G M N O o p q r"
},
E: {
1: "A B C K L G tB jB kB AC CC uB vB wB DC lB EC",
8: "I n J D 5B sB 6B 7B",
260: "E F 8B 9B",
516: "BC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F FC GC",
8: "B C HC IC jB xB JC kB"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC dC uB vB wB lB",
8: "sB KC yB LC MC NC",
260: "E OC PC QC",
516: "cC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
8: "mB I fC gC hC iC yB"
},
J: {
1: "A",
8: "D"
},
K: {
1: "b",
2: "A",
8: "B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
132: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "IndexedDB"
};
},
33917: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB 1B 2B",
132: "DB EB FB",
260: "GB HB IB JB"
},
D: {
1: "RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB",
132: "HB IB JB KB",
260: "LB MB NB OB PB QB"
},
E: {
1: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B"
},
F: {
1: "EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
132: "4 5 6 7",
260: "8 9 AB BB CB DB"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC",
16: "RC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "oC pC qC tB rC sC tC uC vC lB wC",
2: "I",
260: "mC nC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
260: "zC"
}
},
B: 4,
C: "IndexedDB 2.0"
};
},
26229: module => {
module.exports = {
A: {
A: {
1: "E F A B",
4: "zB",
132: "J D"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
36: "0B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "CSS inline-block"
};
},
28641: module => {
module.exports = {
A: {
A: {
1: "J D E F A B",
16: "zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
16: "5B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
16: "F"
},
G: {
1: "E KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB"
},
H: {
1: "eC"
},
I: {
1: "mB I H hC iC yB jC kC",
16: "fC gC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "HTMLElement.innerText"
};
},
83167: module => {
module.exports = {
A: {
A: {
1: "J D E F A zB",
132: "B"
},
B: {
132: "C K L G M N O",
260: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y 1B 2B",
516: "0 1 2 3 4 5 6 7 8 9 z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
1: "N O o p q r s t u v",
2: "I n J D E F A B C K L G M",
132: "0 1 2 3 4 5 6 7 8 9 w x y z",
260: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "J 6B 7B",
2: "I n 5B sB",
2052: "D E F A B C K L G 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "sB KC yB",
1025: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1025: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2052: "A B"
},
O: {
1025: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
260: "xC"
},
R: {
1: "yC"
},
S: {
516: "zC"
}
},
B: 1,
C: "autocomplete attribute: on & off values"
};
},
55673: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u v w x 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o"
},
E: {
1: "K L G kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A B C 5B sB 6B 7B 8B 9B tB jB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z jB xB JC kB",
2: "F G M FC GC HC IC"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC",
129: "WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 1,
C: "Color input type"
};
},
26655: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
132: "C"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB 1B 2B",
1090: "MB NB OB PB",
2052: "QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d",
4100: "e f g h i j k l a m H qB rB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o",
2052: "p q r s t"
},
E: {
2: "I n J D E F A B C K L 5B sB 6B 7B 8B 9B tB jB kB AC",
4100: "G BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "sB KC yB",
260: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB fC gC hC",
514: "I iC yB"
},
J: {
1: "A",
2: "D"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2052: "zC"
}
},
B: 1,
C: "Date and time input types"
};
},
68108: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I"
},
E: {
1: "n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
2: "F"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "mB I H iC yB jC kC",
132: "fC gC hC"
},
J: {
1: "A",
132: "D"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Email, telephone & URL input types"
};
},
3836: module => {
module.exports = {
A: {
A: {
2: "J D E zB",
2561: "A B",
2692: "F"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2561: "C K L G M N O"
},
C: {
1: "IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
16: "0B",
1537: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB 2B",
1796: "mB 1B"
},
D: {
1: "WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J D E F A B C K L",
1025: "4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB",
1537: "0 1 2 3 G M N O o p q r s t u v w x y z"
},
E: {
1: "L G AC BC CC uB vB wB DC lB EC",
16: "I n J 5B sB",
1025: "D E F A B C 7B 8B 9B tB jB",
1537: "6B",
4097: "K kB"
},
F: {
1: "LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
16: "F B C FC GC HC IC jB xB",
260: "JC",
1025: "0 1 2 3 4 5 6 7 8 9 r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB",
1537: "G M N O o p q"
},
G: {
1: "YC ZC aC bC cC dC uB vB wB lB",
16: "sB KC yB",
1025: "E OC PC QC RC SC TC UC VC",
1537: "LC MC NC",
4097: "WC XC"
},
H: {
2: "eC"
},
I: {
16: "fC gC",
1025: "H kC",
1537: "mB I hC iC yB jC"
},
J: {
1025: "A",
1537: "D"
},
K: {
1: "A B C jB xB kB",
1025: "b"
},
L: {
1: "H"
},
M: {
1537: "a"
},
N: {
2561: "A B"
},
O: {
1537: "lC"
},
P: {
1025: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1025: "xC"
},
R: {
1025: "yC"
},
S: {
1537: "zC"
}
},
B: 1,
C: "input event"
};
},
84514: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B",
132: "0 1 2 3 4 5 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I",
16: "n J D E q r s t u",
132: "F A B C K L G M N O o p"
},
E: {
1: "C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB 6B",
132: "J D E F A B 7B 8B 9B tB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
2: "MC NC",
132: "E OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
514: "sB KC yB LC"
},
H: {
2: "eC"
},
I: {
2: "fC gC hC",
260: "mB I iC yB",
514: "H jC kC"
},
J: {
132: "A",
260: "D"
},
K: {
2: "A B C jB xB kB",
514: "b"
},
L: {
260: "H"
},
M: {
2: "a"
},
N: {
514: "A",
1028: "B"
},
O: {
2: "lC"
},
P: {
260: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
260: "xC"
},
R: {
260: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "accept attribute for file input"
};
},
11352: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K"
},
C: {
1: "JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p q r s t u v w x y"
},
E: {
1: "C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A B 5B sB 6B 7B 8B 9B tB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "Directory selection from file input"
};
},
76091: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 2B",
2: "0B mB 1B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I"
},
E: {
1: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z IC jB xB JC kB",
2: "F FC GC HC"
},
G: {
1: "E MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC"
},
H: {
130: "eC"
},
I: {
130: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
130: "A B C b jB xB kB"
},
L: {
132: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
130: "lC"
},
P: {
130: "I",
132: "mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
132: "xC"
},
R: {
132: "yC"
},
S: {
2: "zC"
}
},
B: 1,
C: "Multiple file selection"
};
},
13673: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M 1B 2B",
4: "N O o p",
194: "0 1 2 3 4 5 6 7 8 9 q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f"
},
D: {
1: "WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB",
66: "PB QB RB nB SB oB TB UB b VB"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB FC GC HC IC jB xB JC kB",
66: "CB DB EB FB GB HB IB JB KB LB"
},
G: {
1: "WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "qC tB rC sC tC uC vC lB wC",
2: "I mC nC oC pC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
194: "zC"
}
},
B: 1,
C: "inputmode attribute"
};
},
48513: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M"
},
C: {
1: "KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB 1B 2B"
},
D: {
1: "9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s t u v FC GC HC IC jB xB JC kB"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 1,
C: "Minimum length attribute for input fields"
};
},
85888: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
129: "A B"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
129: "C K",
1025: "L G M N O"
},
C: {
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u v w x 1B 2B",
513: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n"
},
E: {
1: "n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
388: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB fC gC hC",
388: "I H iC yB jC kC"
},
J: {
2: "D",
388: "A"
},
K: {
1: "A B C jB xB kB",
388: "b"
},
L: {
388: "H"
},
M: {
641: "a"
},
N: {
388: "A B"
},
O: {
388: "lC"
},
P: {
388: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
388: "xC"
},
R: {
388: "yC"
},
S: {
513: "zC"
}
},
B: 1,
C: "Number input type"
};
},
2935: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F"
},
E: {
1: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB",
16: "n",
388: "J D E F A 6B 7B 8B 9B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
2: "F"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB KC yB",
388: "E LC MC NC OC PC QC RC"
},
H: {
2: "eC"
},
I: {
1: "H kC",
2: "mB I fC gC hC iC yB jC"
},
J: {
1: "A",
2: "D"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
132: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Pattern attribute for input fields"
};
},
87146: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
132: "I 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z xB JC kB",
2: "F FC GC HC IC",
132: "B jB"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB H fC gC hC yB jC kC",
4: "I iC"
},
J: {
1: "D A"
},
K: {
1: "B C b jB xB kB",
2: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "input placeholder attribute"
};
},
67179: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB"
},
H: {
2: "eC"
},
I: {
1: "H yB jC kC",
4: "mB I fC gC hC iC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Range input type"
};
},
4555: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
129: "A B"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
129: "C K L G M N O"
},
C: {
2: "0B mB 1B 2B",
129: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J D E F A B C K L q r s t u",
129: "G M N O o p"
},
E: {
1: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
16: "I n 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z JC kB",
2: "F FC GC HC IC",
16: "B jB xB"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB KC yB"
},
H: {
129: "eC"
},
I: {
1: "H jC kC",
16: "fC gC",
129: "mB I hC iC yB"
},
J: {
1: "D",
129: "A"
},
K: {
1: "C b",
2: "A",
16: "B jB xB",
129: "kB"
},
L: {
1: "H"
},
M: {
129: "a"
},
N: {
129: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
129: "zC"
}
},
B: 1,
C: "Search input type"
};
},
25509: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
16: "5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z IC jB xB JC kB",
16: "F FC GC HC"
},
G: {
1: "E KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB"
},
H: {
2: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Selection controls for input & textarea"
};
},
9969: module => {
module.exports = {
A: {
A: {
1: "J D E F A B",
16: "zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
16: "F"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H hC iC yB jC kC",
16: "fC gC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Element.insertAdjacentElement() & Element.insertAdjacentText()"
};
},
99079: module => {
module.exports = {
A: {
A: {
1: "A B",
16: "zB",
132: "J D E F"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z GC HC IC jB xB JC kB",
16: "F FC"
},
G: {
1: "E KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB"
},
H: {
1: "eC"
},
I: {
1: "mB I H hC iC yB jC kC",
16: "fC gC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "Element.insertAdjacentHTML()"
};
},
33682: module => {
module.exports = {
A: {
A: {
1: "B",
2: "J D E F A zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u v w x 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p q r s"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B 9B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "B",
2: "A"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "Internationalization API"
};
},
39439: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "rC sC tC uC vC lB wC",
2: "I mC nC oC pC qC tB"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "IntersectionObserver V2"
};
},
57822: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "M N O",
2: "C K L",
516: "G",
1025: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB 1B 2B",
194: "LB MB NB"
},
D: {
1: "RB nB SB oB TB UB b",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB",
516: "KB LB MB NB OB PB QB",
1025: "VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "K L G kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A B C 5B sB 6B 7B 8B 9B tB jB"
},
F: {
1: "EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB",
2: "0 1 2 3 4 5 6 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
516: "7 8 9 AB BB CB DB",
1025: "b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
1: "WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC"
},
H: {
2: "eC"
},
I: {
2: "mB I fC gC hC iC yB jC kC",
1025: "H"
},
J: {
2: "D A"
},
K: {
2: "A B C jB xB kB",
1025: "b"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
516: "lC"
},
P: {
1: "oC pC qC tB rC sC tC uC vC lB wC",
2: "I",
516: "mC nC"
},
Q: {
1025: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "IntersectionObserver"
};
},
50778: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N",
130: "O"
},
C: {
1: "RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB 1B 2B"
},
D: {
1: "UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB"
},
E: {
1: "K L G AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A B C 5B sB 6B 7B 8B 9B tB jB kB"
},
F: {
1: "JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB FC GC HC IC jB xB JC kB"
},
G: {
1: "XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "pC qC tB rC sC tC uC vC lB wC",
2: "I mC nC oC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "Intl.PluralRules API"
};
},
39895: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O",
1537: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0B",
932: "0 1 2 3 4 5 6 7 8 9 mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB 1B 2B",
2308: "WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
2: "I n J D E F A B C K L G M N O o p q",
545: "0 1 2 3 4 5 6 7 8 9 r s t u v w x y z AB BB CB DB EB",
1537: "FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J 5B sB 6B",
516: "B C K L G jB kB AC BC CC uB vB wB DC lB EC",
548: "F A 9B tB",
676: "D E 7B 8B"
},
F: {
2: "F B C FC GC HC IC jB xB JC kB",
513: "3",
545: "0 1 G M N O o p q r s t u v w x y z",
1537: "2 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "sB KC yB LC MC",
516: "bC cC dC uB vB wB lB",
548: "PC QC RC SC TC UC VC WC XC YC ZC aC",
676: "E NC OC"
},
H: {
2: "eC"
},
I: {
2: "mB I fC gC hC iC yB",
545: "jC kC",
1537: "H"
},
J: {
2: "D",
545: "A"
},
K: {
2: "A B C jB xB kB",
1537: "b"
},
L: {
1537: "H"
},
M: {
2308: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
545: "I",
1537: "mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
545: "xC"
},
R: {
1537: "yC"
},
S: {
932: "zC"
}
},
B: 5,
C: "Intrinsic & Extrinsic Sizing"
};
},
98599: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB",
129: "n 6B"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "JPEG 2000 image format"
};
},
12641: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z",
578: "c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y 1B 2B",
322: "Z c d e f g h i j k l a m H qB rB"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z",
194: "c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB FC GC HC IC jB xB JC kB",
194: "hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "JPEG XL image format"
};
},
19182: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O",
2: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
1: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "JPEG XR image format"
};
},
37683: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB 1B 2B"
},
D: {
1: "TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "pC qC tB rC sC tC uC vC lB wC",
2: "I mC nC oC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "Lookbehind in JS regular expressions"
};
},
42997: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D zB",
129: "E"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
2: "0B mB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z HC IC jB xB JC kB",
2: "F FC GC"
},
G: {
1: "E KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "JSON parsing"
};
},
72761: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G",
132: "M N O"
},
C: {
1: "LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB 1B 2B"
},
D: {
1: "SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB",
132: "QB RB nB"
},
E: {
1: "B C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B",
132: "tB"
},
F: {
1: "GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB FC GC HC IC jB xB JC kB",
132: "DB EB FB"
},
G: {
1: "TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC",
132: "SC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
132: "lC"
},
P: {
1: "pC qC tB rC sC tC uC vC lB wC",
2: "I mC nC",
132: "oC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
132: "zC"
}
},
B: 5,
C: "CSS justify-content: space-evenly"
};
},
65091: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
2: "0B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB KC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "fC gC hC",
132: "mB I iC yB"
},
J: {
1: "A",
2: "D"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 7,
C: "High-quality kerning pairs & ligatures"
};
},
33982: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
16: "0B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
16: "5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
2: "F B FC GC HC IC jB xB JC",
16: "C"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB KC yB"
},
H: {
2: "eC"
},
I: {
1: "mB I H hC iC yB jC kC",
16: "fC gC"
},
J: {
1: "D A"
},
K: {
1: "b kB",
2: "A B jB xB",
16: "C"
},
L: {
1: "H"
},
M: {
130: "a"
},
N: {
130: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 7,
C: "KeyboardEvent.charCode"
};
},
8187: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B"
},
D: {
1: "HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB",
194: "BB CB DB EB FB GB"
},
E: {
1: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B"
},
F: {
1: "4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s t u v w x FC GC HC IC jB xB JC kB",
194: "0 1 2 3 y z"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
194: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I",
194: "mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
194: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "KeyboardEvent.code"
};
},
47799: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p q r s t u v w x y"
},
E: {
1: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
2: "F B G M FC GC HC IC jB xB JC",
16: "C"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
2: "D A"
},
K: {
1: "b kB",
2: "A B jB xB",
16: "C"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "KeyboardEvent.getModifierState()"
};
},
75503: module => {
module.exports = {
A: {
A: {
2: "J D E zB",
260: "F A B"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
260: "C K L G M N O"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r 1B 2B",
132: "s t u v w x"
},
D: {
1: "KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB"
},
E: {
1: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B"
},
F: {
1: "7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
2: "0 1 2 3 4 5 6 F B G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC",
16: "C"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC"
},
H: {
1: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b kB",
2: "A B jB xB",
16: "C"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
260: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "KeyboardEvent.key"
};
},
81550: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
132: "I n J D E F A B C K L G M N O o p q r s t u v w x y"
},
E: {
1: "D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
16: "J 5B sB",
132: "I n 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
2: "F B FC GC HC IC jB xB JC",
16: "C",
132: "G M"
},
G: {
1: "E OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB KC yB",
132: "LC MC NC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
16: "fC gC",
132: "mB I hC iC yB"
},
J: {
132: "D A"
},
K: {
1: "b kB",
2: "A B jB xB",
16: "C"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "KeyboardEvent.location"
};
},
94420: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB",
16: "n"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z GC HC IC jB xB JC kB",
16: "F FC"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB KC yB"
},
H: {
2: "eC"
},
I: {
1: "mB I H hC iC yB",
16: "fC gC",
132: "jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
132: "H"
},
M: {
132: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
2: "I",
132: "mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
132: "yC"
},
S: {
1: "zC"
}
},
B: 7,
C: "KeyboardEvent.which"
};
},
94763: module => {
module.exports = {
A: {
A: {
1: "B",
2: "J D E F A zB"
},
B: {
1: "C K L G M N O",
2: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
1: "B",
2: "A"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "Resource Hints: Lazyload"
};
},
46308: module => {
module.exports = {
A: {
A: {
2: "J D E F A zB",
2052: "B"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
194: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB 1B 2B"
},
D: {
1: "IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O",
322: "0 1 2 3 4 5 6 7 8 9 o p q r s t u v w x y z",
516: "AB BB CB DB EB FB GB HB"
},
E: {
1: "B C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B 9B",
1028: "A tB"
},
F: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB",
322: "G M N O o p q r s t u v w",
516: "0 1 2 3 4 x y z"
},
G: {
1: "TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC",
1028: "RC SC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "B",
2: "A"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
516: "I"
},
Q: {
1: "xC"
},
R: {
516: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "let"
};
},
49330: module => {
module.exports = {
A: {
A: {
1: "B",
2: "J D E F A zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "VC WC XC YC ZC aC bC cC dC uB vB wB lB",
130: "E sB KC yB LC MC NC OC PC QC RC SC TC UC"
},
H: {
130: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D",
130: "A"
},
K: {
1: "b",
130: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
130: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "PNG favicons"
};
},
83694: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P",
1537: "Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0B mB 1B 2B",
260: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z",
513: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P",
1537: "Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "DB EB FB GB HB IB JB KB LB MB",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB NB OB PB QB RB SB TB UB b VB WB FC GC HC IC jB xB JC kB",
1537: "XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "VC WC XC YC ZC aC bC cC dC uB vB wB lB",
130: "E sB KC yB LC MC NC OC PC QC RC SC TC UC"
},
H: {
130: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D",
130: "A"
},
K: {
2: "b",
130: "A B C jB xB kB"
},
L: {
1537: "H"
},
M: {
2: "a"
},
N: {
130: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC",
1537: "tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
513: "zC"
}
},
B: 1,
C: "SVG favicons"
};
},
25099: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E zB",
132: "F"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0B mB",
260: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
16: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
16: "mB I H fC gC hC iC yB jC kC"
},
J: {
16: "D A"
},
K: {
16: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "B",
2: "A"
},
O: {
16: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
16: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "Resource Hints: dns-prefetch"
};
},
35726: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "qC tB rC sC tC uC vC lB wC",
2: "I mC nC oC pC"
},
Q: {
16: "xC"
},
R: {
16: "yC"
},
S: {
2: "zC"
}
},
B: 1,
C: "Resource Hints: modulepreload"
};
},
4854: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L",
260: "G M N O"
},
C: {
1: "9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB",
2: "0 1 2 3 4 5 6 7 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
129: "8"
},
D: {
1: "FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB"
},
E: {
1: "C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A B 5B sB 6B 7B 8B 9B tB"
},
F: {
1: "2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB"
},
G: {
1: "UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
16: "a"
},
N: {
2: "A B"
},
O: {
16: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "Resource Hints: preconnect"
};
},
864: module => {
module.exports = {
A: {
A: {
1: "B",
2: "J D E F A zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D"
},
E: {
2: "I n J D E F A B C K 5B sB 6B 7B 8B 9B tB jB kB",
194: "L G AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC",
194: "aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "I H jC kC",
2: "mB fC gC hC iC yB"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "B",
2: "A"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "Resource Hints: prefetch"
};
},
90837: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M",
1028: "N O"
},
C: {
1: "U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB 1B 2B",
132: "PB",
578: "QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T"
},
D: {
1: "JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB"
},
E: {
1: "C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B tB",
322: "B"
},
F: {
1: "6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB"
},
G: {
1: "UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC",
322: "TC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 4,
C: "Resource Hints: preload"
};
},
21761: module => {
module.exports = {
A: {
A: {
1: "B",
2: "J D E F A zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
1: "B",
2: "A"
},
O: {
2: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "Resource Hints: prerender"
};
},
92952: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB 1B 2B",
132: "fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
1: "hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB",
66: "fB gB"
},
E: {
2: "I n J D E F A B C K 5B sB 6B 7B 8B 9B tB jB kB",
322: "L G AC BC CC uB",
580: "vB wB DC lB EC"
},
F: {
1: "b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB FC GC HC IC jB xB JC kB",
66: "TB UB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC",
322: "aC bC cC dC uB",
580: "vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
132: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "sC tC uC vC lB wC",
2: "I mC nC oC pC qC tB rC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 1,
C: "Lazy loading via attribute for images & iframes"
};
},
80778: module => {
module.exports = {
A: {
A: {
1: "B",
16: "zB",
132: "J D E F A"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
132: "0B mB I n J D E F A B C K L G M N O o p q r s t u v w x 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
132: "I n J D E F A B C K L G M N O o p q r s"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
132: "I n J D E F 5B sB 6B 7B 8B 9B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
16: "F B C FC GC HC IC jB xB JC",
132: "kB"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
132: "E sB KC yB LC MC NC OC PC QC"
},
H: {
132: "eC"
},
I: {
1: "H jC kC",
132: "mB I fC gC hC iC yB"
},
J: {
132: "D A"
},
K: {
1: "b",
16: "A B C jB xB",
132: "kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "B",
132: "A"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
132: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
4: "zC"
}
},
B: 6,
C: "localeCompare()"
};
},
92380: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB",
194: "RB nB SB oB TB UB b VB WB"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
194: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 4,
C: "Magnetometer"
};
},
38442: module => {
module.exports = {
A: {
A: {
2: "J D E zB",
36: "F A B"
},
B: {
1: "G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
36: "C K L"
},
C: {
1: "3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B",
36: "0 1 2 I n J D E F A B C K L G M N O o p q r s t u v w x y z 2B"
},
D: {
1: "3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
36: "0 1 2 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "E F A B C K L G 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB",
36: "n J D 6B 7B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B FC GC HC IC jB",
36: "C G M N O o p xB JC kB"
},
G: {
1: "E OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB",
36: "KC yB LC MC NC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "fC",
36: "mB I gC hC iC yB jC kC"
},
J: {
36: "D A"
},
K: {
1: "b",
2: "A B",
36: "C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
36: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
36: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "matches() DOM method"
};
},
8104: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E"
},
E: {
1: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
2: "F B C FC GC HC IC jB xB JC"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB"
},
H: {
1: "eC"
},
I: {
1: "mB I H iC yB jC kC",
2: "fC gC hC"
},
J: {
1: "A",
2: "D"
},
K: {
1: "b kB",
2: "A B C jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "matchMedia"
};
},
26629: module => {
module.exports = {
A: {
A: {
2: "F A B zB",
8: "J D E"
},
B: {
2: "C K L G M N O",
8: "P Q R S T U V W X Y Z c d e f g h",
584: "i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
129: "0B mB 1B 2B"
},
D: {
1: "t",
8: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h",
584: "i j k l a m H qB rB",
1025: "3B 4B"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
260: "I n J D E F 5B sB 6B 7B 8B 9B"
},
F: {
2: "F",
8: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB",
584: "S T U V W X Y Z",
2052: "B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
8: "sB KC yB"
},
H: {
8: "eC"
},
I: {
8: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "A",
8: "D"
},
K: {
8: "A B C b jB xB kB"
},
L: {
8: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
4: "lC"
},
P: {
8: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
8: "xC"
},
R: {
8: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "MathML"
};
},
88884: module => {
module.exports = {
A: {
A: {
1: "A B",
16: "zB",
900: "J D E F"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
1025: "C K L G M N O"
},
C: {
1: "KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
900: "0B mB 1B 2B",
1025: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
16: "n 5B",
900: "I sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
16: "F",
132: "B C FC GC HC IC jB xB JC kB"
},
G: {
1: "KC yB LC MC NC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB",
2052: "E OC"
},
H: {
132: "eC"
},
I: {
1: "mB I hC iC yB jC kC",
16: "fC gC",
4097: "H"
},
J: {
1: "D A"
},
K: {
132: "A B C jB xB kB",
4097: "b"
},
L: {
4097: "H"
},
M: {
4097: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
4097: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1025: "zC"
}
},
B: 1,
C: "maxlength attribute for input and textarea elements"
};
},
5902: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O",
16: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L 1B 2B"
},
D: {
1: "0 1 2 I n J D E F A B C K L G M N O o p q r s t u v w x y z",
2: "3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB",
16: "rB 3B 4B"
},
E: {
1: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB"
},
F: {
1: "B C G M N O o p q r s t GC HC IC jB xB JC kB",
2: "0 1 2 3 4 5 6 7 8 9 F u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB KC yB"
},
H: {
16: "eC"
},
I: {
1: "I H iC yB jC kC",
16: "mB fC gC hC"
},
J: {
16: "D A"
},
K: {
1: "C b kB",
16: "A B jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
16: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Media attribute"
};
},
13477: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O",
132: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B",
132: "3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
2: "I n J D E F A B C K L G M N",
132: "0 1 2 3 4 5 6 7 8 9 O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n 5B sB 6B",
132: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "F B C FC GC HC IC jB xB JC kB",
132: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "sB KC yB LC MC NC",
132: "E OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I fC gC hC iC yB",
132: "H jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C jB xB kB",
132: "b"
},
L: {
132: "H"
},
M: {
132: "a"
},
N: {
132: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC",
132: "nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
132: "zC"
}
},
B: 2,
C: "Media Fragments"
};
},
93149: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB"
},
E: {
2: "I n J D E F A B C K 5B sB 6B 7B 8B 9B tB jB kB",
16: "L G AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "Media Session API"
};
},
8184: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB 1B 2B",
260: "CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
1: "TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB",
324: "KB LB MB NB OB PB QB RB nB SB oB"
},
E: {
2: "I n J D E F A 5B sB 6B 7B 8B 9B tB",
132: "B C K L G jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
324: "5 6 7 8 9 AB BB CB DB EB FB GB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
260: "a"
},
N: {
2: "A B"
},
O: {
132: "lC"
},
P: {
1: "pC qC tB rC sC tC uC vC lB wC",
2: "I",
132: "mC nC oC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
260: "zC"
}
},
B: 5,
C: "Media Capture from DOM Elements API"
};
},
44401: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u v w x 1B 2B"
},
D: {
1: "IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB",
194: "GB HB"
},
E: {
1: "G BC CC uB vB wB DC lB EC",
2: "I n J D E F A B C 5B sB 6B 7B 8B 9B tB jB",
322: "K L kB AC"
},
F: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
194: "3 4"
},
G: {
1: "cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC",
578: "VC WC XC YC ZC aC bC"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "MediaRecorder API"
};
},
93616: module => {
module.exports = {
A: {
A: {
2: "J D E F A zB",
132: "B"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t 1B 2B",
66: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M",
33: "s t u v w x y z",
66: "N O o p q r"
},
E: {
1: "E F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D 5B sB 6B 7B 8B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC",
260: "XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H kC",
2: "mB I fC gC hC iC yB jC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "B",
2: "A"
},
O: {
1: "lC"
},
P: {
1: "qC tB rC sC tC uC vC lB wC",
2: "I mC nC oC pC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "Media Source Extensions"
};
},
68172: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0B mB I n J D 1B 2B",
132: "0 1 2 3 4 5 6 7 8 9 E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T",
450: "U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
66: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 F B C G M N O o p q r s t u v w x y z GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
66: "4 5 6 7 8 9 AB BB CB DB EB FB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
450: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "Context menu item (menuitem element)"
};
},
42650: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 I n J D E F A B C K L G M N O o p q r s t u v w x y z",
132: "dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
258: "8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB"
},
E: {
1: "G CC uB vB wB DC lB EC",
2: "I n J D E F A B C K L 5B sB 6B 7B 8B 9B tB jB kB AC BC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
513: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I",
16: "mC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 1,
C: "theme-color Meta Tag"
};
},
29315: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D"
},
E: {
1: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z jB xB JC kB",
2: "F FC GC HC IC"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC"
},
H: {
1: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
1: "D A"
},
K: {
1: "B C b jB xB kB",
2: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "meter element"
};
},
24236: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s t u v w x y FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "Web MIDI API"
};
},
63144: module => {
module.exports = {
A: {
A: {
1: "F A B",
8: "J zB",
129: "D",
257: "E"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "CSS min/max-width/height"
};
},
14359: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB",
132: "I n J D E F A B C K L G M N O o p q 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB"
},
H: {
2: "eC"
},
I: {
1: "mB I H hC iC yB jC kC",
2: "fC gC"
},
J: {
1: "D A"
},
K: {
1: "B C b jB xB kB",
2: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "MP3 audio format"
};
},
45097: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "C K L G M N O",
2: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
386: "q r"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "Dynamic Adaptive Streaming over HTTP (MPEG-DASH)"
};
},
24319: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p 1B 2B",
4: "0 1 2 3 q r s t u v w x y z"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "5B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s t FC GC HC IC jB xB JC kB"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
4: "mB I fC gC iC yB",
132: "hC"
},
J: {
1: "D A"
},
K: {
1: "B C b jB xB kB",
2: "A"
},
L: {
1: "H"
},
M: {
260: "a"
},
N: {
1: "A B"
},
O: {
4: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "MPEG-4/H.264 video format"
};
},
10209: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 2B",
2: "0B mB 1B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z HC IC jB xB JC kB",
2: "F FC GC"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS3 Multiple backgrounds"
};
},
40757: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O",
516: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
132: "LB MB NB OB PB QB RB nB SB oB TB UB b",
164: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB 1B 2B",
516: "VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c",
1028: "d e f g h i j k l a m H qB rB"
},
D: {
420: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB",
516: "JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
132: "F 9B",
164: "D E 8B",
420: "I n J 5B sB 6B 7B"
},
F: {
1: "C jB xB JC kB",
2: "F B FC GC HC IC",
420: "0 1 2 3 4 5 G M N O o p q r s t u v w x y z",
516: "6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
132: "PC QC",
164: "E NC OC",
420: "sB KC yB LC MC"
},
H: {
1: "eC"
},
I: {
420: "mB I fC gC hC iC yB jC kC",
516: "H"
},
J: {
420: "D A"
},
K: {
1: "C jB xB kB",
2: "A B",
516: "b"
},
L: {
516: "H"
},
M: {
516: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
420: "I"
},
Q: {
132: "xC"
},
R: {
132: "yC"
},
S: {
164: "zC"
}
},
B: 4,
C: "CSS3 Multiple column layout"
};
},
94862: module => {
module.exports = {
A: {
A: {
2: "J D E zB",
260: "F A B"
},
B: {
132: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
260: "C K L G M N O"
},
C: {
2: "0B mB I n 1B 2B",
260: "0 1 2 3 4 5 6 7 8 9 J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
16: "I n J D E F A B C K L",
132: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
16: "5B sB",
132: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "C JC kB",
2: "F FC GC HC IC",
16: "B jB xB",
132: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
16: "sB KC",
132: "E yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
16: "fC gC",
132: "mB I H hC iC yB jC kC"
},
J: {
132: "D A"
},
K: {
1: "C kB",
2: "A",
16: "B jB xB",
132: "b"
},
L: {
132: "H"
},
M: {
260: "a"
},
N: {
260: "A B"
},
O: {
132: "lC"
},
P: {
132: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
132: "xC"
},
R: {
132: "yC"
},
S: {
260: "zC"
}
},
B: 5,
C: "Mutation events"
};
},
82487: module => {
module.exports = {
A: {
A: {
1: "B",
2: "J D E zB",
8: "F A"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N",
33: "O o p q r s t u v"
},
E: {
1: "D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB 6B",
33: "J"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC",
33: "MC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB fC gC hC",
8: "I iC yB"
},
J: {
1: "A",
2: "D"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "B",
8: "A"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Mutation Observer"
};
},
7585: module => {
module.exports = {
A: {
A: {
1: "E F A B",
2: "zB",
8: "J D"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
4: "0B mB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z HC IC jB xB JC kB",
2: "F FC GC"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "B C b jB xB kB",
2: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Web Storage - name/value pairs"
};
},
39097: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O",
194: "P Q R S T U",
260: "V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB",
194: "eB fB gB hB iB P Q R S T U",
260: "V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC",
516: "uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB FC GC HC IC jB xB JC kB",
194: "TB UB b VB WB XB YB ZB aB bB",
260: "cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC",
516: "uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "File System Access API"
};
},
40514: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n",
33: "J D E F A B C"
},
E: {
1: "E F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D 5B sB 6B 7B 8B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC NC OC"
},
H: {
2: "eC"
},
I: {
1: "I H iC yB jC kC",
2: "mB fC gC hC"
},
J: {
1: "A",
2: "D"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "Navigation Timing API"
};
},
72024: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G"
},
C: {
1: "1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B"
},
D: {
1: "6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B 9B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s FC GC HC IC jB xB JC kB"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC"
},
H: {
16: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
16: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
16: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
16: "xC"
},
R: {
16: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "Navigator Language API"
};
},
36466: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O",
1028: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB",
1028: "oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB FC GC HC IC jB xB JC kB",
1028: "HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "fC jC kC",
132: "mB I gC hC iC yB"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "pC qC tB rC sC tC uC vC lB wC",
132: "I",
516: "mC nC oC"
},
Q: {
1: "xC"
},
R: {
516: "yC"
},
S: {
260: "zC"
}
},
B: 7,
C: "Network Information API"
};
},
45324: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I",
36: "n J D E F A B C K L G M N O o p q"
},
E: {
1: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s t FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I fC gC hC iC yB",
36: "H jC kC"
},
J: {
1: "A",
2: "D"
},
K: {
2: "A B C jB xB kB",
36: "b"
},
L: {
513: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
36: "I",
258: "mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
258: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Web Notifications"
};
},
71497: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K"
},
C: {
1: "GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB 1B 2B"
},
D: {
1: "NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB"
},
E: {
1: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B"
},
F: {
1: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D",
16: "A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I mC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "Object.entries"
};
},
47079: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G",
260: "M N O"
},
C: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B"
},
D: {
1: "1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D 5B sB 6B 7B",
132: "E F 8B 9B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F G M N O FC GC HC",
33: "B C IC jB xB JC kB"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC NC",
132: "E OC PC QC"
},
H: {
33: "eC"
},
I: {
1: "H kC",
2: "mB I fC gC hC iC yB jC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A",
33: "B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS3 object-fit/object-position"
};
},
49413: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB",
2: "0 1 2 3 4 I n J D E F A B C K L G M N O o p q r s t u v w x y z JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 s t u v w x y z",
2: "6 7 8 9 F B C G M N O o p q r AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "I",
2: "mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "Object.observe data binding"
};
},
830: module => {
module.exports = {
A: {
A: {
8: "J D E F A B zB"
},
B: {
1: "L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K"
},
C: {
1: "GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
8: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB 1B 2B"
},
D: {
1: "NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
8: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB"
},
E: {
1: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
8: "I n J D E F A 5B sB 6B 7B 8B 9B"
},
F: {
1: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
8: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
8: "E sB KC yB LC MC NC OC PC QC RC"
},
H: {
8: "eC"
},
I: {
1: "H",
8: "mB I fC gC hC iC yB jC kC"
},
J: {
8: "D A"
},
K: {
1: "b",
8: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
8: "A B"
},
O: {
1: "lC"
},
P: {
1: "nC oC pC qC tB rC sC tC uC vC lB wC",
8: "I mC"
},
Q: {
1: "xC"
},
R: {
8: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "Object.values method"
};
},
47417: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "K L G M N O",
2: "C P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D",
130: "A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "Object RTC (ORTC) API for WebRTC"
};
},
71422: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "F zB",
8: "J D E"
},
B: {
1: "C K L G M N O P Q R S T",
2: "U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S 1B 2B",
2: "T U V W X Y Z c d e f g h i j k l a m H qB rB",
4: "mB",
8: "0B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T",
2: "U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
8: "5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB IC jB xB JC kB",
2: "F dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC",
8: "GC HC"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "mB I fC gC hC iC yB jC kC",
2: "H"
},
J: {
1: "D A"
},
K: {
1: "B C jB xB kB",
2: "A b"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 7,
C: "Offline web applications"
};
},
13075: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB 1B 2B",
194: "DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
1: "ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB",
322: "RB nB SB oB TB UB b VB WB XB YB"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB FC GC HC IC jB xB JC kB",
322: "EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
194: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "tB rC sC tC uC vC lB wC",
2: "I mC nC oC pC qC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
194: "zC"
}
},
B: 1,
C: "OffscreenCanvas"
};
},
96841: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
2: "0B mB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L 5B sB 6B 7B 8B 9B tB jB kB AC",
132: "G BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z HC IC jB xB JC kB",
2: "F FC GC"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "mB I H hC iC yB jC kC",
16: "fC gC"
},
J: {
1: "A",
2: "D"
},
K: {
1: "B C b jB xB kB",
2: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "Ogg Vorbis audio format"
};
},
31881: module => {
module.exports = {
A: {
A: {
2: "J D E zB",
8: "F A B"
},
B: {
1: "N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
8: "C K L G M"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
2: "0B mB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z HC IC jB xB JC kB",
2: "F FC GC"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
1: "a"
},
N: {
8: "A B"
},
O: {
1: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "Ogg/Theora video format"
};
},
90111: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G",
16: "M N O o"
},
E: {
1: "D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB 6B",
16: "J"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
2: "F B FC GC HC IC jB xB JC",
16: "C"
},
G: {
1: "E MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC"
},
H: {
1: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
1: "A",
2: "D"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Reversed attribute of ordered lists"
};
},
39589: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G"
},
C: {
1: "JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB 1B 2B"
},
D: {
1: "OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B 9B"
},
F: {
1: "BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB FC GC HC IC jB xB JC kB"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I mC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 1,
C: '"once" event listener option'
};
},
16836: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D zB",
260: "E"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
2: "0B mB",
516: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K"
},
E: {
1: "n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC",
4: "kB"
},
G: {
1: "E yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB KC"
},
H: {
2: "eC"
},
I: {
1: "mB I H hC iC yB jC kC",
16: "fC gC"
},
J: {
1: "A",
132: "D"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Online/offline status"
};
},
52492: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L 1B 2B"
},
D: {
1: "2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
2: "I n J D E F A 5B sB 6B 7B 8B 9B tB",
132: "B C K L G jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC",
132: "TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "Opus"
};
},
7624: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB",
194: "RB nB SB oB TB UB b VB WB"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 4,
C: "Orientation Sensor"
};
},
73615: module => {
module.exports = {
A: {
A: {
2: "J D zB",
260: "E",
388: "F A B"
},
B: {
1: "G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
388: "C K L"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z JC",
129: "kB",
260: "F B FC GC HC IC jB xB"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "C b kB",
260: "A B jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
388: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS outline properties"
};
},
59162: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L"
},
C: {
1: "HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB 1B 2B"
},
D: {
1: "QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B 9B"
},
F: {
1: "DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB FC GC HC IC jB xB JC kB"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "oC pC qC tB rC sC tC uC vC lB wC",
2: "I mC nC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "String.prototype.padStart(), String.prototype.padEnd()"
};
},
50547: module => {
module.exports = {
A: {
A: {
1: "B",
2: "J D E F A zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB KC yB"
},
H: {
2: "eC"
},
I: {
1: "mB I H hC iC yB jC kC",
16: "fC gC"
},
J: {
1: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "B",
2: "A"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "PageTransitionEvent"
};
},
67331: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F 1B 2B",
33: "A B C K L G M N"
},
D: {
1: "2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K",
33: "0 1 L G M N O o p q r s t u v w x y z"
},
E: {
1: "D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J 5B sB 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
2: "F B C FC GC HC IC jB xB JC",
33: "G M N O o"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB",
33: "jC kC"
},
J: {
1: "A",
2: "D"
},
K: {
1: "b kB",
2: "A B C jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
33: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "Page Visibility"
};
},
50106: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G"
},
C: {
1: "IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB 1B 2B"
},
D: {
1: "KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B 9B"
},
F: {
1: "7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 1,
C: "Passive event listeners"
};
},
53860: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O",
16: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H 1B 2B",
16: "qB rB"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB",
16: "rB 3B 4B"
},
E: {
1: "C K kB",
2: "I n J D E F A B 5B sB 6B 7B 8B 9B tB jB",
16: "L G AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB FC GC HC IC jB xB JC kB",
16: "MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
16: "eC"
},
I: {
2: "mB I fC gC hC iC yB jC kC",
16: "H"
},
J: {
2: "D",
16: "A"
},
K: {
2: "A B C jB xB kB",
16: "b"
},
L: {
16: "H"
},
M: {
16: "a"
},
N: {
2: "A",
16: "B"
},
O: {
16: "lC"
},
P: {
2: "I mC nC",
16: "oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
16: "xC"
},
R: {
16: "yC"
},
S: {
2: "zC"
}
},
B: 1,
C: "Password Rules"
};
},
79464: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K",
132: "L G M N O"
},
C: {
1: "HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B",
132: "0 1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB"
},
D: {
1: "YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 I n J D E F A B C K L G M N O o p q r s t u v w x y z",
132: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB"
},
E: {
1: "A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D 5B sB 6B 7B",
132: "E F 8B"
},
F: {
1: "OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r FC GC HC IC jB xB JC kB",
132: "0 1 2 3 4 5 6 7 8 9 s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB"
},
G: {
1: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC NC",
16: "E",
132: "OC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
1: "A",
2: "D"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
132: "lC"
},
P: {
1: "tB rC sC tC uC vC lB wC",
132: "I mC nC oC pC qC"
},
Q: {
132: "xC"
},
R: {
132: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Path2D"
};
},
58106: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K",
322: "L",
8196: "G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB 1B 2B",
4162: "OB PB QB RB nB SB oB TB UB b VB",
16452: "WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
1: "iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB",
194: "MB NB OB PB QB RB",
1090: "nB SB",
8196: "oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB"
},
E: {
1: "K L G kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B 9B",
514: "A B tB",
8196: "C jB"
},
F: {
1: "WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
194: "9 AB BB CB DB EB FB GB",
8196: "HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB"
},
G: {
1: "WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC",
514: "RC SC TC",
8196: "UC VC"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
2049: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "sC tC uC vC lB wC",
2: "I",
8196: "mC nC oC pC qC tB rC"
},
Q: {
8196: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 4,
C: "Payment Request API"
};
},
55179: module => {
module.exports = {
A: {
A: {
2: "J D E F A zB",
132: "B"
},
B: {
1: "G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
16: "C K L"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J D E F A B C K L"
},
E: {
1: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
16: "5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
2: "F B FC GC HC IC jB xB JC"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
16: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
16: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "Built-in PDF viewer"
};
},
20941: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB 1B 2B"
},
D: {
1: "CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB"
},
E: {
1: "lB EC",
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s t u v w x y FC GC HC IC jB xB JC kB"
},
G: {
1: "lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 7,
C: "Permissions API"
};
},
60008: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O",
258: "P Q R S T U",
322: "V W",
388: "X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB 1B 2B",
258: "eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB",
258: "SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U",
322: "V W",
388: "X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B 5B sB 6B 7B 8B 9B tB",
258: "C K L G jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB FC GC HC IC jB xB JC kB",
258: "GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB",
322: "cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC",
258: "UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I fC gC hC iC yB jC kC",
258: "H"
},
J: {
2: "D A"
},
K: {
2: "A B C jB xB kB",
258: "b"
},
L: {
388: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC",
258: "pC qC tB rC sC tC uC vC lB wC"
},
Q: {
258: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "Permissions Policy"
};
},
93035: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB 1B 2B",
132: "cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
1090: "XB",
1412: "bB",
1668: "YB ZB aB"
},
D: {
1: "aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB",
2114: "ZB"
},
E: {
1: "L G AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B 9B",
4100: "A B C K tB jB kB"
},
F: {
1: "dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
8196: "6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB"
},
G: {
1: "bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC",
4100: "PC QC RC SC TC UC VC WC XC YC ZC aC"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
16388: "H"
},
M: {
16388: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "Picture-in-Picture"
};
},
14444: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C"
},
C: {
1: "7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B",
578: "3 4 5 6"
},
D: {
1: "7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 I n J D E F A B C K L G M N O o p q r s t u v w x y z",
194: "6"
},
E: {
1: "A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s FC GC HC IC jB xB JC kB",
322: "t"
},
G: {
1: "QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Picture element"
};
},
19772: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M"
},
C: {
2: "0B",
194: "0 1 2 3 4 5 6 7 8 9 mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J D E F A B C K L"
},
E: {
1: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
194: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
194: "zC"
}
},
B: 1,
C: "Ping attribute"
};
},
30658: module => {
module.exports = {
A: {
A: {
1: "D E F A B",
2: "zB",
8: "J"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "PNG alpha transparency"
};
},
28147: module => {
module.exports = {
A: {
A: {
1: "B",
2: "J D E F A zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 2B",
2: "0B mB 1B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "B",
2: "A"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 7,
C: "CSS pointer-events (for HTML)"
};
},
51489: module => {
module.exports = {
A: {
A: {
1: "B",
2: "J D E F zB",
164: "A"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n 1B 2B",
8: "0 1 2 3 4 5 6 7 8 9 J D E F A B C K L G M N O o p q r s t u v w x y z",
328: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB"
},
D: {
1: "OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p q",
8: "0 1 2 3 4 5 6 7 8 9 r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB",
584: "LB MB NB"
},
E: {
1: "K L G AC BC CC uB vB wB DC lB EC",
2: "I n J 5B sB 6B",
8: "D E F A B C 7B 8B 9B tB jB",
1096: "kB"
},
F: {
1: "BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB",
8: "0 1 2 3 4 5 6 7 G M N O o p q r s t u v w x y z",
584: "8 9 AB"
},
G: {
1: "YC ZC aC bC cC dC uB vB wB lB",
8: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC",
6148: "XC"
},
H: {
2: "eC"
},
I: {
1: "H",
8: "mB I fC gC hC iC yB jC kC"
},
J: {
8: "D A"
},
K: {
1: "b",
2: "A",
8: "B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "B",
36: "A"
},
O: {
8: "lC"
},
P: {
1: "nC oC pC qC tB rC sC tC uC vC lB wC",
2: "mC",
8: "I"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
328: "zC"
}
},
B: 2,
C: "Pointer events"
};
},
50078: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C"
},
C: {
1: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K 1B 2B",
33: "0 1 2 3 4 5 6 7 8 9 L G M N O o p q r s t u v w x y z"
},
D: {
1: "6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G",
33: "0 1 2 3 4 5 r s t u v w x y z",
66: "M N O o p q"
},
E: {
1: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB",
33: "G M N O o p q r s"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "Pointer Lock API"
};
},
87868: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T",
322: "Z c d e f g h i j k l a m H",
450: "U V W X Y"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB",
194: "fB gB hB iB P Q R S T",
322: "V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
450: "U"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB FC GC HC IC jB xB JC kB",
194: "TB UB b VB WB XB YB ZB aB bB cB",
322: "dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
450: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "Portals"
};
},
5550: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB 1B 2B"
},
D: {
1: "gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB"
},
E: {
1: "K L G kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A B C 5B sB 6B 7B 8B 9B tB jB"
},
F: {
1: "TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB FC GC HC IC jB xB JC kB"
},
G: {
1: "XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "sC tC uC vC lB wC",
2: "I mC nC oC pC qC tB rC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "prefers-color-scheme media query"
};
},
83606: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB 1B 2B"
},
D: {
1: "eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB"
},
E: {
1: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B"
},
F: {
1: "b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB FC GC HC IC jB xB JC kB"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "rC sC tC uC vC lB wC",
2: "I mC nC oC pC qC tB"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "prefers-reduced-motion media query"
};
},
72656: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB"
},
E: {
1: "G BC CC uB vB wB DC lB EC",
2: "I n J D E F A B C K L 5B sB 6B 7B 8B 9B tB jB kB AC"
},
F: {
1: "TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB FC GC HC IC jB xB JC kB"
},
G: {
1: "cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "rC sC tC uC vC lB wC",
2: "I mC nC oC pC qC tB"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "Private class fields"
};
},
97285: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O P Q R S"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S"
},
E: {
1: "G BC CC uB vB wB DC lB EC",
2: "I n J D E F A B C K L 5B sB 6B 7B 8B 9B tB jB kB AC"
},
F: {
1: "aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB FC GC HC IC jB xB JC kB"
},
G: {
1: "cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "Public class fields"
};
},
50157: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D"
},
E: {
1: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z jB xB JC kB",
2: "F FC GC HC IC"
},
G: {
1: "E OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC",
132: "NC"
},
H: {
1: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
1: "D A"
},
K: {
1: "B C b jB xB kB",
2: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "progress element"
};
},
56193: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N"
},
C: {
1: "RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB 1B 2B"
},
D: {
1: "UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB"
},
E: {
1: "C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A B 5B sB 6B 7B 8B 9B tB"
},
F: {
1: "JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB FC GC HC IC jB xB JC kB"
},
G: {
1: "UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "pC qC tB rC sC tC uC vC lB wC",
2: "I mC nC oC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "Promise.prototype.finally"
};
},
54775: module => {
module.exports = {
A: {
A: {
8: "J D E F A B zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
4: "w x",
8: "0B mB I n J D E F A B C K L G M N O o p q r s t u v 1B 2B"
},
D: {
1: "2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
4: "1",
8: "0 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "E F A B C K L G 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
8: "I n J D 5B sB 6B 7B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
4: "o",
8: "F B C G M N O FC GC HC IC jB xB JC kB"
},
G: {
1: "E OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
8: "sB KC yB LC MC NC"
},
H: {
8: "eC"
},
I: {
1: "H kC",
8: "mB I fC gC hC iC yB jC"
},
J: {
8: "D A"
},
K: {
1: "b",
8: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
8: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "Promises"
};
},
92919: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "Proximity API"
};
},
21267: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N 1B 2B"
},
D: {
1: "IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "7 8 9 I n J D E F A B C K L G M N O AB BB CB DB EB FB GB HB",
66: "0 1 2 3 4 5 6 o p q r s t u v w x y z"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B 9B"
},
F: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 F B C u v w x y z FC GC HC IC jB xB JC kB",
66: "G M N O o p q r s t"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "Proxy object"
};
},
44318: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB 1B 2B",
4: "aB bB cB dB eB",
132: "ZB"
},
D: {
1: "cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB"
},
E: {
1: "G BC CC uB vB wB DC lB EC",
2: "I n J D E F A B C K 5B sB 6B 7B 8B 9B tB jB kB AC",
260: "L"
},
F: {
1: "SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB FC GC HC IC jB xB JC kB"
},
G: {
1: "bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "rC sC tC uC vC lB wC",
2: "I mC nC oC pC qC tB"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "Public class fields"
};
},
10603: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB",
2: "0 1 2 3 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB",
2: "0 1 2 3 4 5 6 I n J D E F A B C K L G M N O o p q r s t u v w x y z cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB",
2: "F B C G M N O o WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
4: "s",
16: "p q r t"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB",
2: "rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "HTTP Public Key Pinning"
};
},
57935: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "N O",
2: "C K L G M",
257: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB 1B 2B",
257: "DB FB GB HB IB JB KB MB NB OB PB QB RB nB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
1281: "EB LB SB"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB",
257: "JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
388: "DB EB FB GB HB IB"
},
E: {
2: "I n J D E F 5B sB 6B 7B 8B",
514: "A B C K L G 9B tB jB kB AC BC CC uB vB wB DC",
4100: "lB EC"
},
F: {
2: "0 1 2 3 4 5 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
16: "6 7 8 9 AB",
257: "BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
257: "zC"
}
},
B: 5,
C: "Push API"
};
},
92420: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "zB",
8: "J D",
132: "E"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
8: "0B mB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z GC HC IC jB xB JC kB",
8: "F FC"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "querySelector/querySelectorAll"
};
},
49373: module => {
module.exports = {
A: {
A: {
1: "J D E F A B",
16: "zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
16: "0B mB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J D E F A B C K L G M N O o p q r s t u"
},
E: {
1: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
16: "I n 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
16: "F FC",
132: "B C GC HC IC jB xB JC kB"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB KC yB LC MC"
},
H: {
1: "eC"
},
I: {
1: "mB I H hC iC yB jC kC",
16: "fC gC"
},
J: {
1: "D A"
},
K: {
1: "b",
132: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
257: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "readonly attribute of input and textarea elements"
};
},
50252: module => {
module.exports = {
A: {
A: {
2: "J D E F A zB",
132: "B"
},
B: {
1: "P Q R S",
132: "C K L G M N O",
513: "T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V",
2: "0 1 2 3 4 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B",
513: "W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
1: "oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T",
2: "I n J D E F A B C K L G M N O o p",
260: "0 1 2 3 4 5 6 7 8 9 q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB",
513: "U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "C jB kB",
2: "I n J D 5B sB 6B 7B",
132: "E F A B 8B 9B tB",
1025: "K L G AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB",
2: "F B C FC GC HC IC jB xB JC kB",
513: "dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
1: "VC WC XC YC",
2: "sB KC yB LC MC NC",
132: "E OC PC QC RC SC TC UC",
1025: "ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
513: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "Referrer Policy"
};
},
5677: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O",
129: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
2: "0B"
},
D: {
2: "I n J D E F A B C",
129: "0 1 2 3 4 5 6 7 8 9 K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "F B FC GC HC IC jB xB",
129: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D",
129: "A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 1,
C: "Custom protocol handling"
};
},
22595: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB 1B 2B"
},
D: {
1: "IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB"
},
E: {
1: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B"
},
F: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 1,
C: "rel=noopener"
};
},
40769: module => {
module.exports = {
A: {
A: {
2: "J D E F A zB",
132: "B"
},
B: {
1: "K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
16: "C"
},
C: {
1: "2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J D E F A B C K L G"
},
E: {
1: "n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB"
},
H: {
2: "eC"
},
I: {
1: "mB I H hC iC yB jC kC",
16: "fC gC"
},
J: {
1: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: 'Link type "noreferrer"'
};
},
14678: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M",
132: "N"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y 1B 2B"
},
D: {
1: "VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB",
132: "JB KB LB MB NB OB PB QB RB nB SB oB TB UB b"
},
E: {
1: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E 5B sB 6B 7B 8B"
},
F: {
1: "LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
132: "6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB"
},
G: {
1: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
132: "lC"
},
P: {
1: "qC tB rC sC tC uC vC lB wC",
2: "I",
132: "mC nC oC pC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "relList (DOMTokenList)"
};
},
12522: module => {
module.exports = {
A: {
A: {
1: "B",
2: "J D E zB",
132: "F A"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 2B",
2: "0B mB 1B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z JC kB",
2: "F B FC GC HC IC jB xB"
},
G: {
1: "E KC yB MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB",
260: "LC"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "C b kB",
2: "A B jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "rem (root em) units"
};
},
20650: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B",
33: "B C K L G M N O o p q r",
164: "I n J D E F A"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F",
33: "r s",
164: "O o p q",
420: "A B C K L G M N"
},
E: {
1: "D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB 6B",
33: "J"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC",
33: "MC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
1: "A",
2: "D"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "requestAnimationFrame"
};
},
66499: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB 1B 2B",
194: "MB NB"
},
D: {
1: "GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB"
},
E: {
2: "I n J D E F A B C K 5B sB 6B 7B 8B 9B tB jB kB",
322: "L G AC BC CC uB vB wB DC lB EC"
},
F: {
1: "3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC",
322: "aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "requestIdleCallback"
};
},
81527: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB 1B 2B"
},
D: {
1: "b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB",
194: "NB OB PB QB RB nB SB oB TB UB"
},
E: {
1: "L G AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A B C 5B sB 6B 7B 8B 9B tB jB kB",
66: "K"
},
F: {
1: "LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
194: "AB BB CB DB EB FB GB HB IB JB KB"
},
G: {
1: "aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "qC tB rC sC tC uC vC lB wC",
2: "I mC nC oC pC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "Resize Observer"
};
},
98631: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B",
194: "0 1 2 3"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p q r s t"
},
E: {
1: "C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B tB",
260: "B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "Resource Timing"
};
},
57010: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L 1B 2B"
},
D: {
1: "GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB",
194: "DB EB FB"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B 9B"
},
F: {
1: "3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
194: "0 1 2"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "Rest parameters"
};
},
76952: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L",
516: "G M N O"
},
C: {
1: "DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q 1B 2B",
33: "0 1 2 3 4 5 6 7 8 9 r s t u v w x y z AB BB CB"
},
D: {
1: "PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p q r",
33: "0 1 2 3 4 5 6 7 8 9 s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB"
},
E: {
1: "B C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B tB"
},
F: {
1: "CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N FC GC HC IC jB xB JC kB",
33: "0 1 2 3 4 5 6 7 8 9 O o p q r s t u v w x y z AB BB"
},
G: {
1: "TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D",
130: "A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
33: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
33: "xC"
},
R: {
33: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "WebRTC Peer-to-peer connections"
};
},
90076: module => {
module.exports = {
A: {
A: {
4: "J D E F A B zB"
},
B: {
4: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
8: "0 1 2 3 4 5 6 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B"
},
D: {
4: "0 1 2 3 4 5 6 7 8 9 n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
8: "I"
},
E: {
4: "n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
8: "I 5B sB"
},
F: {
4: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
8: "F B C FC GC HC IC jB xB JC kB"
},
G: {
4: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
8: "sB KC yB"
},
H: {
8: "eC"
},
I: {
4: "mB I H iC yB jC kC",
8: "fC gC hC"
},
J: {
4: "A",
8: "D"
},
K: {
4: "b",
8: "A B C jB xB kB"
},
L: {
4: "H"
},
M: {
1: "a"
},
N: {
4: "A B"
},
O: {
4: "lC"
},
P: {
4: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
4: "xC"
},
R: {
4: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Ruby annotation"
};
},
43534: module => {
module.exports = {
A: {
A: {
1: "E F A B",
2: "J D zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 I n J D E F A B C K L G M N O o p q r s t u v w x y z",
2: "1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "n J 6B",
2: "D E F A B C K L G 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
16: "7B",
129: "I 5B sB"
},
F: {
1: "F B C G M N O FC GC HC IC jB xB JC kB",
2: "0 1 2 3 4 5 6 7 8 9 o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
1: "KC yB LC MC NC",
2: "E OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
129: "sB"
},
H: {
1: "eC"
},
I: {
1: "mB I fC gC hC iC yB jC",
2: "H kC"
},
J: {
1: "D A"
},
K: {
1: "A B C jB xB kB",
2: "b"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
1: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "display: run-in"
};
},
34337: module => {
module.exports = {
A: {
A: {
2: "J D E F A zB",
388: "B"
},
B: {
1: "O P Q R S T U",
2: "C K L G",
129: "M N",
513: "V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB 1B 2B"
},
D: {
1: "KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB",
513: "Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "G BC CC uB vB wB DC lB EC",
2: "I n J D E F A B 5B sB 6B 7B 8B 9B tB jB",
2052: "L",
3076: "C K kB AC"
},
F: {
1: "8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB",
2: "0 1 2 3 4 5 6 7 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
513: "bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
1: "XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC",
2052: "VC WC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
513: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
16: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "'SameSite' cookie attribute"
};
},
50420: module => {
module.exports = {
A: {
A: {
2: "J D E F A zB",
164: "B"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
36: "C K L G M N O"
},
C: {
1: "DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N 1B 2B",
36: "0 1 2 3 4 5 6 7 8 9 O o p q r s t u v w x y z AB BB CB"
},
D: {
1: "7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s t FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A",
36: "B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
16: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "Screen Orientation"
};
},
6496: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 2B",
2: "0B mB 1B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D"
},
E: {
1: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB",
132: "n"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB"
},
H: {
2: "eC"
},
I: {
1: "mB I H iC yB jC kC",
2: "fC gC hC"
},
J: {
1: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "async attribute for external scripts"
};
},
30882: module => {
module.exports = {
A: {
A: {
1: "A B",
132: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB",
257: "I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D"
},
E: {
1: "n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB"
},
H: {
2: "eC"
},
I: {
1: "mB I H iC yB jC kC",
2: "fC gC hC"
},
J: {
1: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "defer attribute for external scripts"
};
},
31098: module => {
module.exports = {
A: {
A: {
2: "J D zB",
132: "E F A B"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
132: "C K L G M N O"
},
C: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
132: "0 1 2 3 4 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B"
},
D: {
1: "oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
132: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB"
},
E: {
1: "lB EC",
2: "I n 5B sB",
132: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC"
},
F: {
1: "HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F FC GC HC IC",
16: "B jB xB",
132: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB JC kB"
},
G: {
1: "lB",
16: "sB KC yB",
132: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB"
},
H: {
2: "eC"
},
I: {
1: "H",
16: "fC gC",
132: "mB I hC iC yB jC kC"
},
J: {
132: "D A"
},
K: {
1: "b",
132: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
132: "A B"
},
O: {
132: "lC"
},
P: {
132: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
132: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "scrollIntoView"
};
},
94253: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J D E F A B C K L"
},
E: {
1: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
16: "I n 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB KC yB"
},
H: {
2: "eC"
},
I: {
1: "mB I H hC iC yB jC kC",
16: "fC gC"
},
J: {
1: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "Element.scrollIntoViewIfNeeded()"
};
},
51509: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB",
2: "nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB",
2: "F B C dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "SDCH Accept-Encoding/Content-Encoding"
};
},
69343: module => {
module.exports = {
A: {
A: {
1: "F A B",
16: "zB",
260: "J D E"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
132: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB 1B 2B",
2180: "CB DB EB FB GB HB IB JB KB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J D E F A B C K L"
},
E: {
1: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
16: "I n 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
132: "F B C FC GC HC IC jB xB JC kB"
},
G: {
16: "yB",
132: "sB KC",
516: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
16: "mB I fC gC hC iC",
1025: "yB"
},
J: {
1: "A",
16: "D"
},
K: {
1: "b",
16: "A B C jB xB",
132: "kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "B",
16: "A"
},
O: {
1025: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2180: "zC"
}
},
B: 5,
C: "Selection API"
};
},
33666: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB 1B 2B"
},
D: {
1: "VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB",
196: "SB oB TB UB",
324: "b"
},
E: {
2: "I n J D E F A B C 5B sB 6B 7B 8B 9B tB jB",
516: "K L G kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "Server Timing"
};
},
58598: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L",
322: "G M"
},
C: {
1: "DB FB GB HB IB JB KB MB NB OB PB QB RB nB oB TB UB b VB WB XB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B",
194: "2 3 4 5 6 7 8 9 AB BB CB",
513: "EB LB SB YB"
},
D: {
1: "EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 I n J D E F A B C K L G M N O o p q r s t u v w x y z",
4: "9 AB BB CB DB"
},
E: {
1: "C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A B 5B sB 6B 7B 8B 9B tB"
},
F: {
1: "1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s t u v FC GC HC IC jB xB JC kB",
4: "0 w x y z"
},
G: {
1: "UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC"
},
H: {
2: "eC"
},
I: {
2: "mB I fC gC hC iC yB jC kC",
4: "H"
},
J: {
2: "D A"
},
K: {
2: "A B C jB xB kB",
4: "b"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
4: "yC"
},
S: {
2: "zC"
}
},
B: 4,
C: "Service Workers"
};
},
74437: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O",
2: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
1: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "Efficient Script Yielding: setImmediate()"
};
},
80788: module => {
module.exports = {
A: {
A: {
1: "J D E F A B",
2: "zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
132: "0 1 2 3 4 5 6 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
16: "eC"
},
I: {
1: "mB I H gC hC iC yB jC kC",
260: "fC"
},
J: {
1: "D A"
},
K: {
1: "b",
16: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
16: "a"
},
N: {
16: "A B"
},
O: {
16: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
16: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "SHA-2 SSL certificates"
};
},
24370: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P",
2: "C K L G M N O Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u v w x oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
66: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB"
},
D: {
1: "4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P",
2: "I n J D E F A B C K L G M N O o p q r s t Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
33: "0 1 2 3 u v w x y z"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB",
2: "F B C XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
33: "G M N O o p q"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB",
33: "jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC",
2: "tC uC vC lB wC",
33: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 7,
C: "Shadow DOM (deprecated V0 spec)"
};
},
40533: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB 1B 2B",
322: "RB",
578: "nB SB oB TB"
},
D: {
1: "MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB"
},
E: {
1: "A B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B 9B"
},
F: {
1: "9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB"
},
G: {
1: "TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC",
132: "RC SC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I",
4: "mC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "Shadow DOM (V1)"
};
},
42522: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z",
2: "C K L G",
194: "M N O",
513: "c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB 1B 2B",
194: "QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB",
450: "eB fB gB hB iB",
513: "P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
1: "YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB",
194: "SB oB TB UB b VB WB XB",
513: "c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A 5B sB 6B 7B 8B 9B",
194: "B C K L G tB jB kB AC BC CC",
513: "uB vB wB DC lB EC"
},
F: {
1: "b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB FC GC HC IC jB xB JC kB",
194: "GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC",
194: "SC TC UC VC WC XC YC ZC aC bC cC dC",
513: "uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
513: "H"
},
M: {
513: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "Shared Array Buffer"
};
},
472: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u v w x 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "n J 6B lB EC",
2: "I D E F A B C K L G 5B sB 7B 8B 9B tB jB kB AC BC CC uB vB wB DC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z IC jB xB JC kB",
2: "F FC GC HC"
},
G: {
1: "LC MC lB",
2: "E sB KC yB NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "B C jB xB kB",
2: "b",
16: "A"
},
L: {
2: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "I",
2: "mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Shared Web Workers"
};
},
10288: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J zB",
132: "D E"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB"
},
H: {
1: "eC"
},
I: {
1: "mB I H iC yB jC kC",
2: "fC gC hC"
},
J: {
1: "A",
2: "D"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "Server Name Indication"
};
},
91900: module => {
module.exports = {
A: {
A: {
1: "B",
2: "J D E F A zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB",
2: "0B mB I n J D E F A B C KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB",
2: "KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "E F A B C 9B tB jB",
2: "I n J D 5B sB 6B 7B 8B",
129: "K L G kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 G M N O o p q r s t u v w x y z BB DB kB",
2: "9 F B C AB CB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC"
},
G: {
1: "E OC PC QC RC SC TC UC VC",
2: "sB KC yB LC MC NC",
257: "WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "mB I iC yB jC kC",
2: "H fC gC hC"
},
J: {
2: "D A"
},
K: {
1: "kB",
2: "A B C b jB xB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
1: "B",
2: "A"
},
O: {
2: "lC"
},
P: {
1: "I",
2: "mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
16: "yC"
},
S: {
1: "zC"
}
},
B: 7,
C: "SPDY protocol"
};
},
45225: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O",
1026: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0B mB I n J D E F A B C K L G M N O o p q 1B 2B",
322: "0 1 2 3 4 5 6 7 8 9 r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
2: "I n J D E F A B C K L G M N O o p q r s t",
164: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L 5B sB 6B 7B 8B 9B tB jB kB AC",
2084: "G BC CC uB vB wB DC lB EC"
},
F: {
2: "F B C G M N O o p q r s t u v FC GC HC IC jB xB JC kB",
1026: "0 1 2 3 4 5 6 7 8 9 w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC",
2084: "cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
164: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
164: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
164: "xC"
},
R: {
164: "yC"
},
S: {
322: "zC"
}
},
B: 7,
C: "Speech Recognition API"
};
},
36358: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "L G M N O",
2: "C K",
257: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B",
194: "0 1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB"
},
D: {
1: "2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB",
2: "0 1 I n J D E F A B C K L G M N O o p q r s t u v w x y z",
257: "OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "D E F A B C K L G 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J 5B sB 6B 7B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB",
2: "F B C G M N O o p q r s t u v FC GC HC IC jB xB JC kB",
257: "b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 7,
C: "Speech Synthesis API"
};
},
42235: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E"
},
E: {
1: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z HC IC jB xB JC kB",
2: "F FC GC"
},
G: {
4: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
4: "eC"
},
I: {
4: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "A",
4: "D"
},
K: {
4: "A B C b jB xB kB"
},
L: {
4: "H"
},
M: {
4: "a"
},
N: {
4: "A B"
},
O: {
4: "lC"
},
P: {
4: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
4: "yC"
},
S: {
2: "zC"
}
},
B: 1,
C: "Spellcheck attribute"
};
},
69009: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB",
129: "rB 3B 4B"
},
E: {
1: "I n J D E F A B C 5B sB 6B 7B 8B 9B tB jB kB",
2: "K L G AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z HC IC jB xB JC kB",
2: "F FC GC"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC",
2: "XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "B C b jB xB kB",
2: "A"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "Web SQL Database"
};
},
94676: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
260: "C",
514: "K L G"
},
C: {
1: "7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B",
194: "1 2 3 4 5 6"
},
D: {
1: "7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 I n J D E F A B C K L G M N O o p q r s t u v w x y z",
260: "3 4 5 6"
},
E: {
1: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D 5B sB 6B 7B",
260: "E 8B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p FC GC HC IC jB xB JC kB",
260: "q r s t"
},
G: {
1: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC NC",
260: "E OC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Srcset and sizes attributes"
};
},
29162: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M 1B 2B",
129: "5 6 7 8 9 AB",
420: "0 1 2 3 4 N O o p q r s t u v w x y z"
},
D: {
1: "MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p",
420: "0 1 2 3 4 5 6 7 8 9 q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB"
},
E: {
1: "B C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B tB"
},
F: {
1: "9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B G M N FC GC HC IC jB xB JC",
420: "0 1 2 3 4 5 6 7 8 C O o p q r s t u v w x y z kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC",
513: "aC bC cC dC uB vB wB lB",
1537: "TC UC VC WC XC YC ZC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D",
420: "A"
},
K: {
1: "b",
2: "A B jB xB",
420: "C kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "nC oC pC qC tB rC sC tC uC vC lB wC",
420: "I mC"
},
Q: {
1: "xC"
},
R: {
420: "yC"
},
S: {
2: "zC"
}
},
B: 4,
C: "getUserMedia/Stream API"
};
},
86478: module => {
module.exports = {
A: {
A: {
2: "J D E F A zB",
130: "B"
},
B: {
1: "Y Z c d e f g h i j k l a m H",
16: "C K",
260: "L G",
1028: "P Q R S T U V W X",
5124: "M N O"
},
C: {
1: "m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB 1B 2B",
5124: "l a",
7172: "VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k",
7746: "QB RB nB SB oB TB UB b"
},
D: {
1: "Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB",
260: "LB MB NB OB PB QB RB",
1028: "nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X"
},
E: {
2: "I n J D E F 5B sB 6B 7B 8B 9B",
1028: "G BC CC uB vB wB DC lB EC",
3076: "A B C K L tB jB kB AC"
},
F: {
1: "gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
260: "8 9 AB BB CB DB EB",
1028: "FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC",
16: "RC",
1028: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
5124: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "vC lB wC",
2: "I mC nC",
1028: "oC pC qC tB rC sC tC uC"
},
Q: {
1028: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 1,
C: "Streams"
};
},
6513: module => {
module.exports = {
A: {
A: {
2: "J D E F A zB",
129: "B"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "D E F A B C K L G 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J 5B sB 6B 7B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
2: "F B FC GC HC IC jB xB JC"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
1: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "Strict Transport Security"
};
},
31423: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB",
2: "0B mB I n J D E F A B C K L G M N O o p oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
322: "OB PB QB RB nB SB"
},
D: {
2: "6 7 8 9 I n J D E F A B C K L G M N O o AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
194: "0 1 2 3 4 5 p q r s t u v w x y z"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 7,
C: "Scoped CSS"
};
},
21620: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M"
},
C: {
1: "CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB 1B 2B"
},
D: {
1: "EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB"
},
E: {
1: "B C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B tB"
},
F: {
1: "1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB"
},
G: {
1: "UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC",
194: "TC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "Subresource Integrity"
};
},
75158: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
516: "C K L G"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B",
260: "I n J D E F A B C K L G M N O o p q r s"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
4: "I"
},
E: {
1: "n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "5B",
132: "I sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
2: "F"
},
G: {
1: "E yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
132: "sB KC"
},
H: {
260: "eC"
},
I: {
1: "mB I H iC yB jC kC",
2: "fC gC hC"
},
J: {
1: "D A"
},
K: {
1: "b",
260: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "SVG in CSS backgrounds"
};
},
93350: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
2: "0B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I",
4: "n J D"
},
E: {
1: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC"
},
H: {
1: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
1: "A",
2: "D"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "SVG filters"
};
},
33349: module => {
module.exports = {
A: {
A: {
2: "F A B zB",
8: "J D E"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 I n J D E F A B C K L G M N O o p q r s t u v w x y z",
2: "KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
130: "7 8 9 AB BB CB DB EB FB GB HB IB JB"
},
E: {
1: "I n J D E F A B C K L G sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "5B"
},
F: {
1: "F B C G M N O o p q r s t FC GC HC IC jB xB JC kB",
2: "6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
130: "0 1 2 3 4 5 u v w x y z"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
258: "eC"
},
I: {
1: "mB I iC yB jC kC",
2: "H fC gC hC"
},
J: {
1: "D A"
},
K: {
1: "A B C jB xB kB",
2: "b"
},
L: {
130: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "I",
130: "mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
130: "yC"
},
S: {
2: "zC"
}
},
B: 2,
C: "SVG fonts"
};
},
25949: module => {
module.exports = {
A: {
A: {
2: "J D E zB",
260: "F A B"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L 1B 2B"
},
D: {
1: "JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 I n J D E F A B C K L G M N O o p q r s t u v w x y z",
132: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB"
},
E: {
1: "C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D F A B 5B sB 6B 7B 9B tB",
132: "E 8B"
},
F: {
1: "6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
2: "G M N O o p q r",
4: "B C GC HC IC jB xB JC",
16: "F FC",
132: "0 1 2 3 4 5 s t u v w x y z"
},
G: {
1: "UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC NC PC QC RC SC TC",
132: "E OC"
},
H: {
1: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D",
132: "A"
},
K: {
1: "b kB",
4: "A B C jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
132: "I"
},
Q: {
1: "xC"
},
R: {
132: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "SVG fragment identifiers"
};
},
17420: module => {
module.exports = {
A: {
A: {
2: "J D E zB",
388: "F A B"
},
B: {
4: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
260: "C K L G M N O"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
2: "0B",
4: "mB"
},
D: {
4: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "5B sB",
4: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
4: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
4: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I fC gC hC iC yB",
4: "H jC kC"
},
J: {
1: "A",
2: "D"
},
K: {
4: "A B C b jB xB kB"
},
L: {
4: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
4: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
4: "xC"
},
R: {
4: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "SVG effects for HTML"
};
},
32690: module => {
module.exports = {
A: {
A: {
2: "zB",
8: "J D E",
129: "F A B"
},
B: {
1: "N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
129: "C K L G M"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
8: "0B mB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
8: "I n J"
},
E: {
1: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
8: "I n 5B sB",
129: "J D E 6B 7B 8B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z JC kB",
2: "B IC jB xB",
8: "F FC GC HC"
},
G: {
1: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
8: "sB KC yB",
129: "E LC MC NC OC"
},
H: {
1: "eC"
},
I: {
1: "H jC kC",
2: "fC gC hC",
129: "mB I iC yB"
},
J: {
1: "A",
129: "D"
},
K: {
1: "C b kB",
8: "A B jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
129: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Inline SVG in HTML5"
};
},
23267: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
132: "I n J D E F A B C K L G M N O o p q r s t u v w"
},
E: {
1: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "5B",
4: "sB",
132: "I n J D E 6B 7B 8B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
132: "E sB KC yB LC MC NC OC"
},
H: {
1: "eC"
},
I: {
1: "H jC kC",
2: "fC gC hC",
132: "mB I iC yB"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "SVG in HTML img element"
};
},
10160: module => {
module.exports = {
A: {
A: {
2: "zB",
8: "J D E F A B"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
8: "C K L G M N O"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
8: "0B mB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
4: "I"
},
E: {
1: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
8: "5B sB",
132: "I n 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
132: "sB KC yB LC"
},
H: {
2: "eC"
},
I: {
1: "mB I H iC yB jC kC",
2: "fC gC hC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
8: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "SVG SMIL animation"
};
},
21703: module => {
module.exports = {
A: {
A: {
2: "zB",
8: "J D E",
772: "F A B"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
513: "C K L G M N O"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
4: "0B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
4: "5B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "H jC kC",
2: "fC gC hC",
132: "mB I iC yB"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
257: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "SVG (basic support)"
};
},
33497: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB",
132: "bB cB"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
16: "lC"
},
P: {
1: "rC sC tC uC vC lB wC",
2: "I mC nC oC pC qC tB"
},
Q: {
16: "xC"
},
R: {
16: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "Signed HTTP Exchanges (SXG)"
};
},
30948: module => {
module.exports = {
A: {
A: {
1: "D E F A B",
16: "J zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
16: "0B mB 1B 2B",
129: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J D E F A B C K L"
},
E: {
16: "I n 5B sB",
257: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
16: "F"
},
G: {
769: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
16: "eC"
},
I: {
16: "mB I H fC gC hC iC yB jC kC"
},
J: {
16: "D A"
},
K: {
16: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
16: "A B"
},
O: {
16: "lC"
},
P: {
16: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
16: "yC"
},
S: {
129: "zC"
}
},
B: 1,
C: "tabindex global attribute"
};
},
65319: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
16: "C"
},
C: {
1: "3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B"
},
D: {
1: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "A B K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B",
129: "C"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s t u v w x FC GC HC IC jB xB JC kB"
},
G: {
1: "PC QC RC SC TC UC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC",
129: "VC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "ES6 Template Literals (Template Strings)"
};
},
42067: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C",
388: "K L"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q 1B 2B"
},
D: {
1: "4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p q r s t u",
132: "0 1 2 3 v w x y z"
},
E: {
1: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D 5B sB 6B",
388: "E 8B",
514: "7B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB",
132: "G M N O o p q"
},
G: {
1: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC NC",
388: "E OC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "HTML templates"
};
},
64834: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "Temporal"
};
},
93766: module => {
module.exports = {
A: {
A: {
2: "J D E A B zB",
16: "F"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
16: "I n"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "B C"
},
E: {
2: "I J 5B sB 6B",
16: "n D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC xB JC kB",
16: "jB"
},
G: {
2: "sB KC yB LC MC",
16: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC iC yB jC kC",
16: "hC"
},
J: {
2: "A",
16: "D"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "Test feature - updated"
};
},
3916: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O",
2052: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0B mB I n 1B 2B",
1028: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
1060: "0 1 2 3 4 J D E F A B C K L G M N O o p q r s t u v w x y z"
},
D: {
2: "I n J D E F A B C K L G M N O o p q r s t u",
226: "0 1 2 3 4 5 6 7 8 9 v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB",
2052: "QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D 5B sB 6B 7B",
772: "K L G kB AC BC CC uB vB wB DC lB EC",
804: "E F A B C 9B tB jB",
1316: "8B"
},
F: {
2: "0 1 2 3 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
226: "4 5 6 7 8 9 AB BB CB",
2052: "DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "sB KC yB LC MC NC",
292: "E OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
2052: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2052: "lC"
},
P: {
2: "I mC nC",
2052: "oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
1: "yC"
},
S: {
1028: "zC"
}
},
B: 4,
C: "text-decoration styling"
};
},
45393: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "k l a m H",
2: "C K L G M N O",
164: "P Q R S T U V W X Y Z c d e f g h i j"
},
C: {
1: "FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB 1B 2B",
322: "EB"
},
D: {
1: "k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p q r s t",
164: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j"
},
E: {
1: "E F A B C K L G 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J 5B sB 6B",
164: "D 7B"
},
F: {
1: "V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB",
164: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB",
164: "jC kC"
},
J: {
2: "D",
164: "A"
},
K: {
2: "A B C jB xB kB",
164: "b"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
164: "lC"
},
P: {
164: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
164: "xC"
},
R: {
164: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "text-emphasis styling"
};
},
88751: module => {
module.exports = {
A: {
A: {
1: "J D E F A B",
2: "zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
8: "0B mB I n J 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z jB xB JC kB",
33: "F FC GC HC IC"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "b kB",
33: "A B C jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS3 Text-overflow"
};
},
94357: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
33: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB",
258: "v"
},
E: {
2: "I n J D E F A B C K L G 5B sB 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
258: "6B"
},
F: {
1: "CB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB DB FC GC HC IC jB xB JC kB"
},
G: {
2: "sB KC yB",
33: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
33: "a"
},
N: {
161: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "CSS text-size-adjust"
};
},
94297: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L",
33: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
161: "G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB 1B 2B",
161: "IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
450: "HB"
},
D: {
33: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
33: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "F B C FC GC HC IC jB xB JC kB",
33: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
33: "E KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
36: "sB"
},
H: {
2: "eC"
},
I: {
2: "mB",
33: "I H fC gC hC iC yB jC kC"
},
J: {
33: "D A"
},
K: {
2: "A B C jB xB kB",
33: "b"
},
L: {
33: "H"
},
M: {
161: "a"
},
N: {
2: "A B"
},
O: {
33: "lC"
},
P: {
33: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
33: "xC"
},
R: {
33: "yC"
},
S: {
161: "zC"
}
},
B: 7,
C: "CSS text-stroke and text-fill"
};
},
15033: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB 1B 2B",
130: "ZB"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "K L G kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A B C 5B sB 6B 7B 8B 9B tB jB"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "text-underline-offset"
};
},
82426: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
16: "5B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
16: "F"
},
G: {
1: "E KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB"
},
H: {
1: "eC"
},
I: {
1: "mB I H hC iC yB jC kC",
16: "fC gC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Node.textContent"
};
},
30201: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O 1B 2B",
132: "o"
},
D: {
1: "7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s t FC GC HC IC jB xB JC kB"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "TextEncoder & TextDecoder"
};
},
68123: module => {
module.exports = {
A: {
A: {
1: "B",
2: "J D zB",
66: "E F A"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB",
2: "0B mB I n J D E F A B C K L G M N O o p q r 1B 2B",
66: "s",
129: "YB ZB aB bB cB dB eB fB gB hB",
388: "iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T",
2: "I n J D E F A B C K L G M N O o p q",
1540: "U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "D E F A B C K 8B 9B tB jB kB",
2: "I n J 5B sB 6B 7B",
513: "L G AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB kB",
2: "F B C FC GC HC IC jB xB JC",
1540: "dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB"
},
H: {
1: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
1: "A",
2: "D"
},
K: {
1: "b kB",
2: "A B C jB xB"
},
L: {
1: "H"
},
M: {
129: "a"
},
N: {
1: "B",
66: "A"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "TLS 1.1"
};
},
79108: module => {
module.exports = {
A: {
A: {
1: "B",
2: "J D zB",
66: "E F A"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s 1B 2B",
66: "t u v"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p q r s t u v w x"
},
E: {
1: "D E F A B C K L G 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J 5B sB 6B 7B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F G FC",
66: "B C GC HC IC jB xB JC kB"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB"
},
H: {
1: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
1: "A",
2: "D"
},
K: {
1: "b kB",
2: "A B C jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "B",
66: "A"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "TLS 1.2"
};
},
31792: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB 1B 2B",
132: "SB oB TB",
450: "KB LB MB NB OB PB QB RB nB"
},
D: {
1: "aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB",
706: "NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB"
},
E: {
1: "L G BC CC uB vB wB DC lB EC",
2: "I n J D E F A B C 5B sB 6B 7B 8B 9B tB jB",
1028: "K kB AC"
},
F: {
1: "QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB FC GC HC IC jB xB JC kB",
706: "NB OB PB"
},
G: {
1: "WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "tB rC sC tC uC vC lB wC",
2: "I mC nC oC pC qC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "TLS 1.3"
};
},
14468: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L",
194: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
257: "G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H 1B 2B",
16: "qB rB"
},
D: {
2: "0 1 2 3 4 5 6 7 I n J D E F A B C K L G M N O o p q r s t u v w x y z",
16: "8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB",
194: "RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E 5B sB 6B 7B 8B",
16: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "F B C G M N O o p q r s t u v w x y FC GC HC IC jB xB JC kB",
16: "0 1 2 3 4 5 6 7 8 9 z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "E sB KC yB LC MC NC OC",
16: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
16: "eC"
},
I: {
2: "mB I fC gC hC iC yB jC kC",
16: "H"
},
J: {
2: "D A"
},
K: {
2: "A B C jB xB kB",
16: "b"
},
L: {
16: "H"
},
M: {
16: "a"
},
N: {
2: "A",
16: "B"
},
O: {
16: "lC"
},
P: {
16: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
16: "xC"
},
R: {
16: "yC"
},
S: {
2: "zC"
}
},
B: 6,
C: "Token Binding"
};
},
14039: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
8: "A B"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
578: "C K L G M N O"
},
C: {
1: "O o p q r s t LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B",
4: "I n J D E F A B C K L G M N",
194: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p q"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "B C b jB xB kB",
2: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
8: "A",
260: "B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 2,
C: "Touch events"
};
},
78129: module => {
module.exports = {
A: {
A: {
2: "zB",
8: "J D E",
129: "A B",
161: "F"
},
B: {
1: "N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
129: "C K L G M"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB",
33: "I n J D E F A B C K L G 1B 2B"
},
D: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
33: "0 1 2 3 4 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
33: "I n J D E 5B sB 6B 7B 8B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
2: "F FC GC",
33: "B C G M N O o p q r HC IC jB xB JC"
},
G: {
1: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
33: "E sB KC yB LC MC NC OC"
},
H: {
2: "eC"
},
I: {
1: "H",
33: "mB I fC gC hC iC yB jC kC"
},
J: {
33: "D A"
},
K: {
1: "B C b jB xB kB",
2: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "CSS3 2D Transforms"
};
},
88319: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
132: "A B"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F 1B 2B",
33: "A B C K L G"
},
D: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B",
33: "0 1 2 3 4 C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "vB wB DC lB EC",
2: "5B sB",
33: "I n J D E 6B 7B 8B",
257: "F A B C K L G 9B tB jB kB AC BC CC uB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB",
33: "G M N O o p q r"
},
G: {
1: "vB wB lB",
33: "E sB KC yB LC MC NC OC",
257: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "fC gC hC",
33: "mB I iC yB jC kC"
},
J: {
33: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
132: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "CSS3 3D Transforms"
};
},
78491: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O P Q R"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "tC uC vC lB wC",
2: "I mC nC oC pC qC tB rC sC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "Trusted Types for DOM manipulation"
};
},
613: module => {
module.exports = {
A: {
A: {
2: "J D E zB",
132: "F A B"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
2: "0B mB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z GC HC IC jB xB JC kB",
2: "F FC"
},
G: {
1: "E yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC"
},
H: {
2: "eC"
},
I: {
1: "mB I H gC hC iC yB jC kC",
2: "fC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
132: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "TTF/OTF - TrueType and OpenType font support"
};
},
77803: module => {
module.exports = {
A: {
A: {
1: "B",
2: "J D E F zB",
132: "A"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J"
},
E: {
1: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB",
260: "6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z JC kB",
2: "F B FC GC HC IC jB xB"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC",
260: "yB"
},
H: {
1: "eC"
},
I: {
1: "I H iC yB jC kC",
2: "mB fC gC hC"
},
J: {
1: "A",
2: "D"
},
K: {
1: "C b kB",
2: "A B jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
132: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "Typed Arrays"
};
},
77364: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O",
513: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB 1B 2B",
322: "GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB"
},
D: {
2: "0 1 2 3 4 5 6 I n J D E F A B C K L G M N O o p q r s t u v w x y z 3B 4B",
130: "7 8 9",
513: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i",
578: "j k l a m H qB rB"
},
E: {
1: "K L G AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A B C 5B sB 6B 7B 8B 9B tB jB kB"
},
F: {
2: "0 1 2 3 4 5 6 7 8 F B C G M N O o p q r s t u v w x y z AB FC GC HC IC jB xB JC kB",
513: "9 BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
1: "ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
322: "zC"
}
},
B: 7,
C: "FIDO U2F API"
};
},
56069: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB 1B 2B"
},
D: {
1: "IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB"
},
E: {
1: "B C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B tB"
},
F: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB"
},
G: {
1: "UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC",
16: "TC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 1,
C: "unhandledrejection/rejectionhandled events"
};
},
78878: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M"
},
C: {
1: "BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB 1B 2B"
},
D: {
1: "CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB"
},
E: {
1: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s t u v w x y FC GC HC IC jB xB JC kB"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "Upgrade Insecure Requests"
};
},
16099: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O",
66: "P Q R"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB",
66: "eB fB gB hB iB P Q"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB FC GC HC IC jB xB JC kB",
66: "WB XB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "tC uC vC lB wC",
2: "I mC nC oC pC qC tB rC sC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "URL Scroll-To-Text Fragment"
};
},
89674: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u 1B 2B"
},
D: {
1: "1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p q r",
130: "0 s t u v w x y z"
},
E: {
1: "E F A B C K L G 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J 5B sB 6B 7B",
130: "D"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB",
130: "G M N O"
},
G: {
1: "E OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC",
130: "NC"
},
H: {
2: "eC"
},
I: {
1: "H kC",
2: "mB I fC gC hC iC yB",
130: "jC"
},
J: {
2: "D",
130: "A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "URL API"
};
},
37791: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M"
},
C: {
1: "DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u v w x 1B 2B",
132: "0 1 2 3 4 5 6 7 8 9 y z AB BB CB"
},
D: {
1: "IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB"
},
E: {
1: "B C K L G tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B"
},
F: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB"
},
G: {
1: "SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "URLSearchParams"
};
},
66905: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C"
},
E: {
1: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB",
132: "n 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z JC kB",
2: "F B FC GC HC IC jB xB"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB"
},
H: {
1: "eC"
},
I: {
1: "mB I H iC yB jC kC",
2: "fC gC hC"
},
J: {
1: "D A"
},
K: {
1: "C b xB kB",
2: "A B jB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "ECMAScript 5 Strict Mode"
};
},
18160: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
33: "A B"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
33: "C K L G M N O"
},
C: {
1: "ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
33: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB 1B 2B"
},
D: {
1: "NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
33: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB"
},
E: {
1: "EC",
33: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB"
},
F: {
1: "AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB",
33: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z"
},
G: {
33: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
33: "mB I fC gC hC iC yB jC kC"
},
J: {
33: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
33: "A B"
},
O: {
2: "lC"
},
P: {
1: "nC oC pC qC tB rC sC tC uC vC lB wC",
33: "I mC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
33: "zC"
}
},
B: 5,
C: "CSS user-select: none"
};
},
97478: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p q r s t"
},
E: {
1: "B C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B tB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "User Timing API"
};
},
28155: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB 1B 2B",
4609: "TB UB b VB WB XB YB ZB aB",
4674: "oB",
5698: "SB",
7490: "MB NB OB PB QB",
7746: "RB nB",
8705: "bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
1: "XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB",
4097: "WB",
4290: "nB SB oB",
6148: "TB UB b VB"
},
E: {
1: "G CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B tB",
4609: "B C jB kB",
8193: "K L AC BC"
},
F: {
1: "NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB FC GC HC IC jB xB JC kB",
4097: "MB",
6148: "IB JB KB LB"
},
G: {
1: "XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC",
4097: "TC UC VC WC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
4097: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC",
4097: "pC qC tB rC sC tC uC vC lB wC"
},
Q: {
4097: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "Variable fonts"
};
},
50811: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J D E F A B C K L"
},
E: {
1: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z JC kB",
2: "F B FC GC HC IC jB xB"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB KC yB"
},
H: {
1: "eC"
},
I: {
1: "H jC kC",
16: "mB I fC gC hC iC yB"
},
J: {
16: "D A"
},
K: {
1: "C b kB",
2: "A B jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "SVG vector-effect: non-scaling-stroke"
};
},
78925: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A 1B 2B",
33: "B C K L G"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o p q r s t u v w x y"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
1: "A",
2: "D"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "Vibration API"
};
},
78261: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB",
260: "I n J D E F A B C K L G M N O o 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A 6B 7B 8B 9B tB",
2: "5B sB",
513: "B C K L G jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z HC IC jB xB JC kB",
2: "F FC GC"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC",
513: "TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "mB I H hC iC yB jC kC",
132: "fC gC"
},
J: {
1: "D A"
},
K: {
1: "B C b jB xB kB",
2: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Video element"
};
},
18437: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "C K L G M N O",
322: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B",
194: "2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB",
322: "EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J 5B sB 6B"
},
F: {
2: "0 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
322: "1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
322: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
194: "zC"
}
},
B: 1,
C: "Video Tracks"
};
},
68502: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k",
194: "l a m H qB rB 3B 4B"
},
E: {
1: "vB wB DC lB EC",
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "Large, Small, and Dynamic viewport units"
};
},
46334: module => {
module.exports = {
A: {
A: {
2: "J D E zB",
132: "F",
260: "A B"
},
B: {
1: "M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
260: "C K L G"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N O o",
260: "p q r s t u"
},
E: {
1: "D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB 6B",
260: "J"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC",
516: "NC",
772: "MC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
1: "A",
2: "D"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
260: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "Viewport units: vw, vh, vmin, vmax"
};
},
57189: module => {
module.exports = {
A: {
A: {
2: "J D zB",
4: "E F A B"
},
B: {
4: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
4: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
4: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "5B sB",
4: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "F",
4: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
4: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
4: "eC"
},
I: {
2: "mB I fC gC hC iC yB",
4: "H jC kC"
},
J: {
2: "D A"
},
K: {
4: "A B C b jB xB kB"
},
L: {
4: "H"
},
M: {
4: "a"
},
N: {
4: "A B"
},
O: {
2: "lC"
},
P: {
4: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
4: "xC"
},
R: {
4: "yC"
},
S: {
4: "zC"
}
},
B: 2,
C: "WAI-ARIA Accessibility features"
};
},
6127: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "Z c d e f g h i j k l a m H",
2: "C K L G M N O",
194: "P Q R S T U V W X Y"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB",
194: "bB cB dB eB fB gB hB iB P Q R S T"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB FC GC HC IC jB xB JC kB",
194: "RB SB TB UB b VB WB XB YB ZB aB bB cB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "uC vC lB wC",
2: "I mC nC oC pC qC tB rC sC tC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 4,
C: "Screen Wake Lock API"
};
},
47185: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L",
578: "G"
},
C: {
1: "MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB 1B 2B",
194: "GB HB IB JB KB",
1025: "LB"
},
D: {
1: "QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB",
322: "KB LB MB NB OB PB"
},
E: {
1: "B C K L G jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B tB"
},
F: {
1: "DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
322: "7 8 9 AB BB CB"
},
G: {
1: "TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "oC pC qC tB rC sC tC uC vC lB wC",
2: "I mC nC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
194: "zC"
}
},
B: 6,
C: "WebAssembly"
};
},
76069: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
2: "0B mB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D"
},
E: {
1: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z HC IC jB xB JC kB",
2: "F FC GC"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "mB I H hC iC yB jC kC",
16: "fC gC"
},
J: {
1: "D A"
},
K: {
1: "B C b jB xB kB",
16: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "Wav audio format"
};
},
64158: module => {
module.exports = {
A: {
A: {
1: "J D zB",
2: "E F A B"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
16: "5B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
16: "F"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB KC yB"
},
H: {
1: "eC"
},
I: {
1: "mB I H hC iC yB jC kC",
16: "fC gC"
},
J: {
1: "D A"
},
K: {
1: "B C b jB xB kB",
2: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "wbr (word break opportunity) element"
};
},
10566: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O",
260: "P Q R S"
},
C: {
1: "R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B",
260: "nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB",
516: "GB HB IB JB KB LB MB NB OB PB QB RB",
580: "2 3 4 5 6 7 8 9 AB BB CB DB EB FB",
2049: "fB gB hB iB P Q"
},
D: {
1: "T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 I n J D E F A B C K L G M N O o p q r s t u v w x y z",
132: "5 6 7",
260: "8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S"
},
E: {
1: "G CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B tB",
1090: "B C K jB kB",
2049: "L AC BC"
},
F: {
1: "bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r FC GC HC IC jB xB JC kB",
132: "s t u",
260: "0 1 2 3 4 5 6 7 8 9 v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC",
1090: "TC UC VC WC XC YC ZC",
2049: "aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
260: "lC"
},
P: {
260: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
260: "xC"
},
R: {
260: "yC"
},
S: {
516: "zC"
}
},
B: 5,
C: "Web Animations API"
};
},
9779: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M",
130: "N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
578: "gB hB iB P Q R pB S T U"
},
D: {
1: "8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC",
260: "UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "Add to home screen (A2HS)"
};
},
4238: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O",
1025: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB",
194: "EB FB GB HB IB JB KB LB",
706: "MB NB OB",
1025: "PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
450: "5 6 7 8",
706: "9 AB BB",
1025: "CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I fC gC hC iC yB jC kC",
1025: "H"
},
J: {
2: "D A"
},
K: {
2: "A B C jB xB kB",
1025: "b"
},
L: {
1025: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "nC oC pC qC tB rC sC tC uC vC lB wC",
2: "I mC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "Web Bluetooth"
};
},
69309: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "Y Z c d e f g h i j k l a m H",
2: "C K L G M N O",
66: "P Q R S T U V W X"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB",
66: "iB P Q R S T U V W X"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b FC GC HC IC jB xB JC kB",
66: "VB WB XB YB ZB aB bB cB dB eB fB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "Web Serial API"
};
},
49362: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "g h i j k l a m H",
2: "C K L G M N O P Q",
516: "R S T U V W X Y Z c d e f"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X",
130: "O o p q r s t",
1028: "Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "L G BC CC uB vB wB DC lB EC",
2: "I n J D E F A B C 5B sB 6B 7B 8B 9B tB jB",
2049: "K kB AC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC",
2049: "WC XC YC ZC aC"
},
H: {
2: "eC"
},
I: {
2: "mB I fC gC hC iC yB jC",
258: "H kC"
},
J: {
2: "D A"
},
K: {
2: "A B C jB xB kB",
258: "b"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "pC qC tB rC sC tC uC vC lB wC",
2: "I",
258: "mC nC oC"
},
Q: {
2: "xC"
},
R: {
16: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "Web Share API"
};
},
66572: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C",
226: "K L G M N"
},
C: {
1: "SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB 1B 2B"
},
D: {
1: "XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB"
},
E: {
1: "K L G AC BC CC uB vB wB DC lB EC",
2: "I n J D E F A B C 5B sB 6B 7B 8B 9B tB jB",
322: "kB"
},
F: {
1: "NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB FC GC HC IC jB xB JC kB"
},
G: {
1: "cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC",
578: "YC",
2052: "bC",
3076: "ZC aC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "wC",
2: "I mC nC oC pC qC tB rC sC tC uC vC lB"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 2,
C: "Web Authentication API"
};
},
95647: module => {
module.exports = {
A: {
A: {
2: "zB",
8: "J D E F A",
129: "B"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
129: "C K L G M N O"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B",
129: "I n J D E F A B C K L G M N O o p q r s"
},
D: {
1: "2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D",
129: "0 1 E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "E F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB",
129: "J D 6B 7B 8B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B FC GC HC IC jB xB JC",
129: "C G M N O kB"
},
G: {
1: "E OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC NC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
1: "A",
2: "D"
},
K: {
1: "C b kB",
2: "A B jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
8: "A",
129: "B"
},
O: {
129: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
129: "zC"
}
},
B: 6,
C: "WebGL - 3D Canvas graphics"
};
},
1572: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t 1B 2B",
194: "BB CB DB",
450: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB",
2242: "EB FB GB HB IB JB"
},
D: {
1: "PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB",
578: "CB DB EB FB GB HB IB JB KB LB MB NB OB"
},
E: {
1: "G CC uB vB wB DC lB EC",
2: "I n J D E F A 5B sB 6B 7B 8B 9B",
1090: "B C K L tB jB kB AC BC"
},
F: {
1: "CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB FC GC HC IC jB xB JC kB"
},
G: {
1: "dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC",
1090: "VC WC XC YC ZC aC bC cC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "oC pC qC tB rC sC tC uC vC lB wC",
2: "I mC nC"
},
Q: {
578: "xC"
},
R: {
2: "yC"
},
S: {
2242: "zC"
}
},
B: 6,
C: "WebGL 2.0"
};
},
8938: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P",
578: "Q R S T U V W X Y Z c d e",
1602: "f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB 1B 2B",
194: "UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P",
578: "Q R S T U V W X Y Z c d e",
1602: "f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B 5B sB 6B 7B 8B 9B tB",
322: "C K L G jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB FC GC HC IC jB xB JC kB",
578: "dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
194: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 5,
C: "WebGPU"
};
},
21918: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "Y Z c d e f g h i j k l a m H",
2: "C K L G M N O",
66: "P Q R S T U V W X"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB",
66: "iB P Q R S T U V W X"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB FC GC HC IC jB xB JC kB",
66: "WB XB YB ZB aB bB cB dB eB fB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "WebHID API"
};
},
73157: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O",
132: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
16: "I n J D E F A B C K L G",
132: "0 1 2 3 4 5 6 7 8 9 M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "F B C FC GC HC IC jB xB JC kB",
132: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "CSS -webkit-user-drag property"
};
},
57365: module => {
module.exports = {
A: {
A: {
2: "J D E zB",
520: "F A B"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
8: "C K",
388: "L G M N O"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B",
132: "I n J D E F A B C K L G M N O o p q r s t u v w"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n",
132: "J D E F A B C K L G M N O o p q r s t"
},
E: {
1: "lB EC",
2: "5B",
8: "I n sB 6B",
520: "J D E F A B C 7B 8B 9B tB jB",
1028: "K kB AC",
7172: "L",
8196: "G BC CC uB vB wB DC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F FC GC HC",
132: "B C G IC jB xB JC kB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC",
1028: "WC XC YC ZC aC",
3076: "bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "fC gC",
132: "mB I hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
8: "A B"
},
O: {
1: "lC"
},
P: {
1: "mC nC oC pC qC tB rC sC tC uC vC lB wC",
132: "I"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "WebM video format"
};
},
71614: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O P Y Z c d e f g h i j k l a m H",
450: "Q R S T U V W X"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Y Z c d e f g h i j k l a m H qB rB 3B 4B",
450: "Q R S T U V W X"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB FC GC HC IC jB xB JC kB",
450: "XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
257: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "Web NFC"
};
},
35819: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N"
},
C: {
1: "VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B",
8: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b"
},
D: {
1: "1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n",
8: "J D E",
132: "F A B C K L G M N O o p q r",
260: "0 s t u v w x y z"
},
E: {
1: "lB EC",
2: "I n J D E F A B C K 5B sB 6B 7B 8B 9B tB jB kB AC",
516: "L G BC CC uB vB wB DC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F FC GC HC",
8: "B IC",
132: "jB xB JC",
260: "C G M N O kB"
},
G: {
1: "bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC"
},
H: {
1: "eC"
},
I: {
1: "H yB jC kC",
2: "mB fC gC hC",
132: "I iC"
},
J: {
2: "D A"
},
K: {
1: "C b jB xB kB",
2: "A",
132: "B"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
8: "zC"
}
},
B: 6,
C: "WebP image format"
};
},
9470: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB 1B 2B",
132: "I n",
292: "J D E F A"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
132: "I n J D E F A B C K L",
260: "G"
},
E: {
1: "D E F A B C K L G 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB",
132: "n 6B",
260: "J 7B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
2: "F FC GC HC IC",
132: "B C jB xB JC"
},
G: {
1: "E MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC",
132: "yB LC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
1: "A",
129: "D"
},
K: {
1: "b kB",
2: "A",
132: "B C jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Web Sockets"
};
},
70347: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB",
66: "NB OB PB QB RB nB SB"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z FC GC HC IC jB xB JC kB",
66: "AB BB CB DB EB FB GB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
1: "pC qC tB rC sC tC uC vC lB wC",
2: "I mC nC oC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "WebUSB"
};
},
75301: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L Q R S T U V W X Y Z c d e f g h i j k l a m H",
66: "P",
257: "G M N O"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB 1B 2B",
129: "OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
194: "NB"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
66: "QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P"
},
E: {
2: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
66: "DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C b jB xB kB"
},
L: {
2: "H"
},
M: {
2: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
513: "I",
516: "mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
66: "yC"
},
S: {
2: "zC"
}
},
B: 7,
C: "WebVR API"
};
},
67638: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0B mB I n J D E F A B C K L G M N O o p q r s 1B 2B",
66: "t u v w x y z",
129: "0 1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB",
257: "OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I n J D E F A B C K L G M N"
},
E: {
1: "J D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB LC MC"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB I fC gC hC iC yB"
},
J: {
1: "A",
2: "D"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "B",
2: "A"
},
O: {
2: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
129: "zC"
}
},
B: 5,
C: "WebVTT - Web Video Text Tracks"
};
},
59350: module => {
module.exports = {
A: {
A: {
1: "A B",
2: "zB",
8: "J D E F"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
8: "0B mB"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
8: "5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z IC jB xB JC kB",
2: "F FC",
8: "GC HC"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB"
},
H: {
2: "eC"
},
I: {
1: "H fC jC kC",
2: "mB I gC hC iC yB"
},
J: {
1: "D A"
},
K: {
1: "B C b jB xB kB",
8: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Web Workers"
};
},
67870: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
2: "C K L G M N O",
132: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
2: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB 1B 2B",
322: "hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB"
},
D: {
2: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b",
66: "VB WB XB YB ZB aB bB cB dB eB fB gB hB iB",
132: "P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
2: "I n J D E F A B C 5B sB 6B 7B 8B 9B tB jB kB",
578: "K L G AC BC CC uB vB wB DC lB EC"
},
F: {
2: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB FC GC HC IC jB xB JC kB",
66: "LB MB NB OB PB QB RB SB TB UB b VB",
132: "WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z"
},
G: {
2: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
2: "eC"
},
I: {
2: "mB I H fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
2: "A B C jB xB kB",
132: "b"
},
L: {
132: "H"
},
M: {
322: "a"
},
N: {
2: "A B"
},
O: {
2: "lC"
},
P: {
2: "I mC nC oC pC qC tB rC",
132: "sC tC uC vC lB wC"
},
Q: {
2: "xC"
},
R: {
2: "yC"
},
S: {
2: "zC"
}
},
B: 4,
C: "WebXR Device API"
};
},
1873: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K L G M N O"
},
C: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L G M N O o p q r s t u v w x 1B 2B",
194: "0 1 2 3 4 y z"
},
D: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r s FC GC HC IC jB xB JC kB"
},
G: {
1: "QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "CSS will-change property"
};
},
18244: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 2B",
2: "0B mB 1B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "I"
},
E: {
1: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I n 5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z jB xB JC kB",
2: "F B FC GC HC IC"
},
G: {
1: "E LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB"
},
H: {
2: "eC"
},
I: {
1: "H jC kC",
2: "mB fC gC hC iC yB",
130: "I"
},
J: {
1: "D A"
},
K: {
1: "B C b jB xB kB",
2: "A"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 2,
C: "WOFF - Web Open Font Format"
};
},
4419: module => {
module.exports = {
A: {
A: {
2: "J D E F A B zB"
},
B: {
1: "L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
2: "C K"
},
C: {
1: "8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0 1 2 3 4 5 6 7 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z 1B 2B"
},
D: {
1: "5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
2: "0 1 2 3 4 I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "C K L G kB AC BC CC uB vB wB DC lB EC",
2: "I n J D E F 5B sB 6B 7B 8B 9B",
132: "A B tB jB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C G M N O o p q r FC GC HC IC jB xB JC kB"
},
G: {
1: "RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "E sB KC yB LC MC NC OC PC QC"
},
H: {
2: "eC"
},
I: {
1: "H",
2: "mB I fC gC hC iC yB jC kC"
},
J: {
2: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
2: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "WOFF 2.0 - Web Open Font Format"
};
},
20339: module => {
module.exports = {
A: {
A: {
1: "J D E F A B zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB I n J D E F A B C K L 1B 2B"
},
D: {
1: "DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
4: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB"
},
E: {
1: "F A B C K L G 9B tB jB kB AC BC CC uB vB wB DC lB EC",
4: "I n J D E 5B sB 6B 7B 8B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
2: "F B C FC GC HC IC jB xB JC kB",
4: "G M N O o p q r s t u v w x y z"
},
G: {
1: "PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
4: "E sB KC yB LC MC NC OC"
},
H: {
2: "eC"
},
I: {
1: "H",
4: "mB I fC gC hC iC yB jC kC"
},
J: {
4: "D A"
},
K: {
1: "b",
2: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
4: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
4: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 5,
C: "CSS3 word-break"
};
},
25443: module => {
module.exports = {
A: {
A: {
4: "J D E F A B zB"
},
B: {
1: "O P Q R S T U V W X Y Z c d e f g h i j k l a m H",
4: "C K L G M N"
},
C: {
1: "IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB",
4: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
4: "I n J D E F A B C K L G M N O o p q r"
},
E: {
1: "D E F A B C K L G 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
4: "I n J 5B sB 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
2: "F FC GC",
4: "B C HC IC jB xB JC"
},
G: {
1: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
4: "sB KC yB LC MC"
},
H: {
4: "eC"
},
I: {
1: "H jC kC",
4: "mB I fC gC hC iC yB"
},
J: {
1: "A",
4: "D"
},
K: {
1: "b",
4: "A B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
4: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
4: "zC"
}
},
B: 5,
C: "CSS3 Overflow-wrap"
};
},
89253: module => {
module.exports = {
A: {
A: {
2: "J D zB",
132: "E F",
260: "A B"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B",
2: "0B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "5B sB"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB",
2: "F"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
4: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "Cross-document messaging"
};
},
37103: module => {
module.exports = {
A: {
A: {
1: "E F A B",
2: "J D zB"
},
B: {
1: "C K L G M N O",
4: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB",
4: "I n J D E F A B C K L G M N aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
16: "0B mB 1B 2B"
},
D: {
4: "0 1 2 3 4 5 6 7 8 9 v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J D E F A B C K L G M N O o p q r s t u"
},
E: {
4: "J D E F A B C K L G 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
16: "I n 5B sB"
},
F: {
4: "0 1 2 3 4 5 6 7 8 9 C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z JC kB",
16: "F B FC GC HC IC jB xB"
},
G: {
4: "E NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
16: "sB KC yB LC MC"
},
H: {
2: "eC"
},
I: {
4: "I H iC yB jC kC",
16: "mB fC gC hC"
},
J: {
4: "D A"
},
K: {
4: "b kB",
16: "A B C jB xB"
},
L: {
4: "H"
},
M: {
4: "a"
},
N: {
1: "A B"
},
O: {
4: "lC"
},
P: {
4: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
4: "xC"
},
R: {
4: "yC"
},
S: {
1: "zC"
}
},
B: 6,
C: "X-Frame-Options HTTP header"
};
},
91294: module => {
module.exports = {
A: {
A: {
2: "J D E F zB",
132: "A B"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
2: "0B mB",
260: "A B",
388: "J D E F",
900: "I n 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
16: "I n J",
132: "y z",
388: "D E F A B C K L G M N O o p q r s t u v w x"
},
E: {
1: "E F A B C K L G 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
2: "I 5B sB",
132: "D 7B",
388: "n J 6B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 C O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z kB",
2: "F B FC GC HC IC jB xB JC",
132: "G M N"
},
G: {
1: "E OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
2: "sB KC yB",
132: "NC",
388: "LC MC"
},
H: {
2: "eC"
},
I: {
1: "H kC",
2: "fC gC hC",
388: "jC",
900: "mB I iC yB"
},
J: {
132: "A",
388: "D"
},
K: {
1: "C b kB",
2: "A B jB xB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
132: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "XMLHttpRequest advanced features"
};
},
41874: module => {
module.exports = {
A: {
A: {
1: "F A B",
2: "J D E zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
1: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
1: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
1: "eC"
},
I: {
1: "mB I H fC gC hC iC yB jC kC"
},
J: {
1: "D A"
},
K: {
1: "A B C b jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
2: "yC"
},
S: {
1: "zC"
}
},
B: 1,
C: "XHTML served as application/xhtml+xml"
};
},
61385: module => {
module.exports = {
A: {
A: {
2: "F A B zB",
4: "J D E"
},
B: {
2: "C K L G M N O",
8: "P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
8: "0 1 2 3 4 5 6 7 8 9 0B mB I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB 1B 2B"
},
D: {
8: "0 1 2 3 4 5 6 7 8 9 I n J D E F A B C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B"
},
E: {
8: "I n J D E F A B C K L G 5B sB 6B 7B 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC"
},
F: {
8: "0 1 2 3 4 5 6 7 8 9 F B C G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z FC GC HC IC jB xB JC kB"
},
G: {
8: "E sB KC yB LC MC NC OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB"
},
H: {
8: "eC"
},
I: {
8: "mB I H fC gC hC iC yB jC kC"
},
J: {
8: "D A"
},
K: {
8: "A B C b jB xB kB"
},
L: {
8: "H"
},
M: {
8: "a"
},
N: {
2: "A B"
},
O: {
8: "lC"
},
P: {
8: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
8: "xC"
},
R: {
8: "yC"
},
S: {
8: "zC"
}
},
B: 7,
C: "XHTML+SMIL animation"
};
},
60526: module => {
module.exports = {
A: {
A: {
1: "A B",
260: "J D E F zB"
},
B: {
1: "C K L G M N O P Q R S T U V W X Y Z c d e f g h i j k l a m H"
},
C: {
1: "0 1 2 3 4 5 6 7 8 9 C K L G M N O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z c d e f g h i j k l a m H qB rB",
132: "B",
260: "0B mB I n J D 1B 2B",
516: "E F A"
},
D: {
1: "0 1 2 3 4 5 6 7 8 9 AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB nB SB oB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R S T U V W X Y Z c d e f g h i j k l a m H qB rB 3B 4B",
132: "I n J D E F A B C K L G M N O o p q r s t u v w x y z"
},
E: {
1: "E F A B C K L G 8B 9B tB jB kB AC BC CC uB vB wB DC lB EC",
132: "I n J D 5B sB 6B 7B"
},
F: {
1: "0 1 2 3 4 5 6 7 8 9 O o p q r s t u v w x y z AB BB CB DB EB FB GB HB IB JB KB LB MB NB OB PB QB RB SB TB UB b VB WB XB YB ZB aB bB cB dB eB fB gB hB iB P Q R pB S T U V W X Y Z",
16: "F FC",
132: "B C G M N GC HC IC jB xB JC kB"
},
G: {
1: "E OC PC QC RC SC TC UC VC WC XC YC ZC aC bC cC dC uB vB wB lB",
132: "sB KC yB LC MC NC"
},
H: {
132: "eC"
},
I: {
1: "H jC kC",
132: "mB I fC gC hC iC yB"
},
J: {
132: "D A"
},
K: {
1: "b",
16: "A",
132: "B C jB xB kB"
},
L: {
1: "H"
},
M: {
1: "a"
},
N: {
1: "A B"
},
O: {
1: "lC"
},
P: {
1: "I mC nC oC pC qC tB rC sC tC uC vC lB wC"
},
Q: {
1: "xC"
},
R: {
1: "yC"
},
S: {
1: "zC"
}
},
B: 4,
C: "DOM Parsing and Serialization"
};
},
26825: (module, __unused_webpack_exports, __webpack_require__) => {
var map = {
"./aac.js": 67015,
"./abortcontroller.js": 36414,
"./ac3-ec3.js": 70426,
"./accelerometer.js": 41304,
"./addeventlistener.js": 57733,
"./alternate-stylesheet.js": 86768,
"./ambient-light.js": 89380,
"./apng.js": 97098,
"./array-find-index.js": 1435,
"./array-find.js": 81672,
"./array-flat.js": 95439,
"./array-includes.js": 58867,
"./arrow-functions.js": 36562,
"./asmjs.js": 10627,
"./async-clipboard.js": 23480,
"./async-functions.js": 48079,
"./atob-btoa.js": 98137,
"./audio-api.js": 94546,
"./audio.js": 46141,
"./audiotracks.js": 24330,
"./autofocus.js": 35316,
"./auxclick.js": 6433,
"./av1.js": 19739,
"./avif.js": 8514,
"./background-attachment.js": 4576,
"./background-clip-text.js": 49631,
"./background-img-opts.js": 27964,
"./background-position-x-y.js": 68042,
"./background-repeat-round-space.js": 93033,
"./background-sync.js": 14215,
"./battery-status.js": 42900,
"./beacon.js": 26639,
"./beforeafterprint.js": 14128,
"./bigint.js": 91158,
"./blobbuilder.js": 31014,
"./bloburls.js": 15587,
"./border-image.js": 78861,
"./border-radius.js": 40893,
"./broadcastchannel.js": 7174,
"./brotli.js": 23375,
"./calc.js": 42955,
"./canvas-blending.js": 91726,
"./canvas-text.js": 32485,
"./canvas.js": 22483,
"./ch-unit.js": 51250,
"./chacha20-poly1305.js": 68914,
"./channel-messaging.js": 10302,
"./childnode-remove.js": 57426,
"./classlist.js": 62317,
"./client-hints-dpr-width-viewport.js": 41691,
"./clipboard.js": 12114,
"./colr-v1.js": 65753,
"./colr.js": 4781,
"./comparedocumentposition.js": 98802,
"./console-basic.js": 22846,
"./console-time.js": 59634,
"./const.js": 27929,
"./constraint-validation.js": 45850,
"./contenteditable.js": 93214,
"./contentsecuritypolicy.js": 43846,
"./contentsecuritypolicy2.js": 15420,
"./cookie-store-api.js": 34175,
"./cors.js": 92025,
"./createimagebitmap.js": 44864,
"./credential-management.js": 43589,
"./cryptography.js": 11314,
"./css-all.js": 90687,
"./css-animation.js": 79066,
"./css-any-link.js": 85475,
"./css-appearance.js": 40855,
"./css-at-counter-style.js": 52424,
"./css-autofill.js": 24707,
"./css-backdrop-filter.js": 38013,
"./css-background-offsets.js": 69083,
"./css-backgroundblendmode.js": 67380,
"./css-boxdecorationbreak.js": 69307,
"./css-boxshadow.js": 52307,
"./css-canvas.js": 45884,
"./css-caret-color.js": 1066,
"./css-cascade-layers.js": 12368,
"./css-case-insensitive.js": 99362,
"./css-clip-path.js": 66208,
"./css-color-adjust.js": 95475,
"./css-color-function.js": 22239,
"./css-conic-gradients.js": 45911,
"./css-container-queries.js": 38686,
"./css-container-query-units.js": 56656,
"./css-containment.js": 31072,
"./css-content-visibility.js": 52666,
"./css-counters.js": 2172,
"./css-crisp-edges.js": 14810,
"./css-cross-fade.js": 65910,
"./css-default-pseudo.js": 8375,
"./css-descendant-gtgt.js": 8182,
"./css-deviceadaptation.js": 38482,
"./css-dir-pseudo.js": 73555,
"./css-display-contents.js": 25963,
"./css-element-function.js": 17710,
"./css-env-function.js": 15967,
"./css-exclusions.js": 18261,
"./css-featurequeries.js": 96951,
"./css-file-selector-button.js": 30431,
"./css-filter-function.js": 25374,
"./css-filters.js": 94762,
"./css-first-letter.js": 18774,
"./css-first-line.js": 48954,
"./css-fixed.js": 38613,
"./css-focus-visible.js": 48403,
"./css-focus-within.js": 26570,
"./css-font-palette.js": 66613,
"./css-font-rendering-controls.js": 68329,
"./css-font-stretch.js": 28513,
"./css-gencontent.js": 92637,
"./css-gradients.js": 26470,
"./css-grid-animation.js": 53085,
"./css-grid.js": 26769,
"./css-hanging-punctuation.js": 67010,
"./css-has.js": 71024,
"./css-hyphenate.js": 37722,
"./css-hyphens.js": 95570,
"./css-image-orientation.js": 48802,
"./css-image-set.js": 14273,
"./css-in-out-of-range.js": 29804,
"./css-indeterminate-pseudo.js": 90283,
"./css-initial-letter.js": 97834,
"./css-initial-value.js": 15146,
"./css-lch-lab.js": 26177,
"./css-letter-spacing.js": 59478,
"./css-line-clamp.js": 70498,
"./css-logical-props.js": 27e3,
"./css-marker-pseudo.js": 65628,
"./css-masks.js": 4082,
"./css-matches-pseudo.js": 36209,
"./css-math-functions.js": 18346,
"./css-media-interaction.js": 89345,
"./css-media-range-syntax.js": 94097,
"./css-media-resolution.js": 73138,
"./css-media-scripting.js": 69255,
"./css-mediaqueries.js": 64114,
"./css-mixblendmode.js": 20741,
"./css-motion-paths.js": 56859,
"./css-namespaces.js": 67502,
"./css-nesting.js": 15660,
"./css-not-sel-list.js": 36445,
"./css-nth-child-of.js": 93354,
"./css-opacity.js": 78807,
"./css-optional-pseudo.js": 7557,
"./css-overflow-anchor.js": 44133,
"./css-overflow-overlay.js": 87217,
"./css-overflow.js": 80710,
"./css-overscroll-behavior.js": 59399,
"./css-page-break.js": 71975,
"./css-paged-media.js": 91239,
"./css-paint-api.js": 62241,
"./css-placeholder-shown.js": 35770,
"./css-placeholder.js": 2125,
"./css-print-color-adjust.js": 78426,
"./css-read-only-write.js": 26004,
"./css-rebeccapurple.js": 20348,
"./css-reflections.js": 87605,
"./css-regions.js": 73087,
"./css-repeating-gradients.js": 88199,
"./css-resize.js": 45413,
"./css-revert-value.js": 73038,
"./css-rrggbbaa.js": 3004,
"./css-scroll-behavior.js": 11044,
"./css-scroll-timeline.js": 40612,
"./css-scrollbar.js": 15046,
"./css-sel2.js": 27986,
"./css-sel3.js": 97925,
"./css-selection.js": 16385,
"./css-shapes.js": 75326,
"./css-snappoints.js": 35569,
"./css-sticky.js": 51105,
"./css-subgrid.js": 56988,
"./css-supports-api.js": 96409,
"./css-table.js": 25235,
"./css-text-align-last.js": 48644,
"./css-text-indent.js": 81803,
"./css-text-justify.js": 18170,
"./css-text-orientation.js": 75430,
"./css-text-spacing.js": 21547,
"./css-textshadow.js": 20408,
"./css-touch-action-2.js": 90327,
"./css-touch-action.js": 1576,
"./css-transitions.js": 9331,
"./css-unicode-bidi.js": 71731,
"./css-unset-value.js": 78277,
"./css-variables.js": 21696,
"./css-when-else.js": 79873,
"./css-widows-orphans.js": 94245,
"./css-width-stretch.js": 86344,
"./css-writing-mode.js": 75143,
"./css-zoom.js": 82789,
"./css3-attr.js": 57416,
"./css3-boxsizing.js": 74318,
"./css3-colors.js": 25591,
"./css3-cursors-grab.js": 64771,
"./css3-cursors-newer.js": 5619,
"./css3-cursors.js": 68865,
"./css3-tabsize.js": 77239,
"./currentcolor.js": 63047,
"./custom-elements.js": 8407,
"./custom-elementsv1.js": 77551,
"./customevent.js": 72560,
"./datalist.js": 54101,
"./dataset.js": 2014,
"./datauri.js": 25029,
"./date-tolocaledatestring.js": 28167,
"./declarative-shadow-dom.js": 19178,
"./decorators.js": 96563,
"./details.js": 93672,
"./deviceorientation.js": 12506,
"./devicepixelratio.js": 87937,
"./dialog.js": 5217,
"./dispatchevent.js": 97555,
"./dnssec.js": 8877,
"./do-not-track.js": 54670,
"./document-currentscript.js": 97181,
"./document-evaluate-xpath.js": 10427,
"./document-execcommand.js": 69211,
"./document-policy.js": 69151,
"./document-scrollingelement.js": 10529,
"./documenthead.js": 29709,
"./dom-manip-convenience.js": 97801,
"./dom-range.js": 22729,
"./domcontentloaded.js": 31071,
"./domfocusin-domfocusout-events.js": 46139,
"./dommatrix.js": 81533,
"./download.js": 76777,
"./dragndrop.js": 37541,
"./element-closest.js": 68634,
"./element-from-point.js": 80051,
"./element-scroll-methods.js": 22268,
"./eme.js": 48244,
"./eot.js": 61245,
"./es5.js": 86980,
"./es6-class.js": 29725,
"./es6-generators.js": 21619,
"./es6-module-dynamic-import.js": 89414,
"./es6-module.js": 94355,
"./es6-number.js": 45885,
"./es6-string-includes.js": 50818,
"./es6.js": 24949,
"./eventsource.js": 54961,
"./extended-system-fonts.js": 61448,
"./feature-policy.js": 45085,
"./fetch.js": 21760,
"./fieldset-disabled.js": 48341,
"./fileapi.js": 61287,
"./filereader.js": 12789,
"./filereadersync.js": 86229,
"./filesystem.js": 39434,
"./flac.js": 86959,
"./flexbox-gap.js": 85734,
"./flexbox.js": 17662,
"./flow-root.js": 49729,
"./focusin-focusout-events.js": 75298,
"./focusoptions-preventscroll.js": 49394,
"./font-family-system-ui.js": 45246,
"./font-feature.js": 40678,
"./font-kerning.js": 43001,
"./font-loading.js": 46102,
"./font-metrics-overrides.js": 53991,
"./font-size-adjust.js": 49197,
"./font-smooth.js": 89145,
"./font-unicode-range.js": 75033,
"./font-variant-alternates.js": 90974,
"./font-variant-numeric.js": 27169,
"./fontface.js": 32879,
"./form-attribute.js": 76806,
"./form-submit-attributes.js": 33732,
"./form-validation.js": 70697,
"./forms.js": 21964,
"./fullscreen.js": 25424,
"./gamepad.js": 79145,
"./geolocation.js": 13541,
"./getboundingclientrect.js": 48535,
"./getcomputedstyle.js": 65590,
"./getelementsbyclassname.js": 50730,
"./getrandomvalues.js": 74634,
"./gyroscope.js": 23735,
"./hardwareconcurrency.js": 47627,
"./hashchange.js": 5807,
"./heif.js": 37961,
"./hevc.js": 37216,
"./hidden.js": 91899,
"./high-resolution-time.js": 141,
"./history.js": 79433,
"./html-media-capture.js": 67160,
"./html5semantic.js": 94764,
"./http-live-streaming.js": 13343,
"./http2.js": 50977,
"./http3.js": 40523,
"./iframe-sandbox.js": 62868,
"./iframe-seamless.js": 46501,
"./iframe-srcdoc.js": 33043,
"./imagecapture.js": 58280,
"./ime.js": 91620,
"./img-naturalwidth-naturalheight.js": 24417,
"./import-maps.js": 65027,
"./imports.js": 43658,
"./indeterminate-checkbox.js": 40535,
"./indexeddb.js": 77072,
"./indexeddb2.js": 33917,
"./inline-block.js": 26229,
"./innertext.js": 28641,
"./input-autocomplete-onoff.js": 83167,
"./input-color.js": 55673,
"./input-datetime.js": 26655,
"./input-email-tel-url.js": 68108,
"./input-event.js": 3836,
"./input-file-accept.js": 84514,
"./input-file-directory.js": 11352,
"./input-file-multiple.js": 76091,
"./input-inputmode.js": 13673,
"./input-minlength.js": 48513,
"./input-number.js": 85888,
"./input-pattern.js": 2935,
"./input-placeholder.js": 87146,
"./input-range.js": 67179,
"./input-search.js": 4555,
"./input-selection.js": 25509,
"./insert-adjacent.js": 9969,
"./insertadjacenthtml.js": 99079,
"./internationalization.js": 33682,
"./intersectionobserver-v2.js": 39439,
"./intersectionobserver.js": 57822,
"./intl-pluralrules.js": 50778,
"./intrinsic-width.js": 39895,
"./jpeg2000.js": 98599,
"./jpegxl.js": 12641,
"./jpegxr.js": 19182,
"./js-regexp-lookbehind.js": 37683,
"./json.js": 42997,
"./justify-content-space-evenly.js": 72761,
"./kerning-pairs-ligatures.js": 65091,
"./keyboardevent-charcode.js": 33982,
"./keyboardevent-code.js": 8187,
"./keyboardevent-getmodifierstate.js": 47799,
"./keyboardevent-key.js": 75503,
"./keyboardevent-location.js": 81550,
"./keyboardevent-which.js": 94420,
"./lazyload.js": 94763,
"./let.js": 46308,
"./link-icon-png.js": 49330,
"./link-icon-svg.js": 83694,
"./link-rel-dns-prefetch.js": 25099,
"./link-rel-modulepreload.js": 35726,
"./link-rel-preconnect.js": 4854,
"./link-rel-prefetch.js": 864,
"./link-rel-preload.js": 90837,
"./link-rel-prerender.js": 21761,
"./loading-lazy-attr.js": 92952,
"./localecompare.js": 80778,
"./magnetometer.js": 92380,
"./matchesselector.js": 38442,
"./matchmedia.js": 8104,
"./mathml.js": 26629,
"./maxlength.js": 88884,
"./media-attribute.js": 5902,
"./media-fragments.js": 13477,
"./media-session-api.js": 93149,
"./mediacapture-fromelement.js": 8184,
"./mediarecorder.js": 44401,
"./mediasource.js": 93616,
"./menu.js": 68172,
"./meta-theme-color.js": 42650,
"./meter.js": 29315,
"./midi.js": 24236,
"./minmaxwh.js": 63144,
"./mp3.js": 14359,
"./mpeg-dash.js": 45097,
"./mpeg4.js": 24319,
"./multibackgrounds.js": 10209,
"./multicolumn.js": 40757,
"./mutation-events.js": 94862,
"./mutationobserver.js": 82487,
"./namevalue-storage.js": 7585,
"./native-filesystem-api.js": 39097,
"./nav-timing.js": 40514,
"./navigator-language.js": 72024,
"./netinfo.js": 36466,
"./notifications.js": 45324,
"./object-entries.js": 71497,
"./object-fit.js": 47079,
"./object-observe.js": 49413,
"./object-values.js": 830,
"./objectrtc.js": 47417,
"./offline-apps.js": 71422,
"./offscreencanvas.js": 13075,
"./ogg-vorbis.js": 96841,
"./ogv.js": 31881,
"./ol-reversed.js": 90111,
"./once-event-listener.js": 39589,
"./online-status.js": 16836,
"./opus.js": 52492,
"./orientation-sensor.js": 7624,
"./outline.js": 73615,
"./pad-start-end.js": 59162,
"./page-transition-events.js": 50547,
"./pagevisibility.js": 67331,
"./passive-event-listener.js": 50106,
"./passwordrules.js": 53860,
"./path2d.js": 79464,
"./payment-request.js": 58106,
"./pdf-viewer.js": 55179,
"./permissions-api.js": 20941,
"./permissions-policy.js": 60008,
"./picture-in-picture.js": 93035,
"./picture.js": 14444,
"./ping.js": 19772,
"./png-alpha.js": 30658,
"./pointer-events.js": 28147,
"./pointer.js": 51489,
"./pointerlock.js": 50078,
"./portals.js": 87868,
"./prefers-color-scheme.js": 5550,
"./prefers-reduced-motion.js": 83606,
"./private-class-fields.js": 72656,
"./private-methods-and-accessors.js": 97285,
"./progress.js": 50157,
"./promise-finally.js": 56193,
"./promises.js": 54775,
"./proximity.js": 92919,
"./proxy.js": 21267,
"./public-class-fields.js": 44318,
"./publickeypinning.js": 10603,
"./push-api.js": 57935,
"./queryselector.js": 92420,
"./readonly-attr.js": 49373,
"./referrer-policy.js": 50252,
"./registerprotocolhandler.js": 5677,
"./rel-noopener.js": 22595,
"./rel-noreferrer.js": 40769,
"./rellist.js": 14678,
"./rem.js": 12522,
"./requestanimationframe.js": 20650,
"./requestidlecallback.js": 66499,
"./resizeobserver.js": 81527,
"./resource-timing.js": 98631,
"./rest-parameters.js": 57010,
"./rtcpeerconnection.js": 76952,
"./ruby.js": 90076,
"./run-in.js": 43534,
"./same-site-cookie-attribute.js": 34337,
"./screen-orientation.js": 50420,
"./script-async.js": 6496,
"./script-defer.js": 30882,
"./scrollintoview.js": 31098,
"./scrollintoviewifneeded.js": 94253,
"./sdch.js": 51509,
"./selection-api.js": 69343,
"./server-timing.js": 33666,
"./serviceworkers.js": 58598,
"./setimmediate.js": 74437,
"./sha-2.js": 80788,
"./shadowdom.js": 24370,
"./shadowdomv1.js": 40533,
"./sharedarraybuffer.js": 42522,
"./sharedworkers.js": 472,
"./sni.js": 10288,
"./spdy.js": 91900,
"./speech-recognition.js": 45225,
"./speech-synthesis.js": 36358,
"./spellcheck-attribute.js": 42235,
"./sql-storage.js": 69009,
"./srcset.js": 94676,
"./stream.js": 29162,
"./streams.js": 86478,
"./stricttransportsecurity.js": 6513,
"./style-scoped.js": 31423,
"./subresource-integrity.js": 21620,
"./svg-css.js": 75158,
"./svg-filters.js": 93350,
"./svg-fonts.js": 33349,
"./svg-fragment.js": 25949,
"./svg-html.js": 17420,
"./svg-html5.js": 32690,
"./svg-img.js": 23267,
"./svg-smil.js": 10160,
"./svg.js": 21703,
"./sxg.js": 33497,
"./tabindex-attr.js": 30948,
"./template-literals.js": 65319,
"./template.js": 42067,
"./temporal.js": 64834,
"./testfeat.js": 93766,
"./text-decoration.js": 3916,
"./text-emphasis.js": 45393,
"./text-overflow.js": 88751,
"./text-size-adjust.js": 94357,
"./text-stroke.js": 94297,
"./text-underline-offset.js": 15033,
"./textcontent.js": 82426,
"./textencoder.js": 30201,
"./tls1-1.js": 68123,
"./tls1-2.js": 79108,
"./tls1-3.js": 31792,
"./token-binding.js": 14468,
"./touch.js": 14039,
"./transforms2d.js": 78129,
"./transforms3d.js": 88319,
"./trusted-types.js": 78491,
"./ttf.js": 613,
"./typedarrays.js": 77803,
"./u2f.js": 77364,
"./unhandledrejection.js": 56069,
"./upgradeinsecurerequests.js": 78878,
"./url-scroll-to-text-fragment.js": 16099,
"./url.js": 89674,
"./urlsearchparams.js": 37791,
"./use-strict.js": 66905,
"./user-select-none.js": 18160,
"./user-timing.js": 97478,
"./variable-fonts.js": 28155,
"./vector-effect.js": 50811,
"./vibration.js": 78925,
"./video.js": 78261,
"./videotracks.js": 18437,
"./viewport-unit-variants.js": 68502,
"./viewport-units.js": 46334,
"./wai-aria.js": 57189,
"./wake-lock.js": 6127,
"./wasm.js": 47185,
"./wav.js": 76069,
"./wbr-element.js": 64158,
"./web-animation.js": 10566,
"./web-app-manifest.js": 9779,
"./web-bluetooth.js": 4238,
"./web-serial.js": 69309,
"./web-share.js": 49362,
"./webauthn.js": 66572,
"./webgl.js": 95647,
"./webgl2.js": 1572,
"./webgpu.js": 8938,
"./webhid.js": 21918,
"./webkit-user-drag.js": 73157,
"./webm.js": 57365,
"./webnfc.js": 71614,
"./webp.js": 35819,
"./websockets.js": 9470,
"./webusb.js": 70347,
"./webvr.js": 75301,
"./webvtt.js": 67638,
"./webworkers.js": 59350,
"./webxr.js": 67870,
"./will-change.js": 1873,
"./woff.js": 18244,
"./woff2.js": 4419,
"./word-break.js": 20339,
"./wordwrap.js": 25443,
"./x-doc-messaging.js": 89253,
"./x-frame-options.js": 37103,
"./xhr2.js": 91294,
"./xhtml.js": 41874,
"./xhtmlsmil.js": 61385,
"./xml-serializer.js": 60526
};
function webpackContext(req) {
var id = webpackContextResolve(req);
return __webpack_require__(id);
}
function webpackContextResolve(req) {
if (!__webpack_require__.o(map, req)) {
var e = new Error("Cannot find module '" + req + "'");
throw e.code = "MODULE_NOT_FOUND", e;
}
return map[req];
}
webpackContext.keys = function() {
return Object.keys(map);
}, webpackContext.resolve = webpackContextResolve, module.exports = webpackContext, 
webpackContext.id = 26825;
},
26435: module => {
module.exports = {
C: {
52: .0077,
59: .00385,
60: .01539,
61: .0077,
62: .0077,
63: .0077,
65: .00385,
67: .00385,
68: .01539,
70: .00385,
72: .01539,
73: .00385,
78: .06926,
84: .01154,
90: .01539,
91: .03463,
95: .15007,
96: .0077,
99: .01924,
100: .01539,
101: .0885,
102: 1.73545,
103: .2886,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 53 54 55 56 57 58 64 66 69 71 74 75 76 77 79 80 81 82 83 85 86 87 88 89 92 93 94 97 98 104 105 3.5 3.6"
},
D: {
28: .00385,
49: .23473,
67: .0077,
69: .01539,
70: .00385,
76: .00385,
77: .01154,
79: .11929,
80: .00385,
81: .0077,
83: .01924,
84: .01924,
85: .0077,
86: .01924,
87: .03848,
89: .03078,
90: .01924,
91: .0077,
92: .08081,
93: .00385,
94: .0077,
95: .0077,
96: .02309,
97: .01924,
98: .01154,
99: .20394,
100: .15392,
101: .43098,
102: 1.00818,
103: 14.69551,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 68 71 72 73 74 75 78 88 104 105 106"
},
F: {
83: .01924,
85: .05387,
86: .02309,
88: .46946,
89: .21934,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 84 87 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
18: .05387,
92: .01539,
97: .06926,
101: .02309,
102: .03848,
103: 2.7975,
_: "12 13 14 15 16 17 79 80 81 83 84 85 86 87 88 89 90 91 93 94 95 96 98 99 100"
},
E: {
4: 0,
12: .00385,
13: .02309,
14: .11159,
15: .04233,
_: "0 5 6 7 8 9 10 11 3.1 3.2 5.1 6.1 7.1 9.1 10.1",
11.1: .01539,
12.1: .02309,
13.1: .33478,
14.1: .41943,
15.1: .3848,
"15.2-15.3": .38865,
15.4: 1.12362,
15.5: 9.60846,
15.6: .62338,
"16.0": .15392
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": 0,
"6.0-6.1": 0,
"7.0-7.1": 0,
"8.1-8.4": .00795,
"9.0-9.2": 0,
9.3: .03575,
"10.0-10.2": 0,
10.3: .05164,
"11.0-11.2": 0,
"11.3-11.4": .04767,
"12.0-12.1": 0,
"12.2-12.5": .30192,
"13.0-13.1": 0,
13.2: 0,
13.3: .00795,
"13.4-13.7": .1311,
"14.0-14.4": .12712,
"14.5-14.8": .66343,
"15.0-15.1": .53631,
"15.2-15.3": 1.68837,
15.4: 2.85235,
15.5: 32.22598,
"16.0": .31384
},
P: {
4: .0317,
"5.0-5.4": .22241,
"6.2-6.4": .13142,
"7.2-7.4": .13584,
8.2: .04044,
9.2: .04185,
10.1: .03033,
"11.1-11.2": .05231,
"12.0": .02092,
"13.0": .10462,
"14.0": .0209,
"15.0": .05231,
"16.0": .0317,
"17.0": 1.3208
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: 0,
"4.2-4.3": .00127,
4.4: 0,
"4.4.3-4.4.4": .03564
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
11: .02694,
_: "6 7 8 9 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
_: "10 11"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: .28914
},
Q: {
10.4: 0
},
O: {
0: .0123
},
H: {
0: .11066
},
L: {
0: 21.0463
}
};
},
37059: module => {
module.exports = {
C: {
34: .00314,
42: .00314,
51: .00314,
52: .00942,
68: .05966,
77: .00314,
78: .0157,
79: .00628,
80: .00942,
81: .00628,
82: .00314,
83: .00942,
84: .00314,
91: .01884,
93: .00314,
98: .00314,
99: .00942,
100: .01256,
101: .05024,
102: .68766,
103: .0785,
104: .01256,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 35 36 37 38 39 40 41 43 44 45 46 47 48 49 50 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 69 70 71 72 73 74 75 76 85 86 87 88 89 90 92 94 95 96 97 105 3.5 3.6"
},
D: {
22: .00314,
34: .00314,
35: .49926,
38: .02198,
49: .02512,
56: .00628,
58: .00628,
63: .00628,
65: .00942,
66: .00628,
67: .00314,
68: .00314,
69: .0157,
70: .00314,
71: .00628,
73: .00628,
74: .00628,
75: .03768,
76: .0471,
78: .00628,
79: .06594,
80: .02198,
81: .0157,
83: .04082,
84: .0628,
85: .0785,
86: .06908,
87: .11932,
88: .00628,
89: .01884,
90: .01256,
91: .03454,
92: .05338,
93: .0785,
94: .02512,
95: .02198,
96: .05024,
97: .03768,
98: .03768,
99: .05338,
100: .1256,
101: .16642,
102: 1.21832,
103: 19.22936,
104: .0157,
105: .0157,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 23 24 25 26 27 28 29 30 31 32 33 36 37 39 40 41 42 43 44 45 46 47 48 50 51 52 53 54 55 57 59 60 61 62 64 72 77 106 107"
},
F: {
28: .01256,
36: .00628,
46: .01256,
68: .00314,
69: .00314,
71: .00942,
72: .00314,
81: .00628,
84: .01256,
85: .00942,
86: .01256,
87: .0471,
88: .47728,
89: .16014,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 29 30 31 32 33 34 35 37 38 39 40 41 42 43 44 45 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 70 73 74 75 76 77 78 79 80 82 83 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
18: .02198,
84: .00628,
85: .00628,
87: .00314,
89: .00314,
92: .00942,
96: .00314,
98: .00314,
99: .00314,
100: .00628,
101: .05338,
102: .06594,
103: 2.32674,
_: "12 13 14 15 16 17 79 80 81 83 86 88 90 91 93 94 95 97"
},
E: {
4: 0,
12: .00628,
13: .02198,
14: .13188,
15: .0471,
_: "0 5 6 7 8 9 10 11 3.1 3.2 5.1 6.1 7.1 9.1",
10.1: .00628,
11.1: .00942,
12.1: .03454,
13.1: .13816,
14.1: .38308,
15.1: .08164,
"15.2-15.3": .06594,
15.4: .26062,
15.5: 1.40358,
15.6: .06908,
"16.0": .01256
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": .00317,
"6.0-6.1": 0,
"7.0-7.1": .00952,
"8.1-8.4": .00159,
"9.0-9.2": 0,
9.3: .17132,
"10.0-10.2": .00635,
10.3: .13325,
"11.0-11.2": .01745,
"11.3-11.4": .01428,
"12.0-12.1": .02062,
"12.2-12.5": .47112,
"13.0-13.1": .01586,
13.2: .00793,
13.3: .03331,
"13.4-13.7": .1269,
"14.0-14.4": .40767,
"14.5-14.8": 1.05329,
"15.0-15.1": .35691,
"15.2-15.3": .56154,
15.4: 1.07232,
15.5: 10.75337,
"16.0": .13325
},
P: {
4: .12448,
"5.0-5.4": .021,
"6.2-6.4": .01048,
"7.2-7.4": .04149,
8.2: .01017,
9.2: .07666,
10.1: .03917,
"11.1-11.2": .02075,
"12.0": .01037,
"13.0": .04149,
"14.0": .03112,
"15.0": .02075,
"16.0": .10374,
"17.0": 2.1162
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: 0,
"4.2-4.3": .00638,
4.4: 0,
"4.4.3-4.4.4": .04849
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
9: .007,
11: .11546,
_: "6 7 8 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
_: "10 11"
},
R: {
_: "0"
},
M: {
0: .13032
},
Q: {
10.4: 0
},
O: {
0: 3.1277
},
H: {
0: .57144
},
L: {
0: 47.85413
},
S: {
2.5: 0
}
};
},
39894: module => {
module.exports = {
C: {
18: .0041,
24: .0082,
29: .0082,
33: .0041,
38: .0041,
39: .00205,
41: .00205,
43: .01025,
44: .00615,
47: .00615,
48: .0041,
50: .0574,
52: .01025,
56: .00615,
57: .00615,
72: .01025,
78: .0123,
82: .00205,
87: .0041,
88: .0041,
89: .01025,
91: .0205,
94: .0041,
95: .0164,
97: .00615,
98: .0369,
99: .0328,
100: .0123,
101: .0861,
102: .8405,
103: .15375,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 19 20 21 22 23 25 26 27 28 30 31 32 34 35 36 37 40 42 45 46 49 51 53 54 55 58 59 60 61 62 63 64 65 66 67 68 69 70 71 73 74 75 76 77 79 80 81 83 84 85 86 90 92 93 96 104 105 3.5 3.6"
},
D: {
18: .00615,
20: .0041,
33: .00205,
34: .0041,
35: .0041,
36: .00205,
37: .0041,
38: .0041,
39: .0041,
40: .00615,
41: .00205,
42: .00205,
43: .0082,
44: .00615,
46: .0082,
47: .01435,
48: .0041,
49: .0041,
50: .0041,
51: .0041,
52: .0205,
54: .0041,
55: .00615,
56: .0041,
57: .00615,
58: .0041,
61: .0123,
62: .01025,
63: .00615,
64: .0041,
65: .01845,
66: .00205,
67: .00615,
68: .00615,
69: .00615,
70: .0041,
71: .01025,
72: .01025,
73: .0082,
74: .0082,
75: .00615,
76: .0082,
77: .0164,
78: .06765,
79: .0123,
80: .0533,
81: .0328,
83: .0779,
84: .01435,
85: .0082,
86: .0451,
87: .05535,
88: .03485,
89: .0287,
90: .0082,
91: .01025,
92: .0451,
94: .0164,
95: .0164,
96: .0492,
97: .04305,
98: .05535,
99: .08405,
100: .0656,
101: .082,
102: .5781,
103: 9.6719,
104: .01845,
105: .03075,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 19 21 22 23 24 25 26 27 28 29 30 31 32 45 53 59 60 93 106"
},
F: {
42: .0041,
79: .0287,
82: .00205,
84: .01025,
85: .02665,
86: .01025,
87: .01025,
88: .19475,
89: .205,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 80 81 83 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
12: .0164,
13: .0123,
14: .01845,
15: .0287,
16: .03895,
17: .03895,
18: .15375,
81: .0205,
84: .0246,
85: .00615,
87: .0041,
88: .00205,
89: .02665,
90: .041,
92: .0574,
94: .0041,
96: .00205,
97: .00205,
98: .0164,
99: .00615,
100: .01025,
101: .06765,
102: .06355,
103: .9143,
_: "79 80 83 86 91 93 95"
},
E: {
4: 0,
13: .02255,
14: .0287,
15: .0041,
_: "0 5 6 7 8 9 10 11 12 3.1 3.2 6.1 7.1 9.1 12.1",
5.1: .0123,
10.1: .0041,
11.1: .0041,
13.1: .0041,
14.1: .0246,
15.1: .0656,
"15.2-15.3": .041,
15.4: .27675,
15.5: 1.56005,
15.6: .19065,
"16.0": .0328
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": 0,
"6.0-6.1": 0,
"7.0-7.1": .01007,
"8.1-8.4": 0,
"9.0-9.2": 0,
9.3: .01511,
"10.0-10.2": 0,
10.3: .14273,
"11.0-11.2": .01343,
"11.3-11.4": .05541,
"12.0-12.1": .03022,
"12.2-12.5": .78079,
"13.0-13.1": .01679,
13.2: .02351,
13.3: .06213,
"13.4-13.7": .14776,
"14.0-14.4": .6028,
"14.5-14.8": .68676,
"15.0-15.1": .539,
"15.2-15.3": 1.14012,
15.4: 1.65057,
15.5: 10.3014,
"16.0": .19814
},
P: {
4: 1.20302,
"5.0-5.4": .22241,
"6.2-6.4": .13142,
"7.2-7.4": .67733,
8.2: .04044,
9.2: .3235,
10.1: .03033,
"11.1-11.2": .17186,
"12.0": .04044,
"13.0": .13142,
"14.0": .37405,
"15.0": .14153,
"16.0": .79864,
"17.0": 1.55685
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: .00693,
"4.2-4.3": .03117,
4.4: 0,
"4.4.3-4.4.4": .14476
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
9: .01902,
11: .39098,
_: "6 7 8 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
_: "10 11"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: .1113
},
Q: {
10.4: 0
},
O: {
0: 1.431
},
H: {
0: 1.0763
},
L: {
0: 56.90635
}
};
},
67765: module => {
module.exports = {
C: {
52: .00324,
78: .00972,
79: .01296,
91: .00648,
95: .00324,
96: .00648,
98: .00648,
100: .00324,
101: .05186,
102: .60283,
103: .0713,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 80 81 82 83 84 85 86 87 88 89 90 92 93 94 97 99 104 105 3.5 3.6"
},
D: {
47: .00324,
49: .00324,
53: .04537,
55: .00324,
62: .01621,
65: .00648,
67: .00972,
70: .00324,
76: .08103,
77: .01621,
78: .00324,
79: .12964,
85: .00648,
86: .05834,
87: .02269,
88: .03565,
89: .00972,
90: .00648,
91: .02269,
92: .01621,
93: .12316,
95: .01296,
96: .00648,
97: .00648,
98: .02269,
99: .01621,
100: .08103,
101: .11668,
102: 1.54272,
103: 17.14813,
104: .01945,
105: .00648,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 48 50 51 52 54 56 57 58 59 60 61 63 64 66 68 69 71 72 73 74 75 80 81 83 84 94 106"
},
F: {
28: .00972,
87: .03565,
88: .48615,
89: .09075,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
13: .00324,
16: .00324,
17: .00972,
18: .01296,
84: .00972,
85: .00648,
92: .01296,
94: .00648,
98: .00324,
99: .00972,
100: .00648,
101: .07454,
102: .22039,
103: 4.98142,
_: "12 14 15 79 80 81 83 86 87 88 89 90 91 93 95 96 97"
},
E: {
4: 0,
13: .02269,
14: .12316,
15: .03241,
_: "0 5 6 7 8 9 10 11 12 3.1 3.2 5.1 6.1 7.1",
9.1: .18474,
10.1: .09075,
11.1: .01296,
12.1: .03889,
13.1: .10371,
14.1: .42457,
15.1: .0551,
"15.2-15.3": .02593,
15.4: .1815,
15.5: 1.10842,
15.6: .06806,
"16.0": .01296
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": .01077,
"6.0-6.1": 0,
"7.0-7.1": .00923,
"8.1-8.4": 0,
"9.0-9.2": 0,
9.3: .20624,
"10.0-10.2": 0,
10.3: .04002,
"11.0-11.2": .01693,
"11.3-11.4": .0077,
"12.0-12.1": .01693,
"12.2-12.5": .49868,
"13.0-13.1": .00462,
13.2: 0,
13.3: .05079,
"13.4-13.7": .15237,
"14.0-14.4": .33553,
"14.5-14.8": .72032,
"15.0-15.1": .27243,
"15.2-15.3": .30321,
15.4: .61104,
15.5: 11.79749,
"16.0": .07234
},
P: {
4: .24784,
"5.0-5.4": .22241,
"6.2-6.4": .04102,
"7.2-7.4": .35111,
8.2: .07179,
9.2: .02065,
10.1: .02051,
"11.1-11.2": .25817,
"12.0": .02065,
"13.0": .08261,
"14.0": .1136,
"15.0": .07229,
"16.0": .48536,
"17.0": 4.63676
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: 0,
"4.2-4.3": .00285,
4.4: 0,
"4.4.3-4.4.4": .01743
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
11: .02917,
_: "6 7 8 9 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
_: "10 11"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: .65562
},
Q: {
10.4: .12842
},
O: {
0: .0338
},
H: {
0: .08319
},
L: {
0: 48.24093
}
};
},
384: module => {
module.exports = {
C: {
68: .01556,
91: .01556,
92: .01946,
95: .01946,
100: .00778,
101: .02335,
102: .62256,
103: .18288,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 93 94 96 97 98 99 104 105 3.5 3.6"
},
D: {
65: .00389,
68: .00389,
69: .03113,
74: .08171,
75: .00778,
76: .05837,
79: .40077,
81: .00389,
85: .22957,
86: .00389,
87: .02335,
90: .00389,
91: .01946,
95: .06226,
96: .00778,
97: .03113,
99: .01946,
100: .09728,
101: .03502,
102: .83657,
103: 13.75079,
104: .01946,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 66 67 70 71 72 73 77 78 80 83 84 88 89 92 93 94 98 105 106"
},
F: {
88: .6926,
89: .44747,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
18: .07004,
89: .10117,
95: .00778,
101: .03113,
102: .08949,
103: 8.97265,
_: "12 13 14 15 16 17 79 80 81 83 84 85 86 87 88 90 91 92 93 94 96 97 98 99 100"
},
E: {
4: 0,
13: .06226,
14: .03502,
15: .36965,
_: "0 5 6 7 8 9 10 11 12 3.1 3.2 5.1 6.1 7.1 9.1 10.1 11.1",
12.1: .01946,
13.1: 1.63811,
14.1: .17899,
15.1: .20233,
"15.2-15.3": .19455,
15.4: .47081,
15.5: 3.52525,
15.6: .23346,
"16.0": .07004
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": 0,
"6.0-6.1": 0,
"7.0-7.1": 0,
"8.1-8.4": 0,
"9.0-9.2": 0,
9.3: 0,
"10.0-10.2": .00443,
10.3: .01992,
"11.0-11.2": 0,
"11.3-11.4": 0,
"12.0-12.1": 0,
"12.2-12.5": 1.1755,
"13.0-13.1": 0,
13.2: 0,
13.3: .0155,
"13.4-13.7": .00885,
"14.0-14.4": .06863,
"14.5-14.8": 1.10245,
"15.0-15.1": .50031,
"15.2-15.3": 1.07145,
15.4: 2.25359,
15.5: 15.49844,
"16.0": .13282
},
P: {
4: .27555,
"5.0-5.4": .22241,
"6.2-6.4": .04102,
"7.2-7.4": .66768,
8.2: .07179,
9.2: .07179,
10.1: .02051,
"11.1-11.2": .11658,
"12.0": .58289,
"13.0": .03179,
"14.0": .21196,
"15.0": .05299,
"16.0": .11658,
"17.0": 2.66012
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: 0,
"4.2-4.3": 0,
4.4: 0,
"4.4.3-4.4.4": .02444
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
11: .01556,
_: "6 7 8 9 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
_: "10 11"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: .04276
},
Q: {
10.4: 0
},
O: {
0: .01833
},
H: {
0: .02313
},
L: {
0: 38.79999
}
};
},
89272: module => {
module.exports = {
C: {
48: .00306,
52: .03825,
60: .00153,
66: .02295,
67: .00918,
73: .00612,
78: .00765,
82: .00153,
83: .00306,
84: .00765,
87: .00153,
88: .00612,
89: .00612,
91: .00459,
97: .00612,
98: .00153,
99: .00918,
100: .00765,
101: .05202,
102: .56304,
103: .06273,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 49 50 51 53 54 55 56 57 58 59 61 62 63 64 65 68 69 70 71 72 74 75 76 77 79 80 81 85 86 90 92 93 94 95 96 104 105 3.5 3.6"
},
D: {
11: .00306,
38: .00765,
43: .00306,
47: .00612,
49: .02448,
53: .00459,
55: .00153,
56: .00612,
58: .00918,
63: .00612,
66: .00153,
67: .00153,
68: .03519,
69: .00153,
71: .02142,
72: .00765,
73: .00306,
74: .00153,
76: .00459,
77: .00306,
78: .00918,
79: .05661,
80: .00918,
81: .01377,
83: .02295,
84: .03825,
85: .01836,
86: .01377,
87: .05049,
88: .01071,
89: .00765,
90: .00918,
91: .01377,
92: .01224,
93: .0306,
94: .00765,
95: .00612,
96: .01989,
97: .04284,
98: .01377,
99: .02907,
100: .04131,
101: .12087,
102: .4284,
103: 9.88839,
104: .00459,
105: .00153,
_: "4 5 6 7 8 9 10 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 39 40 41 42 44 45 46 48 50 51 52 54 57 59 60 61 62 64 65 70 75 106"
},
F: {
36: .00459,
40: .00153,
46: .00153,
79: .00306,
85: .00306,
86: .00306,
87: .00612,
88: .22338,
89: .10251,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 37 38 39 41 42 43 44 45 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 80 81 82 83 84 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
12: .00153,
17: .00153,
18: .00306,
84: .00306,
89: .00153,
92: .00306,
96: .00765,
97: .00306,
100: .00153,
101: .01377,
102: .03519,
103: .75429,
_: "13 14 15 16 79 80 81 83 85 86 87 88 90 91 93 94 95 98 99"
},
E: {
4: 0,
12: .00612,
13: .01683,
14: .02448,
15: .01224,
_: "0 5 6 7 8 9 10 11 3.1 3.2 5.1 6.1 7.1 9.1",
10.1: .00306,
11.1: .00612,
12.1: .02448,
13.1: .05661,
14.1: .07191,
15.1: .03366,
"15.2-15.3": .03213,
15.4: .15606,
15.5: .9639,
15.6: .09027,
"16.0": .00918
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": 0,
"6.0-6.1": .04479,
"7.0-7.1": .03665,
"8.1-8.4": 0,
"9.0-9.2": 0,
9.3: .04479,
"10.0-10.2": .00814,
10.3: .08551,
"11.0-11.2": .02443,
"11.3-11.4": .06515,
"12.0-12.1": .03257,
"12.2-12.5": 1.55131,
"13.0-13.1": .03665,
13.2: .01629,
13.3: .15472,
"13.4-13.7": .46417,
"14.0-14.4": 1.22557,
"14.5-14.8": 4.53991,
"15.0-15.1": .65554,
"15.2-15.3": 1.18078,
15.4: 2.61808,
15.5: 26.96258,
"16.0": .26466
},
P: {
4: .25495,
"5.0-5.4": .22241,
"6.2-6.4": .13142,
"7.2-7.4": .07139,
8.2: .04044,
9.2: .3235,
10.1: .03033,
"11.1-11.2": .05099,
"12.0": .0204,
"13.0": .08158,
"14.0": .06119,
"15.0": .10198,
"16.0": .12238,
"17.0": 2.28435
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: .01072,
"4.2-4.3": .00256,
4.4: 0,
"4.4.3-4.4.4": .01212
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
11: .01377,
_: "6 7 8 9 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
_: "10 11"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: .18634
},
Q: {
10.4: 0
},
O: {
0: .02541
},
H: {
0: .10425
},
L: {
0: 41.61664
}
};
},
66176: module => {
module.exports = {
C: {
52: 40.36835,
56: .00714,
78: .00714,
91: .01427,
99: .02141,
100: .00714,
101: .08563,
102: .6351,
103: .06422,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 53 54 55 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 79 80 81 82 83 84 85 86 87 88 89 90 92 93 94 95 96 97 98 104 105 3.5 3.6"
},
D: {
22: .00714,
41: .00714,
47: .00714,
49: .11418,
57: .01427,
63: .02854,
67: .02854,
69: .00714,
70: .00714,
74: .03568,
75: .02141,
76: .02854,
79: .02141,
80: .04282,
83: .00714,
84: .02854,
85: .03568,
86: .04282,
87: .02141,
88: .02141,
89: .02141,
90: .02141,
91: .00714,
92: .0785,
93: .01427,
94: .01427,
95: .02141,
96: .03568,
97: .05709,
98: .1784,
99: .12131,
100: .20694,
101: .31398,
102: 2.03376,
103: 22.24291,
104: .00714,
105: .02141,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 42 43 44 45 46 48 50 51 52 53 54 55 56 58 59 60 61 62 64 65 66 68 71 72 73 77 78 81 106"
},
F: {
28: .00714,
29: .02141,
52: .01427,
85: .04282,
87: .01427,
88: .36394,
89: .1784,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 86 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
98: .00714,
100: .02854,
101: .00714,
102: .02854,
103: .84918,
_: "12 13 14 15 16 17 18 79 80 81 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 99"
},
E: {
4: 0,
14: .03568,
15: .02854,
_: "0 5 6 7 8 9 10 11 12 13 3.1 3.2 6.1 7.1 9.1 10.1 11.1 12.1",
5.1: .04282,
13.1: .07136,
14.1: .08563,
15.1: .04995,
"15.2-15.3": .02854,
15.4: .17126,
15.5: .52093,
15.6: .02141,
"16.0": .00714
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": 72e-5,
"6.0-6.1": 0,
"7.0-7.1": .00505,
"8.1-8.4": 72e-5,
"9.0-9.2": 72e-5,
9.3: .07285,
"10.0-10.2": .00144,
10.3: .02957,
"11.0-11.2": .00649,
"11.3-11.4": .01298,
"12.0-12.1": .00866,
"12.2-12.5": .33902,
"13.0-13.1": .00793,
13.2: .00433,
13.3: .03174,
"13.4-13.7": .09305,
"14.0-14.4": .34912,
"14.5-14.8": .69751,
"15.0-15.1": .14138,
"15.2-15.3": .36787,
15.4: .50348,
15.5: 4.27884,
"16.0": .0981
},
P: {
4: .01098,
"5.0-5.4": .22241,
"6.2-6.4": .04102,
"7.2-7.4": .07685,
8.2: .07179,
9.2: .01029,
10.1: .02051,
"11.1-11.2": .04392,
"12.0": .01029,
"13.0": .02196,
"14.0": .0549,
"15.0": .04117,
"16.0": .0549,
"17.0": .93323
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: 36e-5,
"4.2-4.3": .00394,
4.4: 0,
"4.4.3-4.4.4": .01288
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
11: .08563,
_: "6 7 8 9 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
_: "10 11"
},
S: {
2.5: .00286
},
R: {
_: "0"
},
M: {
0: .04867
},
Q: {
10.4: 0
},
O: {
0: .04008
},
H: {
0: .18431
},
L: {
0: 20.29003
}
};
},
83738: module => {
module.exports = {
C: {
34: .01197,
41: .00798,
47: .00798,
52: .00798,
54: .02393,
55: .00798,
60: .00399,
64: .00798,
72: .00399,
76: .00399,
78: .01197,
89: .00399,
91: .01596,
97: .01995,
99: .01995,
100: .01197,
101: .04787,
102: 1.02916,
103: .15557,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 35 36 37 38 39 40 42 43 44 45 46 48 49 50 51 53 56 57 58 59 61 62 63 65 66 67 68 69 70 71 73 74 75 77 79 80 81 82 83 84 85 86 87 88 90 92 93 94 95 96 98 104 105 3.5 3.6"
},
D: {
11: .03191,
33: .00798,
38: .00399,
40: .02393,
42: .05585,
43: .0359,
46: .15956,
47: .00399,
48: .00399,
49: .02792,
50: .00399,
53: .04388,
55: .01197,
58: .01197,
63: .03191,
68: .00798,
69: .01197,
70: .00798,
71: .00399,
72: .0718,
74: .03191,
75: .00798,
76: .01197,
77: .02393,
78: .01596,
79: .05984,
80: .00399,
81: .14759,
83: .01596,
84: .05984,
85: .00798,
86: .08776,
87: .19945,
88: .01995,
89: .04388,
90: .02393,
91: .0718,
92: .01197,
93: .01197,
94: .01995,
95: .01995,
96: .03989,
97: .13164,
98: .05585,
99: .05585,
100: .11169,
101: .20344,
102: .63425,
103: 16.12753,
104: .11967,
105: .00399,
_: "4 5 6 7 8 9 10 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 34 35 36 37 39 41 44 45 51 52 54 56 57 59 60 61 62 64 65 66 67 73 106"
},
F: {
32: .00798,
42: .01197,
79: .05186,
82: .02792,
84: .00399,
85: .0359,
86: .00798,
87: .14759,
88: .71802,
89: .56644,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 33 34 35 36 37 38 39 40 41 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 80 81 83 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
12: .10371,
13: .0359,
14: .03191,
15: .01197,
16: .00798,
17: .06781,
18: .06382,
84: .05585,
85: .01596,
89: .01596,
90: .07978,
92: .02792,
93: .01596,
96: .02393,
97: .01197,
98: .01596,
99: .01197,
100: .01995,
101: .04388,
102: .16355,
103: 3.30688,
_: "79 80 81 83 86 87 88 91 94 95"
},
E: {
4: 0,
8: .00798,
12: .00399,
14: .01197,
15: .01995,
_: "0 5 6 7 9 10 11 13 3.1 3.2 5.1 6.1 7.1 9.1 16.0",
10.1: .00399,
11.1: .00399,
12.1: .00798,
13.1: .06382,
14.1: .07579,
15.1: .00399,
"15.2-15.3": .01197,
15.4: .02792,
15.5: .20344,
15.6: .01995
},
G: {
8: .00189,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": .00189,
"5.0-5.1": 0,
"6.0-6.1": 95e-5,
"7.0-7.1": .25146,
"8.1-8.4": .00378,
"9.0-9.2": .00567,
9.3: .30346,
"10.0-10.2": .01418,
10.3: .53413,
"11.0-11.2": .12479,
"11.3-11.4": .08886,
"12.0-12.1": .04254,
"12.2-12.5": 2.42768,
"13.0-13.1": .06617,
13.2: .06617,
13.3: .1333,
"13.4-13.7": .05956,
"14.0-14.4": .35451,
"14.5-14.8": .58801,
"15.0-15.1": .27321,
"15.2-15.3": .40461,
15.4: .46322,
15.5: 3.02987,
"16.0": .02458
},
P: {
4: 1.07686,
"5.0-5.4": .22241,
"6.2-6.4": .04102,
"7.2-7.4": .26665,
8.2: .07179,
9.2: .07179,
10.1: .02051,
"11.1-11.2": .02051,
"12.0": .08205,
"13.0": .08205,
"14.0": .08205,
"15.0": .03077,
"16.0": .16409,
"17.0": .77944
},
I: {
0: 0,
3: 0,
4: 5e-4,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: .01957,
"4.2-4.3": .04711,
4.4: 0,
"4.4.3-4.4.4": .14324
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
11: .13164,
_: "6 7 8 9 10 5.5"
},
J: {
7: 0,
10: .01804
},
N: {
_: "10 11"
},
S: {
2.5: .01202
},
R: {
_: "0"
},
M: {
0: .20441
},
Q: {
10.4: .01202
},
O: {
0: .43286
},
H: {
0: 2.53853
},
L: {
0: 56.94403
}
};
},
50553: module => {
module.exports = {
C: {
52: .0609,
59: .01142,
66: .01142,
68: .00761,
72: .00381,
73: .00761,
78: .01522,
80: .00761,
84: .00381,
86: .03425,
88: .02664,
89: .01142,
90: .01522,
91: .20172,
94: .00381,
95: .00761,
97: .00761,
98: .01142,
99: .03425,
100: .01522,
101: .07993,
102: 1.17225,
103: .14463,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 53 54 55 56 57 58 60 61 62 63 64 65 67 69 70 71 74 75 76 77 79 81 82 83 85 87 92 93 96 104 105 3.5 3.6"
},
D: {
22: .00761,
34: .00761,
38: .01903,
47: .00381,
49: .1903,
51: .00381,
58: .00761,
63: .01142,
65: .00381,
66: .04948,
67: .00761,
68: .00381,
69: .01522,
70: .00761,
71: .00381,
72: .00381,
73: .00761,
74: .00761,
75: .00761,
76: .00761,
77: .01142,
78: .01522,
79: .03806,
80: .01903,
81: .02284,
83: .01522,
84: .01903,
85: .01522,
86: .03425,
87: .04187,
88: .01142,
89: .02664,
90: .02284,
91: .03425,
92: .02664,
93: .01903,
94: .02284,
95: .03806,
96: .07612,
97: .0609,
98: .05709,
99: .11799,
100: .1294,
101: .20552,
102: 1.04284,
103: 26.65342,
104: .01522,
105: .00381,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 23 24 25 26 27 28 29 30 31 32 33 35 36 37 39 40 41 42 43 44 45 46 48 50 52 53 54 55 56 57 59 60 61 62 64 106"
},
F: {
28: .00761,
36: .00761,
85: .01903,
86: .00761,
87: .03425,
88: 1.37016,
89: .37299,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 29 30 31 32 33 34 35 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
15: .00381,
17: .00761,
18: .01142,
92: .00761,
96: .00381,
99: .00381,
100: .01142,
101: .02664,
102: .05328,
103: 2.158,
_: "12 13 14 16 79 80 81 83 84 85 86 87 88 89 90 91 93 94 95 97 98"
},
E: {
4: 0,
13: .00761,
14: .02284,
15: .01142,
_: "0 5 6 7 8 9 10 11 12 3.1 3.2 5.1 6.1 7.1 9.1 10.1 16.0",
11.1: .01522,
12.1: .00761,
13.1: .04187,
14.1: .07612,
15.1: .01522,
"15.2-15.3": .01903,
15.4: .05328,
15.5: .34635,
15.6: .01903
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": .0106,
"6.0-6.1": .00177,
"7.0-7.1": .00442,
"8.1-8.4": 44e-5,
"9.0-9.2": 0,
9.3: .02076,
"10.0-10.2": 88e-5,
10.3: .01943,
"11.0-11.2": .00265,
"11.3-11.4": .05345,
"12.0-12.1": .00398,
"12.2-12.5": .15592,
"13.0-13.1": .00574,
13.2: .00221,
13.3: .01237,
"13.4-13.7": .03666,
"14.0-14.4": .08304,
"14.5-14.8": .26988,
"15.0-15.1": .05035,
"15.2-15.3": .13074,
15.4: .20053,
15.5: 3.24078,
"16.0": .0106
},
P: {
4: .1235,
"5.0-5.4": .22241,
"6.2-6.4": .04102,
"7.2-7.4": .22642,
8.2: .07179,
9.2: .01029,
10.1: .02051,
"11.1-11.2": .05146,
"12.0": .01029,
"13.0": .08234,
"14.0": .08234,
"15.0": .04117,
"16.0": .14409,
"17.0": 1.93488
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: .00191,
"4.2-4.3": .00334,
4.4: 0,
"4.4.3-4.4.4": .03192
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
11: .10657,
_: "6 7 8 9 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
_: "10 11"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: .1053
},
Q: {
10.4: 0
},
O: {
0: .02478
},
H: {
0: .17592
},
L: {
0: 56.00729
}
};
},
93854: module => {
module.exports = {
C: {
4: .01225,
102: .10205,
103: .02857,
_: "2 3 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100 101 104 105 3.5 3.6"
},
D: {
38: .00816,
47: .00408,
49: .00816,
53: .12654,
58: .13471,
66: .00408,
75: .00816,
77: .04082,
79: .32248,
80: .11838,
84: .01225,
85: .00816,
86: .00816,
87: .04898,
91: .01225,
92: .02041,
93: .16736,
98: .02857,
99: .00816,
100: .02857,
101: .1592,
102: 1.31032,
103: 10.26215,
104: .03266,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 39 40 41 42 43 44 45 46 48 50 51 52 54 55 56 57 59 60 61 62 63 64 65 67 68 69 70 71 72 73 74 76 78 81 83 88 89 90 94 95 96 97 105 106"
},
F: {
87: .01225,
88: .10205,
89: .02857,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
101: .06531,
102: .02041,
103: 1.0205,
_: "12 13 14 15 16 17 18 79 80 81 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100"
},
E: {
4: 0,
13: .04082,
14: .64904,
15: .00816,
_: "0 5 6 7 8 9 10 11 12 3.1 3.2 5.1 6.1 7.1 9.1 10.1 11.1 12.1",
13.1: .03674,
14.1: .35513,
15.1: .39187,
"15.2-15.3": .65312,
15.4: 2.10223,
15.5: 18.39349,
15.6: .64087,
"16.0": .05307
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": .03129,
"6.0-6.1": 0,
"7.0-7.1": 0,
"8.1-8.4": .08344,
"9.0-9.2": 0,
9.3: .05737,
"10.0-10.2": 0,
10.3: .01043,
"11.0-11.2": 0,
"11.3-11.4": 0,
"12.0-12.1": 0,
"12.2-12.5": .73014,
"13.0-13.1": 0,
13.2: 0,
13.3: .01043,
"13.4-13.7": .01565,
"14.0-14.4": .11474,
"14.5-14.8": .6832,
"15.0-15.1": .55803,
"15.2-15.3": 1.07956,
15.4: 3.52552,
15.5: 44.0168,
"16.0": .16167
},
P: {
4: .08359,
"5.0-5.4": .22241,
"6.2-6.4": .13142,
"7.2-7.4": .13584,
8.2: .04044,
9.2: .04185,
10.1: .03033,
"11.1-11.2": .05231,
"12.0": .02092,
"13.0": .10462,
"14.0": .0209,
"15.0": .05231,
"16.0": .0418,
"17.0": .38661
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: 0,
"4.2-4.3": .00845,
4.4: 0,
"4.4.3-4.4.4": .02114
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
_: "6 7 8 9 10 11 5.5"
},
J: {
7: 0,
10: 0
},
N: {
_: "10 11"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: .01775
},
Q: {
10.4: 0
},
O: {
0: .01184
},
H: {
0: .02241
},
L: {
0: 9.48668
}
};
},
36726: module => {
module.exports = {
C: {
48: .00922,
52: .0507,
56: .00922,
60: .08296,
61: .00922,
62: .00461,
68: .01383,
72: .01844,
78: .07835,
80: .00922,
81: .00461,
82: .00461,
83: .00461,
84: .00461,
85: .00922,
88: .01383,
89: .00922,
90: .00922,
91: .35489,
94: .01383,
95: .01844,
96: .01383,
97: .01383,
98: .02305,
99: .04609,
100: .06453,
101: .40559,
102: 5.83499,
103: .57152,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 49 50 51 53 54 55 57 58 59 63 64 65 66 67 69 70 71 73 74 75 76 77 79 86 87 92 93 104 105 3.5 3.6"
},
D: {
34: .00461,
38: .01383,
47: .01383,
49: .02765,
53: .00922,
60: .00461,
63: .00922,
65: .00922,
67: .00922,
69: .00922,
70: .00922,
75: .01844,
76: .03226,
77: .00922,
79: .36411,
80: .11062,
81: .00922,
83: .01844,
84: .01844,
85: .02305,
86: .02305,
87: .07835,
88: .01383,
89: .06453,
90: .01383,
91: .02305,
92: .03226,
93: .01383,
94: .02765,
95: .01844,
96: .13827,
97: .14749,
98: .12905,
99: .08296,
100: .11062,
101: .21201,
102: 1.12921,
103: 18.25625,
104: .01844,
105: .01383,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 35 36 37 39 40 41 42 43 44 45 46 48 50 51 52 54 55 56 57 58 59 61 62 64 66 68 71 72 73 74 78 106"
},
F: {
46: .00922,
79: .04609,
82: .01383,
84: .00922,
85: .72361,
86: .01383,
87: .11062,
88: 1.47949,
89: .28115,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 80 81 83 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
18: .01844,
85: .00461,
90: .00461,
92: .00922,
94: .00461,
95: .00922,
96: .00922,
97: .01383,
98: .01383,
99: .02305,
100: .02305,
101: .13827,
102: .37794,
103: 7.0656,
_: "12 13 14 15 16 17 79 80 81 83 84 86 87 88 89 91 93"
},
E: {
4: 0,
8: .00461,
12: .00922,
13: .04148,
14: .19358,
15: .06914,
_: "0 5 6 7 9 10 11 3.1 3.2 5.1 6.1 7.1 9.1",
10.1: .00922,
11.1: .03687,
12.1: .05531,
13.1: .29959,
14.1: .54847,
15.1: .13366,
"15.2-15.3": .14749,
15.4: .46551,
15.5: 2.69627,
15.6: .12905,
"16.0": .01844
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": .00196,
"6.0-6.1": 0,
"7.0-7.1": .00392,
"8.1-8.4": .00196,
"9.0-9.2": 0,
9.3: .07052,
"10.0-10.2": 0,
10.3: .06464,
"11.0-11.2": .01959,
"11.3-11.4": .01567,
"12.0-12.1": .03134,
"12.2-12.5": .34866,
"13.0-13.1": .01175,
13.2: .02155,
13.3: .06072,
"13.4-13.7": .10773,
"14.0-14.4": .45639,
"14.5-14.8": 1.27124,
"15.0-15.1": .3232,
"15.2-15.3": .62289,
15.4: 1.30453,
15.5: 14.33226,
"16.0": .0999
},
P: {
4: .19766,
"5.0-5.4": .0104,
"6.2-6.4": .04102,
"7.2-7.4": .16298,
8.2: .07179,
9.2: .05093,
10.1: .02051,
"11.1-11.2": .03121,
"12.0": .04161,
"13.0": .08322,
"14.0": .08322,
"15.0": .07282,
"16.0": .19766,
"17.0": 4.46294
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: .0283,
"4.2-4.3": 87e-5,
4.4: 0,
"4.4.3-4.4.4": .01935
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
8: .00461,
11: .18897,
_: "6 7 9 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
11: .02513,
_: "10"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: .77091
},
Q: {
10.4: 0
},
O: {
0: .06469
},
H: {
0: .35727
},
L: {
0: 28.84953
}
};
},
19107: module => {
module.exports = {
C: {
11: .00581,
52: .02906,
54: .01743,
66: .00581,
78: .0523,
79: .01162,
80: .01162,
81: .01162,
82: .00581,
83: .00581,
84: .00581,
87: .01162,
88: .00581,
89: .00581,
91: .05811,
93: .01162,
94: .1046,
95: .00581,
96: .00581,
97: .01162,
98: .00581,
99: .01743,
100: .02906,
101: .1569,
102: 1.92925,
103: .11622,
_: "2 3 4 5 6 7 8 9 10 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 53 55 56 57 58 59 60 61 62 63 64 65 67 68 69 70 71 72 73 74 75 76 77 85 86 90 92 104 105 3.5 3.6"
},
D: {
25: .01162,
26: .01162,
34: .02906,
38: .07554,
48: .00581,
49: .04068,
53: .00581,
56: .00581,
59: .03487,
60: .05811,
63: .01162,
65: .01743,
66: .01162,
67: .01162,
68: .01162,
69: .01743,
70: .00581,
72: .00581,
73: .01162,
74: .02324,
75: .01162,
76: .01162,
77: .01162,
78: .01743,
79: .1569,
80: .05811,
81: .04649,
83: .04649,
84: .06392,
85: .08717,
86: .1046,
87: .13946,
88: .02324,
89: .01743,
90: .01743,
91: .05811,
92: .04649,
93: .04068,
94: .05811,
95: .0523,
96: .19176,
97: .17433,
98: .13946,
99: .2092,
100: .30798,
101: .52299,
102: 3.04496,
103: 30.25207,
104: .02906,
105: .01743,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 27 28 29 30 31 32 33 35 36 37 39 40 41 42 43 44 45 46 47 50 51 52 54 55 57 58 61 62 64 71 106"
},
F: {
46: .02906,
86: .01162,
87: .04068,
88: .52299,
89: .11041,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
15: .00581,
16: .00581,
18: .02324,
85: .01743,
86: .01162,
88: .00581,
90: .00581,
92: .01743,
94: .00581,
95: .01743,
96: .03487,
98: .01162,
99: .03487,
100: .02324,
101: .13946,
102: .40677,
103: 7.69376,
_: "12 13 14 17 79 80 81 83 84 87 89 91 93 97"
},
E: {
4: 0,
12: .01162,
13: .08135,
14: .32542,
15: .09879,
_: "0 5 6 7 8 9 10 11 3.1 3.2 5.1 6.1 7.1",
9.1: .01162,
10.1: .01743,
11.1: .04649,
12.1: .09879,
13.1: .41258,
14.1: 1.03436,
15.1: .16271,
"15.2-15.3": .15109,
15.4: .63921,
15.5: 4.67786,
15.6: .09298,
"16.0": .01162
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": .01296,
"6.0-6.1": .00864,
"7.0-7.1": .01296,
"8.1-8.4": .01728,
"9.0-9.2": .01296,
9.3: .18571,
"10.0-10.2": .01296,
10.3: .19435,
"11.0-11.2": .04535,
"11.3-11.4": .06478,
"12.0-12.1": .05183,
"12.2-12.5": .90698,
"13.0-13.1": .03023,
13.2: .01296,
13.3: .0799,
"13.4-13.7": .19651,
"14.0-14.4": .57226,
"14.5-14.8": 1.55914,
"15.0-15.1": .38007,
"15.2-15.3": .63488,
15.4: 1.08621,
15.5: 15.23506,
"16.0": .05831
},
P: {
4: .24941,
"5.0-5.4": .01084,
"6.2-6.4": .04102,
"7.2-7.4": .16298,
8.2: .07179,
9.2: .05093,
10.1: .02051,
"11.1-11.2": .02169,
"12.0": .02169,
"13.0": .04338,
"14.0": .06506,
"15.0": .04338,
"16.0": .14097,
"17.0": 2.64588
},
I: {
0: 0,
3: 0,
4: .00196,
2.1: 0,
2.2: 98e-5,
2.3: 98e-5,
4.1: .00294,
"4.2-4.3": .00686,
4.4: 0,
"4.4.3-4.4.4": .03235
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
8: .01937,
9: .03874,
11: .2615,
_: "6 7 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
11: .02513,
_: "10"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: .37701
},
Q: {
10.4: .00838
},
O: {
0: .06284
},
H: {
0: .13087
},
L: {
0: 17.17793
}
};
},
93580: module => {
module.exports = {
C: {
48: .00325,
78: .15252,
90: .00649,
91: .01623,
99: .00974,
100: .00974,
101: .0357,
102: .68794,
103: .12007,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 79 80 81 82 83 84 85 86 87 88 89 92 93 94 95 96 97 98 104 105 3.5 3.6"
},
D: {
47: .00325,
49: .03894,
53: .00325,
56: .00325,
63: .01947,
65: .00649,
70: .02272,
72: .00325,
73: .00325,
76: .00325,
79: .01947,
80: .00649,
83: .01298,
84: .00325,
85: .01623,
86: .00974,
87: .02921,
89: .00325,
91: .01298,
92: .01298,
93: .11682,
94: .00974,
95: .00649,
96: .08113,
97: .01298,
98: .04543,
99: .09086,
100: .04868,
101: .30179,
102: 1.27853,
103: 16.04977,
104: .01947,
105: .01623,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 48 50 51 52 54 55 57 58 59 60 61 62 64 66 67 68 69 71 74 75 77 78 81 88 90 106"
},
F: {
88: .32775,
89: .11033,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
12: .00325,
18: .00974,
84: .06166,
85: .02921,
92: .00974,
96: .00974,
97: .00325,
99: .01298,
100: .01298,
101: .02272,
102: .13629,
103: 5.53922,
_: "13 14 15 16 17 79 80 81 83 86 87 88 89 90 91 93 94 95 98"
},
E: {
4: 0,
11: .00649,
13: .01623,
14: .11682,
15: .05517,
_: "0 5 6 7 8 9 10 12 3.1 3.2 5.1 6.1 7.1 9.1 10.1",
11.1: .07464,
12.1: .03894,
13.1: .3245,
14.1: .67496,
15.1: .08113,
"15.2-15.3": .34397,
15.4: .49649,
15.5: 3.18335,
15.6: .08437,
"16.0": .0357
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": 0,
"6.0-6.1": 0,
"7.0-7.1": 0,
"8.1-8.4": 0,
"9.0-9.2": 0,
9.3: .01483,
"10.0-10.2": .0089,
10.3: .05042,
"11.0-11.2": .00297,
"11.3-11.4": .02669,
"12.0-12.1": .00297,
"12.2-12.5": .3648,
"13.0-13.1": .00593,
13.2: 0,
13.3: .0089,
"13.4-13.7": .09194,
"14.0-14.4": .51903,
"14.5-14.8": 2.32525,
"15.0-15.1": .27286,
"15.2-15.3": .69698,
15.4: 1.37617,
15.5: 23.19317,
"16.0": .07118
},
P: {
4: .21391,
"5.0-5.4": .22241,
"6.2-6.4": .04102,
"7.2-7.4": .16298,
8.2: .07179,
9.2: .05093,
10.1: .02051,
"11.1-11.2": .11205,
"12.0": .01029,
"13.0": .06112,
"14.0": .11205,
"15.0": .0713,
"16.0": .20373,
"17.0": 7.31382
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: 0,
"4.2-4.3": 0,
4.4: 0,
"4.4.3-4.4.4": .00676
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
11: .03894,
_: "6 7 8 9 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
_: "10 11"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: .30398
},
Q: {
10.4: 0
},
O: {
0: .02027
},
H: {
0: .06395
},
L: {
0: 30.27729
}
};
},
25701: module => {
module.exports = {
C: {
48: .00494,
52: .28675,
78: .02472,
91: .05438,
99: .01483,
100: .09888,
101: .15821,
102: 3.92554,
103: .39058,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 49 50 51 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 79 80 81 82 83 84 85 86 87 88 89 90 92 93 94 95 96 97 98 104 105 3.5 3.6"
},
D: {
49: .01483,
58: .02966,
75: .00989,
76: .18787,
84: .03955,
87: .02472,
88: .06922,
92: .00494,
95: .00989,
96: .00494,
98: .0445,
99: .01978,
100: .38069,
101: .11866,
102: 1.11734,
103: 29.89637,
104: .00989,
105: .00494,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 50 51 52 53 54 55 56 57 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 77 78 79 80 81 83 85 86 89 90 91 93 94 97 106"
},
F: {
84: .00494,
87: .00494,
88: .71194,
89: .15326,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 85 86 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
18: .00494,
86: .00494,
99: .69216,
101: .07416,
102: .09888,
103: 4.60286,
_: "12 13 14 15 16 17 79 80 81 83 84 85 87 88 89 90 91 92 93 94 95 96 97 98 100"
},
E: {
4: 0,
12: .05933,
13: .07416,
14: .46968,
15: .10382,
_: "0 5 6 7 8 9 10 11 3.1 3.2 5.1 6.1 7.1 10.1 16.0",
9.1: .02472,
11.1: .00989,
12.1: .06427,
13.1: .51912,
14.1: .96408,
15.1: .09394,
"15.2-15.3": .02472,
15.4: .47462,
15.5: 1.74523,
15.6: .0445
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": 0,
"6.0-6.1": 0,
"7.0-7.1": .00258,
"8.1-8.4": 0,
"9.0-9.2": .00258,
9.3: .02837,
"10.0-10.2": .00516,
10.3: .33016,
"11.0-11.2": 0,
"11.3-11.4": .00645,
"12.0-12.1": .27728,
"12.2-12.5": 1.84683,
"13.0-13.1": .10962,
13.2: .00129,
13.3: .03095,
"13.4-13.7": .06964,
"14.0-14.4": .44623,
"14.5-14.8": .66935,
"15.0-15.1": .24117,
"15.2-15.3": .25794,
15.4: .75447,
15.5: 7.73296,
"16.0": .00645
},
P: {
4: .02234,
"5.0-5.4": .22241,
"6.2-6.4": .13142,
"7.2-7.4": .03351,
8.2: .04044,
9.2: .3235,
10.1: .03033,
"11.1-11.2": .01117,
"12.0": .04044,
"13.0": .13142,
"14.0": .01117,
"15.0": .14153,
"16.0": .1117,
"17.0": 4.65786
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: 0,
"4.2-4.3": 0,
4.4: 0,
"4.4.3-4.4.4": .09605
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
11: .11371,
_: "6 7 8 9 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
_: "10 11"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: 4.06422
},
Q: {
10.4: 0
},
O: {
0: 0
},
H: {
0: .07657
},
L: {
0: 29.4745
}
};
},
77385: module => {
module.exports = {
C: {
68: .00714,
78: .16784,
79: .00357,
84: .00357,
88: .00357,
91: .00714,
99: .01071,
100: .00714,
101: .01428,
102: .29996,
103: .01786,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 69 70 71 72 73 74 75 76 77 80 81 82 83 85 86 87 89 90 92 93 94 95 96 97 98 104 105 3.5 3.6"
},
D: {
38: .01428,
49: .01071,
50: .01071,
53: .06785,
55: .00714,
56: .00714,
65: .00714,
66: .00357,
67: .00714,
68: .025,
69: .00714,
70: .00357,
72: .00357,
74: .01428,
77: .01071,
78: .02143,
79: 1.08201,
80: .01071,
81: .00357,
83: .01786,
84: .01071,
85: .01786,
86: .02857,
87: .08928,
88: .00714,
89: .025,
90: .01071,
91: .03571,
92: .04642,
93: .01428,
94: .01428,
95: .01428,
96: .03928,
97: .04999,
98: .08213,
99: .03571,
100: .16784,
101: .14641,
102: 1.28913,
103: 23.28292,
104: .03571,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 39 40 41 42 43 44 45 46 47 48 51 52 54 57 58 59 60 61 62 63 64 71 73 75 76 105 106"
},
F: {
25: .00714,
28: .1107,
36: .00357,
40: .00357,
46: .025,
62: .03214,
73: .00357,
77: .00357,
78: .00357,
79: .01071,
80: .00714,
81: .00357,
82: .03571,
84: .02857,
85: .12856,
86: .01071,
87: .09999,
88: 2.24616,
89: 1.24985,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 26 27 29 30 31 32 33 34 35 37 38 39 41 42 43 44 45 47 48 49 50 51 52 53 54 55 56 57 58 60 63 64 65 66 67 68 69 70 71 72 74 75 76 83 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
18: .01428,
84: .00714,
99: .00357,
101: .00714,
102: .11784,
103: 1.13201,
_: "12 13 14 15 16 17 79 80 81 83 85 86 87 88 89 90 91 92 93 94 95 96 97 98 100"
},
E: {
4: 0,
14: .03928,
15: .00714,
_: "0 5 6 7 8 9 10 11 12 13 3.1 3.2 6.1 7.1 9.1 10.1 11.1 16.0",
5.1: .01071,
12.1: .01071,
13.1: .04285,
14.1: .10356,
15.1: .04999,
"15.2-15.3": .04999,
15.4: .09285,
15.5: .37853,
15.6: .01786
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": .01474,
"6.0-6.1": 0,
"7.0-7.1": .01908,
"8.1-8.4": 0,
"9.0-9.2": .00173,
9.3: .00607,
"10.0-10.2": .00173,
10.3: .08931,
"11.0-11.2": .01387,
"11.3-11.4": .03642,
"12.0-12.1": .00607,
"12.2-12.5": .42922,
"13.0-13.1": .0052,
13.2: .00173,
13.3: .03642,
"13.4-13.7": .08931,
"14.0-14.4": .25493,
"14.5-14.8": .51507,
"15.0-15.1": .20898,
"15.2-15.3": .25407,
15.4: .79428,
15.5: 5.57645,
"16.0": .19077
},
P: {
4: .66045,
"5.0-5.4": .0104,
"6.2-6.4": .04102,
"7.2-7.4": .09145,
8.2: .07179,
9.2: .01016,
10.1: .02051,
"11.1-11.2": .07113,
"12.0": .03048,
"13.0": .14225,
"14.0": .12193,
"15.0": .08129,
"16.0": .22354,
"17.0": 4.01353
},
I: {
0: 0,
3: 0,
4: .00113,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: 76e-5,
"4.2-4.3": .00189,
4.4: 0,
"4.4.3-4.4.4": .01551
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
11: .01786,
_: "6 7 8 9 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
11: .02513,
_: "10"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: .09645
},
Q: {
10.4: 0
},
O: {
0: .50797
},
H: {
0: .57831
},
L: {
0: 49.95861
}
};
},
63494: module => {
module.exports = {
C: {
29: .0055,
34: .00275,
45: .528,
52: .473,
56: .00275,
68: .0055,
78: .00825,
85: .00275,
88: .0055,
89: .00275,
91: .0165,
94: .00275,
95: .0275,
96: .00275,
97: .022,
98: .0055,
99: .0495,
100: .01925,
101: .08525,
102: 1.6005,
103: .20625,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 30 31 32 33 35 36 37 38 39 40 41 42 43 44 46 47 48 49 50 51 53 54 55 57 58 59 60 61 62 63 64 65 66 67 69 70 71 72 73 74 75 76 77 79 80 81 82 83 84 86 87 90 92 93 104 105 3.5 3.6"
},
D: {
26: .011,
34: .0055,
38: .00825,
43: .00825,
47: .00275,
49: .09075,
53: .01375,
55: .00275,
63: .0055,
65: .00275,
68: .0165,
70: .0055,
71: .0055,
72: .00275,
73: .0055,
74: .00275,
75: .00275,
76: .011,
77: .0165,
78: .00825,
79: .11825,
80: .0055,
81: .01375,
83: .0165,
84: .022,
85: .011,
86: .01375,
87: .033,
88: .011,
89: .033,
90: .00825,
91: .022,
92: .02475,
93: .02475,
94: .0275,
95: .01925,
96: .05225,
97: .055,
98: .033,
99: .0605,
100: .0825,
101: .121,
102: .8745,
103: 17.5285,
104: .01375,
105: .00825,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 27 28 29 30 31 32 33 35 36 37 39 40 41 42 44 45 46 48 50 51 52 54 56 57 58 59 60 61 62 64 66 67 69 106"
},
F: {
28: .02475,
36: .00825,
40: .00825,
46: .0055,
85: .044,
86: .0055,
87: .0495,
88: .8635,
89: .33275,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 29 30 31 32 33 34 35 37 38 39 41 42 43 44 45 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
14: .0055,
18: .00275,
85: .0275,
90: .0055,
92: .00825,
100: .0055,
101: .01375,
102: .04675,
103: 1.4025,
_: "12 13 15 16 17 79 80 81 83 84 86 87 88 89 91 93 94 95 96 97 98 99"
},
E: {
4: 0,
13: .00825,
14: .03025,
15: .01925,
_: "0 5 6 7 8 9 10 11 12 3.1 3.2 5.1 6.1 7.1 9.1 10.1 16.0",
11.1: .00275,
12.1: .00825,
13.1: .04675,
14.1: .0935,
15.1: .022,
"15.2-15.3": .0165,
15.4: .05775,
15.5: .2915,
15.6: .011
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": 0,
"6.0-6.1": 0,
"7.0-7.1": .00889,
"8.1-8.4": 0,
"9.0-9.2": 0,
9.3: .06003,
"10.0-10.2": .00148,
10.3: .09782,
"11.0-11.2": .01037,
"11.3-11.4": .00815,
"12.0-12.1": .00815,
"12.2-12.5": .39869,
"13.0-13.1": .00741,
13.2: .00148,
13.3: .02446,
"13.4-13.7": .05854,
"14.0-14.4": .18008,
"14.5-14.8": .54172,
"15.0-15.1": .09412,
"15.2-15.3": .20305,
15.4: .43723,
15.5: 5.08371,
"16.0": .03187
},
P: {
4: .18584,
"5.0-5.4": .0104,
"6.2-6.4": .02051,
"7.2-7.4": .0413,
8.2: .07179,
9.2: .01032,
10.1: .02051,
"11.1-11.2": .08259,
"12.0": .01032,
"13.0": .07227,
"14.0": .06195,
"15.0": .05162,
"16.0": .14454,
"17.0": 2.261
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: .01004,
"4.2-4.3": .01434,
4.4: 0,
"4.4.3-4.4.4": .10612
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
11: .04675,
_: "6 7 8 9 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
11: .02513,
_: "10"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: .1595
},
Q: {
10.4: 0
},
O: {
0: .029
},
H: {
0: .28828
},
L: {
0: 62.69375
}
};
},
83647: module => {
module.exports = {
C: {
45: .00889,
78: .01777,
87: .01333,
91: .01333,
101: .13329,
102: 1.34179,
103: .13329,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 79 80 81 82 83 84 85 86 88 89 90 92 93 94 95 96 97 98 99 100 104 105 3.5 3.6"
},
D: {
49: .00889,
65: .00444,
70: .00444,
74: .00889,
75: .00889,
76: .02222,
77: .00444,
79: .23104,
80: .04443,
81: .01777,
83: .07109,
85: .00889,
86: .10219,
87: .05776,
88: .00889,
89: .0311,
91: .00889,
93: .09775,
94: .01333,
95: .00889,
96: .05332,
97: .01777,
98: .08442,
99: .07997,
100: .14218,
101: .11996,
102: 1.65724,
103: 23.34797,
104: .01333,
105: .00889,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 66 67 68 69 71 72 73 78 84 90 92 106"
},
F: {
86: .01777,
87: .02666,
88: .73754,
89: .37321,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
15: .01777,
18: .00444,
99: .02222,
101: .01777,
102: .10219,
103: 8.70384,
_: "12 13 14 16 17 79 80 81 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 100"
},
E: {
4: .01333,
13: .02666,
14: .22215,
15: .02666,
_: "0 5 6 7 8 9 10 11 12 3.1 3.2 5.1 7.1 10.1",
6.1: .01777,
9.1: .05332,
11.1: .03554,
12.1: .01777,
13.1: .16439,
14.1: .32878,
15.1: .05332,
"15.2-15.3": .18216,
15.4: .27102,
15.5: 2.1904,
15.6: .07109,
"16.0": .01333
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": .00251,
"6.0-6.1": 0,
"7.0-7.1": .02137,
"8.1-8.4": 0,
"9.0-9.2": 0,
9.3: .21375,
"10.0-10.2": 0,
10.3: .05155,
"11.0-11.2": .00377,
"11.3-11.4": .0264,
"12.0-12.1": .00629,
"12.2-12.5": .56203,
"13.0-13.1": .0088,
13.2: 0,
13.3: .00629,
"13.4-13.7": .02515,
"14.0-14.4": .20243,
"14.5-14.8": .52557,
"15.0-15.1": .12196,
"15.2-15.3": .22129,
15.4: .90529,
15.5: 9.19873,
"16.0": .06664
},
P: {
4: .23599,
"5.0-5.4": .0104,
"6.2-6.4": .03131,
"7.2-7.4": .23599,
8.2: .07179,
9.2: .01044,
10.1: .02051,
"11.1-11.2": .07509,
"12.0": .02087,
"13.0": .05363,
"14.0": .04291,
"15.0": .06436,
"16.0": .30035,
"17.0": 6.84372
},
I: {
0: 0,
3: 0,
4: .0017,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: 0,
"4.2-4.3": .00227,
4.4: 0,
"4.4.3-4.4.4": .04603
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
11: .04443,
_: "6 7 8 9 10 5.5"
},
J: {
7: 0,
10: .01111
},
N: {
11: .02513,
_: "10"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: .42233
},
Q: {
10.4: 0
},
O: {
0: .13893
},
H: {
0: .15257
},
L: {
0: 36.78941
}
};
},
10858: module => {
module.exports = {
C: {
40: .02209,
43: .00552,
47: .00552,
49: .00276,
52: .03865,
56: .00276,
57: .00276,
72: .00552,
78: .00552,
79: .00552,
80: .00552,
81: .00552,
82: .00276,
84: .00828,
86: .00276,
88: .00552,
89: .01104,
91: .03037,
92: .00276,
93: .00276,
94: .00276,
95: .00552,
96: .00552,
97: .00552,
98: .00552,
99: .02209,
100: .03037,
101: .12425,
102: 2.12045,
103: .40587,
104: .02209,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 41 42 44 45 46 48 50 51 53 54 55 58 59 60 61 62 63 64 65 66 67 68 69 70 71 73 74 75 76 77 83 85 87 90 105 3.5 3.6"
},
D: {
38: .00552,
41: .00552,
49: .00828,
50: .00828,
56: .00552,
62: .00276,
63: .00552,
64: .00276,
65: .00276,
66: .00276,
67: .00552,
69: .01104,
70: .00552,
71: .00552,
72: .00828,
73: .01381,
74: .02209,
75: .00552,
76: .00828,
77: .00828,
78: .01381,
79: .03589,
80: .01657,
81: .02761,
83: .02761,
84: .03313,
85: .04418,
86: .06626,
87: .0497,
88: .00828,
89: .03313,
90: .01104,
91: .01933,
92: .02485,
93: .00828,
94: .02209,
95: .03037,
96: .05246,
97: .04694,
98: .03313,
99: .05246,
100: .07179,
101: .11044,
102: .48318,
103: 15.88403,
104: .04694,
105: .02209,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 39 40 42 43 44 45 46 47 48 51 52 53 54 55 57 58 59 60 61 68 106"
},
F: {
28: .00552,
29: .00552,
36: .00552,
46: .00828,
68: .00828,
79: .00828,
85: .01933,
86: .00828,
87: .00828,
88: .35065,
89: .22916,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 30 31 32 33 34 35 37 38 39 40 41 42 43 44 45 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 69 70 71 72 73 74 75 76 77 78 80 81 82 83 84 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
12: .00828,
13: .00552,
16: .00552,
18: .01933,
84: .00552,
85: .00276,
89: .00552,
90: .00276,
92: .01104,
100: .00276,
101: .01381,
102: .01933,
103: 1.04642,
_: "14 15 17 79 80 81 83 86 87 88 91 93 94 95 96 97 98 99"
},
E: {
4: 0,
13: .00552,
14: .01104,
15: .00276,
_: "0 5 6 7 8 9 10 11 12 3.1 3.2 5.1 6.1 7.1 9.1 10.1 11.1",
12.1: .00276,
13.1: .01381,
14.1: .03037,
15.1: .00828,
"15.2-15.3": .00552,
15.4: .03865,
15.5: .18775,
15.6: .01381,
"16.0": .00276
},
G: {
8: 0,
3.2: 73e-5,
"4.0-4.1": 0,
"4.2-4.3": 24e-5,
"5.0-5.1": .00441,
"6.0-6.1": 24e-5,
"7.0-7.1": .0421,
"8.1-8.4": 73e-5,
"9.0-9.2": .00196,
9.3: .02595,
"10.0-10.2": .00122,
10.3: .02081,
"11.0-11.2": .00269,
"11.3-11.4": .00318,
"12.0-12.1": .00343,
"12.2-12.5": .17136,
"13.0-13.1": .00269,
13.2: .00343,
13.3: .00588,
"13.4-13.7": .02742,
"14.0-14.4": .06267,
"14.5-14.8": .11824,
"15.0-15.1": .06169,
"15.2-15.3": .13072,
15.4: .21101,
15.5: 1.43597,
"16.0": .02081
},
P: {
4: .33392,
"5.0-5.4": .0104,
"6.2-6.4": .03131,
"7.2-7.4": .18783,
8.2: .07179,
9.2: .01044,
10.1: .02051,
"11.1-11.2": .04174,
"12.0": .02087,
"13.0": .06261,
"14.0": .07305,
"15.0": .03131,
"16.0": .10435,
"17.0": .80351
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: .00302,
"4.2-4.3": .00604,
4.4: 0,
"4.4.3-4.4.4": .12845
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
8: .00276,
11: .05522,
_: "6 7 9 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
11: .02513,
_: "10"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: .13028
},
Q: {
10.4: 0
},
O: {
0: 2.29445
},
H: {
0: 2.39836
},
L: {
0: 67.79675
}
};
},
92635: module => {
module.exports = {
C: {
50: .00679,
52: .04071,
53: .00679,
56: .00679,
75: .00679,
78: .0475,
87: .1832,
91: .08821,
94: .14927,
95: .00679,
97: .01357,
99: .00679,
100: .02036,
101: .14249,
102: 2.20513,
103: .26462,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 51 54 55 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 76 77 79 80 81 82 83 84 85 86 88 89 90 92 93 96 98 104 105 3.5 3.6"
},
D: {
49: .04071,
53: .00679,
64: .15606,
66: .02036,
67: .02714,
69: .02036,
74: .03393,
75: .03393,
76: .0475,
77: .04071,
78: .55637,
79: .80063,
80: .01357,
81: .02036,
83: .28497,
84: .02036,
85: .03393,
86: .01357,
87: .07464,
88: .01357,
89: .02714,
90: .02036,
91: .02036,
92: .02714,
93: .07464,
94: .02036,
95: .02714,
96: .07464,
97: .05428,
98: .06107,
99: .15606,
100: .24426,
101: .38675,
102: 3.67747,
103: 38.71521,
104: .03393,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 50 51 52 54 55 56 57 58 59 60 61 62 63 65 68 70 71 72 73 105 106"
},
F: {
86: .01357,
87: .02714,
88: .56994,
89: .17641,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
18: .00679,
86: .00679,
92: .00679,
96: .01357,
97: .04071,
98: .00679,
99: .02036,
100: .04071,
101: .09499,
102: .52245,
103: 12.03659,
_: "12 13 14 15 16 17 79 80 81 83 84 85 87 88 89 90 91 93 94 95"
},
E: {
4: 0,
11: .01357,
13: .02714,
14: .21034,
15: .04071,
_: "0 5 6 7 8 9 10 12 3.1 3.2 5.1 6.1 7.1 9.1 10.1",
11.1: .02714,
12.1: .0475,
13.1: .27819,
14.1: .35282,
15.1: .09499,
"15.2-15.3": .08142,
15.4: .33925,
15.5: 2.33404,
15.6: .10178,
"16.0": .01357
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": 0,
"6.0-6.1": 0,
"7.0-7.1": 0,
"8.1-8.4": .00928,
"9.0-9.2": 0,
9.3: .04244,
"10.0-10.2": .00398,
10.3: .07826,
"11.0-11.2": .00663,
"11.3-11.4": .03051,
"12.0-12.1": .01326,
"12.2-12.5": .32364,
"13.0-13.1": .00928,
13.2: .00398,
13.3: .02785,
"13.4-13.7": .07693,
"14.0-14.4": .26395,
"14.5-14.8": .84093,
"15.0-15.1": .27854,
"15.2-15.3": .49872,
15.4: .83165,
15.5: 9.60438,
"16.0": .06367
},
P: {
4: .06403,
"5.0-5.4": .0104,
"6.2-6.4": .29967,
"7.2-7.4": .02134,
8.2: .07179,
9.2: .01044,
10.1: .02051,
"11.1-11.2": .02134,
"12.0": .01067,
"13.0": .02134,
"14.0": .05336,
"15.0": .02134,
"16.0": .06403,
"17.0": 2.49709
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: .01372,
"4.2-4.3": .00211,
4.4: 0,
"4.4.3-4.4.4": .01953
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
11: .12892,
_: "6 7 8 9 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
11: .02513,
_: "10"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: .21541
},
Q: {
10.4: 0
},
O: {
0: .02572
},
H: {
0: .07914
},
L: {
0: 15.98768
}
};
},
72002: module => {
module.exports = {
C: {
35: .00556,
36: .00278,
38: .00834,
40: .00278,
41: .0278,
42: .00278,
43: .00556,
45: .00556,
47: .01668,
48: .00834,
49: .01112,
52: .04448,
56: .00556,
63: .00556,
72: .03058,
75: .00278,
76: .0695,
78: .01112,
80: .00834,
86: .01112,
89: .00556,
91: .08896,
95: .00556,
96: .15568,
97: .02224,
98: .05838,
99: .06394,
100: .0417,
101: .15568,
102: 3.61678,
103: .44202,
104: .01668,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 37 39 44 46 50 51 53 54 55 57 58 59 60 61 62 64 65 66 67 68 69 70 71 73 74 77 79 81 82 83 84 85 87 88 90 92 93 94 105 3.5 3.6"
},
D: {
25: .00278,
26: .01946,
28: .00278,
29: .00278,
39: .00278,
49: .00834,
51: .00278,
55: .00556,
57: .00278,
63: .00834,
65: .00278,
68: .0139,
70: .00556,
71: .00834,
72: .00278,
74: .0834,
77: .00834,
78: .00556,
79: .00556,
80: .00278,
81: .01946,
83: .00278,
84: .00278,
86: .01946,
87: .0139,
88: .01112,
89: .00556,
90: .00556,
91: .01112,
92: .02224,
93: .01112,
94: .01112,
95: .00556,
96: .01946,
97: .03892,
98: .04448,
99: .01946,
100: .09452,
101: .17792,
102: .5421,
103: 11.7872,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 27 30 31 32 33 34 35 36 37 38 40 41 42 43 44 45 46 47 48 50 52 53 54 56 58 59 60 61 62 64 66 67 69 73 75 76 85 104 105 106"
},
F: {
67: .00834,
79: .03614,
83: .00278,
84: .0278,
85: .00556,
86: .01668,
87: .0139,
88: .25298,
89: .18904,
90: .00278,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 68 69 70 71 72 73 74 75 76 77 78 80 81 82 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
12: .05004,
13: .00556,
14: .00834,
15: .01112,
16: .00834,
17: .00834,
18: .06394,
84: .02224,
85: .00834,
89: .01112,
90: .00556,
92: .0278,
95: .00556,
96: .00834,
97: .01112,
98: .01112,
99: .0139,
100: .02502,
101: .03336,
102: .04726,
103: 2.19064,
_: "79 80 81 83 86 87 88 91 93 94"
},
E: {
4: 0,
9: .00556,
11: .00556,
14: .0139,
15: .0139,
_: "0 5 6 7 8 10 12 13 3.1 3.2 6.1 10.1 11.1",
5.1: .00278,
7.1: .00556,
9.1: .00278,
12.1: .01946,
13.1: .00834,
14.1: .03058,
15.1: .01668,
"15.2-15.3": .00556,
15.4: .01946,
15.5: .28634,
15.6: .01112,
"16.0": .00556
},
G: {
8: .00873,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": 0,
"6.0-6.1": 0,
"7.0-7.1": .00919,
"8.1-8.4": 0,
"9.0-9.2": 0,
9.3: .02896,
"10.0-10.2": .00138,
10.3: .04366,
"11.0-11.2": .01287,
"11.3-11.4": .00643,
"12.0-12.1": .02804,
"12.2-12.5": .4711,
"13.0-13.1": .01655,
13.2: .00184,
13.3: .03493,
"13.4-13.7": .11582,
"14.0-14.4": .3709,
"14.5-14.8": .62323,
"15.0-15.1": .19212,
"15.2-15.3": .32954,
15.4: .43709,
15.5: 1.63942,
"16.0": .06067
},
P: {
4: .01102,
"5.0-5.4": .0104,
"6.2-6.4": .03116,
"7.2-7.4": .04409,
8.2: .07179,
9.2: .03307,
10.1: .02116,
"11.1-11.2": .06614,
"12.0": .02077,
"13.0": .06232,
"14.0": .04409,
"15.0": .02205,
"16.0": .08818,
"17.0": .71647
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: .0036,
"4.2-4.3": .00504,
4.4: 0,
"4.4.3-4.4.4": .20794
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
11: .14178,
_: "6 7 8 9 10 5.5"
},
J: {
7: 0,
10: .01444
},
N: {
11: .02513,
_: "10"
},
S: {
2.5: .00722
},
R: {
_: "0"
},
M: {
0: .08663
},
Q: {
10.4: .12272
},
O: {
0: .95291
},
H: {
0: 4.13486
},
L: {
0: 66.53589
}
};
},
28470: module => {
module.exports = {
C: {
52: .1588,
56: .00369,
60: .00739,
66: .02216,
67: .00369,
68: .06647,
72: .01477,
78: .02585,
80: .02216,
81: .00369,
82: .00369,
83: .01477,
84: .01477,
85: .00369,
86: .00369,
87: .01108,
88: .02216,
89: .01477,
90: .00739,
91: .11818,
93: .00739,
94: .01108,
95: .01477,
96: .01477,
97: .01477,
98: .01847,
99: .04801,
100: .05909,
101: .27698,
102: 4.10662,
103: .38777,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 53 54 55 57 58 59 61 62 63 64 65 69 70 71 73 74 75 76 77 79 92 104 105 3.5 3.6"
},
D: {
38: .00739,
49: .18465,
54: .00369,
56: .00369,
58: .00369,
63: .00739,
65: .00369,
66: .00369,
67: .00369,
68: .00369,
69: .06647,
70: .00369,
71: .01108,
73: .00369,
74: .01108,
75: .00739,
76: .00369,
77: .00739,
78: .00739,
79: .23266,
80: .01108,
81: .02585,
83: .01477,
84: .01477,
85: .01477,
86: .03324,
87: .04432,
88: .01477,
89: .02585,
90: .01108,
91: .01847,
92: .04801,
93: .01108,
94: .01108,
95: .02954,
96: .0517,
97: .04062,
98: .03324,
99: .07386,
100: .08125,
101: .25851,
102: 1.38118,
103: 21.22367,
104: .01477,
105: .01477,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 39 40 41 42 43 44 45 46 47 48 50 51 52 53 55 57 59 60 61 62 64 72 106"
},
F: {
28: .02216,
36: .00739,
40: .00369,
46: .01847,
82: .00739,
85: .03324,
86: .01108,
87: .09233,
88: 1.08574,
89: .48378,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 29 30 31 32 33 34 35 37 38 39 41 42 43 44 45 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 83 84 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
16: .00369,
18: .00739,
92: .00369,
99: .00369,
100: .01847,
101: .02216,
102: .07386,
103: 2.45585,
_: "12 13 14 15 17 79 80 81 83 84 85 86 87 88 89 90 91 93 94 95 96 97 98"
},
E: {
4: 0,
13: .01477,
14: .03693,
15: .01477,
_: "0 5 6 7 8 9 10 11 12 3.1 3.2 5.1 6.1 7.1 10.1 16.0",
9.1: .00369,
11.1: .00369,
12.1: .01477,
13.1: .04062,
14.1: .08494,
15.1: .02216,
"15.2-15.3": .01477,
15.4: .05909,
15.5: .39884,
15.6: .01847
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": .00171,
"6.0-6.1": 0,
"7.0-7.1": .00342,
"8.1-8.4": 85e-5,
"9.0-9.2": 0,
9.3: .01966,
"10.0-10.2": .00171,
10.3: .03932,
"11.0-11.2": .02308,
"11.3-11.4": .00769,
"12.0-12.1": .01197,
"12.2-12.5": .23338,
"13.0-13.1": .00855,
13.2: .00171,
13.3: .01966,
"13.4-13.7": .08207,
"14.0-14.4": .20004,
"14.5-14.8": .61465,
"15.0-15.1": .14362,
"15.2-15.3": .2727,
15.4: .50523,
15.5: 6.07901,
"16.0": .08805
},
P: {
4: .09347,
"5.0-5.4": .0104,
"6.2-6.4": .03116,
"7.2-7.4": .05289,
8.2: .07179,
9.2: .01032,
10.1: .02116,
"11.1-11.2": .06232,
"12.0": .02077,
"13.0": .06232,
"14.0": .10386,
"15.0": .05193,
"16.0": .17656,
"17.0": 2.48223
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: .00985,
"4.2-4.3": .01642,
4.4: 0,
"4.4.3-4.4.4": .09358
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
9: .00369,
11: .27328,
_: "6 7 8 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
11: .02513,
_: "10"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: .18293
},
Q: {
10.4: 0
},
O: {
0: .03785
},
H: {
0: .2568
},
L: {
0: 51.65874
}
};
},
83993: module => {
module.exports = {
C: {
34: .02221,
36: .00317,
52: .02221,
78: .00635,
88: .00317,
89: .00317,
91: .01904,
99: .00317,
100: .01269,
101: .04442,
102: .77104,
103: .07298,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 35 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 79 80 81 82 83 84 85 86 87 90 92 93 94 95 96 97 98 104 105 3.5 3.6"
},
D: {
5: .00635,
11: .00952,
34: .00317,
38: .01269,
47: .00635,
49: .03173,
55: .01269,
56: .00317,
63: .00635,
64: .00317,
65: .4823,
67: .00952,
68: .00635,
73: .01904,
74: .00317,
76: .00952,
77: .00952,
79: .13644,
80: .01587,
81: .01269,
83: .02538,
84: .01269,
85: .01269,
86: .01269,
87: .02538,
88: .0476,
89: .01904,
90: .00952,
91: .01587,
92: .02538,
93: .04125,
94: .00635,
95: .01904,
96: .08884,
97: .01587,
98: .0476,
99: .05077,
100: .07933,
101: .12375,
102: 1.01536,
103: 19.85663,
104: .02856,
105: .00635,
_: "4 6 7 8 9 10 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 35 36 37 39 40 41 42 43 44 45 46 48 50 51 52 53 54 57 58 59 60 61 62 66 69 70 71 72 75 78 106"
},
F: {
28: .00952,
46: .00635,
62: .00317,
79: .00317,
82: .00952,
84: .01904,
85: .05077,
86: .07298,
87: .06981,
88: .16817,
89: .02538,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 47 48 49 50 51 52 53 54 55 56 57 58 60 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 80 81 83 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
14: .01904,
18: .01269,
84: .00317,
86: .00635,
87: .00952,
89: .00317,
92: .00635,
93: .00317,
96: .00317,
97: .00635,
98: .01269,
99: .00952,
100: .00317,
101: .0476,
102: .1174,
103: 2.86522,
_: "12 13 15 16 17 79 80 81 83 85 88 90 91 94 95"
},
E: {
4: 0,
13: .02221,
14: .12692,
15: .04125,
_: "0 5 6 7 8 9 10 11 12 3.1 3.2 5.1 6.1 7.1 9.1",
10.1: .05394,
11.1: .00317,
12.1: .02221,
13.1: .09202,
14.1: .36172,
15.1: .11423,
"15.2-15.3": .16182,
15.4: .28557,
15.5: 1.31362,
15.6: .07298,
"16.0": .01904
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": .00594,
"6.0-6.1": 0,
"7.0-7.1": .04158,
"8.1-8.4": .00594,
"9.0-9.2": 0,
9.3: .06931,
"10.0-10.2": .00198,
10.3: .07723,
"11.0-11.2": .00792,
"11.3-11.4": .03168,
"12.0-12.1": .02178,
"12.2-12.5": .33664,
"13.0-13.1": .0198,
13.2: .0099,
13.3: .06337,
"13.4-13.7": .14852,
"14.0-14.4": .41584,
"14.5-14.8": 1.27724,
"15.0-15.1": .42575,
"15.2-15.3": .77228,
15.4: 1.39209,
15.5: 13.96643,
"16.0": .12277
},
P: {
4: .12262,
"5.0-5.4": .0104,
"6.2-6.4": .04102,
"7.2-7.4": .09196,
8.2: .07179,
9.2: .09196,
10.1: .02051,
"11.1-11.2": .21458,
"12.0": .03065,
"13.0": .13284,
"14.0": .15327,
"15.0": .04087,
"16.0": .26567,
"17.0": 3.23915
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: 0,
"4.2-4.3": .00827,
4.4: 0,
"4.4.3-4.4.4": .03952
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
11: .14913,
_: "6 7 8 9 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
11: .02513,
_: "10"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: .27312
},
Q: {
10.4: 0
},
O: {
0: 2.32152
},
H: {
0: .68522
},
L: {
0: 42.57193
}
};
},
94716: module => {
module.exports = {
C: {
30: .00263,
38: .01577,
40: .01577,
45: .00526,
47: .00526,
49: .0184,
50: .00526,
52: .00263,
56: .00789,
66: .00526,
67: .01052,
72: .0184,
77: .00263,
78: .00526,
84: .00263,
86: .00526,
88: .02103,
91: .01577,
92: .03155,
96: .01052,
98: .01052,
99: .00526,
100: .03418,
101: .09464,
102: 2.70524,
103: .19455,
104: .03155,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 31 32 33 34 35 36 37 39 41 42 43 44 46 48 51 53 54 55 57 58 59 60 61 62 63 64 65 68 69 70 71 73 74 75 76 79 80 81 82 83 85 87 89 90 93 94 95 97 105 3.5 3.6"
},
D: {
31: .00263,
37: .00526,
49: .00263,
62: .01052,
64: .00526,
65: .01052,
67: .01052,
69: .00526,
70: .00263,
71: .00526,
74: .01052,
75: .01052,
76: .00263,
77: .01052,
79: .04206,
80: .05784,
81: .06835,
83: .0815,
84: .00526,
85: .02103,
87: .05521,
88: .03418,
89: .01052,
91: .01315,
92: .00526,
93: .07361,
94: .00526,
95: .01052,
96: .04732,
97: .04732,
98: .10516,
99: .07624,
100: .04469,
101: .26027,
102: 1.10944,
103: 10.22155,
104: .00263,
105: .00526,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 32 33 34 35 36 38 39 40 41 42 43 44 45 46 47 48 50 51 52 53 54 55 56 57 58 59 60 61 63 66 68 72 73 78 86 90 106"
},
F: {
36: .00263,
40: .00263,
42: .00526,
75: .00526,
79: .03418,
84: .00789,
85: .0184,
86: .01577,
87: .02892,
88: .48899,
89: .38383,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 37 38 39 41 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 76 77 78 80 81 82 83 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
12: .0631,
13: .02103,
14: .03155,
15: .03155,
16: .01577,
17: .02366,
18: .14985,
84: .04469,
89: .01315,
90: .01577,
92: .09464,
96: .02629,
97: .00789,
98: .01315,
99: .01052,
100: .02629,
101: .04732,
102: .07624,
103: 1.90077,
_: "79 80 81 83 85 86 87 88 91 93 94 95"
},
E: {
4: 0,
12: .41275,
13: .00526,
14: .00789,
15: .00263,
_: "0 5 6 7 8 9 10 11 3.1 3.2 6.1 7.1 9.1",
5.1: .00526,
10.1: .01315,
11.1: .00263,
12.1: .02629,
13.1: .02103,
14.1: .04469,
15.1: .12093,
"15.2-15.3": .0184,
15.4: .02892,
15.5: .11831,
15.6: .00263,
"16.0": .00263
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": 0,
"6.0-6.1": 0,
"7.0-7.1": .02738,
"8.1-8.4": 0,
"9.0-9.2": 54e-5,
9.3: .01193,
"10.0-10.2": 54e-5,
10.3: .00732,
"11.0-11.2": 0,
"11.3-11.4": .00813,
"12.0-12.1": .00678,
"12.2-12.5": .33155,
"13.0-13.1": .00813,
13.2: .00325,
13.3: .03877,
"13.4-13.7": .05801,
"14.0-14.4": .18841,
"14.5-14.8": .53108,
"15.0-15.1": .16103,
"15.2-15.3": .1792,
15.4: .22528,
15.5: .89137,
"16.0": .01871
},
P: {
4: .29807,
"5.0-5.4": .06167,
"6.2-6.4": .04111,
"7.2-7.4": .25695,
8.2: .07179,
9.2: .22612,
10.1: .02116,
"11.1-11.2": .05139,
"12.0": .02077,
"13.0": .04111,
"14.0": .03083,
"15.0": .03083,
"16.0": .11306,
"17.0": .75031
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: .00144,
"4.2-4.3": .00287,
4.4: 0,
"4.4.3-4.4.4": .07676
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
11: .16826,
_: "6 7 8 9 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
11: .02513,
_: "10"
},
S: {
2.5: .02211
},
R: {
_: "0"
},
M: {
0: .15477
},
Q: {
10.4: 0
},
O: {
0: .44957
},
H: {
0: 13.59205
},
L: {
0: 59.54709
}
};
},
44117: module => {
module.exports = {
C: {
45: .0036,
47: .01439,
51: .0036,
52: .0036,
56: .0036,
60: .0036,
68: .02878,
69: .0072,
72: .03238,
74: .0072,
76: .04318,
78: .03598,
84: .04677,
85: .05037,
87: .0036,
89: .0072,
91: .07556,
92: .0036,
93: .0036,
96: .0036,
97: .0036,
98: .0036,
99: .05037,
100: .05037,
101: .16191,
102: 1.6155,
103: .21228,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 46 48 49 50 53 54 55 57 58 59 61 62 63 64 65 66 67 70 71 73 75 77 79 80 81 82 83 86 88 90 94 95 104 105 3.5 3.6"
},
D: {
19: .0072,
28: .06836,
34: .0072,
40: .0072,
43: .0036,
44: .0072,
47: .0072,
51: .0072,
56: .03958,
57: .0036,
58: .0036,
61: .0072,
62: .0072,
63: .01439,
64: .0072,
66: .0072,
67: .0072,
68: .0036,
69: .0072,
70: .0072,
71: .02159,
72: .0072,
73: .0036,
74: .19789,
75: .02519,
76: .01439,
77: .01439,
78: .03958,
79: .02878,
80: .04677,
81: .01439,
83: .04318,
84: .04677,
85: .02878,
86: .07556,
87: .05397,
88: .02519,
89: .09355,
90: .03598,
91: .04318,
92: .04677,
93: .03238,
94: .07196,
95: .07196,
96: .07916,
97: .07556,
98: .1727,
99: 6.19576,
100: .08635,
101: .16551,
102: .85632,
103: 13.29821,
104: .01079,
105: .02519,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 20 21 22 23 24 25 26 27 29 30 31 32 33 35 36 37 38 39 41 42 45 46 48 49 50 52 53 54 55 59 60 65 106"
},
F: {
57: .01079,
58: .0072,
79: .10074,
82: .0036,
83: .0036,
84: .02519,
85: .20868,
86: .01439,
87: .03238,
88: .80235,
89: .40298,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 80 81 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
12: .01439,
13: .02159,
14: .0072,
15: .0036,
16: .0036,
17: .0072,
18: .07916,
84: .03958,
85: .0036,
89: .01079,
90: .01079,
92: .08635,
96: .01079,
99: .01439,
100: .0036,
101: .01439,
102: .02878,
103: 1.84218,
_: "79 80 81 83 86 87 88 91 93 94 95 97 98"
},
E: {
4: 0,
13: .0072,
14: .02159,
_: "0 5 6 7 8 9 10 11 12 15 3.1 3.2 5.1 6.1 7.1 9.1 10.1 16.0",
11.1: .0072,
12.1: .0072,
13.1: .03238,
14.1: .03598,
15.1: .0072,
"15.2-15.3": .0072,
15.4: .01799,
15.5: .16191,
15.6: .0072
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": .00364,
"6.0-6.1": .00121,
"7.0-7.1": .06247,
"8.1-8.4": 0,
"9.0-9.2": .00303,
9.3: .02426,
"10.0-10.2": 0,
10.3: .01698,
"11.0-11.2": .01031,
"11.3-11.4": 61e-5,
"12.0-12.1": .00667,
"12.2-12.5": .82667,
"13.0-13.1": .00788,
13.2: .00849,
13.3: .07399,
"13.4-13.7": .1862,
"14.0-14.4": .33176,
"14.5-14.8": .7181,
"15.0-15.1": .2335,
"15.2-15.3": .45124,
15.4: .64229,
15.5: 2.28713,
"16.0": .09583
},
P: {
4: .0112,
"5.0-5.4": .0104,
"6.2-6.4": .29967,
"7.2-7.4": .0112,
8.2: .07179,
9.2: .01056,
10.1: .02051,
"11.1-11.2": .02241,
"12.0": .01067,
"13.0": .04481,
"14.0": .0112,
"15.0": .02112,
"16.0": .05602,
"17.0": .42573
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: 63e-5,
"4.2-4.3": .0019,
4.4: 0,
"4.4.3-4.4.4": .02307
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
6: .01112,
11: .05004,
_: "7 8 9 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
11: .02513,
_: "10"
},
S: {
2.5: .04481
},
R: {
_: "0"
},
M: {
0: .16005
},
Q: {
10.4: .0128
},
O: {
0: 1.13315
},
H: {
0: 3.72145
},
L: {
0: 58.62166
}
};
},
41164: module => {
module.exports = {
C: {
78: .00552,
101: .04419,
102: .23201,
103: .01105,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 79 80 81 82 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 99 100 104 105 3.5 3.6"
},
D: {
49: .00829,
63: .00552,
67: .00276,
75: .00552,
77: .01657,
83: .01105,
85: .00276,
87: .00552,
91: .01381,
92: .00552,
96: .00552,
97: .00276,
98: .00552,
99: .00552,
100: .03591,
101: .10219,
102: .45297,
103: 4.93569,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 50 51 52 53 54 55 56 57 58 59 60 61 62 64 65 66 68 69 70 71 72 73 74 76 78 79 80 81 84 86 88 89 90 93 94 95 104 105 106"
},
F: {
86: .00552,
87: .01381,
88: .18782,
89: .01381,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
18: .00552,
99: .00276,
101: .04419,
102: .08286,
103: 1.75111,
_: "12 13 14 15 16 17 79 80 81 83 84 85 86 87 88 89 90 91 92 93 94 95 96 97 98 100"
},
E: {
4: 0,
13: .01381,
14: .09391,
15: .04695,
_: "0 5 6 7 8 9 10 11 12 3.1 3.2 5.1 6.1 7.1 9.1 10.1",
11.1: .00552,
12.1: .03038,
13.1: .22925,
14.1: .35906,
15.1: .08562,
"15.2-15.3": .14086,
15.4: .91146,
15.5: 15.93674,
15.6: .7126,
"16.0": .09115
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": 0,
"6.0-6.1": 0,
"7.0-7.1": 0,
"8.1-8.4": 0,
"9.0-9.2": 0,
9.3: .09006,
"10.0-10.2": 0,
10.3: .02771,
"11.0-11.2": 0,
"11.3-11.4": 0,
"12.0-12.1": .01386,
"12.2-12.5": .10392,
"13.0-13.1": 0,
13.2: 0,
13.3: 0,
"13.4-13.7": 0,
"14.0-14.4": .08313,
"14.5-14.8": .48495,
"15.0-15.1": .33254,
"15.2-15.3": .90062,
15.4: 1.89823,
15.5: 63.40377,
"16.0": .29097
},
P: {
4: .05317,
"5.0-5.4": .0104,
"6.2-6.4": .29967,
"7.2-7.4": .0112,
8.2: .07179,
9.2: .01056,
10.1: .02051,
"11.1-11.2": .02127,
"12.0": .01067,
"13.0": .08507,
"14.0": .0112,
"15.0": .02112,
"16.0": .02127,
"17.0": .86135
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: 0,
"4.2-4.3": 0,
4.4: 0,
"4.4.3-4.4.4": 0
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
11: .0221,
_: "6 7 8 9 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
11: .02513,
_: "10"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: .02895
},
Q: {
10.4: 0
},
O: {
0: 0
},
H: {
0: 0
},
L: {
0: 3.76069
}
};
},
33417: module => {
module.exports = {
C: {
41: .00779,
48: .00779,
51: .01168,
52: .02336,
78: .01168,
81: .00389,
84: .00779,
89: .00389,
91: .00779,
98: .01168,
99: .01558,
100: .01168,
101: .08567,
102: 1.82629,
103: .19859,
104: .00389,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 42 43 44 45 46 47 49 50 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 79 80 82 83 85 86 87 88 90 92 93 94 95 96 97 105 3.5 3.6"
},
D: {
34: .00389,
38: .07009,
47: .03894,
49: .23753,
50: .00389,
55: .01168,
56: .01947,
60: .00389,
62: .02726,
63: .00389,
65: .00779,
67: .00389,
68: .00779,
69: .01168,
70: .00389,
72: .01168,
73: .00779,
74: .00389,
75: .02336,
78: .03505,
79: .25311,
80: .01168,
81: .02336,
83: .02336,
84: .02336,
87: .08177,
88: .01558,
89: .03505,
91: .05452,
92: .09346,
93: .01947,
94: .00389,
95: .02336,
96: .03894,
97: .07399,
98: .03115,
99: .0662,
100: .08567,
101: .13629,
102: 1.04749,
103: 24.02209,
104: .05841,
105: .01947,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 35 36 37 39 40 41 42 43 44 45 46 48 51 52 53 54 57 58 59 61 64 66 71 76 77 85 86 90 106"
},
F: {
28: .02726,
36: .00779,
46: .07788,
79: .01168,
85: .00779,
86: .01947,
87: .01558,
88: .77101,
89: .19859,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 29 30 31 32 33 34 35 37 38 39 40 41 42 43 44 45 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 80 81 82 83 84 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
18: .00779,
97: .00389,
99: .00779,
100: .00779,
101: .02336,
102: .05452,
103: 2.00541,
_: "12 13 14 15 16 17 79 80 81 83 84 85 86 87 88 89 90 91 92 93 94 95 96 98"
},
E: {
4: 0,
10: .00779,
12: .01947,
13: .05062,
14: .16744,
15: .07399,
_: "0 5 6 7 8 9 11 3.1 3.2 5.1 6.1 7.1",
9.1: .20249,
10.1: .01168,
11.1: .02336,
12.1: .09735,
13.1: .24143,
14.1: .40887,
15.1: .12461,
"15.2-15.3": .10124,
15.4: .46339,
15.5: 2.84651,
15.6: .10124,
"16.0": .01558
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": 0,
"6.0-6.1": .00654,
"7.0-7.1": .02288,
"8.1-8.4": .03758,
"9.0-9.2": .01634,
9.3: .28267,
"10.0-10.2": .03431,
10.3: .29738,
"11.0-11.2": .03268,
"11.3-11.4": .00654,
"12.0-12.1": .06209,
"12.2-12.5": .77776,
"13.0-13.1": .01144,
13.2: .01634,
13.3: .03431,
"13.4-13.7": .10457,
"14.0-14.4": .26306,
"14.5-14.8": .6258,
"15.0-15.1": .48691,
"15.2-15.3": .58985,
15.4: 1.21402,
15.5: 11.02258,
"16.0": .04248
},
P: {
4: .52893,
"5.0-5.4": .0104,
"6.2-6.4": .02051,
"7.2-7.4": .05289,
8.2: .07179,
9.2: .01032,
10.1: .02116,
"11.1-11.2": .02116,
"12.0": .02116,
"13.0": .03174,
"14.0": .01058,
"15.0": .03174,
"16.0": .11637,
"17.0": 1.69258
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: 0,
"4.2-4.3": .00698,
4.4: 0,
"4.4.3-4.4.4": .02966
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
11: .03505,
_: "6 7 8 9 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
11: .02513,
_: "10"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: .20764
},
Q: {
10.4: 0
},
O: {
0: 1.64278
},
H: {
0: 2.53239
},
L: {
0: 38.89478
}
};
},
65048: module => {
module.exports = {
C: {
52: .03787,
53: .00379,
56: .00757,
63: .00379,
66: .00379,
68: .00379,
72: .01136,
73: .00379,
78: .01894,
79: .00379,
81: .01136,
83: .00379,
84: .00379,
85: .00379,
86: .00757,
88: .00757,
89: .00757,
91: .02651,
93: .00757,
94: .00379,
95: .00379,
96: .03787,
97: .00757,
98: .01515,
99: .05681,
100: .03787,
101: .19692,
102: 1.99575,
103: .21586,
104: .00379,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 54 55 57 58 59 60 61 62 64 65 67 69 70 71 74 75 76 77 80 82 87 90 92 105 3.5 3.6"
},
D: {
34: .00379,
38: .00757,
41: .00757,
49: .04166,
50: .01894,
53: .00379,
60: .01515,
62: .00757,
63: .00757,
65: .00379,
68: .01515,
69: .0303,
70: .0303,
71: .00379,
72: .01136,
73: .00757,
74: .00757,
75: .00757,
76: .00757,
77: .00379,
78: .00757,
79: .1174,
80: .01894,
81: .02651,
83: .01515,
84: .01894,
85: .04544,
86: .02272,
87: .05681,
88: .02272,
89: .03408,
90: .02272,
91: 1.0793,
92: .06438,
93: .02272,
94: .02651,
95: .0303,
96: .06817,
97: .07953,
98: .06059,
99: .08331,
100: .13633,
101: .15905,
102: .92024,
103: 24.11183,
104: .00757,
105: .01136,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 35 36 37 39 40 42 43 44 45 46 47 48 51 52 54 55 56 57 58 59 61 64 66 67 106"
},
F: {
28: .03408,
79: .00757,
82: .00379,
84: .00379,
85: .02272,
86: .00757,
87: .0303,
88: 1.21941,
89: .39006,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 80 81 83 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
17: .01515,
18: .02272,
84: .00757,
89: .00379,
91: .00379,
92: .01136,
96: .00757,
97: .00379,
98: .00379,
99: .00757,
100: .01894,
101: .02272,
102: .0303,
103: 1.7761,
_: "12 13 14 15 16 79 80 81 83 85 86 87 88 90 93 94 95"
},
E: {
4: 0,
13: .00757,
14: .11361,
15: .00757,
_: "0 5 6 7 8 9 10 11 12 3.1 3.2 6.1 7.1 9.1 10.1",
5.1: .00379,
11.1: .01136,
12.1: .00379,
13.1: .03408,
14.1: .04923,
15.1: .00757,
"15.2-15.3": .01136,
15.4: .04166,
15.5: .29917,
15.6: .01515,
"16.0": .00757
},
G: {
8: 31e-5,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": .00214,
"6.0-6.1": 61e-5,
"7.0-7.1": .0095,
"8.1-8.4": 92e-5,
"9.0-9.2": .00521,
9.3: .01593,
"10.0-10.2": 61e-5,
10.3: .01133,
"11.0-11.2": .0046,
"11.3-11.4": .00337,
"12.0-12.1": .00123,
"12.2-12.5": .11426,
"13.0-13.1": .00184,
13.2: .00184,
13.3: .0049,
"13.4-13.7": .0291,
"14.0-14.4": .1691,
"14.5-14.8": .17584,
"15.0-15.1": .04901,
"15.2-15.3": .0772,
15.4: .14674,
15.5: 2.15447,
"16.0": .02083
},
P: {
4: .36922,
"5.0-5.4": .0104,
"6.2-6.4": .02051,
"7.2-7.4": .47178,
8.2: .07179,
9.2: .02051,
10.1: .02051,
"11.1-11.2": .13333,
"12.0": .03077,
"13.0": .11282,
"14.0": .11282,
"15.0": .07179,
"16.0": .35896,
"17.0": 2.35891
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: .00407,
"4.2-4.3": .02171,
4.4: 0,
"4.4.3-4.4.4": .09227
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
11: .05681,
_: "6 7 8 9 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
11: .02513,
_: "10"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: .12426
},
Q: {
10.4: 0
},
O: {
0: .21746
},
H: {
0: .48233
},
L: {
0: 55.67376
}
};
},
39093: module => {
module.exports = {
C: {
47: .00447,
52: .01786,
68: .00893,
72: .00447,
78: .0268,
79: .00893,
80: .00447,
81: .00447,
88: .00893,
89: .00447,
90: .00447,
91: .06699,
94: .03573,
95: .00447,
96: .00447,
97: .0134,
98: .00447,
99: .02233,
100: .01786,
101: .08039,
102: 1.43805,
103: .1965,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 48 49 50 51 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 69 70 71 73 74 75 76 77 82 83 84 85 86 87 92 93 104 105 3.5 3.6"
},
D: {
38: .00893,
41: .00447,
47: .00893,
49: .02233,
51: .0134,
53: .00447,
55: .00893,
58: .00447,
63: .00893,
65: .00447,
67: .00447,
68: .00893,
69: .01786,
70: .00893,
71: .00447,
72: .00893,
74: .0134,
75: .01786,
76: .0268,
77: .00893,
78: .0134,
79: .09379,
80: .02233,
81: .04913,
83: .04466,
84: .08039,
85: .06699,
86: .07592,
87: .08932,
88: .02233,
89: .04466,
90: .04019,
91: .76369,
92: .03573,
93: .03126,
94: .0268,
95: .02233,
96: .06252,
97: .05359,
98: .05359,
99: .10718,
100: .14738,
101: .2099,
102: 1.09417,
103: 29.30589,
104: .06252,
105: .0134,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 39 40 42 43 44 45 46 48 50 52 54 56 57 59 60 61 62 64 66 73 106"
},
F: {
36: .00447,
82: .00893,
85: .02233,
86: .0134,
87: .08485,
88: 2.94756,
89: .67437,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 83 84 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
15: .05806,
16: .00447,
18: .0134,
84: .00447,
92: .0134,
96: .00447,
99: .00447,
100: .00893,
101: .09379,
102: .05359,
103: 3.35843,
_: "12 13 14 17 79 80 81 83 85 86 87 88 89 90 91 93 94 95 97 98"
},
E: {
4: 0,
13: .00893,
14: .02233,
15: .00893,
_: "0 5 6 7 8 9 10 11 12 3.1 3.2 5.1 6.1 7.1 10.1",
9.1: .01786,
11.1: .00447,
12.1: .00893,
13.1: .04913,
14.1: .07592,
15.1: .01786,
"15.2-15.3": .01786,
15.4: .05806,
15.5: .33048,
15.6: .02233,
"16.0": .00447
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": .00217,
"6.0-6.1": 0,
"7.0-7.1": .00145,
"8.1-8.4": 0,
"9.0-9.2": 72e-5,
9.3: .02899,
"10.0-10.2": 72e-5,
10.3: .03769,
"11.0-11.2": .00507,
"11.3-11.4": .0145,
"12.0-12.1": .00797,
"12.2-12.5": .19207,
"13.0-13.1": .0058,
13.2: .00435,
13.3: .01595,
"13.4-13.7": .07321,
"14.0-14.4": .16163,
"14.5-14.8": .57405,
"15.0-15.1": .0993,
"15.2-15.3": .18555,
15.4: .36313,
15.5: 5.26788,
"16.0": .04131
},
P: {
4: .10318,
"5.0-5.4": .0104,
"6.2-6.4": .02051,
"7.2-7.4": .21669,
8.2: .07179,
9.2: .01032,
10.1: .02051,
"11.1-11.2": .05159,
"12.0": .01032,
"13.0": .05159,
"14.0": .06191,
"15.0": .03096,
"16.0": .12382,
"17.0": 1.92954
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: .00377,
"4.2-4.3": .01006,
4.4: 0,
"4.4.3-4.4.4": .04151
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
8: .00462,
9: .01848,
11: .11088,
_: "6 7 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
11: .02513,
_: "10"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: .14388
},
Q: {
10.4: 0
},
O: {
0: .09961
},
H: {
0: .22005
},
L: {
0: 44.41452
}
};
},
7851: module => {
module.exports = {
C: {
47: .01707,
48: .0384,
52: .01707,
67: .00427,
78: .02134,
91: .03414,
95: .09814,
96: .00853,
97: .00427,
100: .0128,
101: .11521,
102: .93447,
103: .08534,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 49 50 51 53 54 55 56 57 58 59 60 61 62 63 64 65 66 68 69 70 71 72 73 74 75 76 77 79 80 81 82 83 84 85 86 87 88 89 90 92 93 94 98 99 104 105 3.5 3.6"
},
D: {
49: .16215,
56: .00853,
63: .00427,
65: .02987,
68: .00853,
69: .0128,
71: .00853,
75: .06827,
76: .28162,
77: .0128,
78: .01707,
79: .01707,
81: .00427,
83: .04267,
84: .00853,
86: .00853,
87: .0256,
88: .00853,
90: .02987,
91: .04694,
92: .0128,
93: .17921,
94: .0128,
95: .00427,
96: .04267,
97: .11521,
98: .0256,
99: .0384,
100: .10241,
101: .26882,
102: 1.76654,
103: 16.53036,
104: .02134,
105: .00853,
106: .00427,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 50 51 52 53 54 55 57 58 59 60 61 62 64 66 67 70 72 73 74 80 85 89"
},
F: {
87: .0128,
88: .28589,
89: .09814,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 85 86 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
12: .00427,
13: .00427,
15: .00427,
16: .02134,
17: .02134,
18: .02987,
96: .02987,
97: .01707,
98: .00427,
99: .00853,
100: .00853,
101: .05974,
102: .24749,
103: 6.61812,
_: "14 79 80 81 83 84 85 86 87 88 89 90 91 92 93 94 95"
},
E: {
4: 0,
13: .02987,
14: .13654,
15: .07254,
_: "0 5 6 7 8 9 10 11 12 3.1 3.2 5.1 6.1 7.1 9.1",
10.1: .00853,
11.1: .02134,
12.1: .13654,
13.1: .55471,
14.1: .60591,
15.1: .19202,
"15.2-15.3": .18775,
15.4: .64432,
15.5: 4.16886,
15.6: .15361,
"16.0": .02134
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": 0,
"6.0-6.1": 0,
"7.0-7.1": 0,
"8.1-8.4": 0,
"9.0-9.2": 0,
9.3: .08203,
"10.0-10.2": 0,
10.3: .09052,
"11.0-11.2": .03677,
"11.3-11.4": .01697,
"12.0-12.1": .0198,
"12.2-12.5": .41299,
"13.0-13.1": .01131,
13.2: 0,
13.3: .0396,
"13.4-13.7": .09052,
"14.0-14.4": .34793,
"14.5-14.8": 1.28705,
"15.0-15.1": .44693,
"15.2-15.3": 1.13147,
15.4: 2.16111,
15.5: 21.61397,
"16.0": .08486
},
P: {
4: .05132,
"5.0-5.4": .0104,
"6.2-6.4": .04102,
"7.2-7.4": .29766,
8.2: .07179,
9.2: .06158,
10.1: .02051,
"11.1-11.2": .26687,
"12.0": .05132,
"13.0": .28739,
"14.0": .26687,
"15.0": .06158,
"16.0": .22581,
"17.0": 4.57778
},
I: {
0: 0,
3: 0,
4: .00328,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: 0,
"4.2-4.3": 0,
4.4: 0,
"4.4.3-4.4.4": .05405
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
11: .14081,
_: "6 7 8 9 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
11: .02513,
_: "10"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: .09173
},
Q: {
10.4: 0
},
O: {
0: .01147
},
H: {
0: .05428
},
L: {
0: 29.17221
}
};
},
55096: module => {
module.exports = {
C: {
44: .00803,
52: .00536,
76: .00268,
78: .01875,
84: .00803,
88: .00268,
91: .00803,
94: .00268,
95: .00803,
96: .01071,
99: .1098,
100: .00803,
101: .07498,
102: .69092,
103: .09373,
104: .00536,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 45 46 47 48 49 50 51 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75 77 79 80 81 82 83 85 86 87 89 90 92 93 97 98 105 3.5 3.6"
},
D: {
43: .05624,
49: .03481,
53: .00803,
58: .01071,
65: .05892,
66: .00536,
67: .02678,
69: .00268,
73: .00536,
77: .0241,
78: .00803,
79: .00268,
80: .00536,
81: .02142,
84: .00268,
86: .01071,
87: .04285,
88: .01071,
89: .00536,
90: .02142,
91: .01339,
92: .0241,
94: .01607,
95: .01875,
96: .02678,
97: .00803,
98: .06427,
99: .04017,
100: .15265,
101: .14997,
102: .79804,
103: 18.6121,
104: .10444,
105: .12319,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 44 45 46 47 48 50 51 52 54 55 56 57 59 60 61 62 63 64 68 70 71 72 74 75 76 83 85 93 106"
},
F: {
46: .00268,
85: .00268,
87: .00536,
88: .10712,
89: .11248,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 86 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
12: .00268,
13: .00536,
16: .00536,
18: .01339,
84: .01071,
85: .00268,
87: .00536,
89: .00268,
91: .00536,
92: .02142,
93: .01071,
94: .01607,
95: .01339,
96: .01339,
97: .00536,
98: .01071,
100: .01607,
101: .08302,
102: .09373,
103: 1.70321,
_: "14 15 17 79 80 81 83 86 88 90 99"
},
E: {
4: 0,
12: .00268,
13: .01607,
14: .01607,
15: .0241,
_: "0 5 6 7 8 9 10 11 3.1 3.2 5.1 6.1 7.1 10.1 16.0",
9.1: .00536,
11.1: .00536,
12.1: .00803,
13.1: .10444,
14.1: .13122,
15.1: .00536,
"15.2-15.3": .01071,
15.4: .05892,
15.5: .40706,
15.6: .01071
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": 0,
"6.0-6.1": 0,
"7.0-7.1": .00379,
"8.1-8.4": 0,
"9.0-9.2": 0,
9.3: .01325,
"10.0-10.2": 0,
10.3: .01325,
"11.0-11.2": .00379,
"11.3-11.4": .00473,
"12.0-12.1": .04448,
"12.2-12.5": .35772,
"13.0-13.1": .01703,
13.2: .00852,
13.3: .06246,
"13.4-13.7": .16277,
"14.0-14.4": .66908,
"14.5-14.8": .87254,
"15.0-15.1": .44573,
"15.2-15.3": .58864,
15.4: .95582,
15.5: 5.01192,
"16.0": .02555
},
P: {
4: .20336,
"5.0-5.4": .0104,
"6.2-6.4": .29967,
"7.2-7.4": .07118,
8.2: .07179,
9.2: .02034,
10.1: .02051,
"11.1-11.2": .04067,
"12.0": .01067,
"13.0": .13218,
"14.0": .06101,
"15.0": .08134,
"16.0": .15252,
"17.0": .85412
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: 0,
"4.2-4.3": 0,
4.4: 0,
"4.4.3-4.4.4": .01464
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
11: .01071,
_: "6 7 8 9 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
11: .02513,
_: "10"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: .06589
},
Q: {
10.4: 0
},
O: {
0: 1.44224
},
H: {
0: .50597
},
L: {
0: 62.1882
}
};
},
42726: module => {
module.exports = {
C: {
11: .02294,
34: .01529,
47: .03058,
52: .01912,
60: .01529,
68: .00382,
72: .01912,
78: .00765,
81: .02676,
91: .11087,
94: .02294,
96: .01147,
99: .01529,
100: .02676,
101: .1988,
102: 1.73564,
103: .18733,
104: .00382,
_: "2 3 4 5 6 7 8 9 10 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 35 36 37 38 39 40 41 42 43 44 45 46 48 49 50 51 53 54 55 56 57 58 59 61 62 63 64 65 66 67 69 70 71 73 74 75 76 77 79 80 82 83 84 85 86 87 88 89 90 92 93 95 97 98 105 3.5 3.6"
},
D: {
38: .01147,
43: .01529,
49: .04205,
53: .00382,
57: .01147,
60: .00382,
61: .00382,
62: .01147,
63: .00382,
65: .00765,
67: .00765,
69: .00765,
70: .00382,
71: .00765,
74: .02676,
77: .00765,
78: .01912,
79: .04588,
80: .03058,
81: .01912,
83: .03441,
84: .00765,
85: .00765,
86: .03441,
87: .03441,
88: .01147,
89: .03441,
90: .02294,
91: .02676,
92: .02676,
93: .03441,
94: .01529,
95: .04205,
96: .05735,
97: .06881,
98: .03441,
99: .0994,
100: .09558,
101: .28673,
102: 1.54067,
103: 20.37659,
104: .01529,
105: .00382,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 39 40 41 42 44 45 46 47 48 50 51 52 54 55 56 58 59 64 66 68 72 73 75 76 106"
},
F: {
28: .00765,
82: .00765,
83: .00382,
84: .00765,
85: .00765,
86: .01529,
87: .04205,
88: .54669,
89: .41671,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
12: .02294,
13: .01912,
14: .03058,
15: .03058,
16: .01529,
17: .01912,
18: .06117,
84: .03823,
85: .01147,
88: .01147,
89: .01147,
90: .00765,
92: .02676,
95: .00765,
96: .01912,
97: .00382,
98: .02294,
99: .01529,
100: .03058,
101: .06881,
102: .17204,
103: 3.71213,
_: "79 80 81 83 86 87 91 93 94"
},
E: {
4: 0,
13: .00765,
14: .04205,
15: .02294,
_: "0 5 6 7 8 9 10 11 12 3.1 3.2 5.1 6.1 7.1 9.1 10.1 16.0",
11.1: .02676,
12.1: .00765,
13.1: .06881,
14.1: .11087,
15.1: .01912,
"15.2-15.3": .07646,
15.4: .07646,
15.5: .48934,
15.6: .01529
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": .00851,
"6.0-6.1": .00179,
"7.0-7.1": .02912,
"8.1-8.4": .00179,
"9.0-9.2": 45e-5,
9.3: .03987,
"10.0-10.2": 0,
10.3: .02195,
"11.0-11.2": .00134,
"11.3-11.4": .00493,
"12.0-12.1": .00672,
"12.2-12.5": .41836,
"13.0-13.1": .00806,
13.2: .01523,
13.3: .05062,
"13.4-13.7": .06137,
"14.0-14.4": .11646,
"14.5-14.8": .19037,
"15.0-15.1": .11691,
"15.2-15.3": .14468,
15.4: .39328,
15.5: 2.70951,
"16.0": .06361
},
P: {
4: .30608,
"5.0-5.4": .0104,
"6.2-6.4": .02051,
"7.2-7.4": .43872,
8.2: .07179,
9.2: .0102,
10.1: .02051,
"11.1-11.2": .08162,
"12.0": .02041,
"13.0": .08162,
"14.0": .11223,
"15.0": .06122,
"16.0": .30608,
"17.0": 1.71406
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: 33e-5,
"4.2-4.3": .00133,
4.4: 0,
"4.4.3-4.4.4": .02923
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
9: .00765,
11: .14145,
_: "6 7 8 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
11: .02513,
_: "10"
},
S: {
2.5: .03089
},
R: {
_: "0"
},
M: {
0: .16681
},
Q: {
10.4: .01236
},
O: {
0: .95141
},
H: {
0: .90074
},
L: {
0: 57.64768
}
};
},
90785: module => {
module.exports = {
C: {
50: .04699,
52: .17856,
55: .0094,
65: .0235,
68: .0094,
72: .0047,
78: .0235,
80: .0094,
81: .0141,
82: .0047,
84: .0188,
86: .0094,
88: .04699,
89: .0235,
91: .09868,
94: .0047,
95: .0235,
96: .02819,
97: .07049,
98: .04229,
99: .0188,
100: .14097,
101: .15037,
102: 2.12395,
103: .22085,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 51 53 54 56 57 58 59 60 61 62 63 64 66 67 69 70 71 73 74 75 76 77 79 83 85 87 90 92 93 104 105 3.5 3.6"
},
D: {
22: .0141,
38: .03759,
49: .10338,
51: .0094,
53: .08458,
55: .0047,
61: .0141,
63: .0047,
68: .0047,
69: .17856,
70: .0094,
71: .0141,
72: .0047,
73: .0141,
74: .03289,
75: .0047,
77: .0094,
78: .0094,
79: .05169,
80: .03759,
81: .0235,
83: .04229,
84: .11278,
85: .06109,
86: .14567,
87: .16916,
88: .05639,
89: .07049,
90: .05639,
91: .04699,
92: .12687,
93: .0141,
94: .0141,
95: .03759,
96: .06109,
97: .09398,
98: .05639,
99: .12687,
100: .24905,
101: .4746,
102: 1.28283,
103: 20.24329,
104: .0094,
105: .0094,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 39 40 41 42 43 44 45 46 47 48 50 52 54 56 57 58 59 60 62 64 65 66 67 76 106"
},
F: {
36: .10808,
43: .0047,
49: .0094,
67: .0047,
68: .0188,
69: .0094,
78: .0047,
79: .04699,
80: .0047,
81: .0141,
82: .0235,
83: .0188,
84: .02819,
85: .27724,
86: .04229,
87: .19266,
88: 4.26669,
89: 1.97828,
90: .0094,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 37 38 39 40 41 42 44 45 46 47 48 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 70 71 72 73 74 75 76 77 9.5-9.6 10.5 10.6 11.1 11.5 11.6",
"10.0-10.1": 0,
12.1: .0188
},
B: {
18: .0188,
86: .0094,
99: .03289,
101: .03289,
102: .05169,
103: 1.77622,
_: "12 13 14 15 16 17 79 80 81 83 84 85 87 88 89 90 91 92 93 94 95 96 97 98 100"
},
E: {
4: 0,
13: .03759,
14: .05169,
15: .0141,
_: "0 5 6 7 8 9 10 11 12 3.1 3.2 6.1 7.1 9.1",
5.1: .11748,
10.1: .0094,
11.1: .0188,
12.1: .0094,
13.1: .05639,
14.1: .09398,
15.1: .05639,
"15.2-15.3": .06579,
15.4: .22555,
15.5: 2.65494,
15.6: .12217,
"16.0": .0188
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": 0,
"6.0-6.1": 0,
"7.0-7.1": .00168,
"8.1-8.4": 0,
"9.0-9.2": .00168,
9.3: .03875,
"10.0-10.2": .01179,
10.3: .03033,
"11.0-11.2": .01179,
"11.3-11.4": .00674,
"12.0-12.1": .0219,
"12.2-12.5": .23924,
"13.0-13.1": .00842,
13.2: .00674,
13.3: .03033,
"13.4-13.7": .12467,
"14.0-14.4": .29147,
"14.5-14.8": .50375,
"15.0-15.1": .27799,
"15.2-15.3": .57114,
15.4: 1.01087,
15.5: 13.15817,
"16.0": .07413
},
P: {
4: .02141,
"5.0-5.4": .0104,
"6.2-6.4": .29967,
"7.2-7.4": .0107,
8.2: .07179,
9.2: .01044,
10.1: .02051,
"11.1-11.2": .0107,
"12.0": .05351,
"13.0": .03211,
"14.0": .03211,
"15.0": .0107,
"16.0": .07492,
"17.0": 1.08096
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: .0022,
"4.2-4.3": .00315,
4.4: 0,
"4.4.3-4.4.4": .02644
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
8: .02888,
9: .00963,
11: .15885,
_: "6 7 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
11: .02513,
_: "10"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: .15897
},
Q: {
10.4: 0
},
O: {
0: .17487
},
H: {
0: 1.31941
},
L: {
0: 31.99104
}
};
},
59959: module => {
module.exports = {
C: {
52: .00381,
71: .00381,
78: .00381,
81: .45315,
91: .01904,
93: .02285,
95: .00381,
99: .01523,
100: .01142,
101: .05331,
102: .91392,
103: .10282,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 72 73 74 75 76 77 79 80 82 83 84 85 86 87 88 89 90 92 94 96 97 98 104 105 3.5 3.6"
},
D: {
40: .19802,
49: .0495,
53: .00381,
65: .00381,
68: .00762,
70: .00762,
73: .00381,
74: .01523,
75: .03046,
76: .16374,
77: .00762,
79: .02285,
81: .01142,
83: .00762,
84: .03427,
85: .00762,
86: .01904,
87: .01142,
91: .02285,
92: .01523,
93: .19802,
94: .00762,
95: .02666,
96: .02285,
97: .05331,
98: .01142,
99: .02285,
100: .54835,
101: 2.87504,
102: 1.37469,
103: 15.66992,
104: .01142,
105: .00381,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 41 42 43 44 45 46 47 48 50 51 52 54 55 56 57 58 59 60 61 62 63 64 66 67 69 71 72 78 80 88 89 90 106"
},
F: {
28: .01523,
78: .00762,
79: .00381,
86: .01523,
87: .01523,
88: .73875,
89: .92154,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 80 81 82 83 84 85 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
12: .00381,
15: .00381,
17: .00762,
18: .01142,
89: .00381,
92: .00762,
93: .03046,
101: .06854,
102: .11043,
103: 3.07686,
_: "13 14 16 79 80 81 83 84 85 86 87 88 90 91 94 95 96 97 98 99 100"
},
E: {
4: 0,
12: .00762,
13: .01523,
14: .12186,
15: .01904,
_: "0 5 6 7 8 9 10 11 3.1 3.2 5.1 6.1 7.1 9.1 10.1",
11.1: .01142,
12.1: .06093,
13.1: .22848,
14.1: .11043,
15.1: .20944,
"15.2-15.3": .11424,
15.4: 1.44323,
15.5: 4.19642,
15.6: .20944,
"16.0": .03427
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": .00823,
"6.0-6.1": 0,
"7.0-7.1": 0,
"8.1-8.4": .0247,
"9.0-9.2": .0247,
9.3: .13722,
"10.0-10.2": 0,
10.3: .26894,
"11.0-11.2": 0,
"11.3-11.4": .18661,
"12.0-12.1": 0,
"12.2-12.5": .59552,
"13.0-13.1": .00549,
13.2: 0,
13.3: .08507,
"13.4-13.7": .04116,
"14.0-14.4": .14819,
"14.5-14.8": .5818,
"15.0-15.1": .50496,
"15.2-15.3": 1.46273,
15.4: 3.33162,
15.5: 19.45457,
"16.0": .13996
},
P: {
4: .11614,
"5.0-5.4": .0104,
"6.2-6.4": .29967,
"7.2-7.4": .15837,
8.2: .07179,
9.2: .01056,
10.1: .02051,
"11.1-11.2": .05279,
"12.0": .01067,
"13.0": .04223,
"14.0": .12669,
"15.0": .02112,
"16.0": .10558,
"17.0": 2.2277
},
I: {
0: 0,
3: 0,
4: .00443,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: .00104,
"4.2-4.3": .0013,
4.4: 0,
"4.4.3-4.4.4": .01799
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
11: .03046,
_: "6 7 8 9 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
11: .02513,
_: "10"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: .06812
},
Q: {
10.4: 0
},
O: {
0: .22914
},
H: {
0: .04691
},
L: {
0: 34.03431
}
};
},
22040: module => {
module.exports = {
C: {
38: .01619,
43: .01619,
44: .07014,
45: .01619,
48: .0054,
50: .0054,
51: .0054,
52: .04856,
53: .0054,
54: .0054,
55: .0054,
56: .0054,
57: .02158,
66: .01079,
68: .01079,
70: .01079,
78: .06474,
80: .0054,
81: .01079,
82: .0054,
83: .0054,
84: .01079,
87: .01079,
88: .01079,
89: .0054,
90: .0054,
91: .05935,
92: .0054,
94: .0054,
95: .0054,
96: .01619,
97: .01079,
98: .01079,
99: .02698,
100: .03237,
101: .23199,
102: 3.00502,
103: .36147,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 39 40 41 42 46 47 49 58 59 60 61 62 63 64 65 67 69 71 72 73 74 75 76 77 79 85 86 93 104 105 3.5 3.6"
},
D: {
38: .0054,
47: .02158,
48: .18883,
49: .12409,
59: .0054,
60: .05935,
63: .0054,
65: .02158,
66: .01079,
67: .01619,
68: .01079,
69: .05395,
70: .0054,
72: .01619,
74: .01619,
75: .01079,
76: .03237,
77: .01079,
78: .01619,
79: .09172,
80: .05935,
81: .03777,
83: .24817,
84: .08632,
85: .07553,
86: .07553,
87: .13488,
88: .02158,
89: .02158,
90: .01619,
91: .04316,
92: .03237,
93: .09172,
94: .04316,
95: .01619,
96: .1079,
97: .09711,
98: .16185,
99: .12948,
100: .28594,
101: .49634,
102: 2.25511,
103: 26.45708,
104: .03237,
105: .01079,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 39 40 41 42 43 44 45 46 50 51 52 53 54 55 56 57 58 61 62 64 71 73 106"
},
F: {
52: .0054,
85: .0054,
86: .0054,
87: .03237,
88: .51253,
89: .18883,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 53 54 55 56 57 58 60 62 63 64 65 66 67 68 69 70 71 72 73 74 75 76 77 78 79 80 81 82 83 84 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
12: .0054,
13: .0054,
15: .01079,
16: .01079,
18: .01619,
85: .01079,
86: .0054,
92: .0054,
96: .01079,
97: .01079,
98: .0054,
99: .01079,
100: .01619,
101: .12948,
102: .24817,
103: 7.18075,
_: "14 17 79 80 81 83 84 87 88 89 90 91 93 94 95"
},
E: {
4: 0,
8: .01079,
9: .02698,
12: .0054,
13: .06474,
14: .24278,
15: .07014,
_: "0 5 6 7 10 11 3.1 3.2 5.1 6.1 7.1",
9.1: .02158,
10.1: .03237,
11.1: .06474,
12.1: .11869,
13.1: .50174,
14.1: .81465,
15.1: .12948,
"15.2-15.3": .14027,
15.4: .57187,
15.5: 4.32679,
15.6: .19422,
"16.0": .02158
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": .00244,
"6.0-6.1": .00244,
"7.0-7.1": .00974,
"8.1-8.4": .01705,
"9.0-9.2": .01218,
9.3: .18753,
"10.0-10.2": .01218,
10.3: .16805,
"11.0-11.2": .03166,
"11.3-11.4": .04627,
"12.0-12.1": .03166,
"12.2-12.5": .86458,
"13.0-13.1": .02435,
13.2: .01218,
13.3: .06332,
"13.4-13.7": .2265,
"14.0-14.4": .53093,
"14.5-14.8": 1.85581,
"15.0-15.1": .44082,
"15.2-15.3": .6868,
15.4: 1.24208,
15.5: 17.29656,
"16.0": .09742
},
P: {
4: .1297,
"5.0-5.4": .02109,
"6.2-6.4": .01054,
"7.2-7.4": .10543,
8.2: .05271,
9.2: .04217,
10.1: .02162,
"11.1-11.2": .05271,
"12.0": .01054,
"13.0": .04323,
"14.0": .02162,
"15.0": .02162,
"16.0": .10808,
"17.0": 3.19922
},
I: {
0: 0,
3: 0,
4: .00156,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: 78e-5,
"4.2-4.3": .00469,
4.4: 0,
"4.4.3-4.4.4": .0344
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
8: .01164,
9: .03491,
11: .25018,
_: "6 7 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
11: .02513,
_: "10"
},
S: {
2.5: 0
},
R: {
_: "0"
},
M: {
0: .49263
},
Q: {
10.4: 0
},
O: {
0: .09668
},
H: {
0: .1482
},
L: {
0: 18.39235
}
};
},
68653: module => {
module.exports = {
C: {
30: .00169,
43: .00337,
47: .00674,
49: .00169,
52: .00506,
56: .00169,
57: .00169,
58: .01011,
63: .00337,
64: .00169,
65: .00337,
69: .00169,
72: .00674,
76: .00169,
78: .00506,
88: .00337,
89: .00337,
90: .00337,
91: .01685,
95: .00506,
96: .00506,
98: .00169,
99: .0118,
100: .00843,
101: .07583,
102: .63356,
103: .08088,
104: .00169,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 31 32 33 34 35 36 37 38 39 40 41 42 44 45 46 48 50 51 53 54 55 59 60 61 62 66 67 68 70 71 73 74 75 77 79 80 81 82 83 84 85 86 87 92 93 94 97 105 3.5 3.6"
},
D: {
11: .01348,
18: .00506,
22: .00169,
25: .00169,
29: .00506,
33: .00169,
35: .00337,
37: .00337,
43: .00337,
49: .00506,
55: .00169,
57: .00169,
58: .00169,
63: .00169,
64: .00337,
65: .00337,
67: .00169,
69: .00337,
70: .00506,
74: .00506,
75: .00506,
76: .00169,
77: .00674,
79: .02191,
80: .00674,
81: .00843,
83: .00337,
84: .00506,
85: .00506,
86: .02022,
87: .00674,
88: .01517,
89: .01011,
90: .01348,
91: .00506,
92: .02191,
93: .00674,
94: .01348,
95: .01517,
96: .0118,
97: .0118,
98: .0337,
99: .03707,
100: .03202,
101: .06572,
102: .38418,
103: 4.0103,
104: .00169,
105: .00337,
_: "4 5 6 7 8 9 10 12 13 14 15 16 17 19 20 21 23 24 26 27 28 30 31 32 34 36 38 39 40 41 42 44 45 46 47 48 50 51 52 53 54 56 59 60 61 62 66 68 71 72 73 78 106"
},
F: {
34: .00169,
40: .00169,
42: .00506,
47: .00337,
49: .00843,
65: .00674,
79: .04887,
80: .00843,
81: .00337,
82: .00337,
83: .00337,
84: .01348,
85: .02022,
86: .0337,
87: .01685,
88: .23422,
89: .16682,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 35 36 37 38 39 41 43 44 45 46 48 50 51 52 53 54 55 56 57 58 60 62 63 64 66 67 68 69 70 71 72 73 74 75 76 77 78 90 9.5-9.6 10.5 10.6 11.1 11.5 11.6",
"10.0-10.1": 0,
12.1: .00506
},
B: {
12: .06909,
13: .01685,
14: .01011,
15: .03539,
16: .00674,
17: .02865,
18: .06403,
84: .02191,
85: .01011,
89: .02359,
90: .01517,
92: .03707,
95: .00169,
96: .00843,
97: .00169,
98: .00674,
99: .01011,
100: .01348,
101: .02528,
102: .09436,
103: 1.0447,
_: "79 80 81 83 86 87 88 91 93 94"
},
E: {
4: 0,
12: .00169,
13: .00337,
14: .01517,
_: "0 5 6 7 8 9 10 11 15 3.1 3.2 5.1 6.1 7.1 9.1 10.1 16.0",
11.1: .00169,
12.1: .00506,
13.1: .04718,
14.1: .03539,
15.1: .00169,
"15.2-15.3": .00337,
15.4: .02191,
15.5: .11121,
15.6: .00337
},
G: {
8: 0,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": 7e-4,
"6.0-6.1": 0,
"7.0-7.1": .01682,
"8.1-8.4": 0,
"9.0-9.2": 0,
9.3: .02873,
"10.0-10.2": 7e-4,
10.3: .1093,
"11.0-11.2": .04764,
"11.3-11.4": .0042,
"12.0-12.1": .02733,
"12.2-12.5": 1.56734,
"13.0-13.1": .03713,
13.2: .04134,
13.3: .24382,
"13.4-13.7": .14293,
"14.0-14.4": .58434,
"14.5-14.8": .76931,
"15.0-15.1": .72237,
"15.2-15.3": .58224,
15.4: .57103,
15.5: 1.36346,
"16.0": .04905
},
P: {
4: .22949,
"5.0-5.4": .02186,
"6.2-6.4": .01093,
"7.2-7.4": .14207,
8.2: .05271,
9.2: .04371,
10.1: .25764,
"11.1-11.2": .02186,
"12.0": .01031,
"13.0": .03278,
"14.0": .04371,
"15.0": .01093,
"16.0": .0765,
"17.0": .51363
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: .00406,
"4.2-4.3": .01697,
4.4: 0,
"4.4.3-4.4.4": .08707
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
11: .08425,
_: "6 7 8 9 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
11: .02513,
_: "10"
},
S: {
2.5: .06652
},
R: {
_: "0"
},
M: {
0: .08315
},
Q: {
10.4: .04158
},
O: {
0: .98949
},
H: {
0: 28.36319
},
L: {
0: 51.97172
}
};
},
81603: module => {
module.exports = {
C: {
3: .0038,
42: .00759,
43: .01139,
45: .0038,
50: .00569,
59: .01329,
60: .01139,
65: .00949,
72: .00759,
91: .08731,
99: .00759,
100: .00949,
101: .0911,
102: .63393,
103: .11198,
_: "2 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 44 46 47 48 49 51 52 53 54 55 56 57 58 61 62 63 64 66 67 68 69 70 71 73 74 75 76 77 78 79 80 81 82 83 84 85 86 87 88 89 90 92 93 94 95 96 97 98 104 105 3.5 3.6"
},
D: {
34: .01518,
38: .00949,
52: .00949,
55: .00569,
56: .0038,
69: .00569,
77: .01708,
80: .01329,
83: .02657,
84: .0038,
86: .14235,
87: .01329,
88: .00759,
91: .00759,
93: .00759,
94: .00569,
96: .0038,
98: .02467,
99: .01139,
100: .01139,
101: .01898,
102: .22207,
103: 8.37777,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 35 36 37 39 40 41 42 43 44 45 46 47 48 49 50 51 53 54 57 58 59 60 61 62 63 64 65 66 67 68 70 71 72 73 74 75 76 78 79 81 85 89 90 92 95 97 104 105 106"
},
F: {
66: .00949,
67: .0038,
79: .07972,
83: .00759,
85: .03227,
86: .01139,
87: .07592,
88: .17082,
89: .21258,
90: .00569,
_: "9 11 12 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 60 62 63 64 65 68 69 70 71 72 73 74 75 76 77 78 80 81 82 84 9.5-9.6 10.5 10.6 11.1 11.5 11.6 12.1",
"10.0-10.1": 0
},
B: {
12: .01898,
13: .03606,
14: .03227,
16: .02278,
17: .04745,
18: .08351,
84: .04935,
89: .00949,
90: .01329,
92: .03986,
95: .01898,
98: .01708,
99: .03227,
100: .00569,
101: .04555,
102: .14994,
103: 1.135,
_: "15 79 80 81 83 85 86 87 88 91 93 94 96 97"
},
E: {
4: 0,
14: .0038,
_: "0 5 6 7 8 9 10 11 12 13 15 3.1 3.2 5.1 6.1 7.1 9.1 10.1 11.1 15.1 15.6 16.0",
12.1: .04176,
13.1: .0038,
14.1: .04555,
"15.2-15.3": .00569,
15.4: .0038,
15.5: .01139
},
G: {
8: .00954,
3.2: 0,
"4.0-4.1": 0,
"4.2-4.3": 0,
"5.0-5.1": 0,
"6.0-6.1": 0,
"7.0-7.1": 0,
"8.1-8.4": 0,
"9.0-9.2": .03635,
9.3: .00149,
"10.0-10.2": 0,
10.3: .04589,
"11.0-11.2": .00149,
"11.3-11.4": .00149,
"12.0-12.1": .00328,
"12.2-12.5": .24673,
"13.0-13.1": .04738,
13.2: .00805,
13.3: .01907,
"13.4-13.7": .09804,
"14.0-14.4": .5602,
"14.5-14.8": .21514,
"15.0-15.1": .18654,
"15.2-15.3": .18505,
15.4: .31795,
15.5: .90825,
"16.0": .06496
},
P: {
4: .20411,
"5.0-5.4": .02052,
"6.2-6.4": .10259,
"7.2-7.4": .10743,
8.2: .05271,
9.2: .0513,
10.1: .02162,
"11.1-11.2": .03223,
"12.0": .0104,
"13.0": .02149,
"14.0": .17188,
"15.0": .0752,
"16.0": .05371,
"17.0": .32228
},
I: {
0: 0,
3: 0,
4: 0,
2.1: 0,
2.2: 0,
2.3: 0,
4.1: 45e-5,
"4.2-4.3": .00473,
4.4: 0,
"4.4.3-4.4.4": .04343
},
K: {
_: "0 10 11 12 11.1 11.5 12.1"
},
A: {
11: .07972,
_: "6 7 8 9 10 5.5"
},
J: {
7: 0,
10: 0
},
N: {
11: .02513,
_: "10"
},
S: {
2.5: .41315
},
R: {
_: "0"
},
M: {
0: .06481
},
Q: {
10.4: 0
},
O: {
0: .25113
},
H: {
0: 9.07302
},
L: {
0: 72.54628
}
};
},
26826: module => {
module.exports = {
C: {
40: .00365,
52: .00731,
68: .14616,
72: .00365,
84: .01096,
87: .00731,
88: .00731,
91: .01827,
94: .00731,
99: .01096,
100: .00365,
101: .11693,
102: 3.1936,
103: .37271,
_: "2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 41 42 43 44 45 46 47 48 49 50 51 53 54 55 56 57 58 59 60 61 62 63 64 65 66 67 69 70 71 73 74 75 76 77 78 79 80 81 82 83 85 86 89 90 92 93 95 96 97 98 104 105 3.5 3.6"
},
D: {
33: .00731,
36: .00365,
43: .01096,
49: .00365,
51: .00365,
58: .02192,
63: .01096,
64: .01096,
66: .00365,
67: .00731,
69: .03654,
73: .01462,
74: .01462,
75: .01462,
76: .00365,
79: .06943,
81: .02923,
83: .00731,
84: .01462,
85: .00731,
86: .04019,
87: .00731,
89: .01462,
90: .02192,
91: .01462,
92: .01096,
93: .00365,
95: .01096,
96: .06943,
97: .70522,
98: .02923,
99: .11327,
100: .03654,
101: .07308,
102: .67599,
103: 12.64649,
_: "4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 34 35 37 38 39 40 41 42 44 45 46 47 48 50 52 53 54 55 56 57 59 60 61 62 65 68 70 71 72 77 78 80 88 94 104 105 106"
},
F: {
28: .00365,
42: .00365,
79: .06943,
81: .01096,
82: .01096,
83: .04385,
84: .00731,
85: .05481,
86: .01827,
87: .0475,
88: 1.0962,
89: .71253,
"10.0-10.1": 0
},
B: {