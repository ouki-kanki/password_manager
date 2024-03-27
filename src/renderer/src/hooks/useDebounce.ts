import { useState, useEffect } from 'react'

export const useDebounce = <T>(value: T, delay = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return (): void => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}
