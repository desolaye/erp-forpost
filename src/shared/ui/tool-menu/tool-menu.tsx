import { Tooltip } from '@mui/material'
import { ReactNode } from 'react'

import { Button } from '../button'

interface IToolMenuProps {
  tools: { icon: ReactNode; onClick: () => void; disabled: boolean; title: string }[]
}

export const ToolMenu = (props: IToolMenuProps) => {
  const { tools } = props

  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'end', paddingRight: 20 }}>
      {tools.map((v) => (
        <Tooltip key={v.title} title={v.title}>
          <Button disabled={v.disabled} mode="secondary" circle onClick={v.onClick}>
            {v.icon}
          </Button>
        </Tooltip>
      ))}
    </div>
  )
}
