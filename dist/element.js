'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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


  return function (props) {

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
  };
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9lbGVtZW50LmpzIl0sIm5hbWVzIjpbImVsZW1OYW1lIiwiY3NzIiwic3R5bGVDU1MiLCJpbmxpbmVTdHlsZSIsInN0eWxlIiwic3R5bGVOYW1lIiwiY29sb3JzIiwicmFuZG9tQ2xhc3NOYW1lIiwib3B0aW9ucyIsInJlcGxhY2VkU3R5bGUiLCJwcm9wcyIsInVwZGF0ZWRDc3MiLCJPYmplY3QiLCJhc3NpZ24iLCJzZWxlY3RvclJ1bGUiLCJwdWJsaXNoIiwiZWxlbVByb3BzIiwicGFzc2VkVHJ1ZVByb3BzIiwia2V5cyIsImZpbHRlciIsIm5hbWUiLCJsZW5ndGgiLCJyZWR1Y2UiLCJzdHlsZVByb3BzIiwiaGFzT3duUHJvcGVydHkiLCJuYW1lZCIsImNsYXNzTmFtZSIsImNyZWF0ZUVsZW1lbnQiLCJjaGlsZHJlbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O2tCQUllLGdCQUE4RztBQUFBLE1BQXBHQSxRQUFvRyxRQUFwR0EsUUFBb0c7QUFBQSxNQUExRkMsR0FBMEYsUUFBMUZBLEdBQTBGO0FBQUEsTUFBdEZDLFFBQXNGLFFBQXRGQSxRQUFzRjtBQUFBLE1BQTdFQyxXQUE2RSxRQUE3RUEsV0FBNkU7QUFBQSxNQUFqRUMsS0FBaUUsUUFBakVBLEtBQWlFO0FBQUEsTUFBM0RDLFNBQTJELFFBQTNEQSxTQUEyRDtBQUFBLE1BQWhEQyxNQUFnRCxRQUFoREEsTUFBZ0Q7QUFBQSxNQUF4Q0MsZUFBd0MsUUFBeENBLGVBQXdDO0FBQUEsTUFBdkJDLE9BQXVCLFFBQXZCQSxPQUF1QjtBQUFBLE1BQWZDLGFBQWUsUUFBZkEsYUFBZTs7O0FBRTNILFNBQU8saUJBQVM7O0FBRVosUUFBRyxTQUFTQyxLQUFaLEVBQWtCOztBQUVoQixVQUFNQyxhQUFhQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFpQlosR0FBakIsQ0FBbkI7O0FBRUEsV0FBSSxJQUFNYSxZQUFWLElBQTBCSixNQUFNVCxHQUFoQyxFQUFvQztBQUNsQ1UsbUJBQVdHLFlBQVgsSUFBMkJGLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWlCWixJQUFJYSxZQUFKLENBQWpCLEVBQW9DLGVBQWUsT0FBT0osTUFBTVQsR0FBTixDQUFVYSxZQUFWLENBQXRCLEdBQWdESixNQUFNVCxHQUFOLENBQVVhLFlBQVYsR0FBaEQsR0FBNEVKLE1BQU1ULEdBQU4sQ0FBVWEsWUFBVixDQUFoSCxDQUEzQjtBQUNEO0FBQ0Qsb0JBQU9DLE9BQVAsQ0FBZVIsZUFBZixFQUFnQyxtQkFBTyxFQUFDQSxnQ0FBRCxFQUFrQk4sS0FBSVUsVUFBdEIsRUFBaUNULGtCQUFqQyxFQUEyQ0ksY0FBM0MsRUFBa0RGLFlBQWxELEVBQXdEQyxvQkFBeEQsRUFBUCxDQUFoQztBQUNEOztBQUVELFFBQU1XLFlBQVlKLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWlCSCxLQUFqQixDQUFsQjs7QUFFRixRQUFJTyxrQkFBa0JMLE9BQU9NLElBQVAsQ0FBWVIsS0FBWixFQUNPUyxNQURQLENBQ2U7QUFBQSxhQUFRVCxNQUFNVSxJQUFOLE1BQWdCLElBQWhCLElBQXdCbEIsU0FBU0csU0FBVCxDQUF4QixJQUErQ2UsUUFBUWxCLFNBQVNHLFNBQVQsQ0FBL0Q7QUFBQSxLQURmLENBQXRCO0FBRUE7QUFDQSxRQUFHLElBQUlZLGdCQUFnQkksTUFBdkIsRUFBOEI7QUFDNUJKLHdCQUFrQkEsZ0JBQWdCSyxNQUFoQixDQUF1QixVQUFDQyxVQUFELEVBQWFILElBQWIsRUFBc0I7QUFDN0Q7QUFDQSxZQUFHLGVBQWUsT0FBT3BCLFFBQXRCLElBQWtDLGVBQWVvQixJQUFwRCxFQUF5RDtBQUN2RCxpQkFBT0osVUFBVUksSUFBVixDQUFQO0FBQ0Q7QUFDRCxlQUFPUixPQUFPQyxNQUFQLENBQWNVLFVBQWQsc0JBQTJCSCxJQUEzQixFQUFpQyxJQUFqQyxFQUFQO0FBQ0QsT0FOaUIsRUFNaEIsRUFOZ0IsQ0FBbEI7QUFPRCxLQVJELE1BUU87QUFDTEgsd0JBQWtCLElBQWxCO0FBQ0Q7QUFDQyxRQUFHQSxtQkFBbUJQLE1BQU1jLGNBQU4sQ0FBcUIsT0FBckIsQ0FBdEIsRUFBb0Q7QUFDbEQ7QUFDQTtBQUNBUixnQkFBVVosS0FBVixHQUFrQkssY0FBY0osU0FBZCxFQUF5QkssTUFBTU4sS0FBL0IsRUFBcUNhLGVBQXJDLENBQWxCO0FBQ0QsS0FKRCxNQUlPO0FBQ0xELGdCQUFVWixLQUFWLEdBQWtCRCxlQUFlTSxjQUFjSixTQUFkLEdBQWpDO0FBQ0Q7O0FBRUQsUUFBR08sT0FBT00sSUFBUCxDQUFZRixVQUFVWixLQUF0QixFQUE2QmlCLE1BQTdCLEtBQXdDLENBQTNDLEVBQTZDO0FBQzFDLGFBQU9MLFVBQVVaLEtBQWpCO0FBQ0Y7O0FBRUQsUUFBR0ksUUFBUWlCLEtBQVgsRUFBaUI7QUFDZlQsZ0JBQVVJLElBQVYsR0FBaUJKLFVBQVVJLElBQVYsSUFBa0JmLFNBQW5DO0FBQ0Q7O0FBRUNXLGNBQVVVLFNBQVYsR0FBdUJWLFVBQVVVLFNBQVYsSUFBdUIsRUFBOUM7QUFDQSxRQUFHVixVQUFVVSxTQUFWLElBQXVCbkIsZUFBMUIsRUFBMEM7QUFDeENTLGdCQUFVVSxTQUFWLElBQXVCLEdBQXZCO0FBQ0Q7QUFDRFYsY0FBVVUsU0FBVixJQUF1Qm5CLG1CQUFtQixFQUExQztBQUNBLFFBQUcsT0FBT1MsVUFBVVUsU0FBcEIsRUFDSSxPQUFPVixVQUFVVSxTQUFqQjs7QUFFTixXQUFPLGdCQUFNQyxhQUFOLENBQW9CM0IsWUFBVUssU0FBOUIsRUFBd0NXLFNBQXhDLEVBQWtEQSxhQUFhQSxVQUFVWSxRQUF6RSxDQUFQO0FBQ0gsR0FyREQ7QUFzREQsQzs7QUEzREQ7Ozs7QUFDQSIsImZpbGUiOiJlbGVtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBnZW5Dc3MsIHB1YnN1YiB9IGZyb20gJy4vdXRpbHMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHtlbGVtTmFtZSwgY3NzLHN0eWxlQ1NTLGlubGluZVN0eWxlLHN0eWxlLHN0eWxlTmFtZSwgY29sb3JzLCByYW5kb21DbGFzc05hbWUsIG9wdGlvbnMscmVwbGFjZWRTdHlsZX0pe1xuXG4gIHJldHVybiBwcm9wcyA9PiB7XG5cbiAgICAgIGlmKFwiY3NzXCIgaW4gcHJvcHMpe1xuXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRDc3MgPSBPYmplY3QuYXNzaWduKHt9LGNzcylcblxuICAgICAgICBmb3IoY29uc3Qgc2VsZWN0b3JSdWxlIGluIHByb3BzLmNzcyl7XG4gICAgICAgICAgdXBkYXRlZENzc1tzZWxlY3RvclJ1bGVdID0gT2JqZWN0LmFzc2lnbih7fSxjc3Nbc2VsZWN0b3JSdWxlXSwgXCJmdW5jdGlvblwiID09PSB0eXBlb2YgcHJvcHMuY3NzW3NlbGVjdG9yUnVsZV0gPyBwcm9wcy5jc3Nbc2VsZWN0b3JSdWxlXSgpIDogcHJvcHMuY3NzW3NlbGVjdG9yUnVsZV0pXG4gICAgICAgIH1cbiAgICAgICAgcHVic3ViLnB1Ymxpc2gocmFuZG9tQ2xhc3NOYW1lLCBnZW5Dc3Moe3JhbmRvbUNsYXNzTmFtZSwgY3NzOnVwZGF0ZWRDc3Msc3R5bGVDU1MsIGNvbG9ycyxzdHlsZSxzdHlsZU5hbWV9KSlcbiAgICAgIH1cblxuICAgICAgY29uc3QgZWxlbVByb3BzID0gT2JqZWN0LmFzc2lnbih7fSxwcm9wcyk7XG5cbiAgICBsZXQgcGFzc2VkVHJ1ZVByb3BzID0gT2JqZWN0LmtleXMocHJvcHMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoIG5hbWUgPT4gcHJvcHNbbmFtZV0gPT09IHRydWUgJiYgc3R5bGVDU1Nbc3R5bGVOYW1lXSAmJiBuYW1lIGluIHN0eWxlQ1NTW3N0eWxlTmFtZV0gKVxuICAgIC8vICBjb25zb2xlLmxvZyhcInBhc3NlZFRydWVQcm9wc1wiLHBhc3NlZFRydWVQcm9wcylcbiAgICBpZigwIDwgcGFzc2VkVHJ1ZVByb3BzLmxlbmd0aCl7XG4gICAgICBwYXNzZWRUcnVlUHJvcHMgPSBwYXNzZWRUcnVlUHJvcHMucmVkdWNlKChzdHlsZVByb3BzLCBuYW1lKSA9PiB7XG4gICAgICAgIC8vIElmIGVsZW0gaXMgYSBIVE1MIHR5cGUgPSBSZW1vdmVkIGl0IFVua25vd24gcHJvcCBgLi4uYCBvbiA8Li4uPiB0YWcuIFJlbW92ZSB0aGlzIHByb3AgZnJvbSB0aGUgZWxlbWVudC5cbiAgICAgICAgaWYoXCJmdW5jdGlvblwiICE9PSB0eXBlb2YgZWxlbU5hbWUgJiYgXCJkaXNhYmxlZFwiICE9PSBuYW1lKXtcbiAgICAgICAgICBkZWxldGUgZWxlbVByb3BzW25hbWVdXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oc3R5bGVQcm9wcyx7W25hbWVdOnRydWV9KVxuICAgICAgfSx7fSlcbiAgICB9IGVsc2Uge1xuICAgICAgcGFzc2VkVHJ1ZVByb3BzID0gbnVsbFxuICAgIH1cbiAgICAgIGlmKHBhc3NlZFRydWVQcm9wcyB8fCBwcm9wcy5oYXNPd25Qcm9wZXJ0eShcInN0eWxlXCIpKXtcbiAgICAgICAgLy9pZihwcm9wcy5zdHlsZSBpbnN0YW5jZW9mIE9iamVjdClcbiAgICAgICAgLy8gICAgcGFzc2VkVHJ1ZVByb3BzID0gT2JqZWN0LmFzc2lnbih7fSxwcm9wcy5zdHlsZSxwYXNzZWRUcnVlUHJvcHMpO1xuICAgICAgICBlbGVtUHJvcHMuc3R5bGUgPSByZXBsYWNlZFN0eWxlW3N0eWxlTmFtZV0ocHJvcHMuc3R5bGUscGFzc2VkVHJ1ZVByb3BzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1Qcm9wcy5zdHlsZSA9IGlubGluZVN0eWxlIHx8IHJlcGxhY2VkU3R5bGVbc3R5bGVOYW1lXSgpO1xuICAgICAgfVxuXG4gICAgICBpZihPYmplY3Qua2V5cyhlbGVtUHJvcHMuc3R5bGUpLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgICBkZWxldGUgZWxlbVByb3BzLnN0eWxlO1xuICAgICAgfVxuXG4gICAgICBpZihvcHRpb25zLm5hbWVkKXtcbiAgICAgICAgZWxlbVByb3BzLm5hbWUgPSBlbGVtUHJvcHMubmFtZSB8fCBzdHlsZU5hbWU7XG4gICAgICB9XG5cbiAgICAgICAgZWxlbVByb3BzLmNsYXNzTmFtZSAgPSBlbGVtUHJvcHMuY2xhc3NOYW1lIHx8IFwiXCJcbiAgICAgICAgaWYoZWxlbVByb3BzLmNsYXNzTmFtZSAmJiByYW5kb21DbGFzc05hbWUpe1xuICAgICAgICAgIGVsZW1Qcm9wcy5jbGFzc05hbWUgKz0gXCIgXCJcbiAgICAgICAgfVxuICAgICAgICBlbGVtUHJvcHMuY2xhc3NOYW1lICs9IHJhbmRvbUNsYXNzTmFtZSB8fCBcIlwiXG4gICAgICAgIGlmKFwiXCIgPT09IGVsZW1Qcm9wcy5jbGFzc05hbWUpXG4gICAgICAgICAgICBkZWxldGUgZWxlbVByb3BzLmNsYXNzTmFtZTtcblxuICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoZWxlbU5hbWV8fHN0eWxlTmFtZSxlbGVtUHJvcHMsZWxlbVByb3BzICYmIGVsZW1Qcm9wcy5jaGlsZHJlbilcbiAgfVxufVxuIl19