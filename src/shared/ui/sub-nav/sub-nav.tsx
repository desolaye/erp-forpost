import { useState } from 'react'

import { BxArrowRightIcon } from '../icons/bx-arrow-right-icon'
import cls from './sub-nav.module.scss'
import { subNavRoutes } from '@/shared/lib/sub-nav-routes'
import { SubNavListItem } from './sub-nav-list-item'

export const SubNav = () => {
  const [isOpen, setIsOpen] = useState(false)

  const routes = subNavRoutes.map((v) => (
    <SubNavListItem
      icon={v.icon()}
      isOpen={isOpen}
      text={v.text}
      to={v.to}
      key={v.text}
    />
  ))

  return (
    <aside
      className={cls.sub_nav}
      style={{
        width: isOpen ? '310px' : '42px',
        padding: isOpen ? '8px' : '8px 4px',
      }}
    >
      <main>
        <ul className={cls.sub_nav__list}>{routes}</ul>
      </main>
      <footer className={cls.sub_nav__footer}>
        <BxArrowRightIcon
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
