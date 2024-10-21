import { Outlet } from '@tanstack/react-router'

import { useErpLayout } from '../lib/use-erp-layout'
import cls from './erp-layout.module.scss'
import { NavMenu } from '@/features/nav-menu'
import { Text } from '@/shared/ui/text'

export const ErpLayout = () => {
  useErpLayout()

  return (
    <article className={cls.erp_layout}>
      <header className={cls.erp_layout__header}>
        <NavMenu />
        <Text>ФОРПОСТ</Text>
        <div />
      </header>
      <main className={cls.erp_layout__main}>
        <section className={cls.erp_layout__main__outlet}>
          <Outlet />
        </section>
      </main>
    </article>
  )
}
