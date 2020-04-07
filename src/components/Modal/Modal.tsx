import React, {useCallback} from 'react'
import Container, { ContainerOptions } from '../PopContainer/Container'
import style from './style.module.scss'

export interface ModalProps {
  show: boolean,
  content?: React.ReactNode,
  children?: React.ReactNode,
  maskClosable?: boolean,
  transitionName?: string,
  onClose?: () => void,
}

const Modal = (props: ModalProps) => {
  const {
    show = false,
    maskClosable = false,
    transitionName,
    onClose,
    content,
    children
  } = props
  const containerOptions: ContainerOptions = {
    position: 'middle',
    contentCls: style.wrapper,
    maskClosable,
    transitionName
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

export default Modal