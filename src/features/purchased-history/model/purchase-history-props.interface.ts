import { SyntheticEvent } from 'react'

export interface IPurchaseHistoryProps {
  tab: boolean | number
  onTabChange: (event: SyntheticEvent, newValue: boolean | number) => void
  onSetDay: (day?: string) => void
  onSetMonth: (month?: string) => void
  onSetYear: (year?: string) => void
}
