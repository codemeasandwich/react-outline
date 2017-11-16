
import sourceBasic from 'raw-loader!./Basics/CreatingAndApplyingAStyle.js?sourceMap';
import Basic from './Basics/CreatingAndApplyingAStyle';

import sourceBasic2 from 'raw-loader!./Basics/UsingTheTagCreater.js?sourceMap';
import Basic2 from './Basics/UsingTheTagCreater';

import sourceBasic3 from 'raw-loader!./Basics/ImpliedTags.js?sourceMap';
import Basic3 from './Basics/ImpliedTags';

import sourceBasic4 from 'raw-loader!./Basics/WrappingAnExistingElement.js?sourceMap';
import Basic4 from './Basics/WrappingAnExistingElement';

import sourceBasic5 from 'raw-loader!./Basics/ReusingElements.js?sourceMap';
import Basic5 from './Basics/ReusingElements';

import sourceBasic6 from 'raw-loader!./Basics/PassingStyleAndFuntion.js?sourceMap';
import Basic6 from './Basics/PassingStyleAndFuntion';

import sourceBasic7 from 'raw-loader!./Basics/PassingStyleAndFuntionAsArray.js?sourceMap';
import Basic7 from './Basics/PassingStyleAndFuntionAsArray';

import sourceBasic8 from 'raw-loader!./Basics/Share.js?sourceMap';
import Basic8 from './Basics/Share';

import sourceCombine from 'raw-loader!./CombineStyles/CreatingAndApplyingAStyle.js?sourceMap';
import Combine from './CombineStyles/CreatingAndApplyingAStyle';

import sourceCombine2 from 'raw-loader!./CombineStyles/UsingTheTagCreater.js?sourceMap';
import Combine2 from './CombineStyles/UsingTheTagCreater';

import sourceCombine3 from 'raw-loader!./CombineStyles/UsingAPropFlag.js?sourceMap';
import Combine3 from './CombineStyles/UsingAPropFlag';

import sourceCombine4 from 'raw-loader!./CombineStyles/PassStyleObjToGenerateElement.js?sourceMap';
import Combine4 from './CombineStyles/PassStyleObjToGenerateElement';

import sourceCombine5 from 'raw-loader!./CombineStyles/LogicFnWithGenerateElement.js?sourceMap';
import Combine5 from './CombineStyles/LogicFnWithGenerateElement';

import sourceLogic from 'raw-loader!./RuntimeFunctions/DynamicStyles.js?sourceMap';
import Logic from './RuntimeFunctions/DynamicStyles';

import sourceLogic2 from 'raw-loader!./RuntimeFunctions/ModifyingStyles.js?sourceMap';
import Logic2 from './RuntimeFunctions/ModifyingStyles';

import sourceLogic3 from 'raw-loader!./RuntimeFunctions/FunctionWithOutStyle.js?sourceMap';
import Logic3 from './RuntimeFunctions/FunctionWithOutStyle';

import sourceLogic4 from 'raw-loader!./RuntimeFunctions/WithGeneratedElements.js?sourceMap';
import Logic4 from './RuntimeFunctions/WithGeneratedElements';

import sourceCss from 'raw-loader!./CSSHelpers/Hover.js?sourceMap';
import Css from './CSSHelpers/Hover';

import sourceCss2 from 'raw-loader!./CSSHelpers/MediaQuery.js?sourceMap';
import Css2 from './CSSHelpers/MediaQuery';

import sourceCss3 from 'raw-loader!./CSSHelpers/CssSource.js?sourceMap';
import Css3 from './CSSHelpers/CssSource';

import sourceCss4 from 'raw-loader!./CSSHelpers/VendorPrefix.js?sourceMap';
import Css4 from './CSSHelpers/VendorPrefix';

import sourceCss5 from 'raw-loader!./CSSHelpers/CssSelector.js?sourceMap';
import Css5 from './CSSHelpers/CssSelector';

import sourceCss6 from 'raw-loader!./CSSHelpers/DynamicCssSelectors.js?sourceMap';
import Css6 from './CSSHelpers/DynamicCssSelectors';


import sourceRef1 from 'raw-loader!./Ref/byFn.js?sourceMap';
import Ref1 from './Ref/byFn';

import sourceRef2 from 'raw-loader!./Ref/onEvent.js?sourceMap';
import Ref2 from './Ref/onEvent';

import sourceAnimate from 'raw-loader!./Animate/basic.js?sourceMap';
import Animate from './Animate/basic';

