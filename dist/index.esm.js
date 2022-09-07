import React, { useRef, useState, useEffect, useContext, useCallback } from 'react';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  _regeneratorRuntime = function () {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) keys.push(key);

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var StageContext = /*#__PURE__*/React.createContext(null);

var throttle = function throttle(fn) {
  var tick = false;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (!tick) {
      requestAnimationFrame(function () {
        fn.apply(void 0, args);
        tick = false;
      });
    }

    tick = true;
  };
};

var ScaleMode = {
  SCALE_TO_FIT: Math.min,
  SCALE_TO_COVER: Math.max
};
function Stage(_ref) {
  var scaleMode = _ref.scaleMode,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 300 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 300 : _ref$height,
      _ref$backgroundColor = _ref.backgroundColor,
      backgroundColor = _ref$backgroundColor === void 0 ? 'transparent' : _ref$backgroundColor,
      children = _ref.children;
  var stageElement = useRef(null);

  var _useState = useState(1),
      _useState2 = _slicedToArray(_useState, 2),
      scale = _useState2[0],
      setScale = _useState2[1];

  useEffect(function () {
    if (typeof scaleMode !== 'function') {
      return;
    }

    var onWindowResize = throttle(function () {
      var scaleX = window.innerWidth / width;
      var scaleY = window.innerHeight / height;
      setScale(scaleMode(scaleX, scaleY));
    });
    window.addEventListener('resize', onWindowResize);
    onWindowResize();
    return function () {
      window.removeEventListener('resize', onWindowResize);
    };
  }, [scaleMode, width, height]);
  return /*#__PURE__*/React.createElement(StageContext.Provider, {
    value: {
      width: width,
      height: height,
      scale: scale
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "".concat(width * scale, "px"),
      height: "".concat(height * scale, "px"),
      backgroundColor: backgroundColor,
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: stageElement,
    style: {
      width: "".concat(width, "px"),
      height: "".concat(height, "px"),
      transformOrigin: '0 0',
      transform: "scale(".concat(scale, ")")
    }
  }, children)));
}

var registerCustomElement = function registerCustomElement(name, constructor) {
  customElements.get(name) || customElements.define(name, constructor);
};
var localCoordinatesFromEvent = function localCoordinatesFromEvent(rect, event, scale) {
  var clientX = event.clientX,
      clientY = event.clientY;
  var x = (clientX - rect.x) / scale;
  var y = (clientY - rect.y) / scale;
  return {
    x: x,
    y: y
  };
};
var createElement = function createElement(type) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var element = document.createElement(type);

  for (var _i = 0, _Object$keys = Object.keys(props); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    element[key] = props[key];
  }

  return element;
};
var eventInit = function eventInit(sourceEvent) {
  var bubbles = sourceEvent.bubbles,
      cancelable = sourceEvent.cancelable,
      composed = sourceEvent.composed;
  return {
    bubbles: bubbles,
    cancelable: cancelable,
    composed: composed
  };
};
var uIEventInit = function uIEventInit(sourceEvent) {
  var detail = sourceEvent.detail,
      view = sourceEvent.view,
      sourceCapabilities = sourceEvent.sourceCapabilities;
  return _objectSpread2(_objectSpread2({}, eventInit(sourceEvent)), {}, {
    detail: detail,
    view: view,
    sourceCapabilities: sourceCapabilities
  });
};
var mouseEventInit = function mouseEventInit(sourceEvent) {
  var screenX = sourceEvent.screenX,
      screenY = sourceEvent.screenY,
      clientX = sourceEvent.clientX,
      clientY = sourceEvent.clientY,
      ctrlKey = sourceEvent.ctrlKey,
      shiftKey = sourceEvent.shiftKey,
      altKey = sourceEvent.altKey,
      metaKey = sourceEvent.metaKey,
      button = sourceEvent.button,
      buttons = sourceEvent.buttons,
      relatedTarget = sourceEvent.relatedTarget,
      region = sourceEvent.region;
  return _objectSpread2(_objectSpread2({}, uIEventInit(sourceEvent)), {}, {
    screenX: screenX,
    screenY: screenY,
    clientX: clientX,
    clientY: clientY,
    ctrlKey: ctrlKey,
    shiftKey: shiftKey,
    altKey: altKey,
    metaKey: metaKey,
    button: button,
    buttons: buttons,
    relatedTarget: relatedTarget,
    region: region
  });
};
var wheelEventInit = function wheelEventInit(sourceEvent) {
  var deltaX = sourceEvent.deltaX,
      deltaY = sourceEvent.deltaY,
      deltaZ = sourceEvent.deltaZ,
      deltaMode = sourceEvent.deltaMode;
  return _objectSpread2(_objectSpread2({}, mouseEventInit(sourceEvent)), {}, {
    deltaX: deltaX,
    deltaY: deltaY,
    deltaZ: deltaZ,
    deltaMode: deltaMode
  });
};
var keyboardEventInit = function keyboardEventInit(sourceEvent) {
  var altKey = sourceEvent.altKey,
      code = sourceEvent.code,
      ctrlKey = sourceEvent.ctrlKey,
      isComposing = sourceEvent.isComposing,
      key = sourceEvent.key,
      locale = sourceEvent.locale,
      location = sourceEvent.location,
      metaKey = sourceEvent.metaKey,
      repeat = sourceEvent.repeat,
      shiftKey = sourceEvent.shiftKey;
  return _objectSpread2(_objectSpread2({}, uIEventInit(sourceEvent)), {}, {
    altKey: altKey,
    code: code,
    ctrlKey: ctrlKey,
    isComposing: isComposing,
    key: key,
    locale: locale,
    location: location,
    metaKey: metaKey,
    repeat: repeat,
    shiftKey: shiftKey
  });
};
var touchEventInit = function touchEventInit(sourceEvent) {
  var touches = sourceEvent.touches,
      targetTouches = sourceEvent.targetTouches,
      changedTouches = sourceEvent.changedTouches,
      ctrlKey = sourceEvent.ctrlKey,
      shiftKey = sourceEvent.shiftKey,
      altKey = sourceEvent.altKey,
      metaKey = sourceEvent.metaKey;
  return _objectSpread2(_objectSpread2({}, uIEventInit(sourceEvent)), {}, {
    touches: touches,
    targetTouches: targetTouches,
    changedTouches: changedTouches,
    ctrlKey: ctrlKey,
    shiftKey: shiftKey,
    altKey: altKey,
    metaKey: metaKey
  });
};
var touchInit = function touchInit(sourceTouch) {
  var identifier = sourceTouch.identifier,
      target = sourceTouch.target,
      clientX = sourceTouch.clientX,
      clientY = sourceTouch.clientY,
      screenX = sourceTouch.screenX,
      screenY = sourceTouch.screenY,
      pageX = sourceTouch.pageX,
      pageY = sourceTouch.pageY,
      radiusX = sourceTouch.radiusX,
      radiusY = sourceTouch.radiusY,
      rotationAngle = sourceTouch.rotationAngle,
      force = sourceTouch.force;
  return {
    identifier: identifier,
    target: target,
    clientX: clientX,
    clientY: clientY,
    screenX: screenX,
    screenY: screenY,
    pageX: pageX,
    pageY: pageY,
    radiusX: radiusX,
    radiusY: radiusY,
    rotationAngle: rotationAngle,
    force: force
  };
};

