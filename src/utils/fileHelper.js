/*
 * @Description:
 * @Author: Achieve
 * @Date: 2019-12-12 14:18:57
 * @LastEditTime: 2019-12-14 12:02:41
 */
const fs = window.require('fs').promises

const fileHelper = {
  readFile: path => {
    return fs.readFile(path, { encoding: 'utf8' })
  },
  writeFile: (path, content) => {
    return fs.writeFile(path, content, { encoding: 'utf8' })
  },
  renameFile: (path, newPath) => {
    return fs.rename(path, newPath)
  },
  detleFile: path => {
    return fs.unlink(path)
  }
}

export default fileHelper
