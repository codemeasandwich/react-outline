
// webpack magic
var modules = require.context("./", true, /\.js$/);

const tree = modules.keys()
                   .map(f => f.split("/").slice(1))
                   .filter( f => f.length > 1 )
                   .reduce( (tree, path)=> {
                     if( ! tree[path[0]])
                        tree[path[0]] = []
                     tree[path[0]].push(path[1])
                     return tree
                   },{})


for(const dir in tree){
console.log(dir,tree)
  const files = tree[dir];
  files.forEach( file =>{

    const path = `./${dir}/${file}`
    const x = modules(path).default;
    console.log(x)
  //  const y = import modules(path);//modules(`raw-loader!${path}?sourceMap`).default;
//    console.log(y)

  } )
}

let pageFileNames = modules.keys().filter( path => "./index.js" !== path && ! path.endsWith(".test.js") )
                                .forEach( path => module.exports[path.match(/([^\/]+)(?=\.\w+$)/)[0]] = modules(path).default );
