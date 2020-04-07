import React from 'react'
import sty from './style.module.scss'
import Indicator from './Indicator'

interface Props {
  style?: React.CSSProperties,
  children: React.ReactNode
}

export default React.memo((props: Props) => {
  const { style = {} } = props

  return (
    <div style={{ ...style }} className={sty.containerLoaderWrap}>
      <div className={sty.loader}><Indicator size="m" /></div>
      {props.children}
    </div>
  )
})