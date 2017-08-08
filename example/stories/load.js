
import sourceBasic from 'raw-loader!./Basics/CreatingAndApplyingAStyle.js?sourceMap';
import Basic from './Basics/CreatingAndApplyingAStyle';

import sourceBasic2 from 'raw-loader!./Basics/UsingTheTagCreater.js?sourceMap';
import Basic2 from './Basics/UsingTheTagCreater';

import sourceBasic3 from 'raw-loader!./Basics/ImpliedTags.js?sourceMap';
import Basic3 from './Basics/ImpliedTags';

import sourceBasic4 from 'raw-loader!./Basics/WrappingAnExistingElement.js?sourceMap';
import Basic4 from './Basics/WrappingAnExistingElement';


import sourceCombine from 'raw-loader!./CombineStyles/CreatingAndApplyingAStyle.js?sourceMap';
import Combine from './CombineStyles/CreatingAndApplyingAStyle';

import sourceCombine2 from 'raw-loader!./CombineStyles/UsingTheTagCreater.js?sourceMap';
import Combine2 from './CombineStyles/UsingTheTagCreater';

import sourceCombine3 from 'raw-loader!./CombineStyles/UsingAPropFlag.js?sourceMap';
import Combine3 from './CombineStyles/UsingAPropFlag';

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
      title:'Generate an implied named element',
      source:sourceBasic3,  element:Basic3,
      options: {propTables: false, source: false }
    },
    {
      title:'Wrapping an existing element',
      source:sourceBasic4,  element:Basic4,
      options: {propTables: false, source: false }
    },

  ],
  "Combine styles":[
    {
      title:'In a generated element',
      source:sourceCombine,   element:Combine
    },
    {
      title:'Using the style function',
      source:sourceCombine2,   element:Combine2,
      options: {propTables: false, source: false }
    },
    {
      title:'Using a prop flag',
      source:sourceCombine3,   element:Combine3,
      options: {propTables: false, source: false }
    },
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
       title:'Mouse hover',
       info: 'You need to include a react-outline Style tag at the top to your page',
       source:sourceCss,   element:Css,
       options: {propTables: false, source: false }
    },
    {
       title:'Media Query',
       info: 'Resize your screen to less then 600px',
       source:sourceCss2,   element:Css2,
       options: {propTables: false, source: false }
    },
    {
       title:'Css Source',
       source:sourceCss3,   element:Css3
    }
  ]
}

export default tree
