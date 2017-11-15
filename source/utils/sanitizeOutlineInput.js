//+++++++++++++++++++++++++++++ { base:{}, foo: ()=> }
//++++++++++++++++++++++++++++++++++++++++++++++++++++
export default function sanitizeOutlineInput(_styles,options={}){

    if("object" !== typeof _styles){
      throw new Error("Bad style values: "+JSON.stringify(_styles))
    }

//+++++++++++++++++++++++++++++++++++++++ [ base, fn ]
//++++++++++++++++++++++++++++++++++++++++++++++++++++
    if(Array.isArray(_styles)){

        _styles = Object.assign({},{base:_styles[0]},_styles[1])

    } else if(!("base" in _styles)) {

      const base = {}, fns = {};

//++++++++++++++ { table: {}, header:{} }, fn:{ ()=> }
//++++++++++++++++++++++++++++++++++++++++++++++++++++

      let optionsIsFns = true;

      for(const prop in options){
          if(options.hasOwnProperty(prop) && "function" !== typeof options[prop]){
            optionsIsFns = false;
          }
      }

      if(optionsIsFns){
        Object.assign(fns,options)
      }

      for(const prop in _styles){
//+++++++++++++++++++++++++++ { table: {}, header:{} }
//++++++++++++++++++++++++++++++++++++++++++++++++++++
          if("object" === typeof _styles[prop]){
            base[prop] = _styles[prop]
//++++++++++++++++++++++++++++++++++++++ { foo: ()=> }
//++++++++++++++++++++++++++++++++++++++++++++++++++++
          } else if("function" === typeof _styles[prop]){
            fns[prop] = _styles[prop]
          } else {
            throw new Error("Bad style value: "+JSON.stringify(_styles[prop]))
          }
      }
      _styles = Object.assign({},{base},fns);
    }

    // apply sharing
    for(const prop in _styles.base){
      if(0 < prop.indexOf(',')){
        prop.split(',')
        .map(x=>x.trim())
        .forEach( x => {
          const root = _styles.base;
          var val = Object.assign({}, root[prop],
            // we need to check if x exists in root style.
            // e.g. "foo , bar" (cross cutting style) is in style Object
            // but "foo" & "bar" are functions
            root[x] && root[x].base ? root[x].base : root[x]);

        root[x] && root[x].base ? root[x].base = val : root[x] = val

        } )
        delete _styles.base[prop]
      }
    }


    return _styles;
}
