import React from 'react';
import outline from 'react-outline'

let styles = {
    base : {
      content:{},
      cell:{
        fontSize:10
      }
    }
}

styles.content = (numberOfCells) => ({
  backgroundColor : "red",
  height : `${numberOfCells*100}px`
})

styles.cell = (style,important) => ({ fontSize : style.fontSize + (important)?5:-5 })

styles = outline(styles);

const data = [{name:"foo",important:true},
              {name:"bar",important:false},
              {name:"cat"}]

const Group = styles.content`div`
const Cell  = styles.cell`span`

const LogicStyled = <Group style={data.length}> {

            data.map( (cellData,i) => (
              <Cell key={i} styles={cellData.important}>{
                cellData.name
              }</Cell>) )

        } </Group>

export default LogicStyled
