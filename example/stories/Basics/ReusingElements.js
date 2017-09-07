import React from 'react';
import outline from 'react-outline'

let styles = {
    base : {
      title:{ backgroundColor: "red" }
    }
}
styles = outline(styles);

const Title = styles.title`span`

export default <div><Title>foo</Title><Title>bar</Title></div>
