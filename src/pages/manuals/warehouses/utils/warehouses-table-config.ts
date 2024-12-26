import { WarehouseType } from '@/entities/manuals'
import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'

export const warehousesTableConfig = () => {
  const config: TableRowRecordType<WarehouseType> = {
    storageName: {
      type: 'text',
      title: 'Название склада',
    },
    responsibleName: {
      type: 'text',
      title: 'Ответственный',
    },
  }

  return Object.entries(config) as TableConfigType<WarehouseType>
}
