"use strict";

if ("function" != typeof EventSource) throw new Error("Environment doesn't support lazy compilation (requires EventSource)");

var activeEventSource, urlBase = decodeURIComponent(__resourceQuery.slice(1)), activeKeys = new Map, errorHandlers = new Set, updateEventSource = function() {
  activeEventSource && activeEventSource.close(), activeKeys.size ? (activeEventSource = new EventSource(urlBase + Array.from(activeKeys.keys()).join("@"))).onerror = function(event) {
    errorHandlers.forEach((function(onError) {
      onError(new Error("Problem communicating active modules to the server: " + event.message + " " + event.filename + ":" + event.lineno + ":" + event.colno + " " + event.error));
    }));
  } : activeEventSource = void 0;
};

exports.keepAlive = function(options) {
  var data = options.data, onError = options.onError, active = options.active, module = options.module;
  errorHandlers.add(onError);
  var value = activeKeys.get(data) || 0;
  return activeKeys.set(data, value + 1), 0 === value && updateEventSource(), active || module.hot || console.log("Hot Module Replacement is not enabled. Waiting for process restart..."), 
  function() {
    errorHandlers.delete(onError), setTimeout((function() {
      var value = activeKeys.get(data);
      1 === value ? (activeKeys.delete(data), updateEventSource()) : activeKeys.set(data, value - 1);
    }), 1e3);
  };
};