import { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

import cls from './sub-nav.module.scss'

interface ISubNavListItemProps {
  icon: ReactNode
  to: string
  text: string
  isOpen: boolean
}

export const SubNavListItem = (props: ISubNavListItemProps) => {
  const { icon, isOpen, text, to } = props

  return (
    <li>
      <Link to={to} className={cls.sub_nav__list__item}>
        <span style={{ minWidth: 32, minHeight: 32 }}>{icon}</span>
        {isOpen && text}
      </Link>
    </li>
  )
}
