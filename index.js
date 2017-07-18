import React from 'react'
//import autoprefixer from 'autoprefixer';
//import postcssJs      from 'postcss-js';
//const prefixer = postcssJs.sync([ autoprefixer ]);
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
      //  console.log(styleName,thisStyle,elemName)
      //  if(styleName === "button")
      //  debugger;
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

      //console.count("replaced Style, "+styleName);

      //console.log(arguments, arguments.caller);
      //debugger;
      const styleStuff = { styleCSS:styleCSS[styleName],styleFn,radium };

      if(!caching){
        return genStyles(styleStuff,args,colors);
      }

      const key = JSON.stringify(args)
      if(key === cached.key){
        return cached.value;
      }

      //console.count("replaced BUILD, "+styleName);
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

export default wrapStyles

function withOptions(options){
  if(!options) throw new Error("Bad options values for wrapStyles:"+JSON.stringify(options))
  return (_styles)=>wrapStyles(_styles,options)
}

function setOptions(options){
  if(!options) throw new Error("Bad options values for wrapStyles:"+JSON.stringify(options))
  //console.log("Object.assign 1",options)
  Object.assign(userSetOptions,options)
  //console.log("Object.assign 2",userSetOptions)
}

export { withOptions, setOptions }

/*
import {setOptions} from 'PS-utils/wrapStyles'
import {wrapStyles} from 'PS-utils'
setOptions({caching:true})
//const wrapStyles = wrapStylesWithOptions({radium:true,caching:true});
//=====================================================
//============================================== styles
//=====================================================

let styles = {
  style : {
    screen:{ padding:10 },
    button:{  backgroundColor:"red"  },
    table:{
      style: { width: "100%", height: "100%"},
      row:{ yourboth:"rowrow" },
      cell:{
        style: { padding:10 },
        error:{ color:"red" , padding:20},
        button:{ backgroundColor:"blur" }
     }
    }
  }
};

styles.random = ()=>({foo:"bar"})
styles.table = ()=> {}
styles.table.row = ()=>({abc:123})
styles.table.cell = (style,vals)=> (vals && vals.error)?{font:"bold",color:"blue"}:null

styles = wrapStyles(styles)

console.log("styles.screen()",styles.screen(),styles.screen()===styles.screen())
console.log("styles.table()",styles.table(),styles.table()===styles.table())
console.log("styles.random()",styles.random(),styles.random()===styles.random())
console.log("styles.table.cell()",styles.table.cell(),styles.table.cell()===styles.table.cell())
console.log("styles.table.cell.button()",styles.table.cell.button(),styles.table.cell.button()===styles.table.cell.button())
console.log("styles.table.cell({error:true})",styles.table.cell({error:true}),styles.table.cell({error:true})===styles.table.cell({error:true}))
console.log("styles.table.row()",styles.table.row(),styles.table.row()===styles.table.row())

const Cell = styles.table.cell`td`
const MyButton = styles.table.cell.button`${Button}`

 <Cell colSpan="2" style={{error:true}}>

*/
