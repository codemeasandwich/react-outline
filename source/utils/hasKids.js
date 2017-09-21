export default function hasKids(obj){
  for(const name in obj){
    if("base" !== name && "object" === typeof obj[name])
    return true
  }
}
