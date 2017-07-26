import outline from 'react-outline'
import React  from "preact"
const css = {
    article:{
      base:{
        background:"linear-gradient(to bottom, rgb(26,154,218) 0%,rgb(13,131,190) 100%)",
        padding: "10px"
      },
      ":hover":{
        background:"linear-gradient(to bottom, rgb(24, 142, 202) 0%,rgb(12, 118, 171) 100%)"
      }
    }
}

const styles = outline([css]);

const Panel = styles.article``

export default (props) => <Panel>{props.text}</Panel>
