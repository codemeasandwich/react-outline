"use strict";

module.exports.specialCharacters = "@: "; //['@',':'].join("");
module.exports.specialInnerCharacters = " >+~"; //['@',':'].join("");


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!! HERE BE DRAGONS
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

var modules = void 0;

if (global && global.__TEST__) {
  // TESTING !!!

  var loader = { open: global.require || require };

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS91dGlscy9pbmRleC5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwic3BlY2lhbENoYXJhY3RlcnMiLCJzcGVjaWFsSW5uZXJDaGFyYWN0ZXJzIiwibW9kdWxlcyIsImdsb2JhbCIsIl9fVEVTVF9fIiwibG9hZGVyIiwib3BlbiIsInJlcXVpcmUiLCJwYXRoIiwiZnMiLCJwYXRocyIsImZpbGVOYW1lIiwia2V5cyIsInJlYWRkaXJTeW5jIiwiX19kaXJuYW1lIiwicHVzaCIsImNvbnRleHQiLCJmaWx0ZXIiLCJlbmRzV2l0aCIsImZvckVhY2giLCJtYXRjaCIsImRlZmF1bHQiXSwibWFwcGluZ3MiOiI7O0FBQ0FBLE9BQU9DLE9BQVAsQ0FBZUMsaUJBQWYsR0FBbUMsS0FBbkMsQyxDQUF5QztBQUN6Q0YsT0FBT0MsT0FBUCxDQUFlRSxzQkFBZixHQUF3QyxNQUF4QyxDLENBQStDOzs7QUFJL0M7QUFDQTtBQUNBOztBQUVBLElBQUlDLGdCQUFKOztBQUVBLElBQUdDLFVBQVVBLE9BQU9DLFFBQXBCLEVBQThCO0FBQUU7O0FBRTlCLE1BQU1DLFNBQVMsRUFBQ0MsTUFBS0gsT0FBT0ksT0FBUCxJQUFrQkEsT0FBeEIsRUFBZjs7QUFFQSxNQUFNQyxPQUFPSCxPQUFPQyxJQUFQLENBQVksTUFBWixDQUFiO0FBQ0EsTUFBTUcsS0FBS0osT0FBT0MsSUFBUCxDQUFZLElBQVosQ0FBWDtBQUNBLE1BQU1JLFFBQVEsRUFBZDs7QUFFQVIsWUFBVSxpQkFBQ1MsUUFBRDtBQUFBLFdBQWFOLE9BQU9DLElBQVAsQ0FBWUssUUFBWixDQUFiO0FBQUEsR0FBVjtBQUNBVCxVQUFRVSxJQUFSLEdBQWU7QUFBQSxXQUFJRixLQUFKO0FBQUEsR0FBZjs7QUFUNEI7QUFBQTtBQUFBOztBQUFBO0FBVzVCLHlCQUFxQkQsR0FBR0ksV0FBSCxDQUFlQyxTQUFmLENBQXJCLDhIQUNBO0FBQUEsVUFEU0gsUUFDVDtBQUFLRCxZQUFNSyxJQUFOLENBQVcsT0FBS0osUUFBaEI7QUFBNEI7QUFaTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBYTdCLENBYkQsTUFhTzs7QUFFTDtBQUNFVCxZQUFVSyxRQUFRUyxPQUFSLENBQWdCLElBQWhCLEVBQXNCLEtBQXRCLEVBQTZCLE9BQTdCLENBQVY7QUFDSDs7QUFFRGQsUUFBUVUsSUFBUixHQUFlSyxNQUFmLENBQXVCO0FBQUEsU0FBUSxpQkFBaUJULElBQWpCLElBQXlCLENBQUVBLEtBQUtVLFFBQUwsQ0FBYyxVQUFkLENBQTNCLElBQXdELENBQUVWLEtBQUtVLFFBQUwsQ0FBYyxTQUFkLENBQWxFO0FBQUEsQ0FBdkIsRUFDZUMsT0FEZixDQUN3QjtBQUFBLFNBQVFyQixPQUFPQyxPQUFQLENBQWVTLEtBQUtZLEtBQUwsQ0FBVyxvQkFBWCxFQUFpQyxDQUFqQyxDQUFmLElBQXNEbEIsUUFBUU0sSUFBUixFQUFjYSxPQUE1RTtBQUFBLENBRHhCIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5tb2R1bGUuZXhwb3J0cy5zcGVjaWFsQ2hhcmFjdGVycyA9IFwiQDogXCI7Ly9bJ0AnLCc6J10uam9pbihcIlwiKTtcbm1vZHVsZS5leHBvcnRzLnNwZWNpYWxJbm5lckNoYXJhY3RlcnMgPSBcIiA+K35cIjsvL1snQCcsJzonXS5qb2luKFwiXCIpO1xuXG5cblxuLy8gISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhXG4vLyAhISEhISEhISEhISEhISEhISEhISEhISEhISEhISBIRVJFIEJFIERSQUdPTlNcbi8vICEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhIVxuXG5sZXQgbW9kdWxlc1xuXG5pZihnbG9iYWwgJiYgZ2xvYmFsLl9fVEVTVF9fKSB7IC8vIFRFU1RJTkcgISEhXG5cbiAgY29uc3QgbG9hZGVyID0ge29wZW46Z2xvYmFsLnJlcXVpcmUgfHwgcmVxdWlyZX1cblxuICBjb25zdCBwYXRoID0gbG9hZGVyLm9wZW4oJ3BhdGgnKVxuICBjb25zdCBmcyA9IGxvYWRlci5vcGVuKCdmcycpXG4gIGNvbnN0IHBhdGhzID0gW107XG5cbiAgbW9kdWxlcyA9IChmaWxlTmFtZSk9PiBsb2FkZXIub3BlbihmaWxlTmFtZSlcbiAgbW9kdWxlcy5rZXlzID0gKCk9PnBhdGhzO1xuXG4gIGZvciAobGV0IGZpbGVOYW1lIG9mIGZzLnJlYWRkaXJTeW5jKF9fZGlybmFtZSkpXG4gIHsgICAgcGF0aHMucHVzaChcIi4vXCIrZmlsZU5hbWUpICB9XG59IGVsc2Uge1xuXG4gIC8vIHdlYnBhY2sgbWFnaWNcbiAgICBtb2R1bGVzID0gcmVxdWlyZS5jb250ZXh0KFwiLi9cIiwgZmFsc2UsIC9cXC5qcyQvKTtcbn1cblxubW9kdWxlcy5rZXlzKCkuZmlsdGVyKCBwYXRoID0+IFwiLi9pbmRleC5qc1wiICE9PSBwYXRoICYmICEgcGF0aC5lbmRzV2l0aChcIi50ZXN0LmpzXCIpICYmICEgcGF0aC5lbmRzV2l0aChcIi5qcy5tYXBcIikpXG4gICAgICAgICAgICAgIC5mb3JFYWNoKCBwYXRoID0+IG1vZHVsZS5leHBvcnRzW3BhdGgubWF0Y2goLyhbXlxcL10rKSg/PVxcLlxcdyskKS8pWzBdXSA9IG1vZHVsZXMocGF0aCkuZGVmYXVsdCApO1xuIl19