/*
 * @Description:左侧文件列表
 * @Author: Achieve
 * @Date: 2019-12-11 10:41:16
 * @LastEditTime: 2019-12-11 13:44:56
 */
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faMarkdown } from '@fortawesome/free-brands-svg-icons'

import PropTypes from 'prop-types'

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }) => {
  const [editStatus, setEditStatus] = useState(false)
  const [value, setValue] = useState('')
  return (
    <ul className="list-group list-group-flush file-list">
      {files.map(file => (
        <li
          className="list-group-item bg-light row no-gutter d-flex align-items-center file-item"
          key={file.id}
        >
          {file.id !== editStatus && (
            <>
              <span className="col-2">
                <FontAwesomeIcon size="lg" icon={faMarkdown} />
              </span>
              <span
                className="col-7 c-link"
                onClick={() => {
                  onFileClick(file.id)
                }}
              >
                {file.body}
              </span>
              <button
                type="button"
                className="icon-button col-1"
                onClick={() => {
                  setValue(file.title)
                  setEditStatus(file.id)
                  // onSaveEdit(file.id)
                }}
              >
                <FontAwesomeIcon size="lg" title="编辑" icon={faEdit} />
              </button>
              <button
                type="button"
                className="icon-button col-1"
                onClick={() => {
                  onFileDelete(file.id)
                }}
              >
                <FontAwesomeIcon size="lg" title="删除" icon={faTrash} />
              </button>
            </>
          )}
          {file.id === editStatus && (
            <div className="d-flex justify-content-between align-items-center row">
              <input
                className="form-control col-10"
                value={value}
                size="lg"
                onChange={e => {
                  setValue(e.target.value)
                }}
              />
              <button
                type="button"
                className="icon-button col-2"
                onClick={() => {
                  // toggleActive()
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
