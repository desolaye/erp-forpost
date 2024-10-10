import { Tooltip } from '@mui/material'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'

import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'

interface IMyIssuesTooltipProps {
  onSetResponsible?: () => void
}

export const MyIssuesTooltip = (props: IMyIssuesTooltipProps) => {
  const { onSetResponsible } = props

  return (
    <Tooltip
      arrow
      placement="left"
      title={
        <div style={{ display: 'flex', gap: 10, flexDirection: 'column', padding: 8 }}>
          <Button onClick={onSetResponsible} mode="secondary">
            <Text color="primary">Назначить исполнителя</Text>
          </Button>
        </div>
      }
      style={{ color: '#830000', background: '#ccc', borderRadius: 8 }}
    >
      <MoreVertOutlinedIcon />
    </Tooltip>
  )
}
