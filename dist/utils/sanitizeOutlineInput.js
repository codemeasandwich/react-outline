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
        var val = Object.assign({}, root[_prop2], root[x].base ? root[x].base : root[x]);

        root[x].base ? root[x].base = val : root[x] = val;
      });
      delete _styles.base[_prop2];
    }
  };

  for (var _prop2 in _styles.base) {
    _loop(_prop2);
  }

  return _styles;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS91dGlscy9zYW5pdGl6ZU91dGxpbmVJbnB1dC5qcyJdLCJuYW1lcyI6WyJzYW5pdGl6ZU91dGxpbmVJbnB1dCIsIl9zdHlsZXMiLCJvcHRpb25zIiwiRXJyb3IiLCJKU09OIiwic3RyaW5naWZ5IiwiQXJyYXkiLCJpc0FycmF5IiwiT2JqZWN0IiwiYXNzaWduIiwiYmFzZSIsImZucyIsIm9wdGlvbnNJc0ZucyIsInByb3AiLCJoYXNPd25Qcm9wZXJ0eSIsImluZGV4T2YiLCJzcGxpdCIsIm1hcCIsIngiLCJ0cmltIiwiZm9yRWFjaCIsInJvb3QiLCJ2YWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O2tCQUV3QkEsb0I7QUFGeEI7QUFDQTtBQUNlLFNBQVNBLG9CQUFULENBQThCQyxPQUE5QixFQUFpRDtBQUFBLE1BQVhDLE9BQVcsdUVBQUgsRUFBRzs7O0FBRTVELE1BQUcscUJBQW9CRCxPQUFwQix5Q0FBb0JBLE9BQXBCLEVBQUgsRUFBK0I7QUFDN0IsVUFBTSxJQUFJRSxLQUFKLENBQVUsdUJBQXFCQyxLQUFLQyxTQUFMLENBQWVKLE9BQWYsQ0FBL0IsQ0FBTjtBQUNEOztBQUVMO0FBQ0E7QUFDSSxNQUFHSyxNQUFNQyxPQUFOLENBQWNOLE9BQWQsQ0FBSCxFQUEwQjs7QUFFdEJBLGNBQVVPLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWlCLEVBQUNDLE1BQUtULFFBQVEsQ0FBUixDQUFOLEVBQWpCLEVBQW1DQSxRQUFRLENBQVIsQ0FBbkMsQ0FBVjtBQUVILEdBSkQsTUFJTyxJQUFHLEVBQUUsVUFBVUEsT0FBWixDQUFILEVBQXlCOztBQUU5QixRQUFNUyxPQUFPLEVBQWI7QUFBQSxRQUFpQkMsTUFBTSxFQUF2Qjs7QUFFTjtBQUNBOztBQUVNLFFBQUlDLGVBQWUsSUFBbkI7O0FBRUEsU0FBSSxJQUFNQyxJQUFWLElBQWtCWCxPQUFsQixFQUEwQjtBQUN0QixVQUFHQSxRQUFRWSxjQUFSLENBQXVCRCxJQUF2QixLQUFnQyxlQUFlLE9BQU9YLFFBQVFXLElBQVIsQ0FBekQsRUFBdUU7QUFDckVELHVCQUFlLEtBQWY7QUFDRDtBQUNKOztBQUVELFFBQUdBLFlBQUgsRUFBZ0I7QUFDZEosYUFBT0MsTUFBUCxDQUFjRSxHQUFkLEVBQWtCVCxPQUFsQjtBQUNEOztBQUVELFNBQUksSUFBTVcsS0FBVixJQUFrQlosT0FBbEIsRUFBMEI7QUFDaEM7QUFDQTtBQUNVLFVBQUcscUJBQW9CQSxRQUFRWSxLQUFSLENBQXBCLENBQUgsRUFBcUM7QUFDbkNILGFBQUtHLEtBQUwsSUFBYVosUUFBUVksS0FBUixDQUFiO0FBQ1o7QUFDQTtBQUNXLE9BSkQsTUFJTyxJQUFHLGVBQWUsT0FBT1osUUFBUVksS0FBUixDQUF6QixFQUF1QztBQUM1Q0YsWUFBSUUsS0FBSixJQUFZWixRQUFRWSxLQUFSLENBQVo7QUFDRCxPQUZNLE1BRUE7QUFDTCxjQUFNLElBQUlWLEtBQUosQ0FBVSxzQkFBb0JDLEtBQUtDLFNBQUwsQ0FBZUosUUFBUVksS0FBUixDQUFmLENBQTlCLENBQU47QUFDRDtBQUNKO0FBQ0RaLGNBQVVPLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWlCLEVBQUNDLFVBQUQsRUFBakIsRUFBd0JDLEdBQXhCLENBQVY7QUFDRDs7QUFFRDs7QUEvQzRELDZCQWdEbERFLE1BaERrRDtBQWlEMUQsUUFBRyxJQUFJQSxPQUFLRSxPQUFMLENBQWEsR0FBYixDQUFQLEVBQXlCO0FBQ3ZCRixhQUFLRyxLQUFMLENBQVcsR0FBWCxFQUNDQyxHQURELENBQ0s7QUFBQSxlQUFHQyxFQUFFQyxJQUFGLEVBQUg7QUFBQSxPQURMLEVBRUNDLE9BRkQsQ0FFVSxhQUFLO0FBQ2IsWUFBTUMsT0FBT3BCLFFBQVFTLElBQXJCO0FBQ0EsWUFBTVksTUFBTWQsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBaUJZLEtBQUtSLE1BQUwsQ0FBakIsRUFBNEJRLEtBQUtILENBQUwsRUFBUVIsSUFBUixHQUFlVyxLQUFLSCxDQUFMLEVBQVFSLElBQXZCLEdBQThCVyxLQUFLSCxDQUFMLENBQTFELENBQVo7O0FBRUFHLGFBQUtILENBQUwsRUFBUVIsSUFBUixHQUFlVyxLQUFLSCxDQUFMLEVBQVFSLElBQVIsR0FBZVksR0FBOUIsR0FBb0NELEtBQUtILENBQUwsSUFBVUksR0FBOUM7QUFFRCxPQVJEO0FBU0EsYUFBT3JCLFFBQVFTLElBQVIsQ0FBYUcsTUFBYixDQUFQO0FBQ0Q7QUE1RHlEOztBQWdENUQsT0FBSSxJQUFNQSxNQUFWLElBQWtCWixRQUFRUyxJQUExQixFQUErQjtBQUFBLFVBQXJCRyxNQUFxQjtBQWE5Qjs7QUFHRCxTQUFPWixPQUFQO0FBQ0giLCJmaWxlIjoic2FuaXRpemVPdXRsaW5lSW5wdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLysrKysrKysrKysrKysrKysrKysrKysrKysrKysrIHsgYmFzZTp7fSwgZm9vOiAoKT0+IH1cbi8vKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2FuaXRpemVPdXRsaW5lSW5wdXQoX3N0eWxlcyxvcHRpb25zPXt9KXtcblxuICAgIGlmKFwib2JqZWN0XCIgIT09IHR5cGVvZiBfc3R5bGVzKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCBzdHlsZSB2YWx1ZXM6IFwiK0pTT04uc3RyaW5naWZ5KF9zdHlsZXMpKVxuICAgIH1cblxuLy8rKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysgWyBiYXNlLCBmbiBdXG4vLysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKytcbiAgICBpZihBcnJheS5pc0FycmF5KF9zdHlsZXMpKXtcblxuICAgICAgICBfc3R5bGVzID0gT2JqZWN0LmFzc2lnbih7fSx7YmFzZTpfc3R5bGVzWzBdfSxfc3R5bGVzWzFdKVxuXG4gICAgfSBlbHNlIGlmKCEoXCJiYXNlXCIgaW4gX3N0eWxlcykpIHtcblxuICAgICAgY29uc3QgYmFzZSA9IHt9LCBmbnMgPSB7fTtcblxuLy8rKysrKysrKysrKysrKyB7IHRhYmxlOiB7fSwgaGVhZGVyOnt9IH0sIGZuOnsgKCk9PiB9XG4vLysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKytcblxuICAgICAgbGV0IG9wdGlvbnNJc0ZucyA9IHRydWU7XG5cbiAgICAgIGZvcihjb25zdCBwcm9wIGluIG9wdGlvbnMpe1xuICAgICAgICAgIGlmKG9wdGlvbnMuaGFzT3duUHJvcGVydHkocHJvcCkgJiYgXCJmdW5jdGlvblwiICE9PSB0eXBlb2Ygb3B0aW9uc1twcm9wXSl7XG4gICAgICAgICAgICBvcHRpb25zSXNGbnMgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmKG9wdGlvbnNJc0Zucyl7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZm5zLG9wdGlvbnMpXG4gICAgICB9XG5cbiAgICAgIGZvcihjb25zdCBwcm9wIGluIF9zdHlsZXMpe1xuLy8rKysrKysrKysrKysrKysrKysrKysrKysrKysgeyB0YWJsZToge30sIGhlYWRlcjp7fSB9XG4vLysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKytcbiAgICAgICAgICBpZihcIm9iamVjdFwiID09PSB0eXBlb2YgX3N0eWxlc1twcm9wXSl7XG4gICAgICAgICAgICBiYXNlW3Byb3BdID0gX3N0eWxlc1twcm9wXVxuLy8rKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKyB7IGZvbzogKCk9PiB9XG4vLysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKytcbiAgICAgICAgICB9IGVsc2UgaWYoXCJmdW5jdGlvblwiID09PSB0eXBlb2YgX3N0eWxlc1twcm9wXSl7XG4gICAgICAgICAgICBmbnNbcHJvcF0gPSBfc3R5bGVzW3Byb3BdXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkJhZCBzdHlsZSB2YWx1ZTogXCIrSlNPTi5zdHJpbmdpZnkoX3N0eWxlc1twcm9wXSkpXG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgX3N0eWxlcyA9IE9iamVjdC5hc3NpZ24oe30se2Jhc2V9LGZucyk7XG4gICAgfVxuXG4gICAgLy8gYXBwbHkgc2hhcmluZ1xuICAgIGZvcihjb25zdCBwcm9wIGluIF9zdHlsZXMuYmFzZSl7XG4gICAgICBpZigwIDwgcHJvcC5pbmRleE9mKCcsJykpe1xuICAgICAgICBwcm9wLnNwbGl0KCcsJylcbiAgICAgICAgLm1hcCh4PT54LnRyaW0oKSlcbiAgICAgICAgLmZvckVhY2goIHggPT4ge1xuICAgICAgICAgIGNvbnN0IHJvb3QgPSBfc3R5bGVzLmJhc2U7XG4gICAgICAgICAgY29uc3QgdmFsID0gT2JqZWN0LmFzc2lnbih7fSxyb290W3Byb3BdLHJvb3RbeF0uYmFzZSA/IHJvb3RbeF0uYmFzZSA6IHJvb3RbeF0gKVxuXG4gICAgICAgICAgcm9vdFt4XS5iYXNlID8gcm9vdFt4XS5iYXNlID0gdmFsIDogcm9vdFt4XSA9IHZhbFxuXG4gICAgICAgIH0gKVxuICAgICAgICBkZWxldGUgX3N0eWxlcy5iYXNlW3Byb3BdXG4gICAgICB9XG4gICAgfVxuXG5cbiAgICByZXR1cm4gX3N0eWxlcztcbn1cbiJdfQ==