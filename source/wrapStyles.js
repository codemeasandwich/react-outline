/**
 * @fileoverview Factory for creating style wrapper functions.
 * Processes style definitions and creates callable style accessors.
 * @module wrapStyles
 */

import styleItem from './styleItem'

//=====================================================
//========================================= wrap Styles
//=====================================================

/**
 * Creates a wrapStyles function with preset user options.
 * The returned function processes style definitions into callable style functions.
 * 
 * @param {Object} userSetOptions - Default options to apply
 * @param {boolean} [userSetOptions.named=true] - Whether to add name attribute to elements
 * @param {Object} [userSetOptions.colors] - Global color palette
 * @param {boolean} [userSetOptions.caching] - Enable style result caching
 * @returns {Function} wrapStyles function configured with user options
 */
export default function (userSetOptions) {
  /**
   * Processes style definitions into an object of style accessor functions.
   * Recursively handles nested styles and merges options.
   * 
   * @param {Object} _styles - Style definitions with base styles and functions
   * @param {Object} [options] - Options to merge with userSetOptions
   * @param {Object} [styleCSS] - Parent CSS definitions for nested styles
   * @returns {Object} Object with style accessor functions for each defined style
   */
  return function wrapStyles(_styles, options, styleCSS) {

    options = Object.assign({}, userSetOptions, options);
    //  const radium = !!options.radium;
    const caching = !!options.caching;
    const colors = options.colors;
    styleCSS = _styles.base || styleCSS
    const replacedStyle = {}
    if (_styles.base)
      replacedStyle.base = styleCSS;

    const styleItemGen = styleItem({ _styles, replacedStyle, styleCSS, colors, options, caching, wrapStyles })

    Object.keys(_styles)
      .concat(Object.keys(styleCSS))
      .filter((item, pos, a) => a.indexOf(item) === pos)
      .filter(styleName => "base" !== styleName)
      .forEach(styleItemGen)

    return replacedStyle
  }
}
