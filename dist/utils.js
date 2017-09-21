'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specialInnerCharacters = exports.specialCharacters = exports.classes = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.separateCssStyle = separateCssStyle;
exports.makeid = makeid;
exports.genStyles = genStyles;
exports.genCss = genCss;
exports.hasKids = hasKids;

var _inlineStylePrefixer = require('inline-style-prefixer');

var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);

var _hyphenateStyleName = require('hyphenate-style-name');

var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

var _addPxToStyle = require('add-px-to-style');

var _addPxToStyle2 = _interopRequireDefault(_addPxToStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var specialCharacters = "@: "; //['@',':'].join("");
var specialInnerCharacters = " >+~"; //['@',':'].join("");

function separateCssStyle(styles) {

  var css = {};
  var style = {};

  for (var name in styles) {
    if (specialCharacters.includes(name[0])) //|| !!name.match(new RegExp(`[${specialInnerCharacters}]`, "gi")))
      css[name] = styles[name];else style[name] = styles[name];
  }

  if (0 === Object.keys(css).length) css = null;

  if (0 === Object.keys(style).length) style = null;

  return { css: css, style: style };
}

// Convert a JS object to CSS string. Similar to React's output of CSS, extracted into a module.
function object2css(colors, obj) {
  obj = replaceColors(colors, obj);
  var keys = Object.keys(obj);
  //if (!keys.length) return ''
  var i = void 0,
      len = keys.length;
  var result = '';

  for (i = 0; i < len; i++) {
    var key = keys[i];
    var val = obj[key];
    result += (0, _hyphenateStyleName2.default)(key) + ':' + (0, _addPxToStyle2.default)(key, val) + "; ";
  }
  return result;
}

var prefixer = new _inlineStylePrefixer2.default();

var classes = new function () {

  var vals = {};
  var subscribers = [];

  this.publish = function (key, value) {

    vals[key] = value;
    subscribers.forEach(function (subscriber) {
      return subscriber(vals);
    });
  };

  this.subscribe = function (subscriber) {
    return subscribers.push(subscriber);
  };
  this.get = function () {
    return vals;
  };
  this.clear = function () {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.getOwnPropertyNames(vals)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var className = _step.value;
        delete vals[className];
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };
}();

var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function makeid() {
  var side = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

  var text = "";

  for (var i = 0; i < side; i++) {
    text += possible.charAt(~~(Math.random() * possible.length));
  }return text;
}

function replacedStyleFn(_ref, args) {
  var styleCSS = _ref.styleCSS,
      styleFn = _ref.styleFn;


  var processedStyles = 1 === styleFn.length ? styleFn(args[0]) : styleFn(styleCSS, args[0]);

  var styleAsPropObj = 0 === styleFn.length && "object" === _typeof(args[0]) ? args[0] : {};
  var styleBase = Object.assign({}, styleCSS && styleCSS.base || styleCSS || {}, styleAsPropObj);
  /*
      for(const stylePropName in styleBase){
        if(specialCharacters.includes(stylePropName[0]))
        delete styleBase[stylePropName];
      }
  */
  var autoAddStyles = [],
      firstVal = args[1]; // || args[0];
  //console.log(args)
  if (!!firstVal && "object" === (typeof firstVal === 'undefined' ? 'undefined' : _typeof(firstVal))) {
    Object.keys(firstVal).forEach(function (cssName) {
      if (true === firstVal[cssName] && styleCSS && cssName in styleCSS) autoAddStyles.push(styleCSS[cssName]);
      //  else // to bind style value to output obj
      //    autoAddStyles.push({cssName:firstVal[cssName]})
    });
  }

  return Object.assign.apply(Object, [{}, styleBase].concat(autoAddStyles, [processedStyles]));
}

var replaceColors = function replaceColors(colors, style) {

  if (!colors) return style;
  var result = Object.assign({}, style);
  for (var key in result) {
    if (result[key] in colors) {
      result[key] = colors[result[key]];
    }
  }
  return result;
};

function genStyles(styleStuff, args, colors) {
  var userResult = replacedStyleFn(styleStuff, args);

  var swapedColor = replaceColors(colors, userResult);
  for (var name in swapedColor) {
    if (!specialCharacters.includes(name[0])) swapedColor[name] = prefixer.prefix({ a: swapedColor[name] }).a;
  }

  return swapedColor;
}

function genCss(_ref2) {
  var randomClassName = _ref2.randomClassName,
      css = _ref2.css,
      styleCSS = _ref2.styleCSS,
      colors = _ref2.colors,
      style = _ref2.style,
      styleName = _ref2.styleName;


  var newStyle = style ? '.' + randomClassName + '{' + object2css(colors, style) + '}' : "";

  newStyle = Object.keys(css).reduce(function (cssString, propName) {
    var styleContent = object2css(colors, css[propName] || styleCSS[styleName].base && styleCSS[styleName].base[propName] || styleCSS[styleName][propName]);
    if (propName[0] === "@") return cssString + (' ' + propName + '{ .' + randomClassName + '{ ' + styleContent + ' } } ');else if (propName[0] === ":") return ' .' + randomClassName + propName + '{ ' + styleContent + ' } ' + cssString;else return ' .' + randomClassName + ' ' + propName + '{ ' + styleContent + ' } ' + cssString;
    //  else // skip unknown prop
    //      return cssString
  }, newStyle);

  return newStyle;
}

function hasKids(obj) {
  for (var name in obj) {
    if ("base" !== name && "object" === _typeof(obj[name])) return true;
  }
}

exports.classes = classes;
exports.specialCharacters = specialCharacters;
exports.specialInnerCharacters = specialInnerCharacters;
//# sourceMappingURL=utils.js.map