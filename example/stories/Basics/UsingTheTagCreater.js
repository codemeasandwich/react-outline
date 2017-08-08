import React from 'react';
import outline from 'react-outline'

let styles = {
    base : {
      title:{ fontSize: "25px" }
    }
}
styles = outline(styles);

const Title = styles.title`div`

export default <Title>basic</Title>
