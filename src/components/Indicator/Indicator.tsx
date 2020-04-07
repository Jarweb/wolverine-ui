import React from 'react'
import style from './style.module.scss'

interface Props {
  size?: 's' | 'm' | 'l'
}

const size = {
  's': 30,
  'm': 40,
  'l': 50
}

export default React.memo((props: Props) => {
  return (
    <div className={style.loader}>
      <img width={size[props.size || 'm']} src={require('./loading.svg')} alt="loading" />
    </div>
  )
})