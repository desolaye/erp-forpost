import { EmptyCard } from '@/shared/ui/empty-card'
import { TableRow } from '@/shared/ui/table-row'

import { InvoiceResponseType } from '@/entities/invoices'
import { invoicesTableConfig } from '../../utils/invoices-table.config'

interface ITableBodyProps {
  data?: InvoiceResponseType['invoices']
}

export const TableBody = (props: ITableBodyProps) => {
  const { data } = props
  const config = invoicesTableConfig()

  if (!data || !data.length) return <EmptyCard />

  return data.map((v) => <TableRow key={v.id} config={config} data={v} />)
}
