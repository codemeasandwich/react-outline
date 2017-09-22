
import React from 'react'
import { pubsub } from './utils'

import wrapStylesFactory from './wrapStyles'
import Styles from './Styles'

const userSetOptions = { named:true/* prefix:getVendorPrefix()*/ }

const wrapStyles = wrapStylesFactory(userSetOptions)

//=====================================================
//============================= top Level - Wrap Styles
//=====================================================

//+++++++++++++++++++++++++++++ { base:{}, foo: ()=> }
//++++++++++++++++++++++++++++++++++++++++++++++++++++
function sanitizeWrapStyles(_styles,options={},styleCSS={}){

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

//=====================================================
//============================================= Options
//=====================================================

function withOptions(options){
  if(!options) throw new Error("Bad options values for react-outline:"+JSON.stringify(options))
  return (_styles)=>sanitizeWrapStyles(_styles,options)
}

function setOptions(options){
  if(!options) throw new Error("Bad options values for react-outline:"+JSON.stringify(options))
  if(options.colors){
    sanitizeWrapStyles.colors = options.colors
  }
  Object.assign(userSetOptions,options)
}

const testing = {
  resetCSS: pubsub.clear
}

export default sanitizeWrapStyles
export { withOptions, setOptions, Styles, testing }
