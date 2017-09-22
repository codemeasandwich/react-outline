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
        var styleContent = (0, _object2css2.default)(colors, css[propName] || styleCSS[styleName].base && styleCSS[styleName].base[propName] || styleCSS[styleName][propName]);
        if (propName[0] === "@") return cssString + (" " + propName + "{ ." + randomClassName + "{ " + styleContent + " } } ");else if (propName[0] === ":") return " ." + randomClassName + propName + "{ " + styleContent + " } " + cssString;else return " ." + randomClassName + " " + propName + "{ " + styleContent + " } " + cssString;
        //  else // skip unknown prop
        //      return cssString
    }, newStyle);

    return newStyle;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS91dGlscy9nZW5Dc3MuanMiXSwibmFtZXMiOlsiZ2VuQ3NzIiwicmFuZG9tQ2xhc3NOYW1lIiwiY3NzIiwic3R5bGVDU1MiLCJjb2xvcnMiLCJzdHlsZSIsInN0eWxlTmFtZSIsIm5ld1N0eWxlIiwiT2JqZWN0Iiwia2V5cyIsInJlZHVjZSIsImNzc1N0cmluZyIsInByb3BOYW1lIiwic3R5bGVDb250ZW50IiwiYmFzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7a0JBR3dCQSxNOztBQUZ4Qjs7Ozs7O0FBRWUsU0FBU0EsTUFBVCxPQUF3RTtBQUFBLFFBQXZEQyxlQUF1RCxRQUF2REEsZUFBdUQ7QUFBQSxRQUF0Q0MsR0FBc0MsUUFBdENBLEdBQXNDO0FBQUEsUUFBbENDLFFBQWtDLFFBQWxDQSxRQUFrQztBQUFBLFFBQXhCQyxNQUF3QixRQUF4QkEsTUFBd0I7QUFBQSxRQUFqQkMsS0FBaUIsUUFBakJBLEtBQWlCO0FBQUEsUUFBWEMsU0FBVyxRQUFYQSxTQUFXOzs7QUFFckYsUUFBSUMsV0FBWUYsS0FBRCxTQUFZSixlQUFaLFNBQWdDLDBCQUFXRyxNQUFYLEVBQWtCQyxLQUFsQixDQUFoQyxTQUE2RCxFQUE1RTs7QUFFQUUsZUFBV0MsT0FBT0MsSUFBUCxDQUFZUCxHQUFaLEVBQWlCUSxNQUFqQixDQUF5QixVQUFDQyxTQUFELEVBQVdDLFFBQVgsRUFBd0I7QUFDMUQsWUFBTUMsZUFBZSwwQkFBV1QsTUFBWCxFQUFrQkYsSUFBSVUsUUFBSixLQUFpQlQsU0FBU0csU0FBVCxFQUFvQlEsSUFBcEIsSUFBNEJYLFNBQVNHLFNBQVQsRUFBb0JRLElBQXBCLENBQXlCRixRQUF6QixDQUE3QyxJQUFtRlQsU0FBU0csU0FBVCxFQUFvQk0sUUFBcEIsQ0FBckcsQ0FBckI7QUFDQSxZQUFHQSxTQUFTLENBQVQsTUFBZ0IsR0FBbkIsRUFDSSxPQUFPRCxtQkFBZ0JDLFFBQWhCLFdBQThCWCxlQUE5QixVQUFtRFksWUFBbkQsV0FBUCxDQURKLEtBRUssSUFBR0QsU0FBUyxDQUFULE1BQWdCLEdBQW5CLEVBQ0QsT0FBTyxPQUFLWCxlQUFMLEdBQXVCVyxRQUF2QixVQUFxQ0MsWUFBckMsV0FBMERGLFNBQWpFLENBREMsS0FHRCxPQUFPLE9BQUtWLGVBQUwsU0FBd0JXLFFBQXhCLFVBQXNDQyxZQUF0QyxXQUEyREYsU0FBbEU7QUFDTjtBQUNBO0FBQ0MsS0FWVSxFQVVSSixRQVZRLENBQVg7O0FBWUEsV0FBT0EsUUFBUDtBQUNEIiwiZmlsZSI6ImdlbkNzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IG9iamVjdDJjc3MgZnJvbSAnLi9vYmplY3QyY3NzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZW5Dc3Moe3JhbmRvbUNsYXNzTmFtZSwgY3NzLHN0eWxlQ1NTLCBjb2xvcnMsc3R5bGUsc3R5bGVOYW1lfSl7XG5cbiAgbGV0IG5ld1N0eWxlID0gKHN0eWxlKT9gLiR7cmFuZG9tQ2xhc3NOYW1lfXskeyBvYmplY3QyY3NzKGNvbG9ycyxzdHlsZSkgfX1gOlwiXCJcblxuICBuZXdTdHlsZSA9IE9iamVjdC5rZXlzKGNzcykucmVkdWNlKCAoY3NzU3RyaW5nLHByb3BOYW1lKSA9PiB7XG4gICAgY29uc3Qgc3R5bGVDb250ZW50ID0gb2JqZWN0MmNzcyhjb2xvcnMsY3NzW3Byb3BOYW1lXSB8fCBzdHlsZUNTU1tzdHlsZU5hbWVdLmJhc2UgJiYgc3R5bGVDU1Nbc3R5bGVOYW1lXS5iYXNlW3Byb3BOYW1lXSB8fCBzdHlsZUNTU1tzdHlsZU5hbWVdW3Byb3BOYW1lXSk7XG4gICAgaWYocHJvcE5hbWVbMF0gPT09IFwiQFwiKVxuICAgICAgICByZXR1cm4gY3NzU3RyaW5nICsgYCAke3Byb3BOYW1lfXsgLiR7cmFuZG9tQ2xhc3NOYW1lfXsgJHsgc3R5bGVDb250ZW50IH0gfSB9IGBcbiAgICBlbHNlIGlmKHByb3BOYW1lWzBdID09PSBcIjpcIilcbiAgICAgICAgcmV0dXJuIGAgLiR7cmFuZG9tQ2xhc3NOYW1lfSR7cHJvcE5hbWV9eyAkeyBzdHlsZUNvbnRlbnQgfSB9IGAgKyBjc3NTdHJpbmdcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBgIC4ke3JhbmRvbUNsYXNzTmFtZX0gJHtwcm9wTmFtZX17ICR7IHN0eWxlQ29udGVudCB9IH0gYCArIGNzc1N0cmluZ1xuICAvLyAgZWxzZSAvLyBza2lwIHVua25vd24gcHJvcFxuICAvLyAgICAgIHJldHVybiBjc3NTdHJpbmdcbiAgfSAsbmV3U3R5bGUgKVxuXG4gIHJldHVybiBuZXdTdHlsZTtcbn1cbiJdfQ==