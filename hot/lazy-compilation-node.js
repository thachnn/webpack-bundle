"use strict";

var urlBase = decodeURIComponent(__resourceQuery.slice(1));

exports.keepAlive = function(options) {
  var response, data = options.data, onError = options.onError, active = options.active, module = options.module, request = (urlBase.startsWith("https") ? require("https") : require("http")).request(urlBase + data, {
    agent: !1,
    headers: {
      accept: "text/event-stream"
    }
  }, (function(res) {
    (response = res).on("error", errorHandler), active || module.hot || console.log("Hot Module Replacement is not enabled. Waiting for process restart...");
  }));
  function errorHandler(err) {
    err.message = "Problem communicating active modules to the server: " + err.message, 
    onError(err);
  }
  return request.on("error", errorHandler), request.end(), function() {
    response.destroy();
  };
};