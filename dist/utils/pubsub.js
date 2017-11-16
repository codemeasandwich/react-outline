"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var pubsub = new function () {

  var vals = {};
  var subscribers = [];

  this.publish = function (key, value) {

    vals[key] = value;
    subscribers.forEach(function (subscriber) {
      return subscriber(vals);
    });
  };

  this.subscribe = function (subscriber) {
    return subscribers.push(subscriber);
  };
  this.get = function () {
    return vals;
  };
  this.clear = function () {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.getOwnPropertyNames(vals)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var className = _step.value;

        delete vals[className];
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };
}();

exports.default = pubsub;