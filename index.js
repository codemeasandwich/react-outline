import Prefixer from 'inline-style-prefixer'
import addPx from 'add-px-to-style'
import hyphenate from 'hyphenate-style-name'

function separateCssStyle(styles){

  let css = {}
  let style = {}
debugger;
  for(const name in styles){
    if(name[0] === "@" || name[0] === ":")
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
  if (!keys.length) return ''
  let i, len = keys.length
  let result = ''

  for (i = 0; i < len; i++) {
    let key = keys[i]
    let val = obj[key]
    result += hyphenate(key) + ':' + addPx(key, val)
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
function makeid(side = 10) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < side; i++)
    text += possible.charAt(~~(Math.random() * possible.length));

  return text;
}

function replacedStyleFn({styleCSS,styleFn,radium},args){

    const processedStyles = 1=== styleFn.length ? styleFn(...args) : styleFn(styleCSS,...args);
    const styleBase = Object.assign({},styleCSS && styleCSS.base||styleCSS||{})


    for(const stylePropName in styleBase){
      if(stylePropName[0]==="@" || stylePropName[0]===":")
      delete styleBase[stylePropName];
    }

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
        let inlineStyle = replacedStyle[styleName]();

        const { css, style } = separateCssStyle(styleCSS[styleName].base||styleCSS[styleName]);
        /*
        const cssPropNames = Object.keys(styleCSS[styleName])
                                   .filter(stylePropName => stylePropName[0] === "@" ||  stylePropName[0] === ":");
        */
        let randomClassName = "";

        //if(0 < cssPropNames.length){
        if(css){
debugger;
          randomClassName = "react-outline-"+makeid();

          classes[randomClassName] = (style)?`.${randomClassName}{${ object2css(style) }}`:""

          classes[randomClassName] = Object.keys(css).reduce( (cssString,propName) => {
            const styleContent = object2css(styleCSS[styleName].base && styleCSS[styleName].base[propName] || styleCSS[styleName][propName]);
            if(propName[0] === "@")
                return ` ${propName}{ .${randomClassName}{ ${ styleContent } } } ` + cssString
            else if(propName[0] === ":")
                return ` .${randomClassName}${propName}{ ${ styleContent } } ` + cssString
            else
                return cssString
          } ,classes[randomClassName] )

          inlineStyle = "";
        }

        // return <${elemName} ...props />
        return props => {
          const elemProps = Object.assign({},props);

          if(props.style){
            elemProps.style = replacedStyle[styleName](props.style);
          } else {
            elemProps.style = inlineStyle;
          }

          if(options.named)
            elemProps.name = elemProps.name || styleName;

            elemProps.className  = elemProps.className || ""
            elemProps.className += randomClassName     || ""
            if("" === elemProps.className)
            delete elemProps.className;

          return userSetOptions.createElement(elemName,elemProps)
        }//,props.children

      } // elem gen

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
  } // END replacedStyle[styleName] = function(...args)

    if(0 < Object.keys(styleFn).length || hasKids(styleCSS[styleName])){
      Object.assign(replacedStyle[styleName], wrapStyles(styleFn,options,styleCSS[styleName]))
    }
  })
  return replacedStyle
}

export default topLevelWrapStyles

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

function Styles(){
 const css = Object.keys(classes).map(className => classes[className] ).join(" ");
  console.log(css)
  return userSetOptions.createElement("style",{},css)
}
/*
// wrap createElement
function createElement(...args){

  if(userSetOptions.createElement){
    return userSetOptions.createElement(...args)
  } else {
    let react = require("react") || require("preact");
    return react.createElement(...args)
  }

}*/

export { withOptions, setOptions, Styles }
