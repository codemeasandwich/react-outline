
import React from 'react'
import { pubsub, buildCssString } from './utils'

// TODO: make Styles a "ref" and manual set the content

export default function Styles(props){
//class StylesElem extends React.Component {
  const StylesElem = React.createClass({
  displayName: "Styles",
  getInitialState: function getInitialState() {
    // setTimeout to fix: Warning: setState(...): Cannot update during an existing state transition
    pubsub.subscribe(()=> setTimeout(()=>this.setState({cssString:buildCssString(pubsub.get(),props)}), 0) )
    return { cssString : buildCssString(pubsub.get(),props)};
  },
  render: function render() {
    return <style>{this.state.cssString}</style>;
  }
})
  return React.createElement(StylesElem)
}

Styles.toString = ()=>buildCssString(pubsub.get())
