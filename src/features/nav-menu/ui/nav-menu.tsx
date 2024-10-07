import { Fragment, useMemo, useState } from 'react'
import { Drawer } from '@mui/material'
import StartIcon from '@mui/icons-material/Start'

import { navMenuRoutes } from '../utils/nav-menu-routes'

import { NavMenuListItem } from './components/nav-menu-list-item'
import { DrawerList } from './components/drawer-list'

import cls from './nav-menu.module.scss'

export const NavMenu = () => {
  const [open, setIsOpen] = useState(false)

  const toggleDrawer = () => setIsOpen((prev) => !prev)

  const routes = useMemo(
    () =>
      navMenuRoutes().map((v) => (
        <Fragment key={v.text}>
          <NavMenuListItem childs={v.childs} icon={v.icon()} text={v.text} to={v.to} />
          <div style={{ width: '100%', height: '2px', backgroundColor: '#e5e6eb' }} />
        </Fragment>
      )),
    [],
  )

  return (
    <aside className={cls.nav_menu}>
      <main className={cls.nav_menu__list}>{routes}</main>
      <div className={cls.nav_menu__footer} onClick={toggleDrawer}>
        <StartIcon className={cls.nav_menu__footer__icon} />
      </div>

      <Drawer open={open} onClose={toggleDrawer}>
        <div className={cls.nav_menu__drawer}>
          <DrawerList onClose={toggleDrawer} />
        </div>
      </Drawer>
    </aside>
  )
}
