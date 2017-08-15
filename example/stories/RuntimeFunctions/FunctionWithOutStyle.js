import React from 'react';
import outline from 'react-outline'

// no "content" in style object

let styles = {
    base : {
      cell:{
        fontSize:10
      }
    }
}

styles.content = (numberOfCells) => ({ backgroundColor : "green" })

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
