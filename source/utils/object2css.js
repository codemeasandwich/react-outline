import hyphenate from 'hyphenate-style-name'
import addPx from 'add-px-to-style'
import replaceColors from './replaceColors'


// Convert a JS object to CSS string. Similar to React's output of CSS, extracted into a module.
export  default function object2css(colors,obj) {
  obj = replaceColors(colors,obj);
  let keys = Object.keys(obj)
  //if (!keys.length) return ''
  let i, len = keys.length
  let result = ''

  for (i = 0; i < len; i++) {
    let key = keys[i]
    let val = obj[key]
    result += hyphenate(key) + ':' + addPx(key, val) +"; "
  }
  return result
}
