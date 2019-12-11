/*
 * @Description: 入口
 * @Author: Achieve
 * @Date: 2019-12-10 09:59:11
 * @LastEditTime: 2019-12-11 13:30:12
 */
import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'
import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import ButtomBtn from './components/ButtomBtn'

function App() {
  let files = [
    {
      id: '1',
      title: 'first post',
      body: 'showbe',
      createAt: 12312312
    },
    {
      id: '2',
      title: 'sected post',
      body: 'showbe22',
      createAt: 1231313
    }
  ]
  const openClickedFile = () => {}
  const deteleFile = () => {}
  const saveEdit = (id, newVal) => {}

  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3 left-panel">
          <FileSearch onFileSearch={() => {}} />
          <FileList
            files={files}
            onFileClick={openClickedFile}
            onFileDelete={deteleFile}
            onSaveEdit={saveEdit}
          />
          <div className="row no-gutters">
            <div className="col">
              <ButtomBtn
                text="新建"
                colorClass="btn-primary"
                icon={faPlus}
                onBtnClick={() => {}}
              />
            </div>
            <div className="col">
              <ButtomBtn
                text="导入"
                colorClass="btn-success"
                icon={faFileImport}
                onBtnClick={() => {}}
              />
            </div>
          </div>
        </div>
        <div className="col-9 left-panel bg-primary">
          <h1>右侧</h1>
        </div>
      </div>
    </div>
  )
}

export default App
