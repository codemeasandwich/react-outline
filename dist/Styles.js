'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Styles;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: make Styles a "ref" and manual set the content

function Styles(props) {
  //class StylesElem extends React.Component {
  var StylesElem = _react2.default.createClass({
    displayName: "Styles",
    getInitialState: function getInitialState() {
      var _this = this;

      // setTimeout to fix: Warning: setState(...): Cannot update during an existing state transition
      _utils.pubsub.subscribe(function () {
        return setTimeout(function () {
          return _this.setState({ cssString: (0, _utils.buildCssString)(_utils.pubsub.get(), props) });
        }, 0);
      });
      return { cssString: (0, _utils.buildCssString)(_utils.pubsub.get(), props) };
    },
    render: function render() {
      return _react2.default.createElement(
        'style',
        null,
        this.state.cssString
      );
    }
  });
  return _react2.default.createElement(StylesElem);
}

Styles.toString = function () {
  return (0, _utils.buildCssString)(_utils.pubsub.get());
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9TdHlsZXMuanMiXSwibmFtZXMiOlsiU3R5bGVzIiwicHJvcHMiLCJTdHlsZXNFbGVtIiwiY3JlYXRlQ2xhc3MiLCJkaXNwbGF5TmFtZSIsImdldEluaXRpYWxTdGF0ZSIsInN1YnNjcmliZSIsInNldFRpbWVvdXQiLCJzZXRTdGF0ZSIsImNzc1N0cmluZyIsImdldCIsInJlbmRlciIsInN0YXRlIiwiY3JlYXRlRWxlbWVudCIsInRvU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFNd0JBLE07O0FBTHhCOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFZSxTQUFTQSxNQUFULENBQWdCQyxLQUFoQixFQUFzQjtBQUNyQztBQUNFLE1BQU1DLGFBQWEsZ0JBQU1DLFdBQU4sQ0FBa0I7QUFDckNDLGlCQUFhLFFBRHdCO0FBRXJDQyxxQkFBaUIsU0FBU0EsZUFBVCxHQUEyQjtBQUFBOztBQUMxQztBQUNBLG9CQUFPQyxTQUFQLENBQWlCO0FBQUEsZUFBS0MsV0FBVztBQUFBLGlCQUFJLE1BQUtDLFFBQUwsQ0FBYyxFQUFDQyxXQUFVLDJCQUFlLGNBQU9DLEdBQVAsRUFBZixFQUE0QlQsS0FBNUIsQ0FBWCxFQUFkLENBQUo7QUFBQSxTQUFYLEVBQThFLENBQTlFLENBQUw7QUFBQSxPQUFqQjtBQUNBLGFBQU8sRUFBRVEsV0FBWSwyQkFBZSxjQUFPQyxHQUFQLEVBQWYsRUFBNEJULEtBQTVCLENBQWQsRUFBUDtBQUNELEtBTm9DO0FBT3JDVSxZQUFRLFNBQVNBLE1BQVQsR0FBa0I7QUFDeEIsYUFBTztBQUFBO0FBQUE7QUFBUSxhQUFLQyxLQUFMLENBQVdIO0FBQW5CLE9BQVA7QUFDRDtBQVRvQyxHQUFsQixDQUFuQjtBQVdBLFNBQU8sZ0JBQU1JLGFBQU4sQ0FBb0JYLFVBQXBCLENBQVA7QUFDRDs7QUFFREYsT0FBT2MsUUFBUCxHQUFrQjtBQUFBLFNBQUksMkJBQWUsY0FBT0osR0FBUCxFQUFmLENBQUo7QUFBQSxDQUFsQiIsImZpbGUiOiJTdHlsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHB1YnN1YiwgYnVpbGRDc3NTdHJpbmcgfSBmcm9tICcuL3V0aWxzJ1xuXG4vLyBUT0RPOiBtYWtlIFN0eWxlcyBhIFwicmVmXCIgYW5kIG1hbnVhbCBzZXQgdGhlIGNvbnRlbnRcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3R5bGVzKHByb3BzKXtcbi8vY2xhc3MgU3R5bGVzRWxlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbnN0IFN0eWxlc0VsZW0gPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGRpc3BsYXlOYW1lOiBcIlN0eWxlc1wiLFxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICAvLyBzZXRUaW1lb3V0IHRvIGZpeDogV2FybmluZzogc2V0U3RhdGUoLi4uKTogQ2Fubm90IHVwZGF0ZSBkdXJpbmcgYW4gZXhpc3Rpbmcgc3RhdGUgdHJhbnNpdGlvblxuICAgIHB1YnN1Yi5zdWJzY3JpYmUoKCk9PiBzZXRUaW1lb3V0KCgpPT50aGlzLnNldFN0YXRlKHtjc3NTdHJpbmc6YnVpbGRDc3NTdHJpbmcocHVic3ViLmdldCgpLHByb3BzKX0pLCAwKSApXG4gICAgcmV0dXJuIHsgY3NzU3RyaW5nIDogYnVpbGRDc3NTdHJpbmcocHVic3ViLmdldCgpLHByb3BzKX07XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIHJldHVybiA8c3R5bGU+e3RoaXMuc3RhdGUuY3NzU3RyaW5nfTwvc3R5bGU+O1xuICB9XG59KVxuICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChTdHlsZXNFbGVtKVxufVxuXG5TdHlsZXMudG9TdHJpbmcgPSAoKT0+YnVpbGRDc3NTdHJpbmcocHVic3ViLmdldCgpKVxuIl19