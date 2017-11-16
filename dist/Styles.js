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