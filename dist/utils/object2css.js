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