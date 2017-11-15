import React from 'react';
import { findDOMNode } from 'react-dom'
import outline from 'react-outline'
import { Styles } from 'react-outline'

let styles = {
    textarea : {
      base:{
        border: "2px solid transparent",
        borderBottom: "2px solid lightgray",
      },
      ":focus":{
        outline: "none",
        borderBottom: "2px solid red",
      }
    }
}
styles = outline(styles);

const Textarea = styles.textarea``

class Panel extends React.Component {

  constructor(props) {
    super(props);
    this.listenScrollEvent = this.listenScrollEvent.bind(this)
    this.state = {scrollTop : 0};
  }

  componentDidMount() {
    this.domElem.addEventListener('scroll', this.listenScrollEvent);
  }

  componentWillUnmount() {
     this.domElem.removeEventListener('scroll', this.listenScrollEvent);
  }

  listenScrollEvent() {
      this.setState({scrollTop:this.domElem.scrollTop})
  }

  render() {
    return <div>
      <Styles/>
      Scroll me - { this.state.scrollTop }<br/>
      <Textarea style={{width:450}} ref={(reatElem)=> this.domElem = findDOMNode(reatElem) } defaultValue={"1,2,3,4,5".replace(/,/g,"\n")} />
    </div>
  }
}

export default <Panel/>
