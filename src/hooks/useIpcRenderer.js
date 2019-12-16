/*
 * @Description: 
 * @Author: Achieve
 * @Date: 2019-12-16 12:29:48
 * @LastEditTime: 2019-12-16 12:36:17
 */
import { useEffect } from 'react'
const { ipcRenderer } = window.require('electron')

const useIpcRenderer = callbackMap => {
  useEffect(() => {
    Object.keys(callbackMap).forEach(key => {
      ipcRenderer.on(key, callbackMap[key])
    })
    return () => {
      Object.keys(callbackMap).forEach(key => {
        ipcRenderer.removeListener(key, callbackMap[key])
      })
    }
  })
}

export default useIpcRenderer
