import { Tooltip } from '@mui/material'
import { ReactNode } from 'react'

import { Button } from '../button'

import cls from './tool-menu.module.scss'

interface IToolMenuProps {
  tools: { icon: ReactNode; onClick: () => void; disabled: boolean; title: string }[]
}

export const ToolMenu = (props: IToolMenuProps) => {
  const { tools } = props

  return (
    <div className={cls.tool_menu}>
      {tools.map((v) => (
        <Tooltip key={v.title} title={v.title} arrow>
          <Button disabled={v.disabled} mode="secondary" circle onClick={v.onClick}>
            {v.icon}
          </Button>
        </Tooltip>
      ))}
    </div>
  )
}
