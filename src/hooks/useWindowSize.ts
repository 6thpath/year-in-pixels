import { useState, useEffect, useCallback } from 'react'
import { debounce } from 'lodash'

export const useWindowSize = () => {
  const isClient = typeof window === 'object'

  const getSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    }
  }, [isClient])

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) {
      return () => false
    }

    function handleResize() {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', debounce(handleResize, 200))

    return () => window.removeEventListener('resize', debounce(handleResize, 200))
  }, [getSize, isClient])

  return windowSize
}
