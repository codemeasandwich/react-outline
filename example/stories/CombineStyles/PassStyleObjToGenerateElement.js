import React from 'react';
import outline from 'react-outline'

// inline the style schema
const styles = outline({ title:{fontSize: 25 } });

const Title = styles.title`div`

export default <Title style={{color:"red"}}>basic</Title>
