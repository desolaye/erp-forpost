import { Outlet } from '@tanstack/react-router'

import { NavMenu } from '@/features/nav-menu'

import cls from './erp-layout.module.scss'
import { useErpLayout } from '../lib/use-erp-layout'

export const ErpLayout = () => {
  useErpLayout()

  return (
    <article className={cls.erp_layout}>
      <header className={cls.erp_layout__header}>ФОРПОСТ</header>
      <main className={cls.erp_layout__main}>
        <NavMenu />
        <section className={cls.erp_layout__main__outlet}>
          <Outlet />
        </section>
      </main>
    </article>
  )
}
