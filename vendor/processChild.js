"use strict";

var _types = require("./jest-worker")._types;

let file = null, setupArgs = [], initialized = !1;

const messageListener = request => {
  switch (request[0]) {
   case _types.CHILD_MESSAGE_INITIALIZE:
    file = request[2], setupArgs = request[3];
    break;

   case _types.CHILD_MESSAGE_CALL:
    const call = request;
    execMethod(call[2], call[3]);
    break;

   case _types.CHILD_MESSAGE_END:
    end();
    break;

   default:
    throw new TypeError("Unexpected request from parent process: " + request[0]);
  }
};

function reportSuccess(result) {
  if (!process || !process.send) throw new Error("Child can only be used on a forked process");
  process.send([ _types.PARENT_MESSAGE_OK, result ]);
}

function reportClientError(error) {
  return reportError(error, _types.PARENT_MESSAGE_CLIENT_ERROR);
}

function reportInitializeError(error) {
  return reportError(error, _types.PARENT_MESSAGE_SETUP_ERROR);
}

function reportError(error, type) {
  if (!process || !process.send) throw new Error("Child can only be used on a forked process");
  null == error && (error = new Error('"null" or "undefined" thrown')), process.send([ type, error.constructor && error.constructor.name, error.message, error.stack, "object" == typeof error ? {
    ...error
  } : error ]);
}

function end() {
  const main = require(file);
  main.teardown ? execFunction(main.teardown, main, [], exitProcess, exitProcess) : exitProcess();
}

function exitProcess() {
  process.removeListener("message", messageListener);
}

function execMethod(method, args) {
  const main = require(file);
  let fn;
  function execHelper() {
    execFunction(fn, main, args, reportSuccess, reportClientError);
  }
  fn = "default" === method ? main.__esModule ? main.default : main : main[method], 
  !initialized && main.setup ? (initialized = !0, execFunction(main.setup, main, setupArgs, execHelper, reportInitializeError)) : execHelper();
}

process.on("message", messageListener);

const isPromise = obj => !!obj && ("object" == typeof obj || "function" == typeof obj) && "function" == typeof obj.then;

function execFunction(fn, ctx, args, onResult, onError) {
  let result;
  try {
    result = fn.apply(ctx, args);
  } catch (err) {
    return void onError(err);
  }
  var obj;
  !(obj = result) || "object" != typeof obj && "function" != typeof obj || "function" != typeof obj.then ? onResult(result) : result.then(onResult, onError);
}