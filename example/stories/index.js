

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
  inline: true,
  maxPropsIntoLine: 1,
  maxPropObjectKeys: 10,
  maxPropArrayLength: 10,
  maxPropStringLength: 100,
});

import Basic from './Basic';
import Button from './Button';
import Welcome from './Welcome';

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));
import source from 'raw-loader!./Basic.js?sourceMap';


storiesOf('HelloWorld', module)
  .add('Basic', withInfo(`~~~js
${htmlEscape(source)}
    ~~~`)(() => Basic));

storiesOf('Button', module)
 .add('with some emoji',
  withInfo('happy happy joy joy')(() => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>,{ source: true, inline: true } ))
 .add('foo bar',() => <Button onClick={action('bar')}>foo</Button> )
