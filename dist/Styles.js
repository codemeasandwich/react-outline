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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9TdHlsZXMuanMiXSwibmFtZXMiOlsiU3R5bGVzIiwicHJvcHMiLCJTdHlsZXNFbGVtIiwiY3JlYXRlQ2xhc3MiLCJkaXNwbGF5TmFtZSIsImdldEluaXRpYWxTdGF0ZSIsInN1YnNjcmliZSIsInNldFRpbWVvdXQiLCJzZXRTdGF0ZSIsImNzc1N0cmluZyIsImdldCIsInJlbmRlciIsInN0YXRlIiwiY3JlYXRlRWxlbWVudCIsInRvU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFNd0JBLE07O0FBTHhCOzs7O0FBQ0E7Ozs7QUFFQTs7QUFFZSxTQUFTQSxNQUFULENBQWdCQyxLQUFoQixFQUFzQjs7QUFFbkMsTUFBTUMsYUFBYSxnQkFBTUMsV0FBTixDQUFrQjtBQUNyQ0MsaUJBQWEsUUFEd0I7QUFFckNDLHFCQUFpQixTQUFTQSxlQUFULEdBQTJCO0FBQUE7O0FBQzFDO0FBQ0Esb0JBQU9DLFNBQVAsQ0FBaUI7QUFBQSxlQUFLQyxXQUFXO0FBQUEsaUJBQUksTUFBS0MsUUFBTCxDQUFjLEVBQUNDLFdBQVUsMkJBQWUsY0FBT0MsR0FBUCxFQUFmLEVBQTRCVCxLQUE1QixDQUFYLEVBQWQsQ0FBSjtBQUFBLFNBQVgsRUFBOEUsQ0FBOUUsQ0FBTDtBQUFBLE9BQWpCO0FBQ0EsYUFBTyxFQUFFUSxXQUFZLDJCQUFlLGNBQU9DLEdBQVAsRUFBZixFQUE0QlQsS0FBNUIsQ0FBZCxFQUFQO0FBQ0QsS0FOb0M7QUFPckNVLFlBQVEsU0FBU0EsTUFBVCxHQUFrQjtBQUN4QixhQUFPO0FBQUE7QUFBQTtBQUFRLGFBQUtDLEtBQUwsQ0FBV0g7QUFBbkIsT0FBUDtBQUNEO0FBVG9DLEdBQWxCLENBQW5CO0FBV0EsU0FBTyxnQkFBTUksYUFBTixDQUFvQlgsVUFBcEIsQ0FBUDtBQUNEOztBQUVERixPQUFPYyxRQUFQLEdBQWtCO0FBQUEsU0FBSSwyQkFBZSxjQUFPSixHQUFQLEVBQWYsQ0FBSjtBQUFBLENBQWxCIiwiZmlsZSI6IlN0eWxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgcHVic3ViLCBidWlsZENzc1N0cmluZyB9IGZyb20gJy4vdXRpbHMnXG5cbi8vIFRPRE86IG1ha2UgU3R5bGVzIGEgXCJyZWZcIiBhbmQgbWFudWFsIHNldCB0aGUgY29udGVudCBcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gU3R5bGVzKHByb3BzKXtcblxuICBjb25zdCBTdHlsZXNFbGVtID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBkaXNwbGF5TmFtZTogXCJTdHlsZXNcIixcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgLy8gc2V0VGltZW91dCB0byBmaXg6IFdhcm5pbmc6IHNldFN0YXRlKC4uLik6IENhbm5vdCB1cGRhdGUgZHVyaW5nIGFuIGV4aXN0aW5nIHN0YXRlIHRyYW5zaXRpb25cbiAgICBwdWJzdWIuc3Vic2NyaWJlKCgpPT4gc2V0VGltZW91dCgoKT0+dGhpcy5zZXRTdGF0ZSh7Y3NzU3RyaW5nOmJ1aWxkQ3NzU3RyaW5nKHB1YnN1Yi5nZXQoKSxwcm9wcyl9KSwgMCkgKVxuICAgIHJldHVybiB7IGNzc1N0cmluZyA6IGJ1aWxkQ3NzU3RyaW5nKHB1YnN1Yi5nZXQoKSxwcm9wcyl9O1xuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICByZXR1cm4gPHN0eWxlPnt0aGlzLnN0YXRlLmNzc1N0cmluZ308L3N0eWxlPjtcbiAgfVxufSlcbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU3R5bGVzRWxlbSlcbn1cblxuU3R5bGVzLnRvU3RyaW5nID0gKCk9PmJ1aWxkQ3NzU3RyaW5nKHB1YnN1Yi5nZXQoKSlcbiJdfQ==