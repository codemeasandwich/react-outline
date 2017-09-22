'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

      var styleStuff = { styleCSS: styleCSS[styleName], styleFn: styleFn };

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9zdHlsZUl0ZW0uanMiXSwibmFtZXMiOlsiX3N0eWxlcyIsInJlcGxhY2VkU3R5bGUiLCJzdHlsZUNTUyIsImNvbG9ycyIsIm9wdGlvbnMiLCJjYWNoaW5nIiwid3JhcFN0eWxlcyIsInN0eWxlTmFtZSIsInN0eWxlRm4iLCJjYWNoZWQiLCJrZXkiLCJ2YWx1ZSIsInNvdXJjZSIsImFyZ3MiLCJlbGVtTmFtZSIsIkFycmF5IiwiaXNBcnJheSIsImhhc093blByb3BlcnR5IiwiYnVpbGRFbGVtIiwic3R5bGVTdHVmZiIsImJ1aWxkU3R5bGVPYmoiLCJnZW5TdHlsZXMiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiYXNzaWduIiwiaW5saW5lU3R5bGUiLCJiYXNlU3R5bGUiLCJiYXNlIiwicHJvcE4iLCJpbmNsdWRlcyIsIm1hdGNoIiwiUmVnRXhwIiwiY3NzIiwic3R5bGUiLCJyYW5kb21DbGFzc05hbWUiLCJnbG9iYWwiLCJfX1RFU1RfXyIsInB1Ymxpc2giLCJKU09OIiwic3RyaW5naWZ5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7a0JBcUVlLGlCQUErRTtBQUFBLE1BQXJFQSxPQUFxRSxTQUFyRUEsT0FBcUU7QUFBQSxNQUE3REMsYUFBNkQsU0FBN0RBLGFBQTZEO0FBQUEsTUFBL0NDLFFBQStDLFNBQS9DQSxRQUErQztBQUFBLE1BQXJDQyxNQUFxQyxTQUFyQ0EsTUFBcUM7QUFBQSxNQUE3QkMsT0FBNkIsU0FBN0JBLE9BQTZCO0FBQUEsTUFBckJDLE9BQXFCLFNBQXJCQSxPQUFxQjtBQUFBLE1BQVpDLFVBQVksU0FBWkEsVUFBWTs7O0FBRTlGO0FBQ0E7QUFDSSxTQUFPLFVBQUNDLFNBQUQsRUFBYTs7QUFFbEIsUUFBTUMsVUFBVVIsUUFBUU8sU0FBUixLQUFxQixZQUFJLENBQUUsQ0FBM0M7O0FBRUEsUUFBTUUsU0FBUyxFQUFFQyxLQUFJLElBQU4sRUFBWUMsT0FBTSxJQUFsQixFQUF3QkMsUUFBTyxFQUEvQixFQUFmO0FBQ0FYLGtC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QW1CQyxLQUFLLENBQUwsQ0FBbkI7QUFDQUosU0FBT0csTUFBUCxDQUFjLENBQWQsSUFBbUJDLEtBQUssQ0FBTCxDQUFuQjtBQUNBSixTQUFPRSxLQUFQLEdBQWVVLFVBQVVGLFVBQVYsRUFBcUJOLElBQXJCLEVBQTBCVixNQUExQixDQUFmO0FBQ0EsU0FBT00sT0FBT0UsS0FBZDtBQUVEOztBQUVEO0FBQ0E7QUFDQSIsImZpbGUiOiJzdHlsZUl0ZW0uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IGhhc0tpZHMsIHNwZWNpYWxDaGFyYWN0ZXJzLCBzcGVjaWFsSW5uZXJDaGFyYWN0ZXJzLCBzZXBhcmF0ZUNzc1N0eWxlLCBtYWtlaWQsIGdlbkNzcywgZ2VuU3R5bGVzLCBwdWJzdWIgfSBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IGVsZW1lbnQgZnJvbSAnLi9lbGVtZW50J1xuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSBidWlsZCBFbGVtXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIGJ1aWxkRWxlbSh7ZWxlbU5hbWUsYXJncyxzdHlsZUNTUyxzdHlsZU5hbWUsb3B0aW9ucyxyZXBsYWNlZFN0eWxlLGNvbG9yc30pe1xuXG4gIGVsZW1OYW1lID0gZWxlbU5hbWVbMF0gfHwgYXJnc1sxXTtcbiAgbGV0IGlubGluZVN0eWxlID0gbnVsbDsvL3JlcGxhY2VkU3R5bGVbc3R5bGVOYW1lXSgpO1xuXG4gIGNvbnN0IGJhc2VTdHlsZSA9IHN0eWxlQ1NTW3N0eWxlTmFtZV0gJiYgc3R5bGVDU1Nbc3R5bGVOYW1lXS5iYXNlIHx8IHt9XG4gIGZvcihjb25zdCBwcm9wTiBpbiBzdHlsZUNTU1tzdHlsZU5hbWVdKXtcbiAgICBpZihzcGVjaWFsQ2hhcmFjdGVycy5pbmNsdWRlcyhwcm9wTlswXSkgfHwgISFwcm9wTi5tYXRjaChuZXcgUmVnRXhwKGBbJHtzcGVjaWFsSW5uZXJDaGFyYWN0ZXJzfV1gLCBcImdpXCIpKSl7XG4gICAgICBiYXNlU3R5bGVbcHJvcE5dID0gc3R5bGVDU1Nbc3R5bGVOYW1lXVtwcm9wTl1cbiAgICB9XG4gIH1cbiAgLy9zcGxpY3QgXCI6XCIgYW5kIFwiQFwiIGZyb20gYWxsIG92ZXIgc3R5bGVzXG4gIGNvbnN0IHsgY3NzLCBzdHlsZSB9ID0gc2VwYXJhdGVDc3NTdHlsZShiYXNlU3R5bGUpO1xuICAvKlxuICBjb25zdCBjc3NQcm9wTmFtZXMgPSBPYmplY3Qua2V5cyhzdHlsZUNTU1tzdHlsZU5hbWVdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKHN0eWxlUHJvcE5hbWUgPT4gc3R5bGVQcm9wTmFtZVswXSA9PT0gXCJAXCIgfHwgIHN0eWxlUHJvcE5hbWVbMF0gPT09IFwiOlwiKTtcbiAgKi9cbiAgbGV0IHJhbmRvbUNsYXNzTmFtZSA9IFwiXCI7XG5cbiAgLy9pZigwIDwgY3NzUHJvcE5hbWVzLmxlbmd0aCl7XG4gIGlmKGNzcyl7XG4gICAgcmFuZG9tQ2xhc3NOYW1lID0gXCJyZWFjdC1vdXRsaW5lLVwiXG4gICAgaWYoIWdsb2JhbC5fX1RFU1RfXykgcmFuZG9tQ2xhc3NOYW1lICs9IG1ha2VpZCgpO1xuICAgIHB1YnN1Yi5wdWJsaXNoKHJhbmRvbUNsYXNzTmFtZSxnZW5Dc3Moe3JhbmRvbUNsYXNzTmFtZSwgY3NzLHN0eWxlQ1NTLCBjb2xvcnMsc3R5bGUsc3R5bGVOYW1lfSkpXG4gICAgaW5saW5lU3R5bGUgPSB7fTtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50KHtlbGVtTmFtZSwgY3NzLHN0eWxlQ1NTLGlubGluZVN0eWxlLHN0eWxlLHN0eWxlTmFtZSwgY29sb3JzLCByYW5kb21DbGFzc05hbWUsIG9wdGlvbnMscmFuZG9tQ2xhc3NOYW1lLHJlcGxhY2VkU3R5bGV9KVxufVxuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gYnVpbGQgU3R5bGUgT2JqXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIGJ1aWxkU3R5bGVPYmooe3N0eWxlU3R1ZmYsZ2VuU3R5bGVzLGFyZ3MsY29sb3JzLGNhY2hpbmcsY2FjaGVkfSl7XG5cbiAgaWYoIWNhY2hpbmcpe1xuICAgIHJldHVybiBnZW5TdHlsZXMoc3R5bGVTdHVmZixhcmdzLGNvbG9ycyk7XG4gIH1cbiAgLy8gcXVpY2sgdGVzdFxuICBpZihjYWNoZWQudmFsdWUgJiYgY2FjaGVkLnNvdXJjZVswXSA9PT0gYXJnc1swXSAmJiBjYWNoZWQuc291cmNlWzBdID09PSBhcmdzWzFdKXtcbiAgICByZXR1cm4gY2FjaGVkLnZhbHVlO1xuICB9XG4gIC8vIGRlZXAgdGVzdFxuICBjb25zdCBrZXkgPSBcIlwiK0pTT04uc3RyaW5naWZ5KGFyZ3NbMF0pK0pTT04uc3RyaW5naWZ5KGFyZ3NbMV0pXG4gIGlmKGtleSA9PT0gY2FjaGVkLmtleSl7XG4gICAgcmV0dXJuIGNhY2hlZC52YWx1ZTtcbiAgfVxuXG4gIGNhY2hlZC5rZXkgPSBrZXk7XG4gIGNhY2hlZC5zb3VyY2VbMF0gPSBhcmdzWzBdO1xuICBjYWNoZWQuc291cmNlWzFdID0gYXJnc1sxXTtcbiAgY2FjaGVkLnZhbHVlID0gZ2VuU3R5bGVzKHN0eWxlU3R1ZmYsYXJncyxjb2xvcnMpO1xuICByZXR1cm4gY2FjaGVkLnZhbHVlO1xuXG59XG5cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IHN0eWxlIEl0ZW1cbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oe19zdHlsZXMscmVwbGFjZWRTdHlsZSxzdHlsZUNTUywgY29sb3JzLCBvcHRpb25zLGNhY2hpbmcsIHdyYXBTdHlsZXN9KXtcblxuLy8rKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrIHN0eWxlIGZ1bmN0aW9uXG4vLysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKytcbiAgICByZXR1cm4gKHN0eWxlTmFtZSk9PntcblxuICAgICAgY29uc3Qgc3R5bGVGbiA9IF9zdHlsZXNbc3R5bGVOYW1lXXx8KCgpPT57fSk7XG5cbiAgICAgIGNvbnN0IGNhY2hlZCA9IHsga2V5Om51bGwsIHZhbHVlOm51bGwsIHNvdXJjZTpbXSB9XG4gICAgICByZXBsYWNlZFN0eWxlW3N0eWxlTmFtZV0gPSBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgICAgICAgbGV0IGVsZW1OYW1lID0gYXJnc1swXTtcblxuLy8rKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKyBidWlsZCBhbiBlbGVtZW50XG4vLysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKytcblxuICAgICAgICAgIGlmKEFycmF5LmlzQXJyYXkoZWxlbU5hbWUpICYmIGVsZW1OYW1lLmhhc093blByb3BlcnR5KFwicmF3XCIpKXtcbiAgICAgICAgICAgICAgcmV0dXJuIGJ1aWxkRWxlbSh7ZWxlbU5hbWUsYXJncyxzdHlsZUNTUyxzdHlsZU5hbWUsb3B0aW9ucyxyZXBsYWNlZFN0eWxlLGNvbG9yc30pXG4gICAgICAgICAgfSAvLyBlbGVtIGdlblxuXG4vLysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrIGdlbmVyYXQgc3R5bGVcbi8vKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK1xuXG4gICAgICAgICAgY29uc3Qgc3R5bGVTdHVmZiA9IHsgc3R5bGVDU1M6c3R5bGVDU1Nbc3R5bGVOYW1lXSxzdHlsZUZuIH07XG5cbiAgICAgICAgICByZXR1cm4gYnVpbGRTdHlsZU9iaih7c3R5bGVTdHVmZixnZW5TdHlsZXMsYXJncyxjb2xvcnMsY2FjaGluZyxjYWNoZWR9KVxuICAgICAgfSAvLyBFTkQgcmVwbGFjZWRTdHlsZVtzdHlsZU5hbWVdID0gZnVuY3Rpb24oLi4uYXJncylcblxuLy8rKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysgc3RlcCBkb3duIHRoZSB0cmVlXG4vLysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKytcblxuICAgICAgaWYoMCA8IE9iamVjdC5rZXlzKHN0eWxlRm4pLmxlbmd0aCB8fCBoYXNLaWRzKHN0eWxlQ1NTW3N0eWxlTmFtZV0pKXtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihyZXBsYWNlZFN0eWxlW3N0eWxlTmFtZV0sIHdyYXBTdHlsZXMoc3R5bGVGbixvcHRpb25zLHN0eWxlQ1NTW3N0eWxlTmFtZV0pKVxuICAgICAgfVxuICAgIH1cbn1cbiJdfQ==