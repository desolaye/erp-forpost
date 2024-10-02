import { Loader } from '@/shared/ui/loader'
import { Table } from '@/shared/ui/table'
import { InvoiceProductResponseType } from '@/entities/invoices'

import { TableHead } from './table-head'
import { TableBody } from './table-body'

interface IInvoiceProductsBodyProps {
  isLoading?: boolean
  data?: InvoiceProductResponseType[]
}

export const InvoiceProductsBody = (props: IInvoiceProductsBodyProps) => {
  const { isLoading, data } = props

  if (isLoading) return <Loader />

  return (
    <Table
      header={<TableHead />}
      body={<TableBody data={data} />}
      page={1}
      setPage={() => {}}
      totalCount={0}
    />
  )
}
