import React from 'react'
import sty from './style.module.scss'
import Indicator from './Indicator'

interface Props {
  style?: React.CSSProperties
}

export default React.memo((props: Props) => {
  const {style = {}} = props
  
  return (
    <div style={{...style}} className={sty.pageLoaderWrap}>
      <Indicator size="m" />
    </div>
  )
})