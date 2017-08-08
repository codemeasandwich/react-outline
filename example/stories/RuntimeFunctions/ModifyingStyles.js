import React from 'react';
import outline from 'react-outline'

let styles = {
    base : {
      content:{
        backgroundColor:"gray"
      },
      cell:{
        fontSize:10
      }
    }
}
window.x = styles
styles.cell = (style,important) => {
  console.log(style,important)

  return ({ fontSize : style.fontSize + ((important)?5:-5) })
}

styles = outline(styles);

const data = [{name:"foo",important:true},
              {name:"bar",important:false},
              {name:"bar",important:false},
              {name:"bar",important:false},
              {name:"cat"}]

const LogicStyled = <div style={styles.content(data.length)}> {

            data.map( cellData => (
              <span style={styles.cell(cellData.important)}>{
                cellData.name
              }</span>) )

        } </div>

export default LogicStyled
