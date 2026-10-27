import type { CitizenRelated } from '../types/citizen'

export interface RelatedColumn {
  key: string
  label: string
  type?: 'date' | 'boolean' | 'money'
}

export interface RelatedTableConfig {
  title: string
  columns: RelatedColumn[]
}

export const relatedTables: Record<keyof CitizenRelated, RelatedTableConfig> = {
  family: {
    title: 'Члены семьи',
    columns: [
      { key: 'relation', label: 'Степень родства' },
      { key: 'fullName', label: 'ФИО' },
      { key: 'birthDate', label: 'Дата рождения', type: 'date' },
      { key: 'phone', label: 'Телефон' },
      { key: 'livesTogether', label: 'Проживает вместе', type: 'boolean' },
    ],
  },
  education: {
    title: 'Образование',
    columns: [
      { key: 'level', label: 'Уровень' },
      { key: 'institution', label: 'Учебное заведение' },
      { key: 'specialty', label: 'Специальность' },
      { key: 'startYear', label: 'Начало' },
      { key: 'endYear', label: 'Окончание' },
      { key: 'documentNumber', label: 'Документ' },
    ],
  },
  employment: {
    title: 'Места работы',
    columns: [
      { key: 'organization', label: 'Организация' },
      { key: 'position', label: 'Должность' },
      { key: 'startDate', label: 'Принят', type: 'date' },
      { key: 'endDate', label: 'Уволен', type: 'date' },
      { key: 'salary', label: 'Оклад', type: 'money' },
    ],
  },
  benefits: {
    title: 'Назначенные льготы',
    columns: [
      { key: 'name', label: 'Льгота' },
      { key: 'startDate', label: 'С', type: 'date' },
      { key: 'endDate', label: 'По', type: 'date' },
      { key: 'documentNumber', label: 'Документ' },
    ],
  },
  appeals: {
    title: 'Обращения',
    columns: [
      { key: 'date', label: 'Дата', type: 'date' },
      { key: 'topic', label: 'Тема' },
      { key: 'status', label: 'Статус' },
      { key: 'responsible', label: 'Ответственный' },
    ],
  },
  history: {
    title: 'История изменений',
    columns: [
      { key: 'date', label: 'Дата', type: 'date' },
      { key: 'author', label: 'Сотрудник' },
      { key: 'action', label: 'Действие' },
    ],
  },
}