var ColorIncrementer = /*#__PURE__*/function () {
  function ColorIncrementer() {
    var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;

    _classCallCheck(this, ColorIncrementer);

    this.step = step;
    this.rgb = [0, 0, 0];
  }

  _createClass(ColorIncrementer, [{
    key: "reset",
    value: function reset() {
      this.rgb = [0, 0, 0];
    }
  }, {
    key: "next",
    value: function next() {
      for (var index = 0; index < 3; index++) {
        if (this.rgb[index] + this.step < 256) {
          this.rgb[index] += this.step;
          return "rgb(".concat(this.rgb.join(','), ")");
        } else if (index < 2) {
          this.rgb[index] = 0;
        }
      }

      throw new Error('Color incrementer overflow');
    }
  }]);

  return ColorIncrementer;
}();

var _excluded$8 = ["children", "scaleX", "scaleY", "offsetX", "offsetY", "tabIndex"];
var colorIncrementer = new ColorIncrementer();
var hitElementMap = new Map();

var notNullFilter = function notNullFilter(item) {
  return item !== null;
};

var clear = function clear(ctx) {
  var transform = ctx.getTransform();

  if (!transform.isIdentity) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

var scaleAndTranslate = function scaleAndTranslate(ctx) {
  var scaleX = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var scaleY = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var dx = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var dy = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  ctx.setTransform(scaleX, 0, 0, scaleY, dx, dy);
};

function Layer(_ref) {
  var children = _ref.children,
      scaleX = _ref.scaleX,
      scaleY = _ref.scaleY,
      offsetX = _ref.offsetX,
      offsetY = _ref.offsetY,
      tabIndex = _ref.tabIndex,
      rest = _objectWithoutProperties(_ref, _excluded$8);

  var _useContext = useContext(StageContext),
      scale = _useContext.scale,
      width = _useContext.width,
      height = _useContext.height;

  var hoveredElement = useRef(null);
  var touchEntities = useRef({});
  var canvasElement = useRef(null);
  var hitCanvasElement = useRef(createElement('canvas', {
    width: width,
    height: height
  }));
  var lastSibling = useRef(null);
  useEffect(function () {
    lastSibling.current = canvasElement.current.parentNode.querySelector('canvas:last-of-type');
  }, [canvasElement]);
  var drawChildren = useCallback(function (ctx, children) {
    var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      x: 0,
      y: 0,
      opacity: 1,
      rotation: 0,
      scaleX: 1,
      scaleY: 1
    };
    Array.from(children).sort(function (a, b) {
      return a.zIndex - b.zIndex;
    }).forEach(function (child) {
      child.draw(ctx, offset); // Assume all children in top most layer might have mouse / touch event handlers

      if (lastSibling.current && lastSibling.current === canvasElement.current) {
        var _ctx = hitCanvasElement.current.getContext('2d');

        var color = colorIncrementer.next();
        hitElementMap.set(color, child);
        child.drawHitArea(_ctx, offset, color);
      }

      if (child.children.length > 0) {
        drawChildren(ctx, child.children, {
          x: child.x + offset.x,
          y: child.y + offset.y,
          opacity: child.opacity * offset.opacity,
          rotation: child.rotation + offset.rotation,
          scaleX: child.scaleX * offset.scaleX,
          scaleY: child.scaleY * offset.scaleY
        });
      }
    });
  }, [lastSibling]);
  useEffect(function () {
    var canvas = canvasElement.current;
    var ctx = canvas.getContext('2d');
    var hitCanvas = hitCanvasElement.current;
    var hitCtx = hitCanvas.getContext('2d');
    var onUpdate = throttle(function (event) {
      clear(ctx);
      clear(hitCtx);
      colorIncrementer.reset();
      var willTransform = typeof scaleX !== 'undefined' || typeof scaleY !== 'undefined' || typeof offsetX !== 'undefined' || typeof offsetY !== 'undefined';

      if (willTransform) {
        scaleAndTranslate(ctx, scaleX, scaleY, offsetX, offsetY);
        scaleAndTranslate(hitCtx, scaleX, scaleY, offsetX, offsetY);
      }

      drawChildren(ctx, canvasElement.current.children);
    });
    requestAnimationFrame(onUpdate);
    canvas.addEventListener('attributeChange', onUpdate);
    canvas.addEventListener('connect', onUpdate);
    canvas.addEventListener('disconnect', onUpdate);
    canvas.addEventListener('load', onUpdate);
    return function () {
      canvas.removeEventListener('attributeChange', onUpdate);
      canvas.removeEventListener('connect', onUpdate);
      canvas.removeEventListener('disconnect', onUpdate);
      canvas.removeEventListener('load', onUpdate);
    };
  }, [drawChildren, scaleX, scaleY, offsetX, offsetY]);

  var getEventTargetAt = function getEventTargetAt(point) {
    var ctx = hitCanvasElement.current.getContext('2d');
    var pixel = ctx.getImageData(point.x, point.y, 1, 1).data;
    var color = "rgb(".concat(pixel[0], ",").concat(pixel[1], ",").concat(pixel[2], ")");
    return hitElementMap.get(color);
  };

  var onTouchStart = function onTouchStart(event) {
    if (event.target !== canvasElement.current) {
      return;
    }

    var rect = event.target.getBoundingClientRect();
    var changedTouches = Array.from(event.changedTouches).map(function (changedTouch) {
      var point = localCoordinatesFromEvent(rect, changedTouch, scale);
      var target = getEventTargetAt(point);

      if (!target) {
        return null;
      }

      var touch = new Touch(_objectSpread2(_objectSpread2({}, touchInit(changedTouch)), {}, {
        target: target,
        clientX: point.x,
        clientY: point.y
      }));
      touchEntities.current[touch.identifier] = touch;
      return touch;
    }).filter(notNullFilter);
    changedTouches.forEach(function (changedTouch) {
      changedTouch.target.dispatchEvent(new TouchEvent('touchstart', _objectSpread2(_objectSpread2({}, touchEventInit(event)), {}, {
        touches: Object.values(touchEntities.current),
        targetTouches: Object.values(touchEntities.current).filter(function (targetTouch) {
          return targetTouch.target === changedTouch.target;
        }),
        changedTouches: changedTouches
      })));
    });
  };

  var onTouchEvent = function onTouchEvent(event) {
    if (event.target !== canvasElement.current) {
      return;
    }

    var rect = event.target.getBoundingClientRect();

    var touchMapper = function touchMapper(touch) {
      if (!touchEntities.current[touch.identifier]) {
        return null;
      }

      var point = localCoordinatesFromEvent(rect, touch, scale);
      return new Touch(_objectSpread2(_objectSpread2({}, touchInit(touch)), {}, {
        target: touchEntities.current[touch.identifier].target,
        clientX: point.x,
        clientY: point.y
      }));
    };

    var touches = Array.from(event.touches).map(touchMapper).filter(notNullFilter);
    var targetTouches = touches.filter(function (touch) {
      return touch.target === event.target;
    });
    var changedTouches = Array.from(event.changedTouches).map(touchMapper).filter(notNullFilter); // This will fire duplicate touch `moveevents` if there are multiple touches,
    // but hard to avoid...

    var touchTargets = event.type === 'touchmove' ? touches : changedTouches;
    touchTargets.forEach(function (touch) {
      touch.target.dispatchEvent(new TouchEvent(event.type, _objectSpread2(_objectSpread2({}, touchEventInit(event)), {}, {
        touches: touches,
        targetTouches: targetTouches,
        changedTouches: changedTouches
      })));
    });

    if (event.type === 'touchend' || event.type === 'touchcancel') {
      var _iterator = _createForOfIteratorHelper(event.changedTouches),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var touch = _step.value;
          delete touchEntities.current[touch.identifier];
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  };

  var onWheelEvent = function onWheelEvent(event) {
    if (event.target !== canvasElement.current) {
      return;
    }

    var rect = event.target.getBoundingClientRect();
    var point = localCoordinatesFromEvent(rect, event, scale);
    var childTarget = getEventTargetAt(point);

    var eventInit = _objectSpread2(_objectSpread2({}, wheelEventInit(event)), {}, {
      clientX: point.x,
      clientY: point.y
    }); // Handle wheel event for Layer component by calling corresponding passed
    // event handler


    Object.keys(rest).forEach(function (key) {
      if (key.toLowerCase() === "on".concat(event.type)) {
        rest[key](new WheelEvent(event.type, eventInit));
      }
    }); // Handle mouse events for child components

    if (childTarget) {
      childTarget.dispatchEvent(new WheelEvent(event.type, eventInit));
    }
  };

  var onKeyboardEvent = function onKeyboardEvent(event) {
    if (event.target !== canvasElement.current) {
      return;
    }

    var eventInit = keyboardEventInit(event); // Handle keyboard event for Layer component by calling corresponding passed
    // event handler

    Object.keys(rest).forEach(function (key) {
      if (key.toLowerCase() === "on".concat(event.type)) {
        rest[key](new KeyboardEvent(event.type, eventInit));
      }
    });
  };

  var onMouseEvent = function onMouseEvent(event) {
    if (event.target !== canvasElement.current) {
      return;
    }

    var rect = event.target.getBoundingClientRect();
    var point = localCoordinatesFromEvent(rect, event, scale);
    var childTarget = getEventTargetAt(point);

    var eventInit = _objectSpread2(_objectSpread2({}, mouseEventInit(event)), {}, {
      clientX: point.x,
      clientY: point.y
    }); // Handle mouse event for Layer component by calling corresponding passed
    // event handler


    Object.keys(rest).forEach(function (key) {
      if (key.toLowerCase() === "on".concat(event.type)) {
        rest[key](new MouseEvent(event.type, eventInit));
      }
    }); // Handle mouse events for child components

    if (childTarget) {
      childTarget.dispatchEvent(new MouseEvent(event.type, _objectSpread2(_objectSpread2({}, mouseEventInit(event)), {}, {
        clientX: point.x,
        clientY: point.y
      })));

      if (event.type === 'mousemove') {
        if (hoveredElement.current && childTarget !== hoveredElement.current) {
          hoveredElement.current.dispatchEvent(new MouseEvent('mouseout', eventInit));
        }

        if (hoveredElement.current !== childTarget) {
          hoveredElement.current = childTarget;
          hoveredElement.current.dispatchEvent(new MouseEvent('mouseover', eventInit));
        }
      }
    } else if (event.type === 'mouseout' && hoveredElement.current) {
      hoveredElement.current.dispatchEvent(new MouseEvent('mouseout', eventInit));
      hoveredElement.current = null;
    }
  };

  return /*#__PURE__*/React.createElement("canvas", {
    style: {
      position: 'absolute'
    },
    width: width,
    height: height,
    ref: canvasElement,
    onClick: onMouseEvent,
    onMouseMove: onMouseEvent,
    onMouseDown: onMouseEvent,
    onMouseUp: onMouseEvent,
    onDoubleClick: onMouseEvent,
    onContextMenu: onMouseEvent,
    onMouseOut: onMouseEvent,
    onMouseOver: onMouseEvent,
    onTouchStart: onTouchStart,
    onTouchMove: onTouchEvent,
    onTouchEnd: onTouchEvent,
    onTouchCancel: onTouchEvent,
    onWheel: onWheelEvent,
    onKeyDown: onKeyboardEvent,
    onKeyUp: onKeyboardEvent,
    onKeyPress: onKeyboardEvent,
    tabIndex: tabIndex
  }, children);
}

var AbstractShape = /*#__PURE__*/function (_HTMLElement) {
  _inherits(AbstractShape, _HTMLElement);

  var _super = _createSuper(AbstractShape);

  function AbstractShape() {
    var _this;

    _classCallCheck(this, AbstractShape);

    _this = _super.call(this);
    _this.offset = {
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1
    };
    _this.pipeline = [];
    _this.canvasElement = null;
    return _this;
  }

  _createClass(AbstractShape, [{
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue) {
      if (this.canvasElement) {
        var customEvent = new CustomEvent('attributeChange', {
          bubbles: true,
          detail: {
            name: name,
            oldValue: oldValue,
            newValue: newValue
          }
        });
        this.canvasElement.dispatchEvent(customEvent);
      }
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      this.canvasElement = this.closest('canvas');

      if (this.canvasElement) {
        var customEvent = new CustomEvent('connect', {
          bubbles: true
        });
        this.canvasElement.dispatchEvent(customEvent);
      }
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      if (this.canvasElement) {
        var customEvent = new CustomEvent('disconnect', {
          bubbles: true
        });
        this.canvasElement.dispatchEvent(customEvent);
        this.canvasElement = null;
      }
    }
  }, {
    key: "getTextualAttribute",
    value: function getTextualAttribute(attributeName) {
      var _this$getAttribute;

      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      return (_this$getAttribute = this.getAttribute(attributeName)) !== null && _this$getAttribute !== void 0 ? _this$getAttribute : defaultValue;
    }
  }, {
    key: "getNumericAttribute",
    value: function getNumericAttribute(attributeName) {
      var _this$getAttribute2;

      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return Number((_this$getAttribute2 = this.getAttribute(attributeName)) !== null && _this$getAttribute2 !== void 0 ? _this$getAttribute2 : defaultValue);
    }
  }, {
    key: "getBooleanAttribute",
    value: function getBooleanAttribute(attributeName) {
      return this.hasAttribute(attributeName);
    }
  }, {
    key: "setBooleanAttribute",
    value: function setBooleanAttribute(attributeName, value) {
      if (value) {
        this.setAttribute(attributeName, '');
      } else {
        this.removeAttribute(attributeName);
      }
    }
  }, {
    key: "x",
    get: function get() {
      return this.getNumericAttribute('x');
    },
    set: function set(value) {
      this.setAttribute('x', value);
    }
  }, {
    key: "y",
    get: function get() {
      return this.getNumericAttribute('y');
    },
    set: function set(value) {
      this.setAttribute('y', value);
    }
  }, {
    key: "backgroundColor",
    get: function get() {
      return this.getAttribute('backgroundColor');
    },
    set: function set(value) {
      this.setAttribute('backgroundColor', value);
    }
  }, {
    key: "backgroundImage",
    get: function get() {
      return this.getAttribute('backgroundImage');
    },
    set: function set(value) {
      this.setAttribute('backgroundImage', value);
    }
  }, {
    key: "borderColor",
    get: function get() {
      return this.getAttribute('borderColor');
    },
    set: function set(value) {
      this.setAttribute('borderColor', value);
    }
  }, {
    key: "borderWidth",
    get: function get() {
      return this.getNumericAttribute('borderWidth', 1);
    },
    set: function set(value) {
      this.setAttribute('borderWidth', value);
    }
  }, {
    key: "opacity",
    get: function get() {
      return this.getNumericAttribute('opacity', 1);
    },
    set: function set(value) {
      this.setAttribute('opacity', value);
    }
  }, {
    key: "originX",
    get: function get() {
      return this.getNumericAttribute('originX', 0.5);
    },
    set: function set(value) {
      this.setAttribute('originX', value);
    }
  }, {
    key: "originY",
    get: function get() {
      return this.getNumericAttribute('originY', 0.5);
    },
    set: function set(value) {
      this.setAttribute('originY', value);
    }
  }, {
    key: "rotation",
    get: function get() {
      return this.getNumericAttribute('rotation');
    },
    set: function set(value) {
      this.setAttribute('rotation', value);
    }
  }, {
    key: "scaleX",
    get: function get() {
      return this.getNumericAttribute('scaleX', 1);
    },
    set: function set(value) {
      this.setAttribute('scaleX', value);
    }
  }, {
    key: "scaleY",
    get: function get() {
      return this.getNumericAttribute('scaleY', 1);
    },
    set: function set(value) {
      this.setAttribute('scaleY', value);
    }
  }, {
    key: "shadowColor",
    get: function get() {
      return this.getAttribute('shadowColor');
    },
    set: function set(value) {
      this.setAttribute('shadowColor', value);
    }
  }, {
    key: "shadowBlur",
    get: function get() {
      return this.getNumericAttribute('shadowBlur');
    },
    set: function set(value) {
      this.setAttribute('shadowBlur', value);
    }
  }, {
    key: "shadowOffsetX",
    get: function get() {
      return this.getNumericAttribute('shadowOffsetX');
    },
    set: function set(value) {
      this.setAttribute('shadowOffsetX', value);
    }
  }, {
    key: "shadowOffsetY",
    get: function get() {
      return this.getNumericAttribute('shadowOffsetY');
    },
    set: function set(value) {
      this.setAttribute('shadowOffsetY', value);
    }
  }, {
    key: "borderDash",
    get: function get() {
      var _this$getAttribute$sp, _this$getAttribute3;

      return (_this$getAttribute$sp = (_this$getAttribute3 = this.getAttribute('borderDash')) === null || _this$getAttribute3 === void 0 ? void 0 : _this$getAttribute3.split(',').map(function (item) {
        return Number(item);
      })) !== null && _this$getAttribute$sp !== void 0 ? _this$getAttribute$sp : [];
    },
    set: function set(value) {
      this.setAttribute('borderDash', value);
    }
  }, {
    key: "zIndex",
    get: function get() {
      return this.getNumericAttribute('zIndex');
    },
    set: function set(value) {
      this.setAttribute('zIndex', value);
    }
  }, {
    key: "getBoundingBox",
    value: function getBoundingBox() {
      throw new Error('Method must be implemented in sub class');
    }
  }, {
    key: "getTranslationCenter",
    value: function getTranslationCenter(offset) {
      throw new Error('Method must be implemented in sub class');
    }
  }, {
    key: "drawHitArea",
    value: function drawHitArea(ctx, offset, color) {
      throw new Error('Method must be implemented in sub class');
    }
  }, {
    key: "draw",
    value: function draw(ctx, offset) {
      throw new Error('Method must be implemented in sub class');
    }
  }, {
    key: "drawPipeline",
    value: function drawPipeline(ctx, offset) {
      ctx.save();

      while ((_this$pipeline$shift = this.pipeline.shift()) !== null && _this$pipeline$shift !== void 0 && _this$pipeline$shift.call(this, ctx, offset)) {
        var _this$pipeline$shift;
      }

      this.pipeline = [];
      ctx.restore();
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['x', 'y', 'backgroundcolor', 'backgroundimage', 'bordercolor', 'borderwidth', 'opacity', 'originx', 'originy', 'rotation', 'scalex', 'scaley', 'shadowcolor', 'shadowblur', 'shadowoffsetx', 'shadowoffsety', 'borderdash', 'zindex'];
    }
  }]);

  return AbstractShape;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

var traceRectangle = function traceRectangle(rectangle) {
  return function (ctx, offset) {
    var _rectangle$getBoundin = rectangle.getBoundingBox(offset),
        left = _rectangle$getBoundin.left,
        top = _rectangle$getBoundin.top,
        right = _rectangle$getBoundin.right,
        bottom = _rectangle$getBoundin.bottom;

    ctx.beginPath();
    ctx.rect(left + rectangle.borderWidth / 2, top + rectangle.borderWidth / 2, right - left - rectangle.borderWidth, bottom - top - rectangle.borderWidth);
    return true;
  };
};
var traceRoundedRectangle = function traceRoundedRectangle(roundedRectangle) {
  return function (ctx, offset) {
    var _roundedRectangle$get = roundedRectangle.getBoundingBox(offset),
        left = _roundedRectangle$get.left,
        top = _roundedRectangle$get.top,
        right = _roundedRectangle$get.right,
        bottom = _roundedRectangle$get.bottom;

    var radius = roundedRectangle.radius;
    var x = left + roundedRectangle.borderWidth / 2;
    var y = top + roundedRectangle.borderWidth / 2;
    var width = right - left - roundedRectangle.borderWidth;
    var height = bottom - top - roundedRectangle.borderWidth;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    return true;
  };
};

var rotateAndScale = function rotateAndScale(shape) {
  return function (ctx, offset) {
    var scaleX = shape.scaleX * offset.scaleX;
    var scaleY = shape.scaleY * offset.scaleY;
    var rotation = shape.rotation + offset.rotation;

    if (scaleX !== 1 || scaleY !== 1 || rotation !== 0) {
      var translate = shape.getTranslationCenter(offset);
      ctx.translate(translate.x, translate.y);
      ctx.rotate(rotation);
      ctx.scale(scaleX, scaleY);
      ctx.translate(-translate.x, -translate.y);
    }

    return true;
  };
};
var shade = function shade(shape) {
  return function (ctx, offset) {
    var globalAlpha = shape.opacity * offset.opacity;

    if (globalAlpha !== 1) {
      ctx.globalAlpha = globalAlpha;
    }

    if (shape.shadowColor) {
      ctx.shadowColor = shape.shadowColor;
    }

    if (shape.shadowBlur !== 0) {
      ctx.shadowBlur = shape.shadowBlur;
    }

    if (shape.shadowOffsetX !== 0) {
      ctx.shadowOffsetX = shape.shadowOffsetX;
    }

    if (shape.shadowOffsetY !== 0) {
      ctx.shadowOffsetY = shape.shadowOffsetY;
    }

    return true;
  };
};
var fillAndStroke = function fillAndStroke(shape) {
  return function (ctx, offset) {
    var _shape$borderDash;

    if (shape.backgroundColor) {
      ctx.fillStyle = shape.backgroundColor;
      ctx.fill();
    }

    if ((_shape$borderDash = shape.borderDash) !== null && _shape$borderDash !== void 0 && _shape$borderDash.length) {
      ctx.setLineDash(shape.borderDash);
    }

    if (shape.borderColor && shape.borderWidth) {
      ctx.strokeStyle = shape.borderColor;
      ctx.lineWidth = shape.borderWidth;
      ctx.stroke();
    }

    return true;
  };
};

var imageCache = {};
var drawBackgroundImage = function drawBackgroundImage(shape) {
  return function (ctx, offset) {
    if (!shape.image) {
      return true;
    }

    var _shape$getBoundingBox = shape.getBoundingBox(offset),
        left = _shape$getBoundingBox.left,
        right = _shape$getBoundingBox.right,
        top = _shape$getBoundingBox.top,
        bottom = _shape$getBoundingBox.bottom;

    var width = right - left;
    var height = bottom - top;
    ctx.drawImage(shape.image, left, top, width, height);
    return true;
  };
};
var drawImage = function drawImage(image) {
  return function (ctx, offset) {
    var _image$getBoundingBox = image.getBoundingBox(offset),
        left = _image$getBoundingBox.left,
        top = _image$getBoundingBox.top;

    ctx.drawImage(image.image, left + image.borderWidth, top + image.borderWidth, image.width - image.borderWidth * 2, image.height - image.borderWidth * 2);
    return true;
  };
};
var clipBackgroundImage = function clipBackgroundImage(shape) {
  return function (ctx, offset) {
    if (!shape.image) {
      return true;
    }

    ctx.clip();
    return true;
  };
};

var loadImage = function loadImage(shape, ctx, src) {
  if (!src) {
    if (shape.image) {
      delete shape.image;
    }

    return true;
  }

  shape.image = imageCache[src];

  if (!shape.image) {
    shape.image = new Image();

    shape.image.onload = function () {
      var customEvent = new CustomEvent('load', {
        bubbles: true
      });
      shape.dispatchEvent(customEvent);
    };

    shape.image.src = src;
    imageCache[src] = shape.image;
  }

  return shape.image.complete;
};

var loadSrc = function loadSrc(shape) {
  return function (ctx, offset) {
    var src = shape.src;
    return loadImage(shape, ctx, src);
  };
};
var loadBackgroundImage = function loadBackgroundImage(shape) {
  return function (ctx, offset) {
    var backgroundImage = shape.backgroundImage;
    return loadImage(shape, ctx, backgroundImage);
  };
};

var _excluded$7 = ["children"];
var CanvasRectangle = /*#__PURE__*/function (_AbstractShape) {
  _inherits(CanvasRectangle, _AbstractShape);

  var _super = _createSuper(CanvasRectangle);

  function CanvasRectangle() {
    _classCallCheck(this, CanvasRectangle);

    return _super.apply(this, arguments);
  }

  _createClass(CanvasRectangle, [{
    key: "width",
    get: function get() {
      return this.getNumericAttribute('width');
    },
    set: function set(value) {
      this.setAttribute('width', value);
    }
  }, {
    key: "height",
    get: function get() {
      return this.getNumericAttribute('height');
    },
    set: function set(value) {
      this.setAttribute('height', value);
    }
  }, {
    key: "getBoundingBox",
    value: function getBoundingBox(offset) {
      var left = this.x + offset.x - this.width * this.originX;
      var top = this.y + offset.y - this.height * this.originY;
      var right = left + this.width;
      var bottom = top + this.height;
      return {
        left: left,
        right: right,
        top: top,
        bottom: bottom
      };
    }
  }, {
    key: "getTranslationCenter",
    value: function getTranslationCenter(offset) {
      var _this$getBoundingBox = this.getBoundingBox(offset),
          top = _this$getBoundingBox.top,
          left = _this$getBoundingBox.left;

      var x = left + this.width * this.originX;
      var y = top + this.height * this.originY;
      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "drawHitArea",
    value: function drawHitArea(ctx, offset, color) {
      var backgroundColor = this.backgroundColor,
          backgroundImage = this.backgroundImage,
          borderColor = this.borderColor,
          borderWidth = this.borderWidth;
      this.pipeline.push(rotateAndScale(this));
      this.pipeline.push(traceRectangle(this));
      this.pipeline.push(fillAndStroke({
        backgroundColor: backgroundColor || backgroundImage ? color : undefined,
        borderColor: borderColor ? color : undefined,
        borderWidth: borderWidth
      }));
      this.drawPipeline(ctx, offset);
    }
  }, {
    key: "draw",
    value: function draw(ctx, offset) {
      this.pipeline.push(loadBackgroundImage(this));
      this.pipeline.push(rotateAndScale(this));
      this.pipeline.push(traceRectangle(this));
      this.pipeline.push(shade(this));
      this.pipeline.push(fillAndStroke(this));
      this.pipeline.push(clipBackgroundImage(this));
      this.pipeline.push(drawBackgroundImage(this));
      this.drawPipeline(ctx, offset);
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return [].concat(_toConsumableArray(AbstractShape.observedAttributes), ['width', 'height']);
    }
  }]);

  return CanvasRectangle;
}(AbstractShape);
registerCustomElement('canvas-rectangle', CanvasRectangle);
var rectangle = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, _excluded$7);

  return /*#__PURE__*/React.createElement("canvas-rectangle", _extends({}, props, {
    ref: ref
  }), children);
});

