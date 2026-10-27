import type { Citizen, CitizenFilters } from '../types/citizen'
import { getAge } from '../utils/date'
import { CITIZENS_COUNT, generateCitizens } from './generator'

export type SortOrder = 'asc' | 'desc'

export interface GetCitizensParams {
  page: number
  pageSize: number
  sortField?: keyof Citizen
  sortOrder?: SortOrder
  filters: CitizenFilters
}

export interface CitizensResponse {
  rows: Citizen[]
  total: number
}

export const emptyFilters: CitizenFilters = {
  search: '',
  gender: '',
  status: '',
  district: '',
  category: '',
  ageFrom: null,
  ageTo: null,
}

// "База данных" - массив создаётся один раз при первом запросе
let citizens: Citizen[] = []

function getAllCitizens() {
  if (citizens.length === 0) {
    citizens = generateCitizens(CITIZENS_COUNT)
  }
  return citizens
}

function filterCitizens(list: Citizen[], filters: CitizenFilters) {
  const search = filters.search.trim().toLowerCase()

  return list.filter((citizen) => {
    if (search) {
      const fullName = `${citizen.lastName} ${citizen.firstName} ${citizen.middleName}`.toLowerCase()
      if (!fullName.includes(search)) {
        return false
      }
    }
    if (filters.gender && citizen.gender !== filters.gender) {
      return false
    }
    if (filters.status && citizen.status !== filters.status) {
      return false
    }
    if (filters.district && citizen.district !== filters.district) {
      return false
    }
    if (filters.category && citizen.category !== filters.category) {
      return false
    }
    if (filters.ageFrom !== null || filters.ageTo !== null) {
      const age = getAge(citizen.birthDate)
      if (filters.ageFrom !== null && age < filters.ageFrom) {
        return false
      }
      if (filters.ageTo !== null && age > filters.ageTo) {
        return false
      }
    }
    return true
  })
}

function sortCitizens(list: Citizen[], field: keyof Citizen, order: SortOrder) {
  const direction = order === 'asc' ? 1 : -1

  return [...list].sort((a, b) => {
    const first = a[field]
    const second = b[field]
    if (typeof first === 'number' && typeof second === 'number') {
      return (first - second) * direction
    }
    return String(first).localeCompare(String(second), 'ru') * direction
  })
}

export function getCitizens(params: GetCitizensParams): Promise<CitizensResponse> {
  return new Promise((resolve) => {
    // небольшая задержка, как у настоящего сервера
    setTimeout(() => {
      let list = filterCitizens(getAllCitizens(), params.filters)

      if (params.sortField) {
        list = sortCitizens(list, params.sortField, params.sortOrder ?? 'asc')
      }

      const start = params.page * params.pageSize
      resolve({
        rows: list.slice(start, start + params.pageSize),
        total: list.length,
      })
    }, 200)
  })
}
