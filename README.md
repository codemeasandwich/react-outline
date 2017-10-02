![react-outline][logo]

[logo]: https://s3-eu-west-1.amazonaws.com/files.codemeasandwich.com/react-outline-logo2.png "react-outline logo"

## React-outline is a utility of managing your inline style.

react-outline was designed to more easly manage inline styles and better support server side rendering with complete styling.

[![npm version](https://badge.fury.io/js/react-outline.svg)](https://badge.fury.io/js/react-outline)
[![Build Status](https://travis-ci.org/codemeasandwich/react-outline.svg?branch=master)](https://travis-ci.org/codemeasandwich/react-outline)
[![Coverage Status](https://coveralls.io/repos/github/codemeasandwich/react-outline/badge.svg?branch=master)](https://coveralls.io/github/codemeasandwich/react-outline?branch=master)


Feathers:
* Cleaner JSX markup (without the styles)
* Easy creation of standered and custom element combining styles into the element
   * Easer debugging of element with injected name attributes
* Support a UI Color Palette
* Dynamically add vendor prefixes
* Cache calculated style
* Named elements (Generate element mapped to name prop in DOM)

# [Live Demo](https://s3.amazonaws.com/react-outline/index.html?down=0) / [Demo Source](https://github.com/codemeasandwich/react-outline/tree/master/example)

Examples
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

### Creating and applying a style (Basic example)
```JS
import outline from 'react-outline'

let styles = {
    base : {
      title:{ fontSize: "25px" }
    }
}
styles = outline(styles);

export default (props) => <div style={styles.title()}>{props.text}</div>
/*
 props === { text:"hello" }
<div style={{ fontSize: "25px" }}>"hello"</div>
*/
```

### The above example can be streamlined using the tag creater

```JS
import outline from 'react-outline'

let styles = {
    base : {
      title:{ fontSize: "25px" }
    }
}
styles = outline(styles);

const Title = styles.title`div`

export default (props) => <Title>{props.text}</Title>
/*
 props === { text:"hello" }
<div style={{ fontSize: "25px" }}>"hello"</div>
*/
```
### Combine style attribute
#### You can combine attribute of a style by using a boolean flag

```JS
import outline from 'react-outline'

let styles = {
    base : {
      title:{
        base:{fontSize: "25px" },
        error:{color:"#f00" }
      }
    }
}
styles = outline(styles);

const Title = styles.title`div`

export default (props) => <Title style={{error:!!props.error}}>{props.text}</Title>

/*
 props === { text:"hello", error:true }
<div style={{ fontSize: "25px", color:"#f00" }}>"hello"</div>
*/

```
#### The attribute flag can be used via the style function
```JS
<div style={styles.title({error:!!props.error})}>{props.text}</div>

```

### redux-outline also support custom function. To have run-time control over your styles.

NOTE:   
If your funtion have **1** argument, it will be passed only the incoming arguments.    
With **2** arguments. The first will be the corresponding style and the second will be the incoming arguments.

```JS
import outline from 'react-outline'

let styles = {
    base : {
      content:{
        backgroundColor:"gray"
      }
      cell:{
        fontSize:10
      }
    }    
}

styles.content = (numberOfCells) => { height : `${numberOfCells*100}px` }
styles.cell = (style,important) => { fontSize : style.fontSize + (important)?5:-5 }

styles = outline(styles);

export default () => {

const data = [{name:"foo",important:true},
              {name:"bar",important:false},
              {name:"cat"}]

return (<div style={styles.content(data.length)}> {
            data.map( cellData => <span styles={styles.cell(cellData.important)}>{cellData.name}</span> )
        } </div>)
}

/*
<div style={{ backgroundColor:"gray", height : "300px" }}>
  <span style={{ fontSize : 15 }}> foo </span>
  <span style={{ fontSize : 5 }}>  bar </span>
  <span style={{ fontSize : 10 }}> cat </span>
</div>
*/

```

👌 Dont forget! [Generated element](#you-can-combine-attribute-of-a-style-by-using-a-boolean-flag) will have there `style` prop used as the [style function](#redux-outline-also-support-custom-function-to-have-run-time-control-over-your-styles) argument.

```JS

/*
 Same as above !!
*/

styles = outline(styles);

const Group = styles.content`div`
const Cell = styles.cell`span`

export default () => {

const data = [{name:"foo",important:true},
              {name:"bar",important:false},
              {name:"cat"}]

return (<Group style={data.length}> {
            data.map( cellData => <Cell styles={cellData.important}>{cellData.name}</Cell> )
        } </Group>)
}

/*
<div style={{ backgroundColor:"gray", height : "300px" }}>
  <span style={{ fontSize : 15 }}> foo </span>
  <span style={{ fontSize : 5 }}>  bar </span>
  <span style={{ fontSize : 10 }}> cat </span>
</div>
*/

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
2. Create a feature branch (git checkout -b my-new-fature)
3. Write tests
4. Ensure the code the covered
3. Add story to the example storybook
5. Commit your changes
6. Push to your branch
7. Make a pull request
