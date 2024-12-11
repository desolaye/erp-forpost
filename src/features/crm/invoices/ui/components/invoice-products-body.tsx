import { useState } from 'react'

import { Text } from '@/shared/ui/text'
import { Button } from '@/shared/ui/button'

import { InvoiceProductResponseType, InvoiceType } from '@/entities/crm/invoices'
import { InvoiceProduct } from '@/entities/crm/invoices/ui/invoice-product'
import { InvoiceProductCreator } from '@/entities/crm/invoices/ui/invoice-product-creator'
import { Textarea } from '@/shared/ui/textarea'

interface IInvoiceProductsBodyProps {
  data?: InvoiceProductResponseType[]
  invoice?: InvoiceType
  products: { label: string; value: string }[]

  onDescriptionChange?: (descr: string) => void
  onProductCreate?: (productId: string, quantity: number) => void
  onProductDelete?: (invoice: InvoiceProductResponseType) => void
  onProductEdit?: (value: number, id: string) => void
}

export const InvoiceProductsBody = (props: IInvoiceProductsBodyProps) => {
  const {
    data,
    invoice,
    products,
    onDescriptionChange,
    onProductCreate,
    onProductDelete,
    onProductEdit,
  } = props

  const [descr, setDescr] = useState(invoice?.description || '')

  return (
    <>
      <section style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
        <Text size="lg" weight="semi">
          Продукты в счёте
        </Text>

        <InvoiceProductCreator products={products} onCreate={onProductCreate} />

        {data?.map((v, i) => (
          <InvoiceProduct
            key={v.id}
            idx={i + 1}
            invoice={v}
            onDelete={onProductDelete}
            onEdit={onProductEdit}
          />
        ))}
      </section>

      <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Text size="lg" weight="semi">
          Номер счёта
        </Text>

        <Text>{invoice?.number || 'Отсутствует'}</Text>

        <Text size="lg" weight="semi">
          Описание счёта
        </Text>

        <Textarea
          onChange={(e) => setDescr(e.target.value)}
          label="Описание счёта"
          placeholder="Описание счёта"
          value={descr}
        />

        <Button mode="secondary" full onClick={() => onDescriptionChange?.(descr)}>
          Обновить описание
        </Button>
      </section>
    </>
  )
}
