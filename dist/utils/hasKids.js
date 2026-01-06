"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = hasKids;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function hasKids(obj) {
  for (var name in obj) {
    if ("base" !== name && "object" === _typeof(obj[name])) return true;
  }
}