var _excluded$6 = ["children"];
var CanvasImage = /*#__PURE__*/function (_CanvasRectangle) {
  _inherits(CanvasImage, _CanvasRectangle);

  var _super = _createSuper(CanvasImage);

  function CanvasImage() {
    _classCallCheck(this, CanvasImage);

    return _super.call(this);
  }

  _createClass(CanvasImage, [{
    key: "src",
    get: function get() {
      return this.getAttribute('src');
    },
    set: function set(value) {
      this.setAttribute('src', value);
    }
  }, {
    key: "drawHitArea",
    value: function drawHitArea(ctx, offset, color) {
      var backgroundColor = this.backgroundColor,
          src = this.src,
          borderColor = this.borderColor,
          borderWidth = this.borderWidth;
      this.pipeline.push(rotateAndScale(this));
      this.pipeline.push(traceRectangle(this));
      this.pipeline.push(fillAndStroke({
        backgroundColor: backgroundColor || src ? color : undefined,
        borderColor: borderColor ? color : undefined,
        borderWidth: borderWidth
      }));
      this.drawPipeline(ctx, offset);
    }
  }, {
    key: "draw",
    value: function draw(ctx, offset) {
      this.pipeline.push(loadSrc(this));
      this.pipeline.push(rotateAndScale(this));
      this.pipeline.push(traceRectangle(this));
      this.pipeline.push(shade(this));
      this.pipeline.push(fillAndStroke(this));
      this.pipeline.push(drawImage(this));
      this.drawPipeline(ctx, offset);
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return [].concat(_toConsumableArray(CanvasRectangle.observedAttributes), ['src']);
    }
  }]);

  return CanvasImage;
}(CanvasRectangle);
registerCustomElement('canvas-image', CanvasImage);
var image = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, _excluded$6);

  return /*#__PURE__*/React.createElement("canvas-image", _extends({}, props, {
    ref: ref
  }), children);
});

