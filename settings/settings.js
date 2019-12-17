/*
 * @Description:设置
 * @Author: Achieve
 * @Date: 2019-12-16 14:21:01
 * @LastEditTime: 2019-12-17 09:36:31
 */
const { remote } = require('electron')
const Store = require('electron-store')
const settingsStore = new Store({
  name: 'Settings'
})
const $ = id => {
  return document.getElementById(id)
}

document.addEventListener('DOMContentLoaded', () => {
  let savedLocation = settingsStore.get('savedFileLocation') || ''
  if (savedLocation) {
    $('saved-file-location').value = savedLocation
  }
  $('select-new-location').addEventListener('click', () => {
    remote.dialog
      .showOpenDialog({
        properties: ['openDirectory'],
        message: '选择文件的存储路径'
      })
      .then(data => {
        if (!data.canceled && Array.isArray(data.filePaths)) {
          const path = data.filePaths[0]
          $('saved-file-location').value = path
          savedLocation = path
        }
      })
  })
  $('settings-form').addEventListener('submit', () => {
    settingsStore.set('savedFileLocation', savedLocation)
    remote.getCurrentWindow().close()
  })
})
