import React  from "preact"
import mystyle_css from "mystyle.css"
import { Styles } from "react-outline"

const MainUi = (props) => {

  return (
    <div>
    <Styles rel="stylesheet" type="text/css" href={mystyle_css} />
    <Styles>
      
      .media {
        margin-top: 15px;
      }
      .media:first-child {
        margin-top: 0;
      }
      .media,
      .media-body {
        zoom: 1;
        overflow: hidden;
      }
      .media-body {
        width: 10000px;
      }
      .media-object {
        display: block;
      }
      .media-right,
      .media > .pull-right {
        padding-left: 10px;
      }
      .media-left,
      .media > .pull-left {
        padding-right: 10px;
      }
      .media-left,
      .media-right,
      .media-body {
        display: table-cell;
        vertical-align: top;
      }
      .media-middle {
        vertical-align: middle;
      }
      .media-bottom {
        vertical-align: bottom;
      }
      .media-heading {
        margin-top: 0;
        margin-bottom: 5px;
      }
      .media-list {
        padding-left: 0;
        list-style: none;
      }
    </Styles>

    <br/>
   
    </div>
  )
}


export default MainUi;
