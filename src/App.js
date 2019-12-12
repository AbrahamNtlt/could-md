/*
 * @Description: 入口
 * @Author: Achieve
 * @Date: 2019-12-10 09:59:11
 * @LastEditTime: 2019-12-12 12:51:13
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
import uuidv4 from 'uuid/v4'

function App() {
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
  const [files, setFiles] = useState(defaultfiles)
  const [activefileID, setActivefileID] = useState()
  const [openfileIDs, setOpenfileIDs] = useState([])
  const [unsavedfileIDs, setUnsavedfileIDs] = useState([])
  const [searchedFiiles, setSearchedFiiles] = useState([])
  const openFiles = openfileIDs.map(openfileID =>
    files.find(file => file.id == openfileID)
  )
  const activeFile = files.find(file => file.id == activefileID)
  const targetFile = id => {
    return files.find(file => file.id == id)
  }
  const fileSearch = keyword => {
    let newFiles
    if (keyword) {
      newFiles = files.filter(file => file.title.includes(keyword))
    } else {
      newFiles = files
    }
    setSearchedFiiles(newFiles)
  }
  // 打开文件
  const fileClick = fileID => {
    setActivefileID(fileID)
    if (!openfileIDs.includes(fileID)) {
      setOpenfileIDs([...openfileIDs, fileID])
    }
  }
  const deteleFile = fileID => {
    const newFiles = files.filter(file => file.id !== fileID)
    setFiles(newFiles)
    handeCloseTab(fileID)
  }
  const handeCloseTab = id => {
    const tabsWithout = openfileIDs.filter(fileID => fileID !== id)
    setOpenfileIDs(tabsWithout)
    if (tabsWithout.length > 0) {
      setActivefileID(tabsWithout[0])
    } else {
      setActivefileID('')
    }
  }
  const handeTabClick = fileID => {
    setActivefileID(fileID)
  }

  const createNewFile = () => {
    const newFile = {
      id: uuidv4(),
      title: '新建md',
      body: '请输入markdown',
      createAt: new Date().getTime(),
      isNew: true
    }
    const newFiles = [...files, newFile]
    setFiles(newFiles)
  }
  const fileChange = (id, val) => {
    const newFiles = files.map(file => {
      if (file.id === id) {
        file.body = val
      }
      return file
    })
    setFiles(newFiles)
    if (!unsavedfileIDs.includes(id)) {
      setUnsavedfileIDs([...unsavedfileIDs, id])
    }
  }
  const updateFileName = (id, title) => {
    const newFiles = files.map(file => {
      if (file.id === id) {
        file.title = title
        file.isNew = false
      }
      return file
    })
    setFiles(newFiles)
  }
  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3 left-panel">
          <FileSearch onFileSearch={fileSearch} />
          <FileList
            files={searchedFiiles.length > 0 ? searchedFiiles : files}
            onFileClick={fileClick}
            onFileDelete={deteleFile}
            onSaveEdit={updateFileName}
          />
          <div className="row no-gutters button-group">
            <div className="col">
              <ButtomBtn
                text="新建"
                colorClass="btn-primary"
                icon={faPlus}
                onBtnClick={createNewFile}
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
                activeId={activefileID}
                onCloseTab={handeCloseTab}
                onTabClick={handeTabClick}
                unsaveIds={unsavedfileIDs}
              />
              <SimpleMDE
                key={activeFile && activeFile.id}
                value={activeFile && activeFile.body}
                onChange={fileChange}
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
