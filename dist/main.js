'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testing = exports.Styles = exports.setOptions = exports.withOptions = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

//+++++++++++++++++++++++++++++ { base:{}, foo: ()=> }
//++++++++++++++++++++++++++++++++++++++++++++++++++++
function sanitizeWrapStyles(_styles) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var styleCSS = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


  if ("object" !== (typeof _styles === 'undefined' ? 'undefined' : _typeof(_styles))) {
    throw new Error("Bad style values: " + JSON.stringify(_styles));
  }

  //+++++++++++++++++++++++++++++++++++++++ [ base, fn ]
  //++++++++++++++++++++++++++++++++++++++++++++++++++++
  if (Array.isArray(_styles)) {

    _styles = Object.assign({}, { base: _styles[0] }, _styles[1]);
  } else if (!("base" in _styles)) {

    var base = {},
        fns = {};

    //++++++++++++++ { table: {}, header:{} }, fn:{ ()=> }
    //++++++++++++++++++++++++++++++++++++++++++++++++++++

    var optionsIsFns = true;

    for (var prop in options) {
      if (options.hasOwnProperty(prop) && "function" !== typeof options[prop]) {
        optionsIsFns = false;
      }
    }

    if (optionsIsFns) {
      Object.assign(fns, options);
    }

    for (var _prop in _styles) {
      //+++++++++++++++++++++++++++ { table: {}, header:{} }
      //++++++++++++++++++++++++++++++++++++++++++++++++++++
      if ("object" === _typeof(_styles[_prop])) {
        base[_prop] = _styles[_prop];
        //++++++++++++++++++++++++++++++++++++++ { foo: ()=> }
        //++++++++++++++++++++++++++++++++++++++++++++++++++++
      } else if ("function" === typeof _styles[_prop]) {
        fns[_prop] = _styles[_prop];
      } else {
        throw new Error("Bad style value: " + JSON.stringify(_styles[_prop]));
      }
    }
    _styles = Object.assign({}, { base: base }, fns);
  }

  var wrappedStyles = wrapStyles(_styles, options, styleCSS);
  wrappedStyles.colors = wrappedStyles.colors || options && options.colors || userSetOptions && userSetOptions.colors;
  return wrappedStyles;
}

//=====================================================
//============================================= Options
//=====================================================

function withOptions(options) {
  if (!options) throw new Error("Bad options values for react-outline:" + JSON.stringify(options));
  return function (_styles) {
    return sanitizeWrapStyles(_styles, options);
  };
}

function setOptions(options) {
  if (!options) throw new Error("Bad options values for react-outline:" + JSON.stringify(options));
  if (options.colors) {
    sanitizeWrapStyles.colors = options.colors;
  }
  Object.assign(userSetOptions, options);
}

var testing = {
  resetCSS: _utils.pubsub.clear
};

