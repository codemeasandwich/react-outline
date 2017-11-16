"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = replacedStyleFn;
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
  if (!!firstVal && "object" === (typeof firstVal === "undefined" ? "undefined" : _typeof(firstVal))) {
    Object.keys(firstVal).forEach(function (cssName) {
      if (true === firstVal[cssName] && styleCSS && cssName in styleCSS) autoAddStyles.push(styleCSS[cssName]);
      //  else // to bind style value to output obj
      //    autoAddStyles.push({cssName:firstVal[cssName]})
    });
  }

  return Object.assign.apply(Object, [{}, styleBase].concat(autoAddStyles, [processedStyles]));
}