/**
 * @fileoverview Replaces color names with actual color values.
 * Enables semantic color naming in style definitions.
 * @module replaceColors
 */

/**
 * Replaces color name tokens with their actual color values.
 * Scans style property values and replaces any that match color palette keys.
 * 
 * @param {Object} [colors] - Color palette mapping names to values (e.g., { primary: '#007bff' })
 * @param {Object} style - Style object with potential color name tokens
 * @returns {Object} New style object with color names replaced by values
 * @example
 * replaceColors({ primary: '#007bff' }, { color: 'primary', padding: 10 })
 * // Returns: { color: '#007bff', padding: 10 }
 */
export default function (colors, style) {

  if (!colors) return style;
  const result = Object.assign({}, style)
  for (const key in result) {
    if (result[key] in colors) {
      result[key] = colors[result[key]];
    }
  }
  return result;
}
