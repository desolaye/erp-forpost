import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'
import { WarehouseType } from '@/entities/manuals'

export const warehousesTableConfig = () => {
  const config: TableRowRecordType<WarehouseType> = {
    storageName: {
      type: 'text',
      title: 'Название склада',
      width: 200,
    },
    responsibleName: {
      type: 'text',
      title: 'Ответственный',
      width: 200,
    },
  }

  return Object.entries(config) as TableConfigType<WarehouseType>
}
