import { Text } from '@/shared/ui/text'
import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'

import { InvoiceProductResponseType, InvoiceType } from '@/entities/invoices'

import { invoiceProductsTableConfig } from '../../utils/invoice-products-table.config'
import { JoyUiProvider } from '@/shared/lib/joy-ui-provider'
import Textarea from '@mui/joy/Textarea'
import { useState } from 'react'
import { Button } from '@/shared/ui/button'

interface IInvoiceProductsBodyProps {
  data?: InvoiceProductResponseType[]
  invoice?: InvoiceType
  onDescriptionChange?: (descr: string) => void
}

export const InvoiceProductsBody = (props: IInvoiceProductsBodyProps) => {
  const { data, invoice, onDescriptionChange } = props

  const [descr, setDescr] = useState(invoice?.description || '')

  const config = invoiceProductsTableConfig()

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

      <section>
        <Text size="lg" weight="semi">
          Продукты в счёте
        </Text>
        <SmartTable
          config={config}
          currentPage={1}
          pageCount={0}
          isLoading={false}
          onPageChange={() => {}}
        >
          {data?.map((v) => (
            <SmartTableRow key={v.productId + v.quantity} config={config} row={v} />
          ))}
        </SmartTable>
      </section>
    </>
  )
}
