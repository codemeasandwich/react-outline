'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.separateCssStyle = separateCssStyle;

var _index = require('./index');

function separateCssStyle(styles) {

  var css = {};
  var style = {};

  for (var name in styles) {
    if (_index.specialCharacters.includes(name[0])) //|| !!name.match(new RegExp(`[${specialInnerCharacters}]`, "gi")))
      css[name] = styles[name];else style[name] = styles[name];
  }

  if (0 === Object.keys(css).length) css = null;

  if (0 === Object.keys(style).length) style = null;

  return { css: css, style: style };
}
//# sourceMappingURL=separateCssStyle.js.map