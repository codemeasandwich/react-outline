
import { hasKids, specialCharacters, specialInnerCharacters, separateCssStyle, makeid, genCss, genStyles, pubsub, sanitizeStyleObj } from './utils'
import element from './element'

//=====================================================
//========================================== build Elem
//=====================================================

function buildElem({elemName,args,styleCSS,styleName,options,replacedStyle,colors}){

  elemName = elemName[0] || args[1];
  let inlineStyle = null;//replacedStyle[styleName]();

  const baseStyle = styleCSS[styleName] && styleCSS[styleName].base || {}
  for(const propN in styleCSS[styleName]){
    //if(specialCharacters.includes(propN[0]) || !!propN.match(new RegExp(`[${specialInnerCharacters}]`, "gi"))){
    if (/^[a-zA-Z0-9-]+$/.test(propN) === false) {
      baseStyle[propN] = styleCSS[styleName][propN]
    }
  }
  //splict ":" and "@" from all over styles
  const { css, style } = separateCssStyle(baseStyle);
  /*
  const cssPropNames = Object.keys(styleCSS[styleName])
                             .filter(stylePropName => stylePropName[0] === "@" ||  stylePropName[0] === ":");
  */
  let randomClassName = "";

  //if(0 < cssPropNames.length){
  if(css){
    randomClassName = "react-outline-"
    if(!global.__TEST__) randomClassName += makeid();
    pubsub.publish(randomClassName,genCss({randomClassName, css,styleCSS, colors,style,styleName}))
    inlineStyle = {};
  }

  return element({elemName, css,styleCSS,inlineStyle,style,styleName, colors, randomClassName, options,randomClassName,replacedStyle})
}

//=====================================================
//===================================== build Style Obj
//=====================================================

function buildStyleObj({styleStuff,genStyles,args,colors,caching,cached}){

  if(!caching){
    return genStyles(styleStuff,args,colors);
  }
  // quick test
  if(cached.value && cached.source[0] === args[0] && cached.source[0] === args[1]){
    return cached.value;
  }
  // deep test
  const key = ""+JSON.stringify(args[0])+JSON.stringify(args[1])
  if(key === cached.key){
    return cached.value;
  }

  cached.key = key;
  cached.source[0] = args[0];
  cached.source[1] = args[1];
  cached.value = genStyles(styleStuff,args,colors);
  return cached.value;

}

//=====================================================
//========================================== style Item
//=====================================================

export default function({_styles,replacedStyle,styleCSS, colors, options,caching, wrapStyles}){

//+++++++++++++++++++++++++++++++++++++ style function
//++++++++++++++++++++++++++++++++++++++++++++++++++++
    return (styleName)=>{

      const styleFn = _styles[styleName]||(()=>{});

      const cached = { key:null, value:null, source:[] }
      replacedStyle[styleName] = function(...args) {
          let elemName = args[0];

//+++++++++++++++++++++++++++++++++++ build an element
//++++++++++++++++++++++++++++++++++++++++++++++++++++

          if(Array.isArray(elemName) && elemName.hasOwnProperty("raw")){
              return buildElem({elemName,args,styleCSS,styleName,options,replacedStyle,colors})
          } // elem gen

//++++++++++++++++++++++++++++++++++++++ generat style
//++++++++++++++++++++++++++++++++++++++++++++++++++++

          const styleStuff = { styleCSS:styleCSS[styleName],styleFn:("object" === typeof args && !_styles[styleName] )?x=>sanitizeStyleObj(x):styleFn };

          return buildStyleObj({styleStuff,genStyles,args,colors,caching,cached})
      } // END replacedStyle[styleName] = function(...args)

//+++++++++++++++++++++++++++++++++ step down the tree
//++++++++++++++++++++++++++++++++++++++++++++++++++++

      if(0 < Object.keys(styleFn).length || hasKids(styleCSS[styleName])){
        Object.assign(replacedStyle[styleName], wrapStyles(styleFn,options,styleCSS[styleName]))
      }
    }
}
