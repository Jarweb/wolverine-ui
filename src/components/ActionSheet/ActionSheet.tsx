import React, { useCallback } from 'react'
import Container, { ContainerOptions } from '../PopContainer/Container'
import style from './style.module.scss'

export type ActionSheetProps = {
  show: boolean,
  wrapperCls?: string,
  content?: React.ReactNode,
  children?: React.ReactNode,
  maskClosable?: boolean,
  onClose?: () => void,
}

const ActionSheet = (props: ActionSheetProps) => {
  const {
    show = false,
    maskClosable = false,
    wrapperCls,
    onClose,
    content,
    children
  } = props
  const containerOptions: ContainerOptions = {
    position: 'bottom',
    transitionName: 'actionSheet-animate',
    maskClosable,
    contentCls: wrapperCls || style.wrap,
  }
  const handleClose = useCallback(() => {
    onClose && onClose()
  }, [onClose])

  return (
    <Container
      show={show}
      options={containerOptions}
      onClose={handleClose}
    >
      {children ? children : content}
    </Container>
  )
}

export default ActionSheet