
import React, { useState, useEffect } from 'react'
import { pubsub, buildCssString } from './utils'

// TODO: make Styles a "ref" and manual set the content

function StylesElem(props) {
  const [cssString, setCssString] = useState(() => buildCssString(pubsub.get(), props));

  useEffect(() => {
    const updateCss = () => {
      setCssString(buildCssString(pubsub.get(), props));
    };

    pubsub.subscribe(updateCss);

    // Cleanup subscription on unmount
    return () => {
      // Note: pubsub.subscribe doesn't return an unsubscribe function in the current implementation
      // This is kept for future compatibility if unsubscribe is added
    };
  }, [props]);

  return <style>{cssString}</style>;
}

export default function Styles(props) {
  return React.createElement(StylesElem, props);
}

Styles.toString = () => buildCssString(pubsub.get())
