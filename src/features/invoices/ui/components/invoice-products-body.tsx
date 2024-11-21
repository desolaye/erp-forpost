import { Table } from '@/shared/ui/table'
import { Text } from '@/shared/ui/text'
import { splitByNewline } from '@/shared/utils/split-by-newline'

import { InvoiceProductResponseType, InvoiceType } from '@/entities/invoices'

import { TableHead } from './table-head'
import { TableBody } from './table-body'

interface IInvoiceProductsBodyProps {
  data?: InvoiceProductResponseType[]
  invoice?: InvoiceType
}

export const InvoiceProductsBody = (props: IInvoiceProductsBodyProps) => {
  const { data, invoice } = props

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
        <Table
          header={<TableHead />}
          body={<TableBody data={data} />}
          page={1}
          setPage={() => {}}
          totalCount={0}
        />
      </section>
    </>
  )
}
