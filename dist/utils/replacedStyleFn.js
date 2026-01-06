"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = replacedStyleFn;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function replacedStyleFn(_ref, args) {
  var styleCSS = _ref.styleCSS,
    styleFn = _ref.styleFn;
  var processedStyles = 1 === styleFn.length ? styleFn(args[0]) : styleFn(styleCSS, args[0]);

  // const styleAsPropObj = 0===styleFn.length && "object" === typeof args[0] ? args[0] : {};
  // const styleBase = Object.assign({},styleCSS && styleCSS.base||styleCSS||{},styleAsPropObj)
  var styleBase = Object.assign({}, styleCSS && styleCSS.base || styleCSS || {});
  /*
    for(const stylePropName in styleBase){
      if(specialCharacters.includes(stylePropName[0]))
      delete styleBase[stylePropName];
    }
  */

  //const autoAddStyles = [], firstVal = args[1]// || args[0];
  var autoAddStyles = [],
    firstVal = args[1] || args[0];
  //console.log(args)
  if (!!firstVal && "object" === _typeof(firstVal)) {
    Object.keys(firstVal).forEach(function (cssName) {
      if (true === firstVal[cssName] && styleCSS && cssName in styleCSS) autoAddStyles.push(styleCSS[cssName]);
      //  else // to bind style value to output obj
      //    autoAddStyles.push({cssName:firstVal[cssName]})
    });
  }
  return Object.assign.apply(Object, [{}, styleBase].concat(autoAddStyles, [processedStyles]));
}