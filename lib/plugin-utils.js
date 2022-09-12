"use strict";

function declare(builder) {
  return (api, options, dirname) => {
    var _clonedApi2;
    let clonedApi;
    for (const name of Object.keys(apiPolyfills)) {
      var _clonedApi;
      api[name] || (clonedApi = null != (_clonedApi = clonedApi) ? _clonedApi : copyApiObject(api), 
      clonedApi[name] = apiPolyfills[name](clonedApi));
    }
    return builder(null != (_clonedApi2 = clonedApi) ? _clonedApi2 : api, options || {}, dirname);
  };
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.declare = declare;

const apiPolyfills = {
  assertVersion: api => range => {
    throwVersionError(range, api.version);
  },
  targets: () => () => ({}),
  assumption: () => () => {}
};

function copyApiObject(api) {
  let proto = null;
  return "string" == typeof api.version && /^7\./.test(api.version) && (proto = Object.getPrototypeOf(api), 
  !proto || has(proto, "version") && has(proto, "transform") && has(proto, "template") && has(proto, "types") || (proto = null)), 
  Object.assign({}, proto, api);
}

function has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function throwVersionError(range, version) {
  if ("number" == typeof range) {
    if (!Number.isInteger(range)) throw new Error("Expected string or integer value.");
    range = `^${range}.0.0-0`;
  }
  if ("string" != typeof range) throw new Error("Expected string or integer value.");
  const limit = Error.stackTraceLimit;
  let err;
  throw "number" == typeof limit && limit < 25 && (Error.stackTraceLimit = 25), err = "7." === version.slice(0, 2) ? new Error(`Requires Babel "^7.0.0-beta.41", but was loaded with "${version}". You'll need to update your @babel/core version.`) : new Error(`Requires Babel "${range}", but was loaded with "${version}". If you are sure you have a compatible version of @babel/core, it is likely that something in your build process is loading the wrong version. Inspect the stack trace of this error to look for the first entry that doesn't mention "@babel/core" or "babel-core" to see what is calling Babel.`), 
  "number" == typeof limit && (Error.stackTraceLimit = limit), Object.assign(err, {
    code: "BABEL_VERSION_UNSUPPORTED",
    version,
    range
  });
}