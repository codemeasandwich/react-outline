"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (userSetOptions) {
  return function wrapStyles(_styles, options, styleCSS) {

    options = Object.assign({}, userSetOptions, options);
    //  const radium = !!options.radium;
    var caching = !!options.caching;
    var colors = options.colors;
    styleCSS = _styles.base || styleCSS;
    var replacedStyle = {};
    if (_styles.base) replacedStyle.base = styleCSS;

    var styleItemGen = (0, _styleItem2.default)({ _styles: _styles, replacedStyle: replacedStyle, styleCSS: styleCSS, colors: colors, options: options, caching: caching, wrapStyles: wrapStyles });

    Object.keys(_styles).concat(Object.keys(styleCSS)).filter(function (item, pos, a) {
      return a.indexOf(item) === pos;
    }).filter(function (styleName) {
      return "base" !== styleName;
    }).forEach(styleItemGen);

    return replacedStyle;
  };
};

var _styleItem = require("./styleItem");

var _styleItem2 = _interopRequireDefault(_styleItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }