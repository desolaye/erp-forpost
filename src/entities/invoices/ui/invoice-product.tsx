import { useState } from 'react'
import { Tooltip } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import EditNoteIcon from '@mui/icons-material/EditNote'

import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'
import { Button } from '@/shared/ui/button'
import { InvoiceProductResponseType } from '@/entities/invoices'

type InvoiceProductProps = {
  invoice: InvoiceProductResponseType
  onDelete?: (invoice: InvoiceProductResponseType) => void
  onEdit?: (value: number, id: string) => void
}

export const InvoiceProduct = (props: InvoiceProductProps) => {
  const { invoice, onDelete, onEdit } = props

  const [quantity, setQuantity] = useState(invoice.quantity.toString())

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Text className="full">{invoice.name}</Text>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Tooltip title="Сохранить количество">
          <Button
            mode="neutral"
            style={{ padding: '2px 4px' }}
            onClick={() => onEdit?.(Number(quantity), invoice.id)}
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
          onClick={() => onDelete?.(invoice)}
        >
          <DeleteOutlineIcon style={{ minWidth: 24, minHeight: 24 }} />
        </Button>
      </Tooltip>
    </div>
  )
}
