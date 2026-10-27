import { useEffect, useState } from 'react'
import { getCitizen } from '../api/citizensApi'
import type { CitizenCardData } from '../api/citizensApi'

export function useCitizen(id: number) {
  const [data, setData] = useState<CitizenCardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    getCitizen(id).then((response) => {
      if (!cancelled) {
        setData(response)
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [id])

  return { data, loading }
}
