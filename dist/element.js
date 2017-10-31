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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9lbGVtZW50LmpzIl0sIm5hbWVzIjpbImVsZW1OYW1lIiwiY3NzIiwic3R5bGVDU1MiLCJpbmxpbmVTdHlsZSIsInN0eWxlIiwic3R5bGVOYW1lIiwiY29sb3JzIiwicmFuZG9tQ2xhc3NOYW1lIiwib3B0aW9ucyIsInJlcGxhY2VkU3R5bGUiLCJDMiIsInByb3BzIiwidXBkYXRlZENzcyIsIk9iamVjdCIsImFzc2lnbiIsInNlbGVjdG9yUnVsZSIsInB1Ymxpc2giLCJlbGVtUHJvcHMiLCJwYXNzZWRUcnVlUHJvcHMiLCJrZXlzIiwiZmlsdGVyIiwibmFtZSIsImxlbmd0aCIsInJlZHVjZSIsInN0eWxlUHJvcHMiLCJoYXNPd25Qcm9wZXJ0eSIsIm5hbWVkIiwiY2xhc3NOYW1lIiwiY3JlYXRlRWxlbWVudCIsImNoaWxkcmVuIiwiQ29tcG9uZW50IiwiZGVmaW5lUHJvcGVydHkiLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBS2UsZ0JBQThHO0FBQUEsTUFBcEdBLFFBQW9HLFFBQXBHQSxRQUFvRztBQUFBLE1BQTFGQyxHQUEwRixRQUExRkEsR0FBMEY7QUFBQSxNQUF0RkMsUUFBc0YsUUFBdEZBLFFBQXNGO0FBQUEsTUFBN0VDLFdBQTZFLFFBQTdFQSxXQUE2RTtBQUFBLE1BQWpFQyxLQUFpRSxRQUFqRUEsS0FBaUU7QUFBQSxNQUEzREMsU0FBMkQsUUFBM0RBLFNBQTJEO0FBQUEsTUFBaERDLE1BQWdELFFBQWhEQSxNQUFnRDtBQUFBLE1BQXhDQyxlQUF3QyxRQUF4Q0EsZUFBd0M7QUFBQSxNQUF2QkMsT0FBdUIsUUFBdkJBLE9BQXVCO0FBQUEsTUFBZkMsYUFBZSxRQUFmQSxhQUFlOztBQUFBLE1BR3JIQyxFQUhxSDtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUEsK0JBS2pIOztBQUVWLFlBQU1DLFFBQVEsS0FBS0EsS0FBbkI7O0FBRUksWUFBRyxTQUFTQSxLQUFaLEVBQWtCOztBQUVoQixj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QUFXTCxRQUFuQixFQUFuQzs7QUFFQSxTQUFPVSxFQUFQO0FBRUwsQzs7QUF4RUQ7Ozs7QUFDQSIsImZpbGUiOiJlbGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBnZW5Dc3MsIHB1YnN1YiB9IGZyb20gJy4vdXRpbHMnXG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oe2VsZW1OYW1lLCBjc3Msc3R5bGVDU1MsaW5saW5lU3R5bGUsc3R5bGUsc3R5bGVOYW1lLCBjb2xvcnMsIHJhbmRvbUNsYXNzTmFtZSwgb3B0aW9ucyxyZXBsYWNlZFN0eWxlfSl7XG5cblxuICBjbGFzcyBDMiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICByZW5kZXIoKXtcblxuICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcHNcblxuICAgICAgaWYoXCJjc3NcIiBpbiBwcm9wcyl7XG5cbiAgICAgICAgY29uc3QgdXBkYXRlZENzcyA9IE9iamVjdC5hc3NpZ24oe30sY3NzKVxuXG4gICAgICAgIGZvcihjb25zdCBzZWxlY3RvclJ1bGUgaW4gcHJvcHMuY3NzKXtcbiAgICAgICAgICB1cGRhdGVkQ3NzW3NlbGVjdG9yUnVsZV0gPSBPYmplY3QuYXNzaWduKHt9LGNzc1tzZWxlY3RvclJ1bGVdLCBcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBwcm9wcy5jc3Nbc2VsZWN0b3JSdWxlXSA/IHByb3BzLmNzc1tzZWxlY3RvclJ1bGVdKCkgOiBwcm9wcy5jc3Nbc2VsZWN0b3JSdWxlXSlcbiAgICAgICAgfVxuICAgICAgICBwdWJzdWIucHVibGlzaChyYW5kb21DbGFzc05hbWUsIGdlbkNzcyh7cmFuZG9tQ2xhc3NOYW1lLCBjc3M6dXBkYXRlZENzcyxzdHlsZUNTUywgY29sb3JzLHN0eWxlLHN0eWxlTmFtZX0pKVxuICAgICAgfVxuXG4gICAgICBjb25zdCBlbGVtUHJvcHMgPSBPYmplY3QuYXNzaWduKHt9LHByb3BzKTtcblxuICAgIGxldCBwYXNzZWRUcnVlUHJvcHMgPSBPYmplY3Qua2V5cyhwcm9wcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlciggbmFtZSA9PiBwcm9wc1tuYW1lXSA9PT0gdHJ1ZSAmJiBzdHlsZUNTU1tzdHlsZU5hbWVdICYmIG5hbWUgaW4gc3R5bGVDU1Nbc3R5bGVOYW1lXSApXG4gICAgLy8gIGNvbnNvbGUubG9nKFwicGFzc2VkVHJ1ZVByb3BzXCIscGFzc2VkVHJ1ZVByb3BzKVxuICAgIGlmKDAgPCBwYXNzZWRUcnVlUHJvcHMubGVuZ3RoKXtcbiAgICAgIHBhc3NlZFRydWVQcm9wcyA9IHBhc3NlZFRydWVQcm9wcy5yZWR1Y2UoKHN0eWxlUHJvcHMsIG5hbWUpID0+IHtcbiAgICAgICAgLy8gSWYgZWxlbSBpcyBhIEhUTUwgdHlwZSA9IFJlbW92ZWQgaXQgVW5rbm93biBwcm9wIGAuLi5gIG9uIDwuLi4+IHRhZy4gUmVtb3ZlIHRoaXMgcHJvcCBmcm9tIHRoZSBlbGVtZW50LlxuICAgICAgICBpZihcImZ1bmN0aW9uXCIgIT09IHR5cGVvZiBlbGVtTmFtZSAmJiBcImRpc2FibGVkXCIgIT09IG5hbWUpe1xuICAgICAgICAgIGRlbGV0ZSBlbGVtUHJvcHNbbmFtZV1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihzdHlsZVByb3BzLHtbbmFtZV06dHJ1ZX0pXG4gICAgICB9LHt9KVxuICAgIH0gZWxzZSB7XG4gICAgICBwYXNzZWRUcnVlUHJvcHMgPSBudWxsXG4gICAgfVxuICAgICAgaWYocGFzc2VkVHJ1ZVByb3BzIHx8IHByb3BzLmhhc093blByb3BlcnR5KFwic3R5bGVcIikpe1xuICAgICAgICAvL2lmKHByb3BzLnN0eWxlIGluc3RhbmNlb2YgT2JqZWN0KVxuICAgICAgICAvLyAgICBwYXNzZWRUcnVlUHJvcHMgPSBPYmplY3QuYXNzaWduKHt9LHByb3BzLnN0eWxlLHBhc3NlZFRydWVQcm9wcyk7XG4gICAgICAgIGVsZW1Qcm9wcy5zdHlsZSA9IHJlcGxhY2VkU3R5bGVbc3R5bGVOYW1lXShwcm9wcy5zdHlsZSxwYXNzZWRUcnVlUHJvcHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbVByb3BzLnN0eWxlID0gaW5saW5lU3R5bGUgfHwgcmVwbGFjZWRTdHlsZVtzdHlsZU5hbWVdKCk7XG4gICAgICB9XG5cbiAgICAgIGlmKE9iamVjdC5rZXlzKGVsZW1Qcm9wcy5zdHlsZSkubGVuZ3RoID09PSAwKXtcbiAgICAgICAgIGRlbGV0ZSBlbGVtUHJvcHMuc3R5bGU7XG4gICAgICB9XG5cbiAgICAgIGlmKG9wdGlvbnMubmFtZWQpe1xuICAgICAgICBlbGVtUHJvcHMubmFtZSA9IGVsZW1Qcm9wcy5uYW1lIHx8IHN0eWxlTmFtZTtcbiAgICAgIH1cblxuICAgICAgICBlbGVtUHJvcHMuY2xhc3NOYW1lICA9IGVsZW1Qcm9wcy5jbGFzc05hbWUgfHwgXCJcIlxuICAgICAgICBpZihlbGVtUHJvcHMuY2xhc3NOYW1lICYmIHJhbmRvbUNsYXNzTmFtZSl7XG4gICAgICAgICAgZWxlbVByb3BzLmNsYXNzTmFtZSArPSBcIiBcIlxuICAgICAgICB9XG4gICAgICAgIGVsZW1Qcm9wcy5jbGFzc05hbWUgKz0gcmFuZG9tQ2xhc3NOYW1lIHx8IFwiXCJcbiAgICAgICAgaWYoXCJcIiA9PT0gZWxlbVByb3BzLmNsYXNzTmFtZSlcbiAgICAgICAgICAgIGRlbGV0ZSBlbGVtUHJvcHMuY2xhc3NOYW1lO1xuXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChlbGVtTmFtZXx8c3R5bGVOYW1lLGVsZW1Qcm9wcyxlbGVtUHJvcHMgJiYgZWxlbVByb3BzLmNoaWxkcmVuKVxuXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSAoQzIsICduYW1lJywge3ZhbHVlOiBzdHlsZU5hbWV8fGVsZW1OYW1lfSk7XG5cbiAgICAgIHJldHVybiBDMlxuXG59XG4iXX0=