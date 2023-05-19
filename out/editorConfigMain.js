'use strict';

var __webpack_modules__ = {
590: (module, __exports, __webpack_require__) => {
var platform = typeof process == 'object' ? process.platform : 'win32';

module.exports = minimatch;
minimatch.Minimatch = Minimatch;

var LRU = __webpack_require__(378),
  cache = (minimatch.cache = new LRU({ max: 100 })),
  GLOBSTAR = (minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}),
  sigmund = __webpack_require__(82),
  path = __webpack_require__(17),
  qmark = '[^/]',
  star = qmark + '*?',
  twoStarDot = '(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?',
  twoStarNoDot = '(?:(?!(?:\\/|^)\\.).)*?',
  reSpecials = charSet('().*{}+?[]^$\\!');

function charSet(s) {
  return s.split('').reduce((set, c) => ((set[c] = true), set), {});
}

var slashSplit = /\/+/;

minimatch.monkeyPatch = function () {
  var desc = Object.getOwnPropertyDescriptor(String.prototype, 'match'),
    orig = desc.value;
  desc.value = function (p) {
    return p instanceof Minimatch ? p.match(this) : orig.call(this, p);
  };
  Object.defineProperty(String.prototype, desc);
};

minimatch.filter = function (pattern, options) {
  options = options || {};
  return (p, i, list) => minimatch(p, pattern, options);
};

function ext(a, b) {
  a = a || {};
  b = b || {};
  var t = {};
  Object.keys(b).forEach((k) => (t[k] = b[k]));
  Object.keys(a).forEach((k) => (t[k] = a[k]));
  return t;
}

minimatch.defaults = function (def) {
  if (!def || !Object.keys(def).length) return minimatch;

  var orig = minimatch,
    m = (p, pattern, options) => orig.minimatch(p, pattern, ext(def, options));

  m.Minimatch = (pattern, options) => new orig.Minimatch(pattern, ext(def, options));

  return m;
};

Minimatch.defaults = function (def) {
  return def && Object.keys(def).length ? minimatch.defaults(def).Minimatch : Minimatch;
};

function minimatch(p, pattern, options) {
  if (typeof pattern != 'string') throw new TypeError('glob pattern string required');

  options || (options = {});

  return (
    (options.nocomment || pattern.charAt(0) !== '#') &&
    (pattern.trim() === '' ? p === '' : new Minimatch(pattern, options).match(p))
  );
}

function Minimatch(pattern, options) {
  if (!(this instanceof Minimatch)) return new Minimatch(pattern, options, cache);

  if (typeof pattern != 'string') throw new TypeError('glob pattern string required');

  options || (options = {});

  platform === 'win32' && (pattern = pattern.split('\\').join('/'));

  var cacheKey = pattern + '\n' + sigmund(options),
    cached = minimatch.cache.get(cacheKey);
  if (cached) return cached;
  minimatch.cache.set(cacheKey, this);

  this.options = options;
  this.set = [];
  this.pattern = pattern;
  this.regexp = null;
  this.negate = false;
  this.comment = false;
  this.empty = false;

  this.make();
}

Minimatch.prototype.make = function () {
  if (this._made) return;

  var pattern = this.pattern,
    options = this.options;

  if (!options.nocomment && pattern.charAt(0) === '#') {
    this.comment = true;
    return;
  }
  if (!pattern) {
    this.empty = true;
    return;
  }

  this.parseNegate();

  var set = (this.globSet = this.braceExpand());
  options.debug && console.error(this.pattern, set);

  set = this.globParts = set.map((s) => s.split(slashSplit));
  options.debug && console.error(this.pattern, set);

  set = set.map(function (s, si, set) {
    return s.map(this.parse, this);
  }, this);
  options.debug && console.error(this.pattern, set);

  set = set.filter((s) => s.indexOf(false) < 0);
  options.debug && console.error(this.pattern, set);

  this.set = set;
};

Minimatch.prototype.parseNegate = function () {
  var pattern = this.pattern,
    negate = false,
    options = this.options,
    negateOffset = 0;

  if (options.nonegate) return;

  for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === '!'; i++) {
    negate = !negate;
    negateOffset++;
  }

  negateOffset && (this.pattern = pattern.substr(negateOffset));
  this.negate = negate;
};

minimatch.braceExpand = function (pattern, options) {
  return new Minimatch(pattern, options).braceExpand();
};

Minimatch.prototype.braceExpand = function braceExpand(pattern, options) {
  options = options || this.options;
  pattern !== void 0 || (pattern = this.pattern);

  if (pattern === void 0) throw new Error('undefined pattern');

  if (options.nobrace || !pattern.match(/\{.*\}/)) return [pattern];

  var escaping = false;

  if (pattern.charAt(0) !== '{') {
    var prefix = null;
    for (var i = 0, l = pattern.length; i < l; i++) {
      var c = pattern.charAt(i);

      if (c === '\\') escaping = !escaping;
      else if (c === '{' && !escaping) {
        prefix = pattern.substr(0, i);
        break;
      }
    }

    if (prefix === null) return [pattern];

    var tail = braceExpand(pattern.substr(i), options);
    return tail.map((t) => prefix + t);
  }

  var numset = pattern.match(/^\{(-?[0-9]+)\.\.(-?[0-9]+)\}/);
  if (numset) {
    var suf = braceExpand(pattern.substr(numset[0].length), options),
      start = +numset[1],
      end = +numset[2],
      inc = start > end ? -1 : 1,
      set = [];
    for (var i = start; i != end + inc; i += inc)
      for (var ii = 0, ll = suf.length; ii < ll; ii++) set.push(i + suf[ii]);
    return set;
  }

  var i = 1,
    depth = 1,
    set = [],
    member = '';
  escaping = false;

  function addMember() {
    set.push(member);
    member = '';
  }

  FOR: for (i = 1, l = pattern.length; i < l; i++) {
    var c = pattern.charAt(i);

    if (escaping) {
      escaping = false;
      member += '\\' + c;
      continue;
    }

    switch (c) {
    case '\\':
      escaping = true;
      continue;

    case '{':
      depth++;
      member += '{';
      continue;

    case '}':
      if (--depth === 0) {
        addMember();

        i++;
        break FOR;
      }
      member += c;
      continue;

    case ',':
      depth === 1 ? addMember() : (member += c);
      continue;

    default:
      member += c;
      continue;
    }
  }

  if (depth !== 0) return braceExpand('\\' + pattern, options);

  var suf = braceExpand(pattern.substr(i), options),
    addBraces = set.length === 1;

  set = set.map((p) => braceExpand(p, options));

  set = set.reduce((l, r) => l.concat(r));

  addBraces && (set = set.map((s) => '{' + s + '}'));

  var ret = [];
  for (var i = 0, l = set.length; i < l; i++)
    for (var ii = 0, ll = suf.length; ii < ll; ii++) ret.push(set[i] + suf[ii]);
  return ret;
};

