"use strict";

function declare(builder) {
  return (api, options, dirname) => (api.assertVersion || (api = Object.assign(copyApiObject(api), {
    assertVersion(range) {
      throwVersionError(range, api.version);
    }
  })), builder(api, options || {}, dirname));
}

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
    version: version,
    range: range
  });
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.declare = declare;