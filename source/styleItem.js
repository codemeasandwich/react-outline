/**
 * @fileoverview Factory for creating style item generators.
 * Handles both element generation (tagged templates) and inline style generation.
 * @module styleItem
 */

import { hasKids, separateCssStyle, makeid, genCss, genStyles, pubsub } from './utils'
import element from './element'

//=====================================================
//========================================== build Elem
//=====================================================

/**
 * Builds a styled React element component from style configuration.
 * Separates CSS selectors from inline styles and publishes CSS to pubsub.
 * 
 * @private
 * @param {Object} config - Element configuration
 * @param {Array} config.elemName - Tagged template array containing element type
 * @param {Array} config.args - Additional arguments from tagged template
 * @param {Object} config.styleCSS - CSS style definitions
 * @param {string} config.styleName - Name of this style
 * @param {Object} config.options - Configuration options
 * @param {Object} config.replacedStyle - Style generator functions
 * @param {Object} [config.colors] - Color palette
 * @param {Function} config.styleFn - Dynamic style function
 * @returns {React.ComponentClass} Styled React component
 */
function buildElem({ elemName, args, styleCSS, styleName, options, replacedStyle, colors, styleFn }) {

  elemName = elemName[0] || args[1];
  let inlineStyle = null;//replacedStyle[styleName]();

  const baseStyle = styleCSS[styleName] && styleCSS[styleName].base || {}
  for (const propN in styleCSS[styleName]) {
    //if(specialCharacters.includes(propN[0]) || !!propN.match(new RegExp(`[${specialInnerCharacters}]`, "gi"))){
    if (/^[a-zA-Z0-9-]+$/.test(propN) === false) {
      baseStyle[propN] = styleCSS[styleName][propN]
    }
  }
  //splict ":" and "@" from all over styles
  const { css, style } = separateCssStyle(baseStyle);
  /*
  const cssPropNames = Object.keys(styleCSS[styleName])
                             .filter(stylePropName => stylePropName[0] === "@" ||  stylePropName[0] === ":");
  */
  let randomClassName = "";

  //if(0 < cssPropNames.length){
  if (css) {
    randomClassName = "react-outline-"
    if (!global.__TEST__) randomClassName += makeid(baseStyle);
    pubsub.publish(randomClassName, genCss({ randomClassName, css, styleCSS, colors, style, styleName }))
    inlineStyle = {};
  }

  return element({ elemName, css, styleCSS, inlineStyle, style, styleName, colors, randomClassName, options, replacedStyle, styleFn })
}

//=====================================================
//===================================== build Style Obj
//=====================================================

/**
 * Builds a style object, optionally using caching for performance.
 * 
 * @private
 * @param {Object} config - Build configuration
 * @param {Object} config.styleStuff - Style definitions and function
 * @param {Function} config.genStyles - Style generator function
 * @param {Array} config.args - Arguments to pass to style function
 * @param {Object} [config.colors] - Color palette
 * @param {boolean} config.caching - Whether to cache results
 * @param {Object} config.cached - Cache storage object
 * @returns {Object} Generated style object with vendor prefixes
 */
function buildStyleObj({ styleStuff, genStyles, args, colors, caching, cached }) {

  if (!caching) {
    return genStyles(styleStuff, args, colors);
  }
  // quick test
  if (cached.value && cached.source[0] === args[0] && cached.source[0] === args[1]) {
    return cached.value;
  }
  // deep test
  const key = "" + JSON.stringify(args[0]) + JSON.stringify(args[1])
  if (key === cached.key) {
    return cached.value;
  }

  cached.key = key;
  cached.source[0] = args[0];
  cached.source[1] = args[1];
  cached.value = genStyles(styleStuff, args, colors);
  return cached.value;

}

//=====================================================
//========================================== style Item
//=====================================================

/**
 * Creates a style item generator factory.
 * Returns a function that processes individual style names and creates their accessors.
 * 
 * @param {Object} config - Factory configuration
 * @param {Object} config._styles - Raw style definitions
 * @param {Object} config.replacedStyle - Object to populate with style functions
 * @param {Object} config.styleCSS - CSS style definitions
 * @param {Object} [config.colors] - Color palette
 * @param {Object} config.options - Configuration options
 * @param {boolean} config.caching - Whether to enable result caching
 * @param {Function} config.wrapStyles - Recursive style wrapper function
 * @returns {Function} Function that takes a styleName and creates its accessor
 */
export default function ({ _styles, replacedStyle, styleCSS, colors, options, caching, wrapStyles }) {

  //+++++++++++++++++++++++++++++++++++++ style function
  //++++++++++++++++++++++++++++++++++++++++++++++++++++
  return (styleName) => {

    /** @type {Function} Style function for this style, defaults to empty object */
    const styleFn = _styles[styleName] || (() => ({}));

    /** @type {{key: string|null, value: Object|null, source: Array}} Cache storage */
    const cached = { key: null, value: null, source: [] }

    /**
     * Style accessor function. Can be called two ways:
     * 1. As tagged template: styles.button`div` - creates a React component
     * 2. As function: styles.button() or styles.button(props) - returns style object
     * 
     * @param {...*} args - Tagged template array or style arguments
     * @returns {React.ComponentClass|Object} Component or style object
     */
    replacedStyle[styleName] = function (...args) {
      let elemName = args[0];

      //+++++++++++++++++++++++++++++++++++ build an element
      //++++++++++++++++++++++++++++++++++++++++++++++++++++

      if (Array.isArray(elemName) && elemName.hasOwnProperty("raw")) {
        return buildElem({ elemName, args, styleCSS, styleName, options, replacedStyle, colors, styleFn })
      } // elem gen

      //++++++++++++++++++++++++++++++++++++++ generat style
      //++++++++++++++++++++++++++++++++++++++++++++++++++++

      const styleStuff = { styleCSS: styleCSS[styleName], styleFn };

      return buildStyleObj({ styleStuff, genStyles, args, colors, caching, cached })
    } // END replacedStyle[styleName] = function(...args)

    //+++++++++++++++++++++++++++++++++ step down the tree
    //++++++++++++++++++++++++++++++++++++++++++++++++++++

    if (0 < Object.keys(styleFn).length || hasKids(styleCSS[styleName])) {
      Object.assign(replacedStyle[styleName], wrapStyles(styleFn, options, styleCSS[styleName]))
    }
  }
}
