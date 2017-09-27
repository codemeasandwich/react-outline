
import object2css from './object2css'

export default function genCss({randomClassName, css,styleCSS, colors,style,styleName}){

  let newStyle = (style)?`.${randomClassName}{${ object2css(colors,style) }}`:""

  newStyle = Object.keys(css).reduce( (cssString,propName) => {



    const styleContent = object2css(colors,css[propName]
                                        /*  || styleCSS[styleName].base
                                          && styleCSS[styleName].base[propName]
                                          || styleCSS[styleName][propName]*/);



    if(propName[0] === "@")
        return cssString + ` ${propName}{ .${randomClassName}{ ${ styleContent } } } `
    else if(propName[0] === ":")
        return ` .${randomClassName}${propName}{ ${ styleContent } } ` + cssString
    else
        return ` .${randomClassName} ${propName}{ ${ styleContent } } ` + cssString
  //  else // skip unknown prop
  //      return cssString
  } ,newStyle )

  return newStyle;
}
