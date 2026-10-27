import type { Citizen } from '../types/citizen'
import type { FieldConfig } from '../types/form'
import { formatDate } from './date'

// Значение поля в виде строки для просмотра
export function getFieldText(citizen: Citizen, field: FieldConfig) {
  const value = field.name.startsWith('details.')
    ? citizen.details[field.name.replace('details.', '')]
    : citizen[field.name as keyof Citizen]

  if (field.type === 'checkbox' || field.type === 'switch') {
    return value ? 'Да' : 'Нет'
  }
  if (value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
    return '—'
  }
  if (field.type === 'date') {
    return formatDate(String(value))
  }
  if (Array.isArray(value)) {
    return value.join(', ')
  }
  if (typeof value === 'number') {
    return value.toLocaleString('ru-RU')
  }
  return String(value)
}
