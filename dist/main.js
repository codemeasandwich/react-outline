'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testing = exports.Styles = exports.setOptions = exports.withOptions = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _wrapStyles = require('./wrapStyles');

var _wrapStyles2 = _interopRequireDefault(_wrapStyles);

var _Styles = require('./Styles');

var _Styles2 = _interopRequireDefault(_Styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userSetOptions = { named: true /* prefix:getVendorPrefix()*/ };

var wrapStyles = (0, _wrapStyles2.default)(userSetOptions);

//=====================================================
//============================= top Level - Wrap Styles
//=====================================================

function outline(_styles) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return sanitizeOutline((0, _utils.sanitizeOutlineInput)(_styles, options), options);
}

function sanitizeOutline(_styles, options) {

  var wrappedStyles = wrapStyles(_styles, options);
  wrappedStyles.colors = wrappedStyles.colors || options && options.colors || userSetOptions && userSetOptions.colors;
  return wrappedStyles;
}

//=====================================================
//============================================= Options
//=====================================================

function withOptions(options) {
  if (!options) throw new Error("Bad options values for react-outline:" + JSON.stringify(options));

  var tempOutlineFn = function tempOutlineFn(_styles, optionsOrLogic) {
    return sanitizeOutline((0, _utils.sanitizeOutlineInput)(_styles, optionsOrLogic), options);
  };
  if (options.colors) {
    tempOutlineFn.colors = options.colors;
  }
  return tempOutlineFn;
}

function setOptions(options) {
  if (!options) throw new Error("Bad options values for react-outline:" + JSON.stringify(options));
  if (options.colors) {
    outline.colors = options.colors;
  }
  Object.assign(userSetOptions, options);
}

var testing = {
  resetCSS: _utils.pubsub.clear
};

exports.default = outline;
exports.withOptions = withOptions;
exports.setOptions = setOptions;
exports.Styles = _Styles2.default;
exports.testing = testing;