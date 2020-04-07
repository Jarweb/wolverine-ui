import React from 'react'
import ReactDOM from 'react-dom'
import { createContainer, setRef, removeContainer} from '../PopContainer/dynamicContainer'
import Container from './Container'
import { NoticeOptions } from './Content'
import style from './style.module.scss'
import Loader from '../Loader/Loader'

export const showNotice = (options: NoticeOptions) => {
  const container = createContainer()
  let handleClose = () => { }

  ReactDOM.render(
    <Container 
      options={options} 
      onExited={(ref) => removeContainer(ref)}
      wraperRef={(ref, closeFn) => {
        setRef(ref, container)
        handleClose = closeFn
      }} 
    />, 
    container
  )

  return () => handleClose()
}

export const showTopTip = (text: string) => {
  const options: NoticeOptions = {
    content: text,
    position: 'top',
    contentCls: style.smallTopTip
  }
  return showNotice(options)
}

export const showLoading = ({ text, icon, maskVisible, contentCls } : {
  text?: string, 
  icon?: boolean, 
  maskVisible?: boolean,
  contentCls?: string
}) => {
  const options: NoticeOptions = {
    content: (
      <div>
        {
          icon && 
          <div style={{ height: 45, minWidth: 75, paddingTop: 4 }}><Loader size="s" /></div>
        }
        {
          text &&
          <div className={style.loadingText}>{text}</div>
        }
      </div>
    ),
    position: 'middle',
    contentCls: contentCls || style.loading,
    autoClosable: false,
    clickClosable: false,
    maskVisible,
  }
  return showNotice(options)
}


export default {
  showNotice,
  showTopTip,
  showLoading
}