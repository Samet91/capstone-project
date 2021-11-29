import { useState } from 'react'

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [storedValue: T, setValue: (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  })
  const setValue = (value: T) => {
    setStoredValue(value)
    localStorage.setItem(key, JSON.stringify(value))
  }
  return [storedValue, setValue]
}
