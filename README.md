![react-outline][logo]

[logo]: https://s3-eu-west-1.amazonaws.com/files.codemeasandwich.com/react-outline-logo2.png "react-outline logo"

## React-outline is a utility of managing your inline style.

react-outline was designed to more easly manage inline styles and better support server side rendering with complete styling.

Feathers:
* Cleaner JSX markup (without the styles)
* Easy creation of standered and custom element combining styles into the element
   * Easer debugging of element with injected name attributes
* Support a UI Color Palette
* Dynamically add vendor prefixes
* Cache calculated style

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
    1. [radium](#radium)
    2. [caching](#caching)
    3. [colors](#colors)
    4. [named](#named)
7. [A 'kitchen sink' example](#a--kitchen-sink--example)

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
#### radium
>  **Will return the style in an array format compatible with [radium](https://www.npmjs.com/package/radium)**    
> default to : `false`    
> use: `{radium : true} ` (boolean)

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
>  default to: `false`    
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

## A 'kitchen sink' example

```JS

import outline, {setOptions} from 'react-outline'
setOptions({caching:true, named:true })

//=====================================================
//============================================== styles
//=====================================================

let styles = {
  style : {
    Body:{ padding:10 },
    button:{  backgroundColor:"red"  },
    table:{
      style: { width: "100%", height: "100%"},
      row:{ yourboth:"rowrow" },
      cell:{
        style: { padding:10 },
        error:{ color:"red" , padding:20},
        button:{ backgroundColor:"blur" }
     }
    }
  }
};

styles.random = ()=>({foo:"bar"})
styles.table = ()=> {}
styles.table.row = ()=>({abc:123})
styles.table.cell = (style,vals)=> (vals && vals.error)?{font:"bold",color:"blue"}:null

styles = wrapStyles(styles)

const Cell = styles.table.cell`td`
const MyButton = styles.table.cell.button`${Button}`

 <Cell colSpan="2" style={{error:true}}>
```
