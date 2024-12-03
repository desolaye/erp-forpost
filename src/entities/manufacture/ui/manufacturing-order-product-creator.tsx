import { useState } from 'react'
import DoneIcon from '@mui/icons-material/Done'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Select } from '@/shared/ui/select'

type Props = {
  products?: { label: string; value: string }[]
  onCreate?: (productId: string, quantity: number) => void
}

export const ManufacturingOrderProductCreator = (props: Props) => {
  const { products, onCreate } = props

  const [isCreating, setIsCreating] = useState(false)
  const [form, setForm] = useState({
    product: { label: 'Выберите продукт...', value: '' },
    quantity: '',
  })

  const handleCreate = () => {
    if (onCreate && form.product.value) {
      setIsCreating(false)
      onCreate(form.product.value, Number(form.quantity))
    }
  }

  if (!isCreating) {
    return (
      <Button mode="secondary" onClick={() => setIsCreating(true)}>
        + Добавить продукт
      </Button>
    )
  }

  return (
    <section style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Select
        className="full"
        options={products || []}
        value={form.product}
        onChange={(v) =>
          setForm((prev) => ({ ...prev, product: v ? v : { label: '', value: '' } }))
        }
      />

      <Input
        style={{ minWidth: 125, width: 125 }}
        placeholder="Количество"
        value={form.quantity}
        onChange={(e) => setForm((prev) => ({ ...prev, quantity: e.target.value }))}
      />

      <Button mode="neutral" style={{ padding: '2px 4px' }} onClick={handleCreate}>
        <DoneIcon style={{ minWidth: 24, minHeight: 24 }} />
      </Button>
      <Button
        mode="secondary"
        onClick={() => setIsCreating(false)}
        style={{ padding: '2px 4px' }}
      >
        <DeleteOutlineIcon style={{ minWidth: 24, minHeight: 24 }} />
      </Button>
    </section>
  )
}
