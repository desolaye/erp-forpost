import { ReactNode, useState } from 'react'
import { Checkbox } from '@mui/material'
import { Link } from '@tanstack/react-router'

import { isRenderable } from '../../utils/is-renderable'

import { Button } from '../button'
import { Text } from '../text'

import cls from './table-row.module.scss'

interface ITableRowProps<T> {
  data: T
  config: [
    keyof T,
    {
      size: string
      title: string
    },
  ][]
  to?: string
  onCheck?: () => void
  actions?: ReactNode
}

export const TableRow = <T,>(props: ITableRowProps<T>) => {
  const { config, to, data, actions, onCheck } = props

  const [checked, setChecked] = useState(false)

  const handleClick = () => {
    setChecked((prev) => !prev)
    onCheck?.()
  }

  const InnerTable = () => (
    <>
      {onCheck && (
        <Checkbox
          onClick={(e) => e.stopPropagation()}
          checked={checked}
          onChange={handleClick}
          style={{ padding: 0, minWidth: 28 }}
        />
      )}

      <Button mode="table" className={cls.table_row}>
        {config.map(([key, value]) => (
          <Text key={String(key)} style={{ width: value.size }} hideOverflow>
            {isRenderable(data[key]) ? data[key] : ''}
          </Text>
        ))}
      </Button>
    </>
  )

  if (to)
    return (
      <div className={cls.table_row}>
        <Link to={to} className={cls.table_row}>
          <InnerTable />
        </Link>
        {actions}
      </div>
    )

  return (
    <li className={cls.table_row}>
      <InnerTable />
      {actions}
    </li>
  )
}
