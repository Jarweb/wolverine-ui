import React from 'react'
import ReactDOM from 'react-dom'
import { createContainer, setRef, removeContainer } from '../PopContainer/dynamicContainer'
import RefContainer from '../PopContainer/RefContainer'
import { ContainerOptions } from '../PopContainer/Container'
import style from './style.module.scss'

interface Props {
  wrapperCls?: string,
  content?: React.ReactNode,
  maskClosable?: boolean,
}

const showActionSheet = (options: Props) => {
  let handleClose = () => {}
  const container = createContainer()

  const Wrapper = () => {
    const { maskClosable, wrapperCls} = options
    const containerOptions: ContainerOptions = {
      position: 'bottom',
      transitionName: 'actionSheet-animate',
      maskClosable,
      contentCls: wrapperCls || style.wrap,
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
        {options.content}
      </RefContainer>
    )
  }

  ReactDOM.render(<Wrapper />, container)

  return () => handleClose()
}

export default showActionSheet