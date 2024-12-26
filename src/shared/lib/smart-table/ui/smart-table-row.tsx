import { Checkbox, Tooltip } from '@mui/material'
import { ReactNode, useContext } from 'react'
import { useNavigate } from '@tanstack/react-router'
import cn from 'classnames'

import { isRenderable } from '@/shared/utils/is-renderable'
import { splitByNewline } from '@/shared/utils/split-by-newline'
import { renderTableItem } from '@/shared/utils/render-table-item'

import { SmartTableContext } from '../lib/smart-table-context'

import cls from './smart-table.module.scss'

interface ISmartTableRowProps<T> {
  row: T
  tagColors?: { [key: string]: string }
  actions?: ReactNode
  to?: string
  onClick?: () => void
  check?: {
    onCheck: () => void
    isChecked: boolean
  }
}

export const SmartTableRow = <T,>(props: ISmartTableRowProps<T>) => {
  const { row, check, actions, to, tagColors, onClick } = props
  const navigate = useNavigate()

  const { config } = useContext(SmartTableContext)
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

      {config?.map(([key, cell]) => (
        <td
          className={cls.smart_table__table__td}
          key={String(key)}
          style={{ maxWidth: cell.maxWidth }}
        >
          {cell.type === 'text' && renderTableItem(row[key as keyof T])}
          {cell.type === 'tag' && isRenderable(row[key as keyof T]) && (
            <div
              className={cls.smart_table__table__tag}
              style={{ backgroundColor: tagColors?.[`${row[key as keyof T]}`] || '#333' }}
            >
              {renderTableItem(row[key as keyof T])}
            </div>
          )}

          {cell.type === 'tooltip' && (
            <Tooltip
              onClick={(e) => e.stopPropagation()}
              title={
                <div onClick={(e) => e.stopPropagation()}>
                  {typeof row[key as keyof T] === 'string' &&
                    splitByNewline(row[key as keyof T] as string).map((v, i) => (
                      <p key={i}>{v}</p>
                    ))}
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
                {typeof row[key as keyof T] === 'string' &&
                  splitByNewline(row[key as keyof T] as string)[0]}
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
