/*
 * @Description: 入口
 * @Author: Achieve
 * @Date: 2019-12-10 09:59:11
 * @LastEditTime: 2019-12-16 15:10:31
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
import { objToArr, flattenArr } from './utils/helper'
import useIpcRenderer from './hooks/useIpcRenderer'

const { join, basename, extname, dirname } = window.require('path')
const { remote } = window.require('electron')
const Stroe = window.require('electron-store')
const fileStore = new Stroe({ name: 'FIles Data' })
const settingsStore = new Stroe({ name: 'Settings' })

// 新建,删除,重命名 时更新
const saveFilesToStore = files => {
  const filesStoreObj = objToArr(files).reduce((result, file) => {
    const { id, path, title, createAt } = file
    result[id] = { id, path, title, createAt }
    return result
  }, {})
  fileStore.set('files', filesStoreObj)
}

// fileStore.clear()

// const savedLocation = remote.app.getPath('documents')
const savedLocation = settingsStore.get('savedFileLocation')

function App() {
  // state
  const [files, setFiles] = useState(fileStore.get('files') || {})
  const [activefileID, setActivefileID] = useState()
  const [openfileIDs, setOpenfileIDs] = useState([])
  const [unsavedfileIDs, setUnsavedfileIDs] = useState([])
  const [searchedFiles, setSearchedFiles] = useState({})

  const filesArr = objToArr(files)

  const openFiles = openfileIDs.map(openfileID => files[openfileID])
  const activeFile = files[activefileID]
  // 左侧文件list
  const fileSearch = keyword => {
    let newFiles
    if (keyword.trim()) {
      newFiles = filesArr.filter(file => file.title.includes(keyword))
    } else {
      newFiles = filesArr
    }
    setSearchedFiles(newFiles)
  }
  const fileListArr = searchedFiles.length > 0 ? searchedFiles : filesArr
  // 点击文件(左侧)
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
  // 删除文件
  const deteleFile = fileID => {
    if (files[fileID].isNew) {
      const { [fileID]: val, ...newFiles } = files
      setFiles(newFiles || {})
    } else {
      fileHelper.detleFile(files[fileID].path).then(() => {
        const { [fileID]: val, ...newFiles } = files
        setFiles(newFiles || {})
        handeCloseTab(fileID)
      })
    }
  }
  // 关闭标签
  const handeCloseTab = id => {
    const tabsWithout = openfileIDs.filter(fileID => fileID !== id)
    setOpenfileIDs(tabsWithout)
    if (tabsWithout.length > 0) {
      setActivefileID(tabsWithout[0])
    } else {
      setActivefileID('')
    }
  }
  // 点击标签
  const handeTabClick = fileID => {
    setActivefileID(fileID)
  }
  // 新建文件
  const createNewFile = () => {
    const newID = uuidv4()
    const newFile = {
      id: newID,
      title: '新建md',
      body: '请输入markdown',
      createAt: new Date().getTime(),
      isNew: true
    }
    const newFiles = { ...files, [newID]: newFile }
    setFiles(newFiles)
  }
  // 文档改变
  const textChange = val => {
    if (val !== files[activefileID].body) {
      const newFile = files[activefileID]
      if (newFile) {
        newFile.body = val
        setFiles({ ...files, [activefileID]: newFile })
      }
      if (!unsavedfileIDs.includes(activefileID)) {
        setUnsavedfileIDs([...unsavedfileIDs, activefileID])
      }
    }
  }
  // 更新文件名
  const updateFileName = (id, title, isNew) => {
    const modifiedFile = { ...files[id], title, isNew: false }
    const newFiles = { ...files, [id]: modifiedFile }
    const newPath = isNew
      ? join(savedLocation, `${title}.md`)
      : join(dirname(files[id].path), `${title}.md`)
    if (isNew) {
      fileHelper.writeFile(newPath, files[id].body).then(() => {
        newFiles[id].path = newPath
        setFiles(newFiles)
        saveFilesToStore(newFiles)
      })
    } else {
      const oldPath = files[id].path
      fileHelper.renameFile(oldPath, newPath).then(() => {
        newFiles[id].path = newPath
        setFiles(newFiles)
        saveFilesToStore(newFiles)
      })
    }
  }
  // 保存文档
  const saveCurrentFile = () => {
    if (activeFile) {
      fileHelper
        .writeFile(
          join(savedLocation, `${activeFile.title}.md`),
          activeFile.body
        )
        .then(() => {
          setUnsavedfileIDs(
            unsavedfileIDs.filter(id => {
              return id !== activeFile.id
            })
          )
        })
    }
  }
  // 点击导入
  const importFiles = () => {
    remote.dialog
      .showOpenDialog({
        title: '选择导入的 Markdown 文件',
        properties: ['openFile', 'multiSelections'],
        filters: [{ name: 'Markdown files', extensions: ['md'] }]
      })
      .then(data => {
        if (!data.canceled) {
          const paths = data.filePaths
          if (Array.isArray(paths)) {
            const filteredPaths = paths.filter(path => {
              const aleadyAdded = Object.values(files).find(file => {
                return file.path === path
              })
              return !aleadyAdded
            })
            const importFilesArr = filteredPaths.map(path => {
              return {
                id: uuidv4(),
                title: basename(path, extname(path)),
                path,
                createAt: new Date().getTime()
              }
            })
            const newFiles = { ...files, ...flattenArr(importFilesArr) }
            setFiles(newFiles)
            saveFilesToStore(newFiles)
            if (importFilesArr.length) {
              remote.dialog.showMessageBox({
                type: 'info',
                title: `导入成功`,
                message: `成功导入${importFilesArr.length}个文件`
              })
            }
          } else {
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  useIpcRenderer({
    'ctreate-file': createNewFile,
    'save-edit-file': saveCurrentFile,
    'search-file': fileSearch,
    'import-file': importFiles
  })
  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3 left-panel">
          <FileSearch onFileSearch={fileSearch} />
          <FileList
            files={fileListArr}
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
                onBtnClick={importFiles}
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
                onChange={textChange}
                options={{
                  minHeight: '400px'
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
