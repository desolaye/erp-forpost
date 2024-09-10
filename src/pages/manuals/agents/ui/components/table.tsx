import { ReactNode } from 'react'

import cls from './table.module.scss'

interface ITableProps {
  header: ReactNode
  body: ReactNode
}

export const Table = (props: ITableProps) => {
  const { header, body } = props

  return (
    <section className={cls.table}>
      <header className={cls.table__header}>{header}</header>
      {body}
    </section>
  )
}
