"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _react = _interopRequireDefault(require("react"));
var _reactDom = require("react-dom");
var _utils = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _default(_ref) {
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
  var C2 = /*#__PURE__*/function (_React$Component) {
    function C2() {
      _classCallCheck(this, C2);
      return _callSuper(this, C2, arguments);
    }
    _inherits(C2, _React$Component);
    return _createClass(C2, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this = this;
        var onDomEvent = this.props.onDomEvent;
        var _loop = function _loop(listen) {
          _this.domElem.addEventListener(listen, function (event) {
            return onDomEvent[listen](_this.domElem, event);
          });
        };
        for (var listen in onDomEvent) {
          _loop(listen);
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var _this2 = this;
        var onDomEvent = this.props.onDomEvent;
        var _loop2 = function _loop2(listen) {
          _this2.domElem.removeEventListener(listen, function (event) {
            return onDomEvent[listen](_this2.domElem, event);
          });
        };
        for (var listen in onDomEvent) {
          _loop2(listen);
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _this3 = this;
        var props = this.props;
        if ("css" in props) {
          var updatedCss = Object.assign({}, css);
          for (var selectorRule in props.css) {
            updatedCss[selectorRule] = Object.assign({}, css[selectorRule], "function" === typeof props.css[selectorRule] ? props.css[selectorRule]() : props.css[selectorRule]);
          }
          _utils.pubsub.publish(randomClassName, (0, _utils.genCss)({
            randomClassName: randomClassName,
            css: updatedCss,
            styleCSS: styleCSS,
            colors: colors,
            style: style,
            styleName: styleName
          }));
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
            return _this3.domElem = (0, _reactDom.findDOMNode)(reatElem);
          };
        }
        return /*#__PURE__*/_react["default"].createElement(elemName || styleName, elemProps, elemProps && elemProps.children);
      }
    }]);
  }(_react["default"].Component);
  Object.defineProperty(C2, 'name', {
    value: styleName || elemName
  });
  return C2;
}