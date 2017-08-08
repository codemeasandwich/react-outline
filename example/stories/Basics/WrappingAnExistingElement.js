import React from 'react';
import outline from 'react-outline'

class HelloMessage extends React.Component {
  render() {
    return <div style={this.props.style}>Hello, {this.props.name}</div>;
  }
}

let styles = {
    base : {
      title:{ base : {backgroundColor: "red"} }
    }
}
styles = outline(styles);

const Title = styles.title`${HelloMessage}`

export default <Title name="basic"/>
