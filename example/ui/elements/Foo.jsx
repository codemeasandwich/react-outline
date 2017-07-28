import React from 'react'
import outline from 'react-outline'

let styles = {
    base : {
      foo:{
        "@media (max-width: 600px)": {
            color: "red"
        },
        color:"pink800",
        backgroundColor:"pink800"
      },
      bar:{
        fontSize:"20px",
        "@media(max-width: 600px)": {
              color: "red"
        }
      },
      cat:{
        backgroundColor:"#000",
        ":hover":{
            backgroundColor: "#fff"
        }
      },
      dog:{
        base:{
          backgroundColor:"green",
          ":hover":{
              backgroundColor: "yellow"
          }
        },
        pitbull:{
          fontSize:"30px"
        },
        pup:{
            backgroundColor:"600",
            ":hover":{
                backgroundColor: "#800"
            }
        }
      }
    } // END base
} // END styles


styles = outline(styles);

const Foo = styles.foo`div`
const Bar = styles.bar`div`
const Cat = styles.cat`div`
const Dog = styles.dog`div`
const Puppy = styles.dog.pup`div`

export default function(props){
  return <div>
            <Foo> foo </Foo>
            <Bar> bar </Bar>
            <Cat> cat </Cat>
            <Dog style={{pup:true}}> dog </Dog>
            <Puppy> puppy </Puppy>
            <Dog style={{pitbull:true}}> pitbull </Dog>
        </div>
  }
