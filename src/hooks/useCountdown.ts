import { useState, useEffect } from 'react'

export const useCountdown = ({ seconds, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(seconds)

  useEffect(() => {
    // Exit early when we reach 0
    if (!timeLeft) return onFinish()

    // Save intervalId to clear the interval when the component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    // Clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId)
    // Add timeLeft as a dependency to re-rerun the effect when we update it
  }, [timeLeft, onFinish])

  return timeLeft
}
