import { useState } from 'react'
import { Drawer } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import { Text } from '@/shared/ui/text'
import { DrawerList } from './components/drawer-list'

import cls from './nav-menu.module.scss'

export const NavMenu = () => {
  const [open, setIsOpen] = useState(false)

  const toggleDrawer = () => setIsOpen((prev) => !prev)

  return (
    <aside className={cls.nav_menu}>
      <div className={cls.nav_menu__footer} onClick={toggleDrawer}>
        <MenuIcon className={cls.nav_menu__footer__icon} />
        <Text weight="semi" color="error">
          Меню
        </Text>
      </div>

      <Drawer open={open} onClose={toggleDrawer}>
        <div className={cls.nav_menu__drawer}>
          <DrawerList onClose={toggleDrawer} />
        </div>
      </Drawer>
    </aside>
  )
}
