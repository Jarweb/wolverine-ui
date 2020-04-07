import React from 'react'
import ReactDOM from 'react-dom'
import { createContainer, setRef, removeContainer } from '../PopContainer/dynamicContainer'
import RefContainer from '../PopContainer/RefContainer'
import { ContainerOptions } from '../PopContainer/Container'
import style from './style.module.scss'

interface Props {
  content?: React.ReactNode,
  maskClosable?: boolean,
  transitionName?: ContainerOptions['transitionName'],
}

const showModal = (options: Props) => {
  let handleClose = () => {}
  const container = createContainer()

  const Wrapper = () => {
    const { maskClosable, transitionName, content} = options
    const containerOptions: ContainerOptions = {
      position: 'middle',
      contentCls: style.wrapper,
      maskClosable,
      transitionName
    }

    return (
      <RefContainer
        options={containerOptions}
        onExited={(ref) => removeContainer(ref)}
        wraperRef={(ref, closeFn) => {
          setRef(ref, container)
          handleClose = closeFn
        }}
      >
        {content}
      </RefContainer>
    )
  }

  ReactDOM.render(<Wrapper />, container)

  return () => handleClose()
}

export default showModal