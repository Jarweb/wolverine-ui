import React, {useState, useCallback} from 'react'
import ReactDOM from 'react-dom'
import { createContainer, setRef, removeContainer } from '../PopContainer/dynamicContainer'
import RefContainer from '../PopContainer/RefContainer'
import { ContainerOptions } from '../PopContainer/Container'
import AlertContent, { AlertProps } from './AlertContent'
import style from './style.module.scss'

const alert = (options: AlertProps) => {
  const container = createContainer()
  
  const Wrapper = () => {
    const [handleClose, setFn] = useState<Function | null>()
    const containerOptions: ContainerOptions = {
      position: 'middle',
      maskClosable: false,
      contentCls: style.wrap,
      transitionName: 'alert-animate'
    }
    const alertOptions: AlertProps = { ...options }

    alertOptions.onCancel = useCallback(async () => {
      options.onCancel && options.onCancel()
      handleClose && handleClose()
    }, [handleClose])
    
    alertOptions.onOk = useCallback(async () => {
      options.onOk && options.onOk()
      handleClose && handleClose()
    }, [handleClose])

    return (
      <RefContainer
        options={containerOptions}
        onExited={(ref) => removeContainer(ref)}
        wraperRef={(ref, fn) => {
          setFn(() => fn)
          setRef(ref, container)
        }}
      >
        <AlertContent {...alertOptions} />
      </RefContainer>
    )
  }

  ReactDOM.render(<Wrapper />, container)
}

export default alert