/*
 * @Description:
 * @Author: Achieve
 * @Date: 2019-12-10 16:00:08
 * @LastEditTime: 2019-12-17 17:28:23
 */
const { app, Menu, ipcMain, dialog } = require('electron')
const isDev = require('electron-is-dev')
const menuTemplate = require('./src/menuTemplate')
const path = require('path')
const AppWindow = require('./src/AppWindow')
const Store = require('electron-store')
const settingsStore = new Store({ name: 'Settings' })
const QiniuManager = require('./src/utils/QiniuManager')
let mainWin, settingsWin
const createManager = () => {
  const accessKey = settingsStore.get('accessKey')
  const secretKey = settingsStore.get('secretKey')
  const bucketName = settingsStore.get('bucketName')
  return new QiniuManager(accessKey, secretKey, bucketName)
}
app.on('ready', () => {
  const url = isDev ? 'http://localhost:3000' : ''
  mainWin = new AppWindow(url, {
    width: 1024,
    height: 680
  })
  mainWin.on('closed', () => {
    mainWin = null
  })
  let menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)
  ipcMain.on('open-settings-window', () => {
    const location = `file://${path.join(
      __dirname,
      './settings/settings.html'
    )}`
    settingsWin = new AppWindow(location, {
      width: 500,
      height: 400,
      parent: mainWin
    })
    settingsWin.removeMenu()
    settingsWin.on('closed', () => {
      settingsWin = null
    })
  })
  ipcMain.on('upload-file', (event, data) => {
    const manager = createManager()
    manager
      .uploadFile(data.key, data.path)
      .then(data => {
        console.log('上传成功', data)
        mainWin.webContents.send('active-file-uploaded')
      })
      .catch(() => {
        dialog.showErrorBox('同步失败', '请检查七牛云参数是否正确')
      })
  })
  ipcMain.on('config-is-saved', () => {
    let qiniuMenu =
      process.platform === 'darwin' ? menu.items[3] : menu.items[2]
    const switchItems = toggle => {
      ;[1, 2, 3].forEach(number => {
        qiniuMenu.submenu.items[number].enabled = toggle
      })
    }
    const qiniuIsConfiged = ['accessKey', 'secretKey', 'bucketName'].every(
      key => !!settingsStore.get(key)
    )
    if (qiniuIsConfiged) {
      switchItems(true)
    } else {
      switchItems(false)
    }
  })
})
