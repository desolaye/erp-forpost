import { WarehouseType } from '@/entities/manuals'
import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'

export const warehousesTableConfig = () => {
  const config: TableRowRecordType<WarehouseType> = {
    name: {
      type: 'text',
      title: 'Название склада',
      width: 200,
    },
    id: {
      type: 'text',
      title: 'id',
      width: 0,
    },
  }

  return Object.entries(config).filter(
    ([_, value]) => value.width > 0,
  ) as TableConfigType<WarehouseType>
}
