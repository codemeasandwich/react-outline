
export default function mirgeStyles(x){
              // remove all style values that are 'true'
              if(x)
              return Object.keys(x)
                           .reduce( (a,b) => {
                             const type = typeof x[b];
                             if("string" === type || "number" === type || Array.isArray(x[b]) ){
                               Object.assign(a,{[b]:x[b]});
                             }
                             return a
                           },{})
            }
