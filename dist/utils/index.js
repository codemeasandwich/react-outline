"use strict";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS91dGlscy9pbmRleC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic3BlY2lhbENoYXJhY3RlcnMiLCJzcGVjaWFsSW5uZXJDaGFyYWN0ZXJzIiwibW9kdWxlcyIsImdsb2JhbCIsIl9fVEVTVF9fIiwibG9hZGVyIiwib3BlbiIsInJlcXVpcmUiLCJwYXRoIiwiZnMiLCJwYXRocyIsImZpbGVOYW1lIiwia2V5cyIsInJlYWRkaXJTeW5jIiwiX19kaXJuYW1lIiwicHVzaCIsImNvbnRleHQiLCJmaWx0ZXIiLCJlbmRzV2l0aCIsImZvckVhY2giLCJtYXRjaCIsImRlZmF1bHQiXSwibWFwcGluZ3MiOiI7O0FBQ0FBLE9BQU9DLE9BQVAsQ0FBZUMsaUJBQWYsR0FBbUMsS0FBbkMsQyxDQUF5QztBQUN6Q0YsT0FBT0MsT0FBUCxDQUFlRSxzQkFBZixHQUF3QyxNQUF4QyxDLENBQStDOzs7QUFJL0M7QUFDQTtBQUNBOztBQUVBLElBQUlDLGdCQUFKOztBQUVBLElBQUdDLFVBQVVBLE9BQU9DLFFBQXBCLEVBQThCO0FBQUU7O0FBRTlCLE1BQU1DLFNBQVMsRUFBQ0MsTUFBS0MsT0FBTixFQUFmOztBQUVBLE1BQU1DLE9BQU9ILE9BQU9DLElBQVAsQ0FBWSxNQUFaLENBQWI7QUFDQSxNQUFNRyxLQUFLSixPQUFPQyxJQUFQLENBQVksSUFBWixDQUFYO0FBQ0EsTUFBTUksUUFBUSxFQUFkOztBQUVBUixZQUFVLGlCQUFDUyxRQUFEO0FBQUEsV0FBYU4sT0FBT0MsSUFBUCxDQUFZSyxRQUFaLENBQWI7QUFBQSxHQUFWO0FBQ0FULFVBQVFVLElBQVIsR0FBZTtBQUFBLFdBQUlGLEtBQUo7QUFBQSxHQUFmOztBQVQ0QjtBQUFBO0FBQUE7O0FBQUE7QUFXNUIseUJBQXFCRCxHQUFHSSxXQUFILENBQWVDLFNBQWYsQ0FBckIsOEhBQ0E7QUFBQSxVQURTSCxRQUNUO0FBQUtELFlBQU1LLElBQU4sQ0FBVyxPQUFLSixRQUFoQjtBQUE0QjtBQVpMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFhN0IsQ0FiRCxNQWFPOztBQUVMO0FBQ0VULFlBQVVLLFFBQVFTLE9BQVIsQ0FBZ0IsSUFBaEIsRUFBc0IsS0FBdEIsRUFBNkIsT0FBN0IsQ0FBVjtBQUNIOztBQUVEZCxRQUFRVSxJQUFSLEdBQWVLLE1BQWYsQ0FBdUI7QUFBQSxTQUFRLGlCQUFpQlQsSUFBakIsSUFBeUIsQ0FBRUEsS0FBS1UsUUFBTCxDQUFjLFVBQWQsQ0FBM0IsSUFBd0QsQ0FBRVYsS0FBS1UsUUFBTCxDQUFjLFNBQWQsQ0FBbEU7QUFBQSxDQUF2QixFQUNlQyxPQURmLENBQ3dCO0FBQUEsU0FBUXJCLE9BQU9DLE9BQVAsQ0FBZVMsS0FBS1ksS0FBTCxDQUFXLG9CQUFYLEVBQWlDLENBQWpDLENBQWYsSUFBc0RsQixRQUFRTSxJQUFSLEVBQWNhLE9BQTVFO0FBQUEsQ0FEeEIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbm1vZHVsZS5leHBvcnRzLnNwZWNpYWxDaGFyYWN0ZXJzID0gXCJAOiBcIjsvL1snQCcsJzonXS5qb2luKFwiXCIpO1xubW9kdWxlLmV4cG9ydHMuc3BlY2lhbElubmVyQ2hhcmFjdGVycyA9IFwiID4rflwiOy8vWydAJywnOiddLmpvaW4oXCJcIik7XG5cblxuXG4vLyAhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISFcbi8vICEhISEhISEhISEhISEhISEhISEhISEhISEhISEhIEhFUkUgQkUgRFJBR09OU1xuLy8gISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhXG5cbmxldCBtb2R1bGVzXG5cbmlmKGdsb2JhbCAmJiBnbG9iYWwuX19URVNUX18pIHsgLy8gVEVTVElORyAhISFcblxuICBjb25zdCBsb2FkZXIgPSB7b3BlbjpyZXF1aXJlfVxuXG4gIGNvbnN0IHBhdGggPSBsb2FkZXIub3BlbigncGF0aCcpXG4gIGNvbnN0IGZzID0gbG9hZGVyLm9wZW4oJ2ZzJylcbiAgY29uc3QgcGF0aHMgPSBbXTtcblxuICBtb2R1bGVzID0gKGZpbGVOYW1lKT0+IGxvYWRlci5vcGVuKGZpbGVOYW1lKVxuICBtb2R1bGVzLmtleXMgPSAoKT0+cGF0aHM7XG5cbiAgZm9yIChsZXQgZmlsZU5hbWUgb2YgZnMucmVhZGRpclN5bmMoX19kaXJuYW1lKSlcbiAgeyAgICBwYXRocy5wdXNoKFwiLi9cIitmaWxlTmFtZSkgIH1cbn0gZWxzZSB7XG5cbiAgLy8gd2VicGFjayBtYWdpY1xuICAgIG1vZHVsZXMgPSByZXF1aXJlLmNvbnRleHQoXCIuL1wiLCBmYWxzZSwgL1xcLmpzJC8pO1xufVxuXG5tb2R1bGVzLmtleXMoKS5maWx0ZXIoIHBhdGggPT4gXCIuL2luZGV4LmpzXCIgIT09IHBhdGggJiYgISBwYXRoLmVuZHNXaXRoKFwiLnRlc3QuanNcIikgJiYgISBwYXRoLmVuZHNXaXRoKFwiLmpzLm1hcFwiKSlcbiAgICAgICAgICAgICAgLmZvckVhY2goIHBhdGggPT4gbW9kdWxlLmV4cG9ydHNbcGF0aC5tYXRjaCgvKFteXFwvXSspKD89XFwuXFx3KyQpLylbMF1dID0gbW9kdWxlcyhwYXRoKS5kZWZhdWx0ICk7XG4iXX0=