var traceArc = function traceArc(arc) {
  return function (ctx, offset) {
    var _arc$startAngle, _arc$endAngle, _arc$counterclockwise;

    var _arc$getBoundingBox = arc.getBoundingBox(offset),
        left = _arc$getBoundingBox.left,
        top = _arc$getBoundingBox.top;

    ctx.beginPath();
    ctx.arc(left + arc.radius, top + arc.radius, arc.radius - arc.borderWidth / 2, ((_arc$startAngle = arc.startAngle) !== null && _arc$startAngle !== void 0 ? _arc$startAngle : 0) - Math.PI / 2, ((_arc$endAngle = arc.endAngle) !== null && _arc$endAngle !== void 0 ? _arc$endAngle : Math.PI * 2) - Math.PI / 2, (_arc$counterclockwise = arc.counterclockwise) !== null && _arc$counterclockwise !== void 0 ? _arc$counterclockwise : false);
    return true;
  };
};

var _excluded$5 = ["children"];
var CanvasCircle = /*#__PURE__*/function (_AbstractShape) {
  _inherits(CanvasCircle, _AbstractShape);

  var _super = _createSuper(CanvasCircle);

  function CanvasCircle() {
    _classCallCheck(this, CanvasCircle);

    return _super.apply(this, arguments);
  }

  _createClass(CanvasCircle, [{
    key: "radius",
    get: function get() {
      return this.getNumericAttribute('radius');
    },
    set: function set(value) {
      this.setAttribute('radius', value);
    }
  }, {
    key: "getBoundingBox",
    value: function getBoundingBox(offset) {
      var left = this.x + offset.x - this.radius * 2 * this.originX;
      var top = this.y + offset.y - this.radius * 2 * this.originY;
      var right = left + this.radius * 2;
      var bottom = top + this.radius * 2;
      return {
        left: left,
        right: right,
        top: top,
        bottom: bottom
      };
    }
  }, {
    key: "getTranslationCenter",
    value: function getTranslationCenter(offset) {
      var _this$getBoundingBox = this.getBoundingBox(offset),
          top = _this$getBoundingBox.top,
          left = _this$getBoundingBox.left;

      var x = left + this.radius * this.originX * 2;
      var y = top + this.radius * this.originY * 2;
      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "drawHitArea",
    value: function drawHitArea(ctx, offset, color) {
      var backgroundColor = this.backgroundColor,
          backgroundImage = this.backgroundImage,
          borderColor = this.borderColor,
          borderWidth = this.borderWidth;
      this.pipeline.push(rotateAndScale(this));
      this.pipeline.push(traceArc(this));
      this.pipeline.push(fillAndStroke({
        backgroundColor: backgroundColor || backgroundImage ? color : undefined,
        borderColor: borderColor ? color : undefined,
        borderWidth: borderWidth
      }));
      this.drawPipeline(ctx, offset);
    }
  }, {
    key: "draw",
    value: function draw(ctx, offset) {
      this.pipeline.push(loadBackgroundImage(this));
      this.pipeline.push(rotateAndScale(this));
      this.pipeline.push(traceArc(this));
      this.pipeline.push(shade(this));
      this.pipeline.push(fillAndStroke(this));
      this.pipeline.push(clipBackgroundImage(this));
      this.pipeline.push(drawBackgroundImage(this));
      this.drawPipeline(ctx, offset);
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return [].concat(_toConsumableArray(AbstractShape.observedAttributes), ['radius']);
    }
  }]);

  return CanvasCircle;
}(AbstractShape);
registerCustomElement('canvas-circle', CanvasCircle);
var circle = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, _excluded$5);

  return /*#__PURE__*/React.createElement("canvas-circle", _extends({}, props, {
    ref: ref
  }), children);
});

