/*
 * @Description:
 * @Author: Achieve
 * @Date: 2019-12-12 14:18:57
 * @LastEditTime: 2019-12-13 17:13:55
 */
const fs = window.require('fs').promises

const fileHelper = {
  readFile(path) {
    return fs.readFile(path, { encoding: 'utf-8' })
  },
  writeFile(path, content) {
    return fs.readFile(path, content, { encoding: 'utf-8' })
  },
  renameFile(path, newPath) {
    return fs.rename(path, newPath)
  },
  detleFile(path) {
    return fs.unlink(path)
  }
}

export default fileHelper
