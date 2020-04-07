export const isNumber = (num: any) => {
  return Object.prototype.toString.apply(num) === '[object Number]'
}

export const isString = (str: any) => {
  return Object.prototype.toString.apply(str) === '[object String]'
}

export const isAsyncFunction = (asyncFn: any) => {
  const GeneratorFunction = (function* () { yield null}).constructor;
  const AsyncFunction = (async function () { }).constructor;

  const res = asyncFn instanceof AsyncFunction && 
    AsyncFunction !== Function && 
    AsyncFunction !== GeneratorFunction
  return res === true
}