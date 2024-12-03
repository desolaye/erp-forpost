import { useState } from 'react'
import { Tooltip } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditNoteIcon from '@mui/icons-material/EditNote'

import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'
import { Button } from '@/shared/ui/button'

import { ManufacturingOrderProductType } from '../model/manufacturing-orders.schema'

type Props = {
  product: ManufacturingOrderProductType
  idx: number
  onDelete?: (product: ManufacturingOrderProductType) => void
  onEdit?: (value: number, id: string) => void
}

export const ManufacturingOrderProduct = (props: Props) => {
  const { product, idx, onDelete, onEdit } = props

  const [quantity, setQuantity] = useState(product.quantity.toString())

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Text className="full">
        <Text tag="span" weight="semi">
          {idx}.{' '}
        </Text>
        {product.productName}
      </Text>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Tooltip title="Сохранить количество">
          <Button
            mode="neutral"
            style={{ padding: '2px 4px' }}
            onClick={() => onEdit?.(Number(quantity), product.id)}
          >
            <EditNoteIcon style={{ minWidth: 24, minHeight: 24 }} />
          </Button>
        </Tooltip>

        <Input
          style={{ minWidth: 75, width: 75 }}
          full
          placeholder="Кол-во"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Text>шт.</Text>
      </div>

      <Tooltip title="Удалить продукт">
        <Button
          mode="secondary"
          style={{ padding: '2px 4px' }}
          onClick={() => onDelete?.(product)}
        >
          <DeleteOutlineIcon style={{ minWidth: 24, minHeight: 24 }} />
        </Button>
      </Tooltip>
    </div>
  )
}
