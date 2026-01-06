"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = genCss;
var _object2css = _interopRequireDefault(require("./object2css"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function genCss(_ref) {
  var randomClassName = _ref.randomClassName,
    css = _ref.css,
    styleCSS = _ref.styleCSS,
    colors = _ref.colors,
    style = _ref.style,
    styleName = _ref.styleName;
  var newStyle = style ? ".".concat(randomClassName, "{").concat((0, _object2css["default"])(colors, style), "}") : "";
  newStyle = Object.keys(css).reduce(function (cssString, propName) {
    var styleContent = (0, _object2css["default"])(colors, css[propName]
    /*  || styleCSS[styleName].base
      && styleCSS[styleName].base[propName]
      || styleCSS[styleName][propName]*/);
    if (propName[0] === "@") return cssString + " ".concat(propName, "{ .").concat(randomClassName, "{ ").concat(styleContent, " } } ");else if (propName[0] === ":") return " .".concat(randomClassName).concat(propName, "{ ").concat(styleContent, " } ") + cssString;else return " .".concat(randomClassName, " ").concat(propName, "{ ").concat(styleContent, " } ") + cssString;
    //  else // skip unknown prop
    //      return cssString
  }, newStyle);
  return newStyle;
}