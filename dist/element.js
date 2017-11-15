'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
          if (randomClassName) elemProps.style = props.style;else elemProps.style = replacedStyle[styleName](props.style, passedTrueProps);
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

  Object.defineProperty(C2, 'name', { value: styleName || elemName });

  return C2;
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9lbGVtZW50LmpzIl0sIm5hbWVzIjpbImVsZW1OYW1lIiwiY3NzIiwic3R5bGVDU1MiLCJpbmxpbmVTdHlsZSIsInN0eWxlIiwic3R5bGVOYW1lIiwiY29sb3JzIiwicmFuZG9tQ2xhc3NOYW1lIiwib3B0aW9ucyIsInJlcGxhY2VkU3R5bGUiLCJDMiIsInByb3BzIiwidXBkYXRlZENzcyIsIk9iamVjdCIsImFzc2lnbiIsInNlbGVjdG9yUnVsZSIsInB1Ymxpc2giLCJlbGVtUHJvcHMiLCJwYXNzZWRUcnVlUHJvcHMiLCJrZXlzIiwiZmlsdGVyIiwibmFtZSIsImxlbmd0aCIsInJlZHVjZSIsInN0eWxlUHJvcHMiLCJoYXNPd25Qcm9wZXJ0eSIsIm5hbWVkIiwiY2xhc3NOYW1lIiwiY3JlYXRlRWxlbWVudCIsImNoaWxkcmVuIiwiQ29tcG9uZW50IiwiZGVmaW5lUHJvcGVydHkiLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBS2UsZ0JBQThHO0FBQUEsTUFBcEdBLFFBQW9HLFFBQXBHQSxRQUFvRztBQUFBLE1BQTFGQyxHQUEwRixRQUExRkEsR0FBMEY7QUFBQSxNQUF0RkMsUUFBc0YsUUFBdEZBLFFBQXNGO0FBQUEsTUFBN0VDLFdBQTZFLFFBQTdFQSxXQUE2RTtBQUFBLE1BQWpFQyxLQUFpRSxRQUFqRUEsS0FBaUU7QUFBQSxNQUEzREMsU0FBMkQsUUFBM0RBLFNBQTJEO0FBQUEsTUFBaERDLE1BQWdELFFBQWhEQSxNQUFnRDtBQUFBLE1BQXhDQyxlQUF3QyxRQUF4Q0EsZUFBd0M7QUFBQSxNQUF2QkMsT0FBdUIsUUFBdkJBLE9BQXVCO0FBQUEsTUFBZkMsYUFBZSxRQUFmQSxhQUFlOztBQUFBLE1BR3JIQyxFQUhxSDtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsK0JBS2pIOztBQUVOLFlBQU1DLFFBQVEsS0FBS0EsS0FBbkI7O0FBRUEsWUFBRyxTQUFTQSxLQUFaLEVBQWtCOztBQUVoQixj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QUFPa0IsY0FBUCxDQUF1QnJCLEVBQXZCLEVBQTJCLE1BQTNCLEVBQW1DLEVBQUNzQixPQUFPM0IsYUFBV0wsUUFBbkIsRUFBbkM7O0FBRUEsU0FBT1UsRUFBUDtBQUVMLEM7O0FBN0VEOzs7O0FBQ0EiLCJmaWxlIjoiZWxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgZ2VuQ3NzLCBwdWJzdWIgfSBmcm9tICcuL3V0aWxzJ1xuXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHtlbGVtTmFtZSwgY3NzLHN0eWxlQ1NTLGlubGluZVN0eWxlLHN0eWxlLHN0eWxlTmFtZSwgY29sb3JzLCByYW5kb21DbGFzc05hbWUsIG9wdGlvbnMscmVwbGFjZWRTdHlsZX0pe1xuXG5cbiAgY2xhc3MgQzIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgcmVuZGVyKCl7XG5cbiAgICAgIGNvbnN0IHByb3BzID0gdGhpcy5wcm9wc1xuXG4gICAgICBpZihcImNzc1wiIGluIHByb3BzKXtcblxuICAgICAgICBjb25zdCB1cGRhdGVkQ3NzID0gT2JqZWN0LmFzc2lnbih7fSxjc3MpXG5cbiAgICAgICAgZm9yKGNvbnN0IHNlbGVjdG9yUnVsZSBpbiBwcm9wcy5jc3Mpe1xuICAgICAgICAgIHVwZGF0ZWRDc3Nbc2VsZWN0b3JSdWxlXSA9IE9iamVjdC5hc3NpZ24oe30sY3NzW3NlbGVjdG9yUnVsZV0sIFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIHByb3BzLmNzc1tzZWxlY3RvclJ1bGVdID8gcHJvcHMuY3NzW3NlbGVjdG9yUnVsZV0oKSA6IHByb3BzLmNzc1tzZWxlY3RvclJ1bGVdKVxuICAgICAgICB9XG4gICAgICAgIHB1YnN1Yi5wdWJsaXNoKHJhbmRvbUNsYXNzTmFtZSwgZ2VuQ3NzKHtyYW5kb21DbGFzc05hbWUsIGNzczp1cGRhdGVkQ3NzLHN0eWxlQ1NTLCBjb2xvcnMsc3R5bGUsc3R5bGVOYW1lfSkpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGVsZW1Qcm9wcyA9IE9iamVjdC5hc3NpZ24oe30scHJvcHMpO1xuXG4gICAgICBsZXQgcGFzc2VkVHJ1ZVByb3BzID0gT2JqZWN0LmtleXMocHJvcHMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlciggbmFtZSA9PiBwcm9wc1tuYW1lXSA9PT0gdHJ1ZSAmJiBzdHlsZUNTU1tzdHlsZU5hbWVdICYmIG5hbWUgaW4gc3R5bGVDU1Nbc3R5bGVOYW1lXSApXG4gICAgICAvLyAgY29uc29sZS5sb2coXCJwYXNzZWRUcnVlUHJvcHNcIixwYXNzZWRUcnVlUHJvcHMpXG4gICAgICBpZigwIDwgcGFzc2VkVHJ1ZVByb3BzLmxlbmd0aCl7XG4gICAgICAgIHBhc3NlZFRydWVQcm9wcyA9IHBhc3NlZFRydWVQcm9wcy5yZWR1Y2UoKHN0eWxlUHJvcHMsIG5hbWUpID0+IHtcbiAgICAgICAgICAvLyBJZiBlbGVtIGlzIGEgSFRNTCB0eXBlID0gUmVtb3ZlZCBpdCBVbmtub3duIHByb3AgYC4uLmAgb24gPC4uLj4gdGFnLiBSZW1vdmUgdGhpcyBwcm9wIGZyb20gdGhlIGVsZW1lbnQuXG4gICAgICAgICAgaWYoXCJmdW5jdGlvblwiICE9PSB0eXBlb2YgZWxlbU5hbWUgJiYgXCJkaXNhYmxlZFwiICE9PSBuYW1lKXtcbiAgICAgICAgICAgIGRlbGV0ZSBlbGVtUHJvcHNbbmFtZV1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oc3R5bGVQcm9wcyx7W25hbWVdOnRydWV9KVxuICAgICAgICB9LHt9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFzc2VkVHJ1ZVByb3BzID0gbnVsbFxuICAgICAgfVxuXG4gICAgICBpZihwYXNzZWRUcnVlUHJvcHMgfHwgcHJvcHMuaGFzT3duUHJvcGVydHkoXCJzdHlsZVwiKSl7XG4gICAgICAgIC8vaWYocHJvcHMuc3R5bGUgaW5zdGFuY2VvZiBPYmplY3QpXG4gICAgICAgIC8vICAgIHBhc3NlZFRydWVQcm9wcyA9IE9iamVjdC5hc3NpZ24oe30scHJvcHMuc3R5bGUscGFzc2VkVHJ1ZVByb3BzKTtcbiAgICAgICAgaWYocmFuZG9tQ2xhc3NOYW1lKVxuICAgICAgICAgICAgZWxlbVByb3BzLnN0eWxlID0gcHJvcHMuc3R5bGVcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZWxlbVByb3BzLnN0eWxlID0gcmVwbGFjZWRTdHlsZVtzdHlsZU5hbWVdKHByb3BzLnN0eWxlLHBhc3NlZFRydWVQcm9wcyk7XG5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1Qcm9wcy5zdHlsZSA9IGlubGluZVN0eWxlIHx8IHJlcGxhY2VkU3R5bGVbc3R5bGVOYW1lXSgpO1xuICAgICAgfVxuXG4gICAgICBpZihPYmplY3Qua2V5cyhlbGVtUHJvcHMuc3R5bGUpLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgICBkZWxldGUgZWxlbVByb3BzLnN0eWxlO1xuICAgICAgfVxuXG4gICAgICBpZihvcHRpb25zLm5hbWVkKXtcbiAgICAgICAgZWxlbVByb3BzLm5hbWUgPSBlbGVtUHJvcHMubmFtZSB8fCBzdHlsZU5hbWU7XG4gICAgICB9XG5cbiAgICAgICAgZWxlbVByb3BzLmNsYXNzTmFtZSAgPSBlbGVtUHJvcHMuY2xhc3NOYW1lIHx8IFwiXCJcbiAgICAgICAgaWYoZWxlbVByb3BzLmNsYXNzTmFtZSAmJiByYW5kb21DbGFzc05hbWUpe1xuICAgICAgICAgIGVsZW1Qcm9wcy5jbGFzc05hbWUgKz0gXCIgXCJcbiAgICAgICAgfVxuICAgICAgICBlbGVtUHJvcHMuY2xhc3NOYW1lICs9IHJhbmRvbUNsYXNzTmFtZSB8fCBcIlwiXG4gICAgICAgIGlmKFwiXCIgPT09IGVsZW1Qcm9wcy5jbGFzc05hbWUpXG4gICAgICAgICAgICBkZWxldGUgZWxlbVByb3BzLmNsYXNzTmFtZTtcblxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoZWxlbU5hbWV8fHN0eWxlTmFtZSxlbGVtUHJvcHMsZWxlbVByb3BzICYmIGVsZW1Qcm9wcy5jaGlsZHJlbilcblxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkgKEMyLCAnbmFtZScsIHt2YWx1ZTogc3R5bGVOYW1lfHxlbGVtTmFtZX0pO1xuXG4gICAgICByZXR1cm4gQzJcblxufVxuIl19