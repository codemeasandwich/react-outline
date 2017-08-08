

import React from 'react';
import { storiesOf, action, linkTo, setAddon } from "@kadira/storybook";
import { withInfo, setDefaults } from '@storybook/addon-info';
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

import Button from './Button';
import Welcome from './Welcome';

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));


for(const dir in tree){
  const files = tree[dir];
  const story = storiesOf(dir, module);
  files.forEach( data =>{
    const options = data.options || {}
    options.text = `~~~js
${htmlEscape(data.source)}
      ~~~`
    story.add(data.title,withInfo(options)( () => data.element ))
  })
}


storiesOf('Button', module)
 .add('with some emoji',
  withInfo('happy happy joy joy')(() => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>,{ source: true, inline: true } ))
 .add('foo bar',() => <Button onClick={action('bar')}>foo</Button> )
