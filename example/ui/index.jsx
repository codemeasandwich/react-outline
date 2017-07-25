import React  from "preact"
import { Styles } from "react-outline"
import Foo from "./elements/Foo.jsx"
import Basic from "./elements/Basic.jsx"


const MainUi = (props) => {

  return (
    <div>
    <Styles />

    <Basic/>

    <Foo/>

    </div>
  )
}


export default MainUi;
