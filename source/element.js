
import React from 'react'
import { genCss, replacedStyle, pubsub } from './utils'

export default function({elemName, css,styleCSS,inlineStyle,style,styleName, colors, randomClassName, options,replacedStyle}){

  return props => {

      if("css" in props){

        const updatedCss = Object.assign({},css)

        for(const selectorRule in props.css){
          updatedCss[selectorRule] = Object.assign({},css[selectorRule], "function" === typeof props.css[selectorRule] ? props.css[selectorRule]() : props.css[selectorRule])
        }
        pubsub.publish(randomClassName, genCss({randomClassName, css:updatedCss,styleCSS, colors,style,styleName}))
      }

      const elemProps = Object.assign({},props);

    let passedTrueProps = Object.keys(props)
                                .filter( name => props[name] === true && styleCSS[styleName] && name in styleCSS[styleName] )
    //  console.log("passedTrueProps",passedTrueProps)
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
        //if(props.style instanceof Object)
        //    passedTrueProps = Object.assign({},props.style,passedTrueProps);
        elemProps.style = replacedStyle[styleName](props.style,passedTrueProps);
      } else {
        elemProps.style = inlineStyle || replacedStyle[styleName]();
      }

      if(Object.keys(elemProps.style).length === 0){
         delete elemProps.style;
      }

      if(options.named){
        elemProps.name = elemProps.name || styleName;
      }

        elemProps.className  = elemProps.className || ""
        elemProps.className += randomClassName     || ""
        if("" === elemProps.className)
            delete elemProps.className;

      return React.createElement(elemName||styleName,elemProps,elemProps && elemProps.children)
  }
}
