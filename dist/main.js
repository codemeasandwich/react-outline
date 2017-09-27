'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testing = exports.Styles = exports.setOptions = exports.withOptions = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _wrapStyles = require('./wrapStyles');

var _wrapStyles2 = _interopRequireDefault(_wrapStyles);

var _Styles = require('./Styles');

var _Styles2 = _interopRequireDefault(_Styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSetOptions = { named: true /* prefix:getVendorPrefix()*/ };

var wrapStyles = (0, _wrapStyles2.default)(userSetOptions);

//=====================================================
//============================= top Level - Wrap Styles
//=====================================================

function outline(_styles) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var styleCSS = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return sanitizeOutline((0, _utils.sanitizeOutlineInput)(_styles, options), options);
}

function sanitizeOutline(_styles) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var styleCSS = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


  var wrappedStyles = wrapStyles(_styles, options, styleCSS);
  wrappedStyles.colors = wrappedStyles.colors || options && options.colors || userSetOptions && userSetOptions.colors;
  return wrappedStyles;
}

//=====================================================
//============================================= Options
//=====================================================

function withOptions(options) {
  if (!options) throw new Error("Bad options values for react-outline:" + JSON.stringify(options));

  var tempOutlineFn = function tempOutlineFn(_styles, optionsOrLogic) {
    return sanitizeOutline((0, _utils.sanitizeOutlineInput)(_styles, optionsOrLogic), options);
  };
  if (options.colors) {
    tempOutlineFn.colors = options.colors;
  }
  return tempOutlineFn;
}

function setOptions(options) {
  if (!options) throw new Error("Bad options values for react-outline:" + JSON.stringify(options));
  if (options.colors) {
    outline.colors = options.colors;
  }
  Object.assign(userSetOptions, options);
}

var testing = {
  resetCSS: _utils.pubsub.clear
};

