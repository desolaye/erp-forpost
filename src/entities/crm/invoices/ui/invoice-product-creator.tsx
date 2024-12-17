import { useState } from 'react'
import DoneIcon from '@mui/icons-material/Done'
import { useQuery } from '@tanstack/react-query'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import { Select } from '@/shared/ui/select'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { useSearch } from '@/shared/lib/use-search'

import { getProductsManual, productsToOptions } from '@/entities/manuals'

type InvoiceProductCreator = {
  onCreate?: (productId: string, quantity: number) => void
}

export const InvoiceProductCreator = (props: InvoiceProductCreator) => {
  const { onCreate } = props
  const [isCreating, setIsCreating] = useState(false)

  const { filters, setSearch, debouncedSearch } = useSearch('name')

  const { data: productsAll } = useQuery({
    queryFn: () => getProductsManual({ limit: 50, skip: 0, name: filters?.filterValues }),
    queryKey: ['products_all', debouncedSearch],
  })

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
        options={productsToOptions(productsAll?.data.items)}
        onSearch={setSearch}
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
