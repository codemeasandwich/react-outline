'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (_ref3) {
  var _styles = _ref3._styles,
      replacedStyle = _ref3.replacedStyle,
      styleCSS = _ref3.styleCSS,
      colors = _ref3.colors,
      options = _ref3.options,
      caching = _ref3.caching,
      wrapStyles = _ref3.wrapStyles;


  //+++++++++++++++++++++++++++++++++++++ style function
  //++++++++++++++++++++++++++++++++++++++++++++++++++++
  return function (styleName) {

    var styleFn = _styles[styleName] || function () {};

    var cached = { key: null, value: null, source: [] };
    replacedStyle[styleName] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var elemName = args[0];

      //+++++++++++++++++++++++++++++++++++ build an element
      //++++++++++++++++++++++++++++++++++++++++++++++++++++

      if (Array.isArray(elemName) && elemName.hasOwnProperty("raw")) {
        return buildElem({ elemName: elemName, args: args, styleCSS: styleCSS, styleName: styleName, options: options, replacedStyle: replacedStyle, colors: colors });
      } // elem gen

      //++++++++++++++++++++++++++++++++++++++ generat style
      //++++++++++++++++++++++++++++++++++++++++++++++++++++

      var styleStuff = { styleCSS: styleCSS[styleName], styleFn: "object" === (typeof args === 'undefined' ? 'undefined' : _typeof(args)) && !_styles[styleName] ? function (x) {
          return (0, _utils.sanitizeStyleObj)(x);
        } : styleFn };

      return buildStyleObj({ styleStuff: styleStuff, genStyles: _utils.genStyles, args: args, colors: colors, caching: caching, cached: cached });
    }; // END replacedStyle[styleName] = function(...args)

    //+++++++++++++++++++++++++++++++++ step down the tree
    //++++++++++++++++++++++++++++++++++++++++++++++++++++

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

//=====================================================
//========================================== build Elem
//=====================================================

function buildElem(_ref) {
  var _element;

  var elemName = _ref.elemName,
      args = _ref.args,
      styleCSS = _ref.styleCSS,
      styleName = _ref.styleName,
      options = _ref.options,
      replacedStyle = _ref.replacedStyle,
      colors = _ref.colors;


  elemName = elemName[0] || args[1];
  var inlineStyle = null; //replacedStyle[styleName]();

  var baseStyle = styleCSS[styleName] && styleCSS[styleName].base || {};
  for (var propN in styleCSS[styleName]) {
    //if(specialCharacters.includes(propN[0]) || !!propN.match(new RegExp(`[${specialInnerCharacters}]`, "gi"))){
    if (/^[a-zA-Z0-9-]+$/.test(propN) === false) {
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
    _utils.pubsub.publish(randomClassName, (0, _utils.genCss)({ randomClassName: randomClassName, css: css, styleCSS: styleCSS, colors: colors, style: style, styleName: styleName }));
    inlineStyle = {};
  }

  return (0, _element3.default)((_element = { elemName: elemName, css: css, styleCSS: styleCSS, inlineStyle: inlineStyle, style: style, styleName: styleName, colors: colors, randomClassName: randomClassName, options: options }, _defineProperty(_element, 'randomClassName', randomClassName), _defineProperty(_element, 'replacedStyle', replacedStyle), _element));
}

//=====================================================
//===================================== build Style Obj
//=====================================================

function buildStyleObj(_ref2) {
  var styleStuff = _ref2.styleStuff,
      genStyles = _ref2.genStyles,
      args = _ref2.args,
      colors = _ref2.colors,
      caching = _ref2.caching,
      cached = _ref2.cached;


  if (!caching) {
    return genStyles(styleStuff, args, colors);
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
  cached.value = genStyles(styleStuff, args, colors);
  return cached.value;
}

//=====================================================
//========================================== style Item
//=====================================================