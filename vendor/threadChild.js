"use strict";

function _worker_threads() {
  const data = require("worker_threads");
  return _worker_threads = function() {
    return data;
  }, data;
}

var _types = require("./jest-worker")._types;

let file = null, setupArgs = [], initialized = !1;

const messageListener = request => {
  switch (request[0]) {
   case _types.CHILD_MESSAGE_INITIALIZE:
    file = request[2], setupArgs = request[3], process.env.JEST_WORKER_ID = request[4];
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
  if (_worker_threads().isMainThread) throw new Error("Child can only be used on a forked process");
  _worker_threads().parentPort.postMessage([ _types.PARENT_MESSAGE_OK, result ]);
}

function reportClientError(error) {
  return reportError(error, _types.PARENT_MESSAGE_CLIENT_ERROR);
}

function reportInitializeError(error) {
  return reportError(error, _types.PARENT_MESSAGE_SETUP_ERROR);
}

function reportError(error, type) {
  if (_worker_threads().isMainThread) throw new Error("Child can only be used on a forked process");
  null == error && (error = new Error('"null" or "undefined" thrown')), _worker_threads().parentPort.postMessage([ type, error.constructor && error.constructor.name, error.message, error.stack, "object" == typeof error ? {
    ...error
  } : error ]);
}

function end() {
  const main = require(file);
  main.teardown ? execFunction(main.teardown, main, [], exitProcess, exitProcess) : exitProcess();
}

function exitProcess() {
  _worker_threads().parentPort.removeListener("message", messageListener);
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

_worker_threads().parentPort.on("message", messageListener);

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