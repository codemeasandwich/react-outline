"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = genCss;

var _object2css = require("./object2css");

var _object2css2 = _interopRequireDefault(_object2css);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function genCss(_ref) {
    var randomClassName = _ref.randomClassName,
        css = _ref.css,
        styleCSS = _ref.styleCSS,
        colors = _ref.colors,
        style = _ref.style,
        styleName = _ref.styleName;


    var newStyle = style ? "." + randomClassName + "{" + (0, _object2css2.default)(colors, style) + "}" : "";

    newStyle = Object.keys(css).reduce(function (cssString, propName) {

        var styleContent = (0, _object2css2.default)(colors, css[propName]
        /*  || styleCSS[styleName].base
          && styleCSS[styleName].base[propName]
          || styleCSS[styleName][propName]*/);

        if (propName[0] === "@") return cssString + (" " + propName + "{ ." + randomClassName + "{ " + styleContent + " } } ");else if (propName[0] === ":") return " ." + randomClassName + propName + "{ " + styleContent + " } " + cssString;else return " ." + randomClassName + " " + propName + "{ " + styleContent + " } " + cssString;
        //  else // skip unknown prop
        //      return cssString
    }, newStyle);

    return newStyle;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS91dGlscy9nZW5Dc3MuanMiXSwibmFtZXMiOlsiZ2VuQ3NzIiwicmFuZG9tQ2xhc3NOYW1lIiwiY3NzIiwic3R5bGVDU1MiLCJjb2xvcnMiLCJzdHlsZSIsInN0eWxlTmFtZSIsIm5ld1N0eWxlIiwiT2JqZWN0Iiwia2V5cyIsInJlZHVjZSIsImNzc1N0cmluZyIsInByb3BOYW1lIiwic3R5bGVDb250ZW50Il0sIm1hcHBpbmdzIjoiOzs7OztrQkFHd0JBLE07O0FBRnhCOzs7Ozs7QUFFZSxTQUFTQSxNQUFULE9BQXdFO0FBQUEsUUFBdkRDLGVBQXVELFFBQXZEQSxlQUF1RDtBQUFBLFFBQXRDQyxHQUFzQyxRQUF0Q0EsR0FBc0M7QUFBQSxRQUFsQ0MsUUFBa0MsUUFBbENBLFFBQWtDO0FBQUEsUUFBeEJDLE1BQXdCLFFBQXhCQSxNQUF3QjtBQUFBLFFBQWpCQyxLQUFpQixRQUFqQkEsS0FBaUI7QUFBQSxRQUFYQyxTQUFXLFFBQVhBLFNBQVc7OztBQUVyRixRQUFJQyxXQUFZRixLQUFELFNBQVlKLGVBQVosU0FBZ0MsMEJBQVdHLE1BQVgsRUFBa0JDLEtBQWxCLENBQWhDLFNBQTZELEVBQTVFOztBQUVBRSxlQUFXQyxPQUFPQyxJQUFQLENBQVlQLEdBQVosRUFBaUJRLE1BQWpCLENBQXlCLFVBQUNDLFNBQUQsRUFBV0MsUUFBWCxFQUF3Qjs7QUFJMUQsWUFBTUMsZUFBZSwwQkFBV1QsTUFBWCxFQUFrQkYsSUFBSVUsUUFBSjtBQUNIOzs0Q0FEZixDQUFyQjs7QUFPQSxZQUFHQSxTQUFTLENBQVQsTUFBZ0IsR0FBbkIsRUFDSSxPQUFPRCxtQkFBZ0JDLFFBQWhCLFdBQThCWCxlQUE5QixVQUFtRFksWUFBbkQsV0FBUCxDQURKLEtBRUssSUFBR0QsU0FBUyxDQUFULE1BQWdCLEdBQW5CLEVBQ0QsT0FBTyxPQUFLWCxlQUFMLEdBQXVCVyxRQUF2QixVQUFxQ0MsWUFBckMsV0FBMERGLFNBQWpFLENBREMsS0FHRCxPQUFPLE9BQUtWLGVBQUwsU0FBd0JXLFFBQXhCLFVBQXNDQyxZQUF0QyxXQUEyREYsU0FBbEU7QUFDTjtBQUNBO0FBQ0MsS0FuQlUsRUFtQlJKLFFBbkJRLENBQVg7O0FBcUJBLFdBQU9BLFFBQVA7QUFDRCIsImZpbGUiOiJnZW5Dc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBvYmplY3QyY3NzIGZyb20gJy4vb2JqZWN0MmNzcydcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2VuQ3NzKHtyYW5kb21DbGFzc05hbWUsIGNzcyxzdHlsZUNTUywgY29sb3JzLHN0eWxlLHN0eWxlTmFtZX0pe1xuXG4gIGxldCBuZXdTdHlsZSA9IChzdHlsZSk/YC4ke3JhbmRvbUNsYXNzTmFtZX17JHsgb2JqZWN0MmNzcyhjb2xvcnMsc3R5bGUpIH19YDpcIlwiXG5cbiAgbmV3U3R5bGUgPSBPYmplY3Qua2V5cyhjc3MpLnJlZHVjZSggKGNzc1N0cmluZyxwcm9wTmFtZSkgPT4ge1xuXG5cblxuICAgIGNvbnN0IHN0eWxlQ29udGVudCA9IG9iamVjdDJjc3MoY29sb3JzLGNzc1twcm9wTmFtZV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKiAgfHwgc3R5bGVDU1Nbc3R5bGVOYW1lXS5iYXNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiBzdHlsZUNTU1tzdHlsZU5hbWVdLmJhc2VbcHJvcE5hbWVdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCBzdHlsZUNTU1tzdHlsZU5hbWVdW3Byb3BOYW1lXSovKTtcblxuXG5cbiAgICBpZihwcm9wTmFtZVswXSA9PT0gXCJAXCIpXG4gICAgICAgIHJldHVybiBjc3NTdHJpbmcgKyBgICR7cHJvcE5hbWV9eyAuJHtyYW5kb21DbGFzc05hbWV9eyAkeyBzdHlsZUNvbnRlbnQgfSB9IH0gYFxuICAgIGVsc2UgaWYocHJvcE5hbWVbMF0gPT09IFwiOlwiKVxuICAgICAgICByZXR1cm4gYCAuJHtyYW5kb21DbGFzc05hbWV9JHtwcm9wTmFtZX17ICR7IHN0eWxlQ29udGVudCB9IH0gYCArIGNzc1N0cmluZ1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIGAgLiR7cmFuZG9tQ2xhc3NOYW1lfSAke3Byb3BOYW1lfXsgJHsgc3R5bGVDb250ZW50IH0gfSBgICsgY3NzU3RyaW5nXG4gIC8vICBlbHNlIC8vIHNraXAgdW5rbm93biBwcm9wXG4gIC8vICAgICAgcmV0dXJuIGNzc1N0cmluZ1xuICB9ICxuZXdTdHlsZSApXG5cbiAgcmV0dXJuIG5ld1N0eWxlO1xufVxuIl19