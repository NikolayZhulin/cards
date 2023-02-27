import { useEffect, useRef } from 'react'

export const useAutoFocus = () => {
  const inputRef = useRef(null)

  useEffect(() => {
    // @ts-ignore
    inputRef.current && inputRef.current.focus()
  }, [])

  return inputRef
}
