import React from 'react';
import outline from 'react-outline'

let styles = {
    base : {
      title:{ backgroundColor: "red" },
      "title, content":{
         textShadow: "2px 2px 2px black"
      },
      content:{ base:{ color: "red"} },
    }
}
styles = outline(styles);
const Title = styles.title`div`

export default <div>
  <Title>basic</Title>
  <span style={styles.content()}>content</span>
</div>
