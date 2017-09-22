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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS91dGlscy9wdWJzdWIuanMiXSwibmFtZXMiOlsicHVic3ViIiwidmFscyIsInN1YnNjcmliZXJzIiwicHVibGlzaCIsImtleSIsInZhbHVlIiwiZm9yRWFjaCIsInN1YnNjcmliZXIiLCJzdWJzY3JpYmUiLCJwdXNoIiwiZ2V0IiwiY2xlYXIiLCJPYmplY3QiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiY2xhc3NOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxJQUFNQSxTQUFTLElBQUksWUFBVTs7QUFFM0IsTUFBTUMsT0FBTyxFQUFiO0FBQ0EsTUFBTUMsY0FBYyxFQUFwQjs7QUFFQSxPQUFLQyxPQUFMLEdBQWUsVUFBU0MsR0FBVCxFQUFhQyxLQUFiLEVBQW1COztBQUVoQ0osU0FBS0csR0FBTCxJQUFZQyxLQUFaO0FBQ0FILGdCQUFZSSxPQUFaLENBQXFCO0FBQUEsYUFBY0MsV0FBV04sSUFBWCxDQUFkO0FBQUEsS0FBckI7QUFDRCxHQUpEOztBQU1BLE9BQUtPLFNBQUwsR0FBaUIsVUFBQ0QsVUFBRDtBQUFBLFdBQWlCTCxZQUFZTyxJQUFaLENBQWlCRixVQUFqQixDQUFqQjtBQUFBLEdBQWpCO0FBQ0EsT0FBS0csR0FBTCxHQUFXO0FBQUEsV0FBTVQsSUFBTjtBQUFBLEdBQVg7QUFDQSxPQUFLVSxLQUFMLEdBQWEsWUFBSztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNoQiwyQkFBdUJDLE9BQU9DLG1CQUFQLENBQTJCWixJQUEzQixDQUF2Qiw4SEFBd0Q7QUFBQSxZQUE5Q2EsU0FBOEM7O0FBQ3RELGVBQU9iLEtBQUthLFNBQUwsQ0FBUDtBQUNEO0FBSGU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlqQixHQUpEO0FBS0QsQ0FsQmMsRUFBZjs7a0JBb0JlZCxNIiwiZmlsZSI6InB1YnN1Yi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3QgcHVic3ViID0gbmV3IGZ1bmN0aW9uKCl7XG5cbiAgY29uc3QgdmFscyA9IHt9O1xuICBjb25zdCBzdWJzY3JpYmVycyA9IFtdO1xuXG4gIHRoaXMucHVibGlzaCA9IGZ1bmN0aW9uKGtleSx2YWx1ZSl7XG5cbiAgICB2YWxzW2tleV0gPSB2YWx1ZTtcbiAgICBzdWJzY3JpYmVycy5mb3JFYWNoKCBzdWJzY3JpYmVyID0+IHN1YnNjcmliZXIodmFscykgKVxuICB9XG5cbiAgdGhpcy5zdWJzY3JpYmUgPSAoc3Vic2NyaWJlcikgPT4gIHN1YnNjcmliZXJzLnB1c2goc3Vic2NyaWJlcik7XG4gIHRoaXMuZ2V0ID0gKCkgPT4gdmFscztcbiAgdGhpcy5jbGVhciA9ICgpPT4ge1xuICAgIGZvcihjb25zdCBjbGFzc05hbWUgb2YgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFscykpe1xuICAgICAgZGVsZXRlIHZhbHNbY2xhc3NOYW1lXVxuICAgIH1cbiAgfVxufSgpXG5cbmV4cG9ydCBkZWZhdWx0IHB1YnN1YlxuIl19