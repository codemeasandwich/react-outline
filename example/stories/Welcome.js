import React from 'react';
import outline from 'react-outline'
import { Styles, setOptions} from 'react-outline'

const css = {
    article:{
      base:{
        background:"linear-gradient(to bottom, rgb(26,154,218) 0%,rgb(13,131,190) 100%)",
        padding: "10px"
      },
      ":hover":{
        background:"linear-gradient(to bottom, rgb(24, 142, 202) 0%,rgb(12, 118, 171) 100%)"
      }
    }
}

const styles = outline([css]);

const Panel = styles.article``

export default class Welcome extends React.Component {
  showApp(e) {
    e.preventDefault();
    if(this.props.showApp) this.props.showApp();
  }

  render() {
    return (<div>
      <Styles>{`

      *{
        font-family: arial,sans-serif;
      }

      `}</Styles>
<a href="https://www.npmjs.com/package/react-outline">
      <img alt="react-outline" title="react-outline logo" src="https://s3-eu-west-1.amazonaws.com/files.codemeasandwich.com/react-outline-logo2.png"/></a>
        <h1>React-outline is a utility of managing your inline style</h1>
        <h2>
          react-outline was designed to more easly manage inline styles and better support server side rendering with complete styling
        </h2>
        <p>Feathers:</p>
        <ul>
        <li>Cleaner JSX markup (without the styles)</li>
        <li>Easy creation of standered and custom element combining styles into the element
        <ul>
        <li>Easer debugging of element with injected name attributes</li>
        </ul>
        </li>
        <li>Support a UI Color Palette</li>
        <li>Dynamically add vendor prefixes</li>
        <li>Cache calculated style</li>
        </ul>

      </div>
    );
  }
}

/*
<p> ... </p>
<p> ... </p>
<p> ... </p>
<p> ... </p>

<p>
  Weve added some basic stories inside the <code >src/stories</code> directory.
  <br/>
  A story is a single state of one or more UI components. You can have as many stories as you want.
  <br/>
  (Basically a story is like a visual test case.)
</p>
<p>
  See these sample <a  href='#' onClick={this.showApp.bind(this)}>stories</a> for a component called <code >Button</code>.
</p>
<p>
  Just like that, you can add your own components as stories.
  <br />
  You can also edit those components and see changes right away.
  <br />
  (Try editing the <code >Button</code> component
  located at <code >src/stories/Button.js</code>.)
</p>
<p>
  This is just one thing you can do with Storybook.
  <br/>
  Have a look at the <a  href="https://github.com/kadirahq/react-storybook" target="_blank">React Storybook</a> repo for more information.
</p>

*/
