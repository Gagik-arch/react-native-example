import { useEffect, useState } from 'react'

let globalState
let listeners

const createGlobalState = (initialState) => {
  globalState = initialState
  listeners = Object.fromEntries(
    Object.keys(initialState).map((key) => [key, new Set()])
  )
}

const setGlobalState = (key, nextValue) => {
  if (typeof nextValue === 'function') {
    globalState = { ...globalState, [key]: nextValue(globalState[key]) }
  } else {
    globalState = { ...globalState, [key]: nextValue }
  }
  listeners[key].forEach((listener) => listener())
}

const useGlobalState = (key) => {
  const [state, setState] = useState(globalState[key])
  useEffect(() => {
    const listener = () => {
      setState(globalState[key])
    }
    listeners[key].add(listener)
    listener()
    return () => listeners[key].delete(listener)
  }, [])
  return [state, (nextValue) => setGlobalState(key, nextValue)]
}

export { createGlobalState, setGlobalState, useGlobalState }
