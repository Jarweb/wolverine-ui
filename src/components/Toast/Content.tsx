import React, { useCallback, Fragment } from 'react'
import cn from 'classnames'
import style from './style.module.scss'
import { isNumber, isString } from  '../../utils/isType'

export interface NoticeOptions {
  content: React.ReactNode,
  position?: 'top' | 'bottom' | 'middle' | number,
  theme?: 'success' | 'warn' | 'error' | string,
  duration?: number, // 定时关闭
  autoClosable?: boolean, // 自动关闭
  waitToClose?: () => Promise<any>, // 等待异步结束后关闭
  clickClosable?: boolean, // 点击关闭
  maskVisible?: boolean,
  transitionName?: string, // 修改动画等
  contentCls?: string // 修改颜色等
}

interface Props {
  onClose?: () => void,
  options: NoticeOptions 
}

export default React.memo((props: Props) => {
  const { options, onClose } = props
  const { theme = 'info', position = 'top', contentCls, maskVisible = false, clickClosable } = options
  
  const handleClose = useCallback(async () => {
    if (!clickClosable) return

    onClose && onClose()
  }, [onClose, clickClosable])

  const wrapcls = cn(
    style.contentWrap,
    position === 'top' && style.top,
    position === 'bottom' && style.bottom,
    position === 'middle' && style.middle,
  )

  const contentcls = cn(
    !contentCls && style.content,
    !contentCls && position === 'top' && style.contentTop,
    !contentCls && position === 'bottom' && style.contentBottom,
    !contentCls && theme === 'success' && style.success,
    !contentCls && theme === 'error' && style.error,
    !contentCls && theme === 'warn' && style.warn,
    !contentCls && theme === 'info' && style.info,
    contentCls && contentCls,
  )

  let sty: any = {}
  isString(theme) && (sty = { background: theme })
  isNumber(position) && (sty = { top: position })

  return (
    <Fragment>
      {maskVisible && <div className={style.mask}></div>}
      <div className={wrapcls} style={sty}>
        <span onClick={handleClose} className={contentcls}>
          {options.content}
        </span>
      </div>
    </Fragment>
  )
})