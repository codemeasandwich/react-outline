
module.exports.specialCharacters = "@: ";//['@',':'].join("");
module.exports.specialInnerCharacters = " >+~";//['@',':'].join("");



// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!! HERE BE DRAGONS
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

let modules

if(global && global.__TEST__) { // TESTING !!!

  const loader = {open:require}

  const path = loader.open('path')
  const fs = loader.open('fs')
  const paths = [];

  modules = (fileName)=> loader.open(fileName)
  modules.keys = ()=>paths;

  for (let fileName of fs.readdirSync(__dirname))
  {    paths.push("./"+fileName)  }
} else {

  // webpack magic
    modules = require.context("./", false, /\.js$/);
}

modules.keys().filter( path => "./index.js" !== path && ! path.endsWith(".test.js") && ! path.endsWith(".js.map"))
              .forEach( path => module.exports[path.match(/([^\/]+)(?=\.\w+$)/)[0]] = modules(path).default );
