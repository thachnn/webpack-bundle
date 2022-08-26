(() => {
  "use strict";
  var __webpack_modules__ = {
    397: (__unused_webpack_module, exports) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.PARENT_MESSAGE_SETUP_ERROR = exports.PARENT_MESSAGE_OK = exports.PARENT_MESSAGE_CUSTOM = exports.PARENT_MESSAGE_CLIENT_ERROR = exports.CHILD_MESSAGE_INITIALIZE = exports.CHILD_MESSAGE_END = exports.CHILD_MESSAGE_CALL = void 0;
      exports.CHILD_MESSAGE_INITIALIZE = 0;
      exports.CHILD_MESSAGE_CALL = 1;
      exports.CHILD_MESSAGE_END = 2;
      exports.PARENT_MESSAGE_OK = 0;
      exports.PARENT_MESSAGE_CLIENT_ERROR = 1;
      exports.PARENT_MESSAGE_SETUP_ERROR = 2;
      exports.PARENT_MESSAGE_CUSTOM = 3;
    },
    965: module => {
      module.exports = require;
    }
  }, __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (void 0 !== cachedModule) return cachedModule.exports;
    var module = __webpack_module_cache__[moduleId] = {
      exports: {}
    };
    return __webpack_modules__[moduleId](module, module.exports, __webpack_require__), 
    module.exports;
  }
  (() => {
    var _types = __webpack_require__(397);
    let file = null, setupArgs = [], initialized = !1;
    const messageListener = request => {
      switch (request[0]) {
       case _types.CHILD_MESSAGE_INITIALIZE:
        file = request[2], setupArgs = request[3];
        break;

       case _types.CHILD_MESSAGE_CALL:
        const call = request;
        !function(method, args) {
          const main = __webpack_require__(965)(file);
          let fn;
          fn = "default" === method ? main.__esModule ? main.default : main : main[method];
          function execHelper() {
            execFunction(fn, main, args, reportSuccess, reportClientError);
          }
          if (initialized || !main.setup) return void execHelper();
          initialized = !0, execFunction(main.setup, main, setupArgs, execHelper, reportInitializeError);
        }(call[2], call[3]);
        break;

       case _types.CHILD_MESSAGE_END:
        !function() {
          const main = __webpack_require__(965)(file);
          if (!main.teardown) return void exitProcess();
          execFunction(main.teardown, main, [], exitProcess, exitProcess);
        }();
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
    function exitProcess() {
      process.removeListener("message", messageListener);
    }
    process.on("message", messageListener);
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
  })();
})();