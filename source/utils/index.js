
module.exports.specialCharacters = "@: ";//['@',':'].join("");
module.exports.specialInnerCharacters = " >+~";//['@',':'].join("");

let modules

if(require.context){

// webpack magic
  modules = require.context("./", false, /\.js$/);

} else { // TESTING !!!

  const path = require('path')
  const fs = require('fs')
  const paths = [];

  modules = (fileName)=> require(fileName)
  modules.keys = ()=>paths;

  for (let fileName of fs.readdirSync(__dirname))
  {    paths.push("./"+fileName)  }
}

let pageFileNames = modules.keys().filter( path => "./index.js" !== path && ! path.endsWith(".test.js") )
                                .forEach( path => module.exports[path.match(/([^\/]+)(?=\.\w+$)/)[0]] = modules(path).default );
