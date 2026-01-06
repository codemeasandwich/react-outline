"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Styles", {
  enumerable: true,
  get: function get() {
    return _Styles["default"];
  }
});
exports["default"] = void 0;
exports.setOptions = setOptions;
exports.testing = void 0;
exports.withOptions = withOptions;
var _react = _interopRequireDefault(require("react"));
var _utils = require("./utils");
var _wrapStyles = _interopRequireDefault(require("./wrapStyles"));
var _Styles = _interopRequireDefault(require("./Styles"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var userSetOptions = {
  named: true /* prefix:getVendorPrefix()*/
};
var wrapStyles = (0, _wrapStyles["default"])(userSetOptions);

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
var testing = exports.testing = {
  resetCSS: _utils.pubsub.clear
};
var _default = exports["default"] = outline;