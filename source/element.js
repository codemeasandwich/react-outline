
import React from 'react'
import { genCss, pubsub } from './utils'



var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




export default function({elemName, css,styleCSS,inlineStyle,style,styleName, colors, randomClassName, options,replacedStyle}){




  const C2 = function (_React$Component) {
    _inherits(C2, _React$Component);

    function C2() {
      _classCallCheck(this, C2);

      return _possibleConstructorReturn(this, (C2.__proto__ || Object.getPrototypeOf(C2)).apply(this, arguments));
    }

    _createClass(C2, [{
      key: 'render',
      value: function render() {



  const props = this.props

      if("css" in props){

        const updatedCss = Object.assign({},css)

        for(const selectorRule in props.css){
          updatedCss[selectorRule] = Object.assign({},css[selectorRule], "function" === typeof props.css[selectorRule] ? props.css[selectorRule]() : props.css[selectorRule])
        }
        pubsub.publish(randomClassName, genCss({randomClassName, css:updatedCss,styleCSS, colors,style,styleName}))
      }

      const elemProps = Object.assign({},props);

    let passedTrueProps = Object.keys(props)
                                .filter( name => props[name] === true && styleCSS[styleName] && name in styleCSS[styleName] )
    //  console.log("passedTrueProps",passedTrueProps)
    if(0 < passedTrueProps.length){
      passedTrueProps = passedTrueProps.reduce((styleProps, name) => {
        // If elem is a HTML type = Removed it Unknown prop `...` on <...> tag. Remove this prop from the element.
        if("function" !== typeof elemName && "disabled" !== name){
          delete elemProps[name]
        }
        return Object.assign(styleProps,{[name]:true})
      },{})
    } else {
      passedTrueProps = null
    }
      if(passedTrueProps || props.hasOwnProperty("style")){
        //if(props.style instanceof Object)
        //    passedTrueProps = Object.assign({},props.style,passedTrueProps);
        elemProps.style = replacedStyle[styleName](props.style,passedTrueProps);
      } else {
        elemProps.style = inlineStyle || replacedStyle[styleName]();
      }

      if(Object.keys(elemProps.style).length === 0){
         delete elemProps.style;
      }

      if(options.named){
        elemProps.name = elemProps.name || styleName;
      }

        elemProps.className  = elemProps.className || ""
        if(elemProps.className && randomClassName){
          elemProps.className += " "
        }
        elemProps.className += randomClassName || ""
        if("" === elemProps.className)
            delete elemProps.className;

      return React.createElement(elemName||styleName,elemProps,elemProps && elemProps.children)


          }
        }]);

        return C2;
      }(React.Component);

return C2


}
