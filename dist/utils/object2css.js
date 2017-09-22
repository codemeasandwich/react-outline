'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = object2css;

var _hyphenateStyleName = require('hyphenate-style-name');

var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

var _addPxToStyle = require('add-px-to-style');

var _addPxToStyle2 = _interopRequireDefault(_addPxToStyle);

var _replaceColors = require('./replaceColors');

var _replaceColors2 = _interopRequireDefault(_replaceColors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Convert a JS object to CSS string. Similar to React's output of CSS, extracted into a module.
function object2css(colors, obj) {
  obj = (0, _replaceColors2.default)(colors, obj);
  var keys = Object.keys(obj);
  //if (!keys.length) return ''
  var i = void 0,
      len = keys.length;
  var result = '';

  for (i = 0; i < len; i++) {
    var key = keys[i];
    var val = obj[key];
    result += (0, _hyphenateStyleName2.default)(key) + ':' + (0, _addPxToStyle2.default)(key, val) + "; ";
  }
  return result;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS91dGlscy9vYmplY3QyY3NzLmpzIl0sIm5hbWVzIjpbIm9iamVjdDJjc3MiLCJjb2xvcnMiLCJvYmoiLCJrZXlzIiwiT2JqZWN0IiwiaSIsImxlbiIsImxlbmd0aCIsInJlc3VsdCIsImtleSIsInZhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBTXlCQSxVOztBQU56Qjs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUdBO0FBQ2dCLFNBQVNBLFVBQVQsQ0FBb0JDLE1BQXBCLEVBQTJCQyxHQUEzQixFQUFnQztBQUM5Q0EsUUFBTSw2QkFBY0QsTUFBZCxFQUFxQkMsR0FBckIsQ0FBTjtBQUNBLE1BQUlDLE9BQU9DLE9BQU9ELElBQVAsQ0FBWUQsR0FBWixDQUFYO0FBQ0E7QUFDQSxNQUFJRyxVQUFKO0FBQUEsTUFBT0MsTUFBTUgsS0FBS0ksTUFBbEI7QUFDQSxNQUFJQyxTQUFTLEVBQWI7O0FBRUEsT0FBS0gsSUFBSSxDQUFULEVBQVlBLElBQUlDLEdBQWhCLEVBQXFCRCxHQUFyQixFQUEwQjtBQUN4QixRQUFJSSxNQUFNTixLQUFLRSxDQUFMLENBQVY7QUFDQSxRQUFJSyxNQUFNUixJQUFJTyxHQUFKLENBQVY7QUFDQUQsY0FBVSxrQ0FBVUMsR0FBVixJQUFpQixHQUFqQixHQUF1Qiw0QkFBTUEsR0FBTixFQUFXQyxHQUFYLENBQXZCLEdBQXdDLElBQWxEO0FBQ0Q7QUFDRCxTQUFPRixNQUFQO0FBQ0QiLCJmaWxlIjoib2JqZWN0MmNzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBoeXBoZW5hdGUgZnJvbSAnaHlwaGVuYXRlLXN0eWxlLW5hbWUnXG5pbXBvcnQgYWRkUHggZnJvbSAnYWRkLXB4LXRvLXN0eWxlJ1xuaW1wb3J0IHJlcGxhY2VDb2xvcnMgZnJvbSAnLi9yZXBsYWNlQ29sb3JzJ1xuXG5cbi8vIENvbnZlcnQgYSBKUyBvYmplY3QgdG8gQ1NTIHN0cmluZy4gU2ltaWxhciB0byBSZWFjdCdzIG91dHB1dCBvZiBDU1MsIGV4dHJhY3RlZCBpbnRvIGEgbW9kdWxlLlxuZXhwb3J0ICBkZWZhdWx0IGZ1bmN0aW9uIG9iamVjdDJjc3MoY29sb3JzLG9iaikge1xuICBvYmogPSByZXBsYWNlQ29sb3JzKGNvbG9ycyxvYmopO1xuICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG9iailcbiAgLy9pZiAoIWtleXMubGVuZ3RoKSByZXR1cm4gJydcbiAgbGV0IGksIGxlbiA9IGtleXMubGVuZ3RoXG4gIGxldCByZXN1bHQgPSAnJ1xuXG4gIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGxldCBrZXkgPSBrZXlzW2ldXG4gICAgbGV0IHZhbCA9IG9ialtrZXldXG4gICAgcmVzdWx0ICs9IGh5cGhlbmF0ZShrZXkpICsgJzonICsgYWRkUHgoa2V5LCB2YWwpICtcIjsgXCJcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG4iXX0=