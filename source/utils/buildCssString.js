export default function buildCssString(classesValues,props){
 let css = Object.keys(classesValues).map(className => classesValues[className] ).join(" ");
  css += props.children || "";
  css = css.replace(/\n/g, ' ').replace(/\s+/g, ' ');
  return css
}
