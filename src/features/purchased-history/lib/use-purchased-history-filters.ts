import { IPurchaseHistoryProps } from '../model/purchase-history-props.interface'
import { selectConfig } from '../utils/select-config'

export const usePurchaseHistoryFilters = (props: IPurchaseHistoryProps) => {
  const { onSetDay, onSetMonth, onSetYear } = props

  const config = selectConfig({
    days: {
      onChange: (opt) => onSetDay(opt?.value),
    },
    months: {
      onChange: (opt) => onSetMonth(opt?.value),
    },
    years: {
      onChange: (opt) => onSetYear(opt?.value),
    },
  })

  return config
}
