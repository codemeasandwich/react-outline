
import styleItem from './styleItem'

//=====================================================
//========================================= wrap Styles
//=====================================================

export default function (userSetOptions){
  return function wrapStyles(_styles,options,styleCSS){

    options = Object.assign({},userSetOptions,options);
  //  const radium = !!options.radium;
    const caching = !!options.caching;
    const colors = options.colors;
    styleCSS = _styles.base || styleCSS
    const replacedStyle = {}
    if(_styles.base)
      replacedStyle.base = styleCSS;

    const styleItemGen = styleItem({_styles,replacedStyle,styleCSS, colors, options,caching, wrapStyles})

    Object.keys(_styles)
          .concat(Object.keys(styleCSS))
          .filter((item, pos, a)=> a.indexOf(item) === pos )
          .filter(styleName => "base" !== styleName)
          .forEach(styleItemGen)

    return replacedStyle
  }
}
