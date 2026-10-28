import { useEffect, useState } from 'react'
import { getCitizens } from '../api/citizensApi'
import type { GetCitizensParams } from '../api/citizensApi'
import type { Citizen } from '../types/citizen'
import { CITIZENS_COUNT } from '../api/generator'

export function useCitizens(params: GetCitizensParams) {
  const [rows, setRows] = useState<Citizen[]>([])
  const [total, setTotal] = useState(0)
  const [all, setAll] = useState(CITIZENS_COUNT)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    getCitizens(params).then((response) => {
      // старый ответ не должен перезаписать новый
      if (!cancelled) {
        setRows(response.rows)
        setTotal(response.total)
        setAll(response.all)
        setLoading(false)
      }
    })

    return () => {
      cancelled = true
    }
  }, [params])

  return { rows, total, all, loading }
}
