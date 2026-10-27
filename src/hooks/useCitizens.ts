import { useEffect, useState } from 'react'
import { getCitizens } from '../api/citizensApi'
import type { GetCitizensParams } from '../api/citizensApi'
import type { Citizen } from '../types/citizen'

export function useCitizens(params: GetCitizensParams) {
  const [rows, setRows] = useState<Citizen[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    getCitizens(params).then((response) => {
      // старый ответ не должен перезаписать новый
      if (!cancelled) {
        setRows(response.rows)
        setTotal(response.total)
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [params])

  return { rows, total, loading }
}
