export type Gender = 'Мужской' | 'Женский'

export type CitizenStatus = 'Активен' | 'Приостановлен' | 'Снят с учёта'

// Значения полей карточки, которые не вынесены в отдельные свойства
export type FieldValue = string | number | boolean | string[]

export interface Citizen {
  id: number
  lastName: string
  firstName: string
  middleName: string
  birthDate: string
  gender: Gender
  snils: string
  inn: string
  phone: string
  email: string
  district: string
  city: string
  address: string
  status: CitizenStatus
  category: string
  maritalStatus: string
  citizenship: string
  registrationDate: string
  // остальные поля карточки (разделы), ключ - имя поля из конфига
  details: Record<string, FieldValue>
}

export interface FamilyMember {
  id: number
  relation: string
  fullName: string
  birthDate: string
  phone: string
  livesTogether: boolean
}

export interface Education {
  id: number
  level: string
  institution: string
  specialty: string
  startYear: number
  endYear: number
  documentNumber: string
}

export interface Employment {
  id: number
  organization: string
  position: string
  startDate: string
  endDate: string
  salary: number
}

export interface Benefit {
  id: number
  name: string
  startDate: string
  endDate: string
  documentNumber: string
}

export interface Appeal {
  id: number
  date: string
  topic: string
  status: string
  responsible: string
}

export interface HistoryRecord {
  id: number
  date: string
  author: string
  action: string
}

// Связанные таблицы карточки
export interface CitizenRelated {
  family: FamilyMember[]
  education: Education[]
  employment: Employment[]
  benefits: Benefit[]
  appeals: Appeal[]
  history: HistoryRecord[]
}

export interface CitizenFilters {
  search: string
  gender: string
  status: string
  district: string
  category: string
  ageFrom: number | null
  ageTo: number | null
}
