import { Tooltip } from '@mui/material'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'

import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'

interface IProductDevelopTooltipProps {
  onSetStructure?: () => void
}

export const ProductDevelopTooltip = (props: IProductDevelopTooltipProps) => {
  const { onSetStructure } = props

  return (
    <Tooltip
      arrow
      placement="left"
      title={
        <div style={{ display: 'flex', gap: 10, flexDirection: 'column', padding: 8 }}>
          <Button onClick={onSetStructure}>
            <Text color="white">Указать состав</Text>
          </Button>
        </div>
      }
      style={{ color: '#830000', background: '#ccc', borderRadius: 8 }}
    >
      <MoreVertOutlinedIcon />
    </Tooltip>
  )
}
