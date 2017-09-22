"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = hasKids;
function hasKids(obj) {
  for (var name in obj) {
    if ("base" !== name && "object" === _typeof(obj[name])) return true;
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS91dGlscy9oYXNLaWRzLmpzIl0sIm5hbWVzIjpbImhhc0tpZHMiLCJvYmoiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztrQkFBd0JBLE87QUFBVCxTQUFTQSxPQUFULENBQWlCQyxHQUFqQixFQUFxQjtBQUNsQyxPQUFJLElBQU1DLElBQVYsSUFBa0JELEdBQWxCLEVBQXNCO0FBQ3BCLFFBQUcsV0FBV0MsSUFBWCxJQUFtQixxQkFBb0JELElBQUlDLElBQUosQ0FBcEIsQ0FBdEIsRUFDQSxPQUFPLElBQVA7QUFDRDtBQUNGIiwiZmlsZSI6Imhhc0tpZHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBoYXNLaWRzKG9iail7XG4gIGZvcihjb25zdCBuYW1lIGluIG9iail7XG4gICAgaWYoXCJiYXNlXCIgIT09IG5hbWUgJiYgXCJvYmplY3RcIiA9PT0gdHlwZW9mIG9ialtuYW1lXSlcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG59XG4iXX0=