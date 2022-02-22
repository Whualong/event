(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.event = factory());
}(this, (function () { 'use strict';

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

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
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

  var Event = /*#__PURE__*/function () {
    function Event() {
      _classCallCheck(this, Event);

      this._events = new Map();
    }

    _createClass(Event, [{
      key: "on",
      value: function on(type, cb, flag) {
        if (this._events.has(type)) {
          var cbs = this._events.get(type);

          flag ? cbs.unshift(cb) : cbs.push(cb);
        } else {
          this._events.set(type, [cb]);
        }

        if (this._events.get(type).length >= Event.defaultMaxListeners) {
          console.warn('超出最大监听数量');
        }

        return this;
      }
    }, {
      key: "once",
      value: function once(type, cb, flag) {
        var _this = this;

        var _once = function _once() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          cb.apply(_this, args);

          _this.removeListener(type, _once);
        };

        return this.on(type, _once, flag);
      }
    }, {
      key: "emit",
      value: function emit(type) {
        var _this2 = this;

        var args = Array.prototype.slice.call(arguments, 1);

        if (this._events.has(type)) {
          this._events.get(type).forEach(function (cb) {
            cb.apply(_this2, args);
          });
        }
      }
    }, {
      key: "setMaxListeners",
      value: function setMaxListeners(max) {
        Event.defaultMaxListeners = max;
      }
    }, {
      key: "getAllListenerType",
      value: function getAllListenerType() {
        return _toConsumableArray(this._events.keys());
      }
    }, {
      key: "getAllListenerFunc",
      value: function getAllListenerFunc(type) {
        if (this._events.has(type)) {
          return this._events.get(type);
        }

        return [];
      }
    }, {
      key: "removeListener",
      value: function removeListener(type, cb) {
        if (this._events.has(type)) {
          var cbs = this._events.get(type);

          cbs = cbs.filter(function (listen) {
            return cb !== listen;
          });

          this._events.set(type, cbs);
        }

        return this;
      }
    }, {
      key: "removeAllListener",
      value: function removeAllListener(type) {
        if (this._events.has(type)) {
          var _lis = this._events.get(type);

          _lis.forEach(function (cb) {
          });

          _lis = null;

          this._events["delete"](type);
        }

        return this;
      }
    }]);

    return Event;
  }();

  _defineProperty(Event, "defaultMaxListeners", 10);

  return Event;

})));
