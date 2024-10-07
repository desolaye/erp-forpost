import { monthOptions } from '@/shared/utils/months-options'
import { yearsOptions } from '@/shared/utils/years-options'

type Option = { label: string; value: string } | null

interface ISelectConfig {
  executors: {
    onSearch: (name: string) => void
    onChange: (opt: Option) => void
    options: Option[]
  }
  responsible: {
    onSearch: (name: string) => void
    onChange: (opt: Option) => void
    options: Option[]
  }
  months: {
    onChange: (opt: Option) => void
  }
  years: {
    onChange: (opt: Option) => void
  }
}

export const selectConfig = (props: ISelectConfig) => {
  const { executors, responsible, months, years } = props

  return [
    {
      placeholder: 'Поиск по исполнителю',
      onInputChange: executors.onSearch,
      onChange: executors.onChange,
      options: executors.options,
      width: '100%',
    },
    {
      placeholder: 'Поиск по ответственному',
      onInputChange: responsible.onSearch,
      onChange: responsible.onChange,
      options: responsible.options,
      width: '100%',
    },
    {
      placeholder: 'Поиск по месяцу',
      options: monthOptions,
      onChange: months.onChange,
    },
    { placeholder: 'Поиск по году', options: yearsOptions(), onChange: years.onChange },
  ]
}
