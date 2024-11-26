import { Tooltip } from '@mui/material'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'

import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'

interface IProductsPageTooltipProps {
  onDelete?: () => void
  onMutate?: () => void
}

export const AgentRepresentativesTooltip = (props: IProductsPageTooltipProps) => {
  const { onDelete, onMutate } = props

  return (
    <Tooltip
      arrow
      placement="left"
      title={
        <div style={{ display: 'flex', gap: 10, flexDirection: 'column', padding: 8 }}>
          <Button onClick={onMutate} mode="secondary">
            <Text color="error" weight="semi">
              Редактировать
            </Text>
          </Button>
          <Button onClick={onDelete} mode="secondary">
            <Text color="error" pos="center" weight="semi">
              Удалить
            </Text>
          </Button>
        </div>
      }
      style={{ color: '#830000', background: '#ccc', borderRadius: 8 }}
    >
      <MoreVertOutlinedIcon />
    </Tooltip>
  )
}
