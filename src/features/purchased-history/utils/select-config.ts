import { daysOptions } from '@/shared/utils/days-options'
import { monthOptions } from '@/shared/utils/months-options'
import { yearsOptions } from '@/shared/utils/years-options'

type Option = { label: string; value: string } | null

interface ISelectConfig {
  days: {
    onChange: (opt: Option) => void
  }
  months: {
    onChange: (opt: Option) => void
  }
  years: {
    onChange: (opt: Option) => void
  }
}

export const selectConfig = (props: ISelectConfig) => {
  const { days, months, years } = props

  return [
    {
      placeholder: 'Поиск по дню',
      options: daysOptions,
      onChange: days.onChange,
    },
    {
      placeholder: 'Поиск по месяцу',
      options: monthOptions,
      onChange: months.onChange,
    },
    { placeholder: 'Поиск по году', options: yearsOptions(), onChange: years.onChange },
  ]
}
