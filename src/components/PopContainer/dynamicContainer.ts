import ReactDOM from 'react-dom'

const refs = new Map()

export function getRef(ref: any) {
  return refs.get(ref)
}

export function setRef(ref: any, node: any) {
  refs.set(ref, node)
}

export function removeRef(ref: any) {
  refs.delete(ref)
}

export function createContainer() {
  const wrap = document.createElement('div')
  document.body.appendChild(wrap)
  return wrap
}

export function removeContainer(ref: any) {
  const wrap = getRef(ref)
  ReactDOM.unmountComponentAtNode(wrap)
  wrap.parentNode && wrap.parentNode.removeChild(wrap)
  removeRef(ref)
}