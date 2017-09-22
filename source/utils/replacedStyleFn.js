
export default function replacedStyleFn({styleCSS,styleFn/*,radium*/},args){

  const processedStyles = 1=== styleFn.length ? styleFn(args[0]) : styleFn(styleCSS,args[0]);

// const styleAsPropObj = 0===styleFn.length && "object" === typeof args[0] ? args[0] : {};
// const styleBase = Object.assign({},styleCSS && styleCSS.base||styleCSS||{},styleAsPropObj)
   const styleBase = Object.assign({},styleCSS && styleCSS.base||styleCSS||{})
/*
  for(const stylePropName in styleBase){
    if(specialCharacters.includes(stylePropName[0]))
    delete styleBase[stylePropName];
  }
*/

//const autoAddStyles = [], firstVal = args[1]// || args[0];
  const autoAddStyles = [], firstVal = args[1] || args[0];
  //console.log(args)
  if(!!firstVal && "object" === typeof firstVal){
      Object.keys(firstVal)
            .forEach( cssName => {
        if(true === firstVal[cssName] && styleCSS && cssName in styleCSS)
          autoAddStyles.push(styleCSS[cssName])
      //  else // to bind style value to output obj
      //    autoAddStyles.push({cssName:firstVal[cssName]})
      });
  }

  return Object.assign({},styleBase,...autoAddStyles,processedStyles);
}
