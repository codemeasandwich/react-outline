"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = genStyles;
var _inlineStylePrefixer = _interopRequireDefault(require("inline-style-prefixer"));
var _replacedStyleFn = _interopRequireDefault(require("./replacedStyleFn"));
var _replaceColors = _interopRequireDefault(require("./replaceColors"));
var _index = require("./index");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var prefixer = new _inlineStylePrefixer["default"]();
function genStyles(styleStuff, args, colors) {
  var userResult = (0, _replacedStyleFn["default"])(styleStuff, args);
  var swapedColor = (0, _replaceColors["default"])(colors, userResult);
  for (var name in swapedColor) {
    //if(!specialCharacters.includes(name[0]))
    swapedColor[name] = prefixer.prefix({
      a: swapedColor[name]
    }).a;
  }
  return swapedColor;
}