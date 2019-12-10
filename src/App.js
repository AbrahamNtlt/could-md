/*
 * @Description: 入口
 * @Author: Achieve
 * @Date: 2019-12-10 09:59:11
 * @LastEditTime: 2019-12-10 19:48:15
 */
import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import FileSearch from './components/FileSearch'

function App() {
  return (
    <div className="App container-fluid">
      <div className="row">
        <div className="col-3 left-panel">
          <FileSearch  onFileSearch={ ()=>{}}/>
        </div>
        <div className="col-9 left-panel bg-primary">
          <h1>右侧</h1>
        </div>
      </div>
    </div>
  )
}

export default App
