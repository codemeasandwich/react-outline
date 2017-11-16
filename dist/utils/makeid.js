"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeid;
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function makeid() {
  var side = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;

  var text = "";

  for (var i = 0; i < side; i++) {
    text += possible.charAt(~~(Math.random() * possible.length));
  }return text;
}