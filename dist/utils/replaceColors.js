"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
function _default(colors, style) {
  if (!colors) return style;
  var result = Object.assign({}, style);
  for (var key in result) {
    if (result[key] in colors) {
      result[key] = colors[result[key]];
    }
  }
  return result;
}