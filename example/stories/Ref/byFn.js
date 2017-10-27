import React from 'react';
import ReactDOM from 'react-dom'
import outline from 'react-outline'

let styles = {
    textarea : {  }
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
      Scroll me - { this.state.scrollTop }<br/>
      <Textarea ref={(reatElem)=> this.domElem = ReactDOM.findDOMNode(reatElem) } defaultValue={"1,2,3,4,5".replace(/,/g,"\n")} />
    </div>
  }
}

export default <Panel/>
