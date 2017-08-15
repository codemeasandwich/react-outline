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

styles.content = (numberOfCells) => ({ height : `${numberOfCells*50}px` })

styles = outline(styles);

const data = [{name:"foo"},
              {name:"bar"},
              {name:"cat"}]

const LogicStyled = <div style={styles.content(data.length)}> {

            data.map( (cellData,i) => (
              <span key={i} styles={styles.cell()}>{
                cellData.name
              }</span>) )

        } </div>

export default LogicStyled
