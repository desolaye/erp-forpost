import { Fragment } from 'react'

import { navMenuRoutes } from '../utils/nav-menu-routes'
import { NavMenuListItem } from './components/nav-menu-list-item'

import cls from './nav-menu.module.scss'

export const NavMenu = () => {
  const routes = navMenuRoutes().map((v) => (
    <Fragment key={v.text}>
      <NavMenuListItem childs={v.childs} icon={v.icon()} text={v.text} to={v.to} />
      <div style={{ width: '100%', height: '2px', backgroundColor: '#e5e6eb' }} />
    </Fragment>
  ))

  return (
    <aside className={cls.nav_menu}>
      <main className={cls.nav_menu__list}>{routes}</main>
    </aside>
  )
}