exports.default = sanitizeWrapStyles;
exports.withOptions = withOptions;
exports.setOptions = setOptions;
exports.Styles = _Styles2.default;
exports.testing = testing;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9tYWluLmpzIl0sIm5hbWVzIjpbInVzZXJTZXRPcHRpb25zIiwibmFtZWQiLCJ3cmFwU3R5bGVzIiwic2FuaXRpemVXcmFwU3R5bGVzIiwiX3N0eWxlcyIsIm9wdGlvbnMiLCJzdHlsZUNTUyIsIkVycm9yIiwiSlNPTiIsInN0cmluZ2lmeSIsIkFycmF5IiwiaXNBcnJheSIsIk9iamVjdCIsImFzc2lnbiIsImJhc2UiLCJmbnMiLCJvcHRpb25zSXNGbnMiLCJwcm9wIiwiaGFzT3duUHJvcGVydHkiLCJ3cmFwcGVkU3R5bGVzIiwiY29sb3JzIiwid2l0aE9wdGlvbnMiLCJzZXRPcHRpb25zIiwidGVzdGluZyIsInJlc2V0Q1NTIiwiY2xlYXIiLCJTdHlsZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7O0FBRUE7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsaUJBQWlCLEVBQUVDLE9BQU0sSUFBUixDQUFZLDZCQUFaLEVBQXZCOztBQUVBLElBQU1DLGFBQWEsMEJBQWtCRixjQUFsQixDQUFuQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVNHLGtCQUFULENBQTRCQyxPQUE1QixFQUEyRDtBQUFBLE1BQXZCQyxPQUF1Qix1RUFBZixFQUFlO0FBQUEsTUFBWkMsUUFBWSx1RUFBSCxFQUFHOzs7QUFFdkQsTUFBRyxxQkFBb0JGLE9BQXBCLHlDQUFvQkEsT0FBcEIsRUFBSCxFQUErQjtBQUM3QixVQUFNLElBQUlHLEtBQUosQ0FBVSx1QkFBcUJDLEtBQUtDLFNBQUwsQ0FBZUwsT0FBZixDQUEvQixDQUFOO0FBQ0Q7O0FBRUw7QUFDQTtBQUNJLE1BQUdNLE1BQU1DLE9BQU4sQ0FBY1AsT0FBZCxDQUFILEVBQTBCOztBQUV0QkEsY0FBVVEsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBaUIsRUFBQ0MsTUFBS1YsUUFBUSxDQUFSLENBQU4sRUFBakIsRUFBbUNBLFFBQVEsQ0FBUixDQUFuQyxDQUFWO0FBRUgsR0FKRCxNQUlPLElBQUcsRUFBRSxVQUFVQSxPQUFaLENBQUgsRUFBeUI7O0FBRTlCLFFBQU1VLE9BQU8sRUFBYjtBQUFBLFFBQWlCQyxNQUFNLEVBQXZCOztBQUVOO0FBQ0E7O0FBRU0sUUFBSUMsZUFBZSxJQUFuQjs7QUFFQSxTQUFJLElBQU1DLElBQVYsSUFBa0JaLE9BQWxCLEVBQTBCO0FBQ3RCLFVBQUdBLFFBQVFhLGNBQVIsQ0FBdUJELElBQXZCLEtBQWdDLGVBQWUsT0FBT1osUUFBUVksSUFBUixDQUF6RCxFQUF1RTtBQUNyRUQsdUJBQWUsS0FBZjtBQUNEO0FBQ0o7O0FBRUQsUUFBR0EsWUFBSCxFQUFnQjtBQUNkSixhQUFPQyxNQUFQLENBQWNFLEdBQWQsRUFBa0JWLE9BQWxCO0FBQ0Q7O0FBRUQsU0FBSSxJQUFNWSxLQUFWLElBQWtCYixPQUFsQixFQUEwQjtBQUNoQztBQUNBO0FBQ1UsVUFBRyxxQkFBb0JBLFFBQVFhLEtBQVIsQ0FBcEIsQ0FBSCxFQUFxQztBQUNuQ0gsYUFBS0csS0FBTCxJQUFhYixRQUFRYSxLQUFSLENBQWI7QUFDWjtBQUNBO0FBQ1csT0FKRCxNQUlPLElBQUcsZUFBZSxPQUFPYixRQUFRYSxLQUFSLENBQXpCLEVBQXVDO0FBQzVDRixZQUFJRSxLQUFKLElBQVliLFFBQVFhLEtBQVIsQ0FBWjtBQUNELE9BRk0sTUFFQTtBQUNMLGNBQU0sSUFBSVYsS0FBSixDQUFVLHNCQUFvQkMsS0FBS0MsU0FBTCxDQUFlTCxRQUFRYSxLQUFSLENBQWYsQ0FBOUIsQ0FBTjtBQUNEO0FBQ0o7QUFDRGIsY0FBVVEsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBaUIsRUFBQ0MsVUFBRCxFQUFqQixFQUF3QkMsR0FBeEIsQ0FBVjtBQUNEOztBQUVILE1BQU1JLGdCQUFnQmpCLFdBQVdFLE9BQVgsRUFBbUJDLE9BQW5CLEVBQTJCQyxRQUEzQixDQUF0QjtBQUNNYSxnQkFBY0MsTUFBZCxHQUF1QkQsY0FBY0MsTUFBZCxJQUNBZixXQUFrQkEsUUFBUWUsTUFEMUIsSUFFQXBCLGtCQUFrQkEsZUFBZW9CLE1BRnhEO0FBR04sU0FBT0QsYUFBUDtBQUNEOztBQUVEO0FBQ0E7QUFDQTs7QUFFQSxTQUFTRSxXQUFULENBQXFCaEIsT0FBckIsRUFBNkI7QUFDM0IsTUFBRyxDQUFDQSxPQUFKLEVBQWEsTUFBTSxJQUFJRSxLQUFKLENBQVUsMENBQXdDQyxLQUFLQyxTQUFMLENBQWVKLE9BQWYsQ0FBbEQsQ0FBTjtBQUNiLFNBQU8sVUFBQ0QsT0FBRDtBQUFBLFdBQVdELG1CQUFtQkMsT0FBbkIsRUFBMkJDLE9BQTNCLENBQVg7QUFBQSxHQUFQO0FBQ0Q7O0FBRUQsU0FBU2lCLFVBQVQsQ0FBb0JqQixPQUFwQixFQUE0QjtBQUMxQixNQUFHLENBQUNBLE9BQUosRUFBYSxNQUFNLElBQUlFLEtBQUosQ0FBVSwwQ0FBd0NDLEtBQUtDLFNBQUwsQ0FBZUosT0FBZixDQUFsRCxDQUFOO0FBQ2IsTUFBR0EsUUFBUWUsTUFBWCxFQUFrQjtBQUNoQmpCLHVCQUFtQmlCLE1BQW5CLEdBQTRCZixRQUFRZSxNQUFwQztBQUNEO0FBQ0RSLFNBQU9DLE1BQVAsQ0FBY2IsY0FBZCxFQUE2QkssT0FBN0I7QUFDRDs7QUFFRCxJQUFNa0IsVUFBVTtBQUNkQyxZQUFVLGNBQU9DO0FBREgsQ0FBaEI7O2tCQUlldEIsa0I7UUFDTmtCLFcsR0FBQUEsVztRQUFhQyxVLEdBQUFBLFU7UUFBWUksTTtRQUFRSCxPLEdBQUFBLE8iLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgcHVic3ViIH0gZnJvbSAnLi91dGlscydcblxuaW1wb3J0IHdyYXBTdHlsZXNGYWN0b3J5IGZyb20gJy4vd3JhcFN0eWxlcydcbmltcG9ydCBTdHlsZXMgZnJvbSAnLi9TdHlsZXMnXG5cbmNvbnN0IHVzZXJTZXRPcHRpb25zID0geyBuYW1lZDp0cnVlLyogcHJlZml4OmdldFZlbmRvclByZWZpeCgpKi8gfVxuXG5jb25zdCB3cmFwU3R5bGVzID0gd3JhcFN0eWxlc0ZhY3RvcnkodXNlclNldE9wdGlvbnMpXG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gdG9wIExldmVsIC0gV3JhcCBTdHlsZXNcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLy8rKysrKysrKysrKysrKysrKysrKysrKysrKysrKyB7IGJhc2U6e30sIGZvbzogKCk9PiB9XG4vLysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKytcbmZ1bmN0aW9uIHNhbml0aXplV3JhcFN0eWxlcyhfc3R5bGVzLG9wdGlvbnM9e30sc3R5bGVDU1M9e30pe1xuXG4gICAgaWYoXCJvYmplY3RcIiAhPT0gdHlwZW9mIF9zdHlsZXMpe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIHN0eWxlIHZhbHVlczogXCIrSlNPTi5zdHJpbmdpZnkoX3N0eWxlcykpXG4gICAgfVxuXG4vLysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKyBbIGJhc2UsIGZuIF1cbi8vKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK1xuICAgIGlmKEFycmF5LmlzQXJyYXkoX3N0eWxlcykpe1xuXG4gICAgICAgIF9zdHlsZXMgPSBPYmplY3QuYXNzaWduKHt9LHtiYXNlOl9zdHlsZXNbMF19LF9zdHlsZXNbMV0pXG5cbiAgICB9IGVsc2UgaWYoIShcImJhc2VcIiBpbiBfc3R5bGVzKSkge1xuXG4gICAgICBjb25zdCBiYXNlID0ge30sIGZucyA9IHt9O1xuXG4vLysrKysrKysrKysrKysrIHsgdGFibGU6IHt9LCBoZWFkZXI6e30gfSwgZm46eyAoKT0+IH1cbi8vKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK1xuXG4gICAgICBsZXQgb3B0aW9uc0lzRm5zID0gdHJ1ZTtcblxuICAgICAgZm9yKGNvbnN0IHByb3AgaW4gb3B0aW9ucyl7XG4gICAgICAgICAgaWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShwcm9wKSAmJiBcImZ1bmN0aW9uXCIgIT09IHR5cGVvZiBvcHRpb25zW3Byb3BdKXtcbiAgICAgICAgICAgIG9wdGlvbnNJc0ZucyA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYob3B0aW9uc0lzRm5zKXtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihmbnMsb3B0aW9ucylcbiAgICAgIH1cblxuICAgICAgZm9yKGNvbnN0IHByb3AgaW4gX3N0eWxlcyl7XG4vLysrKysrKysrKysrKysrKysrKysrKysrKysrKyB7IHRhYmxlOiB7fSwgaGVhZGVyOnt9IH1cbi8vKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK1xuICAgICAgICAgIGlmKFwib2JqZWN0XCIgPT09IHR5cGVvZiBfc3R5bGVzW3Byb3BdKXtcbiAgICAgICAgICAgIGJhc2VbcHJvcF0gPSBfc3R5bGVzW3Byb3BdXG4vLysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrIHsgZm9vOiAoKT0+IH1cbi8vKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK1xuICAgICAgICAgIH0gZWxzZSBpZihcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBfc3R5bGVzW3Byb3BdKXtcbiAgICAgICAgICAgIGZuc1twcm9wXSA9IF9zdHlsZXNbcHJvcF1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIHN0eWxlIHZhbHVlOiBcIitKU09OLnN0cmluZ2lmeShfc3R5bGVzW3Byb3BdKSlcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICBfc3R5bGVzID0gT2JqZWN0LmFzc2lnbih7fSx7YmFzZX0sZm5zKTtcbiAgICB9XG5cbiAgY29uc3Qgd3JhcHBlZFN0eWxlcyA9IHdyYXBTdHlsZXMoX3N0eWxlcyxvcHRpb25zLHN0eWxlQ1NTKTtcbiAgICAgICAgd3JhcHBlZFN0eWxlcy5jb2xvcnMgPSB3cmFwcGVkU3R5bGVzLmNvbG9yc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IG9wdGlvbnMgICAgICAgICYmIG9wdGlvbnMuY29sb3JzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgdXNlclNldE9wdGlvbnMgJiYgdXNlclNldE9wdGlvbnMuY29sb3JzO1xuICByZXR1cm4gd3JhcHBlZFN0eWxlcztcbn1cblxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gT3B0aW9uc1xuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiB3aXRoT3B0aW9ucyhvcHRpb25zKXtcbiAgaWYoIW9wdGlvbnMpIHRocm93IG5ldyBFcnJvcihcIkJhZCBvcHRpb25zIHZhbHVlcyBmb3IgcmVhY3Qtb3V0bGluZTpcIitKU09OLnN0cmluZ2lmeShvcHRpb25zKSlcbiAgcmV0dXJuIChfc3R5bGVzKT0+c2FuaXRpemVXcmFwU3R5bGVzKF9zdHlsZXMsb3B0aW9ucylcbn1cblxuZnVuY3Rpb24gc2V0T3B0aW9ucyhvcHRpb25zKXtcbiAgaWYoIW9wdGlvbnMpIHRocm93IG5ldyBFcnJvcihcIkJhZCBvcHRpb25zIHZhbHVlcyBmb3IgcmVhY3Qtb3V0bGluZTpcIitKU09OLnN0cmluZ2lmeShvcHRpb25zKSlcbiAgaWYob3B0aW9ucy5jb2xvcnMpe1xuICAgIHNhbml0aXplV3JhcFN0eWxlcy5jb2xvcnMgPSBvcHRpb25zLmNvbG9yc1xuICB9XG4gIE9iamVjdC5hc3NpZ24odXNlclNldE9wdGlvbnMsb3B0aW9ucylcbn1cblxuY29uc3QgdGVzdGluZyA9IHtcbiAgcmVzZXRDU1M6IHB1YnN1Yi5jbGVhclxufVxuXG5leHBvcnQgZGVmYXVsdCBzYW5pdGl6ZVdyYXBTdHlsZXNcbmV4cG9ydCB7IHdpdGhPcHRpb25zLCBzZXRPcHRpb25zLCBTdHlsZXMsIHRlc3RpbmcgfVxuIl19