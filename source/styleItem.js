
import { hasKids, specialCharacters, specialInnerCharacters, separateCssStyle, makeid, genCss, genStyles, classes } from './utils'
import element from './element'

export default function({_styles,replacedStyle,styleCSS, colors, options,caching, wrapStyles}){

    return (styleName)=>{

      const styleFn = _styles[styleName]||(()=>{});

      const cached = { key:null, value:null, source:[] }
      replacedStyle[styleName] = function(...args) {
        let elemName = args[0];
        if(Array.isArray(elemName) && elemName.hasOwnProperty("raw")){

          elemName = elemName[0] || args[1];
          let inlineStyle = null;//replacedStyle[styleName]();

          const baseStyle = styleCSS[styleName] && styleCSS[styleName].base || {}
          for(const propN in styleCSS[styleName]){
            if(specialCharacters.includes(propN[0]) || !!propN.match(new RegExp(`[${specialInnerCharacters}]`, "gi"))){
              baseStyle[propN] = styleCSS[styleName][propN]
            }
          }
          //splict ":" and "@" from all over styles
          const { css, style } = separateCssStyle(baseStyle);
          /*
          const cssPropNames = Object.keys(styleCSS[styleName])
                                     .filter(stylePropName => stylePropName[0] === "@" ||  stylePropName[0] === ":");
          */
          let randomClassName = "";

          //if(0 < cssPropNames.length){
          if(css){

            randomClassName = "react-outline-"

            if(!global.__TEST__)
                randomClassName += makeid();

          classes.publish(randomClassName,genCss({randomClassName, css,styleCSS, colors,style,styleName}))

           inlineStyle = {};
          }

          return element({elemName, css,styleCSS,inlineStyle,style,styleName, colors, randomClassName, options,randomClassName,replacedStyle})

        } // elem gen

        const styleStuff = { styleCSS:styleCSS[styleName],styleFn/*,radium*/ };

        if(!caching){
          return genStyles(styleStuff,args,colors);
        }
        // quick test
        if(cached.value && cached.source[0] === args[0] && cached.source[0] === args[1]){
          return cached.value;
        }
        // deep test
        const key = ""+JSON.stringify(args[0])+JSON.stringify(args[1])
        if(key === cached.key){
          return cached.value;
        }

        cached.key = key;
        cached.source[0] = args[0];
        cached.source[1] = args[1];
        cached.value = genStyles(styleStuff,args,colors);
        return cached.value;
    } // END replacedStyle[styleName] = function(...args)

      if(0 < Object.keys(styleFn).length || hasKids(styleCSS[styleName])){
        Object.assign(replacedStyle[styleName], wrapStyles(styleFn,options,styleCSS[styleName]))
      }
    }
}
