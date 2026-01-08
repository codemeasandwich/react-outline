/**
 * @fileoverview Factory function for creating styled React component classes.
 * Handles CSS class generation, inline styles, DOM events, and prop-based styling.
 * @module element
 */

import React from 'react'
import { findDOMNode } from 'react-dom'
import { genCss, pubsub, makeid } from './utils'

/**
 * Creates a styled React component class for a given element type.
 * The returned component handles CSS generation, inline styles, and DOM events.
 * 
 * @param {Object} config - Configuration for the styled component
 * @param {string|React.ComponentType} config.elemName - HTML tag name or React component
 * @param {Object} [config.css] - CSS selectors (pseudo-classes, media queries, etc.)
 * @param {Object} config.styleCSS - Full style definitions for the component
 * @param {Object} [config.inlineStyle] - Pre-computed inline styles
 * @param {Object} [config.style] - Base style object
 * @param {string} config.styleName - Name identifier for this style
 * @param {Object} [config.colors] - Color palette for color replacement
 * @param {string} [config.randomClassName] - Generated CSS class name
 * @param {Object} config.options - Configuration options (e.g., named)
 * @param {Object} config.replacedStyle - Object containing style generator functions
 * @param {Function} config.styleFn - Dynamic style function
 * @returns {React.ComponentClass} A React component class with styling capabilities
 */
