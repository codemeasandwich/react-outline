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