import type { CitizenRelated } from './citizen'

export type FieldType =
  | 'text'
  | 'number'
  | 'date'
  | 'textarea'
  | 'select'
  | 'multiselect'
  | 'autocomplete'
  | 'radio'
  | 'checkbox'
  | 'switch'

export interface FieldConfig {
  name: string
  label: string
  type: FieldType
  options?: string[]
  // варианты значений для генерации данных текстовых полей
  samples?: string[]
  // для number - диапазон значений, для date - диапазон годов
  range?: [number, number]
  required?: boolean
  // регулярное выражение для проверки формата
  pattern?: { value: string; message: string }
}

export interface FieldGroup {
  title: string
  fields: FieldConfig[]
}

export interface SectionConfig {
  id: string
  title: string
  groups: FieldGroup[]
  // связанная таблица раздела
  related?: keyof CitizenRelated
}
