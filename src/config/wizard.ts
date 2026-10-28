export interface WizardStep {
  title: string
  // id разделов из config/sections, поля которых показываем на шаге
  sectionIds: string[]
}

export const wizardSteps: WizardStep[] = [
  { title: 'Основные сведения', sectionIds: ['main'] },
  { title: 'Документы', sectionIds: ['documents'] },
  { title: 'Адрес и контакты', sectionIds: ['addresses', 'contacts'] },
  { title: 'Социальный статус', sectionIds: ['social'] },
]

// Поля, которые показываем на последнем шаге перед созданием
export const summaryFields = [
  'lastName',
  'firstName',
  'middleName',
  'birthDate',
  'gender',
  'snils',
  'phone',
  'city',
  'address',
  'category',
  'status',
]
