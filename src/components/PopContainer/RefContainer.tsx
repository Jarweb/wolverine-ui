import React, { useRef, useState, useEffect, useCallback } from 'react'
import Container, { ContainerOptions } from './Container'

export interface RefContainerProps {
  options: ContainerOptions,
  onExited?: (ref: any) => void,
  wraperRef: (ref: any, closeFn: () => void) => void,
  children: React.ReactNode,
}

export default React.memo((props: RefContainerProps) => {
  const ref = useRef(null)
  const { options, wraperRef, onExited } = props
  const [ show, setShow ] = useState(false)

  const handleClose = useCallback(() => {
    setShow(false)
  }, [])

  const handleExited = useCallback(() => {
    onExited && onExited(ref)
  }, [onExited])

  useEffect(() => {
    setShow(true)
    wraperRef(ref, handleClose)
  }, [ref, wraperRef, handleClose])

  return (
    <div ref={ref}>
      <Container 
        show={show} 
        options={options} 
        onExited={handleExited}
        onClose={handleClose}
      >
        {props.children}
      </Container>
    </div>
  )
})