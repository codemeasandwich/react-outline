import React from 'react'
import { render } from 'react-dom'
import {setOptions} from 'react-outline'
        setOptions({createElement:React.createElement})

import Ui from './ui/index.jsx';

// === create the element to attach react
const reactElement = document.createElement('div');
document.body.appendChild(reactElement);

render( <Ui /> ,  reactElement )
