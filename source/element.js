
import React from 'react'
import { findDOMNode } from 'react-dom'
import { genCss, pubsub } from './utils'

export default function({elemName, css,styleCSS,inlineStyle,style,styleName, colors, randomClassName, options,replacedStyle}){

  class C2 extends React.Component {

    componentDidMount() {
      const onDomEvent = this.props.onDomEvent
      for (const listen in onDomEvent) {
        this.domElem.addEventListener(listen, event => onDomEvent[listen](this.domElem,event));
      }
    }

    componentWillUnmount() {
      const onDomEvent = this.props.onDomEvent
      for (const listen in onDomEvent) {
        this.domElem.removeEventListener(listen, event => onDomEvent[listen](this.domElem,event));
      }
    }

    render(){

      const props = this.props

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
        if(randomClassName)
            elemProps.style = props.style
        else
            elemProps.style = replacedStyle[styleName](props.style,passedTrueProps);

      } else {
        elemProps.style = inlineStyle || replacedStyle[styleName]();
      }
      //TODO: write a test for this
      // For some reason in prod!
      // a custom element in a perfect storm can have style undefined
      //SEE: test - should generated an element with css selector
      // thss is the same prod code.. BUT this is not catching this case :(
      if(elemProps.style &&
        Object.keys(elemProps.style).length === 0){
         delete elemProps.style;
      }

      if(options.named){
        elemProps.name = elemProps.name || styleName;
      }

        elemProps.className  = elemProps.className || ""
        if(elemProps.className && randomClassName){
          elemProps.className += " "
        }
        elemProps.className += randomClassName || ""
        if("" === elemProps.className)
            delete elemProps.className;

        if(props.onDomEvent){
          elemProps.ref = reatElem => this.domElem = findDOMNode(reatElem)
        }

      return React.createElement(elemName||styleName,elemProps,elemProps && elemProps.children)

          }
        }

      Object.defineProperty (C2, 'name', {value: styleName||elemName});

      return C2
}