exports.default = outline;
exports.withOptions = withOptions;
exports.setOptions = setOptions;
exports.Styles = _Styles2.default;
exports.testing = testing;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9tYWluLmpzIl0sIm5hbWVzIjpbInVzZXJTZXRPcHRpb25zIiwibmFtZWQiLCJ3cmFwU3R5bGVzIiwib3V0bGluZSIsIl9zdHlsZXMiLCJvcHRpb25zIiwic3R5bGVDU1MiLCJzYW5pdGl6ZU91dGxpbmUiLCJ3cmFwcGVkU3R5bGVzIiwiY29sb3JzIiwid2l0aE9wdGlvbnMiLCJFcnJvciIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0ZW1wT3V0bGluZUZuIiwib3B0aW9uc09yTG9naWMiLCJzZXRPcHRpb25zIiwiT2JqZWN0IiwiYXNzaWduIiwidGVzdGluZyIsInJlc2V0Q1NTIiwiY2xlYXIiLCJTdHlsZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLGlCQUFpQixFQUFFQyxPQUFNLElBQVIsQ0FBWSw2QkFBWixFQUF2Qjs7QUFFQSxJQUFNQyxhQUFhLDBCQUFrQkYsY0FBbEIsQ0FBbkI7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFNBQVNHLE9BQVQsQ0FBaUJDLE9BQWpCLEVBQWdEO0FBQUEsTUFBdkJDLE9BQXVCLHVFQUFmLEVBQWU7QUFBQSxNQUFaQyxRQUFZLHVFQUFILEVBQUc7O0FBQzlDLFNBQU9DLGdCQUFnQixpQ0FBcUJILE9BQXJCLEVBQTZCQyxPQUE3QixDQUFoQixFQUFzREEsT0FBdEQsQ0FBUDtBQUNEOztBQUVELFNBQVNFLGVBQVQsQ0FBeUJILE9BQXpCLEVBQXdEO0FBQUEsTUFBdkJDLE9BQXVCLHVFQUFmLEVBQWU7QUFBQSxNQUFaQyxRQUFZLHVFQUFILEVBQUc7OztBQUV0RCxNQUFNRSxnQkFBZ0JOLFdBQVdFLE9BQVgsRUFBbUJDLE9BQW5CLEVBQTJCQyxRQUEzQixDQUF0QjtBQUNNRSxnQkFBY0MsTUFBZCxHQUF1QkQsY0FBY0MsTUFBZCxJQUNBSixXQUFrQkEsUUFBUUksTUFEMUIsSUFFQVQsa0JBQWtCQSxlQUFlUyxNQUZ4RDtBQUdOLFNBQU9ELGFBQVA7QUFDRDs7QUFFRDtBQUNBO0FBQ0E7O0FBRUEsU0FBU0UsV0FBVCxDQUFxQkwsT0FBckIsRUFBNkI7QUFDM0IsTUFBRyxDQUFDQSxPQUFKLEVBQWEsTUFBTSxJQUFJTSxLQUFKLENBQVUsMENBQXdDQyxLQUFLQyxTQUFMLENBQWVSLE9BQWYsQ0FBbEQsQ0FBTjs7QUFFYixNQUFNUyxnQkFBZ0IsU0FBaEJBLGFBQWdCLENBQUNWLE9BQUQsRUFBU1csY0FBVDtBQUFBLFdBQTBCUixnQkFBZ0IsaUNBQXFCSCxPQUFyQixFQUE2QlcsY0FBN0IsQ0FBaEIsRUFBNkRWLE9BQTdELENBQTFCO0FBQUEsR0FBdEI7QUFDQSxNQUFHQSxRQUFRSSxNQUFYLEVBQWtCO0FBQ2hCSyxrQkFBY0wsTUFBZCxHQUF1QkosUUFBUUksTUFBL0I7QUFDRDtBQUNELFNBQU9LLGFBQVA7QUFDRDs7QUFFRCxTQUFTRSxVQUFULENBQW9CWCxPQUFwQixFQUE0QjtBQUMxQixNQUFHLENBQUNBLE9BQUosRUFBYSxNQUFNLElBQUlNLEtBQUosQ0FBVSwwQ0FBd0NDLEtBQUtDLFNBQUwsQ0FBZVIsT0FBZixDQUFsRCxDQUFOO0FBQ2IsTUFBR0EsUUFBUUksTUFBWCxFQUFrQjtBQUNoQk4sWUFBUU0sTUFBUixHQUFpQkosUUFBUUksTUFBekI7QUFDRDtBQUNEUSxTQUFPQyxNQUFQLENBQWNsQixjQUFkLEVBQTZCSyxPQUE3QjtBQUNEOztBQUVELElBQU1jLFVBQVU7QUFDZEMsWUFBVSxjQUFPQztBQURILENBQWhCOztrQkFJZWxCLE87UUFDTk8sVyxHQUFBQSxXO1FBQWFNLFUsR0FBQUEsVTtRQUFZTSxNO1FBQVFILE8sR0FBQUEsTyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBwdWJzdWIsIHNhbml0aXplT3V0bGluZUlucHV0IH0gZnJvbSAnLi91dGlscydcblxuaW1wb3J0IHdyYXBTdHlsZXNGYWN0b3J5IGZyb20gJy4vd3JhcFN0eWxlcydcbmltcG9ydCBTdHlsZXMgZnJvbSAnLi9TdHlsZXMnXG5cbmNvbnN0IHVzZXJTZXRPcHRpb25zID0geyBuYW1lZDp0cnVlLyogcHJlZml4OmdldFZlbmRvclByZWZpeCgpKi8gfVxuXG5jb25zdCB3cmFwU3R5bGVzID0gd3JhcFN0eWxlc0ZhY3RvcnkodXNlclNldE9wdGlvbnMpXG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gdG9wIExldmVsIC0gV3JhcCBTdHlsZXNcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZnVuY3Rpb24gb3V0bGluZShfc3R5bGVzLG9wdGlvbnM9e30sc3R5bGVDU1M9e30pe1xuICByZXR1cm4gc2FuaXRpemVPdXRsaW5lKHNhbml0aXplT3V0bGluZUlucHV0KF9zdHlsZXMsb3B0aW9ucyksb3B0aW9ucylcbn1cblxuZnVuY3Rpb24gc2FuaXRpemVPdXRsaW5lKF9zdHlsZXMsb3B0aW9ucz17fSxzdHlsZUNTUz17fSl7XG5cbiAgY29uc3Qgd3JhcHBlZFN0eWxlcyA9IHdyYXBTdHlsZXMoX3N0eWxlcyxvcHRpb25zLHN0eWxlQ1NTKTtcbiAgICAgICAgd3JhcHBlZFN0eWxlcy5jb2xvcnMgPSB3cmFwcGVkU3R5bGVzLmNvbG9yc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IG9wdGlvbnMgICAgICAgICYmIG9wdGlvbnMuY29sb3JzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgdXNlclNldE9wdGlvbnMgJiYgdXNlclNldE9wdGlvbnMuY29sb3JzO1xuICByZXR1cm4gd3JhcHBlZFN0eWxlcztcbn1cblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gT3B0aW9uc1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiB3aXRoT3B0aW9ucyhvcHRpb25zKXtcbiAgaWYoIW9wdGlvbnMpIHRocm93IG5ldyBFcnJvcihcIkJhZCBvcHRpb25zIHZhbHVlcyBmb3IgcmVhY3Qtb3V0bGluZTpcIitKU09OLnN0cmluZ2lmeShvcHRpb25zKSlcblxuICBjb25zdCB0ZW1wT3V0bGluZUZuID0gKF9zdHlsZXMsb3B0aW9uc09yTG9naWMpPT5zYW5pdGl6ZU91dGxpbmUoc2FuaXRpemVPdXRsaW5lSW5wdXQoX3N0eWxlcyxvcHRpb25zT3JMb2dpYyksb3B0aW9ucylcbiAgaWYob3B0aW9ucy5jb2xvcnMpe1xuICAgIHRlbXBPdXRsaW5lRm4uY29sb3JzID0gb3B0aW9ucy5jb2xvcnNcbiAgfVxuICByZXR1cm4gdGVtcE91dGxpbmVGbjtcbn1cblxuZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKXtcbiAgaWYoIW9wdGlvbnMpIHRocm93IG5ldyBFcnJvcihcIkJhZCBvcHRpb25zIHZhbHVlcyBmb3IgcmVhY3Qtb3V0bGluZTpcIitKU09OLnN0cmluZ2lmeShvcHRpb25zKSlcbiAgaWYob3B0aW9ucy5jb2xvcnMpe1xuICAgIG91dGxpbmUuY29sb3JzID0gb3B0aW9ucy5jb2xvcnNcbiAgfVxuICBPYmplY3QuYXNzaWduKHVzZXJTZXRPcHRpb25zLG9wdGlvbnMpXG59XG5cbmNvbnN0IHRlc3RpbmcgPSB7XG4gIHJlc2V0Q1NTOiBwdWJzdWIuY2xlYXJcbn1cblxuZXhwb3J0IGRlZmF1bHQgb3V0bGluZVxuZXhwb3J0IHsgd2l0aE9wdGlvbnMsIHNldE9wdGlvbnMsIFN0eWxlcywgdGVzdGluZyB9XG4iXX0=