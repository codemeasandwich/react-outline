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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS91dGlscy9yZXBsYWNlZFN0eWxlRm4uanMiXSwibmFtZXMiOlsicmVwbGFjZWRTdHlsZUZuIiwiYXJncyIsInN0eWxlQ1NTIiwic3R5bGVGbiIsInByb2Nlc3NlZFN0eWxlcyIsImxlbmd0aCIsInN0eWxlQmFzZSIsIk9iamVjdCIsImFzc2lnbiIsImJhc2UiLCJhdXRvQWRkU3R5bGVzIiwiZmlyc3RWYWwiLCJrZXlzIiwiZm9yRWFjaCIsImNzc05hbWUiLCJwdXNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztrQkFDd0JBLGU7QUFBVCxTQUFTQSxlQUFULE9BQXVEQyxJQUF2RCxFQUE0RDtBQUFBLE1BQWxDQyxRQUFrQyxRQUFsQ0EsUUFBa0M7QUFBQSxNQUF6QkMsT0FBeUIsUUFBekJBLE9BQXlCOzs7QUFFekUsTUFBTUMsa0JBQWtCLE1BQUtELFFBQVFFLE1BQWIsR0FBc0JGLFFBQVFGLEtBQUssQ0FBTCxDQUFSLENBQXRCLEdBQXlDRSxRQUFRRCxRQUFSLEVBQWlCRCxLQUFLLENBQUwsQ0FBakIsQ0FBakU7O0FBRUY7QUFDQTtBQUNHLE1BQU1LLFlBQVlDLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWlCTixZQUFZQSxTQUFTTyxJQUFyQixJQUEyQlAsUUFBM0IsSUFBcUMsRUFBdEQsQ0FBbEI7QUFDSDs7Ozs7OztBQU9BO0FBQ0UsTUFBTVEsZ0JBQWdCLEVBQXRCO0FBQUEsTUFBMEJDLFdBQVdWLEtBQUssQ0FBTCxLQUFXQSxLQUFLLENBQUwsQ0FBaEQ7QUFDQTtBQUNBLE1BQUcsQ0FBQyxDQUFDVSxRQUFGLElBQWMscUJBQW9CQSxRQUFwQix5Q0FBb0JBLFFBQXBCLEVBQWpCLEVBQThDO0FBQzFDSixXQUFPSyxJQUFQLENBQVlELFFBQVosRUFDT0UsT0FEUCxDQUNnQixtQkFBVztBQUN6QixVQUFHLFNBQVNGLFNBQVNHLE9BQVQsQ0FBVCxJQUE4QlosUUFBOUIsSUFBMENZLFdBQVdaLFFBQXhELEVBQ0VRLGNBQWNLLElBQWQsQ0FBbUJiLFNBQVNZLE9BQVQsQ0FBbkI7QUFDSjtBQUNBO0FBQ0MsS0FORDtBQU9IOztBQUVELFNBQU9QLE9BQU9DLE1BQVAsZ0JBQWMsRUFBZCxFQUFpQkYsU0FBakIsU0FBOEJJLGFBQTlCLEdBQTRDTixlQUE1QyxHQUFQO0FBQ0QiLCJmaWxlIjoicmVwbGFjZWRTdHlsZUZuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXBsYWNlZFN0eWxlRm4oe3N0eWxlQ1NTLHN0eWxlRm4vKixyYWRpdW0qL30sYXJncyl7XG5cbiAgY29uc3QgcHJvY2Vzc2VkU3R5bGVzID0gMT09PSBzdHlsZUZuLmxlbmd0aCA/IHN0eWxlRm4oYXJnc1swXSkgOiBzdHlsZUZuKHN0eWxlQ1NTLGFyZ3NbMF0pO1xuXG4vLyBjb25zdCBzdHlsZUFzUHJvcE9iaiA9IDA9PT1zdHlsZUZuLmxlbmd0aCAmJiBcIm9iamVjdFwiID09PSB0eXBlb2YgYXJnc1swXSA/IGFyZ3NbMF0gOiB7fTtcbi8vIGNvbnN0IHN0eWxlQmFzZSA9IE9iamVjdC5hc3NpZ24oe30sc3R5bGVDU1MgJiYgc3R5bGVDU1MuYmFzZXx8c3R5bGVDU1N8fHt9LHN0eWxlQXNQcm9wT2JqKVxuICAgY29uc3Qgc3R5bGVCYXNlID0gT2JqZWN0LmFzc2lnbih7fSxzdHlsZUNTUyAmJiBzdHlsZUNTUy5iYXNlfHxzdHlsZUNTU3x8e30pXG4vKlxuICBmb3IoY29uc3Qgc3R5bGVQcm9wTmFtZSBpbiBzdHlsZUJhc2Upe1xuICAgIGlmKHNwZWNpYWxDaGFyYWN0ZXJzLmluY2x1ZGVzKHN0eWxlUHJvcE5hbWVbMF0pKVxuICAgIGRlbGV0ZSBzdHlsZUJhc2Vbc3R5bGVQcm9wTmFtZV07XG4gIH1cbiovXG5cbi8vY29uc3QgYXV0b0FkZFN0eWxlcyA9IFtdLCBmaXJzdFZhbCA9IGFyZ3NbMV0vLyB8fCBhcmdzWzBdO1xuICBjb25zdCBhdXRvQWRkU3R5bGVzID0gW10sIGZpcnN0VmFsID0gYXJnc1sxXSB8fCBhcmdzWzBdO1xuICAvL2NvbnNvbGUubG9nKGFyZ3MpXG4gIGlmKCEhZmlyc3RWYWwgJiYgXCJvYmplY3RcIiA9PT0gdHlwZW9mIGZpcnN0VmFsKXtcbiAgICAgIE9iamVjdC5rZXlzKGZpcnN0VmFsKVxuICAgICAgICAgICAgLmZvckVhY2goIGNzc05hbWUgPT4ge1xuICAgICAgICBpZih0cnVlID09PSBmaXJzdFZhbFtjc3NOYW1lXSAmJiBzdHlsZUNTUyAmJiBjc3NOYW1lIGluIHN0eWxlQ1NTKVxuICAgICAgICAgIGF1dG9BZGRTdHlsZXMucHVzaChzdHlsZUNTU1tjc3NOYW1lXSlcbiAgICAgIC8vICBlbHNlIC8vIHRvIGJpbmQgc3R5bGUgdmFsdWUgdG8gb3V0cHV0IG9ialxuICAgICAgLy8gICAgYXV0b0FkZFN0eWxlcy5wdXNoKHtjc3NOYW1lOmZpcnN0VmFsW2Nzc05hbWVdfSlcbiAgICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sc3R5bGVCYXNlLC4uLmF1dG9BZGRTdHlsZXMscHJvY2Vzc2VkU3R5bGVzKTtcbn1cbiJdfQ==