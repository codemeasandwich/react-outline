import React from 'react';
import outline, { withOptions } from 'react-outline'

// example using a custom style generater with custom colors
const custom_outline =  withOptions({colors:{CrazyRed:"#f00"}})

// inline the style schema
const styles = custom_outline({
  title:{fontSize: "25px" }
},{
  title:(x)=>x
});

const Title = styles.title`div`

export default <Title style={{color:"CrazyRed"}}>basic</Title>
