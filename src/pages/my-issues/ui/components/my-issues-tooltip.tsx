import { Tooltip } from '@mui/material'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'

import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'

interface IMyIssuesTooltipProps {
  onSetResponsible?: () => void
  onSetStructure?: () => void
}

export const MyIssuesTooltip = (props: IMyIssuesTooltipProps) => {
  const { onSetResponsible, onSetStructure } = props

  return (
    <Tooltip
      arrow
      placement="left"
      title={
        <div style={{ display: 'flex', gap: 10, flexDirection: 'column', padding: 8 }}>
          <Button onClick={onSetResponsible}>
            <Text color="white">Назначить исполнителя</Text>
          </Button>
          <Button onClick={onSetStructure}>
            <Text color="white">Заполнить состав продукта</Text>
          </Button>
        </div>
      }
      style={{ color: '#830000' }}
    >
      <MoreVertOutlinedIcon />
    </Tooltip>
  )
}