var _excluded$4 = ["children"];
var CanvasArc = /*#__PURE__*/function (_CanvasCircle) {
  _inherits(CanvasArc, _CanvasCircle);

  var _super = _createSuper(CanvasArc);

  function CanvasArc() {
    _classCallCheck(this, CanvasArc);

    return _super.apply(this, arguments);
  }

  _createClass(CanvasArc, [{
    key: "startAngle",
    get: function get() {
      return this.getNumericAttribute('startAngle');
    },
    set: function set(value) {
      this.setAttribute('startAngle', value);
    }
  }, {
    key: "endAngle",
    get: function get() {
      return this.getNumericAttribute('endAngle');
    },
    set: function set(value) {
      this.setAttribute('endAngle', value);
    }
  }, {
    key: "counterclockwise",
    get: function get() {
      return this.getBooleanAttribute('counterclockwise');
    },
    set: function set(value) {
      this.setBooleanAttribute('counterclockwise', value);
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return [].concat(_toConsumableArray(AbstractShape.observedAttributes), ['radius', 'startangle', 'endangle', 'counterclockwise']);
    }
  }]);

  return CanvasArc;
}(CanvasCircle);
registerCustomElement('canvas-arc', CanvasArc);
var arc = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, _excluded$4);

  return /*#__PURE__*/React.createElement("canvas-arc", _extends({}, props, {
    ref: ref
  }), children);
});

