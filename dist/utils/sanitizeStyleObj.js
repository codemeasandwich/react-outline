"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = mirgeStyles;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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