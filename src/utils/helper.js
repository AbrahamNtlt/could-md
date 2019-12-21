/*
 * @Description:
 * @Author: Achieve
 * @Date: 2019-12-12 13:36:52
 * @LastEditTime: 2019-12-13 16:25:37
 */
export const flattenArr = arr => {
  return arr.reduce((map, item) => {
    map[item.id] = item
    return map
  }, {})
}

export const objToArr = obj => {
  return Object.keys(obj).map(key => { 
    return obj[key]
  })
}


export const getParentNode =(node ,parentClass)=>{
  let current = node
  while(current !==null){
    if(current.classList.contains(parentClass)){
      return current
    }
    current = current.parentNode
  }
  return false
}
export const timestampToString = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
}