export default function ({ elemName, css, styleCSS, inlineStyle, style, styleName, colors, randomClassName, options, replacedStyle, styleFn }) {

  /**
   * @class C2
   * @extends React.Component
   * @description Styled React component that manages CSS classes, inline styles, and DOM events.
   */
  class C2 extends React.Component {

    /**
     * Creates an instance of the styled component.
     * @param {Object} props - React component props
     */
    constructor(props) {
      super(props);
      /** @type {Object.<string, Function>} Map of event names to handler functions */
      this.eventHandlers = {};
      /** @type {string|null} Unique class name for instance-specific css prop (Issue #2) */
      this.instanceClassName = null;
    }

    /**
     * Creates an event handler function for a DOM event.
     * @private
     * @param {string} listen - Event name (e.g., 'click', 'scroll')
     * @param {Object} onDomEvent - Object mapping event names to handler functions
     * @returns {Function} Event handler that receives the DOM element and event
     */
    createEventHandler(listen, onDomEvent) {
      return (event) => onDomEvent[listen](this.domElem, event);
    }

    /**
     * Attaches DOM event listeners after component mounts.
     * Iterates through onDomEvent prop and adds listeners to the DOM element.
     */
    componentDidMount() {
      const onDomEvent = this.props.onDomEvent
      for (const listen in onDomEvent) {
        this.eventHandlers[listen] = this.createEventHandler(listen, onDomEvent);
        this.domElem.addEventListener(listen, this.eventHandlers[listen]);
      }
    }

    /**
     * Cleans up resources when component unmounts.
     * Removes instance-specific CSS and detaches DOM event listeners.
     */
    componentWillUnmount() {
      // Clean up instance-specific CSS (Issue #2)
      if (this.instanceClassName) {
        pubsub.publish(this.instanceClassName, null);
      }
      for (const listen in this.eventHandlers) {
        this.domElem.removeEventListener(listen, this.eventHandlers[listen]);
      }
    }

    /**
     * Renders the styled element with computed styles and classes.
     * Handles css prop overrides, prop flags, and dynamic style functions.
     * @returns {React.ReactElement} The rendered element
     */
    render() {

      const props = this.props

      if ("css" in props) {
        // Generate unique instance class for scoped css prop (Issue #2)
        if (!this.instanceClassName) {
          this.instanceClassName = "ro-" + makeid(props.css);
        }

        const updatedCss = Object.assign({}, css)

        for (const selectorRule in props.css) {
          updatedCss[selectorRule] = Object.assign({}, css[selectorRule], "function" === typeof props.css[selectorRule] ? props.css[selectorRule]() : props.css[selectorRule])
        }
        // Publish with compound selector (.shared.instance) for higher specificity
        pubsub.publish(this.instanceClassName, genCss({
          randomClassName: randomClassName + "." + this.instanceClassName,
          css: updatedCss, styleCSS, colors, style, styleName
        }))
      }

      const elemProps = Object.assign({}, props);
      // Delete style immediately - we'll set it properly below
      // This prevents invalid style values (non-objects) from reaching React
      delete elemProps.style;

      let passedTrueProps = Object.keys(props)
        .filter(name => props[name] === true && styleCSS[styleName] && name in styleCSS[styleName])
      //  console.log("passedTrueProps",passedTrueProps)
      if (0 < passedTrueProps.length) {
        passedTrueProps = passedTrueProps.reduce((styleProps, name) => {
          // If elem is a HTML type = Removed it Unknown prop `...` on <...> tag. Remove this prop from the element.
          if ("function" !== typeof elemName && "disabled" !== name) {
            delete elemProps[name]
          }
          return Object.assign(styleProps, { [name]: true })
        }, {})
      } else {
        passedTrueProps = null
      }

      if (passedTrueProps || props.hasOwnProperty("style")) {
        //if(props.style instanceof Object)
        //    passedTrueProps = Object.assign({},props.style,passedTrueProps);
        if (randomClassName) {
          // When CSS features are present, invoke styleFn for dynamic values
          // styleFn is always defined (default noop in styleItem.js)
          const dynamicResult = styleFn.length === 1
            ? styleFn(props.style)
            : styleFn(style || {}, props.style);

          // Apply prop-based styles (e.g., error: { color: "red" }) - Issue #3 fix
          let propFlagStyles = null;
          if (passedTrueProps && styleCSS[styleName]) {
            // passedTrueProps only contains props that exist in styleCSS[styleName] (pre-filtered at line 52-53)
            propFlagStyles = Object.keys(passedTrueProps).reduce((acc, propName) => {
              return Object.assign(acc, styleCSS[styleName][propName]);
            }, {});
          }

          if (dynamicResult && typeof dynamicResult === 'object' && Object.keys(dynamicResult).length > 0) {
            elemProps.style = Object.assign({}, propFlagStyles, dynamicResult);
          } else if (props.style && typeof props.style === 'object') {
            // Only pass through if it's a valid style object
            elemProps.style = Object.assign({}, propFlagStyles, props.style);
          } else if (propFlagStyles && Object.keys(propFlagStyles).length > 0) {
            elemProps.style = propFlagStyles;
          }
          // If neither condition met, style remains undefined (no inline style)
        } else {
          elemProps.style = replacedStyle[styleName](props.style, passedTrueProps);
        }

      } else {
        elemProps.style = inlineStyle || replacedStyle[styleName]();
      }
      //TODO: write a test for this
      // For some reason in prod!
      // a custom element in a perfect storm can have style undefined
      //SEE: test - should generated an element with css selector
      // thss is the same prod code.. BUT this is not catching this case :(
      if (elemProps.style &&
        Object.keys(elemProps.style).length === 0) {
        delete elemProps.style;
      }

      if (options.named) {
        elemProps.name = elemProps.name || styleName;
      }

      elemProps.className = elemProps.className || ""
      if (elemProps.className && randomClassName) {
        elemProps.className += " "
      }
      elemProps.className += randomClassName || ""
      // Add instance class for scoped css prop (Issue #2)
      if (this.instanceClassName) {
        elemProps.className += " " + this.instanceClassName;
      }
      if ("" === elemProps.className)
        delete elemProps.className;

      if (props.onDomEvent) {
        elemProps.ref = reatElem => this.domElem = findDOMNode(reatElem)
      }

      return React.createElement(elemName || styleName, elemProps, elemProps && elemProps.children)

    }
  }

  Object.defineProperty(C2, 'name', { value: styleName });

  return C2
}
