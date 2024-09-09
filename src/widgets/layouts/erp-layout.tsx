import { useEffect } from 'react'
import { Outlet, useNavigate } from '@tanstack/react-router'
import Cookies from 'js-cookie'

import { routesPath } from '@/shared/config/routes-path.config'
import { NavMenu } from '@/features/nav-menu'

import cls from './erp-layout.module.scss'

export const ErpLayout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const cookie = Cookies.get('ACCESS_TOKEN')
    if (!cookie) navigate({ to: routesPath.login() })
  }, [])

  return (
    <article className={cls.erp_layout}>
      <header className={cls.erp_layout__header}>ФОРПОСТ</header>
      <NavMenu />
      <main className={cls.erp_layout__main}>
        <Outlet />
      </main>
    </article>
  )
}
