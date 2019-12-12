/*
 * @Description: 入口
 * @Author: Achieve
 * @Date: 2019-12-10 09:59:11
 * @LastEditTime: 2019-12-12 18:36:14
 */
import React, { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'
import { faPlus, faFileImport, faSave } from '@fortawesome/free-solid-svg-icons'
import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import ButtomBtn from './components/ButtomBtn'
import TabList from './components/TabList'
import uuidv4 from 'uuid/v4'
import fileHelper from './utils/fileHelper'
import { objTOArr } from './utils/helper'

const { join } = window.require('path')
const { remote } = window.require('electron')
const Stroe = window.require('electron-store')
const fileStore = new Stroe({ name: 'FIles Data' })
// 新建,删除,重命名
const saveFilesToStore = files => {
  const filesStoreObj = objTOArr(files).reduce((result, file) => {
    const { id, path, title, createAt } = file
    result[id] = { id, path, title, createAt }
    return result
  }, {})
  fileStore.set('files', filesStoreObj)
}

const savedLocation = remote.app.getPath('documents')

function App() {
  // state
  const [files, setFiles] = useState(fileStore.get('files') || [])
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

    const currentFile = files[fileID]
    if (!currentFile.isLoaded) {
      fileHelper.readFile(currentFile.path).then(val => {
        const newFile = { ...currentFile, body: val, isLoaded: true }
        setFiles({ ...files, [fileID]: newFile })
      })
    }
    if (!openfileIDs.includes(fileID)) {
      setOpenfileIDs([...openfileIDs, fileID])
    }
  }
  const deteleFile = fileID => {
    if (files[fileID].isNew) {
      const { [fileID]: val, newFiles } = files
      setFiles(newFiles)
    } else {
      fileHelper.detleFile(files[fileID].path).then(() => {
        const { [fileID]: val, newFiles } = files
        setFiles(newFiles)
        handeCloseTab(fileID)
      })
    }
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
  const updateFileName = (id, title, isNew) => {
    const modifiedFile = { ...files[id], title, isNew: false }
    const newFiles = { ...files, [id]: modifiedFile }
    if (isNew) {
      fileHelper
        .writeFile(join(savedLocation, `${title}.md`), files[id].body)
        .then(() => {
          setFiles(newFiles)
          saveFilesToStore(newFiles)
        })
    } else {
      fileHelper
        .renameFile(
          join(savedLocation, `${files[id].title}.md`),
          join(savedLocation, `${title}.md`)
        )
        .then(() => {
          setFiles(newFiles)
          saveFilesToStore(newFiles)
        })
    }
  }
  const saveCurrentFile = () => {
    fileHelper
      .writeFile(join(savedLocation, `${activeFile.title}.md`), activeFile.body)
      .then(() => {
        setUnsavedfileIDs(
          unsavedfileIDs.filter(id => {
            return id !== activeFile.id
          })
        )
      })
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
              <ButtomBtn
                text="保存"
                colorClass="btn-success"
                icon={faSave}
                onBtnClick={saveCurrentFile}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
