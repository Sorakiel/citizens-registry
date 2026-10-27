import type { FieldConfig, FieldGroup, SectionConfig } from '../types/form'
import {
  categories,
  cities,
  citizenships,
  districts,
  educationLevels,
  familyRelations,
  genders,
  maritalStatuses,
  statuses,
} from './dictionaries'

// Поля, которые лежат прямо в объекте Citizen, остальные хранятся в citizen.details
const coreFields = [
  'lastName',
  'firstName',
  'middleName',
  'birthDate',
  'gender',
  'snils',
  'inn',
  'phone',
  'email',
  'district',
  'city',
  'address',
  'status',
  'category',
  'maritalStatus',
  'citizenship',
  'registrationDate',
]

function getFieldName(name: string) {
  return coreFields.includes(name) ? name : 'details.' + name
}

function text(name: string, label: string, samples?: string[]): FieldConfig {
  return { name: getFieldName(name), label, type: 'text', samples }
}

function textarea(name: string, label: string, samples?: string[]): FieldConfig {
  return { name: getFieldName(name), label, type: 'textarea', samples }
}

function num(name: string, label: string, min: number, max: number): FieldConfig {
  return { name: getFieldName(name), label, type: 'number', range: [min, max] }
}

function date(name: string, label: string, fromYear = 2000, toYear = 2026): FieldConfig {
  return { name: getFieldName(name), label, type: 'date', range: [fromYear, toYear] }
}

function select(name: string, label: string, options: string[]): FieldConfig {
  return { name: getFieldName(name), label, type: 'select', options }
}

function multiselect(name: string, label: string, options: string[]): FieldConfig {
  return { name: getFieldName(name), label, type: 'multiselect', options }
}

function autocomplete(name: string, label: string, options: string[]): FieldConfig {
  return { name: getFieldName(name), label, type: 'autocomplete', options }
}

function radio(name: string, label: string, options: string[]): FieldConfig {
  return { name: getFieldName(name), label, type: 'radio', options }
}

function checkbox(name: string, label: string): FieldConfig {
  return { name: getFieldName(name), label, type: 'checkbox' }
}

function toggle(name: string, label: string): FieldConfig {
  return { name: getFieldName(name), label, type: 'switch' }
}

const organizations = [
  'ООО «Альфа»',
  'ООО «Восток»',
  'АО «Дальстрой»',
  'ИП Смирнов А. В.',
  'МБОУ СОШ №12',
  'КГБУЗ «Городская поликлиника №3»',
]

const regions = ['Хабаровский край', 'Приморский край', 'Амурская область', 'Сахалинская область']

const streetNames = ['Ленина', 'Советская', 'Мира', 'Гагарина', 'Пушкина', 'Садовая', 'Школьная']

