"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = sanitizeOutlineInput;
//+++++++++++++++++++++++++++++ { base:{}, foo: ()=> }
//++++++++++++++++++++++++++++++++++++++++++++++++++++
function sanitizeOutlineInput(_styles) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


  if ("object" !== (typeof _styles === "undefined" ? "undefined" : _typeof(_styles))) {
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

  // apply sharing

  var _loop = function _loop(_prop2) {
    if (0 < _prop2.indexOf(',')) {
      _prop2.split(',').map(function (x) {
        return x.trim();
      }).forEach(function (x) {
        var root = _styles.base;
        var val = Object.assign({}, root[_prop2],
        // we need to check if x exists in root style.
        // e.g. "foo , bar" (cross cutting style) is in style Object
        // but "foo" & "bar" are functions
        root[x] && root[x].base ? root[x].base : root[x]);

        root[x] && root[x].base ? root[x].base = val : root[x] = val;
      });
      delete _styles.base[_prop2];
    }
  };

  for (var _prop2 in _styles.base) {
    _loop(_prop2);
  }

  return _styles;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS91dGlscy9zYW5pdGl6ZU91dGxpbmVJbnB1dC5qcyJdLCJuYW1lcyI6WyJzYW5pdGl6ZU91dGxpbmVJbnB1dCIsIl9zdHlsZXMiLCJvcHRpb25zIiwiRXJyb3IiLCJKU09OIiwic3RyaW5naWZ5IiwiQXJyYXkiLCJpc0FycmF5IiwiT2JqZWN0IiwiYXNzaWduIiwiYmFzZSIsImZucyIsIm9wdGlvbnNJc0ZucyIsInByb3AiLCJoYXNPd25Qcm9wZXJ0eSIsImluZGV4T2YiLCJzcGxpdCIsIm1hcCIsIngiLCJ0cmltIiwiZm9yRWFjaCIsInJvb3QiLCJ2YWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O2tCQUV3QkEsb0I7QUFGeEI7QUFDQTtBQUNlLFNBQVNBLG9CQUFULENBQThCQyxPQUE5QixFQUFpRDtBQUFBLE1BQVhDLE9BQVcsdUVBQUgsRUFBRzs7O0FBRTVELE1BQUcscUJBQW9CRCxPQUFwQix5Q0FBb0JBLE9BQXBCLEVBQUgsRUFBK0I7QUFDN0IsVUFBTSxJQUFJRSxLQUFKLENBQVUsdUJBQXFCQyxLQUFLQyxTQUFMLENBQWVKLE9BQWYsQ0FBL0IsQ0FBTjtBQUNEOztBQUVMO0FBQ0E7QUFDSSxNQUFHSyxNQUFNQyxPQUFOLENBQWNOLE9BQWQsQ0FBSCxFQUEwQjs7QUFFdEJBLGNBQVVPLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWlCLEVBQUNDLE1BQUtULFFBQVEsQ0FBUixDQUFOLEVBQWpCLEVBQW1DQSxRQUFRLENBQVIsQ0FBbkMsQ0FBVjtBQUVILEdBSkQsTUFJTyxJQUFHLEVBQUUsVUFBVUEsT0FBWixDQUFILEVBQXlCOztBQUU5QixRQUFNUyxPQUFPLEVBQWI7QUFBQSxRQUFpQkMsTUFBTSxFQUF2Qjs7QUFFTjtBQUNBOztBQUVNLFFBQUlDLGVBQWUsSUFBbkI7O0FBRUEsU0FBSSxJQUFNQyxJQUFWLElBQWtCWCxPQUFsQixFQUEwQjtBQUN0QixVQUFHQSxRQUFRWSxjQUFSLENBQXVCRCxJQUF2QixLQUFnQyxlQUFlLE9BQU9YLFFBQVFXLElBQVIsQ0FBekQsRUFBdUU7QUFDckVELHVCQUFlLEtBQWY7QUFDRDtBQUNKOztBQUVELFFBQUdBLFlBQUgsRUFBZ0I7QUFDZEosYUFBT0MsTUFBUCxDQUFjRSxHQUFkLEVBQWtCVCxPQUFsQjtBQUNEOztBQUVELFNBQUksSUFBTVcsS0FBVixJQUFrQlosT0FBbEIsRUFBMEI7QUFDaEM7QUFDQTtBQUNVLFVBQUcscUJBQW9CQSxRQUFRWSxLQUFSLENBQXBCLENBQUgsRUFBcUM7QUFDbkNILGFBQUtHLEtBQUwsSUFBYVosUUFBUVksS0FBUixDQUFiO0FBQ1o7QUFDQTtBQUNXLE9BSkQsTUFJTyxJQUFHLGVBQWUsT0FBT1osUUFBUVksS0FBUixDQUF6QixFQUF1QztBQUM1Q0YsWUFBSUUsS0FBSixJQUFZWixRQUFRWSxLQUFSLENBQVo7QUFDRCxPQUZNLE1BRUE7QUFDTCxjQUFNLElBQUlWLEtBQUosQ0FBVSxzQkFBb0JDLEtBQUtDLFNBQUwsQ0FBZUosUUFBUVksS0FBUixDQUFmLENBQTlCLENBQU47QUFDRDtBQUNKO0FBQ0RaLGNBQVVPLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWlCLEVBQUNDLFVBQUQsRUFBakIsRUFBd0JDLEdBQXhCLENBQVY7QUFDRDs7QUFFRDs7QUEvQzRELDZCQWdEbERFLE1BaERrRDtBQWlEMUQsUUFBRyxJQUFJQSxPQUFLRSxPQUFMLENBQWEsR0FBYixDQUFQLEVBQXlCO0FBQ3ZCRixhQUFLRyxLQUFMLENBQVcsR0FBWCxFQUNDQyxHQURELENBQ0s7QUFBQSxlQUFHQyxFQUFFQyxJQUFGLEVBQUg7QUFBQSxPQURMLEVBRUNDLE9BRkQsQ0FFVSxhQUFLO0FBQ2IsWUFBTUMsT0FBT3BCLFFBQVFTLElBQXJCO0FBQ0EsWUFBSVksTUFBTWQsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JZLEtBQUtSLE1BQUwsQ0FBbEI7QUFDUjtBQUNBO0FBQ0E7QUFDQVEsYUFBS0gsQ0FBTCxLQUFXRyxLQUFLSCxDQUFMLEVBQVFSLElBQW5CLEdBQTBCVyxLQUFLSCxDQUFMLEVBQVFSLElBQWxDLEdBQXlDVyxLQUFLSCxDQUFMLENBSmpDLENBQVY7O0FBTUZHLGFBQUtILENBQUwsS0FBV0csS0FBS0gsQ0FBTCxFQUFRUixJQUFuQixHQUEwQlcsS0FBS0gsQ0FBTCxFQUFRUixJQUFSLEdBQWVZLEdBQXpDLEdBQStDRCxLQUFLSCxDQUFMLElBQVVJLEdBQXpEO0FBRUMsT0FaRDtBQWFBLGFBQU9yQixRQUFRUyxJQUFSLENBQWFHLE1BQWIsQ0FBUDtBQUNEO0FBaEV5RDs7QUFnRDVELE9BQUksSUFBTUEsTUFBVixJQUFrQlosUUFBUVMsSUFBMUIsRUFBK0I7QUFBQSxVQUFyQkcsTUFBcUI7QUFpQjlCOztBQUdELFNBQU9aLE9BQVA7QUFDSCIsImZpbGUiOiJzYW5pdGl6ZU91dGxpbmVJbnB1dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vKysrKysrKysrKysrKysrKysrKysrKysrKysrKysgeyBiYXNlOnt9LCBmb286ICgpPT4gfVxuLy8rKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzYW5pdGl6ZU91dGxpbmVJbnB1dChfc3R5bGVzLG9wdGlvbnM9e30pe1xuXG4gICAgaWYoXCJvYmplY3RcIiAhPT0gdHlwZW9mIF9zdHlsZXMpe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIHN0eWxlIHZhbHVlczogXCIrSlNPTi5zdHJpbmdpZnkoX3N0eWxlcykpXG4gICAgfVxuXG4vLysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKyBbIGJhc2UsIGZuIF1cbi8vKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK1xuICAgIGlmKEFycmF5LmlzQXJyYXkoX3N0eWxlcykpe1xuXG4gICAgICAgIF9zdHlsZXMgPSBPYmplY3QuYXNzaWduKHt9LHtiYXNlOl9zdHlsZXNbMF19LF9zdHlsZXNbMV0pXG5cbiAgICB9IGVsc2UgaWYoIShcImJhc2VcIiBpbiBfc3R5bGVzKSkge1xuXG4gICAgICBjb25zdCBiYXNlID0ge30sIGZucyA9IHt9O1xuXG4vLysrKysrKysrKysrKysrIHsgdGFibGU6IHt9LCBoZWFkZXI6e30gfSwgZm46eyAoKT0+IH1cbi8vKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK1xuXG4gICAgICBsZXQgb3B0aW9uc0lzRm5zID0gdHJ1ZTtcblxuICAgICAgZm9yKGNvbnN0IHByb3AgaW4gb3B0aW9ucyl7XG4gICAgICAgICAgaWYob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShwcm9wKSAmJiBcImZ1bmN0aW9uXCIgIT09IHR5cGVvZiBvcHRpb25zW3Byb3BdKXtcbiAgICAgICAgICAgIG9wdGlvbnNJc0ZucyA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYob3B0aW9uc0lzRm5zKXtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihmbnMsb3B0aW9ucylcbiAgICAgIH1cblxuICAgICAgZm9yKGNvbnN0IHByb3AgaW4gX3N0eWxlcyl7XG4vLysrKysrKysrKysrKysrKysrKysrKysrKysrKyB7IHRhYmxlOiB7fSwgaGVhZGVyOnt9IH1cbi8vKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK1xuICAgICAgICAgIGlmKFwib2JqZWN0XCIgPT09IHR5cGVvZiBfc3R5bGVzW3Byb3BdKXtcbiAgICAgICAgICAgIGJhc2VbcHJvcF0gPSBfc3R5bGVzW3Byb3BdXG4vLysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrIHsgZm9vOiAoKT0+IH1cbi8vKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK1xuICAgICAgICAgIH0gZWxzZSBpZihcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBfc3R5bGVzW3Byb3BdKXtcbiAgICAgICAgICAgIGZuc1twcm9wXSA9IF9zdHlsZXNbcHJvcF1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQmFkIHN0eWxlIHZhbHVlOiBcIitKU09OLnN0cmluZ2lmeShfc3R5bGVzW3Byb3BdKSlcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICBfc3R5bGVzID0gT2JqZWN0LmFzc2lnbih7fSx7YmFzZX0sZm5zKTtcbiAgICB9XG5cbiAgICAvLyBhcHBseSBzaGFyaW5nXG4gICAgZm9yKGNvbnN0IHByb3AgaW4gX3N0eWxlcy5iYXNlKXtcbiAgICAgIGlmKDAgPCBwcm9wLmluZGV4T2YoJywnKSl7XG4gICAgICAgIHByb3Auc3BsaXQoJywnKVxuICAgICAgICAubWFwKHg9PngudHJpbSgpKVxuICAgICAgICAuZm9yRWFjaCggeCA9PiB7XG4gICAgICAgICAgY29uc3Qgcm9vdCA9IF9zdHlsZXMuYmFzZTtcbiAgICAgICAgICB2YXIgdmFsID0gT2JqZWN0LmFzc2lnbih7fSwgcm9vdFtwcm9wXSxcbiAgICAgICAgICAgIC8vIHdlIG5lZWQgdG8gY2hlY2sgaWYgeCBleGlzdHMgaW4gcm9vdCBzdHlsZS5cbiAgICAgICAgICAgIC8vIGUuZy4gXCJmb28gLCBiYXJcIiAoY3Jvc3MgY3V0dGluZyBzdHlsZSkgaXMgaW4gc3R5bGUgT2JqZWN0XG4gICAgICAgICAgICAvLyBidXQgXCJmb29cIiAmIFwiYmFyXCIgYXJlIGZ1bmN0aW9uc1xuICAgICAgICAgICAgcm9vdFt4XSAmJiByb290W3hdLmJhc2UgPyByb290W3hdLmJhc2UgOiByb290W3hdKTtcblxuICAgICAgICByb290W3hdICYmIHJvb3RbeF0uYmFzZSA/IHJvb3RbeF0uYmFzZSA9IHZhbCA6IHJvb3RbeF0gPSB2YWxcblxuICAgICAgICB9IClcbiAgICAgICAgZGVsZXRlIF9zdHlsZXMuYmFzZVtwcm9wXVxuICAgICAgfVxuICAgIH1cblxuXG4gICAgcmV0dXJuIF9zdHlsZXM7XG59XG4iXX0=