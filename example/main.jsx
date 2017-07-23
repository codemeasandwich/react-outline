import React from 'preact'
import { render } from 'preact'

import Ui from './ui/index.jsx';

// === create the element to attach react
const reactElement = document.createElement('div');
document.body.appendChild(reactElement);

render( <Ui /> ,  reactElement )
