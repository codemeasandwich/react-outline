/**
 * @fileoverview Main entry point for react-outline CSS-in-JS library.
 * Provides functions for creating styled React components with inline styles,
 * vendor prefixing, and CSS selector support.
 * @module react-outline
 */

import React from 'react'
import { pubsub, sanitizeOutlineInput } from './utils'

import wrapStylesFactory from './wrapStyles'
import Styles from './Styles'

/** @type {OutlineOptions} Global user-configured options */
const userSetOptions = { named: true/* prefix:getVendorPrefix()*/ }

const wrapStyles = wrapStylesFactory(userSetOptions)

//=====================================================
//============================= top Level - Wrap Styles
//=====================================================

/**
 * Main outline function to process style definitions into callable style functions.
 * Transforms style objects into functions that generate React inline styles.
 * 
 * @param {StyleDefinition} _styles - Style definitions with base styles and optional functions
 * @param {OutlineOptions} [options={}] - Configuration options
 * @returns {WrappedStyles} Object with style functions for each defined style
 * @example
 * const styles = outline({
 *   base: { button: { padding: 10 } },
 *   button: (base) => ({ ...base, color: 'blue' })
 * });
 * // Usage: <button style={styles.button()} />
 */
function outline(_styles, options = {}) {
  return sanitizeOutline(sanitizeOutlineInput(_styles, options), options)
}

/**
 * Internal function to wrap and finalize style definitions.
 * Applies user options and attaches color palette if provided.
 * 
 * @private
 * @param {StyleDefinition} _styles - Sanitized style definitions
 * @param {OutlineOptions} options - Configuration options
 * @returns {WrappedStyles} Wrapped style object with attached colors
 */
function sanitizeOutline(_styles, options) {

  const wrappedStyles = wrapStyles(_styles, options);
  wrappedStyles.colors = wrappedStyles.colors
    || options && options.colors
    || userSetOptions && userSetOptions.colors;
  return wrappedStyles;
}

//=====================================================
//============================================= Options
//=====================================================

/**
 * Creates a new outline function with preset options.
 * Useful for creating themed or scoped style processors.
 * 
 * @param {OutlineOptions} options - Options to preset (e.g., colors, caching)
 * @returns {function(StyleDefinition, OutlineOptions=): WrappedStyles} Configured outline function
 * @throws {Error} If options is falsy
 * @example
 * const themedOutline = withOptions({ colors: { primary: '#007bff' } });
 * const styles = themedOutline({ base: { btn: { color: '$primary' } } });
 */
function withOptions(options) {
  if (!options) throw new Error("Bad options values for react-outline:" + JSON.stringify(options))

  const tempOutlineFn = (_styles, optionsOrLogic) => sanitizeOutline(sanitizeOutlineInput(_styles, optionsOrLogic), options)
  if (options.colors) {
    tempOutlineFn.colors = options.colors
  }
  return tempOutlineFn;
}

/**
 * Sets global options for the default outline function.
 * Modifies the shared userSetOptions object.
 * 
 * @param {OutlineOptions} options - Options to merge into global settings
 * @throws {Error} If options is falsy
 * @example
 * setOptions({ colors: { primary: '#007bff' }, caching: true });
 */
function setOptions(options) {
  if (!options) throw new Error("Bad options values for react-outline:" + JSON.stringify(options))
  if (options.colors) {
    outline.colors = options.colors
  }
  Object.assign(userSetOptions, options)
}

/**
 * Testing utilities for react-outline.
 * @type {{resetCSS: function(): void}}
 */
const testing = {
  resetCSS: pubsub.clear
}

export default outline
export { withOptions, setOptions, Styles, testing }
