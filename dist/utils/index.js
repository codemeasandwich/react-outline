"use strict";

module.exports.specialCharacters = "@: "; //['@',':'].join("");
module.exports.specialInnerCharacters = " >+~"; //['@',':'].join("");

// webpack magic
var modules = require.context("./", false, /\.js$/);

var pageFileNames = modules.keys().filter(function (path) {
                                return "./index.js" !== path && !path.endsWith(".test.js");
}).forEach(function (path) {
                                return module.exports[path.match(/([^\/]+)(?=\.\w+$)/)[0]] = modules(path).default;
});
//# sourceMappingURL=index.js.map