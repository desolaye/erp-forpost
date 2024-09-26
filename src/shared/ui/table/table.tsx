import { Pagination } from '@mui/material'
import { ReactNode } from 'react'

import { Card } from '../card'
import { Loader } from '../loader'

import cls from './table.module.scss'

interface ITableProps {
  header: ReactNode
  body: ReactNode

  totalCount: number
  page: number
  setPage: (page: number) => void

  isPending?: boolean
}

export const Table = (props: ITableProps) => {
  const { header, body, isPending, page, setPage, totalCount } = props

  return (
    <>
      <Card style={{ height: '100%', overflow: 'hidden' }}>
        <section className={cls.table}>
          <header className={cls.table__header}>{header}</header>
          {isPending && <Loader />}
          <main className={cls.table__main}>{!isPending && body}</main>
        </section>
      </Card>

      <footer className={cls.table__pagination}>
        {totalCount !== 0 && (
          <Pagination
            count={totalCount}
            size="large"
            page={page}
            onChange={(_, p) => setPage(p)}
          />
        )}
      </footer>
    </>
  )
}
