import { Outlet, useNavigate } from '@tanstack/react-router'
import Cookies from 'js-cookie'
import { useContext } from 'react'

import { routesPath } from '@/shared/config/routes-path.config'
import { publicApi } from '@/shared/api/public-api.config'

import { useLocalSession } from '@/entities/session/lib/use-local-session'
import { SessionContext } from '@/entities/session'
import { NavMenu } from '@/features/nav-menu'

import cls from './erp-layout.module.scss'

export const ErpLayout = () => {
  const navigate = useNavigate()

  const cookie = Cookies.get('ACCESS_TOKEN')
  const sessionContext = useContext(SessionContext)
  const { getLocalSession } = useLocalSession()

  if (!cookie) {
    navigate({ to: routesPath.login() })
  } else {
    publicApi.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${cookie}`
      return config
    })

    const session = getLocalSession()

    if (!sessionContext.session && session) {
      sessionContext.setSession({ ...session })
    }
  }

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
