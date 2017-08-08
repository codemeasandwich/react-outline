import React from 'react';
import outline from 'react-outline'

let styles = {
    base : {
      title:{
        base:{fontSize: "25px" },
        error:{color:"#f00" }
      }
    }
}
styles = outline(styles);

const Title = styles.title`div`

export default <Title style={{error:true}}>basic</Title>
