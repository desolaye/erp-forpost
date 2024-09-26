import { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

import { ActionsRow } from './components/actions-row'
import { InnerTableRow } from './components/inner-table'
import { CheckboxRow } from './components/checkbox-row'

import cls from './table-row.module.scss'

interface ITableRowProps<T> {
  data: T
  to?: string
  onCheck?: () => void
  actions?: ReactNode

  config: [
    keyof T,
    {
      size: string
      title: string
    },
  ][]
}

export const TableRow = <T,>(props: ITableRowProps<T>) => {
  const { config, to, data, actions, onCheck } = props

  const widthStyle = `calc(100% - ${actions ? '48px' : '0px'} - ${onCheck ? '36px' : '0px'})`

  if (to) {
    return (
      <div className={cls.table_row}>
        <CheckboxRow onCheck={onCheck} />
        <Link to={to} className={cls.table_row} style={{ width: widthStyle }}>
          <InnerTableRow
            width={widthStyle}
            config={config}
            data={data}
            isLink={Boolean(to)}
          />
        </Link>
        <ActionsRow actions={actions} />
      </div>
    )
  }

  return (
    <li className={cls.table_row}>
      <CheckboxRow onCheck={onCheck} />
      <InnerTableRow
        width={widthStyle}
        config={config}
        data={data}
        isLink={Boolean(to)}
      />
      <ActionsRow actions={actions} />
    </li>
  )
}
