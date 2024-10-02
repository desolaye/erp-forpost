import { EmptyCard } from '@/shared/ui/empty-card'
import { TableRow } from '@/shared/ui/table-row'

import { ProductByWarehouseType } from '@/entities/manuals'
import { warehouseProductsTableConfig } from '../../utils/warehouses-table.config'

interface IWarehousesTableBody {
  data?: ProductByWarehouseType[]
}

export const WarehouseProductsTableBody = (props: IWarehousesTableBody) => {
  const { data } = props

  const config = warehouseProductsTableConfig()

  if (!data) return <EmptyCard />
  return data.map((v) => <TableRow config={config} data={v} />)
}
