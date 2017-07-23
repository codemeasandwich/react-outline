import outline from 'react-outline'
 
let styles = {
    base : {
      css:`
        @media (max-width: 600px) {
          .facet_sidebar {
            color: red;
          }
        }`
      foo:`
        @media (max-width: 600px) {
            color: red;
        }`
    }
}
 and min-width: 520px) {

const css =  ` @media (max-width: 600px) {   color: red;    }`
const pattern = /(@media[^{]+{\s*)([\s\S]+?)(\s*})/g

const cssnew = css.replace( pattern, "$1.foo{\n\t\t$2\n\t}$3" );

styles = outline(styles);
 
export default (props) => <div style={styles.title()}>{props.text}</div>
/*
 props === { text:"hello" }
<div style={{ fontSize: "25px" }}>"hello"</div>
*/