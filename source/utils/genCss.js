/**
 * @fileoverview Generates CSS from style objects with selector support.
 * Handles pseudo-selectors, media queries, and nested selectors.
 * @module genCss
 */

import object2css from './object2css'

/**
 * Generates a CSS string from style definitions with selector support.
 * Handles three types of selectors:
 * - Media queries (@media, @keyframes, etc.)
 * - Pseudo-selectors (:hover, :focus, etc.)
 * - Nested selectors (child elements)
 * 
 * @param {Object} config - CSS generation configuration
 * @param {string} config.randomClassName - Generated unique class name
 * @param {Object} config.css - CSS selectors and their style objects
 * @param {Object} config.styleCSS - Full style definitions
 * @param {Object} [config.colors] - Color palette for replacements
 * @param {Object} [config.style] - Base inline styles
 * @param {string} config.styleName - Name of this style
 * @returns {string} Complete CSS string with all selectors
 * @example
 * genCss({
 *   randomClassName: 'react-outline-abc123',
 *   css: { ':hover': { color: 'blue' } },
 *   style: { padding: 10 }
 * })
 * // Returns: '.react-outline-abc123 { padding: 10px; } .react-outline-abc123:hover { color: blue; }'
 */
export default function genCss({ randomClassName, css, styleCSS, colors, style, styleName }) {

  let newStyle = (style) ? `.${randomClassName}{${object2css(colors, style)}}` : ""

  newStyle = Object.keys(css).reduce((cssString, propName) => {



    const styleContent = object2css(colors, css[propName]
                                        /*  || styleCSS[styleName].base
                                          && styleCSS[styleName].base[propName]
                                          || styleCSS[styleName][propName]*/);



    if (propName[0] === "@")
      return cssString + ` ${propName}{ .${randomClassName}{ ${styleContent} } } `
    else if (propName[0] === ":")
      return ` .${randomClassName}${propName}{ ${styleContent} } ` + cssString
    else
      return ` .${randomClassName} ${propName}{ ${styleContent} } ` + cssString
    //  else // skip unknown prop
    //      return cssString
  }, newStyle)

  return newStyle;
}
