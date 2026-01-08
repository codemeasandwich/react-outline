import prefixAll from 'inline-style-prefixer/static'

import replacedStyleFn from './replacedStyleFn'
import replaceColors from './replaceColors'
import { specialCharacters } from './index'

export default function genStyles(styleStuff, args, colors) {
  const userResult = replacedStyleFn(styleStuff, args);

  const swapedColor = replaceColors(colors, userResult);
  for (const name in swapedColor) {
    //if(!specialCharacters.includes(name[0]))
    swapedColor[name] = prefixAll({ a: swapedColor[name] }).a;
  }

  return swapedColor;
}
