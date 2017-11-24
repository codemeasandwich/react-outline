import React from 'react';
import outline from 'react-outline'
import { Styles } from 'react-outline'

let styles = {
    base : {
      title:{
         base:{     background: "lightblue", color:"black" },
        "div:nth-child(even)":{  background: "darkblue" , color:"white" }
      }
    }
}
styles = outline(styles);

const Title = styles.title`div`

export default <div>
<Styles/>
  <Title css={{"div:nth-child(even)":{color:"red"}}}>
    <div>foo</div>
    <div>bar</div>
    <div>baz</div>
  </Title>
</div>
