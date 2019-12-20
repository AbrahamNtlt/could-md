/*
 * @Description:设置
 * @Author: Achieve
 * @Date: 2019-12-16 14:21:01
 * @LastEditTime: 2019-12-17 09:36:31
 */
const { remote,ipcRenderer } = require('electron')
const Store = require('electron-store')
const settingsStore = new Store({
  name: 'Settings'
})
const qiniuConfigArr = [
  '#savedFileLocation',
  '#accessKey',
  '#secretKey',
  '#bucketName'
]
const $ = selector => {
  const relt = document.querySelectorAll(selector)
  return relt.length > 1 ? relt : relt[0]
}

document.addEventListener('DOMContentLoaded', () => {
  let savedLocation = settingsStore.get('savedFileLocation') || ''
  if (savedLocation) {
    $('#savedFileLocation').value = savedLocation
  }

  qiniuConfigArr.forEach(selector => {
    const savedValue = settingsStore.get(selector.substr(1))
    if (savedValue) {
      $(selector).value = savedValue
    }
  })

  $('#select-new-location').addEventListener('click', () => {
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
  $('#settings-form').addEventListener('submit', e => {
    e.preventDefault()
    qiniuConfigArr.forEach(selector => {
      if ($(selector)) {
        let { id, value } = $(selector)
        settingsStore.set(id, value ? value : '')
      }
    })
    ipcRenderer.send('config-is-saved')
    remote.getCurrentWindow().close()
  })
  $('.nav-tabs').addEventListener('click', e => {
    e.preventDefault()
    $('.nav-link').forEach(element => {
      element.classList.remove('active')
    })
    e.target.classList.add('active')
    $('.config-area').forEach(element => {
      element.style.display = 'none'
    })
    $(e.target.dataset.tab).style.display = 'block'
  })
})