var SUBPARSE = {};
Minimatch.prototype.parse = function (pattern, isSub) {
  var options = this.options;

  if (!options.noglobstar && pattern === '**') return GLOBSTAR;
  if (pattern === '') return '';

  var plType,
    stateChar,
    re = '',
    hasMagic = !!options.nocase,
    escaping = false,
    patternListStack = [],
    inClass = false,
    reClassStart = -1,
    classStart = -1,
    patternStart = pattern.charAt(0) === '.' ? '' : options.dot ? '(?!(?:^|\\/)\\.{1,2}(?:$|\\/))' : '(?!\\.)';

  function clearStateChar() {
    if (!stateChar) return;

    switch (stateChar) {
      case '*':
        re += star;
        hasMagic = true;
        break;
      case '?':
        re += qmark;
        hasMagic = true;
        break;
      default:
        re += '\\' + stateChar;
    }

    stateChar = false;
  }

  for (var c, i = 0, len = pattern.length; i < len && (c = pattern.charAt(i)); i++) {
    options.debug && console.error('%s\t%s %s %j', pattern, i, re, c);

    if (escaping && reSpecials[c]) {
      re += '\\' + c;
      escaping = false;
      continue;
    }

    switch (c) {
    case '/':
      return false;

    case '\\':
      clearStateChar();
      escaping = true;
      continue;

    case '?':
    case '*':
    case '+':
    case '@':
    case '!':
      options.debug && console.error('%s\t%s %s %j <-- stateChar', pattern, i, re, c);

      if (inClass) {
        c === '!' && i === classStart + 1 && (c = '^');
        re += c;
        continue;
      }

      clearStateChar();
      stateChar = c;

      options.noext && clearStateChar();
      continue;

    case '(':
      if (inClass) {
        re += '(';
        continue;
      }

      if (!stateChar) {
        re += '\\(';
        continue;
      }

      plType = stateChar;
      patternListStack.push({ type: plType, start: i - 1, reStart: re.length });

      re += stateChar === '!' ? '(?:(?!' : '(?:';
      stateChar = false;
      continue;

    case ')':
      if (inClass || !patternListStack.length) {
        re += '\\)';
        continue;
      }

      hasMagic = true;
      re += ')';
      plType = patternListStack.pop().type;

      switch (plType) {
        case '!':
          re += '[^/]*?)';
          break;
        case '?':
        case '+':
        case '*':
          re += plType;
      }

      continue;

    case '|':
      if (inClass || !patternListStack.length || escaping) {
        re += '\\|';
        escaping = false;
        continue;
      }

      re += '|';
      continue;

    case '[':
      clearStateChar();

      if (inClass) {
        re += '\\' + c;
        continue;
      }

      inClass = true;
      classStart = i;
      reClassStart = re.length;
      re += c;
      continue;

    case ']':
      if (i === classStart + 1 || !inClass) {
        re += '\\' + c;
        escaping = false;
        continue;
      }

      hasMagic = true;
      inClass = false;
      re += c;
      continue;

    default:
      clearStateChar();

      escaping ? (escaping = false) : !reSpecials[c] || (c === '^' && inClass) || (re += '\\');

      re += c;
    }
  }

  if (inClass) {
    var cs = pattern.substr(classStart + 1),
      sp = this.parse(cs, SUBPARSE);
    re = re.substr(0, reClassStart) + '\\[' + sp[0];
    hasMagic = hasMagic || sp[1];
  }

  var pl;
  while ((pl = patternListStack.pop())) {
    var tail = re.slice(pl.reStart + 3);

    tail = tail.replace(/((?:\\{2})*)(\\?)\|/g, (_, $1, $2) => $1 + $1 + ($2 || '\\') + '|');

    var t = pl.type === '*' ? star : pl.type === '?' ? qmark : '\\' + pl.type;

    hasMagic = true;
    re = re.slice(0, pl.reStart) + t + '\\(' + tail;
  }

  clearStateChar();
  escaping && (re += '\\\\');

  var addPatternStart = false;
  switch (re.charAt(0)) {
    case '.':
    case '[':
    case '(':
      addPatternStart = true;
  }

  re !== '' && hasMagic && (re = '(?=.)' + re);
  addPatternStart && (re = patternStart + re);

  if (isSub === SUBPARSE) return [re, hasMagic];
  if (!hasMagic) return globUnescape(pattern);

  var flags = options.nocase ? 'i' : '',
    regExp = new RegExp('^' + re + '$', flags);

  regExp._glob = pattern;
  regExp._src = re;

  return regExp;
};

minimatch.makeRe = function (pattern, options) {
  return new Minimatch(pattern, options || {}).makeRe();
};

Minimatch.prototype.makeRe = function () {
  if (this.regexp || this.regexp === false) return this.regexp;

  var set = this.set;

  if (!set.length) return (this.regexp = false);
  var options = this.options,
    twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot,
    flags = options.nocase ? 'i' : '';

  var re = set.map(function (pattern) {
    return pattern
      .map((p) => (p === GLOBSTAR ? twoStar : typeof p == 'string' ? regExpEscape(p) : p._src))
      .join('\\/');
  }).join('|');

  re = '^(?:' + re + ')$';

  this.negate && (re = '^(?!' + re + ').*$');

  try {
    return (this.regexp = new RegExp(re, flags));
  } catch (ex) {
    return (this.regexp = false);
  }
};

minimatch.match = function (list, pattern, options) {
  var mm = new Minimatch(pattern, options);
  list = list.filter((f) => mm.match(f));
  options.nonull && !list.length && list.push(pattern);
  return list;
};

Minimatch.prototype.match = function (f, partial) {
  if (this.comment) return false;
  if (this.empty) return f === '';

  if (f === '/' && partial) return true;

  var options = this.options;

  platform === 'win32' && (f = f.split('\\').join('/'));

  f = f.split(slashSplit);
  options.debug && console.error(this.pattern, 'split', f);

  for (var set = this.set, i = 0, l = set.length; i < l; i++) {
    var pattern = set[i],
      hit = this.matchOne(f, pattern, partial);
    if (hit) return !(!options.flipNegate && this.negate);
  }

  return !options.flipNegate && this.negate;
};

Minimatch.prototype.matchOne = function (file, pattern, partial) {
  var options = this.options;

  options.debug && console.error('matchOne', { this: this, file, pattern });

  options.matchBase && pattern.length === 1 && (file = path.basename(file.join('/')).split('/'));

  options.debug && console.error('matchOne', file.length, pattern.length);

  for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
    options.debug && console.error('matchOne loop');
    var p = pattern[pi],
      f = file[fi];

    options.debug && console.error(pattern, p, f);

    if (p === false) return false;

    if (p === GLOBSTAR) {
      options.debug && console.error('GLOBSTAR', [pattern, p, f]);

      var fr = fi,
        pr = pi + 1;
      if (pr === pl) {
        options.debug && console.error('** at the end');

        for (; fi < fl; fi++)
          if (file[fi] === '.' || file[fi] === '..' || (!options.dot && file[fi].charAt(0) === '.')) return false;
        return true;
      }

      WHILE: while (fr < fl) {
        var swallowee = file[fr];

        options.debug && console.error('\nglobstar while', file, fr, pattern, pr, swallowee);

        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
          options.debug && console.error('globstar found match!', fr, fl, swallowee);

          return true;
        }
        if (swallowee === '.' || swallowee === '..' || (!options.dot && swallowee.charAt(0) === '.')) {
          options.debug && console.error('dot detected!', file, fr, pattern, pr);
          break WHILE;
        }

        options.debug && console.error('globstar swallow a segment, and continue');
        fr++;
      }

      return !!partial && fr === fl;
    }

    var hit;
    if (typeof p == 'string') {
      hit = options.nocase ? f.toLowerCase() === p.toLowerCase() : f === p;
      options.debug && console.error('string match', p, f, hit);
    } else {
      hit = f.match(p);
      options.debug && console.error('pattern match', p, f, hit);
    }

    if (!hit) return false;
  }

  if (fi === fl && pi === pl) return true;
  if (fi === fl) return partial;
  if (pi === pl) return fi === fl - 1 && file[fi] === '';

  throw new Error('wtf?');
};

