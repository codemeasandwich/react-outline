![react-outline][logo]

[logo]: https://s3-eu-west-1.amazonaws.com/files.codemeasandwich.com/react-outline-logo2.png "react-outline logo"

## React-outline is a utility of managing your inline style.

react-outline was designed to more easly manage inline styles and better support server side rendering with complete styling.

[![npm version](https://badge.fury.io/js/react-outline.svg)](https://badge.fury.io/js/react-outline)
[![Build Status](https://github.com/codemeasandwich/react-outline/actions/workflows/publish.yml/badge.svg)](https://github.com/codemeasandwich/react-outline/actions/workflows/publish.yml)
[![Coverage Status](https://coveralls.io/repos/github/codemeasandwich/react-outline/badge.svg?branch=v2.1.0)](https://coveralls.io/github/codemeasandwich/react-outline?branch=v2.1.0)


Feathers:
* Cleaner JSX markup (without the styles)
* Easy creation of standered and custom element combining styles into the element
   * Easer debugging of element with injected name attributes
* Support a UI Color Palette
* Dynamically add vendor prefixes
* Cache calculated style
* Named elements (Generate element mapped to name prop in DOM)

# [Live Demo](https://s3.amazonaws.com/react-outline/index.html?down=0) / [Demo Source](https://github.com/codemeasandwich/react-outline/tree/master/example)

## Storybook Examples

### Basics
| Example | Description |
|---------|-------------|
| [Creating and applying a style](#creating-and-applying-a-style--basic-example-) | Define styles object, process with `outline()`, apply via `styles.title()` |
| [Generate element from style](#the-above-example-can-be-streamlined-using-the-tag-creater) | Use tagged template `styles.title\`div\`` to create styled components |
| [Wrapping existing elements](https://s3.amazonaws.com/react-outline/index.html?selectedKind=Basics&selectedStory=Wrapping%20an%20existing%20element) | Wrap React components: `styles.title\`${MyComponent}\`` |
| [Implied named elements](https://s3.amazonaws.com/react-outline/index.html?selectedKind=Basics&selectedStory=Generate%20an%20implied%20named%20element) | Style names matching HTML tags auto-infer element type |
| [Reusing elements](https://s3.amazonaws.com/react-outline/index.html?selectedKind=Basics&selectedStory=Reusing%20elements) | Use styled components multiple times |
| [Passing Style and Function](https://s3.amazonaws.com/react-outline/index.html?selectedKind=Basics&selectedStory=Passing%20Style%20and%20Funtion%20as%20arguments) | Pass styles and functions as separate args: `outline(styles, fns)` |
| [Sharing styles](https://s3.amazonaws.com/react-outline/index.html?selectedKind=Basics&selectedStory=Sharing%20Style) | Share across elements: `"title, content": { textShadow: "..." }` |

### Combine Styles
| Example | Description |
|---------|-------------|
| [Using style function](#the-attribute-flag-can-be-used-via-the-style-function) | Call with flags: `styles.title({error: true})` |
| [In generated element](#you-can-combine-attribute-of-a-style-by-using-a-boolean-flag) | Via style prop: `<Title style={{error:true}}>` |
| [Prop flags](https://s3.amazonaws.com/react-outline/index.html?selectedKind=Combine%20styles&selectedStory=Using%20a%20prop%20flag) | Boolean props: `<Title error>` |
| [Custom colors](https://s3.amazonaws.com/react-outline/index.html?selectedKind=Combine%20styles&selectedStory=Logic%20function%20With%20Generate%20Element) | Use `withOptions({colors:{...}})` for color mappings |
| [Pass style objects](https://s3.amazonaws.com/react-outline/index.html?selectedKind=Combine%20styles&selectedStory=Passing%20a%20Style%20objct%20to%20a%20generated%20element) | Raw CSS: `<Title style={{color:"red"}}>` |

### Style Functions
| Example | Description |
|---------|-------------|
| [Dynamic styles](#redux-outline-also-support-custom-function-to-have-run-time-control-over-your-styles) | Runtime computed styles via functions |
| [Modify existing styles](https://s3.amazonaws.com/react-outline/index.html?selectedKind=Style%20Functions&selectedStory=Modify%20existing%20styles) | 2-arg functions: `(style, props) => ({...})` |
| [Function without style](https://s3.amazonaws.com/react-outline/index.html?selectedKind=Style%20Functions&selectedStory=Function%20dont%20need%20a%20style) | Functions work without matching base style |
| [With generated elements](https://s3.amazonaws.com/react-outline/index.html?selectedKind=Style%20Functions&selectedStory=Function%20with%20generated%20elements) | Pass args via style prop: `<Group style={data.length}>` |

### CSS Helpers
| Example | Description |
|---------|-------------|
| [Media queries](https://s3.amazonaws.com/react-outline/index.html?selectedKind=CSS%20Helpers&selectedStory=Media%20Query) | `"@media (max-width: 600px)": {...}` - requires `<Styles/>` |
| [Hover states](https://s3.amazonaws.com/react-outline/index.html?selectedKind=CSS%20Helpers&selectedStory=Mouse%20hover) | `":hover": {...}` - requires `<Styles/>` |
| [CSS source](https://s3.amazonaws.com/react-outline/index.html?selectedKind=CSS%20Helpers&selectedStory=Css%20Source) | Raw CSS strings in `<Styles>` component |
| [CSS selectors](https://s3.amazonaws.com/react-outline/index.html?selectedKind=CSS%20Helpers&selectedStory=Css%20Selector) | Child selectors: `"div:nth-child(even)": {...}` |
| [Dynamic CSS](https://s3.amazonaws.com/react-outline/index.html?selectedKind=CSS%20Helpers&selectedStory=Dynamic%20Css%20Selector) | Runtime via `css` prop |
| [Vendor prefixes](https://s3.amazonaws.com/react-outline/index.html?selectedKind=CSS%20Helpers&selectedStory=Vendor%20Auto-Prefix) | Auto-prefixes for flex, transitions, etc. |

### Reference DOM Element
| Example | Description |
|---------|-------------|
| [DOM events](https://s3.amazonaws.com/react-outline/index.html?selectedKind=Reference%20dom%20element&selectedStory=function%20with%20Dom%20Events) | `onDomEvent={{'scroll': handler}}` |
| [Ref by function](https://s3.amazonaws.com/react-outline/index.html?selectedKind=Reference%20dom%20element&selectedStory=ref%20by%20function) | Access DOM via React refs |

### Animate
| Example | Description |
|---------|-------------|
| [Animate.css](https://s3.amazonaws.com/react-outline/index.html?selectedKind=Animate&selectedStory=Animate.css) | Integration with ReactCSSTransitionGroup |

---

## Table of Contents

1. [Creating and applying a style](#creating-and-applying-a-style--basic-example-)
2. [Generate a element from a style](#the-above-example-can-be-streamlined-using-the-tag-creater)
3. [Combine style attribute](#combine-style-attribute)
    1. [In a generated element](#you-can-combine-attribute-of-a-style-by-using-a-boolean-flag)
    2. [using the style function](#the-attribute-flag-can-be-used-via-the-style-function)
4. [Logic functions for run-time control of styles](#redux-outline-also-support-custom-function-to-have-run-time-control-over-your-styles)
5. [Setting the options](#setting-the-options)
    1. [setOptions](#-setOptions--function)
    2. [withOptions](#-withOptions--function)
6. [Using the options](#using-the-options)
    1. [caching](#caching)
    2. [colors](#colors)
    3. [named](#named)
7. [Comparisons](#comparisons)
    1. [styled-components](#styled-components)

### Quick Start

The simplest way to create styled components:

```JS
import outline from 'react-outline'

// Inline style schema - no nesting required!
const styles = outline({ 
  title: { fontSize: 25, backgroundColor: "red" } 
});

const Title = styles.title`div`

export default <Title>Hello World</Title>
// Renders: <div style={{ fontSize: 25, backgroundColor: "red" }}>Hello World</div>
```

### Creating and applying a style (Basic example)
```JS
import outline from 'react-outline'

const styles = outline({ 
  title: { fontSize: "25px" } 
});

export default (props) => <div style={styles.title()}>{props.text}</div>
// Renders: <div style={{ fontSize: "25px" }}>"hello"</div>
```

### Generate a styled element (Tag Creator)

```JS
import outline from 'react-outline'

const styles = outline({ title: { fontSize: "25px" } });

const Title = styles.title`div`

export default (props) => <Title>{props.text}</Title>
// Renders: <div style={{ fontSize: "25px" }}>"hello"</div>
```
### Combine style variants

Use `base` for default styles and add variants as sibling keys:

```JS
import outline from 'react-outline'

const styles = outline({ 
  title: {
    base: { fontSize: "25px" },
    error: { color: "#f00" }
  }
});

const Title = styles.title`div`

// Using a prop flag - cleanest!
export default <Title error>Something went wrong</Title>
// Renders: <div style={{ fontSize: "25px", color: "#f00" }}>...</div>
```

**Alternative syntaxes:**
```JS
// Via style prop
<Title style={{error: true}}>Error</Title>

// Via style function (inline)
<div style={styles.title({error: true})}>Error</div>
```

### Style Functions (Runtime Control)

Add functions to compute styles dynamically at runtime:

```JS
import outline from 'react-outline'

const styles = outline({ 
  content: { backgroundColor: "gray" },
  cell: { fontSize: 10 }
}, {
  // 1 arg: receives the passed value
  content: (count) => ({ height: `${count * 50}px` }),
  
  // 2 args: receives (baseStyle, passedValue)
  cell: (style, important) => ({ 
    fontSize: style.fontSize + (important ? 5 : -5) 
  })
});

const data = [
  { name: "foo", important: true },
  { name: "bar", important: false },
  { name: "baz" }
]

export default (
  <div style={styles.content(data.length)}>
    {data.map((item, i) => (
      <span key={i} style={styles.cell(item.important)}>{item.name}</span>
    ))}
  </div>
)
```

**With generated elements** - the `style` prop becomes the function argument:

```JS
const Group = styles.content`div`
const Cell = styles.cell`span`

export default (
  <Group style={data.length}>
    {data.map((item, i) => (
      <Cell key={i} style={item.important}>{item.name}</Cell>
    ))}
  </Group>
)
```
### Setting the options

There three mechanisms

1. `setOptions` is used to set the default options of all calls to `outline(...)`
2. `withOptions` is to custom the options for a specific instance of `outline(...)`
3. Pass an options object as the 2nd parameters to outline

#### "setOptions" function
```JS
import {setOptions} from 'react-outline'
        setOptions({caching:true,named:true})
```

#### "withOptions" function
```JS
import {withOptions} from 'react-outline'
const outline = withOptions({caching:true,named:true})
```

### Using the options

#### caching

>  **When enable, will case styled per element based on deep equal check**    
>  default to: `false`    
>  use: `{caching : true} ` (boolean)

#### colors
>  **When enable, will case styled per element based on deep equal check**    
>  default to: `undefined`    
>  use: ` {colors : { red500:#F44336, indigo500:#3F51B5 }} ` (object)

```JS
import {withOptions} from 'react-outline'

// Using material-ui colors codes
import {colors} from 'material-ui/styles';

const outline = withOptions({colors})

let styles = {
   base : {
      foo:{
        color:"deepPurple900"
      }
   }
 }
styles = outline(styles)
export default <div style={styles.foo}/>
/*
 <div style={{ backgroundColor:"#311B92" }} />
*/
```

#### named

>  **Helpful for debugging. Will add a `name` attribute Dom element if you use a [generated element](#you-can-combine-attribute-of-a-style-by-using-a-boolean-flag)**   
>  default to: `true`    
> use: ` {named : true} ` (boolean)

##### Using the named option

```JS
// Using the named option
import outline from 'react-outline'

let styles = {
 base : {
      page:{
        backgroundColor:"#eee"
      }
}

styles = outline(styles,{named:true}) // enable named elements
const Page = styles.page`div`         // create a div elemet with the 'page' style
export default Page                   // export the elemet

/*
 <div name="page" style={{ backgroundColor:"#eee" }} />
*/
```

### comparisons

#### styled components

I created react-outline becase of some shortcoming I found when trying to use styled-components in a new project. The problem's I addressed as:
1) Elements where replaced and the new css class name was changed on each render.
This was a problem with using [animate.css](https://daneden.github.io/animate.css/) + [ReactCSSTransitionGroup](https://www.npmjs.com/package/react-addons-css-transition-group) -> leaveActive.
The element would enter fine but just disappear immediately on leave.

React-outline supports ReactCSSTransitionGroup [Example](https://s3.amazonaws.com/react-outline/index.html?selectedKind=animate&selectedStory=Animate.css&full=0&down=0&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel)

2) You cant style exiting react of elements, only create new ones.

With React-outline you can create any element you what [Example](https://s3.amazonaws.com/react-outline/index.html?selectedKind=Basics&selectedStory=Generate%20a%20element%20from%20a%20style&full=0&down=0&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel) or style an existing one [Example](https://s3.amazonaws.com/react-outline/index.html?selectedKind=animate&selectedStory=Animate.css&full=0&down=0&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel)

3) No vendor prefixes support.

vendor prefixes support is provided by [inline-style-prefixer](https://www.npmjs.com/package/inline-style-prefixer) under the covers

4) The style must be in a CSS string. Then makes moving existing inline style object to CSS is time time consuming

Checkout any of the code here [examples](https://s3.amazonaws.com/react-outline/index.html?down=0)


## Contributing

Feature requests can be made using [Github issues](https://github.com/codemeasandwich/react-outline/issues)

Pull requests are totally encouraged and you are welcome to contribute to the development of `react-outline`. Please do raise an issue before making a pull request so as to determine if a particular feature is already being worked on or is currently out of the scope of this project.

1. [Fork react-outline](https://github.com/codemeasandwich/react-outline/fork)
2. Create a feature branch (git checkout -b my-new-feature)
3. Write tests
4. Ensure the code is covered
5. Add story to the example storybook
6. Commit your changes
7. Push to your branch
8. Make a pull request

### Testing Process

The project requires **100% code coverage** before publishing to npm.

- **New features** must include a Storybook example. These examples automatically become tests.
- **Edge cases** are validated in `cornerCases.test.js` to ensure comprehensive coverage.
- Run `npm run test:cover` to check coverage before submitting a PR.

