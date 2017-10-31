

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { storiesOf, action, linkTo, setAddon } from "@kadira/storybook";
import { withInfo, setDefaults } from '@storybook/addon-info';

import { html } from 'js-beautify'

function htmlEscape(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

// addon-info
setDefaults({
  inline: true
});

import tree from './load';

//import Button from './Button';
import Welcome from './Welcome';

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

const allElemes = [];

for(const dir in tree){
  const files = tree[dir];
  const story = storiesOf(dir, module);
  files.forEach( data =>{
    const options = data.options || {}
    options.text  = (data.info)?`**${data.info}**

---
` : ""

    options.text += `
~~~js
${htmlEscape(data.source)}
~~~`

    if(data.note){
      options.text += `
---
${data.note}

`
    }

// TODO: KEEP this to SHOW REAL render source <<<<<<<<
/*
options.text += `
---

~~~html
${htmlEscape(html(ReactDOMServer.renderToStaticMarkup(data.element)))}
~~~
`*/
    story.add(data.title,withInfo(options)( () => data.element ))
    allElemes.push(data.element)
  })
}

if (location.hostname === "localhost" || location.hostname === "127.0.0.1")
storiesOf('All', module)
  .add('all elements', () => (
    <div>{
      allElemes
    }</div>
  ));


/*
storiesOf('Button', module)
 .add('with some emoji',
  withInfo('happy happy joy joy')(() => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>,{ source: true, inline: true } ))
 .add('foo bar',() => <Button onClick={action('bar')}>foo</Button> )
*/
