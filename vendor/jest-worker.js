(() => {
  "use strict";
  var __webpack_modules__ = {
    560: module => {
      module.exports = (flag, argv = process.argv) => {
        const prefix = flag.startsWith("-") ? "" : 1 === flag.length ? "-" : "--", position = argv.indexOf(prefix + flag), terminatorPosition = argv.indexOf("--");
        return -1 !== position && (-1 === terminatorPosition || position < terminatorPosition);
      };
    },
    641: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      var obj, _FifoQueue = (obj = __webpack_require__(283)) && obj.__esModule ? obj : {
        default: obj
      }, _types = __webpack_require__(397);
      function _defineProperty(obj, key, value) {
        return key in obj ? Object.defineProperty(obj, key, {
          value,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : obj[key] = value, obj;
      }
      exports.default = class {
        constructor(_numOfWorkers, _callback, options = {}) {
          var _options$workerSchedu, _options$taskQueue;
          _defineProperty(this, "_computeWorkerKey", void 0), _defineProperty(this, "_workerSchedulingPolicy", void 0), 
          _defineProperty(this, "_cacheKeys", Object.create(null)), _defineProperty(this, "_locks", []), 
          _defineProperty(this, "_offset", 0), _defineProperty(this, "_taskQueue", void 0), 
          this._numOfWorkers = _numOfWorkers, this._callback = _callback, this._computeWorkerKey = options.computeWorkerKey, 
          this._workerSchedulingPolicy = null !== (_options$workerSchedu = options.workerSchedulingPolicy) && void 0 !== _options$workerSchedu ? _options$workerSchedu : "round-robin", 
          this._taskQueue = null !== (_options$taskQueue = options.taskQueue) && void 0 !== _options$taskQueue ? _options$taskQueue : new _FifoQueue.default;
        }
        doWork(method, ...args) {
          const customMessageListeners = new Set, onCustomMessage = message => {
            customMessageListeners.forEach((listener => listener(message)));
          }, promise = new Promise(((args, resolve, reject) => {
            const computeWorkerKey = this._computeWorkerKey, request = [ _types.CHILD_MESSAGE_CALL, !1, method, args ];
            let worker = null, hash = null;
            computeWorkerKey && (hash = computeWorkerKey.call(this, method, ...args), worker = null == hash ? null : this._cacheKeys[hash]);
            const task = {
              onCustomMessage,
              onEnd: (error, result) => {
                customMessageListeners.clear(), error ? reject(error) : resolve(result);
              },
              onStart: worker => {
                null != hash && (this._cacheKeys[hash] = worker);
              },
              request
            };
            worker ? (this._taskQueue.enqueue(task, worker.getWorkerId()), this._process(worker.getWorkerId())) : this._push(task);
          }).bind(null, args));
          return promise.UNSTABLE_onCustomMessage = listener => (customMessageListeners.add(listener), 
          () => {
            customMessageListeners.delete(listener);
          }), promise;
        }
        _process(workerId) {
          if (this._isLocked(workerId)) return this;
          const task = this._taskQueue.dequeue(workerId);
          if (!task) return this;
          if (task.request[1]) throw new Error("Queue implementation returned processed task");
          const taskOnEnd = task.onEnd;
          return task.request[1] = !0, this._lock(workerId), this._callback(workerId, task.request, task.onStart, ((error, result) => {
            taskOnEnd(error, result), this._unlock(workerId), this._process(workerId);
          }), task.onCustomMessage), this;
        }
        _push(task) {
          this._taskQueue.enqueue(task);
          const offset = this._getNextWorkerOffset();
          for (let i = 0; i < this._numOfWorkers && (this._process((offset + i) % this._numOfWorkers), 
          !task.request[1]); i++) ;
          return this;
        }
        _getNextWorkerOffset() {
          switch (this._workerSchedulingPolicy) {
           case "in-order":
            return 0;

           case "round-robin":
            return this._offset++;
          }
        }
        _lock(workerId) {
          this._locks[workerId] = !0;
        }
        _unlock(workerId) {
          this._locks[workerId] = !1;
        }
        _isLocked(workerId) {
          return this._locks[workerId];
        }
      };
    },
    283: (__unused_webpack_module, exports) => {
      function _defineProperty(obj, key, value) {
        return key in obj ? Object.defineProperty(obj, key, {
          value,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : obj[key] = value, obj;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      exports.default = class {
        constructor() {
          _defineProperty(this, "_workerQueues", []), _defineProperty(this, "_sharedQueue", new InternalQueue);
        }
        enqueue(task, workerId) {
          if (null == workerId) return void this._sharedQueue.enqueue(task);
          let workerQueue = this._workerQueues[workerId];
          null == workerQueue && (workerQueue = this._workerQueues[workerId] = new InternalQueue);
          const item = {
            previousSharedTask: this._sharedQueue.peekLast(),
            task
          };
          workerQueue.enqueue(item);
        }
        dequeue(workerId) {
          var _this$_workerQueues$w, _workerTop$previousSh, _workerTop$previousSh2;
          const workerTop = null === (_this$_workerQueues$w = this._workerQueues[workerId]) || void 0 === _this$_workerQueues$w ? void 0 : _this$_workerQueues$w.peek(), sharedTaskIsProcessed = null === (_workerTop$previousSh = null == workerTop || null === (_workerTop$previousSh2 = workerTop.previousSharedTask) || void 0 === _workerTop$previousSh2 ? void 0 : _workerTop$previousSh2.request[1]) || void 0 === _workerTop$previousSh || _workerTop$previousSh;
          var _this$_workerQueues$w2, _this$_workerQueues$w3, _this$_workerQueues$w4;
          return null != workerTop && sharedTaskIsProcessed ? null !== (_this$_workerQueues$w2 = null === (_this$_workerQueues$w3 = this._workerQueues[workerId]) || void 0 === _this$_workerQueues$w3 || null === (_this$_workerQueues$w4 = _this$_workerQueues$w3.dequeue()) || void 0 === _this$_workerQueues$w4 ? void 0 : _this$_workerQueues$w4.task) && void 0 !== _this$_workerQueues$w2 ? _this$_workerQueues$w2 : null : this._sharedQueue.dequeue();
        }
      };
      class InternalQueue {
        constructor() {
          _defineProperty(this, "_head", null), _defineProperty(this, "_last", null);
        }
        enqueue(value) {
          const item = {
            next: null,
            value
          };
          null == this._last ? this._head = item : this._last.next = item, this._last = item;
        }
        dequeue() {
          if (null == this._head) return null;
          const item = this._head;
          return this._head = item.next, null == this._head && (this._last = null), item.value;
        }
        peek() {
          var _this$_head$value, _this$_head;
          return null !== (_this$_head$value = null === (_this$_head = this._head) || void 0 === _this$_head ? void 0 : _this$_head.value) && void 0 !== _this$_head$value ? _this$_head$value : null;
        }
        peekLast() {
          var _this$_last$value, _this$_last;
          return null !== (_this$_last$value = null === (_this$_last = this._last) || void 0 === _this$_last ? void 0 : _this$_last.value) && void 0 !== _this$_last$value ? _this$_last$value : null;
        }
      }
    },
    460: (__unused_webpack_module, exports) => {
      function _defineProperty(obj, key, value) {
        return key in obj ? Object.defineProperty(obj, key, {
          value,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : obj[key] = value, obj;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      exports.default = class {
        constructor(_computePriority) {
          _defineProperty(this, "_queue", []), _defineProperty(this, "_sharedQueue", new MinHeap), 
          this._computePriority = _computePriority;
        }
        enqueue(task, workerId) {
          if (null == workerId) this._enqueue(task, this._sharedQueue); else {
            const queue = this._getWorkerQueue(workerId);
            this._enqueue(task, queue);
          }
        }
        _enqueue(task, queue) {
          const item = {
            priority: this._computePriority(task.request[2], ...task.request[3]),
            task
          };
          queue.add(item);
        }
        dequeue(workerId) {
          const workerQueue = this._getWorkerQueue(workerId), workerTop = workerQueue.peek(), sharedTop = this._sharedQueue.peek();
          var _workerQueue$poll$tas, _workerQueue$poll;
          return null == sharedTop || null != workerTop && workerTop.priority <= sharedTop.priority ? null !== (_workerQueue$poll$tas = null === (_workerQueue$poll = workerQueue.poll()) || void 0 === _workerQueue$poll ? void 0 : _workerQueue$poll.task) && void 0 !== _workerQueue$poll$tas ? _workerQueue$poll$tas : null : this._sharedQueue.poll().task;
        }
        _getWorkerQueue(workerId) {
          let queue = this._queue[workerId];
          return null == queue && (queue = this._queue[workerId] = new MinHeap), queue;
        }
      };
      class MinHeap {
        constructor() {
          _defineProperty(this, "_heap", []);
        }
        peek() {
          var _this$_heap$;
          return null !== (_this$_heap$ = this._heap[0]) && void 0 !== _this$_heap$ ? _this$_heap$ : null;
        }
        add(item) {
          const nodes = this._heap;
          if (nodes.push(item), 1 === nodes.length) return;
          let currentIndex = nodes.length - 1;
          for (;currentIndex > 0; ) {
            const parentIndex = Math.floor((currentIndex + 1) / 2) - 1, parent = nodes[parentIndex];
            if (parent.priority <= item.priority) break;
            nodes[currentIndex] = parent, nodes[parentIndex] = item, currentIndex = parentIndex;
          }
        }
        poll() {
          const nodes = this._heap, result = nodes[0], lastElement = nodes.pop();
          if (null == result || 0 === nodes.length) return null != result ? result : null;
          let index = 0;
          nodes[0] = null != lastElement ? lastElement : null;
          const element = nodes[0];
          for (;;) {
            let swapIndex = null;
            const rightChildIndex = 2 * (index + 1), leftChildIndex = rightChildIndex - 1, rightChild = nodes[rightChildIndex], leftChild = nodes[leftChildIndex];
            if (null != leftChild && leftChild.priority < element.priority && (swapIndex = leftChildIndex), 
            null != rightChild && rightChild.priority < (null == swapIndex ? element : leftChild).priority && (swapIndex = rightChildIndex), 
            null == swapIndex) break;
            nodes[index] = nodes[swapIndex], nodes[swapIndex] = element, index = swapIndex;
          }
          return result;
        }
      }
    },
    694: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      var obj, _BaseWorkerPool = (obj = __webpack_require__(91)) && obj.__esModule ? obj : {
        default: obj
      };
      class WorkerPool extends _BaseWorkerPool.default {
        send(workerId, request, onStart, onEnd, onCustomMessage) {
          this.getWorkerById(workerId).send(request, onStart, onEnd, onCustomMessage);
        }
        createWorker(workerOptions) {
          let Worker;
          return Worker = this._options.enableWorkerThreads && (() => {
            try {
              return __webpack_require__(267), !0;
            } catch {
              return !1;
            }
          })() ? __webpack_require__(163).Z : __webpack_require__(518).Z, new Worker(workerOptions);
        }
      }
      var _default = WorkerPool;
      exports.default = _default;
    },
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
    163: (__unused_webpack_module, exports, __webpack_require__) => {
      function path() {
        const data = function(obj, nodeInterop) {
          if (!nodeInterop && obj && obj.__esModule) return obj;
          if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
            default: obj
          };
          var cache = _getRequireWildcardCache(nodeInterop);
          if (cache && cache.has(obj)) return cache.get(obj);
          var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var key in obj) if ("default" !== key && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
          }
          newObj.default = obj, cache && cache.set(obj, newObj);
          return newObj;
        }(__webpack_require__(17));
        return path = function() {
          return data;
        }, data;
      }
      function _stream() {
        const data = __webpack_require__(781);
        return _stream = function() {
          return data;
        }, data;
      }
      function _worker_threads() {
        const data = __webpack_require__(267);
        return _worker_threads = function() {
          return data;
        }, data;
      }
      function _mergeStream() {
        const data = (obj = __webpack_require__(34)) && obj.__esModule ? obj : {
          default: obj
        };
        var obj;
        return _mergeStream = function() {
          return data;
        }, data;
      }
      exports.Z = void 0;
      var _types = __webpack_require__(397);
      function _getRequireWildcardCache(nodeInterop) {
        if ("function" != typeof WeakMap) return null;
        var cacheBabelInterop = new WeakMap, cacheNodeInterop = new WeakMap;
        return (_getRequireWildcardCache = function(nodeInterop) {
          return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
        })(nodeInterop);
      }
      function _defineProperty(obj, key, value) {
        return key in obj ? Object.defineProperty(obj, key, {
          value,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : obj[key] = value, obj;
      }
      exports.Z = class {
        constructor(options) {
          _defineProperty(this, "_worker", void 0), _defineProperty(this, "_options", void 0), 
          _defineProperty(this, "_request", void 0), _defineProperty(this, "_retries", void 0), 
          _defineProperty(this, "_onProcessEnd", void 0), _defineProperty(this, "_onCustomMessage", void 0), 
          _defineProperty(this, "_fakeStream", void 0), _defineProperty(this, "_stdout", void 0), 
          _defineProperty(this, "_stderr", void 0), _defineProperty(this, "_exitPromise", void 0), 
          _defineProperty(this, "_resolveExitPromise", void 0), _defineProperty(this, "_forceExited", void 0), 
          this._options = options, this._request = null, this._fakeStream = null, this._stdout = null, 
          this._stderr = null, this._exitPromise = new Promise((resolve => {
            this._resolveExitPromise = resolve;
          })), this._forceExited = !1, this.initialize();
        }
        initialize() {
          if (this._worker = new (_worker_threads().Worker)(path().resolve(__dirname, "./threadChild.js"), {
            eval: !1,
            resourceLimits: this._options.resourceLimits,
            stderr: !0,
            stdout: !0,
            workerData: this._options.workerData,
            ...this._options.forkOptions
          }), this._worker.stdout && (this._stdout || (this._stdout = (0, _mergeStream().default)(this._getFakeStream())), 
          this._stdout.add(this._worker.stdout)), this._worker.stderr && (this._stderr || (this._stderr = (0, 
          _mergeStream().default)(this._getFakeStream())), this._stderr.add(this._worker.stderr)), 
          this._worker.on("message", this._onMessage.bind(this)), this._worker.on("exit", this._onExit.bind(this)), 
          this._worker.postMessage([ _types.CHILD_MESSAGE_INITIALIZE, !1, this._options.workerPath, this._options.setupArgs, String(this._options.workerId + 1) ]), 
          this._retries++, this._retries > this._options.maxRetries) {
            const error = new Error("Call retries were exceeded");
            this._onMessage([ _types.PARENT_MESSAGE_CLIENT_ERROR, error.name, error.message, error.stack, {
              type: "WorkerError"
            } ]);
          }
        }
        _shutdown() {
          this._fakeStream && (this._fakeStream.end(), this._fakeStream = null), this._resolveExitPromise();
        }
        _onMessage(response) {
          let error;
          switch (response[0]) {
           case _types.PARENT_MESSAGE_OK:
            this._onProcessEnd(null, response[1]);
            break;

           case _types.PARENT_MESSAGE_CLIENT_ERROR:
            if (error = response[4], null != error && "object" == typeof error) {
              const extra = error, NativeCtor = global[response[1]];
              error = new ("function" == typeof NativeCtor ? NativeCtor : Error)(response[2]), 
              error.type = response[1], error.stack = response[3];
              for (const key in extra) error[key] = extra[key];
            }
            this._onProcessEnd(error, null);
            break;

           case _types.PARENT_MESSAGE_SETUP_ERROR:
            error = new Error("Error when calling setup: " + response[2]), error.type = response[1], 
            error.stack = response[3], this._onProcessEnd(error, null);
            break;

           case _types.PARENT_MESSAGE_CUSTOM:
            this._onCustomMessage(response[1]);
            break;

           default:
            throw new TypeError("Unexpected response from worker: " + response[0]);
          }
        }
        _onExit(exitCode) {
          0 === exitCode || this._forceExited ? this._shutdown() : (this.initialize(), this._request && this._worker.postMessage(this._request));
        }
        waitForExit() {
          return this._exitPromise;
        }
        forceExit() {
          this._forceExited = !0, this._worker.terminate();
        }
        send(request, onProcessStart, onProcessEnd, onCustomMessage) {
          onProcessStart(this), this._onProcessEnd = (...args) => {
            var _onProcessEnd;
            this._request = null;
            const res = null === (_onProcessEnd = onProcessEnd) || void 0 === _onProcessEnd ? void 0 : _onProcessEnd(...args);
            return onProcessEnd = null, res;
          }, this._onCustomMessage = (...arg) => onCustomMessage(...arg), this._request = request, 
          this._retries = 0, this._worker.postMessage(request);
        }
        getWorkerId() {
          return this._options.workerId;
        }
        getStdout() {
          return this._stdout;
        }
        getStderr() {
          return this._stderr;
        }
        _getFakeStream() {
          return this._fakeStream || (this._fakeStream = new (_stream().PassThrough)), this._fakeStream;
        }
      };
    },
    909: (__unused_webpack_module, exports, __webpack_require__) => {
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = function(message, parentProcess = process) {
        if (isWorkerThread) {
          const {parentPort} = __webpack_require__(267);
          parentPort.postMessage([ _types.PARENT_MESSAGE_CUSTOM, message ]);
        } else {
          if ("function" != typeof parentProcess.send) throw new Error('"messageParent" can only be used inside a worker');
          parentProcess.send([ _types.PARENT_MESSAGE_CUSTOM, message ]);
        }
      };
      var _types = __webpack_require__(397);
      const isWorkerThread = (() => {
        try {
          const {isMainThread, parentPort} = __webpack_require__(267);
          return !isMainThread && null != parentPort;
        } catch {
          return !1;
        }
      })();
    },
    34: (module, __unused_webpack_exports, __webpack_require__) => {
      const {PassThrough} = __webpack_require__(781);
      module.exports = function() {
        var sources = [], output = new PassThrough({
          objectMode: !0
        });
        return output.setMaxListeners(0), output.add = add, output.isEmpty = isEmpty, output.on("unpipe", remove), 
        Array.prototype.slice.call(arguments).forEach(add), output;
        function add(source) {
          return Array.isArray(source) ? (source.forEach(add), this) : (sources.push(source), 
          source.once("end", remove.bind(null, source)), source.once("error", output.emit.bind(output, "error")), 
          source.pipe(output, {
            end: !1
          }), this);
        }
        function isEmpty() {
          return 0 == sources.length;
        }
        function remove(source) {
          !(sources = sources.filter((function(it) {
            return it !== source;
          }))).length && output.readable && output.end();
        }
      };
    },
    91: (__unused_webpack_module, exports, __webpack_require__) => {
      function path() {
        const data = function(obj, nodeInterop) {
          if (!nodeInterop && obj && obj.__esModule) return obj;
          if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
            default: obj
          };
          var cache = _getRequireWildcardCache(nodeInterop);
          if (cache && cache.has(obj)) return cache.get(obj);
          var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
          for (var key in obj) if ("default" !== key && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
          }
          newObj.default = obj, cache && cache.set(obj, newObj);
          return newObj;
        }(__webpack_require__(17));
        return path = function() {
          return data;
        }, data;
      }
      function _mergeStream() {
        const data = (obj = __webpack_require__(34)) && obj.__esModule ? obj : {
          default: obj
        };
        var obj;
        return _mergeStream = function() {
          return data;
        }, data;
      }
      Object.defineProperty(exports, "__esModule", {
        value: !0
      }), exports.default = void 0;
      var _types = __webpack_require__(397);
      function _getRequireWildcardCache(nodeInterop) {
        if ("function" != typeof WeakMap) return null;
        var cacheBabelInterop = new WeakMap, cacheNodeInterop = new WeakMap;
        return (_getRequireWildcardCache = function(nodeInterop) {
          return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
        })(nodeInterop);
      }
      function _defineProperty(obj, key, value) {
        return key in obj ? Object.defineProperty(obj, key, {
          value,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : obj[key] = value, obj;
      }
      const emptyMethod = () => {};
      exports.default = class {
        constructor(workerPath, options) {
          _defineProperty(this, "_stderr", void 0), _defineProperty(this, "_stdout", void 0), 
          _defineProperty(this, "_options", void 0), _defineProperty(this, "_workers", void 0), 
          this._options = options, this._workers = new Array(options.numWorkers), path().isAbsolute(workerPath) || (workerPath = __webpack_require__(965).resolve(workerPath));
          const stdout = (0, _mergeStream().default)(), stderr = (0, _mergeStream().default)(), {forkOptions, maxRetries, resourceLimits, setupArgs} = options;
          for (let i = 0; i < options.numWorkers; i++) {
            const workerOptions = {
              forkOptions,
              maxRetries,
              resourceLimits,
              setupArgs,
              workerId: i,
              workerPath
            }, worker = this.createWorker(workerOptions), workerStdout = worker.getStdout(), workerStderr = worker.getStderr();
            workerStdout && stdout.add(workerStdout), workerStderr && stderr.add(workerStderr), 
            this._workers[i] = worker;
          }
          this._stdout = stdout, this._stderr = stderr;
        }
        getStderr() {
          return this._stderr;
        }
        getStdout() {
          return this._stdout;
        }
        getWorkers() {
          return this._workers;
        }
        getWorkerById(workerId) {
          return this._workers[workerId];
        }
        createWorker(_workerOptions) {
          throw Error("Missing method createWorker in WorkerPool");
        }
        async end() {
          const workerExitPromises = this._workers.map((async worker => {
            worker.send([ _types.CHILD_MESSAGE_END, !1 ], emptyMethod, emptyMethod, emptyMethod);
            let forceExited = !1;
            const forceExitTimeout = setTimeout((() => {
              worker.forceExit(), forceExited = !0;
            }), 500);
            return await worker.waitForExit(), clearTimeout(forceExitTimeout), forceExited;
          }));
          return (await Promise.all(workerExitPromises)).reduce(((result, forceExited) => ({
            forceExited: result.forceExited || forceExited
          })), {
            forceExited: !1
          });
        }
      };
    },
    518: (__unused_webpack_module, exports, __webpack_require__) => {
      function _child_process() {
        const data = __webpack_require__(81);
        return _child_process = function() {
          return data;
        }, data;
      }
      function _stream() {
        const data = __webpack_require__(781);
        return _stream = function() {
          return data;
        }, data;
      }
      function _mergeStream() {
        const data = (obj = __webpack_require__(34)) && obj.__esModule ? obj : {
          default: obj
        };
        var obj;
        return _mergeStream = function() {
          return data;
        }, data;
      }
      function _supportsColor() {
        const data = __webpack_require__(130);
        return _supportsColor = function() {
          return data;
        }, data;
      }
      exports.Z = void 0;
      var _types = __webpack_require__(397);
      function _defineProperty(obj, key, value) {
        return key in obj ? Object.defineProperty(obj, key, {
          value,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : obj[key] = value, obj;
      }
      exports.Z = class {
        constructor(options) {
          _defineProperty(this, "_child", void 0), _defineProperty(this, "_options", void 0), 
          _defineProperty(this, "_request", void 0), _defineProperty(this, "_retries", void 0), 
          _defineProperty(this, "_onProcessEnd", void 0), _defineProperty(this, "_onCustomMessage", void 0), 
          _defineProperty(this, "_fakeStream", void 0), _defineProperty(this, "_stdout", void 0), 
          _defineProperty(this, "_stderr", void 0), _defineProperty(this, "_exitPromise", void 0), 
          _defineProperty(this, "_resolveExitPromise", void 0), this._options = options, this._request = null, 
          this._fakeStream = null, this._stdout = null, this._stderr = null, this._exitPromise = new Promise((resolve => {
            this._resolveExitPromise = resolve;
          })), this.initialize();
        }
        initialize() {
          const forceColor = _supportsColor().stdout ? {
            FORCE_COLOR: "1"
          } : {}, child = (0, _child_process().fork)(__webpack_require__(17).resolve(__dirname, "./processChild.js"), [], {
            cwd: process.cwd(),
            env: {
              ...process.env,
              JEST_WORKER_ID: String(this._options.workerId + 1),
              ...forceColor
            },
            execArgv: process.execArgv.filter((v => !/^--(debug|inspect)/.test(v))),
            silent: !0,
            ...this._options.forkOptions
          });
          if (child.stdout && (this._stdout || (this._stdout = (0, _mergeStream().default)(this._getFakeStream())), 
          this._stdout.add(child.stdout)), child.stderr && (this._stderr || (this._stderr = (0, 
          _mergeStream().default)(this._getFakeStream())), this._stderr.add(child.stderr)), 
          child.on("message", this._onMessage.bind(this)), child.on("exit", this._onExit.bind(this)), 
          child.send([ _types.CHILD_MESSAGE_INITIALIZE, !1, this._options.workerPath, this._options.setupArgs ]), 
          this._child = child, this._retries++, this._retries > this._options.maxRetries) {
            const error = new Error(`Jest worker encountered ${this._retries} child process exceptions, exceeding retry limit`);
            this._onMessage([ _types.PARENT_MESSAGE_CLIENT_ERROR, error.name, error.message, error.stack, {
              type: "WorkerError"
            } ]);
          }
        }
        _shutdown() {
          this._fakeStream && (this._fakeStream.end(), this._fakeStream = null), this._resolveExitPromise();
        }
        _onMessage(response) {
          let error;
          switch (response[0]) {
           case _types.PARENT_MESSAGE_OK:
            this._onProcessEnd(null, response[1]);
            break;

           case _types.PARENT_MESSAGE_CLIENT_ERROR:
            if (error = response[4], null != error && "object" == typeof error) {
              const extra = error, NativeCtor = global[response[1]];
              error = new ("function" == typeof NativeCtor ? NativeCtor : Error)(response[2]), 
              error.type = response[1], error.stack = response[3];
              for (const key in extra) error[key] = extra[key];
            }
            this._onProcessEnd(error, null);
            break;

           case _types.PARENT_MESSAGE_SETUP_ERROR:
            error = new Error("Error when calling setup: " + response[2]), error.type = response[1], 
            error.stack = response[3], this._onProcessEnd(error, null);
            break;

           case _types.PARENT_MESSAGE_CUSTOM:
            this._onCustomMessage(response[1]);
            break;

           default:
            throw new TypeError("Unexpected response from worker: " + response[0]);
          }
        }
        _onExit(exitCode) {
          0 !== exitCode && null !== exitCode && 143 !== exitCode && 137 !== exitCode ? (this.initialize(), 
          this._request && this._child.send(this._request)) : this._shutdown();
        }
        send(request, onProcessStart, onProcessEnd, onCustomMessage) {
          onProcessStart(this), this._onProcessEnd = (...args) => (this._request = null, onProcessEnd(...args)), 
          this._onCustomMessage = (...arg) => onCustomMessage(...arg), this._request = request, 
          this._retries = 0, this._child.send(request, (() => {}));
        }
        waitForExit() {
          return this._exitPromise;
        }
        forceExit() {
          this._child.kill("SIGTERM");
          const sigkillTimeout = setTimeout((() => this._child.kill("SIGKILL")), 500);
          this._exitPromise.then((() => clearTimeout(sigkillTimeout)));
        }
        getWorkerId() {
          return this._options.workerId;
        }
        getStdout() {
          return this._stdout;
        }
        getStderr() {
          return this._stderr;
        }
        _getFakeStream() {
          return this._fakeStream || (this._fakeStream = new (_stream().PassThrough)), this._fakeStream;
        }
      };
    },
    130: (module, __unused_webpack_exports, __webpack_require__) => {
      const os = __webpack_require__(37), tty = __webpack_require__(224), hasFlag = __webpack_require__(560), {env} = process;
      let flagForceColor;
      function supportsColor(haveStream, {streamIsTTY, sniffFlags = !0} = {}) {
        const noFlagForceColor = function() {
          if ("FORCE_COLOR" in env) return "true" === env.FORCE_COLOR ? 1 : "false" === env.FORCE_COLOR ? 0 : 0 === env.FORCE_COLOR.length ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
        }();
        void 0 !== noFlagForceColor && (flagForceColor = noFlagForceColor);
        const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
        if (0 === forceColor) return 0;
        if (sniffFlags) {
          if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) return 3;
          if (hasFlag("color=256")) return 2;
        }
        if (haveStream && !streamIsTTY && void 0 === forceColor) return 0;
        const min = forceColor || 0;
        if ("dumb" === env.TERM) return min;
        if ("win32" === process.platform) {
          const osRelease = os.release().split(".");
          return Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586 ? Number(osRelease[2]) >= 14931 ? 3 : 2 : 1;
        }
        if ("CI" in env) return [ "TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE", "DRONE" ].some((sign => sign in env)) || "codeship" === env.CI_NAME ? 1 : min;
        if ("TEAMCITY_VERSION" in env) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
        if ("truecolor" === env.COLORTERM) return 3;
        if ("TERM_PROGRAM" in env) {
          const version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
          switch (env.TERM_PROGRAM) {
           case "iTerm.app":
            return version >= 3 ? 3 : 2;

           case "Apple_Terminal":
            return 2;
          }
        }
        return /-256(color)?$/i.test(env.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM) || "COLORTERM" in env ? 1 : min;
      }
      function getSupportLevel(stream, options = {}) {
        return function(level) {
          return 0 !== level && {
            level,
            hasBasic: !0,
            has256: level >= 2,
            has16m: level >= 3
          };
        }(supportsColor(stream, {
          streamIsTTY: stream && stream.isTTY,
          ...options
        }));
      }
      hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never") ? flagForceColor = 0 : (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) && (flagForceColor = 1), 
      module.exports = {
        supportsColor: getSupportLevel,
        stdout: getSupportLevel({
          isTTY: tty.isatty(1)
        }),
        stderr: getSupportLevel({
          isTTY: tty.isatty(2)
        })
      };
    },
    965: module => {
      module.exports = require;
    },
    81: module => {
      module.exports = require("child_process");
    },
    37: module => {
      module.exports = require("os");
    },
    17: module => {
      module.exports = require("path");
    },
    781: module => {
      module.exports = require("stream");
    },
    224: module => {
      module.exports = require("tty");
    },
    267: module => {
      module.exports = require("worker_threads");
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
  var __webpack_exports__ = {};
  (() => {
    var exports = __webpack_exports__;
    function _os() {
      const data = __webpack_require__(37);
      return _os = function() {
        return data;
      }, data;
    }
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), Object.defineProperty(exports, "FifoQueue", {
      enumerable: !0,
      get: function() {
        return _FifoQueue.default;
      }
    }), Object.defineProperty(exports, "PriorityQueue", {
      enumerable: !0,
      get: function() {
        return _PriorityQueue.default;
      }
    }), exports.Worker = void 0, Object.defineProperty(exports, "messageParent", {
      enumerable: !0,
      get: function() {
        return _messageParent.default;
      }
    });
    var _Farm = _interopRequireDefault(__webpack_require__(641)), _WorkerPool = _interopRequireDefault(__webpack_require__(694)), _PriorityQueue = _interopRequireDefault(__webpack_require__(460)), _FifoQueue = _interopRequireDefault(__webpack_require__(283)), _messageParent = _interopRequireDefault(__webpack_require__(909));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _defineProperty(obj, key, value) {
      return key in obj ? Object.defineProperty(obj, key, {
        value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : obj[key] = value, obj;
    }
    exports.Worker = class {
      constructor(workerPath, options) {
        var _this$_options$enable, _this$_options$forkOp, _this$_options$maxRet, _this$_options$numWor, _this$_options$resour, _this$_options$setupA;
        _defineProperty(this, "_ending", void 0), _defineProperty(this, "_farm", void 0), 
        _defineProperty(this, "_options", void 0), _defineProperty(this, "_workerPool", void 0), 
        this._options = {
          ...options
        }, this._ending = !1;
        const workerPoolOptions = {
          enableWorkerThreads: null !== (_this$_options$enable = this._options.enableWorkerThreads) && void 0 !== _this$_options$enable && _this$_options$enable,
          forkOptions: null !== (_this$_options$forkOp = this._options.forkOptions) && void 0 !== _this$_options$forkOp ? _this$_options$forkOp : {},
          maxRetries: null !== (_this$_options$maxRet = this._options.maxRetries) && void 0 !== _this$_options$maxRet ? _this$_options$maxRet : 3,
          numWorkers: null !== (_this$_options$numWor = this._options.numWorkers) && void 0 !== _this$_options$numWor ? _this$_options$numWor : Math.max((0, 
          _os().cpus)().length - 1, 1),
          resourceLimits: null !== (_this$_options$resour = this._options.resourceLimits) && void 0 !== _this$_options$resour ? _this$_options$resour : {},
          setupArgs: null !== (_this$_options$setupA = this._options.setupArgs) && void 0 !== _this$_options$setupA ? _this$_options$setupA : []
        };
        this._options.WorkerPool ? this._workerPool = new this._options.WorkerPool(workerPath, workerPoolOptions) : this._workerPool = new _WorkerPool.default(workerPath, workerPoolOptions), 
        this._farm = new _Farm.default(workerPoolOptions.numWorkers, this._workerPool.send.bind(this._workerPool), {
          computeWorkerKey: this._options.computeWorkerKey,
          taskQueue: this._options.taskQueue,
          workerSchedulingPolicy: this._options.workerSchedulingPolicy
        }), this._bindExposedWorkerMethods(workerPath, this._options);
      }
      _bindExposedWorkerMethods(workerPath, options) {
        (function(workerPath, options) {
          let exposedMethods = options.exposedMethods;
          if (!exposedMethods) {
            const module = __webpack_require__(965)(workerPath);
            exposedMethods = Object.keys(module).filter((name => "function" == typeof module[name])), 
            "function" == typeof module && (exposedMethods = [ ...exposedMethods, "default" ]);
          }
          return exposedMethods;
        })(workerPath, options).forEach((name => {
          if (!name.startsWith("_")) {
            if (this.constructor.prototype.hasOwnProperty(name)) throw new TypeError("Cannot define a method called " + name);
            this[name] = this._callFunctionWithArgs.bind(this, name);
          }
        }));
      }
      _callFunctionWithArgs(method, ...args) {
        if (this._ending) throw new Error("Farm is ended, no more calls can be done to it");
        return this._farm.doWork(method, ...args);
      }
      getStderr() {
        return this._workerPool.getStderr();
      }
      getStdout() {
        return this._workerPool.getStdout();
      }
      async end() {
        if (this._ending) throw new Error("Farm is ended, no more calls can be done to it");
        return this._ending = !0, this._workerPool.end();
      }
    };
  })();
  var __webpack_export_target__ = exports;
  for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  __webpack_exports__.__esModule && Object.defineProperty(__webpack_export_target__, "__esModule", {
    value: !0
  });
})();