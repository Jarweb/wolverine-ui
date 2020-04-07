import React, { useCallback, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import cn from 'classnames'

import { isNumber } from  '../../utils/isType'
import style from './style.module.scss'
import './animate.scss'

export interface ContainerOptions {
  position?: 'top' | 'bottom' | 'middle' | number,
  clickClosable?: boolean, // 点击容器关闭
  maskClosable?: boolean, // 点击遮罩关闭
  duration?: number, // 定时时长
  autoClosable?: boolean, // 定时关闭
  contentCls?: string // 修改颜色等
  transitionName?: 'popup-top' | 'popup-middle' | 'popup-bottom' | string // 动画
}

interface Props {
  show: boolean,
  options: ContainerOptions,
  onExited?: () => void,
  onClose?: () => void,
  children: React.ReactNode
}

const DEFAULT_DERATION = 3000

const useContainer = (props: Props) => {
  const { options, onExited, onClose } = props
  const { duration, clickClosable, maskClosable, autoClosable } = options

  // 动画消失之后
  const handleExit = useCallback(async () => {
    onExited && onExited()
  }, [onExited])

  const handleMask = useCallback(() => {
    maskClosable && onClose && onClose()
  }, [maskClosable, onClose])

  useEffect(() => {
    if (clickClosable || !autoClosable) return

    const timer = setTimeout(async () => {
      onClose && onClose()
    }, duration || DEFAULT_DERATION)

    return () => {
      clearTimeout(timer)
    }
  })

  return {
    handleExit,
    handleMask,
  }
}

const genPosition = (props: Props) => {
  const { position, transitionName } = props.options

  if (transitionName) return transitionName

  switch (position) {
    case 'bottom':
      return 'popup-bottom'
    case 'middle':
      return 'popup-middle'
    case 'top':
    default:
      return 'popup-top'
  }
}

const useFixMaskDisableTouchMove = (maskRef: React.RefObject<any>) => {
  useEffect(() => {
    const mask = maskRef.current
    const handler = (event: any) => {
      event.preventDefault()
    }

    mask && (mask as any).addEventListener('touchmove', handler, { 
      passive: false 
    })

    return () => {
      mask && (mask as any).removeEventListener('touchmove', handler, { 
        passive: false 
      })
    }
  })
}

export default React.memo((props: Props) => {
  const { options, show } = props
  const { position = 'middle', contentCls } = options
  const { handleExit, handleMask} = useContainer(props)
  const maskRef = useRef(null)

  const wrapcls = cn(
    !contentCls && style.content,
    contentCls && contentCls,
    !contentCls && position === 'top' && style.top,
    !contentCls && position === 'bottom' && style.bottom,
    !contentCls && position === 'middle' && style.middle,
  )

  let sty: any = {}
  isNumber(position) && (sty = { top: position })
  useFixMaskDisableTouchMove(maskRef)

  return (
    <div className={cn(style.wrapper)}>
      <CSSTransition
        in={show}
        timeout={500}
        classNames={'mask-animate'}
        unmountOnExit={true}
      >
        <div ref={maskRef} onClick={handleMask} className={style.mask} />
      </CSSTransition>

      <CSSTransition
        in={show}
        timeout={500}
        classNames={genPosition(props)}
        unmountOnExit={true}
        onExited={handleExit}
      >
        <div className={wrapcls} style={sty}>
          {props.children}
        </div>
      </CSSTransition>
    </div>
  )
})