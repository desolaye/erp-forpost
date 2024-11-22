import { Text } from '@/shared/ui/text'
import { splitByNewline } from '@/shared/utils/split-by-newline'
import { SmartTable, SmartTableRow } from '@/shared/lib/smart-table'

import { InvoiceProductResponseType, InvoiceType } from '@/entities/invoices'

import { invoiceProductsTableConfig } from '../../utils/invoice-products-table.config'

interface IInvoiceProductsBodyProps {
  data?: InvoiceProductResponseType[]
  invoice?: InvoiceType
}

export const InvoiceProductsBody = (props: IInvoiceProductsBodyProps) => {
  const { data, invoice } = props
  const config = invoiceProductsTableConfig()

  return (
    <>
      <section>
        <Text size="lg" weight="semi">
          Номер счёта
        </Text>

        <Text style={{ padding: '4px 0 8px' }}>{invoice?.number || 'Отсутствует'}</Text>

        <Text size="lg" weight="semi" style={{ padding: '0 0 4px' }}>
          Описание счёта
        </Text>

        {invoice?.description ? (
          splitByNewline(invoice.description).map((v) => (
            <Text key={v} breakAll>
              {v}
            </Text>
          ))
        ) : (
          <Text>Отсутствует</Text>
        )}
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
