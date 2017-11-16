"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildCssString;
function buildCssString(classesValues, props) {
  var css = Object.keys(classesValues).map(function (className) {
    return classesValues[className];
  }).join(" ");
  css += props.children || "";
  css = css.replace(/\n/g, ' ').replace(/\s+/g, ' ');
  return css;
}