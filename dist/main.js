'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testing = exports.Styles = exports.setOptions = exports.withOptions = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _element = require('./element');

var _element2 = _interopRequireDefault(_element);

var _styleItem = require('./styleItem');

var _styleItem2 = _interopRequireDefault(_styleItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  var styleItemGen = (0, _styleItem2.default)({ _styles: _styles, replacedStyle: replacedStyle, styleCSS: styleCSS, colors: colors, options: options, caching: caching, wrapStyles: wrapStyles });

  Object.keys(_styles).concat(Object.keys(styleCSS)).filter(function (item, pos, a) {
    return a.indexOf(item) === pos;
  }).filter(function (styleName) {
    return "base" !== styleName;
  }).forEach(styleItemGen);

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