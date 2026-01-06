"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = mirgeStyles;
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function mirgeStyles(x) {
  // remove all style values that are 'true'
  if (x) return Object.keys(x).reduce(function (a, b) {
    var type = _typeof(x[b]);
    if ("string" === type || "number" === type || Array.isArray(x[b])) {
      Object.assign(a, _defineProperty({}, b, x[b]));
    }
    return a;
  }, {});
}