import React from 'react'
import { CSSTransition } from 'react-transition-group'
import './style.scss'

interface Props{
  show: boolean,
  children: React.ReactChild,
  prefix?: string
}

export default React.memo((props: Props) => {
  const { show, prefix } = props

  return (
    <CSSTransition
      in={show}
      timeout={500}
      classNames={(prefix || 'wol-ui-' )+ 'foot-bar-animate'}
      unmountOnExit={true}
    >
      {props.children}
    </CSSTransition>
  )
})