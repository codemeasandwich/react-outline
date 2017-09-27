"use strict";

Object.defineProperty(exports, "__esModule", {
              value: true
});
exports.default = mirgeStyles;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function mirgeStyles(x) {
              // remove all style values that are 'true'
              return Object.keys(x).reduce(function (a, b) {
                            return x[b] === true ? a : Object.assign(a, _defineProperty({}, b, x[b]));
              }, {});
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS91dGlscy9zYW5pdGl6ZVN0eWxlT2JqLmpzIl0sIm5hbWVzIjpbIm1pcmdlU3R5bGVzIiwieCIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJhIiwiYiIsImFzc2lnbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBQ3dCQSxXOzs7O0FBQVQsU0FBU0EsV0FBVCxDQUFxQkMsQ0FBckIsRUFBdUI7QUFDeEI7QUFDQSxxQkFBT0MsT0FBT0MsSUFBUCxDQUFZRixDQUFaLEVBQ09HLE1BRFAsQ0FDZSxVQUFDQyxDQUFELEVBQUdDLENBQUg7QUFBQSxtQ0FBU0wsRUFBRUssQ0FBRixNQUFTLElBQVQsR0FBZ0JELENBQWhCLEdBQW9CSCxPQUFPSyxNQUFQLENBQWNGLENBQWQsc0JBQWtCQyxDQUFsQixFQUFxQkwsRUFBRUssQ0FBRixDQUFyQixFQUE3QjtBQUFBLGVBRGYsRUFDd0UsRUFEeEUsQ0FBUDtBQUVEIiwiZmlsZSI6InNhbml0aXplU3R5bGVPYmouanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG1pcmdlU3R5bGVzKHgpe1xuICAgICAgICAgICAgICAvLyByZW1vdmUgYWxsIHN0eWxlIHZhbHVlcyB0aGF0IGFyZSAndHJ1ZSdcbiAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAucmVkdWNlKCAoYSxiKSA9PiB4W2JdID09PSB0cnVlID8gYSA6IE9iamVjdC5hc3NpZ24oYSx7W2JdOnhbYl19KSx7fSlcbiAgICAgICAgICAgIH0iXX0=