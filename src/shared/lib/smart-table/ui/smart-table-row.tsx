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
  onClick?: () => void
  check?: {
    onCheck: () => void
    isChecked: boolean
  }
}

export const SmartTableRow = <T,>(props: ISmartTableRowProps<T>) => {
  const { config, row, check, actions, to, onClick } = props
  const navigate = useNavigate()

  const classes = cn({ [cls.smart_table__table__link]: to || onClick })

  const handleClick = () => {
    if (to) navigate({ to })
    if (onClick) onClick()
  }

  return (
    <tr className={classes} onClick={handleClick}>
      {check && (
        <td onClick={(e) => e.stopPropagation()}>
          <Checkbox checked={check.isChecked} onChange={check.onCheck} />
        </td>
      )}

      {config.map(([key, cell]) => (
        <td
          className={cls.smart_table__table__td}
          key={String(key)}
          style={{ maxWidth: cell.maxWidth }}
        >
          {isRenderable(row[key]) && row[key]}
        </td>
      ))}

      {actions && (
        <td
          onClick={(e) => e.stopPropagation()}
          className={cls.smart_table__table__actions}
        >
          {actions}
        </td>
      )}
    </tr>
  )
}
