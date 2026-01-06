"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = object2css;
var _hyphenateStyleName = _interopRequireDefault(require("hyphenate-style-name"));
var _addPxToStyle = _interopRequireDefault(require("add-px-to-style"));
var _replaceColors = _interopRequireDefault(require("./replaceColors"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Convert a JS object to CSS string. Similar to React's output of CSS, extracted into a module.
function object2css(colors, obj) {
  obj = (0, _replaceColors["default"])(colors, obj);
  var keys = Object.keys(obj);
  //if (!keys.length) return ''
  var i,
    len = keys.length;
  var result = '';
  for (i = 0; i < len; i++) {
    var key = keys[i];
    var val = obj[key];
    result += (0, _hyphenateStyleName["default"])(key) + ':' + (0, _addPxToStyle["default"])(key, val) + "; ";
  }
  return result;
}