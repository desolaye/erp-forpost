import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'
import { WarehouseType } from '@/entities/manuals'

export const warehousesTableConfig = () => {
  const config: TableRowRecordType<WarehouseType> = {
    name: {
      width: 200,
      title: 'Название склада',
      type: 'text',
    },
    id: {
      width: 0,
      title: '',
      type: 'text',
    },
  }

  return Object.entries(config).filter(
    ([_, value]) => value.width > 0,
  ) as TableConfigType<WarehouseType>
}
