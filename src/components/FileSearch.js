/*
 * @Description:
 * @Author: Achieve
 * @Date: 2019-12-10 17:59:26
 * @LastEditTime: 2019-12-12 12:01:40
 */
import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import PropTyes from 'prop-types'
import useKeyPress from '../hooks/useKeyPress'

const FileSearch = ({ title, onFileSearch }) => {
  const [inputActive, setInputActive] = useState(false)
  const [value, setValue] = useState('')

  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)

  let node = useRef(null)

  const closeSearch = () => {
    setInputActive(false)
    setValue('')
    onFileSearch('')
  }
  useEffect(() => {
    if (inputActive) {
      if (enterPressed) {
        console.log(value)
        onFileSearch(value)
      } else if (escPressed) {
        closeSearch()
      }
    }
  })
  useEffect(() => {
    if (inputActive) {
      node.current.focus()
    }
  }, [inputActive])
  function toggleActive() {
    setInputActive(!inputActive)
    setValue('')
  }
  return (
    <div className="alert alert-primary">
      {!inputActive && (
        <div className="d-flex justify-content-between align-items-center">
          <span>{title}</span>
          <button
            type="button"
            className="icon-button"
            onClick={() => {
              toggleActive()
            }}
          >
            <FontAwesomeIcon title="搜索" icon={faSearch} />
          </button>
        </div>
      )}
      {inputActive && (
        <div className="d-flex justify-content-between align-items-center">
          <input
            ref={node}
            className="form-control"
            value={value}
            size="lg"
            onChange={e => {
              setValue(e.target.value)
            }}
          />
          <button
            type="button"
            className="icon-button"
            onClick={() => {
              toggleActive()
            }}
          >
            <FontAwesomeIcon title="关闭" icon={faTimes} />
          </button>
        </div>
      )}
    </div>
  )
}

FileSearch.prototypes = {
  title: PropTyes.string,
  onFileSearch: PropTyes.func.isRequired
}

FileSearch.defaultProps = {
  title: '我的云文档'
}

export default FileSearch
