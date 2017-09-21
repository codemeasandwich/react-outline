"use strict";

module.exports.specialCharacters = "@: "; //['@',':'].join("");
module.exports.specialInnerCharacters = " >+~"; //['@',':'].join("");

var modules = void 0;

if (require.context) {

  // webpack magic
  modules = require.context("./", false, /\.js$/);
} else {
  // TESTING !!!

  var path = require('path');
  var fs = require('fs');
  var paths = [];

  modules = function modules(fileName) {
    return require(fileName);
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
}

var pageFileNames = modules.keys().filter(function (path) {
  return "./index.js" !== path && !path.endsWith(".test.js");
}).forEach(function (path) {
  return module.exports[path.match(/([^\/]+)(?=\.\w+$)/)[0]] = modules(path).default;
});
//# sourceMappingURL=index.js.map