function globUnescape(s) {
  return s.replace(/\\(.)/g, '$1');
}

function regExpEscape(s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
},
378: (module, __exports, __webpack_require__) => {
module.exports = LRUCache;

var util = __webpack_require__(837),
  Yallist = __webpack_require__(923),
  hasSymbol = typeof Symbol == 'function' && process.env._nodeLRUCacheForceNoSymbol !== '1',
  makeSymbol = hasSymbol ? (key) => Symbol(key) : (key) => '_' + key,
  MAX = makeSymbol('max'),
  LENGTH = makeSymbol('length'),
  LENGTH_CALCULATOR = makeSymbol('lengthCalculator'),
  ALLOW_STALE = makeSymbol('allowStale'),
  MAX_AGE = makeSymbol('maxAge'),
  DISPOSE = makeSymbol('dispose'),
  NO_DISPOSE_ON_SET = makeSymbol('noDisposeOnSet'),
  LRU_LIST = makeSymbol('lruList'),
  CACHE = makeSymbol('cache');

function naiveLength() {
  return 1;
}

function LRUCache(options) {
  if (!(this instanceof LRUCache)) return new LRUCache(options);

  typeof options == 'number' && (options = { max: options });
  options || (options = {});

  var max = (this[MAX] = options.max);
  (max && typeof max == 'number' && max > 0) || (this[MAX] = Infinity);

  var lc = options.length || naiveLength;
  typeof lc != 'function' && (lc = naiveLength);
  this[LENGTH_CALCULATOR] = lc;

  this[ALLOW_STALE] = options.stale || false;
  this[MAX_AGE] = options.maxAge || 0;
  this[DISPOSE] = options.dispose;
  this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
  this.reset();
}

Object.defineProperty(LRUCache.prototype, 'max', {
  set: function (mL) {
    (mL && typeof mL == 'number' && mL > 0) || (mL = Infinity);
    this[MAX] = mL;
    trim(this);
  },
  get: function () {
    return this[MAX];
  },
  enumerable: true
});

Object.defineProperty(LRUCache.prototype, 'allowStale', {
  set: function (allowStale) {
    this[ALLOW_STALE] = !!allowStale;
  },
  get: function () {
    return this[ALLOW_STALE];
  },
  enumerable: true
});

Object.defineProperty(LRUCache.prototype, 'maxAge', {
  set: function (mA) {
    (mA && typeof mA == 'number' && mA >= 0) || (mA = 0);
    this[MAX_AGE] = mA;
    trim(this);
  },
  get: function () {
    return this[MAX_AGE];
  },
  enumerable: true
});

Object.defineProperty(LRUCache.prototype, 'lengthCalculator', {
  set: function (lC) {
    typeof lC != 'function' && (lC = naiveLength);

    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC;
      this[LENGTH] = 0;
      this[LRU_LIST].forEach(function (hit) {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
        this[LENGTH] += hit.length;
      }, this);
    }
    trim(this);
  },
  get: function () {
    return this[LENGTH_CALCULATOR];
  },
  enumerable: true
});

Object.defineProperty(LRUCache.prototype, 'length', {
  get: function () {
    return this[LENGTH];
  },
  enumerable: true
});

Object.defineProperty(LRUCache.prototype, 'itemCount', {
  get: function () {
    return this[LRU_LIST].length;
  },
  enumerable: true
});

LRUCache.prototype.rforEach = function (fn, thisp) {
  thisp = thisp || this;
  for (var walker = this[LRU_LIST].tail; walker !== null; ) {
    var prev = walker.prev;
    forEachStep(this, fn, walker, thisp);
    walker = prev;
  }
};

function forEachStep(self, fn, node, thisp) {
  var hit = node.value;
  if (isStale(self, hit)) {
    del(self, node);
    self[ALLOW_STALE] || (hit = void 0);
  }
  hit && fn.call(thisp, hit.value, hit.key, self);
}

LRUCache.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;
  for (var walker = this[LRU_LIST].head; walker !== null; ) {
    var next = walker.next;
    forEachStep(this, fn, walker, thisp);
    walker = next;
  }
};

LRUCache.prototype.keys = function () {
  return this[LRU_LIST].toArray().map((k) => k.key, this);
};

LRUCache.prototype.values = function () {
  return this[LRU_LIST].toArray().map((k) => k.value, this);
};

LRUCache.prototype.reset = function () {
  this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length &&
    this[LRU_LIST].forEach(function (hit) {
      this[DISPOSE](hit.key, hit.value);
    }, this);

  this[CACHE] = new Map();
  this[LRU_LIST] = new Yallist();
  this[LENGTH] = 0;
};

LRUCache.prototype.dump = function () {
  return this[LRU_LIST].map(function (hit) {
    if (!isStale(this, hit))
      return { k: hit.key, v: hit.value, e: hit.now + (hit.maxAge || 0) };
  }, this).toArray().filter((h) => h);
};

LRUCache.prototype.dumpLru = function () {
  return this[LRU_LIST];
};

LRUCache.prototype.inspect = function (n, opts) {
  var str = 'LRUCache {',
    extras = false;

  if (this[ALLOW_STALE]) {
    str += '\n  allowStale: true';
    extras = true;
  }

  var max = this[MAX];
  if (max && max !== Infinity) {
    extras && (str += ',');
    str += '\n  max: ' + util.inspect(max, opts);
    extras = true;
  }

  var maxAge = this[MAX_AGE];
  if (maxAge) {
    extras && (str += ',');
    str += '\n  maxAge: ' + util.inspect(maxAge, opts);
    extras = true;
  }

  var lc = this[LENGTH_CALCULATOR];
  if (lc && lc !== naiveLength) {
    extras && (str += ',');
    str += '\n  length: ' + util.inspect(this[LENGTH], opts);
    extras = true;
  }

  var didFirst = false;
  this[LRU_LIST].forEach(function (item) {
    if (didFirst) str += ',\n  ';
    else {
      extras && (str += ',\n');
      didFirst = true;
      str += '\n  ';
    }
    var key = util.inspect(item.key).split('\n').join('\n  '),
      val = { value: item.value };
    item.maxAge !== maxAge && (val.maxAge = item.maxAge);

    lc !== naiveLength && (val.length = item.length);
    isStale(this, item) && (val.stale = true);

    val = util.inspect(val, opts).split('\n').join('\n  ');
    str += key + ' => ' + val;
  });

  (didFirst || extras) && (str += '\n');
  return str + '}';
};

