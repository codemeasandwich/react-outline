/**
 * @fileoverview Normalizes and validates style input definitions.
 * Handles various input formats and applies cross-cutting (shared) styles.
 * @module sanitizeOutlineInput
 */

/**
 * Normalizes and validates style input into a consistent format.
 * Handles multiple input formats:
 * - { base: { button: {} }, button: () => {} } - Standard format with explicit base
 * - { button: { color: 'red' }, button: () => {} } - Shorthand, auto-creates base
 * - { 'button, link': { padding: 10 } } - Cross-cutting styles applied to multiple elements
 * 
 * @param {Object} _styles - Raw style definitions to normalize
 * @param {Object} [options={}] - Configuration options or style functions
 * @returns {Object} Normalized style object with { base: {}, ...styleFunctions }
 * @throws {Error} If _styles is not an object or contains invalid values
 * @example
 * // Shorthand input:
 * sanitizeOutlineInput({ button: { padding: 10 }, button: () => ({ color: 'blue' }) })
 * // Returns: { base: { button: { padding: 10 } }, button: () => ({ color: 'blue' }) }
 * 
 * // Cross-cutting styles:
 * sanitizeOutlineInput({ base: { 'button, link': { padding: 10 } } })
 * // Returns: { base: { button: { padding: 10 }, link: { padding: 10 } } }
 */
export default function sanitizeOutlineInput(_styles, options = {}) {

  if ("object" !== typeof _styles || Array.isArray(_styles)) {
    throw new Error("Bad style values: " + JSON.stringify(_styles))
  }

  if (!("base" in _styles)) {

    /** @type {Object} Base style definitions */
    const base = {};
    /** @type {Object} Style functions */
    const fns = {};

    //++++++++++++++ { table: {}, header:{} }, fn:{ () => }
    //++++++++++++++++++++++++++++++++++++++++++++++++++++

    let optionsIsFns = true;

    for (const prop in options) {
      if (options.hasOwnProperty(prop) && "function" !== typeof options[prop]) {
        optionsIsFns = false;
      }
    }

    if (optionsIsFns) {
      Object.assign(fns, options)
    }

    for (const prop in _styles) {
      //+++++++++++++++++++++++++++ { table: {}, header:{} }
      //++++++++++++++++++++++++++++++++++++++++++++++++++++
      if ("object" === typeof _styles[prop]) {
        base[prop] = _styles[prop]
        //++++++++++++++++++++++++++++++++++++++ { foo: () => }
        //++++++++++++++++++++++++++++++++++++++++++++++++++++
      } else if ("function" === typeof _styles[prop]) {
        fns[prop] = _styles[prop]
      } else {
        throw new Error("Bad style value: " + JSON.stringify(_styles[prop]))
      }
    }
    _styles = Object.assign({}, { base }, fns);
  }

  // Apply sharing (cross-cutting styles)
  for (const prop in _styles.base) {
    if (0 < prop.indexOf(',')) {
      prop.split(',')
        .map(x => x.trim())
        .forEach(x => {
          const root = _styles.base;
          var val = Object.assign({}, root[prop],
            // we need to check if x exists in root style.
            // e.g. "foo , bar" (cross cutting style) is in style Object
            // but "foo" & "bar" are functions
            root[x] && root[x].base ? root[x].base : root[x]);

          root[x] && root[x].base ? root[x].base = val : root[x] = val

        })
      delete _styles.base[prop]
    }
  }


  return _styles;
}
