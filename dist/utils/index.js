"use strict";

// !/^[a-zA-Z0-9]/.test(propName[0])
module.exports.specialCharacters = "@: "; //['@',':'].join("");
module.exports.specialInnerCharacters = " >+~"; //['@',':'].join("");


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!! HERE BE DRAGONS
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

var modules = void 0;

if (global && global.__TEST__) {
  // TESTING !!!

  var loader = { open: require };

  var path = loader.open('path');
  var fs = loader.open('fs');
  var paths = [];

  modules = function modules(fileName) {
    return loader.open(fileName);
  };
  modules.keys = function () {
    return paths;
  };

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = fs.readdirSync(__dirname)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var fileName = _step.value;
      paths.push("./" + fileName);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
} else {

  // webpack magic
  modules = require.context("./", false, /\.js$/);
}

modules.keys().filter(function (path) {
  return "./index.js" !== path && !path.endsWith(".test.js") && !path.endsWith(".js.map");
}).forEach(function (path) {
  return module.exports[path.match(/([^\/]+)(?=\.\w+$)/)[0]] = modules(path).default;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS91dGlscy9pbmRleC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic3BlY2lhbENoYXJhY3RlcnMiLCJzcGVjaWFsSW5uZXJDaGFyYWN0ZXJzIiwibW9kdWxlcyIsImdsb2JhbCIsIl9fVEVTVF9fIiwibG9hZGVyIiwib3BlbiIsInJlcXVpcmUiLCJwYXRoIiwiZnMiLCJwYXRocyIsImZpbGVOYW1lIiwia2V5cyIsInJlYWRkaXJTeW5jIiwiX19kaXJuYW1lIiwicHVzaCIsImNvbnRleHQiLCJmaWx0ZXIiLCJlbmRzV2l0aCIsImZvckVhY2giLCJtYXRjaCIsImRlZmF1bHQiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQUEsT0FBT0MsT0FBUCxDQUFlQyxpQkFBZixHQUFtQyxLQUFuQyxDLENBQXlDO0FBQ3pDRixPQUFPQyxPQUFQLENBQWVFLHNCQUFmLEdBQXdDLE1BQXhDLEMsQ0FBK0M7OztBQUkvQztBQUNBO0FBQ0E7O0FBRUEsSUFBSUMsZ0JBQUo7O0FBRUEsSUFBR0MsVUFBVUEsT0FBT0MsUUFBcEIsRUFBOEI7QUFBRTs7QUFFOUIsTUFBTUMsU0FBUyxFQUFDQyxNQUFLQyxPQUFOLEVBQWY7O0FBRUEsTUFBTUMsT0FBT0gsT0FBT0MsSUFBUCxDQUFZLE1BQVosQ0FBYjtBQUNBLE1BQU1HLEtBQUtKLE9BQU9DLElBQVAsQ0FBWSxJQUFaLENBQVg7QUFDQSxNQUFNSSxRQUFRLEVBQWQ7O0FBRUFSLFlBQVUsaUJBQUNTLFFBQUQ7QUFBQSxXQUFhTixPQUFPQyxJQUFQLENBQVlLLFFBQVosQ0FBYjtBQUFBLEdBQVY7QUFDQVQsVUFBUVUsSUFBUixHQUFlO0FBQUEsV0FBSUYsS0FBSjtBQUFBLEdBQWY7O0FBVDRCO0FBQUE7QUFBQTs7QUFBQTtBQVc1Qix5QkFBcUJELEdBQUdJLFdBQUgsQ0FBZUMsU0FBZixDQUFyQiw4SEFDQTtBQUFBLFVBRFNILFFBQ1Q7QUFBS0QsWUFBTUssSUFBTixDQUFXLE9BQUtKLFFBQWhCO0FBQTRCO0FBWkw7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWE3QixDQWJELE1BYU87O0FBRUw7QUFDRVQsWUFBVUssUUFBUVMsT0FBUixDQUFnQixJQUFoQixFQUFzQixLQUF0QixFQUE2QixPQUE3QixDQUFWO0FBQ0g7O0FBRURkLFFBQVFVLElBQVIsR0FBZUssTUFBZixDQUF1QjtBQUFBLFNBQVEsaUJBQWlCVCxJQUFqQixJQUF5QixDQUFFQSxLQUFLVSxRQUFMLENBQWMsVUFBZCxDQUEzQixJQUF3RCxDQUFFVixLQUFLVSxRQUFMLENBQWMsU0FBZCxDQUFsRTtBQUFBLENBQXZCLEVBQ2VDLE9BRGYsQ0FDd0I7QUFBQSxTQUFRckIsT0FBT0MsT0FBUCxDQUFlUyxLQUFLWSxLQUFMLENBQVcsb0JBQVgsRUFBaUMsQ0FBakMsQ0FBZixJQUFzRGxCLFFBQVFNLElBQVIsRUFBY2EsT0FBNUU7QUFBQSxDQUR4QiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vICEvXlthLXpBLVowLTldLy50ZXN0KHByb3BOYW1lWzBdKVxubW9kdWxlLmV4cG9ydHMuc3BlY2lhbENoYXJhY3RlcnMgPSBcIkA6IFwiOy8vWydAJywnOiddLmpvaW4oXCJcIik7XG5tb2R1bGUuZXhwb3J0cy5zcGVjaWFsSW5uZXJDaGFyYWN0ZXJzID0gXCIgPit+XCI7Ly9bJ0AnLCc6J10uam9pbihcIlwiKTtcblxuXG5cbi8vICEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhIVxuLy8gISEhISEhISEhISEhISEhISEhISEhISEhISEhISEgSEVSRSBCRSBEUkFHT05TXG4vLyAhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISFcblxubGV0IG1vZHVsZXNcblxuaWYoZ2xvYmFsICYmIGdsb2JhbC5fX1RFU1RfXykgeyAvLyBURVNUSU5HICEhIVxuXG4gIGNvbnN0IGxvYWRlciA9IHtvcGVuOnJlcXVpcmV9XG5cbiAgY29uc3QgcGF0aCA9IGxvYWRlci5vcGVuKCdwYXRoJylcbiAgY29uc3QgZnMgPSBsb2FkZXIub3BlbignZnMnKVxuICBjb25zdCBwYXRocyA9IFtdO1xuXG4gIG1vZHVsZXMgPSAoZmlsZU5hbWUpPT4gbG9hZGVyLm9wZW4oZmlsZU5hbWUpXG4gIG1vZHVsZXMua2V5cyA9ICgpPT5wYXRocztcblxuICBmb3IgKGxldCBmaWxlTmFtZSBvZiBmcy5yZWFkZGlyU3luYyhfX2Rpcm5hbWUpKVxuICB7ICAgIHBhdGhzLnB1c2goXCIuL1wiK2ZpbGVOYW1lKSAgfVxufSBlbHNlIHtcblxuICAvLyB3ZWJwYWNrIG1hZ2ljXG4gICAgbW9kdWxlcyA9IHJlcXVpcmUuY29udGV4dChcIi4vXCIsIGZhbHNlLCAvXFwuanMkLyk7XG59XG5cbm1vZHVsZXMua2V5cygpLmZpbHRlciggcGF0aCA9PiBcIi4vaW5kZXguanNcIiAhPT0gcGF0aCAmJiAhIHBhdGguZW5kc1dpdGgoXCIudGVzdC5qc1wiKSAmJiAhIHBhdGguZW5kc1dpdGgoXCIuanMubWFwXCIpKVxuICAgICAgICAgICAgICAuZm9yRWFjaCggcGF0aCA9PiBtb2R1bGUuZXhwb3J0c1twYXRoLm1hdGNoKC8oW15cXC9dKykoPz1cXC5cXHcrJCkvKVswXV0gPSBtb2R1bGVzKHBhdGgpLmRlZmF1bHQgKTtcbiJdfQ==