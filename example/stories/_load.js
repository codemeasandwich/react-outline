import preval from 'preval.macro'

const sourceBasic = preval`
  const fs = require('fs')
  module.exports = fs.readFileSync(__dirname + '/Basics/CreatingAndApplyingAStyle.js', 'utf8')
`

//import sourceBasic from 'raw-loader!./Basics/CreatingAndApplyingAStyle.js', 'utf8')

import Basic from './Basics/CreatingAndApplyingAStyle';

const sourceBasic2 = preval`
  const fs = require('fs')
  module.exports = fs.readFileSync(__dirname + '/Basics/UsingTheTagCreater.js', 'utf8')
`
import Basic2 from './Basics/UsingTheTagCreater';

const sourceBasic3 = preval`
  const fs = require('fs')
  module.exports = fs.readFileSync(__dirname + '/Basics/ImpliedTags.js', 'utf8')
`
import Basic3 from './Basics/ImpliedTags';

const sourceBasic4 = preval`
  const fs = require('fs')
  module.exports = fs.readFileSync(__dirname + '/Basics/WrappingAnExistingElement.js', 'utf8')
`
import Basic4 from './Basics/WrappingAnExistingElement';


const sourceCombine = preval`
  const fs = require('fs')
  module.exports = fs.readFileSync(__dirname + '/CombineStyles/CreatingAndApplyingAStyle.js', 'utf8')
`
import Combine from './CombineStyles/CreatingAndApplyingAStyle';

const sourceCombine2 = preval`
  const fs = require('fs')
  module.exports = fs.readFileSync(__dirname + '/CombineStyles/UsingTheTagCreater.js', 'utf8')
`
import Combine2 from './CombineStyles/UsingTheTagCreater';

const sourceCombine3 = preval`
  const fs = require('fs')
  module.exports = fs.readFileSync(__dirname + '/CombineStyles/UsingAPropFlag.js', 'utf8')
`
import Combine3 from './CombineStyles/UsingAPropFlag';

const sourceLogic = preval`
  const fs = require('fs')
  module.exports = fs.readFileSync(__dirname + '/RuntimeFunctions/DynamicStyles.js', 'utf8')
`
import Logic from './RuntimeFunctions/DynamicStyles';

const sourceLogic2 = preval`
  const fs = require('fs')
  module.exports = fs.readFileSync(__dirname + '/RuntimeFunctions/ModifyingStyles.js', 'utf8')
`
import Logic2 from './RuntimeFunctions/ModifyingStyles';

const sourceLogic3 = preval`
  const fs = require('fs')
  module.exports = fs.readFileSync(__dirname + '/RuntimeFunctions/FunctionWithOutStyle.js', 'utf8')
`
import Logic3 from './RuntimeFunctions/FunctionWithOutStyle';

const sourceLogic4 = preval`
  const fs = require('fs')
  module.exports = fs.readFileSync(__dirname + '/RuntimeFunctions/WithGeneratedElements.js', 'utf8')
`
import Logic4 from './RuntimeFunctions/WithGeneratedElements';

const sourceCss = preval`
  const fs = require('fs')
  module.exports = fs.readFileSync(__dirname + '/CSSHelpers/Hover.js', 'utf8')
`
import Css from './CSSHelpers/Hover';

const sourceCss2 = preval`
  const fs = require('fs')
  module.exports = fs.readFileSync(__dirname + '/CSSHelpers/MediaQuery.js', 'utf8')
`
import Css2 from './CSSHelpers/MediaQuery';

const sourceCss3 = preval`
  const fs = require('fs')
  module.exports = fs.readFileSync(__dirname + '/CSSHelpers/CssSource.js', 'utf8')
`
import Css3 from './CSSHelpers/CssSource';

const sourceAnimate = preval`
  const fs = require('fs')
  module.exports = fs.readFileSync(__dirname + '/Animate/basic.js', 'utf8')
`
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
       source:sourceCss3,   element:Css3,
       options: {propTables: false }
    }
  ]
  ,"animate":[
    {
       title:'Animate.css',
       info: "Using [ReactCSSTransitionGroup](https://www.npmjs.com/package/react-addons-css-transition-group) and daneden's [animate.css](https://daneden.github.io/animate.css/)",
       source:sourceAnimate,   element:Animate,
       options: {propTables: false, source: false, test:false }
    },
  ]
}

export default tree
