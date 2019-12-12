/*
 * @Description:
 * @Author: Achieve
 * @Date: 2019-12-12 13:36:52
 * @LastEditTime: 2019-12-12 13:40:43
 */
export const flattenArr = arr => {
  return arr.reduce((map, item) => {
    map[item.id] = item
    return map
  }, {})
}

export const objTOArr = () => {
  return Object.keys(obj => {
    return key => obj[key]
  })
}
