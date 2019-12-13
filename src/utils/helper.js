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
