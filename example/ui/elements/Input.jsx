import React from 'react'
import outline from 'react-outline'

const css = {
  input:{
    display:"block",
    height:"34px",
    padding:"6px 12px",
    fontSize:"14px",
    lineHeight:"1.42857143",
    color:"#333333",
    backgroundColor:"#ecf0f1",
    backgroundImage:"none",
    border:"1px solid #ecf0f1",
    borderRadius:"4px",
    boxShadow:"inset 0 1px 1px rgba(0, 0,  0,   0.075)",
    transition:"border-color ease-in-out .15s, box-shadow ease-in-out .15s"
  },
  label:{
    fontSize: "14px"
  }
}

const Styles = outline([css]);

const Input = Styles.input``
const Label = Styles.label`h5`

export default function(props){
        return <div>
                    {(props.label)?<Label>{props.label}</Label>:null}
                    <Input {...props} />
              </div>
};
