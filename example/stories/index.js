import React from 'react';
import { storiesOf, action, linkTo } from "@kadira/storybook";
import { withInfo, setDefaults } from '@storybook/addon-info';

// addon-info
setDefaults({
  inline: true,
  maxPropsIntoLine: 1,
  maxPropObjectKeys: 10,
  maxPropArrayLength: 10,
  maxPropStringLength: 100,
});

import Button from './Button';
import Welcome from './Welcome';
storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

storiesOf('Button', module)
  .add('with text',
   withInfo('doc string about my component')(() => <Button onClick={action('clicked')}>Hello Button</Button> ))
  .add('with some emoji',
  withInfo('happy happy joy joy')(() => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button> ))
 .add('foo bar',() => <Button onClick={action('bar')}>foo</Button> )
