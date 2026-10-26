// Простой генератор псевдослучайных чисел, чтобы данные не менялись при перезагрузке
export function createRandom(seed: number) {
  let state = seed

  function next() {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  function int(min: number, max: number) {
    return Math.floor(next() * (max - min + 1)) + min
  }

  function pick<T>(list: T[]): T {
    return list[int(0, list.length - 1)]
  }

  function chance(probability: number) {
    return next() < probability
  }

  return { next, int, pick, chance }
}

export type Random = ReturnType<typeof createRandom>

function pad(value: number) {
  return String(value).padStart(2, '0')
}

// Возвращает дату в формате ГГГГ-ММ-ДД
export function randomDate(random: Random, fromYear: number, toYear: number) {
  const year = random.int(fromYear, toYear)
  const month = random.int(1, 12)
  const day = random.int(1, 28)
  return `${year}-${pad(month)}-${pad(day)}`
}
