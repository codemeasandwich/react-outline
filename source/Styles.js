/**
 * @fileoverview React component for rendering generated CSS styles.
 * Subscribes to style changes and renders them in a <style> tag.
 * Supports both client-side rendering and SSR via toString().
 * @module Styles
 */

import React, { useState, useEffect } from 'react'
import { pubsub, buildCssString } from './utils'

/**
 * Internal React component that renders CSS styles.
 * Subscribes to pubsub updates and re-renders when styles change.
 * 
 * @private
 * @param {Object} props - Component props
 * @param {string} [props.children] - Optional raw CSS to append
 * @returns {React.ReactElement} A <style> element containing all generated CSS
 */
function StylesElem(props) {
  const [cssString, setCssString] = useState(() => buildCssString(pubsub.get(), props));
  const pendingTimeout = React.useRef(null);

  useEffect(() => {
    /**
     * Callback to update CSS string when styles are published.
     * Uses setTimeout(0) to defer updates to the next event loop tick,
     * ensuring they run outside React's render phase.
     * @private
     */
    const updateCss = () => {
      // Clear any pending timeout to avoid duplicate updates
      if (pendingTimeout.current) {
        clearTimeout(pendingTimeout.current);
      }

      // Defer the state update to run after React's current render phase
      pendingTimeout.current = setTimeout(() => {
        pendingTimeout.current = null;
        setCssString(buildCssString(pubsub.get(), props));
      }, 0);
    };

    const unsubscribe = pubsub.subscribe(updateCss);

    // Cleanup subscription and pending timeouts on unmount
    return () => {
      if (pendingTimeout.current) {
        clearTimeout(pendingTimeout.current);
        pendingTimeout.current = null;
      }
      unsubscribe();
    };
  }, [props]);

  return <style>{cssString}</style>;
}



/**
 * Component wrapper for rendering CSS styles in the DOM.
 * Include this component in your React tree to inject generated CSS.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.children] - Optional raw CSS string to append to generated styles
 * @returns {React.ReactElement} StylesElem component
 * @example
 * // In your app root:
 * <Styles />
 * 
 * // With custom CSS:
 * <Styles>{`.custom-class { color: red; }`}</Styles>
 */
export default function Styles(props) {
  return React.createElement(StylesElem, props);
}

/**
 * Returns the current CSS string for server-side rendering.
 * Call this during SSR to get the CSS to inject into the HTML.
 * 
 * @returns {string} All generated CSS as a single string
 * @example
 * // In SSR context:
 * const css = Styles.toString();
 * // Inject into HTML: <style>${css}</style>
 */
Styles.toString = () => buildCssString(pubsub.get())
