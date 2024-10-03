import { EmptyCard } from '@/shared/ui/empty-card'
import { TableRow } from '@/shared/ui/table-row'
import { routesPath } from '@/shared/config/routes-path.config'

import { WarehouseType } from '@/entities/manuals'
import { warehousesTableConfig } from '../../utils/warehouses-table.config'

interface IWarehousesTableBody {
  data?: WarehouseType[]
}

export const WarehousesTableBody = (props: IWarehousesTableBody) => {
  const { data } = props
  const { products, root } = routesPath.erp.warehouses

  const config = warehousesTableConfig()

  if (!data) return <EmptyCard />

  return data.map((v) => (
    <TableRow key={v.id} config={config} data={v} to={products(root(), v.id)} />
  ))
}
