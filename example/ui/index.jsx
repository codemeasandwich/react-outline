import React  from "preact"
import outline, { Styles } from "react-outline"

import Panel from "./elements/Panel.jsx"
import Input from "./elements/Input.jsx"

// helpful link ~ http://staxmanade.com/CssToReact/

const css = {
    mainContent:{
        backgroundColor: "WhiteSmoke",
        padding:"10px",
        minHeight: "100%",
        position: "fixed",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0
    }
}

const styles = outline([css]);

const MainContent = styles.mainContent`div`

const MainUi = (props) => {

  return (
    <MainContent>
      <Styles>{`

      *{
        font-family: arial,sans-serif;
      }

      `}</Styles>
      <h1>react-outline</h1>
      <Panel>
        <Input label="name" onInput={({target:{value}}) => console.log(value) }/>
      </Panel>
    </MainContent>
  )
}


export default MainUi;
