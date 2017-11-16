"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = sanitizeOutlineInput;
//+++++++++++++++++++++++++++++ { base:{}, foo: ()=> }
//++++++++++++++++++++++++++++++++++++++++++++++++++++
function sanitizeOutlineInput(_styles) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};


  if ("object" !== (typeof _styles === "undefined" ? "undefined" : _typeof(_styles))) {
    throw new Error("Bad style values: " + JSON.stringify(_styles));
  }

  //+++++++++++++++++++++++++++++++++++++++ [ base, fn ]
  //++++++++++++++++++++++++++++++++++++++++++++++++++++
  if (Array.isArray(_styles)) {

    _styles = Object.assign({}, { base: _styles[0] }, _styles[1]);
  } else if (!("base" in _styles)) {

    var base = {},
        fns = {};

    //++++++++++++++ { table: {}, header:{} }, fn:{ ()=> }
    //++++++++++++++++++++++++++++++++++++++++++++++++++++

    var optionsIsFns = true;

    for (var prop in options) {
      if (options.hasOwnProperty(prop) && "function" !== typeof options[prop]) {
        optionsIsFns = false;
      }
    }

    if (optionsIsFns) {
      Object.assign(fns, options);
    }

    for (var _prop in _styles) {
      //+++++++++++++++++++++++++++ { table: {}, header:{} }
      //++++++++++++++++++++++++++++++++++++++++++++++++++++
      if ("object" === _typeof(_styles[_prop])) {
        base[_prop] = _styles[_prop];
        //++++++++++++++++++++++++++++++++++++++ { foo: ()=> }
        //++++++++++++++++++++++++++++++++++++++++++++++++++++
      } else if ("function" === typeof _styles[_prop]) {
        fns[_prop] = _styles[_prop];
      } else {
        throw new Error("Bad style value: " + JSON.stringify(_styles[_prop]));
      }
    }
    _styles = Object.assign({}, { base: base }, fns);
  }

  // apply sharing

  var _loop = function _loop(_prop2) {
    if (0 < _prop2.indexOf(',')) {
      _prop2.split(',').map(function (x) {
        return x.trim();
      }).forEach(function (x) {
        var root = _styles.base;
        var val = Object.assign({}, root[_prop2],
        // we need to check if x exists in root style.
        // e.g. "foo , bar" (cross cutting style) is in style Object
        // but "foo" & "bar" are functions
        root[x] && root[x].base ? root[x].base : root[x]);

        root[x] && root[x].base ? root[x].base = val : root[x] = val;
      });
      delete _styles.base[_prop2];
    }
  };

  for (var _prop2 in _styles.base) {
    _loop(_prop2);
  }

  return _styles;
}