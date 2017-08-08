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

const Title = <div style={styles.title({error:true})}>basic</div>

export default Title
