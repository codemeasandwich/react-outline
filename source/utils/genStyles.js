/**
 * @fileoverview Generates inline styles with vendor prefixes.
 * Uses static prefixer for consistent SSR output.
 * @module genStyles
 */

import { prefix as prefixAll } from 'inline-style-prefixer'

import replacedStyleFn from './replacedStyleFn'
import replaceColors from './replaceColors'

/**
 * Generates a style object with color replacements and vendor prefixes.
 * Uses the static prefixer to ensure consistent output between server and client,
 * preventing hydration mismatches in SSR environments.
 * 
 * @param {Object} styleStuff - Style configuration
 * @param {Object} styleStuff.styleCSS - CSS style definitions
 * @param {Function} styleStuff.styleFn - Dynamic style function
 * @param {Array} args - Arguments to pass to style function
 * @param {Object} [colors] - Color palette for color name replacements
 * @returns {Object} Style object with colors replaced and vendor prefixes applied
 * @example
 * genStyles(
 *   { styleCSS: { base: { transition: 'all 0.3s' } }, styleFn: () => ({}) },
 *   [],
 *   { primary: '#007bff' }
 * )
 * // Returns: { transition: 'all 0.3s', WebkitTransition: 'all 0.3s' }
 */
export default function genStyles(styleStuff, args, colors) {
  const userResult = replacedStyleFn(styleStuff, args);

  const swapedColor = replaceColors(colors, userResult);
  for (const name in swapedColor) {
    //if(!specialCharacters.includes(name[0]))
    const prefixed = prefixAll({ a: swapedColor[name] }).a;
    // inline-style-prefixer returns arrays for values with multiple fallbacks (e.g. gradients)
    // React inline styles don't support arrays, so use the last value (standard/unprefixed)
    swapedColor[name] = Array.isArray(prefixed) ? prefixed[prefixed.length - 1] : prefixed;
  }

  return swapedColor;
}