LRUCache.prototype.set = function (key, value, maxAge) {
  maxAge = maxAge || this[MAX_AGE];

  var now = maxAge ? Date.now() : 0,
    len = this[LENGTH_CALCULATOR](value, key);

  if (this[CACHE].has(key)) {
    if (len > this[MAX]) {
      del(this, this[CACHE].get(key));
      return false;
    }

    var item = this[CACHE].get(key).value;
    this[DISPOSE] && (this[NO_DISPOSE_ON_SET] || this[DISPOSE](key, item.value));

    item.now = now;
    item.maxAge = maxAge;
    item.value = value;
    this[LENGTH] += len - item.length;
    item.length = len;
    this.get(key);
    trim(this);
    return true;
  }

  var hit = new Entry(key, value, len, now, maxAge);

  if (hit.length > this[MAX]) {
    this[DISPOSE] && this[DISPOSE](key, value);
    return false;
  }

  this[LENGTH] += hit.length;
  this[LRU_LIST].unshift(hit);
  this[CACHE].set(key, this[LRU_LIST].head);
  trim(this);
  return true;
};

LRUCache.prototype.has = function (key) {
  return !(!this[CACHE].has(key) || isStale(this, this[CACHE].get(key).value));
};

LRUCache.prototype.get = function (key) {
  return get(this, key, true);
};

LRUCache.prototype.peek = function (key) {
  return get(this, key, false);
};

LRUCache.prototype.pop = function () {
  var node = this[LRU_LIST].tail;
  if (!node) return null;
  del(this, node);
  return node.value;
};

LRUCache.prototype.del = function (key) {
  del(this, this[CACHE].get(key));
};

LRUCache.prototype.load = function (arr) {
  this.reset();

  for (var now = Date.now(), l = arr.length - 1; l >= 0; l--) {
    var hit = arr[l],
      expiresAt = hit.e || 0;
    if (expiresAt === 0) this.set(hit.k, hit.v);
    else {
      var maxAge = expiresAt - now;

      maxAge > 0 && this.set(hit.k, hit.v, maxAge);
    }
  }
};

LRUCache.prototype.prune = function () {
  var self = this;
  this[CACHE].forEach((value, key) => get(self, key, false));
};

function get(self, key, doUse) {
  var node = self[CACHE].get(key);
  if (node) {
    var hit = node.value;
    if (isStale(self, hit)) {
      del(self, node);
      self[ALLOW_STALE] || (hit = void 0);
    } else doUse && self[LRU_LIST].unshiftNode(node);
    hit && (hit = hit.value);
  }
  return hit;
}

function isStale(self, hit) {
  if (!hit || !(hit.maxAge || self[MAX_AGE])) return false;
  var diff = Date.now() - hit.now;
  return hit.maxAge ? diff > hit.maxAge : self[MAX_AGE] && diff > self[MAX_AGE];
}

function trim(self) {
  if (self[LENGTH] <= self[MAX]) return;
  for (var walker = self[LRU_LIST].tail; self[LENGTH] > self[MAX] && walker !== null; ) {
    var prev = walker.prev;
    del(self, walker);
    walker = prev;
  }
}

function del(self, node) {
  if (!node) return;
  var hit = node.value;
  self[DISPOSE] && self[DISPOSE](hit.key, hit.value);
  self[LENGTH] -= hit.length;
  self[CACHE].delete(hit.key);
  self[LRU_LIST].removeNode(node);
}

function Entry(key, value, length, now, maxAge) {
  this.key = key;
  this.value = value;
  this.length = length;
  this.now = now;
  this.maxAge = maxAge || 0;
}
},
82: (module) => {
module.exports = function (subject, maxSessions) {
  maxSessions = maxSessions || 10;
  var notes = [],
    analysis = '';

  function psychoAnalyze(subject, session) {
    if (session > maxSessions || typeof subject == 'function' || subject === void 0) return;

    if (typeof subject != 'object' || !subject || subject instanceof RegExp) {
      analysis += subject;
      return;
    }

    if (notes.indexOf(subject) >= 0 || session === maxSessions) return;

    notes.push(subject);
    analysis += '{';
    Object.keys(subject).forEach(function (issue, _, __) {
      if (issue.charAt(0) === '_') return;
      var to = typeof subject[issue];
      if (to === 'function' || to === 'undefined') return;
      analysis += issue;
      psychoAnalyze(subject[issue], session + 1);
    });
  }
  psychoAnalyze(subject, 0);
  return analysis;
};
},
923: (module) => {
module.exports = Yallist;

Yallist.Node = Node;
Yallist.create = Yallist;

function Yallist(list) {
  var self = this;
  self instanceof Yallist || (self = new Yallist());

  self.tail = null;
  self.head = null;
  self.length = 0;

  if (list && typeof list.forEach == 'function')
    list.forEach((item) => self.push(item));
  else if (arguments.length > 0)
    for (var i = 0, l = arguments.length; i < l; i++) self.push(arguments[i]);

  return self;
}

Yallist.prototype.removeNode = function (node) {
  if (node.list !== this) throw new Error('removing node which does not belong to this list');

  var next = node.next,
    prev = node.prev;

  next && (next.prev = prev);
  prev && (prev.next = next);

  node === this.head && (this.head = next);
  node === this.tail && (this.tail = prev);

  node.list.length--;
  node.next = null;
  node.prev = null;
  node.list = null;
};

Yallist.prototype.unshiftNode = function (node) {
  if (node === this.head) return;

  node.list && node.list.removeNode(node);

  var head = this.head;
  node.list = this;
  node.next = head;
  head && (head.prev = node);

  this.head = node;
  this.tail || (this.tail = node);
  this.length++;
};

Yallist.prototype.pushNode = function (node) {
  if (node === this.tail) return;

  node.list && node.list.removeNode(node);

  var tail = this.tail;
  node.list = this;
  node.prev = tail;
  tail && (tail.next = node);

  this.tail = node;
  this.head || (this.head = node);
  this.length++;
};

Yallist.prototype.push = function () {
  for (var i = 0, l = arguments.length; i < l; i++) push(this, arguments[i]);
  return this.length;
};

Yallist.prototype.unshift = function () {
  for (var i = 0, l = arguments.length; i < l; i++) unshift(this, arguments[i]);
  return this.length;
};

Yallist.prototype.pop = function () {
  if (!this.tail) return;

  var res = this.tail.value;
  this.tail = this.tail.prev;
  this.tail ? (this.tail.next = null) : (this.head = null);
  this.length--;
  return res;
};

Yallist.prototype.shift = function () {
  if (!this.head) return;

  var res = this.head.value;
  this.head = this.head.next;
  this.head ? (this.head.prev = null) : (this.tail = null);
  this.length--;
  return res;
};

Yallist.prototype.forEach = function (fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.next;
  }
};

Yallist.prototype.forEachReverse = function (fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.prev;
  }
};

Yallist.prototype.get = function (n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) walker = walker.next;
  if (i === n && walker !== null) return walker.value;
};

Yallist.prototype.getReverse = function (n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) walker = walker.prev;
  if (i === n && walker !== null) return walker.value;
};

