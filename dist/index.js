'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Styles = exports.setOptions = exports.withOptions = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _inlineStylePrefixer = require('inline-style-prefixer');

var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);

var _addPxToStyle = require('add-px-to-style');

var _addPxToStyle2 = _interopRequireDefault(_addPxToStyle);

var _hyphenateStyleName = require('hyphenate-style-name');

var _hyphenateStyleName2 = _interopRequireDefault(_hyphenateStyleName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var specialCharacters = "@:"; //['@',':'].join("");

function separateCssStyle(styles) {

  var css = {};
  var style = {};

  for (var name in styles) {
    if (specialCharacters.includes(name[0])) css[name] = styles[name];else style[name] = styles[name];
  }

  if (0 === Object.keys(css).length) css = null;

  if (0 === Object.keys(style).length) style = null;

  return { css: css, style: style };
}

// Convert a JS object to CSS string. Similar to React's output of CSS, extracted into a module.
function object2css(obj) {
  var keys = Object.keys(obj);
  if (!keys.length) return '';
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
var classes = {};

function hasKids(obj) {
  for (var name in obj) {
    if ("base" !== name && "object" === _typeof(obj[name])) return true;
  }
}

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
      styleFn = _ref.styleFn,
      radium = _ref.radium;


  var processedStyles = 1 === styleFn.length ? styleFn.apply(undefined, _toConsumableArray(args)) : styleFn.apply(undefined, [styleCSS].concat(_toConsumableArray(args)));
  var styleBase = Object.assign({}, styleCSS && styleCSS.base || styleCSS || {});

  for (var stylePropName in styleBase) {
    if (specialCharacters.includes(stylePropName[0])) delete styleBase[stylePropName];
  }

  var autoAddStyles = [],
      firstVal = args[0];
  //console.log(args)
  if (!!firstVal && "object" === (typeof firstVal === 'undefined' ? 'undefined' : _typeof(firstVal))) {
    Object.keys(firstVal).forEach(function (cssName) {
      if (true === firstVal[cssName]) autoAddStyles.push(styleCSS[cssName]);
      //  else // to bind style value to output obj
      //    autoAddStyles.push({cssName:firstVal[cssName]})
    });
  }
  if (radium) {
    if (processedStyles) {
      if (Array.isArray(processedStyles)) return [styleBase].concat(autoAddStyles, _toConsumableArray(processedStyles));else return [styleBase].concat(autoAddStyles, [processedStyles]);
    } // END if(processedStyles)
    return styleBase;
  } // END if(radium)
  return Object.assign.apply(Object, [{}, styleBase].concat(autoAddStyles, [processedStyles]));
}

var userSetOptions = {/* prefix:getVendorPrefix()*/};

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

var genStyles = function genStyles(styleStuff, args, colors) {
  var userResult = replacedStyleFn(styleStuff, args);

  var swapedColor = replaceColors(colors, userResult);
  var venderSpecificPrefixes = prefixer.prefix(swapedColor);

  return venderSpecificPrefixes;
};
function topLevelWrapStyles(_styles, options, styleCSS) {

  if (Array.isArray(_styles)) {
    _styles = Object.assign({}, { base: _styles[0] }, _styles[1]);
  } else if (!_styles.base) {
    var styleFunctions = {};

    for (var stylePropName in options) {
      if ("function" === typeof options[stylePropName]) styleFunctions[stylePropName] = options[stylePropName];
    }

    _styles = Object.assign({}, { base: _styles }, styleFunctions);
  }

  var wrappedStyles = wrapStyles(_styles, options, styleCSS);
  wrappedStyles.colors = wrappedStyles.colors || options && options.colors || userSetOptions && userSetOptions.colors;
  return wrappedStyles;
}

function wrapStyles(_styles, options, styleCSS) {

  options = Object.assign({}, userSetOptions, options);
  var radium = !!options.radium;
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
    var cached = { key: "", value: null };
    replacedStyle[styleName] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var elemName = args[0];
      if (Array.isArray(elemName) && elemName.hasOwnProperty("raw")) {

        elemName = elemName[0] || args[1];
        var inlineStyle = replacedStyle[styleName]();

        var baseStyle = styleCSS[styleName].base || {};
        for (var propN in styleCSS[styleName]) {
          if (specialCharacters.includes(propN[0])) {
            baseStyle[propN] = styleCSS[styleName][propN];
          }
        }

        var _separateCssStyle = separateCssStyle(baseStyle),
            css = _separateCssStyle.css,
            style = _separateCssStyle.style;
        /*
        const cssPropNames = Object.keys(styleCSS[styleName])
                                   .filter(stylePropName => stylePropName[0] === "@" ||  stylePropName[0] === ":");
        */


        var randomClassName = "";

        //if(0 < cssPropNames.length){
        if (css) {

          randomClassName = "react-outline-" + makeid();

          classes[randomClassName] = style ? '.' + randomClassName + '{' + object2css(style) + '}' : "";

          classes[randomClassName] = Object.keys(css).reduce(function (cssString, propName) {
            var styleContent = object2css(styleCSS[styleName].base && styleCSS[styleName].base[propName] || styleCSS[styleName][propName]);
            if (propName[0] === "@") return ' ' + propName + '{ .' + randomClassName + '{ ' + styleContent + ' } } ' + cssString;else if (propName[0] === ":") return ' .' + randomClassName + propName + '{ ' + styleContent + ' } ' + cssString;else return cssString;
          }, classes[randomClassName]);

          inlineStyle = {};
        }

        // return <${elemName} ...props />
        return function (props) {
          var elemProps = Object.assign({}, props);

          if (props.style) {
            elemProps.style = replacedStyle[styleName](props.style);
          } else {
            elemProps.style = inlineStyle;
          }

          if (options.named) elemProps.name = elemProps.name || styleName;

          elemProps.className = elemProps.className || "";
          elemProps.className += randomClassName || "";
          if ("" === elemProps.className) delete elemProps.className;

          return userSetOptions.createElement(elemName || styleName, elemProps);
        }; //,props.children
      } // elem gen

      var styleStuff = { styleCSS: styleCSS[styleName], styleFn: styleFn, radium: radium };

      if (!caching) {
        return genStyles(styleStuff, args, colors);
      }

      var key = JSON.stringify(args);
      if (key === cached.key) {
        return cached.value;
      }

      cached.key = key;
      cached.value = genStyles(styleStuff, args, colors);
      return cached.value;
    }; // END replacedStyle[styleName] = function(...args)

    if (0 < Object.keys(styleFn).length || hasKids(styleCSS[styleName])) {
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

function Styles(props) {
  var css = Object.keys(classes).map(function (className) {
    return classes[className];
  }).join(" ");
  css += props.children || undefined;
  css = css.replace(/\n/g, ' ').replace(/\s+/g, ' ');
  return userSetOptions.createElement("style", {}, css);
}
/*
// wrap createElement
function createElement(...args){

  if(userSetOptions.createElement){
    return userSetOptions.createElement(...args)
  } else {
    let react = require("react") || require("preact");
    return react.createElement(...args)
  }

}*/

exports.default = topLevelWrapStyles;
exports.withOptions = withOptions;
exports.setOptions = setOptions;
exports.Styles = Styles;