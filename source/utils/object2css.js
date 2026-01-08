/**
 * @fileoverview Converts JavaScript style objects to CSS strings.
 * Handles property name hyphenation and unit addition.
 * @module object2css
 */

import hyphenate from 'hyphenate-style-name'
import addPx from 'add-px-to-style'
import replaceColors from './replaceColors'

/**
 * Converts a JavaScript style object to a CSS declaration string.
 * Applies color replacements, hyphenates property names (camelCase to kebab-case),
 * and adds appropriate units (px for numeric values).
 * 
 * @param {Object} [colors] - Color palette for color name replacements
 * @param {Object} obj - Style object to convert
 * @returns {string} CSS declaration string (e.g., "color: red; padding: 10px;")
 * @example
 * object2css({ primary: '#007bff' }, { backgroundColor: 'primary', padding: 10 })
 * // Returns: 'background-color: #007bff; padding: 10px; '
 */
export default function object2css(colors, obj) {
  obj = replaceColors(colors, obj);
  let keys = Object.keys(obj)
  //if (!keys.length) return ''
  let i, len = keys.length
  let result = ''

  for (i = 0; i < len; i++) {
    let key = keys[i]
    let val = obj[key]
    result += hyphenate(key) + ':' + addPx(key, val) + "; "
  }
  return result
}
