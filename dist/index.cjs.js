'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
  return Constructor;
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
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
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
    _construct = Reflect.construct;
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

var StageContext = /*#__PURE__*/React__default["default"].createContext(null);

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
  var stageElement = React.useRef(null);

  var _useState = React.useState(1),
      _useState2 = _slicedToArray(_useState, 2),
      scale = _useState2[0],
      setScale = _useState2[1];

  React.useEffect(function () {
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
  return /*#__PURE__*/React__default["default"].createElement(StageContext.Provider, {
    value: {
      width: width,
      height: height,
      scale: scale
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      width: "".concat(width * scale, "px"),
      height: "".concat(height * scale, "px"),
      backgroundColor: backgroundColor,
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    ref: stageElement,
    style: {
      width: "".concat(width, "px"),
      height: "".concat(height, "px"),
      transformOrigin: '0 0',
      transform: "scale(".concat(scale, ")")
    }
  }, children)));
}

function Layer(_ref) {
  var children = _ref.children;
  var canvasElement = React.useRef(null);

  var _useContext = React.useContext(StageContext);
      _useContext.scale;
      var width = _useContext.width,
      height = _useContext.height;

  var drawChildren = React.useCallback(function (ctx, children) {
    var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      x: 0,
      y: 0,
      opacity: 1,
      rotation: 0,
      scaleX: 1,
      scaleY: 1
    };
    Array.from(children).forEach(function (child) {
      child.draw(ctx, offset);

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
  }, []);
  React.useEffect(function () {
    var canvas = canvasElement.current;
    var ctx = canvas.getContext('2d');
    var onUpdate = throttle(function (event) {
      ctx.clearRect(0, 0, canvasElement.current.width, canvasElement.current.height);
      drawChildren(ctx, canvasElement.current.children);
      ctx.beginPath(); // Start a new path

      ctx.moveTo(0, 100); // Move the pen to (30, 50)

      ctx.lineTo(200, 100); // Draw a line to (150, 100)

      ctx.stroke();
      ctx.beginPath(); // Start a new path

      ctx.moveTo(100, 0); // Move the pen to (30, 50)

      ctx.lineTo(100, 200); // Draw a line to (150, 100)

      ctx.stroke();
    });
    requestAnimationFrame(onUpdate);
    canvas.addEventListener('attributeChange', onUpdate);
    canvas.addEventListener('connect', onUpdate);
    canvas.addEventListener('load', onUpdate);
    return function () {
      canvas.removeEventListener('attributeChange', onUpdate);
      canvas.removeEventListener('connect', onUpdate);
      canvas.removeEventListener('load', onUpdate);
    };
  }, [drawChildren]);
  return /*#__PURE__*/React__default["default"].createElement("canvas", {
    style: {
      position: 'absolute'
    },
    width: width,
    height: height,
    ref: canvasElement
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
    return _this;
  }

  _createClass(AbstractShape, [{
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue) {
      var customEvent = new CustomEvent('attributeChange', {
        bubbles: true,
        detail: {
          name: name,
          oldValue: oldValue,
          newValue: newValue
        }
      });
      this.dispatchEvent(customEvent);
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var customEvent = new CustomEvent('connect', {
        bubbles: true
      });
      this.dispatchEvent(customEvent);
    }
  }, {
    key: "getNumericAttribute",
    value: function getNumericAttribute(attributeName) {
      var _this$getAttribute;

      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return Number((_this$getAttribute = this.getAttribute(attributeName)) !== null && _this$getAttribute !== void 0 ? _this$getAttribute : defaultValue);
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
    key: "lineDash",
    get: function get() {
      var _this$getAttribute$sp, _this$getAttribute2;

      return (_this$getAttribute$sp = (_this$getAttribute2 = this.getAttribute('lineDash')) === null || _this$getAttribute2 === void 0 ? void 0 : _this$getAttribute2.split(',').map(function (item) {
        return Number(item);
      })) !== null && _this$getAttribute$sp !== void 0 ? _this$getAttribute$sp : [];
    },
    set: function set(value) {
      this.setAttribute('lineDash', value);
    }
  }, {
    key: "rotateAndScale",
    value: function rotateAndScale(ctx, offset) {
      var scaleX = this.scaleX * offset.scaleX;
      var scaleY = this.scaleY * offset.scaleY;
      var rotation = this.rotation + offset.rotation;

      if (scaleX !== 1 || scaleY !== 1 || rotation !== 0) {
        var _this$getBoundingBox = this.getBoundingBox(),
            top = _this$getBoundingBox.top,
            left = _this$getBoundingBox.left;

        var translateX = left + this.width * this.originX + offset.x;
        var translateY = top + this.height * this.originY + offset.y;
        ctx.translate(translateX, translateY);
        ctx.scale(scaleX, scaleY);
        ctx.rotate(rotation);
        ctx.translate(-translateX, -translateY);
      }

      return true;
    }
  }, {
    key: "fillAndStroke",
    value: function fillAndStroke(ctx, offset) {
      var globalAlpha = this.opacity * offset.opacity;

      if (globalAlpha !== 1) {
        ctx.globalAlpha = globalAlpha;
      }

      if (this.shadowColor) {
        ctx.shadowColor = this.shadowColor;
      }

      if (this.shadowBlur !== 0) {
        ctx.shadowBlur = this.shadowBlur;
      }

      if (this.shadowOffsetX !== 0) {
        ctx.shadowOffsetX = this.shadowOffsetX;
      }

      if (this.shadowOffsetY !== 0) {
        ctx.shadowOffsetY = this.shadowOffsetY;
      }

      if (this.backgroundColor) {
        ctx.fillStyle = this.backgroundColor;
        ctx.fill();
      }

      if (this.lineDash.length) {
        ctx.setLineDash(this.lineDash);
      }

      if (this.borderColor && this.borderWidth) {
        ctx.strokeStyle = this.borderColor;
        ctx.lineWidth = this.borderWidth;
        ctx.stroke();
      }

      return true;
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
      return ['x', 'y', 'backgroundcolor', 'bordercolor', 'borderwidth', 'opacity', 'originx', 'originy', 'rotation', 'scalex', 'scaley', 'shadowcolor', 'shadowblur', 'shadowoffsetx', 'shadowoffsety', 'linedash'];
    }
  }]);

  return AbstractShape;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

var registerCustomElement = function registerCustomElement(name, constructor) {
  customElements.get(name) || customElements.define(name, constructor);
};

var _excluded$1 = ["children"];
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
    value: function getBoundingBox() {
      var left = this.x - this.width * this.originX;
      var top = this.y - this.height * this.originY;
      return {
        left: left,
        right: left + this.width,
        top: top,
        bottom: top + this.height
      };
    }
  }, {
    key: "trace",
    value: function trace(ctx, offset) {
      ctx.beginPath();

      var _this$getBoundingBox = this.getBoundingBox(),
          left = _this$getBoundingBox.left,
          top = _this$getBoundingBox.top;

      ctx.rect(left + offset.x, top + offset.y, this.width, this.height);
      return true;
    }
  }, {
    key: "draw",
    value: function draw(ctx, offset) {
      this.pipeline.push(this.rotateAndScale);
      this.pipeline.push(this.trace);
      this.pipeline.push(this.fillAndStroke);
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
function Rectangle(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, _excluded$1);

  return /*#__PURE__*/React__default["default"].createElement("canvas-rectangle", props, children);
}

// From https://medium.com/dsinjs/implementing-lru-cache-in-javascript-94ba6755cda9
var Node = function Node(key, value) {
  var next = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var prev = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  _classCallCheck(this, Node);

  this.key = key;
  this.value = value;
  this.next = next;
  this.prev = prev;
};

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
    regeneratorRuntime.mark(function value() {
      var node;
      return regeneratorRuntime.wrap(function value$(_context) {
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

var _excluded = ["children"];
var CanvasImage = /*#__PURE__*/function (_CanvasRectangle) {
  _inherits(CanvasImage, _CanvasRectangle);

  var _super = _createSuper(CanvasImage);

  function CanvasImage() {
    var _this;

    _classCallCheck(this, CanvasImage);

    _this = _super.call(this);
    _this.imageCache = new Lru();
    return _this;
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
    key: "loadImage",
    value: function loadImage() {
      var _this2 = this;

      this.image = this.imageCache.read(this.src);

      if (!this.image) {
        this.image = new window.Image();

        this.image.onload = function () {
          var customEvent = new CustomEvent('load', {
            bubbles: true
          });

          _this2.dispatchEvent(customEvent);
        };

        this.image.src = this.src;
        this.imageCache.write(this.src, this.image);
      }

      return this.image.complete;
    }
  }, {
    key: "drawImage",
    value: function drawImage(ctx, offset) {
      var _this$getBoundingBox = this.getBoundingBox(),
          left = _this$getBoundingBox.left,
          top = _this$getBoundingBox.top;

      ctx.drawImage(this.image, left + offset.x, top + offset.y, this.width, this.height);
      return true;
    }
  }, {
    key: "draw",
    value: function draw(ctx, offset) {
      this.pipeline.push(this.loadImage);
      this.pipeline.push(this.rotateAndScale);
      this.pipeline.push(this.trace);
      this.pipeline.push(this.fillAndStroke);
      this.pipeline.push(this.drawImage);
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
function Image(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/React__default["default"].createElement("canvas-image", props, children);
}

exports.Image = Image;
exports.Layer = Layer;
exports.Rectangle = Rectangle;
exports.ScaleMode = ScaleMode;
exports.Stage = Stage;
