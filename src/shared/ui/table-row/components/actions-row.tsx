import { ReactNode } from 'react'

import cls from '../table-row.module.scss'

interface IActionsRowProps {
  actions?: ReactNode
}

export const ActionsRow = (props: IActionsRowProps) => {
  const { actions } = props

  if (!actions) return null

  return <div className={cls.table_row__icon}>{actions}</div>
}
