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
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        var onDomEvent = this.props.onDomEvent;

        var _loop = function _loop(listen) {
          _this2.domElem.addEventListener(listen, function () {
            return onDomEvent[listen](_this2.domElem);
          });
        };

        for (var listen in onDomEvent) {
          _loop(listen);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        var _this3 = this;

        var onDomEvent = this.props.onDomEvent;

        var _loop2 = function _loop2(listen) {
          _this3.domElem.removeEventListener(listen, function () {
            return onDomEvent[listen](_this3.domElem);
          });
        };

        for (var listen in onDomEvent) {
          _loop2(listen);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this4 = this;

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

        if (props.onDomEvent) {
          elemProps.ref = function (reatElem) {
            return _this4.domElem = (0, _reactDom.findDOMNode)(reatElem);
          };
        }

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

var _reactDom = require('react-dom');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9lbGVtZW50LmpzIl0sIm5hbWVzIjpbImVsZW1OYW1lIiwiY3NzIiwic3R5bGVDU1MiLCJpbmxpbmVTdHlsZSIsInN0eWxlIiwic3R5bGVOYW1lIiwiY29sb3JzIiwicmFuZG9tQ2xhc3NOYW1lIiwib3B0aW9ucyIsInJlcGxhY2VkU3R5bGUiLCJDMiIsIm9uRG9tRXZlbnQiLCJwcm9wcyIsImxpc3RlbiIsImRvbUVsZW0iLCJhZGRFdmVudExpc3RlbmVyIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInVwZGF0ZWRDc3MiLCJPYmplY3QiLCJhc3NpZ24iLCJzZWxlY3RvclJ1bGUiLCJwdWJsaXNoIiwiZWxlbVByb3BzIiwicGFzc2VkVHJ1ZVByb3BzIiwia2V5cyIsImZpbHRlciIsIm5hbWUiLCJsZW5ndGgiLCJyZWR1Y2UiLCJzdHlsZVByb3BzIiwiaGFzT3duUHJvcGVydHkiLCJuYW1lZCIsImNsYXNzTmFtZSIsInJlZiIsInJlYXRFbGVtIiwiY3JlYXRlRWxlbWVudCIsImNoaWxkcmVuIiwiQ29tcG9uZW50IiwiZGVmaW5lUHJvcGVydHkiLCJ2YWx1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBS2UsZ0JBQThHO0FBQUEsTUFBcEdBLFFBQW9HLFFBQXBHQSxRQUFvRztBQUFBLE1BQTFGQyxHQUEwRixRQUExRkEsR0FBMEY7QUFBQSxNQUF0RkMsUUFBc0YsUUFBdEZBLFFBQXNGO0FBQUEsTUFBN0VDLFdBQTZFLFFBQTdFQSxXQUE2RTtBQUFBLE1BQWpFQyxLQUFpRSxRQUFqRUEsS0FBaUU7QUFBQSxNQUEzREMsU0FBMkQsUUFBM0RBLFNBQTJEO0FBQUEsTUFBaERDLE1BQWdELFFBQWhEQSxNQUFnRDtBQUFBLE1BQXhDQyxlQUF3QyxRQUF4Q0EsZUFBd0M7QUFBQSxNQUF2QkMsT0FBdUIsUUFBdkJBLE9BQXVCO0FBQUEsTUFBZkMsYUFBZSxRQUFmQSxhQUFlOztBQUFBLE1BRXJIQyxFQUZxSDtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFB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LCJmaWxlIjoiZWxlbWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgZmluZERPTU5vZGUgfSBmcm9tICdyZWFjdC1kb20nXG5pbXBvcnQgeyBnZW5Dc3MsIHB1YnN1YiB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHtlbGVtTmFtZSwgY3NzLHN0eWxlQ1NTLGlubGluZVN0eWxlLHN0eWxlLHN0eWxlTmFtZSwgY29sb3JzLCByYW5kb21DbGFzc05hbWUsIG9wdGlvbnMscmVwbGFjZWRTdHlsZX0pe1xuXG4gIGNsYXNzIEMyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgY29uc3Qgb25Eb21FdmVudCA9IHRoaXMucHJvcHMub25Eb21FdmVudFxuICAgICAgZm9yIChjb25zdCBsaXN0ZW4gaW4gb25Eb21FdmVudCkge1xuICAgICAgICB0aGlzLmRvbUVsZW0uYWRkRXZlbnRMaXN0ZW5lcihsaXN0ZW4sICgpPT5vbkRvbUV2ZW50W2xpc3Rlbl0odGhpcy5kb21FbGVtKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICBjb25zdCBvbkRvbUV2ZW50ID0gdGhpcy5wcm9wcy5vbkRvbUV2ZW50XG4gICAgICBmb3IgKGNvbnN0IGxpc3RlbiBpbiBvbkRvbUV2ZW50KSB7XG4gICAgICAgIHRoaXMuZG9tRWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKGxpc3RlbiwgKCk9Pm9uRG9tRXZlbnRbbGlzdGVuXSh0aGlzLmRvbUVsZW0pKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKXtcblxuICAgICAgY29uc3QgcHJvcHMgPSB0aGlzLnByb3BzXG5cbiAgICAgIGlmKFwiY3NzXCIgaW4gcHJvcHMpe1xuXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRDc3MgPSBPYmplY3QuYXNzaWduKHt9LGNzcylcblxuICAgICAgICBmb3IoY29uc3Qgc2VsZWN0b3JSdWxlIGluIHByb3BzLmNzcyl7XG4gICAgICAgICAgdXBkYXRlZENzc1tzZWxlY3RvclJ1bGVdID0gT2JqZWN0LmFzc2lnbih7fSxjc3Nbc2VsZWN0b3JSdWxlXSwgXCJmdW5jdGlvblwiID09PSB0eXBlb2YgcHJvcHMuY3NzW3NlbGVjdG9yUnVsZV0gPyBwcm9wcy5jc3Nbc2VsZWN0b3JSdWxlXSgpIDogcHJvcHMuY3NzW3NlbGVjdG9yUnVsZV0pXG4gICAgICAgIH1cbiAgICAgICAgcHVic3ViLnB1Ymxpc2gocmFuZG9tQ2xhc3NOYW1lLCBnZW5Dc3Moe3JhbmRvbUNsYXNzTmFtZSwgY3NzOnVwZGF0ZWRDc3Msc3R5bGVDU1MsIGNvbG9ycyxzdHlsZSxzdHlsZU5hbWV9KSlcbiAgICAgIH1cblxuICAgICAgY29uc3QgZWxlbVByb3BzID0gT2JqZWN0LmFzc2lnbih7fSxwcm9wcyk7XG5cbiAgICAgIGxldCBwYXNzZWRUcnVlUHJvcHMgPSBPYmplY3Qua2V5cyhwcm9wcylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCBuYW1lID0+IHByb3BzW25hbWVdID09PSB0cnVlICYmIHN0eWxlQ1NTW3N0eWxlTmFtZV0gJiYgbmFtZSBpbiBzdHlsZUNTU1tzdHlsZU5hbWVdIClcbiAgICAgIC8vICBjb25zb2xlLmxvZyhcInBhc3NlZFRydWVQcm9wc1wiLHBhc3NlZFRydWVQcm9wcylcbiAgICAgIGlmKDAgPCBwYXNzZWRUcnVlUHJvcHMubGVuZ3RoKXtcbiAgICAgICAgcGFzc2VkVHJ1ZVByb3BzID0gcGFzc2VkVHJ1ZVByb3BzLnJlZHVjZSgoc3R5bGVQcm9wcywgbmFtZSkgPT4ge1xuICAgICAgICAgIC8vIElmIGVsZW0gaXMgYSBIVE1MIHR5cGUgPSBSZW1vdmVkIGl0IFVua25vd24gcHJvcCBgLi4uYCBvbiA8Li4uPiB0YWcuIFJlbW92ZSB0aGlzIHByb3AgZnJvbSB0aGUgZWxlbWVudC5cbiAgICAgICAgICBpZihcImZ1bmN0aW9uXCIgIT09IHR5cGVvZiBlbGVtTmFtZSAmJiBcImRpc2FibGVkXCIgIT09IG5hbWUpe1xuICAgICAgICAgICAgZGVsZXRlIGVsZW1Qcm9wc1tuYW1lXVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihzdHlsZVByb3BzLHtbbmFtZV06dHJ1ZX0pXG4gICAgICAgIH0se30pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXNzZWRUcnVlUHJvcHMgPSBudWxsXG4gICAgICB9XG5cbiAgICAgIGlmKHBhc3NlZFRydWVQcm9wcyB8fCBwcm9wcy5oYXNPd25Qcm9wZXJ0eShcInN0eWxlXCIpKXtcbiAgICAgICAgLy9pZihwcm9wcy5zdHlsZSBpbnN0YW5jZW9mIE9iamVjdClcbiAgICAgICAgLy8gICAgcGFzc2VkVHJ1ZVByb3BzID0gT2JqZWN0LmFzc2lnbih7fSxwcm9wcy5zdHlsZSxwYXNzZWRUcnVlUHJvcHMpO1xuICAgICAgICBpZihyYW5kb21DbGFzc05hbWUpXG4gICAgICAgICAgICBlbGVtUHJvcHMuc3R5bGUgPSBwcm9wcy5zdHlsZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBlbGVtUHJvcHMuc3R5bGUgPSByZXBsYWNlZFN0eWxlW3N0eWxlTmFtZV0ocHJvcHMuc3R5bGUscGFzc2VkVHJ1ZVByb3BzKTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbVByb3BzLnN0eWxlID0gaW5saW5lU3R5bGUgfHwgcmVwbGFjZWRTdHlsZVtzdHlsZU5hbWVdKCk7XG4gICAgICB9XG5cbiAgICAgIGlmKE9iamVjdC5rZXlzKGVsZW1Qcm9wcy5zdHlsZSkubGVuZ3RoID09PSAwKXtcbiAgICAgICAgIGRlbGV0ZSBlbGVtUHJvcHMuc3R5bGU7XG4gICAgICB9XG5cbiAgICAgIGlmKG9wdGlvbnMubmFtZWQpe1xuICAgICAgICBlbGVtUHJvcHMubmFtZSA9IGVsZW1Qcm9wcy5uYW1lIHx8IHN0eWxlTmFtZTtcbiAgICAgIH1cblxuICAgICAgICBlbGVtUHJvcHMuY2xhc3NOYW1lICA9IGVsZW1Qcm9wcy5jbGFzc05hbWUgfHwgXCJcIlxuICAgICAgICBpZihlbGVtUHJvcHMuY2xhc3NOYW1lICYmIHJhbmRvbUNsYXNzTmFtZSl7XG4gICAgICAgICAgZWxlbVByb3BzLmNsYXNzTmFtZSArPSBcIiBcIlxuICAgICAgICB9XG4gICAgICAgIGVsZW1Qcm9wcy5jbGFzc05hbWUgKz0gcmFuZG9tQ2xhc3NOYW1lIHx8IFwiXCJcbiAgICAgICAgaWYoXCJcIiA9PT0gZWxlbVByb3BzLmNsYXNzTmFtZSlcbiAgICAgICAgICAgIGRlbGV0ZSBlbGVtUHJvcHMuY2xhc3NOYW1lO1xuXG4gICAgICAgIGlmKHByb3BzLm9uRG9tRXZlbnQpe1xuICAgICAgICAgIGVsZW1Qcm9wcy5yZWYgPSByZWF0RWxlbSA9PiB0aGlzLmRvbUVsZW0gPSBmaW5kRE9NTm9kZShyZWF0RWxlbSlcbiAgICAgICAgfVxuXG4gICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChlbGVtTmFtZXx8c3R5bGVOYW1lLGVsZW1Qcm9wcyxlbGVtUHJvcHMgJiYgZWxlbVByb3BzLmNoaWxkcmVuKVxuXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSAoQzIsICduYW1lJywge3ZhbHVlOiBzdHlsZU5hbWV8fGVsZW1OYW1lfSk7XG5cbiAgICAgIHJldHVybiBDMlxufVxuIl19