Yallist.prototype.map = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist();
  for (var walker = this.head; walker !== null; ) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.next;
  }
  return res;
};

Yallist.prototype.mapReverse = function (fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist();
  for (var walker = this.tail; walker !== null; ) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.prev;
  }
  return res;
};

Yallist.prototype.reduce = function (fn, initial) {
  var acc,
    walker = this.head;
  if (arguments.length > 1) acc = initial;
  else {
    if (!this.head) throw new TypeError('Reduce of empty list with no initial value');
    walker = this.head.next;
    acc = this.head.value;
  }

  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i);
    walker = walker.next;
  }

  return acc;
};

Yallist.prototype.reduceReverse = function (fn, initial) {
  var acc,
    walker = this.tail;
  if (arguments.length > 1) acc = initial;
  else {
    if (!this.tail) throw new TypeError('Reduce of empty list with no initial value');
    walker = this.tail.prev;
    acc = this.tail.value;
  }

  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i);
    walker = walker.prev;
  }

  return acc;
};

Yallist.prototype.toArray = function () {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.next;
  }
  return arr;
};

Yallist.prototype.toArrayReverse = function () {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.prev;
  }
  return arr;
};

Yallist.prototype.slice = function (from, to) {
  (to = to || this.length) < 0 && (to += this.length);
  (from = from || 0) < 0 && (from += this.length);

  var ret = new Yallist();
  if (to < from || to < 0) return ret;

  from < 0 && (from = 0);
  to > this.length && (to = this.length);

  for (var i = 0, walker = this.head; walker !== null && i < from; i++) walker = walker.next;
  for (; walker !== null && i < to; i++, walker = walker.next) ret.push(walker.value);
  return ret;
};

Yallist.prototype.sliceReverse = function (from, to) {
  (to = to || this.length) < 0 && (to += this.length);
  (from = from || 0) < 0 && (from += this.length);

  var ret = new Yallist();
  if (to < from || to < 0) return ret;

  from < 0 && (from = 0);
  to > this.length && (to = this.length);

  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) walker = walker.prev;
  for (; walker !== null && i > from; i--, walker = walker.prev) ret.push(walker.value);
  return ret;
};

Yallist.prototype.reverse = function () {
  var head = this.head,
    tail = this.tail;
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev;
    walker.prev = walker.next;
    walker.next = p;
  }
  this.head = tail;
  this.tail = head;
  return this;
};

function push(self, item) {
  self.tail = new Node(item, self.tail, null, self);
  self.head || (self.head = self.tail);
  self.length++;
}

function unshift(self, item) {
  self.head = new Node(item, null, self.head, self);
  self.tail || (self.tail = self.head);
  self.length++;
}

function Node(value, prev, next, list) {
  if (!(this instanceof Node)) return new Node(value, prev, next, list);

  this.list = list;
  this.value = value;

  if (prev) {
    prev.next = this;
    this.prev = prev;
  } else this.prev = null;

  if (next) {
    next.prev = this;
    this.next = next;
  } else this.next = null;
}
},
147: (module) => {
module.exports = require('fs');
},
37: (module) => {
module.exports = require('os');
},
17: (module) => {
module.exports = require('path');
},
310: (module) => {
module.exports = require('url');
},
837: (module) => {
module.exports = require('util');
},
584: (module) => {
module.exports = { i8: '0.15.3' };
}
};

var __webpack_module_cache__ = {};
function __webpack_require__(moduleId) {
  var cachedModule = __webpack_module_cache__[moduleId];
  if (cachedModule !== void 0) return cachedModule.exports;

  var module = (__webpack_module_cache__[moduleId] = { exports: {} });
  __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
  return module.exports;
}

__webpack_require__.d = (exports, definition) => {
  for (var key in definition)
    __webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key) &&
      Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
};
__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
__webpack_require__.r = (exports) => {
  typeof Symbol != 'undefined' && Symbol.toStringTag &&
    Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
  Object.defineProperty(exports, '__esModule', { value: true });
};

var __webpack_exports__ = {};
(() => {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  activate: () => activate
});

const external_vscode = require('vscode'),
  { URL } = __webpack_require__(310);

