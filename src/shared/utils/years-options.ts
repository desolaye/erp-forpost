import dayjs from 'dayjs'

export const yearsOptions = () => {
  const today = dayjs()

  return new Array(today.year() - 2022)
    .fill(today.year())
    .map((v, i) => ({ label: `${v - i}`, value: `${v - i}` }))
}
