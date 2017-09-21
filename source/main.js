
import React from 'react'
import { classes, hasKids, specialCharacters, specialInnerCharacters, separateCssStyle, genStyles, genCss, makeid } from './utils'

import element from './element'



const userSetOptions = { named:true/* prefix:getVendorPrefix()*/ }

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
        let inlineStyle = null;//replacedStyle[styleName]();

        const baseStyle = styleCSS[styleName] && styleCSS[styleName].base || {}
        for(const propN in styleCSS[styleName]){
          if(specialCharacters.includes(propN[0]) || !!propN.match(new RegExp(`[${specialInnerCharacters}]`, "gi"))){
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

        classes.publish(randomClassName,genCss({randomClassName, css,styleCSS, colors,style,styleName}))

         inlineStyle = {};
        }

        return element({elemName, css,styleCSS,inlineStyle,style,styleName, colors, randomClassName, options,randomClassName,replacedStyle})

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
function buildCssString(props={}){
const  classesValues = classes.get()
 let css = Object.keys(classesValues).map(className => classesValues[className] ).join(" ");
  css += props.children || "";
  css = css.replace(/\n/g, ' ').replace(/\s+/g, ' ');
  return css
}
function Styles(props){

  const StylesElem = React.createClass({
  displayName: "Styles",
  getInitialState: function getInitialState() {
    // setTimeout to fix: Warning: setState(...): Cannot update during an existing state transition
    classes.subscribe(()=> setTimeout(()=>this.setState({cssString:buildCssString(props)}), 0) )
    return { cssString : buildCssString(props)};
  },
  render: function render() {
    return <style>{this.state.cssString}</style>;
  }
})
  return React.createElement(StylesElem)
}

Styles.toString = ()=>buildCssString()

const testing = {
  resetCSS: classes.clear
}

export default topLevelWrapStyles
export { withOptions, setOptions, Styles, testing }
