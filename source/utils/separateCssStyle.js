/**
 * @fileoverview Separates CSS selectors from inline style properties.
 * Splits style objects into inline-applicable styles and CSS-only selectors.
 * @module separateCssStyle
 */

/**
 * Separates style properties into CSS selectors and inline-applicable styles.
 * CSS selectors include pseudo-selectors (:hover), media queries (@media),
 * and nested element selectors (containing special characters).
 * 
 * @param {Object} styles - Combined style object with mixed properties
 * @returns {{css: Object|null, style: Object|null}} Separated style objects
 * @property {Object|null} css - CSS selectors (properties with special characters), null if empty
 * @property {Object|null} style - Inline styles (alphanumeric property names only), null if empty
 * @example
 * separateCssStyle({
 *   color: 'red',
 *   ':hover': { color: 'blue' },
 *   '@media (max-width: 600px)': { padding: 5 }
 * })
 * // Returns: {
 * //   style: { color: 'red' },
 * //   css: { ':hover': { color: 'blue' }, '@media (max-width: 600px)': { padding: 5 } }
 * // }
 */
export default function separateCssStyle(styles) {

  /** @type {Object} CSS selector properties */
  let css = {}
  /** @type {Object} Inline style properties */
  let style = {}

  for (const name in styles) {
    //if(specialCharacters.includes(name[0]) )//|| !!name.match(new RegExp(`[${specialInnerCharacters}]`, "gi")))
    //if (!/^\w+$/.test(name))
    if (!/^[a-zA-Z0-9-]+$/.test(name))
      css[name] = styles[name];
    else
      style[name] = styles[name];
  }

  if (0 === Object.keys(css).length)
    css = null;

  if (0 === Object.keys(style).length)
    style = null;

  return { css, style }
}
