/*
 * @Description: 窗口
 * @Author: Achieve
 * @Date: 2019-12-16 13:12:53
 * @LastEditTime: 2019-12-16 13:17:27
 */
const { BrowserWindow } = require('electron')

class AppWindow extends BrowserWindow {
  constructor(urlLocation, config = {}) {
    const baseConfig = {
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      },
      show: false,
      backgroundColor: '#efefef'
    }
    const finalConfig = { ...baseConfig, ...config }
    super(finalConfig)
    this.loadURL(urlLocation)
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}

module.exports = AppWindow
