import { Outlet } from '@tanstack/react-router'

import { SubNav } from '@/shared/ui/sub-nav/sub-nav'
import cls from './erp-layout.module.scss'

export const ErpLayout = () => {
  return (
    <article className={cls.erp_layout}>
      <header className={cls.erp_layout__header}>ФОРПОСТ</header>
      <SubNav />
      <main className={cls.erp_layout__main}>
        <Outlet />
      </main>
    </article>
  )
}
