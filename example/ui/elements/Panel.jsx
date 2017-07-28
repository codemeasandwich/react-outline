import outline from 'react-outline'
import React  from "react"
const css = {
    article:{
         marginBottom: "20px",
         backgroundColor: "#fff",
         border: "1px solid transparent",
         borderRadius: "5px",
         padding:"15px",
         boxShadow: "0 1px 1px rgba(0, 0, 0, 0.05)",
         width: "25%"
    }
}

const styles = outline([css]);

const Panel = styles.article``

export default (props) => <Panel>{props.children}</Panel>
