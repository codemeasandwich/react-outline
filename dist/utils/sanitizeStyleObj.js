"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = mirgeStyles;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function mirgeStyles(x) {
  // remove all style values that are 'true'
  if (x) return Object.keys(x).reduce(function (a, b) {
    var type = _typeof(x[b]);
    if ("string" === type || "number" === type || Array.isArray(x[b])) {
      Object.assign(a, _defineProperty({}, b, x[b]));
    }
    return a;
  }, {});
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS91dGlscy9zYW5pdGl6ZVN0eWxlT2JqLmpzIl0sIm5hbWVzIjpbIm1pcmdlU3R5bGVzIiwieCIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJhIiwiYiIsInR5cGUiLCJBcnJheSIsImlzQXJyYXkiLCJhc3NpZ24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O2tCQUN3QkEsVzs7OztBQUFULFNBQVNBLFdBQVQsQ0FBcUJDLENBQXJCLEVBQXVCO0FBQ3hCO0FBQ0EsTUFBR0EsQ0FBSCxFQUNBLE9BQU9DLE9BQU9DLElBQVAsQ0FBWUYsQ0FBWixFQUNPRyxNQURQLENBQ2UsVUFBQ0MsQ0FBRCxFQUFHQyxDQUFILEVBQVM7QUFDaEIsUUFBTUMsZUFBY04sRUFBRUssQ0FBRixDQUFkLENBQU47QUFDQSxRQUFHLGFBQWFDLElBQWIsSUFBcUIsYUFBYUEsSUFBbEMsSUFBMENDLE1BQU1DLE9BQU4sQ0FBY1IsRUFBRUssQ0FBRixDQUFkLENBQTdDLEVBQWtFO0FBQ2hFSixhQUFPUSxNQUFQLENBQWNMLENBQWQsc0JBQWtCQyxDQUFsQixFQUFxQkwsRUFBRUssQ0FBRixDQUFyQjtBQUNEO0FBQ0QsV0FBT0QsQ0FBUDtBQUNELEdBUFAsRUFPUSxFQVBSLENBQVA7QUFRRCIsImZpbGUiOiJzYW5pdGl6ZVN0eWxlT2JqLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtaXJnZVN0eWxlcyh4KXtcbiAgICAgICAgICAgICAgLy8gcmVtb3ZlIGFsbCBzdHlsZSB2YWx1ZXMgdGhhdCBhcmUgJ3RydWUnXG4gICAgICAgICAgICAgIGlmKHgpXG4gICAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlZHVjZSggKGEsYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gdHlwZW9mIHhbYl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKFwic3RyaW5nXCIgPT09IHR5cGUgfHwgXCJudW1iZXJcIiA9PT0gdHlwZSB8fCBBcnJheS5pc0FycmF5KHhbYl0pICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihhLHtbYl06eFtiXX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB9LHt9KVxuICAgICAgICAgICAgfVxuIl19