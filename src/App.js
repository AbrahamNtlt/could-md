/*
 * @Description: 入口
 * @Author: Achieve
 * @Date: 2019-12-10 09:59:11
 * @LastEditTime: 2019-12-11 18:45:29
 */
import React, { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'
import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import ButtomBtn from './components/ButtomBtn'
import TabList from './components/TabList'
import { file } from '_@babel_types@7.7.4@@babel/types/lib'

function App() {
  let unsaveIds = ['1']
  let defaultfiles = [
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

  // state
  const [files, SetFiles] = useState(defaultfiles)
  const [activeFileID, setActiveFileID] = useState()
  const [openFileIDs, setOpenFileIDs] = useState([])
  const [unsavedFileIDs, setUnsavedFileIDs] = useState([])
  const openFiles = openFileIDs.map(openFileID => {
    return files.find(file => file.id == openFileID)
  })
  const activeFile = files.find(file => file.id == activeFileID)

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
          <div className="row no-gutters button-group">
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
          {!activeFile && (
            <div className="start-page">选择或创建新的Markdown文档</div>
          )}
          {activeFile && (
            <>
              <TabList
                files={openFiles}
                activeId={activeFileID}
                onCloseTab={handeCloseTab}
                onTabClick={handeTabClick}
                unsaveIds={unsaveIds}
              />
              <SimpleMDE
                value={activeFile && activeFile.body}
                onChange={val => {
                  console.log(val)
                }}
                options={{
                  minHeight: '600px'
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
