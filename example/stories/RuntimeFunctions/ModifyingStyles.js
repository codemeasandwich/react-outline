import React from 'react';
import outline from 'react-outline'

let styles = {
    base : {
      content:{
        backgroundColor:"lightgray"
      },
      cell:{
        fontSize:10
      }
    }
}

styles.cell = (style,important) => {
  return ({ fontSize : style.fontSize + ((important)?5:-5) })
}

styles = outline(styles);

const data = [{name:"foo",important:true},
              {name:"bar",important:false},
              {name:"baz",important:true},
              {name:"qux",important:false},
              {name:"quux"}]

const LogicStyled = <div style={styles.content(data.length)}> {

            data.map( (cellData,i) => (
              <span key={i} style={styles.cell(cellData.important)}>{
                cellData.name
              }</span>) )

        } </div>

export default LogicStyled
