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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9lbGVtZW50LmpzIl0sIm5hbWVzIjpbImVsZW1OYW1lIiwiY3NzIiwic3R5bGVDU1MiLCJpbmxpbmVTdHlsZSIsInN0eWxlIiwic3R5bGVOYW1lIiwiY29sb3JzIiwicmFuZG9tQ2xhc3NOYW1lIiwib3B0aW9ucyIsInJlcGxhY2VkU3R5bGUiLCJDMiIsInByb3BzIiwidXBkYXRlZENzcyIsIk9iamVjdCIsImFzc2lnbiIsInNlbGVjdG9yUnVsZSIsInB1Ymxpc2giLCJlbGVtUHJvcHMiLCJwYXNzZWRUcnVlUHJvcHMiLCJrZXlzIiwiZmlsdGVyIiwibmFtZSIsImxlbmd0aCIsInJlZHVjZSIsInN0eWxlUHJvcHMiLCJoYXNPd25Qcm9wZXJ0eSIsIm5hbWVkIiwiY2xhc3NOYW1lIiwiY3JlYXRlRWxlbWVudCIsImNoaWxkcmVuIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztrQkFLZSxnQkFBOEc7QUFBQSxNQUFwR0EsUUFBb0csUUFBcEdBLFFBQW9HO0FBQUEsTUFBMUZDLEdBQTBGLFFBQTFGQSxHQUEwRjtBQUFBLE1BQXRGQyxRQUFzRixRQUF0RkEsUUFBc0Y7QUFBQSxNQUE3RUMsV0FBNkUsUUFBN0VBLFdBQTZFO0FBQUEsTUFBakVDLEtBQWlFLFFBQWpFQSxLQUFpRTtBQUFBLE1BQTNEQyxTQUEyRCxRQUEzREEsU0FBMkQ7QUFBQSxNQUFoREMsTUFBZ0QsUUFBaERBLE1BQWdEO0FBQUEsTUFBeENDLGVBQXdDLFFBQXhDQSxlQUF3QztBQUFBLE1BQXZCQyxPQUF1QixRQUF2QkEsT0FBdUI7QUFBQSxNQUFmQyxhQUFlLFFBQWZBLGFBQWU7O0FBQUEsTUFHckhDLEVBSHFIO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSwrQkFJakg7O0FBRVYsWUFBTUMsUUFBUSxLQUFLQSxLQUFuQjs7QUFFSSxZQUFHLFNBQVNBLEtBQVosRUFBa0I7O0FBRWhCLGNBQU1DLGFBQWFDLE9BQU9DLE1BQVAsQ0FB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Y3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBnZW5Dc3MsIHB1YnN1YiB9IGZyb20gJy4vdXRpbHMnXG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oe2VsZW1OYW1lLCBjc3Msc3R5bGVDU1MsaW5saW5lU3R5bGUsc3R5bGUsc3R5bGVOYW1lLCBjb2xvcnMsIHJhbmRvbUNsYXNzTmFtZSwgb3B0aW9ucyxyZXBsYWNlZFN0eWxlfSl7XG5cblxuICBjbGFzcyBDMiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCl7XG5cbiAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BzXG5cbiAgICAgIGlmKFwiY3NzXCIgaW4gcHJvcHMpe1xuXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRDc3MgPSBPYmplY3QuYXNzaWduKHt9LGNzcylcblxuICAgICAgICBmb3IoY29uc3Qgc2VsZWN0b3JSdWxlIGluIHByb3BzLmNzcyl7XG4gICAgICAgICAgdXBkYXRlZENzc1tzZWxlY3RvclJ1bGVdID0gT2JqZWN0LmFzc2lnbih7fSxjc3Nbc2VsZWN0b3JSdWxlXSwgXCJmdW5jdGlvblwiID09PSB0eXBlb2YgcHJvcHMuY3NzW3NlbGVjdG9yUnVsZV0gPyBwcm9wcy5jc3Nbc2VsZWN0b3JSdWxlXSgpIDogcHJvcHMuY3NzW3NlbGVjdG9yUnVsZV0pXG4gICAgICAgIH1cbiAgICAgICAgcHVic3ViLnB1Ymxpc2gocmFuZG9tQ2xhc3NOYW1lLCBnZW5Dc3Moe3JhbmRvbUNsYXNzTmFtZSwgY3NzOnVwZGF0ZWRDc3Msc3R5bGVDU1MsIGNvbG9ycyxzdHlsZSxzdHlsZU5hbWV9KSlcbiAgICAgIH1cblxuICAgICAgY29uc3QgZWxlbVByb3BzID0gT2JqZWN0LmFzc2lnbih7fSxwcm9wcyk7XG5cbiAgICBsZXQgcGFzc2VkVHJ1ZVByb3BzID0gT2JqZWN0LmtleXMocHJvcHMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoIG5hbWUgPT4gcHJvcHNbbmFtZV0gPT09IHRydWUgJiYgc3R5bGVDU1Nbc3R5bGVOYW1lXSAmJiBuYW1lIGluIHN0eWxlQ1NTW3N0eWxlTmFtZV0gKVxuICAgIC8vICBjb25zb2xlLmxvZyhcInBhc3NlZFRydWVQcm9wc1wiLHBhc3NlZFRydWVQcm9wcylcbiAgICBpZigwIDwgcGFzc2VkVHJ1ZVByb3BzLmxlbmd0aCl7XG4gICAgICBwYXNzZWRUcnVlUHJvcHMgPSBwYXNzZWRUcnVlUHJvcHMucmVkdWNlKChzdHlsZVByb3BzLCBuYW1lKSA9PiB7XG4gICAgICAgIC8vIElmIGVsZW0gaXMgYSBIVE1MIHR5cGUgPSBSZW1vdmVkIGl0IFVua25vd24gcHJvcCBgLi4uYCBvbiA8Li4uPiB0YWcuIFJlbW92ZSB0aGlzIHByb3AgZnJvbSB0aGUgZWxlbWVudC5cbiAgICAgICAgaWYoXCJmdW5jdGlvblwiICE9PSB0eXBlb2YgZWxlbU5hbWUgJiYgXCJkaXNhYmxlZFwiICE9PSBuYW1lKXtcbiAgICAgICAgICBkZWxldGUgZWxlbVByb3BzW25hbWVdXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oc3R5bGVQcm9wcyx7W25hbWVdOnRydWV9KVxuICAgICAgfSx7fSlcbiAgICB9IGVsc2Uge1xuICAgICAgcGFzc2VkVHJ1ZVByb3BzID0gbnVsbFxuICAgIH1cbiAgICAgIGlmKHBhc3NlZFRydWVQcm9wcyB8fCBwcm9wcy5oYXNPd25Qcm9wZXJ0eShcInN0eWxlXCIpKXtcbiAgICAgICAgLy9pZihwcm9wcy5zdHlsZSBpbnN0YW5jZW9mIE9iamVjdClcbiAgICAgICAgLy8gICAgcGFzc2VkVHJ1ZVByb3BzID0gT2JqZWN0LmFzc2lnbih7fSxwcm9wcy5zdHlsZSxwYXNzZWRUcnVlUHJvcHMpO1xuICAgICAgICBlbGVtUHJvcHMuc3R5bGUgPSByZXBsYWNlZFN0eWxlW3N0eWxlTmFtZV0ocHJvcHMuc3R5bGUscGFzc2VkVHJ1ZVByb3BzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1Qcm9wcy5zdHlsZSA9IGlubGluZVN0eWxlIHx8IHJlcGxhY2VkU3R5bGVbc3R5bGVOYW1lXSgpO1xuICAgICAgfVxuXG4gICAgICBpZihPYmplY3Qua2V5cyhlbGVtUHJvcHMuc3R5bGUpLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgICBkZWxldGUgZWxlbVByb3BzLnN0eWxlO1xuICAgICAgfVxuXG4gICAgICBpZihvcHRpb25zLm5hbWVkKXtcbiAgICAgICAgZWxlbVByb3BzLm5hbWUgPSBlbGVtUHJvcHMubmFtZSB8fCBzdHlsZU5hbWU7XG4gICAgICB9XG5cbiAgICAgICAgZWxlbVByb3BzLmNsYXNzTmFtZSAgPSBlbGVtUHJvcHMuY2xhc3NOYW1lIHx8IFwiXCJcbiAgICAgICAgaWYoZWxlbVByb3BzLmNsYXNzTmFtZSAmJiByYW5kb21DbGFzc05hbWUpe1xuICAgICAgICAgIGVsZW1Qcm9wcy5jbGFzc05hbWUgKz0gXCIgXCJcbiAgICAgICAgfVxuICAgICAgICBlbGVtUHJvcHMuY2xhc3NOYW1lICs9IHJhbmRvbUNsYXNzTmFtZSB8fCBcIlwiXG4gICAgICAgIGlmKFwiXCIgPT09IGVsZW1Qcm9wcy5jbGFzc05hbWUpXG4gICAgICAgICAgICBkZWxldGUgZWxlbVByb3BzLmNsYXNzTmFtZTtcblxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoZWxlbU5hbWV8fHN0eWxlTmFtZSxlbGVtUHJvcHMsZWxlbVByb3BzICYmIGVsZW1Qcm9wcy5jaGlsZHJlbilcblxuXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cblxucmV0dXJuIEMyXG5cblxufVxuIl19