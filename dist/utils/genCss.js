"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = genCss;

var _object2css = require("./object2css");

var _object2css2 = _interopRequireDefault(_object2css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function genCss(_ref) {
    var randomClassName = _ref.randomClassName,
        css = _ref.css,
        styleCSS = _ref.styleCSS,
        colors = _ref.colors,
        style = _ref.style,
        styleName = _ref.styleName;


    var newStyle = style ? "." + randomClassName + "{" + (0, _object2css2.default)(colors, style) + "}" : "";

    newStyle = Object.keys(css).reduce(function (cssString, propName) {

        var styleContent = (0, _object2css2.default)(colors, css[propName]
        /*  || styleCSS[styleName].base
          && styleCSS[styleName].base[propName]
          || styleCSS[styleName][propName]*/);

        if (propName[0] === "@") return cssString + (" " + propName + "{ ." + randomClassName + "{ " + styleContent + " } } ");else if (propName[0] === ":") return " ." + randomClassName + propName + "{ " + styleContent + " } " + cssString;else return " ." + randomClassName + " " + propName + "{ " + styleContent + " } " + cssString;
        //  else // skip unknown prop
        //      return cssString
    }, newStyle);

    return newStyle;
}