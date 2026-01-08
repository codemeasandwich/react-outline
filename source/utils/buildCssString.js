/**
 * @fileoverview Builds a CSS string from published style classes.
 * Used by the Styles component to render CSS in the DOM.
 * @module buildCssString
 */

/**
 * Combines all published CSS class values into a single CSS string.
 * Optionally appends custom CSS from component children.
 * 
 * @param {Object.<string, string>} classesValues - Map of class names to CSS strings
 * @param {Object} [props] - Component props
 * @param {string} [props.children] - Optional raw CSS to append
 * @returns {string} Combined CSS string with normalized whitespace
 * @example
 * buildCssString({ 'btn': '.btn { color: red; }' }, { children: '.custom {}' })
 * // Returns: '.btn { color: red; } .custom {}'
 */
export default function buildCssString(classesValues, props) {
  let css = Object.keys(classesValues).map(className => classesValues[className]).join(" ");
  css += props?.children || "";
  css = css.replace(/\n/g, ' ').replace(/\s+/g, ' ');
  return css
}