const regex = {
  section: /^\s*\[(([^#;]|\\#|\\;)+)\]\s*([#;].*)?$/,
  param: /^\s*([\w\.\-\_]+)\s*[=:]\s*(.*?)\s*([#;].*)?$/,
  comment: /^\s*[#;].*$/
};

function parseString(data) {
  let sectionBody = {},
    sectionName = null;
  const value = [[sectionName, sectionBody]];
  data.split(/\r\n|\r|\n/).forEach((line) => {
    let match;
    if (regex.comment.test(line)) return;

    if (regex.param.test(line)) {
      match = line.match(regex.param);
      sectionBody[match[1]] = match[2];
    } else if (regex.section.test(line)) {
      match = line.match(regex.section);
      sectionName = match[1];
      sectionBody = {};
      value.push([sectionName, sectionBody]);
    }
  });
  return value;
}

const src_fs = __webpack_require__(147),
  path = __webpack_require__(17),
  minimatch = __webpack_require__(590),
  pkgVersion = __webpack_require__(584).i8;

const knownProps = {
  end_of_line: true,
  indent_style: true,
  indent_size: true,
  insert_final_newline: true,
  trim_trailing_whitespace: true,
  charset: true
};

function fnmatch(filepath, glob) {
  glob = glob.replace(/\*\*/g, '{*,**/**/**}');
  return minimatch(filepath, glob, { matchBase: true, dot: true, noext: true });
}

function getConfigFileNames(filepath, options) {
  const paths = [];
  do {
    filepath = path.dirname(filepath);
    paths.push(path.join(filepath, options.config));
  } while (filepath !== options.root);
  return paths;
}

function processMatches(matches, version) {
  'indent_style' in matches &&
    matches.indent_style === 'tab' &&
    !('indent_size' in matches) &&
    /^\s*v?(0\.(1[1-9]|[2-9]\d)|[1-9])\d*\./.test(version) && // >= 0.10.0
    (matches.indent_size = 'tab');

  'indent_size' in matches && !('tab_width' in matches) && matches.indent_size !== 'tab' &&
    (matches.tab_width = matches.indent_size);

  'indent_size' in matches && 'tab_width' in matches && matches.indent_size === 'tab' &&
    (matches.indent_size = matches.tab_width);

  return matches;
}

function processOptions(options = {}, filepath) {
  return {
    config: options.config || '.editorconfig',
    version: options.version || pkgVersion,
    root: path.resolve(options.root || path.parse(filepath).root)
  };
}

function buildFullGlob(pathPrefix, glob) {
  switch (glob.indexOf('/')) {
    case -1:
      glob = '**/' + glob;
      break;
    case 0:
      glob = glob.substring(1);
  }

  return path.join(pathPrefix, glob);
}

function extendProps(props = {}, options = {}) {
  for (const key in options) {
    if (!options.hasOwnProperty(key)) continue;

    const value = options[key],
      key2 = key.toLowerCase();
    let value2 = value;
    knownProps[key2] && (value2 = value.toLowerCase());

    try {
      value2 = JSON.parse(value);
    } catch (e) {}
    value == null && (value2 = String(value));

    props[key2] = value2;
  }
  return props;
}

function parseFromConfigs(configs, filepath, options) {
  return processMatches(
    configs.reverse().reduce((matches, file) => {
      const pathPrefix = path.dirname(file.name);
      file.contents.forEach((section) => {
        const glob = section[0],
          options2 = section[1];
        if (!glob) return;

        const fullGlob = buildFullGlob(pathPrefix, glob);
        fnmatch(filepath, fullGlob) && (matches = extendProps(matches, options2));
      });
      return matches;
    }, {}),
    options.version
  );
}

function getConfigsForFiles(files) {
  const configs = [];
  for (const i in files)
    if (files.hasOwnProperty(i)) {
      const file = files[i],
        contents = parseString(file.contents);
      configs.push({ name: file.name, contents });

      if ((contents[0][1].root || '').toLowerCase() === 'true') break;
    }
  return configs;
}

async function readConfigFiles(filepaths) {
  return Promise.all(
    filepaths.map((name) => new Promise((resolve) => {
      src_fs.readFile(name, 'utf8', (err, data) => {
        resolve({ name, contents: err ? '' : data });
      });
    }))
  );
}

function opts(filepath, options = {}) {
  const resolvedFilePath = path.resolve(filepath);
  return [resolvedFilePath, processOptions(options, resolvedFilePath)];
}

async function src_parse(_filepath, _options = {}) {
  const [resolvedFilePath, processedOptions] = opts(_filepath, _options),
    filepaths = getConfigFileNames(resolvedFilePath, processedOptions);
  return readConfigFiles(filepaths)
    .then(getConfigsForFiles)
    .then((configs) => parseFromConfigs(configs, resolvedFilePath, processedOptions));
}

const languageExtensionMap = {
  javascript: 'js',
  javascriptreact: 'jsx',
  markdown: 'md',
  plaintext: 'txt',
  python: 'py',
  ruby: 'rb',
  typescript: 'ts',
  typescriptreact: 'tsx',
  yaml: 'yml'
};

async function resolveTextEditorOptions(doc, { onBeforeResolve, onEmptyConfig } = {}) {
  const editorconfigSettings = await resolveCoreConfig(doc, { onBeforeResolve });

  if (editorconfigSettings) return fromEditorConfig(editorconfigSettings, pickWorkspaceDefaults(doc));

  if (onEmptyConfig) {
    const rp = resolveFile(doc).relativePath;
    rp && onEmptyConfig(rp);
  }
  return {};
}

async function applyTextEditorOptions(newOptions, { onNoActiveTextEditor, onSuccess } = {}) {
  const editor = external_vscode.window.activeTextEditor;
  if (!editor) {
    onNoActiveTextEditor && onNoActiveTextEditor();
    return;
  }

  editor.options = newOptions;
  onSuccess && onSuccess(newOptions);
}

function pickWorkspaceDefaults(doc) {
  const workspaceConfig = external_vscode.workspace.getConfiguration('editor', doc);

  return workspaceConfig.get('detectIndentation')
    ? {}
    : { tabSize: workspaceConfig.get('tabSize'), insertSpaces: workspaceConfig.get('insertSpaces') };
}

async function resolveCoreConfig(doc, { onBeforeResolve } = {}) {
  const { fileName, relativePath } = resolveFile(doc);
  if (!fileName) return {};

  relativePath && onBeforeResolve && onBeforeResolve(relativePath);

  const config = await src_parse(fileName);
  config.indent_size === 'tab' && (config.indent_size = config.tab_width);
  return config;
}

function resolveFile(doc) {
  if (doc.languageId === 'Log') return {};

  const file = getFile();
  return {
    fileName: file && file.toString(),
    relativePath: file && external_vscode.workspace.asRelativePath(file, true)
  };

  function getFile() {
    if (!doc.isUntitled) return doc.fileName;

    const ext = languageExtensionMap[doc.languageId] || doc.languageId,
      folder = external_vscode.workspace.getWorkspaceFolder(doc.uri);
    return folder && folder.uri.with({ path: `${doc.fileName}.${ext}` });
  }
}

function fromEditorConfig(config = {}, defaults = pickWorkspaceDefaults()) {
  const resolved = {
    tabSize:
      config.indent_style === 'tab'
        ? config.tab_width != null ? config.tab_width : config.indent_size
        : config.indent_size != null ? config.indent_size : config.tab_width
  };

  resolved.tabSize === 'tab' && (resolved.tabSize = config.tab_width);
  return {
    ...(config.indent_style === 'tab' || config.indent_size === 'tab' || config.indent_style === 'space'
      ? { insertSpaces: config.indent_style === 'space' }
      : {}),
    tabSize: resolved.tabSize && resolved.tabSize >= 0 ? resolved.tabSize : defaults.tabSize
  };
}

function toEditorConfig(options) {
  const result = {};

  switch (options.insertSpaces) {
    case true:
      result.indent_style = 'space';
      options.tabSize && (result.indent_size = resolveTabSize(options.tabSize));
      break;
    case false:
    case 'auto':
      result.indent_style = 'tab';
      options.tabSize && (result.tab_width = resolveTabSize(options.tabSize));
  }

  return result;

  function resolveTabSize(tabSize) {
    return tabSize === 'auto' ? 4 : parseInt(String(tabSize), 10);
  }
}

const { readFile: _readFile } = __webpack_require__(147),
  { EOL } = __webpack_require__(37),
  { join } = __webpack_require__(17),
  { promisify } = __webpack_require__(837),
  readFile = promisify(_readFile);

async function generateEditorConfig(uri) {
  const workspaceUri =
      external_vscode.workspace.workspaceFolders && external_vscode.workspace.workspaceFolders[0].uri,
    currentUri = uri || workspaceUri;
  if (!currentUri) {
    external_vscode.window.showErrorMessage("Workspace doesn't contain any folders.");
    return;
  }

  const editorConfigUri = external_vscode.Uri.parse(`${currentUri.toString()}/.editorconfig`);

  try {
    const stats = await external_vscode.workspace.fs.stat(editorConfigUri);
    if (stats.type === external_vscode.FileType.File) {
      external_vscode.window.showErrorMessage('An .editorconfig file already exists in this workspace.');

      return;
    }
  } catch (err) {
    if (err) {
      err.name === 'EntryNotFound (FileSystemError)'
        ? writeFile()
        : external_vscode.window.showErrorMessage(err.message);
      return;
    }
  }

  async function writeFile() {
    const ec = external_vscode.workspace.getConfiguration('editorconfig');

    if (!ec.get('generateAuto')) {
      const template = ec.get('template') || 'default',
        defaultTemplatePath = join(__dirname, 'DefaultTemplate.editorconfig');

      let templateBuffer;
      try {
        templateBuffer = await readFile(/^default$/i.test(template) ? defaultTemplatePath : template);
      } catch (error) {
        external_vscode.window.showErrorMessage(
          [`Could not read EditorConfig template file at ${template}`, error.message].join(EOL)
        );

        return;
      }

      try {
        external_vscode.workspace.fs.writeFile(editorConfigUri, templateBuffer);
      } catch (error) {
        external_vscode.window.showErrorMessage(error.message);
      }

      return;
    }

    const editor = external_vscode.workspace.getConfiguration('editor', currentUri),
      files = external_vscode.workspace.getConfiguration('files', currentUri);
    const settingsLines = [
      '# EditorConfig is awesome: https://EditorConfig.org',
      '',
      '# top-most EditorConfig file',
      'root = true',
      '',
      '[*]'
    ];

    function addSetting(key, value) {
      value !== void 0 && settingsLines.push(`${key} = ${value}`);
    }

    addSetting('indent_style', !editor.get('insertSpaces') ? 'tab' : 'space');
    addSetting('indent_size', editor.get('tabSize'));

    const eolMap = { '\r\n': 'crlf', '\n': 'lf' };

    let eolKey = files.get('eol') || 'auto';
    eolKey === 'auto' && (eolKey = EOL);
    addSetting('end_of_line', eolMap[eolKey]);

    const encodingMap = {
      iso88591: 'latin1',
      utf8: 'utf-8',
      utf8bom: 'utf-8-bom',
      utf16be: 'utf-16-be',
      utf16le: 'utf-16-le'
    };
    addSetting('charset', encodingMap[files.get('encoding')]);

    addSetting('trim_trailing_whitespace', !!files.get('trimTrailingWhitespace'));

    const insertFinalNewline = !!files.get('insertFinalNewline');
    addSetting('insert_final_newline', insertFinalNewline);

    insertFinalNewline && settingsLines.push('');

    try {
      await external_vscode.workspace.fs.writeFile(editorConfigUri, Buffer.from(settingsLines.join(eolKey)));
    } catch (err) {
      if (err) {
        external_vscode.window.showErrorMessage(err.message);
        return;
      }
    }
  }
}

class PreSaveTransformation {}

const lineEndings = {
  CR: '\r',
  CRLF: '\r\n',
  LF: '\n'
};

class InsertFinalNewline extends PreSaveTransformation {
  constructor(...args) {
    super(...args);
    this.lineEndings = lineEndings;
  }

  transform(editorconfigProperties, doc) {
    const lineCount = doc.lineCount,
      lastLine = doc.lineAt(lineCount - 1);

    if (
      shouldIgnoreSetting(editorconfigProperties.insert_final_newline) ||
      lineCount === 0 ||
      lastLine.isEmptyOrWhitespace
    )
      return { edits: [] };

    const position = new external_vscode.Position(lastLine.lineNumber, lastLine.text.length),
      eol = (editorconfigProperties.end_of_line || 'lf').toUpperCase();

    return {
      edits: [external_vscode.TextEdit.insert(position, this.lineEndings[eol])],
      message: `insertFinalNewline(${eol})`
    };

    function shouldIgnoreSetting(value) {
      return !value || value === 'unset';
    }
  }
}

const eolMap = {
  LF: external_vscode.EndOfLine.LF,
  CRLF: external_vscode.EndOfLine.CRLF
};

class SetEndOfLine extends PreSaveTransformation {
  constructor(...args) {
    super(...args);
    this.eolMap = eolMap;
  }

  transform(editorconfigProperties, doc) {
    const eolKey = (editorconfigProperties.end_of_line || '').toUpperCase(),
      eol = this.eolMap[eolKey];

    return !eol || doc.eol === eol
      ? { edits: [] }
      : { edits: [external_vscode.TextEdit.setEndOfLine(eol)], message: `setEndOfLine(${eolKey})` };
  }
}

class TrimTrailingWhitespace extends PreSaveTransformation {
  transform(editorconfigProperties, doc, reason) {
    const editorTrimsWhitespace = external_vscode.workspace
      .getConfiguration('files', doc.uri)
      .get('trimTrailingWhitespace', false);

    if (editorTrimsWhitespace && editorconfigProperties.trim_trailing_whitespace === false) {
      const message =
        'The trimTrailingWhitespace workspace or user setting is overriding the EditorConfig setting for this file.';
      return { edits: new Error(message), message };
    }

    if (shouldIgnoreSetting(editorconfigProperties.trim_trailing_whitespace)) return { edits: [] };

    if (external_vscode.window.activeTextEditor && external_vscode.window.activeTextEditor.document === doc) {
      const trimReason = reason !== external_vscode.TextDocumentSaveReason.Manual ? 'auto-save' : null;
      external_vscode.commands.executeCommand('editor.action.trimTrailingWhitespace', { reason: trimReason });

      return { edits: [], message: 'editor.action.trimTrailingWhitespace' };
    }

    const edits = [];
    for (let i = 0; i < doc.lineCount; i++) {
      const edit = this.trimLineTrailingWhitespace(doc.lineAt(i));
      edit && edits.push(edit);
    }

    return { edits, message: 'trimTrailingWhitespace()' };

    function shouldIgnoreSetting(value) {
      return !value || value === 'unset';
    }
  }

  trimLineTrailingWhitespace(line) {
    const trimmedLine = this.trimTrailingWhitespace(line.text);
    if (trimmedLine === line.text) return;

    const whitespaceBegin = new external_vscode.Position(line.lineNumber, trimmedLine.length),
      whitespaceEnd = new external_vscode.Position(line.lineNumber, line.text.length),
      whitespace = new external_vscode.Range(whitespaceBegin, whitespaceEnd);

    return external_vscode.TextEdit.delete(whitespace);
  }

  trimTrailingWhitespace(input) {
    return input.replace(/[\s\uFEFF\xA0]+$/g, '');
  }
}

const DocumentWatcher_path = __webpack_require__(17);

class DocumentWatcher {
  constructor(outputChannel = external_vscode.window.createOutputChannel('EditorConfig')) {
    this.preSaveTransformations = [new SetEndOfLine(), new TrimTrailingWhitespace(), new InsertFinalNewline()];
    this.outputChannel = outputChannel;
    this.log('Initializing document watcher...');

    const subscriptions = [];

    subscriptions.push(
      external_vscode.window.onDidChangeActiveTextEditor(async (editor) => {
        if (editor && editor.document) {
          const newOptions = await resolveTextEditorOptions((this.doc = editor.document), {
            onEmptyConfig: this.onEmptyConfig
          });

          applyTextEditorOptions(newOptions, {
            onNoActiveTextEditor: this.onNoActiveTextEditor,
            onSuccess: this.onSuccess
          });
        }
      })
    );

    subscriptions.push(
      external_vscode.window.onDidChangeWindowState(async (state) => {
        if (state.focused && this.doc) {
          const newOptions = await resolveTextEditorOptions(this.doc, { onEmptyConfig: this.onEmptyConfig });

          applyTextEditorOptions(newOptions, {
            onNoActiveTextEditor: this.onNoActiveTextEditor,
            onSuccess: this.onSuccess
          });
        }
      })
    );

    subscriptions.push(
      external_vscode.workspace.onDidSaveTextDocument((doc) => {
        DocumentWatcher_path.basename(doc.fileName) === '.editorconfig' && this.log('.editorconfig file saved.');
      })
    );

    subscriptions.push(
      external_vscode.workspace.onWillSaveTextDocument(async (e) => {
        let selections = [];
        const activeEditor = external_vscode.window.activeTextEditor;
        activeEditor && activeEditor.document === e.document && (selections = activeEditor.selections);
        const transformations = this.calculatePreSaveTransformations(e.document, e.reason);

        e.waitUntil(transformations);
        if (selections.length) {
          const edits = await transformations;
          activeEditor && edits.length && (activeEditor.selections = selections);
        }
      })
    );

    this.disposable = external_vscode.Disposable.from.apply(this, subscriptions);
  }

  onEmptyConfig(relativePath) {
    this.log(`${relativePath}: No configuration.`);
  }

  onBeforeResolve(relativePath) {
    this.log(`${relativePath}: Using EditorConfig core...`);
  }

  onNoActiveTextEditor() {
    this.log('No more open editors.');
  }

  onSuccess(newOptions) {
    if (!this.doc) {
      this.log(`[no file]: ${JSON.stringify(newOptions)}`);
      return;
    }
    const { relativePath } = resolveFile(this.doc);
    this.log(`${relativePath}: ${JSON.stringify(newOptions)}`);
  }

  log(...messages) {
    this.outputChannel.appendLine(messages.join(' '));
  }

  dispose() {
    this.disposable.dispose();
  }

  async calculatePreSaveTransformations(doc, reason) {
    const editorconfigSettings = await resolveCoreConfig(doc, { onBeforeResolve: this.onBeforeResolve }),
      relativePath = external_vscode.workspace.asRelativePath(doc.fileName);

    if (!editorconfigSettings) {
      this.log(`${relativePath}: No configuration found for pre-save.`);
      return [];
    }

    return [
      ...this.preSaveTransformations.flatMap((transformer) => {
        const { edits, message } = transformer.transform(editorconfigSettings, doc, reason);

        if (edits instanceof Error) {
          this.log(`${relativePath}: ${edits.message}`);
          return [];
        }
        message && this.log(`${relativePath}: ${message}`);
        return edits;
      })
    ];
  }
}

class Property {
  constructor(name, values, description) {
    this.name = name;
    this.values = values;
    this.description = description;
  }
}

class EditorConfigCompletionProvider {
  constructor() {
    this.properties = [
      new Property(
        'root',
        ['true', 'false', 'unset'],
        'Special property that should be specified at the top of the file outside of any sections. Set to true to stop .editorconfig files search on current file.'
      ),
      new Property(
        'charset',
        ['utf-8', 'utf-8-bom', 'utf-16be', 'utf-16le', 'latin1', 'unset'],
        'Set to latin1, utf-8, utf-8-bom, utf-16be or utf-16le to control the character set. Use of utf-8-bom is discouraged.'
      ),
      new Property(
        'end_of_line',
        ['lf', 'cr', 'crlf', 'unset'],
        'Set to lf, cr, or crlf to control how line breaks are represented.'
      ),
      new Property(
        'indent_style',
        ['tab', 'space', 'unset'],
        'Set to tab or space to use hard tabs or soft tabs respectively.'
      ),
      new Property(
        'indent_size',
        ['1', '2', '3', '4', '5', '6', '7', '8', 'unset'],
        'A whole number defining the number of columns used for each indentation level and the width of soft tabs (when supported). When set to tab, the value of tab_width (if specified) will be used.'
      ),
      new Property(
        'insert_final_newline',
        ['true', 'false', 'unset'],
        "Set to true to ensure file ends with a newline when saving and false to ensure it doesn't."
      ),
      new Property(
        'tab_width',
        ['1', '2', '3', '4', '5', '6', '7', '8', 'unset'],
        "A whole number defining the number of columns used to represent a tab character. This defaults to the value of indent_size and doesn't usually need to be specified."
      ),
      new Property(
        'trim_trailing_whitespace',
        ['true', 'false', 'unset'],
        "Set to true to remove any whitespace characters preceding newline characters and false to ensure it doesn't."
      )
    ];
  }

  provideCompletionItems(document, position) {
    const textOfEntireLine = document.getText(document.lineAt(position.line).range),
      textOfLineUpToCursor = textOfEntireLine.substring(0, position.character);

    return this.hasPropertyKey(textOfLineUpToCursor)
      ? this.autoCompletePropertyValues(textOfLineUpToCursor)
      : this.autoCompletePropertyNames(textOfEntireLine);
  }

  resolveCompletionItem(item) {
    return item;
  }

  autoCompletePropertyValues(textOfLineUpToCursor) {
    const propertyName = this.extractPropertyName(textOfLineUpToCursor),
      propertyValues = this.filterPropertyValues(propertyName);
    return this.convertPropertyValuesToCompletionItems(propertyValues);
  }

  autoCompletePropertyNames(textOfEntireLine) {
    return this.convertPropertyNamesToCompletionItems(this.properties, textOfEntireLine);
  }

  hasPropertyKey(lineText) {
    return this.hasEqualsSign(lineText);
  }

  hasEqualsSign(lineText) {
    return lineText.indexOf('=') >= 0;
  }

  extractPropertyName(lineText) {
    const lineTextParts = lineText.split('=');
    return lineTextParts.length === 0 ? '' : lineTextParts[0].trim().toLowerCase();
  }

  filterPropertyValues(propertyName) {
    const matchingProperty = this.properties.find((property) => property.name === propertyName);
    return matchingProperty === void 0 ? [] : matchingProperty.values;
  }

  convertPropertyNamesToCompletionItems(properties, textOfEntireLine) {
    const triggerSuggestCommand = { command: 'editorconfig._triggerSuggestAfterDelay', arguments: [], title: '' };

    return properties.map((property) => {
      const completionItem = new external_vscode.CompletionItem(
        property.name,
        external_vscode.CompletionItemKind.Property
      );

      completionItem.documentation = property.description;

      if (!this.hasEqualsSign(textOfEntireLine)) {
        completionItem.insertText = property.name + ' = ';
        completionItem.command = triggerSuggestCommand;
      }

      return completionItem;
    });
  }

  convertPropertyValuesToCompletionItems(values) {
    const valuesSortOrder = { true: '1', false: '2', unset: '9' };

    return values.map((value) => {
      const completionItem = new external_vscode.CompletionItem(value, external_vscode.CompletionItemKind.Value);

      completionItem.sortText = valuesSortOrder[value] || '3' + value;
      return completionItem;
    });
  }
}

function activate(ctx) {
  ctx.subscriptions.push(new DocumentWatcher());

  external_vscode.languages.registerCompletionItemProvider(
    { language: 'editorconfig', pattern: '**/.editorconfig', scheme: 'file' },
    new EditorConfigCompletionProvider()
  );

  external_vscode.commands.registerCommand('editorconfig._triggerSuggestAfterDelay', () => {
    setTimeout(() => {
      external_vscode.commands.executeCommand('editor.action.triggerSuggest');
    }, 100);
  });

  external_vscode.commands.registerCommand('EditorConfig.generate', generateEditorConfig);

  return { applyTextEditorOptions, fromEditorConfig, resolveCoreConfig, resolveTextEditorOptions, toEditorConfig };
}
})();

module.exports = __webpack_exports__;
