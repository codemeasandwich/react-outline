/**
 * @fileoverview Processes style functions and merges with base styles.
 * Handles prop-based style flags and dynamic style computation.
 * @module replacedStyleFn
 */

/**
 * Processes a style function with its base CSS and returns the merged result.
 * Handles both 1-argument and 2-argument style functions.
 * Also processes prop flags (e.g., { error: true }) to include matching styles.
 * 
 * @param {Object} styleConfig - Style configuration
 * @param {Object} [styleConfig.styleCSS] - Base CSS style definitions
 * @param {Function} styleConfig.styleFn - Dynamic style function
 * @param {Array} args - Arguments passed to the style function
 * @param {*} [args[0]] - First argument (passed to 1-arg styleFn, or as override props)
 * @param {Object} [args[1]] - Second argument (prop flags like { error: true })
 * @returns {Object} Merged style object combining base, auto-add styles, and function result
 * @example
 * // With 2-argument style function:
 * replacedStyleFn(
 *   { styleCSS: { base: { padding: 10 }, error: { color: 'red' } }, styleFn: (base, props) => base },
 *   [undefined, { error: true }]
 * )
 * // Returns: { padding: 10, color: 'red' }
 */
export default function replacedStyleFn({ styleCSS, styleFn/*,radium*/ }, args) {

  const processedStyles = 1 === styleFn.length ? styleFn(args[0]) : styleFn(styleCSS, args[0]);

  // const styleAsPropObj = 0===styleFn.length && "object" === typeof args[0] ? args[0] : {};
  // const styleBase = Object.assign({},styleCSS && styleCSS.base||styleCSS||{},styleAsPropObj)
  const styleBase = Object.assign({}, styleCSS && styleCSS.base || styleCSS || {})
  /*
    for(const stylePropName in styleBase){
      if(specialCharacters.includes(stylePropName[0]))
      delete styleBase[stylePropName];
    }
  */

  //const autoAddStyles = [], firstVal = args[1]// || args[0];
  const autoAddStyles = [], firstVal = args[1] || args[0];
  //console.log(args)
  if (!!firstVal && "object" === typeof firstVal) {
    Object.keys(firstVal)
      .forEach(cssName => {
        if (true === firstVal[cssName] && styleCSS && cssName in styleCSS)
          autoAddStyles.push(styleCSS[cssName])
        //  else // to bind style value to output obj
        //    autoAddStyles.push({cssName:firstVal[cssName]})
      });
  }

  return Object.assign({}, styleBase, ...autoAddStyles, processedStyles);
}
