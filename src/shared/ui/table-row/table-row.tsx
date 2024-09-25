import { useState } from 'react'
import { Checkbox } from '@mui/material'
import { Link } from '@tanstack/react-router'

import { isRenderable } from '@/shared/utils/is-renderable'

import { Button } from '../button'
import { Text } from '../text'

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
}

export const TableRow = <T,>(props: ITableRowProps<T>) => {
  const { config, to, data, onCheck } = props

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
          style={{ padding: 0 }}
        />
      )}

      <Button mode="table" style={{ display: 'flex', gap: 8, width: '100%' }}>
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
      <Link to={to} style={{ display: 'flex', gap: 8, width: '100%' }}>
        <InnerTable />
      </Link>
    )

  return (
    <li style={{ display: 'flex', gap: 8, width: '100%' }}>
      <InnerTable />
    </li>
  )
}
