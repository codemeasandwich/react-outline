import React from 'react';
import outline from 'react-outline'
import { Styles } from 'react-outline'

let styles = {
    base: {
        title: {
            base: { color: "blue" },
            ":hover": { color: "green", fontWeight: "bold" },
            error: { color: "red" }
        }
    }
}

styles = outline(styles);

const Title = styles.title`p`

export default <div>
    <Styles />
    <Title>basic - blue, green on hover</Title>
    <Title error>error - red, green on hover</Title>
</div>
