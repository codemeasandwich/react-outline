import React from 'react';
import outline from 'react-outline'

let styles = {
    base : {
      table : {
          borderCollapse: "collapse",
          width: "100%"
      },
      tr : {
          borderBottom: "thick solid red"
      },
      td : {
          border: "1px solid #dddddd",
          padding: "8px"
      }
    }
}
styles = outline(styles);

// The HTML tag type is implied by the name

const Table = styles.table``
const Row   = styles.tr``
const Cell  = styles.td``

export default <Table>
                  <Row>
                    <Cell>Maria Anders</Cell>
                    <Cell>Germany</Cell>
                  </Row>
                  <Row>
                    <Cell>Francisco Chang</Cell>
                    <Cell>Mexico</Cell>
                  </Row>
                  <Row>
                    <Cell>Roland Mendel</Cell>
                    <Cell>Austria</Cell>
                  </Row>
              </Table>
