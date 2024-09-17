import { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

import cls from './nav-menu-list-item.module.scss'
import { Text } from '@/shared/ui/text'

interface ISubNavListItemProps {
  icon: ReactNode
  to: string
  text: string
  isOpen: boolean
}

export const NavMenuListItem = (props: ISubNavListItemProps) => {
  const { icon, isOpen, text, to } = props

  return (
    <li>
      <Link to={to} className={cls.list_item}>
        <span className={cls.list_item__icon}>{icon}</span>
        {isOpen && <Text hideOverflow>{text}</Text>}
      </Link>
    </li>
  )
}
