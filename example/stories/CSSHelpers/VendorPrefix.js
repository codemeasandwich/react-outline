import React from 'react';
import outline from 'react-outline'

let styles = {
    base : {
      title:{
          display: "flex",
          transition: "all .5s",
          userSelect: "none",
          fontSize:"40px",
          background: "linear-gradient(to bottom, lightblue, darkblue)"  
      }
    }
}
styles = outline(styles);

const Title = <div style={styles.title()}>basic</div>

export default Title
