import React from 'react';
import outline from 'react-outline'
import { Styles } from 'react-outline'

let styles = {
    base : {
      title:{
         base:{ background: "lightgreen", color:"black" },
         "@media (max-width: 600px)": {
             background: "darkgreen", color:"white"
         }
      }
    }
}
styles = outline(styles);

const Title = styles.title`div`

export default <div>
<Styles/>
<Title>basic</Title>
</div>
