import { useEffect, useState } from 'react'

export default function useFetch<T>(url: string): [null | T, () => void] {
  const [data, setData] = useState<null | T>(null)

  async function fetchData() {
    const response = await fetch(url)
    const newData = await response.json()
    setData(newData)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return [data, fetchData]
}
