import type { Citizen, CitizenFilters, CitizenRelated } from '../types/citizen'
import { getAge } from '../utils/date'
import { CITIZENS_COUNT, generateCitizens, generateDetails, generateRelated } from './generator'

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
  // сколько всего записей в картотеке без фильтров
  all: number
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

const STORAGE_KEY = 'citizens-registry-changes'

// Правки и новые записи хранятся в браузере, чтобы не пропадали после перезагрузки
interface Changes {
  edited: Record<number, Citizen>
  created: Citizen[]
}

function readChanges(): Changes {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch {
    // хранилище недоступно, работаем без него
  }
  return { edited: {}, created: [] }
}

function writeChanges() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(changes))
  } catch {
    // хранилище недоступно
  }
}

const changes = readChanges()

// "База данных" - массив создаётся один раз при первом запросе
let citizens: Citizen[] = []

function getAllCitizens() {
  if (citizens.length === 0) {
    citizens = generateCitizens(CITIZENS_COUNT)
    Object.values(changes.edited).forEach((citizen) => {
      citizens[citizen.id - 1] = citizen
    })
    citizens.push(...changes.created)
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
        all: getAllCitizens().length,
      })
    }, 200)
  })
}

export interface CitizenCardData {
  citizen: Citizen
  related: CitizenRelated
}

export function getCitizen(id: number): Promise<CitizenCardData | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // id идут подряд с единицы
      const citizen = getAllCitizens()[id - 1]

      if (!citizen) {
        resolve(null)
        return
      }

      // у изменённых и созданных записей поля карточки уже сохранены
      const hasDetails = Object.keys(citizen.details).length > 0
      const isNew = id > CITIZENS_COUNT

      resolve({
        citizen: hasDetails ? citizen : { ...citizen, details: generateDetails(citizen) },
        related: isNew
          ? { family: [], education: [], employment: [], benefits: [], appeals: [], history: [] }
          : generateRelated(citizen),
      })
    }, 200)
  })
}

export function saveCitizen(citizen: Citizen): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      getAllCitizens()[citizen.id - 1] = citizen

      if (citizen.id > CITIZENS_COUNT) {
        const index = changes.created.findIndex((item) => item.id === citizen.id)
        changes.created[index] = citizen
      } else {
        changes.edited[citizen.id] = citizen
      }
      writeChanges()
      resolve()
    }, 300)
  })
}

export function createCitizen(data: Citizen): Promise<Citizen> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const list = getAllCitizens()
      const citizen = { ...data, id: list.length + 1 }

      list.push(citizen)
      changes.created.push(citizen)
      writeChanges()
      resolve(citizen)
    }, 300)
  })
}
