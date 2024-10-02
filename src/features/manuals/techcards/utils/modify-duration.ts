import dayjs from 'dayjs'

export const modifyDuration = (duration: string) => {
  const dayJsDuration = dayjs(duration)

  const hours =
    dayJsDuration.hour() < 10 ? `0${dayJsDuration.hour()}` : dayJsDuration.hour()
  const minutes =
    dayJsDuration.minute() < 10 ? `0${dayJsDuration.minute()}` : dayJsDuration.minute()
  const seconds =
    dayJsDuration.second() < 10 ? `0${dayJsDuration.second()}` : dayJsDuration.second()

  console.log(`${hours}:${minutes}:${seconds}`)

  return `${hours}:${minutes}:${seconds}`
}
