import { Checkbox, Tooltip } from '@mui/material'
import { ReactNode } from 'react'
import { useNavigate } from '@tanstack/react-router'
import cn from 'classnames'

import { isRenderable } from '@/shared/utils/is-renderable'
import { splitByNewline } from '@/shared/utils/split-by-newline'

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
          {cell.type !== 'tooltip' && isRenderable(row[key]) && row[key]}

          {cell.type === 'tooltip' && (
            <Tooltip
              onClick={(e) => e.stopPropagation()}
              title={
                <div onClick={(e) => e.stopPropagation()}>
                  {typeof row[key] === 'string' &&
                    splitByNewline(row[key]).map((v, i) => <p key={i}>{v}</p>)}
                </div>
              }
            >
              <p
                style={{
                  fontWeight: 600,
                  maxWidth: cell.maxWidth,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {typeof row[key] === 'string' && splitByNewline(row[key])[0]}
              </p>
            </Tooltip>
          )}
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
