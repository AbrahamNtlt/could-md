/*
 * @Description:
 * @Author: Achieve
 * @Date: 2019-12-12 14:18:57
 * @LastEditTime: 2019-12-12 14:33:54
 */
const fs = require('fs').promises
const path = require('path')

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

module.exports = fileHelper
