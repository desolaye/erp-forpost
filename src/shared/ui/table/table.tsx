import { ReactNode } from 'react'
import cls from './table.module.scss'
import { Card } from '../card'
import { Loader } from '../loader'

interface ITableProps {
  header: ReactNode
  body: ReactNode
  isPending?: boolean
}

export const Table = (props: ITableProps) => {
  const { header, body, isPending } = props

  return (
    <Card style={{ height: '100%' }}>
      <section className={cls.table}>
        <header className={cls.table__header}>{header}</header>
        {isPending && <Loader />}
        {!isPending && body}
      </section>
    </Card>
  )
}
