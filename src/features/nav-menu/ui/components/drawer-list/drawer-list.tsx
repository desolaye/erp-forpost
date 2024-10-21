import { Link } from '@tanstack/react-router'
import { useMemo, useState } from 'react'

import { Text } from '@/shared/ui/text'
import { navMenuRoutes } from '../../../utils/nav-menu-routes'

import cls from './drawer-list.module.scss'

interface IRootRouteTextProps {
  text: string
  icon?: () => JSX.Element
  onClick?: () => void
}

interface IDrawerList {
  onClose: () => void
}

const RootRouteText = ({ text, icon, onClick }: IRootRouteTextProps) => (
  <div onClick={onClick} className={cls.drawer_list__link}>
    {icon && <span style={{ width: 35, height: 35 }}>{icon()}</span>}
    <Text size={icon ? 'lg' : 'base'} weight={icon ? 'semi' : 'base'} color="inherit">
      {text}
    </Text>
  </div>
)

export const DrawerList = (props: IDrawerList) => {
  const { onClose } = props
  const [expanded, setIsExpanded] = useState<string>()

  const handleExpanded = (panel: string) => {
    setIsExpanded((prev) => (prev === panel ? undefined : panel))
  }

  const routes = useMemo(() => navMenuRoutes(), [])

  return routes.map((route) => (
    <div key={route.to} className={cls.drawer_list}>
      <header
        style={{
          backgroundColor: expanded === route.text ? 'rgba(131, 0, 0, 0.1)' : undefined,
        }}
      >
        {route.childs ? (
          <RootRouteText
            onClick={() => handleExpanded(route.text)}
            text={route.text}
            icon={route.icon}
          />
        ) : (
          <Link to={route.to} onClick={onClose}>
            <RootRouteText text={route.text} icon={route.icon} />
          </Link>
        )}
      </header>

      {expanded === route.text && (
        <main className={cls.drawer_list__main}>
          {route.childs?.map((v) => (
            <Link
              className={cls.drawer_list__expanded_link}
              key={v.text}
              to={v.to(route.to)}
              onClick={onClose}
            >
              <RootRouteText text={v.text} />
            </Link>
          ))}
        </main>
      )}
    </div>
  ))
}
