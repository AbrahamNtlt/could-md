/*
 * @Description:左侧文件列表
 * @Author: Achieve
 * @Date: 2019-12-11 10:41:16
 * @LastEditTime: 2019-12-14 11:34:40
 */
import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'
import useKeyPress from '../hooks/useKeyPress'

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
  const [editStatus, setEditStatus] = useState(false)
  const [value, setValue] = useState('')
  let node = useRef(null)
  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(13)
  const closeSearch = file => {
    setValue('')
    setEditStatus(false)
    if (file.isNew) {
      onFileDelete(file.id)
    }
  }
  // 新建文件
  useEffect(() => {
    const newFile = files.find(file => file.isNew)
    if (newFile) {
      setEditStatus(newFile.id)
      setValue(newFile.title)
    }
  }, [files])
  // enter 事件
  useEffect(() => {
    const editItem = files.find(file => file.id === editStatus)
    if (enterPressed && editStatus) {
      if (value.trim()) {
        onSaveEdit(editStatus, value, editItem.isNew)
      }
      setEditStatus(false)
    }
    if (escPressed && editStatus) {
      closeSearch(editItem)
    }
  })
  useEffect(() => {
    if (editStatus) {
      node.current.focus()
    }
  }, [editStatus])

  const handleChagne = e => {
    setValue(e.target.value)
  }

  return (
    <ul className="list-group list-group-flush file-list">
      {files.map(file => (
        <li
          className="list-group-item bg-light row no-gutter d-flex align-items-center file-item mx-0"
          key={file.id}
        >
          {file.id !== editStatus && !file.isNew && (
            <>
              <span className="col-2">
                <FontAwesomeIcon size="lg" icon={faMarkdown} />
              </span>
              <span
                className="col-6 c-link"
                onClick={() => {
                  onFileClick(file.id)
                }}
              >
                {file.title}
              </span>
              <button
                type="button"
                className="icon-button col-2"
                onClick={() => {
                  setValue(file.title)
                  setEditStatus(file.id)
                }}
              >
                <FontAwesomeIcon size="lg" title="编辑" icon={faEdit} />
              </button>
              <button
                type="button"
                className="icon-button col-2"
                onClick={() => {
                  onFileDelete(file.id)
                }}
              >
                <FontAwesomeIcon size="lg" title="删除" icon={faTrash} />
              </button>
            </>
          )}
          {(file.id === editStatus || file.isNew) && (
            <div className="d-flex justify-content-between align-items-center row">
              <input
                ref={node}
                className="form-control col-10"
                value={value}
                size="lg"
                onChange={handleChagne}
              />
              <button
                type="button"
                className="icon-button col-2"
                onClick={() => {
                  closeSearch(file)
                }}
              >
                <FontAwesomeIcon title="关闭" icon={faTimes} />
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}

export default FileList
