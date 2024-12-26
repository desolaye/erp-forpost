import { CompletedProductType } from '@/entities/manufacture'
import { TableConfigType, TableRowRecordType } from '@/shared/lib/smart-table'

export const productCompletedTableConfig = () => {
  const config: TableRowRecordType<CompletedProductType> = {
    name: {
      type: 'text',
      title: 'Название продукта',
    },
    serialNumber: {
      type: 'text',
      title: 'Серийный номер',
    },
  }

  return Object.entries(config) as TableConfigType<CompletedProductType>
}
