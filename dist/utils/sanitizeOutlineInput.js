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
  return _styles;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS91dGlscy9zYW5pdGl6ZU91dGxpbmVJbnB1dC5qcyJdLCJuYW1lcyI6WyJzYW5pdGl6ZU91dGxpbmVJbnB1dCIsIl9zdHlsZXMiLCJvcHRpb25zIiwiRXJyb3IiLCJKU09OIiwic3RyaW5naWZ5IiwiQXJyYXkiLCJpc0FycmF5IiwiT2JqZWN0IiwiYXNzaWduIiwiYmFzZSIsImZucyIsIm9wdGlvbnNJc0ZucyIsInByb3AiLCJoYXNPd25Qcm9wZXJ0eSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBRXdCQSxvQjtBQUZ4QjtBQUNBO0FBQ2UsU0FBU0Esb0JBQVQsQ0FBOEJDLE9BQTlCLEVBQWlEO0FBQUEsTUFBWEMsT0FBVyx1RUFBSCxFQUFHOzs7QUFFNUQsTUFBRyxxQkFBb0JELE9BQXBCLHlDQUFvQkEsT0FBcEIsRUFBSCxFQUErQjtBQUM3QixVQUFNLElBQUlFLEtBQUosQ0FBVSx1QkFBcUJDLEtBQUtDLFNBQUwsQ0FBZUosT0FBZixDQUEvQixDQUFOO0FBQ0Q7O0FBRUw7QUFDQTtBQUNJLE1BQUdLLE1BQU1DLE9BQU4sQ0FBY04sT0FBZCxDQUFILEVBQTBCOztBQUV0QkEsY0FBVU8sT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBaUIsRUFBQ0MsTUFBS1QsUUFBUSxDQUFSLENBQU4sRUFBakIsRUFBbUNBLFFBQVEsQ0FBUixDQUFuQyxDQUFWO0FBRUgsR0FKRCxNQUlPLElBQUcsRUFBRSxVQUFVQSxPQUFaLENBQUgsRUFBeUI7O0FBRTlCLFFBQU1TLE9BQU8sRUFBYjtBQUFBLFFBQWlCQyxNQUFNLEVBQXZCOztBQUVOO0FBQ0E7O0FBRU0sUUFBSUMsZUFBZSxJQUFuQjs7QUFFQSxTQUFJLElBQU1DLElBQVYsSUFBa0JYLE9BQWxCLEVBQTBCO0FBQ3RCLFVBQUdBLFFBQVFZLGNBQVIsQ0FBdUJELElBQXZCLEtBQWdDLGVBQWUsT0FBT1gsUUFBUVcsSUFBUixDQUF6RCxFQUF1RTtBQUNyRUQsdUJBQWUsS0FBZjtBQUNEO0FBQ0o7O0FBRUQsUUFBR0EsWUFBSCxFQUFnQjtBQUNkSixhQUFPQyxNQUFQLENBQWNFLEdBQWQsRUFBa0JULE9BQWxCO0FBQ0Q7O0FBRUQsU0FBSSxJQUFNVyxLQUFWLElBQWtCWixPQUFsQixFQUEwQjtBQUNoQztBQUNBO0FBQ1UsVUFBRyxxQkFBb0JBLFFBQVFZLEtBQVIsQ0FBcEIsQ0FBSCxFQUFxQztBQUNuQ0gsYUFBS0csS0FBTCxJQUFhWixRQUFRWSxLQUFSLENBQWI7QUFDWjtBQUNBO0FBQ1csT0FKRCxNQUlPLElBQUcsZUFBZSxPQUFPWixRQUFRWSxLQUFSLENBQXpCLEVBQXVDO0FBQzVDRixZQUFJRSxLQUFKLElBQVlaLFFBQVFZLEtBQVIsQ0FBWjtBQUNELE9BRk0sTUFFQTtBQUNMLGNBQU0sSUFBSVYsS0FBSixDQUFVLHNCQUFvQkMsS0FBS0MsU0FBTCxDQUFlSixRQUFRWSxLQUFSLENBQWYsQ0FBOUIsQ0FBTjtBQUNEO0FBQ0o7QUFDRFosY0FBVU8sT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBaUIsRUFBQ0MsVUFBRCxFQUFqQixFQUF3QkMsR0FBeEIsQ0FBVjtBQUNEO0FBQ0QsU0FBT1YsT0FBUDtBQUNIIiwiZmlsZSI6InNhbml0aXplT3V0bGluZUlucHV0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8rKysrKysrKysrKysrKysrKysrKysrKysrKysrKyB7IGJhc2U6e30sIGZvbzogKCk9PiB9XG4vLysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKytcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNhbml0aXplT3V0bGluZUlucHV0KF9zdHlsZXMsb3B0aW9ucz17fSl7XG5cbiAgICBpZihcIm9iamVjdFwiICE9PSB0eXBlb2YgX3N0eWxlcyl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYWQgc3R5bGUgdmFsdWVzOiBcIitKU09OLnN0cmluZ2lmeShfc3R5bGVzKSlcbiAgICB9XG5cbi8vKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrIFsgYmFzZSwgZm4gXVxuLy8rKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrXG4gICAgaWYoQXJyYXkuaXNBcnJheShfc3R5bGVzKSl7XG5cbiAgICAgICAgX3N0eWxlcyA9IE9iamVjdC5hc3NpZ24oe30se2Jhc2U6X3N0eWxlc1swXX0sX3N0eWxlc1sxXSlcblxuICAgIH0gZWxzZSBpZighKFwiYmFzZVwiIGluIF9zdHlsZXMpKSB7XG5cbiAgICAgIGNvbnN0IGJhc2UgPSB7fSwgZm5zID0ge307XG5cbi8vKysrKysrKysrKysrKysgeyB0YWJsZToge30sIGhlYWRlcjp7fSB9LCBmbjp7ICgpPT4gfVxuLy8rKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrXG5cbiAgICAgIGxldCBvcHRpb25zSXNGbnMgPSB0cnVlO1xuXG4gICAgICBmb3IoY29uc3QgcHJvcCBpbiBvcHRpb25zKXtcbiAgICAgICAgICBpZihvcHRpb25zLmhhc093blByb3BlcnR5KHByb3ApICYmIFwiZnVuY3Rpb25cIiAhPT0gdHlwZW9mIG9wdGlvbnNbcHJvcF0pe1xuICAgICAgICAgICAgb3B0aW9uc0lzRm5zID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZihvcHRpb25zSXNGbnMpe1xuICAgICAgICBPYmplY3QuYXNzaWduKGZucyxvcHRpb25zKVxuICAgICAgfVxuXG4gICAgICBmb3IoY29uc3QgcHJvcCBpbiBfc3R5bGVzKXtcbi8vKysrKysrKysrKysrKysrKysrKysrKysrKysrIHsgdGFibGU6IHt9LCBoZWFkZXI6e30gfVxuLy8rKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrXG4gICAgICAgICAgaWYoXCJvYmplY3RcIiA9PT0gdHlwZW9mIF9zdHlsZXNbcHJvcF0pe1xuICAgICAgICAgICAgYmFzZVtwcm9wXSA9IF9zdHlsZXNbcHJvcF1cbi8vKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysgeyBmb286ICgpPT4gfVxuLy8rKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrXG4gICAgICAgICAgfSBlbHNlIGlmKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIF9zdHlsZXNbcHJvcF0pe1xuICAgICAgICAgICAgZm5zW3Byb3BdID0gX3N0eWxlc1twcm9wXVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJCYWQgc3R5bGUgdmFsdWU6IFwiK0pTT04uc3RyaW5naWZ5KF9zdHlsZXNbcHJvcF0pKVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIF9zdHlsZXMgPSBPYmplY3QuYXNzaWduKHt9LHtiYXNlfSxmbnMpO1xuICAgIH1cbiAgICByZXR1cm4gX3N0eWxlcztcbn1cbiJdfQ==