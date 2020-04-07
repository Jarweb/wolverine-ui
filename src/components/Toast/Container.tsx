import React, { useState, useEffect, useRef, useCallback } from 'react'
import { CSSTransition } from 'react-transition-group'

import Content, { NoticeOptions } from './Content'
import style from './style.module.scss'
import './animate.scss'
import { isAsyncFunction } from '../../utils/isType';

interface Props {
  options: NoticeOptions,
  onExited: (ref: any) => void,
  wraperRef: (ref: any, closeFn: () => void) => void
}

const DEFAULT_DERATION = 3000

const useContainer = (props: Props) => {
  const { options, onExited, wraperRef } = props
  const { duration, clickClosable, waitToClose, autoClosable } = options
  const [ show, setShow ] = useState(false)
  const ref = useRef(null)

  const handleExit = useCallback(async () => {
    onExited(ref)
  }, [onExited])

  const handleClose = useCallback(() => {
    setShow(false)
  }, [])

  const waitThenClose = useCallback(async () => {
    if (waitToClose && isAsyncFunction(waitToClose)) {
      await waitToClose()
      setShow(false)
    }
  }, [waitToClose])

  useEffect(() => {
    setShow(true)
    wraperRef(ref, handleClose)
  }, [ref, wraperRef, handleClose])

  useEffect(() => {
    if (clickClosable) return

    if (waitToClose) {
      waitThenClose()
      return
    }

    if (autoClosable === false) return

    const timer = setTimeout(async () => {
      setShow(false)
    }, duration || DEFAULT_DERATION)

    return () => clearTimeout(timer)
  })

  return {
    show,
    ref,
    handleExit,
    handleClose
  }
}

const genPosition = (props: Props) => {
  const { position, transitionName } = props.options
  
  if (transitionName) return transitionName

  switch (position) {
    case 'bottom':
      return 'notice-bottom'
    case 'middle':
      return 'notice-middle'
    case 'top':
    default:
      return 'notice-top'
  }
}

export default React.memo((props: Props) => {
  const { options } = props
  const { show, ref, handleExit, handleClose } = useContainer(props)

  return (
    <div className={style.wrapper} ref={ref}>
      <CSSTransition
        in={show}
        timeout={500}
        classNames={genPosition(props)}
        unmountOnExit={true}
        onExited={handleExit}
      >
        <Content
          options={options}
          onClose={handleClose}
        />
      </CSSTransition>
    </div>
  )
})