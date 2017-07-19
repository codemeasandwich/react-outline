import React from 'react'
import Prefixer from 'inline-style-prefixer'

const prefixer = new Prefixer()

function hasKids(obj){
  for(const name in obj){
    if("base" !== name && "object" === typeof obj[name])
    return true
  }
}

function replacedStyleFn({styleCSS,styleFn,radium},args){

    const processedStyles = 1=== styleFn.length ? styleFn(...args) : styleFn(styleCSS,...args);
    const styleBase = styleCSS && styleCSS.base||styleCSS||{};
    const autoAddStyles = [], firstVal = args[0];
    //console.log(args)
    if(!!firstVal && "object" === typeof firstVal){
        Object.keys(firstVal)
              .forEach( cssName => {
          if(true === firstVal[cssName])
            autoAddStyles.push(styleCSS[cssName])
        //  else // to bind style value to output obj
        //    autoAddStyles.push({cssName:firstVal[cssName]})
        });
    }
    if(radium){
      if(processedStyles){
        if(Array.isArray(processedStyles))
          return [styleBase,...autoAddStyles,...processedStyles];
        else
          return [styleBase,...autoAddStyles,processedStyles];
      } // END if(processedStyles)
      return styleBase
    } // END if(radium)
    return Object.assign({},styleBase,...autoAddStyles,processedStyles);
}

const userSetOptions = {/* prefix:getVendorPrefix()*/ }

const replaceColors = (colors,style) =>{

  if(!colors) return style;
  const result = Object.assign({},style)
  for(const key in result ){
    if(result[key] in colors){
      result[key] = colors[result[key]];
    }
  }
  return result;
}

const genStyles = (styleStuff, args,colors) =>{
  const userResult = replacedStyleFn(styleStuff,args);
  const swapedColor = replaceColors(colors,userResult);
  const venderSpecificPrefixes = prefixer.prefix(swapedColor);

  return venderSpecificPrefixes;
}
function topLevelWrapStyles(_styles,options,styleCSS){
  const wrappedStyles = wrapStyles(_styles,options,styleCSS);
        wrappedStyles.colors = wrappedStyles.colors
                            || options        && options.colors
                            || userSetOptions && userSetOptions.colors;
  return wrappedStyles;
}

function wrapStyles(_styles,options,styleCSS){

  options = Object.assign({},userSetOptions,options);
  const radium = !!options.radium;
  const caching = !!options.caching;
  const colors = options.colors;
  styleCSS = _styles.base || styleCSS
  const replacedStyle = {}
  if(_styles.base)
    replacedStyle.base = styleCSS;

  Object.keys(_styles)
  .concat(Object.keys(styleCSS))
  .filter((item, pos, a)=> a.indexOf(item) === pos )
  .filter(styleName => "base" !== styleName)
  .forEach((styleName)=>{

    const styleFn = _styles[styleName]||(()=>{});
    const cached = { key:"", value:null }
    replacedStyle[styleName] = function(...args) {
      let elemName = args[0];
      if(Array.isArray(elemName) && elemName.hasOwnProperty("raw")){
        elemName = elemName[0] || args[1];
        const thisStyle = replacedStyle[styleName]();

        // return <${elemName} ...props />
        return props => {
          const elemProps = Object.assign({},props);

          if(props.style){
            elemProps.style = replacedStyle[styleName](props.style);
          } else {
            elemProps.style = thisStyle;
          }

          if(options.named)
            elemProps.name = elemProps.name || styleName;
          return React.createElement(elemName,elemProps)
        }//,props.children
      }

      const styleStuff = { styleCSS:styleCSS[styleName],styleFn,radium };

      if(!caching){
        return genStyles(styleStuff,args,colors);
      }

      const key = JSON.stringify(args)
      if(key === cached.key){
        return cached.value;
      }

      cached.key = key;
      cached.value = genStyles(styleStuff,args,colors);
      return cached.value;
  }

    if(0 < Object.keys(styleFn).length || hasKids(styleCSS[styleName])){
      Object.assign(replacedStyle[styleName], wrapStyles(styleFn,options,styleCSS[styleName]))
    }
  })
  return replacedStyle
}

export default topLevelWrapStyles

function withOptions(options){
  if(!options) throw new Error("Bad options values for wrapStyles:"+JSON.stringify(options))
  return (_styles)=>topLevelWrapStyles(_styles,options)
}

function setOptions(options){
  if(!options) throw new Error("Bad options values for wrapStyles:"+JSON.stringify(options))
  Object.assign(userSetOptions,options)
}

export { withOptions, setOptions }
