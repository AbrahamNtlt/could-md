/*
 * @Description:
 * @Author: Achieve
 * @Date: 2019-12-10 16:00:08
 * @LastEditTime: 2019-12-10 16:07:12
 */
const { app, BrowserWindow } = require('electron')
const isDev = require('electron-is-dev')
let mainWin

app.on('ready', () => {
  mainWin = new BrowserWindow({
    width: 1024,
    height: 680,
    webPreferences: {
      nodeIntegration: true
    }
  })
  const url = isDev ? 'http://localhost:3000' : ''
  mainWin.loadURL(url)
})
