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

  return sanitizeOutline((0, _utils.sanitizeOutlineInput)(_styles, options), options);
}

function sanitizeOutline(_styles) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


  var wrappedStyles = wrapStyles(_styles, options);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9tYWluLmpzIl0sIm5hbWVzIjpbInVzZXJTZXRPcHRpb25zIiwibmFtZWQiLCJ3cmFwU3R5bGVzIiwib3V0bGluZSIsIl9zdHlsZXMiLCJvcHRpb25zIiwic2FuaXRpemVPdXRsaW5lIiwid3JhcHBlZFN0eWxlcyIsImNvbG9ycyIsIndpdGhPcHRpb25zIiwiRXJyb3IiLCJKU09OIiwic3RyaW5naWZ5IiwidGVtcE91dGxpbmVGbiIsIm9wdGlvbnNPckxvZ2ljIiwic2V0T3B0aW9ucyIsIk9iamVjdCIsImFzc2lnbiIsInRlc3RpbmciLCJyZXNldENTUyIsImNsZWFyIiwiU3R5bGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7Ozs7QUFDQTs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxpQkFBaUIsRUFBRUMsT0FBTSxJQUFSLENBQVksNkJBQVosRUFBdkI7O0FBRUEsSUFBTUMsYUFBYSwwQkFBa0JGLGNBQWxCLENBQW5COztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTRyxPQUFULENBQWlCQyxPQUFqQixFQUFvQztBQUFBLE1BQVhDLE9BQVcsdUVBQUgsRUFBRzs7QUFDbEMsU0FBT0MsZ0JBQWdCLGlDQUFxQkYsT0FBckIsRUFBNkJDLE9BQTdCLENBQWhCLEVBQXNEQSxPQUF0RCxDQUFQO0FBQ0Q7O0FBRUQsU0FBU0MsZUFBVCxDQUF5QkYsT0FBekIsRUFBNEM7QUFBQSxNQUFYQyxPQUFXLHVFQUFILEVBQUc7OztBQUUxQyxNQUFNRSxnQkFBZ0JMLFdBQVdFLE9BQVgsRUFBbUJDLE9BQW5CLENBQXRCO0FBQ01FLGdCQUFjQyxNQUFkLEdBQXVCRCxjQUFjQyxNQUFkLElBQ0FILFdBQWtCQSxRQUFRRyxNQUQxQixJQUVBUixrQkFBa0JBLGVBQWVRLE1BRnhEO0FBR04sU0FBT0QsYUFBUDtBQUNEOztBQUVEO0FBQ0E7QUFDQTs7QUFFQSxTQUFTRSxXQUFULENBQXFCSixPQUFyQixFQUE2QjtBQUMzQixNQUFHLENBQUNBLE9BQUosRUFBYSxNQUFNLElBQUlLLEtBQUosQ0FBVSwwQ0FBd0NDLEtBQUtDLFNBQUwsQ0FBZVAsT0FBZixDQUFsRCxDQUFOOztBQUViLE1BQU1RLGdCQUFnQixTQUFoQkEsYUFBZ0IsQ0FBQ1QsT0FBRCxFQUFTVSxjQUFUO0FBQUEsV0FBMEJSLGdCQUFnQixpQ0FBcUJGLE9BQXJCLEVBQTZCVSxjQUE3QixDQUFoQixFQUE2RFQsT0FBN0QsQ0FBMUI7QUFBQSxHQUF0QjtBQUNBLE1BQUdBLFFBQVFHLE1BQVgsRUFBa0I7QUFDaEJLLGtCQUFjTCxNQUFkLEdBQXVCSCxRQUFRRyxNQUEvQjtBQUNEO0FBQ0QsU0FBT0ssYUFBUDtBQUNEOztBQUVELFNBQVNFLFVBQVQsQ0FBb0JWLE9BQXBCLEVBQTRCO0FBQzFCLE1BQUcsQ0FBQ0EsT0FBSixFQUFhLE1BQU0sSUFBSUssS0FBSixDQUFVLDBDQUF3Q0MsS0FBS0MsU0FBTCxDQUFlUCxPQUFmLENBQWxELENBQU47QUFDYixNQUFHQSxRQUFRRyxNQUFYLEVBQWtCO0FBQ2hCTCxZQUFRSyxNQUFSLEdBQWlCSCxRQUFRRyxNQUF6QjtBQUNEO0FBQ0RRLFNBQU9DLE1BQVAsQ0FBY2pCLGNBQWQsRUFBNkJLLE9BQTdCO0FBQ0Q7O0FBRUQsSUFBTWEsVUFBVTtBQUNkQyxZQUFVLGNBQU9DO0FBREgsQ0FBaEI7O2tCQUllakIsTztRQUNOTSxXLEdBQUFBLFc7UUFBYU0sVSxHQUFBQSxVO1FBQVlNLE07UUFBUUgsTyxHQUFBQSxPIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHB1YnN1Yiwgc2FuaXRpemVPdXRsaW5lSW5wdXQgfSBmcm9tICcuL3V0aWxzJ1xuXG5pbXBvcnQgd3JhcFN0eWxlc0ZhY3RvcnkgZnJvbSAnLi93cmFwU3R5bGVzJ1xuaW1wb3J0IFN0eWxlcyBmcm9tICcuL1N0eWxlcydcblxuY29uc3QgdXNlclNldE9wdGlvbnMgPSB7IG5hbWVkOnRydWUvKiBwcmVmaXg6Z2V0VmVuZG9yUHJlZml4KCkqLyB9XG5cbmNvbnN0IHdyYXBTdHlsZXMgPSB3cmFwU3R5bGVzRmFjdG9yeSh1c2VyU2V0T3B0aW9ucylcblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PSB0b3AgTGV2ZWwgLSBXcmFwIFN0eWxlc1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBvdXRsaW5lKF9zdHlsZXMsb3B0aW9ucz17fSl7XG4gIHJldHVybiBzYW5pdGl6ZU91dGxpbmUoc2FuaXRpemVPdXRsaW5lSW5wdXQoX3N0eWxlcyxvcHRpb25zKSxvcHRpb25zKVxufVxuXG5mdW5jdGlvbiBzYW5pdGl6ZU91dGxpbmUoX3N0eWxlcyxvcHRpb25zPXt9KXtcblxuICBjb25zdCB3cmFwcGVkU3R5bGVzID0gd3JhcFN0eWxlcyhfc3R5bGVzLG9wdGlvbnMpO1xuICAgICAgICB3cmFwcGVkU3R5bGVzLmNvbG9ycyA9IHdyYXBwZWRTdHlsZXMuY29sb3JzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgb3B0aW9ucyAgICAgICAgJiYgb3B0aW9ucy5jb2xvcnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCB1c2VyU2V0T3B0aW9ucyAmJiB1c2VyU2V0T3B0aW9ucy5jb2xvcnM7XG4gIHJldHVybiB3cmFwcGVkU3R5bGVzO1xufVxuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBPcHRpb25zXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIHdpdGhPcHRpb25zKG9wdGlvbnMpe1xuICBpZighb3B0aW9ucykgdGhyb3cgbmV3IEVycm9yKFwiQmFkIG9wdGlvbnMgdmFsdWVzIGZvciByZWFjdC1vdXRsaW5lOlwiK0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpKVxuXG4gIGNvbnN0IHRlbXBPdXRsaW5lRm4gPSAoX3N0eWxlcyxvcHRpb25zT3JMb2dpYyk9PnNhbml0aXplT3V0bGluZShzYW5pdGl6ZU91dGxpbmVJbnB1dChfc3R5bGVzLG9wdGlvbnNPckxvZ2ljKSxvcHRpb25zKVxuICBpZihvcHRpb25zLmNvbG9ycyl7XG4gICAgdGVtcE91dGxpbmVGbi5jb2xvcnMgPSBvcHRpb25zLmNvbG9yc1xuICB9XG4gIHJldHVybiB0ZW1wT3V0bGluZUZuO1xufVxuXG5mdW5jdGlvbiBzZXRPcHRpb25zKG9wdGlvbnMpe1xuICBpZighb3B0aW9ucykgdGhyb3cgbmV3IEVycm9yKFwiQmFkIG9wdGlvbnMgdmFsdWVzIGZvciByZWFjdC1vdXRsaW5lOlwiK0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpKVxuICBpZihvcHRpb25zLmNvbG9ycyl7XG4gICAgb3V0bGluZS5jb2xvcnMgPSBvcHRpb25zLmNvbG9yc1xuICB9XG4gIE9iamVjdC5hc3NpZ24odXNlclNldE9wdGlvbnMsb3B0aW9ucylcbn1cblxuY29uc3QgdGVzdGluZyA9IHtcbiAgcmVzZXRDU1M6IHB1YnN1Yi5jbGVhclxufVxuXG5leHBvcnQgZGVmYXVsdCBvdXRsaW5lXG5leHBvcnQgeyB3aXRoT3B0aW9ucywgc2V0T3B0aW9ucywgU3R5bGVzLCB0ZXN0aW5nIH1cbiJdfQ==