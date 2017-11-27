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
          _this2.domElem.addEventListener(listen, function (event) {
            return onDomEvent[listen](_this2.domElem, event);
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
          _this3.domElem.removeEventListener(listen, function (event) {
            return onDomEvent[listen](_this3.domElem, event);
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
        //TODO: write a test for this
        // For some reason in prod!
        // a custom element in a perfect storm can have style undefined
        //SEE: test - should generated an element with css selector
        // thss is the same prod code.. BUT this is not catching this case :(
        if (elemProps.style && Object.keys(elemProps.style).length === 0) {
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