'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = genStyles;

var _inlineStylePrefixer = require('inline-style-prefixer');

var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);

var _replacedStyleFn = require('./replacedStyleFn');

var _replacedStyleFn2 = _interopRequireDefault(_replacedStyleFn);

var _replaceColors = require('./replaceColors');

var _replaceColors2 = _interopRequireDefault(_replaceColors);

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixer = new _inlineStylePrefixer2.default();

function genStyles(styleStuff, args, colors) {
  var userResult = (0, _replacedStyleFn2.default)(styleStuff, args);

  var swapedColor = (0, _replaceColors2.default)(colors, userResult);
  for (var name in swapedColor) {
    //if(!specialCharacters.includes(name[0]))
    swapedColor[name] = prefixer.prefix({ a: swapedColor[name] }).a;
  }

  return swapedColor;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS91dGlscy9nZW5TdHlsZXMuanMiXSwibmFtZXMiOlsiZ2VuU3R5bGVzIiwicHJlZml4ZXIiLCJzdHlsZVN0dWZmIiwiYXJncyIsImNvbG9ycyIsInVzZXJSZXN1bHQiLCJzd2FwZWRDb2xvciIsIm5hbWUiLCJwcmVmaXgiLCJhIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFRd0JBLFM7O0FBUnhCOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUEsSUFBTUMsV0FBVyxtQ0FBakI7O0FBRWUsU0FBU0QsU0FBVCxDQUFtQkUsVUFBbkIsRUFBK0JDLElBQS9CLEVBQW9DQyxNQUFwQyxFQUEyQztBQUN4RCxNQUFNQyxhQUFhLCtCQUFnQkgsVUFBaEIsRUFBMkJDLElBQTNCLENBQW5COztBQUVBLE1BQU1HLGNBQWMsNkJBQWNGLE1BQWQsRUFBcUJDLFVBQXJCLENBQXBCO0FBQ0EsT0FBSSxJQUFNRSxJQUFWLElBQWtCRCxXQUFsQixFQUE4QjtBQUM1QjtBQUNBQSxnQkFBWUMsSUFBWixJQUFvQk4sU0FBU08sTUFBVCxDQUFnQixFQUFDQyxHQUFFSCxZQUFZQyxJQUFaLENBQUgsRUFBaEIsRUFBdUNFLENBQTNEO0FBQ0Q7O0FBRUQsU0FBT0gsV0FBUDtBQUNEIiwiZmlsZSI6ImdlblN0eWxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcmVmaXhlciBmcm9tICdpbmxpbmUtc3R5bGUtcHJlZml4ZXInXG5cbmltcG9ydCByZXBsYWNlZFN0eWxlRm4gZnJvbSAnLi9yZXBsYWNlZFN0eWxlRm4nXG5pbXBvcnQgcmVwbGFjZUNvbG9ycyBmcm9tICcuL3JlcGxhY2VDb2xvcnMnXG5pbXBvcnQge3NwZWNpYWxDaGFyYWN0ZXJzfSBmcm9tICcuL2luZGV4J1xuXG5jb25zdCBwcmVmaXhlciA9IG5ldyBQcmVmaXhlcigpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZW5TdHlsZXMoc3R5bGVTdHVmZiwgYXJncyxjb2xvcnMpe1xuICBjb25zdCB1c2VyUmVzdWx0ID0gcmVwbGFjZWRTdHlsZUZuKHN0eWxlU3R1ZmYsYXJncyk7XG5cbiAgY29uc3Qgc3dhcGVkQ29sb3IgPSByZXBsYWNlQ29sb3JzKGNvbG9ycyx1c2VyUmVzdWx0KTtcbiAgZm9yKGNvbnN0IG5hbWUgaW4gc3dhcGVkQ29sb3Ipe1xuICAgIC8vaWYoIXNwZWNpYWxDaGFyYWN0ZXJzLmluY2x1ZGVzKG5hbWVbMF0pKVxuICAgIHN3YXBlZENvbG9yW25hbWVdID0gcHJlZml4ZXIucHJlZml4KHthOnN3YXBlZENvbG9yW25hbWVdfSkuYTtcbiAgfVxuXG4gIHJldHVybiBzd2FwZWRDb2xvcjtcbn1cbiJdfQ==