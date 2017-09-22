"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeid;
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function makeid() {
  var side = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

  var text = "";

  for (var i = 0; i < side; i++) {
    text += possible.charAt(~~(Math.random() * possible.length));
  }return text;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS91dGlscy9tYWtlaWQuanMiXSwibmFtZXMiOlsibWFrZWlkIiwicG9zc2libGUiLCJzaWRlIiwidGV4dCIsImkiLCJjaGFyQXQiLCJNYXRoIiwicmFuZG9tIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFDd0JBLE07QUFEeEIsSUFBTUMsV0FBVyxnRUFBakI7QUFDZSxTQUFTRCxNQUFULEdBQTJCO0FBQUEsTUFBWEUsSUFBVyx1RUFBSixFQUFJOztBQUN4QyxNQUFJQyxPQUFPLEVBQVg7O0FBRUEsT0FBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlGLElBQXBCLEVBQTBCRSxHQUExQjtBQUNFRCxZQUFRRixTQUFTSSxNQUFULENBQWdCLENBQUMsRUFBRUMsS0FBS0MsTUFBTCxLQUFnQk4sU0FBU08sTUFBM0IsQ0FBakIsQ0FBUjtBQURGLEdBR0EsT0FBT0wsSUFBUDtBQUNEIiwiZmlsZSI6Im1ha2VpZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHBvc3NpYmxlID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OVwiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbWFrZWlkKHNpZGUgPSAxMCkge1xuICBsZXQgdGV4dCA9IFwiXCI7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaWRlOyBpKyspXG4gICAgdGV4dCArPSBwb3NzaWJsZS5jaGFyQXQofn4oTWF0aC5yYW5kb20oKSAqIHBvc3NpYmxlLmxlbmd0aCkpO1xuXG4gIHJldHVybiB0ZXh0O1xufVxuIl19