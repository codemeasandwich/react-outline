"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _styleItem = _interopRequireDefault(require("./styleItem"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
//=====================================================
//========================================= wrap Styles
//=====================================================

function _default(userSetOptions) {
  return function wrapStyles(_styles, options, styleCSS) {
    options = Object.assign({}, userSetOptions, options);
    //  const radium = !!options.radium;
    var caching = !!options.caching;
    var colors = options.colors;
    styleCSS = _styles.base || styleCSS;
    var replacedStyle = {};
    if (_styles.base) replacedStyle.base = styleCSS;
    var styleItemGen = (0, _styleItem["default"])({
      _styles: _styles,
      replacedStyle: replacedStyle,
      styleCSS: styleCSS,
      colors: colors,
      options: options,
      caching: caching,
      wrapStyles: wrapStyles
    });
    Object.keys(_styles).concat(Object.keys(styleCSS)).filter(function (item, pos, a) {
      return a.indexOf(item) === pos;
    }).filter(function (styleName) {
      return "base" !== styleName;
    }).forEach(styleItemGen);
    return replacedStyle;
  };
}