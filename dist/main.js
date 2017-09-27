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

// TODO remove styleCSS args

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9tYWluLmpzIl0sIm5hbWVzIjpbInVzZXJTZXRPcHRpb25zIiwibmFtZWQiLCJ3cmFwU3R5bGVzIiwib3V0bGluZSIsIl9zdHlsZXMiLCJvcHRpb25zIiwic3R5bGVDU1MiLCJzYW5pdGl6ZU91dGxpbmUiLCJ3cmFwcGVkU3R5bGVzIiwiY29sb3JzIiwid2l0aE9wdGlvbnMiLCJFcnJvciIsIkpTT04iLCJzdHJpbmdpZnkiLCJ0ZW1wT3V0bGluZUZuIiwib3B0aW9uc09yTG9naWMiLCJzZXRPcHRpb25zIiwiT2JqZWN0IiwiYXNzaWduIiwidGVzdGluZyIsInJlc2V0Q1NTIiwiY2xlYXIiLCJTdHlsZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7OztBQUNBOztBQUVBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLGlCQUFpQixFQUFFQyxPQUFNLElBQVIsQ0FBWSw2QkFBWixFQUF2Qjs7QUFFQSxJQUFNQyxhQUFhLDBCQUFrQkYsY0FBbEIsQ0FBbkI7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLFNBQVNHLE9BQVQsQ0FBaUJDLE9BQWpCLEVBQWdEO0FBQUEsTUFBdkJDLE9BQXVCLHVFQUFmLEVBQWU7QUFBQSxNQUFaQyxRQUFZLHVFQUFILEVBQUc7O0FBQzlDLFNBQU9DLGdCQUFnQixpQ0FBcUJILE9BQXJCLEVBQTZCQyxPQUE3QixDQUFoQixFQUFzREEsT0FBdEQsQ0FBUDtBQUNEOztBQUVELFNBQVNFLGVBQVQsQ0FBeUJILE9BQXpCLEVBQXdEO0FBQUEsTUFBdkJDLE9BQXVCLHVFQUFmLEVBQWU7QUFBQSxNQUFaQyxRQUFZLHVFQUFILEVBQUc7OztBQUV0RCxNQUFNRSxnQkFBZ0JOLFdBQVdFLE9BQVgsRUFBbUJDLE9BQW5CLEVBQTJCQyxRQUEzQixDQUF0QjtBQUNNRSxnQkFBY0MsTUFBZCxHQUF1QkQsY0FBY0MsTUFBZCxJQUNBSixXQUFrQkEsUUFBUUksTUFEMUIsSUFFQVQsa0JBQWtCQSxlQUFlUyxNQUZ4RDtBQUdOLFNBQU9ELGFBQVA7QUFDRDs7QUFFRDtBQUNBO0FBQ0E7O0FBRUEsU0FBU0UsV0FBVCxDQUFxQkwsT0FBckIsRUFBNkI7QUFDM0IsTUFBRyxDQUFDQSxPQUFKLEVBQWEsTUFBTSxJQUFJTSxLQUFKLENBQVUsMENBQXdDQyxLQUFLQyxTQUFMLENBQWVSLE9BQWYsQ0FBbEQsQ0FBTjs7QUFFYixNQUFNUyxnQkFBZ0IsU0FBaEJBLGFBQWdCLENBQUNWLE9BQUQsRUFBU1csY0FBVDtBQUFBLFdBQTBCUixnQkFBZ0IsaUNBQXFCSCxPQUFyQixFQUE2QlcsY0FBN0IsQ0FBaEIsRUFBNkRWLE9BQTdELENBQTFCO0FBQUEsR0FBdEI7QUFDQSxNQUFHQSxRQUFRSSxNQUFYLEVBQWtCO0FBQ2hCSyxrQkFBY0wsTUFBZCxHQUF1QkosUUFBUUksTUFBL0I7QUFDRDtBQUNELFNBQU9LLGFBQVA7QUFDRDs7QUFFRCxTQUFTRSxVQUFULENBQW9CWCxPQUFwQixFQUE0QjtBQUMxQixNQUFHLENBQUNBLE9BQUosRUFBYSxNQUFNLElBQUlNLEtBQUosQ0FBVSwwQ0FBd0NDLEtBQUtDLFNBQUwsQ0FBZVIsT0FBZixDQUFsRCxDQUFOO0FBQ2IsTUFBR0EsUUFBUUksTUFBWCxFQUFrQjtBQUNoQk4sWUFBUU0sTUFBUixHQUFpQkosUUFBUUksTUFBekI7QUFDRDtBQUNEUSxTQUFPQyxNQUFQLENBQWNsQixjQUFkLEVBQTZCSyxPQUE3QjtBQUNEOztBQUVELElBQU1jLFVBQVU7QUFDZEMsWUFBVSxjQUFPQztBQURILENBQWhCOztrQkFJZWxCLE87UUFDTk8sVyxHQUFBQSxXO1FBQWFNLFUsR0FBQUEsVTtRQUFZTSxNO1FBQVFILE8sR0FBQUEsTyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBwdWJzdWIsIHNhbml0aXplT3V0bGluZUlucHV0IH0gZnJvbSAnLi91dGlscydcblxuaW1wb3J0IHdyYXBTdHlsZXNGYWN0b3J5IGZyb20gJy4vd3JhcFN0eWxlcydcbmltcG9ydCBTdHlsZXMgZnJvbSAnLi9TdHlsZXMnXG5cbmNvbnN0IHVzZXJTZXRPcHRpb25zID0geyBuYW1lZDp0cnVlLyogcHJlZml4OmdldFZlbmRvclByZWZpeCgpKi8gfVxuXG5jb25zdCB3cmFwU3R5bGVzID0gd3JhcFN0eWxlc0ZhY3RvcnkodXNlclNldE9wdGlvbnMpXG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gdG9wIExldmVsIC0gV3JhcCBTdHlsZXNcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLy8gVE9ETyByZW1vdmUgc3R5bGVDU1MgYXJnc1xuXG5mdW5jdGlvbiBvdXRsaW5lKF9zdHlsZXMsb3B0aW9ucz17fSxzdHlsZUNTUz17fSl7XG4gIHJldHVybiBzYW5pdGl6ZU91dGxpbmUoc2FuaXRpemVPdXRsaW5lSW5wdXQoX3N0eWxlcyxvcHRpb25zKSxvcHRpb25zKVxufVxuXG5mdW5jdGlvbiBzYW5pdGl6ZU91dGxpbmUoX3N0eWxlcyxvcHRpb25zPXt9LHN0eWxlQ1NTPXt9KXtcblxuICBjb25zdCB3cmFwcGVkU3R5bGVzID0gd3JhcFN0eWxlcyhfc3R5bGVzLG9wdGlvbnMsc3R5bGVDU1MpO1xuICAgICAgICB3cmFwcGVkU3R5bGVzLmNvbG9ycyA9IHdyYXBwZWRTdHlsZXMuY29sb3JzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgb3B0aW9ucyAgICAgICAgJiYgb3B0aW9ucy5jb2xvcnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCB1c2VyU2V0T3B0aW9ucyAmJiB1c2VyU2V0T3B0aW9ucy5jb2xvcnM7XG4gIHJldHVybiB3cmFwcGVkU3R5bGVzO1xufVxuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBPcHRpb25zXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIHdpdGhPcHRpb25zKG9wdGlvbnMpe1xuICBpZighb3B0aW9ucykgdGhyb3cgbmV3IEVycm9yKFwiQmFkIG9wdGlvbnMgdmFsdWVzIGZvciByZWFjdC1vdXRsaW5lOlwiK0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpKVxuXG4gIGNvbnN0IHRlbXBPdXRsaW5lRm4gPSAoX3N0eWxlcyxvcHRpb25zT3JMb2dpYyk9PnNhbml0aXplT3V0bGluZShzYW5pdGl6ZU91dGxpbmVJbnB1dChfc3R5bGVzLG9wdGlvbnNPckxvZ2ljKSxvcHRpb25zKVxuICBpZihvcHRpb25zLmNvbG9ycyl7XG4gICAgdGVtcE91dGxpbmVGbi5jb2xvcnMgPSBvcHRpb25zLmNvbG9yc1xuICB9XG4gIHJldHVybiB0ZW1wT3V0bGluZUZuO1xufVxuXG5mdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpe1xuICBpZighb3B0aW9ucykgdGhyb3cgbmV3IEVycm9yKFwiQmFkIG9wdGlvbnMgdmFsdWVzIGZvciByZWFjdC1vdXRsaW5lOlwiK0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpKVxuICBpZihvcHRpb25zLmNvbG9ycyl7XG4gICAgb3V0bGluZS5jb2xvcnMgPSBvcHRpb25zLmNvbG9yc1xuICB9XG4gIE9iamVjdC5hc3NpZ24odXNlclNldE9wdGlvbnMsb3B0aW9ucylcbn1cblxuY29uc3QgdGVzdGluZyA9IHtcbiAgcmVzZXRDU1M6IHB1YnN1Yi5jbGVhclxufVxuXG5leHBvcnQgZGVmYXVsdCBvdXRsaW5lXG5leHBvcnQgeyB3aXRoT3B0aW9ucywgc2V0T3B0aW9ucywgU3R5bGVzLCB0ZXN0aW5nIH1cbiJdfQ==