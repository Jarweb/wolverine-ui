import React, {useCallback} from 'react'
import style from './style.module.scss'

export interface AlertProps {
  title?: React.ReactNode,
  content?: React.ReactNode,
  contentAlign?: 'center' | 'left' | 'right' | 'justify',
  cancelText?: React.ReactNode,
  onCancel?: () => void,
  okText?: React.ReactNode,
  onOk?: () => void,
  footer?: React.ReactNode,
}

export default React.memo((props: AlertProps) => {
  const {
    title,
    content,
    cancelText,
    okText,
    onCancel,
    onOk,
    footer,
    contentAlign,
  } = props
  let foot = null

  const handleOk = useCallback(() => {
    onOk && onOk()
  }, [onOk])

  const handleCancel = useCallback(() => {
    onCancel && onCancel()
  }, [onCancel])

  if (footer) {
    foot = footer
  }
  else if ((!okText && !cancelText) || (okText && cancelText)) {
    foot = (
      <div className={style.foot}>
        <div className={style.leftbtn} onClick={handleCancel}>{cancelText || '取消'}</div>
        <div className={style.rightbtn} onClick={handleOk}>{okText || '确定'}</div>
      </div>
    )
  }
  else if (okText && !cancelText) {
    foot = (
      <div className={style.foot}>
        <div className={style.btn} onClick={handleOk}>{okText}</div>
      </div>
    )
  }
  else if (!okText && cancelText) {
    foot = (
      <div className={style.foot}>
        <div className={style.btn} onClick={handleCancel}>{cancelText}</div>
      </div>
    )
  }

  return (
    <div className={style.content}>
      {title && <div className={style.title}>{title}</div>}
      {
        content && 
        <div className={style.body} style={
          contentAlign 
          ? { textAlign: contentAlign } 
          : { textAlign: 'center' }
        }
        >{content}</div>
      }
      {foot}
    </div>
  )
})