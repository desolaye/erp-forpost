import { ReactNode } from 'react'
import { Checkbox, Pagination } from '@mui/material'

import { Card } from '@/shared/ui/card'
import { Loader } from '@/shared/ui/loader'

import { TableConfigType } from '../model/table-config.type'
import { SmartTableContext } from '../lib/smart-table-context'
import cls from './smart-table.module.scss'

interface ISmartTableProps<T> {
  config: TableConfigType<T>
  children: ReactNode
  pageCount: number
  currentPage: number
  onPageChange: (page: number) => void
  withActions?: boolean
  isLoading?: boolean
  check?: {
    onCheckAll: () => void
    isAllChecked: boolean
  }
}

export const SmartTable = <T,>(props: ISmartTableProps<T>) => {
  const {
    config,
    pageCount,
    currentPage,
    isLoading,
    onPageChange,
    check,
    withActions,
    children,
  } = props

  if (isLoading) return <Loader />

  return (
    <main className={cls.card}>
      <Card className={cls.smart_table__section}>
        <SmartTableContext.Provider value={{ config }}>
          <table className={cls.smart_table__table}>
            <thead className={cls.smart_table__table__head}>
              <tr>
                {check && (
                  <th style={{ minWidth: 40 }}>
                    <Checkbox onChange={check.onCheckAll} checked={check.isAllChecked} />
                  </th>
                )}

                {config.map(([key, value]) => (
                  <th
                    key={String(key)}
                    className={cls.smart_table__table__cell}
                    style={{ minWidth: value.width }}
                  >
                    {value.title}
                  </th>
                ))}

                {withActions && <th style={{ minWidth: 40 }}></th>}
              </tr>
            </thead>
            <tbody>{children}</tbody>
          </table>
        </SmartTableContext.Provider>
      </Card>

      <footer className={cls.table__pagination}>
        {pageCount > 0 && (
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={(_, p) => onPageChange(p)}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        )}
      </footer>
    </main>
  )
}
