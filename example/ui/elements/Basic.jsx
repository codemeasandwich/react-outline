import React from 'preact'
import outline from 'react-outline'

//=====================================================
//============================================== styles
//=====================================================

let styles = {
 base : {
   body:{ padding:10 },
   button:{  backgroundColor:"red"  },
   table:{
     base: { width: "100%", height: "100%"},
     row:{ yourboth:"rowrow" },
     cell:{
       base: { padding:10, fontWeight: "initial" },
       error:{ color:"red" , padding:20},
       button:{ backgroundColor:"blue" }
    }
   }
 }
};

styles.random = ()=>({foo:"bar"})
styles.table = ()=> {}
styles.table.row = ()=>({abc:123})
styles.table.cell = (style,vals)=> (vals && vals.error)?{fontWeight:"bold",color:"blue"}:null

styles = outline(styles)

const Button = (props)=> <button {...props}> I AM A BUTTON </button>

const Cell = styles.table.cell`span`
const MyButton = styles.table.cell.button`${Button}`

export default function(props){

  return <div style={styles.body()}>
  <MyButton/>
  <button style={styles.button()}>  red button  </button>
      <Cell style={{error:true}}>err1</Cell>
      <span style={styles.table.cell({error:true})}>err2</span>
      <Cell >cell</Cell>
  </div>

}
