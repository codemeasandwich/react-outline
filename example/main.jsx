import React from 'preact'
import { render } from 'preact'
import {setOptions} from 'react-outline'
        setOptions({createElement:React.createElement})

import Ui from './ui/index.jsx';

// === create the element to attach react
const reactElement = document.createElement('div');
document.body.appendChild(reactElement);

render( <Ui /> ,  reactElement )
