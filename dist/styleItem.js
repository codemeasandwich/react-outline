'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var _styles = _ref._styles,
      replacedStyle = _ref.replacedStyle,
      styleCSS = _ref.styleCSS,
      colors = _ref.colors,
      options = _ref.options,
      caching = _ref.caching,
      wrapStyles = _ref.wrapStyles;


  return function (styleName) {

    var styleFn = _styles[styleName] || function () {};

    var cached = { key: null, value: null, source: [] };
    replacedStyle[styleName] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var elemName = args[0];
      if (Array.isArray(elemName) && elemName.hasOwnProperty("raw")) {
        var _element;

        elemName = elemName[0] || args[1];
        var inlineStyle = null; //replacedStyle[styleName]();

        var baseStyle = styleCSS[styleName] && styleCSS[styleName].base || {};
        for (var propN in styleCSS[styleName]) {
          if (_utils.specialCharacters.includes(propN[0]) || !!propN.match(new RegExp('[' + _utils.specialInnerCharacters + ']', "gi"))) {
            baseStyle[propN] = styleCSS[styleName][propN];
          }
        }
        //splict ":" and "@" from all over styles

        var _separateCssStyle = (0, _utils.separateCssStyle)(baseStyle),
            css = _separateCssStyle.css,
            style = _separateCssStyle.style;
        /*
        const cssPropNames = Object.keys(styleCSS[styleName])
                                   .filter(stylePropName => stylePropName[0] === "@" ||  stylePropName[0] === ":");
        */


        var randomClassName = "";

        //if(0 < cssPropNames.length){
        if (css) {

          randomClassName = "react-outline-";

          if (!global.__TEST__) randomClassName += (0, _utils.makeid)();

          _utils.classes.publish(randomClassName, (0, _utils.genCss)({ randomClassName: randomClassName, css: css, styleCSS: styleCSS, colors: colors, style: style, styleName: styleName }));

          inlineStyle = {};
        }

        return (0, _element3.default)((_element = { elemName: elemName, css: css, styleCSS: styleCSS, inlineStyle: inlineStyle, style: style, styleName: styleName, colors: colors, randomClassName: randomClassName, options: options }, _defineProperty(_element, 'randomClassName', randomClassName), _defineProperty(_element, 'replacedStyle', replacedStyle), _element));
      } // elem gen

      var styleStuff = { styleCSS: styleCSS[styleName], styleFn: styleFn /*,radium*/ };

      if (!caching) {
        return (0, _utils.genStyles)(styleStuff, args, colors);
      }
      // quick test
      if (cached.value && cached.source[0] === args[0] && cached.source[0] === args[1]) {
        return cached.value;
      }
      // deep test
      var key = "" + JSON.stringify(args[0]) + JSON.stringify(args[1]);
      if (key === cached.key) {
        return cached.value;
      }

      cached.key = key;
      cached.source[0] = args[0];
      cached.source[1] = args[1];
      cached.value = (0, _utils.genStyles)(styleStuff, args, colors);
      return cached.value;
    }; // END replacedStyle[styleName] = function(...args)

    if (0 < Object.keys(styleFn).length || (0, _utils.hasKids)(styleCSS[styleName])) {
      Object.assign(replacedStyle[styleName], wrapStyles(styleFn, options, styleCSS[styleName]));
    }
  };
};

var _utils = require('./utils');

var _element2 = require('./element');

var _element3 = _interopRequireDefault(_element2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
//# sourceMappingURL=styleItem.js.map