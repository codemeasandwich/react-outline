"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = separateCssStyle;

//import { specialCharacters } from './index'

function separateCssStyle(styles) {

  var css = {};
  var style = {};

  for (var name in styles) {
    //if(specialCharacters.includes(name[0]) )//|| !!name.match(new RegExp(`[${specialInnerCharacters}]`, "gi")))
    //if (!/^\w+$/.test(name))
    if (!/^[a-zA-Z0-9-]+$/.test(name)) css[name] = styles[name];else style[name] = styles[name];
  }

  if (0 === Object.keys(css).length) css = null;

  if (0 === Object.keys(style).length) style = null;

  return { css: css, style: style };
}