/*
 * @Description:
 * @Author: Achieve
 * @Date: 2019-12-10 17:59:26
 * @LastEditTime: 2019-12-10 19:48:29
 */
import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import PropTyes from 'prop-types'

const FileSearch = ({ title, onFileSearch }) => {
  const [inputActive, setInputActive] = useState(false)
  const [value, setValue] = useState('')

  let node = useRef(null)

  const closeSearch = event => {
    event.preventDefault()
    setInputActive(false)
    setValue('')
  }
  useEffect(() => {
    const handleInputEvent = e => {
      const { keyCode } = e
      if (keyCode === 13 && inputActive) {
        onFileSearch(value)
      } else if (keyCode === 27 && inputActive) {
        closeSearch(e)
      }
    }
    document.addEventListener('keyup', handleInputEvent)
    return () => {
      document.removeEventListener('keyup', handleInputEvent)
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
  title: '默认文档'
}

export default FileSearch
