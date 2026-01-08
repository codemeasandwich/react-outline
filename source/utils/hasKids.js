/**
 * @fileoverview Checks if a style object has nested child styles.
 * @module hasKids
 */

/**
 * Determines if a style object contains nested child style objects.
 * Used to decide whether to recursively process styles.
 * Ignores the 'base' property as it represents the element's own styles.
 * 
 * @param {Object} obj - Style object to check
 * @returns {boolean|undefined} True if nested objects exist, undefined otherwise
 * @example
 * hasKids({ base: {}, child: { color: 'red' } }) // Returns: true
 * hasKids({ base: {}, color: 'red' }) // Returns: undefined
 */
export default function hasKids(obj) {
  for (const name in obj) {
    if ("base" !== name && "object" === typeof obj[name])
      return true
  }
}
