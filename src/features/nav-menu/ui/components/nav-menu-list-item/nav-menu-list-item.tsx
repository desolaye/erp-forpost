import { ReactNode, useState } from 'react'
import { Tooltip } from '@mui/material'
import { Link } from '@tanstack/react-router'

import { Text } from '@/shared/ui/text'
import cls from './nav-menu-list-item.module.scss'

interface ISubNavListItemProps {
  icon: ReactNode
  to: string
  text: string
  childs?: {
    text: string
    to: (pre?: string) => string
  }[]
}

export const NavMenuListItem = (props: ISubNavListItemProps) => {
  const { icon, text, to, childs } = props

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Tooltip
      arrow
      open={menuOpen}
      onOpen={() => setMenuOpen(true)}
      onClose={() => setMenuOpen(false)}
      placement="right"
      className={cls.list_item__tooltip}
      title={
        <div className={cls.list_item__links}>
          <Text size="xl" weight="medium" color="white">
            {text}
          </Text>
          {childs?.map((v) => (
            <Link key={v.text} to={v.to(to)} onClick={() => setMenuOpen(false)}>
              <Text size="sm" link color="white">
                {v.text}
              </Text>
            </Link>
          ))}
        </div>
      }
    >
      <Link to={to} className={cls.list_item} onClick={() => setMenuOpen(false)}>
        <span className={cls.list_item__icon}>{icon}</span>
      </Link>
    </Tooltip>
  )
}
