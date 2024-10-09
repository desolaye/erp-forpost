import { Checkbox } from '@mui/material'
import { ReactNode } from 'react'
import { useNavigate } from '@tanstack/react-router'
import cn from 'classnames'

import { isRenderable } from '@/shared/utils/is-renderable'
import { TableConfigType } from '../model/table-config.type'

import cls from './smart-table.module.scss'

interface ISmartTableRowProps<T> {
  actions?: ReactNode
  config: TableConfigType<T>
  row: T
  to?: string
  check?: {
    onCheck: () => void
    isChecked: boolean
  }
}

export const SmartTableRow = <T,>(props: ISmartTableRowProps<T>) => {
  const { config, row, check, actions, to } = props
  const navigate = useNavigate()

  const classes = cn({ [cls.smart_table__table__link]: to })

  return (
    <tr className={classes} onClick={() => navigate({ to })}>
      {check && (
        <td onClick={(e) => e.stopPropagation()}>
          <Checkbox checked={check.isChecked} onChange={check.onCheck} />
        </td>
      )}

      {config.map(([key, cell]) => (
        <td
          className={cls.smart_table__table__row}
          key={String(key)}
          style={{ maxWidth: cell.maxWidth }}
        >
          {isRenderable(row[key]) && row[key]}
        </td>
      ))}

      {actions && <td onClick={(e) => e.stopPropagation()}>{actions}</td>}
    </tr>
  )
}
