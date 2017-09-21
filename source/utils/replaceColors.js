export default function (colors,style){

  if(!colors) return style;
  const result = Object.assign({},style)
  for(const key in result ){
    if(result[key] in colors){
      result[key] = colors[result[key]];
    }
  }
  return result;
}
