import React from 'react';
import outline from 'react-outline'

let styles = {
      title:{ backgroundColor: "red" }
}
const fus = {title:()=> ({ color:"white" }) }

styles = outline([styles,fus]);

const Title = styles.title`div`

export default <Title>basic</Title>
