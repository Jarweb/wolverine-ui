import React from 'react'
import Container, { ContainerOptions } from '../PopContainer/Container'
import AlertContent, { AlertProps } from './AlertContent'
import style from './style.module.scss'

interface Props {
  show: boolean,
  title?: React.ReactNode,
  content?: React.ReactNode,
  contentAlign?: 'center' | 'left' | 'right' | 'justify',
  cancelText?: React.ReactNode,
  onCancel?: () => void,
  okText?: React.ReactNode,
  onOk?: () => void,
  footer?: React.ReactNode,
  maskClosable?: boolean,
}

const Alert = (props: Props) => {
  const { 
    show, 
    title,
    content,
    contentAlign,
    cancelText,
    onCancel,
    okText,
    onOk,
    footer,
  } = props
  const containerOptions: ContainerOptions = {
    position: 'middle',
    maskClosable: false,
    contentCls: style.wrap,
    transitionName: 'alert-animate'
  }
  const alertOptions: AlertProps = {
    title,
    content,
    contentAlign, 
    cancelText,
    onCancel,
    onOk,
    okText,
    footer
  }

  return (
    <Container
      show={show}
      options={containerOptions}
    >
      <AlertContent {...alertOptions} />
    </Container>
  )
}

export default Alert