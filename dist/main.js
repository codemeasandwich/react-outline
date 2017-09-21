'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testing = exports.Styles = exports.setOptions = exports.withOptions = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _element2 = require('./element');

var _element3 = _interopRequireDefault(_element2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var userSetOptions = { named: true /* prefix:getVendorPrefix()*/

  //+++++++++++++++++++++++++++++ { base:{}, foo: ()=> }
  //++++++++++++++++++++++++++++++++++++++++++++++++++++
};function topLevelWrapStyles(_styles) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var styleCSS = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


  if ("object" !== (typeof _styles === 'undefined' ? 'undefined' : _typeof(_styles))) {
    throw new Error("Bad style values: " + JSON.stringify(_styles));
  }

  //+++++++++++++++++++++++++++++++++++++++ [ base, fn ]
  //++++++++++++++++++++++++++++++++++++++++++++++++++++
  if (Array.isArray(_styles)) {

    _styles = Object.assign({}, { base: _styles[0] }, _styles[1]);
  } else if (!("base" in _styles)) {

    var base = {},
        fns = {};

    //++++++++++++++ { table: {}, header:{} }, fn:{ ()=> }
    //++++++++++++++++++++++++++++++++++++++++++++++++++++

    var optionsIsFns = true;

    for (var prop in options) {
      if (options.hasOwnProperty(prop) && "function" !== typeof options[prop]) {
        optionsIsFns = false;
      }
    }

    if (optionsIsFns) {
      Object.assign(fns, options);
    }

    for (var _prop in _styles) {
      //+++++++++++++++++++++++++++ { table: {}, header:{} }
      //++++++++++++++++++++++++++++++++++++++++++++++++++++
      if ("object" === _typeof(_styles[_prop])) {
        base[_prop] = _styles[_prop];
        //++++++++++++++++++++++++++++++++++++++ { foo: ()=> }
        //++++++++++++++++++++++++++++++++++++++++++++++++++++
      } else if ("function" === typeof _styles[_prop]) {
        fns[_prop] = _styles[_prop];
      } else {
        throw new Error("Bad style value: " + JSON.stringify(_styles[_prop]));
      }
    }
    _styles = Object.assign({}, { base: base }, fns);
  }

  var wrappedStyles = wrapStyles(_styles, options, styleCSS);
  wrappedStyles.colors = wrappedStyles.colors || options && options.colors || userSetOptions && userSetOptions.colors;
  return wrappedStyles;
}

function wrapStyles(_styles, options, styleCSS) {

  options = Object.assign({}, userSetOptions, options);
  //  const radium = !!options.radium;
  var caching = !!options.caching;
  var colors = options.colors;
  styleCSS = _styles.base || styleCSS;
  var replacedStyle = {};
  if (_styles.base) replacedStyle.base = styleCSS;

  Object.keys(_styles).concat(Object.keys(styleCSS)).filter(function (item, pos, a) {
    return a.indexOf(item) === pos;
  }).filter(function (styleName) {
    return "base" !== styleName;
  }).forEach(function (styleName) {

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
  });
  return replacedStyle;
}

function withOptions(options) {
  if (!options) throw new Error("Bad options values for react-outline:" + JSON.stringify(options));
  return function (_styles) {
    return topLevelWrapStyles(_styles, options);
  };
}

function setOptions(options) {
  if (!options) throw new Error("Bad options values for react-outline:" + JSON.stringify(options));
  if (options.colors) {
    topLevelWrapStyles.colors = options.colors;
  }
  Object.assign(userSetOptions, options);
}
function buildCssString() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var classesValues = _utils.classes.get();
  var css = Object.keys(classesValues).map(function (className) {
    return classesValues[className];
  }).join(" ");
  css += props.children || "";
  css = css.replace(/\n/g, ' ').replace(/\s+/g, ' ');
  return css;
}
function Styles(props) {

  var StylesElem = _react2.default.createClass({
    displayName: "Styles",
    getInitialState: function getInitialState() {
      var _this = this;

      // setTimeout to fix: Warning: setState(...): Cannot update during an existing state transition
      _utils.classes.subscribe(function () {
        return setTimeout(function () {
          return _this.setState({ cssString: buildCssString(props) });
        }, 0);
      });
      return { cssString: buildCssString(props) };
    },
    render: function render() {
      return _react2.default.createElement(
        'style',
        null,
        this.state.cssString
      );
    }
  });
  return _react2.default.createElement(StylesElem);
}

Styles.toString = function () {
  return buildCssString();
};

var testing = {
  resetCSS: _utils.classes.clear
};

exports.default = topLevelWrapStyles;
exports.withOptions = withOptions;
exports.setOptions = setOptions;
exports.Styles = Styles;
exports.testing = testing;
//# sourceMappingURL=main.js.map