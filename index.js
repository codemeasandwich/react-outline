import Prefixer from 'inline-style-prefixer'
import addPx from 'add-px-to-style'
import hyphenate from 'hyphenate-style-name'
import React from 'react'

const specialCharacters = "@:";//['@',':'].join("");

function separateCssStyle(styles){

  let css = {}
  let style = {}

  for(const name in styles){
    if(specialCharacters.includes(name[0]))
        css[name] = styles[name]
    else
        style[name] = styles[name]
  }

  if( 0 === Object.keys(css).length)
  css = null;

  if( 0 === Object.keys(style).length)
  style = null;

  return { css, style }
}

// Convert a JS object to CSS string. Similar to React's output of CSS, extracted into a module.
function object2css(obj) {
  let keys = Object.keys(obj)
  //if (!keys.length) return ''
  let i, len = keys.length
  let result = ''

  for (i = 0; i < len; i++) {
    let key = keys[i]
    let val = obj[key]
    result += hyphenate(key) + ':' + addPx(key, val) +"; "
  }

  return result
}

const prefixer = new Prefixer()
const classes = {}

function hasKids(obj){
  for(const name in obj){
    if("base" !== name && "object" === typeof obj[name])
    return true
  }
}

const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function makeid(side = 10) {
  let text = "";

  for (let i = 0; i < side; i++)
    text += possible.charAt(~~(Math.random() * possible.length));

  return text;
}

function replacedStyleFn({styleCSS,styleFn/*,radium*/},args){

    const processedStyles = 1=== styleFn.length ? styleFn(args[0]) : styleFn(styleCSS,args[0]);

    const styleBase = Object.assign({},styleCSS && styleCSS.base||styleCSS||{})
/*
    for(const stylePropName in styleBase){
      if(specialCharacters.includes(stylePropName[0]))
      delete styleBase[stylePropName];
    }
*/
    const autoAddStyles = [], firstVal = args[1] || args[0];
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

    return Object.assign({},styleBase,...autoAddStyles,processedStyles);
}

const userSetOptions = { named:true/* prefix:getVendorPrefix()*/ }

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

//+++++++++++++++++++++++++++++ { base:{}, foo: ()=> }
//++++++++++++++++++++++++++++++++++++++++++++++++++++
function topLevelWrapStyles(_styles,options={},styleCSS={}){

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
      if("function" !== typeof options){
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

  const wrappedStyles = wrapStyles(_styles,options,styleCSS);
        wrappedStyles.colors = wrappedStyles.colors
                            || options        && options.colors
                            || userSetOptions && userSetOptions.colors;
  return wrappedStyles;
}

function wrapStyles(_styles,options,styleCSS){


  options = Object.assign({},userSetOptions,options);
//  const radium = !!options.radium;
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

    const cached = { key:null, value:null, source:[] }
    replacedStyle[styleName] = function(...args) {
      let elemName = args[0];
      if(Array.isArray(elemName) && elemName.hasOwnProperty("raw")){

        elemName = elemName[0] || args[1];
        let inlineStyle = replacedStyle[styleName]();

        const baseStyle = styleCSS[styleName] && styleCSS[styleName].base || {}
        for(const propN in styleCSS[styleName]){
          if(specialCharacters.includes(propN[0])){
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

          if(!global.__TEST__)
              randomClassName += makeid();

          classes[randomClassName] = (style)?`.${randomClassName}{${ object2css(style) }}`:""

          classes[randomClassName] = Object.keys(css).reduce( (cssString,propName) => {
            const styleContent = object2css(styleCSS[styleName].base && styleCSS[styleName].base[propName] || styleCSS[styleName][propName]);
            if(propName[0] === "@")
                return cssString + ` ${propName}{ .${randomClassName}{ ${ styleContent } } } `
            else if(propName[0] === ":")
                return ` .${randomClassName}${propName}{ ${ styleContent } } ` + cssString
          //  else // skip unknown prop
          //      return cssString
          } ,classes[randomClassName] )

         inlineStyle = {};
        }

        // return <${elemName} ...props />
        return props => {
          const elemProps = Object.assign({},props);

        let passedTrueProps = Object.keys(props)
                                    .filter( name => props[name] === true && Object.keys(styleCSS[styleName]).includes(name) )
        if(0 < passedTrueProps.length){
          passedTrueProps = passedTrueProps.reduce((styleProps, name) => {
            // If elem is a HTML type = Removed it Unknown prop `...` on <...> tag. Remove this prop from the element.
            if("function" !== typeof elemName && "disabled" !== name){
              delete elemProps[name]
            }
            return Object.assign(styleProps,{[name]:true})
          },{})
        } else {
          passedTrueProps = null
        }
          if(passedTrueProps || props.hasOwnProperty("style")){
            if(props.style instanceof Object)
                passedTrueProps = Object.assign({},props.style,passedTrueProps);
            elemProps.style = replacedStyle[styleName](props.style,passedTrueProps);
          } else {
            elemProps.style = inlineStyle;
          }

          if(options.named)
            elemProps.name = elemProps.name || styleName;

            elemProps.className  = elemProps.className || ""
            elemProps.className += randomClassName     || ""
            if("" === elemProps.className)
                delete elemProps.className;

          return React.createElement(elemName||styleName,elemProps,elemProps && elemProps.children)
        }//,props.children

      } // elem gen


      const styleStuff = { styleCSS:styleCSS[styleName],styleFn/*,radium*/ };

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
  } // END replacedStyle[styleName] = function(...args)

    if(0 < Object.keys(styleFn).length || hasKids(styleCSS[styleName])){
      Object.assign(replacedStyle[styleName], wrapStyles(styleFn,options,styleCSS[styleName]))
    }
  })
  return replacedStyle
}


function withOptions(options){
  if(!options) throw new Error("Bad options values for react-outline:"+JSON.stringify(options))
  return (_styles)=>topLevelWrapStyles(_styles,options)
}

function setOptions(options){
  if(!options) throw new Error("Bad options values for react-outline:"+JSON.stringify(options))
  if(options.colors){
    topLevelWrapStyles.colors = options.colors
  }
  Object.assign(userSetOptions,options)
}

function Styles(props){
 let css = Object.keys(classes).map(className => classes[className] ).join(" ");
  css += props.children || undefined;
  css = css.replace(/\n/g, ' ').replace(/\s+/g, ' ');
  return React.createElement("style",{},css)
}

export default topLevelWrapStyles
export { withOptions, setOptions, Styles }