var fillAndStrokeText = function fillAndStrokeText(text) {
  return function (ctx, offset) {
    ctx.font = "".concat(text.fontStyle, " ").concat(text.fontWeight, " ").concat(text.fontSize, "px ").concat(text.fontFamily);
    ctx.textBaseline = text.baseline;
    ctx.textAlign = text.align;

    var _text$cropAndMeasure = text.cropAndMeasure(),
        textContent = _text$cropAndMeasure.textContent;

    var x = text.x + offset.x;
    var y = text.y + offset.y;

    if (text.color) {
      ctx.fillStyle = text.color;
      ctx.fillText(textContent, x - text.borderWidth / 2, y - text.borderWidth / 2);
    }

    if (text.borderColor && text.borderWidth) {
      ctx.strokeStyle = text.borderColor;
      ctx.lineWidth = text.borderWidth;
      ctx.strokeText(textContent, x - text.borderWidth / 2, y - text.borderWidth / 2);
    }
  };
};
var traceTextBox = function traceTextBox(text) {
  return function (ctx, offset) {
    var _text$getBoundingBox = text.getBoundingBox(offset),
        left = _text$getBoundingBox.left,
        top = _text$getBoundingBox.top,
        right = _text$getBoundingBox.right,
        bottom = _text$getBoundingBox.bottom;

    ctx.beginPath();
    ctx.rect(left - text.borderWidth / 2, top - text.borderWidth / 2, right - left, bottom - top);
    return true;
  };
};

function memoize(fn, cache) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var cacheKey = args.join(',');
    var result = cache.read(cacheKey);

    if (result === undefined) {
      result = fn.apply(void 0, args);
      cache.write(cacheKey, result);
    }

    return result;
  };
}

// From https://medium.com/dsinjs/implementing-lru-cache-in-javascript-94ba6755cda9
var Node = /*#__PURE__*/_createClass(function Node(key, value) {
  var next = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var prev = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  _classCallCheck(this, Node);

  this.key = key;
  this.value = value;
  this.next = next;
  this.prev = prev;
});

var Lru = /*#__PURE__*/function (_Symbol$iterator) {
  //set default limit of 10 if limit is not passed.
  function Lru() {
    var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

    _classCallCheck(this, Lru);

    this.size = 0;
    this.limit = limit;
    this.head = null;
    this.tail = null;
    this.cacheMap = {};
  }

  _createClass(Lru, [{
    key: "write",
    value: function write(key, value) {
      var existingNode = this.cacheMap[key];

      if (existingNode) {
        this.detach(existingNode);
        this.size--;
      } else if (this.size === this.limit) {
        delete this.cacheMap[this.tail.key];
        this.detach(this.tail);
        this.size--;
      } // Write to head of LinkedList


      if (!this.head) {
        this.head = this.tail = new Node(key, value);
      } else {
        var node = new Node(key, value, this.head);
        this.head.prev = node;
        this.head = node;
      } // update cacheMap with LinkedList key and Node reference


      this.cacheMap[key] = this.head;
      this.size++;
    }
  }, {
    key: "read",
    value: function read(key) {
      var existingNode = this.cacheMap[key];

      if (existingNode) {
        var value = existingNode.value; // Make the node as new Head of LinkedList if not already

        if (this.head !== existingNode) {
          // write will automatically remove the node from it's position and make it a new head i.e most used
          this.write(key, value);
        }

        return value;
      }
    }
  }, {
    key: "detach",
    value: function detach(node) {
      if (node.prev !== null) {
        node.prev.next = node.next;
      } else {
        this.head = node.next;
      }

      if (node.next !== null) {
        node.next.prev = node.prev;
      } else {
        this.tail = node.prev;
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.head = null;
      this.tail = null;
      this.size = 0;
      this.cacheMap = {};
    } // Invokes the callback function with every node of the chain and the index of the node.

  }, {
    key: "forEach",
    value: function forEach(fn) {
      var node = this.head;
      var counter = 0;

      while (node) {
        fn(node, counter);
        node = node.next;
        counter++;
      }
    } // To iterate over LRU with a 'for...of' loop

  }, {
    key: _Symbol$iterator,
    value:
    /*#__PURE__*/
    _regeneratorRuntime().mark(function value() {
      var node;
      return _regeneratorRuntime().wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              node = this.head;

            case 1:
              if (!node) {
                _context.next = 7;
                break;
              }

              _context.next = 4;
              return node;

            case 4:
              node = node.next;
              _context.next = 1;
              break;

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, value, this);
    })
  }]);

  return Lru;
}(Symbol.iterator);

