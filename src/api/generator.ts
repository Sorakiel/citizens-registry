import type {
  Appeal,
  Benefit,
  Citizen,
  CitizenRelated,
  Education,
  Employment,
  FamilyMember,
  HistoryRecord,
} from '../types/citizen'
import {
  appealStatuses,
  appealTopics,
  categories,
  cities,
  citizenships,
  districts,
  educationLevels,
  familyRelations,
  maritalStatuses,
  statuses,
} from '../config/dictionaries'
import { getAge } from '../utils/date'
import { createRandom, randomDate } from './random'
import type { Random } from './random'
import {
  femaleFirstNames,
  lastNames,
  maleFirstNames,
  maleMiddleNames,
  streets,
} from './names'

export const CITIZENS_COUNT = 100000

function getLastName(lastName: string, isMale: boolean) {
  if (isMale) {
    return lastName
  }
  return lastName + 'а'
}

function getMiddleName(middleName: string, isMale: boolean) {
  if (isMale) {
    return middleName
  }
  return middleName.replace('вич', 'вна')
}

// Категория зависит от возраста, чтобы данные выглядели правдоподобно
function getCategory(random: Random, age: number) {
  const available = categories.filter((category) => {
    if (category === 'Пенсионер') {
      return age >= 55
    }
    if (category === 'Студент') {
      return age <= 30
    }
    if (category === 'Работающий') {
      return age >= 18 && age < 65
    }
    return true
  })
  return random.pick(available)
}

function getSnils(random: Random) {
  const part = () => String(random.int(100, 999))
  return `${part()}-${part()}-${part()} ${random.int(10, 99)}`
}

function getPhone(random: Random) {
  const part = (length: number) => String(random.int(0, 10 ** length - 1)).padStart(length, '0')
  return `+7 9${part(2)} ${part(3)}-${part(2)}-${part(2)}`
}

function generateCitizen(id: number): Citizen {
  const random = createRandom(id)
  const isMale = random.chance(0.47)
  const lastName = getLastName(random.pick(lastNames), isMale)
  const firstName = random.pick(isMale ? maleFirstNames : femaleFirstNames)
  const middleName = getMiddleName(random.pick(maleMiddleNames), isMale)
  const birthDate = randomDate(random, 1940, 2008)

  return {
    id,
    lastName,
    firstName,
    middleName,
    birthDate,
    gender: isMale ? 'Мужской' : 'Женский',
    snils: getSnils(random),
    inn: String(random.int(100000000000, 999999999999)),
    phone: getPhone(random),
    email: `citizen${id}@mail.ru`,
    district: random.pick(districts),
    city: random.pick(cities),
    address: `ул. ${random.pick(streets)}, д. ${random.int(1, 120)}, кв. ${random.int(1, 200)}`,
    status: random.pick(statuses),
    category: getCategory(random, getAge(birthDate)),
    maritalStatus: random.pick(maritalStatuses),
    citizenship: random.chance(0.93) ? citizenships[0] : random.pick(citizenships),
    registrationDate: randomDate(random, 2015, 2026),
    details: {},
  }
}

export function generateCitizens(count: number) {
  const list: Citizen[] = []
  for (let id = 1; id <= count; id++) {
    list.push(generateCitizen(id))
  }
  return list
}

// Связанные таблицы создаём только для открытой карточки, чтобы не хранить их для 100 000 записей
export function generateRelated(citizen: Citizen): CitizenRelated {
  const random = createRandom(citizen.id * 7919)

  const family: FamilyMember[] = []
  const familyCount = random.int(0, 4)
  for (let i = 1; i <= familyCount; i++) {
    const isMale = random.chance(0.5)
    family.push({
      id: i,
      relation: random.pick(familyRelations),
      fullName: `${getLastName(random.pick(lastNames), isMale)} ${random.pick(isMale ? maleFirstNames : femaleFirstNames)} ${getMiddleName(random.pick(maleMiddleNames), isMale)}`,
      birthDate: randomDate(random, 1940, 2020),
      phone: getPhone(random),
      livesTogether: random.chance(0.7),
    })
  }

  const education: Education[] = []
  const educationCount = random.int(1, 3)
  for (let i = 1; i <= educationCount; i++) {
    const startYear = random.int(1960, 2018)
    education.push({
      id: i,
      level: random.pick(educationLevels),
      institution: `Учебное заведение №${random.int(1, 90)}`,
      specialty: random.pick(['Экономика', 'Право', 'Строительство', 'Педагогика', 'Медицина', 'Информатика']),
      startYear,
      endYear: startYear + random.int(2, 6),
      documentNumber: `${random.int(10, 99)}${random.int(100000, 999999)}`,
    })
  }

  const employment: Employment[] = []
  const employmentCount = random.int(0, 4)
  for (let i = 1; i <= employmentCount; i++) {
    employment.push({
      id: i,
      organization: `ООО «${random.pick(['Альфа', 'Восток', 'Дальстрой', 'Амур', 'Прогресс', 'Север'])}»`,
      position: random.pick(['Инженер', 'Бухгалтер', 'Менеджер', 'Водитель', 'Учитель', 'Специалист']),
      startDate: randomDate(random, 2000, 2018),
      endDate: randomDate(random, 2019, 2026),
      salary: random.int(25, 150) * 1000,
    })
  }

  const benefits: Benefit[] = []
  const benefitsCount = random.int(0, 3)
  for (let i = 1; i <= benefitsCount; i++) {
    benefits.push({
      id: i,
      name: random.pick(['Региональная выплата', 'Компенсация ЖКУ', 'Льготный проезд', 'Ежемесячное пособие']),
      startDate: randomDate(random, 2018, 2024),
      endDate: randomDate(random, 2025, 2030),
      documentNumber: `Д-${random.int(1000, 99999)}`,
    })
  }

  const appeals: Appeal[] = []
  const appealsCount = random.int(0, 5)
  for (let i = 1; i <= appealsCount; i++) {
    appeals.push({
      id: i,
      date: randomDate(random, 2020, 2026),
      topic: random.pick(appealTopics),
      status: random.pick(appealStatuses),
      responsible: `${random.pick(lastNames)}а ${random.pick(femaleFirstNames)[0]}.`,
    })
  }

  const history: HistoryRecord[] = []
  const historyCount = random.int(1, 4)
  for (let i = 1; i <= historyCount; i++) {
    history.push({
      id: i,
      date: randomDate(random, 2020, 2026),
      author: `${random.pick(lastNames)}а ${random.pick(femaleFirstNames)[0]}.`,
      action: random.pick(['Создание записи', 'Изменение адреса', 'Изменение статуса', 'Обновление контактов']),
    })
  }

  return { family, education, employment, benefits, appeals, history }
}