const tree = {
  Basics:[
    {
      title:'Creating and applying a style',
      source:sourceBasic,   element:Basic
    },
    {
      title:'Generate a element from a style',
      source:sourceBasic2,  element:Basic2,
      options: {propTables: false, source: false }
    },
    {
      title:'Wrapping an existing element',
      source:sourceBasic4,  element:Basic4,
      options: {propTables: false, source: false }
    },
    {
      title:'Generate an implied named element',
      source:sourceBasic3,  element:Basic3,
      options: {propTables: false, source: false }
    },
    {
      title:'Reusing elements',
      source:sourceBasic5,  element:Basic5,
      options: {propTables: false, source: false }
    },
    {
      title:'Passing Style and Funtion as arguments',
      source:sourceBasic6,  element:Basic6,
      options: {propTables: false, source: false }
    },
    {
      title:'Sharing Style',
      source:sourceBasic8,  element:Basic8,
      options: {propTables: false, source: false }
    },
    {
      title:'⚠ Passing Style and Funtion as Array',
      info:'⚠ This feature is deprecated and will be removed in a later version ⚠',
      source:sourceBasic7,  element:Basic7,
      options: {propTables: false, source: false }
    }

  ],
  "Combine styles":[
    {
      title:'Using the style function',
      source:sourceCombine,   element:Combine
    },
    {
      title:'In a generated element',
      source:sourceCombine2,   element:Combine2,
      options: {propTables: false, source: false }
    },
    {
      title:'Using a prop flag',
      source:sourceCombine3,   element:Combine3,
      options: {propTables: false, source: false }
    },
    {
      title:'Logic function With Generate Element',
      source:sourceCombine5,   element:Combine5,
      options: { propTables: false, source: false }
    }, // A work in progress
    {
      title:'Passing a Style objct to a generated element',
      source:sourceCombine4,   element:Combine4,
      options: { propTables: false, source: false }
    }
  ],
  "Style Functions":[
      {
        title:'Run-time control over your styles.',
        source:sourceLogic,   element:Logic
      },
      {
        title:'Modify existing styles',
        note:'If your funtion have 1 argument, it will be passed only the incoming arguments. With 2 arguments. The first will be the corresponding style and the second will be the incoming arguments.',
        source:sourceLogic2,   element:Logic2
      },
      {
        title:'Function dont need a style',
        source:sourceLogic3,   element:Logic3
      },
      {
        title:'Function with generated elements',
        source:sourceLogic4,   element:Logic4,
        options: {propTables: false, source: false }
      }
  ],
  "CSS Helpers":[
  {
     title:'Media Query',
     info: 'Resize your screen to less then 600px',
     source:sourceCss2,   element:Css2,
     options: {propTables: false, source: false }
  },
    {
       title:'Mouse hover',
       info: 'You need to include a react-outline Style tag at the top to your page',
       source:sourceCss,   element:Css,
       options: {propTables: false, source: false }
    },
    {
       title:'Css Source',
       source:sourceCss3,   element:Css3,
       options: {propTables: false }
    },
    {
       title:'Css Selector',
       source:sourceCss5,   element:Css5,
       options: {propTables: false , source: false }
    },
    {
       title:'Dynamic Css Selector',
       source:sourceCss6,   element:Css6,
       options: {propTables: false , source: false }
    },
    {
       title:'Vendor Auto-Prefix',
       info:"CSS vendor prefixes, also sometime known as or CSS browser prefixes, are a way for browser makers to add support for new CSS features before those features are fully supported in all browsers. It will only add prefixes if a property still needs them",
       source:sourceCss4,   element:Css4
    }
  ]
  ,"Reference dom element":[
    {
      title:'function with Dom Events',
      source:sourceRef2,   element:Ref2,
      info:"Any easy way to map 'event' names to functions",
      note:"**You pass an Object(mapping 'event' names to functions) as the 'onDomEvent' prop**",
      options: {propTables: false , source: false, test:false }
    },
    {
      title:'ref by function',
      source:sourceRef1,   element:Ref1,
      options: {propTables: false , source: false, test:false }
    }
  ]
  ,"Animate":[
    {
       title:'Animate.css',
       info: "Using [ReactCSSTransitionGroup](https://www.npmjs.com/package/react-addons-css-transition-group) and daneden's [animate.css](https://daneden.github.io/animate.css/)",
       source:sourceAnimate,   element:Animate,
       options: {propTables: false, source: false, test:false }
    },
  ]
}

export default tree
