import { useState } from 'react'
import Textarea from '@mui/joy/Textarea'

import { Text } from '@/shared/ui/text'
import { JoyUiProvider } from '@/shared/lib/joy-ui-provider'
import { Button } from '@/shared/ui/button'

import { InvoiceProductResponseType, InvoiceType } from '@/entities/invoices'
import { InvoiceProduct } from '@/entities/invoices/ui/invoice-product'
import { InvoiceProductCreator } from '@/entities/invoices/ui/invoice-product-creator'

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
      <section style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Text size="lg" weight="semi">
          Номер счёта
        </Text>

        <Text>{invoice?.number || 'Отсутствует'}</Text>

        <Text size="lg" weight="semi">
          Описание счёта
        </Text>

        <JoyUiProvider>
          <Textarea
            value={descr}
            onChange={(e) => setDescr(e.target.value)}
            minRows={4}
            maxRows={4}
          />
        </JoyUiProvider>
        <Button mode="secondary" full onClick={() => onDescriptionChange?.(descr)}>
          Обновить описание
        </Button>
      </section>

      <section style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
        <Text size="lg" weight="semi">
          Продукты в счёте
        </Text>

        {data?.map((v) => (
          <InvoiceProduct
            key={v.id}
            invoice={v}
            onDelete={onProductDelete}
            onEdit={onProductEdit}
          />
        ))}

        <InvoiceProductCreator products={products} onCreate={onProductCreate} />
      </section>
    </>
  )
}
