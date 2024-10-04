import { TableRow } from '@/shared/ui/table-row'
import { EmptyCard } from '@/shared/ui/empty-card'

import { CompletedProductType } from '@/entities/manufacture'
import { productCompletedTableConfig } from '../../utils/product-completed-table.config'

interface ITableBody {
  data?: CompletedProductType[]
}

export const TableBody = (props: ITableBody) => {
  const { data } = props
  const config = productCompletedTableConfig()

  if (!data || !data.length) return <EmptyCard />
  return data.map((v) => <TableRow config={config} data={v} key={v.id} />)
}