var measureText = memoize(function (style, weight, size, family, baseline, align, text) {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  ctx.font = "".concat(style, " ").concat(weight, " ").concat(size, "px ").concat(family);
  ctx.textBaseline = baseline;
  ctx.textAlign = align;
  return ctx.measureText(text);
}, new Lru(50));

var cropEnd = function cropEnd(text) {
  var ellipses = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '…';
  var main = text.replace(new RegExp("".concat(ellipses, "$")), '');

  if (main === '') {
    return main;
  }

  var cropped = main.slice(0, -1);
  return cropped + ellipses;
};

var _excluded$3 = ["children"];
var CanvasLabel = /*#__PURE__*/function (_AbstractShape) {
  _inherits(CanvasLabel, _AbstractShape);

  var _super = _createSuper(CanvasLabel);

  function CanvasLabel() {
    _classCallCheck(this, CanvasLabel);

    return _super.apply(this, arguments);
  }

  _createClass(CanvasLabel, [{
    key: "textContent",
    get: function get() {
      return this.getTextualAttribute('textContent', '');
    },
    set: function set(value) {
      this.setAttribute('textContent', value);
    }
  }, {
    key: "fontSize",
    get: function get() {
      return this.getNumericAttribute('fontSize', 10);
    },
    set: function set(value) {
      this.setAttribute('fontSize', value);
    }
  }, {
    key: "fontFamily",
    get: function get() {
      return this.getTextualAttribute('fontFamily', 'sans-serif');
    },
    set: function set(value) {
      this.setAttribute('fontFamily', value);
    }
  }, {
    key: "fontStyle",
    get: function get() {
      return this.getTextualAttribute('fontStyle', 'normal');
    },
    set: function set(value) {
      this.setAttribute('fontStyle', value);
    }
  }, {
    key: "fontWeight",
    get: function get() {
      return this.getTextualAttribute('fontWeight', 'normal');
    },
    set: function set(value) {
      this.setAttribute('fontWeight', value);
    }
  }, {
    key: "color",
    get: function get() {
      return this.getAttribute('color');
    },
    set: function set(value) {
      this.setAttribute('color', value);
    }
  }, {
    key: "baseline",
    get: function get() {
      return this.getTextualAttribute('baseline', 'alphabetic');
    },
    set: function set(value) {
      this.setAttribute('baseline', value);
    }
  }, {
    key: "align",
    get: function get() {
      return this.getTextualAttribute('align', 'start');
    },
    set: function set(value) {
      this.setAttribute('align', value);
    }
  }, {
    key: "maxWidth",
    get: function get() {
      return this.getNumericAttribute('maxWidth', Infinity);
    },
    set: function set(value) {
      this.setAttribute('maxWidth', value);
    }
  }, {
    key: "width",
    get: function get() {
      var _this$cropAndMeasure = this.cropAndMeasure(),
          width = _this$cropAndMeasure.width;

      return width;
    }
  }, {
    key: "height",
    get: function get() {
      var _this$cropAndMeasure2 = this.cropAndMeasure(),
          height = _this$cropAndMeasure2.height;

      return height;
    }
  }, {
    key: "getTextMetrics",
    value: function getTextMetrics(text) {
      return measureText(this.fontStyle, this.fontWeight, this.fontSize, this.fontFamily, this.baseline, this.align, text);
    }
  }, {
    key: "cropAndMeasure",
    value: function cropAndMeasure() {
      var textContent = this.textContent;
      var textMetrics = this.getTextMetrics(textContent);
      var width = textMetrics.actualBoundingBoxLeft + textMetrics.actualBoundingBoxRight;

      while (textContent !== '' && width > this.maxWidth) {
        textContent = cropEnd(textContent);
        textMetrics = this.getTextMetrics(textContent);
        width = textMetrics.actualBoundingBoxLeft + textMetrics.actualBoundingBoxRight;
      }

      var height = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;
      return {
        textContent: textContent,
        height: height,
        width: width,
        textMetrics: textMetrics
      };
    }
  }, {
    key: "getBoundingBox",
    value: function getBoundingBox(offset) {
      var _this$cropAndMeasure3 = this.cropAndMeasure(),
          textMetrics = _this$cropAndMeasure3.textMetrics,
          width = _this$cropAndMeasure3.width,
          height = _this$cropAndMeasure3.height;

      var left = this.x + offset.x - textMetrics.actualBoundingBoxLeft;
      var right = left + width;
      var top = this.y + offset.y - textMetrics.actualBoundingBoxAscent;
      var bottom = top + height;
      return {
        left: left,
        right: right,
        top: top,
        bottom: bottom
      };
    }
  }, {
    key: "getTranslationCenter",
    value: function getTranslationCenter(offset) {
      var x = this.x + offset.x;
      var y = this.y + offset.y;
      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "drawHitArea",
    value: function drawHitArea(ctx, offset, color) {
      var backgroundColor = this.backgroundColor,
          backgroundImage = this.backgroundImage,
          borderColor = this.borderColor,
          borderWidth = this.borderWidth;
      this.pipeline.push(rotateAndScale(this));
      this.pipeline.push(traceTextBox(this));
      this.pipeline.push(fillAndStroke({
        backgroundColor: backgroundColor || backgroundImage ? color : undefined,
        borderColor: borderColor ? color : undefined,
        borderWidth: borderWidth
      }));
      this.drawPipeline(ctx, offset);
    }
  }, {
    key: "draw",
    value: function draw(ctx, offset) {
      this.pipeline.push(rotateAndScale(this));
      this.pipeline.push(shade(this));
      this.pipeline.push(traceTextBox(this));
      this.pipeline.push(fillAndStroke({
        backgroundColor: this.backgroundColor,
        borderColor: this.backgroundColor,
        borderWidth: this.borderWidth
      }));
      this.pipeline.push(fillAndStrokeText(this));
      this.drawPipeline(ctx, offset);
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return [].concat(_toConsumableArray(AbstractShape.observedAttributes), ['color', 'fontsize', 'fontfamily', 'fontstyle', 'fontweight', 'baseline', 'align', 'maxwidth', 'textcontent']);
    }
  }]);

  return CanvasLabel;
}(AbstractShape);
registerCustomElement('canvas-label', CanvasLabel);
var label = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, _excluded$3);

  return /*#__PURE__*/React.createElement("canvas-label", _extends({}, props, {
    ref: ref
  }), children);
});

