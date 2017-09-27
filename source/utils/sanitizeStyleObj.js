
export default function mirgeStyles(x){
              // remove all style values that are 'true'
              return Object.keys(x)
                           .reduce( (a,b) => x[b] === true ? a : Object.assign(a,{[b]:x[b]}),{})
            }