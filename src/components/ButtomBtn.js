/*
 * @Description: 底部button
 * @Author: Achieve
 * @Date: 2019-12-11 12:39:46
 * @LastEditTime: 2019-12-12 12:14:37
 */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTyes from 'prop-types'

const Bottombtn = ({ text, colorClass, icon, onBtnClick }) => {
  return (
    <button
      type="button"
      className={`btn btn-block no-border no-border ${colorClass}`}
      onClick={onBtnClick}
    >
      <FontAwesomeIcon className="mr-2" size="lg" icon={icon} />
      {text}
    </button>
  )
}
Bottombtn.propTyes = {
  text: PropTyes.string,
  colorClass: PropTyes.string,
  icon: PropTyes.element.isRequired,
  onBtnClick: PropTyes.func
}
Bottombtn.defaultProps = {
  text: '新建'
}
export default Bottombtn
