'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = genStyles;

var _inlineStylePrefixer = require('inline-style-prefixer');

var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);

var _replacedStyleFn = require('./replacedStyleFn');

var _replacedStyleFn2 = _interopRequireDefault(_replacedStyleFn);

var _replaceColors = require('./replaceColors');

var _replaceColors2 = _interopRequireDefault(_replaceColors);

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixer = new _inlineStylePrefixer2.default();

function genStyles(styleStuff, args, colors) {
  var userResult = (0, _replacedStyleFn2.default)(styleStuff, args);

  var swapedColor = (0, _replaceColors2.default)(colors, userResult);
  for (var name in swapedColor) {
    //if(!specialCharacters.includes(name[0]))
    swapedColor[name] = prefixer.prefix({ a: swapedColor[name] }).a;
  }

  return swapedColor;
}