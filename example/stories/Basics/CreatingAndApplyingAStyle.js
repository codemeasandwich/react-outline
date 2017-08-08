import React from 'react';
import outline from 'react-outline'

let styles = {
    base : {
      title:{ fontSize: "25px" }
    }
}
styles = outline(styles);

const Title = <div style={styles.title()}>basic</div>

export default Title
