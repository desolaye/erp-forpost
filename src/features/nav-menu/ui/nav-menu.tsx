import { useState } from 'react'

import { BxArrowRightIcon } from '@/shared/ui/icons/bx-arrow-right-icon'

import { navMenuRoutes } from '../lib/nav-menu-routes'
import { NavMenuListItem } from './components/nav-menu-list-item'

import cls from './nav-menu.module.scss'

export const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const routes = navMenuRoutes.map((v) => (
    <NavMenuListItem
      icon={v.icon()}
      isOpen={isOpen}
      text={v.text}
      to={v.to}
      key={v.text}
    />
  ))

  return (
    <aside
      className={cls.nav_menu}
      style={{
        width: isOpen ? '310px' : '42px',
        padding: isOpen ? '8px' : '8px 4px',
      }}
    >
      <main>
        <ul className={cls.nav_menu__list}>{routes}</ul>
      </main>
      <footer className={cls.nav_menu__footer}>
        <BxArrowRightIcon
          className={cls.nav_menu__footer__icon}
          onClick={() => setIsOpen((prev) => !prev)}
          width={32}
          height={32}
          style={{
            transform: isOpen ? 'rotate(180deg)' : undefined,
            transition: '0.25s all ease',
          }}
        />
      </footer>
    </aside>
  )
}
