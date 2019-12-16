/*
 * @Description:
 * @Author: Achieve
 * @Date: 2019-12-10 16:00:08
 * @LastEditTime: 2019-12-16 14:41:16
 */
const { app, Menu, ipcMain } = require('electron')
const isDev = require('electron-is-dev')
const menuTemplate = require('./src/menuTemplate')
const path = require('path')
const AppWindow = require('./src/AppWindow')

let mainWin, settingsWin

app.on('ready', () => {
  const url = isDev ? 'http://localhost:3000' : ''
  mainWin = new AppWindow(url, {
    width: 1024,
    height: 680
  })
  mainWin.on('closed', () => {
    mainWin = null
  })

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
    settingsWin.on('closed', () => {
      settingsWin = null
    })
  })
  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)
})
