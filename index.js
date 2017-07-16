
function hasKids(obj){
  for(const name in obj){
    if("style" !== name && "object" === typeof obj[name])
    return true
  }
}

function replacedStyleFn({styleCSS,styleFn,radium},args){

    const processedStyles = 1=== styleFn.length ? styleFn(...args) : styleFn(styleCSS,...args);
    const styleBase = styleCSS && styleCSS.style||styleCSS||{};
    const autoAddStyles = [], firstVal = args[0];
    if(!!firstVal && "object" === typeof firstVal)
    Object.keys(firstVal).forEach( cssName => {
      if(true === firstVal[cssName])
        autoAddStyles.push(styleCSS[cssName])
    } )
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

const userSetOptions = {}

function wrapStyles(_styles,options,styleCSS){
  //debugger;
  console.debug(" FISRT wrapStyles")
  options = options || userSetOptions;
  const radium = !!options.radium;
  const caching = !!options.caching;
  styleCSS = _styles.style || styleCSS
  const replacedStyle = {}
  if(_styles.style)
    replacedStyle.style = styleCSS;

  Object.keys(_styles).concat(Object.keys(styleCSS))
  .filter((item, pos, a)=> a.indexOf(item) === pos )
  .filter(styleName => "style" !== styleName)
  .forEach((styleName)=>{

    const styleFn = _styles[styleName]||(()=>{});
    let cached = { key:"", value:null }
    replacedStyle[styleName] = (...args) => { console.count("replaced Style, "+styleName);
//debugger;
      if(!caching)
        return replacedStyleFn({styleCSS:styleCSS[styleName],styleFn,radium},args);

      const key = JSON.stringify(args)
      if(key === cached.key)
        return cached.value;
        console.count("replaced BUILD, "+styleName);
      cached.key = key;
      cached.value = replacedStyleFn({styleCSS:styleCSS[styleName],styleFn,radium},args);
      return cached.value;
  }

    if(0 < Object.keys(styleFn).length || hasKids(styleCSS[styleName])){
      Object.assign(replacedStyle[styleName], wrapStyles(styleFn,options,styleCSS[styleName]))
    }
  })
  return replacedStyle
}

export default wrapStyles

export function withOptions(options){
  if(!options) throw new Error("Bad options values for wrapStyles:"+JSON.stringify(options))
  return (_styles)=>wrapStyles(_styles,options)
}

export function setOptions(options){
  if(!options) throw new Error("Bad options values for wrapStyles:"+JSON.stringify(options))
  Object.assign(userSetOptions,options)
}

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

*/
