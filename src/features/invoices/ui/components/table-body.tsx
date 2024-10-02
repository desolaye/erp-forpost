import { EmptyCard } from '@/shared/ui/empty-card'
import { TableRow } from '@/shared/ui/table-row'

import { InvoiceProductResponseType } from '@/entities/invoices'
import { invoiceProductsTableConfig } from '../../utils/invoice-products-table.config'

interface ITableBodyProps {
  data?: InvoiceProductResponseType[]
}

export const TableBody = (props: ITableBodyProps) => {
  const { data } = props
  const config = invoiceProductsTableConfig()

  if (!data || !data.length) return <EmptyCard />

  return data.map((v, i) => <TableRow key={i} config={config} data={v} />)
}
