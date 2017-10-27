'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function (_ref) {
  var elemName = _ref.elemName,
      css = _ref.css,
      styleCSS = _ref.styleCSS,
      inlineStyle = _ref.inlineStyle,
      style = _ref.style,
      styleName = _ref.styleName,
      colors = _ref.colors,
      randomClassName = _ref.randomClassName,
      options = _ref.options,
      replacedStyle = _ref.replacedStyle;


  var C2 = function (_React$Component) {
    _inherits(C2, _React$Component);

    function C2() {
      _classCallCheck(this, C2);

      return _possibleConstructorReturn(this, (C2.__proto__ || Object.getPrototypeOf(C2)).apply(this, arguments));
    }

    _createClass(C2, [{
      key: 'render',
      value: function render() {

        var props = this.props;

        if ("css" in props) {

          var updatedCss = Object.assign({}, css);

          for (var selectorRule in props.css) {
            updatedCss[selectorRule] = Object.assign({}, css[selectorRule], "function" === typeof props.css[selectorRule] ? props.css[selectorRule]() : props.css[selectorRule]);
          }
          _utils.pubsub.publish(randomClassName, (0, _utils.genCss)({ randomClassName: randomClassName, css: updatedCss, styleCSS: styleCSS, colors: colors, style: style, styleName: styleName }));
        }

        var elemProps = Object.assign({}, props);

        var passedTrueProps = Object.keys(props).filter(function (name) {
          return props[name] === true && styleCSS[styleName] && name in styleCSS[styleName];
        });
        //  console.log("passedTrueProps",passedTrueProps)
        if (0 < passedTrueProps.length) {
          passedTrueProps = passedTrueProps.reduce(function (styleProps, name) {
            // If elem is a HTML type = Removed it Unknown prop `...` on <...> tag. Remove this prop from the element.
            if ("function" !== typeof elemName && "disabled" !== name) {
              delete elemProps[name];
            }
            return Object.assign(styleProps, _defineProperty({}, name, true));
          }, {});
        } else {
          passedTrueProps = null;
        }
        if (passedTrueProps || props.hasOwnProperty("style")) {
          //if(props.style instanceof Object)
          //    passedTrueProps = Object.assign({},props.style,passedTrueProps);
          elemProps.style = replacedStyle[styleName](props.style, passedTrueProps);
        } else {
          elemProps.style = inlineStyle || replacedStyle[styleName]();
        }

        if (Object.keys(elemProps.style).length === 0) {
          delete elemProps.style;
        }

        if (options.named) {
          elemProps.name = elemProps.name || styleName;
        }

        elemProps.className = elemProps.className || "";
        if (elemProps.className && randomClassName) {
          elemProps.className += " ";
        }
        elemProps.className += randomClassName || "";
        if ("" === elemProps.className) delete elemProps.className;

        return _react2.default.createElement(elemName || styleName, elemProps, elemProps && elemProps.children);
      }
    }]);

    return C2;
  }(_react2.default.Component);

  return C2;
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9lbGVtZW50LmpzIl0sIm5hbWVzIjpbImVsZW1OYW1lIiwiY3NzIiwic3R5bGVDU1MiLCJpbmxpbmVTdHlsZSIsInN0eWxlIiwic3R5bGVOYW1lIiwiY29sb3JzIiwicmFuZG9tQ2xhc3NOYW1lIiwib3B0aW9ucyIsInJlcGxhY2VkU3R5bGUiLCJDMiIsIl9SZWFjdCRDb21wb25lbnQiLCJfaW5oZXJpdHMiLCJfY2xhc3NDYWxsQ2hlY2siLCJfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybiIsIl9fcHJvdG9fXyIsIk9iamVjdCIsImdldFByb3RvdHlwZU9mIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsInJlbmRlciIsInByb3BzIiwidXBkYXRlZENzcyIsImFzc2lnbiIsInNlbGVjdG9yUnVsZSIsInB1Ymxpc2giLCJlbGVtUHJvcHMiLCJwYXNzZWRUcnVlUHJvcHMiLCJrZXlzIiwiZmlsdGVyIiwibmFtZSIsImxlbmd0aCIsInJlZHVjZSIsInN0eWxlUHJvcHMiLCJoYXNPd25Qcm9wZXJ0eSIsIm5hbWVkIiwiY2xhc3NOYW1lIiwiY3JlYXRlRWxlbWVudCIsImNoaWxkcmVuIiwiQ29tcG9uZW50IiwiZGVmaW5lUHJvcGVydGllcyIsInRhcmdldCIsImkiLCJkZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiZGVmaW5lUHJvcGVydHkiLCJDb25zdHJ1Y3RvciIsInByb3RvUHJvcHMiLCJzdGF0aWNQcm9wcyIsInByb3RvdHlwZSIsImluc3RhbmNlIiwiVHlwZUVycm9yIiwic2VsZiIsImNhbGwiLCJSZWZlcmVuY2VFcnJvciIsInN1YkNsYXNzIiwic3VwZXJDbGFzcyIsImNyZWF0ZSIsImNvbnN0cnVjdG9yIiwic2V0UHJvdG90eXBlT2YiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O2tCQWlCZSxnQkFBOEc7QUFBQSxNQUFwR0EsUUFBb0csUUFBcEdBLFFB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NkQ7QUFBRSxVQUFNLElBQUlMLFNBQUosQ0FBYyxxRUFBb0VLLFVBQXBFLHlDQUFvRUEsVUFBcEUsRUFBZCxDQUFOO0FBQXNHLEdBQUNELFNBQVNOLFNBQVQsR0FBcUJ0QyxPQUFPOEMsTUFBUCxDQUFjRCxjQUFjQSxXQUFXUCxTQUF2QyxFQUFrRCxFQUFFUyxhQUFhLEVBQUV6QyxPQUFPc0MsUUFBVCxFQUFtQmIsWUFBWSxLQUEvQixFQUFzQ0UsVUFBVSxJQUFoRCxFQUFzREQsY0FBYyxJQUFwRSxFQUFmLEVBQWxELENBQXJCLENBQXFLLElBQUlhLFVBQUosRUFBZ0I3QyxPQUFPZ0QsY0FBUCxHQUF3QmhELE9BQU9nRCxjQUFQLENBQXNCSixRQUF0QixFQUFnQ0MsVUFBaEMsQ0FBeEIsR0FBc0VELFNBQVM3QyxTQUFULEdBQXFCOEMsVUFBM0Y7QUFBd0ciLCJmaWxlIjoiZWxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgZ2VuQ3NzLCBwdWJzdWIgfSBmcm9tICcuL3V0aWxzJ1xuXG5cblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih7ZWxlbU5hbWUsIGNzcyxzdHlsZUNTUyxpbmxpbmVTdHlsZSxzdHlsZSxzdHlsZU5hbWUsIGNvbG9ycywgcmFuZG9tQ2xhc3NOYW1lLCBvcHRpb25zLHJlcGxhY2VkU3R5bGV9KXtcblxuXG5cblxuICBjb25zdCBDMiA9IGZ1bmN0aW9uIChfUmVhY3QkQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKEMyLCBfUmVhY3QkQ29tcG9uZW50KTtcblxuICAgIGZ1bmN0aW9uIEMyKCkge1xuICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEMyKTtcblxuICAgICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChDMi5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKEMyKSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKEMyLCBbe1xuICAgICAga2V5OiAncmVuZGVyJyxcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG5cblxuXG4gIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wc1xuXG4gICAgICBpZihcImNzc1wiIGluIHByb3BzKXtcblxuICAgICAgICBjb25zdCB1cGRhdGVkQ3NzID0gT2JqZWN0LmFzc2lnbih7fSxjc3MpXG5cbiAgICAgICAgZm9yKGNvbnN0IHNlbGVjdG9yUnVsZSBpbiBwcm9wcy5jc3Mpe1xuICAgICAgICAgIHVwZGF0ZWRDc3Nbc2VsZWN0b3JSdWxlXSA9IE9iamVjdC5hc3NpZ24oe30sY3NzW3NlbGVjdG9yUnVsZV0sIFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIHByb3BzLmNzc1tzZWxlY3RvclJ1bGVdID8gcHJvcHMuY3NzW3NlbGVjdG9yUnVsZV0oKSA6IHByb3BzLmNzc1tzZWxlY3RvclJ1bGVdKVxuICAgICAgICB9XG4gICAgICAgIHB1YnN1Yi5wdWJsaXNoKHJhbmRvbUNsYXNzTmFtZSwgZ2VuQ3NzKHtyYW5kb21DbGFzc05hbWUsIGNzczp1cGRhdGVkQ3NzLHN0eWxlQ1NTLCBjb2xvcnMsc3R5bGUsc3R5bGVOYW1lfSkpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGVsZW1Qcm9wcyA9IE9iamVjdC5hc3NpZ24oe30scHJvcHMpO1xuXG4gICAgbGV0IHBhc3NlZFRydWVQcm9wcyA9IE9iamVjdC5rZXlzKHByb3BzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCBuYW1lID0+IHByb3BzW25hbWVdID09PSB0cnVlICYmIHN0eWxlQ1NTW3N0eWxlTmFtZV0gJiYgbmFtZSBpbiBzdHlsZUNTU1tzdHlsZU5hbWVdIClcbiAgICAvLyAgY29uc29sZS5sb2coXCJwYXNzZWRUcnVlUHJvcHNcIixwYXNzZWRUcnVlUHJvcHMpXG4gICAgaWYoMCA8IHBhc3NlZFRydWVQcm9wcy5sZW5ndGgpe1xuICAgICAgcGFzc2VkVHJ1ZVByb3BzID0gcGFzc2VkVHJ1ZVByb3BzLnJlZHVjZSgoc3R5bGVQcm9wcywgbmFtZSkgPT4ge1xuICAgICAgICAvLyBJZiBlbGVtIGlzIGEgSFRNTCB0eXBlID0gUmVtb3ZlZCBpdCBVbmtub3duIHByb3AgYC4uLmAgb24gPC4uLj4gdGFnLiBSZW1vdmUgdGhpcyBwcm9wIGZyb20gdGhlIGVsZW1lbnQuXG4gICAgICAgIGlmKFwiZnVuY3Rpb25cIiAhPT0gdHlwZW9mIGVsZW1OYW1lICYmIFwiZGlzYWJsZWRcIiAhPT0gbmFtZSl7XG4gICAgICAgICAgZGVsZXRlIGVsZW1Qcm9wc1tuYW1lXVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHN0eWxlUHJvcHMse1tuYW1lXTp0cnVlfSlcbiAgICAgIH0se30pXG4gICAgfSBlbHNlIHtcbiAgICAgIHBhc3NlZFRydWVQcm9wcyA9IG51bGxcbiAgICB9XG4gICAgICBpZihwYXNzZWRUcnVlUHJvcHMgfHwgcHJvcHMuaGFzT3duUHJvcGVydHkoXCJzdHlsZVwiKSl7XG4gICAgICAgIC8vaWYocHJvcHMuc3R5bGUgaW5zdGFuY2VvZiBPYmplY3QpXG4gICAgICAgIC8vICAgIHBhc3NlZFRydWVQcm9wcyA9IE9iamVjdC5hc3NpZ24oe30scHJvcHMuc3R5bGUscGFzc2VkVHJ1ZVByb3BzKTtcbiAgICAgICAgZWxlbVByb3BzLnN0eWxlID0gcmVwbGFjZWRTdHlsZVtzdHlsZU5hbWVdKHByb3BzLnN0eWxlLHBhc3NlZFRydWVQcm9wcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtUHJvcHMuc3R5bGUgPSBpbmxpbmVTdHlsZSB8fCByZXBsYWNlZFN0eWxlW3N0eWxlTmFtZV0oKTtcbiAgICAgIH1cblxuICAgICAgaWYoT2JqZWN0LmtleXMoZWxlbVByb3BzLnN0eWxlKS5sZW5ndGggPT09IDApe1xuICAgICAgICAgZGVsZXRlIGVsZW1Qcm9wcy5zdHlsZTtcbiAgICAgIH1cblxuICAgICAgaWYob3B0aW9ucy5uYW1lZCl7XG4gICAgICAgIGVsZW1Qcm9wcy5uYW1lID0gZWxlbVByb3BzLm5hbWUgfHwgc3R5bGVOYW1lO1xuICAgICAgfVxuXG4gICAgICAgIGVsZW1Qcm9wcy5jbGFzc05hbWUgID0gZWxlbVByb3BzLmNsYXNzTmFtZSB8fCBcIlwiXG4gICAgICAgIGlmKGVsZW1Qcm9wcy5jbGFzc05hbWUgJiYgcmFuZG9tQ2xhc3NOYW1lKXtcbiAgICAgICAgICBlbGVtUHJvcHMuY2xhc3NOYW1lICs9IFwiIFwiXG4gICAgICAgIH1cbiAgICAgICAgZWxlbVByb3BzLmNsYXNzTmFtZSArPSByYW5kb21DbGFzc05hbWUgfHwgXCJcIlxuICAgICAgICBpZihcIlwiID09PSBlbGVtUHJvcHMuY2xhc3NOYW1lKVxuICAgICAgICAgICAgZGVsZXRlIGVsZW1Qcm9wcy5jbGFzc05hbWU7XG5cbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGVsZW1OYW1lfHxzdHlsZU5hbWUsZWxlbVByb3BzLGVsZW1Qcm9wcyAmJiBlbGVtUHJvcHMuY2hpbGRyZW4pXG5cblxuICAgICAgICAgIH1cbiAgICAgICAgfV0pO1xuXG4gICAgICAgIHJldHVybiBDMjtcbiAgICAgIH0oUmVhY3QuQ29tcG9uZW50KTtcblxucmV0dXJuIEMyXG5cblxufVxuIl19