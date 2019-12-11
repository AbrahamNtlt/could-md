/*
 * @Description: 入口
 * @Author: Achieve
 * @Date: 2019-12-10 09:59:11
 * @LastEditTime: 2019-12-11 15:45:08
 */
import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'
import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import ButtomBtn from './components/ButtomBtn'
import TabList from './components/TabList'

function App() {
  let unsaveIds = ['1']
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
  const handeCloseTab = fileId => {
    console.log(`close ${fileId}`)
  }
  const handeTabClick = fileId => {
    console.log(`click ${fileId}`)
  }
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
        <div className="col-9 left-panel">
          <TabList
            files={files}
            activeId={files[0].id}
            onCloseTab={handeCloseTab}
            onTabClick={handeTabClick}
            unsaveIds={unsaveIds}
          />
        </div>
      </div>
    </div>
  )
}

export default App
