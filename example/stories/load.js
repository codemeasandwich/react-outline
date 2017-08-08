
import sourceBasic from 'raw-loader!./Basics/CreatingAndApplyingAStyle.js?sourceMap';
import Basic from './Basics/CreatingAndApplyingAStyle';

import sourceBasic2 from 'raw-loader!./Basics/UsingTheTagCreater.js?sourceMap';
import Basic2 from './Basics/UsingTheTagCreater';

import sourceCombine from 'raw-loader!./CombineStyles/CreatingAndApplyingAStyle.js?sourceMap';
import Combine from './CombineStyles/CreatingAndApplyingAStyle';

import sourceCombine2 from 'raw-loader!./CombineStyles/UsingTheTagCreater.js?sourceMap';
import Combine2 from './CombineStyles/UsingTheTagCreater';

import sourceCombine3 from 'raw-loader!./CombineStyles/UsingAPropFlag.js?sourceMap';
import Combine3 from './CombineStyles/UsingAPropFlag';

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
  ]
}

export default tree
