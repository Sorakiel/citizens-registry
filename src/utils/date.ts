export function getAge(birthDate: string) {
  const birth = new Date(birthDate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const hadBirthday =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate())
  if (!hadBirthday) {
    age--
  }
  return age
}

// 2000-05-17 -> 17.05.2000
export function formatDate(date: string) {
  if (!date) {
    return ''
  }
  const [year, month, day] = date.split('-')
  return `${day}.${month}.${year}`
}
