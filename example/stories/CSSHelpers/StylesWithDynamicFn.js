import React from 'react';
import outline from 'react-outline';
import { Styles } from 'react-outline';

// Case 1: CSS features WITH dynamic function (covers element.js L70-75)
const styles1 = outline({
    widget: {
        boxShadow: "0px 0px 4px #00000022",
        padding: "20px",
        "@media (max-width: 600px)": {
            margin: "0 -5px 15px 0px"
        }
    }
}, {
    widget: (selected) => (selected ? { boxShadow: "0px 0px 8px 6px #1101ff22" } : {})
});

// Case 2: CSS features WITHOUT dynamic function (covers element.js L79-80)
const styles2 = outline({
    box: {
        backgroundColor: "lightblue",
        ":hover": { backgroundColor: "darkblue" }
    }
});

const Widget = styles1.widget`div`;
const Box = styles2.box`div`;

export default <div>
    <Styles />
    {/* Widget with style=true triggers dynamic function and returns styles */}
    <Widget style={true}>Dynamic style applied (selected=true)</Widget>
    {/* Widget with style=false triggers dynamic function returning empty */}
    <Widget style={false}>Dynamic style not applied (selected=false)</Widget>
    {/* Box has CSS but no dynamic function - covers L80 */}
    <Box style={{ color: "red" }}>CSS feature without dynamic function</Box>
</div>