var _excluded$2 = ["children"];
var CanvasRoundedRectangle = /*#__PURE__*/function (_CanvasRectangle) {
  _inherits(CanvasRoundedRectangle, _CanvasRectangle);

  var _super = _createSuper(CanvasRoundedRectangle);

  function CanvasRoundedRectangle() {
    _classCallCheck(this, CanvasRoundedRectangle);

    return _super.apply(this, arguments);
  }

  _createClass(CanvasRoundedRectangle, [{
    key: "radius",
    get: function get() {
      return this.getNumericAttribute('radius');
    },
    set: function set(value) {
      this.setAttribute('radius', value);
    }
  }, {
    key: "drawHitArea",
    value: function drawHitArea(ctx, offset, color) {
      var backgroundColor = this.backgroundColor,
          backgroundImage = this.backgroundImage,
          borderColor = this.borderColor,
          borderWidth = this.borderWidth;
      this.pipeline.push(rotateAndScale(this));
      this.pipeline.push(traceRoundedRectangle(this));
      this.pipeline.push(fillAndStroke({
        backgroundColor: backgroundColor || backgroundImage ? color : undefined,
        borderColor: borderColor ? color : undefined,
        borderWidth: borderWidth
      }));
      this.drawPipeline(ctx, offset);
    }
  }, {
    key: "draw",
    value: function draw(ctx, offset) {
      this.pipeline.push(loadBackgroundImage(this));
      this.pipeline.push(rotateAndScale(this));
      this.pipeline.push(traceRoundedRectangle(this));
      this.pipeline.push(shade(this));
      this.pipeline.push(fillAndStroke(this));
      this.pipeline.push(clipBackgroundImage(this));
      this.pipeline.push(drawBackgroundImage(this));
      this.drawPipeline(ctx, offset);
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return [].concat(_toConsumableArray(AbstractShape.observedAttributes), ['radius']);
    }
  }]);

  return CanvasRoundedRectangle;
}(CanvasRectangle);
registerCustomElement('canvas-rounded-rectangle', CanvasRoundedRectangle);
var roundedRectangle = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, _excluded$2);

  return /*#__PURE__*/React.createElement("canvas-rounded-rectangle", _extends({}, props, {
    ref: ref
  }), children);
});

var traceSector = function traceSector(sector) {
  return function (ctx, offset) {
    var _sector$startAngle, _sector$endAngle, _sector$counterclockw;

    var _sector$getBoundingBo = sector.getBoundingBox(offset),
        left = _sector$getBoundingBo.left,
        top = _sector$getBoundingBo.top;

    ctx.beginPath();
    ctx.moveTo(left + sector.radius, top + sector.radius);
    ctx.arc(left + sector.radius, top + sector.radius, sector.radius - sector.borderWidth / 2, ((_sector$startAngle = sector.startAngle) !== null && _sector$startAngle !== void 0 ? _sector$startAngle : 0) - Math.PI / 2, ((_sector$endAngle = sector.endAngle) !== null && _sector$endAngle !== void 0 ? _sector$endAngle : Math.PI * 2) - Math.PI / 2, (_sector$counterclockw = sector.counterclockwise) !== null && _sector$counterclockw !== void 0 ? _sector$counterclockw : false);
    ctx.closePath();
    return true;
  };
};

var _excluded$1 = ["children"];
var CanvasSector = /*#__PURE__*/function (_CanvasArc) {
  _inherits(CanvasSector, _CanvasArc);

  var _super = _createSuper(CanvasSector);

  function CanvasSector() {
    _classCallCheck(this, CanvasSector);

    return _super.apply(this, arguments);
  }

  _createClass(CanvasSector, [{
    key: "drawHitArea",
    value: function drawHitArea(ctx, offset, color) {
      var backgroundColor = this.backgroundColor,
          backgroundImage = this.backgroundImage,
          borderColor = this.borderColor,
          borderWidth = this.borderWidth;
      this.pipeline.push(rotateAndScale(this));
      this.pipeline.push(traceSector(this));
      this.pipeline.push(fillAndStroke({
        backgroundColor: backgroundColor || backgroundImage ? color : undefined,
        borderColor: borderColor ? color : undefined,
        borderWidth: borderWidth
      }));
      this.drawPipeline(ctx, offset);
    }
  }, {
    key: "draw",
    value: function draw(ctx, offset) {
      this.pipeline.push(loadBackgroundImage(this));
      this.pipeline.push(rotateAndScale(this));
      this.pipeline.push(traceSector(this));
      this.pipeline.push(shade(this));
      this.pipeline.push(fillAndStroke(this));
      this.pipeline.push(clipBackgroundImage(this));
      this.pipeline.push(drawBackgroundImage(this));
      this.drawPipeline(ctx, offset);
    }
  }]);

  return CanvasSector;
}(CanvasArc);
registerCustomElement('canvas-sector', CanvasSector);
var sector = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, _excluded$1);

  return /*#__PURE__*/React.createElement("canvas-sector", _extends({}, props, {
    ref: ref
  }), children);
});

var tracePolygon = function tracePolygon(polygon) {
  return function (ctx, offset) {
    var _polygon$getBoundingB = polygon.getBoundingBox(offset),
        left = _polygon$getBoundingB.left,
        top = _polygon$getBoundingB.top;

    var x = left + polygon.radius;
    var y = top + polygon.radius;
    ctx.beginPath();
    ctx.moveTo(x + polygon.radius - polygon.borderWidth / 2, y);

    for (var side = 0; side < polygon.sides; side++) {
      ctx.lineTo(x + (polygon.radius - polygon.borderWidth / 2) * Math.cos(side * 2 * Math.PI / polygon.sides), y + (polygon.radius - polygon.borderWidth / 2) * Math.sin(side * 2 * Math.PI / polygon.sides));
    }

    ctx.closePath();
    return true;
  };
};

var _excluded = ["children"];
var CanvasPolygon = /*#__PURE__*/function (_CanvasCircle) {
  _inherits(CanvasPolygon, _CanvasCircle);

  var _super = _createSuper(CanvasPolygon);

  function CanvasPolygon() {
    _classCallCheck(this, CanvasPolygon);

    return _super.apply(this, arguments);
  }

  _createClass(CanvasPolygon, [{
    key: "sides",
    get: function get() {
      return this.getNumericAttribute('sides');
    },
    set: function set(value) {
      this.setAttribute('sides', value);
    }
  }, {
    key: "drawHitArea",
    value: function drawHitArea(ctx, offset, color) {
      var backgroundColor = this.backgroundColor,
          backgroundImage = this.backgroundImage,
          borderColor = this.borderColor,
          borderWidth = this.borderWidth;
      this.pipeline.push(rotateAndScale(this));
      this.pipeline.push(tracePolygon(this));
      this.pipeline.push(fillAndStroke({
        backgroundColor: backgroundColor || backgroundImage ? color : undefined,
        borderColor: borderColor ? color : undefined,
        borderWidth: borderWidth
      }));
      this.drawPipeline(ctx, offset);
    }
  }, {
    key: "draw",
    value: function draw(ctx, offset) {
      this.pipeline.push(loadBackgroundImage(this));
      this.pipeline.push(rotateAndScale(this));
      this.pipeline.push(tracePolygon(this));
      this.pipeline.push(shade(this));
      this.pipeline.push(fillAndStroke(this));
      this.pipeline.push(clipBackgroundImage(this));
      this.pipeline.push(drawBackgroundImage(this));
      this.drawPipeline(ctx, offset);
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return [].concat(_toConsumableArray(CanvasCircle.observedAttributes), ['sides']);
    }
  }]);

  return CanvasPolygon;
}(CanvasCircle);
registerCustomElement('canvas-polygon', CanvasPolygon);
var polygon = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React.createElement("canvas-polygon", _extends({}, props, {
    ref: ref
  }), children);
});

export { arc as Arc, circle as Circle, image as Image, label as Label, Layer, polygon as Polygon, rectangle as Rectangle, roundedRectangle as RoundedRectangle, ScaleMode, sector as Sector, Stage };