export const sections: SectionConfig[] = [
  {
    id: 'main',
    title: 'Основные сведения',
    groups: [
      {
        title: 'Личные данные',
        fields: [
          text('lastName', 'Фамилия'),
          text('firstName', 'Имя'),
          text('middleName', 'Отчество'),
          date('birthDate', 'Дата рождения', 1940, 2008),
          text('birthPlace', 'Место рождения', cities),
          radio('gender', 'Пол', genders),
          select('citizenship', 'Гражданство', citizenships),
          select('nationality', 'Национальность', ['Русский', 'Украинец', 'Татарин', 'Белорус', 'Казах', 'Другая']),
          select('maritalStatus', 'Семейное положение', maritalStatuses),
          checkbox('changedName', 'Ранее менял(а) фамилию'),
          text('previousLastName', 'Прежняя фамилия', ['Смирнова', 'Кузнецова', 'Петрова', 'Орлова']),
        ],
      },
      {
        title: 'Идентификаторы',
        fields: [
          text('snils', 'СНИЛС'),
          text('inn', 'ИНН'),
          text('oms', 'Номер полиса ОМС', ['2700 1234 5678 9012', '2700 9876 5432 1098', '2700 5555 4444 3333']),
        ],
      },
    ],
  },
  {
    id: 'documents',
    title: 'Документы',
    groups: [
      {
        title: 'Паспорт гражданина РФ',
        fields: [
          text('passportSeries', 'Серия', ['0814', '0915', '0716', '1019', '0511', '0618']),
          text('passportNumber', 'Номер', ['482910', '573021', '640128', '719352', '308841']),
          text('passportIssuedBy', 'Кем выдан', [
            'УМВД России по Хабаровскому краю',
            'ОУФМС России по Центральному району',
            'МВД по Республике Саха',
          ]),
          date('passportIssueDate', 'Дата выдачи', 2005, 2024),
          text('passportDivisionCode', 'Код подразделения', ['270-001', '270-014', '250-003']),
          text('birthCertificate', 'Свидетельство о рождении', ['I-ДВ №483920', 'II-ВС №120938', 'III-ДВ №774120']),
        ],
      },
      {
        title: 'Загранпаспорт и водительское удостоверение',
        fields: [
          checkbox('hasForeignPassport', 'Есть загранпаспорт'),
          text('foreignPassportNumber', 'Номер загранпаспорта', ['75 1234567', '76 7654321', '72 5550011']),
          date('foreignPassportExpiry', 'Действителен до', 2026, 2034),
          checkbox('hasDriverLicense', 'Есть водительское удостоверение'),
          text('driverLicenseNumber', 'Номер ВУ', ['27 12 345678', '27 15 987654', '25 09 112233']),
          multiselect('driverLicenseCategories', 'Категории', ['A', 'B', 'C', 'D', 'E']),
          date('driverLicenseExpiry', 'ВУ действительно до', 2026, 2036),
        ],
      },
      {
        title: 'Воинский учёт',
        fields: [
          select('militaryStatus', 'Состояние воинского учёта', ['Не военнообязанный', 'Запас', 'Призывник', 'Служит']),
          select('militaryRank', 'Воинское звание', ['Рядовой', 'Сержант', 'Лейтенант', 'Капитан']),
          text('militaryOffice', 'Военный комиссариат', ['Военкомат Центрального района', 'Военкомат Северного района']),
          text('militaryIdNumber', 'Номер военного билета', ['АБ 1234567', 'ВГ 7654321', 'ДЕ 1112223']),
        ],
      },
      {
        title: 'Пенсионное и медицинское страхование',
        fields: [
          text('pensionCertificate', 'Номер пенсионного удостоверения', ['045-112233', '045-998877']),
          select('medicalInsurer', 'Страховая медицинская организация', ['Росгосстрах-Мед', 'СОГАЗ-Мед', 'Капитал МС']),
          date('medicalPolicyDate', 'Дата выдачи полиса', 2010, 2025),
        ],
      },
    ],
  },
  {
    id: 'addresses',
    title: 'Адреса и жильё',
    groups: [
      {
        title: 'Адрес регистрации',
        fields: [
          select('regRegion', 'Регион', regions),
          select('district', 'Район', districts),
          autocomplete('city', 'Город', cities),
          text('address', 'Улица, дом, квартира'),
          text('regPostalCode', 'Индекс', ['680000', '680030', '681000', '682640']),
          date('regDate', 'Дата регистрации', 2000, 2026),
        ],
      },
      {
        title: 'Фактическое проживание',
        fields: [
          checkbox('sameAddress', 'Совпадает с адресом регистрации'),
          select('factRegion', 'Регион', regions),
          autocomplete('factCity', 'Город', cities),
          text('factStreet', 'Улица', streetNames),
          text('factHouse', 'Дом', ['5', '12', '27', '48А', '103']),
          text('factApartment', 'Квартира', ['3', '14', '56', '120']),
          text('factPostalCode', 'Индекс', ['680000', '680030', '681000']),
        ],
      },
      {
        title: 'Жилищные условия',
        fields: [
          select('housingType', 'Тип жилья', ['Квартира', 'Частный дом', 'Общежитие', 'Коммунальная квартира']),
          select('ownershipType', 'Основание проживания', [
            'Собственность',
            'Социальный найм',
            'Аренда',
            'Проживает у родственников',
          ]),
          num('livingArea', 'Площадь, м²', 12, 150),
          num('roomsCount', 'Количество комнат', 1, 6),
          num('residentsCount', 'Количество проживающих', 1, 8),
          select('heating', 'Отопление', ['Центральное', 'Печное', 'Газовое', 'Электрическое']),
          toggle('hasWaterSupply', 'Центральное водоснабжение'),
          toggle('needsRepair', 'Требуется ремонт'),
          text('cadastralNumber', 'Кадастровый номер', ['27:23:0010101:45', '27:22:0020304:118']),
        ],
      },
    ],
  },
  {
    id: 'contacts',
    title: 'Контакты',
    groups: [
      {
        title: 'Основные контакты',
        fields: [
          text('phone', 'Телефон'),
          text('additionalPhone', 'Дополнительный телефон', ['+7 914 111-22-33', '+7 924 555-66-77', '+7 984 000-11-22']),
          text('email', 'Электронная почта'),
          select('messenger', 'Мессенджер', ['Telegram', 'WhatsApp', 'Viber', 'Не использует']),
          text('messengerNick', 'Имя в мессенджере', ['@citizen27', '@user_dv', '@amur_man']),
        ],
      },
      {
        title: 'Предпочтения связи',
        fields: [
          radio('preferredContact', 'Предпочтительный способ связи', [
            'Телефон',
            'Электронная почта',
            'Почта России',
            'Личный визит',
          ]),
          select('bestTime', 'Удобное время', ['Утро', 'День', 'Вечер', 'Любое']),
          toggle('notifySms', 'Уведомления по SMS'),
          toggle('notifyEmail', 'Уведомления на почту'),
        ],
      },
      {
        title: 'Контактное лицо',
        fields: [
          text('contactPersonName', 'ФИО', ['Иванов Пётр Сергеевич', 'Петрова Анна Ивановна', 'Сидоров Олег Андреевич']),
          select('contactPersonRelation', 'Кем приходится', [...familyRelations, 'Опекун', 'Знакомый']),
          text('contactPersonPhone', 'Телефон', ['+7 914 222-33-44', '+7 962 777-88-99']),
        ],
      },
    ],
  },
  {
    id: 'social',
    title: 'Социальный статус',
    groups: [
      {
        title: 'Постановка на учёт',
        fields: [
          select('status', 'Статус', statuses),
          select('category', 'Категория', categories),
          date('registrationDate', 'Дата постановки на учёт', 2015, 2026),
          select('registrationBasis', 'Основание постановки', [
            'Заявление гражданина',
            'Направление организации',
            'Межведомственный запрос',
            'Решение комиссии',
          ]),
          text('registrationNumber', 'Номер дела', ['РК-10234', 'РК-20871', 'РК-33012', 'РК-48820']),
          text('registeredBy', 'Принял специалист', ['Кузнецова Е. А.', 'Морозова Т. И.', 'Орлова Н. П.']),
          date('removalDate', 'Дата снятия с учёта', 2020, 2026),
          select('removalReason', 'Причина снятия', [
            'Смерть',
            'Выезд за пределы региона',
            'Утрата оснований',
            'По заявлению',
          ]),
        ],
      },
      {
        title: 'Инвалидность',
        fields: [
          checkbox('hasDisability', 'Установлена инвалидность'),
          select('disabilityGroup', 'Группа', ['I группа', 'II группа', 'III группа', 'Ребёнок-инвалид']),
          date('disabilityDate', 'Дата установления', 2005, 2026),
          select('disabilityReason', 'Причина', [
            'Общее заболевание',
            'Трудовое увечье',
            'Инвалид с детства',
            'Военная травма',
          ]),
          checkbox('needsSocialService', 'Нуждается в социальном обслуживании'),
          multiselect('serviceTypes', 'Виды обслуживания', [
            'Социальная помощь на дому',
            'Санаторное лечение',
            'Доставка продуктов',
            'Помощь юриста',
            'Психологическая помощь',
          ]),
        ],
      },
      {
        title: 'Семья и доход',
        fields: [
          toggle('largeFamily', 'Многодетная семья'),
          num('childrenCount', 'Количество детей', 0, 6),
          toggle('singleParent', 'Одинокий родитель'),
          select('incomeLevel', 'Уровень дохода', ['Ниже прожиточного минимума', 'Средний', 'Выше среднего']),
          num('averageIncome', 'Среднедушевой доход, руб.', 8000, 120000),
        ],
      },
      {
        title: 'Статусы и пенсия',
        fields: [
          select('veteranStatus', 'Статус ветерана', [
            'Нет',
            'Ветеран труда',
            'Ветеран боевых действий',
            'Труженик тыла',
          ]),
          select('pensionType', 'Вид пенсии', ['Нет', 'По старости', 'По инвалидности', 'По потере кормильца']),
          num('pensionAmount', 'Размер пенсии, руб.', 0, 60000),
          date('retirementDate', 'Дата выхода на пенсию', 1995, 2030),
        ],
      },
    ],
  },
  {
    id: 'education',
    title: 'Образование',
    related: 'education',
    groups: [
      {
        title: 'Образование',
        fields: [
          select('educationLevel', 'Уровень образования', educationLevels),
          text('lastInstitution', 'Последнее учебное заведение', [
            'ТОГУ',
            'ДВГУПС',
            'Хабаровский колледж связи',
            'Школа №35',
          ]),
          num('graduationYear', 'Год окончания', 1960, 2024),
          text('specialty', 'Специальность', ['Экономика', 'Право', 'Строительство', 'Педагогика', 'Информатика']),
          text('diplomaNumber', 'Номер диплома', ['101205 0012345', '102705 0054321', '272400 0099887']),
          select('academicDegree', 'Учёная степень', ['Нет', 'Кандидат наук', 'Доктор наук']),
        ],
      },
      {
        title: 'Навыки',
        fields: [
          multiselect('languages', 'Иностранные языки', ['Английский', 'Немецкий', 'Китайский', 'Французский', 'Японский']),
          select('languageLevel', 'Уровень владения', ['Базовый', 'Средний', 'Продвинутый', 'Свободно']),
          select('computerSkills', 'Работа с компьютером', ['Начальный', 'Уверенный пользователь', 'Продвинутый']),
          num('drivingExperience', 'Водительский стаж, лет', 0, 40),
          checkbox('hasRetraining', 'Проходил(а) переподготовку'),
          text('retrainingCourse', 'Название курса', ['Основы бухгалтерского учёта', 'Охрана труда', '1С: Предприятие']),
          textarea('professionalSkills', 'Профессиональные навыки', [
            'Ведение документации, работа с клиентами',
            'Бухгалтерский учёт, отчётность',
            'Строительные работы, чтение чертежей',
          ]),
          textarea('certificates', 'Сертификаты и удостоверения', [
            'Удостоверение по охране труда',
            'Сертификат оператора ПК',
            'Нет',
          ]),
        ],
      },
    ],
  },
  {
    id: 'employment',
    title: 'Работа и занятость',
    related: 'employment',
    groups: [
      {
        title: 'Текущее место работы',
        fields: [
          select('employmentStatus', 'Статус занятости', [
            'Работает',
            'Не работает',
            'Самозанятый',
            'Индивидуальный предприниматель',
            'Работающий пенсионер',
          ]),
          text('currentEmployer', 'Работодатель', organizations),
          text('employerInn', 'ИНН работодателя', ['2721000111', '2723456789', '2700123456']),
          text('employerAddress', 'Адрес работодателя', ['г. Хабаровск, ул. Ленина, 10', 'г. Хабаровск, ул. Мира, 25']),
          text('position', 'Должность', ['Инженер', 'Бухгалтер', 'Менеджер', 'Водитель', 'Учитель', 'Специалист']),
          select('employmentType', 'Тип занятости', ['Полная занятость', 'Частичная занятость', 'Сезонная', 'Удалённая']),
          select('workSchedule', 'График работы', ['5/2', '2/2', 'Сменный', 'Свободный']),
          num('workExperience', 'Общий стаж, лет', 0, 45),
          date('employmentStartDate', 'Дата начала работы', 2000, 2026),
          text('workPhone', 'Рабочий телефон', ['+7 4212 30-11-22', '+7 4212 45-67-89']),
          num('salary', 'Заработная плата, руб.', 15000, 200000),
        ],
      },
      {
        title: 'Поиск работы',
        fields: [
          checkbox('seekingJob', 'Ищет работу'),
          checkbox('registeredInEmploymentCenter', 'Состоит на учёте в центре занятости'),
          toggle('unemploymentBenefit', 'Получает пособие по безработице'),
          text('desiredPosition', 'Желаемая должность', ['Менеджер', 'Охранник', 'Продавец', 'Курьер']),
          num('desiredSalary', 'Желаемая зарплата, руб.', 20000, 150000),
          toggle('readyToRelocate', 'Готов(а) к переезду'),
          toggle('readyForBusinessTrips', 'Готов(а) к командировкам'),
          toggle('hasOwnTransport', 'Есть личный транспорт'),
        ],
      },
    ],
  },
  {
    id: 'health',
    title: 'Здоровье',
    groups: [
      {
        title: 'Медицинские сведения',
        fields: [
          select('healthGroup', 'Группа здоровья', ['I', 'II', 'III', 'IV', 'V']),
          select('bloodType', 'Группа крови', [
            'O(I) Rh+',
            'O(I) Rh−',
            'A(II) Rh+',
            'A(II) Rh−',
            'B(III) Rh+',
            'B(III) Rh−',
            'AB(IV) Rh+',
            'AB(IV) Rh−',
          ]),
          multiselect('chronicDiseases', 'Хронические заболевания', [
            'Гипертония',
            'Диабет',
            'Астма',
            'Артрит',
            'Заболевания сердца',
          ]),
          textarea('allergies', 'Аллергии', ['Нет', 'Пыльца', 'Антибиотики', 'Цитрусовые']),
          text('clinic', 'Поликлиника', ['Городская поликлиника №3', 'Поликлиника №7', 'Краевая клиника']),
          text('clinicDoctor', 'Участковый врач', ['Орлова И. С.', 'Громов П. А.', 'Белова Н. В.']),
          date('lastCheckup', 'Последний осмотр', 2023, 2026),
          date('vaccinationDate', 'Дата последней вакцинации', 2021, 2026),
        ],
      },
      {
        title: 'Потребности и ограничения',
        fields: [
          select('mobility', 'Передвижение', ['Самостоятельно', 'С тростью', 'На коляске', 'Лежачий']),
          toggle('needsRehabilitation', 'Нужна реабилитация'),
          toggle('needsCaretaker', 'Нужен сиделка или помощник'),
          checkbox('specialDiet', 'Специальная диета'),
          checkbox('hasHearingImpairment', 'Нарушение слуха'),
          checkbox('hasVisionImpairment', 'Нарушение зрения'),
          textarea('medicalNotes', 'Примечания врача', [
            'Особых замечаний нет',
            'Рекомендован ежегодный осмотр',
            'Требуется наблюдение кардиолога',
          ]),
        ],
      },
    ],
  },
  {
    id: 'family',
    title: 'Семья',
    related: 'family',
    groups: [
      {
        title: 'Супруг(а)',
        fields: [
          date('marriageDate', 'Дата заключения брака', 1970, 2025),
          text('spouseName', 'ФИО супруга(и)', ['Иванов Пётр Сергеевич', 'Петрова Анна Ивановна', 'Морозов Олег Игоревич']),
          date('spouseBirthDate', 'Дата рождения супруга(и)', 1940, 2005),
          text('spouseEmployer', 'Место работы супруга(и)', organizations),
          text('spousePhone', 'Телефон супруга(и)', ['+7 914 300-40-50', '+7 924 600-70-80']),
          date('divorceDate', 'Дата расторжения брака', 1990, 2026),
        ],
      },
      {
        title: 'Состав семьи',
        fields: [
          select('familyType', 'Тип семьи', ['Полная', 'Неполная', 'Многодетная', 'Бездетная']),
          num('dependentsCount', 'Иждивенцев', 0, 5),
          num('minorChildrenCount', 'Несовершеннолетних детей', 0, 4),
          num('familyIncome', 'Доход семьи, руб.', 20000, 300000),
          toggle('livesWithParents', 'Проживает с родителями'),
          checkbox('hasGuardianship', 'Есть опека или попечительство'),
          text('guardianName', 'ФИО опекуна', ['Сидорова Мария Петровна', 'Громов Андрей Игоревич']),
        ],
      },
    ],
  },
  {
    id: 'benefits',
    title: 'Льготы и выплаты',
    related: 'benefits',
    groups: [
      {
        title: 'Льготы',
        fields: [
          multiselect('benefitCategories', 'Виды льгот', [
            'Региональная выплата',
            'Компенсация ЖКУ',
            'Льготный проезд',
            'Ежемесячное пособие',
            'Лекарственное обеспечение',
          ]),
          text('benefitBasis', 'Основание', ['Закон края №123', 'Постановление правительства №45', 'Решение комиссии']),
          text('benefitDocumentNumber', 'Номер документа', ['Д-10293', 'Д-48201', 'Д-77310']),
          date('benefitStartDate', 'Действует с', 2018, 2026),
          date('benefitEndDate', 'Действует до', 2026, 2032),
          select('utilitiesCompensation', 'Компенсация ЖКУ', ['30%', '50%', '100%']),
          toggle('transportBenefit', 'Льготный проезд'),
          toggle('medicineBenefit', 'Льготные лекарства'),
        ],
      },
      {
        title: 'Выплаты',
        fields: [
          select('paymentMethod', 'Способ получения', ['На банковскую карту', 'Через Почту России', 'Наличными в кассе']),
          select('bankName', 'Банк', ['Сбербанк', 'ВТБ', 'Дальневосточный банк', 'Почта Банк']),
          num('paymentDay', 'День выплаты', 1, 28),
          toggle('receivesHousingSubsidy', 'Получает субсидию на жильё'),
          num('subsidyAmount', 'Размер субсидии, руб.', 0, 15000),
          date('lastPaymentDate', 'Дата последней выплаты', 2026, 2026),
        ],
      },
    ],
  },
  {
    id: 'appeals',
    title: 'Обращения',
    related: 'appeals',
    groups: [],
  },
  {
    id: 'history',
    title: 'История изменений',
    related: 'history',
    groups: [],
  },
  {
    id: 'service',
    title: 'Служебная информация',
    groups: [
      {
        title: 'Сведения об обращении',
        fields: [
          select('source', 'Источник обращения', ['Личное обращение', 'Портал госуслуг', 'Почта', 'Телефон']),
          text('operator', 'Оператор', ['Кузнецова Е. А.', 'Морозова Т. И.', 'Орлова Н. П.']),
          date('lastContactDate', 'Дата последнего контакта', 2025, 2026),
          text('archiveNumber', 'Номер в архиве', ['А-1021', 'А-3340', 'Б-0087']),
          radio('priority', 'Приоритет', ['Обычный', 'Повышенный', 'Срочный']),
          checkbox('consentPersonalData', 'Согласие на обработку персональных данных'),
          date('consentDate', 'Дата согласия', 2015, 2026),
          textarea('comment', 'Комментарий', ['Документы в полном объёме', 'Требуется уточнить адрес', 'Замечаний нет']),
        ],
      },
    ],
  },
]

// Все поля всех разделов одним списком
export function getAllFields(): FieldConfig[] {
  const result: FieldConfig[] = []
  sections.forEach((section) => {
    section.groups.forEach((group: FieldGroup) => {
      result.push(...group.fields)
    })
  })
  return result
}
